<template>
  <div class="margin">
    <div class="mcard bottom">
      <div class="title">财务汇总</div>
      <div class="mcard-content">
        <el-button :type="btnType1" size="small" @click="changeType('month')">日汇总</el-button>
        <el-button :type="btnType2" size="small" @click="changeType('year')">月汇总</el-button>
        <el-date-picker
          v-show="type==='month'"
          class="date-warpper"
          v-model="month"
          type="month"
          placeholder="选择月"
          size="small"
          value-format="timestamp"
          @change="changeDate"
        ></el-date-picker>
        <el-date-picker
          v-show="type==='year'"
          class="date-warpper"
          v-model="year"
          type="year"
          placeholder="选择年"
          size="small"
          value-format="timestamp"
          @change="changeDate"
        ></el-date-picker>
        <el-button type="primary" class="export" size="small">{{totalBtnText}}</el-button>
      </div>
    </div>
    <div class="mcard">
      <el-table :data="list" stripe border>
        <el-table-column align="center" prop="index" width="100" :label="tableText"/>
        <el-table-column align="center" label="收入（元）">
          <template slot-scope="scope">
            <p class="green">{{scope.row.income}}</p>
            <p>{{scope.row.income_num}}笔</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="支出">
          <template slot-scope="scope">
            <p class="color-sub">{{scope.row.expend}}</p>
            <p>{{scope.row.expend_num}}笔</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="账户余额">
          <template slot-scope="scope">
            <p>期初：{{scope.row.start_balance}}</p>
            <p>期末：{{scope.row.end_balance}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope>
            <el-button type="text" size="small">{{tableBtnText}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getSummary } from '@/api/finance/summary'

export default {
  name: 'FinanceSummary',
  data () {
    return {
      date: '',
      year: +new Date(),
      month: +new Date(),
      placeholder: '选择月',
      type: 'month',
      btnType1: 'primary',
      btnType2: '',
      list: [
        // {
        //   index: 1,
        //   end_balance: 0,
        //   expend: 0,
        //   income: 0,
        //   start_balance: 0,
        //   expend_num: 0,
        //   income_num: 0
        // }
      ]
    }
  },
  created () {
    // if (this.$route.query.type) {
    //   this.changeType(this.$route.query.type)
    // }
    // this._getSummary()
  },
  computed: {
    tableText () {
      return this.type === 'month' ? '日期' : '月份'
    },
    tableBtnText () {
      return this.type === 'month' ? '下载日账单' : '下载月账单'
    },
    totalBtnText () {
      return this.type === 'month' ? '下载月账单' : '下载年账单'
    }
  },
  methods: {
    changeType (type) {
      this.type = type
      if (this.type === 'month') {
        this.btnType1 = 'primary'
        this.btnType2 = ''
      } else {
        this.btnType1 = ''
        this.btnType2 = 'primary'
      }
      this._getSummary()
    },
    changeDate () {
      this._getSummary()
    },
    _getSummary () {
      let data = {}
      data.year = new Date(this.year).getFullYear()
      if (this.type === 'month') {
        data.month = new Date(this.month).getMonth() + 1
      }
      getSummary(data).then(res => {
        this.list = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.color-sub {
  color: $themeSubColor;
}
.date-warpper {
  margin-left: 10px;
  vertical-align: top;
  span {
    height: 32px;
  }
}
.green {
  color: #3ac691;
}
.export {
  float: right;
}
.bottom {
  margin-bottom: 20px;
}
</style>
