<template>
  <div>
    <div class="explain">根据商品来源（京东/苏宁/百联/网易严选/自有等）设定不同运费</div>
    <el-form :model="form" ref="form" :inline="true" size="small">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>客户运费:</span>
        </div>
        <div class="tip">说明：客户运费用于会员向客户收取运费，运费的满足金额以订单中，商品的分销价为标准。客户运费不会按照供应商分开收运费，每个订单，只会收取客户一次运费，运费金额随订单扣减 站点账户余额一并扣除。</div>
        <!--jd-->
        <el-card class="inner-card" shadow="never">
          <div slot="header" class="clearfix">
            <span class="tit">京东商品运费:</span>
          </div>
          <div class="tip">平台京东商品运费规则:订单金额 < 49元，收取运费8元；49元 ≤ 订单金额 < 99元，收取运费6元；订单金额 ≥ 99元， 免运费</div>
          <!--eslint-disable-->
          <div
            class="item-wrapper"
            v-for="(item, index) in form.store_jd">
            客户运费在
            <el-form-item
              :prop="'store_jd.'+index+'.min'"
              :rules="{
                required: true, message: '不能为空', trigger: 'blur'
              }">
              <el-input class="width10" type="number" v-model="item.min" min="0"></el-input>
            </el-form-item>
            元（包含）至
            <el-form-item 
              :prop="'store_jd.'+index+'.max'"
              :rules="{
                required: true, message: '不能为空', trigger: 'blur'
              }">
              <el-input class="width10" type="number" v-model="item.max" min="0"></el-input>
            </el-form-item>
            元（不含），收取
            <el-form-item
              :prop="'store_jd.'+index+'.price'"
              :rules="{
                required: true, message: '不能为空', trigger: 'blur'
              }">
              <el-input class="width10" type="number" v-model="item.price" min="0"></el-input>
            </el-form-item>
            元运费
            <i class="plus el-icon-circle-plus" v-show="sotreJdIndex === index" @click="addStore('store_jd')"></i>
            <i class="remove el-icon-remove" v-show="sotreJdIndex !== index || index !== 0" @click="removeStore(item, 'store_jd')"></i>
          </div>
        </el-card>
        <!---sn-->
        <el-card class="inner-card" shadow="never">
          <div slot="header" class="clearfix">
            <span class="tit">苏宁商品运费:</span>
          </div>
          <div class="tip">平台苏宁商品运费规则:订单金额 < 86元，收取运费8元；订单金额 ≥ 86元， 免运费</div>
          <!--eslint-disable-->
          <div
            class="item-wrapper"
            v-for="(item, index) in form.store_sn">
            客户运费在
            <el-form-item
              :prop="'store_sn.'+index+'.min'"
              :rules="{
                required: true, message: '不能为空', trigger: 'blur'
              }">
              <el-input class="width10" type="number" v-model="item.min" min="0"></el-input>
            </el-form-item>
            元（包含）至
            <el-form-item 
              :prop="'store_sn.'+index+'.max'"
              :rules="{
                required: true, message: '不能为空', trigger: 'blur'
              }">
              <el-input class="width10" type="number" v-model="item.max" min="0"></el-input>
            </el-form-item>
            元（不含），收取
            <el-form-item
              :prop="'store_sn.'+index+'.price'"
              :rules="{
                required: true, message: '不能为空', trigger: 'blur'
              }">
              <el-input class="width10" type="number" v-model="item.price" min="0"></el-input>
            </el-form-item>
            元运费
            <i class="plus el-icon-circle-plus" v-show="sotreSnIndex === index" @click="addStore('store_sn')"></i>
            <i class="remove el-icon-remove" v-show="sotreSnIndex !== index || index !== 0" @click="removeStore(item, 'store_sn')"></i>
          </div>
        </el-card>
        <!---yx-->
        <el-card class="inner-card" shadow="never">
          <div slot="header" class="clearfix">
            <span class="tit">网易严选商品运费:</span>
          </div>
          <div class="tip">网易严选商品运费规则:订单金额 < 88元，收取运费10元；订单金额 ≥ 88元， 免运费</div>
          <!--eslint-disable-->
          <div
            class="item-wrapper"
            v-for="(item, index) in form.store_yx">
            客户运费在
            <el-form-item
              :prop="'store_yx.'+index+'.min'"
              :rules="{
                required: true, message: '不能为空', trigger: 'blur'
              }">
              <el-input class="width10" type="number" v-model="item.min" min="0"></el-input>
            </el-form-item>
            元（包含）至
            <el-form-item 
              :prop="'store_yx.'+index+'.max'"
              :rules="{
                required: true, message: '不能为空', trigger: 'blur'
              }">
              <el-input class="width10" type="number" v-model="item.max" min="0"></el-input>
            </el-form-item>
            元（不含），收取
            <el-form-item
              :prop="'store_yx.'+index+'.price'"
              :rules="{
                required: true, message: '不能为空', trigger: 'blur'
              }">
              <el-input class="width10" type="number" v-model="item.price" min="0"></el-input>
            </el-form-item>
            元运费
            <i class="plus el-icon-circle-plus" v-show="sotreYxIndex === index" @click="addStore('store_yx')"></i>
            <i class="remove el-icon-remove" v-show="sotreYxIndex !== index || index !== 0" @click="removeStore(item, 'store_yx')"></i>
          </div>
        </el-card>
        <!---self-->
        <el-card class="inner-card" shadow="never">
          <div slot="header" class="clearfix">
            <span class="tit">自有商品运费:</span>
          </div>
          <div class="tip">自有商品包含服务商手动上传的商品和服务商自有供应商上传的商品</div>
          <!--eslint-disable-->
          <div
            class="item-wrapper"
            v-for="(item, index) in form.store_self">
            客户运费在
            <el-form-item
              :prop="'store_self.'+index+'.min'"
              :rules="{
                required: true, message: '不能为空', trigger: 'blur'
              }">
              <el-input class="width10" type="number" v-model="item.min" min="0"></el-input>
            </el-form-item>
            元（包含）至
            <el-form-item 
              :prop="'store_self.'+index+'.max'"
              :rules="{
                required: true, message: '不能为空', trigger: 'blur'
              }">
              <el-input class="width10" type="number" v-model="item.max" min="0"></el-input>
            </el-form-item>
            元（不含），收取
            <el-form-item
              :prop="'store_self.'+index+'.price'"
              :rules="{
                required: true, message: '不能为空', trigger: 'blur'
              }">
              <el-input class="width10" type="number" v-model="item.price" min="0"></el-input>
            </el-form-item>
            元运费
            <i class="plus el-icon-circle-plus" v-show="sotreSelfIndex === index" @click="addStore('store_self')"></i>
            <i class="remove el-icon-remove" v-show="sotreSelfIndex !== index || index !== 0" @click="removeStore(item, 'store_self')"></i>
          </div>
        </el-card>
      </el-card>

      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>用户运费:</span>
        </div>
        <div class="tip">说明：用户运费用于收取用户在商城消费时产生的运费，运费的满足金额以订单中，商品的销售价为标准。用户运费不会按照供应商分开收运费，每个订单，只会收取用户一次运费，运费金额随用户支付订单一起支付。</div>
        <!--jd-->
        <el-card class="inner-card" shadow="never">
          <div slot="header" class="clearfix">
            <span class="tit">京东商品运费:</span>
          </div>
          <div class="tip">平台京东商品运费规则:订单金额 < 49元，收取运费8元；49元 ≤ 订单金额 < 99元，收取运费6元；订单金额 ≥ 99元， 免运费</div>
          <!--eslint-disable-->
          <div
            class="item-wrapper"
            v-for="(item, index) in form.user_jd">
            用户运费在
            <el-form-item
              :prop="'user_jd.'+index+'.min'"
              :rules="{
                required: true, message: '不能为空', trigger: 'blur'
              }">
              <el-input class="width10" type="number" v-model="item.min" min="0"></el-input>
            </el-form-item>
            元（包含）至
            <el-form-item 
              :prop="'user_jd.'+index+'.max'"
              :rules="{
                required: true, message: '不能为空', trigger: 'blur'
              }">
              <el-input class="width10" type="number" v-model="item.max" min="0"></el-input>
            </el-form-item>
            元（不含），收取
            <el-form-item
              :prop="'user_jd.'+index+'.price'"
              :rules="{
                required: true, message: '不能为空', trigger: 'blur'
              }">
              <el-input class="width10" type="number" v-model="item.price" min="0"></el-input>
            </el-form-item>
            元运费
            <i class="plus el-icon-circle-plus" v-show="userJdIndex === index" @click="addStore('user_jd')"></i>
            <i class="remove el-icon-remove" v-show="userJdIndex !== index || index !== 0" @click="removeStore(item, 'user_jd')"></i>
          </div>
        </el-card>
        <!---sn-->
        <el-card class="inner-card" shadow="never">
          <div slot="header" class="clearfix">
            <span class="tit">苏宁商品运费:</span>
          </div>
          <div class="tip">平台苏宁商品运费规则:订单金额 < 86元，收取运费8元；订单金额 ≥ 86元， 免运费</div>
          <!--eslint-disable-->
          <div
            class="item-wrapper"
            v-for="(item, index) in form.user_sn">
            用户运费在
            <el-form-item
              :prop="'user_sn.'+index+'.min'"
              :rules="{
                required: true, message: '不能为空', trigger: 'blur'
              }">
              <el-input class="width10" type="number" v-model="item.min" min="0"></el-input>
            </el-form-item>
            元（包含）至
            <el-form-item 
              :prop="'user_sn.'+index+'.max'"
              :rules="{
                required: true, message: '不能为空', trigger: 'blur'
              }">
              <el-input class="width10" type="number" v-model="item.max" min="0"></el-input>
            </el-form-item>
            元（不含），收取
            <el-form-item
              :prop="'user_sn.'+index+'.price'"
              :rules="{
                required: true, message: '不能为空', trigger: 'blur'
              }">
              <el-input class="width10" type="number" v-model="item.price" min="0"></el-input>
            </el-form-item>
            元运费
            <i class="plus el-icon-circle-plus" v-show="userSnIndex === index" @click="addStore('user_sn')"></i>
            <i class="remove el-icon-remove" v-show="userSnIndex !== index || index !== 0" @click="removeStore(item, 'user_sn')"></i>
          </div>
        </el-card>
        <!---yx-->
        <el-card class="inner-card" shadow="never">
          <div slot="header" class="clearfix">
            <span class="tit">网易严选商品运费:</span>
          </div>
          <div class="tip">网易严选商品运费规则:订单金额 < 88元，收取运费10元；订单金额 ≥ 88元， 免运费</div>
          <!--eslint-disable-->
          <div
            class="item-wrapper"
            v-for="(item, index) in form.user_yx">
            用户运费在
            <el-form-item
              :prop="'user_yx.'+index+'.min'"
              :rules="{
                required: true, message: '不能为空', trigger: 'blur'
              }">
              <el-input class="width10" type="number" v-model="item.min" min="0"></el-input>
            </el-form-item>
            元（包含）至
            <el-form-item 
              :prop="'user_yx.'+index+'.max'"
              :rules="{
                required: true, message: '不能为空', trigger: 'blur'
              }">
              <el-input class="width10" type="number" v-model="item.max" min="0"></el-input>
            </el-form-item>
            元（不含），收取
            <el-form-item
              :prop="'user_yx.'+index+'.price'"
              :rules="{
                required: true, message: '不能为空', trigger: 'blur'
              }">
              <el-input class="width10" type="number" v-model="item.price" min="0"></el-input>
            </el-form-item>
            元运费
            <i class="plus el-icon-circle-plus" v-show="userYxIndex === index" @click="addStore('user_yx')"></i>
            <i class="remove el-icon-remove" v-show="userYxIndex !== index || index !== 0" @click="removeStore(item, 'user_yx')"></i>
          </div>
        </el-card>
        <!---self-->
        <el-card class="inner-card" shadow="never">
          <div slot="header" class="clearfix">
            <span class="tit">自有商品运费:</span>
          </div>
          <div class="tip">自有商品包含服务商手动上传的商品和服务商自有供应商上传的商品</div>
          <!--eslint-disable-->
          <div
            class="item-wrapper"
            v-for="(item, index) in form.user_self">
            用户运费在
            <el-form-item
              :prop="'user_self.'+index+'.min'"
              :rules="{
                required: true, message: '不能为空', trigger: 'blur'
              }">
              <el-input class="width10" type="number" v-model="item.min" min="0"></el-input>
            </el-form-item>
            元（包含）至
            <el-form-item 
              :prop="'user_self.'+index+'.max'"
              :rules="{
                required: true, message: '不能为空', trigger: 'blur'
              }">
              <el-input class="width10" type="number" v-model="item.max" min="0"></el-input>
            </el-form-item>
            元（不含），收取
            <el-form-item
              :prop="'user_self.'+index+'.price'"
              :rules="{
                required: true, message: '不能为空', trigger: 'blur'
              }">
              <el-input class="width10" type="number" v-model="item.price" min="0"></el-input>
            </el-form-item>
            元运费
            <i class="plus el-icon-circle-plus" v-show="userSelfIndex === index" @click="addStore('user_self')"></i>
            <i class="remove el-icon-remove" v-show="userSelfIndex !== index || index !== 0" @click="removeStore(item, 'user_self')"></i>
          </div>
        </el-card>
      </el-card>

      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span class="tit">开通积分抵扣运费功能:</span>
          <el-checkbox class="checkbox" v-model="checkbox"></el-checkbox>
        </div>
        <div class="tip">开通后，用户可使用积分来抵扣运费，运费积分值按照积分商城汇率计算</div>
      </el-card>

      <div style="text-align: center; margin: 40px 0;">
        <el-button type="primary" @click="submitForm('form')" :loading="loading">保 存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { freightPartEdit } from '@/api/mallapp/setting/freight'

