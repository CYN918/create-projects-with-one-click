<template>
  <div>
    <goods-filter class="mbottom" @tabVender="handleGetGoodsList" @goodsFitter="handleGetGoodsList"></goods-filter>
    <div class="table-wrapper">
      <el-table :data="tableData" @selection-change="handleSelectionChange" stripe>
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="商品图片" align="center" width="100">
          <template slot-scope="scope">
            <img :src="scope.row.image_url" width="60" height="60" alt>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" width="350"></el-table-column>
        <el-table-column prop="third_party" label="商品来源"></el-table-column>
        <el-table-column prop="price" label="会员价"></el-table-column>
        <el-table-column prop="store_price" label="分销价"></el-table-column>
        <el-table-column prop="sales_price" label="销售价"></el-table-column>
        <el-table-column prop="market_price" label="市场价"></el-table-column>
        <el-table-column prop="profit" label="利润率">
          <template slot-scope="scope">{{scope.row.profit}}%</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.current_page"
        :page-size="pagination.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total_count"
      ></el-pagination>
    </div>
    <div class="footer">
      <span class="total">
        已挑选
        <span class="number">{{selectGoods.length}}</span>件商品
      </span>
      <span>
        <el-button type="primary" plain size="medium" @click="cancle">取消</el-button>
        <el-button type="primary" size="medium" @click="select">确定挑选</el-button>
      </span>
    </div>
  </div>
</template>

<script>
import GoodsFilter from '@/components/goodsFitter/index'
import { getGoodsList } from '@/api/mallapp/goods/goodsMy'
import { tableMix } from '@/common/js/mixinTable'
export default {
  mixins: [tableMix],
  data () {
    return {
      form: {},
      tableData: [],
      selectGoods: []
    }
  },
  methods: {
    handleGetGoodsList (data) {
      this.form = data || {}
      this.tableSubmitData.form = this.form
      this._getTableData()
    },
    getTableData () {
      return getGoodsList(this.tableSubmitData)
    },
    handleSelectionChange (data) {
      this.selectGoods = data
    },
    cancle () {
      this.$emit('cancle')
    },
    select () {
      this.$emit('selectGoods', this.selectGoods)
    }
  },
  components: {
    GoodsFilter
  }
}
</script>

<style lang='scss' scoped>
.table-wrapper {
  height: 350px;
  overflow: auto;
}
.pagination {
  margin: 20px 0;
  text-align: right;
}
.footer {
  text-align: right;
  .total {
    margin-right: 10px;
  }
  .number {
    color: #fd0000;
  }
}
</style>
