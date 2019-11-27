<template>
  <div class="margin0">
     <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">付款申请</h4>
            <div class="search-base">
              <el-row>
               <el-col :span="5">
                   <el-form-item label="平台名称：">
                     <el-col :span="21">
                            <el-input v-model="tableDatas.projectName" placeholder="请输入平台名称"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="客户名称：">
                            <el-col :span="21">
                              <el-input v-model="tableDatas.customerName" placeholder="请输入客户名称/姓名/电话"></el-input>
                            </el-col>
                        </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="供应商：">
                            <el-col :span="21">
                                <el-input placeholder="请输入供应商/姓名/电话" v-model="tableDatas.supplierInfo"></el-input>
                            </el-col>
                        </el-form-item>
                </el-col>
                <el-col :span="5">
                   <el-col :span="22">
                    <el-form-item label="单号：">
                          <el-input placeholder="请输入销售/采购单号" v-model="tableDatas.orderNo"></el-input>
                    </el-form-item>
                   </el-col>
                 </el-col>

                <el-col :span="2" >
                          <el-button type="primary" size="small" @click='inSearch()' >查询</el-button>
 
                    </el-col>
               
              </el-row>
               <el-row>
                 
    
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="交货日期：">
                        <el-col :span="23">
                            <el-date-picker
                            type=daterange
                            valueFormat='yyyy-MM-dd HH:mm:ss'
                            v-model="tableDatas.deliveryDate"
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
      <div class="titleButton" style="margin-bottom:10px;">
        <el-button type="primary" size="small" @click="batchApply">批量付款申请</el-button>
      </div>
      <el-table :data="orderData" border 
          @selection-change="handleSelectionChange" 
          
          :row-class-name="tableRowClassName"
          :row-style="selectedHighlight"
          @row-dblclick="AhandleSelectionChange">
            <el-table-column type="selection" width="40"></el-table-column> 
         <el-table-column label="序号" type="index" align="center"  width="50"></el-table-column>
         
            <el-table-column label="状态" prop="name" align="center" >
                      <template slot-scope="scope">
                            <div v-html="scope.row.statusTip"></div>
                      </template>
            </el-table-column>
            <el-table-column label="采购订单信息" prop="name" align="center" width="210">
                    <template slot-scope="scope">
                          <div class="txt_left">采购单号：{{scope.row.purchaseOrderNo}}</div>
                          <div class="txt_left">采购交货日期：{{scope.row.distributionTime | date}}</div>
                          <div class="txt_left">创建时间：{{scope.row.purchaseCreateTime}}</div>
                          <div class="txt_left">采销员：{{scope.row.purchaseUserName}}</div>
                          <div class="txt_left">签约公司：{{scope.row.company}}</div>
                    </template>
        </el-table-column>
        <el-table-column label="销售订单信息" prop="name" align="center" width="210">
                    <template slot-scope="scope">
                          <div class="txt_left">销售单号：{{scope.row.saleOrderNo}}</div>
                          <div class="txt_left">客户名称：{{scope.row.customerName}}</div>
                          <div class="txt_left">经销商：{{scope.row.agencyName}}</div>
                          <div class="txt_left">平台名称：{{scope.row.projectName}}</div>
                           <div class="txt_left">销售员：{{scope.row.bizUserName}}</div>
                    </template>
        </el-table-column> 
            <el-table-column label="供应商信息" prop="name" align="center"  width="210">
                      <template slot-scope="scope">
                        <div class="txt_left" >
                                供应商名称：{{scope.row.supplierName}}
                            </div>
                        <div class="txt_left">
                              联系人：{{scope.row.supplierContact}}
                            </div>
                        <div class="txt_left">
                            联系电话：{{scope.row.supplierTel}}
                            </div>
                        <div class="txt_left">
                          手机号码： {{scope.row.supplierPhone}}
                            </div>
                        <div class="txt_left">
                          邮箱：{{scope.row.supplierEmail}}
                            </div>
                      </template>
            </el-table-column>
            <el-table-column label="订单总金额" prop="name" align="center">
                   <template slot-scope="scope">
                    {{scope.row.factFee}}
                   </template>
            </el-table-column>
            <el-table-column label="累计已付款金额" prop="name" align="center">
                   <template slot-scope="scope">
                       {{scope.row.receivedAmount}}
                   </template>
            </el-table-column>
            <!-- <el-table-column label="本次申请付款金额" prop="name" align="center">
                   <template slot-scope="scope">
                       {{scope.row.orderTotalAmount}}
                   </template>
            </el-table-column>
            <el-table-column label="本次申请付款总金额" prop="name" align="center">
                   <template slot-scope="scope">
                       {{scope.row.orderTotalAmount}}
                   </template>
            </el-table-column> -->
            <el-table-column label="剩余未付款金额" prop="name" align="center">
                   <template slot-scope="scope">
                       {{scope.row.unpaidAmount}}
                   </template>
            </el-table-column>
        <el-table-column label="操作" align="center"  fixed="right"  width="130">
          <template slot-scope="scope">
            <div class="line">
              <div class="small-Idiv" @click="applyPay(scope.row)"
              v-permit="'pu:payment_apply'">
                <div class="i-div">
                  <img src="@/common/images/icon/付款.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;">申请付款</span>
              </div>
              <div class="small-Idiv" @click="applyDetail(scope.row)"
              v-permit="'pu:payment_detail'">
                <div class="i-div">
                  <img src="@/common/images/icon/查看详情.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;" >详情</span>
              </div>
            </div>         
          </template>
        </el-table-column>
      </el-table>
      
      <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="tableDatas.pageIndex"
              :page-sizes="[5,10,30,50]"
              :page-size="tableDatas.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableDatas.count"
            ></el-pagination>
      </div>
    </div>
    <!-- 推送审核 -->
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
            >销售订单【{{this.showNo}}】的商品明细</li>
          </ul>
        </div>
        <div class="tabs-content">
          <component :is="mainIndex" :count="count" :page="page" :showId="showId"></component>
        </div>
    </div>
    <!-- 付款申请组件 -->
    <ApplyPay
    :addVisibles="addVisibles"
    :payList="payList"
    :accountData="accountData"
    @createClose1="createClose2"
    @createClosing1="createClosing2"
    @saveAppPay1="saveAppPay2"
    ></ApplyPay>
     <!-- 批量付款申请详情组件 -->
    <ApplyPays
    :batchVisibles="batchVisibles"
    :payDetail="payDetail"
    @createClose3="createClose4"
    @createClosing3="createClosing4"
    @saveAppPays1="saveAppPays2"
    ></ApplyPays>

  </div>
