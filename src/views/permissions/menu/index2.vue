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
                    <el-form-item label="菜单名称：">
                      <el-col :span="22">
                        <el-input v-model="filterText" placeholder="请输入菜单名称内容"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="1" class="btn_right">
                  <el-button type="primary" size="small">搜索</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <el-card shadow="never">
      <el-row class="menu-tree">
        <el-col :span="8" style="height: 550px; overflow-y: scroll">
          <el-tree
            :data="treeData"
            :props="{children: 'children', label: 'label'}"
            :default-expand-all="true"
            :filter-node-method="filterNode"
            @node-click="handleNodeClick"
            ref="menuTree"
          />
        </el-col>
        <el-col class="form-divider" :span="2">
          <el-divider direction="vertical" />
        </el-col>
        <el-col :span="10">
          <div class="goods-fitter" v-if="formData.menuId || formData.parentId">
            <el-form ref="form" label-width="150px">
              <div class="search-wrapper" style="border: unset">
                <h4 class="title">
                  <template v-if="formStatus == 0">菜单详情</template>
                  <template v-if="formStatus == 1">新增菜单</template>
                  <template v-if="formStatus == 2">编辑菜单</template>
                </h4>
                <el-form-item label="父级菜单：">
                  <el-input v-model="formData.parentName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="菜单名称：">
                  <el-input v-model="formData.menuName" :disabled="formStatus == 0"></el-input>
                </el-form-item>
                <el-form-item label="菜单类型：">
                  <el-radio-group v-model="formData.menuType" :disabled="formStatus == 0">
                    <el-radio :label="'0'">菜单</el-radio>
                    <el-radio :label="'1'">按钮</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="权限标识：">
                  <el-input v-model="formData.permission" :disabled="formStatus == 0"></el-input>
                </el-form-item>
                <el-form-item label="页面地址：">
                  <el-input v-model="formData.pageUrl" :disabled="formStatus == 0"></el-input>
                </el-form-item>
                <el-form-item label="菜单图标(未选中):">
                  <el-upload
                    class="avatar-uploader"
                    :action="action"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :disabled="formStatus == 0"
                  >
                    <img
                      v-if="formData.defaultIcon"
                      :src="formData.defaultIcon "
                      class="avatar imgbig"
                    />
                    <el-button v-if="!formData.defaultIcon" size="small" type="info">选择文件</el-button>
                  </el-upload>
                  <!-- <img :src="formData.defaultIcon" alt="" v-if="formStatus == 0" > -->
                </el-form-item>
                <el-form-item label="菜单图标(选中):">
                  <el-upload
                    class="avatar-uploader"
                    :disabled="formStatus == 0"
                    :action="action"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess2"
                  >
                    <img
                      v-if="formData.selectIcon"
                      :src="formData.selectIcon "
                      class="avatar imgbig"
                    />
                    <el-button v-if="!formData.selectIcon" size="small" type="info">选择文件</el-button>
                  </el-upload>
                  <!-- <img :src="formData.selectIcon" alt="" v-if="formStatus == 0" class="location"> -->
                </el-form-item>
                <el-form-item label="排序值:" prop>
                  <el-input v-model="formData.sort" :disabled="formStatus == 0"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button v-if="formStatus != 0" @click="formStatus = 0">取消</el-button>
                  <el-button
                    type="success"
                    v-if="formStatus == 0"
                    v-permit="'menu:save'"
                    @click="formStatus = 1"
                  >新增</el-button>
                  <el-button
                    type="primary"
                    v-if="formStatus == 0"
                    v-permit="'menu:edit'"
                    @click="formStatus = 2"
                  >编辑</el-button>
                  <el-button type="success" v-if="formStatus != 0" @click="saveMenu">保存</el-button>
                  <el-button
                    type="danger"
                    v-if="formStatus == 0"
                    v-permit="'menu:delete'"
                    @click="deleteMenu"
                  >删除</el-button>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import {
  getAllMenu,
  getidMenu,
  deleteRole,
  createatreeMenu,
  addMune,
  editorMune,
  deletedMenu
} from "@/api/permissions/index";
export default {
  data() {
    return {
      action: "",
      filterText: "",
      treeData: [],
      formData: {},
      formStatus: 0
    };
  },
  watch: {
    formStatus(value) {
      switch (value) {
        case 0:
          this.formData = {};
          break;
        case 1:
          this.formData = {
            parentId: this.formData.menuId,
            parentName: this.formData.menuName
          };
          break;
      }
    },
    filterText(value) {
      this.$refs.menuTree.filter(value);
    }
  },
  methods: {
    //上传图片成功
    handleAvatarSuccess(res, file) {
      this.formData.defaultIcon = res.data.domain + res.data.filePath;
    },
    //上传图片成功
    handleAvatarSuccess2(res, file) {
      this.formData.selectIcon = res.data.domain + res.data.filePath;
    },
    async initMenuData() {
      const { data } = await getAllMenu();
      const treeData = this.buildMenuTree(data);

      //初始化菜单树
      this.treeData = treeData;
    },
    async handleNodeClick(event) {
      this.formStatus = 0;

      //获取菜单数据
      const { data } = await getidMenu(event.id);
      this.formData = data;
    },
    async saveMenu() {
      switch (this.formStatus) {
        case 1: {
          const currentNode = this.$refs.menuTree.getCurrentNode();
          const data = await addMune({
            ...this.formData,
            parentId: currentNode.id
          });
          if (data.code == 200) {
            this.$message({
              type: "success",
              message: "新增成功!"
            });
            this.formStatus = 0;
            this.initMenuData();
          }
          break;
        }
        case 2: {
          const data = await editorMune(this.formData);
          if (data.code == 200) {
            this.$message({
              type: "success",
              message: "保存成功!"
            });

            this.formStatus = 0;
            this.initMenuData();
          }
          break;
        }
      }
    },
    async deleteMenu() {
      await this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });
      const currentNode = this.$refs.menuTree.getCurrentNode();
      const data = await deletedMenu(currentNode.id);
      if (data.code == 200) {
        this.$message({
          type: "success",
          message: "删除成功!"
        });

        this.formStatus = 0;
        this.initMenuData();
      }
    },
    buildMenuTree(menuData) {
      if (menuData && menuData.length) {
        return menuData.map(item => {
          return {
            id: item.menuId,
            label: item.menuName,
            children: this.buildMenuTree(item.children)
          };
        });
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  },
  mounted() {
    this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
    this.initMenuData();
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

.form-divider {
  .el-divider {
    height: 550px;
  }
}
.location {
  position: relative;
  top: 9px;
}
</style>
