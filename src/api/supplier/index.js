import request from '@/utils/request'

// 获取审核商品列表
export function getGoodsList (data) {
  return request({
    url: '/supplier/goods_list',
    method: 'get',
    params: data
  })
}

// 获取审核商品列表
export function editTurnDown (data) {
  return request({
    url: '/supplier/turndown_edit',
    method: 'get',
    params: data
  })
}

// 获取信息变动审核列表
export function getExamineList (data) {
  return request({
    url: '/supplier/examine_list',
    method: 'get',
    params: data
  })
}

// 编辑 信息变动审核列表（通过，驳回）
export function editExamineState (data) {
  return request({
    url: '/supplier/examine_state',
    method: 'get',
    params: data
  })
}

// 获取 供应商列表
export function getManagesList (data) {
  return request({
    url: '/supplier/manages_list',
    method: 'get',
    params: data
  })
}

// 编辑（增加） 供应商
export function editSupplier (data) {
  return request({
    url: '/supplier/supplier_edit',
    method: 'get',
    params: data
  })
}

//获取公司性质可选参数
export function getNature (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/dictionary/find/company_nature.json',
    method: 'GET',
    params: {}
  })
}

// 供应商档案入驻申请
export function supplierApplyPost (data,arr) {
  return request({
    url: '/api/open/b/b2b2c/userservice/supplier/supplier_settled.json',
    method: 'post',
    data: {
      supplierName:data.personalForm.supplierName,//供应商名称
      supplierNature:data.personalForm.supplierNature,//公司性质
      supplierAddress:data.personalForm.address,//公司地址
      sysuserAccount:data.personalForm.account, //账号
      password:data.personalForm.pass, //密码
      agentBrand:data.personalForm.agency_branch,//代理品牌
      supplierUrl:data.personalForm.compony_url,//公司网址
      mainProduct:data.personalForm.main_product,//主营商品
      selfProduct:data.personalForm.selfProduct,//自营品牌
      isWholesale:data.personalForm.wholesale=='1'?true:false,// 支持一件代发: '1' 是 ， ‘2’ 否
      taxRate:parseInt(data.personalForm.taxRate) ,//税率
      api:data.personalForm.api=='0'?true:false,//api对接
      supplierCategory:data.personalForm.supplier_name.join(';'), //品类类型
      remark:data.personalForm.remark, //备注
      contactName:data.personalForm.contactName, //联系人
      contactDepartment:data.personalForm.department, //联系人部门
      contactPhone:data.personalForm.mobile, //联系人手机号码
      contactQQ:data.personalForm.qq, //QQ号码
      contactFixedPhone:data.personalForm.phone, //固定电话
      contactEmail:data.personalForm.email, //邮箱
      contactBirthday:data.personalForm.born, //出生年月
      contactWechat:data.personalForm.weixin, //联系人微信
      orderManagerName:data.personalForm.order_name,//订单人姓名
      orderManagerPhone:data.personalForm.order_mobile,//订单人手机号码
      orderManagerEmail:data.personalForm.order_email,//订单人邮箱
      orderManagerWechat:data.personalForm.order_wx,//订单人微信
      businessLicense:data.personalForm.BL_image_url,//营业执照
      licenseTimeStart:data.personalForm.brand_time[0], //营业执照开始时间
      licenseTimeEnd:data.personalForm.brand_time[1], //营业执照开始时间
      generalManagerName:data.personalForm.generalManagerName, //总经理
      generalManagerPhone:data.personalForm.generalManagerPhone, //总经理手机号码
      supplierPhone:data.personalForm.supplierPhone, //公司电话
      fax:data.personalForm.fax, //传真号码
      generalManagerWechat:data.personalForm.generalManagerWechat, //总经理微信号
      generalManagerEmail:data.personalForm.generalManagerEmail, //总经理微邮箱
      generalManagerFixedPhone:data.personalForm.generalManagerFixedPhone, //总经理直线电话
      bankName:data.personalForm.bankName, //开户行
      bankAccount:data.personalForm.bankAccount, //开户账号
      bankCompany:data.personalForm.bankCompany, //开户公司名称
      taxNumber:data.personalForm.taxNumber, //纳税人识别号
      registeredAddress:data.personalForm.registeredAddress, //注册地址
      registeredPhone:data.personalForm.registeredPhone,//注册电话
      settleType:data.personalForm.settleType, //结算方式
      creditLimit:data.personalForm.ious==1?data.personalForm.ious_input:data.personalForm.ious,//白条额度
      // businessLicense:data.personalForm.BL_image_url,// 营业执照图片地址
      taxpayerQualification:data.personalForm.taxpayerQualification,// 营业执照图片地址
      // licenseTimeStart:data.personalForm.brand_time[0],// 营业执照有效期开始
      // licenseTimeEnd:data.personalForm.brand_time[1],// 营业执照有效期结束
      idCardFront:data.personalForm.idCardFront,// 法人身份证
      brandAuthUrl:data.personalForm.brandAuthUrl,// 品牌授权书
      trademarkUrl:data.personalForm.trademarkUrl,// 商标注册证
      authorizationTimeStart:data.personalForm.authorization[0],//授权书有效期开始
      authorizationTimeEnd:data.personalForm.authorization[1],//授权书有效期结束
      trademarkTimeStart:data.personalForm.trademarkTime[0],//商标有效期开始
      trademarkTimeEnd:data.personalForm.trademarkTime[1],//商标有效期结束
      authorizationChain:arr.join('<:>'), //授权链
      authChainTimeStart:data.personalForm.authChainTime[0],//授权链有效期开始
      authChainTimeEnd:data.personalForm.authChainTime[1],//授权链有效期结束
      supplierReturn:data.personalForm.supplierReturn, // 售后
      adminId:data.personalForm.adminId, // 采购员
    }
  })
}

