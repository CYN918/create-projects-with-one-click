<template>
  <div class="mcard">
    <el-form
      :model="form"
      :rules="formRules"
      label-width="200px"
      ref="form"
      size="medium"
      class="form"
    >
      <el-form-item>
        <span class="tip">使用表格，直接导入用户，并给他们发送积分，导入用户校验重复性，不校验用户是否已存在。</span>
      </el-form-item>
      <el-form-item prop="file">
        <el-upload
          class="upload-demo"
          ref="upload"
          :limit="1"
          :action="actionUrl"
          :on-success="handleSuccess"
          :on-change="handleBefore"
          :auto-upload="false"
          accept="text/csv"
        >
          <el-button slot="trigger" type="primary" plain>选择文件上传</el-button>
          <div slot="tip" class="el-upload__tip">
            <p>最大支持 1 MB CSV的文件。</p>
            <p>1. 每次上传最多3万条数据；</p>
            <p>2. 使用EXCLE制作你的券码；</p>
            <p>3. 将该文件保存为CSV格式的文件（*.CSV）；</p>
          </div>
          <el-button type="primary" style="margin-left: 40px;">下载表格模板</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="form.message">短信通知</el-checkbox>
        <span class="tip">短信签名为【开发工行积分商城】，短信签名请在会员管理中心设置</span>
      </el-form-item>
      <el-form-item prop="remark" label="备注">
        <el-input v-model="form.remark" placeholder="选填，可简要说明操作说明"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addImportDistr } from '@/api/mallapp/plugin/distribute'
import { resolve } from 'q'
export default {
  name: 'DistributeImport',
  data () {
    return {
      form: {
        message: false, // 短信通知
        file: '',
        remark: '' // 备注
      },
      actionUrl: '',
      formRules: {
        file: [{ required: true, message: '请选择上传文件', trigger: 'blur' }]
      },
      loading: null
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._addImportDistr()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleBefore (file) {
      if (file.response) {
        this.form.file = ''
      } else {
        this.form.file = file
      }
    },
    _addImportDistr () {
      let form = {}
      form.message = this.form.message
      form.remark = this.form.remark
      let data = Object.assign({}, form)
      this.loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      addImportDistr(data).then(res => {
        this.actionUrl = res
        resolve()
      }).then(() => {
        this.$refs.upload.submit()
      })
    },
    handleSuccess (res) {
      this.loading.close()
      this.$refs.form.resetFields()
      // 返回成功
      if (res.code === 1) {
        this.$confirm(`发放完成,积分已发送给用户`, '提示', {
          confirmButtonText: '查看发放记录',
          cancelButtonText: '查看详情',
          type: 'success'
        }).then(() => {
          this.$router.push({ path: '/mplugin/distribute' })
        }).catch(() => {
          this.$router.push({ path: `/mplugin/distribute_log/${res.data.id}` })
        })
      }
    }
  }

}
</script>

<style lang='scss' scoped>
.form {
  width: 850px;
  .top-tip {
    display: block;
    margin-left: 200px;
    font-size: 14px;
    color: #999;
  }
  .tip {
    display: block;
    color: #999;
  }
}
</style>
