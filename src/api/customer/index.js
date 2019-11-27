import request from '@/utils/request'

// 分页查询客户
export function getAllcustomer (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/customer/find_by_page.json',
    method: 'GET',
    params: {
        pageNum:data.pageNum,
        pageSize:data.pageSize,
        keywords:data.keywords,
        customerSource:data.customerSource,
        customerLevel:data.customerLevel,
        customerStatus:data.customerStatus,
        adminId:data.adminId,
        createTimeStart:data.createTimeStart,
        createTimeEnd:data.createTimeEnd
    }
  })
}

// 分页查询客户审核信息
export function getCustomerexamine (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser_audit/find_customer_audit_page.json',
    method: 'GET',
    params: {
      pageNum:data.current_page,
      pageSize:data.page_size,
      auditStatus:data.auditStatus?data.auditStatus:'',
      keywords:data.keywords,
      auditId: data.auditId
    }
  })
}

//为客户设置管理员并开启审核
export function customerAudit (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser_audit/customer_set_admin.json',
    method: 'POST',
    params: {
      adminId:data.adminId,
      auditId:data.auditId,
      customerId:data.customerId
    }
  })
}

// 新增客户
export function addCustomer (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/customer/add.json',
    method: 'POST',
    data: {
      customerName:data.customerName,  //客户名称
      customerSn:data.customerSn,   //客户编号
      sharedTo:data.sharedTo,   //共享
      customerWebsite:data.customerWebsite,  //公司网址
      sysuserAccount:data.sysuserAccount, //账号
      password:data.password, //密码
      province:data.province, //省
      city:data.city,   //市
      industryCategory:data.industryCategory,   //行业大类
      industrySubcategory:data.industrySubcategory,  //行业小类
      companyAddress:data.companyAddress,  //公司地址
      adminId:data.adminId, //销售管理员:
      businessType:data.businessType,  //客户类型
      customerLevel:data.customerLevel,  //客户等级
      intentionLevel:data.intentionLevel,    //客户意向
      customerSource:data.customerSource,    //客户来源
      salesRepresentative:data.salesRepresentative,   //销售代表
      customerPeriod:data. customerPeriod,  //周期
      commonContactName:data.commonContactName,  //联系人
      commonContactDept:data.commonContactDept,  //部门
      commonContactPhone:data.commonContactPhone,    //联系人手机
      commonContactTel:data.commonContactTel,    //办公电话
      commonContactWechat:data.commonContactWechat,   //微信
      commonContactEmail:data. commonContactEmail,  //邮箱
      commonContactQq:data.commonContactQq,  //QQ
      commonContactBirth:data.commonContactBirth,  //生日
      leaderContactName:data.leaderContactName,    //部门领导名字
      leaderContactPhone:data.leaderContactPhone,    //领导手机
      leaderContactTel:data.leaderContactTel,   //固定电话
      leaderSwitchboard:data.leaderSwitchboard,  //总机号码
      leaderContactWechat:data.leaderContactWechat,  //微信
      leaderContactEmail:data.leaderContactEmail,  //邮箱
      leaderContactQq:data.leaderContactQq,    //QQ
      leaderContactBirth:data.leaderContactBirth,    //生日
      leaderContactAddress:data.leaderContactAddress,   //联系地址
      leaderFamilyAddress:data. leaderFamilyAddress,   //家庭地址
      customerUnit:data.customerUnit,   //公司名称
      taxNumber:data.taxNumber,   //税号
      customerTel:data.customerTel,    //注册电话
      customerAddress:data.customerAddress,   //注册地址
      bankName:data.bankName,   //开户银行
      bankAccount:data.bankAccount,   //银行账号
      faxNumber:data.faxNumber,   //税号
      remark: data.remark,//备注
    }
  })
}

