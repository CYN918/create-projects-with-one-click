<template>
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="160px" size="small">
          <div class="search-wrapper">
          <h4 class="title">使用教程</h4>
            <!-- <el-input type="hidden" v-model="form.courseInt"></el-input> -->
            <!-- <quill-editor v-model="form.courseInt" ref="myQuillEditor"></quill-editor> -->
                  <video :src="form.courseVideo" controls="controls" style="width: 300px;height: 300px;">
                  </video>
            <div class="wrapper" v-html="form.courseInt"></div>
          </div>
        </el-form>
      </div>
    </div>
</template>

<script>
// import { quillEditor } from 'vue-quill-editor'
export default {
   name: "teach",
  props: {
    form: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
    data () {
    return {

    }
  },
  created () {
  },
  methods:{
    trandata(){}
  },
  computed: {
  },
  components: {
      // quillEditor
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.goods-fitter {
  .search-wrapper {
    padding: 20px;
    border: 1px solid rgb(215, 224, 241);
    background: #fff;
    .title {
      margin-left: -20px;
      font-size: 16px;
      font-weight: 400;
      /*color: 3333;*/
      padding-left: 10px;
      line-height: 1.4;
      border-left: 4px solid $themeColor;
      margin-bottom: 10px;
    }

  }

}
/deep/ img{
    width: 100%;
}

</style>
