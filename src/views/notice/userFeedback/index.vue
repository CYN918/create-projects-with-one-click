<template>
  <div class="margin">
      <div class="mcard mbottom">
        <div class="title">用户反馈</div>
        <div>
           <el-form label-width="120px" size="small">
            <el-row>
                <el-col :span="6">
                  <el-col>
                    <el-form-item label="联系方式：">
                      <el-col :span="23">
                        <el-input  v-model="messageTitle" placeholder="请输入联系方式">
                        </el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                 <el-col :span="6">
                  <el-col>
                    <el-form-item label="反馈内容：">
                      <el-col :span="23">
                        <el-input  v-model="feedContent" placeholder="请输入反馈内容">
                        </el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                 <el-col :span="6">
                  <el-col>
                     <el-form-item label="阅读状态">
                        <el-select :span="23" v-model="readStatus" placeholder="请选择阅读状态">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="未读" value="0"></el-option>
                            <el-option label="未回复" value="1"></el-option>
                            <el-option label="已回复" value="2"></el-option>
                            <el-option label="已删除" value="3"></el-option>
                        </el-select>
                      </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="2" style='text-align: center;'>
                        <el-button type="primary" size="small" @click="handelSearchGoods">搜索</el-button>
                </el-col>
              </el-row>
           </el-form>
        <!-- <div class="addback">
          <el-button type="primary" icon="el-icon-plus">添加反馈</el-button>
        </div> -->
        </div>  
      </div>
    
      <div class="mcard">
        <el-col :span="6" style="margin-bottom: 20px;">
            <el-button type="danger" size="small" :disabled="disabled"  @click="feedBackDelete"  v-permit="'feedback:batch'">批量删除</el-button>
         </el-col>
        <el-table :data="noticeList" border style="width: 100%" stripe   @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="用户名称"  align="center" prop="userName"></el-table-column>
          <el-table-column label="反馈类型"  align="center" prop="feedbackType">
            <template slot-scope="scope">
              <div v-if="scope.row.feedbackType == 0">反馈</div>
              <div v-else-if="scope.row.feedbackType == 1">回复</div>
            </template>
          </el-table-column>
          <el-table-column label="状态"  align="center" prop="feedbackStatus">
            <template slot-scope="scope">
                <div v-if="scope.row.feedbackStatus == 0">未读</div>
                <div v-else-if="scope.row.feedbackStatus == 1">未回复</div>
                <div v-else-if="scope.row.feedbackStatus == 2">已回复</div>
                <div v-else-if="scope.row.feedbackStatus == 3">已删除</div>
            </template>
          </el-table-column>
          <el-table-column label="反馈标题"  align="center" prop="feedbackTitle"></el-table-column>
          <el-table-column label="反馈图片"  align="center" prop="feedbackImgSrc" width='200px'>
               <!-- <template slot-scope="scope">
                <div v-if="scope.row.feedbackImg">
                    <img  :src='scope.row.feedbackImg' style="max-width:120px;"/>
                </div>
                <div v-else>暂无图片</div>
            </template> -->
            <template slot-scope="scope">
                 <span class='pic_d' v-if="scope.row.feedbackImg ==null || scope.row.feedbackImg =='' ">暂无图片</span> 
                 <span class='pic_d' v-else-if="scope.row.feedbackImg.length >= 1">
                      <span>
                         <img :src='imgSrc(scope.row.feedbackImg)'  style="max-width:120px;"/>
                      </span>
                 </span>
            </template>
          </el-table-column>
          <el-table-column label="反馈等级"  align="center" prop="feedbackGrade"></el-table-column>
          <el-table-column label="联系方式"  align="center" prop="contact"></el-table-column>
          <el-table-column label="是否显示"  align="center" prop="feedbackDispaly">
            <template slot-scope="scope">
                <div v-if="scope.row.feedbackDispaly == '0'">都显示</div>
                <div v-else-if="scope.row.feedbackDispaly == '1'">对用户隐藏</div>
                <div v-else-if="scope.row.feedbackDispaly == '2'">对商家隐藏</div>
            </template>
          </el-table-column>
          <el-table-column label="反馈内容"  align="center" prop="feedbackContent"></el-table-column>
          <el-table-column label="备注"  align="center" prop="remark"></el-table-column>
          <el-table-column label="创建时间"  align="center" prop="feedbackTime">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.feedbackTime }}</span>
              </template>
          </el-table-column>
          <el-table-column label="操作" align="left" fixed="right" width="150" prop="id">
              <template slot-scope="scope">
                <div class="line-div">
                  <div class="small-Idiv" @click="openDetails(scope.row.feedbackId,scope.row.feedbackStatus)"  v-permit="'feedback:details'">
                    <div class="i-div">
                      <img src="../../../common/images/icon/查看详情.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;margin-left: 3px;">详情</span>
                  </div>
                   <div class="small-Idiv" v-if="scope.row.feedbackStatus != 2 && scope.row.feedbackStatus != 3"  v-permit="'feedback:reply'"  @click="replyFeedback(scope.row.feedbackId)">
                    <div class="i-div">
                      <img src="../../../common/images/icon/回复.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;margin-left: 3px;">回复</span>
                  </div>
                   <div class="small-Idiv" v-if="scope.row.feedbackStatus != 3"  v-permit="'feedback:delete'" @click="removeFeedback(scope.row.feedbackId)">
                    <div class="i-div">
                      <img src="../../../common/images/icon/回收站.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;margin-left: 3px;">删除</span>
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
      
      	<!-- 删除备注 -->
				<el-dialog title="删除备注" :visible.sync="dialogWithdrawalVisible" width="50%" :before-close="withdrawalClose"
									 :close-on-click-modal="false">
						<el-form ref="form" label-width="100px" size="small">
								<div class="titleT">
										<h4 class="title">删除备注</h4>
								</div>
								<el-row>
										<el-col :span="24">
												<el-form-item label="删除备注：">
														<el-input type="textarea" v-model="remark"></el-input>
												</el-form-item>
										</el-col>
								</el-row>
						</el-form>
						<span slot="footer" class="dialog-footer">
				<el-button type="danger" @click="withdrawalClose" size="small">取 消</el-button>
				<el-button type="primary" @click="withdrawalSave" size="small">确 定</el-button>
				</span>
				</el-dialog>

      	<!-- 反馈回复 -->
				<el-dialog title="用户反馈回复" :visible.sync="dialogReplyVisible" width="50%" :before-close="replyClose"
									 :close-on-click-modal="false">
						<el-form ref="form" label-width="120px" size="small">
								<div class="titleT">
										<h4 class="title">用户反馈回复</h4>
								</div>
								<el-row>
										<el-col :span="24">
												<el-form-item label="反馈回复内容：">
														<el-input type="textarea" v-model="refeedbackContent"></el-input>
												</el-form-item>
										</el-col>
								</el-row>
              	<el-row>
								  <el-form-item label="反馈回复图片：" class="upload-img-form">
									    <el-upload
										class="avatar-uploader"
										:action="action"
										:show-file-list="false"
										:on-success="handleAvatarSuccess"
										 accept="image/jpeg, image/png"
										>
                          <img v-if="refeedbackImg" :src="refeedbackImg" class="avatar"  prop="file" style="max-width:200px;">
                                 <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        </el-form-item>
								</el-row>
						</el-form>
						<span slot="footer" class="dialog-footer">
				<el-button type="danger" @click="replyClose" size="small">取 消</el-button>
				<el-button type="primary" @click="replySave" size="small">确 定</el-button>
				</span>
				</el-dialog>

  </div>
