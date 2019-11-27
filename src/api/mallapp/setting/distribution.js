import request from '@/utils/request'

export function getDistribution () {
  return request({
    url: '/msetting/distribution',
    method: 'get'
  })
}

export function setDistribution (data) {
  return request({
    url: '/msetting/distribution_edit',
    method: 'get',
    params: data
  })
}

export function getAddressList () {
  return request({
    url: '/msetting/distribution_address',
    method: 'get'
  })
}
export function addressDelete (id) {
  return request({
    url: '/msetting/distribution_address_delete',
    method: 'get',
    params: {
      id
    }
  })
}

export function editAddress (data) {
  return request({
    url: '/msetting/distribution_address_edit',
    method: 'get',
    params: data
  })
}
