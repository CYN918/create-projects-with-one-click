<template>
  <div class="marginList margin">
    <div class="mbottom mcard">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">行业分类</h4>
          </div>
        </el-form>
      </div>
    </div>
    <el-card shadow="never">
      <el-row class="menu-tree">
        <el-col :span="12">
          <div class="menu">
            <div class="menuList">
              <el-tabs :tab-position="tabPosition" @tab-click="handleNodeClick1">
                <el-tab-pane :label="item.industryName" v-for="item in treeData"  :name="item.id" v-if="item.industryName&&item.industryName!==undefined"  ref="menuTree">
                  <el-tabs :tab-position="tabPosition" @tab-click="handleNodeClick2">
                    <el-tab-pane :label="items.industryName" v-for="items in treeDataChildren" :name="items.id" v-if="items.industryName&&items.industryName!==undefined"  ref="menuTree">
                      <el-tabs :tab-position="tabPosition" @tab-click="handleNodeClick3">
                        <el-tab-pane :label="itemchildren.industryName" v-for="itemchildren in treeDataChildrenDetail"  :name="itemchildren.id" v-if="itemchildren.industryName&&itemchildren.industryName!==undefined"  ref="menuTree">
                          <el-tabs :tab-position="tabPosition" @tab-click="handleNodeClick4">
                            <el-tab-pane :label="item.industryName" v-for="item in lists"  :name="item.id" v-if="item.industryName&&item.industryName!==undefined"  ref="menuTree">
                            </el-tab-pane>
                          </el-tabs>
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
          <div class="goods-fitter">
            <div class="menu">
              <p>设置行业分类详情</p>
            </div>
            <el-form ref="form" label-width="150px">
              <div class="search-wrapper" style="border: unset" >
                  <el-form-item label="分类ID：">
                      <el-input v-model="formData.id" placeholder="请输入分类ID"></el-input>
                  </el-form-item>
                  <el-form-item label="父级分类：">
                      <el-input v-model="parentClassification" placeholder="请输入父级分类"></el-input>
                  </el-form-item>
                 <el-form-item label="分类名称：">
                      <el-input v-model="formData.industryName" placeholder="请输入分类名称"></el-input>
                  </el-form-item>
                   <el-form-item label="分类说明：">
                      <el-input v-model="formData.remark" placeholder="请输入分类说明"></el-input>
                  </el-form-item>
                  <!-- <el-form-item>
                    <el-button
                      type="success"
                      @click="newAdd"
                    >新 增</el-button>
                    <el-button
                      type="primary"
                      @click="editorMenu"
                    >编 辑</el-button>
                    <el-button
                      type="danger"
                      v-permit="'menu:delete'"
                      @click="deleteMenu"
                    >删 除</el-button>
                  </el-form-item> -->
              </div>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { queryIndustryList,queryIndustryDetail,getidMenu} from '@/api/customer/index'
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
      treeDataChildren: [],
      treeDataChildrenDetail: [],
      lists: [],
      options:[],
      formData: {},
      menuId:'',
      parentClassification: '',
      TparentClassification: '',
      HparentClassification: '',
      EparentClassification: '',
    };
  },
  watch: {
    
  },
  created(){
    this.queryIndustryList();
  },

  methods: {
    async handleNodeClick1(event){
      console.log(event.paneName)
      const { data } = await queryIndustryDetail(event.paneName);
      this.treeDataChildren = data;
      this.parentClassification = '行业分类';
      this.handleNodeClick(event.paneName);
      this.TparentClassification = event.label;
    },
    async handleNodeClick2(event){
      const { data } = await queryIndustryDetail(event.paneName);
      this.treeDataChildrenDetail = data;
      this.parentClassification = this.TparentClassification;
      this.handleNodeClick(event.paneName);
      this.HparentClassification = event.label;
    },
    async handleNodeClick3(event){
      const { data } = await queryIndustryDetail(event.paneName);
      this.lists = data;
      this.parentClassification = this.HparentClassification;
      this.handleNodeClick(event.paneName);
      this.EparentClassification = event.label;
    },
    async handleNodeClick4(event){
      this.parentClassification = this.EparentClassification;
      this.handleNodeClick(event.paneName);
      this.menuId=event.paneName;
    },
    async handleNodeClick(event) {
      //获取菜单数据
      const { data } = await getidMenu(event);
      this.formData = data;
      // console.log(data)
    },

    async queryIndustryList() {
      const { data } = await queryIndustryList(0);
      //初始化菜单树
      // console.log(data)
      this.treeData = data;
      // console.log(this.treeData )
    },
  
    //新增
    async newAdd(){
      alert(1)
    },

    //编辑
    async editorMenu(){
      alert(2)
    },
    async deleteMenu() {
      await this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });
      const data = await deletedMenu(this.menuId);
      if (data.code == 200) {
        this.$message({
          type: "success",
          message: "删除成功!"
        });

        this.formStatus = 0;
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  },
  mounted() {
    this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
  }
};
</script>
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
.goods-fitter .el-form , .goods-fitter .search-wrapper{
  border:0 !important;
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
  width: 100%;
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
    width: 190px;
    overflow-x: scroll;
  }
  /deep/.el-tabs__item{
    text-align: left;
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

