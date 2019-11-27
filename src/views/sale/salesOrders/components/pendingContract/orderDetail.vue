<template>
  <div id="orderDetail">
      <el-dialog :visible.sync="detailVisible" width="70%" :before-close="createClosing">
    
        <div class="mail-fitter">
          <div class="goods-fitter" style="margin-bottom:20px">
            <el-form label-width="100px" size="small">
              <div class="search-wrapper">
                <h4 class="title">查看销售订单</h4>
              </div>
            </el-form>
          </div>
          <el-form ref="infoForm" :model="editDatas" :rules="rules" label-width="110px" size="small">
            <div class="mail-wrapper">
              <h4 class="title1">客户信息</h4>
              <div class="search-base">
                <el-row class="warp">
                  <div class="mbottom">
                    <div class="goods-fitter">
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="客户名称：" >
                            <el-input v-model="editDatas.customerName" placeholder="请填写客户名称" readonly>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="部 门：" >
                            <el-input v-model="editDatas.department" placeholder="请填写部门" readonly></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="联 系 人：" >
                            <el-input v-model="editDatas.customerContact" placeholder="请填写联系人" readonly></el-input>
                          </el-form-item>
                        </el-col>

                        <el-col :span="6">
                          <el-form-item label="销售单号：" >
                            <el-input v-model="editDatas.saleOrderNo" :disabled="true" placeholder="保存后自动生成" readonly></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="手机号码：">
                            <el-input v-model="editDatas.phone" placeholder="请填写手机号码" readonly></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="电话号码：">
                            <el-input v-model="editDatas.tel" placeholder="请填写电话号码" readonly></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="邮 箱：" >
                            <el-input v-model="editDatas.email" placeholder="请填写邮箱" readonly></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="销售代表：" >
                            <el-input v-model="form.salesRepresentatives" placeholder="请填写销售代表" readonly></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="平台名称：" >
                            <el-input v-model="editDatas.projectName" placeholder="请填写平台名称" readonly></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                           <el-form-item label="支付定金：" >
                             <el-input v-model="editDatas.depositAmount" placeholder="请填写支付定金" readonly></el-input>
                           </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="发票类型：" >
                            <el-select v-model="editDatas.invoiceType" placeholder="必填项" readonly>
                              <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
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
                <el-table
                    :data="editDatas.goodsDetailParam"
                    stripe
                    style="width: 100%"
                    border
                    ref="elTable"
                  >
               
                    <el-table-column type="index" label="编号" align="center" width="55" fixed="left"></el-table-column>
                    <el-table-column label="商品信息" align="center" width="250" fixed="left">
                      <template slot-scope="scope">
                           <div class="txt_left">商品名称：{{scope.row.goodsName}}</div>
                          <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                          <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                          <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                          <div class="txt_left">SKU：{{scope.row.goodsSkuId}}</div>
                      </template>
                    </el-table-column>
                   <el-table-column label="规格尺寸" align="center" width="150">
                      <template slot-scope="scope"> 
                            <div>{{scope.row.goodsSpecSize}}</div>                   
                      </template>
                    </el-table-column>
                    <el-table-column label="税率" align="center" width="70">
                          <template slot-scope="scope">
                              <el-input v-model="scope.row.taxRate" size="small"></el-input>
                          </template>
                    </el-table-column>
                    <el-table-column label="单位" align="center" >
                      <template slot-scope="scope"> 
                              {{scope.row.goodsUnit}}                
                      </template>
                    </el-table-column>
                    <el-table-column label="数量" align="center" width="100">
                      <template slot-scope="scope">    
                            <el-input  v-model="scope.row.goodsCount" size="small" readonly></el-input>              
                      </template>
                    </el-table-column>
                   <el-table-column label="不含税单价" align="center" width="100">
                          <template slot-scope="scope">    
                                <el-input  v-model="scope.row.notTaxPrice" size="small" readonly></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="税费" align="center" width="100">
                          <template slot-scope="scope">    
                               <el-input  v-model="scope.row.tax" size="small" readonly></el-input>       
                          </template>
                        </el-table-column>
                        <el-table-column label="含税单价" align="center" width="100">
                          <template slot-scope="scope">    
                            <el-input  v-model="scope.row.goodsPrice" size="small" readonly></el-input>              
                      </template>
                      </el-table-column>
                    <el-table-column label="合计" align="center" width="120">
                      <template slot-scope="scope"> 
                            <el-input v-model="scope.row.totalPrice" size="small" readonly></el-input>                      
                      </template>
                    </el-table-column>
                    <el-table-column label="制作要求" align="center" width="200">
                      <template slot-scope="scope"> 
                            <el-input v-model="scope.row.productionRequire" size="small" readonly
                             type="textarea"
                              :autosize="{ minRows: 1, maxRows: 3}"
                             resize=none></el-input>                  
                      </template>
                    </el-table-column>
                    <el-table-column label="运输方式" align="center" width="200">
                      <template slot-scope="scope"> 
                            <el-input v-model="scope.row.transportMode" size="small" readonly
                             type="textarea"
                              :autosize="{ minRows: 1, maxRows: 3}"
                             resize=none></el-input>                 
                      </template>
                    </el-table-column>
                    <el-table-column label="配送地址" align="center" width="200">
                      <template slot-scope="scope"> 
                            <el-input v-model="scope.row.deliveryAddress" size="small" readonly
                             type="textarea"
                              :autosize="{ minRows: 1, maxRows: 3}"
                             resize=none></el-input> 
                                       
                      </template>
                    </el-table-column>
                     <el-table-column label="交货日期" align="center" width="200">
                      <template slot-scope="scope"> 
                            <el-input v-model="scope.row.deliveryCycle" size="small" readonly></el-input>                          
                      </template>
                    </el-table-column>
                    <el-table-column label="设计稿" align="center" width="200">
                       <template slot-scope="scope">
                                <span v-show="!scope.row.fileDesignDraftUrl">暂无设计稿</span>
                                <span class="blue" v-show="scope.row.fileDesignDraftUrl" @click="preview(scope.row)">查看</span>                                  
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
              </div>
            </div>
          </el-form>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="createClose" size="small">关 闭</el-button>
        </span>
      </el-dialog>
       <!-- 上传预览 -->
       <el-dialog :visible.sync="dialogVisible" :modal="true" :append-to-body="false">
                                        <img width="100%" :src="previewImg" alt="">
                                        <span slot="footer" class="dialog-footer"></span>
        </el-dialog>
  </div>
