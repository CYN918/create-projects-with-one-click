<template>
		<div class="margin">
				<div class="mbottom">
						<div class="goods-fitter">
								<div class="search-wrapper">
										<el-page-header @back="back" :content="text"></el-page-header>
										<el-button
												type="primary"
												icon="el-icon-plus"
												class="newAdd"
												@click.native="addGrade()"
										>新建服务
										</el-button>
								</div>

						</div>
				</div>
				<div class="mcard" style="border: 1px solid #d7e0f1;">
						<el-table :data="list" border style="width: 100%" stripe>
								<el-table-column prop="a" label="经销商名称" align="center"></el-table-column>
								<el-table-column prop="b" label="服务等级" align="center"></el-table-column>
								<el-table-column prop="" label="服务应用" align="center"></el-table-column>
								<el-table-column prop="" label="服务项目" align="center"></el-table-column>
								<el-table-column prop="" label="费用" align="center"></el-table-column>
								<el-table-column prop="" label="销售人员" align="center"></el-table-column>
								<el-table-column prop="" label="服务时间" align="center"></el-table-column>
								<el-table-column prop="" label="状态" align="center"></el-table-column>
								<el-table-column prop="" label="支付时间" align="center"></el-table-column>
								<el-table-column prop="c" label="操作" align="center" fixed="right" width="150">
										<template slot-scope="scope">
												<el-button @click="handleClick(scope.row,scope.$index)" type="text">详情</el-button>
												<el-button type="text" @click="agreementClick(scope.row,scope.$index)">服务协议</el-button>
										</template>
								</el-table-column>
						</el-table>
						<div class="pagination">
								<el-pagination
										@size-change="handleSizeChange"
										@current-change="handleCurrentChange"
										:current-page="tableData.currentPage"
										:page-sizes="tableData.sizes"
										:page-size="tableData.size"
										layout="total, sizes, prev, pager, next, jumper"
										:total="tableData.total">
								</el-pagination>
						</div>
				</div>
		</div>
</template>

<script>
    import {} from "@/api/service";
    export default {
        name: "Payhistory",
        data() {
            return {
                text: "服务中心>等级管理>支付记录",
                list: null,
                tableData: {
                    currentPage: 1,
                    sizes: [10, 20, 50, 100],
                    size: 10,
                    total: 0,
                },
            }
        },
        created() {
            this.getList()
        },
        methods: {
            //获取列表
            getList() {

            },
						//详情
            handleClick(row,index){

						},
						//服务协议
            agreementClick(){

						},
            //返回
            back() {
                this.$router.go(-1);
            },
            handleSizeChange(val) {
                this.tableData.size = val;
                this.getList()
            },
            handleCurrentChange(val) {
                this.tableData.currentPage = val;
                this.getList()
            },
        }

    }
</script>


<style lang="scss" scoped>
		@import "@/common/scss/variable.scss";

		.goods-fitter {
				.search-wrapper1 {
						padding: 20px;
						border: 1px solid rgb(215, 224, 241);
						background: #fff;
						display: flex;
						align-items: center;

						.title1 {
								display: flex;
								margin-left: 35%;
						}
				}

				.line_div {
						margin-left: 5px;
						margin-right: 5px;
						margin-top: 10px;
						margin-bottom: 10px;
						height: 1px;
						border: 1px solid #ebf4fe;
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
						max-width: 130px;
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

		.my-radio_style {
				text-align: center;
		}

		.goods-list-wrapper {
				margin-top: 20px;
		}

		.el-transfer-panel__header {
				background: $themeColor;
				color: #fff;
		}

		.dialog-footer {
				margin-top: 20px;
				text-align: right;
		}

		.btn {
				margin-left: 550px;
				margin-top: 20px;
		}

		.introduce {
				color: #97999f;
				font-size: 90%;
		}

		.avatar-uploader .el-upload {
				border: 1px dashed #d9d9d9;
				border-radius: 6px;
				cursor: pointer;
				position: relative;
				overflow: hidden;
		}

		.avatar-uploader .el-upload:hover {
				border-color: #409eff;
		}

		.avatar-uploader-icon {
				font-size: 28px;
				color: #8c939d;
				width: 80px;
				height: 80px;
				line-height: 178px;
				text-align: center;
		}

		.avatar {
				width: 80px;
				height: 80px;
				// display: block;
		}

		.upload {
				position: absolute;
				margin-left: 60px;
				margin-top: 45px;
		}

		.tip {
				color: #c5c6cb;
		}

		/*.btn {*/
		/*		margin-left: 42%;*/
		/*		margin-top: 10px;*/
		/*}*/

		.avatar-uploader .el-upload {
				border: 1px dashed #d9d9d9;
				border-radius: 6px;
				cursor: pointer;
				position: relative;
				overflow: hidden;
		}

		.avatar-uploader .el-upload:hover {
				border-color: #409eff;
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

		.newAdd {
				position: absolute;
				right: 80px;
				top: 34px;
				border-radius: 5px;
		}

		input[type=radio] {
				visibility: hidden;
				position: absolute;
		}

		.my-radio {
				position: relative;
				display: inline-block;
				padding: 5px 4px;
				/*height: 34px;*/
				line-height: 34px;
				/*background: rgba(255, 255, 255, 1);*/
				/*border: 1px solid rgba(204, 204, 204, 1);*/
				margin-right: 10px;
				cursor: pointer;
				/*height: 82px;*/
				/*width: 209px;*/
				height: 91px;
				width: 217px;
		}

		input[type=radio]:checked + .my-radio {
				background: rgb(255, 63, 43);
				color: #fff;
		}

		input[type=radio]:checked + .my-radio:after {
				position: absolute;
				bottom: 0;
				right: 0;
				display: inline-block;
				content: "";
				width: 0px;
				height: 0px;
				border-bottom: 15px solid rgb(255, 63, 43);
				border-right: 15px solid rgb(255, 63, 43);
				border-top: 15px solid transparent;
				border-left: 15px solid transparent;
		}

		input[type=radio]:checked + .my-radio:before {
				position: absolute;
				bottom: 6px;
				right: 3px;
				display: inline-block;
				content: "";
				width: 13px;
				height: 7px;
				border-bottom: 2.5px solid #fff;
				border-left: 2.5px solid #fff;
				z-index: 1;
				transform: rotate(-45deg);
		}


</style>
