import request from '@/utils/request'

export function messageBuy (data) {
  return request({
    url: '/finance/message_buy',
    method: 'get',
    params: data
  })
}

export function getMessageSignList (data) {
  return request({
    url: '/finance/message_sign',
    method: 'get',
    params: data
  })
}

export function addMessageSign (data) {
  return request({
    url: '/finance/message_add',
    method: 'get',
    params: data
  })
}

export function getMessageStoreList (data) {
  return request({
    url: '/finance/message_store',
    method: 'get',
    params: data
  })
}

export function editMessageSign (data) {
  return request({
    url: '/finance/message_Store_edit',
    method: 'get',
    params: data
  })
}
