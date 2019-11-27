<template>
  <div class="muser-list-wrapper user_list">
    <div class="mcard">
      <div class="title">用户列表</div>
      <div class="muser-header">
        <el-row class="muser-header-tit">
          <el-col :span="4" class="cell">今日新增</el-col>
          <el-col :span="4" class="cell">昨日新增</el-col>
          <el-col :span="4" class="cell">本周新增</el-col>
          <el-col :span="4" class="cell">本月新增</el-col>
          <el-col :span="4" class="cell">总数</el-col>
          <el-col :span="4" class="cell">用户总金额</el-col>
        </el-row>
        <el-row class="muser-header-content">
          <el-col :span="4" class="cell">{{userDashboard.todat}}人</el-col>
          <el-col :span="4" class="cell">{{userDashboard.yesterday}}人</el-col>
          <el-col :span="4" class="cell">{{userDashboard.week}}人</el-col>
          <el-col :span="4" class="cell">{{userDashboard.month}}人</el-col>
          <el-col :span="4" class="cell">{{userDashboard.all}}人</el-col>
          <el-col :span="4" class="cell">{{0}}金额</el-col>
        </el-row>
      </div>
    </div>
    <div class="mcard">
      <div class="title">搜索条件</div>
      <el-form :model="form" :inline="true" ref="form" class="user-search" size="small">
        <el-form-item prop="add_start_time">
          <el-date-picker class="width16" type="date" placeholder="加入时间起始"  value-format="yyyy-MM-dd 00:00:00" v-model="form.createTimeBegin"></el-date-picker>
        </el-form-item>
        <span class="line">-</span>
        <el-form-item prop="add_end_time">
          <el-date-picker class="width16" type="date" placeholder="加入时间结束"  value-format="yyyy-MM-dd 00:00:00" v-model="form.createTimeEnd"></el-date-picker>
        </el-form-item>
        <el-form-item prop="add_type">
          <el-select class="width13" v-model="form.registerForm" placeholder="注册来源">
            <el-option label="全部" value=""></el-option>
            <el-option label="后台创建" value="0"></el-option>
            <el-option label="平台注册" value="1"></el-option>
            <el-option label="表格导入" value="2"></el-option>
            <el-option label="手机号注册" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="state">
          <el-select class="width13" v-model="form.status" placeholder="用户状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="正常" value="0"></el-option>
            <el-option label="禁用" value="1"></el-option>
            <el-option label="删除" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="sel_type">
          <el-select class="width13" v-model="form.selType" placeholder="请选择搜索条件">
            <!-- <el-option label="全部" value=""></el-option> -->
            <el-option label="手机号" value="1"></el-option>
            <el-option label="用户名" value="2"></el-option>
            <el-option label="用户账号" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="width16" prop="keyword">
          <el-input v-model="form.keyword" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">搜索</el-button>
          <el-button @click="resetForm()">重置</el-button>

        </el-form-item>
      </el-form>
      <div class="muser-content clearfix">
        <div class="muser-left">
          <div class="left-item all"
               @click="handleGetGroupUserAll('')"
               :class="{'active': userTagId === ''}">全部用户（{{userDashboard.all}}）</div>
          <div class="left-item group-item"
               v-for="(item, index) in groupList"
               :class="{'active': userTagId === item.groupId}"
               @click="handleGetGroupUser(item.groupId)"
               :key="index">
            <div class="groupsList" :title=item.groupName>
              {{item.groupName}}
            </div>
             <span class="removeBtn"  @click="removeGroupUser(item.groupId)">x</span>  
          </div>
          <div class="left-item btn"
               @click="handleAddUserGroup"
          >
            <i class="el-icon-plus"></i>
            新建群组</div>
        </div>
        <div class="muser-right">
          <div class="btn-wrapper">
            <el-button type="primary" size="small" @click="btnEditUserGroup" v-permit="'userList:group'">设置群组</el-button>
            <el-button type="primary" size="small" @click="handleUserBatchEdit(1)" v-permit="'userList:disable'">禁用</el-button>
            <el-button type="primary" size="small" @click="handleUserBatchEdit(0)" v-permit="'userList:enable'">启用</el-button>
            <el-button @click="exportUser" size="small" type="primary" v-permit="'userList:add'">创建用户</el-button>
          </div>
          <el-table
                  :data="userList"
                  width="100%"
                  ref="multipleTable"
                  @select="choose"
                  @select-all="choose"
                  @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55"/>
            <el-table-column
                    type="index"
                    label="序号"
                    width="50"/>
            <el-table-column
                    prop="userId"
                    label="用户ID"/>
            <el-table-column
                    prop="telephone"
                    label="手机号"/>
            <el-table-column
                    prop="userName"
                    label="姓名"/>
            <el-table-column
                    prop="createTime"
                    label="创建时间"/>
            <el-table-column
                    prop="status"
                    align="center"
                    label="状态">
              <!--<template slot-scope="scope">-->
                <!--&lt;!&ndash;{{scope.row.status === 0 ? '正常': '禁用'}}&ndash;&gt;-->
              <!--</template>-->
            </el-table-column>
            <el-table-column
                    align="center"
                    label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="btnEditUserItem(scope.row)"  v-permit="'userList:edit'">编辑</el-button>
                <el-button type="text" size="small" @click="handleToUserDetail(scope.row)"  v-permit="'userList:details'">详情</el-button>
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
        </div>
      </div>
    </div>
    <!--给用户设置群组-->
    <el-dialog
        title="设置群组"
        :visible.sync="dialogVisible"
         width="80%"
        :before-close="handeleCancel">
      <div class="mbottom">
          <div class="goods-fitter">
            <el-form label-width="100px" size="small" :model="form">
              <div class="search-wrapper">
                <h4 class="title">选择群组</h4>
                <div class="search-base" style='position: relative;left: -20px;'>
                  <el-row>
                       <el-col :span="8">
                        <el-col :span="24">
                            <el-col :span="24">
                                  <el-form-item label="群组:">
                                      <el-select v-model="groupListId" placeholder="请选择">
                                        <el-option
                                          v-for="(item) in groupList"
                                          :key="item.groupId"
                                          :label="item.groupName"
                                          :value="item.groupId">
                                        </el-option>
                                      </el-select>    
                                 </el-form-item>
                            </el-col>
                        </el-col>
                      </el-col>
                      <!-- <el-col :span="1" class="btn_right">
                        <el-button type="primary" size="small" @click="selectBranch()" >搜索</el-button>
                      </el-col> -->
                  </el-row>
                </div>
         </div>
        </el-form>  
       </div>
      </div> 
      <div class="mbottom">
          <div class="goods-fitter">
            <el-form label-width="150px" size="small" :model="form">
              <div class="search-wrapper">
                <h4 class="title">用户列表</h4>
                <template>
                      <div style="margin: 0 20px 20px 0;">
               <el-table  :data="tableDataUser"
                  stripe
                  style="width: 100%"
                  border
                  @selection-change="handleSelectionChange11"
                  >
                <el-table-column type="selection" label="选择" align="center" width="55"></el-table-column>
                <el-table-column label="用户ID" align="center" prop="userId"></el-table-column>
                <el-table-column label="手机号" align="center" prop="telephone">
                </el-table-column>
                <el-table-column label="姓名" align="center" prop="userName">
                </el-table-column>
                <el-table-column label="创建时间" align="center" prop="createTime">
                </el-table-column>
                <el-table-column label="状态" align="center" prop="status">
                </el-table-column>
              </el-table>
              <div class="pagination" style='text-align: right; margin-top: 20px;'>
                <el-pagination
                  @size-change="handleSizeChange11"
                  @current-change="handleCurrentChange11"
                  :current-page="pagination11.current_page"
                  :page-sizes="[10, 30, 50, 100]"
                  :page-size="pagination11.page_size"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="pagination11.total_count"
                ></el-pagination>
              </div>
          </div>
                </template>
              </div>
            </el-form>
          </div>
      </div> 
      <span slot="footer" class="dialog-footer">
        <el-button @click="handeleCancel">取 消</el-button>
        <el-button type="primary" @click="handleEditUserGroup">确 定</el-button>
      </span>
    </el-dialog>

    <!--编辑用户信息弹窗-->
    <el-dialog
            :title="userTitle"
            :visible.sync="dialogVisibleUser"
            :close-on-click-modal="false"
            width="60%">
       <div class="muser-add-wrapper">
            <div class="mcard">
                <div class="title">{{ userTitle }}</div>
                <div class="mcard-content">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
                        <el-form-item label="头像：" class="upload-img-form">
                                <el-upload
                                :disabled = 'edit'
                                class="avatar-uploader"
                                :action="action"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                accept="image/jpeg, image/png"
                                >
                            <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar"  prop="file" style="max-width:200px;">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        </el-form-item>
                        <el-form-item label="登录账号：" prop="accountNumber">
                            <el-input style="position: fixed;bottom: -99999px;"  :disabled = 'edit'></el-input>
                            <el-input v-model="ruleForm.accountNumber"  :disabled = 'edit'></el-input>
                        </el-form-item>
                        <el-form-item label="原密码：" prop="password"  v-if = '!edit'>
                            <el-input style="position: fixed;bottom: -99999px;" type="password"></el-input>
                            <el-input v-model="ruleForm.password" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码：" prop="password" v-if = '!edit'>
                            <el-input type="password" style="position: fixed;bottom: -99999px;"></el-input>
                            <el-input v-model="ruleForm.newPassword" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="用户名称：" prop="userName">
                            <el-input v-model="ruleForm.userName" :disabled = 'edit'></el-input>
                        </el-form-item>
                        <el-form-item label="真实姓名：" prop="realName">
                            <el-input v-model="ruleForm.realName" :disabled = 'edit'></el-input>
                        </el-form-item>
                        <el-form-item label="性别：" prop="gender">
                            <el-radio-group v-model="ruleForm.sex" :disabled = 'edit'>
                                <el-radio label="1">男</el-radio>
                                <el-radio label="2">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="手机号：" prop="telephonNuber">
                            <el-input v-model="ruleForm.telephonNuber" :disabled = 'edit'></el-input>
                        </el-form-item>
                        <el-form-item label="QQ号：" prop="QQ">
                            <el-input v-model="ruleForm.QQ" :disabled = 'edit'></el-input>
                        </el-form-item>
                        <el-form-item label="生日：" prop="birthday">
                            <el-date-picker
                                   :disabled = 'edit'
                                    v-model="ruleForm.value1"
                                    type="date"
                                    value-format="yyyy-MM-dd 00:00:00"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="联系地址：" prop="adrees">
                            <el-input v-model="ruleForm.adrees" :disabled = 'edit'></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleUser = false">取 消</el-button>
        <el-button type="primary" @click="handleEditUserItem">确 定</el-button>
      </span>
    </el-dialog>

    <!--禁用和启用-->
    <el-dialog
            :title=title
            :visible.sync="editStatus"
            width="30%"
            >
      <div class="editStatus">
        <!--<div class="radio">-->
          <!--<el-radio v-model="radio" label="0">正常</el-radio>-->
          <!--<el-radio v-model="radio" label="1">不禁用</el-radio>-->
        <!--</div>-->
        <div class="jinyong">
          <el-input type="textarea" v-model="reasonDisabling" class="textarea"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editStatus = false">取 消</el-button>
    <el-button type="primary" @click="_editBatchUser">确 定</el-button>
  </span>
    </el-dialog>
    <addUser/>
  </div>
