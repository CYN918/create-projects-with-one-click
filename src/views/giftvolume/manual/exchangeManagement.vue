  <template>
      <div>

          <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="130px" size="small">
          <div class="search-wrapper">
            <h4 class="title">兑换管理</h4>
            <div class="search-base">
              <el-row>
               <el-col :span="5">
                    <el-col>
                        <el-form-item label="册号：">
                            <el-col :span="22">
                                <el-input v-model="form.projectName" placeholder="请输入册号"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="5">
                    <el-col>
                        <el-form-item label="卡册名称：">
                            <el-col :span="22">
                                <el-input v-model="form.projectName" placeholder="请输入卡册名称"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="5">
                    <el-col>
                        <el-form-item label="客户/经销商名称：">
                            <el-col :span="22">
                                <el-input v-model="form.projectName" placeholder="请输入客户/经销商名称"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-col>

                <el-col :span="2" >
                      <el-button type="primary" size="small" @click='search(true)' >查询</el-button>
                </el-col>
              </el-row>
              <el-row>


              </el-row>

            </div>
          </div>
        </el-form>
      </div>
   </div>
   <div class="mcard" style="border:1px solid #d7e0f1">
     <el-button type="primary" size="small" style="margin-bottom:20px;">批量开通</el-button>
     <el-button type="primary" size="small" style="margin-bottom:20px;">导出兑换明细</el-button>
       <el-button type="primary" size="small" style="margin-bottom:20px;" @click="goToApp">预览h5</el-button>
       <el-button type="primary" size="small" style="margin-bottom:20px;" @click="duihuan">生成兑换</el-button>
       <el-table :data="tableData" border
                 @selection-change="handleSelectionChange"
       stripe>
      <el-table-column
          type="selection"
          width="40">
      </el-table-column>
        <el-table-column label="序号" type="index" align="center" width="50" ></el-table-column>
        <el-table-column label="客户名称" prop="name" align="center" width="150">
               <template slot-scope="scope">

                   深圳科技有限公司
               </template>
        </el-table-column>
        <el-table-column label="经销商" prop="name" align="center" width="150">
                深圳科技有限公司

        </el-table-column>
        <el-table-column label="册号" prop="name" align="center"  width="110">
                <template slot-scope="scope">
                  100
                </template>
        </el-table-column>
        <el-table-column label="册密" prop="name" align="center" width="110">
                <template slot-scope="scope">
                  1000
                </template>
        </el-table-column>
        <el-table-column label="卡册名称" prop="name" align="center" width="110">
                <template slot-scope="scope">
                   双十一礼品卡
                </template>
        </el-table-column>
        <el-table-column label="卡册档位" prop="name" align="center" width="100">
                    <template slot-scope="scope">
                        1000
                    </template>
        </el-table-column>
          <el-table-column label="结算金额" prop="name" align="center" width="110">
                <template slot-scope="scope">
                    100
                </template>
        </el-table-column>
        <el-table-column label="结算金额" prop="name" align="center" width="100">
                    <template slot-scope="scope">
                        1000
                    </template>
        </el-table-column>
        <el-table-column label="订单明细" prop="name" align="center" width="100">
                    <template slot-scope="scope">
                       <el-button size="small" type="primary">查看</el-button>
                    </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name" align="center" width="110">
                    <template slot-scope="scope">
                      1000
                    </template>
        </el-table-column>
        <el-table-column label="成本价" prop="name" align="center" width="100">
                    <template slot-scope="scope">
                      1000
                    </template>
        </el-table-column>
        <el-table-column label="利润率" prop="name" align="center" width="110">
                    <template slot-scope="scope">
                      1000
                    </template>
        </el-table-column>
        <el-table-column label="开通状态" align="center"  fixed="right"  width="100">
          <template slot-scope="scope">
                <el-switch
                  v-model="value1"
                  active-text=""
                  inactive-text="">
                </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="form.pageIndex"
            :page-sizes="[5,10,30,50]"
            :page-size="form.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="form.count">
            </el-pagination>
      </div>
    </div>


      </div>

</template>

<script>

export default {
    data(){
        return{
           value1:'',
            goodsData:{
                pageIndex:1,
                pageSize:10,
                count:0
             },
             tableData:[
                  {
                  date: '2016-05-02',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1518 弄'
                }, {
                  date: '2016-05-04',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1517 弄'
                }, {
                  date: '2016-05-01',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1519 弄'
                }, {
                  date: '2016-05-03',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1516 弄'
                }
              ],
              form: {
                      pageIndex:1,
                      pageSize:10,
                      startTime:'',
                      endTime:'',
                      count:0
            },
        }
    },
   methods:{
       // 去h5
       goToApp() {
           this.$router.push('/giftvolume/manual/giftCard')
       },
       duihuan() {
           this.$router.push('/giftvolume/manual/exchange')
       },
      search(){

      },
         handleSizeChange(){

      },
      handleCurrentChange(){

      },
      handleSelectionChange(){

      }
 },

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
.margin1{
  padding-left:40px;
  padding-top:20px;
  box-sizing: border-box;

}
.line-div {
    overflow: hidden;
  .small-Idiv{
      padding-top: 10px;
      float: left;
      margin-left: 10px;
  }
}
.line{
    overflow: hidden;
  .small-Idiv{
      padding-top: 10px;
      float: left;
      margin-left: 10px;
      margin-right: 12px;
  }
}


.i-div {
  cursor: pointer;
}
.head{
  margin-bottom: 20px;
}
.tabs-header li {
  padding:0 28px !important;
}
.blue{
    color: #4A99FA;
    cursor: pointer;
}
 /deep/ .el-dialog__headerbtn{
      top:10px;
    }
</style>
