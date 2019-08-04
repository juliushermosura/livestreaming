<template>
  <div>
    <v-toolbar>
      <v-toolbar-side-icon to="/dashboard"><v-icon>arrow_back_ios</v-icon></v-toolbar-side-icon>
      <v-toolbar-title>Help</v-toolbar-title>
    </v-toolbar>
    <v-flex xs12>
      <v-card>
        <v-card-text>
          <h4>Please write down your question and suggestions.</h4>
          <v-textarea solo></v-textarea>
          <h4>Contact Number</h4>
          <v-text-field solo></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn round block color="primary">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </div>
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
        dialog: true
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
