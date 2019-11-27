<template>
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <div class="search-wrapper1">
          <el-page-header @back="back" :content="text"></el-page-header>
        </div>
      </div>
    </div>
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form ref="form" :model="form" label-width="120px" size="small">
          <div class="search-wrapper">
            <h4 class="title">创建模板</h4>
            <br />
            <el-form-item label="模板类型:">
              <el-radio v-model="radio" label="2">PC版</el-radio>
              <el-radio v-model="radio" label="3">H5版</el-radio>
              <el-radio v-model="radio" label="1">APP版</el-radio>
            </el-form-item>
            <!-- 模板名称,排序,介绍,缩略图 -->
            <el-form-item label="模板名称:">
              <el-input v-model="form.templateName" style="width:700px" placeholder="请输入模板名称"></el-input>
            </el-form-item>
            <el-form-item label="模板排序:">
              <el-input v-model="form.sortOrder" placeholder="请输入模板排序" style="width:700px"></el-input>
            </el-form-item>
            <el-form-item label="模板介绍:">
              <el-input
                type="textarea"
                :rows="4"
                v-model="form.introduction"
                style="width:700px"
                placeholder="请输入介绍内容"
              ></el-input>
            </el-form-item>
            <el-form-item label="封面图:">
              <el-upload
                class="avatar-uploader"
                :action="action"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <img v-if="form.coverImg" :src="form.coverImg" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mbottom">
      <div class="goods-fitter">
        <div class="btn">
          <el-button type="primary" @click="nextcreate" size="small">下一步</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getBoardListByid} from "@/api/service";

export default {
  name: "addBoard",
  data() {
    return {
      radio: "1",
      form: {
        coverImg: "", //封面
        templateName: "", //名称
        introduction: "", //介绍
        sortOrder: "", //排序

        templateId: ""
      },
      action: "", //图片上传地址
      text: "服务中心 > 模板管理 > 创建模板"
    };
  },
  created() {
    this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
    this.form.templateId = this.$route.query.templateId;
    this.isEdit();
  },
  computed: {},
  methods: {
    //下一步
    nextcreate() {},

    isEdit() {
      if (this.form.templateId) {
        this.text = "模板管理 > 编辑";
        // this.templateId = this.$route.query.templateId;
        getBoardListByid(this.form.templateId).then(res => {
          console.log(555, res);
          this.form = Object.assign({}, res.data);
        });
      }
    },
    //上传
    handleAvatarSuccess(res, file) {
      console.log(333, file);
      this.form.coverImg = res.data.domain + res.data.filePath;
    },
    //返回
    back() {
      this.$router.go(-1);
    },
    //提交
    // submitForm() {
    //   //验证
    //   //数据处理
    //   console.log(2222);
    //   if (this.form.templateId) {
    //     let data = Object.assign({}, this.form);
    //     putServiceList(data).then(res => {
    //       if (res.code == 200) {
    //         this.$message({
    //           message: res.message,
    //           type: "success"
    //         });
    //         this.$router.push({ name: "Service" });
    //       } else {
    //         this.$message.error(res.message);
    //       }
    //     });
    //   } else {
    //     let data = Object.assign({}, this.form);
    //     postServiceList(data).then(res => {
    //       console.log(3333);

    //       if (res.code == 200) {
    //         this.$message({
    //           message: res.message,
    //           type: "success"
    //         });
    //         this.$router.push({ name: "Service" });
    //       } else {
    //         this.$message.error(res.message);
    //       }
    //     });
    //   }
    // }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.goods-fitter {
  .search-wrapper1 {
    padding: 20px;
    border: 1px solid rgb(215, 224, 241);
    background: #fff;
    display: flex;
    align-items: center;
    .title1 {
      display: flex;
      margin-left: 35%;
    }
  }
  .search-wrapper {
    padding: 20px;
    border: 1px solid rgb(215, 224, 241);
    background: #fff;
    .title {
      margin-left: -20px;
      font-size: 16px;
      font-weight: 400;
      color: 3333;
      padding-left: 10px;
      line-height: 1.4;
      border-left: 4px solid $themeColor;
      margin-bottom: 10px;
    }
    .search-main {
    }
    .search-base {
    }
  }
  .text-space {
    text-align: center;
    color: #606266;
    font-size: 12px;
  }
  .el-select-width {
    max-width: 130px;
    margin-right: 5px;
  }
  .el-input-width {
    display: inline-block;
    max-width: 180px;
  }
  .btn-toggle {
    margin-left: 10px;
    font-size: 14px;
    color: $themeColor;
    cursor: pointer;
  }
}
.goods-list-wrapper {
  margin-top: 20px;
}
.el-transfer-panel__header {
  background: $themeColor;
  color: #fff;
}

.dialog-footer {
  margin-top: 20px;
  text-align: right;
}
.btn {
  margin-left: 20px;
}

.introduce {
  color: #97999f;
  font-size: 90%;
}
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
  width: 80px;
  height: 80px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 80px;
  height: 80px;
  // display: block;
}
.upload {
  position: absolute;
  margin-left: 60px;
  margin-top: 45px;
}
.tip {
  color: #c5c6cb;
}
.btn {
  margin-left: 42%;
  margin-top: 10px;
}
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
