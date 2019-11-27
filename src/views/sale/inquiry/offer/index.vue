<template>
  <div id="offer1">
    <div class="margin0">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">待生成报价单</h4>
              <div class="search-base">
                <el-row>
                  <el-col :span="5">
                    <el-col>
                      <el-form-item label="询价单号：">
                        <el-col :span="21">
                          <el-input v-model="forms.enquiryNumber" placeholder="请输入询价单号"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="5">
                    <el-col>
                      <el-form-item label="客户：">
                        <el-col :span="21">
                          <el-input v-model="forms.customerName" placeholder="请输入客户名称/联系人姓名"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="5">
                    <el-col>
                      <el-form-item label="发票类型：">
                        <el-col :span="21">
                          <el-select
                            class="el-select-width"
                            v-model="forms.invoiceType"
                            placeholder="请选择"
                          >
                            <el-option label="不要发票" value="0"></el-option>
                            <el-option label="增值税专用发票" value="2"></el-option>
                            <el-option label="普通发票" value="1"></el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="5">
                    <el-col>
                      <el-form-item label="状态：">
                        <el-col :span="21">
                          <el-select class="el-select-width" v-model="forms.type" placeholder="请选择">
                              <el-option
                                  v-for="item in options1"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                              </el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small" @click="inSearch()">查询</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="5">
                    <el-form-item label="产品搜索：">
                      <el-col :span="21">
                        <el-input v-model="forms.productSearch" placeholder="请输入商品信息/编码"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="新增日期：">
                      <el-col :span="21">
                        <el-date-picker
                          type="daterange"
                          valueFormat="yyyy-MM-dd HH:mm:ss"
                          v-model="forms.createTime"
                          range-separator="-"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                        ></el-date-picker>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mcard" style="border:1px solid #d7e0f1">
        <el-row class="operate mbottom">
          <el-col :span="21">
            <!-- <el-button type="primary">仅挑选</el-button> -->
            <!--  <el-button type="primary" size="small" @click="addInquirySheet()">新增</el-button> -->
            <el-button type="primary" size="small" @click="closeInquirySheet()" v-permit="'xj:close'">关闭询价</el-button>
          </el-col>
          <el-col :span="3"></el-col>
        </el-row>
        <el-table
          :data="inquiryData"
          border
          
          style="width: 100%"
          :row-class-name="tableRowClassName"
          :row-style="selectedHighlight"
          @row-dblclick="AhandleSelectionChange"
        >
          <el-table-column prop="name" label="序号" align="center" width="50" type="index"></el-table-column>
          <el-table-column prop="name" label="报价状态" align="center">
            <template slot-scope="scope">
              <div v-html="scope.row.offerStatus"></div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="询价信息" align="center" width="200">
            <template slot-scope="scope">
              <div class="txt_left">询价单号：{{scope.row.inquiryNo}}</div>
              <div class="txt_left">录入时间：{{scope.row.createTime}}</div>
            </template>
          </el-table-column>

          <el-table-column prop="name" label="客户信息" align="center" width="200">
            <template slot-scope="scope">
            <div class="txt_left">
                客户名称：{{scope.row.customerName}}</div>
              <div class="txt_left"><span style="margin-right:7px">联</span><span style="margin-right:7px">系</span>人：{{scope.row.customerContact}}</div>
              <div class="txt_left"><span style="margin-right:27px">手</span>机：{{scope.row.phone}}</div>
              <div class="txt_left"><span style="margin-right:27px">邮</span>箱：{{scope.row.email}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="发票信息" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.invoiceType | invoice}}</div>
