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
    >
      <template v-slot:append>
        <img :src="`statics/icons/${type}.png`"/>
      </template>
    </q-select>
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
      @click="save"
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
      if (to.path === '/edit') {
        if (this.$store.getters.itemSelected !== null) {
          this.loadItemSelected()
        } else {
          this.reset()
        }
      }
    }
  },
  computed: {
    itemSelected () {
      return this.$store.getters.itemSelected
    }
  },
  created () {
    if (this.$store.getters.itemSelected !== null) {
      this.loadItemSelected()
    }
  },
  methods: {
    loadItemSelected () {
      if (this.itemSelected) {
        this.name = this.itemSelected.name
        this.description = this.itemSelected.description
        this.type = this.itemSelected.type
        this.lat = this.itemSelected.position.lat
        this.lng = this.itemSelected.position.lng
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
    },
    save () {
      this.$store.dispatch('saveItem')
    }
  }
}
</script>
