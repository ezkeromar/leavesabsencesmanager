import axios from 'axios'
import { apiUrl } from '../config.js'

export default ({ Vue }) => {
  Vue.prototype.$axios = axios.create({
    baseURL: apiUrl
    // withCredentials: true
  })
}
