<template>
    <div>
     <div class="mcard" style="border:1px solid #d7e0f1">
      <el-table
        :data="stroageList"
        border
        @selection-change="handleSelectionChange"
        
        :row-class-name="tableRowClassName"
        :row-style="selectedHighlight"
        @row-dblclick="AhandleSelectionChange"
      >
       <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
  
        <el-table-column label="出库单号" prop="name" align="center">
          <template slot-scope="scope">{{scope.row.shipmentBillNo}}</template>
        </el-table-column>
        <el-table-column label="关联销售单号" prop="name" align="center">
          <template slot-scope="scope">{{scope.row.saleOrderNo}}</template>
        </el-table-column>
        <el-table-column label="订单金额" prop="name" align="center">
          <template slot-scope="scope">{{scope.row.totalPrice}}</template>
        </el-table-column>
        <el-table-column label="客户信息" prop="name" align="center" width="250">
          <template slot-scope="scope">
            <div class="txt_left">客户名称：{{scope.row.customerName}}</div>
            <div class="txt_left">联系人：{{scope.row.contact}}</div>
            <div class="txt_left">联系电话：{{scope.row.tel}}</div>
            <div class="txt_left">手机：{{scope.row.phone}}</div>
          </template>
        </el-table-column>
        <el-table-column label="出货单号" prop="name" align="center">
          <template slot-scope="scope">{{scope.row.invoiceBillNo}}</template>
        </el-table-column>
        <el-table-column label="出货日期" prop="name" align="center" width="140">
          <template slot-scope="scope">{{scope.row.shipmentDate | date}}</template>
        </el-table-column>
        <el-table-column label="跟进人" prop="name" align="center" width="150">
          <template slot-scope="scope">
            <div class="txt_left">销售员：{{scope.row.saleUserName}}</div>
            <div class="txt_left">送货员：{{scope.row.deliveryName}}</div>
            <div class="txt_left">财务员：{{scope.row.treasurer}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="name" align="center" width="130" fixed="right">
                <template slot-scope="scope">
                   <div class="line-div">
               
                    <div
                      class="small-Idiv"
                      @click="detail(scope.row)"                    
                      v-permit="'shipment:detail2'">
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
          >出库单【{{this.showNo}}】的商品明细</li>
        </ul>
      </div>
      <div class="tabs-content">
        <component :is="mainIndex" :count="count" :page="page" :showId="showId"></component>
      </div>
    </div>
        <DetailOut
          :editVisibles="editVisibles"
          :detailData="detailData"   
          @createClose1="createClose2"
            @createClosing1="createClosing2"></DetailOut> 
    </div>   
</template>

<script>
import Goods from "./goods"
import DetailOut from './detailOut'
import {getOutStorageList,getOutStorageGoodsList,getDeliverDetail} from '@/api/sale/index'
export default {
    data(){
        return{
          editVisibles:false,
              currentIndex:0,
             mainIndex:'Goods',
              showNo: "", //显示商品列表需要的编号
            showId: "",
            page: [], //商品列表
            count: 0, //总数
            getIndex: "",
            stroageList: [], //列表
            detailData:'',//已出库详情
            goodsData: {
              pageIndex: 1,
              pageSize: 10,
              count: 0
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
              form: {
              pageIndex: 1,
              pageSize: 10,
              startTime: "",
              endTime: "",
              count: 0
            }
        }
    },
    components:{
        Goods,
        DetailOut,
    },
     props:["storeData",'total'],
    watch:{
      storeData(val){
        this.stroageList  =val;
        this.getIndex ="";
        this.showNo = '';
        this.count = 0;
        this.page = [];
        
      },
      total(val){
        this.form.count = val;
      }
    },
    created() {
    this._getOutStorageList();
  },
    methods:{
        //子组件传值
      createClose2: function(data) {
      this.editVisibles = data;
    },
    createClosing2: function(data) {
      this.editVisibles = data;
    },
    tabIndex (index) {
          this.currentIndex = index
          
       },
        //出库单列表
    _getOutStorageList() {
      getOutStorageList(this.form).then(res => {
        this.stroageList = res.data.pageList;
        this.form.count = res.data.count;
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
      this.showId = row.shipmentBillId;
      this.showNo = row.shipmentBillNo;

      let obj = {};
      obj.pageIndex = this.goodsData.pageIndex;
      obj.pageSize = this.goodsData.pageSize;
      obj.shipmentBillId = this.showId;
     getOutStorageGoodsList(obj).then(res => {
        this.count = res.data.count;
        this.page = res.data.pageList;
      });
    },
        //详情
      detail(row){
          getDeliverDetail(row.shipmentBillId).then(res=>{
              if(res.code===200){ 
                this.detailData = res.data
                this.editVisibles = true
              }
          })
         
      },
       handleSizeChange(){
          this.form.pageSize = val;
          this._getOutStorageList();
      },
      handleCurrentChange(val){
          this.form.pageIndex = val;
          this._getOutStorageList();
      },
      handleSelectionChange(){
          
      }
 },
    
}
</script>

<style lang="scss" scoped>
  .line-div {
      .small-Idiv{
        margin: 0 auto;
      }
    }
  .i-div {
      cursor: pointer;
    }

  .blue{
    color:#4A99FA;
    cursor: pointer;

  }
</style>