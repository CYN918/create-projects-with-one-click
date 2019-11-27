<template>
  <div class="marginList">
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">搜索条件</h4>
            <div class="search-base">
              <el-row>
                <el-col :span="6">
                  <el-col>
                    <el-form-item label="菜单名称：">
                      <el-col :span="22">
                        <el-input v-model="filterText" placeholder="请完成输入菜单名称" style="width: 200px"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="1" class="btn_right">
                  <el-button type="primary" size="small" @click="searchMenu(treeData)">搜索</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <el-card shadow="never">
      <el-row class="menu-tree">
        <el-col :span="12">
          <div class="menu">
            <div class="menuItem" v-if="treeData&&treeData.length>0">{{treeData[0].label}}</div>
            <div class="menuList" >
              <el-tabs :tab-position="tabPosition" @tab-click="handleNodeClick1"  v-if="treeData&&treeData.length>0">
                <el-tab-pane :label="item.label" v-for="item in treeData[0].children"  :name="item.id" ref="menuTree" :key="item.id">
                  <el-tabs :tab-position="tabPosition" @tab-click="handleNodeClick2" v-if="item.children&&item.children.length>0">
                    <el-tab-pane :label="items.label" v-for="items in item.children" :name="items.id"   ref="menuTree" :key="items.id">
                      <el-tabs :tab-position="tabPosition" @tab-click="handleNodeClick3" v-if="items.children&&items.children.length>0">
                        <el-tab-pane :label="itemchildren.label" v-for="itemchildren in items.children"  :name="itemchildren.id"   ref="menuTree" :key="itemchildren.id">
                        </el-tab-pane>
                      </el-tabs>
                    </el-tab-pane>
                  </el-tabs>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-col>
        <!--<el-col class="form-divider" :span="2">-->
          <!--<el-divider direction="vertical" />-->
        <!--</el-col>-->
        <el-col :span="12">
          <div class="goods-fitter" v-if="formData.menuId || formData.parentId">
            <div class="menu" v-if="formStatus == 0">
              <p>菜单详情</p>
            </div>
            <div v class="menu" v-if="formStatus == 1">
              <p>新增菜单</p>
            </div>
            <div v class="menu" v-if="formStatus == 2">
              <p>编辑菜单</p>
            </div>
            <el-form ref="form" label-width="150px">
              <div class="search-wrapper" style="border: unset" >
                <el-form-item label="父级菜单：" v-if="formStatus == 2||formStatus == 1">
                  <treeselect
                      style="width:300px"
                      :options="options"
                      :value="formData.parentId"
                      search-nested
                      placeholder="请选择菜单"
                      v-model="formData.parentId"
                      @select="selectDepart"

                  />
                </el-form-item>
                <!--<el-form-item label="父级菜单：">-->
                  <!--<el-input v-model="formData.parentName" :disabled="formStatus!=1||formStatus!=2"></el-input>-->
                <!--</el-form-item>-->
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
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  components: {
    Treeselect
  },
  data() {
    return {
      tabPosition: 'left',
      action: "",
      filterText: "",
      treeData: [],
      options:[],
      formData: {},
      formStatus: 0,
      menuId:''
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
  },
  created(){
    getAllMenu().then(res => {
      // let arr = [];
      // arr.push(res.data);
      this.transleteData(res.data, this.options);
      this.IterationDelateMenuChildren(this.options);
    });
  },

  methods: {
    //搜索菜单
    searchMenu(tree){
      if(this.filterText=='') return this.$message('请输入搜索的内容')
      tree.forEach(item=>{
          if(item.children&&item.children.length>0){
            this.searchMenu(item.children)
          }
        if(item.label==this.filterText){
          this.menuId = item.id
          this.handleNodeClick(item.id)
        }
      })
    },
    selectDepart(val){
      this.menuId = val.id
    },
    transleteData(data, arr) {
      data.forEach(item => {
        if (!item.parentId) {
          item.parentId = 0;
          item.parentName = "所有菜单";
        }
        const msg = {
          id: item.menuId,
          label: item.menuName,
          value: item.menuId,
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


    handleNodeClick1(event){
      this.handleNodeClick(event.name)
      this.menuId=event.name
    },
    handleNodeClick2(event){
     this.handleNodeClick(event.name)
      this.menuId=event.name
    },

    handleNodeClick3(event){
      this.handleNodeClick(event.name)
      this.menuId=event.name
    },

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
      console.log(data)
      const treeData = this.buildMenuTree(data);
      //初始化菜单树
      this.treeData = treeData;
      console.log(this.treeData )
    },
    async handleNodeClick(event) {
      this.formStatus = 0;
      //获取菜单数据
      const { data } = await getidMenu(event);
      this.formData = data;
    },
    async saveMenu() {
      switch (this.formStatus) {
        case 1: {
          // const currentNode = this.$refs.menuTree.getCurrentNode();
          const data = await addMune({
            ...this.formData,
            parentId: this.menuId
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
      // const currentNode = this.$refs.menuTree.getCurrentNode();
      const data = await deletedMenu(this.menuId);
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
/deep/.el-form{
  margin-top: -10px;
  width: 100%;
  background:rgba(255,255,255,1);
  border:1px solid rgba(214,222,239,1);
}
.menu{
  p{
    position: relative;
    top: 1px;
    background: white;
    border:1px solid rgba(214, 222, 239, 1) ;
    text-align: center;
    line-height: 46px;
    border-bottom: none;
    border-top: none;
    font-weight: 400;
    margin-bottom: 10px;
    font-size:16px;
    font-family:Microsoft YaHei;
    color:rgba(51,51,51,1);
    width:170px;
    height:46px;
  }
}
  .search-wrapper {
    padding: 20px;
    border: 1px solid rgb(215, 224, 241);
    background: #fff;
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
.menu{
  width: 97%;
  .menuItem{
    font-size:16px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(51,51,51,1);
    width:170px;
    height:46px;
    text-align: center;
    line-height: 46px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(215,225,241,1);
    border-bottom:none ;
  }
  .menuList{
    background:rgba(255,255,255,1);
    border:1px solid rgba(214,222,239,1);
  }
  /deep/.el-tabs__nav-scroll{
    width: 170px;
    text-align: center;
  }
  /deep/.el-tabs__item{
    text-align: center;
  }
  /deep/.el-tabs__item{
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(60,60,60,1);
  }
  /deep/.is-active{
    background: rgba(76, 134, 244, 1);
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
/deep/.el-tabs{
  padding-top:20px ;
}
/deep/.menuItem{
  border-bottom: none;
  border-top:none;
  position: relative;
  top: 1px;
}
/deep/.menu-tree .el-col-10{
  overflow: auto;
}
/deep/.search-wrapper{
  padding: 0;
}
/deep/.el-col{
  width: 50%;
}
/deep/.el-col-8{
  width: 50%;
}
}
</style>
