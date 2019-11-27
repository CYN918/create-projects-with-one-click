<template>
  <div class="margin">
    <goods-fitter @tabVender="handleGetGoodsList" @goodsFitter="handleGetGoodsList"></goods-fitter>
    <!--goodslist start-->
    <div class="goods-list-wrapper">
      <div class="goods-list">
        <el-row class="operate">
          <el-col :span="21">
            <el-button type="primary" @click="handleBatchSelect">批量挑选</el-button>
          </el-col>
          <el-col :span="3">
            <el-select @change="handleSortChange" v-model="sortValue" placeholder="请选择">
              <el-option
                v-for="item in sortList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-table
          :data="goodsList.list"
          border
          @selection-change="handleSelectionChange"
          stripe
          style="width: 100%">
          <el-table-column type="selection" align="center" width="55"/>
          <el-table-column label="商品图片" align="center">
            <template slot-scope="scope">
              <div class="image" @click="handleToGoodsInfo">
                <img :src="scope.row.image_url" alt>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" align="center">
            <template slot-scope="scope">
             <p class="item-name" @click="handleToGoodsInfo">{{scope.row.name}}</p>
             <span>skuId:{{scope.row.sku}}</span>
             <el-button type="text" @click="btnComparePrice(scope.row.sku)">一键比价 直达京东</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="market_price" align="center" label="市场价"/>
          <el-table-column prop="price" align="center" label="会员价"/>
          <el-table-column prop="profit +%" align="center" label="利润率">
            <template slot-scope="scope">{{scope.row.profit}}%</template>
          </el-table-column>
          <el-table-column prop="stock" align="center" label="总库存"/>
          <el-table-column prop="sales" align="center" label="总销量"/>
          <el-table-column align="center" fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleSelectClick(scope.row)" type="text" size="small">挑选</el-button>
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
            :total="goodsList.total_count"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!--goodslist end-->
    <!--pupop select start-->
    <el-dialog title="选择站点"
      :visible.sync="dialogSelectVisible"
      width="680px">
      <div class="transfer-wrapper">
        <div class="el-transfer-panel">
          <p class="el-transfer-panel__header">选择应用类型</p>
          <div class="el-transfer-panel__body">
            <ul class="panel-wrapper">
              <li
                v-for="item in application"
                @click="tabApp(item.id)"
                :key="item.id"
                :class="currentAppId === item.id ? 'active' : ''"
                class="item">{{item.name}}</li>
            </ul>
          </div>
        </div>
        <i class="el-icon-arrow-right"></i>
        <div class="el-transfer-panel store">
          <p class="el-transfer-panel__header">点击选择一个站点</p>
          <div class="el-transfer-panel__body">
            <ul class="panel-wrapper">
              <li
                v-for="item in storeList"
                @click="selectStore(item.store_id)"
                :key="item.store_id"
                :class="currentStoreId === item.store_id ? 'active' : ''"
                class="item">
                <p>{{item.store_name}}</p>
                <p :class="item.state === '1' ? '' : 'red'">（{{item.state === "1" ? '已上线' : '未上线'}}）</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="dialog-footer">
        <el-button @click="dialogSelectVisible = false">取 消</el-button>
        <el-button type="primary" @click="btnToPricePrimary">确 定</el-button>
      </div>
    </el-dialog>
    <!--pupop select end-->
    <!--pupop edit start-->
    <el-dialog
      title="改价"
      :visible.sync="dialogVisible"
      width="680px">
      <edit-price
        :pickArea="pickArea"
        cancleText="重新选择站点"
        @cancle="handleCancle"
        @primary="handleAddToStore"></edit-price>
    </el-dialog>
    <!--pupop edit end-->
    <!--pupop edit start-->
    <el-dialog
      title="商品详情"
      :visible.sync="dialogInfoVisible"
      width="900px">
      待开发
    </el-dialog>
    <!--pupop edit end-->
  </div>
</template>

