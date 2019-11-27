<template>
  <div class="margin">
    <div class="tabs-header">
      <ul class="clearfix">
        <li @click="tabIndex(0)" :class="currentIndex===0 ? 'active' : ''">商品发票</li>
        <li @click="tabIndex(1)" :class="currentIndex===1 ? 'active' : ''">服务发票</li>
        <li @click="tabIndex(2)" :class="currentIndex===2 ? 'active' : ''">运费发票</li>
      </ul>
    </div>
    <div class="mcard mbottom">
      <div class="title">搜索条件</div>
      <el-form :model="form" ref="form" :inline="true" size="small">
        <el-form-item label="订单完成时间">
          <el-col :span="11">
            <el-date-picker placeholder="时间开始" v-model="form.start_time" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="11">
            <el-date-picker placeholder="时间结束" v-model="form.end_time" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.status" placeholder="请选择发票状态">
            <el-option label="全部发票状态" value></el-option>
            <el-option label="审核中" value="1"></el-option>
            <el-option label="审核已通过" value="2"></el-option>
            <el-option label="审核不通过" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.invoice_sn" placeholder="请输入发票编号搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mcard">
      <el-table :data="list" stripe border ref="table">
        <el-table-column label="发票金额" align="center">
          <template slot-scope="scope">
            <span class="sub">¥{{scope.row.money}}</span>
          </template>
        </el-table-column>
        <el-table-column label="发票编号" prop="invoice_sn" align="center"></el-table-column>
        <el-table-column label="申请时间" prop="addtime" align="center"></el-table-column>
        <el-table-column label="供应商（发票开具方）" prop="company" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{_nomalStatus(scope.row.status)}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="routerToDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getRecoderList } from '@/api/finance/invoice'

export default {
  name: 'FinanceRecoder',
  data () {
    return {
      currentIndex: 0,
      form: {
        start_time: '', // 时间开始
        end_time: '', // 时间结束
        status: '', // 发票状态： ''全部发票状态， 1.审核中 2.审核已通过 3.审核不通过
        invoice_sn: '' // 请输入发票编号搜索
      },
      list: [
        // {
        //   id: '', // id
        //   money: '', // 发票金额
        //   invoice_sn: '', // 发票编号
        //   addtime: '', // 申请时间
        //   company: '', // 供应商（发票开具方）
        //   status: '', // 状态
        //   invoice_type: '', // 发票类型：
        //   recieve_name: '', // 收货人
        //   recieve_address: '', // 收货人地址
        //   recieve_phone: '', // 收货人联系电话
        //   express_code: 'shunfeng', // 物流公司code
        //   express_name: '顺丰', // 物流公司名称
        //   express_sn: '446056391853' // 物流编号
        // }
      ],
      pagination: {
        current_page: 1,
        page_size: 20,
        total_count: 0
      }
    }
  },
  created () {
    this._getRecoderList()
  },
  methods: {
    tabIndex (index) {
      this.currentIndex = index
      this._getRecoderList()
    },
    submitForm () {
      this._getRecoderList()
    },
    routerToDetail (val) {
      this.$router.push({ name: 'RecoderDetail', params: val, props: { aaa: val } })
    },
    _getRecoderList () {
      let data = {}
      data.current_page = this.pagination.current_page
      data.page_size = this.pagination.page_size
      data.form = Object.assign({}, this.form)
      data.form.type = this.currentIndex

      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getRecoderList(data).then(res => {
        loading.close()
        this.list = res.data.list
        this.pagination.total_count = res.data.total_count
        this.totalPrice = res.data.total_price
      })
    },
    _nomalStatus (val) {
      let ret
      switch (val) {
        case '1':
          ret = '审核中'
          break
        case '2':
          ret = '审核已通过'
          break
        case '3':
          ret = '审核不通过'
          break
        default:
          break
      }
      return ret
    }
  }
}
</script>

<style lang='scss' scoped>
@import "@/common/scss/variable.scss";
.line {
  text-align: center;
}
.sub {
  color: $themeSubColor;
}
</style>
