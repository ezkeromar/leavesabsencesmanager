import axios from 'axios'
import { apiUrl } from '../../config'
// allow use http client without Vue instance
export const http = axios.create({
  baseURL: apiUrl
  // headers: {
  //   'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // }
})

http.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('user') !== null) {
      var token = JSON.parse(localStorage.getItem('user')).accessToken
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
      }
    }
    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(response => {
  return response
}, function (error) {
  if (error.response.status === 401) {
    localStorage.removeItem('user')
  }
  return Promise.reject(error)
})
