<template>
  <div id="purchaseApply">
    <div class="margin0">
      
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form label-width="100px" size="small">
              <div class="search-wrapper">
                <h4 class="title">库存查询</h4>
                <div class="search-base">
                  <el-row>
                   <el-col :span="5">
                      <el-col :span="22">
                        <el-form-item label="选择仓库：">
                          <el-select v-model="tableDatas.warehouseId" placeholder="请选择" style="width:100%">
                                <el-option
                                  v-for="(item,index) in storeData"
                                  :key="index"
                                  :label="item.name"
                                  :value="item.warehouseId">
                                </el-option>
                              </el-select>
                        </el-form-item>
                      </el-col>
                 </el-col>
                    
                   <el-col :span="5">
                      <el-col :span="22">
                        <el-form-item label="出库状态：">
                          <el-select v-model="tableDatas.status" placeholder="请选择" style="width:100%">
                                <el-option
                                  v-for="item in options2"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                        </el-form-item>
                      </el-col>
                 </el-col>
                    <el-col :span="5" >
                        <el-form-item label="商品名称：">
                                <el-col :span="21">
                                    <el-input v-model="tableDatas.goodsName" placeholder="请输入商品名称"></el-input>
                                </el-col>
                            </el-form-item>
                    </el-col>
                    <el-col :span="5" >
                        <el-form-item label="商品货号：">
                                <el-col :span="21">
                                    <el-input v-model="tableDatas.goodsSn" placeholder="请输入商品货号"></el-input>
                                </el-col>
                            </el-form-item>
                    </el-col>
                    <el-col :span="2" >
                          <el-button type="primary" size="small" @click='searchOrder()' >查询</el-button>
 
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      
        <div class="mcard" style="border:1px solid #d7e0f1">
          <div class="mbottom">
   
          </div>
          
          <el-table :data="storageList" border 
          @selection-change="handleSelectionChange" 
          stripe
          :row-class-name="tableRowClassName"
          :row-style="selectedHighlight"
          @row-dblclick="AhandleSelectionChange">
          
            <el-table-column label="序号" type="index" align="center"  width="50"></el-table-column>
            <el-table-column label="图样" type="index" align="center"  width="150">
                  <template slot-scope="scope">
                    <img  :src="scope.row.goodsImgUrl" class="showImg" alt="" v-if="scope.row.goodsImgUrl"/>
                      <img  src="@/common/images/缺省页.jpg" class="showImg" alt="" v-if="!scope.row.goodsImgUrl"/>
                  </template>
            </el-table-column>
            <el-table-column label="商品信息" prop="name" align="center"  width="300">
                      <template slot-scope="scope">
                        <div class="txt_left" >
                                商品名称：{{scope.row.goodsName}}
                            </div>
                          <div class="txt_left" >
                                货号：{{scope.row.goodsSn}}
                            </div>
                          <div class="txt_left" >
                                型号：{{scope.row.modelNumber}}
                            </div>
                          <div class="txt_left" >
                                品牌：{{scope.row.brandName}}
                            </div>
                          <div class="txt_left" >
                                SKU：{{scope.row.skuId}}
                            </div>   
                      </template>
            </el-table-column>
            <el-table-column label="规格尺寸" prop="name" align="center"  width="230">
                      <template slot-scope="scope">                 
                                {{scope.row.specSize}}                      
                      </template>
            </el-table-column>

            <el-table-column label="单位" prop="name" align="center" width="100">
                   <template slot-scope="scope">
                     {{scope.row.deliveryDate}}

                   </template>
            </el-table-column>
            <el-table-column label="入库数量" prop="name" align="center">
                    <template slot-scope="scope">
                          {{scope.row.inCount}}
                    </template>
            </el-table-column>
             <el-table-column label="已出库数量" prop="name" align="center">
                    <template slot-scope="scope">
                         {{scope.row.outCount}}
                    </template>
            </el-table-column>
            <el-table-column label="剩余实际库存" prop="name" align="center">
                    <template slot-scope="scope">
                         {{scope.row.balanceCount}}
                    </template>
            </el-table-column>
            <el-table-column label="仓库" prop="name" align="center">
                    <template slot-scope="scope">
                         {{scope.row.warehouseName}}
                    </template>
            </el-table-column>
            
            <el-table-column label="操作" align="center" fixed="right" width="110">
              <template slot-scope="scope">
                <div class="line-div">
              
                  <div
                    class="small-Idiv"
                    @click="setting(scope.row)"
                    v-permit="'gs_setting:update'"
                  >
                    <div class="i-div">
                      <img src="@/common/images/icon/库存.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;">安全库存设置</span>
                  </div>
                </div>
                
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination">
            <el-pagination
              @size-change="getHandleSizeChange"
              @current-change="getHandleCurrentChange"
              :current-page="tableDatas.pageIndex"
              :page-sizes="[5,10,30,50]"
              :page-size="tableDatas.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableDatas.total"
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
             
            >库存明细</li>
           <!--  <li
              class="sale"
              @click="tabIndex(0)"
              :class="currentIndex===0 ? 'active' : ''"
              v-show="this.showNo"
            >【{{this.showNo}}】的商品明细</li> -->
          </ul>
        </div>
        <div class="tabs-content">
          <component :is="mainIndex" :count="count" :page="page" :spoId="spoId" :goodsId="goodsId" :skuId="skuId"></component>
        </div>
      </div>
      <!-- 安全库存设置 -->
        <el-dialog :visible.sync="addVisible" width="68%" :before-close="addClosing">
          <div class="goods-fitter" style="margin-bottom:20px">
            <el-form label-width="100px" size="small">
              <div class="search-wrapper">
                <h4 class="title">安全库存</h4>
              </div>
            </el-form>
          </div>
            <div class="mcard1">
                
                    <div class="mcard">
            
                        <!-- 添加商品商品展示 -->
                      <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%"
                        border
                        ref="elTable"
                        class="goods_index"
                      >
                        <el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
                          <el-table-column label="图样" align="center" width="120">
                              <template slot-scope="scope">
                                    <div
                                      class="image"
                                      v-if="scope.row.goodsImgUrl"
                                    >
                                      <img
                                        :src="scope.row.goodsImgUrl"
                                        width="95"
                                        height="95"
                                        alt=""
                                      />
                                    </div>
                                    
                                    <img  src="@/common/images/缺省页.jpg" 
                                        width="95"
                                        height="95"
                                       alt="" v-if="!scope.row.goodsImgUrl"/>
                              </template>
                        </el-table-column>
                        <el-table-column label="商品信息" align="center" width="300">
                          <template slot-scope="scope">
                            <div>
                              <div class="txt_left" >商品名称：{{scope.row.goodsName}}</div>
                              <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                              <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                              <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                              <div class="txt_left">SKU：{{scope.row.skuId}}</div>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column label="规格尺寸" align="center" width="220">
                          <template slot-scope="scope">
                            
                              <div v-html="scope.row.specSize"></div> 
                            
                          
                          </template>
                        </el-table-column>
                        <el-table-column label="单位" align="center" >
                              <template slot-scope="scope">
                                  {{scope.row.unit}}
                              </template>
                        </el-table-column>
                        <el-table-column label="仓库" align="center" >
                              <template slot-scope="scope">
                                  {{scope.row.warehouseName}}
                              </template>
                        </el-table-column>
                        <el-table-column label="库存上限" align="center" >
                              <template slot-scope="scope">
                                <el-input v-model="scope.row.limitQuantity" size="small"></el-input>
                              </template>
                        </el-table-column>
                        <el-table-column label="安全库存量" align="center" >
                              <template slot-scope="scope">
                                  <el-input v-model="scope.row.safeQuantity" size="small"></el-input>
                              </template>
                        </el-table-column>
                   
                            
                      </el-table>
                      <div class="pagination">
                        <el-pagination
                          @size-change="addHandleSizeChange"
                          @current-change="addHandleCurrentChange"
                          :current-page="formDatas.pageIndex"
                          :page-sizes="[2, 5, 10, 50]"
                          :page-size="formDatas.pageSize"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="formDatas.total"
                        ></el-pagination>
                      </div>
                    </div>
        </div>
         <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="addClose" size="small">关 闭</el-button>
            <el-button type="primary" @click="saveGoods1()" size="small">保存</el-button>
          </span>
        </el-dialog>
    
        </div>

  </div>
