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
                  <el-form-item label="规格名称：">
                    <el-col :span="23">
                      <el-input v-model="tableData.keyWord" placeholder="请输入规格名称" clearable></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="5" class="btn_right">
                  <el-button type="primary" size="small" @click="_getSpecifications(true)">查询</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mbottom">
      <div class="mcard">
        <el-row class="operate mbottom">
          <el-col :span="21">
            <el-button type="primary" size="small" @click="addspecifications"  v-permit="'specifications:add'">新建商品规格</el-button>
          </el-col>
          <el-col :span="3"></el-col>
        </el-row>
        <el-table :data="data" border style="width: 100%" stripe>
          <el-table-column prop="specId" label="规格ID" align="center"></el-table-column>
          <el-table-column prop="specName" label="规格名称" align="center"></el-table-column>
          <el-table-column prop="catNum" label="关联分类数" align="center"></el-table-column>
          <el-table-column prop="valueNum" label="关联规格值" align="center"></el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="150">
            <template slot-scope="scope">
              <div class="line-div small_top">
                <div class="small-Idiv" @click="attribute(scope.row)"  v-permit="'specifications:value:list'">
                  <div class="i-div fuzhi" style="margin-left: 10px;">
                    <img src="../../../common/images/icon/属性列表.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;margin-left: -7px;">规格值列表</span>
                </div>
                <div class="small-Idiv" @click="handleClick(scope.row.specId)"  v-permit="'specifications:edit'">
                  <div class="i-div">
                    <img src="../../../common/images/icon/编辑.png" alt class="operation_img" />
                  </div>
                  <span>编辑</span>
                </div>
              </div>
              <div class="line-div small_top" style="justify-content: end;margin-left: 22px;">
                <div class="small-Idiv" @click="deleteType(scope.row.specId)"  v-permit="'specifications:del'">
                  <div class="i-div huishouzhan">
                    <img src="../../../common/images/icon/回收站.png" alt class="operation_img" />
                  </div>
                  <span>移除</span>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="paginationyz">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="tableData.currentPage"
            :page-sizes="tableData.sizes"
            :page-size="tableData.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 规格删除 -->
    <el-dialog title="删除规格" :visible.sync="dialogVisible" width="30%">
      <span>是否确定删除规格</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="sure" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 规格删除 -->
  </div>
</template>
<script>
import {
  getSpecifications,
  getTreecatagory,
  deleteSpecifications
} from "@/api/product/index";
export default {
  data() {
    return {
      form: {
        region: ""
      },
      data: [],
      tableData: {
        currentPage: 1,
        sizes: [10, 20, 50, 100],
        size: 10,
        total: 0,
        catId: null,
        keyWord: ""
      },
      specId: "", //商品规格id
      dialogVisible: false //删除规格
    };
  },
  methods: {
    _getSpecifications(data) {
      if (data) {
        this.tableData.currentPage = 1;
      }
      let obj = {};
      obj.pageIndex = this.tableData.currentPage;
      obj.pageSize = this.tableData.size;
      obj.catId = this.tableData.catId;
      obj.keyWord = this.tableData.keyWord;
      getSpecifications(obj).then(res => {
        this.tableData.total = res.data.page.total;
        this.data = res.data.pageList;
        this.endLoading() //取消加载中loading
      });
    },
    //编辑
    handleClick(id) {
      this.$router.push({ name: "Addspecifications", query: { id: id } });
    },
    //属性列表
    attribute(data) {
      console.log(data);
      this.$router.push({
        name: "ProductSpecAttribute",
        query: { id: data.specId }
      });
    },
    //删除
    deleteType(id) {
      this.specId = id;
      this.dialogVisible = true;
    },
    //确定删除规格
    sure() {
      deleteSpecifications(this.specId).then(res => {
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this._getSpecifications();
          this.dialogVisible = false;
        }
      });
    },
    addType() {
      this.$router.push({ name: "Addtype" });
    },
    handleSizeChange(val) {
      this.tableData.size = val;
      this._getSpecifications();
    },
    handleCurrentChange(val) {
      this.tableData.currentPage = val;
      this._getSpecifications();
    },
    //新增商品类型
    addspecifications() {
      this.$router.push({ name: "Addspecifications" });
    }
  },
  mounted() {
    this.startLoading() //加载中loading
    this._getSpecifications();
    // this._getCatagory();
  },
  
};
</script>
<style lang='scss' scoped>
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
  .el-date-picker {
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
.brand {
  position: relative;
  .add_brand {
    position: absolute;
    right: 20px;
  }
}
.i-div {
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.line-div {
  display: flex;
  justify-content: space-between;
}
.fuzhi {
  background: rgba(229, 162, 75, 1);
}
.huishouzhan {
  background: rgba(247, 108, 110, 1);
}
.small_top {
  margin-top: 10px;
  margin-left: 11px;
  margin-right: 15px;
}
.spanclass {
  position: absolute;
}
</style>
