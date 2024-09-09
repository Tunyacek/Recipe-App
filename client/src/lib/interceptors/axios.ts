import axios from 'axios'

const url = import.meta.env.VITE_BE_URL
axios.defaults.baseURL = `${url}`

const setToken = (token: string) => {
  localStorage.setItem('token', token)
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

axios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshResponse = await axios.post(
          '/authentication/refresh',
          {},
          { withCredentials: true }
        )

        if (refreshResponse.status === 200) {
          const { token } = refreshResponse.data

          setToken(token)

          originalRequest.headers['Authorization'] = `Bearer ${token}`
          return axios(originalRequest)
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError)

        localStorage.removeItem('token')
      }
    }

    return Promise.reject(error)
  }
)
