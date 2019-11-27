<template>
  <div class="editOrder">
    <el-dialog :visible.sync="editVisible" width="70%" :before-close="createClosing">
      <div class="goods-fitter" style="margin-bottom:20px">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">编辑盘点单</h4>
          </div>
        </el-form>
      </div>
      <div class="mail-fitter">
        <el-form ref="infoForm" :model="form" :rules="rules" label-width="110px" size="small">
          <div class="mail-wrapper">
            <div class="search-base">
              <h4 class="title1">盘点明细</h4>
              <el-row class="warp">
                <div class="mbottom">
                  <div class="goods-fitter">
                    <el-row>
                      <el-col :span="7">
                        <el-form-item label="盘点单号：" prop="customerName">
                          <el-input placeholder="保存后自动生成" v-model="editDatas.billNo" readonly></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="7" :offset="1">
                        <el-form-item label="部 门：" prop="father">
                          <treeselect
                            style="width:100%;"
                            :options="options1"
                            search-nested
                            placeholder="请选择部门"
                            v-model="ruleForm.organizeId"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="7">
                        <el-form-item label="盘点人员：" prop="transportMode">
                          <el-input
                            v-model="editDatas.bizUserName"
                            v-if="userList.length<1"
                            readonly
                          ></el-input>
                          <el-select
                            v-model="editDatas.bizUserId"
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
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="7">
                        <el-form-item label="盘点日期：">
                          <el-date-picker
                            v-model="editDatas.bizTime"
                            valueFormat="yyyy-MM-dd HH:mm:ss"
                            type="date"
                            style="width:100%"
                            :picker-options="pickerOptions0"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="7" :offset="1">
                        <el-form-item label="仓库：" prop="invoiceType">
                          <el-select
                            v-model="editDatas.warehouseId"
                            placeholder="必填项"
                            style="width:100%;"
                          >
                            <el-option
                              v-for="(item,index) in toList"
                              :key="index"
                              :label="item.name"
                              :value="item.warehouseId"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-row>
            </div>
          </div>
          <div class="mcard1">
            <div class="mcard">
              <div class="search-wrapper">
                <h4 class="title">商品清单</h4>
              </div>
              <el-form label-width="100px" size="small">
                <el-row class="operate mbottom">
                  <el-col :span="7">
                    <!-- <el-button type="primary">仅挑选</el-button> -->
                    <el-button type="primary" size="small" @click="addGoods()">选择商品</el-button>
                    <el-button type="primary" size="small" @click="deleteGoods">删除商品</el-button>
                  </el-col>
                </el-row>
                <el-table
                  class="elTable"
                  :data="editDatas.details"
                  stripe
                  style="width: 100%"
                  border
                  ref="elTables"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" align="center"></el-table-column>
                  <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
                  <el-table-column label="图样" align="center" width="110">
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
                  <el-table-column label="商品信息" align="center" width="230">
                    <template slot-scope="scope">
                      <div class="txt_left">商品名称：{{scope.row.goodsName}}</div>
                      <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                      <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                      <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                      <div class="txt_left">SKU：{{scope.row.skuId}}</div>
                    </template>
                  </el-table-column>

                  <el-table-column label="规格尺寸" align="center" width="150">
                    <template slot-scope="scope">
                      <div>{{scope.row.specSize}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="单位" align="center">
                    <template slot-scope="scope">{{scope.row.unit}}</template>
                  </el-table-column>
                  <el-table-column label="盘点前库存数量" align="center">
                    <template slot-scope="scope">{{scope.row.beforeGoodsCount}}</template>
                  </el-table-column>
                  <el-table-column label="盘点后库存数量" align="center">
                    <template slot-scope="scope">
                      <el-input v-model.number="scope.row.goodsCount" size="small"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="单价" align="center">
                    <template slot-scope="scope">{{scope.row.goodsPrice}}</template>
                  </el-table-column>
                  <el-table-column label="差数" align="center">
                    <template slot-scope="scope">{{scope.row.diffCount}}</template>
                  </el-table-column>
                  <el-table-column label="差额" align="center">
                    <template slot-scope="scope">{{scope.row.diffPrice}}</template>
                  </el-table-column>
                  <el-table-column label="盘点后库存金额" align="center" width="120">
                    <template slot-scope="scope">
                      <el-input v-model.number="scope.row.goodsTotalPrice" size="small"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="盘点原因" align="center" width="200">
                    <template slot-scope="scope">
                      <el-input
                        resize="none"
                        type="textarea"
                        size="small"
                        :autosize="{ minRows: 1, maxRows: 5}"
                        placeholder="请输入内容"
                        v-model="scope.row.reason"
                      ></el-input>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="total" style="margin-left:80%;margin-top:20px">
                  <el-form label-width="130px" size="small">
                    <el-form-item label="总合计：">
                      <el-col :span="24">
                        <el-input v-model="total1"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-form>
                </div>
              </el-form>
            </div>
          </div>
        </el-form>
      </div>

      <span slot="footer">
        <el-button type="danger" @click="createClose" size="small">关 闭</el-button>
        <el-button type="primary" @click="editOrder()" size="small">保存</el-button>
      </span>
    </el-dialog>
    <!-- 编辑客户询价添加商品弹窗 -->
    <el-dialog width="65%" :visible.sync="innerVisible1" :modal="true" :append-to-body="false">
      <!-- 新增客户询价添加商品选择品牌弹窗 -->

      <div class="mail-fitter">
        <el-form ref="infoForm" :model="form" label-width="100px" size="small">
          <div class="mail-wrapper">
            <div class="search-base">
              <el-row class="warp">
                <div class="mbottom">
                  <div class="goods-fitter">
                    <h4 class="title1">商品信息</h4>
                  </div>
                  <div class="goods-fitter">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="商品信息：" prop="brand">
                          <el-input v-model="formData.goodsName1" placeholder="请输入商品名称/型号/品牌"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="2" :offset="1">
                        <el-button type="primary" size="small" @click="goodsSearch()">查询</el-button>
                      </el-col>
                      <!-- <el-col :span="6">
                            <el-button type="primary" size="small">进入商品管理页面新增或编辑商品</el-button>
                      </el-col>-->
                    </el-row>
                  </div>
                </div>
              </el-row>
            </div>
          </div>
          <div class="mcard1">
            <div class="mcard">
              <!--  添加商品商品展示 -->
              <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                border
                ref="elTable"
                class="goods_index"
                @selection-change="addSelectionChange"
              >
                <el-table-column type="selection" align="center"></el-table-column>
                <el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
                <el-table-column label="图样" align="center" width="120">
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
                <el-table-column label="商品信息" align="center" width="300">
                  <template slot-scope="scope">
                    <div>
                      <div class="txt_left">商品名称：{{scope.row.goodsName}}</div>
                      <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                      <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                      <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                      <div class="txt_left">SKU：{{scope.row.skuId}}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="规格尺寸" align="center" width="200">
                  <template slot-scope="scope">
                    <div v-html="scope.row.specSize"></div>
                  </template>
                </el-table-column>
                <el-table-column label="单位" align="center">
                  <template slot-scope="scope">{{scope.row.unit}}</template>
                </el-table-column>
                <el-table-column label="仓库" align="center">
                  <template slot-scope="scope">{{scope.row.warehouseName}}</template>
                </el-table-column>
                <el-table-column label="库存数量" align="center">
                  <template slot-scope="scope">{{scope.row.balanceCount}}</template>
                </el-table-column>
                <el-table-column label="单价" align="center">
                  <template slot-scope="scope">{{scope.row.balancePrice}}</template>
                </el-table-column>
                <el-table-column label="合计" align="center">
                  <template slot-scope="scope">{{scope.row.balanceTotalPrice}}</template>
                </el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination
                  @size-change="addHandleSizeChange"
                  @current-change="addHandleCurrentChange"
                  :current-page="formData.current_page"
                  :page-sizes="[2, 5, 10, 50]"
                  :page-size="formData.page_size"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="formData.total_count"
                ></el-pagination>
              </div>
            </div>
          </div>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="innerVisible1 =false" size="small">关 闭</el-button>
        <el-button type="primary" @click="saveGoods1()" size="small">保存</el-button>
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
        <el-button type="primary" @click="cancelGoods()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
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
  editOrders
} from "@/api/sale/index";
import {
  getStockGoodsList,
  updateInventoryDetail,
  deleteStockGoods
} from "@/api/storage/index";
import { getAllcustomer } from "@/api/customer";
import { throttleTipPop } from "@/utils/functions.js";
import { getAllMenu, findByPage } from "@/api/creditmanage/index";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
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
      editVisible: false, //编辑询价单
      innerVisible1: false, //编辑询价单新增商品弹窗
      customerVisible1: false, //编辑询价单客户选择弹窗
      deleteVisible: false, //删除商品弹框
      orderNumber: "", //销售单号
      deposit: "", //定金
      saleName: "", //销售代表
      deIndex: "",
      detailId: "", //商品明细ID
      billId: "", //
      toList: "", //
      fromList: "", //
      userList: [],
      tableData: [],
      form: {
        arrs: [],
        goods: []
      },
      formData: {
        current_page: 1,
        page_size: 2,
        total_count: 0,
        goodsInfo: ""
      },
      customerDatas: {
        pageNum: 1,
        pageSize: 10,
        total_count: 0,
        keywords: ""
      },
      list: [], //客户列表
      editDatas: {},
      editDatas1: [],
      elTable: [],
      rules: {
        offerEndTime: [
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  props: [
    "editVisibles",
    "orderDatas",
    "fromData",
    "toData",
    "sendId",
    "ruleForm",
    "options1"
  ],
  created() {
    this.getName();
  },
  computed: {
    total1() {
      let totals = 0;
      let _this = this;
      if (_this.editDatas.details && _this.editDatas.details.length > 0) {
        for (var i = 0; i < _this.editDatas.details.length; i++) {
          if (!isNaN(_this.editDatas.details[i].goodsTotalPrice)) {
            totals += parseFloat(_this.editDatas.details[i].goodsTotalPrice);
          } else {
            totals = 0;
          }
        }
      }
      return totals;
    }
  },
  watch: {
    editVisibles(val) {
      this.editVisible = val;
    },
    orderDatas(val) {
      this.editDatas = val;
    },
    fromData(val) {
      this.fromList = val;
    },
    toData(val) {
      this.toList = val;
    },
    sendId(val) {
      this.billId = val;
    },
    "editDatas.details": {
      handler(val) {
        if (val.length > 0) {
          for (let i = 0; i < val.length; i++) {
            val[i].diffPrice =
              val[i].beforeGoodsCount * val[i].goodsPrice -
              val[i].goodsTotalPrice;
            val[i].diffCount = val[i].beforeGoodsCount - val[i].goodsCount;
          }
        }
      },
      deep: true
    },
    //监听组织架构
    "ruleForm.organizeId": {
      handler(val) {
        this.userList = [];
        this.editDatas.bizUserName = "";
        this.editDatas.bizUserId = "";
        if (val) {
          let data = {};
          data.organizeId = val;
          findByPage(data).then(res => {
            this.userList = res.data;
          });
        }
      },
      deep: true
    }
  },
  methods: {
    //_编辑生成报价单
    _findInquiry() {},
    //获取登录信息中的销售代表
    getName() {
      var books = localStorage.getItem("user"); //得到字符串
      var obj = JSON.parse(books);
      console.log(obj);
      this.form.salesRepresentatives = obj.data.sysuserName;
    },
    //关闭页面
    createClose() {
      this.$confirm("您确认要关闭吗？")
        .then(_ => {
          this.editVisible = false;
          this.userList = [];
          this.editDatas.bizUserName = "";
          this.editDatas.bizUserId = "";
          this.$emit("createCloseE", this.editVisible);
        })
        .catch(_ => {});
    },
    createClosing() {
      this.$confirm("您确认要关闭吗？")
        .then(_ => {
          this.editVisible = false;
          this.userList = [];
          this.editDatas.bizUserName = "";
          this.editDatas.bizUserId = "";
          this.$emit("createClosingE", this.editVisible);
        })
        .catch(_ => {});
    },
    //搜索商品
    goodsSearch() {
      this._getGoods();
    },
    //获取商品
    _getGoods() {
      getStockGoodsList(this.formData).then(res => {
        this.tableData = res.data.pageList;
        console.log(this.tableData);

        this.formData.total_count = res.data.count;
      });
    },
    //添加商品
    addSelectionChange(row) {
      this.selectData = row;
      let arr = this.selectData;
      for (let i = 0; i < this.selectData.length; i++) {
        this.selectData[i].goodsPrice = this.selectData[i].balancePrice;
        this.selectData[i].beforeGoodsCount = this.selectData[i].balanceCount;
      }
      arr.forEach(v => {
        v["goodsCount"] = "0";
        v["reason"] = "";
        v["goodsTotalPrice"] = "0";
        v["diffPrice"] = "0";
        v["diffCount"] = "0";
      });
      let copy1 = JSON.parse(JSON.stringify(arr));
      this.selectData = copy1;
      console.log(this.selectData);
    },
    //保存商品选择
    saveGoods1() {
      if (this.editDatas.details.length >= 1) {
        //遍历判断是否存在相同规格的商品在列表
        var arr = [];
        //如果等于长度就会多出一次循环，就会报错
        for (let i = 0; i < this.editDatas.details.length; i++) {
          for (let j = 0; j < this.selectData.length; j++) {
            if (this.editDatas.details[i].skuId == this.selectData[j].skuId) {
              throttleTipPop(
                this,
                "error",
                "已经存在相同规格的商品，不能重复添加！",
                2000
              );
              return false;
            }
          }
        }
        arr = this.editDatas.details.concat(this.selectData);
      } else if (this.editDatas.details.length <= 0) {
        arr = this.editDatas.details.concat(this.selectData);
      }
      this.editDatas.details = arr;

      this.selectData = [];
      this.innerVisible1 = false;
    },
    //选择删除
    deleteGoods() {
      if (this.deIndex === "") {
        throttleTipPop(this, "warning", "请选择要删除的选项", 2000);
      } else {
        this.deleteVisible = true;
      }
    },
    cancelGoods() {
      if (this.deIndex !== "") {
        this.editDatas.details.splice(this.deIndex, 1);
        throttleTipPop(this, "success", "删除操作成功", 2000);
        this.deleteVisible = false;
      } else {
        return false;
      }
    },
    //添加商品弹窗
    addGoods() {
      this._getGoods();
      this.innerVisible1 = true;
    },
    //选中,取消
    handleSelectionChange(val) {
      console.log(val);

      if (val[0]) {
        if (val.length > 1) {
          this.$refs.elTables.clearSelection();
          this.$refs.elTables.toggleRowSelection(val.pop());
        } else {
        }
        if (val.length == 1 && this.deIndex === "") {
          console.log(1);

          val.forEach((val, index) => {
            this.editDatas.details.forEach((v, i) => {
              // id 是每一行的数据id
              if (val.skuId == v.skuId) {
                this.deIndex = i;
                console.log(this.deIndex);
              }
            });
          });
        }
      } else if (!val[0]) {
        this.deIndex = "";
      }
    },
    //选择规格
    Clicktent(val, data) {
      data.index = val;
      console.log(this.$refs.elTable);
      this.$set(this.$refs.elTable.data);
      this.$forceUpdate();
    },
    editOrder() {
      this.editDatas.billId = this.billId;
      updateInventoryDetail(this.editDatas).then(res => {
        if (res.code === 200) {
          throttleTipPop(this, "success", "修改盘点单成功", 2000);

          this.editVisible = false;
          this.userList = [];
          this.editDatas.bizUserName = "";
          this.editDatas.bizUserId = "";
          this.$emit("editOrder1", this.editVisible);
        }
      });
    },
    //筛选出下拉表的label值
    chooseWarehousingUser(data) {
      let obj = {};
      obj = this.userList.find(item => {
        return item.sysuserId === data;
      });
      this.editDatas.bizUserName = obj.sysuserName;
    },
    addHandleSizeChange(val) {
      this.formData.page_size = val;
      this._getGoods();
    },
    addHandleCurrentChange(val) {
      this.formData.current_page = val;
      this._getGoods();
    },
    handleCurrentChange() {},
    handleSizeChange() {}
  }
};
</script>

<style lang="scss" scoped>
.editOrder {
  .imgBox {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    .showImg {
      width: 50px;
      height: 50px;
    }
  }
  .tips {
    font-size: 12px;
    color: #909399;
    line-height: 20px;
    margin-top: 10px;
  }
  .mcard0 {
    border: 1px solid #d7e0f1;
    margin-top: 20px;
  }
  .showImg {
    width: 95px;
    height: 95px;
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
/deep/ .el-table__body-wrapper::-webkit-scrollbar {
  width: 16px; // 横向滚动条
  height: 16px; // 纵向滚动条 必写
}
// 滚动条的滑块
/deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 3px;
}
/deep/ .el-dialog__headerbtn {
  top: 10px;
}
/deep/ .elTable {
  thead {
    .el-table-column--selection {
      .cell {
        display: none;
      }
    }
  }
}
</style>