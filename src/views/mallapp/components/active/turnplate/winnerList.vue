<template>
  <div class="mcard margin">
    <div class="title">搜索条件</div>
    <el-form :model="form" :inline="true" ref="form" class="user-search mbottom" size="small">
      <el-form-item>
        <el-date-picker
          v-model="form.time"
          type="daterange"
          range-separator="至"
          start-placeholder="中奖开始日期"
          end-placeholder="中奖结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="state">
        <el-select class="width13" v-model="form.state" placeholder="用户状态">
          <el-option label="状态" value></el-option>
          <el-option label="未领奖" value="1"></el-option>
          <el-option label="已领奖" value="2"></el-option>
          <el-option label="未发货" value="3"></el-option>
          <el-option label="已发货" value="4"></el-option>
          <el-option label="已销核" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="sel_type">
        <el-select class="width13" v-model="form.sel_type" placeholder="搜索类型">
          <el-option label="手机号" value="1"></el-option>
          <el-option label="用户id" value="2"></el-option>
          <el-option label="收货人姓名" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="width16" prop="keyword">
        <el-input v-model="form.keyword" placeholder="请输入关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">查询</el-button>
        <el-button type="primary" plain>导出当前数据</el-button>
      </el-form-item>
    </el-form>
    <div class="muser-right">
      <el-table :data="tableData">
        <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
        <el-table-column label="中奖人ID" prop="client_user_id" align="center"></el-table-column>
        <el-table-column label="手机号" prop="phone" align="center"></el-table-column>
        <el-table-column label="奖品名称" prop="prize_name"></el-table-column>
        <el-table-column label="奖品类型" prop="prize_type_name" align="center"></el-table-column>
        <el-table-column label="中奖时间" prop="draw_time" align="center"></el-table-column>
        <el-table-column label="领奖时间" prop="get_time" align="center"></el-table-column>
        <el-table-column label="发货时间" prop="deliver_time" align="center"></el-table-column>
        <el-table-column label="核销时间" prop="cancel_time" align="center"></el-table-column>
        <el-table-column label="状态" prop="state_name" align="center"></el-table-column>
        <el-table-column label="核销人" prop="operator" align="center"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="routerToWinnerDetail(scope.row)">详情</el-button>
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
import { getWinnerList } from '@/api/mallapp/active/turnplate'

export default {
  name: 'ActiveWinnerList',
  mixins: [tableMix],
  data () {
    return {
      form: {
        turnplate_id: '', // 大转盘id
        time: [], // 中奖时间 ["2019-06-11","2019-06-20"]
        state: '', // 状态 '' 全部  1. 未使用 2.已使用 3，已销核
        sel_type: '1', // 搜索类型 ：  ‘’全部 ‘1’手机号, ‘2’ 用户id, '3' 收货人姓名
        keyword: '' // 关键字
      }
    }
  },
  created () {
    this.form.turnplate_id = this.$route.params.id
  },
  methods: {
    getTableData () {
      this.tableSubmitData.form = this.form
      return getWinnerList(this.tableSubmitData)
    },
    btnShowImport () {
      this.dialogVisible = true
    },
    routerToWinnerDetail (prize) {
      this.$router.push({ path: `/mactive/turnplate/winner_detail/${prize.user_prize_id}`, component: 'ActiveWinnerDetail' })
    },
    _state (state) {
      let ret = ''
      switch (state) {
        case '1':
          ret = '未领奖'
          break
        case '2':
          ret = '已领奖'
          break
        case '3':
          ret = '未发货'
          break
        case '4':
          ret = '已发货'
          break
        case '5':
          ret = '已销核'
          break
        default:
          break
      }
      return ret
    }
  }
}
</script>

<style lang='scss' scoped>
.btn-down {
  margin-bottom: 20px;
  text-align: right;
}
.upload-wrapper {
  padding: 40px 20px;
  margin-bottom: 20px;
  background: #edf0f5;
}
.btn-import {
  margin-left: 20px;
}
</style>
