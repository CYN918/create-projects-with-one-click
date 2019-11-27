<template>
  <div class="mcard">
    <el-button-group class="mbottom">
      <el-button type="primary" :plain="type" @click="togglePlain(false)">充值明细</el-button>
      <el-button type="primary" :plain="toggleType" @click="togglePlain(true)">充值统计</el-button>
    </el-button-group>
    <recharge-list v-show="!type"></recharge-list>
    <Recharge-stastics v-show="type"></Recharge-stastics>
  </div>
</template>

<script>
import RechargeList from './rechargeList'
import RechargeStastics from './rechargeStatistics'

export default {
  data () {
    return {
      type: false
    }
  },
  computed: {
    toggleType () {
      return !this.type
    }
  },
  methods: {
    togglePlain (flag) {
      this.type = flag
    }
  },
  components: {
    RechargeList,
    RechargeStastics
  }
}
</script>

<style lang='scss' scoped>
</style>
