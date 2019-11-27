import request from '@/utils/request'

export function getDetailList (data) {
  return request({
    url: '/finance/detail_list',
    method: 'get',
    params: data
  })
}
