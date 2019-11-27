import request from '@/utils/request'

export function getAgree () {
  return request({
    url: '/msetting/agree_get',
    method: 'get'
  })
}

export function editAgree (data) {
  return request({
    url: '/msetting/agree_edit',
    method: 'post',
    params: data
  })
}
