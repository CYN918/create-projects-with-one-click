import request from '@/utils/request'

export function getExchLimit () {
  return request({
    url: '/msetting/exchange_limit',
    method: 'get'
  })
}
export function editExchLimit (data) {
  return request({
    url: '/msetting/exchange_limit_edit',
    method: 'get',
    params: data
  })
}
