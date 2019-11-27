<template>
  <div class="mcard">
    <el-table :data="tableData" stripe>
      <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
      <el-table-column label="生成时间" prop="generation_time" align="center"></el-table-column>
      <el-table-column label="兑换码总数" prop="total" align="center"></el-table-column>
      <el-table-column label="已激活数" prop="activated" align="center"></el-table-column>
      <el-table-column label="未激活数" prop="nonactivated" align="center"></el-table-column>
      <el-table-column label="已领取数" prop="receive_num" align="center"></el-table-column>
      <el-table-column label="已使用数" prop="used_num" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="text" @click="routerToCodeDetail(scope.row)">查看兑换码</el-button>
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
import { getCodeList } from '@/api/mallapp/plugin/coupon'

export default {
  mixins: [tableMix],
  props: {
    scoreId: {
      type: String
    }
  },
  methods: {
    getTableData () {
      this.tableSubmitData.score_id = this.scoreId
      return getCodeList(this.tableSubmitData)
    },
    routerToCodeDetail (item) {
      this.$router.push({ path: '/mplugin/coupon_code_detail', query: { code_id: item.code_id } })
    }
  }
}
</script>
