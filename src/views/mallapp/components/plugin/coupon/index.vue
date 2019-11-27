<template>
  <div class="margin">
    <div class="coupon-jd">
      <el-row :gutter="20">
        <el-col :span="8" class="jd-item-top">
          <div>
            <p class="hd">
              <span class="number">1</span>
              <span class="space">/</span>
              <span class="tit">制券发放</span>
              <img :src="require('@/common/images/make_coupon_delivery.png')" alt>
            </p>
            <div class="description">
              <p>1、设置优惠券类型、优惠内容、适用范围、有效期</p>
              <p>2、生成兑换码，印刷成券，发放给客户</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8" class="jd-item-top">
          <div>
            <p class="hd">
              <span class="number">2</span>
              <span class="space">/</span>
              <span class="tit">领取使用</span>
              <img :src="require('@/common/images/get_try_out.png')" alt>
            </p>
            <div class="description">用户只需输入兑换码，即可领取优惠券。在下单时，即可使用优惠券效期</div>
          </div>
        </el-col>
        <el-col :span="8" class="jd-item-top">
          <div>
            <p class="hd">
              <span class="number">3</span>
              <span class="space">/</span>
              <span class="tit">管理</span>
              <img :src="require('@/common/images/statistics_icon.png')" alt>
            </p>
            <div class="description">管理你的优惠券，激活、禁用、导出等 可查看领取人信息</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="mcard">
      <el-button class="addbtn" type="primary" @click="routerToAddCoupon">新建优惠券</el-button>
      <el-table :data="tableData" stripe>
        <el-table-column label="名称" prop="name" align="center"></el-table-column>
        <el-table-column label="类型" align="center">
          <template slot-scope="scope">{{scope.row.type == '1' ? '折扣券':'满减券'}}</template>
        </el-table-column>
        <el-table-column label="优惠内容" prop="content" align="center"></el-table-column>
        <el-table-column label="有效期" align="center">
          <template
            slot-scope="scope"
          >{{scope.row.validity_time_start}} 至 {{scope.row.validity_time_end}}</template>
        </el-table-column>
        <el-table-column label="兑换码总数" prop="code_num" align="center"></el-table-column>
        <el-table-column label="兑换码链接总数" prop="link_num" align="center"></el-table-column>
        <el-table-column label="管理" align="center" width="250">
          <template slot-scope="scope">
            <el-button type="text" @click="createCode(scope.row)">生成兑换码/兑换链接</el-button>
            <el-button type="text" @click="routerToLog(scope.row)">管理</el-button>
            <el-button type="text" @click="editTicket(scope.row)">编辑</el-button>
          </template>
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
  </div>
</template>

<script>
import { tableMix } from '@/common/js/mixinTable'
import { getCouponList } from '@/api/mallapp/plugin/coupon'

export default {
  name: 'Coupon',
  mixins: [tableMix],
  data () {
    return {
      tableData: [{
        id: '', // id
        name: '', // 名称
        type: '1', // 类型 ：‘1’ 折扣券， ‘2’ 满减券
        content: '', // 优惠内容
        validity_time_start: '', // 有效期开始
        validity_time_end: '', // 有效期结束
        code_num: 0, // 兑换码总数
        link_num: 0, // 链接总数
        children: [{ // 生成的兑换码列表
          ticket_id: ''
        }]
      }]
    }
  },
  methods: {
    routerToAddCoupon () {
      this.$router.push({ path: '/mplugin/coupon_add' })
    },
    getTableData () {
      return getCouponList(this.tableSubmitData)
    },
    editTicket (item) {
      this.$router.push({ path: '/mplugin/coupon_add', query: { id: item.id } })
    },
    createCode (item) {
      this.$router.push({ path: '/mplugin/set_coupon', query: { id: item.id } })
    },
    routerToLog (item) {
      this.$router.push({ path: '/mplugin/coupon_log', query: { id: item.id } })
    }
  }
}
</script>

<style lang='scss' scoped>
.coupon-jd {
  margin-bottom: 20px;
  .jd-item-top {
    & > div {
      height: 250px;
      overflow: hidden;
      padding: 20px;
      background: #fff;
      border: 1px solid #d7e0f1;
      box-sizing: border-box;
    }
    .hd {
      padding: 0 10px;
      line-height: 108px;
      position: relative;
      .number {
        font-size: 32px;
      }
      .space {
        font-size: 32px;
        margin-right: 20px;
      }
      .tit {
        font-size: 16px;
      }
      img {
        position: absolute;
        right: 10px;
        top: 0;
        width: 132px;
      }
    }
    .description {
      padding: 0 10px;
      font-size: 14px;
      line-height: 1.5;
    }
  }
}
</style>
