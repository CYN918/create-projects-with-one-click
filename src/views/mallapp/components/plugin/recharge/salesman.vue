<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane :label="lable" name="first">
        <el-form
          :model="form"
          :rules="formRules"
          ref="form"
          size="meduim"
          label-width="220px"
          class="form"
        >
          <el-form-item prop="mobile" label="业务员手机号">
            <el-input type="number" v-model="form.mobile" placeholder="请输入业务员手机号码"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="业务员密码">
            <el-input v-model="form.password" placeholder="6至20位英文+数字" :min="6" :max="20"></el-input>
          </el-form-item>
          <el-form-item prop="name" label="业务员姓名">
            <el-input v-model="form.name" placeholder="请输入业务员姓名"></el-input>
          </el-form-item>
          <el-form-item prop="once_max" label="单次充值金额上限(手动输入时)">
            <el-input
              type="number"
              v-model="form.once_max"
              placeholder="请输入金额，只可为小于9999999正整数，填0则不限制"
              :min="0"
              :max="9999999"
            ></el-input>
          </el-form-item>
          <el-form-item prop="day_max" label="单日充值金额上限">
            <el-input
              type="number"
              v-model="form.day_max"
              placeholder="请输入笔数，只可为小于9999999正整数，填0则不限制"
              :min="0"
              :max="9999999"
            ></el-input>
          </el-form-item>
          <el-form-item prop="month_max" label="单月充值金额上限">
            <el-input
              type="number"
              v-model="form.month_max"
              placeholder="请输入笔数，只可为小于9999999正整数，填0则不限制"
              :min="0"
              :max="9999999"
            ></el-input>
          </el-form-item>
          <el-form-item prop="day_num_max" label="单日充值笔数上限">
            <el-input
              type="number"
              v-model="form.day_num_max"
              placeholder="请输入笔数，只可为小于9999999正整数，填0则不限制"
              :min="0"
              :max="9999999"
            ></el-input>
          </el-form-item>
          <el-form-item prop="month_num_max" label="单月充值笔数上限">
            <el-input
              type="number"
              v-model="form.month_num_max"
              placeholder="请输入笔数，只可为小于9999999正整数，填0则不限制"
              :min="0"
              :max="9999999"
            ></el-input>
          </el-form-item>
          <el-form-item prop="total_max" label="累计录入存款金额上限">
            <el-input
              type="number"
              v-model="form.total_max"
              placeholder="请输入金额，只可为小于999999999正整数，填0则不限制"
              :min="0"
              :max="999999999"
            ></el-input>
          </el-form-item>
          <el-form-item prop="group_id" label="所属分组">
            <el-radio v-model="form.group_id" :label="0">未分组</el-radio>
            <el-radio
              v-for="item in groupList"
              v-model="form.group_id"
              :label="item.group_id"
              :key="item.group_id"
            >{{item.group_name}}</el-radio>
          </el-form-item>
          <el-form-item prop="status" label="状态：">
            <el-radio v-model="form.status" label="1">启用</el-radio>
            <el-radio v-model="form.status" label="2">禁用</el-radio>
          </el-form-item>
        </el-form>
        <p class="dialog-footer">
          <el-button @click="btnCancle">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </p>
      </el-tab-pane>
      <template v-if="typeVal === 'add'">
        <el-tab-pane label="批量导入" name="second">
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
            <div slot="tip" class="el-upload__tip">只能上传xlsx文件</div>
          </el-upload>
          <el-button class="btn-import" type="success" @click="submitUpload" :loading="loading">导入</el-button>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script>
import { editSalesman, importSalesman, getUserInfo } from '@/api/mallapp/plugin/recharge'

