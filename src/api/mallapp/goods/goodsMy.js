import request from '@/utils/request'

export function getGoodsList (data) {
  return request({
    url: '/mgoods/my/goods_list',
    method: 'get',
    params: data
  })
}

export function priceBatchChange (data) {
  return request({
    url: '/mgoods/my/batch_change',
    method: 'get',
    params: data
  })
}

export function goodsBatchOff (data) {
  return request({
    url: '/mgoods/my/goods_off',
    method: 'get',
    params: data
  })
}

export function goodsBatchUp (data) {
  return request({
    url: '/mgoods/my/goods_up',
    method: 'get',
    params: data
  })
}

export function goodsBatchRemove (data) {
  return request({
    url: '/mgoods/my/goods_remove',
    method: 'get',
    params: data
  })
}

export function getTagsList () {
  return request({
    url: '/mgoods/my/tags_list',
    method: 'get'
  })
}

export function goodsBatchAddTags (data) {
  return request({
    url: '/mgoods/my/tags_add',
    method: 'get',
    params: data
  })
}

export function goodsBatchRemoveTags (data) {
  return request({
    url: '/mgoods/my/tags_remove',
    method: 'get',
    params: data
  })
}
