import request from '@/utils/request'

// 获取仓库列表
export function getStorageList (data) {
    return request({
      url: '/api/open/b/b2b2c/erpservice/warehouse/list.json',
      method: 'get',
      params:{
        pageIndex:data.pageIndex,
        pageSize:data.pageSize,
        warehouseNo:data.warehouseNo,
        name:data.name
      }
    })
  }

// 新增仓库
export function addStorage (data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/warehouse/save.json',
    method: 'post',
    data:data,
  })
}

//仓库详情
export function detailStorage (data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/warehouse/find_by_id.json',
    method: 'get',
    params:{
      warehouseId:data
    }
  })
}

//更新仓库

export function editStorages (data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/warehouse/update.json',
    method: 'put',
    data:data
  })
}

//删除仓库

export function deleteStorages(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/warehouse/delete.json',
    method: 'delete',
    data:data
  })
}

//库存调拨列表
export function getTransferList(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/transfer_bill/list.json',
    method: 'get',
    params:{
      pageIndex:data.pageIndex,//页码
      pageSize:data.pageSize,//每页条数
      endTime:data.endTime,//业务日期-结束日期
      fromWarehouseId:data.fromWarehouseId,//调出仓库
      startTime:data.startTime,//业务日期-开始日期
      status:data.status,//状态
      toWarehouseId:data.toWarehouseId,//调入仓库
      transferBillNo:data.transferBillNo,//调拨单号
    }
  })
}

//调拨单商品明细
export function getTransferGoodsList(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/transfer_bill/list_detail.json',
    method: 'get',
    params:{
      pageIndex:data.pageIndex,//页码
      pageSize:data.pageSize,//每页条数
      transferBillId:data.transferBillId,//调拨单ID
    }
  })
}

//商品库存列表
export function getStockGoodsList(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/transfer_bill/list_inventory.json',
    method: 'get',
    params:{
      pageIndex:data.current_page,//页码
      pageSize:data.page_size,//每页条数
      goodsInfo:data.goodsInfo,//商品信息

    }
  })
}



//获取仓库下拉
export function getStorage() {
  return request({
    url: '/api/open/b/b2b2c/erpservice/warehouse/select.json',
    method: 'get',

  })
}


//新增调拨单
export function addStock(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/transfer_bill/save.json',
    method: 'post',
    data:{
      bizDate:data.bizDate,
      bizUserId:data.bizUserId,
      bizUserName:data.bizUserName,
      fromWarehouseId:data.fromWarehouseId,//出库的仓库ID
      toWarehouseId:data.toWarehouseId,//入库的仓库ID
      goods:data.arrs
    }
  })
}

//调拨单详情
export function getStockDetail(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/transfer_bill/find_by_id.json',
    method: 'get',
    params:{
      transferBillId:data
    }
  })
}

//更新库存调拨
export function updateStockDetail(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/transfer_bill/update.json',
    method: 'put',
    data:data
  })
}

//删除库存调拨

export function deleteStockDetail(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/transfer_bill/delete.json',
    method: 'delete',
    params:{
      transferBillId: data
    }
  })
}


//库存调拨-推送审核初始化数据
export function stockAudit(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/transfer_bill/find_push_audit_init_data.json',
    method: 'get',
    params:{
      transferBillId: data
    }
  })
}

//删除库存调拨中的商品
export function deleteStockGoods(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/transfer_bill/delete_goods.json',
    method: 'delete',
    params:{
      detailId:data.detailId,//调拨单明细ID
      transferBillId:data.transferBillId,//调拨单ID
    }
  })
}

//库存调拨-推送审核
export function pushAudit(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/transfer_bill/save_push_audit.json',
    method: 'post',
    data:{
      orderId:data.orderId,
      reason:data.reason,//提交理由
      limitTime:data.limitTime,//审批截止时间
    }
  })
}


//库存调拨-审批页面中推送审核人信息
export function stockAuditPerson(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/transfer_bill/find_audit_push_data.json',
    method: 'get',
    params:{
      transferBillId: data
    }
  })
}


//库存调拨-查看进度表
export function stockAuditTimeLine(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/transfer_bill/find_audit_plan.json',
    method: 'get',
    params:{
      transferBillId: data
    }
  })
}

//库存调拨-审批
export function stockApproval(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/transfer_bill/audit.json',
    method: 'post',
    data:{
      id: data.id,//业务ID
      auditStatus:data.auditStatus,//审核状态
      opinions:data.opinions,//审核意见
    }
  })
}


//商品入库单-提交入库单前渲染数据

export function submitStorageData(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/storage_bill/find_bill_info_to_edit.json',
    method: 'get',
    params:{
      storageBillId: data
    }
  })
}


//商品入库单-提交单个入库单入库
export function singleWarehousing(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/storage_bill/confirm_storage.json',
    method: 'put',
    data:data
  })
}

