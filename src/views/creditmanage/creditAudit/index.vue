<template>
  <div class="margin">
      <div class="mcard mbottom">
        <div class="title">额度审核</div>
        <div>
        <el-form label-width="120px" size="small">
            <el-row>
                <el-col :span="6">
                  <el-col>
                    <el-form-item label="商家名称：">
                      <el-col :span="23">
                        <el-input  v-model="merchantName1" placeholder="请输入项目名称">
                        </el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="10" style="width: auto !important;">
                      <el-form-item label="发放时间：">
                        <el-col>
                          <el-date-picker
                            @change="handlecreateTime"
                            type=daterange
                            valueFormat='yyyy-MM-dd HH:mm:ss'
                            v-model="createTime"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                          </el-date-picker>
                        </el-col>
                      </el-form-item>
                  </el-col>
                <el-col :span="2" style='text-align: center;'>
                        <el-button type="primary" size="small" @click="handelSearchGoods">搜索</el-button>
                </el-col>
                <el-col :span="1" style='text-align: center;'>
                        <el-button type="primary" size="small" @click="reset">重置</el-button>
                </el-col>
              </el-row>
           </el-form>
        </div>  
      </div>
    
      <div class="mcard mcardB">
        <el-table :data="noticeList" stripe  @selection-change="handleSelectionChange" border>
          <el-table-column  type="index" align="center" width="50"></el-table-column>
          <el-table-column label="额度管理人"  align="center" prop="quotaManagerName"></el-table-column>
          <el-table-column label="额度发放人"  align="center" prop="quotaExecutorName"></el-table-column>
          <el-table-column label="发放申请表"  align="center" prop=""></el-table-column>
          <el-table-column label="提交申请人"  align="center" prop="applyUserName"></el-table-column>
          <el-table-column label="服务商名称"  align="center" prop="merchantName"></el-table-column>
          <el-table-column label="账户名称"  align="center" prop="accountName"></el-table-column>
          <el-table-column label="服务商账户余额" align="center" prop="balanceAmount"></el-table-column>
          <el-table-column label="销售员" align="center"  prop="adminUserName" ></el-table-column>
          <el-table-column label="本次充值金额" align="center" prop="paymentAmount"></el-table-column>
          <el-table-column label="本次授信额度"  align="center" prop="applyAmount"></el-table-column>
          <el-table-column label="本次发放金额"  align="center" prop="applyAmount"></el-table-column>
          <el-table-column label="审核状态"  align="center" prop="auditStatus">
             <template slot-scope="scope">
                <div v-if="scope.row.auditStatus == 0 ">待审核</div>
                <div v-else-if="scope.row.auditStatus == 1 ">审核通过</div>
                <div v-else-if="scope.row.auditStatus == 2 ">审核失败</div>
             </template>
          </el-table-column>
          <el-table-column label="审核说明"  align="center" prop="auditInstruction"></el-table-column>
          <el-table-column label="发放状态"  align="center" prop="payStatus">
             <template slot-scope="scope">
                 <div v-if="scope.row.payStatus == 0">待发放</div>
                 <div v-else-if="scope.row.payStatus == 1">已发放</div>
                 <div v-else-if="scope.row.payStatus == 2">发放失败</div>
             </template>
          </el-table-column>
          <el-table-column label="发放说明"  align="center" prop="payInstruction"></el-table-column>
          <el-table-column label="操作" align="left" fixed="right" width="150" prop="id">
              <template slot-scope="scope">
                <div class="line-div">
                  <div class="small-Idiv"  @click="openDetails(scope.row.id)" v-permit="'creditAudit:view'">
                    <div class="i-div">
                      <img src="../../../common/images/icon/查看详情.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;margin-left: 3px;">详情</span>
                  </div>
                  <div v-if="scope.row.auditStatus == 0 " class="small-Idiv" @click="approval(scope.row.id)" v-permit="'approval:audit'">
                    <div class="i-div">
                      <img src="../../../common/images/icon/审核.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;margin-left: 3px;">领导审批</span>
                  </div>
                   <div  v-if="scope.row.auditStatus == 1 && scope.row.payStatus == 0" class="small-Idiv" @click="issue(scope.row.merchantName, scope.row.accountName, scope.row.balanceAmount ,scope.row.applyAmount, scope.row.applyUserName,  scope.row.accountId, scope.row.applyAmount,scope.row.merchantUserId ,scope.row.merchantType , scope.row.id)" v-permit="'issue:audit'">
                    <div class="i-div">
                      <img src="../../../common/images/icon/通过.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;margin-left: 3px;">发放</span>
                  </div>
                </div>
              </template>
          </el-table-column>
          <!--
            <el-table-column label="标题内容" prop="content">
              <template slot-scope="scope">
                <i class="el-icon-bell" v-show="scope.row.status === '1'"></i>
                <span :class="scope.row.status === '2' ? 'readed': ''">{{scope.row.content}}</span>
              </template>
            </el-table-column>
            <el-table-column label="提交时间" width="200" align="center" prop="time"></el-table-column>
            <el-table-column label="类型" width="100" align="center" prop="type"></el-table-column>
          -->
        </el-table>
        <el-row class="bottom">
          <el-col :span="18" class="right">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pagination.current_page"
              :page-size="pagination.page_size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pagination.total_count"
            ></el-pagination>
          </el-col>
        </el-row>
      </div>

       <!-- 审批 -->
      <el-dialog title="领导审批" :visible.sync="dialogapprovalVisible" width="36%"  :before-close="approvalClose" class="checkModal"  :close-on-click-modal="false">
        <el-form ref="form"  label-width="110px" size="small">
          <!--
          <el-form-item label="审核类型:">
            <span>商品推送审核</span>
          </el-form-item>
          -->
          <el-form-item label="审核意见:">
            <template>
              <!--  <el-radio label="0" v-model="form.resource">待核对</el-radio> -->
                <el-radio label="1" v-model="radio">通过</el-radio>
                <el-radio label="2" v-model="radio">不通过</el-radio>
              </template>
          </el-form-item>
          <el-form-item label="审核原因：">
            <el-input type="textarea" v-model.trim="desc"></el-input>
          </el-form-item>
          <!--<el-form-item label="上级领导审核:" >
            <el-select v-model="form.people" placeholder="请选择">
              <el-option label="销售总监" value="0"></el-option>
              <el-option label="销售大佬" value="1"></el-option>
            </el-select>
          </el-form-item>-->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button  @click="approvalClose" size="small">取 消</el-button>
          <el-button type="primary" @click="approvalSave" size="small">确 定</el-button>
        </span>
      </el-dialog>

  <!-- 总站新增额度发放 -->
    <el-dialog
      title="额度发放"
      :visible.sync="dialogissueVisible"
      width="70%"
      :before-close="issueClose"
      :close-on-click-modal="false"
      class="collate"
      >
      <div class="bill">
           <div class="input-box">
          <p class="issue-lines">额度发放</p>
          <div class="choose-input-box">
            <div class="block">
              <span class="demonstration">经销商名称:</span>
                <el-input v-model="merchantName" size="small"  :disabled="true"></el-input>
            </div>
            <div class="block">
               <span class="demonstration">经销商账户:</span>
               <el-input v-model="accountName" size="small" :disabled="true"></el-input>
            </div>
          </div>
          <div class="account-balance">
            <ul>
              <li><label>账户余额:</label><span><i style="color: #ff3a44;font-style: normal;">{{ balanceAmount }}</i>(元)</span></li>
              <li><label>额度申请表:</label><a href="" style="color: #4a99fa;">额度申请表</a></li>
            </ul>
          </div>
          <div>
              <div class="apply-people">
              <ul>
                <li><label>申请提交人:</label><span>{{applyUserName}}</span></li>
                <li><label>部门:</label><span>技术部</span></li>
              </ul>
            </div>
          </div>  
          <div class="apply-information">
            <div class="block">
              <span class="demonstration">本次申请充值金额:</span>
              <el-input
                v-model="paymentAmount"
                :disabled="true"
                size="small"
              >
              </el-input>元
            </div>
          </div>
        </div>
      </div>  
      <div class="bill"  v-if="apply_d">
          <el-row >
            <div class="apply-process" > 
          <p class="issue-lines">审核流程信息</p>
          <div class="apply-process-information">
            <ul>
              <li><label>额度审批人:</label><span>李红--总监--财务部</span></li>
              <li><label>第二审批人:</label><span>李红--总监--财务部</span></li>
              <li><label>最终决策人:</label><span>李红--总监--财务部</span></li>
            </ul>
            <ul>
              <li><label>额度发放人:</label><span>李红--总监--财务部</span></li>
              <li><label>第三审批人:</label><span>李红--总监--财务部</span></li>
            </ul>
          </div>
        </div>

        </el-row>
      </div>  
       <div class="bill">
        <div class="apply-process">
          <p class="issue-lines">发放说明</p>
          <div class="apply-process-information">
               <textarea class="makeQuota" v-model="payInstruction" placeholder="请输入发放说明"></textarea>
          </div>
        </div>
      </div>   
      <span slot="footer" class="dialog-footer">
        <el-button @click="issueClose" size="small">取 消</el-button>
        <el-button type="primary" @click="issueSave" size="small">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {  reviewList, approval , issueSave , outDetails  , findSettingByMerchantId} from '@/api/creditmanage/index'
