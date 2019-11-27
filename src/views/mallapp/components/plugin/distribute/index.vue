<template>
  <div class="margin">
    <el-row class="mbottom" :gutter="20">
      <el-col :span="8">
        <section class="steps_outside_box">
          <el-row>
            <el-col :span="14">
              <section class="sd_left font-16">
                <span class="ddf_num">
                  1
                  <span>/</span>
                </span> 选人
              </section>
            </el-col>
            <el-col :span="10">
              <img src="@/common/images/select_person_icon.png" class="make_coupon_delivery">
            </el-col>
          </el-row>

          <p class="fz12 mt10">
            1、选择系统中已有的用户或用户组发放
            <br>2、通过导入表格，直接向表格中的用户发放
          </p>
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
                </span> 发放
              </section>
            </el-col>
            <el-col :span="10">
              <img src="@/common/images/grant_icon.png" class="make_coupon_delivery">
            </el-col>
          </el-row>

          <p class="fz12 mt10">发放给系统用户只支持发给所有用户统一价值的积分值，通过表格发放，则可以在表格中设置发放给每位用户不同价值的积分值。</p>
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
                </span> 到达
              </section>
            </el-col>
            <el-col :span="10">
              <img src="@/common/images/arrive_at_icon.png" class="make_coupon_delivery">
            </el-col>
          </el-row>

          <p class="fz12 mt10">直接将积分充值进用户的 1账户中，无需用户任何操作，用户可直接使用积分进行消费</p>
        </section>
      </el-col>
    </el-row>
    <div class="mcard">
      <el-button class="mbottom" type="primary" @click="routerToAdd" size="medium">新建分发</el-button>
      <el-table :data="tableData">
        <el-table-column label="序号" type="index" align="center"></el-table-column>
        <el-table-column label="生成方式" prop="generation_mode" align="center"></el-table-column>
        <el-table-column label="发放时间" prop="grant_time" align="center"></el-table-column>
        <el-table-column label="积分总价值" prop="integral_total" align="center"></el-table-column>
        <el-table-column label="发放总人数" prop="number_total" align="center"></el-table-column>
        <el-table-column label="备注" prop="ramark" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="createCode(scope.row)">详情</el-button>
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
import { getDistributeList } from '@/api/mallapp/plugin/distribute'
export default {
  name: 'ScoreDistribute',
  mixins: [tableMix],
  data () {
    return {
      tableData: [
        {
          id: '', // id
          generation_mode: '系统导入', // '系统导入'， ‘表格导入’
          grant_time: '', // 发放时间
          integral_total: 0, // 积分总价值
          number_total: 0, // 发放总人数
          ramark: '' // 备注
        }
      ]
    }
  },
  methods: {
    routerToAdd () {
      this.$router.push({ path: '/mplugin/distribute_add' })
    },
    getTableData () {
      return getDistributeList(this.tableSubmitData)
    },
    editTicket (item) {
      this.$router.push({ path: '/mplugin/add', query: { id: item.id } })
    },
    createCode (item) {
      this.$router.push({ path: `/mplugin/distribute_log/${item.id}` })
    },
    routerToLog (item) {
      this.$router.push({
        path: '/mplugin/ticket_log',
        query: { id: item.id }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
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

.sdf_ddert {
  background: #dde9f7;
  color: #3c3c3c;
  line-height: 60px;
}

.sdf_ddert.ab {
  width: 1000px;
}

.sddf_dfreet {
  width: 140px;
}

.sd_jh_ert {
  width: 700px;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  .sdd_feet {
    font-size: 32px;
    border-radius: 50%;
    box-shadow: 0 0 2px #afc0d4;
    color: #ffffff;
    background-color: #afc0d4;
    width: 50px;
    height: 50px;
    display: inline-block;
    text-align: center;
    line-height: 50px;
    position: relative;
    top: 5px;
  }
  .sdd_feet.act {
    background-color: #4386f4;
  }
}

.sdf_derrrt {
  width: 1100px;
  margin: auto;
  margin-top: 40px;
}

.sd_jh_deret {
  width: 160px;
  text-align: center;
  img {
    width: 90px;
  }
  p.fz14 {
    text-align: left;
    line-height: 1.4;
    margin-top: 20px;
  }
}
</style>
