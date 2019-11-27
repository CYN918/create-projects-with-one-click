<template>
  <div>
    <div class="mcard mbottom">
      <p class="title">搜索条件</p>
      <el-form :model="form" ref="form" size="small" :inline="true">
        <el-form-item>
          <el-select v-model="form.state">
            <el-option label="全部状态" value></el-option>
            <el-option label="未激活" value="1"></el-option>
            <el-option label="已激活" value="2"></el-option>
            <el-option label="已领取" value="3"></el-option>
            <el-option label="已使用" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.keyworld" placeholder="兑换码/手机号搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mcard">
      <div class="btn-wrapper mbottom">
        <el-button size="small" type="success" @click="handleChangeState('1')">激活选中</el-button>
        <el-button size="small" type="danger" @click="handleChangeState('2')">禁用选中</el-button>
        <el-button size="small" type="primary">导出兑换码</el-button>
      </div>
      <el-table :data="tableData" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
        <el-table-column label="券码ID" prop="id" align="center"></el-table-column>
        <el-table-column label="兑换码" prop="code" align="center"></el-table-column>
        <el-table-column label="二维码链接" prop="code_url" align="center"></el-table-column>
        <el-table-column label="领取用户" prop="received_user" align="center"></el-table-column>
        <el-table-column label="领取时间" prop="received_time" align="center" width="100"></el-table-column>
        <el-table-column label="使用时间" prop="used_time" align="center" width="100"></el-table-column>
        <el-table-column label="状态" prop="state" align="center">
          <template slot-scope="scope">{{_state(scope.row.state)}}</template>
        </el-table-column>
        <el-table-column label="激活人" prop="activator" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button
              :class="scope.row.state==='2' ? 'danger': ''"
              :disabled="scope.row.state!=='1' && scope.row.state!=='2'"
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
import { getCodeDetailList, changeState } from '@/api/mallapp/plugin/coupon'

export default {
  mixins: [tableMix],
  props: {
    codeId: {
      type: String
    }
  },
  data () {
    return {
      form: {
        state: '', // 状态： ''全部， 1，未激活 2，已激活 3，已领取 4，已使用
        keyworld: '' // 搜索关键字
      },
      selectCodes: []
    }
  },
  methods: {
    getTableData () {
      this.tableSubmitData.form = this.form
      this.tableSubmitData.code_id = this.codeId
      return getCodeDetailList(this.tableSubmitData)
    },
    handleSelectionChange (data) {
      let ret = []
      data.map(item => {
        ret.push(item.id)
      })
      this.selectCodes = ret
    },
    handleChangeState (state) {
      let data = {}
      data.code_id = this.codeId
      data.state = state

      if (!this.selectCodes.length) {
        this.$message({
          type: 'warning',
          message: '您还未选择券码'
        })
        return
      }
      data.id = this.selectCodes.join(',')
      let text = state === '1' ? '激活' : '禁用'

      this.$prompt(`您确认${text} ${this.selectCodes.length}张券码?`, `${text}确认`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '请输入备注'
      }).then(({ value }) => {
        data.remark = value || ''
        this._changeState(data)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    editCodeState (item) {
      let data = {}
      data.code_id = this.codeId
      // eslint-disable-next-line eqeqeq
      data.state = item.state == '1' ? '2' : '1'
      data.id = item.id
      let text = data.state === '1' ? '激活' : '禁用'

      this.$prompt(`您确认${text} 此券码?`, `${text}确认`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '请输入备注'
      }).then(({ value }) => {
        data.remark = value || ''
        this._changeState(data)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
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
        case '4':
          ret = '已使用'
          break

        default:
          break
      }
      return ret
    },
    _changeState (data) {
      changeState(data).then(res => {
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        this._getTableData()
      })
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
