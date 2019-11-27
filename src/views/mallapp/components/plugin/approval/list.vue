<template>
  <div class="mcard">
    <div class="title">搜索条件</div>
    <el-form :model="form" :inline="true" ref="form" class="user-search mbottom" size="small">
      <el-form-item prop="state">
        <el-select class="width13" v-model="form.state" placeholder="用户状态">
          <el-option label="用户状态" value></el-option>
          <el-option label="正常" value="1"></el-option>
          <el-option label="禁用" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="sel_type">
        <el-select class="width13" v-model="form.sel_type" placeholder="搜索类型">
          <el-option label="按手机号搜索" value="1"></el-option>
          <el-option label="按姓名搜索" value="2"></el-option>
          <el-option label="按绑定网点搜索" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="width16" prop="keyword">
        <el-input v-model="form.keyword" placeholder="请输入关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="muser-right">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="btnAdd">添加审批人</el-button>
        <el-button type="primary" size="small" plain @click="btnImport">导入审批人</el-button>
        <el-button type="primary" size="small" plain @click="btnSetType">设置审批类型</el-button>
        <el-button type="primary" size="small" plain @click="relativeQuota">关联网点</el-button>
      </div>
      <el-table :data="tableData" @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center" width="55"></el-table-column>
        <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
        <el-table-column label="手机号" prop="phone" align="center"></el-table-column>
        <el-table-column label="姓名" prop="name" align="center"></el-table-column>
        <el-table-column label="可审批类型">
          <template slot-scope="scope">{{_type(scope.row.type)}}</template>
        </el-table-column>
        <el-table-column label="状态" prop="state" align="center">
          <template slot-scope="scope">{{_state(scope.row.state)}}</template>
        </el-table-column>
        <el-table-column label="关联网点名称" prop="quota_name" align="center"></el-table-column>
        <el-table-column label="额度总额" prop="amount" align="center"></el-table-column>
        <el-table-column label="已使用额度" prop="amount_used" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="btnEditSalesman(scope.row)">编辑</el-button>
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
    </div>
    <!--添加/编辑业务员弹窗-->
    <el-dialog :title="dialogText" :visible.sync="dialogAddVisible" width="1000px">
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addForm"
        size="meduim"
        label-width="220px"
        class="form"
      >
        <el-form-item prop="phone" label="审批人手机号" required>
          <el-input v-model="addForm.phone" placeholder="请输入审批人手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="登陆密码">
          <el-input v-model="addForm.password" placeholder="6至20位英文+数字" :min="6" :max="20"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="审批人姓名">
          <el-input v-model="addForm.name" placeholder="请输入业务员姓名"></el-input>
        </el-form-item>
        <el-form-item prop="quota_id" label="关联网点">
          <el-select v-model="addForm.quota_id">
            <el-option value>无关联</el-option>
            <el-option
              v-for="item in quotaList"
              :key="item.quota_id"
              :label="item.quota_name"
              :value="item.quota_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-checkbox-group v-model="addForm.type">
            <el-checkbox label="1">移动充值审批（在移动充值，审批人管理中设置审批人时，将可选择该审批人）</el-checkbox>
            <el-checkbox label="2">用户采购审批（采购用户管理，用户列表中设置审批人时，将可选择该审批人）</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item prop="state" label="状态：">
          <el-radio v-model="addForm.state" label="1">启用</el-radio>
          <el-radio v-model="addForm.state" label="2">禁用</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddForm('addForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!--导入审批人-->
    <el-dialog title="导入审批人" :visible.sync="dialogImportVisible" width="1000px">
      <div class="btn-down">
        <el-button type="primary" size="small">下载Excel模板</el-button>
      </div>
      <el-upload
        class="upload-wrapper"
        ref="upload"
        :limit="1"
        :action="uploadUrl"
        :before-upload="beforeFillUpload"
        :on-progress="progressUpload"
        :on-success="successUpload"
        :auto-upload="false"
        :on-error="errorUpload"
      >
        <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传xlsx文件</div>
      </el-upload>
      <el-button class="btn-import" type="success" @click="submitUpload" :loading="loading">导入</el-button>
    </el-dialog>
    <!--设置审批类型-->
    <el-dialog title="设置审批类型" :visible.sync="dialogSetTypeVisible" width="1000px">
      <el-form
        :model="setTypeForm"
        ref="setTypeForm"
        size="meduim"
        label-width="220px"
        class="form"
      >
        <el-form-item>
          <el-checkbox-group v-model="setTypeForm.type">
            <el-checkbox label="1">移动充值审批（在移动充值，审批人管理中设置审批人时，将可选择该审批人）</el-checkbox>
            <el-checkbox label="2">用户采购审批（采购用户管理，用户列表中设置审批人时，将可选择该审批人）</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSetTypeVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitSetTypeForm('setTypeForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!--关联网点弹窗-->
    <el-dialog title="关联网点" :visible.sync="dialogQuotaVisible" width="700px">
      <el-form
        :model="quotaForm"
        ref="quotaForm"
        size="meduim"
        label-width="220px"
        class="form"
      >
        <el-form-item prop="quota_id" label="关联网点">
          <el-select v-model="quotaForm.quota_id">
            <el-option value>无关联</el-option>
            <el-option
              v-for="item in quotaList"
              :key="item.quota_id"
              :label="item.quota_name"
              :value="item.quota_id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogQuotaVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitQuotaForm('quotaForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { tableMix } from '@/common/js/mixinTable'
import { getApprovalList, getQuota, editApproval, importApproval, setType, setQuota } from '@/api/mallapp/plugin/approval'

export default {
  mixins: [tableMix],
  data () {
    const checkMobile = (rule, value, callback) => {
      let flag = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value)
      if (flag === false) {
        return callback(new Error('请输入正确的手机号'))
      }
      callback()
    }
    const checkPassword = (rule, value, callback) => {
      if (!/^[a-zA-Z0-9]+$/.test(value)) {
        return callback(new Error('请输入英文+数字'))
      }
      if (value.length < 6 || value.length > 20) {
        return callback(new Error('请输入6-20个字符+数字'))
      }
      callback()
    }
    const checkName = (rule, value, callback) => {
      if (value.length < 2) {
        return callback(new Error('最少2个字'))
      }
      callback()
    }
    return {
      form: {
        state: '', // 用户状态： ’‘全部状态， ‘1‘ 正常 ’2‘禁用
        sel_type: '1', // 搜索类型 ： ‘1’ 按照手机号搜索, ‘2’ 按照姓名搜索, '3' 按绑定网点搜索
        keyword: '' // 关键字
      },
      selectUsers: [],
      initForm: {
        id: '', // id
        quota_id: '', // 网点id
        phone: '', // 审批人手机号
        name: '', // 审批人姓名
        password: '', // 登陆密码
        type: [], // 审批类型：[], "1"移动充值审批 "2"用户采购审批
        state: '1' // 状态 1. 正常， 2.禁用
      },
      addForm: {
        id: '', // id
        quota_id: '', // 网点id
        phone: '', // 审批人手机号
        name: '', // 审批人姓名
        password: '', // 登陆密码
        type: [], // 审批类型：[], "1"移动充值审批 "2"用户采购审批
        state: '1' // 状态 1. 正常， 2.禁用
      },
      dialogText: '添加审批人',
      dialogAddVisible: false,
      quotaList: [],
      addFormRules: {
        phone: [{ required: true, validator: checkMobile, trigger: 'blur' }],
        password: [{ required: true, validator: checkPassword, trigger: 'blur' }],
        name: [{ required: true, validator: checkName, trigger: 'blur' }]
      },
      dialogImportVisible: false,
      loading: false,
      uploadUrl: importApproval(),
      dialogSetTypeVisible: false,
      setTypeForm: {
        type: [] // 审批类型：[], "1"移动充值审批 "2"用户采购审批
      },
      dialogQuotaVisible: false,
      quotaForm: {
        quota_id: '' // 网点id
      }
    }
  },
  created () {
    this._getQuota()
  },
  methods: {
    getTableData () {
      this.tableSubmitData.form = this.form
      return getApprovalList(this.tableSubmitData)
    },
    // 选择员工
    handleSelectionChange (data) {
      let ret = []
      data.map(item => {
        ret.push(item.id)
      })
      this.selectUsers = ret
    },
    btnEditSalesman (item) {
      let form = {}
      form.id = item.id
      form.quota_id = item.quota_id
      form.phone = item.phone
      form.name = item.name
      form.password = item.password
      form.type = item.type
      form.state = item.state
      this.addForm = form

      this.dialogText = '编辑审批人'
      this.dialogAddVisible = true
      this.$refs.addForm && this.$refs.addForm.resetFields()
    },
    btnAdd () {
      this.dialogAddVisible = true
      this.dialogText = '添加审批人'
      this.addForm = Object.assign({}, this.initForm)
      this.$refs.addForm && this.$refs.addForm.resetFields()
    },
    // 添加/编辑 审批人
    submitAddForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._editApproval()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 导入审批人
    btnImport () {
      this.dialogImportVisible = true
    },
    // 导入
    errorUpload () {
      this.loading = false
      this.$message({
        message: '导入失败',
        type: 'error'
      })
    },
    beforeFillUpload (file) {
      const isXlsx = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      if (!isXlsx) {
        this.$message.error('上传文件类型错误！请选择xlsx类型文件')
      }
      return isXlsx
    },
    submitUpload () {
      this.$refs.upload.submit()
    },
    progressUpload () {
      this.loading = true
    },
    successUpload (response, file, fileList) {
      this.loading = false
      this.$message({
        message: `导入成功${response.data.success_num}条, 导入失败${response.data.error_num}条`,
        type: 'success'
      })
      this.dialogImportVisible = false
      this._getTableData()
      this.$refs.upload.clearFiles()
    },
    // 设置审批类型
    btnSetType () {
      if (this.selectUsers.length === 0) {
        this.$message({
          type: 'warning',
          message: '请至少选择一项'
        })
        return
      }
      this.dialogSetTypeVisible = true
    },
    submitSetTypeForm () {
      let data = Object.assign({}, this.setTypeForm)
      data.id = this.selectUsers.join(',')
      setType(data).then(() => {
        this.$message({
          type: 'success',
          message: '设置成功'
        })
        this.dialogSetTypeVisible = false
        this._getTableData()
      })
    },
    // 关联网点
    relativeQuota () {
      if (this.selectUsers.length === 0) {
        this.$message({
          type: 'warning',
          message: '请至少选择一项'
        })
        return
      }
      this.dialogQuotaVisible = true
    },
    submitQuotaForm () {
      let data = Object.assign({}, this.quotaForm)
      data.id = this.selectUsers.join(',')
      setQuota(data).then(() => {
        this.$message({
          type: 'success',
          message: '设置成功'
        })
        this.dialogQuotaVisible = false
        this._getTableData()
      })
    },
    _type (arr) {
      let ret = []
      arr.map(item => {
        let str = ''
        if (item === '1') {
          str = '移动充值'
        }
        if (item === '2') {
          str = '移动采购'
        }
        ret.push(str)
      })
      return ret.join(',')
    },
    _state (state) {
      let ret = ''
      switch (state) {
        case '1':
          ret = '正常'
          break
        case '2':
          ret = '禁用'
          break
        default:
          break
      }
      return ret
    },
    _getQuota () {
      getQuota().then(res => {
        this.quotaList = res.data
      })
    },
    _editApproval () {
      editApproval(this.addForm).then(() => {
        this.dialogAddVisible = false
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import "@/common/scss/variable.scss";
.btn-wrapper {
  margin-bottom: 20px;
  .el-button {
    margin-right: 10px;
  }
}
.btn-down {
  margin-bottom: 10px;
  text-align: right;
}
.upload-wrapper {
  padding: 40px 20px;
  margin-bottom: 20px;
  background: #edf0f5;
}
.btn-import {
  margin-left: 20px;
}
</style>
