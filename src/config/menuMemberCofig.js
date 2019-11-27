const menuList = [{
  path: '/dashboard',
  title: '首页',
  url:require('../common/images/sideMenu/leftbar_首页_nor.png'),
}, {
  path: '/apply',
  title: '项目管理',
  url:require('../common/images/sideMenu/leftbar_应用_nor.png'),
  children:[{
    path:'/apply/index',
    title:'经销商列表'
  },
  {
    path:'/apply/examine',
    title:'经销商审核'
  }
]
},{
  path:'/customer',
  title:'客户管理',
  icont:'icon-customer',
  url:require('../common/images/sideMenu/leftbar_客户管理_nor.png'),
  children:[{
    path:'/customer/index',
    title:'客户资料'
  },
  {
    path:'/customer/examine',
    title:'客户审核'
  },
  {
    path:'/customer/member',
    title:'商城会员'
  },
  {
    path:'/customer/industry',
    title:'行业分类',
  },
  {
    path:'/customer/mail',
    title:'邮件管理',
  },
  {
    path:'/customer/mailSetting',
    title:'邮件设置',
  },
  {
    path:'/customer/management',
    title:'商机管理',
  },
    {
      path:'/customer/salesman',
      title:'销售员管理',
    }
]
},{
  path:'/sale',
  title:'销售管理',
  icont:'icon-fuwushangxinxi',
  url:require('../common/images/sideMenu/leftbar_销售管理_nor.png'),
  children:[{
    path:'/sale/index',
    title:'客户询价单'
  },
  {
    path: '/sale/salesOrders',
    title: '销售订单'
  },
  {
    path: '/sale/contract',
    title: '合同管理'
  },
 

]
},
{
  path: '/product',
  title: '商品管理',
  icont:'icon-shangpin-tianchong',
  url:require('../common/images/sideMenu/leftbar_商品管理_nor.png'),
  children: [
    {
    path: '/product/index',
    title: '商品列表'
  },
  {
    path: '/product/audit',
    title: '商品审核'
  },
  // {
  //   path: '/product/shelves',
  //   title: '停产商品'
  // },
  {
    path: '/product/catagory',
    title: '商品分类'
  },
  {
    path: '/product/comments',
    title: '用户评论'
  },
  {
    path: '/product/brand',
    title: '商品品牌'
  },
  {
    path: '/product/type',
    title: '商品类型'
  },
  {
    path: '/product/specifications',
    title: '商品规格'
  },
  {
    path: '/product/virtual',
    title: '虚拟商品'
  },
  {
    path: '/product/recycle',
    title: '商品回收站'
  },
  // {
  //   path: '/product/addvirtual',
  //   title: '添加虚拟商品'
  // },
  {
    path: '/product/buyer',
    title: '采购员列表'
  },
  // {
  //   path: '/product/import',
  //   title: '多货号导入'
  // },
]
},
//  {
//   path: '/market',
//   title: '商品管理',
//   icont:'icon-shangpin-tianchong'
// },
 {
  path: '/order',
  title: '订单管理',
  icont:'icon-kejian',
  url:require('../common/images/sideMenu/leftbar_订单管理_nor.png'),
  children: [{
    path: '/order/index',
    title: '商品订单'
  },
  {
    path: '/order/server',
    title: '服务订单',
  },
  {
    path: '/order/aftersales',
    title: '售后服务',
  },
]
}, {
  path: '/supplier',
  title: '商家管理',
  icont:'icon-gongyingshangguanli',
  url:require('../common/images/sideMenu/leftbar_供应商管理_nor.png'),
  children: [{
    path: '/supplier/index',
    title: '待审核商品'
  },
  {
    path: '/supplier/brandexamine',
    title: '品牌审核'
  },
  {
    path: '/supplier/verify',
    title: '供应商审核'
  },
  {
    path: '/supplier/files',
    title: '供应商档案'
  },
  {
    path: '/supplier/catagory',
    title: '分类管理'
  },
  {
    path: '/supplier/recycle',
    title: '档案回收站'
  },]
},{
    path:'/purchase',
    title:'采购管理',
    icont:'icon-yingyongicon_huaban',
    url:require('../common/images/sideMenu/leftbar_采购管理_nor.png'),
    children:[{
      path:'/purchase/index',
      title:'采购询价'
    },{
      path:'/purchase/offline',
      title:'采购申请'
    },
    {
      path:'/purchase/project',
      title:'项目采购申请'
    },
    {
      path:'/purchase/approval',
      title:'报价审核'
    },
    {
      path:'/purchase/order',
      title:'采购订单'
    },
    // {
    //   path:'/purchase/ProjectOrders',
    //   title:'项目采购订单'
    // },
    {
      path:'/purchase/contract',
      title:'合同管理'
    },]
},{
  path: '/finance',
  title: '财务管理',
  icont:'icon-guanli',
  url:require('../common/images/sideMenu/leftbar_财务管理_nor.png'),
  children: [
    {
      path: '/finance/accountBook',
      title: '账簿管理'
    },
    {
      path:'/finance/voucher',
      title:'凭证管理'
    },
    {
    path: '/finance/index',
    title: '财务概览'
  }, {
    path: '/finance/summary',
    title: '财务汇总'
  }, {
    path: '/finance/detail',
    title: '财务明细'
  }, {
    path: '/finance/store',
    title: '站点财务'
  }, {
    path: '/finance/invoice',
    title: '发票管理'
  }, {
    path: '/finance/cash_account',
    title: '提现账户'
  }, {
    path: '/finance/message',
    title: '短信管理'
  },
  {
    path: '/finance/borrowing',
    title: '员工借款'
  },
  {
    path: '/finance/supplement',
    title: '员工报销'
  },
  {
    path: '/finance/cgapplication',
    title: '采购付款申请'
  },
  {
    path: '/finance/Refund',
    title: '采购退款申请'
  },
  {
    path: '/finance/collection',
    title: '销售收款申请'
  },
  {
    path: '/finance/xcRefund',
    title: '销售退款申请'
  },
  
  {
    path: '/finance/customerInvoice',
    title: '客服发票管理'
  },
  {
    path: '/finance/supplierInvoice',
    title: '供应商发票管理'
  },
  
  
]
},{
    path:'/aftermarket',
    title:'售后管理',
    icont:'icon-shouhoukefu',
    url:require('../common/images/sideMenu/leftbar_售后管理_nor.png'),
},{
  path:'/administration',
  title:'行政管理',
  icont:'icon-hangzhengguanli',
  url:require('../common/images/sideMenu/leftbar_行政管理_nor.png'),
  children:[{
    path:'/administration/index',
    title:'员工管理'
  },
  {
    path:'/administration/wages',
    title:'工资管理'
  },
  {
    path:'/administration/payment',
    title:'工资发放'
  },
  {
    path:'/administration/record',
    title:'发放记录'
  },
  {
    path:'/administration/statistics',
    title:'工资统计'
  },
  {
    path:'/administration/annual',
    title:'年度工资'
  },
  {
    path:'/administration/attendance',
    title:'考勤管理'
  },
  {
    path:'/administration/leave',
    title:'请假条'
  },
  {
    path:'/administration/kpi',
    title:'KPI管理'
  },
  {
    path:'/administration/notice',
    title:'公告管理'
  },]
},{
  path:'/storage',
  title:'仓储管理',
  url:require('../common/images/sideMenu/leftbar_仓储管理_nor.png'),
  children:[{
    path:'/storage/index',
    title:'项目采购待入库'
  },
  // {
  //   path:'/storage/beforerelease',
  //   title:'项目订单待出库'
  // },
  {
    path:'/storage/outStorage',
    title:'待出库订单'
  },
  {
    path:'/storage/shipment',
    title:'销售出货清单'
  },
  {
    path:'/storage/outbound',
    title:'商品出库单'
  },
  {
    path:'/storage/return',
    title:'销售退货入库'
  },
  {
    path:'/storage/mrb',
    title:'采购退货单'
  },
  {
    path:'/storage/inquiry',
    title:'商品库存查询'
  },
  {
    path:'/storage/allocation',
    title:'库间调拨'
  },
  {
    path:'/storage/inventory',
    title:'库存盘点'
  },
  {
    path:'/storage/list',
    title:'仓库列表'
  },
  {
    path:'/storage/stock',
    title:'安全库存'
  }
]
}, {
  path: '/data',
  title: '数据台',
  url:require('../common/images/sideMenu/数据台_nor.png'),
  children: [{
    path: '/data/index',
    title: '今日数据'
  }, {
    path: '/data/revenue',
    title: '营收数据'
  }, {
    path: '/data/application',
    title: '应用数据'
  }]
}, {
  path: '/service',
  title: '服务中心',
  url:require('../common/images/sideMenu/leftbar_服务商大厅_nor.png'),
  children: [
  //   {
  //   path: '/service/index',
  //   title: '我的服务'
  // }, {
  //   path: '/service/agreement',
  //   title: '服务协议'
  // }, {
  //   path: '/service/develop',
  //   title: '项目定制开发单'
  // },
  {
    path: '/service/index',
    title: '服务管理'
  }, {
    path: '/service/board',
    title: '模板管理'
  }, {
    path: '/service/grade',
    title: '等级管理'
  },]
}, {
  path: '/notice',
  title: '通知提醒',
  url:require('../common/images/sideMenu/leftbar_通知提醒_nor.png'),
}, {
  path: '/setting',
  title: '设置',
  url:require('../common/images/sideMenu/leftbar_设置_nor.png'),
  children: [{
    path: '/setting/index',
    title: '个人设置'
  }, {
    path: '/setting/safe',
    title: '安全设置'
  }, {
    path: '/setting/auth',
    title: '企业认证'
  },
  {
    path: '/setting/return_address',
    title: '退货地址设置'
  },
  {
    path: '/setting/basic',
    title: '基本设置'
  },
  // {
  //   path: '/setting/variable',
  //   title: '基础变量'
  // },
  {
    path: '/SystemSettings/contract',
    title: '合同公司'
  },
  {
    path: '/setting/log',
    title: '系统日志'
  },
  {
    path: '/setting/department',
    title: '部门管理'
  },
]
}, 
// {
//   path: '/staff',
//   title: '组织架构',
//   url:require('../common/images/sideMenu/leftbar_组织架构_nor.png'),
//   children: [{
//     path: '/staff/index',
//     title: '员工设置'
//   }, {
//     path: '/staff/import',
//     title: '批量导入'
//   }]
// },
 {
  path: '/permissions',
  title: '权限管理',
  url:require('../common/images/sideMenu/权限管理_nor.png'),
  children: [{
    path: '/permissions/index',
    title: '组织架构'
  }, {
    path: '/permissions/role',
    title: '角色管理'
  },
  {
    path: '/permissions/user',
    title: '用户管理'
  },
  {
    path: '/permissions/menu',
    title: '菜单管理'
  },
  // {
  //   path: '/permissions/authorization',
  //   title: '授权管理'
  // }
]
},
{
  path:'/taoBao',
  title:'淘宝',
  url:require('../common/images/sideMenu/leftbar_销售管理_nor.png'),
  children:[{
    path:'/taoBao/index',
    title:'淘客API采集'
  },
  {
    path: '/taoBao/batch',
    title: '批量ID采集'
  },
  {
    path: '/taoBao/store',
    title: '店铺采集'
  },
  {
    path: '/taoBao/catagory',
    title: '按分类采集'
  },
  {
    path: '/taoBao/setUp',
    title: '采集设置'
  },
  {
    path: '/taoBao/holdAll',
    title: '工具箱'
  },
  {
    path: '/taoBao/plug',
    title: '插件信息'
  },]
},
{
  path:'/jingDong',
  title:'京东',
  url:require('../common/images/sideMenu/leftbar_销售管理_nor.png'),
  children:[{
    path:'/jingDong/index',
    title:'关键词采集'
  },
  {
    path: '/jingDong/single',
    title: '单品采集'
  },
  {
    path: '/jingDong/store',
    title: '店铺采集'
  },
  {
    path: '/jingDong/catagory',
    title: '按分类采集'
  },
  {
    path: '/jingDong/setUp',
    title: '采集设置'
  },
  {
    path: '/jingDong/holdAll',
    title: '工具箱'
  },
  {
    path: '/jingDong/plug',
    title: '插件信息'
  },]
},
{
  path:'/aLi',
  title:'阿里',
  url:require('../common/images/sideMenu/leftbar_销售管理_nor.png'),
  children:[{
    path:'/aLi/index',
    title:'常规采集'
  },
  {
    path: '/aLi/batch',
    title: '批量ID采集'
  },
  {
    path: '/aLi/store',
    title: '店铺采集'
  },
  {
    path: '/aLi/catagory',
    title: '按分类采集'
  },
  {
    path: '/aLi/search',
    title: '搜索页采集'
  },
  {
    path: '/aLi/setUp',
    title: '采集设置'
  },
  {
    path: '/aLi/holdAll',
    title: '工具箱'
  },
  {
    path: '/aLi/plug',
    title: '插件信息'
  },
  ]
},
  {
    path:'/article',
    title:'内容管理',
    url:require('../common/images/sideMenu/leftbar_销售管理_nor.png'),
    children:[{
      path:'/article/adList',
      title:'广告列表'
    },
      {
        path: '/article/adPlacement',
        title: '广告分类'
      },
      {
        path: '/article/articleClassification',
        title: '文章分类'
      },
      {
        path: '/article/articlManagement',
        title: '文章列表'
      },
    ]
  },
  {
    path:'/mall',
    title:'界面管理',
    url:require('../common/images/sideMenu/leftbar_销售管理_nor.png'),
    children:[{
      path:'/mall/homeEditor',
      title:'首页编辑'
    },
      {
        path: '/mall/microPage',
        title: '微页面'
      },
      {
        path: '/mall/commodityTopic',
        title: '商品专题'
      },
      {
        path: '/mall/loginPage',
        title: '登录页'
      },
      {
        path: '/mall/mainColorTone',
        title: '主色调'
      },
      {
        path: '/mall/articleManagement',
        title: '文章管理'
      },
      {
        path: '/mall/paymentPage',
        title: '支付成功页'
      },
      {
        path: '/mall/productDetails',
        title: '商品详情页'
      },
      {
        path: '/mall/startupPage',
        title: '启动页'
      },
      {
        path: '/mall/webpageCopyright',
        title: '网页版权'
      },
      {
        path: '/mall/add',
        title: '新增页面'
      },
    ]
  },
]
export default menuList
