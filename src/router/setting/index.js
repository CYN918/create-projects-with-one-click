import Layout from "@/views/layout/index";

//账户中心
export default [{
  path: "/setting",
  component: Layout,
  children: [
    {
        name: 'SelfSetting',
        path: 'index',
        component: () => import('@/views/setting/index')
    },
        {
            name: 'SafeSetting',
            path: 'safe',
            component: () => import('@/views/setting/safe')
        },
        {
            name: 'AuthSetting',
            path: 'auth',
            component: () => import('@/views/setting/auth')
        },
        {
            name: 'AddressSetting',
            path: 'return_address',
            component: () => import('@/views/setting/returnAddress')
        },
        {
            name: 'BasicSetting',
            path: 'basic',
            component: () => import('@/views/setting/basic')
        },
        {
            name: 'variableSetting',
            path: 'variable',
            component: () => import('@/views/setting/variable')
        },
        {
            name: 'logSetting',
            path: 'log',
            component: () => import('@/views/setting/log')
        },
        {
            name: 'departmentSetting',
            path: 'department',
            component: () => import('@/views/setting/department')
        },
        {
            name: 'MyFiles',
            path: 'my_files',
            component: () => import('@/views/setting/myFiles')
        },
        //经销商
        {
            path: 'my_files/myagenteditor',
            name: 'myagenteditor',
            component: () => import('@/views/setting/myFiles/myagenteditor')
        },
        {
            path: 'my_files/myagentdetail',
            name: 'myagentdetail',
            component: () => import('@/views/setting/myFiles/myagentdetail')
        },
        //客戶
        {
            path: 'my_files/myclientadd',
            name: 'myclientadd',
            component: () => import('@/views/setting/myFiles/myclientadd')
        },
        {
            path: 'my_files/myclientdetail',
            name: 'myclientdetail',
            component: () => import('@/views/setting/myFiles/myclientdetail')
        },
        //供应商
        {
            path: 'my_files/mysupplierDetail',
            name: 'mysupplierDetail',
            component: () => import('@/views/setting/myFiles/mysupplierDetail')
        },
        {
            path: 'my_files/mysupplieredit',
            name: 'mysupplieredit',
            component: () => import('@/views/setting/myFiles/mysupplieredit')
        },
        {
            path: 'my_files/mybackstageedit',
            name: 'mybackstageedit',
            component: () => import('@/views/setting/myFiles/mybackstageedit')
        },
        {
            path: 'my_files/mybackstagedetail',
            name: 'mybackstagedetail',
            component: () => import('@/views/setting/myFiles/mybackstagedetail')
        },
        {
            name: 'MyFilesDetail',
            path: 'my_files/detail',
            component: () => import('@/views/supplier/myFilesDetail')
        },
        {
            name: 'MyFilesEdit',
            path: 'my_files/edit',
            component: () => import('@/views/supplier/myFilesEdit')
        },
   ]
}];