export default {
  props: {
    groupList: {
      type: Array
    },
    typeVal: {
      type: String,
      default: 'add'
    },
    manId: {
      type: String,
      default: ''
    }
  },
  created () {
    this._getUserInfo()
  },
  data () {
    const checkMobile = (rule, value, callback) => {
      let flag = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(this.form.mobile)
      if (flag === false) {
        return callback(new Error('请输入正确的手机号'))
      }
      callback()
    }
    const checkPassword = (rule, value, callback) => {
      if (!/^[a-zA-Z0-9]+$/.test(value)) {
        return callback(new Error('请输入英文+数字'))
      }
      if (value.length < 6 || value.length > 20) {
        return callback(new Error('请输入6-20个字符+数字'))
      }
      callback()
    }
    const checkName = (rule, value, callback) => {
      if (value.length < 2) {
        return callback(new Error('最少2个字'))
      }
      callback()
    }
    const checkNumber = (rule, value, callback) => {
      if (!Number.isInteger(Number(value))) {
        return callback(new Error('请输入整数值'))
      }
      if (value > 9999999 || value < 0) {
        return callback(new Error('请输入0～9999999的数字'))
      }
      callback()
    }
    const checkTotalNumber = (rule, value, callback) => {
      if (!Number.isInteger(Number(value))) {
        return callback(new Error('请输入整数值'))
      }
      if (value > 999999999 || value < 0) {
        return callback(new Error('请输入0～999999999的数字'))
      }
      callback()
    }
    return {
      activeName: 'first',
      form: {
        user_id: '', // id
        mobile: '', // 业务员手机号
        password: '', // 业务员密码
        name: '', // 业务员姓名
        day_max: '', // 单日充值金额上限
        once_max: '', // 单次充值金额上限(手动输入时)
        month_max: '', // 单月充值金额上限
        day_num_max: '', // 单日充值笔数上限
        month_num_max: '', // 单月充值笔数上限
        total_max: '', // 累计录入存款金额上限
        group_id: 0, // 所属分组: 0,未分组， ‘@id’分组id
        status: '1' // 状态： ‘1’ 启用， ‘2’禁用
      },
      formRules: {
        mobile: [{ required: true, validator: checkMobile, trigger: 'blur' }],
        password: [{ required: true, validator: checkPassword, trigger: 'blur' }],
        name: [{ required: true, validator: checkName, trigger: 'blur' }],
        day_max: [{ validator: checkNumber, trigger: 'blur' }],
        once_max: [{ validator: checkNumber, trigger: 'blur' }],
        month_max: [{ validator: checkNumber, trigger: 'blur' }],
        day_num_max: [{ validator: checkNumber, trigger: 'blur' }],
        month_num_max: [{ validator: checkNumber, trigger: 'blur' }],
        total_max: [{ validator: checkTotalNumber, trigger: 'blur' }]
      },
      loading: false,
      uploadUrl: importSalesman()
    }
  },
  computed: {
    lable () {
      return this.typeVal === 'add' ? '手动添加' : '编辑'
    }
  },
  methods: {
    btnCancle () {
      this.$emit('cancel')
    },
    submitForm (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this._editSalesman()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
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
      this.$emit('primary')
      this.$refs.upload.clearFiles()
    },
    _editSalesman () {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      editSalesman(this.form).then(() => {
        loading.close()
        this.$emit('primary')
      })
    },
    _getUserInfo () {
      if (!this.manId) {
        return
      }
      getUserInfo(this.manId).then(res => {
        let form = {}
        form.user_id = this.manId
        form.mobile = res.data.mobile
        form.password = res.data.password
        form.name = res.data.name
        form.day_max = res.data.day_max
        form.once_max = res.data.once_max
        form.month_max = res.data.month_max

        form.day_num_max = res.data.day_num_max
        form.month_num_max = res.data.month_num_max
        form.total_max = res.data.total_max
        form.group_id = res.data.group_id
        form.status = res.data.status
        this.form = Object.assign({}, form)
      })
    }
  },
  watch: {
    typeVal (val) {
      if (val === 'add') {
        this.$refs.form.resetFields()
      } else {
        this.$refs.form.clearValidate()
        this._getUserInfo()
      }
    },
    manId (id) {
      this._getUserInfo()
    }
  }
}
</script>

<style lang='scss' scoped>
.form {
  width: 800px;
}
.dialog-footer {
  text-align: right;
}
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
</style>
