import request from '@/utils/request'

export function GetUserList(params = {}) {
  return request({
    url: '/userList',
    method: 'post',
    data: params
  })
}

export function GetPowerList(params = {}) {
  return request({
    url: '/powerList',
    method: 'post',
    data: params
  })
}