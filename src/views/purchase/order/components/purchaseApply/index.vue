<template>
  <div id="purchaseApply">
    <div class="margin0">
      
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form label-width="100px" size="small">
              <div class="search-wrapper">
                <h4 class="title">采购申请</h4>
                <div class="search-base">
                  <el-row>
                   <el-col :span="5" >
                        <el-form-item label="平台名称：">
                                <el-col :span="21">
                                    <el-input v-model="tableDatas.customerPlatform" placeholder="请输入平台名称"></el-input>
                                </el-col>
                            </el-form-item>
                    </el-col>
                    
                    <el-col :span="5" >
                        <el-form-item label="客户名称 ：">
                                <el-col :span="21">
                                    <el-input v-model="tableDatas.customerName" placeholder="请输入客户名称/联系人/电话"></el-input>
                                </el-col>
                            </el-form-item>
                    </el-col>
                    <el-col :span="5" >
                        <el-form-item label="销售单号：">
                                <el-col :span="21">
                                    <el-input v-model="tableDatas.saleOrderNo" placeholder="请输入销售单号"></el-input>
                                </el-col>
                            </el-form-item>
                    </el-col>
                    <el-col :span="5" >
                        <el-form-item label="供应商：">
                                <el-col :span="21">
                                    <el-input v-model="tableDatas.supplierKey" placeholder="请输入供应商/姓名/电话 "></el-input>
                                </el-col>
                            </el-form-item>
                    </el-col>
                    <el-col :span="2" >
                          <el-button type="primary" size="small" @click='searchOrder()' >查询</el-button>
 
                    </el-col>
                  </el-row>
                  <el-row>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="日期：">
                        <el-col :span="23">
                            <el-date-picker
                            type=daterange
                            valueFormat='yyyy-MM-dd HH:mm:ss'
                            v-model="tableDatas.signingDate"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
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
      
        <div class="mcard" style="border:1px solid #d7e0f1">
          <div class="mbottom">
   
          </div>
          
          <el-table :data="orderData" border 
          @selection-change="handleSelectionChange" 
          
          :row-class-name="tableRowClassName"
          :row-style="selectedHighlight"
          @row-dblclick="AhandleSelectionChange">
          
            <el-table-column label="序号" type="index" align="center"  width="50"></el-table-column>
            
            <el-table-column label="订单状态" prop="name" align="center"  width="200">
                      <template slot-scope="scope">
                        <div v-html="scope.row.purchaseStatusTip"></div>   
                      </template>
            </el-table-column>
            <el-table-column label="客户信息" prop="name" align="center"  width="250">
                      <template slot-scope="scope">
                        {{scope.row.customerName}}     
                      </template>
            </el-table-column>
            <el-table-column label="销售订单信息" prop="name" align="center"  width="300">
                      <template slot-scope="scope">
                        <div class="txt_left" >
                                销售单号：{{scope.row.saleOrderNo}}
                            </div>
                        <div class="txt_left">
                              经销商：{{scope.row.agentName}}
                            </div>
                        <div class="txt_left">
                            平台名称：{{scope.row.projectName}}
                            </div>
                        <div class="txt_left">
                          创建时间：{{scope.row.createTime}} 
                            </div>
                        <div class="txt_left">
                          销售员：{{scope.row.bizUserName}}
                            </div>
                      </template>
            </el-table-column>

            <el-table-column label="交货日期" prop="name" align="center">
                   <template slot-scope="scope">
                     <div>{{scope.row.deliveryDate | date}}</div>
                     <div>{{scope.row.deliveryDateTip}}</div>
                   </template>
            </el-table-column>
            <el-table-column label="订货单信息" prop="name" align="center">
                    <template slot-scope="scope">
                         <div>订货单号：{{scope.row.spoNo}}</div>
                          <div>订货单创建时间：{{scope.row.saleOrderCreateTime}}</div>
                    </template>
            </el-table-column>
            
          <!--   <el-table-column label="操作" align="center" fixed="right" width="150">
              <template slot-scope="scope">
                <div class="line-div">
              
                  <div
                    class="small-Idiv"
                    @click="generate(scope.row)"
             
                  >
                    <div class="i-div">
                      <img src="@/common/images/icon/状态栏.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;">生成合同</span>
                  </div>
                </div>
                
              </template>
            </el-table-column> -->
          </el-table>

          <div class="pagination">
            <el-pagination
              @size-change="getHandleSizeChange"
              @current-change="getHandleCurrentChange"
              :current-page="tableDatas.pageIndex"
              :page-sizes="[5,10,30,50]"
              :page-size="tableDatas.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableDatas.total"
            ></el-pagination>
          </div>
        </div>
         <div class="margin0" style="margin-top:20px">
        <div class="tabs-header">
          <ul class="clearfix">
            <li
              class="sale"
              @click="tabIndex(0)"
              :class="currentIndex===0 ? 'active' : ''"
              v-show="!this.showNo"
            >商品明细</li>
            <li
              class="sale"
              @click="tabIndex(0)"
              :class="currentIndex===0 ? 'active' : ''"
              v-show="this.showNo"
            >订货单【{{this.showNo}}】的商品明细</li>
          </ul>
        </div>
        <div class="tabs-content">
          <component :is="mainIndex" :count="count" :page="page" :spoId="spoId" :showNo="showNo"   @purchaseReload="purchaseReload1"></component>
        </div>
      </div>
      <!-- 新增合同 -->
     <!--  <AddContract 
      :contractVisibles="contractVisibles" 
      :orderPage="orderPage"
      :productList="productList"  
      @createClose1="createClose2"
        @createClosing1="createClosing2"
        @saveContract="saveContract1"></AddContract> -->
   </div>
  </div>
