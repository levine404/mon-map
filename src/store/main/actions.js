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
