<template>
  <div class="margin">
    <div class="mcard mbottom">
      <div class="title">搜索条件</div>
      <el-form :model="tableSubmitData" :inline="true" size="small" ref="form">
        <el-form-item>
          <el-input v-model="tableSubmitData.keyworld" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
     <div class="mcard">
      <el-table :data="tableData" stripe>
        <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
        <el-table-column label="手机号" prop="phone" align="center"></el-table-column>
        <el-table-column label="姓名" prop="name" align="center"></el-table-column>
        <el-table-column label="领取时间" prop="recieved_time" align="center"></el-table-column>
        <el-table-column label="使用时间" prop="used_time" align="center"></el-table-column>
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
  </div>
</template>

<script>
import { tableMix } from '@/common/js/mixinTable'
import { getCouponLinkReceive } from '@/api/mallapp/plugin/coupon'

export default {
  name: 'couponLinkReceive',
  mixins: [tableMix],
  data () {
    return {
      codeId: '',
      tableSubmitData: {
        keyworld: '' // 关键字
      }
    }
  },
  created () {
    this.codeId = this.$route.query.code_id
  },
  methods: {
    getTableData () {
      this.tableSubmitData.code_id = this.codeId
      return getCouponLinkReceive(this.tableSubmitData)
    }
  }
}
</script>
