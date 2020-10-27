import axios from 'axios'
import notification from 'ant-design-vue/es/notification'

const request = axios.create({
  baseURL: '',
  timeout: 6000 // 请求超时时间
})

const errorHandler = (error) => {
  console.log('error', error)
  if (error.response) {
    const message = error.response.data.message
    switch (error.response.status) {
      case 401:
        notification.error({
          message: 'Forbidden',
          description: message
        })
        break;
      case 404:
        message.error('网络请求不存在')
        break
      default:
        notification.error({
          message: 'Forbidden',
          description: message
        })
        break;
    }
  } else {
    if (error.message.includes('timeout')) {
      notification.error({
        message: 'Forbidden',
        description: '请求超时！请检查网络是否正常'
      })
    } else {
      notification.error({
        message: 'Forbidden',
        description: '请求失败!请检查网络是否已连接'
      })
    }
  }
  return Promise.reject(error)
}

request.interceptors.request.use(config => {
  const token = sessionStorage.getItem('TOKEN')
  if (token) {
    config.headers.Authorization = token // 请求头部添加token
  }
  return config
}, errorHandler)


request.interceptors.response.use((response) => {
  return response.data
}, errorHandler)


export default request