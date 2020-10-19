import request from '@/utils/request'

export function login (parameter) {
  return request({
    url: '/login',
    method: 'post',
    data: parameter
  })
}