// 修改当前供应商信息
export function currentSupplierApplyEdior (data,arr,id) {
  return request({
    url: '/api/open/b/b2b2c/userservice/supplier/edit.json',
    method: 'PUT',
    data: {
      supplierId:id, //供应商ID
      supplierName:data.personalForm.supplierName,//供应商名称
      supplierNature:data.personalForm.supplierNature,//公司性质
      supplierAddress:data.personalForm.address,//公司地址
      sysuserAccount:data.personalForm.account, //账号
      password:data.personalForm.pass, //密码
      agentBrand:data.personalForm.agency_branch,//代理品牌
      supplierUrl:data.personalForm.compony_url,//公司网址
      mainProduct:data.personalForm.main_product,//主营商品
      selfProduct:data.personalForm.selfProduct,//自营品牌
      isWholesale:data.personalForm.wholesale=='1'?true:false,// 支持一件代发: '1' 是 ， ‘2’ 否
      taxRate:parseInt(data.personalForm.taxRate) ,//税率
      api:data.personalForm.api=='0'?true:false,//api对接
      supplierCategory:data.personalForm.supplier_name, //品类类型
      remark:data.personalForm.remark, //备注
      contactName:data.personalForm.contactName, //联系人
      contactDepartment:data.personalForm.department, //联系人部门
      contactPhone:data.personalForm.mobile, //联系人手机号码
      contactQQ:data.personalForm.qq, //QQ号码
      contactFixedPhone:data.personalForm.phone, //固定电话
      contactEmail:data.personalForm.email, //邮箱
      contactBirthday:data.personalForm.born, //出生年月
      contactWechat:data.personalForm.weixin, //联系人微信
      orderManagerName:data.personalForm.order_name,//订单人项姓名
      orderManagerPhone:data.personalForm.order_mobile,//订单人手机号码
      orderManagerEmail:data.personalForm.order_email,//订单人邮箱
      orderManagerWechat:data.personalForm.order_wx,//订单人微信
      businessLicense:data.personalForm.BL_image_url,//营业执照
      licenseTimeStart:data.personalForm.brand_time[0], //营业执照开始时间
      licenseTimeEnd:data.personalForm.brand_time[1], //营业执照开始时间
      generalManagerName:data.personalForm.generalManagerName, //总经理
      generalManagerPhone:data.personalForm.generalManagerPhone, //总经理手机号码
      supplierPhone:data.personalForm.supplierPhone, //公司电话
      fax:data.personalForm.fax, //传真号码
      generalManagerWechat:data.personalForm.generalManagerWechat, //总经理微信号
      generalManagerEmail:data.personalForm.generalManagerEmail, //总经理微邮箱
      generalManagerFixedPhone:data.personalForm.generalManagerFixedPhone, //总经理直线电话
      bankName:data.personalForm.bankName, //开户行
      bankAccount:data.personalForm.bankAccount, //开户账号
      bankCompany:data.personalForm.bankCompany, //开户公司名称
      taxNumber:data.personalForm.taxNumber, //纳税人识别号
      registeredAddress:data.personalForm.registeredAddress, //注册地址
      registeredPhone:data.personalForm.registeredPhone,//注册电话
      settleType:data.personalForm.settleType, //结算方式
      creditLimit:data.personalForm.ious==1?data.personalForm.ious_input:data.personalForm.ious,//白条额度
      // businessLicense:data.personalForm.BL_image_url,// 营业执照图片地址
      taxpayerQualification:data.personalForm.taxpayerQualification,// 营业执照图片地址
      // licenseTimeStart:data.personalForm.brand_time[0],// 营业执照有效期开始
      // licenseTimeEnd:data.personalForm.brand_time[1],// 营业执照有效期结束
      idCardFront:data.personalForm.idCardFront,// 法人身份证
      brandAuthUrl:data.personalForm.brandAuthUrl,// 品牌授权书
      trademarkUrl:data.personalForm.trademarkUrl,// 商标注册证
      authorizationTimeStart:data.personalForm.authorization[0],//授权书有效期开始
      authorizationTimeEnd:data.personalForm.authorization[1],//授权书有效期结束
      trademarkTimeStart:data.personalForm.trademarkTime[0],//商标有效期开始
      trademarkTimeEnd:data.personalForm.trademarkTime[1],//商标有效期结束
      authorizationChain:arr.join('<:>'), //授权链
      authChainTimeStart:data.personalForm.authChainTime[0],//授权链有效期开始
      authChainTimeEnd:data.personalForm.authChainTime[1],//授权链有效期结束
      supplierReturn:data.personalForm.supplierReturn, // 售后
      adminId:data.personalForm.adminId, // 采购员
    }
  })
}

