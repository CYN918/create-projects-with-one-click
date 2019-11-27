<template>
  <div class="margin">
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="260px" size="small">
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
            <h4 class="title">基本信息</h4>
            <br />
            <el-form-item label="所属商品规格:" prop="type">
              <el-input style="width:400px" v-model="form.specifications" :disabled="show"></el-input>
            </el-form-item>
            <el-form-item label="商品规格值:" prop="name">
              <div class="interbank">
                <div v-for="(item,index) in form.specValues" :key="index">
                  <span class="model">
                    {{item}}
                    <span class="delete-specif" @click="deleitem(index)">
                      <span class="error">×</span>
                    </span>
                  </span>
                </div>
                <el-input placeholder="请输入属性名称" style="width:200px" v-model="form.name"></el-input>
                <el-button
                  type="primary"
                  class="mar_left"
                  @click="addValues"
                  size="small"
                  v-if="!getByvalue"
                >添加</el-button>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm" size="small">确定</el-button>
              <el-button type="primary" @click="resetForm" size="small">重置</el-button>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getByvalue, addvalueTree, getSpecByid ,ediotByvalue } from "@/api/product/index";
import { throttleTipPop } from "@/utils/throttle";

export default {
  data() {
    return {
      title_txt:'商品规格值 > 新增',
      options: [],
      specId: "", //规格id
      getByvalue: "", //规格值id
      show:true, // 控制禁用
      form: {
        specifications: "",
        name: "",
        specValues: [] //用户新增的规格值
      },
      rules: {}
    };
  },
  mounted() {
    if (this.$route.query.specId) {
      this.specId = this.$route.query.specId;
      this._getSpecByid();
    }
    if (this.$route.query.specValueId) {
      this.title_txt = '商品规格值 > 编辑'
      this.getByvalue = this.$route.query.specValueId;
      this._getByvalue();
    }
  },
  methods: {
    deleitem(index){
      this.form.specValues.splice(index,1)
    },
    //根据规格值id查询信息
    _getByvalue() {
      getByvalue(this.getByvalue).then(res => {
        this.form.specifications = res.data.specName;
        this.form.name = res.data.specValue;
        this.specId = res.data.specId;
      });
    },
    //根据规格id查询信息
    _getSpecByid() {
      getSpecByid(this.specId).then(res => {
        this.form.specifications = res.data.specName;
      });
    },
    //点击添加按钮
    addValues() {
      if (this.form.specValues.length != 0) {
        let arr = this.form.specValues
        for(let i=0 ; i<arr.length; i ++){
          if(arr[i] == this.form.name){
            throttleTipPop(this,'error','请勿添加重复规格值')
            return false
          }
        }
        this.form.specValues.push(this.form.name);
      } else {
        this.form.specValues.push(this.form.name);
      }
      this.form.name = "";
    },
    //提交
    submitForm() {
      if (this.getByvalue) {
        let obj = {};
        obj.specId = this.specId;
        obj.specValueId = this.getByvalue;
        obj.specValue = this.form.name;
        ediotByvalue(obj).then(res => {
          if (res.code == 200) {
            this.$message({
              message: '编辑成功',
              type: "success"
            });
            this.$router.push({
              name: "ProductSpecAttribute",
              query: { id: this.specId }
            });
          }
        })
      } else {
        let obj = {};
        obj.specId = this.specId;
        obj.specValues = this.form.specValues;
        addvalueTree(obj).then(res => {
          if (res.code == 200) {
            this.$message({
              message: res.message,
              type: "success"
            });
            this.$router.push({
              name: "ProductSpecAttribute",
              query: { id: this.specId }
            });
          }
        });
      }
    },
    resetForm() {
      if (this.getByvalue){
        this._getByvalue()
      }
    },
    back() {
      this.$router.push({
        name: "ProductSpecAttribute",
        query: { id: this.specId }
      });
    },
    entry() {}
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
    margin-left: 41px;
  }
}
.note {
  display: flex;
  color: #ccc;
}
.mar_left {
  margin-left: 10px;
}
.interbank {
  display: flex;
  .model {
    height: 32px;
    padding: 0 18px;
    background: rgba(241, 248, 255, 1);
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(107, 108, 112, 1);
    border-radius: 4px;
    position: relative;
  }
}
.delete-specif {
  width: 0;
  height: 0;
  display: inline-block;
  border: 11px solid;
  border-color: transparent #4a99fa #4a99fa transparent;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: default;
  .error {
    width: 7px;
    height: 7px;
    position: absolute;
    right: -7px;
    bottom: 5px;
    color: white;
  }
}
</style>
