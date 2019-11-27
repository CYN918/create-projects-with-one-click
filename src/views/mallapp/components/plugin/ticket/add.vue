<template>
  <div class="margin mplugin-add">
    <div class="steps">
      <el-steps :space="200" :active="0" finish-status="success" align-center class="steps-wrapper">
        <el-step title="创建积分券"></el-step>
        <el-step title="设置发放规则"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
    <div class="mcard">
      <div class="title">基本信息</div>
      <div class="wrapper clearfix">
        <div class="left-wrapper">
          <div class="header">
            <div class="top">
              <div class="tit">{{form.title}}</div>
              <div class="logo">
                <img :src="imageUrl"/>
              </div>
            </div>
            <div class="value">积分面值</div>
            <div class="time">
              <span class="span_tips">有效期：</span>
              <span class="time_deadline2">{{startTime}}</span>
              <span class="time_deadline-tips">至</span>
              <span class="time_deadline2">{{endTime}}</span>
            </div>
          </div>
          <div class="texts">{{form.content}}</div>
          <p class="btn" style="margin: 0px;">立即领取</p>
        </div>
        <div class="right-wrapper">
          <el-card class="box-card">
            <el-form :model="form" label-width="100px" :rules="rules" size="medium" ref="form">
              <el-form-item prop="title" label="积分券名称">
                <el-input v-model="form.title" placeholder="请输入优惠券名称"></el-input>
              </el-form-item>
              <el-form-item label="有效期" required>
                <el-col :span="11">
                  <el-form-item prop="start_time">
                    <el-date-picker
                      type="date"
                      placeholder="开始时间"
                      v-model="form.start_time"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="end_time">
                    <el-date-picker
                      type="date"
                      placeholder="结束时间"
                      v-model="form.end_time"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="LOGO">
                <div class="image" v-show="imageUrl">
                  <img :src="imageUrl">
                </div>
                <el-button type="primary" plain @click="handleShowPicSelect">{{btnPicText}}</el-button>
                <div class="tip">
                  图片建议尺寸：
                  850像素*350像素，大小不超过2M
                </div>
              </el-form-item>
              <el-form-item label="使用须知" prop="content">
                <el-input
                  type="textarea"
                  :rows="4"
                  v-model="form.content"
                  placeholder="请填写本券的注意事项（80个汉字以内，选填）"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('form')">下一步</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </div>
    </div>
    <!--popup-->
    <el-dialog :show-close="false" :visible.sync="dialogVisible" width="990px">
      <div class="pic-wrapper">
        <Pic @select="selectPic"></Pic>
      </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleGetPic">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import Pic from './../../common/picSelect'
import { formatDate } from '@/common/js/date'
import { addScoreTicket, getScoreTicket } from '@/api/mallapp/plugin/index'
import { hideSiderbarMix } from '@/common/js/mixin'

