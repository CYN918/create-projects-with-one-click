<template>
  <div class="mcard mbottom">
    <p class="title">审批人登录网址</p>
    <el-card shadow="never" class="sub">
      <div class="clearfix">
        <div class="left">
          登录网址：
          <el-input class="link" v-model="link" readonly id="url"></el-input>
        </div>
        <div class="right">
          <el-button
            type="primary"
            class="btn-copy"
            plain
            data-clipboard-target="#url"
            @click="copyUrl"
          >复制</el-button>
          <el-popover ref="popover" width="175" trigger="click">
            <p class="code-title">
              <span>二维码</span>
              <canvas height="132" width="132" id="canvas"></canvas>
            </p>
          </el-popover>
          <el-button v-popover:popover type="primary" plain @click="overQRCode">二维码</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import QRCode from 'qrcode'
import { getApprovalLink } from '@/api/mallapp/plugin/approval'

export default {
  data () {
    return {
      link: ''
    }
  },
  created () {
    this._getApprovalLink()
  },
  methods: {
    copyUrl () {
      let clipboard = new Clipboard('.btn-copy')
      clipboard.on('success', () => {
        this.$message({
          message: '链接复制成功',
          type: 'success'
        })
      })
    },
    overQRCode () {
      let canvas = document.getElementById('canvas')
      QRCode.toCanvas(canvas, this.link, function (error) {
        if (error) console.error(error)
      })
    },
    _getApprovalLink () {
      getApprovalLink().then(res => {
        this.link = res.data.link
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import "@/common/scss/variable.scss";
.sub {
  position: relative;
  background-color: $assistColor;
}
.switch {
  position: absolute;
  right: 20px;
}
.left {
  float: left;
  margin-right: 20px;
  .link {
    width: 500px;
    display: inline-block;
  }
}
.right {
  float: left;
}
.btn-copy {
  margin-right: 10px;
}
.code-title {
  text-align: center;
}
</style>
