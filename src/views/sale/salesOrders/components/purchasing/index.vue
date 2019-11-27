<template>
  <div id="purchasing">
    <div class="margin0">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">采购申请</h4>
              <div class="search-base">
                <el-row>
                  <el-col :span="5">
                    <el-col>
                      <el-form-item label="客户名称：">
                        <el-col :span="21">
                          <el-input v-model="form.customerName" placeholder="请输入客户名称"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="联系人：">
                      <el-col :span="21">
                        <el-input v-model="form.customerContact" placeholder="请输入联系人"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="手机号码：">
                      <el-col :span="21">
                        <el-input v-model="form.customerPhone" placeholder="请输入手机号码"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="销售单号：">
                      <el-col :span="21">
                        <el-input v-model="form.saleOrderNo" placeholder="请输入销售单号"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="primary" size="small" @click="search(true)">搜索</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="5">
                    <el-form-item label="订货单号：">
                      <el-col :span="21">
                        <el-input v-model="form.spoNo" placeholder="请输入订货单号"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="商品搜索：">
                      <el-col :span="21">
                        <el-input v-model="form.goodsName" placeholder="请输入商品名称/编码"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="新增日期：">
                      <el-col :span="21">
                        <el-date-picker
                          v-model="form.createDate"
                          type="daterange"
                          range-separator="-"
                          valueFormat="yyyy-MM-dd HH:mm:ss"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          style="width:100%"
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
        <el-table
          :data="pageList"
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
          <el-table-column label="客户信息" prop="name" align="center" width="230">
            <template slot-scope="scope">
              <div class="txt_left">客户名称：{{scope.row.customerName}}</div>
              <div class="txt_left">部门：{{scope.row.department}}</div>
              <div class="txt_left">联系人：{{scope.row.customerContact}}</div>
              <div class="txt_left">联系电话：{{scope.row.tel}}</div>
              <div class="txt_left">手机：{{scope.row.phone}}</div>
            </template>
          </el-table-column>
          <el-table-column label="销售订单信息" prop="name" align="center" width="250">
            <template slot-scope="scope">
              <div class="txt_left">销售单号：{{scope.row.saleOrderNo}}</div>
              <div class="txt_left">订货单号：{{scope.row.spoNo}}</div>
              <div class="txt_left">经销商： {{scope.row.agencyName}}</div>
              <div class="txt_left">客户平台：{{scope.row.projectName}}</div>
              <div class="txt_left">创建时间：{{scope.row.createTime}}</div>
              <div class="txt_left">销售员：{{scope.row.bizUserName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="订单金额" prop="name" align="center">
            <template slot-scope="scope">{{scope.row.orderTotalAmount}}</template>
          </el-table-column>
          <el-table-column label="本次采销金额" prop="name" align="center">
            <template slot-scope="scope">{{scope.row.thisOrderTotalPrice}}</template>
          </el-table-column>
          <el-table-column label="未采销金额" prop="name" align="center">
            <template slot-scope="scope">{{scope.row.unorderedTotalPrice}}</template>
          </el-table-column>

          <el-table-column label="进度表" prop="name" align="center" width="200">
            <template slot-scope="scope">
              <div v-html="scope.row.billStatus"></div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="150">
            <template slot-scope="scope">
              <div class="line">
                <div
                  class="small-Idiv"
                  @click="pushSale(scope.row)"
                  v-permit="'SaleOrder:push_pur'"
                >
                  <div class="i-div">
                    <img src="@/common/images/icon/采购.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;">推送采购</span>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="form.pageIndex"
            :page-sizes="[5,10,30,50]"
            :page-size="form.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="form.count"
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
            >订货单【{{this.showNo}}】的商品明细</li>
          </ul>
        </div>
        <div class="tabs-content">
          <component :is="mainIndex" :goodsList="goodsList" :count="count" :showId="showId"></component>
        </div>
      </div>

      <!-- 推送诶采购组询价 -->
      <el-dialog :visible.sync="pushVisible" width="30%">
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form label-width="100px" size="small">
              <div class="search-wrapper">
                <h4 class="title">推送采购</h4>
              </div>
            </el-form>
          </div>
        </div>
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form ref="infoForm" :model="form" label-width="120px">
              <div class="search-wrapper">
                <div class="search-base">
                  <el-row>
                    <el-col :offset="4">
                      <el-form-item label="销售单号：">
                        <el-col :span="12">
                          <span>{{offerNo}}</span>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :offset="4">
                      <el-form-item label="指定采购组：">
                        <el-col :span="12">
                          <el-select
                            v-model="toPurchase"
                            placeholder="请选择"
                            @change="selectGet"
                            size="small"
                          >
                            <el-option
                              v-for="item in saleGroup"
                              :key="item.organizeId"
                              :label="item.organizeName"
                              :value="item.organizeId"
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
          <el-button type="danger" @click="pushVisible = false" size="small">关 闭</el-button>
          <el-button type="primary" @click="toSaler()" size="small">保存</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getCategory, getStoreList } from "@/api/public";
import {
  saleInquirys,
  getProjectOrder,
  getProjectOrderGoods,
  pushPurchase
} from "@/api/sale/index";
import { throttleTipPop } from "@/utils/functions.js";
import Goods from "./goods";
export default {
  data() {
    return {
      currentIndex: 0,
      mainIndex: "Goods",
      pushVisible: false, //推送采购
      saleGroup: [],
      toPurchase: "",
      count: 0, //
      pageList: [], //订货单列表
      spoId: "", ///订货单ID
      offerNo: "", //销售单号
      showNo: "", //显示商品列表用的编号
      showId: "",
      goodsList: [], //商品列表
      getIndex: "", //改变表格颜色用的下标
      organizeName: "", //采购组label值
      form: {
        pageIndex: 1,
        pageSize: 10,
        count: 0,
        customerName: "", //客户名称
        customerContact: "", //联系人
        customerPhone: "", //手机号码
        createDate: "", //新增日期
        saleOrderNo: "", //销售单号
        startTime: "", //
        endTime: "",
        goodsName: "", //商品
        spoNo: "" //订货单号
      },
      goodsData: {
        pageIndex: 1,
        pageSize: 10,
        count: 0
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
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
      ]
    };
  },
  created() {
    this._getProjectOrder();
  },
  watch: {
    "form.createDate": {
      handler(val, old) {
        if (val === null) {
          this.form.startTime = "";
          this.form.endTime = "";
        } else {
          this.form.startTime = val[0];
          this.form.endTime = val[1];
        }
      },
      deep: true
    }
  },
  computed: {},
  methods: {
    tabIndex(index) {
      this.currentIndex = index;
    },
    _getProjectOrder() {
      getProjectOrder(this.form).then(res => {
        this.pageList = res.data.pageList;
        this.form.count = res.data.count;
      });
    },
    //移交采购窗口
    pushSale(row) {
      this.offerNo = row.saleOrderNo;
      this.spoId = row.spoId;
      this.pushVisible = true;
      saleInquirys().then(res => {
        this.saleGroup = res.data.childNodes;
      });
    },
    //保存移交采购
    toSaler() {
      let obj = {};
      obj.spoId = this.spoId;
      obj.groupId = this.toPurchase;
      obj.groupName = this.organizeName;
      if (!obj.groupId || !obj.groupName) {
        throttleTipPop(this, "warning", "请选择采购组", 2000);
      } else {
        pushPurchase(obj).then(res => {
          if (res.code === 200) {
            throttleTipPop(this, "success", "推送采购成功", 2000);
            this.pushVisible = false;
            this._getProjectOrder();
            this.resetData();
          }
        });
      }
    },
    search() {
      this.form.pageIndex = 1;
      this._getProjectOrder();
      this.resetData();
    },
    //重置数据
    resetData() {
      this.goodsList = [];
      this.count = 0;
      this.showNo = "";
      this.getIndex = "";
    },
    selectGet(vId) {
      //这个vId也就是value值
      let obj = {};
      obj = this.saleGroup.find(item => {
        //这里是上面遍历的数据源
        return item.organizeId === vId; //筛选出匹配数据
      });
      console.log(obj.organizeName);
      this.organizeName = obj.organizeName;
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
      this.showId = row.spoId;
      this.showNo = row.spoNo;

      let obj = {};
      obj.pageIndex = this.goodsData.pageIndex;
      obj.pageSize = this.goodsData.pageSize;
      obj.spoId = this.showId;
      getProjectOrderGoods(obj).then(res => {
        this.goodsList = res.data.pageList;
        this.count = res.data.count;
      });
    },
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.resetData();
      this._getProjectOrder();
    },
    handleCurrentChange(val) {
      this.form.pageIndex = val;
      this.resetData();
      this._getProjectOrder();
    },
    handleSelectionChange() {}
  },
  components: {
    Goods
  }
};
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
#purchasing {
  .el-dialog__body {
    padding: 0 !important;
    background: none !important;
  }
  /deep/ .el-table__body tr:hover > td {
    background-color: none !important;
  }

  /deep/ .el-table__body tr.current-row > td {
    background-color: none !important;
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
  .margin1 {
    padding-left: 40px;
    padding-top: 20px;
    box-sizing: border-box;
  }

  .line {
    margin: 0 auto;
  }
  .small_top {
    margin-top: 10px;
  }

  .i-div {
    cursor: pointer;
  }
  /deep/ .el-dialog__headerbtn {
    top: 10px;
  }
}
</style>
