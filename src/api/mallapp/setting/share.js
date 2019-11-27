import request from '@/utils/request'

export function shareWeiXinEdit (data) {
  return request({
    url: '/msetting/share_edit',
    method: 'get',
    params: data
  })
}

export function getShareWeiXin () {
  return request({
    url: '/msetting/share',
    method: 'get'
  })
}
