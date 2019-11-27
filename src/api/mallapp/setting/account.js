import request from '@/utils/request'

export function getAccountList (data) {
  return request({
    url: '/msetting/account_list',
    method: 'get',
    params: data
  })
}

// 获取单个用户信息
export function getAccountdetail (id) {
  return request({
    url: '/msetting/account_get',
    method: 'get',
    params: {
      account_id: id
    }
  })
}

// 编辑单个用户信息 、新增 用户
export function editAccountdetail (id) {
  return request({
    url: '/msetting/account_edit',
    method: 'get',
    params: {
      account_id: id
    }
  })
}

// 用户状态更改
export function accountChangeState (id) {
  return request({
    url: 'msetting/account_change_state',
    method: 'get',
    params: {
      account_id: id
    }
  })
}

// 删除用户
export function deleteAccount (id) {
  return request({
    url: 'msetting/account_delete',
    method: 'get',
    params: {
      account_id: id
    }
  })
}

// 获取log记录
export function getLogList (data) {
  return request({
    url: 'msetting/log_list',
    method: 'get',
    params: data
  })
}

// 获取角色权列表
export function getRoleList (data) {
  return request({
    url: 'msetting/role_list',
    method: 'get',
    params: data
  })
}

// 删除角色
export function roleDelete (id) {
  return request({
    url: 'msetting/role_delete',
    method: 'get',
    params: {
      role_id: id
    }
  })
}
