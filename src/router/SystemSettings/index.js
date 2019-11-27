import Layout from "@/views/layout/index";

export default [
    {
        path: "/SystemSettings",
        component: Layout,
        // redirect: '/supplier/index',
        children: [
            {
                name: "Initialize",
                path: "index",
                component: () =>
                    import(
                        /* webpackChunkName: "SystemSettings" */
                        "@/views/SystemSettings/Initializeconfig/index"
                        )
            },
            {
                name: "project",
                path: "project",
                component: () =>
                    import(
                        /* webpackChunkName: "SystemSettings" */
                        "@/views/SystemSettings/project/index"
                        )
            },
            {
                name: "system",
                path: "system",
                component: () =>
                    import(
                        /* webpackChunkName: "SystemSettings" */
                        "@/views/SystemSettings/system/index"
                        )
            },
            {
                name: "linesediotdetail",
                path: "system/lines/ediotdetail",
                component: () =>
                    import(
                        /* webpackChunkName: "SystemSettings" */
                        "@/views/SystemSettings/system/auditconfiguration/lines/ediotdetail"
                        )
            },
            {
                name: "linesdetail",
                path: "system/lines/detail",
                component: () =>
                    import(
                        /* webpackChunkName: "SystemSettings" */
                        "@/views/SystemSettings/system/auditconfiguration/lines/detail"
                        )
            },
            {
                name: "paydetail",
                path: "system/pay/detail",
                component: () =>
                    import(
                        /* webpackChunkName: "SystemSettings" */
                        "@/views/SystemSettings/system/pay/detail"
                        )
            },
            {
                name: 'contractSetting',
                path: 'contract',
                component: () => import('@/views/setting/contract')
            },
            {
                name: 'invoiceSetting',
                path: 'invoice',
                component: () => import('@/views/setting/invoice')
            },
        ]
    }
];
