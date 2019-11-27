import request from '@/utils/request'

//组织架构查询
export function getOrganizational (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/organize/find_by_page.json',
    method: 'get',
    params: {
      organizeName:data.content,
      pageNum:data.currentPage,
      pageSize:data.size,
    }
  })
}

//获取所有的父节点及关联的子节点
export function getAllOrganizational (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/organize/get_parent_and_child_node.json',
    method: 'get',
    params: {}
  })
}

//新增组织架构
export function addOrganizational (data) {
  console.log(data)
  return request({
    url: '/api/open/b/b2b2c/userservice/organize/save.json',
    method: 'POST',
    data: {
      organizeName:data.organizeName,
      parentId:data.parentId,
      description:data.description,
      isRootNode:true
    }
  })
}

//根据id查询组织架构信息
export function getidOrganizational (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/organize/find_by_id.json',
    method: 'GET',
    params: {
      organizeId:data,
    }
  })
}

//更新组织架构信息
export function editorOrganizational (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/organize/update.json',
    method: 'PUT',
    data: {
      organizeName:data.organizeName,
      description:data.description,
      organizeId:data.organizeId,
      parentId:data.parentId
    }
  })
}

//根据id删除组织架构信息
export function deleteOrganizational (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/organize/delete.json',
    method: 'DELETE',
    params: {
      organizeId:data
    }
  })
}



//获取所有角色信息
export function getRole (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/role/find_by_page.json',
    method: 'GET',
    params: {
      pageNum:data.currentPage,
      pageSize:data.size,
      roleName:data.serch
    }
  })
}

//添加角色信息
export function addRole (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/role/save.json',
    method: 'POST',
    data: {
      roleName:data.roleName,
      organizeId:data.organizeId,
      description:data.description,
    }
  })
}

//根据角色id查询角色信息
export function getidRole (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/role/find_by_id.json',
    method: 'GET',
    params: {
      roleId:data
    }
  })
}

//更新角色信息
export function editorRole (data,id) {
  return request({
    url: '/api/open/b/b2b2c/userservice/role/update.json',
    method: 'PUT',
    data: {
      roleId: id,
      ...data
    }
  })
}

//根据id删除角色信息
export function deleteRole (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/role/delete.json',
    method: 'DELETE',
    params: {
      roleId:data
    }
  })
}




// 菜单分页查询
export function getMenu (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/menu/find_by_page.json',
    method: 'GET',
    params: {
      pageNum:data.currentPage,
      pageSize:data.size,
      parentId:data.parentId==1?0:data.parentId,
      menuName:data.menuName
    }
  })
}

// 获取所有菜单信息
export function getAllMenu (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/menu/find_all.json',
    method: 'GET',
    params: {}
  })
}

// 根据id查询菜单信息
export function getidMenu (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/menu/find_by_id.json',
    method: 'GET',
    params: {
      menuId:data,
    }
  })
}

// 添加菜单信息
export function addMune (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/menu/save.json',
    method: 'POST',
    data: {
      ...data,
      roleIds: data.roles,
      roles: null
    }
  })
}

// 更新菜单信息
export function editorMune (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/menu/update.json',
    method: 'PUT',
    data:data
  })
}

// 根据id查询菜单信息
export function getIdMune (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/menu/find_by_id.json',
    method: 'GET',
    params:{
      menuId:data
    }
  })
}

// 根据id查询菜单信息
export function deletedMenu (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/menu/delete.json',
    method: 'DELETE',
    params:{
      menuId:data
    }
  })
}

// 用户授权
export function userAuthorization (sysuserId, menuIds) {
  return request({
    url: '/api/open/b/b2b2c/userservice/authority/authorization.json',
    method: 'POST',
    params: {
      sysuserId:sysuserId
    },
    data: menuIds
  })
}

export function findSysuserAuthority(sysuserId) {
  return request({
    url: '/api/open/b/b2b2c/userservice/authority/find_by_sysuser_id.json',
    method: 'GET',
    params: {
      sysuserId: sysuserId
    }
  })
}

