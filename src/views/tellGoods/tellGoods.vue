<comment>
		#商品提报
</comment>
<template>
		<div class="margin">
				<div class="mbottom">
						<div class="goods-fitter">
								<el-form label-width="100px" size="small">
										<div class="search-wrapper">
												<h4 class="title">搜索条件</h4>
												<div class="search-base">
														<!--<el-row :gutter="10">
																<el-col :span="8">
																		<el-form-item label="提报单号：" label-width="110px">
																				<el-input v-model="form.reportSn" clearable placeholder="请输入提报单号"
																									style="width: 94%"></el-input>
																		</el-form-item>
																</el-col>
																<el-col :span="8">
																		<el-form-item label="提报状态：" label-width="110px">
																				<el-input v-model="form.reportPlan" clearable placeholder="请输入提报状态"
																									style="width: 94%"></el-input>
																		</el-form-item>
																</el-col>
														</el-row>
														<el-row :gutter="10">
																<el-col :span="8">
																		<el-form-item label="提报申请时间：" label-width="110px">
																				<el-date-picker
																						:editable="false"
																						style="display: inline-block"
																						v-model="form.startTime"
																						value-format="yyyy-MM-dd HH:mm:ss"
																						type="date"
																						placeholder="选择日期">
																				</el-date-picker>
																				<span style="font-size: 14px;color: #606266;margin: 0 6px">-</span>
																				<el-date-picker
																						:editable="false"
																						style="display: inline-block"
																						v-model="form.endTime"
																						value-format="yyyy-MM-dd HH:mm:ss"
																						type="date"
																						placeholder="选择日期">
																				</el-date-picker>
																		</el-form-item>
																</el-col>
																<el-col :span="8">
																		<el-form-item label="提报截止时间：" label-width="110px">
																				<el-date-picker
																						:editable="false"
																						style="display: inline-block"
																						v-model="form.deadStartTime"
																						value-format="yyyy-MM-dd HH:mm:ss"
																						type="date"
																						placeholder="选择日期">
																				</el-date-picker>
																				<span style="font-size: 14px;color: #606266;margin: 0 6px">-</span>
																				<el-date-picker
																						:editable="false"
																						style="display: inline-block"
																						v-model="form.deadEndTime"
																						value-format="yyyy-MM-dd HH:mm:ss"
																						type="date"
																						placeholder="选择日期">
																				</el-date-picker>
																		</el-form-item>
																</el-col>
																<el-col :span="1" class="btn_right">
																		<el-button type="primary" size="small" @click="searchData">查询</el-button>
																</el-col>
														</el-row>-->
														<el-row style="display: flex;">
																<el-form-item label="提报单号：" style="width: 400px;margin-right: 100px"
																							label-width="150px">
																		<el-input v-model="form.reportSn" clearable placeholder="请输入提报单号"></el-input>
																</el-form-item>
																<el-form-item label="提报状态：" label-width="150px">
																		<el-select v-model="form.reportPlan" placeholder="请选择提报状态" size="small"
																							 @change="changeStatus" clearable>
																				<el-option
																						v-for="item in reportOptionsList"
																						:key="item.value"
																						:label="item.label"
																						:value="item.value">
																				</el-option>
																		</el-select>
																</el-form-item>
														</el-row>
														<div style="display: flex;align-items: center">
																<el-form-item label="提报申请时间：" label-width="150px">
																		<div style="display: flex">
																				<el-date-picker
																						:editable="false"
																						style="display: inline-block"
																						v-model="form.startTime"
																						value-format="yyyy-MM-dd HH:mm:ss"
																						type="date"
																						placeholder="选择日期">
																				</el-date-picker>
																				<span style="font-size: 14px;color: #606266;margin: 0 6px">-</span>
																				<el-date-picker
																						:editable="false"
																						style="display: inline-block"
																						v-model="form.endTime"
																						value-format="yyyy-MM-dd HH:mm:ss"
																						type="date"
																						placeholder="选择日期">
																				</el-date-picker>
																		</div>
																</el-form-item>
																<el-form-item label="提报截止时间：" label-width="150px">
																		<div style="display: flex">
																				<el-date-picker
																						:editable="false"
																						style="display: inline-block"
																						v-model="form.deadStartTime"
																						value-format="yyyy-MM-dd HH:mm:ss"
																						type="date"
																						placeholder="选择日期">
																				</el-date-picker>
																				<span style="font-size: 14px;color: #606266;margin: 0 6px">-</span>
																				<el-date-picker
																						:editable="false"
																						style="display: inline-block"
																						v-model="form.deadEndTime"
																						value-format="yyyy-MM-dd HH:mm:ss"
																						type="date"
																						placeholder="选择日期">
																				</el-date-picker>
																		</div>
																</el-form-item>
																<el-form-item label-width="80px">
																		<el-button type="primary" size="small" @click="searchData">查询</el-button>
																</el-form-item>
														</div>
												</div>
										</div>
								</el-form>
						</div>
				</div>
				<div class="mcard">
						<el-table :data="list" border style="width: 100%" stripe>
								<el-table-column type="index" align="center" label="序号" width="50px"></el-table-column>
								<el-table-column prop="reportSn" label="提报单号" align="center" width="100"></el-table-column>
								<el-table-column prop="contactUser" label="联系人员" align="center" width="100"></el-table-column>
								<el-table-column prop="contactPhone" label="联系电话" align="center" width="100"></el-table-column>
								<el-table-column prop="companyName" label="公司名称" align="center"></el-table-column>
								<el-table-column prop="reportNum" label="提报商品数量" align="center" width="110"></el-table-column>
								<el-table-column prop="createTime" label="提报申请时间" align="center"></el-table-column>
								<el-table-column prop="expirationTime" label="提报截止时间" align="center"></el-table-column>
								<el-table-column prop="reportPlan" label="提报状态" align="center" width="140">
										<template slot-scope="scope">
												<el-tag :type="scope.row.reportPlan|statusFilter">{{scope.row.reportPlan}}</el-tag>
										</template>
								</el-table-column>
								<el-table-column label="操作" align="center" fixed="right" width="180">
										<template slot-scope="scope">
												<div class="line-div">
														<div class="small-Idiv" @click="detail(scope.row.reportId)" style="margin-right:10px">
																<div class="i-div">
																		<img src="@/common/images/icon/查看详情.png" alt="" class="operation_img">
																</div>
																<span style="word-break: keep-all;">详情</span>
														</div>
														<div v-if="!(scope.row.auditStatus==0&&scope.row.actionType==1)" class="small-Idiv"
																 @click="showDeleteDialog(scope.row.reportId)" style="margin-right:10px">
																<div class="i-div huishouzhan">
																		<img src="@/common/images/icon/回收站.png" alt="" class="operation_img">
																</div>
																<span style="word-break: keep-all;">删除</span>
														</div>
												</div>
												<!--<div class="line-div">
														<div class="small-Idiv"
																 @click="recommond(scope.row.reportId)">
																<div class="i-div huishouzhan">
																		<img src="@/common/images/icon/icon_contract.png" alt=""
																				 class="operation_img">
																</div>
																<span style="word-break: keep-all;">商品推荐</span>
														</div>
												</div>-->
												<div class="line-div" v-if="scope.row.showItem">
														<div class="small-Idiv"
																 @click="upRecommond(scope.row.reportId)">
																<div class="i-div huishouzhan">
																		<img src="@/common/images/icon/icon_contract.png" alt=""
																				 class="operation_img">
																</div>
																<span style="word-break: keep-all;">上架商品</span>
														</div>
												</div>
										</template>
								</el-table-column>
						</el-table>
						<div class="pagination">
								<el-pagination
										@size-change="handleSizeChange"
										@current-change="handleCurrentChange"
										:current-page="form.pageIndex"
										:page-sizes="[10, 30, 50, 100]"
										:page-size="form.pageSize"
										layout="total, sizes, prev, pager, next, jumper"
										:total="total">
								</el-pagination>
						</div>
						<!-- 删除 -->
						<el-dialog
								title="删除"
								:visible.sync="deleteDialog"
								width="30%"
						>
								<el-form :model="form" label-width="100px">
										<el-form-item label="删除原因:">
												<el-input v-model="deleteRemark" type="textarea"></el-input>
										</el-form-item>
								</el-form>
								<span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="deleteDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmDelete()" size="small">确 定</el-button>
      </span>
						</el-dialog>
				</div>
		</div>
