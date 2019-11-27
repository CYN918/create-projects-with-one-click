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
                        <el-form-item label="关键词：">
                            <el-col :span="23">
                                <el-input v-model="form.input" placeholder="请输入消息主题或内容模糊搜索"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="发送时间：">
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
                <!-- <el-col :span="5">
                  <el-col>
                    <el-form-item label="接收人：">
                        <el-col :span="23">
                            <el-input v-model="form.customerSourceValue" placeholder="请输入接收人姓名或手机号"></el-input>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col> -->
                
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="发送状态：">
                        <el-col :span="23">
                            <el-select
                                class="el-select-width"
                                v-model="form.customerStatus"
                                placeholder="请选择"
                            >
                                <el-option label="全部状态" value="-1"></el-option>
                                <el-option label="草稿" value="0"></el-option>
                                <el-option label="发送成功" value="1"></el-option>
                                <el-option label="发送失败" value="2"></el-option>
                                <el-option label="删除" value="3"></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small" @click='serch(true)' >查询</el-button>
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
            <el-button type="primary" size="small" @click="addNewSms" v-permit="'mass:texting'">发送短信</el-button>
        </el-col>
        <el-col :span="3">
        </el-col>
      </el-row>
          <!-- 新增短信群发 -->
          <el-dialog
          :title="title"
          :visible.sync="blackList"
          width="40%"
          :close-on-click-modal="false"
          :before-close="handleClose"
          >
          <el-form label-width="100px" size="small" :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="短信主题：">
              <el-input v-model="smsTheme" placeholder="请输入短信主题"></el-input>
            </el-form-item>
            <div class="teshu">
            <el-form-item label="短信内容:" prop="smsDesc">
              <el-input type="textarea" v-model="ruleForm.smsDesc" :rows="6"></el-input>
            </el-form-item>
            </div>
            <el-form-item label="短信接收人:" prop="smsDesc">
              <!-- <el-button type="primary" size="small" @click="selectUser = true">添加用户</el-button> -->
              <el-button type="primary" size="small" @click="selectUser = true">添加同事</el-button>
              <el-input type="textarea" v-model="ruleForm.echoData" :rows="6" style="margin-top: 15px;" 
              placeholder="接收人格式:
              1.姓名(电话号码),多个接收人用逗号隔开,例如:张三(12345678910),李四(123456789)
              2.纯号码格式:123456789,123456789
              "></el-input>
            </el-form-item>
            <el-form-item label="备注说明：">
                <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入备注说明"
              v-model="smsReason">
              </el-input>
            </el-form-item>
            <p style="color: #4a99fa;padding-left: 100px;">*(本内容只做为本次短信发送的备注说明,不会发送给短信接收人)</p>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="cancelClick" size="small">取 消</el-button>
            <el-button type="primary" @click="editorBlacklistAction('ruleForm')" size="small" v-if="this.title === '编辑群发短信'">立即发送</el-button>
            <el-button type="primary" @click="blacklistAction('ruleForm')" size="small" v-else>立即发送</el-button>
            <el-button type="primary" @click="editorSavaDraft('ruleForm')" size="small" v-if="this.title === '编辑群发短信'">保存草稿</el-button>
            <el-button type="primary" size="small" @click="savaDraft('ruleForm')" v-else>保存草稿</el-button>
          </span>
        </el-dialog>

      <el-table   :data="dataArr"  border style="width: 100%" stripe
          :row-class-name="tableRowClassName"
          :row-style="selectedHighlight"
          >
        <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
        <el-table-column  prop="id"  label="编号" align="center"></el-table-column>
        <!-- <el-table-column  prop="merchantName"  label="公司名称" align="center"></el-table-column> -->
        <el-table-column  label="接收人" align="center">
             <template slot-scope="scope">
               <div>
                 <ul>
                   <li v-for="item in scope.row.receiverUsers">{{item.receiverName}}({{item.telephone}})</li>
                 </ul>
               </div>
             </template>
        </el-table-column>
        <el-table-column  prop="messageTitle"  label="主题" align="center"></el-table-column>
        <el-table-column  prop="messageContent"  label="内容" align="center" ></el-table-column>
        <el-table-column  prop="sendTime"  label="发送时间" align="center"></el-table-column>
        <el-table-column  prop="status"  label="发送状态" align="center" :formatter="formatState"></el-table-column>
        <el-table-column  prop="senderName"  label="发送人" align="center"></el-table-column>
        <el-table-column  prop="remark"  label="备注说明" align="center"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="200">
            <template slot-scope="scope">
              <div class="line-div">
                  <div class="small-Idiv" @click="detail(scope.row.id,1)" v-permit="'texting:details'">
                      <div class="i-div fuzhi" >
                          <img src="../../../common/images/icon/查看详情.png" alt class="operation_img" />
                      </div>
                      <span style="word-break: keep-all;">详情</span>
                  </div>
                  <div class="small-Idiv" @click="deleteSms(scope.row.id,1)" v-if="scope.row.status != 3" v-permit="'texting:delete'">
                    <div class="i-div">
                      <img src="../../../common/images/icon/回收站.png" alt class="operation_img" />
                    </div>
                    <span style="margin-left: 4px;">删除</span>
                  </div>
                  
              </div>
              <div class="line-div">
                  <div class="small-Idiv" @click="editor(scope.row.id,1)" v-if="scope.row.status === 0" v-permit="'texting:edit'">
                      <div class="i-div fuzhi" >
                          <img src="../../../common/images/icon/编辑.png" alt class="operation_img" />
                      </div>
                      <span style="word-break: keep-all;">编辑</span>
                  </div>
                  <div class="small-Idiv" @click="sendSms(scope.row.id,1)" v-if="scope.row.status === 0" v-permit="'texting:send'">
                      <div class="i-div fuzhi" >
                          <img src="../../../common/images/icon/审核.png" alt class="operation_img" />
                      </div>
                      <span style="word-break: keep-all;">发送</span>
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
      <!-- 删除 -->
      <el-dialog
      title="删除"
      :visible.sync="deleteCustomer"
      width="30%"
      :before-close="handleClose"
      >
      <span>您确认要删除该条短信记录吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="deleteCustomer = false" size="small">取 消</el-button>
        <el-button type="primary" @click="sureDetele" size="small">确 定</el-button>
      </span>
    </el-dialog>
      <!-- 选择群发短信用户 -->
      <el-dialog
      title="选择群发短信用户"
      :visible.sync="selectUser"
      width="60%"
      :close-on-click-modal="false"
      :before-close="handleClose"
      >
      <el-form label-width="100px" size="small" :model="form">
          <div class="search-wrapper">
            <h4 class="title">搜索条件</h4>
            <div class="search-base">
                <el-row>
                  <el-col :span="12">
                    <el-col :span="10">
                        <el-col>
                          <el-form-item label="组织机构:">
                            <treeselect
                              style="width:300px"
                              :options="form.options"
                              search-nested
                              placeholder="请选择上级组织架构"
                              v-model="form.organizeId"
                            />
                          </el-form-item>
                        </el-col>
                    </el-col>
                  </el-col>
                  <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small" @click="sureSelectUser" >查询</el-button>
                  </el-col>
                </el-row>
              </div>

          </div>
        </el-form>


        <el-table
        :data="userData"
        border
        @selection-change="handleSelectionChange"
        style="width: 100%;overflow-y: scroll;">
        <el-table-column align="center" type="selection" width="55" fixed="left" label="选择"></el-table-column>
				<el-table-column type="index" align="center" width="55" label="编号"></el-table-column>
        <el-table-column
          prop="companyName"
          label="公司名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="organizeName"
          label="部门"
          align="center">
        </el-table-column>
        <el-table-column
          prop="sysuserName"
          label="姓名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="telephone"
          align="center"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="position"
          align="center"
          label="职位">
        </el-table-column>
      </el-table>
      
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="selectUser = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirm" size="small">确 认</el-button>
      </span>
    </el-dialog>
    </div>
    <!--楼哥说这个暂时不要 不要改我代码 大锅-->
    <!-- <div class="margin0">
        
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
  </div> -->
  </div>
