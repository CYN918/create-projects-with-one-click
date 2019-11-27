 <template>
 <div> 
   <div class="mcard" style="border:1px solid #d7e0f1">
      <div style="margin-bottom:10px;">
        <el-button type="primary" size="small" @click="bulk()">批量入库</el-button>
      </div>
       <el-table :data="storeList" border 
          @selection-change="handleSelectionChange" 
          stripe
          :row-class-name="tableRowClassName"
          :row-style="selectedHighlight"
          @row-dblclick="AhandleSelectionChange">
        <el-table-column type="selection" width="40"> </el-table-column>
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
                   <div>{{scope.row.distributionTime}}</div>
                  <!--   <div>{{scope.row.distributionTimeTip}}</div> -->
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
        <el-table-column label="操作" align="center"  fixed="right"  width="130">
          <template slot-scope="scope">
            <div class="line-div">
              <div class="small-Idiv" @click="submitIn(scope.row)"
              v-permit="'storage:submit'">
                <div class="i-div">
                  <img src="@/common/images/icon/提交入库.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;">提交入库</span>
              </div>
              <div
                  class="small-Idiv"
                  @click="deleteStorage(scope.row)"
                     v-permit="'storage:delete'">
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
         <AddIn
          :addVisibles="addVisibles"  
          :storageData="storageData"
          :ruleForm="ruleForm"
          :options1="options1"
          :warehouseList="warehouseList"
          :logisticsList="logisticsList"
          :sysuserName="sysuserName"  
          @createClose1="createClose2"
            @createClosing1="createClosing2"
            @createStorage1="createStorage2"></AddIn>

        <!-- 删除销售订单 -->
          <el-dialog :visible.sync="deleteVisible" width="20%" title="提示" style="top:20%">
            <div class="mail-fitter" style="padding:20px 0;background:#fff;">
                <div class="search-base">
                      <div class="goods-fitter">
                        <el-row>
                            <div class="tip">
                              <img class="tipImg" src="@/common/images/组 180.png" alt=""/>
                                <span>温馨提示：一经删除不可恢复记录！</span><br/>
                                <span>你确定要删除所选内容吗？</span>
                            </div>

                        </el-row>
                      </div>  
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="danger" @click="deleteVisible = false" size="small">取 消</el-button>
              <el-button type="primary" @click="deleteStore()" size="small">确 定</el-button>
            </span>
          </el-dialog>
       <!-- 批量入库 -->
          <el-dialog :visible.sync="bulkVisible" width="20%" title="提示" style="top:20%">
            <div class="mail-fitter" style="padding:20px 0;background:#fff;">
                <div class="search-base">
                      <div class="goods-fitter">
                        <el-row>
                            <div class="tip">
                              <img class="tipImg" src="@/common/images/icon/确定推送.png" alt=""/>
                              
                                <span>你确定要批量入库吗？</span>
                            </div>

                        </el-row>
                      </div>  
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="danger" @click="bulkVisible = false" size="small">取 消</el-button>
              <el-button type="primary" @click="bulkStore()" size="small">确 定</el-button>
            </span>
          </el-dialog>
            <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                        <span slot="footer" class="dialog-footer"></span>
       </el-dialog>    
       
    </div>
   
</template>

<script>
import Goods from "./goods"
import AddIn from './addIn'
import {getInStorageOrderList,
inStoragedGoods,
inStorageData,
logisticsSelect,
warehouseSelect,
} from '@/api/purchase/index'
import {getAllOrganizational,} from "@/api/permissions/index";
import {submitStorageData,delelteWarehousing,bulkSingleWarehousing} from '@/api/storage/index'
import { throttleTipPop } from "@/utils/functions.js";
export default {
    data(){
        return{
            bulkVisible:false,//批量入库
            dialogVisible:false,
            dialogImageUrl:'',
            addVisibles:false,//生成出库单
            updateVisibles:false,//更新物流
             deleteVisible: false,//删除弹框
             storageBillId:'',
              currentIndex:0,
             mainIndex:'Goods',
              getIndex:'',
              billIds:[],
             storeList:[],//仓库列表
              showNo:'',//显示商品列表需要的编号
            showId:'',
            page:[],//商品列表
            count:0,//总数
            storageData:'',//生成入库单前的数据
            warehouseList:'',//入货仓库下拉列表
            logisticsList :'',//物流公司列表
            sysuserName:'',//当前用户名
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
    },
     props:["storeData",'total'],
    watch:{
      storeData(val){
        this.storeList =val;
        this.form.pageIndex = 1;
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
      this._getInStorageOrderList();
    },
    methods:{
         tabIndex (index) {
            this.currentIndex = index
       },
     //获取当前用户信息
     getName(){
        var books=localStorage.getItem("user");//得到字符串
        var obj=JSON.parse(books); 
        this.sysuserName = obj.data.sysuserName      
        
    },
     //提交入库
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
      this._getInStorageOrderList();
      this.resetData();
    },
    //预览
     preview(row){
        this.dialogImageUrl = row.logisticsNoFileUrl;
        this.dialogVisible = true;
      },
     //仓库列表
     _getInStorageOrderList(){
          getInStorageOrderList(this.form).then(res=>{
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
         tabIndex (index) {
      this.currentIndex = index
      
    },
    //删除弹窗
     deleteStorage(row){
       this.deleteVisible =true;
      this.storageBillId = row.storageBillId
       
     },
     //删除入库单
     deleteStore(){
         delelteWarehousing(this.storageBillId).then(res=>{
         if(res.code===200){
            throttleTipPop(this, "success","删除入库单成功", 2000);
            this.deleteVisible = false;
            this._getInStorageOrderList();
            this.resetData();
         }
       })
     },
    //提交入库
    submitIn(row){   
          this.addVisibles =true; 
        this.storageBillId = row.storageBillId;
        submitStorageData(row.storageBillId).then(res=>{
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
    //批量入库
    bulk(){
      if(this.billIds.length>0){
      this.bulkVisible = true;
      }else{
        throttleTipPop(this, "warning","请选择需要批量入库的订单", 2000);
      }
      
    },
    bulkStore(){
        bulkSingleWarehousing(this.billIds).then(res=>{
              if(res.code===200) {
                  throttleTipPop(this, "success","批量入库单成功", 2000);
                  this.bulkVisible = false;
                  this._getInStorageOrderList();              
                  }
      })
    },
    update(row){
        this.updateVisibles = true;
    },
    //重置数据
    resetData(){
      this.getIndex ="";
        this.showNo = '';
        this.count = 0;
        this.page = [];
    },
       handleSizeChange(val){
          this.form.pageSize = val;
          this.resetData();
          this._getInStorageOrderList();
          
      },
      handleCurrentChange(val){
          this.form.pageIndex = val;
          this.resetData();
          this._getInStorageOrderList();
      },
      handleSelectionChange(row){
          let arr =[];
          for(let i=0;i<row.length;i++){
            arr.push(row[i].storageBillId)
          }
          console.log(arr);
          this.billIds = arr;
          
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
    overflow: hidden;
      .small-Idiv{
        width: 50%;
        padding-top: 10px;
        float: left;

      } 
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
  /deep/ .el-dialog__headerbtn{
      top:10px;
    }
</style>