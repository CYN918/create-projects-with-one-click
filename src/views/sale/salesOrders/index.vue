<template>
  <div style="min-width:1500px;">
  
     <div class="margin" >
      <div class="tabs-header">
     
        <ul class="clearfix">

              <!-- 待生成合同pendingContract -->
                <li  class ="link" @click="tabIndex0(0)"  :class="currentIndex0===0 ? 'active' : ''">待生成合同</li>
              <!-- 待审核audit -->
                <li class ="link" @click="tabIndex0(1)"  :class="currentIndex0===1 ? 'active' : ''">待审核</li>
              <!-- 签订合同signing -->
                <li class ="link" @click="tabIndex0(2)"  :class="currentIndex0===2 ? 'active' : ''">签订合同</li>
              <!-- 采购申请purchasing -->
                <li class ="link" @click="tabIndex0(3)"  :class="currentIndex0===3 ? 'active' : ''">采购申请</li>
              <!-- 待入库instorage -->
                <li class ="link" @click="tabIndex0(4)"  :class="currentIndex0===4 ? 'active' : ''">待入库</li>
                <li class ="link" @click="tabIndex0(5)"  :class="currentIndex0===5 ? 'active' : ''">已入库</li>
                <li class ="link" @click="tabIndex0(6)"  :class="currentIndex0===6 ? 'active' : ''">待出库</li>
                <li class ="link" @click="tabIndex0(7)"  :class="currentIndex0===7 ? 'active' : ''">销售出货清单</li>
                <li class ="link" @click="tabIndex0(8)"  :class="currentIndex0===8 ? 'active' : ''">生成出库单</li>
                <li class ="link" @click="tabIndex0(9)"  :class="currentIndex0===9 ? 'active' : ''">已出库</li>
                <li class ="link" @click="tabIndex0(10)"  :class="currentIndex0===10 ? 'active' : ''">待开发票</li>
                <li class ="link" @click="tabIndex0(11)"  :class="currentIndex0===11 ? 'active' : ''">申请开票</li>
                <li class ="link" @click="tabIndex0(12)"  :class="currentIndex0===12 ? 'active' : ''">已开发票</li>
                <li class ="link" @click="tabIndex0(13)"  :class="currentIndex0===13 ? 'active' : ''">待收款</li>
                <li class ="link" @click="tabIndex0(14)"  :class="currentIndex0===14 ? 'active' : ''">已收款</li>
                <li class ="link" @click="tabIndex0(15)"  :class="currentIndex0===15 ? 'active' : ''">已完成</li>
    <!--             <li class ="link" @click="tabIndex0(15)"  :class="currentIndex0===15 ? 'active' : ''">售后服务</li> -->
            </ul>
      </div>
      <div class="tabs-content">
        <component :is="comIndex"></component>

    </div>
  </div>

  </div>
</template>

<script>
import { getAllcustomer,deleteCustomer } from '@/api/customer/index'

import PendingContract from './components/pendingContract/index'
import Audit from './components/audit/index'
import Signing from './components/signing/index'
import Purchasing from './components/purchasing/index'
import InStorage from './components/inStorage/index'
import InStoraged from './components/inStoraged/index'
import OutStorage from './components/outStorage/index'
import ShippingList from './components/shippingList/index'
import Checkout from './components/checkOut/index'
import OutStoraged from './components/outStoraged/index'
import Invoice from './components/invoice/index'
import Apply from './components/apply/index'
import Invoiced from './components/invoiced/index'
import Receivables from './components/receivables/index'
import Receivabled from './components/receivabled/index'
import OrderStatus from './components/orderStatus/index'
/* import Service from './components/service' */


