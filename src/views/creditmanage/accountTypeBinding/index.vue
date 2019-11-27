<template>
  <div class="margin binding">
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="150px" size="small">
          <div class="search-wrapper">
            <h4 class="title">搜索条件</h4>
            <div class="search-base">
              <el-row>
               <el-col :span="8">
                    <el-col>
                        <el-form-item label="用户ID：">
                            <el-col :span="23">
                                <el-input v-model="input" placeholder="请输入用户ID"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="8">
                    <el-col>
                        <el-form-item label="账户选择:" >
                           <el-select v-model="dealersAccountSe" filterable  clearable placeholder="请选择" >
                              <el-option
                                v-for="item in dealersAccountList"
                                :key="item.id"
                                :label="item.accountName"
                                :value="item.id"
                               >
                              </el-option>
                          </el-select>
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
            <el-button type="primary" size="small" icon="el-icon-plus" @click="addData"  v-permit="'add:addDate'">账户绑定</el-button>
        </el-col>
        <el-col :span="3">
        </el-col>
      </el-row>
      <el-table   :data="dataArr"  border style="width: 100%" stripe >
      <el-table-column  type="index" align="center" label="排序" width="75"></el-table-column>
        <el-table-column  prop="userName"  label="用户姓名" align="center"></el-table-column>
        <el-table-column  prop="accountId"  label="账户ID" align="center" width="120px;">
          
        </el-table-column>
        <!-- <el-table-column  prop="accountName"  label="账户名称" align="center"></el-table-column> -->
        <el-table-column  prop="accountName"  label="账户类型名称" align="center"></el-table-column>
        <el-table-column  prop="balanceCount"  label="账户余额" align="center"></el-table-column>
        <el-table-column  prop="frozenCount"  label="冻结资金" align="center"></el-table-column>
        <el-table-column  prop="status"  label="账户状态" align="center">
            <template slot-scope="scope">
                {{(scope.row.status==0?'正常':'')||(scope.row.status==1?'禁用/冻结':'')||(scope.row.status==2?'删除':'')}}
            </template>
        </el-table-column>
        <!-- <el-table-column  prop="threshold"  label="预警阈值" align="center"></el-table-column>
        <el-table-column  prop="frequency"  label="预警频率" align="center">
            <template slot-scope="scope">
                {{(scope.row.frequency==1?'每天提醒一次':'')||(scope.row.frequency==2?'只提醒一次':'')||(scope.row.frequency==3?'每周提醒一次':'')||(scope.row.frequency==4?'额度每减少1000元提醒一次':'')}}
            </template>
        </el-table-column> -->
        <el-table-column  prop="createTime"  label="绑定时间" align="center"></el-table-column>
        <!-- <el-table-column label="操作" align="center" fixed="right" width="150">
            <template slot-scope="scope">
              <div style="display: flex;justify-content: space-around">
                  <div class="line-div">
                      <div class="small-Idiv" @click="editor(scope.row.id)" v-permit="'editor:edit'">
                          <div class="i-div">
                              <img src="../../../common/images/icon/编辑.png" alt class="operation_img" />
                          </div>
                          <span>编辑</span>
                      </div>
                  </div>
                
              </div>
            </template>
          </el-table-column> -->
    </el-table>
      <div class="pagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.current_page"
            :page-size="pagination.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total_count">
            </el-pagination>
      </div>
    </div>
  <!-- 账户绑定 -->
  <el-dialog
      title="账户绑定"
      :visible.sync="dialogVisible"
       width="50%"
      :before-close="handleClose"
      :close-on-click-modal="false">
      <div class="dealers">
        <el-form ref="form"  label-width="150px">
          <el-row :span="20">
            <el-col :span="18">
            <el-form-item  label="用户名称：">
              <el-select  style="width:90%;" v-show="agencyS" v-model="userId" filterable  clearable  placeholder="请选择" size="small"   v-el-select-loadmore="loadmore">
                <el-option
                  v-for="item in userList"
                  :key="item.sysuserId"
                  :label="item.sysuserName"
                  :value="item.sysuserId"
                ></el-option>
              </el-select>
               <el-select  style="width:90%;" v-show="customerS" v-model="userId" filterable  clearable  placeholder="请选择" size="small"   v-el-select-loadmore="loadmoreCus">
                <el-option
                  v-for="item in userList"
                  :key="item.sysuserId"
                  :label="item.sysuserName"
                  :value="item.sysuserId"
                ></el-option>
              </el-select>
               <el-select  style="width:90%;" v-show="userS" v-model="userId" filterable  clearable  placeholder="请选择" size="small"  v-el-select-loadmore="loadmoreUser">
                <el-option
                  v-for="item in userList"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId"
                ></el-option>
              </el-select>
            </el-form-item>
            </el-col>
            </el-row>
           <el-row :span="20">
              <el-col :span="18">
              <el-form-item  label="账户类型：">
                    <el-select style="width:90%;"  v-model="dealersAccount" filterable clearable placeholder="请选择" size="small" @change="accountNamese">
                        <el-option
                          v-for="item in dealersAccountList"
                          :key="item.id"
                          :label="item.accountName"
                          :value="item.id"
                          >
                        </el-option>
                    </el-select>
              </el-form-item> 
               </el-col>
            </el-row>
           <el-row :span="20" v-show="accountShow">
              <el-col :span="18">
                <el-form-item  label="固定授信额度：">
                  <el-input style="width:90%;"  v-model="credit" placeholder="请输入内容" type="number" size="small"></el-input> 元
                </el-form-item> 
             </el-col>
            </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose">取 消</el-button>
        <el-button size="small" type="primary" @click="onSubmit">保存</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import { getAllcustomer  } from '@/api/customer/index'
