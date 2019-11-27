<template>
  <div class="margin">
    <div class="mcard mbottom">
      <div class="title">管理</div>
      <el-row class="item-header" :gutter="40">
        <el-col :span="8" class="item">
          <p>代收现金账户总额</p>
          <p class="price yellow">¥{{cashTotalMoney}}</p>
        </el-col>
        <el-col :span="16" class="border-left">
          <p>锁定金额</p>
          <p class="price">¥{{lockMoney}}</p>
          <p>可提现金额</p>
          <p>
            <span class="price color-aux">¥{{depositeMoney}}</span>
            <span class="btn-wrapper">
              <el-button type="primary" size="medium" @click="btnToAccount">转至账户</el-button>
              <el-button size="medium" @click="btnDeposite">提现</el-button>
            </span>
          </p>
        </el-col>
      </el-row>
      <div class="tip">
        <p>温馨提示</p>
        <p>1.提现只能提现至会员账户下与实名认证信息同名账户的支付宝或银行卡；</p>
        <p>2.提现至会员银行卡或支付宝需3个工作日审核，提现至会员账户实时单到账；</p>
        <p>3.支付宝方式提现实时到账；银行卡提现预计3个工作日到账；</p>
        <p>4.提现至会员账户，无金额限制；提现至银行卡或支付宝需站点现金额账户总金额 ≥500元。</p>
      </div>
    </div>
    <div class="mcard mbottom">
      <div class="title">搜索条件</div>
      <el-form :model="form" ref="form" :inline="true" size="small">
        <el-form-item label="申请时间">
          <el-col :span="11">
            <el-date-picker placeholder="日期开始" v-model="form.start_time" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker placeholder="日期结束" v-model="form.end_time" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="完成时间">
          <el-col :span="11">
            <el-date-picker
              placeholder="日期开始"
              v-model="form.complent_state_time"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker
              placeholder="日期结束"
              v-model="form.complent_end_time"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.deposite_type" placeholder="提现方式">
            <el-option value="1" label="转入支付宝"></el-option>
            <el-option value="2" label="转入会员账户"></el-option>
            <el-option value="3" label="提现至银行卡"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.deposite_state" placeholder="提现状态">
            <el-option value="1" label="提现成功"></el-option>
            <el-option value="2" label="提现失败"></el-option>
            <el-option value="3" label="审核中"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">筛选</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mcard">
      <el-table :data="list" stripe border>
        <el-table-column label="流水号" prop="sn_id" align="center"></el-table-column>
        <el-table-column label="提现方式" align="center">
          <template slot-scope="scope">{{_depositeType(scope.row.deposite_type)}}</template>
        </el-table-column>
        <el-table-column label="提现金额" prop="income" align="center"></el-table-column>
        <el-table-column label="手续费" prop="poundage" align="center"></el-table-column>
        <el-table-column label="包含站点数" prop="store_num" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{_depositeState(scope.row.deposite_state)}}</template>
        </el-table-column>
        <el-table-column label="申请提现时间" prop="apply_time" align="center"></el-table-column>
        <el-table-column label="操作完成时间" prop="apply_time" align="center"></el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text">详请</el-button>
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="700px">
      <el-form
        :model="depositeForm"
        ref="depositeForm"
        :rules="rules"
        label-width="200px"
        class="form"
        size="medium"
      >
        <el-form-item label="可提现金额：">
          <span class="color-sub">¥{{depositeMoney}}</span>
        </el-form-item>
        <el-form-item label="转账金额：" prop="income">
          <el-input class="widht16" type="number" v-model="depositeForm.income" min="0"></el-input>
          <span class="yuan">元</span>
          <p class="tipsub">转账的金额，系统总会优先从代收现金账户最多的站点中扣除。</p>
        </el-form-item>
        <el-form-item label="收取手续费：">
          <span class="color-sub">{{PoundageText}}</span>
        </el-form-item>
        <el-form-item label="到账金额：">
          <span class="color-sub">￥{{depositeActualMoney}}</span>
        </el-form-item>
        <template v-if="this.way === '2'">
          <el-form-item label="提现方式：" prop="type">
            <el-radio v-model="depositeForm.type" label="1">银行</el-radio>
            <el-radio v-model="depositeForm.type" label="2">支付宝</el-radio>
          </el-form-item>
          <template v-if="depositeForm.type === '1'">
            <el-form-item label="支付宝账号：" prop="account_id">
              <el-select v-model="depositeForm.account_id" placeholder="请选择">
                <el-option
                  v-for="item in cashAccountList"
                  v-show="item.account_type === '1'"
                  :label="`${item.open_bank}-${item.bank_num}`"
                  :value="item.account_id"
                  :key="item.account_id"
                ></el-option>
              </el-select>
            </el-form-item>
          </template>
          <template v-if="depositeForm.type === '2'">
            <el-form-item label="支付宝账号：" prop="account_id">
              <el-select v-model="depositeForm.account_id" placeholder="请选择">
                <el-option
                  v-for="item in cashAccountList"
                  v-show="item.account_type === '2'"
                  :label="item.zhifubao"
                  :value="item.account_id"
                  :key="item.account_id"
                ></el-option>
              </el-select>
            </el-form-item>
          </template>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDepsite('depositeForm')" :loading="loading">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getStoreManageList, getCashMoneyDesc, editDepositeMoney } from '@/api/finance/index'
