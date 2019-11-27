<template>
  <el-form class="edit-price-wrapper" ref="editPriceForm" :model="formEditPrice">
    <div class="pick-area">
      <el-row v-show="pickArea" class="pick-group">
        <el-row class="area-top">
          <el-col :span="3" class="pick-title">挑选范围</el-col>
          <el-col :span="21">
            <el-radio v-model="formEditPrice.pick_mode" label="1">已勾选的商品 <span class="text">(共{{selecetNumber}}件商品)</span></el-radio>
            <el-radio v-model="formEditPrice.pick_mode" label="2">所有页 <span class="text">(共{{selecetAllNumber}}件商品)</span></el-radio>
          </el-col>
        </el-row>
        <el-row class="tip">
          <el-col :span="3" class="tip-tit"> 提示：</el-col>
          <el-col :span="21">提示：修改所有页，耗费时间长，您需要等待本次改价处理完毕后，才可再次操作批量改价。改价结果可在“批量改价记录”中查看。改价将进行商品亏本校验，规则：会员价不可大于分销价，分销价不可大于销售价</el-col>
        </el-row>
      </el-row>
      <div class="pick-group">
        <el-row class="pick-head">
          <el-col :span="3" class="pick-title">分销价</el-col>
          <el-col :span="21" class="pick-tip">作为您与客户结算的价格，该站点每产生一笔订单，订单中商品的站点价将从站点余额中扣除</el-col>
        </el-row>
        <div class="group-content">
          <el-row class="pick-head">
            <el-col :span="4">
              <el-radio class="radio-tit" v-model="formEditPrice.dis_choose" label="1">按照：</el-radio>
            </el-col>
            <el-col :span="20">
              <el-col :span="6" class="select-wrapper">
                <el-select size="small" v-model="formEditPrice.distribute_price_type" placeholder="请选择">
                  <el-option label="会员价" value="1"/>
                  <el-option label="市场价" value="2"/>
                </el-select>
              </el-col>
              <el-col :span="6" class="select-wrapper">
                <el-select size="small" v-model="formEditPrice.distribute_revise_type" placeholder="请选择">
                  <el-option label="上调" value="1"/>
                  <el-option label="下降" value="2"/>
                </el-select>
              </el-col>
              <el-col :span="8" class="select-wrapper">
                  <el-input type="number" size="small" name="distributeRate" v-model="formEditPrice.distribute_rate"></el-input>
              </el-col>
              <el-col :span="2" class="radio-tit">%</el-col>
            </el-col>
          </el-row>
          <el-row class="pick-head">
            <el-col :span="4">
              <el-radio class="radio-tit" v-model="formEditPrice.dis_choose" label="2">等于：</el-radio>
            </el-col>
            <el-col :span="20">
              <el-col :span="6">
                <el-select size="small" v-model="formEditPrice.distribute_price_type_ext" placeholder="请选择">
                  <el-option label="会员价" value="1"/>
                  <el-option label="市场价" value="2"/>
                </el-select>
              </el-col>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-radio class="radio-tit" v-model="formEditPrice.dis_choose" label="3">不改变分销价</el-radio>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="pick-group">
        <el-row class="pick-head">
          <el-col :span="3" class="pick-title">销售价</el-col>
          <el-col :span="21" class="pick-tip">商城对用户的价格。积分价将按照，改价后得出的销售价，通过站点默认汇率，将现金值转换为积分值</el-col>
        </el-row>
        <div class="group-content">
          <el-row class="pick-head">
            <el-col :span="4">
              <el-radio class="radio-tit" v-model="formEditPrice.sale_choose" label="1">按照：</el-radio>
            </el-col>
            <el-col :span="20">
              <el-col :span="6" class="select-wrapper">
                <el-select size="small" v-model="formEditPrice.sale_price_type" placeholder="请选择">
                  <el-option label="会员价" value="1"/>
                  <el-option label="市场价" value="2"/>
                </el-select>
              </el-col>
              <el-col :span="6" class="select-wrapper">
                <el-select size="small" v-model="formEditPrice.sale_revise_type" placeholder="请选择">
                  <el-option label="上调" value="1"/>
                  <el-option label="下降" value="2"/>
                </el-select>
              </el-col>
              <el-col :span="8" class="select-wrapper">
                <el-input type="number" size="small" v-model="formEditPrice.sale_rate"></el-input>
              </el-col>
              <el-col :span="2" class="radio-tit">%</el-col>
            </el-col>
          </el-row>
          <el-row class="pick-head">
            <el-col :span="4">
              <el-radio class="radio-tit" v-model="formEditPrice.sale_choose" label="2">等于：</el-radio>
            </el-col>
            <el-col :span="20">
                <el-col :span="6">
                <el-select size="small" v-model="formEditPrice.sale_price_type_ext" placeholder="请选择">
                  <el-option label="会员价" value="1"/>
                  <el-option label="市场价" value="2"/>
                </el-select>
              </el-col>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-radio class="radio-tit" v-model="formEditPrice.sale_choose" label="3">不改变销售价</el-radio>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <div class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="primary('editPriceForm')">确 定</el-button>
    </div>

  </el-form>
</template>

<script>
export default {
  name: 'GoodsMyEditPirce',
  props: {
    pickArea: {
      type: Boolean,
      default: true
    },
    selecetNumber: {
      type: Number,
      default: null
    },
    selecetAllNumber: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      formEditPrice: {
        pick_mode: '1', // 挑选范围 ：1已勾选的商品，2前十页商品
        dis_choose: '1', // 分销价：选择 1按照，2等于，3 不改变分销价价
        distribute_price_type: '1', // 分销价：按照 1会员价，2市场价
        distribute_revise_type: '1', // 分销价： 按照 1上调，2下降
        distribute_rate: '', // 分销价：按照 利率
        distribute_price_type_ext: '1', // 分销价：等于 1会员价，2市场价
        sale_choose: '1', // 销售价：选择 1按照，2等于
        sale_price_type: '1', // 销售价：按照 1会员价，2市场价
        sale_revise_type: '1', // 销售价：按照 1上调，2下降
        sale_rate: '', // 销售价：按照 利率
        sale_price_type_ext: '1' // 销售价：等于 1会员价，2市场价
      }
    }
  },
  methods: {
    cancle () {
      this.$emit('cancle')
    },
    primary (formName) {
      this.$emit('primary', this.formEditPrice)
    }
  }
}
</script>

<style lang="scss" scoped>
  .pick-area {
    .text {
      color: #999;
    }
    .area-top {
      margin-bottom: 10px;
    }
    .tip {
      margin-bottom: 10px;
      .tip-tit {
        color: #fff;
      }
      line-height: 1.5;
      color: #999;
    }
    .pick-group {
      line-height: 30px;
      margin-bottom: 20px;
    }
    .pick-head {
      margin-bottom: 20px;
    }
    .pick-title {
      font-size: 14px;
      color: #333;
    }
    .pick-tip {
      font-size: 12px;
      color: #999;
    }
    .group-content {
      margin-left: 106px;
    }
    .radio-tit {
      line-height: 32px;
    }
    .select-wrapper {
      margin-right: 5px;
    }
  }
  .dialog-footer {
    text-align: right;
  }
</style>
