<template>
  <div class="margin">
    <div class="mcard">
      <div class="title">分享设置</div>
      <el-form :model="form" ref="form" :rules="rules" label-width="100px" class="weixin-form-wrapper">
        <el-form-item label="名称：" prop="weixin_title">
          <el-input v-model="form.weixin_title" placeholder="例如：积分银行招商平台"></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="weixin_content">
          <el-input v-model="form.weixin_content" type="textarea" :rows="4" placeholder="分享介绍"></el-input>
        </el-form-item>
        <el-form-item label="图片：" prop="image_url">
          <el-upload
            class="avatar-uploader"
            :action="action"
            :show-file-list="false"
            :on-success="handleImageSuccess"
            :before-upload="beforeImageUpload">
            <img v-if="form.image_url" :src="form.image_url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              <p>1、建议尺寸 100px * 100px</p>
              <p>2、支持JPG、PNG格式的图片，图片不能大于50K；</p>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-submit" type="primary" @click="submitForm('form')" :loading="loading">保 存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { imageUploadUrl } from '@/api/mallapp/config'
import { shareWeiXinEdit, getShareWeiXin } from '@/api/mallapp/setting/share'

export default {
  name: 'MsettingShare',
  data () {
    return {
      action: imageUploadUrl,
      imageId: '',
      form: {
        weixin_title: '', // 名称
        weixin_content: '', // 描述
        image_url: '' // 图片
      },
      rules: {
        weixin_title: [{ required: true, message: '请输入分享名称', trigger: 'blur' }],
        weixin_content: [{ required: true, message: '请输入分享描述', trigger: 'blur' }],
        image_url: [{ required: true, message: '请选择分享图片' }]
      },
      loading: false
    }
  },
  created () {
    this._getShareWeiXin()
  },
  methods: {
    beforeImageUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt50KB = file.size / 1024 < 50
      if (!(isJPG || isPNG)) {
        this.$message.error('上传图片只能是JPG或者PNG格式!')
      }
      if (!isLt50KB) {
        this.$message.error('上传图片大小不能超过 50kb!')
      }
      return isLt50KB && (isJPG || isPNG)
    },
    handleImageSuccess (res, file) {
      this.imageId = res.data.file_id
      this.form.image_url = URL.createObjectURL(file.raw)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._shareWeiXinEdit()
        } else {
          return false
        }
      })
    },
    _shareWeiXinEdit () {
      let data = {}
      data.weixin_title = this.form.weixin_title
      data.weixin_content = this.form.weixin_content
      data.image_id = this.imageId
      this.loading = true
      shareWeiXinEdit(data).then(() => {
        this.loading = false
        this._getShareWeiXin()
      })
    },
    _getShareWeiXin () {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getShareWeiXin().then(res => {
        loading.close()
        this.form.weixin_title = res.data.weixin_title
        this.form.weixin_content = res.data.weixin_content
        this.form.image_url = res.data.image_url
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/common/scss/variable.scss';
.weixin-form-wrapper {
  margin-left: 100px;
  width: 500px;
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .btn-submit {
    margin: 20px;
  }
}
</style>
