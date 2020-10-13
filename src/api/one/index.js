import request from '@/utils/request'

export function recruitTable() {
  return request({
    url: '/meun',
    method: 'post',
    data: {
       query:'1'
    }
  })
}