<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.$store.dispatch('getItems')
  },
  watch: {
    items () {
      this.$store.dispatch('getAllMainImageUrls')
    }
  },
  computed: {
    items () {
      return this.$store.getters.items
    }
  }
}
</script>
