export function saveItem (context, payload) {
  this._vm.$database.collection('items').add(payload)
}

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
