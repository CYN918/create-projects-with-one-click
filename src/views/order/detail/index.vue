<template>
  <div class="margin">
    <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <el-page-header @back="back" content="订单详情"></el-page-header>
          </div>
        </div>
      </div>
    <div class="mcard">
      <el-row class="operate mbottom">
          <el-col :span="21" class="detail">
              交易状态：{{tableData3[0].statusMsg}}
        </el-col>
        <el-col :span="3">
        </el-col>
      </el-row>
      <el-row class="operate mbottom">
          <el-col :span="21" class="detail">
              物流信息：
        </el-col>
        <el-col :span="3">
        </el-col>
      </el-row>
      <el-table :data="tableData1" border  stripe>
        <el-table-column label="物流公司" prop="shippingName" align="center"></el-table-column>
        <el-table-column label="快递单号" prop="logisticsNo"  align="center"> </el-table-column>
        <el-table-column label="发货时间" prop="deliveryTime" align="center"></el-table-column>
      </el-table>
      <br/>
      <br/>
      <el-row class="operate mbottom">
          <el-col :span="21" class="detail">
              下单信息：
        </el-col>
        <el-col :span="3">
        </el-col>
      </el-row>
      <el-table :data="tableData2" border  stripe>
        <el-table-column label="下单人用户名" prop="userName" align="center"></el-table-column>
        <el-table-column label="下单人姓名" prop="realName"  align="center"> </el-table-column>
        <el-table-column label="下单人手机号" prop="userTelephone" align="center"></el-table-column>
      </el-table>
      <br/>
      <br/>
      <el-row class="operate mbottom">
          <el-col :span="21" class="detail">
              订单信息：
        </el-col>
        <el-col :span="3">
        </el-col>
      </el-row>
      <el-table :data="tableData3" border stripe>
        <el-table-column label="用户下单时间" prop="createTime" align="center"></el-table-column>
        <el-table-column label="用户支付时间" prop="payTime"  align="center">
          <template slot-scope="scope">
            {{scope.row.payTime?scope.row.payTime:'暂无'}}
          </template>
        </el-table-column>
        <el-table-column label="订单总价" prop="totalAmount" align="center"></el-table-column>
        <el-table-column label="用户支付方式" prop="payName" align="center"></el-table-column>
        <el-table-column label="站点支付金额" prop="name" align="center"></el-table-column>
      </el-table>
      <br/>
      <br/>
      <el-row class="operate mbottom">
          <el-col :span="21" class="detail">
              收货人信息：
        </el-col>
        <el-col :span="3">
        </el-col>
      </el-row>
      <el-table :data="tableData4" border  stripe>
        <el-table-column label="收货人" prop="consignee" align="center"></el-table-column>
        <el-table-column label="收货人手机号" prop="phone" align="center"></el-table-column>
        <el-table-column label="收货地址" prop="shippingAddress" align="center"></el-table-column>
      </el-table>
      <br/>
      <br/>
      <el-row class="operate mbottom">
          <el-col :span="21" class="detail">
              订单来源信息：
        </el-col>
        <el-col :span="3">
        </el-col>
      </el-row>
      <el-table :data="tableData2" border  stripe>
        <el-table-column label="来源应用" prop="systemId" align="center"></el-table-column>
        <el-table-column label="站点名称" prop="systemName" align="center"></el-table-column>
      </el-table>
      <br/>
    </div>
    <div class="shop_table">
      <el-table :data="tableData6"   border>
        <el-table-column label="商品图片" prop="name" align="center">
          <template slot-scope="scope">
            <div>
              <img :src="scope.row.thumbnailImgUrl" :alt="scope.row.goodsName" class="img_style">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品信息" prop="goodsName" align="center"></el-table-column>
        <el-table-column label="规格尺寸" prop="goodsAttr" align="center"></el-table-column>
        <el-table-column label="数量" prop="quantity" align="center"></el-table-column>
        <el-table-column label="成本价" prop="costPrice" align="center"></el-table-column>
        <el-table-column label="运费" prop="carriagePrice" align="center"></el-table-column>
        <el-table-column label="合计" prop="goodsAmount" align="center"></el-table-column>
        <el-table-column label="结算价" prop="specialPrice" align="center"  v-if="sysuserType != 3"></el-table-column>
        <el-table-column label="分销价" prop="distrPrice" align="center" v-if="sysuserType != 3"></el-table-column>
        <el-table-column label="分销利润" prop="distrProfit" align="center" v-if="sysuserType != 3"></el-table-column>
        <el-table-column label="分销合计" prop="distrProfitTotal" align="center" v-if="sysuserType != 3"></el-table-column>
        <el-table-column label="支付方式" prop="payName" align="center"></el-table-column>
        <el-table-column label="物流公司" prop="shippingName" align="center"></el-table-column>
        <el-table-column label="物流状态" prop="shippingInstructions" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="package" v-if="tableData7.length">
				<div class="top_span">
					<span  v-for="(item,index) in tableData7" :key="index" :class="num==index?'parcel cheked':'parcel'" @click="parcel(index)">包裹{{index+1}}</span>
				</div>
				<div class="addreesContiner">
					<div class="orderdetails11">包裹信息</div>
					<div class="backMessge">
						<span class="people">供货方： {{tableData7[num].supplierName}}</span>
						<span>物流信息：{{tableData7[num].shippingName}} | {{tableData7[num].logisticsNo}}</span>
					</div>
					<div class="addrees" style="padding-left:30px;padding-top:21px">
						<el-timeline>
								<el-timeline-item
								v-for="(activity, index) in tableData7[num].logisticsInfoList"
								:key="index"
								:icon="activity.icon"
								:type="activity.type"
								:color="activity.color"
								:size="activity.size"
								:timestamp="activity.ftime"
								style="height:77px"
								>
								<span v-if=" index == 0">{{activity.context}}</span>
								<span v-if=" index != 0">{{activity.context}}</span>
								</el-timeline-item>
						</el-timeline>
					</div>
				</div>
			</div>
  </div>
