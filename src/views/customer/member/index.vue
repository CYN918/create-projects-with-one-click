<template>
		<div class="margin">
				<div class="mbottom">
						<div class="goods-fitter">
								<el-form label-width="100px" size="small">
										<div class="search-wrapper">
												<h4 class="title">搜索条件</h4>
												<div class="search-base">
														<el-row>
																<el-col :span="5">
																		<el-col>
																				<el-form-item label="客户：">
																						<el-col :span="23">
																								<el-input v-model="listQuery.keywords"
																													placeholder="请输入客户名称/电话"></el-input>
																						</el-col>
																				</el-form-item>
																		</el-col>
																</el-col>
																<el-col :span="9">
																		<el-form-item label="新增时间：">
																				<el-col :span="22">
																						<el-date-picker
																								style="width:100%"
																								type=daterange
																								valueFormat='yyyy-MM-dd HH:mm:ss'
																								v-model="listQuery.createTime"
																								range-separator="至"
																								start-placeholder="开始日期"
																								end-placeholder="结束日期">
																						</el-date-picker>
																				</el-col>
																		</el-form-item>
																</el-col>
																<el-col :span="1" class="btn_right">
																		<el-button type="primary" size="small" @click.native='searchData'>查询</el-button>
																</el-col>
														</el-row>

												</div>
										</div>
								</el-form>
						</div>
				</div>
				<div class="mcard" style="border: 1px solid #d7e0f1;">

						<el-table :data="dataArr" border style="width: 100%" stripe>
								<el-table-column prop="customerSn" label="客户编码" align="center"></el-table-column>
								<el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
								<el-table-column prop="" label="项目名称" align="center"></el-table-column>
								<el-table-column prop="" label="部门" align="center"></el-table-column>
								<el-table-column prop="commonContactName" label="姓名" align="center"></el-table-column>
								<el-table-column prop="commonContactTel" label="联系电话" align="center"></el-table-column>
								<el-table-column prop="commonContactPhone" label="手机号码" align="center"></el-table-column>
								<el-table-column prop="" label="收货地址" align="center"></el-table-column>
								<el-table-column prop="commonContactQq" label="邮箱" align="center"></el-table-column>
								<el-table-column prop="customerType" label="服务商" align="center"></el-table-column>
								<el-table-column prop="salesRepresentative" label="销售员" align="center"></el-table-column>
								<el-table-column prop="createTime" label="新增时间" align="center"></el-table-column>
								<el-table-column prop="updateTime" label="最后更新时间" align="center"></el-table-column>
						</el-table>
						<div class="pagination">
								<el-pagination
										@size-change="handleSizeChange"
										@current-change="handleCurrentChange"
										:current-page="listQuery.currentPage"
										:page-sizes="pageSizes"
										:page-size="listQuery.pagesize"
										layout="total, sizes, prev, pager, next, jumper"
										:total="total">
								</el-pagination>
						</div>
						<!-- 删除 -->
						<el-dialog
								title="删除"
								:visible.sync="deleteCustomer"
								width="30%"
						>
								<el-form :model="form" label-width="100px">
										<el-form-item label="删除原因:">
												<el-input type="textarea"></el-input>
										</el-form-item>
										<el-form-item label="上级领导审核:">
												<el-select v-model="form.region" placeholder="请选择">
														<el-option label="销售总监" value="0"></el-option>
														<el-option label="采购经理" value="1"></el-option>
												</el-select>
										</el-form-item>
								</el-form>
								<span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="deleteCustomer = false" size="small">取 消</el-button>
        <el-button type="primary" @click="deleteCustomer = false" size="small">确 定</el-button>
      </span>
						</el-dialog>
						<!-- 删除 -->
				</div>
				<!-- <div class="mcard0" style="padding:20px 0 0 20px;margin-left:20px;">
						<div class="msetting-account-wrapper" style="margin-left: -40px;">
								<div class="tabs-header">
										<ul class="clearfix">
												<li @click="tabIndex(0)" :class="currentIndex===0 ? 'active' : ''">往期订单</li>
												<li @click="tabIndex(1)" :class="currentIndex===1 ? 'active' : ''">跟踪记录</li>
										</ul>
								</div>
								<div class="tabs-content">
										<component :is="mainIndex"></component>
								</div>
						</div>
				</div> -->
		</div>
</template>

