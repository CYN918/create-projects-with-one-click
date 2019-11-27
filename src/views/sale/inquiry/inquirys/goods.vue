<template>
  <div class="margin0">
    <div class="mcard" style="border:1px solid #d7e0f1">
      <el-table :data="inPage" border @selection-change="handleSelectionChange" stripe>
        <el-table-column label="序号" type="index" align="center" width="50">

        </el-table-column>
        <el-table-column label="报价状态(采购)" prop="name" align="center" width="120">
               <template slot-scope="scope"> 
                   <div v-html="scope.row.offerStatus"></div>
               </template>
        </el-table-column>
        <el-table-column label="图样" prop="name" align="center" width="130">
              <template slot-scope="scope"> 
                  <img  :src="scope.row.goodsImgUrl" class="imgType" alt="" v-if="scope.row.goodsImgUrl"/>
                  <img  src="@/common/images/缺省页.jpg" class="imgType" alt="" v-if="!scope.row.goodsImgUrl"/> 
               </template>
        </el-table-column>
        <el-table-column label="商品信息" prop="name" align="center" width="200">
              <template slot-scope="scope"> 
                      <div class="txt_left">产品名称：{{scope.row.goodsName}}</div>
                      <div class="txt_left"> <span style="margin-right:28px;">货</span>号：{{scope.row.goodsSn}}   </div>
                      <div class="txt_left"><span style="margin-right:28px;"> 型</span>号：{{scope.row.modelNumber}} </div>
                      <div class="txt_left"> <span style="margin-right:14px;">S</span><span style="margin-right:13px;">K</span>U：{{scope.row.goodsSkuId}}</div>
               </template>
        </el-table-column>
        <el-table-column label="规格尺寸" prop="name" align="center" width="120">
              <template slot-scope="scope">  
                      {{scope.row.goodsSpecSize}}
               </template>
        </el-table-column>
        <el-table-column label="制作要求" prop="name" align="center" width="150">
                <template slot-scope="scope"> 
                    <!--   <div class="txt_left"> 制作要求：{{scope.row.productRequire}}</div>
                       <div class="txt_left"><span style="margin-right:28px">备</span>注：{{scope.row.productRemark}}</div> -->
                      {{scope.row.productRequire}}
               </template>
        </el-table-column>
        <el-table-column label="物流信息" prop="name" align="center" width="120">
              <template slot-scope="scope"> 
                       <div class="txt_left">运输方式：{{scope.row.transportMode}}</div>
                      <div class="txt_left"> 配送地址：{{scope.row.distAddress}}  </div>  
              </template>
        </el-table-column>
        <el-table-column label="数量" prop="name" align="center"  width="70">
                  <template slot-scope="scope"> 
                     {{scope.row.goodsCount}}
                  </template>
        </el-table-column>
        <el-table-column label="税率" prop="name" align="center" width="60">
                  <template slot-scope="scope"> 
                     {{scope.row.taxRate}}
                  </template>
        </el-table-column>
        <el-table-column label="客户预算" prop="name" align="center">
                  <template slot-scope="scope"> 
                      {{scope.row.budgetAmount}}
                  </template>
        </el-table-column>
        <el-table-column label="成本预算" prop="name" align="center">
                  <template slot-scope="scope"> 
                     {{scope.row.costBudgetAmount}}
                  </template>
        </el-table-column>
        <el-table-column label="成本价(元) " prop="name" align="center" width="120">
                  <template slot-scope="scope"> 
                       <div v-for="(item,index) in scope.row.suppPriceList" :key="index">
                              <div class="txt_left">供应商：{{item.suppName}}</div>
                              <div class="txt_left">报价：{{item.taxPrice}}</div>
                       </div>
                  </template>
        </el-table-column>
         <el-table-column label="运费" prop="name" align="center" width="100 ">
                  <template slot-scope="scope"> 
                      {{scope.row.deliveryFreight}}
                  </template>
        </el-table-column>
        <el-table-column label="交货日期" prop="name" align="center">
                  <template slot-scope="scope"> 
                    {{scope.row.deliveryCycle | dateTime}}
                  </template>
        </el-table-column>
        <el-table-column label="采销员" prop="name" align="center">
                  <template slot-scope="scope"> 
                    {{scope.row.purchaserName}}
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
            :total="form.count">
            </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategory, getStoreList } from '@/api/public'
import {getInGoods} from '@/api/sale/index'


export default {
  filters:{
    'status':function(val){
      switch(val){
        case 0:
          return '未报价'
          break
        case 1:
          return '已报价'
          break
        case 2:
          return '重新报价'
          break
        default: return
      }
    }
  },
  data () {
    return {
      form: {
        pageIndex:1,
        pageSize:10,
        count:0,
      },
      inquiryNo:'',
      inCount:'',
      inPage:[],
      tableData:[],
    }
  },
  props:['count','page','closeNo'],
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
    closeNo:function(newVal){
      this.inquiryNo = newVal;
      
    }
  },
  created () {
  
    
  },
  computed: {
  },
  methods: {
      handleSizeChange(val){
            this.form.page_size= val
            this._getInGoods()
      },
      handleCurrentChange(val){
            this.form.current_page = val
            this._getInGoods()
      },
      handleSelectionChange(){
        
      },
      _getInGoods(){
        let obj={}
        obj.pageSize = this.form.pageSize
        obj.pageIndex = this.form.pageIndex
        obj.inquiryNo = this.inquiryNo  
        getInGoods(obj).then(res=>{
              this.form.count = res.data.count;
              this.inPage  = res.data.pageList;
        })
      },
        handleSizeChange(val){
          this.form.pageSize = val;
          this._getInGoods();
      },
      handleCurrentChange(val){
          this.form.pageIndex = val;
          this._getInGoods();
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
    display: flex;
    justify-content: space-around;
    margin-left:8px;
}
.line {
    display: flex;
    justify-content: flex-start;
    
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
.imgType {
  width:110px;
  height:100px;
}
</style>
