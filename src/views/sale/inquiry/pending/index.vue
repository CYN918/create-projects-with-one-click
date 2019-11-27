<template>
  <div id="offer">
    <div class="margin0">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">报价单</h4>
              <div class="search-base">
                <el-row>
                  <el-col :span="5">
                    <el-col>
                      <el-form-item label="报价单号：">
                        <el-col :span="21">
                          <el-input v-model="forms.enquiryNumber" placeholder="请输入报价单号"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="5">
                    <el-col>
                      <el-form-item label="客户：">
                        <el-col :span="21">
                          <el-input v-model="forms.customerName" placeholder="请输入客户名称/联系人/手机"></el-input>
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
                  <el-col :span="5">
                    <el-col>
                      <el-form-item label="状态：">
                        <el-col :span="21">
                          <el-select v-model="forms.type" placeholder="请选择">
                            <el-option
                                v-for="item in options2"
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
                     
                      <el-form-item label="询价单号：">
                        <el-col :span="21">
                            <el-input v-model="forms.inquiryNo" placeholder="请输入询价单号"></el-input>
                         </el-col>
                      </el-form-item>                
                  </el-col>
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
          <el-table-column prop="name" label="报价单状态" align="center" width="150">
            <template slot-scope="scope">
                <div v-html="scope.row.offerStatus"></div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="报价单信息" align="center" width="260">
            <template slot-scope="scope">
              <div class="txt_left"><span style="margin-right:5px">报</span><span style="margin-right:5px">价</span><span style="margin-right:5px">单</span>号：{{scope.row.offerNo}}</div>
              <div class="txt_left"><span style="margin-right:5px">报</span><span style="margin-right:5px">价</span><span style="margin-right:5px">日</span>期：{{scope.row.offerDate}}</div>
              <div class="txt_left">关联询价单：{{scope.row.inquiryNo}}</div>
              <div class="txt_left"><span style="margin-right:5px">报</span><span style="margin-right:5px">价</span><span style="margin-right:5px">期</span>限：{{scope.row.offerEndTime | date}}</div>
            </template>
          </el-table-column>

          <el-table-column prop="name" label="客户信息" align="center" width="220" >
            <template slot-scope="scope">
              <div class="txt_left">
                客户名称：{{scope.row.customerName}}
              </div>
              <div class="txt_left"><span style="margin-right:7px">联</span><span style="margin-right:7px">系</span>人：{{scope.row.customerContact}}</div>
              <div class="txt_left">联系电话：{{scope.row.phone}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="发票信息" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.invoiceType | invoice}}</div>
              <!-- <div v-if="scope.row.invoiceType!==0">税率：{{scope.row.invoiceTaxRate}}</div> -->
            </template>
          </el-table-column>
          <el-table-column prop="name" label="报价单位信息" align="center" width="260">
            <template slot-scope="scope">
                    <div class="txt_left"><span style="margin-right:14px">名</span>称：{{scope.row.offerCompany}}</div>
              <div class="txt_left">联系人：{{scope.row.offerContact}}</div>
              <div class="txt_left"><span style="margin-right:14px">电</span>话：{{scope.row.offerTel}}</div>
              <div class="txt_left"><span style="margin-right:14px">邮</span>箱：{{scope.row.offerEmail}}</div>

            </template>
          </el-table-column>
          <el-table-column prop="name" label="销售代表" align="center">
            <template slot-scope="scope">{{scope.row.inputUserName}}</template>
          </el-table-column>
          <el-table-column prop="name" label="备注" align="center">
            <template slot-scope="scope">
                <div class="txt_left">
                  备注：{{scope.row.remark}}
                </div>
               
              </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="150">
            <template slot-scope="scope">
              <div class="line-div">
                <div class="small-Idiv" @click="preview(scope.row)" 
                v-permit="'offer:preview'">
                  <div class="i-div">
                    <img src="@/common/images/icon/预览.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;">预览</span>
                </div>
                <div
                  class="small-Idiv"
                  @click="deleteData(scope.row)"
                  v-permit="'offer:delete'">
                  <div class="i-div">
                    <img src="@/common/images/icon/回收站.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;">删除</span>
                </div>
                <div
                  class="small-Idiv"
                  @click="createOrder(scope.row)"
                  v-permit="'offer:genOrder'">
                  <div class="i-div">
                    <img src="@/common/images/icon/生成单.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;">生成订单</span>
                </div>

                <div class="small-Idiv" @click="editInquirySheet(scope.row)"
                v-permit="'offer:edit'">
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
            >报价单【{{this.showNo}}】的商品明细</li>
          </ul>
        </div>
        <div class="tabs-content">
          <component :is="mainIndex" :count="count" :page="page" :showNo="showNo" :closeId="closeId"></component>
        </div>
      </div>

      <!-- 新增客户询价组件 -->
      <CreateOrder
        @close="closer"
        @beClose="beCloser"
        @createOrder1="createOrder2"
        :addVisibles="addVisibles"
        :editDatasB="editDatasB"
        :createId="createId"
      ></CreateOrder>
      <!-- 生成报价单组件 -->
      <EditOrder
        :editVisibles="editVisibles"
        :editDatasA="editDatasA"
        @createClose1="createClose2"
        @createClosing1="createClosing2"
        @editInquiry2="editInquiry3"
      ></EditOrder>
      <!-- 预览弹窗 -->
      <Look
        :lookVisibles="lookVisibles"
        :editDatasC="editDatasC"
        @lookClose1="lookClose2"
        @lookClosing1="lookClosing2"
     
      ></Look>
     
 
      <!-- 删除询价 -->
      <el-dialog :visible.sync="deleteVisible" width="20%" title="提示" style="top:20%">
        <div class="mail-fitter" style="padding:20px 0;background:#fff;">
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
  deleteOffer,
  closeInquiry,
  getInGood,
  findInquiry,
  saleInquirys,
  toSaleInquirys,
  toSaleUser,
  editInquiry,
  getQuotation,
  findOrder,
  findOrderGoods,
  previewOrder
} from "@/api/sale/index";
import { getCategory, getStoreList } from "@/api/public";
import { getAllcustomer } from "@/api/customer";
import { throttleTipPop } from "@/utils/functions.js";
import Goods from "./goods";
import CreateOrder from "./createOrder";
import EditOrder from "./editOrder";
import Look from './look'
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
    CreateOrder,
    EditOrder,
    Look
  },
  data() {
    return {
      lookVisibles:false, //预览弹窗
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
      showNo:'',//显示商品列表需要的编号
      toInquiryId: "", //转交采销需要的ID
      toInquiryNo: "", //转交采销需要的单号
      organizeName: "", //所属组名称
      sysuserName: "", //销售名称
      createId: "",
      color: "",
      value1: "",
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
      forms: {
        enquiryNumber: "", //询价单号,
        customerName: "", //客户
        invoiceType: "", //发票状态
        productSearch: "", //产品搜索
        creatTime: [], //新增时间
        inquiryNo:'',//玄机单号
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
        invoiceType: "0", //发票类型
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
      editDatasC :{},
      editGoodsData: [],
      list: [], //客户列表
      customerData: [], //客户数据
      index: "",
      elTable: [],
      count: "",
      page: "",
       options1: [
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
        },
      ],
       options2: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "待生成销售订单"
        },
        {
          value: 2,
          label: "已生成销售订单"
        }
      ],
      rules: {
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
      }
    };
  },
  created() {
    this._getGoods();
    this._getQuotation();
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
    //预览报价单
    lookClose2:function(data){
      this.lookVisibles = data
    },
    lookClosing2:function(data){
      this.lookVisibles =data
    },
    //编辑报价单
    createClose2: function(data) {
      this.editVisibles = data;
    },
    createClosing2: function(data) {
      this.editVisibles = data;
    },
    editInquiry3: function(data) {
      this.editVisibles = data;
      this._getQuotation();
      this.resetData();
    },
    //生成销售订单
    closer: function(data) {
      this.addVisibles = data;
    },
    beCloser: function(data) {
      this.addVisibles = data;
    },
    createOrder2:function(data){
      this.addVisibles = data;
      this._getQuotation();
      this.resetData();
    },
    tabIndex(index) {
      this.currentIndex = index;
    },
    //查询
    inSearch() {
      this.forms.pageIndex = 1;
      getQuotation(this.forms).then(res => {
        if (res.code === 200) {
          console.log(res);

          this.inquiryData = res.data.pageList;
          this.forms.total_count = res.data.count;
        }
        this.resetData();
        
      });
    },
    //重置数据
    resetData(){
        this.count = 0;
        this.page = [];
        this.getIndex ='';
        this.showNo = '';
    },
    //删除询价单弹窗
    deleteData(row) {
      console.log(row);
      this.deleteVisible = true;
      this.deleteNo = row.inquiryNo;
      this.deleteId = row.offerId;
    },

    //删除询价单
    deleteInquirys() {
      deleteOffer(this.deleteId).then(res => {
        if (res.code === 200) {
          throttleTipPop(this, "success", "删除成功", 2000);
          this.deleteVisible = false;
          this._getQuotation();
          this.resetData();
        } else {
          return false;
        }
      });
    },
    addHandleSizeChange(val) {
      this.formData.page_size = val;
      this._getGoods();
    },
    addHandleCurrentChange(val) {
      this.formData.current_page = val;
      this._getGoods();
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    AhandleSizeChange(val) {
      this.forms.page_size = val;
      this.resetData();
      this._getQuotation();
    },
    AhandleCurrentChange(val) {
      this.forms.current_page = val;
      this.resetData();
      this._getQuotation();
    },
  
   //生成订单
    createOrder(row) {
      this.addVisibles = true;
      this.createId = row.offerId;
        findOrder(row.offerId).then(res => {
        this.editDatasB = res.data;
       /*  let arr =this.editDatasB.goodsDetailEditVo
       arr.forEach(v=>{
        v['customerBudget']=''
        v['offerCost']=''
        v['total'] = ''
      }) */
  /*      var copy = JSON.parse(JSON.stringify(arr))
       this.editDatasB.goodsDetailEditVo = copy */
      console.log(this.editDatasB.goodsDetailEditVo);
      });
    },
    //编辑询价单
    editInquirySheet(row) {
      console.log(row);
      
      this.editVisibles = true;
      this.createId = row.offerId;
      findOrder(row.offerId).then(res => {
        console.log(res);
        
        this.editDatasA = res.data;
      /*  let arr =this.editDatasA.goodsDetailEditVo
       arr.forEach(v=>{
        v['customerBudget']=''
        v['offerCost']=''
        v['total'] = ''
      })
       var copy = JSON.parse(JSON.stringify(arr))
       this.editDatasA.goodsDetailEditVo = copy */
      console.log(this.editDatasA.goodsDetailEditVo);
        
      });
    },

    //查询报价单分页
    _getQuotation() {
      getQuotation(this.forms).then(res => {
        if (res.code === 200) {
          console.log(res);
          
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
      this.showNo = row.offerNo;
      this.closeId = row.offerId;
      
      let obj ={};
      obj.pageIndex = 1;
      obj.pageSize = 10;
      obj.offerNo = row.offerNo
      findOrderGoods(obj).then(res => {
        this.count = res.data.count;
        this.page = res.data.pageList;
      });
    },
    handleSelectionChange(val) {
      this.elTable = val;
      console.log(this.elTable);
    },
    preview(row){
        this.lookVisibles = true;
        previewOrder(row.offerId).then(res=>{
          this.editDatasC = res.data
          
        })

        
    }
  }
};
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
#offer {
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
