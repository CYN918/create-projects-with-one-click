<template>
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="160px" size="small" prop="form">
          <div class="search-wrapper">
            <h4 class="title">功能介绍</h4>
             <!-- <quill-editor v-model="form.introduction" ref="myQuillEditor"></quill-editor> -->
             {{form.introduction}}
          </div>
        </el-form>
      </div>
    </div>
</template>

<script>
// import { quillEditor } from "vue-quill-editor";
export default {
  name: "introduce",
  props: {
    form: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {

    };
  },
  created() {},
  computed: {},
  methods: {
    
  },
  components: {
    // quillEditor
  }
};
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
      color: 3333;
      padding-left: 10px;
      line-height: 1.4;
      border-left: 4px solid $themeColor;
      margin-bottom: 10px;
    }
  }
}
</style>
