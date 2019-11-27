<template>
  <div class="mcard">
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      class="plugin-setting-form"
      label-width="130px"
    >
      <el-form-item prop="title" label="名称">
        <el-input v-model="form.title" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="图片：" prop="image_url">
        <el-upload
          class="avatar-uploader"
          :action="action"
          :show-file-list="false"
          :on-success="handleImageSuccess"
          :before-upload="beforeImageUpload"
        >
          <img v-if="form.image_url" :src="form.image_url" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">
            <p>建议尺寸：设计定 支持格式：JPG、PNG , 大小限制：不大于500Kb</p>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item prop="is_approve_open" label="审批功能">
        <el-radio v-model="form.is_approve_open" label="1">开通</el-radio>
        <el-radio v-model="form.is_approve_open" label="2">不开通</el-radio>
        <p class="tip">开通审批功能后，即可在业务员管理中设置，业务员提交充值的审批人</p>
      </el-form-item>
      <el-form-item prop="opening_time" label="功能开放时间">
        <el-checkbox-group v-model="form.opening_time">
          <el-checkbox label="1">周一</el-checkbox>
          <el-checkbox label="2">周二</el-checkbox>
          <el-checkbox label="3">周三</el-checkbox>
          <el-checkbox label="4">周四</el-checkbox>
          <el-checkbox label="5">周五</el-checkbox>
          <el-checkbox label="6">周六</el-checkbox>
          <el-checkbox label="7">周日</el-checkbox>
        </el-checkbox-group>
        <p>如果业务员在非开放时间内充值/提交审批，将提示“请在功能开放时间内访问”</p>
      </el-form-item>
      <el-form-item>
        <el-button type="text" v-show="!showTime" @click="btnShowTime">添加时间段</el-button>
        <el-row v-show="showTime">
          <el-col :span="10">
            <el-time-picker
              v-model="form.open_start_time"
              value-format="HH:mm:ss"
              placeholder="时间开始"
            ></el-time-picker>
          </el-col>
          <el-col :span="1">-</el-col>
          <el-col :span="10">
            <el-time-picker v-model="form.open_end_time" value-format="HH:mm:ss" placeholder="时间结束"></el-time-picker>
          </el-col>
          <el-col :span="3">
            <el-button type="text" @click="removeShowTime">删除时间段</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item prop="tip" label="多次录入提醒">
        <el-radio v-model="form.tip" label="1">开启</el-radio>
        <el-radio v-model="form.tip" label="2">关闭</el-radio>
        <div v-show="tipShow">
          <p>可设置客户被充值X次，系统和数据导出都将增加提示</p>
          <el-row :gutter="8">
            <el-col :span="4">
              <el-input type="number" v-model="form.limit_month" placeholder="月"></el-input>
            </el-col>
            <el-col :span="7" style="text-align: center">个月内，录入笔数超过</el-col>
            <el-col :span="4">
              <el-input type="number" v-model="form.limit_num" placeholder="笔数"></el-input>
            </el-col>
            <el-col :span="8">笔后，弹出提示。</el-col>
          </el-row>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sumbitForm('form')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { imageUploadUrl } from '@/api/mallapp/config'
import { getSettingInfo, editSettingInfo } from '@/api/mallapp/plugin/recharge'

export default {
  data () {
    return {
      action: imageUploadUrl,
      imageId: '',
      form: {
        title: '', // 名称
        image_url: '', //
        is_approve_open: '2', // 审批功能: '1'开通 ‘2’ 不开通
        opening_time: [], // 功能开放时间
        open_start_time: '', // 时间开始
        open_end_time: '', // 时间结束
        tip: '1', // 多次录入提醒 '1'开启 ‘2’ 关闭
        limit_month: 0, // 限制月
        limit_num: 0 // 限制数量

      },
      rules: {
        title: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        is_approve_open: [{ required: true, message: '请选择', trigger: 'blur' }]

      },
      showTime: false
    }
  },
  created () {
    this._getSettingInfo()
  },
  computed: {
    tipShow () {
      return this.form.tip === '1'
    }
  },
  methods: {
    btnShowTime () {
      this.showTime = true
    },
    removeShowTime () {
      this.showTime = false
    },
    sumbitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._editSettingInfo()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    beforeImageUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt500KB = file.size / 1024 < 500
      if (!(isJPG || isPNG)) {
        this.$message.error('上传图片只能是JPG或者PNG格式!')
      }
      if (!isLt500KB) {
        this.$message.error('上传图片大小不能超过 500kb!')
      }
      return isLt500KB && (isJPG || isPNG)
    },
    handleImageSuccess (res, file) {
      this.imageId = res.data.file_id
      this.form.image_url = URL.createObjectURL(file.raw)
    },
    _getSettingInfo () {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getSettingInfo().then(res => {
        loading.close()
        this.form = res.data
      })
    },
    _editSettingInfo () {
      let data = Object.assign({}, this.form)
      data.image_id = this.imageId
      console.log(data)
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      editSettingInfo(data).then(() => {
        loading.close()
      })
    }
  }
}
</script>

<style lang='scss'>
.plugin-setting-form {
  width: 700px;
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
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
}
</style>
