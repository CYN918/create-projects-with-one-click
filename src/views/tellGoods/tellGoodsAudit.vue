<comment>
		#提报商品审核
</comment>
<template>
		<div class="margin">
				<div class="mbottom">
						<div class="goods-fitter">
								<el-form label-width="100px" size="small">
										<div class="search-wrapper">
												<h4 class="title">搜索条件</h4>
												<div class="search-base">
														<el-row :gutter="10">
																<el-col :span="5">
																		<el-form-item label="提报单号：">
																				<el-input v-model="form.reportSn" clearable placeholder="请输入提报单号"></el-input>
																		</el-form-item>
																</el-col>
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
														</el-row>
												</div>
										</div>
								</el-form>
						</div>
				</div>
				<div class="mcard">
						<el-table :data="list" border style="width: 100%" stripe>
								<el-table-column type="index" align="center" label="序号" width="50px"></el-table-column>
								<el-table-column prop="reportSn" label="提报单号" align="center"></el-table-column>
								<el-table-column prop="contactUser" label="提报人员" align="center"></el-table-column>
								<el-table-column prop="contactPhone" label="提报原因" align="center"></el-table-column>
								<el-table-column prop="reportNum" label="提报商品数量" align="center" width="110"></el-table-column>
								<el-table-column prop="createTime" label="提报申请时间" align="center"></el-table-column>
								<el-table-column prop="expirationTime" label="提报截止时间" align="center"></el-table-column>
								<el-table-column label="操作" align="center" fixed="right" width="180">
										<template slot-scope="scope">
												<div class="line-div">
														<div class="small-Idiv" @click="detail(scope.row.reportId,1)" style="margin-right:10px">
																<div class="i-div">
																		<img src="@/common/images/icon/查看详情.png" alt="" class="operation_img">
																</div>
																<span style="word-break: keep-all;">详情</span>
														</div>
														<div class="small-Idiv"
																 @click="getOperateContractId(scope.row.auditId, scope.row.taskId, 3)">
																<div class="i-div huishouzhan">
																		<img src="@/common/images/icon/icon_contract.png" alt=""
																				 class="operation_img">
																</div>
																<span style="word-break: keep-all;">审核</span>
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
						<el-dialog title="删除" :visible.sync="deleteDialog" width="30%">
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
						<!-- 审核弹窗 -->
						<el-dialog
								title="审核"
								:visible.sync="dialogVisible3"
								width="30%"
						>
								<el-form :model="form" label-width="100px">
										<el-form-item label="审核状态:">
												<el-radio v-model="audit.status" label="1">通过</el-radio>
												<el-radio v-model="audit.status" label="2">不通过</el-radio>
										</el-form-item>
										<el-form-item label="审核原因:">
												<el-input type="textarea"
																	:rows="2"
																	:placeholder="this.placeholder"
																	v-model="audit.textarea"
												></el-input>
										</el-form-item>

								</el-form>
								<span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible3 = false" size="small">取 消</el-button>
        <el-button type="primary" @click="auditTo" size="small">确 定</el-button>
      </span>
						</el-dialog>
				</div>
		</div>
</template>

<script>
    import {getTellGoodsAudit,confirmAudit} from '@/api/tellGoods/index'

    export default {
        data() {
            return {
                list: null,//表格数据源
                total: 10,
                form: {
                    pageIndex: 1, // 当前页
                    pageSize: 10, // 每页展示量
                    deadStartTime: '',//截止时间开始
                    deadEndTime: '',//截止时间结束
                    // reportPlan: '',//提报进度
                    reportSn: '',//提报单号
                    startTime: '',//申请时间起始
                    endTime: '',//申请时间结束
                },
                deleteDialog: false,//删除对话框
                deleteRemark: '',//删除原因
                // state: '',//审核状态
                dialogVisible1: false, // 审核弹窗
                dialogVisible3: false, // 提交审核弹窗
                audit: {
                    status: '', // 审核状态
                    textarea: '', // 审核结果理由
                },
                placeholder: '', // 审核结果缘由提示语
                auditList:[]
            }
        },
        created() {
            this.getDataList()
        },
        methods: {
            //获取表格数据
            getDataList() {
                getTellGoodsAudit(this.form).then(res => {
                    this.list = res.data.pageList
                    this.total = res.data.page.total
                    this.form.pageIndex = res.data.page.pageIndex
                    this.form.pageSize = res.data.page.pageSize
                })
            },
            // 查看详情
            detail(reportId) {
                this.$router.push({
                    name: 'tellGoodsAuditDetail',
                    query: {
                        reportId,
                    },
                })
            },
            // 展示审核弹窗
            getOperateContractId(auditId, taskId,popIndex) {
                this[`dialogVisible${popIndex}`] = true
								this.auditList.push({auditId,taskId,})
            },
            //审核确定
            auditTo() {
                if (!this.audit.status){
                    this.$message.error('请选择审核状态')
                   return
								}
                // if (this.audit.textarea){
                //     this.$message.error('请选择审核原因')
                //     return;
								// }
                let obj = {}
                obj.auditList = this.auditList//当前行审核id&任务id
                obj.auditOpinion = this.audit.textarea//审核原因
                obj.action = this.audit.status//审核状态
                console.log(obj);
                confirmAudit(obj).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        });
                        this.dialogVisible3 = false
                        this.getTellGoods()
                    }
                    this.dialogVisible3 = false

                })
            },
            // 提交审核
            async sumToExamine() {
                const res = await submitToExamine(this.id)
                if (res.code === 200) {
                    throttleTipPop(this, 'success', '提交审核成功')
                    this.getTellGoods()
                }
                this.dialogVisible3 = false
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
				width: 172px;
		}


</style>

