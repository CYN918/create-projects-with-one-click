<template>
  <div class="margin mcard">
    <div class="title">券码详情</div>
    <el-table :data="tableData" stripe>
      <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
      <el-table-column label="券码ID" prop="id" align="center"></el-table-column>
      <el-table-column label="兑换码" prop="code" align="center"></el-table-column>
      <el-table-column label="二维码链接" prop="code_url" align="center"></el-table-column>
      <el-table-column label="领取用户" prop="received_user" align="center"></el-table-column>
      <el-table-column label="领取时间" prop="received_time" align="center"></el-table-column>
      <el-table-column label="使用时间" prop="used_time" align="center"></el-table-column>
      <el-table-column label="状态" prop="state" align="center">
        <template slot-scope="scope">{{_state(scope.row.state)}}</template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.current_page"
        :page-size="pagination.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total_count"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { tableMix } from '@/common/js/mixinTable'
import { getCouponLogDetailList } from '@/api/mallapp/plugin/coupon'

export default {
  name: 'CouponLogDetail',
  mixins: [tableMix],
  data () {
    return {
      logId: ''
    }
  },
  created () {
    this.logId = this.$route.query.id
  },
  methods: {
    getTableData () {
      if (this.logId) {
        this.tableSubmitData.log_id = this.logId
        return getCouponLogDetailList(this.tableSubmitData)
      } else {
        return new Promise((resolve, reject) => {
          resolve({ data: {} })
        })
      }
    },
    _state (state) {
      let ret = ''
      switch (state) {
        case '1':
          ret = '未激活'
          break
        case '2':
          ret = '已激活'
          break
        case '3':
          ret = '已领取'
          break
        case '4':
          ret = '已使用'
          break

        default:
          break
      }
      return ret
    }
  },
  watch: {
    logId () {
      this._getTableData()
    }
  }
}
</script>
