<template>
  <div class="margin0">
     <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">已收发票</h4>
              <div class="search-base">
              <el-row>
               <el-col :span="5">
                    <el-form-item label="客户名称：">
                            <el-col :span="21">
                                <el-input v-model="form.customer" placeholder="请输入客户名称">
                                </el-input>
                            </el-col>
                        </el-form-item>
                </el-col>
               <el-col :span="5">
                    <el-col>
                        <el-form-item label="发票编号：">
                            <el-col :span="21">
                                <el-input v-model="form.invoiceNo" placeholder="请输入发票单号"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-col>
                 
                <el-col :span="5">
                    <el-form-item label="发票金额：">
                            <el-col :span="21">
                                <el-input v-model="form.price"  placeholder="请输入发票金额"></el-input>
                            </el-col>
                        </el-form-item>
                </el-col>
               
               
                <el-col :span="3" >
                      <el-button type="primary" size="small" @click='inSearch(true)' >查询</el-button>
                 <!--      <el-button type="primary" size="small" @click='serch(true)' >导出</el-button> -->
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                    <el-form-item label="采购订单：">
                            <el-col :span="21">
                                <el-input v-model="form.orderNo"  placeholder="请输入采购单号"></el-input>
                            </el-col>
                        </el-form-item>
                </el-col>

               <el-col :span="5">
                    <el-col>
                        <el-form-item label="状态：">
                          <el-col :span="21">
                              <el-select v-model="form.status"
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
                 <el-col :span="8">
                     <el-form-item label="日期：">
                            <el-col :span="21">
                              <el-date-picker
                            v-model="form.deliveryDate"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            style="width:100%"
                            valueFormat='yyyy-MM-dd HH:mm:ss'>
                          </el-date-picker>
                            </el-col>
                        </el-form-item>
                </el-col>
                
                
               
              </el-row>
      
              
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mcard" style="border:1px solid #d7e0f1">
      <div class="head">
          <el-row>
            <el-button type="primary" size="small" @click="previewPo()">查看采购合同</el-button>

          </el-row>
      </div>
      <el-table :data="pageList" border @selection-change="handleSelectionChange" 
      :row-class-name="tableRowClassName"
          :row-style="selectedHighlight"
          @row-dblclick="AhandleSelectionChange">
        <el-table-column type="index"  label="序号" align="center" width="50"></el-table-column>
       <el-table-column label="采购订单信息" prop="name" align="center" width="270">
                    <template slot-scope="scope">
                          <div class="txt_left">采购单号：{{scope.row.purchaseOrderNo}}</div>
                          <div class="txt_left">采购交货日期：{{scope.row.distributionTime | date}}</div>
                          <div class="txt_left">创建时间：{{scope.row.purchaseCreateTime}}</div>
                          <div class="txt_left">采销员：{{scope.row.purchaseUserName}}</div>
                          <div class="txt_left">签约公司：{{scope.row.company}}</div>
                    </template>
        </el-table-column>
        <el-table-column label="销售订单信息" prop="name" align="center" width="270">
                    <template slot-scope="scope">
                          <div class="txt_left">销售单号：{{scope.row.saleOrderNo}}</div>
                          <div class="txt_left">客户名称：{{scope.row.customerName}}</div>
                          <div class="txt_left">经销商：{{scope.row.agencyName}}</div>
                          <div class="txt_left">平台名称：{{scope.row.projectName}}</div>
                          <div class="txt_left">创建时间：{{scope.row.saleCreateTime}}</div>
                           <div class="txt_left">销售员：{{scope.row.bizUserName}}</div>
                    </template>
        </el-table-column> 
        <el-table-column label="收票信息" prop="name" align="center" width="180">
                    <template slot-scope="scope">
                          <div class="txt_left">单位名称：{{scope.row.customerName}}</div>
                          <div class="txt_left">开户银行：{{scope.row.vatBankName}}</div>
                          <div class="txt_left">开户账号：{{scope.row.vatBankAccount}}</div>
                          <div class="txt_left">注册电话：{{scope.row.vatPhone}}</div>
                          <div class="txt_left">注册地址：{{scope.row.vatAddress}}</div>
                          <div class="txt_left">纳税人识别号：{{scope.row.taxNumber}}</div>
                    </template>
        </el-table-column>
        <el-table-column label="收票内容" prop="name" align="center">
                    <template slot-scope="scope">
                        {{scope.row.invoiceContent}}
                    </template>
        </el-table-column>
          <el-table-column label="收票类型" prop="name" align="center">
                     <template slot-scope="scope">
                        {{scope.row.invoiceType | invoice}}
                    </template>
        </el-table-column>
         <el-table-column label="收票时间" prop="name" align="center">
                      <template slot-scope="scope">
                        {{scope.row.expectedDealDate}}
                    </template>
        </el-table-column>
        <el-table-column label="订单金额" prop="name" align="center">
                     <template slot-scope="scope">
                        {{scope.row.orderAmount}}
                    </template>
        </el-table-column>
        <el-table-column label="发票编号" prop="name" align="center">
                    <template slot-scope="scope">
                        {{scope.row.invoiceNo}}
                    </template>
        </el-table-column>
        <el-table-column label="本次收票金额" prop="name" align="center">
                     <template slot-scope="scope">
                        {{scope.row.invoiceAmount}}
                    </template>
        </el-table-column>
        <el-table-column label="发票凭证" prop="name" align="center">
                     <template slot-scope="scope">
                        <span class="blue" v-show="scope.row.fileInvoiceUrl" @click="preview(scope.row)">查看</span>
                        <span  v-show="!scope.row.fileInvoiceUrl">暂无发票凭证</span>
                     </template>
                        
        </el-table-column>
  
         <el-table-column label="操作" align="center" fixed="right" width="130">
          <template slot-scope="scope">
            <div class="line-div">
              <div
                class="small-Idiv"
                @click="generate(scope.row)"
                v-permit="'pu:detail_tickets'"
              >
                <div class="i-div">
                  <img src="@/common/images/icon/查看详情.png" alt class="operation_img" />
                </div>
                <span style="word-break: keep-all;">详情</span>
              </div>            
            </div>
          
          </template>
         </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="form.current_page"
            :page-sizes="[5,10,30,50]"
            :page-size="form.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="form.total_count">
            </el-pagination>
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
            >发票明细</li>
            <li
              class="sale"
              @click="tabIndex(0)"
              :class="currentIndex===0 ? 'active' : ''"
              v-show="this.showNo"
            > 发票号【{{this.showNo}}】的发票明细</li>
          </ul>
      </div>
      <div class="tabs-content">
          <component :is="mainIndex" :count="count" :page="page" :showId="showId"></component>
        
    </div>
        </div>
      <!-- 售票详情 -->
      <InvoiceDetail 
      :addVisibles="addVisibles"  
      :invoiceData1="invoiceData1"  
      @createClose1="createClose2"
        @createClosing1="createClosing2"></InvoiceDetail> 


       <!-- 上传预览 -->
       <el-dialog :visible.sync="dialogVisible" :modal="true" :append-to-body="false">
                                        <img width="100%" :src="previewImg" alt="">
                                        <span slot="footer" class="dialog-footer"></span>
        </el-dialog>

 
  </div>
