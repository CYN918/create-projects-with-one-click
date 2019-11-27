<template>
  <div class="margin">
    <div class="mcard mbottom">
      <div class="steps">
        <el-steps :active="active">
          <el-step title="选择商城模板" description="在模板基础上，调整轮播图、商品等元素，更方便"></el-step>
          <el-step title="填写基本信息" description="信息内容关系到商城的整体方向等，请仔细填写"></el-step>
          <el-step title="商城搭建完成" description="基础部分完成，建议按照指引，完成更多设置"></el-step>
        </el-steps>
      </div>
    </div>
    <div class="mcard" v-if="active===1">
      <div class="group">
        <el-radio-group v-model="type">
          <el-radio-button label="1">新的模板</el-radio-button>
          <el-radio-button label="2">自有模板</el-radio-button>
          <el-radio-button label="3">推荐模板</el-radio-button>
        </el-radio-group>
      </div>
      <div>
        <el-alert
          title="模板说明："
          type="warning"
          :closable="false"
          description="自定义运营模板是指选择该模板创建后，需要由您自行运营，包含商城的商品更新、改价、界面图片更新等；
     创建完成后，不可更改类型。"
        ></el-alert>
      </div>
      <div class="list-wrapper">
        <ul class="clearfix">
          <li class="item" v-for="(item, index) in list" :key="index">
            <div class="item-imgwrapper" @mouseover="overQRCode(item.store_url, index)">
              <img :src="item.pic" :alt="item.name">
              <div class="layer-wrap">
                <div class="qrcode">
                  <div class="canvas">
                    <canvas height="100" width="100" :id="`canvas${index}`"></canvas>
                  </div>
                  <p>扫一扫看模板</p>
                </div>
                <a class="preview-btn" :href="item.store_url" target="_bank">网页查看模板</a>
              </div>
            </div>
            <div class="item-info">
              <p class="info-title">{{item.name}}</p>
              <p class="info-body">{{item.introduction}}</p>
              <p class="preview-product">预设商品{{item.pronum}}款</p>
              <p class="product-rate">产品综合利润：{{item.profit}}</p>
              <div class="btn-wrap">
                <el-button
                  size="small"
                  type="primary"
                  plain
                  @click="lookProduct(item.store_id)"
                >查看商品</el-button>
                <el-button size="small" type="primary" @click="btnSelect(item.store_style_id)">选择模板</el-button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="mcard" v-if="active===2">
      <p class="title">基本信息</p>
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        size="medium"
        class="form"
        label-width="250px"
      >
        <el-form-item prop="store_name" label="商城名称：">
          <el-input v-model="form.store_name" placeholder="例如:招商银行积分兑换平台"></el-input>
        </el-form-item>
        <el-form-item prop="login_type" label="登录方式：">
          <el-radio-group v-model="form.login_type">
            <el-radio label="1">手机+密码</el-radio>
            <el-radio label="2">手机号+验证码</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系地址：" prop="province_id">
          <address-select :data="initAddress" @selectAddress="selectAddress"></address-select>
        </el-form-item>
        <el-form-item label="货币单位：" prop="currency_str">
          <el-input class="width40" v-model="form.currency_str"></el-input>
        </el-form-item>
        <el-form-item label="积分汇率：" prop="exchange_rate">
          <el-input class="width40" v-model="form.exchange_rate" type="number">
            <template slot="append">积分=1元</template>
          </el-input>
          <p class="tip">积分商城创建成功后，汇率不可修改，请谨慎填写。</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')" :loading="loading">提 交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mcard create-wrapper" v-show="active===3">
      <div class="setting-wrap">
        <div class="store-info-wrap">
          <p>
            <i class="el-icon-success"></i>
          </p>
          <p class="titl">"{{createStore.store_name}}"基础设置完成</p>
          <p class="store-guide">建议按照指引完成更多设置</p>
          <div class="qrcode">
            <canvas id="storeCanvas"></canvas>
          </div>
          <p class="scan">扫一扫查看商城效果</p>
          <el-button type="primary" size="medium" @click="toManagerIndex">进入管理首页</el-button>
        </div>
        <div class="setting-index">
          <h4>商城设置指引</h4>
          <div class="setting-item-wrap">
            <a href target="_bank" class="setting-item">
              <div class="setting-icon-wrap doods-shelves"></div>
              <div class="setting-info">
                <p>商品上架</p>
                <p>挑选商品至商城商品库，即可上架至商城</p>
              </div>
            </a>
            <a href target="_bank" class="setting-item">
              <div class="setting-icon-wrap mall-construction"></div>
              <div class="setting-info">
                <p>商城建设</p>
                <p>商城装修，商品上架等，还提供各种营销插件的使用</p>
              </div>
            </a>
            <a href target="_bank" class="setting-item">
              <div class="setting-icon-wrap freight-setting"></div>
              <div class="setting-info">
                <p>运费设置</p>
                <p>商城装修，商品上架等，还提供各种营销插件的使用</p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="exhibition">
        <div class="phone-wrap">
          <div class="wx-title">{{createStore.store_name}}</div>
          <iframe :src="createStore.store_url"></iframe>
        </div>
      </div>
    </div>
    <!--product-->
    <el-dialog title="预设商品" :visible.sync="dialogVisible" width="1100px">
      <product :storeId="storeId"></product>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" type="primary" plain>关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getStoreStyle, createStore } from '@/api/apply/index'
