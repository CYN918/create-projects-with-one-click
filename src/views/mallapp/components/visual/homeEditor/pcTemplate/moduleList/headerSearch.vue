<template>
    <div  v-if="newArr[0].componentStatus==0" :style="{background:form.color}">
        <div class="navContaer" v-if="isshow">
            <div @mouseenter="isShowBtn=true"  @mouseleave="isShowBtn=false">
                <div class="searchContainer">
                    <div class="logo">
                        <img :src=form.imgUrl alt="" class="logoImg" >
                        <span>{{form.name}}</span>
                    </div>
                    <div class="searchConten">
                        <div class="search">
                            <input type="text" placeholder="请输入您想搜索的方案或者商品名称">
                            <div>
                                <i class="el-icon-search"></i>
                                <span>搜索</span>
                            </div>
                        </div>
                        <div class="productList">
                            <ul class="productItem">
                                <li v-for="(item,index) in tableData" :key="index">
                                    <a :href=item.classifiedLink>
                                        <span>
                                            {{item.categoryName}}
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="telephoneContainer" v-if="form.telephone!==''">
                        <div class="telephoneImg">
                            <img src="@/common/images/homeEitd/phone.png" alt="">
                            <img src="@/common/images/homeEitd/fuwu.png" alt="">
                        </div>
                        <span class="phone">{{form.telephone}}</span>
                    </div>
                </div>
                <div style="width: 1200px; margin: 0 auto;">
                    <ul class="list clearfix">
                        <li class="_item">全部分类</li>
                        <li class="_items" v-if="form.jdProduct">京东商品</li>
                        <li class="_items" v-if="form.neteaseProduct">苏宁商品</li>
                        <li class="_items" v-for="item in sourceList">
                            {{item.sourceName}}
                        </li>
                    </ul>
                </div>
                <div class="setting" v-show="isShowBtn">
                    <span @click="handleHeaderEidt">编辑</span>
                    <span @click="delehandele">删除</span>
                </div>
            </div>

            <!--弹窗-->
            <el-dialog
                    title="首页头部编辑"
                    :visible.sync="headerDialogVisible"
                    width="957px"
                    :modal-append-to-body="true"
                    :append-to-body="true"
            >
                <div class="headerEidtContainer">
                    <div class="basicInformation">
                        <p class="information">
                            <span>基础信息</span>
                        </p>
                        <el-form ref="form" :model="form" label-width="80px">
                            <div class="mallName">
                                <el-form-item label="商品名称:" class="commodity">
                                    <el-input v-model="form.name"  placeholder="请输入分类名称"></el-input>
                                </el-form-item>
                                <el-form-item label="服务热线:"  class="commodity" placeholder="请输入热线电话">
                                    <el-input v-model="form.telephone"></el-input>
                                </el-form-item>
                            </div>
                            <div class="mainColor">
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="主调色:" class="commodity">
                                            <el-color-picker
                                                    v-model="form.color"
                                                    size="small"
                                                    popper-class="选择背景色"
                                            ></el-color-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="京东商品">
                                            <el-switch v-model="form.jdProduct"></el-switch>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="苏宁商品">
                                            <el-switch v-model="form.neteaseProduct"></el-switch>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-form-item class="upload-img-form" label="商城logo:">
                                     <el-upload
                                        accept=".jpg,.png,.gif,.JPG,.JPEG,.PBG,.GIF,"
                                        class="avatar-uploader"
                                        :action="action"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                >
                                    <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar"  prop="file">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
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
                                    <input  class="etid" v-model="scope.row.sort"></input>
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
                    <div class="line"></div>
                    <div style="padding-top: 20px;">
                        <p class="home"><span>来源分类</span></p>
                        <div class="tableContainer">
                            <el-table
                                    ref="elTable"
                                    :data="sourceList"
                                    border
                                    style="width: 100%">
                                <el-table-column
                                        align="center"
                                        label="来源名称"
                                        width="230">
                                    <template slot-scope="scope">
                                        <input placeholder="请输入来源名称" v-model="scope.row.sourceName" class="etid">
                                        </input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        align="center"
                                        label="链接地址"
                                        width="">
                                    <template slot-scope="scope">
                                        <input placeholder="请输入来源链接" class="etid"
                                               v-model="scope.row.sourceLink"></input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        align="center"
                                        label="排序"
                                        width="135"
                                >
                                    <template slot-scope="scope">
                                        <input class="etid" v-model="scope.row.sortOrder"></input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        align="center"
                                        label="操作"
                                        width="151"
                                >
                                    <template slot-scope="scope">
                                        <p class="deleImg" @click="handleSourceDelete(scope.$index)">
                                            <img src="@/common/images/application/dele.png" alt="">
                                            <span class="dele">删除</span>
                                        </p>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div style="text-align: left;margin-top: 20px;padding-left: 10px;font-size: 14px;color: #606266;">
                                分类名称：
                                <el-input v-model="sourceName" placeholder="请输入分类名称" style="width:200px"></el-input>
                                <el-button type="primary" size="small" @click="addSource" style="margin-left: 20px">
                                    新增来源分类
                                </el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer" style="margin-top:10px">
                <el-button type="danger"  @click="cancelVisible" size="small">取 消</el-button>
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
                title:'',
                action:'',
                isshow:true,
                isShowBtn:false,
                component:[],
                input:'',
                headerDialogVisible:false,
                form: {
                    jdProduct: false,
                    neteaseProduct: false,
                    name: '',
                    color:'rgba(237,236,236,1)',
                    telephone:'',
                    imgUrl:""
                },
                tableData:[
                    {
                        categoryName:'',
                        classifiedLink:'',
                        sort:''
                    }
                ],
                sourceList: [
                    {
                        sourceName: '',
                        sourceLink: '',
                        sortOrder: '',
                    }
                ],
                sourceName: ''
            }
        },
        watch:{
            headerDialogVisible(val){
                if(!val){
                    this.getCategory()
                }
            }
        },
        created(){
            console.log(this.sourceList)
            this.getCategory()
            this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
        },
        methods:{
            //添加来源分类
            addSource() {
                this.sourceList.push({
                    sourceName: this.sourceName,
                    sourceLink: '',
                    sortOrder: '',
                })
                this.sourceName = ''
            },
            //删除来源分类
            handleSourceDelete(index) {
                this.$confirm('确认删除此分类?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.sourceList.splice(index, 1)
                    this.sourceList.forEach((item, index) => {
                        item.sortOrder = index + 1
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
            cancelVisible(){
                this.headerDialogVisible = false
            },

            //获取分类
            getCategory() {
                this.componentId = this.newArr[0].componentId
                let content =this.newArr[0].componentContents
                if(content.length==0){
                    content.push({
                        componentId:this.componentId,
                        content:'',
                        type:4,
                        sortOrder:0,
                        contentStatus:0,
                        picture:'1 ',
                        title: '  ',
                    })
                }
                this.title= content[0]
                this.form.name =  this.title.title
                this.content =JSON.parse(this.title.content)
                this.form.color = this.content.color
                this.form.imgUrl = this.content.logoImg
                this.form.jdProduct = this.content.jdProduct
                this.form.neteaseProduct = this.content.neteaseProduct
                this.form.telephone = this.content.telephone
                const tableData = this.content.tableData || []
                const sourceList = this.content.sourceList || []
                this.sourceList = sourceList.sort(this.compare('sortOrder'))
                this.tableData = tableData.sort(this.compare('sort'))
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
                    sort:''
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
                        item.sort = index+1
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
                const componentId =this.newArr[0].componentId
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
                     contentId =null
                }
                const categoryList={
                    telephone:this.form.telephone,
                    color:this.form.color,
                    logoImg:this.form.imgUrl,
                    jdProduct: this.form.jdProduct,
                    neteaseProduct: this.form.neteaseProduct,
                    tableData: this.tableData,
                    sourceList: this.sourceList
                }
                const obj={
                    contentId:contentId,
                    componentId:this.componentId,
                    content:JSON.stringify(categoryList),
                    type:4,
                    contentStatus:0,
                    picture:'1 ',
                    title:this.form.name||'',
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
            handleAvatarSuccess(res,file){
                this.form.imgUrl = res.data.domain + res.data.filePath;
            },

        }
    }
</script>
<style lang="scss" scoped>
.navContaer{
    position: relative;
    .searchContainer{
        width: 1200px;
        margin: 28px auto;
        display: flex;
        justify-content: space-between;
        .logo{
            height: 40px;
            .logoImg{
                width: 120px;
                height: 40px;
                vertical-align: middle;
            }
            span{
                font-family: MicrosoftYaHei;
                font-weight: 800;
                font-size: 27px;
                color: #ff4e7c;
                margin-left: 5px;
                vertical-align: middle;
                border-left:1px solid #999 ;
                margin-left: 20px;
                padding-left: 10px;
            }
        }
        .searchConten{
            .search{
                width: 487px;
                height: 39px;
                display: flex;
                input[type='text']{
                    width: 402px;
                    box-sizing: border-box;
                    padding-left: 20px;
                    padding-top: 7px;
                    padding-bottom: 7px;
                    background:rgba(255,255,255,1);
                    border:1px solid rgba(255,78,124,1);
                }
                input::-webkit-input-placeholder {
                    font-size:12px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(153,153,153,1);;
                }
                input:-moz-placeholder {
                    font-size:12px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(153,153,153,1);
                }
                input::-moz-placeholder {
                    font-size:12px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(153,153,153,1);
                }
                input:-ms-input-placeholder {
                    font-size:12px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(153,153,153,1);
                }
                div{
                    cursor: pointer;
                    padding-left: 18px;
                    width: 84px;
                    height: 39px;
                    background: rgba(255, 78, 124, 1);
                    font-size:17px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(254,254,254,1);
                    line-height:39px;
                }
            }
            .productList{
                width: 100%;
                overflow: hidden;
                .productItem{
                    font-size:12px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(153,153,153,1);
                    line-height:35px;
                    li{
                        float: left;
                        margin-left: 23px;
                    }
                }
            }
        }
        .telephoneContainer{
            width: 125px;
            .telephoneImg{
                width: 125px;
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
            }
            .phone{
                text-align: center;
                width: 100%;
                display: inline-block;
                font-size:17px;
                font-family:Microsoft YaHei;
                font-weight:600;
                color:rgba(255,78,124,1);
                line-height:18px;
            }
        }
    }
    .setting{
        position: absolute;
        left: 42px;
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
/deep/.el-dialog__body{
    padding: 24px 0;
}
/deep/ .el-dialog__footer{
    padding: 10px 0 20px;
}

._item {
    display: inline-block;
    font-weight: bold;
    color: #fff;
    padding: 0;
    text-align: center;
    background: #4C86F4;
    width: 200px;
    height: 40px;
    line-height: 40px;
    border-radius: 30px 0 0 0;
}

.list {
    ._items {
        cursor: pointer;
        display: inline-block;
        width: 100px;
        height: 40px;
        text-align: center;
        line-height: 40px;
    }
}

.line {
    background: #EBF4FE;
    width: 100%;
    height: 20px;
}
</style>
