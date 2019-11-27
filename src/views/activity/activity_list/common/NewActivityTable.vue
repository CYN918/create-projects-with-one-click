<template>
  <div>
    <h4 class="title">活动商品</h4>
    <slot></slot>
    <el-table
      :data="activityGoodsTypePro"
      stripe
      style="width: 100%"
      border
      ref="elTable"
      class="goods_index">
     <!-- <el-table-column type="selection" align="center" width="55"></el-table-column>-->
      <el-table-column type="index" label="编号" align="center" width="50">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品图片" align="center" width="120">
        <template slot-scope="scope">
          <i><img style="width:86px; height: 86px;" :src="scope.row.skuInfo[scope.row.index].thumbnailImgUrl" alt=""></i>
        </template>
      </el-table-column>
      <el-table-column label="商品信息" align="center">
        <template slot-scope="scope">
          <div class="txt_left">
            <p style="margin-bottom: 20px">{{scope.row.goodsName}}</p>
            <p style="margin-bottom: 20px">货号：{{scope.row.goodsSn}}</p>
            <p style="margin-bottom: 20px">型号：{{scope.row.modelNumber}}</p>
            <p style="margin-bottom: 20px">品牌：{{scope.row.brandName}}</p>
            <p>SKU：{{scope.row.skuInfo[scope.row.index].skuId}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品规格" align="center" width="120">
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
      <el-table-column label="京东/天猫价" align="center" width="100">
        <template slot-scope="scope">
          <div>{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice !=
            0?scope.row.skuInfo[scope.row.index].priceInfo.jdPrice:''}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商城价" align="center" width="100">
        <template slot-scope="scope">
          <div
          >{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice !=
            0?scope.row.skuInfo[scope.row.index].priceInfo.goodsPrice:''}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="一件代发价" align="center" width="100">
        <template slot-scope="scope">
          <div>
            <span
              class="blue"
              v-if="scope.row.skuInfo[scope.row.index].priceInfo.costPrice != 0"
            >{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice}}</span>
            <span v-if="scope.row.skuInfo[scope.row.index].priceInfo.costPrice == 0">不支持一件代发</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="运费" align="center" width="100">
        <template slot-scope="scope">
          <div
          >{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice !=
            0?scope.row.skuInfo[scope.row.index].priceInfo.costPrice:scope.row.skuInfo[scope.row.index].priceInfo.costPrice
            == ''?'含运费':'含运费'}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="库存(PCS)" align="center" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.skuInfo[scope.row.index].goodsNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column label="供应商活动价" align="center" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.skuInfo[scope.row.index].supplierActivityPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商城价" align="center" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.skuInfo[scope.row.index].fyuanaiActivityPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column label="经销商结算价" align="center" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.skuInfo[scope.row.index].distributorActivityPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column label="平台活动价" align="center" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.skuInfo[scope.row.index].platformActivityPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="100" fixed="right">
        <template slot-scope="scope">
          <div class="line-div small_top">
            <!--<div class="small-Idiv" @click="editor(scope.row)">
              <div class="i-div">
                <img src="../../../../common/images/icon/编辑.png" alt class="operation_img"/>
              </div>
              <span>编辑</span>
            </div>
            <div class="small-Idiv" @click="goodsDetail(scope.row.goodsId)">
              <div class="i-div fuzhi">
                <img src="../../../../common/images/icon/货物列表.png" alt class="operation_img"/>
              </div>
              <span s>商品</span>
            </div>-->
            <div class="small-Idiv" @click="recycleBinfunc(scope.row)">
              <div class="i-div huishouzhan">
                <img src="../../../../common/images/icon/回收站.png" alt class="operation_img"/>
              </div>
              <span>删除</span>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--<div class="pagination" style="margin-top: 27px;text-align: right;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.current_page"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="form.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.copySelectedPro.length"
      ></el-pagination>
    </div>-->
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: "NewActivityTable",
    data() {
      return {
        copySelectedPro: [],
        total: 0, // 展示总数
        form: { // 查询变量
          page_size: 10, // 当前页展示数量
          current_page: 1, // 当前页
        }
      }
    },
    computed: {
      ...mapState({activityGoodsTypePro: state => state.activity.activityGoodsTypePro})
    },
    methods: {
      //点击规格展示不同的内容
      Clicktent(val, data) {
        data.index = val;
        this.$set(this.$refs.elTable.data);
      },
      // 删除
      recycleBinfunc(row) {
        this.copySelectedPro = this.copySelectedPro.filter((item) => {
          return item.goodsId !== row.goodsId
        })
        this.$store.commit('deleteProFromSelected', row)
      },
      // 商品详情
      goodsDetail(id) {
        this.$router.push({name: "GoodsDetail", query: { id }});
      },

    },
  }
</script>

<style lang="scss" scoped>
  .small-Idiv {
    display: inline-block;
    margin: 0 10px;
    cursor: pointer;
  }
  .leftbottom {
    color: #4a99fa;
    border-bottom: 1px dashed rgba(215, 220, 231, 1);
    padding-bottom: 8px;
  }
  .title {
    position: relative;
    left: -15px;
    padding-left: 10px;
    line-height: 1.4;
    border-left: 4px solid #4C86F4;
    font-size: 16px;
    color: #333;
    margin-bottom: 22px;
  }
</style>
