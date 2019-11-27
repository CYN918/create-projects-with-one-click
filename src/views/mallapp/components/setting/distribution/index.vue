<template>
  <div class="distribution-wrapper">
    <div class="distr-nav clearfix">
      <div class="tab-item" @click="tabIndex(0)" :class="currentIndex===0 ? 'active' : ''">配送方式</div>
      <div class="tab-item" @click="tabIndex(1)" :class="currentIndex===1 ? 'active' : ''">地址管理</div>
    </div>
    <div class="distr-content">
      <method v-show="currentIndex===0"></method>
      <address-list v-show="currentIndex===1"></address-list>
    </div>
  </div>
</template>

<script>
import Method from './method'
import AddressList from './addressList'

export default {
  name: 'MsettingDistribution',
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    tabIndex (index) {
      this.currentIndex = index
    }
  },
  components: {
    Method,
    AddressList
  }
}
</script>
<style lang="scss" scoped>
  .distribution-wrapper {
    margin: 20px;
    .distr-nav {
      .tab-item {
        float: left;
        font-size: 16px;
        padding: 0 16px;
        line-height: 36px;
        cursor: pointer;
        &.active {
          background: #fff;
          border: 1px solid #d7e0f1;
          border-bottom-color: #fff;
          margin-bottom: -1px;
        }
      }
    }
    .distr-content {
      padding: 40px;
      background: #fff;
      border: 1px solid #d7e0f1;
    }
  }
</style>
