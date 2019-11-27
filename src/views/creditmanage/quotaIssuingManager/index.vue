<template>
  <div class="marginList margin margin1">
    <div class="mbottom mcard">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">额度管理人</h4>
          </div>
        </el-form>
      </div>
    </div>
    <el-card shadow="never">
      <el-row class="menu-tree">
        <el-col :span="12">
          <div class="menu">
            <div class="menuItem" style="width:230px;">{{ menuTitle }}</div>
            <div class="menuList">
              <el-tabs :tab-position="tabPosition" @tab-click="handleNodeClick1" v-if="treeData&&treeData.length>0">
                <el-tab-pane :label="item.label" v-for="item in treeData[0].children"  :name="item.id+''" v-if="item.label&&item.label!==undefined"  ref="menuTree">
                  <el-tabs :tab-position="tabPosition" @tab-click="handleNodeClick2">
                    <el-tab-pane :label="items.label" v-for="items in item.children" :name="items.id+''" v-if="items.label&&items.label!==undefined"  ref="menuTree">
                      <el-tabs :tab-position="tabPosition" @tab-click="handleNodeClick3">
                        <el-tab-pane :label="itemchildren.label" v-for="itemchildren in items.children"  :name="itemchildren.id+''" v-if="itemchildren.label&&items.label!==undefined"  ref="menuTree">
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
          <div class="goods-fitter" v-if="show">
            <div class="menu">
              <p>设置额度管理人</p>
            </div>
            <div v class="menu" v-if="formStatus == 1">
              <p>新增菜单</p>
            </div>
            <div v class="menu" v-if="formStatus == 2">
              <p>编辑菜单</p>
            </div>
            <el-form ref="form" label-width="150px">
              <div class="search-wrapper" style="border: unset" >
                  <el-form-item label="组织架构：">
                      {{ setUP }}
                  </el-form-item>
                  <el-form-item label="部门负责人：" style="position: relative;">
                      <el-input v-model="formSubmit.adminUserName" placeholder="请选择部门负责人"  ></el-input>
                      <div class="pos" @click="selectUser(1)"></div>
                  </el-form-item>
                 <el-form-item label="额度管理人：">
                     <el-input v-model="formSubmit.quotaAdminUserName" placeholder="请选择额度管理人" ></el-input>
                       <div class="pos" @click="selectUser(2)"></div>
                  </el-form-item>
                   <el-form-item label="额度发放人：">
                    <el-input v-model="formSubmit.quotaGrantUserName" placeholder="请选择额度发放人"></el-input>
                      <div class="pos" @click="selectUser(3)"></div>
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="danger"
                      @click="reset"
                    >重 置</el-button>
                  
                    <el-button
                      type="primary"
                      @click="save"
                    >确 定</el-button>
                  </el-form-item>
              </div>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </el-card>
    
     <!-- 用户列表弹框 -->
    <el-dialog :title="setTitle" :visible.sync="dialogGoodsVisible" width="80%"  :close-on-click-modal="false" :before-close="goodsDeliveryClose">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small" :model="form">
            <div class="search-wrapper">
              <h4 class="title">公司部门</h4>
              <div class="search-base">
                <el-row>
                  <el-col :span="8">
                    <el-col :span="24">
                        <el-col>
                              <el-form-item label="组织架构:">
                              <treeselect
                                :options="options"
                                search-nested
                                placeholder="请选择组织架构"
                                v-model="form.organizeId"
                              />
                            </el-form-item>
                        </el-col>
                    </el-col>
                  </el-col>
                  <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small" @click="selectUser(4)" >搜索</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small" :model="form">
            <div class="search-wrapper">
              <h4 class="title">用户列表</h4>
              <div style="margin: 0 20px 20px 0;">
                <el-table
                  :data="tableData"
                  stripe
                  style="width: 100%;max-height: 400px;overflow-y: scroll;"
                  border
                  ref="multipleTable"
                  @select="choose"
                  @select-all="choose"
                  @selection-change="dialogCheckChange"
                >
                  <el-table-column type="selection" label="选择"  align="center" width="55"></el-table-column>
                  <el-table-column label="公司名称" align="center" prop="">{{ companyName }}</el-table-column>
                  <el-table-column label="部门" align="center" prop="organizeName"></el-table-column>
                  <el-table-column label="登录账号" align="center" prop="sysuserAccount"></el-table-column>
                  <el-table-column label="姓名" align="center" prop="sysuserName"></el-table-column>
                  <el-table-column label="职位" align="center" prop="position"></el-table-column>
                  <el-table-column label="联系方式" align="center" prop="telephone"></el-table-column>
                </el-table>
                <!--
                <div class="pagination" style="text-align: right; margin-top: 20px;">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="formTable.current_page"
                    :page-sizes="[10, 30, 50, 100]"
                    :page-size="formTable.page_size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="formTable.total_count"
                  ></el-pagination>
                </div>
               -->
              </div>
            </div>
          </el-form>
        </div>
      </div>
       <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goodsDeliveryClose" size="small">取 消</el-button>
        <el-button type="danger" @click="goodsDelivery" size="small">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
