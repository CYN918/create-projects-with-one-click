<template>
  <div class="margin">
    <el-row class="service-warpper">
      <el-col :span="12">
        <div class="avatar">
          <img :src="avatar" alt>
        </div>
        <div class="info">
          <p class="name">博士鹰信息技术有限公司</p>
          <div>
            <span class="certification">已认证</span>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="right">
        博士鹰服务商 到期还有
        <span class="red">100</span>天
        <el-tooltip placement="bottom">
          <div slot="content">
            <p class="tool-tip">开通时间：1970-01-01</p>
            <p class="tool-tip">结束时间：1970-01-01</p>
          </div>
          <el-button type="text" class="item-desc">详情</el-button>
        </el-tooltip>
        <el-button type="primary">我要续费</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="apply">
      <el-col :span="6">
        <el-card shadow="never">
          <div class="item clearfix">
            <div class="image">
              <img :src="require('@/common/images/apply/integral.png')" alt>
            </div>
            <div class="info">
              <div>
                <p class="info-tit">博士鹰积分</p>
                <p class="info-desc">满足各种企业福利需求及营销需求，模式多样，自由度高</p>
              </div>
            </div>
          </div>
          <el-row class="number">
            <el-col :span="12">可创建：不限</el-col>
            <el-col :span="12">已创建：20</el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <div class="item clearfix">
            <div class="image">
              <img :src="require('@/common/images/apply/mall.png')" alt>
            </div>
            <div class="info">
              <div>
                <p class="info-tit">博士鹰商城</p>
                <p class="info-desc">满足各种企业福利需求及营销需求，模式多样，自由度高</p>
              </div>
            </div>
          </div>
          <el-row class="number">
            <el-col :span="12">可创建：不限</el-col>
            <el-col :span="12">已创建：20</el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <div class="item clearfix">
            <div class="image">
              <img :src="require('@/common/images/apply/stages.png')" alt>
            </div>
            <div class="info">
              <div>
                <p class="info-tit">博士鹰分期</p>
                <p class="info-desc">满足各种企业福利需求及营销需求，模式多样，自由度高</p>
              </div>
            </div>
          </div>
          <el-row class="number">
            <el-col :span="12">可创建：不限</el-col>
            <el-col :span="12">已创建：20</el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <div class="item clearfix">
            <div class="image">
              <img :src="require('@/common/images/apply/card.png')" alt>
            </div>
            <div class="info">
              <div>
                <p class="info-tit">博士鹰卡券</p>
                <p class="info-desc">满足各种企业福利需求及营销需求，模式多样，自由度高</p>
              </div>
            </div>
          </div>
          <el-row class="number">
            <el-col :span="12">可创建：不限</el-col>
            <el-col :span="12">已创建：20</el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Service',
  computed: {
    ...mapGetters([
      'avatar'
    ])
  }
}
</script>

<style lang="scss" scoped>
.service-warpper {
  padding: 20px;
  margin-bottom: 20px;
  background: #fff;
  .avatar {
    display: inline-block;
    vertical-align: top;
    width: 60px;
    height: 60px;
    margin-right: 20px;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
  .info {
    display: inline-block;
    vertical-align: top;
    .name {
      margin-bottom: 11px;
      font-size: 20px;
      font-weight: 700;
      color: #333;
    }
    .certification {
      display: inline-block;
      padding: 0 6px;
      margin-right: 20px;
      line-height: 26px;
      background: #ff9136;
      font-size: 12px;
      border-radius: 4px;
      color: #fff;
    }
  }
  .right {
    margin: 10px 0;
    line-height: 40px;
    text-align: right;
    .item-desc {
      margin: 0 30px;
    }
  }
}
.tool-tip {
  line-height: 24px;
}
.apply {
  .operate {
    height: 32px;
    .image {
      display: inline-block;
      vertical-align: middle;
      width: 32px;
      margin-right: 40px;
    }
    .info {
      vertical-align: middle;
      font-size: 14px;
      display: inline-block;
      .sub {
        line-height: 1;
      }
    }
  }
  .item {
    margin-bottom: 20px;
    .image {
      vertical-align: middle;
      width: 80px;
      height: 80px;
      margin-right: 20px;
      float: left;
      img {
        width: 80px;
        height: 80px;
      }
    }
    .info {
      display: table;
      vertical-align: middle;
      font-size: 14px;
      margin-left: 100px;
      height: 80px;
      overflow: hidden;
      & > div {
        display: table-cell;
        vertical-align: middle;
      }
      .info-tit {
        font-size: 16px;
        margin-bottom: 10px;
        font-weight: 700;
      }
      .info-desc {
        font-size: 12px;
      }
    }
  }
  .number {
    font-weight: 700;
  }
}
</style>
