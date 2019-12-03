<template>
  <div>
    <div class="detail-title">{{ item.name }}</div>
    <div class="detail-sub-title">History</div>
    <p class="detail-p">
      {{ item.history }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'History',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
