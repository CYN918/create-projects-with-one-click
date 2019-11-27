<template>
  <div class="margin">
    <div class="mcard">
      <div class="title">提现账户</div>
      <div class="mcard-content">
        <div class="tip">
          <p>温馨提示</p>
          <p>1.提现账户是平台方用来与会员进行资金结算时使用，提供打款账号，方便平台方线下为会员打款；</p>
          <p>2.系统提供银行转账和支付宝两种提现账户类型。</p>
          <p>3.只能添加与已认证会员主体名称一致的结算账户，请准确填写，以免造成资金损失。</p>
        </div>
        <div class="btn-wrapper">
          <el-button type="primary" size="medium" class="el-icon-plus" @click="btnAdd">添加提现账户</el-button>
        </div>
        <el-table :data="list" stripe>
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column label="账户类型">
            <template slot-scope="scope">{{scope.row.account_type === '1' ? '银行转账' : '支付宝'}}</template>
          </el-table-column>
          <el-table-column label="开户名">{{certification && certification.company_name}}</el-table-column>
          <el-table-column label="账号">
            <template
              slot-scope="scope"
            >{{scope.row.account_type === '1' ? scope.row.bank_num : scope.row.zhifubao}}</template>
          </el-table-column>
          <el-table-column prop="open_bank" label="开户行"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="btnEdit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :title="dialogText" :visible.sync="dialogVisible" width="700px">
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        label-width="200px"
        class="form"
        size="medium"
      >
        <el-form-item label="请选择提现方式：" prop="account_type">
          <el-radio v-model="form.account_type" label="1">银行卡</el-radio>
          <el-radio v-model="form.account_type" label="2">支付宝</el-radio>
        </el-form-item>
        <el-form-item label="开户名：" prop="company_name">
          <p class="sub">{{certification && certification.company_name}}</p>
          <p class="item-tip">开户名为会员认证的主体名称，若需更改主体名称，请重新认证。</p>
        </el-form-item>
        <div v-if="form.account_type === '1'">
          <el-form-item label="银行卡号：" prop="bank_num">
            <el-input v-model="form.bank_num" placeholder="请输入银行卡号"></el-input>
          </el-form-item>
          <el-form-item label="基本开户账号：" prop="open_bank">
            <el-input v-model="form.open_bank" placeholder="请输入开户行名称"></el-input>
          </el-form-item>
        </div>
        <div v-if="form.account_type === '2'">
          <el-form-item label="支付宝账号：" prop="zhifubao">
            <el-input v-model="form.zhifubao" placeholder="请输入支付宝账号"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCashAccount, editCashAccount } from '@/api/finance/invoice'
import { mapGetters } from 'vuex'

export default {
  name: 'FinanceCashAccount',
  data () {
    return {
      list: [
        // {
        //   account_id: '', // id
        //   account_type: '', // 账户类型
        //   zhifubao: '', // 支付宝账号
        //   open_bank: '', // 开户行名称
        //   bank_num: '' // 银行卡号
        // }
      ],
      dialogVisible: false,
      dialogText: '添加提现账户',
      type: 'add',
      form: {},
      initForm: {
        account_id: '', // id
        account_type: '1', // 账户类型
        bank_num: '', // 银行卡号
        open_bank: '', // 开户行名称
        zhifubao: '', // 支付宝账号
        company_name: ''
      },
      rules: {
        account_type: [{ required: true, message: '请选择提现方式', trigger: 'blur' }],
        company_name: [{ required: true, message: '请认证开户名', trigger: 'blur' }],
        bank_num: [{ required: true, message: '请输入银行卡号', trigger: 'blur' }],
        open_bank: [{ required: true, message: '请输入开户行名称', trigger: 'blur' }],
        zhifubao: [{ required: true, message: '请输入支付宝账号', trigger: 'blur' }]
      }
    }
  },
  created () {
    // this.initForm.company_name = this.certification && this.certification.company_name
    // this.form = Object.assign({}, this.initForm)
    // this._getCashAccount()
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
          this._editCashAccount()
        } else {
          return false
        }
      })
    },
    btnAdd () {
      this.dialogVisible = true
      this.dialogText = '添加提现账户'
      this.type = 'add'
      this.form = Object.assign({}, this.initForm)
    },
    btnEdit (val) {
      this.dialogVisible = true
      this.dialogText = '添加提现账户'
      this.type = 'edit'
      this.form = Object.assign({}, val)
    },
    handleDelete (val) {
      this.type = 'delete'
      this.form = val
      this.$confirm('确定要删除提现账户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._editCashAccount()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    _getCashAccount () {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getCashAccount().then(res => {
        loading.close()
        this.list = res.data
      })
    },
    _editCashAccount () {
      let data = {}
      data.type = this.type
      data.account_id = this.form.account_id
      data.account_type = this.form.account_type
      data.bank_num = this.form.bank_num
      data.open_bank = this.form.open_bank
      data.zhifubao = this.form.zhifubao

      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })

      editCashAccount(data).then(() => {
        loading.close()
        this.dialogVisible = false
        this._getCashAccount()
      })
    }
  },
  watch: {
    'form.account_type' () {
      if (this.$refs.form) {
        this.$refs.form.clearValidate()
        console.log(this.form)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import "@/common/scss/variable.scss";
.tip {
  margin: 20px 0;
  font-size: 12px;
  line-height: 1.5;
}
.sub {
  color: $themeSubColor;
}
.item-tip {
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
}
.form {
  width: 550px;
}
</style>
