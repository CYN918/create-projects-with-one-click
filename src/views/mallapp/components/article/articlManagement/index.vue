<template>
    <div class="articleClassification">
        <div class="header">
            <p class="tiaojian">
                <span class="serchText">
                    搜索条件
                </span>
            </p>
            <div class="search">
                    <p class="mingchen inp">
                        <span> 文章分类 : </span>
                        <el-select v-model="fenlei" placeholder="请选择文章分类">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="item1 in options"
                                :key="item1.id"
                                :label="item1.categoryName"
                                :value="item1.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="xiangmu inp">
                        <span> 文章状态: </span>
                        <el-select v-model="zhuangtai" placeholder="请选择文章状态" @change="handeleSelecet">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="有效"   value="0"> </el-option>
                            <el-option  label="删除" value="1"> </el-option>
                        </el-select>
                    </p>
                  <div class="searchBtn">
                      <p class="biaoti inp">
                          <span> 文章标题: </span>
                          <el-input v-model="title" placeholder="请选择文章标题"></el-input>
                      </p>
                      <span class="searchConten" @click="queryArticle">查询</span>
                  </div>
            </div>
        </div>
        <div class="tabelContainer">
            <div class="tabel">
                <p class="etid">
                    <span class="add" @click="add">新增</span>
                </p>
                <el-table
                        :data="tableData.list"
                        border
                        style="width: 100%">
                    <el-table-column
                        align="center"
                        type="index"
                        label="序号"
                        width="50">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="id"
                            label="文章ID"
                            width="">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="title"
                            label="文章标题"
                            width="">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="articleCategory.categoryName"
                            label="文章分类">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="content"
                            label="文章内容">
                        <template slot-scope="scope">
                            <div v-html="scope.row.content" class="content">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="status"
                            label="文章状态">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="linkUrl"
                            label="文章链接">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="createTime"
                            label="创建时间">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <div class="set">
                                <p>
                                    <img src="@/common/images/application/etdit.png" alt="" @click="handeleEdit(scope.row)">
                                    <span class="etid">编辑</span>
                                </p>
                                <p>
                                    <img src="@/common/images/application/dele.png" alt="" @click="handeleDele(scope.row)">
                                    <span class="dele">删除</span>
                                </p>
                                <p>
                                    <img src="@/common/images/application/chakan.png" alt=""  @click="handleDetails(scope.row)">
                                    <span class="details">详情</span>
                                </p>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size=tableData.pageSize
                    layout="total, sizes, prev, pager, next, jumper"
                    :total=tableData.total>
            </el-pagination>
        </div>
        <!--新增弹框-->
        <el-dialog
                :title=articlType
                :visible.sync="dialogVisible"
                width="60%"
        >
            <div class="addClassification">
                <el-form ref="form" :model="form" label-width="180px">
                    <el-form-item label="文章分类">
                        <el-select v-model="form.categoryId" placeholder="全部">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="item1 in classificationId"
                                :key="item1.id"
                                :label="item1.categoryName"
                                :value="item1.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="文章标题">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="前端是否展示">
                        <el-radio-group v-model="form.showWebsite">
                            <el-radio label="0" value="">显示</el-radio>
                            <el-radio label="1" value="">不显示</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="文章是否推送官网前端">
                        <el-radio-group v-model="form.pushWebsite">
                            <el-radio label="0" value="">不是</el-radio>
                            <el-radio label="1" value="">是</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="文章重要性/是否置顶">
                        <el-radio-group v-model="form.isTop">
                            <el-radio label="0" value="">不置顶</el-radio>
                            <el-radio label="1" value="">置顶</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="文章链接">
                        <el-input v-model="form.linkUrl"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="文章归属">-->
                        <!--<el-select v-model="form.region" placeholder="全部">-->
                            <!--<el-option label="区域一" value="shanghai"></el-option>-->
                            <!--<el-option label="区域二" value="beijing"></el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                    <el-form-item class="upload-img-form" label="封面图">
                        <el-upload
                            class="avatar-uploader"
                            :action="action"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                    >
                        <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar"  prop="file">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    </el-form-item>
                    <el-form-item label="文章内容">
                        <div class="edit_container">
                            <quill-editor
                                v-model="form.content"
                                ref="myQuillEditor"
                                :options="editorOption"
                            >
                            </quill-editor>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onSubmit">确 定</el-button>
  </span>
        </el-dialog>
        <!--详细信息-->
        <el-dialog
                title="详细信息"
                :visible.sync="isShowInformation"
                width="60%"
        >
            <div class="isShowInformation">
                <p>
                    <span>文章分类:</span>
                    <span>
                        {{this.userInformation.categoryName}}
                    </span>
                </p>
                <p>
                    <span>文章标题:</span>
                    <span>
                        {{articleTitle}}
                    </span>
                </p>
                <p>
                    <span>前端是否展示:</span>
                    <span>
                        {{showWebsite}}
                    </span>
                </p>
                <p>
                    <span>文章是否推送官网前端:</span>
                    <span>
                        {{pushWebsite}}
                    </span>
                </p>
                <p>
                    <span>文章重要性/是否置顶:</span>
                    <span>
                        {{isTop}}
                    </span>
                </p>
                <p>
                    <span>文章链接:</span>
                    <span>
                        {{this.userInformation.linkUrl}}
                    </span>
                </p>
                <p>
                    <span>文章内容:</span>
                    <span v-html="userInformation.content">
                        <!--{{this.userInformation.content}}-->
                    </span>
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="isShowInformation = false">取 消</el-button>
    <el-button type="primary" @click="isShowInformation=false">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>
