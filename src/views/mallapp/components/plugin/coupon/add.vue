<template>
  <div class="margin">
    <div class="steps">
      <el-steps :space="200" :active="0" finish-status="success" align-center class="steps-wrapper">
        <el-step title="创建优惠券"></el-step>
        <el-step title="设置发放规则"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
    <div class="mcard">
      <div class="wrapper clearfix">
        <div class="left-wrapper">
          <div class="ph-nav" :style="{backgroundImage: `url(${navImage})`}"></div>
          <div class="ph-header" :style="{backgroundImage: `url(${hdImage})`}">
            <div class="ph-header-wrapper">
              <div class="flex">
                <div class="coupon-title">{{form.title}}</div>
                <div
                  class="coupon-info"
                >{{form.coupon_type == '1' ? `${form.discount}折` : form.ccurrency_type == '1' ? `${form.reduce_int}积分` : `${form.reduce_cash}现金`}}</div>
              </div>
              <div class="flex" style="margin-top: 10px;">
                <div class="coupon-time">
                  <div style="height: 18px;"></div>
                  <div
                    style="line-height: 1em; margin-top: 5px;"
                  >使用时间: {{form.start_time}} 至 {{form.end_time}}</div>
                </div>
                <div class="go-use">立即使用</div>
              </div>
            </div>
          </div>
          <div class="ph-instruct">
            <div class="instruct-head">使用说明</div>
            <div class="instruct-content">请在有效期内使用，购买商品时即可直接选择优惠券进行抵扣。</div>
          </div>
          <div class="ph-product">
            <div class="product-head">适用商品</div>
            <div class="product-list">
              <div class="product-item all" v-if="form.product_type=='1'">全部商品</div>
              <div v-if="form.product_type=='2'">
                <div class="product-item" v-for="good in selectList" :key="good.sku">
                  <img :src="good.image_url" alt width="60" height="60">
                  <div class="item-info">
                    <p class="item-name">{{good.name}}</p>
                    <p class="item-price">{{good.sales_price}}积分</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-wrapper">
          <el-form :model="form" :rules="rules" class="form" ref="form" label-width="130px">
            <el-card class="box-card mbottom">
              <div class="title">基本信息</div>
              <el-form-item prop="title" label="优惠券标题">
                <el-input v-model="form.title" placeholder="长度不超过9个汉字或18个英文字母"></el-input>
              </el-form-item>
              <el-row>
                <el-form-item prop="start_time" label="有效期">
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      value-format="yyyy-MM-dd"
                      v-model="form.start_time"
                      placeholder="有效期开始"
                    ></el-date-picker>
                  </el-col>
                  <el-col :span="2" class="line">-</el-col>
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      value-format="yyyy-MM-dd"
                      v-model="form.end_time"
                      placeholder="有效期结束"
                    ></el-date-picker>
                  </el-col>
                </el-form-item>
              </el-row>
              <el-form-item label="使用须知">
                <el-input type="textarea" v-model="form.instruct" :rows="3"></el-input>
              </el-form-item>
              <el-form-item prop="link_type" label="跳转链接">
                <div>
                  <el-radio v-model="form.link_type" label="1">跳转至首页</el-radio>
                  <el-radio v-model="form.link_type" label="2">自定义链接</el-radio>
                </div>
                <p class="tip">您可设置用户领取优惠券后，提示跳转商城首页或自定义链接</p>
              </el-form-item>
              <el-form-item v-if="form.link_type === '2'" prop="link_value">
                <el-input v-model="form.link_value" placeholder="如：https://jifen.boshiying.com"></el-input>
              </el-form-item>
            </el-card>
            <el-card class="box-card mbottom">
              <div class="title">优惠券内容</div>
              <el-form-item prop="coupon_type" label="优惠券类型">
                <el-radio v-model="form.coupon_type" label="1">折扣券</el-radio>
                <el-radio v-model="form.coupon_type" label="2">满减券</el-radio>
              </el-form-item>
              <el-form-item v-if="form.coupon_type == '1'" prop="discount" label="折扣">
                <el-input v-model="form.discount" placeholder="请填写0～9.9之间的数字，精确到小数点后1位">
                  <template slot="append">折</template>
                </el-input>
              </el-form-item>
              <el-form-item v-if="form.coupon_type == '2'" prop="ccurrency_type" label="优惠货币">
                <el-radio v-model="form.ccurrency_type" label="1">积分减免</el-radio>
                <el-radio v-model="form.ccurrency_type" label="2">现金减免</el-radio>
              </el-form-item>
              <el-form-item
                v-if="form.coupon_type == '2' && form.ccurrency_type == '1'"
                label="满减积分"
                required
              >
                <el-row>
                  <el-col :span="1">满</el-col>
                  <el-col :span="5">
                    <el-form-item prop="full_int">
                      <el-input type="number" v-model="form.full_int" :min="0"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">&nbsp;积分</el-col>
                  <el-col :span="1">减</el-col>
                  <el-col :span="5">
                    <el-form-item prop="full_int">
                      <el-input type="number" v-model="form.reduce_int" :min="0"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">&nbsp;积分</el-col>
                </el-row>
              </el-form-item>
              <el-form-item
                v-if="form.coupon_type == '2' && form.ccurrency_type == '2'"
                prop="ccurrency_type"
                label="满减现金"
              >
                <el-row>
                  <el-col :span="1">满</el-col>
                  <el-col :span="5">
                    <el-form-item prop="full_cash">
                      <el-input type="number" v-model="form.full_cash" :min="0"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">&nbsp;现金</el-col>
                  <el-col :span="1">减</el-col>
                  <el-col :span="5">
                    <el-form-item prop="reduce_cash">
                      <el-input type="number" v-model="form.reduce_cash" :min="0"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">&nbsp;现金</el-col>
                </el-row>
              </el-form-item>
            </el-card>
            <el-card class="box-card mbottom">
              <div class="title">适用范围</div>
              <el-form-item>
                <el-radio v-model="form.product_type" label="1">全场商品通用</el-radio>
                <el-radio v-model="form.product_type" label="2">部分商品可用</el-radio>
              </el-form-item>
              <div class="selects-list" v-if="form.product_type == '2'">
                <div class="selects-top">
                  <span>已选择商品，共{{selectList.length}}件</span>
                  <el-button type="text" @click="showSelectGoods">去选择商品</el-button>
                </div>
                <el-table :data="selectList" class="list-table">
                  <el-table-column label="商品图片" width="90">
                    <template slot-scope="scope">
                      <img :src="scope.row.image_url" width="50" height="50">
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="商品名称"></el-table-column>
                  <el-table-column label="销售价">
                    <template slot-scope="scope">
                      <p>{{scope.row.sales_price}}积分</p>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="50" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" @click="deleteSelet(scope.row)">移除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <el-button class="submit" type="primary" size="medium" @click="submitForm('form')">保存</el-button>
            </el-card>
          </el-form>
        </div>
      </div>
    </div>
    <!--商品选择弹窗-->
    <el-dialog :visible.sync="dialogVisible" width="1250px">
      <select-goods @cancle="handleCancle" @selectGoods="handleSelectGoods"></select-goods>
    </el-dialog>
  </div>
