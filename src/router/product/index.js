import Layout from "@/views/layout/index";

export default [
    {
        path: "/product",
        component: Layout,
        // redirect: '/product/index',
        children: [
            {
                name: "ProductList",
                path: "index",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/goods"
                        )
            },
            {
                name: "Myjd",
                path: "index/myjd",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/goods/myjd"
                        )
            },
            {
                name: "Myyx",
                path: "index/myyx",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/goods/myyx"
                        )
            },
            {
                name: "Mysn",
                path: "index/mysn",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/goods/mysn"
                        )
            },
            {
                name: "GoodsDetail",
                path: "index/goodsdetail",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/addetail"
                        )
            },
            {
                name: "ProductAdd",
                path: "index/add",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/add"
                        )
            },
            {
                name: "ProductaduitAdd",
                path: "audit/add",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/add"
                        )
            },
            {
                name: "ProductvirtualAdd",
                path: "virtual/add",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/virtual/add"
                        )
            },
            {
                name: "Productaudit",
                path: "audit/add",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/add"
                        )
            },
            {
                name: "ProductAudit",
                path: "audit",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/audit"
                        )
            },
            {
                name: "ProductAuditdetails",
                path: "audit/Auditdetails",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/audit/Auditdetails"
                        )
            },
            // {
            //   name: 'ProductAdd11',
            //   path: 'audit/add',
            //   component: () => import('@/views/product/add/index')
            // },
            {
                name: "ProductShelves",
                path: "shelves",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/shelves"
                        )
            },
            {
                name: "ProductBuyer",
                path: "buyer",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/buyer"
                        )
            },
            {
                name: "ProductComments",
                path: "comments",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/comments"
                        )
            },
            {
                name: "Checkcomments",
                path: "comments/detail",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/comments/detail"
                        )
            },
            {
                name: "ProductPush",
                path: "push",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/push"
                        )
            },
            {
                name: "ProductImport",
                path: "import",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/import"
                        )
            },
            {
                name: "ProductBrand",
                path: "brand",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/brand"
                        )
            },
            // {
            //   name: "ProductVirtual",
            //   path: "virtual",
            //   component: () =>
            //     import(
            //       /* webpackChunkName: "product" */
            //       "@/views/product/virtual"
            //     )
            // },
            {
                name: "ProductAddvirtual",
                path: "virtual/addvirtual",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/addvirtual"
                        )
            },
            {
                name: "Addbrand",
                path: "brand/addbrand",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/brand/add"
                        )
            },
            {
                name: "ProductCatagory",
                path: "catagory",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/catagory"
                        )
            },
            {
                name: "Addcatagory",
                path: "catagory/addcatagory",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/catagory/add"
                        )
            },
            {
                name: "Reslated",
                path: "catagory/reslated",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/catagory/reslated"
                        )
            },
            {
                name: "ProductSpecifications",
                path: "specifications",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/specifications"
                        )
            },
            {
                name: "ProductSpecAttribute",
                path: "specifications/specAttribute",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/specifications/specAttribute"
                        )
            },
            {
                name: "AddProductSpecAttribute",
                path: "specifications/addspecAttribute",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/specifications/addspecAttribute"
                        )
            },
            {
                name: "Addspecifications",
                path: "specifications/addspecifications",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/specifications/add"
                        )
            },
            {
                name: "ProductGroup",
                path: "group",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/group"
                        )
            },
            {
                name: "Addgroup",
                path: "type/addgroup",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/group/add"
                        )
            },
            {
                name: "ProductType",
                path: "type",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/type"
                        )
            },
            {
                name: "ProductTypeadd",
                path: "type/add",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/type/add"
                        )
            },
            {
                name: "ProductTypeattribute",
                path: "type/attribute",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/type/attribute"
                        )
            },
            {
                name: "ProductTypeaddAttribute",
                path: "type/addAttribute",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/type/addAttribute"
                        )
            },
            {
                name: "ProductRecycle",
                path: "recycle",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/recycle/index"
                        )
            },
            //折扣率申请
            {
                name: "discount",
                path: "discount",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/discount/index"
                        )
            },
            //折扣费率审核
            {
                name: "discountAudit",
                path: "discountAudit",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/discountAudit/index"
                        )
            },
            //折扣费率详情
            {
                name: "discountAuditDetail",
                path: "discountAudit/detail",
                component: () =>
                    import(
                        /* webpackChunkName: "product" */
                        "@/views/product/discountAudit/detail"
                        )
            },


            //商品专题列表
            {
                path: "mallgoodsList",
                name: "goodsList",
                component: () => import(
                    /* webpackChunkName: "product" */
                    "@/views/mallapp/components/goodsproject/goodsList"
                    )
            },
            //新增商品专题
            {
                path: "mallgoodsList/mallgoodsproject",
                name: "goodsproject",
                component: () => import(
                    /* webpackChunkName: "product" */
                    "@/views/mallapp/components/goodsproject/index"
                    )
            },
            //编辑专题
            {
                path: "mallgoodsList/editor",
                name: "editor",
                component: () => import(
                    /* webpackChunkName: "product" */
                    "@/views/mallapp/components/goodsproject/editor"
                    )
            },
        ]
    }
];
