<template>
  <div class="admin-wrapper">
    <mnavbar/>
    <msidebar ref="msidebar" class="sidebar-container" @asideShow="handleAsideShow"/>
    <mapp-main ref="mappMain"/>
  </div>
</template>

<script>
import Msidebar from './sideMenu/index'
import Mnavbar from './mnavbar'
import MappMain from './mappMain'

export default {
  name: 'Mlayout',
  provide () {
    return {
      appContainer: this.$refs
    }
  },
  methods: {
    handleAsideShow (val) {
      if (val) {
        this.$refs.msidebar.$el.style.width = '280px'
        this.$refs.mappMain.$el.style.left = '280px'
      } else {
        this.$refs.msidebar.$el.style.width = '150px'
        this.$refs.mappMain.$el.style.left = '150px'
      }
    }
  },
  components: {
    Msidebar,
    Mnavbar,
    MappMain
  }
}
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
