<template>
  <div class="margin magree-wrapper">
    <div class="mcard">
      <div class="title">免责声明</div>
      <el-form
        :model="form" ref="form" :rules="rules" class="agree-wrapper" label-width="100px">
        <el-form-item label="是否启用：" prop="disclaimer_type" class="item">
          <el-radio-group v-model="form.disclaimer_type">
            <el-radio label="1">显示</el-radio>
            <el-radio label="2">不显示</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="名称：" prop="disclaimer_name" class="item">
          <el-input class="width32" v-model="form.disclaimer_name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="内容设置：" prop="disclaimer_content" class="item">
          <el-input type="hidden" v-model="form.disclaimer_content"></el-input>
          <quill-editor
            v-model="form.disclaimer_content">
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
import { getDisc, editDisc } from '@/api/mallapp/setting/disclaimer'

export default {
  name: 'MsettingDisc',
  data () {
    return {
      form: {
        disclaimer_type: '1', // 是否启用 1，启用 2，禁用
        disclaimer_name: '', // 协议名称
        disclaimer_content: '' // 协议内容
      },
      rules: {
        disclaimer_type: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        disclaimer_name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        disclaimer_content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  created () {
    this._getDisc()
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._editDisc()
        } else {
          return false
        }
      })
    },
    _getDisc () {
      /*let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })*/
      getDisc().then(res => {
        loading.close()
        this.form = res.data
      })
    },
    _editDisc () {
      // this.loading = true
      editDisc(this.form).then(() => {
        this.loading = false
        this._getDisc()
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
