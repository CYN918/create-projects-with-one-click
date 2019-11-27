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
        <el-table-column label="序号" type="index" align="center" width="50">
                
        </el-table-column>
        <el-table-column label="状态" prop="name" align="center" width="120">
                    <template slot-scope="scope">
                        <div v-html="scope.row.status"></div>
                </template>
        </el-table-column>
        <el-table-column label="出货单号" prop="name" align="center">
                  <template slot-scope="scope">
                    {{scope.row.invoiceBillNo}}
                </template>
        </el-table-column>
        <el-table-column label="关联销售单号" prop="name" align="center">
                  <template slot-scope="scope">
                    {{scope.row.saleOrderNo}}
                </template>
        </el-table-column>
        <el-table-column label="订单金额" prop="name" align="center">
                    <template slot-scope="scope">
                    {{scope.row.totalPrice}}
                </template>

        </el-table-column>
        <el-table-column label="客户信息" prop="name" align="center" width="250">
          <template slot-scope="scope">
              
              <div class="txt_left">客户名称：{{scope.row.customerName}}</div>
              <div class="txt_left">联系人：{{scope.row.customerContact}}</div>
              <div class="txt_left">联系电话：{{scope.row.tel}}</div>
              <div class="txt_left">手机：{{scope.row.phone}}</div>
          </template>
        </el-table-column>
        <el-table-column label="出货日期" prop="name" align="center" width="140">
               <template slot-scope="scope">  
                        {{scope.row.shipmentDate | date}}
                </template>
        </el-table-column>
        <el-table-column label="跟进人" prop="name" align="center" width="150">
            <template slot-scope="scope"> 
              <div class="txt_left">销售员：{{scope.row.saleUserName}}</div>
              <div class="txt_left">送货员：{{scope.row.deliveryUserName}}</div>
              <div class="txt_left">财务员：{{scope.row.treasurer}}</div>
             </template> 
               
        </el-table-column>
        <el-table-column label="备注" prop="name" align="center" width="200">
              <template slot-scope="scope">  
                        {{scope.row.remark}}
                </template>
        </el-table-column>
        <el-table-column label="操作" prop="name" align="center" width="150" fixed="right">
          <template slot-scope="scope">
            <div class="line-div">
              <div class="small-Idiv" @click="createOut(scope.row)"
              v-permit="'invoiceBill:save'">
                <div class="i-div">
                  <img src="@/common/images/icon/生成单.png" alt class="operation_img" />
                </div>
                <span style="word-break: keep-all;">生成出库单</span>
              </div>
              <div class="small-Idiv" @click="deleteA(scope.row)"
              v-permit="'invoice:delete'">
                <div class="i-div">
                  <img src="@/common/images/icon/回收站.png" alt class="operation_img" />
                </div>
                <span style="word-break: keep-all;">删除</span>
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
          :page-sizes="[10, 30, 50, 100]"
          :page-size="form.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="form.count"
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
          >出货单【{{this.showNo}}】的商品明细</li>
        </ul>
      </div>
      <div class="tabs-content">
        <component :is="mainIndex" :count="count" :page="page" :showId="showId"></component>
      </div>
    </div>
    <AddOut
      :addVisibles="addVisibles"
      :outOrderData="outOrderData"
      @createClose1="createClose2"
      @createClosing1="createClosing2"
      @saveOutOrder1="saveOutOrder2"
    ></AddOut>
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
import AddOut from "./addOut";
import { throttleTipPop } from "@/utils/functions.js";
import {getOrderList,getOrderGoodsList,outStorageFormData,deleteOrderList} from "@/api/sale/index";
export default {
  data() {
    return {
      addVisibles: false,
      currentIndex: 0,
      showNo: "", //显示商品列表需要的编号
      showId: "",
      getIndex: "",
      outOrderData: "", //生成出库单前的初始化数据
      deleteVisible: false, //删除窗口
      invoiceBillId:'',//出货清单ID
      page: [], //商品列表
      count: 0, //总数
      stroageList: [], //列表
      mainIndex: "Goods",
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
    AddOut
  },
  created() {
    this._getOrderList();
  },
   props: ["storeData", "total"],
  watch: {
    storeData(val) {
      this.stroageList = val;
      this.getIndex = "";
      this.showNo = "";
      this.count = 0;
      this.page = [];
      console.log(val);
    },
    total(val) {
      this.form.count = val;
    }
  },
  methods: {
    //子组件传值
    createClose2: function(data) {
      this.addVisibles = data;
    },
    createClosing2: function(data) {
      this.addVisibles = data;
    },
    saveOutOrder2(data){
      this.addVisibles = data;
      this._getOrderList();
      this.resetData();
    },
     //重置数据
    resetData(){
      this.getIndex ="";
        this.showNo = '';
        this.count = 0;
        this.page = [];
    },
    tabIndex(index) {
      this.currentIndex = index;
    },
    //待出货商品列表
    _getOrderList() {
      getOrderList(this.form).then(res => {
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
      this.showId = row.invoiceBillId;
      this.showNo = row.invoiceBillNo;

      let obj = {};
      obj.pageIndex = this.goodsData.pageIndex;
      obj.pageSize = this.goodsData.pageSize;
      obj.invoiceBillId = this.showId;
     getOrderGoodsList(obj).then(res => {
        this.count = res.data.count;
        this.page = res.data.pageList;
      });
    },
     //生成出库单弹窗
    createOut(row) {
      outStorageFormData(row.invoiceBillId).then(res => {
        if (res.code === 200) {
          this.outOrderData = res.data;
          let arr = this.outOrderData.details;
          arr.forEach(v => {
            v["warehouseId"] = "";
            v["balanceCount"] = "";
            v["warehouseName"] = "";
          });
          let copy1 = JSON.parse(JSON.stringify(arr));
          this.outOrderData.details = copy1;
          console.log(this.outOrderData);

          this.addVisibles = true;
        }
      });
    },
    //删除
    deleteA(row) {
      this.deleteVisible = true;
      this.invoiceBillId = row.invoiceBillId;
    },
    deleteOrder() {
        deleteOrderList(this.invoiceBillId).then(res=>{
          if(res.code===200){
                throttleTipPop(this, "success", "删除出库清单成功", 2000);
                this.deleteVisible = false;
                this._getOrderList();
                this.resetData();
          }
      })
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleSelectionChange() {}
  }
};
</script>

<style lang="scss" scoped>
.i-div {
  cursor: pointer;
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
.line-div {
   overflow: hidden;
      .small-Idiv{
        width: 50%;
        padding-top: 10px;
        float: left;

      } 
}
</style>