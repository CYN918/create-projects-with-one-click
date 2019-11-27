<template>
  <div class="log-wrapper">
    <el-form :model="form" ref="form" class="log-form" size="small" :inline="true">
      <el-form-item label="操作人：">
        <el-select class="width16" v-model="form.store_manager_id" placeholder="请选择">
          <el-option label="全部" value="0"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作时间：">
        <el-date-picker class="width16" type="date" placeholder="选择日期" v-model="form.start_time"></el-date-picker>
      </el-form-item>
      <span class="line" :span="2">-</span>
      <el-form-item>
        <el-date-picker class="width16" type="date" placeholder="选择时间" v-model="form.end_time"></el-date-picker>
      </el-form-item>
      <el-form-item label="搜索：">
        <el-input class="width16" v-model="form.content" placeholder="搜索操作内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="seach">搜索</el-button>
        <el-button type="primary" plain>导出筛选结果</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="logList"
      stripe
      style="width: 100%">
      <el-table-column
        prop="account"
        label="登录账号"/>
      <el-table-column
        prop="role_name"
        label="角色"/>
      <el-table-column
        prop="nickname"
        label="昵称"/>
      <el-table-column
        prop="time"
        label="操作时间"/>
      <el-table-column
        prop="ip"
        label="IP地址"/>
      <el-table-column
        prop="content"
        label="操作内容"/>
    </el-table>
    <div class="pagenation">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.current_page"
        :page-size="pagination.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total_count">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getLogList } from '@/api/mallapp/setting/account'

export default {
  name: 'MsettingAccountLog',
  props: {
    storeManagerId: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      form: {
        store_manager_id: '0', // 操作人 id
        start_time: '', // 操作时间开始
        end_time: '', // 操作时间结束
        content: '' // 搜索操作内容
      },
      logList: [
      // {
      //   account: '', // 登录账号
      //   role_name: '', // 角色
      //   nickname: '', // 昵称
      //   time: '', // 操作时间
      //   ip: '', // IP地址
      //   content: '' // 操作内容
      // }
      ],
      pagination: {
        current_page: 1,
        page_size: 10,
        total_count: 0
      }
    }
  },
  created () {
    this.form.store_manager_id = this.storeManagerId
    this._getLogList()
  },
  methods: {
    seach () {
      this._getLogList()
    },
    handleSizeChange (val) {
      this.pagination.page_size = val
      this._getLogList()
    },
    handleCurrentChange (val) {
      this.pagination.current_page = val
      this._getLogList()
    },
    _getLogList () {
      let data = {}
      data.current_page = this.pagination.current_page
      data.page_size = this.pagination.page_size
      data.form = this.form
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getLogList(data).then(res => {
        loading.close()
        this.logList = res.data.list
        this.pagination.total_count = res.data.total_count
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.log-wrapper {
  .log-form {
    margin-bottom: 20px;
  }
  .width16 {
    width: 160px;
  }
  .line {
    margin-right: 10px;
    line-height: 32px;
    text-align: center;
  }
  .pagenation {
    margin: 20px 0;
    text-align: right;
  }
}
</style>
