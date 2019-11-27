import request from '@/utils/request'

//根据项目id获取首页面详情
export function getHomeDetails (projectId) {
    return request({
        url: '/api/open/b/b2b2c/projectservice/projectPage/find_index_by_project.json',
        method: 'get',
        params: {
            projectId
        }
    })
}

//修改页面组件集合
export function updateList (pageComponentModifyParamList) {
    return request({
        url: '/api/open/b/b2b2c/projectservice/pageComponent/update_list.json',
        method: 'PUT',
        data: pageComponentModifyParamList

    })
}

//编辑新增组件内容
export function updateComponent (componentContentModifyParam) {
    return request({
        url: '/api/open/b/b2b2c/projectservice/componentContent/update.json',
        method: 'PUT',
        data: componentContentModifyParam
    })
}

//获取活动列表
export function getActivity () {
    return request({
        url: '/api/open/c/b2b2c/acvitityservice/activity/list.json',
        method: 'GET',
    })
}

//获取活动的商品
export function getactivityGoods (obj) {
    return request({
        url: '/api/open/c/b2b2c/acvitityservice/activityGoods/page.json',
        method: 'GET',
        params:{
            ...obj
        }
    })
}

//获取首页底部的信息
//获取活动的商品
export function reqFooterData (obj) {
    return request({
        url: '/api/open/b/b2b2c/contentservice/articleCategory/find_by_list.json',
        method: 'GET',
        params:{
            ...obj
        }
    })
}
//根据项目id获取集采首页面详情
export function getHomeDetails2 (projectId) {
    return request({
        url: '/api/open/b/b2b2c/projectservice/purchaseProjectPage/find_index_by_project.json',
        method: 'get',
        params: {
            projectId
        }
    })
}