import QRCode from 'qrcode'
import AddressSelect from '@/components/addressSelection/index'
import Product from './product'

export default {
  name: 'ApplyCreate',
  data () {
    return {
      type: '1', // 类型：1.新的模板 2.自有模板 3.推荐模板
      active: 1,
      storeId: null,
      storeStyleId: null, // 已选择模板商城id
      list: [
        // {
        //   introduction: '同步', // 描述
        //   name: '积分商城', // 模板名称
        //   pic: '', // 图片url
        //   profit: 1, // 利润
        //   pronum: '5982', // 商品总数
        //   store_id: '', // 站点id
        //   store_style_id: '1001431', // 模板商城id
        //   store_url: '' // 模板商城网址
        // }
      ],
      form: {
        store_name: '', // 商城名称
        login_type: '1', // 登录方式： 1.手机号+密码 2.手机号+验证码
        currency_str: '', // 货币单位
        exchange_rate: null, // 积分汇率
        province_id: '', // 省
        city_id: '', // 市
        area_id: '', // 区
        street_id: '', // 街道
        province_name: '', // 省名称
        city_name: '', // 市名称
        area_name: '', // 区名称
        street_name: '' // 街道名称
      },
      rules: {
        store_name: [{ required: true, message: '请输入商城名称', trigger: 'blur' }],
        login_type: [{ required: true, message: '请选择登录方式', trigger: 'blur' }],
        province_id: [{ required: true, message: '请选择地址', trigger: 'blur' }],
        currency_str: [
          { required: true, message: '请输入货币单位', trigger: 'blur' }
        ],
        exchange_rate: [
          { required: true, message: '请输入积分汇率', trigger: 'blur' }
        ]
      },
      initAddress: {
        province_id: '', // 省
        city_id: '', // 市
        area_id: '', // 区
        street_id: '' // 街道
      },
      loading: false,
      createStore: {},
      dialogVisible: false
    }
  },
  created () {
    this._getStoreStyle()
  },
  methods: {
    overQRCode (url, index) {
      let canvas = document.getElementById(`canvas${index}`)
      QRCode.toCanvas(canvas, url, { width: 100 }, function (error) {
        if (error) console.error(error)
      })
    },
    lookProduct (id) {
      this.storeId = id
      this.dialogVisible = true
    },
    btnSelect (id) {
      this.active = 2
      this.storeStyleId = id
    },
    selectAddress (val) {
      this.form.province_id = val.province_id
      this.form.city_id = val.city_id
      this.form.area_id = val.area_id
      this.form.street_id = val.street_id
      this.form.province_name = val.province_name
      this.form.city_name = val.city_name
      this.form.area_name = val.area_name
      this.form.street_name = val.street_name
    },
    submitForm (formName) {
      this.$refs.form.validateField('province_id')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._createStore()
        } else {
          return false
        }
      })
    },
    toManagerIndex () {
      window.open(this.createStore.manage_url, '_blank')
    },
    _getStoreStyle () {
      let data = {}
      data.store_style_id = '1'
      data.type = this.type
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getStoreStyle(data).then(res => {
        loading.close()
        this.list = res.data
      })
    },
    _createStore () {
      // this.loading = true

      let data = Object.assign({}, this.form)
      data.type = this.type
      createStore(data).then(res => {
        this.loading = false
        this.active = 3
        this.createStore = res.data

        this.$nextTick(() => {
          let canvas = document.getElementById('storeCanvas')
          QRCode.toCanvas(canvas, this.createStore.store_url, { width: 120 }, function (error) {
            if (error) console.error(error)
          })
        })
      })
    }
  },
  watch: {
    type () {
      this._getStoreStyle()
    }
  },
  components: {
    AddressSelect,
    Product
  }
}
</script>

