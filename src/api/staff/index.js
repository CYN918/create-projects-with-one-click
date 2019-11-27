import request from '@/utils/request'

// 获取员工群组列表
export function getUserGroup () {
  return request({
    url: '/staff/user_group',
    method: 'get'
  })
}

// 获取员工列表
export function getUserList (data) {
  return request({
    url: '/staff/user_list',
    method: 'get',
    params: data
  })
}

// 添加员工群组
export function addUserGroup (name) {
  return request({
    url: '/staff/user_group_add',
    method: 'get',
    params: {
      name
    }
  })
}

// 设置员工群组
export function editiUserGroup (data) {
  return request({
    url: '/staff/user_group_edit',
    method: 'get',
    params: data
  })
}

// 员工批量禁用，启用
export function editBatchUser (data) {
  return request({
    url: '/staff/user_batch_edit',
    method: 'get',
    params: data
  })
}

// 单个新增、编辑员工
export function editAccountdetail (data) {
  return request({
    url: '/staff/user_edit',
    method: 'get',
    params: data
  })
}

// 获取角色权列表
export function getRoleList (data) {
  return request({
    url: '/staff/role_list',
    method: 'get',
    params: data
  })
}

// 删除角色
export function roleDelete (id) {
  return request({
    url: '/staff/role_delete',
    method: 'get',
    params: {
      role_id: id
    }
  })
}

// 获取log记录
export function getLogList (data) {
  return request({
    url: '/staff/log_list',
    method: 'get',
    params: data
  })
}
