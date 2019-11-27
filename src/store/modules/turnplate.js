const turnplate = {
  state: {
    currentIndex: -1,
    currentEdit: false,
    baseSettingForm: { // 基础设置
      name: '超级大转盘', // 活动标题
      time: [], // [有效期开始(格式：2019-06-04 12:00:00), 有效期结束(格式：2019-06-04 12:00:00)]
      join_num: { // 参与人数
        isshow: '2', // '1' 隐藏， ‘2’ 显示
        num: 10 // 在实际参与人数基础上增
      },
      host: '主办单位', // 主办单位
      prize: '奖项一: 保温杯', // 活动奖品
      explain: '活动规则: 活动期间内, 每个用户只可参与一次' // 活动说明
    },
    conditionForm: { // 抽奖条件
      active_type: '1', // 活动模式: '1' 积分商城活动 '2' 独立活动工具
      free_num: 0, // 免费次数
      integral: '', // 消耗积分
      limit_num: '', // 限制次数： 不填默认为无限次
      share_reward_num: null, // 用户分享成功后,抽奖次数增
      share_reward_open: '0', // 好友助力: '0' 关闭 '1' 分享奖励
      share_reward_type: '1' // 且限制 只可获得一次奖励:  '1' 每天  '2' 永久
    },
    awardSettingForm: {
      pan_list: [{ // 奖项
        prize_type: '1', // 奖品类型: [{id: "1",msg: "实物礼品"}, {id: "2", msg: "再来一次"},{id: "3", msg: "积分奖励"}, {id: "4", msg: "虚拟商品"}, {id: "5", msg: "优惠券"}, {id: "6", msg: "兑换码"}]
        prize_name: '奖项一', // 奖品名称
        turnplate_prize_id: '', // 奖项id， 为空 ‘’ 代表新增
        prize_image: 'http://dkd-oss-image.oss-cn-hangzhou.aliyuncs.com/turnplate/turnplat_git.png', // 奖品图片
        prize_image_id: '', // 已上传图片id： （有id代表已上传图片ID， 为空代表未上传）
        prize_num: '', // 奖品数量
        prize_rate: '', // 中奖概率
        coupon_id: '', // 优惠券id
        redeem_source: '1', // 兑换码来源： ‘1’ 通用兑换码 ‘2’从码池中调取
        redeem_name: '', // 通用兑换码： 如: E2132123342
        redeem_code_explain: '', // 兑换说明
        code_pool_id: '', // 码池id
        send_type: '1', // 派送方式： ‘1’ 快递派送 ‘2’ 线下自提
        prize_points: '', // 赠送积分
        bsd_coupon_id: '' // 虚拟商品id
      }],
      thank_join: { // 谢谢参与
        award_name: '谢谢参与', // 谢谢参与
        award_pic: 'http://dkd-oss-image.oss-cn-hangzhou.aliyuncs.com/turnplate/turnplat_winout.png', // 谢谢参与图片
        award_pic_id: '' // 已上传图片id： （有id代表已上传图片ID， 为空代表未上传）
      }
    },
    advancedForm: {
      button_model: '1', // 功能按键: '1' 隐藏 ‘2’ 页面跳转 ‘3’ 一键关注
      button_name: '', // 按键名称
      link: '', // 跳转链接 如:https://b.boshiying.com
      qr_code: 'http://dkd-oss-image.oss-cn-hangzhou.aliyuncs.com/turnplate/alt_bg.jpeg', // 公众号图片
      qr_code_id: '', // 已上传公众号图片id： （有id代表已上传图片ID， 为空代表未上传）
      share_name: '欢乐大转盘', // 分享名称
      share_describe: '欢乐大转盘，有你更欢乐', // 分享描述
      share_image: 'http://dkd-oss-image.oss-cn-hangzhou.aliyuncs.com/turnplate/sharealt.jpg', // 分享图片
      share_image_id: '' // 已上传分享图片id： （有id代表已上传图片ID， 为空代表未上传）
    },
    ztAddress: []
  },
  mutations: {
    SET_CURRENTINDEX: (state, index) => {
      state.currentIndex = index
    },
    SET_CURRENTEDIT: (state, flag) => {
      state.currentEdit = flag
    }
  },
  getters: {
    baseSettingForm: state => state.baseSettingForm,
    conditionForm: state => state.conditionForm,
    awardSettingForm: state => state.awardSettingForm,
    advancedForm: state => state.advancedForm,
    ztAddress: state => state.ztAddress,
    currentIndex: state => state.currentIndex,
    currentEdit: state => state.currentEdit
  }
}
export default turnplate
