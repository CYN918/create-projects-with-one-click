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
                    <el-form-item label="角色名称：">
                      <el-col :span="22">
                        <el-input v-model="tableData.serch" clearable placeholder="请输入角色名称"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="1" class="btn_right">
                  <el-button type="primary" size="small" @click="_getRole(true)">搜索</el-button>
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
          <el-button type="primary" size="small" v-permit="'role:save'" @click="addrole">新增</el-button>
        </el-col>
        <el-col :span="3"></el-col>
      </el-row>
      <el-table :data="tableData.data" border style="width: 100%" stripe>
        <el-table-column prop="roleId" label="角色ID" align="center"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
        <el-table-column prop="organizeName" label="部门" align="center"></el-table-column>
        <el-table-column prop="description" label="描述" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="修改时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="150">
          <template slot-scope="scope">
            <div
              class="small-Idiv"
              @click="dialogVisibleFunc(scope.row.roleId)"
              v-permit="'relevant:users'"
            >
              <div class="i-div">
                <img src="../../../common/images/icon/审核.png" alt class="operation_img" />
              </div>
              <span>关联用户</span>
            </div>
            <div
              class="small-Idiv"
              @click="onRoleAuthorityEvent(scope.row)"
              v-permit="'role:authorization'"
            >
              <div class="i-div">
                <img src="../../../common/images/icon/服务授权.png" alt class="operation_img" />
              </div>
              <span>角色授权</span>
            </div>
            <div class="small-Idiv" v-permit="'role:edit'" @click="editRole(scope.row.roleId)">
              <div class="i-div">
                <img src="../../../common/images/icon/编辑.png" alt class="operation_img" />
              </div>
              <span>编辑</span>
            </div>
            <div
              class="small-Idiv"
              v-if="!scope.row.systemRole"
              v-permit="'role:delete'"
              @click="deleteRole(scope.row.roleId)"
            >
              <div class="i-div huishouzhan">
                <img src="../../../common/images/icon/回收站.png" alt class="operation_img" />
              </div>
              <span>移除</span>
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

      <!-- 角色授权 -->
      <el-dialog
        :title="roleName"
        :visible.sync="roleAuthorityDialogVisible"
        :width="clikeWidh"
        :fullscreen="conten"
        :close-on-click-modal='false'
      >
         <div  style="cursor: pointer;position: absolute;right: 62px;top: 21px;" :title="fillTit" @click="fullScreen"><img :src="fullImg" alt style="height: 12px;width: 12px;" /></div>
        <div :style="{'height': clikeHeight,'overflow': 'auto'}">
          <table id="table1" class="authority-table">
            <thead>
              <tr class="table__tr-wrapper">
                <th width="180">一级菜单</th>
                <th width="180">二级菜单</th>
                <th>功能权限及隐私字段</th>
              </tr>
            </thead>
            <tr v-for="item1 in menuTree" :key="item1.id">
              <td class="solid-td">
                <el-checkbox
                  v-model="item1.checked"
                  @change="onChangeAuthorityCheckbox($event, item1)"
                >{{item1.menuName}}</el-checkbox>
              </td>
              <td class="solid-td" colspan="2" width="180">
                <table class="table2">
                  <template v-if="item1.children && item1.children.length">
                    <tr v-for="item2 in item1.children" :key="item2.id">
                      <td width="179" class="solid-td">
                        <el-checkbox
                          v-model="item2.checked"
                          @change="onChangeAuthorityCheckbox($event, item2); item1.checked = true;"
                        >{{item2.menuName}}</el-checkbox>
                      </td>
                      <td>
                        <table class="table3">
                          <tr v-for="item3 in item2.children" :key="item3.id">
                            <td>
                              <el-checkbox
                                v-model="item3.checked"
                                @change="onChangeAuthorityCheckbox($event, item3); item1.checked = true; item2.checked = true;"
                              >{{item3.menuName}}</el-checkbox>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr>
                      <td class="solid-td" width="179"></td>
                      <td></td>
                    </tr>
                  </template>
                </table>
              </td>
            </tr>
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="roleAuthorityDialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" size="small" @click="onSaveRoleAuthority">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 关联用户 -->
      <el-dialog title="角色人员" :visible.sync="dialogVisible" width="800px"  :before-close="()=>{value = [];dialogVisible=false;data=[]}">
        <div class="roleuser">
          <el-transfer v-model="value" :data="data" :titles="['角色人员名单', '角色使用授权']"></el-transfer>
          <span class="pushmsg">推送</span>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger" @click="dialogVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="submitAssociated" size="small">确 定</el-button>
          </div>
        </div>
      </el-dialog>

      <!-- 移除角色 -->
      <el-dialog title="删除用户" :visible.sync="usershow" width="40%">
        <span>是否确认删除角色</span>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="usershow = false" size="small">取 消</el-button>
          <el-button type="primary" @click="submitDelete" size="small">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  getRole,
  deleteRole,
  getidRole,
  getAlluser,
  getAllMenu,
  editorRole,
  saveAssociateduser
} from "@/api/permissions/index";
 import fullImg from '../../../common/images/icon/fullscreen.png'
 import fullImg1 from '../../../common/images/icon/fullscreen1.png'