export default {
  props: {
    data: {
      type: Object,
      defualt: () => {}
    }
  },
  data () {
    return {
      checkbox: false,
      form: {
        store_jd: [
          { min: '', max: '', price: '' }
        ],
        store_sn: [
          { min: '', max: '', price: '' }
        ],
        store_yx: [
          { min: '', max: '', price: '' }
        ],
        store_self: [
          { min: '', max: '', price: '' }
        ],
        user_jd: [
          { min: '', max: '', price: '' }
        ],
        user_sn: [
          { min: '', max: '', price: '' }
        ],
        user_yx: [
          { min: '', max: '', price: '' }
        ],
        user_self: [
          { min: '', max: '', price: '' }
        ],
        is_integral_freight: '2'
      },
      loading: false
    }
  },
  created () {
    this.initForm()
  },
  computed: {
    sotreJdIndex () {
      let index = this.form.store_jd.length - 1
      return index
    },
    sotreSnIndex () {
      let index = this.form.store_sn.length - 1
      return index
    },
    sotreYxIndex () {
      let index = this.form.store_yx.length - 1
      return index
    },
    sotreSelfIndex () {
      let index = this.form.store_self.length - 1
      return index
    },
    userJdIndex () {
      let index = this.form.user_jd.length - 1
      return index
    },
    userSnIndex () {
      let index = this.form.user_sn.length - 1
      return index
    },
    userYxIndex () {
      let index = this.form.user_yx.length - 1
      return index
    },
    userSelfIndex () {
      let index = this.form.user_self.length - 1
      return index
    }
  },
  methods: {
    addStore (name) {
      this.form[name].push({ min: '', max: '', price: '' })
    },
    removeStore (item, name) {
      let index = this.form[name].indexOf(item)
      if (index !== -1) {
        this.form[name].splice(index, 1)
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._freightPartEdit()
        } else {
          return false
        }
      })
    },
    initForm () {
      let form = {}
      form.store_jd = this.data.store_jd
      form.store_sn = this.data.store_sn
      form.store_yx = this.data.store_yx
      form.store_self = this.data.store_self
      form.user_jd = this.data.user_jd
      form.user_sn = this.data.user_sn
      form.user_yx = this.data.user_yx
      form.user_self = this.data.user_self
      form.is_integral_freight = this.data.is_integral_freight
      this.form = Object.assign({}, form)
      this.checkbox = this.form.is_integral_freight === '1'
    },
    _freightPartEdit () {
      // this.loading = true
      freightPartEdit(this.form).then(() => {
        this.loading = false
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.$emit('refresh')
      })
    }
  },
  watch: {
    checkbox (val) {
      if (val) {
        this.form.is_integral_freight = '1'
      } else {
        this.form.is_integral_freight = '2'
      }
    },
    data () {
      this.initForm()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/variable.scss';
  .box-card {
    margin-bottom: 20px;
  }
  .inner-card {
    margin-bottom: 10px;
  }
  .width10 {
    width: 100px;
  }
  .tit {
    color: $themeColor;
    font-size: 14px;
  }
  .explain {
    padding: 12px;
    margin-bottom: 20px;
    font-size: 14px;
    background: #f5f7fa;
  }
  .tip {
    margin-bottom: 20px;
    font-size: 14px;
    color: #999;
  }
  .checkbox {
    margin-left: 20px;
  }
  .item-wrapper {
    line-height: 32px;
    font-size: 14px;
  }
  .plus, .remove {
    padding: 8px;
    font-size: 16px;
    color: $themeColor;
    margin-left: 5px;
    cursor: pointer;
  }
  </style>
