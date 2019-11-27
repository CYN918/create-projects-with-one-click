<comment>
		#商品专题1
</comment>
<template>
		<div v-if="newArr.componentStatus==0">
				<div class="special-area clearfix" v-show="isshow">
						<ul style="display: flex" @mouseenter="isShowBtn=true" @mouseleave="isShowBtn=false">
								<li v-for="(item,index) in HotGoodsServiceList">
										<!--左侧-->
										<div class="p-left" style="margin-right: 10px">
												<div class="p-left-top">
														<div class="purchasing-word">
																<a href="#" style="display: block">
																		<div class="background-pic" style="height: 276px;width: 198px">
																				<img
																						src="https://img10.360buyimg.com/cms/jfs/t25585/343/1000472934/14405/38c6ca35/5b850c9bN36c8e995.jpg.webp"
																						alt="" style="height: 276px;width: 198px">
																		</div>
																		<div class="mask"></div>
																</a>
																<div class="left-word">
																		<div class="purchasing-title-top">
																				<span style="display: block">
																						<div class="mainTitle">{{advertisingSlogan}}</div>
																						<div class="subheadTitle">{{item.specialDesc}}</div>
																						<p style="width: 28px;height: 3px;margin-top:18px;margin-left: 0;background-color: #fff;"></p>
																				</span>
																		</div>
																		<div class="purchasing-tab">
																				<div class="tabTitle">
																						<span>爆款直降</span>
																				</div>
																				<div class="tabTitle">
																						<span>惠普</span>
																				</div>
																				<div class="tabTitle">
																						<span>纸类专区</span>
																				</div>
																				<div class="tabTitle">
																						<span>办公工具</span>
																				</div>
																				<div class="tabTitle">
																						<span>Thinkpad</span>
																				</div>
																				<div class="tabTitle">
																						<span>办公设备</span>
																				</div>
																		</div>
																</div>
														</div>
														<div class="purchasing-activePic">
																<div class="slider-content" style="position: relative">
																		<ul style="width: 397px; position: absolute;">
																				<li class="slider-item current"
																						style="width: 397px; height: 276px; float: left;">
																						<div class="lidiv">
																								<img :src="imgUrl" alt="" class="slider-img" width="397" height="276">
																						</div>
																				</li>
																		</ul>
																</div>
														</div>
												</div>
												<div class="p-left-bottom">
														<div class="specificGoods" v-for="(item2,index2) in item.specialGoods">
																<div class="goodsPic">
																		<img height="148" width="158"
																				 :src="item2.skuImg"
																				 alt="">
																</div>
																<div class="introduction">
																		<div class="goodsName">
																				<p>{{item2.goodsName}}</p>
																		</div>
																		<div class="goodsPrice">
																				<p class="enterprise-price">
																						企业专享价
																						<i class="enterprise-price-detail">¥{{item2.salePrice}}</i>
																				</p>
																				<p class="jd-price" style="display: none">
																						<i class="jd-price-detail">¥3799.00</i>
																				</p>
																		</div>
																</div>
														</div>
														<!--<div class="specificGoods">
															<a target="_blank" href="https://item.jd.com/100003150359.html">
																<div class="goodsPic">
																	<img height="148" width="158"
																			 src="https://img10.360buyimg.com/cms/jfs/t1/72545/33/14871/183222/5dc40347E90020887/38a158f7113abf77.jpg.webp"
																			 alt="">
																</div>
																<div class="introduction">
																	<div class="goodsName">
																		<p>戴尔(DELL)成就3470 英特尔酷睿i5 商用办公 台式电脑整机(九代i5-9400 8G 1T 四年上门 键鼠 WIFI)21.5英寸</p>
																	</div>
																	<div class="goodsPrice">
																		<p class="enterprise-price">
																			企业专享价
																			<i class="enterprise-price-detail">¥3779</i>
																		</p>
																		<p class="jd-price" style="display: none">
																			<i class="jd-price-detail">¥3799.00</i>
																		</p>
																	</div>
																</div>
															</a>
														</div>
														<div class="specificGoods">
															<a target="_blank" href="https://item.jd.com/100003150359.html">
																<div class="goodsPic">
																	<img height="148" width="158"
																			 src="https://img10.360buyimg.com/cms/jfs/t1/72545/33/14871/183222/5dc40347E90020887/38a158f7113abf77.jpg.webp"
																			 alt="">
																</div>
																<div class="introduction">
																	<div class="goodsName">
																		<p>戴尔(DELL)成就3470 英特尔酷睿i5 商用办公 台式电脑整机(九代i5-9400 8G 1T 四年上门 键鼠 WIFI)21.5英寸</p>
																	</div>
																	<div class="goodsPrice">
																		<p class="enterprise-price">
																			企业专享价
																			<i class="enterprise-price-detail">¥3779</i>
																		</p>
																		<p class="jd-price" style="display: none">
																			<i class="jd-price-detail">¥3799.00</i>
																		</p>
																	</div>
																</div>
															</a>
														</div>-->
												</div>
										</div>
								</li>
								<p class="setting" v-show="isShowBtn">
										<span class="edit" @click="hotGoodsEdit">编辑</span>
										<span class="delete" @click="delehandele">删除</span>
								</p>
						</ul>
						<!--折扣的弹框-->
						<el-dialog title="商品专题编辑" :visible.sync="hotGoodsDialogVisible" width="965px">
								<div class="topCategories">
										<div class="topCategorieOne">
												<p class="title">热爆商品专区</p>
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
														<div class="topCategoriesRight">
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
														<div style="margin: 20px 0">
																<span>商品专题:</span>
																<!--<el-select class="inp"  placeholder="请选择">-->
																<!--</el-select>-->
																<el-button type="primary">关联商品专题</el-button>
														</div>
														<div v-if="tableData&&tableData.pageList.length>0">
																<el-table
																		@selection-change=hanldeSelection
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
														<div style="text-align: right;margin-top: 20px"
																 v-if="tableData&&tableData.pageList.length>0">
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
                <el-button @click="hotGoodsDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confrimImg">确 定</el-button>
              </span>
						</el-dialog>
				</div>
		</div>
