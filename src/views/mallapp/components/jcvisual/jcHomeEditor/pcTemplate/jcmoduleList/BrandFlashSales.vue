<template>
		<!--品牌闪购-->
		<div v-if="newArr[0].componentStatus==0">
				<div class="prefer-area center"  v-if="isshow" :style="{background:form.bgcolor}">
						<div @mouseenter="isShowBtn=true"  @mouseleave="isShowBtn=false">
								<div class="left-more">
										<img :src=imgUrl alt="">
										<p class="setting" v-show="isShowBtn">
												<span class="edit" @click="speciaEdit">编辑</span>
												<span class="delete" @click="delehandele">删除</span>
										</p>
								</div>
								<ul class="list clearfix" v-if="activityHomepageGoodsReturns&&activityHomepageGoodsReturns.length>0">
										<li class="item" v-for="(item,index) in (activityHomepageGoodsReturns||[]).slice(0,5)" :key="index">
												<div class="image">
														<img :src=item.skuImg alt="">
												</div>
												<p class="name">{{item.goodsName}}</p>
												<p class="bottom">
														<span style="color:#989898;font-size: 12px ">闪购价:</span>
														<span class="price">￥{{item.salePrice}}</span>
														<span  class="btn-cart" >
                              <img src="@/common/images/mall/shopping_cart@2x.png" alt="">
                          </span>
												</p>
										</li>
								</ul>
						</div>

						<!--弹窗-->
						<el-dialog
								:title="`${eventName}编辑`"
								:visible.sync="dialogVisible"
								width="957px"
								:append-to-body="true"
								:modal-append-to-body = "true"
						>
								<div class="basicContainer">
										<p class="basicText">基础信息</p>
										<div class="basicInformation">
												<el-form ref="form" :model="form" label-width="80px">
														<el-row :gutter="72">
																<el-col :span="10">
																		<el-form ref="form" label-width="100px">
																				<el-form-item label="活动名称:">
																						<el-input v-model="eventName"></el-input>
																				</el-form-item>
																				<el-form-item label="活动链接:">
																						<el-input v-model="form.zoneLink"></el-input>
																				</el-form-item>
																		</el-form>
																</el-col>
																<el-col :span="10">
																		<el-form-item label="广告标语:">
																				<el-input v-model="form.advertisingSlogan"></el-input>
																		</el-form-item>
																</el-col>
																<el-col :span="10">
																		<el-form-item label="主调色:">
																				<el-color-picker
																						v-model="form.bgcolor"
																						size="small"
																						popper-class="选择背景色"
																				></el-color-picker>
																				<span class="bgk">
                                          主题色为活动界面的背景
                                         </span>
																		</el-form-item>
																</el-col>
														</el-row>
														<el-row>
																<el-col>
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
																</el-col>
														</el-row>
												</el-form>
										</div>
								</div>
								<div slot="footer" class="homeClassification">
										<p class="basicText"><span>首页分类</span></p>
										<div class="zhuanti">
												<div style="margin:20px 0">
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
								<span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confrim">确 定</el-button>
          </span>
						</el-dialog>
				</div>
		</div>
