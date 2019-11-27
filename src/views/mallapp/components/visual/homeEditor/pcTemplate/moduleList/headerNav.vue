<template>
    <div v-if="newArr[0].componentStatus==0" >
        <div class="headerContainer" v-if="isshow">
            <div class="handleHeaderEidt" @mouseenter="isShowBtn=true"  @mouseleave="isShowBtn=false">
                <div class="headerNav" :style="{'background':content.color }">
                    <div class="setting" v-show="isShowBtn">
                        <span @click="handleHeaderEidt">编辑</span>
                        <span @click="delehandele">删除</span>
                    </div>
                    <div class="navList">
                        <p v-for="(item,index) in content.tableData" :key="index">
                            <img :src="item.imgUrl" alt="" width="20px" height="20px" style="border-radius: 50%"
                                 class="imgUrl">
                            <span>{{item.categoryName}}</span>
                        </p>
                    </div>
                    <p class="loogin">您好，欢迎来到{{title.title}}! 请 登录 <img src="@/common/images/homeEitd/xiaoren.png" alt="">免费注册</p>
                </div>

            </div>

            <!--弹窗-->
            <el-dialog
                    title="首页头部编辑"
                    :visible.sync="headerDialogVisible"
                    width="957px"
                    :append-to-body="true"
                    :modal-append-to-body="true"
            >
                <div class="headerEidtContainer">
                    <div class="basicInformation">
                        <p class="information">
                            <span>基础信息</span>
                        </p>
                        <el-form ref="form" :model="form" label-width="80px">
                            <div class="mallName" style="margin-left: 30px">
                                <el-form-item label="网站名称:" class="commodity">
                                    <el-input v-model="form.name"  placeholder="请输入网站名称"></el-input>
                                </el-form-item>
                                <el-form-item label="主调色:" class="commodity">
                                    <el-color-picker
                                            v-model="form.color"
                                            size="small"
                                            popper-class="选择背景色"
                                    ></el-color-picker>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>
                <div slot="footer" class="homeClassification">
                    <p class="home"><span>首页分类</span></p>
                    <div class="tableContainer">
                        <el-table
                                ref="elTable"
                                :data="tableData"
                                border
                                style="width: 100%">
                            <el-table-column
                                    align="center"
                                    label="分类名称"
                                    width="230">
                                <template slot-scope="scope">
                                    <input  placeholder="请输入分类名称"  v-model="scope.row.categoryName" class="etid">
                                    </input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    label="分类图片"
                                    width="100">
                                <template slot-scope="scope">
                                    <el-upload
                                            class="avatar-uploader"
                                            :action="action"
                                            :show-file-list="false"
                                            :on-success="handleAvatarSuccess"
                                    >
                                        <img v-if="scope.row.imgUrl" :src="scope.row.imgUrl" class="avatar"
                                             @click="handleChange(scope.$index)">
                                        <i v-else class="el-icon-plus avatar-uploader-icon" style="font-size: 15px"
                                           @click="handleChange(scope.$index)"></i>
                                    </el-upload>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    label="链接地址"
                                    width="">
                                <template slot-scope="scope">
                                    <input  placeholder="请输入分类链接" class="etid" v-model="scope.row.classifiedLink"></input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    label="排序"
                                    width="135"
                            >
                                <template slot-scope="scope">
                                    <input  class="etid" v-model="scope.row.sortOrder"></input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    label="操作"
                                    width="151"
                            >
                                <template slot-scope="scope">
                                    <p class="deleImg" @click="handleDelete(scope.$index)">
                                        <img src="@/common/images/application/dele.png" alt="" >
                                        <span class="dele">删除</span>
                                    </p>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div style="text-align: left;margin-top: 20px;padding-left: 10px;font-size: 14px;color: #606266;">
                            分类名称：<el-input v-model="input" placeholder="请输入分类名称" style="width:200px"></el-input>
                            <el-button type="primary" size="small" @click="addCategory" style="margin-left: 20px">新增首页分类</el-button>
                        </div>
                    </div>

                </div>
                <span slot="footer" class="dialog-footer" style="margin-top:10px">
                <el-button type="danger"  @click="cancelDialogVisible" size="small">取 消</el-button>
                <el-button type="primary" @click="handleConfrim" size="small">确 定</el-button>
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
            action: '',
            isShowBtn:false,
            isshow:true,
            input:'',
            headerDialogVisible:false,
            form: {
                name: '',
                color:'rgba(237,236,236,1)'
            },
            tableData:[
                {
                    categoryName:'',
                    classifiedLink:'',
                    sortOrder: '',
                    imgUrl: ''
                }
            ],
            componentId:'',
            contentId:'',
            content:'',
            title: '',
            num: ''
        }
    },
    watch:{
        headerDialogVisible(val){
            if(!val){
                this.getCategory()
            }
        }
    },
    mounted(){
        this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
        this.getCategory()
    },
    methods:{
        handleChange(index) {
            this.num = index
            console.log(this.num)
        },
        cancelDialogVisible(){
            this.headerDialogVisible = false
        },
        handleAvatarSuccess(res, file) {
            this.tableData[this.num].imgUrl = res.data.domain + res.data.filePath;
        },
        //获取分类
        getCategory() {
            this.componentId = this.newArr[0].componentId
            let content =this.newArr[0].componentContents
            if(content.length==0){
                content.push({
                    componentId:this.componentId,
                    content:{
                        color:'',
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
            this.form.name =  this.title.title
            this.form.color = this.content.color
            const tableData = this.content.tableData
            this.tableData = tableData.sort(this.compare('sortOrder'))
         },

        //排序
        compare(property){
            return function(a,b){
                let value1 = a[property];
                let value2 = b[property];
                return value1 - value2;
            }
         },

        //新增分类
        addCategory(){
            this.tableData.push({
                categoryName:this.input,
                classifiedLink:'',
                sortOrder: '',
                imgUrl: ''
            })
            this.input=''
        },

        //删除分类
        handleDelete(index){
            this.$confirm('确认删除此分类?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.tableData.splice(index,1)
                this.tableData.forEach((item,index)=>{
                    item.sortOrder = index+1
                })
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
        //删除组件
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
        handleHeaderEidt(){
            this.headerDialogVisible = true
        },
        //确认编辑
        async handleConfrim(){
            let contentId
            if(this.newArr[0].componentContents.length>0){
                contentId = this.newArr[0].componentContents[0].contentId
            }else{
                contentId = null
            }
            const categoryList={
                color:this.form.color,
                tableData:this.tableData
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
            this.headerDialogVisible = false
        },
    }
}
</script>
<style lang="scss" scoped>
.headerContainer{
    margin: 19px auto;
    width: 1594px;
    .handleHeaderEidt{
        width: 100%;
        .headerNav{
            position: relative;
            display: flex;
            justify-content: space-around;
            width: 100%;
            height: 38px;
            background:rgba(237,236,236,1);
            .setting{
                position: absolute;
                left: 0;
                top: 0;
                span{
                    cursor: pointer;
                    display: inline-block;
                    width:56px;
                    height:32px;
                    text-align: center;
                    line-height: 32px;
                    background:rgba(76,134,244,1);
                    border-radius:3px;
                    color: white;
                    &:nth-child(1){
                        margin-right: 14px;
                    }
                }
            }
            .navList{
                font-size:13px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(102,102,102,1);
                display: flex;
                height: 100%;
                line-height: 38px;
                p{
                    width: 110px;
                    display: inline-block;
                    text-align: center;
                    span{
                        padding-right: 23px;
                        border-right: 1px solid rgba(204, 204, 204, 1);
                    }
                    &:last-child{
                        span{
                            border-right:none
                        }
                    }
                }

            }
            .loogin{
                font-size:13px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(69,69,69,1);
                line-height:42px;
                img{
                    margin-left: 20px;
                    margin-right: 10px;
                }
            }
        }
    }
}
.headerEidtContainer{
    .basicInformation{
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
            width: 100px;
            height: 100px;
            line-height: 100px;
            text-align: center;
        }
        .commodity{
            .el-input__inner{
                width: 258px;
                height: 35px;
            }
            .el-input{
                width: 258px;
                height: 35px;
            }
        }
        .mallName{
            display: flex;
            justify-content: space-around;
        }
        .mainColor{
            margin-left: 57px;
        }
    }

}
.homeClassification{
    background: white;
    padding: 24px 0;
    margin-top: 18px;
    margin-bottom: 15px;
    .home{
        margin-bottom: 20px;
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
    .tableContainer{
        margin-bottom: 22px;
        .deleImg{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img{
                cursor: pointer;
            }
        }
        .etid{
            -webkit-appearance: none;
            background-color: #FFF;
            background-image: none;
            border-radius: 4px;
            border: 1px solid #DCDFE6;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            color: #606266;
            display: inline-block;
            font-size: inherit;
            height: 40px;
            line-height: 40px;
            outline: 0;
            padding: 0 15px;
            -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            width: 100%;
            border:1px solid rgba(214,222,239,1)
        }
    }
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
    width: 30px;
    height: 30px;;
    line-height: 30px;
    text-align: center;
}

.avatar {
    width: 30px;
    height: 30px;
    display: block;
}

.imgUrl {
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 7px;
}
/deep/.el-dialog__body{
    padding: 24px 0;
}
/deep/ .el-dialog__footer{
    padding: 10px 0 20px;
}
</style>