// 编辑客户
export function editCustomer (data,customerId) {
  return request({
    url: '/api/open/b/b2b2c/userservice/customer/edit.json',
    method: 'PUT',
    data: {
      customerId:customerId, //客户ID
      customerName:data.customerName,  //客户名称
      customerSn:data.customerSn,   //客户编号
      sharedTo:data.sharedTo,   //共享
      customerWebsite:data.customerWebsite,  //公司网址
      sysuserAccount:data.sysuserAccount, //账号
      adminId:data.adminId, //销售管理员:
      password:data.password, //密码
      province:data.province, //省
      city:data.city,   //市
      industryCategory:data.industryCategory,   //行业大类
      industrySubcategory:data.industrySubcategory,  //行业小类
      companyAddress:data.companyAddress,  //公司地址
      businessType:data.businessType,  //客户类型
      customerLevel:data.customerLevel ,  //客户等级
      intentionLevel:data.intentionLevel,    //客户意向
      customerSource:data.customerSource,    //客户来源
      salesRepresentative:data.salesRepresentative,   //销售代表
      customerPeriod:data.customerPeriod,  //周期
      commonContactName:data.commonContactName,  //联系人
      commonContactDept:data.commonContactDept,  //部门
      commonContactPhone:data.commonContactPhone,    //联系人手机
      commonContactTel:data.commonContactTel,    //办公电话
      commonContactWechat:data.commonContactWechat,   //微信
      commonContactEmail:data.commonContactEmail,  //邮箱
      commonContactQq:data.commonContactQq,  //QQ
      commonContactBirth:data.commonContactBirth,  //生日
      leaderContactName:data.leaderContactName,    //部门领导名字
      leaderContactPhone:data.leaderContactPhone,    //领导手机
      leaderContactTel:data.leaderContactTel,   //固定电话
      leaderSwitchboard:data.leaderSwitchboard,  //总机号码
      leaderContactWechat:data.leaderContactWechat,  //微信
      leaderContactEmail:data.leaderContactEmail,  //邮箱
      leaderContactQq:data.leaderContactQq,    //QQ
      leaderContactBirth:data.leaderContactBirth,    //生日
      leaderContactAddress:data.leaderContactAddress,   //联系地址
      leaderFamilyAddress:data.leaderFamilyAddress,   //家庭地址
      customerUnit:data.customerUnit,   //公司名称
      taxNumber:data.taxNumber,   //税号
      customerTel:data.customerTel,    //注册电话
      customerAddress:data.customerAddress,   //注册地址
      bankName:data.bankName,   //开户银行
      bankAccount:data.bankAccount,   //银行账号
      faxNumber:data.faxNumber,   //税号
      remark: data.remark,//备注
    }
  })
}

// 根据客户id删除客户
export function deleteCustomer (data) {
  return request({
    url: '/api/internal/b/b2b2c/userservice/customer/delete_by_id.json',
    method: 'DELETE',
    params: {
      agencyId:data.customerId,
      cancelReason:data.cancelReason
    }
  })
}
// 获取客户信息
export function obtainCustomer (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/customer/find_by_id.json',
    method: 'get',
    params: {
      customerId:data,
    }
  })
}

//获取行业大类可选参数
export function getindustryCategory (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/industryCategory/findList.json',
    method: 'GET',
    params: {industryLevel:data}
  })
}
//获取行业小类可选参数
export function getindustrySubcategory (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/dictionary/find_tree_by_prentId.json',
    method: 'GET',
    params: {
      parentId:data
    }
  })
}
//获取行业小类可选参数
export function changegetindustrySubcategory (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/industryCategory/findById.json',
    method: 'GET',
    params: {
      id:data
    }
  })
}
//获取省可选参数
export function getprovince (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/region/find_by_parent.json?parentId=1',
    method: 'GET',
    params: {}
  })
}
//获取城市可选参数
export function getcity (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/region/find_by_parent.json',
    method: 'GET',
    params: {
      parentId:data
    }
  })
}
//获取客户等级可选参数
export function getCustomerLevel (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/dictionary/find_tree_by_name.json?name=客户等级',
    method: 'GET',
    params: {}
  })
}
//获取客户意向可选参数
export function getintentionLevel (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/dictionary/find_tree_by_name.json?name=客户意向等级',
    method: 'GET',
    params: {}
  })
}
//获取客户来源可选参数
export function getCustomersoure (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/dictionary/find_tree_by_name.json?name=客户来源 ',
    method: 'GET',
    params: {}
  })
}
//获取客户经营类型可选参数
export function getbusinessType (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/dictionary/find_tree_by_name.json?name=客户经营类型',
    method: 'GET',
    params: {}
  })
}




// 根据客户ID查询客户详细信息
export function customerDetailByid (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/customer/find_info_by_id.json',
    method: 'GET',
    params: {
      customerId: data
    }
  })
}

//判断客户名称是否已存在
export function exitsCustomer (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/customer/exits_by_name.json',
    method: 'get',
    params: {
      customerName:data,
    }
  })
}

