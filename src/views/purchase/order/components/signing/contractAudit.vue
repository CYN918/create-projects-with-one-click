<template>
    <div>
         <!-- //签订合同 -->
  <el-dialog width="75%" :visible.sync="approvalVisible" :before-close="createClosing">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">合同审批</h4>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mcard0">
        <div class="mcard">
            <h4 class="title">合同信息</h4>

          <el-form ref="infoForm" :model="form" :rules="rules" label-width="95px"  size="small">
            <el-row>
              <el-col :span=8>
                <el-form-item label="合同类型 ：">                       
                              <span>采购订单合同</span>                        
                </el-form-item>
              </el-col>
              <el-col :span=8>  
                <el-form-item label="合同编号：" >                       
                                <span>{{initData1.contractNo}}</span>                    
                </el-form-item> 
              </el-col>
              <el-col :span=8>  
                <el-form-item label="采购单号：" >                       
                                <span>{{initData1.purchaseOrderNo}}</span>                    
                </el-form-item> 
              </el-col>
          </el-row>
           <el-row>
              <el-col :span=8>
                <el-form-item label="提 交 人 ：">                       
                              <span>{{initData1.applyUserName}}</span>                        
                </el-form-item>
              </el-col>
              <el-col :span=8>  
                <el-form-item label="部 门：" >                       
                                <span>{{initData1.departmentName}}</span>                    
                </el-form-item> 
              </el-col>
              <el-col :span=8>  
                <el-form-item label="职位：">                       
                                <span>{{initData1.position}}</span>                    
                </el-form-item> 
              </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
                  <el-form-item label="签订状态：" prop="sigingType">                       
                          <el-col :span="20">
                                  <el-select
                                v-model="form.sigingType"
                                style="width:100%;"
                                >
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
              <el-col :span="12">
                <el-form-item label="签订日期：">                       
                    <el-col :span="20">
                         <el-date-picker
                            v-model="initData1.signTime"
                            type="date"
                            valueFormat='yyyy-MM-dd HH:mm:ss'
                            placeholder="选择日期"
                            style="width:100%"
                            disabled
                            :picker-options="pickerOptions0">
                          </el-date-picker>  
                    </el-col>                        
                </el-form-item>
              </el-col>
              
          </el-row>
          <el-row>
            <el-col :span="23">
                <el-form-item label="提交说明：">
                    <el-input  v-model="initData1.reason" readonly>
                
                    </el-input>
                  </el-form-item>
            </el-col>
          <!--   <el-col :span="23">
                <el-form-item label="备注：" prop="remark" v-if="form.sigingType===2">
                  <el-input  v-model="form.signRemark">
                    
                  </el-input>
                </el-form-item>
            </el-col> -->
          </el-row>
               
          </el-form>
       
        </div>
      </div>
       <div class="mail-fitter" style="margin-top:20px;margin-bottom:20px;">
            <el-form ref="infoForm"  label-width="100px">
              <div class="mail-wrapper" style="padding-bottom: 10px;">
                <h4 class="title1">商品清单</h4>
                <div class="search-base">
                  <div class="mbottom">
                    <div class="tabs-header">
                        <ul class="clearfix">  
                            <li class ="link" @click="tabIndex0(0)"  :class="currentIndex0===0 ? 'active' : ''">合同商品清单</li>
                            <li class ="link" @click="tabIndex0(1)"  :class="currentIndex0===1 ? 'active' : ''">订单商品清单</li>
                        </ul>
                      </div>
                    <div class="goods-fitter" style="border:1px solid #d7e0f1;" v-show="comIndex===0">
                       
                      <div class="mcard" style="padding-bottom:0">
                        <el-table :data="scGoodsData1" border style="width: 100%" stripe>
                          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
                          <el-table-column prop="customerName" label="图样" align="center" width="100">
                                  <template slot-scope="scope">
                                        <img  :src="scope.row.goodsImgUrl" class="showImg" alt="" v-if="scope.row.goodsImgUrl"/>
                                        <img  src="@/common/images/缺省页.jpg" class="showImg" alt="" v-if="!scope.row.goodsImgUrl"/> 
                                  </template>
                          </el-table-column>
                          <el-table-column prop="customerType" label="产品名称" align="center" width="160">
                                   <template slot-scope="scope">
                                       <div class="txt_left"> 商品名称：{{scope.row.goodsName}} </div>
                                        <div class="txt_left"> 货号：{{scope.row.goodsSn}} </div>
                                        <div class="txt_left">品牌：{{scope.row.brandName}} </div>
                                        <div class="txt_left"> 型号：{{scope.row.modelNumber}} </div>
                                        <div class="txt_left"> SKU：{{scope.row.skuId}} </div>
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactName" label="规格尺寸" align="center" width="80">
                                    <template slot-scope="scope">
                                        {{scope.row.specSize}}
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
                          <el-table-column prop="commonContactDept" label="含税价" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.goodsPrice}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="合计" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.totalPrice}}
                                  </template>
                          </el-table-column>
                             <el-table-column  align="center"  width="120">
                                  <template slot="header" slot-scope="scope">
                                       <el-dropdown trigger="click" @command="handleCommand" class="drop">
                                        <span class="el-dropdown-link">
                                          {{addressTitle}}<i class="el-icon-arrow-down el-icon--right"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                          <el-dropdown-item
                                          v-for="(item,index) in pay" :key="index"
                                          :command="item.command">
                                          {{item.value}}
                                          </el-dropdown-item>

                                        </el-dropdown-menu>
                                       </el-dropdown>
                                  </template>
                                  <template slot-scope="scope">
                                      <el-button type="primary" size="small" v-if="addIndex===1">上传</el-button>
                                      
                                      <span v-if="addIndex===2">{{scope.row.address}}</span>

                                  </template>

                          </el-table-column>
                          <el-table-column label="设计稿" align="center"  width="100">
                                <template slot-scope="scope">
                                    
                                    <span v-show="!scope.row.fileDesignDraftUrl">暂无设计稿</span>
                                      <span class="blue" v-show="scope.row.fileDesignDraftUrl" @click="preview(scope.row)">查看</span>
                                </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="交货日期" align="center">
                                  <template slot-scope="scope">
                                        {{scope.row.distributionTime}}
                                  </template>
                          </el-table-column>
                           <el-table-column prop="commonContactDept" label="采购单号" align="center">
                                  <template slot-scope="scope">
                                        {{scope.row.purchaseOrderNo}}
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
                
                      </div>
                    </div>
                    <div class="goods-fitter" style="border:1px solid #d7e0f1;" v-show="comIndex===1">
                       
                      <div class="mcard" style="padding-bottom:0">
                        <el-table :data="poGoodsData1" border style="width: 100%" stripe>
                          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
                          <el-table-column prop="customerName" label="图样" align="center" width="100">
                                  <template slot-scope="scope">
                                        <img  :src="scope.row.goodsImgUrl" class="showImg" alt="" v-if="scope.row.goodsImgUrl"/>
                                        <img  src="@/common/images/缺省页.jpg" class="showImg" alt="" v-if="!scope.row.goodsImgUrl"/> 
                                  </template>
                          </el-table-column>
                          <el-table-column prop="customerType" label="客户订单信息" align="center" width="150">
                                   <template slot-scope="scope">
                                       <div class="txt_left"> 销售单号：{{scope.row.saleOrderNo}} </div>
                                       <div class="txt_left"> 客户名称:{{scope.row.customerName}} </div>
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactName" label="采购单号" align="center" width="132">
                                    <template slot-scope="scope">
                                        {{scope.row.purchaseOrderNo}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="customerType" label="商品信息" align="center" width="150">
                                   <template slot-scope="scope">
                                       <div class="txt_left"> 商品名称：{{scope.row.goodsName}} </div>
                                       <div class="txt_left"> 货号{{scope.row.goodsSn}} </div>
                                       <div class="txt_left"> 品牌：{{scope.row.brandName}} </div>
                                       <div class="txt_left"> 型号：{{scope.row.modelNumber}} </div>
                                       <div class="txt_left"> SKU：{{scope.row.skuId}} </div>
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
                          <el-table-column prop="commonContactDept" label="合计" align="center">
                                <template slot-scope="scope">
                                        {{scope.row.totalPrice}}
                                  </template>
                          </el-table-column>
                      
                        </el-table>
                        <div class="total" style="margin-left:80%;margin-top:20px">
                        <el-form label-width="130px" size="small">
                            <el-form-item label="合计：">
                              <el-col :span="24">
                                <el-input  v-model="total2"></el-input>
                              </el-col>
                            </el-form-item>
                        
                      </el-form>
                      </div>
                
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-form>
     </div>
      <div class="mcard0">
          <div class="mcard" style="overflow:hidden;">
            <h4 class="title">合同扫描件</h4>
              <div class="imgBox" v-if="initData1.contractFile" @mouseenter="enterIn" @mouseleave="mouseOut">
                                    <img :src="initData1.contractFile" alt=""/>
                                    <div class="blackBox" :class="showIndex===1?'show':''">
                                      <i class="el-icon-zoom-in" @click="handlePictureCardPreview"></i>
                                    </div>
              </div>
              <span v-if="!initData1.contractFile">暂无合同扫描件</span>                 
              <div class="inTips">
                          <span>说明：进行此操作前，如此销售单价格和客户信息有变动需提交修改好。</span><br/>
                           <span>选择签订成功，必须上传签订好的合同扫描件.后面合同审核和收款要用到。</span><br/>
                      
              </div>
    
          
        </div>       
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
                       <span style="width:148px;display:inline-block;text-align:center;">{{personList.pushStatus |  status}}</span>
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
            <el-button type="primary" @click="auditSave" size="small">提交审批</el-button>
        </span>
    </el-dialog>
    <!-- 上传预览 -->
       <el-dialog :visible.sync="dialogVisible1" :modal="true" :append-to-body="false">
                                        <img width="100%" :src="previewImg" alt="">
                                        <span slot="footer" class="dialog-footer"></span>
        </el-dialog>
     <!-- 扫面件预览 -->
       <el-dialog :visible.sync="dialogVisible2" :modal="true" :append-to-body="false">
                                        <img width="100%" :src="previewImg1" alt="">
                                        <span slot="footer" class="dialog-footer"></span>
        </el-dialog>
        <!-- 进度表 -->
         <TimeLine
            :auditData="auditData"
            :goVisibles="goVisibles" 
            :Type="Type"
            :contractNo="contractNo"   
            @createCloseG="createClose5"
            @createClosingG="createClosing5">
        </TimeLine> 
    </div>
</template>

<script>
import {findContractPlan,auditSignContract} from "@/api/purchase/index"
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
            previewImg:'',//预览图片
            previewImg1:'',//预览图片
            upLoadIndex:'',//上传那行表格的下标
            showIndex:'',
            contractNo:'',
            Type:'',
            dialogVisible:false,
            dialogVisible1:false,
            dialogVisible2:false,
            approvalVisible:false,
            goVisibles:false,//进度表
            auditData:{},
            scGoodsData1:[],
            poGoodsData1:[],
            contractId:'',//合同ID
            currentIndex0:0,
            comIndex:0,
            dialogImageUrl:'',
            gdId:'',
            initData1:{},
            addressTitle:'收货地址',
            addIndex:2,
            personList:{},
            userList:[],
            pay:[
               {value:"多地址配送",command:1},
               {value:"收货地址",command:2}
             ],
            options2: [
                {
                value: 0,
                label: "待签订"
                },
                {
                value: 1,
                label: "已签定"
                },
            ],
            form: {
                signRemark:'',//备注
                sigingType:1,//签定状态
                sigingTime:'',//签定日期
                imgUrl:[],//上传图片路径

                auditStatus:'',//审核状态
                opinions:'',//理由
            },
            rules:{
        
            sigingType:[
            {required: true, message: '此项为必填项',trigger: 'blur'}
            ],
            sigingTime:[
            {required: true, message: '此为必填项',trigger: ['blur','change']}
            ],
            signRemark:[
            {required: true, message: '此为必填项',trigger: ['blur','change']}
            ],
        }
        }
    },
    created(){

    },
    props:['approvalVisibles','scGoodsData','poGoodsData','initDataA',"personData","userData",'showId'],
    watch:{
        approvalVisibles(val){
            this.approvalVisible = val;

        },
        scGoodsData(val){
            this.scGoodsData1 =val;
        },
        poGoodsData(val){
            this.poGoodsData1 = val;
        },
        initDataA(val){
            this.initData1 = val;
        },
        userData(val){
            this.userList = val;
        },
        personData(val){
            this.personList = val;
        },
        showId(val){
            this.contractId =val;
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
        "scGoodsData1":{
          handler(val){
            if(val&&val.length>0){
              for(let i=0;i<val.length;i++){
                val[i].totalPrice = val[i].purchaseQuantity *val[i].goodsPrice;
              }
            }
          },deep:true
    } 
    },
    computed:{
         total2(){
            let totals = 0
            let _this = this
            if(_this.poGoodsData1&&_this.poGoodsData1.length>0){
                for(var i = 0;i<_this.poGoodsData1.length;i++){
                    if(!isNaN(_this.poGoodsData1[i].totalPrice)){
                    totals+=parseFloat(_this.poGoodsData1[i].totalPrice)
                    }else{
                    totals = 0
                    }
            }
                
            }
                return totals
            
            },
          total1(){
            let totals = 0
            let _this = this
            if(_this.scGoodsData1&&_this.scGoodsData1.length>0){
                for(var i = 0;i<_this.scGoodsData1.length;i++){
                  if(!isNaN(_this.scGoodsData1[i].totalPrice)){
                    totals+=parseFloat(_this.scGoodsData1[i].totalPrice)
                  }else{
                    totals = 0
                  }
            }
              
            }
              return totals
            
          },
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
                      this.approvalVisible= false;
                      this.$emit("createCloseA", this.approvalVisible);
                })
                .catch(_ => {});
        },
        createClosing() {
        
        this.$confirm('您确认要关闭吗？')
                        .then(_ => {
                      this.approvalVisible = false;
                      this.$emit("createClosingA", this.approvalVisible);
                })
                .catch(_ => {});
        },
        tabIndex0 (index) {
                this.currentIndex0 =index
                switch(index) {
                    case 0:
                    this.comIndex = 0
                    break;
                    case 1:
                    this.comIndex = 1
                    break;
                    default: 
                        return
                }
        },
      
        //多地址切换
       handleCommand(command){
            if(command===1){
              this.addressTitle = "多地址配送";
              this.addIndex = 1
            }else if(command===2){
              this.addressTitle = "收货地址";
              this.addIndex = 2
            }
          
      },
      
      //预览设计稿
      preview(row){
          this.previewImg = row.fileDesignDraftUrl;
          this.dialogVisible1 = true;
      },
      //预览
      handlePictureCardPreview() {
        this.previewImg1 = this.initData1.contractFile;
        this.dialogVisible2 = true;
      },
       //鼠标划入
      enterIn(){
        this.showIndex = 1;
      },
      //鼠标画出
      mouseOut(){
        this.showIndex = 0;
      },
      //删除
       handleRemove(file) {
         deleteImg(file.response.data.filePath).then(res=>{           
              
              
        })
       },
       //提交审批
       auditSave(){
                let obj = {};
                obj.auditStatus = this.form.auditStatus;
                obj.opinions = this.form.opinions;
                obj.id = this.contractId;
                auditSignContract(obj).then(res=>{
                    if(res.code===200){
                    throttleTipPop(this, "success","提交审批成功！", 2000);
                    this.approvalVisible = false;
                    this.$emit('signContract',this.approvalVisible)
                    }
                    
          
            })
       },
       Audit(){
         this.Type = 2;
         this.contractNo = this.initData1.contractNo;
         findContractPlan(this.contractId).then(res=>{
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

    } 
     
}
</script>

<style lang="scss" scoped>
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
    width: 86.75%;
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
    .mcard0 {
    border: 1px solid #d7e0f1;
    margin-top: 20px;
  }
     .imgBox{
      width: 148px;
      height: 148px;
      border-radius: 6px;
      float: left;
      margin-right: 10px;
      position: relative;
      margin-bottom: 20px;
      img{
        width: 100%;
        height: 100%;
        border-radius: 6px;
        
      }
      .blackBox{
        transition: all 0.6 0 ease-in !important;
        width: 148px;
        height: 148px;
        background: rgba(0,0,0,0.5);
        border-radius: 6px;
        text-align: center;
        position: absolute;
        top:0;
        display: none;
        i{
          font-size: 20px;
          color: #fff;
          line-height: 148px;
          cursor: pointer;
        }
      }
      .show{
        animation: show .3s;
        display: block;
      }
    }
    .inTips {
    position: relative;
    top: 152px;
    left: -157px;
    font-size: 11px;
    color: #909399;
}
   .auditBody2{
    position: relative;
    top:-1px;
  }
  .auditShow{
    top:-4px;
  }
</style>