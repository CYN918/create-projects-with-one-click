<template>
  <div class="margin0">
     <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">付款单</h4>
            <div class="search-base">
              <el-row>
               <el-col :span="5">
                   <el-form-item label="平台名称：">
                     <el-col :span="21">
                            <el-input v-model="tableDatas.projectName" placeholder="请输入平台名称"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="客户名称：">
                            <el-col :span="21">
                              <el-input v-model="tableDatas.customerName" placeholder="请输入客户名称/姓名/电话"></el-input>
                            </el-col>
                        </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="供应商：">
                            <el-col :span="21">
                                <el-input placeholder="请输入供应商/姓名/电话" v-model="tableDatas.supplierInfo"></el-input>
                            </el-col>
                        </el-form-item>
                </el-col>
                <el-col :span="5">
                   <el-col :span="22">
                    <el-form-item label="状态：">
                      <el-select v-model="tableDatas.status" placeholder="请选择" style="width:100%">
                            <el-option
                              v-for="item in options1"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                    </el-form-item>
                   </el-col>
                 </el-col>

                <el-col :span="2" >
                          <el-button type="primary" size="small" @click='inSearch()' >查询</el-button>
 
                    </el-col>
               
              </el-row>
               <el-row>
                 
                 <el-col :span="5">
                    <el-form-item label="单号：">
                            <el-col :span="21">
                              <el-input v-model="tableDatas.orderNo" placeholder="请输入销售或采购单号"></el-input>
                            </el-col>
                        </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="交货日期：">
                        <el-col :span="23">
                            <el-date-picker
                            type=daterange
                            valueFormat='yyyy-MM-dd HH:mm:ss'
                            v-model="tableDatas.deliveryDate"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
            </el-row> 
              
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mcard" style="border:1px solid #d7e0f1">
   
      <el-table :data="orderData" border 
          @selection-change="handleSelectionChange" 
          
          :row-class-name="tableRowClassName"
          :row-style="selectedHighlight"
          @row-dblclick="AhandleSelectionChange">
          
         <el-table-column label="序号" type="index" align="center"  width="50"></el-table-column>
            <el-table-column label="状态" prop="name" align="center"  width="70">
                      <template slot-scope="scope">
                            <div class="txt_left" v-html="scope.row.statusTip"></div>
                      </template>
            </el-table-column>
            <el-table-column label="付款单编号" prop="name" align="center" width="100">
                   <template slot-scope="scope">
                    {{scope.row.billNo}}
                   </template>
            </el-table-column>
            <el-table-column label="申请日期" prop="name" align="center" width="80">
                   <template slot-scope="scope">
                    {{scope.row.orderTotalAmount}}
                   </template>
            </el-table-column>
              <el-table-column label="采购订单信息" prop="name" align="center" width="220">
                      <template slot-scope="scope">
                          <div :class="scope.row.details.length>2?'wrapper1':''" v-if="showIndex===1">
                            <div v-for="(item,index) in scope.row.details" :key="index"
                            :class="scope.row.details.length<=1?'':'boxImg'">
                                  <div class="txt_left">采购单号：{{item.purchaseOrderNo}}</div>
                                  <div class="txt_left">采购交货日期：{{item.distributionTime | date}}</div>
                                  <div class="txt_left">创建时间：{{item.purchaseCreateTime}}</div>
                                  <div class="txt_left">采销员：{{item.purchaseUserName}}</div>
                                  <div class="txt_left">签约公司：{{item.company}}</div>
                            </div>
                            <div class="down" @click="downOn" v-if="scope.row.details.length>2">
                                  <span>共有{{scope.row.details.length}}条数据,点击展开</span>
                                  <i class="el-icon-arrow-down" >
                                </i></div>
                          </div>
                          <div class="upBox" v-if="showIndex===0" style="padding-bottom:20px;box-sizing:border-box;">
                            <div  v-for="(item,index) in scope.row.details" :key="index"
                            :class="scope.row.details.length<=1?'':'boxImg'">
                                  <div class="txt_left">采购单号：{{item.purchaseOrderNo}}</div>
                                  <div class="txt_left">采购交货日期：{{item.distributionTime | date}}</div>
                                  <div class="txt_left">创建时间：{{item.purchaseCreateTime}}</div>
                                  <div class="txt_left">采销员：{{item.purchaseUserName}}</div>
                                  <div class="txt_left">签约公司：{{item.company}}</div>
                            </div>
                           <div class="down" @click="downOff1" v-if="scope.row.details.length>2"><i class="el-icon-arrow-up" ></i></div>
                          </div>
                          
                    </template>
        </el-table-column>
            <el-table-column label="销售订单信息" prop="name" align="center"  width="180">
                      <template slot-scope="scope">
                         <div :class="scope.row.details.length>2?'wrapper2':''" v-if="showIndex===1">
                          <div  v-for="(item,index) in scope.row.details" :key="index"
                          :class="scope.row.details.length<=1?'':'boxImg1'">
                            <div class="txt_left">销售单号：{{item.saleOrderNo}}</div>
                            <div class="txt_left">客户名称：{{item.customerName}}</div>
                            <div class="txt_left">经销商：{{item.agencyName}}</div>
                            <div class="txt_left">平台名称：{{item.projectName}}</div>
                            <div class="txt_left">销售员：{{item.bizUserName}}</div>
                          </div>
                          <div class="down" @click="downOn1" v-if="scope.row.details.length>2"><i class="el-icon-arrow-down" ></i></div>
                         </div>
                         <div class="upBox1" v-if="showIndex===0" style="padding-bottom:20px;box-sizing:border-box;">
                          <div   v-for="(item,index) in scope.row.details" :key="index"
                          :class="scope.row.details.length<=1?'':'boxImg1'">
                            <div class="txt_left">销售单号：{{item.saleOrderNo}}</div>
                            <div class="txt_left">客户名称：{{item.customerName}}</div>
                            <div class="txt_left">经销商：{{item.agencyName}}</div>
                            <div class="txt_left">平台名称：{{item.projectName}}</div>
                            <div class="txt_left">销售员：{{item.bizUserName}}</div>
                          </div>
                          <div class="down" @click="downOff1" v-if="scope.row.details.length>2"><i class="el-icon-arrow-up" ></i></div>
                         </div>
                         
                    </template>
            </el-table-column>
            <el-table-column label="供应商信息" prop="name" align="center"  width="130">
                      <template slot-scope="scope">
                        <div class="txt_left" >
                                供应商名称：{{scope.row.supplierName}}
                            </div>
                        <div class="txt_left">
                              联系人：{{scope.row.supplierContact}}
                            </div>
                        <div class="txt_left">
                            联系电话：{{scope.row.supplierTel}}
                            </div>
                        <div class="txt_left">
                          手机号码： {{scope.row.supplierPhone}}
                            </div>
                        <div class="txt_left">
                          邮箱：{{scope.row.supplierEmail}}
                            </div>
                          
                      </template>
            </el-table-column>
             <el-table-column label="订单金额明细" prop="name" align="center" width="140">
                   <template slot-scope="scope">
                           

                            <div :class="scope.row.details.length>2?'wrapper3':''" v-if="showIndex===1">
                            <div v-for="(item,index) in scope.row.details" :key="index"
                            :class="scope.row.details.length<=1?'':'boxImg2'">
                                  <div class="txt_left"> 订单总金额:</div>
                                  <div class="txt_left">  {{item.factFee}}</div>
                                  <div class="txt_left"> 累计已付款金额:</div>
                                    <div class="txt_left"> {{item.receivedAmount}}</div>
                                    <div class="txt_left"> 剩余未付款金额:</div>
                                    <div class="txt_left">  {{item.unpaidAmount}}</div>
                            </div>
                            <div class="down" @click="downOn" v-if="scope.row.details.length>2">
                                  <i class="el-icon-arrow-down" >
                                </i></div>
                          </div>
                          <div class="upBox" v-if="showIndex===0" style="padding-bottom:20px;box-sizing:border-box;">
                            <div  v-for="(item,index) in scope.row.details" :key="index"
                            :class="scope.row.details.length<=1?'':'boxImg2'">
                                  <div class="txt_left"> 订单总金额:</div>
                                  <div class="txt_left">  {{item.factFee}}</div>
                                  <div class="txt_left"> 累计已付款金额:</div>
                                    <div class="txt_left"> {{item.receivedAmount}}</div>
                                    <div class="txt_left"> 剩余未付款金额:</div>
                                    <div class="txt_left">  {{item.unpaidAmount}}</div>
                            </div>
                           <div class="down" @click="downOff1" v-if="scope.row.details.length>2"><i class="el-icon-arrow-up" ></i></div>
                          </div> 
                   </template>
            </el-table-column>
          <!--   <el-table-column label="累计已付款金额" prop="name" align="center" width="80">
                   <template slot-scope="scope">
                       {{scope.row.orderTotalAmount}}
                   </template>
            </el-table-column>
            <el-table-column label="本次申请付款金额" prop="name" align="center" width="80">
                   <template slot-scope="scope">
                       {{scope.row.factFee}}
                   </template>
            </el-table-column> -->
            <el-table-column label="本次申请付款总金额" prop="name" align="center" width="110">
                   <template slot-scope="scope">
                        {{scope.row.factFee}}
                   </template>
            </el-table-column>
            <el-table-column label="剩余未付款金额" prop="name" align="center" width="110">
                   <template slot-scope="scope">
                       {{scope.row.unpaidAmount}}
                   </template>
            </el-table-column>
            <el-table-column label="支付日期" prop="name" align="center" width="80">
                   <template slot-scope="scope">
                       {{scope.row.payTime}}
                   </template>
            </el-table-column>
            <el-table-column label="进度表" prop="name" align="center" width="140">
                    <template slot-scope="scope">
                          <div class="txt_left" v-for="(item,index) in scope.row.audits" :key="index">{{item}}</div>
                    </template>
            </el-table-column>
        <el-table-column label="操作" align="center"  fixed="right"  width="140">
          <template slot-scope="scope">
            <div class="line">
              <div class="small-Idiv" @click="editPay(scope.row)"
               v-permit="'pu:payment_form_edit'">
                <div class="i-div">
                  <img src="@/common/images/icon/付款编辑.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;">编辑</span>
              </div>
              <div class="small-Idiv" @click="detailPay(scope.row)"
              v-permit="'pu:payment_form_detail'">
                <div class="i-div">
                  <img src="@/common/images/icon/付款详情.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;" >详情</span>
              </div>

              <div class="small-Idiv" @click="approval(scope.row)"
              v-permit="'pu:payment_form_approval'">
                <div class="i-div">
                  <img src="@/common/images/icon/领导审批.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;" >领导审批</span>
              </div>
              <div class="small-Idiv" @click="cancel(scope.row)"
              v-permit="'pu:payment_form_canel'">
                <div class="i-div">
                  <img src="@/common/images/icon/撤回申请.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;" >撤回申请</span>
              </div>
                <div class="small-Idiv" @click="applyPay(scope.row)"
                v-permit="'pu:payment_form_pay'">
                    <div class="i-div">
                      <img src="@/common/images/icon/付款.png" alt="" class="operation_img">
                    </div>
                    <span style="word-break: keep-all;">付款</span>
                  </div> 
            </div>           
          </template>
        </el-table-column>
      </el-table>
      
      <div class="pagination">
            <el-pagination
              @size-change="getHandleSizeChange"
              @current-change="getHandleCurrentChange"
              :current-page="tableDatas.pageIndex"
              :page-sizes="[5,10,30,50]"
              :page-size="tableDatas.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableDatas.count"
            ></el-pagination>
      </div>
    </div>
     <div class="margin0" style="margin-top:20px">

      <div class="tabs-header">
        <ul class="clearfix">
            <li
              class="sale"
              @click="tabIndex(0)"
              :class="currentIndex===0 ? 'active' : ''"
              v-show="!this.showNo"
            >商品明细</li>
            <li
              class="sale"
              @click="tabIndex(0)"
              :class="currentIndex===0 ? 'active' : ''"
              v-show="this.showNo"
            >付款单【{{this.showNo}}】的商品明细</li>
          </ul>
        </div>
        <div class="tabs-content">
          <component :is="mainIndex" :count="count" :page="page" :showId="showId"></component>
        </div>
  </div>
   <!-- 删除销售订单 -->
      <el-dialog :visible.sync="cancelVisible" width="20%" title="提示" style="top:20%">
        <div class="mail-fitter">
            <div class="search-base">
                  <div class="goods-fitter">
                    <el-row>
                        <div class="tip">
                          <img class="tipImg" src="@/common/images/组 180.png" alt=""/>
                      
                            <span>您确定要撤回所选的付款申请吗？</span>
                        </div>

                    </el-row>
                  </div>  
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="cancelVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deletePay()" size="small">确 定</el-button>
        </span>
      </el-dialog>
  <!-- 付款申请组件 -->
    <EditPay
    :editVisibles="editVisibles"
    :editList="editList"
    @createClose1="createClose2"
    @createClosing1="createClosing2"
    @editAppPay1="editAppPay2"
    ></EditPay>
     <!-- 付款申请详情组件 -->
    <DetailPay
    :detailVisibles="detailVisibles"
    :payList="payList"
    @createClose3="createClose4"
    @createClosing3="createClosing4"
    ></DetailPay>
     <!-- 领导审批 -->
    <ApprovalPay
     :approvalVisibles="approvalVisibles"
     :userData="userData"
     :payList="payList"
    @createCloseA="createClose6"
    @createClosingA="createClosing6"
    @saveAudit1="saveAudit2">
    </ApprovalPay>
     <!-- 支付 -->
    <Pay
     :payVisibles="payVisibles"
     :payList="payList"
     :accountData="accountData"
    @createClose7="createClose8"
    @createClosing7="createClosing8"
    @payPayment1="payPayment2">
    </Pay>
  </div>
