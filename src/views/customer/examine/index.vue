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
                                @change="_getCustomerexamine(true)"
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
                            <el-input v-model="form.keywords" clearable placeholder="请输入客户名称/联系人等"></el-input>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small"  @click="_getCustomerexamine(true)">查询</el-button>
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
         <!-- <el-button type="primary" size="small"  @click="add">新增</el-button>-->
        </el-col>
        <el-col :span="3">
        </el-col>
      </el-row>
      <el-table   :data="tableData"  border style="width: 100%" stripe>
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
                <el-button type="success" size="small" @click="editTaskUserView(detail.taskId)" style="padding: 3px 3px;">重新指派</el-button>
              </span>
              <span v-if="detail.auditResult==1">通过</span>
              <span v-if="detail.auditResult==2">未通过</span>
            </div>
            <div v-if="scope.row.auditDetails.length==0" class="txt_left">
              <el-button type="success" size="small" @click="addTaskUserView(scope.row.auditId)" style="padding: 3px 3px;">添加审核人</el-button>
            </div>-->
            <div class="txt_left">{{scope.row.changeRemark}}</div>
          </template>
        </el-table-column>
        <el-table-column  prop="verifyRemark"  label="审核理由" align="center"  width="100">
        </el-table-column>
        <el-table-column  prop="formData.customerSn"  label="客户编码" align="center"></el-table-column>
        <el-table-column  prop="formData.customerName"  label="客户名称" align="center"></el-table-column>
        <el-table-column  prop="formData.businessType"  label="客户类型" align="center">
        </el-table-column>
        <el-table-column  prop="formData.commonContactName"  label="联系人" align="center"></el-table-column>
        <el-table-column  prop="formData.commonContactDept"  label="部门" align="center" ></el-table-column>
        <el-table-column  prop="formData.commonContactPhone"  label="手机号码" align="center"></el-table-column>
        <el-table-column  prop="formData.commonContactTel"  label="办公电话" align="center"></el-table-column>
        <el-table-column  prop="formData.commonContactQq"  label="QQ" align="center"></el-table-column>
        <el-table-column  prop="formData.leaderContactName"  label="部门领导" align="center"></el-table-column>
        <el-table-column  prop="formData.leaderContactPhone"  label="领导手机号" align="center"></el-table-column>
        <el-table-column  prop="createTime"  label="创建时间" align="center"  width="170">
          <template slot-scope="scope">
            <div class="txt_left">{{scope.row.createTime}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center"  fixed="right"  width="150">
          <template slot-scope="scope">
              <div class="small-Idiv" @click="detail(scope.row.auditId,1)" v-permit="'view:approval'">
                <div class="i-div">
                  <img src="../../../common/images/icon/查看详情.png" alt="" class="operation_img">
                </div>
                <span>详情</span>
              </div>
              <div v-if="(scope.row.auditStatus!=0)" class="small-Idiv"  @click="deleteAuditView(scope.row.auditId)" v-permit="'remove:approval'" >
                <div class="i-div huishouzhan">
                  <img src="../../../common/images/icon/回收站.png" alt="" class="operation_img">
                </div>
                <span>删除</span>
              </div>
              <!--<div class="small-Idiv"   @click="editor(scope.row.formData.customerId,2)">
                <div class="i-div huishouzhan">
                  <img src="../../../common/images/icon/编辑.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;">编辑</span>
              </div>-->
              <div class="small-Idiv" @click="_throughSupplieraudit(scope.row)"  v-permit="'check:approval'"
              v-if="scope.row.formData.adminId != null &&　scope.row.auditStatus==0">
                <div class="i-div">
                  <img src="../../../common/images/icon/审核.png" alt="" class="operation_img">
                </div>
                <span>审核</span>
              </div>
              <div class="small-Idiv" @click="distribution(scope.row)"  v-permit="'distribution:approval'"
               v-if="scope.row.formData.adminId == null && scope.row.auditStatus==0">
                <div class="i-div">
                  <img src="../../../common/images/icon/指派采购员.png" alt="" class="operation_img">
                </div>
                <span>分配</span>
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
      <!-- 删除 -->
      <el-dialog
      title="删除"
      :visible.sync="deleteCustomer"
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
        <el-button type="danger" @click="deleteCustomer = false" size="small">取 消</el-button>
        <el-button type="primary" @click="deleteAudit()" size="small">确 定</el-button>
      </span>
    </el-dialog>
      <!-- 删除 -->
      <!-- 审核弹框 -->
      <el-dialog
      title="审核"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <el-form :model="form"  label-width="100px">
        <el-form-item label="审核状态:">
            <el-radio v-model="state" label="1">通过</el-radio>
            <el-radio v-model="state" label="2">不通过</el-radio>
        </el-form-item>
        <el-form-item label="审核原因:">
            <el-input type="textarea"
            :rows="2"
            :placeholder="this.placeholder"
            v-model="textarea"
            ></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="examine" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 审核弹框 -->
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
          <el-button type="danger" @click="picture = false" size="small">取 消</el-button>
          <el-button type="primary" @click="picture = false" size="small">确 定</el-button>
        </span>
      </el-dialog>

        <!-- 分配采购员 -->
    <el-dialog
      title="分配采购员"
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
import { getCustomerexamine,deleteCustomer,customerToExamine, auditDelete , customerAudit} from '@/api/customer/index'
import { editTaskUser, addTaskUser} from '@/api/supplier/index';
import {getAlluser} from '@/api/supplier/index'
import { getAdminUserPage } from '@/api/permissions/index'
export default {
  data () {
    return {
      textarea:'',
      options:[],
      value:'',
      form: {
        current_page:1,
        page_size:10,
        total_count:0,
        auditStatus:'0',
        keywords:'',
        customerId:'',
        reason:'',
        Status:'1',
        radio:1,
        auditId:'',
        taskId:'',
        customerId:'',
        verifyRemark:'',
        status:0,
        user:'', //采购员id
      },
      deleteCustomer:false, //删除
      state:'1', //审核状态
      blacklistState:false, //黑名单
      dialogVisible:false, //审核
      picture:false,  //查看大图弹窗
      placeholder:'请输入审核通过理由',
      people_dialog:false, // 分配采购员弹窗
      dialog_editTaskUser:false, // 指派审核人
      tableData:[],
      img:[],
      examineVal:'',
      deleteRemark:'',
      deleteId:'',
      userOptions:[],

      taskUser:{
        taskId:'',
        userId:'',
        auditId:'',
        add:false
      },
      sysuserList:[]
    }
  },
  created () {
    this._getCustomerexamine()
    this._getAlluser()
    //this._loadSysuserList()
  },
  watch:{
    textarea(newVal){
      if(newVal){
        this.examineVal = newVal
      }
    },
    state(newVal){
      if(newVal){
        this.state = newVal
      }


    }
  },
  computed: {
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
            this._getCustomerexamine()
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
            this._getCustomerexamine()
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
    //获取采购员列表
    _getAlluser(){
      getAlluser().then(res => {
        this.userOptions = res.data.list
        this.form.user = res.data.list[0].sysuserId
      })
    },
    //分配采购员
    distribution(data,type){
      if(data){
        this.people_dialog = true
        this.form.auditId = data.auditId
        this.form.customerId = data.formData.customerId
      }
      if(type){
        let obj = {}
        obj.adminId = this.form.user
        obj.auditId = this.form.auditId
        obj.customerId = this.form.customerId
        customerAudit(obj).then(res => {
          if(res.code == 200){
            this.$message({
              message: '分配成功',
              type: 'success'
            });
            this.form.auditId = ""
            this.people_dialog = false
            this._getCustomerexamine()
          }
        })
      }
    },
    blacklistSure(){

    },
    cancel(){

    },
    deleteAuditView(auditId){
      this.deleteId = auditId;
      this.deleteRemark = '';

      this.deleteCustomer = true;
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
          this.dialogVisible = false
          this._getCustomerexamine()
        }
      })

      this.deleteCustomer = false;
    },
    examine(){
      let obj ={}
      obj.auditId = this.form.auditId
      //obj.auditStatus = this.form.Status
      obj.customerId = this.form.customerId
      obj.taskId = this.form.taskId || '';
      obj.verifyRemark = this.examineVal
      obj.auditStatus = this.state
      console.log(obj.state)
      customerToExamine(obj).then(res =>{

        if(res.code == 200){
          this.$message({
            message: res.message,
            type: 'success'
          });
          this.dialogVisible = false
          this._getCustomerexamine()
        }

      })
    },
    add() {
      this.$router.push({name:'AddCustomer1'  });
    },
    detail(id,state) {
      this.$router.push({ name: "DetailCustomer1", query: { id: id ,state:state} });
    },
    editor(id,state) {
      console.log(id);
      this.$router.push({ name: "AddCustomer1", query: { id: id ,state:state } });
    },
      // 确定按钮
      sureDelete(){
        if(this.form.radio !== 3){
          throughSupplieraudit(this.form,this.form.radio).then(res => {
            if(res.code ==200){
              this.dialogVisible = false
              this._getCustomerexamine()
              this.form.supplierId = ''
              this.form.reason = ''
              this.form.radio=1
              this.$message({
                message: res.message,
                type: 'success'
              });
            }else{
              this.$message(res.message);
            }
          })
        }else{
          deleteantarky(this.form).then(res => {
            if(res.code ==200){
              this.dialogVisible = false
              this._getCustomerexamine()
              this.form.supplierId = ''
              this.form.reason = ''
            }
            this.$message(res.message);
          })
        }
      },
      handleSizeChange(val){
        this.form.page_size = val
        this._getCustomerexamine()
      },
      handleCurrentChange(val){
        this.form.current_page = val
        this._getCustomerexamine()
      },
      _getCustomerexamine(slt){
        if(slt){
          this.form.current_page = 1
        }
        let obj = {}
        obj.pageNum = this.form.current_page
        obj.pageSize = this.form.page_size
        obj.keywords = this.form.keywords
        obj.auditStatus = this.form.auditStatus
        console.log(obj)
        getCustomerexamine(obj).then(res => {
          this.tableData = res.data.list
          // this.form.total_count = res.data.total
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
        console.log(val);

        if(type == 3){
          this.placeholder = '请输入删除理由'
          this.form.radio = type
        }
        console.log(val)
        this.form.auditId = val.auditId
        //this.form.auditStatus = val.auditStatus
        this.form.taskId  = val.currentAuditDetail && val.currentAuditDetail.taskId || "";
        this.form.supplierId = val.formData.supplierId
        this.form.customerId = val.formData.customerId
        this.dialogVisible = true
        },

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
.line {
    display: flex;
    justify-content: space-evenly;
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
.small-Idiv {
  float: left;
  width: 45%;
  padding-top: 10px;
}
.small-Idiv:nth-of-type(odd) {
  margin-left: 4%;
}
</style>
