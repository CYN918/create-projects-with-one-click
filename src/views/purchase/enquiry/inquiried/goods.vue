<template>
  <div class="margin0">
    <div class="mcard" style="border:1px solid #d7e0f1">
      <el-table :data="goodsList1" border @selection-change="handleSelectionChange" stripe>
        <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
        <el-table-column label="询价状态" prop="name" align="center" width="100">
          <template slot-scope="scope">
                <div v-html="scope.row.offerStatusDesc"></div>
          </template>
        </el-table-column>
        <el-table-column label="图样" prop="name" align="center" width="140">
          <template slot-scope="scope">
             <img  :src="scope.row.goodsImgUrl" class="imgType" alt="" v-if="scope.row.goodsImgUrl"/>
             <img  src="@/common/images/缺省页.jpg" class="imgType" alt="" v-if="!scope.row.goodsImgUrl"/>
          </template>
        </el-table-column>
        <el-table-column label="商品信息" prop="name" align="center" width="200">
          <template slot-scope="scope">
            <div class="txt_left">产品名称：{{scope.row.goodsName}}</div>
            <div class="txt_left">
              <span style="margin-right:28px;">货</span>号：{{scope.row.goodsSn}}
            </div>
            <div class="txt_left">
              <span style="margin-right:28px;">型</span>号：{{scope.row.modelNumber}}
            </div>
            <div class="txt_left">
              <span style="margin-right:28px;">品</span>牌：{{scope.row.brandName}}
            </div>
            <div class="txt_left">
              <span style="margin-right:14px;">S</span>
              <span style="margin-right:13px;">K</span>U：无
            </div>
          </template>
        </el-table-column>
        <el-table-column label="规格尺寸" prop="name" align="center" width="140">
          <template slot-scope="scope">
                    {{scope.row.goodsSpecSize}}
          </template>
        </el-table-column>
        <el-table-column label="制作要求" prop="name" align="center" width="140">
          <template slot-scope="scope">
            <!-- <div class="txt_left">制作要求：{{scope.row.productRequire}}</div>
            <div class="txt_left">
              <span style="margin-right:28px">备</span>注：无
            </div> -->
            {{scope.row.productRequire}}
          </template>
        </el-table-column>
        <el-table-column label="物流信息" prop="name" align="center" width="120">
          <template slot-scope="scope">
            <div class="txt_left">运输方式：{{scope.row.transportMode}}</div>
            <div class="txt_left">配送地址：{{scope.row.distAddress}}</div>
          </template>
        </el-table-column>
        <el-table-column label="数量" prop="name" align="center">
          <template slot-scope="scope">
              {{scope.row.goodsCount}}
          </template>
        </el-table-column>
        <el-table-column label="税率" prop="name" align="center">
          <template slot-scope="scope">
                   <div v-if="scope.row.taxRate"> {{scope.row.taxRate}}%</div>
                    <div v-if="!scope.row.taxRate"> 0</div>
                   </template>
        </el-table-column>
        <el-table-column label="含税成本价" prop="name" align="center" width="100">
          <template slot-scope="scope">
                    {{scope.row.taxCostPrice}}
            </template>
        </el-table-column>
        <el-table-column label="交货日期" prop="name" align="center">
          <template slot-scope="scope">
                  {{scope.row.deliveryCycle | dateTime}}
          </template>
        </el-table-column>
        <el-table-column label="采销员" prop="name" align="center">
          <template slot-scope="scope">
                  {{scope.row.purchaserName}}
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="name" align="center" width="130" fixed="right">
          <template slot-scope="scope">
            <!-- <div class="line-div">
              <div class="small-Idiv" @click="toSale(scope.row)">
                <div class="i-div">
                  <img src="@/common/images/icon/指定采销.png" alt class="operation_img" />
                </div>
                <span style="word-break: keep-all;">指定采销员</span>
              </div>
            </div> -->
            <!-- <div class="line-div">
              <div class="small-Idiv" @click="toOffer(scope.row)"
              v-permit="'inquiry:supplier_quotation'">
                <div class="i-div">
                  <img src="@/common/images/icon/供应商报价.png" alt class="operation_img" />
                </div>
                <span style="word-break: keep-all;">供应商报价</span>
              </div>
            </div> -->
            <div class="line-div">
              <div class="small-Idiv" @click="toDetail(scope.row)"
              v-permit="'offer:view_quote'">
                <div class="i-div">
                  <img src="@/common/images/icon/查看报价.png" alt class="operation_img" />
                </div>
                <span style="word-break: keep-all;">查看报价</span>
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
          :page-sizes="[10, 30, 50, 100]"
          :page-size="form.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="form.count"
        ></el-pagination>
      </div>
    </div>
    <!-- 移交销售弹窗 -->
   <!--  <el-dialog :visible.sync="saleVisible" width="30%">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">移交销售员跟进</h4>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form ref="infoForm" :model="form"  label-width="120px">
            <div class="search-wrapper">
              <div class="search-base">
                <el-row>
                  <el-col :offset="4">
                    <el-form-item label="询价单号：">
                      <el-col :span="12">
                        <span>XJD1909110983947</span>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="line-height:24px;">
                  <div class="goodsTitle">
                    <span>商品名称：</span>
                  </div>
                  <div class="goodsRight">
                    <span>
                      韩国创意立体贺卡3D镂空定制手工明信片
                      生日祝福小卡片圣诞雪人树
                    </span>
                  </div>
                </el-row>
                <el-row>
                  <el-col :offset="4">
                    <el-form-item label="指定采销员：">
                      <el-col :span="12">
                        <el-select
                          v-model="toSaler"
                          placeholder="请选择"
                          style="width:100%"
                          @change="selectGet1"
                          size="small"
                        >
                          <el-option
                            v-for="(item,index) in purchaseList"
                            :key="index"
                            :label="item.sysuserName"
                            :value="item.sysuserId"
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
        <el-button type="danger" @click="saleVisible = false" size="small">关 闭</el-button>
        <el-button type="primary" @click="saveSale()" size="small">保存</el-button>
      </span>
    </el-dialog> -->
    <!-- 供应商报价 -->
 <!--    <Offer
      :goodsPage="goodsPage"
      :editVisibles="editVisibles"
      :sigdId="sigdId"
      @createClose1="createClose2"
      @createClosing1="createClosing2"
      @editInquiry1="editInquiry2"
    ></Offer> -->

    <!-- 查看报价 -->
    <CheckOffer
      :goodsPage="goodsPage"
      :detailVisibles="detailVisibles"
      @createCloseC="createClose3"
      @createClosingC="createClosing3"
      @editInquiryC="editInquiry3"
    ></CheckOffer>
  </div>
