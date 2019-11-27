import request from '@/utils/request'

/****************************额度管理人************************** */
// 获取所有额度管理人
export function getAllMenu (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/organize/get_parent_and_child_node.json',
    method: 'GET',
    params: {}
  })
}

// 根据组织id查询额度管理人信息
export function getidMenu (data) {
  return request({
    url: '/api/open/b/b2b2c/settingservice/quotaAdminUser/findByOrgId.json',
    method: 'POST',
    params: {
      organizeId:data,
    }
  })
}

// 弹框用户列表
export function findByPage (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser/find_by_organize_id.json',
    method: 'get',
    params:data
  })
}

// 弹框用户列表（额度发放）
export function findByPageUser (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/user/find_page.json',
    method: 'get',
    params:data
  })
}

// 弹框根据id查询用户信息
export function getUserList (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser/find_by_organize_id.json',
    method: 'get',
    params: {
      organizeId:data,
    }
  })
}


//弹框里面搜索的树形结构数据
export function getAllOrganizational (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/organize/get_parent_and_child_node.json',
    method: 'get',
    params: {}
  })
}

// 新增保存
export function saveForm (data) {
  return request({
    url: '/api/open/b/b2b2c/settingservice/quotaAdminUser/save.json',
    method: 'POST',
    data
  })
}

// 编辑保存
export function updateForm (data) {
  return request({
    url: '/api/open/b/b2b2c/settingservice/quotaAdminUser/update.json',
    method: 'POST',
    data
  })
}

/*****************************我的充值************************** */
// 我的充值列表
export function getMyPrepaidList (data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/advancePayment/findMyPage.json',
    method: 'get',
    params: data
  })
}

// 获取服务商
export function getMerchantName () {
  return request({
    url: '/api/open/b/b2b2c/settingservice/route_config/current_route_info.json',
    method: 'get',
  })
}

/***********************充值管理*************************/

//充值管理列表
export function advancePayment (data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/advancePayment/findByPage.json',
    method: 'get',
    params: data
  })
}

//核对充值
export function checkTopup (data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/advancePayment/findById.json',
    method: 'GET',
    params: data
  })
}

//确认核对充值
export function handleSave (data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/advancePayment/checkOrder.json',
    method: 'PUT',
    params: data
  })
}

//额度申请确认
export function handleLinesSave (data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/quotaPayment/save.json',
    method: 'POST',
    data
  })
}

//去充值
export function toPay (data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/paymentorder/to_pay.json',
    method: 'GET',
    params: data
  })
}

//上传票据
export function uploadingBill (data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/advancePayment/uploadingBill.json',
    method: 'PUT',
    params: data
  })
}

// 生成二维码
export function payStatusTop(data) {
  return request({
    url: "/api/open/b/b2b2c/projectservice/paymentorder/query_pay_order.json",
    method: "POST",
    data
  })
}

// 详情
export function topUpDetails(data) {
  return request({
    url: "/api/open/b/b2b2c/projectservice/advancePayment/findById.json",
    method: "GET",
    params: data
  })
}

/***********************额度审核*************************/

//额度审核列表
export function reviewList (data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/quotaPayment/findByPage.json',
    method: 'get',
    params: data
  })
}

//额度审核详情
export function getAuditDetails (data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/quotaPayment/findById.json',
    method: 'GET',
    params: data
  })
}

// 领导审批
export function approval (data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/quotaPayment/auditQuota.json',
    method: 'PUT',
    params: data
  })
}



// 发放
export function issueSave (data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/quotaPayment/makeQuota.json',
    method: 'PUT',
    params: data
  })
}

// 发放详情
export function findSettingByMerchantId (data) {
  return request({
    url: '/api/open/b/b2b2c/settingservice/quotaSetting/findSettingByMerchantId.json',
    method: 'GET',
    params: data
  })
}

// 发放详情
export function outDetails (data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/quotaPayment/findById.json',
    method: 'GET',
    params: data
  })
}

/***********************额度发放管理****************** */

//额度发放管理列表
export function getMessageList(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/quota_grant/find_by_agency.json",
    method: "GET",
    params: data
  })
}

//额度发放管理详情
export function getLinesDetails (data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/quotaPayment/findById.json',
    method: 'GET',
    params: data
  })
}

// 经销商下拉框
export function agencyList (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/agency/find_by_page.json',
    method: 'GET',
    params: data
  })
}

// 经销商账户下拉框
export function dealerAccount (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/accounttype/find_account_page.json',
    method: 'POST',
    data
  })
}

// 查询账户余额
export function findMerchantAccountInfo (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/accountinfo/findMerchantAccountInfo.json',
    method: 'GET',
    params: data
  })
}

/***********************我的财务****************** */
export function accountinfo(data) {
  return request({
    url: "/api/open/b/b2b2c/userservice/accountinfo/findAllAccountInfoByUserId.json",
    method: "GET",
    params: data
  })
}