</template>

<script>
import { getErpGoods } from "@/api/product/index";
import { getAllcustomer } from "@/api/customer";
import {getStorage,getReserveList,getReserveGoodsList,getReserveSetting,edittReserveSetting} from '@/api/storage/index'
import { throttleTipPop } from "@/utils/functions.js";
import AccountOrder from './oreder'
/* import AddContract from './addContract' */
export default {
  data() {
    return {
      dataArr: [],
      addVisible:false,
      salesUser:'',
      mainIndex:'AccountOrder',
      currentIndex:0,
      storageList:[],//仓库列表
      page:[],//商品明细分页
      count:[],//商品明细总数
      goodsId:'',
      skuId:'',
      getIndex:'',
      spoId:'',//商品明细ID
      storeData:[],
      closeNo: "",
      showNo:'',//显示商品详情列表需要编号
      deleteId:'',
      customerData: [],
      productList:[],//产品清单
      orderPage:'',
      options2:[
           {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "库存归零商品"
        },
        {
          value: 2,
          label: "未出库商品"
        },
      ],
      formDatas: { //商品明细分页
        pageIndex: 1,
        pageSize: 2,
        total: 0,
      },
      formData: {
        current_page: 1,
        page_size: 2,
        total_count: 0,
        goodsName1:'',
      },
      selectData: [],
      goodsData: [],
      list: [], //客户列表
      elTable:[],
      tableData:[],
      tableDatas: {
        pageIndex: 1,
        sizes: [10, 20, 50, 100],
        pageSize: 10,
        total: 0,
        goodsName:'',//商品名称
        goodsSn:'',//商品货号
        status:'',//出库状态
        warehouseId:'',//仓库ID
      },
      rules: {
        partyA: [{ required: true, message: "此项为必填项", trigger: "blur" }],
        partyAAddress: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ]
      
      }
    };
  },
  created() {

    this._getReserveList();
    this._getStorage();
  },
  computed: {
    total1(){
      let totals = 0
      let _this = this
      if(_this.goodsData.length>0){
          for(var i = 0;i<_this.goodsData.length;i++){
            if(_this.goodsData[i].total){
              totals+=parseFloat(_this.goodsData[i].total)
            }else{
              totals = 0
            }
      }
        
      }
        return totals
      
    }
  },
  watch:{
    
    //监听数组中值变化
    goodsData:{
      handler(newVal, oldVal) {
      if(newVal){
        for(let i=0;i<newVal.length;i++){
          if(Number(newVal[i].num)>=0&&Number(newVal[i].unitPrice)>=0){
            newVal[i].total = Number(newVal[i].num)*Number(newVal[i].unitPrice)        
          }   
        }
      }
    },
    deep: true
    },
     "tableDatas.signDate": {
      handler(val, old) {
        if(val===null){
            this.tableDatas.startTime = '';
        this.tableDatas.endTime = '';
        }else{
            this.tableDatas.startTime = val[0];
        this.tableDatas.endTime = val[1];
        }
        

      },
      deep: true
    }
  },
  methods: {
    //关闭安全库存
    addClose(){
        this.$confirm('您确认要关闭吗？')
                        .then(_ => {
                      this.addVisible= false;
                })
                .catch(_ => {});
    },
    addClosing(){
        this.$confirm('您确认要关闭吗？')
                        .then(_ => {
                      this.addVisible= false;
                })
                .catch(_ => {});
    },
     tabIndex (index) {
      this.currentIndex = index
      switch (index) {
        case 0:
          this.mainIndex = "AccountOrder";
          break;

        
        default: 
            return
      }
    },
    //搜索
    searchOrder(){
        this.tableDatas.pageIndex =1;
        this._getReserveList()
        this.resetData();
    },
    //重置数据
    resetData(){
         this.page = [];
        this.count = 0;
        this.showNo = '';
        this.getIndex = '';
    },
    _getStorage(){
      getStorage().then(res=>{
        this.storeData = res.data
      })
    },
    //获取安全库存分页
    _getReserveList(){
      getReserveList(this.tableDatas).then(res=>{
            this.storageList = res.data.pageList           
            this.tableDatas.total = res.data.count
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
      this.goodsId = row.goodsId;
      this.skuId = row.skuId;
      
        let obj={}
        obj.pageSize = this.formDatas.pageSize;
        obj.pageIndex = this.formDatas.pageIndex;
        obj.goodsId = row.goodsId;
        obj.skuId = row.skuId;
       getReserveGoodsList(obj).then(res => {
        this.count = res.data.count;
        this.page = res.data.pageList;
      });
    },
    //安全设置
   setting(row){
      this.goodsId = row.goodsId;
      this.skuId = row.skuId;
      
      this._getReserveSetting();
      this.addVisible = true;
      
   },
   //获取安全库存商品
   _getReserveSetting(){
    let obj={}
          obj.pageSize = this.formDatas.pageSize;
          obj.pageIndex = this.formDatas.pageIndex;
          obj.goodsId = this.goodsId;
          obj.skuId = this.skuId;
        getReserveSetting(obj).then(res=>{
            this.formDatas.total = res.data.count;
          this.tableData = res.data.pageList;
        })
   },
   //编辑安全设置
   saveGoods1(){
      edittReserveSetting(this.tableData).then(res=>{
        if(res.code===200){
          throttleTipPop(this, "success", "更新商品安全库存成功", 2000);
          this.addVisible = false;
          this._getReserveList()
        }
      })
   },
    handleSizeChange() {},
    handleCurrentChange() {},
     getHandleSizeChange(val) {
       this.tableDatas.pageSize =val;
       this.resetData();
       this._getReserveList()
     },
    getHandleCurrentChange(val) {
      this.tableDatas.pageIndex = val;
      this.resetData();
      this._getReserveList()
    },
     //换页
    addHandleSizeChange(val) {
      this.formDatas.pageSize = val;
      this._getReserveSetting();
    },
    //换页
    addHandleCurrentChange(val) {
      this.formDatas.pageIndex = val;
      this._getReserveSetting();
    },
    handleChange() {},
    handleSelectionChange(){}
  },
  components: {
    AccountOrder,
/*     AddContract, */
 
  }
};
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
  #purchaseApply{
    .el-dialog__body {
    padding: 0 !important;
    background: none !important;
  }
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
        padding-bottom: 10px;
        border: 1px solid rgb(215, 224, 241);
        background: #fff;
        .title {
          margin-left: -20px;
          font-size: 16px;
          color: 3333;
          padding-left: 10px;
          line-height: 1.4;
          border-left: 4px solid $themeColor;
          margin-bottom: 10px;
        }
        .title1 {
          margin-left: -20px;
          font-size: 16px;
          color: 3333;
          padding-left: 10px;
          line-height: 1.4;
          border-left: 4px solid $themeColor;
          margin-bottom: 10px;
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
    //
    .line-div{
    .small-Idiv{
        margin:0 auto;
        padding-top: 10px;
    }
}


    .i-div {
      cursor: pointer;
    }
    .margin1 {
      padding-left: 40px;
      padding-top: 20px;
      box-sizing: border-box;
    }
    .mail-fitter {
      .mail-wrapper {
        padding: 20px;
        padding-bottom: 0;
        border: 1px solid rgb(215, 224, 241);
        background: #fff;
        .title1 {
          margin-left: -20px;
          font-size: 16px;
          font-weight: 400;
          color: 3333;
          padding-left: 10px;
          line-height: 1.4;
          border-left: 4px solid $themeColor;
          margin-bottom: 23px;
        }
      }
    }
    .box{
      margin-left: 12px;
      margin-top:10px;
    }

    .el-input-group__append button.el-button {
      width:50px;
      text-align: center;
      
      background: #fff;
    }
    .el-input-number.is-controls-right .el-input-number__decrease {
      background: #fff !important;
    }
    .el-input-number.is-controls-right .el-input-number__increase {
      background: #fff !important;
    }
    .imgitem{
      cursor: pointer;
    }
    .leftbottom {
        color: #4a99fa;
        border-bottom: 1px dashed rgba(215, 220, 231, 1);
        padding-bottom: 8px;
      }
      .mcard1 {
        border: 1px solid #d7e0f1;
        margin-top: 20px;
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
  }
  .showImg{
    width: 110px;
    height:110px;
  }
</style>
