<template>
    <div class="articleClassification">
        <div class="header">
            <p class="tiaojian">
                <span class="serchText">
                    搜索条件
                </span>
            </p>
            <div class="search">
                <p class="fenlei inp" >
                    <span> 分类父级 : </span>
                    <el-select v-model="feilei" placeholder="请选择" @change="handeleChange">
                        <el-option label="全部" value=""></el-option>
                        <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.categoryName"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <!--<input type="text" placeholder="" v-model="fenleiId">-->
                </p>
                <p class="articleStatus">
                    <span> 文章状态: </span>
                    <el-select v-model="zhuangtai" placeholder="请选择文章分类状态" @change="handeleSelecet">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="正常"   value="0"> </el-option>
                        <el-option  label="禁用" value="1"> </el-option>
                    </el-select>
                </p>
                <p class="mingchen inp">
                    <span> 分类名称 : </span>
                    <input type="text" placeholder="请输入分类名称"  v-model="classCategoryName">
                </p>
                <!--<p class="xiangmu inp">-->
                    <!--<span> 项目: </span>-->
                    <!--<input type="text" placeholder="请选择项目"  v-model="project">-->
                <!--</p>-->
                <span class="searchConten" @click="searchList">查询</span>
            </div>
        </div>
        <div class="tabelContainer">
            <div class="tabel">
                <p class="etid">
                    <span class="add" @click="addArticle">新增</span>
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
                            label="分类ID"
                            width="">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="categoryName"
                            label="分类名称"
                            width="">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="parentName"
                            label="分类类型">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="status"
                        label="分类状态">
                        <!--<span>{{statusText}}</span>-->
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="showInNav"
                            label="导航栏是否显示">
                        <!--<span>{{showInNav}}</span>-->
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="sortOrder"
                            label="分类排序">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="createTime"
                            label="创建时间">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop=""
                            label="操作">
                        <template slot-scope="scope">
                            <div class="set">
                                <p v-if="scope.row.status!=='禁用'">
                                    <img src="@/common/images/application/etdit.png" alt="" @click="handeleEdit(scope.row)">
                                    <span class="etid">编辑</span>
                                </p>
                                <p v-if="scope.row.status!=='禁用'">
                                    <img src="@/common/images/application/dele.png" alt=""  @click="handeleDele(scope.row)">
                                    <span class="dele">删除</span>
                                </p>
                                <p >
                                    <img src="@/common/images/application/chakan.png" alt="" @click="handleDetails(scope.row)">
                                    <span class="chakan">详情</span>
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
            title="新增分类"
            :visible.sync="dialogVisible"
            width="30%"
            >
        <div class="addClassification">
            <el-form ref="form" :model="form" label-width="100px" >
                <el-form-item label="分类名称:">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="分级父类:">
                    <el-select class="width13" v-model="form.selType" placeholder="全部状态" @change="addHandleChange">
                        <el-option
                                v-for="item in formList"
                                :key="item.id"
                                :label="item.categoryName"
                                :value="item.id">
                        </el-option>
                        <!--<el-option :label=item.categoryName :value=index v-for="(item,index) in formList" :key="index"></el-option>-->
                    </el-select>
                </el-form-item>
                <el-form-item label="导航显示:">
                    <el-radio-group v-model="form.showInNav">
                        <el-radio label="显示" value="0"></el-radio>
                        <el-radio label="不显示" value="1"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="form.sortOrder"></el-input>
                </el-form-item>
                <el-form-item class="upload-img-form" label="LOGO">
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
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onSubmit">确 定</el-button>
  </span>
        </el-dialog>
        <!--编辑弹框-->
        <el-dialog
            title="编辑分类"
            :visible.sync="editBulletBox"
            width="30%"
        >
            <div class="addClassification">
                <el-form ref="form" :model="form1" label-width="100px" >
                    <el-form-item label="分类名称:">
                        <el-input v-model="form1.categoryName"></el-input>
                    </el-form-item>
                    <el-form-item label="分级父类:">
                        <el-select class="width13" v-model="form1.parentName" placeholder="全部状态" @change="handeleChangeEdit">
                            <el-option
                                    v-for="(item,index) in formList"
                                    :key="index"
                                    :label="item.categoryName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="导航显示:">
                        <el-radio-group v-model="form1.showInNav" @change="handleShowNav">
                            <el-radio label="显示" value="0"></el-radio>
                            <el-radio label="不显示" value="1"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="排序">
                        <el-input v-model="form1.sortOrder"></el-input>
                    </el-form-item>
                    <el-form-item class="upload-img-form" label="LOGO">
                     <el-upload
                        class="avatar-uploader"
                        :action="actionImg"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess1"
                    >
                        <img v-if="form1.imageUrl" :src="form1.imageUrl" class="avatar"  prop="file">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="editBulletBox = false">取 消</el-button>
    <el-button type="primary" @click="onSubmitEdit">确 定</el-button>
  </span>
        </el-dialog>
        <!--详情弹框-->
        <el-dialog
                title="详细信息"
                :visible.sync="isShowInformation"
                width="60%"
        >
            <div class="isShowInformation">
                <p>
                    <span>分类名称:</span>
                    <span>
                      {{this.userInformation.categoryName}}
                    </span>
                </p>
                <p>
                    <span>分级父类:</span>
                    <span>
                        {{this.userInformation.title}}
                    </span>
                </p>
                <p>
                    <span>创建事件:</span>
                    <span>
                        {{this.userInformation.createTime}}
                    </span>
                </p>
                <p>
                    <span>导航显示:</span>
                    <span>
                        {{informationShowInNav}}
                    </span>
                </p>
                <p>
                    <span>排序:</span>
                    <span >
                        {{this.userInformation.sortOrder}}
                    </span>
                </p>
                <p>
                    <span class="sortOrder" style="color: #606266;vertical-align: top">LOGO:</span>
                    <span>
                        <img :src=this.userInformation.logo alt="">
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
import { articleList ,addArticleList,queryArticle,deleteList,requestId,updateArticleList,requestName,viewClassification} from '@/api/contentManagement/index'
export default {
    data(){
        return{
            zhuangtai:'',
            articleStatus:'',  //排序状态
            deleteId:'',
            actionImg:'',
            action:'',
            feilei:'',
            options:[],
            editBulletBox:false,  //编辑弹框
            fenleiId:'',  //分类id
            classCategoryName:'',// 分类名称
            project:'', // 项目
            dialogVisible: false,  //新增弹框
            articleList:'',
            form:{              //新增弹框表单
                name:'',
                parentName:'',
                showInNav:0,
                sortOrder:'',
                imageUrl:''
            },
            form1:{              //编辑弹框表单
                categoryName:'',
                parentName:'',
                showInNav:0,
                sortOrder:'',
                imageUrl:''
            },
            currentPage4: 4,
            tableData:'',//文章列表
            pageNum:1, //分页
            statusText:'', //状态
            showInNav:'',   //导航栏状态
            formList:'' ,  //新增的父元素
            editList:'', //当前编辑的列表
            addID:''  ,   //添加下拉框当前的下标
            EditID:''  ,
            userInformation:'',//根据id查询得用户信息
            isShowInformation:false,
            informationShowInNav:''  //不显示
        }
    },
    methods: {
        //获取状态
        handeleSelecet(val){
          this.articleStatus = val
        },
        handleShowNav(val){
           console.log(val)
        },
        //查看详情
        async handleDetails(data){
            this.isShowInformation = true
            const res = await viewClassification(data.id)
            if(res.code === 200 ){
                this.userInformation = res.data
                if(this.userInformation.showInNav===1){
                    console.log(this.userInformation)
                    this.informationShowInNav='显示'
                }else{
                    this.informationShowInNav='不显示'
                }
            }
        },
        //新增下拉
        addHandleChange(val){
            this.addID = val
        },
        //编辑下拉
        handeleChangeEdit(val){
            this.EditID = val
        },
        //获取分类id查询
        handeleChange(data){
           this.fenleiId =data

        },
        async searchList(){
            //根据名字和来id查询，状态来查询
                const obj={
                    categoryName: this.classCategoryName,
                    parentId: this.fenleiId,
                    status:this.articleStatus
                }
                this.requireList(obj)
        },
        //新增弹框
         async addArticle(){
            this.dialogVisible=true
            const res = await articleList()
             if(res.code === 200 ){
                this.formList = res.data
             }
        },
        //成功之后
        handleAvatarSuccess(res,file){
            this.form.imageUrl = res.data.domain + res.data.filePath;;
        },
        //确认新增分类
        async onSubmit() {
             let { name ,sortOrder,showInNav,selType,imageUrl}  = this.form
            if(name===''){
                return this.$message('请填写分类名称')
            }
            if(showInNav==="不显示"){
                showInNav=0
            }else{
                showInNav=1
            }
            const obj = {
                categoryName:name,
                logo:imageUrl,
                showInNav:showInNav ,
                parentId: this.addID,
                sortOrder: JSON.parse(sortOrder)
            }
            const res = await addArticleList(obj)
            if(res.code === 200){
                const obj = {
                    pageNum:1,
                    pageSize:10,
                }
                this.requireList(obj)
                this.dialogVisible=false
                this.form={     //清空表单
                    name:'',
                    selType:'',
                    status:0,
                    sortOrder:''
                },
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
        },
        //分页
        handleSizeChange(val) {
            const obj={
                pageNum:1,
                pageSize:val,
            }
            this.requireList(obj)
        },
        handleCurrentChange(val) {
            const obj={
                pageNum:val,
                pageSize:10,
            }
           this.requireList(obj)
        },
        // 公共
        async requireList(obj){
            const res = await queryArticle(obj)
            if(res.code === 200 ){
                this.tableData = res.data
                this.tableData.list.map((item,index)=>{
                    console.log(item.showInNav)
                    if(item.status===0){
                        this.tableData.list[index].status='正常'
                    }else{
                        this.tableData.list[index].status='禁用'
                    }
                    if(item.showInNav===0){
                        this.tableData.list[index].showInNav='不显示'
                    }
                    if(item.showInNav===1){
                        this.tableData.list[index].showInNav='显示'
                    }
                })
            }
        },
        //删除分类
        async handeleDele(data){
            console.log(data)
            const id = data.id
            this.$confirm('你确认删除,?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const res = await deleteList(id)
                if(res.code===200){
                    this.requireList()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.deleteId = id
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
        //编辑分类
        async handeleEdit(data){
            this.editBulletBox = true
            this.editList = data
            this.form1 = JSON.parse(JSON.stringify(data))
            const res = await articleList()
            if(res.code === 200 ){
                this.formList = res.data
            }
        },
        //编辑分类提交
        async onSubmitEdit(){
            this.editBulletBox = false
            let { categoryName ,sortOrder,showInNav,imageUrl}  = this.form1
            if(showInNav==="不显示"){
                showInNav=0
            }else{
                showInNav=1
            }
            const obj = {
                categoryName:categoryName,
                logo:imageUrl,
                showInNav:showInNav ,
                sortOrder:sortOrder,
                id:this.editList.id,
                parentId:this.EditID,
            }
           const res = await updateArticleList(obj)
            if(res.code === 200) {
            const obj = {
                pageNum:1,
                pageSize:10,
             }
              this.requireList(obj)
            }
        },
        //编辑弹框上传图片
        handleAvatarSuccess1(res,file){
            this.form1.imageUrl = res.data.domain + res.data.filePath;
        }
    },
    async created(){
        const obj = {
            pageNum:1,
            pageSize:10,
        }
        this.requireList(obj)    //文章分页
        const res = await articleList()
        if(res.code === 200 ){
            this.options=res.data
        }
        this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
        this.actionImg = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
    }
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
        height: 155px;;
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
            margin-left: 50px;
            margin-top: 25px;
            display: flex;
            font-size:14px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(96,98,102,1);
            .articleStatus{
                margin: 0 50px;
            }
            .inp{
                box-sizing: border-box;
                input[type='text']{
                    padding: 9px 0 9px 15px;
                    width: 198px;
                    height: 40px;
                    border:1px solid rgba(220,223,230,1);
                    border-radius:4px;
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
    .block{
        text-align: center;
        padding: 30px 0;
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
    .isShowInformation{
        p{
            margin: 20px 0;
            span{
                &:nth-child(1){
                    font-weight: 600;
                }
            }
            .sortOrder{
                vertical-align: top;
                color:black;
            }
            img{
                width: 100px;
                height: 100px;
            }
        }
    }
}
</style>
