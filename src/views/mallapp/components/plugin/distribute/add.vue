<template>
  <div class="margin">
    <div class="tabs-header">
      <ul class="clearfix">
        <li @click="tabIndex(0)" :class="currentIndex===0 ? 'active' : ''">发送给系统已有用户/用户组</li>
        <li @click="tabIndex(1)" :class="currentIndex===1 ? 'active' : ''">通过表格导入直接需发送的用户</li>
      </ul>
    </div>
    <list v-if="currentIndex===0"></list>
    <import-page v-if="currentIndex===1"></import-page>
  </div>
</template>

<script>
import List from './list'
import ImportPage from './import'
export default {
  name: 'AddDistribute',
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
    List,
    ImportPage
  }
}
</script>

<style lang='scss' scoped>
</style>
