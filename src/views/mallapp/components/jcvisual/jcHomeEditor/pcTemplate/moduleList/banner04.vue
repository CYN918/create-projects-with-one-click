<template>
    <div v-if="newArr[0].componentStatus==0" style="height: 600px;">
        <div class="banner" v-if="isshow">
            <div @mouseenter="isShowBtn=true"  @mouseleave="isShowBtn=false">
                <p class="setting" v-show="isShowBtn">
                    <span class="edit" @click="bannerEdit">编辑</span>
                    <span class="delete" @click="delehandele">删除</span>
                </p>
                <el-carousel :interval="2000">
                    <el-carousel-item v-for="(item,index) in bannerImg" :key="index">
                        <img :src=item alt="">
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

                    <div class="bannerConten">
                        <div class="bannerList">
                            <!--点击添加轮播图-->
                            <div class="undataImg">
                                <span class="label">轮播图:</span>
                                <el-upload
                                        style="display: flex;flex-direction: column"
                                        :action="action"
                                        list-type="picture-card"
                                        modal-append-to-body=true
                                        :on-preview="handlePictureCardPreview"
                                        :on-remove="handleRemove"
                                        :on-success="handleAvatarSuccess1"
                                >
                                    <span class="chonxin">上传图片</span>
                                </el-upload>
                                <!--<span class="cicun">建议尺寸1920*600像素</span>-->
                                <el-dialog :visible.sync="dialogVisibles" :append-to-body="true">
                                    <img width="100%"  v-if="dialogImageUrl" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                        </div>
                    </div>
                </div>

                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
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
            color: '#ff0000',
            action:'',
            dialogImageUrl: '',
            dialogVisibles: false,
            isShowBtn:false,
            isshow:true,
            component:'',
            selecetImg:'',
            dialogVisible:false,
            postUrl:'',    //上传的地址
            componentId:'',
            imgArr:[],
            bannerImg:''
        }
    },

    created(){
        this.componentId = this.newArr[0].componentId
        this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
        this.bannerImg = JSON.parse(this.newArr[0].componentContents[3].content).bannerImg
    },
   methods:{
       handleRemove(file, fileList) {
          const img =  file.response.data.domain+file.response.data.filePath
           this.imgArr.forEach((item,index)=>{
               if(item==img){
                   this.imgArr.splice(index,1)
               }
           })
       },
       handlePictureCardPreview(file) {
           this.dialogImageUrl = file.url;
           this.dialogVisibles = true;
       },

       //上传图片
       handleAvatarSuccess1(res,file){
           this.dialogImageUrl = res.data.domain + res.data.filePath;
           this.imgArr.push(this.dialogImageUrl)
       },

       //确认图片
       async confrimImg(){

           this.dialogVisible = false
           const contenList={
               bannerImg:this.imgArr
           }
           const obj={
               componentId:this.componentId,
               content:JSON.stringify(contenList),
               type:4,
               sortOrder:0,
               contentStatus:0,
               picture:'1 ',
               title:' ',
           }
           const res = await updateComponent(obj)
           if(res.code=== 200 ){
               console.log(res.data)
           }
       },

       // 删除
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

       bannerEdit(){
           this.dialogVisible = true
       }
   }
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
.banner{
    width: 100%;
    height: 600px;
    position: relative;
    .setting{
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
    img{
        width: 100%;
        height: 100%;
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
            .label{
                margin-right: 10px;
                font-size: 14px;
            }
            .undataImg{
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
</style>