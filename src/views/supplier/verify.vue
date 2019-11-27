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
                    <el-form-item label="审核状态：">
                        <el-col :span="23">
                            <el-select
                                class="el-select-width"
                                v-model="form.auditStatus"
                                placeholder="请选择"
                                @change="_getSupplieraudit(true)"
                            >
                                <el-option label="待审核" value="0"></el-option>
                                <el-option label="审核通过" value="1"></el-option>
                                <el-option label="审核未通过" value="2"></el-option>

                            </el-select>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                 <el-col :span="5">
                  <el-col>
                    <el-form-item label="关键词：">
                        <el-col :span="23">
                            <el-input v-model="form.keywords" clearable placeholder="请输入供应商名称/联系人等"></el-input>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small"  @click="_getSupplieraudit(true)">查询</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mcard">
      <el-row class="operate mbottom"></el-row>
      <el-table   :data="tableData"  border style="width: 100%" stripe>
        <el-table-column  type="index"  label="序号" align="center" width="55"></el-table-column>
        <el-table-column  prop="auditStatus"  label="状态" align="center">
          <template slot-scope="scope">
            {{scope.row.auditStatus == 0?'待审核':scope.row.auditStatus == 1?'审核通过':scope.row.auditStatus == 2?'审核未通过':''}}
          </template>
        </el-table-column>
        <el-table-column  prop="changeRemark"  label="审核说明" align="center"  width="100">
          <template slot-scope="scope">
            <!--<div class="txt_left">操作: {{scope.row.changeRemark}}</div>
            <div class="txt_left">审核人：</div>
            <div v-for="(detail,index) in scope.row.auditDetails" class="txt_left">{{index+1}}.{{detail.sysuserName}}{{detail.roleName?'('+detail.roleName+')':''}}
              <span v-if="scope.row.auditStatus==0&& detail.auditResult==0">待审核
                <el-button type="success" size="small" @click="editTaskUserView(detail.taskId)" style="padding: 3px 3px;">重新指派</el-button>
              </span>
              <span v-if="detail.auditResult==1">通过</span>
              <span v-if="detail.auditResult==2">未通过</span>
            </div>
            <div v-if="scope.row.auditDetails.length==0" class="txt_left">
              &lt;!&ndash;<el-button type="success" size="small" @click="addTaskUserView(scope.row.auditId)" style="padding: 3px 3px;">添加审核人</el-button>&ndash;&gt;
            </div>-->
            <div class="txt_left">{{scope.row.changeRemark}}</div>
          </template>
        </el-table-column>
        <el-table-column  prop="verifyRemark"  label="审核理由" align="center"  width="100">
        </el-table-column>
        <el-table-column  prop="supplierName"  label="供应商信息" align="center"  width="200">
          <template slot-scope="scope">
            <div class="txt_left">供应商名称：{{scope.row.formData.supplierName}}</div>
            <div class="txt_left">用户名：{{scope.row.formData.sysuser&&scope.row.formData.sysuser.sysuserName||''}}</div>
            <div class="txt_left">账号：{{scope.row.formData.sysuser&&scope.row.formData.sysuser.sysuserAccount||''}}</div>
            <div class="txt_left">性质：{{scope.row.formData.supplierNature}}</div>
            <div class="txt_left">管理员：{{ scope.row.formData.adminName||''}}</div>
          </template>
        </el-table-column>
        <el-table-column  prop="formData.oneCategory"  label="一级品类" align="center"></el-table-column>
        <el-table-column  prop="formData.twoCategory"  label="二级品类" align="center"></el-table-column>
        <el-table-column   label="联系人信息" align="center"  width="200">
          <template slot-scope="scope">
            <div class="txt_left">业务联系人：{{scope.row.formData.contacts[0].name}}</div>
            <div class="txt_left">固定电话：{{scope.row.formData.contacts[0].fixedPhone}}</div>
            <div class="txt_left">手机：{{scope.row.formData.contacts[0].telephone}}</div>
            <div class="txt_left">QQ：{{scope.row.formData.contacts[0].qq}}</div>
            <div class="txt_left">邮箱：{{scope.row.formData.contacts[0].email}}</div>
            <div class="txt_left">微信：{{scope.row.formData.contacts[1].wechat}}</div>
            <div class="txt_left">订单处理人手机：{{scope.row.formData.contacts[1].telephone}}</div>
            <div class="txt_left">订单处理人邮箱：{{scope.row.formData.contacts[1].email}}</div>
          </template>
        </el-table-column>
        <el-table-column  prop="name"  label="总经理信息" align="center"  width="200">
          <template slot-scope="scope">
            <div class="txt_left">总经理：{{scope.row.formData.contacts[2].name}}</div>
            <div class="txt_left">手机：{{scope.row.formData.contacts[2].telephone}}</div>
            <div class="txt_left">公司电话：{{scope.row.formData.contacts[2].fixedPhone}}</div>
            <div class="txt_left">传真：{{scope.row.formData.extend.fax}}</div>
            <div class="txt_left">地址：{{scope.row.formData.supplierAddress}}</div>
            <div class="txt_left">网址：{{scope.row.formData.supplierUrl}}</div>
          </template>
        </el-table-column>
        <el-table-column  prop="name"  label="主营商品" align="center"  width="150">
          <template slot-scope="scope">
            <div class="txt_left">自营品牌：{{scope.row.formData.selfProduct}}</div>
            <div class="txt_left">代理品牌：{{scope.row.formData.agentBrand}}</div>
            <div class="txt_left">主营产品：{{scope.row.formData.mainProduct}}</div>
          </template>
        </el-table-column>
        <el-table-column  prop="name"  label="付款信息" align="center"  width="200">
          <template slot-scope="scope">
            <div class="txt_left">开户名称：{{scope.row.formData.extend.bankCompany}}</div>
            <div class="txt_left">开户行：{{scope.row.formData.extend.bankName}}</div>
            <div class="txt_left">开户账号：{{scope.row.formData.extend.bankAccount}}</div>
            <div class="txt_left">税号：{{scope.row.formData.extend.taxNumber}}</div>
          </template>
        </el-table-column>
        <el-table-column  prop="settleType"  label="结账方式" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.formData.settleType ==0"> 月结 </div>
            <div v-if="scope.row.formData.settleType ==1"> 季度结算 </div>
            <div v-if="scope.row.formData.settleType ==2"> 年度结算 </div>
            <div v-if="scope.row.formData.settleType ==3"> 集采/批发 </div>
            <div v-if="scope.row.formData.settleType ==4"> 预付定金 </div>
           </template>
        </el-table-column>
        <el-table-column  prop="isWholesale"  label="一件代发" align="center" width="100">
          <template slot-scope="scope">
            {{scope.row.isWholesale == false?'不支持':'支持'}}
          </template>
        </el-table-column>
        <el-table-column   label="营业执照" align="center" width="140">
          <template slot-scope="scope">
            <div v-if="scope.row.formData.extend.businessLicense">
              <img :src="scope.row.formData.extend.businessLicense" alt class="img_size"
                   @click="open(scope.row.formData.extend.businessLicense,'营业执照')"/>
              <div>
                <el-button type="primary" size="small" @click="open(scope.row.formData.extend.businessLicense,'营业执照')">
                  点击查看大图
                </el-button>
              </div>
            </div>
            <div v-else>
              暂无
            </div>
          </template>
        </el-table-column>
        <el-table-column  label="一般纳税人资格证" align="center" width="140" >
          <template slot-scope="scope">
            <div v-if="scope.row.formData.extend.taxpayerQualification">
              <img :src="scope.row.formData.extend.taxpayerQualification" alt class="img_size"
                   @click="open(scope.row.formData.extend.taxpayerQualification,'一般纳税人资格证')"/>
              <div>
                <el-button
                        type="primary"
                        size="small"
                        @click="open(scope.row.formData.extend.taxpayerQualification,'一般纳税人资格证')"
                >点击查看大图
                </el-button>
              </div>
            </div>
            <div v-else>
              暂无
            </div>
          </template>
        </el-table-column>
        <el-table-column  prop="name"  label="品牌授权书" align="center" width="140">
          <template slot-scope="scope">
            <div v-if="scope.row.formData.extend.brandAuthUrl">
              <img :src="scope.row.formData.extend.brandAuthUrl" alt class="img_size"
                   @click="open(scope.row.formData.extend.brandAuthUrl,'品牌授权书')"/>
              <div>
                <el-button type="primary" size="small" @click="open(scope.row.formData.extend.brandAuthUrl,'品牌授权书')">
                  点击查看大图
                </el-button>
              </div>
            </div>
            <div v-else>
              暂无
            </div>
          </template>
        </el-table-column>
        <el-table-column  prop="name"  label="授权链" align="center" width="140">
          <template slot-scope="scope">
            <div v-if="scope.row.formData.extend.authorizationChain&&(/^[a-zA-Z]/.test(scope.row.formData.extend.authorizationChain,'授权链'))">
              <img :src="chain(scope.row.formData.extend)[0]" alt class="img_size"
                   @click="open(chain(scope.row.formData.extend),'授权链')"/>
              <div>
                <el-button
                        type="primary"
                        size="small"
                        @click="open(chain(scope.row.formData.extend),'授权链')"
                >点击查看大图
                </el-button>
              </div>
            </div>
            <div v-else>
              暂无
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center"  fixed="right"  width="150">
          <template slot-scope="scope">
            <!-- <div class="line-div"> -->

              <!--<div class="small-Idiv" style="justify-content: end;margin-left: 17px;"  @click="editor(scope.row.formData.supplierId,2)">
                <div class="i-div huishouzhan">
                  <img src="../../common/images/icon/编辑.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;">编辑</span>
              </div>-->
              <div class="small-Idiv" @click="detail(scope.row.auditId)" style="justify-content: end;" v-permit="'details:merchants'">
                <div class="i-div">
                  <img src="../../common/images/icon/查看详情.png" alt="" class="operation_img" >
                </div>
                <span>详情</span>
              </div>
              <div v-if="scope.row.auditStatus!=0" class="small-Idiv" @click="deleteAuditView(scope.row.auditId)" style="justify-content: end;" v-permit="'remove:merchants'">
                <div class="i-div huishouzhan">
                  <img src="../../common/images/icon/回收站.png" alt="" class="operation_img">
                </div>
                <span>删除</span>
              </div>
            <!-- </div> -->
            <!-- <div class="line-div"  v-show="scope.row.auditStatus==0"> -->

               <div class="small-Idiv" @click="_throughSupplieraudit(scope.row)" v-permit="'verify:check'"  style="justify-content: end;"
               v-show="scope.row.formData.adminId != null && scope.row.auditStatus==0">
                <div class="i-div">
                  <img src="../../common/images/icon/审核.png" alt="" class="operation_img">
                </div>
                <span>审核</span>
              </div>
              <div class="small-Idiv" @click="distribution(scope.row,false)" v-permit="'merchants:distribution'" style="justify-content: end;"
               v-show="scope.row.formData.adminId == null && scope.row.auditStatus==0">
                <div class="i-div">
                  <img src="../../common/images/icon/指派采购员.png" alt="" class="operation_img">
                </div>
                <span>分配</span>
              </div>
            <!-- </div> -->
          </template>
        </el-table-column>
    </el-table>
      <div class="pagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="form.current_page"
            :page-sizes="[10, 30, 50, 100]"
            :page-size="form.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="form.total_count">
            </el-pagination>
      </div>
      <!-- 审核按钮弹框 -->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <span>
          <el-row  v-if="form.radio != 3">
            <el-col :span="10">
               审核:<el-radio-group v-model="form.radio"  @change='choose'>
                      <el-radio :label="1">通过</el-radio>
                      <el-radio :label="2">不通过</el-radio>
                    </el-radio-group>
            </el-col>
            <!-- <el-col :span="12" class="distribution11" v-if='form.radio == "1"'>
              <span style="word-break:keep-all;  ">分配采购员：</span>
                <el-select v-model="form.user" clearable placeholder="请选择" style="width:300px">
                  <el-option
                    v-for="item in userOptions"
                    :key="item.sysuserId"
                    :label="item.sysuserName"
                    :value="item.sysuserId">
                  </el-option>
                </el-select>
            </el-col> -->
        </el-row>
          <el-input
            type="textarea"
            :rows="4"
            :placeholder="placeholder"
            style="margin-top: 20px;"
            v-model="form.reason">
          </el-input>
          <!-- <el-row  v-if="form.radio == 3" style="margin-top: 35px;">
            <el-col :span="12" class="distribution">
              <span style="word-break:keep-all;  ">上级领导审核：</span>
                <el-select v-model="value" clearable placeholder="请选择" style="width:300px">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-col>
        </el-row> -->
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="cancel" size="small">关 闭</el-button>
        </span>
      </el-dialog>

      <!-- 删除 -->
      <el-dialog
              title="删除"
              :visible.sync="deleteAuditDialog"
              width="30%"
      >
        <el-form :model="form"  label-width="100px">
          <el-form-item label="删除原因:">
            <el-input v-model="deleteRemark" type="textarea"></el-input>
          </el-form-item>
          <!--<el-form-item label="上级领导审核:">
              <el-select v-model="form.region" placeholder="请选择">
                <el-option label="销售总监" value="0"></el-option>
                <el-option label="采购经理" value="1"></el-option>
              </el-select>
          </el-form-item>-->
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="deleteAuditDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="deleteAudit()" size="small">确 定</el-button>
      </span>
      </el-dialog>
      <!-- 删除 -->

      <!-- 分配采购员 -->
    <el-dialog
      title="分配采购员"
      :visible.sync="people_dialog"
      width="30%">
      <span>
        <el-select v-model="form.user" clearable placeholder="请选择" style="width:300px">
          <el-option
            v-for="item in userOptions"
            :key="item.sysuserId"
            :label="item.sysuserName"
            :value="item.sysuserId">
          </el-option>
        </el-select>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="people_dialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="distribution('',true)" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配采购员 -->

      <!-- 指派审核人员 -->
    <el-dialog
      title="指派审核人员"
      :visible.sync="dialog_editTaskUser"
      width="30%">
      <span>
        <el-select v-model="taskUser.userId" clearable placeholder="请选择" style="width:300px">
          <el-option
            v-for="item in sysuserList"
            :key="item.sysuserId"
            :label="item.sysuserName"
            :value="item.sysuserId">
          </el-option>
        </el-select>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialog_editTaskUser = false" size="small">取 消</el-button>
        <el-button type="primary" @click="editTaskUserTo('',true)" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 指派审核人员 -->

      <!-- 点击查看大图弹窗 -->
      <el-dialog
              :title="textName"
              :visible.sync="picture"
              width="40%"
        >
         <span>
          <div style="width: 100%;height: 578px;overflow: auto;">
            <img :src="item" alt v-for="item in img" :key="item" class="big_img" />
          </div>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="picture = false" size="small">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getSupplieraudit ,deleteantarky , throughSupplieraudit , getAlluser , bindSupplieruser , supplierAudit, editTaskUser, addTaskUser} from '@/api/supplier/index';
