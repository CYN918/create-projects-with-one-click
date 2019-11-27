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
                  <el-form-item label="关键字：">
                    <el-col :span="22">
                        <el-input v-model="form.menuName" placeholder="请输入关键字进行搜索"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small" @click="_getUser">查询</el-button>
                </el-col>
                <el-col :span="1">
                  <el-button size="small" >新增</el-button>
                </el-col>
                <el-col :span="1">
                  <el-button size="small" >编辑</el-button>
                </el-col>
                <el-col :span="1">
                  <el-button size="small" >删除</el-button>
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
      <el-table   :data="tableData"  border style="width: 100%">
        <el-table-column  type="index"  label="序号" align="center" width="55"></el-table-column>
        <el-table-column  prop="sysuserName"  label="登录账号/用户名" align="center"></el-table-column>
        <el-table-column  prop="name"  label="角色权限" align="center"></el-table-column>
        <el-table-column  prop="name"  label="部门" align="center"></el-table-column>
        <el-table-column  prop="realName"  label="真实姓名" align="center" ></el-table-column>
        <el-table-column  prop="name"  label="职称" align="center"></el-table-column>
        <el-table-column  prop="sex"  label="性别" align="center"></el-table-column>
        <el-table-column  prop="telephone"  label="手机" align="center" ></el-table-column>
        <el-table-column  prop="createTime"  label="出生年月" align="center"></el-table-column>
        <el-table-column  prop="idCard;"  label="身份证" align="center"></el-table-column>
        <el-table-column  prop="name"  label="学历" align="center" ></el-table-column>
        <el-table-column  prop="graduatedFrom"  label="毕业院校" align="center"></el-table-column>
        <el-table-column  prop="name"  label="是否已婚" align="center" ></el-table-column>
        <el-table-column  prop="name"  label="QQ" align="center" ></el-table-column>
        <el-table-column  prop="email"  label="E-mail" align="center"></el-table-column>
        <el-table-column  prop="orderBy"  label="排序" align="center" ></el-table-column>
        <el-table-column label="操作" align="center"  fixed="right"  width="150">
          <template slot-scope="scope">
            <div class="line-div">
              <div class="small-Idiv" @click="authorization(scope.row.sysuserId)">
                <div class="i-div">
                  <img src="../../common/images/icon/审核.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;margin-left: -5px;">用户授权</span>
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
      <el-dialog
        title=""
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
       <span>
           <el-tree
            :data="data"
            ref="tree" 
            show-checkbox
            node-key="menuId"
            :default-expanded-keys="[3]"
            :default-checked-keys="[3]"
            :props="defaultProps"
            >
          </el-tree>
           <!-- <el-tree class="tree-wrap" ref="tree" :data="treeData" show-checkbox node-key="id" :default-expanded-keys="checked" :default-checked-keys="checked" :props="defaultProps">
        </el-tree> -->
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="determine">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getUser } from '@/api/setting/index'
import {  createatreeMenu } from '@/api/permissions/index'

export default {
  data () {
    return {
      form: {
        current_page:1,
        page_size:10,
        total_count:0,
        menuName:''
      },
      treeData:[],
      checked:[],
      centerDialogVisible:false,
      tableData:[],
       defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created () {
    this._getUser()
  },
  computed: {
  },
  methods: {
      //树形结构选中数据
      determine(){
        console.log(this.$refs.tree.getHalfCheckedKeys()) 
        //全选数据
        console.log(this.$refs.tree.getCheckedKeys()) 
      },
      authorization(id){
        this.treeData = []
        this.centerDialogVisible = true
        this._createatreeMenu(id)
      },
       _createatreeMenu(id){
            createatreeMenu(id).then(res => {
              let arr = []
              
              arr.push(res.data)
              this.transleteData(arr,this.treeData)
              console.log(this.treeData)
              
              this.checked = res.authorityMenuIds
              console.log(this.checked)
            })
        },
        transleteData(data,arr) {
            data.forEach( (item,index) => {
                const msg = {
                    label: item.menuName,
                    id: item.menuId,
                    children: item.childNodes ? [] : null,
                    isLeaf: item.childNodes ? false : true
                };
                if (item.childNodes && item.childNodes.length > 0 ) {
                    this.transleteData(item.childNodes, msg.children);
                }
                arr.push(msg);
            });
            return arr;
        },
      handleSizeChange(){
        this.form.page_size = val
        this._getUser()
      },
      handleCurrentChange(){
        this.form.current_page = val
        this._getUser()
      },
      _getUser(){
        getUser(this.form).then(res => {
          this.tableData = res.data.list
          this.form.total_count = res.data.total
        })
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
.small-Idiv{
  width: 32px;
  span{
    margin-top: 3px;
    font-size:12px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(72,73,77,1);
  }
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
 .el-select-width {
    max-width: 300px;
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
  .el-select{
    width: 100% !important;
  }
  .img_size{
    width: 118px;
    height: 170px;
  }
  .small_top{
    margin-top: 10px;
  }
  .distribution{
    display: flex;
    align-items: center;
    position: relative;
    top: -12px;
  }
</style>
