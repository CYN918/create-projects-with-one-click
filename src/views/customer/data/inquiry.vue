<template>
  <div class="margin1" style="border: 1px solid #d7e0f1;">
    <div class="mcard">
      <el-table
          :data="inquiryData"
          stripe
          border
          style="width: 100%"  
        >
          <el-table-column prop="name" label="序号" align="center" width="50" type="index"></el-table-column>
          <el-table-column prop="name" label="询价状态" align="center">
            <template slot-scope="scope">
              <div v-html="scope.row.inquiryStatus"></div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="询价信息" align="center" width="200">
            <template slot-scope="scope">
              <div class="txt_left">询价单号：{{scope.row.inquiryNo}}</div>
              <div class="txt_left">录入时间：{{scope.row.createTime}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="客户信息" align="center" width="200">
            <template slot-scope="scope">
              <div class="txt_left">
                客户名称：{{scope.row.customerName}}</div>
              <div class="txt_left"><span style="margin-right:7px">联</span><span style="margin-right:7px">系</span>人：{{scope.row.customerContact}}</div>
              <div class="txt_left"><span style="margin-right:28px">手</span>机：{{scope.row.phone}}</div>
              <div class="txt_left"><span style="margin-right:28px">邮</span>箱：{{scope.row.email}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="发票信息" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.invoiceType===0">{{scope.row.invoiceType | invoice}}</div>
              <div v-if="scope.row.invoiceType!==0">{{scope.row.invoiceType | invoice}}</div>
              <div v-if="scope.row.invoiceType!==0">税率：{{scope.row.invoiceTaxRate}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="报价期限" align="center">
            <template slot-scope="scope">{{scope.row.offerEndTime}}</template>
          </el-table-column>

          <el-table-column prop="name" label="销售代表" align="center">
            <template slot-scope="scope">{{scope.row.saleUserName}}</template>
          </el-table-column>
          <el-table-column prop="name" label="指定的采销组" align="center">
            <template slot-scope="scope">{{scope.row.groupName}}</template>
          </el-table-column>
          <el-table-column prop="name" label="备注" align="center">
            <template slot-scope="scope">{{scope.row.remark}}</template>
          </el-table-column>
        
        </el-table>
        <div class="pagination">
          <el-pagination
            @size-change="AhandleSizeChange"
            @current-change="AhandleCurrentChange"
            :current-page="forms.current_page"
            :page-sizes="[10, 30, 50, 100]"
            :page-size="forms.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="forms.total_count"
          ></el-pagination>
        </div>
    </div>
  </div>
</template>

<script>
import { getCategory, getStoreList } from '@/api/public'
import {getInquiry} from '@/api/sale/index'
export default {
   filters: {
    invoice: function(val) {
      switch (val) {
        case 0:
          return "无需发票";
          break;
        case 1:
          return "增值税专用发票";
          break;
        case 2:
          return "普通发票";
          break;

        default:
          return;
      }
    },
    
  },
  data () {
    return {
      inquiryData:[],
      forms: {
        current_page:0,
        page_size:10,
        total_count:0,
        customerId:this.customerId1,
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
  props:["inquiryList",'count2',"customerId1"],
  watch:{
    inquiryList(val){
      this.inquiryData = val
    },
    count2(val){
      this.forms.total_count = val;
    },
    customerId1(val){
      this.forms.customerId = val;
      
    }
  },
  created () {
    this._getInquiry();
  },
  computed: {
  },
  methods: {
    //查询询价单分页
    _getInquiry() {
      if(this.forms.customerId!==''){
          getInquiry(this.forms).then(res => {
            if (res.code === 200) {
              this.inquiryData = res.data.pageList;
              this.forms.total_count= res.data.count;
            }
          });
      }
    },
    handleSelectionChange(){

    },
  
       AhandleSizeChange(val) {
      this.forms.page_size = val;
      this._getInquiry();
    },
    AhandleCurrentChange(val) {
      this.forms.current_page = val;
      this._getInquiry();
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
