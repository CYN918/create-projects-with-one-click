import request from '@/utils/request'

export function getDisc () {
  return request({
    url: '/msetting/disclaimer_get',
    method: 'get'
  })
}

export function editDisc (data) {
  return request({
    url: '/msetting/disclaimer_edit',
    method: 'post',
    params: data
  })
}
