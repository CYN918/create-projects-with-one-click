<template>
  <div class="morder-wrapper">
    <el-tabs type="card" v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="全部订单" name="0"></el-tab-pane>
      <el-tab-pane label="待付款" name="1"></el-tab-pane>
      <el-tab-pane label="待发货" name="5"></el-tab-pane>
      <el-tab-pane label="已发货" name="6"></el-tab-pane>
      <el-tab-pane label="已完成" name="7"></el-tab-pane>
      <el-tab-pane label="已关闭" name="8"></el-tab-pane>
      <el-tab-pane label="售后" name="9"></el-tab-pane>
    </el-tabs>
    <morder-list
    :data="orderList"
    :loading="loading"
    @searchOrder="handleSearchOrder"
    @exportOrder="exportOrder"/>
    <div class="pagenation">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenation.current_page"
        :page-size="pagenation.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagenation.total_count">
      </el-pagination>
    </div>
    <!--订单报表-->
    <el-dialog
      title="订单导出"
      :visible.sync="dialogVisible">
      <div class="ordertable-wrapper">
        <el-row class="ot-content">
          <el-col :span="12" class="ot-detail">下单时间：{{statTime}} 至 {{endTime}}</el-col>
          <el-col :span="12" class="ot-detail">订单状态：{{orderStatus[this.form.state]}}</el-col>
          <el-col :span="12" class="ot-detail">订单笔数：{{orderNumber.num}}笔</el-col>
          <el-col :span="12" class="ot-detail">导出条数：{{orderNumber.product_num}}条(不含运费条数)</el-col>
          <el-col :span="12" class="ot-detail">申请人：{{name}}</el-col>
        </el-row>
        <el-row class="ot-tip">
          <p class="tip">为了给您提供更好的查询性能以及体验，我们对导出功能进行了改进：</p>
          <p class="text">· 为了保证你的查询性能，两次导出的时间间隔请保持在10分钟以上</p>
          <p class="text">· 我们将为你保留30天内导出的数据，便于您随时导出</p>
          <p class="text">· 报表生成中请勿刷新页面，否则有可能会生成报表失败</p>
          <p class="text">· 报表单次最多只能生成10000条数据</p>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleToExportList">查看导出记录</el-button>
        <el-button type="primary" @click="handleCreateExport" :loading="loading">生成报表</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import MorderList from './orderList'
import { getOrderList, getOrderNumber, updateExportList } from '@/api/mallapp/order/index'
import { mapGetters } from 'vuex'
import ORDERSTATUS from '@/api/mallapp/order/config'
import { formatDate } from '@/common/js/date'

export default {
  name: 'Morder',
  data () {
    return {
      activeName: '0',
      orderList: [],
      form: {
        start_create_time: '', // 时间开始
        end_create_time: '', // 时间结束
        state: '0', // 订单状态  0 全部订单, 1 待付款， 2 待用户付款，3 待站点付款， 4 待会员付款， 5 待发货， 6 已发货， 7 已完成， 8 已关闭， 9 售后
        sel_type: '1', // 请选择搜索类型：1 根据订单编号， 2 根据收货人姓名， 3 根据收货人手机， 4 根据下单人账号， 5 根据供应商名称，6 根据商品名称， 7 根据物流单号
        keyword: '' // 请输入关键字
      },
      pagenation: {
        current_page: 1,
        page_size: 10,
        total_count: 0
      },
      dialogVisible: false,
      orderStatus: ORDERSTATUS,
      orderNumber: {},
      loading: false,
      exportLoading: false
    }
  },
  created () {
    this._getOrderList()
  },
  computed: {
    statTime () {
      let date = this.form.start_create_time
      if (!date) {
        return ''
      } else {
        return formatDate(date, 'yyyy-MM-dd')
      }
    },
    endTime () {
      let date = this.form.end_create_time
      if (!date) {
        return ''
      } else {
        return formatDate(date, 'yyyy-MM-dd')
      }
    },
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    handleTabClick () {
      this.form.state = this.activeName
      this._getOrderList()
    },
    handleSearchOrder (form) {
      this.form = Object.assign({}, form)
      if (this.form.state === '') {
        this.form.state = this.activeName
      }
      this._getOrderList()
    },
    exportOrder (form) {
      this.form = Object.assign({}, form)
      if (this.form.state === '') {
        this.form.state = this.activeName
      }

      // 日期判断
      let startTime = this.form.start_create_time
      let endTime = this.form.end_create_time
      if (startTime && endTime) {
        if (startTime.getTime() <= endTime.getTime()) {
          this._getOrderNumber(this.form)
        } else {
          this.$message({
            message: '下单时间开始大于结束时间',
            type: 'warning'
          })
        }
      } else {
        this.$message({
          message: '请选择下单时间',
          type: 'warning'
        })
      }
    },
    handleToExportList () {
      this.dialogVisible = false
      this.$router.push({ path: '/morder/exportList' })
    },
    handleCreateExport () {
      let data = {}
      let form = Object.assign({}, this.form)
      if (this.form.state === '') {
        this.form.state = this.activeName
      }
      data.form = form
      data.total = this.orderNumber.num
      // this.exportLoading = true
      updateExportList(data).then(res => {
        this.exportLoading = false
        this.dialogVisible = false
        this.$router.push({ path: '/morder/exportList' })
      })
    },
    handleSizeChange (val) {
      let data = {}
      data.page_size = val
      this._getOrderList(data)
    },
    handleCurrentChange (val) {
      let data = {}
      data.current_page = val
      this._getOrderList(data)
    },
    _getOrderList (val) {
      let objval = val || {}
      let obj = {}
      obj.current_page = this.pagenation.current_page
      obj.page_size = this.pagenation.page_size
      obj.form = this.form

      let data = Object.assign(obj, objval)
      // let loading = this.$loading({
      //   background: 'rgba(255,255,255,0.1)',
      //   text: '加载中，请稍后...'
      // })
      getOrderList(data).then(res => {
        loading.close()
        this.orderList = res.data.list
        let pagenation = {}
        pagenation.current_page = res.data.current_page
        pagenation.total_count = res.data.total_count
        this.pagenation = pagenation
      })
    },
    _getOrderNumber (data) {
      // this.loading = true
      getOrderNumber(data).then(res => {
        this.orderNumber = res.data
        this.loading = false
        // this.dialogVisible = true
      })
    }
  },
  components: {
    MorderList
  }
}
</script>

<style lang="scss">
  .morder-wrapper {
    margin: 20px;
    .el-tabs {
      border-bottom: 0;
      .el-tabs__header {
        margin-bottom: -2px;
        border-bottom: 0;
        .el-tabs__nav {
          border: 0;
        }
        .el-tabs__item {
          border-left: 0;
        }
        .is-active {
          background: #fff;
          border: 1px solid #d7e0f1;
          border-bottom-color: #fff;
        }
      }
    }
    .pagenation {
      text-align: right;
      padding: 20px 20px 40px;
      margin-top: -1px;
      border: 1px solid #d7e0f1;
      border-top-color: #fff;
      background: #fff;
    }
    .ordertable-wrapper {
      padding: 0 40px;
      line-height: 1.5;
      font-size: 14px;
      .ot-content {
        margin-bottom: 20px;
      }
      .ot-detail {
        margin-bottom: 20px;
      }
      .ot-tip {
        .tip {
          margin-bottom: 20px;
          font-size: 14px;
        }
        .text {
          margin-bottom: 10px;
          color: #999;
        }
      }
    }
  }
</style>
