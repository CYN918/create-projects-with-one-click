<template>
  <div class="loading">
      <img src="@/common/images/cache.gif" alt="">
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
.loading{
    position:fixed;
    left:280px;
    top:0;
    right: 0;
    bottom: 0;
    height:100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    img{
        position: absolute;
        left: 0;
        right: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
    }
}
</style>