export default {
  mixins: [hideSiderbarMix],
  name: 'TicketAdd',
  data () {
    return {
      imageUrl: '', // 图片地址
      btnPicText: '上传',
      form: {
        title: '', // 名称
        start_time: '', // 开始时间
        end_time: '', // 结束时间
        image_id: '', // 圖片id
        content: '' // 类容介绍
      },
      image: {},
      rules: {
        title: [{ required: true, message: '请输入优惠券名称,只允许9个汉字以内，一个汉字为2个字符', trigger: 'blur', max: 9 }],
        start_time: [{ required: true, message: '请输入开始时间', trigger: 'blur' }],
        end_time: [{ required: true, message: '请输入结束时间', trigger: 'blur' }],
        content: [{ message: '只允许80个汉字以内，一个汉字为2个字符', trigger: 'blur', max: 80 }]
      },
      dialogVisible: false,
      id: ''
    }
  },
  created () {
    this.id = this.$route.query.id
    if (this.id) {
      this._getScoreTicket()
    }
  },
  computed: {
    startTime () {
      let ret = ''
      if (this.form.start_time instanceof Date) {
        ret = formatDate(this.form.start_time, 'yyyy-MM-dd')
      } else if (this.form.start_time !== '') {
        ret = formatDate(new Date(this.form.start_time), 'yyyy-MM-dd')
      }
      return ret
    },
    endTime () {
      let ret = ''
      if (this.form.end_time instanceof Date) {
        ret = formatDate(this.form.end_time, 'yyyy-MM-dd')
      } else if (this.form.end_time !== '') {
        ret = formatDate(new Date(this.form.end_time), 'yyyy-MM-dd')
      }
      return ret
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._addScoreTicket()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    selectPic (item) {
      this.image = item
    },
    handleShowPicSelect () {
      this.dialogVisible = true
    },
    handleGetPic () {
      this.imageUrl = this.image.url ? this.image.url : this.image.file_url
      if (!this.imageUrl) {
        this.$message({
          message: '请选择图片',
          type: 'warning'
        })
        return
      }
      this.form.image_id = this.image.file_id
      this.dialogVisible = false
    },
    _addScoreTicket () {
      addScoreTicket(this.form).then((res) => {
        if (this.id) {
          this.$router.push({ path: '/mplugin/index' }) // 编辑跳转到ticket页面
        } else {
          this.$router.push({ path: '/mplugin/set_rules', query: res.data }) // 新增跳转到setrules页面
        }
      })
    },
    _getScoreTicket () {
      getScoreTicket(this.id).then(res => {
        this.imageUrl = res.data.image_url
        let form = {}
        form.title = res.data.title
        form.start_time = res.data.start_time
        form.end_time = res.data.end_time
        form.content = res.data.content
        this.form = form
      })
    }
  },
  components: {
    Pic
  },
  watch: {
    imageUrl (val) {
      if (val) {
        this.btnPicText = '重新上传'
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.steps {
  margin: 0 40px 20px;
  .steps-wrapper {
    width: 600px;
    margin: 0 auto;
  }
}
.wrapper {
  .left-wrapper {
    position: relative;
    float: left;
    width: 325px;
    height: 600px;
    margin: 0 20px 30px 20px;
    background-color: rgb(246, 246, 246);
    .header {
      position: relative;
      width: 100%;
      height: 160px;
      background: url("./static/coupon_bg_intergal.png");
      background-size: 100% 160px;
    }
    .top {
      padding: 20px;
      color: #ffffff;
      font-size: 16px;
      width: 200px;
      overflow: hidden;
      word-wrap: break-word;
      word-break: break-all;
    }
    .logo {
      position: absolute;
      top: 15px;
      right: 15px;
      width: 86px;
      height: 26px;
      text-align: center;
      line-height: 26px;
      img {
        max-width: 86px;
        max-height: 26px;
        vertical-align: middle;
      }
    }
    .value {
      margin-bottom: 10px;
      color: #ffffff;
      padding: 10px 0;
      text-align: center;
      font-size: 30px;
    }
    .time {
      color: #ffffff;
      font-size: 10px;
      width: 220px;
      text-align: center;
      margin: 0 auto;
      .span_tips {
        width: 50px;
        overflow: hidden;
        display: inline-block;
        height: 32px;
        line-height: 32px;
      }
      .time_deadline2 {
        width: 70px;
        overflow: hidden;
        display: inline-block;
        height: 32px;
        line-height: 32px;
      }
      .time_deadline-tips {
        width: 30px;
        overflow: hidden;
        display: inline-block;
        height: 32px;
        line-height: 32px;
        text-align: center;
      }
      .time_deadline2 {
        width: 70px;
        overflow: hidden;
        display: inline-block;
        height: 32px;
        line-height: 32px;
      }
    }
    .texts {
      color: rgb(166, 166, 166);
      padding: 10px 15px;
    }
    .btn {
      height: 50px;
      background-color: rgb(198,26,42);
      font-size: 16px;
      color: #FFFFFF;
      text-align: center;
      line-height: 50px;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
    }
  }
  .right-wrapper {
    float: left;
    width: 630px;
    .line {
      text-align: center;
    }
    .tip {
      color: #999;
    }
    .image {
      width: 100px;
      height: 100px;
      text-align: center;
      margin-bottom: 10px;
      vertical-align: middle;
      line-height: 100px;
      img {
        vertical-align: middle;
        max-width: 100px;
        max-height: 100px;
      }
    }
  }
}
.pic-wrapper {
  height: 600px;
  overflow-y: auto;
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    &::-webkit-scrollbar-track-piece {
      background-color: rgba(0, 0, 0, 0.2);
      -webkit-border-radius: 6px;
    }
   &::-webkit-scrollbar-thumb:vertical {
      height: 5px;
      background-color: rgba(125, 125, 125, 0.7);
      -webkit-border-radius: 6px;
    }
    &::-webkit-scrollbar-thumb:horizontal {
      width: 5px;
      background-color: rgba(125, 125, 125, 0.7);
      -webkit-border-radius: 6px;
    }
}
</style>

<style>
  .mplugin-add .el-dialog__header {
    padding: 0;
  }
</style>
