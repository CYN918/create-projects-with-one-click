import request from "@/utils/request";

//根据ID查询单个系统配置信息
export function getfindbytype(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/auditSetting/find_by_audit_type.json",
    method: "GET",
    params: {
      auditType: data
    }
  });
}

//查询集采订单审核配置
export function configuration(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/order_audit_setting/findSettingByUserId.json",
    method: "GET",
    params: data
  });
}

//提报商品审核配置
export function submission(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/goods_report_setting/findSettingByUserId.json",
    method: "GET",
    params: data
  });
}

//保存提报商品审核配置
export function saveSubmission(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/goods_report_setting/saveSetting.json",
    method: "POST",
    data: data
  });
}

//修改系统配置
export function ediotfindbytype(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/auditSetting/update.json",
    method: "POST",
    data: data
  });
}

//修改集采订单审核配置
export function updatefindbytype(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/order_audit_setting/updateSetting.json",
    method: "PUT",
    data: data
  });
}

//保存集采订单审核配置
export function saveSetting(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/order_audit_setting/saveSetting.json",
    method: "POST",
    data: data
  });
}

//修改提报商品审核配置
export function submissionfindbytype(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/goods_report_setting/updateSetting.json",
    method: "PUT",
    data: data
  });
}

//根据配置模式查询配置信息
export function findBySetting(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/order_intercept_setting/findBySettingType.json",
    method: "GET",
    params: {settingType:data}
  });
}

//关闭订单拦截配置
export function shutDownSetting(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/order_intercept_setting/shutDownSetting.json",
    method: "PUT",
    data: data
  });
}

//保存、修改操作
export function savaSetting(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/order_intercept_setting/operating.json",
    method: "POST",
    data: data
  });
}


export const AuditType={
  SUPPLIER:1,//供应商
  CUSTOMER:2,//客户
  AGENCY:3,//经销商

  AGENCY_CONTRACT:300,//经销商合同审核

  GOODS_PUSH_AGENCY:400,//商品推送审核（总站->经销商）
  GOODS_PUSH_PROJECT:401,//商品推送审核（经销商->项目）

  GOODS_SHELF:500,//商品审核-上架
  GOODS_LOWER_SHELF:501,//商品审核-下架
  GOODS_MODIFY_PRICE:502,//商品审核-调价
  GOODS_INFORMATION_CHANGE:503,//商品审核-信息变更
  GOODS_DELETE:504,//商品审核-删除
  GOODS_JD_PRICE_CHANGE:505,//商品审核-京东改价
  GOODS_BRAND_OPENING:510,//品牌开通审核

  INVENTORY_TRANSFER:600,// 库存调拨审核
  INVENTORY_CHECK:601,// 库存盘点审核
  PURCHASE_PAYMENT_APPLY:602,// 采购付款申请


}
//通用范围审核配置
export const AmountAuditType={
      FINANCIAL_PAYMENT:6,//财务付款审核配置
      GOODS_PRICE_UP:4,//商品价格上调审核配置
      GOODS_PRICE_DOWN:5,//商品价格下调审核配置
      POINTS_DISTRIBUTION:10,//积分发放审核配置
      GIFT_CARD_DISTRIBUTION:11,//礼品卡发放审核配置
      //售后配置
      AFTER_SALE_0:100,//0-退货/退款；
      AFTER_SALE_1:101,//1-维修；
      AFTER_SALE_2:102,//2-换货；
      AFTER_SALE_3:103,//3-破损补寄;
      AFTER_SALE_4:104,//4-丢件补寄；
      AFTER_SALE_5:105,//5-补寄配件；
      AFTER_SALE_6:106,//6-补偿费用
}
//erp审核配置
export const ErpAuditType={
  SALE_ORDER_CONTRACT:1,
  PURCHASE_CONTRACT_APPLY:2,
  PURCHASE_CONTRACT_SIGN:3,
}

//获取数据库配置信息
export function findDatabaseConfig() {
  return request({
    url: "/api/open/b/b2b2c/settingservice/database_table/find_database_config.json",
    method: "GET"
  });
}

//修改数据库配置
export function editDatabaseConfig(configId, data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/database_table/update_database_config.json",
    method: "PUT",
    data: {
      ...data,
      id: configId
    }
  });
}

//获取全部数据库列表
export function findAllDatabase(configId) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/database_table/find_all_database.json",
    method: "GET",
    params: {
      "configId": configId
    }
  });
}

//获取全部数据库内的表列表
export function findAllTable(configId, databaseName) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/database_table/find_all_table.json",
    method: "GET",
    params: {
      "configId": configId,
      "databaseName": databaseName
    }
  });
}

//根据parentCode查询配置信息集合
export function findlistByparentcode(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/systemSetting/find_list_by_parent_code.json",
    method: "GET",
    params: {
      parentCode:data
    }
  });
}

//获取经销商应用功能模块列表
export function findAgencyModules() {
  return request({
    url: "/api/open/b/b2b2c/settingservice/apply_module/find_agency_modules.json",
    method: "GET"
  })
}

export function findProjectModules() {
  return request({
    url: "/api/open/b/b2b2c/settingservice/apply_module/find_project_modules.json",
    method: "GET"
  })
}

//保存应用功能模块列表
export function saveApplyModules(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/apply_module/save.json",
    method: "POST",
    data: data
  })
}

