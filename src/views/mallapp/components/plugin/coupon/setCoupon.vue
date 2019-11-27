<template>
  <div class="margin">
    <div class="steps">
      <el-steps :space="200" :active="1" finish-status="success" align-center class="steps-wrapper">
        <el-step title="创建优惠券"></el-step>
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
            <p>导出优惠券兑换码/二维码</p>
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
      <el-tabs v-model="type">
        <el-tab-pane label="兑换码" name="1">
          <el-form
            :model="form"
            label-width="100px"
            :rules="rules"
            size="medium"
            ref="form"
            class="form"
          >
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
              <p class="tip">
                说明:
                <span>生成的兑换码都为未激活状态,需要手动激活后方可使用</span>
              </p>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">确定</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="兑换链接" name="2">
          <el-form
            :model="linkForm"
            label-width="100px"
            :rules="linkRules"
            size="medium"
            ref="linkForm"
            class="form"
          >
            <el-form-item prop="title" label="链接名称">
              <el-input type="text" v-model="linkForm.title" placeholder="请填写链接名称，1-12个汉字"></el-input>
            </el-form-item>
            <el-form-item prop="number" label="可领取总数" required>
              <el-input type="number" v-model="linkForm.number" placeholder="请填写数量" min="1">
                <template slot="append">张</template>
              </el-input>
              <p class="tip">
                说明:
                <span>设置该兑换链接最多可被多少用户领取。（每人最多只可领取一张优惠券）</span>
              </p>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('linkForm')">确定</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { hideSiderbarMix } from '@/common/js/mixin'
import { setcoupon } from '@/api/mallapp/plugin/coupon'

export default {
  name: 'SetCuopon',
  mixins: [hideSiderbarMix],
  data () {
    const checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入数值'))
      }
      if (!Number.isInteger(Number(value))) {
        return callback(new Error('请输入整数值'))
      }
      if (value > 30000 || value < 1) {
        return callback(new Error('请输入1～30000的数字'))
      }
      callback()
    }
    const checkTitle = (rule, value, callback) => {
      let reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
      let flag = reg.test(this.linkForm.title)

      if (flag === false) {
        return callback(new Error('请输入中文'))
      } else {
        if (this.linkForm.title.length === 0 || this.linkForm.title.length > 12) {
          return callback(new Error('请1-12个中文'))
        } else {
          callback()
        }
      }
    }
    return {
      type: '1',
      form: {
        number: null // 数量
      },
      rules: {
        number: [{ required: true, validator: checkNumber, trigger: 'blur' }]
      },
      linkForm: {
        title: '', // 链接名称
        number: null // 数量
      },
      linkRules: {
        title: [{ required: true, validator: checkTitle, trigger: 'blur' }]
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
          this._setcoupon()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    _setcoupon () {
      let data = {}
      if (this.type === '1') {
        data = this.form
      } else {
        data = this.linkForm
      }
      data.type = this.type
      data.id = this.id
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      setcoupon(data).then((res) => {
        loading.close()
        this.$router.push({ path: '/mplugin/coupon_success', query: res.data })
      })
    }
  }

}
</script>

<style lang='scss' scoped>
@import "@/common/scss/variable.scss";
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
.tip {
  color: #999;
  span {
    color: $themeColor;
  }
}
</style>
