<template>
  <div class="mcard">
    <div class="title">创建短信发送签名</div>
    <el-form :model="form" ref="form" :rules="rules" label-width="250px" class="wrapper">
      <el-form-item label="签名：" prop="sign_name">
        <el-input placeholder="长度介于2～8个字符之间，且不能为纯数字、纯英文、数字英文组合" v-model="form.sign_name" style='width:600px'></el-input>
      </el-form-item>
      <el-form-item  label="网址:" prop="content">
                <el-input v-model="form.name" style='width:600px'></el-input>
            </el-form-item>
      <el-form-item label="营业执照：" prop="image_url">
        <div class="image" @click="handlePictureCardPreview">
          <img :src="form.image_url" alt>
        </div>
        <el-upload
          class="upload"
          :action="action"
          :show-file-list="false"
          :on-success="handleImageSuccess"
          :before-upload="beforeImageUpload"
          accept=".jpg, .jpeg, .bmp, .gif, .png"
        >
          <el-button size="small">点击上传</el-button>
        </el-upload>
        <div class="el-upload__tip">
          <p>上传：营业执照复印件照片所有信息需清晰可见，内容真实有效，不得做任何修改。照片支持.jpg .jpeg .bmp .gif .png格式的图片，每张图片不能大于1MB。</p>
        </div>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="form.image_url" alt>
        </el-dialog>
      </el-form-item>
      <el-form-item label="说明：">
        <div class="tip-wrapper">
          <p class="tip">1、短信签名建议为用户真实应用名/网站名/公司名；若签名/模板内容侵犯到第三方权益须获得第三方的真实授权，授权委托书等，创建签名时进行上传；</p>
          <p class="tip">2、单个签名长度介于2到8个字符之间</p>
          <p class="tip">3、可以包含汉字、数字、英文，不能为纯数字、纯英文、数字英文组合；</p>
          <p class="tip">4、短信发送时签名会自带【】，您无须在签名中添加【】、( )、[ ]符号，避免重复；</p>
          <p class="tip">5、支持jpg、png、gif、jpeg格式的图片，每张图片不大于1MB</p>
          <p class="tip">6、审核工作时间：周一至周日9:00-18:00(法定节假日顺延)；审核预计在1-2个工作日内审核完成</p>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')" :loading="loading">{{btnText}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { imageUploadUrl } from '@/api/config'
import { addMessageSign } from '@/api/finance/message'

export default {
  name: 'MessageAdd',
  data () {
    const validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else {
        const flag = /^(?![^\u4e00-\u9fa5]+$)[\S\s]*$/.test(value)
        if (!flag) {
          callback(new Error('不能为纯数字、纯英文、数字英文组合'))
        } else {
          callback()
        }
      }
    }
    return {
      action: imageUploadUrl,
      imageId: '',
      form: {
        sign_name: '', // 签名名称
        image_url: '' // 图片地址
      },
      rules: {
        sign_name: [
          { required: true, message: '长度介于2～8个字符之间', trigger: 'blur', min: 2, max: 8 },
          { validator: validateName, trigger: 'blur' }
        ],
        image_url: [{ required: true, message: '请选择营业执照' }]

      },
      loading: false,
      dialogVisible: false,
      btnText: '提交申请'
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._addMessageSign()
        } else {
          return false
        }
      })
    },
    _addMessageSign () {
      let data = {}
      data.sign_name = this.form.sign_name
      data.image_id = this.imageId
      this.loading = true
      this.btnText = '正在提交...'
      addMessageSign(data).then(res => {
        this.loading = false
        this.btnText = '提交申请'
        this.$router.push({ path: '/finance/message/list' })
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.mcard {
  margin-top: -36px;
  position: relative;
}
.wrapper {
  margin-right: 200px;
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

.tip-wrapper {
  margin-top: 10px;
}
.tip {
  font-size: 14px;
  line-height: 1.5;
  color: #666;
}
</style>
