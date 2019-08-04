<template>
  <div
    id="e3"
    style="max-width: 400px; margin: auto;"
    class="grey lighten-3"
  >
    <v-card>
      <v-container
        fluid
        grid-list-lg
      >
        <v-layout row wrap>
          <template v-for="item in items">
            <v-flex xs12 :key="item.title">
              <v-card :to="item.link" :color="item.color" class="white--text">
                <v-card-title primary-title>
                  <div class="headline">{{ item.title }}</div>
                  <div>{{ item.description }}</div>
                </v-card-title>
              </v-card>
            </v-flex>
          </template>
        </v-layout>
      </v-container>
    </v-card>
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
          {
            color: 'blue-grey darken-2',
            title: 'Games',
            description: 'Listen to your favorite artists and albums whenever and wherever, online and offline.',
            link: '/list'
          },
          {
            color: 'cyan darken-2',
            title: 'Lifestyle',
            description: 'Listen to your favorite artists and albums whenever and wherever, online and offline.',
            link: '/list'
          },
          {
            color: 'purple',
            title: 'Music',
            description: 'Listen to your favorite artists and albums whenever and wherever, online and offline.',
            link: '/list'
          },
          {
            color: 'pink',
            title: 'Food',
            description: 'Listen to your favorite artists and albums whenever and wherever, online and offline.',
            link: '/list'
          },
          {
            color: 'red',
            title: 'Fashion',
            description: 'Listen to your favorite artists and albums whenever and wherever, online and offline.',
            link: '/list'
          },
          {
            color: 'orange',
            title: 'Fitness',
            description: 'Listen to your favorite artists and albums whenever and wherever, online and offline.',
            link: '/list'
          },
          {
            color: 'green',
            title: 'Travel',
            description: 'Listen to your favorite artists and albums whenever and wherever, online and offline.',
            link: '/list'
          }
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
