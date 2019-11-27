import request from '@/utils/request'

export function getStoreManageList (data) {
  return request({
    url: '/finance/store_manage',
    method: 'get',
    params: data
  })
}

export function getCashMoneyDesc () {
  return request({
    url: '/finance/store_cash',
    method: 'get'
  })
}

export function editDepositeMoney (data) {
  return request({
    url: '/finance/store_deposite',
    method: 'get',
    params: data
  })
}

export function offlinePush (data) {
  return request({
    url: '/finance/offline_push',
    method: 'get',
    params: data
  })
}

//分页查询资金账户信息列表
export function findAccountList (data) {
  return request({
    url: '/api/open/b/b2b2c/financeservice/account_info/findPageList.json',
    method: 'get',
    params: {
      accNo:data.accNo, //编号/代码
      accountCompName:data.accountCompName,//公司名称
      accountNickName:data.accountNickName,//资金账户/别名
      updateUserName:data.updateUserName,//创建人/用户名称
      pageIndex:data.pageIndex,//
      pageSize:data.pageSize,
    }
  })
}