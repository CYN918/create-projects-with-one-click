<template>
		<div class="margin" style="min-width: 1300px">
				<div class="mbottom">
						<div class="goods-fitter">
								<el-form label-width="100px" size="small">
										<div class="search-wrapper">
												<h4 class="title" style="margin-left: -20px;">运费设置</h4>
												<div class="search-base">
												</div>
										</div>
								</el-form>
						</div>
				</div>
				<div class="mcard">
						<el-row :gutter="10" style="margin-bottom: 30px">
								<el-col :span="8" style="display: flex;justify-content: flex-start">
										<el-button type="primary" size="small" @click="addFreightTemplate" v-permit="'freightSet:add'">
												新增运费模板
										</el-button>
								</el-col>
						</el-row>
						<ul v-if="list&&list.length>0">
								<li v-for="(item,index) in list">
										<el-row :gutter="10" style="margin-bottom: 20px;display: flex;position: relative">
												<h4 class="title">{{item.templateName}}</h4>
												<div style="position: absolute;right: 15px;">
														<el-button type="success" size="small" @click="detailTemplate(item.id)"
																			 style="margin-right: 10px">详情
														</el-button>
														<el-button type="primary" size="small" @click="editTemplate(item.id)"
																			 v-permit="'freightSet:update'" style="margin-right: 10px">修改
														</el-button>
														<el-button type="danger" size="small" @click="deleteTemplate(item.id,4)"
																			 v-permit="'freightSet:delete'">删除
														</el-button>
												</div>
										</el-row>
										<el-table :data="item.freightCalculate" border style="width: 100%;margin-bottom: 40px" stripe>
												<el-table-column prop="model" label="快递方式" align="center" width="100"></el-table-column>
												<el-table-column prop="goodsAddress" label="发货地" align="center" width="150">
														<span v-if="item.goodsAddress.addressName">
																{{item.goodsAddress.addressName+' '+item.goodsAddress.childAddress[0].addressName }}
														</span>
												</el-table-column>
												<el-table-column label="运送到" align="center">
														<template slot-scope="scope">
																<!--<div v-for="(item2,index2) in scope.row.freightAddress">
																		<div v-for="(item3,index3) in item2.childAddress">
																				<span>{{item2.addressName+' '+item3.addressName}}</span>
																		</div>
																</div>-->
																<el-tooltip placement="top" effect="light">
																		<div slot="content" style="width: 800px;line-height: 24px;font-size: 14px;">
																				{{scope.row.freightAddress2}}
																		</div>
																		<span class="idNick_cs">{{scope.row.freightAddress2}}</span>
																</el-tooltip>
														</template>
												</el-table-column>
												<el-table-column prop="firstUnit" :label="item.label1" align="center"
																				 width="100"></el-table-column>
												<el-table-column prop="firstCharge" label="运费(元)" align="center" width="100"></el-table-column>
												<el-table-column prop="continueUnit" :label="item.label2" align="center"
																				 width="100"></el-table-column>
												<el-table-column prop="continuePrice" label="运费(元)" align="center"
																				 width="100"></el-table-column>
										</el-table>
								</li>
						</ul>
						<ul v-else style="text-align: center">
								<li>暂无运费模板</li>
						</ul>
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
				</div>
				<!-- 删除 -->
				<el-dialog title="删除" :visible.sync="dialogDelete" width="40%">
						<el-form :model="form" label-width="100px">
								<el-form-item label="删除原因:" prop="deleteRemark">
										<el-input v-model="form.deleteRemark" type="textarea"></el-input>
								</el-form-item>
						</el-form>
						<span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogDelete = false" size="small">取 消</el-button>
        <el-button type="primary" @click="deleteTemplate(false,5)" size="small">确 定</el-button>
      </span>
				</el-dialog>
		</div>
</template>

