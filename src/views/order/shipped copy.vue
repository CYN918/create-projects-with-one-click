<template>
  <!-- 已发货 -->
  <div class="after-sales">
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
                <el-col :span="4">
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
                </el-col>
                <el-col :span="6" class="btn_right">
                  <el-button type="primary" size="small" @click="_getAllorder(true)">查询</el-button>
                  <el-button type="primary" size="small" @click="exportOrder">导出订单</el-button>
                  <el-button type="primary" size="small" @click="_getAllorder(true,true)">按供应商排序</el-button>
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
            :span-method="arraySpanMethod"
            style="width:1533px;overflow: hidden;"
          >
            <el-table-column type="selection" width="55" align="center" :resizable="false"></el-table-column>
            <el-table-column label="商品详情" align="center" width="260" :resizable="false">
              <template slot-scope="scope" style="height:200px">
                <div class="information">
                  <span class="tent_span">订单编号：{{scope.row.orderSn}}</span>
                  <span class="tent_span">下单时间：{{scope.row.createTime}}</span>
                  <span class="tent_span">共{{scope.row.goodsNumber}}件商品</span>
                  <span class="tent_span">支付方式：{{scope.row.payName}}</span>
                  <span class="tent_span">采购账号：{{scope.row.userName}}</span>
                  <span class="tent_span">订单总价：{{scope.row.orderAmount}}元</span>
                  <span class="addfocus">
                    <el-button
                      type="primary"
                      size="small"
                      @click="orderDetail(scope.row.orderId)"
                    >查看详情</el-button>
                  </span>
                </div>
                <div class="content">
                  <div
                    v-for="(item,index) in scope.row.orderGoodsList"
                    :key="index"
                    :class="index!=0?'tent_div tent_top':'tent_div'"
                  >
                    <div class="name_div">
                      <img class="content_img" :src="item.thumbnailImgUrl" alt />
                      <span class="name">{{item.goodsName}}</span>
                    </div>
                    <div style="width:155px;padding-left:5px">
                      <div>品牌：{{item.brandName}}</div>
                      <div>型号：{{item.modelNumber}}</div>
                      <div>货号：{{item.goodsSn}}</div>
                      <div>条形码：{{item.goodsSn}}</div>
                    </div>
                    <span style="width:150px">{{item.goodsAttr}}</span>
                    <span style="width:100px">{{item.goodsPrice}}</span>
                    <span style="width:100px">{{item.quantity}}</span>
                    <span style="width:100px">{{item.specialPrice}}</span>
                    <span style="width:100px">{{item.goodsAmount}}</span>
                    <span style="width:150px">{{item.suppliersName}}</span>
                    <div style="width:140px" class="btn_div">
                      <span>{{scope.row.shippingName}}</span>
                      <span>{{scope.row.logisticsNo}}</span>
                    </div>
                    <span style="width:80px">{{item.deliveryTime}}</span>
                    <div class="btn_div">
                      <div>
                        <span>{{scope.row.statusMsg}}</span>
                      </div>
                      <div>
                        <el-button type="primary" size="small" @click="aftersales">申请售后</el-button>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              </template>
            </el-table-column>
            <el-table-column :resizable="false" label="商品信息" align="center" width="160"></el-table-column>
            <!-- <el-table-column :resizable="false" label="客户平台" align="center" width="80"></el-table-column> -->
            <el-table-column :resizable="false" label="规格尺寸" align="center" width="150"></el-table-column>
            <el-table-column :resizable="false" label="商城价" align="center" width="100"></el-table-column>
            <el-table-column :resizable="false" label="数量" align="center" width="100"></el-table-column>
            <el-table-column :resizable="false" label="结算价" align="center" width="100"></el-table-column>
            <el-table-column :resizable="false" label="合计" align="center" width="100"></el-table-column>
            <el-table-column :resizable="false" label="供应商" align="center" width="150"></el-table-column>
            <!-- <el-table-column :resizable="false" label="支付方式" align="center" width="100"></el-table-column> -->
            <el-table-column :resizable="false" label="物流信息" align="center" width="140"></el-table-column>
            <el-table-column :resizable="false" label="交货时间" align="center" width="90"></el-table-column>
            <el-table-column :resizable="false" label="状态/操作" align="center" width="128"></el-table-column>
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
    </div>
    <shipped-dialog :dialog="dialogVisible" @closediv="changedia"></shipped-dialog>
  </div>
</template>

<script>
import {
  getAllorder,
  getTagorder,
  getOdersupplier,
  resetSupplier
} from "@/api/order/index";
import shippedDialog from "./shippedDialog";
export default {
  data() {
    return {
      dialogVisible: false, //申请售后弹窗
      input: "",
      form: {
        pageIndex: 1,
        pageSize: 10,
        total_count: 0,
        timer: "",
        keyWordType: "",
        keyWordValue: "",
        fromType: "",
        sortBySupply: 0, //供应商排序
        orderIdArray: [], // 选中导出的数据
        requestStatus: 3 //已发货
      },
      tableData: []
    };
  },
  created() {
    this._getAllorder();
  },
  methods: {
    changedia(val) {
      this.dialogVisible = val;
    },
    // 申请售后
    aftersales() {
      this.dialogVisible = true;
    },
    //导出订单
    exportOrder() {
      let type = JSON.parse(localStorage.getItem("user")).data.sysuserType;
      let time = this.form.timer ? this.form.timer : ["", ""];
      window.location.href =
        this.baseUrl1 +
        "/api/open/b/b2b2c/orderservice/order/export.json?pageIndex=" +
        this.form.pageIndex +
        "&pageSize=" +
        this.form.pageSize +
        "&requestStatus=" +
        this.form.requestStatus +
        "&startTime=" +
        time[0] +
        "&endTime=" +
        time[1] +
        "&keyWordType=" +
        this.form.keyWordType +
        "&keyWordValue=" +
        this.form.keyWordValue +
        "&fromType=" +
        this.form.fromType +
        "&sortBySupply=" +
        this.form.sortBySupply +
        "&orderIdArray=" +
        this.form.orderIdArray +
        "&sysuserType=" +
        type;
    },
    orderDetail(id) {
      this.$router.push({ name: "OrderDetail", query: { orderId: id } });
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
        obj.timer = this.form.timer;
        obj.keyWordType = this.form.keyWordType;
        obj.keyWordValue = this.form.keyWordValue;
        obj.fromType = this.form.fromType;
        obj.requestStatus = this.form.requestStatus;
        obj.sortBySupply = this.form.sortBySupply;
        getAllorder(obj).then(res => {
          this.tableData = res.data.pageList;
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
    handleSizeChange(val) {
      this.form.pageSize = val;
      this._getAllorder();
    },
    handleCurrentChange(val) {
      this.form.pageIndex = val;
      this._getAllorder();
    }
  },
  components: {
    shippedDialog
  }
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
  left: 1000px;
}
.information {
  background: #f7faff;
  height: 56px;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  .tent_span {
    margin-right: 10px;
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
.all2 {
  min-width: 1533px;
}
</style>
