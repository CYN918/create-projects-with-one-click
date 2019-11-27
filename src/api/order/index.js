import request from '@/utils/request'

export function getOrderList (data) {
  return request({
    url: '/order/order_list',
    method: 'get',
    params: data
  })
}

// 获取订单详情
export function getOrderDetail (id) {
  return request({
    url: '/order/order_detail',
    method: 'get',
    params: {
      id
    }
  })
}

export function getOrderNumber (data) {
  return request({
    url: '/order/order_number',
    method: 'get',
    params: data
  })
}

// // 获取报表导出列表
// export function getExportList () {
//   return request({
//     url: '/morder/export_list',
//     method: 'get'
//   })
// }

// 增加导出报表
export function updateExportList (data) {
  return request({
    url: '/order/export_add',
    method: 'get',
    params: data
  })
}

// 编辑订单标记（备注）
export function editRemark (id) {
  return request({
    url: '/order/remark_edit',
    method: 'get',
    params: {
      id
    }
  })
}

// 获取服务订单
export function getOrderSesrverList (data) {
  return request({
    url: '/order/server_list',
    method: 'get',
    params: data
  })
}

// B-端订单列表
export function getAllorder (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/order/orderPageToB.json',
    method: 'POST',
    data: {
      pageIndex:data.pageIndex,
      pageSize:data.pageSize,
      requestStatus:data.requestStatus,
      startTime:data.timer[0]?data.timer[0]:'',
      endTime:data.timer[1]?data.timer[1]:'',
      keyWordType:data.keyWordType,
      keyWordValue:data.keyWordValue,
      fromType:data.fromType,
      sortBySupply:data.sortBySupply
    }
  })
}


//B端集采订单列表
export function jicaiGetAllorder (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/purchasing/order/orderPageToB.json',
    method: 'POST',
    data: data
  })
}

// B-订单详情
export function getByidorder(orderId) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/order/findDetail.json',
    method: 'GET',
    params: {
      orderId:orderId
    }
  })
}

//B-集采订单详情
export function jicaiGetByidorder(orderId) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/purchasing/order/findDetail.json',
    method: 'GET',
    params: {
      orderId:orderId
    }
  })
}

//B-集采订单处理审核任务
export function processingAuditTask(data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/purchasing/orderAudit/processingAuditTask.json',
    method: 'POST',
    data: data
  })
}


// B-端订单标记
export function getTagorder(orderId) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/order/saveOrderMark.json',
    method: 'GET',
    params: {
      orderId:orderId
    }
  })
}

//B-选择供应商
export function getOdersupplier(data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/order/selectSupplier.json',
    method: 'GET',
    params: {
      goodsId:data.goodsId,
      skuId:data.skuId,
      pageIndex:data.pageIndex,
      pageSize:data.pageSize,
    }
  })
}

//B-重置订单供应商信息
export function resetSupplier(data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/order/resetSupplier.json',
    method: 'GET',
    params: {
      newGoodsId:data.newGoodsId,
      oldGoodsId:data.oldGoodsId,
      orderId:data.orderId,
      supplierId:data.supplierId,
    }
  })
}

//B-重置订单供应商信息
export function getExcel(data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/order/trackingDown.json',
    method: 'GET',
    params: {
      orderId:data
    }
  })
}

//B-查看未发货商品(查看快递公司)
export function getCourier(data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/order/unshipped.json',
    method: 'GET',
    params: {
      orderId:data
    }
  })
}

//B-订单发货
export function deliveryFunc(data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/order/orderDelivery.json',
    method: 'POST',
    data: {
      skuIds:data.skuIds,
      logisticsNo:data.logisticsNo,
      orderId:data.orderId,
      shippingCode:data.shippingCode,
      shippingId:data.shippingId,
      shippingName:data.shippingName,
    }
  })
}

//B-端多地址拆单
export function submitAddress(orderId,arr) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/order/splittingOrder.json',
    method: 'POST',
    data: {
      orderId:orderId,
      shippingAddressParams:arr
    }
  })
}

//B-发货明细推送
export function pushSupplier(data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/order/pushSupplier.json',
    method: 'POST',
    data: data
  })
}

