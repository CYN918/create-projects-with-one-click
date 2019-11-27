<template>
  <div class="margin0">
     <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">待审核</h4>
            <div class="search-base">
              <el-row>
               <el-col :span="5">
                   <el-form-item label="平台名称：">
                        <el-col :span="21">
                            <el-input v-model="tableDatas.customerPlatform" placeholder="请输入平台名称"></el-input>
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
                    <el-form-item label="单号：">
                            <el-col :span="21">
                              <el-input v-model="tableDatas.orderNo" placeholder="请输入销售或采购单号"></el-input>
                            </el-col>
                        </el-form-item>
                </el-col>
                <el-col :span="2" >
                          <el-button type="primary" size="small" @click='search()' >查询</el-button>
                        
                    </el-col>
               
              </el-row>
               <el-row>
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
      <div class="mbottom">
          <el-button type="primary" size="small" @click="batchCreate">批量生成合同</el-button>
      </div>
       <el-table :data="orderData" border 
          @selection-change="handleSelectionChange" 
          
          :row-class-name="tableRowClassName"
          :row-style="selectedHighlight"
          @row-dblclick="AhandleSelectionChange">
          <el-table-column type="selection" width="40"></el-table-column> 
         <el-table-column label="序号" type="index" align="center"  width="50"></el-table-column>
            <el-table-column label="采购订单信息" prop="name" align="center"  width="210">
                      <template slot-scope="scope">
                        <div class="txt_left" >
                                采购单号：{{scope.row.purchaseOrderNo}}
                            </div>
                        <div class="txt_left">
                              采购交货日期：{{scope.row.distributionTime | date}}
                            </div>
                        <div class="txt_left">
                            创建时间：{{scope.row.purchaseCreateTime}}
                            </div>
                        <div class="txt_left">
                          采销员：{{scope.row.userName}}   
                            </div>
                        <div class="txt_left">
                          签单公司：{{scope.row.company}}
                            </div>
                      </template>
            </el-table-column>
            <el-table-column label="销售订单信息" prop="name" align="center"  width="210">
                      <template slot-scope="scope">
                        <div class="txt_left" >
                                销售单号：{{scope.row.saleOrderNo}}
                            </div>
                        <div class="txt_left" >
                                客户：{{scope.row.customer}}
                            </div>
                        <div class="txt_left">
                              经销商：{{scope.row.agentName}}
                            </div>
                        <div class="txt_left">
                            平台名称：{{scope.row.projectName}}
                            </div>
                        <div class="txt_left">
                          创建时间：{{scope.row.saleCreateTime}}   
                            </div>
                        <div class="txt_left">
                          销售员：{{scope.row.saleUserName}}
                            </div>
                      </template>
            </el-table-column>
            <el-table-column label="供应商信息" prop="name" align="center"  width="160">
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
                          手机号码： {{scope.row.phone}}
                            </div>
                        <div class="txt_left">
                          邮箱：{{scope.row.supplierEmail}}
                            </div>
                      </template>
            </el-table-column>

            <el-table-column label="本次采购金额" prop="name" align="center">
                   <template slot-scope="scope">
                         <div class="txt_left"> 采购金额：{{scope.row.purchaseTotalPrice}} </div>
                     <div class="txt_left"> 已付款金额：{{scope.row.receivedAmount}} </div>
                     <div class="txt_left"> 未付款金额：{{scope.row.unpaidAmount}}</div>
                   </template>
            </el-table-column>
            <el-table-column label="合同号" prop="name" align="center">
                   <template slot-scope="scope">
                    {{scope.row.contractNo}}
                   </template>
            </el-table-column>
            <el-table-column label="合计金额" prop="name" align="center">
                   <template slot-scope="scope">
                    {{scope.row.totalPrice}}
                   </template>
            </el-table-column>
            <el-table-column label="交货日期" prop="name" align="center">
                   <template slot-scope="scope">
                    {{scope.row.distributionTime | date}}
                   </template>
            </el-table-column>
            <el-table-column label="进度表" prop="name" align="center">
                    <template slot-scope="scope">
                      <div class="txt_left" v-for="(item,index) in scope.row.audits" :key="index">{{item}}</div>
                      <el-button size="small" type="primary" @click="Audit(scope.row)"
                      v-show="scope.row.contractId">查看进度表</el-button>
                    </template>
            </el-table-column>
        <el-table-column label="操作" align="center"  fixed="right"  width="150">
          <template slot-scope="scope">
             <div class="line2">
                  <div
                    class="small-Idiv"
                    @click="generate(scope.row)"
                     v-show="!scope.row.contractNo||!scope.row.contractId"
                    v-permit="'pu:contract_generate'">
                    <div class="i-div">
                      <img src="@/common/images/icon/状态栏.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;">生成合同</span>
                  </div>
                  <div class="small-Idiv"  @click="deleteAuditView(scope.row)"  
                   v-show="!scope.row.contractNo||!scope.row.contractId"
                   v-permit="'pu:contract_delete'">
                <div class="i-div">
                  <img src="@/common/images/icon/回收站.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;">删除</span>
              </div>
              
           
              <div class="small-Idiv" @click="editContract(scope.row)"  
              v-show="scope.row.contractNo&&scope.row.contractId"
              v-permit="'pu:contract_edit'">            
                <div class="i-div">
                  <img src="@/common/images/icon/编辑.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;">编辑</span>
              </div>
              <div class="small-Idiv" @click="detailContract(scope.row)" 
              v-show="scope.row.contractNo&&scope.row.contractId"
              v-permit="'pu:contract_sign_detail'" 
              >
                <div class="i-div">
                  <img src="@/common/images/icon/查看详情.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;" >详情</span>
              </div>
              <div class="small-Idiv"  @click="PushAuditing(scope.row)" 
              v-show="scope.row.contractNo&&scope.row.contractId"
              v-permit="'pu:push_audit'"   >
                <div class="i-div">
                  <img src="@/common/images/icon/推送审核.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;">推送审核</span>
              </div>
                <div
                    class="small-Idiv"
                    @click="submitAudit(scope.row)"
                    v-show="scope.row.contractNo&&scope.row.contractId"
                    v-permit="'pu:contract_approval'">
                    <div class="i-div">
                      <img src="@/common/images/icon/推送审核.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;">审批</span>
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
              :total="tableDatas.total"
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
            > 采购订单【{{this.showNo}}】的商品明细</li>
          </ul>
        </div>
        <div class="tabs-content">
          <component :is="mainIndex" :count="count" :page="page" :showId="showId"></component>
       
        </div>
  </div>
     <!-- 推送审核 -->
  <el-dialog width="55%" :visible.sync="auditVisible">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">提交审批</h4>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mcard0">
        <div class="mcard">
          <div>
          <el-form ref="infoForm" :model="form" :rules="rules" label-width="125px" size="small">
            <el-row>
             <el-col :span="8">
                <el-form-item label="采购单号：">                           
                            <span>{{pushData.purchaseOrderNo}}</span>                        
                </el-form-item>  
             </el-col>
             <el-col :span="8">
              <el-form-item label="部门：" >                       
                             <span>{{pushData.departmentName}}</span>         
              </el-form-item> 
               </el-col>
               <el-col :span="8">
              <el-form-item label="职位：">                       
                             <span>{{pushData.position}}</span>         
              </el-form-item> 
               </el-col>
            </el-row> 
            <el-row>
             <el-col :span="8">
                <el-form-item label="提交人：">                           
                            <span>{{pushData.applyUserName}}</span>                        
                </el-form-item>  
             </el-col>
             <el-col :span="8">
                <el-form-item label="审批事项：">                           
                            <span>{{pushData.approvalMatters}}</span>                        
                </el-form-item>  
             </el-col>
             <el-col :span="8">
              <el-form-item label="订单单号：" >                       
                             <span>{{pushData.saleOrderNo}}</span>         
              </el-form-item> 
               </el-col>
            </el-row> 
            <el-row>
              <el-col :span="23"> 
                <el-form-item label="提交理由：">                            
                            <el-input
                              type="textarea"
                              :autosize="{ minRows: 3, maxRows: 4}"
                              placeholder="请填写提交理由"
                              v-model="form.reason"
                              resize="none"> 
                            </el-input>                     
                </el-form-item>   
              </el-col>
            </el-row>
            
          </el-form>
          </div>
        </div>
      </div>
         <div class="mcard0">
        <div class="mcard">
          <div>
          <el-form ref="infoForm" :model="form" :rules="rules" label-width="60px" size="small">
            <div class="apply">
                <div class="applyLeft">
                      提 交 给：
                </div>
                <div class="applyRight">
                    <el-row v-for="(item,index) in pushData.audits" :key="index">
                        <el-col :span="8">
                            <el-form-item label="部门：">  
                                <el-col :span="20">                         
                                        <el-input v-model="item[0]" readonly></el-input>             
                                </el-col>           
                            </el-form-item>  
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="姓名：">                           
                                <el-col :span="20">                         
                                        <el-input v-model="item[1]" readonly></el-input>             
                                </el-col>                           
                            </el-form-item>  
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="职位：" >                       
                                 <el-col :span="20">                         
                                        <el-input v-model="item[2]" readonly></el-input>             
                                </el-col>         
                          </el-form-item> 
                          </el-col>
                    </el-row> 
                   
               
                      <!-- <div class="applyMessage">
                        <span class="ms">部门：<i>总经办</i></span>
                        <span class="ms">姓名：<i>刘总</i></span>
                        <span class="ms">职位：<i>总经理</i></span>
                      </div> -->
                </div>
            </div>
          </el-form>
       <el-form ref="infoForm" :model="form" :rules="rules" label-width="125px" size="small">     
          <el-row>
            <el-col :span="23"> 
                <el-form-item label="截止日期：" prop="limitTime">   
                  <el-date-picker
                    v-model="form.limitTime"
                    type="date"
                    placeholder="选择日期"
                    valueFormat='yyyy-MM-dd HH:mm:ss'
                    style="width:100%;"
                    :picker-options="pickerOptions0">
                  </el-date-picker>
                </el-form-item>
            </el-col>
          </el-row>
          </el-form>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="auditVisible=false" size="small">关 闭</el-button>
        <el-button type="primary" @click="pushAuditSave()" size="small">提交</el-button>
      </span>
  </el-dialog>
 
    <!-- 删除销售订单 -->
      <el-dialog :visible.sync="deleteVisible" width="20%" title="提示" style="top:20%">
        <div class="mail-fitter">
            <div class="search-base">
                  <div class="goods-fitter">
                    <el-row>
                        <div class="tip">
                          <img class="tipImg" src="@/common/images/组 180.png" alt=""/>
                            <span>温馨提示：一经删除不可恢复记录！</span><br/>
                            <span>你确定要删除所选内容吗？</span>
                        </div>

                    </el-row>
                  </div>  
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="deleteVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteOrder()" size="small">确 定</el-button>
        </span>
      </el-dialog>
     
     
     
    <!-- 编辑合同 -->
    <EditContract 
      :closeId ="closeId"
      :detailData="detailData"
      :editVisibles="editVisibles"   
      @createClose1="createClose2"
        @createClosing1="createClosing2"
        @editContract="editContract1"></EditContract>
    <!-- 合同详情 -->
    <DetailContract 
      :detailData="detailData"
      :detailVisibles="detailVisibles"   
      @createClose3="createClose4"
        @createClosing3="createClosing4"></DetailContract> 
    <TimeLine
     :auditData="auditData"
     :goVisibles="goVisibles"  
      :orderNo="orderNo" 
      @createCloseG="createClose5"
        @createClosingG="createClosing5">
    </TimeLine> 
       <!-- 新增合同 -->
      <AddContract 
      :contractVisibles="contractVisibles" 
      :orderPage="orderPage"
      :productList="productList"  
      @createCloseA="createClose6"
        @createClosingA="createClosing6"
        @saveContractA="saveContract1"></AddContract>
      <!-- 提交审批 -->
      <AuditContract 
      :userData="userData"
      :submitVisibles="submitVisibles" 
      :contractId="contractId"
      :personData="personData"
      :submitData="submitData"  
      @createCloseAu="createClose7"
        @createClosingAu="createClosing7"
        @signContract="signContract1"></AuditContract>  
      <!-- 批量生成合同 -->
      <BatchAddContract 
      :batchVisibles="batchVisibles"  
      :batchData="batchData"
      :purchaseArr="purchaseArr"    
       @createCloseB="createClose8"
        @createClosingB="createClosing8"
        @saveContractB="saveContract2"></BatchAddContract>
  </div>
