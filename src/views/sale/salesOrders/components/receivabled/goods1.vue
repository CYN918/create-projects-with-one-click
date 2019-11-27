<template>
  <div class="margin0">
    <div class="mcard" style="border:1px solid #d7e0f1">
      <el-table :data="pageList" border @selection-change="handleSelectionChange" stripe>
        <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
        <el-table-column label="收款时间" prop="name" align="center" >
                   <template slot-scope="scope">
                        {{scope.row.payTime | dateTime}}
                   </template>
        </el-table-column>
        <el-table-column label="收款金额" prop="name" align="center" >
                     <template slot-scope="scope">
                        {{scope.row.payAmount}}
                   </template>
        </el-table-column>
        <el-table-column label="收款类型" prop="name" align="center" >
                       <template slot-scope="scope">
                        {{scope.row.payType | payStatus}}
                   </template>
        </el-table-column>
        <el-table-column label="收款账号" prop="name" align="center" width="150">
                    <template slot-scope="scope">
                        {{scope.row.payAcountno}}
                   </template>
        </el-table-column>
        <el-table-column label="财务经手人" prop="name" align="center" width="110" >
                      <template slot-scope="scope">
                        {{scope.row.inputUserName}}
                   </template>
        </el-table-column>
        <el-table-column label="录入时间" prop="name" align="center" >
                    <template slot-scope="scope">
                        {{scope.row.createTime}}
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
import { deletePayId } from '@/api/sale/index'
export default {
  filters:{
    payStatus(val){
      switch(val){
        case 0:
          return "预收定金";
          break;
        case 1:
          return '尾款';
          break;
        case 2:
          return '货款';
          break;
        default:
          return
      }
    }
  },
  data () {
    return {
      saleOrderNo:'',
      deleteVisible:false,
      payId:'',//收款记录ID
      pageList:[],
      form: {
        pageIndex:1,
        pageSize:10,
        count:0,
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
    }
  },
  props:['payPage','payCount','showNo'],
  watch:{
      payPage(val){
         if(val.length==0){      
        this.form.pageIndex =1;
        this.pageList = val;
  
        }else{
          this.pageList =val;
        }   
      },
      payCount(val){
        this.form.count= val;
      },
      showNo(val){
        this.saleOrderNo = val;
      }

  },
  created () {
  },
  computed: {
  },
  methods: {
      _getSalePagePayList(){
        let obj ={};
        obj.pageIndex= this.form.pageIndex,
        obj.pageSize = this.form.pageSize,
        obj.saleOrderNo = this.saleOrderNo;
     
        getSalePagePayList(obj).then(res=>{
          this.form.count = res.data.count;
          this.pageList = res.data.pageList;
        })
      },


      handleSizeChange(){

      },
      handleCurrentChange(val){
          this.form.pageIndex = val;
          this._getSalePagePayList();
      },
      handleSelectionChange(val){
          this.form.pageSize = val;
          this._getSalePagePayList();
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
.tip {
    margin-top: -30px;
    text-align: center;
    line-height: 22px;
    .tipImg {
      position: relative;
      left: -16px;
      top: 28px;
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
  width:90px;
  height:90px;
}
</style>