<script>
    import { requestArticleList,articleList,addArticle,deleteaArticle,editArticle,getArticleList,IdQueryInformation} from '@/api/contentManagement/index'
    export default {
        data(){
            return{
                title:'',//文章标题
                id:'',  //文章的id
                typeof:'', // 0 新增文章  1 编辑文章
                classificationId:'',//弹框的分类
                fenlei:'',  //文章分类
                zhuangtai:'' ,//文章状态
                biaoti:'',  //标题
                currentPage4:4,
                content:'', //富文本编辑器内容，
                editorOption: {},
                options: '',  //文章分类列表
                options1:'',  //文章列表
                tableData: '',      //表格
                dialogVisible: false,  //弹窗
                form: {         //新增弹框的分类
                    imageUrl:'',
                    categoryId:'',
                    title:'',
                    showWebsite:'',
                    linkUrl:'',
                    content:'',
                    pushWebsite:'', //是否推送前端官网
                    isTop:''  //文章是否置顶
                },
                userInformation:'',//根据id查询得用户信息
                isShowInformation:false,
                isTop:'',//是否置顶
                showWebsite:"",
                pushWebsite:'',
                status:'',//查询的文章状态
                articlType:'',
                articleTitle:'',// 详情弹框的文章标题
                extractArticle:"",//获取单独的文章内容
            }
        },
        methods: {
            //查看详情
            async handleDetails(data){
                this.isShowInformation = true
                const res = await IdQueryInformation(data.id)
                if( res.code === 200){
                   this.userInformation = res.data
                    console.log(this.userInformation)
                    if(this.userInformation.isTop===1){
                        this.isTop = '置顶'
                    }else{
                        this.isTop = '不置顶'
                    }
                    if(this.userInformation.showWebsite===0){
                        this.isTop = '展示'
                    }else{
                        this.isTop = '不展示'
                    }
                    if(this.userInformation.pushWebsite===1){
                        this.pushWebsite = '是'
                    }else{
                        this.pushWebsite = '不是'
                    }
                }
            },
            //新增弹框
            add(){
                this.dialogVisible = true
                this.typeof = 0
                this.articlType = '新增文章'
            },
            //上传图片成功之后
            handleAvatarSuccess(res,file){
                this.form.imageUrl = res.data.domain + res.data.filePath;;
            },
            //0 增加文章 1编辑章
            async onSubmit() {
                this.dialogVisible = false
                const obj = {
                    id: this.id,
                    imageUrl:this.form.imageUrl,
                    categoryId:this.form.categoryId,
                    title:this.form.title,
                    showWebsite:this.form.showWebsite,
                    linkUrl:this.form.linkUrl,
                    content:this.form.content,
                    pushWebsite:this.form.pushWebsite, //是否推送前端官网
                    isTop:this.form.isTop //文章是否置顶
                }
                if(this.typeof===0){
                    const res = await addArticle(obj)
                    if(res.code === 200 ){
                        this.comomenList()
                        this.clearForm()
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                    }else{
                        this.$message({
                            type: 'info',
                            message: '添加失败!'
                        });
                    }
                }else if(this.typeof === 1){
                    const res = await  editArticle(obj)
                    if(res.code === 200 ){
                        this.comomenList()
                        this.clearForm()
                    }
                }
            },
            //清空表单
            clearForm(){
                this.form={
                    imageUrl:'',
                    categoryId:'',
                    title:'',
                    showWebsite:'',
                    linkUrl:'',
                    content:'',
                    pushWebsite:'', //是否推送前端官网
                    isTop:''  //文章是否置顶
                }
            },
            //编辑文章
            async handeleEdit(data){
                this.dialogVisible = true
                this.id = data.id
                this.typeof = 1
                this.articlType = '编辑文章'
                this.form =JSON.parse(JSON.stringify(data))
                console.log(data)
            },
            //删除文章
            handeleDele(data){
            const id = data.id
             this.$confirm('你确认删除,?', '提示', {
                 confirmButtonText: '确定',
                 cancelButtonText: '取消',
                 type: 'warning'
             }).then(async () => {
                 const res = await deleteaArticle(id)
                 if(res.code===200){
                     this.comomenList()
                     this.$message({
                         type: 'success',
                         message: '删除成功!'
                     });
                 }else{
                     this.$message({
                         type: 'info',
                         message: '删除失败'
                     });
                 }
             }).catch(() => {
                 this.$message({
                     type: 'info',
                     message: '已取消删除'
                 });
             });
        },
            //分页查询
            handleSizeChange(val) {
                const obj={
                    pageNum:1,
                    pageSize:val,
                }
                this.comomenList(obj)
            },
            handleCurrentChange(val) {
                const obj={
                    pageNum:val,
                    pageSize:10,
                }
                this.comomenList(obj)
            },
            //查询的状态
            handeleSelecet(val){
               this.status = val
            },

            //根据条件来查询
            async queryArticle(){
                const obj = {
                    title:this.title,
                    status:this.status,
                    categoryId:this.fenlei
                }
                this.comomenList(obj)
            },
            //公共
           async comomenList(obj){
                const res = await requestArticleList(obj)
                if(res.code === 200){
                    this.tableData = res.data
                    console.log(this.tableData)
                    this.tableData.list.map((item,index) =>{
                        if(item.status===0){
                            this.tableData.list[index].status='有效'
                        }
                        if(item.status===1){
                            this.tableData.list[index].status='删除'
                        }
                    })
                }
            }
        },
        async created(){
            this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";    //undata上传图片
            const obj={
                pageNum:1,
                pageSize:10
            }
            this.comomenList(obj)
            //获取文章分类列表
            const res = await articleList()
            if(res.code === 200 ){
                this.options = res.data
                this.classificationId=res.data
            }
            //获取文章列表
            const res1 = await getArticleList()
            if(res.code === 200 ){
                this.options1 = res1.data
                this.options1.map((item,index) =>{
                    if(item.status===0){
                        this.options1[index].status='有效状态'
                    }
                    if(item.status===2){
                        this.options1[index].status='删除状态'
                    }
                })
            }
        },
    }
