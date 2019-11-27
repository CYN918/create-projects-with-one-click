<template>
  <div class="margin dealerlist">
    <el-form ref="form" :model="form" label-width="140px" size="small">
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <el-page-header @back="back" :content="content"></el-page-header>
          </div>
        </div>
      </div>
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper">
            <h4 class="title">活动信息</h4>
            <el-row>
              <el-col :span="16">
                <el-form-item label="活动主题：">
                  <el-input v-model="form.activityTopic" clearable placeholder="请输入活动主题"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="14">
                <el-form-item label="活动类型：">
                  <el-select v-model="form.activityTypeId" placeholder="请选择">
                    <el-option
                      v-for="item in activityGoodsType"
                      :label="item.activityTypeName"
                      :value="item.activityTypeId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="活动时间：">
                  <el-date-picker
                    :editable="false"
                    style="display: inline-block"
                    v-model="form.startTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="date"
                    placeholder="开始时间">
                  </el-date-picker>
                  <span style="font-size: 14px;color: #606266;margin: 0 6px">-</span>
                  <el-date-picker
                    :editable="false"
                    style="display: inline-block"
                    v-model="form.endTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="date"
                    placeholder="结束时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="商品推荐：">
                  <el-date-picker
                    :editable="false"
                    style="display: inline-block"
                    v-model="form.recommendStartTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="date"
                    placeholder="开始时间">
                  </el-date-picker>
                  <span style="font-size: 14px;color: #606266;margin: 0 6px">-</span>
                  <el-date-picker
                    :editable="false"
                    style="display: inline-block"
                    v-model="form.recommendEndTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="date"
                    placeholder="截至时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="活动链接：">
                  <el-input v-model="form.jumpUrl" clearable placeholder="请输入活动链接"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="14">
                <el-form-item label="排序：">
                  <el-select v-model="form.sortOrder" placeholder="请选择">
                    <el-option
                      v-for="item in 100"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="活动内容：">
                  <el-input v-model="form.content" clearable placeholder="请输入活动内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="关键字：">
                  <el-input v-model="form.keyWord" clearable placeholder="请输入关键字"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="首页广告位展示图：">
                  <div class="uploadImgWrap">
                    <div v-if="home_banner" style="display: inline-block; margin-right: 20px">
                      <i class="img_wrap"><img :src="home_banner" alt=""></i>
                    </div>
                    <div style="display: inline-block">
                      <label for="uploadPic0"
                             style="margin-bottom:20px;display: inline-block;cursor: pointer; height:32px;line-height: 32px;padding: 0 14px;background:rgba(76,134,244,1);color: #fff;border-radius:3px;">
                        <input ref="file_input0" type="file" @change="uploadPic(0)" accept="image/jpeg, image/png"
                               id="uploadPic0" style="position: absolute; top: -10000px">
                        <span v-if="!home_banner">上传图片</span>
                        <span v-else="">重新上传</span>
                      </label>
                      <p style="color: #606266;font-size: 12px; line-height: 2">1、图片尺寸建议：710px*300px</p>
                      <p style="color: #606266;font-size: 12px; line-height: 2">2、支持JPG、PNG格式的图片，图片不能大于2M。</p>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="活动首页海报：">
                  <div class="uploadImgWrap">
                    <ul style="display: inline-block; margin-right: 20px" v-if="imgUrls.length > 0">
                      <li style="display: inline-block; margin-right: 6px;margin-bottom: 6px" v-for="item in imgUrls">
                        <i class="img_wrap"><img :src="item" alt=""></i>
                      </li>
                    </ul>
                    <div style="display: inline-block">
                      <label for="uploadPic1"
                             style="margin-bottom:20px;display: inline-block;cursor: pointer; height:32px;line-height: 32px;padding: 0 14px;background:rgba(76,134,244,1);color: #fff;border-radius:3px;">
                        <input ref="file_input1" type="file" @change="uploadPic(1)" accept="image/jpeg, image/png"
                               id="uploadPic1" style="position: absolute; top: -10000px">
                        上传图片
                      </label>
                      <p style="color: #606266;font-size: 12px; line-height: 2">1、图片尺寸建议：710px*300px</p>
                      <p style="color: #606266;font-size: 12px; line-height: 2">2、支持JPG、PNG格式的图片，图片不能大于2M。</p>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row id="addClassify" v-if="needAddProClassify">
              <el-col>
                <el-form-item label="">
                  <div style="display: inline-block">
                    <el-button class="add_btn" type="primary" size="small" @click="dialogVisible = true">
                      <img style="margin-right: 6px" src="@/common/images/activity/icon_add_classify.png" alt="">添加商品分类
                    </el-button>
                  </div>
                  <ul class="clearfix classifyList">
                    <li class="classifyItem" v-for="(item, index) in productClassify">
                      {{item.goodsTypeName}}
                      <div class="deleteClassify" @click="deleteClassify(index)"><i class="el-icon-close"></i></div>
                    </li>
                  </ul>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-form>
    <!--添加商品分类-->
    <el-dialog
      id="newClassify"
      title="新建活动商品分类"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <el-form :model="form1" :rules="rules" ref="form1" label-width="100px">
        <el-form-item label="商品分类：" prop="goodsTypeName">
          <el-input v-model="form1.goodsTypeName" clearable placeholder="请输入商品分类"></el-input>
        </el-form-item>
        <el-form-item label="副标题：" prop="goodsTypeSubtitle">
          <el-input v-model="form1.goodsTypeSubtitle" clearable placeholder="请输入副标题"></el-input>
        </el-form-item>
        <el-form-item label="活动介绍：" prop="goodsTypeImgDesc">
          <el-input
            width="80%"
            type="textarea"
            :rows="8"
            placeholder="请输入活动介绍内容"
            v-model="form1.goodsTypeImgDesc">
          </el-input>
        </el-form-item>
        <el-form-item label="活动排序：" prop="sortOrder">
          <el-select min="0" v-model="form1.sortOrder" placeholder="请选择" id="order">
            <el-option
              v-for="item in 100"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动海报：" ref="classifyBanner">
          <div class="uploadImgWrap">
            <div v-if="classifyBannerUrl" class="img_wrap" style="margin-right: 20px;">
              <img style="width: 100%; height: 100%" :src="classifyBannerUrl" alt="">
            </div>
            <div style="display: inline-block;">
              <label for="uploadPic"
                     style="margin-bottom:20px;display: inline-block;cursor: pointer; height:32px;line-height: 32px;padding: 0 14px;background:rgba(76,134,244,1);color: #fff;border-radius:3px;">
                <input ref="file_input2" type="file" @change="uploadPic(2)" accept="image/jpeg, image/png"
                       id="uploadPic" style="position: absolute; top: -10000px">
                <span v-if="!classifyBannerUrl">上传图片</span>
                <span v-else>重新上传</span>
              </label>
              <p style="color: #606266;font-size: 12px; line-height: 2">1、图片尺寸建议：710px*300px</p>
              <p style="color: #606266;font-size: 12px; line-height: 2">2、支持JPG、PNG格式的图片，图片不能大于2M。</p>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmCreateNewType" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!--添加商品分类-->
  </div>
