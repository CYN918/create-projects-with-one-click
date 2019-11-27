<template>
  <div class="margin">
    <el-form ref="form" :model="data" :rules="rules" label-width="260px" size="small">
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <el-page-header @back="back" :content="title_txt"></el-page-header>
          </div>
        </div>
      </div>
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper">
            <h4 class="title">商品品牌信息</h4>
            <br />
            <el-form-item label="品牌名称：" prop="name">
              <el-input placeholder="请输入品牌名称" style="width:600px" v-model="data.name"></el-input>
            </el-form-item>
            <el-form-item label="品牌网址：" prop>
              <el-input class v-model="data.url" style="width:600px"></el-input>
            </el-form-item>
            <el-form-item prop="brandLogo" label="品牌LOGO:" class>
              <el-upload
                class="avatar-uploader"
                :action="action"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="data.logo" :src="data.logo " class="avatar imgbig" />
                <el-button v-if="!data.logo" size="small" type="info">选择文件</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="品牌banner：" prop="brandBanner">
              <el-upload
                class="avatar-uploader"
                :action="action"
                :show-file-list="false"
                :on-success="handleAvatarSuccess1"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="data.banner" :src="data.banner" class="avatar imgbig" />
                <el-button v-if="!data.banner" size="small" type="info">选择文件</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="品牌描述：" prop="brandDesc">
              <el-input
                type="textarea"
                :rows="2"
                style="width:600px"
                placeholder="请输入内容"
                v-model="data.textarea"
              ></el-input>
            </el-form-item>
            <el-form-item label="排序：">
              <el-input style="width:600px" v-model="data.sort"></el-input>
            </el-form-item>
            <el-form-item label="是否显示：" prop="isShow">
              <el-radio v-model="data.radio" label="1">是</el-radio>
              <el-radio v-model="data.radio" label="0">否</el-radio>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')" size="small">确定</el-button>
              <el-button type="primary" @click="resetForm" size="small">重置</el-button>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { addBrand, editBrand, obtainBrand } from "@/api/product/index";

export default {
  data() {
    return {
      title_txt: "新增商品品牌",
      action: "",
      data: {
        name: "",
        url: "",
        textarea: "",
        sort: "",
        logo: "",
        banner: "",
        radio: "1"
      },

      textarea: "",
      rules: {
        name: [{ required: true, message: "请输入品牌名称", trigger: "blur" }]
      }
    };
  },
  created() {
    if (this.$route.query.id) {
      this.title_txt = "编辑商品品牌";
      this.id = this.$route.query.id;
      obtainBrand(this.id).then(res => {
        this.data.url = res.data.webUrl;
        this.data.name = res.data.brandName;
        this.data.textarea = res.data.brandDesc;
        this.data.sort = res.data.sortOrder;
        this.data.logo = res.data.brandLogo;
        this.data.banner = res.data.brandBanner;
        this.data.radio = JSON.stringify(res.data.isShow);
      });
    }
  },
  mounted() {
    this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    handleAvatarSuccess(res, file) {
      this.data.logo = res.data.domain + res.data.filePath;
    },
    handleAvatarSuccess1(res, file) {
      this.data.banner = res.data.domain + res.data.filePath;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.id) {
            editBrand(
              this.data.name,
              this.data.sort,
              this.data.textarea,
              this.data.url,
              this.id,
              this.data.logo,
              this.data.banner,
              this.data.radio
            ).then(res => {
              if (res.code == 200) {
                this.$router.push({ name: "ProductBrand" });
              }
            });
          } else {
            addBrand(this.data).then(res => {
              if (res.code == 200) {
                this.$router.push({ name: "ProductBrand" });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.data.name = "";
      this.data.url = "";
      this.data.textarea = "";
      this.data.sort = "";
      this.data.logo = "";
      this.data.banner = "";
      this.data.radio = "1";
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.goods-fitter {
  .vender {
    ul {
      li {
        float: left;
        height: 41px;
        padding: 0 10px;
        line-height: 41px;
        text-align: center;
        border: 1px solid transparent;
        font-size: 16px;
        color: #333;
        cursor: pointer;
        &.active {
          border: 1px solid #d7e0f1;
          border-bottom: 0;
          background-color: #fff;
          position: relative;
          position: relative;
          &:after {
            position: absolute;
            content: "";
            left: 0;
            bottom: -1px;
            height: 1px;
            width: 100%;
            background: #fff;
          }
        }
        .image {
          display: inline-block;
          width: 30px;
          margin-right: 10px;
          font-size: 0;
          line-height: 40px;
          vertical-align: top;
          img {
            width: 100%;
            vertical-align: middle;
          }
        }
      }
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
.item {
  line-height: 1.5;
  padding: 8px 10px;
  cursor: pointer;
  &:hover {
    color: $themeColor;
  }
  &.active {
    background: #c6e2ff;
    color: #fff;
  }
}
.image {
  cursor: pointer;
}
.item-name {
  cursor: pointer;
  &:hover {
    color: $themeColor;
  }
}
.el-icon-arrow-right {
  margin: 0 20px;
}
.store {
  width: 310px;
}
.red {
  color: $themeSubColor;
}
.transfer-wrapper {
  text-align: center;
}
.panel-wrapper {
  text-align: left;
  margin: 0;
  padding: 6px 0;
  list-style: none;
  height: 246px;
  overflow: auto;
  box-sizing: border-box;
}
.dialog-footer {
  margin-top: 20px;
  text-align: right;
}
.btn {
  margin-left: 20px;
}
.caiji {
  color: red;
}
.gaunjianzi {
  margin-left: 20px;
  color: red;
}
.danwei {
  margin-left: 10px;
}
.introduce {
  color: #97999f;
  font-size: 90%;
}
.search-wrapper1 {
  padding: 20px;
  border: 1px solid rgb(215, 224, 241);
  background: #fff;
  display: flex;
  align-items: center;
  .title1 {
    display: flex;
    margin-left: 20%;
  }
}
.imgbig {
  width: 100px;
  height: 100px;
}
</style>
