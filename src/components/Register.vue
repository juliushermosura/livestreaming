<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
            <v-toolbar dark color="primary">
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-form @submit.prevent="register">
                <v-card-text>
                    <v-text-field 
                      prepend-icon="person" 
                      name="name" 
                      label="Name" 
                      id="name"
                      type="text"
                      :error="error"
                      :error-messages="errorMessage"
                      v-model="name"
                    >
                    </v-text-field>
                    <v-text-field 
                      prepend-icon="mail" 
                      name="email" 
                      label="Email Address" 
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
                      prepend-icon="phone_android" 
                      name="phone" 
                      label="Phone Number" 
                      id="phone"
                      type="text"
                      :error="error"
                      :error-messages="errorMessage"
                      v-model="phone"
                      autocorrect="off"
                      autocapitalize="none"
                    >
                    </v-text-field>
                    <v-text-field 
                      prepend-icon="lock" 
                      name="password" 
                      label="Password" 
                      id="password" 
                      v-model="pass" 
                      :error="error"
                      :append-icon="e1 ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (e1 = !e1)"
                      :type="e1 ? 'password' : 'text'"
                      hint="At least 8 characters"
                      min="8"
                      counter
                    ></v-text-field>
                    <v-select
                      prepend-icon="group" 
                      :items="roleItems"
                      v-model="role"
                      label="Register As"
                      persistent-hint
                    ></v-select>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn type="submit" color="primary">Submit</v-btn>
                </v-card-actions>
            </v-form>
            <div class="below_box" align="center"><a href="/login">Already member? Login to your account</a></div>
        </v-card>
        </v-flex>
    </v-layout>
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
</style>
<script>
import axios from 'axios'
import {uuid} from 'vue-uuid'
export default {
  data () {
    return {
      e1: false,
      username: '',
      phone: '',
      name: '',
      pass: '',
      role: '',
      roleItems: ['Customer', 'Broker', 'Both'],
      error: false,
      errorMessage: []
    }
  },
  methods: {
    register () {
      var d = this
      axios.post(`${window.apiLink}register`, {
        email: this.username,
        password: this.pass,
        name: this.name,
        phone: this.phone,
        role: this.role
      }).then(function (response) {
        if (response.data.status === 'error') {
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
          // localStorage.setItem('session', JSON.stringify(response.data))
          // d.$emit('setRoleName', response.data)
          d.$router.replace({ name: 'Login' })
        }
      }).catch(function (error) {
        d.$emit('receiveAlertMessage', {
          body: error,
          type: 'error',
          id: uuid.v4()
        })
      })
    }
  }
}
</script>