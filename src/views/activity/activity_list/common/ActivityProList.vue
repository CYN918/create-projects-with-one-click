<template>
  <div class="margin dealerlist">
    <div class="mbottom">
      <div class="goods-fitter">
        <div class="search-wrapper1">
          <el-page-header @back="back" :content="content"></el-page-header>
        </div>
      </div>
    </div>
    <div class="wrapper">
      <h4 class="title">活动商品</h4>
      <div style="margin-bottom: 20px">
        <el-button v-if="haveAuthority === 1" class="add_btn" type="primary" size="small" @click="showRecommendProPopup" style="margin-right: 20px">
          <img style="margin-right: 6px;position: relative;top: 2px;" src="@/common/images/activity/icon_recommend_product.png" alt="">
          <span style="position: relative;top: -2px;">推荐商品</span>
        </el-button>
        <el-select @change="selectTypeChange" v-if="allType.length > 0" v-model="form.activityGoodsTypeId" placeholder="请选择商品分类" style="height: 36px">
          <el-option
            v-for="item in allType"
            :key="item.activityGoodsTypeId"
            :label="item.goodsTypeName"
            :value="item.activityGoodsTypeId">
          </el-option>
        </el-select>
      </div>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="white"
        :data="tableData"
        stripe
        style="width: 100%"
        border
        ref="elTable"
        class="goods_index">
        <el-table-column type="index" label="编号" align="center" width="50">
          <template slot-scope="scope">
            <span>{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品图片" align="center" width="120">
          <template slot-scope="scope">
            <i><img style="width:86px; height: 86px;" :src="scope.row.bgGoodsSkuReturnList[scope.row.index].thumbnailImgUrl" alt=""></i>
          </template>
        </el-table-column>
        <el-table-column label="商品信息" align="center">
          <template slot-scope="scope">
            <div style="text-align: left">
              <p style="margin-bottom: 20px">{{scope.row.goodsName}}</p>
              <p style="margin-bottom: 20px">货号：{{scope.row.goodsSn}}</p>
              <p style="margin-bottom: 20px">型号：{{scope.row.modelNumber}}</p>
              <p style="margin-bottom: 20px">品牌：{{scope.row.brandName}}</p>
              <p>SKU：{{scope.row.bgGoodsSkuReturnList[scope.row.index].skuId}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品规格" align="center" width="120">
          <template slot-scope="scope">
            <div style="position:relative">
              <!-- <el-button @click="down">向上</el-button> -->
              <div style="height: 300px;overflow: auto;" :ref="'down'+scope.$index">
                <div class="txt_left martop" v-for="(item,index) in scope.row.bgGoodsSkuReturnList" :key="index">
                  <div
                    class="txt_left imgitem"
                    @click="Clicktent(index,scope.$index)"
                    :class="[index == scope.row.index?'leftbottom':'']"
                  >
                      <!-- <img src="../../../common/images/商品规格(1)shouji.png" alt="" v-if="index == scope.row.index">  -->
                    <div class="more">{{item.goodsSpecValues}}</div>
                  </div>
                </div>
              </div>
              <!-- <el-button @click="down(scope.row,scope.$index)">向下</el-button> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column label="京东/天猫价" align="center" width="100">
          <template slot-scope="scope">
            <div class="txt_left">{{scope.row.bgGoodsSkuReturnList[scope.row.index].jdPrice}}</div>
          </template>
        </el-table-column>
        <el-table-column label="商城价" align="center" width="100">
          <template slot-scope="scope">
            <div class="txt_left">{{scope.row.bgGoodsSkuReturnList[scope.row.index].goodsPrice}}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="haveAuthority5 === 1" label="一件代发价" align="center" width="100">
          <template slot-scope="scope">
            <div class="txt_left">{{scope.row.bgGoodsSkuReturnList[scope.row.index].costPrice}}</div>
          </template>
        </el-table-column>
        <el-table-column label="运费" align="center" width="100">
          <template slot-scope="scope">
            <div class="txt_left">{{scope.row.bgGoodsSkuReturnList[scope.row.index].carriagePrice}}</div>
          </template>
        </el-table-column>
        <el-table-column label="库存(PCS)" align="center" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.bgGoodsSkuReturnList[scope.row.index].goodsNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column label="供应商活动价" align="center" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.bgGoodsSkuReturnList[scope.row.index].supplierActivityPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="haveAuthority2 === 1" label="商城活动价" align="center" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.bgGoodsSkuReturnList[scope.row.index].fyuanaiActivityPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="haveAuthority3 === 1" label="经销商结算价" align="center" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.bgGoodsSkuReturnList[scope.row.index].distributorActivityPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="haveAuthority4 !== 0" label="平台结算价" align="center" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.bgGoodsSkuReturnList[scope.row.index].platformSettlementPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="haveAuthority6 === 1" label="平台活动价" align="center" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.bgGoodsSkuReturnList[scope.row.index].platformActivityPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100" fixed="right">
          <template slot-scope="scope">
            <div class="line-div small_top">
              <!--<div class="small-Idiv" @click="confirmEdit(scope.row)">
                <div class="i-div">
                  <img src="@/common/images/icon/编辑.png" alt class="operation_img"/>
                </div>
                <span>确认编辑</span>
              </div>-->
              <div class="small-Idiv" @click="recycleBinfunc(scope.row.activityGoodsId)">
                <div class="i-div huishouzhan">
                  <img src="@/common/images/icon/回收站.png" alt class="operation_img"/>
                </div>
                <span>删除</span>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination" style="margin-top: 27px;text-align: right;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pageIdnex"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        ></el-pagination>
      </div>
    </div>
    <!--添加商品-->
    <AddNewPro @confrimAddProToActivity="confrimAddProToActivity" :activityGoodsTypeId="form.activityGoodsTypeId" :activityId="form.activityId"></AddNewPro>
    <!--添加商品-->

    <!-- 删除 -->
    <el-dialog
      title="删除"
      :visible.sync="deleteAuditDialog"
      width="30%"
    >
      <span>是否确定删除此商品？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="deleteAuditDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmDelete" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除 -->
  </div>
</template>

<script>
import { throttleTipPop } from '@/utils/throttle'
import PubSub from 'pubsub-js'
import { SHOW_ADD_PRO_DIALOG_2 } from '@/utils/pubsubEvent'
import { checkAuthority, reqActivityProList, reqActivityProClassify, updateActivityPro, deleteActivityPro } from '@/api/activity/index'
import AddNewPro from './popup/AddNewPro'

export default {
  name: "ActivityProList",
  data() {
    return {
      loading: true, // 加载
      haveAuthority: 0,
      haveAuthority2: 0,
      haveAuthority3: 0,
      haveAuthority4: 0,
      haveAuthority5: 0,
      haveAuthority6: 0,
      index: null, // 编辑的行数
      deleteProId: '', // 要删除的商品Id
      deleteAuditDialog: false,
      allType: [], // 活动分类
      page: {}, // 分页信息
      needAddProClassify: false, // 是否需要显示商品分类
      content: '活动商品', // 内容
      tableData: [], // 表格数据
      form: {
        activityId: '',
        pageSize: 10,
        pageIndex: 1,
        activityGoodsTypeId: '',
      }
    }
  },
  async mounted() {
    this.getQuery()
    await this.getActivityProClassify()
    this.getActivityProList()
    this.checkAuthority()
    this.checkAuthority2()
    this.checkAuthority3()
    this.checkAuthority4()
    this.checkAuthority5()
    this.checkAuthority6()
  },
  methods: {
    // 判断权限
    async checkAuthority() {
      const res = await checkAuthority({type: 3, activityId: this.$route.query.activityId})
      if (res.code === 200) {
        this.haveAuthority = res.data
      }
    },
    async checkAuthority2() {
      const res = await checkAuthority({type: 5, activityId: this.$route.query.activityId})
      if (res.code === 200) {
        this.haveAuthority2 = res.data
      }
    },
    async checkAuthority3() {
      const res = await checkAuthority({type: 6, activityId: this.$route.query.activityId})
      if (res.code === 200) {
        this.haveAuthority3 = res.data
      }
    },
    async checkAuthority4() {
      const res = await checkAuthority({type: 7, activityId: this.$route.query.activityId, position:1})
      if (res.code === 200) {
        this.haveAuthority4 = res.data
      }
    },
    async checkAuthority5() {
      const res = await checkAuthority({type: 8, activityId: this.$route.query.activityId})
      if (res.code === 200) {
        this.haveAuthority5 = res.data
      }
    },
    async checkAuthority6() {
      const res = await checkAuthority({type: 9, activityId: this.$route.query.activityId})
      if (res.code === 200) {
        this.haveAuthority6 = res.data
      }
    },
    // 删除活动商品
    recycleBinfunc(id) {
      this.deleteProId = id
      this.deleteAuditDialog = true
    },
    // 确定删除
    async confirmDelete() {
      const res = await deleteActivityPro(this.deleteProId)
      if (res.code === 200) {
        throttleTipPop(this, 'success', '删除成功')
        this.getActivityProList()
      }
      this.deleteAuditDialog = false
    },
    // 确定编辑
    async confirmEdit(row) {
      const arr = []
      const obj = {}
      obj.activityGoodsId = row.activityGoodsId
      obj.activityGoodsTypeId = row.activityGoodsTypeId
      obj.activityId = row.activityId
      obj.festivalGoodType = row.festivalGoodType
      obj.goodsId = row.goodsId
      obj.skuParamList = row.bgGoodsSkuReturnList
      obj.skuParamList.forEach((item, index) => {
        item.activityGoodsNumber = row.bgGoodsSkuReturnList[index].goodsNumber
        item.marketPrice = row.bgGoodsSkuReturnList[index].goodsPrice
      })
      arr.push(obj)
      const res = await updateActivityPro(arr)
      if(res.code === 200) {
        throttleTipPop(this, 'success', '编辑成功')
      }
      this.index = null
    },
    // 确定添加商品至活动
    confrimAddProToActivity() {
      this.getActivityProList()
    },
    // 获取query中的activityId
    getQuery() {
      this.form.activityId = this.$route.query.activityId
    },
    // 活动商品分类选项切换
    selectTypeChange(val) {
      this.form.activityGoodsTypeId = val
      this.getActivityProList()
    },
    // 获取活动商品分类
    async getActivityProClassify() {
      const res = await reqActivityProClassify(this.form.activityId)
      if(res.code === 200) {
        this.allType = res.data.allType
        if (this.allType.length > 0) {
          this.form.activityGoodsTypeId = this.allType[0].activityGoodsTypeId
        }
      }
    },
    // 获取活动商品列表
    async getActivityProList() {
      const res = await reqActivityProList(this.form)
      if (res.code === 200) {
        this.loading = false
        this.page = res.data.page
        this.tableData = res.data.pageList
        this.tableData.forEach((item, index) => {
          this.Clicktent(0, index)
        })
      }
    },
    Clicktent(val, row) {
      this.$set(this.tableData[row], 'index', val);
    },
    // 显示推荐商品弹窗
    showRecommendProPopup() {
      PubSub.publish(SHOW_ADD_PRO_DIALOG_2)
    },
    // 返回
    back() {
      this.$router.push({
        name: 'activityList',
        params: {'activityTypeId': this.$route.query.activityTypeId}
      })
    },
    // 页面展示数变化
    handleSizeChange(val) {
      this.form.pageSize = val
      this.form.pageIndex = 1
      this.getActivityProList()
    },
    // 页码变化
    handleCurrentChange(val) {
      this.form.pageIndex = val
      this.getActivityProList()
    },
  },
  components: {
    AddNewPro,
  },
}
</script>

<style lang="scss" scoped>
  @import "@/common/scss/variable.scss";
  .txt_left {
    text-align: center;
  }
  .wrapper {
    border: 1px solid #D6DEEF;
    background: #fff;
    padding: 15px;
  }

  .small-Idiv {
    display: inline-block;
    margin: 0 10px;
    cursor: pointer;
  }
  .leftbottom {
    color: #4a99fa;
    border-bottom: 1px dashed rgba(215, 220, 231, 1);
    padding-bottom: 8px;
  }
  .title {
    position: relative;
    margin-left: -15px;
    padding-left: 10px;
    line-height: 1.4;
    border-left: 4px solid #4C86F4;
    font-size: 16px;
    color: #333;
    margin-bottom: 22px;
  }
  .goods-fitter {
    .vender {
      ul {
        li {
          float: left;
          height: 41px;
          padding: 0 10px;
          line-height: 41px;
          text-align: center;
          border: 1px solid transparent;
          font-size: 16px;
          color: #333;
          cursor: pointer;

          &.active {
            border: 1px solid #d7e0f1;
            border-bottom: 0;
            background-color: #fff;
            position: relative;
            position: relative;

            &:after {
              position: absolute;
              content: "";
              left: 0;
              bottom: -1px;
              height: 1px;
              width: 100%;
              background: #fff;
            }
          }

          .image {
            display: inline-block;
            width: 30px;
            margin-right: 10px;
            font-size: 0;
            line-height: 40px;
            vertical-align: top;

            img {
              width: 100%;
              vertical-align: middle;
            }
          }
        }
      }
    }

    .search-wrapper1 {
      padding: 20px;
      border: 1px solid rgb(215, 224, 241);
      background: #fff;
      display: flex;
      align-items: center;

      .title1 {
        display: flex;
        margin-left: 40%;
      }
    }

    .search-wrapper {
      padding: 20px;
      border: 1px solid rgb(215, 224, 241);
      background: #fff;

      .title {
        margin-left: -20px;
        font-size: 16px;
        font-weight: 400;
        color: 3333;
        padding-left: 10px;
        line-height: 1.4;
        border-left: 4px solid $themeColor;
        margin-bottom: 10px;
      }

      .search-main {
      }

      .search-base {
      }
    }

    .text-space {
      text-align: center;
      color: #606266;
      font-size: 12px;
    }

    .el-select-width {
      max-width: 130px;
      margin-right: 5px;
    }

    .el-input-width {
      display: inline-block;
      max-width: 180px;
    }

    .btn-toggle {
      margin-left: 10px;
      font-size: 14px;
      color: $themeColor;
      cursor: pointer;
    }
  }
</style>
