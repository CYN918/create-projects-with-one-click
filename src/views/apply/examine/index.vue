<template>
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">搜索条件</h4>
            <div class="search-base">
              <el-row>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="审核状态：">
                        <el-col :span="23">
                            <el-select
                                class="el-select-width"
                                v-model="form.auditStatus"
                                placeholder="请选择"
                                @change="_getAgencyexamine(true)"
                            >
                                <el-option label="待审核" value="0"></el-option>
                                <el-option label="审核通过" value="1"></el-option>
                                <el-option label="审核未通过" value="2"></el-option>

                            </el-select>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                 <el-col :span="5">
                  <el-col>
                    <el-form-item label="关键词：">
                        <el-col :span="23">
                            <el-input v-model="form.keywords" clearable placeholder="请输入经销商名称/联系人等"></el-input>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small"  @click="_getAgencyexamine(true)">查询</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mcard">
      <el-row class="operate mbottom">
          <el-col :span="21">
          <el-button type="primary" size="small"  @click="add" v-permit="'dealers:new'">新增</el-button>
        </el-col>
        <el-col :span="3">
        </el-col>
      </el-row>
      <el-table   :data="tableData"  border style="width: 100%" stripe>
        <el-table-column  type="index"  label="序号" align="center" width="55"></el-table-column>
        <el-table-column  prop="auditStatus"  label="状态" align="center" width="100">
          <template slot-scope="scope">
            {{scope.row.auditStatus == 0?'待审核':scope.row.auditStatus == 1?'审核通过':scope.row.auditStatus == 2?'审核未通过':''}}
          </template>
        </el-table-column>
        <el-table-column  prop="changeRemark"  label="审核说明" align="center"  width="100">
          <template slot-scope="scope">
            <!--<div class="txt_left">操作: {{scope.row.changeRemark}}</div>
            <div class="txt_left">审核人：</div>
            <div v-for="(detail,index) in scope.row.auditDetails" class="txt_left">{{index+1}}.{{detail.sysuserName}}{{detail.roleName?'('+detail.roleName+')':''}}
              <span v-if="scope.row.auditStatus==0&& detail.auditResult==0">待审核
                &lt;!&ndash;<el-button type="success" size="small" @click="editTaskUserView(detail.taskId)" style="padding: 3px 3px;">重新指派</el-button>&ndash;&gt;
              </span>
              <span v-if="detail.auditResult==1">通过</span>
              <span v-if="detail.auditResult==2">未通过</span>
            </div>
            <div v-if="scope.row.auditDetails.length==0" class="txt_left">
              &lt;!&ndash;<el-button type="success" size="small" @click="addTaskUserView(scope.row.auditId)" style="padding: 3px 3px;">添加审核人</el-button>&ndash;&gt;
            </div>-->
            <div class="txt_left">{{scope.row.changeRemark}}</div>
          </template>
        </el-table-column>
        <!--<el-table-column  prop="verifyRemark"  label="审核理由" align="center"  width="100">
        </el-table-column>-->
        <el-table-column  prop="agencyName"  label="经销商信息" align="center"  width="230">
          <template slot-scope="scope">
            <div class="txt_left">经销商名：{{scope.row.formData.agencyName}}</div>
            <div class="txt_left">账号：{{scope.row.formData.sysuserAccount}}</div>
          </template>
        </el-table-column>
        <el-table-column   label="联系人信息" align="center" >
          <template slot-scope="scope">
            <div class="txt_left">业务联系人：{{scope.row.formData.commonContactName}}</div>
            <div class="txt_left">联系电话：{{scope.row.formData.commonContactTel}}</div>
            <div class="txt_left">手机：{{scope.row.formData.commonContactPhone}}</div>
            <!--<div class="txt_left">QQ：{{scope.row.formData.commonContactQq}}</div>-->
            <div class="txt_left">邮箱：{{scope.row.formData.commonContactEmail}}</div>
            <div class="txt_left">微信：{{scope.row.formData.commonContactWechat}}</div>
          </template>
        </el-table-column>
        <el-table-column  prop="name"  label="公司领导信息" align="center" >
          <template slot-scope="scope">
            <div class="txt_left">姓名：{{scope.row.formData.leaderContactName}}</div>
            <div class="txt_left">手机：{{scope.row.formData.leaderContactPhone}}</div>
            <div class="txt_left">联系电话：{{scope.row.formData.leaderContactTel}}</div>
            <div class="txt_left">地址：{{scope.row.formData.address}}</div>
          </template>
        </el-table-column>
        <el-table-column  prop="name"  label="付款信息" align="center" >
          <template slot-scope="scope">
            <div class="txt_left">开户名称：{{scope.row.formData.ticketCompany}}</div>
            <div class="txt_left">开户行：{{scope.row.formData.ticketBank}}</div>
            <div class="txt_left">开户账号：{{scope.row.formData.ticketAccount}}</div>
            <div class="txt_left">税号：{{scope.row.formData.ticketTax}}</div>
          </template>
        </el-table-column>
        <el-table-column   label="营业执照" align="center" width="140">
          <template slot-scope="scope">
            <img :src="scope.row.formData.businessLicense" alt="" class="img_size">
            <div v-if="scope.row.formData.businessLicense">
               <el-button type="primary" size="small"  @click="open(scope.row.formData.businessLicense)">点击查看大图</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column  prop="createTime"  label="创建时间" align="center"  width="170">
          <template slot-scope="scope">
            <div class="txt_left">{{scope.row.createTime}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center"  fixed="right"  width="150">
          <template slot-scope="scope">
              <!--<div class="small-Idiv"  @click="editor(scope.row.formData.agencyId,2)">
                <div class="i-div huishouzhan">
                  <img src="../../../common/images/icon/编辑.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;">编辑</span>
              </div>-->
              <div class="small-Idiv" @click="detail(scope.row.auditId,scope.row.auditStatus,1)" v-permit="'dealers:details'">
                <div class="i-div">
                  <img src="../../../common/images/icon/查看详情.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;" >详情</span>
              </div>
              <div v-if="scope.row.auditStatus!=0" class="small-Idiv" @click="deleteAuditView(scope.row.auditId)" v-permit="'dealers:remove'">
                <div class="i-div huishouzhan">
                  <img src="../../../common/images/icon/回收站.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;">删除</span>
              </div>

               <div class="small-Idiv" @click="_throughSupplieraudit1(scope.row)"  v-permit="'dealers:check'"
               v-if="scope.row.formData.adminId !=null && scope.row.auditStatus==0 ">
                <div class="i-div">
                  <img src="../../../common/images/icon/审核.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;">审核</span>
              </div>
              <div class="small-Idiv" @click="distribution(scope.row,false)"   v-permit="'dealers:distribution'"
               v-if="scope.row.formData.adminId == null && scope.row.auditStatus==0 ">
                <div class="i-div">
                  <img src="../../../common/images/icon/指派采购员.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;">分配</span>
              </div>
          </template>
        </el-table-column>
    </el-table>
      <div class="pagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="form.current_page"
            :page-sizes="[10, 30, 50, 100]"
            :page-size="form.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="form.total_count">
            </el-pagination>
      </div>
      <!-- 服务授权弹框 -->
      <el-dialog
        title="服务授权"
        :visible.sync="dialogVisible"
        width="50%"
        >
        <el-form :model="form"  label-width="100px">
          <div class="search-wrapper">
            <h4 class="title">中国人民银行有限公司</h4>
          <el-row >
            <el-col :span="4">
              <img src="../../../common/images/提示@2x.png" alt="" class="opera_img">
              <span class="beauty">积分商城</span>
              <el-switch v-model="value6"></el-switch>
            </el-col>
            <el-col :span="4" >
              <img src="../../../common/images/提示@2x.png" alt="" class="opera_img">
              <span class="beauty">员工福利</span>
              <el-switch v-model="value7"></el-switch>
            </el-col>
            <el-col :span="4">
              <img src="../../../common/images/提示@2x.png" alt="" class="opera_img">
              <span class="beauty">企业集采</span>
              <el-switch v-model="value8"></el-switch>
            </el-col>
            <el-col :span="4" >
              <img src="../../../common/images/提示@2x.png" alt="" class="opera_img">
              <span class="beauty">礼品卡册</span>
              <el-switch v-model="value9"></el-switch>
            </el-col>
            <el-col :span="6" >
              <img src="../../../common/images/提示@2x.png" alt="" class="opera_img">
              <span class="beauty">供应链输出平台</span>
              <el-switch v-model="value10"></el-switch>
            </el-col>
        </el-row>
        <el-row >
            <el-col :span="11" >
              <el-form-item label="是否收费：" style="margin-top:20px">
                <el-radio v-model="radio" label="1">是</el-radio>
                <el-radio v-model="radio" label="2">否</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="11" >
              <el-form-item label="收费金额：" style="margin-top:20px">
                <el-input v-model="form.keywords" placeholder="请输入收费金额"></el-input>
                <span class="danwei">元</span>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row >
            <el-col :span="11" >
              <el-form-item label="创建项目数：" >
                <el-input v-model="form.keywords" placeholder="已经创建的项目个数" style="width:200px"></el-input>
                <span class="danwei">个</span>
              </el-form-item>
            </el-col>
            <el-col :span="11" >
              <el-form-item label="项目上限数：" >
                <el-input v-model="form.keywords" placeholder="最多可创建的项目个数"></el-input>
                <span class="danwei">个</span>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row >
            <el-col :span="15" >
              <el-form-item label="有效期限：" >
                <el-date-picker
                  v-model="value11"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="7" >
              <el-form-item >
                <el-checkbox v-model="checked">不限</el-checkbox>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row >
            <el-col :span="10" >
              <el-form-item label="排序：" >
                <el-select v-model="form.region" placeholder="请选择">
                  <el-option label="01" value="0"></el-option>
                  <el-option label="02" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
        </el-row>
        </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger"@click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 审核弹窗 -->
       <el-dialog
      title="审核"
      :visible.sync="dialogVisible1"
      width="30%"
      >
      <el-form :model="form"  label-width="100px">
        <el-form-item label="审核状态:">
            <el-radio v-model="audit.status" label="1">通过</el-radio>
            <el-radio v-model="audit.status" label="2">不通过</el-radio>
        </el-form-item>
        <el-form-item label="审核原因:">
            <el-input type="textarea"
            :rows="2"
            :placeholder="this.placeholder"
            v-model="audit.textarea"
            ></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible1 = false" size="small">取 消</el-button>
        <el-button type="primary" @click="examine" size="small">确 定</el-button>
      </span>
    </el-dialog>
      <!-- 审核弹窗 -->
        <!--<span>
          <el-row  v-if="form.radio != 3">
            <el-col :span="10">
               审核:<el-radio-group v-model="form.radio"  @change='choose'>
                      <el-radio :label="1">通过</el-radio>
                      <el-radio :label="2">不通过</el-radio>
                    </el-radio-group>
            </el-col>
            <el-col :span="12" class="distribution">
              <span style="word-break:keep-all;  ">分配采购员：</span>
                <el-select v-model="value" clearable placeholder="请选择" style="width:300px">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-col>
        </el-row>
          <el-input
            type="textarea"
            :rows="4"
            :placeholder="placeholder"
            style="margin-top: 20px;"
            v-model="form.reason">
          </el-input>
          <el-row  v-if="form.radio == 3" style="margin-top: 35px;">
            <el-col :span="12" class="distribution">
              <span style="word-break:keep-all;  ">上级领导审核：</span>
                <el-select v-model="value" clearable placeholder="请选择" style="width:300px">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-col>
        </el-row>
        </span>
        <span slot="footer.vue" class="dialog-footer.vue">
          <el-button type="danger" @click="cancel" size='small'>取 消</el-button>
          <el-button type="primary" @click="sureDelete" size='small'>确 定</el-button>
        </span>-->
      <!-- 删除 -->
      <el-dialog
              title="删除"
              :visible.sync="deleteAuditDialog"
              width="30%"
      >
        <el-form :model="form"  label-width="100px">
          <el-form-item label="删除原因:">
            <el-input v-model="deleteRemark" type="textarea"></el-input>
          </el-form-item>
          <!--<el-form-item label="上级领导审核:">
              <el-select v-model="form.region" placeholder="请选择">
                <el-option label="销售总监" value="0"></el-option>
                <el-option label="采购经理" value="1"></el-option>
              </el-select>
          </el-form-item>-->
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="deleteAuditDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="deleteAudit()" size="small">确 定</el-button>
      </span>
      </el-dialog>
      <!-- 删除 -->
      <!-- 点击查看大图弹窗 -->
      <el-dialog
        title="提示"
        :visible.sync="picture"
        width="40%"
        >
         <span>
          <div style="width: 100%;height: 578px;overflow: auto;">
            <img :src="item" alt v-for="item in img" :key="item" class="big_img" />
          </div>
        </span>
        <span slot="footer" class="dialog-footer">
          <!--<el-button type="danger" @click="picture = false" size="small">取 消</el-button>-->
          <el-button type="primary" @click="picture = false" size="small">关闭</el-button>
        </span>
      </el-dialog>

       <!-- 分配采购员 -->
    <el-dialog
      title="分配销售员"
      :visible.sync="people_dialog"
      width="30%">
      <span>
        <el-select v-model="form.user" clearable placeholder="请选择" style="width:300px">
          <el-option
            v-for="item in userOptions"
            :key="item.sysuserId"
            :label="item.sysuserName"
            :value="item.sysuserId">
          </el-option>
        </el-select>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="people_dialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="distribution('',true)" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配采购员 -->
      <!-- 指派审核人员 -->
      <el-dialog
              title="指派审核人员"
              :visible.sync="dialog_editTaskUser"
              width="30%">
      <span>
        <el-select v-model="taskUser.userId" clearable placeholder="请选择" style="width:300px">
          <el-option
                  v-for="item in sysuserList"
                  :key="item.sysuserId"
                  :label="item.sysuserName"
                  :value="item.sysuserId">
          </el-option>
        </el-select>
      </span>
        <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialog_editTaskUser = false" size="small">取 消</el-button>
        <el-button type="primary" @click="editTaskUserTo('',true)" size="small">确 定</el-button>
      </span>
      </el-dialog>
      <!-- 指派审核人员 -->
    </div>
  </div>
</template>

<script>
import { getAgencyexamine ,deleteantarky ,editAgency,deleteAgency,supplierToExamine , dealerReview} from '@/api/apply/index'

import {getAlluser, getSaleManList} from '@/api/supplier/index'
import { editTaskUser, addTaskUser} from '@/api/supplier/index';
import { getAdminUserPage } from '@/api/permissions/index'
import { auditDelete} from '@/api/customer/index'

export default {
  data () {
    return {
      textarea:'',
      checked: true,
      radio: '1',
      value6: true,
      value7:false,
      value8:false,
      value9:false,
      value10:false,
      value11: '',
      userOptions:[],
      people_dialog:false, // 分配采购员弹窗
      form: {
        current_page:1,
        page_size:10,
        total_count:0,
        auditStatus:'0',
        keywords:'',
        taskId:'',
        agencyId:'',
        reason:'',
        Status:'1',
        radio:1,
        auditId:'',
        user:'', //采购员id
      },
      audit:{
        auditId:'',
        reason:'',
        auditStatus:'0',
        taskId:'',
        status: "1",//审核状态
        textarea:""
      },
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      blacklistState:false, //黑名单
      dialogVisible:false, //服务授权
      dialogVisible1:false, //审核
      picture:false,  //查看大图弹窗
      placeholder:'请输入审核通过理由',
      tableData:[],
      img:[],
      examineVal:'',//多行文本域value，
      deleteId:"",
      deleteRemark:"",
      deleteAuditDialog:false,


      taskUser:{
        taskId:'',
        userId:'',
        auditId:'',
        add:false
      },
      sysuserList:[],

      dialog_editTaskUser:false, // 指派审核人
    }
  },
  created () {
    this._getAgencyexamine()
    //this._loadSysuserList()
  },
  computed: {
  },
  watch:{
  },
  methods: {
    editTaskUserView(taskId){
      this.taskUser.taskId = taskId;
      this.dialog_editTaskUser = true;
      this.taskUser.add = false;
    },
    addTaskUserView(auditId){
      this.taskUser.auditId = auditId;
      this.taskUser.add = true;
      this.dialog_editTaskUser = true;
    },
    editTaskUserTo(){
      let taskId = this.taskUser.taskId;
      let userId = this.taskUser.userId;
      let auditId = this.taskUser.auditId;
      console.log("add is "+this.taskUser.add)
      if(this.taskUser.add){
        addTaskUser(auditId, userId).then(res=>{
          if(res.code == 200){
            this.$message({
              message: res.message,
              type: 'success'
            });
            this.dialog_editTaskUser = false
            this._getAgencyexamine()
          }
        })
      }else {
        editTaskUser(taskId, userId).then(res=>{
          if(res.code == 200){
            this.$message({
              message: res.message,
              type: 'success'
            });
            this.dialog_editTaskUser = false
            this._getAgencyexamine()
          }
        })
      }
    },
    _loadSysuserList(){
      let obj = {}
      obj.current_page = 1
      obj.pageSize = 0
      obj.sysuserType = 0
      getAdminUserPage(obj).then(res => {
        this.sysuserList = res.data.list
      })
    },
    //分配采购员
    distribution(data,type){
      this._getAlluser()
      if(data){
        this.people_dialog = true
        this.form.auditId = data.auditId
        this.form.agencyId = data.formData.agencyId
      }
      if(type){
        let obj = {}
        obj.adminId = this.form.user
        obj.auditId = this.form.auditId
        obj.agencyId = this.form.agencyId
        dealerReview(obj).then(res => {
          if(res.code == 200){
            this.$message({
              message: '分配成功',
              type: 'success'
            });
            this.form.auditId = ""
            this.people_dialog = false
            this._getAgencyexamine()
          }
        })
      }
    },
    //获取采购员列表
    _getAlluser(){
      if(this.userOptions)return;
      getSaleManList().then(res => {
        this.userOptions = res.data.list
        this.form.user = res.data.list[0].sysuserId
      })
    },
    blacklistSure(){

    },
    deleteAuditView(auditId){
      this.deleteId = auditId;
      this.deleteRemark = '';

      this.deleteAuditDialog = true;
    },
    deleteAudit(){
      let params = {}
      params.auditId = this.deleteId;
      params.remark = this.deleteRemark;
      auditDelete(params).then(res=>{
        if(res.code == 200){
          this.$message({
            message: res.message,
            type: 'success'
          });
          this.deleteAuditDialog = false
          this._getAgencyexamine()
        }
      })

      this.deleteAuditDialog = false;
    },
    examine(){
      let obj ={}
      obj.auditId = this.audit.auditId
      //obj.auditStatus = this.form.auditStatus
      obj.agencyId = this.audit.agencyId
      obj.taskId = this.audit.taskId || ""
      obj.verifyRemark = this.examineVal
      obj.auditStatus = this.audit.status
      console.log(obj);
      supplierToExamine(obj).then(res =>{
        console.log(res);
        if(res.code == 200){
                  this._getAgencyexamine()
                  this.$message({
                    message: res.message,
                    type: 'success'
                  });
                  this.dialogVisible1= false
        }

      })
    },
    add() {
      this.$router.push({name:'Dealerinformation11'  });
    },
    detail(id,status,state) {
      this.$router.push({ name: "Dealerdetail", query: { id: id ,status:status,state:state} });
    },
    editor(id,state) {
      this.$router.push({ name: "Dealerinformation11", query: { id: id ,state:state } });
    },
        //黑名单
    blacklist(id){
      this.blacklistState = true
      this.agencyId = id
      this.reason = ''
      this.title = '黑名单'
      this.placeholder = '请输入处理原因'
      this.state = 1
    },
    //点击打开图片
    open(url){
      this.img = [];
      this.picture = true;
      this.img.push(url);
      console.log(this.img);
      // window.open(url, '_blank', ' width=900, height=700')
    },
    //取消删除
      cancel(){
        this.form.agencyId = ''
        this.form.reason = ''
        this.form.radio=1
        this.dialogVisible = false
      },
      //确定按钮
      sureDelete(){
        if(this.form.radio !== 3){
          // throughSupplieraudit(this.form,this.form.radio).then(res => {
          //   if(res.code ==200){
          //     this.dialogVisible = false
          //     this._getAgencyexamine()
          //     this.form.agencyId = ''
          //     this.form.reason = ''
          //     this.form.radio=1
          //     this.$message({
          //       message: res.message,
          //       type: 'success'
          //     });
          //   }else{
          //     this.$message(res.message);
          //   }
          // })
        }else{
          deleteantarky(this.form).then(res => {
            if(res.code ==200){
              this.dialogVisible = false
              this._getAgencyexamine()
              this.form.agencyId = ''
              this.form.reason = ''
            }
            this.$message(res.message);
          })
        }
      },
      handleSizeChange(val){
        this.form.page_size = val
        this._getAgencyexamine()
      },
      handleCurrentChange(val){
        this.form.current_page = val
        this._getAgencyexamine()
      },
      _getAgencyexamine(slt){
        if(slt){
          this.form.current_page = 1
        }
        getAgencyexamine(this.form).then(res => {
          this.tableData = res.data.list
          this.form.total_count = res.data.total
        })
      },
      choose(val){
        if(val == 1){
           this.placeholder = '请输入审核通过理由'
        }else if(val == 2){
          this.placeholder = '请输入审核不通过理由'
        }
        this.form.radio = val
      },
      //审核通过
      _throughSupplieraudit(val,type){
        if(type == 3){
          this.placeholder = '请输入删除理由'
          this.form.radio = type
        }
        this.audit.auditId = val.auditId
        this.audit.agencyId = val.formData.agencyId
        this.dialogVisible = true
      },
      _throughSupplieraudit1(val,type){
        this.audit.auditId = ""
        this.audit.agencyId =  ""
        this.audit.taskId =  ""
        this.audit.textarea =  ""
        this.audit.status =  "1"
        console.log(val);
        this.dialogVisible1 = true
        this.audit.auditId = val.auditId
        this.audit.agencyId = val.formData.agencyId
        this.audit.taskId = val.currentAuditDetail && val.currentAuditDetail.taskId || ""
      }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.goods-fitter {
  .vender {
    ul {
      li {
        float: left;
        height: 41px;
        padding: 0 10px;
        line-height: 41px;
        text-align: center;
        border: 1px solid transparent;
        font-size: 16px;
        color: #333;
        cursor: pointer;
        &.active {
          border: 1px solid #d7e0f1;
          border-bottom: 0;
          background-color: #fff;
          position: relative;
          position: relative;
          &:after {
            position: absolute;
            content: "";
            left: 0;
            bottom: -1px;
            height: 1px;
            width: 100%;
            background: #fff;
          }
        }
        .image {
          display: inline-block;
          width: 30px;
          margin-right: 10px;
          font-size: 0;
          line-height: 40px;
          vertical-align: top;
          img {
            width: 100%;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .search-wrapper {
    padding: 20px;
    border: 1px solid rgb(215, 224, 241);
    background: #fff;
    .title {
      margin-left: -20px;
      font-size: 16px;
      font-weight: 400;
      color: 3333;
      padding-left: 10px;
      line-height: 1.4;
      border-left: 4px solid $themeColor;
      margin-bottom: 10px;
    }
    .search-main {
    }
    .search-base {
    }
  }
  .text-space {
    text-align: center;
    color: #606266;
    font-size: 12px;
  }
  .el-select-width {
    max-width: 240px;
    margin-right: 5px;
  }
  .el-date-picker{
    max-width: 240px;
    margin-right: 5px;
  }
  .el-input-width {
    display: inline-block;
    max-width: 180px;
  }
  .btn-toggle {
    margin-left: 10px;
    font-size: 14px;
    color: $themeColor;
    cursor: pointer;
  }
}
.goods-list-wrapper {
  margin-top: 20px;
}
.el-transfer-panel__header {
  background: $themeColor;
  color: #fff;
}
.item {
  line-height: 1.5;
  padding: 8px 10px;
  cursor: pointer;
  &:hover {
    color: $themeColor;
  }
  &.active {
    background: #c6e2ff;
    color: #fff;
  }
}
.image {
  cursor: pointer;
}
.item-name {
  cursor: pointer;
  &:hover {
    color: $themeColor;
  }
}
.el-icon-arrow-right {
  margin: 0 20px;
}
.store {
  width: 310px;
}
.red {
  color: $themeSubColor;
}
.transfer-wrapper {
  text-align: center;
}
.panel-wrapper {
  text-align: left;
  margin: 0;
  padding: 6px 0;
  list-style: none;
  height: 246px;
  overflow: auto;
  box-sizing: border-box;
}
.dialog-footer {
  margin-top: 20px;
  text-align: right;
}
.detail{
    font-size: 14px;
    color: #606266;
}

.small-Idiv{
  span{
    margin-top: 3px;
    font-size:12px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(72,73,77,1);
  }
}
.i-div{
  cursor: pointer;
  height:32px;
  border-radius:6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.line-div{
    display: flex;
    justify-content: left;
    margin-top: 5px;
}
.small-bottom{
  display: flex;
  justify-content: flex-start;
  margin-left:17px;
  margin-top:10px;
}
.fuzhi{
  background:rgba(229,162,75,1);
}
 .huishouzhan{
   background:rgba(247,108,110,1);
 }
 .el-select-width {
    max-width: 300px;
    margin-right: 5px;
  }
   .el-date-picker{
    max-width: 240px;
    margin-right: 5px;
  }
  .el-input-width {
    display: inline-block;
    max-width: 180px;
  }
  .el-select{
    width: 100% !important;
  }
  .img_size{
    width: 118px;
    height: 170px;
  }
  .small_top{
    margin-top: 10px;
    margin-left:7px;
    margin-right:7px;
  }
  .distribution{
    display: flex;
    align-items: center;
    position: relative;
    top: -12px;
  }
  .big_img {
  width: 100%;
  height: 546px;
}
.beauty{
  margin-right: 7px;
}
.danwei{
  margin-left:2px;
  position: absolute;
}
.small-Idiv {
  float: left;
  width: 45%;
  padding-top: 10px;
}
.small-Idiv:nth-of-type(odd) {
  margin-left: 4%;
}
</style>
