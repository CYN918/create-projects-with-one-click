<template>
  <div class="margin dealerlist">
    <el-form ref="form" label-width="140px" size="small">
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
                  <p>{{activityInfo.activityTopic}}</p>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="14">
                <el-form-item label="活动类型：">
                  <p>{{activityTypeName}}</p>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="活动时间：">
                  <span>{{activityInfo.startTime}}</span>
                  <span style="font-size: 14px;color: #606266;margin: 0 6px">-</span>
                  <span>{{activityInfo.entTime}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="商品推荐：">
                  <span>{{activityInfo.recommendStartTime}}</span>
                  <span style="font-size: 14px;color: #606266;margin: 0 6px">-</span>
                  <span>{{activityInfo.recommendEndTime}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="活动链接：">
                  <p></p>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="14">
                <el-form-item label="排序：">
                  <span>{{activityInfo.sortOrder}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="activityInfo.groupMember">
              <el-col :span="16">
                <el-form-item label="拼团人数：">
                  <span>{{activityInfo.groupMember}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="活动内容：">
                  <p>{{activityInfo.content}}</p>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="关键字：">
                  <p>{{activityInfo.keyWord}}</p>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="首页广告位展示图：">
                  <div class="uploadImgWrap">
                    <div style="display: inline-block; margin-right: 20px">
                      <i class="img_wrap"><img :src="activityInfo.homePageImgUrl" alt=""></i>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="活动首页海报：">
                  <div class="uploadImgWrap">
                    <ul style="display: inline-block; margin-right: 20px">
                      <li style="display: inline-block; margin-right: 6px;margin-bottom: 6px" v-for="item in activityInfo.galleryLists">
                        <i class="img_wrap"><img :src="item.imgUrl" alt=""></i>
                      </li>
                    </ul>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row id="addClassify" v-if="activityInfo.allType && activityInfo.allType.length > 0">
              <el-col>
                <el-form-item label="活动商品分类：">
                  <ul class="clearfix classifyList">
                    <li class="classifyItem" v-for="item in activityInfo.allType">
                      {{item.goodsTypeName}}
                    </li>
                  </ul>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { throttleTipPop } from '@/utils/throttle'
import { reqActivityProClassify, reqActivityList } from '@/api/activity/index'

export default {
  name: "ActivityInfo",
  data() {
    return {
      activityTypeName: '',
      activityId: '', // 活动Id
      activityInfo: '', // 活动信息
      content: '活动详情',
    }
  },
  mounted() {
    this.getQuery()
    this.getActivityList()
    this.getActivityDetail() // 获取活动列表
  },
  methods: {
    async getActivityList() {
      const res = await reqActivityList()
      if (res.code === 200) {
        this.activityGoodsType = res.data.list
      }
      this.activityGoodsType.forEach((item) => {
        if (item.activityTypeNum === this.$route.query.activityTypeNum) {
          this.activityTypeName = item.activityTypeName
        }
      })
    },
    // 获取query中的activityId
    getQuery() {
      this.activityId = this.$route.query.activityId
    },
    // 获取活动详情
    async getActivityDetail() {
      const res = await reqActivityProClassify(this.activityId)
      if (res.code === 200) {
        this.activityInfo = res.data
      }
    },
    // 返回
    back() {
      this.$router.push({
        name: 'activityRecommend',
        params: {'activityTypeId': this.$route.query.activityTypeId}
      })
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
      margin-right: 12px;

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