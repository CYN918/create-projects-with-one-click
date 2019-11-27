<template>
  <div class="mcard">
    <div class="title">搜索条件</div>
    <el-form :model="form" :inline="true" ref="form" class="user-search" size="small">
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
        </el-select>
      </el-form-item>
      <el-form-item class="width16" prop="keyword">
        <el-input v-model="form.keyword" placeholder="请输入关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">搜索</el-button>
      </el-form-item>
    </el-form>
    <div class="muser-content clearfix">
      <div class="muser-left">
        <div
          class="left-item"
          :class="{'active': form.group_id === ''}"
          @click="handleGetGroupUser('')"
        >全部用户（{{group.total || 0}}）</div>
        <div
          class="left-item"
          :class="{'active': form.group_id === '0'}"
          @click="handleGetGroupUser('0')"
        >未分组用户（{{group.ungroup_total || 0}}）</div>
        <div
          class="left-item"
          v-for="(item, index) in group.list"
          :class="{'active': form.group_id === item.group_id}"
          @click="handleGetGroupUser(item.group_id)"
          @mouseover="showEditGroupIcon(item.group_id)"
          @mouseout="hideEditGroupIcon"
          :key="index"
        >
          {{item.group_name}}({{item.number}})
          <i
            @click.stop="btnEditGroup(item)"
            v-show="editGroupId === item.group_id"
            class="el-icon-edit"
          ></i>
        </div>
        <div class="left-item btn" @click="btnAddUserGroup">
          <i class="el-icon-plus"></i>
          新建分组
        </div>
      </div>
      <div class="muser-right">
        <div class="btn-wrapper">
          <el-button type="primary" size="small" @click="addSalesman">添加业务员</el-button>
          <el-button type="primary" size="small" plain>导出业务员</el-button>
          <el-button type="primary" size="small" plain @click="btnEditUserGroup">设置分组</el-button>
          <el-button type="primary" size="small" plain @click="btnShowPremission">设置权限</el-button>
          <el-button type="primary" size="small" plain @click="btnApprove">审批关系设置</el-button>
        </div>
        <el-table :data="tableData" @selection-change="handleSelectionChange">
          <el-table-column type="selection" align="center" width="55"></el-table-column>
          <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
          <el-table-column label="手机号" prop="phone" align="center"></el-table-column>
          <el-table-column label="姓名" prop="name" align="center"></el-table-column>
          <el-table-column label="单次充值上限" prop="once_max" align="center"></el-table-column>
          <el-table-column label="单日充值上限" prop="day_max" align="center"></el-table-column>
          <el-table-column label="单月充值上限" prop="month_max" align="center"></el-table-column>
          <el-table-column label="累计已充值" prop="total" align="center"></el-table-column>
          <el-table-column label="状态" prop="state" align="center">
            <template slot-scope="scope">{{_state(scope.row.state)}}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template slot-scope="scope">
              <el-button type="text" @click="btnEditSalesman(scope.row)">编辑</el-button>
              <el-button type="text">充值详情</el-button>
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
    </div>
    <!--新增/编辑 分组弹窗-->
    <el-dialog :title="dialogGroupText" :visible.sync="dialogVisible" width="600px">
      <el-form :model="groupForm" :rules="groupFormRules" ref="groupForm" label-width="120px">
        <el-form-item prop="group_name" label="分组名:">
          <el-input v-model="groupForm.group_name" placeholder="请输入分组名称，必须为2-30个汉字"></el-input>
        </el-form-item>
        <el-form-item prop="second_name" label="二级行名称:">
          <el-input
            v-model="groupForm.second_name"
            placeholder="请输入二级行名称"
            :minlength="2"
            :maxlength="30"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddUserGroup">确 定</el-button>
      </span>
    </el-dialog>
    <!--编辑用户群组弹窗-->
    <el-dialog title="设置分组" :visible.sync="dialogGroupVisible" width="600px">
      <el-radio-group v-if="group.list && group.list.length" v-model="groupRadio">
        <el-radio
          v-for="item in group.list"
          :key="item.group_id"
          :label="item.group_name"
        >{{item.group_name}}</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogGroupVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditUserGroup">确 定</el-button>
      </span>
    </el-dialog>
    <!--批量设置用户权限弹窗-->
    <el-dialog title="设置权限" :visible.sync="dialogGroupPermissionVisible" width="600px">
      <el-form
        :model="permissionForm"
        :rules="permissionFormRules"
        ref="permissionForm"
        label-width="120px"
        size="medium"
      >
        <el-form-item prop="once_max" label="单次充值上限:">
          <el-input
            type="number"
            v-model="permissionForm.once_max"
            :max="9999999"
            placeholder="请输入金额，只可为小于9999999正整数，填0则不限制"
          ></el-input>
        </el-form-item>
        <el-form-item prop="day_max" label="单日充值上限:">
          <el-input
            type="number"
            v-model="permissionForm.day_max"
            :max="9999999"
            placeholder="请输入金额，只可为小于9999999正整数，填0则不限制"
          ></el-input>
        </el-form-item>
        <el-form-item prop="month_max" label="单月充值上限:">
          <el-input
            type="number"
            v-model="permissionForm.month_max"
            :max="9999999"
            placeholder="请输入金额，只可为小于9999999正整数，填0则不限制"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogGroupPermissionVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditPermission">确 定</el-button>
      </span>
    </el-dialog>
    <!--添加/编辑业务员弹窗-->
    <el-dialog :title="salesmanText" :visible.sync="dialogSalesmanVisible" width="1200px">
      <salesman
        :typeVal="salesmanType"
        :manId="manId"
        :groupList="group.list"
        @cancel="handleCancel"
        @primary="handlePrimary"
      ></salesman>
    </el-dialog>
    <!--审批关系设置弹窗-->
    <el-dialog title="审批关系设置" :visible.sync="dialogApproveVisible" width="700px">
      <div class="btn-down">
        <el-button type="primary" size="small">下载表格模式</el-button>
      </div>
      <el-upload
        class="upload-wrapper"
        ref="upload"
        :limit="1"
        :action="uploadApproveUrl"
        :before-upload="beforeFillUpload"
        :on-progress="progressUpload"
        :on-success="successUpload"
        :auto-upload="false"
        :on-error="errorUpload"
      >
        <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
        <div slot="tip" class="el-upload__tip">
          提示：
          <p>* 您需要先导入业务员和审批人</p>
          <p>* 在表格中可设置业务员由哪些审批人进行审批</p>
          <p>* 可设置一个业务员由多个审批人进行审批，但最多为10个审批人</p>
          <p>* 业务员不可为空且不可重复，审批人可为空</p>
          <p>* 一个表格最多添加一千条数据，若超过一千条，需要分多批导入</p>
        </div>
      </el-upload>
      <el-button class="btn-import" type="success" @click="submitUpload" :loading="loading">确认导入</el-button>
    </el-dialog>
  </div>