//B-根据订单号和sku获取订单详情
export function findorderdetail(orderSn) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/find_order_detail.json',
    method: 'GET',
    params: {
      orderSn:orderSn
    }
  })
}

//B-根据收件人手机匹配近三个月订单信息
export function findorderlist(data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/find_order_list.json',
    method: 'GET',
    params: {
      goodsName:data.goodsName,
      receivePhone:data.receivePhone
    }
  })
}

//B-新增售后单
export function saveaftersaleb(data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/save_after_sale_b.json',
    method: 'POST',
    data: {
      afterSaleComplainParam:data.afterSaleComplainParam,
      afterSaleParam:data.afterSaleParam
    }
  })
}

//B-售后单列表
export function aftersalepageb (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/after_sale_page_b.json',
    method: 'POST',
    data: data
  })
}

//B-查看附件
export function findpicb (complainId) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/find_pic_b.json',
    method: 'GET',
    params: {
      complainId:complainId
    }
  })
}

//B-查看进度表
export function findafterlog (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/find_after_log.json',
    method: 'GET',
    params: {
      complainId:data.complainId,
      returnType:data.returnType
    }
  })
}

//B-查看售后单
export function aftersaleetail (afterId) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/after_sale_etail.json',
    method: 'GET',
    params: {
      afterId:afterId
    }
  })
}

//B-修改售后单
export function updateaftersaleb (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/update_after_sale_b.json',
    method: 'POST',
    data: {
      afterSaleComplainParam:data.afterSaleComplainParam,
      afterSaleParam:data.afterSaleParam
    }
  })
}

//B-售后单商品列表
export function aftergoodslistb (complainId) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/after_goods_list_b.json',
    method: 'GET',
    params: {
      complainId:complainId,

    }
  })
}

//B-获取推送处理人
export function findpusher (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/find_pusher.json',
    method: 'GET',
    params: data
  })
}

//B-审核提交信息审批信息
export function findsubmitdetail (complainId) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/find_submit_detail.json',
    method: 'GET',
    params: {
      complainId:complainId
    }
  })
}

//B-审核售后单
export function checkaftersaleb (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/check_after_sale_b.json',
    method: 'POST',
    data: data
  })
}

//B-查找所有快递公司
export function shippingCompany (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/order/shippingCompany.json',
    method: 'GET',
    params: {}
  })
}

//B-供应商发货
export function supplierdelivery (map) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/supplier_delivery.json',
    method: 'POST',
    data: map
  })
}

//C-用户寄回商品
export function userreturngoods (map) {
  return request({
    url: '/api/open/c/b2b2c/orderservice/afterSale/user_return_goods.json',
    method: 'POST',
    data: map
  })
}

//B-签收退回快递
export function receivereturnpackage (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/receive_return_package.json',
    method: 'POST',
    data: data
  })
}

//B-生成退款单
export function applyreturn (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/apply_return.json',
    method: 'POST',
    data: data
  })
}

//B-获取业务单号
export function findbussinesssn (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/find_bussiness_sn.json',
    method: 'GET',
    params: {
      afterId:data.afterId,
      type:data.type
    }
  })
}

//B-查看退款单
export function findrefunddetail (afterRefundId,complainId) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/find_refund_detail.json',
    method: 'GET',
    params: {
      afterRefundId:afterRefundId,
      complainId:complainId,
    }
  })
}

//B-确认退款
export function confirmrefundb (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/confirm_refund_b.json',
    method: 'POST',
    data: data
  })
}

//B-加急处理
export function urgeresolve (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/urge_resolve.json',
    method: 'GET',
    params: {
      afterId:data.afterId,
      sysUserId:data.actionSysuserId
    }
  })
}

//B-审核退款单
export function checkafterrefundb (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/check_after_refund_b.json',
    method: 'POST',
    data: data
  })
}

//B-升级客诉
export function againaftersaleb (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/again_after_sale_b.json',
    method: 'POST',
    data: data
  })
}

//B-二三四五六次客诉
export function userreceiveb (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/save_many_b.json',
    method: 'POST',
    data:data
  })
}

