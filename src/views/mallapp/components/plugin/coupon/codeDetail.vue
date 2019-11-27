<template>
  <div class="margin">
    <div class="tabs-header">
      <ul class="clearfix">
        <li @click="tabIndex(0)" :class="currentIndex===0 ? 'active' : ''">券码列表</li>
        <li @click="tabIndex(1)" :class="currentIndex===1 ? 'active' : ''">操作历史</li>
      </ul>
    </div>
    <list :codeId="codeId" v-if="currentIndex ===0"></list>
    <log :codeId="codeId" v-if="currentIndex ===1"></log>
  </div>
</template>

<script>
import { hideSiderbarMix } from '@/common/js/mixin'
import List from './codeDetailList'
import Log from './codeDetailLog'

export default {
  name: 'CouponCodeDetail',
  mixins: [hideSiderbarMix],
  data () {
    return {
      currentIndex: 0,
      codeId: ''
    }
  },
  created () {
    this.codeId = this.$route.query.code_id
  },
  methods: {
    tabIndex (index) {
      this.currentIndex = index
    }
  },
  components: {
    List,
    Log
  }
}
</script>
