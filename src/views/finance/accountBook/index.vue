<template>
    <div class="margin1">
    <div class="tabs-header">
        <ul class="clearfix">
          <!-- 明细账detailed -->
            <li class ="link" @click="tabIndex0(0)"  :class="currentIndex0===0 ? 'active' : ''">明细账</li>
          <!-- 总账ledger -->
            <li class ="link" @click="tabIndex0(1)"  :class="currentIndex0===1 ? 'active' : ''">总帐</li>
          <!-- 科目余额表suBalance -->  
            <li class ="link" @click="tabIndex0(2)"  :class="currentIndex0===2 ? 'active' : ''">科目余额表</li>
            <!-- 多栏账mcAccount -->
            <li class ="link" @click="tabIndex0(3)"  :class="currentIndex0===3 ? 'active' : ''">多栏账</li>
          <!-- 数量金额明细账suLedger -->
            <li class ="link" @click="tabIndex0(4)"  :class="currentIndex0===4 ? 'active' : ''">数量金额明细账</li>
            <!-- 数量金额总账suAmount -->
            <li class ="link" @click="tabIndex0(5)"  :class="currentIndex0===5 ? 'active' : ''">数量金额总账</li>
          <!-- 核算项目余额表aBStatement -->
            <li class ="link" @click="tabIndex0(6)"  :class="currentIndex0===6 ? 'active' : ''">核算项目余额表</li>
            <!-- 核算项目明细账aILedger -->
            <li class ="link" @click="tabIndex0(7)"  :class="currentIndex0===7 ? 'active' : ''">核算项目明细账</li>
            <!-- 核算项目分类总账 ALedger-->
            <li class ="link" @click="tabIndex0(8)"  :class="currentIndex0===8 ? 'active' : ''">核算项目分类总账</li>
      
        </ul>
      </div>
    <div class="tabs-content">
          <component :is="comIndex"></component>
    </div>
    </div>
</template>

<script>
import Detailed from './components/detailed'
import Ledger from './components/ledger'
import SuBalance from './components/suBalance'
import McAccount from './components/mcAccount'
import SuLedger from './components/suLedger'
import SuAmount from './components/suAmount'
import ABStatement from './components/aBStatement'
import AILedger from './components/aILedger'
import ALedger from './components/aLedger'
export default {
    data(){
        return{
            currentIndex0: 0,
            comIndex:'Detailed',
        }
    },
    components:{
        Detailed,
        Ledger,
        SuBalance,
        McAccount,
        SuLedger,
        SuAmount,
        ABStatement,
        AILedger,
        ALedger,
    },
    methods:{
         tabIndex0 (index) {
             this.currentIndex0 =index
            switch(index) {
              case 0:
                this.comIndex = 'Detailed'
                break;
              case 1:
                this.comIndex = 'Ledger'
                break;
              case 2:
                this.comIndex = 'SuBalance'
                break;
              case 3:
                this.comIndex = 'McAccount'
                break;
              case 4:
                this.comIndex = 'SuLedger'
                break;
              case 5:
                this.comIndex = 'SuAmount'
                break;
              case 6:
                this.comIndex = 'ABStatement'
                break;
              case 7:
                this.comIndex = 'AILedger'
                break;
              case 8:
                this.comIndex = 'ALedger'
                break;
              default:
                return
            }
         }
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

.center{
  margin-left: 30px;
}
.margin1{
  margin:20px;
}
</style>

