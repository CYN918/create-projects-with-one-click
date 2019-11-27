import request from '@/utils/request'

// ### 经销商合同及合同审核接口开始

// 上传扫描文件
export function upLoadScanFile (id, url) {
	return request({
		url: '/api/open/b/b2b2c/contentservice/agencyContract/upload_file.json',
		method: 'put',
		params: {
			id,
			url,
		},
	})
}

// 审核合同
export function examineContract (obj) {
	return request({
		url: '/api/open/b/b2b2c/contentservice/agencyContractAudit/edit_audit.json',
		method: 'put',
		params: {
			obj,
		},
	})
}

// 提交审核
export function submitToExamine (id) {
	return request({
		url: '/api/open/b/b2b2c/contentservice/agencyContract/start_audit.json',
		method: 'put',
		params: {
			id,
		},
	})
}

// 编辑合同
export function editContract (obj) {
	return request({
		url: '/api/open/b/b2b2c/contentservice/agencyContract/update.json',
		method: 'put',
		data: obj,
	})
}

// 新增合同之提交并审核
export function addContract (obj) {
	return request({
		url: '/api/open/b/b2b2c/contentservice/agencyContract/save_audit.json',
		method: 'post',
		data: obj,
	})
}

// 新增合同之保存至草稿
export function keepContract (obj) {
	return request({
		url: '/api/open/b/b2b2c/contentservice/agencyContract/save.json',
		method: 'post',
		data: obj,
	})
}

// 根据经销商名称(全匹配)获取经销商合同信息
export function reqContractInfoById (id) {
	return request({
		url: '/api/open/b/b2b2c/contentservice/agencyContract/find_by_id.json',
		method: 'get',
		params: {
			id, // 合同id
		}
	})
}

// 根据经销商名称(全匹配)获取经销商合同信息
export function reqContractInfoByName (agencyName) {
	return request({
		url: '/api/open/b/b2b2c/contentservice/agencyContract/find_by_agency_name.json',
		method: 'get',
		params: {
			agencyName, // 合同id
		}
	})
}

// 删除合同
export function deleteContract (id, reason) {
	return request({
		url: '/api/open/b/b2b2c/contentservice/agencyContract/delete.json',
		method: 'delete',
		params: {
			id, // 合同id
			reason, // 删除原因
		}
	})
}
// 取消合同
export function cancelContract (id, reason) {
	return request({
		url: '/api/open/b/b2b2c/contentservice/agencyContract/cancel.json',
		method: 'put',
		params: {
			id, // 合同id
			reason, // 原因
		}
	})
}
// 设置管理员
export function distributionAdmin(id, sysuserId) {
	return request({
		url: '/api/open/b/b2b2c/contentservice/agencyContract/set_admin.json',
		method: 'put',
		params: {
			id:id||'', // 合同id
			sysuserId:sysuserId||'', // 管理员
		}
	})
}

// 分页查询经销商合同
export function reqContractList (data = {}) {
	return request({
		url: '/api/open/b/b2b2c/contentservice/agencyContract/find_by_page.json',
		method: 'get',
		params: {
			address: data.address || '',
			id: data.id || null, // 不传查所有
			pageNum: data.pageNum || 1, //
			pageSize: data.pageSize || '',  // ，所有传0
			secondParty: data.secondParty, // 乙方名称
			signTimeEnd: data.signTimeEnd || null,
			signTimeStart: data.signTimeStart || null,
			status: data.status || null, // 归档合同传4
			telephone: data.telephone || null,

		}
	})
}
// ### 经销商合同及合同审核接口结束
export function agencyContractAuditDelete(data) {
	return request({
		url:'/api/open/b/b2b2c/contentservice/sysuser_audit/delete.json',
		method: 'delete',
		params:{
			auditId:data.auditId,
			remark:data.remark
		}
	})
}
export function agencyContractToExamine(data){
	return request({
		url: '/api/open/b/b2b2c/contentservice/agencyContractAudit/edit_audit.json',
		method: 'put',
		params: {
			auditId:data.auditId,
			auditStatus:data.auditStatus,//通过或者未通过 通过为1 不通过为2
			contractId:data.contractId,
			taskId:data.taskId,
			verifyRemark:data.verifyRemark,
		}
	})
}
//######经销商合同审核接口 lxy
export function getAgencyContractAudit(data={}) {
	return request({
		url: '/api/open/b/b2b2c/contentservice/agencyContractAudit/find_by_page.json',
		method: 'get',
		params: {...data}
	})
}
//######经销商合同审核接口 lxy


