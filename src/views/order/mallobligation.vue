<template>
  <!-- 待付款 -->
  <div class>
    <div class="mbottom allorder">
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
                          :default-time="['00:00:00', '23:59:59']"
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
                  <el-button type="primary" size="small" v-permit="'orderServer:importExpress'">快递单导入</el-button>
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
            style="width:1553px;overflow: hidden;"
            border
            :span-method="arraySpanMethod"
          >
            <el-table-column type="selection" width="55" align="center" :resizable="false"></el-table-column>
            <el-table-column label="商品详情" align="center" width="260" :resizable="false">
              <template slot-scope="scope" style="height:200px">
                <div class="information">
                  <span v-if="sysuserType !=1 " :class="scope.row.pushStatus ===0 && scope.row.pushGroup === 0 ?'notpush':'havepush'">{{scope.row.pushStatus ===0 && scope.row.pushGroup === 0 ?'未推送供应商':'已推送供应商'}}</span>
                  <span class="tent_span">订单编号：{{scope.row.orderSn}}</span>
                  <span class="tent_span">下单时间：{{scope.row.createTime}}</span>
                  <span class="tent_span">共{{scope.row.goodsNumber}}件商品</span>
                  <span class="tent_span">订单总价：{{scope.row.totalAmount}}元</span>
                  <span class="tent_span">采购账号：{{scope.row.userName}}</span>
                  <span class="tent_span" style="color: #4b99fb;">支付方式：{{scope.row.payName}}</span>
                  <span class="addfocus">
                    <!-- <el-button type="primary" size="small" @click="orderMarkingfunc(scope.row.orderId)">添加标记</el-button> -->
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
                  </div>
                  <div class="btn_div">
                    <span>{{scope.row.statusMsg}}</span>
                    <div style="margin-top:5px" v-if="scope.row.isAudit == true">
                      <el-button type="primary" size="small" @click="audit(scope.row)" v-permit="'orderServer:audit'">审核</el-button>
                    </div>
                  </div>



                  <!-- <div class="independent">{{scope.row.payName}}</div>
                  <div class="independent Courier">{{scope.row.shippingName}}</div>-->
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
          <el-button type="primary" @click="orderMarking = false" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 审核弹框 -->
      <el-dialog
      title="审核"
      :visible.sync="auditDialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form  label-width="100px">
        <el-form-item label="审核状态:" >
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
  </div>
</template>

<script>
import { getAllorder, getTagorder,jicaiGetAllorder,processingAuditTask,exportOrder } from "@/api/order/index";

export default {
  data() {
    return {
      auditDialogVisible: false,
      auditState: 1,
      auditTextarea: '',
      sysuserType:0, //角色状态
      orderMarking: false, //添加标记
      input: "",
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
        requestStatus: 1 //代付款
      },
      tableData: [],
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
    audit(){
       this.auditDialogVisible = true;
       this.auditrow = row;
    },
    //审核确定按钮
    examine(){
      //此处调取审核接口
      let userData = JSON.parse(window.localStorage.getItem("user")).data;
      // console.log(userData)
      let obj = {
        action: this.auditState,
        userId: userData.sysuserId,
        auditList: [{
            auditId:this.auditrow.auditDetail.auditId,
             taskId:this.auditrow.auditDetail.taskId,
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
    //导出订单
    exportOrder() {
      // let type = JSON.parse(localStorage.getItem("user")).data.sysuserType;
      // let time = this.form.timer ? this.form.timer : ["", ""];
      // window.location.href =
      //   this.baseUrl1 +
      //   "/api/open/b/b2b2c/orderservice/purchasing/order/export.json?pageIndex=" +
      //   this.form.pageIndex +
      //   "&pageSize=" +
      //   this.form.pageSize +
      //   "&requestStatus=" +
      //   this.form.requestStatus +
      //   "&startTime=" +
      //   time[0] +
      //   "&endTime=" +
      //   time[1] +
      //   "&keyWordType=" +
      //   this.form.keyWordType +
      //   "&keyWordValue=" +
      //   this.form.keyWordValue +
      //   "&fromType=" +
      //   this.form.fromType +
      //   "&sortBySupply=" +
      //   this.form.sortBySupply +
      //   "&orderIdArray=" +
      //   this.form.orderIdArray +
      //   "&sysuserType=" +
      //   type;
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
    orderMarkingfunc(val) {
      this.orderMarking = true;
      this.orderId = val;
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
        jicaiGetAllorder(obj).then(res => {
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
    orderDetail(id) {
      this.$router.push({ name: "OrderServerDetail", query: { orderId: id } });
    }
  },
  components: {}
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
.name_div {
  width: 260px;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
.all2 {
  min-width: 1533px;
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
</style>
