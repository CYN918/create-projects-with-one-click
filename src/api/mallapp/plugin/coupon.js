import request from '@/utils/request'

// 获取优惠券列表
export function getCouponList (data) {
  return request({
    url: '/mplugin/coupon_list',
    method: 'get',
    params: data
  })
}

// 创建优惠券
export function addCoupon (data) {
  return request({
    url: '/mplugin/coupon_add',
    method: 'get',
    params: data
  })
}

// 获取优惠券信息
export function getScoreCoupon (id) {
  return request({
    url: '/mplugin/coupon_get',
    method: 'get',
    params: {
      id
    }
  })
}

// 生成优惠券兑换码/兑换链接
export function setcoupon (data) {
  return request({
    url: '/mplugin/coupon_rules_set',
    method: 'get',
    params: data
  })
}

// 获取优惠券兑换码列表
export function getCodeList (data) {
  return request({
    url: '/mplugin/coupon_code_list',
    method: 'get',
    params: data
  })
}

// 获取优惠券兑换链接列表
export function getLinkList (data) {
  return request({
    url: '/mplugin/coupon_link_list',
    method: 'get',
    params: data
  })
}

// 更改兑换链接状态
export function changeLinkState (state) {
  return request({
    url: '/mplugin/coupon_link_state_change',
    method: 'get',
    params: {
      state
    }
  })
}

// 编辑兑换链接
export function changeCouponLink (data) {
  return request({
    url: '/mplugin/coupon_link_change',
    method: 'get',
    params: data
  })
}

// 获取兑换链接详情
export function getCouponLinkReceive (data) {
  return request({
    url: '/mplugin/coupon_link_receive',
    method: 'get',
    params: data
  })
}

// 获取券码列表
export function getCodeDetailList (data) {
  return request({
    url: '/mplugin/coupon_code_detail_list',
    method: 'get',
    params: data
  })
}

// 更改券码状态
export function changeState (data) {
  return request({
    url: '/mplugin/coupon_code_state_change',
    method: 'get',
    params: data
  })
}

// 获取券码操作历史列表
export function getCouponLogList (data) {
  return request({
    url: '/mplugin/coupon_log_list',
    method: 'get',
    params: data
  })
}

// 获取券码操作详情列表
export function getCouponLogDetailList (data) {
  return request({
    url: '/mplugin/coupon_log_detail',
    method: 'get',
    params: data
  })
}
