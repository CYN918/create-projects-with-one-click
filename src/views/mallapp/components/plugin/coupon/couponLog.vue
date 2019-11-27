<template>
  <div class="margin">
    <div class="tabs-header">
      <ul class="clearfix">
        <li @click="tabIndex(0)" :class="currentIndex===0 ? 'active' : ''">兑换码</li>
        <li @click="tabIndex(1)" :class="currentIndex===1 ? 'active' : ''">兑换链接</li>
      </ul>
    </div>
    <code-list :scoreId="scoreId" v-if="currentIndex ===0"></code-list>
    <link-list :scoreId="scoreId" v-if="currentIndex ===1"></link-list>
  </div>
</template>

<script>
import { hideSiderbarMix } from '@/common/js/mixin'
import CodeList from './codeList'
import LinkList from './linkList'

export default {
  name: 'CouponLog',
  mixins: [hideSiderbarMix],
  data () {
    return {
      currentIndex: 0,
      scoreId: ''
    }
  },
  created () {
    this.scoreId = this.$route.query.id
    this.currentIndex = this.$route.query.type === 2 ? 1 : 0
  },
  methods: {
    tabIndex (index) {
      this.currentIndex = index
      this.showOne = true
    }
  },
  components: {
    CodeList,
    LinkList
  }
}
</script>

<style lang='scss' scoped>
</style>
