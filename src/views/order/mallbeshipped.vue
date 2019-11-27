<template>
  <!-- 待发货 -->
  <div class>
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
                          :default-time="['00:00:00', '23:59:59']"
                          range-separator="-"
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
                <el-col :span="7" class="btn_right">
                  <el-button type="primary" size="small" @click="_getAllorder(true)">查询</el-button>
                  <el-button type="primary" size="small" @click="exportOrder" v-permit="'orderServer:export'">导出订单</el-button>
                  <el-button type="primary" size="small" @click="deliverGoods = true" v-permit="'Import:express'">快递单导入</el-button>
                </el-col>
                <el-col :span="12" class="btn_right">
                  <span class="filter">1</span>
                </el-col>
                <el-col :span="7" class="btn_right">
                  <el-button type="primary" size="small" @click="_getAllorder(true,true)" v-permit="'orderServer:selection'">按供应商排序</el-button>
                  <el-button type="primary" size="small" @click="Detailedpush(true)">发货明细推送</el-button>
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
            border
            ref="table"
            style="width:1553px;overflow: hidden;"
            :span-method="arraySpanMethod"
            @select="choose"
            @select-all="chooseAll"
          >
            <el-table-column type="selection" width="55" align="center" :resizable="false"></el-table-column>
            <el-table-column label="商品详情" align="center" width="260" :resizable="false">
              <template slot-scope="scope" style="height:200px">
                <div class="information">
                  <i class="iconfont icon-jiaji" v-if="scope.row.urgent == 1"></i>
                  <span v-if="sysuserType !=1 " :class="scope.row.pushStatus ===0 && scope.row.pushGroup === 0 ?'notpush':'havepush'">{{scope.row.pushStatus ===0 && scope.row.pushGroup === 0 ?'未推送供应商':'已推送供应商'}}</span>
                  <span class="tent_span">订单编号：{{scope.row.orderSn}}</span>
                  <span class="tent_span">下单时间：{{scope.row.createTime}}</span>
                  <span class="tent_span">共{{scope.row.goodsNumber}}件商品</span>
                  <span class="tent_span">订单总价：{{scope.row.totalAmount}}元</span>
                  <span class="tent_span">采购账号：{{scope.row.userName}}</span>
                  <span class="tent_span" style="color: #4b99fb;">支付方式：{{scope.row.payName}}</span>
                  <span class="addfocus">
                    <el-button
                      type="primary"
                      size="small"
                      @click="orderMarkingfunc(scope.row)"
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
                      <span class="name">{{item.goodsName}}</span>
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
                      <div>{{scope.row.statusMsg}}</div>
                      <div>
                        <el-button
                          type="primary"
                          size="small"
                          v-if="item.shippingStatus==0   && sysuserType ==1"
                          @click="delivery(scope.row,true,index)"
                        >发货</el-button>
                      </div>
                      <div style="margin-top:5px">
                        <el-button
                          type="primary"
                          size="small"
                          v-if="scope.row.orderType== 1"
                          v-permit="'Supplier:selection'"
                          @click="choseSupplierfunc(item,scope.row)"
                        >选择供应商</el-button>
                      </div>
                      <!-- <div style="margin-top:5px" v-if="scope.row.isAudit == true">
                        <el-button type="primary" size="small" @click="audit(scope.row)">审核</el-button>
                      </div> -->
                    </div>
                  </div>
                  <!-- <div class="independent">{{scope.row.payName}}</div>
                  <div class="independent Courier">{{scope.row.shippingName}}</div>-->
                  <div></div>
                </div>
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
            <!-- <el-table-column :resizable="false" label="支付方式" align="center" width="100"></el-table-column> -->
            <el-table-column :resizable="false" label="交货时间" align="center" width="100"></el-table-column>
            <el-table-column :resizable="false" label="状态/操作" align="center" width="78"></el-table-column>
          </el-table>
        </div>
      </div>
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
      <el-dialog title="添加标记" :visible.sync="orderMarking" width="30%">
        <span>{{text_div}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="orderMarking = false" size="small">取 消</el-button>
          <el-button type="primary" @click="sureTag" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 下载多地址表格 -->
      <el-dialog title="快递单导入" :visible.sync="uploading" width="40%">
        <div class="images">
          <el-form label-width="100px" size="small">
            <el-form-item label="模板下载：">
              <div @click="download">
                <img src="../../common/images/excel.png" alt class="opera_img" />
                <span class="fontss">点击此处下载快递单模板</span>
              </div>
            </el-form-item>
            <el-form-item label="选择文件：">
              <div class="file_div">
                <el-upload
                  class="avatar-uploader"
                  ref="upload"
                  :action="action"
                  :data="bigObj"
                  :on-change="fileName"
                  :show-file-list="false"
                  accept=".xls, .xlsx"
                  :on-success="handleAvatarSuccess"
                  name="multipartFile"
                  :auto-upload="false"
                  :on-error='loaderror'
                >
                  <el-button type="primary" size="small">选择文件</el-button>
                </el-upload>
                <el-input v-model="fileValue" placeholder="未选择任何文件" size="medium"></el-input>
              </div>
            </el-form-item>
          </el-form>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="uploading = false" size="small">取 消</el-button>
          <el-button type="primary" @click="submitUpload" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 下载多地址表格 -->
      <!-- 发货弹窗 -->
      <div class="spicallist orderlog">
        <el-dialog title="发货单" :visible.sync="deliverGoods" width="65%">
          <div class="mbottom">
            <div class="goods-fitter">
              <div class="search-wrapper">
                <h4 class="title">订单信息</h4>
                <div style='margin-bottom: 15px;'>
                  <el-button @click="uploading = true" type="primary" size="small">上传快递单</el-button>
                  <br />
                </div>
                <el-table :data="tableData2" border style="width: 100%" stripe>
                  <el-table-column prop="" label="" align="center" width="30">
                  <template slot-scope="scope">
                    <div style=" text-align: center; width: 30px;margin-left: -11px;" @click="deletable(scope)">
                      <i class="iconfont icon-chacha"></i>
                    </div>
                  </template>
                </el-table-column>
                  <el-table-column prop="orderId" label="订单ID" align="center"></el-table-column>
                  <el-table-column prop="skuIds" label="SKUID" align="center"></el-table-column>
                  <el-table-column prop="shippingName" label="物流公司" align="center"></el-table-column>
                  <el-table-column prop="logisticsNo" label="物流号" align="center"></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="deliverGoods = false" size="small">取 消</el-button>
            <el-button type="primary" @click="submitAdr" size="small">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 发货弹窗 -->

      <!-- 供应商弹窗 -->
      <div class="spicallist">
        <el-dialog title="选择供应商" :visible.sync="choseSupplier" width="65%">
          <div class="mbottom">
            <div class="goods-fitter">
              <div class="search-wrapper">
                <el-table :data="tableData1" stripe style="width: 100%" border ref="elTable">
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
                      <div
                        style="height: 300px;overflow-y: auto;display: flex;justify-content: center;align-items: center;"
                      >
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
                              <!-- <img src="../../../common/images/商品规格(1)shouji.png" alt="" v-if="index == scope.row.index">  -->
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
                        <div class="small-Idiv" @click="priority(scope.row)">
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
                    :current-page="form2.pageIndex"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="form2.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="form2.total_count"
                  ></el-pagination>
                </div>
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <!-- <el-button type="danger" @click="choseSupplier = false" size="small">取 消</el-button>
            <el-button type="primary" @click="choseSupplier = false" size='small'>确 定</el-button>-->
          </span>
        </el-dialog>
      </div>
    </div>

    <!-- 发货弹窗 -->
    <el-dialog title="商品发货" :visible.sync="dialogVisible" width="30%" v-loading="loading"
    element-loading-text="发货中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
      <span>
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
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="courier('ruleForm')" size="small">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 发货明细推送 -->
    <el-dialog title="发货明细推送" :visible.sync="Detailedshow" width="30%">
      <span>是否确定推送</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="Detailedshow = false" size="small">取 消</el-button>
        <el-button type="primary" @click="Detailedpush('',true)" size="small">确 定</el-button>
      </span>
    </el-dialog>
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
import jquery from "jquery";
import { throttleTipPop } from '@/utils/throttle'
import request from '@/utils/request'
import {
  getAllorder,
  getTagorder,
  getOdersupplier,
  resetSupplier,
  getByidorder,
  getExcel,
  entryExcel,
  getCourier,
  deliveryFunc,
  submitAddress,
  pushSupplier,
  orderupload,
  jicaiGetAllorder,
  exportOrder
} from "@/api/order/index";
export default {
  data() {
    return {
      auditDialogVisible: false,
      auditState: 1,
      auditTextarea: '',
      sysuserType:0, //角色状态
      Detailedshow: false, // 发货明细推送弹窗
      text_div: "是否需要给订单添加加急标记？",
      options: [], // 快递公司
      action: "",
      loading:false,
      fileValue: "", // 选择完文件的名称
      dialogVisible: false, // 发货弹窗
      orderMarking: false, //添加标记
      deliverGoods: false, //发货
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
      changename:true,
      ruleForm: {
        company: "", //快递公司
        orderNo: "", //快递单号
        fees: "" //费用
      },
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
        requestStatus: 2 //待发货
      },
      form2: {
        pageIndex: 1,
        pageSize: 10,
        total_count: 0
      },
      tableData: [],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      rules: {
        company: [
          { required: true, message: "请选择快递公司", trigger: "change" }
        ],
        orderNo: [
          { required: true, message: "请填写快递单号", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this._getAllorder();
    this.action = this.baseUrl1 + "/api/open/b/b2b2c/orderservice/order/import.json";
    const sysuer = JSON.parse(localStorage.getItem("user"))
    this.sysuserType = sysuer.data.sysuserType
  },
  mounted() {},
  methods: {
    //审核
    audit(){
       this.auditDialogVisible = true;
    },
    //审核确定按钮
    examine(){
      //此处调取审核接口
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    Detailedpush(data, type) {
      if (data) {
        this.Detailedshow = true;
      }
      if (type) {
        let arr = [];
        this.orderArr.forEach(item => {
          arr.push({
            orderId: item.orderId,
            orderStatus: item.orderStatus,
            payStatus: item.payStatus
          });
        });
        pushSupplier(arr).then(res => {
          if (res.code == 200) {
            this.Detailedshow = false;
            this.orderArr = [];
            this.tableData.forEach(item => {
              this.$refs.table.toggleRowSelection(item, false);
            });
            this.$message({
              message: res.message,
              type: "success"
            });
            this._getAllorder()
          }
        });
      }
    },
    //导出订单
    exportOrder() {
      // let type = JSON.parse(localStorage.getItem("user")).data.sysuserType;
      // let time = this.form.timer ? this.form.timer : ["", ""];
      // const obj  = this.form
      // obj.orderIdArray = this.orderArr.map((item) => item.orderId)
      // obj.sysuserType = type
      // request({
			// 			url: '/api/open/b/b2b2c/orderservice/purchasing/order/export.json',
			// 			method: 'GET',
			// 			responseType: 'blob',
      //       data:obj
			// 		}).then(res => {
			// 			var reader = new FileReader();
			// 			reader.readAsDataURL(res);   // 转换为base64，可以直接放入a标签href
			// 			reader.onload = function (e) {
			// 				var a = document.createElement('a');
			// 				a.download = '订单清单.xls';
			// 				a.href = e.target.result;
			// 				document.body.appendChild(a);    // 修复firefox中无法触发click
			// 				a.click();
			// 				a.remove();
			// 			}
      // 		})
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
    deletable(val){
      this.tableData2.splice(val.$index,1)
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
    // 默认选中
    checkedfunc(arr) {
      let check = this.orderArr;
      for (var i = 0; i < check.length; i++) {
        for (var j = 0; j < arr.length; j++) {
          if (check[i].orderId == arr[j].orderId) {
            this.$refs.table.toggleRowSelection(this.tableData[j], true);
          }
        }
      }
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
    //确定地址提交
    async submitAdr() {
      if(this.tableData2.length){
        const data = await orderupload(this.tableData2)
        if (data.code == 200) {
            this.deliverGoods = false;
            this.$message({
              message: data.message,
              type: "success"
            });
          }
      }else{
        throttleTipPop(this,'error','请上传对应的excel表格')
      }
    },
    //快递单号确定
    courier(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let obj = {};
          this.loading = true;
          obj.skuIds = this.goosid;
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
              this.loading = false;
              this._getAllorder(true);
              this.dialogVisible = false;
            }else{
              this.loading = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    fileName(file,fileList) {
      if (fileList.length && this.changename) {
        this.fileValue = file.name;
      }
      this.changename = true
    },
    submitUpload() {
      this.$refs.upload.submit();
      this.uploading = false;
    },
    deleAdress(index) {
      this.tableData2.splice(index, 1);
    },
    download() {
      window.location.href = this.baseUrl1 +"/api/open/b/b2b2c/orderservice/logistics/deliveryTemplate.json"
    },
    priority(data) {
      let obj3 = {};
      obj3.newGoodsId = data.goodsId;
      obj3.oldGoodsId = this.oldGoodsId;
      obj3.orderId = this.orderId;
      obj3.supplierId = data.skuInfo[0].supplierId;
      resetSupplier(obj3).then(res => {
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.choseSupplier = false;
        }
      });
    },
    deliverGoodsfunc(data) {
      this.tableData2 = [];
      this.fileValue = "";
      this.ruleForm.company = "";
      this.ruleForm.orderNo = "";
      this.shopArr = [];
      this.orderId = data.orderId;
      this.deliverGoods = true;
      this.bigObj.orderId = data.orderId;
      getByidorder(data.orderId).then(res => {
        this.tableData3 = res.data.orderGoodsList;
      });
    },
    choseSupplierfunc(data, order) {
      this.oldGoodsId = data.goodsId;
      this.orderId = order.orderId;
      let obj2 = {};
      obj2.pageIndex = this.form2.pageIndex;
      obj2.pageSize = this.form2.pageSize;
      obj2.goodsId = data.goodsId;
      obj2.skuId = data.skuId;
      this.choseSupplier = true;
      this._getOdersupplier(obj2);
    },
    _getOdersupplier(data) {
      getOdersupplier(data).then(res => {
        this.tableData1 = res.data.pageList;
        this.form2.total_count = res.data.count;
      });
    },
    orderMarkingfunc(val) {
      this.orderMarking = true;
      val.urgent == 0
        ? "是否需要给订单添加加急标记？"
        : "是否需要取消此订单的加急标记？";
      this.orderId = val.orderId;
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
        obj.requestStatus = this.form.requestStatus;
        obj.sortBySupply = this.form.sortBySupply;
        jicaiGetAllorder(obj).then(res => {
          this.tableData = res.data.pageList;
          this.$nextTick(() => {
            this.checkedfunc(this.tableData);
          });
          this.form.total_count = res.data.count;
        });
      }
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 1 === 0) {
        if (columnIndex <= 0) {
          return [1, 1];
        } else {
          return [1, 16];
        }
      }
    },
    handleAvatarSuccess(response, file, fileList) {
      if(response.code != 200){
        throttleTipPop(this,'error',response.message)
      }
      this.tableData2 = response.data;
      this.changename = false
      this.fileValue = ""
    },
    loaderror(err, file, fileList){
      this.changename = false
      this.fileValue = ""
      throttleTipPop(this,'error',JSON.parse(err.message).message)
    },
    handleCheck(row) {
      const $table = this.$refs.table;
      $table.toggleRowExpansion(row);
      $table.toggleRowSelection(row);
    },
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
    orderDetail(id) {
      this.$router.push({ name: "OrderServerDetail", query: { orderId: id } });
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
      this.form.pageSize = val;
      this._getAllorder();
    },
    handleCurrentChange2(val) {
      this.form.pageIndex = val;
      this._getAllorder();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.othertable {
  .el-table--scrollable-x .el-table__body-wrapper {
    overflow-x: hidden;
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
  align-items: center;
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

.filter {
  opacity: 0;
}
.goods_num {
  color: #f66c6c !important;
  font-size: 16px;
  margin-right: 5px;
}
.meibanfal {
  margin-bottom: 10px;
}
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
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.el-upload--picture-card {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.avatar {
  width: 148px;
  height: 148px;
  display: block;
}
.opera_img {
  width: 32px;
  height: 32px;
}
.fontss {
  position: absolute;
  margin-left: 20px;
  color: #4a99fa;
  cursor: pointer;
}
.fonts {
  position: absolute;
  padding-top: 10px;
  margin-left: 23%;
  margin-top: -4px;
  color: red;
}
.name_div {
  width: 260px;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
.el-select {
  width: 100%;
}
.file_div {
  display: flex;
}
.avatar-uploader {
  margin-right: 10px;
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
.all2 {
  min-width: 1533px;
}
.icon-jiaji {
  font-size: 50px;
  color: red;
  margin: 0 10px;
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
/deep/ .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
  padding: 0;
}
/deep/ .orderlog .el-dialog__body{
  background:none;
}
.icon-chacha{
  color:#4a99fa;
}
</style>
