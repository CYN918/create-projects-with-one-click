<template>
  <div id="signing">
    <div class="margin0">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">签定合同</h4>
              <div class="search-base">
                <el-row>
                  <el-col :span="5">
                    <el-col>
                      <el-form-item label="签定状态：">
                        <el-col :span="21">
                          <el-select v-model="form.submitApprovalStatus">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            ></el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="销售单号：">
                      <el-col :span="21">
                        <el-input placeholder="请输入销售单号" v-model="form.saleOrderNo"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="客户：">
                      <el-col :span="21">
                        <el-input v-model="form.customerName" placeholder="请输入客户名称/姓名/电话"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="primary" size="small" @click="searchOrder()">查询</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mcard" style="border:1px solid #d7e0f1">
        <div class="mbottom">
          <el-row>
            <el-button type="primary" size="small" @click="addPDF">单据生成PDF</el-button>
          </el-row>
        </div>
        <el-table
          :data="orderData"
          border
          @selection-change="handleSelectionChange"
          :row-class-name="tableRowClassName"
          :row-style="selectedHighlight"
          @row-dblclick="AhandleSelectionChange"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="white"
        >
          <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
          <el-table-column label="客户信息" prop="name" align="center" width="300">
            <template slot-scope="scope">
              <div class="txt_left">名称：{{scope.row.customerName}}</div>
              <div class="txt_left">部门：{{scope.row.department}}</div>
              <div class="txt_left">联系人：{{scope.row.customerContact}}</div>
              <div class="txt_left">联系电话：{{scope.row.tel}}</div>
              <div class="txt_left">手机：{{scope.row.phone}}</div>
            </template>
          </el-table-column>
          <el-table-column label="销售订单信息" prop="name" align="center" width="300">
            <template slot-scope="scope">
              <div class="txt_left">销售单号：{{scope.row.saleOrderNo}}</div>
              <div class="txt_left">经销商：{{scope.row.agencyName}}</div>
              <div class="txt_left">平台名称：{{scope.row.projectName}}</div>
              <div class="txt_left">创建时间：{{scope.row.createTime}}</div>
              <div class="txt_left">销售员：{{scope.row.bizUserName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="订单金额" prop="name" align="center">
            <template slot-scope="scope">{{scope.row.orderTotalAmount}}</template>
          </el-table-column>
          <el-table-column label="发票类型" prop="name" align="center">
            <template slot-scope="scope">{{scope.row.invoiceType}}</template>
          </el-table-column>
          <el-table-column label="进度表" prop="name" align="center" width="200">
            <template slot-scope="scope">
              <div class="txt_left">订单状态：</div>
              <div class="txt_left" v-html="scope.row.billStatus"></div>
              <div class="txt_left">合同状态：</div>
              <div class="txt_left" v-html="scope.row.contractStatus"></div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="150">
            <template slot-scope="scope">
              <div class="line-div">
                <div
                  class="small-Idiv"
                  @click="Signature(scope.row)"
                  v-permit="'SaleOrder:signContract'"
                >
                  <div class="i-div">
                    <img src="@/common/images/icon/合同签定.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;">合同签订</span>
                </div>
                <div
                  class="small-Idiv"
                  @click="detailContract1(scope.row)"
                  v-permit="'SaleOrder:detailSaleContract'"
                >
                  <div class="i-div">
                    <img src="@/common/images/icon/查看详情.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;">详情</span>
                </div>
                <div
                  class="small-Idiv"
                  @click="editContractS(scope.row)"
                  v-show="form.auditStatus!=1"
                  v-permit="'SaleOrder:editSaleContract'"
                >
                  <div class="i-div">
                    <img src="@/common/images/icon/编辑.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;">编辑</span>
                </div>
                <div
                  class="small-Idiv"
                  @click="deleteAuditView(scope.row)"
                  v-permit="'SaleOrder:deleteSaleContract'"
                >
                  <div class="i-div">
                    <img src="@/common/images/icon/回收站.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;">删除</span>
                </div>
                <div
                  class="small-Idiv"
                  @click="addPurchasing(scope.row)"
                  v-permit="'SaleOrder:pur_app'"
                >
                  <div class="i-div">
                    <img src="@/common/images/icon/推送审核.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;">采购申请</span>
                </div>
                <div
                  class="small-Idiv"
                  @click="changeGoods(scope.row)"
                  v-permit="'SaleOrder:change_good'"
                >
                  <div class="i-div">
                    <img src="@/common/images/icon/变更商品.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;">变更商品</span>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination">
          <el-pagination
            @size-change="getHandleSizeChange"
            @current-change="getHandleCurrentChange"
            :current-page="form.pageIndex"
            :page-sizes="[5,10,30,50]"
            :page-size="form.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="form.total"
          ></el-pagination>
        </div>
      </div>
      <!-- 推送审核 -->
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
            >销售订单【{{this.showNo}}】的商品明细</li>
          </ul>
        </div>
        <div class="tabs-content">
          <component :is="mainIndex" :count="count" :page="page" :showNo="showNo"></component>
        </div>
      </div>
      <!-- //签订合同 -->
      <el-dialog width="70%" :visible.sync="auditVisible" :before-close="auditClosing">
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form label-width="100px" size="small">
              <div class="search-wrapper">
                <h4 class="title">合同签订</h4>
              </div>
            </el-form>
          </div>
        </div>
        <div class="mcard0">
          <div class="mcard">
            <h4 class="title">合同信息</h4>

            <el-form ref="infoForm" :model="form" :rules="rules" label-width="95px" size="small">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="合同类型 ：">
                    <span>销售订单合同</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同编号：">
                    <span>{{detailData.contractNo}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="业务单号：">
                    <span>{{detailData.businessNo}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="签订状态：" prop="sigingType">
                    <el-select v-model="form.sigingType">
                      <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="签订日期：" prop="sigingTime">
                    <el-col :span="20">
                      <el-date-picker
                        v-model="form.sigingTime"
                        type="date"
                        valueFormat="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期"
                        style="width:100%"
                        :picker-options="pickerOptions0"
                      ></el-date-picker>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="23">
                  <el-form-item label="备注：" v-if="form.sigingType===1">
                    <el-input v-model="form.signRemark"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="23">
                  <el-form-item label="备注：" prop="signRemark" v-if="form.sigingType===2">
                    <el-input v-model="form.signRemark"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
        <div class="mail-fitter" style="margin-top:20px;margin-bottom:20px;">
          <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px">
            <div class="mail-wrapper">
              <h4 class="title1">产品清单</h4>
              <div class="search-base">
                <div class="mbottom">
                  <div class="goods-fitter">
                    <div class="mcard" style="padding-bottom:0">
                      <el-table
                        :data="detailData.goodsDetailListVo"
                        border
                        style="width: 100%"
                        stripe
                      >
                        <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
                        <el-table-column prop="customerName" label="图样" align="center" width="120">
                          <template slot-scope="scope">
                            <img
                              :src="scope.row.goodsImgUrl"
                              class="showImg"
                              alt
                              v-if="scope.row.goodsImgUrl"
                            />
                            <img
                              src="@/common/images/缺省页.jpg"
                              class="showImg"
                              alt
                              v-if="!scope.row.goodsImgUrl"
                            />
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="customerType"
                          label="商品信息"
                          align="center"
                          width="180"
                        >
                          <template slot-scope="scope">
                            <div class="txt_left">商品名称：{{scope.row.goodsName}}</div>
                            <div class="txt_left">货号{{scope.row.goodsSn}}</div>
                            <div class="txt_left">品牌{{scope.row.brandName}}</div>
                            <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                            <div class="txt_left">SKU：无</div>
                          </template>
                        </el-table-column>
                        <el-table-column prop="commonContactDept" label="税率" align="center">
                          <template slot-scope="scope">{{scope.row.taxRate}}</template>
                        </el-table-column>
                        <el-table-column prop="commonContactDept" label="数量" align="center">
                          <template slot-scope="scope">{{scope.row.goodsCount}}</template>
                        </el-table-column>
                        <el-table-column label="不含税单价" align="center">
                          <template slot-scope="scope">{{scope.row.notTaxPrice}}</template>
                        </el-table-column>
                        <el-table-column label="税费" align="center">
                          <template slot-scope="scope">{{scope.row.tax}}</template>
                        </el-table-column>
                        <el-table-column label="含税单价" align="center">
                          <template slot-scope="scope">{{scope.row.goodsPrice}}</template>
                        </el-table-column>
                        <el-table-column prop="commonContactDept" label="合计" align="center">
                          <template slot-scope="scope">{{scope.row.totalPrice}}</template>
                        </el-table-column>
                        <el-table-column label="收货地址" align="center" width="130">
                          <template slot-scope="scope">
                            <span>{{scope.row.deliveryAddress}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="设计稿" align="center" width="100">
                          <template slot-scope="scope">
                            <el-upload
                              size="small"
                              class="upload-demo"
                              :action="baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile'"
                              :on-success="handleAvatarSuccess"
                              :before-upload="beforeAvatarUpload"
                              :show-file-list="false"
                            >
                              <el-button
                                size="small"
                                type="primary"
                                @click="upLoad(scope.$index)"
                              >上传</el-button>
                            </el-upload>

                            <span
                              class="blue"
                              v-show="scope.row.fileDesignDraftUrl"
                              @click="preview(scope.row)"
                            >查看</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="commonContactDept" label="交货日期" align="center">
                          <template slot-scope="scope">{{scope.row.deliveryCycle}}</template>
                        </el-table-column>
                      </el-table>
                      <div class="total" style="margin-left:80%;margin-top:20px">
                        <el-form label-width="130px" size="small">
                          <el-form-item label="合计：">
                            <el-col :span="24">
                              <el-input v-model="total1"></el-input>
                            </el-col>
                          </el-form-item>
                        </el-form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-form>
        </div>
        <div class="mcard0">
          <div class="mcard">
            <h4 class="title">上传合同扫描件</h4>

            <el-form ref="infoForm" :model="form" :rules="rules" label-width="95px">
              <el-upload
                :action="this.baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile'"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" append-to-body>
                <img width="100%" :src="dialogImageUrl" alt />
                <span slot="footer" class="dialog-footer"></span>
              </el-dialog>
              <div class="tips">
                <span>说明：进行此操作前，如此销售单价格和客户信息有变动需提交修改好。</span>
                <br />
                <span>选择签订成功，必须上传签订好的合同扫描件.后面合同审核和收款要用到。</span>
                <br />
                <span>选择签订失败，必须在备注中写明原因。</span>
                <br />
              </div>
            </el-form>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="auditClose()" size="small">关 闭</el-button>
          <el-button type="primary" @click="auditSave" size="small">提交</el-button>
        </span>
      </el-dialog>

      <!-- 删除销售订单 -->
      <el-dialog :visible.sync="deleteVisible" width="20%" title="提示" style="top:20%">
        <div class="mail-fitter" style="padding:20px 0;background:#fff;">
          <div class="search-base">
            <div class="goods-fitter">
              <el-row>
                <div class="tip">
                  <img class="tipImg" src="@/common/images/组 180.png" alt />
                  <span>温馨提示：一经删除不可恢复记录！</span>
                  <br />
                  <span>你确定要删除所选内容吗？</span>
                </div>
              </el-row>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="deleteVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteOrder()" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 上传预览 -->
      <el-dialog :visible.sync="dialogVisible1" :modal="true" :append-to-body="false">
        <img width="100%" :src="previewImg" alt />
        <span slot="footer" class="dialog-footer"></span>
      </el-dialog>
      <!-- //编辑合同 -->
      <EditContract
        :closeId="closeId"
        :detailData="detailData"
        :editVisibles="editVisibles"
        @createClose1="createClose2"
        @createClosing1="createClosing2"
        @editContract="editContract1"
      ></EditContract>
      <!-- 合同详情 -->
      <DetailContract
        :detailData="detailData"
        :detailVisibles="detailVisibles"
        @createClose3="createClose4"
        @createClosing3="createClosing4"
      ></DetailContract>
      <!-- 采购申请 -->
      <AddPurchasing
        :closeId="closeId"
        :detailData2="detailData2"
        :addVisibles="addVisibles"
        @createCloseA="createCloseA1"
        @createClosingA="createClosingA1"
        @createOrederForm1="createOrederForm2"
      ></AddPurchasing>
      <!-- 变更商品 -->
      <ChangeGoods
        :changeData="changeData"
        :changeVisibles="changeVisibles"
        @createCloseC="createCloseC1"
        @createClosingC="createClosingC1"
        @saveChangeGoods1="saveChangeGoods2"
      ></ChangeGoods>
    </div>
  </div>
</template>

<script>
import { getCategory, getStoreList } from "@/api/public";
import { throttleTipPop } from "@/utils/functions.js";
import {
  addOrder,
  getOrder,
  getOrderGoods,
  deleteOrders,
  findOrders,
  downPDF,
  findContract,
  deleteImg,
  signContract,
  getOrderMs,
  findChangeGoodsOrder,
  uploadFileDesignDraftUrl
} from "@/api/sale/index";
import AccountOrder from "./oreder";
import EditContract from "./editContract";
import DetailContract from "./detailContract";
import AddPurchasing from "./addPurchasing";
import ChangeGoods from "./changeGoods";
export default {
  data() {
    return {
      pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        }, 
      mainIndex: "AccountOrder",
      currentIndex: 0,
      dataArr: [],
      imgArr: [], //上传数组
      upLoadIndex: "", //上传展示设计稿需要的下标
      addVisibles: false, //采购申请
      changeVisibles: false, //变更商品
      deleteVisible: false, //删除销售订单
      auditVisible: false, //推送审核弹窗
      auditVisible1: false, //审核弹窗
      previewImg: "", //预览设计稿
      dialogImageUrl: "",
      dialogVisible: false,
      dialogVisible1: false,
      disabled: false,
      editVisibles: false, //编辑合同
      detailVisibles: false, //查看合同
      orderId:'',//删除订单需要的ID
      orderDatas: [], //根据ID获得的销售订单详细
      orderData: [], //销售订单分页数据
      page: [], //商品明细分页
      page1: [],
      showNo: "", //展示商品时要用的编号
      count: [], //商品明细总数
      getIndex: "",
      closeId: "", //关闭ID
      closeNo: "",
      deleteId: "",
      detailData: "",
      detailData2: "",
      deletePath: "", //删除上传的url
      changeData: "", //根据ID获得的变更商品的数据
      form: {
        submitApprovalStatus: 0, //搜索审核状态
        pageIndex: 1,
        sizes: [10, 20, 50, 100],
        pageSize: 10,
        total: 0,
        to: 0, //推送给
        endTime: "", //截止日期
        auditType: 0, //审核状态
        signRemark: "", //备注
        saleOrderNo: "", //销售单号
        customerName: "", //客户名称
        sigingType: 1, //签定状态
        sigingTime: "", //签定日期
        cutCardFlag: 2, //切卡标识
        imgUrl: "" //上传图片路径
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "张小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      tableDatas: {
        currentPage: 1,
        sizes: [10, 20, 50, 100],
        size: 10,
        total: 0
      },
      options: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 30,
          label: "签订失败"
        },
        {
          value: 31,
          label: "签定成功"
        }
      ],
      options1: [
        {
          value: 0,
          label: "销售主管"
        },
        {
          value: 1,
          label: "总经理"
        },
        {
          value: 2,
          label: "董事长"
        }
      ],
      options2: [
        {
          value: 1,
          label: "签订成功"
        },
        {
          value: 2,
          label: "签订失败"
        }
      ],
      rules: {
        sigingTime: [
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ],

        signRemark: [
          { required: true, message: "此为必填项", trigger: ["blur", "change"] }
        ]
      }
    };
  },
  created() {
    this._getOrder();
  },
  computed: {
    total1() {
      let totals = 0;
      let _this = this;
      if (
        _this.detailData.goodsDetailListVo &&
        _this.detailData.goodsDetailListVo.length > 0
      ) {
        for (var i = 0; i < _this.detailData.goodsDetailListVo.length; i++) {
          if (_this.detailData.goodsDetailListVo[i].totalPrice !== "") {
            totals += parseFloat(
              _this.detailData.goodsDetailListVo[i].totalPrice
            );
          } else {
            totals = 0;
          }
        }
      }
      return totals;
    }
  },
  methods: {
    //签定合同关闭
    auditClosing(){
      this.$confirm('您确认要关闭吗？')
                    .then(_ => {
                this.auditVisible = false;
            })
            .catch(_ => {});
    },
    auditClose(){
      this.$confirm('您确认要关闭吗？')
                    .then(_ => {
                this.auditVisible = false;
            })
            .catch(_ => {});
    },
    //编辑合同
    createClose2: function(data) {
      this.editVisibles = data;
    },
    createClosing2: function(data) {
      this.editVisibles = data;
    },
    editContract1(data) {
      this.editVisibles = data;
      this._getOrder();
      this.resetData();
    },
    createClose4: function(data) {
      this.detailVisibles = data;
    },
    createClosing4: function(data) {
      this.detailVisibles = data;
    },
    //采购申请
    createCloseA1: function(data) {
      this.addVisibles = data;
    },
    createClosingA1: function(data) {
      this.addVisibles = data;
    },
    createOrederForm2(data) {
      this.addVisibles = data;
      this._getOrder();
      this.resetData();
    },
    //变更商品
    createCloseC1: function(data) {
      this.changeVisibles = data;
    },
    createClosingC1: function(data) {
      this.changeVisibles = data;
    },
    saveChangeGoods2: function(data) {
      this.changeVisibles = data;
      this._getOrder();
      this.resetData();
    },

    //采购申请
    addPurchasing(row) {
      this.closeId = row.orderId;
      this.closeNo = row.saleOrderNo;

      getOrderMs(row.orderId).then(res => {
        if (res.code === 200) {
          this.detailData2 = res.data;
          this.addVisibles = true;
        }
      });
    },
    //搜索
    searchOrder() {
      this.form.pageIndex = 1;
      this._getOrder();
      this.resetData();
    },
    //重置数据
    resetData() {
      this.page = [];
      this.count = 0;
      this.getIndex = "";
      this.showNo = "";
    },
    //变更商品
    changeGoods(row) {
      findChangeGoodsOrder(row.orderId).then(res => {
        this.changeData = res.data;
      });
      this.changeVisibles = true;
    },
    tabIndex(index) {
      this.currentIndex = index;
      switch (index) {
        case 0:
          this.mainIndex = "AccountOrder";
          break;
        default:
          return;
      }
    },
    //获取销售订单分页
    _getOrder() {
      getOrder(this.form).then(res => {
        this.orderData = res.data.pageList;
        this.form.total = res.data.count;
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
    //双击选定
    AhandleSelectionChange(row) {
      this.getIndex = row.index;
      this.closeId = row.orderId;
      this.showNo = row.saleOrderNo;

      let obj = {};
      obj.pageIndex = 1;
      obj.pageSize = 10;
      obj.saleOrderNo = row.saleOrderNo;
      getOrderGoods(obj).then(res => {
        this.count = res.data.count;
        this.page = res.data.pageList;
      });
    },
    //签订合同
    Signature(row) {
      this.closeId = row.orderId;
      this.closeNo = row.saleOrderNo;

      findContract(row.orderId).then(res => {
        if (res.code === 200) {
          this.detailData = res.data;
          this.auditVisible = true;
        }
      });
    },
    auditSave() {
      let obj = {};
      obj.contractFile = this.form.imgUrl;
      obj.orderId = this.closeId;
      obj.saleOrderNo = this.closeNo;
      obj.signTime = this.form.sigingTime;
      obj.contractStatus = this.form.sigingType;
      obj.signFailReason = this.form.signRemark;

      if (!obj.signTime || !obj.contractFile) {
        throttleTipPop(this, "error", "请填写签定日期或者上传合同扫描件", 2000);
      } else if (obj.contractStatus === 2) {
        if (!obj.signFailReason) {
          throttleTipPop(this, "error", "请填写备注", 2000);
        }
      } else {
        signContract(obj).then(res => {
          if (res.code === 200) {
            throttleTipPop(this, "success", "签订合同成功", 2000);
            this.auditVisible = false;
            this._getOrder();
            this.resetData();
          }
        });
      }
    },
    //编辑销售合同
    editContractS(row) {
      this.closeId = row.orderId;
      this.closeNo = row.saleOrderNo;

      findContract(row.orderId).then(res => {
        if (res.code === 200) {
          this.detailData = res.data;
          this.editVisibles = true;
        }
      });
    },
    //合同详情
    detailContract1(row) {
      findContract(row.orderId).then(res => {
        if (res.code === 200) {
          this.detailData = res.data;
          this.detailVisibles = true;
        }
      });
    },
    //删除订单
    deleteAuditView(row) {
      this.orderId = row.orderId;
      this.deleteVisible = true;
    },
    deleteOrder(){
      deleteOrders(this.orderId).then(res => {
        if (res.code === 200) {
          throttleTipPop(this, "success", "删除成功", 2000);
          this.deleteVisible = false;
          this._getOrder();
          this.resetData();
        }
      })
    },
    //获取上传那栏的下表
    upLoad(index) {
      this.upLoadIndex = index;
    },
    //上传成功
    handleAvatarSuccess(file) {
      this.detailData.goodsDetailListVo[this.upLoadIndex].fileDesignDraftUrl =
        file.data.domain + file.data.filePath;

      let obj = {};
      obj.fileDesignDraftUrl = this.detailData.goodsDetailListVo[
        this.upLoadIndex
      ].fileDesignDraftUrl;
      obj.sordId = this.detailData.goodsDetailListVo[this.upLoadIndex].sordId;
      uploadFileDesignDraftUrl(obj).then(res => {
        if (res.code === 200) {
          this.$message.success("上传设计稿成功！");
        }
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/jpg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error("上传的文件为图片格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return isJPG && isLt2M;
    },
    //预览设计稿
    preview(row) {
      this.previewImg = row.fileDesignDraftUrl;
      this.dialogVisible1 = true;
    },
    //上传成功
    handleSuccess(data) {
      let path = data.data.domain + data.data.filePath;
      var arrs = [];
      this.imgArr.push(path);
      arrs = this.imgArr;
      console.log(arrs);

      var strs = new Array(); //定义一数组
      strs = arrs.join("##");
      console.log(strs);
      this.form.imgUrl = strs;
    },
    //预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //删除
    handleRemove(file) {
      deleteImg(file.response.data.filePath).then(res => {});
      this.deletePath = file.response.data.domain + file.response.data.filePath;
      console.log(this.deletePath);
      let arr = [];
      arr = this.form.imgUrl.split("##");
      const index = arr.findIndex(item => item === this.deletePath);
      console.log(index);
      arr.splice(index, 1);
      this.form.imgUrl = arr;
      console.log(this.form.imgUrl);
      this.form.imgUrl = this.form.imgUrl.join("##");
    },
    //增加PDF
    addPDF() {
      if (!this.closeId) {
        throttleTipPop(this, "warning", "请选择要生成PDF的单据", 2000);
      } else {
        this.$router.push({ name: "CreatePDF", query: { id: this.closeId } });
      }
    },
    //主页换页
    getHandleSizeChange(val) {
      this.form.pageSize = val;
      this.resetData();
      this._getOrder();
    },
    getHandleCurrentChange(val) {
      this.form.pageIndex = val;
      this.resetData();
      this._getOrder();
    },

    handleSizeChange() {},
    handleCurrentChange() {},
    handleSelectionChange() {},
    handleChange() {}
  },
  components: {
    AccountOrder,
    EditContract,
    DetailContract,
    AddPurchasing,
    ChangeGoods
  }
};
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
#signing {
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
      padding-bottom: 10px;
      border: 1px solid rgb(215, 224, 241);
      background: #fff;
      .title {
        margin-left: -20px;
        font-size: 16px;
        color: 3333;
        padding-left: 10px;
        line-height: 1.4;
        border-left: 4px solid $themeColor;
        margin-bottom: 10px;
      }
      .title1 {
        margin-left: -20px;
        font-size: 14px;
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
  //
  .line-div {
     overflow: hidden;
      .small-Idiv{
        width: 50%;
        padding-top: 10px;
        float: left;

      } 
  }



  .i-div {
    cursor: pointer;
  }
  .margin1 {
    padding-left: 40px;
    padding-top: 20px;
    box-sizing: border-box;
  }
  .order {
    color: #4a99fa;
  }
  .mcard0 {
    border: 1px solid #d7e0f1;
    margin-top: 20px;
  }
  .tips {
    position: relative;
    top: 6px;
    left: 0px;
    font-size: 11px;
    color: #909399;
  }
  .tip {
    margin-top: -30px;
    text-align: center;
    line-height: 22px;
    .tipImg {
      position: relative;
      left: -16px;
      top: 28px;
    }
  }
  /deep/ .el-dialog__headerbtn {
    top: 10px;
  }
  .showImg {
    width: 100px;
    height: 100px;
  }
  .blue {
    cursor: pointer;
    color: #4a99fa;
  }
  //上传样式
  /deep/.upload-demo {
    /deep/ .el-upload {
      border: 0 !important;
    }
  }
}
</style>