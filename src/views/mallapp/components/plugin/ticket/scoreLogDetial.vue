<template>
  <div class="margin mcard">
    <el-button type="primary" class="mbottom" size="small">导出全部</el-button>
    <el-table :data="tableData" stripe>
      <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
      <el-table-column label="编号" prop="serial_number" align="center"></el-table-column>
      <el-table-column label="兑换码" prop="code_id" align="center"></el-table-column>
      <el-table-column label="兑换链接" prop="code_url" align="center"></el-table-column>
      <el-table-column label="绑定用户" prop="bind_user" align="center"></el-table-column>
      <el-table-column label="绑定时间" prop="bind_time" align="center" width="100"></el-table-column>
      <el-table-column label="状态" prop="state" align="center">
        <template slot-scope="scope">{{_state(scope.row.state)}}</template>
      </el-table-column>
      <el-table-column label="操作人" prop="activator" align="center"></el-table-column>
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
import { getScoreLogList } from '@/api/mallapp/plugin/index'

export default {
  name: 'ScoreLogDetial',
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
        return getScoreLogList(this.tableSubmitData)
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
          ret = '禁用中'
          break
        case '2':
          ret = '已激活'
          break
        case '3':
          ret = '已领取'
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
