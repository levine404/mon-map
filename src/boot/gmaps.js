const API_KEY = 'AIzaSyDpZeAUXKIjwQe5A39QFWwAPVxwD8hk3UM'
const CALLBACK_NAME = 'gmapsCallback'

const loadScript = onError => {
  const script = document.createElement('script')
  script.async = true
  script.defer = true
  script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${CALLBACK_NAME}`
  script.onerror = onError
  document
    .querySelector('head')
    .appendChild(script)
}

export default async ({ Vue }) => {
  if (window.google) {
    Vue.prototype.$gmaps = window.google.maps
  } else {
    try {
      let _resolve
      let _reject
      const promise = new Promise((resolve, reject) => {
        _resolve = resolve
        _reject = reject
      })
      window[CALLBACK_NAME] = () => _resolve()
      loadScript(_reject)
      await promise
      Vue.prototype.$gmaps = window.google.maps
    } catch (err) {
      console.error(err)
    }
  }
}
