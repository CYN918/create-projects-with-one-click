<template>
  <div class="margin">
    <el-row :gutter="20" class="mbottom">
      <el-col :span="8">
        <section class="steps_outside_box">
          <el-row>
            <el-col :span="14">
              <section class="sd_left font-16">
                <span class="ddf_num">
                  1
                  <span>/</span>
                </span> 制券发放
              </section>
            </el-col>
            <el-col :span="10">
              <img
                :src="require('@/common/images/make_coupon_delivery.png')"
                class="make_coupon_delivery"
              >
            </el-col>
          </el-row>

          <p class="fz12 mt10">选择样式，设置有效期，生成积分券码，打印，发给用户</p>
        </section>
      </el-col>
      <el-col :span="8">
        <section class="steps_outside_box">
          <el-row>
            <el-col :span="14">
              <section class="sd_left font-16">
                <span class="ddf_num">
                  2
                  <span>/</span>
                </span> 领取使用
              </section>
            </el-col>
            <el-col :span="10">
              <img :src="require('@/common/images/get_try_out.png')" class="make_coupon_delivery">
            </el-col>
          </el-row>

          <p class="fz12 mt10">用户领取积分券即直接将积分券充值进入积分账户中，在消费时可使用积分 账户中的积分进行抵扣</p>
        </section>
      </el-col>
      <el-col :span="8">
        <section class="steps_outside_box">
          <el-row>
            <el-col :span="14">
              <section class="sd_left font-16">
                <span class="ddf_num">
                  3
                  <span>/</span>
                </span> 管理
              </section>
            </el-col>
            <el-col :span="10">
              <img
                :src="require('@/common/images/statistics_icon.png')"
                class="make_coupon_delivery"
              >
            </el-col>
          </el-row>

          <p class="fz12 mt10">管理你的积分券，激活、禁用、导出等可查看领取人信息</p>
        </section>
      </el-col>
    </el-row>
    <div class="mcard">
      <el-button class="addbtn" type="primary" @click="routerToAddTicket">新建积分券</el-button>
      <el-table :data="tableData">
        <el-table-column label="名称" prop="name" align="center"></el-table-column>
        <el-table-column label="创建时间" prop="create_time" align="center"></el-table-column>
        <el-table-column label="有效期" align="center">
          <template
            slot-scope="scope"
          >{{scope.row.validity_time_start}} 至 {{scope.row.validity_time_end}}</template>
        </el-table-column>
        <el-table-column label="兑换码总数" prop="total" align="center"></el-table-column>
        <el-table-column label="管理" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="createCode(scope.row)">生成</el-button>
            <el-button type="text" @click="routerToLog(scope.row)">兑换码</el-button>
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
import { getTicketList } from '@/api/mallapp/plugin/index'
import { showSiderbarMix } from '@/common/js/mixin'

export default {
  mixins: [tableMix, showSiderbarMix],
  name: 'Ticket',
  data () {
    return {
      // tableData: [{
      //   id: '', // id
      //   name: '', // 名称
      //   create_time: '1', // 创建日期
      //   validity_time_start: '', // 有效期开始
      //   validity_time_end: '', // 有效期结束
      //   total: 0, // 兑换码总数
      //   children: [{ // 生成的兑换码列表
      //     ticket_id: ''
      //   }]
      // }]
    }
  },
  methods: {
    routerToAddTicket () {
      this.$router.push({ path: '/mplugin/add' })
    },
    getTableData () {
      return getTicketList(this.tableSubmitData)
    },
    editTicket (item) {
      this.$router.push({ path: '/mplugin/add', query: { id: item.id } })
    },
    createCode (item) {
      this.$router.push({ path: '/mplugin/set_rules', query: { id: item.id } })
    },
    routerToLog (item) {
      this.$router.push({ path: '/mplugin/ticket_log', query: { id: item.id } })
    }
  },
  watch: {
    $route (to, from) {
      if (to.path === '/mplugin/index') {
        this.showSiderbar()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.steps_outside_box {
  border: 1px solid #d7e0f1;
  min-width: 380px;
  overflow: hidden;
  background-color: #ffffff;
  height: 250px;
  padding-top: 25px;
  padding-left: 30px;

  .sd_left {
    line-height: 108px;
    padding-left: 20px;
  }

  .ddf_num {
    font-size: 32px;
    font-size: 700;

    span {
      margin-left: 5px;
      margin-right: 5px;
    }
  }

  .make_coupon_delivery {
    width: 132px;
  }
  p.fz12.mt10 {
    line-height: 1.5;
  }
}
.addbtn {
  margin-bottom: 20px;
}
</style>