</template>

<script>
import { getCategory, getStoreList } from "@/api/public";
import { getErpGoods } from "@/api/product/index";
import { getAllcustomer } from "@/api/customer";
import {addOrder,getOrder, getOrderGoods,deleteOrders,findOrders,downPDF} from '@/api/sale/index'
import {getPurchaseApply,getApplyGoods} from "@/api/purchase/index"
import { throttleTipPop } from "@/utils/functions.js";
import AccountOrder from './oreder'
/* import AddContract from './addContract' */
export default {
  data() {
    return {
      dataArr: [],
      salesUser:'',
      mainIndex:'AccountOrder',
      currentIndex:0,
      contractVisibles: false, //生成合同弹窗
      brandVisible: false, //新增询价单新增商品品牌弹窗
      innerVisible: false, //新增询价单新增商品弹窗
      addVisible: false, //新增询价单弹窗
      customerVisible: false, //新增询价单客户选择弹窗
      editVisibles:false,//编辑销售订单
      deleteVisible:false, //删除销售订单
      detailVisibles:false,//查看询价单
      orderDatas:[],//根据ID获得的销售订单详细
      orderData:[],//销售订单分页数据
      page:[],//商品明细分页
      count:[],//商品明细总数
      getIndex:'',
      spoId:'',//商品明细ID
      closeNo: "",
      showNo:'',//显示商品详情列表需要编号
      deleteId:'',
      salesRepresentatives:'',
      /* total:'',//总合计 */
      customerData: [],
      productList:[],//产品清单
      orderPage:'',
     
      options: [
        {
          value: 0,
          label: "不要发票"
        },
        {
          value: 1,
          label: "普通发票"
        },
        {
          value: 2,
          label: "增值税专用发票"
        }
      ],
      options1:[
           {
          value: 0,
          label: "已收款"
        },
        {
          value: 1,
          label: "待收款"
        },
        {
          value: 2,
          label: "全部"
        }
      ],
      options2:[
           {
          value: 0,
          label: "已开票"
        },
        {
          value: 1,
          label: "待开票"
        },
        {
          value: 2,
          label: "不要发票"
        },
        {
          value: 3,
          label: "全部"
        }
      ],
      options3:[
           {
          value: 0,
          label: "已发货"
        },
        {
          value: 1,
          label: "未发货"
        },
        {
          value: 2,
          label: "全部"
        }
      ],
      formDatas: { //商品明细分页
        pageIndex: 1,
        pageSize: 10,
        total: 0,
      },
      formData: {
        current_page: 1,
        page_size: 2,
        total_count: 0,
        goodsName1:'',
      },
      selectData: [],
      goodsData: [],
      list: [], //客户列表
      elTable:[],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      tableDatas: {
        pageIndex: 1,
        sizes: [10, 20, 50, 100],
        pageSize: 10,
        total: 0,
        customerPlatform:'',//平台名称
        saleOrderNo:'',//销售单号
        customerName:'',//客户名称
         supplierKey:'',//供应商
        signingDate:'',//
        startTime:'',//
        endTime:'',//
      },
      rules: {
        partyA: [{ required: true, message: "此项为必填项", trigger: "blur" }],
        partyAAddress: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        partyAContacts: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        partyANumber: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        dateNum: [{ required: true, message: "此项为必填项", trigger: "blur" }],
        paymentAccount: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        accountName: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        openingBank: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        customerName: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        customerName: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        contacts: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        mobilePhone: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        projectName: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        customerName: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        invoiceType:[
           { required: true, message: "此项为必选项", trigger: "blur" }
        ]
      }
    };
  },
  created() {
   /*  this._getGoods(); */
    this.getName();
    this._getPurchaseApply();
  },
  computed: {
    total1(){
      let totals = 0
      let _this = this
      if(_this.goodsData.length>0){
          for(var i = 0;i<_this.goodsData.length;i++){
            if(_this.goodsData[i].total){
              totals+=parseFloat(_this.goodsData[i].total)
            }else{
              totals = 0
            }
      }
        
      }
        return totals
      
    }
  },
  watch:{
    
    //监听数组中值变化
    goodsData:{
      handler(newVal, oldVal) {
      if(newVal){
        for(let i=0;i<newVal.length;i++){
          if(Number(newVal[i].num)>=0&&Number(newVal[i].unitPrice)>=0){
            newVal[i].total = Number(newVal[i].num)*Number(newVal[i].unitPrice)        
          }   
        }
      }
    },
    deep: true
    },
     "tableDatas.signingDate": {
      handler(val, old) {
        if(val===null){
            this.tableDatas.startTime = '';
        this.tableDatas.endTime = '';
        }else{
            this.tableDatas.startTime = val[0];
        this.tableDatas.endTime = val[1];
        }
        

      },
      deep: true
    }
  },
  methods: {
    purchaseReload1(){
      this._getPurchaseApply();
      this.page = [];
        this.showNo = '';
        this.getIndex = '';
    },
     tabIndex (index) {
      this.currentIndex = index
      switch (index) {
        case 0:
          this.mainIndex = "AccountOrder";
          break;

        
        default: 
            return
      }
    },
    //搜索
    searchOrder(){
        this.tableDatas.pageIndex = 1;
        this._getPurchaseApply()
        this.resetData();
        
    },
    //重置数据
    resetData(){
        this.page = [];
        this.showNo = '';
        this.getIndex = '';
        this.count = 0;
    },
    //获取销售订单分页
    _getPurchaseApply(){
      getPurchaseApply(this.tableDatas).then(res=>{
            this.orderData = res.data.pageList           
            this.tableDatas.total = res.data.count
      })
    },
    //获取登录信息中的销售代表
    getName(){
        var books=localStorage.getItem("user");//得到字符串
        var obj=JSON.parse(books);
        console.log(obj);
        this.salesRepresentatives = obj.data.sysuserName;   
    },
    //子组件传来的值
    createClose2: function(data) {
      this.contractVisibles = data;
    },
    createClosing2: function(data) {
      this.contractVisibles = data;
    },
    saveContract1(data){
      this.contractVisibles = data;
    },
  

    goodsSearch(){
      this._getGoods();
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
    //获取商品
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
    
    selectedHighlight({ row, rowIndex }) {
      if (this.getIndex === rowIndex) {
        return {
          "background-color": "#e4ecfa"
        };
      }
    },

    tableRowClassName({ row, rowIndex }) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
    //双击选定
    AhandleSelectionChange(row) {
      this.getIndex = row.index;
      this.spoId= row.spoId;
      this.showNo = row.spoNo;
      
        let obj={}
        obj.pageSize = this.formDatas.pageSize;
        obj.pageIndex = this.formDatas.pageIndex;
        obj.spoId  = row.spoId
       getApplyGoods(obj).then(res => {
        this.count = res.data.count;
        this.page = res.data.pageList;
      });
    },
    //生成合同
   /*  generate(row) {
      
      this.orderPage = row
      getOrderGoods(row.saleOrderNo).then(res=>{
        console.log(res);
        
        this.productList = res.data.pageList
      })
      
      this.contractVisibles = true;
    }, */
   
    handleSizeChange() {},
    handleCurrentChange() {},
     getHandleSizeChange(val) {
       this.tableDatas.pageSize =val;
       this.resetData();
       this._getPurchaseApply()
     },
    getHandleCurrentChange(val) {
      this.tableDatas.pageIndex = val;
      this.resetData();
      this._getPurchaseApply()
    },
    handleChange() {},
    handleSelectionChange(){}
  },
  components: {
    AccountOrder,
/*     AddContract, */
 
  }
};
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
  #purchaseApply{
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
      .text-space {
        text-align: center;
        color: #606266;
        font-size: 12px;
      }
      .el-select-width {
        max-width: 130px;
        margin-right: 5px;
      }
      .el-input-width {
        display: inline-block;
        max-width: 180px;
      }
      .btn-toggle {
        margin-left: 10px;
        font-size: 14px;
        color: $themeColor;
        cursor: pointer;
      }
    }
    .goods-list-wrapper {
      margin-top: 20px;
    }
    .el-transfer-panel__header {
      background: $themeColor;
      color: #fff;
    }
    .item {
      line-height: 1.5;
      padding: 8px 10px;
      cursor: pointer;
      &:hover {
        color: $themeColor;
      }
      &.active {
        background: #c6e2ff;
        color: #fff;
      }
    }
    .image {
      cursor: pointer;
    }
    .item-name {
      cursor: pointer;
      &:hover {
        color: $themeColor;
      }
    }
    .el-icon-arrow-right {
      margin: 0 20px;
    }
    .store {
      width: 310px;
    }
    .red {
      color: $themeSubColor;
    }
    .transfer-wrapper {
      text-align: center;
    }
    .panel-wrapper {
      text-align: left;
      margin: 0;
      padding: 6px 0;
      list-style: none;
      height: 246px;
      overflow: auto;
      box-sizing: border-box;
    }
    .dialog-footer {
      margin-top: 20px;
      text-align: right;
    }
    //


    .i-div {
      cursor: pointer;
    }
    .margin1 {
      padding-left: 40px;
      padding-top: 20px;
      box-sizing: border-box;
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
      
      background: #fff;
    }
    .el-input-number.is-controls-right .el-input-number__decrease {
      background: #fff !important;
    }
    .el-input-number.is-controls-right .el-input-number__increase {
      background: #fff !important;
    }
    .imgitem{
      cursor: pointer;
    }
    .leftbottom {
        color: #4a99fa;
        border-bottom: 1px dashed rgba(215, 220, 231, 1);
        padding-bottom: 8px;
      }
      .mcard1 {
        border: 1px solid #d7e0f1;
        margin-top: 20px;
      }
    .tip{
    margin-top:-30px;
    text-align: center;
    line-height: 22px;
    .tipImg{
      position: relative;
      left: -16px;
      top:28px;
    }                     
  }
  /deep/ .el-dialog__headerbtn{
      top:10px;
    }
  }
</style>
