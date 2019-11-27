<template>
<div class="margin">
    <div class="mbottom">
      <div class="mcard">
        <el-row class="operate mbottom">
            <el-col :span="21">
            <!-- <el-button type="primary">仅挑选</el-button> -->
              <el-button type="primary" @click="addCatagory">编辑</el-button>
              <el-button type="primary" @click="addCatagory">刷新</el-button>
            </el-col>
          <el-col :span="3">
          </el-col>
        </el-row>
        <el-table  :data="data"
            style="width: 100%;margin-bottom: 20px;"
            row-key="catId"
            border
            :load="load"
            :lazy='true'
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
              <el-table-column  prop="catName" label="序号"   align="center"> </el-table-column>
              <el-table-column  prop="userName" label="设置项"   align="center"></el-table-column>
              <el-table-column  prop="telephone" label="值" align="center"></el-table-column>
              <el-table-column  prop="goodsQuantity" label="备注" align="center"></el-table-column>
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
    <!-- <div class="catagory">
        <div class="top_btn">
            <el-button  type="primary" class="add_brand"></el-button>
        </div>
         <el-table  :data="data"
          style="width: 100%;margin-bottom: 20px;"
          row-key="catId"
          border
          :load="load"
          :lazy='true'
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column  prop="catName" label="分类名称"  width="180" align="center"> </el-table-column>
            <el-table-column  prop="userName" label="采购员"  width="180" align="center"></el-table-column>
            <el-table-column  prop="telephone" label="采购员联系方式" align="center"></el-table-column>
            <el-table-column  prop="goodsQuantity" label="商品数量" align="center"></el-table-column>
            <el-table-column  prop="measureUnit" label="数量单位" align="center"></el-table-column>
            <el-table-column  prop="showInNav" label="导航栏" align="center">
              <template.vue slot-scope="scope">
                  <div>
                    {{scope.row.showInNav == '0'?'不显示':'显示'}}
                  </div>
                </template.vue>
            </el-table-column>
            <el-table-column  prop="isShow" label="是否显示" align="center">
              <template.vue slot-scope="scope">
                  <div>
                    {{scope.row.showInNav == '0'?'不显示':'显示'}}
                  </div>
                </template.vue>
            </el-table-column>
            <el-table-column  prop="indexRecommend" label="首页推荐" align="center">
              <template.vue slot-scope="scope">
                  <div>
                    {{scope.row.showInNav == '0'?'不推荐':'推荐'}}
                  </div>
                </template.vue>
            </el-table-column>
            <el-table-column  prop="floorIndex" label="首页楼层" align="center"></el-table-column>
            <el-table-column  prop="grade" label="价格分级" align="center"></el-table-column>
            <el-table-column  prop="sortOrder" label="排序" align="center"></el-table-column>
            <el-table-column  prop="name" label="编辑"  align="center" width="120">
                <template.vue slot-scope="scope">
                    <el-button type="text" size="small"  @click="handleClick(scope.row.catId)">编辑</el-button>
                    <el-button type="text" size="small" @click="delate(scope.row.catId)">移除</el-button>
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
import { getCatagory , deleteCatagoryid} from '@/api/product/index'
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
         load(tree, treeNode, resolve) {
           console.log(resolve)
           console.log(tree)
           console.log(treeNode)
            setTimeout(() => {
                resolve([
                    {
                    id: 31,
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                    id: 32,
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                    }
                ])
            }, 1000)
        },
        //删除
        delate(id){
        this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            //   let loading = this.$loading({
            //   background: 'rgba(255,255,255,0.1)',
            //   text: '加载中，请稍后...'
            // })
            deleteCatagoryid(id).then(res => {
              // loading.close()
              this._getCatagory()
            })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
          });
          
        },
        //编辑
        handleClick(catId){
          this.$router.push({name:'Addcatagory' , params:{id:catId}})
        },
        _getCatagory(){
            let obj = {};
            obj.type = this.tableData.type;
            //  let loading = this.$loading({
            //   background: 'rgba(255,255,255,0.1)',
            //   text: '加载中，请稍后...'
            // })
            getCatagory(obj).then((res) => {
                this.tableData.total = res.data.length;
                this.data = res.data
                // loading.close()
                // var arr = []
                // for(var i=0;i<data.length;i++){
                //     if(data[i].lev == 1){
                //         let obj1 = data[i];
                //         obj1.children = [];
                //         arr.push(obj1)
                //     }
                //     for(var j=0;j<arr.length;j++){
                //         if(data[i].lev ==2 || data[i].parentId == data[j].catId ){
                //             let obj2 = data[i];
                //             obj2.children = [];
                //             arr[j].children.push(obj2)
                //         }
                //         let data1 = arr[j].children
                //         console.log(data1)
                //         for(var k=0;k<data1.length;k++){
                            
                //             // if(data[i].lev ==3 || data[i].parentId == data1[k].catId ){
                //             //     let obj3 = data[i];
                //             //     // console.log(arr[j].children[k])
                //             //     // arr[j].children[k].push(obj3)
                //             // }
                //         }
                //     }
                // }
            })
             
            
        },
        addCatagory(){
            this.$router.push({name:'Addcatagory'})
        },
        handleSizeChange(val){

        },
        handleCurrentChange(val){

        },
    },
    created(){
        this._getCatagory();
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