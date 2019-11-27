<template>
  <div class="margin">
    <component :is="page[currentIndex]"/>
  </div>
</template>

<script>
import MyBackstage from "./myFiles/mybackstage";
import MySupplier from "./myFiles/mysupplier";
import MyClient from "./myFiles/myclient";
import MyAgent from "./myFiles/myagent";

export default {
  components: {
    MyBackstage,
    MySupplier,
    MyClient,
    MyAgent
  },
  data() {
    return {
      page: {
        0: MyBackstage,
        1: MySupplier,
        2: MyClient,
        3: MyAgent
      },
      form: null,
      currentIndex: 0
    };
  },
  mounted() {
    this.getSelfData();
  },

  methods: {
    //获取当前用户数据
    getSelfData() {
      let { data } = JSON.parse(localStorage.getItem("user"));
      this.currentIndex = data.sysuserType;
    }
  },
  watch: {}
};
</script>
