<template>
  <div class="margin">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="260px" size="small">
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
            <h4 class="title">商品类型信息</h4>
            <br />
            <el-form-item label="商品类型名称" prop="type">
              <el-input v-model="ruleForm.type" placeholder="请输入内容" style="width:600px;"></el-input>
            </el-form-item>
            <el-form-item label="属性分组" prop="type">
              <el-input
                type="textarea"
                style="width:600px;"
                :rows="5"
                placeholder="每行一个商品属性组。排序也将按照自然顺序排序。"
                v-model="textarea"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" size="small">确定</el-button>
              <el-button type="primary" @click="resetForm" size="small">重置</el-button>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { addType, editorType, obtainType } from "@/api/product/index";

export default {
  data() {
    return {
      title_txt: "新增商品类型",
      ruleForm: {
        type: ""
      },
      textarea: "",
      id: "",
      rules: {
        type: [
          { required: true, message: "请输入商品类型名称", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    if (this.$route.query.id) {
      this.title_txt = '编辑商品类型'
      this.id = this.$route.query.id;
      obtainType(this.id).then(res => {
        this.ruleForm.type = res.data.typeName;
        this.textarea = res.data.attrGroup;
      });
    }
  },
  mounted() {},
  methods: {
    back() {
      this.$router.back(-1);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.id) {
            editorType(this.ruleForm.type, this.textarea, this.id).then(res => {
              if (res.code == 200) {
                this.$router.push({ name: "ProductType" });
              }
            });
          } else {
            addType(this.ruleForm.type, this.textarea).then(res => {
              if (res.code == 200) {
                this.$router.push({ name: "ProductType" });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.ruleForm.type = "";
      this.textarea = "";
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
.areadiv {
  display: flex;
  font-size: 14px;
  color: #606266;
  .span_type {
    margin-left: 331px;
    margin-right: 14px;
  }
  .txtarea {
    width: 500px;
  }
}
</style>
