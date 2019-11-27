const menuList = [
  {
    path: '/mall',
    title: '界面'
  },
  {
    path: '/mgoods',
    title: '商品',
    children: [{
      path: '/mgoods/add',
      title: '添加商品'
    },
    {
      path: '/mgoods/my',
      title: '我的商品'
    },
    {
      path: '/mgoods/record',
      title: '批量改价记录'
    }]
  },
  {
    path: '/mplugin',
    title: '插件',
    children: [{
      path: '/mplugin/index',
      title: '积分券'
    },
    {
      path: '/mplugin/distribute',
      title: '分发积分'
    },
    {
      path: '/mplugin/price_setting',
      title: '积分+现金'
    },
    {
      path: '/mplugin/coupon',
      title: '优惠券'
    }, {
      path: '/mplugin/recharge',
      title: '移动充值'
    },
    {
      path: '/mplugin/approval',
      title: '移动审批'
    }]
  },
  {
    path: '/mactive',
    title: '活动',
    children: [{
      path: '/mactive/index',
      title: '添加活动'
    },
    {
      path: '/mactive/turnplate',
      title: '大转盘'
    }]
  },
  {
    path: '/active',
    title: '活动'
  },
  {
    path: '/morder',
    title: '订单'
  },
  {
    path: '/muser',
    title: '用户',
    children: [{
      path: '/muser/list',
      title: '用户列表'
    },
    {
      path: '/muser/import',
      title: '用户审核'
    },
    // {
    //   path: '/muser/add',
    //   title: '创建用户'
    // }
    ]
  },
  {
    path: '/mfinance',
    title: '财务',
    children: [
      {
        path: '/mfinance/index',
        title: '账户概况'
      },
      {
        path: '/mfinance/detail',
        title: '账户明细'
      }
    ]
  },
  // {
  //   path: '/mdata',
  //   title: '数据'
  // },
  {
    path: '/msetting',
    title: '配置',
    children: [{
      path: '/msetting/store',
      title: '站点信息'
    },
    {
      path: '/msetting/account',
      title: '子账号设置'
    },
    {
      path: '/msetting/login',
      title: '登录页设置'
    },
    {
      path: '/msetting/share',
      title: '分享设置'
    },
    {
      path: '/msetting/freight',
      title: '运费设置'
    },
    {
      path: '/msetting/agree',
      title: '用户协议'
    },
    {
      path: '/msetting/exchange_limit',
      title: '兑换限制'
    },
    {
      path: '/msetting/disclaimer',
      title: '免责声明'
    },
    {
      path: '/msetting/distribution',
      title: '配送模式'
    }]
  },
  {
    path: '/article',
    title: '内容管理',
  },
]
export default menuList