</template>

<script>
import {
  getInquiry,
  getInGoods,
  addInquiry,
  deleteInquiry,
  closeInquiry,
  getInGood,
  findInquiry,
  saleInquirys,
  toSaleInquirys,
  toSaleUser,
  editInquiry
} from "@/api/sale/index";
import { deleteGoods, getErpGoods } from "@/api/product/index";
import { getAllcustomer } from "@/api/customer";
import { throttleTipPop } from "@/utils/functions.js";
export default {
  data() {
    return {
      previewImg:'',
      dialogVisible:false,
      detailVisible: false, //查看询价单
      innerVisible1: false, //编辑询价单新增商品弹窗
      customerVisible1: false, //编辑询价单客户选择弹窗
      brandVisible1: false, //编辑询价单新增商品品牌弹窗
       toInquiryId: "", //转交采销需要的ID
      toInquiryNo: "", //转交采销需要的单号
      orderNumber:'',//销售单号
      deposit:'',//定金
      saleName:"",
      form: {
        customerId: "",
        inquirySheet: "", //询价单号
        customerName: "", //客户名称
        salesRepresentatives: "", //销售代表
        contacts: "", //联系人
        department: "", //部门
        phoneNumber: "", //电话号码
        mail: "", //邮箱
        mobilePhone: "", //手机号码
        quotationPeriod: "", //报价期限
        invoiceType: "0", //发票类型
        platformName: "", //平台名称
        taxRate: 10, //税率
        deliveryDate: "", //交货日期
        address: "", //收货地址
        remark: "", //备注
        brand: "", //品牌
        differentiation: "", //客户区分
        keywords: "", //关键词
        tableData: [],
        arrs: [],
        goods: [],
        current_page: 1,
        page_size: 2,
        total_count: 0
      },
      formData: {
        current_page: 1,
        page_size: 2,
        total_count: 0
      },
      customerDatas: {
        pageNum: 1,
        pageSize: 10,
        total_count: 0,
        keywords: ""
      },
      options: [
        {
          value: 0,
          label: "不要发票"
        },
       
        {
          value: 1,
          label: "增值税专用发票"
        },
         {
          value: 2,
          label: "普通发票"
        },
      ],
      inquiryId: [],
      inquiryData: [],
      tableData: [],
      selectData: [],
      selectData1: [],
      goodsData: [],
      customerData: [],
      list: [], //客户列表
      editDatas: {},
      editDatas1: [],
      elTable: [],
       rules: {
        
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
    };
  },
  props: ["detailVisibles","orderDatas","salesRepresentatives"],
  created() {
      this.getName()
  },
  computed: {
    total1(){
      let totals = 0
      let _this = this
      if(_this.editDatas.goodsDetailParam&&_this.editDatas.goodsDetailParam.length>0){
          for(var i = 0;i<_this.editDatas.goodsDetailParam.length;i++){
            if(!isNaN(_this.editDatas.goodsDetailParam[i].totalPrice)){
              totals+=parseFloat(_this.editDatas.goodsDetailParam[i].totalPrice)
            }else{
              totals = 0
            }
      }       
      }
        return totals
    }
  },
  watch: {
    detailVisibles(val) {
      this.detailVisible = val;
    },
    orderDatas(val){
      this.editDatas  = val
      
    },


  },
  methods: {
     getName(){
        var books=localStorage.getItem("user");//得到字符串
        var obj=JSON.parse(books);
        console.log(obj);  
        this.form.salesRepresentatives=  obj.data.sysuserName;
        
    },
     createClose() {
      this.detailVisible = false;
      this.$emit("createCloseD", this.detailVisible);
    },
    createClosing() {
      this.detailVisible = false;
      this.$emit("createClosingD", this.detailVisible);
    },
    //预览设计稿
      preview(row){
          this.previewImg = row.fileDesignDraftUrl;
          this.dialogVisible = true;
      },
  
    
  }
};
</script>

<style lang="scss" scoped>
.el-input-group__append button.el-button {
  width:50px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
 /deep/ .el-dialog__headerbtn{
      top:10px;
    }

 
</style>