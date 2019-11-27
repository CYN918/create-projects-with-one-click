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
                    <el-form-item label="入驻商品品类：" label-width="120px">
                        <div class="brandexamin">
                          <el-cascader
                            collapse-tags
                            :options="optionsArr"
                            @change="category"
                            :show-all-levels="false"
                            :props="{ multiple: true, checkStrictly: true}"
                            clearable
                          ></el-cascader>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="关键词：">
                      <el-col :span="23">
                        <el-input v-model="keyword" placeholder="请输入供应商名称/联系人等"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <!-- <el-form-item label="采购管理员：">
                      <el-col :span="23">
                        <el-input v-model="people" placeholder="请输入采购管理员"></el-input>
                      </el-col>
                    </el-form-item> -->
                  </el-col>
                </el-col>
                <el-col :span="1" class="btn_right">
                  <el-button type="primary" size="small" @click="_getSupplierarchives(true)">查询</el-button>
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
          <el-button type="primary" size="small" @click="add" v-permit="'add:merchants'">新增</el-button>
          <el-button type="primary" size="small" @click="blacklistAction(true)" v-permit="'view:blacklist'">黑名单</el-button>
          <el-button type="primary" size="small" v-permit="'supplier-3rd'" @click="third" v-if="!notMasterSystem">
            第三方供应商
          </el-button>
        </el-col>
        <el-col :span="3"></el-col>
      </el-row>
      <el-dialog
              title="加入黑名单"
              :visible.sync="blackList"
              width="40%"
      >
        <el-form label-width="100px" size="small" >
          <el-form-item label="供应商名称：">
            <span>{{blackListSe.supplierName}}</span>
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
      <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange"  stripe>
        <el-table-column align="center" type="selection"  width="55">
        </el-table-column>
        <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
        <el-table-column  prop="auditStatus"  label="状态" align="center">
          <template slot-scope="scope">
            {{scope.row.supplierStatus == 0?'正常':scope.row.supplierStatus == 1?'黑名单':scope.row.supplierStatus == 2?'删除':''}}
          </template>
        </el-table-column>
        <el-table-column prop="supplierName" label="供应商信息" align="center" width="200">
          <template slot-scope="scope">
            <div class="txt_left">供应商名称：{{scope.row.supplierName}}</div>
            <div class="txt_left">用户名：{{scope.row.sysuserName}}</div>
            <div class="txt_left">账号：{{scope.row.sysuserAccount}}</div>
            <div class="txt_left">性质：{{scope.row.supplierNature}}</div>
            <div class="txt_left">管理员：{{scope.row.adminName}}</div>
            <el-button type="primary" size="small" @click="checkgoods(scope.row)" style="margin-top:10px" v-permit="'view:goods'">查看商品</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="oneCategory" label="一级品类" align="center"></el-table-column>
        <el-table-column prop="twoCategory" label="二级品类" align="center"></el-table-column>
        <el-table-column label="联系人信息" align="center" width="200">
          <template slot-scope="scope">
            <div class="txt_left">业务联系人：{{scope.row.contactName}}</div>
            <div class="txt_left">固定电话：{{scope.row.contactFixedPhone}}</div>
            <div class="txt_left">手机：{{scope.row.contactPhone}}</div>
            <div class="txt_left">QQ：{{scope.row.contactQQ}}</div>
            <div class="txt_left">邮箱：{{scope.row.contactEmail}}</div>
            <div class="txt_left">微信：{{scope.row.generalManagerWechat}}</div>
            <div class="txt_left">订单处理人手机：{{scope.row.orderManagerPhone}}</div>
            <div class="txt_left">订单处理人邮箱：{{scope.row.orderManagerEmail}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="总经理信息" align="center" width="200">
          <template slot-scope="scope">
            <div class="txt_left">总经理：{{scope.row.generalManagerName}}</div>
            <div class="txt_left">总经理手机：{{scope.row.generalManagerPhone}}</div>
            <div class="txt_left">公司电话：{{scope.row.supplierPhone}}</div>
            <div class="txt_left">传真：{{scope.row.fax}}</div>
            <div class="txt_left">地址：{{scope.row.supplierAddress}}</div>
            <div class="txt_left">网址：{{scope.row.supplierUrl}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="主营商品" align="center" width="150">
          <template slot-scope="scope">
            <div class="txt_left">自营品牌：{{scope.row.selfProduct}}</div>
            <div class="txt_left">代理品牌：{{scope.row.agentBrand}}</div>
            <div class="txt_left">主营产品：{{scope.row.mainProduct}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="付款信息" align="center" width="200">
          <template slot-scope="scope">
            <div class="txt_left">开户名称：{{scope.row.bankCompany}}</div>
            <div class="txt_left">开户行：{{scope.row.bankName}}</div>
            <div class="txt_left">开户账号：{{scope.row.bankAccount}}</div>
            <div class="txt_left">税号：{{scope.row.taxNumber}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="settleType" label="结账方式" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.settleType ==0">月结</div>
            <div v-if="scope.row.settleType ==1">季度结算</div>
            <div v-if="scope.row.settleType ==2">年度结算</div>
            <div v-if="scope.row.settleType ==3">集采/批发</div>
            <div v-if="scope.row.settleType ==4">预付定金</div>
          </template>
        </el-table-column>
        <el-table-column prop="isWholesale" label="一件代发" align="center" width="100">
          <template slot-scope="scope">{{scope.row.isWholesale == false?'不支持':'支持'}}</template>
        </el-table-column>
        <el-table-column label="营业执照" align="center" width="140">
          <template slot-scope="scope">
            <div v-if="scope.row.businessLicense">
              <img :src="scope.row.businessLicense" alt class="img_size"
                   @click="open(scope.row.businessLicense,'营业执照')"/>
              <div>
                <el-button type="primary" size="small" @click="open(scope.row.businessLicense,'营业执照')">点击查看大图
                </el-button>
              </div>
            </div>
            <div v-else>
              暂无
            </div>
          </template>
        </el-table-column>
        <el-table-column label="一般纳税人资格证" align="center" width="140">
          <template slot-scope="scope">
            <div v-if="scope.row.taxpayerQualification">
              <img :src="scope.row.taxpayerQualification" alt class="img_size"
                   @click="open(scope.row.taxpayerQualification,'一般纳税人资格证')"/>
              <div>
                <el-button
                        type="primary"
                        size="small"
                        @click="open(scope.row.taxpayerQualification,'一般纳税人资格证')"
                >点击查看大图
                </el-button>
              </div>
            </div>
            <div v-else>
              暂无
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="品牌授权书" align="center" width="140">
          <template slot-scope="scope">
            <div v-if="scope.row.brandAuthUrl">
              <img :src="scope.row.brandAuthUrl" alt class="img_size" @click="open(scope.row.brandAuthUrl,'品牌授权书')"/>
              <div>
                <el-button type="primary" size="small" @click="open(scope.row.brandAuthUrl,'品牌授权书')">点击查看大图</el-button>
              </div>
            </div>
            <div v-else>
              暂无
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="授权链" align="center" width="140">
          <template slot-scope="scope">
            <div v-if="scope.row.authorizationChain&&(/^[a-zA-Z]/.test(scope.row.authorizationChain))">
              <img :src="chain(scope.row)[0]" alt class="img_size" @click="open(chain(scope.row),'授权链')"/>
              <div>
                <el-button
                        type="primary"
                        size="small"
                        @click="open(chain(scope.row),'授权链')"
                >点击查看大图
                </el-button>
              </div>
            </div>
            <div v-else>
              暂无
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="170">
          <template slot-scope="scope">
            <div class="line-div">
             <div class="small-Idiv" style="margin-left: -15px;" @click="assigned(scope.row.supplierId)" v-permit="'update:buyer'">
                <div class="i-div yonghu">
                  <img
                    src="../../common/images/icon/指派采购员.png"
                    alt
                    class="operation_img"
                    style="margin-left: 19px;"
                  />
                </div>
                <span style="word-break: keep-all;margin-left: -8px;">修改采购员</span>
              </div>
              <!--<div class="small-Idiv" @click="dialogVisible11 = true">
                <div class="i-div gongneng" style="margin-left: 5px;">
                  <img
                    src="../../common/images/icon/新增品类.png"
                    alt
                    class="operation_img"
                    style="margin-left: 9px;"
                  />
                </div>
                <span style="word-break: keep-all;">新增品类</span>
              </div>-->
              <div class="small-Idiv"  style="margin-left: -15px;"  @click="deleSupplierId(scope.row)" v-permit="'archives:remove'">
                <div class="i-div">
                  <img src="../../common/images/icon/回收站.png" alt class="operation_img" />
                </div>
                <span style="word-break: keep-all;">删除</span>
              </div>
            </div>
            <div class="line-div small_top">
              <div class="small-Idiv" style="margin-left: -3px;"  @click="detail(scope.row.auditId,scope.row.supplierId,scope.row.auditStatus,1)" v-permit="'view:archives'">
                <div class="i-div">
                  <img src="../../common/images/icon/查看详情.png" alt class="operation_img" />
                </div>
                <span style="word-break: keep-all;">详情</span>
              </div>
              <div class="small-Idiv" @click="editor(scope.row.supplierId)" v-permit="'archives:editor'">
                <div class="i-div" style="margin-left: 5px;">
                  <img src="../../common/images/icon/编辑.png" alt class="operation_img" />
                </div>
                <span style="word-break: keep-all;margin-left: 7px;">编辑</span>
              </div>
            </div>
            <!--<div class="line-div small_top" style="justify-content: end;">
              <div class="small-Idiv" style="margin-left: 16px;"  @click="deleSupplierId(scope.row)">
                <div class="i-div">
                  <img src="../../common/images/icon/回收站.png" alt class="operation_img" />
                </div>
                <span style="word-break: keep-all;">删除</span>
              </div>
            </div>-->
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
          :total="form.total_count"
        ></el-pagination>
      </div>
    </div>
    <!-- 点击查看大图弹窗 -->
    <el-dialog :title="textName" :visible.sync="picture" width="34%">
      <span>
        <div style="width: 100%;height: 578px;overflow: auto;">
          <img :src="item" alt v-for="item in img" :key="item" class="big_img" />
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="picture = false" size="small">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 关联用户 -->
    <!-- 删除 -->
    <el-dialog
      title="删除"
      :visible.sync="dialogDelete"
      width="40%"
      >
      <el-form label-width="100px" size="small">
        <el-form-item label="供应商名称：">
          <span>{{supplier_name}}</span>
        </el-form-item>
        <el-form-item label="处理原因：">
            <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入删除原因"
          v-model="deletereason">
        </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogDelete = false" size="small">取 消</el-button>
        <el-button type="primary" @click="deleSupplierId('',true)" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 加入黑名单 -->
    <!--<el-dialog
      title="加入黑名单"
      :visible.sync="blackList"
      width="40%"
      >
      <el-form label-width="100px" size="small">
        <el-form-item label="供应商名称：">
          <span>杨小小</span>
        </el-form-item>
        <el-form-item label="处理状态：">
          <el-checkbox v-model="checked">加入黑名单</el-checkbox>
        </el-form-item>
        <el-form-item label="处理原因：">
            <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入加入黑名单原因"
          v-model="reason">
        </el-input>
        </el-form-item>
        <el-form-item label="提交审核：">
          <el-select v-model="value" clearable placeholder="请选择" style="width:300px">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                &nbsp;&nbsp;<el-checkbox v-model="checked">总经理审核</el-checkbox>
        </el-form-item>
      </el-form>
      <span slot="footer.vue" class="dialog-footer.vue">
        <el-button type="danger" @click="blackList = false" size="small">取 消</el-button>
        <el-button type="primary" @click="blackList = false" size="small">确 定</el-button>
      </span>
    </el-dialog>-->
    <!-- 指派采购员 -->
    <el-dialog title="指定供应商给采购负责人" :visible.sync="dialogVisible" width="30%" >
      <span>
        <div class="user1">
          <el-select v-model="userId" placeholder="请选择采购员" style="display: flex;width:100%" >
            <el-option
              v-for="item in personnel"
              :key="item.sysuserId"
              :label="item.sysuserName"
              :value="item.sysuserId">
            </el-option>
          </el-select>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="sysuseridSure" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 指派采购员 -->
    <!-- 删除 -->
    <!-- <el-dialog
      :title="title"
      :visible.sync="blacklistState"
      width="40%"
      >
      <el-form label-width="100px" size="small">
        <el-form-item label="供应商名称：">
          <span>{{supplierName}}</span>
        </el-form-item>
        <el-form-item label="处理原因：">
            <el-input
          type="textarea"
          :rows="4"
          :placeholder="placeholder"
          v-model="reason">
        </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer.vue" class="dialog-footer.vue">
        <el-button type="danger" @click="blacklistState = false" size="small">取 消</el-button>
        <el-button type="primary" @click="deleSupplierId('',true)" size="small">确 定</el-button>
      </span>
    </el-dialog> -->
    <el-dialog
      title="新增品类"
      :visible.sync="dialogVisible11"
      width="40%"
      >
      <el-form ref="form" :model="form"  label-width="120px" size="small">
        <el-form-item label="选择一级品类:" >
          <el-select v-model="form.people" placeholder="请选择品类">
            <el-option label="刀具" value="0"></el-option>
            <el-option label="电器" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级品类名称:" prop="content">
            <el-input v-model="form.people" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible11 = false" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogVisible11 = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import {
  getSupplierarchives,
  getStoreList,
  getSupplierbindadmin,
  supplierApplyPostState,
  getSupplierbinduser,
  bindSupplieruser,
  getAlluser,
  deleteantarky,
  enterBlack
} from "@/api/supplier/index";
import { getTreecatagory } from "@/api/product/index";
import { throttleTipPop } from "@/utils/throttle";
import { getAllOrganizational,} from "@/api/permissions/index";
export default {
  data() {
    return {
      textName: '',
      supplier_name:'', //供应商名称
      deletereason:'', // 删除原因
      value:'',
      supplierName:'',
      search_type:'',
      state:'',
      people:'',
      keyword:'',
      catIds:null,
      dialogDelete:false, //删除
      checked: true,
      dialogVisible11: false,
      checkList: [],
      optionsArr:[],
      arrcatId:[],
      form: {
        current_page: 1,
        page_size: 10,
        total_count: 0,
        keywords: "",
        people: "",
        adminId:'',
        adminName:'',//采购员姓名
        supplierStatus:0,//供应商状态
        supplierCategory:"",//品类名字
      },
      radio: '1',
      dialogVisible: false, //指派采购员
      picture: false,
      blacklistState:false, //黑名单
      tableData: [],
      black:'',
      reason:'',//加入黑名单原因
      blackList:false,//黑名单
      blackListSe:[],//黑名单信息

      options: [], //采购员数据
      img: [],
      adminId: null, //组织id
      supplierId: "", //供应商id
      userId:'', //采购员ID
      title:'', //黑名单，删除头部
      placeholder:'',//理由
      state:'', //删除还是黑名单
      personnel:[], //采购员下拉框
    };
  },
  mounted() {
    this.startLoading() //加载中loading
    this._getSupplierarchives();
    this._getAlluser();
    this._getTreecatagory();
  },
  computed: {
    notMasterSystem() {
      return this.$routerInfo.platformType != 0;
    },
  },
  components: {
  },

  methods: {
    //品牌开通分类树形下拉
    _getTreecatagory() {
      let obj = {};
      obj.type = "SELECT";
      obj.id = 0;
      getTreecatagory().then(res => {
        res.data.forEach((item)=>{
          if(item.children){
            item.children.forEach((it)=>{
              it.children=null;
            })
          }
        })
        this.transleteData(res.data, this.optionsArr);
        this.IterationDelateMenuChildren(this.optionsArr);
      });
    },
    //选择的信息
    handleSelectionChange(val){
      this.blackListSe = val[0]
      this.black = val
    },
    //加入黑名单
    blacklistAction(falg){
      if(falg){
        if(this.black.length > 1 || this.black.length === 0 ){
          throttleTipPop(this,'warning','请选择一项列表')
        }else{
          this.blackList = true;
          this.reason = ""
        }
        return false;
      }
      let obj = {};
      obj.supplierId=this.blackListSe.supplierId
      obj.supplierStatus=1
      obj.reason=this.reason
      enterBlack(obj).then(res=>{
        if(res.code === 200){
          this.$message({
            message: res.message,
            type: 'success'
          });
        }
      })
      this.blackList = false;
    },
    chain(obj){
      if(!obj.authorizationChain){
        obj.authorizationChain = '';
      }
      let img = obj.authorizationChain.split('<:>');
      return  img;
    },
    deleSupplierId(val,state){
      if(val){
        this.supplierId = val.supplierId
        this.dialogDelete = true
        this.supplier_name = val.supplierName
      }
      if(state){
        let obj = {}
        obj.reason = this.deletereason
        obj.supplierId = this.supplierId
        deleteantarky(obj).then(res => {
          if(res.code == 200){
            this.dialogDelete = false
            this.$message({
              message: res.message,
              type: 'success'
            });
          this.deletereason = ''
          this._getSupplierarchives()
          }
        })
      }
    },
    _getAlluser(){
      getAlluser().then(res => {
        this.personnel = res.data.list
      })
    },
    //指派采购员
    assigned(id){
      this.dialogVisible = true
      this.supplierId = id
    },
    sysuseridSure(){
      if(this.userId ==''){
        this.$message('请选择采购员');
      }else{
        bindSupplieruser(this.userId,this.supplierId).then(res => {
          if(res.code == 200){
            this.dialogVisible = false
            this.$message({
              message: res.message,
              type: 'success'
            });
            this.userId = ''
            this._getSupplierarchives()
          }
        })
      }
    },
    blacklistSure(){
      supplierApplyPostState(this.supplierId,this.reason,this.state).then(res => {
        if(res.code == 200){
          this._getSupplierarchives();
          this.$message({
          message: res.message,
          type: 'success'
        });
          this.blacklistState = false
        }
      })

    },
    transleteData(data, arr, ab) {
      data.forEach(item => {
        // const msg = {
        //   id: item.organizeId,
        //   label: item.organizeName ? item.organizeName : item.sysuserName,
        //   value: item.organizeId,
        //   children: item.childNodes ? [] : null,
        //   isLeaf: item.childNodes ? false : true
        // };
        const msg = {
          id: item.catId,
          label: item.catName,
          value: item.catId,
          children: item.children ? [] : null,
          isLeaf: item.children ? false : true
        };
        // if (item.childNodes && item.childNodes.length > 0) {
        //   this.transleteData(item.childNodes, msg.children);
        // }
        if (item.children && item.children.length > 0) {
          this.transleteData(item.children, msg.children);
        }
        arr.push(msg);
      });
      return arr;
    },
    IterationDelateMenuChildren(arr) {
      if (arr.length) {
        for (let i in arr) {
          if (arr[i].children && arr[i].children.length) {
            this.IterationDelateMenuChildren(arr[i].children);
          } else {
            delete arr[i].children;
          }
        }
      }
      return arr;
    },
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
    detail(auditId,supplierId,auditStatus,state){
      this.$router.push({ name: "SupplierFilesDetail", query: { supplierId ,state,auditId,auditStatus} });
    },
    editor(id) {
      this.$router.push({ name: "SupplierAddfiles", query: { id: id } });
    },
    add() {
      this.$router.push({ name: "SupplierAddfiles" });
    },
    third() {
      this.$router.push({ name: "SupplierThirdPartySupplier" });
    },
    handleSizeChange(val) {
      this.form.page_size = val;
      this._getSupplierarchives();
    },
    handleCurrentChange(val) {
      this.form.current_page = val;
      this._getSupplierarchives();
    },
    _getSupplierarchives(show) {
      if(show){
        this.form.current_page = 1
      }
      getSupplierarchives(this.form,this.arrcatId).then(res => {
        this.tableData = res.data.list;
        this.form.total_count = res.data.total;
        this.endLoading() //取消加载中loading
      });

    },
    //查看商品
    checkgoods(data) {
      this.$router.push({name:'SupplierProductList',query:{supplierId:data.supplierId}})
    },
    category(val) {
      const arr = []
      for(let i=0;i<val.length;i++){
        val[i].forEach(item => {
          arr.push(item)
        })
      }
      this.arrcatId = arr
      this._getSupplierarchives(true)
    },
  },
   watch:{
    keyword(newVal){

      if(newVal){
        this.form.keywords = newVal
      }else{
        this.form.keywords = ''
      }
    },
    state(newVal){
      if(newVal){
        this.form.supplierStatus = newVal
      }
    },
    search_type(newVal){
      if(newVal){
        this.form.supplierCategory = newVal
      }
    },
    /* //采购管理员输入框取值
    people(newVal){
      if(newVal){
        this.form.adminName = newVal
        console.log(this.form.adminName);
      }
    }, */
   },
   components: {

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
  text-align: right;
}
.detail {
  font-size: 14px;
  color: #606266;
}

.i-div {
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.line-div {
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  margin-left: 11px;
}
.small_top {
  margin-top: 10px;
}
.big_img {
  width: 100%;
  height: 546px;
}
.img_size {
  width: 118px;
  height: 170px;
}
.distribution{
    display: flex;
    align-items: center;
    position: relative;
    top: -12px;
  }
.user1{
    display:flex;
    align-items:center;
  }
</style>
