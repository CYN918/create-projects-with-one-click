<template>
  <div class="main-container">
    <!-- <loading></loading> -->
    <!-- or name="fade" -->
    <!-- <router-view :key="key"></router-view> -->
    <!-- <keep-alive :exclude="['FinanceDetail', 'FinanceSummary', 'RecoderDetail', 'FinanceRechargeOffine', 'ApplyCreate', 'CopyCreate']"> -->
      <router-view/>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
import loading from '@/views/loading/index'
  import { mapState }  from 'vuex'
export default {
  name: 'AppMain',
  components:{
    loading
  }
}
</script>
<style lang="scss" scoped>
.main-container{
  position: relative;
}
</style>
