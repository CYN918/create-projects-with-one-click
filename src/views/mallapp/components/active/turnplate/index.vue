<template>
  <div class="mcard margin">
    <div class="btn-wrapper mbottom">
      <el-button type="primary" size="small" @click="routerToAdd">创建</el-button>
      <div class="right">
        <el-button type="primary" size="small" @click="routerToPool">码池管理</el-button>
      </div>
    </div>
    <el-table :data="tableData">
      <el-table-column label="活动名称" prop="name" align="center"></el-table-column>
      <el-table-column label="活动编号" prop="turnplate_id" align="center"></el-table-column>
      <el-table-column label="起始时间" prop="start_time" align="center"></el-table-column>
      <el-table-column label="结束时间" prop="end_time" align="center"></el-table-column>
      <el-table-column label="活动订单" prop="order_num" align="center"></el-table-column>
      <el-table-column label="活动状态" prop="state_name" align="center"></el-table-column>
      <el-table-column label="参与人数" prop="active_num" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="250" fixed="right">
        <template slot-scope="scope">
          <el-popover ref="popover" placement="top-start" width="190" trigger="click">
            <div class="code-title">
              <canvas height="132" width="132" :id="`canvas${scope.row.turnplate_id}`"></canvas>
              <p style="text-align: center;">微信扫一扫</p>
              <div>
                <el-button type="primary" size="small">复制</el-button>
                <el-button type="primary" size="small">下载二维码</el-button>
              </div>
            </div>
            <el-button
              slot="reference"
              type="text"
              v-popover:popover
              @click="overQRCode(scope.row)"
            >链接</el-button>
          </el-popover>
          <el-button
            type="text"
            v-show="scope.row.state == '1'"
            @click="btnCloseTurnplate(scope.row)"
          >结束</el-button>
          <el-button type="text">编辑</el-button>
          <el-button type="text" @click="routerToWinnerList(scope.row)">获奖名单</el-button>
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
import QRCode from 'qrcode'
import { tableMix } from '@/common/js/mixinTable'
import { getATurnplatelList, closeTurnplate } from '@/api/mallapp/active/turnplate'

export default {
  name: 'ActiveTurnplate',
  mixins: [tableMix],
  methods: {
    getTableData () {
      return getATurnplatelList(this.tableSubmitData)
    },
    btnCloseTurnplate (item) {
      this.$confirm('确认关闭此活动吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._closeTurnplate(item.turnplate_id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    overQRCode (item) {
      let canvas = document.getElementById(`canvas${item.turnplate_id}`)
      console.log(canvas)
      QRCode.toCanvas(canvas, item.link, function (error) {
        if (error) console.error(error)
      })
    },
    // 新建活动
    routerToAdd () {
      this.$router.push({ path: '/mactive/turnplate/add' })
    },
    routerToPool () {
      this.$router.push({ path: '/mactive/turnplate/redeempool' })
    },
    routerToWinnerList (turnplate) {
      this.$router.push({ path: `/mactive/turnplate/winner/${turnplate.turnplate_id}`, component: 'ActiveWinnerList' })
    },
    _closeTurnplate (id) {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      closeTurnplate(id).then(() => {
        loading.close()
        this.$message({
          type: 'success',
          message: '活动已关闭'
        })
        this._getTableData()
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.btn-wrapper {
  position: relative;
  .right {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
