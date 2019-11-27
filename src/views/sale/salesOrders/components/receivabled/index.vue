<template>
  <div class="margin0">
     <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">已收款</h4>
           <div class="search-base">
                  <el-row>
                       <!--  <el-col :span="5">
                        <el-col>
                            <el-form-item label="收款状态：">
                                <el-col :span="21">
                                  <el-select v-model="form.payStatus">
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
                    </el-col> -->
                    <el-col :span="5">
                        <el-col>
                            <el-form-item label="销售单号：">
                                <el-col :span="21">
                                    <el-input v-model="form.saleOrderNo" placeholder=" 请输入销售单号"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-col>
                  <el-col :span="5">
                        <el-form-item label="客户：">
                                <el-col :span="21">
                                    <el-input v-model="form.customerName" placeholder="请输入客户名称">
                                    </el-input>
                                </el-col>
                            </el-form-item>
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
                    <el-col :span="2" >
                          <el-button type="primary" size="small" @click='search(true)' >查询</el-button>
                    </el-col>
                  </el-row>
                
                </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mcard" style="border:1px solid #d7e0f1">
      <div class="head">
      </div>
      <el-table :data="payList" border @selection-change="handleSelectionChange" 
              :row-class-name="tableRowClassName"
              :row-style="selectedHighlight"
              @row-dblclick="AhandleSelectionChange">
        <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
         <el-table-column label="状态" prop="name" align="center" width="150">
                     <template slot-scope="scope">
                            <div v-html="scope.row.payStatus"></div>
                     </template>
            </el-table-column>
            <el-table-column label="销售订单信息" prop="name" align="center" width="270">
                      <template slot-scope="scope">
                            <div class="txt_left">销售单号：{{scope.row.saleOrderNo}}</div>
                            <div class="txt_left">创建时间：{{scope.row.createTime}}</div>
                            <div class="txt_left">销售员：{{scope.row.bizUserName}}</div>
                            <div class="txt_left">签单公司：{{scope.row.acompanyName}}</div>
                      </template>
            </el-table-column>
            <el-table-column label="客户信息" prop="name" align="center" width="250">
                      <template slot-scope="scope">
                            <div class="txt_left">名称：{{scope.row.customerName}}</div>
                            <div class="txt_left">联系人：{{scope.row.customerContact}}</div>
                            <div class="txt_left">联系电话：{{scope.row.tel}}</div>
                            <div class="txt_left">手机：{{scope.row.phone}}</div>
                      </template>
            </el-table-column>
            <el-table-column label="订单总金额" prop="name" align="center">
                      <template slot-scope="scope">
                              {{scope.row.orderTotalAmount}}
                      </template>
            </el-table-column>
        <el-table-column label="收款信息" prop="name" align="center">
                    <template slot-scope="scope">
                        <div class="txt_left">应收金额：{{scope.row.orderTotalAmount}}元</div>
                        <div class="txt_left">已收金额：{{scope.row.receivedAmount}}元</div>
                        <div class="txt_left">未收金额：{{scope.row.unpaidAmount}}元</div>
                    </template>
        </el-table-column>
        <!--  <el-table-column label="操作" align="center" fixed="right" width="150">
          <template>
            <div class="line-div">
              <div class="small-Idiv" @click="detail()"
              v-permit="'SaleOrder:invoice_detail'">
                <div class="i-div">
                  <img src="@/common/images/icon/查看详情.png" alt class="operation_img" />
                </div>
                <span style="word-break: keep-all;">详情</span>
              </div>
              <div
                class="small-Idiv"
                @click="generate()"
                style="justify-content: end;margin-left: 17px;"
              >
                <div class="i-div">
                  <img src="@/common/images/icon/收款.png" alt class="operation_img" />
                </div>
                <span style="word-break: keep-all;">新增收款</span>
              </div>
            </div>

          </template>
         </el-table-column> -->
      </el-table>
          <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="form.pageIndex"
                :page-sizes="[5,10,30,50]"
                :page-size="form.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="form.count">
              </el-pagination>
          </div>
    </div>
    <el-col :span="12">
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
        <component :is="mainIndex" :page="page" :count="count" :showNo="showNo"></component>
            
        </div>
      </div>
    </el-col>
      <el-col :span="12">
        <el-col :span="23" :offset="1">
      <div class="margin0" style="margin-top:20px">
        <div class="tabs-header">
          <ul class="clearfix">
              <li class="sale" @click="tabIndex1(0)"  :class="currentIndex1===0 ? 'active' : ''">收款记录</li> 
          </ul>
        </div>
        <div class="tabs-content">
          <component :is="mainIndex1" :payPage="payPage" :payCount="payCount" :showNo="showNo"></component>
              
          </div>
         </div>
        </el-col>
    </el-col>
  </div>
</template>

<script>
import { getCategory, getStoreList } from '@/api/public'
import {getSalePayList,getSalePayGoodsList,getSalePagePayList} from '@/api/sale/index'
import Goods from './goods'
import Goods1 from './goods1'
export default { 
  data () {
    return {
      payList:[],
      getIndex:'',
      currentIndex:0,
      currentIndex1:0,
      mainIndex:'Goods',
      mainIndex1:'Goods1',
      page:[],
      count:0,
      payPage:[],
      payCount:0,
      showNo:'',//展示商品需要的编号
      showNo:'',//展示商品需要的编号
      form: {
        pageIndex:0,
        pageSize:10,
        count:0,
        cutCardFlag:1,//切卡
        customerName:'',//客户名称
        payStatus:2,//状态
        saleOrderNo:'',//单号
        deliveryDate:'',//日期
        startTime:'',//开始时间
        endTime:'',//结束时间
      },
       goodsData:{
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
            value:-1,
          label:"全部"
          },

          {
            value:1,
            label:'部分收款'
          },
          {
            value:2,
            label:'已收款'
          }
      ]
    }
  },
  created () {
    this._getSalePayList();
  },
  computed: {
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
 
  methods: {
    tabIndex (index) {
      this.currentIndex = index
      
    },
    tabIndex1 (index) {
      this.currentIndex1 = index
      
    },
     _getSalePayList(){
      getSalePayList(this.form).then(res=>{
        this.payList = res.data.pageList;
        this.form.count = res.data.count;
      })
    },
    search(){
      this.form.pageIndex=1;
      this._getSalePayList();
      this.resetData();
    },
    //重置数据
    resetData(){
      this.getIndex = '';
      this.showNo = '';
      this.page = [];
      this.count = 0;
      this.payPage = [];
      this.payCount = 0;
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
      this.showNo = row.saleOrderNo;
      
      let obj ={};
      obj.pageIndex= this.goodsData.pageIndex,
      obj.pageSize = this.goodsData.pageSize,
      obj.saleOrderNo = row.saleOrderNo;
     
        getSalePagePayList(obj).then(res=>{
          this.payCount = res.data.count;
          this.payPage = res.data.pageList;
        })

          getSalePayGoodsList(obj).then(res => {
        this.count = res.data.count;
        this.page = res.data.pageList;
      });
    },
      handleSizeChange(val){
        this.form.pageSize = val;
        this.resetData();
        this._getSalePayList();
      },
      handleCurrentChange(val){
        this.form.pageIndex = val;
        this.resetData();
        this._getSalePayList();
      },
      handleSelectionChange(){
        
      }
  },
  components: {
    Goods,
    Goods1,
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
  .small-Idiv{
    margin:0 auto;
  }
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
</style>
