<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods:{
  },
  created(){
    if(this.$platformOpenInfo &&  this.$platformOpenInfo.title){
       //动态展示对于的图片和名称
      document.title = this.$platformOpenInfo.title
      var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.href = this.$platformOpenInfo.icon
    }
  }
}
</script>
