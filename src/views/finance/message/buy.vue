<template>
  <div>
    <div class="mcard mbottom">
      <div class="title">购买短信套餐</div>
      <el-row :gutter="40" class="list">
        <el-col :span="3" class="name">类型：</el-col>
        <el-col :span="21">
          <el-button type="primary" size="medium">通知短信</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="3" class="name">规格：</el-col>
        <el-col :span="21">
          <el-radio-group v-model="number" size="medium">
            <el-radio-button label="500">500条</el-radio-button>
            <el-radio-button label="1000">1000条</el-radio-button>
            <el-radio-button label="2000">2000条</el-radio-button>
            <el-radio-button label="5000">5000条</el-radio-button>
            <el-radio-button label="10000">10000条</el-radio-button>
          </el-radio-group>
          <p class="tip">短信条数购买成功后，即可生效，使用后剩余条数不支持退订</p>
        </el-col>
      </el-row>
    </div>
    <div class="mcard">
      <div class="title">已选配置</div>
      <el-row :gutter="40">
        <el-col :span="3" class="name">类型：</el-col>
        <el-col :span="21" class="line">通知短信</el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="3" class="name">规格：</el-col>
        <el-col :span="21" class="line">{{number}}条</el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="3" class="name">费用：</el-col>
        <el-col :span="21" class="line yellow">¥ {{totlePrice}}</el-col>
      </el-row>
      <el-row :gutter="40" class="btn-wrapper">
        <el-col :span="3" class="name">&nbsp;</el-col>
        <el-col :span="21" class="line">
          <el-button type="primary" size="medium" @click="handleBuy" :loading="loading">立即购买</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { messageBuy } from '@/api/finance/message'

const PRICE = 0.1
export default {
  name: 'MessageBuy',
  data () {
    return {
      number: 500,
      loading: false
    }
  },
  computed: {
    totlePrice () {
      return (this.number * 0.1).toFixed(2)
    }
  },
  methods: {
    handleBuy () {
      let data = {}
      data.number = this.number
      data.total_price = (this.number * PRICE).toFixed(2)
      this.$confirm('是否确定购买此套餐?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        messageBuy(data).then(() => {
          this.loading = false

          this.$alert('短信套餐购买成功！', '提示', {
            confirmButtonText: '确定',
            type: 'success'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.list {
  margin-bottom: 20px;
}
.name {
  text-align: right;
  line-height: 36px;
}
.tip {
  margin-top: 20px;
  font-size: 12px;
}
.line {
  line-height: 36px;
}
.yellow {
  color: #ff9136;
  font-size: 32px;
  font-weight: 700;
}
.btn-wrapper {
  margin: 50px 0 20px 0;
}
</style>
