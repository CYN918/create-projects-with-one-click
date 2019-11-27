<template>
  <div>
    <h4 style="margin-left: -15px;padding-left: 18px; border-left: 4px solid #4A99FA; line-height: 18px;margin-bottom: 20px">活动用户</h4>
    <div style="margin-bottom: 20px">
      <el-button class="add_btn" type="primary" size="small" @click="dialogVisible = true">添加用户</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      border
      ref="elTable"
      class="goods_index">
      <el-table-column type="index" label="序号" align="center" width="55">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户编号" align="center" width="200">
        <template slot-scope="scope">
          <p>{{scope.row.userId}}</p>
        </template>
      </el-table-column>
      <el-table-column label="用户名称" align="center" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号码" align="center" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.activityTopic}}</span>
        </template>
      </el-table-column>
      <el-table-column label="喜事时间" align="center" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.startTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="持续时间" align="center" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.content}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <div class="line-div small_top" style="padding-bottom: 0">
            <div class="small-Idiv" @click="deleteUser(scope.row.activityEventUserId)">
              <div class="i-div huishouzhan">
                <img src="@/common/images/icon/回收站.png" alt class="operation_img"/>
              </div>
              <span style="word-break: keep-all;margin-left: -2px;">删除</span>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination" style="margin-top: 27px;text-align: right;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!--添加用户-->
    <el-dialog
      id="newClassify"
      title="添加用户"
      :visible.sync="dialogVisible"
      width="680px"
    >
      <el-form :model="form" :rules="rules" ref="userSearch" label-width="100px">
        <el-form-item label="搜索用户：">
          <el-row id="search">
            <el-col :span="22">
              <el-input placeholder="请输入用户账号/手机号/昵称" v-model="keywords" class="input-with-select">
                <el-button slot="append" @click="searchUser" icon="el-icon-search">搜索</el-button>
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="选择用户：">
          <el-row>
            <el-col :span="22">
              <el-select v-model="form.userId" prop="userId" placeholder="请选择用户">
                <el-option
                  v-for="item in options"
                  :key="item.userId"
                  :label="`${item.userAccount}-${item.userName}-${item.telephone}`"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="喜事时间：" prop="startTime">
          <el-date-picker
            :editable="false"
            style="display: inline-block"
            v-model="form.startTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="持续时间：">
          <el-date-picker
            :editable="false"
            style="display: inline-block"
            v-model="form.showStartTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="开始时间">
          </el-date-picker>
          <span style="font-size: 14px;color: #606266;margin: 0 6px">-</span>
          <el-date-picker
            :editable="false"
            style="display: inline-block"
            v-model="form.showEndTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmCreateNewUser" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!--添加用户-->

    <!-- 删除 -->
    <el-dialog
      title="删除"
      :visible.sync="deleteAuditDialog"
      width="30%"
    >
      <span>是否确定删除此用户？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="deleteAuditDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmDelete" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除 -->
  </div>
</template>

<script>
  import { reqUserInfo, addEventUser, reqEventUserList, deleteEventUser } from '@/api/activity/index'
  import { throttleTipPop } from '@/utils/throttle'

  export default {
    name: "ActivityTable",
    props: ['happyEventType'],
    data() {
      return {
        activityEventUserId: '', // 要删除的用户id
        deleteAuditDialog: false, //删除弹窗
        pageSize: 10, // 当前页展示数量
        pageIndex: 1, // 当前页
        total: 0, // 商品总数
        options: [], // 搜索出来的用户
        select: '', // 搜索选择项
        keywords: '', // 搜索用户关键词
        searchOptions: [], // 搜索条件
        dialogVisible: false, // 添加用户弹窗
        tableData: [], // 表格数据
        form: { // 查询变量
          activityId: '', // 活动id
          startTime: '', // 开始时间
          showStartTime: '', // 显示开始时间
          showEndTime: '', // 显示结束时间
          userId: '', // 用户Id
          happyEventType: 1,
        },
        rules: {
          startTime: [
            { required: true, message: '请选择日期', trigger: 'change' },
          ],
          showEndTime: [
            { required: true, message: '请选择日期', trigger: 'change' }
          ],
          showStartTime: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          activityId: [
            { type: 'date', required: true, message: '请选择用户', trigger: 'change' }
          ],
        }
      }
    },
    mounted() {
      this.form.happyEventType = this.happyEventType
      this.getQuery()
      this.getEventUserList()
    },
    methods: {
      // 确定删除
      async confirmDelete() {
        const res = await deleteEventUser(this.activityEventUserId)
        if (res.code === 200) {
          throttleTipPop(this, 'success', '删除成功')
          this.getEventUserList()
        }
        this.deleteAuditDialog = false
      },
      // 删除用户
      deleteUser(id) {
        this.deleteAuditDialog = true
        this.activityEventUserId = id
      },
      // 获取活动事件用户列表
      async getEventUserList() {
        const obj = {}
        obj.activityId = this.form.activityId
        obj.happyEventType = this.form.happyEventType
        obj.pageIndex = this.pageIndex
        obj.pageSize = this.pageSize
        const res = await reqEventUserList(obj)
        if (res.code === 200) {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      },
      // 获取活动ID
      getQuery() {
        this.form.activityId = this.$route.query.activityId
      },
      // 搜索用户
      async searchUser() {
        const res = await reqUserInfo(this.keywords)
        if (res.code === 200) {
          this.options = res.data.list
        }
      },
      // 确定添加新用户
      async confirmCreateNewUser() {
        const res = await addEventUser(this.form)
        if (res.code === 200) {
          throttleTipPop(this, 'success', '添加用户成功')
          this.getEventUserList()
        }
        this.dialogVisible = false
      },
      // 页面每页展示数量变化
      handleSizeChange(val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getEventUserList()
      },
      // 页码发生变化
      handleCurrentChange(val) {
        this.pageIndex = val
        this.getEventUserList()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .search_result {
    position: absolute;
  }
  #search {
    /deep/ .el-input-group__append {
      background: #409EFF;
      color: #fff;
    }
  }
</style>