export function auditDelete(data) {
  return request({
    url:'/api/open/b/b2b2c/userservice/sysuser_audit/delete.json',
    method: 'delete',
    params:{
      auditId:data.auditId,
      remark:data.remark
    }
  })
}

//判断审核审核是否通过
export function customerToExamine (data){
  return request({
    url:'/api/open/b/b2b2c/userservice/sysuser_audit/edit_customer_audit.json',
    method: 'put',
    params:{
      auditId:data.auditId,
      auditStatus:data.auditStatus,
      customerId:data.customerId,
      taskId:data.taskId,
      verifyRemark:data.verifyRemark
    }
  })
}

//判断审核审核是否通过(企业)
export function customerToExamineCommpany (data){
  return request({
    url:'/api/open/b/b2b2c/userservice/purchasing/user/edit_audit.json',
    method: 'put',
    params:data
  })
}

//增加商机
export function addBusinessed (data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/bus_opp/save.json',
    method: 'POST',
    data:{
      boId:data.boId,
      boTitle:data.boTitle,
      customerId:data.customerId,
      contact:data.contact,
      tel:data.tel,
      winningRate:data.winningRate,
      boStage:data.boStage,
      customerType:data.customerType,
      nextTime:data.nextTime,
      expectTotalAmount:data.expectTotalAmount,
      expectCost:data.expectCost,
      expectOrderTime:data.expectOrderTime,
      description:data.description,
      competitor:data.competitor,
      primaryFactor:data.primaryFactor,
      trackingResults:data.trackingResults,
      remark:data.remark

    }
  })
}
//分页查询商机
export function getBusiness (data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/bus_opp/list.json',
    method: 'get',
    params: {
      pageIndex:data.currentPage,
      pageSize:data.size,
      startTime:data.startTime,
      endtime:data.endtime,
      keyword:data.keyword
    }
  })
}

//删除商机
export function deleteBusiness (data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/bus_opp/delete.json',
    method: 'DELETE',
    params: {
      boId:data
    }
  })
}


//商机详情
export function detailBusiness (data) {
  return request({
    url: '/api/open/b/b2b2c/erpservice/bus_opp/find_by_id.json',
    method: 'GET',
    params: {
      boId:data
    }
  })
}

//更新商机
export function updateBusinessed (data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/bus_opp/update.json',
    method: 'PUT',
    data:{
      boId:data.boId,
      boTitle:data.boTitle,
      customerId:data.customerId,
      contact:data.contact,
      tel:data.tel,
      winningRate:data.winningRate,
      boStage:data.boStage,
      customerType:data.customerType,
      nextTime:data.nextTime,
      expectTotalAmount:data.expectTotalAmount,
      expectCost:data.expectCost,
      expectOrderTime:data.expectOrderTime,
      description:data.description,
      competitor:data.competitor,
      primaryFactor:data.primaryFactor,
      trackingResults:data.trackingResults,
      remark:data.remark

    }
  })
}
//商机状态
export function getBusinessSeting(){
  return request({
    url:'/api/open/b/b2b2c/erpservice/bus_opp/find_setting.json',
    method:'GET',
    data:{}
  })
}

//查询邮件分页
export function getMail(data){
  return request({
    url:'/api/open/b/b2b2c/mqservice/mailMessage/find_by_page.json',
    method:'GET',
    params:{
      pageNum:data.pageNum,
      pageSize:data.pageSize
    }
  })
}


//邮件新增

export function addMail(data){
  return request({
    url:'/api/open/b/b2b2c/mqservice/mailMessage/save.json',
    method:'POST',
    data:{
      to:data.to,
      subject:data.subject,
      content:data.content,
      // mailSenderConfigId:data.mailSenderConfigId,
      cc:data.cc,
      bcc:data.bcc,
      attachments:data.attachments,
      mailSenderConfigId:data.mailSenderConfigId,
      nowSend:data.nowSend
    }
  })
}

//邮箱下拉
export function listMail(){
  return request({
    url:'/api/open/b/b2b2c/settingservice/mailSenderConfig/find_all_simple.json',
    method:'GET',
    data:{
    }
  })
}


//邮件删除

export function deleteMail(data){
  return request({
    url:"/api/open/b/b2b2c/mqservice/mailMessage/delete.json",
    method:'DELETE',
    params: {
      id:data
    }


  })
}



