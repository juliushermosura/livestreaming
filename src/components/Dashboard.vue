<template>
  <v-container fluid>
    <v-navigation-drawer
      width="100%"
      :value="true"
      stateless
    >
      <v-img :aspect-ratio="16/9" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
        <v-layout pa-2 column fill-height class="lightbox white--text">
          <v-spacer></v-spacer>
          <v-flex shrink>
            <v-avatar
              size="36px"
            >
              <img
                v-if="card.avatar"
                :src="card.avatar"
                alt=""
              >
              <span class="white--text headline" v-else>{{ initials(card.username) }}</span>
            </v-avatar>
            <div class="subheading">{{ card.username }}</div>
          </v-flex>
        </v-layout>
      </v-img>

      <v-list>
        <template v-for="item in items">
          <v-list-tile :key="item.title" :to="item.link">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            <v-list-tile-action>
              <v-spacer></v-spacer>
              <v-icon small color="gray">arrow_forward_ios</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider :key="`i-${item.title}`"></v-divider>
        </template>
      </v-list>
    </v-navigation-drawer>
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
        card: [
          { username: 'Onoma', avatar: 'https://randomuser.me/api/portraits/men/21.jpg' }
        ],
        dialog: true,
        items: [
          { icon: 'mail', title: 'Message', link: '/messages' },
          { icon: 'star', title: 'Recently Watched', link: '/recent' },
          // { icon: 'payment', title: 'Transaction History', link: '/transactions' },
          { icon: 'cast', title: 'Broadcast', link: '/broadcast' },
          { icon: 'help_outline', title: 'Help', link: '/help' },
          { icon: 'settings', title: 'Settings', link: '/settings' }
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
      initials (f = 'f') {
        if (f !== null || f !== undefined) {
          return f.charAt(0).toUpperCase()
        } else {
          return '?'
        }
      },

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
