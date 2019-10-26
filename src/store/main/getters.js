export function loggedUser (state) {
  return state.loggedUser
}

export function items (state) {
  return state.items
}

export function itemSelectedId (state) {
  return state.itemSelectedId
}

export function itemSelected (state) {
  return state.items.find(item => item.id === state.itemSelectedId)
}
