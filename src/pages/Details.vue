<template>
  <q-page>
    <div class="details flex column">
      <q-tab-panels
        :value="tabIndex"
        style="flex: 1 1 0"
      >
        <q-tab-panel
          v-for="(detailTab, tabIndex) of detailTabs"
          :key="tabIndex"
          :name="tabIndex"
        >
          <component
            v-if="item"
            :is="detailTab.component"
            :item="item"
          />
        </q-tab-panel>
      </q-tab-panels>
      <q-tabs
        v-model="tabIndex"
        dense
        class="bg-primary text-white"
        align="justify"
        inline-label
      >
        <q-tab
          v-for="(detailTab, tabIndex) in detailTabs"
          :key="'t' + tabIndex"
          :name="tabIndex"
          :icon="detailTab.icon"
          :label="detailTab.name"
        />
      </q-tabs>
    </div>
  </q-page>
</template>

<script>
import About from '../components/Details/About.vue'
import History from '../components/Details/History.vue'
import Contact from '../components/Details/Contact.vue'
import appConfig from '../config/app.config'
export default {
  name: 'Details',
  components: {
    About,
    History,
    Contact
  },
  data () {
    return {
      tabIndex: 0,
      detailTabs: appConfig.detailTabs
    }
  },
  watch: {
    $route (to, from) {
      this.tabIndex = 0
    }
  },
  computed: {
    item () {
      return this.$store.getters.getItem(this.$route.params.id)
    }
  }
}
</script>

<style lang="scss">
.details {
  width: 100%;
  height: 100%;
}
</style>
