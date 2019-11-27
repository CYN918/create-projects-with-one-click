<template>
<div class="margin">
  <div class="mbottom">
      <div class="goods-fitter">
        <div class="search-wrapper">
          <el-page-header @back="back" content="属性列表"></el-page-header>
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
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="按商品类型显示：">
                        <el-col :span="22">
                            <el-select v-model="type" placeholder="请选择"  filterable @change="_getattribute(val)">
                                <el-option
                                v-for="item in options"
                                :key="item.goodsTypeId"
                                :label="item.typeName"
                                :value="item.goodsTypeId">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small"  @click='_getattribute(true)'>搜索</el-button>
                </el-col>
                <el-col :span="1">
                  <el-button type="primary" size="small"  @click="addgoods">添加属性</el-button>
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
      <el-table :data="data"  border  style="width: 100%"  :default-sort = "{prop: 'date', order: 'descending'}"  @select="handleSelectionChange" @select-all="handleSelectionChangeall"  @cell-dblclick='dblhandleCurrentChange' >
            <!-- <el-table-column  type="selection" width="55" align="center"> </el-table-column> -->
            <el-table-column  prop="attrId" label="编号"   align="center"> </el-table-column>
            <el-table-column  prop="attrName" label="属性名称"   align="center" >
                <template slot-scope="scope">
                    <div v-if='scope.row.listStatus != 1'>
                        <el-input
                        placeholder="请输入内容"
                        autofocus
                        @blur="inpt(scope)"
                        v-focus
                        v-model="input"
                        style="150px;"
                        clearable>
                        </el-input>
                    </div>
                    <div v-if='scope.row.listStatus == 1'>
                        <span>{{scope.row.attrName}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column  prop="goodsTypeId" label="商品类型" align="center" :formatter="dateFormat"></el-table-column>
            <el-table-column  prop="attrInputType" label="属性值的录入方式" align="center">
                <template slot-scope="scope">
                    {{scope.row.attrInputType == '0' ? '手功输入' :scope.row.attrInputType == '1'?'选择输入' :'多行文本输入'}}
                </template>
            </el-table-column>
              <el-table-column  prop="attrType" label="可选值列表" align="center"></el-table-column>
            <el-table-column  prop="sortOrder" label="排序" sortable align="center"> </el-table-column>
            <el-table-column  prop="name" label="操作"  align="center" width="150">
                <template slot-scope="scope">
                  <div class="line-div">
                    <div class="small-Idiv" @click="handleClick(scope.row)">
                      <div class="i-div">
                        <img src="../../../common/images/icon/编辑.png" alt="" class="operation_img">
                      </div>
                      <span>编辑</span>
                    </div>
                    <div class="small-Idiv"  @click="deleteType(scope.row.attrId)">
                      <div class="i-div huishouzhan">
                        <img src="../../../common/images/icon/回收站.png" alt="" class="operation_img">
                      </div>
                      <span>移除</span>
                    </div>
                  </div>
                    <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small" @click="deleteType(scope.row.attrId)">移除</el-button> -->
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
            :total="tableData.total">
            </el-pagination>
        </div>
    </div>
  </div>
    <!-- <div class="brand">
        <div class="top_btn">
            <el-button type="primary" class="add_brand"></el-button>
        </div>
        <div class="top_btn serch_bkg">
            <span class="serch_tent"></span>
            
        </div>
        <el-table :data="data"  border  style="width: 100%"  :default-sort = "{prop: 'date', order: 'descending'}"  @select="handleSelectionChange" @select-all="handleSelectionChangeall"  @cell-dblclick='dblhandleCurrentChange' >
            <el-table-column  type="selection" width="55"> </el-table-column>
            <el-table-column  prop="attrId" label="编号"   align="center"> </el-table-column>
            <el-table-column  prop="attrName" label="属性名称"   align="center" >
                <template.vue slot-scope="scope">
                    <div v-if='scope.row.listStatus != 1'>
                        <el-input
                        placeholder="请输入内容"
                        autofocus
                        @blur="inpt(scope)"
                        v-focus
                        v-model="input"
                        style="150px;"
                        clearable>
                        </el-input>
                    </div>
                    <div v-if='scope.row.listStatus == 1'>
                        <span>{{scope.row.attrName}}</span>
                    </div>
                </template.vue>
            </el-table-column>
            <el-table-column  prop="goodsTypeId" label="商品类型" align="center" :formatter="dateFormat"></el-table-column>
            <el-table-column  prop="attrInputType" label="属性值的录入方式" align="center">
                <template.vue slot-scope="scope">
                    {{scope.row.attrInputType == '0' ? '手功输入' :scope.row.attrInputType == '1'?'选择输入' :'多行文本输入'}}
                </template.vue>
            </el-table-column>
              <el-table-column  prop="attrType" label="可选值列表" align="center"></el-table-column>
            <el-table-column  prop="sortOrder" label="排序" sortable align="center"> </el-table-column>
            <el-table-column  prop="name" label="操作"  align="center" width="150">
                <template.vue slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small" @click="deleteType(scope.row.attrId)">移除</el-button>
                </template.vue>
            </el-table-column>
        </el-table>
          <div class="paginationyz">
            <el-button type="primary" class="delete_brand" @click="deleteMore" >删除</el-button>
            <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="tableData.currentPage"
            :page-sizes="tableData.sizes"
            :page-size="tableData.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.total">
            </el-pagination>
        </div>
    </div> -->
</template>
<script>
import { getAlltype,getTypeid,addAttributedelete,addAttributeeditor1,Attributedeletemaor} from '@/api/product/index'
export default {
    data(){
        return {
            deleteArr:[], //批量删除数组
            type:'',
            data:[],
            input:'',
            id:'',
            tableData: {
                currentPage:1,
                sizes:[10, 20, 50, 100],
                size:10,
                total:0,
            },
            options: [],
        }
    },
    methods:{
        back(){
          this.$router.go(-1)
        },
        //单选
        handleSelectionChange(list,row){
            if(list.length){
                this.deleteArr = list
            }else{

            }
        },
        //多选
        handleSelectionChangeall(list){
            this.deleteArr = list
        },
        //查询
        _getattribute(val){
            if(val){
              this.tableData.currentPage = 1
            }
            var obj = {}
            obj.id = this.type
            obj.pageIndex = this.tableData.currentPage
            obj.pageSize = this.tableData.size
            getTypeid(obj).then((res) => {
                this.tableData.total = res.data.page.total;
                this.data= res.data.pageList;
            })
        },
        //  删除按钮可删除多个
        deleteMore(){
            let str = ''
            this.deleteArr.forEach(item => {
                str += item.attrId+','
            })
            if(this.deleteArr.length){
                this.$confirm('此操作将永久删除该属性, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    Attributedeletemaor(str.substr(0,str.length-1)).then(res => {
                    this._getattribute()
                    this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });
            }else{
                this.$message({
                type: 'info',
                message: `请选择删除项`
                });
            }
        },
        //查找删除数组内是否存在指定设备码
        indexOfCode(list, code) {
            for (var i = 0, len = list.length; i < len; i++) {
            if (list[i].machineCode === code) {
                return i;
            }
            }
            return -1;
        },
        //编辑
        handleClick(data){
            this.$router.push({  name: 'ProductTypeaddAttribute',params: { id: data.attrId ,type:data.goodsTypeId}   });
        },
        //删除
        deleteType(id){
            var that = this;
             this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                addAttributedelete(id).then((res) => {
                    that._getattribute()
                     this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });
        },
        dblhandleCurrentChange(row, column, cell, event) {
            this.input = row.attrName
            row.listStatus = 2
        },
        inpt(Event){
            Event.row.attrName = this.input
            addAttributeeditor1(Event.row).then(res =>{
                Event.row.listStatus = 1
            })
        },
        addType(){
            this.$router.push({name:'Addtype'})
        },
        handleSizeChange(val){
            this.tableData.size = val
            this._getattribute()
        },
        handleCurrentChange(val){
            this.tableData.currentPage = val
            this._getattribute()
        },
        //添加属性
        addgoods(){
            this.$router.push({ name: "ProductTypeaddAttribute",params: { type: this.type}});
        },
        dateFormat(row, column, cellValue, index){
            var aa
            this.options.forEach(item => {
                if(item.goodsTypeId === row.goodsTypeId){
                   aa =  item.typeName
                }
            })
            return aa
        }
    },
    directives: {
        focus: {
            inserted: function (el) {
            el.querySelector('input').focus()
            }
        }
    },
    created(){
        getAlltype().then(res => {
            this.options = res.data
            this.options.unshift({typeName:'所有商品类型',goodsTypeId:''})
        })
        if(this.$route.query.id){
            this.type = this.$route.query.id
        }
        this._getattribute()
    }
}
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
</style>
