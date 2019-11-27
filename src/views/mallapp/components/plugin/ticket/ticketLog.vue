<template>
  <div class="margin mcard">
    <p class="title">兑换码生成记录</p>
    <el-table :data="tableData" stripe>
      <el-table-column label="序号" type="index" align="center"></el-table-column>
      <el-table-column label="生成时间" prop="generation_time" align="center"></el-table-column>
      <el-table-column label="面值" prop="title" align="center"></el-table-column>
      <el-table-column label="总库存" prop="total" align="center"></el-table-column>
      <el-table-column label="激活数" prop="active_num" align="center"></el-table-column>
      <el-table-column label="禁用数" prop="forbidden_num" align="center"></el-table-column>
      <el-table-column label="已领取数" prop="receive_num" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="text" @click="routerToDetail(scope.row)">查看详情</el-button>
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
import { getTicketLog } from '@/api/mallapp/plugin/index'
import { hideSiderbarMix } from '@/common/js/mixin'

export default {
  name: 'TicketLog',
  mixins: [tableMix, hideSiderbarMix],
  data () {
    return {
      id: ''
    }
  },
  created () {
    this.id = this.$route.query.id
  },
  methods: {
    getTableData () {
      if (this.id) {
        return getTicketLog(this.id)
      }
    },
    routerToDetail (item) {
      this.$router.push({ path: '/mplugin/ticket_detail', query: { score_id: item.score_id } })
    }
  },
  watch: {
    id () {
      this._getTableData()
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
