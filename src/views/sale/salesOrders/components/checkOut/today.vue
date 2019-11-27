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
        <el-table-column label="状态" prop="name" align="center" width="120">
          <template slot-scope="scope">
            <div v-html="scope.row.deliveryStatus"></div>
          </template>
        </el-table-column>
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
        <el-table-column label="备注" prop="name" align="center" width="200">
          <template slot-scope="scope">{{scope.row.remark}}</template>
        </el-table-column>
        <el-table-column label="操作" prop="name" align="center" width="130" fixed="right">
          <template slot-scope="scope">
            <div class="line-div">
              <div class="small-Idiv" @click="delivery(scope.row)"
              v-permit="'shipment:save'">
                <div class="i-div">
                  <img src="@/common/images/icon/发货绿.png" alt class="operation_img" />
                </div>
                <span style="word-break: keep-all;">发货</span>
              </div>
              <div class="small-Idiv" @click="detail(scope.row)"
              v-permit="'shipment:detail'">
                <div class="i-div">
                  <img src="@/common/images/icon/查看详情.png" alt class="operation_img" />
                </div>
                <span style="word-break: keep-all;">详情</span>
              </div>
            </div>
          <!--   <div class="line">
              <div class="small-Idiv" @click="deleteA(scope.row)">
                <div class="i-div">
                  <img src="@/common/images/icon/回收站.png" alt class="operation_img" />
                </div>
                <span style="word-break: keep-all;">删除</span>
              </div>
            </div> -->
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
          >出货单【{{this.showNo}}】的商品明细</li>
        </ul>
      </div>
      <div class="tabs-content">
        <component :is="mainIndex" :count="count" :page="page" :showId="showId"></component>
      </div>
    </div>
    <DetailOut
      :editVisibles="editVisibles"
      @createClose1="createClose2"
      @createClosing1="createClosing2"
    ></DetailOut>

    <Delivery
      :deliveryVisibles="deliveryVisibles"
      :logisticsData="logisticsData"
      :deliverList="deliverList"
      :sendId='sendId'
      :deliveryGoods="deliveryGoods2"
      @createCloseD="createClose3"
      @createClosingD="createClosing3"
    ></Delivery>
    <!-- 删除销售订单 -->
    <el-dialog :visible.sync="deleteVisible" width="20%" title="提示" style="top:20%">
      <div class="mail-fitter" style="padding:20px 0;background:#fff;">
        <div class="search-base">
          <div class="goods-fitter">
            <el-row>
              <div class="tip">
                <img class="tipImg" src="@/common/images/组 180.png" alt />
                <span>温馨提示：一经删除不可恢复记录！</span>
                <br />
                <span>你确定要删除所选内容吗？</span>
              </div>
            </el-row>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="deleteVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="deleteOrder()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Goods from "./goods";
import DetailOut from "./detailOut";
import Delivery from "./delivery";
import { getGoodsOrderList,getShipmentList,getDeliverData } from "@/api/sale/index";
import {logisticsSelect} from '@/api/purchase/index'
export default {
  data() {
    return {
      deliveryVisibles: false,
      editVisibles: false,
      deleteVisible: false, //删除窗口
      currentIndex: 0,
      mainIndex: "Goods",
      getIndex: "",
      sendId:'',//出库单ID
      logisticsData:[],//物流下拉列表
      deliverList: "", //发货前的初始化数据
      showNo: "", //显示商品列表需要的编号
      showId: "",
      page: [], //商品列表
      count: 0, //总数
      stroageList: [], //列表
      goodsData: {
        pageIndex: 1,
        pageSize: 10,
        count: 0
      },
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
      form: {
        pageIndex: 1,
        pageSize: 10,
        startTime: "",
        endTime: "",
        count: 0
      }
    };
  },
  components: {
    Goods,
    DetailOut,
    Delivery
  },
   props:["storeData",'total'],
    watch:{
      storeData(val){
        this.stroageList =val;
        this.getIndex ="";
        this.showNo = '';
        this.count = 0;
        this.page = [];
        
      },
      total(val){
        this.form.count = val;
      }
    },
      created(){
       this.timer();
     this._getGoodsOrderList();
    },
    methods:{
    tabIndex (index) {
      this.currentIndex = index
      
    },
    //获取当前时间
    timer(){
                let date = new Date();
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
               this.form.startTime = y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;  
               
                 //今天
                const start = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
                const end =start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate() + ' ' + start.getHours() + ':' + start.getMinutes() + ':' + start.getSeconds(); 
                this.form.endTime = end;  

    },
    //子组件传值
    createClose2: function(data) {
      this.editVisibles = data;
    },
    createClosing2: function(data) {
      this.editVisibles = data;
    },
    //发货
    createClose3: function(data) {
      this.deliveryVisibles = data;
    },
    createClosing3: function(data) {
      this.deliveryVisibles = data;
    },
    deliveryGoods2(data){
      this.deliveryVisibles =data;
      this._getGoodsOrderList();
      this.resetData();
    },
    //重置数据
    resetData(){
      this.getIndex ="";
        this.showNo = '';
        this.count = 0;
        this.page = [];
    },
    //出库单列表
    _getGoodsOrderList() {
      getGoodsOrderList(this.form).then(res => {
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
      this.showNo = row.invoiceBillNo;

      let obj = {};
      obj.pageIndex = this.goodsData.pageIndex;
      obj.pageSize = this.goodsData.pageSize;
      obj.shipmentBillId = this.showId;
     getShipmentList(obj).then(res => {
        this.count = res.data.count;
        this.page = res.data.pageList;
      });
    },
    //发货
    delivery(row) {
      logisticsSelect().then(res=>{
        this.logisticsData = res.data;
      })
      this.sendId = row.shipmentBillId;
      getDeliverData(row.shipmentBillId).then(res=>{
        if(res.code===200){
          this.deliverList = res.data;
          
          this.deliveryVisibles = true;
        }
      })
      
     
    },

    //详情
    detail(row) {
      this.$router.push({ name: "OutOrder", query: { id: row.shipmentBillId } });
    },
    //删除
    deleteA(row) {
      this.deleteVisible = true;
    },
    deleteOrder() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    handleSelectionChange() {}
  }
};
</script>

<style lang="scss" scoped>
.line-div {
  .small-Idiv {
    float: left;
    margin-left: 12px;
  }
  .small-Idiv:nth-of-type(1) {
    margin-right: 10px;
  }
}
.i-div {
  cursor: pointer;
}

.blue {
  color: #4a99fa;
  cursor: pointer;
}
/deep/ .el-dialog__headerbtn {
  top: 10px;
}
.tip {
  margin-top: -30px;
  text-align: center;
  line-height: 22px;
  .tipImg {
    position: relative;
    left: -16px;
    top: 28px;
  }
}
</style>