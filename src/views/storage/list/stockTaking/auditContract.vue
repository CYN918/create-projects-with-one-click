<template>
    <div id="detailContract">
        <el-dialog width="72%" :visible.sync="submitVisible" :before-close="createClosing">  
       <div class="goods-fitter" style="margin-bottom:20px">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">盘点单详情</h4>
            </div>
          </el-form>
        </div>
        <div class="mail-fitter">
          <el-form ref="infoForm" :model="form" :rules="rules" label-width="110px" size="small">
            <div class="mail-wrapper">
              <div class="search-base">
                  <h4 class="title1">盘点明细</h4>
                <el-row class="warp">
                  <div class="mbottom">
                    <div class="goods-fitter">
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="盘点单号：" prop="customerName">
                            <el-input  placeholder="保存后自动生成" v-model="editDatas.billNo" readonly>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="盘点人员：" prop="department">
                            <el-input v-model="editDatas.bizUserId" placeholder="请填写盘点人员"></el-input>
                          </el-form-item>
                        </el-col>
                         <el-col :span="6">
                            <el-form-item label="盘点日期：">
                                <el-date-picker
                                  v-model="editDatas.bizTime"
                                  valueFormat='yyyy-MM-dd HH:mm:ss'
                                  type="date"
                                  disabled
                                  style="width:100%">
                                </el-date-picker>
                              </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="仓库：" prop="invoiceType">
                            <el-select v-model="editDatas.warehouseId" placeholder="必填项"
                            style="width:100%;">
                              <el-option                              
                                v-for="(item,index) in toList"
                                :key="index"
                                :label="item.name"
                                :value="item.warehouseId"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                     
                    </div>
                  </div>
                </el-row>
              </div>
            </div>
            <div class="mcard1">
              <div class="mcard">
             
                  <h4 class="title">商品清单</h4>
           
                <el-form label-width="100px" size="small">
                 
                  <el-table
                    class="elTable"
                    :data="editDatas.details"
                    stripe
                    style="width: 100%"
                    border
                    ref="elTable"
                   
                  >
                    <el-table-column type="selection" align="center"></el-table-column>
                    <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
                    <el-table-column label="图样" align="center" width="110">
                            <template slot-scope="scope">
                         
                                <img  :src="scope.row.goodsImgUrl" class="showImg" alt="" v-if="scope.row.goodsImgUrl"/>
                                <img  src="@/common/images/缺省页.jpg" class="showImg" alt="" v-if="!scope.row.goodsImgUrl"/>
                          </template>               
                    </el-table-column>
                    <el-table-column label="商品信息" align="center" width="230" >
                      <template slot-scope="scope">
                          <div class="txt_left">商品名称：{{scope.row.goodsName}}</div>
                          <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                          <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                          <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                          <div class="txt_left">SKU：{{scope.row.skuId}}</div>
                      </template>
                    </el-table-column>

                   <el-table-column label="规格尺寸" align="center" width="150">
                      <template slot-scope="scope"> 
                            <div>{{scope.row.specSize}}</div>                   
                      </template>
                    </el-table-column>
                    <el-table-column label="单位" align="center" >
                      <template slot-scope="scope"> 
                              {{scope.row.unit}}                
                      </template>
                    </el-table-column>
                     <el-table-column label="盘点前库存数量" align="center" >
                      <template slot-scope="scope">    
                            {{scope.row.beforeGoodsCount}}            
                      </template>
                    </el-table-column>
                    <el-table-column label="盘点后库存数量" align="center" >
                      <template slot-scope="scope">    
                            <el-input v-model.number="scope.row.goodsCount" size="small" readonly></el-input>           
                      </template>
                    </el-table-column>
                     <el-table-column label="单价" align="center">
                      <template slot-scope="scope">    
                            {{scope.row.goodsPrice}}             
                      </template>
                    </el-table-column>
                    <el-table-column label="差数" align="center" >
                      <template slot-scope="scope"> 
                              {{scope.row.diffCount}}                
                      </template>
                    </el-table-column>
                    <el-table-column label="差额" align="center" >
                      <template slot-scope="scope"> 
                              {{scope.row.diffPrice}}                
                      </template>
                    </el-table-column>
                    <el-table-column label="盘点后库存金额" align="center">
                      <template slot-scope="scope"> 
                            <el-input v-model.number="scope.row.goodsTotalPrice" size="small" readonly></el-input>          
                      </template>
                    </el-table-column>
                    <el-table-column label="盘点原因" align="center" width="200">
                      <template slot-scope="scope"> 
                            <el-input
                              resize="none"
                              type="textarea"
                              size="small"
                              :autosize="{ minRows: 1, maxRows: 5}"
                              placeholder="请输入内容"
                              v-model="scope.row.reason"
                              readonly>
                            </el-input>                  
                      </template>
                    </el-table-column>
                    
                    
                  </el-table>
                  <div class="total" style="margin-left:80%;margin-top:20px">
                    <el-form label-width="130px" size="small">
                        <el-form-item label="总合计：">
                          <el-col :span="24">
                            <el-input v-model="total1"></el-input>
                          </el-col>
                        </el-form-item>
                    
                  </el-form>
                  </div>
                </el-form>

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
                      <span style="width:148px;display:inline-block;text-align:center;">{{personList.pushStatus}}</span>
                    </div>
                    <span class="gray">提交人</span>
                    <span class="white" v-if="personList.userName">{{personList.userName}}</span>
                    <span class="white" v-if="!personList.userName">暂无</span>
                    <span class="gray">部门 </span>
                    <span class="white" v-if="personList.organizeName">{{personList.organizeName}}</span>
                    <span class="white" v-if="!personList.organizeName">暂无</span>
                    <span class="gray">职位 </span>
                    <span class="white" v-if="personList.position">{{personList.position}}</span>
                    <span class="white" v-if="!personList.position">暂无</span>
                </div>
                <div class="auditContent">
                    <span class="gray">推送说明</span>
                    <div class="content">
                          {{personList.comment}}
                    </div>
                </div>
             </div>
             <div class="auditBody2" :class="!personList.userName&&!personList.thisUserName?'auditShow':''">
                <div class="auditHeader" style="margin-top:0;">
                    <span class="gray">审批意见</span>
                    <div class="choose">
                      <el-radio v-model="form.auditStatus" label="1">同意</el-radio>
                      <el-radio v-model="form.auditStatus" label="2">不同意</el-radio>
                    </div>
                    <span class="gray">审批人</span>
                    <span class="white" v-if="personList.thisUserName">{{personList.thisUserName}}</span>
                    <span class="white" v-if="!personList.thisUserName">暂无</span>
                    <span class="gray">部门 </span>
                    <span class="white" v-if="personList.thisOrganizeName">{{personList.thisOrganizeName}}</span>
                    <span class="white" v-if="!personList.thisOrganizeName">暂无</span>
                    <span class="gray">职位 </span>
                    <span class="white" v-if="personList.thisPosition">{{personList.thisPosition}}</span>
                    <span class="white" v-if="!personList.thisPosition">暂无</span>
                </div>
                <div class="auditContent">
                    <span class="gray">意见说明</span>
                    <div class="content">
                       <textarea class="reasonArea" cols="145" rows="3"
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
        </el-dialog>
          <TimeLine
        :auditData="auditData"
        :goVisibles="goVisibles" 
        :billNo="billNo"  
          @createCloseG="createClose5"
            @createClosingG="createClosing5">
        </TimeLine> 
    </div>
