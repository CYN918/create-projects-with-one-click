<template>
    <div v-if="newArr[0].componentStatus==0" style="height: 600px;">
        <div class="banner" v-if="isshow">
            <div @mouseenter="isShowBtn=true"  @mouseleave="isShowBtn=false">
                <p class="settings" v-show="isShowBtn">
                    <span class="edit" @click="bannerEdit">编辑</span>
                    <span class="delete" @click="delehandele">删除</span>
                </p>
                <el-carousel :interval="2000">
                    <el-carousel-item v-for="(item,index) in bannerImg" :key="index">
                        <img :src=item.picUrl alt="">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <!--弹窗-->
            <el-dialog
                title="轮播图片编辑"
                :visible.sync="dialogVisible"
                width="60%"
            >
                <div class="bannerContainer">
                    <p class="information">
                        <span>轮播图片</span>
                    </p>
                    <el-button type="primary" style="margin: 50px" @click="addBanner">添加轮播图</el-button>
                    <div class="bannerConten" v-if="bannerConainer.length>0">
                        <div class="bannerList" v-for="(item,index) in bannerConainer" :key="index">
                            <!--点击添加轮播图-->
                            <div class="undataImg">
                                <el-upload
                                        class="avatar-uploader"
                                        :action="action"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                    >
                                <img v-if="item.picUrl" :src="item.picUrl" class="avatar"  prop="file" @click="handleClike(index)">
                                    <i v-else class="el-icon-plus avatar-uploader-icon" @click="handleClike(index)"></i>
                                </el-upload>
                                <el-form   label-width="100px" style="margin-top: 15px">
                                     <div style="display: flex;flex-direction: column">
                                         <div class="lianjie">
                                                 <el-form-item label="排序：">
                                                <el-input v-model="item.sortOrder"></el-input>
                                             </el-form-item>
                                         </div>
                                         <div class="lianjie">
                                             <el-form-item label="图片链接：">
                                                 <el-radio-group v-model="item.linkType">
                                                     <el-radio  :label="0">内部链接</el-radio>
                                                     <el-radio  :label="1">外部链接</el-radio>
                                                 </el-radio-group>
                                             </el-form-item>
                                         </div>
                                         <div class="lianjie">
                                             <el-form-item :label="item.linkType==0?'内部链接：':'外部链接：'">
                                                 <el-input v-model="item.linkUrl"></el-input>
                                             </el-form-item>
                                         </div>
                                     <div>
                                     <el-button type="danger" icon="el-icon-delete" circle style="margin-left: 20px" @click="deleBanner(index)"></el-button>
                                      </div>
                                     </div>
                                 </el-form>
                            </div>
                        </div>
                    </div>
                </div>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="canceldialogVisible">取 消</el-button>
                    <el-button type="primary" @click="confrimImg">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import { updateComponent } from  '@/api/mallapp/homeEditor'
