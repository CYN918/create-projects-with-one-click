<template>
		<div class="margin">
				<div class="mbottom">
						<div class="goods-fitter">
								<el-form label-width="100px" size="small">
										<div class="search-wrapper">
												<h4 class="title">运费规则</h4>
												<div class="search-base">
												</div>
										</div>
								</el-form>
						</div>
				</div>
				<div class="mcard">
						<el-row :gutter="10" style="margin-bottom: 30px">
								<el-col :span="8" style="display: flex;justify-content: flex-start">
										<el-button type="primary" size="mini" @click="addCouriercompany" v-permit="'freightRules:add'">新增快递公司</el-button>
										<el-button type="primary" size="mini" @click="importTemplate" v-permit="'freightRules:import'">导入运费计算模板</el-button>
								</el-col>
						</el-row>
						<el-table :data="list" border style="width: 100%" stripe>
								<el-table-column prop="expressName" label="快递公司" align="center"></el-table-column>
								<el-table-column prop="expressCode" label="快递编码" align="center"></el-table-column>
								<el-table-column prop="coefficient" label="轻抛系数" align="center"></el-table-column>
								<el-table-column prop="offerRatio" label="报价比例(%)" align="center" width="110"></el-table-column>
								<el-table-column prop="expressUrl" label="公司地址" align="center"></el-table-column>
								<el-table-column label="运费模板" align="center">
									<template slot-scope="scope">
										<ul>
											<li v-for="(item,index) in scope.row.freightTemplate">
												<el-tooltip placement="right">
													<div slot="content"><el-button type="primary" @click="queryTemplate(item.templateId)">查看模板</el-button><el-button type="danger" @click="deleteTemplate(item.templateId)">删除模板</el-button></div>
													<el-button>{{item.templateName}}</el-button>
												</el-tooltip>
											</li>
											<el-button type="primary" size="mini" @click="addTemplate(scope.row.id)" v-permit="'freightRules:addTemplate'">新增</el-button>
										</ul>
									</template>
								</el-table-column>
								<el-table-column label="操作" align="center" fixed="right" width="190px">
										<template slot-scope="scope">
												<div style="display: flex;justify-content: space-around">
														<!-- 查看 -->
														<div class="small-Idiv" @click="detail(scope.row.id)">
																<div class="i-div">
																		<img src="@/common/images/icon/icon_detail.png" alt=""
																				 class="operation_img">
																</div>
																<span style="word-break: keep-all;">查看</span>
														</div>
														<!-- 编辑 -->
														<div class="small-Idiv"
																 @click="edit(scope.row.id)" v-permit="'freightRules:update'">
																<div class="i-div">
																		<img src="@/common/images/icon/icon_edit.png" alt="" class="operation_img">
																</div>
																<span style="word-break: keep-all;">编辑</span>
														</div>
														<!-- 删除 -->
														<div class="small-Idiv"
																 @click="deleteLine(scope.row.id)" v-permit="'freightRules:delete'">
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
						<div class="pagination">
								<el-pagination
										@size-change="handleSizeChange"
										@current-change="handleCurrentChange"
										:current-page="listQuery.pageIndex"
										:page-sizes="[10, 30, 50, 100]"
										:page-size="listQuery.pageSize"
										layout="total, sizes, prev, pager, next, jumper"
										:total="total">
								</el-pagination>
						</div>
						<!-- 删除运费模板 -->
						<el-dialog title="删除" :visible.sync="deleteTemplateDialog" width="30%">
							<el-form label-width="100px">
								<el-form-item label="删除原因:">
									<el-input v-model="deleteTemplateRemark" type="textarea"></el-input>
								</el-form-item>
							</el-form>
							<span slot="footer" class="dialog-footer">
								<el-button type="danger" @click="deleteTemplateDialog = false" size="small">取 消</el-button>
								<el-button type="primary" @click="confirmDeleteTemplate()" size="small">确 定</el-button>
							</span>
						</el-dialog>

						<!-- 删除 -->
						<el-dialog title="删除" :visible.sync="deleteDialog" width="30%">
							<el-form label-width="100px">
								<el-form-item label="删除原因:">
									<el-input v-model="deleteRemark" type="textarea"></el-input>
								</el-form-item>
							</el-form>
							<span slot="footer" class="dialog-footer">
								<el-button type="danger" @click="deleteDialog = false" size="small">取 消</el-button>
								<el-button type="primary" @click="confirmDelete()" size="small">确 定</el-button>
							</span>
						</el-dialog>
						<!-- 导入运费计算模板对话框 -->
						<el-dialog title="导入运费计算模板商品" :visible.sync="importDialog" width="35%">
							<div class="mbottom">
								<div class="goods-fitter">
									<el-form label-width="110px" size="small">
										<el-row :gutter="10">
												<el-col :span="24" style="display: flex;flex-direction: column;align-items: center">
													<div style="display: flex;flex-direction: column;align-items: flex-end">
														<el-form-item label="运费计算模板:">
															<div style="display: flex">
																<a class="downLink" :href="`${this.baseUrl1}/api/open/b/b2b2c/orderservice/freight/maige/export_template.json`">下载表格模板</a>
																<el-button type="primary" size="mini" @click="up_loadTemplate">选择文件上传
																</el-button>
																<div slot="tip" class="el-upload__tip" v-if="this.file">{{file.name}}</div>
																<input type="file" name="file" multiple="multiple" id="filElem" ref="filElem" @change="getFile" style="display: none;"/>
															</div>
														</el-form-item>
														<el-form-item label="选择快递公司:">
															<el-select v-model="couriercompanyValue" filterable placeholder="请选择" @change="changeCompany">
																<el-option
																	v-for="item in couriercompany"
																	:key="item.id"
																	:label="item.expressName"
																	:value="item.id">
																</el-option>
															</el-select>
														</el-form-item>
														<div style="display: flex;justify-content: flex-end;margin-right: 200px;">
															<span>没有查到快递公司?去</span>
															<span style="color: #4c86f4" @click="addCouriercompany">新增</span>
														</div>
													</div>
												</el-col>
											</el-row>
									</el-form>
								</div>
							</div>
							<span slot="footer" class="dialog-footer">
                      <el-button type="danger" @click="importDialog = false" size="small">取 消</el-button>
                      <el-button type="primary" @click="confirmImport()" size="small">确 定</el-button>
								</span>
						</el-dialog>
				</div>
		</div>
