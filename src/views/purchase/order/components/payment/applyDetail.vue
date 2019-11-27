<template>
  <div id="addPurchasing">
    <el-dialog width="75%" :visible.sync="detailVisible" :before-close="createClosing">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">付款单-申请付款</h4>
            </div>
          </el-form>
        </div>
      </div>

      <div class="mbottom">
        <div class="goods-fitter">
          <el-form ref="infoForm" :model="form" :rules="rules" label-width="140px" size="small">
            <div class="search-wrapper">
              <div class="mbottom">
                <h4 class="title1">申请信息</h4>
              </div>
              <div class="search-base">
                <el-row>
                  <el-col :span="6">
                    <el-col>
                      <el-form-item label="付款单编号：">
                        <el-col :span="23">
                          <span>保存后自动生成</span>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="申请日期：">
                      <el-col :span="23">
                        <span>{{payData.applyDate}}</span>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="申请人：">
                      <el-col :span="23">
                        <span>{{payData.applyUserName}}</span>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="部门：">
                      <el-col :span="23">
                        <span>{{payData.applyOrganizeName}}</span>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-col>
                      <el-form-item label="供应商名称：">
                        <el-col :span="23">
                          <span>{{payData.supplierName}}</span>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="户 名：">
                      <el-col :span="23">
                        <el-input v-model="payData.bankName" readonly></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="开户行：">
                      <el-col :span="23">
                        <el-input v-model="payData.bankOpeningName" readonly></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="银行账号：">
                      <el-col :span="23">
                        <el-input v-model="payData.bankAccount" readonly></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-col>
                      <el-form-item label="源单类型：">
                        <el-col :span="23">
                          <el-select v-model="payData.mergeType">
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
                  <el-col :span="6">
                    <el-form-item label="采购方式：">
                      <el-col :span="23">
                        <span>集采/一件代发</span>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="结算方式：">
                      <el-col :span="23">
                        <el-select v-model="form.payStyle">
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
                  <el-col :span="6">
                    <el-form-item label="预计收票日期：">
                      <el-col :span="23">
                        <el-date-picker
                          v-model="payData.expectedCollectDate"
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
                  <el-col :span="18">
                    <el-form-item label="付款事由：" prop="storageMan">
                      <el-col :span="24">
                        <el-input v-model="payData.payReason" placeholder="请输入内容"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="申请金额：" prop="goodsWarehouse">
                      <el-col :span="23">
                        <span>{{payData.applyAmount}}</span>
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
                <h4 class="title1">申请信息</h4>
              </div>
              <div class="search-base">
                <el-row>
                  <el-col :span="6">
                    <el-col>
                      <el-form-item label="付款单编号：">
                        <el-col :span="23">
                          <span>保存后自动生成</span>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="申请日期：">
                      <el-col :span="23">
                        <span>申请日期</span>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="申请人：">
                      <el-col :span="23">
                        <span>申请人</span>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="部门：">
                      <el-col :span="23">
                        <span>部门</span>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-col>
                      <el-form-item label="供应商名称：">
                        <el-col :span="23">
                          <span>供应商名称</span>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="户 名：">
                      <el-col :span="23">
                        <el-input></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="开户行：">
                      <el-col :span="23">
                        <el-input></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="银行账号：">
                      <el-col :span="23">
                        <el-input></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-col>
                      <el-form-item label="源单类型：">
                        <el-col :span="23">
                          <span>合并申请/单笔申请</span>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="采购方式：">
                      <el-col :span="23">
                        <span>集采/一件代发</span>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="结算方式：">
                      <el-col :span="23">
                        <el-select v-model="form.payStyle">
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
                  <el-col :span="6">
                    <el-form-item label="预计收票日期：">
                      <el-col :span="23">
                        <el-date-picker
                          v-model="form.exceptDate"
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
                  <el-col :span="18">
                    <el-form-item label="付款事由：" prop="storageMan">
                      <el-col :span="24">
                        <el-input placeholder="请输入内容"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="申请金额：" prop="goodsWarehouse">
                      <el-col :span="23">
                        <span>自动计算</span>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <!-- <div class="mbottom">
              <div class="goods-fitter">
                <el-form ref="infoForm" :model="form" :rules="rules" label-width="140px" size="small">
                  <div class="search-wrapper">
                    <div class="mbottom">
                      <h4 class="title1">支付信息</h4>
                    </div>
                    <div class="search-base">
                      <el-row>
                        <el-col :span="6">
                            <el-col>
                                <el-form-item label="签单公司：">
                                <el-col :span="23">
                                    <span>签单公司</span>
                                </el-col>
                                </el-form-item>
                            </el-col>
                            </el-col>
                          
                            <el-col :span="6">
                                <el-form-item label="资金账户：">
                                    <el-col :span="23">
                                        <el-select v-model="form.payStyle">
                                            <el-option
                                                v-for="item in options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                                </el-option>
                                        </el-select>
                                    </el-col>
                                </el-form-item>
                            </el-col>

                            <el-col :span="6">
                                <el-form-item label="付款日期：">
                                        <el-col :span="23">
                                            <span>付款日期</span>
                                        </el-col>
                                </el-form-item>
                            </el-col>
                    
                            <el-col :span="6">
                            <el-form-item label="付款金额：">
                                <el-col :span="23">
                                        <el-col :span="23">
                                            <el-input></el-input>
                                        </el-col>
                                </el-col>
                            </el-form-item>
                            </el-col>
                      </el-row>
                     <el-row>
                          <el-col :span="12">
                            <el-form-item label="指定往来科目：" prop="logisticsTel">
                              <el-col :span="24">
                                <el-input v-model="form.logisticsTel"></el-input>
                              </el-col>
                            </el-form-item>
                          </el-col>
                        <el-col :span="12">
                            <el-form-item label="指定资金科目：" prop="footnote">
                                <el-col :span="24">
                                    <el-input v-model="form.logisticsRemark"
                                
                                    placeholder="请输入内容"></el-input>
                                </el-col>
                          </el-form-item> 
                        </el-col>                 
                      </el-row>
                      <el-row>
                          <el-col :span="24">
                           <el-form-item label="上传银行付款凭证：" prop="footnote"> 
                                <el-col :span="24">
                                    <el-form-item label="上传银行付款凭证：" prop="footnote"> 
                                        <el-col :span="20">
                                            <el-input></el-input>
                                        </el-col>
                                        <el-col :span="3" :offset="1">
                                                <el-button type="primary" size="small">上传</el-button>
                                                <el-button type="primary" size="small">查看</el-button>
                                        </el-col>
                                        </el-form-item>

                                </el-col>
                            </el-form-item>
                          </el-col>

                      </el-row>
                  
                     

                         

                    </div>
                  </div>
                </el-form>
              </div>
      </div>-->

      <div class="goods-fitter">
        <div class="mail-fitter" style="margin-top:20px">
          <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px" size="small">
            <div class="mail-wrapper">
              <h4 class="title1">订单明细</h4>
              <div class="search-base">
                <div class="mbottom">
                  <div class="goods-fitter">
                    <div class="mcard" style="padding-bottom:0">
                      <el-table
                        :data="tableData"
                        border
                        style="width: 100%"
                        height="500"
                        show-summary
                      >
                        <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                        <el-table-column
                          prop="customerType"
                          label="采购订单号"
                          align="center"
                          width="180"
                        >
                          <template slot-scope="scope">{{scope.row.goodsName}}</template>
                        </el-table-column>
                        <el-table-column prop="commonContactName" label="发货订单号" align="center">
                          <template slot-scope="scope">{{scope.row.specSize}}</template>
                        </el-table-column>
                        <el-table-column
                          prop="commonContactDept"
                          label="采购员"
                          align="center"
                          width="100"
                        >
                          <template slot-scope="scope">{{scope.row.unit}}</template>
                        </el-table-column>
                        <el-table-column prop="commonContactDept" label="商品代码" align="center">
                          <template slot-scope="scope">{{scope.row.inputQuantity}}</template>
                        </el-table-column>
                        <el-table-column
                          prop="commonContactDept"
                          label="商品名称"
                          align="center"
                          width="100"
                        >
                          <template slot-scope="scope">{{scope.row.inputtedQuantity}}</template>
                        </el-table-column>
                        <el-table-column
                          prop="commonContactDept"
                          label="规格型号"
                          align="center"
                          width="100"
                        >
                          <template slot-scope="scope">{{scope.row.noInputQuantity}}</template>
                        </el-table-column>
                        <el-table-column
                          prop="commonContactDept"
                          label="订单总数量"
                          align="center"
                          width="100"
                        >
                          <template slot-scope="scope">{{scope.row.noInputQuantity}}</template>
                        </el-table-column>
                        <el-table-column
                          prop="commonContactDept"
                          label="已结数量"
                          align="center"
                          width="100"
                        >
                          <template slot-scope="scope">{{scope.row.noInputQuantity}}</template>
                        </el-table-column>
                        <el-table-column
                          prop="commonContactDept"
                          label="本次结算数量"
                          align="center"
                          width="110"
                        >
                          <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.inputQuantity"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="剩余数量" align="center" width="100">
                          <template slot-scope="scope">{{scope.row.notaxCostPrice}}</template>
                        </el-table-column>
                        <el-table-column label="含税单价 " align="center" width="100">
                          <template slot-scope="scope">{{scope.row.taxation}}</template>
                        </el-table-column>
                        <el-table-column label="含税总金额" align="center" width="100">
                          <template slot-scope="scope">{{scope.row.taxation}}</template>
                        </el-table-column>
                      </el-table>

                      <div class="pagination">
                        <el-pagination
                          @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          :current-page="tableDatas.currentPage"
                          :page-sizes="[10,20,50,100]"
                          :page-size="tableDatas.size"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="tableDatas.total"
                        ></el-pagination>
                      </div>
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
    <el-dialog :visible.sync="dialogVisible" :modal="true" :append-to-body="false">
      <img width="100%" :src="dialogImageUrl" alt />
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
  </div>
</template>

<script>
import { getErpGoods } from "@/api/product/index";
import { deleteImg } from "@/api/sale/index";
import { saveStorage } from "@/api/purchase/index";
import { throttleTipPop } from "@/utils/functions.js";
export default {
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      files: [],
      detailVisible: false,
      dialogImageUrl: "",
      dialogVisible: false,
      storeData: "",
      deletePath: "", //删除上传路径
      imgArr: [], //上传数组
      purchaseOrderId1: "",
      logisticsData: "",
      warehouseData: "",
      dataArr: [],
      payData: {},
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
      options: [
        {
          value: 1,
          label: "合并申请"
        },
        {
          value: 2,
          label: "单笔申请"
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
  props: ["detailVisibles", "payDetail"],
  watch: {
    detailVisibles(val) {
      this.detailVisible = val;
    },
    payDetail(val) {
      this.payData = val;
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
      this.detailVisible = false;
      this.files = [];
      this.$emit("createClose3", this.detailVisible);
    },
    createClosing() {
      this.detailVisible = false;
      this.files = [];
      this.$emit("createClosing3", this.detailVisible);
    },
    createStorage() {},
    address() {},

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
  .blue {
    cursor: pointer;
    color: #4a99fa;
    text-decoration: underline;
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
</style>