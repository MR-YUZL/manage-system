import axios from 'axios'
import notification from 'ant-design-vue/es/notification'

const request = axios.create({
  baseURL: '',
  timeout: 6000 // 请求超时时间
})

const errorHandler = (error) => {
  console.log('error', error)
  if (error.response) {
    const data = error.response.data

    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }

    if (error.response.status === 401) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
  }
  return Promise.reject(error)
}

request.interceptors.request.use(config => {
  return config
}, errorHandler)


request.interceptors.response.use((response) => {
  return response
}, errorHandler)


export default request