</template>

<script>
    import {
  getList,
  deleteCourier,
  deleteTemplate,
  importTemplateFile
} from "@/api/order/index";
    export default {
        data() {
            return {
                list: [],//表格数据源
                total: 10,
                listQuery: {
                    pageIndex: 1, // 当前页
                    pageSize: 10, // 每页展示量
                },
                importDialog: false,//导入对话框
                importForm: {},
				couriercompanyValue: '',//快递公司绑定值
				couriercompany: [],//选择快递公司
				fileList: [],
				file: '',
				companyId: '',
				deleteDialog: false,
				deleteTemplateDialog: false,
				deleteRemark: '',
				deleteTemplateRemark: '',
				reportIds: '',
				templateIds: ''
            }
        },
        created() {
			this.getList();
			this.choose();
        },
        methods: {
            //新增模板
            addTemplate(id) {
                this.$router.push({
                    name: 'addTemplate', query: {
                        id: id
                    }
                })
			},
			//查看模板
			queryTemplate(id){
                this.$router.push({
                    name: 'queryTemplate', query: {
                        id: id
                    }
                })
			},
            //新增快递公司
            addCouriercompany() {
                this.$router.push({name: 'addCouriercompany'})
            },
            //导入运费模板
            importTemplate() {
                this.importDialog = true
			},
            //选择文件上传
            up_loadTemplate() {
                this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
			},
			getFile() {
                var that = this;
				const inputFile = this.$refs.filElem.files[0];

				this.file = inputFile;
			},
            //确定导入
            confirmImport() {
				var formData = new FormData();
				formData.append('multipartFile', this.file);
				formData.append('id', this.companyId);
				console.log(formData)
				console.log(formData.get("multipartFile"));
				importTemplateFile(formData)
				.then(res => {
					if(res.code === 200){
						this.$message({
							message: '运费计算模板导入成功',
							type: 'success'
						});
						this.importDialog = false;
						this.getList();
					}
				})
			},
			//监听快递公司
			changeCompany(val){
				// console.log(val)
				this.companyId = val;
			},
			//选择快递公司
			choose() {
                const obj = {
					index: 1,
					pageSize: 100
				};
				getList(obj)
				.then(res => {
					if(res.code === 200){
						this.couriercompany = res.data;
					}
				})
			},
			//删除模板
			deleteTemplate(id){
				// console.log(id)
				this.deleteTemplateDialog = true;
				this.templateIds = id;
			},
			confirmDeleteTemplate(){
                deleteTemplate(this.templateIds)
				.then(res => {
					if(res.code === 200){
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.deleteTemplateDialog = false;
						this.getList()
					}
				})
			},
            //详情按钮
            detail(id) {
                this.$router.push({name: 'freightRulesDetail',query:{id:id}})
            },
            //编辑按钮
            edit(id) {
                this.$router.push({name: 'freightRulesAddEdit',query:{id:id}})
            },
            //删除按钮
            deleteLine(id) {
				console.log(id)
				this.reportIds = id;
				this.deleteDialog = true;
			},
			confirmDelete(){
                deleteCourier(this.reportIds)
				.then(res => {
					if(res.code === 200){
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.deleteDialog = false;
						this.getList();
					}
				})
			},
			//获取数据
			getList() {
                const obj = {
					index: this.listQuery.pageIndex,
					pageSize: this.listQuery.pageSize
				};
				getList(obj)
				.then(res => {
					if(res.code === 200){
						this.list = res.data;
					}
				})
			},
            //页容量改变
            handleSizeChange(val) {
                this.listQuery.pageSize = val
                this.getList()
            },
            //当前页改变
            handleCurrentChange(val) {
                this.listQuery.pageIndex = val
                this.getList()
            },
        }
    }
</script>

<style scoped>
.downLink{
	width: 104px;
	height: 34px;
	text-align: center;
	line-height: 34px;
	display: block;
	font-size: 12px;
    border-radius: 3px;
	background: #4C86F4;
	color: #FFF;
}
.mbottom >>> .el-form-item--small{
	width: 560px;
}
</style>
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
				width: 55px;
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

</style>
