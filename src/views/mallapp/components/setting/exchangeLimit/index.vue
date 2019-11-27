<template>
  <div class="margin">
    <div class="mcard">
      <div class="title">兑换限制</div>
      <div class="tip">兑换限制可帮您设置每位用户在X天内，可以兑换订单数和兑换金额。若超出条件，则提示超出兑换限制。</div>
      <el-form :model="form" :inline="true" class="form-wrapper" size="small">
        <el-checkbox-group v-model="form.checked" class="checkbox">
          <el-checkbox label="order_limit">根据订单数量限制</el-checkbox>
          <el-checkbox label="exchange_limit">根据兑换金额限制</el-checkbox>
          <el-checkbox label="all_limit">总兑换金额限制</el-checkbox>
        </el-checkbox-group>
        <div v-show="orderShow">
          <el-form-item label="限制用户在"><el-input type="number" min="0" class="width16" v-model="form.order_limit_days"></el-input></el-form-item>
          <el-form-item label="天内只可兑换"><el-input type="number" min="0" class="width16" v-model="form.order_limit_num"></el-input></el-form-item>
          <el-form-item label="笔订单。"></el-form-item>
        </div>
        <div v-show="exchangerShow">
          <el-form-item label="限制用户在"><el-input type="number" min="0" class="width16" v-model="form.exchange_limit_days"></el-input></el-form-item>
          <el-form-item label="天内只可兑换"><el-input type="number" min="0" class="width16" v-model="form.exchange_limit_points"></el-input></el-form-item>
          <el-form-item label="积分。"></el-form-item>
        </div>
        <div v-show="allShow">
          <el-form-item label="限制所有用户在"><el-input type="number" min="0" class="width16" v-model="form.all_limit_days"></el-input></el-form-item>
          <el-form-item label="天内只可兑换"><el-input type="number" min="0" class="width16" v-model="form.all_limit_points"></el-input></el-form-item>
          <el-form-item label="积分。"></el-form-item>
        </div>
      </el-form>
      <el-button class="btn-submit" type="primary" @click="submitForm" :loading="loading">保 存</el-button>
    </div>
  </div>
</template>

<script>
import { getExchLimit, editExchLimit } from '@/api/mallapp/setting/exchangeLimit'

export default {
  name: 'MsettingExchangeLimit',
  data () {
    return {
      form: {
        checked: [],
        order_limit_days: 0, // 订单数量限制: 订单限制天数
        order_limit_num: 0, // 订单数量限制: 订单限制量
        exchange_limit_days: 0, // 兑换金额限制: 兑换金额限制限制天数
        exchange_limit_points: 0, // 兑换金额限制: 兑换金额限制量
        all_limit_days: 0, // 总兑换金额限制: 总兑换金额限制天数
        all_limit_points: 0 // 总兑换金额限制: 总兑换金额限制量
      },
      loading: false
    }
  },
  created () {
    this._getExchLimit()
  },
  computed: {
    orderShow () {
      let index = this.form.checked.findIndex(item => item === 'order_limit')
      return index > -1
    },
    exchangerShow () {
      let index = this.form.checked.findIndex(item => item === 'exchange_limit')
      return index > -1
    },
    allShow () {
      let index = this.form.checked.findIndex(item => item === 'all_limit')
      return index > -1
    }
  },
  methods: {
    submitForm () {
      const reg = /^[0-9]*$/
      let ret = {}
      // orderShow
      if (this.orderShow) {
        if (!reg.test(this.form.order_limit_days) || Number(this.form.order_limit_days) === 0) {
          this.$message({
            message: '订单数量 限制天数 只能为正整数',
            type: 'warning'
          })
          return
        }
        if (!reg.test(this.form.order_limit_num) || Number(this.form.order_limit_num) === 0) {
          this.$message({
            message: '订单数量 限制数量 只能为正整数',
            type: 'warning'
          })
          return
        }
        ret.order_limit_days = this.form.order_limit_days
        ret.order_limit_num = this.form.order_limit_num
      }
      // exchangerShow
      if (this.exchangerShow) {
        if (!reg.test(this.form.exchange_limit_days) || Number(this.form.exchange_limit_days) === 0) {
          this.$message({
            message: '兑换金额 限制天数 只能为正整数',
            type: 'warning'
          })
          return
        }
        if (!reg.test(this.form.exchange_limit_points) || Number(this.form.exchange_limit_points) === 0) {
          this.$message({
            message: '兑换积分 限制数量 只能为正整数',
            type: 'warning'
          })
          return
        }
        ret.exchange_limit_days = this.form.exchange_limit_days
        ret.exchange_limit_points = this.form.exchange_limit_points
      }
      // allShow
      if (this.allShow) {
        if (!reg.test(this.form.all_limit_days) || Number(this.form.exchange_limit_dayall_limit_dayss) === 0) {
          this.$message({
            message: '总兑换 限制天数 只能为正整数',
            type: 'warning'
          })
          return
        }
        if (!reg.test(this.form.all_limit_points) || Number(this.form.all_limit_points) === 0) {
          this.$message({
            message: '总兑换积分 数量 只能为正整数',
            type: 'warning'
          })
          return
        }
        ret.all_limit_days = this.form.all_limit_days
        ret.all_limit_points = this.form.all_limit_points
      }

      if (this.form.checked.length > 0) {
        let data = {
          checked: this.form.checked,
          ...ret
        }
        this._editExchLimit(data)
      } else {
        this.$message({
          message: '请选择兑换限制',
          type: 'warning'
        })
      }
    },
    _getExchLimit () {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getExchLimit().then(res => {
        loading.close()
        this.form = Object.assign(this.form, { ...res.data })
      })
    },
    _editExchLimit (data) {
      // this.loading = true
      editExchLimit(data).then(() => {
        this.loading = false
        this._getExchLimit()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.width16 {
  width: 160px;
}
  .tip {
    padding: 20px;
    margin-bottom: 20px;
    background: #DDE9F7;
    font-size: 14px;
  }
  .checkbox {
    margin-bottom: 20px;
  }
  .btn-submit {
    margin: 20px 0;
  }
</style>
