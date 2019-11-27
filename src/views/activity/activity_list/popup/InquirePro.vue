<template>
    <div>
      <div class="clearfix">
        <div style="float: left">
          <div style="margin-bottom: 18px">
            <span class="chose_tip_word">利润率：</span>
            <el-input style="width: 160px" min="0" v-model="form.profitStart" type="number" placeholder="利润率起始"></el-input>
            <span class="gap">-</span>
            <el-input style="width: 160px" min="0" v-model="form.profitEnd" type="number" placeholder="利润率结束"></el-input>
          </div>
          <div style="margin-bottom: 18px">
            <span class="chose_tip_word">商城价：</span>
            <el-input style="width: 160px" min="0" v-model="form.membershipPriceStart"  type="number" placeholder="商城价起始"></el-input>
            <span class="gap">-</span>
            <el-input style="width: 160px" min="0" v-model="form.membershipPriceEnd"  type="number" placeholder="商城价结束"></el-input>
          </div>
          <div style="margin-bottom: 18px">
            <span class="chose_tip_word">结算价：</span>
            <el-input style="width: 160px" min="0" v-model="form.MarketPriceStart"  type="number" placeholder="结算价起始"></el-input>
            <span class="gap">-</span>
            <el-input style="width: 160px" min="0" v-model="form.MarketPriceEnd"  type="number" placeholder="结算价结束"></el-input>
          </div>
          <div style="margin-bottom: 18px">
            <span class="chose_tip_word">成本价：</span>
            <el-input style="width: 160px" min="0" v-model="form.costPriceStart"  type="number" placeholder="成本价起始"></el-input>
            <span class="gap">-</span>
            <el-input style="width: 160px" min="0" v-model="form.costPriceEnd"  type="number" placeholder="成本价结束"></el-input>
          </div>
        </div>
        <div style="float: left; margin-left: 30px">
          <div style="margin-bottom: 18px">
            <div class="block">
              <span class="demonstration chose_tip_word">分类：</span>
              <el-cascader
                  v-model="catId"
                  style="width: 336px; line-height: 32px"
                  :options="classify"
                  :props="{
                      checkStrictly: true,
                      label: 'catName',
                      value: 'catId',
                    }"
                  clearable>
              </el-cascader>
            </div>
          </div>
          <div style="margin-bottom: 18px">
            <span class="chose_tip_word">商品名称：</span>
            <el-input style="width: 160px" v-model="form.goodsName" placeholder="请输入商品名称"></el-input>
          </div>
          <div style="margin-bottom: 18px">
            <span class="chose_tip_word">排序：</span>
            <el-select style="width: 160px" v-model="form.sortOrder" placeholder="按时间倒序">
              <el-option
                  v-for="item in rankTypes"
                  :key="item.rankType"
                  :label="item.rankName"
                  :value="item.rankType">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <!--<div style="margin-bottom: 24px">
        <el-checkbox v-model="checked" @change="toggleOnlyUnselected">仅看未挑选</el-checkbox>
      </div>-->
      <div style="text-align: center">
        <el-button type="primary" plain @click="getProductList()">查询</el-button>
        <!--<el-button type="primary" plain>批量改价</el-button>-->
      </div>
    </div>
</template>

<script>
import PubSub from 'pubsub-js'
import { SEARCH_PRODUCT_2 } from '@/utils/pubsubEvent'
import { reqProNameList } from '@/api/activity/index'

