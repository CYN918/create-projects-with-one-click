<template>
    <div class="margin1">
    <div class="tabs-header">
        <ul class="clearfix">
          <!-- 明细账detailed -->
            <li class ="link" @click="tabIndex0(0)"  :class="currentIndex0===0 ? 'active' : ''">录凭证</li>
          <!-- 总账ledger -->
            <li class ="link" @click="tabIndex0(1)"  :class="currentIndex0===1 ? 'active' : ''">查凭证</li>
          <!-- 科目余额表suBalance -->  
            <li class ="link" @click="tabIndex0(2)"  :class="currentIndex0===2 ? 'active' : ''">凭证汇总表</li>
            <!-- 多栏账mcAccount -->
            <li class ="link" @click="tabIndex0(3)"  :class="currentIndex0===3 ? 'active' : ''">原始凭证</li>
          <!-- 数量金额明细账suLedger -->

      
        </ul>
      </div>
    <div class="tabs-content">
          <component :is="comIndex"></component>
    </div>
 
    </div>
</template>

<script>
import Recording from './components/recording'
export default {
    data(){
        return{
            currentIndex0: 0,
            comIndex:'Recording',
        }
    },
    components:{
        Recording,
    },
    methods:{
         tabIndex0 (index) {
             this.currentIndex0 =index
            switch(index) {
              case 0:
                this.comIndex = 'Recording'
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

