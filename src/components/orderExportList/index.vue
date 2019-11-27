<template>
  <div class="order-export-wrapper">
    <div v-show="exportList.length" class="item" v-for="(item, index) in exportList" :key="index">
      <el-row class="item-tit">
        <el-col :span="12" class="item-list">报表申请时间：{{item.export_time}}</el-col>
        <el-col :span="12">申请人：{{item.name}}</el-col>
      </el-row>
      <el-row class="item-info">
        <el-col :span="12" class="item-list">下单时间：{{item.start_create_time}}至{{item.end_create_time}}</el-col>
        <el-col :span="12" class="item-list">订单条数：{{item.num}}</el-col>
        <el-col :span="12" class="item-list">订单状态：{{item.state}}</el-col>
        <el-col :span="12" class="item-list">申请人：{{item.name}}</el-col>
      </el-row>
      <el-button type="primary" plain @click="downLoad(item.id)">下载报表</el-button>
    </div>
    <div v-show="!exportList.length" class="null">暂无导出记录</div>
  </div>
</template>

<script>
import ORDERSTATUS from '@/api/mallapp/order/config'
import { getExportList } from '@/api/mallapp/order/index'

export default {
  name: 'OrderExport',
  data () {
    return {
      exportList: [],
      orderStatus: ORDERSTATUS
    }
  },
  created () {
    this._getExportList()
  },
  methods: {
    downLoad (id) {
      console.log(id)
    },
    _getExportList () {
      getExportList().then(res => {
        this.exportList = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .order-export-wrapper {
    padding: 20px;
    margin: 20px;
    border: 1px solid #d7e0f1;
    background: #fff;
    .item {
      width: 800px;
      margin: 0 auto;
      font-size: 14px;
      color: #333;
      line-height: 1.5;
      margin-top: 50px;
      .item-tit {
        margin-bottom: 10px;
      }
      .item-info {
        padding: 20px;
        background: #f7faff;
        margin-bottom: 20px;
        .item-list {
          padding: 20px 0;
        }
      }
    }
    .null {
      text-align: center;
      margin: 50px;
    }
  }
</style>
