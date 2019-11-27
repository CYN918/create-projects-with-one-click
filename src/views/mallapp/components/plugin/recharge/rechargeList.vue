<template>
  <div class="mcard">
    <div class="title">搜索条件</div>
    <el-form :model="form" ref="form" size="small" :inline="true">
      <el-form-item>
        <el-date-picker v-model="form.start_time" type="date" placeholder="选择开始日期" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="form.end_time" type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
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
      <el-table-column label="充值类型" prop="type" align="center"></el-table-column>
      <el-table-column label="充值金额" prop="money" align="center" width="100"></el-table-column>
      <el-table-column label="充值时间" prop="time" align="center" width="100"></el-table-column>
      <el-table-column label="充值对象" prop="obj" align="center" width="100"></el-table-column>
      <el-table-column label="其他客户信息" prop="other" align="center" width="100"></el-table-column>
      <el-table-column label="备注选项" prop="remark_type" align="center" width="100"></el-table-column>
      <el-table-column label="备注内容" prop="remark_content" align="center"></el-table-column>
      <el-table-column label="多次录入提醒" prop="tip" align="center" width="150"></el-table-column>
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
import { getRechargeLog } from '@/api/mallapp/plugin/recharge'

export default {
  mixins: [tableMix],
  data () {
    return {
      form: {
        start_time: '', // 开始时间
        end_time: '', // 结束时间
        type: '1', // 搜索类型： ‘1’ 按业务员手机号 ‘2’ 按业务员姓名
        keyword: '' // 关键字
      }
    }
  },
  methods: {
    getTableData () {
      this.tableSubmitData.form = this.form
      return getRechargeLog(this.tableSubmitData)
    }
  }
}
</script>
