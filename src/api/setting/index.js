import request from '@/utils/request'

//新增合同公司，开票客户

export function addContract(data) {
    return request({
        url: '/api/open/b/b2b2c/erpservice/contract_company/save.json',
        method: 'post',
        data: {
            sccCompanyName: data.companyName,//公司名称
            sccContacts: data.companyContact,//公司联系人
            sccTelephone: data.registeredTel,//注册电话
            sccMobile: data.companyPhone,//手机号码
            sccFax: data.fax,//传真
            sccEmail: data.companyEmail,//邮箱
            sccAddress: data.companyAddress,//地址
            bizType: data.bizType,//类型
            sccInvoiceRise: data.invoiceRise,//发票抬头
            sccTaxNum: data.taxpayer,//纳税识别号
            bankAccount: data.bankAccount,//银行账号
            bankName: data.OpeningBank


        }
    })
}

// 、分页查询合同公司列表/开票客户列表
export function getContract(data) {
    return request({
        url: '/api/open/b/b2b2c/erpservice/contract_company/findPageList.json',
        method: 'get',
        params: {
            bizType: data.bizType,
            pageSize: data.pageSize,
            pageIndex: data.pageIndex,
            sccCompanyName: data.sccCompanyName,
            sccContacts: data.sccContacts,
            sccEmail: data.sccEmail,
            sccMobile: data.sccMobile,
            sccTelephone:data.sccTelephone,
            sccInvoiceRise: data.sccInvoiceRise,
            bankAccount: data.bankAccount
        }
    })
}

//根据id获取合同公司/开票客户
export function findContract(data) {
    return request({
        url: '/api/open/b/b2b2c/erpservice/contract_company/find_by_sccId.json',
        method: 'get',
        params: {
            sccId: data
        }
    })
}

//修改合同公司/开票客户
export function editContract(data) {
    return request({
        url: '/api/open/b/b2b2c/erpservice/contract_company/update.json',
        method: 'put',
        data: {
            bankAccount: data.bankAccount,
            bankName: data.bankName,
            bizType: data.bizType,
            sccAddress: data.sccAddress,
            sccCompanyName: data.sccCompanyName,
            sccContacts: data.sccContacts,
            sccEmail: data.sccEmail,
            sccFax: data.sccFax,
            sccId: data.sccId,
            sccInvoiceRise: data.sccInvoiceRise,
            sccMobile: data.sccMobile,
            sccTaxNum: data.sccTaxNum,
            sccTelephone: data.sccTelephone
        }
    })
}

//根据id删除合同公司/开票客户
export function deleteContract(data) {
    return request({
        url: '/api/open/b/b2b2c/erpservice/contract_company/delete_by_sccId.json',
        method: 'delete',
        params: {
            sccId: data
        }
    })
}

// 个人中心
//根据id获取当前用户数据
export function getSysuserByid(data) {
    return request({
        url: '/api/open/b/b2b2c/userservice/sysuser/find_by_id.json',
        method: 'get',
        params: {
            sysuserId: data
        }
    })
}
//根据id获取当前用户数据
export function getRoleByid(data) {
    return request({
        url: '/api/open/b/b2b2c/userservice/sysuser/find_by_id.json',
        method: 'get',
        params: {
            sysuserId: data
        }
    })
}

//修改用户信息
export function submitData(data) {
    return request({
        url: '/api/open/b/b2b2c/userservice/sysuser/edit.json',
        method: 'PUT',
        data: {
            sysuserId: data.sysuserId,
            headImgUrl: data.headImgUrl, // 图片
            sysuserName: data.sysuserName,//昵称
            sex: data.sex, // 性别：1.男，2.女
            birthday: data.birthday, // 生日
            company: data.company,
            idCard: data.idCard,
            realName: data.realName,
            position: data.position,
            telephone: data.telephone,
            email: data.email,
        }
        // data:data
    })
}
