<template>
  <div>
    <div class="mcard mbottom">
      <div class="title">短信剩余条数</div>
      <div class="number">
        800条
      </div>
      <el-button type="primary" size="medium" @click="routerToBuy">购买短信套餐</el-button>
    </div>
    <div class="mcard mbottom">
      <div class="title">短信签名</div>
       <div class="number">
        100个
      </div>
      <div>
        <el-button type="text" @click="routerToAdd">签名申请</el-button>
        <span class="space">|</span>
        <el-button type="text" @click="routerToList">管理签名</el-button>
      </div>
    </div>
    <div class="mcard">
      <div class="title">站点签名配置</div>
      <p class="tip">创建新站点/卡券后，默认签名为【博士鹰】，您可配置指定站点/卡券使用其他已申请成功的签名</p>
      <div>
        <el-button type="text" @click="routerToStore">站点签名配置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageOverview',
  methods: {
    routerToBuy () {
      this.$router.push({ path: '/finance/message/buy' })
    },
    routerToAdd () {
      this.$router.push({ path: '/finance/message/add' })
    },
    routerToList () {
      this.$router.push({ path: '/finance/message/list' })
    },
    routerToStore () {
      this.$router.push({ path: '/finance/message/store' })
    }
  }
}
</script>

<style lang='scss' scoped>
.number {
  font-size: 32px;
  font-weight: 700;
  margin: 40px 0;
}
.space {
  margin: 0 20px;
}
.tip {
  font-size: 14px;
}
</style>
