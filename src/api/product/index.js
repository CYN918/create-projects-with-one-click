import request from '@/utils/request'

// 获取 用户评论
export function getComments(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/comment/find_list.json',
        method: 'get',
        params: {
            content: data.content,
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
        }
    })
}

// 根据id查询评论
export function checkComments(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/comment/find_by_id.json',
        method: 'get',
        params: {
            commentId: data,
        }
    })
}

// 修改评论内容
export function modifyComments(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/comment/update_content.json',
        method: 'POST',
        params: {
            commentId: data.commentId,
            content: data.content,
            isEmail: data.isEmail,
        }
    })
}

// 修改评论显示状态
export function showComments(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/comment/update_status.json',
        method: 'get',
        params: {
            commentId: data.commentId,
            status: data.status
        }
    })
}

// 新增评论
export function addComments(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/comment/save.json',
        method: 'POST',
        data: {
            commentRank: data.commentRank,
            commentType: data.commentType,
            content: data.content,
            goodsId: data.goodsId,
            ipAddress: data.ipAddress,
            status: data.status,
            parentId: data.parentId,
        }
    })
}

// 删除 用户评论
export function deleteComments(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/comment/delete.json',
        method: 'DELETE',
        params: {
            commentId: data,
        }
    })
}

// 获取品牌
export function getBrand(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/brand/page.json',
        method: 'get',
        params: {
            keyWord: data.keyWord,
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
        }
    })
}

//加载审核记录
export function auditRecords(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/audit/find_audit_by_goods.json',
        method: 'POST',
        params: {
            goodsId: data.goodsId,
            code: data.code
        }
    })
}

//对商品进行审核
export function Areview(data, state,desc) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/audit/audit_goods.json',
        method: 'POST',
        data: {
            auditId: data.auditId,
            auditRemark: desc,
            operationId: data.operationId,
            processId: data.processId,
            processStatus: state
        }
    })
}

//加载商品审核记录
export function getAllaudit(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/audit/find_audit_by_goods.json',
        method: 'POST',
        params: {
            goodsId: data.goodsId,
        }
    })
}

// 获取所有品牌
export function getBrandAll(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/brand/list.json',
        method: 'get',
        params: {}
    })
}

// 新增品牌
export function addBrand(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/brand/save.json',
        method: 'POST',
        data: {
            brandName: data.name,
            brandBanner: data.banner,
            brandId: data.id,
            brandLogo: data.logo,
            isShow: data.show,
            brandDesc: data.textarea,
            sortOrder: data.order,
            webUrl: data.url,
        }
    })
}

// 获取品牌信息
export function obtainBrand(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/brand/find_by_id.json',
        method: 'get',
        params: {
            brandId: data,
        }
    })
}

// 编辑品牌信息
export function editBrand(name, sort, textarea, url, id, logo, banner, radio) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/brand/update.json',
        method: 'PUT',
        data: {
            brandName: name,
            webUrl: url,
            brandDesc: textarea,
            sortOrder: sort,
            brandId: id,
            brandLogo: logo,
            brandBanner: banner,
            isShow: radio
        }
    })
}

// 删除品牌
export function deleteBrand(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/brand/delete.json',
        method: 'DELETE',
        params: {
            brandId: data,
        }
    })
}

/*京东*/
//查询商品分类树形结构
export function getTreecatagory(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/category/tree.json',
        method: 'GET',
        params: {
            parentId: 1
        }
    })
}

//查询商品分类树形结构
export function getcategory2(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/category/tree.json',
        method: 'GET',
        params: {
            parentId: data
        }
    })
}

// 添加商品获取商品分类
export function getCatagory1(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/category/list.json',
        method: 'get',
        params: {
            type: data.type,
            parentId: data.parentId,
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
        }
    })
}

// 获取商品分类
export function getCatagory(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/category/list_page.json',
        method: 'get',
        params: {
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
            catName: data.catName,
            parentId: data.parentId
        }
    })
}

// 分类绑定商品规格
export function bindingSpecification(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/category/save_or_update_specs.json',
        method: 'post',
        params: {
            catId: data.catId,
            specIds: data.specIds
        }
    })
}


// 获取商品分组
export function getGroup(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goodsTag/page.json',
        method: 'get',
        params: {
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
        }
    })
}

// 新增商品分组
export function addGroup(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goodsTag/save.json',
        method: 'POST',
        data: {
            tagName: data.label,
            applyUrl: data.mall,
            groupCode: data.logo,
        }
    })
}

// 获取分组信息
export function obtainGroup(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goodsTag/find_by_id.json',
        method: 'GET',
        params: {
            tagId: data,
        }
    })
}

// 编辑分组信息
export function editGroup(typeName, attrGroup, mesg, id) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goodsTag/update.json',
        method: 'PUT',
        data: {
            tagName: typeName,
            applyUrl: attrGroup,
            groupCode: mesg,
            tagId: id,
        }
    })
}

// 删除商品分组
export function deleteGroup(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goodsTag/delete.json',
        method: 'DELETE',
        params: {
            tagId: data,
        }
    })
}

// 获取商品类型
export function getType(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_type/list.json',
        method: 'get',
        params: {
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
        }
    })
}


// 新增商品类型
export function dataPost(data) {
    return request({
        url: process.env.VUE_APP_CRAWLER_URL+'/api/open/b/b2b2c/apiservice/goods/crawler/jd_crawler.json',
        method: 'POST',
        data: {
            goods:data.goods,
            catId: data.cat_id,
            goodsTypeId: data.id
        }
    })
}
// 新增商品类型
export function addType(typeName, attrGroup) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_type/save.json',
        method: 'POST',
        data: {
            typeName: typeName,
            attrGroup: attrGroup
        }
    })
}

// 获取商品类型信息
export function obtainType(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_type/find.json',
        method: 'GET',
        params: {
            goodsTypeId: data
        }
    })
}

