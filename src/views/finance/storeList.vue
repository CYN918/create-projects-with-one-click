<template>
  <div class="store-wrapper">
    <div class="mcard mbottom">
      <div class="title">搜索条件</div>
      <el-form :model="form" ref="form" :inline="true" size="small">
        <el-form-item>
          <el-select v-model="form.store_type">
            <el-option label="站点类型" value></el-option>
            <el-option
              v-for="item in application"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.keyword" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">查询</el-button>
          <el-button type="primary" plain>导出报表</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mcard">
      <el-table :data="list" stripe>
        <el-table-column type="index" label="序号" align="center"/>
        <el-table-column prop="time" label="日期"/>
        <el-table-column prop="founder" label="创建人"/>
        <el-table-column prop="store_name" label="站点名称"/>
        <el-table-column prop="application_name" label="站点类型"/>
        <el-table-column prop="store_account" label="站点账户"/>
        <el-table-column prop="store_cash_account" label="站点现金账户（元）"/>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="btnRecharge(scope.row)">充值</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.current_page"
        :page-size="pagination.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total_count"
      ></el-pagination>
    </div>
    <el-dialog title="充值" :visible.sync="dialogVisible" width="700px">
      <el-alert
        title="充值为向该站点账户虚拟充值，需保证站点账户充足，站点才可下单。当用户下单时，若站点账户余额不足，订单将在站点端悬挂（供应商将不可对该订单发货），需要会员向站点充值足够金额后，再在站点管理中心操作继续下单，订单才可转为正常订单。"
        type="success"
        :closable="false"
      ></el-alert>
      <el-form
        :model="rechargeForm"
        ref="rechargeForm"
        class="rechargeForm"
        label-width="200px"
        :rules="rules"
      >
        <el-form-item label="充值金额" prop="money">
          <el-input
            style="width: 330px"
            type="number"
            v-model="rechargeForm.money"
            placeholder="0~999999任意金额"
            min="0"
            max="999999"
          />
          <span style="margin-left: 20px">元</span>
        </el-form-item>
        <el-form-item label="充值备注" prop="remark">
          <el-input
            style="width: 375px"
            type="textarea"
            v-model="rechargeForm.remark"
            placeholder="请填写备注"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRechargeForm('rechargeForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { application } from '@/api/config'
import { getStoreList, editRecharge } from '@/api/finance/store'

export default {
  data () {
    return {
      application,
      form: {
        store_type: '',
        keyword: ''
      },
      list: [{
        time: '', // 日期
        founder: '', // 创建人
        store_id: '', // 站点id
        store_name: '', // 站点名称
        application_name: '', // 站点类型名称
        store_account: '', // 站点账户
        store_cash_account: '' // 站点现金账户（元）
      }],
      pagination: {
        current_page: 1,
        page_size: 20,
        total_count: 0
      },
      dialogVisible: false,
      rechargeForm: {
        money: null,
        remark: ''
      },
      rules: {
        money: [{ required: true, message: '0~999999任意金额', trigger: 'blur' }],
        remark: [{ required: true, message: '请填写备注', trigger: 'blur' }]
      },
      storeId: ''
    }
  },
  created () {
    // this._getStoreList()
  },
  methods: {
    submitForm () {
      this._getStoreList()
    },
    handleSizeChange (val) {
      this.pagination.page_size = val
      this._getStoreList()
    },
    handleCurrentChange (val) {
      this.pagination.current_page = val
      this._getStoreList()
    },
    btnRecharge (item) {
      this.dialogVisible = true
      this.$refs.rechargeForm.resetFields()
      this.storeId = item.store_id
    },
    submitRechargeForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._editRecharge()
        } else {
          return false
        }
      })
    },
    _getStoreList () {
      let data = {}
      data.current_page = this.pagination.current_page
      data.page_size = this.pagination.page_size
      data.form = this.form

      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getStoreList(data).then(res => {
        loading.close()
        this.list = res.data.list
        this.pagination.total_count = res.data.total_count
      })
    },
    _editRecharge () {
      let data = {}
      data.store_id = this.storeId
      data.money = this.rechargeForm.money
      data.remark = this.rechargeForm.remark
      editRecharge(data).then(() => {
        this.dialogVisible = false
        this._getStoreList()
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.store-wrapper {
  .rechargeForm {
    margin-top: 40px;
  }
}
</style>
