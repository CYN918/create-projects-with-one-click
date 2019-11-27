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
                    <el-form-item label="站点：">
                        <el-col :span="22">
                            <el-select
                                class="el-select-width"
                                v-model="form.search_type"
                                placeholder="请选择"
                            >
                                <el-option label="按商品名称" value="1"></el-option>
                                <el-option label="按货号搜索" value="2"></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small"  @click='serch'>搜索</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mcard">
      <el-table :data="data"  border  style="width: 100%" stripe>
            <el-table-column  type="selection"  width="55" align="center"> </el-table-column>
            <el-table-column  prop="name" label="编号"   align="center"></el-table-column>
            <el-table-column  prop="name" label="推送站点" align="center"></el-table-column>
            <el-table-column  prop="name" label="添加时间" align="center"></el-table-column>
            <el-table-column  prop="name" label="执行状态" align="center"></el-table-column>
            <el-table-column  prop="name" label="编辑"  align="center" width="150">
                <template slot-scope="scope">
                    <el-button type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small">下载日志</el-button>
                    <el-button type="text" size="small">删除</el-button>
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
            form:{
              search_type:''
            },
            data:[
              {name:'你好'},
              {name:'你好'},
              {name:'你好'},
              {name:'你好'},
              {name:'你好'},
            ],
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
            this.$router.push({  name: 'Addbrand',params: { id: id}  });
        },
        deleteBrand(id){
            var that = this;
             this.$confirm('此操作将永久删除该品牌, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                deleteBrand(id).then((res) => {
                    that._getBrand()
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
        serch(){
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
            // console.log('测试')
            console.log(getBrand)
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
</style>
