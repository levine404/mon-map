export function logUserIn (state, payload) {
  if (payload) {
    state.loggedUser = payload.displayName
  }
}

export function logUserOut (state) {
  state.loggedUser = null
}

export function selectItemId (state, payload) {
  state.itemSelectedId = payload
}

export function setItems (state, payload) {
  state.items = payload
}

export function setMainImageUrl (state, payload) {
  const { itemId, url } = payload
  if (!state.mainImageUrls[itemId]) {
    this._vm.$set(state.mainImageUrls, itemId, url)
  } else {
    state.mainImageUrls[itemId] = url
  }
}
