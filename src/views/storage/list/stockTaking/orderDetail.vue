<template>
  <div id="orderDetail">
      <el-dialog :visible.sync="detailVisible" width="70%" :before-close="createClosing">
    
  
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
                <div class="search-wrapper">
                  <h4 class="title">商品清单</h4>
                </div>
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
                    <el-table-column label="盘点后库存金额" align="center" width="120">
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

        
        <span slot="footer">
          <el-button type="danger" @click="createClose()" size="small">关 闭</el-button>
        </span>
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
      detailVisible: false, //查看询价单
      innerVisible1: false, //编辑询价单新增商品弹窗
      customerVisible1: false, //编辑询价单客户选择弹窗
      brandVisible1: false, //编辑询价单新增商品品牌弹窗
       toInquiryId: "", //转交采销需要的ID
      toInquiryNo: "", //转交采销需要的单号
      orderNumber:'',//销售单号
      deposit:'',//定金
      toList:[],
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
          value: 2,
          label: "普通发票"
        },
        {
          value: 1,
          label: "增值税专用发票"
        }
      ],
         options1:[
           {
          value: 0,
          label: "李小小"
        },
        {
          value: 1,
          label: "李大大"
        },
        {
          value: 2,
          label: "深圳"
        }
      ],
      options2:[
           {
          value: 0,
          label: "李小小"
        },
        {
          value: 1,
          label: "李大大"
        },
        {
          value: 2,
          label: "深圳"
        }
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
  props: ["detailVisibles","orderDatas","fromData","toData"],
  created() {
      this.getName()
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
  
  watch: {
    detailVisibles(val) {
      this.detailVisible = val;
    },
    orderDatas(val){
      this.editDatas  = val
    },
    fromData(val){
      this.fromList = val;
    },
    toData(val){
      this.toList = val;
    }
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

  
    
  }
};
</script>

<style lang="scss" scoped>
 .showImg{
    width:95px;
    height: 95px;
  }
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