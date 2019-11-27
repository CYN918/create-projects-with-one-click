<template>
  <div class="margin">
      <div class="mcard mbottom">
        <div class="title">邮件通知</div>
        <div>
        <el-form label-width="120px" size="small">
            <el-row>
                <el-col :span="6">
                  <el-col>
                    <el-form-item label="关键字：">
                      <el-col :span="23">
                        <el-input  v-model="keywords" placeholder="请输入关键字">
                        </el-input>
                      </el-col>
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
        <el-table :data="noticeList" border style="width: 100%" stripe>
          <!--<el-table-column type="selection" width="55"></el-table-column>-->
          <el-table-column label=""  align="left" prop="attachments" width="60px;">
            <template slot-scope="scope">
                <div v-if="scope.row.attachments">
                   <i class="el-icon-message"></i>
                   <i class="el-icon-paperclip"></i>
                </div>
                <div v-else>
                   <i class="el-icon-message"></i>
                </div>
            </template>
          </el-table-column>
          <el-table-column label="发件人"  align="center" prop="senderName"></el-table-column>
          <el-table-column label="收件人"  align="center" prop="to"></el-table-column>
          <el-table-column label="主题"  align="left" prop="subject"></el-table-column>
          <el-table-column label="内容"  align="left" prop="content" width="200px">
             <template slot-scope="scope">
                <div>{{ scope.row.content | filterA }}</div>
             </template>
          </el-table-column>
          <el-table-column label="发送时间"  align="center" prop="createTime">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
              </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="150" prop="id">
              <template slot-scope="scope">
                <div class="line-div">
                  <div class="small-Idiv" @click="openDetails(scope.row.id)" v-permit="'mail:delete'">
                    <div class="i-div">
                      <img src="../../common/images/icon/查看详情.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;margin-left: 3px;">详情</span>
                  </div>
                  <div class="small-Idiv" @click="handleDelete(scope.row.id)" v-permit="'mail:details'">
                    <div class="i-div">
                      <img src="../../common/images/icon/回收站.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;margin-left: 3px;">删除</span>
                  </div>
                </div>
              </template>
            </el-table-column>
          <!--
            <el-table-column 
              label="阅读状态"
              align="center"
              prop="tag"
              :filters="[{ text: '已读', value: '已读' }, { text: '未读', value: '未读' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag
                :type="scope.row.tag === '未读' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.tag}}</el-tag>
              </template>
            </el-table-column>
          -->
          <!--
            <el-table-column label="标题内容" prop="content">
              <template slot-scope="scope">
                <i class="el-icon-bell" v-show="scope.row.status === '1'"></i>
                <span :class="scope.row.status === '2' ? 'readed': ''">{{scope.row.content}}</span>
              </template>
            </el-table-column>
            <el-table-column label="提交时间" width="200" align="center" prop="time"></el-table-column>
            <el-table-column label="类型" width="100" align="center" prop="type"></el-table-column>
          -->
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
import {  getMailList,  deleteEmail } from '@/api/notice/index'
export default {
  name: 'Notice',
  data () {
    return {
      keywords: '',
      noticeList: [],
      pagination: {
        current_page: 1,
        page_size: 10,
        total_count: 0
      }
    }
  },
  created () {
    this.getMailList()
  },
  methods: {
    getMailList() {
      let data = {}
      data.pageNum = this.pagination.current_page
      data.pageSize = this.pagination.page_size
      data.id = ''
      data.keywords = this.keywords
      getMailList(data).then(res => {
        var that =this
        that.noticeList = res.data.list
        this.pagination.total_count = res.data.total
      })
    },
    // 筛选已读或未读
    // filterTag(value, row) {
    //   return row.tag === value;
    // },
    // 跳转详情页面
    openDetails(id) {
       this.$router.push({ name: "emailDetails", query:{id:id}});
    },
    // 搜索
    handelSearchGoods(){
      this.pagination.current_page = 1
      this.getMailList()
    },
    handleSizeChange (val) {
      this.pagination.page_size = val
      this.getMailList()
    },
    handleCurrentChange (val) {
      this.pagination.current_page = val
      this.getMailList()
    },
    // 删除
    handleDelete (id) {
      deleteEmail(id).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.getMailList()
      })
    }
  },
  filters:{
     filterA(val) {
       if( val ){
        let str = val
        str = str.replace(/<[^<>]+>/g,'')
        return str 
       }
     }
  },
  watch: {
   
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.small-Idiv{
  width: 32px;
  display: inline-block;
  margin: 0 10px;
}
.el-icon-message , .el-icon-paperclip{
  font-size:18px;
  margin: 0 1px;
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
