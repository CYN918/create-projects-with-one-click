import Layout from "@/views/layout/index";

export default [
  {
    path: "/permissions",
    component: Layout,
    children: [
      {
        name: "Permissions",
        path: "index",
        component: () =>
          import(
            /* webpackChunkName: "permissions" */
            "@/views/permissions/Organizational/index"
          )
      },
      {
        name: "Addorganizational",
        path: "index/addorganizational",
        component: () =>
          import(
            /* webpackChunkName: "permissions" */
            "@/views/permissions/Organizational/add"
          )
      },
      {
        name: "NumberUsers",
        path: "index/numberUsers",
        component: () =>
            import(
                /* webpackChunkName: "permissions" */
                "@/views/permissions/Organizational/numberUsers"
                )
      },
      {
        name: "DepartmentalStaff",
        path: "index/departmentalStaff",
        component: () =>
            import(
                /* webpackChunkName: "permissions" */
                "@/views/permissions/Organizational/departmentalStaff"
                )
      },
      {
        name: "Addorganizational",
        path: "index/addorganizational",
        component: () =>
            import(
                /* webpackChunkName: "permissions" */
                "@/views/permissions/Organizational/add"
                )
      },
      {
        name: "Addorganizational",
        path: "index/addorganizational",
        component: () =>
            import(
                /* webpackChunkName: "permissions" */
                "@/views/permissions/Organizational/add"
                )
      },
      {
        name: "Role",
        path: "role",
        component: () =>
          import(
            /* webpackChunkName: "permissions" */
            "@/views/permissions/role/index"
          )
      },
      {
        name: "Addrole",
        path: "role/addrole",
        component: () =>
          import(
            /* webpackChunkName: "permissions" */
            "@/views/permissions/role/add"
          )
      },
      {
        name: "User",
        path: "user",
        component: () =>
          import(
            /* webpackChunkName: "permissions" */
            "@/views/permissions/user/index"
          )
      },
      {
        name: "AddUser",
        path: "user/adduser",
        component: () =>
          import(
            /* webpackChunkName: "permissions" */
            "@/views/permissions/user/adduser"
          )
      },
      {
        name: "UserInfo",
        path: "user/userInfo",
        component: () =>
            import(
                /* webpackChunkName: "permissions" */
                "@/views/permissions/user/userInfo"
                )
      },
      {
        name: "Menu",
        path: "menu",
        component: () =>
          import(
            /* webpackChunkName: "permissions" */
            "@/views/permissions/menu/index"
          )
      },
      {
        name: "Addmenu",
        path: "menu/addmenu",
        component: () =>
          import(
            /* webpackChunkName: "permissions" */
            "@/views/permissions/menu/add"
          )
      },
      {
        name: "Authorization",
        path: "authorization",
        component: () =>
          import(
            /* webpackChunkName: "permissions" */
            "@/views/permissions/authorization/index"
          )
      },
      // 职位管理
      {
        name: "position",
        path: "position",
        component: () =>
          import(
            /* webpackChunkName: "permissions" */
            "@/views/permissions/position/index"
          )
      },
       // 职位管理
       {
        name: "addPosition",
        path: "addPosition",
        component: () =>
          import(
            /* webpackChunkName: "permissions" */
            "@/views/permissions/position/addPosition"
          )
      },
    ]
  }
];
