import Layout from "@/views/layout/index";

//##活动管理开始
export default [{
  path: "/activity",
  component: Layout,
  children: [{
    name: 'activityList', // ##活动列表
    path: 'list',
    component: () => import('@/views/activity/activity_list/index')
  }, {
    name: 'editActivity', // 活动编辑
    path: 'list/activityedit',
    component: () => import('@/views/activity/activity_list/common/ActivityInfo')
  }, {
    name: 'activityPro', // 活动商品
    path: 'list/activityproList',
    component: () => import('@/views/activity/activity_list/common/ActivityProList')
  }, {
    name: 'addNewActivity', // 新增活动
    path: 'list/newactivity',
    component: () => import('@/views/activity/activity_list/addNewActivity')
  }, {
    name: 'activityListDetail', // 活动详情
    path: 'list/detail',
    component: () => import('@/views/activity/activity_list/common/ActivityDetail')
  }, {
    name: 'activityRecommend', // ##活动推荐
    path: 'recommend',
    component: () => import('@/views/activity/activity_recommend/index')
  }, {
    name: 'activityRecommendPro', // 活动推荐商品
    path: 'recommend/activityproList',
    component: () => import('@/views/activity/activity_recommend/common/ActivityProList')
  }, {
    name: 'activityDetail', // 活动详情
    path: 'recommend/detail',
    component: () => import('@/views/activity/activity_recommend/common/ActivityDetail')
  }, {
    name: 'activityExamine', // ##活动审核
    path: 'examine',
    component: () => import('@/views/activity/activity_examine/index')
  }, {
    name: 'editExamineActivity', // 活动审核编辑
    path: 'examine/activityedit',
    component: () => import('@/views/activity/activity_examine/common/ActivityInfo')
  }, {
    name: 'activityExamineDetail', // 活动审核详情
    path: 'examine/detail',
    component: () => import('@/views/activity/activity_examine/common/ActivityDetail')
  }, {
    name: 'activityExaminePro', // 活动审核商品
    path: 'examine/activityproList',
    component: () => import('@/views/activity/activity_examine/common/ActivityProList')
  }, {
    name: 'activityNotify', // ##活动通知
    path: 'notify',
    component: () => import('@/views/activity/activity_notify/index')
  }, {
    name: 'editNotifyActivity', // 活动通知编辑
    path: 'notify/activityedit',
    component: () => import('@/views/activity/activity_notify/common/ActivityInfo')
  }, {
    name: 'editNotifyPro', // 活动通知详情
    path: 'notify/activityproList',
    component: () => import('@/views/activity/activity_notify/common/ActivityProList')
  }, {
    name: 'userManagement', // 活动通知/ 用户管理
    path: 'notify/usermanage',
    component: () => import('@/views/activity/activity_notify/UserManage')
  }, {
    name: 'activityManage', // 类型管理
    path: 'manage',
    component: () => import('@/views/activity/activity_manage/index')
  }, {
    name: 'activityFlagship', // 旗舰店
    path: 'flagship',
    component: () => import('@/views/activity/activity_flagship/index')
  }, ]
}];