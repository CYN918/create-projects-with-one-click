
<template>
  <div>
    <div class="mcard mbottom">
      <el-steps class="steps" :active="1" simple>
        <el-step title="1.开票订单选择" icon="el-icon-document"></el-step>
        <el-step title="2.确定发票信息和地址" icon="el-icon-location-outline"></el-step>
      </el-steps>
      <div class="tip">
        <p>温馨提示：</p>
        <p class="tip-item">1. 发票订单开具（单个订单不可拆分开票）。</p>
        <p class="tip-item">2. 博士鹰单张发票金额限额100万，索取金额超过100万将拆分成多张发票开具。</p>
      </div>
      <el-form :model="form" ref="form" :inline="true" size="small">
        <el-form-item label="订单完成时间">
          <el-col :span="11">
            <el-date-picker placeholder="时间开始" v-model="form.start_time" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker placeholder="时间结束" v-model="form.end_time" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="供应商名称" style="margin-left: 30px;">
          <el-input v-model="form.supplier_name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">搜索</el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="text" @click="routerToInfo">开票信息管理</el-button>
        <span class="space">|</span>
        <el-button type="text" @click="routerToRecoder">查看开票记录</el-button>
      </div>
    </div>
    <div class="mcard">
      <div class="title">可开票列表</div>
      <el-row class="count-wrapper">
        <el-col :span="8">
          <p>已选开票金额</p>
          <p class="sub">¥ {{selectPrice}}</p>
        </el-col>
        <el-col :span="8" class="center">
          <p>待开票总金额</p>
          <p class="green">¥ {{totalPrice}}</p>
        </el-col>
        <el-col :span="8" class="btn-wrapper">
          <el-button type="primary" size="small" :disabled="disabled" @click="btnToNext">索取发票</el-button>
          <p>
            <el-tooltip class="item" effect="dark" placement="bottom-start">
              <el-button type="text" style="color: #333; font-size: 12px;">无法开票原因？</el-button>
              <div slot="content">
                1.待开发票金额小于￥200
                <br>2.已选开票金额小于￥200
                <br>3.被飞象企服禁用了开票资格
              </div>
            </el-tooltip>
          </p>
        </el-col>
      </el-row>
      <div class="checked-wrapper">
        <el-checkbox v-model="checkedAll" @change="handleCheckedAll">全选所有页</el-checkbox>
      </div>
      <el-table  v-if="type !== 2" :data="list" stripe border @selection-change="handleSelectionChange" ref="table">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="订单号" prop="order_id"></el-table-column>
          <el-table-column label="完成时间" prop="time"></el-table-column>
          <el-table-column label="购买数量" prop="num" align="center"></el-table-column>
          <el-table-column label="商品名称" prop="title"></el-table-column>
          <el-table-column label="供应商（发票开具方）" prop="company"></el-table-column>
          <el-table-column label="商品单价" prop="member_price" align="center"></el-table-column>
          <el-table-column label="可开票金额" align="center">
            <template slot-scope="scope">{{(scope.row.member_price*scope.row.num).toFixed(2)}}</template>
          </el-table-column>
      </el-table>
       <el-table  v-if="type === 2" :data="list" stripe border @selection-change="handleSelectionChange" ref="table">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="订单号" prop="order_id"></el-table-column>
          <el-table-column label="完成时间" prop="time"></el-table-column>
          <el-table-column label="供应商（发票开具方）" prop="company"></el-table-column>
          <el-table-column label="运费金额" prop="freight_money" align="center"></el-table-column>
          <el-table-column label="已退款运费金额" prop="refund_money" align="center"></el-table-column>
          <el-table-column label="可开票金额" align="center">
            <template slot-scope="scope">{{(scope.row.member_price*scope.row.num).toFixed(2)}}</template>
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
import { getInvoiceList } from '@/api/finance/invoice'

