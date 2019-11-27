<template>
  <div class="margin">
    <goods-fitter class="mbottom" :dataObj="form" @goodsFitter="handleGetGoodsList" @tabVender='handleGetGoodsList'></goods-fitter>
    <div class="mcard">
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
        <el-table-column label="用户ID" align="center" prop="userId">
           <template slot-scope="scope">
             <div>{{ scope.row.userId }}</div>
           </template>
        </el-table-column>
        <el-table-column label="登录账号" align="center" prop="sysuserAccount">
        </el-table-column>
        <el-table-column label="用户名称" align="center" prop="sysuserName">
        </el-table-column>
        <el-table-column label="登录状态" align="center" prop="loginResult">
          <template slot-scope="scope">
            <div v-if="scope.row.loginResult == 'success'" style="">登录成功</div>
            <div v-else-if="scope.row.loginResult == 'fail'">登录失败</div>
          </template>
        </el-table-column>
        <el-table-column label="登录时间" align="center" prop="createTime">
        </el-table-column>
        <el-table-column label="IP" align="center" prop="clientIp">
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
import { getloginlogsList  } from '@/api/logs/index'
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
    this.getloginlogsList()
  },
  methods: {
    getloginlogsList(){
      let data = {}
      data.pageNum = this.form.current_page
      data.pageSize = this.form.page_size
      if ( this.form.searchKey == "0" ) {
          data.searchKey = 'userId'
      } else if ( this.form.searchKey == "1" ) {
         data.searchKey = 'sysuserAccount'
      } else if ( this.form.searchKey == "2" ) {
         data.searchKey = 'sysuserName'
      } else if ( this.form.searchKey == "3" ) {
         data.searchKey = 'clientIp'
      }
      data.searchValue = this.form.searchValue
      getloginlogsList(data).then(res => {
        var that =this
        that.tableData = res.data
        this.form.total_count = res.count
      })
    },
    handleGetGoodsList(data) {
      this.form = data;
      this.getloginlogsList()
    },
    handleSizeChange(val){
      this.form.page_size = val
      this.getloginlogsList()
    },
    handleCurrentChange(val){
      this.form.current_page = val
      this.getloginlogsList()
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
