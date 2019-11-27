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
            <h4 class="title">礼包信息</h4>
            <br />
            <div>
              <el-form-item label="活动时间：" required>
                <div style="width:600px">
                  <el-col :span="11">
                    <el-form-item prop="startTime">
                      <el-date-picker
                        type="date"
                        placeholder="请选择开始时间"
                        v-model="data.startTime"
                        format="yyyy-MM-dd"
                        :picker-options="pickerOptions0"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="1" style="text-align:center">-</el-col>
                  <el-col :span="11">
                    <el-form-item prop="endTime">
                      <el-date-picker
                        placeholder="请选择结束时间"
                        v-model="data.endTime"
                        format="yyyy-MM-dd"
                        :picker-options="pickerOptions0"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="date"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </div>
              </el-form-item>
            </div>
            <el-form-item label="主题名称：" prop="topicName">
              <el-input placeholder="主题名称：" style="width:600px" v-model="data.topicName"></el-input>
            </el-form-item>
            <el-form-item label="主题描述：" prop="describe">
              <el-input
                type="textarea"
                :rows="2"
                style="width:600px"
                placeholder="请输入主题描述"
                v-model="data.description"
              ></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-radio v-model="data.gradeType" :label="0">无分类</el-radio>
              <el-radio v-model="data.gradeType" :label="1">一级分类</el-radio>
              <el-radio v-model="data.gradeType" :label="2">二级分类</el-radio>
            </el-form-item>
            <el-form-item>
              <div>
                <el-button type="danger" @click="resetForm" size="small">重置</el-button>
                <el-button type="primary" @click="submitForm('form')" size="small">确定</el-button>
              </div>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import {
  topicsave,
  topicfindbyid,
  topicupdate,
  typefindall,
  categoryfindall
} from "@/api/giftvolume/index";

export default {
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      title_txt: "新增礼包",
      data: {
        topicName: "",
        description: "",
        startTime: "",
        endTime: "",
        gradeType: 0,
        topicType: 3,
      },
      options2:[],
      rules: {
        topicName: [{ required: true, message: "请输入名称", trigger: "blur" }],
        description: [{ required: true, message: "请输入描述", trigger: "blur" }],
        startTime: [{ required: true, message: "请选择开始时间", trigger: "change" }],
        endTime: [{ required: true, message: "请选择结束时间", trigger: "change" }],
      }
    };
  },
  created() {
    if (this.$route.query.id) {
      this.title_txt = "编辑主题";
      this.topicfindbyid(this.$route.query.id);
    }
  },
  mounted() {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    async topicfindbyid(id) {
      const { data } = await topicfindbyid(id);
      this.data = data;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let data;
          if (this.$route.query.id) {
            let obj = this.data
            obj.topicId = this.$route.query.id;
            data = await topicupdate(obj);
          } else {
            data = await topicsave(this.data);
          }
          if (data.code == 200) {
            this.$message({
              message: data.message,
              type: "success"
            });
            this.back();
          }
        } else {
          return false;
        }
      });
    },
    resetForm() {
      if (this.$route.query.id) {
        this.topicfindbyid(this.$route.query.id);
      } else {
        this.$refs.form.resetFields();
      }
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
