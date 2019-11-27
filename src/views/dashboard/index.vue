<template>
  <div class="dashboard margin">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-card shadow="never">
          <h1 class="title">待发货订单</h1>
          <p class="number">{{dashboard.await_num}}</p>
          <div class="right-icon">
            <i class="el-icon-caret-right"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="never">
          <h1 class="title">售后订单</h1>
          <p class="number">{{dashboard.flaw_num}}</p>
          <div class="right-icon">
            <i class="el-icon-caret-right"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="never">
          <h1 class="title">昨日订单数</h1>
          <p class="number">{{dashboard.order_num}}</p>
          <div class="right-icon">
            <i class="el-icon-caret-right"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="never">
          <h1 class="title">昨日完成订单数</h1>
          <p class="number">{{dashboard.success_num}}</p>
          <div class="right-icon">
            <i class="el-icon-caret-right"></i>
          </div>
        </el-card>
      </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
        <el-card shadow="never">
          <h1 class="title">昨日交易额（元）</h1>
          <h1 class="title">昨日采购额（元）</h1>
          <h1 class="title">昨日毛利润（元）</h1>
          <h1 class="title">昨日未发货订单数</h1>
          <p class="number">{{dashboard.deal_money}}</p>
          <div class="right-icon">
            <i class="el-icon-caret-right"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="never">
          <h1 class="title">本月交易额（元）</h1>
          <h1 class="title">本月采购额（元）</h1>
          <h1 class="title">本月毛利润（元）</h1>
          <p class="number">{{dashboard.success_num}}</p>
          <div class="right-icon">
            <i class="el-icon-caret-right"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="never">
          <h1 class="title">本月应纳税额（元）</h1>
          <h1 class="title">本月纯利润（元）</h1>
          <h1 class="title">本月纯利润率</h1>
          <p class="number">{{dashboard.success_num}}</p>
          <div class="right-icon">
            <i class="el-icon-caret-right"></i>
          </div>
        </el-card>
      </el-col>
      </el-row>
    
    <div class="section">
      <div class="tit">常用功能</div>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-card shadow="never">
           <div class="operate">
             <div class="image"><svg id="icon-yingyongzhongxin" viewBox="0 0 1024 1024" width="100%" height="100%"><path d="M767.6 1023.1H256.4C115.5 1023.1 0.8 908.4 0.8 767.5V256.4C0.9 115.6 115.6 0.9 256.4 0.9h511.1c140.9 0 255.6 114.7 255.6 255.6v511.1c0 140.8-114.7 255.5-255.5 255.5zM256.4 93.8c-89.6 0-162.6 72.9-162.6 162.6v511.1c0 89.6 72.9 162.6 162.6 162.6h511.1c89.6 0 162.6-72.9 162.6-162.6V256.4c0-89.6-72.9-162.6-162.6-162.6H256.4z" fill="#FF9136"></path><path d="M743.5 797.9H575.8c-29 0-52.7-23.5-52.7-52.7V577.6c0-29 23.5-52.7 52.7-52.7h167.7c29 0 52.7 23.5 52.7 52.7v167.7c0 29.1-23.7 52.6-52.7 52.6M446.4 797.9H278.7c-29 0-52.7-23.5-52.7-52.7V577.6c0-29 23.5-52.7 52.7-52.7h167.7c29 0 52.7 23.5 52.7 52.7v167.7c0 29.1-23.5 52.6-52.7 52.6M743.5 500.9H575.8c-29 0-52.7-23.5-52.7-52.6V280.5c0-29 23.5-52.6 52.7-52.6h167.7c29 0 52.7 23.5 52.7 52.6v167.6c0 29.1-23.7 52.8-52.7 52.8M446.4 500.9H278.7c-29 0-52.7-23.5-52.7-52.6V280.5c0-29 23.5-52.6 52.7-52.6h167.7c29 0 52.7 23.5 52.7 52.6v167.6c0 29.1-23.5 52.8-52.7 52.8" fill="#FF9136"></path></svg></div>
             <div class="info">应用中心</div>
           </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="never">
            <div class="operate">
             <div class="image"><svg id="icon-shangpinjishi" viewBox="0 0 1024 1024" width="100%" height="100%"><path d="M768 1024H256C114.9 1024 0 909.1 0 768V256C0 114.9 114.9 0 256 0h512c141.1 0 256 114.9 256 256v512c0 141.1-114.9 256-256 256zM256 93.1c-89.8 0-162.9 73.1-162.9 162.9v512c0 89.8 73.1 162.9 162.9 162.9h512c89.8 0 162.9-73.1 162.9-162.9V256c0-89.8-73.1-162.9-162.9-162.9H256z" fill="#F76868"></path><path d="M512.2 529.1c80.7 0 150.3-57.2 164-134.5 13.8-5.4 23.5-18.5 23.5-33.8 0-20.2-16.9-36.5-37.8-36.5s-37.8 16.4-37.8 36.5c0 5.5 1.4 11 4 16 1.5 4.8 3.9 9.3 7.8 13-11.1 58-62.7 99.7-123.8 99.7-60.9 0-112.1-41.1-123.8-99.8 4.1-4 6.4-8.7 7.9-13.8 2.3-4.8 3.5-10 3.5-15.2 0-20.2-16.9-36.5-37.8-36.5s-37.8 16.4-37.8 36.5c0 15.4 9.8 28.5 23.7 33.9 13.7 77 83.5 134.5 164.4 134.5zM715.5 256c28.9 0 52.4 23.9 52.5 53.5v405c0 29.5-23.5 53.5-52.4 53.5H308.4c-28.9 0-52.4-24-52.4-53.5v-405c0-29.5 23.5-53.5 52.4-53.5h407.1z" fill="#F76868"></path></svg></div>
             <div class="info">商品集市</div>
           </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="never">
            <div class="operate">
             <div class="image"><svg id="icon-zhanghuchongzhi" viewBox="0 0 1024 1024" width="100%" height="100%"><path d="M767.4 1024H255.8C114.8 1024 0 909.2 0 768.2V256.6C0 115.6 114.8 0.8 255.8 0.8h511.6c141 0 255.8 114.8 255.8 255.8v511.6c0 141-114.8 255.8-255.8 255.8zM255.8 93.8c-89.7 0-162.8 73-162.8 162.8v511.6c0 89.7 73 162.8 162.8 162.8h511.6c89.7 0 162.8-73 162.8-162.8V256.6c0-89.7-73-162.8-162.8-162.8H255.8z" fill="#4386F4"></path><path d="M613 513.2c16.6 0 26.4-9.4 26.4-21.6 0-12.2-9.8-20.7-26.4-20.7h-64l66.2-48.5c11.8-8.6 11.8-22.7 0-31.4-11.8-8.6-31-8.6-42.8 0.1L511.1 436l-61.1-44.7c-11.8-8.6-31-8.6-42.8 0-11.8 8.6-11.8 22.7 0 31.4l66.1 48.4h-63.1c-16.6 0-26.4 8.6-26.4 20.7 0 12.2 9.8 21.6 26.4 21.6H475.3v26.4h-65.3c-16.6 0-26.4 7.8-26.4 20s9.8 22.2 26.4 22.2H475.3v31.8c0 15.2 15.5 26.4 36.2 26.4 20.7 0 36.2-11.2 36.2-26.4V582h67.1c16.6 0 24.5-8.2 24.5-20.3 0-15.8-11.6-22-28.2-22h-63.5v-26.4l65.4-0.1z" fill="#4386F4"></path><path d="M511.6 192.6c-176.6 0-319.8 143.1-319.8 319.8 0 176.6 143.2 319.7 319.8 319.7C688.2 832.1 831.3 689 831.3 512.4S688.2 192.6 511.6 192.6z m40.2 513.5c-10.8 8.7-24.4 14-39.4 14-14.8 0-28.4-5.2-39.1-13.7L296.4 551.5c-3.9-4.4-6.3-10.1-6.3-16.5 0-11.6 7.8-21.2 18.4-24.2 0 0 2.5-1 6.3-1h52.1V348.3c0-23.2 17.5-40.4 40.6-40.4h209.7c23.1 0 40.6 17.2 40.6 40.4v161.5h51.1c0.1 0 0.3-0.1 0.5-0.1 0.1 0 0.3 0.1 0.5 0.1h0.6v0.1c13.3 0.6 24 11.6 24 25.1 0 6.2-2.3 11.7-5.9 16.1l-176.8 155z" fill="#4386F4"></path></svg></div>
             <div class="info">账户充值</div>
           </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="never">
            <div class="operate">
             <div class="image"><svg id="icon-daikaifapiao" viewBox="0 0 1024 1024" width="100%" height="100%"><path d="M768 1024H256C114.9 1024 0 909.1 0 768V256C0 114.9 114.9 0 256 0h512c141.1 0 256 114.9 256 256v512c0 141.1-114.9 256-256 256zM256 93.1c-89.8 0-162.9 73.1-162.9 162.9v512c0 89.8 73.1 162.9 162.9 162.9h512c89.8 0 162.9-73.1 162.9-162.9V256c0-89.8-73.1-162.9-162.9-162.9H256z" fill="#FF9136"></path><path d="M272.6 815.3c6.4 3.7 14.1 3.7 17.9 3.7 10.2 0 21.7-3.7 32-12.4l42.2-44.5 39.6 42 1.3 1.2c10.2 8.7 21.7 13.6 32 13.6 11.5 0 24.3-4.9 33.2-14.8l39.6-42 39.6 43.3c17.9 17.3 47.3 17.3 66.5 0l42.2-43.3 39.6 42c11.5 13.6 30.7 18.5 48.6 12.4 17.9-4.9 30.7-22.2 30.7-40.8V248.1c3.8-23.5-16.6-43.3-40.9-43.3H291.8c-24.3 0-46 19.8-46 44.5v526.5c0 17.3 11.5 33.4 26.8 39.5z m53.9-453.1c0-14.5 12.3-26.4 27.3-26.4H666c15 0 27.3 11.9 27.3 26.4 0 14.5-12.3 26.4-27.3 26.4H353.8c-15 0-27.3-11.9-27.3-26.4z m0 113.2c0-14.5 12.3-26.4 27.3-26.4h149.5c15 0 27.3 11.9 27.3 26.4s-12.3 26.4-27.3 26.4H353.8c-15 0-27.3-11.9-27.3-26.4z m0 113.1c0-14.5 12.3-26.4 27.3-26.4h270.1c15 0 27.3 11.9 27.3 26.4s-12.3 26.4-27.3 26.4H353.8c-15 0-27.3-11.9-27.3-26.4z" fill="#FF9136"></path></svg></div>
             <div class="info">
               <p>待开发票</p>
               <p class="sub">¥{{dashboard.invoice_money}}</p>
             </div>
           </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="never">
            <div class="operate">
             <div class="image"><svg id="icon-dingdanguanli" viewBox="0 0 1024 1024" width="100%" height="100%"><path d="M768 1024H256C114.9 1024 0 909.1 0 768V256C0 114.9 114.9 0 256 0h512c141.1 0 256 114.9 256 256v512c0 141.1-114.9 256-256 256zM256 93.1c-89.8 0-162.9 73.1-162.9 162.9v512c0 89.8 73.1 162.9 162.9 162.9h512c89.8 0 162.9-73.1 162.9-162.9V256c0-89.8-73.1-162.9-162.9-162.9H256z" fill="#3AC691"></path><path d="M787 235.3c0-28.5-23.1-51-50.3-51H294c-28.2 0-50.3 23.4-50.3 51V796c0 28.5 23.1 51 50.3 51h324c6-1 12.1-4.1 16.1-8.2L774 714.4c8-6.1 13.1-16.3 13.1-26.5V235.3zM686.4 599.2H344.3c-14.1 0-25.2-11.2-25.2-25.5s11.1-25.5 25.2-25.5h342.1c14.1 0 25.2 11.2 25.2 25.5s-11.1 25.5-25.2 25.5z m0-119.3H344.3c-14.1 0-25.2-11.2-25.2-25.5s11.1-25.5 25.2-25.5h342.1c14.1 0 25.2 11.2 25.2 25.5s-11.1 25.5-25.2 25.5z m2-119.2H345.3c-14.1 0-25.1-11.2-25.1-25.5s11.1-25.5 25.1-25.5h343.1c14.1 0 25.2 11.2 25.2 25.5-1 13.2-12.1 25.5-25.2 25.5z" fill="#3AC691"></path></svg></div>
             <div class="info">订单管理</div>
           </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="section">
      <div class="tit">营销应用</div>
      <el-row :gutter="20">
        <el-col :span="5"  v-for="(item,index) in dataArr" :key="index">
          <el-card shadow="never">
            <div class="item clearfix">
              <div class="image">
                <img :src="item.bigLogo" alt="">
              </div>
              <div class="info">
                <div>
                  <p class="info-tit">{{item.applyName}}</p>
                  <p class="info-desc interbank">{{item.introduction}}</p>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <!-- <el-col :span="5">
          <el-card shadow="never">
           <div class="item clearfix">
              <div class="image">
                <img :src="require('@/common/images/apply/stages.png')" alt="">
              </div>
              <div class="info">
                <div>
                  <p class="info-tit">企业集采平台</p>
                  <p class="info-desc">满足各种企业福利需求及营销需求，模式多样，自由度高</p>
                </div>
              </div>
            </div>
          </el-card>
        </el-col> -->
        <!-- <el-col :span="5">
          <el-card shadow="never">
           <div class="item clearfix">
              <div class="image">
                <img :src="require('@/common/images/apply/card.png')" alt="">
              </div>
              <div class="info">
                <div>
                  <p class="info-tit">礼品卡册专区</p>
                  <p class="info-desc">满足各种企业福利需求及营销需求，模式多样，自由度高</p>
                </div>
              </div>
            </div>
          </el-card>
        </el-col> -->
      </el-row>
    </div>
  </div>
