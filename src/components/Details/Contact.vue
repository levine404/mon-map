<template>
  <div>
    <div class="detail-title">{{ item.name }}</div>
    <div class="detail-sub-title">Contact</div>
    <div
      v-if="item.email"
      class="detail-contact-item"
    >
      <div class="detail-contact-label">Email</div>
      <div>{{ item.email }}</div>
    </div>

    <div
      v-if="item.website"
      class="detail-contact-item"
    >
      <div class="detail-contact-label">Website</div>
      <div
        class="cursor-pointer"
        @click="clickHandler(item.website)"
      >
        {{ item.website }}
      </div>
    </div>

    <div
      v-if="item.phone"
      class="detail-contact-item"
    >
      <div class="detail-contact-label">Phone</div>
      <div class="detail-contact-item">
        {{ item.phone }}
      </div>
    </div>

    <div
      v-if="item.addressDescription"
      class="detail-contact-item"
    >
      <div class="detail-contact-label">Address</div>
      <div class="detail-contact-item">
        {{ item.addressDescription }}
      </div>
    </div>
  </div>
</template>

<script>
import { openURL } from 'quasar'
export default {
  name: 'Contact',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    clickHandler (url) {
      openURL(url.includes('http') ? url : 'https://' + url)
    }
  }
}
</script>

<style lang="scss">
.detail-contact-label {
  font-weight: 900;
}
.detail-contact-item {
  margin-bottom: 12px;
}
</style>
