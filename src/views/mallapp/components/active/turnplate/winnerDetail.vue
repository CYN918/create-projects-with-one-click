<template>
  <div class="margin">
    <el-card class="box-card mbottom" shadow="hover">
      <div slot="header">
        <span>中奖人信息</span>
      </div>
      <p>用户ID：</p>
      <p>手机号:</p>
      <p>微信昵称：</p>
      <p>微信openid：</p>
    </el-card>
    <el-card class="box-card mbottom" shadow="hover">
      <div slot="header">
        <span>获奖信息</span>
      </div>
      <p>中奖时间：</p>
      <p>领奖时间：</p>
      <p>发货时间</p>
      <p>奖品名称：</p>
    </el-card>
    <el-card class="box-card mbottom" shadow="hover">
      <div slot="header">
        <span>领奖信息</span>
      </div>
      <p>收货人：</p>
      <p>手机号：</p>
      <p>发货时间</p>
      <p>收货地址：</p>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ActiveWinnerDetail',
  data () {
    return {
      userPrizeId: ''
    }
  },
  created () {
    this.userPrizeId = this.$route.params.id
  }
}
</script>

<style lang='scss' scoped>
.box-card  {
  p {
    line-height: 1.5;
    font-size: 14px;
    margin-bottom: 10px;
  }
}
</style>
