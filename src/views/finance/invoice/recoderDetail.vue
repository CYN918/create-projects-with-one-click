<template>
  <div class="margin">
    <div class="mcard mbottom">
      <div class="title">开票明细</div>
      <el-row :gutter="20" class="info">
        <el-col :span="12" class="item">
          发票金额：
          <span class="sub">¥ {{invoiceInfo.money}}</span>
        </el-col>
        <el-col :span="12" class="item">供应商（发票开具方）：{{invoiceInfo.company}}</el-col>
        <el-col :span="12" class="item">
          发票状态：
          <span class="green">{{_nomalStatus(invoiceInfo.status)}}</span>
        </el-col>
        <el-col :span="12" class="item">发票编号：{{invoiceInfo.invoice_sn}}</el-col>
        <el-col :span="12" class="item">发票抬头：{{invoiceInfo.title}}</el-col>
        <el-col :span="12" class="item">发票类型：{{invoiceInfo.invoice_type === '1' ? '普通发票': '专用发票'}}</el-col>
        <el-col :span="12" class="item">申请时间：{{invoiceInfo.addtime}}</el-col>
        <el-col :span="12" class="item">收货人：{{invoiceInfo.recieve_name}}</el-col>
        <el-col :span="12" class="item">联系电话：{{invoiceInfo.recieve_phone}}</el-col>
        <el-col :span="12" class="item">收取地址：{{invoiceInfo.recieve_address}}</el-col>
        <el-col :span="12" class="item">物流公司：{{invoiceInfo.express_name}}</el-col>
        <el-col :span="12" class="item">快递编号：{{invoiceInfo.express_sn}}</el-col>
      </el-row>
    </div>
    <div class="mcard mbottom">
      <div class="btn-import">
        <el-button type="primary" size="medium">导出</el-button>
      </div>
      <el-table :data="list" stripe border>
        <el-table-column label="订单号" prop="order_id" align="center"></el-table-column>
        <el-table-column label="订单完成时间" prop="time" align="center"></el-table-column>
        <el-table-column label="商品名称" prop="good_name" align="center"></el-table-column>
        <el-table-column label="购买数量" prop="good_num" align="center"></el-table-column>
        <el-table-column label="商品单价" align="center">
          <template slot-scope="scope">
            <span>¥{{(scope.row.price).toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="开票金额" align="center">
          <template slot-scope="scope">
            <span class="green">¥{{(scope.row.good_num*scope.row.price).toFixed(2)}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
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
import { getRelateOrder } from '@/api/finance/invoice'

export default {
  name: 'RecoderDetail',
  data () {
    return {
      invoiceInfo: {},
      list: [],
      pagination: {
        current_page: 1,
        page_size: 20,
        total_count: 0
      }
    }
  },
  created () {
    if (!this.$route.params.id) {
      this.$router.push({ path: '/finance/invoice/recoder' })
    } else {
      this.invoiceInfo = this.$route.params
    }
    this._getRelateOrder()
  },
  methods: {
    handleSizeChange (val) {
      this.pagination.page_size = val
      this._getRelateOrder()
    },
    handleCurrentChange (val) {
      this.pagination.current_page = val
      this._getRelateOrder()
    },
    _nomalStatus (val) {
      let ret
      switch (val) {
        case '1':
          ret = '审核中'
          break
        case '2':
          ret = '审核已通过'
          break
        case '3':
          ret = '审核不通过'
          break
        default:
          break
      }
      return ret
    },
    _getRelateOrder () {
      let data = {}
      data.current_page = this.pagination.current_page
      data.page_size = this.pagination.page_size
      data.form = Object.assign({}, this.form)

      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getRelateOrder(data).then(res => {
        loading.close()
        this.list = res.data.list
        this.pagination.total_count = res.data.total_count
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import "@/common/scss/variable.scss";
.info {
  font-size: 14px;
  .item {
    padding: 8px;
  }
}
.sub {
  color: $themeSubColor;
}
.green {
  color: $themeAuxColor;
}
.btn-import {
  margin: 20px 0;
}
</style>
