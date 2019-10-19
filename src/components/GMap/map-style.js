import variables from '../../css/quasar.variables.scss'

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: variables.mapColor }]
  },
  // {
  //   elementType: 'labels.text.stroke',
  //   stylers: [{ color: '#242f3e' }]
  // },
  // {
  //   elementType: 'labels.text.fill',
  //   stylers: [{ color: '#746855' }]
  // },
  // {
  //   featureType: 'administrative.locality',
  //   elementType: 'labels.text.fill',
  //   stylers: [{ visibility: 'off' }]
  // },
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }]
  },
  // {
  //   featureType: 'poi.park',
  //   elementType: 'geometry',
  //   stylers: [{color: '#263c3f'}]
  // },
  // {
  //   featureType: 'poi.park',
  //   elementType: 'labels.text.fill',
  //   stylers: [{color: '#6b9a76'}]
  // },
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [{ color: variables.labelTextColor }]
  },
  {
    featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: [{ color: variables.labelTextBorderColor }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: variables.roadColor }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: variables.roadBorderColor }]
  },
  // {
  //   featureType: 'road',
  //   elementType: 'labels.text.fill',
  //   stylers: [{color: '#9ca5b3'}]
  // },
  // {
  //   featureType: 'road.highway',
  //   elementType: 'geometry',
  //   stylers: [{color: '#746855'}]
  // },
  // {
  //   featureType: 'road.highway',
  //   elementType: 'geometry.stroke',
  //   stylers: [{color: '#1f2835'}]
  // },
  // {
  //   featureType: 'road.highway',
  //   elementType: 'labels.text.fill',
  //   stylers: [{color: '#f3d19c'}]
  // },
  {
    featureType: 'transit',
    stylers: [{ visibility: 'off' }]
  }
  // {
  //   featureType: 'transit.station',
  //   elementType: 'labels.text.fill',
  //   stylers: [{ visibility: 'off' }]
  // }
  // {
  //   featureType: 'water',
  //   elementType: 'geometry',
  //   stylers: [{color: '#17263c'}]
  // },
  // {
  //   featureType: 'water',
  //   elementType: 'labels.text.fill',
  //   stylers: [{color: '#515c6d'}]
  // },
  // {
  //   featureType: 'water',
  //   elementType: 'labels.text.stroke',
  //   stylers: [{color: '#17263c'}]
  // }
]

export default mapStyle
