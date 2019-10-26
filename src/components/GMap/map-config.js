import mapStyle from './map-style'

const mapConfig = (gmaps) => {
  return {
    zoom: 13,
    center: {
      lat: 27.723732,
      lng: 85.362622
    },
    styles: mapStyle,
    mapTypeId: 'terrain',
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: {
      // eslint-disable-next-line no-undef
      position: gmaps.ControlPosition.TOP_RIGHT
    }
  }
}

export default mapConfig
