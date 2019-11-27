import request from '@/utils/request'

// 获取列表
export function getServiceList(data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/apply/find_by_page.json',
    method: 'get',
    params: {
      pageNum: data.current_page,
      pageSize: data.page_size,
    }
  })
}

//新增提交
export function postServiceList(data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/apply/save.json',
    method: 'post',
    data: {
      logo: data.logo, //图片
      bigLogo: data.logo, //图片
      applyName: data.applyName, //
      introduction: data.introduction, //
      sortOrder: data.sortOrder, //
      functionInt: data.functionInt, //
      courseInt: data.courseInt,
      status: '',
      remark: ''
    }
  })
}
// 根据ID查询详细信息
export function getServiceListByid(data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/apply/find_by_id.json',
    method: 'GET',
    params: {
      applyId: data
    }
  })
}
//编辑提交
export function putServiceList(data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/apply/update.json',
    method: 'put',
    data: {
      applyId: data.applyId, //主键
      logo: data.logo, //图片
      bigLogo: data.logo, //图片
      applyName: data.applyName, //
      introduction: data.introduction, //
      sortOrder: data.sortOrder, //
      functionInt: data.functionInt, //
      courseInt: data.courseInt,
      status: '',
      remark: ''
    }
  })
}
//开关状态修改
export function changeServiceList(data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/apply/enable.json',
    method: 'put',
    data: {
      applyId: data.applyId, //主键
      status: data.status, //状态
    }
  })
}
//删除
export function deleteServiceList(data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/apply/delete_by_id.json',
    method: 'DELETE',
    params: {
      applyId: data.applyId, //主键
    }
  })
}

//grade
//获取所有
export function getGradeList() {
  return request({
    url: '/api/open/b/b2b2c/projectservice/gradeInfo/find_all.json',
    method: 'get',
  })
}
//修改服务等级
export function editGradeList(obj) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/gradeInfo/update.json',
    method: 'PUT',
    // data: {
    //   "id": obj.id,
    //   "gradeName": obj.gradeName,//等级名称
    //   "gradeLogo": obj.gradeLogo,//等级LOGO图片地址
    //   "gradePrice":obj.gradePrice,//服务价格(单位：元)
    //   "gradeUnit": obj.gradeUnit,//服务时间单位：Y:年、M:月、D:日；
    //   "gradeSlogan": obj.gradeSlogan,//等级标语：如：首年免费享受服务；销售额达到XXX万可免费享受服务；
    //   "agreementId": obj.agreementId,//服务协议的文章ID
    //   "servicePermissionList": [{
    //     "permissionLogo": obj.servicePermissionList[0].permissionLogo,//权限的logo图标
    //     "permissionCode": obj.servicePermissionList[0].permissionCode,//服务权限的编号
    //     "permissionTitle": obj.servicePermissionList[0].permissionTitle,//服务权限的名称
    //     "sortOrder":  obj.servicePermissionList[0].sortOrder,//排序
    //     "serviceTermsList": [{
    //       "termsText":  obj.servicePermissionList[0].serviceTermsList[0].termsText,//服务权限条款明细
    //       "termsCode":  obj.servicePermissionList[0].serviceTermsList[0].termsCode,//权限条款的编号
    //       "termsCount":  obj.servicePermissionList[0].serviceTermsList[0].termsCount,//权限条款的数量：XX（个/分）；null为不
    //       "termsUnit":  obj.servicePermissionList[0].serviceTermsList[0].termsUnit,//权限条款的单位：个，元，分等
    //       "sortOrder":  obj.servicePermissionList[0].serviceTermsList[0].sortOrder,//权限条款的排序
    //     }]
    //   }]
    // }
    data:obj
  })
}
addGradeList
//添加服务等级
export function addGradeList(obj) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/gradeInfo/save.json',
    method: 'POST',
    data:obj
  })
}
//board
// 获取列表
export function getBoardList(data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/projectTemplate/find_by_page.json',
    method: 'get',
    params: {
      pageNum: data.current_page,
      pageSize: data.page_size,
    }
  })
}
// 根据ID查询详细信息
export function getBoardListByid(data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/projectTemplate/find_by_id.json',
    method: 'GET',
    params: {
      projectTemplateId: data
    }
  })
}
//根据id删除

export function deleteGrade(data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/gradeInfo/delete_by_id.json',
    method: 'DELETE',
    params: {
      id: data.id,
    }
  })
}
// //支付提交--暂时调用新增等级购买记录
// export function submitPayData(data={}) {
//   return request({
//     url: '/api/open/b/b2b2c/projectservice/grade_purchase/save.json',
//     method: 'POST',
//     data: {...data}
//   })
// }
//支付提交--暂时调用新增等级购买记录
export function submitPayData(data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/grade_purchase/save_and_pay.json',
    method: 'POST',
    data: data
  })
}
//去支付
export function goPayData(data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/grade_purchase/to_pay.json',
    method: 'GET',
    params: data
  })
}
//支付提交--暂时调用新增等级购买记录
export function getEventState(data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/grade_purchase/query_pay_order.json',
    method: 'POST',
    data: data
  })
}
//支付信息详情
export function confirmpurchaseData(gradeNo) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/grade_purchase/confirm_purchase.json',
    method: 'GET',
    params: {
      gradeNo,
    }
  })
}
//获取历史记录数据
export function  getserviceHistoryList(data) {
  return request({
    url: '/api/open/b/b2b2c/projectservice/grade_purchase/find_by_page.json',
    method: 'GET',
    params:data
  })
}
//获取我的服务数据
export function  getMyServiceList() {
  return request({
    url: '/api/open/b/b2b2c/projectservice/grade_purchase/myApply.json',
    method: 'GET',
  })
}

//获取我的等级信息
export function  getMyGradeInfo() {
  return request({
    url: '/api/open/b/b2b2c/projectservice/grade_purchase/current_grade.json',
    method: 'GET',
  })
}

//myservice
//获取所有等级
export function getGradeList2() {
  return request({
    url: '/api/open/b/b2b2c/projectservice/grade_purchase/grade.json',
    method: 'get',
  })
}

// 获取当前用户灯姐
export function getGradePurchase() {
  return request({
    url: '/api/open/b/b2b2c/projectservice/grade_purchase/current_grade.json',
    method: 'get'
  })
}

