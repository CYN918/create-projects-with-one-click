import Layout from "@/views/layout/index";

export default [{
    path: "/purchase",
    component: Layout,
    children: [
        {
            name: 'enquiry',
            path: 'index',
            component: () => import('@/views/purchase/enquiry/index')
        },
            {
                name: 'Offline',
                path: 'offline',
                component: () => import('@/views/purchase/offline/index')
            },
            {
                name: 'Project',
                path: 'project',
                component: () => import('@/views/purchase/project/index')
            },
            {
                name: 'ProjectOrders',
                path: 'ProjectOrders',
                component: () => import('@/views/purchase/ProjectOrders/index')
            },
            {
                name: 'Approval',
                path: 'approval',
                component: () => import('@/views/purchase/approval/index')
            },
            {
                name: 'Order',
                path: 'order',
                component: () => import('@/views/purchase/order/index')
            },
            {
                name: 'Contract',
                path: 'contract',
                component: () => import('@/views/purchase/contract/index')
            },
            {
                name: 'PreviewPo',
                path: 'previewPo',
                component: () => import('@/views/purchase/contract/preview')
            },
    ]
}];