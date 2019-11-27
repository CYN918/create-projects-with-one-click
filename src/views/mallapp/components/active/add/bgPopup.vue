<template>
  <el-dialog title="编辑图片" :visible.sync="dialogVisible" width="560px" :before-close="handleClose">
    <div class="turnplate-bg-wrapper">
      <el-form :model="form" ref="form" label-width="100px">
        <el-form-item label="编辑背景图片:">
          <el-upload
            class="avatar-uploader"
            :action="action"
            :show-file-list="false"
            :on-success="handleImageSuccess"
            :before-upload="beforeImageUpload"
          >
            <img v-if="main_bac_pic" :src="main_bac_pic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <el-button size="small" type="primary">上传图片</el-button>
            <div slot="tip" class="el-upload__tip">
              <p>1、图片尺寸建议：750px1334px;</p>
              <p>2、支持JPG、PNG格式的图片，图片不能大于2M。</p>
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item label="编辑指针图片:">
          <el-upload
            class="avatar-uploader"
            :action="action"
            :show-file-list="false"
            :on-success="handleLotteryImageSuccess"
            :before-upload="beforeImageUpload"
          >
            <img v-if="lottery_pic" :src="lottery_pic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <el-button size="small" type="primary">上传图片</el-button>
            <div slot="tip" class="el-upload__tip">
              <p>1、图片尺寸建议：200px200px;</p>
              <p>2、支持JPG、PNG格式的图片，图片不能大于2M。</p>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { imageUploadUrl } from '@/api/mallapp/config'

export default {
  props: {
    dialogVisible: {
      type: Boolean
    }
  },
  data () {
    return {
      action: imageUploadUrl,
      lottery_pic_id: '',
      lottery_pic: require('@/common/images/mall/turnplat_pointer.png'),
      main_bac_pic_id: '',
      main_bac_pic: require('@/common/images/mall/turnplat_bottom.png'),
      form: {}
    }
  },
  methods: {
    handleClose () {
      this.$emit('bgPopClose', { lottery_pic_id: this.lottery_pic_id, lottery_pic: this.lottery_pic, main_bac_pic_id: this.main_bac_pic_id, main_bac_pic: this.main_bac_pic })
    },
    handleSubmit () {
      this.$emit('bgPopClose', { lottery_pic_id: this.lottery_pic_id, lottery_pic: this.lottery_pic, main_bac_pic_id: this.main_bac_pic_id, main_bac_pic: this.main_bac_pic })
    },
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
    handleImageSuccess (res, file) {
      this.main_bac_pic_id = res.data.file_id
      this.main_bac_pic = URL.createObjectURL(file.raw)
      console.log(this.main_bac_pic)
    },
    handleLotteryImageSuccess (res, file) {
      this.lottery_pic_id = res.data.file_id
      this.lottery_pic = URL.createObjectURL(file.raw)
    }
  }
}
</script>

<style lang='scss'>
@import "@/common/scss/variable.scss";
.turnplate-bg-wrapper {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    button {
      position: absolute;
      right: -100px;
      top: 34px;
    }
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
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
