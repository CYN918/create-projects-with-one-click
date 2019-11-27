<template>
  <div class="margin mcard turnplate-active">
    <div class="wrapper clearfix">
      <div class="left-wrapper">
        <div class="top-fix" :style="{backgroundImage: `url(${navImage})`}">
          <p @click="setCurrentIndex(0)" :class="currentIndex ===0 ? 'active': ''">
            {{baseSettingForm.name}}
            <span
              class="edit-a"
              v-show="currentIndex ===0"
              @click="setCurentEdit(true)"
            >编辑</span>
          </p>
        </div>
        <div
          class="bottom-fix"
          @click="setCurrentIndex(1)"
          :class="currentIndex ===1 ? 'active': ''"
          :style="{backgroundImage: `url(${bgImage})`}"
        >
          <span class="edit-a" @click="setCurentEdit(true)" v-show="currentIndex ===1">编辑</span>
        </div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="活动首页" name="first">
            <active-home
              :pointerImage="turnForm.lottery_pic"
              @tabToActivDesc="tabToActivDesc"
              @tabToMyPrize="tabToMyPrize"
            ></active-home>
          </el-tab-pane>
          <el-tab-pane label="活动说明" name="second">
            <active-desc></active-desc>
          </el-tab-pane>
          <el-tab-pane label="我的奖品" name="third">
            <my-prize></my-prize>
          </el-tab-pane>
          <el-tab-pane label="中奖页面" name="fourth">
            <prize-page></prize-page>
          </el-tab-pane>
          <el-tab-pane label="没中页面" name="five">
            <no-prize-page></no-prize-page>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="right-wrapper">
        <el-tabs v-model="setName" @tab-click="handleSetClick" type="border-card" ref="editTab">
          <el-tab-pane label="基础设置" name="setfisrt">
            <base-set></base-set>
          </el-tab-pane>
          <el-tab-pane label="抽奖条件" name="setsecond">
            <condition></condition>
          </el-tab-pane>
          <el-tab-pane label="奖项设置" name="setthird">
            <award @toZtAddress="toZtAddress"></award>
          </el-tab-pane>
          <el-tab-pane label="高级设置" name="setfourth">
            <advanced></advanced>
          </el-tab-pane>
          <el-tab-pane label="自提地点" name="setfive">
            <zt-address></zt-address>
          </el-tab-pane>
        </el-tabs>
        <div class="submit">
          <el-button type="primary" @click="submitEdit">保存并预览</el-button>
        </div>
      </div>
    </div>
    <!--pop start-->
    <bg-popup :dialogVisible="dialogBgshow" @bgPopClose="handleDialogBgshow"></bg-popup>
    <!--pop end-->
    <!-- pop-->
    <el-dialog title="保存并预览" :visible.sync="dialogViewVisible" width="1000px">
      <div class="edit-box">
        <div class="preview-box">
          <iframe :src="createdData.link" frameborder="0" scrolling="no"></iframe>
        </div>
        <div class="qrcode-box">
          <el-alert
            v-if="!turnplate_id"
            title="活动已保存，但尚未发布，您可点击下方按钮发布该活动。 活动发布后，您可以在界面装修设置中，将活动入口放至在商城的轮播图/导航或专题图上"
            type="warning"
            :closable="false"
          ></el-alert>
          <el-form size="medium" label-width="100px">
            <el-form-item label="活动名称">
              <p>{{createdData.name}}</p>
            </el-form-item>
            <el-form-item label="活动链接">
              <el-input class="link" v-model="createdData.link" readonly id="url">
                <el-button
                  slot="append"
                  type="primary"
                  class="btn-copy"
                  plain
                  data-clipboard-target="#url"
                  @click="copyUrl"
                >复制</el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="二维码">
              <canvas height="200" width="200" id="canvas"></canvas>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="margin-left: 15px;"
                @click="downCanvas('canvas', 'wheel')"
              >下载二维码</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogViewVisible = false" type="primary" plain>继续编辑</el-button>
        <el-button type="primary" @click="handlePublish">发布</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ActiveHome from './activeIndex'
import ActiveDesc from './activeDesc'
import MyPrize from './myPrize'
import PrizePage from './prizePage'
import NoPrizePage from './noPrizePage'
import BgPopup from './bgPopup'
import BaseSet from './baseSet'
import Condition from './condition'
import Award from './award'
import Advanced from './advanced'
import ZtAddress from './ztAddress'
import { editWheel, wheelPublish } from '@/api/mallapp/active/turnplate'
import Clipboard from 'clipboard'
import QRCode from 'qrcode'

