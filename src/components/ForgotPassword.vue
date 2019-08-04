<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
            <v-toolbar dark color="primary">
                <v-toolbar-title>Forgot Password</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-form @submit.prevent="forgotPassword">
                <v-card-text>
                    <v-text-field 
                      prepend-icon="person"
                      name="username" 
                      label="Email" 
                      id="username"
                      type="text"
                      :error="error"
                      :error-messages="errorMessage"
                      v-model="username"
                      autocorrect="off"
                      autocapitalize="none"
                    >
                    </v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn type="submit" color="primary">Submit</v-btn>
                </v-card-actions>
            </v-form>
            <div class="below_box" align="center"><a href="/login">Go back to Login</a></div>
        </v-card>
        </v-flex>
    </v-layout>
    <v-dialog v-model="alert" max-width="500">
        <v-card>
        <v-card-title
          class="headline primary alertHead"
          primary-title
        >
          Forgot Password
        </v-card-title>

        <v-card-text>
            A link to reset your password is sent to your email.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="goLogin"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  top: 40px;
}
.alertHead{
    color:white;
}
</style>
<script>
import axios from 'axios'
import {uuid} from 'vue-uuid'
export default {
  data () {
    return {
      alert: false,
      username: '',
      pass: '',
      error: false,
      errorMessage: []
    }
  },
  methods: {
    goLogin () {
      this.$router.replace({ name: 'Login' })
    },
    forgotPassword () {
      var data = this
      if (data.username.length > 0) {
        axios.post('https://www..com/resetpassword.php', {
          email: data.username
        }).then(function (response) {
          console.log(response)
          data.alert = true
          data.username = ''
        }).catch(function (error) {
          alert(error)
        })
      } else {
        alert('Email is Required!')
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