</template>

<script>
import Salesman from './salesman'
import { tableMix } from '@/common/js/mixinTable'
import { getUserList, getUserGroupList, editUserGroup, batchEditUserGroup, batchEditPermission, importApprove } from '@/api/mallapp/plugin/recharge'

export default {
  mixins: [tableMix],
  data () {
    const checkGroupName = (rule, value, callback) => {
      let reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
      let flag = reg.test(this.groupForm.group_name)

      if (flag === false) {
        return callback(new Error('请输入中文'))
      } else {
        if (this.groupForm.group_name.length < 2 || this.groupForm.group_name.length > 30) {
          return callback(new Error('请输入2-30个汉字'))
        } else {
          callback()
        }
      }
    }
    const checkPermissionNumber = (rule, value, callback) => {
      if (!Number.isInteger(Number(value))) {
        return callback(new Error('请输入整数值'))
      }
      if (value > 9999999 || value < 0) {
        return callback(new Error('请输入0～9999999的数字'))
      }
      callback()
    }
    return {
      form: {
        state: '', // 用户状态： ’‘全部状态， ‘1‘ 正常 ’2‘禁用
        sel_type: '1', // 搜索类型 ： ‘1’ 按照手机号搜索 ‘2’按照姓名搜索
        keyword: '', // 关键字
        group_id: '', // 用户分组id： ‘’全部用户, ’0‘未分组用户， 其他表示分组id：如 ‘2223’
        second_name: '' // 二级行名称
      },
      group: {
        list: []
      },
      editGroupId: '',
      dialogVisible: false,
      dialogGroupText: '新建分组',
      groupForm: {
        type: '1', // 类型：‘1’新增分组， ‘2’编辑分组
        group_id: '',
        group_name: '',
        second_name: ''
      },
      groupFormRules: {
        group_name: [{ required: true, validator: checkGroupName, trigger: 'blur' }]
      },
      selectUsers: [],
      dialogGroupVisible: false,
      groupRadio: '',
      dialogGroupPermissionVisible: false,
      permissionForm: {
        once_max: '', // 单次充值上限
        day_max: '', // 单日充值上限
        month_max: '' // 单月充值上限
      },
      permissionFormRules: {
        once_max: [{ validator: checkPermissionNumber, trigger: 'blur' }],
        day_max: [{ validator: checkPermissionNumber, trigger: 'blur' }],
        month_max: [{ validator: checkPermissionNumber, trigger: 'blur' }]
      },
      dialogSalesmanVisible: false,
      salesmanText: '添加业务员',
      salesmanType: 'add',
      manId: '',
      dialogApproveVisible: false,
      loading: false,
      uploadApproveUrl: importApprove()
    }
  },
  created () {
    this._getUserGroupList()
  },
  methods: {
    getTableData () {
      this.tableSubmitData.form = this.form
      return getUserList(this.tableSubmitData)
    },
    handleGetGroupUser (id) {
      this.form.group_id = id
      this.$refs.form.resetFields()
      this._getTableData()
    },
    showEditGroupIcon (id) {
      this.editGroupId = id
    },
    hideEditGroupIcon () {
      this.editGroupId = ''
    },
    btnAddUserGroup () {
      this.dialogVisible = true
      this.$refs.groupForm.resetFields()
      this.dialogGroupText = '新建分组'

      this.groupForm.type = '1'
      this.groupForm.group_id = ''
      this.groupForm.group_name = ''
      this.groupForm.second_name = ''
    },
    handleAddUserGroup () {
      this.$refs.groupForm.validate((valid) => {
        if (valid) {
          this._editUserGroup()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    btnEditGroup (item) {
      this.dialogVisible = true
      this.$refs.groupForm.resetFields()
      this.dialogGroupText = '编辑分组'
      this.groupForm.type = '2'
      this.groupForm.group_id = item.group_id
      this.groupForm.group_name = item.group_name
      this.groupForm.second_name = item.second_name
    },
    // 选择员工
    handleSelectionChange (data) {
      let ret = []
      data.map(item => {
        ret.push(item.userid)
      })
      this.selectUsers = ret
      console.log(this.selectUsers)
    },
    // 批量编辑分组
    btnEditUserGroup () {
      if (!this.selectUsers.length) {
        this.$message({
          message: '请选择用户',
          type: 'warning'
        })
        return
      }
      this.dialogGroupVisible = true
    },
    handleEditUserGroup () {
      if (this.groupRadio === '') {
        this.$message({
          type: 'warning',
          message: '请选择分组'
        })
        return
      }
      this._batchEditUserGroup()
    },
    // 批量设置权限
    btnShowPremission () {
      if (!this.selectUsers.length) {
        this.$message({
          message: '请选择用户',
          type: 'warning'
        })
        return
      }
      this.dialogGroupPermissionVisible = true
    },
    handleEditPermission () {
      this.permissionForm.usersId = this.selectUsers.join(',')
      this._batchEditPermission()
    },
    // 添加业务员按钮
    addSalesman () {
      this.salesmanType = 'add'
      this.salesmanText = '添加业务员'
      this.dialogSalesmanVisible = true
    },
    // 编辑业务员
    btnEditSalesman (man) {
      this.salesmanType = 'edit'
      this.salesmanText = '编辑业务员'
      this.dialogSalesmanVisible = true
      this.manId = man.userid
    },
    // 业务员弹窗取消
    handleCancel () {
      this.dialogSalesmanVisible = false
    },
    handlePrimary () {
      this.dialogSalesmanVisible = false
      this._getUserGroupList()
      this._getTableData()
    },
    // 审批关系设置
    btnApprove () {
      this.dialogApproveVisible = true
    },
    handleApprove () {

    },
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
        message: `${response.data.success_num}条业务员设置成功, ${response.data.error_num}条业务员设置失败`,
        type: 'success'
      })
      this.$refs.upload.clearFiles()
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
    _getUserGroupList () {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getUserGroupList().then(res => {
        loading.close()
        this.group = res.data
      })
    },
    _editUserGroup () {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      editUserGroup(this.groupForm).then(res => {
        loading.close()
        this.dialogVisible = false
      })
    },
    _batchEditUserGroup () {
      let data = {}
      data.group_id = this.groupRadio
      data.users_id = this.selectUsers.join(',')
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      batchEditUserGroup(data).then(res => {
        loading.close()
        this.$message({
          message: '设置成功',
          type: 'success'
        })
        this.dialogGroupVisible = false
        this._getUserGroupList()
        this._getTableData()
      })
    },
    _batchEditPermission () {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      batchEditPermission(this.permissionForm).then(() => {
        loading.close()
        this.$message({
          message: '设置成功',
          type: 'success'
        })
        this.dialogGroupPermissionVisible = false
        this._getUserGroupList()
        this._getTableData()
      })
    }
  },
  components: {
    Salesman
  }
}
</script>

<style lang='scss' scoped>
@import "@/common/scss/variable.scss";

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
