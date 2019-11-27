<template>
		<div class="margin">
				<div class="mbottom">
						<div class="goods-fitter">
								<el-form label-width="100px" size="small">
										<div class="search-wrapper">
												<h4 class="title">搜索条件</h4>
												<div class="search-base">
														<el-row style="display: flex;">
																<el-form-item label="提报单号：" style="width: 400px;margin-right: 100px"
																							label-width="150px">
																		<el-input v-model="form.reportSn" clearable placeholder="请输入提报单号"></el-input>
																</el-form-item>
																<el-form-item label="提报状态：" label-width="150px">
																		<el-select v-model="form.reportPlan" placeholder="请选择提报状态" size="small" @change="changeStatus" clearable>
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
				<div class="mbottom">
						<div class="goods-fitter">
								<div class="search-wrapper">
										<div style="margin-bottom: 20px">
												<el-button type="primary" size="small" @click="addEdit">
														<span style="position: relative;top: -1px;">新增</span>
												</el-button>
												<el-button type="primary" size="small" @click="showImportDialog">
														<span style="position: relative;top: -1px;">导入提报商品单</span>
												</el-button>
										</div>
										<el-table :data="list" border style="width: 100%" stripe>
												<el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
												<el-table-column label="提报单号" align="center">
														<template slot-scope="scope">
																<span>{{scope.row.reportSn}}</span>
														</template>
												</el-table-column>
												<el-table-column prop="userName" label="提报人员" align="center" width="90">
														<template slot-scope="scope">
																<span>{{scope.row.userName}}</span>
														</template>
												</el-table-column>
												<el-table-column prop="applyDescription" label="提报原因" width="240px"
																				 align="center"></el-table-column>
												<el-table-column prop="reportNum" label="提报商品数量" width="110px" align="center"></el-table-column>
												<el-table-column prop="createTime" label="申请提报时间" align="center"></el-table-column>
												<el-table-column prop="expirationTime" label="提报截止时间" align="center"></el-table-column>
												<el-table-column prop="reportPlan" label="提报状态" align="center" width="140">
														<template slot-scope="scope">
																<el-tag :type="scope.row.reportPlan|statusFilter">{{scope.row.reportPlan}}</el-tag>
														</template>
												</el-table-column>
												<el-table-column label="操作" align="center" fixed="right" width="180px">
														<template slot-scope="scope">
																<div class="line-div clearfix">
																		<!-- 详情 -->
																		<div class="small-Idiv" @click="checkDetail(scope.row.reportId)"
																				 v-if="scope.row.detailShow">
																				<div class="i-div">
																						<img src="@/common/images/icon/icon_detail.png" alt=""
																								 class="operation_img">
																				</div>
																				<span style="word-break: keep-all;">详情</span>
																		</div>
																		<!-- 编辑 -->
																		<div class="small-Idiv"
																				 @click="edit(scope.row.reportId)" v-if="scope.row.editShow">
																				<div class="i-div">
																						<img src="@/common/images/icon/icon_edit.png" alt="" class="operation_img">
																				</div>
																				<span style="word-break: keep-all;">编辑</span>
																		</div>
																		<!-- 提报申请 -->
																		<div class="small-Idiv" @click="dispatchAdmin(scope.row.reportId)"
																				 v-if="scope.row.dispatchShow">
																				<div class="i-div">
																						<img src="@/common/images/icon/指派采购员(1).png" alt="" class="operation_img">
																				</div>
																				<span style="word-break: keep-all;">提报申请</span>
																		</div>
																		<!-- 删除 -->
																		<div class="small-Idiv" @click="showDeleteDialog(scope.row.reportId)"
																				 v-if="scope.row.deleteShow">
																				<div class="i-div huishouzhan">
																						<img src="@/common/images/icon/icon_delete.png" alt=""
																								 class="operation_img">
																				</div>
																				<span style="word-break: keep-all;">删除</span>
																		</div>
																</div>
														</template>
												</el-table-column>
										</el-table>
										<div class="pagination" style="text-align: right;padding: 20px 0;">
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
								</div>
						</div>
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
				<!--导入提报商品对话框-->
				<el-dialog title="导入提报商品" :visible.sync="importDialog" width="40%">
						<el-form ref="form2" :model="form2" label-width="100px" class="demo-ruleForm">
								<div class="row">
										<el-form-item label="提报商品">
												<div style="display: flex;align-items: center">
														<!--<span class="t1">提报商品</span>-->
														<button class="btn1" @click="download()">下载表格模板</button>
														<!--<button class="btn2" @click="upload()">选择文件上传</button>-->
														<label class="button btn_css" for="uploadMultipleAddress"
																	 title="温馨提示:为确保导入表格的格式正确，请先下载/导出表格模板">
																<input @change="upload" ref="uploadFile" style="position: absolute; top:-10000px;"
																			 type="file"
																			 id="uploadMultipleAddress"
																			 accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
																选择文件上传
														</label>
														<div class="el-upload__tip" v-show="this.file">{{file.name}}</div>
												</div>

										</el-form-item>
								</div>
								<div class="row">
										<el-form-item label="公司名称">
												<el-input v-model="form2.companyName" style="width:418px"></el-input>
										</el-form-item>
								</div>
								<div class="row">
										<el-form-item label="部门">
												<el-input v-model="form2.department" style="width:418px"></el-input>
										</el-form-item>
								</div>
								<div class="row">
										<el-form-item label="提报单号">
												<el-input v-model="form2.reportSn" style="width:418px"></el-input>
										</el-form-item>
								</div>
								<div class="row">
										<el-form-item label="申请人员">
												<el-input v-model="form2.userName" style="width:418px"></el-input>
										</el-form-item>
								</div>
								<div class="row">
										<el-form-item label="联系人员">
												<el-input v-model="form2.contactUser" style="width:418px"></el-input>
										</el-form-item>
								</div>
								<div class="row">
										<el-form-item label="联系电话">
												<el-input v-model="form2.contactPhone" style="width:418px"></el-input>
										</el-form-item>
								</div>
								<div class="row">
										<el-form-item label="提报截止时间">
												<el-date-picker
														v-model="form2.expirationTime"
														type="datetime"
														placeholder="选择提报截止日期时间"
														value-format="yyyy-MM-dd HH:mm:ss"
														style="width: 302px;">
												</el-date-picker>
										</el-form-item>
								</div>
								<div class="row">
										<el-form-item label="提报要求">
												<el-input type="textarea" v-model="form2.applyDescription"
																	style="width:418px;min-height: 83px"></el-input>
										</el-form-item>
								</div>
								<!--<div class="button">
										<el-button style="background:#F56C6C;width:96px;height:36px;" type="danger" @click="closePopup">取消
										</el-button>
										<el-button style="background:#4A99FA;width:96px;height:36px;" type="primary" @click="submitData">保存
										</el-button>
								</div>-->
						</el-form>
						<span slot="footer" class="dialog-footer">
                    <el-button type="danger" @click="importDialog = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="submitData" size="small">保存</el-button>
						</span>
				</el-dialog>
		</div>
