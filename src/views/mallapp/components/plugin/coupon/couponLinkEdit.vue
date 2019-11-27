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
      <p class="title">生成规则</p>
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
    </div>
  </div>
</template>

<script>
import { hideSiderbarMix } from '@/common/js/mixin'
import { changeCouponLink } from '@/api/mallapp/plugin/coupon'

export default {
  name: 'CouponLinkEdit',
  mixins: [hideSiderbarMix],
  data () {
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
      linkForm: {
        score_id: '', // 优惠券id
        code_id: '', // 兑换链接id
        title: '', // 链接名称
        number: null // 数量
      },
      linkRules: {
        title: [{ required: true, validator: checkTitle, trigger: 'blur' }],
        number: [{ required: true, message: '请填写数量', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.linkForm.score_id = this.$route.params.score_id
    this.linkForm.code_id = this.$route.params.code_id
    this.linkForm.title = this.$route.params.title
    this.linkForm.number = this.$route.params.total
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._changeCouponLink()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    _changeCouponLink () {
      let data = {}
      data = this.linkForm
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      changeCouponLink(data).then((res) => {
        loading.close()
        this.$router.push({ path: '/mplugin/coupon_log', query: { id: this.linkForm.score_id, type: 2 } })
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
.form {
  width: 700px;
}
.tip {
  color: #999;
  span {
    color: $themeColor;
  }
}
</style>
