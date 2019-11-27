<template>
  <div class="goods-fitter">
    <el-form label-width="180px" size="small">
      <div class="mbottom">
        <div class="goods-fitter">
            <div class="search-wrapper1">
              <el-page-header @back="back" content="商家管理>供应商档案>查看商品"></el-page-header>
            </div>
        </div>
      </div>
      <div class="search-wrapper">
        <h4 class="title">迈戈实业供应商</h4>
        <div class="search-main" >
          <el-row>
            <el-col :span="8">
              <el-form-item label="税前毛利润率：">
                <el-col :span="10">
                  <el-input v-model="form.grossProfitMarginStart" placeholder="利润率起始">
                    <span slot="suffix">%</span>
                  </el-input>
                </el-col>
                <el-col :span="1" class="text-space">至</el-col>
                <el-col :span="10">
                  <el-input v-model="form.grossProfitMarginEnd" placeholder="利润率结束">
                    <span slot="suffix">%</span>
                  </el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-col>
                <el-form-item label="关键字：">
                  <el-select class="el-select-width" v-model="form.search_type" placeholder="请选择">
                    <el-option label="按商品名称" value="1"></el-option>
                    <el-option label="按供应商名称" value="2"></el-option>
                    <el-option label="型号" value="3"></el-option>
                    <el-option label="品牌" value="4"></el-option>
                  </el-select>
                  <div class="el-input-width">
                    <el-input v-model="form.keyword" placeholder="请输入关键字"></el-input>
                  </div>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" size="small" @click="handelSearchGoods">搜索</el-button>
              <el-button type="primary" size="small" @click="handelResetCondition">导出</el-button>
              <el-button type="primary" size="small" @click="handelResetCondition">切换模态试图</el-button>
              <span class="btn-toggle" @click="toggleSearch">{{toggleSearchText}}</span>
            </el-col>
          </el-row>
        </div>
        <div class="search-main" v-show="searchMain">
          <el-row>
            <el-col :span="8">
              <el-form-item label="税后毛利润率：">
                <el-col :span="10">
                  <el-input v-model="form.grossProfitMarginTaxStart" placeholder="利润率起始">
                    <span slot="suffix">%</span>
                  </el-input>
                </el-col>
                <el-col :span="1" class="text-space">至</el-col>
                <el-col :span="10">
                  <el-input v-model="form.grossProfitMarginTaxEnd" placeholder="利润率结束">
                    <span slot="suffix">%</span>
                  </el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="税后纯利润率：">
                <el-col :span="10">
                  <el-input v-model="form.netProfitMarginStart" placeholder="利润率起始">
                    <span slot="suffix">%</span>
                  </el-input>
                </el-col>
                <el-col :span="1" class="text-space">至</el-col>
                <el-col :span="10">
                  <el-input v-model="form.netProfitMarginEnd" placeholder="利润率结束">
                    <span slot="suffix">%</span>
                  </el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="分销利润率：">
                <el-col :span="10">
                  <el-input v-model="form.distrProfitMarginStart" placeholder="利润率起始">
                    <span slot="suffix">%</span>
                  </el-input>
                </el-col>
                <el-col :span="1" class="text-space">至</el-col>
                <el-col :span="10">
                  <el-input v-model="form.distrProfitMarginEnd" placeholder="利润率结束">
                    <span slot="suffix">%</span>
                  </el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="成本价：">
                <el-col :span="10">
                  <el-input v-model="form.costPriceStart" placeholder="成本价起始">
                    <span slot="suffix">¥</span>
                  </el-input>
                </el-col>
                <el-col :span="1" class="text-space">至</el-col>
                <el-col :span="10">
                  <el-input v-model="form.costPriceEnd" placeholder="成本价结束">
                    <span slot="suffix">¥</span>
                  </el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="一件代发价对比京东/天猫折扣率：">
                <el-col :span="10">
                  <el-input v-model="form.costPriceJdRatioStart" placeholder="折扣率起始">
                    <span slot="suffix">折</span>
                  </el-input>
                </el-col>
                <el-col :span="1" class="text-space">至</el-col>
                <el-col :span="10">
                  <el-input v-model="form.costPriceJdRatioEnd" placeholder="折扣率结束">
                    <span slot="suffix">折</span>
                  </el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商城价对比京东价折扣率：">
                <el-col :span="10">
                  <el-input v-model="form.shopJdRatioStart" placeholder="折扣率起始">
                    <span slot="suffix">折</span>
                  </el-input>
                </el-col>
                <el-col :span="1" class="text-space">至</el-col>
                <el-col :span="10">
                  <el-input v-model="form.shopJdRatioEnd" placeholder="折扣率结束">
                    <span slot="suffix">折</span>
                  </el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="批发价1对比京东/天猫折扣率：">
                <el-col :span="10">
                  <el-input v-model="form.volumeJdRatioStart" placeholder="商城价起始">
                    <span slot="suffix">¥</span>
                  </el-input>
                </el-col>
                <el-col :span="1" class="text-space">至</el-col>
                <el-col :span="10">
                  <el-input v-model="form.volumeJdRatioEnd" placeholder="商城价结束">
                    <span slot="suffix">¥</span>
                  </el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="批发价1对比商城利润率：">
                <el-col :span="10">
                  <el-input v-model="form.volumeShopRatioStart" placeholder="京东价起始">
                    <span slot="suffix">¥</span>
                  </el-input>
                </el-col>
                <el-col :span="1" class="text-space">至</el-col>
                <el-col :span="10">
                  <el-input v-model="form.volumeShopRatioEnd" placeholder="京东价结束">
                    <span slot="suffix">¥</span>
                  </el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
            <el-form-item label="采购员：">
                <el-col :span="10">
                  <el-select v-model="form.sysUserId" filterable placeholder="请选择" >
                    <el-option
                      v-for="item in options"
                      :key="item.sysuserId"
                      :label="item.sysuserName"
                      :value="item.sysuserId">
                    </el-option>
                  </el-select>
                </el-col>
              </el-form-item>
          <el-row>
          </el-row>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import {
  getBuyer,
} from "@/api/product/index";
export default {
  props:['dataObj'],
  data () {
    return {
      value:'',
      venderList: [
      {
        name: '一件代发商品',
        image: 'yjdf.png',
        value: '4'
      },
      {
        name: '集采商品',
        image: 'jc.png',
        value: '5'
      },
      {
        name: '京东商品',
        image: 'jd.png',
        value: '1'
      }, {
        name: '苏宁商品',
        image: 'sn.png',
        value: '3'
      },{
        name: '网易严选商品',
        image: 'yx.png',
        value: '2'
      }],
       options: [], //采购员
      form: {
        third_party: '4', // 1，京东 2，网易 3，苏宁 4, 一件代发商品 5, 集采商品
        search_type: '1', // 关键字类型
        keyword: '', // 关键字
        isReal:1, //是否是实物。1，是；0，否
        grossProfitMarginStart:'',//税前毛利润率起始
        grossProfitMarginEnd:'', // 税前毛利润率结束
        grossProfitMarginTaxStart:'', //税后毛利润率起始
        grossProfitMarginTaxEnd:'', //税后毛利润率结束
        netProfitMarginStart:'', //税后纯利润率起始
        netProfitMarginEnd:'', //税后纯利润率结束
        distrProfitMarginStart:'', //分销利润率起始
        distrProfitMarginEnd:'', //分销利润率结束
        costPriceStart:'', //商品成本价起始
        costPriceEnd:'', //商品成本价结束
        costPriceJdRatioStart:'', //一件代发价对比京东/天猫折扣率开始
        costPriceJdRatioEnd:'', //一件代发价对比京东/天猫折扣率结束
        shopJdRatioStart:'', //商城价对比京东价折扣率开始
        shopJdRatioEnd:'', //商城价对比京东价折扣率结束
        volumeJdRatioStart:'', //批发价1对比京东/天猫折扣率开始
        volumeJdRatioEnd:'', //批发价1对比京东/天猫折扣率结束
        volumeShopRatioStart:'', //批发价1对比商城利润率开始
        volumeShopRatioEnd:'', //批发价1对比商城利润率结束
        sysUserId:'', //采购员id
        current_page: 1,
        page_size: 10,
        total_count: 0
      },
      initForm: {},
      searchMain: false
    }
  },
  created () {
    this.initForm = Object.assign({}, this.form)
    this._getBuyer()
  },
  updated(){
    this.form.current_page = this.dataObj.current_page
    this.form.page_size = this.dataObj.page_size
    this.form.total_count = this.dataObj.total_count
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
    //查询采购人员
    _getBuyer(){
      let obj = {}
      obj.name = ''
      obj.currentPage = 1,
      obj.size = 0
      getBuyer(obj).then(res => {
        this.options = res.data.list
      })
    },
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
    back(){
      this.$router.go(-1)
    }
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
    margin-right: 11px;
    margin-left: 11px;
  }
  .el-select-width {
    max-width: 130px;
    margin-right: 5px;
  }
  .el-input-width {
    display: inline-block;
    max-width: 140px;
  }
  .el-input--small{
    display: inline-block;
    max-width: 140px !important;
  }
  .btn-toggle {
    margin-left: 10px;
    font-size: 14px;
    color: $themeColor;
    cursor: pointer;
  }
}
  .search-wrapper1 {
    padding: 20px;
    border: 1px solid rgb(215, 224, 241);
    background: #fff;
    display: flex;
    align-items: center;
    .title1 {
      display: flex;
      margin-left: 40%;
    }
  }
</style>
