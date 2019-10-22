<template>
  <div id="g-map" class="full-height"></div>
</template>

<script>
import variables from '../../css/quasar.variables.scss'
import MarkerClusterer from '@google/markerclusterer'
import mapConfig from './map-config'
import monImage from './mon-image'
import stuImage from './stu-image'
export default {
  name: 'GMap',
  data () {
    return {
      map: null,
      geocoder: null,
      infoWindow: new this.$gmaps.InfoWindow({
        content: 'Blank'
      })
    }
  },
  created () {
    this.geocoder = new this.$gmaps.Geocoder()
    this.infoWindow.addListener('domready', this.addInfoWindowClickListener)
    this.infoWindow.addListener('closeclick', this.removeInfoWindowClickListener)
    if (this.itemSelected !== null) {
      this.centerSelectedItem()
    }
  },
  watch: {
    itemSelected (newVal, oldVal) {
      if (oldVal !== null) {
        this.removeInfoWindowClickListener()
      }
    },
    $route (to, from) {
      if (to.path === '/') {
        if (this.itemSelected !== null) {
          this.centerSelectedItem()
        }
      }
    }
  },
  computed: {
    items () {
      return this.$store.getters.items.map((item, originalIndex) => ({ ...item, originalIndex }))
    },
    itemSelected () {
      return this.$store.getters.itemSelected
    },
    stuItems () {
      return this.items
        .filter(item => item.type === 'stupa')
        .map((item, index) => ({ ...item, index }))
    },
    monItems () {
      return this.items
        .filter(item => item.type === 'monastery')
        .map((item, index) => ({ ...item, index }))
    },
    stuMarkers () {
      if (this.map) {
        return this.stuItems.map((item, index) => {
          const marker = new this.$gmaps.Marker({
            position: item.position,
            clickable: true,
            icon: stuImage,
            label: {
              text: item.name,
              color: variables.itemLabelColor,
              fontSize: variables.itemLabelSize
            },
            animation: this.$gmaps.Animation.bn,
            click: this.clickHandler
          })
          marker.addListener('click', () => {
            this.clickHandler('stu', item)
          })
          return marker
        })
      } else {
        return []
      }
    },
    monMarkers () {
      if (this.map) {
        return this.monItems.map((item, index) => {
          const marker = new this.$gmaps.Marker({
            position: item.position,
            clickable: true,
            cursor: 'pointer',
            icon: monImage,
            label: {
              text: item.name,
              color: variables.itemLabelColor,
              fontSize: variables.itemLabelSize
            },
            animation: this.$gmaps.Animation.bn
          })
          marker.addListener('click', () => {
            this.clickHandler('mon', item)
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
    },
    clusteredStuMarker () {
      if (this.map && this.stuMarkers.length) {
        const markerClusterer = new MarkerClusterer(
          this.map,
          this.stuMarkers,
          {
            maxZoom: 12,
            styles: [{
              url: require('../../assets/stu-icon.png'),
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
    },
    infoWindowContent () {
      return 'Hello there ' + this.items[this.itemSelected]
    }
  },
  mounted () {
    this.map = new this.$gmaps.Map(this.$el, mapConfig)
    // Force rendering of computed items
    // eslint-disable-next-line no-unused-expressions
    this.clusteredMonMarker
    // eslint-disable-next-line no-unused-expressions
    this.clusteredStuMarker
    // eslint-disable-next-line no-unused-expressions
    this.infoWindow
  },
  methods: {
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
    clickHandler (itemType, item) {
      if (this.itemSelected === item.originalIndex) {
        this.$store.commit('selectItem', null)
        this.removeInfoWindowClickListener()
        this.infoWindow.close()
      } else {
        this.$store.commit('selectItem', item.originalIndex)
        const newInfoWindowContent = `<div>${item.name}<span id="more-info">More Info</span><q-btn label="MORE"></q-btn></div>`
        this.infoWindow.setContent(newInfoWindowContent)
        this.infoWindow.open(this.map, this[itemType + 'Markers'][item.index])
      }
    },
    moreInfoClickHandler () {
      if (this.itemSelected !== null) {
        this.$router.push(`/details/${this.items[this.itemSelected].id}`)
      }
      this.infoWindow.close()
    },
    centerSelectedItem () {
      const item = this.items[this.itemSelected]
      if (item) {
        this.map.setCenter(item.position)
      }
    }
  }
}
</script>
