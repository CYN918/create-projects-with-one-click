<template>
  <div class="margin">
      <div class="mcard mbottom">
        <div class="title">站内通知</div>
        <div>
        <el-form label-width="120px" size="small">
            <el-row>
                <el-col :span="6">
                  <el-col>
                    <el-form-item label="标题：">
                      <el-col :span="23">
                        <el-input  v-model="messageTitle" placeholder="请输入标题">
                        </el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                 <el-col :span="6">
                  <el-col>
                    <el-form-item label="收件人：">
                      <el-col :span="23">
                        <el-input  v-model="receiverName" placeholder="收件人">
                        </el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                 <el-col :span="6">
                  <el-col>
                     <el-form-item label="阅读状态">
                        <el-select :span="23" v-model="readStatus" placeholder="请选择阅读状态">
                            <el-option label="未读" value="0"></el-option>
                            <el-option label="已读" value="1"></el-option>
                        </el-select>
                      </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="2" style='text-align: center;'>
                        <el-button type="primary" size="small" @click="handelSearchGoods">搜索</el-button>
                </el-col>
              </el-row>
           </el-form>
        </div>  
      </div>
    
      <div class="mcard">
        <el-col :span="6" style="margin-bottom: 20px;">
            <el-button type="danger" size="small" @click="handleDelete" v-permit="'batch:mail'">批量删除</el-button>
            <el-button type="primary" size="small" @click="handleReaded" v-permit="'sign:mail'">标记为已读</el-button>
         </el-col>
        <el-table :data="noticeList" border style="width: 100%" stripe  @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="接收人"  align="center" prop="receiverName"></el-table-column>
          <el-table-column label="消息类别"  align="center" prop="messageCategory">
            <template slot-scope="scope">
              <div v-if="scope.row.messageCategory == '0'">系统消息</div>
              <div v-else-if="scope.row.messageCategory == '1'">供应商</div>
              <div v-else-if="scope.row.messageCategory == '2'">客户</div>
              <div v-else-if="scope.row.messageCategory == '3'">其他</div>
            </template>
          </el-table-column>
          <el-table-column label="业务类型"  align="center" prop="businessType">
            <template slot-scope="scope">
              <div v-if=" 0 <= scope.row.businessType  &&  scope.row.businessType  <= 99">系统消息</div>
              <div v-else-if=" 100 <= scope.row.businessType &&  scope.row.businessType <= 199">供应商</div>
              <div v-else-if=" 200 <= scope.row.businessType &&  scope.row.businessType <= 299">客户</div>
              <div v-else-if=" 300 <= scope.row.businessType &&  scope.row.businessType <= 399">用户</div>
              <div v-else-if=" 400 <= scope.row.businessType &&  scope.row.businessType <= 499">商品</div>
              <div v-else-if=" 500 <= scope.row.businessType &&  scope.row.businessType <= 599">订单</div>
              <div v-else-if=" 600 <= scope.row.businessType &&  scope.row.businessType <= 699">售后</div>
            </template>
          </el-table-column>
          <el-table-column label="标题"  align="left" prop="messageTitle"></el-table-column>
          <el-table-column label="内容摘要"  align="left" prop="messageContent" width="200px"></el-table-column>
          <el-table-column label="发送时间"  align="center" prop="sendTime">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.sendTime }}</span>
              </template>
          </el-table-column>
          <el-table-column 
            label="阅读状态"
            align="center"
            prop="readStatus"
            >
            <template slot-scope="scope">
               <el-tag type="danger" v-if=" scope.row.readStatus == 0 ">未读</el-tag>
               <el-tag type=" success" v-else-if=" scope.row.readStatus == 1">已读</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="150" prop="id">
              <template slot-scope="scope">
                <div class="line-div">
                  <div class="small-Idiv" @click="openDetails(scope.row.id)" v-permit="'mail:details'">
                    <div class="i-div">
                      <img src="../../common/images/icon/查看详情.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;margin-left: 3px;">详情</span>
                  </div>
                </div>
              </template>
            </el-table-column>
        </el-table>
        <el-row class="bottom">
          <el-col :span="24" class="right">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pagination.current_page"
              :page-size="pagination.page_size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pagination.total_count"
            ></el-pagination>
          </el-col>
        </el-row>
      </div>
  </div>
</template>

<script>
import {  getMessageList,  editStatus, deleteNotice } from '@/api/notice/index'
export default {
  name: 'Notice',
  data () {
    return {
      messageTitle: '', //标题
      receiverName: '', //收件人
      readStatus: '',   // 阅读状态
      noticeList: [],
      pagination: {
        current_page: 1,
        page_size: 10,
        total_count: 0
      },
      selectNotice: [],
    }
  },
  created () {
    this.getMessageList()
  },
  methods: {
    getMessageList() {
      let data = {}
      data.pageNum = this.pagination.current_page
      data.pageSize = this.pagination.page_size
      data.messageTitle = this.messageTitle
      data.receiverName = this.receiverName
      data.readStatus = this.readStatus
      getMessageList(data).then(res => {
        var that =this
        that.noticeList = res.data.content
        this.pagination.total_count = res.count
      })
    },
    //筛选已读或未读
    filterTag(value, row) {
      return row.tag === value;
    },
    // 跳转详情页面
    openDetails(id) {   
        this.$router.push({ name: "messageDetails" , query: {id: id}});
    },
    // 搜索
    handelSearchGoods(){
      this.pagination.current_page = 1  
      this.getMessageList()
    },
    handleSelectionChange (data) {
      let ret = []
      data.map(item => {
        ret.push(item.id)
      })
      this.selectNotice = ret
    },
    handleSizeChange (val) {
      this.pagination.page_size = val
      this.getMessageList()
    },
    handleCurrentChange (val) {
      this.pagination.current_page = val
      this.getMessageList()
    },
    // 批量修改阅读状态
    handleReaded () {
      if (this.selectNotice.length === 0) {
        this.$message({
          message: '至少选择一条消息',
          type: 'warning'
        })
        return
      }
      this._editStatus()
    },
     // 批量修改阅读状态
    _editStatus () {
      let ids = this.selectNotice.join(',')
      var data = {
        ids:ids,
        readStatus:1
      }
      editStatus(data).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.getMessageList()
      })
    },
    // 批量删除
    handleDelete () {
      if (this.selectNotice.length === 0) {
        this.$message({
          message: '至少选择一条消息',
          type: 'warning'
        })
        return
      }
      this._deleteNotice()
    },
     _deleteNotice () {
      let ids = this.selectNotice.join(',')
      deleteNotice(ids).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.getMessageList()
      })
    }
  },
  filters:{
     filterA(val) {
    //    let str = val
    //    str = str.replace(/<[^<>]+>/g,'')
    //    return str 
     }
  },
  watch: {
  
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.el-icon-message , .el-icon-paperclip{
  font-size:18px;
  cursor: pointer;
  margin: 0 5px;
} 
.header {
  margin: 20px;
}
.el-icon-bell {
  color: $themeColor;
  margin-right: 10px;
}
.readed {
  color: #aaa;
}
.bottom {
  margin: 20px 0;
  .right {
    text-align: right;
  }
}
.mcard{
  padding: 20px;
  border: 1px solid #d7e0f1;
  background: #fff;
}
</style>
