<template>
  <div class="margin">
    <div class="mcard top_div">
      <div class>
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <el-page-header @back="back" :content="text"></el-page-header>
          </div>
        </div>
      </div>
    </div>
    <div class="mcard bor_div">
      <div class="title">额度发放审核配置</div>
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="150px"
          class="demo-ruleForm"
        >
          <el-form-item v-show="relation" :label="labelTit" prop="merchantId">
            <el-select v-show="agencyS" v-model="ruleForm.merchantId" clearable  placeholder="请选择" size="small" @change="merchantName">
              <el-option
                v-for="item in dealersArr"
                :key="item.agencyId"
                :label="item.agencyName"
                :value="item.agencyId"
              ></el-option>
            </el-select>
            <el-select v-show="customerS" v-model="ruleForm.merchantId" clearable  placeholder="请选择" size="small" @change="merchantName">
              <el-option
                v-for="item in dealersArr"
                :key="item.customerId"
                :label="item.customerName"
                :value="item.customerId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="额度发放审核：" prop="auditSwitch">
            <el-radio-group v-model="ruleForm.auditSwitch">
              <el-radio label="Y">需要审核</el-radio>
              <el-radio label="N">不需要审核</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="账号类型：" prop="accountIds">
            <el-checkbox-group v-model="ruleForm.accountIds" @change="ckeokfun">
              <el-checkbox
                v-for="item in checkList"
                :label="item.id"
                :key="item.id"
                :disabled="item.show"
              >{{item.accountName}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="审核模式：" prop="auditMode">
            <el-radio-group v-model="ruleForm.auditMode">
              <el-radio label="1">顺序审核</el-radio>
              <el-radio label="2">一票审核</el-radio>
              <el-radio label="3">全部审核</el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-for="(item,index) in ruleForm.settingList" :key="index">
            <div class="line" style="margin-left: 3%;"></div>
            <div class="dele_div">
              <div class="dete_icon" @click="deterecord(index)" v-show="hidd">
                <i class="iconfont icon-shanchu"></i>
                <span>删除此记录</span>
              </div>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="额度管理人：" required>
                    <el-input
                      readonly
                      v-model="item.quotaAdminUserName"
                      placeholder="请选择额度管理人"
                      size="small"
                    ></el-input>
                    <div class="pos" @click="selectUser(2,item)"></div>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="额度发放人：" required>
                    <el-input
                      readonly
                      v-model="item.quotaGrantUserName"
                      placeholder="请选择额度管理人"
                      size="small"
                    ></el-input>
                    <div class="pos" @click="selectUser(3,item)"></div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="额度：" prop="amountType" >
                <div class="lines_div">
                  <el-radio-group v-model="item.amountType" @change="amountTypeChange">
                    <el-radio :label="0" v-if="index < 1">不限</el-radio>
                    <el-radio :label="1">自定义</el-radio>
                  </el-radio-group>
                  <span class="tip" v-if="item.amountType  == 0">
                    <i class="iconfont icon-tip"></i> 您未限定审核额度，请定期关注您商城额度的使用情况，避免造成额度使用过大给您带来不必要的压力。
                  </span>
                  <div v-if="item.amountType  == 1" class="ing_div">
                    <el-input
                      v-model="item.amountStart"
                      style="max-width:80px"
                      size="small"
                      placeholder="请输入"
                    ></el-input>
                    <span> - </span>
                    <el-input
                      style="max-width:80px"
                      v-model="item.amountEnd"
                      size="small"
                      placeholder="请输入"
                    ></el-input>元
                  </div>
                </div>
              </el-form-item>
              <div
                :class="index==0?'btm_divtop btm_div':'btm_div'"
                v-for="(val,index2) in item.auditRoleList"
                :key="index2"
              >
                <el-form-item
                  label="部门："
                  class="department1"
                  @change="select(val, 'organize')"
                  required
                >
                  <treeselect
                    style="width:218px"
                    :options="options"
                    search-nested
                    placeholder="请选择"
                    v-model="val.organizeId"
                    @select="_handleSelect($event, index, index2, true)"
                  />
                  <span class="span_red" v-show="val.showOrgan">请选择部门</span>
                </el-form-item>
                <el-form-item label="审核人：" required>
                  <el-select v-model="val.userId" @change="select(val, 'user')" size="small">
                    <el-option
                      v-for="(it,ind) in userSelect[index][index2]"
                      :key="ind"
                      :label="it.sysuserName"
                      :value="it.sysuserId"
                    ></el-option>
                  </el-select>
                  <span class="span_red" v-if="val.show">请选择审核人</span>
                </el-form-item>
                <!--<el-form-item label="审核人：">
                  <el-select
                    v-model="val.roleId"
                    placeholder="请选择"
                    size="medium"
                    @change="select(val)"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.roleId"
                      :label="item.roleName"
                      :value="item.roleId"
                    ></el-option>
                  </el-select>
                  <span class="span_red" v-if="val.show">请选择审核人</span>
                </el-form-item>-->
                <el-form-item label="审核权限：" label-width="150px" required>
                  <el-radio-group v-model="val.permission" @change="select(val,'permission')">
                    <el-radio style="margin:0px 5px;" :label="1">提交审批</el-radio>
                    <el-radio style="margin:0px 5px;" :label="2">初级审批</el-radio>
                    <el-radio style="margin:0px 5px;" :label="3">继续审批</el-radio>
                    <el-radio style="margin:0px 5px;" :label="4">终极审批</el-radio>
                  </el-radio-group>
                  <span class="span_red" v-if="val.showradio">请选择审核权限</span>
                </el-form-item>
                <span
                  class="add"
                  v-if="index2 == item.auditRoleList.length-1"
                  @click="addRole(item.auditRoleList, index)"
                >
                  <i class="iconfont icon-add"></i>
                  <span class="role1">增加</span>
                </span>
                <span
                  class="add"
                  v-if="index2 >= 1"
                  @click="deleteRole(index2 , item.auditRoleList)"
                >
                  <i class="iconfont icon-del"></i>
                  <span class="role1">删除</span>
                </span>
              </div>
            </div>
          </div>
          <div class="line" style="margin-left: 3%;"></div>
          <div class="add_div">
            <el-button type="primary" size="small" @click="addsales" v-show="showBtn">新增</el-button>
          </div>
        </el-form>
        <div class="btn_div">
          <el-button type="danger" size="small" @click="resert">重 置</el-button>
          <el-button type="primary" size="small" @click="submit">确 定</el-button>
        </div>
      </div>
    </div>

    <!-- 用户列表弹框 -->
    <el-dialog :visible.sync="dialogGoodsVisible" width="80%">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">公司部门</h4>
              <div class="search-base">
                <el-row>
                  <el-col :span="7">
                    <el-col :span="22">
                      <el-col>
                        <el-form-item label="部门:">
                          <treeselect
                            style="width:300px"
                            :options="superiorArr"
                            search-nested
                            placeholder="请选择上级组织架构"
                            v-model="ruleForm.organizeId"
                            @input="selectUser(4)"
                          />
                        </el-form-item>
                      </el-col>
                    </el-col>
                  </el-col>
                  <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small" @click="selectUser(4)">搜索</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">用户列表</h4>
              <div style="margin: 0 20px 20px 0;">
                <el-table
                  :data="tableData"
                  stripe
                  style="width: 100%"
                  border
                  ref="multipleTable"
                  @select="choose"
                  @select-all="choose"
                  @selection-change="dialogCheckChange"
                >
                  <el-table-column type="selection" label="选择" align="center" width="55"></el-table-column>
                  <el-table-column label="部门编号" align="center" prop="organizeId"></el-table-column>
                  <el-table-column label="部门" align="center" prop="organizeName"></el-table-column>
                  <el-table-column label="工号" align="center" prop="sysuserId"></el-table-column>
                  <el-table-column label="姓名" align="center" prop="sysuserName"></el-table-column>
                  <el-table-column label="职位" align="center" prop="position"></el-table-column>
                </el-table>
                <!--
                <div class="pagination" style="text-align: right; margin-top: 20px;">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="formTable.current_page"
                    :page-sizes="[10, 30, 50, 100]"
                    :page-size="formTable.page_size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="formTable.total_count"
                  ></el-pagination>
                </div>
                -->
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogGoodsVisible =false" size="small">取 消</el-button>
        <el-button type="danger" @click="goodsDelivery" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { findAmountAuditByType, updateAmountAudit , getMerchantName } from "@/api/systemsettings/index";
import { throttleTipPop } from "@/utils/throttle";
import { getChildNodes, AmountAuditType , quotaSettingfindById , quotaSettingUpdate } from "@/api/systemsettings/index";
import { getRole,getAllOrganizational } from "@/api/permissions/index";
import { getAllMenu, getidMenu, getUserList, findByPage , saveForm, updateForm, deleteRole,  createatreeMenu, addMune,  editorMune, deletedMenu } from "@/api/creditmanage/index";
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import { getAgency } from "@/api/apply/index";
import { accountType , getAllcustomer } from "@/api/customer/index";

export default {
  name: "SelfSetting",
  components: { Treeselect },
  data() {
    return {
      labelTit:"经销商账号：",
      relation:false,
      agencyS:false,
      customerS:false,
      hidd:true,
      showBtn:true,
      checkList:[],
      text: "",
      state: true, //通过验证
      small_rmb: "",
      big_rmb: "",
      dialogGoodsVisible:false,
      superiorArr:[],// 上级部门
      tableData:[],
      ruleForm: {
        settingList: [],
        merchantId: "",
        auditSwitch: "Y",
        auditMode: "",
        accountIds: [],
        id: "",
        lines: "1",
        organizeId:'',
      },
      rules: {
        merchantId:[{ required: false, message: '请选择经销商账号', trigger: 'change' }],
        auditSwitch:[{ required: true, message: '请选择额度发放审核', trigger: 'change' }],
        accountIds:[{ required: true, message: '请选择账号类型', trigger: 'change' }],
        auditMode:[{ required: true, message: '请选择审核模式', trigger: 'change' }],
      },
      dealersArr:[], //经销商
      num:'',
      distinguish:'',
      //审核人列表
      userSelect:[],
      //所有部门
      options:[],
      //首个部门
      firstOrganize:'',
      map:{},
      index: "",
      userId:'',
      userName:'',
      val:''
    };
  },
  created() {
    this.getMerchantName()
    //this._getRole();

    this._getAllOrganizational();
    // this._findAmountAuditByType();
    this._text();
   
    this.accountType();
    this.getAllMenu();
    if(this.$route.query.id){
      this.quotaSettingfindById(this.$route.query.id)
    }
  },
  methods: {
    async getMerchantName(){
      const  { data }  = await getMerchantName()
      console.log(data)
        this.ruleForm.merchantId = ''
        if( data.platformType == 0 ){
          // 总站后台(放经销商)
          this.relation = true 
          this.labelTit = "经销商账号："
          this.agencyS = true
          this.customerS = false
          this.getAgency();
        }else if( data.platformType == 1 ){
           // 经销商后台（放客户）
           this.relation = true 
           this.agencyS = false
           this.customerS = true
           this.labelTit = "客户账号："
           this.getCustomer();
        }else if( data.platformType == 2 ){
           // 项目后台（不用选人）
           this.relation = false 
           
        }
     },
    //获取详情
    async quotaSettingfindById(id){
      const { data } = await quotaSettingfindById(id)
      console.log(data)
      data.settingList = data.quotaAuditSettingList
      this.ruleForm = data
      this.ruleForm.auditMode = JSON.stringify(data.auditMode);
      let def = this.firstOrganize||'1';
      this.showUserList({organizeId:def}, this.ruleForm.settingList.length-1, 0);
    },
    async getAllMenu(){
      const res = await getAllMenu()
      var data=[]
      data[0] =  res.data
      this.transleteData1(data, this.superiorArr);
      this.IterationDelateMenuChildren1(this.superiorArr);
      this.ruleForm.organizeId = this.superiorArr[0].id
    },
    //账号类型选择
    ckeokfun(val) {
      if (val.length) {
        val.forEach(item => {
          if (item == 0) {
            this.ruleForm.accountIds = [];
            this.ruleForm.accountIds.push(0);
            this.checkList.forEach(msg => {
              if (msg.id != 0) {
                msg.show = true;
              }
            });
          }
        });
      } else {
        this.checkList.forEach(element => {
          element.show = false;
        });
        this.$forceUpdate()
      }
    },
    // 选择用户列表
    selectUser(index,val) {
       if( index == 1 ){
          this.distinguish = '1'
       }else if( index == 2 ){
          this.distinguish = '2'
       }else if( index == 3 ){
          this.distinguish = '3'
       }
       if(val){
         this.val = val
       }
       this.dialogGoodsVisible = true
       let data = {}
       data.organizeId = this.ruleForm.organizeId
       findByPage(data).then(res => {
          this.tableData = res.data
       });
    },
     // 弹框确定选择用户
     goodsDelivery() {
           if(this.distinguish == '2'){
            this.val.quotaAdminUserId = this.userId
            this.val.quotaAdminUserName  = this.userName
           }else if(   this.distinguish == '3' ){
             this.val.quotaGrantUserId = this.userId
            this.val.quotaGrantUserName  = this.userName
           }
        // if(   this.distinguish == '1' ){
        //     this.formSubmit.adminUserId = this.userId
        //     this.formSubmit.adminUserName = this.userName
        // }else if(   this.distinguish == '2' ){
        //     this.formSubmit.quotaAdminUserId = this.userId
        //     this.formSubmit.quotaAdminUserName = this.userName
        // }else if(   this.distinguish == '3' ){
        //     this.formSubmit.quotaGrantUserId = this.userId
        //     this.formSubmit.quotaGrantUserName = this.userName
        // }
        this.dialogGoodsVisible = false
    },
    // 经销商账户
    async getAgency() {
      let obj = {
        current_page: 1,
        page_size: 0
      };
      const { data } = await getAgency(obj);
      this.dealersArr = data.list;
      this.dealersArr.unshift({
        agencyName:'全部',
        agencyId:''
      })
    },
    // 客户账号
     async getCustomer() {
      let obj = {
        pageNum: 1,
        pageSize: 0
      };
      const { data } = await getAllcustomer(obj);
      this.dealersArr = data.list;
      this.dealersArr.unshift({
        customerName:'全部',
        customerId:''
      })
    },
    //账号类型
    async accountType() {
      let obj = {
        pageNum: 1,
        pageSize: 0
      };
      const { data } = await accountType(obj);
      data.list.unshift({
        accountName: "不限",
        id: 0
      });
      this.checkList = data.list;
      this.checkList.forEach(item => {
        item.show = false;
      });
    },
    //获取部门id
    async _handleSelect(val, index, index2, clear=false){
      let $this = this;
      if(typeof $this.userSelect[index] == 'undefined'){
        $this.userSelect[index] = [];
      }
      if(!this.userSelect[index]){
        $this.userSelect[index] = [];
      }
      if(!this.userSelect[index][index2]){
        $this.userSelect[index][index2] = [];
      }
      if(clear){
        $this.ruleForm.settingList[index].auditRoleList[index2].userId=null;
        this.verifyRequire();
      }
      if(true){
        const organizeId = val.id
        if(!organizeId)return ;
        if(!this.map[organizeId])this.map[organizeId] = [];
        if(this.map[organizeId].length==0){
          const res = await getChildNodes(organizeId)
          if(res.code === 200){
            $this.userSelect[index][index2] = res.data;
            this.map[organizeId]=res.data;
            let userList = $this.userSelect[index];
            $this.userSelect[index] = [...userList];
            $this.userSelect = [...$this.userSelect];
          }
        }else {
          $this.userSelect[index][index2] = this.map[organizeId];
          let userList = $this.userSelect[index];
          $this.userSelect[index] = [...userList];
          $this.userSelect = [...$this.userSelect];
        }
      }else {

      }
    },
    _getAllOrganizational() {
      getAllOrganizational().then(res => {
        let arr = [];
        arr.push(res.data);
        this.transleteData(arr, this.options);
        //构建树形菜单
        this.IterationDelateMenuChildren(this.options);
        if(this.options){
          this.firstOrganize = this.options[0].value;
        }
      });
    },
     _text() {
      if (this.$route.query.id) {
        this.text = "审核配置>额度发放审核>编辑";
      } else {
        this.text = "审核配置>额度发放审核>新增";
        let def = this.firstOrganize||'1';
        this.ruleForm.settingList.push(
          {
          amountType:1,
          amountStart:'',
          amountEnd:'',
          quotaGrantUserId:'',
          quotaGrantUserName:'',
          quotaAdminUserId:'',
          quotaAdminUserName:'',
          auditRoleList:[
            {
              roleId:'',
              userIds:[],
              permission:'',
              show:false,
              showradio:false,
              showOrgan:false,
              organizeId:def,
              organizeName:'',
            },
          ],
          sortOrder: this.ruleForm.settingList.length
        }
      );
      this.userSelect.push([]);
      this.showUserList({organizeId:def}, this.ruleForm.settingList.length-1, 0);
      }
    },
    //根据部门，下标触发用户列表
    showUserList(organize, index, index2){
      let obj={
        id:organize.organizeId,
        value:organize.organizeId,
        label:"label",
      }
      this._handleSelect(obj,index, index2);
    },
    transleteData(data, arr) {
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
          this.transleteData(item.childNodes, msg.children);
        }
        arr.push(msg);
      });
      return arr;
    },
    IterationDelateMenuChildren(arr) {
      if (arr.length) {
        for (let i in arr) {
          if (arr[i].children.length) {
            this.IterationDelateMenuChildren(arr[i].children);
          } else {
            delete arr[i].children;
          }
        }
      }
      return arr;
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
          this.transleteData(item.childNodes, msg.children);
        }
        arr.push(msg);
      });
      return arr;
    },
    IterationDelateMenuChildren1(arr) {
      if (arr.length) {
        for (let i in arr) {
          if (arr[i].children.length) {
            this.IterationDelateMenuChildren(arr[i].children);
          } else {
            delete arr[i].children;
          }
        }
      }
      return arr;
    },
    //删除此记录
    deterecord(index){
      this.ruleForm.settingList.splice(index,1)
    },
    // 表格选择单选
    dialogCheckChange(row){
       if (row.length === 0) {
         this.selectioned = null
       }else{
        this.userId = row[0].sysuserId
        this.userName = row[0].sysuserName
       }
    },
    merchantName(val){
      if(  this.agencyS  ){
        this.dealersArr.forEach(item => {
          if(val == item.agencyId){
            this.ruleForm.merchantName = item.agencyName
          }
        })
      }
      if(  this.customerS  ){
        this.dealersArr.forEach(item => {
          if(val == item.customerId){
            this.ruleForm.merchantName = item.customerName
          }
        })
      }
    
    },
    // 弹框表格的选择
    choose (selection, row){
        this.$refs.multipleTable.clearSelection()
          if (selection.length === 0) { // 判断selection是否有值存在
            return
          }
          if (row) {
            this.selectioned = row
            this.$refs.multipleTable.toggleRowSelection(row, true)
         }
         if( row.length ){
            this.userId = row[0].sysuserId
            this.userName = row[0].sysuserName
         }
    },
    //新增
    addsales(){
      let def = this.firstOrganize||'1';
      this.ruleForm.settingList.push(
        {
        amountType:1,
        amountStart:'',
        amountEnd:'',
        quotaGrantUserName:'',
        quotaAdminUserName:'',
        auditRoleList:[
          {
            roleId:'',
            userIds:[],
            permission:'',
            show:false,
            showradio:false,
            showOrgan:false,
            organizeId:def,
            organizeName:'',
          },
        ],
        sortOrder: this.ruleForm.settingList.length
      }
      );
      this.userSelect.push([]);
      this.showUserList({organizeId:def}, this.ruleForm.settingList.length-1, 0);
    },
    select(val, type='') {
      console.log(val, type)
      if(type=='permission'){
        val ? (val.showradio = false) : "";
      }else if (type=='user') {
        val ? (val.show = false) : "";
      }else if (type=='organize') {
        val ? (val.showOrgan = false) : "";
      }
    },
    //查询数据
    async _findAmountAuditByType() {
      let $this = this;
      let { data } = await findAmountAuditByType(AmountAuditType.FINANCIAL_PAYMENT);
      this.ruleForm.enable = data.enable ? "0" : "1";
      this.ruleForm.id = data.id;
      this.ruleForm.auditMode = JSON.stringify(data.auditMode);
      let userSelect = [];
      data.settingList.forEach((val, index1) => {
        userSelect.push([]);

        val.amountType = JSON.stringify(val.amountType);
        val.auditRoleList.forEach(item => {
          if(!userSelect[index1]){
            userSelect[index1] = [];
          }else {
            userSelect[index1].push([]);
          }

          val.show = false; //控制审核人判断
          val.showradio = false; // 控制审核权限判断
          val.showOrgan = false; // 控制审核权限判断
          item.permission = JSON.stringify(item.permission);

        });
      });
      this.userSelect = [...userSelect];
      this.ruleForm.settingList = data.settingList;

      $this.ruleForm.settingList.forEach((val, index1, array1)=>{
        val.auditRoleList.forEach((value, index2, array2) => {
          $this.showUserList(value,index1,index2);
        });
      })
    },
    //重置
    resert() {
      this._findAmountAuditByType();
    },
    verifyRequire(){
      this.ruleForm.settingList.forEach(item => {
        item.auditRoleList.forEach((val,index) => {
          val.organizeId ? (val.showOrgan = false) : (val.showOrgan = true);
          val.userId ? (val.show = false) : (val.show = true);
          val.permission ? (val.showradio = false) : (val.showradio = true);
          val.sortOrder = index;
        });
      });
      this.ruleForm.settingList = [...this.ruleForm.settingList]
      let arr = this.ruleForm.settingList;
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].auditRoleList.length; j++) {
          if (
                  arr[i].auditRoleList[j].show ||
                  arr[i].auditRoleList[j].showradio||arr[i].auditRoleList[j].showOrgan
          ) {
            throttleTipPop(this, "error", "请填写完整信息");
            return true;
          }
        }
      }
      return false;
    },
    async submit() {
      let obj = JSON.parse(JSON.stringify(this.ruleForm));
      if(!this.$route.query.id){
        delete obj.id
      }
      this.$refs.ruleForm.validate(async valid => {
          if (valid) {
            obj.enable == "0" ? (obj.enable = true) : (obj.enable = false);
            if(this.verifyRequire())return true;
            obj.quotaAuditSettingList = obj.settingList
            let data = await quotaSettingUpdate(obj);
            if (data.code == 200) {
              throttleTipPop(this, "success", "操作成功");
              this.$router.go(-1)
            }
          } else {
            throttleTipPop(this, "error", "请填写完整信息");
            return false;
          }
        });
    },
    //增加审核
    addRole(data, index) {
      let def = this.firstOrganize||'1';
      data.push({
        permission: "",
        roleId: "",
        roleName: "",
        sortOrder: 0,
        remark: "",
        show: false,
        showradio: false,
        showOrgan: false,
        organizeId:def,
        organizeName:'',
      });
      this.showUserList({organizeId:def},index,data.length-1);
    },
    //删除审核
    deleteRole(val, data) {
      data.splice(val, 1);
    },
    _getRole() {
      let obj = {};
      obj.currentPage = 1;
      obj.size = 0;
      getRole(obj).then(res => {
        this.options = res.data.list;
      });
    },
    amountTypeChange(val){
       if( val == 0 ){
           this.showBtn = false
       }else{
          this.showBtn = true
       }
    },
    back() {
      this.$router.go(-1);
    }
  },
  watch:{
    'ruleForm.settingList'(val){
       if( val.length == 1 && this.ruleForm.auditSwitch == "Y" ){
         this.hidd = false
       }else{
         this.hidd = true
       }
    },
    'ruleForm.auditSwitch'(val){
        if( val == "Y" &&  this.ruleForm.settingList.length==1 ){
            this.hidd = false
        }else{
           this.hidd = true
        }  
    },
    'ruleForm.settingList'(val){
       val.forEach(data =>{
         if( data.amountType == 1 ){
           this.showBtn = true
         }else{
           this.showBtn = false
         }
       })
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.form-wrapper {
  margin-top: 30px;
  width: 600px;
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
}
.margin {
  // margin-top: 0 !important;
  // padding-left: 0 !important;
  // border: 1px solid rgba(214, 222, 239, 1);
}
.select_div {
  .top_btn {
    padding-left: 100px;
    padding-top: 20px;
    position: relative;
    .iconfont {
      color: #66b1ff;
    }
    .icfont_span {
      position: absolute;
      right: 150px;
      cursor: pointer;
    }
  }
  .checkbox_div {
    padding-left: 150px;
  }
  .select_btn {
    margin-left: 25px;
    width: 88px;
    height: 32px;
    background: rgba(76, 134, 244, 1);
    border-radius: 3px;
    text-align: center;
    line-height: 32px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    position: relative;
    top: 7px;
  }
  .line {
    width: 94%;
    margin: 20px 0;
    height: 1px;
    border: 1px dashed rgba(177, 213, 252, 1);
    margin-bottom: 10px;
  }
  .line_div {
    width: 94%;
    height: 10px;
    margin-top: 30px;
    background: rgba(245, 248, 252, 1);
  }
}
.el-checkbox {
}
.icon-biao {
  color: #5dc349;
}
.dilog .el-checkbox {
  width: 50%;
  margin-right: 0;
  padding-left: 30px;
}
.line {
  width: 94%;
  margin: 20px 0;
  margin-bottom: 10px;
  height: 1px;
  border: 1px dashed rgba(177, 213, 252, 1);
}
.btm_divtop {
 
}
.btm_div  .el-form-item {
   display: inline-block;
   vertical-align: top;
}
.role {
  color: #606266;
  margin-left: 20px;
}
.role1 {
  color: #606266;
  margin-left: 10px;
}
.icon-add {
  color: #4c86f4;
}
.add {
  margin-left: 30px;
  cursor: pointer;
  position: relative;
  top: 12px;
}
.icon-del {
  color: #4c86f4;
}
.btn_div {
  text-align: center;
  margin-top: 5px;
  width: 74%;
}
.tip {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(245, 108, 108, 1);
  padding-left: 50px;
}
.lines_div {
  display: flex;
  align-items: center;
}
.ing_div {
  padding-left: 50px;
}
.dele_div {
  position: relative;
  .dete_icon {
    display: flex;
    flex-direction: column;
    width: 100px;
    text-align: center;
    position: absolute;
    right: 200px;
    z-index: 100;
    span {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(144, 147, 153, 1);
      margin-top: 3px;
    }
  }

  .icon-shanchu {
    font-size: 24px;
    color: #f56c6c;
  }
}
.span_red {
  color: #f56c6c;
  position: absolute;
  left: 0;
  top: 31px;
}
.add_div {
  padding-left:  38px;
}
.mcard {
  padding-top: 10px;
  padding-right: 0;
}
.top_div {
  padding-left: 0;
  background: none;
}
.search-wrapper1 {
  padding: 20px;
  border: 1px solid rgb(215, 224, 241);
  background: #fff;
  display: flex;
  align-items: center;
  .title1 {
    display: flex;
    margin-left: 40%;
  }
}
.bor_div {
  border: 1px solid rgba(214, 222, 239, 1);
}
.pos {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  opacity: 0;
}
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
      }
    }
  }
  /deep/.el-form {
    margin-top: -10px;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(214, 222, 239, 1);
  }
  .menu {
    p {
      position: relative;
      top: 1px;
      background: white;
      border: 1px solid rgba(214, 222, 239, 1);
      text-align: center;
      line-height: 46px;
      border-bottom: none;
      border-top: none;
      font-weight: 400;
      margin-bottom: 10px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      color: rgba(51, 51, 51, 1);
      width: 170px;
      height: 46px;
    }
  }
  .search-wrapper {
    padding: 20px;
    background: #fff;
  }
}
/deep/ .el-dialog__body {
  background: none;
  padding-bottom: 0;
}
.search-wrapper .title {
  color: #333;
  margin-left: -20px;
  font-size: 16px;
  font-weight: 400;
  padding-left: 10px;
  line-height: 1.4;
  border-left: 4px solid #4c86f4;
  margin-bottom: 10px;
}
/deep/ .department1 .el-form-item__content {
  line-height: 32px;
}
</style>
