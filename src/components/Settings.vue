<template>
  <div>
    <v-toolbar>
      <v-toolbar-side-icon to="/dashboard"><v-icon>arrow_back_ios</v-icon></v-toolbar-side-icon>
      <v-toolbar-title>Settings</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer
      width="100%"
      :value="true"
      stateless
    >
      <v-list>
        <template v-for="item in items">
          <v-list-tile :key="item.title" :to="item.link">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            <v-list-tile-action v-if="item.link"><v-spacer></v-spacer><v-icon small color="gray">arrow_forward_ios</v-icon></v-list-tile-action>
          </v-list-tile>
          <v-divider :key="`i-${item.title}`"></v-divider>
        </template>
      </v-list>
    </v-navigation-drawer>
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
        dialog: true,
        items: [
          { title: 'About Us', link: '/aboutus' },
          { title: 'Version 0.1', link: '' },
          { title: 'Rate Us', link: '#' }
        ]
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
