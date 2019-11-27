<template>
  <div>
    <el-form :model="form" :inline="true" ref="form" class="user-search" size="small">
      <el-form-item prop="state">
        <el-select class="width13" v-model="form.state" placeholder="全部状态">
          <el-option label="全部状态" value></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="sel_type">
        <el-select class="width13" v-model="form.sel_type" placeholder="全部状态">
          <el-option label="姓名" value="1"></el-option>
          <el-option label="手机号" value="2"></el-option>
          <el-option label="邮箱" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="width16" prop="keyword">
        <el-input v-model="form.keyword" placeholder="请输入关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">搜索</el-button>
      </el-form-item>
      <div class="add-user">
        <el-button type="primary" class="el-icon-plus" size="small" @click="btnAddAccount">添加新员工</el-button>
      </div>
    </el-form>
    <div class="muser-content clearfix">
      <div class="muser-left">
        <div
          class="left-item all"
          @click="handleGetGroupUser('')"
          :class="{'active': userTagId === ''}"
        >全部员工（{{userTotal}}）</div>
        <div
          class="left-item group-item"
          v-for="(item, index) in groupList"
          :class="{'active': userTagId === item.user_tag_id}"
          @click="handleGetGroupUser(item.user_tag_id)"
          :key="index"
        >
          {{item.group_name}}
          <span>（{{item.number}}）</span>
        </div>
        <div class="left-item btn" @click="handleAddUserGroup">
          <i class="el-icon-plus"></i>
          新建部门
        </div>
      </div>
      <div class="muser-right">
        <div class="btn-wrapper">
          <el-button type="primary" size="small" @click="btnEditUserGroup">设置部门</el-button>
          <el-button type="primary" size="small" @click="handleUserBatchEdit('2')">禁用</el-button>
          <el-button type="primary" size="small" @click="handleUserBatchEdit('1')">启用</el-button>
        </div>
        <el-table :data="userList" width="100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"/>
          <el-table-column type="index" label="序号" width="50"/>
          <el-table-column prop="name" label="姓名"/>
          <el-table-column prop="phone" label="手机号"/>
          <el-table-column prop="email" label="邮箱"/>
          <el-table-column prop="group_name" label="部门"/>
          <el-table-column prop="userid" label="职位"/>
          <el-table-column prop="role_name" label="权限"/>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">{{scope.row.state == 1 ? '正常': '禁用'}}</template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="btntoLog(scope.row)">操作日志</el-button>
              <el-button type="text" size="small" @click="btnEditAccount(scope.row)">编辑</el-button>
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
            :total="pagination.total_count"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!--编辑用户群组弹窗-->
    <el-dialog title="设置部门" :visible.sync="dialogVisible">
      <el-radio-group v-if="groupList.length" v-model="groupRadio">
        <el-radio
          v-for="item in groupList"
          :key="item.user_tag_id"
          :label="item.user_tag_id"
        >{{item.group_name}}</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditUserGroup">确 定</el-button>
      </span>
    </el-dialog>
    <!--新建,编辑弹窗-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogAccountVisible" width="700px">
      <el-form
        :model="accountForm"
        ref="accountForm"
        class="account-form"
        label-width="100px"
        :rules="accountRules"
        size="small"
      >
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="accountForm.name" placeholder="请填写员工真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机：" prop="phone">
          <el-input v-model="accountForm.phone" placeholder="请填写手机号" :disabled="!isAddAccount"></el-input>
          <span class="tip">自动向员工发送通知，添加成功后，手机号只能由员工自行修改</span>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="accountForm.email" placeholder="请填写员工邮箱（选填）"></el-input>
        </el-form-item>
        <el-form-item label="部门：" prop="position">
          <el-select v-model="accountForm.user_tag_id" placeholder="请选择">
            <el-option
              v-for="item in groupList"
              :label="item.group_name"
              :value="item.user_tag_id"
              :key="item.user_tag_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色：" prop="role_id">
          <el-select v-model="accountForm.role_id" placeholder="请选择">
            <el-option v-for="item in roleList" :label="item.role_name" :value="item.role_id" :key="item.role_id"></el-option>
          </el-select>
          <el-button type="primary" plain class="btn-role" @click="btnToRole">管理角色权限</el-button>
        </el-form-item>
        <el-form-item label="职位：" prop="position">
          <el-input v-model="accountForm.position" placeholder="请填写员工职位（选填）"></el-input>
        </el-form-item>
        <el-form-item label="账号状态：" prop="state">
          <el-radio-group v-model="accountForm.state">
            <el-radio label="1">启用</el-radio>
            <el-radio label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="添加时间：" prop="create_time" v-show="!isAddAccount">
          <el-input
            v-model="accountForm.create_time"
            placeholder="请填写员工职位（选填）"
            :disabled="!isAddAccount"
          ></el-input>
        </el-form-item>
        <el-form-item label="最后登录：" prop="login_time" v-show="!isAddAccount">
          <el-input
            v-model="accountForm.login_time"
            placeholder="请填写员工职位（选填）"
            :disabled="!isAddAccount"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAccountVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAccountForm('accountForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserGroup, getUserList, addUserGroup, editiUserGroup, editBatchUser, editAccountdetail } from '@/api/staff/index'

export default {
  name: 'AccountList',
  props: {
    roleList: {
      type: Array,
      default: () => {}
    }
  },
  data () {
    return {
      form: {
        state: '', // 全部状态  1 启用, 2.禁用
        sel_type: '1', //  1.姓名, 2.手机号, 3.邮箱
        keyword: '' // 关键词
      },
      groupList: [],
      userTotal: 0,
      userList: [],
      userTagId: '',
      pagination: {
        current_page: 1,
        page_size: 10,
        total_count: 0
      },
      dialogVisible: false,
      selectUsers: [],
      groupRadio: '',
      dialogAccountVisible: false,
      accountForm: {
        userid: '',
        name: '',
        phone: '',
        email: '',
        user_tag_id: '',
        role_id: '',
        position: '',
        state: '1'
      },
      dialogTitle: '提示',
      isAddAccount: true,
      accountRules: {
        name: [
          { required: true, message: '请填写姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
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
    this._getUserList()
    this._getUserGroup()
  },
  methods: {
    submitForm () {
      this._getUserList()
    },
    btnAddAccount () {
      this.dialogAccountVisible = true
      this.isAddAccount = true
      this.accountForm.userid = ''
      this.dialogTitle = '添加员工'
      if (this.$refs.accountForm) {
        this.$refs.accountForm.resetFields()
      }
    },
    btnToRole () {
      this.$emit('toRole')
    },
    btntoLog (account) {
      this.$emit('toLog', account.userid)
    },
    btnEditAccount (account) {
      this.dialogTitle = '编辑员工'
      this.isAddAccount = false

      this.accountForm.userid = account.userid
      this.accountForm.name = account.name
      this.accountForm.phone = account.phone
      this.accountForm.email = account.email
      this.accountForm.user_tag_id = account.user_tag_id
      this.accountForm.role_id = account.role_id
      this.accountForm.position = account.position
      this.accountForm.state = account.state
      this.accountForm.create_time = account.create_time
      this.accountForm.login_time = account.login_time

      this.dialogAccountVisible = true
    },
    submitAccountForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._editAccountdetail()
        } else {
          return false
        }
      })
    },
    handleGetGroupUser (id) {
      this.userTagId = id
      this.$refs.form.resetFields()
      this._getUserList()
    },
    handleSizeChange (val) {
      this.pagination.page_size = val
      this._getUserList()
    },
    handleCurrentChange (val) {
      this.pagination.current_page = val
      this._getUserList()
    },
    handleAddUserGroup () {
      this.$prompt('请输入群组名称', '添加群组', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S+/,
        inputErrorMessage: '群组名称不能为空'
      }).then(({ value }) => {
        let loading = this.$loading({
          background: 'rgba(255,255,255,0.1)',
          text: '加载中，请稍后...'
        })
        addUserGroup(value).then(() => {
          loading.close()
          this.$message({
            type: 'success',
            message: '群组新建成功'
          })
          this._getUserGroup()
        }).catch(() => { })
      })
    },
    handleSelectionChange (data) {
      let ret = []
      data.map(item => {
        ret.push(item.userid)
      })
      this.selectUsers = ret
    },
    btnEditUserGroup () {
      if (!this.selectUsers.length) {
        this.$message({
          message: '请选择用户',
          type: 'warning'
        })
        return
      }
      this.dialogVisible = true
    },
    // 编辑用户群组
    handleEditUserGroup () {
      if (this.groupRadio === '') {
        this.$message({
          message: '请选择群组',
          type: 'warning'
        })
        return
      }
      let data = {}
      data.users_id = this.selectUsers.join(',')
      data.user_tag_id = this.groupRadio

      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      editiUserGroup(data).then(res => {
        loading.close()
        this.dialogVisible = false
        this._getUserGroup()
        this._getUserList()
      })
    },
    handleUserBatchEdit (val) {
      if (!this.selectUsers.length) {
        this.$message({
          message: '请选择用户',
          type: 'warning'
        })
        return
      }
      let tip = ''
      let btnConfirm = ''
      if (val === '1') {
        tip = '启用后，用户将正常登录'
        btnConfirm = '启用'
      } else {
        tip = '禁用后，用户将无法登录'
        btnConfirm = '禁用'
      }
      this.$confirm(tip, '提示', {
        confirmButtonText: btnConfirm,
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._editBatchUser(val)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    _getUserList () {
      let data = {}
      data.current_page = this.pagination.current_page
      data.page_size = this.pagination.page_size
      data.form = this.form
      data.user_tag_id = this.userTagId
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getUserList(data).then(res => {
        loading.close()
        this.userList = res.data.list
        this.pagination.total_count = res.data.total_count
      })
    },
    _getUserGroup () {
      getUserGroup().then(res => {
        this.groupList = res.data.list
        this.userTotal = res.data.total
      })
    },
    _editBatchUser (val) {
      let data = {}
      data.users_id = this.selectUsers.join(',')
      data.state = val
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      editBatchUser(data).then(() => {
        loading.close()
        this._getUserList()
      })
    },
    _editAccountdetail () {
      editAccountdetail(this.accountForm).then(() => {
        this.$message({
          message: `${this.dialogTitle}成功`,
          type: 'success'
        })
        this.dialogAccountVisible = false
        this._getUserList()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.user-search {
  position: relative;
  .add-user {
    position: absolute;
    right: 0;
    top: 0;
  }
}
.width16 {
  width: 160px;
}
.width13 {
  width: 130px;
}
.line {
  margin-right: 10px;
  line-height: 32px;
  text-align: center;
}
.user-search {
  margin-bottom: 20px;
}
.muser-content {
  .muser-left {
    width: 170px;
    float: left;
    border: 1px solid #d7e0f1;
    .left-item {
      line-height: 46px;
      text-align: center;
      font-size: 14px;
      cursor: pointer;
      &.all {
        color: $themeColor;
      }
      &.active {
        background: #dee9f7;
        color: $themeColor;
      }
      &.btn {
        border-top: 1px solid #d7e0f1;
      }
      &.group-item {
        padding: 0 10px;
        text-align: left;
        span {
          float: right;
        }
      }
    }
  }
  .muser-right {
    padding: 20px;
    margin-left: 190px;
    border: 1px solid #d7e0f1;
    .btn-wrapper {
      margin-bottom: 20px;
      .el-button {
        margin-right: 10px;
      }
    }
  }
}
.pagenation {
  margin: 20px 0;
  text-align: right;
}
.edit-user {
  padding: 0 40px;
}
.account-form {
  margin: 0 100px 0 40px;
  .tip {
    color: #999;
  }
  .btn-role {
    margin-left: 10px;
  }
}
</style>
