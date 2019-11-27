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
								<div class="search-wrapper1" style="height: 100%;display: flex;align-items: flex-start;flex-direction: column">
										<el-form ref="form" :model="form" label-width="120px">
												<el-form-item label="快递公司:">
														{{form.expressName}}
												</el-form-item>
												<el-form-item label="快递编码:">
														{{form.expressCode}}
												</el-form-item>
												<el-form-item label="公司网址:">
														{{form.expressUrl}}
												</el-form-item>

												<el-form-item label="轻抛系数:">
														{{form.coefficient}}
												</el-form-item>
												<el-form-item label="保价费比例(%):">
													{{form.offerRatio}}
												</el-form-item>
												<el-form-item label="公司介绍:">
														{{form.info}}
												</el-form-item>
										</el-form>
								</div>
						</div>
				</div>
		</div>
</template>

<script>
import { 
  queryCourier
} from "@/api/order/index";
    export default {
        data() {
            return {
                text: "运费规则 > 查看快递公司",
                form: {},
				id: this.$route.query.id
            }
        },
        created() {
			this.queryCourier();
        },
        methods: {
            //返回上一步
            back() {
                this.$router.go(-1);
			},
			//查询快递公司详情
			queryCourier() {
                const obj = {
					id: this.id
				};
				queryCourier(obj)
				.then(res => {
					if(res.code === 200){
						this.form = res.data;
					}
				})
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
		/deep/.el-textarea__inner{
				min-height: 150px!important;
		}
</style>
