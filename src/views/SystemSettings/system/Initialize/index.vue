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
    <dealers v-if="type == 0"></dealers>
  </div>
</template>
<script>
import dealers from './dealers/index'
export default {
  name: "SelfSetting",
  data() {
    return {
      data: [
        { name: "经销商审核配置", icon: "iconfont icon-jingxiaoshang1" },
        { name: "客户审核配置", icon: "iconfont icon-kehu" },
        { name: "供应商审核配置", icon: "iconfont icon-gongyingshang" },
        { name: "额度发放审核", icon: "iconfont icon-edufafang" },
        { name: "销售订单审核配置", icon: "iconfont icon-xiaoshou" },
        { name: "采购订单审核配置", icon: "iconfont icon-caigou" },
        { name: "售后订单审核", icon: "iconfont icon-shouhou" },
        { name: "财务付款审核", icon: "iconfont icon-caiwu" }
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
    dealers,
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
</style>
