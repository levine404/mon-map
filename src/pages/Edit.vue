<template>
  <q-page padding>
    <q-input
      v-model="name"
      label="Name"
    />
    <q-input
      v-model="description"
      label="Description"
      type="textarea"
    />
    <q-select
      v-model="type"
      :options="types"
      label="Type"
    />
    <q-input
      v-model="lat"
      type="number"
      label="Latitude"
    />
    <q-input
      v-model="lng"
      type="number"
      label="Longitude"
    />
    <q-btn
      flat
      color="primary"
      label="Save"
      class="full-width"
    />
  </q-page>
</template>

<script>
const types = [
  'monastery',
  'stupa',
  'site'
]
export default {
  name: 'Edit',
  data () {
    return {
      types,
      name: '',
      description: '',
      type: types[0],
      lat: 0,
      lng: 0
    }
  },
  watch: {
    $route (to, from) {
      console.log('to', to, 'from', from)
      if (to.path === '/edit') {
        if (this.$store.getters.itemSelected !== null) {
          this.loadItemSelected()
        } else {
          this.reset()
        }
      }
    }
  },
  created () {
    if (this.$store.getters.itemSelected !== null) {
      this.loadItemSelected()
    }
  },
  methods: {
    loadItemSelected () {
      const item = this.$store.getters.items[this.$store.getters.itemSelected]
      if (item) {
        this.name = item.name
        this.description = item.description
        this.type = item.type
        this.lat = item.lat
        this.lng = item.lng
      } else {
        this.reset()
      }
    },
    reset () {
      this.name = ''
      this.description = ''
      this.type = this.types[0]
      this.lat = 0
      this.lng = 0
    }
  }
}
</script>