// 编辑商品类型
export function editorType(typeName, attrGroup, id) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_type/update.json',
        method: 'PUT',
        data: {
            typeName: typeName,
            attrGroup: attrGroup,
            goodsTypeId: id
        }
    })
}

// 删除商品类型
export function deleteType(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_type/delete.json',
        method: 'DELETE',
        params: {
            goodsTypeId: data
        }
    })
}


// 获取所有商品类型
export function getAlltype() {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_type/list_select.json',
        method: 'GET',
        params: {}
    })
}

// 查询商品类型属性列表
export function getTypeid(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_attribute/list.json',
        method: 'GET',
        params: {
            goodsTypeId: data.id,
            pageIndex: data.pageIndex,
            pageSize: data.pageSize
        }
    })
}

// 新增商品类型属性
export function addAttribute(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_attribute/save.json',
        method: 'POST',
        data: {
            attrName: data.name,
            goodsTypeId: data.type,
            attrIndex: data.radio1,
            isLinked: data.radio2,
            attrType: data.radio3,
            attrInputType: data.radio4,
            attrValues: data.textarea ? data.textarea : [],
        }
    })
}

// 查询单个商品类型属性
export function addAttributebyid(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_attribute/find.json',
        method: 'GET',
        params: {
            attrId: data
        }
    })
}

// 编辑商品类型属性
export function addAttributeeditor(data, id) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_attribute/update.json',
        method: 'PUT',
        data: {
            attrId: id,
            attrName: data.name,
            goodsTypeId: data.type,
            attrIndex: data.radio1,
            isLinked: data.radio2,
            attrType: data.radio3,
            attrInputType: data.radio4,
            attrValues: data.textarea ? data.textarea : [],
        }
    })
}

// 查询页面双击编辑商品类型属性
export function addAttributeeditor1(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_attribute/update.json',
        method: 'PUT',
        data: {
            attrId: data.attrId,
            attrName: data.attrName,
            goodsTypeId: data.goodsTypeId,
            attrIndex: data.attrIndex,
            isLinked: data.isLinked,
            attrType: data.attrType,
            attrInputType: data.attrInputType,
            attrValues: data.attrValues ? data.textarea : [],
        }
    })
}

// 删除商品类型属性
export function addAttributedelete(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_attribute/delete.json',
        method: 'DELETE',
        params: {
            attrIds: data
        }
    })
}

// 删除商品类型属性 可删除多个
export function Attributedeletemaor(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_attribute/delete.json',
        method: 'DELETE',
        params: {
            attrIds: data
        }
    })
}

// 根据商品类型获取所有商品类型值和对应的选项值
export function addCatagory(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_attribute/find_type_value.json',
        method: 'GET',
        params: {
            goodsTypeId: data
        }
    })
}


// 根据商品分类id移除商品分类
export function deleteCatagoryid(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/category/delete.json',
        method: 'DELETE',
        params: {
            catId: data
        }
    })
}


// 新增商品分类
export function addCatagorygoods(data, filterAttr) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/category/save.json',
        method: 'POST',
        data: {
            catName: data.name,
            parentId: data.value,
            userId: data.buyer,
            measureUnit: data.number,
            sortOrder: data.sorting,
            isShow: data.According,
            showInNav: data.navigation,
            indexRecommend: '1,2,3',
            userRank: '6,8,9,10,11',
            pointsTypes: data.integral,
            filterAttr: filterAttr,
            // pointsTypes:data.integral,
            grade: data.price,
            style: data.stylesheet,
            keywords: data.keyword,
            catImgUrl: data.catImgUrl,
            catDesc: data.textarea,
        }
    })
}

// 根据商品分类id获取分类
export function cataGorygoodsid(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/category/find_by_id.json',
        method: 'GET',
        params: {
            catId: data
        }
    })
}

// 根据商品分类id查询分类信息
export function getBygooidMsg(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/category/find_cat_by_id.json',
        method: 'GET',
        params: {
            catId: data
        }
    })
}

// 修改商品分类
export function modifyCatagorygoods(data, filterAttr, id) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/category/update.json',
        method: 'PUT',
        data: {
            catId: id,
            catName: data.name,
            parentId: data.value,
            userId: data.buyer,
            measureUnit: data.number,
            sortOrder: data.sorting,
            isShow: data.According,
            showInNav: data.navigation,
            indexRecommend: '1,2,3',
            userRank: '6,8,9,10,11',
            pointsTypes: data.integral,
            filterAttr: filterAttr,
            // pointsTypes:data.integral,
            grade: data.price,
            style: data.stylesheet,
            keywords: data.keyword,
            catImgUrl: data.catImgUrl,
            catDesc: data.textarea,
        }
    })
}

