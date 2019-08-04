<template>
  <v-dialog persistent :value="confirmer.active" max-width="290">
    <v-card>
      <v-card-title class="headline">{{ confirmer.title }}</v-card-title>
      <v-card-text>{{ confirmer.body }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat="flat" @click.native="cancel">Cancel</v-btn>
        <v-btn color="green darken-1" flat="flat" @click.native="confirm">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    confirmer () {
      return this.$store.state.confirmer
    }
  },
  methods: {
    confirm () {
      console.log(this.confirmer)
      this.confirmer.resolve(true)
      this.$store.commit('confirmer/DEACTIVATE')
    },
    cancel () {
      this.confirmer.resolve(false)
      this.$store.commit('confirmer/DEACTIVATE')
    }
  }
}
</script>
