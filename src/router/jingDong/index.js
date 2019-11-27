import Layout from "@/views/layout/index";

export default [{
    path: "/jingDong",
    component: Layout,
    children: [{
            name: 'Crux',
            path: 'index',
            component: () => import('@/views/jingDong/crux/index')
        },
        {
            name: 'Single',
            path: 'single',
            component: () => import('@/views/jingDong/single/index')
        },
        {
            name: 'Store',
            path: 'store',
            component: () => import('@/views/jingDong/store/index')
        },
        {
            name: 'Catagory',
            path: 'catagory',
            component: () => import('@/views/jingDong/catagory/index')
        },
        {
            name: 'SetUp',
            path: 'setUp',
            component: () => import('@/views/jingDong/setUp/index')
        },
        {
            name: 'HoldAll',
            path: 'holdAll',
            component: () => import('@/views/jingDong/holdAll/index')
        },
        {
            name: 'Plug',
            path: 'plug',
            component: () => import('@/views/jingDong/plug/index')
        },
    ]
}];