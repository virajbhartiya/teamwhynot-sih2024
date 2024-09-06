import axios from 'axios'

import { getLocalStorage } from './helper'

const baseURL = import.meta.env.VITE_SERVER_URL + '/api'

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getLocalStorage('jwt')

    const tokenWithoutQuotes = token?.replace(/^["']|["']$/g, '')

    if (tokenWithoutQuotes) {
      config.headers.authorization = `Bearer ${tokenWithoutQuotes}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