</template>

<script>
import SelectGoods from '@/views/mallapp/components/common/goodsSelect'
import { addCoupon, getScoreCoupon } from '@/api/mallapp/plugin/coupon'

export default {
  name: 'CouponAdd',
  created () {
    this.id = this.$route.query.id
    if (this.id) {
      this._getScoreCoupon()
    }
  },
  data () {
    let checkTitle = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入优惠券名称'))
      }
      let len = value.length
      // eslint-disable-next-line no-control-regex
      var cnChar = value.match(/[^\x00-\x80]/g)
      if (cnChar != null) {
        len += cnChar.length
      }
      if (len > 18) {
        return callback(new Error('长度不超过9个汉字或18个英文字母'))
      }
      callback()
    }
    let checkFullInt = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入积分'))
      }
      if (!/^[1-9][0-9]*$/.test(value)) {
        return callback(new Error('积分需为1以上整数'))
      }
      callback()
    }
    let checkCash = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入现金'))
      }
      if (!/^((?:-?0)|(?:-?[1-9]\d*))(?:\.\d{1,2})?$/.test(value)) {
        return callback(new Error('现金需为两位小数的正数'))
      }
      callback()
    }
    let checkDiscount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入折扣'))
      }
      if (!/^(\d(\.\d)?|10)$/.test(value)) {
        return callback(new Error('请输入0-10的正确的折扣'))
      }
      callback()
    }
    return {
      navImage: require('@/common/images/mall/wxTitle.png'),
      hdImage: require('@/common/images/mall/Group.png'),
      form: {
        title: '', // 优惠券标题
        start_time: '', // 开始时间
        end_time: '', // 结束时间
        instruct: '请在有效期内使用，购买商品时即可直接选择优惠券进行抵扣。', // 使用须知
        link_type: '1', // 跳转链接类型： ‘1’跳转至首页， ‘2’ 自定义链接
        link_value: '', // 跳转链接地址
        coupon_type: '1', // 优惠券类型 '1'为折扣券 '2'为满减券
        ccurrency_type: '2', // 优惠货币类型 1为积分减免 2为现金减免
        discount: '', // // 折扣数 0-9.9折 强制一位小数
        full_int: '', // 满多少送积分
        reduce_int: '', // 满送 多少积分
        full_cash: '', // 满多少送现金
        reduce_cash: '', // 满送 多少元
        product_type: '1' // 适用商品类型 '1'为全部商品通用 ‘2’为部分商品可用
      },
      rules: {
        title: [{ required: true, validator: checkTitle, trigger: 'blur' }],
        start_time: [{ required: true, message: '请输入开始时间', trigger: 'blur' }],
        end_time: [{ required: true, message: 'reduce_cash结束时间', trigger: 'blur' }],
        link_type: [{ required: true, message: '请选择跳转方式', trigger: blur }],
        link_value: [{ required: true, message: '请输入跳转网址', trigger: 'blur' }],
        coupon_type: [{ required: true, message: '请选择优惠券类型', trigger: 'blur' }],
        ccurrency_type: [{ required: true, message: '请选择优惠券类型', trigger: 'blur' }],
        discount: [{ required: true, validator: checkDiscount, trigger: 'blur' }],
        full_int: [{ required: true, validator: checkFullInt, trigger: 'blur' }],
        reduce_int: [{ required: true, validator: checkFullInt, trigger: 'blur' }],
        full_cash: [{ required: true, validator: checkCash, trigger: 'blur' }],
        reduce_cash: [{ required: true, validator: checkCash, trigger: 'blur' }]

      },
      selectList: [],
      dialogVisible: false,
      repetition: 0
    }
  },
  methods: {
    showSelectGoods () {
      this.dialogVisible = true
    },
    handleCancle () {
      this.dialogVisible = false
    },
    handleSelectGoods (goods) {
      this.repetition = 0
      let ret = []
      if (this.selectList) {
        goods.map(good => {
          // 查找是否重复
          let index = this.selectList.findIndex(item => {
            return item.sku === good.sku
          })
          // 如果无重复，添加
          if (index === -1) {
            ret.push(good)
          } else {
            this.repetition = this.repetition + 1
          }
        })
      } else {
        ret = goods
      }
      let arr = this.selectList.concat(ret)
      this.selectList = arr.slice()
      this.dialogVisible = false
      this.$message({
        message: `挑选成功，有${this.repetition}件商品重复，成功挑选${goods.length - this.repetition}件商品`,
        type: 'success'
      })
    },
    deleteSelet (good) {
      let index = this.selectList.findIndex(item => {
        return item.sku === good.sku
      })
      if (index > -1) {
        this.selectList.splice(index, 1)
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._addCoupon()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    _addCoupon () {
      let form = Object.assign({}, this.form)
      let ret = []
      this.selectList.map(good => {
        ret.push(good.sku)
      })
      form.goods = ret.join(',')
      if (this.id) {
        form.id = this.id
      }
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })

      addCoupon(form).then(res => {
        loading.close()
        if (this.id) {
          this.$router.push({ path: '/mplugin/coupon' }) // 编辑跳转到coupon页面
        } else {
          this.$router.push({ path: '/mplugin/set_coupon', query: res.data }) // 新增跳转到setCoupon页面
        }
      })
    },
    _getScoreCoupon () {
      getScoreCoupon(this.id).then(res => {
        let form = {}
        form.title = res.data.title || ''
        form.start_time = res.data.start_time || ''
        form.end_time = res.data.end_time || ''
        form.instruct = res.data.instruct || ''
        form.link_type = res.data.link_type || '1'
        form.link_value = res.data.link_value || ''
        form.coupon_type = res.data.coupon_type || '1'
        form.ccurrency_type = res.data.ccurrency_type || '1'
        form.discount = res.data.discount || ''
        form.full_int = res.data.full_int || ''
        form.reduce_int = res.data.reduce_int || ''
        form.full_cash = res.data.full_cash || ''
        form.reduce_cash = res.data.reduce_cash || ''
        form.product_type = res.data.product_type || '1'
        this.form = form
        this.selectList = res.data.goods || []
      })
    }
  },
  components: {
    SelectGoods
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
    }
    .ph-header {
      height: 195px;
      background-size: 100% 100%;
      overflow: hidden;
      .ph-header-wrapper {
        background-color: #fff;
        width: 335px;
        padding: 20px 20px 17px 20px;
        border-radius: 3px;
        margin: 75px auto 0 auto;
        .flex {
          display: flex;
          justify-content: space-between;
          .coupon-title {
            color: #3c3c3c;
            font-size: 18px;
            font-weight: 600;
          }
          .coupon-info {
            color: #d0021b;
            font-size: 18px;
            font-weight: 600;
          }
          .coupon-time {
            font-size: 12px;
            color: #a6a6a6;
            align-self: flex-end;
          }
          .go-use {
            width: 75px;
            height: 28px;
            border: 1px solid #c61a2a;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #c61a2a;
            font-size: 14px;
            cursor: pointer;
            align-self: flex-end;
          }
        }
      }
    }
    .ph-instruct {
      .instruct-head {
        padding: 10px;
        color: #3c3c3c;
        font-size: 14px;
        background-color: #fff;
        border-bottom: 1px solid #f6f6f6;
        margin-top: 15px;
      }
      .instruct-content {
        background-color: #fff;
        padding: 10px;
        color: #a6a6a6;
        font-size: 14px;
        word-break: break-all;
      }
    }
    .ph-product {
      .product-head {
        padding: 10px;
        color: #3c3c3c;
        font-size: 14px;
        background-color: #fff;
        border-bottom: 1px solid #f6f6f6;
        margin-top: 15px;
      }
      .product-item {
        display: flex;
        padding: 15px;
        background-color: #fff;
        img {
          margin-right: 10px;
        }
        &.all {
          color: rgb(60, 60, 60);
          padding-left: 10px;
          justify-content: center;
        }
        .item-info {
          flex: 1;
          .item-name {
            color: #3c3c3c;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            word-break: break-all;
            margin-bottom: 10px;
          }
          .item-price {
            font-size: 12px;
            color: #d0021b;
          }
        }
      }
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
  }
}
</style>
