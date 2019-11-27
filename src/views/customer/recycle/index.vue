<template>
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small" :model="form">
          <div class="search-wrapper">
            <h4 class="title">搜索条件</h4>
            <div class="search-base">
              <el-row>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="客户：">
                      <el-col :span="23">
                        <el-input v-model="input" placeholder="请输入客户名称/电话"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="客户来源：">
                      <el-col :span="23">
                        <el-select v-model="customerSourceValue" clearable="" placeholder="请选择客户来源">
                          <el-option
                                  v-for="item in customerSource"
                                  :key="item.dictionaryId"
                                  :label="item.dictionaryName"
                                  :value="item.dictionaryName">
                          </el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="客户等级：">
                      <el-col :span="23">
                        <el-select v-model="customerLevelValue" placeholder="请选择">
                          <el-option
                                  v-for="item in customerLevel"
                                  :key="item.value"
                                  :label="item.dictionaryName"
                                  :value="item.dictionaryName">
                          </el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <!--<el-form-item label="状态：">
                      <el-col :span="23">
                        <el-select
                                class="el-select-width"
                                v-model="form.customerStatus"
                                placeholder="请选择"
                        >
                          <el-option label="正常" value="0"></el-option>
                          <el-option label="黑名单" value="1"></el-option>
                          <el-option label="回收站" value="2"></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>-->
                  </el-col>
                </el-col>
                <el-col :span="1" class="btn_right">
                  <el-button type="primary" size="small" @click='serch(true)' >查询</el-button>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="销售员：">
                      <el-col :span="23">
                        <el-select class="el-select-width"  filterable  clearable  v-model="form.adminId"  placeholder="请选择">
                          <el-option
                                  v-for="item in userOptions"
                                  :key="item.sysuserId"
                                  :label="item.sysuserName"
                                  :value="item.sysuserId"
                          ></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="新增时间：">
                    <el-col :span="22">
                      <el-date-picker
                              type=daterange
                              valueFormat='yyyy-MM-dd HH:mm:ss'
                              v-model="form.createTime"
                              range-separator="至"
                              start-placeholder="开始日期"
                              unlink-panels
                              end-placeholder="结束日期">
                      </el-date-picker>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mcard" style="border: 1px solid #d7e0f1;">
      <el-row class="operate mbottom">
        <el-col :span="21">
          <!-- <el-button type="primary">仅挑选</el-button> -->
          <el-button type="primary" size="small" @click="addData" v-permit="'increased:customer'">新增</el-button>
          <!--<el-button type="primary" size="small" >导入新客户</el-button>
          <el-button type="primary" size="small" >导出客户</el-button>
          <el-button type="primary" size="small"  @click="blacklistAction(true)" >黑名单</el-button>-->
        </el-col>
        <el-col :span="3">
        </el-col>
      </el-row>
      <el-dialog
              title="加入黑名单"
              :visible.sync="blackList"
              width="40%"
      >
        <el-form label-width="100px" size="small" >
          <el-form-item label="供应商名称：">
            <span>{{blackListSe.customerName}}</span>
          </el-form-item>
          <el-form-item label="处理原因：">
            <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入加入黑名单原因"
                    v-model="reason">
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="blackList = false" size="small">取 消</el-button>
            <el-button type="primary" @click="blacklistAction(false)" size="small">确 定</el-button>
          </span>
      </el-dialog>
      <el-table   :data="dataArr"  border style="width: 100%" stripe
      >
        <el-table-column  prop="customerSn"  label="客户编码" align="center"></el-table-column>
        <el-table-column  prop="customerName"  label="客户名称" align="center"></el-table-column>
        <el-table-column  prop="businessType"  label="客户类型" align="center"></el-table-column>
        <el-table-column  prop="salesRepresentative"  label="管理员" align="center">
        </el-table-column>
        <el-table-column  prop="commonContactName"  label="联系人" align="center"></el-table-column>
        <el-table-column  prop="commonContactDept"  label="部门" align="center" ></el-table-column>
        <el-table-column  prop="commonContactPhone"  label="手机号码" align="center"></el-table-column>
        <el-table-column  prop="commonContactTel"  label="办公电话" align="center"></el-table-column>
        <el-table-column  prop="commonContactQq"  label="QQ" align="center"></el-table-column>
        <el-table-column  prop="leaderContactName"  label="部门领导" align="center"></el-table-column>
        <el-table-column  prop="leaderContactPhone"  label="领导手机号" align="center"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="150">
          <template slot-scope="scope">
            <div class="small-Idiv" @click="detail(scope.row.customerId,1)" v-permit="'view:customer'">
              <div class="i-div fuzhi" >
                <img src="../../../common/images/icon/查看详情.png" alt class="operation_img" />
              </div>
              <span style="word-break: keep-all;">详情</span>
            </div>
            <div class="small-Idiv" @click="editor(scope.row.customerId,2)" v-permit="'edit:customer'">
              <div class="i-div">
                <img src="../../../common/images/icon/编辑.png" alt class="operation_img" />
              </div>
              <span>编辑</span>
            </div>
            <div class="small-Idiv" @click="deleteCustomer = true" v-permit="'remove:customer'">
              <div class="i-div">
                <img src="../../../common/images/icon/回收站.png" alt class="operation_img" />
              </div>
              <span style="margin-left: 4px;">删除</span>
            </div>
            <div class="small-Idiv">
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
      <!-- 删除 -->
      <el-dialog
              title="删除"
              :visible.sync="deleteCustomer"
              width="30%"
      >
        <el-form :model="form"  label-width="100px">
          <el-form-item label="删除原因:">
            <el-input type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="上级领导审核:">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="销售总监" value="0"></el-option>
              <el-option label="采购经理" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="deleteCustomer = false" size="small">取 消</el-button>
        <el-button type="primary" @click="deleteCustomer = false" size="small">确 定</el-button>
      </span>
      </el-dialog>
      <!-- 删除 -->
    </div>
    <div class="margin0">
      <!--楼哥说这个暂时不要 不要改我代码 大锅-->
      <div v-if="false">
        <div class="tabs-header">
          <ul class="clearfix">
            <li @click="tabIndex(0)" :class="currentIndex===0 ? 'active' : ''"  >往期订单</li>
            <li @click="tabIndex(1)" :class="currentIndex===1 ? 'active' : ''">往期询价单</li>
            <li @click="tabIndex(2)" :class="currentIndex===2 ? 'active' : ''">往期报价单</li>
            <li @click="tabIndex(3)" :class="currentIndex===3 ? 'active' : ''">跟踪记录</li>
          </ul>
        </div>
        <div class="tabs-content">
          <account-order v-if="currentIndex===0"  :orderList="orderList" :count1="count1" :customerId1="customerId1"></account-order>
          <account-inquiry v-if="currentIndex===1" :inquiryList="inquiryList" :count2="count2" :customerId1="customerId1"></account-inquiry>
          <account-offer v-if="currentIndex===2" :offerList="offerList" :count3="count3" :customerId1="customerId1"></account-offer>
          <account-record v-if="currentIndex===3" :storeManagerId="storeManagerId"></account-record>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getAllcustomer,deleteCustomer , getCustomerLevel , getCustomersoure , application } from '@/api/customer/index'
  import { getUserdata } from "@/api/apply/index";
  import {getOrder,getInquiry,getQuotation} from '@/api/sale/index'
  import AccountOrder from './order'
  import AccountInquiry from './inquiry'
  import AccountOffer from './offer'
  import AccountRecord from './record'
  export default {
    data () {
      return {
        userOptions: [], //销售员
        dataArr:[],
        black:'',
        getIndex:'',
        orderList:[],//订单数据
        count1:0,

        inquiryList:[],//询价单数据
        count2:0,

        offerList:[],//报价单数据
        count3:0,
        customerId1:'',
        reason:'',//加入黑名单原因
        blackList:false,//黑名单
        blackListSe:[],//黑名单信息
        deleteCustomer:false, //删除
        form: {
          customerSource:'', //客户来源
          customerLevel:'',  //客户等级
          customerStatus:'1', //状态
          adminId:'', //销售员
          createTimeStart:'',
          createTimeEnd:'',
          createTime:''
        },
        tableDatas:{
          pageSize:10,
          pageIndex:0,
          count:0,
          customerId:'',
        },
        forms: {
          current_page:0,
          page_size:10,
          total_count:0,
          customerId:'',
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
      this._getAllcustomer();
      this. _getUserdata()    //获取销售员
      getCustomerLevel().then(res=>{
        this.customerLevel = res.data
      });
      getCustomersoure().then(res=>{
        this.customerSource = res.data

      });
    },
    computed: {
    },
    methods: {
      tabIndex (index) {
        this.currentIndex = index;

      },
      //获取销售管理员
      _getUserdata() {
        getUserdata().then(res => {
          this.userOptions = res.data.list;
        });
      },
      addData(){
        this.$router.push({name:'AddCustomer'})
      },
      editor(id,state) {
        this.$router.push({ name: "AddCustomer", query: { id: id ,state:state } });
      },
      detail(id,state) {
        this.$router.push({ name: "DetailCustomer", query: { id: id ,state:state} });
      },
      serch(slt){
        if(slt){
          this.tableData.currentPage = 1;
        }
        this._getAllcustomer()
      },
      _getAllcustomer(){
        let obj = {};
        obj.pageNum = this.tableData.currentPage;
        obj.pageSize = this.tableData.size;
        obj.keywords = this.input;
        obj.customerSource = this.customerSourceValue;
        obj.customerLevel = this.customerLevelValue;
        obj.customerStatus = this.form.customerStatus;
        obj.adminId = this.form.adminId;
        /*    obj.createTimeStart = this.form.createTime[0];
           obj.createTimeEnd = this.form.createTime[1]; */
        getAllcustomer(obj).then((res) => {
          this.tableData.total = res.data.total;
          this.dataArr= res.data.list;
        })
      },
      handleSizeChange(val){
        this.tableData.size = val;
        this._getAllcustomer()
      },
      handleCurrentChange(val){
        this.tableData.currentPage = val;
        this._getAllcustomer()
      },
      //选择的信息
      handleSelectionChange(val){
        this.blackListSe = val[0]
        this.black = val
      },
      //获取销售订单分页
      _getOrder(){
        getOrder(this.tableDatas).then(res=>{
          if(res.data){
            this.orderList = res.data.pageList
            this.count1 = res.data.count;
          }
        })
      },
      //查询询价单分页
      _getInquiry() {
        getInquiry(this.forms).then(res => {
          if (res.code === 200) {
            this.inquiryList = res.data.pageList;
            this.count2 = res.data.count;
          }
        });
      },
      //查询报价单分页
      _getQuotation() {
        getQuotation(this.forms).then(res => {
          if (res.code === 200) {
            this.offerList = res.data.pageList;
            this.count3 = res.data.count;
          }
        });
      },
      /*   selectedHighlight({ row, rowIndex }) {
          if (this.getIndex === rowIndex) {
            return {
              "background-color": "#e4ecfa"
            };
          }
        },

        tableRowClassName({ row, rowIndex }) {
          //把每一行的索引放进row
          row.index = rowIndex;
        },

        //双击选定
        AhandleSelectionChange(row) {
          this.getIndex = row.index;
          this.tableDatas.customerId = row.customerId;
          this.customerId1 = row.customerId;
          this._getOrder();
          this._getInquiry();

        }, */
      //加入黑名单
      blacklistAction(falg){
        if(falg){
          if(this.black.length > 1 || this.black.length === 0 ){
            this.$message({
              message: '请选择一项列表',
              type: 'warning'
            });
          }else{
            this.blackList = true;
          }
          return false;
        }
        let obj = {};
        obj.customerIds=this.blackListSe.customerId
        obj.enable=1
        obj.cancelReason=this.reason
        application(obj).then(res=>{
          if(res.code === 200){
            this.$message({
              message: '加入黑名单成功',
              type: 'success'
            });
          }
        })
        this.blackList = false;
      }
    },
    components: {
      AccountOrder,
      AccountInquiry,
      AccountOffer,
      AccountRecord,
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
    width: 32px;
    span{
      margin-top: 3px;
      font-size:12px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(72,73,77,1);
    }
  }
  .i-div{
    cursor: pointer;
  }
  .small_top {
    margin-top: 10px;
    margin-left: 19px;
    margin-right: 15px;
  }
  .margin0{
    margin-top:20px;
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

