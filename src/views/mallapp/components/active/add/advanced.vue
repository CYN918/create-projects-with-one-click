<template>
  <el-form
    :model="advancedForm"
    :rules="advancedRules"
    ref="setfourth"
    label-width="120px"
    size="small"
  >
    <el-form-item label="功能按键" prop="button_model">
      <el-radio v-model="advancedForm.button_model" label="1">隐藏</el-radio>
      <el-radio v-model="advancedForm.button_model" label="2">页面跳转</el-radio>
      <el-radio v-model="advancedForm.button_model" label="3">一键关注</el-radio>
    </el-form-item>
    <!--页面跳转 开始 button_model === ‘2’-->
    <el-form-item
      v-if="advancedForm.button_model==='2' || advancedForm.button_model==='3'"
      label="按键名称"
      prop="button_name"
    >
      <el-input v-model="advancedForm.button_name" placeholder="按键名称不超过6个字符"></el-input>
    </el-form-item>
    <el-form-item v-if="advancedForm.button_model==='2'" label="跳转链接" prop="link">
      <el-input v-model="advancedForm.link" placeholder="如:https://b.boshiying.com"></el-input>
    </el-form-item>
    <!--页面跳转 结束-->
    <!--一键关注 开始 button_model === ‘3’-->
    <template v-if="advancedForm.button_model==='3'">
      <el-form-item label="公众号" class="turnplate-bg-wrapper">
        <el-upload
          class="avatar-uploader"
          :action="action"
          :show-file-list="false"
          :on-success="handleImageQrSuccess"
          :before-upload="beforeImageUpload"
        >
          <img v-if="advancedForm.qr_code" :src="advancedForm.qr_code" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <el-button size="small" type="primary">上传图片</el-button>
          <div slot="tip" class="el-upload__tip">
            <p>1、图片尺寸建议：200px200px;</p>
            <p>2、支持JPG、PNG格式的图片，图片不能大于2M。</p>
          </div>
        </el-upload>
      </el-form-item>
    </template>
    <!--一键关注 结束-->
    <el-form-item label="分享名称" prop="share_name">
      <el-input v-model="advancedForm.share_name" placeholder="标题不超过6个字符"></el-input>
    </el-form-item>
    <el-form-item label="分享描述" prop="share_describe">
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 6}"
        v-model="advancedForm.share_describe"
        placeholder="不超过400个字符"
      ></el-input>
    </el-form-item>
    <el-form-item label="分享图片" required class="turnplate-bg-wrapper">
      <el-upload
        class="avatar-uploader"
        :action="action"
        :show-file-list="false"
        :on-success="handleImageSuccess"
        :before-upload="beforeImageUpload"
      >
        <img v-if="advancedForm.share_image" :src="advancedForm.share_image" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <el-button size="small" type="primary">上传图片</el-button>
        <div slot="tip" class="el-upload__tip">
          <p>1、图片尺寸建议：200px200px;</p>
          <p>2、支持JPG、PNG格式的图片，图片不能大于2M。</p>
        </div>
      </el-upload>
    </el-form-item>
    <p class="tip">此活动可设置1-8个奖品，且至少包含一个“谢谢参与"</p>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'
import { imageUploadUrl } from '@/api/mallapp/config'

export default {
  data () {
    return {
      action: imageUploadUrl,
      editableTabsValue: '1',
      currentUploadIndex: '-1',
      awardsList: [],
      genaralDiscountList: [],
      advancedRules: {
        button_model: [{ required: true, message: '请选择功能按键', trigger: 'blur' }],
        share_name: [{ required: true, message: '请输入分享名称', trigger: 'blur' }],
        share_describe: [{ required: true, message: '请输入分享描述', trigger: 'blur' }],
        button_name: [{ required: true, message: '按键名称不超过6个字符', trigger: 'blur' }],
        link: [{ required: true, message: '请输入跳转链接', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['advancedForm'])
  },
  methods: {
    beforeImageUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt50KB = file.size / 1024 < 2048
      if (!(isJPG || isPNG)) {
        this.$message.error('上传图片只能是JPG或者PNG格式!')
      }
      if (!isLt50KB) {
        this.$message.error('上传图片大小不能超过 2M!')
      }
      return isLt50KB && (isJPG || isPNG)
    },
    // 分享图片上传
    handleImageSuccess (res, file) {
      this.advancedForm.share_image_id = res.data.file_id
      this.advancedForm.share_image = URL.createObjectURL(file.raw)
    },
    // 公众号 图片上传
    handleImageQrSuccess (res, file) {
      this.advancedForm.qr_code_id = res.data.file_id
      this.advancedForm.qr_code = URL.createObjectURL(file.raw)
    }
  }
}
</script>

<style lang="scss" scoped>
.tip {
  font-size: 14px;
  line-height: 28px;
  color: #999;
}
</style>
