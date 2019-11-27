<template>
  <div class="margin dealerlist">
    <el-form label-width="140px" size="small">
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <el-page-header @back="back" :content="content"></el-page-header>
          </div>
        </div>
      </div>
    </el-form>
    <div>
      <el-tabs type="border-card" v-model="happyEventType">
        <el-tab-pane name="2" :lazy="true">
          <span slot="label" style="font-size: 16px; color: #333"><img style="vertical-align: middle; margin-right: 14px" src="@/common/images/activity/icon_xianhua.png" alt="">结婚</span>
          <UserManageTable :happyEventType="happyEventType" v-if="happyEventType === '2'"></UserManageTable>
        </el-tab-pane>
        <el-tab-pane name="3" :lazy="true">
          <span slot="label" style="font-size: 16px; color: #333"><img style="vertical-align: middle; margin-right: 14px" src="@/common/images/activity/icon_naiping.png" alt="">生子</span>
          <UserManageTable :happyEventType="happyEventType" v-if="happyEventType === '3'"></UserManageTable>
        </el-tab-pane>
        <el-tab-pane name="4" :lazy="true">
          <span slot="label" style="font-size: 16px; color: #333"><img style="vertical-align: middle; margin-right: 14px" src="@/common/images/activity/icon_bangongbao.png" alt="">升职</span>
          <UserManageTable :happyEventType="happyEventType" v-if="happyEventType === '4'"></UserManageTable>
        </el-tab-pane>
        <el-tab-pane name="5" :lazy="true">
          <span slot="label" style="font-size: 16px; color: #333"><img style="vertical-align: middle; margin-right: 14px" src="@/common/images/activity/icon_lingdai.png" alt="">入职司龄</span>
          <UserManageTable :happyEventType="happyEventType" v-if="happyEventType === '5'"></UserManageTable>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import UserManageTable from './common/UserManageTable'

export default {
  name: "UserManage",
  data() {
    return {
      happyEventType: '2', // 事件类型
      content: '用户管理',
    }
  },
  methods: {
    // 返回
    back() {
      this.$router.push({
        name: 'activityNotify',
        params: {'activityTypeId': this.$route.query.activityTypeId}
      })
    },
  },
  components: {
    UserManageTable,
  },
}
</script>

<style lang="scss" scoped>
  @import "@/common/scss/variable.scss";
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