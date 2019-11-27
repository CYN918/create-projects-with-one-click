<template>
  <div class="mcard">
    <div class="btn-down">
      <el-button type="primary" size="small">下载网点名单</el-button>
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
        <div style="margin-bottom: 10px;">
          第一步：请先导出当前网点名单，对表格进行编辑，录入每个网点的增加/扣减额度。
           <p style="margin-top: 10px;">规则：您可新增或删减网点，系统将按照网点名称进行匹配，新增网点将自动增加此网点。</p>
        </div>
        <p>第二步，将编辑好的模板选择上传</p>
      </div>
    </el-upload>
    <el-button class="btn-import" type="success" @click="submitUpload" :loading="loading">导入</el-button>
  </div>
</template>

<script>
import { importQuotaBatch } from '@/api/mallapp/plugin/approval'

export default {
  data () {
    return {
      loading: false,
      uploadUrl: importQuotaBatch()
    }
  },
  methods: {
    // 导入
    errorUpload () {
      this.loading = false
      this.$message({
        message: '导入失败',
        type: 'error'
      })
    },
    beforeFillUpload (file) {
      const isXlsx = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      if (!isXlsx) {
        this.$message.error('上传文件类型错误！请选择xlsx类型文件')
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
        message: `导入成功${response.data.success_num}条, 导入失败${response.data.error_num}条`,
        type: 'success'
      })
      this.$refs.upload.clearFiles()
    }
  }

}
</script>

<style lang='scss' scoped>
.btn-down {
  margin-bottom: 10px;
  text-align: right;
}
.upload-wrapper {
  padding: 40px 20px;
  margin-bottom: 20px;
  background: #edf0f5;
}
.btn-import {
  margin-left: 20px;
}
</style>
