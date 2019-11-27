<template>
  <div class="account-list">
    <el-row class="list-hearder">
      <el-col :span="16" class="header-left">
        <el-col :span="16">
          <p>子账号登录地址：<input v-model="url" id="url" readonly/></p>
          <p>站点登录页面请在新浏览器中打开</p>
        </el-col>
        <el-col :span="8" style="text-align: right">
          <el-button type="primary" plain class="btn-copy" data-clipboard-target="#url" @click="copyUrl">复制</el-button>
          <el-button type="primary" plain @click="handleToPage">管理登录页</el-button>
        </el-col>
      </el-col>
      <el-col :span="8" style="text-align: right">
        <el-button class="el-icon-plus" type="primary" @click="btnAddAccount">新建账号</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="accountList">
      <el-table-column
        prop="account"
        label="登录账号"/>
      <el-table-column
        prop="role_name"
        label="角色"/>
      <el-table-column
        prop="nickname"
        label="昵称"/>
      <el-table-column
        prop="create_time"
        label="创建时间"/>
      <el-table-column
        prop="remarks"
        label="账号概述"/>
      <el-table-column
        label="状态"
        align="center">
        <template slot-scope="scope">
          {{scope.row.state == '1' ? '正常' : '禁用'}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="btntoLog(scope.row)">操作日志</el-button>
          <el-button type="text" size="small" @click="btnEditAccount(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleChangeAccountState(scope.row)">{{scope.row.state == '1' ? '禁用' : '启用'}}</el-button>
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
        :total="pagination.total_count">
      </el-pagination>
    </div>
    <!--新建,编辑弹窗-->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="700px">
      <el-form
        :model="accountForm"
        ref="accountForm"
        class="account-form"
        label-width="100px"
        :rules="accountRules"
        size="small">
        <el-form-item label="登录账号：" prop="account">
          <el-input v-model="accountForm.account" placeholder="4-20个字符，支持汉字、字母、数字等组合"></el-input>
        </el-form-item>
        <el-form-item label="登录密码：" prop="password">
          <el-input v-model="accountForm.password" placeholder="密码为6-20个字符，可由英文数字及符号组成" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="checkPass">
          <el-input v-model="accountForm.checkPass" placeholder="再输入一次密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="昵称：" prop="nickname">
          <el-input v-model="accountForm.nickname" placeholder="用户昵称2-20个字符"></el-input>
        </el-form-item>
        <el-form-item label="所属角色：" prop="role_id">
          <el-select v-model="accountForm.role_id" placeholder="请选择">
            <el-option
              label="item"
              value="item">
            </el-option>
          </el-select>
          <el-button type="primary" plain class="btn-role" @click="btnToRole">管理角色权限</el-button>
        </el-form-item>
        <el-form-item label="账号概述：">
          <el-input type="textarea" :rows="2" v-model="accountForm.remarks" placeholder="选填，描述该账号的使用用途，仅作为记录用，200个汉字以内"></el-input>
        </el-form-item>
        <el-form-item label="账号状态：" prop="state">
          <el-radio-group v-model="accountForm.state">
            <el-radio label="1">启用</el-radio>
            <el-radio label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <p class="tip">禁用后，该账号将不可登录到管理后台</p>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteAccount" v-show="this.dialogTitle === '编辑账号'" type="danger">彻底删除</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('accountForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import { getAccountList, getAccountdetail, editAccountdetail, accountChangeState, deleteAccount } from '@/api/mallapp/setting/account'

export default {
  name: 'MsettingAccountList',
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.accountForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      url: 'https://boshiying.com/12465', // 生成的站点网址，后期可放入vuex
      accountList: [],
      pagination: {
        current_page: 0,
        page_size: 10,
        total_count: 0
      },
      dialogVisible: false,
      accountForm: {
        account_id: '',
        account: '',
        password: '',
        checkPass: '',
        nickname: '',
        role_id: '',
        remarks: '',
        state: ''
      },
      dialogTitle: '提示',
      accountRules: {
        account: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { min: 4, max: 20, message: '4-20个字符，支持汉字、字母、数字等组合', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 20, message: '密码为6-20个字符，可由英文数字及符号组成', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 20, message: '用户昵称2-20个字符', trigger: 'blur' }
        ],
        role_id: [
          { required: true, message: '请选择角色权限', trigger: 'change' }
        ],
        state: [
          { required: true, message: '请选择账号状态', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this._getAccountList()
  },
  methods: {
    copyUrl () {
      let clipboard = new Clipboard('.btn-copy')
      clipboard.on('success', () => {
        this.$message({
          message: '链接复制成功',
          type: 'success'
        })
      })
    },
    handleToPage () {
      this.$router.push({ path: '/msetting/login' })
    },
    handleSizeChange (val) {
      this.pagination.page_size = val
      this._getAccountList()
    },
    handleCurrentChange (val) {
      this.pagination.current_page = val
      this._getAccountList()
    },
    btnAddAccount () {
      this.dialogVisible = true
      this.accountForm.account_id = ''
      this.accountForm.remarks = ''
      this.dialogTitle = '新建账号'
      if (this.$refs.accountForm) {
        this.$refs.accountForm.resetFields()
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._editAccountdetail()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    btnEditAccount (account) {
      this.dialogTitle = '编辑账号'
      this.accountForm.account_id = ''
      this.accountForm.remarks = ''
      this.dialogVisible = true
      if (this.$refs.accountForm) {
        this.$refs.accountForm.resetFields()
      }
      this._getAccountdetail(account.account_id)
    },
    btntoLog (account) {
      this.$emit('toLog', account.account_id)
    },
    btnToRole () {
      this.$emit('toRole')
    },
    handleChangeAccountState (account) {
      let tipTit
      let tip
      /* eslint-disable*/
      if (account.state == '1') {
        tipTit = '您确定禁用该账号吗'
        tip = '禁用账号，该账号将不可登录'
      } else {
        tipTit = '您确定启用该账号吗'
        tip = '启用账号，该账号将可登录'
      }
      this.$confirm(tip, tipTit, {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._accountChangeState(account.account_id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    deleteAccount () {
      this.$confirm('删除账号，将不可恢复，请谨慎操作','您确定删除该账号吗？', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._deleteAccount()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    _getAccountList () {
      let data = {}
      data.current_page = this.pagination.current_page
      data.page_size = this.pagination.page_size

      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getAccountList(data).then(res => {
        loading.close()
        this.accountList = res.data.list
        this.pagination.total_count = res.data.total_count
      })
    },
    _getAccountdetail (id) {
      getAccountdetail(id).then(res => {
        let ret = res.data
        let data = {}

        data.account = ret.account
        data.account_id = ret.account_id
        data.password = ret.password
        data.checkPass = ret.password
        data.nickname = ret.nickname
        data.role_id = ret.role_id
        data.remarks = ret.remarks
        data.state = ret.state
        this.accountForm = data
      })
    },
    _editAccountdetail () {
      editAccountdetail(this.accountForm).then(() => {
        this.$message({
          message: `${this.dialogTitle}成功`,
          type: 'success'
        })
        this.dialogVisible = false
        this._getAccountList()
      })
    },
    _accountChangeState (id) {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      accountChangeState(id).then(() => {
        loading.close()
        this.$message({
          message: '状态更改成功',
          type: 'success'
        })
        this._getAccountList()
      })
    },
    _deleteAccount() {
      let id = this.accountForm.account_id
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      deleteAccount(id).then(res => {
        loading.close()
        this.dialogVisible = false
        this._getAccountList()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.account-list {
  .list-hearder {
    margin-bottom: 20px;
    .header-left {
      padding: 20px;
      font-size: 14px;
      line-height: 40px;
      background: #f1f3f5;
      #url {
        width: 280px;
        line-height: 40px;
        background: transparent;
      }
    }
  }
  .pagination {
    margin: 20px 0;
    text-align: right;
  }
  .account-form {
    margin: 0 100px 0 40px;
    .tip {
      margin-left: 100px;
      color: #999;
    }
    .btn-role {
      margin-left: 10px;
    }
  }
}
</style>
