<template>
  <!--选择商品-->
  <el-dialog
      id="addProduct"
      title="选择商品"
      :visible.sync="dialogVisible6"
      width="1220px">
      <el-tabs type="border-card" v-model="activeName" style="margin-bottom: 20px">
        <el-tab-pane name="0" :lazy="true">
          <span slot="label"><i><img  src="@/common/images/activity/all.png" alt=""></i> 全部商品</span>
          <InquirePro :activeName="activeName" v-if="activeName === '0'" :pageSize="pageSize" :pageIndex="pageIndex" @changePageIndex="changePageIndex"></InquirePro>
        </el-tab-pane>
        <el-tab-pane name="4" :lazy="true">
          <span slot="label"><i><img  src="@/common/images/activity/icon_yjdf.png" alt=""></i> 一件代发</span>
          <InquirePro :activeName="activeName" v-if="activeName === '4'" :pageSize="pageSize" :pageIndex="pageIndex" @changePageIndex="changePageIndex"></InquirePro>
        </el-tab-pane>
        <el-tab-pane name="5" :lazy="true">
          <span slot="label"><i><img  src="@/common/images/activity/icon_jc.png" alt=""></i> 集采商品</span>
          <InquirePro :activeName="activeName" v-if="activeName === '5'" :pageSize="pageSize" :pageIndex="pageIndex" @changePageIndex="changePageIndex"></InquirePro>
        </el-tab-pane>
        <el-tab-pane name="1" :lazy="true">
          <span slot="label"><i><img  src="@/common/images/activity/icon_jd.png" alt=""></i> 京东商品</span>
          <InquirePro :activeName="activeName" v-if="activeName === '1'" :pageSize="pageSize" :pageIndex="pageIndex" @changePageIndex="changePageIndex"></InquirePro>
        </el-tab-pane>
        <el-tab-pane name="2" :lazy="true">
          <span slot="label"><i><img  src="@/common/images/activity/icon_sn.png" alt=""></i> 苏宁商品</span>
          <InquirePro :activeName="activeName" v-if="activeName === '2'" :pageSize="pageSize" :pageIndex="pageIndex" @changePageIndex="changePageIndex"></InquirePro>
        </el-tab-pane>
        <el-tab-pane name="3" :lazy="true">
          <span slot="label"><i><img  src="@/common/images/activity/icon_yx.png" alt=""></i> 网易严选</span>
          <InquirePro :activeName="activeName" v-if="activeName === '3'" :pageSize="pageSize" :pageIndex="pageIndex" @changePageIndex="changePageIndex"></InquirePro>
        </el-tab-pane>
      </el-tabs>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="white"
        :data="tableData"
        stripe
        style="width: 100%;  margin-bottom: 20px"
        border
        ref="elTable"
        class="goods_index"
        @select="handleSingleSelect"
        @select-all="handleAllSelect"
        @selection-change="selectionChange">
        <el-table-column type="selection" align="center" width="55"></el-table-column>
        <el-table-column type="index" label="编号" width="55" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品图片" align="center" width="200">
          <template slot-scope="scope">
            <i><img style="width: 102px; height: 102px" :src="scope.row.goodsThumbnailImgUrl" alt=""></i>
          </template>
        </el-table-column>
        <el-table-column label="来源/状态" align="center" width="200">
          <template slot-scope="scope">
            <div style="text-align: left">
              <p style="margin-bottom: 20px">来源：{{scope.row.goodsType}}</p>
              <p style="margin-bottom: 20px">排序：{{scope.row.sortOrder}}</p>
              <p>更新：{{scope.row.updateTime}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品信息" align="center" width="200">
          <template slot-scope="scope">
            <div style="text-align: left">
              <p style="margin-bottom: 20px">{{scope.row.goodsName}}</p>
              <p style="margin-bottom: 20px">货号：{{scope.row.goodsSn}}</p>
              <p style="margin-bottom: 20px">型号：{{scope.row.modelNumber}}</p>
              <p>品牌：{{scope.row.brandName}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="价格信息" align="center" width="200">
          <template slot-scope="scope">
            <div style="text-align: left">
              <p style="margin-bottom: 20px">税率：{{scope.row.skuInfo[0].priceInfo.taxRate}}</p>
              <p style="margin-bottom: 20px">京东价：{{scope.row.skuInfo[0].priceInfo.jdPrice}}</p>
              <p style="margin-bottom: 20px">商城价：{{scope.row.skuInfo[0].priceInfo.goodsPrice}}</p>
              <p style="margin-bottom: 20px">市场价：{{scope.row.skuInfo[0].priceInfo.marketPrice}}</p>
              <p style="">结算价：{{scope.row.skuInfo[0].priceInfo.costPrice}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="库存" align="center">
          <template slot-scope="scope">
            <p style="margin-bottom: 20px"><span style="color: #F76C6E;font-weight: bold">{{scope.row.skuInfo[0].goodsNumber}}</span>个</p>
            <p>库存预警：{{scope.row.skuInfo[0].warnNumber}}个</p>
          </template>
        </el-table-column>
      </el-table>
      <div class="pages" style="text-align: right">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="proPageInfo.pageIndex"
          :page-sizes="[10, 20 , 30]"
          :page-size="proPageInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer" style="display: inherit;text-align: left!important;">
        <span style="color:rgba(96,98,102,1);margin-right: 40px;">已经选择<span style="color:#4A99FA;font-weight: bold ">{{this.selectedPro.length}}</span>件商品</span>
        <button style="margin-right: 20px; width:96px;height:36px;background:rgba(74,153,250,1);border-radius:4px;font-size: 16px;color:#fff; cursor: pointer" @click="confirmChoosePro">确定挑选</button>
        <button style="width:96px;height:36px;background:rgba(74,153,250,1);border-radius:4px;font-size: 16px;color:#fff; cursor: pointer" @click="dialogVisible6 = false">取消</button>
      </span>
    </el-dialog>
  <!--添加商品-->
</template>

<script>
import { mapActions } from 'vuex'
import PubSub from 'pubsub-js'
import { SHOW_ADD_PRO_DIALOG_1, SEARCH_PRODUCT_2 } from '@/utils/pubsubEvent'
import { reqActivityPro, addActivityPro } from '@/api/activity/index'
import { throttleTipPop } from '@/utils/throttle'
import InquirePro from './InquirePro'

export default {
  name: 'AddNewPro',
  data() {
    return {
      loading: true,
      total: 0,
      activityGoodsTypeId: '',
      proPageInfo: {}, // 商品分页信息
      tableData: [], // 表格数据
      activeName: '', // 活动页名
      currentPage: 1, // 当前页页码
      dialogVisible6: false, // 添加商品弹窗
      selectedPro: [],
      pageIndex: 1,
      pageSize: 10,
      groupId: '', // 当前方案Idnp
      params: {},
    }
  },
  computed: {
    selectProStatus() { // 同步更新商品选择状态
      const arr = []
      this.proList.forEach((item) => {
        const obj = {}
        obj.goodsId = item.goodsId
        obj.skuId = item.skuId
        obj.isSelected = false
        arr.push(obj)
      })
      return arr
    },
  },
  watch: {
    dialogVisible6(val) { // 监听弹窗显示，每次重新发送请求
      if(val) {
        this.searchProductList()
      } else {
        this.params = {}
      }
    },
  },
  created() {
    PubSub.subscribe(SHOW_ADD_PRO_DIALOG_1, this.showAddProDialog) // 订阅显示添加商品弹窗
    PubSub.subscribe(SEARCH_PRODUCT_2, this.askSearchProductList) // 订阅查询事件
  },
  beforeDestroy() {
    PubSub.unsubscribe(SHOW_ADD_PRO_DIALOG_1)
    PubSub.unsubscribe(SEARCH_PRODUCT_2)
  },
  methods: {
    ...mapActions(['getSelectedPro']),
    // 触发单选
    handleSingleSelect(selection, row) {
      let selected = false
      selection.forEach((item) => {
        if (item.goodsId === row.goodsId) {
          selected = true
        }
      })
      if (selected) {
        let flag = false
        this.selectedPro.forEach((item) => {
          if (item.goodsId === row.goodsId) {
            flag = true
          }
        })
        if (!flag) {
          this.selectedPro.push(row)
        }
      } else {
        this.selectedPro = this.selectedPro.filter((item) => {
          return item.goodsId !== row.goodsId
        })
      }

    },
    // 触发多选
    handleAllSelect(selection) {
      if (selection.length === 0) { // 此时将当前页所以商品去除
        this.selectedPro = this.selectedPro.filter((item) => {
          let flag = true
          this.tableData.forEach((item2) => {
            if (item.goodsId === item2.goodsId) {
              flag = false
            }
          })
          return flag
        })
      } else {
        selection.forEach((item) => {
          let flag = false
          this.selectedPro.forEach((item2) => {
            if (item.goodsId === item2.goodsId) {
              flag = true
            }
          })
          if (!flag) {
            this.selectedPro.push(item)
          }
        })
      }
    },
    // 显示被选中的商品
    showSelectedPro() {
      this.selectedPro.forEach((item) => {
        this.tableData.forEach((item2, index) => {
          if (item.goodsId === item2.goodsId) {
            this.$refs.elTable.toggleRowSelection(this.tableData[index], true)
          }
        })
      })
    },
    // 表格商品选择发生变化
    selectionChange(row) {
      // this.selectedPro = row
    },
    // 增加活动商品
    async addActivityPro() {
      const res = await addActivityPro()
    },
    // 请求查询商品列表
    askSearchProductList(a, obj) {
      this.params = obj
      this.searchProductList()
    },
    // 查询商品列表
    async searchProductList() {
      this.params.activityId = this.activityId
      const res = await reqActivityPro(this.params)
      if (res.code === 200) {
        this.loading = false
        this.tableData = res.data.pageList
        this.proPageInfo = res.data.page
        this.total = res.data.count
        this.$nextTick(() => {
          this.showSelectedPro()
        })
      }
    },
    // 分页页码改变
    changePageIndex(val) {
      this.params.pageIndex = val
      this.searchProductList()
    },
    // 分页商品展示数量改变
    handleSizeChange(val) {
      this.params.pageSize = val
      this.params.pageIndex = 1
      this.searchProductList()
    },
    // 分页页码改变
    handleCurrentChange(val) {
      this.params.pageIndex = val
      this.searchProductList()
    },
    // 展示添加商品弹窗
    showAddProDialog(a, activityGoodsTypeId) {
      this.activityGoodsTypeId = activityGoodsTypeId
      this.dialogVisible6 = true
    },
    // 确定挑选的商品
    async confirmChoosePro() {
      if (this.selectedPro.length === 0) {
        throttleTipPop(this, 'error', '请选择要添加的商品')
        return
      }
      this.selectedPro.forEach((item) => {
        item.activityGoodsTypeId = this.activityGoodsTypeId
      })
      this.getSelectedPro(this.selectedPro)
      // const res = await addActivityPro(arr)
      this.dialogVisible6 = false
      this.selectedPro = []
    },
  },
  components: {
    InquirePro,
  },
};
</script>

<style lang="scss" scoped>
  img {
      vertical-align: middle;
  }
  button {
      outline: none;
      border: none;
  }
  /deep/ .el-radio {
      margin: 0;
  }
  /* 添加商品样式 */
  .chose_tip_word {
      display: inline-block;
      min-width: 80px;
      text-align: justify;
      text-align-last: justify;
  }
  #addProduct >>> .el-button--primary {
      color: #fff;
      background: #4C86F4;
      border: none;
      height: 32px;
      padding: 0 18px;
  }
  #addProduct >>> .product_list {
      border: none;
  }
  #addProduct >>> .product_item {
      margin: 0 8px 30px;
  }
  #addProduct >>> .el-button--primary span {
      display: inline-block;
      height: 100%;
      line-height: 32px;
  }
  #addProduct >>> .el-input__inner { // 选择框
      height: 32px;
  }
  #addProduct >>> .el-dialog__body {
      padding: 18px 0 24px;
  }
  #addProduct >>> .el-input__icon {
      line-height: 32px;
  }
  #addProduct >>> #tab-6 {
      padding: 0 26px;
  }
  #addProduct >>> .el-tabs--top {
      padding: 0 46px
  }
  #addProduct >>> .el-tabs__nav {
      margin: 0 80px;
  }
  #addProduct >>> .el-tabs--border-card>.el-tabs__header .el-tabs__item {
      margin-left: 0;
      margin-top: 0;
      padding: 0 30px;
  }
  #addProduct >>> .el-tabs--border-card {
      background: #FFF;
      border: none;
      box-shadow: none;
  }
  #addProduct >>> .el-tabs--border-card>.el-tabs__header {
      background: #fff;
  }
  #addProduct >>> .el-tabs--border-card>.el-tabs__content {
      padding: 44px 0 22px 20px;
      border: 1px solid #DCDFE6;
      border-top: none;
      margin-bottom: 25px;
  }
  #addProduct >>> .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
      color: #409EFF;
      background-color: #FFF;
      border-top: 1px solid #DCDFE6;
      border-right-color: #DCDFE6;
      border-left-color: #DCDFE6;
  }
  #addProduct >>> .el-dialog {
      background: #fff;
      box-shadow: 0 0 18px 0 rgba(57, 57, 57, 0.2);
      padding: 0;
  }
  #addProduct >>> .el-dialog__header {
      height: 80px;
      background: rgba(247, 250, 255, 1);
      padding: 0;
      text-align: center;
  }
  #addProduct >>> .el-dialog__header .el-dialog__title {
      font-size: 22px;
      color: rgba(76, 134, 244, 1);
      line-height: 80px;
  }
  /* 添加商品样式 */
</style>