import { getAdminUserPage } from '@/api/permissions/index'
import { getBuyer } from '@/api/product/index'
import { auditDelete} from '@/api/customer/index'
export default {
  data () {
    return {
      textName: '',
      form: {
        current_page:1,
        page_size:10,
        total_count:0,
        auditStatus:'0',
        keywords:'',
        supplierId:'',
        reason:'',
        Status:'1',
        radio:1,
        auditId:'',
        user:'', //分配的采购员，
        taskId:'',
        supplierCategory:''//品类名字
      },
      people_dialog:false, // 控制分配弹窗
      userOptions:[],
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      blacklistState:false, //黑名单
      dialogVisible:false, //操作弹窗
      picture:false,  //查看大图弹窗
      placeholder:'请输入审核通过理由',
      tableData:[],
      img:[],
      deleteId:"",
      deleteRemark:"",
      deleteAuditDialog:false,
      dialog_editTaskUser:false,
      taskUser:{
        taskId:'',
        userId:'',
        auditId:'',
        add:false
      },
      sysuserList:[]
    }
  },
  mounted () {
    this.startLoading() //加载中loading
    this._getSupplieraudit()
    this._getAlluser()
    //this._loadSysuserList()
  },
  computed: {
  },
  methods: {
    editTaskUserView(taskId){
      this.taskUser.taskId = taskId;
      this.dialog_editTaskUser = true;
      this.taskUser.add = false;
    },
    addTaskUserView(auditId){
      this.taskUser.auditId = auditId;
      this.taskUser.add = true;
      this.dialog_editTaskUser = true;
    },
    editTaskUserTo(){
      let taskId = this.taskUser.taskId;
      let userId = this.taskUser.userId;
      let auditId = this.taskUser.auditId;
      console.log("add is "+this.taskUser.add)
      if(this.taskUser.add){
        addTaskUser(auditId, userId).then(res=>{
          if(res.code == 200){
            this.$message({
              message: res.message,
              type: 'success'
            });
            this.dialog_editTaskUser = false
            this._getSupplieraudit()
          }
        })
      }else {
        editTaskUser(taskId, userId).then(res=>{
          if(res.code == 200){
            this.$message({
              message: res.message,
              type: 'success'
            });
            this.dialog_editTaskUser = false
            this._getSupplieraudit()
          }
        })
      }
    },
    deleteAuditView(auditId){
      this.deleteId = auditId;
      this.deleteRemark = '';

      this.deleteAuditDialog = true;
    },
    deleteAudit(){
      let params = {}
      params.auditId = this.deleteId;
      params.remark = this.deleteRemark;
      auditDelete(params).then(res=>{
        if(res.code == 200){
          this.$message({
            message: res.message,
            type: 'success'
          });
          this.deleteAuditDialog = false
          this._getSupplieraudit()
          this._getAlluser()
        }
      })

      this.deleteAuditDialog = false;
    },
    //分配采购员
    distribution(data,type){
      if(data){
        this.people_dialog = true
        this.form.auditId = data.auditId
        this.form.supplierId = data.formData.supplierId
      }
      if(type){
        let obj = {}
        obj.adminId = this.form.user
        obj.auditId = this.form.auditId
        obj.supplierId = this.form.supplierId
        supplierAudit(obj).then(res => {
          if(res.code == 200){
            this.$message({
              message: '分配成功',
              type: 'success'
            });
            this.form.auditId = ""
            this.people_dialog = false
            this._getSupplieraudit()
          }
        })
      }
    },
    _loadSysuserList(){
      let obj = {}
      obj.current_page = 1
      obj.pageSize = 0
      obj.sysuserType = 0
      getAdminUserPage(obj).then(res => {
        this.sysuserList = res.data.list
      })
    },
    //获取采购员列表
    _getAlluser(){
      getAlluser().then(res => {
        this.userOptions = res.data.list
        this.form.user = res.data.list[0].sysuserId
      })
    },
    blacklistSure(){

    },
    // add() {//新增不需要
    //   this.$router.push({ name: "SupplierAddfiles3" });
    // },

    editor(id,state) {
      this.$router.push({ name: "SupplierAddfiles3", query: { id: id ,state:state } });
    },
        //黑名单
    blacklist(id){
      this.blacklistState = true
      this.supplierId = id
      this.reason = ''
      this.title = '黑名单'
      this.placeholder = '请输入处理原因'
      this.state = 1
    },
    chain(obj){
      if(!obj.authorizationChain){
        obj.authorizationChain = '';
      }
      let img = obj.authorizationChain.split('<:>');
      return  img;
    },
    //点击打开图片
    open(url, name) {
      this.img = [];
      this.picture = true;
      if(url instanceof Array){
        this.img = url
      }else {
        this.img.push(url);
      }
      this.textName = name
    },
    //取消删除
      cancel(){
        this.form.supplierId = ''
        this.form.reason = ''
        this.form.radio=1
        this.dialogVisible = false
      },
      //确定按钮
      sureDelete(){
          throughSupplieraudit(this.form,this.form.radio).then(res => {
            if(res.code ==200){
              this.form.supplierId = ''
              this.form.reason = ''
              this.form.radio = 1
              this.form.auditId = ""
              this.dialogVisible = false
              this.$message({
                message: res.message,
                type: 'success'
              });
              this._getSupplieraudit()
            }
          })
      },
      handleSizeChange(val){
        this.form.page_size = val
        this._getSupplieraudit()
      },
      handleCurrentChange(val){
        this.form.current_page = val
        this._getSupplieraudit()
      },
      _getSupplieraudit(slt){
        if(slt){
          this.form.current_page = 1
        }
        this.form.auditId = ""
        this.form.radio = 1
        getSupplieraudit(this.form).then(res => {
          this.tableData = res.data.list
          this.form.total_count = res.data.total
          this.endLoading() //取消加载中loading
        })
      },
      choose(val){
        if(val == 1){
           this.placeholder = '请输入审核通过理由'
        }else if(val == 2){
          this.placeholder = '请输入审核不通过理由'
        }
        this.form.radio = val
      },
      //审核通过
      _throughSupplieraudit(val,type){
        this.form.user = this.userOptions[0].sysuserId
        this.form.auditId = val.auditId
        this.form.supplierId = val.formData.supplierId
        this.form.taskId  = val.currentAuditDetail && val.currentAuditDetail.taskId || "";
        if(this.form.taskId==''){
          this.$message.error("无审核权");
          return;
        }
        this.dialogVisible = true
      },
      detail(auditId) {
      this.$router.push({ name: "SupplierAuditDetail", query: { auditId} });
    },

  },
  components: {
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

.small-Idiv {
  float: left;
  width: 45%;
  padding-top: 10px;
}
.small-Idiv:nth-of-type(odd) {
  margin-left: 4%;
}
.i-div{
  cursor: pointer;
  height:32px;
  border-radius:6px;
}
.line-div{
    display: flex;
    justify-content: left;
  margin-top: 5px;
}
.line{
  display: flex;
    justify-content: flex-start;
}
.fuzhi{
  background:rgba(229,162,75,1);
}
 .huishouzhan{
   background:rgba(247,108,110,1);
 }
 .el-select-width {
    max-width: 300px;
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
  .el-select{
    width: 100% !important;
  }
  .img_size{
    width: 118px;
    height: 170px;
  }
  .small_top{
    margin-top: 10px;
  }
  .distribution{
    display: flex;
    align-items: center;
    position: relative;
    top: -12px;
  }
  .big_img {
  width: 100%;
  height: 546px;
}

</style>
