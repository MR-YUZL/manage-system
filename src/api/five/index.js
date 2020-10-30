import request from '@/utils/request'

export function GetLineData(params = {}) {
  return request({
    url: '/lineData',
    method: 'post',
    data: params
  })
}

export function GetBarData(params = {}) {
  return request({
    url: '/barData',
    method: 'post',
    data: params
  })
}

export function GetPieData(params = {}) {
  return request({
    url: '/pieData',
    method: 'post',
    data: params
  })
}

export function GetMapData(params = {}) {
  return request({
    url: '/mapData',
    method: 'post',
    data: params
  })
}
