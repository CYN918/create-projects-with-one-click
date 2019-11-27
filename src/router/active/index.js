import Mallapp from "@/views/mallapp/index";

export default [
  {
    path: "/active",
    component: Mallapp,
    redirect: "/active/index",
    children: [
      {
        bz: "活动",
        path: "index",              
        component: () =>
          import(
            /* webpackChunkName: "active" */
            "@/views/mactive/index"
          )
      },
      {
        bz: "大转盘列表",
        path: "turnplate_list",
        component: () =>
          import(
            /* webpackChunkName: "active" */
            "@/views/mactive/turnplate_list"
          )
      },
      {
        bz: "码池管理",
        path: "admin_code",
        component: () =>
          import(
            /* webpackChunkName: "active" */
            "@/views/mactive/admin_code"
          )
      },
      {
        bz: "码池管理",
        path: "admin_code_detail",
        component: () =>
          import(
            /* webpackChunkName: "active" */
            "@/views/mactive/admin_code_detail"
          )
      },
      {
        bz: "限时优惠",
        path: "lst",
        component: () =>
          import(
            /* webpackChunkName: "active" */
            "@/views/mactive/lst"
          )
      },
      {
        bz: "签到有礼",
        path: "sign",
        component: () =>
          import(
            /* webpackChunkName: "active" */
            "@/views/mactive/sign"
          )
      },
      {
        bz: "礼品派发",
        path: "dispatch_gift",
        component: () =>
          import(
            /* webpackChunkName: "active" */
            "@/views/mactive/dispatch_gift"
          )
      },
      {
        bz: "创建礼品派发",
        path: "edit",
        component: () =>
          import(
            /* webpackChunkName: "active" */
            "@/views/mactive/edit"
          )
      },
      {
        bz: "创建礼品派发",
        path: "create_turnplate",
        component: () =>
          import(
            /* webpackChunkName: "active" */
            "@/views/mactive/create_turnplate"
          )
      }
    ]
  }
];
