import request from '@/utils/request'

export function recruitTable(params) {
  return request({
    url: '/meun',
    method: 'post',
    data: params
  })
}