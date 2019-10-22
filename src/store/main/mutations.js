export function logUserIn (state, payload) {
  if (payload) {
    state.loggedUser = payload.displayName
  }
}

export function logUserOut (state) {
  state.loggedUser = null
}

export function selectItem (state, payload) {
  state.itemSelected = payload
}
