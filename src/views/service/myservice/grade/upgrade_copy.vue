<template>
		<div class="margin">
				<div class="mbottom">
						<div class="goods-fitter">
								<div class="search-wrapper1">
										<el-page-header @back="back" :content="text"></el-page-header>
								</div>
						</div>
				</div>
				<el-form ref="form" :model="form" label-width="140px" size="small">
						<div class="mbottom">
								<div class="goods-fitter">
										<div class="search-wrapper">
												<el-row>
														<el-col :span="24" style="display: flex;justify-content: flex-start">
																<el-form-item label="订购企业:" prop="userName" style="margin-left: -46px;">
																		{{this.userName}}
																</el-form-item>
														</el-col>
												</el-row>
												<div class="line_div"></div>
												<h4 class="title">确认信息</h4>
												<br/>
												<el-row>
														<el-col :span="8">
																<el-form-item label="服务商名称:" prop="serviceName">
																		<span>{{form.serviceName}}</span>
																</el-form-item>
														</el-col>
														<el-col :span="8">
																<el-form-item label="服务类型:" prop="serviceType">
																		<span>{{form.serviceType}}</span>
																</el-form-item>
														</el-col>
														<el-col :span="8">
																<el-form-item label="服务价格:" prop="originalPrice">
																		<span>{{form.originalPrice}}</span>
																</el-form-item>
														</el-col>
														<el-col :span="8">
																<el-form-item label="生效时间:" prop="effectiveTimeStart">
																		<span>{{form.effectiveTimeStart+' 至 '+form.effectiveTimeEnd}}</span>
																</el-form-item>
														</el-col>
														<el-col :span="8">
																<el-form-item label="服务周期:" prop="purchaseDuration">
																		<span>{{form.purchaseDuration}}</span>
																</el-form-item>
														</el-col>
														<el-col :span="8">
																<el-form-item label="折扣后价格:" prop="payPrice">
																		<span>{{form.payPrice}}</span>
																</el-form-item>
														</el-col>
												</el-row>
												<div class="line_div"></div>
												<h4 class="title">支付信息</h4>
												<br/>
												<el-row>
														<el-col :span="8">
																<el-form-item label="我的余额:" prop="balance">
																		<span style="color: #ff3f2b">{{form.balance}}</span>
																</el-form-item>
														</el-col>
														<el-col :span="8">
																<el-form-item label="余额抵扣:" prop="balanceDeduction">
																		<span style="color: #ff3f2b">{{form.balanceDeduction}}</span>
																</el-form-item>
														</el-col>
														<el-col :span="8">
																<el-form-item label="销售额抵扣:" prop="salesDeduction">
																		<span style="color: #ff3f2b">{{form.salesDeduction}}</span>
																</el-form-item>
														</el-col>
														<el-col :span="8">
																<el-form-item label="还须支付:" prop="payable">
																		<span style="color: #ff3f2b">{{form.payable}}</span>
																</el-form-item>
														</el-col>
												</el-row>
												<div class="line_div"></div>
												<!--<el-row :gutter="10">
														<div class="goods-fitter my-radio_style">
																&lt;!&ndash;支付宝&ndash;&gt;
																<label for="radio1">
																		<input type="radio" id="radio1" name="payMethods" v-model="radio" value="1">
																		<div class="t2 color my-radio">
																				<img src="../../../common/images/service/zhifubao.png" alt=""
																						 style="width: 209px;height: 82px">
																		</div>
																</label>
																&lt;!&ndash;微信&ndash;&gt;
																<label for="radio2">
																		<input type="radio" id="radio2" name="payMethods" v-model="radio" value="2">
																		<div class="t2 color my-radio">
																				<img src="../../../common/images/service/weixin.png" alt=""
																						 style="width: 209px;height: 82px">
																		</div>
																</label>
																&lt;!&ndash;银行卡&ndash;&gt;
																<label for="radio3">
																		<input type="radio" id="radio3" name="payMethods" v-model="radio" value="3">
																		<div class="t2 color my-radio">
																				<img src="../../../common/images/service/qita.png" alt=""
																						 style="width: 209px;height: 82px">
																		</div>
																</label>
														</div>
												</el-row>-->
												<el-row :gutter="10">
														<div class="btn">
																<el-button type="primary" @click="submitPay" size="small"
																					 style="border-radius: 10px;height: 50px;width: 500px">立即支付
																</el-button>
														</div>
												</el-row>
												<el-row :gutter="10" v-if="form.balance==0">
														<div class="note_ss">您的账户余额不足,请在充值后重新订购服务商服务去充值</div>
												</el-row>
												<el-row :gutter="10">
														<div style="color: #6e6e6e;margin-top: 20px;font-size: 14px;margin-left: 10px">
																点击确认支付即代表你已阅读并同意《 福员爱软件服务与结算协议 》
														</div>
												</el-row>
												<el-row :gutter="10">
														<div style="color: #7a7a7a;margin-top: 10px;font-size: 14px;margin-left: 10px">
																发票可在订购成功后,在发票管理中申请开具
														</div>
												</el-row>
										</div>
								</div>
						</div>
				</el-form>
		</div>
</template>

<script>
    import {confirmpurchaseData, submitPayData} from "@/api/service";

    export default {
        name: "upgrade",
        data() {
            return {
                text: "服务中心>等级管理",
                radio: null,
                form: {
                    agencyName: null,
                    serviceName: "福原爱",
                    serviceType: "软件产品",
                    originalPrice: 9800,
                    effectiveTimeStart: null,
                    effectiveTimeEnd: null,
                    purchaseDuration: null,
                    payPrice: null,
                    balance: null,
                    balanceDeduction: 0,
                    salesDeduction: 0,
                    payable: 0,
                },
                userName:'',
                gradeNo:''
            }
        },
        created() {
            this.gradeNo=this.$route.query.gradeNo
            this.getUser()
            this.getpayData()
        },
        methods: {
            //获取企业信息
            getUser() {
                var userData =JSON.parse(localStorage.getItem('user'))
                this.userName=userData.data.organizeName
            },
            //获取支付信息
            getpayData() {
                confirmpurchaseData(this.gradeNo).then(res => {
                    if (res.code == 200) {
                        this.form = res.data
                    }
                })
            },
            //返回
            back() {
                this.$router.go(-1);
            },
            //支付
            submitPay() {
                // console.log(this.radio)
                submitPayData(this.form).then(res => {
                    if (res.code == 200) {
                        this.$message.success('支付成功')
                        // this.$router.push({
                        //     name: "Payhistory"
                        // });
                        this.$router.push({
                            name: "Myservice"
                        });
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

				.line_div {
						margin-left: 5px;
						margin-right: 5px;
						margin-top: 36px;
						margin-bottom: 36px;
						height: 1px;
						border: 1px dashed #ebf4fe;
				}

				.search-wrapper {
						padding: 20px;
						border: 1px solid rgb(215, 224, 241);
						background: #fff;

						.title {
								margin-left: -20px;
								font-size: 16px;
								font-weight: 400;
								/*color: 3333;*/
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

		.note_ss {
				color: #ff3f2b;
				text-align: center;
				margin-top: 15px;
		}

		.el-form-item {
				margin-bottom: 0px !important;
		}


</style>
