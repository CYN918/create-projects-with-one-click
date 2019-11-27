<template>
  <div class="margin">
    <div class="tabs-header">
      <ul class="clearfix">
        <li @click="tabIndex(0)" :class="active(0)">功能介绍</li>
        <li @click="tabIndex(1)" :class="active(1)">审批人管理</li>
        <li @click="tabIndex(2)" :class="active(2)">审批记录</li>
        <li @click="tabIndex(3)" :class="active(3)">网点管理</li>
      </ul>
    </div>
    <login-web v-if="currentIndex === 0"></login-web>
    <list v-if="currentIndex === 1"></list>
    <record v-if="currentIndex === 2"></record>
    <quota v-if="currentIndex === 3"></quota>
  </div>
</template>

<script>
import LoginWeb from './loginWeb'
import List from './list'
import Record from './record'
import Quota from './quota'

export default {
  name: 'Approval',
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    tabIndex (index) {
      this.currentIndex = index
    },
    active (index) {
      return this.currentIndex === index ? 'active' : ''
    }
  },
  components: {
    LoginWeb,
    List,
    Record,
    Quota
  }
}
</script>

<style lang='scss' scoped>
</style>
