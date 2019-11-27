<template>
  <div class="margin">
    <div class="mcard mbottom">
      <div class="steps">
        <el-steps :active="3">
          <el-step title="选择商城模板" description="在模板基础上，调整轮播图、商品等元素，更方便"></el-step>
          <el-step title="填写基本信息" description="信息内容关系到商城的整体方向等，请仔细填写"></el-step>
          <el-step title="商城搭建完成" description="基础部分完成，建议按照指引，完成更多设置"></el-step>
        </el-steps>
      </div>
    </div>
    <div class="mcard create-wrapper">
      <div class="setting-wrap">
        <div class="store-info-wrap">
          <p>
            <i class="el-icon-success"></i>
          </p>
          <p class="titl">"{{createStore.store_name}}"基础设置完成</p>
          <p class="store-guide">建议按照指引完成更多设置</p>
          <div class="qrcode">
            <canvas id="storeCanvas"></canvas>
          </div>
          <p class="scan">扫一扫查看商城效果</p>
          <el-button type="primary" size="medium" @click="toManagerIndex">进入管理首页</el-button>
        </div>
        <div class="setting-index">
          <h4>商城设置指引</h4>
          <div class="setting-item-wrap">
            <a href target="_bank" class="setting-item">
              <div class="setting-icon-wrap doods-shelves"></div>
              <div class="setting-info">
                <p>商品上架</p>
                <p>挑选商品至商城商品库，即可上架至商城</p>
              </div>
            </a>
            <a href target="_bank" class="setting-item">
              <div class="setting-icon-wrap mall-construction"></div>
              <div class="setting-info">
                <p>商城建设</p>
                <p>商城装修，商品上架等，还提供各种营销插件的使用</p>
              </div>
            </a>
            <a href target="_bank" class="setting-item">
              <div class="setting-icon-wrap freight-setting"></div>
              <div class="setting-info">
                <p>运费设置</p>
                <p>商城装修，商品上架等，还提供各种营销插件的使用</p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="exhibition">
        <div class="phone-wrap">
          <div class="wx-title">{{createStore.store_name}}</div>
          <iframe :src="createStore.store_url"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'

export default {
  name: 'CopyCreate',
  data () {
    return {
      createStore: {}
    }
  },
  created () {
    if (!this.$route.params.store_id) {
      this.$router.push({ path: '/apply' })
      return
    }
    this.createStore = this.$route.params
  },
  methods: {
    overQRCode (url, index) {
      let canvas = document.getElementById(`canvas${index}`)
      QRCode.toCanvas(canvas, url, { width: 100 }, function (error) {
        if (error) console.error(error)
      })
    },
    toManagerIndex () {
      window.open(this.createStore.manage_url, '_blank')
    }
  },
  watch: {
    createStore () {
      this.$nextTick(() => {
        let canvas = document.getElementById('storeCanvas')
        QRCode.toCanvas(canvas, this.createStore.store_url, { width: 120 }, function (error) {
          if (error) console.error(error)
        })
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import "@/common/scss/variable.scss";
.steps {
  margin: 0 40px;
}
.group {
  margin-bottom: 20px;
  text-align: center;
}
.create-wrapper {
  display: flex;
  justify-content: center;
  .setting-wrap {
    width: 730px;
    .store-info-wrap {
      text-align: center;
      .el-icon-success {
        margin-bottom: 16px;
        font-size: 32px;
        color: $themeColor;
      }
      .titl {
        margin-bottom: 10px;
        font-weight: 700;
        font-size: 20px;
        color: $themeColor;
      }
      .store-guide {
        color: #a6a6a6;
        font-size: 16px;
        margin-bottom: 16px;
      }
      .qrcode {
        width: 120px;
        height: 120px;
        margin: 0 auto 5px;
      }
      .store-guide {
        color: #a6a6a6;
        font-size: 16px;
        margin-bottom: 16px;
      }
      .scan {
        color: #3c3c3c;
        font-size: 16px;
        margin-bottom: 20px;
      }
      .el-button {
        margin-bottom: 20px;
      }
    }
    .setting-index {
      height: 280px;
      background-color: #e9f4ff;
      border: solid 2px #d7e0f1;
      padding: 0 32px 20px 32px;
      h4 {
        color: #3c3c3c;
        font-weight: 700;
        font-size: 20px;
        line-height: 76px;
        text-align: center;
        margin: 0;
      }
      .setting-item-wrap {
        display: flex;
        justify-content: space-between;
        .setting-item {
          width: 180px;
          height: 180px;
          border: solid 1px #d9d9d9;
          background-color: #fff;
          padding: 0 8px 0 8px;
          position: relative;
          .setting-icon-wrap {
            position: absolute;
            top: 24px;
            display: flex;
            justify-content: center;
            width: 164px;
            height: 64px;
            transition: all 0.3s ease-in-out;
          }
          .doods-shelves {
            background: url("../../common/images/apply/doods-shelves-default.png")
              no-repeat center;
            background-size: 48px 64px;
          }
          .mall-construction {
            background: url("../../common/images/apply/mall-construction-default.png")
              no-repeat center;
            background-size: 48px 64px;
          }
          .freight-setting {
            background: url("../../common/images/apply/freight-setting-default.png")
              no-repeat center;
            background-size: 48px 64px;
          }
          .setting-info {
            position: absolute;
            bottom: 8px;
            width: 164px;
            text-align: center;
            p {
              margin-bottom: 0;
              font-size: 12px;
              color: #a6a6a6;
            }
            p:first-child {
              color: #3c3c3c;
              font-weight: 600;
              font-size: 16px;
            }
          }
        }
      }
    }
  }
  .exhibition {
    height: 636px;
    width: 325px;
    background: url("../../common/images/apply/phone-wrap.png");
    margin-left: 100px;
    padding: 65px 20px 0 20px;
    .phone-wrap {
      background-color: #fff;
      height: 508px;
    }
    .wx-title {
      color: #fff;
      text-align: center;
      height: 49px;
      background: url("../../common/images/apply/wx-title.png") no-repeat center;
      background-size: 100% 100%;
      padding-top: 23px;
    }
    iframe {
      width: 100%;
      height: 459px;
      border: none;
    }
  }
}
</style>
