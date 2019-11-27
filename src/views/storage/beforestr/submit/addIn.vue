<template>
  <div id="addPurchasing">
    <el-dialog width="70%" :visible.sync="addVisible" :before-close="createClosing">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">提交入库单</h4>
            </div>
          </el-form>
        </div>
      </div>

      <div class="mbottom">
        <div class="goods-fitter">
          <el-form ref="infoForm" :model="form" :rules="rules" label-width="140px" size="small">
            <div class="search-wrapper">
              <div class="mbottom">
                <h4 class="title1">订单信息</h4>
              </div>
              <div class="search-base">
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="入库单号：">
                        <el-col :span="19">
                          <span style="color:#C4C6CC">{{storeData.storageBillNo}}</span>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="采购单号：">
                      <el-col :span="19">
                        <span>{{storeData.purchaseOrderNo}}</span>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="供应商：" prop="supplierName">
                        <el-col :span="19">
                          <el-input v-model="storeData.supplierName" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="入库日期：" prop="indate">
                      <el-col :span="19">
                        <el-date-picker
                          v-model="storeData.storageDate"
                          type="date"
                          placeholder="选择日期"
                          valueFormat="yyyy-MM-dd HH:mm:ss"
                          style="width:100%"
                          :picker-options="pickerOptions0"
                        ></el-date-picker>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="采 销 员 ：" prop="salesman">
                        <el-col :span="19">
                          <el-input v-model="storeData.purchaseUserName" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="制 单 人：" prop="singlePerson">
                      <el-col :span="19">
                        <el-input v-model="storeData.inputUserName" readonly></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="部 门：" prop="father">
                      <el-col :span="19">
                        <treeselect
                          style="width:100%;"
                          :options="options1"
                          search-nested
                          placeholder="请选择部门"
                          v-model="ruleForm.organizeId"
                        />
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="入 库 人：" prop="storageMan">
                      <el-col :span="19">
                        <el-input
                          v-model="storeData.warehousingUserName"
                          v-if="userList.length<1"
                          readonly
                        ></el-input>
                        <el-select
                          v-model="storeData.warehousingUserId"
                          placeholder="请选择"
                          v-if="userList.length>=1"
                          style="width:100%"
                          @change="chooseWarehousingUser"
                        >
                          <el-option
                            v-for="(item,index) in userList"
                            :key="index"
                            :label="item.sysuserName"
                            :value="item.sysuserId"
                          ></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="入货仓库：" prop="goodsWarehouse">
                      <el-col :span="19">
                        <el-select
                          v-model="storeData.warehouseId"
                          placeholder="请选择"
                          style="width:100%"
                        >
                          <el-option
                            v-for="item in warehouseData"
                            :key="item.warehouseId"
                            :label="item.name"
                            :value="item.warehouseId"
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
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form ref="infoForm" :model="form" :rules="rules" label-width="140px" size="small">
            <div class="search-wrapper">
              <div class="mbottom">
                <h4 class="title1">物流信息</h4>
              </div>
              <div class="search-base">
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="物流公司：">
                        <el-col :span="19">
                          <el-select
                            v-model="storeData.logisticsCode"
                            placeholder="请选择"
                            style="width:100%"
                          >
                            <el-option
                              v-for="(item,index) in logisticsData"
                              :key="index"
                              :label="item.name"
                              :value="item.code"
                            ></el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="物流单号：">
                      <el-col :span="19">
                        <el-input v-model="storeData.logisticsNo"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-col :span="12">
                      <el-form-item label="物流公司电话：" prop="logisticsTel">
                        <el-col :span="19">
                          <el-input v-model="storeData.logisticsTel"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>

                <el-row>
                  <el-form-item label="物流单图片：">
                    <!--   <div class="imgBox" @mouseenter="enterIn" @mouseleave="mouseOut"
                                  v-if="hiddenIndex===0" v-show="storeData.logisticsNoFileUrl">
                                    <img :src="storeData.logisticsNoFileUrl" alt=""/>
                                    <div class="blackBox" :class="showIndex===1?'show':''">
                                      <i class="el-icon-zoom-in" @click="preview"></i>
                                      <i class="el-icon-delete" @click="deleteImg"></i>
                                    </div>
                    </div>-->
                    <el-upload
                      :action="baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile'"
                      list-type="picture-card"
                      :file-list="files"
                      :before-upload="handleProgress"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove"
                      :on-success="handleSuccess"
                      :on-exceed="handleExceed"
                      :limit="1"
                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="补充说明：" prop="footnote">
                    <el-col :span="22">
                      <el-input
                        v-model="storeData.logisticsRemark"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-col>
                  </el-form-item>
                </el-row>
              </div>
            </div>
          </el-form>
        </div>
      </div>

      <div class="goods-fitter">
        <div class="mail-fitter" style="margin-top:20px">
          <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px" size="small">
            <div class="mail-wrapper">
              <h4 class="title1">产品清单</h4>
              <div class="search-base">
                <div class="mbottom">
                  <div class="goods-fitter">
                    <div class="mcard" style="padding-bottom:0">
                      <el-table :data="storeData.details" border style="width: 100%" stripe>
                        <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                        <el-table-column
                          prop="customerType"
                          label="商品信息"
                          align="center"
                          width="180"
                        >
                          <template slot-scope="scope">
                            <div class="txt_left">商品名称：{{scope.row.goodsName}}</div>
                            <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                            <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                            <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                            <div class="txt_left">SKU：{{scope.row.skuId}}</div>
                          </template>
                        </el-table-column>
                        <el-table-column prop="commonContactName" label="规格尺寸" align="center">
                          <template slot-scope="scope">{{scope.row.specSize}}</template>
                        </el-table-column>
                        <el-table-column
                          prop="commonContactDept"
                          label="单位"
                          align="center"
                          width="60"
                        >
                          <template slot-scope="scope">{{scope.row.unit}}</template>
                        </el-table-column>
                        <el-table-column prop="commonContactDept" label="订单数量" align="center">
                          <template slot-scope="scope">{{scope.row.inputQuantity}}</template>
                        </el-table-column>
                        <el-table-column
                          prop="commonContactDept"
                          label="已入库数量"
                          align="center"
                          width="100"
                        >
                          <template slot-scope="scope">{{scope.row.inputtedQuantity}}</template>
                        </el-table-column>
                        <el-table-column
                          prop="commonContactDept"
                          label="未入库数量"
                          align="center"
                          width="100"
                        >
                          <template slot-scope="scope">{{scope.row.noInputQuantity}}</template>
                        </el-table-column>
                        <el-table-column
                          prop="commonContactDept"
                          label="本次入库数量"
                          align="center"
                          width="110"
                        >
                          <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.inputQuantity"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="不含税单价" align="center" width="100">
                          <template slot-scope="scope">{{scope.row.notaxCostPrice}}</template>
                        </el-table-column>
                        <el-table-column label="税费" align="center" width="70">
                          <template slot-scope="scope">{{scope.row.taxation}}</template>
                        </el-table-column>

                        <el-table-column label="含税单价" align="center" width="100">
                          <template slot-scope="scope">{{scope.row.goodsPrice}}</template>
                        </el-table-column>
                        <el-table-column label="合计" align="center" width="90">
                          <template slot-scope="scope">{{scope.row.totalPrice}}</template>
                        </el-table-column>
                      </el-table>
                      <div class="total" style="margin-left:80%;margin-top:20px">
                        <el-form label-width="130px" size="small">
                          <el-form-item label="本次入货合计：">
                            <el-col :span="24">
                              <el-input v-model="total1"></el-input>
                            </el-col>
                          </el-form-item>
                        </el-form>
                      </div>
                      <!-- <div class="pagination">
                          <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="tableDatas.currentPage"
                            :page-sizes="[10,20,50,100]"
                            :page-size="tableDatas.size"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="tableDatas.total"
                          ></el-pagination>
                      </div>-->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="createClose()" size="small">关 闭</el-button>
        <el-button type="primary" @click="createStorage" size="small">保存</el-button>
      </span>
    </el-dialog>
    <!-- 预览 -->
    <el-dialog :visible.sync="dialogVisible1" :modal="true" :append-to-body="false">
      <img width="100%" :src="previewImg" alt />
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible" :modal="true" :append-to-body="false">
      <img width="100%" :src="dialogImageUrl" alt />
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
  </div>