<script>
import GoodsFitter from '@/components/goodsFitter/index'
import { getGoodsList, addToMyStore } from '@/api/market/index'
import { getStoreList } from '@/api/public'
import EditPrice from '@/components/goodsEditPrice/index'
export default {
  name: 'Market',
  data () {
    return {
      form: {},
      sortList: [
        {
          value: 1,
          label: '按时间倒序'
        },
        {
          value: 2,
          label: '按利润率从大到小'
        },
        {
          value: 3,
          label: '按会员价从小到大'
        },
        {
          value: 4,
          label: '按会员价从大到小'
        }
      ],
      sortValue: 1,
      goodsList: {
        page_size: 20,
        current_page: 1
      },
      selectGoods: [],
      selectGood: '',
      dialogSelectVisible: false,
      application: [{
        id: 1,
        name: '积分商城'
      }, {
        id: 2,
        name: '员工福利系统'
      }, {
        id: 3,
        name: '集采商城'
      }, {
        id: 4,
        name: '礼品卡券'
      }],
      currentAppId: 1,
      storeList: [{
        state: '1', // 状态： 1 已上线， 2 未上线
        store_id: '1001433', // 站点id
        store_name: '招商银行礼遇商城' // 站点名称
      }],
      currentStoreId: '',
      dialogVisible: false,
      pickArea: true,
      dialogInfoVisible: false
    }
  },
  created () {
    this._getGoodsList()
    this._getStoreList(this.currentAppId)
  },
  methods: {
    handleGetGoodsList (data) {
      this.form = data
      this._getGoodsList()
    },
    handleSelectionChange (data) {
      let ret = []
      data.map(item => {
        ret.push(item.sku)
      })
      this.selectGoods = ret
    },
    handleBatchSelect () {
      let data = {}
      this.pickArea = true
      if (this.selectGoods.length > 0) {
        this.dialogSelectVisible = true
        data.goods_id = this.selectGoods.join(',')
      } else {
        this.$message({
          message: '您还未选择商品',
          type: 'warning'
        })
      }
    },
    handleSelectClick (good) {
      this.pickArea = false
      this.dialogSelectVisible = true
      this.selectGood = good.sku
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
    btnComparePrice (id) {
      window.open(`https://item.jd.com/${id}.html`, '_blank')
    },
    tabApp (id) {
      if (this.currentAppId === id) {
        return
      }
      this.currentAppId = id
      this.currentStoreId = ''
      this._getStoreList(id)
    },
    selectStore (id) {
      this.currentStoreId = id
    },
    btnToPricePrimary () {
      if (this.currentStoreId === '') {
        this.$message({
          message: '请选择一个站点',
          type: 'warning'
        })
      } else {
        this.dialogSelectVisible = false
        this.dialogVisible = true
      }
    },
    handleCancle () {
      this.dialogVisible = false
      this.dialogSelectVisible = true
    },
    handleAddToStore (val) {
      let data = {}
      data.store_id = this.currentStoreId
      if (this.pickArea) { // 批量选择
        // val.pick_mode === '1' 已勾选的商品 '2' 前十页商品
        if (val.pick_mode === '1') {
          data.form_edit_price = val
          data.goods_id = this.selectGoods.join(',')
          this._addToMyStore(data)
        } else {
          data.form_edit_price = val
          data.form = this.form
          this._addToMyStore(data)
        }
      } else { // 单个挑选
        data.form_edit_price = val
        data.form_edit_price.pick_mode = '1'
        data.goods_id = this.selectGood
        this._addToMyStore(data)
      }
    },
    handleToGoodsInfo () {
      this.dialogInfoVisible = true
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
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getGoodsList(data).then(res => {
        this.goodsList = res.data
        loading.close()
      })
    },
    _getStoreList (id) {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getStoreList(id).then(res => {
        loading.close()
        this.storeList = res.data
      })
    },
    _addToMyStore (data) {
      console.log(data)
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      addToMyStore(data).then(() => {
        this.dialogVisible = false
        loading.close()
        this.$message({
          message: '改价成功',
          type: 'success'
        })
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
@import '@/common/scss/variable.scss';
  .goods-list-wrapper {
    margin-top: 20px;
  }
  .el-transfer-panel__header {
    background: $themeColor;
    color: #fff;
  }
  .item {
    line-height: 1.5;
    padding: 8px 10px;
    cursor: pointer;
    &:hover {
      color: $themeColor;
    }
    &.active {
      background: #c6e2ff;;
      color: #fff;
    }
  }
  .image {
    cursor: pointer;
  }
  .item-name {
    cursor: pointer;
    &:hover {
      color: $themeColor;
    }
  }
  .el-icon-arrow-right {
    margin:  0 20px;
  }
  .store {
    width: 310px;
  }
  .red {
    color: $themeSubColor;
  }
  .transfer-wrapper {
    text-align: center;
  }
  .panel-wrapper {
    text-align: left;
    margin: 0;
    padding: 6px 0;
    list-style: none;
    height: 246px;
    overflow: auto;
    box-sizing: border-box;
  }
  .dialog-footer {
    margin-top: 20px;
    text-align: right;
  }
</style>
