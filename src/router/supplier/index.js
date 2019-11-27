import Layout from "@/views/layout/index";

export default [
  {
    path: "/supplier",
    component: Layout,
    // redirect: '/supplier/index',
    children: [
      {
        name: "Supplier",
        path: "index",
        component: () =>
          import(
            /* webpackChunkName: "supplier" */
            "@/views/supplier/index"
          )
      },
      {
        name: "SupplierProductAdd11",
        path: "index/supplierproductadd",
        component: () =>
          import(
            /* webpackChunkName: "supplier" */
            "@/views/supplier/add/index"
          )
      },
      {
        name: "SupplierProductListrecycle",
        path: "recycle/goods",
        component: () =>
          import(
            /* webpackChunkName: "supplier" */
            "@/views/supplier/goods/index"
          )
      },
      {
        name: "SupplierProductList",
        path: "files/goods",
        component: () =>
          import(
            /* webpackChunkName: "supplier" */
            "@/views/supplier/goods/index"
          )
      },
      {
        name: "SupplierProductDetail",
        path: "files/goods/goodsdetail",
        component: () =>
          import(
            /* webpackChunkName: "supplier" */
            "@/views/supplier/goods/goodsdetail"
          )
      },
      {
        name: "SupplierProductAdd",
        path: "files/supplierproductadd",
        component: () =>
          import(
            /* webpackChunkName: "supplier" */
            "@/views/supplier/add/index"
          )
      },
      {
        name: "Brandexamine",
        path: "brandexamine",
        component: () =>
          import(
            /* webpackChunkName: "supplier" */
            "@/views/supplier/brandexamine"
          )
      },
      {
        name: "branddetails",
        path: "brandexamine/branddetails",
        component: () =>
          import(
            /* webpackChunkName: "supplier" */
            "@/views/supplier//branddetails"
          )
      },
      {
        name: "SupplierManages",
        path: "manages",
        component: () =>
          import(
            /* webpackChunkName: "supplier" */
            "@/views/supplier/manages/index"
          )
      },
      {
        name: "SupplierVerify",
        path: "verify",
        component: () =>
          import(
            /* webpackChunkName: "supplier" */
            "@/views/supplier/verify"
          )
      },
      {
        name: "SupplierAddfiles3",
        path: "verify/add",
        component: () =>
          import(
            /* webpackChunkName: "supplier" */
            "@/views/supplier/addfiles"
          )
      },
      {
        name: "SupplierThirdPartySupplier",
        path: "files/SupplierThirdPartySupplier",
        component: () =>
          import(
            /* webpackChunkName: "supplier" */
            "@/views/supplier/ThirdPartySupplier"
          )
      },
      {
        name: "SupplierAuditDetail",
        path: "verify/auditDetail",
        component: () =>
          import(
            /* webpackChunkName: "supplier" */
            "@/views/supplier/auditDetail"
          )
      },
      {
        name: "SupplierFiles",
        path: "files",
        component: () =>
          import(
            /* webpackChunkName: "supplier" */
            "@/views/supplier/files"
          )
      },
      {
        name: "SupplierMyFiles",
        path: "myFiles",
        component: () =>
          import(
            /* webpackChunkName: "supplier" */
            "@/views/supplier/myFiles"
          )
      },
      {
        name: "SupplierAddfiles",
        path: "files/add",
        component: () =>
          import(
            /* webpackChunkName: "supplier" */
            "@/views/supplier/addfiles"
          )
      },
      {
        name: "SupplierFilesDetail",
        path: "files/filesDetail",
        component: () =>
          import(
            /* webpackChunkName: "supplier" */
            "@/views/supplier/filesDetail"
          )
      },
      {
        name: "SupplierCatagory",
        path: "catagory",
        component: () =>
          import(
            /* webpackChunkName: "supplier" */
            "@/views/supplier/catagory"
          )
      },
      {
        name: "SupplierRecycle",
        path: "recycle",
        component: () =>
          import(
            /* webpackChunkName: "supplier" */
            "@/views/supplier/recycle"
          )
      },
      {
        name: "SupplierDetails",
        path: "files/supplierDetails",
        component: () =>
            import(
                /* webpackChunkName: "supplier" */
                "@/views/supplier/supplierDetails"
                )
      },
      {
        name: "SupplierGoods",
        path: "files/supplierGoods",
        component: () =>
            import(
                /* webpackChunkName: "supplier" */
                "@/views/supplier/supplierGoods/index"
                )
      }
    ]
  }
];