</template>

<script>
    import {deleteTellGoods2, getTellGoodsList2} from '@/api/tellGoods/index'

    export default {
        filters: {
            statusFilter(status) {
                const statusMap = {
                    审核通过: "success",
                    审核未通过: "danger",
                    待审核: "info",
                    审核中: "warning",
                    已推送至供货商: "",
                    供货商已提供商品: "",
                    已完成: "success",
                };
                return statusMap[status];
            }
        },
        data() {
            return {
                list: [
                    {
                        applyDescription: 123,
                        auditPlan: 2,
                        companyName: 3424,
                        contactPhone: 23432424,
                        contactUser: 1,
                        createTime: '2019-5-8',
                        reportId: 1,
                    }
                ], //表格数据源
                total: 10,
                form: {
                    pageIndex: 1, // 当前页
                    pageSize: 10, // 每页展示量
                    deadStartTime: '',//截止时间开始
                    deadEndTime: '',//截止时间结束
                    reportPlan: '',//提报进度
                    reportSn: '',//提报单号
                    startTime: '',//申请时间起始
                    endTime: '',//申请时间结束
                },
                deleteDialog: false,//删除对话框
                deleteRemark: '',//删除原因
                // state: '',//审核状态
                reportOptionsList: [
                    {
                        value: 1,
                        label: '待审核'
                    }, {
                        value: 2,
                        label: '审核通过'
                    }, {
                        value: 3,
                        label: '审核未通过'
                    }, {
                        value: 4,
                        label: '审核中'
                    }, {
                        value: 5,
                        label: '已推送至供应商'
                    }, {
                        value: 6,
                        label: '已供货'
                    }, {
                        value: 7,
                        label: '已完成'
                    },
                ],
            }
        },
        created() {
            this.getDataList()
        },
        methods: {
            //改变
            changeStatus(val) {
                console.log(val)
                this.getDataList()
            },
            //上架商品
            upRecommond(reportId) {
                this.$router.push({
                    name: 'tellGoodsShelvesGoods', query: {
                        reportId,
                    }
                })
            },
            //获取表格数据
            getDataList() {
                getTellGoodsList2(this.form).then(res => {
                    this.list = res.data.pageList
                    this.total = res.data.page.total
                    this.form.pageIndex = res.data.page.pageIndex
                    this.form.pageSize = res.data.page.pageSize
                    console.log(666, this.list)
                    this.list = this.list.map(v => {
                        this.$set(v, 'showItem', false)
                        return v
                    })
                    this.list.forEach(item => {
                        if (item.reportPlan == 1) {
                            item.reportPlan = '待审核'
                            item.showItem = false
                        } else if (item.reportPlan == 2) {
                            item.reportPlan = '审核通过'
                            item.showItem = false
                        } else if (item.reportPlan == 3) {
                            item.reportPlan = '审核未通过'
                            item.showItem = false
                        } else if (item.reportPlan == 4) {
                            item.reportPlan = '审核中'
                            item.showItem = false
                        } else if (item.reportPlan == 5) {
                            item.reportPlan = '已推送至供货商'
                            item.showItem = false
                        } else if (item.reportPlan == 6) {
                            item.reportPlan = '供货商已提供商品'
                            item.showItem = true
                        } else if (item.reportPlan == 7) {
                            item.reportPlan = '已完成'
                            item.showItem = false
                        }
                    })
                })
            },
            // 查看详情
            detail(reportId) {
                this.$router.push({
                    name: 'tellGoodsDetail',
                    query: {
                        reportId,
                    },
                })
            },
            //商品推荐
            recommond(reportId) {
                this.$router.push({
                    name: 'goodsRecommond',
                    query: {
                        reportId,
                    },
                })
            },
            //展开删除对话框
            showDeleteDialog(id) {
                this.reportIds = id;
                console.log(333, this.reportIds)
                this.deleteRemark = '';
                this.deleteDialog = true
            },
            //确认删除
            confirmDelete() {
                deleteTellGoods2(this.reportIds).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        });
                        this.deleteDialog = false
                        this.getDataList()
                    }
                })
                this.deleteDialog = false;
            },
            //查询
            searchData() {
                this.getDataList()
            },
            //页容量改变
            handleSizeChange(val) {
                this.form.pageSize = val
                this.getDataList()
            },
            //当前页改变
            handleCurrentChange(val) {
                this.form.pageIndex = val
                this.getDataList()
            },
        }
    }