//分页查询经销商详情
export function dealerDetailByid (data,status) {
	return request({
		url: '/api/open/b/b2b2c/userservice/agency/find_info_by_id.json',
		method: 'GET',
		params: {
			agencyId:data
		}
	})
}

export function getStoreList (data) {
	return request({
		url: '/apply/store_list',
		method: 'get',
		params: data
	})
}

export function getStoreStyle (data) {
	return request({
		url: '/apply/store_style',
		method: 'get',
		params: data
	})
}

export function createStore (data) {
	return request({
		url: '/apply/store_create',
		method: 'get',
		params: data
	})
}

export function getStoreGoods (data) {
	return request({
		url: '/apply/store_goods',
		method: 'get',
		params: data
	})
}

export function copyStore (data) {
	return request({
		url: '/apply/copy_store',
		method: 'get',
		params: data
	})
}

// 获取 创建经销商
export function creatAgency(data){
	return request({
		url:'/api/open/b/b2b2c/userservice/agency/settled.json',
		method:'post',
		data:{
			agencyName:data.agencyName,//名称
			sysuserAccount:data.sysuserAccount,//账号
			password:data.password,//用户密码
			commonContactName:data.commonContactName, //联系人-名字
			commonContactTel:data.commonContactTel,//联系人-手机号
			commonContactPhone:data.commonContactPhone,//联系人-电话
			commonContactWechat:data.commonContactWechat,//联系人-微信
			commonContactEmail:data.commonContactEmail,//联系人-email
			website:data.website,//公司网站
			address:data.address,//公司地址
			adminId:data.adminId, //销售管理员:
			leaderContactName:data.leaderContactName,//经理-名字
			leaderContactTel:data.leaderContactTel,//经理-电话
			leaderContactPhone:data.leaderContactPhone,//经理-手机号
			leaderContactWechat:data.leaderContactWechat,//经理-微信
			leaderContactEmail:data.leaderContactEmail,//经理-email
			cashCompany:data.cashCompany,//提现公司名称
			cashBank:data.cashBank,//提现开户行
			cashAccount:data.cashAccount,//提现账号
			ticketCompany:data.ticketCompany,//开票信息-公司名称
			ticketBank:data.ticketBank,//开票信息-开户行
			ticketAccount:data.ticketAccount,//开票信息-开户账号
			ticketTax:data.ticketTax,//开票信息-税号
			ticketTel:data.ticketTel,//开票信息-电话
			ticketAddress:data.ticketAddress,//开票信息_地址
			businessLicense:data.businessLicense,//营业执照
			contract:data.contract,//协议合同
			licenseTimeStart:data.licenseTime[0],// 营业执照有效期开始
			licenseTimeEnd:data.licenseTime[1],// 营业执照有效期结束
			contractTimeStart:data.contractTime[0], //合同有效期
			contractTimeEnd:data.contractTime[1],
			divideMode:1, //分成方式 1固定比例2利润比例
			divideRatio:0, //分成比例(经销商得到的) 如0.5对应2:1，50%
		}
	})
}
// 编辑经销商
export function editAgency (data,agencyId) {
	return request({
		url: '/api/open/b/b2b2c/userservice/agency/edit.json',
		method: 'PUT',
		data: {
			agencyId:agencyId, //经销商ID
			agencyName:data.agencyName, //名称
			sysuserAccount:data.sysuserAccount,//账号
			password:data.password,//用户密码
			commonContactName:data.commonContactName, //联系人-名字
			commonContactTel:data.commonContactTel,//联系人-手机号
			adminId:data.adminId, //销售管理员:
			commonContactPhone:data.commonContactPhone,//联系人-电话
			commonContactWechat:data.commonContactWechat,//联系人-微信
			commonContactEmail:data.commonContactEmail,//联系人-email
			website:data.website,//公司网站
			address:data.address,//公司地址
			leaderContactName:data.leaderContactName,//经理-名字
			leaderContactTel:data.leaderContactTel,//经理-电话
			leaderContactPhone:data.leaderContactPhone,//经理-手机号
			leaderContactWechat:data.leaderContactWechat,//经理-微信
			leaderContactEmail:data.leaderContactEmail,//经理-email
			cashCompany:data.cashCompany,//提现公司名称
			cashBank:data.cashBank,//提现开户行
			cashAccount:data.cashAccount,//提现账号
			ticketCompany:data.ticketCompany,//开票信息-公司名称
			ticketBank:data.ticketBank,//开票信息-开户行
			ticketAccount:data.ticketAccount,//开票信息-开户账号
			ticketTax:data.ticketTax,//开票信息-税号
			ticketTel:data.ticketTel,//开票信息-电话
			ticketAddress:data.ticketAddress,//开票信息_地址
			businessLicense:data.businessLicense,//营业执照
			contract:data.contract,//协议合同
			licenseTimeStart:data.licenseTime[0],// 营业执照有效期开始
			licenseTimeEnd:data.licenseTime[1],// 营业执照有效期结束
			contractTimeStart:data.contractTime[0], //合同有效期
			contractTimeEnd:data.contractTime[1],
			divideMode:1, //分成方式 1固定比例2利润比例
			divideRatio:0, //分成比例(经销商得到的) 如0.5对应2:1，50%
		}
	})
}

