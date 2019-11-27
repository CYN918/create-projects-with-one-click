<template>
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <div class="search-wrapper1">
          <el-page-header @back="back" content="应用>创建项目>填写基本信息"></el-page-header>
        </div>
      </div>
    </div>
    <div class="white_div">
      <div class="app-content">
        <div class="app-main-top">
          <div class="app-main-left">
            <div :class="coloropcation>=0?'steps whit_div':'steps'">
              <div class="ball">1</div>
              <div class="Introduction">
                <div>选择项目模板</div>
                <div class="tip">在模板基础上，调整轮播图、商品等元素，更方便</div>
              </div>
            </div>
            <div :class="coloropcation>=1?'steps whit_div':'steps'">
              <div class="ball">2</div>
              <div class="Introduction">
                <div>填写基本信息</div>
                <div class="tip">信息内容关系到商城的整体方向等，请仔细填写</div>
              </div>
            </div>
            <div :class="coloropcation>=2?'steps whit_div':'steps'">
              <div class="ball">3</div>
              <div class="Introduction">
                <div>商城搭建完成</div>
                <div class="tip">基础部分完成，建议按照指引，完成更多设置</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 控制头部选项卡切换 -->
      <div class="tent_center"  v-if="show != 2">
        <span class="topindex_div">
          <span :class="selectType == num ? 'select_span':''" @click="changeselect(num)" v-for="(val,num) in dataArr" :key="num">{{val.name}}</span>
        </span>
      </div>
      <div class="tent_div" v-if="show == 1 && selectType == 0">
        <ul class="list">
          <li
            v-for="(val,index) in templateArr"
            :key="index"
            @mouseenter="enter(index)"
            @mouseleave="leave()"
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
              </div> -->
               <div class="proName">{{val.templateName}}</div>
               <div class="word_one">
                <span class="t1">{{val.introduction}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="tent_div" v-if="show == 1 && (selectType == 1 || selectType == 2 ||selectType == 3 ||selectType == 4)">
        <small-template :templateArr='templateArr'></small-template>
      </div>
      <div class="template" v-if="show == 2">
        <information></information>
      </div>
    </div>
  </div>
</template>
<script>
import { getAlltemplate } from "@/api/application/index";
import information from "./information";
import smallTemplate from "./smallTemplate";

export default {
  data() {
    return {
      show: 1, //控制整体显示
      type: -1, // 控制hover效果
      selectType:0, // 控制头部选择
      coloropcation: 0, // 控制头部样式
      templateArr: [],
      applyId: "", // 应用id
      templateId: "", //模板id
      dataArr:[
        {name:'PC模板',value:1},
        {name:'AAP模板',value:2},
        {name:'小程序模板',value:4},
        {name:'微商城模板',value:5},
        {name:'H5模板',value:3},
      ],
    };
  },
  created() {
    this.$route.query.projectId ? this.show = 2 : ''
    this.$route.query.applyId ? this.applyId = this.$route.query.applyId : "";
    this._getAlltemplate();
  },
  components: {
    information,
    smallTemplate,
  },
  methods: {
    //切换
    changeselect(val){
      this.selectType = val
      this._getAlltemplate()
    },
    async _getAlltemplate() {
      let obj = {};
      obj.applyId = this.applyId;
      obj.projectType = this.dataArr[this.selectType].value;
      getAlltemplate(obj).then(res => {
        this.templateArr = res.data.list;
      });
    },
    create(data) {
      this.templateId = data.templateId;
      this.show = 2;
      this.coloropcation = 1;
    },
    back() {
      this.$router.go(-1);
    },
    changestate(val) {
      this.state = val;
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
.search-wrapper1 {
  padding: 20px;
  border: 1px solid rgb(215, 224, 241);
  background: #fff;
  display: flex;
  align-items: center;
  .title1 {
    display: flex;
    margin-left: 15%;
  }
}
.white_div {
  background: white;
  border: 1px solid rgba(214, 222, 239, 1);
  .project {
    display: flex;
    flex-wrap: wrap;
    padding-left: 63px;
    .div_ig {
      width: 26%;
      margin-right: 84px;
      margin-top: 40px;
      .img_div {
        width: 100%;
        height: 300px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
      }
      div {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(48, 49, 51, 1);
        text-align: center;
        padding-top: 30px;
      }
    }
  }
}
// .shadow_img {

// }
.app-content {
  height: 100%;
  width: 100%;
  padding: 20px;
  position: relative;
  .app-main-top {
    height: 151px;
    background: $themeColor;
    .app-main-left {
      width: 100%;
      height: 100%;
      padding-left: 20px;
      display: flex;
      align-items: center;
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
.steps {
  width: 30%;
  height: 62px;
  border-right: 1px solid #ffffff;
  display: flex;
  padding-left: 5%;
  align-items: center;
  opacity: 0.68;
  .ball {
    width: 45px;
    height: 45px;
    border: 2px solid rgba(255, 255, 255, 1);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
}
.Introduction {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  padding-left: 19px;
  .tip {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    margin-top: 18px;
  }
}
.steps:last-child {
  border: none;
}
.whit_div {
  opacity: 1;
}
.tent_div {
  padding-left: 116px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  top: -30px;
  .box_tent {
    width: 18%;
    height: 578px;
    border: 1px solid #cccccc;
    margin-right: 1%;
    margin-top: 62px;
    img {
      width: 100%;
      height: 436px;
    }
  }
  .name_div {
    margin-top: 24px;
    text-align: center;
  }
  .describe {
    padding: 0 3px;
    font-size: 14px;
    margin-top: 3px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
  }
}
.img_btn {
  position: absolute;
  left: 0top;
  left: 50%;
  margin-left: -65px;
  top: 50%;
  margin-top: -16px;
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
.img_div {
  position: relative;
}
.template {
  padding-left: 140px;
  margin-top: 30px;
}
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
  width: 624px;
  height: 800px;
  background: #ebf4fe;
  border: 1px solid rgba(234, 237, 244, 1);
  border-radius: 6px;
  box-sizing: border-box;
  margin-bottom: 50px;
  margin-right: 85px;
  padding: 10px;
}
.word_line {
  width: 100%;
  height: 100%;
  background: white;
  justify-content: center;
  padding: 10px;
  img {
    width: 100%;
    height:666px;
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
  line-height:24px;
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
  font-size:16px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(69,69,69,1);
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
  top:20px;
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
.topindex_div:after{
    content:"";/*设置内容为空*/
    height:0;/*高度为0*/
    line-height:0;/*行高为0*/
    display:block;/*将文本转为块级元素*/
    visibility:hidden;/*将元素隐藏*/
    clear:both;/*清除浮动*/
     zoom:1;/*为了兼容IE*/
}
.topindex_div{
  display: inline-block;
  z-index: 10;
  margin-bottom: 50px;
  span{
    display:block;
    width:200px;
    height:40px;
    border:1px solid rgba(76,134,244,1);
    text-align: center;
    line-height: 40px;
    border-right: 0;
    letter-spacing:8px;
    font-size:16px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(76,134,244,1);
    cursor: pointer;
    float: left;
  }
  span:first-child{
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  span:last-child{
    border-right: 1px solid rgba(76,134,244,1);
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .select_span{
    background:rgba(76,134,244,1);
    color:rgba(255,255,255,1);
  }
}
.tent_center{
  text-align: center;
}
</style>
