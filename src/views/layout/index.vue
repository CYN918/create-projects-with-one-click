<template>
  <div class="admin-wrapper"  >
    <navbar />
    <sidebar
      class="sidebar-container"
      v-show="isShowSidebar"
      :dataList="menuList"
      :style="`width: ${asideShow ? 280 :150}px`"
    />
    <app-main
      ref="mappMain"
      :style="`left: ${asideShow ? 280 : containers}px`"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/sideMenu/index";
import Navbar from "./components/navbar";
import AppMain from "./components/appMain";
import { mapState ,user} from 'vuex'
import menuList from "@/config/menuMemberCofig";

export default {
  name: "Layout",
  data() {
    return {
      asideShow: false,
      menuList: []
    };
  },
  components: {
    Sidebar,
    Navbar,
    AppMain
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"))
    this.$store.commit('SET_MENUITEMS',user.menuItems)
    const userIofo = this.menuItems
    let arr = [];
    if (userIofo[0].isRootNode) {
      arr = userIofo[0].children;
    } else {
      arr = userIofo;
    }
    arr.forEach((element, index) => {
      element.imgurl = element.defaultIcon;
    });
    this.menuList = arr;
  },
  computed:{
    ...mapState({
      isShowSidebar:state=>state.createProject.isShowSidebar,
      containers:state=>state.createProject.left,
      menuItems:state=>state.user.menuItems
    })
  },

};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/common/scss/mixin.scss";
.admin-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
