
import request from '@/utils/request'

export function getAllapply(data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/apply/find_by_page.json',
    method: 'get',
    params: {
      pageNum: 1,
      pageSize: 0,
      ...data
    }
  })
}

//分页查询项目管理列表
export function getAlllist(data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/project/find_by_page.json',
    method: 'get',
    params: {
      applyId:data
    }
  })
}

//查询项目详情信息
export function getProjectById(projectId) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/project/find_by_id.json',
    method: 'get',
    params: {
      projectId: projectId
    }
  })
}

//查询项目模板
export function getAlltemplate(data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/projectTemplate/find_by_page.json',
    method: 'get',
    params: {
      pageNum: 1,
      pageSize: 0,
      applyId: data.applyId,
      projectType: data.projectType,
    }
  })
}

//新增项目
export function newProject(data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/project/save.json',
    method: 'post',
    data: data
  })
}

//获取详细信息
export function getfindByid(data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/projectTemplate/find_by_id.json',
    method: 'GET',
    params: {
      projectTemplateId: data
    }
  })
}

//通过名字查询字典树数据
export function getNameData(data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/dictionary/find_tree_by_name.json',
    method: 'GET',
    params: {
      name: data
    }
  })
}

//修改项目上下线状态
export function editProjectStatus(projectId, ststus) {
  return request({
    url: "/api/open/b/b2b2c/projectservice/project/edit_status.json",
    method: "PUT",
    params: {
      projectId: projectId,
      status: ststus
    }
  })
}

//获取详细信息
export function projectfindinfobyid(projectId) {
  return request({
    url: "/api/open/b/b2b2c/projectservice/project/find_info_by_id.json?projectId="+projectId,
    method: "GET",
  })
}

//上线/下线项目
export function projecteditstatus(data) {
  return request({
    url: "/api/open/b/b2b2c/projectservice/project/edit_status.json",
    method: "PUT",
    params: {
      projectId: data.projectId,
      status: data.status,
      reason: data.reason,
    }
  })
}

//构建项目客户的登陆Token (用于经销商登陆项目后台)
export function generatecustomertoken(projectId) {
  return request({
    url: "/api/open/b/b2b2c/userservice/agency/generate_customer_token.json",
    method: "POST",
    params: {
      projectId: projectId
    }
  })
}

//查询全部的省市
export function findallcity() {
  return request({
    url: "/api/open/b/b2b2c/userservice/region/find_all_city.json",
    method: "get",
    params: {}
  })
}

//修改项目
export function projectupdate(data) {
  return request({
    url: "/api/open/b/b2b2c/projectservice/project/update.json",
    method: "PUT",
    data: data
  })
}