//B-查看物流详情
export function findlogisticsdetailb (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/find_logistics_detail_b.json',
    method: 'GET',
    params:{
      complainId:data.complainId,
      logisticsNo:data.logisticsNo,
    }
  })
}

//B-取消售后
export function cancelafterSale (complainId) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/cancel_afterSale.json',
    method: 'GET',
    params:{
      complainId:complainId,
    }
  })
}

//B-分配客服
export function pushwaiter (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/push_waiter.json',
    method: 'GET',
    params:{
      afterId:data.afterId,
      sysUserId:data.sysUserId
    }
  })
}

//B-快递单上传
export function orderupload (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/order/upload.json',
    method: 'POST',
    data:data
  })
}

//B-替买家签收快递
export function afterSaleuserreceiveb (complainId) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/user_receive_b.json',
    method: 'GET',
    params:{
      complainId:complainId
    }
  })
}

//分页查询快递公司信息
export function getList (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/express_company/find_page.json',
    method: 'GET',
    params:data
  })
}

//根据ID查询快递公司信息
export function queryCourier (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/express_company/find_by_id.json',
    method: 'GET',
    params:data
  })
}

//更新快递公司
export function updateCourier (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/express_company/update.json',
    method: 'PUT',
    data:data
  })
}

//删除快递公司
export function deleteCourier (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/express_company/delete.json',
    method: 'DELETE',
    params:{id:data}
  })
}

//新增快递公司
export function saveCourier (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/express_company/save.json',
    method: 'POST',
    data:data
  })
}

//删除运费计算模板
export function deleteTemplate (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/freight/maige/delete.json',
    method: 'DELETE',
    params:{id:data}
  })
}

//下载运费计算模板文档
export function downloadTemplate (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/freight/maige/export_template.json',
    method: 'GET',
    params:{}
  })
}
//导入运费计算模板文档
export function importTemplateFile (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/freight/maige/import_template.json',
    method: 'POST',
    data
  })
}

//级联查询
export function cascadeArea (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/region/find_by_parent.json',
    method: 'GET',
    params: data
  })
}

//查询运费
export function queryFreight (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/freight/maige/query_freight.json',
    method: 'GET',
    params: data
  })
}

//查询商品列表
export function searchShowGoods (data) {
  return request({
    url: '/api/open/b/b2b2c/goodsservice/goods/find_show_goods.json',
    method: 'GET',
    params: data
  })
}
//查询运费设置-列表
export function getFreightSetList (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/freight/findPage.json',
    method: 'GET',
    params: data
  })
}
//查询运费设置-列表删除
export function deletefreightSetTemplate (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/freight/delete_by_id.json',
    method: 'DELETE',
    params: data
  })
}
//查询运费设置-新增运费模板
export function submitfreightSetAddData (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/freight/add.json',
    method: 'post',
    data: data
  })
}
//查询运费设置-编辑运费模板详情-根据id查询运费模板
export function geteditDetail (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/freight/find_by_id.json',
    method: 'GET',
    params: data
  })
}
//查询运费设置-编辑提交运费模板
export function submitfreightSeteditData (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/freight/update.json',
    method: 'PUT',
    data: data
  })
}
//查询全部地区
export function getAllArea (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/region/find_all_city.json',
    method: 'GET',
  })
}

//根据ID查询运费计算模板数据
export function queryTemplate (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/freight/maige/find_by_id.json',
    method: 'GET',
    params:{id:data}
  })
}

//保存运费计算模板
export function saveTemplate (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/freight/maige/save.json',
    method: 'POST',
    data:data
  })
}

//更新运费计算模板
export function updateTemplate (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/freight/maige/update.json',
    method: 'PUT',
    data:data
  })
}

//B-财务审核
export function checkfinanceb (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/check_finance_b.json',
    method: 'POST',
    data:data
  })
}

//B-查询财务审核提交数据
export function findfinanceauditdetail (complainId) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/afterSale/find_finance_audit_detail.json',
    method: 'GET',
    params:{
      complainId:complainId
    }
  })
}

//B-端集采订单导出订单
export function exportOrder (data) {
  return request({
    url: '/api/open/b/b2b2c/orderservice/purchasing/order/export.json',
    method: 'GET',
    params:{orderIds:data}
  })
}