</template>

<script>
import { getErpGoods } from "@/api/product/index";
import {SignContractAudit,findPurchaseAuditPlan} from "@/api/purchase/index"
import {InventoryTimeLine,inventoryApproval} from '@/api/storage/index'
import { throttleTipPop } from "@/utils/functions.js";
import TimeLine from "./timeLine"
export default {
  components:{
    TimeLine
  },
    data(){
        return{
            submitVisible:false,
             accountVisible: false, //选择收款账户
            partyVisible: false, //选择甲方弹窗
            addressVisible:false,//添加地址弹窗
            editDatas:'',
            fromList:[],
            toList:[],
            personList:[],
            auditData:[],
            billNo:'',//盘点单
            previewImg:'',//预览设计稿
            dialogVisible:false,
            goVisibles:false,//进度表
            personList:'',//审批人信息
            purchaseId:'',//采购订单ID
            userList:'',//当前用户信息
            billId:'',
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
                auditStatus:'',//审核状态
                opinions:'',//审批意见
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
    props:["submitVisibles","orderDatas","fromData","toData","personData","sendId"],
    watch: {
      submitVisibles(val) {
        this.submitVisible = val;
          },
          orderDatas(val){
          this.editDatas  = val
        },
        fromData(val){
          this.fromList = val;
        },
        toData(val){
          this.toList = val;
        },
        personData(val){
          this.personList = val;
        },
        sendId(val){
          this.billId = val;
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
      if(_this.editDatas.details&&_this.editDatas.details.length>0){
          for(var i = 0;i<_this.editDatas.details.length;i++){
            if(!isNaN(_this.editDatas.details[i].goodsTotalPrice)){
              totals+=parseFloat(_this.editDatas.details[i].goodsTotalPrice)
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
      obj.id = this.billId;
      inventoryApproval(obj).then(res=>{
        if(res.code===200){
          throttleTipPop(this, "success","提交审批成功！", 2000);
          this.submitVisible = false;
          this.$emit('signContract',this.submitVisible)
        }
        
      })
    },
     //进度表
      Audit(){
        this.billNo = this.editDatas.billNo;
        InventoryTimeLine(this.billId).then(res=>{
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
    .mcard0 {
    border: 1px solid #d7e0f1;
    margin-top: 20px;
  }
  .auditBody2{
    position: relative;
    top:-1px;
  }
  .auditShow{
    top:-4px;
  }
  .showImg{
    width:95px;
    height: 95px;
  }
 }
</style>