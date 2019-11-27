import request from '@/utils/request'

export function getSummary (data) {
  return request({
    url: '/finance/summary',
    method: 'get',
    params: data
  })
}
