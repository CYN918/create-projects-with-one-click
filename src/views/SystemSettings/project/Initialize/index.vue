<template>
  <div class="margin" v-loading="loading">
    <div class="mcard">
      <div class="title">数据库配置</div>
      <el-form ref="form" :model="databaseConfig" :rules="rules" label-width="150px" class="form-wrapper">
        <el-form-item label="数据库类型：" prop="dbType">
          <el-radio-group v-model="databaseConfig.dbType">
            <el-radio :label="0">MySQL</el-radio>
            <el-radio :label="1">MongoDb</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="数据库IP地址：" prop="dbIp">
          <el-input v-model="databaseConfig.dbIp" placeholder="请输入昵称" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="数据库端口号：" prop="dbPort">
          <el-input v-model="databaseConfig.dbPort" placeholder="请输入昵称" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="数据库用户名：" prop="dbUsername">
          <el-input v-model="databaseConfig.dbUsername" placeholder="请输入昵称" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="数据库密码：" prop="dbPassword">
          <el-input
            v-model="databaseConfig.dbPassword"
            placeholder="请输入昵称"
            type="password"
            size="medium"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-submit" type="primary" @click="submitForm">保 存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  findDatabaseConfig,
  editDatabaseConfig
} from "@/api/systemsettings/index";
import encryption from "@/common/js/encryption";

export default {
  name: "SelfSetting",
  data() {
    return {
      loading: true,
      databaseConfig: {},
      rules: {
        dbIp: [{ required: true, message: "请选择分享图片" }],
        dbPort: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        dbUsername: [{ required: true, message: "请选择性别", trigger: "change" }],
        dbPassword: [{ required: true, message: "请选择生日", trigger: "change" }]
      }
    };
  },
  methods: {
    /**
     * 加载数据库配置
     */
    async findDatabaseConfig() {
      const { data } = await findDatabaseConfig();
      this.databaseConfig = data;
    },

    /**
     * 提交表单
     */
    submitForm() {
      this.$refs.form.validate(valid => {
        if (!valid) return false;

        this.editDatabaseConfig();
      });
    },

    async editDatabaseConfig() {
      const { data } = await findDatabaseConfig();
      const params = {
        dbIp: this.databaseConfig.dbIp,
        dbPort: this.databaseConfig.dbPort,
        dbUsername: this.databaseConfig.dbUsername,
        dbPassword: encryption.encrypt(
          this.databaseConfig.dbPassword,
          "_fuyuanai@Maige_"
        )
      };

      if (data.dbPassword == this.databaseConfig.dbPassword) {
        delete params.dbPassword
      }

      await editDatabaseConfig(this.databaseConfig.id, params);
      this.$message({
        type: "success",
        message: "修改成功!"
      });
    }
  },
  async mounted() {
    await this.findDatabaseConfig();
    this.loading = false;
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.form-wrapper {
  margin-top: 30px;
  width: 600px;
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .input {
    width: 217px;
  }
  .btn-submit {
    margin-top: 20px;
  }
}
.margin {
  margin-top: 0 !important;
  padding-left: 0 !important;
  border: 1px solid rgba(214, 222, 239, 1);
}
</style>
