<template>
  <div class="look">
    <el-dialog :visible.sync="lookVisible" width="80%" :before-close="createClosing">
      <div class="mail-fitter">
        <div class="goods-fitter" style="margin-bottom:20px">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <div class="outButton">
                <el-button type="primary" style="margin-left:10px" v-print="'#printTest'">打印</el-button>
               <!--  <el-button type="primary">导出word</el-button>
                <el-button type="primary">导出XLS</el-button> -->
              </div>
            <div class="read" id="printTest" style="width:86%;margin:0 auto">
              <div class="orderTitle">
                <h1>礼品需求及报价清单</h1>
              </div>
              <el-row>
                <el-col>
                  <span >报价单号：{{editDatas.offerNo}}</span>
                  <span style="float:right;">报价日期：{{editDatas.offerEndTime}}</span>
                </el-col>
              </el-row>
              <div class="tableA" >
                <table
                  class="border-table"
                  border="1"
                  cellspacing="0"
                  cellpadding="0"
                  style="width:100%;font-size:16px;
                  font-family:Microsoft YaHei;
                  font-weight:400;
                  line-height:21px;
                  margin:0 auto;"
                >
                  <tbody>
                    <tr style="height:50px;line-height:50px">
                      <td width="40" align="center">
                        <span>序号</span>
                      </td>
                      <td width="100" align="center">
                        <strong>图样</strong>
                      </td>
                     
                      <td width="420" align="center">
                        <strong>商品信息</strong>
                      </td>
                      <td width="100" align="center">
                        <strong>数量</strong>
                      </td>
                      <td width="100" align="center">
                        <strong>单价(元)</strong>
                      </td>
                      <td width="100" align="center">
                        <strong>合计(元)</strong>
                      </td>
                      <td width="100" align="center">
                        <strong>交货日期</strong>
                      </td>
                      <td width="240" align="center">
                        <strong>配送地址</strong>
                      </td>
                    </tr>
                    <tr style="180px" v-for="(item,index) in editDatas.goodsDetailParam" :key="index">
                      <td align="center" style="vertical-align: middle;
                            text-align: center; "
                            >{{index+1}}</td>
                      <td align="center" 
                      style="vertical-align: middle;
                            text-align: center; ">
                        
                            <img
                              :src="item.goodsImgUrl" alt=""  v-show="item.goodsImgUrl" style="width:80px;height:80px;"
                            />
                          <img src="@/common/images/暂无图片.jpg" alt="" v-show="!item.goodsImgUrl" style="width:80px;height:80px;"/>
                       
                      </td>
                    
                      <td align="left">
                        <div class="goods">
                          <div class="txt_left">商品名称：{{item.goodsName}}</div>
                          <div class="txt_left">型号：{{item.modelNumber}}</div>
                          <div class="txt_left">品牌：{{item.brandName}}</div>
                          <div class="txt_left">SKU：{{item.goodsSkuId}}</div>
                          <div class="txt_left">货号：{{item.goodsSn}}</div>
                        </div>
                      </td>
                      <td align="center" 
                      style="vertical-align: middle;
                            text-align:center">{{item.goodsCount}}</td>
                      <td align="center"
                      style="vertical-align: middle;
                            text-align:center ">{{item.goodsUnitPrice}}</td>
                      <td align="center"
                        style="vertical-align: middle;
                            text-align:center ">
                        <span >{{item.goodsTotalMoney}}</span>
                      </td>
                      <td 
                      style="vertical-align:middle;
                            text-align:center; ">{{item.deliveryCycle}}
                        </td>
                      <td align="left" style="vertical-align: middle;
                            text-align: left; ">
                        <div class="goodsName">
                          <div class="txt_left">联系人：{{item.distContact}}</div>
                          <div class="txt_left">手机号码：{{item.distPhone}}</div>
                          <div class="txt_left">配送地址：{{item.distAddress}}</div>
                        </div>
                      </td>
                    </tr>
                    <tr style="line-height:30px;">
                      <td colspan="4" rowspan="2" style="color:#7A90FF;vertical-align: middle;
                            text-align:left;"
                      >
                        <div
                          class="invoice"
                        >提供发票类型：{{editDatas.invoiceType | invoice}} </div>
                      </td>

                      <td align="center" style="color:#7A90FF;">合计：</td>
                      <td align="center" style="color:#7A90FF;">{{editDatas.goodsTotalMoney}}</td>
                      <td colspan="2">&nbsp;</td>
                    </tr>
                    <tr style="line-height:35px;height:35px;color:#7A90FF">
                      <td align="center" style="color:#7A90FF;">税后合计：</td>
                      <td align="center" style="color:#7A90FF;">{{editDatas.taxTotalMoney}}</td>
                      <td colspan="2">&nbsp;</td>
                    </tr>
                    <tr style="line-height:35px;">
                      <td colspan="4" style="vertical-align: middle;
                            text-align: left; ">
                        <p>供应商名称：{{editDatas.offerCompany}}</p>
                        <p>盖章：</p>
                      </td>
                      <td>&nbsp;</td>
                      <td colspan="4" style="vertical-align: middle;
                            text-align: left; ">
                        <div class="txt_left">联系人：{{editDatas.offerContact}}</div>
                        <div class="txt_left">电话：{{editDatas.offerTel}}</div>
                        <div class="txt_left">邮箱：{{editDatas.offerEmail}}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            </div>
          </el-form>
        </div>
        
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="createClose" size="small">关 闭</el-button>
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
  editInquiry
} from "@/api/sale/index";
import { deleteGoods, getErpGoods } from "@/api/product/index";
import { getAllcustomer } from "@/api/customer";
import { throttleTipPop } from "@/utils/functions.js";
export default {
  filters:{
    invoice: function(val) {
      switch (val) {
        case 0:
          return "无需发票";
          break;
        case 1:
          return "增值税专用发票";
          break;
        case 2:
          return "普通发票";
          break;

        default:
          return;
      }
    },
  },
  data() {
    return {
      offerVisible1: false, //单位选择弹窗
      lookVisible: false, //编辑询价单
      innerVisible1: false, //编辑询价单新增商品弹窗
      customerVisible1: false, //编辑询价单客户选择弹窗
      editDatas: [],
     
    };
  },
  props: ["lookVisibles", "editDatasC"],
  created() {},
  watch: {
    lookVisibles(val) {
      this.lookVisible = val;
    },
    editDatasC(val) {
      this.editDatas = val;
      console.log(this.editDatas);
      
    }
  },
  methods: {
    //关闭页面
    createClose() {
      this.lookVisible = false;
      this.$emit("lookClose1", this.lookVisible);
    },
    createClosing() {
      this.lookVisible = false;
      this.$emit("lookClosing1", this.lookVisible);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.look {
  
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
}
.el-input-group__append button.el-button {
  width: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
.outButton {
  overflow: hidden;
  padding-bottom: 10px;
  border-bottom: 1px solid #d7e0f1;
  button {
    float: right;
  }
}
.orderTitle {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 70px;
  h1 {
    font-size: 40px;
    color: #343e4a;
    font-weight: 400;
  }
}
.tableA {
  table {
    width: 100%;
    border-color: #aaaaaa;
    border-collapse: collapse;
    tr td {
      border: 1px solid #aaaaaa;
    }
  }
}


</style>