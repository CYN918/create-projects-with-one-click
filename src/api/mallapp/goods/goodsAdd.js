import request from '@/utils/request'

export function getGoodsList (data) {
  return request({
    url: '/mgoods/add/goods_list',
    // url: 'http://1.boshiying.com/mobile/index.php?m=apply&c=goods',
    method: 'get',
    params: data
  })
}

export function addToMyGoods (data) {
  return request({
    url: '/mgoods/add/good_add',
    method: 'get',
    params: data
  })
}