</template>

<script>
import { getErpGoods } from "@/api/product/index";
import { deleteImg } from "@/api/sale/index";
import { singleWarehousing } from "@/api/storage/index";
import { getAllMenu, findByPage } from "@/api/creditmanage/index";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { throttleTipPop } from "@/utils/functions.js";
export default {
  components: {
    Treeselect
  },
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      files: [],
      addVisible: false,
      dialogImageUrl: "",
      dialogVisible: false,
      previewImg: "",
      dialogVisible1: false,
      showIndex: 0, //显示下标
      hiddenIndex: 0, //隐藏下标
      storeData: "",
      deletePath: "", //删除上传路径
      imgArr: [], //上传数组
      purchaseOrderId1: "",
      logisticsData: "",
      warehouseData: "",
      dataArr: [],
      userList: [],
      userName: "",
      tableDatas: {
        currentPage: 1,
        sizes: [10, 20, 50, 100],
        size: 10,
        total: 0
      },
      form: {
        current_page: 0,
        page_size: 10,
        total_count: 0,
        storageDate: "", //入库时间
        warehouseId: "", //仓库ID
        purchaseOrderId: "", //采购订单ID
        logisticsCode: "", //物流公司编码
        logisticsNo: "", //物流单号
        logisticsTel: "", //物流电话
        imgUrl: "",
        warehousingUserName: "", //入库人姓名
        logisticsRemark: "" //	物流补充说明
      },
      formData: {
        current_page: 1,
        page_size: 2,
        total_count: 0
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
        }
      ],
      rules: {
        partyA: [{ required: true, message: "此项为必填项", trigger: "blur" }],
        partyAAddress: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        partyAContacts: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        deliveryDate: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        orderAmount: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ]
      }
    };
  },
  created() {},
  props: [
    "addVisibles",
    "storageData",
    "purchaseOrderId",
    "logisticsList",
    "warehouseList",
    "sysuserName",
    "ruleForm",
    "options1"
  ],
  watch: {
    addVisibles(val) {
      this.addVisible = val;
    },
    storageData(val) {
      this.storeData = val;

      if (this.files.length === 0 && this.storeData.logisticsNoFileUrl) {
        this.files.push({ url: this.storeData.logisticsNoFileUrl });
      }
    },
    purchaseOrderId(val) {
      this.purchaseOrderId1 = val;
    },
    logisticsList(val) {
      this.logisticsData = val;
    },
    warehouseList(val) {
      this.warehouseData = val;
    },
    sysuserName(val) {
      this.userName = val;
    },
    //监听组织架构
    "ruleForm.organizeId": {
      handler(val) {
        this.userList = [];
        this.storeData.warehousingUserName = "";
        this.storeData.warehousingUserId = "";
        if (val) {
          let data = {};
          data.organizeId = val;
          findByPage(data).then(res => {
            this.userList = res.data;
          });
        }
      },
      deep: true
    },
    "storeData.details": {
      handler(val) {
        if (val.length > 0) {
          for (let i = 0; i < val.length; i++) {
            if (val[i].inputQuantity > val[i].noInputQuantity) {
              val[i].inputQuantity = val[i].noInputQuantity;
              throttleTipPop(
                this,
                "error",
                "本次入库数量不能大于未入库数量！",
                2000
              );
            }
          }
        }
      },
      deep: true
    }
  },
  computed: {
    total1() {
      let totals = 0;
      let _this = this;
      if (_this.storeData.details && _this.storeData.details.length > 0) {
        for (var i = 0; i < _this.storeData.details.length; i++) {
          if (_this.storeData.details[i].totalPrice) {
            totals += parseFloat(_this.storeData.details[i].totalPrice);
          } else {
            totals = 0;
          }
        }
      }
      return totals;
    }
  },
  methods: {
    //关闭页面
    createClose() {
      this.$confirm("您确认要关闭吗？")
        .then(_ => {
          this.addVisible = false;
          this.userList = [];
          this.storeData.warehousingUserName = "";
          this.storeData.warehousingUserId = "";
          this.$emit("createClose1", this.addVisible);
        })
        .catch(_ => {});
    },
    createClosing() {
      this.$confirm("您确认要关闭吗？")
        .then(_ => {
          this.addVisible = false;
          this.userList = [];
          this.storeData.warehousingUserName = "";
          this.storeData.warehousingUserId = "";
          this.$emit("createClosing1", this.addVisible);
        })
        .catch(_ => {});
    },

    createStorage() {
      if (this.form.imgUrl !== "") {
        this.storeData.logisticsNoFileUrl = this.form.imgUrl;
      }
      singleWarehousing(this.storeData).then(res => {
        if (res.code === 200) {
          throttleTipPop(this, "success", "提交入库单成功！", 2000);
          this.addVisible = false;
          this.hiddenIndex = 0;
          this.storeData.logisticsNoFileUrl = "";
          this.$emit("createStorage1", this.addVisible);
        }
      });
    },
    address() {},
    handleProgress() {
      if (this.storeData.logisticsNoFileUrl !== "") {
        this.storeData.logisticsNoFileUrl === "";
        this.hiddenIndex = 1;
      }
    },
    //上传成功
    handleSuccess(data) {
      throttleTipPop(this, "success", "上传物流单成功！", 2000);

      let path = data.data.domain + data.data.filePath;
      var arrs = [];
      this.imgArr.push(path);
      arrs = this.imgArr;

      var strs = new Array(); //定义一数组
      strs = arrs.join("##");
      this.form.imgUrl = strs;
    },
    //预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //删除
    handleRemove(file) {
      if (file.response) {
        deleteImg(file.response.data.filePath).then(res => {});
        this.deletePath =
          file.response.data.domain + file.response.data.filePath;
        let arr = [];
        arr = this.form.imgUrl.split("##");
        const index = arr.findIndex(item => item === this.deletePath);
        arr.splice(index, 1);
        this.form.imgUrl = arr;
        this.form.imgUrl = this.form.imgUrl.join("##");
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制上传一个文件`);
    },
    //鼠标划入
    enterIn() {
      this.showIndex = 1;
    },
    //鼠标画出
    mouseOut() {
      this.showIndex = 0;
    },
    //预览
    preview() {
      this.previewImg = this.storeData.logisticsNoFileUrl;
      this.dialogVisible1 = true;
    },
    deleteImg() {
      this.storeData.logisticsNoFileUrl = "";
      this.showIndex = 0;
      this.hiddenIndex = 1;
    },
    //筛选出下拉表的label值
    chooseWarehousingUser(data) {
      let obj = {};
      obj = this.userList.find(item => {
        return item.sysuserId === data;
      });
      this.storeData.warehousingUserName = obj.sysuserName;
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleChange() {}
  }
};
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
#addPurchasing {
  .el-dialog__body {
    padding: 0 !important;
    background: none !important;
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
      font-size: 16px;
      color: 3333;
      padding-left: 10px;
      line-height: 1.4;
      border-left: 4px solid $themeColor;
      margin-bottom: 10px;
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
  .box {
    margin-left: 12px;
    margin-top: 10px;
  }
  .imgBox {
    border-radius: 6px;
    float: left;
    margin-right: 10px;
    position: relative;
    img {
      width: 148px;
      height: 148px;
      border-radius: 6px;
    }
    .blackBox {
      transition: all 0.6 0 ease-in !important;
      width: 148px;
      height: 148px;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 6px;
      text-align: center;
      position: absolute;
      top: 0;
      display: none;
      i {
        font-size: 20px;
        color: #fff;
        line-height: 148px;
        margin-left: 15px;
        cursor: pointer;
      }
    }
    .show {
      animation: show 0.3s;
      display: block;
    }
  }
  .el-input-group__append button.el-button {
    width: 50px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
  }
  .el-input-number.is-controls-right .el-input-number__decrease {
    background: #fff !important;
  }
  .el-input-number.is-controls-right .el-input-number__increase {
    background: #fff !important;
  }
  /deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 8px; // 横向滚动条
    height: 8px; // 纵向滚动条 必写
  }
  // 滚动条的滑块
  /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 3px;
  }
  /deep/ .el-dialog__headerbtn {
    top: 10px;
  }
}

@-webkit-keyframes show {
  0% {
    opacity: 0;
    background: rgba(0, 0, 0, 0);
  }
  100% {
    opacity: 1;
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>