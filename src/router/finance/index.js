import Layout from "@/views/layout/index";

export default [
  {
    path: "/finance",
    component: Layout,
    // redirect: '/finance/index',
    children: [
      {
        name: "Finance",
        path: "index",
        component: () =>
          import(
            /* webpackChunkName: "finance" */
            "@/views/finance/index"
          )
      },
      {
        name: "FinanceSettings",
        path: "settings",
        component: () =>
          import(
            /* webpackChunkName: "finance" */
            "@/views/finance/settings/index"
          )
      },
      {
        name: "FinanceSummary",
        path: "summary",
        component: () =>
          import(
            /* webpackChunkName: "finance" */
            "@/views/finance/summary"
          )
      },
      {
        name: "FinanceSupplement",
        path: "supplement",
        component: () =>
          import(
            /* webpackChunkName: "finance" */
            "@/views/finance/supplement/index"
          )
      },
      {
        name: "FinanceCgapplication",
        path: "cgapplication",
        component: () =>
          import(
            /* webpackChunkName: "finance" */
            "@/views/finance/cgapplication/index"
          )
      },
      {
        name: "FinanceRefund",
        path: "Refund",
        component: () =>
          import(
            /* webpackChunkName: "finance" */
            "@/views/finance/Refund/index"
          )
      },
      {
        name: "FinanceCollection",
        path: "collection",
        component: () =>
          import(
            /* webpackChunkName: "finance" */
            "@/views/finance/collection/index"
          )
      },
      {
        name: "FinancexcRefund",
        path: "xcRefund",
        component: () =>
          import(
            /* webpackChunkName: "finance" */
            "@/views/finance/xcRefund/index"
          )
      },
      {
        name: "FinanceCustomerInvoice",
        path: "customerInvoice",
        component: () =>
          import(
            /* webpackChunkName: "finance" */
            "@/views/finance/customerInvoice/index"
          )
      },
      {
        name: "FinanceSupplierInvoice",
        path: "supplierInvoice",
        component: () => import("@/views/finance/supplierInvoice/index")
      },
      {
        name: "FinanceBorrowing",
        path: "borrowing",
        component: () =>
          import(
            /* webpackChunkName: "finance" */
            "@/views/finance/borrowing/index"
          )
      },
      {
        name: "FinanceRecharge",
        path: "recharge",
        component: () =>
          import(
            /* webpackChunkName: "finance" */
            "@/views/finance/recharge"
          )
      },
      {
        name: "FinanceRechargeOffine",
        path: "recharge_offline/:money",
        component: () =>
          import(
            /* webpackChunkName: "finance" */
            "@/views/finance/rechargeOffline"
          )
      },
      {
        name: "FinanceDetail",
        path: "detail",
        component: () =>
          import(
            /* webpackChunkName: "finance" */
            "@/views/finance/detail"
          )
      },
      {
        name: "FinanceStore",
        path: "store",
        component: () =>
          import(
            /* webpackChunkName: "finance" */
            "@/views/finance/store"
          )
      },
      {
        name: "FinanceStoreManage",
        path: "store_manage",
        component: () =>
          import(
            /* webpackChunkName: "finance" */
            "@/views/finance/storeManage"
          )
      },
      {
        name: "FinanceInvoice",
        path: "invoice",
        component: () =>
          import(
            /* webpackChunkName: "finance" */
            "@/views/finance/invoice/index"
          )
      },
      {
        name: "FinanceInvoiceInfo",
        path: "invoice/info",
        component: () =>
          import(
            /* webpackChunkName: "finance" */
            "@/views/finance/invoice/info"
          )
      },
      {
        name: "FinanceAddress",
        path: "invoice/address",
        component: () =>
          import(
            /* webpackChunkName: "finance" */
            "@/views/finance/invoice/address"
          )
      },
      {
        name: "FinanceRecoder",
        path: "invoice/recoder",
        component: () =>
          import(
            /* webpackChunkName: "finance" */
            "@/views/finance/invoice/recoder"
          )
      },
      {
        name: "RecoderDetail",
        path: "invoice/recoder_detail",
        component: () =>
          import(
            /* webpackChunkName: "finance" */
            "@/views/finance/invoice/recoderDetail"
          )
      },
      {
        name: "FinanceCashAccount",
        path: "cash_account",
        component: () =>
          import(
            /* webpackChunkName: "finance" */
            "@/views/finance/cashAccount"
          )
      },
      {
        name: "Message",
        path: "message",
        // redirect: 'message/index',
        component: () =>
          import(
            /* webpackChunkName: "finance" */
            "@/views/finance/message/index"
          ),
        children: [
          {
            name: "MessageOverview",
            path: "index",
            component: () =>
              import(
                /* webpackChunkName: "finance" */
                "@/views/finance/message/overview"
              )
          },
          {
            name: "MessageBuy",
            path: "buy",
            component: () =>
              import(
                /* webpackChunkName: "finance" */
                "@/views/finance/message/buy"
              )
          },
          {
            name: "MessageList",
            path: "list",
            component: () =>
              import(
                /* webpackChunkName: "finance" */
                "@/views/finance/message/list"
              )
          },
          {
            name: "MessageStore",
            path: "store",
            component: () =>
              import(
                /* webpackChunkName: "finance" */
                "@/views/finance/message/store"
              )
          },
          {
            name: "MessageAdd",
            path: "add",
            component: () =>
              import(
                /* webpackChunkName: "finance" */
                "@/views/finance/message/add"
              )
          }
        ]
      },
      {
        name: "AccountBook",
        path: "accountBook",
        component: () =>
          import(
            /* webpackChunkName: "finance" */
            "@/views/finance/accountBook/index"
          )
      },
      {
        name: "Voucher",
        path: "voucher",
        component: () =>
          import(
            /* webpackChunkName: "finance" */
            "@/views/finance/voucher/index"
          )  
      },
      {
        name: 'NewRecording',
        path: 'voucher/newRecording',
        component: () => 
        import('@/views/finance/voucher/components/newRecording')
    },
    ]
  }
];
