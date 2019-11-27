<template>
  <div class="bigs_div">
    <ul class="list">
      <li
        v-for="(val,index) in templateArr"
        :key="index"
        @mouseenter="enter(index)"
        @mouseleave="leave"
        class="item"
      >
        <div class="mask_layer" v-if="type == index"></div>
        <el-button
          size="small"
          type="primary"
          class="img_btn"
          v-if="type == index"
          @click="create(val)"
        >选择此模板</el-button>
        <div class="word_line">
          <img :src="val.coverImg" alt />
          <!-- <div class="tip_triangle">
                <i class="iconfont icon-pc" v-if="val.type == 1"></i>
                <i class="iconfont icon-shouji" v-if="val.type == 2"></i>
                <i class="iconfont icon-h" v-if="val.type == 3"></i>
          </div>-->
          <div class="proName">{{val.templateName}}</div>
          <div class="word_one">
            <span class="t1">{{val.introduction}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { throttleTipPop } from '@/utils/throttle'
export default {
  props: ["templateArr"],
  data() {
    return {
      type: -1
    };
  },
  methods: {
      create(data) {
        throttleTipPop(this,'warning','暂不支持选择PC端外的模板')
    },
    enter(val) {
      this.type = val;
    },
    leave() {
      this.type = -1;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
ul {
  list-style: none;
}
.card {
  margin-left: 30px;
  margin-top: 30px;
}
.list {
  display: flex;
  flex-wrap: wrap;
}
.item {
  position: relative;
  width: 446px;
  height: 600px;
  background: #ebf4fe;
  border: 1px solid rgba(234, 237, 244, 1);
  border-radius: 6px;
  box-sizing: border-box;
  margin-bottom: 50px;
  margin-right: 70px;
  padding: 10px;
}
.item:nth-of-type(3n){
    margin-right: 0;
}
.img_btn {
  position: absolute;
  left: 50%;
  margin-left: -60px;
  top: 50%;
  margin-top: -50px;
  z-index: 100;
  width:150px;
  height:40px;
  background:rgba(76,134,244,1);
  box-shadow:0px 0px 12px 0px rgba(57,57,57,0.2);
  border-radius:4px;
  font-size:18px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(255,255,255,1);
}
.word_line {
  width: 100%;
  height: 100%;
  background: white;
  justify-content: center;
  padding: 10px;
  img {
    width: 100%;
    height: 466px;
  }
}
.word_one {
  background: white;
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 10px;
}
.word_two {
  display: flex;
  justify-content: space-around;
  background: white;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: -2px;
  padding-top: 2px;
}
.i-div {
  margin-top: 20px;
  .imagecs:hover {
    transform: scale(1.6);
  }
}
.div-i {
  font-size: 10px;
  margin-top: 5px;
  margin-left: -4px;
  margin-bottom: 13px;
}
.imagecss {
  margin-left: 23px;
}
.tt {
  display: flex;
  align-items: center;
  margin-left: 17px;
  margin-top: 10px;
}
.t1 {
  display: inline-block;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(96, 98, 102, 1);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-height: 24px;
}
.t2 {
  position: absolute;
  top: -13px;
  right: -45px;
  display: inline-block;
  width: 70px;
  transform: rotate(45deg);
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.switch {
  margin-top: 35px;
  margin-left: 41px;
}
.changes {
  margin-top: 58px;
  right: 48px;
  font-size: 13px;
  color: #409eff;
  position: absolute;
}
.changes11 {
  margin-top: 58px;
  right: 48px;
  font-size: 13px;
  position: absolute;
}
.title1 {
  font-size: 16px;
  font-weight: 400;
  padding-left: 16px;
  line-height: 1.4;
  border-left: 4px solid $themeColor;
}
.el-switch__core {
}
.el-switch__label * {
  line-height: 1;
  font-size: 12px;
  display: inline-block;
  margin-top: 36px;
  margin-left: 4px;
}
.line_div {
  margin-left: 26px;
  margin-right: 26px;
  height: 1px;
  border: 1px solid #ebf4fe;
  position: relative;
}
.proName {
  width: 100%;
  text-align: center;
  margin-left: 10px;
  margin-right: 10px;
  background: white;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(69, 69, 69, 1);
  margin-top: 14px;
}
.tip_triangle {
  position: absolute;
  width: 0;
  height: 0;
  border-width: 16px;
  border-style: solid;
  border-color: #4c86f4 #4c86f4 transparent transparent;
  right: 20px;
  top: 20px;
  i {
    position: relative;
    top: -14px;
    font-size: 14px;
    color: white;
  }
}
.mask_layer {
  background: black !important;
  opacity: 0.42;
  position: absolute;
  left: 20px;
  right: 20px;
  top: 20px;
  bottom: 118px;
  z-index: 10;
}
.bigs_div{
    margin-left: -60px;
}
</style>