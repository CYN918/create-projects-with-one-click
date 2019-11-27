import Layout from "@/views/layout/index";

export default [{
    path: "/taoBao",
    component: Layout,
    children: [
        {
            name: 'TaoKe',
            path: 'index',
            component: () => import('@/views/taoBao/taoKe/index')
        },
            {
                name: 'Batch',
                path: 'batch',
                component: () => import('@/views/taoBao/batch/index')
            },
            {
                name: 'Store',
                path: 'store',
                component: () => import('@/views/taoBao/store/index')
            },
            {
                name: 'Catagory',
                path: 'catagory',
                component: () => import('@/views/taoBao/catagory/index')
            },
            {
                name: 'SetUp',
                path: 'setUp',
                component: () => import('@/views/taoBao/setUp/index')
            },
            {
                name: 'HoldAll',
                path: 'holdAll',
                component: () => import('@/views/taoBao/holdAll/index')
            },
            {
                name: 'Plug',
                path: 'plug',
                component: () => import('@/views/taoBao/plug/index')
            },
    ]
}];