</template>
<script>
  import { getUserStatistics, getUserList, getUserListSig, getUserGroup, addUserGroup, editiUserGroup, editBatchUser, editUserItem ,addGroupUser , removeGroupUser} from '@/api/mallapp/user/index'
  import addUser from '../addUser/index'
  import { throttleTipPop } from '@/utils/throttle'
import encryption from "@/common/js/encryption";
  export default {
    components:{
      addUser
    },
    name: 'MuserList',
    data () {
      return {
          userTitle:'',
          edit :false,
          action:'',
          ruleForm: {
            imageUrl: '',
            accountNumber:'',
            password:'',
            newPassword:'',
            userName:'',
            realName:'',
            sex:'',
            telephonNuber:'',
            QQ:'',
            value1:'',
            adrees:'',
            userId:''
        },
        rules: {
            accountNumber: [
                {required: true, message: '请输入登录账号', trigger: 'blur'},
            ],
            userName: [
                {required: true, message: '请输入用户姓名', trigger: 'blur'},
            ],
            sex: [
                {required: true, message: '请选择性别', trigger: 'change'}
            ],
            password: [
                { required: true, message: "请输入密码", trigger: "blur" },
                { min: 5, message: "密码不能小于5位", trigger: "blur" }
            ],
        },
        distinguish:1,
        addUserDisabling:false,//添加用户的弹框
        title:'',
        status:'',
        editStatus:false,// 修改用户状态弹框
        reasonDisabling:'',// 禁用理由
        userDashboard: {},
        joiningMethod:'',//加入方式
        form: {
          createTimeBegin: '', // 加入时间起始
          createTimeEnd: '', // 加入时间结束
          registerForm: '', // 加入方式  0.后台创建 1.平台注册, 2.表格导入 3.手机号注册
          status: '', // 全部状态  1 启用, 2.禁用
          selType: '1', // 默认查找所有  1.手机号, 2.姓名, 3.用户ID
          keyword: '' // 关键词
        },
        arrList:[], //选择中的用户id
        groupList: [],
        groupListId:'',
        tableDataUser:[],
        userIds:[],
        userList: [],
        pagination: {
          current_page: 1,
          page_size: 10,
          total_count: 0
        },
         pagination11: {
          current_page: 1,
          page_size: 10,
          total_count: 0
        },
        selectUsers: '',
        userTagId: '', // 用户所属分组
        dialogVisible: false,
        groupRadio: '',
        dialogVisibleUser: false,
        selectioned:'',
        formUerEdit: {
          telephone: '',
          userName: '',
          amount: '',
          sex: '',
          user_tag_id: '',
          textarea: ''
        }
      }
    },
    async created () {
      // 获取列表用户相应数据
      this.getUserStatistics()
      //默认获取所有人
      this._getUserList()
      // 获取所有分组
      this._getUserGroup()

      this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
    },
    methods: {
      resetForm () {
        this.reset()
      },
      getUserStatistics(){
          const projectId = 1
          getUserStatistics(projectId).then( result =>{
             if(result.code === 200){
              this.userDashboard = result.data
            }
          })
        
      },
    //成功之后
      handleAvatarSuccess(res,file){
          this.ruleForm.imageUrl = res.data.domain + res.data.filePath
      },
      //情況表單
      reset() {
        this.form = {
          createTimeBegin: '',
          createTimeEnd: '',
          registerForm: '',
          status: '',
          selType: '1',
          keyword: '',
        }
        this._getUserList()
      },
      //创建用户 弹框
      exportUser () {
        this.$store.commit('SET_ADDUSER',true)
      },
      handleSizeChange (val) {
        this.pagination.page_size = val
        this._getUserList()
      },
      handleCurrentChange (val) {
        this.pagination.current_page = val
        this._getUserList()
      },
      handleSizeChange11 (val) {
        this.pagination11.page_size = val
        this.tableData ()
      },
      handleCurrentChange11 (val) {
        this.pagination11.current_page = val
       this.tableData ()
      },

      // 创建群组
      handleGetGroupUser (id) {
        this.userTagId = id
        this.$refs.form.resetFields()
        this.distinguish = 2
        this.pagination.current_page = 1
        this._getUserList()
      },
      // 点击全部用户
      handleGetGroupUserAll(id){
        this.userTagId = id
        this.$refs.form.resetFields()
        this.distinguish = 1
        this.pagination.current_page = 1
        this._getUserList()
      },
      // 新创建群组
      handleAddUserGroup () {
        this.$prompt('请输入群组名称', '添加群组', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S+/,
          inputErrorMessage: '群组名称不能为空'
        }).then((val) => {
          // let loading = this.$loading({
          //   background: 'rgba(255,255,255,0.1)',
          //   text: '加载中，请稍后...'
          // })
          const obj={
            groupName:val.value,
            groupType:0
          }
          addUserGroup(obj).then(() => {
            this.$message({
              type: 'success',
              message: '群组新建成功'
            })
            this._getUserGroup()
          }).catch(() => {})
        }).catch(() => {})
      },
      // 删除分组
      removeGroupUser(id){
         var data={
           groupId : id
         } 
         removeGroupUser(data).then( res =>{
            if( res.code == 200 ){
               this.$message({
                message: '删除成功！',
                type: 'success'
              })
              this.handleGetGroupUserAll('')
              this.getUserStatistics()
              this._getUserGroup()
            }
         })
      },
      // 用户列表选择（单选）
       choose (selection, row){
          this.selectUsers = ''
          this.$refs.multipleTable.clearSelection()
          if (selection.length === 0) { // 判断selection是否有值存在
            return
          }
          if (row) {
            this.selectioned = row
            this.$refs.multipleTable.toggleRowSelection(row, true)
            if( row.length ){
             this.selectUsers = row[0].userId
            }
         }
    },
     handleSelectionChange (row) {
       if (row.length === 0) {
         this.selectioned = null
       }else if( row.length >1  ){
          this.selectioned = null
       }else{
         this.selectUsers = row[0].userId
       }
      },
      // 设置群组
      btnEditUserGroup () {
        this.groupListId =""
        this.userIds = []
        this.dialogVisible = true
        this.tableData ()
      },
      // 获取弹框用户列表
      async tableData (){
         let data={
          pageNum: Number(this.pagination11.current_page),
          pageSize:Number(this.pagination11.page_size),
        }
       
          var res = await  getUserList(data)
          if(res.code ===200){
          this.tableDataUser = res.data.list
          this.tableDataUser.map((item,index)=>{
            if(item.status==0){
              this.tableDataUser[index].status='正常'
            }else  if(item.status==1){
              this.tableDataUser[index].status='禁用'
            }else if(item.status==2){
              this.tableDataUser[index].status='锁定'
            }
          })
          this.pagination11.total_count = res.data.total
         }
      },
      selectBranch(){

      },
      // 弹框设置群组取消
      handeleCancel(){
         if(  this.userIds.length ){
              this.$confirm('确定放弃已选择的用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                 this.dialogVisible = false
                 this.userIds = []
              }).catch(() => {
                          
              });
         }else{
            this.dialogVisible = false
            this.userIds = []
         }
      },
      // 弹框设置群组表格选择
      handleSelectionChange11(data){
        this.userIds = data.map(item=>{
          return item.userId
        })
      },
      // 弹框设置群组表格确定
      handleEditUserGroup () {
        if( this.groupListId =="" || this.groupListId == undefined  ){
            this.$message({
              message: '请选择群组！',
              type: 'warning'
            })
            return
        }
        if( this.userIds.length<=0  ){
            this.$message({
              message: '请选择用户！',
              type: 'warning'
            })
            return
        }

        let data = {
          userIds:this.userIds,
          groupId:this.groupListId
        }

        addGroupUser(data).then(res => {
          this.dialogVisible = false
          this.distinguish = 2 
          this.userTagId = this.groupListId
          this._getUserGroup()
          this._getUserList()
          this.dialogVisible = false
        })
      },
      // 禁用或启用
      handleUserBatchEdit (val) {
        if (this.selectUsers==''||this.selectUsers==undefined) {
          throttleTipPop(this,'warning','请选择用户')
          return
        }
        let tip = ''
        let btnConfirm = ''
        if (val === 0) {
          tip = '启用后，用户将正常登录'
          btnConfirm = '启用'
          this.title = '启用理由'
        } else if (val === 1){
          tip = '禁用后，用户将无法登录'
          btnConfirm = '禁用'
          this.title = '禁用理由'
        }
        this.$confirm(tip, '提示', {
          confirmButtonText: btnConfirm,
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.editStatus = true    //出现弹框
          this.status = val
          // this._editBatchUser(val)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },

      // 单个用户编辑
      btnEditUserItem (data) {
        this.edit = false
        this.showInfo(data)
        this.userTitle = "编辑用户"
        if ( this.$refs['ruleForm'] !== undefined ) {
            this.$refs['ruleForm'].resetFields();
        }
      },
      // 用户编辑确定
      handleEditUserItem () {
        let data = {}
        data.userId = this.ruleForm.userId
        data.headImgUrl = this.ruleForm.imageUrl
        data.userAccount = this.ruleForm.accountNumber   // 接口没有
        const password = JSON.parse(JSON.stringify(this.ruleForm.password))
        data.password = encryption.encrypt(password, "_fuyuanai@Maige_");
        const newPassword = JSON.parse(JSON.stringify(this.ruleForm.newPassword))
        data.newPassword = encryption.encrypt(newPassword, "_fuyuanai@Maige_");
        data.userName = this.ruleForm.userName
        data.realName = this.ruleForm.realName
        data.sex = Number(this.ruleForm.sex)
        data.telephone = this.ruleForm.telephonNuber   // 接口没有
        data.qq = this.ruleForm.QQ     
        data.birthday = this.ruleForm.value1
        data.address =this.ruleForm.adrees   // 接口没有
        this._editUserItem(data)
      },
      // 详情
      handleToUserDetail (data) {
        this.edit = true
        this.showInfo(data)
        this.userTitle = '查看用户详情'
        // this.$router.push({
        //   path: `/muser/detail/${data.userId}`,
        //   params:data.userId
        // })
      },
      showInfo(data){
        this.ruleForm.userId =  data.userId
        this.ruleForm.imageUrl =  data.headImgUrl
        this.ruleForm.accountNumber =  data.userAccount
        this.ruleForm.password =  ""
        this.ruleForm.newPassword =  ""
        this.ruleForm.userName =  data.userName
        this.ruleForm.realName =  data.realName
        this.ruleForm.sex = data.sex+''
        this.ruleForm.telephonNuber =  data.telephone
        this.ruleForm.QQ =  data.qq
        this.ruleForm.value1 =  data.birthday
        this.ruleForm.adrees =  data.address

        this.dialogVisibleUser = true
      },
      // 获取分组
      _getUserGroup () {
        var data = {
          groupType:0
        }
        getUserGroup(data).then(res => {
          this.groupList = res.data
        })
      },
      //查询
      submitForm(){
        this.distinguish = 1 
        this.userTagId = ''
        this._getUserList ()
      },
      // 获取全部用户或者每个分组的用户
      async  _getUserList () {
        if( this.distinguish == 1  ){
         let data={
          pageNum: Number(this.pagination.current_page),
          pageSize:Number(this.pagination.page_size),
          createTimeBegin:this.form.createTimeBegin,
          createTimeEnd:this.form.createTimeEnd,
          registerForm:this.form.registerForm,
          status:this.form.status,
        }
        if( this.form.selType == 1 ) {
            data.telephone = this.form.keyword
        }else if( this.form.selType == 2 ){
            data.userName = this.form.keyword
        } else  if( this.form.selType == 3 ){
            data.userAccount = this.form.keyword
        }

        var res = await  getUserList(data)
        if(res.code ===200){
        this.userList = res.data.list
        this.userList.map((item,index)=>{
          if(item.status==0){
            this.userList[index].status='正常'
          }else  if(item.status==1){
            this.userList[index].status='禁用'
          }else if(item.status==2){
            this.userList[index].status='锁定'
          }
        })
        this.pagination.total_count = res.data.total
        }

        }else if( this.distinguish == 2 ){
           let data={
            pageNum: Number(this.pagination.current_page),
            pageSize:Number(this.pagination.page_size),
            groupId:this.userTagId,
            groupType:0,
          }
           var res = await  getUserListSig(data)
           if(res.code ===200){
            this.userList = res.data.list
            this.userList.map((item,index)=>{
              if(item.userStatus==0){
                this.userList[index].status='正常'
              }else  if(item.userStatus==1){
                this.userList[index].status='禁用'
              }else if(item.userStatus==2){
                this.userList[index].status='锁定'
              }
            })
          this.pagination.total_count = res.data.total
         }
        }
      },
      //修改状态（启用或禁用）
      async _editBatchUser () {
        this.editStatus = false  //关闭弹窗
        let data = {}
        // data.userId = this.selectUsers.join(',')
        data.userId = this.selectUsers
        data.userStatus = this.status
        data.reason=this.reasonDisabling
        const res = await editBatchUser(data)
        if(res.code === 200){
          this.selectUsers = ''       //清除选中的用户
          this.reasonDisabling=''  //清除内容
          // loading.close()
          this._getUserList()
        }
      },
      async _editUserItem (data) {
        // let loading = this.$loading({
        //   background: 'rgba(255,255,255,0.1)',
        //   text: '加载中，请稍后...'
        // })
        const res = await editUserItem(data)
        if(res.code === 200){
          this.dialogVisibleUser = false
          this.$message({
          message: res.message,
          type: 'success'
        });
          // loading.close()
          // this._getUserGroup()
          this._getUserList()
        }
      }
    }
  }
</script>
<style scoped>
 .user_list >>> .el-dialog__body{
    padding: 0 !important;
    background: none !important;
  }
</style>

<style lang="scss" scoped>
  @import '@/common/scss/variable.scss';
  .el-upload{
    display: inline-block;
    text-align: center;
    cursor: pointer;
    outline: 0;
  }
  .muser-add-wrapper .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
}
  .modal{
    padding: 20px 0;
    background: #fff;
  }
  .modal h4{
    border-left: 4px solid #4a99fa;
    padding-left: 5px;
    margin-bottom: 20px;
  }
  .goods-fitter .search-wrapper {
      padding: 20px;
      border: 1px solid #d7e0f1;
      background: #fff;
  }
  .goods-fitter .search-wrapper .title {
    margin-left: -20px;
    font-size: 16px;
    font-weight: 400;
    color: 3333;
    padding-left: 10px;
    line-height: 1.4;
    border-left: 4px solid #4C86F4;
    margin-bottom: 10px;
}
  .muser-list-wrapper {
    margin: 20px;
    .mcard {
      margin-bottom: 20px;
    }
    .muser-header {
      padding: 20px;
      background: #f7faff;
      .muser-header-tit {
        .cell {
          font-size: 16px;
        }
      }
      .muser-header-content {
        .cell {
          color: #3ac691;
        }
      }
      .cell {
        padding: 8px;
        line-height: 1.5;
        font-size: 14px;
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
            background: #DEE9F7;
            color: $themeColor;
          }
          &.btn {
            border-top: 1px solid #d7e0f1;
          }
          &.group-item {
            padding: 0 10px;
            text-align: left;
            position: relative;
            span {
              float: right;
            }
            .removeBtn{
              float: right;
              position: absolute;
              right: 12px;
              top: 0;
              color: #555;
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
    .editStatus{

      .radio{
        text-align: center;
        margin-bottom: 20px;
      }
    }
    .jinyong{
      /deep/.el-textarea__inner{
        margin-top: 10px;
        width: 100%;
        height: 150px;
        resize:none;
        box-sizing: border-box;
        padding: 10px;
      }
    }
  }
.groupsList{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
