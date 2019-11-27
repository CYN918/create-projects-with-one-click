<template>
  <div id="order">
  <div class="margin0">
    <div class="mcard" style="border:1px solid #d7e0f1">
      <el-table :data="inPage" border @selection-change="handleSelectionChange" stripe>
        <el-table-column label="序号" type="index" align="center" width="50">
           
        </el-table-column>
         <el-table-column label="图样" prop="name" align="center" width="120">
                <template slot-scope="scope">
                  <img  :src="scope.row.goodsImgUrl" class="showImg" alt="" v-if="scope.row.goodsImgUrl"/>
                  <img  src="@/common/images/缺省页.jpg" class="showImg" alt="" v-if="!scope.row.goodsImgUrl"/>
                </template>
         </el-table-column>
        <el-table-column label="商品信息" prop="name" align="center" width="200">
            <template slot-scope="scope">
                    <div class="txt_left">商品名称：{{scope.row.goodsName}}</div>
                    <div class="txt_left" >货号：{{scope.row.goodsSn}}</div>
                    <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                    <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                    <div class="txt_left">SKU：{{scope.row.goodsSkuId}}</div>

              </template>
        </el-table-column>
        <el-table-column label="规格尺寸" prop="name" align="center" width="160">
                <template slot-scope="scope">
                    {{scope.row.goodsSpecSize}}
                </template>
        </el-table-column>
        <el-table-column label="制作要求" prop="name" align="center" width="150">
              <template slot-scope="scope">
                    {{scope.row.productionRequire}}
              </template>
          </el-table-column>
        <el-table-column label="数量" prop="name" align="center" width="60">
                <template slot-scope="scope">
                      {{scope.row.purchaseQuantity}}
                </template>
        </el-table-column>
        <el-table-column label="税率" prop="name" align="center" width="60">
                <template slot-scope="scope">
                    {{scope.row.taxRate}}
                </template>
        </el-table-column>
        <el-table-column label="不含税单价" prop="name" align="center" >
              <template slot-scope="scope">
                    {{scope.row.notaxCostPrice}}
              </template>
        </el-table-column>
        <el-table-column label="税费" prop="name" align="center" >
              <template slot-scope="scope">
                    {{scope.row.tax}}
              </template>
        </el-table-column>
        <el-table-column label="含税单价" prop="name" align="center" >
              <template slot-scope="scope">
                    {{scope.row.taxCostPrice}}
              </template>
        </el-table-column>
        <el-table-column label="合计" prop="name" align="center" >
              <template slot-scope="scope">
                    {{scope.row.totalPrice}}
              </template>
        </el-table-column>
         <el-table-column label="收货地址" prop="name" align="center" width="130">
                  <template slot-scope="scope">
                      {{scope.row.deliveryAddress}}
                  </template>
           </el-table-column>
            
          
          <el-table-column label="设计稿" prop="name" align="center">
              <template slot-scope="scope">
                    <span class="blue" @click="preview(scope.row)" v-show="scope.row.fileDesignDraftUrl">查看</span>
                    <span  v-show="!scope.row.fileDesignDraftUrl">暂无设计稿</span>
              </template>
          </el-table-column>
          <el-table-column label="采销员" prop="name" align="center">
                <template slot-scope="scope">
                      {{scope.row.purchaseUserName}}
                </template>
          </el-table-column>
            <el-table-column label="操作" prop="name" align="center" width="100" fixed="right">
              <template slot-scope="scope">
                  <div class="line-div">
                    <div class="small-Idiv" @click="toSale(scope.row)"
                    v-permit="'pu:appoint'">
                      <div class="i-div">
                        <img src="@/common/images/icon/指定采销.png" alt class="operation_img" />
                      </div>
                      <span style="word-break: keep-all;">指定采销员</span>
                    </div>
                  </div>
                  <div class="line-div">
                    <div class="small-Idiv" @click="toDetail(scope.row)"
                    v-permit="'pu:view_quote'">
                      <div class="i-div">
                        <img src="@/common/images/icon/查看报价.png" alt class="operation_img" />
                      </div>
                      <span style="word-break: keep-all;">查看报价</span>
                    </div>
                  </div>
              </template>
        </el-table-column>
      </el-table>
      
          <div class="total" style="margin-left:60%;margin-top:20px">
            <el-form label-width="130px" size="small">
                <el-form-item label="合计：">
                  <el-col :span="5">
                    <el-input v-model="total1" readonly></el-input>
                  </el-col>
                </el-form-item>
            
           </el-form>
          </div>
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
    <!-- 移交销售弹窗 -->
    <el-dialog :visible.sync="saleVisible" width="30%">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">移交销售员跟进</h4>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form ref="infoForm" :model="form"  label-width="120px">
            <div class="search-wrapper">
              <div class="search-base">
                <el-row>
                  <el-col :offset="4">
                    <el-form-item label="销售单号：">
                      <el-col :span="12">
                        <span>{{saleOrderNo}}</span>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="line-height:24px;">
                  <div class="goodsTitle">
                    <span>商品名称：</span>
                  </div>
                  <div class="goodsRight">
                    <span>
                     {{goodsName}}
                    </span>
                  </div>
                </el-row>
                <el-row>
                  <el-col :offset="4">
                    <el-form-item label="指定采销员：">
                      <el-col :span="12">
                        <el-select
                          v-model="toSaler"
                          filterable
                          placeholder="请选择"
                          style="width:100%"
                          @change="selectGet1"
                          size="small"
                        >
                          <el-option
                            v-for="(item,index) in purchaseList"
                            :key="index"
                            :label="item.sysuserName"
                            :value="item.sysuserId"
                          ></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="saleVisible = false" size="small">关 闭</el-button>
        <el-button type="primary" @click="saveSale()" size="small">保存</el-button>
      </span>
    </el-dialog>
    <!-- 查看报价 -->
     <!-- 查看报价 -->
    <CheckOffer
      :goodsPage="goodsPage"
      :detailVisibles="detailVisibles"
      @createCloseC="createClose3"
      @createClosingC="createClosing3"
      @editInquiryC="editInquiry3"
      @pushPurchase="pushPurchase1"
    ></CheckOffer>
  </div>
  
  </div>
