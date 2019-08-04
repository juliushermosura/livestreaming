<template>
  <v-layout justify-center>
    <v-flex xs12 sm6>
      <v-card>
        <v-container
          fluid
          grid-list-md
        >
          <v-layout row wrap>
            <v-flex
              v-for="card in cards"
              v-bind="{ [`xs${card.flex}`]: true }"
              :key="card.title"
            >
              <v-card>
                <v-img
                  :src="card.src"
                  height="200px"
                  @click="$parent.$parent.$parent.watchlive"
                >
                  <v-container
                    fill-height
                    fluid
                    pa-2
                  >
                    <v-layout fill-height>
                      <v-flex xs9 align-end flexbox>
                        <v-chip>
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
                          {{ card.username }}
                        </v-chip>
                      </v-flex>
                      <v-flex xs3 text-xs-right>
                        <v-icon class="white--text">visibility</v-icon>
                        <span class="align-middle white--text">{{ card.viewers }}</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
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
        cards: [
          { username: 'LukeCage', avatar: 'https://randomuser.me/api/portraits/men/25.jpg', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', country: '', viewers: 22, flex: 12 },
          { username: 'JessicaJones', avatar: 'https://randomuser.me/api/portraits/women/57.jpg', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', country: '', viewers: 42, flex: 12 },
          { username: 'ItsNatasha', avatar: 'https://randomuser.me/api/portraits/women/66.jpg', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', country: '', viewers: 601, flex: 12 },
          { username: 'Hanna', avatar: 'https://randomuser.me/api/portraits/women/17.jpg', src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', country: '', viewers: 2, flex: 12 },
          { username: 'Vienne', avatar: 'https://randomuser.me/api/portraits/women/21.jpg', src: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg', country: '', viewers: 6, flex: 12 }
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