// 供应商档案信息编辑
export function supplierApplyEdior (data,arr,id) {
  console.log(data)
  return request({
    url: '/api/open/b/b2b2c/userservice/supplier/edit.json',
    method: 'PUT',
    data: {
      supplierId:id, //供应商ID
      supplierName:data.personalForm.supplierName,//供应商名称
      supplierNature:data.personalForm.supplierNature,//公司性质
      supplierAddress:data.personalForm.address,//公司地址
      sysuserAccount:data.personalForm.account, //账号
      password:data.personalForm.pass, //密码
      agentBrand:data.personalForm.agency_branch,//代理品牌
      supplierUrl:data.personalForm.compony_url,//公司网址
      mainProduct:data.personalForm.main_product,//主营商品
      selfProduct:data.personalForm.selfProduct,//自营品牌
      isWholesale:data.personalForm.wholesale=='1'?true:false,// 支持一件代发: '1' 是 ， ‘2’ 否
      taxRate:parseInt(data.personalForm.taxRate) ,//税率
      api:data.personalForm.api=='0'?true:false,//api对接
      supplierCategory:data.personalForm.supplier_name.join(';'), //品类类型
      remark:data.personalForm.remark, //备注
      contactName:data.personalForm.contactName, //联系人
      contactDepartment:data.personalForm.department, //联系人部门
      contactPhone:data.personalForm.mobile, //联系人手机号码
      contactQQ:data.personalForm.qq, //QQ号码
      contactFixedPhone:data.personalForm.phone, //固定电话
      contactEmail:data.personalForm.email, //邮箱
      contactBirthday:data.personalForm.born, //出生年月
      contactWechat:data.personalForm.weixin, //联系人微信
      orderManagerName:data.personalForm.order_name,//订单人姓名
      orderManagerPhone:data.personalForm.order_mobile,//订单人手机号码
      orderManagerEmail:data.personalForm.order_email,//订单人邮箱
      orderManagerWechat:data.personalForm.order_wx,//订单人微信
      businessLicense:data.personalForm.BL_image_url,//营业执照
      licenseTimeStart:data.personalForm.brand_time[0], //营业执照开始时间
      licenseTimeEnd:data.personalForm.brand_time[1], //营业执照开始时间
      generalManagerName:data.personalForm.generalManagerName, //总经理
      generalManagerPhone:data.personalForm.generalManagerPhone, //总经理手机号码
      supplierPhone:data.personalForm.supplierPhone, //公司电话
      fax:data.personalForm.fax, //传真号码
      generalManagerWechat:data.personalForm.generalManagerWechat, //总经理微信号
      generalManagerEmail:data.personalForm.generalManagerEmail, //总经理微邮箱
      generalManagerFixedPhone:data.personalForm.generalManagerFixedPhone, //总经理直线电话
      bankName:data.personalForm.bankName, //开户行
      bankAccount:data.personalForm.bankAccount, //开户账号
      bankCompany:data.personalForm.bankCompany, //开户公司名称
      taxNumber:data.personalForm.taxNumber, //纳税人识别号
      registeredAddress:data.personalForm.registeredAddress, //注册地址
      registeredPhone:data.personalForm.registeredPhone,//注册电话
      settleType:data.personalForm.settleType, //结算方式
      creditLimit:data.personalForm.ious==1?data.personalForm.ious_input:data.personalForm.ious,//白条额度
      // businessLicense:data.personalForm.BL_image_url,// 营业执照图片地址
      taxpayerQualification:data.personalForm.taxpayerQualification,// 营业执照图片地址
      // licenseTimeStart:data.personalForm.brand_time[0],// 营业执照有效期开始
      // licenseTimeEnd:data.personalForm.brand_time[1],// 营业执照有效期结束
      idCardFront:data.personalForm.idCardFront,// 法人身份证
      brandAuthUrl:data.personalForm.brandAuthUrl,// 品牌授权书
      trademarkUrl:data.personalForm.trademarkUrl,// 商标注册证
      authorizationTimeStart:data.personalForm.authorization[0],//授权书有效期开始
      authorizationTimeEnd:data.personalForm.authorization[1],//授权书有效期结束
      trademarkTimeStart:data.personalForm.trademarkTime[0],//商标有效期开始
      trademarkTimeEnd:data.personalForm.trademarkTime[1],//商标有效期结束
      authorizationChain:arr.join('<:>'), //授权链
      authChainTimeStart:data.personalForm.authChainTime[0],//授权链有效期开始
      authChainTimeEnd:data.personalForm.authChainTime[1],//授权链有效期结束
      supplierReturn:data.personalForm.supplierReturn, // 售后
      adminId:data.personalForm.adminId, // 采购员
    }
  })
}