export function findSysuserRole(sysuserId) {
  return request({
    url: '/api/open/b/b2b2c/userservice/role/find_by_sysuser_id.json',
    method: 'GET',
    params: {
      sysuserId: sysuserId
    }
  })
}

//删除B端后台用户
export function deleterSysuserId (sysuserId) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser/delete.json',
    method: 'DELETE',
    params: {
      sysuserId:sysuserId,
    }
  })
}

//查询单个用户详情
export function getSysuserById (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser/find_by_id.json',
    method: 'GET',
    params: {
      sysuserId:data,
    }
  })
}


//用户管理查询单个用户详情
export function getSysuserByIdList (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser/find_info_by_id.json',
    method: 'GET',
    params: {
      sysuserId:data,
    }
  })
}

//修改用户信息
export function ediotSysuserById (data,id) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser/edit.json',
    method: 'PUT',
    data: {
      sysuserAccount: data.sysuserAccount, //登录账户
      password:data.password, //密码
      sysuserName:data.sysuserName, //用户名
      roleIds:data.roles||[], //角色权限
      sortOrder:data.sortOrder, //排序
      realName:data.realName, //真实姓名
      sex:data.sex, //性别
      company:data.company,//所在公司
      organizeId:data.organizeId, //所在部门
      telephone:data.telephone, //电话
      title:data.position, //职称
      positionId:data.positionId, //职位
      email:data.email, //邮箱
      qq:data.qq, //qq
      birthday:data.birthday, //出生年月
      idCard:data.idCard, //身份证
      hireTime:data.hireTime, //入职时间
      educationalLevel:data.educationalLevel, //学历
      maritalStatus:data.maritalStatus, //婚姻状态
      graduatedFrom:data.graduatedFrom, //毕业院校
      status: data.status, //状态
      sysuserId:id, //后台用户ID
      oldPassword: data.oldPassword,//旧的密码
      employeeSn: data.employeeSn  //员工工号
    }
  })
}

// 分页获取后台用户信息
export function getUserPage (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser/findByPage.json',
    method: 'GET',
    params: {
      pageNum:data.pageNum,
      pageSize:data.pageSize,
      keywords:data.keywords,
      organizeIds: data.organizeIds,
      roleId:data.roleId,
      sysuserType:data.sysuserType
    }
  })
}
// 新建客户共享给 用户列表
export function toUserList (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/customer/user_page.json',
    method: 'GET',
    params: {
      pageNum:data.pageNum,
      pageSize:data.pageSize,
    }
  })
}

// 分页获取后台用户信息
export function getAdminUserPage (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser/findByPage.json',
    method: 'GET',
    params: {
      pageNum:data.current_page,
      pageSize:data.pageSize,
      keywords:data.keywords,
      sysuserType:0,
    }
  })
}

// 新增保存用户
export function addUser (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser/save.json',
    method: 'POST',
    data: {
      sysuserAccount: data.sysuserAccount, //登录账户
      password:data.password, //密码
      sysuserName:data.sysuserName, //用户名
      roleIds:data.roles, //角色权限
      sortOrder:data.sortOrder, //排序
      realName:data.realName, //真实姓名
      sex:data.sex, //性别
      company:data.company,//所在公司
      organizeId:data.organizeId, //所在部门
      telephone:data.telephone, //电话
      title:data.position, //职称
      positionId:data.positionId, //职位
      email:data.email, //邮箱
      qq:data.qq, //qq
      birthday:data.birthday, //出生年月
      idCard:data.idCard, //身份证
      hireTime:data.hireTime, //入职时间
      educationalLevel:data.educationalLevel, //学历
      maritalStatus:data.maritalStatus, //婚姻状态
      graduatedFrom:data.graduatedFrom, //毕业院校
      status: data.status, //状态
    }
  })
}

