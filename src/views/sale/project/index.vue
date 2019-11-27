<template>
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">搜索条件</h4>
            <div class="search-base">
              <el-row>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="收款状态：">
                        <el-col :span="23">
                            <el-select
                                class="el-select-width"
                                v-model="form.search_type"
                                placeholder="请选择"
                            >
                                <el-option label="按商品名称" value="1"></el-option>
                                <el-option label="按货号搜索" value="2"></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="发票状态：">
                        <el-col :span="23">
                            <el-select
                                class="el-select-width"
                                v-model="form.search_type"
                                placeholder="请选择"
                            >
                                <el-option label="按商品名称" value="1"></el-option>
                                <el-option label="按货号搜索" value="2"></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="发货状态：">
                        <el-col :span="23">
                            <el-select
                                class="el-select-width"
                                v-model="form.search_type"
                                placeholder="请选择"
                            >
                                <el-option label="按商品名称" value="1"></el-option>
                                <el-option label="按货号搜索" value="2"></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="合同状态：">
                        <el-col :span="23">
                            <el-select
                                class="el-select-width"
                                v-model="form.search_type"
                                placeholder="请选择"
                            >
                                <el-option label="按商品名称" value="1"></el-option>
                                <el-option label="按货号搜索" value="2"></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small">查询</el-button>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                    <el-col>
                        <el-form-item label="项目单号：">
                            <el-col :span="23">
                                <el-input v-model="form.price_min" placeholder="请输入项目单号或名称"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="5">
                    <el-col>
                        <el-form-item label="客户：">
                            <el-col :span="23">
                                <el-input v-model="form.price_min" placeholder="请输入客户名称/联系人姓名"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-col>
                  <el-col :span="8">
                    <el-form-item label="下单时间：">
                    <el-col :span="22">
                        <el-date-picker
                            type=daterange
                            valueFormat='yyyy-MM-dd HH:mm:ss'
                            v-model="value1"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
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
    <div class="mcard">
      <el-row class="operate mbottom">
          <el-col :span="21">
            <el-button type="primary" size="small" >新增</el-button>
            <el-button type="primary" size="small" >编辑</el-button>
            <el-button type="primary" size="small" >详情</el-button>
            <el-button type="primary" size="small" >单据生成PDF</el-button>
            <el-button type="primary" size="small" >移交售货员跟进</el-button>
            <el-button type="primary" size="small" >删除</el-button>
            <el-button type="primary" size="small" >待出库商品</el-button>
            <el-button type="primary" size="small" >产品搜索</el-button>
            </el-col>
        <el-col :span="3">
        </el-col>
      </el-row>
      <el-table   :data="tableData"  border style="width: 100%" stripe>
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column  prop="name"  label="订单状态" align="center"></el-table-column>
        <el-table-column  prop="name"  label="项目信息" align="center"></el-table-column>
        <el-table-column  prop="name"  label="交货日期" align="center"></el-table-column>
        <el-table-column  prop="name"  label="客户信息" align="center" ></el-table-column>
        <el-table-column  prop="name"  label="税费信息" align="center"></el-table-column>
        <el-table-column  prop="name"  label="收款信息" align="center"></el-table-column>
        <el-table-column  prop="name"  label="设计稿" align="center"></el-table-column>
        <el-table-column  prop="name"  label="配型地址" align="center"></el-table-column>
        <el-table-column  prop="name"  label="备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center"  fixed="right" width="150">
                  <template slot-scope="scope">
                    <div class="line-div">
                    <div class="small-Idiv">
                  <div class="i-div huishouzhan">
                    <img src="../../../common/images/icon/编辑.png" alt="" class="operation_img">
                  </div>
                    <span style="word-break: keep-all;">编辑</span>
              </div>
                    <div class="small-Idiv">
                   <div class="i-div huishouzhan">
                    <img src="../../../common/images/icon/审核.png" alt="" class="operation_img">
                    </div>
                 <span style="word-break: keep-all;">审批</span>
                    </div>
                  </div>
                  </template>
                </el-table-column>
    </el-table>
    <el-row class="operate mbottom combined">
        <el-col :span="1" class="select_span">
            <span>5</span>
        </el-col>
        <el-col :span="23" class="totalof">
            <span>合同金额总计：200000</span>
        </el-col>
      </el-row>
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
     <div class="mcard" style="margin-top:20px">
      <el-row class="operate mbottom">
          <el-col :span="21" class="detail">
              商品明细
        </el-col>
        <el-col :span="3">
        </el-col>
      </el-row>
      <el-table   :data="tableData"  border style="width: 100%" stripe>
        <el-table-column  prop="name"  label="图样" align="center"></el-table-column>
        <el-table-column  prop="name"  label="商品信息" align="center"></el-table-column>
        <el-table-column  prop="name"  label="产品说明" align="center"></el-table-column>
        <el-table-column  prop="name"  label="制作要求" align="center"></el-table-column>
        <el-table-column  prop="name"  label="原合同销售数量" align="center" ></el-table-column>
        <el-table-column  prop="name"  label="原合同销售单价" align="center"></el-table-column>
        <el-table-column  prop="name"  label="原合同合计" align="center"></el-table-column>
        <el-table-column  prop="name"  label="变更后销售数量" align="center"></el-table-column>
        <el-table-column  prop="name"  label="变更后销售单价" align="center"></el-table-column>
        <el-table-column  prop="name"  label="变更后销售金额" align="center" ></el-table-column>
        <el-table-column  prop="name"  label="税率%" align="center"></el-table-column>
        <el-table-column  prop="name"  label="税金" align="center"></el-table-column>
        <el-table-column  prop="name"  label="已订货数" align="center"></el-table-column>
        <el-table-column  prop="name"  label="未订货数" align="center"></el-table-column>
        <el-table-column  prop="name"  label="已出库数" align="center"></el-table-column>
        <el-table-column  prop="name"  label="待出库数" align="center"></el-table-column>
        <el-table-column  prop="name"  label="交期" align="center"></el-table-column>
        <el-table-column label="操作" align="center"  fixed="right" width="150">
          <template slot-scope="scope">
            <div class="line-div">
              <div class="small-Idiv">
                <div class="i-div huishouzhan">
                    <img src="../../../common/images/icon/编辑.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;">编辑</span>
              </div>
              <div class="small-Idiv">
                <div class="i-div huishouzhan">
                    <img src="../../../common/images/icon/回收站.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;">删除</span>
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
  </div>
</template>

<script>
import { getCategory, getStoreList } from '@/api/public'

export default {
  data () {
    return {
      value1:'',
      form: {
        current_page:1,
        page_size:10,
        total_count:0,
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
      handleSizeChange(){

      },
      handleCurrentChange(){

      }
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
.combined{
    font-size: 14px;
    color: #606266;
    text-align:center;
    height: 48px;
    line-height: 48px;
    border: 1px solid #EBEEF5;
    border-top: none;
}
.detail{
    font-size: 14px;
    color: #606266;
}
.select_span{
    width: 55px;
    border-right: 1px solid #EBEEF5;
}
.totalof{
    border-right: 1px solid #EBEEF5;
}

.i-div{
  cursor: pointer;
  width:32px;
  height:32px;
  border-radius:6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.line-div{
    display: flex;
    justify-content: space-around;

}
.fuzhi{
  background:rgba(229,162,75,1);
}
 .huishouzhan{
   background:rgba(247,108,110,1);
 }
</style>
