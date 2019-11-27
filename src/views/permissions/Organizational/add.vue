<template>
  <div class="margin">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="260px" size="small">
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <el-page-header @back="back" content="组织架构信息"></el-page-header>
          </div>
        </div>
      </div>
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper">
            <h4 class="title">组织架构信息</h4>
            <br />
            <el-form-item label="组织架构名称：" prop="organizeName">
              <el-input v-model="ruleForm.organizeName" placeholder="请输入内容" style="width:600px;"></el-input>
            </el-form-item>
            <el-form-item label="上级部门：" prop="father">
              <treeselect
                style="width:350px"
                :options="options"
                search-nested
                placeholder="请选择上级组织架构"
                v-model="ruleForm.parentId"
              />
            </el-form-item>
            <el-form-item label="描述：" prop="details">
              <el-input
                style="width:600px"
                type="textarea"
                :rows="5"
                placeholder="请输入简单描述"
                v-model="ruleForm.description"
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
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import {
  getAllOrganizational,
  addOrganizational,
  getidOrganizational,
  editorOrganizational
} from "@/api/permissions/index";

export default {
  data() {
    return {
      ruleForm: {
        organizeName: "",
        description: "",
        parentId: null,
        organizeId: null
      },
      options: [],
      id: "",
      rules: {
        organizeName: [
          { required: true, message: "请输入组织架构名称", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    getAllOrganizational().then(res => {
      let arr = [];
      arr.push(res.data);
      this.transleteData(arr, this.options);
      this.IterationDelateMenuChildren(this.options);
    });
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      const  parentName = this.$route.query.parentName;
      getidOrganizational(this.id).then(res => {
       if(parentName !==null){
         this.ruleForm.parentId = res.data.parentId;
       }
        this.ruleForm.organizeName = res.data.organizeName;
        this.ruleForm.description = res.data.description;
        this.ruleForm.organizeId = res.data.organizeId;
      });
    }
  },
  mounted() {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.id) {
            editorOrganizational(this.ruleForm).then(res => {
              if (res.code == 200) {
                this.$router.push({ name: "Permissions" });
              }
            });
          } else {
            addOrganizational(this.ruleForm).then(res => {
              if (res.code == 200) {
                this.$router.push({ name: "Permissions" });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    resetForm() {
      (this.ruleForm.organizeName = ""),
        (this.ruleForm.description = ""),
        (this.ruleForm.parentId = null),
        (this.ruleForm.organizeId = null);
    },
    transleteData(data, arr) {
      data.forEach(item => {
        if (!item.parentId) {
          item.parentId = 0;
          item.parentName = "所有部门";
        }
        const msg = {
          id: item.organizeId,
          label: item.organizeName,
          value: item.organizeId,
          children: item.childNodes ? [] : null,
          isLeaf: item.childNodes ? false : true
        };
        if (item.childNodes && item.childNodes.length > 0) {
          this.transleteData(item.childNodes, msg.children);
        }
        arr.push(msg);
      });
      return arr;
    },
    IterationDelateMenuChildren(arr) {
      if (arr.length) {
        for (let i in arr) {
          if (arr[i].children.length) {
            this.IterationDelateMenuChildren(arr[i].children);
          } else {
            delete arr[i].children;
          }
        }
      }
      return arr;
    }
  },
  components: {
    Treeselect
  }
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
.typeadd {
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
  .operation {
    margin-top: 30px;
    margin-left: 450px;
  }
}
</style>
