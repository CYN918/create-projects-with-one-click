import request from '@/utils/request'

//获取导航栏树形结构
export function navigationbartree (parentId) {
    return request({
      url: '/api/open/b/b2b2c/goodsservice/navigationbar/tree.json',
      method: 'GET',
      params: {
        parentId:parentId
      }
    })
  }

//根据id删除导航栏
export function deleteNavigationbartree (barId) {
  return request({
    url: '/api/open/b/b2b2c/goodsservice/navigationbar/delete.json',
    method: 'DELETE',
    params: {
      barId:barId
    }
  })
}

//保存导航栏
export function saveNavigationbartree (data) {
  return request({
    url: '/api/open/b/b2b2c/goodsservice/navigationbar/save.json',
    method: 'POST',
    params: {
      barClass: data.barClass,
      barName: data.barName,
      barStatus: data.barStatus,
      categoryIds: data.categoryIds,
      customerId: data.customerId,
      imgUrl: data.imgUrl,
      isShow: data.isShow,
      keyWord: data.keyWord,
      parentId: data.parentId,
      projectId: data.projectId,
      sortOrder: data.sortOrder,
    }
  })
}

//获取导航栏
export function obtainNavigationbartree (barId) {
  return request({
    url: '/api/open/b/b2b2c/goodsservice/navigationbar/find_by_id.json',
    method: 'GET',
    params: {
      barId: barId
    }
  })
}

//查询导航栏关联商品类目
export function queryNavigationbartree (data) {
  return request({
    url: '/api/open/b/b2b2c/goodsservice/navigationbar/find_by_id.json',
    method: 'GET',
    params: {
      barId: data.barId,
      pid: data.pid
    }
  })
}

//查询商品分类树形结构
export function categorycategory (parentId) {
  return request({
    url: '/api/open/b/b2b2c/goodsservice/category/tree.json',
    method: 'GET',
    params: {
      parentId:parentId
    }
  })
}

//保存导航栏
export function navigationbarsave (data) {
  return request({
    url: '/api/open/b/b2b2c/goodsservice/navigationbar/save.json',
    method: 'POST',
    data: data
  })
}

//获取导航栏
export function findbyid (data) {
  return request({
    url: '/api/open/b/b2b2c/goodsservice/navigationbar/find_by_id.json',
    method: 'GET',
    params: {
      barId:data
    }
  })
}

//查询导航栏关联商品类目
export function findcatbyid (data) {
  return request({
    url: '/api/open/b/b2b2c/goodsservice/navigationbar/find_cat_by_id.json',
    method: 'GET',
    params: {
      barId:data
    }
  })
}

//更新导航栏
export function navigationbarupdate (data) {
  return request({
    url: '/api/open/b/b2b2c/goodsservice/navigationbar/update.json',
    method: 'PUT',
    data: data
  })
}

//设置是否显示导航栏
export function navigationAccording (data) {
  return request({
    url: '/api/open/b/b2b2c/goodsservice/navigationbar/update_show.json',
    method: 'PUT',
    data: data
  })
}

