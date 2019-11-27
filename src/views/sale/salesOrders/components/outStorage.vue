<template>
  <div id="outStorage">
    <div class="margin0">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">待出库</h4>
              <div class="search-base">
                <el-row>
                <el-col :span="5">
                      <el-col>
                          <el-form-item label="客户名称：">
                              <el-col :span="21">
                                  <el-input v-model="form.customer" placeholder="请输入客户名称"></el-input>
                              </el-col>
                          </el-form-item> 
                      </el-col>
                  </el-col>
                  <el-col :span="5">
                      <el-form-item label="销售订单：">
                              <el-col :span="21">
                                  <el-input v-model="form.saleOrderNo"  placeholder="请输入销售单号"></el-input>
                              </el-col>
                          </el-form-item>
                  </el-col>
                    <el-col :span="8">
                      <el-form-item label="出货日期：">
                              <el-col :span="21">
                                <el-date-picker
                              v-model="form.deliveryDate"
                              type="daterange"
                              range-separator="-"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              style="width:100%"
                              valueFormat='yyyy-MM-dd HH:mm:ss'>
                            </el-date-picker>
                              </el-col>
                          </el-form-item>
                  </el-col>
                  <el-col :span="2" >
                        <el-button type="primary" size="small" @click='search(true)' >查询</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="tabs-header">
          <ul class="clearfix">
          
              <li class ="link" @click="tabIndex0(0)"  :class="currentIndex0===0 ? 'active' : ''">全部待交货</li>
    
              <li class ="link" @click="tabIndex0(1)"  :class="currentIndex0===1 ? 'active' : ''">今日待交货</li>
    
            <li class ="link" @click="tabIndex0(2)"  :class="currentIndex0===2 ? 'active' : ''">3日内待交货</li>

              <li class ="link" @click="tabIndex0(3)"  :class="currentIndex0===3 ? 'active' : ''">7日内待交货</li>
          
          </ul>
        </div>
        <div class="tabs-content">
          <component :is="comIndex" :storeData="storeData" :total="total"></component>
        
      </div>
    </div>
  </div>
</template>

<script>
import { getCategory, getStoreList } from '@/api/public'
import {getOutStorage} from '@/api/sale/index'
import Goods from './outStorage/goods'
import All from './outStorage/all'
import Today from './outStorage/today'
import Three from './outStorage/three'
import Seven from './outStorage/seven'

export default {
  data () {
    return {
      storeData:[],
      total:0,
      currentIndex0: 0,
      comIndex:'All',
      form: {
        pageIndex:0,
        pageSize:10,
        saleOrderNo:'',//单号
        supplierName:'',//供应商
        ldNumber:'',//物流单号
        customer:'',
        deliveryDate:'',//新增日期
        startTime:'',
        endTime:'',
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
  created () {
  },
  computed: {
  },
  methods: {
    tabIndex0 (index) {
      this.currentIndex0 =index
      switch(index) {
        case 0:
          this.comIndex = 'All'
          break;
        case 1:
          this.comIndex = 'Today'
          break;
        case 2:
          this.comIndex = 'Three'
          break;
        case 3:
          this.comIndex = 'Seven'
          break;
        default: 
            return
      }
    },
    
    //待出货商品列表
      _getOutStorage(data){
        getOutStorage(this.form).then(res=>{
            this.storeData = res.data.pageList;
            this.total = res.data.count;
            
        })
      },
    //搜索
    search(){
      this.form.pageIndex = 1;
      this._getOutStorage(); 
    },
     
      handleSizeChange(){

      },
      handleCurrentChange(){

      },
      handleSelectionChange(){
        
      }
  },
  components: {
    Goods,
    All,
    Today,
    Three,
    Seven
  }
}
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
#outStorage{   
  .el-dialog__body {
    padding: 0 !important;
    background: none !important;
  }
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
}
</style>
