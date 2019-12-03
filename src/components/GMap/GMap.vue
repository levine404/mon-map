<template>
  <div id="g-map" class="full-height" :data-types="types"></div>
</template>

<script>
import { groupBy } from 'lodash'
import variables from '../../css/quasar.variables.scss'
import MarkerClusterer from '@google/markerclusterer'
import mapConfig from './map-config'
export default {
  name: 'GMap',
  data () {
    return {
      map: null,
      // geocoder: null,
      infoWindow: new this.$gmaps.InfoWindow({
        content: 'Blank'
      }),
      clusters: {},
      defaultImage: 'https://cdn.quasar.dev/img/mountains.jpg'
    }
  },
  created () {
    // this.geocoder = new this.$gmaps.Geocoder()

    this.infoWindow.addListener('domready', this.addInfoWindowClickListener)
    this.infoWindow.addListener('closeclick', this.removeInfoWindowClickListener)
    if (this.itemSelected !== null) {
      this.centerSelectedItem()
    }
  },
  watch: {
    // itemSelected (newVal, oldVal) {
    //   if (oldVal !== null) {
    //     this.removeInfoWindowClickListener().splice(0, 1) // = [] //
    //   }
    // },
    $route (to, from) {
      if (to.path === '/') {
        if (this.itemSelected !== null) {
          this.centerSelectedItem()
        }
      }
    },
    types (newTypes, oldTypes) {
      for (const type of oldTypes) {
        if (!newTypes.includes(type)) {
          if (this.clusters[type]) {
            this.clusters[type].clearMarkers()
            this.$delete(this.clusters[type])
          }
        }
      }
    },
    groupedItems (news, old) {
      this.drawMap()
    }
  },
  computed: {
    // Get item selected
    itemSelected () {
      return this.$store.getters.itemSelected
    },
    // Group items from db by type
    groupedItems () {
      return groupBy(this.$store.getters.items, 'type')
    },
    // Calculate types used
    types () {
      return Object.keys(this.groupedItems)
    },
    // Calculate icons based on each type available
    markerIcons () {
      const mi = {}
      for (const type of this.types) {
        mi[type] = {
          url: `statics/icons/${type}.png`,
          size: this.$gmaps.Size(32, 33),
          origin: this.$gmaps.Point(0, 0),
          labelOrigin: {
            x: 16,
            y: 42
          },
          fillColor: 'white',
          anchor: this.$gmaps.Point(0, 16)
        }
      }
      return mi
    },
    infoWindowContent () {
      return 'Hello there ' + this.itemSelected
    }
  },
  mounted () {
    this.map = new this.$gmaps.Map(this.$el, mapConfig(this.$gmaps))
    // this.infoWindow
    this.drawMap()
  },
  methods: {
    drawMap () {
      for (const type of this.types) {
        if (this.clusters[type]) {
          this.clusters[type].clearMarkers()
        }
        const icon = this.markerIcons[type]
        const markers = this.groupedItems[type].map(item => {
          const marker = new this.$gmaps.Marker({
            position: item.position,
            clickable: true,
            icon,
            label: {
              text: item.name,
              color: variables.itemLabelColor,
              fontSize: variables.itemLabelSize
            }
          })
          marker.id = item.id
          this.$gmaps.event.addListener(marker, 'click', () => {
            this.clickHandler(item)
          })
          return marker
        })
        const markerClusterer = new MarkerClusterer(
          this.map,
          markers,
          {
            maxZoom: 12,
            styles: [{
              url: `statics/icons/${type}.png`,
              height: 32,
              width: 31,
              textColor: 'white'
            }]
          }
        )
        if (!this.clusters[type]) {
          this.$set(this.clusters, type, markerClusterer)
        } else {
          this.clusters[type] = markerClusterer
        }
      }
    },
    addInfoWindowClickListener () {
      const moreInfoEl = this.$el.querySelector('#more-info')
      if (moreInfoEl) {
        moreInfoEl.addEventListener('click', this.moreInfoClickHandler)
      }
    },
    removeInfoWindowClickListener () {
      const moreInfoEl = this.$el.querySelector('#more-info')
      if (moreInfoEl) {
        moreInfoEl.removeEventListener('click', this.moreInfoClickHandler)
      }
    },
    clickHandler (item) {
      if (this.itemSelected === item.id) {
        this.$store.commit('selectItemId', null)
        this.removeInfoWindowClickListener()
        this.infoWindow.close()
      } else {
        this.$store.commit('selectItemId', item.id)
        const newInfoWindowContent = `
          <div
            class="text-center"
            id="more-info"
          >
            <div class="more-info-name">${item.name || ''}</div>
            <div class="more-info-location">${item.location || ''}</div>
            <div
              class="more-info-img"
              style="background-image: url('${this.$store.getters.mainImageUrl(item.id) || this.defaultImage}')"
            ></div>
            <div class="more-info">VIEW DETAILS</div>
          </div>
        `
        this.infoWindow.setContent(newInfoWindowContent)
        const cluster = this.clusters[item.type]
        if (cluster) {
          const clusterMarkers = cluster.getMarkers()
          const marker = clusterMarkers.find(marker => marker.id === item.id)
          if (marker) {
            this.infoWindow.open(this.map, marker)
          } else {
            this.infoWindow.setPosition({
              lat: item.position.lat + 0.005,
              lng: item.position.lng
            })
            this.infoWindow.open(this.map)
          }
        }
      }
    },
    moreInfoClickHandler () {
      if (this.itemSelected !== null) {
        this.$router.push(`/details/${this.$store.getters.itemSelectedId}`)
      }
      this.infoWindow.close()
    },
    centerSelectedItem () {
      if (this.map && this.itemSelected && this.itemSelected.position) {
        this.map.setCenter(this.itemSelected.position)
      }
    }
  }
}
</script>

<style lang="scss">
.more-info-name {
  font-size: 2.5vh;
  padding: 2px;
}
.more-info-location {
  padding: 2px;
}
.more-info-img {
  width: 160px;
  height: 80px;
  background-position: top center;
  background-size: cover;
}
.more-info {
  padding: 8px;
  color: green;
}
</style>