import { dealerAccount , findByPageUser , accountInfoList , accountBinding , getAgency} from '@/api/creditmanage/index'
import { getMerchantName } from "@/api/systemsettings/index";

export default {
    directives: {
        'el-select-loadmore': {
            bind(el, binding) {
                // 获取element-ui定义好的scroll盒子
                const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
                SELECTWRAP_DOM.addEventListener('scroll', function () {
                    const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
                    if (condition) {
                        binding.value();
                    }
                });
            }
        }
    },
  data () {
    return {
      dialogVisible:false,
      accountShow:false,
      dataArr:[], 
      input:'',
      pagination: {
        current_page: 1,
        page_size: 10,
        total_count: 0
      },
      dealersAccount : '',           // 账户id
      dealersAccountList : [] ,     // 账户下拉
      dealersAccountSe:'',
      userList:[],
      userId:'',
      credit:'',
      userType:'',
      agencyS:false,
      customerS:false,
      userS:false,
      accountNames:'',
      obj : {
        pageNum: 1,
        pageSize: 10,
        sysuserType:''
      },
      objUser : {
        pageNum: 1,
        pageSize: 10,
     }
    }
  },
  created () {
    this._getAllAccountInfo()
    this.dealerAccount()    // 经销商账户
  },
  methods: {
     // 经销商账户下拉框
     dealerAccount() {
        let data = {}
        data.pageNum = 1
        data.pageSize = 10000
        dealerAccount(data).then( res =>{
          this.dealersAccountList = res.data.list
        });
    },
    // 查询
    serch(){ 
       this.pagination.current_page = 1  
       this._getAllAccountInfo()
    },
    // 重置
    reset() {
       this.pagination.current_page = 1
       this.pagination.page_size = 10
       this.dealersAccountSe = ""
       this.input = ""
       this._getAllAccountInfo()
    },
    // 新增
    addData (){
      this.dialogVisible = true 
      this.userId = ''
      this.dealersAccount = ''
      this.credit = ''
      this.getMerchantName()
    },
    async getMerchantName(){
      const  { data }  = await getMerchantName()
      this.userId =""
        if( data.platformType == 0 ){
          // 总站后台(放经销商)
          this.agencyS = true
          this.customerS = false
          this.userS = false
          this.userType = 1
          this.obj.pageSize = 10
          this.obj.sysuserType = 3
          this.getAgency();
        }else if( data.platformType == 1 ){
            // 经销商后台（放客户）
            this.agencyS = false
            this.customerS = true
            this.userS = false
            this.userType = 2
            this.obj.pageSize = 10
            this.obj.sysuserType = 2
            this.getCustomer();
        }else if( data.platformType == 2 ){
            // 项目后台（C端用户）
            this.agencyS = false
            this.customerS = false
            this.userS = true
            this.userType = 4
            this.getUser();
        }
     },
     loadmore(){
        this.obj.pageSize+=20;
        this.getAgency();
     },
     loadmoreCus(){
        this.obj.pageSize+=20;
        this.getCustomer();
     },
     loadmoreUser(){
        this.obj.objUser+=20;
        this.getUser();
     },
     // 经销商账户
    async getAgency() {
      const { data } = await getAgency(this.obj);
      this.userList = data.list;
      // this.userList.unshift({
      //   agencyName:'全部',
      //   agencyId:''
      // })
    },
    // 客户账号
     async getCustomer() {
      const { data } = await getAgency(this.obj);
      this.userList = data.list;
    },
     // C端用户
     async getUser() {
      const { data } = await findByPageUser(this.objUser);
      this.userList = data.list;
    },
    // 编辑
    editor(id) {
    //  this.$router.push({ name: "AddAccountType", query: { id: id } });
    },
    // 获取列表
    _getAllAccountInfo(){
        var obj = {}
        obj.pageNum = this.pagination.current_page
        obj.pageSize = this.pagination.page_size
        obj.accountId = this.dealersAccountSe
        obj.userId = this.input
        accountInfoList(obj).then((res) => {
            this.pagination.total_count = res.data.total;
            this.dataArr= res.data.list;
        })
    },
    handleSizeChange(val){
      this.pagination.page_size = val
      this._getAllAccountInfo()
    },
    handleCurrentChange(val){
      this.pagination.current_page = val
      this._getAllAccountInfo()
    },
    accountNamese(val){
       this.dealersAccountList.forEach(ele => {
         if( ele.id == val ){
           this.accountNames = ele.accountName
           if( ele.accountType == 0 ){
             this.accountShow = false
           }else if( ele.accountType == 1 ){
             this.accountShow = true
           }
         }
       });
    },
    handleClose(){
       if( this.userId ||  this.dealersAccount || this.credit ){
          this.$confirm('是否取消账户绑定?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              this.dialogVisible = false
          }).catch(() => {
                    
          });
       }else{
          this.dialogVisible = false
       }

    },
    onSubmit(){
      if( !this.userId ){
        this.$message({
          type: 'warning',
          message:'用户名称不能为空，请选择'
        }); 
        return 
      }   
      if( !this.dealersAccount ){
        this.$message({
          type: 'warning',
          message:'账户类型不能为空，请选择'
        }); 
        return 
      }   
      //  if( !this.credit ){
      //   this.$message({
      //     type: 'warning',
      //     message:'固定授信额度不能为空，请输入'
      //   }); 
      //   return 
      // }   
       var data = {}
       data.userId = this.userId
       data.accountId = this.dealersAccount
       data.creditMax = this.credit
       data.userType = this.userType
       data.accountName = this.accountNames
       accountBinding(data).then( res => {
          if( res.code == 200 ){
             this.$message({
              type: 'success',
              message:'操作成功'
            }); 
            this.dialogVisible = false
            this._getAllAccountInfo()
          }
       })
    }
  },
  components: {
    // AccountOrder,
    // AccountInquiry,
    // AccountOffer,
    // AccountRecord,
  }
}
</script>
<style scoped>
.binding >>> .el-dialog__body {
   padding: 20px 0;
}
.binding >>> .el-form-item {
    margin-bottom: 12px;
}
</style>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.issue-lines {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-left: 4px solid #5494f6;
    font-size: 16px;
    padding-left: 10px;
}
.goods-fitter {
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