</script>
<style lang="scss" scoped>
    .articleClassification{
        width: 1640px;
        margin-left: 20px;
        .header{
            border:1px solid rgba(214,222,239,1);
            background: white;
            width: 100%;
            padding-bottom: 48px;
            .tiaojian{
                margin-top:26px;
                .serchText{
                    padding-left: 22px;
                    border-left:4px solid rgba(76, 134, 244, 1);
                    font-size:16px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                }
            }
            .search{
                margin-top: 25px;
                font-size:14px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(96,98,102,1);
                display: flex;
                .xiangmu{
                    margin: 0 45px;
                }
                .mingchen{
                    margin-left: 50px;
                }
                .searchBtn{
                    display: flex;
                    .biaoti{
                        display: flex;
                        align-items: center;
                        span{
                            display: inline-block;
                            width: 95px;
                        }
                    }
                    .searchConten{
                        cursor: pointer;
                        margin-left: 21px;
                        width:56px;
                        height:32px;
                        line-height: 32px;
                        text-align: center;
                        display: inline-block;
                        background:rgba(76,134,244,1);
                        border-radius:3px;
                        font-size:12px;
                        font-family:Microsoft YaHei;
                        font-weight:400;
                        color:rgba(255,255,255,1);
                    }
                }
                .searchTop{
                    display: flex;
                    .inp{
                        margin-left: 55px;
                        box-sizing: border-box;
                    }
                }
                .searchBottom{
                    margin-top:20px ;
                }
            }
        }
        .tabelContainer{
            margin-top: 20px;
            background: white;
            padding-top: 1px;
            .tabel{
                width: 1597px;
                margin:21px auto;
                .etid{
                    margin-bottom: 20px;
                    .add{
                        cursor: pointer;
                        display: inline-block;
                        width:60px;
                        height:32px;
                        background:rgba(76,134,244,1);
                        font-size:12px;
                        font-family:Microsoft YaHei;
                        font-weight:400;
                        color:rgba(255,255,255,1);
                        text-align: center;
                        line-height: 32px;
                    }
                }
                .set{
                    display: flex;
                    justify-content: space-around;
                    p{
                        cursor: pointer;
                        display: flex;
                        flex-direction: column;
                        img{
                            width: 32px;
                            height: 32px;
                        }
                    }
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
            width: 100px;
            height: 100px;
            line-height: 100px;
            text-align: center;
        }
        .avatar {
            width: 100px;
            height: 100px;
            display: block;
        }
        /deep/.ql-toolbar.ql-snow + .ql-container.ql-snow{
            height: 300px;
        }
        .block{
            text-align: center;
            padding: 35px 0;
        }
        .isShowInformation{
            p{
                margin: 30px 0;
                span{
                    &:nth-child(1){
                    font-weight: 600;
                 }
                }
            }
        }
    }
.content{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    height: 200px;
}
</style>
