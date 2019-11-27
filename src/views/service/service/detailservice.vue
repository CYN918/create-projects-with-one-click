<template>
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <div class="search-wrapper1">
          <el-page-header @back="back" :content="text"></el-page-header>
        </div>
      </div>
    </div>
      <div class="msetting-account-wrapper">
        <div class="tabs-header">
          <ul class="clearfix">
            <li @click="tabIndex('AccountSetoff',0)" :class="currentIndex===0 ? 'active' : ''">服务设置</li>
            <li @click="tabIndex('AccountIntroduce',1)" :class="currentIndex===1 ? 'active' : ''">功能介绍</li>
            <li @click="tabIndex('AccountTeach',2)" :class="currentIndex===2 ? 'active' : ''">使用教程</li>
          </ul>
        </div>
        <div class="tabs-content">
          <component :is="currentView" :form="form"></component>
          <!--<account-setoff v-if="currentIndex===0" :form="form"></account-setoff>-->
          <!--<account-introduce v-if="currentIndex===1" :form="form"></account-introduce>-->
          <!--<account-teach v-if="currentIndex===2" :form="form"></account-teach>-->
        </div>
      </div>
    </div>
</template>

<script>
import { getServiceListByid } from "@/api/service";
import AccountSetoff from "./setoff";
import AccountIntroduce from "./introduce";
import AccountTeach from "./teach";
export default {
  data() {
    return {
      componentArr:['AccountSetoff','AccountIntroduce','AccountTeach'],
      currentIndex: 0,
      currentView:'AccountSetoff',
      form: {
        applyId: "",
        logo: "", //logo
        applyName: "", //服务名称
        introduction: "", //介绍
        sortOrder: "", //排序
        functionInt: "", //功能介绍(富文本)
        courseInt: "", //教程内容(富文本)
      },
      text: "服务中心 > 服务管理 > 服务详情"
    };
  },
  created() {
    this.form.applyId = this.$route.query.applyId;
    // this.currentIndex = this.$route.query.currentIndex;
    this.getDetail();
  },
  computed: {},
  methods: {
    //跳转获取详情数据
    getDetail() {
      console.log(999,this.currentIndex)
      getServiceListByid(this.form.applyId).then(res => {
        console.log(555, res);
        this.form = Object.assign({}, res.data);
        console.log(this.form.logo,111122);

      });
    },
    back() {
      this.$router.go(-1);
    },
    tabIndex(str,index) {
      console.log(888,this.currentIndex,str,index)
      this.currentIndex = index;
      this.currentView = str

    },
    torecord(id) {
      this.currentIndex = 3;
      this.storeManagerId = id;
    },
    toLog(id) {
      this.currentIndex = 2;
      this.storeManagerId = id;
    },
    toRole() {
      this.currentIndex = 1;
    }
  },
  components: {
    AccountSetoff,
    AccountIntroduce,
    AccountTeach
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.goods-fitter {
  .search-wrapper1 {
    padding: 20px;
    border: 1px solid rgb(215, 224, 241);
    background: #fff;
    display: flex;
    align-items: center;
    .title1 {
      display: flex;
      margin-left: 35%;
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
  .active{
    background: #fff;
    border: 1px solid #d7e0f1;
    border-bottom-color: #fff;
    margin-bottom: -1px;
  }
</style>
