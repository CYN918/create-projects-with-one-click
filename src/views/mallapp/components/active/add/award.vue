<template>
  <div>
    <el-form :model="awardSettingForm" ref="setthird" label-width="120px" size="small">
      <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
        <el-tab-pane name="1" :label="awardSettingForm.thank_join.award_name" :closable="false">
          <el-form-item label="奖品名称" required>
            <el-input v-model="awardSettingForm.thank_join.award_name" placeholder="谢谢参与" disabled></el-input>
          </el-form-item>
          <el-form-item label="奖品图片" required class="turnplate-bg-wrapper">
            <el-upload
              class="avatar-uploader"
              :action="action"
              :show-file-list="false"
              :on-success="handleImageSuccess"
              :before-upload="beforeImageUpload"
            >
              <img
                v-if="awardSettingForm.thank_join.award_pic"
                :src="awardSettingForm.thank_join.award_pic"
                class="avatar"
              >
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <el-button size="small" type="primary">上传图片</el-button>
              <div slot="tip" class="el-upload__tip">
                <p>1、图片尺寸建议：200px200px;</p>
                <p>2、支持JPG、PNG格式的图片，图片不能大于2M。</p>
              </div>
            </el-upload>
          </el-form-item>
          <p class="tip">此活动可设置1-8个奖品，且至少包含一个“谢谢参与"</p>
        </el-tab-pane>
        <el-tab-pane
          v-for="(item, index) in awardSettingForm.pan_list"
          :key="item.index"
          :label="item.prize_name"
          :name="item.index"
        >
          <el-form-item
            label="奖品类型"
            :prop="'pan_list.' + index + '.prize_type'"
            :rules="awardsRules.prize_type"
          >
            <el-select v-model="item.prize_type" placeholder="请选择">
              <el-option
                v-for="item in awardsList"
                :key="item.id"
                :label="item.msg"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!--实物礼品 开始 prize_type === ‘1’-->
          <el-form-item
            v-if="item.prize_type==='1'"
            label="派送方式"
            :prop="'pan_list.' + index + '.send_type'"
            :rules="awardsRules.send_type"
          >
            <el-radio v-model="item.send_type" label="1">快递派送</el-radio>
            <el-radio v-model="item.send_type" label="2">线下自提</el-radio>
            <el-button v-show="item.send_type==='2'" type="text" @click="handleToZtAddress">去设置</el-button>
          </el-form-item>
          <!--实物礼品 结束-->
          <!--积分奖励 开始 prize_type === ‘3’-->
          <el-form-item
            v-if="item.prize_type==='3'"
            label="赠送积分"
            :prop="'pan_list.' + index + '.prize_points'"
            :rules="awardsRules.prize_points"
          >
            <el-input v-model="item.prize_points" placeholder="请填写赠送的积分值"></el-input>
          </el-form-item>
          <!--积分奖励 结束-->
          <!--优惠券 开始 prize_type === ‘5’-->
          <el-form-item
            v-if="item.prize_type==='5'"
            label="选择优惠券"
            :prop="'pan_list.' + index + '.coupon_id'"
            :rules="awardsRules.coupon_id"
          >
            <el-select v-model="item.coupon_id" placeholder="选择优惠券">
              <el-option
                v-for="item in genaralDiscountList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!--优惠券 结束-->
          <!--兑换码 开始 prize_type === ‘6’-->
          <template v-if="item.prize_type==='6'">
            <el-form-item
              label="来源"
              :prop="'pan_list.' + index + '.redeem_source'"
              :rules="awardsRules.redeem_source"
            >
              <el-radio v-model="item.redeem_source" label="1">通用兑换码</el-radio>
              <el-radio v-model="item.redeem_source" label="2">从码池中调取</el-radio>
            </el-form-item>
            <el-form-item
              v-if="item.redeem_source==='1'"
              label="通用兑换码"
              :prop="'pan_list.' + index + '.redeem_name'"
              :rules="awardsRules.redeem_name"
            >
              <el-input v-model="item.redeem_name" placeholder="如: E2132123342"></el-input>
              <p style="font-size: 12px; color: #999;">中奖人中此奖项后，直接展示此兑换码，所有人看到的兑换码一样。</p>
            </el-form-item>
            <template v-if="item.redeem_source==='2'">
              <el-form-item
                label="选择码池"
                :prop="'pan_list.' + index + '.code_pool_id'"
                :rules="awardsRules.code_pool_id"
              >
                <el-select v-model="item.code_pool_id" placeholder="选择码池">
                  <el-option
                    v-for="item in genaralDiscountList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <el-button type="text" style="margin-left: 10px;">码池管理</el-button>
                <p style="font-size: 12px; color: #999;">中奖人中此奖项后，调取码池中的兑换码，若码池中兑换码不足，可选择手动发码。</p>
              </el-form-item>
            </template>
          </template>
          <!--兑换码 结束-->
          <el-form-item
            label="奖品名称"
            :prop="'pan_list.' + index + '.prize_name'"
            :rules="awardsRules.prize_name"
          >
            <el-input v-model="item.prize_name" placeholder="长度不超过15个汉字或字母"></el-input>
          </el-form-item>
          <el-form-item label="奖品图片" required class="turnplate-bg-wrapper">
            <el-upload
              class="avatar-uploader"
              :action="action"
              :show-file-list="false"
              :on-success="handleAwardImageSuccess"
              :before-upload="beforeImageUpload"
            >
              <img v-if="item.prize_image" :src="item.prize_image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <el-button size="small" type="primary" @click="getListIndex(item)">上传图片</el-button>
              <div slot="tip" class="el-upload__tip">
                <p>1、图片尺寸建议：200px200px;</p>
                <p>2、支持JPG、PNG格式的图片，图片不能大于2M。</p>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item
            label="奖品数量"
            :prop="'pan_list.' + index + '.prize_num'"
            :rules="awardsRules.prize_num"
          >
            <el-input type="number" :min="0" v-model="item.prize_num" placeholder="为0, 则中奖概率为0"></el-input>
          </el-form-item>
          <el-form-item
            label="中奖概率"
            :prop="'pan_list.' + index + '.prize_rate'"
            :rules="awardsRules.prize_rate"
          >
            <el-input
              style="width: 140px; margin-right: 10px;"
              type="number"
              :min="0"
              v-model="item.prize_rate"
              placeholder="小于100整数"
            >
              <template slot="append">%</template>
            </el-input>
            <span>所有奖项总中奖率不可超过100%</span>
          </el-form-item>
          <p class="tip">此活动可设置1-8个奖品，且至少包含一个“谢谢参与"</p>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { imageUploadUrl } from '@/api/mallapp/config'
