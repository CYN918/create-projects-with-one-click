<template>
  <div class="mcard">
    <div class="title">搜索条件</div>
    <el-form :model="form" :inline="true" ref="form" class="user-search mbottom" size="small">
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
      <el-form-item prop="status">
        <el-select class="width13" v-model="form.status" placeholder="用户状态">
          <el-option label="全部状态" value></el-option>
          <el-option label="已通过" value="1"></el-option>
          <el-option label="待审批" value="2"></el-option>
          <el-option label="已驳回" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="type">
        <el-select class="width13" v-model="form.type" placeholder="搜索类型">
          <el-option label="按业务员手机号" value="1"></el-option>
          <el-option label="按充值对象手机号" value="2"></el-option>
          <el-option label="按审批人姓名" value="3"></el-option>
          <el-option label="按业务员姓名" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="width16" prop="keyword">
        <el-input v-model="form.keyword" placeholder="请输入关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">查询</el-button>
        <el-button type="primary" plain>导出结果</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData">
      <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
      <el-table-column label="业务员手机号" prop="phone" align="center"></el-table-column>
      <el-table-column label="姓名" prop="name" align="center"></el-table-column>
      <el-table-column label="申请时间" prop="start_time" align="center"></el-table-column>
      <el-table-column label="充值类型" prop="recharge_type_name" align="center"></el-table-column>
      <el-table-column label="充值金额" prop="amount" align="center"></el-table-column>
      <el-table-column label="通过时间" prop="pass_time" align="center"></el-table-column>
      <el-table-column label="充值对象" prop="obj" align="center"></el-table-column>
      <el-table-column label="对方客户信息" prop="client_info" align="center"></el-table-column>
      <el-table-column label="备注选项" prop="remark_select" align="center"></el-table-column>
      <el-table-column label="审批人" prop="approver" align="center"></el-table-column>
      <el-table-column label="状态" prop="state" align="center"></el-table-column>
      <el-table-column label="备注内容" prop="remark_content" align="center"></el-table-column>
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
import { getRecordList } from '@/api/mallapp/plugin/approval'

export default {
  mixins: [tableMix],
  data () {
    return {
      form: {
        start_time: '', // 开始时间
        end_time: '', // 结束时间
        status: '', // 审批状态： ’‘全部状态， ‘1‘ 已通过 ’2‘ 待审批 ‘3’ 已驳回
        type: '1', // 搜索类型 ： ‘1’ 按业务员手机号, ‘2’ 按充值对象手机号, '3' 按审批人姓名， ‘4’ 按业务员姓名
        keyword: '' // 关键字
      }
    }
  },
  methods: {
    getTableData () {
      this.tableSubmitData.form = this.form
      return getRecordList(this.tableSubmitData)
    }
  }

}
</script>

<style lang='scss' scoped>
.btn-wrapper {
  margin-bottom: 20px;
}
</style>
