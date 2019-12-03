<template>
  <q-item class="cursor-pointer">
    <q-item-section side>
      {{ itemIndex + 1 }}
    </q-item-section>

    <q-item-section top thumbnail class="q-ml-none">
      <q-img
        :ref="`img::${item.id}`"
        :src="mainImgUrl || defaultImage"
        contain
        position="center center"
        style="height: 80px; width: 100px"
        @click="$router.push(`/details/${item.id}`)"
      />
    </q-item-section>

    <q-item-section>
      <div @click="$router.push(`/details/${item.id}`)">
        <q-item-label>{{ item.name }}</q-item-label>
        <q-item-label caption>{{ shortDescription }}</q-item-label>
      </div>
    </q-item-section>

    <q-item-section
      side
      style="max-width: 60px"
      class="text-center"
      @click="showOnMap"
    >
      <q-icon name="map" />
    </q-item-section>

    <q-item-section
      v-if="$store.getters.loggedUser"
      side
      style="max-width: 60px"
      class="text-center"
      @click="editItem"
    >
      <q-icon name="edit" />
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'ListItem',
  data () {
    return {
      defaultImage: '/statics/empty.png'
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    itemIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    mainImgUrl () {
      return this.$store.getters.mainImageUrl(this.item.id)
    },
    shortDescription () {
      if (this.item.description && this.item.description.length > 50) {
        return this.item.description.substring(0, 47) + '...'
      } else {
        return this.item.description
      }
    }
  },
  methods: {
    editItem () {
      this.$store.commit('selectItemId', this.item.id)
      this.$router.push('/edit')
    },
    showOnMap () {
      this.$store.commit('selectItemId', this.item.id)
      this.$router.push('/')
    }
  }
}
</script>
