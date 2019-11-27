<template>
  <div>
    <div class="explain">任何渠道来源的商品，对客户和用户的运费统一设定</div>
    <el-form :model="form" ref="fom" :inline="true" size="small">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span class="tit">客户运费设置:</span>
        </div>
        <div class="tip">说明：客户运费用于会员向客户收取运费，运费的满足金额以订单中，商品的分销价为标准。客户运费不会按照供应商分开收运费，每个订单，只会收取客户一次运费，运费金额随订单扣减站点账户余额一并扣除。</div>
        <div class="item-wrapper">
          客户运费按照满
        <el-form-item >
          <el-input type="number" v-model="form.store_freight_charges" min="0"></el-input>
        </el-form-item>
        元包邮，不满则收取
        <el-form-item >
          <el-input type="number" v-model="form.store_freight_price" min="0"></el-input>
        </el-form-item>
        元运费
        </div>
      </el-card>
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span class="tit">用户运费设置:</span>
        </div>
        <div class="tip">说明：用户运费用于收取用户在商城消费时产生的运费，运费的满足金额以订单中，商品的销售价为标准。用户运费不会按照供应商分开收运费，每个订单，只会收取用户一次运费，运费金额随用户支付订单一起支付。</div>
        <div class="item-wrapper">
          用户运费按照满
        <el-form-item >
          <el-input type="number" v-model="form.user_freight_charges" min="0"></el-input>
        </el-form-item>
        元包邮，不满则收取
        <el-form-item >
          <el-input type="number" v-model="form.user_freight_price" min="0"></el-input>
        </el-form-item>
        元运费
        </div>
      </el-card>
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span class="tit">开通积分抵扣运费功能:</span>
          <el-checkbox class="checkbox" v-model="checkbox"></el-checkbox>
        </div>
        <div class="tip">开通后，用户可使用积分来抵扣运费，运费积分值按照积分商城汇率计算</div>
      </el-card>
      <div style="text-align: center; margin: 40px 0;">
        <el-button type="primary" @click="submitForm" :loading="loading">保 存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { freightEdit } from '@/api/mallapp/setting/freight'

export default {
  props: {
    data: {
      type: Object,
      defualt: () => {}
    }
  },
  data () {
    return {
      checkbox: false,
      loading: false,
      form: {
        store_freight_charges: '', // 客户运费满 包邮
        store_freight_price: '', // 客户运费不满则收取
        user_freight_charges: '', // 用户运费满 包邮
        user_freight_price: '', // 用户运费不满则收取
        is_integral_freight: '2' // 开通积分抵扣运费功能 1开通 2不开通
      }
    }
  },
  created () {
    this.initForm()
  },
  methods: {
    submitForm () {
      this._freightEdit()
    },
    initForm () {
      let form = {}
      form.store_freight_charges = this.data.store_freight_charges
      form.store_freight_price = this.data.store_freight_price
      form.user_freight_charges = this.data.user_freight_charges
      form.user_freight_price = this.data.user_freight_price
      form.is_integral_freight = this.data.is_integral_freight
      this.form = Object.assign({}, form)
      this.checkbox = this.form.is_integral_freight === '1'
    },
    _freightEdit () {
      // this.loading = true
      freightEdit(this.form).then(() => {
        this.loading = false
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.$emit('refresh')
      })
    }
  },
  watch: {
    checkbox (val) {
      if (val) {
        this.form.is_integral_freight = '1'
      } else {
        this.form.is_integral_freight = '2'
      }
    },
    data () {
      this.initForm()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/variable.scss';
  .box-card {
    margin-bottom: 20px;
  }
  .tit {
    color: $themeColor;
    font-size: 14px;
  }
  .explain {
    padding: 12px;
    margin-bottom: 20px;
    font-size: 14px;
    background: #f5f7fa;
  }
  .tip {
    margin-bottom: 20px;
    font-size: 14px;
    color: #999;
  }
  .checkbox {
    margin-left: 20px;
  }
  .item-wrapper {
    line-height: 32px;
    font-size: 14px;
  }
</style>