// 修改供应商状态
export function supplierApplyPostState(data,reason,state) {
  return request({
    url: '/api/open/b/b2b2c/userservice/supplier/edit_status.json',
    method: 'PUT',
    params: {
      supplierId: data,
      reason: reason,
      supplierStatus: state,
    }
  })
}

// 根据供应商ID查询供应商详细信息
export function supplierApplyPostByid (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/supplier/find_info_by_id.json',
    method: 'GET',
    params: {
      supplierId: data
    }
  })
}

// 供应商注册入驻申请
export function supplierApplyPostin (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/supplier/supplier_settled.json',
    method: 'post',
    data: {
      supplierName:data.personalForm.supplierName,//供应商名称
      supplierNature:data.personalForm.supplierNature,//公司性质
      supplierAddress:data.personalForm.address,//公司地址
      sysuserAccount:data.personalForm.account, //账号
      password:data.personalForm.pass, //密码
      agentBrand:data.personalForm.agency_branch,//代理品牌
      supplierUrl:data.personalForm.compony_url,//公司网址
      mainProduct:data.personalForm.main_product,//主营商品
      isWholesale:data.personalForm.wholesale=='1'?true:false,// 支持一件代发: '1' 是 ， ‘2’ 否
      taxRate:parseInt(data.personalForm.taxRate) ,//税率
      api:data.personalForm.api=='0'?false:true,//api对接
      supplierCategory:data.personalForm.supplier_name.join(';'), //品类类型
      remark:data.personalForm.remark, //备注
      contactName:data.personalForm.contactName, //联系人
      contactDepartment:data.personalForm.department, //联系人部门
      contactPhone:data.personalForm.mobile, //联系人手机号码
      contactQQ:data.personalForm.qq, //QQ号码
      contactFixedPhone:data.personalForm.phone, //固定电话
      contactEmail:data.personalForm.email, //邮箱
      contactBirthday:data.personalForm.born, //出生年月
      contactWechat:data.personalForm.weixin, //联系人微信
      orderManagerPhone:data.personalForm.order_mobile,//订单人手机号码
      orderManagerEmail:data.personalForm.order_email,//订单人邮箱
      orderManagerWechat:data.personalForm.order_wx,//订单人微信
      businessLicense:data.personalForm.BL_image_url,//营业执照
      licenseTimeStart:data.personalForm.brand_time[0], //营业执照开始时间
      licenseTimeEnd:data.personalForm.brand_time[1], //营业执照开始时间
      bankCompany:data.personalForm.bankCompany, //开户公司名称
    }
  })
}

