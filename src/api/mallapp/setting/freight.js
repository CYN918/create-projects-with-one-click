import request from '@/utils/request'

export function getFreight () {
  return request({
    url: '/msetting/freight_get',
    method: 'get'
  })
}

export function freightEdit (data) {
  return request({
    url: '/msetting/freight_edit',
    method: 'post',
    params: data
  })
}

export function freightPartEdit (data) {
  return request({
    url: '/msetting/freight_part_edit',
    method: 'post',
    params: data
  })
}
