<template>
  <div class="morder-list-wrapper">
    <el-form :model="form" :inline="true" ref="form" class="morder-search" size="small">
      <h2 class="title">搜索条件</h2>
      <el-form-item label="下单时间：" prop="start_create_time">
          <el-date-picker class="width16" type="date" placeholder="时间开始" v-model="form.start_create_time"></el-date-picker>
      </el-form-item>
      <span class="line">-</span>
      <el-form-item prop="end_create_time">
        <el-date-picker class="width16" type="date" placeholder="时间结束" v-model="form.end_create_time"></el-date-picker>
      </el-form-item>
      <el-form-item label="订单状态：" prop="state">
        <el-select class="width16" v-model="form.state" placeholder="订单状态">
          <el-option label="订单状态" value=""></el-option>
          <el-option label="待用户付款" value="2"></el-option>
          <el-option label="待站点付款" value="3"></el-option>
          <el-option label="待会员付款" value="4"></el-option>
          <el-option label="待发货" value="5"></el-option>
          <el-option label="已发货" value="6"></el-option>
          <el-option label="已完成" value="7"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关键字：" prop="sel_type">
        <el-select class="width16" v-model="form.sel_type" placeholder="搜索类型">
          <el-option label="根据订单编号" value="1"></el-option>
          <el-option label="根据收货人姓名" value="2"></el-option>
          <el-option label="根据收货人手机" value="3"></el-option>
          <el-option label="根据下单人账号" value="4"></el-option>
          <el-option label="根据供应商名称" value="5"></el-option>
          <el-option label="根据商品名称" value="6"></el-option>
          <el-option label="根据物流单号" value="7"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="width16" prop="keyword">
        <el-input v-model="form.keyword" placeholder="请输入关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">查询</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
        <el-button @click="orderTable" type="primary" plain :loading="loading">订单报表</el-button>
      </el-form-item>
    </el-form>
    <div class="morder-list">
      <el-row :gutter="20" class="table-header">
        <el-col :span="4"><span class="table-title">商品详情</span></el-col>
        <el-col :span="2"><span class="table-title">销售价</span></el-col>
        <el-col :span="3"><span class="table-title">数量</span></el-col>
        <el-col :span="3"><span class="table-title">维权状态</span></el-col>
        <el-col :span="3"><span class="table-title">物流状态</span></el-col>
        <el-col :span="3"><span class="table-title">物流单号</span></el-col>
        <el-col :span="2"><span class="table-title">供货方</span></el-col>
        <el-col :span="2" class="center"><span class="table-title">状态/操作</span></el-col>
        <el-col :span="2"><span class="table-title">用户账号</span></el-col>
      </el-row>
      <div v-for="(item, index) in data" :key="index">
        <el-row :gutter="20" class="total-wrapper">
          <el-col :span="18">
            <span class="total-header-text">订单编号：{{item.id}}</span>
            <span class="total-header-text">下单时间：{{item.order_time}}</span>
            <span class="total-header-text">共{{item.total_number}}件商品</span>
            <span class="total-header-text">订单总价：{{item.total_price}}元</span>
          </el-col>
          <el-col :span="6" class="btn-detail">
            <span @click="handleDetail(item.id)">查看详情</span>
          </el-col>
        </el-row>
        <el-row class="item-body">
            <el-col :span="20"  ref="itemleft" class="item-children-wrapper">
              <el-row
                class="item-children"
                v-for="(good, index) in item.children" :key="index">
                <el-col :span="5" class="detail-wrapper">
                  <span class="cell"><img :src="good.image_url" alt=""></span>
                  <span class="cell tit">{{good.name}}</span>
                </el-col>
                <el-col :span="3">
                  <span class="cell">{{`${good.sales_price}${item.pay_method}`}}</span>
                </el-col>
                <el-col :span="3">
                  <span class="cell">{{good.number}}</span>
                </el-col>
                <el-col :span="3">
                  <span class="cell">{{good.slr_status}}</span>
                </el-col>
                <el-col :span="3">
                  <span class="cell">{{good.logistic_status}}</span>
                </el-col>
                <el-col :span="4">
                  <span class="cell">{{`${good.logistic_vender}:${good.logistic_id}`}}</span>
                </el-col>
                <el-col :span="3">
                  <span class="cell">{{good.supplier}}</span>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="4" ref="itemRight">
              <el-col :span="12" class="table center"><span class="cell table-cell">{{orderStatus[item.status]}}</span></el-col>
              <el-col :span="12" class="table"><span class="cell table-cell">{{item.account}}</span></el-col>
            </el-col>
        </el-row>
      </div>
    </div>

  </div>
