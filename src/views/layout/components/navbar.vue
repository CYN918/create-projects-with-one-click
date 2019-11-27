<template>
  <div class="navbar-container">
    <el-row class="row">
      <el-col :span="6" class="col">
        <img :src="logo" onerror="javascript:this.src='http://img.fyuanai.com/test/2019-11-18/b75de773f05d4b7d8c9bbcea72507679-logo-top.png'" alt class="logo_img" />
        <div class="line"></div>
        <span class="logo_name">
          <template v-if="isAgency">服务商后台管理</template>
          <template v-else-if="isSupplier">供应商后台管理</template>
          <template v-else-if="isCustomer">客户后台管理</template>
          <template v-else>总站管理平台</template>
        </span>
      </el-col>
      <el-col :span="6" class="col" v-show="false">
        <el-col :span="8">
          <div class="help">
            <img src="@/common/images/帮助.png" alt />
            <span>帮助中心</span>
          </div>
        </el-col>
         <!-- v-if="!isSystem" -->
        <el-col :span="8">
          <div class="view">
            <div class="certification">
              <span>已认证</span>
            </div>
            <div class="Clicktoview">
              <span>查看</span>
            </div>
          </div>
        </el-col>
         <!-- v-if="isAgency" -->
        <el-col :span="8">
          <div class="renewal">
            <span>续费</span>
          </div>
        </el-col>
      </el-col>
      <el-col :span="14" class="col" style="justify-content: flex-end;">
        <div style="display:flex;">
          <div class="department" style="margin-right:20px">
            <img src="@/common/images/公司名称.png" alt class="department_img" />
            <span>公司名称：{{ obj.data.company||'暂无' }}</span>
          </div>
          <div class="department" style="margin-right:20px">
            <img src="@/common/images/工号.png" alt class="department_img" />
            <span>工号：{{ obj.data.employeeSn||'暂无' }}</span>
          </div>
          <div class="department" style="margin-right:20px">
            <img src="@/common/images/部门.png" alt class="department_img" />
            <span>部门：{{ obj.data.organizeName || '暂无' }}</span>
          </div>
          <div class="department" style="margin-right:20px">
            <img src="@/common/images/姓名.png" alt class="department_img" />
            <span>姓名：{{ obj.data.sysuserName || '暂无' }}</span>
          </div>
          <div class="department" style="margin-right:20px">
            <img src="@/common/images/职位.png" alt class="department_img" />
            <span>职位：{{ obj.data.position || '暂无' }}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="1"  class="col">
          <div class="line"></div>
        </el-col>
        <el-col :span="1"   class="col">
          <div class="department" @click="refech">
            <img src="@/common/images/刷新.png" alt class="department_img" />
            <span>刷新</span>
          </div>
        </el-col>
        <el-col :span="2" class="col">
          <div class="department" @click="logout">
            <img src="@/common/images/退出登录.png" alt class="department_img" />
            <span>退出登录</span>
          </div>
        </el-col>
      <!-- <el-col :span="10" class="col"> -->
        <!-- <el-col :span="10" class="col">

          <div class="department">
            <img src="@/common/images/职位.png" alt class="department_img position_img" />
            <span>职位：{{ obj.data.position || '暂无' }}</span>
          </div>
          <div class="department">
            <img src="@/common/images/姓名.png" alt class="people_img" />
            <span>姓名：{{ obj.data.sysuserName || '暂无' }}</span>
          </div>
        </el-col> -->
        <!-- <el-col :span="5" class="col">
          <div class="department">
            <img src="@/common/images/职位.png" alt class="department_img position_img" />
            <span>职位：{{ obj.data.position || '暂无' }}</span>
          </div>
        </el-col>
        <el-col :span="5">

        </el-col> -->
        <!--  -->
        <!--  -->
        <!--  -->
      <!-- </el-col> -->
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getToken, removeToken } from "@/utils/auth";
import { cancellation } from "@/api/login";
export default {
  name: "Navbar",
  data() {
    return {
      display: false,
      obj: {},
      logo: "http://img.fyuanai.com/test/2019-11-18/b75de773f05d4b7d8c9bbcea72507679-logo-top.png",
    };
  },
  computed: {
    ...mapGetters(["name", "avatar"]),
    isSupplier() {
      return 1 == this.obj.data.sysuserType;
    },
    isAgency() {
      return 3 == this.obj.data.sysuserType;
    },
    isCustomer() {
      return 2 == this.obj.data.sysuserType;
    },
    isSystem() {
      return !(this.isSupplier || this.isAgency || this.isCustomer);
    }
  },
  methods: {
    toggleSideBar() {
      this.display = !this.display;
    },

    /**
     * 调用注销接口
     * 确保会清理Token及转跳登录页
     */
    async logout() {
      
      let token = getToken();
      try {
        await cancellation(token);
      } finally {
        localStorage.clear()
        this.$router.push({ path: "/" });
      }
    },
    async refech() {
      this.$router.go(0);
    }
  },
  created() {
    this.obj = JSON.parse(localStorage.getItem("user"));
  },
  mounted() {
    try {
      let info = this.$platformOpenInfo;
      this.logo = info.logoImage;
      console.log(this.logo);
    }catch (e) {
      console.error(e)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.navbar-container {
  position: relative;
  color: #fff;
  .row {
    height: 100%;
    .col {
      display: flex;
      align-items: center;
      height: 100%;
      .help {
        width: 94px;
        height: 26px;
        background: rgba(247, 250, 255, 1);
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        span {
          font-size: 12px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(75, 153, 251, 1);
          margin-left: 6px;
        }
      }
      .view {
        width: 99px;
        height: 26px;
        background: rgba(247, 250, 255, 1);
        border-radius: 4px;
        display: flex;
        cursor: pointer;
        .certification {
          width: 59px;
          height: 26px;
          background: rgba(255, 178, 96, 1);
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            font-size: 12px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(247, 250, 255, 1);
          }
        }
        .Clicktoview {
          width: 59px;
          height: 26px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          span {
            font-size: 12px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(75, 153, 251, 1);
          }
        }
      }
      .renewal {
        width: 49px;
        height: 26px;
        background: rgba(247, 250, 255, 1);
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          font-size: 12px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(75, 153, 251, 1);
        }
      }
      .department {
        cursor: pointer;
        .department_img {
          width: 16px;
          height: 15px;
          margin-right: 11px;
          position: relative;
          top: 1px;
        }
        .position_img {
          width: 17px;
          height: 14px;
        }
        .people_img {
          width: 14px;
          height: 14px;
          margin-left: 2%;
          margin-right: 11px;
          position: relative;
          top: 1px;
        }
        span {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          position: relative;
          top: -1px;
        }
      }
    }
    .line {
      width: 1px;
      height: 31px;
      background: rgba(175, 210, 255, 1);
      border-radius: 1px;
      margin: 0 15px;
    }
    .logo_img {
      margin-left: 33px;
    }
    .logo_name {
      height: 19px;
      font-size: 18px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