// 查询商品列表
export function getGoods(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods/find_show_goods.json',
        method: 'GET',
        params: {
            pageIndex: data.current_page,
            catId: data.catId, // 商品id
            pageSize: data.page_size,
            isReal: data.isReal, //是否是实物。1，是；0，否
            goodsType: data.third_party != 4 && data.third_party != 5 ? data.third_party : null, //商品来源 1，京东 2，网易 3，苏宁
            isSubstituteSales: data.third_party == 4 ? 1 : data.third_party == 5 ? 0 : '', //1 一件代发商品),0筛选集采商品
            grossProfitMarginStart: data.grossProfitMarginStart,//税前毛利润率起始
            grossProfitMarginEnd: data.grossProfitMarginEnd, // 税前毛利润率结束
            goodsName: data.search_type == 1 ? data.keyword : "", //商品名称
            suppliersName: data.search_type == 2 ? data.keyword : "", //供应商名称
            modelNumber: data.search_type == 3 ? data.keyword : "", //型号
            brandName: data.search_type == 4 ? data.keyword : "", //品牌
            goodsSn: data.search_type == 5 ? data.keyword : "", //货号
            grossProfitMarginTaxStart: data.grossProfitMarginTaxStart, //税后毛利润率起始
            grossProfitMarginTaxEnd: data.grossProfitMarginTaxEnd, //税后毛利润率结束
            netProfitMarginStart: data.netProfitMarginStart, //税后纯利润率起始
            netProfitMarginEnd: data.netProfitMarginEnd, //税后纯利润率结束
            distrProfitMarginStart: data.distrProfitMarginStart, //分销利润率起始
            distrProfitMarginEnd: data.distrProfitMarginEnd, //分销利润率结束
            costPriceStart: data.costPriceStart, //商品成本价起始
            costPriceEnd: data.costPriceEnd, //商品成本价结束
            costPriceJdRatioStart: data.costPriceJdRatioStart, //一件代发价对比京东/天猫折扣率开始
            costPriceJdRatioEnd: data.costPriceJdRatioEnd, //一件代发价对比京东/天猫折扣率结束
            shopJdRatioStart: data.shopJdRatioStart, //商城价对比京东价折扣率开始
            shopJdRatioEnd: data.shopJdRatioEnd, //商城价对比京东价折扣率结束
            volumeJdRatioStart: data.volumeJdRatioStart, //批发价1对比京东/天猫折扣率开始
            volumeJdRatioEnd: data.volumeJdRatioEnd, //批发价1对比京东/天猫折扣率结束
            volumeShopRatioStart: data.volumeShopRatioStart, //批发价1对比商城利润率开始
            volumeShopRatioEnd: data.volumeShopRatioEnd, //批发价1对比商城利润率结束
            sysUserId: data.sysUserId, //采购员id
            supplierId: data.supplierId, // 供应商id
        }
    })
}
// 查询商品审核列表
export function getGoodsList(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods/find_audit_goods.json',
        method: 'GET',
        params: {
            pageIndex: data.current_page,
            pageSize: data.page_size,
            isReal: data.isReal, //是否是实物。1，是；0，否
            goodsType: data.third_party != 4 && data.third_party != 5 ? data.third_party : null, //商品来源 1，京东 2，网易 3，苏宁
            isSubstituteSales: data.third_party == 4 ? 1 : data.third_party == 5 ? 0 : '', //1 一件代发商品),0筛选集采商品
            grossProfitMarginStart: data.grossProfitMarginStart,//税前毛利润率起始
            grossProfitMarginEnd: data.grossProfitMarginEnd, // 税前毛利润率结束
            goodsName: data.search_type == 1 ? data.keyword : "", //商品名称
            suppliersName: data.search_type == 2 ? data.keyword : "", //供应商名称
            modelNumber: data.search_type == 3 ? data.keyword : "", //型号
            brandName: data.search_type == 4 ? data.keyword : "", //品牌
            goodsSn: data.search_type == 5 ? data.keyword : "", //货号
            grossProfitMarginTaxStart: data.grossProfitMarginTaxStart, //税后毛利润率起始
            grossProfitMarginTaxEnd: data.grossProfitMarginTaxEnd, //税后毛利润率结束
            netProfitMarginStart: data.netProfitMarginStart, //税后纯利润率起始
            netProfitMarginEnd: data.netProfitMarginEnd, //税后纯利润率结束
            distrProfitMarginStart: data.distrProfitMarginStart, //分销利润率起始
            distrProfitMarginEnd: data.distrProfitMarginEnd, //分销利润率结束
            costPriceStart: data.costPriceStart, //商品成本价起始
            costPriceEnd: data.costPriceEnd, //商品成本价结束
            costPriceJdRatioStart: data.costPriceJdRatioStart, //一件代发价对比京东/天猫折扣率开始
            costPriceJdRatioEnd: data.costPriceJdRatioEnd, //一件代发价对比京东/天猫折扣率结束
            shopJdRatioStart: data.shopJdRatioStart, //商城价对比京东价折扣率开始
            shopJdRatioEnd: data.shopJdRatioEnd, //商城价对比京东价折扣率结束
            volumeJdRatioStart: data.volumeJdRatioStart, //批发价1对比京东/天猫折扣率开始
            volumeJdRatioEnd: data.volumeJdRatioEnd, //批发价1对比京东/天猫折扣率结束
            volumeShopRatioStart: data.volumeShopRatioStart, //批发价1对比商城利润率开始
            volumeShopRatioEnd: data.volumeShopRatioEnd, //批发价1对比商城利润率结束
            sysUserId: data.sysUserId, //采购员id
        }
    })
}

// 添加新商品
export function addProduct(data, sku, state, goodsAttributes) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods/save.json',
        method: 'POST',
        data: {
            goods: {
                goodsName: data.genaralForm.goods_name, //商品名称
                goodsSn: data.genaralForm.goods_sn, //商品货号
                modelNumber: data.genaralForm.model_number, //型号
                goodsWeight: data.genaralForm.goods_weight, //商品重量
                catId: data.genaralForm.cat_id, //商品分类
                taxRate: data.genaralForm.tax, //税率
                brandId: data.genaralForm.goods_branch, //商品品牌
                supplierId:data.genaralForm.sysuer.sysuserType != 1?data.genaralForm.supplier:data.genaralForm.sysuer.correlativeUserId, // 供应商id
                skus: sku, // sku数组
                sceneIds: data.genaralForm.sceneIds, // 场景ID
                goodsDesc: data.information.info, //详细描述
                isReal: state, // 是否是实物 1 是 0否
                jdGoodsUrl: data.genaralForm.domains[0].jd_link, //京东链接
                jdPrice: parseFloat(data.genaralForm.domains[0].jd_price), //京东价格
                tmailGoodsUrl: data.genaralForm.domains[0].tm_link, //天猫链接
                tmallPrice: parseFloat(data.genaralForm.domains[0].tm_price), //天猫价格
                pptPrice: parseFloat(data.genaralForm.domains[0].ppt_price), //对外PPT价格
                preferentialPrice: parseFloat(data.genaralForm.domains[0].discount_price), //特惠供货价
                minimumPrice: parseFloat(data.genaralForm.domains[0].guidancePrice), //最优惠价格

            },
            goodsGalleryes: { //商品相册
                galleryes: data.genaralForm.first_image_url,
            },
            goodsAttributes: goodsAttributes,
            others: {
                productSize: data.genaralForm.productSize,
                grossWeight: data.genaralForm.grossWeight,
                packSize: data.genaralForm.packSize,
                packNumber: data.genaralForm.packNumber,
                keywords:data.genaralForm.keywords, //商品关键字
                isBest: 0,
                isNew: 0,
                isHot: 0,
                isOnSale: 0,
                isAloneSale: 0,
                isShipping: 0,
                goodsBrief: "简短描述",
                sellerNote: "备注",
                priceRange: "",
                jumpUrl: "http://www.baidu.com",
                templateId: data.genaralForm.templateId
            }
            // goodOriginalImgUrl:data, //商品图片外部url
        }
    })
}

