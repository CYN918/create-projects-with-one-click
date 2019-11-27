<template>
  <div class="margin">
    <div class="mbottom">
          <div class="goods-fitter">
            <div class="search-wrapper"> 
              <el-page-header @back="back" content='额度发放管理>项目管理员给用户发放额度>额度发放>积分账户'></el-page-header>
            </div>
          </div>
      </div>
      <div class="mcard mbottom">
        <div class="title">广东南粤集团有限公司-积分账户</div>
           <div>
              <el-form ref="form" :modal="messageTitle" label-width="80px" size="small">
                <el-row>
                  <el-col :span="24">
                    <el-col :span="6">
                      <el-form-item label="账户选择:" >
                        <el-input  v-model="value"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>   
                </el-row> 
                 <el-row>
                  <el-col :span="24">
                    <el-col :span="6">
                      <el-form-item label="发放额度:">
                        <el-input :span="6" v-model="value"></el-input>
                      </el-form-item>
                    </el-col>
                     <el-col :span="12" style="line-height: 40px;margin-left: 10px;">
                      <span>积分</span>     <span style='color:red;'>（剩余可发放额度：20000积分）</span>      <span style="color:#4C86F4;">去充值</span> <span style="color:#4C86F4;">/</span><span style="color:#4C86F4;">去申请</span>
                    </el-col>
                  </el-col>   
                </el-row> 
                <el-row>
                  <el-col :span="24" style="line-height:32px;margin-bottom:18px;font-size: 14px;">
                    <el-col :span="6">
                        公司名称： 平安银行
                    </el-col>
                     <el-col :span="6">
                        部门： 技术部
                    </el-col>
                     <el-col :span="6">
                        额度管理人： 刘经理
                    </el-col>
                     <el-col :span="6">
                        额度发放人： 刘经理
                    </el-col>
                  </el-col>   
                </el-row> 
                 <el-row>
                  <el-col :span="24">
                    <el-col :span="6">
                      <el-form-item label="被发放人:" >
                        <el-input  v-model="value"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>   
                </el-row> 
                 <el-row>
                  <el-col :span="24">
                    <el-col :span="24">
                      <el-form-item label="" >
                        <div style='border: 1px solid #DCDFE6;min-height: 60px;border-radius: 4px;'>xxxxxx</div>
                      </el-form-item>
                    </el-col>
                  </el-col>   
                </el-row> 
                 <el-row>
                  <el-col :span="24">
                    <el-col :span="24">
                      <el-form-item label="全部商品:" >
                        <div class="shopList">
                            <ul>
                              <li><p><img src="../../../common/images/icon/查看详情.png" alt class="" /></p> <div><span>介绍</span><span style="color:red;">价格</span></div></li>
                              <li><p><img src="../../../common/images/icon/查看详情.png" alt class="" /></p> <div><span>介绍</span><span style="color:red;">价格</span></div></li>
                              <li><p><img src="../../../common/images/icon/查看详情.png" alt class="" /></p> <div><span>介绍</span><span style="color:red;">价格</span></div></li>
                              <li><p><img src="../../../common/images/icon/查看详情.png" alt class="" /></p> <div><span>介绍</span><span style="color:red;">价格</span></div></li>
                              <li><p><img src="../../../common/images/icon/查看详情.png" alt class="" /></p> <div><span>介绍</span><span style="color:red;">价格</span></div></li>
                              <li><p><img src="../../../common/images/icon/查看详情.png" alt class="" /></p> <div><span>介绍</span><span style="color:red;">价格</span></div></li>
                              <li><p><img src="../../../common/images/icon/查看详情.png" alt class="" /></p> <div><span>介绍</span><span style="color:red;">价格</span></div></li>
                              <li><p><img src="../../../common/images/icon/查看详情.png" alt class="" /></p> <div><span>介绍</span><span style="color:red;">价格</span></div></li>
                            </ul>
                            <ul>
                              <li><p><img src="../../../common/images/icon/查看详情.png" alt class="" /></p> <div><span>介绍</span><span style="color:red;">价格</span></div></li>
                              <li><p><img src="../../../common/images/icon/查看详情.png" alt class="" /></p> <div><span>介绍</span><span style="color:red;">价格</span></div></li>
                              <li><p><img src="../../../common/images/icon/查看详情.png" alt class="" /></p> <div><span>介绍</span><span style="color:red;">价格</span></div></li>
                              <li><p><img src="../../../common/images/icon/查看详情.png" alt class="" /></p> <div><span>介绍</span><span style="color:red;">价格</span></div></li>
                              <li><p><img src="../../../common/images/icon/查看详情.png" alt class="" /></p> <div><span>介绍</span><span style="color:red;">价格</span></div></li>
                              <li><p><img src="../../../common/images/icon/查看详情.png" alt class="" /></p> <div><span>介绍</span><span style="color:red;">价格</span></div></li>
                              <li><p><img src="../../../common/images/icon/查看详情.png" alt class="" /></p> <div><span>介绍</span><span style="color:red;">价格</span></div></li>
                              <li><p><img src="../../../common/images/icon/查看详情.png" alt class="" /></p> <div><span>介绍</span><span style="color:red;">价格</span></div></li>
                            </ul>
                             <el-row class="bottom">
                              <el-col :span="24" class="right" style="text-align: right;margin-top: 20px;">
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
                      </el-form-item>
                    </el-col>
                  </el-col>   
                </el-row> 
             </el-form>
           </div>
           
           
             
            
            

          </div>
       </div>   
  </div>         
