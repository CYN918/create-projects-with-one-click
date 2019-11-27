<template>
  <div class="margin">
    <el-form ref="ruleForm" :model="data" :rules="rules" label-width="260px" size="small">
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <el-button @click="back" type="primary" size="small" icon="el-icon-back">返回</el-button>
            <h4 class="title1">菜单管理信息</h4>
          </div>
        </div>
      </div>
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper">
            <h4 class="title">菜单管理信息</h4>
            <br />
            <el-form-item label="菜单名称:" prop="menuName">
              <el-input v-model="data.menuName" placeholder="请输入内容" style="width:40%"></el-input>
            </el-form-item>
            <el-form-item label="页面菜单URL跳转地址:" prop>
              <el-input v-model="data.pageUrl" placeholder="请输入内容" style="width:40%"></el-input>
            </el-form-item>
            <el-form-item label="菜单接口访问地址:" prop>
              <el-input v-model="data.apiUrl" placeholder="请输入内容" style="width:40%"></el-input>
            </el-form-item>
            <el-form-item label="请求方式:" prop>
              <el-select v-model="data.method" style="width:40%" placeholder="请选择">
                <el-option
                  v-for="item in methodsArr"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="菜单图标(未选中):" prop=''>
              <el-upload
                class="avatar-uploader"
                :action="action"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <img v-if="data.defaultIcon" :src="data.defaultIcon " class="avatar imgbig" />
                <el-button v-if="!data.defaultIcon" size="small" type="info">选择文件</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="菜单图标(选中):" prop=''>
              <el-upload
                class="avatar-uploader"
                :action="action"
                :show-file-list="false"
                :on-success="handleAvatarSuccess2"
              >
                <img v-if="data.selectIcon" :src="data.selectIcon " class="avatar imgbig" />
                <el-button v-if="!data.selectIcon" size="small" type="info">选择文件</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="父节点:" prop>
              <treeselect
                style="width:350px"
                :options="options"
                :searchable="false"
                placeholder="请选择"
                v-model="data.parentId"
              />
            </el-form-item>
            <el-form-item label="排序值:" prop>
              <el-input v-model="data.sort" placeholder="请输入内容" style="width:600px;"></el-input>
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
import {
  addMune,
  getAllMenu,
  editorMune,
  getIdMune
} from "@/api/permissions/index";
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  data() {
    return {
      data: {
        menuName: "", //菜单名称
        defaultIcon: "", //菜单图标URL
        selectIcon:'', //菜单选中url
        apiUrl: "", //菜单跳转路径
        method: "", // http协议请求方法
        parentId: null, //菜单父节点id
        pageUrl: "", //菜单URL
        sort: "" //排序值
      },
      options: [], //父节点树形选择
      textarea: "",
      id: "",
      action: "",
      methodsArr:[
        {name:'GET',value:'GET'},
        {name:'POST',value:'POST'},
        {name:'PUT',value:'PUT'},
        {name:'DELETE',value:'DELETE'},
      ],
      rules: {
        menuName: [
          { required: true, message: "请输入菜单名称", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
    this._getAllMenu();
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      getIdMune(this.id).then(res => {
        this.data.menuName = res.data.menuName;
        this.data.defaultIcon = res.data.defaultIcon;
        this.data.selectIcon = res.data.selectIcon;
        this.data.apiUrl = res.data.apiUrl;
        this.data.method = res.data.method;
        this.data.parentId = res.data.parentId;
        this.data.pageUrl = res.data.pageUrl;
        this.data.sort = res.data.sort;
      });
    }
  },
  mounted() {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    _getAllMenu() {
      getAllMenu().then(res => {
        let arr = [];
        arr.push(res.data);
        this.transleteData(arr, this.options);
        this.IterationDelateMenuChildren(this.options);
      });
    },
    //转化为树形结构可用数据
    transleteData(data, arr) {
      data.forEach(item => {
        const msg = {
          id: item.menuId,
          label: item.menuName,
          value: item.menuId,
          children: item.children ? [] : null
        };
        if (item.children && item.children.length > 0) {
          this.transleteData(item.children, msg.children);
        }
        arr.push(msg);
      });
      console.log(arr);
      return arr;
    },
    //去除空的childNodes数组
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
    },
    //上传图片成功
    handleAvatarSuccess(res, file) {
      this.data.defaultIcon = res.data.domain + res.data.filePath;
    },
    //上传图片成功
    handleAvatarSuccess2(res, file) {
      this.data.selectIcon = res.data.domain + res.data.filePath;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.id) {
            this.data.menuId = this.id;
            editorMune(this.data).then(res => {
              if (res.code == 200) {
                this.$router.push({ name: "Menu" });
              }
            });
          } else {
            addMune(this.data).then(res => {
              if (res.code == 200) {
                this.$router.push({ name: "Menu" });
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
.imgbig {
  width: 140px;
  height: 140px;
}
/deep/.el-card .el-card__body{
  padding: 0;
}
</style>
