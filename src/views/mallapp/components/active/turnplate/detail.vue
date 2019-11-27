<template>
  <div class="mcard margin">
    <div class="title">码池详情</div>
    <el-button class="mbottom" type="primary" size="small" @click="btnShowImport">导入兑换码</el-button>
    <div class="title">搜索条件</div>
    <el-form :model="form" :inline="true" ref="form" class="user-search mbottom" size="small">
      <el-form-item>
        <el-date-picker
          v-model="form.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="state">
        <el-select class="width13" v-model="form.state" placeholder="用户状态">
          <el-option label="用户状态" value></el-option>
          <el-option label="正常" value="1"></el-option>
          <el-option label="禁用" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="sel_type">
        <el-select class="width13" v-model="form.sel_type" placeholder="搜索类型">
          <el-option label="手机号" value="1"></el-option>
          <el-option label="用户id" value="2"></el-option>
          <el-option label="活动名称" value="3"></el-option>
          <el-option label="兑换码" value="4"></el-option>
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
        <el-table-column label="兑换码" prop="code" align="center"></el-table-column>
        <el-table-column label="绑定用户ID" prop="user_id" align="center"></el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
        <el-table-column label="来源活动" prop="cative_name" align="center"></el-table-column>
        <el-table-column label="使用时间" prop="used_time" align="center"></el-table-column>
        <el-table-column label="核销时间" prop="cancel_time" align="center"></el-table-column>
        <el-table-column label="导入时间" prop="import_time" align="center"></el-table-column>
        <el-table-column label="核销人" prop="operator" align="center"></el-table-column>
        <el-table-column label="状态" prop="state" align="center">
          <template slot-scope="scope">{{_state(scope.row.state)}}</template>
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
    <el-dialog title="导入兑换码" :visible.sync="dialogVisible" width="700px">
      <div>
        <div class="btn-down">
          <el-button type="primary" size="small">下载表格模板</el-button>
        </div>
        <el-alert class="mbottom" title="功能说明" type="info" :closable="false">
          <div style="margin-top: 10px;">
            1.您可将已有的兑换码导入至此码池中，以用于大转盘活动使用；<br>
            2.导入的兑换码在同一个码池中不可重复，不同码池的兑换码可相同；<br>
            3.兑换码长度需要限定5至20位字符；<br>
            4.兑换码支持大写字母、小写字母、数字、特殊符号、中文，但不支持空格；<br>
            5.每次导入，兑换码必须全部成功才可导入成功；<br>
            6.若导入失败，可下载错误记录，查看错误原因。
          </div>
        </el-alert>
        <el-upload
          class="upload-wrapper"
          ref="upload"
          :limit="1"
          :action="uploadUrl"
          :before-upload="beforeFillUpload"
          :on-progress="progressUpload"
          :on-success="successUpload"
          :auto-upload="false"
          :on-error="errorUpload"
        >
          <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
          <div slot="tip" class="el-upload__tip">
            <p style="margin-bottom: 10px;">第一步：第一步：下载需要导入的表格模板</p>
            <div style="margin-bottom: 10px;">
              第二步：编辑表格：
              <p style="margin-top: 10px;">1.请不要修改/删除表格中的表头文字，且不要修改表格格式；</p>
              <p style="margin-top: 10px;">2.表格内容不可超过1万条数据。</p>
            </div>
            <p>第三步：导入已编辑好的表格</p>
          </div>
        </el-upload>
        <el-button class="btn-import" type="success" @click="submitUpload" :loading="loading">导入</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { tableMix } from '@/common/js/mixinTable'
import { getPoolDescList, importRedeemCode } from '@/api/mallapp/active/turnplate'

export default {
  name: 'ActivePoolDetail',
  mixins: [tableMix],
  data () {
    return {
      form: {
        poolId: '',
        time: [], //
        state: '', // 状态 '' 全部  1. 未使用 2.已使用 3，已销核
        sel_type: '1', // 搜索类型 ：  ‘’全部 ‘1’ 手机号, ‘2’ 用户id, '3' 活动名称 ‘4’ 兑换码
        keyword: '' // 关键字
      },
      dialogVisible: false,
      loading: false,
      uploadUrl: importRedeemCode()
    }
  },
  created () {
    this.form.poolId = this.$route.params.id
  },
  methods: {
    getTableData () {
      this.tableSubmitData.form = this.form
      return getPoolDescList(this.tableSubmitData)
    },
    btnShowImport () {
      this.dialogVisible = true
    },
    _state (state) {
      let ret = ''
      switch (state) {
        case '1':
          ret = '未使用'
          break
        case '2':
          ret = '已使用'
          break
        case '3':
          ret = '已销核'
          break
        default:
          break
      }
      return ret
    },
    // 导入
    errorUpload () {
      this.loading = false
      this.$message({
        message: '导入失败',
        type: 'error'
      })
    },
    beforeFillUpload (file) {
      const isXlsx = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      if (!isXlsx) {
        this.$message.error('上传文件类型错误！请选择xlsx类型文件')
      }
      return isXlsx
    },
    submitUpload () {
      this.$refs.upload.submit()
    },
    progressUpload () {
      this.loading = true
    },
    successUpload (response, file, fileList) {
      this.loading = false
      this.$message({
        message: `导入成功${response.data.success_num}条, 导入失败${response.data.error_num}条`,
        type: 'success'
      })
      this.$refs.upload.clearFiles()
      this.dialogVisible = false
      this._getTableData()
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
