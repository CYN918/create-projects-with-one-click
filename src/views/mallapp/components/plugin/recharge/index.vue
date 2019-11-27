<template>
  <div class="margin">
    <div class="tabs-header">
      <ul class="clearfix">
        <li @click="tabIndex(0)" :class="active(0)">功能设置</li>
        <li @click="tabIndex(1)" :class="active(1)">业务员管理</li>
        <li @click="tabIndex(2)" :class="active(2)">表单设置</li>
        <li @click="tabIndex(3)" :class="active(3)">充值记录</li>
        <li @click="tabIndex(4)" :class="active(4)">更多设置</li>
        <li @click="tabIndex(5)" :class="active(5)">数据导出</li>
      </ul>
    </div>
    <switch-page v-if="currentIndex === 0"></switch-page>
    <list v-if="currentIndex === 1"></list>
     <form-edit v-if="currentIndex === 2"></form-edit>
     <recharge-log v-if="currentIndex === 3"></recharge-log>
     <setting-more v-if="currentIndex === 4"></setting-more>
     <export-page v-if="currentIndex === 5"></export-page>
  </div>
</template>

<script>
import { hideSiderbarMix } from '@/common/js/mixin'
import SwitchPage from './switch'
import List from './list'
import FormEdit from './form'
import RechargeLog from './recharge'
import SettingMore from './setting'
import ExportPage from './export'

export default {
  name: 'Recharge',
  mixins: [hideSiderbarMix],
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
    SwitchPage,
    List,
    FormEdit,
    RechargeLog,
    SettingMore,
    ExportPage
  }
}
</script>
