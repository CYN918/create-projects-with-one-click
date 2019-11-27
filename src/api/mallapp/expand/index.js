import request from '@/utils/request'

// 获取 拓展字段列表
export function expandlList (data) {
    return request({
      url: '/api/open/b/b2b2c/orderservice/extendfield/find_by_page.json',
      method: 'GET',
      params: data
    })
  }

// 新增 拓展字段
export function expandlSave (data) {
    return request({
      url: '/api/open/b/b2b2c/orderservice/extendfield/save.json',
      method: 'POST',
      data
    })
  }


// 更新 拓展字段
export function expandlUpdate (data) {
    return request({
      url: '/api/open/b/b2b2c/orderservice/extendfield/update.json',
      method: 'PUT',
      data
    })
  }

// 获取 拓展字段详情
export function expandlObtain (data) {
    return request({
      url: '/api/open/b/b2b2c/orderservice/extendfield/find_by_id.json',
      method: 'GET',
      params: {fieldId:data}
    })
  }


// 删除 拓展字段
export function expandlDelete (data) {
    return request({
      url: '/api/open/b/b2b2c/orderservice/extendfield/delete.json',
      method: 'DELETE',
      params: {fieldId:data}
    })
  }