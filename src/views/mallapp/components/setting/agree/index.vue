<template>
  <div class="margin magree-wrapper">
    <div class="mcard">
      <div class="title">用户协议</div>
      <el-form
        :model="form" ref="form" :rules="rules" class="agree-wrapper" label-width="100px">
        <el-form-item label="名称：" prop="agree_name" class="item">
          <el-input class="width32" v-model="form.agree_name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="内容设置：" prop="agree_content" class="item">
          <el-input type="hidden" v-model="form.agree_content"></el-input>
          <quill-editor
            v-model="form.agree_content"
            ref="myQuillEditor">
          </quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-submit" type="primary" @click="submitForm('form')" :loading="loading">保 存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import { getAgree, editAgree } from '@/api/mallapp/setting/agree'

export default {
  name: 'MsettingAgree',
  data () {
    return {
      form: {
        agree_name: '', // 协议名称
        agree_content: '' // 协议内容
      },
      rules: {
        agree_name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        agree_content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  created () {
    this._getAgree()
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._editAgree()
        } else {
          return false
        }
      })
    },
    _getAgree () {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getAgree().then(res => {
        loading.close()
        this.form = res.data
      })
    },
    _editAgree () {
      this.loading = true
      editAgree(this.form).then(() => {
        this.loading = false
        this._getAgree()
      })
    }
  },
  components: {
    quillEditor
  }
}
</script>

<style lang="scss">
.magree-wrapper {
  .width32 {
    width: 320px;
  }
  .item {
    margin-left: 100px;
  }
  .quill-editor {
    margin-top: -40px;
    max-width: 1000px;
    .ql-container {
      height: 400px;
    }
  }
  .btn-submit {
    margin-left: 200px;
  }

}
</style>
