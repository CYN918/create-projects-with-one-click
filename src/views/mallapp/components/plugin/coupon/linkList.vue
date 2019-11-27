<template>
  <div class="mcard">
    <el-table :data="tableData" stripe>
      <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
      <el-table-column label="链接名称" prop="title" align="center"></el-table-column>
      <el-table-column label="生成时间" prop="generation_time" align="center"></el-table-column>
      <el-table-column label="可领取数" prop="total" align="center"></el-table-column>
      <el-table-column label="已领取数" prop="receive_num" align="center"></el-table-column>
      <el-table-column label="已使用数" prop="used_num" align="center"></el-table-column>
      <el-table-column label="链接" prop="link" align="center"></el-table-column>
      <el-table-column label="链接状态" align="center">
        <template slot-scope="scope">{{scope.row.state == '1' ? '禁用' : '正常'}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="routerTolinkDetail(scope.row)">查看领取详情</el-button>
          <el-button type="text" @click="routerToEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleStatusChange(scope.row)">{{scope.row.state == '1' ? '正常' : '禁用'}}</el-button>
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
import { getLinkList, changeLinkState } from '@/api/mallapp/plugin/coupon'

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
      return getLinkList(this.tableSubmitData)
    },
    routerTolinkDetail (item) {
      this.$router.push({ path: '/mplugin/coupon_link_log', query: { code_id: item.code_id } })
    },
    handleStatusChange (item) {
      this._changeLinkState(item)
    },
    routerToEdit (item) {
      item.score_id = this.scoreId
      this.$router.push({ name: 'CouponLinkEdit', params: item })
    },
    _changeLinkState (item) {
      // eslint-disable-next-line eqeqeq
      let state = item.state == '1' ? '2' : '1'
      changeLinkState(state).then(res => {
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        this._getTableData()
      })
    }
  }
}
</script>
