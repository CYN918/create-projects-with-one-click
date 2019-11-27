import request from '@/utils/request'

//文章分类列表
export function articleList () {
    return request({
        url: '/api/open/b/b2b2c/contentservice/articleCategory/find_by_list.json',
        method: 'get',
    })
}
//新增文章分类
export function addArticleList (data) {
    return request({
        url: '/api/open/b/b2b2c/contentservice/articleCategory/save.json',
        method: 'post',
        data:data
    })
}

//分页查询文章分类
export function queryArticle (obj) {
    return request({
        url: '/api/open/b/b2b2c/contentservice/articleCategory/find_by_page.json',
        method: 'get',
        params: {
            ...obj,
        }
    })
}

//删除文章分类
export function deleteList (id) {
    return request({
        url: '/api/open/b/b2b2c/contentservice/articleCategory/delete.json',
        method: 'delete',
        params: {  id  }
    })
}

//修改文章分类
export function updateArticleList (data) {
    return request({
        url: '/api/open/b/b2b2c/contentservice/articleCategory/update.json',
        method: 'put',
        data:data
    })
}

//根据ID查询所有文章信息
export function requestId (id) {
    return request({
        url: '/api/open/b/b2b2c/contentservice/articleCategory/find_article_by_id.json',
        method: 'get',
        params: {  id  }
    })
}

//根据分类name查询所有文章信息
export function requestName (categoryName) {
    return request({
        url: '/api/open/b/b2b2c/contentservice/articleCategory/find_article_by_name.json',
        method: 'get',
        params: {  categoryName  }
    })
}

//分页查询文章列表
export function requestArticleList (obj) {
    return request({
        url: '/api/open/b/b2b2c/contentservice/article/find_by_page.json',
        method: 'get',
        params: {  ...obj  }
    })
}

//文章列表
export function getArticleList () {
    return request({
        url: '/api/open/b/b2b2c/contentservice/article/find_by_list.json',
        method: 'get',
    })
}

//新增文章
export function addArticle (data) {
    return request({
        url: '/api/open/b/b2b2c/contentservice/article/save.json',
        method: 'post',
        data:data
    })
}

//删除文章
export function deleteaArticle (id) {
    return request({
        url: '/api/open/b/b2b2c/contentservice/article/delete.json',
        method: 'delete',
        params: {  id  }
    })
}

//编辑文章
export function editArticle (data) {
    return request({
        url: '/api/open/b/b2b2c/contentservice/article/update.json',
        method: 'put',
        data: data
    })
}

//根据ID查询单个文章信息
export function  IdQueryInformation(id) {
    return request({
        url: '/api/open/b/b2b2c/contentservice/article/find_by_id.json',
        method: 'get',
        params: {  id  }
    })
}

//根据ID查询单个文章分类信息
export function  viewClassification(id) {
    return request({
        url: '/api/open/b/b2b2c/contentservice/articleCategory/find_by_id.json',
        method: 'get',
        params: {  id  }
    })
}

//销售员管理分页查询
export function salesmanManagement (obj) {
    return request({
        url: '/api/open/b/b2b2c/userservice/sysuserSalesman/find_by_page.json',
        method: 'get',
        params: {  ...obj  }
    })
}

//新增销售人员
export function addSalesperson(obj) {
    return request({
        url: '/api/open/b/b2b2c/userservice/sysuserSalesman/save.json',
        method: 'POST',
        data: {
            sortOrder:obj.sortOrder||0,
            sysuserId:obj.sysuserId
        }
    })
}

//删除销售人员
export function deleteSalesperson(sysuserSalesmanId) {
    return request({
        url: '/api/open/b/b2b2c/userservice/sysuserSalesman/delete_by_id.json',
        method: 'DELETE',
        params: {sysuserSalesmanId}
    })
}


//查询销售人员名称
export function querySeller(data){
    return request({
        url:"/api/open/b/b2b2c/userservice/sysuserSalesman/find_by_simple.json",
        method:'GET',
        params:{...data}
    })
}