<style lang='scss' scoped>
@import "@/common/scss/variable.scss";
.steps {
  margin: 0 40px;
}
.group {
  margin-bottom: 20px;
  text-align: center;
}
.list-wrapper {
  margin: 20px 0;
  .item {
    width: 400px;
    height: 360px;
    border: 1px solid #dddee1;
    border-color: #d9d9d9;
    transition: all 0.2s ease-in-out;
    background-color: #fff;
    padding: 10px;
    display: inline-flex;
    margin: 0 30px 20px 0;
    .item-imgwrapper {
      position: relative;
      width: 200px;
      height: 340px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:hover .layer-wrap {
        opacity: 1;
        visibility: visible;
      }
      img {
        width: 100%;
        height: 100%;
        transition: all 0.3s ease-in-out;
      }
      &:hover > img {
        transform: scale(1.1);
      }
      .layer-wrap {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        color: #fff;
        opacity: 0;
        transition: all 0.2s ease-in-out;
        visibility: hidden;
        text-align: center;
        .qrcode {
          margin-top: 36px;
          .canvas {
            width: 100px;
            height: 100px;
            display: block;
            margin: 0 auto;
            canvas {
              width: 100%;
              height: 100%;
            }
          }
          p {
            font-size: 12px;
            margin-top: 6px;
            line-height: 1em;
          }
        }
      }
      .preview-btn {
        display: inline-block;
        width: 100px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        background-color: #fff;
        border-radius: 2px;
        font-size: 12px;
        position: absolute;
        bottom: 36px;
        left: 50%;
        margin-left: -50px;
        color: #3c3c3c;
      }
    }
    .item-info {
      margin-left: 10px;
      width: 168px;
      position: relative;
      font-size: 14px;
      .info-title {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 4px;
      }
      .info-body {
        font-size: 12px;
        word-break: break-all;
      }
      .preview-product {
        font-weight: 600;
        margin-top: 20px;
        line-height: 1em;
      }
      .product-rate {
        font-weight: 600;
        margin-top: 6px;
        line-height: 1em;
      }
    }
    .btn-wrap {
      position: absolute;
      bottom: 0;
      text-align: center;
      .el-button {
        width: 168px;
        margin: 5px 0;
      }
    }
  }
}
.form {
  width: 790px;
}
.create-wrapper {
  display: flex;
  justify-content: center;
  .setting-wrap {
    width: 730px;
    .store-info-wrap {
      text-align: center;
      .el-icon-success {
        margin-bottom: 16px;
        font-size: 32px;
        color: $themeColor;
      }
      .titl {
        margin-bottom: 10px;
        font-weight: 700;
        font-size: 20px;
        color: $themeColor;
      }
      .store-guide {
        color: #a6a6a6;
        font-size: 16px;
        margin-bottom: 16px;
      }
      .qrcode {
        width: 120px;
        height: 120px;
        margin: 0 auto 5px;
      }
      .store-guide {
        color: #a6a6a6;
        font-size: 16px;
        margin-bottom: 16px;
      }
      .scan {
        color: #3c3c3c;
        font-size: 16px;
        margin-bottom: 20px;
      }
      .el-button {
        margin-bottom: 20px;
      }
    }
    .setting-index {
      height: 280px;
      background-color: #e9f4ff;
      border: solid 2px #d7e0f1;
      padding: 0 32px 20px 32px;
      h4 {
        color: #3c3c3c;
        font-weight: 700;
        font-size: 20px;
        line-height: 76px;
        text-align: center;
        margin: 0;
      }
      .setting-item-wrap {
        display: flex;
        justify-content: space-between;
        .setting-item {
          width: 180px;
          height: 180px;
          border: solid 1px #d9d9d9;
          background-color: #fff;
          padding: 0 8px 0 8px;
          position: relative;
          .setting-icon-wrap {
            position: absolute;
            top: 24px;
            display: flex;
            justify-content: center;
            width: 164px;
            height: 64px;
            transition: all 0.3s ease-in-out;
          }
          .doods-shelves {
            background: url("../../common/images/apply/doods-shelves-default.png")
              no-repeat center;
            background-size: 48px 64px;
          }
          .mall-construction {
            background: url("../../common/images/apply/mall-construction-default.png")
              no-repeat center;
            background-size: 48px 64px;
          }
          .freight-setting {
            background: url("../../common/images/apply/freight-setting-default.png")
              no-repeat center;
            background-size: 48px 64px;
          }
          .setting-info {
            position: absolute;
            bottom: 8px;
            width: 164px;
            text-align: center;
            p {
              margin-bottom: 0;
              font-size: 12px;
              color: #a6a6a6;
            }
            p:first-child {
              color: #3c3c3c;
              font-weight: 600;
              font-size: 16px;
            }
          }
        }
      }
    }
  }
  .exhibition {
    height: 636px;
    width: 325px;
    background: url("../../common/images/apply/phone-wrap.png");
    margin-left: 100px;
    padding: 65px 20px 0 20px;
    .phone-wrap {
      background-color: #fff;
      height: 508px;
    }
    .wx-title {
      color: #fff;
      text-align: center;
      height: 49px;
      background: url("../../common/images/apply/wx-title.png") no-repeat center;
      background-size: 100% 100%;
      padding-top: 23px;
    }
    iframe {
      width: 100%;
      height: 459px;
      border: none;
    }
  }
}
</style>
