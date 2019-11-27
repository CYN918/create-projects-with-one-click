<template>
		<div class="goods-fitter margin">
				<el-form label-width="120px" size="small">
						<div class="search-wrapper">
								<h4 class="title">我的财务</h4>
						</div>
						<div class="search-wrapper" v-for="item in accountList">
								<h4 class="title">{{ item.accountName }}(元)</h4>
								<el-row>
									<el-col :span="6" v-if="item.accountId == 4">
											<el-form-item label="收款总额：">
													<el-col>
															<span class="big_r">￥{{totalPay}} </span>
													</el-col>
											</el-form-item>
									</el-col>
									<el-col :span="6" v-if="item.accountId == 4">
											<el-form-item label="已销售金额：">
													<el-col>
															<span class="big_r">￥{{amountSold}} </span>
													</el-col>
											</el-form-item>
									</el-col>
										<el-col :span="12">
												<el-col>
														<el-form-item label="账户余额：">
																<el-col :span="12">
																		<span class="big_r">￥{{ item.balanceCount }} </span> <span class="examine"
																																												@click="toDetails">查看明细</span>
																</el-col>
														</el-form-item>
												</el-col>
										</el-col>
										<el-col :span="2" style='text-align: center;' v-if="item.accountId == 1">
												<el-button type="primary" size="small" @click="handelSearchGoods" v-permit="'update:recharge'">充值</el-button>
										</el-col>
										<el-col :span="2" style='text-align: center;' v-if="item.accountId == 2">
												<el-button type="primary" size="small" @click="applyForOpen" v-permit="'apply:lines'">额度申请</el-button>
										</el-col>
										<el-col :span="2" style='text-align: center;' v-if="item.accountId == 3">
												<el-button type="primary" size="small" @click="withdrawalOpen" v-permit="'apply:withdrawal'">提现</el-button>
										</el-col>
								</el-row>
								<el-row v-if="item.accountId == 1">
										<el-col :span="12" style="margin: 0 0 20px 14px;">
												<el-switch
														v-model="value1"
														inactive-text="账户余额预警："
														@change="earlyWarningChange"
												>
												</el-switch>
										</el-col>
								</el-row>
								<el-row v-if="item.accountId == 1 && warning">
										<el-col :span="8">
												<el-form-item label="预警阈值：">
														<el-col :span="23">
																<el-input v-model="input" min='1' placeholder="请输入预警阈值" type="number"></el-input>
														</el-col>
												</el-form-item>
										</el-col>
								</el-row>
								<el-row v-if="item.accountId == 1 && warning">
										<el-col :span="8">
												<el-form-item label="预警频率：">
														<el-col :span="23">
																<el-select v-model="region" placeholder="请选择预警频率">
																		<el-option label="每天提醒一次" value="1"></el-option>
																		<el-option label="只提醒一次" value="2"></el-option>
																		<el-option label="每周提醒一次" value="3"></el-option>
																		<el-option label="额度每减少1000元提醒一次" value="4"></el-option>
																</el-select>
														</el-col>
												</el-form-item>
										</el-col>
								</el-row>
								<el-row v-if="item.accountId == 1 && warning">
										<el-form-item label="">
												<el-col :span="2" style='text-align: center;'>
														<el-button type="primary" size="small" @click="update">提交</el-button>
												</el-col>

										</el-form-item>

								</el-row>
						</div>
						<!-- <div class="search-wrapper">
								<h4 class="title">授信额度账号(元)</h4>
								<el-row>
										<el-col :span="12">
												<el-col>
														<el-form-item label="账户余额：">
																<el-col :span="23">
																		<span class="big_r">￥{{balanceCount1}} </span> <span class="examine">查看明细</span>
																</el-col>
														</el-form-item>
												</el-col>
										</el-col>
										<el-col :span="2" style='text-align: center;'>
												<el-button type="primary" size="small" @click="applyForOpen" v-permit="'apply:lines'">额度申请</el-button>
										</el-col>
								</el-row>
						</div> -->
						<!-- <div class="search-wrapper">
								<h4 class="title">提现账户(元)</h4>
								<el-row>
										<el-col :span="12">
												<el-col>
														<el-form-item label="账户余额：">
																<el-col :span="23">
																		<span class="big_r">￥{{balanceCount2}} </span> <span class="examine">查看明细</span>
																</el-col>
														</el-form-item>
												</el-col>
										</el-col>
										<el-col :span="2" style='text-align: center;'>
												<el-button type="primary" size="small" @click="withdrawalOpen" v-permit="'apply:withdrawal'">提现</el-button>
										</el-col>
								</el-row>
						</div> -->
						<!-- <div class="search-wrapper">
								<h4 class="title">我的收款(元)</h4>
								<el-row>
										<el-col :span="24">
												<el-col :span="6">
														<el-form-item label="收款总额：">
																<el-col>
																		<span class="big_r">￥{{totalPay}} </span>
																</el-col>
														</el-form-item>
												</el-col>
												<el-col :span="6">
														<el-form-item label="已销售金额：">
																<el-col>
																		<span class="big_r">￥{{amountSold}} </span>
																</el-col>
														</el-form-item>
												</el-col>
												<el-col :span="12">
														<el-form-item label="余额：">
																<el-col>
																		<span class="big_r">￥{{balanceCount3}} </span> <span class="examine">查看明细</span>
																</el-col>
														</el-form-item>
												</el-col>
										</el-col>

								</el-row>
						</div> -->
				</el-form>

				<!-- 充值 (方式选择)-->
				<el-dialog title="充值" :visible.sync="dialogapprovalVisible" width="70%" :before-close="approvalClose" class="topupModal"
									 :close-on-click-modal="false">
						<el-form ref="form" label-width="120px" size="small">
								<div class="titleT">
										<h4 class="title">预存预付款</h4>
								</div>

								<el-row>
										<el-col :span="12">
												<el-col>
														<el-form-item label="公司名称：">
																<el-col :span="24">
																		<el-input v-model="organizeName" placeholder="请输入" type="text"></el-input>
																		<!-- <span class="">{{organizeName}} </span> -->
																</el-col>
														</el-form-item>
												</el-col>
										</el-col>
								</el-row>
								<el-row>
										<el-col :span="24">
												<el-form-item label="预存金额：">
														<el-col :span="10">
																<el-input v-model="amountj" placeholder="请输入" type="number"></el-input>
														</el-col>
														<el-col :span="14">
																￥ <span>(起充金额为100元，请输入100元以上的金额)</span>
														</el-col>
												</el-form-item>
										</el-col>
								</el-row>
								<el-row>
										<el-col :span="24">
												<template>
														<el-form-item label="支付方式：">
																<el-col :span="6" style="text-align: center;">
																		<el-radio v-model="radio" label="1"></el-radio>
																		<img src="../../../common/images/paytype/支付宝.png" @click="payTpey(1)" alt
																				 class="operation_img"/>
																</el-col>
																<el-col :span="6" style="text-align: center;">
																		<el-radio v-model="radio" label="2"></el-radio>
																		<img src="../../../common/images/paytype/微信支付.png" @click="payTpey(2)" alt
																				 class="operation_img"/>
																</el-col>
																<!-- <el-col :span="6" style="text-align: center;">
																		 <el-radio v-model="radio" label="3"></el-radio>
																		 <img src="../../../common/images/paytype/在线支付.png"  @click="payTpey(3)" alt class="operation_img" />
																	</el-col>-->
																<el-col :span="6" style="text-align: center;position: relative;top: 5px;">
																	<el-radio v-model="radio" label="4"></el-radio>
																	<img src="../../../common/images/paytype/公司转账.png" @click="payTpey(4)" alt class="operation_img" />
																</el-col> 
														</el-form-item>
												</template>
										</el-col>
								</el-row>
						</el-form>
						<span slot="footer" class="dialog-footer">
				<el-button type="danger" @click="approvalClose" size="small">取 消</el-button>
				<el-button type="primary" @click="approvalSave" size="small">确 定</el-button>
				</span>
				</el-dialog>


				<!-- 支付方式（微信或支付宝二维码） -->
				<el-dialog title="支付方式" :visible.sync="dialogTypeVisible" width="70%" :before-close="payClose"
									 :close-on-click-modal="false">
						<el-form ref="form" label-width="120px" size="small">
								<div class="titleT">
										<h4 class="title">{{ payTypeTit }}</h4>
								</div>
								<el-row v-show=" payflag ">
										<el-col :span="12" style="margin-left: 30px;font-size: 16px;margin-bottom: 20px">
												提交订单成功，请尽快付款！订单号: {{ orderNo }}
										</el-col>
										<el-col :span="10" style="text-align: right;font-size: 16px;">
												应付金额<span class="red_word" style="color:red;font-weight:bold;"> {{amountj}} </span>元
										</el-col>
								</el-row>
								<el-row v-show=" payflag ">
										<el-col :span="24" style="margin-left: 30px;font-size: 13px;">
												<el-col :span="12">
														距离二维码过期时间还剩: <span style="color:red;font-weight:bold;"> {{payMinutes}} </span></span>分<span
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
																<img src="../../../common/images/paytype/wechatpay_scan.png" alt class="home_i"
																		 style=""/>
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

			   <!-- 公司转账弹框-->
				<el-dialog title="对公转账" :visible.sync="dialogTransferVisible" width="60%" :before-close="transferClose" class="transferModal"
									 :close-on-click-modal="false">
						<el-form ref="form" label-width="150px" size="small">
								<div class="titleT">
										<h4 class="title">收款方信息</h4>
								</div>

								<el-row>
									<el-col :span="24">
										<el-col>
											<el-form-item label="公司名称：">
												<el-col :span="12">
													<el-input v-model="ruleForm.payeeBankName" placeholder="请输入" type="text"></el-input>
												</el-col>
											</el-form-item>
										</el-col>
									</el-col>
								</el-row>
								<el-row>
										<el-col :span="24">
												<el-form-item label="开户行：">
													<el-col :span="12">
													  <el-input v-model="ruleForm.payeeBankType" placeholder="请输入" type="text"></el-input>
											     	</el-col>
												</el-form-item>
										</el-col>
								</el-row>
								<el-row>
									<el-col :span="24">
										<el-col>
											<el-form-item label="收款账户：">
													<el-col :span="12">
												    	<el-input v-model="ruleForm.payeeBankAccount" placeholder="请输入" type="text"></el-input>
											    	</el-col>
											</el-form-item>
										</el-col>
									</el-col>
								</el-row>
								<!-- <el-row>
										<el-col :span="24">
												<el-form-item label="收款行号：">
													<el-col :span="12">
												    	<el-input v-model="amountj" placeholder="请输入" type="text"></el-input>
											    	</el-col>
												</el-form-item>
										</el-col>
								</el-row> -->
						</el-form>
							<el-form ref="form" label-width="150px" size="small">
								<div class="titleT">
										<h4 class="title">付款方信息</h4>
								</div>

								<el-row>
									<el-col :span="24">
										<el-col>
											<el-form-item label="付款日期：">
													<el-col :span="12">
														 <el-date-picker class="width16" type="date" placeholder="请选择时间"  value-format="yyyy-MM-dd 00:00:00" v-model="ruleForm.payTime"></el-date-picker>
													</el-col>
											</el-form-item>
										</el-col>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="24">
										<el-form-item label="公司名称：">
											<el-col :span="12">
												<el-input v-model="ruleForm.bankName"  placeholder="请输入" type="text"></el-input>
											</el-col>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="24">
										<el-col>
											<el-form-item label="开户行：">
												<el-col :span="12">
													<el-input v-model="ruleForm.bankType" placeholder="请输入" type="text"></el-input>
												</el-col>
											</el-form-item>
										</el-col>
									</el-col>
								</el-row>
								<el-row>
										<el-col :span="24">
											<el-form-item label="付款账户：">
													<el-col :span="12">
														<el-input v-model="ruleForm.bankAccount"  placeholder="请输入" type="text"></el-input>
													</el-col>
											</el-form-item>
										</el-col>
								</el-row>
						    	<el-row>
										<el-col :span="24">
											<el-form-item label="付款金额：">
													<el-col :span="12">
														<el-input v-model="ruleForm.rechargeAmount" disabled placeholder="请输入" type="number"></el-input>
													</el-col>
													<el-col :span="1">
														<span>￥</span>
													</el-col>
											</el-form-item>
										</el-col>
								</el-row>
								<el-row>
										<el-col :span="24">
											<el-form-item label="上传付款单复印件：">
			
											</el-form-item>
										</el-col>
								</el-row>
								<el-row>
							      <div class="picBill" v-if="ruleForm.paymentBill">
									    <img  :src="ruleForm.paymentBill" class="avatar"  prop="file" style="max-width:200px;">
										<span @click="removePic">x</span>
							     </div>		
								  <el-form-item label="" class="upload-img-form">
								    <el-upload
									class="avatar-uploader"
									:action="ruleForm.action"
									:show-file-list="false"
									:on-success="handleAvatarSuccess"
										accept="image/jpeg, image/png"
									>
                                   <i v-if="!ruleForm.paymentBill" class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        </el-form-item>
								</el-row>
						</el-form>
						<span slot="footer" class="dialog-footer">
							<el-button type="danger" @click="transferClose" size="small">取 消</el-button>
							<el-button type="primary" @click="transferSave" size="small">确 定</el-button>
						</span>
				</el-dialog>

				<!-- 额度申请 -->
				<el-dialog title="额度申请" :visible.sync="dialogapplyForVisible" width="70%" :before-close="applyForClose"
									 :close-on-click-modal="false">
						<el-form ref="form" label-width="160px" size="small">
								<div class="titleT">
										<h4 class="title">额度申请</h4>
								</div>

								<el-row>
										<el-col :span="12">
												<el-col>
														<el-form-item label="服务商：">
																<el-col :span="23">
																		<span class="">{{fu1}} </span>
																</el-col>
														</el-form-item>
												</el-col>
										</el-col>
								</el-row>
								<el-row>
										<el-col :span="12">
												<el-col>
														<el-form-item label="账户名称：">
																<el-col :span="23">
																		<span class="">{{fu1}} </span>
																</el-col>
														</el-form-item>
												</el-col>
										</el-col>
								</el-row>
								<el-row>
										<el-col :span="12">
												<el-col>
														<el-form-item label="授信额度：">
																<el-col :span="23">
																		<span class="">{{fu1}} </span>
																</el-col>
														</el-form-item>
												</el-col>
										</el-col>
								</el-row>
								<el-row>
										<el-col :span="12">
												<el-col>
														<el-form-item label="账户余额：">
																<el-col :span="23">
																		<span class="">{{fu1}} </span>
																</el-col>
														</el-form-item>
												</el-col>
										</el-col>
								</el-row>
								<el-row>
										<el-col :span="24">
												<el-form-item label="申请调整授信额度为：">
														<el-col :span="10">
																<el-input v-model="fu1" placeholder="请输入" type="number"></el-input>
														</el-col>
														<el-col :span="14">
																￥
														</el-col>
												</el-form-item>
										</el-col>
								</el-row>
								<el-row>
										<el-col :span="24">
												<el-form-item label="申请调额：">
														<el-input type="textarea" v-model="fu1"></el-input>
												</el-form-item>
										</el-col>
								</el-row>
						</el-form>
						<span slot="footer" class="dialog-footer">
				<el-button type="danger" @click="applyForClose" size="small">取 消</el-button>
				<el-button type="primary" @click="applyForSave" size="small">确 定</el-button>
				</span>
				</el-dialog>

				<!-- 提现 -->
				<el-dialog title="提现申请" :visible.sync="dialogWithdrawalVisible" width="70%" :before-close="withdrawalClose"
									 :close-on-click-modal="false">
						<el-form ref="form" label-width="160px" size="small">
								<div class="titleT">
										<h4 class="title">提现申请</h4>
								</div>

								<el-row>
										<el-col :span="12">
												<el-col>
														<el-form-item label="服务商：">
																<el-col :span="23">
																		<span class="">{{fu1}} </span>
																</el-col>
														</el-form-item>
												</el-col>
										</el-col>
								</el-row>
								<el-row>
										<el-col :span="12">
												<el-col>
														<el-form-item label="提现账户：">
																<el-col :span="23">
																		<span class="">{{fu1}} </span>
																</el-col>
														</el-form-item>
												</el-col>
										</el-col>
								</el-row>
								<el-row>
										<el-col :span="12">
												<el-col>
														<el-form-item label="账户余额：">
																<el-col :span="23">
																		<span class="">{{fu1}} </span>
																</el-col>
														</el-form-item>
												</el-col>
										</el-col>
								</el-row>
								<el-row>
										<el-col :span="24">
												<el-form-item label="提现金额：">
														<el-col :span="10">
																<el-input v-model="fu1" placeholder="请输入" type="number"></el-input>
														</el-col>
														<el-col :span="14">
																￥ <span style="color:red;">(提现金额大于账户可提取额度，请重新输入)</span>
														</el-col>
												</el-form-item>
										</el-col>
								</el-row>
								<el-row>
										<el-col :span="24">
												<el-form-item label="提现申请说明：">
														<el-input type="textarea" v-model="fu1"></el-input>
												</el-form-item>
										</el-col>
								</el-row>
						</el-form>
						<span slot="footer" class="dialog-footer">
				<el-button type="danger" @click="withdrawalClose" size="small">取 消</el-button>
				<el-button type="primary" @click="withdrawalSave" size="small">确 定</el-button>
				</span>
				</el-dialog>


		</div>
