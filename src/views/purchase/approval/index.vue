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
                    <el-form-item label="商品：">
                        <el-col :span="23">
                            <el-input v-model="form.price_min" placeholder="请输入商品名称"></el-input>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="客户：">
                        <el-col :span="23">
                            <el-input v-model="form.price_min" placeholder="请输入客服名称/联系人姓名"></el-input>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="审批状态：">
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
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mcard">
      <el-row class="operate mbottom">
        <el-col :span="3">
        </el-col>
      </el-row>
      <el-table   :data="tableData"  border style="width: 100%" stripe>
        <el-table-column  prop="name"  label="状态" align="center"></el-table-column>
        <el-table-column  prop="name"  label="产品名称" align="center"></el-table-column>
        <el-table-column  prop="name"  label="供应商名称" align="center"></el-table-column>
        <el-table-column  prop="name"  label="历史记录查询" align="center"></el-table-column>
        <el-table-column  prop="name"  label="关联销售单号" align="center" ></el-table-column>
        <el-table-column  prop="name"  label="客户名称" align="center"></el-table-column>
        <el-table-column  prop="name"  label="销售数量" align="center"></el-table-column>
        <el-table-column  prop="name"  label="销售单价" align="center"></el-table-column>
        <el-table-column  prop="name"  label="客户名称" align="center"></el-table-column>
        <el-table-column  prop="name"  label="填写采购数量" align="center"></el-table-column>
        <el-table-column  prop="name"  label="函数成本价" align="center"></el-table-column>
        <el-table-column  prop="name"  label="报价时间" align="center"></el-table-column>
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
.detail{
    font-size: 14px;
    color: #606266;
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
</style>
