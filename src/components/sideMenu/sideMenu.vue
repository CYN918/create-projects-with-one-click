<template>
  <div class="aside-wrapper">
    <div class="item" v-for="item in data" :key="item.menuId">
      <app-link class="item-link" :to="item.pageUrl">{{item.menuName}}</app-link>
    </div>
  </div>
</template>

<script>
import AppLink from "./link";
import { getMerchantName } from "@/api/systemsettings/index";
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  components: {
    AppLink
  },
  created () {
     this.getMerchantName()
  },
  methods:{
    async getMerchantName(){
    const  { data }  = await getMerchantName()
      if( data.platformType == 0 ){
        // 总站后台
        this.data.forEach( (ele,index) =>{
          if( ele.menuId == "208618838231617536" ){
              this.data.splice(index,1)
          }
        })
      }else if( data.platformType == 1 ){
          // 经销商后台
          this.data.forEach( (ele,index) =>{
            if( ele.menuId == "208618838231617536" ){
                this.data.splice(index,1)
            }
          })
      }else if( data.platformType == 2 ){
          // 项目后台
          this.data.forEach( (ele,index) =>{
            if( ele.menuId == "218421956708405248" ){
                this.data.splice(index,1)
            }
        })
      }
    },
  },
  watch: {
    data(val) { this.getMerchantName() }
  }
};
</script>

<style scoped lang="scss">
@import "@/common/scss/variable.scss";
.aside-wrapper {
  position: fixed;
  top: 60px;
  left: 150px;
  width: 130px;
  bottom: 0;
  overflow: auto;
  border-left: 1px solid #edf0f5;
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
      text-align: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-left: 10px;
      &.router-link-active {
        background: $themeColor;
        color: #fff;
      }
    }
  }
}
</style>
