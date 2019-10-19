<template>
  <div id="g-map" class="full-height"></div>
</template>

<script>
import variables from '../../css/quasar.variables.scss'
import MarkerClusterer from '@google/markerclusterer'
import mapConfig from './map-config'
import monImage from './mon-image'
export default {
  name: 'GMap',
  data () {
    return {
      map: null,
      geocoder: null
    }
  },
  created () {
    this.geocoder = new this.$gmaps.Geocoder()
  },
  computed: {
    monMarkers () {
      if (this.map) {
        return this.$store.getters.items.map(item => {
          const marker = new this.$gmaps.Marker({
            position: item.position,
            icon: monImage,
            label: {
              text: item.name,
              color: variables.itemLabelColor,
              fontSize: variables.itemLabelSize
            },
            animation: this.$gmaps.Animation.bn
          })
          return marker
        })
      } else {
        return []
      }
    },
    clusteredMonMarker () {
      if (this.map && this.monMarkers.length) {
        const markerClusterer = new MarkerClusterer(
          this.map,
          this.monMarkers,
          {
            maxZoom: 12,
            styles: [{
              url: require('../../assets/mon-icon.png'),
              height: 32,
              width: 31,
              textColor: 'white'
            }]
          }
        )
        return markerClusterer
      } else {
        return null
      }
    }
  },
  mounted () {
    this.map = new this.$gmaps.Map(this.$el, mapConfig)
    console.log('map.markers', this.clusteredMonMarker)
  }
}
</script>