//查看邮件详情

export function detailMail(data){
  return request({
    url:"/api/open/b/b2b2c/mqservice/mailMessage/find.json",
    method:'GET',
    params: {
      id:data
    }
  })
}

//编辑邮件

export function editMail(data){
  return request({
    url:'/api/open/b/b2b2c/mqservice/mailMessage/update.json',
    method:'PUT',
    data:{
      to:data.to,
      subject:data.subject,
      content:data.content,
      // mailSenderConfigId:data.mailSenderConfigId,
      cc:data.cc,
      bcc:data.bcc,
      attachments:data.attachments,
      mailSenderConfigId:data.mailSenderConfigId,
      nowSend:data.nowSend,
      id:data.id
    }
  })
}

//

export function application(data){
  return request({
    url:'/api/open/b/b2b2c/userservice/customer/enabled_by_ids.json',
    method:'put',
    params:{
      customerIds:data.customerIds,
      enable:data.enable,
      cancelReason:data.cancelReason
    }
  })
}

//账户类型分页列表
export function accountType(obj){
    return request({
        url:'/api/open/b/b2b2c/userservice/accounttype/find_account_page.json',
        method:'POST',
        data:obj
    })
}
//新增/编辑 账户类型
export function addEditAccount(obj){
    return request({
        url:'/api/open/b/b2b2c/userservice/accounttype/save_account_type.json',
        method:'POST',
        data:obj
    })
}

//查看账户类型
export function viewAccount(accountId){
    return request({
        url:'/api/open/b/b2b2c/userservice/accounttype/find_account_type.json',
        method:'GET',
        params:{accountId}
    })
}
//修改账户类型状态
export function modifyStatus(data){
    return request({
        url:'/api/open/b/b2b2c/userservice/accounttype/edit_account_status.json',
        method:'GET',
        params:{
          accountId:data.accountId,
          type:data.type
        }
    })
}

//查询行业分类列表
export function queryIndustryList(data){
  return request({
      url:'/api/open/b/b2b2c/userservice/industryCategory/findList.json',
      method:'GET',
      params:{parentId:data}
  })
}

//根据id查询行业分类列表
export function queryIndustryDetail(data){
  return request({
      url:'/api/open/b/b2b2c/userservice/industryCategory/findList.json',
      method:'GET',
      params:{parentId: data}
  })
}

//根据ID查询单条记录
export function getidMenu(data){
  return request({
      url:'/api/open/b/b2b2c/userservice/industryCategory/findById.json',
      method:'GET',
      params:{ id: data}
  })
}

//短信发送分页
export function getSms(data){
  return request({
      url:'/api/open/b/b2b2c/mqservice/smsmessage/findByPage.json',
      method:'GET',
      params:data
  })
}

//短信详情
export function detailSms(data){
  return request({
      url:'/api/open/b/b2b2c/mqservice/smsmessage/findById.json',
      method:'GET',
      params:{id:data}
  })
}

//删除单条消息
export function deleteSms(data){
  return request({
      url:'/api/open/b/b2b2c/mqservice/smsmessage/deleteById.json',
      method:'DELETE',
      params:{id:data}
  })
}

//短信暂存草稿
export function saveSms(data){
  return request({
      url:'/api/open/b/b2b2c/mqservice/smsmessage/save.json',
      method:'POST',
      data:data
  })
}

//短信保存并发送
export function saveAndSendSms(data){
  return request({
      url:'/api/open/b/b2b2c/mqservice/smsmessage/saveAndSendSms.json',
      method:'POST',
      data:data
  })
}

//发送消息
export function sendAndSendSms(data){
  return request({
      url:'/api/open/b/b2b2c/mqservice/smsmessage/sendSMSMessage.json',
      method:'GET',
      params: {id:data}
  })
}

//获取用户信息
export function getUser(data){
  return request({
      url:'/api/open/b/b2b2c/userservice/sysuser/findByPage.json',
      method:'GET',
      params: data
  })
}

//编辑/创建短信信息
export function createOrUpdate(data){
  return request({
      url:'/api/open/b/b2b2c/mqservice/smsmessage/createOrUpdate.json',
      method:'PUT',
      data: data
  })
}

//分页查询审核记录
export function pagingQuery(data){
  return request({
      url:'/api/open/b/b2b2c/userservice/purchasing/user/find_audit.json',
      method:'POST',
      data: data
  })
}
