import axios from 'axios'

export function request(config) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: '',
        })
        // 发送网络请求
        instance(config).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}