// 编辑商品
export function editorProduct(data, sku, state, id, goodsAttributes) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods/update.json',
        method: 'PUT',
        data: {
            goods: {
                goodsId: id, //商品id
                goodsName: data.genaralForm.goods_name, //商品名称
                goodsSn: data.genaralForm.goods_sn, //商品货号
                shopPrice: data.genaralForm.shopPrice, //商城价
                modelNumber: data.genaralForm.model_number, //型号
                goodsWeight: data.genaralForm.goods_weight, //商品重量
                catId: data.genaralForm.cat_id, //商品分类
                taxRate: data.genaralForm.tax, //税率
                brandId: data.genaralForm.goods_branch, //商品品牌
                supplierId:data.genaralForm.sysuer.sysuserType != 1?data.genaralForm.supplier:data.genaralForm.sysuer.correlativeUserId, // 供应商id
                skus: sku, // sku数组
                sceneIds: data.genaralForm.sceneIds, // 场景ID
                goodsDesc: data.information.info, //详细描述
                isReal: state, // 是否是实物 1 是 2否
                jdGoodsUrl: data.genaralForm.domains[0].jd_link, //京东链接
                jdPrice: parseFloat(data.genaralForm.domains[0].jd_price), //京东价格
                tmailGoodsUrl: data.genaralForm.domains[0].tm_link, //天猫链接
                tmallPrice: parseFloat(data.genaralForm.domains[0].tm_price), //天猫价格
                pptPrice: parseFloat(data.genaralForm.domains[0].ppt_price), //对外PPT价格
                preferentialPrice: parseFloat(data.genaralForm.domains[0].discount_price), //特惠供货价
                minimumPrice: parseFloat(data.genaralForm.domains[0].guidancePrice), //最优惠价格
            },
            goodsGalleryes: { //商品相册
                galleryes: data.genaralForm.first_image_url,
            },
            goodsAttributes: goodsAttributes,
            others: {
                productSize: data.genaralForm.productSize,
                grossWeight: data.genaralForm.grossWeight,
                packSize: data.genaralForm.packSize,
                packNumber: data.genaralForm.packNumber,
                keywords:data.genaralForm.keywords, //商品关键字
                isBest: 0,
                isNew: 0,
                isHot: 0,
                isOnSale: 0,
                isAloneSale: 0,
                isShipping: 0,
                goodsBrief: "简短描述",
                sellerNote: "备注",
                priceRange: "",
                jumpUrl: "http://www.baidu.com"
            }
            // goodOriginalImgUrl:data, //商品图片外部url
        }
    })
}

//获取编辑商品用到的相关信息
export function getIdgoods(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods/find_to_update.json',
        method: 'GET',
        params: {
            goodsId: data
        }
    })
}

//根据商品规格ID获取所属的商品规格值
export function getIgoodsSpecvalue(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_spec_value/list_select.json',
        method: 'GET',
        params: {
            specId: data.specId,
            specValue: data.specValue
        }
    })
}

// 根据商品分类ID获取所有相关的商品规格
export function getIdgoodspec(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_spec/list_select.json',
        method: 'GET',
        params: {
            catId: data
        }
    })
}

//根据京东或者天猫链接获取对应的价格
export function getUrlgoods(data, type) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods/find_third_goods_price.json',
        method: 'GET',
        params: {
            url: data,
            type: type
        }
    })
}

//分页查询带商品统计的采销员列表
export function getBuyer(data) {
    return request({
        url: '/api/open/b/b2b2c/userservice/sysuser_buyer/find_info_and_count_page.json',
        method: 'GET',
        params: {
            pageNum: data.currentPage,
            pageSize: data.size,
            sysuserName: data.name
        }
    })
}

//查询回收站商品信息
export function getRecycled(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/recycled/find_recycled_goods.json',
        method: 'GET',
        params: {
            pageIndex: data.current_page,
            pageSize: data.page_size,
            isReal: data.isReal, //是否是实物。1，是；0，否
            goodsType: data.third_party != 4 && data.third_party != 5 ? data.third_party : null, //商品来源 1，京东 2，网易 3，苏宁
            isSubstituteSales: data.third_party == 4 ? 1 : data.third_party == 5 ? 0 : '', //1 一件代发商品),0筛选集采商品
            grossProfitMarginStart: data.grossProfitMarginStart,//税前毛利润率起始
            grossProfitMarginEnd: data.grossProfitMarginEnd, // 税前毛利润率结束
            goodsName: data.search_type == 1 ? data.keyword : "", //商品名称
            suppliersName: data.search_type == 2 ? data.keyword : "", //供应商名称
            modelNumber: data.search_type == 3 ? data.keyword : "", //型号
            brandName: data.search_type == 4 ? data.keyword : "", //品牌
            goodsSn: data.search_type == 5 ? data.keyword : "", //货号
            grossProfitMarginTaxStart: data.grossProfitMarginTaxStart, //税后毛利润率起始
            grossProfitMarginTaxEnd: data.grossProfitMarginTaxEnd, //税后毛利润率结束
            netProfitMarginStart: data.netProfitMarginStart, //税后纯利润率起始
            netProfitMarginEnd: data.netProfitMarginEnd, //税后纯利润率结束
            distrProfitMarginStart: data.distrProfitMarginStart, //分销利润率起始
            distrProfitMarginEnd: data.distrProfitMarginEnd, //分销利润率结束
            costPriceStart: data.costPriceStart, //商品成本价起始
            costPriceEnd: data.costPriceEnd, //商品成本价结束
            costPriceJdRatioStart: data.costPriceJdRatioStart, //一件代发价对比京东/天猫折扣率开始
            costPriceJdRatioEnd: data.costPriceJdRatioEnd, //一件代发价对比京东/天猫折扣率结束
            shopJdRatioStart: data.shopJdRatioStart, //商城价对比京东价折扣率开始
            shopJdRatioEnd: data.shopJdRatioEnd, //商城价对比京东价折扣率结束
            volumeJdRatioStart: data.volumeJdRatioStart, //批发价1对比京东/天猫折扣率开始
            volumeJdRatioEnd: data.volumeJdRatioEnd, //批发价1对比京东/天猫折扣率结束
            volumeShopRatioStart: data.volumeShopRatioStart, //批发价1对比商城利润率开始
            volumeShopRatioEnd: data.volumeShopRatioEnd, //批发价1对比商城利润率结束
            sysUserId: data.sysUserId, //采购员id
        }
    })
}

