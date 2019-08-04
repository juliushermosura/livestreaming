<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
            <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-form @submit.prevent="login">
                <v-card-text>
                    <v-text-field 
                      prepend-icon="person" 
                      name="login" 
                      label="Login" 
                      id="username"
                      type="text"
                      :error="error"
                      :error-messages="errorMessage"
                      v-model="username"
                      autocorrect="off"
                      autocapitalize="none"
                    >
                    </v-text-field>
                    <v-text-field 
                      prepend-icon="lock" 
                      name="password" 
                      label="Password" 
                      id="password" 
                      type="password" 
                      v-model="pass" 
                      :error="error"
                    ></v-text-field>
                    <v-btn type="submit" block color="">Login</v-btn>
                </v-card-text>
                <v-divider></v-divider>
                <v-card>
                  <v-card-text>
                    <v-btn block color="primary" @click="openFbLoginDialog"><i class="icon-facebook mr25"></i> Sign in with Facebook</v-btn>
                    <center>OR</center>
                    <v-btn @click="gmailLogin" block color="red" dark><i class="icon-google-plus mr25"></i> Sign in with Google</v-btn>
                    <div id="google-signin-btn" hidden></div>
                  </v-card-text>
                </v-card>
            </v-form>
            <div class="below_box" align="center">
              <a href="/register">New user? Create your Account</a>
              <a href="/forgotpassword" align="right">Forgot Password?</a>
            </div>
        </v-card>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.below_box a{
  position: absolute;;
}
.below_box a:first-child{
  left: 0;
}
.below_box a:last-child{
  right: 0;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.below_box {
  position: relative;
  top: 20px;
}
.mr25{
  margin-right: 25px;
}
</style>
<script>
import axios from 'axios'
import {uuid} from 'vue-uuid'
import jQuery from 'jquery'
window.$ = window.jQuery = jQuery
export default {
  data () {
    return {
      username: '',
      pass: '',
      error: false,
      errorMessage: []
    }
  },
  mounted () {
    window.gapi.signin2.render('google-signin-btn', { // this is the button "id"
      onsuccess: this.onSignIn // note, no "()" here
    })
  },
  methods: {
    // signIn (googleUser){
    //   console.log('hello world!')
    //   // var profile = googleUser.getBasicProfile()
    //   // console.log('ID: ' + profile.getId())// Do not send to your backend! Use an ID token instead.
    //   // console.log('Name: ' + profile.getName())
    //   // console.log('Image URL: ' + profile.getImageUrl())
    //   // console.log('Email: ' + profile.getEmail()) // This is null if the 'email' scope is not present.
    //   // var id_token = googleUser.getAuthResponse().id_token
    //   // console.log("ID Token: " + id_token)
    // },
    gmailLogin () {
      window.$('.abcRioButtonLightBlue').click()
    },
    onSignIn (user) {
      var gmailAccount = this
      // do stuff, for example
      const profile = user.getBasicProfile()
      // console.log('ID: ' + profile.getId())// Do not send to your backend! Use an ID token instead.
      // console.log('Name: ' + profile.getName())
      // console.log('Image URL: ' + profile.getImageUrl())
      // console.log('Email: ' + profile.getEmail()) // This is null if the 'email' scope is not present.
      var idToken = user.getAuthResponse().id_token
      // console.log('ID Token: ' + idToken)
      var gmailInfo = {
        name: profile.getName(),
        email: profile.getEmail(),
        id: profile.getId(),
        token: idToken
      }
      gmailAccount.gRegister(gmailInfo)
    },
    signOut () {
      var auth2 = window.gapi.auth2.getAuthInstance()
      auth2.signOut().then(function () {
        console.log('User signed out.')
      })
      // var idToken = user.getAuthResponse().id_token
      // console.log('ID Token: ' + idToken)
      // this.$router.replace({name: 'Dashboard'})
    },
    gRegister (data) {
      var d = this
      axios.post(`${window.apiLink}register`, {
        email: data.email,
        name: data.name,
        role: 'Customer',
        google_id: data.id,
        api_key: data.token
      }).then(function (response) {
        if (response.data.status === 'error') {
          console.log(response.data.status)
          d.$emit('receiveAlertMessage', {
            body: response.data.message,
            type: 'error',
            id: uuid.v4()
          })
        } else if (response.data.status === 'validation_error') {
          console.log(response.data.status)
          d.error = true
          // console.log(response.data.message)
          d.errorMessage = response.data.message
        } else {
          if (response.data.result === 'user exist') {
            var accountAutorized = {
              id: data.id,
              type: 'google',
              token: data.token
            }
            d.socMedAuthorize(accountAutorized)
          } else {
            localStorage.setItem('session', JSON.stringify(response.data))
            d.$emit('setRoleName', response.data)
            d.$router.replace({name: 'Dashboard'})
          }
          // alert(response.data.status)
          // localStorage.setItem('session', JSON.stringify(response.data))
          // d.$emit('setRoleName', response.data)
          // d.$router.replace({ name: 'Das' })
          // localStorage.setItem('session', JSON.stringify(data.token))
          // d.$router.replace({name: 'Dashboard'})
        }
      }).catch(function (error) {
        d.$emit('receiveAlertMessage', {
          body: error,
          type: 'error',
          id: uuid.v4()
        })
      })
    },
    socMedAuthorize (data) {
      var d = this
      axios.get(`${window.apiLink}socmedauthorize`, {
        params: {
          user_id: data.id,
          login_type: data.type,
          access_token: data.token
        }
      }).then(function (response) {
        if (response.data.status === 'error') {
          console.log(response.data.status)
          d.$emit('receiveAlertMessage', {
            body: response.data.message,
            type: 'error',
            id: uuid.v4()
          })
        } else if (response.data.status === 'validation_error') {
          d.error = true
          // console.log(response.data.message)
          d.errorMessage = response.data.message
        } else {
          console.log('success1')
          // localStorage.setItem('session', JSON.stringify(response.data))
          // d.$emit('setRoleName', response.data)
          // d.$router.replace({ name: 'Das' })
          localStorage.setItem('session', JSON.stringify(response.data))
          d.$emit('setRoleName', response.data)
          d.$router.replace({name: 'Dashboard'})
        }
      }).catch(function (error) {
        console.log(error)
        d.$emit('receiveAlertMessage', {
          body: error,
          type: 'error',
          id: uuid.v4()
        })
      })
    },
    register (data) {
      var d = this
      axios.post(`${window.apiLink}register`, {
        email: data.email,
        name: data.name,
        role: 'Customer',
        fb_id: data.id,
        api_key: data.token
      }).then(function (response) {
        console.log(response + '1')
        if (response.data.status === 'error') {
          d.$emit('receiveAlertMessage', {
            body: response.data.message,
            type: 'error',
            id: uuid.v4()
          })
        } else if (response.data.status === 'validation_error') {
          console.log(response + '2')
          d.error = true
          // console.log(response.data.message)
          d.errorMessage = response.data.message
        } else {
          if (response.data.result === 'user exist') {
            var accountAutorized = {
              id: data.id,
              type: 'facebook',
              token: data.token
            }
            d.socMedAuthorize(accountAutorized)
          } else {
            localStorage.setItem('session', JSON.stringify(response.data))
            d.$emit('setRoleName', response.data)
            d.$router.replace({name: 'Dashboard'})
          }
          // localStorage.setItem('session', JSON.stringify(response.data))
          // d.$emit('setRoleName', response.data)
          // d.$router.replace({ name: 'Das' })
          // localStorage.setItem('session', JSON.stringify(data.token))
          // d.$router.replace({name: 'Dashboard'})
        }
      }).catch(function (error) {
        d.$emit('receiveAlertMessage', {
          body: error,
          type: 'error',
          id: uuid.v4()
        })
      })
    },
    openFbLoginDialog () {
      window.FB.login(this.checkLoginState, { scope: 'email' })
    },
    checkLoginState: function (response) {
      var account = this
      if (response.status === 'connected') {
        window.FB.api('/me', { fields: 'name,email,id' }, function (profile) {
          var info = {
            token: response.authResponse.accessToken,
            name: profile.name,
            email: profile.email,
            id: profile.id
          }
          account.register(info)
        })
      } else if (response.status === 'not_authorized') {
        // the user is logged in to Facebook,
        // but has not authenticated your app
      } else {
        // the user isn't logged in to Facebook.
      }
    },
    login () {
      var d = this
      axios.get(`${window.apiLink}login`, {
        params: {
          email: this.username,
          password: this.pass
        }
      }).then(function (response) {
        if (response.data.status === 'error') {
          d.$emit('receiveAlertMessage', {
            body: response.data.message,
            type: 'error',
            id: uuid.v4()
          })
        } else {
          localStorage.setItem('session', JSON.stringify(response.data))
          d.$emit('setRoleName', response.data)
          if (d.$route.query.redirect !== undefined) {
            d.$router.replace({ path: d.$route.query.redirect })
          } else {
            d.$router.replace({ name: 'Dashboard' })
          }
        }
      }).catch(function (error) {
        if (error.response.status !== undefined && error.response.status === 422) {
          d.error = true
          d.errorMessage = error.response.data.username
        } else {
          d.$emit('receiveAlertMessage', {
            body: error.response.statusText,
            type: 'error',
            id: uuid.v4()
          })
        }
      })
    }
  }
}
</script>