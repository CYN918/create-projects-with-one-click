<template>
  <div class="margin ">
    <el-form :model="form" ref="form"  label-width="140px" size="small">
      <div class="mbottom">
        <div class="goods-fitter">
            <div class="search-wrapper">
              <el-upload
                :action="action"
                list-type="picture-card"
                :on-success="handleAvatarSuccess">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { imageUploadUrl } from '@/api/config'

export default {
  data () {
    return {
      form:{
        action:'',
        dialogImageUrl:{
          galleryes:[
          ]
        }
      }
    }
  },
  created () {
    this.action = this.baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile?'
  },
  methods: {
     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleAvatarSuccess (res, file) {
        this.form.dialogImageUrl.galleryes.push({
          imgUrl:res.data.domain+res.data.filePath,
          id:res.data.filePath
        });
        console.log(this.form.dialogImageUrl.galleryes)
      },
  }
}
</script>

<style lang='scss' scoped>
@import "@/common/scss/variable.scss";
.goods-fitter {
  .vender {
    ul {
      li {
        float: left;
        height: 41px;
        padding: 0 10px;
        line-height: 41px;
        text-align: center;
        border: 1px solid transparent;
        font-size: 16px;
        color: #333;
        cursor: pointer;
        &.active {
          border: 1px solid #d7e0f1;
          border-bottom: 0;
          background-color: #fff;
          position: relative;
          position: relative;
          &:after {
            position: absolute;
            content: "";
            left: 0;
            bottom: -1px;
            height: 1px;
            width: 100%;
            background: #fff;
          }
        }
        .image {
          display: inline-block;
          width: 30px;
          margin-right: 10px;
          font-size: 0;
          line-height: 40px;
          vertical-align: top;
          img {
            width: 100%;
            vertical-align: middle;
          }
        }
      }
    }
  }
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
    .search-main {
    }
    .search-base {
    }
  }
  .text-space {
    text-align: center;
    color: #606266;
    font-size: 12px;
  }
  .el-select-width {
    max-width: 130px;
    margin-right: 5px;
  }
  .el-input-width {
    display: inline-block;
    max-width: 180px;
  }
  .btn-toggle {
    margin-left: 10px;
    font-size: 14px;
    color: $themeColor;
    cursor: pointer;
  }
}

</style>