// import { getAllMenu, getidMenu, deleteRole,  createatreeMenu, addMune,  editorMune, deletedMenu } from "@/api/permissions/index";
import { getAllMenu, getidMenu, getUserList, findByPage, getAllOrganizational, saveForm, updateForm, deleteRole,  createatreeMenu, addMune,  editorMune, deletedMenu } from "@/api/creditmanage/index";
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  components: {
    Treeselect
  },
  data() {
    return {
      setTitle:'',
      companyName:'',
      dialogGoodsVisible :false,  // 用户列表弹框
      organizeId: '', //所在部门
      tabPosition: 'left', 
      action: "",
      filterText: "",
      treeData: [],  // 树形结构数据
      options:[],
      options1:[],
      formData: {
        adminUserId :'',
        quotaAdminUserId :'',
        quotaGrantUserId :'',
      },
      setUP :'',
      formStatus: 0,
      menuId:'',  // 组织结构id
      show:false, // 右边显示内容
      form:{
        organizeId : '',  //弹框根据组织id查询
      },
      formTable: {
        current_page: 1,
        page_size: 10,
        total_count: 0
      },   
      tableData:[],
      selectioned:'',
      distinguish:'',
      userId: '',
      userName: '',
      formSubmit: {         // 保存提交数据
         adminUserId: '',
         adminUserName: '',
         quotaAdminUserId: '',
         quotaAdminUserName: '',
         quotaGrantUserId: '',
         quotaGrantUserName: '',
         organizeId: '',
         organizeName: '',
      },
      updata:'',  // 新增还是编辑 1 新增 2编辑
      menuTitle:''
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
  created(){
    // 外面的树形结构
   
    // 弹框里面搜索的树形结构
    //  getAllOrganizational().then(res => {
    //   let arr1 = [];
    //   arr1.push(res.data);
    //   this.transleteData1(arr1, this.options1);
    //   this.IterationDelateMenuChildren1(this.options1);
    // });
  },
  methods: {
     transleteData1(data, arr) {
      data.forEach(item => {
        if (!item.parentId) {
          item.parentId = 0;
          item.parentName = "所有部门";
        }
        const msg = {
          id: item.organizeId,
          label: item.organizeName,
          value: item.organizeId,
          children: item.childNodes ? [] : null,

          isLeaf: item.childNodes ? false : true
        };
        if (item.childNodes && item.childNodes.length > 0) {
          this.transleteData1(item.childNodes, msg.children);
        }
        arr.push(msg);
      });
      return arr;
    },
     IterationDelateMenuChildren1(arr) {
      if (arr.length) {
        for (let i in arr) {
          if (arr[i].children.length) {
            this.IterationDelateMenuChildren1(arr[i].children);
          } else {
            delete arr[i].children;
          }
        }
      }
      return arr;
    },
    getAllMenuModal(){
         this.options = []
         this.form.organizeId = null

         getAllMenu().then(res => {
        // let arr = [];
        // arr.push(res.data);
        if( res.code == 200 ){
          var data=[]
          data[0] =  res.data
          this.transleteData(data, this.options);
          this.IterationDelateMenuChildren(this.options);
        }
      
      });
    },
   // 选择用户列表
    selectUser(index) {
       if( index == 1 ){
          this.distinguish = '1'
          this.form.organizeId = null
          this.tableData = []
          this.getAllMenuModal()
          this.setTitle = "设置"+this.setUP+"的部门负责人"
       }else if( index == 2 ){
          this.distinguish = '2'
          this.form.organizeId = null
          this.tableData = []
          this.getAllMenuModal()
          this.setTitle = "设置"+this.setUP+"的额度管理人"
       }else if( index == 3 ){
          this.distinguish = '3'
          this.form.organizeId = null
          this.tableData = [] 
          this.getAllMenuModal()
          this.setTitle = "设置"+this.setUP+"的额度发放人"
       }
       this.dialogGoodsVisible = true
       let data = {}
      // data.pageNum = this.formTable.current_page
      // data.pageSize = this.formTable.page_size

      if( index == 4 ){
        data.organizeId = this.form.organizeId
        if( data.organizeId ){
              findByPage(data).then(res => {
                //  this.formTable.total_count = res.data.total
                  this.tableData = res.data
              });
        }
      
      }
    },
     // 弹框确定选择用户
     goodsDelivery() {
       if ( !this.userId ) {
             this.$message({
              message: '请选择需要选择的用户',
              type: 'warning'
            })
            return
       }else{
              if(   this.distinguish == '1' ){
                this.formSubmit.adminUserId = this.userId
                this.formSubmit.adminUserName = this.userName
            }else if(   this.distinguish == '2' ){
                this.formSubmit.quotaAdminUserId = this.userId
                this.formSubmit.quotaAdminUserName = this.userName
            }else if(   this.distinguish == '3' ){
                this.formSubmit.quotaGrantUserId = this.userId
                this.formSubmit.quotaGrantUserName = this.userName
            }        
            this.dialogGoodsVisible = false
      }

    },
    // 弹框取消
    goodsDeliveryClose(){
       if ( !this.selectioned) {
           this.dialogGoodsVisible =false
       }else{
          this.$confirm('是否取消设置额度管理人?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
             this.dialogGoodsVisible =false
          }).catch(() => {
                      
          }); 
       }
    },
   // 弹框表格的选择 
    choose (selection, row){
          this.userId = ''
          this.userName = ''
          this.$refs.multipleTable.clearSelection()
          if (selection.length === 0) { // 判断selection是否有值存在
            return
          }
          if (row) {
            this.selectioned = row
            this.$refs.multipleTable.toggleRowSelection(row, true)
            if( row.length ){
              this.userId = row[0].sysuserId
              this.userName = row[0].sysuserName
            }
         }
    },
    // 表格选择单选
    dialogCheckChange(row){
       if (row.length === 0) {
         this.selectioned = null
       }else if( row.length >1  ){
          this.selectioned = null
       }else{
        this.userId = row[0].sysuserId
        this.userName = row[0].sysuserName
       }
    },
    transleteData(data, arr) {
      data.forEach(item => {
        if (!item.parentId) {
          item.parentId = 0;
          this.companyName = item.organizeName
          item.parentName = "所有部门";
        }
        const msg = {
          id: item.organizeId,
          label: item.organizeName,
          value: item.organizeId,
          children: item.childNodes ? [] : null,

          isLeaf: item.childNodes ? false : true
        };
        if (item.childNodes && item.childNodes.length > 0) {
          this.transleteData(item.childNodes, msg.children);
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
    // 一级点击
    handleNodeClick1(event){
      this.handleNodeClick(event.name)
      this.menuId=event.name
      this.form.organizeId = event.name
      this.setUP = event.label
      this.formSubmit.organizeId = event.name
      this.formSubmit.organizeName = event.label
    },
    // 二级点击
    handleNodeClick2(event){
      this.handleNodeClick(event.name)
      this.menuId=event.name
      this.form.organizeId = event.name
      this.setUP = event.label
      this.formSubmit.organizeId = event.name
      this.formSubmit.organizeName = event.label
    },
    // 三级点击
    handleNodeClick3(event){
      this.handleNodeClick(event.name)
      this.menuId=event.name
      this.form.organizeId = event.name
      this.setUP = event.label
      this.formSubmit.organizeId = event.name
      this.formSubmit.organizeName = event.label
    },
    // 保存提交数据
    save(){
        var data = {}
        if( this.formSubmit.organizeId ){
          data.organizeId = this.formSubmit.organizeId
          data.organizeName = this.formSubmit.organizeName
        }
        if( this.formSubmit.quotaAdminUserId ){
         data.quotaAdminUserId = this.formSubmit.quotaAdminUserId
         data.quotaAdminUserName = this.formSubmit.quotaAdminUserName
        }
        if( this.formSubmit.quotaGrantUserId ){
         data.quotaGrantUserId = this.formSubmit.quotaGrantUserId
         data.quotaGrantUserName = this.formSubmit.quotaGrantUserName
        }
        if( this.formSubmit.adminUserId ){
          data.adminUserId = this.formSubmit.adminUserId
          data.adminUserName = this.formSubmit.adminUserName
        }
       
        if( this.updata == '1'  ){
          saveForm(data).then(res => {
          //  this.formTable.total_count = res.data.total
             this.$message({
                message: '操作成功',
                type: 'success'
              });
          });   

        }else if( this.updata == '2' ) {
          updateForm(this.formSubmit).then(res => {
          //  this.formTable.total_count = res.data.total
              this.$message({
                message: '操作成功',
                type: 'success'
              });
          });   
        }
    },
     handleSizeChange (val) {
      this.pagination.page_size = val
      this.getMailList()
    },
    handleCurrentChange (val) {
      this.pagination.current_page = val
      this.getMailList()
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
      var data1 = []
      data1[0] = data
      this.menuTitle = data.organizeName
      const treeData = this.buildMenuTree(data1);
      //初始化菜单树
      this.treeData = treeData;
    },
    async handleNodeClick(event) {
      this.formStatus = 0;
      //获取菜单数据
      const { data } = await getidMenu(event)
     
      this.show = true
      if( data ){
        // 编辑
        this.updata = "2"
        this.formSubmit = data
           
      }else {
        // 新增
        this.updata = '1'
        this.formSubmit ={ }
        this.formSubmit.organizeId = this.menuId
        this.formSubmit.organizeName = this.setUP
      }
     
    },
    // 重置
    reset() {
        this.formSubmit ={ }
        this.formSubmit.organizeId = this.menuId
        this.formSubmit.organizeName = this.setUP
        var data = {}
        if( this.formSubmit.organizeId ){
          data.organizeId = this.formSubmit.organizeId
          data.organizeName = this.formSubmit.organizeName
        }
        if( this.updata == '1'  ){
          saveForm(data).then(res => {
          //  this.formTable.total_count = res.data.total
             this.$message({
                message: '操作成功',
                type: 'success'
              });
          });   

        }else if( this.updata == '2' ) {
          updateForm(data).then(res => {
          //  this.formTable.total_count = res.data.total
              this.$message({
                message: '操作成功',
                type: 'success'
              });
          });   
        }
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
            id: item.organizeId,
            label: item.organizeName ,
            children: this.buildMenuTree(item.childNodes)
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
<style scoped>
  .margin1 >>> .el-dialog__body {
    padding: 0 !important;
    background: none !important;
  }
</style>
<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.mcard{
  padding:0;
}
.mcard .title {
    color: #333;
    margin-left: -20px;
    font-size: 16px;
    font-weight: 400;
    padding-left: 10px;
    line-height: 1.4;
    border-left: 4px solid #4C86F4;
    margin-bottom: 10px;
}
.goods-fitter .el-form {
  border:0 !important;
}
.pos{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  opacity: 0;
}
.search-wrapper {
    padding-left: 20px;
    padding-top: 5px;
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
      }
    }
  }
/deep/.el-form{
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
/deep/.el-card__body{

}
}
</style>
