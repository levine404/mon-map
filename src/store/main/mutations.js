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
