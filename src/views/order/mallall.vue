<template>
  <div class="allorder">
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">搜索条件</h4>
            <div class="search-base serch-time">
              <el-row>
                <el-col :span="5" style="min-width:342px">
                  <el-col>
                    <el-form-item label="下单时间：">
                      <el-col :span="23">
                        <el-date-picker
                          type="daterange"
                          valueFormat="yyyy-MM-dd HH:mm:ss"
                          v-model="form.timer"
                          range-separator="-"
                          :default-time="['00:00:00', '23:59:59']"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          @change="_getAllorder(true)"
                        ></el-date-picker>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="6">
                  <el-col>
                    <el-form-item label="关键字：">
                      <el-col :span="12">
                        <el-select
                          class="el-select-width"
                          v-model="form.keyWordType"
                          placeholder="请选择"
                          clearable
                        >
                          <el-option label="根据订单编号" value="1"></el-option>
                          <el-option label="按货号搜索" value="2"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="12">
                        <el-input v-model="form.keyWordValue" clearable placeholder="请输入关键字"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <!-- <el-col :span="4">
                  <el-col>
                    <el-form-item label="订单来源：">
                      <el-col :span="23">
                        <el-select
                          class="el-select-width"
                          v-model="form.fromType"
                          placeholder="请选择"
                          clearable
                          @change="_getAllorder(true)"
                        >
                          <el-option label="积分商城" value="1"></el-option>
                          <el-option label="集采" value="2"></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col> -->
                <el-col :span="8" class="btn_right">
                  <el-button type="primary" size="small" @click="_getAllorder(true)">查询</el-button>
                  <el-button type="primary" size="small" @click="exportOrder" v-permit="'orderServer:export'">导出订单</el-button>
                  <el-button type="primary" size="small" @click="_getAllorder(true,true)" v-permit="'orderServer:selection'">按供应商排序</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mcard othertable">
      <div style="width:100%;overflow-x: auto;">
        <div class="allorder all2">
          <el-table
            :data="tableData"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="white"
            style="width:1553px;overflow: hidden;"
            border
            :span-method="arraySpanMethod"
            @select="choose"
            @select-all="chooseAll"
          >
            <el-table-column type="selection" width="55" align="center" :resizable="false"></el-table-column>
            <el-table-column label="商品详情" align="center" width="260" :resizable="false">
              <template slot-scope="scope" style="height:200px">
                <div class="information" style="width:1500px">
                  <i class="iconfont icon-jiaji" v-if="scope.row.urgent == 1"></i>
                  <span v-if="sysuserType !=1 " :class="scope.row.pushStatus ===0 && scope.row.pushGroup === 0 ?'notpush':'havepush'">{{scope.row.pushStatus ===0 && scope.row.pushGroup === 0 ?'未推送供应商':'已推送供应商'}}</span>
                  <span class="tent_span">订单编号：{{scope.row.orderSn}}</span>
                  <span class="tent_span">下单时间：{{scope.row.createTime}}</span>
                  <span class="tent_span">共{{scope.row.goodsNumber}}件商品</span>
                  <span class="tent_span">订单总价：{{scope.row.totalAmount}}元</span>
                  <span class="tent_span">下单账号：{{scope.row.userName}}</span>
                  <span class="tent_span" style="color: #4b99fb;">支付方式：{{scope.row.payName}}</span>
                  <span class="addfocus">
                    <el-button
                      type="primary"
                      size="small"
                      @click="orderMarkingfunc(scope.row)"
                      v-if="scope.row.orderStatus == '1' && scope.row.payStatus == '2' && (scope.row.shippingStatus == '0' || scope.row.shippingStatus == '4')"
                    >{{scope.row.urgent == 0?'添加标记':'取消标记'}}</el-button>
                    <el-button
                      type="primary"
                      size="small"
                      @click="orderDetail(scope.row.orderId)"
                    >查看详情</el-button>
                  </span>
                </div>
                <div class="content" v-for="(item,index) in scope.row.orderGoodsList" :key="index">
                  <div :class="index!=0?'tent_div tent_top':'tent_div'">
                    <div class="name_div">
                      <img class="content_img" :src="item.thumbnailImgUrl" alt />
                      <div>
                        <p class="name">{{item.goodsName}}</p>
                      </div>
                    </div>
                    <div style="width:195px;padding-left:5px">
                      <div>品牌：{{item.brandName}}</div>
                      <div>型号：{{item.modelNumber}}</div>
                      <div>货号：{{item.goodsSn}}</div>
                      <div>skuId：{{item.skuId}}</div>
                    </div>
                    <span style="width:150px">{{item.goodsAttr}}</span>
                    <div style="width:150px">
                      <div>经销商：{{scope.row.agencyName}}</div>
                      <div>客户平台：{{scope.row.systemName}}</div>
                    </div>
                    <span style="width:90px">{{item.goodsPrice}}</span>
                    <span style="width:90px">{{item.quantity}}</span>
                    <span style="width:90px">{{item.specialPrice}}</span>
                    <span style="width:90px">{{item.goodsAmount}}</span>
                    <span style="width:90px">{{item.customRequirements}}</span>
                    <span style="width:110px">{{scope.row.orderType==3?'京东':scope.row.orderType==4?'网易':scope.row.orderType==5?'苏宁':scope.row.supplierName}}</span>
                    <span style="width:70px">{{item.deliveryTime}}</span>
                    <div class="btn_div">
                      <span>{{scope.row.statusMsg}}</span>
                      <span>
                        <el-button
                          type="primary"
                          size="small"
                          v-if="(scope.row.shippingStatus== 0 || scope.row.shippingStatus== 4)&& scope.row.payStatus == 2 && (  scope.row.orderStatus != 5 &&  scope.row.orderStatus != 2)  && sysuserType ==1"
                          @click="delivery(scope.row,true,index)"
                        >发货</el-button>
                      </span>
                      <span>
                        <el-button
                          type="primary"
                          size="small"
                          v-if="scope.row.shippingStatus == 0 && scope.row.orderType== 1 &&  (  sysuserType == 0 || sysuserType == 3 )"
                          v-permit="'Supplier:selection'"
                          @click="choseSupplierfunc(item,scope.row)"
                        >选择供应商</el-button>
                      </span>
                      <div v-if="scope.row.payStatus == 2 &&  (scope.row.orderStatus == 5 || scope.row.orderStatus == 4) && sysuserType != 1 && item.afterSaleStatus ==0">
                        <el-button type="primary" size="small" @click="aftersales(scope.row)">申请售后</el-button>
                      </div>
                      <div style="margin-top:5px" v-if="scope.row.orderStatus != 1 && scope.row.orderStatus != 2  && scope.row.shippingStatus != 0">
                        <el-button type="primary" size="small" @click="logistics(scope.row)">物流信息</el-button>
                      </div>
                      <div style="margin-top:5px" v-if="scope.row.isAudit == true">
                        <el-button type="primary" size="small" @click="audit(scope.row)" v-permit="'orderServer:audit'">审核</el-button>
                      </div>
                    </div>
                    <!-- <span style="margin:-13px;width:100px">
                    <el-button
                      type="warning"
                      size="small"
                      v-if="scope.row.shippingStatus == 0 && scope.row.orderType== 1"
                      @click="choseSupplierfunc"
                    >选择供应商</el-button>
                  </span>
                  <span style="margin:12px;width:100px">
                    <el-button
                      type="warning"
                      size="small"
                      @click="deliverGoods = true"
                      v-if=" scope.row.shippingStatus == 0  && scope.row.orderType== 1 && scope.row.reciveAddress== null"
                    >填写地址</el-button>
                    </span>-->
                  </div>
                </div>
                <aftermarket v-if="scope.row.show"  :logisticsdata='scope.row'></aftermarket>
              </template>
            </el-table-column>
            <el-table-column :resizable="false" label="商品信息" align="center" width="200"></el-table-column>
            <!-- <el-table-column :resizable="false" label="客户平台" align="center" width="80"></el-table-column> -->
            <el-table-column :resizable="false" label="规格尺寸" align="center" width="150"></el-table-column>
            <el-table-column :resizable="false" label="订单来源" align="center" width="150"></el-table-column>
            <el-table-column :resizable="false" label="商城价" align="center" width="90"></el-table-column>
            <el-table-column :resizable="false" label="数量" align="center" width="90"></el-table-column>
            <el-table-column :resizable="false" label="结算价" align="center" width="90"></el-table-column>
            <el-table-column :resizable="false" label="合计" align="center" width="90"></el-table-column>
            <el-table-column :resizable="false" label="定制要求" align="center" width="90"></el-table-column>
            <el-table-column :resizable="false" label="供应商" align="center" width="110"></el-table-column>
            <el-table-column :resizable="false" label="交货时间" align="center" width="100"></el-table-column>
            <el-table-column :resizable="false" label="状态/操作" align="center" width="78"></el-table-column>
          </el-table>
        </div>
      </div>

      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.pageIndex"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="form.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="form.total_count"
        ></el-pagination>
      </div>
      <el-dialog title="添加标记" :visible.sync="orderMarking" width="30%">
        <span>是否需要给订单添加加急标记？</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="orderMarking = false" size="small">取 消</el-button>
          <el-button type="primary" @click="sureTag" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 选择供应商 -->
      <div class="spicallist">
        <el-dialog title="供应商信息" :visible.sync="choseSupplier" width="65%">
          <div class="mbottom">
            <div class="goods-fitter">
              <div class="search-wrapper">
                <el-table :data="tableData" stripe style="width: 100%" border ref="elTable">
                  <el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
                  <el-table-column label="商品图片" align="center" width="120">
                    <template slot-scope="scope">
                      <div class="image" v-if="scope.row.skuInfo[scope.row.index].thumbnailImgUrl">
                        <img
                          :src="scope.row.skuInfo[scope.row.index].thumbnailImgUrl"
                          width="100"
                          height="100"
                          alt
                        />
                      </div>
                      <div v-if="!scope.row.skuInfo[scope.row.index].thumbnailImgUrl">暂无图片</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="商品信息" align="center" width="150">
                    <template slot-scope="scope">
                      <div class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
                      <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                      <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                      <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                      <div class="txt_left">来源：{{scope.row.gatherIn}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="价格信息" align="center" width="150">
                    <template slot-scope="scope">
                      <div
                        class="txt_left"
                      >税率：{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice != 0?scope.row.skuInfo[scope.row.index].priceInfo.taxRate:''}}</div>
                      <div
                        class="txt_left"
                      >一件代发价：{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice != 0?scope.row.skuInfo[scope.row.index].priceInfo.costPrice:'不支持一件代发'}}</div>
                      <div
                        class="txt_left"
                      >运费：{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice != 0?scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice:''}}</div>
                      <div
                        class="txt_left"
                      >京东价：{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice != 0?scope.row.skuInfo[scope.row.index].priceInfo.jdPrice:''}}</div>
                      <div
                        class="txt_left"
                      >{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice != 0?scope.row.skuInfo[scope.row.index].priceInfo.shopPrice:''}}</div>
                      <div
                        class="txt_left"
                      >{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice != 0?scope.row.skuInfo[scope.row.index].priceInfo.price:''}}</div>
                      <div
                        class="txt_left"
                        v-for="item in scope.row.skuInfo[scope.row.index].volumeInfo.volumePrices"
                        :key="item"
                      >
                        <div class="txt_left">{{item.volumeCost}}</div>
                        <div class="txt_left">{{item.volumeNumber}}</div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="商品规格" align="center" width="200">
                    <template slot-scope="scope">
                      <div style="height: 300px;overflow-y: auto;">
                        <div
                          class="txt_left martop"
                          v-for="(item,index) in scope.row.skuInfo"
                          :key="index"
                        >
                          <div
                            class="txt_left imgitem"
                            @click="Clicktent(index,scope.row)"
                            :class="[index == scope.row.index?'leftbottom':'']"
                          >
                            <div class="more">{{item.goodsSpecValues}}</div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="库存(PCS)" align="center" width="120">
                    <template slot-scope="scope">
                      <span class="goods_num">{{scope.row.skuInfo[scope.row.index].goodsNumber}}</span>
                      <div
                        class="txt_left"
                        style="margin-top: 40px;"
                      >库存预警：{{scope.row.skuInfo[scope.row.index].warnNumber}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="供应商" align="center" width="150">
                    <template slot-scope="scope">
                      <div
                        class="txt_left"
                        style="font-size:15px"
                      >{{scope.row.skuInfo[scope.row.index].suppliersName}}</div>
                      <div class="txt_left">联系人：{{scope.row.skuInfo[scope.row.index].contactName}}</div>
                      <div
                        class="txt_left"
                      >联系人电话：{{scope.row.skuInfo[scope.row.index].contactTelephone}}</div>
                      <div class="txt_left">QQ：{{scope.row.skuInfo[scope.row.index].contactQq}}</div>
                      <div class="txt_left">管理员：{{scope.row.adminName}}</div>
                      <div
                        class="txt_left"
                      >管理员手机/邮箱：{{scope.row.adminPhone+'/'+scope.row.adminPhone}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="结算方式" align="center"></el-table-column>
                  <el-table-column label="操作" align="center" width="100" fixed="right">
                    <template slot-scope="scope">
                      <div class="line-div small_top" style="padding-bottom: 0">
                        <div class="small-Idiv" @click="editor(scope.row.goodsId)">
                          <div class="i-div">
                            <img
                              src="../../common/images/icon/优先发货@2x.png"
                              alt
                              class="operation_img"
                            />
                          </div>
                          <span style="word-break: keep-all;margin-left: -12px;">优先发货</span>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="pagination">
                  <el-pagination
                    @size-change="handleSizeChange2"
                    @current-change="handleCurrentChange2"
                    :current-page="form.pageIndex2"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="form.pageSize2"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="form.total_count2"
                  ></el-pagination>
                </div>
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="choseSupplier = false" size="small">取 消</el-button>
            <el-button type="primary" @click="choseSupplier = false" size="small">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 选择供应商弹窗 -->

      <!-- 发货弹窗 -->
      <el-dialog title="商品发货" :visible.sync="dialogVisible" width="30%" v-loading="loading"
    element-loading-text="发货中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
        <div >
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="物流公司" prop="company">
              <el-select
                v-model="ruleForm.company"
                size="small"
                placeholder="请选择"
                @change="Courierfees"
              >
                <el-option
                  v-for="item in options"
                  :key="item.shippingId"
                  :label="item.shippingName"
                  :value="item.shippingId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="快递单号" prop="orderNo">
              <el-input v-model="ruleForm.orderNo" size="small"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="courier('ruleForm')" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <shipped-dialog :dialog="dialogVisiblesa" :passdata="passdata"  @closediv="changedia"></shipped-dialog>
    <!-- 审核弹框 -->
      <el-dialog
      title="审核"
      :visible.sync="auditDialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form  label-width="100px">
        <el-form-item label="审核状态:">
            <el-radio v-model="auditState"  :label="1">通过</el-radio>
            <el-radio v-model="auditState"  :label="2">不通过</el-radio>
        </el-form-item>
        <el-form-item label="审核原因:">
            <el-input type="textarea"
            :rows="2"

            v-model="auditTextarea"
            ></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="auditDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="examine" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import { getCategory, getStoreList } from "@/api/public";
import { getGoods, changeState, deleteGoods } from "@/api/product/index";
import {
  getTagorder,
  getCourier,
  deliveryFunc,
  jicaiGetAllorder,
  processingAuditTask,
  exportOrder
} from "@/api/order/index";
import { throttleTipPop } from '@/utils/throttle'
import shippedDialog from "./shippedDialog";
import request from '@/utils/request'
import aftermarket from "./detail/aftermarket";
export default {
  data() {
    return {
      loading: true,
      auditDialogVisible: false,
      auditState: 1,
      auditTextarea: '',
      sysuserType:0, //角色状态
      passdata:{},
      loading:false,
      form: {
        pageIndex: 1,
        pageSize: 10,
        total_count: 0,
        timer: "",
        keyWordType: "",
        keyWordValue: "",
        fromType: 2,
        sortBySupply: 0, //供应商排序
        orderIdArray: [], // 选中导出的数据
        requestStatus: ""
      },
      ruleForm: {
        company: "", //快递公司
        orderNo: "", //快递单号
        fees: "" //费用
      },
      rules: {
        company: [
          { required: true, message: "请选择快递公司", trigger: "change" }
        ],
        orderNo: [
          { required: true, message: "请填写快递单号", trigger: "blur" }
        ]
      },
      logisticsdata:{},
      options: [], // 快递公司
      action: "",
      fileValue: "", // 选择完文件的名称
      dialogVisible: false, // 发货弹窗
      deliverGoods: false, //发货
      dialogVisiblesa:false,// 申请售后
      uploading: false, // 上传物流单号
      choseSupplier: false, //选择供应商
      oldGoodsId: "", //旧商品ID
      orderId: "", //订单ID
      goosid: [], // 发货多个商品数组
      input: "",
      shippingCode: "", //配送方式编码
      shippingId: "", //配送方式ID
      shippingName: "", //配送名称
      bigObj: {}, // 上传表格id
      shopArr: [], // 商品的数组渲染
      adressobj: [], // 上传地址得到的obj
      orderArr: [], // 多选订单的数组
      choseSupplier: false, //选择供应商
      orderMarking: false, //添加标记
      input: "",
      tableData: [],
      orderId: "",
      auditrow: ''
    };
  },
  created() {
    this._getAllorder();
    const sysuer = JSON.parse(localStorage.getItem("user"))
    this.sysuserType = sysuer.data.sysuserType
  },
  computed: {},
  methods: {
    //审核
    audit(row){
       this.auditDialogVisible = true;
       this.auditrow = row;
    },
    //审核确定按钮
    examine(){
      //此处调取审核接口
      // console.log(this.auditrow)
      let userData = JSON.parse(window.localStorage.getItem("user")).data;
      // console.log(userData)
      let obj = {
        action: this.auditState,
        userId: userData.sysuserId,
        auditList: [{
            auditId:this.auditrow.auditId,
             taskId:this.auditrow.taskId,
        }],
        auditOpinion: this.auditTextarea
      }
      processingAuditTask(obj).then(res => {
        if(res.code == 200){
          this.$message({
            message: res.message,
            type: "success"
          });
          this.auditDialogVisible = false;
          this._getAllorder();
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    exportOrder() {
      // let type = JSON.parse(localStorage.getItem("user")).data.sysuserType;
      // let time = this.form.timer ? this.form.timer : ["", ""];
      // const obj  = this.form
      // obj.sysuserType = type
      // let orderIds = [];
      // this.orderArr.forEach((item) => {
      //   orderIds.push(item.orderId);
      // })
      var str = "";
      if(this.orderArr.length == 0){
        for (var i = 0; i < this.tableData.length; i++) {
            str += this.tableData[i].orderId+ ",";
        }
          //去掉最后一个逗号(如果不需要去掉，就不用写)
        if (str.length > 0) {
            str = str.substr(0, str.length - 1);
        }
      }else{
        for (var i = 0; i < this.orderArr.length; i++) {
            str += this.orderArr[i].orderId+ ",";
        }
        //去掉最后一个逗号(如果不需要去掉，就不用写)
        if (str.length > 0) {
            str = str.substr(0, str.length - 1);
        }
      }

       // console.log(str)
        exportOrder(str).then(res => {
          if(res.code == 200){
            var reader = new FileReader();
						reader.readAsDataURL(res);   // 转换为base64，可以直接放入a标签href
						reader.onload = function (e) {
							var a = document.createElement('a');
							a.download = '订单清单.xls';
							a.href = e.target.result;
							document.body.appendChild(a);    // 修复firefox中无法触发click
							a.click();
							a.remove();
						}
          }

					})

    },
    //导出excel表格
    exportExcel() {
      window.location.href =
        this.baseUrl1 +
        "/api/open/b/b2b2c/orderservice/order/export.json?orderId=" +
        this.orderId;
    },
    logistics(row){
      const index  = this.tableData.indexOf(row)
       this.tableData.forEach((item,index2) => {
         if(index2 != index){
           item.show = false
         }
      })
      this.tableData[index].show = !row.show
      this.logisticsdata = row
    },
    changedia(val) {
      this.dialogVisiblesa = val;
    },
    // 申请售后
    aftersales(data) {
      this.dialogVisiblesa = true;
      this.passdata = data
    },
    choseSupplierfunc() {
      this.choseSupplier = true;
    },
    orderMarkingfunc(val) {
      this.orderMarking = true;
      val.urgent == 0
        ? "是否需要给订单添加加急标记？"
        : "是否需要取消此订单的加急标记？";
      this.orderId = val.orderId;
    },
    //发货
    delivery(data, state, index) {
      this.ruleForm.company = "";
      this.ruleForm.orderNo = "";
      this.goosid = [];
      this.ruleForm.fees = "";

      this.orderId = data.orderId;
      if (this.orderArr.length == 0) {
        this.dialogVisible = true;
        if (state) {
          this.goosid.push(data.orderGoodsList[index].skuId);
        }
      } else if (this.orderArr.length && this.orderArr.length == 1) {
        this.dialogVisible = true;
        this.orderArr[0].orderGoodsList.forEach(item => {
          this.goosid.push(item.skuId);
        });
      } else {
        throttleTipPop(this,'error','请不要选择多个订单发货')
      }
      getCourier(data.orderId).then(res => {
        this.options = res.data.shipping;
      });
    },
    sureTag() {
      getTagorder(this.orderId).then(res => {
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.orderMarking = false;
        }
      });
      this._getAllorder();
    },
    //快递单号确定
    courier(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let obj = {};
          this.loading = true
          obj.skuIds = this.goosid;
          obj.goodsIds = this.goosid;
          obj.logisticsNo = this.ruleForm.orderNo;
          obj.orderId = this.orderId;
          obj.shippingCode = this.shippingCode;
          obj.shippingId = this.shippingId;
          obj.shippingName = this.shippingName;
          deliveryFunc(obj).then(res => {
            if (res.code == 200) {
              this.$message({
                message: res.message,
                type: "success"
              });
              this._getAllorder(true);
              this.dialogVisible = false;
              this.orderArr = []
              this.loading = false
            }else{
              this.loading = false
            }
          });
        } else {
          return false;
        }
      });
    },
    // 选择快递公司拿到对应的数据
    Courierfees(val) {
      this.options.forEach(item => {
        if (item.shippingId == val) {
          this.shippingCode = item.shippingCode;
          this.shippingId = item.shippingId;
          this.shippingName = item.shippingName;
          return true;
        }
      });
    },
    // 复选框点击事件
    choose(selection, row) {
      this.deletechecked(row);
      // this.orderArr = selection
    },
    //多选
    chooseAll(selection) {
      if (selection.length) {
        selection.forEach(data => {
          this.orderArr.push(data);
        });
      } else {
        this.tableData.forEach(item => {
          this.deletechecked(item);
        });
      }
    },
    // 删除记忆选择的数据
    deletechecked(data) {
      let index = this.orderArr.indexOf(data);
      if (index != -1) {
        this.orderArr.splice(index, 1);
      } else {
        this.orderArr.push(data);
      }
    },
    _getAllorder(data, state) {
      if (data) {
        this.form.pageIndex = 1;
      }
      if (state) {
        this.form.sortBySupply == 0
          ? (this.form.sortBySupply = 1)
          : (this.form.sortBySupply = 0);
      }
      if (this.form.keyWordValue != "" && this.form.keyWordType == "") {
        this.$message({
          message: "请选择关键字状态",
          type: "warning"
        });
      } else {
        let obj = {};
        obj.pageIndex = this.form.pageIndex;
        obj.pageSize = this.form.pageSize;
        obj.timer = this.form.timer || [];
        obj.keyWordType = this.form.keyWordType;
        obj.keyWordValue = this.form.keyWordValue;
        obj.fromType = this.form.fromType;
        obj.sortBySupply = this.form.sortBySupply;
        jicaiGetAllorder(obj).then(res => {
          if(res.data.pageList != null){
            res.data.pageList.forEach(item => {
              item.show = false
            });
          }
          this.tableData = res.data.pageList;
          this.loading = false;
          // this.orderArr = res.data.pageList;
          this.form.total_count = res.data.count;
        });
      }
    },
    handleGetGoodsList(data) {
      this.form = data;
      this._getTableData();
    },
    handleSizeChange(val) {
      this.form.pageSize = val;
      this._getAllorder();
    },
    handleCurrentChange(val) {
      this.form.pageIndex = val;
      this._getAllorder();
    },
    handleSizeChange2(val) {
      this.form.pageIndex2 = val;
      this._getAllorder();
    },
    handleCurrentChange2(val) {
      this.form.pageIndex2 = val;
      this._getAllorder();
    },
    orderDetail(id) {
      this.$router.push({ name: "OrderServerDetail", query: { orderId: id } });
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 1 === 0) {
        if (columnIndex <= 0) {
          return [1, 1];
        } else {
          return [1, 16];
        }
      }
    }
  },
  mounted() {
    this.createUserId = JSON.parse(
      localStorage.getItem("user")
    ).correlativeUserId;
  },
  components: {
    shippedDialog,
    aftermarket
  },
  watch:{
    logisticsdata(Val){
      console.log(Val)
    }
  }
};
</script>
<style scoped>
/* .all2 >>> .el-table--scrollable-x .el-table__body-wrapper{
  overflow-x: scroll !important;
} */
</style>
<style lang="scss" scoped>
@import "@/common/scss/variable.scss";

.othertable {
  .el-table--scrollable-x .el-table__body-wrapper {
    overflow-x: scroll;
  }
}
.goods-fitter {
  .vender {
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
    width: 100%;
    // max-width: 240px;
    // margin-right: 5px;
  }
  .el-date-picker {
    max-width: 240px;
    margin-right: 5px;
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
}
.line-div {
  display: flex;
  justify-content: space-around;
}
.fuzhi {
  background: rgba(229, 162, 75, 1);
}
.huishouzhan {
  background: rgba(247, 108, 110, 1);
}
.small_top {
  margin-top: 10px;
}
.addfocus {
  position: absolute;
  left: 1100px;
}
.information {
  background: #f7faff;
  height: 56px;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  .tent_span {
    margin-right: 15px;
  }
  .tent_span:first-child {
    margin-left: 1%;
  }
}
.content {
  width: 100%;
  padding: 20px 0;
  height: 180px;
  text-align: left;
  position: relative;
  display: flex;
  align-items: center;
  .content_img {
    width: 60px;
  }
  .name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
    margin-left: 16px;
    margin-left: 8px;
  }
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.tent_div {
  display: flex;
}
.tent_top {
  margin-top: 10px;
}
.independent {
  width: 100px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 893px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.Courier {
  left: 993px;
}
.posi {
  position: absolute;
  left: 1100px;
}
.name_div {
  width: 260px;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
.btn_div {
  width: 128px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.btn_div span {
  margin-top: 5px;
}
.el-select {
  width: 100%;
}
.el-table td div {
  align-items: center;
}
.all2 {
  min-width: 1533px;
}
.icon-jiaji {
  font-size: 50px;
  color: red;
  margin: 0 10px;
}

/deep/ .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
  padding: 0;
}

.notpush{
  font-size: 12px;
  color: white;
  border-radius: 10px;
  margin: 0 5px;
  padding: 1px 3px;
  background: #409EFF;
}
.havepush{
  font-size: 12px;
  color: white;
  border-radius: 10px;
  margin: 0 5px;
  padding: 1px 3px;
  background: #FFB269;
}
.mcard{
  border: 1px solid #d7e0f1;
}
</style>
