<template>
  <div>
    <div class="top_div">
      <div class="goods-fitter">
        <el-form label-width="130px" size="small">
          <div class="search-wrapper">
            <h4 class="title">搜索条件</h4>
            <div class="search-base serch-time">
              <el-row>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="产品名称：">
                      <el-col :span="23">
                        <el-input v-model="form.goodsName" clearable placeholder="请输入关键字"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="客户名称：">
                      <el-col :span="23">
                        <el-input v-model="form.customerName" clearable placeholder="请输入关键字"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="客诉信息：">
                      <el-col :span="23">
                        <el-input v-model="form.applyInfo" clearable placeholder="请输入客诉人名称或联系电话"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="物流单号：">
                      <el-col :span="23">
                        <el-input v-model="form.logisticNo" clearable placeholder="请输入关键字"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="2" class="btn_right">
                  <el-button type="primary" size="small" @click="aftersalepageb(true)">查询</el-button>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="订单(售后)单号：">
                      <el-col :span="23">
                        <el-input v-model="form.orderSn" clearable placeholder="请输入订单号或售后单号"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mcard">
      <div class="allorder">
        <el-table :data="tableData" border stripe @row-click='aftergoodslistb'>
          <el-table-column type="index" width="55" align="center" label="序号" :resizable="false"></el-table-column>
          <el-table-column :resizable="false" label="状态" align="center" width="80">
            <template slot-scope="scope">已处理</template>
          </el-table-column>
          <el-table-column label="单位名称" align="center" width="200">
            <template slot-scope="scope">
              <div class="txt_left">客户名称：{{scope.row.customerName?scope.row.customerName:'暂无信息'}}</div>
              <div class="txt_left">平台名称：{{scope.row.projectName?scope.row.projectName:'暂无信息'}}</div>
              <div class="txt_left">服务商：{{scope.row.agencyName?scope.row.agencyName:'暂无信息'}}</div>
            </template>
          </el-table-column>
          <el-table-column label="客诉人信息" align="center" width="200">
            <template slot-scope="scope">
              <div class="txt_left">客诉联系人：{{scope.row.applierName}}</div>
              <div class="txt_left">客诉联系电话：{{scope.row.applierPhone}}</div>
              <div class="txt_left">地址：{{scope.row.applierAddress}}</div>
              <div class="txt_left">物流公司：{{scope.row.returnShipping?scope.row.returnShipping:'暂无信息'}}</div>
              <div class="txt_left">物流单号：{{scope.row.returnLogisticNo?scope.row.returnLogisticNo:"暂无信息"}}</div>
            </template>
          </el-table-column>
          <el-table-column label="订单信息" align="center" width="150">
            <template slot-scope="scope">
              <div class="txt_left">订单号：{{scope.row.saleSn}}</div>
              <div class="txt_left">售后单号：{{scope.row.afterSaleSn}}</div>
              <div class="txt_left">创建时间：{{scope.row.createTime}}</div>
            </template>
          </el-table-column>
          <el-table-column :resizable="false" label="故障描述" align="center" width="150">
            <template slot-scope="scope">
              <div class="txt_left">内容：{{scope.row.questionDesc}}</div>
              <div class="txt_left" v-if="scope.row.showPic == 1">
                <el-button type="primary" size="small" @click="attachment(scope.row)">查看附件</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column :resizable="false" label="售后/要求" align="center" width="130">
            <template slot-scope="scope">{{scope.row.returnTypeName}}</template>
          </el-table-column>
          <el-table-column :resizable="false" label="处理方法" align="center" width="130">
            <template slot-scope="scope">{{scope.row.customerRequire}}</template>
          </el-table-column>
          <el-table-column label="处理结果" align="center" width="130">
            <template slot-scope="scope">{{scope.row.solveResult}}</template>
          </el-table-column>
          <el-table-column :resizable="false" label="进度说明" align="center">
            <template slot-scope="scope">
              <div class="txt_left">申请人：{{scope.row.createrName}}</div>
              <div class="txt_left">申请原因：暂无</div>
              <div class="txt_left">
                <el-button type="primary" size="small" @click="approvalsFunc(scope.row)">查看进度表</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column :resizable="false" label="操作" align="center" width="150">
            <template slot-scope="scope">
              <div :key="scope.row.afterId">
                <div class="small-Idiv1" @click.stop="aftersales(scope.row,true)">
                  <div class="i-div huishouzhan">
                    <img src="../../../common/images/icon/查看详情.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;margin-left:4px;">查看</span>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
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
    </div>
    <span class="goodsdetail">商品明细</span>
    <div class="mcard" >
      <div class="allorder">
        <el-table :data="tableData2" border ref="table" stripe>
          <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
          <el-table-column label="图样" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.thumbnailImgUrl" alt="" class="img_size">
            </template>
          </el-table-column>
          <el-table-column label="商品信息" align="center" width="200">
            <template slot-scope="scope">
              <div class="txt_left">产品名称：{{scope.row.goodsName}}</div>
              <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
              <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
              <div class="txt_left">SKU：{{scope.row.goodsAttr}}</div>
            </template>
          </el-table-column>
          <el-table-column label="规格尺寸" align="center">
            <template slot-scope="scope">
              <div class="txt_left">SKU：{{scope.row.goodsAttr}}</div>
            </template>
          </el-table-column>
          <el-table-column label="数量" align="center" prop="complainQuantity"></el-table-column>
          <el-table-column label="结算价" align="center" prop="specialPrice"></el-table-column>
          <el-table-column label="合计" align="center" prop="totalAmount"></el-table-column>
          <el-table-column label="分销结算价" align="center" prop="distributePrice"></el-table-column>
          <el-table-column label="分销结算合计" align="center" prop="distrTotalAmount"></el-table-column>
          <el-table-column label="供应商信息" align="center"  width="140">
            <template slot-scope="scope">
              <div class="txt_left">供应商名称：{{scope.row.supplierName}}</div>
              <div class="txt_left">订单处理人：{{scope.row.supplierConsignee}}</div>
              <div class="txt_left">联系电话：{{scope.row.supplierPhone}}</div>
              <div class="txt_left">地址：{{scope.row.supplierAddress}}</div>
            </template>
          </el-table-column>
          <el-table-column label="采购成本价" align="center" prop="supplyPrice" width="80"></el-table-column>
          <el-table-column label="合计" align="center" prop="costTotalAmount"></el-table-column>
          <el-table-column label="运费" align="center" prop="firstShippingFee"></el-table-column>
          <el-table-column label="物流信息" align="center" width="140">
            <template slot-scope="scope">
              <div class="txt_left">快递公司：{{scope.row.shippingName?scope.row.shippingName:"暂无信息"}}</div>
              <div class="txt_left">快递单号：{{scope.row.logisticsNo?scope.row.logisticsNo:"暂无信息"}}</div>
              <div class="txt_left">地址：{{scope.row.applierAddress}}</div>
              <el-button
                v-if="scope.row.complainId && scope.row.logisticsNo"
                type="primary"
                size="small"
                @click="informafunc(scope.row)"
                style="margin-bottom:6px"
              >物流信息</el-button>
            </template>
          </el-table-column>
          <el-table-column type="expand" width="1">
            <template slot-scope="props">
              <div class="mbottom">
                <div class="search-wrapper">
                  <h4 class="title">包裹信息</h4>
                  <div class="baoguo11">供货方： 物流信息：{{logistics.shippingName}} | {{logistics.logisticsNo}}</div>
                  <div class="block" style="padding-left:6px;margin-top:20px;"  v-if="activities.length">
                    <el-timeline>
                      <el-timeline-item
                        v-for="(activity, index) in activities"
                        :key="index"
                        :icon="activity.icon"
                        :type="activity.type"
                        :color="activity.color"
                        :size="activity.size"
                        :timestamp="activity.time"
                      >
                        <span class="green" v-if=" activities.length-1">{{activity.context}}</span>
                        <span class="greem" v-if=" index != 0">{{activity.context}}</span>
                      </el-timeline-item>
                    </el-timeline>
                  </div>
                  <div class="block" style="padding-left:6px;margin-top:20px;"  v-if="!activities.length">
                  暂无物流信息
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column :resizable="false" label="操作" align="center" width="150">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 查看附件 -->
    <el-dialog title="查看附件" :visible.sync="attachmentstate" width="668px">
      <div class="bigDiv"  v-if="imgArr.length">
        <div class="imgDiv" v-for="(item,index) in imgArr" :key="index"   @click="imgClick(item)">
          <img :src="item" alt="" style="width: 134px; height: 134px">
        </div>
      </div>
      <div   v-if="!imgArr.length">暂无附件</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="attachmentstate = false" size="small">关 闭</el-button>
      </span>
    </el-dialog>
    <shipped-dialog :dialog="dialogVisible" :passdata="passdata" @closediv="changedia"></shipped-dialog>
    <approvals :dialog="approvalsShow" :progressdata='progressdata' @closeapproval="changeapproval"></approvals>
    <logistics :logisticshow="logisticshow" @closelogistics="logisticsfunc"></logistics>
    <product :productshow="productshow" @closeproduct="productfunc"></product>
    <upgradeclient :upgradeclientshow="upgradeclientshow" @closeupgrade="upgradefunc" :upgradedata='upgradedata'></upgradeclient>
  
    <el-dialog title="图片" :visible.sync="imgsmallArr.length?true:false" width="600px" :before-close="closeimg">
        <div>
          <img :src="imgsmallArr[0]" alt="" style="width:100%;height:100%">
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="imgsmallArr = []" size="small">关 闭</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import shippedDialog from "./component/shippedDialog";
import approvals from "./component/approvals";
import logistics from "./component/logistics"; //审核
import product from "./component/product"; //签收退件
import upgradeclient from "./component/upgradeclient"; //升级客诉
import { aftersalepageb, findpicb , findafterlog , aftergoodslistb , findlogisticsdetailb} from "@/api/order/index";
export default {
  props: ["table"],
  data() {
    return {
      logistics:{},
      passdata:{},
      attachmentstate: false, // 查看附件
      dialogVisible: false, // 查看售后弹窗
      approvalsShow: false, // 审批流程弹窗
      logisticshow: false, // 物流信息弹窗
      productshow: false, // 签收退件弹窗
      upgradeclientshow:false, // 升级客诉弹窗
      tableData: [],
      tableData2: [],
      imgsmallArr:[],
      imgArr:[],
      storedata: {},
      view:true,
      progressdata:{},
      upgradedata:{},
      form: {
        pageIndex: 0,
        pageSize: 10,
        total_count: 0,
      },
      activities: []
    };
  },
  methods: {
    closeimg(){
      this.imgsmallArr = []
    },
    imgClick(val){
      this.imgsmallArr = []
      this.imgsmallArr.push(val)
    },
    // 物流信息
    async informafunc(row) {
      let obj = {
        complainId:row.complainId,
        logisticsNo:row.logisticsNo
      }
      this.logistics = row
      const { data } = await findlogisticsdetailb(obj)
      data.length?data[0].color = '#4A99FA':''
      this.activities = data || []
      let $table = this.$refs.table;
      $table.toggleRowExpansion(row);
    },
    // 升级客诉
    upgradefunc(data) {
      if(data){
        this.upgradeclientshow = true;
        this.upgradedata = data
      }else{
        this.upgradeclientshow = false;
      }
    },
    //签收退货
    productfunc(val) {
      if (val) {
        this.productshow = true;
      } else {
        this.productshow = false;
      }
    },
    changedia(val) {
      this.dialogVisible = val;
    },
    logisticsfunc(val) {
      this.logisticshow = val;
    },
    changeapproval(val) {
      this.approvalsShow = val;
    },
    // 申请售后
    aftersales(data,type) {
      type?this.view = true:this.view = false
      this.dialogVisible = true;
      this.passdata = data
    },
    // 查看附件
    async attachment(val, type) {
      const { data } = await findpicb(val.complainId);
      this.imgArr = data || []
      this.attachmentstate = true;
    },
    // 审批流程弹窗
    async approvalsFunc(val) {
      this.progressdata = val
      this.approvalsShow = true;
    },
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.aftersalepageb()
    },
    handleCurrentChange(val) {
      this.form.pageIndex = val;
      this.aftersalepageb()
    },
    handleSizeChange2(val) {
      this.form.pageSize2 = val;
    },
    handleCurrentChange2(val) {
      this.form.pageIndex2 = val;
    },
    async aftersalepageb(val) {
      if(val){
        this.form.pageIndex = 1
      }
      let obj = {
        pageIndex: this.form.pageIndex,
        pageSize: this.form.pageSize,
        requestStatus: 3, // 已处理
        goodsName: this.form.goodsName,
        customerName: this.form.customerName,
        applyInfo: this.form.applyInfo,
        logisticNo: this.form.logisticNo,
        orderSn:this.form.orderSn,
      };
      const { data } = await aftersalepageb(obj);
      this.tableData = data.pageList;
      this.form.total_count = data.count;
    },
    async aftergoodslistb (row, column, event){
      const { data } = await aftergoodslistb(row.complainId)
      this.tableData2 = data
    }
  },
  components: {
    shippedDialog,
    approvals,
    logistics,
    product,
    upgradeclient
  },
  created() {
    this.aftersalepageb();
  },
  watch: {
    table(val) {
      console.log(val);
    }
  }
};
</script>

