<template>
  <div class="margin mcard">
    <div class="top-wrapper">
      <el-button type="primary" size="medium" @click="btnAdd">新增地址</el-button>
      <span class="tip">最多保存5个地址</span>
      <el-button type="text" size="medium" class="el-icon-back fr" @click="routerBack">返 回</el-button>
    </div>
    <el-table :data="list" stripe border>
      <el-table-column label="收件人姓名" prop="name" align="center" width="150"></el-table-column>
      <el-table-column label="联系方式" prop="telphone" align="center"></el-table-column>
      <el-table-column label="地址" align="center">
        <template
          slot-scope="scope"
        >{{`${scope.row.province_name} ${scope.row.city_name} ${scope.row.area_name} ${scope.row.street_name} ${scope.row.address_desc}`}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEditAddress(scope.row)">修改</el-button>
          <el-button type="text" @click="handleDeleteAddress(scope.row)">删除</el-button>
          <span v-if="scope.row.default" class="sub" style="margin-left: 12px;">默认地址</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增地址" :visible.sync="dialogVisible" width="900px">
      <el-form
        :model="addressForm"
        ref="addressForm"
        :rules="rules"
        label-width="200px"
        class="address-form"
        size="medium"
      >
        <el-form-item label="收件人姓名：" prop="name">
          <el-input class="width" v-model="addressForm.name" placeholder="请填写收件人姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系地址：" prop="province_id">
          <address-select :data="initAddress" @selectAddress="selectAddress"></address-select>
        </el-form-item>
        <el-form-item label="详细地址：" prop="address_desc">
          <el-input class="width" v-model="addressForm.address_desc" placeholder="请输入详细地址，包括街道地址"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="telphone">
          <el-input class="width" v-model="addressForm.telphone" placeholder="请输入手机号或固定号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="addressForm.default">设为默认地址</el-checkbox>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addressForm')">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getInvoiceAddress, editAddress } from '@/api/finance/invoice'
import AddressSelect from '@/components/addressSelection/index'

export default {
  name: 'FinanceAddress',
  data () {
    return {
      list: [],
      dialogVisible: false,
      type: 'add',
      addressForm: {},
      initAddressForm: {
        id: '', // id
        name: '', // 收件人姓名
        province_id: '', // 省
        city_id: '', // 市
        area_id: '', // 区
        street_id: '', // 街道
        address_desc: '', // 详细地址
        telphone: '', // 手机号或固定号码
        default: false // 是否默认地址： 1.是 2.否
      },
      rules: {
        name: [{ required: true, message: '请填写收件人姓名', trigger: 'blur' }],
        province_id: [{ required: true, message: '请选择地址', trigger: 'change' }],
        address_desc: [{ required: true, message: '请输入详细地址，包括街道地址', trigger: 'blur' }],
        telphone: [{ required: true, message: '请输入手机号或固定号码', trigger: 'blur' }]
      },
      initAddress: {
        province_id: '', // 省
        city_id: '', // 市
        area_id: '', // 区
        street_id: '' // 街道
      }
    }
  },
  created () {
    this.addressForm = Object.assign({}, this.initAddressForm)
    this._getInvoiceAddress()
  },
  methods: {
    routerBack () {
      this.$router.back()
    },
    btnAdd () {
      this._initAddress()
      this.dialogVisible = true
      this.type = 'add'
      this.addressForm = Object.assign({}, this.initAddressForm)
      // this.$refs.addressForm.clearValidate()
    },
    submitForm (formName) {
      this.$refs.addressForm.validateField('province_id')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._editAddress()
        } else {
          return false
        }
      })
    },
    handleEditAddress (val) {
      this._initAddress(val)

      this.dialogVisible = true
      this.type = 'edit'
      this.addressForm = val
    },
    handleDeleteAddress (val) {
      this.type = 'delete'
      this.addressForm = val
      this.$confirm('删除后，该地址将不再展示', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._editAddress()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    selectAddress (val) {
      this.addressForm.province_id = val.province_id
      this.addressForm.city_id = val.city_id
      this.addressForm.area_id = val.area_id
      this.addressForm.street_id = val.street_id
      this.addressForm.province_name = val.province_name
      this.addressForm.city_name = val.city_name
      this.addressForm.area_name = val.area_name
      this.addressForm.street_name = val.street_name
    },
    _getInvoiceAddress () {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getInvoiceAddress().then(res => {
        loading.close()
        res.data.forEach(item => {
          item.default = item.default === '1'
        })
        this.list = res.data
      })
    },
    _editAddress () {
      let data = Object.assign({}, this.addressForm)
      data.type = this.type
      data.default = data.default === true ? '1' : '2'

      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      editAddress(data).then(() => {
        loading.close()
        this.dialogVisible = false
        this._getInvoiceAddress()
      })
    },
    _initAddress (val) {
      let address = {}
      val = val || {}
      address.province_id = val.province_id
      address.city_id = val.city_id
      address.area_id = val.area_id
      address.street_id = val.street_id
      this.initAddress = Object.assign({}, address)
    }
  },
  components: {
    AddressSelect
  }
}
</script>

<style lang='scss' scoped>
@import "@/common/scss/variable.scss";

.top-wrapper {
  margin-bottom: 20px;
  .tip {
    margin-left: 20px;
    font-size: 12px;
  }
}
.sub {
  color: $themeSubColor;
}
.fr {
  float: right;
}
.address-form {
  width: 740px;
  .width {
    width: 535px;
  }
}
</style>
