<template>
  <div class="margin">
    <div class="mcard">
      <el-row class="operate mbottom">
          <el-col :span="21">
          <el-button type="primary" size="small" @click="$router.go(0)">刷新</el-button>
          <el-button v-if="false" type="primary" size="small">删除</el-button>
        </el-col>
        <el-col :span="3">
        </el-col>
      </el-row>
      <el-table :data="tableData" border  stripe>
        <el-table-column  type="index"  label="序号" align="center" width="55"></el-table-column>
        <el-table-column label="一级分类" prop="catNameOne" align="center"></el-table-column>
        <el-table-column label="二级分类" prop="catNameTwo" align="center"></el-table-column>
        <el-table-column label="三级分类" prop="catNameThree" align="center"></el-table-column>
        <el-table-column label="已上传商品数量" prop="putGoodsCount" align="center"></el-table-column>
        <el-table-column label="已上架商品数量" prop="putGoodsCount" align="center"></el-table-column>
        <el-table-column label="待审核商品数量" prop="outGoodsCount" align="center"></el-table-column>
        <el-table-column label="停产商品数量" prop="outGoodsCount" align="center"></el-table-column>
        <el-table-column label="采购管理员" prop="sysuserName" align="center"></el-table-column>
        <el-table-column label="上级领导" prop="leaderName" align="center"></el-table-column>
        <el-table-column label="操作" align="center"  fixed="right"  width="150">
          <template slot-scope="scope">
            <div class="line-div">
              <div class="small-Idiv" @click="distribution(scope.row,true)" v-permit="'assigned:buyer'">
                <div class="i-div">
                  <img src="../../common/images/icon/指派采购员.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all; margin-left:-15px">指派采购员</span>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.pageNum"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="form.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="form.total_count">
          </el-pagination>
      </div>
    </div>
    <!-- <el-dialog
      title="指定供应商给采购负责人"
      :visible.sync="dialogVisible"
      width="40%"
      >
      <span>
        <div class="user1">
        <span >指定：</span>
          <treeselect
            style="width:40%"
            :options="options"
            :searchable="false"
            placeholder="请选择上级组织架构"
            v-model="adminId"
            @input='slect'
          />
          <el-select v-model="userId" placeholder="请选择采购员" style="display: flex;" >
            <el-option
              v-for="item in personnel"
              :key="item.sysuserId"
              :label="item.sysuserName"
              :value="item.sysuserId">
            </el-option>
          </el-select>
        </div>
      </span>
      <span slot="footer.vue" class="dialog-footer.vue">
        <el-button type="danger" @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="sysuseridSure" szie="small">确 定</el-button>
      </span>
    </el-dialog> -->
     <!-- 分配采购员 -->
    <el-dialog
      title="分配采购员"
      :visible.sync="dialogVisible"
      width="30%">
      <span>
        <el-select v-model="form.user" clearable placeholder="请选择采购员" style="display: flex;">
          <el-option
            v-for="item in userOptions"
            :key="item.sysuserId"
            :label="item.sysuserName"
            :value="item.sysuserId">
          </el-option>
        </el-select>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="distribution" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配采购员 -->
  </div>
</template>

<script>
import { getUsercatagory , getAlluser , application  } from '@/api/supplier'
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
    data () {
    return {
      dialogVisible: false,
      form: {
        pageNum:1,
        pageSize:10,
        total_count:0,
        user:'',
        catIdThree:''
      },
      tableData:[],
      userOptions:''
    }
  },
  mounted () {
    this.startLoading() //加载中loading
    this._getUsercatagory();
    this._getAlluser();
  },
  computed: {
  },
  methods: {
    //获取采购员数据
    _getAlluser(){
      getAlluser().then(res => {
        this.userOptions = res.data.list
        this.form.user = res.data.list[0].sysuserId
      })
    },
    //分配采购员
    distribution(datas,falg){
      if(falg){
        this.catIdThree = datas.catIdThree
        this.dialogVisible= true;
        return false
      }
      this._application();
    },
    _application(){
      let obj = {}
      obj.sysuserId = this.form.user
      obj.catId = this.catIdThree
      application(obj).then(res => {
        if(res.code == 200){
          this.$message({
            message: '分配成功',
            type: 'success'
          })
        }
        this._getUsercatagory();
      })
      this.dialogVisible = false

    },
    _getUsercatagory(){
      let obj = {}
      obj.pageNum = this.form.pageNum
      obj.pageSize = this.form.pageSize
      getUsercatagory(obj).then(res => {
        this.tableData = res.data.list
        this.form.total_count = res.data.total
        this.endLoading() //取消加载中loading
      })
    },
    handleCurrentChange(val){
      this.form.pageNum = val
      this._getUsercatagory()
    },
    handleSizeChange(val){
      this.form.pageSize = val
      this._getUsercatagory()
    },
    slect(val){
        getSupplierbinduser(val).then(res => {
          this.personnel = res.data
          this.userId = res.data[0].sysuserId
        })
    },
    sysuseridSure(){
      if(this.userId ==''){
        this.$message('请选择采购员');
      }else{
        bindSupplieruser(this.userId,this.supplierId).then(res => {
          if(res.code == 200){
            this.dialogVisible = false
          }
        })
      }
    },
    //指派采购员
    assigned(id) {
      this.options = [];
      this.adminId = null;
      this.supplierId = id;
      this.personnel = []
      this.userId = ''
      getAllOrganizational().then(res => {
        let arr = [];
        arr.push(res.data);
        this.transleteData(arr, this.options);
        this.IterationDelateMenuChildren(this.options);
      });
      this.dialogVisible = true;
    },
  },
  components: {
    Treeselect
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
    max-width: 130px;
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
    margin-left: 11px;
}
.user1{
    display:flex;
    align-items:center;
  }
</style>
