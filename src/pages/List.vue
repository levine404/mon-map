<template>
  <q-page>
    <q-list>

      <q-item
        v-for="(item, index) in items"
        :key="item.id"
      >

        <q-item-section side>
          {{ index + 1 }}
        </q-item-section>

        <q-item-section top thumbnail class="q-ml-none">
          <q-img
            :ref="`img::${item.id}`"
            :src="mainImageUrl(item.id) && mainImageUrls[item.id]"
            contain
            position="center center"
            style="height: 80px; width: 100px"
            @click="$router.push(`/details/${item.id}`)"
          />
        </q-item-section>

        <q-item-section>
          <div @click="$router.push(`/details/${item.id}`)">
            <q-item-label>{{ item.name }}</q-item-label>
            <q-item-label caption>{{ shortDescription(item.description) }}</q-item-label>
          </div>
        </q-item-section>

        <q-item-section
          side
          style="max-width: 60px"
          class="text-center"
          @click="showOnMap(item.id)"
        >
          <q-icon name="map" />
        </q-item-section>

        <q-item-section
          side
          style="max-width: 60px"
          class="text-center"
          @click="editItem(item.id)"
        >
          <q-icon name="edit" />
        </q-item-section>

      </q-item>

      <q-item>

        <q-btn
          icon="add"
          flat
          class="full-width"
          @click="editItem(null)"
        />

      </q-item>

    </q-list>
  </q-page>
</template>

<script>
import firebase from 'firebase'
const DEFAULT_IMAGE = 'https://cdn.quasar.dev/img/mountains.jpg'
export default {
  name: 'List',
  data () {
    return {
      mainImageUrls: {}
    }
  },
  watch: {
    items (newVal) {
      newVal.forEach(item => {
        if (!this.mainImageUrls[item.id]) {
          this.$set(this.mainImageUrls, item.id, DEFAULT_IMAGE)
        }
      })
    }
  },
  computed: {
    items () {
      return this.$store.getters.items
    }
  },
  methods: {
    shortDescription (description) {
      if (description && description.length > 50) {
        return description.substring(0, 47) + '...'
      } else {
        return description
      }
    },
    editItem (itemId) {
      this.$store.commit('selectItemId', itemId)
      this.$router.push('/edit')
    },
    showOnMap (itemId) {
      this.$store.commit('selectItemId', itemId)
      this.$router.push('/')
    },
    async mainImageUrl (itemId) {
      const storageRef = firebase.storage().ref()
      try {
        const url = await storageRef.child(`main/${itemId}.jpg`).getDownloadURL()
        if (url) {
          this.mainImageUrls[itemId] = url
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
