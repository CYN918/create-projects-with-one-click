
<template>
  <div class="goods-fitter">
    <el-form label-width="100px" size="small">
      <div class="vender">
        <ul class="clearfix">
          <li
            v-for="item in venderList"
            @click="tabVender(item.value)"
            :class="form.third_party === item.value ? 'active' : ''"
            :key="item.value">
            <i class="image">
              <img :src="require(`@/common/images/${item.image}`)" alt="item.name">
            </i>
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="search-wrapper">
        <h4 class="title">搜索条件</h4>
        <div class="search-main" v-show="searchMain">
          <el-row>
            <el-col :span="9">
              <el-form-item label="利润率：">
                <el-col :span="10">
                  <el-input v-model="form.profit_min" placeholder="利润率起始"><span slot="suffix">%</span></el-input>
                </el-col>
                <el-col :span="2" class="text-space">
                  至
                </el-col>
                <el-col :span="10">
                  <el-input v-model="form.profit_max" placeholder="利润率结束"><span slot="suffix">%</span></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item label="货源地：">
                <el-select class="el-select-width" v-model="form.province_id" @change="GetAddress('2', form.province_id)" placeholder="请选择省">
                  <el-option v-for="item in provinceList"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"/>
                </el-select>
                <el-select class="el-select-width" v-model="form.city_id" @change="GetAddress('3', form.city_id)" placeholder="请选择市">
                  <el-option v-for="item in cityList"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"/>
                </el-select>
                  <el-select class="el-select-width" v-model="form.area_id" placeholder="请选择区">
                  <el-option v-for="item in areaList"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"/>
                </el-select>
                <!-- `checked` 为 true 或 false -->
                <el-checkbox v-model="form.is_stock">只看有货</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="市场价：">
                <el-col :span="10">
                  <el-input v-model="form.market_price_min" placeholder="市场价起始"><span slot="suffix">¥</span></el-input>
                </el-col>
                <el-col :span="2" class="text-space">
                  至
                </el-col>
                <el-col :span="10">
                  <el-input v-model="form.market_price_max" placeholder="市场价结束"><span slot="suffix">¥</span></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item label="分类：">
                <el-cascader
                  class="el-select-width"
                  placeholder="请输入内容"
                  :options="categoryList"
                  filterable
                  change-on-select
                  @change="handleSelectCategoryQuery">
                </el-cascader>
                <el-checkbox v-if="shelfStatus" v-model="form.shelf_status">只看未挑选</el-checkbox>
                <el-checkbox v-if="tagProduct" v-model="form.tag_product_visible">仅看标签商品</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="storePrice">
            <el-col :span="9">
              <el-form-item label="分销价：">
                <el-col :span="10">
                  <el-input v-model="form.store_price_min" placeholder="分销价起始"><span slot="suffix">¥</span></el-input>
                </el-col>
                <el-col :span="2" class="text-space">
                  至
                </el-col>
                <el-col :span="10">
                  <el-input v-model="form.store_price_max" placeholder="分销价结束"><span slot="suffix">¥</span></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="状态：">
                <el-select class="el-select-width" v-model="form.status" placeholder="状态">
                  <el-option label="上架" value="1"></el-option>
                  <el-option label="下架" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="价格关系：">
                <el-select class="el-select-width" v-model="form.relationship_pre" placeholder="选择价格">
                  <el-option label="选择价格" value="0"></el-option>
                  <el-option label="市场价" value="1"></el-option>
                  <el-option label="会员价" value="2"></el-option>
                  <el-option label="分销价" value="3"></el-option>
                  <el-option label="销售价" value="4"></el-option>
                </el-select>
                <el-select class="el-select-width" v-model="form.relationship" placeholder="计算方式">
                  <el-option label="计算方式" value="0"></el-option>
                  <el-option label="大于" value="1"></el-option>
                  <el-option label="等于" value="2"></el-option>
                  <el-option label="小于" value="3"></el-option>
                </el-select>
                <el-select class="el-select-width" v-model="form.relationship_then" placeholder="选择价格">
                  <el-option label="选择价格" value="0"></el-option>
                  <el-option label="市场价" value="1"></el-option>
                  <el-option label="会员价" value="2"></el-option>
                  <el-option label="分销价" value="3"></el-option>
                  <el-option label="销售价" value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="search-base">
          <el-row>
            <el-col :span="9">
              <el-form-item label="会员价：">
                <el-col :span="10">
                  <el-input v-model="form.price_min" placeholder="会员价起始"><span slot="suffix">¥</span></el-input>
                </el-col>
                <el-col :span="2" class="text-space">
                  至
                </el-col>
                <el-col :span="10">
                  <el-input v-model="form.price_max" placeholder="会员价结束"><span slot="suffix">¥</span></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-col>
                <el-form-item label="关键字：">
                  <el-select class="el-select-width" v-model="form.search_type" placeholder="请选择">
                    <el-option label="按商品名称" value="1"></el-option>
                    <el-option label="按SKU ID搜索" value="2"></el-option>
                    <!-- <el-option label="商品来源" value="3"></el-option> -->
                  </el-select>
                  <div class="el-input-width">
                    <el-input v-model="form.keyword" placeholder="请输入关键字"></el-input>
                  </div>
                </el-form-item>
              </el-col>

            </el-col>
            <el-col :span="5">
              <el-button type="primary" size="small" @click="handelSearchGoods">搜索</el-button>
              <el-button size="small" @click="handelResetCondition">重置</el-button>
              <span class="btn-toggle" @click="toggleSearch">{{toggleSearchText}}</span>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getAddress, getCategory } from '@/api/public'

