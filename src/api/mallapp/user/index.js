import request from '@/utils/request'

export function getUserStatistics (projectId) {
  return request({
    url: '/api/open/b/b2b2c/userservice/user/find_user_statistics.json',
    method: 'GET',
    params: {
      projectId
    }
  })
}

// 分页获取用户列表
export function getUserList (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/user/find_page.json',
    method: 'get',
    params: data
  })
}

// 分页获取用户列表(分组)
export function getUserListSig (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/group/findGroupRelationByPage.json',
    method: 'GET',
    params: data
  })
}

// 获取用户分组
export function getUserGroup (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/group/findByList.json',
    method: 'GET',
    params: data
  })
}

// 添加用户群组
export function addUserGroup (obj) {
  return request({
    url: '/api/open/b/b2b2c/userservice/group/save.json',
    method: 'POST',
    params: {
      ...obj
    }
  })
}

// 删除分组
export function removeGroupUser (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/group/deleteById.json',
    method: 'DELETE',
    params:  data
  })
}


//添加分组用户
export function addGroupUser (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/group/addGroupRelations.json',
    method: 'POST',
    data
  })
}

// 设置用户群组
export function editiUserGroup (data) {
  return request({
    url: '/muser/user_group_edit',
    method: 'get',
    params: data
  })
}

// 用户批量禁用，启用
export function editBatchUser (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/user/edit_status.json',
    method: 'PUT',
    params:  data
  })
}

// 单个用户编辑
export function editUserItem (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/user/edit.json',
    method: 'PUT',
    data: data
  })
}

// 获取用户基础信息
export function getUserdetail (userId) {
  return request({
    url: '/api/open/b/b2b2c/userservice/user/find_info_by_id.json',
    method: 'get',
    params: {
      userId
    }
  })
}

// 获取用户余额变动明细
export function getBalanceChangeDetail (userId) {
  return request({
    url: '/api/open/b/b2b2c/userservice/user/find_money_by_userId.json',
    method: 'get',
    params: {
      userId
    }
  })
}

// 创建用户
export function addUser (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/user/save.json',
    method: 'POST',
    header: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    },
    data:data
  })
}

//通过模板批量导入会员用户
export function ImportUser (file) {
  return request({
    url: '/api/open/b/b2b2c/userservice/user_import/import_users.json',
    method: 'POST',
    header: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    },
    data: file
  })
}
//根据用户导入ID查询详细信息
export function searchInformation() {
  return request({
    url: '/api/open/b/b2b2c/userservice/user_import/find_by_id.json',
    method:'GET'
  })
}

//分页查询用户导入记录
export function PagingImport(data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/user_import/find_page.json',
    method:'GET',
    params:data

  })
}

//审核用户导入操作
export function reviewUser(obj) {
  return request({
    url: '/api/open/b/b2b2c/userservice/user_import/audit_user_import.json',
    method:'PUT',
    params:obj
  })
}