export default {
  name: 'InquirePro',
  data() {
    return {
      form: {
        membershipPriceStart: null, // 会员价
        membershipPriceEnd: null,
        MarketPriceStart: null, // 市场价
        MarketPriceEnd: null,
        profitStart: null, // 利率
        profitEnd: null, //
        costPriceStart: null, // 成本
        costPriceEnd: null, //
        sortOrder: null,
        goodsName: null,
        catId: null,
        pageIndex: 1,
        pageSize: 10,
      },
      isSupplier: false, // 是否为供应商
      checked: false, // 是否仅看未挑选
      keywordsOptions: [
        { keywordsTypeName: '按商品名称搜索', keywordsType: '0' },
        { keywordsTypeName: '按品牌名称搜索', keywordsType: '1' },
        { keywordsTypeName: '按skuId搜索', keywordsType: '2' },
      ], // 关键字输入选项
      keywords: '', // 关键字：
      keywordsType: '', // 关键字类型
      shopJdRatioStart: '', // 商城价对比京东价折扣率
      shopJdRatioEnd: '', // 商城价对比京东价折扣率
      costJdRatioStart: '', // 成本价对比京东价折扣率
      costJdRatioEnd: '', // 成本价对比京东价折扣率
      distrPriceEnd: '', // 分销价结束
      distrPriceStart: '', // 分销价结束
      profitEnd: '', // 利润率结束
      profitStart: '', // 利润率开始
      goodsPriceEnd: '', // 商城价结束
      goodsPriceStart: '', // 商城价开始
      rank: '', // 排序选项
      rankTypes: [
        { rankType: 2, rankName: '上架时间升序' },
        { rankType: 1, rankName: '上架时间降序' },
      ],
      catId: [], // 选择商品分类的ID
      classify: [], // 商品分类
      productType: '',
      parameter: {}, // 查询商品列表参数
    }
  },
  props: ['activeName', 'pageSize', 'pageIndex'],
  watch: {
    pageSize(val) {
      this.getProductList(1, val)
    },
    pageIndex(val) {
      this.getProductList(val, this.pageSize)
    },
  },
  created() {
    this.getClassify()
    this.checkProType(this.activeName) // 获取商品分类
  },
  methods: {
    toggleOnlyUnselected() {
      this.getProductList()
    },
    // 获取商品列表
    async getProductList(pageIndex = 1, pageSize = 10) {
      this.form.catId = this.catId.length > 0 ? this.catId[this.catId.length - 1] : null
      this.form.pageIndex = pageIndex
      PubSub.publish(SEARCH_PRODUCT_2, this.form)
    },
    checkProType(type) {
      switch (type) {
        case '0': // 全部
          break
        case '1': // 京东
          this.form.goodsType = 1
          break
        case '2': // 苏宁
          this.form.goodsType = 3
          break
        case '3': // 网易
          this.form.goodsType = 2
          break
        case '4': // 一件代发
          this.form.isSubstituteSales = 1
          break
        case '5': // 集采商品
          this.form.isVolume = 1
          break
        case '6': // 虚拟商品
          this.form.isReal = 2
          break
        default :
      }
      this.getProductList()
    },
    // 获取分类
    async getClassify() {
      const res = await reqProNameList(1) // 获取分类
      if (res.code === 200) {
        this.classify = res.data
        this.checkChilden(this.classify)
      }
    },
    // 递归筛选
    checkChilden(arr) {
      arr.forEach((item) => {
        if (item.children && item.children.length > 0) {
          this.checkChilden(item.children)
        } else {
          delete item.children
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
  /deep/ .el-button--primary {
    color: #fff;
  }
  .gap {
    margin: 0 8px;
  }
  /* 添加商品样式 */
  .chose_tip_word {
    display: inline-block;
    min-width: 80px;
    text-align: justify;
    text-align-last: justify;
  }
  #addProduct >>> .el-button--primary {
    color: #fff;
    background: #4C86F4;
    border: none;
    height: 32px;
    padding: 0 18px;
  }
  #addProduct >>> .product_list {
    border: none;
  }
  #addProduct >>> .product_item {
    margin: 0 8px 30px;
  }
  #addProduct >>> .el-button--primary span {
    display: inline-block;
    height: 100%;
    line-height: 32px;
  }
  #addProduct >>> .el-input__inner { // 选择框
    height: 32px;
  }
  #addProduct >>> .el-dialog__body {
    padding: 18px 0 24px;
  }
  #addProduct >>> .el-input__icon {
    line-height: 32px;
  }
  #addProduct >>> #tab-6 {
    padding: 0 26px;
  }
  #addProduct >>> .el-tabs--top {
    padding: 0 46px
  }
  #addProduct >>> .el-tabs__nav {
    margin: 0 80px;
  }
  #addProduct >>> .el-tabs--border-card>.el-tabs__header .el-tabs__item {
    margin-left: 0;
    margin-top: 0;
    padding: 0 30px;
  }
  #addProduct >>> .el-tabs--border-card {
    background: #FFF;
    border: none;
    box-shadow: none;
  }
  #addProduct >>> .el-tabs--border-card>.el-tabs__header {
    background: #fff;
  }
  #addProduct >>> .el-tabs--border-card>.el-tabs__content {
    padding: 44px 0 22px 20px;
    border: 1px solid #DCDFE6;
    border-top: none;
    margin-bottom: 25px;
  }
  #addProduct >>> .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    color: #409EFF;
    background-color: #FFF;
    border-top: 1px solid #DCDFE6;
    border-right-color: #DCDFE6;
    border-left-color: #DCDFE6;
  }
  #addProduct >>> .el-dialog {
    background: #fff;
    box-shadow: 0 0 18px 0 rgba(57, 57, 57, 0.2);
    padding: 0;
  }
  #addProduct >>> .el-dialog__header {
    height: 80px;
    background: rgba(247, 250, 255, 1);
    padding: 0;
    text-align: center;
  }
  #addProduct >>> .el-dialog__header .el-dialog__title {
    font-size: 22px;
    color: rgba(76, 134, 244, 1);
    line-height: 80px;
  }
  /* 添加商品样式 */
</style>
