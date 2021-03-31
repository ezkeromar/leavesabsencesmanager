import { Notify } from 'quasar'

export default (http, store, router) => {
  http.interceptors.response.use(
    response => response,
    (error) => {
      const { response } = error
      if ([401, 400].indexOf(response.status) > -1) {
        router.push('login')
        Notify.create('Danger, Will Robinson! Danger!')
      }
    }
  )
}
