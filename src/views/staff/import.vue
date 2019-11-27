<template>
  <div class="import-wrapper">
    <div class="mcard">
      <div class="title">批量导入</div>
      <div class="mcart-content">
        <div class="btn-down">
          <el-button type="primary" size="small">下载Excel模板</el-button>
        </div>
        <el-upload
          class="upload-wrapper"
          ref="upload"
          :limit="1"
          :action="uploadUrl"
          :before-upload="beforeFillUpload"
          :on-progress="progressUpload"
          :on-success="successUpload"
          :auto-upload="false"
          :on-error="errorUpload"
        >
          <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
          <div slot="tip" class="el-upload__tip">
            <p>1、请下载excel模板，将员工信息录入excel模板后上传至系统。</p>
            <p>2、excel模板中若有系统中没有的部门，系统将为您自动创建。</p>
            <p>3、一位员工不可以属于多个部门。</p>
            <p>4、导出的excel内容或格式请不要修改，可能会造成上传不成功。</p>
            <p>5、excel模板中，部门为空的用户，将全部加入【未命名分组】。</p>
          </div>
        </el-upload>
        <el-button class="btn-import" type="success" @click="submitUpload" :loading="loading">导入</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadUrl } from '@/api/config'
export default {
  name: 'Import',
  data () {
    return {
      loading: false,
      uploadUrl: uploadUrl
    }
  },
  methods: {
    errorUpload () {
      this.loading = false
      this.$message({
        message: '导入失败',
        type: 'error'
      })
    },
    beforeFillUpload (file) {
      const isXlsx = file.type === 'application/vnd.ms-excel'
      console.log(file.type)
      if (!isXlsx) {
        this.$message.error('上传文件类型错误！请选择xls类型文件')
      }
      return isXlsx
    },
    submitUpload () {
      this.$refs.upload.submit()
    },
    progressUpload () {
      this.loading = true
    },
    successUpload (response, file, fileList) {
      this.loading = false
      this.$message({
        message: '导入成功',
        type: 'success'
      })
      this.$refs.upload.clearFiles()
    }
  }
}
</script>

<style lang="scss" scoped>
.import-wrapper {
  margin: 20px;
  .btn-down {
    margin-bottom: 10px;
    text-align: right;
  }
  .upload-wrapper {
    width: 600px;
    padding: 40px 20px;
    margin-bottom: 20px;
    background: #edf0f5;
  }
  .btn-import {
    margin-left: 20px;
  }
  .el-upload__tip {
    margin-top: 20px;
    line-height: 1.5;
    color: #999;
  }
}
</style>