</template>

<script>
import { getSms,detailSms,deleteSms,deleteCustomer, saveAndSendSms, saveSms,sendAndSendSms,getUser , createOrUpdate} from '@/api/customer/index'
import { getAllOrganizational, getAllMenu ,findByPage} from '@/api/creditmanage/index'
import { getAllOrganizationalSearch } from "@/api/permissions/index";
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  components: {
    Treeselect
  },
  data () {
    return {
      dataArr:[],
      getIndex:'',
      orderList:[],//订单数据
      count1:0,
      inquiryList:[],//询价单数据
      count2:0,
      offerList:[],//报价单数据
      count3:0,
      customerId1:'',
      blackList:false,//新增群发
      blackListSe:[],//新增群发信息
      deleteCustomer:false, //删除
      form: {
        input: '',//关键字
        // customerSourceValue: '',//手机号码
        customerStatus:'', //状态
        createTime:'',
        organizeId: null,
        options: [],
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
      options1:[],
      customerSource:[],
      customerLevel:[],
      searchpe:'',
      // customerSourceValue:'',
      customerLevelValue:'',
      value: '',
      currentIndex: 0,
      storeManagerId: '0',
      roleList: [],
      tableData: {
        currentPage:1,
        sizes:[10, 20, 50, 100],
        size:10,
        total:0,
      },
      userData: {
        currentPage:1,
        sizes:[10, 20, 50, 100],
        size:10,
        total:0,
      },
      smsTheme: '', //短信主题
      ruleForm: {
        smsDesc: '', //短信内容
        echoData: '', //回显数据
      },
      rules:{
        smsDesc: [
          { required: true, message: '请输入短信内容', trigger: 'blur' },
          { max: 140, message: '长度在 140 个字符', trigger: 'blur' }
        ],
        echoData: [
          { required: true, message: '请输入收信人', trigger: 'blur' },
        ],
      },
      smsReason:'',//备注说明
      blackDetails: false,
      selectUser: false,
      
      department:[], 
      value1: [],
      value2: [],
      userData: [],
      pushIdList:[],
      tabCount: 0,
      receiverName: '',
      messageTitle: '',
      messageContent: '',
      remark: '',
      smsId: '',
      receiverUsers: [],
      title: '新增群发短信',
      editorId: '',
      str: '',
      companyName:'',
    }
  },
  created () {
    this._getAllcustomer();
    this.addUser();
    // 外面的树形结构
  
    // 弹框里面搜索的树形结构
    //  getAllOrganizational().then(res => {
    //   let arr1 = [];
    //   arr1.push(res.data);
    //   this.transleteData1(arr1, this.options1);
    //   this.IterationDelateMenuChildren1(this.options1);
    // });
  },
  computed: {
  },
  methods: {
    addUser(){
        // this.selectUser = true
        // this.options = []
        // this.form.organizeId = null 
         getAllOrganizationalSearch().then(res => {
        let arr1 = [];
          arr1.push(res.data);
        this.transleteData1(arr1, this.form.options);
        this.IterationDelateMenuChildren1(this.form.options);
      });
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
            this.ruleForm.echoData = '';
          })
          .catch(_ => {});
      },
    formatState(row, column, cellValue) {
          if(cellValue == "0"){
              return '草稿';
          }else if (cellValue == "1"){
              return '发送成功';
          }else if (cellValue == "2"){
            return '发送失败';
          }else if (cellValue == "3"){
            return '删除';
          }
    },
    transleteData1(data, arr) {
      data.forEach(item => {
        if (!item.parentId) {
          item.parentId = 0;
          item.parentName = "所有部门";
        }
        const msg = {
          id: item.organizeId,
          label: item.organizeName,
          value: item.organizeId,
          children: item.childNodes ? [] : null,

          isLeaf: item.childNodes ? false : true
        };
        if (item.childNodes && item.childNodes.length > 0) {
          this.transleteData1(item.childNodes, msg.children);
        }
        arr.push(msg);
      });
      return arr;
    },
     IterationDelateMenuChildren1(arr) {
      if (arr.length) {
        for (let i in arr) {
          if(arr[i].children){
            if (arr[i].children.length) {
              this.IterationDelateMenuChildren1(arr[i].children);
            } else {
              delete arr[i].children;
            }
          }
          
        }
      }
      return arr;
    },
    
    
    // 选择用户列表
    sureSelectUser() {
       let data = {
         organizeId: this.form.organizeId
       }
      // data.pageNum = this.formTable.current_page
      // data.pageSize = this.formTable.page_size
       findByPage(data).then(res => {
        //  this.formTable.total_count = res.data.total
          this.userData = res.data
       });
    },
    // 获取搜索商品栏的选中商品
    handleSelectionChange(val) {  
      // console.log(val)  
      val.forEach((item) => { 
        this.pushIdList.push(item.sysuserName + '(' + item.telephone + ')')
      })
      this.tabCount = val.length
    },
    confirm(){
      if(this.pushIdList.length == 0){
        this.$message({
          message: '请选择群发短信用户',
          type: 'warning'
        });
        return false
      }
      this.selectUser = false;
      var hash=[];
      // var arr1 = [];
      
      // for (var i = 0; i < arr1.length; i++) {
      //   if(hash.indexOf(arr1[i]) == -1){
      //     hash.push(arr1[i]);
      //   }
      // }
      for (var i = 0; i < this.pushIdList.length; i++) {
        if(hash.indexOf(this.pushIdList[i]) == -1){
          hash.push(this.pushIdList[i]);
        }
      }
      var obj = {};
      hash.map(function (e, item) {
         obj[e] = ''; 
      });   
      var arr = JSON.stringify(obj).replace(/\{|"|"|:|}/g,'');
      this.ruleForm.echoData = arr;
      // console.log(arr)
    },
    tabIndex (index) {
      this.currentIndex = index;

    },  
    //查看短信详情  
    detail(id,state) {
      this.$router.push({ name: "massinformationDetail",query:{id:id}});
      // this.blackDetails = true;
      // detailSms(id).then(res => {
      //   if(res.code === 200){
      //      this.remark = res.data.remark;
      //      this.messageTitle = res.data.messageTitle;
      //      this.messageContent = res.data.messageContent;
      //      this.receiverName = res.data.receiverName;
      //      this.receiverUsers = res.data.receiverUsers;
      //   }
      // })
    },
    //编辑短信
    editor(id,state){
       this.editorId = id;
       this.blackList = true;
       this.title = '编辑群发短信';
      detailSms(id).then(res => {
        if(res.code === 200){
           this.smsTheme = res.data.messageTitle;
           this.ruleForm.smsDesc = res.data.messageContent;
           this.smsReason = res.data.remark;
           res.data.receiverUsers.forEach((item) => {
            //  console.log(item)
             this.ruleForm.echoData += item.receiverName + '(' + item.telephone + ')' + ',';
            return
             
           })
           this.ruleForm.echoData = this.ruleForm.echoData.slice(0,this.ruleForm.echoData.length-1);
          //  console.log(this.ruleForm.echoData)
        }
      })
    },
    //取消
    cancelClick(){
      this.blackList = false;
      this.ruleForm.echoData = '';
    },
    //新增群发短信
    addNewSms(){
      this.blackList = true;
      this.title = '新增群发短信';
      this.smsTheme = '';
      this.ruleForm.smsDesc = '';
      this.smsReason = '';
      this.ruleForm.echoData = '';
    },
    //删除
    deleteSms(id){
      this.deleteCustomer = true;
      this.smsId = id;
    },
    sureDetele(){
      deleteSms(this.smsId).then(res => {
        if(res.code === 200){
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.deleteCustomer = false;
          this._getAllcustomer();
        }
      })
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
            obj.keywords = this.form.input;
            // console.log(typeof(this.form.input))
            obj.startTime = this.form.createTime[0];
            obj.status = this.form.customerStatus;
            obj.orderBy = '';
            obj.endTime = this.form.createTime[1];
         /*    obj.createTimeStart = this.form.createTime[0];
            obj.createTimeEnd = this.form.createTime[1]; */
            getSms(obj).then((res) => {
                this.tableData.total = res.data.total;
                this.dataArr= res.data.list;
            })
        },
      handleSizeChange(val){
        this.tableData.size = val;
            this._getAllcustomer()
      },
      handleSizeChange1(val){
        this.userData.size = val;
            
      },
      handleCurrentChange(val){
        this.tableData.currentPage = val;
            this._getAllcustomer()
      },
      handleCurrentChange1(val){
        this.userData.currentPage = val;
           
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
    selectedHighlight({ row, rowIndex }) {
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

    
      //新增发送短信
      blacklistAction(formName){  
        // if(!this.smsDesc){
        //   this.$message({
        //     message: '短信内容不能为空',
        //     type: 'warning'
        //   });
        //   return false
        // }
        // if(!this.echoData){
        //   this.$message({
        //     message: '短信接收人手机号不能为空',
        //     type: 'warning'
        //   });
        //   return false
        // }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // console.log('submit!');
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
        if(!this.ruleForm.echoData){
          return false
        }
        var reg = /^\d+$/g;
        var result = this.ruleForm.echoData.match(reg);
        // console.log(result)
        if(result == null){
          var arr = this.ruleForm.echoData.split(",");
          // console.log(arr)
          let receiverUsers = [];
        
        
        arr.forEach((item) => {
          if(item.match(reg) == null){
             var value = item.split('(')[0];
            // var value = item.replace(/[^0-9]/ig,"");
            // var reg = new RegExp('[\u4e00-\u9fa5]+$','g');
            // var card = item.match(/[\u4e00-\u9fa5]/g); //只能获取中文
            var card = item.split('(')[1].replace(')','');
            // if(!(/^1[3456789]\d{9}$/.test(card))){
            //   this.$message({
            //     message: '手机号码错误',
            //     type: 'warning'
            //   });
            //   return false
            // }

            // console.log(value)
            // console.log(card)
            const obj1 = {
              telephone: card,
              receiverId: '',
              receiverType: 1,
              receiverName: value
            }
            receiverUsers.push(obj1)
            return receiverUsers
          }else{
            // if(!(/^1[3456789]\d{9}$/.test(item))){
            //   this.$message({
            //     message: '手机号码错误',
            //     type: 'warning'
            //   });
            //   return false
            // }
            const obj1 = {
              telephone: item,
              receiverId: '',
              receiverType: 1,
              receiverName: ''
            }
            receiverUsers.push(obj1)
            return receiverUsers
          }
          
          
        })
        
          const obj = {
            messageTitle: this.smsTheme,
            messageContent: this.ruleForm.smsDesc,
            receiverUsers: receiverUsers,
            remark: this.smsReason
          }
          saveAndSendSms(obj).then(res => {
            if(res.code === 200){
              this.$message({
                message: '短信发送成功',
                type: 'success'
              });
              this._getAllcustomer();
              this.blackList = false;
            }
          })
        }else{
          var arr = this.ruleForm.echoData.split(",");
          let receiverUsers = [];
        
        
        arr.forEach((item) => {
          // if(!(/^1[3456789]\d{9}$/.test(item))){
          //     this.$message({
          //       message: '手机号码错误',
          //       type: 'warning'
          //     });
          //     return false
          //   }
          const obj1 = {
            telephone: item,
            receiverId: '',
            receiverType: 1,
            receiverName: ''
          }
          receiverUsers.push(obj1)
          return receiverUsers
          
        })
        
          const obj = {
            messageTitle: this.smsTheme,
            messageContent: this.ruleForm.smsDesc,
            receiverUsers: receiverUsers,
            remark: this.smsReason
          }
          saveAndSendSms(obj).then(res => {
            if(res.code === 200){
              this.$message({
                message: '短信发送成功',
                type: 'success'
              });
              this._getAllcustomer();
              this.blackList = false;
            }
          })
        }
        
        
      },
      //编辑并发送
      editorBlacklistAction(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // console.log('submit!');
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
        var reg = /^\d+$/g;
        var result = this.ruleForm.echoData.match(reg);
        // console.log(result)
        if(result == null){
          var arr = this.ruleForm.echoData.split(",");
          // console.log(arr)
          let receiverUsers = [];
        
        
        arr.forEach((item) => {
          if(item.match(reg) == null){
             var value = item.split('(')[0];
            // var value = item.replace(/[^0-9]/ig,"");
            // var reg = new RegExp('[\u4e00-\u9fa5]+$','g');
            // var card = item.match(/[\u4e00-\u9fa5]/g); //只能获取中文
            var card = item.split('(')[1].replace(')','');
            // if(!(/^1[3456789]\d{9}$/.test(card))){
            //   this.$message({
            //     message: '手机号码错误',
            //     type: 'warning'
            //   });
            //   return false
            // }

            // console.log(value)
            // console.log(card)
            const obj1 = {
              telephone: card,
              receiverId: '',
              receiverType: 1,
              receiverName: value
            }
            receiverUsers.push(obj1)
            return receiverUsers
          }else{
            // if(!(/^1[3456789]\d{9}$/.test(item))){
            //   this.$message({
            //     message: '手机号码错误',
            //     type: 'warning'
            //   });
            //   return false
            // }
            const obj1 = {
              telephone: item,
              receiverId: '',
              receiverType: 1,
              receiverName: ''
            }
            receiverUsers.push(obj1)
            return receiverUsers
          }
          
          
        })
        
          const obj = {
            id: this.editorId,
            messageTitle: this.smsTheme,
            messageContent: this.ruleForm.smsDesc,
            receiverUsers: receiverUsers,
            remark: this.smsReason
          }
          saveAndSendSms(obj).then(res => {
          if(res.code === 200){
            this.$message({
              message: '短信发送成功',
              type: 'success'
            });
            this._getAllcustomer();
            this.blackList = false;
            this.ruleForm.echoData = '';
          }
        })
        }else{
          var arr = this.ruleForm.echoData.split(",");
          let receiverUsers = [];
        
        
        arr.forEach((item) => {
          // if(!(/^1[3456789]\d{9}$/.test(item))){
          //     this.$message({
          //       message: '手机号码错误',
          //       type: 'warning'
          //     });
          //     return false
          //   }
          const obj1 = {
            telephone: item,
            receiverId: '',
            receiverType: 1,
            receiverName: ''
          }
          receiverUsers.push(obj1)
          return receiverUsers
          
        })
        
          const obj = {
            id: this.editorId,
            messageTitle: this.smsTheme,
            messageContent: this.ruleForm.smsDesc,
            receiverUsers: receiverUsers,
            remark: this.smsReason
          }
          saveAndSendSms(obj).then(res => {
          if(res.code === 200){
            this.$message({
              message: '短信发送成功',
              type: 'success'
            });
            this._getAllcustomer();
            this.blackList = false;
            this.ruleForm.echoData = '';
          }
        })
        }
      },
      //保存草稿
      savaDraft(formName){
        // if(!this.smsDesc){
        //   this.$message({
        //     message: '短信内容不能为空',
        //     type: 'warning'
        //   });
        //   return false
        // }
        // if(!this.echoData){
        //   this.$message({
        //     message: '短信接收人手机号不能为空',
        //     type: 'warning'
        //   });
        //   return false
        // }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // console.log('submit!');
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
        if(!this.ruleForm.echoData){
          return false
        }
        var reg = /^\d+$/g;
        var result = this.ruleForm.echoData.match(reg);
        // console.log(result)
        if(result == null){
          var arr = this.ruleForm.echoData.split(",");
          // console.log(arr)
          let receiverUsers = [];
        
        
        arr.forEach((item) => {
          if(item.match(reg) == null){
             var value = item.split('(')[0];
            // var value = item.replace(/[^0-9]/ig,"");
            // var reg = new RegExp('[\u4e00-\u9fa5]+$','g');
            // var card = item.match(/[\u4e00-\u9fa5]/g); //只能获取中文
            var card = item.split('(')[1].replace(')','');
            // if(!(/^1[3456789]\d{9}$/.test(card))){
            //   this.$message({
            //     message: '手机号码错误',
            //     type: 'warning'
            //   });
            //   return false
            // }

            // console.log(value)
            // console.log(card)
            const obj1 = {
              telephone: card,
              receiverId: '',
              receiverType: 1,
              receiverName: value
            }
            receiverUsers.push(obj1)
            return receiverUsers
          }else{
            // if(!(/^1[3456789]\d{9}$/.test(item))){
            //   this.$message({
            //     message: '手机号码错误',
            //     type: 'warning'
            //   });
            //   return false
            // }
            const obj1 = {
              telephone: item,
              receiverId: '',
              receiverType: 1,
              receiverName: ''
            }
            receiverUsers.push(obj1)
            return receiverUsers
          }
          
          
        })
        
          const obj = {
            messageTitle: this.smsTheme,
            messageContent: this.ruleForm.smsDesc,
            receiverUsers: receiverUsers,
            remark: this.smsReason
          }
          createOrUpdate(obj).then(res => {
            if(res.code === 200){
              this.$message({
                message: '保存草稿成功',
                type: 'success'
              });
              this._getAllcustomer();
              this.blackList = false;
            }
          })
        }else{
          var arr = this.ruleForm.echoData.split(",");
          let receiverUsers = [];
        
        
        arr.forEach((item) => {
          // if(!(/^1[3456789]\d{9}$/.test(item))){
          //     this.$message({
          //       message: '手机号码错误',
          //       type: 'warning'
          //     });
          //     return false
          //   }
          const obj1 = {
            telephone: item,
            receiverId: '',
            receiverType: 1,
            receiverName: ''
          }
          receiverUsers.push(obj1)
          return receiverUsers
          
        })
        
          const obj = {
            messageTitle: this.smsTheme,
            messageContent: this.ruleForm.smsDesc,
            receiverUsers: receiverUsers,
            remark: this.smsReason
          }
          createOrUpdate(obj).then(res => {
            if(res.code === 200){
              this.$message({
                message: '保存草稿成功',
                type: 'success'
              });
              this._getAllcustomer();
              this.blackList = false;
            }
          })
        }
      },
      //编辑并保存草稿
      editorSavaDraft(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // console.log('submit!');
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
        var reg = /^\d+$/g;
        var result = this.ruleForm.echoData.match(reg);
        // console.log(result)
        if(result == null){
          var arr = this.ruleForm.echoData.split(",");
          // console.log(arr)
          let receiverUsers = [];
        
        
        arr.forEach((item) => {
          if(item.match(reg) == null){
             var value = item.split('(')[0];
            // var value = item.replace(/[^0-9]/ig,"");
            // var reg = new RegExp('[\u4e00-\u9fa5]+$','g');
            // var card = item.match(/[\u4e00-\u9fa5]/g); //只能获取中文
            var card = item.split('(')[1].replace(')','');
            // if(!(/^1[3456789]\d{9}$/.test(card))){
            //   this.$message({
            //     message: '手机号码错误',
            //     type: 'warning'
            //   });
            //   return false
            // }

            // console.log(value)
            // console.log(card)
            const obj1 = {
              telephone: card,
              receiverId: '',
              receiverType: 1,
              receiverName: value
            }
            receiverUsers.push(obj1)
            return receiverUsers
          }else{
            // if(!(/^1[3456789]\d{9}$/.test(item))){
            //   this.$message({
            //     message: '手机号码错误',
            //     type: 'warning'
            //   });
            //   return false
            // }
            const obj1 = {
              telephone: item,
              receiverId: '',
              receiverType: 1,
              receiverName: ''
            }
            receiverUsers.push(obj1)
            return receiverUsers
          }
          
          
        })
        
          const obj = {
            id: this.editorId,
            messageTitle: this.smsTheme,
            messageContent: this.ruleForm.smsDesc,
            receiverUsers: receiverUsers,
            remark: this.smsReason
          }
          createOrUpdate(obj).then(res => {
            if(res.code === 200){
              this.$message({
                message: '保存草稿成功',
                type: 'success'
              });
              this._getAllcustomer();
              this.blackList = false;
              this.ruleForm.echoData = '';
            }
          })
        }else{
          var arr = this.ruleForm.echoData.split(",");
          let receiverUsers = [];
        
        
        arr.forEach((item) => {
          // if(!(/^1[3456789]\d{9}$/.test(item))){
          //     this.$message({
          //       message: '手机号码错误',
          //       type: 'warning'
          //     });
          //     return false
          //   }
          const obj1 = {
            telephone: item,
            receiverId: '',
            receiverType: 1,
            receiverName: ''
          }
          receiverUsers.push(obj1)
          return receiverUsers
          
        })
        
          const obj = {
            id: this.editorId,
            messageTitle: this.smsTheme,
            messageContent: this.ruleForm.smsDesc,
            receiverUsers: receiverUsers,
            remark: this.smsReason
          }
          createOrUpdate(obj).then(res => {
          if(res.code === 200){
            this.$message({
              message: '保存草稿成功',
              type: 'success'
            });
            this._getAllcustomer();
            this.blackList = false;
            this.ruleForm.echoData = '';
          }
        })
        }

      },
      sendSms(id){
        this.$confirm('是否发送短信?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          sendAndSendSms(id).then(res => {
           if(res.code === 200){
             this.$message({
              message: '短信发送成功',
              type: 'success'
            });
            this._getAllcustomer();
           }
         })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消待发送'
          });          
        });
         
      },
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
</style>

