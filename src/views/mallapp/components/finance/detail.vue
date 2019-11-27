<template>
  <div class="margin">
    <div class="mcard">
      <div class="title">搜索条件</div>
      <el-form
        :inline="true"
        :model="form"
        size="small">
        <el-form-item label="起止日期"></el-form-item>
        <el-form-item prop="start_time">
          <el-date-picker class="width16" type="date" placeholder="时间开始" v-model="form.start_time"></el-date-picker>
        </el-form-item>
        <span class="line">-</span>
        <el-form-item prop="end_time">
          <el-date-picker class="width16" type="date" placeholder="时间结束" v-model="form.end_time"></el-date-picker>
        </el-form-item>
        <el-form-item prop="type">
          <el-select class="width13" v-model="form.type" placeholder="请选择">
            <el-option label="支付" value="1"></el-option>
            <el-option label="充值" value="2"></el-option>
            <el-option label="采购" value="3"></el-option>
            <el-option label="提现" value="4"></el-option>
            <el-option label="提现手续费" value="5"></el-option>
            <el-option label="运费" value="6"></el-option>
            <el-option label="退款" value="7"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="finance_sn">
          <el-select class="width13" v-model="form.finance_sn" placeholder="请选择">
            <el-option label="根据流水号" value="1"></el-option>
            <el-option label="根据订单号" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="width16" prop="keyword">
          <el-input v-model="form.keyword" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">搜索</el-button>
          <el-button @click="exportUser" type="primary" plain>导出报表</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mcard">
      <el-table
        :data="list">
        <el-table-column
          prop="time"
          label="交易日期"/>
        <el-table-column
          prop="serial_id"
          label="流水号"/>
        <el-table-column
          prop="type_name"
          label="交易类型"/>
        <el-table-column
          prop="content"
          label="交易内容/备注"/>
        <el-table-column
          prop="account_change"
          label="站点账户变动（元）"/>
        <el-table-column
          prop="amount_change"
          label="站点现金账户变动（元）"/>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
          <el-button type="text" size="small" v-show="scope.row.order_id" @click="handleToOrderDetail(scope.row)">详情</el-button>
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
          :total="pagination.total_count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getFinanceList } from '@/api/mallapp/finance/index'

export default {
  name: 'MfinanceDetail',
  data () {
    return {
      form: {
        start_time: '', // 时间开始
        end_time: '', // 时间结束
        type: '', // 交易类型：1 支付 ，2 充值， 3 采购， 4提现 ，5 提现手续费， 6 运费， 7退款
        type_name: '', // 交易类型名称：'支付' '充值'  '采购'， '提现' ，'提现手续费'， '运费'， '退款'
        finance_sn: '', // 搜索类型：1 根据流水号， 2 根据订单号
        keyword: '' // 关键字
      },
      list: [{
        time: '', // 交易日期
        serial_id: '', // 流水号
        order_id: '', // 订单号
        content: '', // 交易内容/备注
        type: '', // 交易类型：1 支付 ，2 充值， 3 采购， 4提现 ，5 提现手续费， 6 运费， 7退款
        type_name: '', // 交易类型名称：'支付' '充值'  '采购'， '提现' ，'提现手续费'， '运费'， '退款'
        account_change: 0, // 站点账户变动
        amount_change: 0 // 站点现金账户变动
      }],
      pagination: {
        current_page: 1,
        page_size: 10,
        total_count: 0
      }
    }
  },
  created () {
    this._getFinanceList()
  },
  methods: {
    submitForm () {
      this._getFinanceList()
    },
    exportUser () {
      console.log(this.form)
    },
    handleToOrderDetail (val) {
      this.$router.push({ path: `/morder/detail/${val.order_id}` })
    },
    handleSizeChange (val) {
      this.pagination.page_size = val
      this._getFinanceList()
    },
    handleCurrentChange (val) {
      this.pagination.current_page = val
      this._getFinanceList()
    },
    _getFinanceList () {
      let data = {}
      data.current_page = this.pagination.current_page
      data.page_size = this.pagination.page_size
      data.form = this.form
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getFinanceList(data).then(res => {
        loading.close()
        this.list = res.data.list
        this.pagination.total_count = res.data.total_count
      })
    }
  }
}
</script>

<style lang="scss" scoped>
 @import '@/common/scss/variable.scss';
  .mcard {
    margin-bottom: 20px;
  }
  .width16 {
    width: 160px;
  }
  .width13 {
      width: 130px;
    }
  .line {
    margin-right: 10px;
    line-height: 32px;
    text-align: center;
  }
  .user-search {
    margin-bottom: 20px;
  }
  .muser-content {
    .muser-left {
      width: 170px;
      float: left;
      border: 1px solid #d7e0f1;
      .left-item {
        line-height: 46px;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
        &.all {
          color: $themeColor;
        }
        &.active {
          background: #DEE9F7;
          color: $themeColor;
        }
        &.btn {
          border-top: 1px solid #d7e0f1;
        }
        &.group-item {
          padding: 0 10px;
          text-align: left;
          span {
            float: right;
          }
        }
      }
    }
    .muser-right {
      padding: 20px;
      margin-left: 190px;
      border: 1px solid #d7e0f1;
      .btn-wrapper {
        margin-bottom: 20px;
        .el-button {
          margin-right: 10px;
        }
      }
    }
  }
  .pagination {
    margin: 20px 0;
    text-align: right;
  }
  .edit-user {
    padding: 0 40px;
  }
</style>
