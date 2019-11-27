<template>
    <div id="detailContract">
        <el-dialog width="72%" :visible.sync="submitVisible" :before-close="createClosing">  
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form label-width="100px" size="small">
              <div class="search-wrapper">
                <h4 class="title">提交审批</h4>
              </div>
            </el-form>
          </div>
        </div>
        <div class="mbottom">
          <div class="goods-fitter">
            <div class="search-base">
            <el-form ref="infoForm" :model="detailData1" :rules="rules" label-width="150px" size="small">
              <div class="search-wrapper">
                <div class="mbottom">
                  <h4 class="title1">合同信息</h4>
                </div>
                <div class="search-base">
                  <el-row>
                    <el-col :span="7">
                      <el-col>
                        <el-form-item label="合同类型：">
                          <el-col :span="19">
                            <span>采购订单合同</span>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="合同编号：">
                        <el-col :span="21">
                        
                           {{detailData1.contractNo}}
                          
                           
                        </el-col>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="关联业务单号：">
                        <el-col :span="21">
                          
                           {{detailData1.businessNo}}
                        
                        
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-col>
                        <el-form-item label="甲方：" prop="acompanyName">
                          <el-col :span="19">
                            <el-input v-model="detailData1.acompanyName" readonly>
                            </el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="乙方：">
                        <el-col :span="19">
                          <el-input v-model="detailData1.bcompanyName" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>

                 
                  <el-row>
                    <el-col :span="12">
                      <el-col>
                        <el-form-item label="联系人：" >
                          <el-col :span="19">
                            <el-input v-model="detailData1.acontact" readonly></el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="联系人：">
                        <el-col :span="19">
                          <el-input v-model="detailData1.bcontact" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-col>
                        <el-form-item label="联系电话：" >
                          <el-col :span="19">
                            <el-input v-model="detailData1.atel" readonly></el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="联系电话：">
                        <el-col :span="19">
                          <el-input v-model="detailData1.btel" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-col>
                        <el-form-item label="传真：">
                          <el-col :span="19">
                            <el-input v-model="detailData1.afax" readonly></el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="传真：">
                        <el-col :span="19">
                          <el-input v-model="detailData1.bfax" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-col>
                        <el-form-item label="邮箱：" >
                          <el-col :span="19">
                            <el-input v-model="detailData1.aemail" readonly></el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="邮箱：">
                        <el-col :span="19">
                          <el-input v-model="detailData1.bemail" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                   <el-row>
                    <el-col :span="12">
                      <el-col>
                        <el-form-item label="地址：" >
                          <el-col :span="19">
                            <el-input v-model="detailData1.aaddress" readonly></el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="地址：">
                        <el-col :span="19">
                          <el-input v-model="detailData1.baddress" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-form>
          </div>
          </div>
        </div>
         <div class="mail-fitter" style="margin-top:20px;margin-bottom:20px;">
            <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px" size="small">
              <div class="mail-wrapper">
                <h4 class="title1">产品清单</h4>
                <div class="search-base">
                  <div class="mbottom">
                    <div class="goods-fitter">
                      <div class="mcard" style="padding-bottom:0">
                        <el-table :data="detailData1.details" border style="width: 100%" stripe>
                          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
                          <el-table-column prop="customerName" label="图样" align="center" width="100">
                                  <template slot-scope="scope">
                                        <img  :src="scope.row.goodsImgUrl" class="showImg" alt="" v-if="scope.row.goodsImgUrl"/>
                                        <img  src="@/common/images/缺省页.jpg" class="showImg" alt="" v-if="!scope.row.goodsImgUrl"/>
                                  </template>
                          </el-table-column>
                          <el-table-column prop="customerType" label="产品名称" align="center"> 
                                   <template slot-scope="scope">
                                        {{scope.row.goodsName}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactName" label="型号" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.modelNumber}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="税率" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.taxRate}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="数量" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.purchaseQuantity}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="不含税单价" align="center">
                                    <template slot-scope="scope">
                                       {{scope.row.notaxCostPrice}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="税费" align="center">
                                    <template slot-scope="scope">
                                       {{scope.row.taxation}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="含税单价" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.goodsPrice}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="总价" align="center">
                                <template slot-scope="scope">
                                        {{scope.row.totalPrice}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="定制要求" align="center">
                                    <template slot-scope="scope">
                                       {{scope.row.productRequire}}
                                  </template>
                          </el-table-column>
                          <el-table-column label="设计稿" align="center"  width="100">
                                <template slot-scope="scope">
                                      <!-- {{scope.row.fileDesignDraftUrl}} -->
                                      <span v-show="!scope.row.fileDesignDraftUrl">暂无设计稿</span>
                                       <span class="blue" v-show="scope.row.fileDesignDraftUrl" @click="preview(scope.row)">查看</span>
                                    
                                </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="交货日期" align="center">
                                  <template slot-scope="scope">
                                        {{scope.row.distributionTime}}
                                  </template>
                          </el-table-column>
                            <el-table-column label="收货地址" align="center"  width="130">
                                  <template slot-scope="scope">
                                      
                                      <span>{{scope.row.address}}</span>

                                  </template>

                          </el-table-column>
                        </el-table>
                         <div class="total" style="margin-left:80%;margin-top:20px">
                        <el-form label-width="130px" size="small">
                            <el-form-item label="合计：">
                              <el-col :span="24">
                                <el-input  v-model="total1"></el-input>
                              </el-col>
                            </el-form-item>
                        
                      </el-form>
                      </div>
                        <div class="pagination">
                          <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="tableDatas.currentPage"
                            :page-sizes="[10,20,50,100]"
                            :page-size="tableDatas.size"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="tableDatas.total"
                          ></el-pagination>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-form>
          </div>
        <div class="goods-fitter">
          <el-form ref="infoForm" :model="form" :rules="rules" label-width="120px" size="small">
            <div class="search-wrapper">
              <div class="mbottom">
                <h4 class="title1">合同金额</h4>
              </div>
              <div class="search-base">
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="合同金额：">
                        <el-col :span="18">
                          <el-input v-model="detailData1.contractFactFee" readonly></el-input>
                        </el-col>元
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="结算方式：">
                      <el-col :span="19">
                        <el-select v-model="detailData1.settlementType" placeholder="请选择" style="width:100%"
                        disabled>
                            
                                <el-popover
                                    placement="left"
                                    title="分期付款"
                                    width="300"
                                    trigger="hover"
                                    close-delay="0"
                                    transition="linear"
                                    content="合同生效后10日内，乙方即支付合同金额的10%即
                                            人民币壹佰圆圆整(小写：人民币【100.0000】元)
                                            作为预付款，剩余款项在甲方完成全部交货后支付">       
                                  
                                <el-option slot="reference" label="第一种：分两期支付" :value=1></el-option>
                                </el-popover>
                                <el-popover
                                    placement="left"
                                    title="一次性支付"
                                    width="300"
                                    trigger="hover"
                                    close-delay="0"
                                    transition="linear"
                                    content="所有货物经乙方验收确认后，乙方30个工作日内 一
                                            次性结清甲方全部货款">       
                                  
                                <el-option slot="reference" label="第一种：一次性支付" :value=2></el-option>
                                </el-popover>
                          </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="定金：">
                        <el-col :span="18">
                          <el-input v-model="detailData1.deposit" readonly></el-input>
                        </el-col>元
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="合同生效后：">
                      <el-col :span="16">
                        <el-input
                          v-model="detailData1.payLimitDay"
                         readonly></el-input>
                      </el-col>日内支付
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="收款账户：" >
                        <el-col :span="19">
                          <el-input v-model="detailData1.bankAccount" readonly>
                          </el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="户名：" >
                      <el-col :span="19">
                        <el-input v-model="detailData1.bankName" readonly></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="开户行：">
                        <el-col :span="19">
                          <el-input v-model="detailData1.bankOpeningName" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="纳税号：">
                      <el-col :span="19">
                        <el-input v-model="detailData1.taxNumber" readonly></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="回票日期：" prop="ticketDate">
                        <el-col :span="19">
                          <el-date-picker
                          type="date"
                          valueFormat="yyyy-MM-dd HH:mm:ss"
                          v-model="detailData1.ticketDate"
                          style="width:100%"
                           :picker-options="pickerOptions0"
                           disabled
                           ></el-date-picker>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                      <el-form-item label="收货日期：" prop="deliveryDate">
                        <el-col :span="19">
                          <el-date-picker
                          type="date"
                          valueFormat="yyyy-MM-dd HH:mm:ss"
                          v-model="detailData1.deliveryDate"
                          style="width:100%;"
                           :picker-options="pickerOptions0"
                           disabled
                           ></el-date-picker>
                        </el-col>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                    <el-col :span="24">
                      <el-form-item label="设计稿：">
                        <el-col :span="20">
                          <el-input v-model="detailData1.fileDesignDraftUrl" readonly></el-input>
                        </el-col>
                        
                        <el-col :span="3" :offset="1">
                              <el-button type="primary" size="small" @click="downLoad">下载</el-button>
                        </el-col>

                      </el-form-item>
                  </el-col>
              </el-row>

              </div>
            </div>
          </el-form>

         
        </div>
         <div class="mcard0">
            <div class="mcard"> 
                <h4 class="title">审批信息</h4>
                <el-row>
                  <el-button class="audit" type="primary" size="small" @click="Audit">查看审批进度</el-button>
                </el-row>
             <div class="auditBody">
                <div class="auditHeader">
                    <span class="gray">推送状态</span>
                    <div class="choose">
                      <span style="width:148px;display:inline-block;text-align:center;">{{personList.pushStatus | status}}</span>
                    </div>
                    <span class="gray">提交人</span>
                    <span class="white" v-if="personList.userName">{{personList.userName}}</span>
                    <span class="white" v-if="!personList.userName">无</span>
                    <span class="gray">部门 </span>
                    <span class="white" v-if="personList.organizeName">{{personList.organizeName}}</span>
                    <span class="white" v-if="!personList.organizeName">无</span>
                    <span class="gray">职位 </span>
                    <span class="white" v-if="personList.position">{{personList.position}}</span>
                    <span class="white" v-if="!personList.position">无</span>
                </div>
                <div class="auditContent">
                    <span class="gray">推送说明</span>
                    <div class="content">
                          {{personList.comment}}
                    </div>
                </div>
             </div>
             <div class="auditBody2" :class="!userList[0]||!personList.userName?'auditShow':''">
                <div class="auditHeader" style="margin-top:0;">
                    <span class="gray">审批意见</span>
                    <div class="choose">
                      <el-radio v-model="form.auditStatus" label="1">同意</el-radio>
                      <el-radio v-model="form.auditStatus" label="2">不同意</el-radio>
                    </div>
                    <span class="gray">审批人</span>
                    <span class="white" v-if="userList[0]">{{userList[0]}}</span>
                    <span class="white" v-if="!userList[0]">无</span>
                    <span class="gray">部门 </span>
                    <span class="white" v-if="userList[1]">{{userList[1]}}</span>
                    <span class="white" v-if="!userList[1]">无</span>
                    <span class="gray">职位 </span>
                    <span class="white" v-if="userList[2]">{{userList[2]}}</span>
                    <span class="white" v-if="!userList[2]">无</span>
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
          <el-button type="primary" @click="submitAudit()" size="small">提交审批</el-button>
          
        </span>
      </el-dialog>
      <!-- 上传预览 -->
       <el-dialog :visible.sync="dialogVisible" :modal="true" :append-to-body="false">
                                        <img width="100%" :src="previewImg" alt="">
                                        <span slot="footer" class="dialog-footer"></span>
        </el-dialog>、
         <!-- 审批进度 -->
          <TimeLine
        :auditData="auditData"
        :goVisibles="goVisibles"
        :orderNo="orderNo"  
          @createCloseG="createClose5"
            @createClosingG="createClosing5">
        </TimeLine> 
    </div>
</template>

<script>
import { getErpGoods } from "@/api/product/index";
import {SignContractAudit,findPurchaseAuditPlan} from "@/api/purchase/index"
import { throttleTipPop } from "@/utils/functions.js";
import TimeLine from "./timeLine"
export default {
   filters:{
      status(val){
        switch(val){
          case 0:
            return "未推送";
            break;
          case 1:
            return "已推送";
            break;
          default:
            return
        }
      }
    },
  components:{
    TimeLine
  },
    data(){
        return{
            pickerOptions0: {
              disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
              }
            }, 
            submitVisible:false,
             accountVisible: false, //选择收款账户
            partyVisible: false, //选择甲方弹窗
            addressVisible:false,//添加地址弹窗
            auditData:[],
            previewImg:'',//预览设计稿
            dialogVisible:false,
            goVisibles:false,//进度表
            personList:'',//审批人信息
            orderId:'',//采购订单ID
            userList:'',//当前用户信息
            orderNo:'',
            dataArr: [],
            detailData1:{},
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
                contractNumber: "", //合同编号
                relevantBusiness: "", //关联业务单号
                partyA: "", //甲方
                partyB: "", //乙方
                partyAAddress: "", //甲方地址
                partyBAddress: "", //乙方地址
                partyAContacts: "", //甲方联系人
                partyBContacts: "", //乙方联系人
                partyANumber: "", //甲方联系电话
                partyBNumber: "", //乙方联系电话
                partyAFax: "", //甲方传真
                partyBFax: "", //乙方传真
                partyAMmail: "", //甲方邮箱
                partyBMmail: "", //乙方邮箱
                dateNum: "", //多少日内支付
                contractAmount: "", //合同金额
                settlement: "", //结算方式
                handsel: "", //定金
                paymentAccount: "", //收款账户
                accountName: "", //户名
                openingBank: "", //开户行
                taxNumber: "", //纳税号
                invoiceContent: "", //发票项目内容
                designs: "", //设计稿
                distributionAddress: "", //收货地址
                salesSheet: "", //询价单号
                customerName: "", //客户名称
                salesRepresentatives: "", //销售代表
                contacts: "", //联系人
                department: "", //部门
                phoneNumber: "", //电话号码
                mail: "", //邮箱
                mobilePhone: "", //手机号码
                invoiceType: "", //发票类型
                projectName: "", //项目名称
                address: "", //收货地址
                differentiation: "", //客户区分
                keywords: "" ,//关键词
                definition:'',//单位名称
                addressee:'',//收件人
                deposit:'',//支付定金
                invoiceType:'',//发票类型
                auditStatus:'',//审核状态
                opinions:'',//审核意见
            },
            formData: {
                current_page: 1,
                page_size: 2,
                total_count: 0
            },
            tableData: [],
                    rules: {
                partyA: [{ required: true, message: "此项为必选项", trigger: "blur" }],
                partyAAddress: [
                { required: true, message: "此项为必选项", trigger: "blur" }
                ],
                partyAContacts: [
                { required: true, message: "此项为必选项", trigger: "blur" }
                ],
                partyANumber: [
                { required: true, message: "此项为必选项", trigger: "blur" }
                ],
                dateNum: [{ required: true, message: "此项为必选项", trigger: "blur" }],
                paymentAccount: [
                { required: true, message: "此项为必选项", trigger: "blur" }
                ],
                accountName: [
                { required: true, message: "此项为必选项", trigger: "blur" }
                ],
                openingBank: [
                { required: true, message: "此项为必选项", trigger: "blur" }
                ],
                customerName: [
                { required: true, message: "此项为必选项", trigger: "blur" }
                ],
                customerName: [
                { required: true, message: "此项为必选项", trigger: "blur" }
                ],
                contacts: [
                { required: true, message: "此项为必选项", trigger: "blur" }
                ],
                mobilePhone: [
                { required: true, message: "此项为必选项", trigger: "blur" }
                ],
                projectName: [
                { required: true, message: "此项为必选项", trigger: "blur" }
                ],
                customerName: [
                { required: true, message: "此项为必选项", trigger: "blur" }
                ]
            }
        }
    },
     created() {
  },
    props:["submitVisibles","submitData",'personData',"contractId",'userData'],
    watch: {
      submitVisibles(val) {
        this.submitVisible = val;
          },
      submitData(val){
        this.detailData1 =val;
      },
      personData(val){
        this.personList = val;
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
    }
    },
    computed: {
      total1(){
      let totals = 0
      let _this = this
      if(_this.detailData1.details&&_this.detailData1.details.length>0){
          for(var i = 0;i<_this.detailData1.details.length;i++){
            if(!isNaN(_this.detailData1.details[i].totalPrice)){
              totals+=parseFloat(_this.detailData1.details[i].totalPrice)
            }else{
              totals = 0
            }
      }
        
      }
        return totals
      
     }
    },
    methods:{
      //时间线
    createClose5: function(data) {
      this.goVisibles = data;
    },
    createClosing5: function(data) {
      this.goVisibles = data;
    },
    //关闭页面
     createClose() {
      
      this.$confirm('您确认要关闭吗？')
                        .then(_ => {
                      this.submitVisible= false;
                      this.$emit("createCloseAu", this.submitVisible);
                })
                .catch(_ => {});
    },
    createClosing() {
      
      this.$confirm('您确认要关闭吗？')
                        .then(_ => {
                      this.submitVisible = false;
                       this.$emit("createClosingAu", this.submitVisible);
                })
                .catch(_ => {});
    },
    submitAudit(){
      let obj = {};
      obj.auditStatus = this.form.auditStatus;
      obj.opinions = this.form.opinions;
      obj.id = this.detailData1.contractId;
      SignContractAudit(obj).then(res=>{
        if(res.code===200){
          throttleTipPop(this, "success","提交审批成功！", 2000);
          this.submitVisible = false;
          this.$emit('signContract',this.submitVisible)
        }
        
      })
    },
    //下载设计稿
    downLoad(){
          if(!this.fileUrl){
               throttleTipPop(this, "warning", "暂无上传设计稿信息", 2000);
          }else{
               window.open(this.fileUrl,"_blank");
          }
            
      },
     //进度表
      Audit(){
        this.orderNo = this.detailData1.contractNo;
        this.orderId = this.detailData1.contractId;
        findPurchaseAuditPlan(this.orderId).then(res=>{
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
    //预览设计稿
      preview(row){
          this.previewImg = row.fileDesignDraftUrl;
          this.dialogVisible = true;
      },
    address(){

    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleChange() {}
    }
}
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
 #detailContract{
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
    .showImg{
      width:80px;
      height: 80px;
    }
    /deep/ .el-dialog__headerbtn{
      top:10px;
    }
     .blue{
        cursor: pointer;
        color: #4A99FA;
      }
    .avatar-uploader{
      border: 0;
      background:#4C86F4;
      color: #fff;
      text-align: center;
      border-radius: 3px;
      font-size:12px;
      position: relative;
      top: 1px;
      width: 56px;
      height: 32px;
      /deep/ .el-upload{
          border: 0 !important;
      }
    }
    .audit{
  float: right;
}
.auditHeader{
  margin-top:20px;
  .gray{
    display: inline-block;
    width: 10.1%;
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
    width: 17.73%;
    padding-left: 40px;
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
    width: 12.91%;
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
    width: 10.1%;
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
    width: 86.72%;
    height: 96px;
    display: inline-block;
    .reasonArea{
        border: 0;
        resize:none;
        outline:none;
        line-height: 20px;
        letter-spacing: 1px;
        width: 95%;
    }
    .reasonArea:focus{
        border: 0;
    }
  }
}
  .auditBody2{
    position: relative;
    top:-1px;
  }
  .auditShow{
    top:-4px;
  }
    .mcard0 {
    border: 1px solid #d7e0f1;
    margin-top: 20px;
  }
 }
</style>