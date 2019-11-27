<template>
  <div class="margin">
    <div class="mcard">
        <div class="search-wrapper" style="margin-bottom:35px;">
            <h4 class="title">商品专题</h4>
        </div>
      <el-row class="operate mbottom">
        <el-col :span="21">
            <el-button type="primary" size="small" icon="el-icon-plus" @click="addData" v-permit="'new:subject'">新增</el-button>
        </el-col>
        <el-col :span="3">
        </el-col>
      </el-row>
      <el-table   :data="dataArr"  border style="width: 100%" stripe  @selection-change="handleSelectionChange">
        <el-table-column  prop="specialTitle" align="center" label="专题名称"></el-table-column>
        <el-table-column  prop="goodsNumber"  label="包含商品数" align="center"></el-table-column>
        <el-table-column  prop="createTime"  label="创建时间" align="center"></el-table-column>
        <el-table-column  prop="updateTime"  label="最后更新时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="200">
            <template slot-scope="scope">
              <div style="display: flex;justify-content: space-around">
                  <div class="line-div">
                      <div class="small-Idiv" @click="editor(scope.row.specialId)" v-permit="'edit:subject'">
                          <div class="i-div">
                              <img src="../../../../common/images/icon/编辑.png" alt class="operation_img" />
                          </div>
                          <span>编辑</span>
                      </div>
                  </div>
                  <div class="line-div">
                      <div class="small-Idiv" @click="handeleDelete(scope.row.specialId)" v-permit="'remove:subject'">
                          <div class="i-div">
                              <img src="@/common/images/icon/icon_delete.png" alt class="operation_img" />
                          </div>
                          <span style="margin-left: 4px;">删除</span>
                      </div>
                      <div class="small-Idiv">
                      </div>
                  </div>
              </div>
            </template>
          </el-table-column>
    </el-table>
      <div class="pagination">
        <el-pagination
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
import {queryProject,deleteProject} from '@/api/product/index'
export default {
  data () {
    return {
      type:'',    //2是删除   1  停用
      dialogVisible:false,
      accountId:'', //账户id
      dataArr:[],
      black:'',
      reason:'',//加入黑名单原因
      blackList:false,//黑名单
      blackListSe:[],//黑名单信息
      deleteCustomer:false, //删除
      form: {
        customerSource:'', //客户来源
        customerLevel:'',  //客户等级
        customerStatus:'', //状态
        salesRepresentative:'', //销售员
        createTimeStart:'',
        createTimeEnd:'',
        createTime:''
      },
      customerSource:[],
      customerLevel:[],
        searchpe:'',
        customerSourceValue:'',
        customerLevelValue:'',
        value: '',
        input:'',
        currentIndex: 0,
        storeManagerId: '0',
        roleList: [],
        tableData: {
            currentPage:1,
            sizes:[10, 20, 50, 100],
            size:10,
            total:0,
       },
    }
  },
  created () {
      const obj = {
          pageSize:10,
          pageNum:1,
      };
    this._getAllcustomer(obj);

  },
  methods: {
    handeleDelete(val){
        this.$confirm('此操作将永久删除该商品专题, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            deleteProject(val).then(res => {
                if(res.code == 200){
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    const obj = {
                        pageSize:10,
                        pageNum:1,
                    };
                    this._getAllcustomer(obj);
                }
            })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
      //确认修改
    async confrimaccountId(){
      this.dialogVisible = false
      const data={
        accountId:this.accountId,
        type:this.type
      }
      const res = await modifyStatus(data)
      if(res.code === 200 ){
          const obj = {
              pageSize:10,
              pageNum:1,
          };
          this._getAllcustomer(obj);
      }
   },
    // 查询
    serch(){
          const obj={
              pageNum:1,
              accountName:this.input
          }
          this._getAllcustomer(obj)
    },
    // 重置
    reset() {
        this.input = ''
        this.serch()
    },
    // 新增
    addData (){
      this.$router.push({name:'goodsproject'})
    },
    // 编辑
    editor(id) {
      this.$router.push({ name: "editor", query: { id: id } });
    },
    _getAllcustomer(obj){
        queryProject(obj).then((res) => {
                this.tableData.total = res.data.total;
                this.dataArr= res.data.list;
            })
        },
      handleSizeChange(val){
        console.log(val)
        this.tableData.size = val;
        const obj={
            pageSize:val,
            pageNum:1,
        }
            this._getAllcustomer(obj)
      },
      handleCurrentChange(val){
        this.tableData.currentPage = val;
          const obj={
              pageSize:10,
              pageNum:val,
          }
            this._getAllcustomer(obj)
      },
      //选择的信息
      handleSelectionChange(val){
        this.blackListSe = val[0]
        this.black = val
      },
  },
  components: {
    // AccountOrder,
    // AccountInquiry,
    // AccountOffer,
    // AccountRecord,
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
.detail{
    font-size: 14px;
    color: #606266;
}
.line-div {
  display: flex;
  justify-content: space-evenly;
    margin-top: 5px;
}
.small-Idiv{

    span{
        margin-top: 3px;
        font-size:12px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(72,73,77,1);
    }
}
.small_top {
  margin-top: 10px;
  margin-left: 19px;
  margin-right: 15px;
}
</style>
