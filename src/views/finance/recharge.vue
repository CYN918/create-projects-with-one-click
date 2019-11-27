<template>
  <div class="margin mcard">
    <div class="title">预存预付款</div>
    <el-form :model="form" :rules="rules" ref="form" label-width="250px" class="form-wrapper">
      <el-form-item label="公司名称：" prop="person">
        <p>{{certification && certification.company_name || '博士鹰信息技术有限公司'}}</p>
      </el-form-item>
      <el-form-item label="预存金额：" prop="money">
        <el-form-item>
          <el-input type="number" placeholder="请输入金额" v-model="form.money" min="100"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="支付方式：">
        <el-form-item>
          <span
            class="image"
            v-for="item in payList"
            :key="item.payType"
            @click="switchPayType(item.payType)"
          >
            <img
              v-if="item.payType === form.pay_type"
              :src="require(`@/common/images/finance/${item.imageUrlBg}`)"
              alt
            >
            <img
              v-if="item.payType !== form.pay_type"
              :src="require(`@/common/images/finance/${item.imageUrl}`)"
              alt
            >
          </span>
        </el-form-item>
      </el-form-item>
      <el-form-item v-show="form.pay_type === '3'">
        <div class="tip">
          <p>汇款须知：</p>
          <p>1.因线下方式到账时间会有延误，强烈建议采用微信、支付宝支付</p>
          <p>2.汇款金额100元起</p>
          <p>3.汇款之后请您将汇款信息提交申请，我们会于每个工作日16点查账，并在确认到账后一个工作日内充值到您的会员账户中</p>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')" :loading="loading">立即支付</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :title="payTitle" :visible.sync="dialogVisible" width="500px">
      <el-row class="pay-wrapper">
        <el-col :span="12">
          <p>
            支付金额
            <span class="color-sub">{{form.money}}</span>元
          </p>
          <div class="image">
            <img :src="scanPay.codeImgUrl">
          </div>
          <p>使用微信扫二维码支付</p>
          <p>
            <el-button type="text" @click="submitForm('form')">刷新</el-button>二维码
          </p>
        </el-col>
        <el-col :span="12">
          <div class="tip-image">
            <img :src="payTipImageUrl" alt>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { scanPay } from '@/api/public'

export default {
  name: 'FinanceeRecharge',
  data () {
    const validateMoney = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写充值金额'))
      } else {
        let flag = Number(value) >= 100
        if (!flag) {
          callback(new Error('充值金额不得少于100元'))
        } else {
          callback()
        }
      }
    }
    return {
      payList: [{
        payType: '1',
        imageUrl: 'weixin.png',
        imageUrlBg: 'weixinbg.png'
      }, {
        payType: '2',
        imageUrl: 'alipay.png',
        imageUrlBg: 'alipaybg.png'
      }, {
        payType: '3',
        imageUrl: 'underlinepay.png',
        imageUrlBg: 'underlinepaybg.png'
      }],

      form: {
        money: '',
        pay_type: '1'
      },
      rules: {
        money: [{ required: true, validator: validateMoney, trigger: 'blur' }]
      },
      loading: false,
      dialogVisible: false,
      payTitle: '',
      payTipImageUrl: '',
      scanPay: {
        codeImgUrl: '', // 二维码图片url
        codeUrl: '', // codeutl
        rechargeSn: '' // sn
      }
    }
  },
  computed: {
    ...mapGetters([
      'certification'
    ])
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._btnRecharge()
        } else {
          return false
        }
      })
    },
    switchPayType (type) {
      this.form.pay_type = type
    },
    _btnRecharge () {
      if (this.form.pay_type === '1') {
        // 微信支付
        this.payTitle = '微信支付'
        this.payTipImageUrl = require('@/common/images/finance/weiXinPhone.png')
        this._scanPay()
      } else if (this.form.pay_type === '2') {
        // 支付宝支付
        this.payTitle = '支付宝支付'
        this.payTipImageUrl = require('@/common/images/finance/alipayPhone.png')
        this._scanPay()
      } else {
        // 线下汇款
        this.$router.push({ path: `/finance/recharge_offline/${this.form.money}` })
      }
    },
    _scanPay () {
      this.loading = true
      this.dialogVisible = true
      scanPay(this.form).then(res => {
        this.loading = false
        this.scanPay.codeImgUrl = res.data.code_img_url
        this.scanPay.codeUrl = res.data.code_url
        this.scanPay.rechargeSn = res.data.recharge_sn
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import "@/common/scss/variable.scss";
.color-sub {
  color: $themeSubColor;
}
.form-wrapper {
  width: 790px;
}
.line {
  text-align: center;
}
.image {
  margin-right: 40px;
  cursor: pointer;
}
.tip {
  color: #a6a6a6;
  line-height: 1.5;
}
.pay-wrapper {
  text-align: center;
  p {
    font-size: 16px;
  }
  .image {
    width: 200px;
    height: 200px;
    margin: 10px;
  }
  .tip-image {
    margin: 0 auto;
  }
}
</style>
