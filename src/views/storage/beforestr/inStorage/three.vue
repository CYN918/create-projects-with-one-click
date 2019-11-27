 <template>
 <div> 
   <div class="mcard" style="border:1px solid #d7e0f1">
      <el-table :data="storeList" border 
          @selection-change="handleSelectionChange" 
          stripe
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
        <el-table-column label="采购员" prop="name" align="center" width="100">
                <template slot-scope="scope">
                  {{scope.row.userName}}
                </template>
        </el-table-column>
        <el-table-column label="交货日期" prop="name" align="center" >
                <template slot-scope="scope">
                   <div>{{scope.row.distributionTime | date}}</div>
                    <div>{{scope.row.distributionTimeTip}}</div>
                </template>
        </el-table-column>
        <el-table-column label="供应商信息" prop="name" align="center" width="200">
                <template slot-scope="scope">
                   <div class="txt_left">供应商名称：{{scope.row.supplierName}}</div>
                   <div class="txt_left">联系人：{{scope.row.contact}}</div>
                    <div class="txt_left">电话：{{scope.row.tel}}</div>
                </template>
        </el-table-column>
       
        <el-table-column label="预计到货日期" prop="name" align="center" width="110">
                    <template slot-scope="scope">
                        {{scope.row.estimatedArrivalDate}}
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
        <el-table-column label="操作" align="center"  fixed="right"  width="130">
          <template slot-scope="scope">
            <div class="line-div">
              <div class="small-Idiv" @click="createOrder(scope.row)"
              v-permit="'storage:save'">
                <div class="i-div">
                  <img src="@/common/images/icon/生成采购订单.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;">生成入库单</span>
              </div>
            </div>
            <div class="line-div">
              <div class="small-Idiv" @click="update(scope.row)"
              v-permit="'storage:update'">
                <div class="i-div">
                  <img src="@/common/images/icon/更新物流.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;" >上传物流信息</span>
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
                > 采购订单【{{this.showNo}}】的商品明细</li>
              </ul>
            </div>
            <div class="tabs-content">
              <component :is="mainIndex" :count="count" :page="page" :showId="showId"></component>
          
            </div>
    </div>
         <AddIn
          :addVisibles="addVisibles"  
          :storageData="storageData"
          :ruleForm="ruleForm"
          :options1="options1"
          :purchaseOrderId="purchaseOrderId" 
          :warehouseList="warehouseList"
          :logisticsList="logisticsList"
          :sysuserName="sysuserName"
          @createClose1="createClose2"
            @createClosing1="createClosing2"
            @createStorage1="createStorage2"></AddIn>
        <Update
          :updateVisibles="updateVisibles"  
          :storageData="storageData"
          :logisticsList="logisticsList" 
          @createCloseU="createClose3"
            @createClosingU="createClosing3"
            @updateStorage1="updateStorage2"></Update>  
        <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                        <span slot="footer" class="dialog-footer"></span>
       </el-dialog>      
    </div>

</template>

