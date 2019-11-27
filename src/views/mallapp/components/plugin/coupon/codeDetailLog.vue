<template>
  <div class="mcard">
    <el-button type="primary" class="mbottom" size="small">导出全部</el-button>
    <el-table :data="tableData" stripe>
      <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
      <el-table-column label="操作时间" prop="time" align="center" width="100"></el-table-column>
      <el-table-column label="操作类型" prop="type_name" align="center"></el-table-column>
      <el-table-column label="数量" prop="number" align="center"></el-table-column>
      <el-table-column label="操作人" prop="activator" align="center"></el-table-column>
      <el-table-column label="备注信息" prop="remark" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="text" @click="routerToCodeDetail(scope.row)">券码详情</el-button>
        </template>
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
import { getCouponLogList } from '@/api/mallapp/plugin/coupon'

export default {
  mixins: [tableMix],
  props: {
    codeId: {
      type: String
    }
  },
  methods: {
    getTableData () {
      this.tableSubmitData.code_id = this.codeId
      return getCouponLogList(this.tableSubmitData)
    },
    routerToCodeDetail (item) {
      this.$router.push({ path: '/mplugin/coupon_log_detail', query: { id: item.log_id } })
    }
  }
}
</script>