// 检查供应商名称是否存在
export function repeat (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/supplier/exits_by_name.json',
    method: 'get',
    params: {
      supplierName:data
    }
  })
}

// 判断注册账号是否存在
export function repeatAcount (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser/exits_by_account.json',
    method: 'get',
    params: {
      sysuserAccount:data
    }
  })
}

// 申请审核失败原因
export function whyFailure (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/supplier/get_audit_status.json',
    method: 'get',
    params: {}
  })
}

// 分页查询供应商管理信息
export function getSupplier (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/supplier/find_info_and_count_page.json',
    method: 'GET',
    params: {
      pageNum:data.current_page,
      pageSize:data.page_size,
      supplierStatus:data.search_type?data.search_type:'',
      auditStatus:1,
      keywords:data.keywords
    }
  })
}

// 删除供应商
export function deleteantarky (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/supplier/delete.json',
    method: 'DELETE',
    params: {
      reason:data.reason,
      supplierId:data.supplierId,
    }
  })
}

// 重新指派审核人员
export function editTaskUser(taskId, userId) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser_audit/editTaskUser.json',
    method: 'PUT',
    params: {
      taskId:taskId,
      userId:userId
    }
  })
}
// 添加审核人员
export function addTaskUser(auditId, userId) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser_audit/addTaskUser.json',
    method: 'POST',
    params: {
      auditId:auditId,
      userId:userId
    }
  })
}

export function getAuditInfoListByAuditId(auditId) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser_audit/find_audit_list.json',
    method: 'GET',
    params: {
      auditId: auditId || null
    }
  })
}

// 分页查询供应商审核信息
export function getSupplieraudit (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser_audit/find_supplier_audit_page.json',
    method: 'GET',
    params: {
      pageNum:data.current_page,
      pageSize:data.page_size,
      auditStatus:data.auditStatus?data.auditStatus:'',
      keywords:data.keywords,
	    auditId: data.auditId || ""
    }
  })
}



export function getSupplieraudit1 (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser_audit/find_supplier_audit_page.json',
    method: 'GET',
    params:{
        auditId:data.auditId,
        auditStatus:data.auditStatus
    }
  })
}

// 获取当前供应商详细信息
export function getCurrentSupplierInfo() {
  return request({
    url: '/api/open/b/b2b2c/userservice/supplier/current_info.json',
    method: 'GET',
    params: {
    }
  })
}

// 分页查询供应商档案
export function getSupplierarchives (data,catIds) {
  return request({
    url: '/api/open/b/b2b2c/userservice/supplier/find_page.json',
    method: 'GET',
    params: {
      pageNum:data.current_page,
      pageSize:data.page_size,
      keywords:data.keywords,
      catIds:catIds.join(','),
      supplierStatus:data.supplierStatus,
      adminId:data.adminId,
      adminName:data.adminName,
      supplierCategory:data.supplierCategory
    }
  })
}

// 根据组织架构ID获取用户信息
export function getSupplierbinduser (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser/find_by_organize_id.json',
    method: 'GET',
    params: {
      organizeId:data,
    }
  })
}

// 绑定管理员
export function bindSupplieruser (adminId,supplierId) {
  return request({
    url: '/api/open/b/b2b2c/userservice/supplier/bind_admin.json',
    method: 'PUT',
    params: {
      adminId:adminId,
      supplierId:supplierId,
    }
  })
}
//加入黑名单
export function enterBlack(data){
  return request({
    url:'/api/open/b/b2b2c/userservice/supplier/edit_status.json',
    method:'put',
    params:{
      supplierId:data.supplierId,
      supplierStatus:data.supplierStatus,
      reason:data.reason
    }
  })
}

// 审核供应商入驻请求
export function throughSupplieraudit (data,state) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser_audit/edit_supplier_audit.json',
    method: 'PUT',
    params : {
      supplierId:data.supplierId,
      verifyRemark:data.reason,
      auditStatus:state?state:'',
      auditId:data.auditId,
      taskId:data.taskId || ""
    }
  })
}

//分页查询采购员用户简单信息 (供下拉选框及联想输入使用)
export function getAlluser (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser_buyer/find_simple_page.json',
    method: 'GET',
    params : {
      pageNum:1,
      pageSize:0
    }
  })
}
//分页查询销售员用户简单信息 (供下拉选框及联想输入使用)
export function getSaleManList (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuserSalesman/find_by_simple.json',
    method: 'GET',
    params : {
      pageNum:1,
      pageSize:0
    }
  })
}

