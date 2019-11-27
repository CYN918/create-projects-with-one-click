<template>
  <div class="side-menu-wrapper">
    <div class="side-menu">
      <div class="item" v-for="item in dataList" :key="item.menuId">
        <app-link class="item-link" :to="item.pageUrl">
          <img :src="item == currentMenu ? item.selectIcon : item.imgurl" class="carouselImg" />
          {{item.menuName}}
        </app-link>
      </div>
    </div>
    <side-menu :data="currentMenuChildren" v-if="currentMenuChildren.length" />
  </div>
</template>

<script>
import AppLink from "./link";
import SideMenu from "./sideMenu";

export default {
  name: "Menu",
  props: {
    dataList: {
      type: Array,
      default: () => []
    },
    modle: {
      type: String,
      default: "horizontal"
    }
  },
  computed: {
    /**
     * 通过VUE路由数据
     * 对获取到的菜单进行匹配
     * 获取当前VUE页面的菜单
     */
    currentMenu() {
      const routePath = this.$route.matched.map(item => item.path);
      return this.dataList.filter(item => routePath.includes(item.pageUrl))[0];
    },

    /**
     * 获取当前VUE页面的子菜单
     * 如果没有则修改父页面样式并返回空数组
     */
    currentMenuChildren() {
      const currentMenu = this.currentMenu;
      if (currentMenu && currentMenu.children && currentMenu.children.length) {
        this.$parent.asideShow = true;
        return currentMenu.children;
      } else {
        this.$parent.asideShow = false;
        return [];
      }
    }
  },
  components: {
    AppLink,
    SideMenu
  },
  watch: {
    dataList(val) {
      if (!val.length) {
        this.dataList = [];
      }
    }
  }
};
</script>
<style lang="scss">
@import "@/common/scss/variable.scss";

.side-menu-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.side-menu {
  width: 150px;
  .item {
    display: flex;
    justify-content: center;
    margin: 10px 0px;
  }
  .item:last-of-type {
    display: flex;
    justify-content: center;
    margin: 10px 0px;
    padding-bottom: 60px;
  }
  .item-link {
    width: 88%;
    color: #3c3c3c;
    display: flex;
    align-items: center;
    line-height: 28px;
    padding: 6px 15px;
    font-size: 14px;
    &.router-link-active {
      background: $themeColor;
      color: #fff;
      i {
        color: #fff;
      }
    }
    i {
      font-size: 20px;
      margin-right: 10px;
      color: #555;
    }
  }
}
.carouselImg {
  margin-right: 15px;
}
</style>
