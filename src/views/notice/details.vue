<template>
  <div class="margin">
    <div class="mbottom">
          <div class="goods-fitter">
            <div class="search-wrapper"> 
              <el-page-header @back="back" content='邮件通知详情'></el-page-header>
            </div>
          </div>
      </div>
      <div class="mcard mbottom">
        <div class="title">邮件通知详情</div>
           <div class="title_e">
            <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark" style="font-weight: bold;">邮件标题：{{subject}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark">发送人：{{senderName}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark">收件人：{{to}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark" v-if="cc">抄送人：{{cc}}</div></el-col>
              </el-row>
               <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark" v-if="bcc">密送人：{{bcc}}</div></el-col>
              </el-row>
               <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark">发送时间：{{createTime}}</div></el-col>
              </el-row>
           </div>
      </div>
        <div class="mcard mbottom">
           <div class="title">邮件通知内容</div>
                <div style='background: #f7faff;padding: 10px;'>
                  <el-row>
                  <el-col :span="24"><div class="grid-content bg-purple-dark content_c">
                      {{content}}
                  </div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="24"><div class="grid-content bg-purple-dark content_b">福原爱员工福利商城</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="24"><div class="grid-content bg-purple-dark content_b"><a href="">https://c.fyuanai.com/</a></div></el-col>
                </el-row>
                </div>
            </div>
            <div class="mcard mbottom" v-if="attachments">
              <div class="title">附件</div>
                <el-row>
                 <el-col :span="24"><div class="grid-content bg-purple-dark attachment_c">普通附件</div></el-col>
               </el-row>
                <el-row>
                  <el-col :span="24">
                      <div class="grid-content bg-purple-dark attachment_b">
                          <div class="attach">
                              <img src="../../common/images/提示.png" alt style='width:28px;margin-right:20px;vertical-align: middle;'/>
                          </div>
                          <div class="attach_b">
                             <p class="preview">{{attachments}}</p>
                             <p class="preview"><a :href="attachmentsUrl" :download="attachments">下载</a></p>
                          </div>
                      </div>
                  </el-col>
               </el-row>
            </div>
</div>

</template>

<script>
import { getMailDetails, getNoticeList, editNotice, deleteNotice } from '@/api/notice/index'
export default {
  name: 'Notice',
  data () {
    return {
       subject:'',
       senderName:'',
       to:'',
       cc:'',
       bcc:'',
       attachments:'',
       createTime:'',
       content:'',
       attachmentsUrl:''
    }
  },
  created () {
    // this._getNoticeNumber()
    // this._getNoticeList()
    this.getMailDetails()
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    // 详情页面内容
    getMailDetails () {
      let data = {}
      data.id = this.$route.query.id
      getMailDetails (data).then(res=>{
         this.subject = res.data.subject
         this.senderName = res.data.senderName
         this.createTime = res.data.createTime
         if( res.data.to ){
           this.to = res.data.to[0]
         }
         if( res.data.cc ){
          this.cc = res.data.cc[0]
         }
          if( res.data.bcc ){
           this.bcc = res.data.bcc[0]
         }
        
         if( res.data.attachments ){
           this.attachments = res.data.attachments[0].name
           this.attachmentsUrl = res.data.attachments[0].base64
         }

         let str = res.data.content
         str = str.replace(/<[^<>]+>/g,'')
         this.content = str
      })
    },
    // 筛选已读或未读
    filterTag(value, row) {
      return row.tag === value;
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
      this._getNoticeList()
    },
    handleCurrentChange (val) {
      this.pagination.current_page = val
      this._getNoticeList()
    },
    handleReaded () {
      if (this.selectNotice.length === 0) {
        this.$message({
          message: '至少选择一条消息',
          type: 'warning'
        })
        return
      }
      this._editNotice()
    },
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
    _getNoticeNumber () {
      getNoticeNumber().then(res => {
        this.noticeNumberList = res.data
      })
    },
    _getNoticeList () {
      let data = {}
      data.current_page = this.pagination.current_page
      data.page_size = this.pagination.page_size
      data.type = this.type
      getNoticeList(data).then(res => {
        this.noticeList = res.data.list
        this.pagination.total_count = res.data.total_count
      })
    },
    _editNotice () {
      let id = this.selectNotice.join(',')
      editNotice(id).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this._getNoticeList()
      })
    },
    _deleteNotice () {
      let id = this.selectNotice.join(',')
      deleteNotice(id).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this._getNoticeList()
      })
    }
  },
  watch: {
    type () {
      this._getNoticeList()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.search-wrapper{
  padding: 20px;
  border: 1px solid #d7e0f1;
  background: #fff;
}
.title_e{
  padding: 0 10px;
  background: #f7faff;
}
.grid-content{
  margin: 8px 0;
  font-size: 14px;
}
.content{
  padding: 10px;
  min-height: 100px;
  border: 1px solid #ddd;
  margin: 20px 0;
}
.content_c{
  font-size:20px;
  font-weight: 600;
  min-height:200px;
}
.content_b{
  text-align: center;
  color: #4a99fa;
}
.attachment{
  border: 1px solid #ddd;
  margin: 20px 0;
}
.attachment_t{
  margin: 0;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-weight: bold;
  background: #f7faff;
}
.attachment_c{
   padding-left: 20px;
   height: 30px;
   line-height: 30px;
}
.attach{
    padding-left: 20px;
    display: inline-block;
    vertical-align: bottom;
    vertical-align: top;
}
.attach_b{
     display: inline-block;
}
.preview{
   color: #4a99fa;
   line-height: 20px;
}
</style>
