<template>
  <q-page padding>
    <q-input
      v-model="name"
      label="Name"
    />
    <q-input
      label="Main Image (jpg)"
      type="file"
      @input="value => { mainFile = value[0] }"
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
      :loading="saving"
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
      saving: false,
      types,
      name: '',
      description: '',
      type: types[0],
      lat: 0,
      lng: 0,
      mainFile: null
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
        this.description = this.itemSelected.description || ''
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
    async save () {
      try {
        this.saving = true
        const payload = {
          name: this.name,
          type: this.type,
          description: this.description || '',
          position: {
            lat: Number(this.lat),
            lng: Number(this.lng)
          }
        }
        if (this.itemSelected) {
          payload.id = this.itemSelected.id
        }
        const refId = await this.$store.dispatch('saveItem', payload)
        if (!this.itemSelected) {
          this.$store.commit('selectItemId', refId)
        }
        await this.uploadMainFile()
      } catch (err) {
        console.error(err)
      }
      this.saving = false
    },
    async uploadMainFile () {
      if (this.itemSelected && this.itemSelected.id && this.mainFile) {
        await this.$store.dispatch('uploadImage', {
          path: `main/${this.itemSelected.id}.jpg`,
          file: this.mainFile
        })
      }
    }
  }
}
</script>
