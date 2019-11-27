import request from '@/utils/request'
import { distrImportUrl } from '@/api/mallapp/config'

// 获取 移动充值功能设置
export function getRechargeFunction () {
  return request({
    url: '/mplugin/recharge/function_get',
    method: 'get'
  })
}

// 更改 移动充值功能设置
export function changeRechargeFunction (value) {
  return request({
    url: '/mplugin/recharge/function_edit',
    method: 'get',
    params: {
      value
    }
  })
}

// 获取 移动充值 用户列表
export function getUserList (data) {
  return request({
    url: '/mplugin/recharge/user_list',
    method: 'get',
    params: data
  })
}

// 获取 移动充值 用户分组列表
export function getUserGroupList (data) {
  return request({
    url: '/mplugin/recharge/group_list',
    method: 'get',
    params: data
  })
}

// 新增|编辑 用户分组
export function editUserGroup (data) {
  return request({
    url: '/mplugin/recharge/group_edit',
    method: 'get',
    params: data
  })
}

// 批量设置 用户分组
export function batchEditUserGroup (data) {
  return request({
    url: '/mplugin/recharge/group_batch_edit',
    method: 'get',
    params: data
  })
}

// 批量设置 权限
export function batchEditPermission (data) {
  return request({
    url: '/mplugin/recharge/user_batch_permisison',
    method: 'get',
    params: data
  })
}

// 添加/编辑 业务员
export function editSalesman (data) {
  return request({
    url: '/mplugin/recharge/salesman_edit',
    method: 'get',
    params: data
  })
}

// 导入 业务员
export function importSalesman (data) {
  return `${distrImportUrl}/mplugin/recharge/salesman_import`
}

// 导入 审批关系
export function importApprove (data) {
  return `${distrImportUrl}/mplugin/recharge/approve_import`
}

// 获取 业务员信息
export function getUserInfo (id) {
  return request({
    url: '/mplugin/recharge/salesman_info',
    method: 'get',
    params: {
      id
    }
  })
}

// 获取 表单设置信息
export function getFormInfo () {
  return request({
    url: '/mplugin/recharge/form_info',
    method: 'get'
  })
}

// 设置 表单信息
export function setFormInfo (data) {
  return request({
    url: '/mplugin/recharge/form_info_set',
    method: 'get',
    params: data
  })
}

// 获取 充值记录/充值明细
export function getRechargeLog (data) {
  return request({
    url: '/mplugin/recharge/recharge_list',
    method: 'get',
    params: data
  })
}
// 获取 充值记录/充值统计
export function getRechargeStatistics (data) {
  return request({
    url: '/mplugin/recharge/recharge_statistics',
    method: 'get',
    params: data
  })
}

// 获取 更多设置
export function getSettingInfo () {
  return request({
    url: '/mplugin/recharge/recharge_setting',
    method: 'get'
  })
}

// 设置 更多设置
export function editSettingInfo (data) {
  return request({
    url: '/mplugin/recharge/recharge_setting_edit',
    method: 'get',
    params: data
  })
}