export default {
    props:['newArr'],
    data(){
        return{
            bannerConainer:[{ picUrl:'',  linkUrl:'',linkType:0,sortOrder:''}],
            action:'',
            dialogImageUrl: '',
            dialogVisibles: false,
            isShowBtn:false,
            isshow:true,
            component:'',
            selecetImg:'',
            dialogVisible:false,
            componentId:'',
            contentId:'',  //组件内容id
            imgArr:[],
            bannerImg:[],
            num:0
        }
    },
    watch:{
        dialogVisible(val){
            if(!val){
                this.getBanner()
            }
        }
    },
    created(){
        this.componentId = this.newArr[0].componentId
        this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
        this.getBanner()
    },
   methods:{
       // 取消
       canceldialogVisible(){
           this.dialogVisible = false
       },

       //获取banner
       getBanner(){
           let content =this.newArr[0].componentContents
           if(content.length==0){
               content.push({
                   content:'[]',
                   type:4,
                   sortOrder:0,
                   contentStatus:0,
                   picture:'1 ',
                   title:' ',
               })
           }
           this.bannerImg = JSON.parse(content[0].content);
           const bannerConainer=[...this.bannerImg]
           this.bannerConainer = bannerConainer.sort(this.compare('sortOrder'))
       },
       //排序
       compare(property){
           return function(a,b){
               let value1 = a[property];
               let value2 = b[property];
               return value1 - value2;
           }
       },

       //删除轮播
       deleBanner(index){
           this.$confirm('确认删除此轮播图?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
           }).then(() => {
               this.bannerConainer.splice(index,1)
               this.bannerConainer.forEach((item,index)=>{
                   item.sort = index+1
               })
               console.log(this.bannerConainer)
               this.$message({
                   type: 'success',
                   message: '删除成功!'
               });
           }).catch(() => {
               this.$message({
                   type: 'info',
                   message: '已取消删除'
               });
           });
       },
       // 添加轮播图
       addBanner(){
            this.bannerConainer.unshift({ picUrl:'',  linkUrl:'',linkType:0,sortOrder:''})
       },

       handleClike(index){
           this.num = index
       },
       //上传图片
       handleAvatarSuccess(res,file){
          this.bannerConainer[this.num].picUrl = res.data.domain + res.data.filePath;
           console.log('-------------')
           console.log( this.bannerConainer)
       },
        async confrimImg(){
            let contentId
            if(this.newArr[0].componentContents.length>0){
                contentId = this.newArr[0].componentContents[0].contentId
            }else{
                contentId = null
            }
            this.dialogVisible = false
           const obj={
               contentId:contentId,
               componentId:this.componentId,
               content:JSON.stringify(this.bannerConainer),
               type:4,
               sortOrder:0,
               contentStatus:0,
               picture:'1 ',
               title:' ',
           }
           const res = await updateComponent(obj)
            if(res.code=== 200 ){
                this.$message({
                    type:'success',
                    message:'编辑成功'
                })
            }else{
                this.$message({
                    type:'info',
                    message:'编辑失败'
                })
            }
       },
       async bannerEdit(){
           this.dialogVisible = true
       },
       delehandele(){
           this.$confirm('此结构被删除, 是否继续?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
           }).then(() => {
               this.isshow = false
               this.$emit('delete',this.componentId)
               this.$message({
                   type: 'success',
                   message: '删除成功!'
               });
           }).catch(() => {
               this.$message({
                   type: 'info',
                   message: '已取消删除'
               });
           });
       },
       },
}
</script>
<style lang="scss" scoped>
   /deep/ .el-carousel__item  {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 600px;
        margin: 0;
    }
   /deep/.el-carousel__container{
       height: 600px;
   }
.inputList{
    margin: 30px;
    width: 300px;
}
.banner{
    width: 100%;
    height: 600px;
    position: relative;
    img{
        width: 100%;
        height: 100%;
    }
}
.settings{
   position: absolute;
   left: 0;
   top: 0;
   z-index: 6000;
   span{
       cursor: pointer;
       display: inline-block;
       width:56px;
       height:32px;
       line-height: 32px;
       text-align: center;
       background:rgba(76,134,244,1);
       border-radius:3px;
       font-size:12px;
       font-family:Microsoft YaHei;
       font-weight:400;
       color:rgba(255,255,255,1);
   }
   .edit{
       margin-right: 14px;
   }
}
.bannerContainer{
    .information{
        span{
            padding-left: 18px;
            font-size:14px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
            border-left: 4px solid rgba(84, 148, 246, 1);
        }
    }
    .bannerConten{
        margin-top: 30px;
        .bannerList{
            display: flex;
            .label{
                margin-right: 10px;
                font-size: 14px;
            }
            .undataImg{
                margin:20px;
                display: flex;
                margin-left: 50px;
                img{
                    width: 600px;
                    height: 200px;
                }
                .updata{
                     margin-top: 110px;
                    .chonxin{
                        font-size:13px;
                        color:rgba(76,134,244,1);
                        margin-left: 20px;
                        cursor: pointer;
                        border: 1px solid rgba(76,134,244,1);
                        display: inline-block;
                        width: 70px;
                        height: 33px;
                        line-height: 33px;
                        text-align: center;

                    }
                    .cicun{
                        margin-left: 10px;
                    }
                }
            }
        }
    }
}
/deep/.el-dialog__body{
    padding: 0;
    padding-top: 20px;
}
   .avatar-uploader .el-upload {
       border: 1px dashed #d9d9d9;
       border-radius: 6px;
       cursor: pointer;
       position: relative;
       overflow: hidden;
   }
   .avatar-uploader .el-upload:hover {
       border-color: #409EFF;
   }
   .avatar-uploader-icon {
       font-size: 28px;
       color: #8c939d;
       width: 178px;
       height: 178px;
       line-height: 178px;
       text-align: center;
   }
   .avatar {
       width: 178px;
       height: 178px;
       display: block;
   }
.lianjie{
    height: 50px;
}
</style>
