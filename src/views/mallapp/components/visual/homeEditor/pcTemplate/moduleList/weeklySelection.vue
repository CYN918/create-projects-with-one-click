<template>
    <div v-if="newArr.componentStatus==0">
        <div  class="special-area clearfix" v-if="isshow">
            <div class="special-item" @mouseenter="isShowBtn=true"  @mouseleave="isShowBtn=false">
                <p class="sp-title">{{advertisingSlogan}} </p>
                <div class="image">
                    <img v-if="imgUrl" :src=imgUrl alt="">
                </div>
                <ul class="clearfix ulList" style="overflow: hidden">
                    <div style="width:360px;overflow: hidden;display: flex" v-if="activityHomepageGoodsReturns.length>0">
                        <li class="item" v-for="(item,index) in (activityHomepageGoodsReturns||[]).slice(0,2)" :key="index">
                            <div class="pic">
                                <img :src=item.skuImg alt="">
                            </div>
                            <p class="name">{{item.goodsName}}</p>
                            <p class="price">商城价:￥{{item.salePrice}} </p>
                        </li>
                    </div>
                </ul>
                <p class="setting" v-show="isShowBtn">
                    <span class="edit" @click="weekEdit">编辑</span>
                    <span class="delete" @click="delehandele">删除</span>
                </p>
            </div>

            <!--弹窗-->
            <el-dialog
                    title="每周精选编辑"
                    :visible.sync="purchasedialogVisible"
                    width="965px"
            >
                <div class="topCategories">
                    <div class="topCategorieOne">
                        <p class="title">商品专区 (一)</p>
                        <div class="topCategorieContainer">
                            <div class="topCategoriesLeft">
                                <div class="updataImg">
                                    <span class="zhuanqu">专区海报:</span>
                                    <div class="updata">
                                        <img v-if="imgUrl" :src=imgUrl class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        <el-upload
                                                class="avatar-uploader"
                                                :action="action"
                                                :show-file-list="false"
                                                :on-success="handleAvatarSuccess"
                                        >
                                            <el-button size="small" type="primary">点击上传</el-button>
                                        </el-upload>
                                    </div>
                                </div>
                            </div>
                            <div class="topCategoriesRight" >
                                <el-form ref="form" label-width="100px">
                                        <el-form-item label="专区主标题:">
                                            <el-input v-model="advertisingSlogan"></el-input>
                                        </el-form-item>
                                        <el-form-item label="专区链接:">
                                            <el-input v-model="form.zoneLink"></el-input>
                                        </el-form-item>
                                </el-form>
                            </div>
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="homeClassification">
                        <p class="basicText"><span>首页分类</span></p>
                        <div class="zhuanti">
                            <div style="margin: 20px 0" v-if="false">
                                <span>商品专题:</span>
                                <!--<el-select class="inp" v-model="value" placeholder="请选择">-->
                                    <!--<el-option-->

                                            <!--v-for="item in options"-->
                                            <!--:key="item.value"-->
                                            <!--:label="item.label"-->
                                            <!--:value="item.value">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                                <el-button type="primary">关联商品专题</el-button>
                            </div>
                            <div v-if="tableData&&tableData.pageList.length>0">
                                <el-table
                                        @selection-change = hanldeSelection
                                        :data="tableData.pageList"
                                        style="width: 100%"
                                        border
                                >
                                    <el-table-column
                                            type="selection"
                                            width="50">
                                    </el-table-column>
                                    <el-table-column
                                            align="center"
                                            type="index"
                                            label="编号"
                                            width="50">
                                    </el-table-column>
                                    <el-table-column
                                            align="center"
                                            prop="name"
                                            label="商品图片"
                                            width="180">
                                        <template slot-scope="scope">
                                            <img :src=scope.row.skuImg alt="" width="100px" height="100px">
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            align="center"
                                            prop="goodsName"
                                            label="商品信息">
                                    </el-table-column>
                                    <el-table-column
                                            align="center"
                                            label="价格信息">
                                        <template slot-scope="scope">
                                            <p> 原价:{{scope.row.ustomaryPrice}}</p>
                                            <p> 商城价:{{scope.row.salePrice}}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        align="center"
                                        prop="goodsNumber"
                                        label="库存">
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div style="text-align: right;margin-top: 20px" v-if="tableData&&tableData.pageList.length>0">
                                <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :page-size="tableData.page.pageSize"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="tableData.count">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="purchasedialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confrimImg">确 定</el-button>
              </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    //周周精选
    import { updateComponent ,getactivityGoods} from  '@/api/mallapp/homeEditor'