<!--               <div v-if="scope.row.invoiceType!==0">税率：{{scope.row.invoiceTaxRate}}</div> -->
            </template>
          </el-table-column>
          <el-table-column prop="name" label="报价期限" align="center">
            <template slot-scope="scope">{{scope.row.offerEndTime | date}}</template>
          </el-table-column>

          <el-table-column prop="name" label="销售代表" align="center">
            <template slot-scope="scope">{{scope.row.saleUserName}}</template>
          </el-table-column>
          <el-table-column prop="name" label="指定的采销组" align="center">
            <template slot-scope="scope">{{scope.row.groupName}}</template>
          </el-table-column>
          <el-table-column prop="name" label="备注" align="center">
             <template slot-scope="scope">
                <div class="txt_left">
                  备注：{{scope.row.remark}}
                </div>
                <div class="txt_left" v-show="scope.row.closeMsg">
                  关闭原因：{{scope.row.closeMsg}}
                </div>
              </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="150">
            <template slot-scope="scope">
              <div class="line-div">
                <div class="small-Idiv" @click="addInquirySheet(scope.row)" 
                v-permit="'xj:gen'">
                  <div class="i-div">
                    <img src="@/common/images/icon/推送询价.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;">生成报价单</span>
                </div>
                <div
                  class="small-Idiv"
                  @click="deleteData(scope.row)"
                  v-permit="'xj:delete'" >
                  <div class="i-div">
                    <img src="@/common/images/icon/回收站.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;">删除</span>
                </div>
                <div
                  class="small-Idiv"
                  @click="pushToSale(scope.row)"
                  v-permit="'xj:move'">
                  <div class="i-div">
                    <img src="@/common/images/icon/移交销售黄.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;">移交销售</span>
                </div>

                <div class="small-Idiv" @click="editInquirySheet(scope.row)"
                v-permit="'xj:edit'">
                  <div class="i-div">
                    <img src="@/common/images/icon/编辑.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;">编辑</span>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @size-change="AhandleSizeChange"
            @current-change="AhandleCurrentChange"
            :current-page="forms.current_page"
            :page-sizes="[5,10,30,50]"
            :page-size="forms.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="forms.total_count"
          ></el-pagination>
        </div>
      </div>
      <div class="margin0" style="margin-top:20px">
        <div class="tabs-header">
          <ul class="clearfix">
            <li
              class="sale"
              @click="tabIndex(0)"
              :class="currentIndex===0 ? 'active' : ''"
              v-show="!this.showNo"
            >商品明细</li>
            <li
              class="sale"
              @click="tabIndex(0)"
              :class="currentIndex===0 ? 'active' : ''"
              v-show="this.showNo"
            >询价单【{{this.showNo}}】的商品明细</li>
          </ul>
        </div>
        <div class="tabs-content">
          <component :is="mainIndex" :count="count" :page="page" :showNo="showNo" :closeId="closeId" @resetIn="resetIn1"></component>
        </div>
      </div>

      <!-- 新增客户询价组件 -->
      <AddOffer
        @close="closer"
        @beClose="beCloser"
        @addInquiries="addInquiries1"
        :addVisibles="addVisibles"
        :editDatasB="editDatasB"
      ></AddOffer>
      <!-- 生成报价单组件 -->
      <CreateOffer
        :editVisibles="editVisibles"
        :editDatasA="editDatasA"
        :inquiryNo="inquiryNo"
        @createClose1="createClose2"
        @createClosing1="createClosing2"
        @editInquiry1="editInquiry2"
      ></CreateOffer>
      <!-- 移交销售弹窗 -->
      <el-dialog :visible.sync="saleVisible" width="30%">
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form label-width="100px" size="small">
              <div class="search-wrapper">
                <h4 class="title">移交销售员跟进</h4>
              </div>
            </el-form>
          </div>
        </div>
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form ref="infoForm" :model="form"  label-width="120px" size="small">
              <div class="search-wrapper">
                <div class="search-base">
                  <el-row>
                    <el-col :offset="4">
                      <el-form-item label="销售订单：">
                        <el-col :span="12">
                          <span>{{this.toInquiryNo}}</span>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :offset="4">
                      <el-form-item label="移交销售员：">
                        <el-col :span="12">
                          <el-select
                            v-model="form.toSale"
                            placeholder="请选择"
                            style="width:100%"
                            @change="selectGet1"
                          >
                            <el-option
                              v-for="item in saleList"
                              :key="item.sysuserId"
                              :label="item.sysuserName"
                              :value="item.sysuserId"
                            ></el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-form>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="saleVisible = false" size="small">关 闭</el-button>
          <el-button type="primary" @click="saveSale()" size="small">保存</el-button>
        </span>
      </el-dialog>

     
      <!-- 关闭询价 -->
      <el-dialog :visible.sync="closeVisible" width="30%">
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form label-width="100px" size="small">
              <div class="search-wrapper">
                <h4 class="title">关闭询价</h4>
              </div>
            </el-form>
          </div>
        </div>
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form ref="infoForm" :model="form"  label-width="120px">
              <div class="search-wrapper">
                <div class="search-base">
                  <el-row>
                    <el-form-item label="询价单：">
                      <span>{{this.showNo}}</span>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="关闭原因：">
                      <el-input
                        v-model="form.closingreason"
                        placeholder="请填写"
                        style="width:100%"
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 4}"
                      ></el-input>
                    </el-form-item>
                  </el-row>
                </div>
              </div>
            </el-form>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="closeVisible = false" size="small">关 闭</el-button>
          <el-button type="primary" @click="closeInquirys()" size="small">保存</el-button>
        </span>
      </el-dialog>

      <!-- 删除询价 -->
      <el-dialog :visible.sync="deleteVisible" width="20%" title="提示" style="top:20%">
        <div class="mail-fitter" style="background:#fff;padding:20px 0;">
            <div class="search-base">
                  <div class="goods-fitter">
                    <el-row>
                        <div class="tip">
                          <img class="tipImg" src="@/common/images/组 180.png" alt=""/>
                            <span>温馨提示：一经删除不可恢复记录！</span><br/>
                            <span>你确定要删除所选内容吗？</span>
                        </div>

                    </el-row>
                  </div>  
            </div>
      </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="deleteVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteInquirys()" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getGoods,
  changeState,
  deleteGoods,
  getScene,
  getErpGoods
} from "@/api/product/index";
import {
  getInquiry,
  getInGoods,
  addInquiry,
  deleteInquiry,
  closeInquiry,
  getInGood,
  findInquiry,
  saleInquirys,
  toSaleInquirys,
  toSaleUser,
  editInquiry,
  toSalesRepresentative
} from "@/api/sale/index";
import { getCategory, getStoreList } from "@/api/public";
import { getAllcustomer } from "@/api/customer";
import { throttleTipPop } from "@/utils/functions.js";
import Goods from "./goods";
import AddOffer from "./addOffer";
import CreateOffer from "./createOffer";
export default {
  filters: {
    invoice: function(val) {
      switch (val) {
        case 0:
          return "无需发票";
          break;
        case 1:
          return "增值税专用发票";
          break;
        case 2:
          return "普通发票";
          break;

        default:
          return;
      }
    },

  },

  components: {
    Goods,
    AddOffer,
    CreateOffer
  },
  data() {
    return {
      deleteVisible: false, //删除询价单弹窗
      pushVisible: false, //推送给采购员
      brandVisible: false, //新增询价单新增商品品牌弹窗
      innerVisible: false, //新增询价单新增商品弹窗
      addVisibles: false, //新增询价单弹窗
      customerVisible: false, //新增询价单客户选择弹窗
      editVisibles: false, //编辑询价单
      innerVisible1: false, //编辑询价单新增商品弹窗
      customerVisible1: false, //编辑询价单客户选择弹窗
      brandVisible1: false, //编辑询价单新增商品品牌弹窗\
      saleVisible: false, //移交销售弹窗
      closeVisible: false, //关闭询价
      currentIndex: 0,
      saleChoose: "", //采销选择的值
      mainIndex: "Goods",
      toInquiryId: "", //转交采销需要的ID
      toInquiryNo: "", //转交采销需要的单号
      organizeName: "", //所属组名称
      sysuserName: "", //销售名称
      createId: "",
      color: "",
      value1: "",
      showNo:'',//显示商品列表需要的编号
      inquiryNo:'',
      options: [
        {
          value: 0,
          label: "不要发票"
        },
        {
         value: 1,
          label: "增值税专用发票"
        },
        {
          
           value: 2,
          label: "普通发票"
        }
      ],
       options1: [
       /*  {
          value: 0,
          label: "未完成询价单"
        }, */
        {
          value: 1,
          label: "往期询价单"
        },
        {
          value: -1,
          label: "已关闭询价单"
        }
      ],
      forms: {
        cutCardFlag:1,//切卡标志
        enquiryNumber: "", //询价单号,
        customerName: "", //客户
        invoiceType: "", //发票状态
        productSearch: "", //产品搜索
        creatTime: [], //新增时间
        type: 1, //状态
        startTime: "",
        endTime: "",
        current_page: 1,
        page_size: 10,
        total_count: 0
      },
      form: {
        customerId: "",
        inquirySheet: "", //询价单号
        customerName: "", //客户名称
        salesRepresentatives: "", //销售代表
        contacts: "", //联系人
        department: "", //部门
        phoneNumber: "", //电话号码
        mail: "", //邮箱
        mobilePhone: "", //手机号码
        quotationPeriod: "", //报价期限
        invoiceType: '0', //发票类型
        platformName: "", //平台名称
        taxRate: 10, //税率
        deliveryDate: "", //交货日期
        address: "", //收货地址
        remark: "", //备注
        brand: "", //品牌
        differentiation: "", //客户区分
        keywords: "", //关键词
        saleOrder: "", //销售订单
        toSale: "", //移交给销售员
        inquirySheet: "", //询价单
        closingreason: "", //关闭原因
        arrs: [],
        goods: [],

        current_page: 1,
        page_size: 2,
        total_count: 0
      },
      formData: {
        current_page: 1,
        page_size: 2,
        total_count: 0
      },
      formDatas: {
        current_page: 1,
        page_size: 10,
        total_count: 0
      },
      writeData: {
        color: "",
        num: "",
        budget: "",
        request: "",
        transport: "",
        address: "",
        deliveryCycle: ""
      },
      deleteId: "", //删除ID
      deleteNo: "",
      closeId: "", //关闭ID
      closeNo: "",
      getIndex: "",
      inquiryData: [],
      tableData: [],
      selectData: [],
      selectData1: [],
      goodsData: [],
      saleGroup: [], //采销组下拉列表
      saleList: [], //销售员下拉列表
      editData: {
        customerName: "",
        customerContact: "",
        dealDate: "",
        inquiryNo: "",
        saleUserName: "",
        department: "",
        phone: "",
        tel: "",
        email: "",
        platformName: "",
        offerEndTime: "",
        dealDate: "",
        invoiceType: ""
      },
      editDatasA: {},
      editDatasB :{},
      editGoodsData: [],
      list: [], //客户列表
      customerData: [], //客户数据
      index: "",
      elTable: [],
      count: "",
      page: "",
     /*  rules: {
        contacts: [
          { required: true, message: "此项为必选项", trigger: "blur" }
        ],
        mobilePhone: [
          { required: true, message: "此项为必选项", trigger: "blur" }
        ],
        quotationPeriod: [
          { required: true, message: "此项为必选项", trigger: "blur" }
        ],
        deliveryDate: [
          { required: true, message: "此项为必选项", trigger: "blur" }
        ],
        address: [{ required: true, message: "此项为必选项", trigger: "blur" }],
        customerName: [
          { required: true, message: "此项为必选项", trigger: "blur" }
        ],
        platformName: [
          { required: true, message: "此项为必选项", trigger: "blur" }
        ],
        department: [
          { required: true, message: "此项为必选项", trigger: "blur" }
        ]
      } */
    };
  },
  created() {

    this._getInquiry();
  },
  watch: {
    "forms.createTime": {
      handler(val, old) {
        if(val===null){
            this.forms.startTime = '';
        this.forms.endTime = '';
        }else{
            this.forms.startTime = val[0];
        this.forms.endTime = val[1];
        }
      },
      deep: true
    }
  },
  computed: {},
  methods: {
    //编辑询价单
    createClose2: function(data) {
      this.editVisibles = data;
    },
    createClosing2: function(data) {
      this.editVisibles = data;
    },
    editInquiry2: function(data) {
      this.editVisibles = data;
      this.resetData();
      this._getInquiry();
    },
    //生成报价单
    closer: function(data) {
      this.addVisibles = data;
    },
    beCloser: function(data) {
      this.addVisibles = data;
    },
    addInquiries1: function(data) {
      this.addVisibles = data;
      this.resetData();
      this._getInquiry();
    },
    tabIndex(index) {
      this.currentIndex = index;
    },
    //刷新
    resetIn1(){
       this.forms.pageIndex = 1;
      getInquiry(this.forms).then(res => {
        if (res.code === 200) {
          console.log(res);

          this.inquiryData = res.data.pageList;
          this.forms.total_count = res.data.count;
        }
        this.resetData();
      });
    },
    resetData(){
        this.count = 0;
        this.page = [];
        this.showNo = '';
        this.getIndex = '';
    },
    //查询
    inSearch() {
      this.forms.pageIndex = 1;
      getInquiry(this.forms).then(res => {
        if (res.code === 200) {
          console.log(res);

          this.inquiryData = res.data.pageList;
          this.forms.total_count = res.data.count;
        }
        this.count = 0;
        this.page = [];
        this.showNo = '';
        this.getIndex = '';
      });
    },
    //删除询价单弹窗
    deleteData(row) {
      console.log(row);
      this.deleteVisible = true;
      this.deleteNo = row.inquiryNo;
      this.deleteId = row.inquiryId;
    },

    //删除询价单
    deleteInquirys() {
      deleteInquiry(this.deleteId).then(res => {
        if (res.code === 200) {
          throttleTipPop(this, "success", "删除成功", 2000);
          this.deleteVisible = false;
          this.resetData();
          this._getInquiry();
        }
      });
    },
    addHandleSizeChange(val) {
      this.formData.page_size = val;

    },
    addHandleCurrentChange(val) {
      this.formData.current_page = val;
 
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    AhandleSizeChange(val) {
      this.forms.page_size = val;
      this.resetData();
      this._getInquiry();
    },
    AhandleCurrentChange(val) {
      this.forms.current_page = val;
      this.resetData();
      this._getInquiry();
    },
    //新增询价单
    addInquirySheet(row) {
      this.addVisibles = true;
      this.createId = row.inquiryId;
        findInquiry(row.inquiryId).then(res => {
        this.editDatasB = res.data;
        this.editDatasB['offerDepartment']=''
        this.editDatasB['offerContact']=''
        this.editDatasB['offerPhone']=''
        this.editDatasB['offerEmail']=''
        let copy1 = JSON.parse(JSON.stringify(this.editDatasB))
        this.editDatasB = copy1
        let arr =this.editDatasB.goodsDetailEditVo
       arr.forEach(v=>{
        v['customerBudget']=''
        v['offerCost']='0'
        v['total'] = '0'
      })
       let copy = JSON.parse(JSON.stringify(arr))
       this.editDatasB.goodsDetailEditVo = copy
      console.log(this.editDatasB);
      });
    },
    //编辑询价单
    editInquirySheet(row) {
      this.editVisibles = true;
      this.createId = row.inquiryId;
      this.inquiryNo = row.inquiryNo
      findInquiry(row.inquiryId).then(res => {
        this.editDatasA = res.data;
        let arr =this.editDatasA.goodsDetailEditVo
       arr.forEach(v=>{
        v['customerBudget']=''
        v['total'] = ''
      })
       var copy = JSON.parse(JSON.stringify(arr))
       this.editDatasA.goodsDetailEditVo = copy
      console.log(this.editDatasA.goodsDetailEditVo);
        
      });
    },

    closeInquirySheet() {
      if (this.closeId !== "") {
        this.closeVisible = true;
      } else {
        throttleTipPop(this, "warning", "请选择要关闭的询价单", 2000);
      }
    },
    closeInquirys() {
      let obj = {};
      obj.closeReason = this.form.closingreason;
      obj.inquiryId = this.closeId;
      closeInquiry(obj).then(res => {
        if (res.code === 200) {
          throttleTipPop(this, "success", "关闭询价单成功", 2000);
          this.closeVisible = false;
          this.resetData();
          this._getInquiry();
        }
      });
    },
    //查询询价单分页
    _getInquiry() {
      getInquiry(this.forms).then(res => {
        if (res.code === 200) {
          this.inquiryData = res.data.pageList;
          this.forms.total_count = res.data.count;
        }
      });
    },
    //查询
    _getGoods() {
      getErpGoods(this.formData).then(res => {
        this.tableData = res.data.pageList;
        console.log(this.tableData);

        this.tableData.forEach(item => {
          item.top = 0;
        });
        this.formData.total_count = res.data.count;
      });
    },
    Clicktent(val, data) {
      data.index = val;
      console.log(this.$refs.elTable);
      this.$set(this.$refs.elTable.data);
      this.$forceUpdate();
    },
    //选择客户
    //获取所有客户信息
    _getAllcustomer() {
      getAllcustomer(this.form).then(res => {
        this.list = res.data.list;
        console.log(this.list);
      });
    },
    chooseCustomer1() {
      this.customerVisible1 = true;
      this._getAllcustomer();
    },
    //客户查询
    customerSearch() {
      this._getAllcustomer();
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
    //双击选定
    AhandleSelectionChange(row) {
      this.getIndex = row.index;
      this.showNo = row.inquiryNo;
      this.closeId = row.inquiryId;


       let obj ={};
      obj.pageIndex = 1;
      obj.pageSize = 10;
      obj.inquiryNo = row.inquiryNo
      getInGoods(obj).then(res => {
        this.count = res.data.count;
        this.page = res.data.pageList;
      })
    },
    handleSelectionChange(val) {
      this.elTable = val;
      console.log(this.elTable);
    },

  
 
    //移交销售窗口
    pushToSale(row) {
      this.saleVisible = true;
      this.toInquiryNo = row.inquiryNo;
      this.toInquiryId = row.inquiryId;

      let obj = {};
      obj.pageSize = 10;
      obj.pageNum = 1;
      toSaleUser(obj).then(res => {
        this.saleList = res.data.list;
      });
    },
    selectGet1(vId) {
      //这个vId也就是value值
      let obj = {};
      obj = this.saleList.find(item => {
        //这里是上面遍历的数据源
        return item.sysuserId === vId; //筛选出匹配数据
      });
      console.log(obj.sysuserId);
      this.sysuserName = obj.sysuserName;
    },
    //移交销售
     saveSale() {
      let obj = {};
      obj.sysuserName = this.sysuserName;
      obj.inquiryId = this.toInquiryId;
      obj.sysuserId = this.form.toSale;
        if(obj.sysuserName!==''&&obj.sysuserId!==''){
          toSalesRepresentative(obj).then(res => {
            if (res.code === 200) {
              throttleTipPop(this, "success", "移交销售员成功", 2000);
              this.saleVisible = false;
              this.resetData();
              this._getInquiry();
            }
          });
        }else{
          throttleTipPop(this, "error", "请选择销售员", 2000);
        }
    },
  }
};
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
#offer1 {
  .el-dialog__body {
    padding: 0 !important;
    background: none !important;
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
  .mail-fitter {
    .mail-wrapper {
      padding: 20px;
      padding-bottom: 0;
      border: 1px solid rgb(215, 224, 241);
      background: #fff;
      .title1 {
        margin-left: -20px;
        font-size: 16px;
        font-weight: 400;
        color: 3333;
        padding-left: 10px;
        line-height: 1.4;
        border-left: 4px solid $themeColor;
        margin-bottom: 23px;
      }
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
  }

  .line-div {
    overflow: hidden;
      .small-Idiv{
        width: 50%;
        padding-top: 10px;
        float: left;

      } 
  }

  .fuzhi {
    background: rgba(229, 162, 75, 1);
  }
  .huishouzhan {
    background: rgba(247, 108, 110, 1);
  }
  .el-select-width {
    max-width: 300px;
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
  .el-select {
    width: 100% !important;
  }
  //自定义表格样式
  .martop {
    margin-top: 10px;
  }
  .imgitem {
    display: flex;
    align-items: center;
    img {
      width: 24px;
      height: 24px;
      margin-right: 10px;
    }
  }

  .more {
    cursor: pointer;
  }
  .mores {
    padding-top: 110px;
    box-sizing: border-box;
  }
  .blue {
    color: #4a99fa !important;
    cursor: pointer;
  }
  .goods_num {
    color: #f66c6c !important;
    font-size: 16px;
    margin-right: 5px;
  }
  .leftbottom {
    color: #4a99fa;
    border-bottom: 1px dashed rgba(215, 220, 231, 1);
    padding-bottom: 8px;
  }


  .mcard1 {
    border: 1px solid #d7e0f1;
    margin-top: 20px;
  }
  .pushTip {
    padding-left: 98px;
    padding-right: 70px;
    .star {
      color: red;
    }
  }
  .txt_red {
    color: #f66c6c;
  }

.el-input-group__append button.el-button {
  width:50px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
.tip{
  margin-top:-30px;
  text-align: center;
  line-height: 22px;
  .tipImg{
    position: relative;
    left: -16px;
    top:28px;
  }                     
}
   /deep/ .el-dialog__headerbtn{
      top:10px;
    }

}
</style>