//查询带商品分类的采购员列表
export function getUsercatagory (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser_buyer/find_info_and_goods_category.json',
    method: 'GET',
    params : {
      pageNum:data.pageNum,
      pageSize:data.pageSize
    }
  })
}

//分页查询供应商简单信息 (供下拉选框及联想输入使用)
export function getInformation (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/supplier/find_simple_page.json',
    method: 'GET',
    params : {
      pageNum:1,
      pageSize:0,
      supplierStatus:0,
      auditStatus:1
    }
  })
}


// 恢复供应商信息
export function recoveryInformation(data){
  return request({
    url:'/api/open/b/b2b2c/userservice/supplier/recovery.json',
    method:"PUT",
    params:{
      supplierId:data.supplierId,
      reason:data.reason
    }
  })
}

// 加载审核记录
export function getAllauditrecord(data,catIds){
  return request({
    url:'/api/open/b/b2b2c/goodsservice/brandaudit/find_brand_audit.json',
    method:"POST",
    params:{
      pageIndex:data.current_page,
      pageSize:data.page_size,
      auditStatus: data.auditStatus, // 审核状态
      sysUserName: data.sysUserName, //采销名称
      catIds:catIds.join(','),
      supplierName:data.supplierName, //供应商名称
    }
  })
}


// 新增品牌开通申请
export function addNewBrand(data,arr){
  return request({
    url:'/api/open/b/b2b2c/goodsservice/brandaudit/save.json',
    method:"POST",
    data:{
      catSysuserIds:arr, // 分类和采销arr
      brandId:data.branId , // 品牌id
      supplierId:data.supplierId , // 供应商id
      brandAuthUrl:data.brandImg,// 品牌授权书图片
      trademarkUrl:data.trademark,// 商标图片
      authTimeStart:data.brandTime[0],// 	授权书有效期-开始
      authTimeEnd:data.brandTime[1],// 授权书有效期-结束
      trademarkTimeStart:data.trademarkTime[0],// 注册证有效期-开始
      trademarkTimeEnd:data.trademarkTime[1],// 注册证有效期-结束
      firstAuthChain:data.chainOne, // 一级授权链（图片）
      secondAuthChain:data.chainTwo, // 二级授权链（图片）
      thirdlyAuthChain:data.chainThree, // 三级授权链（图片）
      authChainTimeStart:data.licenseTime[0], // 授权链有效期-开始
      authChainTimeEnd:data.licenseTime[1], // 授权链有效期-结束
    }
  })
}

// 查询品牌开通的审核记录
export function queryBrandAudit(data){
  return request({
    url:'/api/open/b/b2b2c/goodsservice/brandaudit/find_by_audit.json',
    method:"GET",
    params:{
      brandAuditId:data,
    }
  })
}

//对品牌开通申请进行审核
export function applyBrandAudit(data){
  return request({
    url:'/api/open/b/b2b2c/goodsservice/brandaudit/audit_brand.json',
    method:"POST",
    params:{
      auditId:data.auditId,
      operationId:data.operationId,
      processId:data.processId,
      isLevel:data.isLevel,
      processStatus:data.processStatus,
      auditRemark:data.auditRemark,
    }
  })
}

// 为供应商设置管理员并开启审核
export function supplierAudit(data){
  return request({
    url:'/api/open/b/b2b2c/userservice/sysuser_audit/supplier_set_admin.json',
    method:"POST",
    params:{
      adminId:data.adminId,
      auditId:data.auditId,
      supplierId:data.supplierId
    }
  })
}

//绑定分类与采购员的关联关系

export function application(data){
  return request({
    url:'/api/open/b/b2b2c/goodsservice/category/save_bind_cat_sysuser.json',
    method:"PUT",
    data:{
      catId:data.catId,
      sysuserId:data.sysuserId

    }
  })
}

//获取当前用户数据
export function sysusercurrent(token){
  return request({
    url:'/api/open/b/b2b2c/userservice/sysuser/current.json',
    method:"GET",
    headers: {
      token: token
    }
  })
}

//根据条件分页查询第三方供应商
export function thirdPartySupplier(data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/third_party_supplier/list_page.json',
    method: "POST",
    data: {
      ...data
    }
  })
}

//根据ID查询第三方供应商信息
export function querySupplier(thirdPartySupplierId) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/third_party_supplier/find_by_id.json',
    method: "GET",
    params: {
      thirdPartySupplierId
    }
  })
}

