import Layout from "@/views/layout/index";

export default [
    // mallapp
    {
        path: "/mall",
        name: "Mallapp",
        component: Layout,
        redirect: "/mall/homeEditor",
        children: [
            {
                path: "/mall/homeEditor",
                name: "HomeEditor",
                component: () => import("@/views/mallapp/components/visual/homeEditor")
            },
            {
                path: "/mall/microPage",
                name: "MicroPage",
                component: () => import("@/views/mallapp/components/visual/microPage")
            },
            {
                path: "/mall/commodityTopic",
                name: "CommodityTopic",
                component: () => import("@/views/mallapp/components/visual/commodityTopic")
            },
            {
                path: "/mall/loginPage",
                name: "LoginPage",
                component: () => import("@/views/mallapp/components/visual/loginPage")
            },
            {
                path: "/mall/mainColorTone",
                name: "MainColorTone",
                component: () => import("@/views/mallapp/components/visual/mainColorTone")
            },
            {
                path: "/mall/articleManagement",
                name: "ArticleManagement",
                component: () => import("@/views/mallapp/components/visual/articleManagement")
            },
            {
                path: "/mall/paymentPage",
                name: "PaymentPage",
                component: () => import("@/views/mallapp/components/visual/paymentPage")
            },
            {
                path: "/mall/productDetails",
                name: "ProductDetails",
                component: () => import("@/views/mallapp/components/visual/productDetails")
            },
            {
                path: "/mall/startupPage",
                name: "StartupPage",
                component: () => import("@/views/mallapp/components/visual/startupPage")
            },
            {
                path: "/mall/webpageCopyright",
                name: "WebpageCopyright",
                component: () => import("@/views/mallapp/components/visual/webpageCopyright")
            },
            {
                path: "/mall/add",
                name: "add",
                component: () => import("@/views/mallapp/components/visual/add")
            },

           /* //新增商品专题
            {
                path: "/mall/goodsList/goodsproject",
                name: "goodsproject",
                component: () => import("@/views/mallapp/components/goodsproject/index")
            },
            //商品专题列表
            {
                path: "/mall/goodsList",
                name: "goodsList",
                component: () => import("@/views/mallapp/components/goodsproject/goodsList")
            },
            //编辑专题
            {
                path: "/mall/goodsList/editor",
                name: "editor",
                component: () => import("@/views/mallapp/components/goodsproject/editor")
            },*/
            //集采首页编辑
            {
                path: "/mall/jcHomeEditor",
                name: "jcHomeEditor",
                component: () => import("@/views/mallapp/components/jcvisual/jcHomeEditor")
            },
        ]
    },
    {
        path: "/mgoods",
        component: Layout,
        redirect: "/mgoods/add",
        children: [
            {
                path: "add",
                name: "MgoodsAdd",
                component: () =>
                    import("@/views/mallapp/components/goods/goodsAdd/index")
            },
            {
                path: "my",
                name: "MgoodsMy",
                component: () =>
                    import("@/views/mallapp/components/goods/goodsMy/index")
            },
            {
                path: "record",
                name: "MgoodsRecord",
                component: () => import("@/views/mallapp/components/goods/goodsRecord")
            }
        ]
    },
    {
        path: "/morder",
        component: Layout,
        redirect: "/morder/index",
        children: [
            {
                name: "Morder",
                path: "index",
                component: () => import("@/views/mallapp/components/order/index")
            },
            {
                name: "MorderDetail",
                path: "detail/:id",
                component: () => import("@/views/mallapp/components/order/detail")
            },
            {
                name: "orderExport",
                path: "exportList",
                component: () => import("@/components/orderExportList/index")
            }
        ]
    },
    {
        path: "/muser",
        component: Layout,
        redirect: "/muser/list",
        children: [
            {
                name: "MuserList",
                path: "list",
                component: () =>
                    import("@/views/mallapp/components/user/userList/index")
            },
            {
                name: "MuserDetail",
                path: "detail/:id",
                component: () =>
                    import("@/views/mallapp/components/user/userList/detail")
            },
            {
                name: "MuserImport",
                path: "import",
                component: () => import("@/views/mallapp/components/user/import/index")
            }
            // {
            //     name: 'MuserAdd',
            //     path: 'add',
            //     component: () => import('@/views/mallapp/components/user/addUser/index')
            // }
        ]
    },
    {
        path: "/mfinance",
        component: Layout,
        redirect: "/mfinance/index",
        children: [
            {
                name: "Mfinance",
                path: "index",
                component: () => import("@/views/mallapp/components/finance/index")
            },
            {
                name: "MfinanceDetail",
                path: "detail",
                component: () => import("@/views/mallapp/components/finance/detail")
            }
        ]
    },
    {
        path: "/msetting",
        component: Layout,
        redirect: "/msetting/store",
        children: [
            {
                name: "MsettingStore",
                path: "store",
                component: () =>
                    import("@/views/mallapp/components/setting/store/index")
            },
            {
                name: "MsettingAccount",
                path: "account",
                component: () =>
                    import("@/views/mallapp/components/setting/account/index")
            },
            {
                name: "MsettingRoleDispose",
                path: "role_dispose/:id",
                component: () =>
                    import("@/views/mallapp/components/setting/account/roleDispose")
            },
            {
                name: "MsettingLogin",
                path: "login",
                component: () =>
                    import("@/views/mallapp/components/setting/login/index")
            },
            {
                name: "MsettingShare",
                path: "share",
                component: () =>
                    import("@/views/mallapp/components/setting/share/index")
            },
            {
                name: "MsettingFreight",
                path: "freight",
                component: () =>
                    import("@/views/mallapp/components/setting/freight/index")
            },
            {
                name: "MsettingAgree",
                path: "agree",
                component: () =>
                    import("@/views/mallapp/components/setting/agree/index")
            },
            {
                name: "MsettingDisc",
                path: "disclaimer",
                component: () =>
                    import("@/views/mallapp/components/setting/disclaimer/index")
            },
            {
                name: "MsettingExchangeLimit",
                path: "exchange_limit",
                component: () =>
                    import("@/views/mallapp/components/setting/exchangeLimit/index")
            },
            {
                name: "MsettingDistribution",
                path: "distribution",
                component: () =>
                    import("@/views/mallapp/components/setting/distribution/index")
            }
        ]
    },
    {
        path: "/mplugin",
        component: Layout,
        redirect: "/mplugin/index",
        children: [
            {
                path: "index",
                name: "Ticket",
                component: () => import("@/views/mallapp/components/plugin/ticket")
            },
            {
                path: "add",
                name: "TicketAdd",
                component: () => import("@/views/mallapp/components/plugin/ticket/add")
            },
            {
                path: "set_rules",
                name: "ticketSetRules",
                component: () =>
                    import("@/views/mallapp/components/plugin/ticket/setRules")
            },
            {
                path: "success",
                name: "ticketSuccess",
                component: () =>
                    import("@/views/mallapp/components/plugin/ticket/success")
            },
            {
                path: "ticket_log",
                name: "TicketLog",
                component: () =>
                    import("@/views/mallapp/components/plugin/ticket/ticketLog")
            },
            {
                path: "ticket_detail",
                name: "TicketDetail",
                component: () =>
                    import("@/views/mallapp/components/plugin/ticket/ticketDetail")
            },
            {
                path: "score_log_detail",
                name: "ScoreLogDetial",
                component: () =>
                    import("@/views/mallapp/components/plugin/ticket/scoreLogDetial")
            },
            {
                path: "distribute",
                name: "ScoreDistibute",
                component: () =>
                    import("@/views/mallapp/components/plugin/distribute/index")
            },
            {
                path: "distribute_add",
                name: "AddDistribute",
                component: () =>
                    import("@/views/mallapp/components/plugin/distribute/add")
            },
            {
                path: "distribute_log/:id",
                name: "DistributeLog",
                component: () =>
                    import("@/views/mallapp/components/plugin/distribute/log")
            },
            {
                path: "price_setting",
                name: "PriceSetting",
                component: () =>
                    import("@/views/mallapp/components/plugin/priceSetting/index")
            },
            {
                path: "coupon",
                name: "Coupon",
                component: () =>
                    import("@/views/mallapp/components/plugin/coupon/index")
            },
            {
                path: "coupon_add",
                name: "CouponAdd",
                component: () => import("@/views/mallapp/components/plugin/coupon/add")
            },
            {
                path: "set_coupon",
                name: "SetCoupon",
                component: () =>
                    import("@/views/mallapp/components/plugin/coupon/setCoupon")
            },
            {
                path: "coupon_success",
                name: "CouponSuccess",
                component: () =>
                    import("@/views/mallapp/components/plugin/coupon/success")
            },
            {
                path: "coupon_log",
                name: "CouponLog",
                component: () =>
                    import("@/views/mallapp/components/plugin/coupon/couponLog")
            },
            {
                path: "edit_coupon_link",
                name: "CouponLinkEdit",
                component: () =>
                    import("@/views/mallapp/components/plugin/coupon/couponLinkEdit")
            },
            {
                path: "coupon_link_log",
                name: "CouponLinkReceive",
                component: () =>
                    import("@/views/mallapp/components/plugin/coupon/couponLinkReceive")
            },
            {
                path: "coupon_code_detail",
                name: "CouponCodeDetail",
                component: () =>
                    import("@/views/mallapp/components/plugin/coupon/codeDetail")
            },
            {
                path: "coupon_log_detail",
                name: "CouponLogDetail",
                component: () =>
                    import("@/views/mallapp/components/plugin/coupon/couponLogDetail")
            },
            {
                path: "recharge",
                name: "Recharge",
                component: () =>
                    import("@/views/mallapp/components/plugin/recharge/index")
            },
            {
                path: "approval",
                name: "Approval",
                component: () =>
                    import("@/views/mallapp/components/plugin/approval/index")
            },
            {
                path: "approval/log/:id",
                name: "QuotaLog",
                component: () =>
                    import("@/views/mallapp/components/plugin/approval/quotaLog")
            },
            {
                path: "approval/batch",
                name: "ApprovalBatch",
                component: () =>
                    import("@/views/mallapp/components/plugin/approval/batchIndex")
            }
        ]
    },
    {
        path: "/mactive",
        component: Layout,
        redirect: "/mactive/index",
        children: [
            {
                path: "index",
                name: "Active",
                component: () => import("@/views/mallapp/components/active/index")
            },
            {
                path: "turnplate",
                name: "ActiveTurnplate",
                component: () =>
                    import("@/views/mallapp/components/active/turnplate/index")
            },
            {
                path: "turnplate/add",
                name: "TurnplateAdd",
                component: () => import("@/views/mallapp/components/active/add/index")
            },
            {
                path: "turnplate/redeempool",
                name: "ActiveRedeemPool",
                component: () =>
                    import("@/views/mallapp/components/active/turnplate/redeemPool")
            },
            {
                path: "turnplate/redeempool_detail/:id",
                name: "ActiveRedeemPool",
                component: () =>
                    import("@/views/mallapp/components/active/turnplate/detail")
            },
            {
                path: "turnplate/winner/:id",
                name: "ActiveWinnerList",
                component: () =>
                    import("@/views/mallapp/components/active/turnplate/winnerList")
            },
            {
                path: "turnplate/winner_detail/:id",
                name: "ActiveWinnerDetail",
                component: () =>
                    import("@/views/mallapp/components/active/turnplate/winnerDetail")
            }
        ]
    },
    {
        path: "/article",
        name: "Mallapp",
        component: Layout,
        redirect: "/article/articleClassification",
        children: [
            {
                path: "index",
                component: () => import("@/views/mallapp/components/article/adList/index")
            },
            {
                path: "/article/adPlacement",
                name: "AdPlacement",
                component: () =>
                    import("@/views/mallapp/components/article/adPlacement/index")
            },
            {
                path: "/article/articleClassification",
                name: "ArticleClassification",
                component: () =>
                    import("@/views/mallapp/components/article/articleClassification/index")
            },
            {
                path: "/article/articlManagement",
                name: "ArticlManagement",
                component: () =>
                    import("@/views/mallapp/components/article/articlManagement/index")
            },
            //企业特权-列表
            {
                path: "/article/enterprisePrivilege",
                name: "enterprisePrivilege",
                component: () => import(
                    /* webpackChunkName: "product" */
                    "@/views/mallapp/components/article/EnterprisePrivilege/index"
                    )

            },
            //企业特权-新增&编辑
            {
                path: "/article/enterprisePrivilege/privilegeAddEdit",
                name: "privilegeAddEdit",
                component: () => import("@/views/mallapp/components/article/EnterprisePrivilege/privilegeAddEdit")
            },
            //企业特权-详情
            {
                path: "/article/enterprisePrivilege/privilegeDetail",
                name: "privilegeDetail",
                component: () => import("@/views/mallapp/components/article/EnterprisePrivilege/privilegeDetail")
            },
            //系统公告
            {
                path: "/article/announcement",
                name: "announcement",
                component: () => import("@/views/mallapp/components/announcement/index")
            },
            //新增公告
            {
                path: "/article/announcement/new",
                name: "newAnnouncement",
                component: () => import("@/views/mallapp/components/announcement/new")
            },
            //公告详情
            {
                path: "/article/announcement/detail",
                name: "detailAnnouncement",
                component: () => import("@/views/mallapp/components/announcement/detail")
            },
            //拓展字段
            {
                path: "/article/expand",
                name: "expand",
                component: () => import("@/views/mallapp/components/expand/index")
            },
        ]
    }
];