<script>
    import {deletefreightSetTemplate, getFreightSetList} from '@/api/order/index'

    export default {
        data() {
            return {
                list: null,//表格数据源
                label1: '首个(个)',
                label2: '续件(个)',
                total: 10,
                listQuery: {
                    pageIndex: 1, // 当前页
                    pageSize: 10, // 每页展示量
                },
                form: {
                    deleteRemark: ''//删除原因
                },
                dialogDelete: false,//删除对话框
                userId: '',
                templateId: '',
                freightAddress: ''
            }
        },
        created() {
            // this.getUser()
            this.getList()
        },
        methods: {
            //获取当前用户id
            getUser() {
                var userData = JSON.parse(localStorage.getItem("user"));
                this.userId = userData.data.sysuserId
            },
            //获取表格数据
            async getList() {
                // this.listQuery.merchantId=this.userId
                await getFreightSetList(this.listQuery).then(res => {
                    if (res.code === 200) {
                        this.list = res.data
                        this.list = this.list.map(v => {
                            this.$set(v, 'label1', '首件')
                            this.$set(v, 'label2', '续件')
                            return v
                        })
                        this.list.forEach(item => {
                            if (item.valuationMode == 1) {
                                this.$nextTick(() => {
                                    item.label1 = '首件'
                                    item.label2 = '续件'
                                })
                            } else if (item.valuationMode == 2) {
                                this.$nextTick(() => {
                                    item.label1 = '首重'
                                    item.label2 = '续重'
                                })
                            } else if (item.valuationMode == 3) {
                                this.$nextTick(() => {
                                    item.label1 = '首体积'
                                    item.label2 = '续体积'
                                })
                            }
                            // if (item.freeShipping&&item.freeShipping.length>0){
                            //     item.freeShipping=item.freeShipping.map(i=>{
                            //         const data1={
                            //
                            // 				}
                            //         return data1
                            // 		})
                            // }

                            item.freightCalculate.forEach(item2 => {
                                if (item2.model == 1) {
                                    item2.model = '快递'
                                } else if (item2.model == 2) {
                                    item2.model = 'EMS'
                                } else if (item2.model == 3) {
                                    item2.model = '平邮'
                                } else if (item2.model == 4) {
                                    item2.model = '顺丰'
                                } else if (item2.model == 5) {
                                    item2.model = '指定条件包邮'
                                }
                                if (item2.freightAddress && item2.freightAddress.length > 0) {
                                    this.$set(item2, 'freightAddress2', [])
                                    item2.freightAddress.forEach(item3 => {
                                        item3.childAddress.forEach(item4 => {
                                            if (item2.freightAddress2 && item2.freightAddress2.length > 0) {
                                                item2.freightAddress2 = item2.freightAddress2 + ' , ' + item3.addressName + ' ' + item4.addressName
                                            } else {
                                                item2.freightAddress2 = item3.addressName + ' ' + item4.addressName
                                            }
                                        })
                                    })
                                }

                            })
                        })

                        /*<div v-for="(item2,index2) in scope.row.freightAddress">
																<div v-for="(item3,index3) in item2.childAddress">
																<span>{{item2.addressName+' '+item3.addressName}}</span>
												</div>
												</div>*/
                    }
                })
            },
            //添加运费模板
            addFreightTemplate() {
                this.$router.push({name: 'freightSetAdd', query: {type: 1}})
            },
            //详情
            detailTemplate(id) {
                this.$router.push({name: 'freightSetDetail', query: {type: 3, id: id}})
            },
            //修改
            editTemplate(id) {
                this.$router.push({name: 'freightSetEdit', query: {type: 2, id: id}})
            },
            //删除
            deleteTemplate(val, state) {
                console.log(666, val);

                if (state == "4") {
                    this.templateId = val;
                    // console.log(777, this.id);
                    this.dialogDelete = true;
                }
                if (state == "5") {
                    let obj = {};
                    // obj.merchantId = this.userId;
                    obj.templateId = this.templateId;
                    deletefreightSetTemplate(obj).then(res => {
                        if (res.code == 200) {
                            this.dialogDelete = false;
                            this.getList();
                            this.$message({
                                message: res.message,
                                type: "success"
                            });
                        }
                    });
                }
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
								margin-left: -14px;
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

		/deep/ .title {
				margin-left: -14px;
		}

		.t1 {
				display: inline-block;
				font-size: 15px;
				height: 36px;

				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
		}

		.idNick_cs {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
		}

</style>

