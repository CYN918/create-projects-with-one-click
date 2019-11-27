<template>
  <div class="edit-price-wrapper">
    <el-form class="pick-area">
      <el-row v-show="pickArea" class="pick-group">
        <el-col :span="3" class="pick-title">挑选范围</el-col>
        <el-col :span="21">
          <el-radio v-model="formEditPrice.pick_mode" label="1">已勾选的商品</el-radio>
          <el-radio v-model="formEditPrice.pick_mode" label="2">前十页商品</el-radio>
        </el-col>
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
                <el-input size="small" v-model="formEditPrice.distribute_rate"></el-input>
              </el-col>
              <el-col :span="2" class="radio-tit">%</el-col>
            </el-col>
          </el-row>
          <el-row>
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
                <el-input size="small" v-model="formEditPrice.sale_rate"></el-input>
              </el-col>
              <el-col :span="2" class="radio-tit">%</el-col>
            </el-col>
          </el-row>
          <el-row>
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
        </div>
      </div>
      <div class="pick-group">
        <el-row class="pick-head">
          <el-col :span="3" class="pick-title">是否上架</el-col>
          <el-col :span="21" class="pick-tip">选择不上架，商品依然将挑选至该站点，但是上架状态为未上架，需再次上架后，用户才可见</el-col>
        </el-row>
        <div class="group-content">
          <el-row>
            <el-radio v-model="formEditPrice.status" label="1">直接上架</el-radio>
            <el-radio v-model="formEditPrice.status" label="2">暂不上架</el-radio>
          </el-row>
        </div>
      </div>
    </el-form>

    <div class="dialog-footer">
      <el-button @click="cancle">{{cancleText}}</el-button>
      <el-button type="primary" @click="primary">确 定</el-button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'GoodsAddEditPirce',
  props: {
    pickArea: {
      type: Boolean,
      default: true
    },
    cancleText: {
      type: String,
      default: '取 消'
    }
  },
  data () {
    return {
      formEditPrice: {
        pick_mode: '1', // 挑选范围 ：1已勾选的商品，2前十页商品
        dis_choose: '1', // 分销价：选择 1按照，2等于
        distribute_price_type: '1', // 分销价：按照 1会员价，2市场价
        distribute_revise_type: '1', // 分销价： 按照 1上调，2下降
        distribute_rate: null, // 分销价：按照 利率
        distribute_price_type_ext: '1', // 分销价：等于 1会员价，2市场价
        sale_choose: '1', // 销售价：选择 1按照，2等于
        sale_price_type: '1', // 销售价：按照 1会员价，2市场价
        sale_revise_type: '1', // 销售价：按照 1上调，2下降
        sale_rate: null, // 销售价：按照 利率
        sale_price_type_ext: '1', // 销售价：等于 1会员价，2市场价
        status: '1' // 是否上架， 1直接上架，2暂不上架
      }
    }
  },
  methods: {
    cancle () {
      this.$emit('cancle')
    },
    primary () {
      this.$emit('primary', this.formEditPrice)
    }
  }
}
</script>

<style lang="scss" scoped>
  .pick-area {
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
