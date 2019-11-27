import Layout from "@/views/layout/index";

export default [
  {
    path: "/giftvolume",
    component: Layout,
    // redirect: '/finance/index',
    children: [
      { // 主题
        name: "theme",
        path: "theme",
        component: () =>
          import(
            /* webpackChunkName: "theme" */
            "@/views/giftvolume/theme/index"
          )
      },
      {
        name: "addtheme",
        path: "theme/add",
        component: () =>
          import(
            /* webpackChunkName: "addtheme" */
            "@/views/giftvolume/theme/add"
          )
      },
      { // 礼品册
        name: "gv_manual",
        path: "manual",
        component: () =>
          import(
            /* webpackChunkName: "theme" */
            "@/views/giftvolume/manual/index"
            )
      },
      { // 礼品兑换管理
        name: "exchange",
        path: "/giftvolume/manual/exchange",
        component: () =>
          import(
            /* webpackChunkName: "theme" */
            "@/views/giftvolume/manual/exchange"
            )
      },
      { // h5禮品卡冊
        name: "GiftCard",
        path: "/giftvolume/manual/giftCard",
        component: () =>
            import(
                /* webpackChunkName: "theme" */
                "@/views/giftvolume/giftCard/index"
                )
      },
      {
        name: "gv_addmanual",
        path: "manual/add",
        component: () =>
          import(
            /* webpackChunkName: "addtheme" */
            "@/views/giftvolume/manual/add"
            )
      },
      {
        name: "approvalGoodsList",
        path: "manual/approvalGoodsList",
        component: () =>
          import(
            /* webpackChunkName: "addtheme" */
            "@/views/giftvolume/manual/approvalGoodList"
            )
      },
      { // 礼品卡
        name: "gv_card",
        path: "card",
        component: () =>
          import(
            /* webpackChunkName: "theme" */
            "@/views/giftvolume/card/index"
            )
      },
      {
        name: "gv_addcard",
        path: "card/add",
        component: () =>
          import(
            /* webpackChunkName: "addtheme" */
            "@/views/giftvolume/card/add"
            )
      },
      {
        name: "gv_detailcard",
        path: "card/detail",
        component: () =>
          import(
            /* webpackChunkName: "addtheme" */
            "@/views/giftvolume/card/detail"
            )
      },
      { // 礼包
        name: "gv_gift",
        path: "gift",
        component: () =>
          import(
            /* webpackChunkName: "theme" */
            "@/views/giftvolume/gift/index"
            )
      },
      {
        name: "gv_addgift",
        path: "gift/add",
        component: () =>
          import(
            /* webpackChunkName: "addtheme" */
            "@/views/giftvolume/gift/add"
            )
      },
      { // 活动
        name: "gv_activity",
        path: "activity",
        component: () =>
          import(
            /* webpackChunkName: "theme" */
            "@/views/giftvolume/activity/index"
            )
      },
      {
        name: "gv_addactivity",
        path: "activity/add",
        component: () =>
          import(
            /* webpackChunkName: "addtheme" */
            "@/views/giftvolume/activity/add"
            )
      },

    ]
  }
];