</template>

<script>
    import {accountinfo, update, paymentorder, qr_code, payStatus, toPay , transferSave , getMerchantName , getCollectionInfo , findBankInfo} from '@/api/creditmanage/index'
	import {parse} from 'querystring';
	// import { getMerchantName } from "@/api/systemsettings/index";

    let BASE_URL = ''
    if (process.env.NODE_ENV === 'development') {
        BASE_URL = 'http://www.maige.com'
    } else {
        BASE_URL = `http://${location.hostname}`
    }

    var timer

    export default {
        props: ['dataObj'],
        data() {
            return {
				ruleForm:{
				  payeeBankName:'',    // 收款方公司名称
				  payeeBankType:'',    // 收款方开户行
				  payeeBankAccount:'',  // 收款方账户

				  payTime:'',   // 支付时间
				  bankName:'',   // 付款公司名称
				  bankType:'',	  // 付款开户行
				  bankAccount:'',  // 付款账户
				  rechargeAmount:'',  // 付款金额
				  payType:'bank_transfer',   // 支付方式
				  payStatus:2,   // 支付状态
				  action:'',
				  paymentBill:''
				},  
				dialogTransferVisible:false, // 公司转账弹框
                dialogapprovalVisible: false,    // 支付弹框
                dialogTypeVisible: false,   // 支付类型
                dialogapplyForVisible: false, // 额度申请
				dialogWithdrawalVisible: false, // 提现申请
				accountList:[],
                accountId: '',
                accountName: '',
                balanceCount: '0', // 余额
                value1: false,     // 余额预警是否开启
                warning: false,
                input: '',  // 预警阈值
                region: '', // 预警频率
                balanceCount1: '0',
                balanceCount2: '0',
                balanceCount3: '0',
                totalPay: '0',
                amountSold: '0',
                form: {
                    searchKey: '',
                    searchValue: '',
                },
                wxpay_native: false,
                alipay_qr: false,
                alipay_qr1: false,
                alipay_qr2: false,
                radio: '1',
                payType: 'alipay_qr',    //支付类型
                amountj: '',    // 预存金额
                organizeName: '',
                sysuserType: '',
                imgUrl: '',
                payTypeTit: '',
                payflag: true,
                payflagS: false,
                payflagF: false,
                bizScene: '',   // 业务场景
                codeImgUrl: '',
                codeUrl: '',
                expireTime: '',
                payType: '',
                sign: '',
                orderNo: '',
                now: 0,
                expireTime1: 0,
                payMinutes: "",
                paySeconds: "",
                timer: '',
                refresh: false,
                treasure: true,
                weixin: false,
                textCon: '请使用支付宝扫一扫扫描二维码支付 ',
				fu1: '',
				correlativeUserId:'',
                dataapprova:{}
            }
        },
        created() {
            // this.initForm = Object.assign({}, this.form)
			// this._getBuyer()
			this.getMerchantName0()
            const user = JSON.parse(localStorage.getItem("user"))
            this.accountinfo(user.data.sysuserId)
			this.sysuserType = user.data.sysuserType
			this.ruleForm.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
        },
        updated() {

        },
        computed: {},
        methods: {
			// 获取充值公司名字
			 getMerchantName0(){
				 const user = JSON.parse(localStorage.getItem("user"))
				 this.ruleForm.bankName = user.data.sysuserName
				 this.organizeName = user.data.sysuserName
				 this.correlativeUserId = user.data.correlativeUserId
				// getMerchantName().then( res =>{
				//     this.ruleForm.bankName = res.data.businessName 
				// 	this.organizeName = res.data.businessName 
				// })
			},
            // 查看账户信息
            accountinfo(sysuserId) {
                //var sysuserId = parseInt(sysuserId)
                accountinfo({userId: sysuserId}).then(res => {
						console.log(res.data)
                    if (res.data.length) {
						this.accountList = res.data
						console.log(res.data)
                        for (var i = 0; i < res.data.length; i++) {
                            if (res.data[i].accountId == 1) {
                                this.accountId = res.data[i].accountId
                                this.accountName = res.data[i].accountName
                                this.balanceCount = res.data[i].balanceCount
                                if (res.data[i].earlyWarning == 'N') {
                                    this.value1 = false
                                } else {
                                    this.value1 = true
                                    this.warning = true
								}
								this.input = res.data[i].threshold
                                if (res.data[i].frequency) {
                                    this.region = res.data[i].frequency+""
                                } else {
                                    if (this.value1) {
                                        this.region = "1"
                                    } else {
                                        this.region = ""
                                    }

                                }
                            } else if (res.data[i].accountId == 2) {
                                this.balanceCount1 = res.data[i].balanceCount
                            } else if (res.data[i].accountId == 3) {
                                this.balanceCount2 = res.data[i].balanceCount
                            } else if (res.data[i].accountId == 4) {
                                this.balanceCount = res.data[i].balanceCount
                            }

                        }

                    }else{
						this.accountList = [
							{accountId:1,
						 	accountName:"预充值账户",
							balanceCount:0,
							earlyWarning:'N',
							frequency:0,
							threshold:0},
						]
						for (var i = 0; i < this.accountList.length; i++) {
							console.log(this.accountList )
                            if (this.accountList[i].accountName == '预充值账户') {
                                this.accountId = this.accountList[i].accountId
                                this.accountName = this.accountList[i].accountName
                                this.balanceCount = this.accountList[i].balanceCount
                                if (this.accountList[i].earlyWarning == 'N') {
                                    this.value1 = false
                                } else {
                                    this.value1 = true
                                    this.warning = true
								}
								this.input = this.accountList[i].threshold
                                if (this.accountList[i].frequency) {
                                    this.region = this.accountList[i].frequency+""
                                } else {
                                    if (this.value1) {
                                        this.region = "1"
                                    } else {
                                        this.region = ""
                                    }

                                }
                            } else if (res.data[i].accountName == '授信额度账户') {
                                this.balanceCount1 = res.data[i].balanceCount
                            } else if (res.data[i].accountName == '提现账户') {
                                this.balanceCount2 = res.data[i].balanceCount
                            } else if (res.data[i].accountName == '我的收款') {
                                this.balanceCount = res.data[i].balanceCount
                            }

                        }

					}

                })
			},
			// 余额预警变化
			earlyWarningChange(val){
				this.accountId = '1'
				this.accountName = "预充值账户"
                 if (val) {
                    this.warning = true
                    this.input = ''
                    this.region = '1'
                } else {
					this.warning = false
					this.input = ''
					this.region = ''
			        this.update()
				}
			  
			},
            queryOrder() {
                this.$router.push({name: 'topUpManagement'})
            },
            againOrder() {
                this.dialogTypeVisible = false
            },
            // 更新账户信息
            update() {
				if(this.value1){
                  if( this.input < 1 ){
				    this.$message({
                        type: 'error',
                        message: '预警阈值不能小于1'
                    });	
                   return
				}
				}
				
                const user = JSON.parse(localStorage.getItem("user"))
                var data = {}
                data.accountId = Number(this.accountId)
                data.accountName = this.accountName
                data.userId = user.data.sysuserId
                data.userType = Number(user.data.sysuserType)
                if (this.value1) {
                    data.earlyWarning = "Y"
                } else {
                    data.earlyWarning = "N"
                }
                data.threshold = Number(this.input)
                data.frequency = Number(this.region)
                update(data).then(res => {
					//this.$message.success(res.message)
					if( res.code == 200 ){
                       this.$message({
                        type: 'success',
                        message: '设置成功'
                       });	
					}
                })
            },
            // 充值
            handelSearchGoods() {
                this.dialogapprovalVisible = true
                this.amountj = ''
                this.payType = 'alipay_qr'
                this.radio = "1"
                this.payTypeTit = "支付宝支付"
                this.wxpay_native = false
                this.alipay_qr = false
                this.alipay_qr1 = false
                this.alipay_qr2 = false
            },
            // 支付取消
            approvalClose() {
                if (this.amountj) {
                    this.$confirm('是否关闭?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.dialogapprovalVisible = false
                    }).catch(() => {

                    });
                } else {
                    this.dialogapprovalVisible = false
                }

            },
            // 支付方式选择
            payTpey(index) {
                if (index == 1) {
                    this.radio = 1 + ''
                    this.payType = 'alipay_qr'
                    this.payTypeTit = "支付宝支付"
                    this.treasure = true
                    this.weixin = false
                    this.textCon = '请使用支付宝扫一扫扫描二维码支付 '
                } else if (index == 2) {
                    this.radio = 2 + ''
                    this.payType = 'wxpay_native'
                    this.payTypeTit = "微信支付"
                    this.treasure = false
                    this.weixin = true
                    this.textCon = '请使用微信扫一扫扫描二维码支付 '
                } else if (index == 3) {
                    this.radio = 3 + ''
                    this.payType = 'wxpay_native1'
                    this.payTypeTit = "在线支付"
                } else if (index == 4) {
                    this.radio = 4 + ''
                    this.payType = 'wxpay_native2'
                    this.payTypeTit = "公司转账"
                }
            },
            // 支付确定
            approvalSave() {
                this.refresh = false
                this.dataapprova = {}
                this.dataapprova.accountId = Number(this.accountId)
                this.dataapprova.accountName = this.accountName
				this.dataapprova.amount = Number(this.amountj)
				this.ruleForm.rechargeAmount = this.amountj
                this.dataapprova.balanceAmount = Number(this.balanceCount)
                this.dataapprova.payType = this.payType
				this.dataapprova.userType = this.sysuserType

                if (!this.amountj) {
                    this.$message({
                        type: 'error',
                        message: '预存金额不能为空，请输入'
                    });
                    return
                } else {
                    this.$confirm('是否确定支付?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // if ( this.amountj<100 ){
                        // 	this.$message({
                        // 		type: 'error',
                        // 		message:'起充金额为100元，请输入100元以上的金额'
                        // 	});
                        // 	return
                        // }
                        if (!this.payType) {
                            this.$message({
                                type: 'error',
                                message: '请选择支付方式'
                            });
                            return
                        }
                        this.payflag = true
                        this.payflagS = false
                        this.payflagF = false
                        this.payMinutes = 0
						this.paySeconds = 0
                       if( this.radio == "1" || this.radio=="2" ){
                            paymentorder(this.dataapprova).then(res => {
                            if (res.message == '操作成功') {
                                // this.$message({
                                // type: 'success',
                                // message: res.message
                                // });
                                this.dialogapprovalVisible = false
                                //this.qr_code(res.data.codeUrl)
                                this.imgUrl = BASE_URL + '/api/open/b/b2b2c/projectservice/paymentorder/qr_code.json?codeUrl=' + res.data.codeUrl
                                // console.log(this.imgUrl)
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
                                timer = setInterval(this.payStatus, 3000)
                            }
                        })
					   }else if( this.radio=="4" ){
						   // 获取公司转账的收款方信息
						   var data = {
							   payType : "bank_transfer"
						   }
						    this.dialogapprovalVisible = false
							this.dialogTransferVisible = true
							// 获取收款方信息
                           getCollectionInfo(data).then( res =>{
							  if( res.code ==200 ){
                                this.dialogapprovalVisible = false
								this.dialogTransferVisible = true
								this.ruleForm.payeeBankName = res.data.merchantName      //公司名称
								this.ruleForm.payeeBankType = res.data.bank          //开户行
								this.ruleForm.payeeBankAccount = res.data.accountCode    //收款账户
							  }
						   })
						   // 获取付款方信息
						   this.getMerchantName()
					   }

                    }).catch((data) => {
                      
                    });

                }

			},
			// 获取付款方信息
			async getMerchantName(){
				const  { data }  = await getMerchantName()
				console.log(data)
				var sysuserType ;
					if( data.platformType == 0 ){
					// 总站后台(放经销商)
					
					}else if( data.platformType == 1 ){
						// 经销商后台（放客户）
					sysuserType = 1
					}else if( data.platformType == 2 ){
						// 项目后台（C端用户）
					sysuserType = 2
					}
					var dat ={}
					dat.correlativeUserId =  this.correlativeUserId
					dat.sysuserType = sysuserType
					const  { res }  = await findBankInfo(dat)
					console.log(res)
				//	ruleForm.bankName = res.data     // 公司名称
					this.ruleForm.bankType =  res.data.bankName               // 开户行
					this.ruleForm.bankAccount = res.data.bankAccount               // 付款账户
				//	ruleForm.rechargeAmount = res.data             // 付款金额
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
                        }
                        this.paySeconds = Math.floor(restTime % 60);
                        if (this.paySeconds < 10) {
                            this.paySeconds = '0' + this.paySeconds
                        }
                    } else {
                        clearInterval(this.timer);
                        //this.$emit('stopQueryOrder')
                        this.refresh = true
                        clearInterval(timer);
                    }
                }, 1000);
            },
            // 刷新二维码
            refreshQ() {
                var data = {
                    orderNo: this.orderNo
                }
                toPay(data).then(res => {
                    this.refresh = false
                    this.approvalSaveRe()
                    clearInterval(this.timer);
                })
            },
            approvalSaveRe() {
                var data = {}
                data.accountId = Number(this.accountId)
                data.accountName = this.accountName
                data.amount = Number(this.amountj)
                data.balanceAmount = Number(this.balanceCount)
                data.payType = this.payType
                data.userType = this.sysuserType

                paymentorder(data).then(res => {
                    if (res.message == '操作成功') {
                        // this.$message({
                        // type: 'success',
                        // message: res.message
                        // });
                        this.dialogapprovalVisible = false
                        //this.qr_code(res.data.codeUrl)
                        this.imgUrl = BASE_URL + '/api/open/b/b2b2c/projectservice/paymentorder/qr_code.json?codeUrl=' + res.data.codeUrl
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
                        timer = setInterval(this.payStatus, 3000)
                    }
                })

			},
			// 公司转账取消
			transferClose(){
               this.dialogTransferVisible = false
			},
			// 公司转账确定
			transferSave(){
                transferSave(this.ruleForm).then(res=>{ 
				   if( res.code == 200 ){
						this.$message({
							type: 'success',
							message: '对公转账成功'
						})
						this.dialogTransferVisible = false
						this.$router.push({name:'myPrepaid'})
				   }
				})
			},
			// 上传公司转账图片
		   handleAvatarSuccess(res,file){
            this.ruleForm.paymentBill = res.data.domain + res.data.filePath
		   },
		   // 删除图片
		   removePic(){
              this.ruleForm.paymentBill = ''
		   },
			payClose() {
				this.$confirm('是否关闭?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.dialogTypeVisible = false
					clearInterval(timer);
					clearInterval(this.timer);
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
                payStatus(data).then(res => {
                    if (res.code == 200) {
                        // 支付成功
                        if (res.data == 2) {
                            this.payflag = false
                            clearInterval(timer);
                            this.payflagS = true
                            this.payflagF = false
                            return
                        } else if (res.data != 2) {
                            // 支付失败
                            this.payflagS = false
                            this.payflagF = true
                            clearInterval(timer);
                            return
                        }

                    } else {
                        //   clearInterval(timer);
                        if (this.dialogTypeVisible) {
                            // this.payStatus()

                        } else {
                            clearInterval(timer);
                            clearInterval(this.timer);
                        }

                    }
                }).catch((data) => {
                    return false;
                });
            },
            // 生成二维码
            // qr_code(codeUrl) {
            // 	// var data ={}
            // 	// data.codeUrl = codeUrl
            // 	// console.log(data)
            //     // qr_code(data).then( res=>{
            // 	// 	console.log(res)
            // 	// })
            //     var imgUrl = BASE_URL + '/api/open/b/b2b2c/projectservice/paymentorder/qr_code.json?codeUrl='+codeUrl
            //     console.log( imgUrl )

            // },
            // 查看明细
            toDetails() {
                this.$router.push({name: "preloaded"})
            },
            // 额度申请打开
            applyForOpen() {
                this.dialogapplyForVisible = true
            },
            // 额度申请关闭
            applyForClose() {
                this.dialogapplyForVisible = false
            },
            // 额度申请保存
            applyForSave() {

            },
            // 提现打开
            withdrawalOpen() {
                this.dialogWithdrawalVisible = true
            },
            // 提现关闭
            withdrawalClose() {
                this.dialogWithdrawalVisible = false
            },
            // 提现保存
            withdrawalSave() {

            }
        },
        watch: {
            radio(val) {
                if (val == 1) {
                    this.radio = 1 + ''
                    this.payType = 'alipay_qr'
                    this.payTypeTit = "支付宝支付"
                    this.treasure = true
                    this.weixin = false
                    this.textCon = '请使用支付宝扫一扫扫描二维码支付 '
                } else if (val == 2) {
                    this.radio = 2 + ''
                    this.payType = 'wxpay_native'
                    this.payTypeTit = "微信支付"
                    this.treasure = false
                    this.weixin = true
                    this.textCon = '请使用微信扫一扫扫描二维码支付 '
                } else if (val == 3) {
                    this.radio = 3 + ''
                    this.payType = 'wxpay_native1'
                    this.payTypeTit = "在线支付"
                } else if (val == 4) {
                    this.radio = 4 + ''
                    this.payType = 'wxpay_native2'
                    this.payTypeTit = "公司转账"
                }
            },
            value1(val) {
              
            }
        }
    }
