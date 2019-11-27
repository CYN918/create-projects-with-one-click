<template>
  <div class="margin">
    <div class="mcard">
      <div class="top_div">
        <span v-for="(item,index) in data" :key="index" :class="type==index?'color_span':''" @click="changetype(index)">
          <i :class="item.icon"></i>
          {{item.name}}
          </span>
      </div>
    </div>
    <bgManagement v-if="type == 0"></bgManagement>
    <mall v-if="type == 1"></mall>
  </div>
</template>
<script>
import bgManagement from './bgManagement/index'
import mall from './mall/index'

export default {
  name: "SelfSetting",
  data() {
    return {
      data: [
        { name: "管理后台设置", icon: "iconfont icon-jingxiaoshang1" },
        { name: "商城设置", icon: "iconfont icon-kehu" },
      ],
      type:0,
    };
  },
  methods:{
    changetype(val){
      this.type = val
    }
  },
  components:{
    bgManagement,
    mall
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
}
.margin {
  margin-top: 0 !important;
  padding-left: 0 !important;
  border: 1px solid rgba(214, 222, 239, 1);
}
.top_div {
  height: 49px;
  background: rgba(240, 243, 250, 1);
  border: 1px solid rgba(234, 237, 244, 1);
  display: flex;
  align-items: center;
  span {
    display: inline-block;
    width: 193px;
    height: 22px;
    display: flex;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(144, 147, 153, 1);
    align-items: center;
    justify-content: center;
    border-right: 1px solid #c3c6cb;
    cursor: pointer;
  }
  i{
    margin-right: 10px;
  }
}
.top_div span:last-child {
  border: none;
}
.color_span{
  color: #4C86F4 !important;
}
.margin{
  background: white;
}
</style>
