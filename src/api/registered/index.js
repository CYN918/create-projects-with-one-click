import request from '@/utils/request'

// 注册删除图片
export function deletePicture (data) {
  return request({
    url: '/api/open/b/b2b2c/file/delete',
    method: 'get',
    params: {
        fileName:data
    }
  })
}
