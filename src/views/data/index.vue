/* eslint-disable quotes */
<template>
  <div class="mcard margin">
    <div style="margin-bottom: 30px">
      <p class="title mbottom">财务数据</p>
      <el-row>
        <el-col class="item" :span="6">
          <div>{{data.finance.revenue}}</div>
          <div>营收总额（元）</div>
        </el-col>
        <el-col class="item" :span="6">
          <div>{{data.finance.profit}}</div>
          <div>利润总额（元）</div>
        </el-col>
        <el-col class="item" :span="6">
          <div>{{data.finance.moneyTotal}}</div>
          <div>代收现金总额（元)</div>
        </el-col>
        <el-col class="item" :span="6">
          <div>{{data.finance.expendMoney}}</div>
          <div>支出总额（元）</div>
        </el-col>
      </el-row>
    </div>
    <div style="margin-bottom: 30px">
      <p class="title mbottom">订单数据</p>
      <el-row>
        <el-col class="item" :span="6">
          <div>{{data.order.orderTotal}}</div>
          <div>订单总数（笔）</div>
        </el-col>
        <el-col class="item" :span="6">
          <div>{{data.order.orderNum}}</div>
          <div>新增订单数（笔)</div>
        </el-col>
        <el-col class="item" :span="6">
          <div>{{data.order.awaitNum}}</div>
          <div>待发货（笔）)</div>
        </el-col>
        <el-col class="item" :span="6">
          <div>{{data.order.successNum}}</div>
          <div>已完成（笔）</div>
        </el-col>
      </el-row>
    </div>
    <div style="margin-bottom: 30px">
      <p class="title mbottom">用户</p>
      <el-row>
        <el-col class="item" :span="6">
          <div>{{data.user.userTotal}}</div>
          <div>用户总数</div>
        </el-col>
        <el-col class="item" :span="6">
          <div>{{data.user.newUserTotal}}</div>
          <div>今日新增用户</div>
        </el-col>
        <el-col class="item" :span="6">
          <div>{{data.user.yesterdayUserTotal}}</div>
          <div>昨日新增用户)</div>
        </el-col>
        <el-col class="item" :span="6">
          <div>{{data.user.yesterdayPayUser}}</div>
          <div>昨日付款用户</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getData } from '@/api/data/index'

export default {
  name: 'MemberData',
  data () {
    return {
      data: {
        finance: {
          expendMoney: '', // 支出总额（元）
          moneyTotal: '', // 代收现金总额（元)
          profit: '', // 利润总额（元）
          revenue: '' // 营收总额（元）
        },
        order: {
          awaitNum: '', // 待发货（笔）
          orderNum: '', // 新增订单数（笔)
          orderTotal: '', // 订单总数（笔）
          successNum: '' // 已完成（笔）
        },
        user: {
          newUserTotal: '', // 今日新增用户
          userTotal: '', // 用户总数
          yesterdayPayUser: '', // 昨日付款用户
          yesterdayUserTotal: '' // 昨日新增用户
        }
      }
    }
  },
  created () {
    // this._getData()
  },
  methods: {
    _getData () {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getData().then((res) => {
        loading.close()
        this.data = res.data
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.title {
  margin-left: 0;
}
.item {
  border: 1px solid #e7eaec;
  border-right: 0px;
  padding: 35px 20px;
  height: 140px;
  text-align: center;
  font-size: 18px;
  &:last-child {
    border-right: 1px solid #e7eaec;
  }
  div:first-child {
    font-size: 30px;
    color: #555;
  }
}
</style>
