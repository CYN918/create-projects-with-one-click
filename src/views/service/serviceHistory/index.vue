<template>
    <div class="margin">
        <div class="mbottom">
            <div class="goods-fitter">
                <el-form label-width="260px" size="small">
                    <div class="search-wrapper">
                        <h4 class="title">服务中心>服务记录</h4>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="mcard" style="border: 1px solid #d7e0f1;">
            <el-table :data="list" border style="width: 100%" stripe>
                <el-table-column prop="agencyName" label="经销商名称" align="center"></el-table-column>
                <el-table-column prop="gradeName" label="服务等级" align="center"></el-table-column>
                <!--<el-table-column prop="" label="服务应用" align="center"></el-table-column>-->
                <!--<el-table-column prop="" label="服务项目" align="center"></el-table-column>-->
                <el-table-column prop="payPrice" label="费用(元)" align="center"></el-table-column>
                <el-table-column prop="confirmUserName" label="销售人员" align="center"></el-table-column>
                <el-table-column label="服务时间" align="center" width="200">
                    <template slot-scope="scope" v-if="scope.row.effectiveTimeStart&&scope.row.effectiveTimeEnd">
                        {{scope.row.effectiveTimeStart+'至'+scope.row.effectiveTimeEnd}}
                    </template>
                </el-table-column>
                <el-table-column prop="purchaseStatus" label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.purchaseStatus|statusFilter">{{scope.row.purchaseStatus}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="confirmTime" label="支付时间" align="center" width="180"></el-table-column>
                <el-table-column prop="payStatus" label="支付状态" align="center" width="120">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" v-if="scope.row.payStatus=='待支付'"
                                   @click="goPay(scope.row.orderNo,scope.row.payType)">{{scope.row.payStatus}}
                        </el-button>
                        <el-tag :type="scope.row.payStatus|statusFilter" v-else>{{scope.row.payStatus}}</el-tag>
                    </template>
                </el-table-column>
                <!--<el-table-column prop="c" label="操作" align="center" fixed="right" width="150">
                        <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row,scope.$index)" type="text">详情</el-button>
                                <el-button type="text" @click="agreementClick(scope.row,scope.$index)">服务协议</el-button>
                        </template>
                </el-table-column>-->
            </el-table>
            <div class="pagination">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="listQuery.pageNum"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="listQuery.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <!-- 支付方式 -->
        <el-dialog title="支付方式" :visible.sync="dialogTypeVisible" width="70%" :before-close="payClose"
                   :close-on-click-modal="false">
            <el-form ref="form" label-width="120px" size="small">
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
                            距离二维码过期时间还剩: <span style="color:red;font-weight:bold;"> {{payMinutes}} </span>分<span
                                class="time"> <span style="color:red;font-weight:bold;">{{paySeconds}}</span>  </span>秒
                            ,过期后请手动刷新二维码，重新获取二维码
                        </el-col>

                    </el-col>
                </el-row>
                <el-row v-show=" payflag " style="margin: 20px auto;width: 60%;">
                    <el-col :span="24">
                        <div :span="12" style="width:50%;float: left;">
                            <div style="display: inline-block;position: relative;width: 100%;">
                                <img :src="imgUrl" alt=""
                                     style="border: 1px solid #666;border-radius: 4px;width: 100%;">
                                <div class="refresh" v-show="refresh" @click="refreshQ">
                                    <img src="../../../common/images/paytype/refresh.png" alt class=""
                                         style="width: 100px;"/>
                                </div>
                            </div>
                            <div class="miao">
                                <img src="../../../common/images/paytype/瞄准.png" alt class="" style=""/>
                                <p>{{ textCon }}</p>
                            </div>
                        </div>
                        <el-col :span="12" v-show="treasure">
                            <div class="home">
                                <img src="../../../common/images/paytype/alipay_scan.png" alt class="home_i" style=""/>
                                <img src="../../../common/images/paytype/alipay_home.png" alt class=""
                                     style="width: 92%;padding-left: 10%;"/>
                            </div>
                        </el-col>
                        <el-col :span="12" v-show="weixin">
                            <div class="home">
                                <img src="@/common/images/paytype/wechatpay_scan.png" alt class="home_i" style=""/>
                                <img src="../../../common/images/paytype/wechatpay_home.png" alt class=""
                                     style="width: 92%;padding-left: 10%;"/>
                            </div>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row v-show=" payflagS ">
                    <el-col :span="24" style="text-align: center;">
                        <el-col :span="24" style="padding: 40px;">
                            <el-col :span="12" class="text_r">
                                <img src="../../../common/images/paytype/成功 @2x.png" alt class="" style=""/>
                            </el-col>
                            <el-col :span="12" class="text_l">
                                <h3 style="font-size: 24px;color:#4A99FA;">支付成功！</h3>
                                <div style="padding: 20px 0;">
                                    <p>付款成功,请查询订单！</p>
                                </div>
                                <el-button type="success" @click="queryOrder" style="background:#4C86F4;">查询订单
                                </el-button>
                            </el-col>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row v-show=" payflagF ">
                    <el-col :span="24" style="text-align: center;">
                        <el-col :span="24" style="padding: 40px;">
                            <el-col :span="12" class="text_r">
                                <img src="../../../common/images/paytype/支付失败@2x.png" alt class=""
                                     style="width: 220px;"/>
                            </el-col>
                            <el-col :span="12" class="text_l" style="padding-top: 40px;">
                                <h3 style="font-size: 24px;color:#FF3535;">支付失败！</h3>
                                <div style="padding: 20px 0;">
                                    <p>支付失败，请重新支付</p>
                                </div>
                                <el-button type="success" @click="againOrder" style="background:#4C86F4;">重新支付
                                </el-button>
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
	import {getEventState, getserviceHistoryList, goPayData} from "@/api/service";

	let BASE_URL = ''
	if (process.env.NODE_ENV === 'development') {
		BASE_URL = 'http://www.maige.com'
	} else {
		BASE_URL = `http://${location.hostname}`
	}

	export default {
		name: "Payhistory",
		filters: {
			statusFilter(status) {
				const statusMap = {
					正常生效: "success",
					到期: "danger",
					未生效: "info",
					冻结: "warning",
					待支付: "warning",
					支付中: "",
					支付成功: "success",
					支付失败: "info",
					'取消(关闭)订单': "info",
					'支付超时': "warning",
					'已退款': "info",

				};
				return statusMap[status];
			}
		},
		data() {
			return {
				text: "服务中心>等级管理>支付记录",
				list: null,
				listQuery: {
					pageNum: 1,
					pageSize: 10,
				},
				total: 10,
				dialogTypeVisible: false,   // 支付类型

				userName: '',
				orderNo: '',
				codeUrl: '',//二维码
				timer: null,
				downTimer: null,
				payData: {},//支付信息
				dialogTypeVisible: false,   // 支付类型

				payTypeTit: '',
				sysuserType: '',
				imgUrl: '',
				payflag: true, //扫描页
				payflagS: false, //支付成功提示页
				payflagF: false, //支付失败提示页
				goodsAmount: '',//应付金额

				bizScene: '',   // 业务场景
				codeImgUrl: '',
				codeUrl: '',
				expireTime: '',
				payType: '',
				sign: '',

				now: 0,
				expireTime1: 0,
				payMinutes: "",
				paySeconds: "",
				refresh: false,
				treasure: true,
				weixin: false,
				textCon: '请使用支付宝扫一扫扫描二维码支付 ',
				fu1: '',
				wxpay_native: false,
				alipay_qr: false,
				alipay_qr1: false,
				alipay_qr2: false,
				payType: 'alipay_qr',    //支付类型
			}
		},
		created() {
			this.getList()
		},
		watch: {
			dialogTypeVisible(val) {
				if (val === false) {
					if (this.timer) {
						clearInterval(this.timer);
					}
				}
			}
		},
		methods: {
			//清除定时器
			clearTimer() {
				if (this.timer) {
					clearInterval(this.timer);
				}
				if (this.downTimer) {
					clearInterval(this.downTimer);
				}
			},
			startTimer(func, time=3000) {
				clearInterval(this.timer);
				this.timer = setInterval(func, time);
			},
			//去支付
			goPay(orderNo, payType) {
				if (payType == 'alipay_qr') {
					this.payType = 'alipay_qr'
					this.payTypeTit = "支付宝支付"
					this.treasure = true
					this.weixin = false
					this.textCon = '请使用支付宝扫一扫扫描二维码支付 '
				} else if (payType == 'wxpay_native') {
					this.payType = 'wxpay_native'
					this.payTypeTit = "微信支付"
					this.treasure = false
					this.weixin = true
					this.textCon = '请使用微信扫一扫扫描二维码支付 '
				} else if (payType == 'wxpay_native1') {
					this.payType = 'wxpay_native1'
					this.payTypeTit = "在线支付"
				} else if (payType == 'wxpay_native2') {
					this.payType = 'wxpay_native2'
					this.payTypeTit = "公司转账"
				}

				let obj = {}
				obj.orderNo = orderNo

				this.payflag = true
				this.payflagS = false
				this.payflagF = false
				this.payMinutes = 0  //倒计时分钟
				this.paySeconds = 0  //倒计时秒
				goPayData(obj).then(res => {
					if (res.code == 200) {
						console.log(1, res.data)
						this.payData = JSON.parse(JSON.stringify(res.data))
						this.imgUrl = BASE_URL + '/api/open/b/b2b2c/projectservice/paymentorder/qr_code.json?codeUrl=' + res.data.codeUrl
						this.dialogTypeVisible = true

						this.goodsAmount = res.data.goodsAmount
						this.codeUrl = res.data.codeUrl
						this.codeImgUrl = res.data.codeImgUrl

						this.bizScene = res.data.bizScene


						this.expireTime = res.data.refreshEndTime
						this.payType = res.data.payType
						this.sign = res.data.sign
						this.orderNo = res.data.orderNo

						this.now = Math.floor(res.count / 1000)
						this.expireTime1 = Date.parse(new Date(res.data.refreshEndTime)) / 1000
						this.countDown(this.expireTime1)
						clearInterval(this.timer)
						this.timer = setInterval(this.payStatus, 3000)
					}
				})
			},
			againOrder() {
				this.dialogTypeVisible = false
			},
			payClose() {
				this.$confirm('是否关闭?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.getList()
					this.dialogTypeVisible = false
					clearInterval(this.timer);
					console.log(this.timer)
				}).catch(() => {

				});
			},
			paySave() {
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
				var data = {}
				data.bizScene = this.bizScene
				data.codeImgUrl = this.codeImgUrl
				data.codeUrl = this.codeUrl
				data.expireTime = this.expireTime
				data.payType = this.payType
				data.sign = this.sign
				data.orderNo = this.orderNo
				getEventState(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						// 支付成功
						if (res.data == 2) {
							this.payflag = false
							clearInterval(this.timer);
							this.payflagS = true
							this.payflagF = false
							return
						} else if (res.data != 2) {
							// 支付失败
							this.payflagS = false
							this.payflagF = true
							clearInterval(this.timer);
							return
						}
					} else {
						//   clearInterval(timer);
						if (this.dialogTypeVisible) {
							// this.payStatus()

						} else {
							clearInterval(this.timer);
						}

					}
				}).catch((data) => {
					return false;
					console.log(data)
				});
			},
			// 刷新二维码
			refreshQ() {
				var data = {
					orderNo: this.orderNo
				}
				this.goPay(this.orderNo, this.payType).then(res => {
					console.log(res)
					this.refresh = false
					this.approvalSaveRe()
					clearInterval(this.timer);
				})
			},
			approvalSaveRe() {
				let obj = {}
				obj.gradeNo = this.gradeNo
				obj.payType = this.payType
				obj.remark = ''

				submitPayData(obj).then(res => {
					console.log(res)
					if (res.message == '操作成功') {
						this.dialogapprovalVisible = false
						//this.qr_code(res.data.codeUrl)
						this.imgUrl = BASE_URL + '/api/open/b/b2b2c/projectservice/paymentorder/qr_code.json?codeUrl=' + res.data.codeUrl
						console.log(this.imgUrl)
						this.dialogTypeVisible = true

						this.bizScene = res.data.bizScene
						this.codeImgUrl = res.data.codeImgUrl
						this.codeUrl = res.data.codeUrl
						this.expireTime = res.data.refreshEndTime
						this.payType = res.data.payType
						this.sign = res.data.sign
						this.orderNo = res.data.orderNo

						this.now = Math.floor(res.count / 1000)
						this.expireTime1 = Date.parse(new Date(res.data.refreshEndTime)) / 1000
						this.countDown(this.expireTime1)

						// this.payStatus()
						clearInterval(this.timer)
						this.timer = setInterval(this.payStatus, 3000)
					}
				})

			},
			// 二维码过期倒计时
			async countDown(expireTime1) {
				let restTime = expireTime1 - this.now
				this.downTimer = setInterval(() => {
					restTime -= 1
					if (restTime >= 0) {
						this.payMinutes = Math.floor(restTime / 60);
						if (this.payMinutes < 10) {
							this.payMinutes = '0' + this.payMinutes
							console.log(this.payMinutes)
						}
						this.paySeconds = Math.floor(restTime % 60);
						if (this.paySeconds < 10) {
							this.paySeconds = '0' + this.paySeconds
						}
					} else {
						clearInterval(this.downTimer);
						this.refresh = true
					}
				}, 1000);
			},
			//查询订单
			queryOrder() {
				// this.$router.push({name:'topUpManagement'})
			},

			//获取列表
			getList() {
				getserviceHistoryList(this.listQuery).then(res => {
					if (res.code == 200) {
						this.listQuery.pageNum = res.data.pageNum
						this.listQuery.pageSize = res.data.pageSize
						this.total = res.data.total
						this.list = res.data.list
						this.list = this.list.map(v => {
							if (v.effectiveTimeStart) {
								v.effectiveTimeStart = v.effectiveTimeStart.substring(0, 10)
							}
							if (v.effectiveTimeEnd) {
								v.effectiveTimeEnd = v.effectiveTimeEnd.substring(0, 10)
							}
							return v
						})
						this.list.forEach(item => {
							/* 0未生效(默认) 1正常生效 2到期 3冻结 */
							if (item.purchaseStatus == 0) {
								item.purchaseStatus = '未生效'
							} else if (item.purchaseStatus == 1) {
								item.purchaseStatus = '正常生效'
							} else if (item.purchaseStatus == 2) {
								item.purchaseStatus = '到期'
							} else {
								item.purchaseStatus = '冻结'
							}
							/*payStatus*/
							/*int WAIT = 0;//待支付
                                    int PAYMENTS = 1;//支付中
                                    int SUCCESS = 2;//支付成功
                                    int ERROR = 3;//支付失败
                                    int CANCEL = 4;//取消(关闭)订单
                                    int TIMEOUT = 5;//支付超时
                                    int REFUNDED = 6;//已退款*/
							if (item.payStatus == 0) {
								item.payStatus = '待支付'
							} else if (item.payStatus == 1) {
								item.payStatus = '支付中'
							} else if (item.payStatus == 2) {
								item.payStatus = '支付成功'
							} else if (item.payStatus == 3) {
								item.payStatus = '支付失败'
							} else if (item.payStatus == 4) {
								item.payStatus = '取消(关闭)订单'
							} else if (item.payStatus == 5) {
								item.payStatus = '支付超时'
							} else {
								item.payStatus = '已退款'
							}

						})
						console.log(555, this.list)
					}
				})
			},
			//详情
			handleClick(row, index) {

			},
			//服务协议
			agreementClick() {

			},
			//返回
			back() {
				this.$router.go(-1);
			},
			handleSizeChange(val) {
				this.listQuery.pageSize = val;
				this.getList()
			},
			handleCurrentChange(val) {
				this.listQuery.pageNum = val;
				this.getList()
			},
		},
		destroyed() {
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


    .text_r {
        text-align: right;
        padding-right: 20px;
    }

    .text_l {
        text-align: left;
        padding-left: 20px;
        padding-top: 10px;
    }

    .refresh {
        display: inline-block;
        position: absolute;
        top: 50%;
        right: 50%;
        margin-top: -50px;
        margin-right: -50px;
    }

    .home {
        text-align: right;
        position: relative;
    }

    .home_i {
        width: 120px;
        position: absolute;
        top: 30%;
        left: 10%;
    }

    .miao {
        display: flex;
        background: #409eff;
        padding: 20px;
        margin-top: 10px;
    }

    .miao img {
        width: 20%;
        margin-right: 20px;
    }

    .miao p {
        color: #fff;
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

    .examine {
        color: #409EFF;
        text-decoration: underline;
        cursor: pointer;
    }


</style>
