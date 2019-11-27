<template>
  <div class="mcard">
    <div class="wrapper clearfix">
      <div class="left-wrapper">
        <div class="ph-nav" :style="{backgroundImage: `url(${navImage})`}">
          <span>移动积分充值</span>
        </div>
        <el-card class="mb10" shadow="hover" ref="card1" @click.native="showType('1', $event)">
          <div class="ph-header">{{formOne.title}}</div>
          <div class="content">
            <el-select
              class="mb10"
              v-model="formOne.selected"
              placeholder="请选择"
              style="width: 100%;"
            >
              <el-option
                v-for="(item, index) in formOne.options"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
              <el-option v-show="formOne.manual == '1'" :label="formOne.manual_name" value="-1"></el-option>
            </el-select>
            <el-input
              class="mb10"
              :disabled="formOne.selected != '-1'"
              v-show="formOne.manual == '1'"
              v-model="manualValue"
              :placeholder="formOne.manual_prompt"
            ></el-input>
            <P style="color: #999; font-size: 14px;">{{formOne.prompt}}</P>
          </div>
        </el-card>
        <el-card class="mb10" shadow="hover" ref="card2" @click.native="showType('2', $event)">
          <div class="ph-header">{{formCustomer.title}}</div>
          <div class="content">
            <el-input v-model="formCustomerValue" :placeholder="formCustomer.prompt"></el-input>
          </div>
        </el-card>
        <el-card class="mb10" shadow="hover" ref="card3" @click.native="showType('3', $event)">
          <template v-if="formSub.open === '1'">
            <div class="ph-header">{{formSub.title}}</div>
            <div class="content">
              <el-input v-model="formSubValue" :placeholder="formSub.prompt"></el-input>
            </div>
          </template>
        </el-card>
        <el-card class="mb10" shadow="hover" ref="card4" @click.native="showType('4', $event)">
          <div class="ph-header">{{formRemarks.title}}</div>
          <div class="content">
            <el-select
              class="mb10"
              v-model="formRemarks.selected"
              placeholder="请选择"
              style="width: 100%;"
            >
              <el-option
                v-for="(item, index) in formRemarks.options"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input type="textarea" v-model="formRemarks.prompt"></el-input>
          </div>
        </el-card>
      </div>
      <div class="right-wrapper">
        <el-form
          :model="formOne"
          :rules="rules"
          class="form"
          ref="formOne"
          label-width="130px"
          v-show="type === '1'"
        >
          <el-card class="box-card mbottom">
            <div class="title">充值选项设置</div>
            <el-form-item prop="title" label="标题">
              <el-input v-model="formOne.title" placeholder="请输入标题（最多十个字）"></el-input>
            </el-form-item>
            <el-form-item label="选项">
              <p class="tip">最多100项，每项最多20个字，可不设置</p>
            </el-form-item>
            <div class="add-wrapper">
              <el-form-item>
                <el-row :gutter="10" v-for="(item, index) in formOne.options" :key="index">
                  <el-col :span="10">
                    <el-form-item>
                      <el-input v-model="item.label" placeholder="请输入选项名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item>
                      <el-input type="number" v-model="item.value" placeholder="请输入选项代表的积分值">
                        <span slot="append">积分</span>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                    <i class="el-icon-circle-close-outline blur" @click="btnRemove(index)"></i>
                  </el-col>
                </el-row>
                <el-button class="el-icon-plus btn-add" type="primary" plain @click="btnAdd">添加一个选项</el-button>
              </el-form-item>
            </div>
            <el-form-item prop="manual" label="手动输入设置">
              <el-radio v-model="formOne.manual" label="1">开通</el-radio>
              <el-radio v-model="formOne.manual" label="2">不开通</el-radio>
              <span class="tip">开通后，手动输入选项即在选项表中出现</span>
            </el-form-item>
            <template v-if="formOne.manual=='1'">
              <el-form-item prop="manual_name" label="选项名称">
                <el-input v-model="formOne.manual_name"></el-input>
              </el-form-item>
              <el-form-item prop="manual_name" label="提示文案">
                <el-input v-model="formOne.manual_prompt"></el-input>
              </el-form-item>
              <el-form-item label="输入值限制">
                <el-row>
                  <el-col :span="4">仅可输入</el-col>
                  <el-col :span="9">
                    <el-input type="number" v-model="formOne.min_score" :min="0">
                      <span slot="append">积分</span>
                    </el-input>
                  </el-col>
                  <el-col :span="2" class="line">至</el-col>
                  <el-col :span="9">
                    <el-input type="number" v-model="formOne.max_score" :min="0">
                      <span slot="append">积分</span>
                    </el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </template>
            <el-form-item prop="manual" label="提示文字">
              <el-input
                type="textarea"
                v-model="formOne.prompt"
                :autosize="{ minRows: 2, maxRows: 4}"
              ></el-input>
              <span class="tip">最多50个字，可为空</span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('formOne')">保存</el-button>
            </el-form-item>
          </el-card>
        </el-form>
        <el-form
          :model="formCustomer"
          :rules="customerRules"
          class="form"
          ref="formCustomer"
          label-width="130px"
          v-show="type === '2'"
        >
          <el-card class="box-card mbottom">
            <div class="title">充值对象设置</div>
            <el-form-item prop="title" label="标题">
              <el-input v-model="formCustomer.title" placeholder="请输入标题"></el-input>
              <p class="tip">最多十个字</p>
            </el-form-item>
            <el-form-item prop="prompt" label="输入框提示文案">
              <el-input v-model="formCustomer.prompt" placeholder="请输入输入框提示文案"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('formCustomer')">保存</el-button>
            </el-form-item>
          </el-card>
        </el-form>
        <el-form
          :model="formSub"
          :rules="subRules"
          class="form"
          ref="formSub"
          label-width="130px"
          v-show="type === '3'"
        >
          <el-card class="box-card mbottom">
            <div class="title">补充客户信息设置</div>
            <el-form-item prop="open" label="是否开通">
              <el-radio v-model="formSub.open" label="1">开通</el-radio>
              <el-radio v-model="formSub.open" label="2">不开通</el-radio>
              <p class="tip">选择不开通，将隐藏此输入框</p>
            </el-form-item>
            <template v-if="formSub.open === '1'">
              <el-form-item prop="title" label="标题">
                <el-input v-model="formSub.title" placeholder="请输入标题"></el-input>
                <p class="tip">最多十个字</p>
              </el-form-item>
              <el-form-item prop="prompt" label="输入框提示文案">
                <el-input v-model="formSub.prompt" placeholder="请输入输入框提示文案"></el-input>
              </el-form-item>
              <el-form-item prop="validate" label="验证">
                <el-checkbox v-model="formSub.validate" true-label="1" false-label="2">是否必填</el-checkbox>
              </el-form-item>
            </template>
            <el-form-item>
              <el-button type="primary" @click="submitForm('formSub')">保存</el-button>
            </el-form-item>
          </el-card>
        </el-form>
        <el-form
          :model="formRemarks"
          :rules="RemarksRules"
          class="form"
          ref="formRemarks"
          label-width="130px"
          v-show="type==='4'"
        >
          <el-card class="box-card mbottom">
            <div class="title">备注设置</div>
            <el-form-item prop="title" label="标题">
              <el-input v-model="formRemarks.title" placeholder="请输入标题（最多十个字）"></el-input>
            </el-form-item>
            <el-form-item label="选项">
              <p class="tip">最多100项，每项最多20个字，可不设置</p>
            </el-form-item>
            <div class="add-wrapper">
              <el-form-item>
                <el-row :gutter="10" v-for="(item, index) in formRemarks.options" :key="index">
                  <el-col :span="22">
                    <el-form-item>
                      <el-input v-model="item.label" placeholder="请输入选项名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                    <i class="el-icon-circle-close-outline blur" @click="btnRemoveRemarks(index)"></i>
                  </el-col>
                </el-row>
                <el-button
                  class="el-icon-plus btn-add"
                  type="primary"
                  plain
                  @click="btnAddRemarks"
                >添加一个选项</el-button>
              </el-form-item>
              <el-form-item prop="prompt" label="输入框提示文案">
                <el-input v-model="formRemarks.prompt" placeholder="请输入输入框提示文案"></el-input>
              </el-form-item>
              <el-form-item prop="validate" label="验证">
                <el-checkbox v-model="formRemarks.validate" true-label="1" false-label="2">是否必填</el-checkbox>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button type="primary" @click="submitForm('formRemarks')">保存</el-button>
            </el-form-item>
          </el-card>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getFormInfo, setFormInfo } from '@/api/mallapp/plugin/recharge'