export default {
  data() {
    return {
      innerHeight:
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight,
      clikeWidh: "60%",
      clikeHeight: "600px",
      conten: false,
      fullImg:fullImg,
      fillTit:'全屏显示',
      dialogVisible: false, // 角色关联用户弹窗
      roleAuthorityDialogVisible: false, // 角色权限配置弹窗
      usershow: false, // 删除用户弹窗
      menuTree: null,
      data: [],
      value: [],
      roleId: "", // 角色id
      initMenuData: false,
      tableData: {
        data: [],
        currentPage: 1,
        sizes: [10, 20, 50, 100],
        size: 10,
        total: 0,
        serch: ""
      },
      roleName:'',  //角色授权角色
    };
  },
  created() {
    if (this.$route.query.currentPage) {
      this.tableData.currentPage = Number(this.$route.query.currentPage);
    }
    this._getRole();
  },
  methods: {
    //点击全屏
    fullScreen() {
      this.conten = !this.conten;
      if (this.conten) {
        this.clikeHeight = this.innerHeight + "px";
        this.fullImg = fullImg1
        this.fillTit = "退出全屏"
      } else {
        (this.clikeWidh = "60%"), (this.clikeHeight = "600px");
          this.fullImg = fullImg
         this.fillTit = "全屏显示"
      }
    },
    // 确定删除
    submitDelete() {
      deleteRole(this.roleId).then(res => {
        this._getRole();
        this.usershow = false;
        this.$message({
          type: "success",
          message: res.message
        });
      });
    },
    // 保存角色关联用户
    submitAssociated() {
      let userIds = "";
      this.value.forEach(item => {
        userIds += item + ";";
      });
      saveAssociateduser(
        this.roleId,
        userIds.slice(0, userIds.length - 1)
      ).then(res => {
        if(res.code == 200){
          this.value = [];
          this.data=[]
          this.dialogVisible = false;
          this.$message({
          message: res.message,
          type: 'success'
        });
        }
      });
    },
    dialogVisibleFunc(id) {
      this.roleId = id;
      this.dialogVisible = true;
      this.value = [];
      let bigid = id;
      let that = this;
      setTimeout(function() {
        that._getAlluser(id);
      }, 50);
    },

    // 获取用户已关联角色
    _getAlluser(val) {
      getAlluser(val).then(res => {
        res.have_relation.forEach((item, index) => {
          this.data.push({
            label: item.sysuserName,
            key: `${item.sysuserId}`
          });
          this.value.push(`${item.sysuserId}`);
        });
        res.un_relation.forEach(item => {
          this.data.push({
            label: item.sysuserName,
            key: `${item.sysuserId}`
          });
        });
      });
    },
    addrole() {
      this.$router.push({ name: "Addrole" });
    },
    async _getRole(value) {
      if (value) this.tableData.currentPage = 1;
      const { data } = await getRole(this.tableData);

      this.tableData.data = data.list;
      this.tableData.total = data.total;
    },
    handleSizeChange(val) {
      this.tableData.size = val;
      this._getRole();
    },
    handleCurrentChange(val) {
      this.tableData.currentPage = val;
      this._getRole();
    },
    // 编辑
    editRole(id) {
      this.$router.push({
        name: "Addrole",
        query: { id: id, currentPage: this.tableData.currentPage }
      });
    },
    // 删除
    deleteRole(id) {
      this.usershow = true;
      this.roleId = id;
    },
    /**
     * 权限选框改变事件
     */
    onChangeAuthorityCheckbox(e, item) {
      if (!this.initMenuData) return;
      const selectCheckbox = (children, checked) => {
        if (children && children.length) {
          children.forEach(item => {
            item.checked = checked;
            selectCheckbox(item.children, checked);
          });
        }
      };
      selectCheckbox(item.children, e);
    },

    /**
     * 初始化菜单树
     */
    async initMenuTree() {
      const res = await getAllMenu();
      if (res.code === 200) {
        this.menuTree = res.data[0].children;
      }
    },

    /**
     * 获取当前角色拥有的菜单权限ID
     */
    initRoleMenuSelected(menu, authorities) {
      if (menu && menu.length > 0) {
        return menu.forEach(item => {
          //如果该菜单不需要权限或拥有权限则添加
          if (item.permission == null || item.permission == "") {
            item.checked = true;
          } else {
            if (authorities.includes(item.permission)) {
              item.checked = true;
            } else {
              return;
            }
          }

          //如果存在子节点则添加
          if (item.children && item.children.length) {
            this.initRoleMenuSelected(item.children, authorities);
          }
        });
      }
    },

    /**
     * 点击角色授权按钮事件
     */
    async onRoleAuthorityEvent(e) {
      this.roleName = "角色授权" + "("+ e.roleName + ")"
      this.menuTree = [];
      this.initMenuData = false;
      await this.initMenuTree();
      this.roleAuthorityDialogVisible = true;

      const { data } = await getidRole(e.roleId);
      const authorities = data.authorities || [];
      this.initRoleMenuSelected(this.menuTree, authorities);
      this.roleId = data.roleId;
      this.initMenuData = true;
    },

    /**
     * 点击角色授权确定保存按钮事件
     */
    async onSaveRoleAuthority() {
      const findAuthorities = menuTree =>
        menuTree.reduce((arr, item) => {
          if (
            item.checked &&
            item.permission != null &&
            item.permission != ""
          ) {
            arr.push(item.permission);
          }
          if (item.children && item.children.length) {
            arr = arr.concat(findAuthorities(item.children));
          }
          return arr;
        }, []);
      const authorities = findAuthorities(this.menuTree);

      try {
        const res = await editorRole(
          {
            authorities: JSON.stringify(authorities)
          },
          this.roleId
        );

        this.$message({
          message: res.message,
          type: "success"
        });
      } finally {
        this.roleAuthorityDialogVisible = false;
      }
    }
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
  text-align: center;
}
.i-div {
  cursor: pointer;
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
.small_top {
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
}
.roleuser {
  position: relative;
  .pushmsg {
    position: absolute;
    top: 11px;
    left: 47%;
    font-size: 16px;
    color: #303133;
    font-weight: 400;
  }
}
table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}
.table__tr-wrapper {
  background: RGBA(247, 250, 255, 1);
  th {
    border: 1px solid #f0f0f0;
  }
}
.authority-table tr td:first-child {
  text-align: left;
  padding-left: 20px;
}
.authority-table .solid-td {
  border: 1px solid #f0f0f0;
}

table th,
td {
  height: 35px;
  line-height: 35px;
}
.table2 tr td:nth-child(1) {
  border-left: 0;
  border-bottom: 0;
  border-top: 0;
}
.table2 tr:nth-child(1) td {
  border-top: 0;
}
.table3 {
  display: flex;
  flex-wrap: wrap;
}

.w200 {
  width: 200px;
}
.small-Idiv {
  float: left;
  width: 45%;
  padding-top: 10px;
}
.small-Idiv:nth-of-type(odd) {
  margin-left: 4%;
}
</style>
