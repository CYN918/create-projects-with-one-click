<template>
  <div class="margin0">
    <div class="mcard" style="border:1px solid #d7e0f1">
      <el-table :data="inPage" border @selection-change="handleSelectionChange" stripe>
        <el-table-column label="序号" type="index" align="center" width="50"></el-table-column> 
        <el-table-column label="图样" prop="name" align="center" width="130">
          <template slot-scope="scope">
              <img  :src="scope.row.goodsImgUrl" class="imgType" alt="" v-if="scope.row.goodsImgUrl"/>
              <img  src="@/common/images/缺省页.jpg" class="imgType" alt="" v-if="!scope.row.goodsImgUrl"/>
          </template>
        </el-table-column>
        <el-table-column label="商品信息" prop="name" align="center" width="330">
          <template slot-scope="scope">
            <div class="txt_left">产品名称：{{scope.row.goodsName}}</div>
            <div class="txt_left">
              <span style="margin-right:24px;">货</span>
              号：{{scope.row.goodsSn}}
            </div>
            <div class="txt_left">
              <span style="margin-right:24px;">型</span>
              号：{{scope.row.modelNumber}}
            </div>
            <div class="txt_left">
              <span style="margin-right:12px;">S</span>
              <span style="margin-right:11px;">K</span>
              U：{{scope.row.goodsSkuId}}
            </div>
          </template>
        </el-table-column>
         <el-table-column label="规格尺寸" prop="name" align="center" width="150">
              <template slot-scope="scope"> 
                     {{scope.row.goodsSpecSize}}
               </template>
        </el-table-column>
        <el-table-column label="单位" prop="name" align="center" width="150">
          <template slot-scope="scope">
                    {{scope.row.goodsUnit}}
          </template>
        </el-table-column>
        <el-table-column label="合计" prop="name" align="center" width="150">
          <template slot-scope="scope">
                    {{scope.row.goodsTotalMoney}}
          </template>
        </el-table-column>
        <el-table-column label="制作要求" prop="name" align="center" >
          <template slot-scope="scope">
            <!--   <div class="txt_left"> 制作要求：{{scope.row.productRequire}}</div>
                       <div class="txt_left"><span style="margin-right:28px">备</span>注：{{scope.row.productRemark}}</div> -->
                      {{scope.row.productRequire}}
          </template>
        </el-table-column>
        <el-table-column label="交货日期" prop="name" align="center" width="150">
          <template slot-scope="scope">{{scope.row.deliveryCycle | dateTime}}</template>
        </el-table-column>
        <el-table-column label="物流信息" prop="name" align="center" >
          <template slot-scope="scope">
            <div class="txt_left">运输方式：{{scope.row.transportMode}}</div>
            <div class="txt_left">配送地址：{{scope.row.distAddress}}</div>
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
import { getCategory, getStoreList } from "@/api/public";
import { findOrderGoods } from "@/api/sale/index";

export default {
  filters: {
    status: function(val) {
      switch (val) {
        case 0:
          return "未报价";
          break;
        case 1:
          return "已报价";
          break;
        case 2:
          return "重新报价";
          break;
        default:
          return;
      }
    }
  },
  data() {
    return {
      offerVisible1: false,
      list: [],
      form: {
        pageIndex:1,
        pageSize:10,
        count:0,
      },
      offerNo: "",
      inCount: "",
      inPage: [],
      tableData: []
    };
  },
  props: ["count", "page", "showNo"],
  watch: {
    count: function(newVal) {
      this.form.count = newVal;
    },
    page: function(newVal) {
      if(newVal.length==0){      
        this.form.pageIndex =1;
        this.inPage = newVal;
  
      }else{
        this.inPage =newVal;
      }  
    },
    showNo: function(newVal) {
      this.offerNo = newVal;
    },
 
  },
  created() {},
  computed: {},
  methods: {
    
    _findOrderGoods() {
      obj.pageSize = this.form.pageSize;
      obj.pageIndex = this.form.pageIndex;
      obj.offerNo = this.offerNo;
      findOrderGoods().then(res => {
        this.form.count = res.data.count;
        this.inPage = res.data.pageList;
      });
    },
    detail(row) {
      this.offerVisible1 = true;
    },
      handleSizeChange(val){
          this.form.pageSize = val;
          this._findOrderGoods();
      },
      handleCurrentChange(val){
          this.form.pageIndex = val;
          this._findOrderGoods();
      },
      handleSelectionChange(){
        
      }
  },
  components: {}
};
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
.line-div {
  display: flex;
  justify-content: space-around;
  margin-left: 8px;
}
.line {
  display: flex;
  justify-content: flex-start;
}
.small_top {
  margin-top: 10px;
}

.i-div {
  cursor: pointer;
}
.margin1 {
  padding-left: 40px;
  padding-top: 20px;
  box-sizing: border-box;
}
.imgType {
  width: 110px;
  height: 100px;
}
.mcard0 {
  border: 1px solid #d7e0f1;
  margin-top: 20px;
}
</style>