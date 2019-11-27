<template>
  <div class="margin">
    <div class="mcard">
      <div class="title">站点信息</div>
      <div class="mcard-content">
        <el-form :model="form" ref="form" :rules="rules" label-width="200px" class="form" size="small">
          <el-form-item label="商城名称：" prop="store_name">
            <el-input class="width40" v-model="form.store_name"></el-input>
          </el-form-item>
          <el-form-item label="站点网址：" prop="store_url">
            <el-input class="width40" v-model="form.store_url" disabled></el-input>
          </el-form-item>
          <el-form-item label="创建时间：" prop="create_time">
            <el-input class="width40" v-model="form.create_time" disabled></el-input>
          </el-form-item>
          <el-form-item label="登录方式：" prop="login_type">
            <el-radio-group v-model="form.login_type">
              <el-radio label="1">手机+密码</el-radio>
              <el-radio label="2">手机号+验证码</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="微信登录：" prop="is_open_wx_login">
            <el-radio-group v-model="form.is_open_wx_login">
              <el-radio label="1">开通</el-radio>
              <el-radio label="2">不开通</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="允许新用户注册：" prop="registered_required">
            <el-radio-group v-model="form.registered_required">
              <el-radio label="1">允许</el-radio>
              <el-radio label="2">不允许</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否开通售后功能：" prop="is_open_sales">
            <el-radio-group v-model="form.is_open_sales">
              <el-radio label="1">开通</el-radio>
              <el-radio label="2">不开通</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="客服电话：" prop="kf_phone">
            <el-input class="width40" v-model="form.kf_phone"></el-input>
          </el-form-item>
          <el-form-item label="默认地址：">
            <address-select @selectAddress="selectAddress"></address-select>
          </el-form-item>
          <el-form-item label="货币单位：" prop="currency_str">
            <el-input class="width40" v-model="form.currency_str"></el-input>
          </el-form-item>
          <el-form-item label="积分汇率：" prop="exchange_rate">
            <el-input class="width40" v-model="form.exchange_rate" disabled><template slot="append">积分=1元</template></el-input>
          </el-form-item>
          <el-form-item label="显示市场价：" prop="is_show_market_price">
            <el-radio-group v-model="form.is_show_market_price">
              <el-radio label="1">显示</el-radio>
              <el-radio label="2">不显示</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="京东商品显示兑换须知：" prop="is_show_buynotice_jd">
            <el-radio-group v-model="form.is_show_buynotice_jd">
              <el-radio label="1">显示</el-radio>
              <el-radio label="2">不显示</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="商城状态：" prop="is_show_buynotice_jd">
            <el-radio-group v-model="form.state">
              <el-radio label="1">上线</el-radio>
              <el-radio label="2">下线</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="tip">下线后，用户将无法访问该站点，您可以自定义设置用户打开此商城显示的内容</div>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')" :loading="loading">保存配置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import AddressSelect from '@/components/addressSelection/index'
import { getStoreInfo, editStoreInfo } from '@/api/mallapp/setting/store'

export default {
  name: 'MsettingStore',
  data () {
    return {
      form: {
        store_name: '', // 商城名称
        store_url: '', // 站点网址
        create_time: '', // 创建时间
        login_type: '1', // 登录方式 1.手机+密码, 2.手机号+验证码
        is_open_wx_login: '2', // 微信登录 1.开通, 2.不开通
        registered_required: '1', // 允许新用户注册 1.开通, 2.不开通
        is_open_sales: '1', // 是否开通售后功能 1.开通, 2.不开通
        kf_phone: '', // 客服电话
        currency_str: '', // 货币单位
        exchange_rate: '', // 积分汇率
        is_show_market_price: '2', // 显示市场价 1.显示, 2.不显示
        is_show_buynotice_jd: '2', // 京东商品显示兑换须知 1.显示, 2.不显示
        state: '', // 商城状态 1.上线, 2.下线
        province_id: '', // 地址 省
        city_id: '', // 地址 市
        area_id: '', // 地址 区
        street_id: '' // 地址 街道
      },
      rules: {
        store_name: [
          { required: true, message: '请输入商城名称', trigger: 'blur' }
        ],
        login_type: [
          { required: true, message: '请选择登录方式', trigger: 'blur' }
        ],
        is_open_wx_login: [
          { required: true, message: '是否开通微信登录', trigger: 'blur' }
        ],
        registered_required: [
          { required: true, message: '是否允许新用户注册', trigger: 'blur' }
        ],
        is_open_sales: [
          { required: true, message: '是否开通售后功能', trigger: 'blur' }
        ],
        kf_phone: [
          { required: true, message: '请输入客服电话', trigger: 'blur' }
        ],
        currency_str: [
          { required: true, message: '请输入货币单位', trigger: 'blur' }
        ],
        is_show_market_price: [
          { required: true, message: '是否显示市场价', trigger: 'blur' }
        ],
        is_show_buynotice_jd: [
          { required: true, message: '是否显示京东商品显示兑换须知', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择商城状态', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  created () {
    this._getStoreInfo()
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._editStoreInfo()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    selectAddress (val) {
      this.form.province_id = val.province_id
      this.form.city_id = val.city_id
      this.form.area_id = val.area_id
      this.form.street_id = val.street_id
    },
    _getStoreInfo () {
      // let loading = this.$loading({
      //   background: 'rgba(255,255,255,0.1)',
      //   text: '加载中，请稍后...'
      // })
      getStoreInfo().then(res => {
        loading.close()
        this.form = res.data
      })
    },
    _editStoreInfo () {
      let data = {}
      data.store_name = this.form.store_name
      data.login_type = this.form.login_type
      data.is_open_wx_login = this.form.is_open_wx_login
      data.registered_required = this.form.registered_required
      data.is_open_sales = this.form.is_open_sales
      data.kf_phone = this.form.kf_phone
      data.currency_str = this.form.currency_str
      data.is_show_market_price = this.form.is_show_market_price
      data.is_show_buynotice_jd = this.form.is_show_buynotice_jd
      data.state = this.form.state
      data.province_id = this.form.province_id
      data.city_id = this.form.city_id
      data.area_id = this.form.area_id
      data.street_id = this.form.street_id

      this.loading = true
      editStoreInfo(data).then(() => {
        this.loading = false
        this.$message({
          message: '站点信息配置成功',
          type: 'success'
        })
        this._getStoreInfo()
      })
    }
  },
  components: {
    AddressSelect
  }
}
</script>

<style lang="scss" scoped>
.mcard {
  margin-bottom: 80px;
}
.form {
  width: 900px;
  margin-left: 50px;
  .width40 {
    width: 400px;
  }
  .tip {
    margin-left: 200px;
    margin-bottom: 30px;
    line-height: 32px;
    font-size: 14px;
    color: #606266;
  }
}
</style>
