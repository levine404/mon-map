<template>
  <div>
    <div class="detail-title">{{ item.name }}</div>
    <div class="detail-sub-title">{{ item.location }}</div>
    <q-img
      :src="$store.getters.mainImageUrl(item.id) || defaultImage"
      cover
      position="center center"
      style="height: 200px; max-width: 600px"
    />
    <p class="detail-p">
      {{ item.about }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'About',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      defaultImage: '/statics/empty.png'
    }
  }
}
</script>

<style lang="scss">
.detail-title {
  font-size: 4vh;
  margin-bottom: 12px;
}
.detail-sub-title {
  font-size: 2.5vh;
  margin-bottom: 12px;
}
.detail-p {
  margin: 12px 0;
  white-space: pre-wrap;
}
</style>