export default {
  name: 'GoodsFitter',
  props: {
    shelfStatus: {
      type: Boolean,
      default: false
    },
    tagProduct: {
      type: Boolean,
      default: false
    },
    storePrice: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      venderList: [{
        name: '京东商品',
        image: 'jd.png',
        value: '1'
      }, {
        name: '苏宁商品',
        image: 'sn.png',
        value: '2'
      }, {
        name: '一件代发商品',
        image: 'yjdf.png',
        value: '3'
      }, {
        name: '集采商品',
        image: 'jc.png',
        value: '4'
      }, {
        name: '网易严选商品',
        image: 'yx.png',
        value: '5'
      }],
      form: {
        third_party: '1', // 京东商品，苏宁商品，自营商品，网易严选商品
        profit_min: '', // 利润率起始
        profit_max: '', // 利润率结束
        market_price_min: '', // 市场价起始
        market_price_max: '', // 市场价结束
        price_min: '', // 会员价起始
        price_max: '', // 会员价结束
        store_price_min: '', // 分销价起始
        store_price_max: '', // 分销价结束
        cat_id: '', // 分类id
        search_type: '1', // 关键字类型
        keyword: '', // 关键字
        province_id: '', // 省
        city_id: '', // 市
        area_id: '', // 区
        is_stock: true, // 是否有货
        shelf_status: false, // 是否未挑选
        status: '1', // 状态 1 上架， 2 下架
        relationship_pre: '0', // 0 选择价格, 1 市场价, 2 会员价, 3 分销价, 4 销售价
        relationship: '0', // 计算方式 0计算方式， 1 大于， 2 等于， 3 小于
        relationship_then: '0', // 0 选择价格, 1 市场价, 2 会员价, 3 分销价, 4 销售价
        tag_product_visible: false // 仅看标签商品
      },
      initForm: {},
      searchMain: false,
      categoryList: [], // 分类
      provinceList: [], // 省
      cityList: [], // 市
      areaList: [] // 区
    }
  },
  created () {
    this._getCategory()
    this._getAddress('1', 0)
    this.initForm = Object.assign({}, this.form)
  },
  computed: {
    active () {
      return this.form.third_party === 0 ? 'active' : ''
    },
    toggleSearchText () {
      return this.searchMain ? '基础搜索' : '高级搜索'
    }
  },
  methods: {
    tabVender (val) {
      this.form.third_party = val
      this.$emit('tabVender', this.form)
    },
    toggleSearch () {
      this.searchMain = !this.searchMain
    },
    handelSearchGoods () {
      this.$emit('goodsFitter', this.form)
    },
    handelResetCondition () {
      this.form = Object.assign({}, this.initForm)
    },
    GetAddress (type, parent) {
      this._getAddress(type, parent)
    },
    handleSelectCategoryQuery (val) {
      this.form.cat_id = val[val.length - 1]
    },
    _getAddress (type, parent) {
      getAddress(type, parent).then(res => {
        switch (type) {
          case '1':
            this.provinceList = res.data
            this.cityList = []
            this.areaList = []
            this.form.area_id = ''
            break
          case '2':
            this.cityList = res.data
            this.areaList = []
            this.form.city_id = ''
            this.form.area_id = ''
            break
          case '3':
            this.areaList = res.data
            this.form.area_id = ''
            break
          default:
            return []
        }
      })
    },
    _getCategory () {
      getCategory().then(res => {
        this.categoryList = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/variable.scss';
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
              content: '';
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
      .search-base {}
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
</style>
