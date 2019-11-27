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
        >
           <el-table-column label="序号" type="index" align="center" width="50">
                
        </el-table-column>
        <el-table-column label="状态" prop="name" align="center" width="120">
                    <template slot-scope="scope">
                        <div v-html="scope.row.status"></div>
                </template>
        </el-table-column>
        <el-table-column label="销售单号" prop="name" align="center">
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

              <div class="txt_left">财务员：{{scope.row.treasurer}}</div>
             </template> 
               
        </el-table-column>
        <el-table-column label="备注" prop="name" align="center" width="200">
              <template slot-scope="scope">  
                        {{scope.row.remark}}
                </template>
        </el-table-column>
        <el-table-column label="操作" prop="name" align="center" width="130" fixed="right">
          <template slot-scope="scope">
            <div class="small-Idiv" @click="createOut(scope.row)"
            v-permit="'invoice:save'">
              <div class="i-div">
                <img src="@/common/images/icon/生成单.png" alt class="operation_img" />
              </div>
              <span style="word-break: keep-all;">生成出货单</span>
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
                > 销售订单【{{this.showNo}}】的商品明细</li>
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
            @saveOutOrder1="saveOutOrder2"></AddOut> 
    </div>   
</template>

<script>
import Goods from "./goods"
import AddOut from './addOut'
import {getOutStorage,getOutStorageGoods,outStorageOrderData} from '@/api/sale/index'
export default {
    data(){
        return{
            getIndex:'',
            addVisibles:false,
              currentIndex:0,
               outOrderData:'',//生成出库单前的初始化数据
             mainIndex:'Goods',
             showNo:'',//显示商品列表需要的编号
            showId:'',
            page:[],//商品列表
            count:0,//总数
             stroageList:[],//列表
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
        Goods,
        AddOut
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
      this._getOutStorage();
      
    },
    methods:{
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
                  
                  //7天后
                    var d1 = new Date();
                    var d2 = new Date(d1);
                    d2.setDate(d1.getDate()+3);
                  var youWant=d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate() + ' ' + d2.getHours() + ':' + d2.getMinutes() + ':' + d2.getSeconds(); 
                    this.form.endTime = youWant    

        },
      //待出货商品列表
      _getOutStorage(data){
        getOutStorage(this.form).then(res=>{
            this.stroageList = res.data.pageList;
            this.form.count = res.data.count;
        })
      },
        //子组件传值
      createClose2: function(data) {
      this.addVisibles = data;
    },
    createClosing2: function(data) {
      this.addVisibles = data;
    },
    saveOutOrder2(data){
      this.addVisibles = data;
      this._getOutStorage();
      this.resetData();
    },
    tabIndex (index) {
      this.currentIndex = index
      
    },
     //重置数据
    resetData(){
      this.getIndex ="";
        this.showNo = '';
        this.count = 0;
        this.page = [];
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
      this.showId = row.spoId;
      this.showNo = row.saleOrderNo;
      
      let obj = {}
      obj.pageIndex = this.goodsData.pageIndex;
      obj.pageSize = this.goodsData.pageSize;
      obj.spoId = this.showId;
       getOutStorageGoods(obj).then(res => {
        this.count = res.data.count;
        this.page = res.data.pageList;
      });
    },
    //生成出库单弹窗
    createOut(row){  
        outStorageOrderData(row.spoId).then(res=>{
            if(res.code===200){
                this.outOrderData =res.data;
                 let arr = this.outOrderData.details;
                arr.forEach(v => {
                  v["warehouseId"] = "";
                  v['balanceCount'] = '';
                  v['warehouseName'] = "";
                });
                let copy1 = JSON.parse(JSON.stringify(arr));
                this.outOrderData.details = copy1;
                console.log(this.outOrderData);
                
                this.addVisibles =true;
                
            }
            
        })
        
        
    },
     //换页
       handleSizeChange(val){
         this.form.pageSize = val;
         this._getOutStorage();
      },
      handleCurrentChange(val){
        this.form.pageIndex = val;
         this._getOutStorage();
      },
      handleSelectionChange(){
        
      }
 },
    
}
</script>

<style lang="scss" scoped>
     .i-div {
      cursor: pointer;
    }
</style>