export default {
  name: 'Notice',
  data () {
    return {
      dialogapprovalVisible: false,   // 审批模态框
      dialogissueVisible: false,      // 发放模态框
      accountBalance: 0,      //账户余额
      topupAmount: 0,        // 本次申请充值金额
      
      radio:"1",  // 审核意见
      desc:'',    // 审核原因
      id:'',  
      payInstruction:'', // 发放说明
      createTime:'',   // 发放时间
      merchantName1: '', //商家名称
      noticeNumberList: {
        goods_num: 0, // 商品数量
        order_num: 0, // 订单数量
        after_sale_num: 0, // 售后数量
        finance_num: 0 // 财务数量
      },
      noticeList: [],
      pagination: {
        current_page: 1,
        page_size: 10,
        total_count: 0
      },
      selectNotice: [],
      merchantName:'',   // 弹框商家名称
      accountName:'',
      balanceAmount:'',
      paymentAmount:'',
      applyUserName:'',
      apply_d: true
    }
  },
  created () {
    // this._getNoticeNumber()
    // this._getNoticeList()
    this.reviewList()
  },
  methods: {
    reviewList() {
      let data = {}
      data.pageNum = Number(this.pagination.current_page)
      data.pageSize = Number(this.pagination.page_size)
      data.merchantName = this.merchantName1
      data.payStartTime = this.createTime[0]
      data.payEndTime = this.createTime[1]
      reviewList(data).then(res => {
        var that =this
        that.noticeList = res.data.list
        this.pagination.total_count = res.data.total
      })
    },
    // 跳转详情页面
    openDetails(id) {   
       this.$router.push({ name: "auditDetails" , query: {id: id}});
    },
    handlecreateTime() {

    },
    // 搜索
    handelSearchGoods(){
      this.pagination.current_page = 1  
      this.reviewList()
    },
    // 重置
    reset() {
        this.merchantName1 = ''
        this.createTime = ''
        this.pagination.current_page = 1
        this.pagination.page_size = 10
        
        let data = {}
        data.pageNum = 1
        data.pageSize = 10
        data.merchantName = ""
        data.payStartTime = ""
        data.payEndTime = ""
        reviewList(data).then(res => {
          var that =this
          that.noticeList = res.data.list
          this.pagination.total_count = res.data.total
        })
    },
    handleSelectionChange (data) {
      let ret = []
      data.map(item => {
        ret.push(item.id)
      })
      this.selectNotice = ret
    },
    handleSizeChange (val) {
      this.pagination.page_size = val
      this.reviewList()
    },
    handleCurrentChange (val) {
      this.pagination.current_page = val
      this.reviewList()
    },
    // 审批
    approval(id){
        this.dialogapprovalVisible = true
        this.radio = "1"
        this.desc = ''
        this.id = id
    },
    // 审批取消
    approvalClose() {
        if( this.desc ){
            this.$confirm('是否取消审批?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                this.dialogapprovalVisible = false
            }).catch(() => {
                      
            });
        } else{
          this.dialogapprovalVisible = false
        }  

     
    },
     // 确认审批
    approvalSave() {
      var data = {}
      data.auditStatus =  this.radio
      data.auditInstruction =  this.desc
      data.id = this.id
   
      if( this.radio == '2' ){
        if ( !this.desc ){
          this.$message({
            type: 'error',
            message:'审核原因不能为空，请输入'
          }); 
          return 
        }
      }
      
      this.$confirm('是否确定审批?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
           approval(data).then(res=>{
            if(res.code == 200 ) {
                this.$message({
                  type: 'success',
                  message: res.message
                }); 
                this.dialogapprovalVisible = false
                this.reviewList()
            }         
          })

      }).catch(() => {
                   
      }); 
    },
    // 发放
    issue ( merchantName, accountName, balanceAmount , paymentAmount, applyUserName,  accountId, applyAmount, merchantUserId ,merchantType ,id){
        this.dialogissueVisible = true
        this.id = id
        this.payInstruction = ""
           
        this.merchantName = merchantName     
        this.accountName = accountName
        this.balanceAmount = balanceAmount
        this.paymentAmount = paymentAmount
        this.applyUserName = applyUserName
        
        var data = {}
        data.accountId = Number(accountId)           // 账号ID
        data.amount = Number(applyAmount)            // 发放金额
        data.merchantId =  Number(merchantUserId)    // 商家ID
        data.merchantName = merchantName             // 商家名称
        data.merchantType = Number(merchantType)      // 商家类型
         
        console.log(data) 
        findSettingByMerchantId(data).then( res => {
           console.log(res)
           if(res.data.length){
             this.apply_d = true

           }
        }) 

        // var data ={}
        // data.id = id
        // outDetails(data).then(res => {
        //    console.log(res)
        // });
       
    },
    // 发放取消
    issueClose (){
       if( this.payInstruction ) {
        this.$confirm('是否取消发放?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              this.dialogissueVisible = false
          }).catch(() => {
                    
          });
       }else{
          this.dialogissueVisible = false
       }
    },
    // 发放确认
    issueSave (){
      var data = {}
      data.id = this.id
      data.payInstruction = this.payInstruction
      this.$confirm('是否确定发放?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
           issueSave(data).then(res=>{
            console.log(res)
            if(res.message == '操作成功' ) {
                this.$message({
                  type: 'success',
                  message: res.message
                }); 
                this.dialogissueVisible = false
                this.reviewList()
            }         
          })

      }).catch(() => {
                   
      }); 
    },
    handleReaded () {
      if (this.selectNotice.length === 0) {
        this.$message({
          message: '至少选择一条消息',
          type: 'warning'
        })
        return
      }
      this._editNotice()
    },
    handleDelete () {
      if (this.selectNotice.length === 0) {
        this.$message({
          message: '至少选择一条消息',
          type: 'warning'
        })
        return
      }
      this._deleteNotice()
    },
    _getNoticeNumber () {
      getNoticeNumber().then(res => {
        this.noticeNumberList = res.data
      })
    },
    _getNoticeList () {
      let data = {}
      data.current_page = this.pagination.current_page
      data.page_size = this.pagination.page_size
      data.type = this.type
      getNoticeList(data).then(res => {
        this.noticeList = res.data.list
        this.pagination.total_count = res.data.total_count
      })
    },
    _editNotice () {
      let id = this.selectNotice.join(',')
      editNotice(id).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this._getNoticeList()
      })
    },
    _deleteNotice () {
      let id = this.selectNotice.join(',')
      deleteNotice(id).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this._getNoticeList()
      })
    }
  },
  filters:{
     filterA(val) {
    //    let str = val
    //    str = str.replace(/<[^<>]+>/g,'')
    //    return str 
     }
  },
  watch: {
    type () {
      this._getNoticeList()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.makeQuota{
  width: 100%;
  min-height: 100px;
  padding: 15px;
  resize: none;
}
.el-icon-message , .el-icon-paperclip{
  font-size:18px;
  cursor: pointer;
  margin: 0 5px;
} 
.line-div .small-Idiv{
   display: inline-block;
   width: 50%;
   text-align: center;
}

.header {
  margin: 20px;
}
.el-icon-bell {
  color: $themeColor;
  margin-right: 10px;
}
.readed {
  color: #aaa;
}
.bottom {
  margin: 20px 0;
  .right {
    text-align: right;
  }
}
.bill{
    padding: 5px 20px 20px;
    margin-bottom: 20px;
    background: #fff;  
}
</style>
<style scoped>
.collate >>> .el-dialog__body{
    padding: 0;
    background: #ebf4fe !important;
  }
.block{
  float: left;
}
.teshuStyle{
  margin-left: 25px;
}
.block >>> .el-input{
  width: 200px;
}
.demonstration{
  margin-right: 15px;
  color: #606266;
}
.pop-up,.input-box,.apply-process{
  width: 100%;
}
.margin >>> .el-dialog__body{
  padding: 0;
}
.checkModal >>>  .el-dialog__body{
  padding: 20px 30px 20px 0;
}
.issue-lines{
  width: 100%;
  margin: 10px 0;
  border-left: 4px solid #5494f6;
  font-size: 14px;
  padding-left: 10px;
}
.choose-input-box,.account-balance,.apply-information{
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.account-balance > ul > li,.apply-people > ul > li{
  display: inline-block;
  line-height:50px;
} 
.apply-people > ul > li{
  width: 50%;
}
.account-balance > ul > li{
  width: 50%;
}
.apply-people > ul > li > label{
 margin-left: 20px;
}
.account-balance > ul > li > label{
  margin-left: 20px;
}
.account-balance > ul > li > span,.account-balance > ul > li > a{
  margin-left: 4%;
}
.apply-information > .block{
  width: 60%;
  margin-left: 20px;
}
.apply-information > .apply-people{
  width: 50%;
  float: left;
}
.apply-information > .apply-people > ul > li label{
  margin-left: 20%;
}
.choose-input-box > .block{
  float: left;
  width: 50%;
  text-align: left;
  padding-left: 20px;
  box-sizing: border-box;
}
.apply-process-information{
  overflow: hidden;
}
.apply-process-information > ul{
  width: 50%;
  float: left;
  text-align: center;
}
.apply-process-information > ul > li{
  height: 40px;
  line-height: 40px;
  text-align: left;
  margin-left: 20px;
}
.dealers >>> .el-form-item__label{
  width: 120px !important;
  float: left;
}
.dealers >>> .el-form-item__content{
  width: 350px;
  margin-left: 0px !important;
  float: left;
}
.InputBox{
  height: 70px;
  margin-bottom: 22px;
}
.InputBox > label{
  float: left;
  padding-top: 10px;
}
.InputBox >>> .el-input{
  width: 350px;
  float: left;
  margin-left: 180px;
}
</style>
<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.el-icon-message , .el-icon-paperclip{
  font-size:18px;
  cursor: pointer;
  margin: 0 5px;
} 
.header {
  margin: 20px;
}
.el-icon-bell {
  color: $themeColor;
  margin-right: 10px;
}
.readed {
  color: #aaa;
}
.bottom {
  margin: 20px 0;
  .right {
    text-align: right;
  }
}
</style>