<template>
  <el-form
    :model="baseSettingForm"
    :rules="baseSettingRules"
    ref="setfisrt"
    label-width="120px"
    size="small"
  >
    <el-form-item prop="name" label="活动标题" :class="currentIndex === 0 ? 'hight-active' : ''">
      <el-input v-model="baseSettingForm.name" placeholder="请输入15个字以内的字符"></el-input>
    </el-form-item>
    <el-form-item prop="time" label="有效期" :class="currentIndex === 3 ? 'hight-active' : ''">
      <el-date-picker
        v-model="baseSettingForm.time"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy-MM-dd hh:mm:ss"
        value-format="yyyy-MM-dd hh:mm:ss"
      ></el-date-picker>
    </el-form-item>
    <el-form-item prop="join_num" label="参与人数">
      <el-radio v-model="baseSettingForm.join_num.isshow" label="1">隐藏</el-radio>
      <el-radio v-model="baseSettingForm.join_num.isshow" label="2">显示</el-radio>
      <p v-show="baseSettingForm.join_num.isshow==='2'">
        <span>在实际参与人数基础上增加</span>
        <el-input
          type="number"
          style="width: 60px; text-align: center; margin: 0 10px;"
          :min="0"
          v-model="baseSettingForm.join_num.num"
        ></el-input>
        <span>人</span>
        <span>(只展示不计入统计)</span>
      </p>
    </el-form-item>
    <el-form-item prop="host" label="主办单位" :class="currentIndex === 4 ? 'hight-active' : ''">
      <el-input v-model="baseSettingForm.host" placeholder="请输入主办单位"></el-input>
    </el-form-item>
    <el-form-item prop="prize" label="活动奖品" :class="currentIndex === 5 ? 'hight-active' : ''">
      <el-input
        type="textarea"
        v-model="baseSettingForm.prize"
        placeholder="请输入活动奖品"
        :autosize="{ minRows: 5, maxRows: 6}"
      ></el-input>
    </el-form-item>
    <el-form-item prop="explain" label="活动说明" :class="currentIndex === 6 ? 'hight-active' : ''">
      <el-input
        type="textarea"
        v-model="baseSettingForm.explain"
        placeholder="请输入活动说明"
        :autosize="{ minRows: 4, maxRows: 6}"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    const checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入活动标题'))
      }
      let len = value.length
      // eslint-disable-next-line no-control-regex
      var cnChar = value.match(/[^\x00-\x80]/g)
      if (cnChar != null) {
        len += cnChar.length
      }
      if (len > 18) {
        return callback(new Error('长度不超过15个汉字或30个英文字母'))
      }
      callback()
    }
    return {
      baseSettingRules: {
        name: [{ required: true, validator: checkName, trigger: 'blur' }],
        time: [{ required: true, message: '请输入有效期', trigger: 'blur' }],
        host: [{ required: true, message: '请输入主办单位', trigger: 'blur' }],
        prize: [{ required: true, message: '请输入活动奖品', trigger: 'blur' }],
        explain: [{ required: true, message: '请输入活动奖品', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['baseSettingForm', 'currentIndex'])
  }
}
</script>