<style  lang="scss" scoped>
@import "@/common/scss/variable.scss";
.line-div {
  display: flex;
  justify-content: space-evenly;
}
.small_top {
  margin-top: 10px;
}
.addfocus {
  position: absolute;
  left: 750px;
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
.txt_left {
  padding-left: 10px;
}
.mar_top {
  margin-top: 5px;
}
.mcard {
  border: 1px solid rgba(215, 225, 241, 1);
}
.imgDiv {
  width: 134px;
  height: 134px;
  margin-right: 16px;
  margin-top: 16px;
}
.imgDiv:nth-child(1) {
  margin-top: 0;
}
.imgDiv:nth-child(2) {
  margin-top: 0;
}
.imgDiv:nth-child(3) {
  margin-top: 0;
}
.imgDiv:nth-child(4) {
  margin-top: 0;
}
.bigDiv {
  width: 680px;
  display: flex;
  flex-wrap: wrap;
}
.btn_line-div {
  justify-content: space-around;
  margin-top: 0;
}
.mbottom {
  text-align: left;
  padding: 20px;
  margin: 20px;
  border: 1px solid rgba(215, 225, 241, 1);
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
      padding-left: 20px;
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
.baoguo11 {
  background: #f3f7fc;
  height: 35px;
  width: 100%;
  line-height: 35px;
  padding-left: 20px;
}
.top_div{
  margin-bottom: 20px;
}
.goodsdetail{
  display: block;
  margin-top: 30px;
  width:115px;
  height:39px;
  background:rgba(255,255,255,1);
  text-align: center;
  line-height: 39px;
  border: 1px solid rgb(215, 224, 241);
  border-bottom:0;
  position: relative;
  top: 1px;
}
.img_size{
  width:95px;
  height: 95px;
}
.small-Idiv {
  float: left;
  width: 45%;
  padding-top: 10px;
}
.small-Idiv:nth-of-type(odd) {
  margin-left: 4%;
}
/deep/ .el-dialog__headerbtn{
    position: absolute;
    top: 8px;
    right: 12px;
    padding: 0;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 16px;
}
</style>