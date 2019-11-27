<template>
  <div class="store-wrapper">
    <div class="mcard mbottom">
      <div class="title">搜索条件</div>
      <el-form :model="form" ref="form" :inline="true" size="small">
        <el-form-item label="起止日期">
          <el-col :span="11">
            <el-date-picker placeholder="时间开始" v-model="form.start_time" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker placeholder="时间结束" v-model="form.end_time" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.type">
            <el-option label="请选择" value></el-option>
            <el-option label="支付" value="1"></el-option>
            <el-option label="充值" value="2"></el-option>
            <el-option label="采购" value="3"></el-option>
            <el-option label="提现" value="4"></el-option>
            <el-option label="提现手续费" value="5"></el-option>
            <el-option label="运费" value="6"></el-option>
            <el-option label="退款" value="7"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.finance_sn">
            <el-option label="根据流水号" value="1"></el-option>
            <el-option label="根据交易内容" value="2"></el-option>
            <el-option label="根据站点名称" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.keyword" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">查询</el-button>
          <el-button type="primary" plain>导出报表</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mcard">
      <el-table :data="list" stripe>
        <el-table-column prop="sn_id" label="流水号" align="center"/>
        <el-table-column prop="time" label="交易时间" align="center"/>
        <el-table-column prop="store_name" label="站点名称" align="center"/>
        <el-table-column prop="application_name" label="站点类型" align="center"/>
        <el-table-column prop="type" label="交易类型" align="center"/>
        <el-table-column prop="content" label="交易内容/备注"/>
        <el-table-column prop="store_account_change" label="站点账户变动（元" align="center"/>
        <el-table-column prop="store_cash_account_change" label="站点现金账户变动（元）" width="180px" align="center"/>
        <el-table-column label="操作" align="center"  fixed="right" width="150">
          <template slot-scope="scope">
            <div class="line-div">
              <div class="small-Idiv">
                <div class="i-div ">
                    <img src="../../common/images/icon/查看详情.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;">详情</span>
              </div>
            </div>
          </template>
        </el-table-column>>
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
import { application } from '@/api/config'
import { getStoreDetailList } from '@/api/finance/store'

export default {
  data () {
    return {
      application,
      form: {
        start_time: '', // 时间开始
        end_time: '', // 时间结束
        type: '', // 类型：'' 全部类型， 1.支付， 2.充值， 3.采购， 4.提现， 5.提现手续费， 6.运费， 7.退款
        keyword: '', // 关键字
        finance_sn: '1' // 搜索类型： 1.根据流水号， 2.根据交易内容， 3.根据站点名称
      },
      list: [{
        sn_id: '', // 流水号
        time: '', // 交易时间
        store_name: '', // 站点名称
        application_name: '', // 站点类型名称
        type: '', // 交易类型
        content: '', // 交易内容/备注
        store_id: '', // 站点id
        store_account_change: '', // 站点账户
        store_cash_account_change: '', // 站点现金账户（元）
        order_id: '' // 订单id
      }],
      pagination: {
        current_page: 1,
        page_size: 20,
        total_count: 0
      }
    }
  },
  created () {
    // this._getStoreDetailList()
  },
  methods: {
    submitForm () {
      this._getStoreDetailList()
    },
    handleSizeChange (val) {
      this.pagination.page_size = val
      this._getStoreDetailList()
    },
    handleCurrentChange (val) {
      this.pagination.current_page = val
      this._getStoreDetailList()
    },
    routerToOrderDetail (item) {
      this.$router.push({ path: `/order/detail/${item.order_id}` })
    },
    _getStoreDetailList () {
      let data = {}
      data.current_page = this.pagination.current_page
      data.page_size = this.pagination.page_size
      data.form = this.form

      // let loading = this.$loading({
      //   background: 'rgba(255,255,255,0.1)',
      //   text: '加载中，请稍后...'
      // })
      // getStoreDetailList(data).then(res => {
      //   loading.close()
      //   this.list = res.data.list
      //   this.pagination.total_count = res.data.total_count
      // })
    }
  }
}
</script>

<style lang='scss' scoped>
.store-wrapper {
  .line {
    text-align: center;
  }
}
</style>
