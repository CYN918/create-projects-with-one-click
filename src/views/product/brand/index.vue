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
                    <el-form-item label="搜索内容：">
                        <el-col :span="22">
                            <el-input v-model="input" placeholder="请输入关键字进行搜索"></el-input>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small"  @click='serch(true)'>搜索</el-button>
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
              <el-button type="primary" size="small"   @click="addBrand"  v-permit="'brand:add'">添加品牌</el-button>
        </el-col>
        <el-col :span="3">
        </el-col>
      </el-row>
      <el-table :data="data"  border  style="width: 100%" stripe>
            <el-table-column  prop="brandName" label="品牌名称"  width="180" align="center"> </el-table-column>
            <el-table-column  prop="brandLogo" label="品牌LOGO"  width="180" align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.brandLogo" alt="" class="imgsize">
                </template>
            </el-table-column>
            <el-table-column  prop="webUrl" label="品牌网址" align="center"></el-table-column>
            <el-table-column  prop="brandDesc" label="品牌描述" align="center"></el-table-column>
            <el-table-column  prop="isShow" label="是否显示" align="center">
                <template slot-scope="scope">
                    {{scope.row.isShow == 0?'不显示':'显示'}}
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center"  fixed="right" width="150">
          <template slot-scope="scope">
            <div class="line-div">
              <div class="small-Idiv" @click="editBrand(scope.row.brandId)"  v-permit="'brand:edit'">
                <div class="i-div">
                  <img src="../../../common/images/icon/编辑.png" alt="" class="operation_img">
                </div>
                <span>编辑</span>
              </div>
              <div class="small-Idiv"   @click="deleteBrand(scope.row.brandId)"  v-permit="'brand:del'">
                <div class="i-div huishouzhan">
                  <img src="../../../common/images/icon/回收站.png" alt="" class="operation_img">
                </div>
                <span>移除</span>
              </div>
            </div>
          </template>
        </el-table-column>
        </el-table>
      <div class="pagination">
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
</template>
<script>
import {getBrand,deleteBrand} from '@/api/product/index'

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
        editBrand(id){
            this.$router.push({  name: 'Addbrand',query: { id: id}  });
        },
        deleteBrand(id){
            var that = this;
             this.$confirm('此操作将永久删除该品牌, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                deleteBrand(id).then((res) => {
                  if(res.code == 200){
                    that._getBrand()
                     this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                  }
                })
            
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });
        },
        serch(slt){
          if(slt){
            this.tableData.currentPage = 1;
          }
            this._getBrand()
        },
        _getBrand(){
            let obj = {};
            obj.pageIndex = this.tableData.currentPage;
            obj.pageSize = this.tableData.size;
            obj.keyWord = this.input;
            getBrand(obj).then((res) => {
                console.log(res)
                this.tableData.total = res.data.page.total;
                this.data= res.data.pageList;
            })
        },
        handleSizeChange(val){
            this.tableData.size = val;
            this._getBrand()
        },
        handleCurrentChange(val){
            this.tableData.currentPage = val;
            this._getBrand()
        },
        addBrand(){
            this.$router.push( {name:'Addbrand'})
        }
    },
    created(){
        this._getBrand();
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
 .imgsize{
   width: 100px;
   height: 100px;
 }
</style>
