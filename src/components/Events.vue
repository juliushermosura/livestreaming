<template>
  <v-container fluid id="dashboard">
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-container pl-3 pr-3>
        </v-container>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-content{
  padding-top: 0 !important;
}
.header {
  background: #fff;
  margin: 0px -23px 20px -23px;
  padding: 0px 20px 0 20px;
  width: 100%;
}
h2.header {
  background: #fff;
  margin: -23px -23px 20px -23px;
  padding: 20px;
}
.content--wrap .container {
  background: #f5f5f5;
}
.content-container {
  padding: 20px;
  background: #fff;
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
</style>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        dialog: true,
        items: [],
        editedItem: {
          name: '',
          email: ''
        }
      }
    },
    created () {
      this.initialize()
    },
    watch: {
    },
    computed: {
    },
    methods: {
      initialize () {
        // var d = this
        this.session = JSON.parse(localStorage.getItem('session'))
        axios.defaults.headers.common['Authorization'] = `bearer ${this.session.api_key}`
      }
    },
    components: {
    }
  }
</script>
