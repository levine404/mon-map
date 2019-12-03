import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyD699_db_fHyB7bF4Exi4FrZnUyvvcceR0',
  authDomain: 'mon-map-256107.firebaseapp.com',
  databaseURL: 'https://mon-map-256107.firebaseio.com',
  projectId: 'mon-map-256107',
  storageBucket: 'mon-map-256107.appspot.com',
  messagingSenderId: '934299174260',
  appId: '1:934299174260:web:34fb40dff808b5c0c89821'
}

// const firebaseConfig = {
//   apiKey: 'AIzaSyDVtEXBHVQ-nl-EJ7Nft8U_LDOj4X8i6-E',
//   authDomain: 'monastery-mapping.firebaseapp.com',
//   databaseURL: 'https://monastery-mapping.firebaseio.com',
//   projectId: 'monastery-mapping',
//   storageBucket: 'monastery-mapping.appspot.com',
//   messagingSenderId: '720850007437',
//   appId: '1:720850007437:web:f4cc47323459023579f9c4',
//   measurementId: 'G-6L8J7W0CB1'
// }

export default ({ Vue, store }) => {
  firebase.initializeApp(firebaseConfig)
  Vue.prototype.$database = firebase.firestore()
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      store.commit('logUserIn', user)
    } else {
      store.commit('logUserOut')
    }
  })
}
