<template>
  <div class="addgoods-wrapper">
    <div class="goods-fitter-wrapper">
      <goods-fitter
        :shelfStatus="true"
        :tagProduct="false"
        @tabVender="handleGetGoodsList"
        @goodsFitter="handleGetGoodsList"></goods-fitter>
    </div>
     <!--goodslist start-->
    <div class="goods-list-wrapper">
      <div class="goods-list">
        <el-row class="operate">
          <el-col :span="21">
            <el-button type="primary" @click="handleBatchSelect">批量挑选</el-button>
          </el-col>
          <el-col :span="3">
            <el-select
              @change="handleSortChange"
              v-model="sortValue"
              placeholder="请选择">
              <el-option
                v-for="item in sortList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-table
          :data="goodsList.list"
          @selection-change="handleSelectionChange"
          stripe
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55"/>
          <el-table-column
            prop="sku"
            label="sku"
            width="85"/>
          <el-table-column
            label="商品图片">
            <template slot-scope="scope">
              <div class="image">
                <img :src="scope.row.image_url" alt="">
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品名称"/>
          <el-table-column
            prop="market_price"
            label="市场价"/>
          <el-table-column
            prop="price"
            label="会员价"/>
          <el-table-column
            prop="profit +%"
            label="利润率">
            <template slot-scope="scope">
              {{scope.row.profit}}%
            </template>
          </el-table-column>
          <el-table-column
            prop="stock"
            label="总库存"/>
          <el-table-column
            prop="sales"
            label="总销量"/>
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleSelectClick(scope.row)" type="text" size="small">
                <span :class="Number(scope.row.shelf_status) === 1 ? 'text': ''">{{Number(scope.row.shelf_status) === 1 ? '已挑选': '挑选'}}</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagenation">
          <el-pagination
           background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
            :current-page="goodsList.current_page"
            :page-size="goodsList.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="goodsList.total_count">
          </el-pagination>
        </div>
      </div>
    </div>
     <!--goodslist end-->
     <!--pupop edit start-->
    <el-dialog
      title="挑选商品"
      :visible.sync="dialogVisible"
      width="680px">
      <edit-price
        :pickArea="pickArea"
        @cancle="dialogVisible = false"
        @primary="handleAddToMyGoods"></edit-price>
    </el-dialog>
      <!--pupop edit end-->
  </div>
</template>

<script>
import { getGoodsList, addToMyGoods } from '@/api/mallapp/goods/goodsAdd'
import GoodsFitter from '@/components/goodsFitter/index'
import EditPrice from '@/components/goodsEditPrice/index'
export default {
  name: 'MgoodsAdd',
  created () {
    this._getGoodsList()
  },
  data () {
    return {
      form: {},
      sortList: [{
        value: 1,
        label: '按时间倒序'
      }, {
        value: 2,
        label: '按利润率从大到小'
      }, {
        value: 3,
        label: '按会员价从小到大'
      }, {
        value: 4,
        label: '按会员价从大到小'
      }],
      sortValue: 1,
      goodsList: {
        page_size: 20,
        current_page: 1
      },
      selectGoods: [],
      selectGood: '',
      dialogVisible: false,
      pickArea: true
    }
  },
  methods: {
    handleGetGoodsList (data) {
      this.form = data
      this._getGoodsList()
    },
    handleBatchSelect () {
      this.pickArea = true
      this.dialogVisible = true
    },
    handleSelectClick (good) {
      if (Number(good.shelf_status) === 1) {
        return
      }
      this.pickArea = false
      this.dialogVisible = true
      this.selectGood = good.sku
    },
    handleAddToMyGoods (val) {
      let data = {}
      if (this.pickArea) { // 批量选择
        // val.pick_mode === '1' 已勾选的商品 '2' 前十页商品
        if (val.pick_mode === '1') {
          if (this.selectGoods.length > 0) {
            data.form_edit_price = val
            data.goods_id = this.selectGoods.join(',')
            this._addToMyGoods(data)
          } else {
            this.$message({
              message: '您还未选择商品',
              type: 'warning'
            })
          }
        } else {
          data.form_edit_price = val
          data.form = this.form
          this._addToMyGoods(data)
        }
      } else { // 单个挑选
        data.form_edit_price = val
        data.form_edit_price.pick_mode = '1'
        data.goods_id = this.selectGood
        this._addToMyGoods(data)
      }
    },
    handleSelectionChange (data) {
      let ret = []
      data.map(item => {
        ret.push(item.sku)
      })
      this.selectGoods = ret
    },
    handleSortChange () {
      this._getGoodsList()
    },
    handleSizeChange (val) {
      let data = {}
      data.page_size = val
      this._getGoodsList(data)
    },
    handleCurrentChange (val) {
      let data = {}
      data.current_page = val
      this._getGoodsList(data)
    },
    _getGoodsList (val) {
      let objval = val || {}
      let obj = {}
      obj.current_page = this.goodsList.current_page
      obj.page_size = this.goodsList.page_size
      obj.form = this.form
      let data = Object.assign(obj, objval, {
        sort: this.sortValue
      })
      // let loading = this.$loading({
      //   background: 'rgba(255,255,255,0.1)',
      //   text: '加载中，请稍后...'
      // })
      getGoodsList(data).then(res => {
        this.goodsList = res.data
        loading.close()
      })
    },
    _addToMyGoods (data) {
      // let loading = this.$loading({
      //   background: 'rgba(255,255,255,0.1)',
      //   text: '加载中，请稍后...'
      // })
      addToMyGoods(data).then(res => {
        this.dialogVisible = false
        loading.close()
        this.$message({
          message: '挑选成功',
          type: 'success'
        })
        this._getGoodsList()
      })
    }
  },
  components: {
    GoodsFitter,
    EditPrice
  }
}
</script>

<style lang="scss" scoped>
  .addgoods-wrapper {
    margin: 20px;
    .goods-list {
      .image {
        width: 100px;
        height: 100px;
        font-size: 0;
        line-height: 100px;
        text-align: center;
        img {
          max-width: 100px;
          max-height: 100px;
          vertical-align: middle;
        }
      }
    }
    .text {
      color: #e6a23c;
      cursor: pointer;
    }
  }
</style>
