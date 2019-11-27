<template>
  <div class="margin0">
     <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">已完成</h4>
            <div class="search-base">
              <el-row>
               <!-- <el-col :span="5">
                    <el-form-item label="订单状态：">
                            <el-col :span="21">
                                <el-select v-model="form.orderStatus" >
                                      <el-option
                                      v-for="item in options"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                </el-col> -->
               <el-col :span="5">
                    <el-col>
                        <el-form-item label="销售单号：">
                            <el-col :span="21">
                                <el-input v-model="form.saleOrderNo" placeholder="请输入销售单号"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-col>
                   <el-col :span="8">
                    <el-form-item label="下单时间：">
                            <el-col :span="21">
                              <el-date-picker
                            v-model="form.orderTime"
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
               <!--  <el-col :span="5">
                    <el-form-item label="物流公司：">
                            <el-col :span="21">
                                <el-input v-model="form.logistics"  placeholder="请输入物流公司"></el-input>
                            </el-col>
                        </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="物流单号：">
                            <el-col :span="21">
                                <el-input v-model="form.logisticNumber"  placeholder="请输入物流单号"></el-input>
                            </el-col>
                        </el-form-item>
                </el-col> -->
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
        <!--   <el-row>
            <el-button type="primary" size="small">新增</el-button>
            <el-button type="primary" size="small">单据生成PDF</el-button>
          </el-row> -->
      </div>
      <el-table :data="pageList" border @selection-change="handleSelectionChange" 
              :row-class-name="tableRowClassName"
              :row-style="selectedHighlight"
              @row-dblclick="AhandleSelectionChange">
        <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
         <el-table-column label="客户信息" prop="name" align="center"  width="300">
                      <template slot-scope="scope">
                        <div class="txt_left" >名称：{{scope.row.customerName}}</div>
                        <div class="txt_left">部门：{{scope.row.department}}</div>
                        <div class="txt_left">联系人：{{scope.row.customerContact}}</div>
                        <div class="txt_left">联系电话：{{scope.row.tel}}</div>
                        <div class="txt_left">手机：{{scope.row.phone}}</div>
                      </template>
            </el-table-column>
            <el-table-column label="销售订单信息" prop="name" align="center"  width="300">
                      <template slot-scope="scope">
                        <div class="txt_left" >
                                销售单号：{{scope.row.saleOrderNo}}
                            </div>
                        <div class="txt_left">
                              经销商：{{scope.row.aCompanyName}}
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
            <el-table-column label="订单金额" prop="name" align="center">
                   <template slot-scope="scope">
                    {{scope.row.orderTotalAmount}}
                   </template>
            </el-table-column>
     
        <el-table-column label="状态" prop="name" align="center" >
                     <template slot-scope="scope">
                         <div v-html="scope.row.payStatus"> </div>                 
                       <div v-html="scope.row.invoiceStatus"> </div>
                        <div v-html="scope.row.deliveryStatus"></div>                 
                   </template>
        </el-table-column>
         <el-table-column label="操作" align="center" fixed="right" width="130">
          <template slot-scope="scope">
            <div class="line-div">
              <div class="small-Idiv" @click="detail(scope.row)"
              v-permit="'SaleOrder:after_detail'">
                <div class="i-div">
                  <img src="@/common/images/icon/查看详情.png" alt class="operation_img" />
                </div>
                <span style="word-break: keep-all;">详情</span>
              </div>
               <div
                class="small-Idiv"
                @click="Apply(scope.row)"
                v-permit="'SaleOrder:app_after_sale'"
              >
                <div class="i-div" >
                  <img src="@/common/images/icon/申请售后.png" alt class="operation_img" />
                </div>
                <span style="word-break: keep-all;">申请售后</span>
              </div>
            </div>
           
          </template>
         </el-table-column>
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
              <component :is="mainIndex" :count="count" :page="page" :showNo="showNo"></component>
            </div>
        </div>
         <Detail
       @createCloseD="createClose4"
        @createClosingD="createClosing4"
        :detailVisibles="detailVisibles"
        :detailData="detailData"
      ></Detail>
      <Apply @close="closer" :app="app" @beClose="beClosing"></Apply>
  </div>
</template>

<script>
import { getCategory, getStoreList } from '@/api/public'
import { completedList,completedGoodsList,getCompletedDetail} from '@/api/sale/index'
import Apply from './apply'
import Goods from './goods'
import Detail from './detail'
export default { 
  data () {
    return {
       app:false,//弹窗
      currentIndex:0,
      mainIndex:'Goods',
      detailVisibles:false,
      detailData:{},//详情数据
      pageList:[],//列表
      page:[],//商品列表
      count:0,
      getIndex:'',
      showNo:'',//展示商品需要的编号
      form: {
        pageIndex:1,
        pageSize:10,
        count:0,
        logistics:'',//物流公司
        orderStatus:60,//订单装填
        saleOrderNo:'',//订购单号
        orderTime:'',//下单时间
        logisticNumber:'',//物流单号
        startTime:'',
        endTime:''
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
            value:60,
          label:"已完成"
          },

      ]
    }
  },
  created () {
    this._completedList();
  },
  watch:{
    "form.orderTime": {
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

    tabIndex (index) {
      this.currentIndex = index
      
    },
    //申请售后子组件传值不能使用
    closer:function(data){
       this.app  = data
 
      },
    //搜索
    search(){
        this.form.pageIndex =1;
        this._completedList();
        this.resetData();
      },
    //重置数据
    resetData(){
       this.page = [];
        this.count = 0;
        this.showNo = '';
        this.getIndex = '';
    },
    beClosing:function(data){
        this.app = data;
        
      },
    //详情子组件
    createClose4: function(data) {
      this.detailVisibles = data;
    },
    createClosing4: function(data) {
      this.detailVisibles = data;
    },
    detail(row){
      getCompletedDetail(row.orderId).then(res=>{
        if(res.code===200){
          this.detailData = res.data;
          this.detailVisibles = true;
        }
          
      })
      
    },
    _completedList(){
      completedList(this.form).then(res=>{
          this.pageList = res.data.pageList;
          this.form.count = res.data.count;
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
      this.showNo = row.saleOrderNo
      this.contractId = row.contractiId;
      
      
      let obj ={};
      obj.pageIndex= this.goodsData.pageIndex,
      obj.pageSize = this.goodsData.pageSize,
      obj.saleOrderNo = row.saleOrderNo;
       completedGoodsList(obj).then(res => {
        this.count = res.data.count;
        this.page = res.data.pageList;
      });
    },
      Apply(){
        this.app = true;      
      },
      handleSizeChange(val){
          this.form.pageSize = val;
          this.resetData();
          this._completedList();
      },
      handleCurrentChange(val){
          this.form.pageIndex = val;
          this.resetData();
          this._completedList();
      },
      handleSelectionChange(){
        
      }
  },
  components: {
    Goods,
    Detail,
    Apply,
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
  overflow: hidden;
  .small-Idiv{
    float: left;
    margin-left: 10px;
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