</script>
<style scoped>
  .topupModal >>> .el-dialog__body {
	padding: 10px 20px;
   }
  .transferModal >>> .el-dialog__body {
    padding: 0 !important;
    background: none !important;
  }
  .transferModal >>>.el-form{
    padding: 20px;
    background: #fff;
    margin-bottom: 20px;
  }
</style>
<style lang="scss" scoped>
		@import "@/common/scss/variable.scss";
		.picBill{
			margin-left: 150px;
			display: inline-block;
			position: relative;
            img{
              border: 1px solid #e0e0e0;
			  width: 150px;
              height: 150px;
			}
			span{
			 position: absolute;
			 top: 0;
			 right: 1px;
			 font-size: 20px;
			 cursor: pointer;
		  	 padding: 0 5px;
			 background: #8cc5ff;
			 color: #fff;
		  }
		}
		.el-date-editor.el-input, .el-date-editor.el-input__inner {
           width: 100%;
          }
        .avatar-uploader-icon{
			font-size: 28px;
			color: #8c939d;
			width: 150px;
			height: 150px;
			line-height: 150px;
			text-align: center;
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

		.operation_img {
				width: 110px;
				height: auto;
				cursor: pointer;
		}

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

		.examine {
				color: #409EFF;
				text-decoration: underline;
				cursor: pointer;
		}

		.big_r {
				padding: 0 20px 0 0;
				color: red;
				font-size: 24px;
				font-weight: bold;
		}

		.goods-fitter {
				.search-wrapper {
						padding: 20px;
						border: 1px solid rgb(215, 224, 241);
						background: #fff;
						margin-bottom: 20px;

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

				.el-select {
						display: inline-block;
						width: 100%;
				}

				.el-select-width {
						max-width: 240px;
						margin-right: 5px;
				}

				.el-input-width {
						display: inline-block;
						max-width: 140px;
				}

				.btn-toggle {
						margin-left: 10px;
						font-size: 14px;
						color: $themeColor;
						cursor: pointer;
				}
		}
</style>
<style scoped>
		.goods-fitter >>> .el-radio__label {
				display: none;
		}

		.goods-fitter >>> .el-radio__inner {
				position: relative;
				top: -11px;
		}
</style>
