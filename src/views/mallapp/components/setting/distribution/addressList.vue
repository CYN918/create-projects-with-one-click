<template>
  <div>
    <el-button type="primary" class="btn-add" @click="addAddress">新增地址</el-button>
    <el-table
      :data="addressList">
      <el-table-column
        prop="address"
        label="省市区县"/>
      <el-table-column
        prop="address_desc"
        label="详细地址"/>
      <el-table-column
        prop="mobile"
        label="联系方式"/>
      <el-table-column
        prop="name"
        label="收获人姓名"/>
      <el-table-column
        prop="sort"
        label="排序"/>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagenation">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.current_page"
        :page-size="pagination.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total_count">
      </el-pagination>
    </div>
    <!--新建,编辑弹窗-->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="700px">
      <el-form
        :model="form"
        ref="form"
        class="form"
        :rules="rules"
        label-width="100px"
        size="small">
        <el-form-item label="地址：" prop="province_id">
          <address-select :data="initAddress" @selectAddress="selectAddress"></address-select>
        </el-form-item>
        <el-form-item label="详细地址：" prop="address_desc">
          <el-input v-model="form.address_desc" placeholder="请填写详细地址(120个字符以内)" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="收货人：" prop="name">
          <el-input v-model="form.name" placeholder="20个字符以内"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="mobile">
          <el-input v-model="form.mobile" placeholder="手机或固话"></el-input>
        </el-form-item>
        <el-form-item label="排序：" prop="sort">
          <el-input v-model="form.sort" placeholder="数字越小越靠前" style ="width: 160px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAddressList, addressDelete, editAddress } from '@/api/mallapp/setting/distribution'
import AddressSelect from '@/components/addressSelection/index'

export default {
  data () {
    return {
      addressList: [],
      pagination: {
        current_page: 0,
        page_size: 10,
        total_count: 0
      },
      dialogTitle: '',
      dialogVisible: false,
      form: {},
      initForm: {
        id: 0, // id
        province_id: '', // 省
        city_id: '', // 市
        area_id: '', // 区
        street_id: '', // 街道
        address: '', // 四级地址
        address_desc: '', // 详细地址
        name: '', // 收货人
        mobile: '', // 联系方式
        sort: '' // 排序
      },
      initAddress: {
        province_id: '', // 省
        city_id: '', // 市
        area_id: '', // 区
        street_id: '' // 街道
      },
      rules: {
        province_id: [
          { required: true, message: '请选择地址', trigger: 'blur' }
        ],
        address_desc: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入收货人姓名', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this._getAddressList()
  },
  methods: {
    handleEdit (item) {
      this.dialogTitle = '编辑地址'
      this.dialogVisible = true
      this.form = item
      let address = {}
      address.province_id = item.province_id
      address.city_id = item.city_id
      address.area_id = item.area_id
      address.street_id = item.street_id
      this.initAddress = Object.assign({}, address)
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    },
    addAddress () {
      this.dialogTitle = '新增地址'
      this.dialogVisible = true
      this.form = Object.assign({}, this.initForm)
      this.initAddress = {}
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._editAddress()
        } else {
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
    handleDelete (item) {
      this.$confirm('删除后，数据不可恢复，谨慎操作。', '确定删除该地址？', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._addressDelete(item.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    handleSizeChange (val) {
      this.pagination.page_size = val
      this._getAddressList()
    },
    handleCurrentChange (val) {
      this.pagination.current_page = val
      this._getAddressList()
    },
    _getAddressList () {
      let data = {}
      data.current_page = this.pagination.current_page
      data.page_size = this.pagination.page_size

      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getAddressList(data).then(res => {
        loading.close()
        this.addressList = res.data.list
        this.pagination.total_count = res.data.total_count
      })
    },
    _addressDelete (id) {
      addressDelete(id).then(() => {
        this._getAddressList()
      })
    },
    _editAddress () {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      editAddress(this.form).then(() => {
        loading.close()
        this.dialogVisible = false
        this._getAddressList()
      })
    }
  },
  components: {
    AddressSelect
  }
}
</script>
<style lang="scss" scoped>
  .btn-add {
    margin-bottom: 20px;
  }
</style>
