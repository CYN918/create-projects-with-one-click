<template>
  <div class="margin">
    <el-row :gutter="20" class="m-bottom">
      <el-col :span="12">
        <div class="mcard">
          <div class="title">
            预付款账户（元）
            <el-tooltip class="item-tooltip" effect="dark" placement="top">
              <i class="el-icon-question"></i>
              <div slot="content">
                <p class="tool-tip">预付款主要用于支付采购货款、博士鹰服务费、短信费等，此金额不可提现</p>
              </div>
            </el-tooltip>
          </div>
          <div class="mcard-content">
            <div class="price">￥{{advancePayment}}</div>
            <el-button type="primary" @click="routerToRecharge">充值</el-button>
          </div>
          <div class="operate">
            <el-switch class="switch" v-model="switchValue" inactive-text="账户余额预警"></el-switch>
            <div class="item-warn" v-show="switchValue">
              预警阈值值为：￥{{warningMoney}}
              <el-button class="btn-warn" type="text" size="small" @click="btnEdit">修改</el-button>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="mcard">
          <div class="title">
            站点现金账户总额
            <el-tooltip
              class="item-tooltip"
              effect="dark"
              content="现金账户金额来源于用户在商城使用博士鹰微信支付，由博士鹰代收的金额，此金额可提现"
              placement="top"
            >
              <i class="el-icon-question"></i>
              <div slot="content">
                <p class="tool-tip">现金账户金额来源于用户在商城使用博士鹰微信支付，由博士鹰代收的金额，此金额可提现</p>
              </div>
            </el-tooltip>
          </div>
          <div class="mcard-content">
            <div class="price">￥{{amountCash}}</div>
            <el-button type="primary" @click="routerTostoreManage">管理</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="mcard m-bottom">
      <div class="title">
        <el-button type="text" :class="this.type !== 1 ? 'active': ''" @click="changeType(1)">日汇总</el-button>
        <span class="space">|</span>
        <el-button type="text" :class="this.type !== 30 ? 'active': ''" @click="changeType(30)">月汇总</el-button>
      </div>
      <el-row :gutter="80">
        <el-col :span="8" class="midlle-wrapper">
          <el-row :gutter="20">
            <el-col :span="12">
              <p class="middle-item">收入总计：</p>
            </el-col>
            <el-col :span="12">
              <p class="middle-item color-sub">{{income}}</p>
              <el-button type="text" @click="btnToPageOne">查看更多</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8" class="midlle-wrapper border">
          <el-row :gutter="20">
            <el-col :span="12">
              <p class="middle-item">支出总计：</p>
              <p class="middle-item">商品采购：</p>
            </el-col>
            <el-col :span="12">
              <p class="middle-item color-sub">{{spending}}</p>
              <p class="middle-item">{{procurementNum}}</p>
              <el-button type="text" @click="btnToPageTwo">查看更多</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="12">
              <p class="middle-item">可索取发票：</p>
              <p class="middle-item">短信剩余条数：</p>
            </el-col>
            <el-col :span="12">
              <p class="middle-item color-sub">{{invoiceNum}}</p>
              <p class="middle-item">{{smsNum}}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="m-bottom">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="mcard item-list">
            <div class="image">
              <img :src="require('@/common/images/finance/list_1.png')" alt>
            </div>
            <div class="name">
              <p class="name-tit">资金流水</p>
              <p class="sub">（纵览全局）</p>
            </div>
            <el-row class="btn-warpper">
              <el-col :span="11">
                <el-button type="text" size="small" @click="routerToSummary">财务汇总</el-button>
              </el-col>
              <el-col :span="2">|</el-col>
              <el-col :span="11">
                <el-button type="text" size="small" @click="routerToDetail">财务明细</el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="mcard item-list">
            <div class="image">
              <img :src="require('@/common/images/finance/list_2.png')" alt>
            </div>
            <div class="name">
              <p class="name-tit">站点财务</p>
              <p class="sub">（资金控制）</p>
            </div>
            <el-row class="btn-warpper">
              <el-col :span="11">
                <el-button type="text" size="small" @click="routerToStore(0)">站点账户管理</el-button>
              </el-col>
              <el-col :span="2">|</el-col>
              <el-col :span="11">
                <el-button type="text" size="small" @click="routerToStore(1)">站点交易明细</el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="mcard item-list">
            <div class="image">
              <img :src="require('@/common/images/finance/list_3.png')" alt>
            </div>
            <div class="name">
              <p class="name-tit">发票管理</p>
              <p class="sub">（票务处理）</p>
            </div>
            <el-row class="btn-warpper">
              <el-col :span="11">
                <el-button type="text" size="small" @click="routerToInvoice">待开发票</el-button>
              </el-col>
              <el-col :span="2">|</el-col>
              <el-col :span="11">
                <el-button type="text" size="small" @click="routerToRecoder">已开发票</el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="mcard item-list">
            <div class="image">
              <img :src="require('@/common/images/finance/list_4.png')" alt>
            </div>
            <div class="name">
              <p class="name-tit">短信管理</p>
              <p class="sub">（短信设置）</p>
            </div>
            <el-row class="btn-warpper">
              <el-col :span="11">
                <el-button type="text" size="small">购买短信套餐</el-button>
              </el-col>
              <el-col :span="2">|</el-col>
              <el-col :span="11">
                <el-button type="text" size="small">短信签名设置</el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="mcard item-list">
            <div class="image">
              <img :src="require('@/common/images/finance/list_5.png')" alt>
            </div>
            <div class="name">
              <p class="name-tit">设置</p>
            </div>
            <el-row class="btn-warpper">
              <el-col :span="24">
                <el-button type="text" size="small" @click="routerToCashAccount">结算账户</el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="预警阈值修改" :visible.sync="dialogVisible" width="700px">
      <el-alert title="注意：当账户余额小于该值时，每天短信提醒一次。" type="success" :closable="false"></el-alert>
      <el-form :model="form" ref="form" class="form" label-width="200px" :rules="rules">
        <el-form-item label="账户余额预警阈值设置：" prop="warningMoney">
          <el-input style="width: 200px" type="number" v-model="form.warningMoney"/>
          <span style="margin-left: 20px">元</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getOverviewMoney, editWarningMoney, getOveriewSummary } from '@/api/finance/overview'

