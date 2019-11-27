<template>
  <div class="my-goods-wrapper">
    <div class="goods-fitter-wrapper">
      <goods-fitter
        :shelfStatus="false"
        :tagProduct="true"
        :storePrice="true"
        @tabVender="handleGetGoodsList"
        @goodsFitter="handleGetGoodsList"
      ></goods-fitter>
    </div>
    <div class="goods-list-wrapper">
      <div class="goods-list">
        <el-row class="operate">
          <el-col :span="21" class="btn-group">
            <el-button type="primary" size="medium" icon="el-icon-plus" @click="handleToGoods">添加商品</el-button>
            <el-button type="primary" size="medium" @click="handleEditPrice">批量改价</el-button>
            <el-button type="primary" size="medium" @click="handleBatchGoods('off')">批量下架</el-button>
            <el-button type="primary" size="medium" @click="handleBatchGoods('up')">批量上架</el-button>
            <el-button type="primary" size="medium" @click="handleBatchGoods('remove')">批量移除</el-button>
            <el-button type="primary" size="medium" @click="batchAddTags">添加标签</el-button>
            <el-button type="primary" size="medium" @click="batchRemoveTags">移除标签</el-button>
            <!-- <el-button type="primary" size="medium" @click="bactchInterc">批量设置积分+现金</el-button> -->
            <el-button type="primary" size="medium">导出商品</el-button>
          </el-col>
          <el-col :span="3">
            <el-select @change="handleSortChange" v-model="sortValue" placeholder="请选择" size="medium">
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
          @selection-change="handleSelectionChange"
          stripe
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"/>
          <el-table-column width="100" label="商品图片">
            <template slot-scope="scope">
              <div class="image">
                <img :src="scope.row.image_url" alt>
                <img
                  class="tag"
                  v-if="scope.row.tagid && scope.row.tag_url"
                  :src="scope.row.tag_url"
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column width="130" label="商品名称">
            <template slot-scope="scope">
              {{scope.row.name}}
              <p class="theme">sku:{{scope.row.sku}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="third_party" label="商品来源"/>
          <el-table-column prop="market_price" label="市场价"/>
          <el-table-column prop="price" label="会员价"/>
          <el-table-column prop="store_price" label="分销价"/>
          <el-table-column prop="sales_price" label="销售价"/>
          <el-table-column prop="interc" label="积分+现金"/>
          <el-table-column prop="profit +%" label="利润率">
            <template slot-scope="scope">{{scope.row.profit}}%</template>
          </el-table-column>
          <el-table-column align="center" label="总库存">
            <template slot-scope="scope">
              <span class="theme">{{scope.row.stock}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="sales" label="总销量"/>
          <el-table-column align="center" prop="status" width="55" label="状态">
            <template slot-scope="scope">
              <span
                :class="Number(scope.row.status) === 1 ? 'theme': 'err'"
              >{{Number(scope.row.status) === 1 ? '上架': '下架'}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" width="130" align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEditGoodPrice(scope.row)">改价</el-button>
              <el-button type="text" size="small" @click="handleToggleGood(scope.row)">
                <span class="theme">{{Number(scope.row.status) === 1 ? '下架': '上架'}}</span>
              </el-button>
              <el-button type="text" size="small" @click="handleRemoveGood(scope.row)">移除</el-button>
              <!-- <el-button type="text" size="small" @click="handleEditIngerc">调整积分+现金</el-button> -->
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
    <!--pupop edit start-->
    <el-dialog title="改价" :visible.sync="dialogVisibleEditPrice" width="680px">
      <edit-price
        :pickArea="pickArea"
        :selecetNumber="selectGoods.length"
        :selecetAllNumber="goodsList.total_count"
        @cancle="dialogVisibleEditPrice = false"
        @primary="handleBatchChange"
      ></edit-price>
    </el-dialog>
    <!--pupop edit end-->
    <el-dialog title="批量修改" :visible.sync="dialogVisibleBatch">
      <div class="pick-group">
        <el-row class="pick-head">
          <el-col :span="3" class="pick-title">操作数量</el-col>
          <el-col :span="21" class="pick-tip">您可选择操作已选中商品或者多页</el-col>
        </el-row>
        <div class="group-content">
          <el-row class="pick-head">
            <el-col :span="3" class="tip-tit">挑选范围</el-col>
            <el-col :span="21">
              <el-radio v-model="pro_status_type" label="1">
                已勾选的商品
                <span class="text">(共{{selectGoods.length}}件商品)</span>
              </el-radio>
              <el-radio v-model="pro_status_type" label="2">前10页商品</el-radio>
            </el-col>
          </el-row>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleBatch = false">取 消</el-button>
        <el-button type="primary" @click="handlePrimaryBatch">确 定</el-button>
      </span>
    </el-dialog>
    <!--tags-->
    <el-dialog title="添加标签" width="590px" :visible.sync="dialogVisibleTags">
      <div class="tags-wrapper">
        <ul class="clearfix">
          <li
            v-for="tag in tagsList"
            @click="selectTag(tag.tagid)"
            :class="selectTagid == tag.tagid ? 'selected': ''"
            :key="tag.tagid"
          >
            <img :src="tag.image_url">
          </li>
        </ul>
        <div slot="footer" class="dialog-footer tags-footer">
          <el-button @click="dialogVisibleTags = false">取 消</el-button>
          <el-button type="primary" @click="handleBatchAddTags">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="批量设置积分+现金" width="680px" :visible.sync="dialogVisibleInterc">
      <el-row class="pick-head" v-show="IntercModeShow">
        <el-col :span="3" class="tip-tit">挑选范围</el-col>
        <el-col :span="21">
          <el-radio v-model="jfxj_pick_mode" label="1">
            已勾选的商品
            <span class="text">(共{{selectGoods.length}}件商品)</span>
          </el-radio>
          <el-radio v-model="jfxj_pick_mode" label="2">
            所有页
            <span class="text">(共{{goodsList.total_count}}件商品)</span>
          </el-radio>
        </el-col>
      </el-row>
      <div
        class="jfxj-tip"
        v-show="jfxj_pick_mode === '2'"
      >提示：修改所有页，耗费时间长，您需要等待本次改价处理完毕后，才可再次操作批量改价。改价结果可在“批量改价记录”中查看。</div>
      <div class="transfer-wrapper">
        <div class="el-transfer-panel">
          <p class="el-transfer-panel__header">模式选择</p>
          <div class="el-transfer-panel__body">
            <ul class="panel-wrapper">
              <li class="item" :class="setType === '1' ? 'active' : ''" @click="intercTab('1')">全现金</li>
              <li class="item" :class="setType === '2' ? 'active' : ''" @click="intercTab('2')">固定积分</li>
              <li
                class="item"
                :class="setType === '3' ? 'active' : ''"
                @click="intercTab('3')"
              >积分使用占比最低值</li>
              <li
                class="item"
                :class="setType === '4' ? 'active' : ''"
                @click="intercTab('4')"
              >积分使用占比最高值</li>
            </ul>
          </div>
        </div>
        <i class="el-icon-arrow-right"></i>
        <div class="el-transfer-panel store">
          <p class="el-transfer-panel__header">比例设定</p>
          <div class="el-transfer-panel__body">
            <div v-show="setType==='1'">
              <p class="jfxj-header">"全现金"模式无需设置比例</p>
              <div class="jfxj-box">
                <p class="tit">前端展示样式</p>
                <div class="image">
                  <img :src="require('@/common/images/finance/allcash.png')" alt>
                </div>
              </div>
              <el-checkbox class="btn" v-model="checked">隐藏商品纯积分价格</el-checkbox>
            </div>
            <div v-show="setType==='2'">
              <div class="jfxj-header">
                积分占商品价格的比例为
                <div class="input">
                  <el-input
                    clear="input"
                    v-model="fixedNum"
                    size="small"
                    type="number"
                    min="0"
                    max="100"
                  ></el-input>
                </div>%
              </div>
              <div class="jfxj-box">
                <p class="tit">前端展示样式</p>
                <div class="image">
                  <img :src="require('@/common/images/finance/allcash.png')" alt>
                </div>
              </div>
              <el-checkbox class="btn" v-model="checked">隐藏商品纯积分价格</el-checkbox>
            </div>
            <div v-show="setType==='3'">
              <div class="jfxj-header">
                积分占商品价格最低比例为
                <div class="input">
                  <el-input
                    clear="input"
                    v-model="minNum"
                    size="small"
                    type="number"
                    min="0"
                    max="100"
                  ></el-input>
                </div>%
              </div>
              <div class="jfxj-box">
                <p class="tit">前端展示样式</p>
                <div class="image">
                  <img :src="require('@/common/images/finance/min.png')" alt>
                </div>
              </div>
              <el-checkbox class="btn" v-model="checked">隐藏商品纯积分价格</el-checkbox>
            </div>
            <div v-show="setType==='4'">
              <div class="jfxj-header">
                积分占商品价格最高比例为
                <div class="input">
                  <el-input
                    clear="input"
                    v-model="maxNum"
                    size="small"
                    type="number"
                    min="0"
                    max="100"
                  ></el-input>
                </div>%
              </div>
              <div class="jfxj-box">
                <p class="tit">前端展示样式</p>
                <div class="image">
                  <img :src="require('@/common/images/finance/max.png')" alt>
                </div>
              </div>
              <el-checkbox class="btn" v-model="checked">隐藏商品纯积分价格</el-checkbox>
            </div>
          </div>
        </div>
      </div>
      <div class="dialog-footer">
        <el-button @click="dialogVisibleInterc = false">取 消</el-button>
        <el-button type="primary" @click="handlesubmitInterc">确 定</el-button>
      </div>
    </el-dialog>
    <!---->
  </div>
</template>

<script>
import GoodsFitter from '@/components/goodsFitter/index'
import { getGoodsList, priceBatchChange, goodsBatchOff, getTagsList, goodsBatchAddTags, goodsBatchRemoveTags } from '@/api/mallapp/goods/goodsMy'
import EditPrice from './editPrice'

export default {
  name: 'MgoodsMy',
  data () {
    return {
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
      form: {},
      sortValue: 1,
      goodsList: {
        page_size: 20,
        current_page: 1,
        total_count: 0
      },
      selectGoods: [],
      selectGood: '',
      dialogVisibleEditPrice: false,
      pickArea: true,
      dialogVisibleBatch: false,
      batchStatus: 'off', // off 批量下架 up 批量上架 remove 批量移除
      pro_status_type: '1', // 1已勾选的商品， 2 前十页选中
      dialogVisibleTags: false,
      tagsList: [],
      selectTagid: '',
      dialogVisibleInterc: false,
      jfxj_pick_mode: '1', // 积分现金模式： 1.已勾选商品， 2.所有页
      setType: '1',
      integral_show: false,
      fixedNum: null,
      minNum: null,
      maxNum: null,
      IntercModeShow: false

    }
  },
  created () {
    this._getGoodsList()
    getTagsList().then(res => {
      this.tagsList = res.data
    })
  },
  methods: {
    handleGetGoodsList (data) {
      this.form = data
      this._getGoodsList()
    },
    handleSortChange () {
      this._getGoodsList()
    },
    handleSelectionChange (data) {
      let ret = []
      data.map(item => {
        ret.push(item.sku)
      })
      this.selectGoods = ret
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
    handleToGoods () {
      this.$router.push('/mgoods/add')
    },
    handleEditPrice () {
      this.dialogVisibleEditPrice = true
      this.pickArea = true
    },
    handleEditGoodPrice (good) {
      this.pickArea = false
      this.dialogVisibleEditPrice = true
      this.selectGood = good.sku
    },
    handleBatchChange (formEdit) {
      let data = {}
      if (this.pickArea) { // 批量选择
        // val.pick_mode === '1' 已勾选的商品 '2' 前所有页商品
        if (formEdit.pick_mode === '1') {
          if (this.selectGoods.length > 0) {
            data.form_edit_price = formEdit
            data.goods_id = this.selectGoods.join(',')
            this._priceBatchChange(data)
          } else {
            this.$message({
              message: '您还未选择商品',
              type: 'warning'
            })
          }
        } else {
          data.form_edit_price = formEdit
          data.form = this.form
          this._priceBatchChange(data)
        }
      } else { // 单个挑选
        data.form_edit_price = formEdit
        data.form_edit_price.pick_mode = '1'
        data.goods_id = this.selectGood
        this._priceBatchChange(data)
      }
    },
    // 批量操作
    handleBatchGoods (val) {
      this.dialogVisibleBatch = true
      this.batchStatus = val
    },
    // 批量提交
    handlePrimaryBatch () {
      let data = {}
      data.pro_status_type = this.pro_status_type
      if (this.pro_status_type === '1') {
        if (this.selectGoods.length === 0) {
          this.$message({
            message: '您还未选择商品',
            type: 'warning'
          })
          return
        }
        data.goods_id = this.selectGoods.join(',')
      } else {
        data.form = this.form
      }
      switch (this.batchStatus) {
        case 'off':
          this._goodsBatchOff(data)
          break
        case 'up':
          this._goodsBatchUp(data)
          break
        case 'remove':
          this._goodsBatchRemove(data)
          break
      }
    },
    // 单个商品移除
    handleRemoveGood (good) {
      let data = {}
      data.goods_id = good.sku
      this.$confirm('商品移除后，将从商城下架，商品将回到集市中。', '确定移除？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let loading = this.$loading({
          background: 'rgba(255,255,255,0.1)',
          text: '正在加载，请稍后...'
        })
        this._goodsBatchRemove(data).then(res => {
          loading.close()
          this.$message({
            message: '商品移除成功',
            type: 'success'
          })
          this._getGoodsList()
        })
      }).catch(() => {
      })
    },
    // 单个商品上下架
    handleToggleGood (good) {
      let data = {}
      data.goods_id = good.sku
      if (Number(good.status) === 1) {
        this._goodsBatchOff(data)
      } else {
        this._goodsBatchUp(data)
      }
    },
    // 选择标签
    selectTag (tagid) {
      this.selectTagid = tagid
    },
    // 添加标签
    batchAddTags () {
      if (this.selectGoods.length === 0) {
        this.$message({
          message: '您还未选择商品',
          type: 'warning'
        })
        return
      }
      this.dialogVisibleTags = true
    },
    // 移除标签
    batchRemoveTags () {
      if (this.selectGoods.length === 0) {
        this.$message({
          message: '您还未选择商品',
          type: 'warning'
        })
        return
      }

      this.$confirm('移除后，商品图片将不再显示标签。', '确定移除标签？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {}
        data.goods_id = this.selectGoods.join(',')
        let loading = this.$loading({
          background: 'rgba(255,255,255,0.1)',
          text: '正在加载，请稍后...'
        })
        goodsBatchRemoveTags(data).then(res => {
          loading.close()
          this.$message({
            message: '移除标签成功',
            type: 'success'
          })
          this._getGoodsList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消移除'
        })
      })
    },
    handleBatchAddTags () {
      if (!this.selectTagid) {
        this.$message({
          message: '请选择标签',
          type: 'warning'
        })
        return
      }
      let data = {}
      data.goods_id = this.selectGoods.join(',')
      data.tagid = this.selectTagid
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '正在添加，请稍后...'
      })
      goodsBatchAddTags(data).then(res => {
        this.dialogVisibleTags = false
        loading.close()
        this.$message({
          message: '添加标签成功',
          type: 'success'
        })
        this._getGoodsList()
      })
    },
    // 批量积分+现金
    bactchInterc () {
      this.IntercModeShow = true
      this.dialogVisibleInterc = true
    },
    // 提交批量积分+现金
    handlesubmitInterc () {
      this.dialogVisibleInterc = false
    },
    // 单个积分 + 现金编辑
    handleEditIngerc () {
      this.IntercModeShow = false
      this.dialogVisibleInterc = true
    },
    intercTab (val) {
      this.setType = val
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
    _priceBatchChange (data) {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      priceBatchChange(data).then(res => {
        this.dialogVisibleEditPrice = false
        loading.close()
        this.$message({
          message: '改价成功',
          type: 'success'
        })
        this._getGoodsList()
      })
    },
    _goodsBatchOff (data) {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      goodsBatchOff(data).then(res => {
        this.dialogVisibleBatch = false
        loading.close()
        this.$message({
          message: '下架成功',
          type: 'success'
        })
        this._getGoodsList()
      })
    },
    _goodsBatchUp (data) {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      goodsBatchOff(data).then(res => {
        this.dialogVisibleBatch = false
        loading.close()
        this.$message({
          message: '上架成功',
          type: 'success'
        })
        this._getGoodsList()
      })
    },
    _goodsBatchRemove (data) {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      goodsBatchOff(data).then(res => {
        this.dialogVisibleBatch = false
        loading.close()
        this.$message({
          message: '移除成功',
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
@import "@/common/scss/variable.scss";
.theme {
  color: $themeColor;
}
.err {
  color: #f56c6c;
}
.btn-group {
  .el-button {
    margin-bottom: 10px;
  }
}
.my-goods-wrapper {
  margin: 20px;
  .image {
    position: relative;
    width: 100px;
    height: 100px;
    font-size: 0;
    line-height: 100px;
    text-align: center;
    img {
      width: 100px;
      height: 100px;
      vertical-align: middle;
    }
    .tag {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
}
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
.text {
  color: #999;
}
.pick-group {
  line-height: 30px;
  margin-bottom: 20px;
}
.pick-head {
  margin-bottom: 20px;
}
.tip-tit {
  color: #fff;
}
.tags-wrapper {
  li {
    width: 100px;
    height: 100px;
    float: left;
    margin: 5px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .selected {
    box-sizing: border-box;
    border: 2px solid $themeColor;
  }
  .tags-footer {
    margin-right: 5px;
    margin-top: 20px;
    text-align: right;
  }
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
    background: #c6e2ff;
    color: #fff;
  }
}
.el-icon-arrow-right {
  margin: 0 20px;
}
.store {
  width: 370px;
  .btn {
    margin-left: 20px;
  }
  .input {
    width: 100px;
    margin: 0 5px;
    display: inline-block;
  }
}
.dialog-footer {
  margin-top: 20px;
  text-align: right;
}
.jfxj-tip {
  margin: 20px;
  font-size: 12px;
  color: #999;
}
.jfxj-header {
  text-align: center;
  margin: 10px 0;
}
.jfxj-box {
  padding: 10px;
  margin: 10px 20px;
  background: #c6e2ff;
  .image {
    width: 100%;
    height: auto;
    line-height: 1;
    img {
      width: 100%;
      height: auto;
      line-height: 1;
    }
  }
  .tit {
    padding-bottom: 10px;
    text-align: center;
  }
}
</style>