</template>

<script>
import { getCategory, getStoreList } from "@/api/public";
import {purchaseListGoods,forPurchase,getPurchaseInquiryGoods} from "@/api/purchase/index"
import { getInGoods,toPurchaser } from "@/api/sale/index";
import { throttleTipPop } from "@/utils/functions.js";
/* import Offer from "./Offer"; */
import CheckOffer from './checkOffer'
export default {
  filters: {
    status: function(val) {
      switch (val) {
        case 0:
          return "未报价";
          break;
        case 1:
          return "已报价";
          break;
        case 2:
          return "重新报价";
          break;
        default:
          return;
      }
    }
  },
  data() {
    return {
      editVisibles: false, //供应商报价
      saleVisible: false, //指定采销员窗口
      detailVisibles:false,//查看报价窗口
      toInquiryNo:'',
      toInquiryId:'',
      goodsName:'',
      sysuserName:"",
      saleList: [],
      goodsList1:[],
      goodsData1:[],
      purchaseList:'',
      goodsPage:'',
      inquiryId:'',
      toSaler:'',
      sigdId:'',
      form: {
        pageIndex:1,
        pageSize:10,
        count: 0
      },
      inquiyNo: "",
      inCount: "",
      inPage: [],
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
  props: ["goodsList","totalCount","closeId"],
  watch: {
    goodsList: function(newVal) {
      if(newVal.length==0){      
        this.form.pageIndex =1;
        this.goodsList1 = newVal;
  
      }else{
        this.goodsList1 =newVal;
      }
      
    },
    totalCount: function(newVal) {
      this.form.count = newVal;
      
    },
    closeId: function(newVal) {
      this.inquiryId = newVal;
      
    },
    selectGet1(vId) {
      //这个vId也就是value值
      let obj = {};
      obj = this.saleList.find(item => {
        //这里是上面遍历的数据源
        return item.sysuserId === vId; //筛选出匹配数据
      });
      console.log(obj.sysuserId);
      this.sysuserName = obj.sysuserName;
    }
  },
  created() {},
  computed: {},
  methods: {
    //供应商报价组件传来的值
    createClose2: function(data) {
      this.editVisibles = data;
    },
    createClosing2: function(data) {
      this.editVisibles = data;
    },
    editInquiry2(data) {
        let obj={}
          obj.inquiryId = this.closeId;
          obj.pageIndex = this.form.pageIndex;
          obj.pageSize = this.form.pageSize

         getPurchaseInquiryGoods(obj).then(res=>{
            this.form.count = res.data.count;
            this.goodsList1 = res.data.pageList;
            
         })
      this.editVisibles = data;
    },
    //查看报价组件传值
    createClose3: function(data) {
      this.detailVisibles = data;
    },
    createClosing3: function(data) {
      this.detailVisibles = data;
    },
    editInquiry3(data) {
       let obj={}
          obj.inquiryId = this.closeId;
          obj.pageIndex = this.form.pageIndex;
          obj.pageSize = this.form.pageSize

         getPurchaseInquiryGoods(obj).then(res=>{
            this.form.count = res.data.count;
            this.goodsList1 = res.data.pageList;
            
         })
      this.detailVisibles = data;
    },
    _getPurchaseInquiryGoods(){
          let obj={}
          obj.inquiryId = this.closeId;
          obj.pageIndex = this.form.pageIndex;
          obj.pageSize = this.form.pageSize

         getPurchaseInquiryGoods(obj).then(res=>{
            this.form.count = res.data.count;
            this.goodsList1 = res.data.pageList;
            
         })
    },
   /*  //指定采销员窗口
    toSale(row) {
      this.saleVisible = true;
      this.toInquiryNo = row.inquiryNo;
      this.toInquiryId = row.inquiryId;
      this.sigdId = row.sigdId;
      this.goodsName = row.goodsName
      toPurchaser().then(res => {
        this.purchaseList = res.data.list;
      });
    },
    selectGet1(vId) {
      //这个vId也就是value值
      let obj = {};
      obj = this.purchaseList.find(item => {
        //这里是上面遍历的数据源
        return item.sysuserId === vId; //筛选出匹配数据
      });
      this.sysuserName = obj.sysuserName;
    },
    //保存指定采购员
    saveSale() {
      let obj = {};
      obj.sigdId = this.sigdId;
      obj.userId = this.toSaler;
      forPurchase(obj).then(res => {  
        if (res.code === 200) {
          throttleTipPop(this, "success", "指定采销员成功", 2000);
          this.saleVisible = false;
           let obj={}
          obj.inquiryId = this.closeId;
          obj.pageIndex = this.form.pageIndex;
          obj.pageSize = this.form.pageSize

         getPurchaseInquiryGoods(obj).then(res=>{
            this.form.count = res.data.count;
            this.goodsList1 = res.data.pageList;
            
         })
        }
      });
    }, */
    //供应商报价
    toOffer(row) {
      this.sigdId = row.sigdId;
       purchaseListGoods(row.sigdId).then(res=>{
         this.goodsPage =  res.data;  
         
       })

      this.editVisibles = true;
    },
    //查看报价
    toDetail(row){
       purchaseListGoods(row.sigdId).then(res=>{
         this.goodsPage =  res.data;  
         
       })
      this.detailVisibles = true;
    },
    handleSizeChange(val) {
      this.form.pageSize = val;
      this._getPurchaseInquiryGoods();
    },
    handleCurrentChange(val) {
      this.form.pageIndex = val;
      this._getPurchaseInquiryGoods();
    },
    handleSelectionChange() {}
  },
  components: {
   /*  Offer, */
    CheckOffer
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
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

.line-div {
  overflow: hidden;
  .small-Idiv{
    margin:0 auto;
    padding-top:10px;
  }
}


.i-div {
  cursor: pointer;
}
.margin1 {
  padding-left: 40px;
  padding-top: 20px;
  box-sizing: border-box;
}
.imgType {
  width: 110px;
  height: 100px;
}
.goodsTitle {
  margin-left: 114px;
  margin-right: 10px;
  height: 50px;
  float: left;
}
.goodsRight {
  margin-bottom: 26px;
}
/deep/ .el-dialog__headerbtn{
      top:10px;
    }
</style>
