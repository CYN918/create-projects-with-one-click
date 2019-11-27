<template>
  <div class="createOrder">
      <el-dialog :visible.sync="addVisible" width="70%" :before-close="createClosing">
        

        <div class="mail-fitter">
          <div class="goods-fitter" style="margin-bottom:20px">
            <el-form label-width="100px" size="small">
              <div class="search-wrapper">
                <h4 class="title">生成订单</h4>
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
                          <el-form-item label="客户名称：" prop="customerName">
                            <el-input v-model="editDatas.customerName" placeholder="请填写客户名称" readonly>
                            <!--   <el-button slot="append" @click="chooseCustomer1()" size="mini">选择</el-button> -->
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="部 门：" prop="department">
                            <el-input v-model="editDatas.department" placeholder="请填写部门" readonly></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="联 系 人：" prop="customerContact">
                            <el-input v-model="editDatas.customerContact" placeholder="请填写联系人" readonly></el-input>
                          </el-form-item>
                        </el-col>

                        <el-col :span="6">
                          <el-form-item label="销售单号：" prop="inquiryNo">
                            <el-input v-model="orderNumber" :disabled="true" placeholder="保存后自动生成"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="手机号码：" prop="phone">
                            <el-input v-model="editDatas.phone" placeholder="请填写手机号码" readonly></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="电话号码：" prop="tel">
                            <el-input v-model="editDatas.tel" placeholder="请填写电话号码" readonly></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="邮 箱：" prop="email">
                            <el-input v-model="editDatas.email" placeholder="请填写邮箱" readonly></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="销售代表：" prop="saleUserName">
                            <el-input v-model="editDatas.inputUserName" placeholder="请填写销售代表" readonly></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="平台名称：" prop="projectName">
                            <el-input v-model="editDatas.projectName" placeholder="请填写平台名称" readonly></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                           <el-form-item label="支付定金：" prop="deposit">
                             <el-input v-model="depositAmount" placeholder="请填写支付定金"></el-input>
                           </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="发票类型：" prop="invoiceType">
                            <el-select v-model="editDatas.invoiceType" placeholder="必填项" :disabled="true">
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
                <el-form label-width="100px" size="small">
                 <!--  <el-row class="operate mbottom">
                    <el-col :span="7">
                      <el-button type="primary" size="small" @click="innerVisible1=true">选择商品</el-button>
                      <el-button type="primary" size="small" @click="deleteGoods1">删除商品</el-button>
                    </el-col>
                  </el-row> -->
                </el-form>
                <el-table
                  :data="editDatas.goodsDetailParam"
                  stripe
                  style="width: 100%"
                  border
                  ref="elTable"
                  class="goods_index"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column label="商品货号" align="center" width="200">
                    <template slot-scope="scope">
                      <div>{{scope.row.goodsSn}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="产品名称" align="center" width="200">
                    <template slot-scope="scope">
                      <div>{{scope.row.goodsName}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="品牌" align="center">
                    <template slot-scope="scope">
                      <div>{{scope.row.brandName}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="SKU " align="center" width='180'>
                    <template slot-scope="scope">
                      <div>{{scope.row.goodsSkuId}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="规格尺寸" align="center" width="150">
                    <template slot-scope="scope">
                      <div style="position:relative">
                        <!-- <el-button @click="down">向上</el-button> -->
                        <div style="overflow: auto;" :ref="'down'+scope.$index">
                          <div>{{scope.row.goodsSpecSize}}</div>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="单位" align="center">
                    <template slot-scope="scope">{{scope.row.goodsUnit}}</template>
                  </el-table-column>
                  <el-table-column label="数量" align="center">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.goodsCount" size="small"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="单价" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.goodsUnitPrice" size="small"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="合计" align="center" width="130">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.goodsTotalMoney" size="small" readonly></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="制作要求" align="center" width="200">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.productRequire" size="small"
                      type="textarea"
                              :autosize="{ minRows: 1, maxRows: 3}"
                             resize=none></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="运输方式" align="center" width="200">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.transportMode" size="small"
                      type="textarea"
                              :autosize="{ minRows: 1, maxRows: 3}"
                             resize=none></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="配送地址" align="center" width="200">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.distAddress" size="small"
                      type="textarea"
                              :autosize="{ minRows: 1, maxRows: 3}"
                             resize=none></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="交货日期" align="center" width="200">
                    <template slot-scope="scope">
                      <el-date-picker
                        style="width:100%;"
                        v-model="scope.row.deliveryCycle"
                        valueFormat="yyyy-MM-dd HH:mm"
                        type="date"
                        placeholder="选择日期"
                        size="small"
                        :picker-options="pickerOptions0"
                      ></el-date-picker>
                    </template>
                  </el-table-column>
                </el-table>
               <!--  <div class="pagination">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="tableData.currentPage"
                    :page-sizes="tableData.sizes"
                    :page-size="tableData.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.total"
                  ></el-pagination>
                </div> -->
              </div>
            </div>
          </el-form>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="createClose" size="small">关 闭</el-button>
          <el-button type="primary" @click="createOrders()" size="small">保存</el-button>
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
  editInquiry,
  createOrder
} from "@/api/sale/index";
import { deleteGoods, getErpGoods } from "@/api/product/index";
import { getAllcustomer } from "@/api/customer";
import { throttleTipPop } from "@/utils/functions.js";
export default {
  data() {
    return {
      pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        }, 
      offerVisible1: false, //单位选择弹窗
      addVisible: false, //编辑询价单
      innerVisible1: false, //编辑询价单新增商品弹窗
      customerVisible1: false, //编辑询价单客户选择弹窗
      brandVisible1: false, //编辑询价单新增商品品牌弹窗\
       toInquiryId: "", //转交采销需要的ID
      toInquiryNo: "", //转交采销需要的单号
      orderNumber:'',//销售单号
      deposit:'',//定金
      offerId:'',//报价单ID
      depositAmount:'',//定金
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
        saleOrder: "", //销售订单
        toSale: "", //移交给销售员
        inquirySheet: "", //询价单
        closingreason: "", //关闭原因
        tableData: [],
        arrs: [],
        goods: [],
        current_page: 1,
        page_size: 2,
        total_count: 0
      },
      offerData: {
        taxRate: "", //报价单税率
        dealDate: "", //交货日期
        remark: "", //客户备注
        offerDepartment: "", //报价单位
        offerContact: "", //报价联系人
        offerPhone: "", //报价联系电话
        offerEmail: "" //报价邮箱
      },
      formData: {
        current_page: 1,
        page_size: 2,
        total_count: 0,
        goodsName1:'',
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
      elTable: [],
      rules: {
       /*  customerContact: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ], */
        offerEndTime: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        phone: [{ required: true, message: "此项为必填项", trigger: "blur" }],
        customerName: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        projectName: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        department: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        offerDepartment: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        offerContact: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        offerPhone: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        dealDate: [{ required: true, message: "此项为必填项", trigger: "blur" }]
      }
    };
  },
  props: ["addVisibles", "editDatasB","createId"],
  created() {
    this._getGoods()
  },
  watch: {
    addVisibles(val) {
      this.addVisible = val;
    },
    editDatasB(val) {
      this.editDatas = val;
    },
    createId(val){
      this.offerId = val
    },
    "editDatas.goodsDetailParam":{
       handler(newVal, oldVal) {
        if(newVal){
          for(let i=0;i<newVal.length;i++){
            if(Number(newVal[i].goodsCount)>=0&&Number(newVal[i].goodsUnitPrice)>=0){
              newVal[i].goodsTotalMoney = Number(newVal[i].goodsCount)*Number(newVal[i].goodsUnitPrice)        
            } 
     
          }

        }
      },
      deep: true
      } 
  },
  methods: {
    //_编辑生成报价单
    _findInquiry() {},
     //搜索商品
    goodsSearch(){
      this._getGoods();
    },
    //获取ERP商品
    _getGoods() {
      getErpGoods(this.formData).then(res => {
        this.tableData = res.data.pageList;
        console.log(this.tableData);

        this.tableData.forEach(item => {
          item.top = 0;
        });
        this.formData.total_count = res.data.count;
      });
    },
    //获取所有客户信息
    _getAllcustomer() {
      getAllcustomer(this.customerDatas).then(res => {
        this.list = res.data.list;
        this.customerDatas.total_count = res.data.total;
        console.log(this.list);
      });
    },
    //搜索客户
    customerSearch() {
      this._getAllcustomer();
    },
    handleSelectionChange(val) {
      this.elTable = val;
      console.log(this.elTable);
    },
    //编辑询价单
    /*  editInquirys() {
      var arrss = [];
      for (let i = 0; i < this.editDatas.goodsDetailParam.length; i++) {
        let obj = {};
        obj.brandName = this.editDatas.goodsDetailParam[i].brandName;
        obj.budgetAmount = this.editDatas.goodsDetailParam[i].budgetAmount;
        obj.deliveryCycle = this.editDatas.goodsDetailParam[i].deliveryCycle;
        obj.distAddress = this.editDatas.goodsDetailParam[i].distAddress;
        obj.goodsColor = this.editDatas.goodsDetailParam[i].goodsColor;
        obj.goodsCount = this.editDatas.goodsDetailParam[i].goodsCount;
        obj.goodsId = this.editDatas.goodsDetailParam[i].goodsId;
        obj.goodsName = this.editDatas.goodsDetailParam[i].goodsName;
        obj.goodsSkuId = this.editDatas.goodsDetailParam[i].goodsSkuId;
        obj.goodsSn = this.editDatas.goodsDetailParam[i].goodsSn;
        obj.goodsSpecSize = this.editDatas.goodsDetailParam[i].goodsSpecSize;
        obj.goodsUnit = this.editDatas.goodsDetailParam[i].goodsUnit;
        obj.modelNumber = this.editDatas.goodsDetailParam[i].modelNumber;
        obj.productRequire = this.editDatas.goodsDetailParam[i].productRequire;
        obj.goodsImgUrl = this.editDatas.goodsDetailParam[i].goodsImgUrl;
        obj.transportMode = this.editDatas.goodsDetailParam[i].transportMode;
        obj.invoiceTaxRate = this.editDatas.goodsDetailParam[i].invoiceTaxRate;

        arrss.push(obj);
        this.editDatas["arrss"] = arrss;
      }
      console.log(this.editDatas);
    
    }, */
    createOrders(){
      let obj = {}
      obj.depositAmount =this.depositAmount;
      obj.offerId =this.offerId;
      createOrder(obj).then(res=>{
        if(res.code===200){
          throttleTipPop(this, "success", "生成销售订单成功", 2000);
          this.addVisible = false
          this.$emit('createOrder1',this.addVisible)

        }
        
      })
    },   
     //关闭页面
    createClose() {
      this.$confirm('您确认要关闭吗？')
                    .then(_ => {
                this.addVisible = false;
                this.$emit("close", this.addVisible);
            })
            .catch(_ => {});
    },
    createClosing() {
      
      this.$confirm('您确认要关闭吗？')
                    .then(_ => {
                this.addVisible = false;
                this.$emit("beClose", this.addVisible);
            })
            .catch(_ => {});
    },
     //双击添加商品
   addClick1(row) {
      this.index = row.index;
      row["goodsSpecSize"] = row.skuList[this.index].goodsSpecValues;
      row["goodsUnit"] = row.unitName;
      row["goodsSkuId"] = row.skuList[this.index].skuId;
      row["rows"] = row.skuList[this.index];
      //深度克隆
      var copy = JSON.parse(JSON.stringify(row));
      this.selectData1.push(copy);
      let arr = this.selectData1;
      arr.forEach(v => {
        v["goodsColor"] = "";
        v["goodsCount"] = "1";
        v["budgetAmount"] = "";
        v["productRequire"] = "";
        v["distAddress"] = "";
        v["transportMode"] = "";
        v["deliveryCycle"] = "";
      });
      var copy = JSON.parse(JSON.stringify(arr));
      this.selectData1 = copy;
      console.log(this.selectData1);
    },
    //双击删除商品
    deleteRow1(row) {
      for (var i = 0; i < this.selectData1.length; i++) {
        if (this.selectData1[i].rows.skuId == row.rows.skuId) {
          this.selectData1.splice(i, 1);
          console.log(i);
        }
      }
    },
    //选择规格
     Clicktent(val, data) {
      data.index = val;
      console.log(this.$refs.elTable);
      this.$set(this.$refs.elTable.data);
      this.$forceUpdate();
    },
    //双击添加客户
    addCustomer1(row) {
      var copy = JSON.parse(JSON.stringify(row));
      this.customerData.splice(0, 1, copy);
      console.log(this.customerData);
      this.editDatas.customerName =
        this.customerData[0] && this.customerData[0].customerName;
      this.editDatas.customerId =
        this.customerData[0] && this.customerData[0].customerId;
      this.editDatas.customerContact =
        this.customerData[0] && this.customerData[0].commonContactName;
      this.editDatas.phone =
        this.customerData[0] && this.customerData[0].commonContactPhone;
      this.editDatas.tel =
        this.customerData[0] && this.customerData[0].commonContactTel;
      this.editDatas.distAddress =
        this.customerData[0] && this.customerData[0].customerAddress;
      this.editDatas.department =
        this.customerData[0] && this.customerData[0].commonContactDept;
      this.editDatas.email =
        this.customerData[0] && this.customerData[0].commonContactEmail;
      this.customerVisible1 = false;
    },
    //保存商品
    saveGoods1() {
      let arr = this.editDatas.goodsDetailParam.concat(this.selectData1);

      this.innerVisible1 = false;
      this.selectData1 = [];

      var copy = JSON.parse(JSON.stringify(arr));

      this.editDatas.goodsDetailParam = copy;

      console.log(this.editDatas.goodsDetailParam);
    },
     //选择删除编辑中的商品
    deleteGoods1() {
      for (var i = 0; i < this.editDatas.goodsDetailParam.length; i++) {
        if (
          this.editDatas.goodsDetailParam[i].goodsSkuId ===
          (this.elTable[0] && this.elTable[0].goodsSkuId)
        ) {
          this.editDatas.goodsDetailParam.splice(i, 1);
        }
      }
    },
    chooseCustomer1() {
      this.customerVisible1 = true;
      this._getAllcustomer();
    },
     customerSearch1() {
      this._getAllcustomer();
    },
    addHandleSizeChange(val) {
      this.formData.page_size = val;
      this._getGoods();
    },
    addHandleCurrentChange(val) {
      this.formData.current_page = val;
      this._getGoods();
    },
    handleCurrentChange() {},
    handleSizeChange() {},
    customerhanHleSizeChange(val) {
      this.customerDatas.pageSize = val;
      this._getAllcustomer();
    },
    customerHandleCurrentChange(val) {
      this.customerDatas.pageNum = val;
      this._getAllcustomer();
    },
    handleSelectionChange(val) {
      this.elTable = val;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.createOrder {
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
  .mcard0 {
    border: 1px solid #d7e0f1;
    margin-top: 20px;
  }
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
     /deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 12px !important; // 横向滚动条
    height: 12px !important; // 纵向滚动条 必写
   
  }
  // 滚动条的滑块
  /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
     background: #ddd !important;
    border-radius: 5px !important;
  }
</style>