<template>
  <div class="side-menu-wrapper">
    <div class="side-menu">
      <div class="item" v-for="(item, index) in menuList" :key="index" @click="handleTo(item)">
        <app-link class="item-link" :to="item.path">
          <i class="iconfont icon-home"></i>{{item.title}}
        </app-link>
      </div>
    </div>
    <aside-menu :data="asideList" v-show="asideList.length"></aside-menu>
  </div>
</template>

<script>
import menuList from '@/config/menuConfig.js'
import AppLink from './link'
import AsideMenu from './asideMenu'
export default {
  name: 'sideMenu',
  props: {
    modle: {
      type: String,
      default: 'horizontal'
    }
  },
  data () {
    return {
      menuList: menuList,
      asideList: [],
      asideShow: false
    }
  },
  methods: {
    handleTo (item) {
      this.asideList = item.children ? item.children : []
    }
  },
  components: {
    AppLink,
    AsideMenu
  },
  watch: {
    asideList (val) {
      if (val.length) {
        this.asideShow = true
      } else {
        this.asideShow = false
      }
      this.$emit('asideShow', this.asideShow)
    }
  }
}

</script>
<style lang="scss">
    @import '@/common/scss/variable.scss';

    .side-menu-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .side-menu {
        width: 161px;
        .item {
            display: flex;
            justify-content: center;
            margin: 10px 0px;
        }
        .item-link {
            width: 88%;
            color: #3c3c3c;
            display: flex;
            align-items: center;
            line-height: 28px;
            padding: 10px 15px;
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

</style>
