<template>
    <div id="addPurchasing">
        <el-dialog width="75%" :visible.sync="approvalVisible" :before-close="createClosing">  
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form label-width="100px" size="small">
              <div class="search-wrapper">
                <h4 class="title">付款单-申请付款-领导审批</h4>
              </div>
            </el-form>
          </div>
        </div>
        
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form ref="infoForm" :model="form" :rules="rules" label-width="160px" size="small">
              <div class="search-wrapper">
                <div class="mbottom">
                  <h4 class="title1">申请信息</h4>
                </div>
                <div class="search-base">
                  <el-row>
                    <el-col :span="6">
                      <el-col>
                        <el-form-item label="付款单编号：">
                          <el-col :span="23">
                            <span>{{payData.billNo}}</span>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="申请日期：">
                        <el-col :span="23">
                            <span>{{payData.applyDate}}</span>
                        </el-col>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="申请人：">
                        <el-col :span="23">
                            <span>{{payData.applyUserName}}</span>
                        </el-col>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="部门：">
                        <el-col :span="23">
                           <span class="supplier" :title="payData.applyOrganizeName">{{payData.applyOrganizeName}}</span>
                        </el-col>
                      </el-form-item>
                    </el-col>

                  </el-row>
                  <el-row>
                   <el-col :span="6">
                      <el-col>
                        <el-form-item label="供应商名称：">
                          <el-col :span="23">
                            <span class="supplier" :title="payData.supplierName">{{payData.supplierName}}</span>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="户 名：">
                        <el-col :span="23">
                            <el-input v-model="payData.bankName" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="开户行：">
                        <el-col :span="23">
                            <el-input v-model="payData.bankOpeningName" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="银行账号：">
                        <el-col :span="23">
                            <el-input v-model="payData.bankAccount" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <el-col>
                        <el-form-item label="源单类型：">
                          <el-col :span="23">
                            {{payData.mergeType | merge}}
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                     <el-col :span="6">
                      <el-form-item label="结算方式：" >
                        <el-col :span="23">
                             <el-select v-model="payData.settlementType" disabled>
                              <el-option
                                      v-for="item in options2"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                                      </el-option>
                             </el-select>
                        </el-col>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="付款方式：">
                        <el-col :span="23">
                            <el-select v-model="payData.payType" disabled>
                                <el-option
                                    v-for="item in options3"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                            </el-select>
                        </el-col>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="预计收票日期：">
                        <el-col :span="23">
                              <el-input
                                v-model="payData.expectedCollectDate"
                                readonly
                                style="width:100%">
                            </el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="12">
                        <el-form-item label="付款原因：" prop="storageMan">
                           <el-radio-group v-model="payData.payReason" @change="depoit" disabled>
                                <el-radio label="定金" >定金</el-radio>
                                <el-radio  label="尾款">尾款</el-radio>
                                <el-radio  label="分批付款">分批付款</el-radio>
                                <el-radio  label="其他">其他</el-radio>
                           </el-radio-group>
                                <input class="other" disabled v-show="this.otherIndex===0" v-model="payData.payOtherReason"/>
                                <input class="other"  v-show="this.otherIndex===1" v-model="payData.payOtherReason"/>
                              
                      </el-form-item>                   
                    </el-col>
                   <el-col :span="6">
                        <el-form-item label="预付定金：" prop="storageMan" v-if="this.showIndex===1">
                            <input class="handsel" v-model="rate" readonly/>%
                            ，即<input class="handsel" v-model="payData.deposit" readonly/>元

                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="申请金额：" prop="goodsWarehouse">
                        <el-col :span="23">
                            <el-input v-model="total1" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>

                  </el-row>
                  <el-row>
                    <el-col :span="12">
                        <el-form-item label="备注：">
                            <el-col :span="24">
                                <el-input v-model="payData.remark" readonly></el-input>
                            </el-col>
                      </el-form-item>
                    </el-col>
                      <el-col :span="6">
                        <el-form-item label="订单金额：" prop="goodsWarehouse">
                        <el-col :span="23">
                            <span>{{payData.orderAmount}}</span>
                        </el-col>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="累计已付款总金额：" prop="goodsWarehouse">
                        <el-col :span="23">
                            <span>{{payData.receivedAmount}}</span>
                        </el-col>
                      </el-form-item>
                    </el-col>


                  </el-row>
                  
                </div>
              </div>
            </el-form>
          </div>
        </div>
        <!--  <div class="mbottom">
              <div class="goods-fitter">
                <el-form ref="infoForm" :model="form" :rules="rules" label-width="140px" size="small">
                  <div class="search-wrapper">
                    <div class="mbottom">
                      <h4 class="title1">支付信息</h4>
                    </div>
                    <div class="search-base">
                      <el-row>
                        <el-col :span="6">
                            <el-col>
                                <el-form-item label="签单公司：">
                                <el-col :span="23">
                                    <span>{{payData.company}}</span>
                                </el-col>
                                </el-form-item>
                            </el-col>
                            </el-col>
                          
                            <el-col :span="6">
                                <el-form-item label="资金账户：">
                                    <el-col :span="23">
                                        <el-input v-model="payData.payAcountId" readonly></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-col>

                            <el-col :span="6">
                                <el-form-item label="付款日期：">
                                        <el-col :span="23">
                                            <span>付款日期</span>
                                        </el-col>
                                </el-form-item>
                            </el-col>
                  
                      </el-row>
                     <el-row>
                          <el-col :span="12">
                            <el-form-item label="指定往来科目：" prop="logisticsTel">
                              <el-col :span="24">
                                <el-input v-model="payData.currentAccount" readonly></el-input>
                              </el-col>
                            </el-form-item>
                          </el-col>
                        <el-col :span="12">
                            <el-form-item label="指定资金科目：" prop="footnote">
                                <el-col :span="24">
                                    <el-input v-model="payData.capitalAccount"
                                    readonly
                                    placeholder="请输入内容"></el-input>
                                </el-col>
                          </el-form-item> 
                        </el-col>                 
                      </el-row>
                      <el-row>
                          <el-col :span="24">
                           <el-form-item label="银行付款凭证：" prop="footnote"> 
                               <el-col :span="22">
                                   <el-input v-model="payData.annex" readonly></el-input>
                               </el-col>
                               <el-col :span="1" :offset="1">
                                    <el-button type="primary" size="small">查看</el-button>
                               </el-col>
                            </el-form-item>

                          </el-col>

                      </el-row>
                  
                     

                         

                    </div>
                  </div>
                </el-form>
              </div>
         </div> -->
        
        <div class="goods-fitter">
         

          <div class="mail-fitter" style="margin-top:20px">
            <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px" size="small">
              <div class="mail-wrapper">
                <h4 class="title1">订单明细</h4>
                <div class="search-base">
                  <div class="mbottom">
                    <div class="goods-fitter">
                      <div class="mcard" style="padding-bottom:0">
                        <el-table :data="pageList" 
                        border style="width: 100%" height="500" show-summary>
                          <el-table-column  label="序号" type="index"  align="center" width="50">
                                    <template slot-scope="scope">
                                        {{scope.$index + (currPage - 1) * pageSize + 1}}
                                    </template>
                          </el-table-column>
                          <el-table-column prop="customerType" label="采购订单号" align="center" width="120">
                                <template slot-scope="scope">
                                    {{scope.row.purchaseOrderNo}}
                                </template>
                          </el-table-column>
                          <el-table-column prop="commonContactName" label="发货订单号" align="center">
                                  <template slot-scope="scope">
                                          {{scope.row.spoNo}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="采购员" align="center" width="100">
                                     <template slot-scope="scope"> 
                                           {{scope.row.purchaseUserName}} 
                                     </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="商品代码" align="center">
                                      <template slot-scope="scope">
                                           {{scope.row.modelNumber}} 
                                      </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="商品名称" align="center" width="160">
                                      <template slot-scope="scope">
                                          {{scope.row.goodsName}}
                                      </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="规格尺寸" align="center" width="100">
                                      <template slot-scope="scope">
                                          {{scope.row.specSize}} 
                                      </template>
                          </el-table-column>
                          <el-table-column prop="purchaseQuantity" label="订单总数量"  align="center" width="100">
                                    
                          </el-table-column>
                           <el-table-column prop="purchasedQuantity" label="已结数量" align="center" width="100">
                                    
                          </el-table-column>
                          <el-table-column prop="thisQuantity" label="本次结算数量" align="center" width="110">
                                      <template slot-scope="scope">
                                          <el-input size="small" v-model="scope.row.thisQuantity" readonly></el-input>
                                      </template>
                          </el-table-column>
                          <el-table-column prop="surplusQuantity" label="剩余数量" align="center" width="100">
                            <template slot-scope="scope">
                                    {{scope.row.surplusQuantity}}
                            </template>
                          </el-table-column>
                          <el-table-column prop="goodsPrice" label="含税单价 " align="center" width="100">
                            <template slot-scope="scope">
                                    {{scope.row.goodsPrice}}
                            </template>
                          </el-table-column>
                          
                          <el-table-column prop="totalPrice" label="含税总金额" align="center" width="100">
                            <template slot-scope="scope">
                                    {{Math.floor(scope.row.totalPrice * 100) / 100}}
                            </template>
                          </el-table-column>

                        
                        </el-table>
           
                         <div class="pagination">
                          <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currPage"
                            :page-sizes="[2,5,10,20]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total"
                          ></el-pagination>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-form>
          </div>
        </div>
          <div class="mcard0">
            <div class="mcard"> 
                <h4 class="title">审批信息</h4>
                <el-row>
                  <el-button class="audit" type="primary" size="small" @click="Audit">查看审批进度</el-button>
                </el-row>
           
             <div class="auditBody" style="position:relative;top:-1px;">
                <div class="auditHeader" style="margin-top:0;">
                    <span class="gray">审批意见</span>
                    <div class="choose">
                      <el-radio v-model="form.auditStatus" label="1">同意</el-radio>
                      <el-radio v-model="form.auditStatus" label="2">不同意</el-radio>
                    </div>
                    <span class="gray">审批人</span>
                    <span class="white" v-if="userList.thisUserName">{{userList.thisUserName}}</span>
                    <span class="white" v-if="!userList.thisUserName">无</span>
                    <span class="gray">部门 </span>
                    <span class="white" v-if="userList.thisOrganizeName">{{userList.thisOrganizeName}}</span>
                    <span class="white" v-if="!userList.thisOrganizeName">无</span>
                    <span class="gray">职位 </span>
                    <span class="white" v-if="userList.thisPosition">{{userList.thisPosition}}</span>
                    <span class="white" v-if="!userList.thisPosition">无</span>
                </div>
                <div class="auditContent">
                    <span class="gray">意见说明</span>
                    <div class="content">
                        <textarea class="reasonArea" cols="155" rows="4"
                        v-model="form.opinions">

                        </textarea>
                    </div>
                </div>
               </div>
            </div>  
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="createClose()" size="small">关 闭</el-button>
          <el-button type="primary" @click="saveAudit" size="small">提交审批</el-button>
        </span>
      </el-dialog>
       <el-dialog :visible.sync="dialogVisible" :modal="true" :append-to-body="false">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                    <span slot="footer" class="dialog-footer"></span>
      </el-dialog> 
          <TimeLine
        :auditData="auditData"
        :goVisibles="goVisibles"
        :billNo="billNo" 
        :Type="Type"
          @createCloseG="createClose5"
            @createClosingG="createClosing5">
        </TimeLine> 
    </div>
</template>

<script>
import {savePaymentAudit,previewPaymentTimeline} from '@/api/purchase/index'
import { throttleTipPop } from "@/utils/functions.js";
import TimeLine from './timeLine';
export default {
    filters:{
      merge(val){
        switch(val){
          case 1:
            return "合并申请";
            break;
          case 2:
            return "单笔交易";
            break;
          default:
            return;
        }
      }
    },
    data(){
        return{
            radio:'',
            aIndex:1,
            bIndex:1,
            files:[],
            billNo:'',
            Type:'',
            approvalVisible:false,
             dialogImageUrl: '',
            dialogVisible: false,
            goVisibles:false,
            storeData:'',
            deletePath:'',//删除上传路径
            imgArr:[],//上传数组
            payData:{},
            purchaseOrderId1:'',
            logisticsData:'',
            warehouseData:'',
            userList:{},
            dataArr: [],
            userName:'',
            oldDetail:'',
            oldApplyAmount:'',
            showIndex:0,//展示定金的下表
            otherIndex:0,//禁用输入框的下表
            auditData:'',
            rate:20,//比例
            timer:'',
            timer1:'',
              //前端分页
            total:0,
            currPage: 1,  //默认第一页
            pageSize: 10, //默认展示10条数据
             tableDatas: {
                currentPage: 1,
                sizes: [10, 20, 50, 100],
                size: 10,
                total: 0
                },
             form: {
                current_page: 0,
                page_size: 10,
                total_count: 0,
                
                auditStatus:'',//审核状态
                opinions:'',//审核意见
            },
            formData: {
                current_page: 1,
                page_size: 2,
                total_count: 0
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
                },               
              ],
                 options: [{
                    value: 1,
                    label: '合并申请'
                    }, {
                    value: 2,
                    label: '单笔申请'
                    }
                ],
                   options2: [{
                    value: 1,
                    label: '第一种：分多期支付'
                    }, {
                    value: 2,
                    label: '第二种：一次性支付'
                    }
                ],
                   options3: [{
                    value: 1,
                    label: '对私付款'
                    }, {
                    value: 2,
                    label: '对公付款'
                    },
                    {
                    value: 3,
                    label: '支票付款'
                    }, {
                    value: 4,
                    label: '现金付款'
                    },
                     {
                    value: 5,
                    label: '到付付款'
                    }, {
                    value: 6,
                    label: '微信'
                    },
                    {
                    value: 7,
                    label: '支付宝'
                    },
                    {
                    value: 8,
                    label: '其他形式'
                    }
                ],
                    rules: {
                partyA: [{ required: true, message: "此项为必填项", trigger: "blur" }],
                partyAAddress: [
                { required: true, message: "此项为必填项", trigger: "blur" }
                ],
                partyAContacts: [
                { required: true, message: "此项为必填项", trigger: "blur" }
                ],
                deliveryDate:[
                  { required: true, message: "此项为必填项", trigger: "blur" } 
                ],
                orderAmount:[
                  { required: true, message: "此项为必填项", trigger: "blur" } 
                ]
            }
        }
    },
     created() {
  },
    props:["approvalVisibles","payList","userData"],
    watch: {
        approvalVisibles(val) {
          this.approvalVisible = val; 
            },
        payList(val){
          this.payData = val;
          this.payData.payType = Number(this.payData.payType);
          this.total = val.details.length;
          this.depoit(this.payData.payReason);
        },
        userData(val){
          this.userList = val;
        },
           'form.auditStatus':{
        handler(val){         
          if(val==='1'){
            this.form.opinions ="审核通过"
          }else if(val==='2'){
            this.form.opinions ="审核不通过"
          }
        }
        ,deep:true
        },
      /*    'payData.payReason':{
          handler(val){
                if(val!=="定金"&&val!=="尾款"&&val!=="分批付款"&&val!=="其他"){
                  this.form.otherReason = val; 
                 
                }else if(val=="定金"){
                  this.showIndex =1;
                }
                
          },deep:true
        }, */
        'payData.details':{
          handler(val){
            if(val){
              for(let i=0;i<val.length;i++){
                if(val[i].thisQuantity > val[i].surplusQuantity){
                  throttleTipPop(this, "warning","本次结算数量不能大于剩余数量！", 2000);
                  val[i].thisQuantity = val[i].surplusQuantity;
                }
                val[i].totalPrice =  val[i].goodsPrice * val[i].thisQuantity;
              }
            }
          },deep:true
        },

    },
     computed: {
         total1(){
          let totals = 0
          let _this = this
          if(_this.payData.details&&_this.payData.details.length>0){
              for(var i = 0;i<_this.payData.details.length;i++){
                if(_this.payData.details[i].totalPrice){
                  totals+=parseFloat(_this.payData.details[i].totalPrice)
                }else{
                  totals = 0
                }
          }         
          }
          this.rate = (this.payData.deposit/totals) *100
          this.payData.applyAmount = totals;
            return totals  
      },
      //前端计算分页
        pageList(){
          let {currPage,pageSize} =this;
          if(this.payData.details){
               return this.payData.details.slice((currPage-1)*pageSize,currPage*pageSize)
          }
         
        }
    },
    methods:{
    //关闭页面
     createClose() {
      
      this.$confirm('您确认要关闭吗？')
                        .then(_ => {
                      this.approvalVisible= false;
                      this.showIndex = 0;
                      this.otherIndex =0;
                      this.$emit("createCloseA", this.approvalVisible);
                })
                .catch(_ => {});
    },
    createClosing() {
      
      this.$confirm('您确认要关闭吗？')
                        .then(_ => {
                      this.approvalVisible = false;
                      this.showIndex = 0;
                      this.otherIndex =0;
                      this.$emit("createClosingA", this.approvalVisible);
                })
                .catch(_ => {});
    },
     createClose5: function(data) {
      this.goVisibles = data;
    },
    createClosing5: function(data) {
      this.goVisibles = data;
    },
    depoit(val){
       
        if(val==="定金"){
          this.showIndex =1;
          this.otherIndex =0;
        }else if(val==="其他"){
          this.otherIndex = 1;
        }else{
          this.showIndex = 0;
          this.otherIndex =0;
        }
        
     },
      //进度表
      Audit(){
        this.billNo = this.payData.billNo;
        this.Type = 4;
        previewPaymentTimeline(this.payData.payBillId).then(res=>{
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
    //保存审批
    saveAudit(){
      let obj ={};
      obj.id =this.payData.payBillId;
      obj.auditStatus = this.form.auditStatus;
      obj.opinions = this.form.opinions;
        savePaymentAudit(obj).then(res=>{
          if(res.code===200){
            throttleTipPop(this, "success","提交审批成功！", 2000);
            this.approvalVisible =false;
            this.$emit("saveAudit1",this.approvalVisible);
          }
        })
    },
    address(){

    },
   
    handleSizeChange(val) {
          this.pageSize =val;
          this.currPage = 1;
    },
    handleCurrentChange(val) {
          
          this.currPage =val;
    },
    handleChange() {}
    },
    components:{
      TimeLine
    }
}
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
 #addPurchasing{
      .el-dialog__body {
        padding: 0 !important;
        background: none !important;
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
        .title1 {
          margin-left: -20px;
          font-size: 16px;
          color: 3333;
          padding-left: 10px;
          line-height: 1.4;
          border-left: 4px solid $themeColor;
          margin-bottom: 10px;
        }
      }
    .mail-fitter {
      .mail-wrapper {
        padding: 20px;
        padding-bottom: 0;
        border: 1px solid rgb(215, 224, 241);
        background: #fff;
        .title1 {
          margin-left: -20px;
          font-size: 16px;
          font-weight: 400;
          color: 3333;
          padding-left: 10px;
          line-height: 1.4;
          border-left: 4px solid $themeColor;
          margin-bottom: 23px;
        }
      }
    }
     .box{
      margin-left: 12px;
      margin-top:10px;
    }
    .blue{
        cursor: pointer;
        color: #4A99FA;
        text-decoration: underline;
        }
    .supplier{
      display: inline-block;
      width: 168px;
      overflow: hidden;/*超出部分隐藏*/
      white-space: nowrap;/*不换行*/
      text-overflow:ellipsis;/*超出部分文字以...显示*/
    }
    .handsel{
      border-bottom: 1px solid #000;
      width:60px;
      outline: none;
      text-align: center;
    }
    .handsel:nth-of-type(1){
      width:40px;
    }
.auditHeader{
  margin-top:20px;
  .gray{
    display: inline-block;
    width:130px;
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
    padding: 0 40px;
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
    width: 198px;
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
    width:130px;
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
    width: 1212px;
    height: 96px;
    display: inline-block;
    .reasonArea{
        border: 0;
        resize:none;
        outline:none;
        line-height: 20px;
        letter-spacing: 1px;
    }
    .reasonArea:focus{
        border: 0;
    }
  }
}
    .audit{
    float: right;
    margin-bottom: 10px;
    }
        .mcard0 {
        border: 1px solid #d7e0f1;
        margin-top: 20px;
    }
    .el-input-group__append button.el-button {
      width:50px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
    }
    .el-input-number.is-controls-right .el-input-number__decrease {
      background: #fff !important;
    }
    .el-input-number.is-controls-right .el-input-number__increase {
      background: #fff !important;
    }
      /deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 8px; // 横向滚动条
    height: 8px; // 纵向滚动条 必写
   
  }
  // 滚动条的滑块
  /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
     background: #ddd;
    border-radius: 3px;
  }
  /deep/ .el-dialog__headerbtn{
      top:10px;
    }
 }

</style>