export default {
  props: {
    type: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      totalPrice: 0,
      selectPrice: 0,
      checkedAll: false,
      form: {
        // type: 1, // 0.商品发票, 1.服务发票, 2.运费发票
        start_time: '', // 时间开始
        end_time: '', // 时间结束
        supplier_name: '' // 供应商名称
      },
      list: [{
        order_id: '', // 订单id
        time: '', // 完成时间
        num: '', // 购买数量
        title: '', // 商品名称
        company: '', // 供应商（发票开具方）
        supplier_id: '', // 供应商id
        member_price: null // 商品单价
      }],
      pagination: {
        current_page: 1,
        page_size: 20,
        total_count: 0
      },
      multipleSelection: []
    }
  },
  created () {
    // this._getInvoiceList()
  },
  computed: {
    disabled () {
      return !(Number(this.totalPrice) >= 200 && Number(this.selectPrice) >= 200)
    }
  },
  methods: {
    submitForm () {
      this._getInvoiceList()
    },
    handleSizeChange (val) {
      this.pagination.page_size = val
      this._getInvoiceList()
    },
    handleCurrentChange (val) {
      this.pagination.current_page = val
      this._getInvoiceList()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      let ret = 0
      val.map(item => {
        let price = (item.num * item.member_price)
        ret = ret + price
      })
      if (this.multipleSelection.length === this.list.length && this.checkedAll) {
        this.selectPrice = this.totalPrice
        return
      }

      this.selectPrice = ret.toFixed(2)
    },
    handleCheckedAll () {
      if (this.checkedAll && this.multipleSelection.length === this.list.length) {
        this.selectPrice = this.totalPrice
        return
      }
      this.$refs.table.toggleAllSelection()
    },
    btnToNext () {
      let data = Object.assign({}, this.form)
      data.invoice_type = this.type
      data.type = this.checkedAll ? '1' : '0'
      data.total_price = this.selectPrice
      data.ids = ''
      if (!this.checkedAll) {
        let ret = []
        this.multipleSelection.map(item => {
          ret.push(item.order_id)
        })
        data.ids = ret.join(',')
      }
      this.$emit('askInvoice', data)
    },
    routerToInfo () {
      this.$router.push({ path: '/finance/invoice/info' })
    },
    routerToRecoder () {
      this.$router.push({ path: '/finance/invoice/recoder' })
    },
    _getInvoiceList () {
      // let data = {}
      // data.current_page = this.pagination.current_page
      // data.page_size = this.pagination.page_size
      // data.form = Object.assign({}, this.form)
      // data.form.type = this.type

      // let loading = this.$loading({
      //   background: 'rgba(255,255,255,0.1)',
      //   text: '加载中，请稍后...'
      // })
      // getInvoiceList(data).then(res => {
      //   loading.close()
      //   this.list = res.data.list
      //   this.pagination.total_count = res.data.total_count
      //   this.totalPrice = res.data.total_price
      // })
    }
  },
  watch: {
    multipleSelection (newVal, oldVal) {
      if (newVal.length !== this.list.length) {
        this.checkedAll = false
      }
    },
    type () {
      this._getInvoiceList()
    }
  }
}
</script>

<style lang='scss' scoped>
@import "@/common/scss/variable.scss";
.steps {
  width: 800px;
  margin: 0 auto 20px auto;
}
.tip {
  margin-bottom: 30px;
  font-size: 14px;
  line-height: 1.5;
  .tip-item {
    font-size: 12px;
  }
}
.line {
  text-align: center;
}
.space {
  margin: 0 20px;
}
.count-wrapper {
  margin: 20px 0;
  .btn-wrapper {
    text-align: right;
  }
  .sub {
    color: $themeSubColor;
  }
  .green {
    color: $themeAuxColor;
  }
  .sub,
  .green {
    margin-top: 12px;
    font-size: 32px;
  }
  .center {
    text-align: center;
  }
}
.checked-wrapper {
  margin: 20px 0;
}
</style>
