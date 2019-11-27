<template>
  <div class="mcard">
    <el-form :model="form" :rules="rules" ref="form" class="form" label-width="200px">
      <el-form-item prop="data_type" label="数据类型">
        <el-radio-group v-model="form.data_type">
          <el-radio label="1">分析网点数据</el-radio>
          <el-radio label="2">分析用户数据</el-radio>
          <el-radio label="3">周分析商品数据三</el-radio>
        </el-radio-group>
        <p class="tip">{{typeTip}}</p>
      </el-form-item>
      <el-form-item prop="data_type" label="时间段">
        <el-row>
          <el-col :span="7">
            <el-form-item prop="start_time">
              <el-date-picker v-model="form.start_time" type="date" placeholder="开始时间"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="1" style=" margin-left: 10px; line-height: 40px;">-</el-col>
          <el-col :span="7">
            <el-form-item prop="start_time">
              <el-date-picker v-model="form.end_time" type="date" placeholder="结束时间"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <p class="tip">注意：导出数据的时间段间隔，不能超过62天</p>
      </el-form-item>
      <el-form-item prop="field_data" label="选择时间标签（允许多选）">
        <el-checkbox-group v-model="form.field_data">
          <el-checkbox
            v-for="(item, index) in dataList"
            :label="item.lable"
            :key="index"
            :disabled="item.disabled"
          >{{item.value}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">导出报表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        data_type: '1', // 数据类型: '1' 分析网点数据 '2' 分析用户数据 '3' 分析商品数据
        start_time: '', // 开始时间
        end_time: '', // 结束时间
        field_data: ['1', '2', '4'] // 选择时间标签（允许多选）  '1' 网点二级分行   '2' 网点名称   '3' 客户手机号   '4' 已充值积分   '5' 已使用积分   '6' 剩余积分
      },
      data_1: [{
        lable: '1',
        value: '二级分行名称',
        disabled: false
      },
      {
        lable: '2',
        value: '网点名称',
        disabled: true
      },
      {
        lable: '3',
        value: '充值类型',
        disabled: false
      },
      {
        lable: '4',
        value: ' 录入积分',
        disabled: true
      },
      {
        lable: '5',
        value: '消耗积分',
        disabled: false
      }],
      data_2: [{
        lable: '1',
        value: '网点二级分行',
        disabled: false
      },
      {
        lable: '2',
        value: '网点名称',
        disabled: false
      },
      {
        lable: '3',
        value: '客户手机号',
        disabled: true
      },
      {
        lable: '4',
        value: '已充值积分',
        disabled: false
      },
      {
        lable: '5',
        value: '已使用积分',
        disabled: false
      },
      {
        lable: '6',
        value: '剩余积分',
        disabled: false
      }],
      data_3: [{
        lable: '1',
        value: '二级行名称',
        disabled: false
      },
      {
        lable: '2',
        value: '网点名称',
        disabled: false
      },
      {
        lable: '3',
        value: '兑换产品名称',
        disabled: true
      },
      {
        lable: '4',
        value: ' 产品数量',
        disabled: true
      },
      {
        lable: '5',
        value: '供货金额',
        disabled: false
      },
      {
        lable: '6',
        value: '客户消耗积分',
        disabled: false
      },
      {
        lable: '7',
        value: '使用现金',
        disabled: false
      },
      {
        lable: '8',
        value: '销售价',
        disabled: false
      }]
    }
  },
  computed: {
    typeTip () {
      let tip = ''
      switch (this.form.data_type) {
        case '1':
          tip = '说明：以网点为单位，分析每个网点为客户充值及消耗积分数据，数据包含网点名称（必须）、二级分行名称（可选）、充值类型（可选）、充值积分值（必选）、兑换积分值（可选）。'
          break
        case '2':
          tip = '说明：以用户为单位，可分析每位用户通过哪些网点获取过的总积分、消耗的总积分、剩余总积分。数据包含用户手机号（必选）、充值来源网点（可选）、网点二级分行（可选）、已获得积分（可选）、已使用积分（可选）、剩余积分（可选）。'
          break
        case '3':
          tip = '说明：以商品为单位，可分析由哪些网点兑换，结算价是多少等。数据包含兑换产品名称（必须）、产品数量（必须）、飞象供货金额（可选）、客户消耗积分（必须）、使用现金（可选）、网点名称（可选）、二级分行名称（可选）、销售价（可选）。'
          break

        default:
          break
      }
      return tip
    },
    dataList () {
      let data = []
      switch (this.form.data_type) {
        case '1':
          data = this.data_1
          break
        case '2':
          data = this.data_2
          break
        case '3':
          data = this.data_3
          break

        default:
          break
      }
      return data
    }
  }
}
</script>

<style lang='scss' scoped>
.form {
  width: 1000px;
  .tip {
    margin-top: 12px;
    line-height: 1.5;
    color: #999;
  }
}
</style>
