<template>
    <div style="padding:20px;">
    
        <div class="tabs-header">
        <ul class="clearfix">
        
            <li class ="link" @click="tabIndex0(0)"  :class="currentIndex0===0 ? 'active' : ''">礼品册管理</li>
  
            <li class ="link" @click="tabIndex0(1)"  :class="currentIndex0===1 ? 'active' : ''">审批管理</li>
  
          <li class ="link" @click="tabIndex0(2)"  :class="currentIndex0===2 ? 'active' : ''">兑换管理</li>

         
        </ul>
      </div>
      <div class="tabs-content">
        <component :is="comIndex" ref="father" :storeData="storeData" :total="total" :pageSize="pageSize"></component>
        
    </div>
  </div>
</template>

<script>
import { getCategory, getStoreList } from '@/api/public'
import GiftBookManagement from './giftBookManagement';
import ApprovalManagement from './approvalManagement';
import ExchangeManagement from './exchangeManagement';
import {inStorageList} from "@/api/purchase/index"
export default {
  data () {
    return {
      storeData:[],
      total:0,
      currentIndex0: 0,
      pageSize:'',
      comIndex:'GiftBookManagement',
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
  created () {
    
  },
  watch:{
    "form.deliveryDate": {
      handler(val, old) {
        if(val===null){
            this.form.startTime = '';
        this.form.endTime = '';
        }else{
            this.form.startTime = val[0];
        this.form.endTime = val[1];
        }
      },
      deep: true
    }
  },
  computed: {
  },
  methods: {
    //搜索
    search(){
     /*  this.form.pageIndex = 1;
      this._inStorageList();  */
    },
    tabIndex0 (index) {
      this.currentIndex0 =index
      switch(index) {
        case 0:
          this.comIndex = 'GiftBookManagement'
          break;
        case 1:
          this.comIndex = 'ApprovalManagement'
          break;
        case 2:
          this.comIndex = 'ExchangeManagement'
          break;
        default: 
            return
      }
    },
      handleSizeChange(){

      },
      handleCurrentChange(){

      },
      handleSelectionChange(){
        
      }
  },
  components: {
    GiftBookManagement,
    ApprovalManagement,
    ExchangeManagement
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
.margin1{
  padding-left:40px;
  padding-top:20px;
  box-sizing: border-box;

}
.line-div {
  display: flex;
  justify-content: center;
  align-items: center;
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
.head{
  margin-bottom: 20px;
}
.tabs-header li {
  padding:0 28px !important;
}
</style>
