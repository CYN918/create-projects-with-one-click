<template>
		<div class="margin">
				<div class="mbottom">
						<div class="goods-fitter">
								<div class="search-wrapper1">
										<el-page-header @back="back" :content="text"></el-page-header>
								</div>
						</div>
				</div>
				<!--详情-->
				<div class="mbottom">
						<div class="goods-fitter">
								<el-form ref="form" :model="form" label-width="120px" size="small">
										<div class="search-wrapper">
												<h4 class="title">提报商品申请清单</h4>
												<br/>
												<el-row :gutter="10">
														<el-col :span="6">
																<el-form-item label="提报单号:" style="width:70%">
																		{{form.reportSn}}
																</el-form-item>
														</el-col>
														<el-col :span="6">
																<el-form-item label="联系电话:" style="width:70%">
																		{{form.contactPhone}}
																</el-form-item>
														</el-col>
														<el-col :span="6">
																<el-form-item label="申请人员:" style="width:70%">
																		{{form.userName}}
																</el-form-item>
														</el-col>
														<el-col :span="6">
																<el-form-item label="联系人员:" style="width:70%">
																		{{form.contactUser}}
																</el-form-item>
														</el-col>
												</el-row>
												<el-row :gutter="10">
														<el-col :span="6">
																<el-form-item label="公司名称:" style="width:70%">
																		{{form.companyName}}
																</el-form-item>
														</el-col>
														<el-col :span="18">
																<el-form-item label="申请说明:" style="width:90%">
																		{{form.applyDescription}}
																</el-form-item>
														</el-col>
												</el-row>
										</div>
								</el-form>
						</div>
				</div>
		</div>
</template>

<script>
    import {getTellGoodsNoticeList} from '@/api/tellGoods/index'

    export default {
        name:'tellGoodsNoticeDetail',
        data() {
            return {
                text: "提报公告 > 详情",
                form: {
                    companyName: '',//公司名称
                    applyDescription: '',//提报要求
                    reportSn: '',//提报单号
                    userId: '',
                    contactPhone: '',//联系电话
                    userName: '',//申请人员
                    contactUser: '',//联系人员
                    department: '',//部门
                    expirationTime: '',//提报截止时间
                    reportNum: '',
                },
                reportId: ''

            }
        },
        created() {
            if (this.$route.query.reportId) {
                this.reportId = this.$route.query.reportId
            }
        },
        methods: {
            getDetail() {
                getTellGoodsNoticeList(this.reportId).then(res => {
                    if (res.code == 200) {
                        this.form = Object.assign({}, res.data)
                    }
                })
            },
            //返回上一步
            back() {
                this.$router.go(-1);
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
				margin-left: 20px;
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

		.btn {
				margin-left: 42%;
				margin-top: 10px;
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

		.small-Idiv {
				float: left;
				margin: 5px 4px;
				cursor: pointer;
				width: 71px;
		}
</style>
