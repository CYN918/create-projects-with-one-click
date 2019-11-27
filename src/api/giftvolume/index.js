import request from '@/utils/request'

// *******************************

// B端-批量修改礼品卡开通状态
export function modifyOpeningState(data) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/card/batch_modify_opening_state.json',
    method: 'PUT',
    params: data,
  })
}

// B端-根据ID更新礼品卡
export function updateGiftCardListById(data) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/card/update.json',
    method: 'PUT',
    data,
  })
}

// B端-根据主题ID查看礼品卡(分页)
export function reqGiftCardListById(data) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/card/find_by_page_with_topic_id.json',
    method: 'GET',
    params: data
  })
}

// B端-批量生成礼品卡
export function createGiftCards(data) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/card/create_gift_card.json',
    method: 'POST',
    data: data
  })
}

// B端-分页查询活动(activity)主题
export function reqActivityList(data) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/topic/find_gift_activity_page.json',
    method: 'GET',
    params: data
  })
}

// B端-分页查询礼包(pack)主题
export function reqPackList(data) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/topic/find_gift_pack_page.json',
    method: 'GET',
    params: data
  })
}

// B端-分页查询礼品卡(card)主题
export function reqCardList(data) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/topic/find_gift_card_page.json',
    method: 'GET',
    params: data
  })
}

// B端-分页查询礼品册(book)主题
export function reqBookList(data) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/topic/find_gift_book_page.json',
    method: 'GET',
    params: data
  })
}

// B端-分页查询主题
export function reqThemeList(data) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/topic/find_by_page.json',
    method: 'GET',
    params: data
  })
}

// B端-根据ID查询礼品卡
export function searchGiftCard(cardId) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/card/find_by_id.json',
    method: 'GET',
    params: {
      cardId,
    }
  })
}

// B端-根据ID删除礼品卡
export function cardDelete(cardId) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/card/delete.json',
    method: 'DELETE',
    params: {
      cardId,
    }
  })
}

// B端-查询所有主题(节日)信息
export function creatGiftCard(data) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/card/create_gift_card.json',
    method: 'POST',
    params: data
  })
}

// B端-查询所有主题(节日)信息
export function reqTopicInfo(data) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/topic/find_all.json',
    method: 'GET',
    params: {}
  })
}

// *******************************

//B端-分页查询类型
export function typefindbypage(data) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/type/find_by_page.json',
    method: 'GET',
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  })
}

//B端-查询所有福利类型
export function typefindall(data) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/type/find_all.json',
    method: 'GET',
    params: {}
  })
}

//B端-添加福利类型信息
export function typesave(data) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/type/save.json',
    method: 'POST',
    data: data
  })
}

//B端-根据ID查询福利类型信息
export function typefindbyid(typeId) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/type/find_by_id.json',
    method: 'GET',
    params: {
      typeId: typeId
    }
  })
}

//B端-更新福利类型信息
export function typeupdate(data) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/type/update.json',
    method: 'PUT',
    data: data
  })
}

//B端-根据ID删除福利类型
export function typedelete(typeId) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/type/delete.json',
    method: 'DELETE',
    params: {
      typeId: typeId
    }
  })
}

//B端-查询所有等级分类
export function categoryfindall(typeId) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/category/find_all.json',
    method: 'GET',
    params: {}
  })
}

//B端-添加等级分类信息
export function categorysave(data) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/category/save.json',
    method: 'POST',
    data: data
  })
}

//B端-根据ID查询等级分类
export function categoryfindbyid(categoryId) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/category/find_by_id.json',
    method: 'GET',
    params: {
      categoryId: categoryId
    }
  })
}

//B端-更新等级分类信息
export function categoryupdate(data) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/category/update.json',
    method: 'PUT',
    data: data
  })
}

//根据ID删除等级分类信息
export function categorydelete(categoryId) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/category/delete.json',
    method: 'DELETE',
    params: {
      categoryId: categoryId
    }
  })
}

//B端-分页查询主题信息
export function topicfindbypage(data) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/topic/find_by_page.json',
    method: 'GET',
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  })
}

//B端-添加主题信息
export function topicsave(data) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/topic/save.json',
    method: 'POST',
    data: data
  })
}


//B端-根据id查询主题信息
export function topicfindbyid(topicId) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/topic/find_by_id.json',
    method: 'GET',
    params: {
      topicId: topicId
    }
  })
}

//B端-更新主题信息
export function topicupdate(data) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/topic/update.json',
    method: 'PUT',
    data: data
  })
}

//B端-根据ID删除主题
export function topicdelete(topicId) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/topic/delete.json',
    method: 'DELETE',
    params: {
      topicId: topicId
    }
  })
}

//B端-分页查询礼品卡
export function cardfindbypage(data) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/card/find_by_page.json',
    method: 'GET',
    params: data
  })
}

//B端-根据ID查询礼品卡
export function cardfindbyid(cardId) {
  return request({
    url: '/api/open/b/b2b2c/giftservice/card/find_by_id.json',
    method: 'GET',
    params: {
      cardId: cardId,
    }
  })
}