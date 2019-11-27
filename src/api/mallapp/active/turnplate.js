import request from '@/utils/request'
import { distrImportUrl } from '@/api/mallapp/config'

// 获取 大转盘列表
export function getATurnplatelList (data) {
  return request({
    url: '/mactive/turnplate_list',
    method: 'get',
    params: data
  })
}

// 结束 大转盘活动
export function closeTurnplate (id) {
  return request({
    url: '/mactive/turnplate_close',
    method: 'get',
    params: {
      turnplate_id: id
    }
  })
}

// 大转盘 奖品类型
export function getAwardsSelectList () {
  return request({
    url: '/mactive/turnplate_awards',
    method: 'get'
  })
}

// 编辑/创建大转盘
export function editWheel (data) {
  return request({
    url: '/mactive/turnplate_wheel_edit',
    method: 'get',
    params: data
  })
}

// 发布 大转盘
export function wheelPublish (id) {
  return request({
    url: '/mactive/turnplate_wheel_publish',
    method: 'get',
    params: { turnplate_id: id }
  })
}

// 获取 码池列表
export function getRedeemPoolList (data) {
  return request({
    url: '/mactive/turnplate/redeem_pool_list',
    method: 'get',
    params: data
  })
}

// 创建新码池
export function addRedeemPool (name) {
  return request({
    url: '/mactive/turnplate/redeem_pool_add',
    method: 'get',
    params: { name }
  })
}

// 获取 手机核销网址
export function getPhoneCancelVerificationUrl () {
  return request({
    url: '/mactive/turnplate/phone_cancel_verifurl',
    method: 'get'
  })
}

// 获取 码池详情
export function getPoolDescList (data) {
  return request({
    url: '/mactive/turnplate/pool_desc_list',
    method: 'get',
    params: data
  })
}

// 导入 兑换码
export function importRedeemCode () {
  return `${distrImportUrl}/mactive/turnplate/redeemimport`
}

// 获取 获奖名单
export function getWinnerList (data) {
  return request({
    url: '/mactive/turnplate/winner_list',
    method: 'get',
    params: data
  })
}
