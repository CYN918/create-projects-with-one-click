<template>
  <div class="content-box">
    <div class="title-box">
      <div class="title-div left-div">活动说明</div>
      <div class="title-div right-div">我的奖品</div>
    </div>
    <div class="body-box">
      <div class="cfg-event">
        <div class="sub-com-div" @click="setCurrentIndex(3)">
          <span class="title-span">活动时间</span>
          <br>
          <span class="conten-pan">{{baseSettingForm.time[0]}} 至 {{baseSettingForm.time[1]}}</span>
        </div>
        <div class="sub-com-div" @click="setCurrentIndex(4)">
          <span class="title-span">主办单位</span>
          <br>
          <span class="conten-pan">{{baseSettingForm.host}}</span>
        </div>
        <div class="sub-com-div" @click="setCurrentIndex(5)">
          <span class="title-span">活动奖品</span>
          <br>
          <span class="conten-pan">{{baseSettingForm.prize}}</span>
        </div>
        <div class="sub-com-div" @click="setCurrentIndex(6)">
          <span class="title-span">活动及兑奖规则说明</span>
          <br>
          <span class="conten-pan">{{baseSettingForm.explain}}</span>
        </div>
      </div>
      <!---->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters(['baseSettingForm'])
  },
  methods: {
    ...mapMutations({
      setCurrentIndex: 'SET_CURRENTINDEX',
      setCurentEdit: 'SET_CURRENTEDIT'
    })
  }
}
</script>

<style lang='scss' scoped>
.content-box {
  width: 330px;
  height: 549px;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 15px;
  .title-box {
    height: 35px;
    display: flex;
    text-align: center;
    width: 100%;
    .title-div {
      width: 50%;
      height: 35px;
      line-height: 35px;
      text-align: center;
      font-size: 14px;
      cursor: pointer;
    }
    .left-div {
      border-top-left-radius: 10px;
      background-color: #fff;
      color: #4386f4;
    }
    .right-div {
      border-top-right-radius: 10px;
      background-color: #f5f5f5;
      color: #3c3c3c;
    }
  }
  .body-box {
    height: 514px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 10px;
    .sub-com-div {
      margin-bottom: 10px;
      border: 1px dashed hsla(0, 0%, 85%, 0);
      cursor: pointer;
      &:hover {
        border: 1px dashed rgb(217, 217, 217);
      }
      &.active {
        border: 1px dashed rgb(64, 134, 244);
      }
      .title-span {
        font-size: 12px;
        color: #a6a6a6;
        display: inline-block;
        margin-bottom: 5px;
      }
      .conten-pan {
        font-size: 14px;
      }
    }
  }
}
</style>