<script>
import Goods from "./goods"
import AddIn from './addIn'
import Update from './update'
import {getAllOrganizational,} from "@/api/permissions/index";
import {inStorageList,inStorageGoods,inStorageData,logisticsSelect,warehouseSelect} from "@/api/purchase/index"
export default {
    data(){
        return{
            dialogVisible:false,
            dialogImageUrl:'',
            addVisibles:false,//生成出库单
            updateVisibles:false,//更新物流        
            storeList:[],//仓库列表
            currentIndex:0,
            sysuserName:'',//当前用户名
            pageSize1:'',
            mainIndex:'Goods',
            getIndex:'',
            showNo:'',//显示商品列表需要的编号
            showId:'',
            purchaseOrderId:'',
            page:'',//商品列表
            count:0,//总数
            storageData:'',//生成入库单前的数据
            warehouseList:'',//入货仓库下拉列表
            logisticsList :'',//物流公司列表
             //组织架构
            ruleForm: {
              organizeName: "",
              description: "",
              parentId: null,
              organizeId: null
            },
            options1:[],
            // /
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
        AddIn,
        Update
    },
    props:["storeData",'total'],
    watch:{
      storeData(val){
        this.storeList =val;
        this.getIndex ="";
        this.showNo = '';
        this.form.pageIndex = 1;
        this.count = 0;
        this.page = [];
      },
      total(val){
        this.form.count = val;
      },
    },
     created(){
      this.timer();
      this._inStorageList(); 
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
               
               //7天后
                var d1 = new Date();
                var d2 = new Date(d1);
                d2.setDate(d1.getDate()+3);
               var youWant=d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate() + ' ' + d2.getHours() + ':' + d2.getMinutes() + ':' + d2.getSeconds(); 
                this.form.endTime = youWant    

    },
    //获取当前用户信息
     getName(){
        var books=localStorage.getItem("user");//得到字符串
        var obj=JSON.parse(books); 
        this.sysuserName = obj.data.sysuserName      
        
    },
     preview(row){
        this.dialogImageUrl = row.logisticsNoFileUrl;
        this.dialogVisible = true;
      },
    //仓库列表
     _inStorageList(){

          inStorageList(this.form).then(res=>{
            this.storeList = res.data.pageList;
            this.form.count = res.data.count;
          })

      
    },
    
        //子组件传值
      //生成入库单
      createClose2: function(data) {
      this.addVisibles = data;
      this. ruleForm= {};
      this.options1 = [];
    },
    createClosing2: function(data) {
      this.addVisibles = data;
      this. ruleForm= {};
      this.options1 = [];
    },
    createStorage2(data){
      this.addVisibles = data;
      this. ruleForm= {};
      this.options1 = [];
      this._inStorageList();
      this.resetData();
    },
    //更新物流
     createClose3: function(data) {
      this.updateVisibles = data;
    },
    createClosing3: function(data) {
      this.updateVisibles = data;
    },
    updateStorage2(data){
      this.updateVisibles =data;
      this._inStorageList();
      this.resetData();
    },
         tabIndex (index) {
      this.currentIndex = index
      
    },
     //生成入库单
    createOrder(row){    
        this.addVisibles =true; 
        this.purchaseOrderId = row.purchaseOrderId;
        inStorageData(row.purchaseOrderId).then(res=>{
              this.storageData = res.data;
        })  
        logisticsSelect().then(res=>{
            this.logisticsList = res.data;           
        }) 
        warehouseSelect().then(res=>{
           this.warehouseList = res.data;
        }) 
        getAllOrganizational().then(res => {
          let arr = [];
          arr.push(res.data);
          this.transleteData(arr, this.options1);
          this.IterationDelateMenuChildren(this.options1);
        });
        this.getName();
    },
     transleteData(data, arr) {
      data.forEach(item => {
        if (!item.parentId) {
          item.parentId = 0;
          item.parentName = "所有部门";
        }
        const msg = {
          id: item.organizeId,
          label: item.organizeName,
          value: item.organizeId,
          children: item.childNodes ? [] : null,
          isLeaf: item.childNodes ? false : true
        };
        if (item.childNodes && item.childNodes.length > 0) {
          this.transleteData(item.childNodes, msg.children);
        }
        arr.push(msg);
      });
      return arr;
    },
    IterationDelateMenuChildren(arr) {
      if (arr.length) {
        for (let i in arr) {
          if (arr[i].children.length) {
            this.IterationDelateMenuChildren(arr[i].children);
          } else {
            delete arr[i].children;
          }
        }
      }
      return arr;
    },
    update(row){
        this.updateVisibles = true;
         inStorageData(row.purchaseOrderId).then(res=>{
              this.storageData = res.data;
        }) 
         logisticsSelect().then(res=>{
            this.logisticsList = res.data;           
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
      this.showNo = row.purchaseOrderNo;
      
      let obj = {}
      obj.pageIndex = this.goodsData.pageIndex;
      obj.pageSize = this.goodsData.pageSize;
      obj.purchaseOrderId = this.showId;
       inStorageGoods(obj).then(res => {
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
    //换页
       handleSizeChange(val){
         this.form.pageSize = val;
         this.resetData();
         this._inStorageList();
      },
      handleCurrentChange(val){
        this.form.pageIndex = val;
        this.resetData();
         this._inStorageList();
      },
      handleSelectionChange(){
        
      }
 },
    
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
    margin-bottom: 10px;
  .small-Idiv{
      margin: 0 auto;
  }
}
.line-div:nth-of-type(2) {
  margin: 0;
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
.tabs-header li {
  padding:0 28px !important;
}
.blue{
    color: #4A99FA;
    cursor: pointer;
}
 /deep/ .el-dialog__headerbtn{
      top:10px;
    }
</style>