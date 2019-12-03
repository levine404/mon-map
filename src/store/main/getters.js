export function loggedUser (state) {
  return state.loggedUser
}

export function items (state) {
  return state.items
}

export function getItem (state) {
  return payload => {
    return state.items.find(item => item.id === payload)
  }
}

export function itemSelectedId (state) {
  return state.itemSelectedId
}

export function itemSelected (state) {
  return state.items.find(item => item.id === state.itemSelectedId)
}

export function mainImageUrl (state) {
  return payload => {
    return state.mainImageUrls[payload]
  }
}
