<template>
    <div v-if="newArr.componentStatus==0">
        <div class="groupActivityWrap" v-if="isshow">
            <!--好货抢先购-->
            <div class="preemptivePurchase" @mouseenter="isShowBtn=true"  @mouseleave="isShowBtn=false">
                <div class="header" :style="{background:form.bgcolor}">
                    <span  class="shandian"></span>
                    <span>{{advertisingSlogan}}</span>
                </div>
                <div class="newActivity">
                    <img :src=imgUrl alt="" class="newActivityLeft">
                    <div class="newActivityRight">
                        <div class="phoneEnterprise" v-for="(item,index) in activityHomepageGoodsReturns" :key="index">
                            <div class="text">
                                <p>{{item.goodsTypeName}}</p>
                                <p>{{item.goodsTypeImgDesc}}</p>
                            </div>
                            <img :src=item.skuImg alt=""/>
                        </div>
                    </div>
                </div>
                <p class="setting" v-show="isShowBtn">
                    <span class="edit" @click="purchaEdti">编辑</span>
                    <span class="delete" @click="delehandele">删除</span>
                </p>
            </div>
            <!--好货抢先购弹窗-->
            <el-dialog
                    title="优惠专区编辑"
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
                                    <el-form-item label="主题色:">
                                        <el-color-picker
                                                v-model="form.bgcolor"
                                                size="small"
                                                popper-class="选择背景色"
                                        ></el-color-picker>
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
                                <!--<el-select class="inp" placeholder="请选择">-->
                                    <!--<el-option>-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                                <el-button type="primary">关联商品专题</el-button>
                            </div>
                            <div>
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
    //好货抢先购
    import { updateComponent ,getactivityGoods} from  '@/api/mallapp/homeEditor'