//根据商品规格ID获取所属的商品规格值
export function getSpecification(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_spec_value/list_select.json',
        method: 'GET',
        params: {
            specId: data,
        }
    })
}

//修改商品的审核状态
export function ConfirmState(stata, id) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods/update_status.json',
        method: 'POST',
        params: {
            reviewStatus: stata,
            goodsId: id,
        }
    })
}

//查询送礼场景树形列表
export function getScene() {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/scene/find_tree.json',
        method: 'GET',
        params: {}
    })
}

//绑定商品和场景关联值
export function bindingScene(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/scene/save_data.json',
        method: 'POST',
        params: {
            goodsId: data.goodsId,

        }
    })
}


//审核部分的批量修改操作(商品的上下架)
export function changeState(data, applyReason) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods/update_isOnSale.json',
        method: 'PUT',
        params: {
            goodsId: data.goodsId,
            isOnSale: data.isOnSale == 1 ? 0 : 1,
            applyReason: applyReason
        }
    })
}

//修改审核记录的显示状态
export function deleteAudit(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/audit/delete_by_goods.json',
        method: 'DELETE',
        params: {
            goodsId: data.goodsId,
            remark: data.remark
        }
    })
}

//审核部分的批量修改操作
export function bulkChanges(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods/update_audit.json',
        method: 'PUT',
        params: {
            goodsId: data.goodsId,
            isBest: data.isBest,
            isHot: data.isHot,
            isNew: data.isNew,
            code: data.code,
            isReal: data.isReal, //是否是实物。1，是；0，否
            goodsType: data.third_party != 4 && data.third_party != 5 ? data.third_party : null, //商品来源 1，京东 2，网易 3，苏宁
            isSubstituteSales: data.third_party == 4 ? 1 : data.third_party == 5 ? 0 : '', //1 一件代发商品),0筛选集采商品
            grossProfitMarginStart: data.grossProfitMarginStart,//税前毛利润率起始
            grossProfitMarginEnd: data.grossProfitMarginEnd, // 税前毛利润率结束
            goodsName: data.search_type == 1 ? data.keyword : "", //商品名称
            suppliersName: data.search_type == 2 ? data.keyword : "", //供应商名称
            modelNumber: data.search_type == 3 ? data.keyword : "", //型号
            brandName: data.search_type == 4 ? data.keyword : "", //品牌
            grossProfitMarginTaxStart: data.grossProfitMarginTaxStart, //税后毛利润率起始
            grossProfitMarginTaxEnd: data.grossProfitMarginTaxEnd, //税后毛利润率结束
            netProfitMarginStart: data.netProfitMarginStart, //税后纯利润率起始
            netProfitMarginEnd: data.netProfitMarginEnd, //税后纯利润率结束
            distrProfitMarginStart: data.distrProfitMarginStart, //分销利润率起始
            distrProfitMarginEnd: data.distrProfitMarginEnd, //分销利润率结束
            costPriceStart: data.costPriceStart, //商品成本价起始
            costPriceEnd: data.costPriceEnd, //商品成本价结束
            costPriceJdRatioStart: data.costPriceJdRatioStart, //一件代发价对比京东/天猫折扣率开始
            costPriceJdRatioEnd: data.costPriceJdRatioEnd, //一件代发价对比京东/天猫折扣率结束
            shopJdRatioStart: data.shopJdRatioStart, //商城价对比京东价折扣率开始
            shopJdRatioEnd: data.shopJdRatioEnd, //商城价对比京东价折扣率结束
            volumeJdRatioStart: data.volumeJdRatioStart, //批发价1对比京东/天猫折扣率开始
            volumeJdRatioEnd: data.volumeJdRatioEnd, //批发价1对比京东/天猫折扣率结束
            volumeShopRatioStart: data.volumeShopRatioStart, //批发价1对比商城利润率开始
            volumeShopRatioEnd: data.volumeShopRatioEnd, //批发价1对比商城利润率结束
            sysUserId: data.sysUserId, //采购员id
        }
    })
}

//批量移入回收站
export function deleteGoods(goodsId, value, state) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/recycled/update_delete.json',
        method: 'POST',
        params: {
            goodsId: goodsId,
            delCode: state,
            applyReason: value
        }
    })
}

//分页获取所有相关的商品规格
export function getSpecifications(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_spec/list_page.json',
        method: 'GET',
        params: {
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
            catId: data.catId,
            keyWord: data.keyWord
        }
    })
}

//删除商品规格
export function deleteSpecifications(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_spec/delete.json',
        method: 'DELETE',
        params: {
            specId: data
        }
    })
}