//商品入库单-删除入库单
export function delelteWarehousing(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/storage_bill/delete_bill.json',
    method: 'delete',
    params:{
      storageBillId:data
    }
  })
}


//商品入库单-批量入库单入库
export function bulkSingleWarehousing(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/storage_bill/confirm_storages.json',
    method: 'put',
    data:data

  })
}

//库存盘点列表
export function getInventoryList(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/inventory_bill/list.json',
    method: 'get',
    params:{
      pageIndex:data.pageIndex,//页码
      pageSize:data.pageSize,//每页条数
      endTime:data.endTime,//业务日期-结束日期
      startTime:data.startTime,//业务日期-开始日期
      status:data.status,//状态
      billNo:data.billNo,//盘点单号
      warehouseId:data.warehouseId,//仓库ID
    }
  })
}


//库存盘点明细列表
export function getInventoryGoodsList(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/inventory_bill/list_detail.json',
    method: 'get',
    params:{
      pageIndex:data.pageIndex,//页码
      pageSize:data.pageSize,//每页条数
      billId:data.billId,//商品信息

    }
  })
}

//新增盘点单
export function addInventory(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/inventory_bill/save.json',
    method: 'post',
    data:{
      bizTime:data.bizTime,
      bizUserName:data.bizUserName,
      bizUserId:data.bizUserId,
      warehouseId:data.warehouseId,//仓库ID
      details:data.arrs,

    }
  })
}

//盘点详情
export function getInventoryDetail(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/inventory_bill/find_by_id.json',
    method: 'get',
    params:{
      billId:data
    }
  })
}

//删除盘点
export function deleteInventory(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/inventory_bill/delete.json',
    method: 'delete',
    params:{
      billId:data
    }
  })
}

//更新库存盘点
export function updateInventoryDetail(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/inventory_bill/update.json',
    method: 'put',
    data:data
  })
}


//库存盘点-推送审核初始化数据
export function initInventory(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/inventory_bill/find_push_audit_init_data.json',
    method: 'get',
    params:{
      billId:data
    }
  })
}



//库存盘点-审批页面中推送审核人信息
export function InventoryPersonData(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/inventory_bill/find_audit_push_data.json',
    method: 'get',
    params:{
      billId:data
    }
  })
}

//库存盘点-推送审核
export function pushInventoryAudit(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/inventory_bill/save_push_audit.json',
    method: 'post',
    data:{
      orderId:data.orderId,
      reason:data.reason,//提交理由
      limitTime:data.limitTime,//审批截止时间
    }
  })
}

//库存盘点-查看进度表
export function InventoryTimeLine(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/inventory_bill/find_audit_plan.json',
    method: 'get',
    params:{
      billId:data
    }
  })
}

//库存调拨-审批
export function inventoryApproval(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/inventory_bill/audit.json',
    method: 'post',
    data:{
      id: data.id,//业务ID
      auditStatus:data.auditStatus,//审核状态
      opinions:data.opinions,//审核意见
    }
  })
}

//商品安全库存列表
export function getSafeStock(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/gs_setting/list_safe.json',
    method: 'get',
    params:{
      pageIndex:data.pageIndex,//页码
      pageSize:data.pageSize,//每页条数
      goods:data.goods,//商品信息
      goodsSn:data.goodsSn,//商品货号
      warehouse:data.warehouse,//仓库信息

    }
  })
}


//库存超上限列表
export function getSafeLimit(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/gs_setting/list_limit.json',
    method: 'get',
    params:{
      pageIndex:data.pageIndex,//页码
      pageSize:data.pageSize,//每页条数
      goods:data.goods,//商品信息
      goodsSn:data.goodsSn,//商品货号
      warehouse:data.warehouse,//仓库信息

    }
  })
}

//商品库存列表
export function getReserveList(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/inventory/list.json',
    method: 'get',
    params:{
      pageIndex:data.pageIndex,//页码
      pageSize:data.pageSize,//每页条数
      goodsName:data.goodsName,//商品信息
      goodsSn:data.goodsSn,//商品货号
      warehouseId:data.warehouseId,//仓库信息
      status:data.status,//出库状态
    }
  })
}

//商品库存明细列表
export function getReserveGoodsList(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/inventory/list_detail.json',
    method: 'get',
    params:{
      pageIndex:data.pageIndex,//页码
      pageSize:data.pageSize,//每页条数
      goodsId:data.goodsId,//商品ID
      skuId:data. skuId,//skuId
    }
  })
}


//获取商品的安全库存设置列表
export function getReserveSetting(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/gs_setting/list.json',
    method: 'get',
    params:{
      pageIndex:data.pageIndex,//页码
      pageSize:data.pageSize,//每页条数
      goodsId:data.goodsId,//商品ID
      skuId:data. skuId,//skuId
    }
  })
}


//编辑商品安全库存设置
export function edittReserveSetting(data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/gs_setting/update.json',
    method: 'post',
    data:data
  })
}