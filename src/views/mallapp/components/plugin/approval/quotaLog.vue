<template>
  <div class="mcard margin">
    <p class="title">网点额度变更记录</p>
    <el-form :model="form" :inline="true" ref="form" class="mbottom" size="small">
      <el-form-item prop="start_time">
        <el-date-picker
          v-model="form.start_time"
          type="date"
          placeholder="选择开始日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="end_time">
        <el-date-picker
          v-model="form.end_time"
          type="date"
          placeholder="选择结束日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData">
      <el-table-column label="变更时间" prop="time" align="center"></el-table-column>
      <el-table-column label="变更额度" prop="amount" align="center"></el-table-column>
      <el-table-column label="变更来源" prop="source" align="center"></el-table-column>
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
import { getQuotaLogList } from '@/api/mallapp/plugin/approval'

export default {
  name: 'QuotaLog',
  mixins: [tableMix],
  data () {
    return {
      form: {
        quota_id: '', // 网点id
        start_time: '', // 开始时间
        end_time: '' // 结束时间
      }
    }
  },
  created () {
    this.form.quota_id = this.$route.params.id
  },
  methods: {
    getTableData () {
      this.tableSubmitData.form = this.form
      return getQuotaLogList(this.tableSubmitData)
    }
  }

}
</script>

<style lang='scss' scoped>
</style>
