import Layout from "@/views/layout/index";

// ##活动管理结束
export default [{
  path: "/sale",
  component: Layout,
  children: [
    {
      name: 'Inquiry',
      path: 'index',
      component: () => import('@/views/sale/inquiry/index')
  },
      {
          name: 'Offer',
          path: 'offer',
          component: () => import('@/views/sale/offer/index')
      },
      {
          name: 'Project',
          path: 'project',
          component: () => import('@/views/sale/project/index')
      },
      {
          name: 'Orders',
          path: 'orders',
          component: () => import('@/views/sale/orders/index')
      },
      {
          name: 'Contract',
          path: 'contract',
          component: () => import('@/views/sale/contract/index'),

      },
      {
          name: 'Preview',
          path: 'preview',
          component: () => import('@/views/sale/contract/preview'),

      },
      {
          name: 'SalesOrders',
          path: 'salesOrders',
          component: () => import('@/views/sale/salesOrders/index')
      },
      {
          name: 'OrderOut',
          path: 'salesOrders/orderOut',
          component: () => import('@/views/sale/salesOrders/components/checkOut/orderOut')
      },
      {
          name: 'CreatePDF',
          path: 'salesOrders/createPDF',
          component: () => import('@/views/sale/salesOrders/components/pendingContract/createPDF')
      },
   ]
}];