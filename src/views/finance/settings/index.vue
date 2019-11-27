<template>
    <div style="min-width:1500px;">
  
     <div class="margin">
      <div class="tabs-header">
        <ul class="clearfix">
     
            <li class ="link" @click="tabIndex0(0)"  :class="currentIndex0===0 ? 'active' : ''">会计科目</li>
  
            <li class ="link" @click="tabIndex0(1)"  :class="currentIndex0===1 ? 'active' : ''">凭证字</li>
  
            <li class ="link" @click="tabIndex0(2)"  :class="currentIndex0===2 ? 'active' : ''">币别</li>
     
            <li class ="link" @click="tabIndex0(3)"  :class="currentIndex0===3 ? 'active' : ''">辅助核算</li>
             <li class ="link" @click="tabIndex0(4)"  :class="currentIndex0===4 ? 'active' : ''">资金账户</li>
            <li class ="link" @click="tabIndex0(5)"  :class="currentIndex0===5 ? 'active' : ''">初始化</li>
            <li class ="link" @click="tabIndex0(6)"  :class="currentIndex0===6 ? 'active' : ''">凭证模板</li>
            <li class ="link" @click="tabIndex0(7)"  :class="currentIndex0===7 ? 'active' : ''">费用类型 </li>
            <li class ="link" @click="tabIndex0(8)"  :class="currentIndex0===8 ? 'active' : ''">结算方式 </li>
            <li class ="link" @click="tabIndex0(9)"  :class="currentIndex0===9 ? 'active' : ''">现金流量</li>
            <li class ="link" @click="tabIndex0(10)"  :class="currentIndex0===10 ? 'active' : ''">单据编码规则</li>
            <li class ="link" @click="tabIndex0(11)"  :class="currentIndex0===11 ? 'active' : ''">系统参数</li>
            <li class ="link" @click="tabIndex0(12)"  :class="currentIndex0===12 ? 'active' : ''">业务分类</li>
        </ul>
      </div>
        <div class="tabs-content">
            <component :is="comIndex" ></component>
            
        </div>
  </div>
   
  </div>
</template>

<script>
import CapitalAccount from "./capitalAccount/index";

export default {
    components:{
        CapitalAccount
    },
     data () {
            return {
            comIndex:"CapitalAccount",
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
     methods:{
           tabIndex0 (index) {
                this.currentIndex0 =index;
                switch(index) {
                    case 4:
                        this.comIndex = 'CapitalAccount'
                        this.$router.push({name:'FinanceSettings',query:{id:4}})
                        break;
                    default:
                        return

                }
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
        width: 8.2%;
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
      width:7.69%;
      padding: 0 0 !important;
      text-align: center;
  }
}
.center{
  margin-left: 30px;
}
</style>

