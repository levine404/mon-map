import firebase from 'firebase'

export async function getItems ({ commit }, payload) {
  try {
    const snapshot = await this._vm.$database.collection('items').get()
    if (snapshot) {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      commit('setItems', items)
    }
  } catch (err) {
    console.error(err)
  }
}

export async function saveItem ({ dispatch }, payload) {
  let refId = payload.id
  try {
    if (refId) {
      await this._vm.$database
        .collection('items')
        .doc(payload.id)
        .set(payload)
    } else {
      const ref = await this._vm.$database
        .collection('items')
        .add(payload)
      refId = ref.id
    }
    dispatch('getItems')
  } catch (err) {
    console.error(err)
  }
  return refId
}

export async function logout () {
  firebase.auth().signOut()
}

export async function uploadImage (context, payload) {
  console.warn('@uploadImage', payload)
  return new Promise((resolve, reject) => {
    const { path, file } = payload
    const storageRef = firebase.storage().ref()
    const metaData = {
      contentType: 'image/jpeg'
    }
    const uploadTask = storageRef.child(path).put(file, metaData)
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.bytesTransferred) * 100
      console.log('progress', progress)
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log('Upload is paused:')
          break
        case firebase.storage.TaskState.RUNNING:
          console.log('Upload is running!')
          break
        default:
      }
    }, err => {
      switch (err.code) {
        case 'storage/unauthorized':
          console.log('unauth')
          break
        case 'storage/canceled':
          console.log('canc')
          break
        case 'storage/unknown':
          console.log('??')
          break
        default:
      }
      reject(err)
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        console.log('file at ', downloadURL)
        resolve('ok')
      })
    })
  })
}
