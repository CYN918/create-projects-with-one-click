import Layout from "@/views/layout/index";

//账户中心
export default [{
    path: "/administration",
    component: Layout,
    children: [
        {
            name: 'Staff',
            path: 'index',
            component: () => import('@/views/administration/staff/index')
        },
        {
            name: 'Wages',
            path: 'wages',
            component: () => import('@/views/administration/wages/index')
        },
        {
            name: 'Payment',
            path: 'payment',
            component: () => import('@/views/administration/payment/index')
        },
        {
            name: 'Record',
            path: 'record',
            component: () => import('@/views/administration/record/index')
        },
        {
            name: 'Statistics',
            path: 'statistics',
            component: () => import('@/views/administration/statistics/index')
        },
        {
            name: 'Annual',
            path: 'annual',
            component: () => import('@/views/administration/annual/index')
        },
        {
            name: 'Attendance',
            path: 'attendance',
            component: () => import('@/views/administration/attendance/index')
        },
        {
            name: 'Leave',
            path: 'leave',
            component: () => import('@/views/administration/leave/index')
        },
        {
            name: 'Kpi',
            path: 'kpi',
            component: () => import('@/views/administration/kpi/index')
        },
    ]
}];