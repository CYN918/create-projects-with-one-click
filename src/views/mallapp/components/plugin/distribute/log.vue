<template>
  <div class="margin">
    <div class="mcard mbottom">
      <h4 class="title">分发详情</h4>
      <div class="mcard-content">
        <el-form :model="tableSubmitData" :inline="true" ref="form" class="form" size="medium">
          <el-form-item>
            <el-select v-model="form.message_state">
              <el-option value="0" label="短信回执状态"></el-option>
              <el-option value="1" label="发送成功"></el-option>
              <el-option value="2" label="发送失败"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.keyword" placeholder="输入手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="mcard">
      <el-button class="mbottom" type="primary" size="medium">导出全部</el-button>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="user_id" label="用户id"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="message_state_name" label="短信回执"></el-table-column>
        <el-table-column label="操作" width="100" align="center">-</el-table-column>

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
import { getDistributeLog } from '@/api/mallapp/plugin/distribute'

export default {
  name: 'DistributeLog',
  mixins: [tableMix],
  created () {
    this.form.id = this.$route.params.id
  },
  data () {
    return {
      tableData: [
        {
          user_id: '', // id
          phone: '', // 手机号
          message_state: '', // 短信回执： ’1‘ 发送成功 ‘2’ 发送失败
          message_state_name: '' // 短信回执名称： 发送成功 | 发送失败
        }
      ],
      form: {
        id: '', // 操作id
        message_state: '0', // 短信回执状态： ‘0’全部， ‘1’发送成功， ‘2’发送失败
        keyword: '' // 关键字：手机号
      }
    }
  },
  methods: {
    getTableData () {
      this.tableSubmitData.form = this.form
      return getDistributeLog(this.tableSubmitData)
    }
  }

}
</script>

<style lang='scss' scoped>
</style>
