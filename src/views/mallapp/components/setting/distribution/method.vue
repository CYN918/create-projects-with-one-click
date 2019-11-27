<template>
  <el-form :model="form" class="form" size="small" label-width="130px" label-position="left">
    <el-form-item label="配送模式选择：">
      <el-select v-model="form.state" placeholder="请选择活动区域">
        <el-option label="用户地址" value="1"></el-option>
        <el-option label="预设地址" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="自定义提示文案：" v-show="showDesc">
      <el-input type="textarea" :rows="5" v-model="form.distribution_desc" placeholder="请输入提示文案">
      </el-input>
    </el-form-item>
    <div class="tip">提示：此功能可以让您设置商城的所有用户的订单中的商品，是配送至用户自行填写的地址，或是让用户选择配送至由后台预设的地址。</div>
    <el-button type="primary" class="btn" :loading="loading" @click="submitForm">保 存</el-button>
  </el-form>
</template>

<script>
import { getDistribution, setDistribution } from '@/api/mallapp/setting/distribution'

export default {
  data () {
    return {
      form: {
        state: '1', // 配送模式选择: 1.用户地址 2.预设地址
        distribution_desc: '' // 自定义提示文案
      },
      loading: false
    }
  },
  created () {
    this._getDistribution()
  },
  computed: {
    showDesc () {
      return this.form.state === '2'
    }
  },
  methods: {
    submitForm () {
      this._setDistribution()
    },
    _getDistribution () {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getDistribution().then(res => {
        loading.close()
        this.form = res.data
      })
    },
    _setDistribution () {
      // this.loading = true
      setDistribution(this.form).then(() => {
        this.loading = false
        this._getDistribution()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .form {
    width: 600px;
  }
  .tip {
    margin-bottom: 20px;
    font-size: 14px;
    color: #999;
  }
  .btn {
    margin: 20px 0 20px 150px;
  }
</style>