</template>

<script>
import { getMessageDetail, getNoticeList, editNotice, deleteNotice } from '@/api/notice/index'
export default {
  name: 'Notice',
  data () {
    return {
      value:'',
        messageTitle:'',
        messageCategory:'',
        senderName:'',
        receiverName:'',
        businessType:'',
        businessId:'',
        messageLink:'',
        sendTime:'',
        messageContent:'',
         pagination: {
        current_page: 1,
        page_size: 10,
        total_count: 0
      },
    }
  },
  created () {
    // this._getNoticeNumber()
    // this._getNoticeList()
    this.getMessageDetail()
  },
  methods: {
    // 获取详情
    getMessageDetail() {
      console.log(this.$route.query.id)
      var data = {}
      data.id = this.$route.query.id
      data.update = true
      getMessageDetail(data).then(res => {
          this.messageTitle = res.data.messageTitle
          if(  res.data.messageCategory == 0 ) {
            this.messageCategory = '系统消息'
          }else if(  res.data.messageCategory == 1 ) {
            this.messageCategory = '供应商'
          }else if(  res.data.messageCategory == 2 ) {
            this.messageCategory = '客户'
          }else if(  res.data.messageCategory == 3 ) {
            this.messageCategory = '其他'
          }
          this.senderName =  res.data.senderName
          this.receiverName =  res.data.receiverName

          if( 0 <=  res.data.businessType &&   res.data.businessType <= 99 ) {
            this.businessType = '系统消息相关'
          }else if(  100 <=  res.data.businessType &&   res.data.businessType <= 199  ) {
            this.businessType = '供应商相关'
          }else if(  200 <=  res.data.businessType &&   res.data.businessType <= 299  ) {
            this.businessType = '客户相关'
          }else if(  300 <=  res.data.businessType &&   res.data.businessType <= 399 ) {
            this.businessType = '用户相关'
          }else if(  400 <=  res.data.businessType &&   res.data.businessType <= 499  ) {
            this.businessType = '商品相关'
          }else if(  500 <=  res.data.businessType &&   res.data.businessType <= 599  ) {
            this.businessType = '订单相关'
          }else if(  600 <=  res.data.businessType &&   res.data.businessType <= 699 ) {
            this.businessType = '售后相关'
          }
           
          this.businessId =  res.data.businessId 
          this.messageLink =  res.data.messageLink
          this.sendTime =  res.data.sendTime  
          this.messageContent =  res.data.messageContent  
      })
    },
    back() {
      this.$router.go(-1);
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
img{
  vertical-align: middle;
}
.shopList ul{
  display: flex;
  justify-content: space-around;
}
.shopList ul p{
  text-align: center;
  border: 1px solid #ddd;
}
.shopList ul li div{
  text-align: center;
}
.search-wrapper{
  padding: 20px;
  border: 1px solid #d7e0f1;
  background: #fff;
}
.title_e{
  padding:20px;
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
  min-height: 200px;
}
.content_b{
  text-align: center;
  color: #4a99fa;
  line-height: 28px;
  font-size: 14px;
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
