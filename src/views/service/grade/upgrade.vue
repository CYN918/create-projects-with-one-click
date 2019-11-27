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
														<el-col>
																<el-form-item label="订购企业:" prop="userName"  style="margin-left: -46px;">
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
												<el-row :gutter="10">
														<div class="goods-fitter my-radio_style">
																<!--支付宝-->
																<label for="radio1">
																		<input type="radio" id="radio1" name="payMethods" v-model="radio" value="1" @change="changeValue(radio)">
																		<div class="t2 color my-radio">
																				<img src="../../../common/images/service/zhifubao.png" alt=""
																						 style="width: 209px;height: 82px">
																		</div>
																</label>
																<!--微信-->
																<label for="radio2">
																		<input type="radio" id="radio2" name="payMethods" v-model="radio" value="2" @change="changeValue(radio)">
																		<div class="t2 color my-radio">
																				<img src="../../../common/images/service/weixin.png" alt=""
																						 style="width: 209px;height: 82px">
																		</div>
																</label>
																<!--&lt;!&ndash;银行卡&ndash;&gt;
																<label for="radio3">
																		<input type="radio" id="radio3" name="payMethods" v-model="radio" value="3">
																		<div class="t2 color my-radio">
																				<img src="../../../common/images/service/qita.png" alt=""
																						 style="width: 209px;height: 82px">
																		</div>
																</label>-->
														</div>
												</el-row>
												<el-row :gutter="10" style="display: flex;justify-content: center;align-items: center;margin-top: 20px;;position: relative">
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
				<!-- 支付方式 -->
				<el-dialog title="支付方式" :visible.sync="dialogTypeVisible" width="70%"  :before-close="payClose"  :close-on-click-modal="false">
						<el-form ref="form"  label-width="120px" size="small">
								<div class="titleT">
										<h4 class="title">{{ payTypeTit }}</h4>
								</div>
								<el-row v-show=" payflag ">
										<el-col :span="12" style="margin-left: 30px;font-size: 16px;margin-bottom: 20px;">
												提交订单成功，请尽快付款！订单号: {{ orderNo }}
										</el-col>
										<el-col :span="10" style="text-align: right;font-size: 16px;">
												应付金额<span class="red_word" style="color:red;font-weight:bold;"> {{goodsAmount}} </span>元
										</el-col>
								</el-row>
								<el-row v-show=" payflag ">
										<el-col :span="24" style="margin-left: 30px;font-size: 13px;">
												<el-col :span="12">
														距离二维码过期时间还剩: <span style="color:red;font-weight:bold;"> {{payMinutes}} </span></span>分<span class="time"> <span style="color:red;font-weight:bold;">{{paySeconds}}</span>  </span>秒 ,过期后请手动刷新二维码，重新获取二维码
												</el-col>

										</el-col>
								</el-row>
								<el-row v-show=" payflag " style="margin: 20px auto;width: 60%;">
										<el-col :span="24">
												<div :span="12" style="width:50%;float: left;">
														<div style="display: inline-block;position: relative;width: 100%;">
																<img :src="imgUrl" alt="" style="border: 1px solid #666;border-radius: 4px;width: 100%;">
																<div class="refresh" v-show="refresh" @click="refreshQ">
																		<img src="../../../common/images/paytype/refresh.png"   alt class=""  style="width: 100px;"/>
																</div>
														</div>
														<div class="miao">
																<img src="../../../common/images/paytype/瞄准.png"   alt class=""  style=""/>
																<p>{{ textCon  }}</p>
														</div>
												</div>
												<el-col :span="12" v-show="treasure">
														<div class="home">
																<img src="../../../common/images/paytype/alipay_scan.png"   alt class="home_i"  style=""/>
																<img src="../../../common/images/paytype/alipay_home.png"   alt class=""  style="width: 92%;padding-left: 10%;"/>
														</div>
												</el-col>
												<el-col :span="12" v-show="weixin">
														<div class="home">
																<img src="../../../common/images/paytype/wechatpay_scan.png"   alt class="home_i"  style=""/>
																<img src="../../../common/images/paytype/wechatpay_home.png"   alt class=""  style="width: 92%;padding-left: 10%;"/>
														</div>
												</el-col>
										</el-col>
								</el-row>
								<el-row v-show=" payflagS ">
										<el-col :span="24" style="text-align: center;">
												<el-col :span="24" style="padding: 40px;">
														<el-col :span="12" class="text_r">
																<img src="../../../common/images/paytype/成功 @2x.png"   alt class=""  style=""/>
														</el-col>
														<el-col :span="12" class="text_l">
																<h3 style="font-size: 24px;color:#4A99FA;">支付成功！</h3>
																<div style="padding: 20px 0;">
																		<p>付款成功,请查询订单！</p>
																</div>
																<el-button type="success"  @click="queryOrder" style="background:#4C86F4;">查询订单</el-button>
														</el-col>
												</el-col>
										</el-col>
								</el-row>
								<el-row v-show=" payflagF ">
										<el-col :span="24" style="text-align: center;">
												<el-col :span="24" style="padding: 40px;">
														<el-col :span="12" class="text_r">
																<img src="../../../common/images/paytype/支付失败@2x.png"   alt class=""  style="width: 220px;"/>
														</el-col>
														<el-col :span="12" class="text_l" style="padding-top: 40px;">
																<h3 style="font-size: 24px;color:#FF3535;">支付失败！</h3>
																<div style="padding: 20px 0;">
																		<p>支付失败，请重新支付</p>
																</div>
																<el-button type="success"  @click="againOrder" style="background:#4C86F4;">重新支付</el-button>
														</el-col>
												</el-col>
										</el-col>
								</el-row>
						</el-form>
						<span slot="footer" class="dialog-footer">
				<el-button type="danger" @click="payClose" size="small">关 闭</el-button>
								<!-- <el-button type="primary" @click="paySave" size="small">确 定</el-button> -->
				</span>
				</el-dialog>
		</div>