</template>
<script>
    //特惠
    import { updateComponent ,getactivityGoods} from  '@/api/mallapp/homeEditor'
    export default {
        props:['newArr','activity'],
        data(){
            return{
                advertisingSlogan:'',
                isShowBtn:false,
                isshow:true,
                tableData: '',
                activityGoods:[],
                action:'',
                dialogVisible:false,
                activityProduct:{
                    activityId:'',
                    pageIndex: 1,
                    pageSize: 10
                },
                form:{
                    zoneLink:'',
                    bgcolor:'',
                    advertisingSlogan:'',
                },
                imgUrl:'',
                eventName:'',
                activityHomepageGoodsReturns:[],
                value: '',
                componentId:'',
                contentId:''
            }
        },
        mounted(){
            this.componentId = this.newArr[0].componentId
            this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
            this.getActivity()
        },
        watch:{
            dialogVisible(val){
                if(!val){
                    this.getActivity()
                }
            },
            activity(val,oldval){
                if(val!==oldval){
                    val.forEach(item=>{
                        if(item.activityTypeNum===5){
                            this.activityProduct.activityId = item.activityId
                            this.getactivityGoods()
                        }
                    })
                }
            }
        },
        methods:{
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

            getActivity(){
                if(this.newArr&&this.newArr[0].componentContents.length>0){
                    let content =this.newArr[0].componentContents
                    if(content.length==0){
                        content.push({
                            content:JSON.stringify({
                                activityGoods:[],
                                bgcolor:'',
                                zoneLink:''
                            }),
                            type:4,
                            sortOrder:0,
                            contentStatus:0,
                            picture:' ',
                            title:' '
                        })
                    }
                    let contentArr
                    this.eventName = content[0].title
                    this.imgUrl = content[0].picture
                    contentArr =JSON.parse(content[0].content)
                    this.activityHomepageGoodsReturns = contentArr.activityGoods
                    this.form={
                        bgcolor:contentArr.bgcolor,
                        zoneLink:contentArr.zoneLink,
                        advertisingSlogan:contentArr.advertisingSlogan
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

            //确认
            async confrim(){
                let contentId
                if(this.newArr[0].componentContents.length>0){
                    contentId = this.newArr[0].componentContents[0].contentId
                }else{
                    contentId = null
                }
                const specialArea = {
                    bgcolor:this.form.bgcolor,
                    zoneLink:this.form.zoneLink,
                    advertisingSlogan:this.form.advertisingSlogan,
                    activityGoods:this.activityGoods
                }
                const obj={
                    contentId:contentId,
                    componentId:this.componentId,
                    content:JSON.stringify(specialArea),
                    type:4,
                    sortOrder:0,
                    contentStatus:0,
                    picture:this.imgUrl,
                    title:this.eventName,
                }
                const res = await updateComponent(obj)
                if(res.code === 200 ){
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
                this.dialogVisible = false
            },

            //上传图片
            handleAvatarSuccess(res,file){
                this.imgUrl = res.data.domain + res.data.filePath;
            },
            speciaEdit(){
                this.dialogVisible = true
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
		.prefer-area {
				padding-bottom: 10px;
				margin-bottom: 30px;
				background: #5172ff;
				border-top-left-radius: 8px;
				border-bottom-right-radius: 8px;
				overflow: hidden;
		}

		.prefer-area .left-more {
				position: relative;
				float: left;
				width: 200px;
				height: 275px;
				overflow: hidden;
		}

		.prefer-area .left-more img {
				width: 200px;
				height: 275px;
		}

		.prefer-area .list {
				margin-left: 200px;
		}

		.prefer-area .item {
				float: left;
				width: 200px;
				padding: 20px;
				height: 265px;
				box-sizing: border-box;
				background: #fff;
		}

		.prefer-area .item .image {
				position: relative;
				margin-bottom: 10px;
		}

		.prefer-area .item .image::after {
				display: block;
				content: '';
				width: 100%;
				padding-top: 100%;
		}

		.prefer-area .item .image img {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
		}

		.prefer-area .item .name {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-bottom: 15px;
				text-align: center;
		}

		.prefer-area .item .name:hover {
				color: #b62323;
		}

		.prefer-area .item .bottom .price {
				color: #b62323;
				font-size: 14px;
				line-height: 26px;
		}

		.prefer-area .item .bottom .btn-cart {
				float: right;
		}
		.prefer-area .item .bottom .btn-cart {
				position: relative;
				display: inline-block;
				width: 26px;
				height: 26px;
				line-height: 26px;
				background: #ed4f48;
				border-radius: 50%;
				text-align: center;
				font-size: 14px;
				color: #fff;
				img{
						position: absolute;
						left: 0;
						top: 0;
						bottom: 0;
						right: 0;
						margin: auto;
						width: 15px;
						height: 15px;
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
				padding-left: 0;
		}
		/deep/ .el-dialog__footer{
				padding: 20px 0 20px;
		}
		.basicContainer {
				.basicText {
						padding-left: 18px;
						border-left: 4px solid #5494F6;
						font-size: 14px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
						margin-bottom: 20px;
				}
				.basicInformation {
						padding-left: 22px;
						.bgk {
								margin-left: 20px;
								display: inline-block;
								font-size: 12px;
								font-family: Microsoft YaHei;
								font-weight: 400;
								color: rgba(196, 198, 204, 1);
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
		.updataImg{
				margin-left: 24px;
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
