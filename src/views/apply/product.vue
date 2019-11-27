<template>
  <div>
    <el-form :model="form" ref="form" size="small" :inline="true">
      <el-form-item label="会员价:" prop="member_price_min">
        <el-input v-model="form.member_price_min"></el-input>
      </el-form-item>
      <span class="line">-</span>
      <el-form-item prop="member_price_max">
        <el-input v-model="form.member_price_max"></el-input>
      </el-form-item>
      <el-form-item label="利润:" prop="rate_min">
        <el-input v-model="form.rate_min"></el-input>
      </el-form-item>
      <span class="line">-</span>
      <el-form-item prop="rate_max">
        <el-input v-model="form.rate_max"></el-input>
      </el-form-item>
      <el-form-item prop="keyword">
        <el-input v-model="form.keyword" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" stripe>
      <el-table-column label="商品名称">
        <template slot-scope="scope">
          <div class="image">
            <img :src="scope.row.image_url" width="80" height="80">
          </div>
          <p class="title">{{scope.row.name}}</p>
        </template>
      </el-table-column>
      <el-table-column label="成本价" align="center" width="100">
        <template slot-scope="scope">￥{{scope.row.member_price}}</template>
      </el-table-column>
      <el-table-column label="分销价" align="center" width="100">
        <template slot-scope="scope">￥{{scope.row.sale_price}}</template>
      </el-table-column>
      <el-table-column label="销售价" prop="total" align="center" width="100">
        <template slot-scope="scope">￥{{scope.row.price}}</template>
      </el-table-column>
      <el-table-column label="市场价" align="center" width="100">
        <template slot-scope="scope">￥{{scope.row.market_price}}</template>
      </el-table-column>
      <el-table-column label="利润" align="center" width="100">
        <template slot-scope="scope">{{scope.row.rate}}%</template>
      </el-table-column>
    </el-table>
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
  </div>
</template>

<script>
import { tableMix } from '@/common/js/mixinTable'
import { getStoreGoods } from '@/api/apply/index'

export default {
  mixins: [tableMix],
  props: {
    storeId: {
      type: String
    }
  },
  data () {
    return {
      // tableData: [{
      //   market_price: '379.00', // 市场价
      //   member_price: '118.80', // 成本价（会员价）
      //   image_url: 'http://img10.360buyimg.com/n1/jfs/t2728/289/4063380720/319903/60e17d96/57a85097Na589331b.jpg', // 商品图片
      //   price: '379.00', // 销售价
      //   rate: '68.65', // 利润率
      //   sale_price: '118.80', // 分销价
      //   good_id: '28359', // 商品id
      //   name: '【京东超市】LOVO 罗莱公司出品 泰国进口婴儿呵护乳胶枕' // 商品名称
      // }],
      form: {
        member_price_min: '', // 成本价最低
        member_price_max: '', // 成本价最高
        rate_min: '', // 利润率最低
        rate_max: '', // 利润率最高
        keyword: '' // 商品名称
      }

    }
  },
  methods: {
    getTableData () {
      let data = this.tableSubmitData
      data.form = this.form
      data.form.store_id = this.storeId
      return getStoreGoods(data)
    },
    submitForm (formName) {
      this._getTableData()
    }
  },
  watch: {
    storeId () {
      this.$refs.form.resetFields()
      this._getTableData()
    }
  }
}
</script>

<style lang='scss' scoped>
.pagination {
  margin-top: 20px;
  text-align: right;
}
.image {
  width: 80px;
  height: 80px;
  margin-right: 10px;
  display: inline-block;
  vertical-align: middle;
}
.title {
  display: inline-block;
  width: 450px;
  vertical-align: middle;
}
.line {
  line-height: 30px;
  margin-right: 12px;
}
</style>
