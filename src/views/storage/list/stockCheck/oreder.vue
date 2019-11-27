<template>
  <div class="margin0">
    <div class="mcard" style="border:1px solid #d7e0f1">
      <el-table :data="inPage" border @selection-change="handleSelectionChange" stripe>
        <el-table-column label="序号" type="index" align="center" width="50">
           
        </el-table-column>
         <el-table-column label="日期" prop="name" align="center" width="150">
                <template slot-scope="scope">
                      {{scope.row.createTime}}  
                </template>
         </el-table-column>
        <el-table-column label="商品信息" prop="name" align="center" width="230">
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
                    {{scope.row.specSize}}
                </template>
        </el-table-column>
        <el-table-column label="类型" prop="name" align="center" >
              <template slot-scope="scope">
                    {{scope.row.businessType}}
              </template>
          </el-table-column>
        <el-table-column label="单号" prop="name" align="center" >
                <template slot-scope="scope">
                      {{scope.row.businessNo}}
                </template>           
        </el-table-column>
        <el-table-column label="入库数量" prop="name" align="center" >
                <template slot-scope="scope">
                    {{scope.row.inCount}}
                </template>
        </el-table-column>
        <el-table-column label="出库数量" prop="name" align="center" >
              <template slot-scope="scope">
                    {{scope.row.outCount}}
              </template>
        </el-table-column>
        <el-table-column label="剩余数量" prop="name" align="center" >
              <template slot-scope="scope">
                    {{scope.row.balanceCount}}
              </template>
        </el-table-column>
      
            
      
        
      </el-table>
      
         <!--  <div class="total" style="margin-left:61%;margin-top:20px">
            <el-form label-width="130px" size="small">
                <el-form-item label="合计：">
                  <el-col :span="3">
                    <el-input v-model="total1"></el-input>
                  </el-col>
                </el-form-item>
            
           </el-form>
          </div> -->
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
   
  </div>
</template>

<script>
import { getCategory, getStoreList } from '@/api/public'
import { getInGoods,toPurchaser } from "@/api/sale/index";
import {toApplySaler,getApplyGoods,getApplyGoodsList} from "@/api/purchase/index"
import {getReserveGoodsList} from "@/api/storage/index"
import { throttleTipPop } from "@/utils/functions.js";
export default {
  data () {
    return {

      sigdId:'',//商品详细ID
      toSaler:'',
      goodsId1:'',
      skuId1:'',
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
  props:['count','page','spoId',"goodsId","skuId"],
  watch:{
    count:function(newVal){
        this.form.count = newVal;
     
        
    },
    page:function(newVal){
       if(newVal.length==0){      
        this.form.pageIndex =1;
        this.inPage = newVal;
  
      }else{
        this.inPage =newVal;
      } 
    
      
    },
    spoId(newVal){
      this.spoId1 = newVal;
      
    },
    goodsId(newVal){
      this.goodsId1 =newVal;
    },
    skuId(newVal){
      this.skuId1 =newVal;
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
            if(_this.inPage[i].totalPrice){
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
     createClose3: function(data) {
      this.detailVisibles = data;
    },
    createClosing3: function(data) {
      this.detailVisibles = data;
    },
    editInquiry3(data) {
      this.detailVisibles = data;
    },
    _getReserveGoodsList(){
       let obj={}
        obj.pageSize = this.form.pageSize;
        obj.pageIndex = this.form.pageIndex;
        obj.goodsId = this.goodsId1;
        obj.skuId = this.skuId1;
       getReserveGoodsList(obj).then(res => {
        this.count = res.data.count;
        this.page = res.data.pageList;
      });
    },
      handleSizeChange(){

      },
      handleCurrentChange(){

      },
      handleSelectionChange(){
        
      }
  },
  components: {
  
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
.line-div{
    margin-bottom: 10px;
    .small-Idiv{
        margin:0 auto;
    }
}
 .small_top{
    margin-top: 10px;
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
  margin-left: 114px;
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

</style>
