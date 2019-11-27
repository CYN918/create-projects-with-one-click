<template>
  <div class="margin">
    <div class="mcard bottom">
      <div class="title">财务明细</div>
      <el-form :model="form" ref="form" class="form" :inline="true" size="small">
        <el-form-item>
          <el-date-picker
            v-model="dateValue"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="交易日期起始"
            end-placeholder="交易日期结束"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.finance_type" placeholder="请选择">
            <el-option value label="全部财务类型"></el-option>
            <el-option value="1" label="支付预付款"></el-option>
            <el-option value="2" label="采购"></el-option>
            <el-option value="3" label="服务费"></el-option>
            <el-option value="4" label="自有商品订单服务费"></el-option>
            <el-option value="5" label="运费"></el-option>
            <el-option value="6" label="退款"></el-option>
            <el-option value="7" label="平台扣款"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.finance_sn" placeholder="请选择">
            <el-option value="1" label="根据财务流水号"></el-option>
            <el-option value="2" label="根据订单号"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入关键字" v-model="form.keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="submitForm('form')">搜索</el-button>
          <el-button type="primary" size="small" plain>下载</el-button>
        </el-form-item>
        <div class="item-time">
          <el-button type="text" @click="btnChangeDate(0)">今日</el-button>
          <span class="item-space">|</span>
          <el-button type="text" @click="btnChangeDate(7)">近7日</el-button>
          <span class="item-space">|</span>
          <el-button type="text" @click="btnChangeDate(15)">近15日</el-button>
          <span class="item-space">|</span>
          <el-button type="text" @click="btnChangeDate(30)">近30日</el-button>
        </div>
        <div class="type-wrapper">
          <el-button :type="this.form.income === '' ? 'primary' : ''" size="small" @click="btnIncome('')">全部</el-button>
          <el-button :type="this.form.income === '1' ? 'primary' : ''" size="small" @click="btnIncome('1')">收入</el-button>
          <el-button :type="this.form.income === '2' ? 'primary' : ''" size="small" @click="btnIncome('2')">支出</el-button>
        </div>
      </el-form>
      <el-row class="summary-wrapper">
        <el-col :span="12">
          <p>收入</p>
          <p class="green">+{{income}}元</p>
          <p class="pen">{{income_num}}笔</p>
        </el-col>
        <el-col :span="12">
          <p>支出</p>
          <p class="color-sub">{{expend}}元</p>
          <p class="pen">{{expend_num}}笔</p>
        </el-col>
      </el-row>
    </div>
    <div class="mcard">
      <el-table :data="tableList" stripe border>
        <el-table-column label="入账时间" align="center" prop="time"/>
        <el-table-column label="财务流水号" align="center" prop="finance_sn"/>
        <el-table-column label="财务类型" align="center" prop="finance_type"/>
        <el-table-column label="来源站点" align="center" prop="store_name"/>
        <el-table-column label="交易内容" align="center" prop="content"/>
        <el-table-column label="收支金额（元）" align="center" prop="income"/>
        <el-table-column label="账户余额（元）" align="center" prop="balance"/>
        <el-table-column label="操作" align="center" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="handleToOrderDetail(scope.row.order_id)">详情</el-button>
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
import { getDetailList } from '@/api/finance/detail'

export default {
  name: 'FinanceDetail',
  data () {
    return {
      // [new Date(), new Date()]
      dateValue: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近7天',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近15天',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 15)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近30天',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      form: {
        start_time: '', // 交易日期起始
        end_time: '', // 交易日期结束
        finance_type: '', // 全部财务类型： ''全部财务类型, 1.支付预付款, 2.采购, 3.服务费, 4.自有商品订单服务费, 5.运费, 6.退款, 7.平台扣款
        finance_sn: '1', // 1.根据财务流水号, 2.根据订单号
        keyword: '', // 关键字
        income: '' // ''全部 , 1.收入， 2.支出
      },
      income: 0,
      income_num: 0,
      expend: 0,
      expend_num: 0,
      tableList: [{
        time: '', // 入账时间
        finance_sn: '', // 财务流水号
        finance_type: '采购', // 财务类型
        store_name: '', // 来源站点
        content: '', // 交易内容
        income: 0, // 收支金额（元）
        balance: 0, // 账户余额（元)
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
    // if (this.$route.query.income) {
    //   this.form.income = this.$route.query.income
    // }
    // this._getDetailList()
  },
  methods: {
    submitForm () {
      this._getDetailList()
    },
    handleSizeChange (val) {
      this.pagination.page_size = val
      this._getDetailList()
    },
    handleCurrentChange (val) {
      this.pagination.current_page = val
      this._getDetailList()
    },
    btnChangeDate (value) {
      let end = new Date()
      let start = new Date()
      start = start.getTime() - 3600 * 1000 * 24 * value
      this.dateValue = [start, end]
      this._getDetailList()
    },
    btnIncome (val) {
      this.form.income = val
      this._getDetailList()
    },
    handleToOrderDetail (id) {
      this.$router.push({ path: `/order/detail/${id}` })
    },
    _getDetailList () {
      if (this.dateValue !== '') {
        this.form.start_time = +this.dateValue[0]
        this.form.end_time = +this.dateValue[1]
      }

      let data = {}
      data.current_page = this.pagination.current_page
      data.page_size = this.pagination.page_size
      data.form = this.form

      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getDetailList(data).then(res => {
        loading.close()
        this.tableList = res.data.list
        this.pagination.total_count = res.data.total_count

        this.income = res.data.income
        this.income_num = res.data.income_num
        this.expend = res.data.expend
        this.expend_num = res.data.expend_num
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";

.bottom {
  margin-bottom: 20px;
}
.color-sub {
  color: $themeSubColor;
}
.green {
  color: #3ac691;
}
.form {
  margin-top: 20px;
}
.item-time {
  margin-bottom: 18px;
  .item-space {
    color: $themeColor;
    margin: 0 18px;
  }
}
.type-wrapper {
  margin-bottom: 18px;
}
.summary-wrapper {
  padding: 15px;
  background: #f7faff;
  p {
    line-height: 2;
  }
  .pen {
    font-size: 14px;
  }
}
.pagination {
  margin: 20px 0;
  text-align: right;
}
</style>
