<template>
  <div id="Offer">
    <el-dialog :visible.sync="detailVisible" width="70%" :before-close="createClosing">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">查看报价</h4>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mail-fitter" style="margin-top:20px">
        <div class="mail-wrapper">
          <h4 class="title1">客户商品</h4>
          <div class="search-base">
            <div class="mbottom">
              <div class="goods-fitter">
                <div class="mcard" style="padding-bottom:0;">
                  <div class="goodsHeader">
                    <span class="serial">序号</span>
                    <span class="serial" style="padding:0 45px;">图样</span>
                    <span class="serial" style="padding:0 60px">商品名称</span>
                    <span class="serial" style="padding:0 53px">品牌</span>
                    <span class="serial" style="padding:0 53px">型号</span>
                    <span class="serial" style="padding:0 53px">货号</span>
                    <span class="serial" style="padding:0 42px;">规格尺寸</span>
                    <span class="serial" style="padding:0 53px">数量</span>
                    <span class="serial" style="padding:0 42px;border-right:1px solid #EBEEF5">制作要求</span>
                  </div>
                  <div class="goodsContent">
                    <div class="content" style="text-align:center;line-height:120px;">1</div>
                    <div class="content" style="width:119px;height:120px;padding:10px 0 0 10px;">
                      <img class="goodsImg" :src="goodsList.goodsImgUrl" alt />
                    </div>
                    <div
                      class="content"
                      style="line-height:120px;
                             width:177px;
                             padding:0 10px;"
                    >
                      <span
                        style="display: inline-block;vertical-align: middle;line-height: 20px;"
                      >{{goodsList.goodsName}}</span>
                    </div>
                    <div
                      class="content"
                      style="line-height:120px;
                            width:135px;
                             padding:0 10px;"
                    >
                      <span
                        style="display: inline-block;vertical-align: middle;line-height: 20px;"
                      >{{goodsList.brandName}}</span>
                    </div>
                    <div
                      class="content"
                      style="line-height:120px;
                            width:135px;
                            padding:0 10px;"
                    >
                      <span
                        style="display: inline-block;vertical-align: middle;line-height: 20px;"
                      >{{goodsList.modelNumber}}</span>
                    </div>
                    <div
                      class="content"
                      style="line-height:120px;
                             width:135px;
                             padding:0 10px;"
                    >
                      <span
                        style="display: inline-block;vertical-align: middle;line-height: 20px;"
                      >{{goodsList.goodsSn}}</span>
                    </div>

                    <div
                      class="content"
                      style="line-height:120px;
                             width:141px;
                             padding:0 10px;"
                    >
                      <span
                        style="display: inline-block;vertical-align: middle;line-height: 20px;"
                      >{{goodsList.specSize}}</span>
                    </div>
                    <div
                      class="content"
                      style="line-height:120px;
                          width:135px;
                          padding:0 10px;"
                    >
                      <span
                        style="display: inline-block;vertical-align: middle;line-height: 20px;"
                      >{{goodsList.goodsQuantity}}</span>
                    </div>
                    <div
                      class="content"
                      style="line-height:120px;
                            width:142px;
                            padding:0 10px;
                            border-right: 1px solid #ebeef5;"
                    >
                      <span
                        style="display: inline-block;vertical-align: middle;line-height: 20px;"
                      >{{goodsList.productRequire}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mail-fitter" style="margin-top:20px">
        <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px" size="small">
          <div class="mail-wrapper">
            <h4 class="title1">对应商品</h4>
           
            <div class="search-base">
              <div class="mbottom">
                <div class="goods-fitter">
                  <div class="mcard" style="padding-bottom:0">
                    <el-table :data="goodsList.quotes" border style="width: 100%" stripe >
                  <!--   @selection-change="AhandleSelectionChange"> -->
                      <!--  <el-table-column type="selection" align="center"></el-table-column> -->
                      <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                      <el-table-column
                        prop="commonContactName"
                        label="图样"
                        align="center"
                        width="120"
                      >
                        <template slot-scope="scope">
                          <img  :src="scope.row.goodsImgUrl" class="goodsImg" alt="" v-if="scope.row.goodsImgUrl"/>
                          <img  src="@/common/images/缺省页.jpg" class="goodsImg" alt="" v-if="!scope.row.goodsImgUrl"/>
                        </template>
                      </el-table-column>

                      <el-table-column
                        prop="commonContactName"
                        label="性质"
                        align="center"
                        width="80"
                      >
                        <template slot-scope="scope">
                            {{scope.row.companyType}}

                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="commonContactDept"
                        label="供应商名称"
                        align="center"
                        width="100"
                      >
                        <template slot-scope="scope">
                            {{scope.row.supplierName}}

                        </template>
                      </el-table-column>
                      <el-table-column prop="customerType" label="商品信息" align="center" width="180">
                        <template slot-scope="scope">
                          <div class="txt_left">商品名称：{{scope.row.goodsName}}</div>
                          <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                          <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                          <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                          <div class="txt_left">SKU：{{scope.row.skuId}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="commonContactDept"
                        label="规格尺寸"
                        align="center"
                        width="120"
                      >
                        <template slot-scope="scope">
                        {{scope.row.specSize}}
                        </template>
                      </el-table-column>
                    
                      <el-table-column
                        prop="commonContactDept"
                        label="税率"
                        align="center"
                        width="80"
                      >
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.taxRate" readonly></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="采购数量" align="center" width="80">
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.purchaseQuantity" readonly></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="运费" align="center" width="80">
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.carriagePrice" readonly></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="含税成本价" align="center" width="105">
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.taxCostPrice" readonly></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="不含税成本价" align="center" width="105">
                        <template slot-scope="scope">
                          <el-input size="small"  v-model="scope.row.notaxCostPrice" readonly></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="合计" align="center" width="80">
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.totalPrice" readonly></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="交货日期" align="center" width="160">
                        <template slot-scope="scope">
                              <el-date-picker
                              disabled
                              style="width:100%;"
                              v-model="scope.row.deliveryTime"
                              type="date"
                              size="small"
                              placeholder="选择日期"
                              valueFormat='yyyy-MM-dd HH:mm:ss'
                              :picker-options="pickerOptions0" >
                            </el-date-picker>
                        </template>
                      </el-table-column>
                      <el-table-column label="推荐供应商" align="center" width="100">
                        <template slot-scope="scope">
                          <el-select v-model="scope.row.recommendStatus" placeholder="请选择" size="small" readonly>
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            ></el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                      <el-table-column label="建议售价" align="center" width="80">
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.suggestedPrice" readonly></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="commonContactDept"
                        label="制作要求"
                        align="center"
                        width="150"
                      >
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.productRequire" readonly></el-input>
                        </template>
                      </el-table-column>
                    </el-table>

                <!--     <div class="pagination">
                      <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="tableDatas.currentPage"
                        :page-sizes="[10,20,50,100]"
                        :page-size="tableDatas.size"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="tableDatas.total"
                      ></el-pagination>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <div class="mail-fitter" style="margin-top:20px">
        <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px" size="small">
          <div class="mail-wrapper">
            <h4 class="title1">同类商品</h4>
           
            <div class="search-base">
              <div class="mbottom">
                <div class="goods-fitter">
                  <div class="mcard" style="padding-bottom:0">
                    <el-table :data="goodsList.similarQuotes" border style="width: 100%" stripe >
                  
                   <!--  @selection-change="BhandleSelectionChange" -->
                   <!--  <el-table-column type="selection" align="center"></el-table-column> -->
                      <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                      <el-table-column
                        prop="commonContactName"
                        label="图样"
                        align="center"
                        width="120"
                      >
                        <template slot-scope="scope">
                          <img  :src="scope.row.goodsImgUrl" class="goodsImg" alt="" v-if="scope.row.goodsImgUrl"/>
                          <img  src="@/common/images/缺省页.jpg" class="goodsImg" alt="" v-if="!scope.row.goodsImgUrl"/> 
                        </template>
                      </el-table-column>

                      <el-table-column
                        prop="commonContactName"
                        label="性质"
                        align="center"
                        width="80"
                      >
                        <template slot-scope="scope">
                            {{scope.row.companyType}}

                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="commonContactDept"
                        label="供应商名称"
                        align="center"
                        width="100"
                      >
                        <template slot-scope="scope">
                            {{scope.row.supplierName}}

                        </template>
                      </el-table-column>
                      <el-table-column prop="customerType" label="商品信息" align="center" width="180">
                        <template slot-scope="scope">
                          <div class="txt_left">商品名称：{{scope.row.goodsName}}</div>
                          <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                          <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                          <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                          <div class="txt_left">SKU：{{scope.row.skuId}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="commonContactDept"
                        label="规格尺寸"
                        align="center"
                        width="120"
                      >
                        <template slot-scope="scope">
                        {{scope.row.specSize}}
                        </template>
                      </el-table-column>
                     
                      <el-table-column
                        prop="commonContactDept"
                        label="税率"
                        align="center"
                        width="80"
                      >
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.taxRate" readonly></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="采购数量" align="center" width="80">
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.purchaseQuantity" readonly></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="运费" align="center" width="80">
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.carriagePrice" readonly></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="含税成本价" align="center" width="105">
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.taxCostPrice" readonly></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="不含税成本价" align="center" width="105">
                        <template slot-scope="scope">
                          <el-input size="small"  v-model="scope.row.notaxCostPrice" readonly></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="合计" align="center" width="80">
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.totalPrice" readonly></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="交货日期" align="center" width="120" >
                        <template slot-scope="scope">
                              <el-date-picker
                              disabled
                              v-model="scope.row.deliveryTime"
                              size="small"
                              type="date"
                              placeholder="选择日期"
                              valueFormat='yyyy-MM-dd HH:mm:ss' 
                              :picker-options="pickerOptions0">
                            </el-date-picker>
                        </template>
                      </el-table-column>
                      <el-table-column label="推荐供应商" align="center" width="100">
                        <template slot-scope="scope">
                          <el-select v-model="scope.row.recommendStatus" placeholder="请选择" size="small"
                          disabled>
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            ></el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                      <el-table-column label="建议售价" align="center" width="80">
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.suggestedPrice" readonly></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="commonContactDept"
                        label="制作要求"
                        align="center"
                        width="150"
                      >
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.productRequire" readonly> </el-input>
                        </template>
                      </el-table-column>
                    </el-table>

                   <!--  <div class="pagination">
                      <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="tableDatas.currentPage"
                        :page-sizes="[10,20,50,100]"
                        :page-size="tableDatas.size"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="tableDatas.total"
                      ></el-pagination>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="createClose" size="small">关 闭</el-button>
  
      </span>
    </el-dialog>

  
  
  </div>
</template>

<script>
import { throttleTipPop } from "@/utils/functions.js";
import { getErpGoods } from "@/api/product/index";
import {purchaseHistory,offerHistory,saveInquiry} from '@/api/purchase/index'

export default {
  data() {
    return {
       pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        }, 
      detailVisible: false,
      historyVisible: false, //推送报价历史
      saleVisible: false, //推送采销历史
      chooseVisible: false, //选择供应商
      chooseVisible1: false, //选择供应商1
      offerList:[],//历史报价
      purchaseList:[],//历史采购
      rowData:'',//获取列表数据
      deIndex:'',//删除对应商品的下表
      deIndex1:'',//删除同类商品的下标
      goodsList: "",
      historyTitle: "",
      form: {},
      value: "",
      tableDatas: [],
      tableData: [],//添加对应商品的列表
      tableData1: [],//添加同类商品的列表
      offerData: {},
      formData: {
        current_page: 1,
        page_size: 2,
        total_count: 0,
        goodsName1: "" //
      },
      formData1: {
        current_page: 1,
        page_size: 2,
        total_count: 0,
        goodsName1: "" //
      },
      historyData:{
          pageSize:2,
          pageIndex:1,
          count:0
      },
      historyData1:{
          pageSize:2,
          pageIndex:1,
          count:0
      },
      customerDatas: {
        pageNum: 1,
        pageSize: 10,
        total_count: 0,
        keywords: ""
      },
      goodsDatas: {
        current_page:0,
        page_size: 2,
        conut: 0,
      },
      options: [
        {
          value: 0,
          label: "无"
        },
        {
          value: 1,
          label: "有"
        }
      ],
      inquiryId: [],
      inquiryData: [],
      selectData: [],
      selectData1: [],
      goodsData: [],
      customerData: [],
      list: [], //客户列表
      editDatas: {},
      elTable: [],
      rules: {
        customerContact: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
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
  props: ["detailVisibles", "goodsPage"],
  created() {},
  watch: {
    detailVisibles(val) {
      this.detailVisible = val;
    },
    goodsPage(val) {
      this.goodsList = val;
    },
     
    //监听数组中值变化
    "goodsList.quotes":{
      handler(newVal, oldVal) {
      if(newVal){
        for(let i=0;i<newVal.length;i++){
          if(Number(newVal[i].purchaseQuantity)>=0&&Number(newVal[i].taxCostPrice)>=0){
            newVal[i].totalPrice = Number(newVal[i].purchaseQuantity)*Number(newVal[i].taxCostPrice)        
          }   
        }
      }
    },
    deep: true
    },
    "goodsList.similarQuotes":{
      handler(newVal, oldVal) {
      if(newVal){
        for(let i=0;i<newVal.length;i++){
          if(Number(newVal[i].purchaseQuantity)>=0&&Number(newVal[i].taxCostPrice)>=0){
            newVal[i].totalPrice = Number(newVal[i].purchaseQuantity)*Number(newVal[i].taxCostPrice)        
          }   
        }
      }
    },
    deep: true
    }
  },
  methods: {
    //关闭页面
    createClose() {
      this.$confirm('您确认要关闭吗？')
                    .then(_ => {
                this.detailVisible = false;
                this.$emit("createCloseC", this.detailVisible);
            })
            .catch(_ => {});
      
    },
    createClosing() {
      
      this.$confirm('您确认要关闭吗？')
                    .then(_ => {
                this.detailVisible = false;
                this.$emit("createClosingC", this.detailVisible);
            })
            .catch(_ => {});
    },
   
    //获取商品
    _getGoods() {
      getErpGoods(this.formData).then(res => {
        this.tableData = res.data.pageList;
  
        this.tableData.forEach(item => {
          item.top = 0;
        });
        this.formData.total_count = res.data.count;

      });
    },
   
    Clicktent(val, data) {
      data.index = val;
      console.log(this.$refs.elTable);
      this.$set(this.$refs.elTable.data);
      this.$forceUpdate();
    },
     //换页
    addHandleSizeChange(val) {
      this.formData.page_size = val;
      this._getGoods();
    },
    //换页
    addHandleCurrentChange(val) {
      this.formData.current_page = val;
      this._getGoods();
    },
     //换页
    addHandleSizeChange2(val) {
      this.formData1.page_size = val;
      getErpGoods(this.formData1).then(res => {
        this.tableData1 = res.data.pageList;
        this.formData1.total_count = res.data.count;

      });
    },
    //换页
    addHandleCurrentChange2(val) {
      this.formData1.current_page = val;
      getErpGoods(this.formData1).then(res => {
        this.tableData1 = res.data.pageList;
        this.formData1.total_count = res.data.count;

      });
    },
     OhandleCurrentChange(val) {
        this.historyData.pageIndex = val;
        this._offerHistory(); 
     },
    OhandleSizeChange(val) {
        this.historyData.pageSize = val;
        this._offerHistory(); 
    },
      PhandleCurrentChange(val) {
       this.historyData1.pageIndex = val;
        this._purchaseHistory(); 
     },
    PhandleSizeChange(val) {
         this.historyData1.pageSize = val;
        this._purchaseHistory(); 
    },
    handleSelectionChange() {},
    handleCurrentChange() {},
    handleSizeChange() {}
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
#Offer {
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
        margin-bottom: 10px;
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
  .downButton {
    margin-top: 10px;
  }
  .goodsImg {
    width: 100px;
    height: 100px;
  }
  .goodsHeader {
    .serial {
      padding: 0 10px;
      line-height: 48px;
      border: 1px solid #ebeef5;
      border-right: 0;
      background: #f7faff;
      display: inline-block;
      height: 48px;
    }
  }
  .goodsContent {
    overflow: hidden;

    .content {
      width: 49px;
      border-left: 1px solid #ebeef5;
      border-bottom: 1px solid #ebeef5;
      display: inline-block;
      float: left;
      height: 120px;
    }
  }
  .mcard1 {
    border: 1px solid #d7e0f1;
    margin-top: 20px;
  }
  .imgitem{
      cursor: pointer;
    }
    .leftbottom {
        color: #4a99fa;
        border-bottom: 1px dashed rgba(215, 220, 231, 1);
        padding-bottom: 8px;
      }
      /deep/ .el-dialog__headerbtn{
      top:10px;
    }
    .Img{
      width:100px;
      height:100px;
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
}
</style>