import axios from 'axios'

const url = import.meta.env.VITE_BE_URL

axios.defaults.baseURL = `${url}`

let refresh = false

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true

      const response = await axios.post('/authentication/refresh', {}, { withCredentials: true })

      if (response.status === 200) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

        return axios(error.config)
      }
    }

    refresh = false
    return error
  }
)