</template>

<script>
import { getStyle } from '@/common/js/dom'
import ORDERSTATUS from '@/api/mallapp/order/config'

export default {
  name: 'MorderList',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      screenWidth: document.body.clientWidth,
      form: {
        start_create_time: '', // 时间开始
        end_create_time: '', // 时间结束
        state: '', // 订单状态：0 全部订单, 1 待付款， 2 待用户付款，3 待站点付款， 4 待会员付款， 5 待发货， 6 已发货， 7 已完成， 8 已关闭， 9 售后
        sel_type: '1', // 请选择搜索类型：1 根据订单编号， 2 根据收货人姓名， 3 根据收货人手机， 4 根据下单人账号， 5 根据供应商名称，6 根据商品名称， 7 根据物流单号
        keyword: '' // 请输入关键字
      },
      orderStatus: ORDERSTATUS
    }
  },
  mounted () {
    this._initStyle()
    this._resize()
  },
  methods: {
    submitForm () {
      this.$emit('searchOrder', this.form)
    },
    orderTable () {
      this.$emit('exportOrder', this.form)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleDetail (id) {
      this.$router.push({ path: `/morder/detail/${id}` })
    },
    _initStyle () {
      if (!this.data.length) {
        return
      }
      this.$nextTick(() => {
        let leftEl = this.$refs.itemleft
        let rightEl = this.$refs.itemRight
        leftEl.map((item, index) => {
          let height = getStyle(item.$el, 'height')
          rightEl[index].$el.style.height = height
          rightEl[index].$children.map(col => {
            col.$el.style.height = height
          })
          // 設置children背景色
          if (item.$children.length > 1) {
            rightEl[index].$el.style.background = '#f7faff'
          }
        })
      })
    },
    _resize () {
      window.onresize = () => {
        this.screenWidth = document.body.clientWidth
      }
    }
  },
  watch: {
    data (newVal) {
      this._initStyle()
    },
    screenWidth () {
      this._initStyle()
    }
  }
}
</script>

 <style lang="scss" scoped>
 @import '@/common/scss/variable.scss';
  .morder-list-wrapper {
    .width18 {
      width: 180px;
    }
    .width13 {
      width: 130px;
    }
    .width16 {
      width: 160px;
    }
    .ml {
      margin-left: 20px;
    }
    .item {
      width: 430px;
    }
    .morder-search {
      padding: 20px;
      margin-bottom: 20px;
      background: #fff;
      border: 1px solid #d7e0f1;
      .title {
        padding-left: 10px;
        margin-left: -20px;
        margin-bottom: 10px;
        border-left: 4px solid $themeColor;
        color: #333;
      }
      .line {
        margin-right: 10px;
        line-height: 32px;
        text-align: center;
      }
    }
    .center {
      text-align: center;
    }
    .morder-list {
      box-sizing: border-box;
      text-overflow: ellipsis;
      white-space: normal;
      word-break: break-all;
      font-size: 14px;
      line-height: 23px;
      color: #606266;
      padding: 20px;
      border: 1px solid #d7e0f1;
      background: #fff;
      .total-wrapper {
        padding: 8px 0;
        background: #e6ecf7;
        .btn-detail {
          text-align: right;
          color: $themeColor;
          span {
            cursor: pointer;
          }
        }
      }
      .table-header {
        padding: 12px 0;
      }
      .table-title {
        font-size: 14px;
        line-height: 23px;
        color: #909399;
      }
      .total-header-text {
        margin-right: 20px;
      }
      .cell {
        display: inline-block;
        padding: 12px;
        box-sizing: border-box;
        text-overflow: ellipsis;
        white-space: normal;
        word-break: break-all;
        font-size: 14px;
        line-height: 23px;
      }
      .item-body {
        margin-left: -10px;
        margin-right: -10px;
        .table {
          display: table;
        }
        .table-cell {
          display: table-cell;
          vertical-align: middle;
        }
      }
      .item-children-wrapper {
        .item-children {
          padding: 20px 0;
          &:nth-child(2n+2) {
            background: #f7faff;
          }
          .detail-wrapper {
            display: table;
            img {
              vertical-align: middle;
              width: 60px;
              height: 60px;
            }
            .cell {
              display: table-cell;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
</style>
