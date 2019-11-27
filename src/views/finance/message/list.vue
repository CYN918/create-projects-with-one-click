<template>
  <div class="mcard">
    <div class="title">短信签名管理</div>
    <el-button class="item-btn" type="primary" size="medium" @click="routerToAdd">申请短信签名</el-button>
    <el-table :data="list" stripe border>
      <el-table-column prop="sign_name" label="签名名称" align="center"></el-table-column>
      <el-table-column prop="apply_time" label="申请时间" align="center"></el-table-column>
      <el-table-column prop="process_time" label="处理时间" align="center"></el-table-column>
      <el-table-column prop="state" label="状态" align="center"></el-table-column>
      <el-table-column prop="why" label="驳回原因" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMessageSignList } from '@/api/finance/message'
export default {
  name: 'MessageList',
  data () {
    return {
      list: [{
        sign_name: '', // 签名名称
        apply_time: '', // 申请时间
        process_time: '', // 处理时间
        state: '', // 状态
        why: '-' // 驳回原因
      }]
    }
  },
  created () {
    // this._getMessageSignList()
  },
  methods: {
    routerToAdd () {
      this.$router.push({ path: '/finance/message/add' })
    },
    _getMessageSignList () {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getMessageSignList().then(res => {
        loading.close()
        this.list = res.data.list
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.item-btn {
  margin: 10px 0 20px 0;
}
</style>
