<template>
  <q-page>
    <q-list>

      <ListItem
        v-for="(item, index) in $store.getters.items"
        :key="item.id"
        :item="item"
        :itemId="item.id"
        :itemIndex="index"
      />

      <q-item>

        <q-btn
          v-if="$store.getters.loggedUser"
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
import ListItem from './ListItem.vue'
export default {
  name: 'List',
  components: {
    ListItem
  },
  methods: {
    editItem () {
      this.$store.commit('selectItemId')
      this.$router.push('/edit')
    }
  }
}
</script>
