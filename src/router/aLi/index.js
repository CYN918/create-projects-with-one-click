import Layout from "@/views/layout/index";

export default [{
  path: "/aLi",
  component: Layout,
  children: [
    {
        name: 'Routine',
        path: 'index',
        component: () => import('@/views/aLi/routine/index')
    },
        {
            name: 'Batch',
            path: 'batch',
            component: () => import('@/views/aLi/batch/index')
        },
        {
            name: 'Store',
            path: 'store',
            component: () => import('@/views/aLi/store/index')
        },
        {
            name: 'Catagory',
            path: 'catagory',
            component: () => import('@/views/aLi/catagory/index')
        },
        {
            name: 'Search',
            path: 'search',
            component: () => import('@/views/aLi/search/index')
        },
        {
            name: 'SetUp',
            path: 'setUp',
            component: () => import('@/views/aLi/setUp/index')
        },
        {
            name: 'HoldAll',
            path: 'holdAll',
            component: () => import('@/views/aLi/holdAll/index')
        },
        {
            name: 'Plug',
            path: 'plug',
            component: () => import('@/views/aLi/plug/index')
        },
   ]
}];