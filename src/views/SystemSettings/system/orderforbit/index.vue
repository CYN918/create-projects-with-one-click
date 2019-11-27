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
    <enterpriseorder v-if="type == 0"></enterpriseorder>
    <enterprisedealers v-if="type == 1"></enterprisedealers>
    <discount v-if="type == 2"></discount>
    <configuration v-if="type == 3"></configuration>
    <submission v-if="type == 4"></submission>
    
  </div>
</template>
<script>
import enterpriseorder from './enterpriseorder/index'
import enterprisedealers from './enterprisedealers/index'
import discount from './discount/index'
import configuration from './configuration/index'
import submission from './submission/index'


export default {
  name: "SelfSetting",
  data() {
    return {
      data: [
        { name: "订单拦截配置", icon: "iconfont icon-kehu" },
        { name: "企业用户注册审核配置", icon: "iconfont icon-jingxiaoshang1" },
        { name: "折扣率申请审核配置", icon: "iconfont icon-caigou" },
        { name: "集采订单审核配置", icon: "iconfont icon-caigou" },
        { name: "提报商品审核配置", icon: "iconfont icon-caigou" },
      ],
      type:0,
    };
  },
  methods:{
    changetype(val){
      this.type = val
      // this.$router.push({path:'/SystemSettings/system',query:{type:val}})
    }
  },
  created(){
    this.type = (this.$route.query.type || 0)
  },
  components:{
    enterpriseorder,
    enterprisedealers,
    discount,
    configuration,
    submission
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
  background: #f7faff;
  border: 1px solid rgba(234, 237, 244, 1);
  display: flex;
  align-items: center;
  span {
    display: inline-block;
    width: 193px;
    height: 100%;
    display: flex;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(144, 147, 153, 1);
    align-items: center;
    justify-content: center;
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
  color: white !important;
  background: #4C86F4 !important;
}
.margin{
  background: white;
}
</style>
