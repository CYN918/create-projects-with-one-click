<template>
  <div class="margin">
      <div class="mcard mbottom">
        <div class="title" v-if="this.user.data.sysuserType === 0">额度发放管理</div>
        <div class="title" v-if="this.user.data.sysuserType === 3">经销商额度发放管理</div>
        <div>
        <el-form label-width="120px" size="small">
            <el-row>
                <!-- <el-col :span="6">
                  <el-col>
                    <el-form-item label="经销商名称：">
                      <el-col :span="23">
                        <el-input  v-model="merchantName" placeholder="请输入">
                        </el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col> -->
                <el-col :span="6">
                  <el-col>
                    <el-form-item label="商家名称：">
                      <el-col :span="23">
                        <el-input  v-model="vendorName" placeholder="请输入">
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
    
      <div class="mcard">
        <el-row class="operate mbottom">
          <el-col :span="21">
              <el-button type="primary" size="small" @click="newIssue" v-if="this.user.data.sysuserType === 0" v-permit="'lines:add'">新增</el-button>
              <el-button type="primary" size="small" @click="newIssue" v-if="this.user.data.sysuserType === 3" v-permit="'lines:add'">新增</el-button>
          </el-col>
          <el-col :span="3">
          </el-col>
        </el-row>
        <el-table :data="noticeList" stripe  @selection-change="handleSelectionChange" border>
          <el-table-column  type="index" align="center" width="50"></el-table-column>
          <el-table-column label="额度管理人"  align="center" prop="quotaManagerName" v-if="this.user.data.sysuserType === 0"></el-table-column>
          <el-table-column label="经销商额度管理人"  align="center" prop="quotaManagerName" v-if="this.user.data.sysuserType === 3"></el-table-column>
          <el-table-column label="额度发放人"  align="center" prop="quotaExecutorName"></el-table-column>
          <el-table-column label="发放申请表"  align="center" prop="">
            <!-- <template slot-scope="scope">
              <div v-if=" 0 <= scope.row.businessType  &&  scope.row.businessType  <= 99">系统消息</div>
              <div v-else-if=" 100 <= scope.row.businessType &&  scope.row.businessType <= 199">供应商</div>
              <div v-else-if=" 200 <= scope.row.businessType &&  scope.row.businessType <= 299">客户</div>
              <div v-else-if=" 300 <= scope.row.businessType &&  scope.row.businessType <= 399">用户</div>
              <div v-else-if=" 400 <= scope.row.businessType &&  scope.row.businessType <= 499">商品</div>
              <div v-else-if=" 500 <= scope.row.businessType &&  scope.row.businessType <= 599">订单</div>
              <div v-else-if=" 600 <= scope.row.businessType &&  scope.row.businessType <= 699">售后</div>
            </template> -->
          </el-table-column>
          <el-table-column label="提交申请人"  align="center" prop="applyUserName"></el-table-column>
          <el-table-column label="服务商"  align="center" prop="merchantName"  v-if="this.user.data.sysuserType === 0"></el-table-column>
          <el-table-column label="客户名称"  align="center" prop="merchantName"  v-if="this.user.data.sysuserType === 3"></el-table-column>
          <el-table-column label="服务商账号"  align="center" prop="accountName" v-if="this.user.data.sysuserType === 0">
              <!-- <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.sendTime }}</span>
              </template> -->
          </el-table-column>
          <el-table-column label="平台名称"  align="center" prop=""  v-if="this.user.data.sysuserType === 3"></el-table-column>
           <el-table-column label="平台账户"  align="center" prop=""  v-if="this.user.data.sysuserType === 3"></el-table-column>
          <el-table-column 
            label="销售员"
            align="center"
            prop="adminUserName"
            v-if="this.user.data.sysuserType === 0"
            >
           
          </el-table-column>
          <el-table-column label="本次充值金额" align="center" prop="paymentAmount"></el-table-column>
          <el-table-column label="本次授信额度"  align="center" prop=""></el-table-column>
          <el-table-column label="本次发放金额"  align="center" prop="applyAmount"></el-table-column>
          <el-table-column label="账户余额" align="center" prop="balanceAmount"></el-table-column>
          <!-- <el-table-column label="审核状态"  align="center" prop="receiverName"></el-table-column>
          <el-table-column label="状态"  align="center" prop="messageCategory"></el-table-column> -->
          <el-table-column label="操作" align="center" fixed="right" width="100" prop="id">
              <template slot-scope="scope">
                <div class="line-div">
                  <div class="small-Idiv" @click="openDetails(scope.row.id)" v-permit="'lines:details'">
                    <div class="i-div">
                      <img src="../../../common/images/icon/查看详情.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;margin-left: 3px;">详情</span>
                  </div>
                  <!-- <div class="small-Idiv" @click="openDetails(scope.row.id)">
                    <div class="i-div">
                      <img src="../../../common/images/icon/审核.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;margin-left: 3px;">领导审核</span>
                  </div> -->
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

    <!-- 总站新增额度发放 -->
    <el-dialog
      title="额度发放-新增"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
      :close-on-click-modal="false">
      <div class="pop-up">
        <div class="input-box" style="padding-bottom: 20px;">
          <p class="issue-lines">额度发放</p>
          <div class="choose-input-box">
            <div class="block">
              <span class="demonstration">经销商名称:</span>
              <el-select v-model="dealers" placeholder="请选择" size='small'>
                <el-option
                  v-for="item in dealersNameList"
                  :key="item.agencyId"
                  :label="item.agencyName"
                  :value="item.agencyId">
                </el-option>
              </el-select>
            </div>
            <div class="block">
              <span class="demonstration">经销商账户:</span>
              <el-select v-model="dealersAccount" placeholder="请选择" size='small'>
                <el-option
                  v-for="item in dealersAccountList"
                  :key="item.id"
                  :label="item.accountName"
                  :value="item.id">
                </el-option>
             </el-select>
            </div>
          </div>
          <div class="account-balance" style="overflow: hidden;">
            <ul>
              <li><label class="demonstration">账户余额:</label><span><i style="color: #ff3a44;font-style: normal;">{{ accountinfo }}</i>(元)</span></li>
              <li><label class="demonstration">额度申请表:</label><a href="" style="color: #4a99fa;">申请表链接</a></li>
            </ul>
          </div>
          <div class="apply-information" style="overflow: hidden;line-height: 50px;">
            <div class="block">
              <span class="demonstration">本次申请充值金额:</span>
              <el-input
                size='small'
                type="number"
                v-model="topUpAccount"
                clearable>
              </el-input>元
            </div>
            <div class="apply-people">
              <ul>
                <li><label class="demonstration">申请提交人: </label><span>{{sysuserName}}</span></li>
                <!-- <li><label>部门:</label><span>{{ organizeName }}</span></li> -->
              </ul>
            </div>
          </div>
            <div class="apply-information" style="overflow: hidden;line-height: 50px;">
            <div class="apply-people">
              <ul>
                <!-- <li><label>申请提交人:</label><span>{{sysuserName}}</span></li> -->
                <li><label class="demonstration">部门: </label><span>{{ organizeName }}</span></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="apply-process" v-show="apply_d">
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
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">保存</el-button>
      </span>
    </el-dialog>

    <!-- 经销商新增额度发放 -->
    <el-dialog
      title="经销商给项目发放额度"
      :visible.sync="dialogVisible1"
      width="50%"
      :before-close="handleClose">
      <div class="dealers">
        <p class="issue-lines">经销商给项目发放额度</p>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="服务商">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="额度管理人">
            <el-input v-model="form.management"></el-input>
          </el-form-item>
          <el-form-item label="发放人">
            <el-input v-model="form.issue"></el-input>
          </el-form-item>
          <el-form-item label="发放对象">
            <el-select v-model="form.region" placeholder="请选择发放对象">
              <el-option label="广东南粤集团有限公司" value="1"></el-option>
              <el-option label="上海同程金服" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="平台名称">
            <el-select v-model="form.platform" placeholder="请选择平台名称">
              <el-option label="广东南粤集团有限公司" value="1"></el-option>
              <el-option label="上海同程金服" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="平台账号">
            <el-select v-model="form.account" placeholder="请选择平台账户">
              <el-option label="广东南粤集团有限公司" value="1"></el-option>
              <el-option label="上海同程金服" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发放申请表">
            <el-link type="primary">申请表链接</el-link>
          </el-form-item>
          <el-form-item label="本次充值额度">
            <el-select v-model="form.lines" placeholder="请选择平台账户">
              <el-option label="广东南粤集团有限公司" value="1"></el-option>
              <el-option label="上海同程金服" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="本次发放额度">
            <el-radio-group v-model="form.resource">
              <el-radio label="限额"></el-radio>
              <el-radio label="不限额"></el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="InputBox">
             <label style="color: red;">(剩余可发放额度:<i style="color: red;font-style: normal;">200000</i>)积分<el-link type="primary">去充值</el-link></label>  
             <el-input v-model="form.input" placeholder="请输入内容"></el-input><span style="float: left;padding-top: 10px;">积分</span>
          </div> 
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import {  provideList , getNoticeNumber, getNoticeList, editNotice, deleteNotice } from '@/api/notice/index'
import {  agencyList , dealerAccount , findMerchantAccountInfo , Configuration , provideLists } from '@/api/creditmanage/index'