//修改应用功能模块
export function editApplyModule(moduleId, data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/apply_module/update.json",
    method: "PUT",
    data: {
      ...data,
      id: moduleId
    }
  })
}

//删除应用功能模块
export function deleteApplyModule(moduleId) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/apply_module/delete.json",
    method: "DELETE",
    params: {
      moduleId: moduleId
    }
  })
}

//通过功能模块ID查询需要创建的数据库表
export function findDatabaseByModuleId(moduleId) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/module_table/find_by_moduleId.json",
    method: "GET",
    params: {
      moduleId: moduleId
    }
  })
}

//保存全部应用模块表
export function saveAllModuleTables(configId, moduleId, tables) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/module_table/save_all.json",
    method: "POST",
    data: {
      configId: configId,
      moduleId: moduleId,
      tables: tables
    }
  })
}

//获取路由配置数据
export function findRouteConfigPage(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/route_config/find_page.json",
    method: "GET",
    params: data
  })
}

//修改系统配置
export function updateByCode(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/systemSetting/updateAll.json",
    method: "PUT",
    data:data
  })
}

//根据审核类型查询审核配置数据
export function findbyaudittype(auditType) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/erp_audit_setting/find_by_audit_type.json",
    method: "GET",
    params:{
      auditType:auditType
    }
  })
}
//根据审核类型查询审核配置数据
export function findAmountAuditByType(auditType) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/amount_audit/find_by_audit_type.json",
    method: "GET",
    params:{
      auditType:auditType
    }
  })
}

//通过ID获取路由配置数据
export function findRouteById(routerId) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/route_config/find_by_id.json",
    method: "GET",
    params: {
      routerId: routerId
    }
  })
}

//根据审核类型查询审核配置数据
export function updateAmountAudit(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/amount_audit/update.json",
    method: "PUT",
    data:data
  })
}


//根据审核类型查询审核配置数据
export function erpauditsetting(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/erp_audit_setting/update.json",
    method: "POST",
    data:data
  })
}

//更新路由配置
export function editRouteConfig(routerId, data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/route_config/update.json",
    method: "PUT",
    data: {
      ...data,
      id: routerId
    }
  })
}

//分页查询支付配置数据
export function getpaymentConfig(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/paymentConfig/find_page.json",
    method: "GET",
    params: {
      pageNum:data.pageNum,
      pageSize:data.pageSize
    }
  })
}

//根据支付方式code名称查询支付配置数据
export function findbycode(paymentCode) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/paymentConfig/find_by_code.json",
    method: "GET",
    params: {
      paymentCode:paymentCode
    }
  })
}

//修改支付配置
export function updatebycode(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/paymentConfig/update.json",
    method: "PUT",
    data: data
  })
}

//根据审核类型查询审核配置数据
export function getfindbyagencyid(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/quota_grant/find_by_agency.json",
    method: "GET",
    params: {
      agencyId:data.agencyId,
      pageNum:data.pageNum,
      pageSize:data.pageSize
    }
  })
}

//查询全部配置数据
export function findallsystem(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/systemSetting/find_all.json",
    method: "GET",
    params: {
      pageNum:data.pageNum,
      pageSize:data.pageSize
    }
  })
}

//获取所有组织架构信息
export function gettingInformation(organizeId) {
  return request({
    url: "/api/open/b/b2b2c/userservice/organize/find_all.json",
    method: "GET",
    params: {organizeId}
  })
}
//根据组织架构ID获取用户信息
export function getChildNodes(organizeId) {
  return request({
    url: "/api/open/b/b2b2c/userservice/sysuser/find_by_organize_id.json",
    method: "GET",
    params: {organizeId}
  })
}

//数据同步列表--分页查询数据配置
export function systemfindByPage(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/systemSyncSetting/findByPage.json",
    method: "GET",
    params: {
      pageNum:data.pageNum,
      pageSize:data.pageSize,
      businessType:data.businessType
    }
  })
}

//查询单条数据同步配置信息
export function settingfindByCode(busCode) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/systemSyncSetting/findByCode.json",
    method: "GET",
    params: {
      busCode:busCode,
    }
  })
}

//修改数据同步配置
export function settingupdateByCode(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/systemSyncSetting/updateByCode.json",
    method: "PUT",
    data: data
  })
}

//分页查询额度审核配置列表信息
export function quotaSettingfindByPage(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/quotaSetting/findByPage.json",
    method: "GET",
    params: {
      pageNum:data.pageNum,
      pageSize:data.pageSize,
      merchantId:data.merchantId,
      auditSwitch:data.auditSwitch
    }
  })
}

//根据主键ID获取单条记录
export function quotaSettingfindById(id) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/quotaSetting/findById.json",
    method: "GET",
    params: {
      id:id
    }
  })
}

//创建或修改额度审核配置
export function quotaSettingUpdate(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/quotaSetting/createOrUpdate.json",
    method: "POST",
    data: data
  })
}

// 获取服务商
export function getMerchantName () {
  return request({
    url: '/api/open/b/b2b2c/settingservice/route_config/current_route_info.json',
    method: 'get',
  })
}


/*******************************额度发放审核*********************************** */

// 额度发放审核列表
export function andIssue(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/quota_grant/find_by_agency.json",
    method: "GET",
    data
  })
}

// 额度发放审核详情
export function andIssueInfo(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/quotaSetting/findById.json",
    method: "GET",
    params: data
  })
}
