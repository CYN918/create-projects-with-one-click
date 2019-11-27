<template>
  <div class="app-main">
    <div class="app-content">
      <div class="app-main-top">
        <div class="app-main-left">
          <div class="app-main-left-head">应用简介</div>
          <div
            class="app-main-left-con"
            v-html="applyMenu && applyMenu.introduction"
          >
          </div>
        </div>
        <div class="app-main-right">
          <div class="app-main-right-top">
            <a class="my-app-btn" @click="routerToCreate" v-permit="'agency:new'">创建经销商</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStoreList, copyStore } from '@/api/apply/index'
import QRCode from 'qrcode'
import AddressSelect from '@/components/addressSelection/index'

export default {
  props:['applyMenu'],
  data () {
    return {
    }
  },
  created () {
    // this._getStoreList()
  },
  methods: {
    routerToCreate () {
      this.$router.push({ name:'Dealerinformation' })
    },
    overQRCode (url, index) {
      this.currentIndex = index
      let canvas = document.getElementById(`canvas${index}`)
      QRCode.toCanvas(canvas, url, function (error) {
        if (error) console.error(error)
      })
    },
    leaveQrcode () {
      this.currentIndex = -1
    },
    managerToStore (href) {
      // this.$router.push({ name: 'Mallapp' })
      window.open(href, '_blank')
    },
    routerToClient (href) {
      window.open(href, '_blank')
    },
    copyStore (id) {
      this.copyStoreId = id
      this.dialogVisible = true
    },
    submitForm (formName) {
      this.$refs.form.validateField('province_id')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._copyStore()
        } else {
          return false
        }
      })
    },
    selectAddress (val) {
      this.form.province_id = val.province_id
      this.form.city_id = val.city_id
      this.form.area_id = val.area_id
      this.form.street_id = val.street_id
      this.form.province_name = val.province_name
      this.form.city_name = val.city_name
      this.form.area_name = val.area_name
      this.form.street_name = val.street_name
    },
    _getStoreList () {
      let data = {}
      data.application_id = 1
      getStoreList(data).then(res => {
        this.list = res.data
      })
    },
  },
  components: {
    AddressSelect
  },
  watch: {
    copyStoreId () {
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import "@/common/scss/variable.scss";

.app-main {
  background: #fff;
  .app-content {
    height: 220px;
    width: 100%;
    padding: 20px;
    .app-main-top {
      height: 180px;
      background: $themeColor;
      .app-main-left {
        width: 60%;
        height: 100%;
        float: left;
        padding-left: 20px;
        .app-main-left-head {
          height: 50px;
          line-height: 50px;
          color: #ffffff;
          font-size: 20px;
        }
        .app-main-left-con {
          height: 130px;
          color: #ffffff;
          padding: 0 20px 20px 0;
        }
      }
      .app-main-right {
        width: 40%;
        height: 100%;
        float: left;
        padding-right: 40px;
        .app-main-right-top {
          height: 111px;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          padding-top: 10px;
        }
        .my-app-btn {
          width: 200px;
          height: 60px;
          border-radius: 3px;
          background: #fff;
          font-size: 20px;
          color: $themeColor;
          text-decoration: none;
          line-height: 60px;
          text-align: center;
        }
      }
    }
  }
}
</style>