</template>

<script>
import { getCategory, getStoreList } from '@/api/public'
import { getInGoods,toPurchaser } from "@/api/sale/index";
import {toApplySaler,getApplyGoods,getApplyGoodsList} from "@/api/purchase/index"
import { throttleTipPop } from "@/utils/functions.js";
import CheckOffer from './checkOffer'
export default {
  data () {
    return {
      saleVisible: false, //指定采销员窗口
      detailVisibles:false,//查看报价窗口
      sigdId:'',//商品详细ID
      saleOrderNo:'',//销售订单单号
      toSaler:'',
      goodsPage:'',//商品报价列表
      purchaseList:'',
      goodsName:'',//指派采购员商品名称
      form: {
        pageIndex:1,
        pageSize:10,
        count:0,
      },
      inCount:'',
      inPage:[],
      spoId1:'',
      orderNo:'',
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
    }
  },
  props:['count','page','spoId','showNo'],
  watch:{
    count:function(newVal){
        this.form.count = newVal;
     
        
    },
    page:function(newVal){
      if(newVal.length==0){      
        this.form.pageIndex =1;
        this.inPage  = newVal;
  
      }else{
        this.inPage  =newVal;
      }
    
      
    },
    spoId(newVal){
      this.spoId1 = newVal;
    },
    showNo(newVal){
      this.saleOrderNo = newVal;
    }
  },
  created () {
  },
  computed: {
      total1(){
      let totals = 0
      let _this = this
      if(_this.inPage.length>0){
          for(var i = 0;i<_this.inPage.length;i++){
            if(!isNaN(_this.inPage[i].totalPrice)){
              totals+=parseFloat(_this.inPage[i].totalPrice)
            }else{
              totals = 0
            }
      }
        
      }
        return totals
      
    }
  },
  methods: {
    //预览
     preview(row){
      if(this.previewImg!==''||this.previewImg!==null){
          this.previewImg = row.fileDesignDraftUrl;
          this.dialogVisible = true;
      } 
      
    },
     createClose3: function(data) {
      this.detailVisibles = data;
    },
    createClosing3: function(data) {
      this.detailVisibles = data;
    },
    editInquiry3(data) {
      this.detailVisibles = data;
    },
    pushPurchase1(data){
      this.detailVisibles = data;
      this.$emit('purchaseReload')
    },
     //指定采销员窗口
    toSale(row) {
      console.log(row);
      this.spogdId = row.spogdId;
      this.saleVisible = true;
      this.goodsName = row.goodsName
      toPurchaser().then(res => {
        this.purchaseList = res.data.list;
      });
    },
    selectGet1(vId) {
      //这个vId也就是value值
      let obj = {};
      obj = this.purchaseList.find(item => {
        //这里是上面遍历的数据源
        return item.sysuserId === vId; //筛选出匹配数据
      });
      this.sysuserName = obj.sysuserName;
    },
    //保存指定采购员
    saveSale() {
      let obj = {};
      obj.spogdId = this.spogdId;
      obj.userId = this.toSaler;
      toApplySaler(obj).then(res => {  
        if (res.code === 200) {
          throttleTipPop(this, "success", "指定采销员成功", 2000);
          this.saleVisible = false;
          this._getApplyGoods();
        }
      });
    },
    _getApplyGoods(){
         let obj={}
          obj.spoId = this.spoId1;
          obj.pageIndex = this.form.pageIndex;
          obj.pageSize = this.form.pageSize
         getApplyGoods(obj).then(res=>{
            this.form.count = res.data.count;
            this.inPage = res.data.pageList;
            
         })
    },
    //供应商查看报价
    toDetail(row){
       getApplyGoodsList(row.spogdId).then(res=>{
            this.goodsPage =  res.data;  
    })
      this.detailVisibles = true;
    },
      handleSizeChange(val){
        this.form.pageSize = val;
        this._getApplyGoods();
      },
      handleCurrentChange(val){
        this.form.pageIndex = val;
        this._getApplyGoods();
      },
      handleSelectionChange(){
        
      }
  },
  components: {
    CheckOffer
  }

}
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
  #order{
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
.line-div {
  overflow: hidden;
  .small-Idiv{
    margin:0 auto;
    padding-top:10px;
  }
}



.i-div {
  cursor: pointer;
}
.margin1{
  padding-left:40px;
  padding-top:20px;
  box-sizing: border-box;

}
.showImg{
  width: 90px;
  height:90px;
}
.goodsTitle {
  margin-left: 121px;
  margin-right: 10px;
  height: 50px;
  float: left;
}
.goodsRight {
  margin-bottom: 26px;
}
.blue{
  cursor: pointer;
  color: #4A99FA;
}

  }
</style>