export default {
  name: 'Notice',
  data () {
    return {
      createTime:'',     // 时间
      merchantName: '', //经销商名称
      vendorName :'',   // 商家名称 
      receiverName: '', //收件人
      readStatus: '',   // 阅读状态
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
      dialogVisible: false,       // 额度发放新增
      dialogVisible1: false, 
      dealers: '',               // 商家id
      dealersNameList: [],
      dealersAccount: '',        // 账号id
      dealersAccountList: [],  
      accountinfo: '0',           // 账户余额
      topUpAccount : '',          // 本次申请金额
      sysuserName:'',   // 提交人
      organizeName:'',  // 提交人部门
      user: JSON.parse(window.localStorage.getItem("user")),
      form: {  
          name: '',
          management: '',
          issue: '',
          region: '',
          platform: '',
          account: '',
          lines: '',
          resource: '',
          input: '',
        },
      apply_d:false  
    }
  },
  created () {
    // this._getNoticeNumber()
    // this._getNoticeList()
    this.provideLists()
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    provideLists() {
      let data = {}
      data.pageNum = this.pagination.current_page
      data.pageSize = this.pagination.page_size
      data.merchantName = this.vendorName
      data.payStartTime = this.createTime[0]
      data.payEndTime = this.createTime[1]
     
      provideLists(data).then(res => {
        var that =this
        that.noticeList = res.data.list
        this.pagination.total_count = res.data.total
      })
    },
    // 新增中 经销商名称下拉框
     agencyList() {
        let data = {}
        data.pageNum = 1
        data.pageSize = 10000
        agencyList(data).then( res =>{
          this.dealersNameList = res.data.list
        });
    },
     // 新增中 经销商账户下拉框
     dealerAccount() {
        let data = {}
        data.pageNum = 1
        data.pageSize = 10000
        dealerAccount(data).then( res =>{
          this.dealersAccountList = res.data.list
        });
    },
    // 新增
    newIssue() {
        this.dealers = ''
        this.dealersAccount = ''
        this.accountinfo = '0'
        this.topUpAccount = ''
        this.dialogVisible = true
        const sysuer = JSON.parse(localStorage.getItem("user"))
        this.sysuserName = sysuer.data.sysuserName  
        this.organizeName = sysuer.data.organizeName 
        this.agencyList()      // 经销商名称
        this.dealerAccount()    // 经销商账户
    },
    // 查询账户余额
    findMerchantAccountInfo() {
       var data ={}
       data.accountId = Number(this.dealersAccount)
       data.merchantId = Number(this.dealers)
       data.merchantType = Number(this.user.data.sysuserType)
       if( data.accountId &&  data.merchantId ){
          findMerchantAccountInfo(data).then(res=>{
           this.accountinfo = res.data
         })
         
       }
    },
    // 查询审核流程信息
    Configuration(){
       var data ={}
       data.merchantId = Number(this.dealers)
       data.accountId = Number(this.dealersAccount)
       data.amount = Number(this.topUpAccount)
            
    },
    //筛选已读或未读
    filterTag(value, row) {
      console.log(value,row)  
      return row.tag === value;
    },
    // 跳转详情页面
    openDetails(id) {   
        this.$router.push({ name: "lines" , query: {id: id}});
    },
    handlecreateTime() {

    },
    // 搜索
    handelSearchGoods(){
      this.pagination.current_page = 1  
      this.provideLists()
    },
    reset(){
      this.pagination.current_page = 1
      this.pagination.page_size = 10
      this.vendorName = ''
      this.createTime = ''
      this.provideLists()
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
      this.provideLists()
    },
    handleCurrentChange (val) {
      this.pagination.current_page = val
      this.provideLists()
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
    },
    handleClose() {
        if( this.dealers || this.dealersAccount || this.accountinfo  ||  this.topUpAccount ){
            this.$confirm('是否取消额度发放新增?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                this.dialogVisible = false
            }).catch(() => {
                      
            });
        } else{
          this.dialogVisible = false
        }  
    },
    //总站新增额度提交
    submit(){
      this.$router.push({ name: "creditAudit"});
    },
    //经销商新增额度提交
    submit1(){
      this.$router.push({ name: "creditAudit"});
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
    },
    dealers(val) {
       this.findMerchantAccountInfo()
    },
    dealersAccount (val){
       this.findMerchantAccountInfo()
    },
    topUpAccount(val){
      this.Configuration()
    }
  }
}
</script>
<style scoped>
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
  width: 130px;
  text-align: right;
  display: inline-block;
}
.mcard >>> .cell{
  text-align: center;
}
.pop-up,.input-box,.apply-process{
  width: 100%;
}
.margin >>> .el-dialog__body{
  padding: 0;
}
.issue-lines{
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-left: 4px solid #5494f6;
  font-size: 16px;
  padding-left: 10px;
}
.choose-input-box,.account-balance{
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.account-balance > ul > li,.apply-people > ul > li{
  display: inline-block;
} 
.account-balance > ul > li{
  width: 50%;
}
.account-balance > ul > li > label{
  /* margin-left: 20%; */
}
.account-balance > ul > li > span,.account-balance > ul > li > a{
  margin-left: 4%;
}
.apply-information > .block{
  width: 50%;
  float: left;
}
.apply-information > .apply-people{
  width: 50%;
  float: left;
}
.apply-information > .apply-people > ul > li{
  /* margin-left: 20%; */
}
.choose-input-box > .block{
  float: left;
  width: 50%;
}
.apply-process-information{
  height: 193px;
}
.apply-process-information > ul{
  width: 50%;
  float: left;
}
.apply-process-information > ul > li{
  height: 40px;
  line-height: 40px;
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
.line-div{
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;
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