export default {
    props:['newArr','activity'],
    data(){
        return{
            activityGoods:[],
            action:'',
            componentId:'',
            contentId:'',
            isShowBtn:false,
            isshow:true,
            tableData:'',
            value: '',
            form:{
                zoneLink:'',
            },
            activityProduct:{
                activityId:'',
                pageIndex: 1,
                pageSize: 10
            },
            imgUrl:'',
            advertisingSlogan:'',
            activityHomepageGoodsReturns:[],
            purchasedialogVisible:false,
            weekImg:require("@/common/images/mall/week.png"),
            weekImgCopy:""
        }
    },
    watch: {
        purchasedialogVisible(val) {
            if (!val) {
                this.getActivity()
            }
        },
        activity(val,oldval){
            console.log(val)
            if(val!==oldval){
                val.forEach(item=>{
                    if(item.activityTypeNum===2){
                        this.activityProduct.activityId = item.activityId
                    }
                })
            }
        }
    },

    mounted() {
        this.componentId = this.newArr.componentId
        this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
        this.getActivity()
    },
    methods:{
        //弹框初始化
        getActivity(){
            let content =this.newArr.componentContents
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
            }
            if(content&&content.length>0){
                let contentArr
                this.advertisingSlogan = content[0].title
                this.imgUrl = content[0].picture
                contentArr =JSON.parse(content[0].content)
                this.activityHomepageGoodsReturns = contentArr.activityGoods
                this.form={
                    zoneLink:contentArr.zoneLink,
                }
            }
        },

        // 获取商品信息
        async getactivityGoods(){
            const res = await getactivityGoods(this.activityProduct)
            if(res.code === 200 ){
                this.tableData = res.data
            }
        },

        //获取商品
        hanldeSelection(val){
            this.activityGoods = val
        },
        //上传图片
        handleAvatarSuccess(res,file){
            this.imgUrl = res.data.domain + res.data.filePath;
        },
        //删除
        delehandele(){
            const componentId = this.newArr.componentId
            this.$confirm('此结构被删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.isshow = false
                this.$parent.$parent.$options.parent.deleteComponent(componentId)
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
        async confrimImg(){
            let contentId
            if(this.newArr.componentContents.length>0){
                contentId = this.newArr.componentContents[0].contentId
            }else{
                contentId = null
            }

          const spikeactivity={
                bgcolor:this.form.bgcolor,
                zoneLink:this.form.zoneLink,
                activityGoods:this.activityGoods
            }
            const obj={
                contentId:contentId,
                componentId:this.componentId,
                content:JSON.stringify(spikeactivity),
                type:4,
                sortOrder:0,
                contentStatus:0,
                picture:this.imgUrl,
                title:this.advertisingSlogan,
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
        weekEdit(){
            this.purchasedialogVisible = true
            if( this.activityProduct.activityId){
                this.getactivityGoods()
            }
        },

        handleSizeChange(val){
            this.activityProduct.pageSize = val
            this.getactivityGoods()
        },
        handleCurrentChange(val){
            this.activityProduct.pageIndex = val
            this.getactivityGoods()
        },
    }
}
</script>
<style lang="scss" scoped>
    .special-area {
        margin-bottom: 30px;
    }
    .special-area .special-item {
        position: relative;
        float: left;
        width: 386px;
        padding: 20px 15px;
        box-sizing: border-box;
        background: #fff;
        margin-right: 21px;
        border-radius: 8px;
    }
    .special-area .special-item:nth-child(3n) {
        margin-right: 0;
    }
    .special-area .special-item .sp-title {
        margin-bottom: 20px;
        font-size: 24px;
        color: #333;
        font-weight: 700;
    }
    .special-area .special-item .image {
        height: 183px;
        margin-bottom: 10px;
    }
    .special-area .special-item .image img {
        width: 100%;
        height: 183px;
    }
    .special-area .special-item .item {
        position: relative;
        float: left;
        width: 50%;
        margin-right: 10px;
    }
    .special-area .special-item .item:nth-child(3n) {
        margin-right: 0;
    }
    .special-area .special-item .item .pic {
        margin:0 auto 10px;
        width: 112px;
        height: 112px;
    }
    .special-area .special-item .item .pic img {
        width: 112px;
        height: 112px;
    }
    .special-area .special-item .item .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        margin-bottom: 10px;
        font-size: 12px;
    }
    .special-area .special-item .item .name:hover {
        color: #b62323;
    }
    .special-area .special-item .item .price {
        font-size: 12px;
        font-weight: 700;
        text-align: center;
        color: #b62323;
    }
    .setting{
        position: absolute;
        right: 0;
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
    /deep/.el-dialog__body{
        padding-left: 0;
    }
    /deep/ .el-dialog__footer{
        margin-top: 20px;
        padding: 10px 0 20px;
    }
    .line{
        background:#EBF4FE;
        height: 20px;
        width: 100%;
        margin-top: 20px;
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
    .homeClassification{
        padding-top: 30px;
        background: white;
        .basicText{
            text-align: left;
            padding-left: 18px;
            border-left: 4px solid #5494F6;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            margin-bottom: 20px;
        }
        .zhuanti{
            text-align: left;
            margin-left: 21px;
        }
        .inp{
            margin: 0 20px;
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
    .ulList{
        display: flex;
        justify-content: space-between;
        li{
            width: 48%;
        }
    }
</style>