</template>
<script>
    import {deleteTellGoods, getTellGoodsList, tellGoodsApply, uploadExcel} from '@/api/tellGoods/index'
    import {throttleTipPop} from '@/utils/throttle'

    export default {
        name: "",
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
                list: null, //表格数据源
                total: 0, // 返回总条数
                form: { // 搜索条件
                    reportSn: '', //提报单号
                    reportPlan: null, // 提报进度
                    signTimeEnd: null, // 合同签订结束时间
                    startTime: '', //申请时间起始
                    endTime: '', // 申请时间结束
                    deadStartTime: '',//截止时间起始
                    deadEndTime: '',//截止时间结束
                    pageIndex: 1,//当前页
                    pageSize: 10, // 页容量
                },
                deleteDialog: false,//删除对话框
                deleteRemark: '', // 删除原因
                reportIds: '',

                id: null, // 操作的商品id

                placeholder: '', // 审核结果缘由提示语
                examine: {
                    status: '', // 审核状态
                    textarea: '', // 审核结果理由
                },
                dialogVisible1: false, // 审核弹窗
                dialogVisible3: false, // 提交审核弹窗
                dialogVisible_upload: false, // 上传文件弹窗
                audit: {
                    status: '',
                    textarea: '',
                    auditId: '',
                    contractId: '',
                    taskId: '',
                },
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
                importDialog: false,//导入商品提报对话框
                form2: {
                    companyName: '',
                    department: '',
                    reportSn: '',
                    userName: '',
                    contactUser: '',
                    contactPhone: '',
                    applyDescription: '',
                    expirationTime: '',
                },//导入提报商品表单
                // userId: '',
                formData: new FormData(),
                file: '',
                dispatchShow: false,//提报申请
                deleteShow: false,//删除
                detailShow: false,//详情
                editShow: false,//编辑
            };
        },
        created() {
            this.getTellGoods()
            // this.userId = JSON.parse(getCookie("userData")).userId;
        },
        methods: {
            //改变
            changeStatus(val){
                console.log(val)
                this.getTellGoods()

						},
            //重置表单数据
            reset() {
                this.form2 = {
                    companyName: '',
                    department: '',
                    reportSn: '',
                    userName: '',
                    contactUser: '',
                    contactPhone: '',
                    applyDescription: '',
                    expirationTime: '',
                }
            },
            //获取列表数据
            getTellGoods() {
                getTellGoodsList(this.form).then(res => {
                    if (res.code === 200) {
                        this.total = res.data.page.total
                        this.form.pageIndex = res.data.page.pageIndex
                        this.form.pageSize = res.data.page.pageSize
                        this.list = res.data.pageList
                        this.list = this.list.map(v => {
                            this.$set(v, 'dispatchShow', false)
                            this.$set(v, 'deleteShow', false)
                            this.$set(v, 'detailShow', false)
                            this.$set(v, 'editShow', false)
                            return v
                        })
                        this.list.forEach(item => {
                            if (item.reportPlan == 1) {
                                item.reportPlan = '待审核'
                                item.dispatchShow = true//提报申请
                                item.deleteShow = true//删除
                                item.detailShow = true//详情
                                item.editShow = true//编辑
                            } else if (item.reportPlan == 2) {
                                item.reportPlan = '审核通过'
                                item.detailShow = true//详情
                            } else if (item.reportPlan == 3) {
                                item.reportPlan = '审核未通过'
                                item.dispatchShow = true//提报申请
                                item.deleteShow = true//删除
                                item.detailShow = true//详情
                                item.editShow = true//编辑
                            } else if (item.reportPlan == 4) {
                                item.reportPlan = '审核中'
                                item.detailShow = true//详情
                            } else if (item.reportPlan == 5) {
                                item.reportPlan = '已推送至供货商'
                                item.detailShow = true//详情
                            } else if (item.reportPlan == 6) {
                                item.reportPlan = '供货商已提供商品'
                                item.detailShow = true//详情
                            } else if (item.reportPlan == 7) {
                                item.reportPlan = '已完成'
                                item.detailShow = true//详情
                            }
                        })
                    }
                })
            },
            // 新增按钮
            addEdit() {
                this.$router.push({
                    name: 'indexAddEdit',
                    query: {
                        type: 1,
                    },
                })
            },
            //展示 导入提报商品对话框
            showImportDialog() {
                this.file = ''
                this.reset()
                this.importDialog = true

            },
            //上传
            async upload() {
                this.file = this.$refs.uploadFile.files[0]
                // const formData = new FormData()
                // let res = ''
                this.formData.set('multipartFile', this.file)

                // try {
                //   res = await uploadExcel(formData)
                // } catch (e) {
                //   this.$message.error('导入表格不正确！')
                //   this.$refs.uploadFile.value = ''
                // }
                // if (res.code === 200) {
                //   let flag = false // 商品信息匹配，校验通过flag为false, 校验不通过为true
                //   const addressArr = []
                //   res.data.forEach((item) => {
                //     const obj = {}
                //     obj.applyDescription = ''
                //     obj.department = ''
                //     obj.reportSn = ''
                //     obj.userName = ''
                //     obj.contactUser = ''
                //     obj.contactPhone = ''
                //     obj.userId = ''

                //     obj.sortOrder = 0
                //     addressArr.push(obj)
                //   })
                //   if (flag) {
                //     this.$message.error('上传的商品信息不匹配，请下载模板清单进行填写后上传')
                //     return
                //   }
                //   this.$message({
                //     type: 'success',
                //     message: '上传成功！',
                //   })
                //   this.$emit('multipleTableDataChange', addressArr)
                //   this.$refs.uploadFile.value = '' // 清空上传的文件
                // }
            },
            //下载
            download() {
                window.open('http://www.maige.com/api/open/p/b2b2c/goodsservice/merchandise/download_template.json')
            },
            // 保存
            async submitData() {
                // console.log(888, this.userId);
                this.formData.set("companyName", this.form2.companyName);
                this.formData.set("department", this.form2.department);
                this.formData.set("reportSn", this.form2.reportSn);
                this.formData.set("userName", this.form2.userName);
                this.formData.set("contactUser", this.form2.contactUser);
                this.formData.set("contactPhone", this.form2.contactPhone);
                this.formData.set("applyDescription", this.form2.applyDescription);
                this.formData.set("expirationTime", this.form2.expirationTime);
                // this.formData.set("userId", this.userId);
                let res = 0
                try {
                    res = await uploadExcel(this.formData)
                    // if (code==200){
                    //
                    //   this.$message.success("操作成功")
                    // }
                    if (res.code === 200) {
                        this.importDialog = false
                        // this.addAddressShow = false
                        // this.$emit('transfer', false)
                        // await this.ifComeFromJustBuy()
                        // this.$store.commit('getTopTwoUserInfo')
												this.getTellGoods()
                        this.$message.success("操作成功")
                    }
                } catch (e) {
                    this.$message({
                        type: 'error',
                        message: '保存失败',
                    })
                }
                // if (res.code === 200) {
                //   this.addAddressShow = false
                //   this.$emit('transfer', false)
                //   await this.ifComeFromJustBuy()
                //   this.$store.commit('getTopTwoUserInfo')
                // }
            },
            // 查看详情
            checkDetail(reportId) {
                this.$router.push({
                    name: 'indexDetail',
                    query: {
                        reportId,
                    },
                })
            },
            // 编辑
            edit(reportId) {
                this.$router.push({
                    name: 'indexAddEdit',
                    query: {
                        type: 2,
                        reportId,
                    },
                })
            },
            //展开删除对话框
            showDeleteDialog(id) {
                console.log(222, id)
                this.reportIds = id;
                console.log(333, this.reportIds)
                this.deleteRemark = '';

                this.deleteDialog = true;
            },
            //确认删除按钮
            confirmDelete() {
                // let params = {}
                console.log(444, this.reportIds)
                deleteTellGoods(this.reportIds).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        });
                        this.deleteDialog = false
                        this.getTellGoods()
                    }
                })
                this.deleteDialog = false;
            },

            examineView(val) {
                this.audit.auditId = ""
                this.audit.contractId = ""
                this.audit.taskId = ""
                this.audit.textarea = ""
                this.audit.status = "1"
                console.log(val);
                this.dialogVisible3 = true
                this.audit.auditId = val.auditId
                this.audit.contractId = val.id
                this.audit.taskId = val.currentAuditDetail && val.currentAuditDetail.taskId || ""
            },
            // 上传文件
            async uploadScanFile() {

                const res = await upLoadScanFile(this.file.id, this.file.url)
                this.dialogVisible_upload = false;
                if (res.code === 200) {
                    throttleTipPop(this, 'success', '上传成功')
                    this.getTellGoods()
                }
            },
            // 审核
            async examineContract() {
                const res = await examineContract()
                if (res.code === 200) {
                    throttleTipPop(this, 'success', '审核成功')
                    this.getTellGoods()
                }
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
            // 提报申请
            dispatchAdmin(id) {
                // this.admin.id = id
                // this[`dialogVisible${popIndex}`] = true
                tellGoodsApply(id).then(res => {
                    if (res.code == 200) {
                        this.getTellGoods()
                        this.$message.success('申请成功')
                    }
                })
            },
            // 搜索查询
            searchData() {
                this.getTellGoods(this.form)
            },
            //页容量变化
            handleSizeChange(val) {
                this.form.pageSize = val
                this.form.pageIndex = 1
                this.getTellGoods()
            },
            // 当前页改变
            handleCurrentChange(val) {
                this.form.pageIndex = val
                this.getTellGoods()
            },
        },
    };
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
				display: inline-block;
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

		.btn1 {
				width: 109px;
				height: 32px;
				background-color: #FFFFFF;
				color: #4c88f5;
				border: 1px solid #4c88f5;
				border-radius: 5px;
				margin-right: 22px;
		}

		.btn_css {
				width: 130px;
				height: 32px;
				background-color: #4c88f5;
				color: #fff;
				border-radius: 5px;
				border: 1px solid #4c88f5;
				display: inline-block;
				cursor: pointer;
				line-height: 32px;
				padding: 0 20px;
				font-size: 14px;
				text-align: center
		}

		.el-upload__tip {
				margin-left: 10px;
				font-size: 16px;
		}

</style>
