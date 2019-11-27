/* eslint-disable indent */
import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/views/layout/index'
/* Router */
import PermissionsRouter from './permissions';
import CustomerRouter from './customer';
import ActiveRouter from './active';
import FinanceRouter from './finance';
import SupplierRouter from './supplier';
import ProduceRouter from './product';
import application from './application';
import SystemSettings from './SystemSettings';
import management from './management';
import logs from './logs';
import Mallapp from './mallapp';
import giftvolume from './giftvolume';
import activity from './activity';
import sale from './sale';
import aLi from './aLi';
import jingDong from './jingDong';
import taoBao from './taoBao';
import purchase from './purchase';
import setting from './setting';
import administration from './administration';

Vue.use(Router)

export const constantRouterMap = [
    {
        path: '*',
        redirect: '/',
        hidden: true
    },
    {
        path: '/',
        name: 'login',
        component: () => import(/* webpackChunkName: "group-foo" */ '@/views/login/index'),
        hidden: true,
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/supplychain',
        component: () => import('@/views/supplychain/index'),
        name: 'supplychain',
        hidden: true
    },
    {
        path: '/registered',
        component: () => import('@/views/registered/index'),
        name: 'registered',
        hidden: true
    },
    {
        path: '/dashboard',
        component: Layout,
        redirect: '/dashboard/index',
        name: 'Dashboard',
        children: [{
            path: 'index',
            component: () => import('@/views/dashboard/index')
        }]
    },
    ...CustomerRouter,
    ...ActiveRouter,
    ...PermissionsRouter,
    ...FinanceRouter,
    ...SupplierRouter,
    ...ProduceRouter,
    ...application,
    ...SystemSettings,
    ...Mallapp,
    ...management,
    ...logs,
    ...giftvolume,
    ...activity,
    ...sale,
    ...aLi,
    ...jingDong,
    ...taoBao,
    ...purchase,
    ...setting,
    ...administration,
    {
        path: '/aftermarket',
        component: Layout,
        // redirect: '/aftermarket/index',
        children: [{
            name: 'Aftermarket',
            path: 'index',
            component: () => import('@/views/aftermarket/index')
        }]
    },
    {
        path: '/storage',
        component: Layout,
        // redirect: '/storage/index',
        children: [{
            name: 'Beforestr',
            path: 'index',
            component: () => import('@/views/storage/beforestr/index')
        },

            {
                name: 'OutStorage',
                path: 'outStorage',
                component: () => import('@/views/storage/outStorage/index')
            },
            {
                name: 'OutOrder',
                path: 'outStorage/outOrder',
                component: () => import('@/views/storage/outStorage/checkOut/orderOut')
            },
            {
                name: 'List',
                path: 'list',
                component: () => import('@/views/storage/list/index')
            },
            {
                name: 'CreatePdf',
                path: 'list/createAllotPDF',
                component: () => import('@/views/storage/list/storeAllot/createPDF')
            },
            {
                name: 'CreateTakingPDF',
                path: 'list/createTakingPDF',
                component: () => import('@/views/storage/list/stockTaking/createPDF')
            },
            {
                name: 'Stock',
                path: 'stock',
                component: () => import('@/views/storage/stock/index')
            },


        ]
    },
    {
        path: '/apply',
        component: Layout,
        // redirect: '/apply/index',
        children: [{
            name: 'DealerList',
            path: 'index',
            component: () => import('@/views/apply/dealerlist/index')
        },
            {
                path: 'index/dealerinformation',
                name: 'Dealerinformation',
                component: () => import('@/views/apply/dealerlist/dealerinformation')
            },
            // 经销商合同
            {
                path: 'contract',
                name: 'DealerContract',
                component: () => import('@/views/apply/contract/index'),
            },
            {
                path: 'contract/detail',
                name: 'DealerContractDetail',
                component: () => import('@/views/apply/contract/contract_detail'),
            },
            // 经销商合同记录
            {
                path: 'contractList',
                name: 'contractList',
                component: () => import('@/views/apply/contractList/index'),
            },
            {
                path: 'contractList/listDetail',
                name: 'ContractListDetail',
                component: () => import('@/views/apply/contractList/detail'),
            },
            // 经销商审核
            {
                path: 'contractReview',
                name: 'contractReview',
                component: () => import('@/views/apply/contractReview/index'),
            },
            {
                path: 'contractList/reviewDetail',
                name: 'DealerContractReviewDetail',
                component: () => import('@/views/apply/contractReview/contract_review_detail'),
            },
            //新增编辑页
            {
                path: 'index/dealereditor',
                name: 'dealereditor',
                component: () => import('@/views/apply/dealerlist/dealereditor')
            },
            {
                path: 'index/dealerdetail',
                name: 'Dealerdetail1',
                component: () => import('@/views/apply/dealerlist/dealerdetail')
            },
            {
                path: 'examine',
                name: 'ApplyExamine',
                component: () => import('@/views/apply/examine/index')
            },
            {
                path: 'examine/detail',
                name: 'Dealerdetail',
                component: () => import('@/views/apply/examine/detail')
            },
            {
                path: 'examine/dealerinformation',
                name: 'Dealerinformation11',
                component: () => import('@/views/apply/dealerlist/dealerinformation')
            },
        ]
    },
    {
        path: '/market',
        component: Layout,
        // redirect: '/market/index',
        children: [{
            name: 'Market',
            path: 'index',
            component: () => import('@/views/market/index')
        }]
    },
    {
        name: 'SupplierFillfiles',
        path: 'fill',//完善（审核时的）供应商信息
        component: () => import('@/views/supplier/fill')
    },
    //订单管理
    {
        path: '/order',
        component: Layout,
        // redirect: '/order/index',
        children: [
            {
                name: 'Order',
                path: 'index',
                component: () => import('@/views/order/index')
            },
            {
                name: 'OrderDetail',
                path: 'index/detail',
                component: () => import('@/views/order/detail/index')
            },
            {
                name: 'OrderServer',
                path: 'server',
                component: () => import('@/views/order/server')
            },
            {
                name: 'OrderServerDetail',
                path: 'server/detail',
                component: () => import('@/views/order/detail/detail')
            },
            {
                name: 'OrdeRaftersales',
                path: 'aftersales',
                component: () => import('@/views/order/aftersales/aftersales')
            },
            //运费规则
            {
                name: 'freightRules',
                path: 'freightRules',
                component: () => import('@/views/order/freightRules')
            },
            //运费规则查看详情
            {
                name: 'freightRulesDetail',
                path: 'freightRules/freightRulesDetail',
                component: () => import('@/views/order/courierTemplate/freightRulesDetail')
            },
            //运费规则编辑
            {
                name: 'freightRulesAddEdit',
                path: 'freightRules/freightRulesAddEdit',
                component: () => import('@/views/order/courierTemplate/freightRulesAddEdit')
            },
            //新增快递公司
            {
                name: 'addCouriercompany',
                path: 'freightRules/addCouriercompany',
                component: () => import('@/views/order/courierTemplate/addCouriercompany')
            },
            //新增运费模板
            {
                name: 'addTemplate',
                path: 'freightRules/addTemplate',
                component: () => import('@/views/order/courierTemplate/addTemplate')
            },
            //查看运费模板
            {
                name: 'queryTemplate',
                path: 'freightRules/queryTemplate',
                component: () => import('@/views/order/courierTemplate/queryTemplate')
            },
            //运费设置
            {
                name: 'freightSet',
                path: 'freightSet',
                component: () => import('@/views/order/freightSet')
            },
            //运费设置新增
            {
                name: 'freightSetAdd',
                path: 'freightSet/freightSetAdd',
                component: () => import('@/views/order/courierTemplate/freightSetAdd')
            },
            //运费设置-编辑
            {
                name: 'freightSetEdit',
                path: 'freightSet/freightSetEdit',
                component: () => import('@/views/order/courierTemplate/freightSetEdit')
            },
            //运费设置-详情
            {
                name: 'freightSetDetail',
                path: 'freightSet/freightSetDetail',
                component: () => import('@/views/order/courierTemplate/freightSetDetail')
            },
            //运费设置
            {
                name: 'freightQuery',
                path: 'freightQuery',
                component: () => import('@/views/order/freightQuery')
            },
        ]
    },
    //提报商品
    {
        path: '/tellGoods',
        component: Layout,
        // redirect: '/tellGoods/index',
        children: [
            //提报列表
            {
                name: 'index',
                path: 'index',
                component: () => import('@/views/tellGoods/index')
            },
            //提报列表-添加&编辑
            {
                name: 'indexAddEdit',
                path: 'index/addEdit',
                component: () => import('@/views/tellGoods/index/addEdit')
            },
            //提报列表-详情
            {
                name: 'indexDetail',
                path: 'index/detail',
                component: () => import('@/views/tellGoods/index/detail')
            },
            {
                name: "goodsDetail",
                path: "index/detail/goodsDetail",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/tellGoods/index/goodsDetail"
                        )
            },
            //提报商品
            {
                name: 'tellGoods',
                path: 'tellGoods',
                component: () => import('@/views/tellGoods/tellGoods')
            },
            //提报商品-详情
            {
                name: 'tellGoodsDetail',
                path: 'tellGoods/detail',
                component: () => import('@/views/tellGoods/tellGoods/detail')
            },
            {
                name: "goodsDetail2",
                path: "tellGoods/goodsDetail2",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/tellGoods/tellGoods/tellGoodsDetail"
                        )
            },
           /* //提报商品-商品推荐
            {
                name: 'goodsRecommond',
                path: 'tellGoods/goodsRecommond',
                component: () => import('@/views/tellGoods/tellGoods/goodsRecommond')
            },*/
            //提报商品-上架商品
            {
                name: 'tellGoodsShelvesGoods',
                path: 'tellGoods/tellGoodsShelvesGoods',
                component: () => import('@/views/tellGoods/tellGoods/shelvesGoods')
            },
            //提报商品审核
            {
                name: 'tellGoodsAudit',
                path: 'tellGoodsAudit',
                component: () => import('@/views/tellGoods/tellGoodsAudit')
            },
            {
                name: 'tellGoodsAuditDetail',
                path: 'tellGoodsAudit/detail',
                component: () => import('@/views/tellGoods/tellGoodsAudit/detail')
            },
            //商品推荐
            {
                name: 'tellGoodsRecommend',
                path: 'tellGoodsRecommend',
                component: () => import('@/views/tellGoods/tellGoodsRecommend')
            },
            //商品推荐-详情
            {
                name: 'tellGoodsRecommendDetail',
                path: 'tellGoodsRecommend/tellGoodsRecommendDetail',
                component: () => import('@/views/tellGoods/tellGoodsRecommend/detail')
            },
            //商品推荐-商品推荐
            {
                name: 'tellGoodsRecommendgoodsRecommond',
                path: 'tellGoodsRecommend/tellGoodsRecommendgoodsRecommond',
                component: () => import('@/views/tellGoods/tellGoodsRecommend/goodsRecommond')
            },
            // 公告
            {
                name: 'tellGoodsNotice',
                path: 'tellGoodsNotice',
                component: () => import('@/views/tellGoods/tellGoodsNotice')
            } ,
            // 公告-详情
            {
                name: 'tellGoodsNoticeDetail',
                path: 'tellGoodsNotice/tellGoodsNoticeDetail',
                component: () => import('@/views/tellGoods/tellGoodsNotice/detail')
            }
        ]
    },
    {
        path: '/data',
        component: Layout,
        // redirect: '/data/index',
        children: [{
            name: 'MemberData',
            path: 'index',
            component: () => import('@/views/data/index')
        }, {
            name: 'MemberRevenue',
            path: 'revenue',
            component: () => import('@/views/data/revenue')
        }, {
            name: 'MemberApplication',
            path: 'application',
            component: () => import('@/views/data/application')
        }]
    },
    {
        path: '/creditmanage',
        component: Layout,
        // redirect: '/service/index',
        children: [
             //账号类型管理
             {
                name: 'AccountTypeManagement',
                path: 'accountTypeManagement',
                component: () => import('@/views/creditmanage/accountTypeManagement/index')
            },
            //账户绑定管理
            {
                name: 'accountTypeBinding',
                path: 'accountTypeBinding',
                component: () => import('@/views/creditmanage/accountTypeBinding/index')
            },
            //新增账号类型
            {
                name: 'AddAccountType',
                path: 'accountTypeManagement/add',
                component: () => import('@/views/creditmanage/accountTypeManagement/add')
            },
            {
                name: 'DetailccountType',
                path: 'accountTypeManagement/detail',
                component: () => import('@/views/creditmanage/accountTypeManagement/detail')
            },
            // 额度发放管理
            {
                name: 'quotaManagement',
                path: 'quotaManagement',
                component: () => import('@/views/creditmanage/quotaManagement/index')
            },
            //额度发放
            {
                name: 'agrant',
                path: 'agrant',
                component: () => import('@/views/creditmanage/quotaManagement/agrant')
            },
            // 额度发放管理详情
            {
                name: 'quotaDetail',
                path: 'quotaDetail',
                component: () => import('@/views/creditmanage/quotaManagement/quotaDetail')
            },
            // 额度审核
            {
                name: 'creditAudit',
                path: 'creditAudit',
                component: () => import('@/views/creditmanage/creditAudit/index')
            },
            // 额度审核详情
            {
                name: 'auditDetails',
                path: 'auditDetails',
                component: () => import('@/views/creditmanage/creditAudit/detail')
            },
            // 我的充值
            {
                name: 'myPrepaid',
                path: 'myPrepaid',
                component: () => import('@/views/creditmanage/myPrepaid/index')
            },
            // 我的充值详情
            {
                name: 'myPrepaidDetails',
                path: 'myPrepaidDetails',
                component: () => import('@/views/creditmanage/myPrepaid/myPrepaidDetails')
            },
            // 充值管理
            {
                name: 'topUpManagement',
                path: 'topUpManagement',
                component: () => import('@/views/creditmanage/topUpManagement/index')
            },
            {
                name: 'terminalTopUpManagement',
                path: 'terminalTopUpManagement',
                component: () => import('@/views/creditmanage/terminalTopUpManagement/index')
            },
            // 充值管理详情
            {
                name: 'topUpDetails',
                path: 'topUpDetails',
                component: () => import('@/views/creditmanage/topUpManagement/topUpDetails')
            },
            // 额度管理人
            {
                name: 'quotaIssuingManager',
                path: 'quotaIssuingManager',
                component: () => import('@/views/creditmanage/quotaIssuingManager/index')
            },
            // 我的财务
            {
                name: 'myFinancial',
                path: 'myFinancial',
                component: () => import('@/views/creditmanage/myFinancial/index')
            },
            // 我的财务-查看详情
            {
                name: 'linesManagement',
                path: 'linesManagement',
                component: () => import('@/views/creditmanage/linesManagement/index')
            },
            {
                name: 'lines',
                path: 'linesManagement/detail',
                component: () => import('@/views/creditmanage/linesManagement/detail')
            },
            {
                name: 'preloaded',
                path: '/creditmanage/myFinancial/preloaded',
                component: () => import('@/views/creditmanage/myFinancial/preloaded')
            }
        ]
    },
    {
        path: '/service',
        component: Layout,
        // redirect: '/service/index',
        children: [
            //   {
            //   name: 'Service',
            //   path: 'index',
            //   component: () => import('@/views/service/index')
            // }, {
            //   name: 'Agreement',
            //   path: 'agreement',
            //   component: () => import('@/views/service/agreement')
            // }, {
            //   name: 'Develop',
            //   path: 'develop',
            //   component: () => import('@/views/service/develop')
            // },
            //服务管理
            {
                name: 'Service',
                path: 'index',
                component: () => import('@/views/service/service/index')
            },
            {
                name: 'AddService',
                path: 'index/addservice',
                component: () => import('@/views/service/service/addservice')
            },
            {
                name: 'DetailService',
                path: 'index/detailservice',
                component: () => import('@/views/service/service/detailservice')
            },
            // 等级管理
            {
                name: 'ServiceGrade',
                path: 'grade',
                component: () => import('@/views/service/grade/index')
            },
            {
                name: 'upgrade',
                path: 'grade/upgrade',
                component: () => import('@/views/service/grade/upgrade')
            },
            {
                name: 'addgrade',
                path: 'grade/addgrade',
                component: () => import('@/views/service/grade/addgrade')
            },
            {
                name: 'Payhistory',
                path: 'grade/payhistory',
                component: () => import('@/views/service/grade/Payhistory')
            },
            //模板管理
            {
                name: 'ServiceBoard',
                path: 'board',
                component: () => import('@/views/service/board/index')
            },
            {
                name: 'AddBoard',
                path: 'board/addBoard',
                component: () => import('@/views/service/board/addBoard')
            },
            {
                name: 'DetailBoard',
                path: 'board/detailBoard',
                component: () => import('@/views/service/board/detailBoard')
            },
            //我的服务
            {
                name: 'Myservice',
                path: 'myservice',
                component: () => import('@/views/service/myservice/index')
            },
             //用户等级详情
             {
                name: 'leveldetail',
                path: 'leveldetail',
                component: () => import('@/views/service/myservice/leveldetail')
            },
            //我的服务-等级管理
            {
                name: 'myserviceServiceGrade',
                path: 'myservice/myserviceServiceGrade',
                component: () => import('@/views/service/myservice/grade/grade')
            },
            //我的服务-等级管理-添加等级
            {
                name: 'myserviceaddgrade',
                path: 'myservice/myserviceaddgrade',
                component: () => import('@/views/service/myservice/grade/addgrade')
            },
            //升级服务
            {
                name: 'myserviceupgrade',
                path: 'myservice/myserviceupgrade',
                component: () => import('@/views/service/myservice/grade/upgrade')
            },
            //服务记录
            {
                name: 'ServiceHistory',
                path: 'serviceHistory',
                component: () => import('@/views/service/serviceHistory/index')
            },

        ]
    },
    {
        path: '/notice',
        component: Layout,
        // redirect: '/notice/index',
        children: [
            {
                name: 'Notice',
                path: 'index',
                component: () => import('@/views/notice/index')
            },
            {
                name: 'emailDetails',
                path: 'index/emailDetails',
                component: () => import('@/views/notice/details')
            },
            {
                name: 'Onsite',
                path: 'onsite',
                component: () => import('@/views/notice/onsite')
            },
            {
                name: 'messageDetails',
                path: 'onsite/messageDetails',
                component: () => import('@/views/notice/messageDetails')
            },
            {
                name: "massinformation",
                path: "massinformation",
                component: () =>
                  import(
                    /* webpackChunkName: "notice" */
                    "@/views/notice/massinformation/index"
                  )
            },
            {
                name: "massinformationDetail",
                path: "massinformation",
                component: () =>
                  import(
                    /* webpackChunkName: "notice" */
                    "@/views/notice/massinformation/detail"
                  )
            },
            {
                name: 'userFeedback',
                path: 'userFeedback',
                component: () => import('@/views/notice/userFeedback')
            },
            {
                name: 'feedbackDetails',
                path: 'userFeedback/feedbackDetails',
                component: () => import('@/views/notice/userFeedback/feedbackDetails')
            },
        ]
    },
    {
        path: '/staff',
        component: Layout,
        // redirect: '/staff/index',
        children: [{
            name: 'Staff',
            path: 'index',
            component: () => import('@/views/staff/index')
        },
            {
                name: 'Import',
                path: 'import',
                component: () => import('@/views/staff/import')
            },
            {
                name: 'RoleDispose',
                path: 'role_dispose/:id',
                component: () => import('@/views/staff/roleDispose')
            }
        ]
    }
]

export default new Router({
    mode: 'history',
    base: process.env.VUE_APP_BASE_URL,
    routes: constantRouterMap,
    scrollBehavior: () => ({
        y: 0
    }),
})

export const asyncRouterMap = [{
    path: '/login',
    component: () =>
        import('@/views/login/index'),
    hidden: true
},
    {
        path: '/404',
        component: () =>
            import('@/views/404'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',
        hidden: true,
        meta: {
            title: 'permission',
            icon: 'lock',
            roles: ['admin', 'editor'] // you can set roles in root nav
        },
        children: [{
            path: 'dashboard',
            component: () =>
                import('@/views/dashboard/index'),
            meta: {
                title: 'dashboard',
                icon: 'dashboard'
            }
        }]
    },
    {
        path: '/apply',
        component: Layout,
        name: 'Apply',
        hidden: true,
        meta: {
            title: 'permission',
            icon: 'lock',
            roles: ['admin', 'editor'] // you can set roles in root nav
        }
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]