//绑定商品和场景关联值
export function associatedValues(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/scene/save_data.json',
        method: 'POST',
        params: {
            goodsId: data.goodsId,
            sceneIds: data.sceneIds,
        }
    })
}

//编辑商品规格
export function ediotSpecifications(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_spec/update.json',
        method: 'PUT',
        data: {
            specId: data.specId,
            specName: data.specName,
            specRemark: data.specRemark
        }
    })
}

//保存商品分类和商品规格关联
export function saveSpecs(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/category/save_or_update_specs.json',
        method: 'POST',
        data: {
            catId: data.catId,
            specIds: data.specIds,
        }
    })
}

//新增商品规格
export function savespecValues(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_spec/save.json',
        method: 'POST',
        data: {
            specName: data.specName,
            catId: data.catId,
            specValues: data.specValues,
        }
    })
}

//新增商品规格值
export function saveSpecvalue(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_spec_value/save.json',
        method: 'POST',
        data: {
            specId: data.specId,
            specValues: data.specValues,
        }
    })
}

//根据商品规格ID分页获取所属商品规格值
export function getsavespecByid(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_spec_value/list_page.json',
        method: 'GET',
        params: {
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
            specId: data.specId,
        }
    })
}

//查询商品规格下拉列表
export function getvalueTree(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_spec/find_all_list.json',
        method: 'GET',
        params: {}
    })
}

//新增商品规格值
export function addvalueTree(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_spec_value/save.json',
        method: 'POST',
        data: {
            specId: data.specId,
            specValues: data.specValues
        }
    })
}

//根据规格id查询规格信息
export function getSpecByid(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_spec/find_spec.json',
        method: 'GET',
        params: {
            specId: data
        }
    })
}

//根据商品规格值ID查询商品规格值信息
export function getByvalue(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_spec_value/find.json',
        method: 'GET',
        params: {
            specValueId: data
        }
    })
}

//编辑商品规格值
export function ediotByvalue(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_spec_value/update.json',
        method: 'PUT',
        data: {
            specId: data.specId,
            specValueId: data.specValueId,
            specValue: data.specValue,
        }
    })
}

//删除商品规格值
export function deleteByvalue(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_spec_value/delete.json',
        method: 'DELETE',
        data: {
            specValueIds: data
        }
    })
}

export function getErpGoods(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/erpgoods/find_erp_goods.json',
        method: 'GET',
        params: {
            pageIndex: data.current_page,
            pageSize: data.page_size,
            isReal: data.isReal,
            nameKey:data.nameKey,
            goodsId: data.goodsId,
            goodsName: data.goodsName1,
            goodsSn:data.goodsSn,
            modelNumber:data.modelNumber
        }
    })
}

//查询商品类型列表
export function getItemtypes(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_type/list.json',
        method: 'GET',
        params: {
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
        }
    })
}

//查询商品类型属性列表
export function getByidlist(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_attribute/list.json',
        method: 'GET',
        params: {
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
        }
    })
}

//根据商品类型ID获取所有商品类型值和对应的选项值
export function findTypeValue(goodsTypeId) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods_attribute/find_type_value.json',
        method: 'GET',
        params: {
            goodsTypeId: goodsTypeId
        }
    })
}

//查询商品类型属性列表
export function putReduction(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/recycled/update_restore.json',
        method: 'POST',
        params: {
            delCode: 0,
            goodsId: data.goodsId,
        }
    })
}

//保存采购员用户信息
export function saveBuyer(data) {
    return request({
        url: '/api/open/b/b2b2c/userservice/sysuser_buyer/save.json',
        method: 'POST',
        data: data
    })
}

//根据商品id查询绑定的场景集合
export function findSceneBygoods(goodsId) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/scene/find_scene_by_goods.json',
        method: 'GET',
        params: {
            goodsId: goodsId
        }
    })
}

//根据商品id查询绑定的场景集合
export function findCategoryList(data) {
    return request({
        // url: '/api/open/b/b2b2c/apiservice/jd/import/findCategoryList.json',
        url: '/api/open/b/b2b2c/apiservice/category/find_category.json',
        method: 'GET',
        params:data
    })
}

//查询品牌开通的审核记录
export function findinfobyid(brandAuditId) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/brandaudit/find_info_by_id.json',
        method: 'GET',
        params:{
            brandAuditId:brandAuditId
        }
    })
}


//获取京东商品列表
export function getDatalist(data) {
    return request({
        url: '/api/open/b/b2b2c/apiservice/jd/import/findGoodsByTerms.json',
        method: 'POST',
        data:data
    })
}
//導入商品
export function importChooseGoods(data) {
    return request({
        url: '/api/open/b/b2b2c/apiservice/jd/import/importChooseGoods.json',
        method: 'POST',
        data:data
    })
}
//每日新增
export function everyDayNewGoods(data) {
    return request({
        url: '/api/open/b/b2b2c/apiservice/jd/import/findEveryDayNewGoods.json',
        method: 'GET',
        params:{
            pageIndex:data.current_page,
            pageSize:data.page_size

        }
    })
}
//每日新增导入
export function importEveryDayNew(data) {
    return request({
        url: '/api/open/b/b2b2c/apiservice/jd/import/importGoodsAtDailyNewGods.json',
        method: 'POST',
        data:data
    })
}

