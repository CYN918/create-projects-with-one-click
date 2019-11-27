<template>
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">搜索条件</h4>
            <div class="search-base">
              <el-row>
                <el-col :span="8">
                  <el-col>
                    <el-form-item label="职位名称：">
                      <el-col :span="22">
                        <el-input v-model="position" clearable placeholder="请输入职位名称"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="1" class="btn_right">
                  <el-button type="primary" size="small" @click="_searchPosition()">搜索</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mcard">
      <el-row class="operate mbottom">
        <el-col :span="21">
          <el-button type="primary" size="small" icon="el-icon-plus" v-permit="'position:add'" @click="addPosition">新增</el-button>
        </el-col>
        <el-col :span="3"></el-col>
      </el-row>
      <el-table :data="tableData" border style="width: 100%" stripe>
        <el-table-column  type="index" align="center" label="序号"  width="50"></el-table-column>
        <el-table-column prop="positionName" label="职位名称" align="center"></el-table-column>
        <el-table-column prop="description" label="职位描述" align="center"></el-table-column>
        <el-table-column prop="parentName" label="上级" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="修改时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="150">
          <template slot-scope="scope">
            <div class="small-Idiv" v-permit="'position:edit'" @click="editPosition(scope.row.positionId)">
              <div class="i-div">
                <img src="../../../common/images/icon/编辑.png" alt class="operation_img" />
              </div>
              <span>编辑</span>
            </div>
            <div
              class="small-Idiv"
              v-if="!scope.row.systemRole"
              v-permit="'position:delete'"
              @click="deletePosition(scope.row.positionId)"
            >
              <div class="i-div huishouzhan">
                <img src="../../../common/images/icon/回收站.png" alt class="operation_img" />
              </div>
              <span>移除</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="paginationyz">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.current_page"
          :page-size="pagination.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total_count"
        ></el-pagination>
      </div>

    </div>
       <!-- 删除 -->
      <el-dialog title="删除用户" :visible.sync="deleteBtn"  :close-on-click-modal="false"  width="30%">
        <span>此操作将永久删除该职位，是否继续？</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="deleteBtn = false" size="small">取 消</el-button>
          <el-button type="primary" @click="removePosition()" size="small">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
import { getPositionList , removePosition } from "@/api/permissions/index";

export default {
  data() {
    return {
      deleteBtn:false,
      positionId:'',
      pagination: {
        current_page: 1,
        page_size: 10,
        total_count: 0
      },
      tableData:[],
      position:'',
    };
  },
  created() {
    this._getPosition();
  },
  methods: {
    // 获取职位列表
    _getPosition(){
      var data = {}
      data.pageNum = this.pagination.current_page
      data.pageSize = this.pagination.page_size
      data.positionName = this.position
       getPositionList(data).then( res =>{
         var that =this
         that.tableData = res.data.list
         this.pagination.total_count = res.data.total
       })
    },
    // 搜索
    _searchPosition(){
      this.pagination.current_page = 1
      this._getPosition();
    },
      handleSizeChange (val) {
      this.pagination.page_size = val
       this._getPosition();
    },
    handleCurrentChange (val) {
      this.pagination.current_page = val
       this._getPosition();
    },
    // 添加
    addPosition(){
      this.$router.push({name:'addPosition'})
    },
    // 编辑
   editPosition(id){
      this.$router.push({ name: "addPosition", query: { id: id } });
   },
   // 删除
   deletePosition(id){
     this.deleteBtn = true
     this.positionId = id
   },
   // 删除确定
  removePosition(){
    var data = {}
    data.positionId =   this.positionId
    removePosition(data).then( res =>{
        if( res.code ==200 ){
            this.$message({
              type: 'success',
              message:'删除成功'
            }); 
            this.deleteBtn = false 
            this._searchPosition()
        }
    })
  }
  }
};
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
  text-align: center;
}
.i-div {
  cursor: pointer;
  height: 32px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.line-div {
  display: flex;
  justify-content: space-between;
}
.small_top {
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
}
.roleuser {
  position: relative;
  .pushmsg {
    position: absolute;
    top: 11px;
    left: 47%;
    font-size: 16px;
    color: #303133;
    font-weight: 400;
  }
}
table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}
.table__tr-wrapper {
  background: RGBA(247, 250, 255, 1);
  th {
    border: 1px solid #f0f0f0;
  }
}
.authority-table tr td:first-child {
  text-align: left;
  padding-left: 20px;
}
.authority-table .solid-td {
  border: 1px solid #f0f0f0;
}

table th,
td {
  height: 35px;
  line-height: 35px;
}
.table2 tr td:nth-child(1) {
  border-left: 0;
  border-bottom: 0;
  border-top: 0;
}
.table2 tr:nth-child(1) td {
  border-top: 0;
}
.table3 {
  display: flex;
  flex-wrap: wrap;
}

.w200 {
  width: 200px;
}
.small-Idiv {
  float: left;
  width: 45%;
  padding-top: 10px;
}
.small-Idiv:nth-of-type(odd) {
  margin-left: 4%;
}
</style>
