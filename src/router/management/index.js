import Layout from "@/views/layout/index";

export default [
  {
    path: "/management",
    component: Layout,
    redirect: '/management/index',
    children: [
      {
        name: "delivery",
        path: "index",
        component: () =>
          import(
            /* webpackChunkName: "management" */
            "@/views/management/delivery/index"
          )
      },
      {
        name: "audit",
        path: "audit",
        component: () =>
          import(
            /* webpackChunkName: "management" */
            "@/views/management/audit/index"
          )
      },
      {
        name: "release",
        path: "release",
        component: () =>
          import(
            /* webpackChunkName: "management" */
            "@/views/management/release/index"
          )
      },
      {
        name: "notice",
        path: "notice",
        component: () =>
          import(
            /* webpackChunkName: "management" */
            "@/views/management/notice/index"
          )
      },
      // 设置商品分类折扣
      {
        name: "goods_discount",
        path: "index/discount",
        component: () =>
          import(
            /* webpackChunkName: "management" */
            "@/views/management/delivery/discount"
          )
      }
    ]
  }
];
