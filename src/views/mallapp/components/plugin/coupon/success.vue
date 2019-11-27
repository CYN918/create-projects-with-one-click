<template>
  <div class="margin mplugin-set">
    <div class="steps">
      <el-steps :space="200" :active="3" finish-status="success" align-center class="steps-wrapper">
        <el-step title="创建积分券"></el-step>
        <el-step title="设置发放规则"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>

    <section class="mt20 ibox-content df_dx_dret cen">
      <img src="@/common/images/checked_icon_score.png" class="su_cdert cz">
      <span class="fz18 cz ml20" v-if="this.info.type == '1'">兑换码已经生成</span>
      <span class="fz18 cz ml20" v-if="this.info.type == '2'">兑换链接已经生成</span>
      <p
        class="fz15 z6 mt20"
        v-if="this.info.type == '1'"
      >已为您生成兑换码，您可以立即下载此兑换码进行线下印刷，印刷支持兑换码印刷和二维码印刷</p>
      <p
        class="fz15 z6 mt20"
        v-if="this.info.type == '2'"
      >已为您生成兑换链接，您可以立即下载此链接进行线下印刷，印刷支持兑换码印刷和二维码印刷</p>
    </section>

    <section class="pt20 pm20 cen">
      <!-- <a class="el-button el-button--primary btn btn-primary btn-140 inline" href>下载兑换码</a> -->
      <el-button type="primary" class="ml40" v-if="this.info.type == '1'">下载兑换码</el-button>
      <el-button type="primary" plain class="ml40" v-if="this.info.type == '1'">管理兑换码</el-button>
      <el-button
        type="primary"
        plain
        class="ml40"
        v-if="this.info.type == '2'"
        @click="routerToLinkList"
      >查看兑换链接</el-button>
    </section>

    <section class="ibox-content df_dx_dret">
      <p class="my-top-title">教程说明</p>
      <p
        class="mt20 fz15 z6 cen"
        v-if="this.info.type == '1'"
      >您可将兑换码或二维码（可用第三方工具将兑换链接转化成二维码得来），或二者都印刷在实体优惠券上。</p>
      <p class="mt20 fz15 z6 cen" v-if="this.info.type == '2'">您可将兑换链接放在商城首页或微信公众号领取。</p>

      <el-row :gutter="20" class="mt40">
        <el-col :span="2">
          <span class="fz16 z3">优惠券范例</span>
        </el-col>
        <el-col :span="22" class="cen">
          <img src="@/common/images/card_digst_icon.png" class="sd_deert">
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import { hideSiderbarMix } from '@/common/js/mixin'

export default {
  name: 'couponSuccess',
  mixins: [hideSiderbarMix],
  data () {
    return {
      info: {}
    }
  },
  created () {
    this.info = this.$route.query
  },
  methods: {
    routerToLinkList () {
      this.$router.push({ path: '/mplugin/coupon_log', query: { id: this.info.id, type: 2 } })
    }
  }

}
</script>

<style lang='scss' scoped>
.su_cdert {
  width: 80px;
  height: 80px;
}
.sd_deert {
  width: 750px;
}
.steps {
  margin: 0 40px 20px;
  .steps-wrapper {
    width: 600px;
    margin: 0 auto;
  }
}
</style>
