import request from '@/utils/request'


//获取公告列表
export function productPush (data) {
  return request({
    url: '/api/open/b/b2b2c/contentservice/notification/findPage.json',
    method: 'get',
    params: data
  })
}

//获取公告详情
export function announcementDetail (data) {
  return request({
    url: '/api/open/p/b2b2c/contentservice/notification/findById.json',
    method: 'get',
    params: {id:data}
  })
}

//删除公告
export function announcementDelete (data) {
  return request({
    url: '/api/open/b/b2b2c/contentservice/notification/delete.json',
    method: 'DELETE',
    params: data
  })
}

//更新公告
export function announcementUpdate (data) {
  return request({
    url: '/api/open/b/b2b2c/contentservice/notification/update.json',
    method: 'POST',
    data: data
  })
}

//新增公告
export function announcementSave (data) {
  return request({
    url: '/api/open/b/b2b2c/contentservice/notification/save.json',
    method: 'POST',
    data: data
  })
}