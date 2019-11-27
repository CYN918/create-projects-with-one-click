<template>
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="150px" size="small" :model="form">
          <div class="search-wrapper">
            <h4 class="title">搜索条件</h4>
            <div class="search-base">
              <el-row>
               <el-col :span="8">
                    <el-col>
                        <el-form-item label="账户类型名称：">
                            <el-col :span="23">
                                <el-input v-model="input" placeholder="请输入账户类型名称"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small" @click='serch'>查询</el-button>
                </el-col>
                <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small" @click='reset' >重置</el-button>
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
            <el-button type="primary" size="small" icon="el-icon-plus" @click="addData" v-permit="'add:addDate'">新增</el-button>
        </el-col>
        <el-col :span="3">
        </el-col>
      </el-row>
      <el-table   :data="dataArr"  border style="width: 100%" stripe  @selection-change="handleSelectionChange">
      <el-table-column  type="index" align="center" label="排序" width="75"></el-table-column>
        <el-table-column  prop="id"  label="账户类型ID" align="center"></el-table-column>
        <el-table-column  prop="accountLogo"  label="logo图" align="center" width="120px;">
            <template slot-scope="scope">
                 <img :src="scope.row.accountLogo" style="width: 100px;height: 100px;" v-if="scope.row.accountLogo">
            </template>
        </el-table-column>
        <el-table-column  prop="accountCode"  label="账户类型编号" align="center"></el-table-column>
        <el-table-column  prop="accountName"  label="账户类型" align="center"></el-table-column>
        <el-table-column  prop="accountStatus"  label="状态" align="center">
            <template slot-scope="scope">
                {{(scope.row.accountStatus==0?'正常':'')||(scope.row.accountStatus==1?'已禁用':'')||(scope.row.accountStatus==2?'已删除':'')}}
            </template>
        </el-table-column>
        <el-table-column  prop="accountSort"  label="排序" align="center" ></el-table-column>
        <el-table-column  prop="createTime"  label="创建时间" align="center" width="200"></el-table-column>
        <el-table-column  prop="createUserName"  label="创建人" align="center"></el-table-column>
        <el-table-column  prop="remark"  label="备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="130">
            <template slot-scope="scope">
              <div>
                  <div class="line-div">
                      <!--<div class="small-Idiv" @click="detail(scope.row.customerId,1)">-->
                      <!--<div class="i-div fuzhi" >-->
                      <!--<img src="../../../common/images/icon/查看详情.png" alt class="operation_img" />-->
                      <!--</div>-->
                      <!--<span style="word-break: keep-all;">查看</span>-->
                      <!--</div>-->
                      <div class="small-Idiv" @click="editor(scope.row.id)" v-permit="'editor:edit'">
                          <div class="i-div">
                              <img src="../../../common/images/icon/编辑.png" alt class="operation_img" />
                          </div>
                          <span>编辑</span>
                      </div>
                  </div>
                  <div class="line-div">
                      <div class="small-Idiv" v-if="scope.row.id !=1 && scope.row.id !=2 && scope.row.id !=3 && scope.row.id !=4  " @click="handeleDelete(scope.row)" v-permit="'update:status'">
                          <div class="i-div">
                              <img src="../../../common/images/icon/服务授权.png" alt class="operation_img" />
                          </div>
                          <span style="margin-left: 4px;">修改状态</span>
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
  <!-- 修改状态的弹窗 -->
  <el-dialog
    title="修改状态"
    :visible.sync="dialogVisible"
    width="30%"
    >
    <div style="text-align: center">
      <el-radio-group v-model="type">
        <el-radio :label="0">正常</el-radio>
        <el-radio :label="1">禁用</el-radio>
        <el-radio :label="2" v-if="fixation" >删除</el-radio>
      </el-radio-group>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confrimaccountId">确 定</el-button>
    </span>
  </el-dialog>


  </div>
</template>

<script>
import {accountType,modifyStatus} from '@/api/customer/index'
// import AccountOrder from './order'

    // import AccountOrder from './order'

// import AccountInquiry from './inquiry'
// import AccountOffer from './offer'
// import AccountRecord from './record'
export default {
  data () {
    return {
      fixation:true,
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
        if( val.id == 1 || val.id == 2 || val.id == 3 || val.id == 4 ){
           this.fixation = false
        } else{
           this.fixation = true
        }
        this.dialogVisible = true
        this.accountId = val.id
        this.type=val.accountStatus
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
      this.$router.push({name:'AddAccountType'})
    },
    // 编辑
    editor(id) {
      this.$router.push({ name: "AddAccountType", query: { id: id } });
    },
    // 查看详情
    // detail(id,state) {
    //   this.$router.push({ name: "DetailccountType", query: { id: id ,state:state} });
    // },
    _getAllcustomer(obj){
        accountType(obj).then((res) => {
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
  display: inline-block;
  width: 50%;
  text-align: center;
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