import { getCashAccount } from '@/api/finance/invoice'

const WAY_ACCOUNT = '1' // 转至会员账户
const WAY_DEPOSIT = '2' // 提现
export default {
  name: 'FinanceStoreManage',
  data () {
    const validateIncome = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写转账金额'))
      } else {
        let flag = Number(value) <= this.depositeMoney
        if (!flag) {
          callback(new Error('转账金额不能大于可提现金额'))
        } else if (this.way === WAY_DEPOSIT) {
          flag = flag && this.depositeForm.income >= 500
          if (!flag) {
            callback(new Error('请输入不小于 500 的数值'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
    }
    return {
      cashAccountList: [],
      form: {
        apply_state_time: '', // 申请时间开始
        apply_end_time: '', //  申请时间结束
        complent_state_time: '', // 完成时间开始
        complent_end_time: '', // 完成时间结束
        deposite_type: '', // 提现方式：1.转入支付宝， 2.转入会员账户， 3.提现至银行卡
        deposite_state: '' // 提现状态：1.提现成功， 2.提现失败， 3.审核中
      },
      list: [
        {
          id: '', // id
          sn_id: '', // 流水号
          deposite_type: '', // 提现方式 1.转入支付宝， 2.转入会员账户， 3.提现至银行卡
          income: '', // 提现金额
          poundage: '', // 手续费
          store_num: 0, // 包含站点数
          deposite_state: '', // 状态 1.提现成功， 2.提现失败， 3.审核中
          apply_time: '', // 申请提现时间
          complent_state_time: '' // 操作完成时间
        }
      ],
      pagination: {
        current_page: 1,
        page_size: 20,
        total_count: 0
      },
      dialogVisible: false,
      dialogTitle: '转至会员账户',
      cashTotalMoney: 0,
      lockMoney: 0,
      acountPoundage: 0,
      depositePoundage: 0,
      way: WAY_ACCOUNT, // 1.转至会员账户, 2.提现
      depositeForm: {
        income: '', // 转账金额
        type: '2', // 1.银行， 2.支付宝
        account_id: '' // 账户id
      },
      rules: {
        income: [{ required: true, validator: validateIncome, trigger: 'blur' }],
        type: [{ required: true, message: '请选择提现方式', trigger: 'blur' }],
        account_id: [{ required: true, message: '请选择账号', trigger: 'change' }]
      },
      loading: false
    }
  },
  created () {
    this._getStoreManageList()
    this._getCashMoneyDesc()
    this._getCashAccount()
  },
  computed: {
    depositeMoney () {
      return (this.cashTotalMoney - this.lockMoney).toFixed(2)
    },
    depositeActualMoney () {
      if (this.way === WAY_ACCOUNT) {
        return (this.depositeForm.income * (1 - this.acountPoundage)).toFixed(2)
      } else {
        return (this.depositeForm.income * (1 - this.depositePoundage)).toFixed(2)
      }
    },
    PoundageText () {
      if (this.way === WAY_ACCOUNT) {
        return this.acountPoundage === 0 ? '0.00(免手续费)' : `${this.acountPoundage * 100}%`
      } else {
        return this.depositePoundage === 0 ? '0.00(免手续费)' : `${this.depositePoundage * 100}%`
      }
    }
  },
  methods: {
    submitForm () {
      this._getStoreManageList()
    },
    handleSizeChange (val) {
      this.pagination.page_size = val
      this._getStoreManageList()
    },
    handleCurrentChange (val) {
      this.pagination.current_page = val
      this._getStoreManageList()
    },
    btnToAccount () {
      this.dialogVisible = true
      this.dialogTitle = '转至会员账户'
      this.way = WAY_ACCOUNT
    },
    btnDeposite () {
      this.dialogVisible = true
      this.dialogTitle = '提现'
      this.way = WAY_DEPOSIT
    },
    submitDepsite (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._editDepositeMoney()
        } else {
          return false
        }
      })
    },
    _getStoreManageList () {
      let data = {}
      data.current_page = this.pagination.current_page
      data.page_size = this.pagination.page_size
      data.form = this.form

      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getStoreManageList(data).then(res => {
        loading.close()
        this.list = res.data.list
        this.pagination.total_count = res.data.total_count
      })
    },
    _getCashMoneyDesc () {
      getCashMoneyDesc().then(res => {
        this.cashTotalMoney = res.data.cash_total_money
        this.lockMoney = res.data.lock_money
        this.depositePoundage = res.data.deposite_poundage
        this.acountPoundage = res.data.acount_poundage
      })
    },
    _depositeType (val) {
      let text = ''
      switch (val) {
        case '1':
          text = '转入支付宝'
          break
        case '2':
          text = '转入会员账户'
          break
        case '3':
          text = '提现至银行卡'
          break

        default:
          break
      }
      return text
    },
    _depositeState (val) {
      let text = ''
      switch (val) {
        case '1':
          text = '提现成功'
          break
        case '2':
          text = '提现失败'
          break
        case '3':
          text = '审核中'
          break

        default:
          break
      }
      return text
    },
    _getCashAccount () {
      getCashAccount().then(res => {
        this.cashAccountList = res.data
      })
    },
    _editDepositeMoney () {
      let data = {}
      data.way = this.way
      data.type = this.depositeForm.type
      data.income = this.depositeForm.income
      data.account_id = this.depositeForm.account_id

      this.loading = true
      editDepositeMoney(data).then(res => {
        this.dialogVisible = false
        this.loading = false
        this.$refs.depositeForm.resetFields()
      })
    }
  },
  watch: {
    'depositeForm.type' () {
      this.depositeForm.account_id = ''
    }
  }
}
</script>

<style lang='scss' scoped>
@import "@/common/scss/variable.scss";
p {
  font-size: 14px;
  margin-bottom: 20px;
}
.price {
  font-size: 24px;
  color: $themeSubColor;
}
.color-sub {
  color: $themeSubColor;
  font-size: 16px;
}
.color-aux {
  color: $themeAuxColor;
}
.item-header {
  display: flex;
  align-items: center;
  width: 100%;
  .item {
    height: 100%;
  }
  .border-left {
    border-left: 1px solid #d7e0f1;
  }

  .yellow {
    font-size: 32px;
    color: #feab75;
  }
}
.btn-wrapper {
  margin-left: 20px;
}
.tip {
  margin-top: 20px;
  p {
    font-size: 14px;
    margin-bottom: 8px;
  }
}
.line {
  text-align: center;
}
.widht16 {
  width: 160px;
}
.yuan {
  margin-left: 10px;
}
.tipsub {
  margin: 0;
}
</style>
