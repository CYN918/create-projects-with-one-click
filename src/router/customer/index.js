import Layout from "@/views/layout/index";

export default [
  {
    path: "/customer",
    component: Layout,
    children: [
      {
        name: "Data",
        path: "index",
        component: () =>
          import(
            /* webpackChunkName: "customer" */
            "@/views/customer/data/index"
          )
      },
      {
        name: "AddCustomer",
        path: "index/add",
        component: () =>
          import(
            /* webpackChunkName: "customer" */
            "@/views/customer/data/add"
          )
      },
      {
        name: "DetailCustomer",
        path: "index/detail",
        component: () =>
          import(
            /* webpackChunkName: "customer" */
            "@/views/customer/data/detail"
          )
      },
      {
        name: "CustomerExamine",
        path: "examine",
        component: () =>
          import(
            /* webpackChunkName: "customer" */
            "@/views/customer/examine/index"
          )
      },
      {
        name: "AddCustomer1",
        path: "examine/add",
        component: () =>
          import(
            /* webpackChunkName: "customer" */
            "@/views/customer/data/add"
          )
      },
      {
        name: "DetailCustomer1",
        path: "examine/detail",
        component: () =>
          import(
            /* webpackChunkName: "customer" */
            "@/views/customer/examine/detail"
          )
      },
      {
        name: "Member",
        path: "member",
        component: () =>
          import(
            /* webpackChunkName: "customer" */
            "@/views/customer/member/index"
          )
      },
      {
        name: "customerRecycle",
        path: "recycle",
        component: () =>
          import(
            /* webpackChunkName: "customer" */
            "@/views/customer/recycle/index"
          )
      },
      {
        name: "salesman",
        path: "salesman",
        component: () =>
            import(
                /* webpackChunkName: "customer" */
                "@/views/customer/salesman/index"
                )
      },
      {
        name: "Industry",
        path: "industry",
        component: () =>
          import(
            /* webpackChunkName: "customer" */
            "@/views/customer/industry/index"
          )
      },
      {
        name: "Mail",
        path: "mail",
        component: () =>
          import(
            /* webpackChunkName: "customer" */
            "@/views/customer/mail/index"
          )
      },
      {
        name: "MailSetting",
        path: "mailSetting",
        component: () =>
          import(
            /* webpackChunkName: "customer" */
            "@/views/customer/mailSetting/index"
          )
      },
      {
        name: "Management",
        path: "management",
        component: () =>
          import(
            /* webpackChunkName: "customer" */
            "@/views/customer/management/index"
          )
      },
      {
        name: "enterpriseExamine",
        path: "enterpriseExamine",
        component: () =>
          import(
            /* webpackChunkName: "customer" */
            "@/views/customer/enterpriseExamine/index"
          )
      },
      {
        name: "enterpriseExamineDetail",
        path: "enterpriseExamine/detail",
        component: () =>
          import(
            /* webpackChunkName: "customer" */
            "@/views/customer/enterpriseExamine/detail"
          )
      },
    ]
  }
];
