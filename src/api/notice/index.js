import request from '@/utils/request'

// 邮件通知列表
export function getMailList (data) {
  return request({
    url: '/api/open/b/b2b2c/mqservice/mailMessage/find_by_page.json',
    method: 'get',
    params: data
  })
}

// 删除邮件
export function deleteEmail (id) {
  return request({
    url: '/api/open/b/b2b2c/mqservice/mailMessage/delete.json',
    method: 'DELETE',
    params: {
      id
    }
  })
}

// 邮件通知详情
export function getMailDetails (data) {
  return request({
    url: '/api/open/b/b2b2c/mqservice/mailMessage/find.json',
    method: 'get',
    params: data
  })
}

// 站内消息列表
export function getMessageList (data) {
  return request({
    url: '/api/open/b/b2b2c/mqservice/message/list_page.json',
    method: 'get',
    params: data
  })
}

// 删除站内消息


// 站内消息详情
export function getMessageDetail (data) {
  return request({
    url: '/api/open/b/b2b2c/mqservice/message/detail.json',
    method: 'get',
    params: data
  })
}

export function getNoticeNumber () {
  return request({
    url: '/notice/notice_number',
    method: 'get'
  })
}

export function getNoticeList (data) {
  return request({
    url: '/notice/notice_list',
    method: 'get',
    params: data
  })
}

// 批量修改阅读状态
export function editStatus (data) {
  return request({
    url: '/api/open/b/b2b2c/mqservice/message/update_read.json',
    method: 'DELETE',
    params: data
  })
}
// 批量删除
export function deleteNotice (ids) {
  return request({
    url: '/api/open/b/b2b2c/mqservice/message/delete_all.json',
    method: 'DELETE',
    params: {
      ids
    }
  })
}

/***********************************用户反馈*********************************** */
// 反馈列表
export function getfeedbackList (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/feedback/findByPage.json',
    method: 'GET',
    params: data
  })
}

// 删除反馈
export function deleFeedback (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/feedback/deleteById.json',
    method: 'DELETE',
    params: data
  })
}

// 批量删除
export function deleteFeed (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/feedback/deleteByIds.json',
    method: 'DELETE',
    params: data
  })
}

// 反馈详情
export function feedbackDetails (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/feedback/findById.json',
    method: 'GET',
    params: data
  })
}

// 反馈回复
export function replyFeedback (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/feedback/reply.json',
    method: 'POST',
    params: data
  })
}

// 修改状态
export function feedbackUpdateStatus (data) {
  return request({
    url: '/api/open/b/b2b2c/userservice/feedback/updateStatus.json',
    method: 'PUT',
    params: data
  })
}