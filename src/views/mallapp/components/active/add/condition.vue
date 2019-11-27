<template>
  <el-form
    :model="conditionForm"
    :rules="conditionRules"
    ref="setsecond"
    label-width="120px"
    size="small"
  >
    <el-form-item prop="active_type" label="活动模式">
      <el-radio v-model="conditionForm.active_type" label="1">积分商城活动</el-radio>
      <el-radio v-model="conditionForm.active_type" label="2">独立活动工具</el-radio>
    </el-form-item>
    <p v-show="conditionForm.active_type==='1'">
      <el-form-item prop="integral" label="消耗积分">
        <el-input type="number" :min="1" v-model="conditionForm.integral" placeholder="请输入积分数"></el-input>
      </el-form-item>
      <el-form-item label="限制次数">
      <el-input
        type="number"
        style="width: 300px;margin-right: 10px"
        :min="0"
        v-model="conditionForm.limit_num"
        placeholder="不填默认为无限次"
      ></el-input>
      <span>次/每天</span>
    </el-form-item>
      <el-form-item label="免费次数">
        <el-input
          type="number"
          style="width: 300px;margin-right: 10px"
          :min="0"
          v-model="conditionForm.free_num"
          placeholder="请输入免费次数"
        ></el-input>
        <span>次/每天</span>
      </el-form-item>
    </p>
    <el-form-item prop="share_reward_open" label="好友助力">
      <el-radio v-model="conditionForm.share_reward_open" label="0">关闭</el-radio>
      <el-radio v-model="conditionForm.share_reward_open" label="1">分享奖励</el-radio>
    </el-form-item>
    <p v-show="conditionForm.share_reward_open==='1'">
      <el-form-item>
        <span>用户分享成功后,抽奖次数增加</span>
        <el-input
          type="number"
          style="width: 80px;margin: 0 10px"
          :min="0"
          v-model="conditionForm.share_reward_num"
          placeholder="次数"
        ></el-input>
        <span>次</span>
      </el-form-item>
      <el-form-item>
        <span>且限制</span>
        <el-select style="width: 80px;margin: 0 10px" v-model="conditionForm.share_reward_type">
          <el-option label="每天" value="1"></el-option>
          <el-option label="永久" value="2"></el-option>
        </el-select>
        <span>只可获得一次奖励</span>
      </el-form-item>
    </p>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      conditionRules: {
        active_type: [{ required: true, message: '请选择活动模式', trigger: 'blur' }],
        integral: [{ required: true, message: '请输入积分数', trigger: 'blur' }],
        host: [{ required: true, message: '请输入主办单位', trigger: 'blur' }],
        prize: [{ required: true, message: '请输入活动奖品', trigger: 'blur' }],
        explain: [{ required: true, message: '请输入活动奖品', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['conditionForm'])
  }
}
</script>