</script>

<style lang="scss" scoped>
		@import "@/common/scss/variable.scss";

		.avatar {
				max-width: 300px;
				height: auto;
		}

		.clearfix:after {
				display: block;
				content: '';
				clear: both;
		}

		.clearfix {
				zoom: 1;
		}

		.line-div {
				/*display: inline-block;*/
				display: flex;
		}

		.small-Idiv {
				float: left;
				margin: 5px 4px;
				cursor: pointer;
				width: 71px;
		}

		/* 搜索条件 */
		.goods-fitter {
				.vender {
						ul {
								li {
										float: left;
										height: 41px;
										padding: 0 10px;
										line-height: 41px;
										text-align: center;
										border: 1px solid transparent;
										font-size: 16px;
										color: #333;
										cursor: pointer;

										&.active {
												border: 1px solid #d7e0f1;
												border-bottom: 0;
												background-color: #fff;
												position: relative;

												&:after {
														position: absolute;
														content: "";
														left: 0;
														bottom: -1px;
														height: 1px;
														width: 100%;
														background: #fff;
												}
										}

										.image {
												display: inline-block;
												width: 30px;
												margin-right: 10px;
												font-size: 0;
												line-height: 40px;
												vertical-align: top;

												img {
														width: 100%;
														vertical-align: middle;
												}
										}
								}
						}
				}

				.search-wrapper {
						padding: 20px;
						border: 1px solid rgb(215, 224, 241);
						background: #fff;

						.title {
								margin-left: -20px;
								font-size: 16px;
								font-weight: 400;
								color: #333;
								padding-left: 20px;
								line-height: 1.4;
								border-left: 4px solid $themeColor;
								margin-bottom: 10px;
						}

						.search-main {
						}

						.search-base {
						}
				}

				.text-space {
						text-align: center;
						color: #606266;
						font-size: 12px;
				}

				.el-select-width {
						max-width: 240px;
						margin-right: 5px;
				}

				.el-date-picker {
						max-width: 240px;
						margin-right: 5px;
				}

				.el-input-width {
						display: inline-block;
						max-width: 180px;
				}

				.btn-toggle {
						margin-left: 10px;
						font-size: 14px;
						color: $themeColor;
						cursor: pointer;
				}
		}

		/deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner {
				width: 137px;
		}


</style>
