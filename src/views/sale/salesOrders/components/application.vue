<template>
  <div class="margin0">
     <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">待退款 </h4>
            <div class="search-base">
              <el-row>
                  <el-col :span="5">
                    <el-col>
                        <el-form-item label="状态：">
                            <el-col :span="21">
                              <el-select v-model="form.type" placeholder="除已生成采购订单之外">
                                  <el-option value="1" label="1"></el-option>
                                  <el-option value="2" label="2"></el-option>
                                  <el-option value="3" label="3"></el-option>
                              </el-select>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-col>
                 <el-col :span="5">
                    <el-form-item label="客户：">
                            <el-col :span="23">
                                <el-input v-model="form.customerName" >
                                </el-input>
                            </el-col>
                        </el-form-item>
                </el-col>
                   <el-col :span="5">
                    <el-col>
                        <el-form-item label="销售单号单号：">
                            <el-col :span="23">
                                <el-input v-model="form.oddNumbers "></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-col>
               
                  
                 
               
                <el-col :span="2" >
                      <el-button type="primary" size="small" @click='serch(true)' >查询</el-button>
                </el-col>
              </el-row>
              <el-row>
                     <el-col :span="8">
                    <el-form-item label="出库日期：">
                            <el-col :span="21">
                              <el-date-picker
                            v-model="form.outDelivery"
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
                
                
               
              </el-row>
              
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mcard" style="border:1px solid #d7e0f1">
      <!-- <div class="head">
          <el-row>
            <el-button type="primary" size="small">新增</el-button>
            <el-button type="primary" size="small">单据生成PDF</el-button>
          </el-row>
      </div> -->
      <el-table :data="tableData" border @selection-change="handleSelectionChange" stripe>
        <el-table-column label="采购申请" prop="name" align="center"></el-table-column>
        <el-table-column label="订单日期" prop="name" align="center"></el-table-column>
        <el-table-column label="订单号" prop="name" align="center"></el-table-column>
        <el-table-column label="总金额" prop="name" align="center"></el-table-column>
        <el-table-column label="税费信息" prop="name" align="center"></el-table-column>
        <el-table-column label="签单公司" prop="name" align="center" sortable></el-table-column>
        <el-table-column label="交货日期" prop="name" align="center" sortable></el-table-column>
        <el-table-column label="销售代表" prop="name" align="center"></el-table-column>
         <el-table-column label="操作" align="center" fixed="right" width="150">
          <template>
            <div class="line-div">
              <div class="small-Idiv" @click="detail()">
                <div class="i-div">
                  <img src="@/common/images/icon/查看详情.png" alt class="operation_img" />
                </div>
                <span style="word-break: keep-all;">详情</span>
              </div>
              <div
                class="small-Idiv"
                @click="generate()"
                style="justify-content: end;"
              >
                <div class="i-div">
                  <img src="@/common/images/icon/推送审核.png" alt class="operation_img" />
                </div>
                <span style="word-break: keep-all;">推送审核</span>
              </div>
            </div>
            <div class="line small_top">
              <div
                class="small-Idiv"
                @click="_throughSupplieraudit()"
                style="justify-content: end;margin-left:16px;margin-right:24px"
                v-show="form.auditStatus!=1"
              >
                <div class="i-div">
                  <img src="@/common/images/icon/编辑.png" alt class="operation_img" />
                </div>
                <span style="word-break: keep-all;">编辑</span>
              </div>
              
            </div>
          </template>
         </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="form.current_page"
            :page-sizes="[10, 30, 50, 100]"
            :page-size="form.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="form.total_count">
            </el-pagination>
      </div>
    </div>
     <!--    <div class="margin0" style="margin-top:20px">
      <div class="tabs-header">
        <ul class="clearfix">
            <li class="sale" @click="tabIndex(0)"  :class="currentIndex===0 ? 'active' : ''">商品明细</li> 
        </ul>
      </div>
      <div class="tabs-content">
        <component :is="mainIndex"></component>
        
    </div>
        </div> -->
  </div>
</template>

<script>
import { getCategory, getStoreList } from '@/api/public'
import Goods from './application/goods'
export default { 
  data () {
    return {
      currentIndex:0,
      mainIndex:'Goods',
      form: {
        current_page:0,
        page_size:10,
        total_count:0,
        customerName:'',//客户名称
        type:'',//状态
        oddNumbers:'',//单号
        store:'',//仓库
        outDelivery:'',//出库日期

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
  computed: {
  },
  methods: {
    tabIndex (index) {
      this.currentIndex = index
      
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
  justify-content: space-around;
  margin-left: 8px;
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
</style>
