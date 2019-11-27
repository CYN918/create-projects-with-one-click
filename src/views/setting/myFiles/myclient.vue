<comment>
		#客户
</comment>
<template>
		<div class="margin">
				<div class="mcard">
						<el-table :data="tableData" border style="width: 100%" stripe @selection-change="handleSelectionChange"
											stripe>
								<el-table-column prop="customerSn" label="客户编码" align="center"></el-table-column>
								<el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
								<el-table-column prop="customerType" label="客户类型" align="center">
										<template slot-scope="scope">
												<span v-if="scope.row.customerType == 1">全部</span>
												<span v-if="scope.row.customerType == 2">直接客户</span>
												<span v-if="scope.row.customerType == 3">分销商</span>
												<span v-if="scope.row.customerType == 4">分销商客户</span>
										</template>
								</el-table-column>
								<el-table-column prop="commonContactName" label="联系人" align="center"></el-table-column>
								<el-table-column prop="commonContactDept" label="部门" align="center"></el-table-column>
								<el-table-column prop="commonContactPhone" label="手机号码" align="center"></el-table-column>
								<el-table-column prop="commonContactTel" label="办公电话" align="center"></el-table-column>
								<el-table-column prop="commonContactQq" label="QQ" align="center"></el-table-column>
								<el-table-column prop="leaderContactName" label="部门领导" align="center"></el-table-column>
								<el-table-column prop="leaderContactPhone" label="领导手机号" align="center"></el-table-column>
								<el-table-column label="操作" align="center" fixed="right" width="150">
										<template slot-scope="scope">
												<div class="line-div">
														<div class="small-Idiv" @click="detail(scope.row.customerId,1)">
																<div class="i-div fuzhi">
																		<img src="../../../common/images/icon/查看详情.png" alt class="operation_img"/>
																</div>
																<span style="word-break: keep-all;">详情</span>
														</div>
														<div class="small-Idiv" @click="editor(scope.row.customerId,2)">
																<div class="i-div">
																		<img src="../../../common/images/icon/编辑.png" alt class="operation_img"/>
																</div>
																<span>编辑</span>
														</div>
												</div>
										</template>
								</el-table-column>
						</el-table>
				</div>
		</div>
</template>

<script>
 import { getAllcustomer, getCustomerLevel , getCustomersoure , application,customerDetailByid } from '@/api/customer/index'
    export default {
        name: "myclient",
        components: {
        },
        data() {
            return {
                black: '',
                reason: '',//加入黑名单原因
                blackList: false,//黑名单
                blackListSe: [],//黑名单信息
                form: {
                    customerSource: '', //客户来源
                    customerLevel: '',  //客户等级
                    customerStatus: '', //状态
                    salesRepresentative: '', //销售员
                    createTimeStart: '',
                    createTimeEnd: '',
                    createTime: ''
                },
                customerSource: [],
                customerLevel: [],
                searchpe: '',
                customerSourceValue: '',
                customerLevelValue: '',
                value: '',
                input: '',
                currentIndex: 0,
                storeManagerId: '0',
                tableData: [],
            }
        },
        created() {
            this.getcookie()
        },
        methods: {
            getcookie() {
                let {data} = JSON.parse(localStorage.getItem('user'))
                console.log(777, data)
                customerDetailByid(data.correlativeUserId).then(res => {
                    if (res.code == 200) {
                        // this.form=Object.assign({},res.data)
                        let {data} = res
                        let arr = []
                        arr.push(data)
                        // this.tableData = [...data]
                        this.tableData = JSON.parse(JSON.stringify(arr))

                    }
                })
            },
            editor(id, state) {
                this.$router.push({name: "myclientadd", query: {id: id, state: state}});
            },
            detail(id, state) {
                this.$router.push({name: "myclientdetail", query: {id: id, state: state}});
            },
        }

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
				width: 310px;
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
				justify-content: space-evenly;
				margin-top: 5px;
		}

		.small-Idiv {
				width: 32px;

				span {
						margin-top: 3px;
						font-size: 12px;
						font-family: MicrosoftYaHei;
						font-weight: 400;
						color: rgba(72, 73, 77, 1);
				}
		}

		.small_top {
				margin-top: 10px;
				margin-left: 19px;
				margin-right: 15px;
		}
</style>