// 根据经销商id删除经销商
export function deleteAgency (data) {
	return request({
		url: '/api/open/b/b2b2c/userservice/agency/delete_by_id.json',
		method: 'DELETE',
		params: {
			agencyId:data.agencyId,
			cancelReason:data.cancelReason
		}
	})
}

//为经销商设置管理员并开启审核
export function dealerReview(data){
	return request({
		url:'/api/open/b/b2b2c/userservice/sysuser_audit/agency_set_admin.json',
		method:'POST',
		params:{
			adminId:data.adminId,
			agencyId:data.agencyId,
			auditId:data.auditId,
		}
	})
}

// 分页查询经销商
export function getAgency(data,id){
	return request({
		url:'/api/open/b/b2b2c/userservice/agency/find_by_page.json',
		method:'GET',
		params:{
			pageNum:data.current_page,
			pageSize:data.page_size,
			keywords:data.keywords,
			createTimeBegin:data.createTimeBegin,
			applyId:id?id:data.applyId
		}
	})
}


// 分页查询经销商审核
export function getAgencyexamine (data) {
	return request({
		url: '/api/open/b/b2b2c/userservice/sysuser_audit/find_agency_audit_page.json',
		method: 'GET',
		params: {
			pageNum:data.current_page,
			pageSize:data.page_size || '',
			auditStatus:data.auditStatus?data.auditStatus:'',
			keywords:data.keywords,
			auditId: data.auditId
		}
	})
}

// 根据经销商ID查询经销商详细信息
export function dealerDetailByid1 (data,status) {
	return request({
		url: '/api/open/b/b2b2c/userservice/sysuser_audit/find_agency_audit_page.json',
		method: 'GET',
		params: {
			auditId: data,
			auditStatus:status
		}
	})
}




// 判断经销商名称是否存在
export function repeatAgency (data) {
	return request({
		url: '/api/open/b/b2b2c/userservice/agency/exits_by_name.json',
		method: 'get',
		params: {
			agencyName:data
		}
	})
}

// 分页查询(带用户名的简单数据)
export function getUserdata (data) {
	return request({
		url: '/api/open/b/b2b2c/userservice/sysuserSalesman/find_by_simple.json',
		method: 'get',
		params: {
			pageNum:1,
			pageSize:0
		}
	})
}

// 修改供应商审核信息
export function supplierToExamine(data){
	return request({
		url: '/api/open/b/b2b2c/userservice/sysuser_audit/edit_agency_audit.json',
		method: 'put',
		params: {
			auditId:data.auditId,
			auditStatus:data.auditStatus,
			agencyId:data.agencyId,
			taskId:data.taskId,
			verifyRemark:data.verifyRemark,
			state:data.state,//通过或者未通过 通过为1 不通过为2
		}
	})
}

//根据经销商名称(全匹配)获取经销商合同信息
export function contractInformation (agencyName) {
	return request({
		url: '/api/open/b/b2b2c/contentservice/agencyContract/find_by_agency_name.json',
		method: 'get',
		params:{agencyName}

	})
}
