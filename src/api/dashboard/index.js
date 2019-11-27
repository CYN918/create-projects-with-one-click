import request from '@/utils/request'

export function getDashoard () {
  return request({
    url: '/dashboard',
    method: 'get'
  })
}
