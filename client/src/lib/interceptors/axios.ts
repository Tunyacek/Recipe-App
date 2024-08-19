import axios from 'axios'

const url = import.meta.env.VITE_BE_URL

axios.defaults.baseURL = `${url}`
axios.defaults.withCredentials = true

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401) {
      const response = await axios.post('/authentication/refresh', {})

      if (response.status === 200) {
        return axios(error.config)
      }
    }
    return error
  }
)