</template>

<script>
import {  getfeedbackList, deleteFeed , deleFeedback , replyFeedback , feedbackUpdateStatus} from '@/api/notice/index'
export default {
  name: 'Notice',
  data () {
    return {
      dialogWithdrawalVisible:false,
      dialogReplyVisible:false,
      refeedbackContent:'',
      action:'',
      refeedbackImg:'',
      messageTitle:'',   // 联系方式
      feedContent:'',   // 反馈内容
      readStatus:'',    // 阅读状态
      disabled:false,
      noticeList: [],   // 表格数据
      feedbackId:'',
      remark:'',        // 删除备注  
      multiple:1,       // 1 为单个删除 2为批量删除
      pagination: {
        current_page: 1,
        page_size: 10,
        total_count: 0
      },
      selectNotice: [], // 已选中表格数据
    }
  },
  created () {
    // 获取表格数据
    this.getfeedbackList()
    this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
  },
  methods: {
    getfeedbackList() {
      let data = {}
      data.pageNum = this.pagination.current_page
      data.pageSize = this.pagination.page_size
      data.contact  = this.messageTitle
      data.feedbackContent  = this.feedContent
      data.feedbackStatus  =  this.readStatus
     
     
      getfeedbackList(data).then(res => {
        var that =this
        that.noticeList = res.data.list    
        this.pagination.total_count = res.data.total
      })
    },
    imgSrc(val){
       var  srcImg
      if( val == '' ||  val ==null ){
          return ''
      }else if( val.search(",") != -1 ){
        srcImg = val.split(",");
      }else if( val.search("，") != -1 ){
        srcImg = val.split("，");
      }else{
        srcImg = val
        return  srcImg
      }
       return  srcImg[0]
    },
    // 搜索
    handelSearchGoods(){
        this.pagination.current_page = 1
        if( this.readStatus == '3' ){
           this.disabled = true
        }else{
           this.disabled = false
        }
        this.getfeedbackList()
    },
    // 上传图片
    handleAvatarSuccess(res,file){
        this.refeedbackImg = res.data.domain + res.data.filePath
    },
    // 跳转详情页面
    openDetails(id,feedbackStatus) {   
        this.$router.push({ name: "feedbackDetails" , query: {id: id,feedbackStatus:feedbackStatus}});
    },
    handleSelectionChange (data) {
      let ret = []
      data.map(item => {
        ret.push(item.feedbackId)
      })
      this.selectNotice = ret
    },
    handleSizeChange (val) {
      this.pagination.page_size = val
      this.getfeedbackList()
    },
    handleCurrentChange (val) {
      this.pagination.current_page = val
      this.getfeedbackList()
    },
     // 删除反馈
    removeFeedback( id ){
        this.multiple = 1
        this.remark = ''
        this.feedbackId = id
        this.dialogWithdrawalVisible = true

        //  this.$prompt('请输入删除备注', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   closeOnClickModal:false,
        //   inputType:'textarea',
        // }).then(({ value }) => {
        //    if( value ){
        //        var data ={
        //           feedbackId: Number(this.feedbackId),
        //           remark:value
        //        }
        //        deleFeedback(data).then( res =>{
        //           if( res.code == 200 ){
        //               this.getfeedbackList()
        //               this.$message({
        //                 showClose: true,
        //                 type: 'success',
        //                 message: '删除成功'
        //               });
        //           }
        //        })
        //    }else{
        //       this.$message({
        //         type: 'warning',
        //         message: '请输入删除备注'
        //       });       
        //    }
        // }).catch((val) => {
        // });
    },
    // 批量删除
    feedBackDelete () {
      this.multiple = 2 
      if( this.multiple == 2  ){
          if (this.selectNotice.length === 0) {
            this.$message({
              message: '至少选择一条消息',
              type: 'warning'
            })
            return
          }
      }
      this.dialogWithdrawalVisible = true
      this.remark = ''
      this.feedbackId =''
    },
    // 删除取消
    withdrawalClose(){
       if( this.remark ){
         this.$confirm('确认取消删除用户反馈, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.dialogWithdrawalVisible = false
        }).catch(() => {
             
        });
       }else{
            this.dialogWithdrawalVisible = false
       }   
    },
    // 删除确定
    withdrawalSave(){
        if( this.remark ){
          if(  this.multiple == 2   ){
            var  data = {}
            data.feedbackIds = this.selectNotice.join(',')
            data.remark = this.remark
            deleteFeed(data).then(res => {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
               this.dialogWithdrawalVisible = false
                this.getfeedbackList()
            })
          }else if( this.multiple == 1  ){
             var data ={
                  feedbackId: this.feedbackId,
                  remark:this.remark
               }
               deleFeedback(data).then( res =>{
                  if( res.code == 200 ){
                      this.getfeedbackList()
                      this.dialogWithdrawalVisible = false
                      this.$message({
                        showClose: true,
                        type: 'success',
                        message: '删除成功'
                      });
                  }
               })
          }
          
        }else{
            this.$message({
              message: '请输入删除备注',
              type: 'warning'
            })
        }   
    },
    // 反馈回复
    replyFeedback(id){
      this.feedbackId = id
      this.dialogReplyVisible = true 
      this.refeedbackContent = ''
      this.refeedbackImg = ''
    },
    // 反馈回复取消
    replyClose(){
      if( this.refeedbackContent == '' && this.refeedbackImg == '' ){
         this.dialogReplyVisible = false
      }else{
         this.$confirm('确认取消回复用户反馈, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.dialogReplyVisible = false
        }).catch(() => {
             
        });
      }
     
    },
    // 反馈回复确定
    replySave(){
        var data = {}
        data.feedbackContent =   this.refeedbackContent
        data.feedbackId =   this.feedbackId
        data.feedbackImg =   this.refeedbackImg
        if( !this.refeedbackContent ){
            this.$message({
                showClose: true,
                type: 'error',
                message: '反馈回复内容不能为空'
            });
            return
        }

        replyFeedback(data).then( res => {
           if( res.code == 200 ){
              this.dialogReplyVisible = false
              this.$message({
                showClose: true,
                type: 'success',
                message: '回复成功'
              });
              this.feedbackUpdateStatus()
              this.getfeedbackList()
           }
        })
    },
     // 修改状态
    feedbackUpdateStatus(){
        var data = {}
        data.feedbackId = this.feedbackId
        data.feedbackStatus = 2
         feedbackUpdateStatus(data).then( res =>{
          console.log(res)
        })
    },
  },
  filters:{
    
  },
  watch: {
  
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.addback{
  position: absolute;
  right: 50px;
  top: 38px;
}
.small-Idiv{
  display: inline-block;
  width: 50%;
  text-align: center;
}
.title{
  margin-left: -20px;
  font-size: 16px;
  font-weight: 400;
  color: 3333;
  padding-left: 10px;
  line-height: 1.4;
  border-left: 4px solid #4C86F4;
  margin-bottom: 10px;
}
.avatar-uploader-icon{
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
}
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
