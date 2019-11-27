<template>
  <div class="muser-detail-wrapper">
    <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <el-page-header @back="back" style="font-size: 18px;"></el-page-header>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 18px;">
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>
                <el-breadcrumb-item>详情</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
    </div>
    <div class="mcard">
      <div class="title">基础信息</div>
      <el-row class="muser-detail-header">
        <el-col :span="12">用户ID：{{userDetail.userId}}</el-col>
        <el-col :span="12">手机号：{{userDetail.telephone}}</el-col>
        <el-col :span="12">姓名：{{userDetail.userName}}</el-col>
        <el-col :span="12">积分值：{{userDetail.integral}}</el-col>
        <el-col :span="12">分组：{{userDetail.group_name}}</el-col>
        <el-col :span="12">加入方式：{{userDetail.add_type}}</el-col>
        <el-col :span="12">累计消耗积分：{{userDetail.accumulate_consume_integral}}</el-col>
        <el-col :span="12">累计支付金额：{{userDetail.accumulate_pay_amount}}</el-col>
        <el-col :span="12">
          产生订单数：{{userDetail.accumulate_order}}
          <span class="btn-order" @click="handleToOrder">查看订单</span>
        </el-col>
        <el-col :span="12">加入时间：{{userDetail.createTime}}</el-col>
        <el-col :span="12">最后登录时间：{{userDetail.updateTime}}</el-col>
      </el-row>
    </div>
    <div class="change-detail-wrapper">
      <div class="tabs-header">
        <ul class="clearfix">
          <li @click="tabIndex(0)" :class="currentIndex===0 ? 'active' : ''">余额变动明细</li>
          <li @click="tabIndex(1)" :class="currentIndex===1 ? 'active' : ''">代金卡券变动明细</li>
        </ul>
      </div>
      <div class="tabs-content">
        <el-table
                v-if="currentIndex === 0"
                :data="balanceList">
          <el-table-column
                  prop="change_time"
                  label="变动时间"/>
          <el-table-column
                  prop="change_integral"
                  label="变动积分"/>
          <el-table-column
                  label="变动内容">
            <template slot-scope="scope">
              {{scope.row.change_content}}<span v-show="scope.row.order_id">-[{{scope.row.order_id}}]</span>
            </template>
          </el-table-column>
          <el-table-column
                  align="center"
                  label="操作">
            <template slot-scope="scope">
              <el-button v-show="scope.row.order_id" type="text" size="small" @click="handleToUserDetail(scope.row)">查看订单详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-else>
          <div class="btn-wrapper">
            <el-button type="primary" size="small">导出明细</el-button>
          </div>
          <el-table
                  :data="voucherList">
            <el-table-column
                    prop="change_time"
                    label="变动时间"/>
            <el-table-column
                    prop="change_type"
                    label="变动类型"/>
            <el-table-column
                    prop="change_amount"
                    label="变动金额"/>
            <el-table-column
                    prop="currency_name"
                    label="货币名称"/>
            <el-table-column
                    prop="change_content"
                    label="变动内容"/>
            <el-table-column
                    prop="voucher_name"
                    label="代金卡名称"/>
            <el-table-column
                    prop="voucher_id"
                    label="代金卡号"/>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getUserdetail, getBalanceChangeDetail } from '@/api/mallapp/user/index'

  export default {
    name: 'MuserDetail',
    data () {
      return {
        userDetail: {
          userId: '', // 用户id
          phone: '', // 手机号
          name: '', // 姓名
          integral: 0, // 积分值
          group_name: '', // 群组名
          add_type: '', // 加入方式 0.后台加入 1.平台注册, 2.表格导入, 3.手机号注册
          accumulate_consume_integral: 0, // 累计消耗积分
          accumulate_pay_amount: 0, // 累计支付金额
          accumulate_order: 0, // 产生订单数
          create_time: '', // 创建时间
          end_login_time: '' // 最后登录时间
        },
        currentIndex: 0,
        balanceList: [{
          change_time: '', // 变动时间
          change_integral: 0, // 变动积分
          change_content: '', // 变动内容
          order_id: '' // 订单id
        }],
        voucherList: [
          // {
          //   change_time: '', // 变动时间
          //   change_type: '', // 变动类型
          //   change_amount: 0, // 变动金额
          //   currency_name: '', // 货币名称
          //   change_content: '', // 变动内容
          //   voucher_name: '', // 代金卡名称
          //   voucher_id: '' // 代金卡号
          // }
        ]
      }
    },
    created () {
      const userId = this.$route.params.id
      this._getUserdetail(userId)
      // this._getBalanceChangeDetail(userId)
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      tabIndex (index) {
        this.currentIndex = index
        if (index === 0) {
          // this._getBalanceChangeDetail()
        } else {
          console.log('代金券明细')
        }
      },
      handleToOrder () {
        this.$router.push({ path: '/morder' })
      },
      handleToUserDetail (data) {
        this.$router.push({ path: `/morder/detail/${data.order_id}` })
      },
      _getUserdetail (userId) {
        getUserdetail(userId).then(res => {
          this.userDetail = res.data
          if(this.userDetail.registerForm===0){
            this.userDetail.add_type='后台注册'
          }else if(this.userDetail.registerForm===1){
            this.userDetail.add_type='平台注册'
          }else if(this.userDetail.registerForm===2){
            this.userDetail.add_type='表格导入'
          }else if(this.userDetail.registerForm===3){
            this.userDetail.add_type='手机号注册'
          }
        })
      },
      //获取用户余额变动信息
      _getBalanceChangeDetail (userId) {
        let loading = this.$loading({
          background: 'rgba(255,255,255,0.1)',
          text: '加载中，请稍后...'
        })
        getBalanceChangeDetail(userId).then(res => {
          loading.close()
          this.balanceList = res.data
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/common/scss/variable.scss";
  .search-wrapper1 {
    padding: 20px;
    border: 1px solid #d7e0f1;
    background: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .muser-detail-wrapper {
    color: #3c3c3c;
    margin: 20px;
    .btn-order {
      margin-left: 10px;
      color: $themeColor;
      cursor: pointer;
    }
    .mcard {
      margin-bottom: 30px;
    }
    .muser-detail-header {
      .el-col {
        line-height: 1.5;
        font-size: 14px;
        color: #999;
        padding: 8px;
      }
    }
    .change-detail-wrapper {
      .tabs-header {
        li {
          float: left;
          font-size: 16px;
          padding: 0 16px;
          line-height: 36px;
          cursor: pointer;
          &.active {
            background: #fff;
            border: 1px solid #d7e0f1;
            border-bottom-color: #fff;
            margin-bottom: -1px;
          }
        }
      }
      .tabs-content {
        padding: 20px;
        background: #fff;
        border: 1px solid #d7e0f1;
        .btn-wrapper {
          margin-bottom: 20px;
          text-align: right;
        }
      }
    }
  }
</style>
