import request from '@/utils/request'

export function login (parameter) {
  return request({
    url: '/login',
    method: 'post',
    data: parameter
  })
}

export function GetUserInfo (parameter) {
  return request({
    url: '/info',
    method: 'get',
    data: parameter,
  })
}