export function loggedUser (state) {
  return state.loggedUser
}

export function items (state) {
  return state.items.map((item, index) => ({ ...item, index }))
}

export function itemSelected (state) {
  return state.itemSelected
}
