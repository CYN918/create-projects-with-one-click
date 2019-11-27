<template>
  <div class="preview">
    <ul class="previewList">
      <li v-for="(item,index) in previewArr" :key="index" @click="tabList(componentArr[index],index)" :class="{'active':index==num}">
        {{item}}
      </li>
      <li @click="isShowSidebar"><span>展开侧边栏</span></li>
    </ul>
    <div class="baseModule">
      <div class="baseModuleCenter">
        <BaseModule/>
      </div>
    </div>
    <div class="tabNavContainer">
      <div class="prompt">
        <div class="promptLeft">
          <img src="@/common/images/homeEitd/xiaoshou.png" alt="">
          <span>选择所需模块，并拖动至相应位置</span>
        </div>
        <div class="promptRight">
          <div class="previews">
            <img src="@/common/images/homeEitd/yulan.png" alt="">
            <span>预览</span>
          </div>
          <div class="cancel">
            <div>
              <img src="@/common/images/homeEitd/quxiao.png" alt="">
              <span>取消</span>
            </div>
          </div>
          <span class="confrim">
            保存
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import add from './add'
  export default {
    components:{
      add,
    },
    data() {
      return {
        isshow:true,
        currentView:HomeEditor,
        num:0,
        moduleArr:['PC模板','APP模板','小程序模板','微商城模板','H5模板'],
        moduleIndex:0,
        width:150,
      }
    },
    methods:{
      tabList(item,index){
        this.num = index
        this.currentView = item
      },
      handleModule(index){
        this.moduleIndex = index
      },
      //是否限时侧边栏
      isShowSidebar(){
        this.isshow = !this.isshow
        if(this.width==150){
          this.width=0
        }else if(this.width==0){
          this.width=150
        }
        this.$store.commit('SET_SIDEBAR',this.isshow )
        this.$store.commit('SET_ETID', this.width )
      }
    }
  }
</script>
<style lang="scss">
.preview{
  display: flex;
  width: 100%;
  .previewList{
    li{
      margin: 10px 0;
      width: 90px;
      height: 40px;
      text-align: left;
      line-height: 40px;
      font-size:13px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(60,60,60,1);
      cursor: default;
      &.active{
        background:#4C86F4 ;
        color: white;
     }
  }
 }
  .component{

  }
  .baseModule{
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 6px 0px rgba(0,5,14,0.1);
    width: 180px;
    .baseModuleCenter{
      width: 161px;
      margin: 0 auto;
    }
  }
  .tabNavContainer{
    width: 100%;
    .tabNavWrap{
      margin: 28px auto;
      width:1001px;
      overflow: hidden;
      .tabNav{
        width:1002px;
        height:40px;
        border:1px solid rgba(76,134,244,1);
        border-radius:4px;
        .moudelList{
          cursor: pointer;
          border-right: 1px solid rgba(76,134,244,1);
          float: left;
          width: 200px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          font-size:16px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(76,134,244,1);
          &.activet{
            background:rgba(76, 134, 244, 1) ;
            color:rgba(255,255,255,1);
          }
        }
      }
    }
    .prompt{
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
      width:1594px;
      height:66px;
      line-height: 66px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(214,222,239,1);
      font-size:14px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(76,134,244,1);
      .promptLeft{
        margin-left: 21px;
        img{
          margin-right: 10px;
          width: 16px;
          height: 20px;
        }
      }
      .promptRight{
        width: 355px;
        display: flex;
        justify-content: space-around;
        .previews,.cancel{
            img{
              cursor: pointer;
              margin-right: 10px;
            }
        }
        .cancel{
          div{
            display: inline;
            padding: 0 20px;
            border-left: 1px solid rgba(220, 223, 230, 1);
            border-right: 1px solid rgba(220, 223, 230, 1)
          }
        }
        .confrim{
          margin-top: 17px;
          cursor: pointer;
          width:68px;
          height:32px;
          text-align: center;
          line-height: 32px;
          background:rgba(76,134,244,1);
          border-radius:3px;
          font-size:12px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(255,255,255,1);
        }
      }
    }
  }

}
</style>