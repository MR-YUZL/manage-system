import axios from 'axios'
import notification from 'ant-design-vue/es/notification'

const request = axios.create({
  // API 请求的默认前缀
  baseURL: '',
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data

    if (error.response.status === 403) {
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