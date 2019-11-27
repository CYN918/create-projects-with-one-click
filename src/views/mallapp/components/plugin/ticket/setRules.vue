<template>
  <div class="margin mplugin-set">
    <div class="steps">
      <el-steps :space="200" :active="1" finish-status="success" align-center class="steps-wrapper">
        <el-step title="创建积分券"></el-step>
        <el-step title="设置发放规则"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
    <div class="mcard mbottom">
      <p class="title">生成兑换码</p>
      <div class="mcard-content">
        <ul class="cbo grant_rule">
          <li class="fl li1">
            <div class="p-t-4">
              <img src="@/common/images/create_onchange_code_icon.png" alt width="90" height="56">
            </div>
            <p>设置面值和生成数量，生成兑换码/二维码</p>
          </li>
          <li class="fl li2">
            <img src="@/common/images/flow_arrow_icon.png" alt>
          </li>
          <li class="fl li1">
            <img src="@/common/images/download_erweicode_icon.png" alt width="68" height="68">
            <p>导出积分券兑换码/二维码</p>
          </li>
          <li class="fl li2">
            <img src="@/common/images/flow_arrow_icon.png" alt>
          </li>
          <li class="fl li1">
            <div class="p-t-4">
              <img src="@/common/images/card_coupon_icon.png" width="90" height="56">
              <p>将兑换码/二维码印刷成卡/券</p>
            </div>
          </li>
          <li class="fl li2">
            <img src="@/common/images/flow_arrow_icon.png" alt>
          </li>
          <li class="fl li1">
            <img src="@/common/images/scan_code_icon.png" alt width="150" height="68">
            <p>用户输入兑换码/扫码直接领取积分券</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="mcard">
      <el-tabs v-model="activeName">
        <el-tab-pane label="系统生成" name="first">
          <el-form
            :model="form"
            label-width="100px"
            :rules="rules"
            size="medium"
            ref="form"
            class="form"
          >
            <el-form-item prop="title" label="面值">
              <el-input
                type="number"
                v-model="form.title"
                placeholder="输入1～999999的数字"
                min="1"
                max="999999"
              >
                <template slot="append">积分</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="number" label="生成数量">
              <el-input
                type="number"
                v-model="form.number"
                placeholder="输入1～30000的数字"
                min="1"
                max="30000"
              >
                <template slot="append">张</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">确定</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="报表导入" name="second">
          <div class="m-t-md excel_wrap">
            <span class="float_l pr_20">
              第一步：请先下载模板并填写券码ID和兑换码。
              <br>
              <span class="pl_55">1.券码ID为5-15位，兑换码为5-15位；</span>
              <br>
              <span class="pl_55">2.每次导入不超过5000条。</span>
            </span>
            <span class="float_l">第二步：上传编辑完成的模板。</span>
            <el-button size="medium" class="btn-down">下载模板</el-button>
          </div>
          <el-form
            :model="formImport"
            label-width="100px"
            :rules="rulesImport"
            size="medium"
            ref="formImport"
            class="form"
          >
            <el-form-item prop="templete_id" label="上传模版" required>
              <el-input v-model="formImport.templete_name" placeholder="请上传模板" disabled>
                <template slot="append">
                  <el-upload
                    accept=".csv"
                    :on-success="handleSuccess"
                    :action="uploadUrl"
                  >
                    <el-button type="primary">选择文件</el-button>
                  </el-upload>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="title" label="面值">
              <el-input
                type="number"
                v-model="formImport.title"
                placeholder="输入1～999999的数字"
                min="1"
                max="999999"
              >
                <template slot="append">积分</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitFormImport('formImport')">确定</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { uploadUrl } from '@/api/mallapp/config'
import { setRules, importRules } from '@/api/mallapp/plugin/index'
import { hideSiderbarMix } from '@/common/js/mixin'

export default {
  name: 'ticketSetRules',
  mixins: [hideSiderbarMix],
  data () {
    var checkTitle = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入面值'))
      }
      if (!Number.isInteger(Number(value))) {
        return callback(new Error('请输入整数值'))
      }
      if (value > 999999 || value < 1) {
        return callback(new Error('请输入1～999999的数字'))
      }
      callback()
    }
    return {
      activeName: 'first',
      uploadUrl: uploadUrl,
      form: {
        title: null, // 面值
        number: '' // 生成数量
      },
      rules: {
        title: [{ required: true, validator: checkTitle, trigger: 'blur' }],
        number: [{ required: true, message: '请输入生成数量', trigger: 'blur' }]
      },
      formImport: {
        templete_name: '', // 模板名称
        templete_id: '', // 模板id
        title: null // 面值
      },
      rulesImport: {
        title: [{ required: true, validator: checkTitle, trigger: 'blur' }],
        templete_id: [{ required: true, message: '请上传模版', trigger: 'blur' }]
      },
      id: ''
    }
  },
  created () {
    this.id = this.$route.query.id
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._setRules()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitFormImport (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._importRules()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSuccess (res, fill) {
      this.formImport.templete_name = fill.name
      this.formImport.templete_id = res.id
    },
    _importRules () {
      let data = {}
      data.id = this.id
      data.templete_id = this.formImport.templete_id
      data.title = this.formImport.title
      importRules(data).then((res) => {
        this.code_id = res.data.id
        this.$router.push({ path: '/mplugin/success', query: { code_id: this.code_id } })
      })
    },
    _setRules () {
      let data = this.form
      data.id = this.id
      setRules(data).then((res) => {
        this.code_id = res.data.id
        this.$router.push({ path: '/mplugin/success', query: { code_id: this.code_id } })
      })
    }
  }
}
</script>

<style>
.mplugin-set .el-upload-list__item {
  display: none;
}
</style>

<style lang='scss' scoped>

.steps {
  margin: 0 40px 20px;
  .steps-wrapper {
    width: 600px;
    margin: 0 auto;
  }
}
.grant_rule {
  margin: 0 auto;
  width: 1100px;
}
.cbo {
  clear: both;
  overflow: hidden;
}
.grant_rule li.li1 {
  width: 160px;
}
.grant_rule li.li2 {
  width: 134px;
}
.fl {
  float: left;
}
.p-t-4 {
  padding-top: 4px;
}
.grant_rule li.li1 img {
  display: block;
  margin: 0 auto;
}
.grant_rule li.li2 img {
  display: block;
  margin: 0 auto;
}
img {
  vertical-align: middle;
}
.grant_rule li.li1 p {
  margin-top: 30px;
}
p {
  margin: 0 0 10px;
}
.form {
  width: 700px;
}
.excel_wrap {
  background: #f6f6f6;
  padding: 10px;
  display: inline-block;
  width: 100%;
  font-size: 14px;
}
.m-t-md {
  margin-top: 20px;
}
.pr_20 {
  padding-right: 20px;
}
.float_l {
  float: left;
}
.pl_55 {
  padding-left: 55px;
}
.btn-down {
  float: right;
}
</style>