</template>

<script>
import { getCategory, getStoreList } from '@/api/public'
import AccountOrder from './oreder'
import EditContract from './editContract'
import DetailContract from './detailContract'
import BatchAddContract from "./batchAddContract"
/* import {addOrder,getOrder, getOrderGoods,deleteOrders,findOrders,downPDFfindContrac,findContract} from '@/api/sale/index' */
import {getPurchaseAudit,
getAuditGoods,
purchaseContractDetail,
findPurchaseAuditPlan,
InitAuditData,
deletePurchaseData,
pushPurchaseAudit,
SignContractMessage,
findUserMessage,
initBatchContract,
findPurchaseContractDetail} from '@/api/purchase/index'
import { throttleTipPop } from "@/utils/functions.js";
import AddContract from './addContract'
import TimeLine from "./timeLine"
import AuditContract from './auditContract'
export default {
  filters: {
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
      pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        }, 
      mainIndex:'AccountOrder',
      currentIndex:0,
      dataArr:[],
      goVisibles:false,//进度表
      deleteVisible:false,//删除销售订单
      auditVisible:false,//推送审核弹窗
      auditVisible1:false,//审核弹窗
      editVisibles:false,//编辑销售合同
      submitVisibles:false,//提交审批
      detailVisibles:false,//销售合同详情
      contractVisibles:false,//新增合同弹窗
      batchVisibles:false,//批量生成合同
      purchaseOrderId :'',//采购单ID
      orderData:[],//分页查询销售订单 
      productList:[],//产品清单
      auditData:[],//进度表数据
      pushAudit:'',//推送审核数据
      pushData:'',//推送审核初始化数据
      userData:'',//当前用户信息
      contractId:'',//合同ID
      batchData:{},
      orderPage:'',
      orderId:'',
      orderNo:'',
      personData:'',//审批人信息
       page:[],//商品明细分页
      count:[],//商品明细总数
      getIndex:'',
      closeId: "", //关闭ID
      closeNo: "",
      showId:'',//显示商品列表需要ID
      showNo:'',//显示商品列表需要编号
      deleteId:'',//删除采购订单需要的ID
      detailData:'',//详情数据
      submitData:'',//审核数据
      purchaseArr:[],//采购ID集合
      contractId:'',//删除需要的ID
      form: {
        allType:0,//搜索审核状态
        current_page:0,
        page_size:10,
        total_count:0,
        to:0,//推送给
        limitTime:'',//截止日期
        auditType:0,//审核状态
        remark:'',//备注
        saleOrderNo:'',//销售单号
        customerName:'',//客户名称
        
        reason:'',//理由
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
                pageIndex: 1,
                sizes: [10, 20, 50, 100],
                pageSize: 10,
                total: 0,
                customerName:'',//客户名称
                customerPlatform:'',//平台名称
                supplierName:'',//供应商
                deliveryDate:'',//交货日期
                supplierInfo:'',//供应商名称
                orderNo:"",//单号
                startTime:'',//
                endTime:'',//
            },
       options:[
          {
          value:0,
          label:"全部"
          },
          {
            value:1,
            label:'待推送审核'
          },
           {
            value:2,
            label:'待审核'
          },
           {
            value:3,
            label:'待推送审核'
          },
           {
            value:4,
            label:'主管审核不通过'
          },
           {
            value:5,
            label:'主管审核通过'
          },
           {
            value:6,
            label:'总经理审核不通过'
          },
           {
            value:7,
            label:'总经理审核通过'
          },
            {
            value:8,
            label:'董事长审核不通过'
          },
            {
            value:9,
            label:'董事长审核通过'
          },

      ],
       options1: [
        {
          value: 0,
          label: "销售主管"
        },
        {
          value: 1,
          label: "总经理"
        },
        {
          value: 2,
          label: "董事长"
        }
      ],
       options2: [
        {
          value: 0,
          label: "审核通过"
        },
        {
          value: 1,
          label: "审核不通过"
        },

      ],
      rules:{
        acompanyName: [
            {required: true, message: '此项为必填项', trigger: ['blur','change']}
          ],
        aaddress: [
            {required: true, message: '此项为必填项', trigger: ['blur','change']}
          ],
        acontact: [
            {required: true, message: '此项为必填项', trigger: ['blur','change']}
          ],
        atel: [
            {required: true, message: '此项为必填项', trigger: ['blur','change']}
          ],
        payLimitDay: [
            {required: true, message: '此项为必填项', trigger: ['blur','change']}
          ],
         bankAccount: [
            {required: true, message: '此项为必填项', trigger: ['blur','change']}
          ],
        bankOpeningName: [
            {required: true, message: '此项为必填项', trigger: ['blur','change']}
          ],
        bankName:[
             {required: true, message: '此项为必选项', trigger: ['blur','change']}
        ],
        limitTime:[
            {required: true, message: '此项为必选项', trigger: ['blur','change']}
        ]
     
      }
    }
  },
  created () {
    this._getPurchaseAudit();
    
  },
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
  computed: {
  },
  methods: {
    //子组件传值
    //编辑合同
    createClose2: function(data) {
      this.editVisibles = data;
    },
    createClosing2: function(data) {
      this.editVisibles = data;
    },
    editContract1(data){
      this.editVisibles = data;
      this._getPurchaseAudit();
      this.resetData();
    },
    //合同详情
    createClose4: function(data) {
      this.detailVisibles = data;
    },
    createClosing4: function(data) {
      this.detailVisibles = data;
    },
    //时间线
    createClose5: function(data) {
      this.goVisibles = data;
    },
    createClosing5: function(data) {
      this.goVisibles = data;
    },
    //新增合同
    createClose6: function(data) {
      this.contractVisibles = data;
    },
    createClosing6: function(data) {
      this.contractVisibles = data;
    },
    saveContract1(data){
      this.contractVisibles = data;
      this._getPurchaseAudit();
      this.resetData();
    }, 
    //提交审批
    createClose7(data){
      this.submitVisibles = false;
    },
    createClosing7: function(data) {
      this.submitVisibles = data;
    },
    signContract1(data){
      this.submitVisibles = data;
      this._getPurchaseAudit();
      this.resetData();
    },
    //批量生成合同
    createClose8(data){
      this.batchVisibles = false;
    },
    createClosing8: function(data) {
      this.batchVisibles = data;
    },
    saveContract2(data){
      this.batchVisibles = data;
      this._getPurchaseAudit();
      this.resetData();
    },
   /*  saveContractAu1(data){
      this.submitVisibles = data;
    }, */
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
    //搜搜分页
    search(){
      this.tableDatas.pageIndex = 1;
      this._getPurchaseAudit();
      this.resetData();
    },
    //重置数据
    resetData(){
       this.page=[];
      this.showNo ='';
      this.getIndex = '';
      this.count = 0;
    },
       //获取销售订单分页
    _getPurchaseAudit(){
     getPurchaseAudit(this.tableDatas).then(res=>{
            this.orderData = res.data.pageList
            this.tableDatas.total = res.data.count
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
      this.showId = row.purchaseOrderId;
      this.showNo = row.saleOrderNo
      
      let obj = {}
      obj.pageIndex = this.goodsData.pageIndex;
      obj.pageSize = this.goodsData.pageSize;
      obj.purchaseOrderId = this.showId;
       getAuditGoods(obj).then(res => {
        this.count = res.data.count;
        this.page = res.data.pageList;
      });
    },
      //生成合同
    generate(row) {
      
      this.closeNo = row.purchaseOrderNo;
     purchaseContractDetail(row.purchaseOrderNo).then(res=>{
        if(res.code===200){
           this.productList = res.data
           this.contractVisibles = true;
        }
       
      })
      
    },
    //批量生成合同渲染数据
    batchCreate(){
        initBatchContract(this.purchaseArr).then(res=>{
           if(res.code===200){
             this.batchData = res.data;
             this.batchVisibles = true;
           }
        })
        
    },
    //编辑销售合同
    editContract(row){
     this.closeNo = row.purchaseOrderNo;

      findPurchaseContractDetail(row.contractNo).then(res=>{
          if(res.code===200){
             this.detailData = res.data;
             this.editVisibles = true;
         } else{
           return false
         }
    })

    },
    //合同详情
    detailContract(row){
      this.closeNo = row.purchaseOrderNo;
      findPurchaseContractDetail(row.contractNo).then(res=>{
         if(res.code===200){
             this.detailData = res.data;
             this.detailVisibles = true;
         }
      })  
    },
    //推送审核
      PushAuditing(row){
        
        this.contractId = row.contractId;
        InitAuditData(row.contractId).then(res=>{
            if(res.code===200){
                for(let i=0;i<res.data.audits.length;i++){
                  res.data.audits[i]  = res.data.audits[i].split('|');
                }
                this.pushData = res.data; 
                this.auditVisible = true;              
            }
            
            })
      },
      //保存推送审核
      pushAuditSave(){
          let obj ={};
          obj.contractId = this.contractId;
          obj.reason = this.form.reason;
          obj.limitTime = this.form.limitTime;
          pushPurchaseAudit(obj).then(res=>{
            if(res.code===200){
                throttleTipPop(this, "success","推送审核成功！", 2000);
                this.auditVisible = false;
                this._getPurchaseAudit();
                this.resetData();

            }
          })
      },
      //提交审批
      submitAudit(row){
          this.closeNo = row.purchaseOrderNo;
          this.contractId = row.contractId;
          SignContractMessage(row.contractId).then(res=>{
            if(res.code===200){
                this.personData = res.data;
            }
          })
          findUserMessage(row.contractId).then(res=>{
            if(res.code===200){
              this.userData =  res.data.split('|')
            }
          })
         findPurchaseContractDetail(row.contractNo).then(res=>{
            if(res.code===200){
                this.submitData = res.data;
                this.submitVisibles = true;
            }
          })
            
      },
       //进度表
      Audit(row){
        this.orderNo = row.contractNo;
        findPurchaseAuditPlan(row.contractId).then(res=>{
          if(res.code===200){
            for(let i=0;i<res.data.length;i++){
              res.data[i].end = res.data[i].result;
              
              if(res.data[i].permission===1){
                    if(res.data[i].result===0){
                      res.data[i].result="待推送审批"
                    }else{
                      res.data[i].result="已推送审批"
                    }
                }else if(res.data[i].permission!==1){   
                     if(res.data[i].result===0){
                      res.data[i].result="待审批"
                    }else if(res.data[i].result===1){
                      res.data[i].result="审批通过"
                    }else{
                      res.data[i].result="审批不通过"
                    }
                }   
          }
          this.auditData = res.data;
          this.goVisibles = true;
          }
        })
        
        
      },
      //删除订单
      deleteAuditView(row){
        this.deleteVisible =true;
        this.deleteId = row.purchaseOrderId;
        this.contractId = row.contractId;
      },
      //删除采购合同订单
    deleteOrder() {
      let obj ={};
      obj.purchaseOrderId = this.deleteId;
      obj.contractId = this.contractId;
     deletePurchaseData(obj).then(res => {
        if (res.code === 200) {
          throttleTipPop(this, "success", "删除采购合同成功", 2000);
          this.deleteVisible = false;
          this._getPurchaseAudit();
        }
      })
    
    },
      //主页换页
       getHandleSizeChange(val) {
       this.tableDatas.pageSize =val;
       this.resetData();
       this._getPurchaseAudit()
     },
      getHandleCurrentChange(val) {
      this.tableDatas.pageIndex = val;
      this.resetData();
      this._getPurchaseAudit()
    },
      handleSizeChange(){

      },
      handleCurrentChange(){

      },
    handleSelectionChange(row){    
          var purchaseArr = []; 
          for(let i=0;i<row.length;i++){
              purchaseArr.push(row[i].purchaseOrderId);
          }
          this.purchaseArr = purchaseArr;
          
          
      },
      handleChange(){

      }
  },
  components: {
    AccountOrder,
    EditContract,
    DetailContract,
    TimeLine,
     AddContract,
     AuditContract,
     BatchAddContract
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
.line2{
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
    top: -20px;
    left: 93px;
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
.apply{
  .applyLeft{
    float: left;
    margin-left:47px;
    margin-right: 17px;
    line-height: 30px;
  }
  .applyRight{
    
    display: inline-block;
    width: 81%;
    .applyMessage{
      width: 100%;
      height:30px;
      border:1px solid #DCDFE6;
      line-height: 30px;
      border-radius: 4px;
      margin-bottom: 20px;
      .ms{
        margin-left: 16px;
        width:110px;
        display: inline-block;
        i{
          font-style: normal;
        }
      }
    }
  }
  
}
/deep/ .el-dialog__headerbtn{
      top:10px;
    }
</style>