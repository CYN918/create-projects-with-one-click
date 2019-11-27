<template>
    <div class="indexFoot"  v-if="newArr[0].componentStatus==0" :style="{background:form.bgcolor}">
        <ul class="list clearfix" v-if="isshow">
            <li class="item">
                <i class="label">多</i>
                <span class="word">品类齐全，轻松购物</span>
            </li>
            <li class="item">
                <i class="label">快</i>
                <span class="word">多仓直发，急速配送</span>
            </li>
            <li class="item">
                <i class="label">好</i>
                <span class="word">正品行货，精致服务</span>
            </li>
            <li class="item">
                <i class="label">省</i>
                <span class="word">天天低价，畅选无忧</span>
            </li>
        </ul>
        <div class="container"  @mouseenter="isShowBtn=true"  @mouseleave="isShowBtn=false">
            <div class="title clearfix">
                <ul class="clearfix list2">
                    <li>
                        <dl>
                            <dt>{{list[0] && list[0].categoryName}}</dt>
                            <dd v-for="(data,index2) in list[0] && list[0].children" :key="index2">{{data.categoryName}}</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>{{list[1] && list[1].categoryName}}</dt>
                            <dd v-for="(data,index2) in list[1] && list[1].children" :key="index2">{{data.categoryName}}</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>{{list[2] && list[2].categoryName}}</dt>
                            <dd v-for="(data,index2) in list[2] && list[2].children" :key="index2">{{data.categoryName}}</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>{{list[3] && list[3].categoryName}}</dt>
                            <dd v-for="(data,index2) in list[3] && list[3].children" :key="index2">{{data.categoryName}}</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>{{ list[4] && list[4].categoryName}}</dt>
                            <dd v-for="(data,index2) in list[4] && list[4].children" :key="index2">{{data.categoryName}}</dd>
                        </dl>
                    </li>
                </ul>
                <div class="indexFoot-logo" v-for="item in bannerConainer">
                    <img :src=item.imgUrl alt=""/>
                    <p>{{item.imgLink}}</p>
                </div>
            </div>
            <div class="last-link">
                <span >{{form.copyright}}</span>
            </div>
            <div class="last-link">

                    <p>
                        <span>相关产品：</span>
                        <a :href=item.relatedLink v-for="item in form.relatedDownload">
                            {{item.relatedProducts}}
                        </a >
                    </p>

            </div>
            <div class="last-text">
                相关下载：{{form.download}}
            </div>
            <p class="setting" v-show="isShowBtn">
                <span class="edit" @click="footerEdit">编辑</span>
                <span class="delete" @click="delehandele">删除</span>
            </p>
        </div>

        <!--弹窗-->
        <el-dialog
                title="提示"
                :modal-append-to-body = "true"
                :append-to-body="true"
                :visible.sync="purchasedialogVisible"
                width="965px"
             >
            <div class="footerEdit">
                <p class="information">
                    <span>底部编辑</span>
                </p>
              <el-form ref="form" :model="form" label-width="80px">
                <el-button type="primary" style="margin-left: 50px;margin-top: 20px" @click="addBanner">添加二维码</el-button>
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
                                <img v-if="item.imgUrl" :src="item.imgUrl" class="avatar"  prop="file" @click="handleClike(index)">
                                <i v-else class="el-icon-plus avatar-uploader-icon" @click="handleClike(index)"></i>
                            </el-upload>
                            <p style="margin-left: 50px;margin-top:30px">
                                <span >输入二维码名称:</span>
                                <el-input  style="width: 200px;margin-left: 20px" v-model="item.imgLink" placeholder="请输入二维码名称" class="inputList">{{item.imgLink}}</el-input>
                            </p>
                        </div>
                        <!--改变文章列表-->
                    </div>
                   <div style="margin-top: 20px">
                       <el-form-item label="版权专属:">
                           <el-input v-model="form.copyright"></el-input>
                       </el-form-item>
                       <el-form-item label="相关下载:">
                           <el-input v-model="form.download"></el-input>
                       </el-form-item>
                       <el-button type="primary" style="margin-left: 50px;margin-top: 20px;margin-bottom: 20px" @click="addrelated">添加相关下载</el-button>
                      <div v-for="(item,index) in form.relatedDownload" :key='index' style="margin-top: 20px">
                          <el-row :gutter="50">
                              <el-col :span="10">
                                      <p style="display: flex" >
                                          <span style="display: inline-block;width:100px;margin-top: 12px">相关产品{{index+1}}:</span>
                                          <el-input v-model="item.relatedProducts"></el-input>
                                      </p>
                              </el-col>
                              <el-col :span="10">
                                  <p style="display: flex" >
                                      <span style="display: inline-block;width:100px;margin-top: 12px">相关链接{{index+1}}:</span>
                                      <el-input v-model="item.relatedLink"></el-input>
                                  </p>
                              </el-col>
                          </el-row>
                      </div>
                       <div style="margin-top: 20px">
                           <el-row>
                               <el-col :span="3">
                                   <el-form-item label="主调色:">
                                       <el-color-picker
                                               v-model="form.bgcolor"
                                               size="small"
                                               popper-class="选择背景色"
                                       ></el-color-picker>
                                   </el-form-item>
                               </el-col>
                               <el-col :span="5">
                              <span class="bgk">
                                  主题色为活动界面的背景。
                              </span>
                               </el-col>
                               <el-col :span="10">
                                   <p class="modifyList">
                                       <span>修改文章列表请点击:</span>
                                       <el-button type="primary" @click="$router.push('/article/articleClassification')">去编辑</el-button>
                                   </p>
                               </el-col>
                           </el-row>
                       </div>
                   </div>

                 </div>
              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="purchasedialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import { reqFooterData ,updateComponent} from '@/api/mallapp/homeEditor'
    export default {
        props:['componentStatus','newArr'],
        name: 'Footer',
        data() {
            return {
                form:{
                    copyright:'',
                    bgcolor:'',
                    relatedProducts:'',
                    relatedDownload:[
                        {
                            download:'',
                            relatedLink:''
                        },
                    ],
                },
                bannerConainer:[{ imgUrl:'',  imgLink:''}],
                action:'',
                dialogImageUrl: '',
                componentId:'',
                contentId:'',  //组件内容id
                purchasedialogVisible:false,
                isshow:true,
                isShowBtn:false,
                list: [],
                num:''
            }
        },
        watch:{
            purchasedialogVisible(val){
                if(!val){
                    this.getActivity()
                }
            } ,
        },
        async created() {
            const obj = {}
            obj.showInNav = 1
            const res = await reqFooterData(obj)
            this.componentId = this.newArr[0].componentId
            this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
            this.list = res.data
            this.getActivity()
        },
        methods:{
            //初始化弹框
            getActivity(){
                let content =this.newArr[0].componentContents
                if(content.length==0){
                    content.push({
                        componentId:this.componentId,
                        content:'',
                        type:4,
                        sortOrder:0,
                        contentStatus:0,
                        picture:' ',
                        title:' '
                    })
                }else{
                    let contentArr
                    contentArr =JSON.parse(content[0].content)
                    this.bannerConainer = contentArr.QRcodeS
                    this.form= contentArr.articleManagement
                }
            },
            handleClike(index){
                this.num = index
            },
            //上传二维码
            handleAvatarSuccess(res,file){
                this.bannerConainer[this.num].imgUrl = res.data.domain + res.data.filePath;
            },
            // 添加二维码
            addBanner(){
                if(this.bannerConainer.length>=2){
                    this.$message({
                        type:'warning',
                        message:'最多只能添加两个'
                    })
                   return false
                }else{
                    this.bannerConainer.push({ imgUrl:'',  imgLink:''})
                }
            },

            //添加相关下载
            addrelated(){
                if(this.form.relatedDownload.length>=3){
                    this.$message({
                        type:'warning',
                        message:'最多只能添加两个'
                    })
                    return false
                }else {
                    this.form.relatedDownload.push({ download:'',relatedLink:''})
                }
            },
            //删除
            delehandele(){
                const componentId = this.newArr[0].componentId
                this.$confirm('此结构被删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.isshow = false
                    this.$emit('delete',componentId)
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

            //确认
            async confirm() {
                let contentId
                if(this.newArr[0].componentContents.length>0){
                    contentId =this.newArr[0].componentContents[0].contentId
                }else{
                    contentId = null
                }
                const footeractivity = {
                    QRcodeS:this.bannerConainer,
                    articleManagement:this.form
                }
                const obj={
                    contentId:contentId,
                    componentId:this.componentId,
                    content:JSON.stringify(footeractivity),
                    type:4,
                    sortOrder:0,
                    contentStatus:0,
                    picture:' ',
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
                this.purchasedialogVisible = false
            },
            //编辑
            footerEdit(){
                this.purchasedialogVisible = true
            },
        }
    }
</script>

<style lang="scss" scoped>
    .footerEdit{
        .information{
            text-align: left;
            span{
                padding-left: 18px;
                font-size:14px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(51,51,51,1);
                border-left: 4px solid rgba(84, 148, 246, 1);
            }
        }
    }
    .bgk{
        display: inline-block;
        margin-top: 10px;
    }
    .bannerConten{
        .bannerList{
            .label{
                margin-right: 10px;
                font-size: 14px;
            }
            .undataImg{
                margin:20px;
                display: flex;
                margin-left: 50px;
                img{
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
        .modifyList{
            margin-left: 50px;
            text-align: left;
            span{
                margin-right: 15px;
            }
        }
    }
    .list2{
        float :left
    }

    .indexFoot-logo{
        float: right;
        margin-left:55px
    }

        img{
            width:112px;
            margin-bottom:12px;
        }
        p{
            text-align: center;
            font-size:12px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(102,102,102,1);
        }

    .list{
        padding: 30px 0;
        border-bottom: 1px solid #EAEBED;
        width: 1200px;
        margin: 0 auto;
        box-sizing border-box
        .item:not(:first-of-type) .label{
            margin-left:51px
        }
    }
        .item{
            margin-left: 51px;
            float:left;
            .label{
                margin-right: 5px;
                display: inline-block;
                width :38px;
                height: 42px;
                background: url("~@/common/images/homeEitd/frame.png") no-repeat;
                background-size: 100% 100%;
                line-height: 42px;
                font-size:20px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                color:rgba(255,79,124,1);
                text-align:center;
            }
            .word{
                width:160px;
                height:18px;
                font-size:18px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                color:rgba(102,102,102,1);
                line-height:42px
            }
        }

    .indexFoot {
        height: 390px;
        color: #999;
        background: #fff;
    }

    .indexFoot .container {
        position: relative;
        height: 390px;
        width: 1200px;
        margin: 0 auto;
    }

    .indexFoot .title {
        padding: 34px 106px 20px;
        border-bottom: 1px solid #EAEBED;
        margin-bottom: 20px
    }

    .indexFoot .title li {
        float: left;
        margin-right: 45px;
    }

    .indexFoot .title li dt {
        color :#666;
        font-size: 12px;
        line-height: 20px;
        padding-bottom: 16px;
        font-weight: bold
    }
    .indexFoot .title li dt a{
        color :#666;
        font-size: 12px;
        line-height: 20px;
        padding-bottom: 16px;
        font-weight: bold
    }

    .indexFoot .title li dd {
        font-size: 12px;
        line-height: 16px;
        padding-bottom: 10px;
    }

    .indexFoot .title li dd a {
        color: #666;
    }

    .indexFoot .last-link {
        font-size: 12px;
        text-align: center;
        margin-bottom: 12px
    }
    .indexFoot .last-link span {
        color: #999;
    }
    .indexFoot .last-text {
        color: #999;
        font-size: 12px;
        text-align: center;
    }
    .setting{
        position: absolute;
        left: 0;
        top: 0;
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
    .avatar-uploader{
        text-align: center;
        margin-top: 15px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;

        margin-top: 15px;
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
/deep/.information .el-button--primary{
    margin: 0;
    margin-left: 50px;
    margin-top: 50px;
}
</style>
