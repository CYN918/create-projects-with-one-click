<template>
  <div class="margin mcard">
    <div class="title">企业认证</div>
    <template v-if="showStatus==='3'">
      <div class="auth-ready">
        <div class="top">
          <div class="icon">
            <i class="el-icon-circle-check-outline"></i>
          </div>
          <div class="info">
            <span>您已通过企业认证</span>
            <el-button type="primary" @click="recertification">重新认证</el-button>
          </div>
        </div>
        <el-row :gutter="20" class="row">
          <el-col :span="12">企业名称：{{certification.company_name}}</el-col>
          <el-col :span="12">注册号：{{certification.regist_num}}</el-col>
        </el-row>
      </div>
    </template>
    <template v-else>
      <el-alert v-if="disabled" class="alert" title="信息正在审核中..." type="success" :closable="false"></el-alert>
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        label-width="250px"
        class="certification-wrapper"
      >
        <el-form-item label="企业名称：" prop="company_name">
          <el-input placeholder="请输入企业名称" v-model="form.company_name" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="所在地区：" prop="province_id">
          <address-select :data="initAddress" @selectAddress="selectAddress" :disabled="disabled"></address-select>
        </el-form-item>
        <el-form-item label="营业执照：" prop="image_url">
          <div class="image" @click="handlePictureCardPreview">
            <img :src="form.image_url" alt>
          </div>
          <el-upload
            :disabled="disabled"
            class="upload"
            :action="action"
            :show-file-list="false"
            :on-success="handleImageSuccess"
            :before-upload="beforeImageUpload"
            accept=".jpg, .jpeg, .bmp, .gif, .png"
          >
            <el-button size="small" :disabled="disabled">点击上传</el-button>
          </el-upload>
          <div class="el-upload__tip">
            <p>上传：营业执照复印件照片所有信息需清晰可见，内容真实有效，不得做任何修改。照片支持.jpg .jpeg .bmp .gif .png格式的图片，每张图片不能大于1MB。</p>
          </div>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="form.image_url" alt>
          </el-dialog>
        </el-form-item>
        <el-form-item label="注册号：" prop="regist_num">
          <el-input placeholder="请输入注册号" v-model="form.regist_num" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="联系人：" prop="contact_name">
          <el-input placeholder="请输入联系人" v-model="form.contact_name" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="phone">
          <el-input placeholder="请输入联系方式" v-model="form.phone" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('form')"
            :loading="loading"
            :disabled="disabled"
          >{{buttonText}}</el-button>
        </el-form-item>
      </el-form>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddressSelect from '@/components/addressSelection/index'
import { imageUploadUrl } from '@/api/config'
import { editAuth } from '@/api/setting/index'

const UN_AUTH = '1' // 未认证
const IN_AUTH = '2' // 认证中
// const AUTH = '3' // 已认证
export default {
  name: 'AuthSetting',
  data () {
    return {
      action: imageUploadUrl,
      imageId: '',
      form: {
        company_name: '', // 企业名称
        province_id: '', // 省
        city_id: '', // 市
        area_id: '', // 区
        street_id: '', // 街道
        image_url: '', // 图片地址
        regist_num: '', // 注册号
        contact_name: '', // 联系人
        phone: '' // 联系方式
      },
      rules: {
        company_name: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
        province_id: [{ required: true, message: '请选择地址', trigger: 'change' }],
        image_url: [{ required: true, message: '请选择营业执照' }],
        regist_num: [{ required: true, message: '请输入注册号', trigger: 'blur' }],
        contact_name: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入联系方式', trigger: 'blur' }]
      },
      initAddress: {
        province_id: '', // 省
        city_id: '', // 市
        area_id: '', // 区
        street_id: '' // 街道
      },
      showStatus: '',
      loading: false,
      dialogVisible: false,
      disabled: false
    }
  },
  created () {
    // this._initData()
  },
  computed: {
    buttonText () {
      return this.disabled ? '审核中...' : '确 定'
    },
    ...mapGetters([
      'certification'
    ])
  },
  methods: {
    selectAddress (val) {
      this.form.province_id = val.province_id
      this.form.city_id = val.city_id
      this.form.area_id = val.area_id
      this.form.street_id = val.street_id
    },
    recertification () {
      this.showStatus = UN_AUTH
    },
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
          this._editAuth()
        } else {
          return false
        }
      })
    },
    _initData () {
      this.showStatus = this.certification.status
      this.form = this.certification
      this.disabled = this.showStatus === IN_AUTH

      let initAddress = {}
      initAddress.province_id = this.certification.province_id
      initAddress.city_id = this.certification.city_id
      initAddress.area_id = this.certification.area_id
      initAddress.street_id = this.certification.street_id
      this.initAddress = Object.assign({}, initAddress)
    },
    _editAuth () {
      this.loading = true
      let data = {}
      data.company_name = this.form.company_name
      data.province_id = this.form.province_id
      data.city_id = this.form.city_id
      data.area_id = this.form.area_id
      data.street_id = this.form.street_id
      data.image_id = this.imageId
      data.regist_num = this.form.regist_num
      data.contact_name = this.form.contact_name
      data.phone = this.form.phone
      editAuth(data).then(() => {
        this.loading = false
      })
    }
  },
  components: {
    AddressSelect
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";

.auth-ready {
  margin-left: 200px;
  .top {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    .icon {
      width: 80px;
      height: 80px;
      margin-right: 20px;
      i {
        font-size: 80px;
        color: $themeColor;
      }
    }
    .info {
      span {
        margin-right: 20px;
      }
    }
  }
  .row {
    margin-bottom: 40px;
  }
}
.certification-wrapper {
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
.alert {
  margin-bottom: 20px;
}
</style>
