<template>
    <div class="orderDetail">
        <el-dialog :visible.sync="detailVisible" width="70%" :before-close="createClosing">
          <div class="mail-fitter" style="margin-bottom:20px;">
            <div class="goods-fitter"  style="margin-bottom:20px">
              <el-form label-width="100px" size="small">
                <div class="search-wrapper">
                  <h4 class="title">查看销售订单</h4>
                </div>
              </el-form>
            </div>
            <el-form ref="infoForm" :model="editDatas" :rules="rules" label-width="110px" size="small">
              <div class="mail-wrapper"  style="margin-bottom:20px">
                <h4 class="title1">客户信息</h4>
                <div class="search-base">
                  <el-row class="warp">
                    <div class="mbottom">
                      <div class="goods-fitter">
                        <el-row>
                          <el-col :span="7">
                            <el-form-item label="客户名称：" >
                              <el-input v-model="detailData1.customerName" placeholder="请填写客户名称" readonly></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="7" :offset="1">
                            <el-form-item label="联 系 人：" prop="customerContact">
                              <el-input v-model="detailData1.customerContact" placeholder="请填写联系人" readonly></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="7" :offset="1">
                            <el-form-item label="销售代表：" prop="saleUserName">
                              <el-input v-model="detailData1.inputUserName" placeholder="请填写销售代表" readonly></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                        <el-col :span="7">
                            <el-form-item label="部 门：" prop="department">
                              <el-input v-model="detailData1.department" placeholder="请填写部门" readonly></el-input>
                            </el-form-item>
                          </el-col>  
                          <el-col :span="7" :offset="1">
                            <el-form-item label="手机号码：" prop="phone">
                              <el-input v-model="detailData1.phone" placeholder="请填写手机号码" readonly></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="7" :offset="1">
                            <el-form-item label="电话号码：" prop="tel">
                              <el-input v-model="detailData1.tel" placeholder="请填写电话号码" readonly></el-input>
                            </el-form-item>
                          </el-col>
                          
                        </el-row>
                            <el-col :span="7">
                            <el-form-item label="邮 箱：" prop="email">
                              <el-input v-model="detailData1.email" placeholder="请填写邮箱" readonly></el-input>
                            </el-form-item>
                          </el-col>
                        <el-col :span="7" :offset="1">
                            <el-form-item label="发票类型：" prop="invoiceType">
                              <el-input v-model="detailData1.invoiceType" placeholder="必填项" readonly>
                              
                              </el-input>
                            </el-form-item>
                        </el-col>

                      </div>
                    </div>
                  </el-row>
                </div>
              </div>
              <div class="mail-wrapper">
                <h4 class="title1">订单信息</h4>
                <div class="search-base">
                  <el-row class="warp">
                    <div class="mbottom">
                      <div class="goods-fitter">
                        <el-row>
                          <el-col :span="7">
                            <el-form-item label="销售单号：" prop="customerName">
                                    {{detailData1.saleOrderNo}}
                            </el-form-item>
                          </el-col>
                          <el-col :span="7" :offset="1">
                            <el-form-item label="合同编号：" prop="department">
                                   {{detailData1.contractNo}}
                                      
                            </el-form-item>
                          </el-col>
                          <el-col :span="7" :offset="1">
                            <el-form-item label="出库单号：" prop="customerContact">
                                   无
                            </el-form-item>
                          </el-col>

                        </el-row>
                        <el-row>
                          <el-col :span="7">
                            <el-form-item label="订单状态：" prop="phone">
                               <div v-html="detailData1.billStatus"></div>
                            </el-form-item>
                          </el-col>
                          <el-col :span="7" :offset="1">
                            <el-form-item label="订单金额：" prop="tel">
                              <el-input v-model="detailData1.orderTotalAmount" readonly></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="7" :offset="1">
                            <el-form-item label="下单时间：" prop="email">
                                <el-date-picker
                                    v-model="detailData1.createTime"
                                    type="date"
                                    placeholder="选择日期"
                                    style="width:100%"
                                    valueFormat='yyyy-MM-dd HH:mm:ss'>
                                    </el-date-picker>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="7">
                            <el-form-item label="收款状态：" prop="platformName">
                              <div v-html="detailData1.payStatus"></div>
                            </el-form-item>
                          </el-col>
                          <el-col :span="7" :offset="1">
                            <el-form-item label="财 务：" prop="deposit">
                              <el-input  v-model="detailData1.financeUserName" readonly></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="7" :offset="1">
                            <el-form-item label="收款账号：" prop="invoiceType">
                              <el-input  v-model="detailData1.payAcountNo" readonly></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="7">
                            <el-form-item label="出货状态：" prop="platformName">
                              <div v-html="detailData1.deliveryStatus"></div>
                            </el-form-item>
                          </el-col>
                          <el-col :span="7" :offset="1">
                            <el-form-item label="出货单号：" prop="deposit">
                              <el-input  v-model="detailData1.invoiceBillNo" readonly> </el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="7" :offset="1">
                            <el-form-item label="送货员：" prop="invoiceType">
                              <el-input  v-model="detailData1.deliveryName" readonly></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="7">
                            <el-form-item label="物流公司：" prop="platformName">
                              <el-input  v-model="detailData1.logisticsName" readonly></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="15" :offset="1">
                            <el-form-item label="物流单号：" prop="deposit">
                              <el-input  v-model="detailData1.logisticsNo" readonly></el-input>
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
                    :data="detailData1.goodsDetailParam"
                    stripe
                    style="width: 100%"
                    border
                    ref="elTable"
                    class="goods_index"
                  >
                    <el-table-column type="index" label="序号" align="center" width="55" fixed='left'></el-table-column>
                    <el-table-column label="商品信息" align="center" width="250" fixed='left'> 
                      <template slot-scope="scope">
                        <div class="txt_left">商品名称：{{scope.row.goodsName}}</div>
                        <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                        <div class="txt_left">型号：无</div>
                        <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                        <div class="txt_left">SKU：无</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="规格尺寸" align="center" width="150">
                      <template slot-scope="scope">
                        <div>{{scope.row.goodsSpecSize}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="税率" align="center" width="70">
                      <template slot-scope="scope">
                       {{scope.row.taxRate}}
                      </template>
                    </el-table-column>
                    <el-table-column label="单位" align="center">
                      <template slot-scope="scope">{{scope.row.goodsUnit}}</template>
                    </el-table-column>
                    <el-table-column label="数量" align="center" width="100">
                      <template slot-scope="scope">
                        {{scope.row.goodsCount}}
                      </template>
                    </el-table-column>
                    <el-table-column label="不含税单价" align="center" >
                                      <template slot-scope="scope">    
                                             {{scope.row.notTaxPrice}}     
                                      </template>
                   </el-table-column>
                    <el-table-column label="税费" align="center">
                                      <template slot-scope="scope">    
                                            {{scope.row.tax}}              
                                      </template>
                   </el-table-column>
                    <el-table-column label="含税单价" align="center">
                                      <template slot-scope="scope">
                                              {{scope.row.goodsPrice}}
                                      </template>
                                </el-table-column>
                    <el-table-column label="合计" align="center" width="100">
                      <template slot-scope="scope">
                          {{scope.row.totalPrice}}
                      </template>
                    </el-table-column>
                    <el-table-column label="制作要求" align="center" width="200">
                      <template slot-scope="scope">
                          {{scope.row.productionRequire}}
                      </template>
                    </el-table-column>
                    <el-table-column label="运输方式" align="center" width="200">
                      <template slot-scope="scope">
                              {{scope.row.transportMode}}
                      </template>
                    </el-table-column>
                    <el-table-column label="收货地址" align="center" width="200">
                      <template slot-scope="scope">
                        
                            {{scope.row.deliveryAddress}}
                      </template>
                    </el-table-column>
                    <el-table-column label="交货日期" align="center" width="200">
                      <template slot-scope="scope">
                        {{scope.row.deliveryCycle}}
                      </template>
                    </el-table-column>
                    <el-table-column label="设计稿" align="center" width="100">
                              <template slot-scope="scope">
                                    <span class="blue" @click="preview(scope.row)" v-show="scope.row.fileDesignDraftUrl">查看</span>
                                    <span  v-show="!scope.row.fileDesignDraftUrl">暂无设计稿</span>
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
      detailData1:{},//数据
      detailVisible: false, //查看询价单
      innerVisible1: false, //编辑询价单新增商品弹窗
      customerVisible1: false, //编辑询价单客户选择弹窗
      brandVisible1: false, //编辑询价单新增商品品牌弹窗
      toInquiryId: "", //转交采销需要的ID
      toInquiryNo: "", //转交采销需要的单号
      orderNumber: "", //销售单号
      deposit: "", //定金
      saleName: "",
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
          { required: true, message: "此项为必选项", trigger:["blur","change"] }
        ],
        contacts: [
          { required: true, message: "此项为必选项", trigger:["blur","change"] }
        ],
        mobilePhone: [
          { required: true, message: "此项为必选项", trigger:["blur","change"] }
        ],
        projectName: [
          { required: true, message: "此项为必选项", trigger:["blur","change"] }
        ],
        customerName: [
          { required: true, message: "此项为必选项", trigger:["blur","change"] }
        ]
      }
    };
  },
  props: ["detailVisibles","detailData"],
  created() {
    this.getName();
  },
  computed: {
    total1() {
      let totals = 0;
      let _this = this;
      if (
        _this.detailData1.goodsDetailParam &&
        _this.detailData1.goodsDetailParam.length > 0
      ) {
        for (var i = 0; i < _this.detailData1.goodsDetailParam.length; i++) {
          if (!isNaN(_this.detailData1.goodsDetailParam[i].totalPrice)) {
            totals += parseFloat(_this.detailData1.goodsDetailParam[i].totalPrice);
          } else {
            totals = 0;
          }
        }
      }
      return totals;
    }
  },
  watch: {
    detailVisibles(val) {
      this.detailVisible = val;
    },
    detailData(val){
      this.detailData1 = val;
    }
  },
  methods: {
    //预览
     preview(row){
      if(this.previewImg!==''||this.previewImg!==null){
          this.previewImg = row.fileDesignDraftUrl;
          this.dialogVisible = true;
      }   
    },
    getName() {
      var books = localStorage.getItem("user"); //得到字符串
      var obj = JSON.parse(books);
      console.log(obj);
      this.form.salesRepresentatives = obj.data.sysuserName;
    },
    createClose() {
      this.detailVisible = false;
      this.$emit("createCloseD", this.detailVisible);
    },
    createClosing() {
      this.detailVisible = false;
      this.$emit("createClosingD", this.detailVisible);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
  
    .imgBox {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
      .showImg {
        width: 50px;
        height: 50px;
      }
    }
    .tips {
      font-size: 12px;
      color: #909399;
      line-height: 20px;
      margin-top: 10px;
    }
    .mcard1 {
      border: 1px solid #d7e0f1;
      margin-top: 20px;
    }

    .el-input-group__append button.el-button {
      width: 50px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
    }
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
      /deep/ .el-dialog__headerbtn{
          top:10px;
        }
        /deep/ .el-table__body-wrapper::-webkit-scrollbar {
        width: 12px !important; // 横向滚动条
        height: 12px !important; // 纵向滚动条 必写
      
      }
      // 滚动条的滑块
      /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
        background: #ddd !important;
        border-radius: 5px !important;
      }
       .blue{
        cursor: pointer;
        color: #4A99FA;
      }
</style>