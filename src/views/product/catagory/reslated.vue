<template>
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <div class="search-wrapper">
          <el-page-header @back="back" content="规格信息"></el-page-header>
        </div>
      </div>
    </div>
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="125px" size="small">
          <div class="search-wrapper">
            <h4 class="title">搜索条件</h4>
            <div class="search-base">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="商品分类：">
                    <el-col :span="23">
                      <treeselect
                        :options="categoryList"
                        placeholder="请选择商品分类"
                        v-model="tableData.catId"
                        :disable-branch-nodes="true"
                        :clearable="true"
                        @input="_getSpecifications(true)"
                      />
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="1" class="btn_right">
                  <el-button type="primary" size="small" @click="Commodity(true)">搜索</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mcard">
      <el-row class="operate mbottom">
        <el-col :span="3"></el-col>
      </el-row>
      <el-table :data="data" border style="width: 100%" stripe>
          <el-table-column prop="specId" label="规格ID" align="center"></el-table-column>
          <el-table-column prop="specName" label="规格名称" align="center"></el-table-column>
          <el-table-column prop="catNum" label="关联分类数" align="center"></el-table-column>
          <el-table-column prop="valueNum" label="关联规格值" align="center"></el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="150">
            <template slot-scope="scope">
              <div class="line-div small_top" style="">
                <div class="small-Idiv" @click="deleteType(scope.row.specId)">
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

    <!-- 规格值删除 -->
    <el-dialog
      title="删除规格值"
      :visible.sync="dialogVisible"
      width="30%">
      <span>是否确定解除该规格与该分类的关联？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="deleteType('',true)" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 规格值删除 -->

  </div>
</template>
<script>
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { getTreecatagory , getSpecifications , deleteSpecifications , deletecatspecs} from "@/api/product/index";
export default {
  data() {
    return {
      deleteArr: [], //批量删除数组
      categoryList: [], // 分类
      type: "",
      data: [],
      input: "",
      specId: "",
      dialogVisible:false, //规格弹窗
      specId:'', // 规格id
      tableData: {
        pageIndex: 1,
        sizes: [10, 20, 30, 50],
        pageSize: 10,
        total: 0,
        catId: null,// 商品分类id
        keyWord: ""
      },
      options: []
    };
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    //获取商品分类
    _getCatagory() {
      let obj = {};
      obj.type = "SELECT";
      obj.id = 0;
      console.log(obj);
      getTreecatagory(obj).then(res => {
        this.transleteData(res.data, this.categoryList);
        this.IterationDelateMenuChildren(this.categoryList);
      });
    },
    //单选
    handleSelectionChange(list, row) {
      if (list.length) {
        this.deleteArr = list;
      } else {

      }
    },
    //多选
    handleSelectionChangeall(list) {
      this.deleteArr = list;
    },
    //查询
    _getSpecifications(data) {
      if (data) {
        this.tableData.currentPage = 1;
      }
      let obj = {};
      obj.pageIndex = this.tableData.pageIndex;
      obj.pageSize = this.tableData.pageSize;
      obj.catId = this.tableData.catId;
      obj.keyWord = this.tableData.keyWord;
      getSpecifications(obj).then(res => {
        this.tableData.total = res.data.page.total;
        this.data = res.data.pageList;
      });
    },
    //查询商品规格下拉列表
    _getvalueTree() {
      getvalueTree().then(res => {
        this.options = res.data;
      });
    },
    //  删除按钮可删除多个
    deleteMore() {
      let str = "";
      // this.deleteArr.forEach(item => {
      //   str += item.attrId + ",";
      // });
      // if (this.deleteArr.length) {
      //   this.$confirm("此操作将永久删除该属性, 是否继续?", "提示", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning"
      //   })
      //     .then(() => {
      //       Attributedeletemaor(str.substr(0, str.length - 1)).then(res => {
      //         this._getattribute();
      //         this.$message({
      //           type: "success",
      //           message: "删除成功!"
      //         });
      //       });
      //     })
      //     .catch(() => {
      //       this.$message({
      //         type: "info",
      //         message: "已取消删除"
      //       });
      //     });
      // } else {
      //   this.$message({
      //     type: "info",
      //     message: `请选择删除项`
      //   });
      // }
    },
    //删除
    deleteType(id,val) {
      var that = this;
      if(id){
        this.specId = id
        this.dialogVisible = true
      }
      if(val){
        const obj = {specId:[]}
        obj.specId.push(this.specId)
        obj.catId = this.tableData.catId
        deletecatspecs(obj).then(res => {
          if (res.code == 200) {
            this.$message({
              message: res.message,
              type: "success"
            });
            this._getSpecifications();
            this.dialogVisible = false;
          }
        });
      }
    },
    dblhandleCurrentChange(row, column, cell, event) {
      this.input = row.attrName;
      row.listStatus = 2;
    },
    addType() {
      this.$router.push({ name: "Addtype" });
    },
    handleSizeChange(val) {
      this.tableData.pageSize = val;
      this._getsavespecByid();
    },
    handleCurrentChange(val) {
      this.tableData.pageIndex = val;
      this._getsavespecByid();
    },
    //添加属性
    addgoods(data) {
      this.$router.push({
        name: "AddProductSpecAttribute",
        query: { specId: this.specId }
      });
    },
    Commodity(val) {
      if (val) {
        this.tableData.pageIndex = 1;
      }
      this._getsavespecByid();
    },
    transleteData(data, arr) {
      data.forEach(item => {
        const msg = {
          id: item.catId,
          label: item.catName,
          value: item.catId,
          children: item.children ? [] : null,
          isLeaf: item.children ? false : true
        };
        if (item.children && item.children.length > 0) {
          this.transleteData(item.children, msg.children);
        }
        arr.push(msg);
      });
      return arr;
    },
    IterationDelateMenuChildren(arr) {
      if (arr.length) {
        for (let i in arr) {
          if (arr[i].children.length) {
            this.IterationDelateMenuChildren(arr[i].children);
          } else {
            delete arr[i].children;
          }
        }
      }
      return arr;
    },
  },
  mounted() {
    if (this.$route.query.id) {
      this.tableData.catId = this.$route.query.id;
    }
    this._getCatagory();
    this._getSpecifications()
  },
  components: {
    Treeselect
  }
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
  justify-content: space-around;
}
.fuzhi {
  background: rgba(229, 162, 75, 1);
}
.huishouzhan {
  background: rgba(247, 108, 110, 1);
}
</style>
