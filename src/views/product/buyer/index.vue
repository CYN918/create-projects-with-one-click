<template>
<div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">搜索条件</h4>
            <div class="search-base">
              <el-row>
                <el-col :span="7">
                  <el-col>
                    <el-form-item label="采购员名称：">
                        <el-col :span="14">
                            <el-input v-model="tableData.name" placeholder="请输入采购员名称" style="width:250px" clearable></el-input>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="2" class="btn_right">
                    <el-button type="primary" size="small"  @click='_getSearch'>搜索</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
      <div class="mcard">
        <el-row class="operate mbottom">
            <el-col :span="21" class="detail">
                <el-button type="primary" size="small" @click="dialogVisible = true"  v-permit="'buyer:add'">添加</el-button>
          </el-col>
          <el-col :span="3">
          </el-col>
        </el-row>
        <el-table  :data="data"
            stripe
            style="width: 100%;margin-bottom: 20px;"
            border
            >
              <el-table-column  prop="createTime" label="创建时间"   align="center"> </el-table-column>
              <el-table-column  prop="sysuserName" label="采购员"   align="center"></el-table-column>
              <el-table-column  prop="" label="负责供应商数量" align="center">
                <template slot-scope="scope">
                    {{scope.row.count.supplier}}
                </template>
              </el-table-column>
              <el-table-column  prop="name" label="负责SKU数量" align="center">
                <template slot-scope="scope">
                      {{scope.row.count.skuCount}}
                  </template>
              </el-table-column>
              <el-table-column  label="上架商品数量" align="center">
                <template slot-scope="scope">
                      {{scope.row.count.yesGoods}}
                  </template>
              </el-table-column>
              <el-table-column  label="未上架商品数量" align="center">
                <template slot-scope="scope">
                      {{scope.row.count.noGoods}}
                  </template>
              </el-table-column>
              <el-table-column  label="排序" align="center">
                <template slot-scope="scope">
                      {{scope.row.sortOrder}}
                  </template>
              </el-table-column>
              <el-table-column label="操作" align="center"  fixed="right" width="250px">
                <template slot-scope="scope">
                  <div class="line-div">
                     <div style="display: flex;flex-direction: column" @click="handleSort(scope.row)"  v-permit="'buyer:sort'">
                         <img src="@/common/images/icon/历史采购.png" />
                         <span >排序</span>
                     </div>
                    <div class="deletList" @click="deleteList(scope.row.buyerId)"  v-permit="'buyer:del'">
                      <img src="@/common/images/icon/icon_delete.png" />
                      <span>删除</span>
                    </div>
                    <div class="small-Idiv" @click="deleteComments(scope.row.commentId)">
                      <!--<div class="i-div ">-->
                        <!--<img src="../../../common/images/icon/进入项目管理.png" alt="" class="operation_img">-->
                      <!--</div>-->
                      <!--<span style="word-break: keep-all;margin-left: -23px;">进入后台管理</span>-->
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
              :current-page="tableDatapagination.pageNum"
              :page-size="tableDatapagination.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableDatapagination.total"
                >
              </el-pagination>
          </div>
          <el-dialog
            title="添加采购员"
            :visible.sync="dialogVisible"
            width="30%"
            >
            <el-form :model="form"  label-width="100px">
            <el-form-item label="选择用户：">
              <el-select v-model="form.userid" filterable  size="medium" placeholder="请选择用户">
                <el-option
                  v-for="item in options"
                  :key="item.sysuserId"
                  :label="item.sysuserName"
                  :value="item.sysuserId">
                </el-option>
              </el-select>
            </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="danger" @click="dialogVisible = false" size="small">取 消</el-button>
              <el-button type="primary" @click="saveBuyerfunc" size="small">确 定</el-button>
            </span>
          </el-dialog>
      </div>
    <!--排序弹窗-->
    <el-dialog
        title="排序"
        :visible.sync="sortdialogVisible"
        width="30%"
       >
        <div>
         <span style="margin-right: 20px"> 排序:</span>
           <el-input
                style="width: 200px"
                placeholder="请输入内容"
                v-model="sortConten"
                type="number">
        </el-input>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="sortdialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handdelePut">确 定</el-button>
        </span>
    </el-dialog>



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
    import {deleSalesman, getBuyer, putSort, saveBuyer} from '@/api/product/index'

    import {getSysuserBuyer} from '@/api/permissions/index'

    export default {
    data(){
        return {
          sysuserName:'',
          tableDatapagination:'',
          form:{
            userid:'' , //用户 id
          },
          dialogVisible: false, //添加采购员
          data: [],
          tableData: {
              currentPage:1,
              size:10,
              name:''
          },
          options:[],
          sortdialogVisible:false,
          sortConten:'',
          buyerId :''
        }
    },
    methods:{
    //    搜索
    _getSearch(){
       this._getBuyer(this.tableData)
    },

    //排序
    handleSort(val){
        this.sortdialogVisible = true
        this.buyerId = val.buyerId
        this.sortConten = val.sortOrder
    },
   async handdelePut(){
    const buyerId = this.buyerId
    const res =await  putSort(buyerId,this.sortConten)
        if(res.code === 200 ){
            this._getBuyer()
            this.$message({
                type: 'success',
                message: '修改成功!'
            });
        this.sortdialogVisible = false
         this.sortConten = ''
        } else{
            this.$message({
                type: 'info',
                message: '修改失败'
            });
            this.sortConten = ''
        }
    },
      //删除采销员
      deleteList(val){
          this.$confirm('你确认要删除吗？, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async() => {
           const res = await deleSalesman(val)
            if(res.code==200){
            this._getBuyer()
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      },

      //保存采购员
      saveBuyerfunc(){
        let obj = {}
        obj.agencyId = 0
        obj.sysuserId = this.form.userid
        saveBuyer(obj).then(res => {
          if(res.code == 200){
            this.$message({message: res.message,type: 'success'});
            this.dialogVisible = false
            this._getBuyer(this.tableData)
          }
        })
      },
      _getUserPage(){
        let obj = {
            pageNum:1,
            pageSize:0,
        }
          getSysuserBuyer(obj).then(res => {
          this.options = res.data.list
        })
      },
      _getBuyer(){
          getBuyer(this.tableData).then((res) => {
              this.tableDatapagination = res.data;
              this.data = res.data.list
              this.endLoading() //取消加载中loading
          })
      },
      // addCatagory(){
      //     this.$router.push({name:'Addcatagory'})
      // },
      handleSizeChange(val){
          this.tableData.size = val
          this._getBuyer();
      },
      handleCurrentChange(val){
          this.tableData.currentPage = val
          this._getBuyer();
      },
    },
    mounted(){
        this.startLoading() //加载中loading
        this._getBuyer();
        this._getUserPage()
    },


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
.brand{
    position: relative;
    .add_brand{
        position: absolute;
        right: 20px;
    }
}
.operation{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  top: -5px;
}
.prompt{
  font-size: 12px;
  color: red;
  margin: 0;
  padding: 0;
  height: 8px;
  position: relative;
  top: -21px;
}
.i-div {
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.line-div {
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  margin-left: 11px;
}
.deletList{
  display: flex;
  flex-direction: column;
}
.sorts{
    margin-top: 9px;
    cursor: pointer;
    display: inline-block;
    width: 50px;
    height:20px ;
    line-height: 20px;
    text-align: center;
    background: #4B99FB;
    color: white;
}

</style>
