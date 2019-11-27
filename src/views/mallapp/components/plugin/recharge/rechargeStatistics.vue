<template>
  <div class="mcard">
    <div class="title">搜索条件</div>
    <el-form :model="form" ref="form" size="small" :inline="true">
      <el-form-item>
        <el-select v-model="form.type">
          <el-option label="按业务员手机号" value="1"></el-option>
          <el-option label="按业务员姓名" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.keyword" placeholder="请输入关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">查询</el-button>
        <el-button type="primary" plain>导出结果</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" stripe>
      <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
      <el-table-column label="业务员手机号" prop="phone" align="center"></el-table-column>
      <el-table-column label="姓名" prop="name" align="center"></el-table-column>
      <el-table-column label="分组" prop="group_name" align="center"></el-table-column>
      <el-table-column label="累计充值总金额" prop="total_money" align="center"></el-table-column>
      <el-table-column label="本月累计充值" prop="month_money" align="center"></el-table-column>
      <el-table-column label="本周累计充值" prop="week_money" align="center"></el-table-column>
      <el-table-column label="今日累计充值" prop="day_money" align="center"></el-table-column>
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
import { getRechargeStatistics } from '@/api/mallapp/plugin/recharge'

export default {
  mixins: [tableMix],
  data () {
    return {
      form: {
        type: '1', // 搜索类型： ‘1’ 按业务员手机号 ‘2’ 按业务员姓名
        keyword: '' // 关键字
      }
    }
  },
  methods: {
    getTableData () {
      this.tableSubmitData.form = this.form
      return getRechargeStatistics(this.tableSubmitData)
    }
  }
}
</script>
