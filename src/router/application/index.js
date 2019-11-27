import Layout from "@/views/layout/index";

export default [
  {
    path: "/application",
    component: Layout,
    // redirect: '/supplier/index',
    children: [
      {
        name: "applicationIndex",
        path: "index",
        component: () =>
          import(
            /* webpackChunkName: "application" */
            "@/views/application/index"
          )
      },
      {
        name:'createProject',
        path: 'index/createProject',
        component: () =>
          import(
            /* webpackChunkName: "application" */
            "@/views/application/createProject/index"
          )
      },
    ]
  }
];
