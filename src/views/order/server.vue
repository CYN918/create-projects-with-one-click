<template>
  <div class="margin">
    <div class="msetting-account-wrapper">
      <div class="tabs-header">
        <ul class="clearfix">
          <li @click="tabIndex(0)" :class="currentIndex===0 ? 'active' : ''">全部订单</li>
          <li @click="tabIndex(1)" :class="currentIndex===1 ? 'active' : ''">待付款</li>
          <li @click="tabIndex(2)" :class="currentIndex===2? 'active' : ''">待发货</li>
          <li @click="tabIndex(3)" :class="currentIndex===3 ? 'active' : ''">已发货</li>
          <li @click="tabIndex(4)" :class="currentIndex===4? 'active' : ''">已完成</li>
          <li @click="tabIndex(5)" :class="currentIndex===5? 'active' : ''">已取消</li>
          <li @click="tabIndex(6)" :class="currentIndex===6 ? 'active' : ''">售后</li>
          <li @click="tabIndex(7)" :class="currentIndex===7 ? 'active' : ''">待处理</li>
        </ul>
      </div>
      <div class="tabs-content">
        <account-all v-if="currentIndex===0" @toLog="toLog" :roleList="roleList" @toRole="toRole"></account-all>
        <account-obligation v-if="currentIndex===1" :data="roleList" :PageCount="rolePaginationTotalCount" @seizeChange="initPoleList" @currentChange="initPoleList"></account-obligation>
        <account-beshipped v-if="currentIndex===2" @toLog="toLog" :roleList="roleList" @toRole="toRole"></account-beshipped>
        <account-shipped v-if="currentIndex===3" @toLog="toLog" :roleList="roleList" @toRole="toRole"></account-shipped>
        <account-finish v-if="currentIndex===4" @toLog="toLog" :roleList="roleList" @toRole="toRole"></account-finish>
        <account-close v-if="currentIndex===5" @toLog="toLog" :roleList="roleList" @toRole="toRole"></account-close>
        <account-aftermarket v-if="currentIndex===6" @toLog="toLog" :roleList="roleList" @toRole="toRole"></account-aftermarket>
        <account-handle v-if="currentIndex===7" @toLog="toLog" :roleList="roleList" @toRole="toRole"></account-handle>
      </div>
    </div>
  </div>
</template>

<script>

    import AccountAll from './mallall'
    import AccountObligation from './mallobligation'
    import AccountBeshipped from './mallbeshipped'
    import AccountShipped from './mallshipped'
    import AccountFinish from './mallfinish'
    import AccountClose from './mallclose'
    import AccountAftermarket from './mallaftermarket'
    import AccountHandle from './mallhandle'

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
      this.currentIndex  = parseInt(this.$route.query.state)  || 0
    },
    methods: {
      tabIndex (index) {
        this.currentIndex = index
        this.$router.push({path:"/order/server",query:{state:index}})
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
      AccountAll,
      AccountObligation,
      AccountBeshipped,
      AccountShipped,
      AccountFinish,
      AccountClose,
      AccountAftermarket,
      AccountHandle,
    }
  }
</script>
