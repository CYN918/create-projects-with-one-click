<template>
  <div class="margin mcard">
    <div class="title">退货地址设置</div>
    <el-form :model="form" :rules="rules" ref="form" label-width="250px" class="address-wrapper">
      <el-form-item label="收货人：" prop="person">
        <el-input type="text" placeholder="请填写收货人姓名" v-model="form.person"></el-input>
      </el-form-item>
      <el-form-item label="联系电话：" required>
        <el-col :span="4">
          <el-form-item>
            <el-input type="text" placeholder="区号" v-model="form.telephone_area"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="18">
          <el-form-item prop="telephone">
            <el-input type="text" placeholder="请填写座机号或手机号" v-model="form.telephone"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="联系地址：" prop="province_id">
        <address-select :data="initAddress" @selectAddress="selectAddress"></address-select>
      </el-form-item>
      <el-form-item label="详细地址：" prop="address_desc">
        <el-input v-model="form.address_desc" placeholder="请填写详细地址(120个字符以内)" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')" :loading="loading">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import AddressSelect from '@/components/addressSelection/index'
import { editAddress, getAddress } from '@/api/setting/index'

export default {
  name: 'AddressSetting',
  data () {
    return {
      form: {
        person: '', // 收货人姓名
        telephone_area: '', // 区号
        telephone: '', // 座机号或手机号
        province_id: '', // 省
        city_id: '', // 市
        area_id: '', // 区
        street_id: '', // 街道
        address_desc: '' // 详细地址
      },
      initAddress: {
        province_id: '', // 省
        city_id: '', // 市
        area_id: '', // 区
        street_id: '' // 街道
      },
      rules: {
        person: [
          { required: true, message: '请填写收货人姓名', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请填写座机号或手机号', trigger: 'blur' }
        ],
        province_id: [
          { required: true, message: '请选择地址', trigger: 'change' }
        ],
        address_desc: [
          { required: true, message: '请填写详细地址', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  created () {
    // this._getAddress()
  },
  methods: {
    selectAddress (val) {
      this.form.province_id = val.province_id
      this.form.city_id = val.city_id
      this.form.area_id = val.area_id
      this.form.street_id = val.street_id
    },
    submitForm (formName) {
      this.$refs.form.validateField('province_id')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._editAddress()
        } else {
          return false
        }
      })
    },
    _editAddress () {
      this.loading = true
      editAddress(this.form).then(() => {
        this.loading = false
        this._getAddress()
      })
    },
    _getAddress () {
      // let loading = this.$loading({
      //   background: 'rgba(255,255,255,0.1)',
      //   text: '加载中，请稍后...'
      // })
      // getAddress().then(res => {
      //   loading.close()
      //   this.form = res.data
      //   let initAddress = {}
      //   initAddress.province_id = res.data.province_id
      //   initAddress.city_id = res.data.city_id
      //   initAddress.area_id = res.data.area_id
      //   initAddress.street_id = res.data.street_id
      //   this.initAddress = Object.assign({}, initAddress)
      // })
    }
  },
  components: {
    AddressSelect
  }
}
</script>

<style lang="scss" scoped>
.address-wrapper {
  width: 790px;
}
.line {
  text-align: center;
}
</style>
