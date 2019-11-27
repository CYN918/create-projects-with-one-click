<template>
  <div class="margin">
    <div class="tabs-header">
      <ul class="clearfix">
        <li @click="tabIndex(0)" :class="currentIndex===0 ? 'active' : ''">券码列表</li>
        <li @click="tabIndex(1)" :class="currentIndex===1 ? 'active' : ''">操作历史</li>
      </ul>
    </div>
    <list :scoreId="score_id" v-if="currentIndex ===0"></list>
    <log :scoreId="score_id" v-if="currentIndex ===1"></log>
  </div>
</template>

<script>
import { hideSiderbarMix } from '@/common/js/mixin'
import List from './ticketDetailList'
import Log from './ticketDetailLog'

export default {
  name: 'TicketDetail',
  mixins: [hideSiderbarMix],
  data () {
    return {
      currentIndex: 0,
      score_id: ''
    }
  },
  created () {
    this.score_id = this.$route.query.score_id
  },
  methods: {
    tabIndex (index) {
      this.currentIndex = index
      this.showOne = true
    }
  },
  components: {
    List,
    Log
  }
}
</script>

<style lang='scss' scoped>
</style>
