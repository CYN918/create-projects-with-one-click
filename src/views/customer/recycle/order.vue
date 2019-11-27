<template>
  <div class="margin1" style="border: 1px solid #d7e0f1;">
    <div class="mcard">
       <el-table :data="orderData" border
          stripe 
          > 
            <el-table-column label="序号" type="index" align="center"  width="50"></el-table-column>
            <el-table-column label="客户信息" prop="name" align="center"  width="300">
                      <template slot-scope="scope">
                        <div class="txt_left" >名称：{{scope.row.customerName}}</div>
                        <div class="txt_left">部门：{{scope.row.department}}</div>
                        <div class="txt_left">联系人：{{scope.row.customerContact}}</div>
                        <div class="txt_left">联系电话：{{scope.row.tel}}</div>
                        <div class="txt_left">手机：{{scope.row.phone}}</div>
                      </template>
            </el-table-column>
            <el-table-column label="销售订单信息" prop="name" align="center"  width="300">
                      <template slot-scope="scope">
                        <div class="txt_left" >
                                销售单号：{{scope.row.saleOrderNo}}
                            </div>
                        <div class="txt_left">
                              经销商：{{scope.row.aCompanyName}}
                            </div>
                        <div class="txt_left">
                            平台名称：{{scope.row.projectName}}
                            </div>
                        <div class="txt_left">
                          创建时间：{{scope.row.createTime}}   
                            </div>
                        <div class="txt_left">
                          销售员：{{scope.row.bizUserName}}
                            </div>
                      </template>
            </el-table-column>
            <el-table-column label="订单金额" prop="name" align="center">
                   <template slot-scope="scope">
                    {{scope.row.orderTotalAmount}}
                   </template>
            </el-table-column>
            <el-table-column label="发票类型" prop="name" align="center">
                   <template slot-scope="scope">
                    {{scope.row.invoiceType}}
                   </template>
            </el-table-column>
            <el-table-column label="进度表" prop="name" align="center">
                    <template slot-scope="scope">
                      <div v-html="scope.row.billStatus"></div>
                    </template>
            </el-table-column>
       </el-table>
      <div class="pagination">
        <div class="pagination">
            <el-pagination
              @size-change="getHandleSizeChange"
              @current-change="getHandleCurrentChange"
              :current-page="tableDatas.pageIndex"
              :page-sizes="[10, 30, 50, 100]"
              :page-size="tableDatas.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableDatas.count"
            ></el-pagination>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { getCategory, getStoreList } from '@/api/public'
import {getOrder} from '@/api/sale/index';
export default {
  data () {
    return {
      orderData:[],
      form: {
        current_page:0,
        page_size:10,
        total_count:0,
      },
      tableDatas:{
        pageSize:10,
        pageIndex:1,
        count:0,
        customerId:this.customerId1,
      },
      orderData:[],
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
  props:["orderList",'count1',"customerId1"],
  watch:{
    orderList(val){
      this.orderData = val
    },
    count1(val){
      this.tableDatas.count = val;
    },
    customerId1(val){
      this.tableDatas.customerId = val;
      
    }
  },
  created () {
    this._getOrder();
  },
  computed: {
  },
  methods: {
      //获取销售订单分页
    _getOrder(){
      if(this.tableDatas.customerId!==''){
        
        getOrder(this.tableDatas).then(res=>{
          if(res.data){
              this.orderData = res.data.pageList           
              this.tableDatas.count = res.data.count;
          }
        })
      }
    }, 
      handleSizeChange(){

      },
      handleCurrentChange(){

      },
      handleSelectionChange(){
        
      },
       getHandleSizeChange(val) {
       this.tableDatas.pageSize =val;
       this._getOrder()
     },
    getHandleCurrentChange(val) {
      this.tableDatas.pageIndex = val;
      this._getOrder()
    },
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
</style>