export default {
  name: 'Finance',
  data () {
    const validateNum = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写金额'))
      } else {
        const flag = /^[1-9]\d{0,5}$|^[0-9]{1,6}\.[0-9]{1,2}$/.test(value)
        if (!flag) {
          callback(new Error('请填写正确的数字，小数点前最多输入6位，小数点后最多输入2位'))
        }
        callback()
      }
    }
    return {
      switchValue: true,
      advancePayment: 0,
      amountCash: 0,
      warningMoney: 0,
      dialogVisible: false,
      type: 1,
      form: {
        warningMoney: null
      },
      rules: {
        warningMoney: [
          { required: true, message: '请填写金额', trigger: 'blur' },
          { validator: validateNum, trigger: 'blur' }
        ]
      },
      income: 0,
      invoiceNum: 0,
      procurementNum: 0,
      smsNum: 0,
      spending: 0
    }
  },
  created () {
    // this._getOverviewMoney()
    // this._getOveriewSummary()
  },
  methods: {
    btnEdit () {
      this.dialogVisible = true
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._editwarningMoney()
        } else {
          return false
        }
      })
    },
    changeType (type) {
      this.type = type
      this._getOveriewSummary()
    },
    btnToPageOne () {
      if (this.type === 1) {
        this.$router.push({ path: '/finance/detail', query: { income: '1' } })
      }
      if (this.type === 30) {
        this.$router.push({ path: '/finance/summary', query: { type: 'year' } })
      }
    },
    btnToPageTwo () {
      if (this.type === 1) {
        this.$router.push({ path: '/finance/detail', query: { income: '2' } })
      }
      if (this.type === 30) {
        this.$router.push({ path: '/finance/summary', query: { type: 'year' } })
      }
    },
    routerToSummary () {
      this.$router.push({ path: '/finance/summary' })
    },
    routerToDetail () {
      this.$router.push({ path: '/finance/detail' })
    },
    routerToStore (currentIndex) {
      this.$router.push({ path: '/finance/store', query: { currentIndex } })
    },
    routerToInvoice () {
      this.$router.push({ path: '/finance/invoice' })
    },
    routerToRecoder () {
      this.$router.push({ path: '/finance/invoice/recoder' })
    },
    routerToCashAccount () {
      this.$router.push({ path: '/finance/cash_account' })
    },
    routerTostoreManage () {
      this.$router.push({ path: '/finance/store_manage' })
    },
    routerToRecharge () {
      this.$router.push({ path: '/finance/recharge' })
    },
    _getOverviewMoney () {
      getOverviewMoney().then(res => {
        this.advancePayment = res.data.advance_payment
        this.amountCash = res.data.amount_cash
        this.warningMoney = res.data.warning_money
      })
    },
    _editwarningMoney () {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      editWarningMoney(this.warningMoney).then(res => {
        loading.close()
        this.dialogVisible = false
        this._getOverviewMoney()
      })
    },
    _getOveriewSummary () {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getOveriewSummary(this.type).then(res => {
        loading.close()
        this.income = res.data.income
        this.invoiceNum = res.data.invoice_num
        this.procurementNum = res.data.procurement_num
        this.smsNum = res.data.sms_num
        this.spending = res.data.spending
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.price {
  margin: 30px 0;
  font-size: 32px;
  color: $themeSubColor;
}
.space {
  margin: 0 10px;
}
.color-sub {
  color: $themeSubColor;
}
.active {
  color: #666;
}
.mcard {
  position: relative;
  margin-bottom: 20px;
  .operate {
    position: absolute;
    right: 20px;
    bottom: 20px;
    .switch {
      margin-bottom: 10px;
    }
    .item-warn {
      .btn-warn {
        margin-left: 20px;
      }
    }
  }
}
.item-tooltip {
  color: #999;
}
.tool-tip {
  width: 210px;
}
.m-bottom {
  margin-bottom: 20px;
}
.midlle-wrapper {
  line-height: 1.5;
}
.border {
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
.middle-item {
  margin-bottom: 10px;
  font-size: 14px;
}
.item-list {
  .image {
    text-align: center;
    margin-bottom: 10px;
    img {
      width: 133px;
      height: 108px;
    }
  }
  .name {
    height: 41px;
    margin-bottom: 20px;
    text-align: center;
    .name-tit {
      margin-bottom: 5px;
      font-weight: 700;
    }
  }
  .btn-warpper {
    text-align: center;
    line-height: 32px;
  }
}
.form {
  margin-top: 20px;
}
</style>