</template>

<script>
import { throttleTipPop } from '@/utils/throttle'
import { reqActivityList } from '@/api/activity/index'

export default {
  name: "ActivityInfo",
  data() {
    return {
      needAddProClassify: false, // 是否需要添加商品分类
      activityGoodsTypeId: '', //活动商品分类ID
      recommendProList: [], // 推荐商品列表
      productClassify: [], // 商品分类
      imgFile0: '', // 首页广告位展示图文件
      imgFiles: [], // 活动首页海报上传多个文件
      home_banner: '', // 首页展示banner图
      imgUrls: [], // 活动详情页banner轮播
      classifyBannerUrl: '', // 分类海报
      dialogVisible: false, // 选择商品分类
      activityGoodsType: [], // 活动类型
      content: '活动编辑', // 内容
      form: { // 新增活动参数
        activityTopic: '', // 活动类型主题
        activitySubtitle: '', // 副标题
        activityTypeId: '', // 活动类型Id
        activityTypeNum: '', // 活动类型编号
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        recommendStartTime: '', // 商品推荐开始时间
        recommendEndTime: '', // 商品推荐结束时间
        jumpUrl: '', // 活动链接
        sortOrder: '', // 排序
        content: '', // 活动内容
        keyWord: '', // 关键字
        homePageImgUrl: '', // 活动首页配图
        galleryList: [], // 活动banner图
        activityGoodsTypeList: [], // 活动商品分类
      },
      form1: { // 新建活动商品分类参数
        goodsTypeName: '', // 商品分类
        goodsTypeSubtitle: '', // 副标题
        goodsTypeImgDesc: '', // 活动介绍
        sortOrder: '', // 活动排序
        goodsTypeImgUrl: '', // 活动海报
      },
      rules: { // 添加商品分类参数检验
        goodsTypeName: [
          {required: true, message: '请输入商品分类名称', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
        ],
        goodsTypeSubtitle: [
          {required: true, message: '请输入副标题', trigger: 'blur'}
        ],
        goodsTypeImgDesc: [
          {max: 200, message: '活动介绍不得超过200字', trigger: 'change'}
        ],
        sortOrder: [
          {type: 'number', required: true, message: '请选择活动排序', trigger: 'change'}
        ],
      }
    }
  },
  watch: {
    'form.activityTypeId'(val) {
      this.activityGoodsType.forEach((item) => {
        if (item.activityTypeId === val) {
          this.form.activityTypeNum = item.activityTypeNum
        }
      })
    },
    'form.activityTypeNum'(val) {
      console.log(val)
      if (val === 4 || val === 5 || val === 8 || val === 9 ) {
        this.needAddProClassify = true
      } else {
        this.needAddProClassify = false
      }
    }
  },
  mounted() {
    this.getActivityList() // 获取活动列表
  },
  methods: {
    // 获取活动列表
    async getActivityList() {
      const res = await reqActivityList()
      if (res.code === 200) {
        this.activityGoodsType = res.data.list
      }
    },
    // 确定添加商品分类
    confirmCreateNewType() {
      this.$refs['form1'].validate((valid) => {
        if (valid) {
          const obj = this.form1
          this.productClassify.push(obj)
          this.dialogVisible = false
          this.form1 = {}
          this.classifyBannerUrl = ''
        } else {
          return false;
        }
      })
    },
    // 上传图片(前端展示)
    async uploadPic(index) {
      const files = this.$refs[`file_input${index}`].files[0]
      const type = files.type
      const size = files.size
      const mazSize = 2 * 1024 * 1024
      if (type !== 'image/png' && type !== 'image/jpeg') {
        throttleTipPop(this, 'error', '文件格式不正确')
        return
      }
      if (size > mazSize) {
        throttleTipPop(this, 'error', '文件大小不得超过2M')
        return
      }
      const path = await this.uploadFileToService(files)
      const reader = new FileReader()
      reader.onload = (e) => {
        if (index === 0) {
          this.form.homePageImgUrl = path
          this.home_banner = e.target.result
        } else if (index === 1) {
          const obj = {}
          obj.imgOriginalUrl = path
          obj.imgUrl = path
          obj.thumbnailUrl = path
          this.form.galleryList.push(obj)
          this.imgUrls.push(e.target.result)
        } else if (index === 2) {
          this.form1.goodsTypeImgUrl = path
          // this.$refs.classifyBanner.clearValidate()
          this.classifyBannerUrl = e.target.result
        }
      }
      reader.readAsDataURL(files)
      this.$refs[`file_input${index}`].value = '' // 清空上传的文件
    },
    // 返回
    back() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="scss" scoped>
  @import "@/common/scss/variable.scss";

  #addClassify {
    /deep/ .el-form-item__content {
      margin-left: 60px !important;
    }
  }

  .classifyList {
    display: inline-block;

    .classifyItem {
      float: left;
      position: relative;
      width: 93px;
      height: 32px;
      line-height: 32px;
      background: rgba(241, 248, 255, 1);
      border-radius: 4px;
      font-size: 12px;
      color: rgba(76, 134, 244, 1);
      text-align: center;
      margin-left: 24px;

      .deleteClassify {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 0;
        height: 0;
        border-right: 11px solid #4A99FA;
        border-bottom: 11px solid #4A99FA;
        border-top: 11px solid transparent;
        border-left: 11px solid transparent;
        border-radius: 0 0 4px 0;
        cursor: pointer;
        color: #fff;

        .el-icon-close {
          position: relative;
          top: -11px;
          right: 2px;
          color: #fff;
        }
      }
    }
  }

  #newClassify {
    /deep/ .el-textarea__inner, /deep/ .el-input, /deep/ .el-select {
      width: 80%;
    }
  }

  /* 活动列表*/
  /deep/ .el-tabs--border-card {
    box-shadow: none;
    border: none;
  }

  /deep/ .el-tabs__content {
    border: 1px solid #D6DEEF;
    margin-top: -2px;
  }

  /deep/ .el-tabs__item {
    height: 58px;
    line-height: 58px;
    color: #333;
    padding: 0 26px;
  }

  /deep/ .el-tabs__nav-wrap {
    background: #f7faff;
  }

  /deep/ .is-active {
    border-top: 1px solid #DCDFE6 !important;
    margin-left: 0 !important;
    margin-top: 0 !important;
  }

  /* 活动列表*/

  /deep/ .el-page-header__content {
    font-size: 16px;
    color: #3C3C3C;
  }

  ul, li, div, img {
    vertical-align: middle;
  }

  .img_wrap {
    display: inline-block;
    width: 364px;
    height: 180px;
    border: 1px solid #ececec;

    img {
      width: 100%;
      height: 100%;
    }
  }

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

    .search-wrapper1 {
      padding: 20px;
      border: 1px solid rgb(215, 224, 241);
      background: #fff;
      display: flex;
      align-items: center;

      .title1 {
        display: flex;
        margin-left: 40%;
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