//查询苏宁分类
export function findCategoryList2() {
    return request({
        url: '/api/open/b/b2b2c/apiservice/suning/import/getCategory.json',
        method: 'get',
    })
}
//获取苏宁商品列表
export function getDatalist2(data) {
    return request({
        url: '/api/open/b/b2b2c/apiservice/suning/import/findGoodsByTerms.json',
        method: 'POST',
        data:data
    })
}
//導入苏宁商品
export function importChooseGoods2(data) {
    return request({
        url: '/api/open/b/b2b2c/apiservice/suning/import/importChooseGoods.json',
        method: 'POST',
        data:data
    })
}
//苏宁每日新增
export function everyDayNewGoods2(data) {
    return request({
        url: '/api/open/b/b2b2c/apiservice/suning/import/findEveryDayNewGoods.json',
        method: 'GET',
        params:data
    })
}
//苏宁每日新增导入
export function importEveryDayNew2(data) {
    return request({
        url: '/api/open/b/b2b2c/apiservice/suning/import/importGoodsAtDailyNewGods.json',
        method: 'POST',
        data:data
    })
}
//查询严选分类
export function findCategoryList3() {
    return request({
        url: '/api/open/b/b2b2c/apiservice/wangyi/import/getGoodsCategory.json',
        method: 'POST',
    })
}
//获取严选商品列表
export function getDatalist3(data) {
    return request({
        url: '/api/open/b/b2b2c/apiservice/wangyi/import/findGoodsByTerms.json',
        method: 'POST',
        data:data
    })
}
//導入严选商品
export function importChooseGoods3(data) {
    return request({
        url: '/api/open/b/b2b2c/apiservice/wangyi/import/importChooseGoods.json',
        method: 'POST',
        data:data
    })
}
//严选每日新增
export function everyDayNewGoods3(data) {
    return request({
        url: '/api/open/b/b2b2c/apiservice/wangyi/import/findEveryDayNewGoods.json',
        method: 'GET',
        params:data
    })
}
//严选每日新增导入
export function importEveryDayNew3(data) {
    return request({
        url: '/api/open/b/b2b2c/apiservice/wangyi/import/importChooseGoods.json',
        method: 'POST',
        data:data
    })
}

//删除采销员
export function deleSalesman(buyerId) {
    return request({
        url: '/api/open/b/b2b2c/userservice/sysuser_buyer/delete.json',
        method: 'DELETE',
        params: {
            buyerId:buyerId
        }
    })
}

//修改采购员排序

export function putSort(buyerId,sortOrder) {
    return request({
        url: '/api/open/b/b2b2c/userservice/sysuser_buyer/edit_order.json',
        method: 'PUT',
        params: {
            buyerId:buyerId,
            sortOrder:sortOrder
        }
    })
}

//新增的时候查询商品列表
export function getAddGoodsList(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods/find_show_goods.json',
        method: 'GET',
        params: {
            isSubstituteSales:data.isSubstituteSales,
            catId: data.barId,
            goodsName:data.keyword,
            pageIndex: data.current_page,
            pageSize: data.page_size,
            isReal: data.isReal, //是否是实物。1，是；0，否
            goodsType: data.sourceType,
        }
    })
}

//分页查询商品推送数据
export function productPush(obj) {
    return request({
        url: '/api/open/b/b2b2c/projectservice/pushgoods/find_page.json',
        method: 'GET',
        params: { ...obj }
    })
}

//获取项目
export function getProject(pageSize) {
    return request({
        url: '/api/open/b/b2b2c/projectservice/project/find_by_page.json',
        method: 'GET',
        params: {
            pageSize
        }
    })
}

//保存商品数据 (进销商)
export function saveProduct(obj) {
    return request({
        url: '/api/open/b/b2b2c/projectservice/pushgoods/push_goods_by_agency.json',
        method: 'POST',
        data:obj
    })
}

//查询商品推送审核记录分页列表
export function queryProductReview(obj) {
    return request({
        url: '/api/open/b/b2b2c/projectservice/pushgoodsaudit/find_audit_record.json',
        method: 'GET',
        params:{ ...obj }
    })
}

//修改商品推送审核
export function editReview(obj) {
    return request({
        url: '/api/open/b/b2b2c/projectservice/pushgoodsaudit/edit_audit.json',
        method: 'PUT',
        params:{ ...obj }
    })
}

//启用取消分类
export function startcancel(obj) {
    return request({
        url: '/api/open/b/b2b2c/apiservice/category/update_category.json',
        method: 'POST',
        data:obj
    })
}
//商品推送信息并创建推送审核列表
export function pushProduct(obj) {
    return request({
        url: '/api/open/b/b2b2c/projectservice/pushgoods/push_goods_and_create_audit.json',
        method: 'POST',
        data:obj
    })
}

//批量创建商品审核记录
export function auditRecord(obj) {
    return request({
        url: '/api/open/b/b2b2c/projectservice/pushgoodsaudit/create_audit.json',
        method: 'POST',
        data:obj
    })
}
//通过ID批量删除推送商品数据
export function deleteProductList(pushIds,cancelReason) {
    return request({
        url: '/api/open/b/b2b2c/projectservice/pushgoods/delete_by_ids.json',
        method: 'DELETE',
        params:{
            pushIds: (pushIds || []).join(","),
            cancelReason:cancelReason
        }
    })
}
//通过ID推送商品数据
export function updateData(obj) {
    return request({
        url: '/api/open/b/b2b2c/projectservice/categoryDiscount/update.json',
        method: 'PUT',
        data:{ ...obj }
    })
}

//根据分类id查询分类折扣
export function conditionalQuery(catId) {
    return request({
        url: '/api/open/b/b2b2c/projectservice/categoryDiscount/find_by_cat.json',
        method: 'GET',
        params:{catId}
    })
}

//商品发布
export function productDlivery(pushIds) {
    return request({
        url: '/api/open/b/b2b2c/projectservice/pushgoods/push_goods.json',
        method: 'POST',
        data:  pushIds
    })
}
//分页查询商品通知页
export function commodityNotice(obj) {
    return request({
        url: '/api/open/b/b2b2c/projectservice/pushgoodsnotice/find_page.json',
        method: 'GET',
        params:{ ...obj }
    })
}

//获取经销商
export function getDealer(pageSize) {
    return request({
        url: '/api/open/b/b2b2c/userservice/agency/find_by_page.json',
        method: 'GET',
        params: {pageSize}
    })
}

//保存商品数据给项目
export function saveDealer(obj) {
    return request({
        url: '/api/open/b/b2b2c/projectservice/pushgoods/push_goods_by_project.json',
        method: 'POST',
        data:obj
    })
}