</template>

<script>
import { getAllapply } from "@/api/application/index";

export default {
  name: 'Dashboard',
  data () {
    return {
      dashboard: {
        await_num: 0, // 待发货订单
        flaw_num: 0, // 售后订单
        order_num: 0, // 昨日订单数
        deal_money: 0, // 昨日交易额（元）
        success_num: 0, // 昨日完成订单数
        invoice_money: 0 // 待开发票
      },
      dataArr:[],
    }
  },
  created () {
    this.getAllapply()
  },
  methods: {
    async getAllapply () {
      const params = {
        status: "0"
      };
      const { data } = await getAllapply(params)
      this.dataArr = data.list
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/variable.scss';
.dashboard {
  .title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 30px;
  }
  .number {
    font-size: 24px;
  }
  .sub {
    line-height: 24px;
    color: $themeSubColor;
  }
  .el-card {
    margin-bottom: 20px;
    position: relative;
    cursor: pointer;
    .right-icon {
      position: absolute;
      right: 20px;
      top: 20px;
      width: 20px;
      height: 20px;
      border-radius: 10px;
      background: $themeColor;
      text-align: center;
      color: #fff;
      .el-icon-caret-right {
        line-height: 20px;
      }
    }
  }
  .section {
    .tit {
      margin-bottom: 10px;
    }
  }
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
      &>div {
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
        line-height: 20px;
      }
    }
  }
}
</style>
