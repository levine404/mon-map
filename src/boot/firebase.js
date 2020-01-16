import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyDVtEXBHVQ-nl-EJ7Nft8U_LDOj4X8i6-E',
  authDomain: 'monastery-mapping.firebaseapp.com',
  databaseURL: 'https://monastery-mapping.firebaseio.com',
  projectId: 'monastery-mapping',
  storageBucket: 'monastery-mapping.appspot.com',
  messagingSenderId: '720850007437',
  appId: '1:720850007437:web:f4cc47323459023579f9c4',
  measurementId: 'G-6L8J7W0CB1'
}

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
