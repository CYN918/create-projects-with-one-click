import request from '@/utils/request'

// ### 活动管理

// 判断是否有权限
export function checkAuthority (obj) {
  return request({
    url: '/api/open/b/b2b2c/acvitityservice/activity/find_power.json',
    method: 'get',
    params: obj
  })
}

// 活动详情去编辑页
export function editPage (activityId) {
  return request({
    url: '/api/open/b/b2b2c/acvitityservice/activity/activity_to_edit.json',
    method: 'get',
    params: {
      activityId
    },
  })
}

// 判断是否是在总站 0总站 1经销商 2项目
export function checkProIfInGener () {
  return request({
    url: '/api/open/b/b2b2c/acvitityservice/activity/find_is_fyuanai.json',
    method: 'post',
    params: {},
  })
}

// 查询还有多少未填选平台活动价的商品
export function checkUnsetPricePro (activityId) {
  return request({
    url: '/api/open/b/b2b2c/acvitityservice/goods/find_no_price_goods_count.json',
    method: 'get',
    params: {
      activityId
    },
  })
}

// 查询该活动还有多少未审核的商品
export function checkUnexaminedPro (activityId) {
  return request({
    url: '/api/open/b/b2b2c/acvitityservice/goods/find_no_examine_goods_count.json',
    method: 'get',
    params: {
      activityId
    },
  })
}

// 分类列表
export function reqProNameList (parentId) {
  return request({
    url: '/api/open/b/b2b2c/goodsservice/category/tree.json',
    method: 'get',
    params: {
      parentId
    },
  })
}

// 批量删除活动商品分类
export function deleteActivityClassify (obj) {
  return request({
    url: '/api/open/b/b2b2c/acvitityservice/activity/delete_activity_goods_type.json',
    method: 'post',
    data: obj,
  })
}

// 批量新增活动商品分类
export function addActivityClassify (obj) {
  return request({
    url: '/api/open/b/b2b2c/acvitityservice/activity/add_activity_goods_type.json',
    method: 'post',
    data: obj,
  })
}

// 删除活动事件的用户
export function deleteEventUser (activityEventUserId) {
  return request({
    url: '/api/open/b/b2b2c/acvitityservice/activity/delete_activity_event_people.json',
    method: 'get',
    params: {
      activityEventUserId,
    },
  })
}

// 查询活动事件的用户列表
export function reqEventUserList (obj) {
  return request({
    url: '/api/open/b/b2b2c/acvitityservice/activity/activity_event_people_page.json',
    method: 'get',
    params: obj,
  })
}

// 新增活动事件的用户
export function addEventUser (obj) {
  return request({
    url: '/api/open/b/b2b2c/acvitityservice/activity/save_activity_event_people.json',
    method: 'post',
    data: obj,
  })
}

// 分页获取后台用户信息
export function reqUserInfo (keywords) {
  return request({
    url: '/api/open/b/b2b2c/userservice/user/find_page.json',
    method: 'get',
    params: {keywords},
  })
}

// 修改活动审核状态
export function updataActivityExamineStatus (obj) {
  return request({
    url: '/api/open/b/b2b2c/acvitityservice/activity/activity_examine.json',
    method: 'get',
    params: obj,
  })
}

// 修改活动商品审核状态
export function updataActivityProExamineStatus (obj) {
  return request({
    url: '/api/open/b/b2b2c/acvitityservice/goods/update_status.json',
    method: 'get',
    params: obj,
  })
}

// 删除活动商品
export function deleteActivityPro (activityGoodsId) {
  return request({
    url: '/api/open/b/b2b2c/acvitityservice/goods/delete.json',
    method: 'get',
    params: {
      activityGoodsId,
    },
  })
}

// 查询活动商品分类
export function updateActivityPro (obj) {
  return request({
    url: '/api/open/b/b2b2c/acvitityservice/goods/update.json',
    method: 'post',
    data: obj,
  })
}

// 查询活动商品分类
export function reqActivityProClassify (activityId) {
  return request({
    url: '/api/open/b/b2b2c/acvitityservice/activity/find_activity_detail.json',
    method: 'get',
    params: {
      activityId,
    }
  })
}

// 分页查询活动商品列表
export function reqActivityProList (obj) {
  return request({
    url: '/api/open/b/b2b2c/acvitityservice/goods/page.json',
    method: 'get',
    params: obj,
  })
}

// 修改活动
export function updateActivity (obj) {
  return request({
    url: '/api/open/b/b2b2c/acvitityservice/activity/update_by_id.json',
    method: 'post',
    data: obj,
  })
}


// 删除活动
export function reqDeleteActivity (activityId) {
  return request({
    url: '/api/open/b/b2b2c/acvitityservice/activity/delete_by_id.json',
    method: 'get',
    params: {
      activityId,
    }
  })
}

// 分页获取活动搜索
export function reqActivitySearch (obj) {
  return request({
    url: '/api/open/b/b2b2c/acvitityservice/activity/activity_search.json',
    method: 'post',
    data: obj
  })
}

// 新增活动
export function addNewActivity (obj) {
  return request({
    url: '/api/open/b/b2b2c/acvitityservice/activity/save.json',
    method: 'post',
    data: obj
  })
}

// 删除活动类型
export function deleteActivityType (activityTypeId) {
  return request({
    url: '/api/open/b/b2b2c/acvitityservice/type/delete_by_id.json',
    method: 'get',
    params: {
      activityTypeId,
    },
  })
}

// 修改活动类型
export function updateActivityType (obj) {
  return request({
    url: '/api/open/b/b2b2c/acvitityservice/type/update_by_id.json',
    method: 'get',
    params: obj,
  })
}

// 新增活动类型
export function addActivityType (obj) {
  return request({
    url: '/api/open/b/b2b2c/acvitityservice/type/save.json',
    method: 'get',
    params: obj,
  })
}

// 分页获取活动类型列表
export function reqActivityList (pageIndex = 1, pageSize = 100) {
  return request({
    url: '/api/open/b/b2b2c/acvitityservice/type/page.json',
    method: 'get',
    params: {
      pageIndex,
      pageSize,
    },
  })
}

// 文件上传
export function uploadFile (formData) {
  return request({
    url: '/api/open/b/b2b2c/fileservice/uploadFile',
    method: 'post',
    data: formData,
  })
}


// 文件删除
export function deleteFile (fileName) {
  return request({
    url: '/api/open/b/b2b2c/fileservice/delete', // 文件上传成功返回的那个filePath
    method: 'get',
    params: {
      fileName,
    },
  })
}

// 新增活动商品
export function addActivityPro (obj) {
  return request({
    url: '/api/open/b/b2b2c/acvitityservice/goods/save.json',
    method: 'post',
    data: obj,
  })
}

// 活动查询商品列表
export function reqActivityPro (obj) {
  return request({
    url: '/api/open/b/b2b2c/goodsservice/goods/find_show_goods_activity.json',
    method: 'get',
    params: obj,
  })
}