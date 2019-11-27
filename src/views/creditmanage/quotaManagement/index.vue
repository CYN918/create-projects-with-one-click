<template>
  <div class="margin">
      <div class="mcard mbottom">
        <div class="title">发放管理</div>
        <div>
        <el-form label-width="120px" size="small">
            <el-row>
                <el-col :span="6">
                  <el-col>
                    <el-form-item label="用户名称：">
                      <el-col :span="23">
                        <el-input  v-model="agencyName" placeholder="请输入">
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
        <el-col :span="6">
            <el-button type="primary" style="margin-bottom: 20px;" size="small" @click="creditsIssued" v-permit="'grant:quota'">发放额度</el-button>
         </el-col>
        <el-table :data="noticeList"    border>
          <el-table-column  type="index" align="center" width="50"></el-table-column>
          <el-table-column label="公司名称"  align="center" prop=""></el-table-column>
          <el-table-column label="发放给个人/部门"  align="center" width="500px" >
              <template slot-scope="scope">
                  <div v-if="scope.row.quotaBeneficiaryUserList.length" class="info">
                            <ul v-if="scope.row.beneficiaryType == 1"  class="titul">
                                <li>部门名称</li>
                                <li>部门负责人</li>
                                <li>额度管理人</li>
                                <li>额度发放人</li>
                                <li>账户</li>
                                <li>账户余额</li>
                              </ul>
                              <ul v-else-if="scope.row.beneficiaryType == 0"  class="titul">
                                <li>工号</li>
                                <li>姓名</li>
                                <li>职位</li>
                                <li>部门</li>
                                <li>账户</li>
                                <li>账户余额</li>
                              </ul>
                        <div v-for="(item,index) in  scope.row.quotaBeneficiaryUserList">
                          <div v-if="scope.row.beneficiaryType == 1" class="personalList">
                              <ul>
                                <li>{{ item.organizeName }}</li>
                                <li>{{ item.adminUserName }}</li>
                                <li>{{ item.quotaAdminUserName }}</li>
                                <li>{{ item.quotaGrantUserName }}</li>
                                <li>{{ item.accountName }}</li>
                                <li>{{ item.balanceAmount }}</li>
                              </ul>
                          </div>
                          <div v-else-if="scope.row.beneficiaryType == 0"  class="personalList">
                               <ul>
                                <li>{{ item.userId }}</li>
                                <li>{{ item.userName }}</li>
                                <li>{{ item.position }}</li>
                                <li>{{ item.organizeName }}</li>
                                <li>{{ item.accountName }}</li>
                                <li>{{ item.balanceAmount }}</li>
                              </ul>
                          </div>   
                       </div>
                       <!-- <div v-if="scope.row.quotaBeneficiaryUserList.length>2"> <i class="down_d " :class="scope.row.id"  @click="showMore(scope.row.id)"></i></div> -->
                  </div>
                  <div v-else>暂无信息</div>
            </template>
          </el-table-column>
          <el-table-column label="本次发放金额"  align="center" prop="payAmount"></el-table-column>
          <el-table-column label="额度管理人"  align="center" prop="quotaManagerName"></el-table-column>
          <el-table-column label="额度发放人" align="center" prop="quotaExecutorName"></el-table-column>
          <el-table-column label="审核状态"  align="center" prop="auditStatus">
            <template slot-scope="scope">
              <div v-if="scope.row.auditStatus == 0">待审核</div>
              <div v-else-if="scope.row.auditStatus == 1">审核通过</div>
              <div v-else-if="scope.row.auditStatus == 2">审核失败</div>
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
          <el-table-column label="发放时间"  align="center" prop="payTime"></el-table-column>
          
          <el-table-column label="操作" align="left" fixed="right" width="120" prop="id">
              <template slot-scope="scope">
                <div class="line-div">
                   <div  class="small-Idiv" @click="openDetails(scope.row.id)" v-permit="'management:view'">
                      <div class="i-div">
                        <img src="../../../common/images/icon/查看详情.png" alt class="operation_img" />
                      </div>
                      <span style="word-break: keep-all;margin-left: 3px;">详情</span>
                    </div>
                   <div  v-show="scope.row.auditStatus == 0" class="small-Idiv" @click="checkTopup(scope.row.id)" v-permit="'management:audit'">
                      <div class="i-div">
                        <img src="../../../common/images/icon/确认退款.png" alt class="operation_img" />
                      </div>
                      <span style="word-break: keep-all;margin-left: 3px;">审核</span>
                    </div>
                    <div v-show="scope.row.auditStatus == 1 && scope.row.payStatus == 0" class="small-Idiv" @click="linesApply(scope.row.id,scope.row.quotaBeneficiaryUserList,scope.row.quotaManagerName,scope.row.quotaExecutorName,scope.row.payAmount,scope.row.purchaseGoods,scope.row.quotaGrantGoodsList,scope.row.beneficiaryType)" v-permit="'quato:issue'">
                      <div class="i-div">
                        <img src="../../../common/images/icon/指派采购员.png" alt class="operation_img" />
                      </div>
                      <span style="word-break: keep-all;margin-left: 3px;">发放</span>
                    </div>
                </div>
              </template>
          </el-table-column>
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
      
        <!-- 充值到账核对 -->
        <el-dialog
          title="额度发放审核"
          :visible.sync="dialogVisible"
          width="80%"
          :close-on-click-modal="false"
          :before-close="handleClose"
          class="collate"
        >
         <div class="bill">
            <p class="top-up-bill">额度发放审核信息</p>
            <el-table :data="noticeListH" stripe  border>
                 <el-table-column  type="index" align="center" width="50"></el-table-column>
                  <el-table-column label="公司名称"  align="center" prop=""></el-table-column>
                  <el-table-column label="发放给个人/部门"  align="center" width="500px">
                      <template slot-scope="scope">
                          <div v-if="scope.row.quotaBeneficiaryUserList.length" class="info">
                                    <ul v-if="scope.row.beneficiaryType == 1" style="background: #eee;">
                                        <li>部门名称</li>
                                        <li>部门负责人</li>
                                        <li>额度管理人</li>
                                        <li>额度发放人</li>
                                        <li>账户</li>
                                        <li>账户余额</li>
                                      </ul>
                                      <ul v-else-if="scope.row.beneficiaryType == 0" style="background: #eee;">
                                        <li>工号</li>
                                        <li>姓名</li>
                                        <li>职位</li>
                                        <li>部门</li>
                                        <li>账户</li>
                                        <li>账户余额</li>
                                      </ul>
                                <div v-for="item in  scope.row.quotaBeneficiaryUserList">
                                  <div v-if="scope.row.beneficiaryType == 1">
                                      <ul>
                                        <li>{{ item.organizeName }}</li>
                                        <li>{{ item.adminUserName }}</li>
                                        <li>{{ item.quotaAdminUserName }}</li>
                                        <li>{{ item.quotaGrantUserName }}</li>
                                        <li>{{ item.accountName }}</li>
                                        <li>{{ item.balanceAmount }}</li>
                                      </ul>
                                  </div>
                                  <div v-else-if="scope.row.beneficiaryType == 0">
                                      <ul>
                                        <li>{{ item.userId }}</li>
                                        <li>{{ item.userName }}</li>
                                        <li>{{ item.position }}</li>
                                        <li>{{ item.organizeName }}</li>
                                        <li>{{ item.accountName }}</li>
                                        <li>{{ item.balanceAmount }}</li>
                                      </ul>
                                  </div>   
                              </div>
                          </div>
                          <div v-else>暂无信息</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="本次发放金额"  align="center" prop="payAmount"></el-table-column>
                  <el-table-column label="额度管理人"  align="center" prop="quotaManagerName"></el-table-column>
                  <el-table-column label="额度发放人" align="center" prop="quotaExecutorName"></el-table-column>
                  <el-table-column label="审核状态"  align="center" prop="auditStatus">
                    <template slot-scope="scope">
                      <div v-if="scope.row.auditStatus == 0">待审核</div>
                      <div v-else-if="scope.row.auditStatus == 1">审核通过</div>
                      <div v-else-if="scope.row.auditStatus == 2">审核失败</div>
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
                  <el-table-column label="发放时间"  align="center" prop="payTime"></el-table-column>
                   
            </el-table>
         </div>   
          <div class="bill">
            <p class="top-up-bill">额度发放审核</p>
            <div>
              <el-form ref="form" :model="form" label-width="80px" style="margin-top: 20px;">
              <el-form-item label="审核结果:">
                <template>
                <!--  <el-radio label="0" v-model="form.resource">待核对</el-radio> -->
                  <el-radio label="1" v-model="form.resource">通过</el-radio>
                  <el-radio label="2" v-model="form.resource">不通过</el-radio>
                </template>
              </el-form-item>
              <!-- <el-form-item label="核对金额:">
                <el-input type="number"  v-model="form.amount" style="resize:none;width:40%;" ></el-input>  元
              </el-form-item> -->
              <el-form-item label="审核说明:">
                <el-input type="textarea" v-model="form.desc" style="resize:none;"></el-input>
              </el-form-item>
              </el-form>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose" size="small">取 消</el-button>
            <el-button type="primary" @click="handleSave" size="small">确 定</el-button>
          </span>
        </el-dialog>

     <!-- 总站新增额度发放 -->
    <el-dialog
      title="额度发放"
      :visible.sync="linesVisible"
      width="70%"
      :before-close="handleLinesClose"
      :close-on-click-modal="false"
      class="collate"
      >
       <div class="bill">
           <div class="input-box">
           <p class="issue-lines">基本信息</p>
        </div>
        <div class="details">
          <el-row>
            <el-col :span="8"><div class="grid-content bg-purple-light">额度管理人：{{ formD.quotaManagerName }}</div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">额度发放人: {{ formD.quotaExecutorName }}</div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple-light">发放额度： {{ formD.payAmount }}</div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple-light">是否限购商品：<span v-if="formD.purchaseGoods ==0">不限购商品</span><span v-if="formD.purchaseGoods ==1">限购商品</span> </div></el-col>
          </el-row>
        </div>
       </div>
      <div class="bill">
         <div class="pop-up">
          <template v-if="formD.quotaBeneficiaryUserList.length>=1">
            <div class="input-box">
              <p class="issue-lines">{{ formD.tit }}</p>
            </div>
            <div class="details detailsP" v-if="formD.beneficiaryType == 1">
              <el-table :data="quotaBeneficiaryUserList" stripe  border>
                  <el-table-column  type="index" align="center" width="50"></el-table-column>
                  <el-table-column label="部门编号"  align="center" prop="organizeId"></el-table-column>
                  <el-table-column label="部门名称"  align="center" prop="organizeName"></el-table-column>
                  <el-table-column label="部门负责人"  align="center" prop="adminUserName"></el-table-column>
                  <el-table-column label="部门额度管理人" align="center" prop="quotaAdminUserName"></el-table-column>
                  <el-table-column label="部门额度发放人"  align="center" prop="quotaGrantUserName"></el-table-column>
                </el-table>
                <el-row class="bottom">
                  <el-col :span="18" class="right">
                    <el-pagination
                      background
                      @size-change="handleSizeChange1"
                      @current-change="handleCurrentChange1"
                      :current-page="pagination1.current_page"
                      :page-size="pagination1.page_size"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="formD.quotaBeneficiaryUserList.length"
                    ></el-pagination>
                  </el-col>
                </el-row>
                <!-- <div v-if="quotaBeneficiaryUserList.length>=2"> <i class="down_d" :class="down1" @click="showMore"></i></div> -->
            </div>
            <div class="details detailsP" v-if="formD.beneficiaryType == 0">
              <el-table :data="quotaBeneficiaryUserList" stripe   border>
                  <el-table-column  type="index" align="center" width="50"></el-table-column>
                  <el-table-column label="部门编号"  align="center" prop="organizeId"></el-table-column>
                  <el-table-column label="部门名称"  align="center" prop="organizeName"></el-table-column>
                  <el-table-column label="工号"  align="center" prop="userId"></el-table-column>
                  <el-table-column label="姓名" align="center" prop="userName"></el-table-column>
                  <el-table-column label="职位"  align="center" prop="position"></el-table-column>
                  <el-table-column label="账户类型"  align="center" prop="accountName"></el-table-column>
                </el-table>
                <el-row class="bottom">
                  <el-col :span="18" class="right">
                    <el-pagination
                      background
                      @size-change="handleSizeChange1"
                      @current-change="handleCurrentChange1"
                      :current-page="pagination1.current_page"
                      :page-size="pagination1.page_size"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="formD.quotaBeneficiaryUserList.length"
                    ></el-pagination>
                  </el-col>
                </el-row>
                <!-- <div v-if="quotaBeneficiaryUserList.length>2"> <i class="down_d el-icon-arrow-down" :class="down1" @click="showMore1"></i></div> -->
            </div>
          </template>
          <template v-if="formD.quotaGrantGoodsList.length>=1">
            <div class="input-box">
              <p class="issue-lines">限购商品</p>
            </div>
            <div class="details detailsG">
                <el-table  border style="width: 100%" stripe  :data="quotaGrantGoodsList" 
                          ref="multipleTable"
                        >
                          <el-table-column type="index"  align="center" width="55"></el-table-column>
                          <el-table-column label="商品分类" align="center" prop="catName"></el-table-column>
                          <el-table-column label="商品品牌" align="center" prop="brandName"></el-table-column>
                          <el-table-column label="商品详情" align="center">
                            <template slot-scope="scope">
                                  <div class="txt_left" style="font-size:15px">商品名称：{{scope.row.goodsName}}</div>
                                  <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                                  <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                              </template>
                          </el-table-column>
                        </el-table>
                <el-row class="bottom">
                  <el-col :span="18" class="right">
                    <el-pagination
                      background
                      @size-change="handleSizeChange3"
                      @current-change="handleCurrentChange3"
                      :current-page="pagination3.current_page"
                      :page-size="pagination3.page_size"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="formD.quotaGrantGoodsList.length"
                    ></el-pagination>
                  </el-col>
                </el-row>
            </div>
          </template> 
         </div>
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
        <el-button @click="handleLinesClose" size="small">取 消</el-button>
        <el-button type="primary" @click="handleLinesSave" size="small">保存</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {  itemsList , auditCheck , auditQuotaMember , makeQuotaSave } from '@/api/creditmanage/index'
