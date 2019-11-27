<template>
    <div v-if="newArr[0].componentStatus==0">
        <div class="productContainer center" @mouseenter="isShowBtn=true"  @mouseleave="isShowBtn=false">
            <div class="productListLeft">
                <div class="productListLeft-T">
                    <!--专区1-->
                    <p class="setting" v-show="isShowBtn">
                        <span class="edit" @click="productEdit">编辑</span>
                        <span class="delete" @click="delehandele">删除</span>
                    </p>
                    <div class="dianqi">
                        <img :src=topCategories[0].imgUrl alt="" class="jydq">
                    </div>
                    <!--专区2-->
                    <div class="dianqi">
                        <img :src=topCategories[1].imgUrl alt="" class="sjsm">
                    </div>
                </div>
                <div class="productListLeft-B">
                    <!--专区4-->
                    <div class="dianqi">
                        <img :src=topCategories[2].imgUrl alt="" class="xmfs">
                    </div>
                    <!--专区5-->
                    <div class="dianqi">
                        <img :src=topCategories[3].imgUrl alt="" class=gthz>
                    </div>
                </div>
            </div>
            <div class="productListRight">
                <!--专区3-->
                <div class="dianqi">
                    <img :src=topCategories[4].imgUrl alt="" class="pjxb">
                </div>
                <!--专区6-->
                <div class="dianqi">
                    <img :src=topCategories[5].imgUrl alt="" class="bgyp">
                </div>
            </div>
            <!--弹窗-->
            <el-dialog
                    title="热门分类编辑"
                    :visible.sync="dialogVisible"
                    :append-to-body="true"
                    :modal-append-to-body="true"
                    width="965px"
            >
                <div class="topCategories" v-if="topCategories.length>0">
                    <div class="topCategorieOne" v-for="(item,index) in topCategories" :key="index">
                        <p class="title">商品专区 (一)</p>
                        <div class="topCategorieContainer">
                            <div class="topCategoriesLeft">
                                <div class="updataImg">
                                    <span class="zhuanqu">专区海报:</span>
                                    <div class="updata">
                                        <img v-if="item.imgUrl" :src=item.imgUrl class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        <el-upload
                                                class="avatar-uploader"
                                                :action="action"
                                                :show-file-list="false"
                                                :on-success="handleAvatarSuccess"
                                        >
                                            <el-button size="small" type="primary" @click="handleClike(index)">点击上传</el-button>
                                        </el-upload>
                                    </div>
                                </div>

                            </div>
                            <div class="topCategoriesRight" >
                                <el-form ref="form" label-width="100px">
                                    <el-form-item label="文本链接:">
                                        <el-input v-model="item.imgLink"  placeholder="请输入链接"></el-input>
                                    </el-form-item>
                                    <!--<el-form-item label="专区主标题:">-->
                                        <!--<el-input></el-input>-->
                                    <!--</el-form-item>-->
                                    <!--<el-form-item label="专区副标题:">-->
                                        <!--<el-input></el-input>-->
                                    <!--</el-form-item>-->
                                    <!--<el-form-item label="关联专区">-->
                                        <!--<el-select  placeholder="请选择类型" v-model="form">-->
                                            <!--<el-option label="区域一" value="shanghai"></el-option>-->
                                            <!--<el-option label="区域二" value="beijing"></el-option>-->
                                        <!--</el-select>-->
                                    <!--</el-form-item>-->
                                </el-form>
                            </div>
                        </div>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
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
            action:'',
            isShowBtn:false,
            form:'',
            dialogVisible:false,
            topCategories:[
                { imgUrl:'',  imgLink:''},
                { imgUrl:'',  imgLink:''},
                { imgUrl:'',  imgLink:''},
                { imgUrl:'',  imgLink:''},
                { imgUrl:'',  imgLink:''},
                { imgUrl:'',  imgLink:''},
            ],
            zoneOneImg:require('@/common/images/homeEitd/jydq.png'),
            zoneTwoImg:require('@/common/images/homeEitd/sjsm.png'),
            zoneThreeImg:require('@/common/images/homeEitd/xmfs.png'),
            zoneForeImg:require('@/common/images/homeEitd/gthz.png'),
            zoneFireImg:require('@/common/images/homeEitd/pjxb.png'),
            zoneSixImg:require('@/common/images/homeEitd/bgyp.png'),
            num:''
        }
    },
    created(){
        this.componentId = this.newArr[0].componentId
        this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
        this.getCategory()
    },
    methods:{
        cancel(){
            this.dialogVisible = false
            this.getCategory()
        },

        getCategory(){
            let content =this.newArr[0].componentContents
            if(content.length==0){
                content.push({
                    componentId:this.componentId,
                    content:{
                        tableData:[]
                    },
                    type:4,
                    sortOrder:0,
                    contentStatus:0,
                    picture:'1 ',
                    title: '  ',
                })
            }
            this.title= content[0]
            this.content =JSON.parse(this.title.content)
            this.topCategories = this.content.tableData
        },

        handleClike(index){
            this.num = index
        },
        handleAvatarSuccess(res,file){
            this.topCategories[this.num].imgUrl = res.data.domain + res.data.filePath;
        },

        productEdit(){
          this.dialogVisible = true
        },

        //确认图片
        async confrimImg(){
            let contentId
            if(this.newArr[0].componentContents.length>0){
                contentId = this.newArr[0].componentContents[0].contentId
            }else{
                contentId =null
            }
            this.dialogVisible = false
            const categoryList = {
                tableData:this.topCategories
            }
            const obj={
                contentId:contentId,
                componentId:this.componentId,
                content:JSON.stringify(categoryList),
                type:4,
                contentStatus:0,
                picture:'1 ',
                title:this.form.name,
                sortOrder:0,
            }
            const res = await  updateComponent(obj)
            if(res.code === 200){
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
    }
}
</script>
<style lang="scss" scoped>
.productContainer{
    width: 100%;
    display: flex;
    .productListLeft{
        display: flex;
        width: 807px;
        margin-right: 11px;
        flex-direction: column;
        .productListLeft-T{
            position: relative;
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
        }
        .productListLeft-B{
            display: flex;
            justify-content: space-between;
        }
    }
    .productListRight{
        display: flex;
        flex-direction: column;
        .dianqi{
            display: flex;
            justify-content: space-between;
            &:nth-child(1){
                margin-bottom: 12px;
            }
        }
    }
    .jydq{
        width: 540px;
        height: 372px;
    }
    .sjsm{
        width: 254px;
        height: 372px;
    }
    .xmfs{
        width: 397px;
        height: 220px;
    }
    .gthz{
        width: 397px;
        height: 220px;
    }
    .pjxb{
        width: 382px;
        height: 226px;
    }
    .bgyp{
        width: 382px;
        height: 366px;
    }
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
.center{
    width: 1200px;
    margin: 24px auto;
    .area{
        display: flex;
        justify-content: center;
    }
}
/deep/.el-dialog__body{
    padding: 0;
    padding-top: 20px;
}
.topCategories{
    width: 100%;
    .topCategorieOne{
        margin-top: 30px;
        width: 100%;
        .title{
            font-size:14px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
            border-left: 4px solid rgba(84,148,246,1);;
            padding-left: 18px;
            margin-bottom: 20px;
        }
        .topCategorieContainer{
            display: flex;
            width: 100%;
            .topCategoriesLeft{
                width: 50%;
                margin-left: 55px;
                .updataImg{
                    display: flex;
                    .zhuanqu{
                        margin-top: 20px;
                        vertical-align: top;
                        margin-right: 15px;
                    }
                    .updata{
                        p{
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            .chongxin{
                                margin:14px 0 8px 0;
                                cursor: pointer;
                                text-align: center;
                                line-height: 33px;
                                width:70px;
                                height:33px;
                                border:1px solid rgba(76,134,244,1);
                                border-radius:2px;
                                font-size:13px;
                                font-family:Microsoft YaHei;
                                font-weight:400;
                                color:rgba(76,134,244,1)
                            }
                            .cicun{
                                font-size:12px;
                                font-family:Microsoft YaHei;
                                font-weight:400;
                                color:rgba(196,198,204,1);
                            }
                        }

                    }
                }
            }
            .topCategoriesRight{
                width: 45%;
                margin-right: 54px;
            }
        }
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
</style>
