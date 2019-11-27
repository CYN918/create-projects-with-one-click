import request from '@/utils/request'
import { distrImportUrl } from '@/api/mallapp/config'

// 获取 移动审批 审批人登录网址
export function getApprovalLink (data) {
  return request({
    url: '/mplugin/approval_link',
    method: 'get'
  })
}

// 获取 移动审批 审批人管理
export function getApprovalList (data) {
  return request({
    url: '/mplugin/approval_list',
    method: 'get',
    params: data
  })
}

// 获取 移动审批 关联网点
export function getQuota () {
  return request({
    url: '/mplugin/approval_quota',
    method: 'get'
  })
}

// 获取 移动审批 关联网点
export function editQuota (data) {
  return request({
    url: '/mplugin/approval_quota_edit',
    method: 'get',
    params: data
  })
}

// 编辑 移动审批 业务员
export function editApproval (data) {
  return request({
    url: '/mplugin/approval_edit',
    method: 'get',
    params: data
  })
}

// 导入 审批关系
export function importApproval () {
  return `${distrImportUrl}/mplugin/approval/approvalimport`
}

// 设置 审批类型
export function setType (data) {
  return request({
    url: '/mplugin/approval_type',
    method: 'get',
    params: data
  })
}

// 设置 关联网点
export function setQuota (data) {
  return request({
    url: '/mplugin/approval_quota_batch',
    method: 'get',
    params: data
  })
}

// 获取 审批记录列表
export function getRecordList (data) {
  return request({
    url: '/mplugin/approval_record_list',
    method: 'get',
    params: data
  })
}

// 获取 审批记录列表
export function getQuotaList (data) {
  return request({
    url: '/mplugin/approval_quota_list',
    method: 'get',
    params: data
  })
}

// 修改 网点 额度
export function editQuotaAmount (data) {
  return request({
    url: '/mplugin/approval_quota_amount',
    method: 'get',
    params: data
  })
}

// 获取 网点额度变更记录
export function getQuotaLogList (data) {
  return request({
    url: '/mplugin/approval_quota_log',
    method: 'get',
    params: data
  })
}

// importQuotaBatch
export function importQuotaBatch () {
  return `${distrImportUrl}/mplugin/approval/quota_import`
}

// 获取 网点额度 批量 变更记录
export function getQuotaBatchLogList (data) {
  return request({
    url: '/mplugin/approval_quota_batch_log',
    method: 'get',
    params: data
  })
}