export default {
  name: 'Notice',
  data () {
    return {
      createTime:'',   // 时间
      agencyName: '', //用户名称
      dialogVisible: false,   // 核对弹框
      linesVisible:false,     // 发放弹框
      noticeList: [],       
      noticeListH: [],  // 充值到账核对弹框表格数据
      pagination: {               // 列表
        current_page: 1,
        page_size: 10,
        total_count: 0
      },
      pagination1: {               // 个人与部门
        current_page: 1,
        page_size: 10,
        total_count: 0
      },
  
       pagination3: {               // 商品
        current_page: 1,
        page_size: 10,
        total_count: 0
      },
      selectNotice: [],
      form: {             //核对弹框数据
        resource: '1',
        // amount: '',
        desc: '',
      },
      payInstruction :'',                            // 发放理由
      formD:{                                       // 发放详情
        quotaBeneficiaryUserList:[],
        quotaManagerName:'',
        quotaExecutorName:'',
        payAmount:'',
        purchaseGoods:0,
        tit:'',
        quotaGrantGoodsList:[],
        beneficiaryType:''
      },
      quotaBeneficiaryUserList:[],
      quotaGrantGoodsList:[],
      showList:'showList',
      hidList:'hidList',
      down:'el-icon-arrow-down',
      down1:'el-icon-arrow-down'
    }
  },
  created () {
    // this._getNoticeNumber()
    // this._getNoticeList()
    this.itemsList()
  },
  methods: {
    itemsList() {
      let data = {}
      data.pageNum = Number(this.pagination.current_page)
      data.pageSize = Number(this.pagination.page_size)
      data.userName = this.agencyName
      data.payStartTime = this.createTime[0]
      data.payEndTime = this.createTime[1]
      itemsList(data).then(res => {
        var that =this
        that.noticeList = res.data.list
        this.pagination.total_count = res.data.total
      })
    },
     // 跳转详情页面
    openDetails(id) {   
        this.$router.push({ name: "quotaDetail" , query: {id: id}});
    },
    handlecreateTime() {

    },
    // 搜索
    handelSearchGoods(){
      this.pagination.current_page = 1  
      this.itemsList()
    },
    // 重置
    reset() {
       this.pagination.current_page = 1
       this.pagination.page_size = 10
       this.agencyName = ''
       this.createTime = ''
       this.itemsList()
    },
     //核对
    checkTopup(id){
       this.id =  id
       this.dialogVisible = true;
       this.form.resource = '1' 
      //  this.form.amount = ''    
       this.form.desc = ''        
       var data = {
         id: id
       }
       auditCheck(data).then(res=>{
          var data = []
          data[0] = res.data
          this.noticeListH = data
       })
    },
     // 取消核对
    handleClose() {
        if( this.form.desc ){
           this.$confirm('是否取消审核?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              this.dialogVisible = false
          }).catch(() => {
                    
          });
        }else{
           this.dialogVisible = false
        }
    },
    // 确认核对
    handleSave() {
      var data = {}
      data.auditStatus = this.form.resource 
      // data.checkAmount = this.form.amount 
      data.auditInstruction = this.form.desc 
      data.id = this.id
 
      this.$confirm('是否确定审核?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
           auditQuotaMember(data).then(res=>{
            if( res.code == 200 ) {
                this.$message({
                  type: 'success',
                  message: res.message
                }); 
                this.dialogVisible = false
                this.itemsList()
            }         
          })

      }).catch(() => {
                   
      }); 
    },
     //发放
    linesApply(id, quotaBeneficiaryUserList, quotaManagerName, quotaExecutorName,payAmount,purchaseGoods,quotaGrantGoodsList,beneficiaryType){
       this.id = id
       this.linesVisible = true
       this.payInstruction = ""    
       
       this.formD.beneficiaryType = beneficiaryType
       this.formD.quotaBeneficiaryUserList = quotaBeneficiaryUserList

       this.pagination1.current_page = 1
       this.quotaBeneficiaryUserList = this.formD.quotaBeneficiaryUserList.slice((this.pagination1.current_page-1)*10,this.pagination1.page_size*this.pagination1.current_page)
       if( beneficiaryType == 1){
          this.formD.tit = '发放给部门'
       } else if(  beneficiaryType == 0 ){
          this.formD.tit = '发放给个人'
       }
       
       this.formD.quotaManagerName = quotaManagerName
       this.formD.quotaExecutorName = quotaExecutorName
       this.formD.payAmount = payAmount
       this.formD.purchaseGoods = purchaseGoods
       this.formD.quotaGrantGoodsList = quotaGrantGoodsList
       this.pagination3.current_page = 1
       this.quotaGrantGoodsList = this.formD.quotaGrantGoodsList.slice((this.pagination3.current_page-1)*10,this.pagination3.page_size*this.pagination3.current_page)

      //  this.formD.Issue1 = userName
      //  this.formD.Issue2 = organizeId
      //  this.formD.Issue3 = position
      //  this.formD.Issue4 = userNo
      //  this.formD.Issue5 = quotaManagerName
      //  this.formD.Issue6 = quotaExecutorName
      //  this.formD.Issue7 = payAmount
      //  this.formD.Issue8 = balanceAmount

       
       var data = {}
       data.id = id
      //  checkTopup(data).then(res=>{
      //    var data = []
      //    data[0] = res.data
      //    this.noticeListF = data
      //  })
    },
    // 取消发放
    handleLinesClose() {
       if( this.payInstruction ){
          this.$confirm('是否取消发放?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                this.linesVisible = false
            }).catch(() => {
                      
            });
       }else{
           this.linesVisible = false
       }
    },
    // 确认发放
    handleLinesSave() {
      var data = {}
      data.payInstruction =  this.payInstruction
      data.id = this.id

       this.$confirm('是否确定发放?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
            makeQuotaSave(data).then(res=>{
              if(res.code == 200 ) {
                  this.$message({
                    type: 'success',
                    message: res.message
                  }); 
                  this.linesVisible = false
                  this.itemsList()
                  // 跳转到额度审核页面
                 // this.$router.push({name:"creditAudit"})
              }         
            })
          
      }).catch(() => {
                   
      }); 

    },
    handleSizeChange (val) {
      this.pagination.page_size = val
      this.itemsList()
    },
    handleCurrentChange (val) {
      this.pagination.current_page = val
      this.itemsList()
    },
     handleSizeChange1 (val) {
      this.pagination1.page_size = val
      this.quotaBeneficiaryUserList = this.formD.quotaBeneficiaryUserList.slice((this.pagination1.current_page-1)*10,this.pagination1.page_size*this.pagination1.current_page)
    },
    handleCurrentChange1 (val) {
      this.pagination1.current_page = val
      this.quotaBeneficiaryUserList = this.formD.quotaBeneficiaryUserList.slice((this.pagination1.current_page-1)*10,this.pagination1.page_size*this.pagination1.current_page)
    },
   
     handleSizeChange3 (val) {
      this.pagination3.page_size = val
      this.quotaGrantGoodsList = this.formD.quotaGrantGoodsList.slice((this.pagination3.current_page-1)*10,this.pagination3.page_size*this.pagination3.current_page)
    },
    handleCurrentChange3 (val) {
      this.pagination3.current_page = val
      this.quotaGrantGoodsList = this.formD.quotaGrantGoodsList.slice((this.pagination3.current_page-1)*10,this.pagination3.page_size*this.pagination3.current_page)
    },
    // 额度发放
    creditsIssued () {
       this.$router.push({name:"agrant"})
    },
    // 显示更多
    showMore(index){
      console.log(index)
      if( this.down == 'el-icon-arrow-down' ){
          this.down = 'el-icon-arrow-up'
          this.hidList = "showList"
      }else{
         this.down = 'el-icon-arrow-down'
         this.hidList = "hidList"
      }
    },
     // 显示更多
    showMore1(){
      if( this.down1 == 'el-icon-arrow-down' ){
         this.down1 = 'el-icon-arrow-up'
       
      }else{
         this.down1 = 'el-icon-arrow-down'
         this.hidList = "hidList"
      }
    }
  },
  filters:{
    //  filterA(val) {
    // //    let str = val
    // //    str = str.replace(/<[^<>]+>/g,'')
    // //    return str 
    //  }
  },
  watch: {
    // type () {
    //   this._getNoticeList()
    // }
  }
}
</script>
<style  scoped>
  .collate >>> .el-dialog__body{
    padding: 0;
    background: #ebf4fe !important;
  }
