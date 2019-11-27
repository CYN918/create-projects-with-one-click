<template>
  <div class="aside-wrapper">
    <div class="item" v-for="(item, index) in data" :key="index">
      <app-link class="item-link" :to="item.path">{{item.title}}</app-link>
    </div>
  </div>
</template>

<script>
import AppLink from './link'

export default {
  name: 'AsideMenu',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  components: {
    AppLink
  }
}

</script>

<style scoped lang="scss">
    @import '@/common/scss/variable.scss';
    .aside-wrapper {
        position: absolute;
        top: 0;
        left: 150px;
        width: 110px;
        bottom: 0;
        overflow: auto;
        border-left: 1px solid #EDF0F5;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -ms-flex-negative: 0;
        flex-shrink: 0;
        z-index: 1001;
        overflow-y: scroll;
        background: #fff;
        box-sizing: border-box;
        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
        &::-webkit-scrollbar-track-piece {
            background-color: rgba(0, 0, 0, 0.2);
            -webkit-border-radius: 6px;
        }
        &::-webkit-scrollbar-thumb:vertical {
            height: 5px;
            background-color: rgba(125, 125, 125, 0.7);
            -webkit-border-radius: 6px;
        }
        &::-webkit-scrollbar-thumb:horizontal {
            width: 5px;
            background-color: rgba(125, 125, 125, 0.7);
            -webkit-border-radius: 6px;
        }
        .item {
            display: flex;
            justify-content: center;
            margin: 10px;
            .item-link {
                display: block;
                width: 100%;
                line-height: 40px;
                font-size: 14px;
                color: #333;
                text-align: center;
                overflow: hidden;
                white-space: nowrap;
                &.router-link-active {
                    background: $themeColor;
                    color: #fff;
                }
            }
        }
    }

</style>