//跟新商品上下架状态
export function switchUpDown(obj) {
    return request({
        url: '/api/open/b/b2b2c/projectservice/pushgoodsnotice/update_goods_sale.json',
        method: 'POST',
        params:{ ...obj }
    })
}

//修改商品调价数据
export function modifyPriceAdjustment(obj) {
    return request({
        url: '/api/open/b/b2b2c/projectservice/pushgoods/edit_goods_adjust.json',
        method: 'PUT',
        data:obj
    })
}
//获取商品折扣分类
export function discountClassification() {
    return request({
        url: '/api/open/b/b2b2c/projectservice/categoryDiscount/category.json',
        method: 'get',
    })
}

//导出商品
export function goodsdowngoods(goodsId) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/goods/down_goods.json',
        method: 'get',
        params:{
            goodsId:goodsId
        }
    })
}
/*淘宝采集*/
//立即采集
export function taobaoDataCollect(data) {
    return request({
        url:process.env.VUE_APP_CRAWLER_URL+ '/api/open/b/b2b2c/apiservice/crawler/tb/crawler_goods.json',
        method: 'POST',
        data: {
            productUrl:data.productUrl,//商品链接
            catId: data.cat_id,//分类
            goodsTypeId: data.id//商品类型
        }
    })
}
/*淘宝采集*/
//立即采集
export function aLiDataCollect(data) {
    return request({
        url: process.env.VUE_APP_CRAWLER_URL+'/api/open/b/b2b2c/apiservice/crawler/alibaba/crawler_goods.json',
        method: 'POST',
        data: {
            productUrl:data.productUrl,//商品链接
            catId: data.cat_id,//分类
            goodsTypeId: data.id//商品类型
        }
    })
}

//新增商品专题
export function addGoodsProject(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/special/save.json',
        method: 'POST',
        data: data
    })
}

//分页查询
export function queryProject(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/special/find_by_page.json',
        method: 'GET',
        params: data
    })
}

//删除商品专题
export function deleteProject(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/special/delete_by_id.json',
        method: 'DELETE',
        params: {specialId:data}
    })
}

//获取商品专题详情
export function findProjectDetail(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/special/find_by_id.json',
        method: 'GET',
        params: {specialId:data}
    })
}

//获取商品专题关联商品详情
export function findSpecialGoods(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/specialGoods/find_by_page.json',
        method: 'GET',
        params: data
    })
}

//修改商品专题
export function updateSpecialGoods(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/special/update.json',
        method: 'PUT',
        data: data
    })
}

//批量修改专题商品排序
export function batchUpdateSpecialGoods(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/specialGoods/update_order.json',
        method: 'POST',
        data: data
    })
}

//新增专题商品关联
export function newSpecialGoods(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/specialGoods/save.json',
        method: 'POST',
        data: data
    })
}

//删除专题商品关联
export function deleteSpecialGoods(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/specialGoods/delete_by_id.json',
        method: 'DELETE',
        params: {sgId:data}
    })
}

//保存折扣率申请
export function saveDiscount(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/discountmanage/save_discount.json',
        method: 'POST',
        data: data
    })
}

//批量审核
export function pushgoodsaudit(data) {
    return request({
        url: '/api/open/b/b2b2c/projectservice/pushgoodsaudit/edit_audit_list.json',
        method: 'PUT',
        params: {...data}
    })
}
//新商品通知删除/批量
export function deleIgnoreGoods(data) {
    return request({
        url: '/api/open/b/b2b2c/projectservice/pushgoodsnotice/delete_by_ids.json',
        method: 'DELETE',
        data
    })
}

//分页查询审核记录
export function findDiscountAudit(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/discountaudit/find_audit.json',
        method: 'POST',
        data: data
    })
}
//发布全部商品
export function publishAll() {
    return request({
        url: '/api/open/b/b2b2c/projectservice/pushgoods/push_all_goods.json',
        method: 'POST',
    })
}

//审核经销商折扣率申请
export function editDiscountAudit(data) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/discountaudit/edit_audit.json',
        method: 'PUT',
        params: data
    })
}

//根据经销商名称查询合同信息
export function contractInformation(agencyName) {
    return request({
        url: '/api/open/b/b2b2c/contentservice/agencyContract/find_by_agency_name.json',
        method: 'GET',
        params: {
            agencyName
        }
    })
}

//批量更新商品上下架状态
export function updateGoodsListsale(data) {
    return request({
        url: '/api/open/b/b2b2c/projectservice/pushgoodsnotice/update_goodsList_sale.json',
        method: 'POST',
        params: {
            putCode: data.putCode
        },
        data: data.pushNoticeIds
    })
}

//获取项目的详细信息
export function projectfindinfobyid(projectId) {
    return request({
        url: "/api/open/b/b2b2c/projectservice/project/find_info_by_id.json?projectId=" + projectId,
        method: "GET",
    })
}

//获取导航栏树形结构
export function navigationbartree(parentId) {
    return request({
        url: '/api/open/b/b2b2c/goodsservice/navigationbar/tree.json',
        method: 'GET',
        params: {
            parentId: parentId
        }
    })
}

//通过名字查询字典树数据
export function dictionaryTree(name) {
    return request({
        url: '/api/open/b/b2b2c/userservice/dictionary/find_tree_by_name.json',
        method: 'GET',
        params: {
            name
        }
    })
}

//保存全部推送商品数据 (经销商)
export function pushAllGoodsbyAgency(data) {
    return request({
        url: '/api/open/b/b2b2c/projectservice/pushgoods/push_all_goods_by_agency.json',
        method: 'POST',
        params: {
            agencyId: data.agencyId
        },
        data: data.barIds
    })
}

//保存全部推送商品数据 (经销商)
export function pushAllGoodsByProject(data) {
    return request({
        url: '/api/open/b/b2b2c/projectservice/pushgoods/push_all_goods_by_project.json',
        method: 'POST',
        params: {
            projectId: data.projectId
        },
        data: data.barIds
    })
}
