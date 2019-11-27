<template>
<div class="margin">
    <div class="mbottom">
      <div class="mcard">
        <el-row class="operate mbottom">
            <el-col :span="21">
              <el-button type="primary" size="small" @click="addgoods"  v-permit="'goods:type:add'">新建商品类型</el-button>
            </el-col>
          <el-col :span="3">
          </el-col>
        </el-row>
        <el-table :data="data"  border  style="width: 100%" stripe>
            <el-table-column  prop="typeName" label="商品类型名称"   align="center"> </el-table-column>
            <el-table-column  prop="attrGroup" label="属性分组"   align="center"></el-table-column>
            <el-table-column  prop="typeNumber" label="属性数" align="center"></el-table-column>
            <el-table-column  prop="enabledStatus" label="状态" align="center">
                <template slot-scope="scope">
                    {{scope.row.enabledStatus=='1'?'开启':'关闭'}}
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center"  fixed="right" width="150">
          <template slot-scope="scope">
            <div class="line-div small_top">
              <div class="small-Idiv" @click="attribute(scope.row.goodsTypeId)"  v-permit="'goods:type:attribute'">
                  <div class="i-div fuzhi" style="margin-left: 10px;">
                    <img src="../../../common/images/icon/属性列表.png" alt="" class="operation_img">
                  </div>
                  <span style="word-break: keep-all;">属性列表</span>
                </div>
                <div class="small-Idiv"  @click="handleClick(scope.row.goodsTypeId)"  v-permit="'goods:type:edit'">
                  <div class="i-div">
                    <img src="../../../common/images/icon/编辑.png" alt="" class="operation_img">
                  </div>
                  <span>编辑</span>
                </div>
            </div>
            <div class="line-div small_top" style="justify-content: end;margin-left: 27px;">
                <div class="small-Idiv"  @click="deleteType(scope.row.goodsTypeId)"  v-permit="'goods:type:del'">
                  <div class="i-div huishouzhan">
                    <img src="../../../common/images/icon/回收站.png" alt="" class="operation_img">
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
            :total="tableData.total">
            </el-pagination>
        </div>
      </div>
    </div>
</div>
    <!-- <div class="brand">
        <div class="top_btn">
            <el-button type="primary" class="add_brand"></el-button>
        </div>
        <el-table :data="data"  border  style="width: 100%">
            <el-table-column  prop="typeName" label="商品类型名称"   align="center"> </el-table-column>
            <el-table-column  prop="attrGroup" label="属性分组"   align="center"></el-table-column>
            <el-table-column  prop="typeNumber" label="属性数" align="center"></el-table-column>
            <el-table-column  prop="enabledStatus" label="状态" align="center">
                <template.vue slot-scope="scope">
                    {{scope.row.enabledStatus=='1'?'开启':'关闭'}}
                </template.vue>
            </el-table-column>
            <el-table-column  prop="name" label="操作"  align="center" width="150">
                <template.vue slot-scope="scope">
                    <el-button type="text" size="small" @click="attribute(scope.row.goodsTypeId)">属性列表</el-button>
                    <el-button @click="handleClick(scope.row.goodsTypeId)" type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small" @click="deleteType(scope.row.goodsTypeId)">移除</el-button>
                </template.vue>
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
    </div> -->
</template>
<script>
import {getType,deleteType} from '@/api/product/index'
export default {
    data(){
        return {
            data:[],
            tableData: {
                currentPage:1,
                sizes:[10, 20, 50, 100],
                size:10,
                total:0,
            },
            input:'',
        }
    },
    methods:{
        _getType(){
            let obj = {};
            obj.pageIndex = this.tableData.currentPage;
            obj.pageSize = this.tableData.size;
            getType(obj).then((res) => {
                this.tableData.total = res.data.page.total;
                this.data= res.data.pageList;
            })
        },
        //编辑
        handleClick(id){
            this.$router.push({  name: 'ProductTypeadd',query: { id: id}   });
        },
        //属性列表
        attribute(id){
            this.$router.push({  name: 'ProductTypeattribute',query: { id: id}   });
        },
        //删除
        deleteType(id){
            var that = this;
             this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                deleteType(id).then((res) => {
                    that._getType()
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
        addType(){
            this.$router.push({name:'Addtype'})
        },
        handleSizeChange(val){
            this.tableData.size = val
            this._getType()
        },
        handleCurrentChange(val){
            this.tableData.currentPage = val
            this._getType()
        },
        //新增商品类型
        addgoods(){
            this.$router.push({ name: "ProductTypeadd"});
        }
    },
    mounted(){
        this._getType();
    }
}
</script>
<style lang='scss' scoped>
.brand{
    position: relative;
    .add_brand{
        position: absolute;
        right: 20px;
    }
}
.el-input__inner{
  width:370px!important;
}
.el-input{
  width:370px!important;
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
    justify-content: space-between;

}
.fuzhi{
  background:rgba(229,162,75,1);
}
 .huishouzhan{
   background:rgba(247,108,110,1);
 }
   .small_top{
    margin-top: 10px;
    margin-left:15px;
    margin-right:15px
  }
  .spanclass{
    position: absolute;
  }
</style>
