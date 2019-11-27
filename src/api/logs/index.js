import request from '@/utils/request'

//登录日志列表
export function getloginlogsList (data) {
    return request({
        url: '/api/open/b/b2b2c/logservice/sysuser/loginlog/list_page.json',
        method: 'get',
        params: data
    })
}

//订单日志列表
export function getOrderLogsList (data) {
    return request({
        url: '/api/open/b/b2b2c/logservice/orderlog/list_page.json',
        method: 'get',
        params: data
    })
}