</template>

<script>
    import {updateComponent, getactivityGoods} from '@/api/mallapp/homeEditor'

    export default {
        props: ['newArr', 'activity'],
        data() {
            return {
                HotGoodsServiceList: [],
                isshow: true,
                isShowBtn: false,
                hotGoodsDialogVisible: false,

                tableData: null,
                activityProduct: {
                    activityId: '',
                    pageIndex: 1,
                    pageSize: 10
                },

                imgUrl: '',
                advertisingSlogan: '',
                activityHomepageGoodsReturns: [],
            }
        },
        watch: {
            hotGoodsDialogVisible(val) {
                if (!val) {
                    this.getActivity()
                }
            },
            activity(val, oldval) {
                if (val !== oldval) {
                    val.forEach(item => {
                        if (item.activityTypeNum === 9) {
                            this.activityProduct.activityId = item.activityId
                            this.getactivityGoods()
                        }
                    })
                }
            }
        },
        created() {
            this.componentId = this.newArr.componentId
            this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
            this.getActivity()
        },
        methods: {
            //弹框初始化
            getActivity() {
                let content = this.newArr.componentContents
                if (content.length == 0) {
                    content.push({
                        componentId: this.componentId,
                        content: '',
                        type: 4,
                        sortOrder: 0,
                        contentStatus: 0,
                        picture: ' ',
                        title: ' '
                    })
                }
                if (content && content.length > 0) {
                    let contentArr
                    this.HotGoodsServiceList = JSON.parse(JSON.stringify(content))
                    this.advertisingSlogan = content[0].title
                    this.imgUrl = content[0].picture
                    contentArr = JSON.parse(content[0].content)
                    this.HotGoodsServiceList[0].specialGoods = contentArr.activityGoods
                    this.form = {
                        zoneLink: contentArr.zoneLink,
                    }
                }
            },

            // 获取商品信息
            async getactivityGoods() {
                const res = await getactivityGoods(this.activityProduct)
                if (res.code === 200) {
                    this.tableData = res.data
                }
            },

            //获取商品
            hanldeSelection(val) {
                this.activityGoods = val
            },
            //上传图片
            handleAvatarSuccess(res, file) {
                this.imgUrl = res.data.domain + res.data.filePath;
            },

            //删除
            delehandele() {
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
            async confrimImg() {
                let contentId
                if (this.newArr.componentContents.length > 0) {
                    contentId = this.newArr.componentContents[0].contentId
                } else {
                    contentId = null
                }
                const spikeactivity = {
                    bgcolor: this.form.bgcolor,
                    zoneLink: this.form.zoneLink,
                    activityGoods: this.activityGoods
                }
                const obj = {
                    contentId: contentId,
                    componentId: this.componentId,
                    content: JSON.stringify(spikeactivity),
                    type: 4,
                    sortOrder: 0,
                    contentStatus: 0,
                    picture: this.imgUrl,
                    title: this.advertisingSlogan,
                }
                const res = await updateComponent(obj)
                if (res.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '编辑成功'
                    })
                } else {
                    this.$message({
                        type: 'info',
                        message: '编辑失败'
                    })
                }
                this.hotGoodsDialogVisible = false
            },

            handleSizeChange(val) {
                this.activityProduct.pageSize = val
                this.getactivityGoods()
            },
            handleCurrentChange(val) {
                this.activityProduct.pageIndex = val
                this.getactivityGoods()
            },
            hotGoodsEdit() {
                this.hotGoodsDialogVisible = true
            }
        }

    }
</script>

