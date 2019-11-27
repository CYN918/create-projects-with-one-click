<template>
  <div style="min-width:1500px;">
  
     <div class="margin">
      <div class="tabs-header">
        <ul class="clearfix">
     
            <li class ="link" @click="tabIndex0(0)"  :class="currentIndex0===0 ? 'active' : ''">采购申请</li>
  
            <li class ="link" @click="tabIndex0(1)"  :class="currentIndex0===1 ? 'active' : ''">待审核</li>
  
            <li class ="link" @click="tabIndex0(2)"  :class="currentIndex0===2 ? 'active' : ''">签订合同</li>
     
            <li class ="link" @click="tabIndex0(3)"  :class="currentIndex0===3 ? 'active' : ''">付款申请</li>
             <li class ="link" @click="tabIndex0(4)"  :class="currentIndex0===4 ? 'active' : ''">付款单</li>
            <li class ="link" @click="tabIndex0(5)"  :class="currentIndex0===5 ? 'active' : ''">待入库</li>
            <li class ="link" @click="tabIndex0(6)"  :class="currentIndex0===6 ? 'active' : ''">提交入库</li>
            <li class ="link" @click="tabIndex0(7)"  :class="currentIndex0===7 ? 'active' : ''">已入库 </li>
            <li class ="link" @click="tabIndex0(8)"  :class="currentIndex0===8 ? 'active' : ''">待收发票 </li>
            <li class ="link" @click="tabIndex0(9)"  :class="currentIndex0===9 ? 'active' : ''">申请收票</li>
            <li class ="link" @click="tabIndex0(10)"  :class="currentIndex0===10 ? 'active' : ''">已收发票</li>
          <!--   <li class ="link" @click="tabIndex0(10)"  :class="currentIndex0===10 ? 'active' : ''">申请售后</li> -->
        </ul>
      </div>
      <div class="tabs-content">
        <component :is="comIndex" @applyDetail1="applyDetail2" :purchaseOrderNo="purchaseOrderNo"></component>
        
    </div>
  </div>
   
  </div>
</template>

<script>
import { getAllcustomer,deleteCustomer } from '@/api/customer/index'
import PurchaseApply from './components/purchaseApply/index'
import Audit from './components/audit/index'
import Signing from './components/signing/index'
import Payment from './components/payment/index'
import InStorage from './components/inStorage/index'
import Submit from './components/submit/index'
import InStoraged from './components/inStoraged/index'
import beInvoice from './components/beInvoice/index'
import applyInvioce from './components/applyInvoice/index'
import getInvoice from './components/getInvoice/index'
import Accounts from './components/accounts/index'
export default {
  components:{
      PurchaseApply,
      Audit,
      Signing,
      Payment,
      InStorage,
      Submit,
      InStoraged,
      beInvoice,
      applyInvioce,
      getInvoice,
      Accounts
  },
  data () {
    return {
      comIndex:"PurchaseApply",
      dataArr:[],
      purchaseOrderNo:'',//传过来的值
      deleteCustomer:false, //删除
        searchpe:'',
        value: '',
        input:'',
        currentIndex0:(this.$route.query.id-1) || 0,
        currentIndex: 0,
        storeManagerId: '0',
        roleList: [],
    }
  },
  created () {
      this.tabIndex0(this.currentIndex0);

        
  },
  computed: {
  },
  methods: {
   
    tabIndex0 (index) {
      this.currentIndex0 =index;
      this.purchaseOrderNo = '';
       switch(index) {
        case 0:
          this.comIndex = 'PurchaseApply'
          this.$router.push({name:'Order',query:{id:1}})
          break;
        case 1:
          this.comIndex = 'Audit'
          this.$router.push({name:'Order',query:{id:2}})
          break;
        case 2:
          this.comIndex = 'Signing'
          this.$router.push({name:'Order',query:{id:3}})
          break;
        case 3:
          this.comIndex = 'Payment'
          this.$router.push({name:'Order',query:{id:4}})
          break;
        case 4:
          this.comIndex = 'Accounts'
          this.$router.push({name:'Order',query:{id:5}})
          break;
        case 5:
          this.comIndex = 'InStorage'
          this.$router.push({name:'Order',query:{id:6}})
          break;
        case 6:
          this.comIndex = 'Submit'
          this.$router.push({name:'Order',query:{id:7}})
          break; 
        case 7:
          this.comIndex = 'InStoraged'
          this.$router.push({name:'Order',query:{id:8}})
          break;
        case 8:
          this.comIndex = 'beInvoice'
          this.$router.push({name:'Order',query:{id:9}})
          break; 
        case 9:
          this.comIndex = 'applyInvioce'
          this.$router.push({name:'Order',query:{id:10}})
          break;
        case 10:
          this.comIndex = 'getInvoice'
          this.$router.push({name:'Order',query:{id:11}})
          break;
        default: 
          return
       }
       console.log(this.comIndex);
       

    },

    applyDetail2(data){
      this.currentIndex0 =data.currentIndex0;
      this.tabIndex0(this.currentIndex0);
      this.purchaseOrderNo = data.purchaseOrderNo;
      
    }
    
    
  
  },
  
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
        .btn_right{
            margin-left: 10px
        }
    }
  }
  
  
  .text-space {
    text-align: center;
    color: #606266;
    font-size: 12px;
  }
  .el-select-width {
    max-width: 240px;
    margin-right: 5px;
  }
  .el-date-picker{
    max-width: 240px;
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
  width: 155px;
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
.detail{
    font-size: 14px;
    color: #606266;
}
.line-div {
  display: flex;
  justify-content: space-between;
}
.small_top {
  margin-top: 10px;
  margin-left: 19px;
  margin-right: 15px;
}
.tabs-header{
  .link{
      width: 9.09%;
      padding: 0 0 !important;
      text-align: center;
  }
}
.center{
  margin-left: 30px;
}
</style>

