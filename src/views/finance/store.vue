<template>
  <div class="margin">
    <div class="tabs-header">
      <ul class="clearfix">
        <li @click="tabIndex(0)" :class="currentIndex===0 ? 'active' : ''">站点账户管理</li>
        <li @click="tabIndex(1)" :class="currentIndex===1 ? 'active' : ''">站点交易明细</li>
      </ul>
    </div>
    <store-list v-if="currentIndex===0"></store-list>
    <store-detail v-if="currentIndex===1"></store-detail>
  </div>
</template>

<script>
import StoreList from './storeList'
import StoreDetail from './storeDetail'
export default {
  name: 'FinanceStore',
  data () {
    return {
      currentIndex: 0
    }
  },
  created () {
    // if (this.$route.query.currentIndex) {
    //   this.currentIndex = Number(this.$route.query.currentIndex)
    // }
  },
  methods: {
    tabIndex (index) {
      this.currentIndex = index
    }
  },
  components: {
    StoreList,
    StoreDetail
  }
}
</script>