export default {
   props:['newArr','activity'],
    data(){
        return{
            isShowBtn:false,
            isshow:true,
            tableData: '',
            activityGoods:[],
            action:'',
            componentId:'',
            contentId:'',
            form:{
                zoneLink:'',
                bgcolor:''
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
            purchaseImg:require("@/common/images/homeEitd/zuo.png"),
        }
    },
    mounted(){
        this.componentId = this.newArr.componentId
        this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
        this.getActivity()
    },
    watch:{
        purchasedialogVisible(val){
            if(!val){
                this.getActivity()
            }
        },
        activity(val,oldval){
          if(val!==oldval){
              val.forEach(item=>{
                  if(item.activityTypeNum===9){
                      this.activityProduct.activityId = item.activityId
                      this.getactivityGoods()
                  }
              })
          }
        }
    },
    methods:{
        getActivity(){
            if(this.newArr&&this.newArr.componentContents.length>0){
                let content =this.newArr.componentContents
                if(content.length==0){
                    content.push({
                        componentId:this.componentId,
                        content:'[]',
                        type:4,
                        sortOrder:0,
                        contentStatus:0,
                        picture:'1 ',
                        title:' '
                    })
                }
                let contentArr
                this.advertisingSlogan = content[0].title
                this.imgUrl = content[0].picture
                contentArr =JSON.parse(content[0].content)
                this.activityHomepageGoodsReturns = contentArr.activityGoods.slice(0,2)
                this.form={
                    bgcolor:contentArr.bgcolor,
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
                contentId,
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
        //获取商品
        hanldeSelection(val){
            this.activityGoods = val
        },
        //编辑
        purchaEdti(){
            this.purchasedialogVisible = true
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
.groupActivityWrap{
     .preemptivePurchase,.groupBuy{
         position: relative;
         width :585px;
         .header{
             width :100%;
             height:44px;
             line-height: 44px;
             font-size :18px;
             font-family: MicrosoftYaHei-Bold;
             color :rgba(255, 255, 255, 1);
             background :linear-gradient(90deg,rgba(88,105,231,1),rgba(121,219,255,1));
             border-radius :0 30px 0 0;
             font-weight :bold;
             .shandian{
                 display: inline-block;
                 width :16px;
                 height:26px;
                 vertical-align: middle;
                 margin-left: 15px;
                 margin-right: 9px;
                 background: url("~@/common/images/homeEitd/shandian.png");
             }
         }
         .newActivity{
             display: flex;
             justify-content: space-between;
             width: 100%;
             margin-top: 7px;
             .newActivityLeft{
                 width: 288px;
                 height: 351px;
             }
             .newActivityRight{
                 width: 292px;
                 .phoneEnterprise,.computerEnterprise{
                     background: white;
                     display: flex;
                     justify-content :space-around;
                     width: 100%;
                     height :171px;
                     &:nth-child(2){
                         margin-top :9px
                     }
                     .text{
                         p{
                             text-align: center;
                             &:nth-child(1){
                                 margin-top: 28px;
                                 font-size: 18px;
                                 font-family: Microsoft YaHei;
                                 font-weight: bold;
                                 color: rgba(98,151,238,1);
                             }
                             &:nth-child(2){
                                 margin-top :15px;
                                 font-size:14px;
                                 font-family:Microsoft YaHei;
                                 font-weight:400;
                                 color:rgba(102,102,102,1);
                             }
                         }
                     }
                     img{
                         width :104px;
                         height :104px;
                         margin-top: 32px;
                     }

                 }
                 .computerEnterprise{
                     margin-top :9px;
                     .text{
                         .computer{
                             color:rgba(100, 99, 223, 1);
                         }
                     }
                     img{
                         width :163px;
                         height:109px;
                     }
                 }
             }
             .groupBuyRight{
                 .phoneEnterprise,.computerEnterprise{
                     .text{
                         .miaoshu{
                             overflow: hidden;
                             text-overflow: ellipsis;
                             white-space:nowrap;
                             margin-top: 35px;
                             display :inline-block;
                             width :118px;
                             height: 39px;
                             font-size:14px;
                             font-family :Microsoft YaHei;
                             font-weight: 400;
                             color: rgba(102,102,102,1);
                         }
                         .price{
                             margin-top :12px;
                             span{
                                 font-size:12px;
                                 font-family:Microsoft YaHei;
                                 font-weight:400;
                                 color:rgba(102,102,102,1);
                                 &:nth-child(2){
                                     color: rgba(251, 11, 0, 1);
                                     margin-right: 3px;
                                 }
                                 &:nth-child(3){
                                     text-decoration: line-through;
                                 }
                             }
                         }
                         .persona{
                             margin-top: 13px;
                             width :121px;
                             height: 26px;
                             line-height :26px;
                             display: flex;
                             .personaLeft{
                                 font-size:12px;
                                 font-family:Microsoft YaHei;
                                 font-weight:400;
                                 color:rgba(251,11,0,1);
                                 display: inline-block;
                                 width: 56px;
                                 height :26px;
                                 border: 1px solid rgba(255, 73, 73, 1);
                                 border-right: none;
                                 box-sizing :border-box;
                             }
                             .personaRight{
                                 cursor: pointer;
                                 display: inline-block;
                                 height :26px;
                                 width :64px;
                                 font-size:12px;
                                 font-family:Microsoft YaHei;
                                 font-weight:400;
                                 color:rgba(255,255,255,1);
                                 background :linear-gradient(90deg,rgba(255,73,73,1),rgba(255,149,97,1));
                             }
                             img{
                                 margin-top :35px;
                                 width :111px;
                                 height:111px;
                             }
                             .computerEnterprise{
                                 img{
                                     width :133px;
                                     height:154px;
                                     margin-top :4px;
                                 }
                             }
                         }
                     }
                 }
             }
         }
     }
     .groupBuy{
         .header{
             background: linear-gradient(90deg,#ff4949,#ff9561);
         }
     }
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
    padding: 0;
    padding-top:20px;
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
</style>
