import request from '@/utils/request'

// 今日数据
export function getData (data) {
  return request({
    url: '/data/member_data',
    method: 'get',
    params: data
  })
}

// 获取营收数据
export function getRevenueList (data) {
  return request({
    url: '/data/revenue_list',
    method: 'get',
    params: data
  })
}

// 获取应用数据
export function getApplicationList (data) {
  return request({
    url: '/data/application_list',
    method: 'get',
    params: data
  })
}
