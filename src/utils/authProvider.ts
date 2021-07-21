import axios, { AxiosRequestConfig } from 'axios'

axios.defaults.baseURL = 'http://localhost:2000'

const authorizationProvider = (token: string | null) => {
  axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      config.headers.Authorization = `Bearer ${token}`
      return config
    },
  )
}

export default authorizationProvider