const CURRENT_TITLE = 0 // 标题
const CURRENT_BG = 1 // 背景
const CURRENT_POINTER = 2 // 大转盘指针
// const CURRENT_TIME = 3 // 有效期
// const CURRENT_HOST = 4 // 大主办单位
// const CURRENT_PRIZE = 5 // 活动奖品
// const CURRENT_DESC = 6 // 活动说明
export default {
  name: 'TurnplateAdd',
  data () {
    return {
      turnplate_id: '',
      navImage: require('@/common/images/mall/wxTitle.png'),
      bgImage: require('@/common/images/mall/turnplat_bottom.png'),
      activeName: 'first',
      setName: 'setfisrt',
      dialogViewVisible: false,

      turnForm: {
        lottery_pic: require('@/common/images/mall/turnplat_pointer.png'), // 指针图片
        lottery_pic_id: '',
        main_bac_pic: require('@/common/images/mall/turnplat_bottom.png'), // 背景图片
        main_bac_pic_id: ''
      },

      dialogBgshow: false,
      createdData: {}
    }
  },
  computed: {
    ...mapGetters(['baseSettingForm', 'conditionForm', 'awardSettingForm', 'advancedForm', 'ztAddress', 'currentIndex', 'currentEdit'])
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    handleSetClick (tab, event) {
      console.log(tab, event)
    },
    handleDialogBgshow (data) {
      this.dialogBgshow = false
      this.bgImage = data.main_bac_pic
      this.turnForm = data
      console.log(this.turnForm)
    },
    toZtAddress () {
      this.setName = 'setfive'
    },
    activeEdit () {
      switch (this.currentIndex) {
        case CURRENT_TITLE:
          this.setName = 'setfisrt'
          break
        case CURRENT_BG:
          this.dialogBgshow = true
          break
        case CURRENT_POINTER:
          this.dialogBgshow = true
          break

        default:
          break
      }
    },
    submitEdit () {
      let arr = this.$refs.editTab.$children
      this._validateForm(arr, 'setfisrt')
        .then(flag => {
          if (flag) {
            return this._validateForm(arr, 'setsecond')
          }
        })
        .then(flag => {
          if (flag) {
            return this._validateForm(arr, 'setthird')
          }
        })
        .then(flag => {
          if (flag) {
            return this._validateForm(arr, 'setfourth')
          }
        })
        .then(() => {
          let index = this.awardSettingForm.pan_list.findIndex(item => item.prize_type === '1' && item.send_type === '2') // 判断是否是实物礼品 线下自提
          if (index > -1) {
            // 是否有自提地址
            if (this.ztAddress.length === 0) {
              this.$notify.error({
                title: `错误提示：奖项设置`,
                message: `第${index + 1}个奖项中, 选择线下自提时, 自提地址不能为空`
              })
            }
          } else {
            // 创建/编辑大转盘
            this._editWheel(this._formalizeWheelData())
          }
        })
    },
    tabToActivDesc () {
      this.activeName = 'second'
    },
    tabToMyPrize () {
      this.activeName = 'third'
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
    downCanvas (id, fileName) {
      let canvasElement = document.getElementById(id)
      let MIME_TYPE = 'image/png'
      let imgURL = canvasElement.toDataURL(MIME_TYPE)
      let dlLink = document.createElement('a')
      dlLink.download = fileName
      dlLink.href = imgURL
      dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':')
      document.body.appendChild(dlLink)
      dlLink.click()
      document.body.removeChild(dlLink)
    },
    handlePublish () {
      let turnplateId = this.createdData.turnplate_id
      wheelPublish(turnplateId).then(() => {
        this.dialogViewVisible = false
        this.$router.push({ path: '/mactive/turnplate' })
      })
    },
    _findIndex (list, val) {
      return list.findIndex(item => item.name === val
      )
    },
    _validateForm (arr, setName) {
      let flag = true
      let component = arr[this._findIndex(arr, setName)]
      component.$children[0].$refs[setName].validate((valid, item) => {
        if (!valid) {
          this.setName = setName
          this.$notify.error({
            title: `错误提示：${component.label}`,
            message: item[Object.keys(item)[0]][0].message
          })
          flag = false
        } else {
          return false
        }
      })
      return new Promise((resolve, reject) => {
        if (flag) {
          resolve(true)
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject()
        }
      })
    },
    _formalizeWheelData () {
      let data = {}
      data.turnplate_id = this.turnplate_id
      data.main_bac_pic_id = this.turnForm.main_bac_pic_id
      data.lottery_pic_id = this.turnForm.lottery_pic_id
      data.baseSettingForm = this.baseSettingForm
      data.conditionForm = this.conditionForm
      data.awardSettingForm = this.awardSettingForm
      data.advancedForm = this.advancedForm
      data.ztAddress = this.ztAddress
      return data
    },
    _editWheel (data) {
      editWheel(data).then(res => {
        this.createdData = res.data
        this.dialogViewVisible = true
        this.$nextTick(() => {
          let canvas = document.getElementById('canvas')
          QRCode.toCanvas(canvas, this.createdData.link, function (error) {
            if (error) console.error(error)
          })
        })
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
      })
    },
    ...mapMutations({
      setCurrentIndex: 'SET_CURRENTINDEX',
      setCurentEdit: 'SET_CURRENTEDIT'
    })
  },
  components: {
    ActiveHome,
    BgPopup,
    BaseSet,
    Condition,
    Award,
    Advanced,
    ZtAddress,
    ActiveDesc,
    MyPrize,
    PrizePage,
    NoPrizePage
  },
  watch: {
    currentIndex (val) {
      this.setCurentEdit(false)
    },
    currentEdit (flag) {
      if (flag) {
        this.activeEdit(this.currentIndex)
        this.setCurentEdit(false)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.wrapper {
  .left-wrapper {
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
    position: relative;
    float: left;
    width: 370px;
    height: 700px;
    margin: 0 20px 30px;
    background-color: rgb(246, 246, 246);
    overflow-y: auto;
    .top-fix {
      position: absolute;
      left: 0;
      top: 41px;
      width: 100%;
      height: 64px;
      background-repeat: no-repeat;
      background-size: 100% 64px;
      display: flex;
      justify-content: center;
      p {
        width: 240px;
        height: 32px;
        line-height: 32px;
        margin-top: 26px;
        font-size: 18px;
        color: #fff;
        border: 1px dashed hsla(0, 0%, 85%, 0);
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
        position: relative;
        &:hover {
          border: 1px dashed rgb(217, 217, 217);
        }
        &.active {
          border: 1px dashed rgb(64, 134, 244);
        }
        .edit-a {
          font-size: 10px;
          color: #fff;
          width: 30px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          background-color: #4386f4;
          cursor: pointer;
          text-decoration: none;
          position: absolute;
          right: 0;
          top: -21px;
        }
      }
    }
    .bottom-fix {
      position: absolute;
      left: 0;
      top: 105px;
      bottom: 0;
      width: 100%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      border: 1px dashed hsla(0, 0%, 85%, 0);
      &:hover {
        border: 1px dashed rgb(217, 217, 217);
      }
      &.active {
        border: 1px dashed rgb(64, 134, 244);
      }
      .edit-a {
        font-size: 10px;
        color: #fff;
        width: 30px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background-color: #4386f4;
        cursor: pointer;
        text-decoration: none;
        position: absolute;
        right: 0;
        top: -21px;
      }
    }
  }
  .right-wrapper {
    float: left;
    width: 660px;
    .box-card {
      .line {
        text-align: center;
      }
      .title {
        border-left: 4px solid #4386f4;
        font-size: 16px;
        padding-left: 10px;
        color: #3c3c3c;
        margin-left: -20px;
      }
      .tip {
        font-size: 12px;
        color: #999;
      }
      .selects-top {
        span {
          margin-right: 10px;
          font-size: 14px;
          color: #666;
        }
      }
      .list-table {
        max-height: 500px;
        overflow: auto;
      }
      .submit {
        margin-top: 20px;
      }
    }
    .submit {
      text-align: center;
      margin: 20px auto;
    }
  }
}
.edit-box {
  display: flex;
  .preview-box {
    width: 360px;
    height: 580px;
    margin-right: 40px;
    background: #f1f3f5;
    iframe {
      width: 100%;
      height: 100%;
    }
  }
  .qrcode-box {
    flex: 1;
  }
}
</style>

<style lang='scss'>
.turnplate-active {
  .el-tabs__content {
    width: 330px;
    margin-top: 74px;
    margin-left: 20px;
  }
  .el-tab-pane {
    height: 555px;
  }
  .right-wrapper {
    width: 550px !important;
    .el-tabs__content {
      width: inherit;
      margin-top: 0;
      margin-left: 0;
    }
    .el-tab-pane {
      height: inherit;
    }
  }
  .hight-active {
    box-shadow: 0 0 20px 0 #ff8c00;
  }
}
</style>
