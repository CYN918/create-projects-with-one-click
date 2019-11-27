<template>
  <div id="toInvioce">
    <el-dialog width="73%" :visible.sync="addVisible" :before-close="createClosing">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">收票详情</h4>
            </div>
          </el-form>
        </div>
      </div>
     <div class="mbottom">
        <div class="goods-fitter">
          <el-form ref="infoForm" :model="form" :rules="rules" label-width="150px" size="small">
            <div class="search-wrapper">
              <div class="mbottom">
                <h4 class="title1">收票公司信息</h4>
              </div>
              <div class="search-base">
                <el-row>
                  <el-col :span="8">
                    <el-col>
                      <el-form-item label="采购单号：">
                        <el-col :span="19">
                          {{pageData.purchaseOrderNo}}
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="对应核销客户名称：">
                      <el-col :span="19">
                           {{pageData.customerName}}
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="销售单号：">
                      <el-col :span="19">
                           {{pageData.saleOrderNo}}
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="发票类型：" prop="invoiceType">
                        <el-col :span="19">
                          <el-select v-model="pageData.invoiceType" placeholder="请选择"
                          style="width:100%;">
                              <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="发票抬头：" prop="invoiceRise">
                     <el-col :span="19">
                        <el-select v-model="pageData.invoicePayable" placeholder="请选择"
                        style="width:100%;">
                          <el-option
                              v-for="item in options1"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  
                </el-row>
                <div class="tips">
                    我公司依法开具发票，如你购买的商品按税法规定属于不得从增值税销项税额中抵扣的项目
                    <br />（如集体福利或个人消费等），请选择普通发票
                  </div>

                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="单位名称：" prop="companyName">
                        <el-col :span="19">
                          <el-input v-model="pageData.targetName" placeholder="请输入单位名称" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="纳税人识别号：" prop="taxNum">
                      <el-col :span="19">
                        <el-input v-model="pageData.taxNumber" placeholder="或统一社会信用代码" readonly></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="开户银行：" prop="openBank">
                        <el-col :span="19">
                          <el-input v-model="pageData.bankOpeningName" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="银行账户：" prop="bankAccount">
                      <el-col :span="19">
                        <el-input v-model="pageData.bankAccount" readonly></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="注册电话：" prop="reTel">
                        <el-col :span="19">
                          <el-input v-model="pageData.tel" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="注册地址：" prop="reAddress">
                      <el-col :span="19">
                        <el-input v-model="pageData.address" readonly></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                 
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="发票编号：" prop="invoiceNumber">
                          <el-col :span="19">
                            <el-input
                              v-model="pageData.invoiceNo" readonly>
                            </el-input>
                          </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                   <el-col :span="12">
                    <el-col>
                      <el-form-item label="发票金额：" prop="invoiceNumber">
                          <el-col :span="19">
                            <el-input
                              v-model="pageData.invoiceAmount" readonly>
                            </el-input>
                          </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="收票日期：" prop="invoiceDate">
                        <el-col :span="19">
                            <el-date-picker
                              v-model="pageData.collectDate"
                              type="date"
                              placeholder="选择日期"
                              valueFormat='yyyy-MM-dd HH:mm:ss'
                              style="width:100%"
                              disabled>
                            </el-date-picker>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row>  
                    <el-col>
                      <el-form-item label="收票内容：" prop="invoiceContent">
                        <el-col :span="22">
                          <el-input v-model="pageData.invoiceContent" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                </el-row>
                  
                  <el-row>
                  <el-col :span="24">
                    <el-form-item label="发票凭证：" prop="invoiceVoucher">
                        <div class="imgBox" v-if="pageData.fileInvoiceUrl" @mouseenter="enterIn" @mouseleave="mouseOut">
                                    <img :src="pageData.fileInvoiceUrl" alt=""/>
                                    <div class="blackBox" :class="showIndex===1?'show':''">
                                      <i class="el-icon-zoom-in" @click="preview"></i>
                                    </div>
                        </div>
                        <span v-if="!pageData.fileInvoiceUrl">暂无发票凭证</span>


                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-col>
                      <el-form-item label="备注：" prop="remark">
                        <el-col :span="22">
                          <el-input
                            type="textarea"
                            :autosize="{ minRows: 5, maxRows: 5}"
                            placeholder="请输入内容"
                            v-model="pageData.remark" readonly>
                          </el-input>
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
      <div class="goods-fitter">
        <el-form ref="infoForm" :model="form" :rules="rules" label-width="120px" size="small">
          <div class="search-wrapper">
            <div class="mbottom">
              <h4 class="title1">发票详情</h4>
            </div>
            <div class="search-base">
              <div class="inner">
                <div class="invoice_title">
                  <i class="star">*</i>
                  <span>开票内容：</span>
                </div>
                <div class="btn" @click="btn1" :class="this.orderIndex===1?'active':''">
                  订单详细
                  <div class="delta" v-if="this.orderIndex===1">
                    <i class="el-icon-check"></i>
                  </div>
                </div>
                <div class="btn" @click="btn2" :class="this.orderIndex===2?'active':''">
                  开票明细
                  <div class="delta" v-if="this.orderIndex===2">
                    <i class="el-icon-check"></i>
                  </div>
                </div>
              </div>
               <div class="goods-fitter" v-if="this.orderIndex===1">
                <div class="mcard" style="padding-bottom:0">
                  <el-table :data="pageData.goodsDetailList1" border style="width: 100%" stripe>
                    <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                    <el-table-column
                      prop="name"
                      label="采购单号"
                      align="center"
                      width="120"
                    >
                      <template slot-scope="scope">
                          {{scope.row.purchaseOrderNo}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactName" label="商品名称" align="center" width="180">
                        <template slot-scope="scope">
                          {{scope.row.goodsName}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="规格型号" align="center">
                          <template slot-scope="scope">
                          {{scope.row.specSize}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="单位" align="center"  width="100">
                        <template slot-scope="scope">
                          {{scope.row.goodsUnit}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="数量" align="center"  width="100">
                      <template slot-scope="scope">
                          {{scope.row.goodsCount}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="不含税单价" align="center"  width="100">
                      <template slot-scope="scope">
                          {{scope.row.notTaxPrice}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="含税单价" align="center"  width="100">
                      <template slot-scope="scope">
                          {{scope.row.goodsPrice}}
                      </template>
                    </el-table-column>
                   <!--  <el-table-column prop="commonContactDept" label="不含税金额" align="center"  width="100">
                        <template slot-scope="scope">
                          无
                      </template>
                    </el-table-column> -->
                    <el-table-column prop="commonContactDept" label="税率" align="center" width="100">
                        <template slot-scope="scope">
                          {{scope.row.taxRate}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="税额" align="center"  width="100">
                        <template slot-scope="scope">
                          {{scope.row.tax}}
                      </template>
                    </el-table-column>
                    <el-table-column label="含税合计" align="center">
                      <template slot-scope="scope">
                          {{scope.row.totalPrice}}
                      </template>
                    </el-table-column>
                  <!--   <el-table-column label="操作" align="center" width="100">
                      <template slot-scope="scope">
                        <div class="txt_blue">
                          <span class="operate" @click="add1(scope.row,scope.$index)">添加</span>
                        </div>
                      </template>
                    </el-table-column> -->
                  </el-table>
                  <!-- <div class="total" style="margin-left:80%;margin-top:20px">
                    <el-form label-width="130px" size="small">
                      <el-form-item label="总合计：">
                        <el-col :span="24">
                             <el-input v-model="total1"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-form>
                  </div> -->
                </div>
              </div>
              <div class="goods-fitter" v-if="this.orderIndex===2">
                <div class="mcard" style="padding-bottom:0">
                  <el-table :data="pageData.goodsDetailList2" border style="width: 100%" stripe>
                    <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>

                    <el-table-column prop="commonContactName" label="商品名称" align="center" width="180">
                        <template slot-scope="scope">
                         <div> {{scope.row.goodsName}}</div>

                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="规格型号" align="center">
                          <template slot-scope="scope">
                          {{scope.row.specSize}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="单位" align="center"  width="100">
                        <template slot-scope="scope">
                          {{scope.row.goodsUnit}}
                      </template>
                    </el-table-column>
                    
                    <el-table-column prop="commonContactDept" label="数量" align="center" width="100">
                      <template slot-scope="scope">
                         <div> {{scope.row.goodsCount}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="不含税单价" align="center" width="100">
                      <template slot-scope="scope">
                          {{scope.row.notTaxPrice}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="含税单价" align="center" width="100">
                        <template slot-scope="scope">
                          {{scope.row.goodsPrice}}
                      </template>
                    </el-table-column>
                  <!--   <el-table-column prop="commonContactDept" label="不含税金额" align="center" width="100">
                        <template slot-scope="scope">
                          无
                      </template>
                    </el-table-column> -->
                    <el-table-column prop="commonContactDept" label="税率" align="center" width="100">
                        <template slot-scope="scope">
                          {{scope.row.taxRate}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="税额" align="center"  width="100">
                        <template slot-scope="scope">
                          {{scope.row.tax}}
                      </template>
                    </el-table-column>
                    <el-table-column label="含税合计" align="center">
                      <template slot-scope="scope">
                          {{scope.row.totalPrice}}
                      </template>
                    </el-table-column>
                    <!-- <el-table-column label="操作" align="center" width="130" >
                      <template slot-scope="scope">
                        <div class="txt_blue">
                          <span class="operate" @click="edit(scope.row,scope.$index)">编辑</span>
                          <span class="operate" @click="delete1(scope.row,scope.$index)">删除</span>
                        </div>
                      </template>
                    </el-table-column> -->
                  </el-table>
                  <div class="total" style="margin-left:80%;margin-top:20px">
                    <el-form label-width="130px" size="small">
                      <el-form-item label="开票合计：">
                        <el-col :span="24">
                             <el-input v-model="total1"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="createClose()" size="small">关 闭</el-button>
      </span>
    </el-dialog>
        <!-- 上传预览 -->
       <el-dialog :visible.sync="dialogVisible1" :modal="true" :append-to-body="false">
                                        <img width="100%" :src="previewImg" alt="">
                                        <span slot="footer" class="dialog-footer"></span>
        </el-dialog>
  </div>
</template>

<script>
import { getErpGoods } from "@/api/product/index";
import {saveInvoiceRecord,findInvoiceDetail} from '@/api/purchase/index';
import { throttleTipPop } from "@/utils/functions.js";
export default {
  data() {
    return {
      previewImg:'',
      dialogImageUrl: '',
      dialogVisible1:false,
      dialogVisible: false,
      addVisible: false,
      
      pageData:{},
      dataArr: [],
      orderIndex: 1,
      province:'',//省
      companyList:'',
      showIndex:"",
      tableDatas: {
        currentPage: 1,
        sizes: [10, 20, 50, 100],
        size: 10,
        total: 0
      },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
      form: {
        current_page: 0,
        page_size: 10,
        total_count: 0,
        invoiceType:'',//发票类型
        invoiceRise:'',//发票抬头
        companyName:'',//单位名称
        taxNum:'',//纳税识别号
        openBank:'',//开户行
        bankAccount:'',//银行账户
        reTel:'',//注册电话
        reAddress:'',//注册地址
        invoiceCompany:'',//开票公司
        supplierName:'',//供应商名称
        invoiceDate:'',//开票日期
        customerTaxNumber:'',//客户纳税识别号
        customerOpenBank:'',//客户开户行
        customerReTel:'',//客户注册电话
        invoiceStatus:'',//开票状态
        invoiceVoucher:'',//发票凭证
        invoiceNumber:'',//发票编号
        remark:'',//备注
        checkTaker:'',//收票人姓名
        checkTakerPhone:'',//收票人电话
        location:'',//所在地区
        detailedAddress:'',//详细地址
        purchaseOrderId:'',
        company:'',
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "张小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        }
      ],
        options: [{
          value: 1,
          label: '增值税专用发票'
        }, {
          value: 2,
          label: '普通发票'
        },],
         options1: [{
          value: '0',
          label: '个人'
        }, {
          value: '1',
          label: '单位'
        },],
        options2:[{
             value: 0,
          name: '未开票'
        }, {
          value: 1,
          name: '已开票'
       
        }],
      formData: {
        current_page: 1,
        page_size: 2,
        total_count: 0
      },
     rules: {
        invoiceType: [{ required: true, message: "此项为必选项", trigger: ["blur","change"] }],
        invoicePayable: [
          { required: true, message: "此项为必选项", trigger: ["blur","change"] }
        ],
        targetName: [
          { required: true, message: "此项为必选项", trigger: ["blur","change"] }
        ],
        vatBankName: [
          { required: true, message: "此项为必选项", trigger: ["blur","change"] }
        ],
       taxNumber: [{ required: true, message: "此项为必选项", trigger: ["blur","change"] }],
       vatBankAccount: [
          { required: true, message: "此项为必选项", trigger: ["blur","change"] }
        ],
       vatPhone: [
          { required: true, message: "此项为必选项", trigger: ["blur","change"] }
        ],
        vatAddress: [
          { required: true, message: "此项为必选项", trigger: ["blur","change"] }
        ],
        content: [
          { required: true, message: "此项为必选项", trigger: ["blur","change"] }
        ],
       userName: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        userPhone: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        provinceId: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        cityId: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        areaId: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        address: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ]
      }
    };
  },
  created() {},
   computed: {
      total1(){
      let totals = 0
      let _this = this
      if(_this.pageData.goodsDetailList2&&_this.pageData.goodsDetailList2.length>0){
          for(var i = 0;i<_this.pageData.goodsDetailList2.length;i++){
            if(!isNaN(_this.pageData.goodsDetailList2[i].totalPrice)){
              totals+=parseFloat(_this.pageData.goodsDetailList2[i].totalPrice)
              this.pageData.invoiceAmount  = totals
            }else{
              totals = 0
            }
      }
        
      }
        return totals
      
    }
  },
  props: ["addVisibles","firstLevel",'companyData','invoiceData1','orderId'],
  watch: {
    addVisibles(val) {
      this.addVisible = val;
    },
    firstLevel(val){
      this.province = val ;
    },
    companyData(val){
      this.companyList =val;
    },
    invoiceData1(val){
      this.pageData = val;
    },
   
    //监听数组中值变化
    'pageData.goodsDetailList2':{
      handler(newVal, oldVal) {
        for(let i=0;i<newVal.length;i++){
          if(parseFloat(newVal[i].goodsCount)>=0&&parseFloat(newVal[i].goodsPrice)>=0){
            newVal[i].totalPrice = parseFloat(newVal[i].goodsCount)*parseFloat(newVal[i].goodsPrice)     
          }   
        }
      },deep:true
    }
  },
  methods: {
    //关闭页面
    createClose() {
      this.addVisible = false;
      this.$emit("createClose1", this.addVisible);
    },
    createClosing() {
      this.addVisible = false;
      this.$emit("createClosing1", this.addVisible);
    },
    btn1() {
      this.orderIndex = 1;
    },
    btn2() {
      this.orderIndex = 2;
    },
   
      //鼠标划入
      enterIn(){
        this.showIndex = 1;
      },
      //鼠标画出
      mouseOut(){
        this.showIndex = 0;
      },
      //预览
      preview(){
        this.previewImg = this.pageData.fileInvoiceUrl;
        this.dialogVisible1 = true;
      },
    center1(row, index) {

    },
    address() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    handleChange() {},
   
    
  }
};
</script>

<style lang="scss" >
@import "@/common/scss/variable.scss";
#toInvioce {
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
  .tips {
    position: relative;
    left: 120px;
    top: -3px;
    margin-bottom: 10px;
    color: #999999;
  }
  .search-base {
    .inner {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .btn {
        border: 1px solid #d7e0f1;
        width: 94px;
        height: 32px;
        text-align: center;
        border-radius: 4px;
        line-height: 32px;
        cursor: pointer;
        margin-left: 10px;
        margin-right: 20px;
        position: relative;
        overflow: hidden;
        .delta {
          position: absolute;
          right: 0;
          top: 8px;
          width: 0;
          height: 0;
          border: 11px solid transparent;
          border-bottom-color: #4a99fa;
          border-right-color: #4a99fa;
          border-radius: 0 0 1px 0;
          .el-icon-check {
            position: absolute;
            top: -3px;
            left: -3px;
            color: #fff;
          }
        }
      }
      .active {
        border: 1px solid #4a99fa;
      }
      .invoice_title {
        width: 120px;
        text-align: right;
        box-sizing: border-box;
        padding-right: 12px;
        .star {
          margin-right: 5px;
          color: red;
        }
      }
    }
  }
  .txt_blue {
    color: #4a99fa;
    text-align: center;
    .operate {
      cursor: pointer;
    }
    .operate:nth-of-type(1) {
      margin-right: 24px;
      cursor: pointer;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 24px;
    color: #8c939d;
    padding: 20px 50px;
    width: 370px;
    height: 117px;
    line-height: 117px;
    text-align: center;
    font-style: normal;
  }
  .avatar {
    width: 370px;
    height: 117px;
    display: block;
  }
  .imgBox{
      width: 148px;
      height: 148px;
      border-radius: 6px;
      float: left;
      margin-right: 10px;
      position: relative;
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
  .el-input--small .el-input__inner {
    height: 32px !important;
    line-height: 32px !important;
  }
  .inner1{
      color:#999;
      display: flex;
      margin-bottom: 10px;
    .invoice_title1{
      margin-left:36px;
      margin-right:14px;
      
    }
    .invoice_content{
        line-height: 24px;
        margin-top: -4px;
    }
  }
  /deep/ .el-dialog__headerbtn{
      top:10px;
    }
}

@-webkit-keyframes show{
  0%{
    opacity: 0;
    background: rgba(0, 0, 0, 0);
  }
  100%{
    opacity: 1;
    background: rgba(0,0,0,0.5);
  }
}
</style>