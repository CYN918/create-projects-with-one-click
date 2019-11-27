<template>
  <div class="margin">
    <div class="tabs-header">
      <ul class="clearfix">
        <router-link to="/finance/message/index" tag="li">短信概览</router-link>
        <router-link to="/finance/message/buy" tag="li">购买短信套餐</router-link>
        <router-link to="/finance/message/list" tag="li">短信签名管理</router-link>
        <router-link to="/finance/message/store" tag="li">站点签名配置</router-link>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Message'
}
</script>

<style lang='scss' scoped>
</style>