// 更新我的财务信息
export function update(data) {
  return request({
    url: "/api/open/b/b2b2c/userservice/accountinfo/createOrUpdate.json",
    method: "POST",
    data
  })
}

// 充值
export function paymentorder(data) {
  return request({
    url: "/api/open/b/b2b2c/projectservice/paymentorder/save.json",
    method: "POST",
    data
  })
}

export function paymentorderCon(data) {
  return request({
    url: "/api/open/b/b2b2c/projectservice/paymentorder/to_pay.json",
    method: "GET",
    params: data
  })
}


// 生成二维码
export function qr_code(data) {
  return request({
    url: "/api/open/b/b2b2c/projectservice/paymentorder/qr_code.json",
    method: "GET",
    params: data
  })
}

// 支付状态
export function payStatus(data) {
  return request({
    url: "/api/open/b/b2b2c/projectservice/paymentorder/query_pay_order.json",
    method: "POST",
    data
  })
}

// 公司转账
export function transferSave(data) {
  return request({
    url: "/api/open/b/b2b2c/projectservice/advancePayment/save.json",
    method: "POST",
    data
  })
}

// 公司转账收款方信息
export function getCollectionInfo(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/quotaPaymentConfig/findCurrentQuotaPayConfig.json",
    method: "GET",
    params: data
  })
}

// 公司转账付款方信息
export function findBankInfo(data) {
  return request({
    url: "/api/open/b/b2b2c/userservice/sysuser/findBankInfoById.json",
    method: "GET",
    params: data
  })
}

/**********************************额度发放管理******************************* */
export function provideLists(data) {
  return request({
    url: "/api/open/b/b2b2c/projectservice/quotaPayment/findByPage.json",
    method: "GET",
    params: data
  })
}


/****************************************额度发放****************************************** */
// 列表
export function itemsList(data) {
  return request({
    url: "/api/open/b/b2b2c/projectservice/quotaMember/findByPage.json",
    method: "GET",
    params: data
  })
}

// 发放额度
export function quotaMemberSave(data) {
  return request({
    url: "/api/open/b/b2b2c/projectservice/quotaMember/save.json",
    method: "POST",
    data
  })
}

// 审核获取单条信息
export function auditCheck(data) {
  return request({
    url: "/api/open/b/b2b2c/projectservice/quotaMember/findById.json",
    method: "GET",
    params: data
  })
}

// 审核
export function auditQuotaMember(data) {
  return request({
    url: "/api/open/b/b2b2c/projectservice/quotaMember/auditQuotaMember.json",
    method: "PUT",
    params: data
  })
}

// 发放
export function makeQuotaSave(data) {
  return request({
    url: "/api/open/b/b2b2c/projectservice/quotaMember/makeQuota.json",
    method: "PUT",
    params: data
  })
}

// 获取品牌
export function getBrand(data) {
  return request({
      url: '/api/open/b/b2b2c/goodsservice/brand/page.json',
      method: 'get',
      params: {
          keyWord: data.keyWord,
          pageIndex: data.pageIndex,
          pageSize: data.pageSize,
      }
  })
}

// 根据商品分类ID获取所有相关的商品规格
export function getIdgoodspec(data) {
  return request({
      url: '/api/open/b/b2b2c/goodsservice/goods_spec/list_select.json',
      method: 'GET',
      params: {
          catId: data
      }
  })
}

//查询商品分类树形结构
export function getcategory2(data) {
  return request({
      url: '/api/open/b/b2b2c/goodsservice/category/tree.json',
      method: 'GET',
      params: {
          parentId: 0
      }
  })
}

// 发放给个人
export function quotaPaymentList(data) {
  return request({
      url: '/api/open/b/b2b2c/projectservice/quotaMember/findByPage.json',
      method: 'GET',
      params: data
  })
}

// 添加部门列表
export function findByPageBranch(data) {
  return request({
    url: "/api/open/b/b2b2c/settingservice/quotaAdminUser/findByOrgId.json",
    method: "POST",
    params: data
  })
}

// 弹框里商品列表
export function goodsserviceList(data) {
  return request({
    url: "/api/open/b/b2b2c/goodsservice/goods/find_show_goods.json",
    method: "GET",
    params: data
  })
}

// 额度发放详情
export function quotaMemberInfo(data) {
  return request({
    url: "/api/open/b/b2b2c/projectservice/quotaMember/findById.json",
    method: "GET",
    params: data
  })
}

/********************************账户绑定管理******************************* */

// 获取已绑定账户的用户
export function accountInfoList(data) {
  return request({
    url: "/api/open/b/b2b2c/userservice/accountinfo/findAccountInfoByPage.json",
    method: "GET",
    params: data
  })
}

// 用户与账户绑定
export function accountBinding(data) {
  return request({
    url: "/api/open/b/b2b2c/userservice/accountinfo/createOrUpdate.json",
    method: "POST",
    data
  })
}

// 经销商下拉
export function getAgency(data){
	return request({
		url:'/api/open/b/b2b2c/userservice/sysuser/findByPage.json',
		method:'GET',
		params:data
	})
}