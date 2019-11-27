<template>
  <div>
    <div class="mcard mbottom">
      <p class="title">搜索条件</p>
      <el-form :model="form" ref="form" size="small" :inline="true">
        <el-form-item>
          <el-select v-model="form.state">
            <el-option label="全部状态" value></el-option>
            <el-option label="禁用中" value="1"></el-option>
            <el-option label="已激活" value="2"></el-option>
            <el-option label="已领取" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.code_start" placeholder="输入开始编号搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.code_end" placeholder="输入结束编号搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mcard">
      <div class="btn-wrapper mbottom">
        <el-button size="small" type="success">激活选中</el-button>
        <el-button size="small" type="danger">禁用选中</el-button>
        <el-button size="small" type="primary">导出二维码</el-button>
        <el-button size="small" type="primary">导出全部</el-button>
        <el-button size="small" type="primary">激活全部</el-button>
      </div>
      <el-table :data="tableData" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
        <el-table-column label="编号" prop="serial_number" align="center"></el-table-column>
        <el-table-column label="兑换码" prop="code_id" align="center"></el-table-column>
        <el-table-column label="兑换链接" prop="code_url" align="center"></el-table-column>
        <el-table-column label="绑定用户" prop="bind_user" align="center"></el-table-column>
        <el-table-column label="绑定时间" prop="bind_time" align="center" width="100"></el-table-column>
        <el-table-column label="状态" prop="state" align="center">
          <template slot-scope="scope">{{_state(scope.row.state)}}</template>
        </el-table-column>
        <el-table-column label="激活人" prop="activator" align="center"></el-table-column>

        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button
              :class="scope.row.state==='2' ? 'danger': ''"
              :disabled="scope.row.state==='3'"
              type="text"
              @click="editCodeState(scope.row)"
            >{{scope.row.state==='1' ? '激活': scope.row.state==='2' ? '禁用' : '-'}}</el-button>
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
import { getTicketDetailList } from '@/api/mallapp/plugin/index'

export default {
  mixins: [tableMix],
  props: {
    scoreId: {
      type: String
    }
  },
  data () {
    return {
      form: {
        state: '', // 状态： ''全部， 1，禁用中 2，已激活 3，已领取
        code_start: '', // 编号开始
        code_end: '' // 编号搜束
      },
      selectCodes: []
    }
  },
  methods: {
    getTableData () {
      this.tableSubmitData.form = this.form
      this.tableSubmitData.score_id = this.scoreId
      return getTicketDetailList(this.tableSubmitData)
    },
    handleSelectionChange (data) {
      let ret = []
      data.map(item => {
        ret.push(item.serial_number)
      })
      this.selectCodes = ret
      console.log(this.selectCodes)
    },
    _state (state) {
      let ret = ''
      switch (state) {
        case '1':
          ret = '禁用中'
          break
        case '2':
          ret = '已激活'
          break
        case '3':
          ret = '已领取'
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
@import "@/common/scss/variable.scss";
.danger {
  color: $themeSubColor;
}
</style>