import { getAwardsSelectList } from '@/api/mallapp/active/turnplate'
import { getCouponList } from '@/api/mallapp/plugin/coupon'

export default {
  data () {
    return {
      action: imageUploadUrl,
      editableTabsValue: '1',
      currentUploadIndex: '-1',
      awardsList: [],
      genaralDiscountList: [],
      awardsRules: {
        prize_type: [{ required: true, message: '请选择奖品类型', trigger: 'blur' }],
        prize_name: [{ required: true, message: '请输入奖品名称', trigger: 'blur' }],
        prize_num: [{ required: true, message: '请输入奖品数量', trigger: 'blur' }],
        prize_rate: [{ required: true, message: '请输入小于100整数', trigger: 'blur' }],
        send_type: [{ required: true, message: '请选择派送方式', trigger: 'blur' }],
        prize_points: [{ required: true, message: '请填写赠送的积分值', trigger: 'blur' }],
        coupon_id: [{ required: true, message: '选择优惠券', trigger: 'blur' }],
        redeem_source: [{ required: true, message: '请选择兑换码来源', trigger: 'blur' }],
        redeem_name: [{ required: true, message: '请填写通用兑换码', trigger: 'blur' }],
        code_pool_id: [{ required: true, message: '请选择码池', trigger: 'blur' }]
      }
    }
  },
  created () {
    this._getAwardsSelectList()
    this.awardSettingForm.pan_list.forEach((item, index) => {
      this.awardSettingForm.pan_list[index].index = index + 2 + ''
    })
    this.tabIndex = this.awardSettingForm.pan_list.length + 1
    getCouponList({ current_page: 1, page_size: 50 }).then(res => {
      this.genaralDiscountList = res.data.list
    })
  },
  computed: {
    ...mapGetters(['awardSettingForm'])
  },
  methods: {
    handleTabsEdit (targetName, action) {
      if (action === 'add') {
        if (this.awardSettingForm.pan_list.length >= 7) {
          return
        }
        let newTabName = ++this.tabIndex + ''
        this.awardSettingForm.pan_list.push({ // 奖项
          index: newTabName,
          prize_type: '1', // 奖品类型: [{id: "1",msg: "实物礼品"}, {id: "2", msg: "再来一次"},{id: "3", msg: "积分奖励"}, {id: "4", msg: "虚拟商品"}, {id: "5", msg: "优惠券"}, {id: "6", msg: "兑换码"}]
          prize_name: '新奖项', // 奖品名称
          turnplate_prize_id: '', // 奖项id， 为空 ‘’ 代表新增
          prize_image: 'http://dkd-oss-image.oss-cn-hangzhou.aliyuncs.com/turnplate/turnplat_git.png', // 奖品图片
          prize_num: '', // 奖品数量
          prize_rate: '', // 中奖概率
          coupon_id: '', // 优惠券id
          redeem_source: '1', // 兑换码来源： ‘1’ 通用兑换码 ‘2’从码池中调取
          redeem_name: '', // 通用兑换码： 如: E2132123342
          redeem_code_explain: '', // 兑换说明
          code_pool_id: '', // 码池id
          send_type: '1', // 派送方式： ‘1’ 快递派送 ‘2’ 线下自提
          prize_points: '', // 赠送积分
          bsd_coupon_id: '' // 虚拟商品id
        })
        this.editableTabsValue = newTabName
      }
      if (action === 'remove') {
        if (this.awardSettingForm.pan_list.length === 1) {
          this.$message({
            type: 'warning',
            message: '至少保留一个奖项'
          })
          return
        }
        let tabs = this.awardSettingForm.pan_list
        let activeName = this.editableTabsValue
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.index === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.index
              }
            }
          })
        }

        this.editableTabsValue = activeName
        this.awardSettingForm.pan_list = tabs.filter(tab => tab.index !== targetName)
      }
      if (this.awardSettingForm.pan_list.length === 0) {
        this.editableTabsValue = '1'
      }
    },
    beforeImageUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt50KB = file.size / 1024 < 2048
      if (!(isJPG || isPNG)) {
        this.$message.error('上传图片只能是JPG或者PNG格式!')
      }
      if (!isLt50KB) {
        this.$message.error('上传图片大小不能超过 2M!')
      }
      return isLt50KB && (isJPG || isPNG)
    },
    // 谢谢参与图片上传
    handleImageSuccess (res, file) {
      this.awardSettingForm.thank_join.award_pic_id = res.data.file_id
      this.awardSettingForm.thank_join.award_pic = URL.createObjectURL(file.raw)
    },
    getListIndex (item) {
      this.currentUploadIndex = item.index
    },
    // 奖项图片上传
    handleAwardImageSuccess (res, file) {
      let index = this._findIndex(this.awardSettingForm.pan_list, this.currentUploadIndex)
      this.awardSettingForm.pan_list[index].prize_image_id = res.data.file_id
      this.awardSettingForm.pan_list[index].prize_image = URL.createObjectURL(file.raw)
    },
    handleToZtAddress () {
      this.$emit('toZtAddress')
    },
    _getAwardsSelectList () {
      getAwardsSelectList().then(res => {
        this.awardsList = res.data
      })
    },
    _findIndex (list, val) {
      return list.findIndex(item => item.index === val
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.tip {
  font-size: 14px;
  line-height: 28px;
  color: #999;
}
</style>
