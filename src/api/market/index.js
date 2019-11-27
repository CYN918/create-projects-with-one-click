import request from '@/utils/request'

export function getGoodsList (data) {
  return request({
    url: '/market/goods_list',
    method: 'get',
    params: data
  })
}

export function addToMyStore (data) {
  return request({
    url: '/market/goods_add',
    method: 'get',
    params: data
  })
}
