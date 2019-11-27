<template>
    <div>
     <div class="mcard" style="border:1px solid #d7e0f1">
       <el-table :data="storeList" border 
          @selection-change="handleSelectionChange" 
          
          :row-class-name="tableRowClassName"
          :row-style="selectedHighlight"
          @row-dblclick="AhandleSelectionChange">
        <el-table-column label="序号" type="index" align="center" width="50" ></el-table-column>
        <el-table-column label="状态" prop="name" align="center" width="110">
               <template slot-scope="scope">
                  <div v-html="scope.row.statusTip"></div>
               </template>
        </el-table-column>
        <el-table-column label="销售订单信息" prop="name" align="center" width="225">
                <template slot-scope="scope">
                  <div class="txt_left">销售单号：{{scope.row.saleOrderNo}}</div>
                  <div class="txt_left">平台名称：{{scope.row.projectName}}</div>
                  <div class="txt_left">客户：{{scope.row.customerName}}</div>
                </template>
                
        </el-table-column>
        <el-table-column label="采购单号" prop="name" align="center"  width="150">
                <template slot-scope="scope">
                  {{scope.row.purchaseOrderNo}}
                </template>
        </el-table-column>
        <el-table-column label="入库单号" prop="name" align="center" width="100">
                <template slot-scope="scope">
                  {{scope.row.storageBillNo}}
                </template>
        </el-table-column>
        <el-table-column label="交货日期" prop="name" align="center" >
                <template slot-scope="scope">
                   <div>{{scope.row.distributionTime | date}}</div>
                  <!--   <div>{{scope.row.distributionTimeTip}}</div> -->
                </template>
        </el-table-column>
        <el-table-column label="入库日期" prop="name" align="center" >
                <template slot-scope="scope">
                   <div>{{scope.row.estimatedArrivalDate | date}}</div>
                </template>
        </el-table-column>
        <el-table-column label="供应商信息" prop="name" align="center" width="200">
                <template slot-scope="scope">
                   <div class="txt_left">供应商名称：{{scope.row.supplierName}}</div>
                   <div class="txt_left">联系人：{{scope.row.contact}}</div>
                    <div class="txt_left">电话：{{scope.row.tel}}</div>
                </template>
        </el-table-column>
        <el-table-column label="物流单图片" prop="name" align="center" width="110">
                    <template slot-scope="scope">
                        <span v-if="scope.row.logisticsNoFileUrl" @click="preview(scope.row)" class="blue">
                              查看
                        </span>
                        <span v-if="!scope.row.logisticsNoFileUrl">
                              暂无物流单图片
                        </span>
                    </template>
        </el-table-column>
        <el-table-column label="物流信息" prop="name" align="center" width="234">
                    <template slot-scope="scope">
                       <div class="txt_left">物流公司：{{scope.row.logisticsCompany}}</div>
                       <div class="txt_left">物流单号：{{scope.row.logisticsNo}}</div>
                       <div class="txt_left">物流电话：{{scope.row.logisticsTel}}</div>
                    </template>
        </el-table-column>
         <el-table-column label="跟进人" prop="name" align="center" >
                    <template slot-scope="scope">
                       <div class="txt_left">制单人：{{scope.row.inputUserName}}</div>
                       <div class="txt_left">提交人：{{scope.row.submitter}}</div>
                       <div class="txt_left">采购员：{{scope.row.purchaseUserName}}</div>
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
                > 入库单【{{this.showNo}}】的商品明细</li>
              </ul>
            </div>
            <div class="tabs-content">
              <component :is="mainIndex" :count="count" :page="page" :showId="showId"></component>
          
            </div>
        </div>
        <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                        <span slot="footer" class="dialog-footer"></span>
       </el-dialog>   
    </div>   
</template>

<script>
import {getInStoragedList,inStoragedGoods} from "@/api/purchase/index"
import Goods from "./goods"
export default {
    data(){
        return{
             dialogVisible:false,
            dialogImageUrl:'',
              currentIndex:0,
             mainIndex:'Goods',
             getIndex:'',
             storeList:[],//仓库列表
              showNo:'',//显示商品列表需要的编号
            showId:'',
            page:[],//商品列表
            count:0,//总数
            goodsData:{
                pageIndex:1,
                pageSize:10,
                count:0
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
                      pageIndex:1,
                      pageSize:10,
                      startTime:'',
                      endTime:'',
                      count:0
            },
        }
    },
    components:{
        Goods
    },
    props:["storeData",'total'],
    watch:{
      storeData(val){
        this.storeList =val;
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
      this._getInStoragedList(); 
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
     preview(row){
        this.dialogImageUrl = row.logisticsNoFileUrl;
        this.dialogVisible = true;
      },
    //仓库列表
     _getInStoragedList(){
          getInStoragedList(this.form).then(res=>{
            this.storeList = res.data.pageList;
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
      this.showId = row.storageBillId;
      this.showNo = row.storageBillNo;
      
      let obj = {}
      obj.pageIndex = this.goodsData.pageIndex;
      obj.pageSize = this.goodsData.pageSize;
      obj.storageBillId = this.showId;
       inStoragedGoods(obj).then(res => {
        this.count = res.data.count;
        this.page = res.data.pageList;
      });
    },
     //重置数据
    resetData(){
      this.getIndex ="";
        this.showNo = '';
        this.count = 0;
        this.page = [];
    },
    handleSizeChange(val){
        this.form.pageIndex =val;
        this.resetData();
        this._getInStoragedList();
      },
    handleCurrentChange(val){
        this.form.pageSize =val;
        this.resetData();
        this._getInStoragedList();
      },
      handleSelectionChange(){
        
      }
 },
    
}
</script>

<style lang="scss" scoped>
  .blue{
    color:#4A99FA;
    cursor: pointer;

  }
  /deep/ .el-dialog__headerbtn{
      top:10px;
    }
</style>