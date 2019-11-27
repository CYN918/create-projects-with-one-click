<template>
  <div class="mcard margin info">
    <div class="title">发票信息</div>
    <div class="info-btn">
      <el-button type="text" size="small">新手开票指南</el-button>
      <span>|</span>
      <el-button type="text" size="small">增值税专票样例</el-button>
      <span>|</span>
      <el-button type="text" size="small">增值税普票样例</el-button>
      <span>|</span>
      <el-button type="text" size="small">发票常见问题</el-button>
    </div>
    <el-alert class="alert" :title="alertTitle" :type="alertType" :closable="false"></el-alert>
    <template v-if="invoiceInfo.type==='2'">
      <el-row :gutter="20" class="list-wrapper">
        <el-col :span="8" class="center">发票抬头：</el-col>
        <el-col :span="16">{{invoiceInfo.title}}</el-col>
      </el-row>
      <el-row :gutter="20" class="list-wrapper">
        <el-col :span="8" class="center">发票类型：</el-col>
        <el-col :span="16">{{invoiceInfo.invoice_type==='1' ? '普通发票' : '专用发票'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="list-wrapper">
        <el-col :span="8" class="center">税务登记证号：</el-col>
        <el-col :span="16">913301083961603928</el-col>
      </el-row>
      <template v-if="invoiceInfo.invoice_type==='2'">
        <el-row :gutter="20" class="list-wrapper">
          <el-col :span="8" class="center">基本开户银行名称：</el-col>
          <el-col :span="16">{{invoiceInfo.account_bank}}</el-col>
        </el-row>
        <el-row :gutter="20" class="list-wrapper">
          <el-col :span="8" class="center">基本开户账号：</el-col>
          <el-col :span="16">{{invoiceInfo.account_number}}</el-col>
        </el-row>
        <el-row :gutter="20" class="list-wrapper">
          <el-col :span="8" class="center">注册场所地址：</el-col>
          <el-col :span="16">{{invoiceInfo.register_address}}</el-col>
        </el-row>
        <el-row :gutter="20" class="list-wrapper">
          <el-col :span="8" class="center">注册固定电话：</el-col>
          <el-col :span="16">{{invoiceInfo.telephone}}</el-col>
        </el-row>
      </template>
    </template>
    <el-row :gutter="20" class="list-wrapper">
      <el-col :span="8" class="center">&nbsp;</el-col>
      <el-col :span="16">
        <el-button
          type="primary"
          size="medium"
          @click="btnEdit"
          :disabled="invoiceInfoBtnDisabled"
        >{{invoiceInfoBtnText}}</el-button>
        <el-button @click="routerBack">返回</el-button>
      </el-col>
    </el-row>
    <el-dialog title="设置开票信息" :visible.sync="dialogVisible" width="700px">
      <el-alert
        title=" 请您完善以下发票信息。"
        type="warning"
        description="发票信息仅限一条，请您慎重填写。"
        class="alert"
        :closable="false"
      ></el-alert>
      <el-form
        :model="invoiceForm"
        ref="invoiceForm"
        :rules="rules"
        label-width="200px"
        class="invoice-form"
        size="medium"
      >
        <el-form-item label="发票类型：" prop="invoice_type">
          <el-radio v-model="invoiceForm.invoice_type" label="1">
            增值税普通发票
            <el-tooltip placement="top">
              <div
                slot="content"
                style="width: 210px"
              >增值税普通发票开给小规模纳税人或者开票资料不齐全的购买人，购买人取得后不可以进行进项税额抵扣。若您还有疑问，建议联系贵公司财务确认后再提交开票需求。</div>
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-radio>
          <el-radio v-model="invoiceForm.invoice_type" label="2">
            增值税专用发票
            <el-tooltip placement="top">
              <div
                slot="content"
                style="width: 210px"
              >增值税专用发票开给一般纳税人，申请时需要提供公司名称、税号、地址电话、开户行名称及账号，一般纳税人批复，购买人取得后可以进行税额抵扣。若您还有疑问，建议联系贵公司财务确认后再提交开票需求。</div>
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-radio>
        </el-form-item>
        <el-form-item label="发票抬头：" prop="title">
          <el-input v-model="invoiceForm.title" :placeholder="placeholder"></el-input>
        </el-form-item>
        <el-form-item label="企业税号：" prop="tax_number">
          <el-input v-model="invoiceForm.tax_number" placeholder="请填写企业税号"></el-input>
          <div class="tip">如果您的营业执照是三证合一或五证合一的证照，请填写最新的营业执照编号。</div>
        </el-form-item>
        <div v-if="invoiceForm.invoice_type === '2'">
          <el-form-item label="基本开户银行名称：" prop="account_bank">
            <el-input v-model="invoiceForm.account_bank" placeholder="请填写您开户许可证上的开户银行"></el-input>
          </el-form-item>
          <el-form-item label="基本开户账号：" prop="account_number">
            <el-input v-model="invoiceForm.account_number" placeholder="请填写您开户许可证上的银行账号"></el-input>
          </el-form-item>
          <el-form-item label="注册场所地址：" prop="register_address">
            <el-input v-model="invoiceForm.register_address" placeholder="请填写您营业执照上的注册地址"></el-input>
          </el-form-item>
          <el-form-item label="注册固定电话：" prop="telephone">
            <el-input v-model="invoiceForm.telephone" placeholder="请填写您公司的有效电话"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('invoiceForm')">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getInvoiceInfo, editInvoiceInfo } from '@/api/finance/invoice'

const INVOICE_ZERO = '0' // 发票信息
const INVOICE_ONE = '1' // 发票信息审核中
const INVOICE_TWO = '2' // 发票信息有效
const INVOICE_THREE = '3' // 发票信息无效
export default {
  data () {
    return {
      invoiceInfo: {
        type: '0'
      },
      dialogVisible: false,
      invoiceForm: {
        invoice_type: '1', // 发票类型： 1.增值税普通发票, 2.增值税专用发票
        tax_number: '', // 企业税号
        title: '', // 发票抬头
        account_bank: '', // 开户银行
        account_number: '', // 开户银行账号
        register_address: '', // 注册地址
        telephone: '' // 公司的有效电话
      },
      rules: {
        invoice_type: [{ required: true, message: '请选择发票类型', trigger: 'blur' }],
        title: [{ required: true, message: '请填写发票抬头', trigger: 'blur' }],
        tax_number: [{ required: true, message: '请填写企业税号', trigger: 'blur' }],
        account_bank: [{ required: true, message: '请填写您开户许可证上的开户银行', trigger: 'blur' }],
        account_number: [{ required: true, message: '请填写您开户许可证上的银行账号', trigger: 'blur' }],
        register_address: [{ required: true, message: '请填写您营业执照上的注册地址', trigger: 'blur' }],
        telephone: [{ required: true, message: '请填写您公司的有效电话', trigger: 'blur' }]
      }
    }
  },
  created () {
    getInvoiceInfo().then(res => {
      this.invoiceInfo = res.data
    })
  },
  computed: {
    placeholder () {
      return this.invoiceForm.invoice_type === '1' ? '企业/个人' : '企业'
    },
    alertTitle () {
      let title
      switch (this.invoiceInfo.type) {
        case INVOICE_ZERO:
          title = '暂无发票信息，请添加发票信息'
          break
        case INVOICE_ONE:
          title = '发票信息审核中...'
          break
        case INVOICE_TWO:
          title = '发票信息有效'
          break
        case INVOICE_THREE:
          title = '发票信息无效,请重新填写'
          break
        default:
          break
      }
      return title
    },
    alertType () {
      let type
      switch (this.invoiceInfo.type) {
        case INVOICE_ZERO:
          type = 'info'
          break
        case INVOICE_ONE:
          type = 'warning'
          break
        case INVOICE_TWO:
          type = 'success'
          break
        case INVOICE_THREE:
          type = 'error'
          break
        default:
          break
      }
      return type
    },
    invoiceInfoBtnText () {
      let text
      switch (this.invoiceInfo.type) {
        case INVOICE_ZERO:
          text = '添加发票信息'
          break
        case INVOICE_ONE:
          text = '修改发票信息...'
          break
        case INVOICE_TWO:
          text = '修改发票信息'
          break
        case INVOICE_THREE:
          text = '修改发票信息'
          break
        default:
          break
      }
      return text
    },
    invoiceInfoBtnDisabled () {
      let disabled
      switch (this.invoiceInfo.type) {
        case INVOICE_ZERO:
          disabled = false
          break
        case INVOICE_ONE:
          disabled = true
          break
        case INVOICE_TWO:
          disabled = false
          break
        case INVOICE_THREE:
          disabled = false
          break
        default:
          break
      }
      return disabled
    }
  },
  methods: {
    btnEdit () {
      this.dialogVisible = true
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._editInvoiceInfo()
        } else {
          return false
        }
      })
    },
    routerBack () {
      this.$router.back()
    },
    _editInvoiceInfo () {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      editInvoiceInfo(this.invoiceForm).then(() => {
        loading.close()
        this.dialogVisible = false
        getInvoiceInfo().then(res => {
          this.invoiceInfo = res.data
        })
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.info {
  position: relative;
  .info-btn {
    position: absolute;
    right: 20px;
    top: 20px;
  }
}
.alert {
  margin: 20px 0;
}
.tip {
  line-height: 24px;
  font-size: 12px;
}
.list-wrapper {
  margin-bottom: 20px;
  line-height: 1.5;
}
.center {
  text-align: right;
}
.invoice-form {
  width: 550px;
}
</style>