</style>
<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.bill{
        padding: 5px 20px 20px;
        margin-bottom: 20px;
        background: #fff;  
    }
.info ul{
  width: 100%;
  display: flex;
}
.info ul li{
  display: inline-block;
  width: 16.666666%;
}
.titul li{
   font-weight: bold;
   background: #ccc;
}
.personalList ul{
 border-bottom: 1px solid #ebeef5;
}
.down_d{
  font-size: 16px;
  font-weight: bold;
  color: #4C86F4;
  cursor: pointer;
}
.info>div{
 
}
.hidList{
  height: 0;
  visibility: hidden;
}
.details 
.showList{
 height: auto;
 visibility: visible;
}
.details{
  margin: 0;
}
.details  .el-row{
  font-size: 14px;
  line-height: 30px;
}
.issue-lines {
    width: 100%;
    border-left: 4px solid #5494f6;
    font-size: 16px;
    padding-left: 10px;
    margin: 10px 0;
}
.makeQuota {
    width: 100%;
    min-height: 100px;
    padding: 15px;
    resize: none;
}
.top-up-bill {
    border-left: 4px solid #4a99fa;
    padding-left: 5px;
    margin: 10px;
}
.line-div .small-Idiv{
  display:inline-block;
  width:50%;
  text-align: center;
}
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
