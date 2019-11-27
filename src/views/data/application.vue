<template>
  <div class="margin">
    <div class="mcard mbottom">
      <p class="title">应用数据</p>
      <el-form :model="form" ref="form" size="small" :inline="true">
        <el-form-item prop="search_type">
          <el-select v-model="selectTime">
            <el-option label="昨日" value="1"></el-option>
            <el-option label="最近7日" value="7"></el-option>
            <el-option label="最近15日" value="15"></el-option>
            <el-option label="最近30日" value="30"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="form.start_time" value-format="yyyy-MM-dd" placeholder="选择开始时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="form.end_time" value-format="yyyy-MM-dd" placeholder="选择开始时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.keyworld" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mcard">
      <el-table :data="tableData" stripe>
        <el-table-column label="站点名称" prop="store_name" align="center"></el-table-column>
        <el-table-column label="新增用户数" prop="user_num" align="center"></el-table-column>
        <el-table-column label="下单数" prop="order" align="center" width="100"></el-table-column>
        <el-table-column label="利润" prop="profit" align="center"></el-table-column>
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
import { getApplicationList } from '@/api/data/index'

export default {
  name: 'MemberApplication',
  mixins: [tableMix],
  data () {
    return {
      form: {
        start_time: '',
        end_time: '',
        keyworld: ''
      },
      selectTime: '7'
    }
  },
  created () {
    // this._initTime()
  },
  methods: {
    getTableData () {
      this.tableSubmitData.form = this.form
      return getApplicationList(this.tableSubmitData)
    },
    _initTime () {
      let now = new Date()
      let newTime = new Date(now - 1000 * 3600 * 24 * Number(this.selectTime))
      let time = { start_time: `${newTime.getFullYear()}-${newTime.getMonth() + 1}-${newTime.getDate()}`, end_time: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}` }
      this.form = Object.assign({}, time)
    }
  },
  watch: {
    selectTime () {
      this._initTime()
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
