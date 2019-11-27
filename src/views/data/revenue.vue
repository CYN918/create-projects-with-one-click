<template>
  <div class="margin">
    <div class="mcard mbottom">
      <p class="title">营收数据</p>
      <el-form :model="form" ref="form" size="small" :inline="true">
        <el-form-item prop="search_type">
          <el-select v-model="selectTime">
            <el-option label="昨日" value="1"></el-option>
            <el-option label="最近7日" value="7"></el-option>
            <el-option label="最近15日" value="15"></el-option>
            <el-option label="最近30日" value="30"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="form.start_time" value-format="yyyy-MM-dd" placeholder="选择开始时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="form.end_time" value-format="yyyy-MM-dd" placeholder="选择开始时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit('form')">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mcard mbottom" id="main"></div>
    <div class="mcard">
      <p class="title">每日营收统计</p>
      <el-select v-model="time" size="small">
        <el-option
          v-for="item in monthList"
          :label="item.key"
          :value="item.value"
          :key="item.value"
        ></el-option>
      </el-select>
      <el-table :data="tableData" stripe>
        <el-table-column label="日期" prop="date" align="center"></el-table-column>
        <el-table-column label="利润" prop="profit" align="center"></el-table-column>
        <el-table-column label="营收总额" prop="money" align="center"></el-table-column>
        <el-table-column label="下单数" prop="order" align="center" width="100"></el-table-column>
        <el-table-column label="支付订单数" prop="pay_order" align="center"></el-table-column>
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
  </div>
</template>

<script>
import { tableMix } from '@/common/js/mixinTable'
import { getRevenueList } from '@/api/data/index'
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/line')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')

export default {
  name: 'MemberRevenue',
  mixins: [tableMix],
  data () {
    return {
      form: {
        start_time: '',
        end_time: ''
      },
      selectTime: '7',
      time: '',
      monthList: [],
      revenueList: []
    }
  },
  created () {
    // let now = new Date()
    // this.time = `${now.getFullYear()}-${now.getMonth() + 1}`
    // this._getMonthList()
    // this._initTime()
    // this._getRevenueList()
  },
  methods: {
    getTableData () {
      this.tableSubmitData.action = 'daily'
      this.tableSubmitData.time = this.time
      return getRevenueList(this.tableSubmitData)
    },
    submit () {
      this._getRevenueList()
    },
    _getMonthList () {
      let ret = []
      let time = new Date()
      let year = time.getFullYear()
      let curMonth = time.getMonth()

      for (let i = 0; i < curMonth + 1; i++) {
        ret.push({ key: `${year}年${curMonth - i + 1}月`, value: `${year}-${curMonth - i + 1}` })
      }
      this.monthList = ret
    },
    _initTime () {
      let now = new Date()
      let newTime = new Date(now - 1000 * 3600 * 24 * Number(this.selectTime))
      let time = { start_time: `${newTime.getFullYear()}-${newTime.getMonth() + 1}-${newTime.getDate()}`, end_time: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}` }
      this.form = Object.assign({}, time)
    },
    _getRevenueList () {
      let data = {}
      data.current_page = 1
      data.page_size = 31
      data.form = this.form
      getRevenueList(data).then(res => {
        this.revenueList = res.data.list
        this._initEcharts()
      })
    },
    _initEcharts () {
      var xDate = []
      var money = []
      var profit = []
      this.revenueList.map((item) => {
        xDate.push(item.date)
        money.push(item.money)
        profit.push(item.profit)
      })
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '营销数据折线图'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['营收总额', '利润']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xDate
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '营收总额',
            type: 'line',
            stack: '总量',
            data: money
          },
          {
            name: '利润',
            type: 'line',
            stack: '总量',
            data: profit
          }
        ]
      })
    }
  },
  watch: {
    selectTime () {
      this._initTime()
    },
    time () {
      this._getTableData()
    },
    revenueList () {
      this._getRevenueList()
    }
  }
}
</script>

.<style lang="scss" scoped>
#main {
  height: 300px;
}
</style>
