<template>
  <div>
    <div class="mcard mbottom">
      <el-steps class="steps" :active="2" simple>
        <el-step title="1.开票订单选择" icon="el-icon-document"></el-step>
        <el-step title="2.确定发票信息和地址" icon="el-icon-location-outline"></el-step>
      </el-steps>
      <div class="tip">
        <p>发票信息：</p>
        <p class="tip-item">开票金额：¥{{data.total_price}}</p>
        <p class="tip-item">发票抬头：{{invoiceInfo.title}}</p>
        <p class="tip-item">发票类型：{{invoiceInfo.invoice_type==='1' ? '普通发票' : '专用发票'}}</p>
        <template v-if="invoiceInfo.invoice_type==='2'">
          <p class="tip-item">基本开户银行名称：{{invoiceInfo.account_bank}}</p>
          <p class="tip-item">基本开户账号：{{invoiceInfo.account_number}}</p>
          <p class="tip-item">注册场所地址：{{invoiceInfo.register_address}}</p>
          <p class="tip-item">注册固定电话：{{invoiceInfo.telephone}}</p>
        </template>
      </div>
      <el-button type="primary" size="medium" plain @click="routerToInfo">设 置</el-button>
    </div>
    <div class="mcard">
      <div class="title">寄送地址（将以快递方式寄送给您）</div>
      <el-button class="btn-address" type="primary" size="medium" plain @click="routerToAddress">管 理</el-button>
      <el-table
        :data="addressList"
        highlight-current-row
        @row-click="handleCurrentChange"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column width="100" align="center">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.row.id">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="收件人姓名" align="center"></el-table-column>
        <el-table-column prop="telphone" label="电话号码" align="center"></el-table-column>
        <el-table-column label="地址" align="center">
          <template
            slot-scope="scope"
          >{{`${scope.row.province_name} ${scope.row.city_name} ${scope.row.area_name} ${scope.row.street_name} ${scope.row.address_desc}`}}</template>
        </el-table-column>
      </el-table>
      <div class="btn-wrapper">
        <el-button
          type="primary"
          size="medium"
          @click="submitInfo"
          :disabled="disabled"
          :loading="loading"
        >提 交</el-button>
        <el-button size="medium" @click="routerBack">返 回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getInvoiceInfo, getInvoiceAddress, toInvoice } from '@/api/finance/invoice'
export default {
  props: {
    data: {
      type: Object
    }
  },
  data () {
    return {
      invoiceInfo: {},
      addressList: [{
        id: '1',
        defualt: '',
        address: '',
        name: '',
        telphone: ''
      }, {
        id: '2',
        defualt: '',
        address: '',
        name: '',
        telphone: ''
      }],
      radio: '',
      disabled: false,
      loading: false
    }
  },
  created () {
    // getInvoiceInfo().then(res => {
    //   this.invoiceInfo = res.data
    // })
    // this._getInvoiceAddress()
  },
  methods: {
    handleCurrentChange (val) {
      this.radio = val.id
    },
    routerToInfo () {
      this.$router.push({ path: '/finance/invoice/info' })
    },
    routerToAddress () {
      this.$router.push({ path: '/finance/invoice/address' })
    },
    routerBack () {
      this.$emit('back')
    },
    submitInfo () {
      this._toInvoice()
    },
    _getInvoiceAddress () {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getInvoiceAddress().then(res => {
        loading.close()
        this.radio = res.data.find(item => {
          return item.default === '1'
        }).id // 获取默认地址
        this.addressList = res.data
      })
    },
    _toInvoice () {
      // let data = {}
      // data.form = this.data
      // data.address_id = this.radio
      // this.disabled = true
      // this.loading = true
      // toInvoice(data).then(() => {
      //   this.$message({
      //     message: '提交成功！',
      //     type: 'success'
      //   })
      //   this.disabled = false
      //   this.loading = false
      //   this.$emit('back')
      //   this.$router.push({ path: '/finance/invoice/recoder' })
      // })
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
.btn-wrapper {
  margin: 40px 0;
}
.btn-address {
  margin: 20px 0;
}
</style>
