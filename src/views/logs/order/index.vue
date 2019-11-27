<template>
  <div class="margin">
    <goods-fitter class="mbottom" :dataObj="form" @goodsFitter="handleGetGoodsList" @tabVender='handleGetGoodsList'></goods-fitter>
    <div class="mcard">
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
        <el-table-column label="订单ID" align="center" prop="orderId"></el-table-column>
        <el-table-column label="商品货号" align="center" prop="goodsSn"></el-table-column>
        <el-table-column label="商品名称" align="center" prop="goodsName"></el-table-column>
        <el-table-column label="订单状态" align="center" prop="orderStatus">
          <template slot-scope="scope">
            <div v-if="scope.row.orderStatus == '1'">确认</div>
            <div v-else-if="scope.row.orderStatus == '2'">已取消</div>
            <div v-else-if="scope.row.orderStatus == '3'">无效</div>
            <div v-else-if="scope.row.orderStatus == '4'">售后</div>
            <div v-else-if="scope.row.orderStatus == '5'">已完成</div>
            <div v-else-if="scope.row.orderStatus == '6'">断货</div>
            <div v-else-if="scope.row.orderStatus == '7'">删除</div>
          </template>
        </el-table-column>
        <el-table-column label="发货状态" align="center" prop="shippingStatus">
         <template slot-scope="scope">
            <div v-if="scope.row.shippingStatus == '0'">未发货</div>
            <div v-else-if="scope.row.shippingStatus == '1'">已发货</div>
            <div v-else-if="scope.row.shippingStatus == '2'">已取消</div>
          </template>
        </el-table-column>
        <el-table-column label="支付状态" align="center" prop="payStatus">
         <template slot-scope="scope">
            <div v-if="scope.row.payStatus == '0'">未付款</div>
            <div v-else-if="scope.row.payStatus == '1'">已付款中</div>
            <div v-else-if="scope.row.payStatus == '2'">已付款</div>
          </template>
        </el-table-column>
        <el-table-column label="供应商ID" align="center" prop="supplierId"></el-table-column>
        <el-table-column label="供应商名称" align="center" prop="supplierName"></el-table-column>
        <el-table-column label="客户(购买者)ID" align="center" prop="customerId"></el-table-column>
        <el-table-column label="客户(购买者)名称" align="center" prop="customerName"></el-table-column>
        <el-table-column label="操作员用户ID" align="center" prop="operateUserId"></el-table-column>
        <el-table-column label=" 操作员用户名" align="center" prop="operateUserName"></el-table-column>
        <el-table-column label="业务类型" align="center" prop="paySBussinessTypetatus"></el-table-column>  
        <el-table-column label="订单类型" align="center" prop="orderType">
         <template slot-scope="scope">
            <div v-if="scope.row.orderType == '0'">自营</div>
            <div v-else-if="scope.row.orderType == '1'">集采</div>
          </template>
        </el-table-column>
        <el-table-column label="商品来源" align="center" prop="sourceType">
         <template slot-scope="scope">
            <div v-if="scope.row.sourceType == '0'">自营</div>
            <div v-else-if="scope.row.sourceType == '1'">京东</div>
            <div v-else-if="scope.row.sourceType == '2'">网易</div>
            <div v-else-if="scope.row.sourceType == '3'">苏宁</div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.current_page"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="form.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="form.total_count"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// import GoodsFitter from '../goods/goodsFitter'
import GoodsFitter from './goodsFitter'
import { getOrderLogsList  } from '@/api/logs/index'
import axios from 'axios'
export default {
  data () {
    return {
     form: {
			  	searchKey: '',
				  searchValue: '',
					current_page: 1,
					page_size: 10,
					total_count: 0,
		 },
     tableData:[]
    }

  },
  mounted(){
    this.getOrderLogsList()
  },
  methods: {
    getOrderLogsList(){
      let data = {}
      data.pageNum = this.form.current_page
      data.pageSize = this.form.page_size
      // if ( this.form.searchKey == "0" ) {
      //     data.searchKey = 'userId'
      // } else if ( this.form.searchKey == "1" ) {
      //    data.searchKey = 'sysuserAccount'
      // } else if ( this.form.searchKey == "2" ) {
      //    data.searchKey = 'sysuserName'
      // } else if ( this.form.searchKey == "3" ) {
      //    data.searchKey = 'clientIp'
      // }
      data.searchValue = this.form.searchValue
      getOrderLogsList(data).then(res => {
        var that =this
        that.tableData = res.data
        this.form.total_count = res.count
      })
    },
    handleGetGoodsList(data) {
      this.form = data;
      this.getOrderLogsList()
    },
    handleSizeChange(val){
      this.form.page_size = val
      this.getOrderLogsList()
    },
    handleCurrentChange(val){
      this.form.current_page = val
      this.getOrderLogsList()
    }
  },
  filters:{
  //   TypeName(val){
  //     let arr = [
  //       {auditType:1,name:'上架'},
  //       {auditType:2,name:'下架'},
  //       {auditType:3,name:'调价'},
  //       {auditType:4,name:'信息变更'},
  //       {auditType:5,name:'删除商品'},
  //       {auditType:6,name:'京东改价'},
  //       ]
  //   for(var i = 0 ; i<arr.length; i++){
  //     if(val == arr[i].auditType){
  //       return arr[i].name
  //     }
  //   }
  // }
  },
  components: {
    GoodsFitter
  }
}
</script>

<style lang='scss' scoped>
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
      }
    }
  }
.line-top {
  margin-top: 30px;
}
.div_img {
  width: 28px;
  height: 28px;
}
.activity {
  cursor: pointer;
  width: 32px;
  height: 32px;
}
.small_top {
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 18px;
}
.model {
  color: #f66c6c !important;
}
.leftbottom {
  color: #4a99fa;
  border-bottom: 1px dashed rgba(215, 220, 231, 1);
  padding-bottom: 8px;
}
.more {
  cursor: pointer;
}
.imgitem {
  display: flex;
  align-items: center;
  img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
}
.martop {
  margin-top: 10px;
}
}
</style>
