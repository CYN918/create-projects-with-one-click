<template>
  <div>
    <div class="mcard mbottom">
      <el-card shadow="never" class="sub">
        功能开启：
        <el-switch
          class="switch"
          v-model="value"
          active-text="已启用"
          inactive-text="未启用"
          active-color="#13ce66"
          @change="handleSwitch"
        ></el-switch>
      </el-card>
    </div>
    <div class="mcard mbottom" v-if="value">
      <p class="title">业务员端登录网址</p>
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
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import QRCode from 'qrcode'
import { getRechargeFunction, changeRechargeFunction } from '@/api/mallapp/plugin/recharge'
export default {
  data () {
    return {
      value: false,
      link: ''
    }
  },
  created () {
    this._getRechargeFunction()
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
    handleSwitch () {
      if (this.value) {
        changeRechargeFunction(this.value).then(() => {
          this.$notify({
            title: '成功',
            message: '开启成功！',
            type: 'success'
          })
        })
      } else {
        this.value = !this.value
        this.$confirm('关闭后，业务员将不可再登录', '确认关闭此插件？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          changeRechargeFunction(!this.value).then(() => {
            this.value = !this.value
            this.$message({
              type: 'success',
              message: '关闭成功!'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      }
    },
    _getRechargeFunction () {
      getRechargeFunction().then(res => {
        this.value = res.data.value
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
