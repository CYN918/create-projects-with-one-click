import request from "@/utils/request";

//分页查询提报列表
export function getTellGoodsList(data) {
    return request({
        url: "/api/open/b/b2b2c/goodsservice/purchasing/merchandise/find_report_pages.json",
        method: "POST",
        data: data
    });
}
//分页查询商品提报推荐列表
export function gettellGoodsRecommendList(data) {
    return request({
        url: "/api/open/b/b2b2c/goodsservice/purchasing/supmerchandise/find_report_pages.json",
        method: "POST",
        data: data
    });
}
//分页查询商品提报列表
export function getTellGoodsList2(data) {
    return request({
        url: "/api/open/b/b2b2c/goodsservice/purchasing/reportinform/find_tell_pages.json",
        method: "POST",
        data: data
    });
}
//分页查询商品提报公告
export function getTellGoodsNoticeList(data) {
    return request({
        url: "/api/open/b/b2b2c/goodsservice/purchasing/reportinform/find_report_pages.json",
        method: "POST",
        data: data
    });
}
// 提交提报申请
export function addTellGoods(data) {
    return request({
        url: "/api/open/b/b2b2c/goodsservice/purchasing/merchandise/save_report.json",
        method: "POST",
        data: data
    });
}
//更新提报单
export function editTellGoods(data) {
    return request({
        url: "/api/open/b/b2b2c/goodsservice/purchasing/merchandise/update_report.json",
        method: "PUT",
        data: data
    });
}
//根据id获取指定信息
export function getDetailGoods(data) {
    return request({
        url: "/api/open/b/b2b2c/goodsservice/purchasing/merchandise/show_info_by_id.json",
        method: "GET",
        params: data
    });
}
//根据id获取申报商品信息列表
export function get_show_goods(data) {
    return request({
        url: "/api/open/b/b2b2c/goodsservice/purchasing/merchandise/show_goods.json",
        method: "GET",
        params: data
    });
}
//根据id获取申报商品信息列表
export function get_show_goods2(data) {
    return request({
        url: "/api/open/b/b2b2c/goodsservice/purchasing/merchandise/show_report_goods.json",
        method: "GET",
        params: data
    });
}
//根据id删除提报列表
export function deleteTellGoods(reportIds) {
    return request({
        url: "/api/open/b/b2b2c/goodsservice/purchasing/merchandise/delete_by_id.json",
        method: "DELETE",
        params: {
            reportIds,
        }
    });
}
//根据id删除提报商品
export function deleteTellGoods2(reportIds) {
    return request({
        url: "/api/open/b/b2b2c/goodsservice/purchasing/supmerchandise/delete_by_id.json",
        method: "DELETE",
        params: {
            reportIds,
        }
    });
}
//根据id删除提报商品
export function deleteTellGoods3(supReportGoodsIds) {
    return request({
        url: "/api/open/b/b2b2c/goodsservice/purchasing/merchandise/delete_good.json",
        method: "DELETE",
        params: {
            supReportGoodsIds,
        }
    });
}

//上架商品
export function up_goods({supReportGoodsIds,reportId}) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/purchasing/merchandise/up_goods.json',
        method: 'GET',
        params: {
            supReportGoodsIds,
            reportId,
        }
    })
}
//提报申请
export function tellGoodsApply(reportId) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/purchasing/merchandise/submit.json',
        method: 'GET',
        params: {
            reportId,
        }
    })
}
//导入模板
export function uploadExcel(formData) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/merchandise/import_template.json',
        method: 'POST',
        data: formData,
    })
}
export function getTellGoodsAudit(data) {
    return request({
        url:'/api/open/b/b2b2c/goodsservice/purchasing/merchandiseaudit/findAuditTask.json',
        method:'POST',
        data:data
    })
}
export function confirmAudit(data) {
    return request({
        url:'/api/open/b/b2b2c/goodsservice/purchasing/merchandiseaudit/processingAuditTask.json',
        method:'POST',
        data:data
    })
}
export function submitRecommondGood(data) {
    return request({
        url:'/api/open/b/b2b2c/goodsservice/purchasing/supmerchandise/submit_merchandise.json',
        method:'POST',
        data:data
    })
}
