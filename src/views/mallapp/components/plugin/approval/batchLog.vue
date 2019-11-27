<template>
  <div class="mcard">
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
      <el-table-column label="操作时间" prop="time" align="center"></el-table-column>
      <el-table-column label="包含网点数" prop="number" align="center"></el-table-column>
      <el-table-column label="操作详情" prop="info" align="center"></el-table-column>
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
import { getQuotaBatchLogList } from '@/api/mallapp/plugin/approval'

export default {
  name: 'QuotaLog',
  mixins: [tableMix],
  data () {
    return {
      form: {
        start_time: '', // 开始时间
        end_time: '' // 结束时间
      }
    }
  },
  methods: {
    getTableData () {
      this.tableSubmitData.form = this.form
      return getQuotaBatchLogList(this.tableSubmitData)
    }
  }

}
</script>
