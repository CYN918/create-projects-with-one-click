<template>
  <div class="mcard">
    <div class="title">网点管理</div>
    <el-form :model="form" :inline="true" ref="form" size="small">
      <el-form-item class="width16" prop="keyword">
        <el-input v-model="form.keyword" placeholder="请输入关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">查询</el-button>
        <el-button type="primary" plain @click="reset('form')">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="btn-wrapper">
      <el-button type="primary" size="small" @click="btnAdd">添加网点</el-button>
      <el-button type="primary" size="small" @click="btnBatch">批量设置额度</el-button>
    </div>
    <el-table :data="tableData">
      <el-table-column label="网点名称" prop="quota_name" align="center"></el-table-column>
      <el-table-column label="包含审批人数" prop="approval_num" align="center"></el-table-column>
      <el-table-column label="网点当前剩余额度" prop="amount_residue" align="center"></el-table-column>
      <el-table-column label="当月已使用额度" prop="amount_month" align="center"></el-table-column>
      <el-table-column label="累计已使用额度" prop="amount_used" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="250">
        <template slot-scope="scope">
          <el-button type="text" @click="btnEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="btnAmountEdit(scope.row)">修改额度</el-button>
          <el-button type="text" @click="btnToLog(scope.row)">额度变更记录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.current_page"
        :page-size="pagination.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total_count"
      ></el-pagination>
    </div>
    <!--添加/编辑业务员弹窗-->
    <el-dialog :title="dialogText" :visible.sync="dialogAddVisible" width="700px">
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addForm"
        size="meduim"
        label-width="150px"
        class="form"
      >
        <el-form-item prop="quota_name" label="网点名称：">
          <el-input v-model="addForm.quota_name" placeholder="请输入网点名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddForm('addForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!--编辑额度弹窗-->
    <el-dialog title="编辑额度" :visible.sync="dialogEditisible" width="700px">
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editForm"
        size="meduim"
        label-width="150px"
        class="form"
      >
        <el-form-item prop="quota_type">
          <el-radio v-model="editForm.quota_type" label="1">增加额度</el-radio>
          <el-radio v-model="editForm.quota_type" label="2">扣减额度</el-radio>
        </el-form-item>
        <el-form-item prop="quota" label="额度值：">
          <el-input type="number" v-model="editForm.quota" placeholder="小于999999的正整数"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditForm('editForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { tableMix } from '@/common/js/mixinTable'
import { getQuotaList, editQuota, editQuotaAmount } from '@/api/mallapp/plugin/approval'

export default {
  mixins: [tableMix],
  data () {
    const checkNumber = (rule, value, callback) => {
      if (Number(value) <= 0 || Number(value) > 999999) {
        return callback(new Error('额度是小于999999的正整数'))
      }
      callback()
    }
    return {
      form: {
        keyword: '' // 关键字
      },
      dialogText: '添加网点',
      dialogAddVisible: false,
      initForm: {
        quota_id: '',
        quota_name: ''
      },
      addForm: {
        quota_id: '',
        quota_name: ''
      },
      addFormRules: {
        quota_name: [{ required: true, mesagge: '网点名称不能为空', trigger: 'blur' }]
      },
      dialogEditisible: false,
      editForm: {
        quota_id: '', // 网点id
        quota_type: '1', // '1' 增加额度 '2' 扣减额度
        quota: '' // 额度值
      },
      editFormRules: {
        quota_type: [{ required: true, mesagge: '请选择', trigger: 'blur' }],
        quota: [{ required: true, validator: checkNumber, trigger: 'blur' }]
      }
    }
  },
  methods: {
    getTableData () {
      this.tableSubmitData.form = this.form
      return getQuotaList(this.tableSubmitData)
    },
    submitForm () {
      this._getTableData()
    },
    reset (formName) {
      this.$refs[formName].resetFields()
    },
    btnBatch () {
      this.$router.push({ path: '/mplugin/approval/batch' })
    },
    btnToLog (item) {
      this.$router.push({ path: `/mplugin/approval/log/${item.quota_id}` })
    },
    btnAdd () {
      this.addForm = Object.assign({}, this.initForm)
      this.dialogText = '添加网点'
      this.dialogAddVisible = true
      this.$refs.addForm && this.$refs.addForm.resetFields()
    },
    btnEdit (item) {
      this.addForm = Object.assign({}, this.initForm)
      this.addForm.quota_id = item.quota_id
      this.addForm.quota_name = item.quota_name
      this.dialogText = '编辑网点'
      this.dialogAddVisible = true
      this.$refs.addForm && this.$refs.addForm.resetFields()
    },
    // 添加/编辑 网点
    submitAddForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._editQuota()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 修改额度
    btnAmountEdit (item) {
      this.dialogEditisible = true
      this.$refs.editForm && this.$refs.editForm.resetFields()
    },
    submitEditForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._editQuotaAmount()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    _editQuota () {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      editQuota(this.addForm).then(() => {
        this.dialogAddVisible = false
        loading.close()
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        this._getTableData()
      })
    },
    _editQuotaAmount () {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      editQuotaAmount(this.editForm).then(() => {
        this.dialogEditisible = false
        loading.close()
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        this._getTableData()
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.btn-wrapper {
  margin-bottom: 20px;
  .el-button {
    margin-right: 10px;
  }
}
</style>
