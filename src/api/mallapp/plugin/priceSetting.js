import request from '@/utils/request'

// 获取积分+现金状态
export function getStatus () {
  return request({
    url: '/mplugin/price_setting',
    method: 'get'
  })
}

// 更新积分+现金
export function updateStatus (status) {
  return request({
    url: '/mplugin/price_setting_update',
    method: 'get',
    params: {
      status
    }
  })
}
