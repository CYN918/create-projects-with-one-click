<template>
  <div class="margin">
    <div class="msetting-account-wrapper">
      <div class="tabs-header">
        <ul class="clearfix">
          <li @click="tabIndex(0)" :class="currentIndex===0 ? 'active' : ''">自营供应商</li>
          <li @click="tabIndex(1)" :class="currentIndex===1 ? 'active' : ''">第三方供应商</li>
        </ul>
      </div>
      <div class="tabs-content">
        <account-autarky v-if="currentIndex===0" @toLog="toLog" :roleList="roleList" @toRole="toRole"></account-autarky>
        <account-third v-if="currentIndex===1" :data="roleList" :PageCount="rolePaginationTotalCount" @seizeChange="initPoleList" @currentChange="initPoleList"></account-third>
      </div>
    </div>
  </div>
</template>

<script>

import AccountAutarky from './autarky'
import AccountThird from './third'

export default {
  name: 'manages',
  data () {
    return {
      currentIndex: 0,
      storeManagerId: '0',
      roleList: [],
      rolePaginationTotalCount: 0
    }
  },
  created () {
    this._getRoleList(1, 10)
  },
  methods: {
    tabIndex (index) {
      this.currentIndex = index
    },
    toLog (id) {
      this.currentIndex = 2
      this.storeManagerId = id
    },
    toRole () {
      this.currentIndex = 1
    },
    initPoleList (data) {
      this._getRoleList(data.page, data.size)
    },
    _getRoleList (page, size) {
      let data = {}
      data.current_page = page
      data.page_size = size
    }
  },
  components: {
    AccountAutarky,
    AccountThird,
  }
}
</script>
