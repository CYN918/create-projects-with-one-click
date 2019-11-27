<template>
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">搜索条件</h4>
            <div class="search-base">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="活动主题：">
                    <el-input v-model="form.activityTopic" clearable placeholder="请输入活动主题名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="活动时间：">
                    <el-date-picker
                        :editable="false"
                        style="display: inline-block"
                        v-model="form.startTime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                    <span style="font-size: 14px;color: #606266;margin: 0 6px">-</span>
                    <el-date-picker
                        :editable="false"
                        style="display: inline-block"
                        v-model="form.entTime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="活动状态：">
                    <el-select v-model="form.status" placeholder="请选择">
                      <el-option
                          v-for="item in status"
                          :key="item.statusId"
                          :label="item.statusName"
                          :value="item.statusId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col style="width: auto;" >
                  <el-col style="width: auto; margin-right: 10px">
                    <el-form-item label="活动参与：">
                      <el-select v-model="form.examineStatus" placeholder="请选择">
                        <el-option
                            v-for="item in activetyJoin"
                            :key="item.examineStatus"
                            :label="item.label"
                            :value="item.examineStatus">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small"  @click="getActivitySearch">查询</el-button>
                  </el-col>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div>
      <el-tabs type="border-card" @tab-click.passive="handleTabClick" v-model="form.activityTypeId">
        <el-tab-pane v-for="item in activityList" :name="item.activityTypeId" :key="item.activityTypeId" :lazy="true">
          <span slot="label" style="font-size: 16px; color: #333"><img style="vertical-align: middle; margin-right: 14px; width:36px;height: 36px;" :src="item.iconUrl" alt="">{{item.activityTypeName}}</span>
          <div>
            <el-table
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="white"
              :data="tableData"
              stripe
              style="width: 100%"
              border
              ref="elTable"
              class="goods_index">
              <el-table-column type="index" label="序号" align="center" width="50">
                <template slot-scope="scope">
                  <span>{{scope.$index +1}}</span>
                </template>
              </el-table-column>
              <el-table-column label="活动起止时间" align="center">
                <template slot-scope="scope">
                  <p>{{scope.row.startTime}}</p>
                  <p>{{scope.row.entTime}}</p>
                </template>
              </el-table-column>
              <el-table-column label="活动编码" align="center" width="140">
                <template slot-scope="scope">
                  <span>{{scope.row.activityId}}</span>
                </template>
              </el-table-column>
              <el-table-column label="活动主题" align="center" width="140">
                <template slot-scope="scope">
                  <span>{{scope.row.activityTopic}}</span>
                </template>
              </el-table-column>
              <el-table-column label="活动类型" align="center" width="140">
                <template slot-scope="scope">
                  <span>{{scope.row.activityTypeName}}</span>
                </template>
              </el-table-column>
              <el-table-column label="活动内容" align="center" width="140">
                <template slot-scope="scope">
                  <span>{{scope.row.content}}</span>
                </template>
              </el-table-column>
              <el-table-column label="活动链接" align="center" width="140">
                <template slot-scope="scope">
                  <span>{{scope.row.link}}</span>
                </template>
              </el-table-column>
              <el-table-column label="活动状态" align="center" width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 0">未开始</span>
                  <span v-if="scope.row.status === 1">进行中</span>
                  <span v-if="scope.row.status === 2">已结束</span>
                </template>
              </el-table-column>
              <el-table-column label="客户平台数量" align="center" width="150">
                <template slot-scope="scope">
                  <span>{{scope.row.status}}</span>
                </template>
              </el-table-column>
              <el-table-column label="成交订单数量" align="center" width="150">
                <template slot-scope="scope">
                  <span>{{scope.row.status}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="200" fixed="right">
                <template slot-scope="scope">
                  <div class="line-div small_top">
                    <div class="small-Idiv" @click="checkActivityDetail(scope.row.activityId)">
                      <div class="i-div fuzhi">
                        <img src="@/common/images/icon/好货抢先购.png" alt class="operation_img"/>
                      </div>
                      <span style="word-break: keep-all;">{{scope.row.examineStatus === 1 ? '未报名' : '已报名'}}</span>
                    </div>
                    <div class="small-Idiv" style="position: relative;top: -26px;">
                      <el-switch
                        @change="handleSwitchChange(scope.row)"
                        v-model="scope.row.examineStatus"
                        :active-value="3"
                        :inactive-value="1"
                        active-color="#8CC5FF"
                      ></el-switch>
                    </div>
                    <div class="small-Idiv" @click="editor(scope.row)">
                      <div class="i-div">
                        <img src="@/common/images/icon/编辑.png" alt class="operation_img"/>
                      </div>
                      <span>编辑</span>
                    </div>
                    <div class="small-Idiv" @click="goodsDetail(scope.row)">
                      <div class="i-div fuzhi">
                        <img src="@/common/images/icon/货物列表.png" alt class="operation_img"/>
                      </div>
                      <span style="word-break: keep-all;">商品</span>
                    </div>
                    <div v-if="scope.row.activityTypeNum === 3" class="small-Idiv" @click="handleManageUser(scope.row.activityId)">
                      <div class="i-div fuzhi">
                        <img src="@/common/images/icon/user_control.png" alt class="operation_img"/>
                      </div>
                      <span style="word-break: keep-all;">用户管理</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination" style="margin-top: 27px;text-align: right;">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="form.pageIndex"
                :page-sizes="[10, 30, 50, 100]"
                :page-size="form.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import { throttleTipPop } from '@/utils/throttle'
  import { checkUnsetPricePro, updataActivityExamineStatus, reqActivityList, reqActivitySearch, reqDeleteActivity } from '@/api/activity/index'

  export default {
    name: "contact",
    data() {
      return {
        loading: true,
        pickerOptions: {
          disabledDate: (time) => {
            if (this.form.startTime != null) {
              return time.getTime() <= new Date(this.form.startTime).getTime()
            } else {
              return true
            }
          }
        },
        content: '是否确定报名此活动？',
        deleteActivityId: '', // 要删除的活动Id
        deleteAuditDialog: false, // 删除确认弹窗
        total: 0, // 页码总数
        tableData: [], // 表格
        activetyJoin: [ // 活动参与
          {examineStatus: null, label: '全部'},
          {examineStatus: 1, label: '未参与'},
          {examineStatus: 3, label: '已参与'}],
        status: [
          { statusId: null,statusName: '全部' },
          { statusId: 0,statusName: '未开始' },
          { statusId: 1,statusName: '进行中' },
          { statusId: 2,statusName: '已结束' },
        ], // 活动状态
        project: [], // 项目
        activityList: [], // 活动类型列表
        form: { // 搜索条件
          position: 4,
          activityTopic: null, // 活动主题
          status: null, // 活动状态
          examineStatus: null, // 活动参与
          createTime: null, // 创建开始时间
          createEndTime: null, // 创建结束时间
          startTime: null, // 活动时间开始
          entTime: null, // 活动时间结束
          pageSize: 10, // 每页展示量
          pageIndex: 1, // 页码
          activityTypeId: '', // 活动类型Id
        },
      };
    },
    async mounted() {
      await this.getActivityList()
      this.getActivitySearch()
    },
    methods: {
      // 报名状态管理
      async handleSwitchChange(row) {
        if (row.examineStatus === 3) {
          const res = await checkUnsetPricePro(row.activityId)
          if (res.code === 200 && res.data > 0) {
            this.$confirm('您有未设置价格的商品，确定则会删除此类商品, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(async () => {
              this.changeExamineStatus(row, '报名成功')
            }).catch(() => {
              row.examineStatus = 1
            })
          } else {
            this.changeExamineStatus(row, '报名成功')
          }
        } else if (row.examineStatus === 1) {
          this.changeExamineStatus(row, '已取消报名')
        }
      },
      // 改变审核状态
      async changeExamineStatus(row, text) {
        const obj = {}
        obj.activityId = row.activityId
        obj.examineStatus = row.examineStatus
        const res = await updataActivityExamineStatus(obj)
        if (res.code === 200) {
          throttleTipPop(this, 'success', text)
        }
      },
      // 用户管理
      handleManageUser(activityId) {
        this.$router.push({
          name: 'userManagement',
          query: {activityId},
        })
      },
      // 活动详情
      checkActivityDetail(activityId) {
        this.$router.push({
          name: 'editNotifyDetail',
          query: {
            activityId,
            'activityTypeId': this.form.activityTypeId,
          },
        })
      },
      // 编辑
      editor(row) {
        this.$router.push({
          name: 'editNotifyActivity',
          query: {
            'activityId': row.activityId,
            'activityTypeNum': row.activityTypeNum,
            'activityTypeId': this.form.activityTypeId,
          },
        })
      },
      // 删除
      recycleBinfunc(id) {
        this.deleteAuditDialog = true
        this.deleteActivityId = id
      },
      async confirmDelete() {
        const res = await reqDeleteActivity(this.deleteActivityId)
        if (res.code === 200) {
          throttleTipPop(this, 'success', '删除成功')
          this.getActivitySearch()
        }
        this.deleteAuditDialog = false
      },
      // 商品详情
      goodsDetail(row) {
        this.$router.push({
          name: 'editNotifyPro',
          query: {
            'activityId': row.activityId,
            'activityTypeNum': row.activityTypeNum,
            'activityTypeId': this.form.activityTypeId,
          },
        })
      },
      // 标签页切换
      handleTabClick() {
        // console.log(this.activityTypeId)
        this.getActivitySearch()
      },
      // 获取活动类型
      async getActivityList() {
        const res = await reqActivityList()
        this.activityList = res.data.list
        this.form.activityTypeId = this.$route.params.activityTypeId || res.data.list[0].activityTypeId
      },
      // 获取活动表格
      async getActivitySearch() {
        const res = await reqActivitySearch(this.form)
        if (res.code === 200) {
          if (res.data) {
            this.loading = false
            this.tableData = res.data.list
            this.total = res.data.total
          } else {
            this.tableData = []
            this.total = 0
          }
        }
      },
      // 页面每页展示数量变化
      handleSizeChange(val) {
        this.form.pageSize = val
        this.form.pageIndex = 1
        this.getActivitySearch()
      },
      // 页码发生变化
      handleCurrentChange(val) {
        this.form.pageIndex = val
        this.getActivitySearch()
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/common/scss/variable.scss";
  .line-div {
    width: 140px;
    display: inline-block;
    text-align: left;
  }
  .small-Idiv {
    display: inline-block;
    margin: 0 10px;
    cursor: pointer;
    width: 50px;
    text-align: center;
  }
  .add_btn {
    margin-bottom: 20px;
  }
  /* 搜索条件 */
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
        color: #333;
        padding-left: 20px;
        line-height: 1.4;
        border-left: 4px solid $themeColor;
        margin-bottom: 16px;
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
      max-width: 240px;
      margin-right: 5px;
    }
    .el-date-picker{
      max-width: 240px;
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
  /* 搜索条件 */

  /* 活动列表*/
  /deep/ .el-tabs__item {
    margin-top: 0px!important;
  }
  /deep/ .el-tabs--border-card {
    box-shadow: none;
    border: none;
  }
  /deep/ .el-tabs__content {
    border: 1px solid #D6DEEF;
    margin-top: -1px;
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

</style>