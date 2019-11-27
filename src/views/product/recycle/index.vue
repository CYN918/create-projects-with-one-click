<template>
  <div class="margin">
    <goods-fitter
      class="mbottom"
      @tabVender="handleGetGoodsList"
      @goodsFitter="handleGetGoodsList"
      :dataObj="form"
    ></goods-fitter>
    <div class="mcard">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        border
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
        <el-table-column label="商品图片" align="center" width="120">
          <template slot-scope="scope">
            <div class="image" v-if="scope.row.skuInfo[scope.row.index].thumbnailImgUrl">
              <img
                :src="scope.row.skuInfo[scope.row.index].thumbnailImgUrl"
                width="100"
                height="100"
                alt
              />
            </div>
            <div v-if="!scope.row.skuInfo[scope.row.index].thumbnailImgUrl">暂无图片</div>
          </template>
        </el-table-column>
        <el-table-column label="商品信息" align="center" width="150">
          <template slot-scope="scope">
            <div class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
            <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
            <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
            <div class="txt_left">品牌：{{scope.row.brandName}}</div>
            <div class="txt_left">上传方式：{{scope.row.sourceType}}</div>
            <div class="txt_left" v-if="scope.row.auditType">审核类型：<span style="color:#f66c6c">{{scope.row.auditType}}</span> </div>
          </template>
        </el-table-column>
        <el-table-column label="价格信息" align="center" width="150">
          <template slot-scope="scope">
            <!-- 平台展示信息 -->
            <div v-if="scope.row.sourceTypeId == 2">
              <div class="txt_left">
                商城价：{{scope.row.skuInfo[scope.row.index].priceInfo.goodsPrice !=
                0?scope.row.skuInfo[scope.row.index].priceInfo.goodsPrice:'暂无'}}
              </div>
              <div class="txt_left">
                市场价：
                <span
                  class="blue"
                  v-if="scope.row.skuInfo[scope.row.index].priceInfo.costPrice != 0"
                >{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice}}</span>
                <span v-if="scope.row.skuInfo[scope.row.index].priceInfo.costPrice == 0">不支持一件代发</span>
              </div>
              <div class="txt_left">
                税率：{{scope.row.skuInfo[scope.row.index].priceInfo.taxRate !=
                0?scope.row.skuInfo[scope.row.index].priceInfo.taxRate+'%':'暂无'}}
              </div>
            </div>
            <!-- 非平台商品信息 -->
            <div v-else>
              <div class="txt_left">
                商城价：{{scope.row.skuInfo[scope.row.index].priceInfo.goodsPrice !=
                0?scope.row.skuInfo[scope.row.index].priceInfo.goodsPrice:'暂无'}}
              </div>
              <div class="txt_left">
                市场价：{{scope.row.skuInfo[scope.row.index].priceInfo.marketPrice !=
                0?scope.row.skuInfo[scope.row.index].priceInfo.marketPrice:'暂无'}}
              </div>
              <div class="txt_left">
                税率：{{scope.row.skuInfo[scope.row.index].priceInfo.taxRate !=
                0?scope.row.skuInfo[scope.row.index].priceInfo.taxRate+'%':'暂无'}}
              </div>
              <div class="txt_left">
                一件代发价：
                <span
                  class="blue"
                  v-if="scope.row.skuInfo[scope.row.index].priceInfo.costPrice != 0"
                >{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice}}</span>
                <span v-if="scope.row.skuInfo[scope.row.index].priceInfo.costPrice == 0">不支持一件代发</span>
              </div>
              <div class="txt_left">
                运费：{{scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice
                !=0?scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice:scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice==
                ''?'含运费':'含运费'}}
              </div>
              <div class="txt_left">
                {{scope.row.sourceTypeId | source}}：{{scope.row.skuInfo[scope.row.index].priceInfo.thirdPrice !=
                0?scope.row.skuInfo[scope.row.index].priceInfo.thirdPrice:'暂无'}}
              </div>
              <div class="txt_left">
                市场价对比京东折扣率：{{scope.row.skuInfo[scope.row.index].priceInfo.costJdRatio !=
                0?scope.row.skuInfo[scope.row.index].priceInfo.costJdRatio:'暂无'}}
              </div>
              <div class="txt_left">
                商城价对比京东折扣率：{{scope.row.skuInfo[scope.row.index].priceInfo.shopJdRatio !=
                0?scope.row.skuInfo[scope.row.index].priceInfo.shopJdRatio:'暂无'}}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="集采" align="center" width="150">
          <template slot-scope="scope">
            <div
              class="txt_left"
              v-for="(item,index) in scope.row.skuInfo[scope.row.index].volumeInfo.volumePrices"
              :key="index"
            >
              <div class="txt_left">{{item.volumeNumber}}</div>
              <div class="txt_left">{{item.volumeCost}}</div>
              <div class="txt_left">{{item.volumeCarriage}}</div>
            </div>
            <div class="txt_left">
              对外PPT价格：
              <span class="blue">{{scope.row.skuInfo[scope.row.index].volumeInfo.pptPrice}}</span>
            </div>
            <div class="txt_left">
              对外最低报价：
              <span
                class="blue"
              >{{scope.row.skuInfo[scope.row.index].volumeInfo.minimumPrice}}</span>
            </div>
            <div class="txt_left">
              给我司的特惠价：
              <span
                class="blue"
              >{{scope.row.skuInfo[scope.row.index].volumeInfo.preferentialPrice}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品规格" align="center" width="200">
          <template slot-scope="scope">
            <div style="position:relative">
              <!-- <el-button @click="down">向上</el-button> -->
              <div style="height: 300px;overflow: auto;" :ref="'down'+scope.$index">
                <div class="txt_left martop" v-for="(item,index) in scope.row.skuInfo" :key="index">
                  <div
                    class="txt_left imgitem"
                    @click="Clicktent(index,scope.row)"
                    :class="[index == scope.row.index?'leftbottom':'']"
                  >
                      <!-- <img src="../../../common/images/商品规格(1)shouji.png" alt="" v-if="index == scope.row.index">  -->
                    <div class="more">{{item.goodsSpecValues}}</div>
                  </div>
                </div>
              </div>
              <!-- <el-button @click="down(scope.row,scope.$index)">向下</el-button> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column label="一件代发利润统计" align="center" width="140">
          <template slot-scope="scope">
            <!-- 平台展示信息 -->
            <div v-if="scope.row.sourceTypeId == 2">
              <div
                class="txt_left"
              >分销价：{{scope.row.skuInfo[scope.row.index].financeInfo.distrPrice?scope.row.skuInfo[scope.row.index].financeInfo.distrPrice:'暂无'}}</div>
              <div
                class="txt_left"
              >分销利润：{{scope.row.skuInfo[scope.row.index].financeInfo.distrProfit?scope.row.skuInfo[scope.row.index].financeInfo.distrProfit:'暂无'}}</div>
              <div
                class="txt_left"
              >分销利润率：{{scope.row.skuInfo[scope.row.index].financeInfo.distrProfitMargin}}%</div>
            </div>
            <!-- 非平台展示信息 -->
            <div v-else>
              <div
                class="txt_left"
              >毛利润：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfit}}</div>
              <div
                class="txt_left"
              >毛利润率：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitMargin}}%</div>
              <div class="txt_left">税费：{{scope.row.skuInfo[scope.row.index].financeInfo.taxation}}</div>
              <div
                class="txt_left"
              >税后毛利：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitTax}}</div>
              <div
                class="txt_left"
              >税后毛利率：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitMarginTax*100}}%</div>
              <div
                class="txt_left"
              >企业所得税：{{scope.row.skuInfo[scope.row.index].financeInfo.incomeTax}}</div>
              <div class="txt_left">纯利润：{{scope.row.skuInfo[scope.row.index].financeInfo.netProfit}}</div>
              <div
                class="txt_left"
              >纯利率：{{scope.row.skuInfo[scope.row.index].financeInfo.netProfitMargin*100}}%</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="集采利润统计" align="center" width="120">
          <template slot-scope="scope">
            <div
              class="txt_left"
              v-for="(item,index) in scope.row.skuInfo[scope.row.index].volumeInfo.volumePrices"
              :key="index"
            >
              <div class="txt_left">{{item.volumeGrossProfit}}</div>
              <div class="txt_left">{{item.volumeGrossProfitMargin}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="库存(PCS)" align="center" width="120">
          <template slot-scope="scope">
            <span class="goods_num">{{scope.row.skuInfo[scope.row.index].goodsNumber}}</span>
            <div
              class="txt_left"
              style="margin-top: 40px;"
            >库存预警：{{scope.row.skuInfo[scope.row.index].warnNumber}}</div>
          </template>
        </el-table-column>
        <el-table-column label="供应商" align="center" width="150">
          <template slot-scope="scope">
            <!-- 平台展示信息 -->
            <div v-if="scope.row.sourceTypeId == 2">
              <div class="txt_left">深圳市迈戈实业有限公司</div>
            </div>
            <!-- 非平台展示信息 -->
            <div v-else>
              <div
                class="txt_left"
                style="font-size:15px"
              >{{scope.row.skuInfo[scope.row.index].suppliersName}}</div>
              <div class="txt_left">联系人：{{scope.row.skuInfo[scope.row.index].contactName}}</div>
              <div class="txt_left">联系人电话：{{scope.row.skuInfo[scope.row.index].contactTelephone}}</div>
              <div class="txt_left">QQ：{{scope.row.skuInfo[scope.row.index].contactQq}}</div>
              <div class="txt_left">管理员：{{scope.row.adminName}}</div>
              <div class="txt_left">管理员手机/邮箱：{{scope.row.adminPhone+'/'+scope.row.adminEmail}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="类型/状态" align="center" width="200">
          <template slot-scope="scope">
            <div class="txt_left">类型：{{scope.row.goodsType}}</div>
            <div class="txt_left">排序：{{scope.row.sortOrder}}</div>
            <div class="txt_left">更新：{{scope.row.updateTime}}</div>
            <div class="txt_left">
              状态：{{scope.row.reviewStatus == 0?'未审核':scope.row.reviewStatus ==
              1?'审核不通过':'审核通过'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="150">
          <template slot-scope="scope">
            <div class="line-div">
              <div class="small-Idiv" @click="reductionfunc(scope.row)"  v-permit="'recycle:reduced'">
                <div class="i-div shenpi">
                  <img src="../../../common/images/icon/还原.png" alt class="operation_img" />
                </div>
                <span style="word-break: keep-all;margin-left: 1px;">还原</span>
              </div>
              <div class="small-Idiv" @click="deletesure(scope.row)"  v-permit="'recycle:del'">
                <div class="i-div huishouzhan">
                  <img src="../../../common/images/icon/回收站.png" alt class="operation_img" />
                </div>
                <span style="word-break: keep-all;margin-left: 3px;">删除</span>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.currentPage"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="form.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="form.total"
        ></el-pagination>
      </div>
      <el-dialog title="还原" :visible.sync="reduction" width="30%">
        <el-form :model="form" label-width="100px">
          <el-form-item label="还原原因:">
            <el-input type="textarea" v-model="form.textarea"></el-input>
          </el-form-item>
          <el-form-item label="上级领导审核:">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="销售总监" value="0"></el-option>
              <el-option label="采购经理" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="reduction = false" size="small">取 消</el-button>
          <el-button type="primary" @click="reductionfunc('',true)" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="删除" :visible.sync="daleteForever" width="30%">
        <el-form :model="form" label-width="100px">
          <el-form-item label="删除理由:">
            <el-input type="textarea" v-model="form.delete"></el-input>
          </el-form-item>
          <el-form-item label="上级领导审核:">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="销售总监" value="0"></el-option>
              <el-option label="采购经理" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="daleteForever = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deletesure('',true)" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import GoodsFitter from "./goodsFitter";
import { getRecycled, putReduction, deleteGoods } from "@/api/product/index";
import axios from "axios";

export default {
  data() {
    return {
      checked: false, // 全选所有页
      reduction: false, //还原
      daleteForever: false, //删除
      goodsId: "", // 商品id
      form: {
        third_party: "", // 1，京东 2，网易 3，苏宁 4, 一件代发商品 5, 集采商品
        search_type: "1", // 关键字类型
        keyword: "", // 关键字
        isReal: 1, //是否是实物。1，是；0，否
        grossProfitMarginStart: "", //税前毛利润率起始
        grossProfitMarginEnd: "", // 税前毛利润率结束
        grossProfitMarginTaxStart: "", //税后毛利润率起始
        grossProfitMarginTaxEnd: "", //税后毛利润率结束
        netProfitMarginStart: "", //税后纯利润率起始
        netProfitMarginEnd: "", //税后纯利润率结束
        distrProfitMarginStart: "", //分销利润率起始
        distrProfitMarginEnd: "", //分销利润率结束
        costPriceStart: "", //商品成本价起始
        costPriceEnd: "", //商品成本价结束
        costPriceJdRatioStart: "", //一件代发价对比京东/天猫折扣率开始
        costPriceJdRatioEnd: "", //一件代发价对比京东/天猫折扣率结束
        shopJdRatioStart: "", //商城价对比京东价折扣率开始
        shopJdRatioEnd: "", //商城价对比京东价折扣率结束
        volumeJdRatioStart: "", //批发价1对比京东/天猫折扣率开始
        volumeJdRatioEnd: "", //批发价1对比京东/天猫折扣率结束
        volumeShopRatioStart: "", //批发价1对比商城利润率开始
        volumeShopRatioEnd: "", //批发价1对比商城利润率结束
        sysUserId: "", //采购员id
        current_page: 1,
        page_size: 10,
        total_count: 0,
        deledata: {},
        textarea: "",
        delete: "",
        switchitem: true //获取整个数据/每日新增数据
      },
      tableData: []
    };
  },
  methods: {
    //点击规格展示不同的内容
    Clicktent(val, data) {
      data.index = val;
      console.log(this.$refs.elTable);
      this.$set(this.$refs.elTable.data);
      this.$forceUpdate();
    },
    async deletesure(data, type) {
      if (data) {
        this.daleteForever = true;
        this.form.deledata = data;
        console.log(data);
      }
      if (type) {
        const data = await deleteGoods(
          this.form.deledata.goodsId,
          this.form.delete,
          2
        );
        if (data.code == 200) {
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
          this.daleteForever = false;
          this._getRecycled();
        }
      }
    },
    // 还原
    reductionfunc(data, type) {
      this.form.textarea = "";
      if (data) {
        this.goodsId = data.goodsId;
        this.reduction = true;
      }
      if (type) {
        let obj = {};
        obj.goodsId = this.goodsId;
        putReduction(obj).then(res => {
          if (res.code == 200) {
            this.$message({
              showClose: true,
              message: "还原成功",
              type: "success"
            });
            this.reduction = false;
            this._getRecycled();
          }
        });
      }
    },
    _getRecycled() {
      this.startLoading()
      if (this.form.third_party == 6) {
        let obj = JSON.parse(JSON.stringify(this.form));
        obj.third_party = null;
        console.log(111, obj);
        getRecycled(obj).then(res => {
          this.tableData = res.data.pageList;
          this.form.total = res.data.count;
          this.endLoading()
        });
      } else {
        getRecycled(this.form).then(res => {
          this.tableData = res.data.pageList;
          this.form.total = res.data.count;
          this.endLoading()
        });
      }
    },
    handleSizeChange(val) {
      this.form.size = val;
      this._getRecycled();
    },
    handleCurrentChange(val) {
      this.form.currentPage = val;
      this._getRecycled();
    },
    handleGetGoodsList(data) {
      this.form = data;
      this._getRecycled();
    }
  },
  components: {
    GoodsFitter
  },
  mounted() {
    this._getRecycled();
  },
  filters:{
    source(val){
      switch(val){
        case 0:
          return '京东/天猫价'
          break;
        case 1:
          return '京东价'
          break;
        case 2:
          return '平台推送'
          break;
        case 3:
          return '京东价'
          break;
        case 4:
          return '天猫/阿里采集'
          break;
        case 5:
          return '京东价'
          break;
        case 6:
          return '天猫/阿里采集'
            break;
        case 7:
          return '苏宁价'
            break;
        case 8:
          return '网易价'
            break;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.image {
  width: 100px;
  height: 100px;
  font-size: 0;
}

.small-Idiv {
  width: 32px;

  span {
    margin-top: 3px;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(72, 73, 77, 1);
  }
}

.i-div {
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.line-div {
  display: flex;
  justify-content: space-around;
}

.leftbottom {
  color: #4a99fa;
  border-bottom: 1px dashed rgba(215, 220, 231, 1);
  padding-bottom: 8px;
}

.more {
  cursor: pointer;
}

.imgitem {
  display: flex;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
}

.martop {
  margin-top: 10px;
}

.blue {
  color: #4a99fa;
  cursor: pointer;
}
</style>
