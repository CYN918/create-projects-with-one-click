import request from '@/utils/request'

export function getStoreList (data) {
  return request({
    url: '/finance/store_list',
    method: 'get',
    params: data
  })
}

export function editRecharge (data) {
  return request({
    url: '/finance/store_recharge',
    method: 'get',
    params: data
  })
}

export function getStoreDetailList (data) {
  return request({
    url: '/finance/store_detail_list',
    method: 'get',
    params: data
  })
}
