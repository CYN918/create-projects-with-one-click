import request from '@/utils/request'

// 获取注册页面底部的文章列表
export function getArticleCategory (data) {
  return request({
    url: '/api/open/b/b2b2c/contentservice/articleCategory/find_by_list.json',
    method: 'get',
    params: data
  })
}
