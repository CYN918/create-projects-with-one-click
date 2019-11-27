<template>
  <div class="margin">
    <div class="mcard mbottom">
      <div class="title">线下汇款</div>
      <div class="mcard-content">
        <el-form label-width="250px" class="form-wrapper">
          <el-form-item label="账户余额：">
            <p class="color-sub">￥{{advancePayment}}</p>
          </el-form-item>
          <el-form-item>
            <div class="tip">
              <p>温馨提示：</p>
              <p>1、受银行处理时间影响，采用线下汇款方式到账会有延误，强烈建议采用支付宝、微信扫码、银联实时到账。</p>
              <p>2、线下汇款直接向博士鹰的银行账户汇款。各种方式的到账时间一般为：交行1-2天，跨行3-5天（具体到账时间以银行的实际到账时间为准）</p>
              <p>3、汇款金额将进入[会员账户]，会员账户不可提现。</p>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="mcard mbottom">
      <div class="title">请您通过网银转账，或者自行到银行进行汇款，汇款账号如下</div>
      <div class="mcard-content">
        <el-form label-width="250px" class="form-wrapper">
          <el-form-item label="开户名称：">
            <p>博士鹰信息技术有限公司</p>
          </el-form-item>
          <el-form-item label="开户银行：">
            <p>浙江泰隆商业银行股份有限公司杭州分行</p>
          </el-form-item>
          <el-form-item label="银行账号：">
            <p>1234548798765416165</p>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="mcard mbottom">
      <div class="title">汇款后请填写您汇款的金额及银行交易单号</div>
      <div class="mcard-content">
        <el-form label-width="250px" :model="form" class="form-wrapper" ref="form" :rules="rules">
          <el-form-item label="汇款金额：">
            <p class="color-sub">¥{{form.money}}</p>
          </el-form-item>
          <el-form-item label="入账金额：">
            <p class="color-sub">¥{{income}}</p>
          </el-form-item>
          <el-form-item label="汇款底单：" prop="image_url">
            <div class="image" @click="handlePictureCardPreview">
              <img
                :src="form.image_url === ''? require('@/common/images/finance/offlinemodle.png') : form.image_url"
              >
            </div>
            <el-upload
              class="upload"
              :action="action"
              :show-file-list="false"
              :on-success="handleImageSuccess"
              :before-upload="beforeImageUpload"
              accept=".jpg, .jpeg, .bmp, .gif, .png"
            >
              <el-button size="small">选择文件</el-button>
            </el-upload>
            <div class="el-upload__tip">
              <p>汇款底单需清晰可见。照片内容真实有效，不得做任何修改。支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过1M。</p>
            </div>
            <el-dialog :visible.sync="dialogVisible">
              <img
                width="100%"
                :src="form.image_url === ''? require('@/common/images/finance/offlinemodle.png') : form.image_url"
              >
            </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')" :loading="loading">我已汇款</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getOverviewMoney } from '@/api/finance/overview'
import { imageUploadUrl } from '@/api/config'
import { offlinePush } from '@/api/finance/index'

export default {
  name: 'FinanceRechargeOffine',
  data () {
    return {
      action: imageUploadUrl,
      advancePayment: 0,
      imageId: '',
      dialogVisible: false,
      form: {
        money: '',
        image_url: ''
      },
      rules: {
        image_url: [{ required: true, message: '请上传汇款底单', trigger: 'blur' }]
      },
      loading: false
    }
  },
  created () {
    this._getOverviewMoney()
    this.form.money = this.$route.params.money
  },
  computed: {
    income () {
      return this.form.money
    }
  },
  methods: {
    beforeImageUpload (file) {
      const isLt1024KB = file.size / 1024 < 1024
      if (!isLt1024KB) {
        this.$message.error('上传图片大小不能超过 1M!')
      }
      return isLt1024KB
    },
    handleImageSuccess (res, file) {
      this.imageId = res.data.file_id
      this.form.image_url = URL.createObjectURL(file.raw)
    },
    handlePictureCardPreview () {
      this.dialogVisible = true
    },
    submitForm (formName) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this._offlinePush()
        } else {
          return false
        }
      })
    },
    _getOverviewMoney () {
      getOverviewMoney().then(res => {
        this.advancePayment = res.data.advance_payment
      })
    },
    _offlinePush () {
      let data = {}
      data.money = this.form.money
      data.income = this.income
      data.image_id = this.imageId
      this.loading = true
      offlinePush(data).then(() => {
        this.loading = false
        this.$alert('提交成功，等待管理员审核', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push({ path: '/finance/recharge' })
          }
        })
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
  .image {
    display: inline-block;
    width: 80px;
    height: 80px;
    vertical-align: top;
    margin-right: 20px;
    background: #f1f3f8;
    text-align: center;
    cursor: pointer;
    img {
      max-width: 80px;
      height: 80px;
    }
  }
  .upload {
    display: inline-block;
    vertical-align: top;
  }
  .el-upload__tip {
    line-height: 1.5;
    color: #999;
  }
}
.line {
  text-align: center;
}
.tip {
  line-height: 1.5;
}
</style>
