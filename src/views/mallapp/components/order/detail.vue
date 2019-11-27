<template>
  <div class="detial-wrapper">
    <div class="order-detial">
      <el-row class="title">订单详情</el-row>
      <el-col :span="24" class="item-tit">交易状态：{{orderStatus[orderDetail.status]}}</el-col>
      <el-row :gutter="20">
        <el-col :span="24" class="item-tit">下单信息：</el-col>
        <el-col :span="14" class="item">下单人用户名：{{orderDetail.order_userid}}</el-col>
        <el-col :span="10" class="item">下单人手机号：{{orderDetail.order_phone}}</el-col>
        <el-col :span="14" class="item">下单人姓名：{{orderDetail.order_username}}</el-col>
        <el-col :span="10" class="item">下单人所属分组：{{orderDetail.order_group}}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" class="item-tit">订单信息：</el-col>
        <el-col :span="14" class="item">用户下单时间：{{orderDetail.order_time}}</el-col>
        <el-col :span="10" class="item">用户支付时间：{{orderDetail.pay_time}}</el-col>
        <el-col :span="14" class="item">订单总价：{{`${orderDetail.total_price}${orderDetail.pay_method}`}}</el-col>
        <el-col :span="10" class="item">用户支付方式：{{orderDetail.pay_method}}支付</el-col>
        <el-col :span="14" class="item">站点支付金额：{{orderDetail.station_price}}</el-col>
        <el-col :span="10" class="item">站点支付时间：{{orderDetail.station_time}}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" class="item-tit">收货人信息：</el-col>
        <el-col :span="14" class="item">收货人：{{orderDetail.consignee_name}}</el-col>
        <el-col :span="10" class="item">收货人手机号：{{orderDetail.consignee_phone}}</el-col>
        <el-col :span="14" class="item">收货地址：{{orderDetail.consignee_address}}</el-col>
      </el-row>
    </div>
    <div class="goods-detail">
      <el-table
        :data="orderDetail.children"
        stripe>
        <el-table-column
          label="商品图片">
          <template slot-scope="scope">
            <img :src="scope.row.image_url"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"/>
        <el-table-column
          prop="number"
          label="数量"/>
        <el-table-column
          label="会员价">
          <template slot-scope="scope">
            <span>¥{{scope.row.price}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="分销价">
          <template slot-scope="scope">
            <span>¥{{scope.row.store_price}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="销售价">
          <template slot-scope="scope">
            <span>{{scope.row.sales_price}}{{orderDetail.pay_method}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="slr_status"
          label="维权状态"/>
        <el-table-column
          prop="logistic_status"
          label="物流状态"/>
      </el-table>
    </div>
    <div class="logistic-detail">
      <div class="tabs-header">
        <ul class="clearfix">
          <li
            v-for="(item, index) in orderDetail.children"
            @click="logisticIndex(index)"
            :class="currentLogisticIndex===index ? 'active' : ''"
            :key="item.index">包裹{{`${index + 1}`}}</li>
        </ul>
      </div>
      <div class="tabs-content">
        <div class="title">包裹信息</div>
        <div class="logistic-desc" v-show="logistic.length">
          <span>供货方：</span>
          <span class="desc-info" v-if="orderDetail.children">物流信息：{{orderDetail.children[currentLogisticIndex].logistic_vender}} | {{orderDetail.children[currentLogisticIndex].logistic_id}}</span>
        </div>
        <ul>
          <li v-for="(info, index) in logistic" :key="index">
            <i class="node-icon"></i>
            <p class="text">{{info.context}}</p>
            <p class="time">{{info.time}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderDetail } from '@/api/mallapp/order/index'
import { getLogisticInfo } from '@/api/public'
import ORDERSTATUS from '@/api/mallapp/order/config'

export default {
  name: 'MorderDetail',
  created () {
    this._getOrderDetail(this.$route.params.id)
  },
  data () {
    return {
      orderStatus: ORDERSTATUS,
      orderDetail: {
        // status: '7', // 订单状态： 0 全部订单, 1 待付款， 2 待用户付款，3 待站点付款， 4 待会员付款， 5 待发货， 6 已发货， 7 已完成， 8 已关闭， 9 售后
        // order_userid: '1244', // 下单人用户名
        // order_username: '李某某', // 下单人姓名
        // order_phone: '15021264678', // 下单人手机号
        // order_group: '组一', // 下单人所属分组
        // order_time: '', // 用户下单时间
        // pay_time: '', // 用户支付时间
        // total_price: '', // 订单总价
        // pay_method: '', // 用户支付方式
        // station_price: '', // 站点支付金额
        // station_time: '', // 站点支付时间
        // consignee_name: '', // 收货人
        // consignee_phone: '', // 收货人手机号
        // consignee_address: '', // 收货地址
        // children: [{
        //   sku: '', // 商品sku
        //   image_url: '', // 商品图片
        //   name: '', // 商品名称
        //   number: 1, // 商品数量
        //   slr_status: '', // 维权状态
        //   logistic_status: '', // 物流状态
        //   logistic_id: '', // 物流单号
        //   logistic_vender: '', // 物流公司
        //   supplier: '', // 供货方
        //   price: '', // 会员价
        //   store_price: '', // 分销价
        //   sales_price: '' // 销售价
        // }]
      },
      logistic: [],
      currentLogisticIndex: 0
    }
  },
  methods: {
    logisticIndex (index) {
      this.currentLogisticIndex = index
      this._getLogisticInfo(this.orderDetail.children[index].logistic_id)
    },
    _getOrderDetail (id) {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getOrderDetail(id).then(res => {
        loading.close()
        this.orderDetail = res.data
        this._getLogisticInfo(this.orderDetail.children[0].logistic_id)
      })
    },
    _getLogisticInfo (id) {
      if (!this.orderDetail.children) {
        return
      }
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      this.logistic = []
      getLogisticInfo(id).then(res => {
        loading.close()
        this.logistic = res.data
      })
    }
  },
  watch: {
    orderDetail () {
      let logistic = this.orderDetail.children
      if (logistic && logistic.length) {
        this._getLogisticInfo(logistic[0].logistic_id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/variable.scss';
.detial-wrapper {
  color: #3C3C3C;
  margin: 20px;
  .order-detial, .goods-detail {
    margin-bottom: 20px;
    border: 1px solid #d7e0f1;
    background: #fff;
  }
  .order-detial {
    padding: 20px;
    .title {
      margin-left: -20px;
      font-size: 16px;
      font-weight: 400;
      color: 3333;
      padding-left: 10px;
      line-height: 1.4;
      border-left: 4px solid $themeColor;
      margin-bottom: 10px;
    }
    .item-tit {
      padding: 8px 0;
      font-size: 14px;
    }
    .item {
      padding: 8px 0;
      font-size: 12px;
      line-height: 1.5;
      color: #afc0d4;
    }
  }
  .logistic-detail {
      margin-bottom: 50px;
    .tabs-header {
      li {
        float: left;
        font-size: 16px;
        padding: 0 16px;
        line-height: 36px;
        cursor: pointer;
        &.active {
          background: #fff;
          border: 1px solid #d7e0f1;
          border-bottom-color: #fff;
          margin-bottom: -1px;
        }
      }
    }
    .tabs-content {
      padding: 20px;
      background: #fff;
      border: 1px solid #d7e0f1;
      .title {
        margin-left: -20px;
        font-size: 16px;
        font-weight: 400;
        color: 3333;
        padding-left: 10px;
        line-height: 1.4;
        border-left: 4px solid $themeColor;
        margin-bottom: 10px;
      }
      .logistic-desc {
        margin-bottom: 20px;
        font-size: 14px;
        padding: 10px;
        background: #dee9f7;
        .desc-info {
          margin-left: 40px;
        }
      }
      ul {
        margin-left: 20px;
        li {
          position: relative;
          padding-left: 25px;
          height: 84px;
          border-left: 1px solid #d9d9d9;
          color: #999;
          &:first-child {
            i {
              background-color: #3ac691;
              margin-left: -2px;
              width: 14px;
              height: 14px;
            }
          }
          &:last-child {
            border-left: 0;
          }
          i {
            position: absolute;
            left: -6px;
            top: 0;
            background-color: #afc0d4;
            width: 10px;
            height: 10px;
            border-radius: 50%;
          }
          .text {
            padding-bottom: 10px;
            font-size: 14px;
            color: #afc0d4;
          }
          .time {
            padding-bottom: 10px;
            margin-right: 20px;
            font-size: 12px;
            color: #afc0d4;
          }
        }
      }
    }
  }
}
</style>