<style lang="scss" scoped>
		a {
				color: #666;
				text-decoration: none;
				display: block
		}

		img {
				border: 0;
				vertical-align: middle;
		}

		.special-area {
				margin-bottom: 30px;
				height: 513px;
				background-color: #f6f6f6;
				position: relative;
				/*display: flex;
		    justify-content: space-between;*/
		}

		.p-left {
				float: left;
				width: 595px;

				.p-left-top {
						overflow: hidden;
						height: 276px;

						.purchasing-word {
								float: left;
								position: relative;

								.left-word {
										position: absolute;
										z-index: 2;
										top: 0;

										.purchasing-title-top {
												margin-left: 21px;

												span {
														display: block;
														color: #FFFFFF;

														.mainTitle {
																margin-top: 24px;
																font-size: 26px;
																font-weight: 700;
														}

														.subheadTitle {
																margin-top: 15px;
																font-size: 16px;
														}
												}

										}

										.purchasing-tab {
												margin-top: 30px;
												margin-left: 21px;

												.tabTitle {
														float: left;
														border: 1px solid #fff;
														text-align: center;
														padding: 6px 14px;
														margin-right: 10px;
														margin-bottom: 10px;
														border-radius: 17px;
														max-width: 78px;

														span {
																font-size: 12px;
																color: #fff;
																text-decoration: none;
														}
												}

										}

								}
						}

						.purchasing-activePic {
								float: left;
								position: relative;
								width: 397px;
								height: 276px;

								.slider-content {
										position: relative;
										width: 100%;
										height: 100%;
										overflow: hidden;
								}
						}
				}

				.p-left-bottom {
						height: 237px;
						overflow: hidden;
						background-color: #fff;

						.specificGoods {
								width: 197px;
								float: left;
								height: 100%;
								border-left: 1px solid #f0f0f0;

								.goodsPic {
										margin-top: 13px;
										text-align: center;

								}

								.introduction {
										width: 173px;
										height: 63px;
										margin-top: 13px;
										text-align: center;

										.goodsName {
												height: 27px;
												width: 160px;
												font-size: 12px;
												color: #333;
												margin-left: 18px;

												p {
														overflow: hidden;
														text-overflow: ellipsis;
														white-space: nowrap;
												}
										}

										.goodsPrice {
												p {
														font-size: 12px;
														color: #999;
														line-height: 20px;

														i {
																font-style: normal;
																font-size: 16px;
																color: #e93632;
																font-family: Verdana
														}

												}
										}

								}

						}
				}
		}

		.mask {
				position: absolute;
				z-index: 0;
				top: 0;
				height: 276px;
				width: 198px;
				opacity: .5;
		}

		.setting {
				position: absolute;
				right: 0;
				top: 0;

				span {
						cursor: pointer;
						display: inline-block;
						width: 56px;
						height: 32px;
						line-height: 32px;
						text-align: center;
						background: rgba(76, 134, 244, 1);
						border-radius: 3px;
						font-size: 12px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: rgba(255, 255, 255, 1);
				}

				.edit {
						margin-right: 14px;
				}
		}

		.topCategories {
				width: 100%;

				.topCategorieOne {
						margin-top: 30px;
						width: 100%;

						.title {
								font-size: 14px;
								font-family: Microsoft YaHei;
								font-weight: 400;
								color: rgba(51, 51, 51, 1);
								border-left: 4px solid rgba(84, 148, 246, 1);;
								padding-left: 18px;
								margin-bottom: 20px;
						}

						.topCategorieContainer {
								display: flex;
								width: 100%;

								.topCategoriesLeft {
										width: 50%;
										margin-left: 55px;

										.updataImg {
												display: flex;

												.zhuanqu {
														margin-top: 20px;
														vertical-align: top;
														margin-right: 15px;
												}

												.updata {
														p {
																display: flex;
																flex-direction: column;
																justify-content: center;
																align-items: center;

																.chongxin {
																		margin: 14px 0 8px 0;
																		cursor: pointer;
																		text-align: center;
																		line-height: 33px;
																		width: 70px;
																		height: 33px;
																		border: 1px solid rgba(76, 134, 244, 1);
																		border-radius: 2px;
																		font-size: 13px;
																		font-family: Microsoft YaHei;
																		font-weight: 400;
																		color: rgba(76, 134, 244, 1)
																}

																.cicun {
																		font-size: 12px;
																		font-family: Microsoft YaHei;
																		font-weight: 400;
																		color: rgba(196, 198, 204, 1);
																}
														}

												}
										}
								}

								.topCategoriesRight {
										width: 45%;
										margin-right: 54px;
								}
						}
				}
		}

		.homeClassification {
				padding-top: 30px;
				background: white;

				.basicText {
						text-align: left;
						padding-left: 18px;
						border-left: 4px solid #5494F6;
						font-size: 14px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
						margin-bottom: 20px;
				}

				.zhuanti {
						text-align: left;
						margin-left: 21px;
				}

				.inp {
						margin: 0 20px;
				}
		}

		.avatar-uploader {
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
