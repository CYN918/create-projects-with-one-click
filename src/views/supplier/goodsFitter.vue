<template>
    <div class>
  <div class="mbottom">
  <div class="goods-fitter">
    <el-form label-width="180px" size="small">
      <div class="search-wrapper">
        <h4 class="title">搜索条件</h4>
        <div class="search-main" >
          <el-row>
            <el-col :span="8">
              <el-form-item label="税前毛利润率：">
                <el-col :span="10">
                  <el-input v-model="form.gross_profit_margin_min" placeholder="利润率起始">
                    <span slot="suffix">%</span>
                  </el-input>
                </el-col>
                <el-col :span="1" class="text-space">至</el-col>
                <el-col :span="10">
                  <el-input v-model="form.gross_profit_margin_max" placeholder="利润率结束">
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
                  <el-input v-model="form.gross_profit_margin_tax_min" placeholder="利润率起始">
                    <span slot="suffix">%</span>
                  </el-input>
                </el-col>
                <el-col :span="1" class="text-space">至</el-col>
                <el-col :span="10">
                  <el-input v-model="form.gross_profit_margin_tax_max" placeholder="利润率结束">
                    <span slot="suffix">%</span>
                  </el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="税后纯利润率：">
                <el-col :span="10">
                  <el-input v-model="form.net_profit_margin_min" placeholder="利润率起始">
                    <span slot="suffix">%</span>
                  </el-input>
                </el-col>
                <el-col :span="1" class="text-space">至</el-col>
                <el-col :span="10">
                  <el-input v-model="form.net_profit_margin_max" placeholder="利润率结束">
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
                  <el-input v-model="form.profit_min" placeholder="利润率起始">
                    <span slot="suffix">%</span>
                  </el-input>
                </el-col>
                <el-col :span="1" class="text-space">至</el-col>
                <el-col :span="10">
                  <el-input v-model="form.profit_max" placeholder="利润率结束">
                    <span slot="suffix">%</span>
                  </el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="成本价：">
                <el-col :span="10">
                  <el-input v-model="form.cost_price_min" placeholder="成本价起始">
                    <span slot="suffix">¥</span>
                  </el-input>
                </el-col>
                <el-col :span="1" class="text-space">至</el-col>
                <el-col :span="10">
                  <el-input v-model="form.cost_price_min" placeholder="成本价结束">
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
                  <el-input v-model="form.cost_jd_ratio_min" placeholder="折扣率起始">
                    <span slot="suffix">折</span>
                  </el-input>
                </el-col>
                <el-col :span="1" class="text-space">至</el-col>
                <el-col :span="10">
                  <el-input v-model="form.cost_jd_ratio_max" placeholder="折扣率结束">
                    <span slot="suffix">折</span>
                  </el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商城价对比京东价折扣率：">
                <el-col :span="10">
                  <el-input v-model="form.shop_jd_ratio_min" placeholder="折扣率起始">
                    <span slot="suffix">折</span>
                  </el-input>
                </el-col>
                <el-col :span="1" class="text-space">至</el-col>
                <el-col :span="10">
                  <el-input v-model="form.shop_jd_ratio_max" placeholder="折扣率结束">
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
                  <el-input v-model="form.shop_price_min" placeholder="商城价起始">
                    <span slot="suffix">¥</span>
                  </el-input>
                </el-col>
                <el-col :span="1" class="text-space">至</el-col>
                <el-col :span="10">
                  <el-input v-model="form.shop_price_max" placeholder="商城价结束">
                    <span slot="suffix">¥</span>
                  </el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="批发价1对比商城利润率：">
                <el-col :span="10">
                  <el-input v-model="form.jd_price_min" placeholder="京东价起始">
                    <span slot="suffix">¥</span>
                  </el-input>
                </el-col>
                <el-col :span="1" class="text-space">至</el-col>
                <el-col :span="10">
                  <el-input v-model="form.jd_price_max" placeholder="京东价结束">
                    <span slot="suffix">¥</span>
                  </el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
            <el-form-item label="采购员：">
                <el-col :span="10">
                  <el-select v-model="value" filterable placeholder="请选择" >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
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
  </div>
  </div>
</template>

<script>

export default {
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
       options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      form: {
        search_type: '1', // 关键字类型
        keyword: '', // 关键字
        discount_min: '', // 产品利润率起始
        discount_max: '', // 产品利润率结束
        gross_profit_margin_min: '', // 税前毛利润率起始
        gross_profit_margin_max: '', // 税前毛利润率结束
        net_profit_margin_min: '', // 税前纯利润率起始
        net_profit_margin_max: '', // 税前纯利润率结束
        gross_profit_margin_tax_min: '', // 税后纯利润率起始
        gross_profit_margin_tax_max: '', // 税后纯利润率结束
        profit_min: '', // 分销利润率起始
        profit_max: '', // 分销利润率结束
        shop_price_min: '', // 商城价起始
        shop_price_max: '', // 商城价结束
        cost_price_min: '', // 成本价起始
        cost_price_max: '', // 成本价结束
        jd_price_min: '', // 京东价起始
        jd_price_max: '', // 京东价结束
        cost_jd_ratio_min: '', // 成本价对比京东价折扣率起始
        cost_jd_ratio_max: '', // 成本价对比京东价折扣率结束
        shop_jd_ratio_min: '', // 商城价对比京东价折扣率起始
        shop_jd_ratio_max: '' // 商城价对比京东价折扣率结束
      },
      initForm: {},
      searchMain: false
    }
  },
  created () {
    this.initForm = Object.assign({}, this.form)
  },
  computed: {
    toggleSearchText () {
      return this.searchMain ? '基础搜索' : '高级搜索'
    }
  },
  methods: {
    toggleSearch () {
      this.searchMain = !this.searchMain
    },
    handelSearchGoods () {
      this.$emit('goodsFitter', this.form)
    },
    handelResetCondition () {
      this.form = Object.assign({}, this.initForm)
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
  .el-input--small {
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

</style>
