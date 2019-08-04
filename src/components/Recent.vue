<template>
  <v-layout justify-center>
    <v-flex xs12>
      <v-toolbar>
        <v-toolbar-side-icon to="/dashboard"><v-icon>arrow_back_ios</v-icon></v-toolbar-side-icon>
        <v-toolbar-title>Recent</v-toolbar-title>
      </v-toolbar>
      <v-card>
        <v-container
          fluid
          grid-list-md
        >
          <v-layout row wrap>
            <template
              v-for="card in cards"
              v-bind="{ [`xs${card.flex}`]: true }" 
            >
              <v-flex @click="$parent.$parent.$parent.watchlive" xs6 :key="`${card.username}-1`">
                <v-card>
                  <v-img
                    :src="card.src"
                    height="130px"
                  >
                  </v-img>
                </v-card>
              </v-flex>
              <v-flex @click="$parent.$parent.$parent.watchlive" xs6 :key="`${card.username}-2`">
                <v-card flat>
                  <v-card-title><h4>{{ card.description }}</h4></v-card-title>
                  <v-card-text>
                    <div>
                      <h3><v-icon>person_outline</v-icon>{{ card.username }}</h3>
                    </div>
                    <div>
                      <h4 class="green--text text-uppercase">{{ card.category }}</h4>
                    </div>
                  </v-card-text>
                </v-card>
              </v-flex>
            </template>
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
          { description: 'Oh! Sweet Christmas...', category: 'Games', username: 'LukeCage', avatar: 'https://randomuser.me/api/portraits/men/25.jpg', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', country: '', viewers: 22, flex: 12 },
          { description: 'Come see me now', category: 'Travel', username: 'JessicaJones', avatar: 'https://randomuser.me/api/portraits/women/57.jpg', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', country: '', viewers: 42, flex: 12 },
          { description: '', category: 'Lifestyle', username: 'ItsNatasha', avatar: 'https://randomuser.me/api/portraits/women/66.jpg', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', country: '', viewers: 601, flex: 12 },
          { description: 'Stop Look and Listen', category: 'Fashion', username: 'Hanna', avatar: 'https://randomuser.me/api/portraits/women/17.jpg', src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', country: '', viewers: 2, flex: 12 },
          { description: '', category: 'Travel', username: 'Vienne', avatar: 'https://randomuser.me/api/portraits/women/21.jpg', src: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg', country: '', viewers: 6, flex: 12 }
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
