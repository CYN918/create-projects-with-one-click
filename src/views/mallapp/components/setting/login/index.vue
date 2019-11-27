<template>
  <div class="margin">
    <div class="mcard">
      <div class="title">站点登录页设置</div>
      <el-form :model="form" ref="form" label-width="100px" class="form-wrapper">
        <el-form-item label="登录页地址："><span class="theme">{{url}}</span></el-form-item>
        <el-form-item label="LOGO：">
          <el-upload
            class="upload-demo"
            action="action">
            <div class="image"><img src="" alt=""></div>
            <el-button size="small">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              <p>1、建议尺寸 156px * 60px</p>
              <p>2、支持JPG、PNG、GIF、JPEG格式的图片，每张图片不能大于1MB；</p>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="名称：">
          <el-input class="width32" v-model="form.store_login_title" placeholder="2-10个字符，支持汉字、字母、数字等组合"></el-input>
        </el-form-item>
        <el-form-item label="登录页主图：">
          <el-upload
            class="upload-demo"
            :action="action">
            <el-button size="small">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              <p>1、建议尺寸 500px * 400px</p>
              <p>2、支持JPG、PNG、GIF、JPEG格式的图片，每张图片不能大于1MB；</p>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保 存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>

export default {
  name: 'MsettingLogin',
  data () {
    return {
      url: 'http://www.abd.com',
      action: 'https://jsonplaceholder.typicode.com/posts/',
      form: {
        store_login_title: '' // 名称
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/variable.scss';
.form-wrapper {
  margin-left: 200px;
  .theme {
    color: $themeColor;
  }
  .width32 {
    width: 320px;
  }
  .image {
    width: 80px;
    height: 80px;
    margin-right: 10px;
    display: inline-block;
    background: #eee;
  }
}
</style>