</template>

<script>
import { getByidorder } from '@/api/order/index'
export default {
    data () {
    return {
      sysuserType:0, //角色状态
      currentIndex: 0,
      storeManagerId: '0',
      num:0,
      roleList: [],
      rolePaginationTotalCount: 0,
      orderId:'', // 订单id
      form: {
        current_page:1,
        page_size:10,
        total_count:0,
      },
      tableData1:[],
      tableData2:[],
      tableData3:[],
      tableData4:[],
      tableData5:[],
      tableData6:[],
      tableData7:[],
    }
  },
  mounted () {
    const sysuer = JSON.parse(localStorage.getItem("user"))
    this.sysuserType = sysuer.data.sysuserType
    if(this.$route.query.orderId){
      this.orderId = this.$route.query.orderId
    }
    this._getByidorder()
  },
  computed: {
  },
  methods: {
      parcel(val){
        this.num = val
      },
      _getByidorder(){
        getByidorder(this.orderId).then(res => {
          res.data.orderGoodsList.forEach(item => {
            item.payName = res.data.payName
          })
          this.tableData1 = res.data.logisticsVoList
          this.tableData2.push(res.data)
          this.tableData3.push(res.data)
          this.tableData4.push(res.data)
          this.tableData5 = []
          this.tableData6 = res.data.orderGoodsList
          this.tableData7 = res.data.logisticsVoList;
          this.tableData7.forEach((item, index) => {
            item.logisticsInfoList.forEach((data, index2) => {
              if (index2 == 0) {
                data.color = "#4A99FA";
              }
            });
          });
        })
      },
      back() {
      this.$router.go(-1);
    },
  }
}
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
.img_style{
  width: 60px;
  height: 60px;
}
.shop_table{
  margin-top: 24px;
}
.package {
  margin-top: 30px;
  margin-bottom: 30px;

  .parcel {
    cursor: pointer;
    display: inline-block;
    width: 148px;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }

  .cheked {
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(215, 225, 241, 1);
    border-bottom: none;
    position: relative;
    top: 1px;
  }
}

.addreesContiner {
  background: white;
  border: 1px solid rgba(215, 225, 241, 1);

  .addrees {
    margin-top: 30px;
  }
}

.orderdetails11 {
  border-left: 4px solid #4a99fa;
  font-weight: 400;
  font-family: Microsoft YaHei;
  font-size: 16px;
  color: #333;
  position: relative;
  padding: 5px 0;
  padding-left: 26px;
  top: 8px;
}

.backMessge {
  width: 100%;
  height: 38px;
  background: rgba(215, 225, 241, 1);
  position: relative;
  top: 23px;
  left: 21px;
  display: flex;
  align-items: center;
  padding-left: 12px;
}

.people {
  margin-right: 15px;
}

.details {
  margin-top: 30px;
  margin-top: 24px;

  .detailsImg {
    display: flex;
    align-items: center;

    img {
      width: 60px;
      height: 60px;
    }
  }
}

.top_span {
  display: flex;
}
.search-wrapper1 {
  padding: 20px;
  border: 1px solid rgb(215, 224, 241);
  background: #fff;
  display: flex;
  align-items: center;
  .title1 {
    display: flex;
    margin-left: 15%;
  }
}
.mcard{
  border: 1px solid #d7e0f1;
}
</style>
