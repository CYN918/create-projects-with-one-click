<template>
  <div class="margin mcard">
    <div class="mbottom">
      <el-button type="primary" size="small" @click="btnAdd">创建新码池</el-button>
      <el-button type="primary" size="small" @click="btnPhone">手机端销核</el-button>
    </div>
    <el-table :data="tableData">
      <el-table-column label="序号" type="index" align="center"></el-table-column>
      <el-table-column label="码池名称" prop="name" align="center"></el-table-column>
      <el-table-column label="兑换码总数" prop="total" align="center"></el-table-column>
      <el-table-column label="已使用数" prop="used_num" align="center"></el-table-column>
      <el-table-column label="未使用数" prop="unused_num" align="center"></el-table-column>
      <el-table-column label="创建时间" prop="create_time" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="250" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="routerToDescription(scope.row.pool_id)">详情</el-button>
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
    <!--pop-->
    <el-dialog title="创建码池" :visible.sync="dialogVisible" width="700px">
      <el-form :model="addForm" size="medium" label-width="100px" ref="addForm">
        <el-form-item
          label="码池名称"
          prop="name"
          :rules="[{required: true, message: '请输入20个以内字符', trigger: 'blur'}]"
        >
          <el-input v-model="addForm.name" placeholder="请输入20个以内字符"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddPool">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogTipVisible" width="700px">
      <div class="tip-wrapper">
        <i class="el-icon-success"></i>
        <h2>码池创建成功</h2>
        <p>您可立即导入兑换码</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTipVisible = false">取 消</el-button>
        <el-button type="primary" @click="routerToDesc">导 入</el-button>
      </span>
    </el-dialog>
    <el-dialog title="手机核销" :visible.sync="dialogPhoneVisible" width="700px">
      <el-alert
        class="mbottom"
        title="功能说明: 使用站点子账号登录核销手机端，即可将已使用的兑换码改为已核销状态"
        type="info"
        :closable="false"
      ></el-alert>
      <el-form size="medium" label-width="60px">
        <el-form-item label="链接">
          <el-input v-model="phoneCancelVerificationUrl" id="url" readonly>
            <el-button
              slot="append"
              class="btn-copy"
              data-clipboard-target="#url"
              @click="copyUrl"
            >复制链接</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="二维码">
          <p>请使用微信端扫码查看</p>
          <canvas height="200" width="200" id="canvas"></canvas>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPhoneVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogPhoneVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { tableMix } from '@/common/js/mixinTable'
import Clipboard from 'clipboard'
import QRCode from 'qrcode'
import { getRedeemPoolList, addRedeemPool, getPhoneCancelVerificationUrl } from '@/api/mallapp/active/turnplate'

export default {
  name: 'ActiveRedeemPool',
  mixins: [tableMix],
  data () {
    return {
      dialogVisible: false,
      addForm: {
        name: ''
      },
      dialogTipVisible: false,
      newCodePoolId: '',
      phoneCancelVerificationUrl: '',
      dialogPhoneVisible: false
    }
  },
  created () {
    this._getPhoneCancelVerificationUrl()
  },
  methods: {
    getTableData () {
      return getRedeemPoolList(this.tableSubmitData)
    },
    btnAdd () {
      this.dialogVisible = true
    },
    handleAddPool () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.dialogVisible = false
          this._addRedeemPool()
        } else {
          this.$message({
            type: 'warning',
            message: '请输入码池名称'
          })
          return false
        }
      })
    },
    routerToDesc () {
      this.dialogTipVisible = false
      this.$router.push({ path: `/mactive/turnplate/redeempool_detail/${this.newCodePoolId}`, component: 'ActiveRedeemPool' })
    },
    routerToDescription (id) {
      this.$router.push({ path: `/mactive/turnplate/redeempool_detail/${id}`, component: 'ActiveRedeemPool' })
    },
    btnPhone () {
      this.dialogPhoneVisible = true
      this.$nextTick(() => {
        let canvas = document.getElementById('canvas')
        QRCode.toCanvas(canvas, this.phoneCancelVerificationUrl, function (error) {
          if (error) console.error(error)
        })
      })
    },
    copyUrl () {
      let clipboard = new Clipboard('.btn-copy')
      clipboard.on('success', () => {
        this.$message({
          message: '链接复制成功',
          type: 'success'
        })
      })
    },
    _addRedeemPool () {
      addRedeemPool(this.addForm.name).then(res => {
        this.dialogTipVisible = true
        this.newCodePoolId = res.data.pool_id
      })
    },
    _getPhoneCancelVerificationUrl () {
      getPhoneCancelVerificationUrl().then(res => {
        this.phoneCancelVerificationUrl = res.data.url
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import "@/common/scss/variable.scss";
.tip-wrapper {
  text-align: center;
  i {
    margin-bottom: 40px;
    font-size: 48px;
    color: $themeColor;
  }
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  p {
    font-size: 16px;
  }
}
#canvas {
  width: 164px !important;
  height: 164px !important;
}
</style>
