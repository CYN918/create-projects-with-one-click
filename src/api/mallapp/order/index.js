import request from '@/utils/request'

// export function getOrderList (data) {
//   return request({
//     url: '/morder/order_list',
//     method: 'get',
//     params: data
//   })
// }

// 获取订单详情
export function getOrderDetail (id) {
  return request({
    url: '/morder/order_detail',
    method: 'get',
    params: {
      id
    }
  })
}

export function getOrderNumber (data) {
  return request({
    url: '/morder/order_number',
    method: 'get',
    params: data
  })
}

// 获取报表导出列表
export function getExportList () {
  return request({
    url: '/morder/export_list',
    method: 'get'
  })
}

// 增加导出报表
export function updateExportList (data) {
  return request({
    url: '/morder/export_add',
    method: 'get',
    params: data
  })
}