<script>
    import {getAllcustomer} from '@/api/customer/index'
    import AccountOrder from './oreder'
    import AccountRecord from './record'

    export default {
        components: {
            AccountOrder,
            AccountRecord,
        },
        data() {
            return {
                mainIndex: 'AccountOrder',
                dataArr: [],
                deleteCustomer: false, //删除
                form: {
                    customerStatus: '', //状态
                    // createTimeStart: '',
                    // createTimeEnd: '',
                },
                searchpe: '',
                options: [{
                    value: '选项1',
                    label: '一般客户'
                }, {
                    value: '选项2',
                    label: '重要客户'
                }, {
                    value: '选项3',
                    label: '待开发客户'
                }, {
                    value: '选项4',
                    label: '500强客户'
                }, {
                    value: '选项5',
                    label: '朋友介绍的客户'
                }],
                value: '',
                input: '',
                currentIndex: 0,
                storeManagerId: '0',
                roleList: [],
                listQuery: {
                    currentPage: 1,
                    pagesize: 10,
                    keywords: '',//客户
                    createTime: [],//时间
                },
                pageSizes: [10, 20, 50, 100],
                total: 10
            }
        },
        created() {
            this._getAllcustomer();
        },
        computed: {},
        methods: {
            tabIndex(index) {
                this.currentIndex = index
                switch (index) {
                    case 0:
                        this.mainIndex = "AccountOrder";
                        break;
                    case 1:
                        this.mainIndex = "AccountRecord";
                        break;
                }
            },
            toRole() {
                this.currentIndex = 1
                this.storeManagerId = id
            },
            addData() {
                this.$router.push({name: 'AddCustomer'})
            },
            editor(id, state) {
                this.$router.push({name: "AddCustomer", query: {id: id, state: state}});
            },
            detail(id, state) {
                this.$router.push({name: "DetailCustomer", query: {id: id, state: state}});
            },
            searchData() {
                // if (slt) {
                //     this.tableData.currentPage = 1;
                // }
                this._getAllcustomer()
            },
            _getAllcustomer() {
                let obj = {};
                obj.pageNum = this.listQuery.currentPage;
                obj.pageSize = this.listQuery.pagesize;
                obj.keywords = this.listQuery.keywords;
                console.log(999, this.listQuery)
                if (this.listQuery.createTime) {
                    obj.createTimeStart = this.listQuery.createTime[0]
                    obj.createTimeEnd = this.listQuery.createTime[1]
                }
                getAllcustomer(obj).then((res) => {
                    console.log(res)
                    this.total = res.data.total;
                    this.dataArr = res.data.list;
                })
            },
            handleSizeChange(val) {
                this.tableData.size = val;
                this._getAllcustomer()
            },
            handleCurrentChange(val) {
                this.tableData.currentPage = val;
                this._getAllcustomer()
            },

        },

    }
</script>

<style lang="scss" scoped>
		@import "@/common/scss/variable.scss";

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
								color: 3333;
								padding-left: 10px;
								line-height: 1.4;
								border-left: 4px solid $themeColor;
								margin-bottom: 10px;
						}

						.search-main {
						}

						.search-base {
								.btn_right {
										margin-left: 10px
								}
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

		.goods-list-wrapper {
				margin-top: 20px;
		}

		.el-transfer-panel__header {
				background: $themeColor;
				color: #fff;
		}

		.item {
				line-height: 1.5;
				padding: 8px 10px;
				cursor: pointer;

				&:hover {
						color: $themeColor;
				}

				&.active {
						background: #c6e2ff;
						color: #fff;
				}
		}

		.image {
				cursor: pointer;
		}

		.item-name {
				cursor: pointer;

				&:hover {
						color: $themeColor;
				}
		}

		.el-icon-arrow-right {
				margin: 0 20px;
		}

		.store {
				width: 155px;
		}

		.red {
				color: $themeSubColor;
		}

		.transfer-wrapper {
				text-align: center;
		}

		.panel-wrapper {
				text-align: left;
				margin: 0;
				padding: 6px 0;
				list-style: none;
				height: 246px;
				overflow: auto;
				box-sizing: border-box;
		}

		.dialog-footer {
				margin-top: 20px;
				text-align: right;
		}

		.detail {
				font-size: 14px;
				color: #606266;
		}

		.line-div {
				display: flex;
				justify-content: space-between;
		}

		.small_top {
				margin-top: 10px;
				margin-left: 19px;
				margin-right: 15px;
		}
</style>