export default {
  components:{
    PendingContract,//1
    Audit,//2
    Signing,//3
    Purchasing,//4
    InStorage,//5
    InStoraged,
    OutStorage,//6
    Checkout,//7
    OutStoraged,//8
    Invoice,//9
    Apply,
    Invoiced,//10
    Receivables,//11
    Receivabled,//12
    OrderStatus,//13
/*     Service,//14  */
    ShippingList,

  },
  data () {
    return {
      mainIndex:'Order',
      comIndex:'PendingContract',
      currentIndex0: (this.$route.query.id-1) || 0,
      dataArr:[],
      deleteCustomer:false, //删除
      form: {
        customerStatus:'', //状态
        createTimeStart:'',
        createTimeEnd:'',
      },
        searchpe:'',
        options: [{
          value: '选项1',
          label: '一般客户'
        }, {
          value: '选项2',
          label: '重要客户'
        }, {
          value: '选项3',
          label: '待开发客户'
        }, {
          value: '选项4',
          label: '500强客户'
        }, {
          value: '选项5',
          label: '朋友介绍的客户'
        }],
        value: '',
        input:'',
        
        currentIndex: 0,
        storeManagerId: '0',
        roleList: [],
        tableData: {
                currentPage:1,
                sizes:[10, 20, 50, 100],
                size:10,
                total:0,
            },
    }
  },
  created () {
    this.tabIndex0(this.currentIndex0);  
  },
  computed: {
  },
  methods: {

    tabIndex0 (index) {
      this.currentIndex0 =index
      switch(index) {
        case 0:
          this.comIndex = 'PendingContract';
          this.$router.push({name:'SalesOrders',query:{id:1}})
          break;
        case 1:
          this.comIndex = 'Audit'
          this.$router.push({name:'SalesOrders',query:{id:2}})
          break;
        case 2:
          this.comIndex = 'Signing'
          this.$router.push({name:'SalesOrders',query:{id:3}})
          break;
        case 3:
          this.comIndex = 'Purchasing'
          this.$router.push({name:'SalesOrders',query:{id:4}})
          break;
        case 4:
          this.comIndex = 'InStorage'
          this.$router.push({name:'SalesOrders',query:{id:5}})
          break;
        case 5:
          this.comIndex = 'InStoraged'
          this.$router.push({name:'SalesOrders',query:{id:6}})
          break; 
        case 6:
          this.comIndex = 'OutStorage'
          this.$router.push({name:'SalesOrders',query:{id:7}})
          break;
        case 7:
          this.comIndex = 'ShippingList'
          this.$router.push({name:'SalesOrders',query:{id:8}})
          break;
        case 8:
          this.comIndex = 'Checkout'
          this.$router.push({name:'SalesOrders',query:{id:9}})
          break;
        case 9:
          this.comIndex = 'OutStoraged'
          this.$router.push({name:'SalesOrders',query:{id:10}})
          break;
        case 10:
          this.comIndex = 'Invoice'
          this.$router.push({name:'SalesOrders',query:{id:11}})
          break;
        case 11:
          this.comIndex = 'Apply'
          this.$router.push({name:'SalesOrders',query:{id:12}})
          break
        case 12:
          this.comIndex = 'Invoiced'
          this.$router.push({name:'SalesOrders',query:{id:13}})
          break;
        case 13:
          this.comIndex = 'Receivables'
          this.$router.push({name:'SalesOrders',query:{id:14}})
          break;
         case 14:
          this.comIndex = 'Receivabled'
          this.$router.push({name:'SalesOrders',query:{id:15}})
          break; 
        case 15:
          this.comIndex = 'OrderStatus'
          this.$router.push({name:'SalesOrders',query:{id:16}})
          break;
/*         case 15:
          this.comIndex = 'Service'
          break; */
        
        default: 
            return
      }
    },
    handleClick(rest){
      console.log(...rest);

    },
    toRole () {
      this.currentIndex = 1
      this.storeManagerId = id
    },
    addData(){
      this.$router.push({name:'AddCustomer'})
    },
    editor(id,state) {
      this.$router.push({ name: "AddCustomer", query: { id: id ,state:state } });
    },
    detail(id,state) {
      this.$router.push({ name: "DetailCustomer", query: { id: id ,state:state} });
    },
    serch(slt){
          if(slt){
            this.tableData.currentPage = 1;
          }
            this._getAllcustomer()
        },
    _getAllcustomer(){
            let obj = {};
            obj.pageNum = this.tableData.currentPage;
            obj.pageSize = this.tableData.size;
            obj.keywords = this.input;
            getAllcustomer(obj).then((res) => {
                console.log(res)
                this.tableData.total = res.data.total;
                this.dataArr= res.data.list;
            })
        },
      handleSizeChange(val){
        this.tableData.size = val;
            this._getAllcustomer()
      },
      handleCurrentChange(val){
        this.tableData.currentPage = val;
            this._getAllcustomer()
      },

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
      padding: 0 19.75px;
      text-align: center;
  }
}
.center{
  margin-left: 30px;
}
.tabColor{
  font-size: 16px;
}
</style>