// 根据后台用户id获取角色信息
export function getSysuerId (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/role/find_by_sysuser_id.json',
    method: 'GET',
    params: {
      sysuserId:data
    }
  })
}

// 获取所有角色信息
export function getAllSysuer (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/role/find_all.json',
    method: 'GET',
    params: {}
  })
}

// 关联角色
export function associatedSyser (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysUserRoleRelation/relation_role.json',
    method: 'POST',
    params: {
      sysuserId:data.sysuserId,
      roleIds:data.roleIds
    }
  })
}



//通过模板批量导入后台用户
export function ImportSysuser (file) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser/import_users.json',
    method: 'POST',
    header: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    },
    data: file
  })
}


// 获取要关联的用户
export function getAlluser (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/role/to_relation_user.json',
    method: 'GET',
    params: {
      roleId:data,
    }
  })
}

// 获取要关联的用户
export function saveAssociateduser (data,userIds) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysUserRoleRelation/relation_user.json',
    method: 'POST',
    params: {
      roleId:data,
      userIds:userIds
    }
  })
}

// 根据parentId获取子节点组织架构列表信息
export function getchildnode (parentId) {
  return request({
    url: '/api/open/b/b2b2c/userservice/organize/get_child_node.json',
    method: 'GET',
    params: {
      parentId:parentId,
    }
  })
}
//获取所有组织架构信息
// 根据parentId获取子节点组织架构列表信息
export function getOrganizationList () {
  return request({
    url: '/api/open/b/b2b2c/userservice/organize/get_parent_and_child_node.json',
    method: 'GET',
  })
}

// 根据parentId获取子节点组织架构列表信息
export function getOrganizationListandCount () {
  return request({
    url: '/api/open/b/b2b2c/userservice/organize/get_tree_and_count.json',
    method: 'GET',
  })
}

//查询系统用户集合信息，排除已选的采销员
export function getSysuserBuyer (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser_buyer/findSysUserList.json',
    method: 'GET',
    params: {
      pageSize:data.pageSize,
      pageNum:data.pageNum
    }
  })
}

//B端后台用户所有菜单
export function currentMenuTree (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser/currentMenuTree.json',
    method: 'POST',
    params: {}
  })
}

//查询系统用户集合信息，排除已选的采销员
export function getSalesman (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuserSalesman/findSysUserList.json',
    method: 'GET',
    params: {
      pageSize:data.pageSize,
      pageNum:data.pageNum
    }
  })
}

//获取根节点对象
export function getrootnode (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/organize/get_root_node.json',
    method: 'GET',
    params: {}
  })
}

// 用户管理搜索部门
export function getAllOrganizationalSearch () {
  return request({
    url: '/api/open/b/b2b2c/userservice/organize/get_tree_and_count.json',
    method: 'GET'
  })
}

//分页查询C端用户信息
export function searchUser(data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/user/find_page.json',
    method: 'GET',
    params: data
  })
}

// 获取职位列表
export function getPositionList (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/position/find_by_page.json',
    method: 'GET',
    params: data
  })
}

// 获取上级
export function getParent (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/position/get_all_parent_and_child_node.json',
    method: 'GET',
    params: data
  })
}

// 添加职位
export function addPosition (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/position/save.json',
    method: 'POST',
    data
  })
}

// 编辑职位
export function updatePosition (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/position/update.json',
    method: 'PUT',
    data
  })
}

// 编辑获取职位信息
export function getPositionInfo (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/position/find_by_id.json',
    method: 'GET',
    params:data
  })
}

// 删除职位
export function removePosition (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/position/delete.json',
    method: 'DELETE',
    params:data
  })
}

// 锁定用户
export function lockUser (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser/lock_account.json',
    method: 'PUT',
    params:data
  })
}


// 解锁用户
export function unlockUser (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/sysuser/unlock_account.json',
    method: 'PUT',
    params:data
  })
}