</template>

<script>
import { getCategory, getStoreList } from '@/api/public'
import { throttleTipPop } from "@/utils/functions.js";
import { getAuditGoods,getApplyPayList,findPaymentInfo,detailPurchasePayment,batchPaymentApply} from '@/api/purchase/index';
import {findAccountInfo} from '@/api/sale/index';
import AccountOrder from './oreder';
import ApplyPay from './applyPay';
import ApplyPays from './applyPays'

export default {
  filters:{
    date: function(val) {
        let str = '';
        let  skr = '';
        if(val){
          str=val.slice(0 ,10)
          skr = str.replace('-','年')
          skr = skr.replace('-','月')
          skr = skr.concat("日")
        }
        return skr
    }
  },
  data () {
    return {
      mainIndex:'AccountOrder',
      currentIndex:0,
      dataArr:[],
      radio:'',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      currentIndex0:'',
      comIndex:'',
      purchaseOrderNo:'',
      batchVisibles:false,//批量付款申请
      addVisibles:false,//付款申请
      detailVisibles:false,//付款申请详情
      orderDatas:[],//根据ID获得的销售订单详细
      orderData:[],//销售订单分页数据
      page:[],//商品明细分页
      page1:[],
      count:[],//商品明细总数
      payList:{},//付款申请初始化数据
      payDetail:{},//付款申请详情
      purchaseArr:[],
      getIndex:'',
      closeId: "", //关闭ID
      closeNo: "",
      showId:'',
      showNo:'',
      oldDetails:'',
      oldAmount:'',
      deleteId:'',
      detailData:'', 
      accountData:[],//资金账户
      form: {
        allType:0,//搜索审核状态
        current_page:0,
        page_size:10,
        total_count:0,
        to:0,//推送给
        endTime:'',//截止日期
        auditType:0,//审核状态
        signRemark:'',//备注
        orderNumber:'',//销售单号
        customerName:'',//客户名称
        sigingType:1,//签定状态
        sigingTime:'',//签定日期
        imgUrl:[],//上传图片路径

        type:0,
      },
      tableData:[
          {
          date: '2016-05-02',
          name: '张小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        
      ],
      tableDatas: {
                pageIndex:1,
                sizes:[10, 20, 50, 100],
                pageSize:10,
                count:0,
                customerName:'',
                orderNo:'',
                supplierInfo:'',
                projectName:'',
                deliveryDate:'',
                startTime:'',
                endTime:'',

            },
      goodsData:{  //商品详情列表的分页
        pageIndex:1,
        pageSize:10,
        count:0,
      },
     
      rules:{
        partyA: [
            {required: true, message: '此项为必填项', trigger: 'blur'}
          ],
        partyAAddress: [
            {required: true, message: '此项为必填项', trigger: 'blur'}
          ],
        partyAContacts: [
            {required: true, message: '此项为必填项', trigger: 'blur'}
          ],
        partyANumber: [
            {required: true, message: '此项为必填项', trigger: 'blur'}
          ],
        dateNum: [
            {required: true, message: '此项为必填项', trigger: 'blur'}
          ],
        paymentAccount: [
            {required: true, message: '此项为必填项', trigger: 'blur'}
          ],
        accountName: [
            {required: true, message: '此项为必填项', trigger: 'blur'}
          ],
        openingBank: [
            {required: true, message: '此项为必填项', trigger: 'blur'}
          ],
        to:[
             {required: true, message: '此项为必选项', trigger: 'change'}
        ],
        endTime:[
           {required: true, message: '此项为必填项',trigger: 'blur'}
        ],
        remark:[
          {required: true, message: '此为必填项',trigger: ['blur','change']}
        ]
      }
    }
  },
   watch:{
    "tableDatas.deliveryDate": {
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
  created () {
    this._getApplyPayList()
  },

  computed: {
  },
  methods: {
    //申请付款弹框
    createClose2(data){
      this.addVisibles = data;
    },
    createClosing2(data){
      this.addVisibles = data;
    },
    saveAppPay2(data){
      this.addVisibles =data;
      this._getApplyPayList();
      this.resetData();
    },
    //付款详情弹框
    createClose4(data){
      this.batchVisibles = data;
    },
    createClosing4(data){
      this.batchVisibles = data;
    },
    saveAppPays2(data){
      this.batchVisibles =data;
      this._getApplyPayList();
      this.resetData();
    },
     tabIndex (index) {
      this.currentIndex = index;
      switch (index) {
        case 0:
          this.mainIndex = "AccountOrder";
          break;
        default: 
            return
      }
    },
    //获取付款申请分页
    _getApplyPayList(){
      getApplyPayList(this.tableDatas).then(res=>{
            this.orderData = res.data.pageList
            this.tableDatas.count = res.data.count
      })
    },
    //搜索
    inSearch(){
      this.tableDatas.pageIndex =1;
      this._getApplyPayList();
      this.resetData();
    },
    //重置数据
    resetData(){
      this.getIndex = '';
      this.showNo = '';
      this.page = [];
      this.count = 0;
    },
    
    //付款申请
    applyPay(row){
        findPaymentInfo(row.purchaseOrderId).then(res=>{
          if(res.code===200){
            this.payList = res.data;  
            
            this.addVisibles = true;
          }
        })
        
    },
    //批量申请
    batchApply(){
      
       batchPaymentApply(this.purchaseArr).then(res=>{
            if(res.code===200){
                this.payDetail = res.data;
                this.batchVisibles = true;
            }
          })
 
      
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
      this.showId = row.purchaseOrderId;
      this.showNo = row.saleOrderNo
      
      let obj = {}
      obj.pageIndex = this.goodsData.pageIndex;
      obj.pageSize = this.goodsData.pageSize;
      obj.purchaseOrderId = this.showId;
       getAuditGoods(obj).then(res => {
        this.count = res.data.count;
        this.page = res.data.pageList;
      });
    },
    //详情跳转
    applyDetail(row){
        let obj = {};
        obj.comIndex = "Accounts";
        obj.currentIndex0 =4;
        obj.purchaseOrderNo = row.purchaseOrderNo;
        this.$emit("applyDetail1",obj);
    },
      //主页换页
    /*    getHandleSizeChange(val) {
       this.tableDatas.pageSize =val;
       this._getOrder()
     },
    getHandleCurrentChange(val) {
      this.tableDatas.pageIndex = val;
      this._getOrder()
    }, */
     

      handleSizeChange(val){
        this.tableDatas.pageSize = val;
        this.resetData();
        this._getApplyPayList();
      },
      handleCurrentChange(val){
        this.tableDatas.pageIndex = val;
        this.resetData();
        this._getApplyPayList();
      },
      handleSelectionChange(row){    
          var purchaseArr = []; 
          for(let i=0;i<row.length;i++){
              purchaseArr.push(row[i].purchaseOrderId);
          }
          this.purchaseArr = purchaseArr;
          
          
      },
      handleChange(){

      }
  },
  components: {
    AccountOrder,
    ApplyPay,
    ApplyPays
  /*   ApplyDetail */
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
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
    .title1{
      margin-left: -20px;
      font-size: 14px;
      color: 3333;
      padding-left: 10px;
      line-height: 1.4;
      border-left: 4px solid $themeColor;
      margin-bottom: 10px;
    }
    .search-main {
    }
    .search-base {
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

.line{
      overflow: hidden;
      .small-Idiv{
        width: 50%;
        padding-top: 10px;
        float: left;

      }
}

 .small_top{
    margin-left:7px;
  }

.i-div {
  cursor: pointer;
}
.margin1{
  padding-left:40px;
  padding-top:20px;
  box-sizing: border-box;

}
.order{
  color:#4A99FA;
}
.mcard0 {
    border: 1px solid #d7e0f1;
    margin-top: 20px;
  }
.tips{
  position: relative;
    top: 6px;
    left: 0px;
    font-size: 11px;
    color:#909399;
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
.audit{
  float: right;
}
.auditHeader{
  margin-top:20px;
  .gray{
    display: inline-block;
    width:104px;
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
    padding: 0 33px;
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
    width: 101px;
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
    width:104px;
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
    width: 843px;
    height: 96px;
    display: inline-block;
  }
}
.demoImg{
  position: relative;
  z-index: 10000000;
}

</style>