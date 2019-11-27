import request from '@/utils/request'
import { distrImportUrl } from '@/api/mallapp/config'

// 获取分发列表
export function getDistributeList (data) {
  return request({
    url: '/mplugin/distribute_list',
    method: 'get',
    params: data
  })
}

// 获取用户列表
export function getUserList (keyword) {
  return request({
    url: '/mplugin/distribute/user_list',
    method: 'get',
    params: {
      keyword
    }
  })
}

// 增加分发
export function addDistr (data) {
  return request({
    url: '/mplugin/distribute/add_distr',
    method: 'get',
    params: data
  })
}

// 通过表格导入增加分发
export function addImportDistr (data) {
  return new Promise(resolve => {
    resolve(`${distrImportUrl}/mplugin/distribute/add_import_distr?message=${data.message}&remark=${data.remark}`)
  })
}

// 获取详情记录
export function getDistributeLog (data) {
  return request({
    url: '/mplugin/distribute/distribute_log',
    method: 'get',
    params: data
  })
}