export default {
  data () {
    return {
      navImage: require('@/common/images/mall/wxTitle.png'),
      type: '1', // 类型： ‘1’ 充值选项设置 ‘2’充值对象设置 ‘3’补充客户信息设置 ‘4’备注设置
      formOne: {
        title: '充值积分', // 标题
        options: [ // 选项
          {
            value: '', // 选择值
            label: '' // 选择名称
          }
        ],
        selected: '', // 已选值: '-1'表示手动输入
        manual: '1', // 手动输入设置： ‘1‘ 开通， ’2‘ 不开通
        manual_name: '手动输入', // 手动输入名称
        manual_prompt: '请输入积分数额', // 手动输入提示文案
        max_score: 0, // 输入值限制: 最大值
        min_score: 0, // 输入值限制: 最小值
        prompt: '说明：可从下拉表中选择积分，也可手动输入积分' // 说明
      },
      rules: {},
      manualValue: '',
      formCustomer: {
        prompt: '请输入相关信息', // 输入框提示文案
        title: '客户号手机号' // 标题
      },
      formCustomerValue: '',
      customerRules: {},
      formSub: {
        open: '1', // 是否开通： ‘1’开通 ‘2’ 不开通
        prompt: '请输入相关信息', // 输入框提示文案
        title: '客户号', // 标题
        validate: '1' //  验证 是否必填： ‘1’是， ‘2’ 否
      },
      formSubValue: '',
      subRules: {},
      formRemarks: {
        title: '备注', // 标题
        options: [ // 选项
          {
            value: '', // 选择值
            label: '' // 选择名称
          }
        ],
        prompt: '请输入相关信息', // 输入框提示文案
        validate: '1' //  验证 是否必填： ‘1’是， ‘2’ 否
      },
      RemarksRules: {}
    }
  },
  created () {
    this._getFormInfo()
  },
  methods: {
    btnAdd () {
      this.formOne.options.push({ label: '', value: '' })
    },
    btnRemove (index) {
      this.formOne.options.splice(index, 1)
      this.formOne.selected = ''
    },
    btnAddRemarks () {
      this.formRemarks.options.push({ label: `选项${this.formRemarks.options.length + 1}`, value: `选项${this.formRemarks.options.length + 1}` })
    },
    btnRemoveRemarks (index) {
      this.formRemarks.options.splice(index, 1)
      this.formRemarks.selected = ''
    },
    showType (index, e) {
      this.type = index
      let refName = ''
      switch (index) {
        case '1':
          refName = 'formOne'
          break
        case '2':
          refName = 'formCustomer'
          break
        case '3':
          refName = 'formSub'
          break
        case '4':
          refName = 'formRemarks'
          break
        default:
          break
      }
      let offsetTop = this.$refs[`card${index}`].$el.offsetTop
      this.$refs[refName].$el.style.marginTop = offsetTop + 'px'
    },
    submitForm (formName) {
      let data = Object.assign({}, this[formName])
      data.type = this.type
      this._setFormInfo(data)
    },
    _getFormInfo () {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getFormInfo().then((res) => {
        loading.close()
        this.formOne = res.data.form_option
        this.formCustomer = res.data.form_customer
        this.formRemarks = res.data.form_remarks
        this.formSub = res.data.form_sub
      })
    },
    _setFormInfo (data) {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      setFormInfo(data).then(() => {
        loading.close()
        this._getFormInfo()
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.mb10 {
  margin-bottom: 10px;
}
.wrapper {
  .left-wrapper {
    position: relative;
    float: left;
    width: 365px;
    min-height: 800px;
    margin: 0 20px 30px 20px;
    background-color: rgb(246, 246, 246);
    padding-bottom: 20px;
    overflow-y: auto;
    .ph-nav {
      width: 365px;
      height: 73px;
      background-repeat: no-repeat;
      background-size: 100% 73px;
      text-align: center;
      span {
        display: inline-block;
        margin-top: 40px;
        color: #fff;
      }
    }
    .ph-header {
      padding-left: 9px;
      border-left: 6px solid;
      line-height: 16px;
      height: 16px;
      font-size: 16px;
      color: #c18e1b;
    }
    .content {
      padding: 15px 0;
    }
  }
  .right-wrapper {
    float: left;
    width: 660px;
    .box-card {
      .line {
        text-align: center;
      }
      .title {
        border-left: 4px solid #4386f4;
        font-size: 16px;
        padding-left: 10px;
        color: #3c3c3c;
        margin-left: -20px;
      }
      .tip {
        font-size: 12px;
        color: #999;
      }
      .selects-top {
        span {
          margin-right: 10px;
          font-size: 14px;
          color: #666;
        }
      }
      .list-table {
        max-height: 500px;
        overflow: auto;
      }
      .submit {
        margin-top: 20px;
      }
    }
    .blur {
      font-size: 18px;
      cursor: pointer;
      &:hover {
        color: #4386f4;
      }
    }
    .btn-add {
      margin: 20px 0;
    }
  }
}
</style>
