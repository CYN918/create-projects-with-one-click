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
      <span class="fz18 cz ml20">兑换码已经生成</span>
      <p class="fz15 z6 mt20">已为您生成兑换码，您可以立即下载此兑换码进行线下印刷，印刷支持兑换码印刷和二维码印刷</p>
    </section>

    <section class="pt20 pm20 cen">
      <!-- <a class="el-button el-button--primary btn btn-primary btn-140 inline" href>下载兑换码</a> -->
      <el-button type="primary" class="ml40">下载兑换码</el-button>
      <el-button type="primary" plain class="ml40">管理兑换码</el-button>
    </section>

    <section class="ibox-content df_dx_dret">
      <p class="my-top-title">教程说明</p>
      <p class="mt20 fz15 z6 cen">您可将兑换码或二维码（可用第三方工具将兑换链接转化成二维码得来），或二者都印刷在实体 1券上。</p>
      <el-row :gutter="20" class="mt40">
        <el-col :span="2">
          <span class="fz16 z3">1券范例</span>
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
  name: 'ticketSuccess',
  mixins: [hideSiderbarMix],
  data () {
    return {}
  }

}
</script>

<style lang='scss' scoped>
@import "./static/style.scss";
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
