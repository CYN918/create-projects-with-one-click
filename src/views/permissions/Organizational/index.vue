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
                    <el-form-item label="内容：">
                      <el-col :span="22">
                        <el-input v-model="tableData.content" placeholder="请输入关键字"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="1" class="btn_right">
                  <el-button
                    type="primary"
                    size="small"
                    clearable
                    @click="_getOrganizational(true)"
                  >搜索</el-button>
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
          <el-button
            type="primary"
            size="small"
            @click="addorganizational"
            v-permit="'newly:increased'"
          >新增</el-button>
        </el-col>
        <el-col :span="3"></el-col>
      </el-row>
      <el-table
        :tree-props="{children: 'childNodes'}"
        row-key="organizeId"
        :data="data"
        default-expand-all
        border
        style="width: 100%"
        stripe
      >
        <el-table-column type="index" label="编码" width="80" align="center" />
        <el-table-column type="index" label="层级" width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.nodeLevel==1">一级</span>
            <span v-if="scope.row.nodeLevel==2">二级</span>
            <span v-if="scope.row.nodeLevel==3">三级</span>
            <span v-if="scope.row.nodeLevel==4">四级</span>
            <span v-if="scope.row.nodeLevel==5">五级</span>
            <span v-if="scope.row.nodeLevel==6">六级</span>
            <span v-if="scope.row.nodeLevel==7">七级</span>
            <span v-if="scope.row.nodeLevel>7">{{scope.row.nodeLevel}}级</span>
          </template>
        </el-table-column>
        <el-table-column label="组织架构名称" align="center" prop="organizeName"></el-table-column>
        <el-table-column label="上级部门" align="center">
          <template slot-scope="scope">{{scope.row.parentName || "顶级部门"}}</template>
        </el-table-column>
        <el-table-column prop label="部门领导" align="center">暂无</el-table-column>
        <el-table-column prop label="部门员工" align="center">
          <template slot-scope="scope">
            <div class="amountUsers">
              <span class="text">{{ scope.row.sysuserCount || 0 }}</span>
              <span class="look" @click="$router.push({name: 'DepartmentalStaff', query: {childIds: (scope.row.childIds || []).join(','),userList:(scope.row.organizeName)}})">查看</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="用户数量" align="center">
          <template slot-scope="scope">
            <div class="amountUsers">
              <span class="text">{{ scope.row.userCount || 0 }}</span>
              <span
                class="look"
                @click="$router.push({name: 'NumberUsers', query: {childIds: (scope.row.childIds || []).join(',')}})"
              >查看</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="150">
          <template slot-scope="scope">
            <!-- <div class="small-Idiv">
                 <img src="@/common/images/icon/view.png" alt class="operation_img"/>
                  <span style="word-break: keep-all;">查看</span>
              </div>
              <div class="small-Idiv" >
                  <img src="../../../common/images/icon/dow.png" alt class="operation_img" />
                  <span style="word-break: keep-all;">导出开票</span>
              </div>
              <div class="small-Idiv" >
                  <img src="@/common/images/icon/xiangqing.png" alt class="operation_img" />
                <span style="word-break: keep-all;">导出组织</span>
            </div>-->
            <div
              class="small-Idiv"
              @click="editOrganiza(scope.row.organizeId,scope.row.parentName)"
              v-permit="'organization:edit'"
            >
              <img src="../../../common/images/icon/编辑.png" alt class="operation_img" />
              <span style="word-break: keep-all;">编辑</span>
            </div>
            <div
              class="small-Idiv"
              @click="handeleDelete(scope.row.organizeId)"
              v-permit="'organization:delete'"
            >
              <img src="../../../common/images/icon/icon_delete.png" alt class="operation_img" />
              <span style="word-break: keep-all;">删除</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import {
  getOrganizational,
  deleteOrganizational,
  getOrganizationListandCount
} from "@/api/permissions/index";
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  components: { Treeselect },
  data() {
    return {
      ruleForm: {
        parentId: null,
        organizeId: null
      },
      tableData: {
        currentPage: 1,
        sizes: [10, 20, 50, 100],
        size: 10,
        total: 0,
        content: "",
        getOrganization: ""
      },
      deleteBtn: false, //删除
      data: [],
      organizeId: "", // 组织架构id
      options: [] //组织架构
    };
  },
  async mounted() {
    this._getOrganizational();
    this.init();
  },
  methods: {
    handleUsers(userList){
      this.$router.push({
        name: 'DepartmentalStaff',
        query:{userList:userList}
      })
    },


    //删除
    handeleDelete(val) {
      this.deleteBtn = true;
      this.$confirm("确认删除他?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await deleteOrganizational(val);
          this.init();
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //生成树形结构
    async init() {
      const res = await getOrganizationListandCount();
      if (res.code === 200) {
        this.data = [res.data];
      }
    },

    _getOrganizational(data) {
      if (data) {
        this.tableData.currentPage = 1;
      }
      getOrganizationListandCount().then(res => {
        this.data = [res.data];

        this.tableData.total = res.data.total;
      });
    },
    addorganizational() {
      this.$router.push({ name: "Addorganizational" });
    },
    serch() {
      this._getOrganizational();
    },

    // 编辑
    editOrganiza(id, parentName) {
      this.$router.push({
        name: "Addorganizational",
        query: { id: id, parentName: parentName }
      });
    }
    // 删除
    // deleteOrganiza(id, type) {
    // var that = this;
    // if (id) {
    //   this.deleteBtn = true;
    //   this.organizeId = id;
    // }
    // if (type) {
    //   deleteOrganizational(this.organizeId).then(res => {
    //     if (res.code == 200) {
    //       that._getOrganizational();
    //       this.$message({
    //         type: "success",
    //         message: "删除成功!"
    //       });
    //     }
    //   });
    // }
    //  this.$confirm('此操作将永久删除该组织, 是否继续?', '提示', {
    // confirmButtonText: '确定',
    // cancelButtonText: '取消',
    // type: 'warning'
    // }).then(() => {
    //     deleteOrganizational(id).then((res) => {
    //         that._getOrganizational()
    //          this.$message({
    //             type: 'success',
    //             message: '删除成功!'
    //         });
    //     })

    // }).catch(() => {
    // this.$message({
    //     type: 'info',
    //     message: '已取消删除'
    // });
    // });
    // }
  }
};
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
.small-Idiv {
  float: left;
  width: 45%;
  padding-top: 10px;
}
.small-Idiv:nth-of-type(odd) {
  margin-left: 4%;
}
.amountUsers {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .text {
    color: rgba(76, 134, 244, 1);
  }
  .look {
    cursor: pointer;
    width: 57px;
    height: 27px;
    text-align: center;
    line-height: 27px;
    background: rgba(76, 134, 244, 1);
    border-radius: 2px;
    color: white;
  }
}
/deep/.vue-treeselect {
  width: 137px;
}
/deep/.el-table__expand-icon {
  position: absolute;
  right: 0;
}
</style>
