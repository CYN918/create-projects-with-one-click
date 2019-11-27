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
    <customer v-if="type == 0"></customer>
    <supplier v-if="type == 1"></supplier>
    <lines v-if="type == 2"></lines>
    <sales v-if="type == 3"></sales>
    <procurement v-if="type == 4"></procurement>
    <aftersales v-if="type == 5"></aftersales>
    <financial v-if="type == 6"></financial>
    <inventory_transfer v-if="type == 7"></inventory_transfer>
    <inventory_check v-if="type == 8"></inventory_check>
  </div>
</template>
<script>
import dealers from './dealers/index'
import customer from './customer/index'
import supplier from './supplier/index'
import lines from './lines/index'
import sales from './sales/index'
import procurement from './procurement/index'
import aftersales from './aftersales/index'
import financial from './financial/index'
import inventory_transfer from './inventory_transfer/index'
import inventory_check from './inventory_check/index'

export default {
  name: "SelfSetting",
  data() {
    return {
      data: [
        { name: "客户审核配置", icon: "iconfont icon-kehu" },
        { name: "供应商审核配置", icon: "iconfont icon-gongyingshang" },
        { name: "额度发放审核", icon: "iconfont icon-edufafang" },
        { name: "销售订单审核配置", icon: "iconfont icon-xiaoshou1" },
        { name: "采购订单审核配置", icon: "iconfont icon-caigou" },
        { name: "售后订单审核", icon: "iconfont icon-shouhou" },
        { name: "财务付款审核", icon: "iconfont icon-caiwu" },
        { name: "库存调拨审核", icon: "iconfont icon-caiwu" },
        { name: "库存盘点审核", icon: "iconfont icon-caiwu" }
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
    customer,
    supplier,
    lines,
    sales,
    procurement,
    aftersales,
    financial,
    inventory_transfer,
    inventory_check
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
