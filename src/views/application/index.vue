<template>
  <div class="application margin">
    <div class="topbig_div">
      <div
        v-for="(item,index) in dataArr"
        :key="index"
        :class="state == index?'top_div add_div':'top_div'"
        @click="changestate(index)"
      >
        <img :src="state == index ?item.bigLogo:item.logo" class="app-head-img" />
        <span>{{item.applyName}}</span>
      </div>
    </div>
    <div class="white_div">
      <integral :val="dataObj" @management="changetent"></integral>
      <div class="project" v-if="show == 0">
        <ul class="list">
          <li class="item" v-for="(val,index2) in projectArr" :key="index2" v-loading="val.loading"
    element-loading-text="项目初始化中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
            <div class="word_line" @mouseenter="displayMask(index2)" @mouseleave="leave">
              <div class="managementProject" v-if="num===index2">
                <span v-if="val.projectStatus == 0"  @click="onProjectStatus(val.projectId, 0,val)">初始化项目</span>
                <span v-else @click="managementProject(val)">管理项目</span>

              </div>
              <img :src="val.projectCoverImg" alt />
              <div class="tip_triangle">
                <i class="iconfont icon-pc" v-if="val.projectType == 1"></i>
                <i class="iconfont icon-shouji" v-if="val.projectType == 2"></i>
                <i class="iconfont icon-h" v-if="val.projectType == 3"></i>
              </div>
            </div>
            <div class="proName">
              <div class="name_div">
                <div :title='val.projectName'>{{val.projectName}}</div>
                <a  :href="'http://'+val.projectHost" target="_blank">
                  <div>{{val.projectHost}}</div>
                </a>
              </div>
            </div>
            <div class="word_two">
              <div class="outside_div">
                <div class="i-div">
                  <a  :href="'http://'+val.projectHost" target="_blank">
                    <img src="@/common/images/application/商城.png" alt />
                    <span class="div-i">商城</span>
                  </a>
                </div>
                <div class="i-div" @click="ediot(val)">
                  <img src="@/common/images/application/编辑.png" alt />
                  <span class="div-i">编辑</span>
                </div>
                <div class="i-div">
                  <a :href="val.projectQrcode">
                    <img src="@/common/images/application/分享.png" alt />
                  </a>

                  <span class="div-i">分享</span>
                </div>
                <div class="i-div" @click="onProjectStatus(val.projectId, val.projectStatus,val)">
                  <template v-if="val.projectStatus == 1">
                    <img src="@/common/images/application/停运.png" alt />
                    <span class="div-i">停运</span>
                  </template>
                  <template v-else-if="val.projectStatus == 2">
                    <img src="@/common/images/application/上线.png" alt />
                    <span class="div-i">上线</span>
                  </template>
                  <template v-else-if="val.projectStatus == 0">
                    <img src="@/common/images/application/上线.png" alt />
                    <span class="div-i">初始化</span>
                  </template>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="project" v-if="show == 1">
        <div v-html="dataObj.functionInt"></div>
      </div>
      <div class="project" v-if="show == 2">
        <div v-html="dataObj.courseInt"></div>
      </div>
      <div class="project" v-if="show == 3">
        <ProjectList :projectArr="projectArr"></ProjectList>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAllapply,
  getAlllist,
  editProjectStatus,
  generatecustomertoken
} from "@/api/application/index";
import integral from "./integral";
import ProjectList from "./createProject/projectList";
export default {
  name: "application",
  data() {
    return {
      isShowMsg: false,
      dataObj: {},
      type: 0, // 管理项目按钮浮现
      dataArr: [],
      projectArr: [],
      state: 0, // 控制头部样式
      show: 0, //控制底部内容变化
      num: -1,
      num1:''
    };
  },
  created() {
    if (this.$route.query.num){
      this.state=this.$route.query.num
    }
    this._getAllapply();
  },
  methods: {
    //切换遮罩成
    displayMask(index) {
      this.num = index;
    },
    leave() {
      this.num = -1;
    },
    ediot(val){
      this.$router.push({ name: "createProject" ,query:{applyId:val.applyId,projectId : val.projectId}});
    },
    //项目管理
    async managementProject(val) {
      const  data = await generatecustomertoken(val.projectId)
      window.open(`http://${data.domainName}/admin/?token=${data.token}`,'_black')
      // this.$router.push({ name: "Mallapp" });
    },
    //更改功能
    changetent(val) {
      this.show = val;
    },
    //查询
    async _getAllapply() {
      let params = {
        status: "0"
      };
      const res = await getAllapply(params);
      this.dataArr = res.data.list;
      this.dataObj = res.data.list[0];
      this._getAlllist(this.dataObj.applyId);
    },
    //查询项目管理
    async _getAlllist(val) {
      let { data } = await getAlllist(val);
      this.$nextTick(() => {
        data.list.forEach(item => {
          item.loading = false
        })
        this.projectArr = data.list;
      });
    },
    //头部切换
    changestate(val) {
      this.state = val;
      this.dataObj = this.dataArr[val];
      this._getAlllist(this.dataObj.applyId);
    },
    async onProjectStatus(id, status,val) {
      let tip, title, projectStatus;
      switch(status) {
        case 0:
          title = "初始化项目";
          tip = "初始化项目需要您几分钟时间。这个时间内系统将为您创建数据库及初始化数据。完成后系统会发送信息通知您，请稍后";
          projectStatus = 1;
          break;
        case 1:
          title = "下线项目";
          tip = "该操作将会下线您的项目， 是否确定操作";
          projectStatus = 2;
          break;
        case 2:
          title = "上线项目";
          tip = "该操作将会上线您的项目， 是否确定操作";
          projectStatus = 1;
          break;
        default:
          return;
      }

      await this.$confirm(tip, title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });
      val.loading = true
      setTimeout(() => {
        val.loading = false
      },60000)
      await editProjectStatus(id, projectStatus);
      this.$message({
        type: "success",
        message: "操作成功!"
      });
    }
  },
  components: {
    integral,
    ProjectList
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.application {
  padding-top: 29px;
}
.topbig_div {
  display: flex;
  .top_div {
    cursor: pointer;
    width: 18%;
    height: 80px;
    background: rgba(255, 255, 255, 1);
    border-radius: 3px 5px 5px 5px;
    margin-right: 20px;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-evenly;
    span {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
}
.add_div {
  width: 19% !important;
  height: 120px !important;
  top: -18px;
  border: 1px solid #d6deef;
  border-bottom: none;
  z-index: 10;
  border-bottom-right-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
  span {
    font-size: 20px !important;
    font-family: Microsoft YaHei;
    font-weight: bold !important;
    color: rgba(51, 51, 51, 1) !important;
  }
}
.white_div {
  background: white;
  border: 1px solid rgba(214, 222, 239, 1);
  position: relative;
  top: -19px;
  .project {
    display: flex;
    flex-wrap: wrap;
    padding-left: 30px;
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
        .img_btn {
          position: absolute;
          left: 50%;
          top: 51%;
          transform: translate(-50%, -50%);
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
      .shadow_img {
        background: rgba(0, 0, 0, 1);
        opacity: 0.5;
      }
    }
  }
}
.el-button--primary {
  width: 160px;
  height: 48px;
  background: rgba(74, 153, 250, 1);
  box-shadow: 0px 0px 12px 0px rgba(57, 57, 57, 0.2);
  border-radius: 6px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
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
  width: 481px;
  height: 468px;
  background: #ffffff;
  box-sizing: border-box;
  margin-bottom: 27px;
  margin-right: 35px;
  border: 1px solid rgba(76, 134, 244, 1);
}
.word_line {
  width: 454px;
  height: 297px;
  display: flex;
  margin-top: 13px;
  margin-left: 13px;
  margin-right: 13px;
  background: white;
  justify-content: center;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .managementProject {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    text-align: center;
    line-height: 297px;
    span {
      width: 150px;
      height: 40px;
      background: rgba(76, 134, 244, 1);
      box-shadow: 0px 0px 12px 0px rgba(57, 57, 57, 0.2);
      border-radius: 4px;
      border-radius: 5px;
      cursor: pointer;
      display: inline-block;
      text-align: center;
      line-height: 40px;
      color: white;
    }
  }
}
.word_one {
  background: white;
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 10px;
}
.word_two {
  margin-top: 17px;
  height: 69px;
  background: rgba(235, 244, 254, 1);
}
.i-div:first-child {
  margin-left: 4%;
}
.i-div {
  width: 23%;
  cursor: pointer;
  float: left;
  text-align: center;
  line-height: 69px;
  img {
    vertical-align: middle;
  }
  .imagecs:hover {
    transform: scale(1.6);
  }
  i {
    width: 27px;
    height: 27px;
  }
  span {
    font-size: 13px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 10px;
    margin-left: 13px;
  }
}
.div-i {
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
  height: 126px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(96, 98, 102, 1);
  line-height: 24px;
  margin: 10px 0;
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
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
  margin-left: 21px;
  margin-right: 21px;
  height: 1px;
  border: 1px solid #ebf4fe;
  position: relative;
}
.proName {
  width: 469px;
  height: 57px;
  text-align: center;
  margin-left: 10px;
  margin-right: 10px;
  background: white;
  line-height: 29px;
  font-size: 15px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(69, 69, 69, 1);
  margin-bottom: -2px;
}
.tip_triangle {
  position: absolute;
  width: 0;
  height: 0;
  border-width: 16px;
  border-style: solid;
  border-color: #4c86f4 #4c86f4 transparent transparent;
  right: 0px;
  i {
    position: relative;
    top: -14px;
    font-size: 14px;
    color: white;
  }
}
.app-head-img {
  width: 90px;
  height: 90px;
}
.name_div {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  div {
    width: 471px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(69, 69, 69, 1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(76, 134, 244, 1);
    line-height: 30px;
  }
}

.icon-shangcheng {
  color: #fc963d;
}
.outside_div:after {
  content: ""; /*设置内容为空*/
  height: 0; /*高度为0*/
  line-height: 0; /*行高为0*/
  display: block; /*将文本转为块级元素*/
  visibility: hidden; /*将元素隐藏*/
  clear: both; /*清除浮动*/
  zoom: 1; /*为了兼容IE*/
}
</style>
