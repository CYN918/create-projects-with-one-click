import request from '@/utils/request'

export function getAddress (type, parent) {
  return request({
    url: '/address_get',
    method: 'get',
    params: {
      type,
      parent
    }
  })
}

export function getCategory () {
  return request({
    url: '/category_get',
    method: 'get'
  })
}

export function getStoreList (id) {
  return request({
    url: '/store_get',
    method: 'get',
    params: {
      application_id: id
    }
  })
}

// 获取物流信息
export function getLogisticInfo (id) {
  return request({
    url: '/logistic',
    method: 'get',
    params: {
      logistic_id: id
    }
  })
}

// 支付接口
export function scanPay (data) {
  return request({
    url: '/scan_pay',
    method: 'get',
    params: data
  })
}

// 獲取圖片tabs
export function getPicTabs () {
  return request({
    url: '/pic_tabs',
    method: 'get'
  })
}

// 獲取圖片列表
export function getPicList (data) {
  return request({
    url: '/pic_list',
    method: 'get',
    params: data
  })
}

// 获取商品品牌
export function getGoodsBranch () {
  return request({
    url: '/goods_branch',
    method: 'get'
  })
}

// 添加商品品牌
export function addBranch (name) {
  return request({
    url: '/goods_branch_add',
    method: 'get',
    params: {
      name
    }
  })
}

// 获取商品类型属性
export function getGoodsProp () {
  return request({
    url: '/goods_prop',
    method: 'get'
  })
}


