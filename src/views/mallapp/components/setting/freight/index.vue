<template>
  <div class="margin">
    <div class="mcard">
      <div class="title">运费模式</div>
        <el-tabs type="card">
          <el-tab-pane label="所有商品统一设定运费模式">
            <freight :data="freightData" @refresh="handleRefresh"></freight>
          </el-tab-pane>
          <el-tab-pane label="针对商品来源设定运费模式">
            <freight-part :data='freightPartData' @refresh="handleRefresh"></freight-part>
          </el-tab-pane>
        </el-tabs>
    </div>
  </div>
</template>
<script>
import Freight from './freight'
import FreightPart from './freightPart'
import { getFreight } from '@/api/mallapp/setting/freight'

export default {
  name: 'MsettingFreight',
  data () {
    return {
      freightData: {},
      freightPartData: {}
    }
  },
  created () {
    this._getFreight()
  },
  methods: {
    handleRefresh () {
      this._getFreight()
    },
    _getFreight () {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getFreight().then(res => {
        loading.close()
        this.freightData = res.data.freight
        this.freightPartData = res.data.freight_part
      })
    }
  },
  components: {
    Freight,
    FreightPart
  }
}
</script>
