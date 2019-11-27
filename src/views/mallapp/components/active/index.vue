<template>
  <el-main class="make_ticket_steps">
    <section class="sd_jh_drr">
      <section class="sad_jh_dr">
        <img src="@/common/images/f9e5382e3b207dd9a5217671dea7be77.png">
        <section class="sd_jh_deet">
          <section class="cz_w sd_jh_dert">
            <section class="cz_a pd">
              <el-button type="primary" class="w100" @click="routerToAdd">创建活动</el-button>
            </section>
          </section>
        </section>
      </section>
      <div class="item-tit">大转盘</div>
      <div class="item-intro">活动介绍：大转盘小游戏，可以设置1-8个奖项，设置中奖概率，参与规则，界面样式等。活动发布后，用户即可参与游戏。</div>
    </section>
    <section class="sd_jh_drr">
      <section class="sad_jh_dr">
        <img src="@/common/images/a5408251e87d7898c7da46035a2ff32f.png">
        <section class="sd_jh_deet">
          <section class="cz_w sd_jh_dert">
            <section class="cz_a pd">
              <el-button type="primary" class="w100" @click="hf('add_prefer')">创建活动</el-button>
            </section>
          </section>
        </section>
      </section>
      <div class="item-tit">限时特惠</div>
      <div class="item-intro">活动介绍：可选择一些商品，设定活动库存、活动价格及活动时间，在活动时间内，用户即可通过设定的活动价格购买商品。</div>
    </section>
    <section class="sd_jh_drr">
      <section class="sad_jh_dr">
        <img src="@/common/images/8a26dd1620a1e3d2fd9091a4d6b3a0ae.png">
        <section class="sd_jh_deet">
          <section class="cz_w sd_jh_dert">
            <section class="cz_a pd">
              <el-button type="primary" class="w100" @click="hf('/mactive/edit')">创建活动</el-button>
            </section>
          </section>
        </section>
      </section>
      <div class="item-tit">礼品派发</div>
      <div class="item-intro">活动介绍：创建一个礼品派发活动，添加需要派发的礼品，每位用户可领取一次。</div>
    </section>

    <p class="qc"></p>
  </el-main>
</template>

<script>
export default {
  name: 'Active',
  methods: {
    routerToAdd () {
      this.$router.push({ path: '/mactive/turnplate/add' })
    }
  }
}
</script>

<style scoped>
.sd_jh_drr {
  float: left;
  position: relative;
  margin: 20px 0 0 50px;
  background: #fff;
  padding: 10px;
  width: 252px;
  height: 472px;
  border-radius: 6px;
}

.sad_jh_dr {
  height: 374px;
  display: block;
  position: relative;
}

.sad_jh_dr img {
  width: 100%;
  height: 100%;
}

.item-tit {
  font-size: 12px;
  color: #3c3c3c;
  letter-spacing: -0.28px;
  text-align: center;
  margin-top: 10px;
  line-height: 16px;
}

.item-intro {
  margin-top: 4px;
  font-size: 12px;
  color: #a6a6a6;
  letter-spacing: -0.28px;
  line-height: 16px;
}

.sd_jh_dert {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.6);
}
.sd_jh_deet {
  display: none;
}

.sad_jh_dr:hover .sd_jh_deet {
  display: block;
}
</style>
