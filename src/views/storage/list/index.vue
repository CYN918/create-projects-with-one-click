<template>
  <div>
  
     <div class="margin">
      <div class="tabs-header">
        <ul class="clearfix">

            <li class ="link" @click="tabIndex0(0)"  :class="currentIndex0===0 ? 'active' : ''">库存查询</li>
            <li class ="link" @click="tabIndex0(1)"  :class="currentIndex0===1 ? 'active' : ''">库间调拨</li>
            <li class ="link" @click="tabIndex0(2)"  :class="currentIndex0===2 ? 'active' : ''">库存盘点</li>
            <li class ="link" @click="tabIndex0(3)"  :class="currentIndex0===3 ? 'active' : ''">安全库存</li>

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


import StoreAllot from './storeAllot'
import StockCheck from './stockCheck'
import StockTaking from './stockTaking'
import SafeStock  from './safeStock'



export default {
  components:{
    StoreAllot,
    StockCheck,//6
    StockTaking,//7
    SafeStock,//8

  },
  data () {
    return {
      mainIndex:'AccountOrder',
      comIndex:'stockCheck',
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
        currentIndex0: 0,
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
    this._getAllcustomer();   
  },
  computed: {
  },
  methods: {
   
    tabIndex0 (index) {
      this.currentIndex0 =index
      switch(index) {
        case 0:
          this.comIndex = 'StockCheck'
          break;
        case 1:
          this.comIndex = 'StoreAllot'
          break;
        case 2:
          this.comIndex = 'StockTaking'
          break;
        case 3:
          this.comIndex = 'SafeStock'
          break;
        default: 
            return
      }
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
      padding:0 15px;
      text-align: center;
  }
}
.center{
  margin-left: 30px;
}
</style>


