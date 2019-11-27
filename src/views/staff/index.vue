<template>
  <div class="margin">
    <div class="msetting-account-wrapper">
      <div class="tabs-header">
        <ul class="clearfix">
          <li @click="tabIndex(0)" :class="currentIndex===0 ? 'active' : ''">员工列表</li>
          <li @click="tabIndex(1)" :class="currentIndex===1 ? 'active' : ''">角色权限</li>
          <li @click="tabIndex(2)" :class="currentIndex===2 ? 'active' : ''">操作日志</li>
        </ul>
      </div>
      <div class="tabs-content">
        <account-list v-if="currentIndex===0" @toLog="toLog" :roleList="roleList" @toRole="toRole"></account-list>
        <account-role v-if="currentIndex===1" :data="roleList" :PageCount="rolePaginationTotalCount" @seizeChange="initPoleList" @currentChange="initPoleList"></account-role>
        <account-log v-if="currentIndex===2" :storeManagerId="storeManagerId"></account-log>
      </div>
    </div>
  </div>
</template>

<script>
import AccountList from './list'
import AccountLog from './log'
import AccountRole from './role'
import { getRoleList } from '@/api/staff/index'

export default {
  name: 'Staff',
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

      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getRoleList(data).then(res => {
        loading.close()
        this.roleList = res.data.list
        this.rolePaginationTotalCount = res.data.total_count
      })
    }
  },
  components: {
    AccountList,
    AccountRole,
    AccountLog
  }
}
</script>
