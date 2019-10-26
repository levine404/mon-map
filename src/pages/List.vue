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
          <img src="https://cdn.quasar.dev/img/mountains.jpg">
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ item.name }}</q-item-label>
          <q-item-label caption>{{ shortDescription(item.description) }}</q-item-label>
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
export default {
  name: 'List',
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
    }
  }
}
</script>
