<template>
  <div class="app-main">
    <div class="app-content">
      <div class="app-main-top">
        <div class="app-main-left">
          <div class="app-main-left-head">应用简介</div>
          <div
            class="app-main-left-con"
          >{{val.introduction }}</div>
        </div>
        <div class="app-main-right">
          <div class="app-main-right-top">
            <a class="my-app-btn" @click="routerToCreate">创建项目</a>
          </div>
        </div>
      </div>
      <div class="buttonfunc">
        <div :class="type == 0?'select_div':''" @click="funcPeoject(0)">已创建项目</div>
        <div :class="type == 1?'select_div':''" @click="funcPeoject(1)">功能介绍</div>
        <div :class="type == 2?'select_div':''" @click="funcPeoject(2)">使用教程</div>
        <div :class="type == 3?'select_div':''" @click="funcPeoject(3)">项目列表</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStoreList, copyStore } from "@/api/apply/index";
import QRCode from "qrcode";
import AddressSelect from "@/components/addressSelection/index";
import { querySeller} from '@/api/contentManagement/index'
import { throttleTipPop } from '@/utils/throttle'

export default {
  props: ["val"],
  data() {
    return {
      type: 0,
      show:false,
    };
  },
  created() {
    this.querySeller()
  },
  watch: {
    val(data) {
      console.log(data);
    }
  },
  methods: {
    funcPeoject(val){
      this.type = val
      this.$emit('management',val)
    },
    routerToCreate() {
      if(this.show){
        this.$router.push({ name: "createProject" ,query:{applyId : this.val.applyId }});
      }else{
        throttleTipPop(this,'error','请先创建客户')
      }
    },
    submitForm(formName) {
      this.$refs.form.validateField("province_id");
      this.$refs[formName].validate(valid => {
        if (valid) {
          this._copyStore();
        } else {
          return false;
        }
      });
    },
    async  querySeller(){
      const obj={
                sysuserName:''
            }
        let res = await querySeller(obj)
        if(res.code === 200){
            res.data.list.length?this.show = true:this.show = false
        }
    },
  },
  components: {
    AddressSelect
  },
};
</script>

<style lang='scss' scoped>
@import "@/common/scss/variable.scss";

.app-main {
  background: #fff;
  .app-content {
    height: 100%;
    width: 100%;
    padding: 20px;
    position: relative;
    .app-main-top {
      height: 151px;
      background: $themeColor;
      .app-main-left {
        width: 60%;
        height: 100%;
        float: left;
        padding-left: 20px;
        .app-main-left-head {
          height: 65px;
          line-height: 65px;
          color: #ffffff;
          font-size: 20px;
        }
        .app-main-left-con {
          height: 130px;
          line-height: 20px;
          color: #ffffff;
          padding: 0 20px 20px 0;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
      }
      .app-main-right {
        width: 40%;
        height: 100%;
        float: left;
        padding-right: 40px;
        .app-main-right-top {
          height: 111px;
          display: flex;
          justify-content: flex-end;
          position: relative;
          top: 35px;
          right: 24px;
        }
        .my-app-btn {
          width: 160px;
          height: 48px;
          line-height: 48px;
          text-align: center;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 0px 12px 0px rgba(57, 57, 57, 0.2);
          border-radius: 6px;
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(74, 153, 250, 1);
        }
      }
    }
  }
}
.buttonfunc {
  position: absolute;
  right: 90px;
  bottom: 20px;
  display: flex;
  div {
    width: 100px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
  }
  .select_div {
    background: rgba(255, 255, 255, 1);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    color: rgba(74, 153, 250, 1);
  }
}
</style>
