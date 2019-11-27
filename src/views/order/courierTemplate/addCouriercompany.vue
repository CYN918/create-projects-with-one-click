<template>
		<div class="margin" style="height: 100%">
				<div class="mbottom">
						<div class="goods-fitter">
								<div class="search-wrapper1">
										<el-page-header @back="back" :content="text"></el-page-header>
								</div>
						</div>
				</div>
				<div class="mbottom" style="height: 100%">
						<div class="goods-fitter" style="height: 100%">
								<div class="search-wrapper1" style="display: flex;align-items: flex-start;flex-direction: column">
										<el-form ref="form" :model="form" label-width="120px">
												<el-form-item label="快递公司:">
														<el-input v-model="form.expressName" placeholder="请输入快递公司" size="small"
																			style="width: 312px"></el-input>
												</el-form-item>
												<el-form-item label="快递编码:">
														<el-input v-model="form.expressCode" placeholder="请输入快递编码" size="small"
																			style="width: 312px"></el-input>
												</el-form-item>
												<el-form-item label="公司网址:">
														<el-input v-model="form.expressUrl" placeholder="请输入公司地址" size="small"
																			style="width: 312px"></el-input>
												</el-form-item>

												<el-form-item label="轻抛系数:">
														<el-input v-model="form.coefficient" placeholder="请输入轻抛系数" size="small"
																			style="width: 312px"></el-input>
												</el-form-item>
												<el-form-item label="保价费比例(%):">
														<el-input v-model="form.offerRatio" placeholder="请输入保价费比例" size="small"
																			style="width: 312px"></el-input>
												</el-form-item>
												<el-form-item label="公司介绍:">
														<el-input v-model="form.info" placeholder="请输入公司介绍" size="small"
																			style="width: 312px" type="textarea"></el-input>
												</el-form-item>
										</el-form>
										<div style="display: flex;justify-content: flex-start;margin-left: 180px">
												<el-button type="danger" size="small" @click="cancel">取消</el-button>
												<el-button type="primary" size="small" @click="newAdd">新增</el-button>
										</div>

								</div>
						</div>
				</div>
		</div>
</template>

<script>
import { 
  saveCourier
} from "@/api/order/index";
    export default {
        data() {
            return {
                text: "运费规则 > 添加快递公司",
                form: {
                    coefficient: '',
                    expressCode: '',
                    expressName: '',
                    expressUrl: '',
                    info: '',
                    offerRatio: ''
                }
            }
        },
        created() {
        },
        methods: {
            //返回上一步
            back() {
                this.$router.go(-1);
			},
			//取消
			cancel() {
				this.$message('您取消了新增');
			},
			//新增
			newAdd() {
				const obj = {
					coefficient: this.form.coefficient,
					expressCode: this.form.expressCode,
					expressName: this.form.expressName,
					expressUrl: this.form.expressUrl,
					info: this.form.info,
					offerRatio: this.form.offerRatio
				};
				saveCourier(obj)
				.then(res => {
					if(res.code === 200){
						this.$message({
							message: '新增成功',
							type: 'success'
						});
						this.$router.push({name: 'freightRules'})
					}
				})
			}
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
		/deep/.el-textarea__inner{
				min-height: 150px!important;
		}
</style>
