<template>
  <v-app light>
    <v-content v-if="$route.meta.plainLayout">
      <div class="alert_container" v-if="alertNotifications">
        <v-alert 
          class="notification" 
          value="showAlertNotification" 
          v-for="alertNotification in alertNotifications" 
          :key="alertNotification.id" 
          transition="fade-transition" 
          :type="alertNotification.type"
        >
          {{ alertNotification.body }}
          <a class="alert__dismissible" @click="closeAlert(alertNotification.id)"><i aria-hidden="true" class="icon icon--right material-icons">cancel</i></a>
        </v-alert>
      </div>
      <router-view @setRoleName="processNameRole" @receiveAlertMessage="alertMessage = $event"/>
      <ConfirmDialog/>
    </v-content>
    <div v-else>
      <v-content>
        <div class="alert_container" v-if="alertNotifications">
          <v-alert 
            class="notification" 
            value="showAlertNotification" 
            v-for="alertNotification in alertNotifications" 
            :key="alertNotification.id" 
            transition="fade-transition" 
            :type="alertNotification.type"
          >
            {{ alertNotification.body }}
            <a class="alert__dismissible" @click="closeAlert(alertNotification.id)"><i aria-hidden="true" class="icon icon--right material-icons">cancel</i></a>
          </v-alert>
        </div>
        <ConfirmDialog/>
        <router-view @setRoleName="processNameRole" @receiveAlertMessage="alertMessage = $event"></router-view>
      </v-content>
      <v-bottom-nav
        :active.sync="bottomNav"
        :color="color"
        :value="true"
        fixed
        shift
      >
        <v-btn to="/home" dark>
          <v-icon>home</v-icon>
        </v-btn>

        <v-btn to="/category" dark>
          <v-icon>list</v-icon>
        </v-btn>

        <v-btn @click="streamlive" dark>
          <v-icon>cast</v-icon>
        </v-btn>

        <v-btn to="/following" dark>
          <v-icon>favorite_border</v-icon>
        </v-btn>

        <v-btn to="/dashboard" dark>
          <v-icon>person</v-icon>
        </v-btn>
      </v-bottom-nav>
    </div>
    <v-dialog 
      v-model="watchDialog"
      fullscreen
    >
      <v-toolbar fixed class="transparent" flat>
        <v-spacer></v-spacer>
        <v-btn flat icon @click="watchDialog = false">
          <v-icon color="white">close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card>
        <video id="watchstream" loop>
          <source src="http://localhost:4000/static/rain.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>

      </v-card>
    </v-dialog>

    <v-dialog 
      v-model="streamDialog"
      fullscreen
    >
      <v-toolbar fixed class="transparent" flat>
        <v-spacer></v-spacer>
        <v-btn flat icon @click="endCall">
          <v-icon color="white">close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card>
        <video id="selfview" autoplay></video>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
  import Vue from 'vue'
  import Pusher from 'pusher-js'
  import ConfirmDialog from './components/ConfirmDialog'
  export default {
    data () {
      return {
        mediaStream: '',
        pusher: '',
        usersOnline: '',
        id: '',
        users: [],
        sessionDesc: '',
        currentcaller: '',
        room: '',
        channel: '',
        caller: '',
        localUserMedia: '',
        watchDialog: false,
        watchvid: '',
        streamDialog: false,
        session: [],
        alertMessage: '',
        showAlertNotification: false,
        alertNotifications: [],
        cordova: Vue.cordova,
        bottomNav: 0,
        color: 'indigo'
      }
    },
    computed: {
    },
    created () {
      let dis = this
      this.cordova.on('deviceready', () => {
        dis.onDeviceReady()
      })
      this.pusher = new Pusher('149299ef4fa07abd4565', {
        cluster: 'ap1',
        encrypted: true,
        authEndpoint: 'https://localhost:3000/pusher/auth'
      })
      this.channel = this.pusher.subscribe('presence-videocall')
      // console.log(this.pusher)
      this.GetRTCPeerConnection()
      this.GetRTCSessionDescription()
      this.GetRTCIceCandidate()
      this.prepareCaller()

      this.channel.bind('pusher:subscription_succeeded', (members) => {
        // set the member count
        dis.usersOnline = members.count
        dis.id = dis.channel.members.me.id
        // document.getElementById('myid').innerHTML = ` My caller id is : ` + this.id
        // members.each((member) => {
        //   if (member.id !== this.channel.members.me.id) {
        //     this.users.push(member.id)
        //   }
        // })
        dis.render()
      })

      this.channel.bind('pusher:member_added', (member) => {
        dis.users.push(member.id)
        dis.render()
      })

      this.channel.bind('pusher:member_removed', (member) => {
        // for remove member from list:
        let index = dis.users.indexOf(member.id)
        dis.users.splice(index, 1)
        if (member.id === dis.room) {
          dis.endCall()
        }
        dis.render()
      })

      // Listening for the candidate message from a peer sent from onicecandidate handler
      this.channel.bind('client-candidate', function (msg) {
        if (msg.room === dis.room) {
          console.log('candidate received')
          setTimeout(function () {
            dis.caller.addIceCandidate(new RTCIceCandidate(msg.candidate))
          }, 3000)
        }
      })

      // Listening for Session Description Protocol message with session details from remote peer
      this.channel.bind('client-sdp', function (msg) {
        if (msg.room === dis.id) {
          console.log('sdp received')
          // var answer = confirm("You have a call from: " + msg.from + "Would you like to answer?")
          let answer = true
          if (!answer) {
            return dis.channel.trigger('client-reject', { 'room': msg.room, 'rejected': dis.id })
          }
          dis.room = msg.room
          dis.getCam().then(stream => {
            dis.localUserMedia = stream
            dis.toggleEndCallButton()
            // if (window.URL) {
            //     document.getElementById("selfview").srcObject = evt.stream
            // } else {
            //     document.getElementById("selfview").src = stream
            // }
            dis.caller.addStream(stream)
            let sessionDesc = new RTCSessionDescription(msg.sdp)
            dis.caller.setRemoteDescription(sessionDesc)
            dis.caller.createAnswer().then(function (sdp) {
              dis.caller.setLocalDescription(new RTCSessionDescription(sdp))
              dis.channel.trigger('client-answer', {
                'sdp': sdp,
                'room': dis.room
              })
            })
          }).catch(error => {
            console.log('an error occured', error)
          })
        }
      })

      // Listening for answer to offer sent to remote peer
      this.channel.bind('client-answer', function (answer) {
        if (answer.room === dis.room) {
          console.log('answer received')
          dis.caller.setRemoteDescription(new RTCSessionDescription(answer.sdp))
        }
      })

      this.channel.bind('client-reject', function (answer) {
        if (answer.room === dis.room) {
          console.log('Call declined')
          alert('call to ' + answer.rejected + 'was politely declined')
          dis.endCall()
        }
      })

      this.channel.bind('client-endcall', function (answer) {
        if (answer.room === dis.room) {
          console.log('Call Ended')
          dis.endCall()
        }
      })
    },
    methods: {
      render () {
        // let list = ''
        this.users.forEach(function (user) {
          // list += `<li>` + user + ` <input type="button" style="float:right;"  value="Watch" onclick="callUser('` + user + `')" id="makeCall" /></li>`
        })
        // document.getElementById('users').innerHTML = list
      },

      endCurrentCall () {
        this.channel.trigger('client-endcall', {
          'room': this.room
        })
        this.endCall()
      },

      // Send the ICE Candidate to the remote peer
      onIceCandidate (peer, evt) {
        let dis = this
        if (evt.candidate) {
          this.channel.trigger('client-candidate', {
            'candidate': evt.candidate,
            'room': dis.room
          })
        }
      },

      toggleEndCallButton () {
        if (document.getElementById('endCall').style.display === 'block') {
          document.getElementById('endCall').style.display = 'none'
        } else {
          document.getElementById('endCall').style.display = 'block'
        }
      },

      endCall () {
        this.room = undefined
        this.streamDialog = false
        this.caller.close()
        let dis = this
        for (let track of dis.localUserMedia.getTracks()) { track.stop() }
        this.prepareCaller()
        this.toggleEndCallButton()
      },

      callUser (user) {
        let dis = this
        this.getCam().then(stream => {
          // if (window.URL) {
          //     // document.getElementById("selfview").srcObject = window.URL.createObjectURL(stream)
          //     const mediaStream = new MediaStream(stream)
          //     document.getElementById("selfview").srcObject = mediaStream
          // } else {
          //     document.getElementById("selfview").srcObject = stream
          // }
          dis.toggleEndCallButton()
          dis.caller.addStream(stream)
          dis.localUserMedia = stream
          dis.caller.createOffer().then(function (desc) {
            dis.caller.setLocalDescription(new RTCSessionDescription(desc))
            dis.channel.trigger('client-sdp', {
              'sdp': desc,
              'room': user,
              'from': dis.id
            })
            dis.room = user
          })
        }).catch(error => {
          console.log('an error occured', error)
        })
      },

      GetRTCIceCandidate () {
        window.RTCIceCandidate = window.RTCIceCandidate || window.webkitRTCIceCandidate ||
        window.mozRTCIceCandidate || window.msRTCIceCandidate
        return window.RTCIceCandidate
      },

      GetRTCPeerConnection () {
        window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection ||
        window.mozRTCPeerConnection || window.msRTCPeerConnection
        return window.RTCPeerConnection
      },

      GetRTCSessionDescription () {
        window.RTCSessionDescription = window.RTCSessionDescription || window.webkitRTCSessionDescription ||
        window.mozRTCSessionDescription || window.msRTCSessionDescription
        return window.RTCSessionDescription
      },

      prepareCaller () {
        let dis = this
        // Initializing a peer connection
        this.caller = new window.RTCPeerConnection()
        // Listen for ICE Candidates and send them to remote peers
        this.caller.onicecandidate = function (evt) {
          if (!evt.candidate) return
          console.log('onicecandidate called')
          dis.onIceCandidate(dis.caller, evt)
        }
        // onaddstream handler to receive remote feed and show in remoteview video element
        this.caller.onaddstream = function (evt) {
          console.log('onaddstream called')
          if (window.URL) {
            document.getElementById('remoteview').srcObject = evt.stream
          } else {
            document.getElementById('remoteview').src = evt.stream
          }
        }
      },

      getCam () {
        // Get local audio/video feed and show it in selfview video element
        return navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        })
      },

      watchlive (vidlink) {
        this.watchDialog = true
        this.watchvid = vidlink
        const vid = document.getElementById('watchstream')
        vid.play()
      },

      streamlive () {
        this.streamDialog = true
        let dis = this
        this.getCam().then(stream => {
          if (window.URL) {
          // document.getElementById("selfview").srcObject = window.URL.createObjectURL(stream)
            // dis.mediaStream = new MediaStream(stream)
            dis.localUserMedia = new MediaStream(stream)
            document.getElementById('selfview').srcObject = dis.localUserMedia
          } else {
            document.getElementById('selfview').srcObject = stream
          }
        })
      },

      processNameRole (val) {
        this.userImage = val.user_image
        this.username = val.username
        this.getSession()
      },

      onDeviceReady: function () {
        // Handle the device ready event.
        this.cordova.on('pause', this.onPause, false)
        this.cordova.on('resume', this.onResume, false)
        if (this.cordova.device.platform === 'Android') {
          document.addEventListener('backbutton', this.onBackKeyDown, false)
        }
      },
      onPause () {
        // Handle the pause lifecycle event.
        console.log('pause')
      },
      onResume () {
        // Handle the resume lifecycle event.
        // SetTimeout required for iOS.
        setTimeout(function () {
          console.log('resume')
        }, 0)
      },
      onBackKeyDown () {
        // Handle the back-button event on Android. By default it will exit the app.
        navigator.app.exitApp()
      }
    },
    components: {
      ConfirmDialog
    }
  }
</script>

<style>
	body {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
	}
  .footer{ /* Apply this to v-bottom-nav if necessary. */
    margin-bottom: constant(safe-area-inset-bottom);
    margin-bottom: env(safe-area-inset-bottom);
  }
  #watchstream, #selfview {
    position: fixed;
    bottom: 0;
    min-width: 100%; 
    min-height: 100%;
    transform: translateX(-31%);
  }

</style>