</template>

<script>
    import {confirmpurchaseData, submitPayData,getEventState} from "@/api/service";

    let BASE_URL = ''
    if (process.env.NODE_ENV === 'development') {
        BASE_URL = 'http://www.maige.com'
    } else {
        BASE_URL = `http://${location.hostname}`
    }

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
                gradeNo:'',
                codeUrl:'',//二维码
                timer:null,
                payData:{},//支付信息
                dialogTypeVisible:false,   // 支付类型

                payTypeTit:'',
                sysuserType : '',
                imgUrl:'',
                payflag : true,
                payflagS:false,
                payflagF:false,

                goodsAmount:'',//应付金额

                // amountj:'',    // 预存金额

                bizScene : '',   // 业务场景
                codeImgUrl : '',
                codeUrl : '',
                expireTime : '',
                payType : '',
                sign : '',
                orderNo:'',

                now: 0,
                expireTime1: 0,
                payMinutes: "",
                paySeconds: "",
                refresh: false,
                treasure: true,
                weixin: false,
                textCon: '请使用支付宝扫一扫扫描二维码支付 ',
                fu1: '',
                wxpay_native:false,
                alipay_qr:false,
                alipay_qr1:false,
                alipay_qr2:false,
                payType:'alipay_qr',    //支付类型
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
            changeValue(val){
                console.log(val)
								if (val==1){
                    this.payType = 'alipay_qr'
                    this.payTypeTit = "支付宝支付"
                    this.treasure = true
                    this.weixin = false
                    this.textCon = '请使用支付宝扫一扫扫描二维码支付 '
								}else if (val==2){
                    this.payType = 'wxpay_native'
                    this.payTypeTit = "微信支付"
                    this.treasure = false
                    this.weixin = true
                    this.textCon = '请使用微信扫一扫扫描二维码支付 '
								}else if (val==3){
                    this.payType = 'wxpay_native1'
                    this.payTypeTit = "在线支付"
								}else if (val==4){
                    this.payType = 'wxpay_native2'
                    this.payTypeTit = "公司转账"
								}
						},
            //点击立即支付
            submitPay() {
                this.refresh = false

                let obj={}
                obj.gradeNo=this.gradeNo
                obj.payType=this.payType
                obj.remark=''
                // console.log(this.radio)
                if ( !this.radio ){
                    this.$message({
                        type: 'error',
                        message:'请选择支付方式'
                    });
                    return
                }
                this.payflag = true
                this.payflagS = false
                this.payflagF = false
                this.payMinutes = 0
                this.paySeconds = 0
								console.log(11,this.radio)
                submitPayData(obj).then(res => {
                    if (res.code == 200) {
                        console.log(1,res.data)
												this.payData=JSON.parse(JSON.stringify(res.data))
                        this.imgUrl=BASE_URL + '/api/open/b/b2b2c/projectservice/paymentorder/qr_code.json?codeUrl=\n' + res.data.codeUrl
                        this.dialogTypeVisible = true

                        this.goodsAmount =  res.data.goodsAmount
                        this.codeUrl =  res.data.codeUrl
                        this.codeImgUrl =  res.data.codeImgUrl

                        this.bizScene =  res.data.bizScene


                        this.expireTime =  res.data.refreshEndTime
                        this.payType =  res.data.payType
                        this.sign =  res.data.sign
                        this.orderNo =  res.data.orderNo

                        this.now = Math.floor(res.count / 1000)
                        this.expireTime1 = Date.parse(new Date(res.data.refreshEndTime)) / 1000
                        this.countDown(this.expireTime1)

                        // this.payStatus()
                        timer = setInterval(this.payStatus, 3000)
												// this.timer=this.setTimer(5000)
                        // this.$router.push({
                        //     name: "Payhistory"
                        // });
                    }
                })
            },
            againOrder() {
                this.dialogTypeVisible = false
            },
            // // 轮询查询支付状态
						// getEventState(){
            //     let obj={}
            //     obj={
            //         "bizScene": this.payData.bizScene,
            //         "codeImgUrl": this.payData.codeImgUrl,
            //         "codeUrl": this.payData.codeUrl,
            //         "expireTime": this.payData.expireTime,
            //         "orderNo": this.payData.orderNo,
            //         "payType":  this.payData.payType,
            //         "sign":  this.payData.sign
            //     }
            //     getEventState(obj).then(res=>{
            //         if (res.code==200){
						//
            //             this.$message.success('支付成功')
            //             this.$router.push({
            //                 name: "ServiceGrade"
            //             });
						// 				}
						// 		})
						// },
						// setTimer(intMilliecond){
            //     this.timer=setInterval(()=>{
            //         this.getEventState()
						// 		},intMilliecond)
						// },
            payClose () {
                this.$confirm('是否关闭?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.dialogTypeVisible = false
                    this.$router.push({
                        name: "ServiceGrade"
                    });
                    clearInterval(timer);
                    clearInterval(this.timer);
                    console.log(timer)
                    console.log(this.timer)
                }).catch(() => {

                });
            },
            paySave () {
                this.$confirm('是否关闭?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.dialogTypeVisible = false

                }).catch(() => {

                });
            },
            payStatus() {
                var data ={}
                data.bizScene =  this.bizScene
                data.codeImgUrl =  this.codeImgUrl
                data.codeUrl =  this.codeUrl
                data.expireTime = this.expireTime
                data.payType =  this.payType
                data.sign =  this.sign
                data.orderNo = this.orderNo
                getEventState(data).then(res =>{
                    console.log(res)
                    if( res.code == 200){
                        // 支付成功
                        if ( res.data ==2  ) {
                            this.payflag = false
                            clearInterval(timer);
                            this.payflagS = true
                            this.payflagF = false
                            return
                        }else if( res.data !=2  ) {
                            // 支付失败
                            this.payflagS = false
                            this.payflagF = true
                            clearInterval(timer);
                            return
                        }
                    }else{
                        //   clearInterval(timer);
                        if( this.dialogTypeVisible ){
                            // this.payStatus()

                        }else{
                            clearInterval(timer);
                            clearInterval(this.timer);
                        }

                    }
                }).catch((data) => {
                    return false;
                    console.log(data)
                });
            },
            // 刷新二维码
            refreshQ () {
                var data = {
                    orderNo: this.orderNo
                }
                toPay(data).then( res=>{
                    console.log(res)
                    this.refresh = false
                    this.approvalSaveRe()
                    clearInterval(this.timer);
                })
            },
            approvalSaveRe (){
                let obj={}
                obj.gradeNo=this.gradeNo
                obj.payType=this.payType
                obj.remark=''

                submitPayData(obj).then(res=>{
                    console.log(res)
                    if(res.message == '操作成功' ) {
                        this.dialogapprovalVisible = false
                        //this.qr_code(res.data.codeUrl)
                        this.imgUrl = BASE_URL + '/api/open/b/b2b2c/projectservice/paymentorder/qr_code.json?codeUrl='+ res.data.codeUrl
                        console.log( this.imgUrl )
                        this.dialogTypeVisible = true

                        this.bizScene =  res.data.bizScene
                        this.codeImgUrl =  res.data.codeImgUrl
                        this.codeUrl =  res.data.codeUrl
                        this.expireTime =  res.data.refreshEndTime
                        this.payType =  res.data.payType
                        this.sign =  res.data.sign
                        this.orderNo =  res.data.orderNo

                        this.now = Math.floor(res.count / 1000)
                        this.expireTime1 = Date.parse(new Date(res.data.refreshEndTime)) / 1000
                        this.countDown(this.expireTime1)

                        // this.payStatus()
                        timer = setInterval(this.payStatus, 3000)
                    }
                })

            },
            // 二维码过期倒计时
            async countDown(expireTime1) {
                let restTime = expireTime1 - this.now
                this.timer = setInterval(() => {
                    restTime -= 1
                    if (restTime >= 0) {
                        this.payMinutes = Math.floor(restTime / 60);
                        if (this.payMinutes < 10) {
                            this.payMinutes = '0' + this.payMinutes
                            console.log( this.payMinutes )
                        }
                        this.paySeconds = Math.floor(restTime % 60);
                        if (this.paySeconds < 10) {
                            this.paySeconds = '0' + this.paySeconds
                            console.log( this.paySeconds )
                        }
                    } else {
                        clearInterval(this.timer);
                        //this.$emit('stopQueryOrder')
                        this.refresh = true
                        clearInterval(timer);
                    }
                }, 1000);
            },
						//查询订单
            queryOrder(){
                this.$router.push({name:'topUpManagement'})
            },
        },
				destroyed(){
            clearInterval(this.timer)
        },
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

		/*.btn {*/
		/*		margin-left: 550px;*/
		/*		margin-top: 20px;*/
		/*}*/

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

		.text_r{
				text-align: right;
				padding-right:20px;
		}
		.text_l{
				text-align: left;
				padding-left:20px;
				padding-top: 10px;
		}

		.refresh{
				display: inline-block;
				position: absolute;
				top: 50%;
				right: 50%;
				margin-top: -50px;
				margin-right: -50px;
		}
		.home{
				text-align: right;
				position: relative;
		}
		.home_i{
				width: 120px;
				position: absolute;
				top: 30%;
				left: 10%;
		}
		.miao{
				display: flex;
				background: #409eff;
				padding: 20px;
				margin-top: 10px;
		}
		.miao img{
				width: 20%;
				margin-right: 20px;
		}
		.miao p{
				color:#fff;
				line-height: 25px;
		}
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
		.examine{
				color: #409EFF;
				text-decoration: underline;
				cursor: pointer;
		}

</style>
