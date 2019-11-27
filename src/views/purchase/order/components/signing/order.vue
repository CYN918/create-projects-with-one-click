<template>
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
        <el-table-column label="商品信息" prop="name" align="center" width="220">
            <template slot-scope="scope">
                   <div class="txt_left">商品名称:{{scope.row.goodsName}}</div>
                    <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                    <div class="txt_left">型号:{{scope.row.modelNumber}}</div>
                    <div class="txt_left">品牌:{{scope.row.brandName}}</div>
                     <div class="txt_left">SKU:{{scope.row.skuId}}</div>
              </template>
        </el-table-column>
        <el-table-column label="规格尺寸" prop="name" align="center" width="160">
                <template slot-scope="scope">
                    {{scope.row.specSize}}
                </template>
        </el-table-column>
        <el-table-column label="税率" prop="name" align="center">
                <template slot-scope="scope">
                    {{scope.row.taxRate}}
                </template>
        </el-table-column>
        <el-table-column label="数量" prop="name" align="center">
                <template slot-scope="scope">
                      {{scope.row.purchaseQuantity}}
                </template>
        </el-table-column>
        <el-table-column label="不含税价" prop="name" align="center">
              <template slot-scope="scope">
                    {{scope.row.notaxCostPrice}}
              </template>
        </el-table-column>
         <el-table-column label="税费" prop="name" align="center">
              <template slot-scope="scope">
                    {{scope.row.taxation}}
              </template>
         </el-table-column>
         <el-table-column label="含税价" prop="name" align="center">
              <template slot-scope="scope">
                    {{scope.row.goodsPrice}}
              </template>
         </el-table-column>
         <el-table-column label="合计" prop="name" align="center">
              <template slot-scope="scope">
                    {{scope.row.totalPrice}}
              </template>
         </el-table-column>
          <el-table-column label="制作要求" prop="name" align="center" width="120">
              <template slot-scope="scope">
                    {{scope.row.productRequire}}
              </template>
          </el-table-column>
          <el-table-column label="设计稿" prop="name" align="center">
              <template slot-scope="scope">
                       <span class="blue" @click="preview(scope.row)" v-show="scope.row.fileDesignDraftUrl">查看</span>
                    <span  v-show="!scope.row.fileDesignDraftUrl">暂无设计稿</span>
              </template>
          </el-table-column>
           <el-table-column label="收货地址" prop="name" align="center" width="180">
                  <template slot-scope="scope">
                      {{scope.row.address}}
                  </template>
           </el-table-column>
            
      </el-table>
          <div class="total" style="margin-left:60%;margin-top:20px">
            <el-form label-width="130px" size="small">
                <el-form-item label="合计：">
                  <el-col :span="4">
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
            :total="form.count">
            </el-pagination>
      </div>
    </div>
     <!-- 上传预览 -->
       <el-dialog :visible.sync="dialogVisible" :modal="true" :append-to-body="false">
                                        <img width="100%" :src="previewImg" alt="">
                                        <span slot="footer" class="dialog-footer"></span>
        </el-dialog>
  </div>
</template>

<script>
import { getCategory, getStoreList } from '@/api/public'
import {ContractGoodsList} from "@/api/purchase/index"
export default {
  data () {
    return {
       dialogVisible:false,
      previewImg:'',
      contractId:'',
      form: {
        pageIndex:1,
        pageSize:10,
        count:0,
      },
      inCount:'',
      inPage:[],
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
  props:['count','page','closeId'],
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
    closeId:function(newVal){
      this.contractId = newVal   
    },
     inPage:{
      handler(val){
        if(val){
          for(let i= 0;i<val.length;i++){
            val[i].totalPrice = parseFloat(val[i].purchaseQuantity) * parseFloat(val[i].goodsPrice)
          }
        }
      }
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
    _ContractGoodsList(){
    let obj = {};
      obj.pageIndex = this.form.pageIndex;
      obj.pageSize = this.form.pageSize;
      obj.contractId = this.contractId;
       ContractGoodsList(obj).then(res => {
        this.page = res.data.pageList;
        this.form.count = res.data.count;
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
.showImg{
  width: 80px;
  height:80px;
}
.blue{
  cursor: pointer;
  color: #4C86F4;
}
</style>