</template>

<script>
import { getCategory, getStoreList } from '@/api/public'
import {getInvoicedList,InvoiceGoodsList,findInvoiceDetail} from '@/api/purchase/index'
import { throttleTipPop } from "@/utils/functions.js";
import Goods from './goods'
import InvoiceDetail from './invoiceDetail'
export default { 
   filters:{
    invoice(val){
      switch(val){
        case 1:
          return "增值税专用发票";
          break;
        case 2:
          return "普通发票";
          break;
        default:
          return 
      }
    },
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
      dialogVisible:false,
      previewImg:'',
      detailVisibles:false,
      addVisibles:false,
      currentIndex:0,
      mainIndex:'Goods',
      pageList:[],
      invoiceData:{},//编辑发票的数据
      contractId:'',
      page:[],
      count:0,
      showNo:'',
      showId:'',
      getIndex:'',
      invoiceData1:{},//发票详情数据
      form: {
        pageIndex:1,
        pageSize:10,
        count:0,
        customer:'',//客户名称
        status:1,//状态
        invoiceNo:'',//发票编号 
        price:'',//发票金额
        invoiceTime:'',//开票日期
        orderNo:'',//采购订单
        startTime:'',
        endTime:'',

      },
       goodsData:{  //商品详情列表的分页
        pageIndex:1,
        pageSize:10,
        count:0,
      },
      tableData:[
          {
          date: '2016-05-02',
          name: '王小虎',
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
        }
      ],
      options:[
          {
            value:0,
          label:"未收票"
          },
          {
            value:1,
            label:'已收票'
          }
      ]
    }
  },
  created () {
    this._getInvoicedList();
  },
  watch:{
     "form.deliveryDate": {
      handler(val, old) {
        if(val===null){
            this.form.startTime = '';
        this.form.endTime = '';
        }else{
            this.form.startTime = val[0];
        this.form.endTime = val[1];
        }
        

      },
      deep: true
    }
  },
  computed: {
  },
  methods: {

     createClose2: function(data) {
      this.addVisibles = data;
    },
    createClosing2: function(data) {
      this.addVisibles = data;
    },
    tabIndex (index) {
      this.currentIndex = index
      
    },
    //已收票列表
    _getInvoicedList(){
      getInvoicedList(this.form).then(res=>{
        if(res.code===200){
          this.pageList = res.data.pageList;
          this.form.count = res.data.count;
        }
      })
    },
     //搜索分页
    inSearch(){
      this.form.index = 1;
      this._getInvoicedList();
      this.resetData();
    },
    //重置数据
    resetData(){
      this.page = [];
      this.count = 0;
      this.getIndex = '';
      this.showNo = '';
    },
    //预览合同
    previewPo(){
        if(this.contractId===''){
          throttleTipPop(this, "warning", "请选择要查看的选项", 2000);
        }else{
          if(!this.contractId){
               throttleTipPop(this, "warning", "请先生成合同", 2000);
          }else{
              this.$router.push({name:'PreviewPo',query:{Id:this.contractId}})
          }
          
        }
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
      this.showId = row.invoiceId;
      this.showNo = row.invoiceNo;
      this.contractId = row.contractId;
      
      let obj = {}
      obj.pageIndex = this.goodsData.pageIndex;
      obj.pageSize = this.goodsData.pageSize;
      obj.invoiceId = this.showId;
       InvoiceGoodsList(obj).then(res => {
        this.count = res.data.count;
        this.page = res.data.pageList;
      });
    },
    //收票详情
    generate(row){
      findInvoiceDetail(row.invoiceId).then(res=>{
          this.invoiceData1 = res.data;
          this.addVisibles = true;
      })
    },
    //预览
    preview(row){
     if(this.previewImg!==''||this.previewImg!==null){
        this.previewImg = row.fileInvoiceUrl;
        this.dialogVisible = true;
     }
    },
    handleSizeChange(val){
       this.form.pageSize = val;
       this.resetData();
       this._getInvoicedList();
      
      },
    handleCurrentChange(val){
        this.form.pageIndex = val;
       this.resetData();
       this._getInvoicedList();
      },
      handleSelectionChange(){
        
      }
  },
  components: {
    Goods,
    InvoiceDetail,
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
    border: 1px solid rgb(215, 224, 241);
    background: #fff;
    .title {
      margin-left: -20px;
      font-size: 16px;
      font-weight: 400;
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
.margin1{
  padding-left:40px;
  padding-top:20px;
  box-sizing: border-box;

}
.line-div {
  display: flex;
  justify-content: space-around;
  margin-left: 8px;
}
.line {
  display: flex;
  justify-content: flex-start;
}
.small_top {
  margin-top: 10px;
}

.i-div {
  cursor: pointer;
}
.head{
  margin-bottom: 20px;
}
.blue{
  color:#4A99FA;
  cursor: pointer;
}
</style>
