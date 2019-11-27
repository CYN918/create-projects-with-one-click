import request from '@/utils/request'


//获取列表
export function getList (data) {
  return request({
    url: '/api/open/b/b2b2c/contentservice/privilege/find_page_by_items.json',
    method: 'POST',
    data: data
  })
}

//获取详情
export function getDetailbyId (data) {
  return request({
    url: '/api/open/b/b2b2c/contentservice/privilege/find_one_by_id.json',
    method: 'get',
    params: {id:data}
  })
}

//删除
export function deletbyId (data) {
  return request({
    url: '/api/open/b/b2b2c/contentservice/privilege/delete_by_id.json',
    method: 'DELETE',
    params: {id:data}
  })
}

//修改
export function update(data) {
  return request({
    url: '/api/open/b/b2b2c/contentservice/privilege/update_privilege.json',
    method: 'PUT',
    data: data
  })
}

//新增
export function newAdd (data) {
  return request({
    url: '/api/open/b/b2b2c/contentservice/privilege/save_new_privilege.json',
    method: 'POST',
    data: data
  })
}
