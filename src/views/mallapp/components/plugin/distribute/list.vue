<template>
  <div class="mcard">
    <el-form
      :model="form"
      ref="form"
      size="medium"
      :rules="formRules"
      class="form"
      label-width="200px"
    >
      <el-form-item prop="title" label="面值" required>
        <el-input
          type="number"
          v-model="form.title"
          placeholder="输入1～30000的数字"
          min="1"
          max="999999"
        >
          <template slot="append">积分</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="user" label="选择">
        <el-radio v-model="modle" label="1">用户列表</el-radio>
        <el-radio v-model="modle" label="2">用户组</el-radio>
      </el-form-item>
      <el-form-item>
        <el-transfer
          filterable
          v-model="form.user"
          :data="transferData"
          :props="transferProp"
          :titles="titles"
        ></el-transfer>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="form.message">短信通知</el-checkbox>
        <span class="tip">短信签名为【开发工行积分商城】，短信签名请在会员管理中心设置</span>
      </el-form-item>
      <el-form-item prop="remark" label="备注">
        <el-input v-model="form.remark" placeholder="选填，可简要说明操作说明"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserList, addDistr } from '@/api/mallapp/plugin/distribute'
import { getUserGroup } from '@/api/mallapp/user/index'

export default {
  name: 'DistributeList',
  data () {
    var checkTitle = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入面值'))
      }
      if (!Number.isInteger(Number(value))) {
        return callback(new Error('请输入整数值'))
      }
      if (value > 30000 || value < 1) {
        return callback(new Error('请输入1～999999的数字'))
      }
      callback()
    }
    return {
      modle: '1',
      form: {
        title: null, // 面值
        message: false, // 短信通知
        user: [], // 已选用户id 数组（[1321232123，321321321，321323213]）
        remark: '' // 备注
      },
      formRules: {
        title: [{ required: true, validator: checkTitle, trigger: 'blur' }],
        user: [{ required: true, message: '请选择用户', trigger: 'blur' }]
      },
      transferData: [

      ],
      userList: [],
      groupList: [],
      titles: ['用户列表', '已选用户'],
      transferProp: {}
    }
  },
  created () {
    this._getUserList()
    this._getUserGroup()
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form)
          this._addDistr()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    search () {
      if (this.keyword) {
        this._getUserList()
      }
    },
    _getUserGroup () {
      getUserGroup().then(res => {
        this.groupList = res.data
      })
    },
    _getUserList () {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getUserList().then(res => {
        loading.close()
        this.userList = res.data
      })
    },
    _toggle () {
      if (this.modle === '1') {
        // 用户列表
        this.titles = ['用户列表', '已选用户']
        this.transferProp = { key: 'userid', label: 'phone' }
        this.transferData = this.userList.slice()
      } else {
        // 用户组
        this.titles = ['用户组', '已选组']
        this.transferProp = { key: 'user_tag_id', label: 'group_name' }
        this.transferData = this.groupList.slice()
      }
    },
    _addDistr () {
      this.$confirm(`您确认发放给这${this.form.user.length}位用户？`, '确认发放', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let loading = this.$loading({
          background: 'rgba(255,255,255,0.1)',
          text: '加载中，请稍后...'
        })
        let form = {}
        form.title = this.form.title
        form.message = this.form.message
        form.remark = this.form.remark
        if (this.modle === '1') {
          form.user = this.form.user
        } else {
          form.group = this.form.user
        }
        addDistr(form).then(res => {
          loading.close()
          // 返回成功
          // 判断页面跳转
          this.$confirm(`发放完成,积分已发送给用户`, '提示', {
            confirmButtonText: '查看发放记录',
            cancelButtonText: '查看详情',
            type: 'success'
          }).then(() => {
            this.$router.push({ path: '/mplugin/distribute' })
          }).catch(() => {
            this.$router.push({ path: `/mplugin/distribute_log/${res.data.id}` })
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消分发'
        })
      })
    }
  },
  watch: {
    modle (va) {
      this._toggle()
    },
    userList () {
      this.titles = ['用户列表', '已选用户']
      this.transferProp = { key: 'userid', label: 'phone' }
      this.transferData = this.userList.slice()
      this.modle = '1'
    }
  }
}
</script>

<style lang='scss' scoped>
.form {
  width: 850px;
  .tip {
    display: block;
    color: #999;
  }
}
</style>
