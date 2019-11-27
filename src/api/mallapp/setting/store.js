import request from '@/utils/request'

export function getStoreInfo () {
  return request({
    url: '/msetting/store',
    method: 'get'
  })
}

export function editStoreInfo (data) {
  return request({
    url: '/msetting/store_edit',
    method: 'get',
    params: data
  })
}
