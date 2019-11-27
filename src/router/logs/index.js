import Layout from "@/views/layout/index";

export default [
  {
    path: "/logs",
    component: Layout,
    redirect: '/logs/index',
    children: [
      {
        name: "login",
        path: "index",
        component: () =>
          import(
            /* webpackChunkName: "management" */
            "@/views/logs/login/index"
          )
      },
      {
        name: "order",
        path: "order",
        component: () =>
          import(
            /* webpackChunkName: "management" */
            "@/views/logs/order/index"
          )
      }
    ]
  }
];
