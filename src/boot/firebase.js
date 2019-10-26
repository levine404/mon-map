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