</template>

<script>
import { getCategory, getStoreList } from '@/api/public'
import { throttleTipPop } from "@/utils/functions.js";
import {getPaidList,getAuditGoods,detailPaymentBill,initPaymentBill,deletePurchasePayment,findPaymentAudit,getPaymentGoodsList} from "@/api/purchase/index";
import {findAccountInfo} from '@/api/sale/index';
import AccountOrder from './oreder';
import EditPay from './editPay';
import DetailPay from './detailPay';
import ApprovalPay from './approvalPay';
import Pay from './pay';

export default {
  filters:{
    //0、取消；1，待审批；2、审批中；3、审批不通过；5、审批通过待支付；6、已支付
    type(val){
      switch(val){
        case 0:
          return "取消";
          break;
        case 1:
          return "待审批";
          break;
        case 2:
          return "审批中";
          break;
        case 3:
          return "审批不通过";
          break;
        case 4:
          return "审批通过待支付";
          break;
        case 5:
          return "已支付";
          break;
        default:
          return;          
      }
    },
    date: function(val) {
        let str = '';
        let  skr = '';
        if(val){
          str=val.slice(0 ,10)
          skr = str.replace('-','年')
          skr = skr.replace('-','月')
          skr = skr.concat("日")
        }
        return skr
    }
  },
  data () {
    return {
      mainIndex:'AccountOrder',
      currentIndex:0,
      dataArr:[],
      radio:'',
      dialogImageUrl: '',
      showIndex:1,
      dialogVisible: false,
      disabled: false,
      editVisibles:false,//编辑付款
      detailVisibles:false,//查看付款
      approvalVisibles:false,//领导审批
      cancelVisible:false,//撤回申请
      payVisibles:false,//付款
      userData:'',//审核人数据
      payList:{},
      editList:{},
      orderDatas:[],//根据ID获得的销售订单详细
      orderData:[],//销售订单分页数据
      page:[],//商品明细分页
      count:[],//商品明细总数
      getIndex:'',
      closeId: "", //关闭ID
      closeNo: "",
      showId:'',
      showNo:'',
      billNo:'',
      deleteId:'',
      detailData:'', 
      accountData:[],//资金账户下拉列表
      form: {
        allType:0,//搜索审核状态
        current_page:0,
        page_size:10,
        total_count:0,
        to:0,//推送给
        endTime:'',//截止日期
        auditType:0,//审核状态
        signRemark:'',//备注
        orderNumber:'',//销售单号
        customerName:'',//客户名称
        sigingType:1,//签定状态
        sigingTime:'',//签定日期
        imgUrl:[],//上传图片路径
      },
      tableData:[
          {
          date: '2016-05-02',
          name: '张小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        
      ],
       goodsData:{  //商品详情列表的分页
        pageIndex:1,
        pageSize:10,
        count:0,
      },
     tableDatas: {
                pageIndex:1,
                sizes:[10, 20, 50, 100],
                pageSize:10,
                count:0,
                customerName:'',
                orderNo:this.purchaseOrderNo || '',
                supplierInfo:'',
                projectName:'',
                deliveryDate:'',
                startTime:'',
                endTime:'',
                status:5,
            },
       options1: [
        {
          value: 1,
          label: "待审批"
        },
        {
          value: 2,
          label: "审批中"                   
        },
        {
          value: 3,
          label: "审批不通过"
        },
        {
          value: 5,
          label: "待付款"
        },
        {
          value: 6,
          label: "已付款"
        }
      ],
      
      rules:{
        partyA: [
            {required: true, message: '此项为必填项', trigger: 'blur'}
          ],
        partyAAddress: [
            {required: true, message: '此项为必填项', trigger: 'blur'}
          ],
        partyAContacts: [
            {required: true, message: '此项为必填项', trigger: 'blur'}
          ],
        partyANumber: [
            {required: true, message: '此项为必填项', trigger: 'blur'}
          ],
        dateNum: [
            {required: true, message: '此项为必填项', trigger: 'blur'}
          ],
        paymentAccount: [
            {required: true, message: '此项为必填项', trigger: 'blur'}
          ],
        accountName: [
            {required: true, message: '此项为必填项', trigger: 'blur'}
          ],
        openingBank: [
            {required: true, message: '此项为必填项', trigger: 'blur'}
          ],
        to:[
             {required: true, message: '此项为必选项', trigger: 'change'}
        ],
        endTime:[
           {required: true, message: '此项为必填项',trigger: 'blur'}
        ],
        remark:[
          {required: true, message: '此为必填项',trigger: ['blur','change']}
        ]
      }
    }
  },
  props:["purchaseOrderNo"],
   watch:{
    
    "tableDatas.deliveryDate": {
      handler(val, old) {
        if(val===null){
            this.tableDatas.startTime = '';
        this.tableDatas.endTime = '';
        }else{
            this.tableDatas.startTime = val[0];
        this.tableDatas.endTime = val[1];
        }
        

      },
      deep: true
    }
  },
  created () {
    this._getPaidList();
  },
  computed: {
  },
  methods: {
    //编辑付款弹框
    createClose2(data){
      this.editVisibles = data;
    },
    createClosing2(data){
      this.editVisibles = data;
    },
    editAppPay2(data){
      this.editVisibles = data;
      this._getPaidList();
      this.resetData();
    },
    //付款详情弹框
    createClose4(data){
      this.detailVisibles = data;
    },
    createClosing4(data){
      this.detailVisibles = data;
    },
    //领导审批弹框
     createClose6(data){
      this.approvalVisibles = data;
    },
    createClosing6(data){
      this.approvalVisibles = data;
    },
    saveAudit2(data){
      this.approvalVisibles =data;
      this._getPaidList();
      this.resetData(); 
    },
    //支付
      createClose8(data){
      this.payVisibles = data;
    },
    createClosing8(data){
      this.payVisibles = data;
    },
    payPayment2(data){
      this.payVisibles = data;
      this._getPaidList();
      this.resetData();
    },
     tabIndex (index) {
      this.currentIndex = index
      switch (index) {
        case 0:
          this.mainIndex = "AccountOrder";
          break;
        default: 
            return
      }
    },
    //获取资金账户下拉列表
    _getAccountInfo(){
      findAccountInfo().then(res=>{
        if(res.code===200){
          this.accountData = res.data.pageList;
        }
      })
    },
    //获取付款单分页
    _getPaidList(){
      getPaidList(this.tableDatas).then(res=>{
            this.orderData = res.data.pageList
            this.tableDatas.count = res.data.count
      })
    },
      //搜索
    inSearch(){
      this.tableDatas.pageIndex =1;
      this._getPaidList();
      this.resetData();
    },
    //重置数据
    resetData(){
      this.getIndex = '';
      this.showNo = '';
      this.page = [];
      this.count = 0;
    },
    //编辑支付
    editPay(row){
      initPaymentBill(row.billNo).then(res=>{
        this.editList = res.data;
        this.editVisibles = true;
      })
      

    },
    //支付详情
    detailPay(row){
      detailPaymentBill(row.billNo).then(res=>{
          if(res.code===200){
            this.payList = res.data;
             this.detailVisibles = true;
          }
      })
     
    },
    //付款
    applyPay(row){
       detailPaymentBill(row.billNo).then(res=>{
          if(res.code===200){
            this.payList = res.data;
             this.payVisibles = true;
          }
      }) 
      this._getAccountInfo();
    },
    //领导审批
    approval(row){
       detailPaymentBill(row.billNo).then(res=>{
          if(res.code===200){
            this.payList = res.data;
            
          }
      }) 
      let obj ={};
      obj.purchaseOrderId = row.details[0].purchaseOrderId;
      obj.billNo = row.billNo;
      findPaymentAudit(obj).then(res=>{
        if(res.code===200){
          this.userData = res.data;
           this.approvalVisibles = true;
        }
      })
     
    },
    //撤回申请
    cancel(row){
      this.billNo = row.billNo;
      this.cancelVisible = true;
    },
    deletePay(){
      deletePurchasePayment(this.billNo).then(res=>{
          if(res.code===200){
              throttleTipPop(this, "success","撤回付款申请成功！", 2000);
              this.cancelVisible = false;
              this._getPaidList();
              this.resetData();
          }
      })
    },
    selectedHighlight({ row, rowIndex }) {
      if (this.getIndex === rowIndex) {
        return {
          "background-color": "#e4ecfa"
        };
      }
    },
    
    tableRowClassName({ row, rowIndex }) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
    //双击选定
    AhandleSelectionChange(row) {
      this.getIndex = row.index;
      this.showId = row.billNo;
      this.showNo = row.billNo;
      
      let obj = {}
      obj.pageIndex = this.goodsData.pageIndex;
      obj.pageSize = this.goodsData.pageSize;
      obj.billNo = this.showNo;
       getPaymentGoodsList(obj).then(res => {
        this.count = res.data.count;
        this.page = res.data.pageList;
      });
    },
    //展开
    downOn(){
        this.showIndex = 0;
    },
     downOn1(){
        this.showIndex = 0;
    },
    downOff(){
      this.showIndex =1;
    },
    downOff1(){
      this.showIndex =1;
    },
      //主页换页
       getHandleSizeChange(val) {
       this.tableDatas.pageSize =val;
       this._getPaidList()
     },
    getHandleCurrentChange(val) {
      this.tableDatas.pageIndex = val;
      this._getPaidList()
    },
     

      handleSizeChange(){

      },
      handleCurrentChange(){

      },
      handleSelectionChange(){
        
      },
      handleChange(){

      }
  },
  components: {
    AccountOrder,
    EditPay,
    DetailPay,
    ApprovalPay,
    Pay
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
    padding-bottom: 10px;
    border: 1px solid rgb(215, 224, 241);
    background: #fff;
    .title {
      margin-left: -20px;
      font-size: 16px;
      color: 3333;
      padding-left: 10px;
      line-height: 1.4;
      border-left: 4px solid $themeColor;
      margin-bottom: 10px;
    }
    .title1{
      margin-left: -20px;
      font-size: 14px;
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
    max-width: 130px;
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
//

.line{
     overflow: hidden;
      .small-Idiv{
        width: 50%;
        padding-top: 10px;
        float: left;

      } 
}


.i-div {
  cursor: pointer;
}
.margin1{
  padding-left:40px;
  padding-top:20px;
  box-sizing: border-box;

}
.order{
  color:#4A99FA;
}
.mcard0 {
    border: 1px solid #d7e0f1;
    margin-top: 20px;
  }
.tips{
  position: relative;
    top: 6px;
    left: 0px;
    font-size: 11px;
    color:#909399;
}
.tip{
    margin-top:-30px;
    text-align: center;
    line-height: 22px;
    .tipImg{
      position: relative;
      left: -16px;
      top:28px;
    }                     
}
.audit{
  float: right;
}
.auditHeader{
  margin-top:20px;
  .gray{
    display: inline-block;
    width:104px;
    height: 48px;
    border: 1px solid #D6DEEF;
    color: #909399;
    text-align: center;
    line-height: 48px;
    background: #F5F8FC;
  }
  .choose{
    display: inline-block;
    border: 1px solid #D6DEEF;
    border-right: 0;
    border-left: 0;
    padding: 0 33px;
    height: 48px;
    color: #909399;
    line-height: 48px;
    .el-radio {
    color: #909399;
    cursor: pointer;
    }
  }
  .white{
    display: inline-block;
    border: 1px solid #D6DEEF;
    border-right: 0;
    border-left: 0;
    width: 101px;
    height: 48px;
    color: #909399;
    text-align: center;
    line-height: 48px;
  }
  .white:nth-of-type(7){
    border-right: 1px solid #D6DEEF;
  }
}
.auditContent{
  .gray{
    display: inline-block;
    width:104px;
    height: 96px;
    line-height: 97px;
    border: 1px solid #D6DEEF;
    border-top: 0;
    color: #909399;
    text-align: center;
    background: #F5F8FC;
    float: left;
  }
  .content{
    border: 1px solid #D6DEEF;
    border-left: 0;
    border-top: 0;
    width: 843px;
    height: 96px;
    display: inline-block;
  }
}
.demoImg{
  position: relative;
  z-index: 10000000;
}
.boxImg{
  border-bottom: 1px solid #EBEEF5;
    padding:10px 10px;
    position: relative;
    width: 220px;
    left: -10px;
    height:200px;
    overflow-y: auto;
}
.boxImg:nth-of-type(1){
  padding-top:0;
}
.boxImg:nth-last-of-type(1){
  border-bottom: 0;
  padding-bottom: 0;
  height: 190px;
}

.boxImg1{
  border-bottom: 1px solid #EBEEF5;
    padding:10px 10px;
    position: relative;
    width: 180px;
    left: -10px;
    height:200px;
    overflow-y: auto;
    
}
.boxImg1:nth-of-type(1){
  padding-top:0;
}
.boxImg1:nth-last-of-type(1){
  border-bottom: 0;
  padding-bottom: 0;
  height: 190px;
}
.boxImg2{
  border-bottom: 1px solid #EBEEF5;
    padding:10px 10px;
    position: relative;
    width: 140px;
    left: -10px;
    height:200px;
    overflow-y: auto;
    
}
.boxImg2:nth-of-type(1){
  padding-top:0;
}
.boxImg2:nth-last-of-type(1){
  border-bottom: 0;
  padding-bottom: 0;
  height: 190px;
}
.wrapper1{
 max-height:420px;
 position: relative;
 .down{
   position: absolute;
    width: 113%;
    height: 22px;
    border-top: 1px solid #EBEEF5;
    background: #EBEEF5;
    left: -10px;
    bottom: 0;
    cursor: pointer;
 }
}
.upBox{
    position: relative;
  .down{
   position: absolute;
    width: 113%;
    height: 22px;
    border-top: 1px solid #EBEEF5;
    background: #EBEEF5;
    left: -10px;
    bottom: 0;
    cursor: pointer;
 }
}
.upBox1{
    position: relative;
  .down{
   position: absolute;
    width: 113%;
    height: 22px;
    border-top: 1px solid #EBEEF5;
    background: #EBEEF5;
    left: -10px;
    bottom: 0;
    cursor: pointer;
 }
}
.wrapper2{
  max-height:420px;
  position: relative;
  .down{
   position: absolute;
    width: 113%;
    height: 22px;
    border-top: 1px solid #EBEEF5;
    background: #EBEEF5;
    left: -10px;
    bottom: 0;
    cursor: pointer;
 }
}
.wrapper3{
  max-height:420px;
  position: relative;
  .down{
   position: absolute;
    width: 117%;
    height: 22px;
    border-top: 1px solid #EBEEF5;
    background: #EBEEF5;
    left: -10px;
    bottom: 0;
    cursor: pointer;
 }
}
.tip{
    margin-top:-30px;
    text-align: center;
    line-height: 22px;
    .tipImg{
      position: relative;
      left: -16px;
      top:28px;
      
    }                     
}

</style>