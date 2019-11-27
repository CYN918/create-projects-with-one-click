<template>
<div class="margin">
    <div class="mbottom">
      <div class="mcard">
        <el-row class="operate mbottom">
            <el-col :span="21">
              <el-button type="primary" @click="addGroup" size="small" >新建分组</el-button>
            </el-col>
          <el-col :span="3">
          </el-col>
        </el-row>
        <el-table :data="data"  border  style="width: 100%" stripe>
            <el-table-column  prop="name" label="编号"  width="180" align="center"> 
             自动生成序号
            <template scope="scope">
                <span>{{scope.$index + 1}}</span>
            </template>
            </el-table-column>
            <el-table-column  prop="tagName" label="标签名称"  width="180" align="center"></el-table-column>
            <el-table-column  prop="quantity" label="商品数量" align="center"></el-table-column>
            <el-table-column  prop="isBest" label="推荐" align="center"></el-table-column>
            <el-table-column  prop="applyUrl" label="商城链接" align="center"></el-table-column>
            <el-table-column  prop="name" label="操作"  align="center" width="120">
                <template slot-scope="scope">
                    <el-button type="text" size="small">查看</el-button>
                    <el-button @click="editGroup(scope.row.tagId)" type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small" @click="deleteGroup(scope.row.tagId)">移除</el-button>
                    <el-button type="text" size="small">推送商品</el-button>
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
            <el-button @click="addGroup" type="primary" class="add_brand"></el-button>
        </div>
        
    </div> -->
</template>
<script>
import {getGroup,deleteGroup} from '@/api/product/index'
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

        editGroup(id){
            this.$router.push({  name: 'Addgroup',params: { id: id}   });
        },
        deleteGroup(id){
            var that = this;
             this.$confirm('此操作将永久删除该分组, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                deleteGroup(id).then((res) => {
                    that._getGroup()
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
        _getGroup(){
            let obj = {};
            obj.pageIndex = this.tableData.currentPage;
            obj.pageSize = this.tableData.size;
            getGroup(obj).then((res) => {
                console.log(res)
                this.tableData.total = res.data.page.total;
                this.data= res.data.pageList;
            })
            // console.log('测试')
            console.log(getGroup)
        },
        addGroup(){
            this.$router.push({name:'Addgroup'})
        },
        handleSizeChange(val){
            this.tableData.size = val;
            this._getGroup()
        },
        handleCurrentChange(val){
            this.tableData.currentPage = val;
            this._getGroup()
        },
    },
    created(){
        this._getGroup();
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
</style>
