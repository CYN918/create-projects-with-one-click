<template>
    <div class="margin dealerlist">
        <el-form
                label-width="140px"
                size="small"
                :model="personalForm"
                ref="personalForm"
                :rules="personalRules"
        >
            <div class="mbottom">
                <div class="goods-fitter">
                    <div class="search-wrapper1">
                        <el-page-header @back="back" content="供应商管理>查看供应商详情"></el-page-header>
                    </div>
                </div>
            </div>

            <div class="mbottom">
                <div class="goods-fitter">
                    <div class="search-wrapper">
                        <h4 class="title">供应商信息</h4>
                        <br />
                        <el-row>
                            <el-col :span="22">
                                <el-col :span="6">
                                    <el-form-item label="供应商名称：" prop="supplierName">
                                        <span>{{personalForm.supplierName}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="公司性质：" prop="supplierNature">
                                        <span>{{personalForm.supplierNature}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="公司地址：" prop="address">
                                        <span>{{personalForm.address}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="公司网址：" prop="compony_url">
                                        <span>{{personalForm.compony_url}}</span>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="22">
                                <el-col :span="6">
                                    <el-form-item label="代理品牌：" prop="agency_branch">
                                        <span>{{personalForm.agency_branch}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="主营商品：" prop="main_product">
                                        <span>{{personalForm.main_product}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="一件代发：" prop="wholesale">
                                        <span>{{personalForm.main_product === '1'?"是":"否"}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="税率：" prop="taxRate">
                                        <span>{{personalForm.taxRate?personalForm.taxRate:'暂无'}}</span>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="22">
                                <el-col :span="6">
                                    <el-form-item label="API对接：" prop="api">
                                        <span>{{personalForm.api=='0'?'否':'是'}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="18">
                                    <el-form-item label="入驻品类：" prop="category">
                                        <span>{{personalForm.category}}</span>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="22">
                                <el-form-item label="备注：" prop="note">
                                    <span>{{personalForm.note}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>

            <div class="mbottom">
                <div class="goods-fitter">
                    <div class="search-wrapper">
                        <h4 class="title">联系人信息</h4>
                        <el-row>
                            <el-col :span="22">
                                <el-col :span="6">
                                    <el-form-item label="联系人：" prop="contactName">
                                        <span>{{personalForm.contactName}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="部门：" prop="department">
                                        <span>{{personalForm.department}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="手机号码：" prop="mobile">
                                        <span>{{personalForm.mobile}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="QQ：" prop="qq">
                                        <span>{{personalForm.qq}}</span>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="22">
                                <el-col :span="6">
                                    <el-form-item label="固定电话：" prop="phone">
                                        <span>{{personalForm.phone}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="邮箱：" prop="email">
                                        <span>{{personalForm.email}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="出生日期：" prop="birthday">
                                        <span>{{personalForm.born |　timer}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="微信号：" prop="weixin">
                                        <span>{{personalForm.weixin}}</span>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
            <div class="archives">
                <div class="mbottom">
                    <div class="goods-fitter">
                        <div class="search-wrapper">
                            <h4 class="title">订单处理人信息</h4>
                            <div class="search-base">
                                <el-row>
                                    <el-col :span="22">
                                        <el-col :span="6">
                                            <el-form-item label="订单处理人姓名：" prop="order_name" label-width="135px">
                                                <span>{{personalForm.order_name}}</span>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-form-item label="订单处理人手机：" prop="order_mobile" label-width="135px">
                                                <span>{{personalForm.order_mobile}}</span>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-form-item label="订单处理人邮箱：" prop="order_email" label-width="135px">
                                                <span>{{personalForm.order_email}}</span>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-form-item label="订单处理人微信：" prop="order_wx" label-width="135px">
                                                <span>{{personalForm.order_wx}}</span>
                                            </el-form-item>
                                        </el-col>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="archives">
                <div class="mbottom">
                    <div class="goods-fitter">
                        <div class="search-wrapper">
                            <h4 class="title">订单售后信息</h4>
                            <div class="search-base">
                                <el-row>
                                    <el-col :span="22">
                                        <el-col :span="6">
                                            <el-form-item label="售后处理人姓名：" prop="consignee" label-width="135px">
                                                <span>{{personalForm.consignee}}</span>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-form-item label="售后处理人手机：" prop="telephone" label-width="135px">
                                                <span>{{personalForm.telephone}}</span>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-form-item
                                                    label="售后处理人邮箱："
                                                    prop="supplierReturn_email"
                                                    label-width="135px"
                                            >
                                                <span>{{personalForm.supplierReturn_email}}</span>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-form-item label="售后处理人微信：" prop="wechat" label-width="135px">
                                                <span>{{personalForm.wechat}}</span>
                                            </el-form-item>
                                        </el-col>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="22">
                                        <el-col :span="6">
                                            <el-form-item label="退货地址：" prop="returnaddress" label-width="135px">
                                                <el-col :span="24">
                                                    <el-form-item prop="province">
                                                        {{personalForm.provinceName}}-
                                                        {{personalForm.cityName}}-
                                                        {{personalForm.districtName}}
                                                    </el-form-item>
                                                </el-col>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="10">
                                            <el-form-item
                                                    label="详细地址："
                                                    prop="addressmore"
                                                    label-width="135px"
                                            >{{personalForm.addressmore}}</el-form-item>
                                        </el-col>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mbottom">
                <div class="goods-fitter">
                    <div class="search-wrapper">
                        <h4 class="title">总经理信息</h4>
                        <el-row>
                            <el-col :span="22">
                                <el-col :span="6">
                                    <el-form-item label="总经理：" prop="generalManagerName">
                                        <span>{{personalForm.generalManagerName}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="手机号码：" prop="generalManagerPhone">
                                        <span>{{personalForm.generalManagerPhone}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="公司电话：" prop="supplierPhone">
                                        <span>{{personalForm.supplierPhone}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="传真号码：" prop="fax">
                                        <span>{{personalForm.fax}}</span>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="22">
                                <el-col :span="6">
                                    <el-form-item label="微信号：" prop="generalManagerWechat">
                                        <span>{{personalForm.generalManagerWechat}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="邮箱：" prop="generalManagerEmail">
                                        <span>{{personalForm.generalManagerEmail}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="直线电话：" prop="name">
                                        <span>{{personalForm.generalManagerFixedPhone}}</span>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>

            <div class="mbottom">
                <div class="goods-fitter">
                    <div class="search-wrapper">
                        <h4 class="title">财务信息</h4>
                        <el-row>
                            <el-col :span="22">
                                <el-col :span="6">
                                    <el-form-item label="开户行：" prop="bankName">
                                        <span>{{personalForm.bankName}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="开户账号：" prop="bankAccount">
                                        <span>{{personalForm.bankAccount}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="纳税人识别号：" prop="identify">
                                        <span>{{personalForm.identify}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="注册地址：" prop="registeredAddress">
                                        <span>{{personalForm.registeredAddress}}</span>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="22">
                                <el-col :span="6">
                                    <el-form-item label="注册电话：" prop="registeredPhone">
                                        <span>{{personalForm.registeredPhone}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="18" class="way">
                                    <el-form-item label="结算方式：" prop="settleType">
                                        <span v-if="personalForm.settleType ==='0'">一件代发 月结</span>
                                        <span v-if="personalForm.settleType ==='1'">集采/批发 预付定金</span>
                                        <span v-if="personalForm.settleType ==='2'">一键代发 白条{{personalForm.creditLimit}}</span>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>

            <div class="mbottom">
                <div class="goods-fitter">
                    <div class="search-wrapper">
                        <h4 class="title">资质证件</h4>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="营业执照：" prop="name">
                                    <img
                                            :src="personalForm.BL_image_url"
                                            v-if="personalForm.BL_image_url"
                                            class="avatar"
                                    />
                                    <span v-if="!personalForm.BL_image_url">暂无</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="一般纳税人资格证：" prop="name" label-width="150px">
                                    <img
                                            :src="personalForm.taxpayerQualification"
                                            class="avatar"
                                            v-if="personalForm.taxpayerQualification"
                                    />
                                    <span v-if="!personalForm.taxpayerQualification">暂无</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row class="row_top business">
                            <el-form-item label="营业执照有效期：" prop="name">
                                <template v-if="personalForm.brand_time[0] && personalForm.brand_time[1]">
                                    {{ personalForm.brand_time[0].substring(0,10) }}
                                    至
                                    {{ personalForm.brand_time[1].substring(0,10) }}
                                </template>
                                <template v-else>
                                    暂无
                                </template>
                            </el-form-item>
                        </el-row>

                        <div class="line_div"></div>
                        <div class="search-base business">
                            <el-row>
                                <el-col :span="7">
                                    <el-form-item label="法人身份证扫描件正反面：" prop="name">
                                        <img
                                                v-if="personalForm.idCardFront"
                                                :src="personalForm.idCardFront"
                                                class="avatar"
                                        />
                                        <span v-if="!personalForm.idCardFront">暂无</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="7">
                                    <el-form-item label="品牌授权书：" prop="name" label-width="150px">
                                        <img
                                                v-if="personalForm.brandAuthUrl"
                                                :src="personalForm.brandAuthUrl"
                                                class="avatar"
                                        />
                                        <span v-if="!personalForm.brandAuthUrl">暂无</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="7">
                                    <el-form-item label="商标注册证：" prop="name" label-width="150px">
                                        <img
                                                v-if="personalForm.trademarkUrl"
                                                :src="personalForm.trademarkUrl"
                                                class="avatar1"
                                        />
                                        <span v-if="!personalForm.trademarkUrl">暂无</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row class="row_top">
                                <el-col :span="10">
                                    <el-form-item label="授权书有效期：" prop="name">
                                        <template v-if="personalForm.authorization[0] && personalForm.authorization[1]">
                                            {{ personalForm.authorization[0].substring(0,10) }}
                                            至
                                            {{ personalForm.authorization[1].substring(0,10) }}
                                        </template>
                                        <template v-else>
                                            暂无
                                        </template>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="商标有效期：" prop="name">
                                        <template v-if="personalForm.trademarkTime[0] && personalForm.trademarkTime[1]">
                                            {{ personalForm.trademarkTime[0].substring(0,10) }}
                                            至
                                            {{ personalForm.trademarkTime[1].substring(0,10) }}
                                        </template>
                                        <template v-else>
                                            暂无
                                        </template>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="line_div"></div>

                        <div class="search-base business">
                            <el-row>
                                <el-col :span="5">
                                    <el-form-item label="一级授权链：" prop="name">
                                        <img
                                                v-if="personalForm.authorizationChain1"
                                                :src="personalForm.authorizationChain1"
                                                class="avatar1"
                                        />
                                        <span v-if="!personalForm.authorizationChain1">暂无</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item label="二级授权链：" prop="name">
                                        <img
                                                v-if="personalForm.authorizationChain2"
                                                :src="personalForm.authorizationChain2"
                                                class="avatar1"
                                        />
                                        <span v-if="!personalForm.authorizationChain2">暂无</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item label="三级授权链：" prop="name">
                                        <img
                                                v-if="personalForm.authorizationChain3"
                                                :src="personalForm.authorizationChain3"
                                                class="avatar1"
                                        />
                                        <span v-if="!personalForm.authorizationChain3">暂无</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item label="四级授权链：" prop="name">
                                        <img
                                                v-if="personalForm.authorizationChain4"
                                                :src="personalForm.authorizationChain4"
                                                class="avatar1"
                                        />
                                        <span v-if="!personalForm.authorizationChain4">暂无</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="5">
                                    <el-form-item label="五级授权链：" prop="name">
                                        <img
                                                v-if="personalForm.authorizationChain5"
                                                :src="personalForm.authorizationChain5"
                                                class="avatar1"
                                        />
                                        <span v-if="!personalForm.authorizationChain5">暂无</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item label="六级授权链：" prop="name">
                                        <img
                                                v-if="personalForm.authorizationChain6"
                                                :src="personalForm.authorizationChain6"
                                                class="avatar1"
                                        />
                                        <span v-if="!personalForm.authorizationChain6">暂无</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item label="七级授权链：" prop="name">
                                        <img
                                                v-if="personalForm.authorizationChain7"
                                                :src="personalForm.authorizationChain7"
                                                class="avatar1"
                                        />
                                        <span v-if="!personalForm.authorizationChain7">暂无</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item label="八级授权链：" prop="name">
                                        <img
                                                v-if="personalForm.authorizationChain8"
                                                :src="personalForm.authorizationChain8"
                                                class="avatar1"
                                        />
                                        <span v-if="!personalForm.authorizationChain8">暂无</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row class="row_top">
                                <el-form-item label="授权链有效期：" prop="name">
                                    <template v-if="personalForm.authChainTime[0] && personalForm.authChainTime[1]">
                                        {{ personalForm.authChainTime[0].substring(0,10) }}
                                        至
                                        {{ personalForm.authChainTime[1].substring(0,10) }}
                                    </template>
                                    <template v-else>
                                        暂无
                                    </template>
                                </el-form-item>
                            </el-row>
                        </div>
                    </div>
                    <div class="btn" style="margin-left:45%;">
                        <el-button type="primary" @click="back" size="small">返回</el-button>
                    </div>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
	import {
		getSupplierarchives,
		getStoreList,
		supplierApplyPost,
		getNature,
		repeat,
		repeatAcount,
		supplierApplyEdior,
		getSupplieraudit,
		supplierApplyPostByid,
		getSupplieraudit1
	} from "@/api/supplier/index";
	import { getprovince, getcity } from "@/api/customer/index";
	import AccountNow from "./now";
	import AccountFirst from "./first";
	import AccountSecond from "./second";
	import AccountThird from "./third";
	export default {
		data() {
			var validateaccount = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入账号"));
				} else {
					if (this.personalForm.account !== "") {
						if (this.supplierId) {
							callback();
						} else {
							repeatAcount(this.personalForm.account).then(res => {
								if (res.code === 200) {
									callback();
								} else {
									callback(new Error("该账号已存在"));
								}
							});
						}
					}
				}
			};
			var companyaccount = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入公司名称"));
				} else {
					if (this.personalForm.company_name !== "") {
						if (this.supplierId) {
							callback();
						} else {
							repeat(this.personalForm.company_name).then(res => {
								if (res.code === 200) {
									callback();
								} else {
									callback(new Error("该公司已存在"));
								}
							});
						}
					}
				}
			};
			var validatePass = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入密码"));
				} else {
					if (this.personalForm.checkPass !== "") {
						this.$refs.personalForm.validateField("checkPass");
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请再次输入密码"));
				} else if (value !== this.personalForm.pass) {
					callback(new Error("两次输入密码不一致!"));
				} else {
					callback();
				}
			};
			var settle = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请再次输入密码"));
				} else {
					callback();
				}
			};
			return {
				currentIndex: 0,
				categoryArr: [], //品类名称数组
				company_options: [], //公司性质
				action: "", //图片上传地址
				supplierId: "", //供应商id
				auditStatus: 0,
				auditId: "",
				auditDetail: [], //审核详细内容
				auditDetails: [], //审核详细头部
				personalForm: {
					supplierName: "", //供应商名称
					supplierNature: "", //公司性质
					address: "", //公司地址
					compony_url: "", //公司网址
					account: "", // 账号
					pass: "", // 密码
					checkPass: "", // 确认密码
					agency_branch: "", // 代理品牌
					main_product: "", //主营商品
					wholesale: "1", // 支持一件代发: '1' 是 ， ‘2’ 否
					taxRate: "13%", //税率
					api: "0", //api对接  0  否  1 是
					category: "", //入驻品类
					supplier_name: "", //品类名称
					note: "", //备注
					contactName: "", //联系人
					department: "", //部门
					mobile: "", // 手机
					qq: "", // QQ号
					phone: "", // 固定电话
					email: "", //邮箱
					weixin: "", //微信号
					born: "", //出生日期
					order_mobile: "", // 订单处理人手机
					order_email: "", // 订单处理人邮箱
					order_wx: "", //订单处理人微信
					generalManagerName: "", //总经理
					generalManagerPhone: "", //总经理手机号码
					supplierPhone: "", //公司电话
					fax: "", //传真号码
					generalManagerWechat: "", //总经理微信号
					generalManagerEmail: "", //总经理邮箱
					generalManagerFixedPhone: "", //总经理直线电话
					bankName: "", //开户行
					bankAccount: "", //开户账号
					identify: "", //纳税人识别号
					registeredAddress: "", //注册地址
					registeredPhone: "", //注册电话
					settleType: "0", //结算方式
					ious: "", //京东白条额度
					ious_input: "", //京东白条额度自输入
					ious_readolay: false,
					wx: "",
					BL_image_url: "", // 营业执照图片地址
					BL_image_id: "", // 营业执照图片id
					brand_time: [], // 营业执照有效期
					taxpayerQualification: "", //一般纳税人资格证
					idCardFront: "", //法人身份证
					brandAuthUrl: "", //品牌授权书
					trademarkUrl: "", //商标注册证
					authorization: [], //授权书有效期
					trademarkTime: [], //商标有效期
					authorizationChain1: "", //一级授权链
					authorizationChain2: "", //二级授权链
					authorizationChain3: "", //三级授权链
					authorizationChain4: "", //四级授权链
					authorizationChain5: "", //五级授权链
					authorizationChain6: "", //六级授权链
					authorizationChain7: "", //七级授权链
					authorizationChain8: "", //八级授权链
					authChainTime: [], //授权链有效期
					provinceName: "",
					cityName: "",
					districtName: ""
				},
				personalRules: {
					supplierName: [
						{ required: true, message: "请填写供应商名称", trigger: "blur" }
					],
					supplierNature: [
						{ required: true, message: "请填写公司性质", trigger: "change" }
					],
					address: [
						{ required: true, message: "请填写公司地址", trigger: "blur" }
					],
					compony_url: [
						{ required: true, message: "请填写公司网址", trigger: "blur" }
					],
					account: [
						{ required: true, validator: validateaccount, trigger: "blur" }
					],
					pass: [
						{ required: true, validator: validatePass, trigger: "blur" },
						{
							min: 5,
							max: 16,
							message: "密码长度在 5 到 16 个字符",
							trigger: "blur"
						}
					],
					checkPass: [
						{ required: true, validator: validatePass2, trigger: "blur" }
					],
					mobile: [
						{ required: true, message: "请填写联系人手机号", trigger: "blur" }
					],

					qq: [{ required: true, message: "请填写QQ号码", trigger: "blur" }],
					wholesale: [
						{ required: true, message: "请选择是否支持一件代发", trigger: "blur" }
					],
					taxRate: [{ required: true, message: "请选择税率", trigger: "blur" }],
					category: [
						{ required: true, message: "请选择入驻品类", trigger: "blur" }
					], //入驻品类
					api: [{ required: true, message: "请填写api对接", trigger: "blur" }], // api对接
					agency_branch: [
						{ required: true, message: "请填写代理品牌", trigger: "blur" }
					], // 代理品牌
					main_product: [
						{ required: true, message: "请填写主营产品", trigger: "blur" }
					], // 主营产品
					supplier_name: [
						{ required: true, message: "请选择入驻品类", trigger: "blur" }
					], // 品类名称
					contactName: [
						{ required: true, message: "请输入联系人姓名", trigger: "blur" }
					],
					department: [
						{ required: true, message: "请输入部门名称", trigger: "blur" }
					],
					qq: [{ required: true, message: "请填写QQ号", trigger: "blur" }],
					mobile: [
						{ required: true, message: "请填写手机号码", trigger: "blur" }
					],
					company_name: [
						{ required: true, validator: companyaccount, trigger: "blur" }
					],
					address: [
						{ required: true, message: "请填写公司地址", trigger: "blur" }
					],
					branch: [
						{ required: true, message: "请填写自营品牌", trigger: "blur" }
					], // 自营品牌
					phone: [{ required: true, message: "请填写固定电话", trigger: "blur" }],
					generalManagerName: [
						{ required: true, message: "请填写总经理姓名", trigger: "blur" }
					], //总经理姓名
					supplierPhone: [
						{ required: true, message: "请填写公司电话", trigger: "blur" }
					], //公司电话
					generalManagerPhone: [
						{ required: true, message: "请填写总经理手机号码", trigger: "blur" }
					], //总经理手机号码
					bankName: [
						{ required: true, message: "请填写开户行", trigger: "blur" }
					], //开户行
					bankAccount: [
						{ required: true, message: "请填写开户账号", trigger: "blur" }
					], //开户账号
					registeredAddress: [
						{ required: true, message: "请填写注册地址", trigger: "blur" }
					], //注册地址
					identify: [
						{ required: true, message: "请填写纳税人识别号", trigger: "blur" }
					], //纳税人识别号
					registeredPhone: [
						{ required: true, message: "请填写注册电话", trigger: "blur" }
					], //注册电话
					generalManagerEmail: [
						{ required: false, message: "请填写邮箱", trigger: "blur" },
						{
							type: "email",
							message: "请填写正确的邮箱地址",
							trigger: ["blur", "change"]
						}
					],
					settleType: [{ required: true, validator: settle, trigger: "change" }], //结算方式
					email: [
						{ required: true, message: "请填写邮箱", trigger: "blur" },
						{
							type: "email",
							message: "请填写正确的邮箱地址",
							trigger: ["blur", "change"]
						}
					],
					BL_image_id: [
						{ required: true, message: "请上传营业执照", trigger: "blur" }
					],
					brand_time: [
						{ required: true, message: "请填写营业执照有效期", trigger: "blur" }
					],
					order_name: [
						{ required: true, message: "请填写订单处理人姓名", trigger: "blur" }
					],
					order_mobile: [
						{ required: true, message: "请填写订单处理人手机", trigger: "blur" }
					],
					order_wx: [
						{ required: true, message: "请填写订单处理人手机", trigger: "blur" }
					],
					order_email: [
						{ required: true, message: "请填写订单处理人邮箱", trigger: "blur" },
						{
							type: "email",
							message: "请填写正确的邮箱地址",
							trigger: ["blur", "change"]
						}
					]
				},
				options: [
					{ value: "家居日用", label: "家居日用" },
					{ value: "礼品箱包", label: "礼品箱包" },
					{ value: "美妆个护", label: "美妆个护" },
					{ value: "食品酒水", label: "食品酒水" },
					{ value: "母婴玩具", label: "母婴玩具" },
					{ value: "家用电器", label: "家用电器" },
					{ value: "汽车用品", label: "汽车用品" },
					{ value: "数据3C", label: "数据3C" },
					{ value: "户外运动", label: "户外运动" },
					{ value: "钟表首饰", label: "钟表首饰" },
					{ value: "电脑办公", label: "电脑办公" },
					{ value: "促销品", label: "促销品" }
				],
				settlement: [{ value: "0", label: "是" }, { value: "1", label: "否" }],
				tableData: []
			};
		},
		created() {
			this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
			this._getNature();
			if (this.$route.query.supplierId) {
				this.state = this.$route.query.state;
				this.supplierId = this.$route.query.supplierId;
				this.auditId = this.$route.query.auditId;
				this.auditStatus = this.$route.query.auditStatus;
				supplierApplyPostByid(this.supplierId).then(res => {
					this.personalForm.supplierName = res.data.supplierName; //供应商名称
					this.personalForm.supplierNature = res.data.supplierNature; //公司性质
					this.personalForm.address = res.data.supplierAddress; //公司地址
					this.personalForm.compony_url = res.data.supplierUrl; //公司网址
					this.personalForm.account = res.data.sysuser.sysuserAccount; //账号
					this.personalForm.pass = res.data.sysuser.password; //密码展示使用
					this.personalForm.checkPass = res.data.sysuser.password; //确实密码展示使用
					this.personalForm.agency_branch = res.data.agentBrand; //代理品牌
					this.personalForm.main_product = res.data.mainProduct; //主营商品
					this.personalForm.wholesale = res.data.isWholesale == false ? "2" : "1"; //主营商品
					this.personalForm.taxRate = res.data.extend.taxRate + "%"; //税率
					this.personalForm.api = res.data.isApi == false ? "0" : "1"; //api对接
					this.personalForm.supplier_name = res.data.supplierCategory; //品类名称
					this.personalForm.category = res.data.oneCategory+''+res.data.twoCategory; //品类名称
					//this.personalForm.category = res.data.supplierCategory; //入驻品类
					this.personalForm.note = res.data.remark; //备注
					this.personalForm.contactName = res.data.contacts[0].name; //联系人姓名
					this.personalForm.department = res.data.contacts[0].department; //部门部门
					this.personalForm.mobile = res.data.contacts[0].telephone; //手机
					this.personalForm.qq = res.data.contacts[0].qq; //QQ号
					this.personalForm.phone = res.data.contacts[0].fixedPhone; //固定电话
					this.personalForm.email = res.data.contacts[0].email; //邮箱
					this.personalForm.weixin = res.data.contacts[0].wechat; //微信号
					this.personalForm.born = res.data.contacts[0].birthday; //出生日期
					this.personalForm.order_name = res.data.contacts[1].name; //订单处理人姓名
					this.personalForm.order_mobile = res.data.contacts[1].telephone; //订单处理人手机
					this.personalForm.order_email = res.data.contacts[1].email; //订单处理人邮箱
					this.personalForm.order_wx = res.data.contacts[1].wechat; //订单处理人微信
					this.personalForm.generalManagerName = res.data.contacts[2].name; //总经理
					this.personalForm.generalManagerPhone = res.data.contacts[2].telephone; //总经理手机号码
					this.personalForm.supplierPhone = res.data.supplierPhone; //公司电话
					this.personalForm.fax = res.data.extend.fax; //传真号码
					this.personalForm.generalManagerWechat = res.data.contacts[2].wechat; //总经理微信号
					this.personalForm.generalManagerEmail = res.data.contacts[2].email; //总经理邮箱
					this.personalForm.generalManagerFixedPhone =
							res.data.contacts[2].fixedPhone; //总经理直线电话
					this.personalForm.bankName = res.data.extend.bankName; //开户行
					this.personalForm.bankAccount = res.data.extend.bankAccount; //开户账号
					this.personalForm.identify = res.data.extend.taxNumber; //纳税人识别号
					this.personalForm.registeredAddress = res.data.extend.registeredAddress; //注册地址
					this.personalForm.registeredPhone = res.data.extend.registeredPhone; //注册电话
					this.personalForm.settleType = JSON.stringify(res.data.settleType); //结算方式
					let formData = res.data;
					this.personalForm.consignee = formData.supplierReturn&&formData.supplierReturn.consignee||''; //售后人姓名
					this.personalForm.telephone = formData.supplierReturn&&formData.supplierReturn.telephone||''; //售后人电话
					this.personalForm.supplierReturn_email = formData.supplierReturn&&formData.supplierReturn.email||''; //售后人邮箱
					this.personalForm.wechat = formData.supplierReturn&&formData.supplierReturn.wechat||''; //售后微信
					this.personalForm.addressmore = formData.supplierReturn&&formData.supplierReturn.address||'';
					let province = formData.supplierReturn&&formData.supplierReturn.province||'';
					if(province!=''){
						getprovince().then(res => {
							res.data.list.forEach(item => {
								if (item.regionId === province) {
									this.personalForm.provinceName = item.regionName;
								}
							});
						});
					}
					let city = formData.supplierReturn&&formData.supplierReturn.city||'';
					if(city!=''){
						getcity(province).then(res => {
							res.data.list.forEach(item => {
								if (item.regionId === city) {
									this.personalForm.cityName = item.regionName;
								}
							});
						});
					}
					let district = formData.supplierReturn&&formData.supplierReturn.district||'';
					if(district!=''){
						getcity(city).then(res => {
							res.data.list.forEach(item => {
								if (item.regionId == district) {
									this.personalForm.districtName = item.regionName;
								}
							});
						});
					}
					// this.provincefunc(res.data.supplierReturn.province);
					this.personalForm.city = city;
					// this.cityfunc(res.data.supplierReturn.city);
					this.personalForm.district = district;
					// this.personalForm.returnaddress = res.data.supplierReturn.email; //退货地址
					this.personalForm.addressmore = res.data.supplierReturn.address; //售后微信
					if (
							res.data.creditLimit !== 3000 &&
							res.data.creditLimit !== 5000 &&
							res.data.creditLimit !== 10000
					) {
						this.personalForm.ious_input = res.data.creditLimit; //白条操作
						this.personalForm.ious = 1;
						this.personalForm.ious_readolay = false;
					} else {
						this.personalForm.ious = res.data.creditLimit;
						this.personalForm.ious_readolay = true;
					}
					this.personalForm.BL_image_url = res.data.extend.businessLicense; //营业执照图片地址
					this.personalForm.brand_time.push(res.data.extend.licenseTimeStart); //营业执照开始有效期
					this.personalForm.brand_time.push(res.data.extend.licenseTimeEnd); //营业执照结束有效期
					this.personalForm.taxpayerQualification =
							res.data.extend.taxpayerQualification; //一般纳税人资格证
					this.personalForm.idCardFront = res.data.extend.idCardFront; //法人身份证
					this.personalForm.brandAuthUrl = res.data.extend.brandAuthUrl; //品牌授权书
					this.personalForm.trademarkUrl = res.data.extend.trademarkUrl; //商标注册证
					this.personalForm.authorization.push(
							res.data.extend.authorizationTimeStart
					); //授权书开始有效期
					this.personalForm.authorization.push(
							res.data.extend.authorizationTimeEnd
					); //授权书结束有效期
					this.personalForm.trademarkTime.push(
							res.data.extend.trademarkTimeStart
					); //营业执照开始有效期
					this.personalForm.trademarkTime.push(res.data.extend.trademarkTimeEnd); //营业执照结束有效期
					this.personalForm.authChainTime.push(
							res.data.extend.authChainTimeStart
					); //授权链开始有效期
					this.personalForm.authChainTime.push(res.data.extend.authChainTimeEnd); //授权链结束有效期
					let authorizationChain = res.data.extend.authorizationChain||'<:><:><:><:><:><:><:>';
					this.personalForm.authorizationChain1 = authorizationChain.split(
							"<:>"
					)[0]
							? authorizationChain.split("<:>")[0]
							: ""; //一级授权链
					this.personalForm.authorizationChain2 = authorizationChain.split(
							"<:>"
					)[1]
							? authorizationChain.split("<:>")[1]
							: ""; //二级授权链
					this.personalForm.authorizationChain3 = authorizationChain.split(
							"<:>"
					)[2]
							? authorizationChain.split("<:>")[2]
							: ""; //三级授权链
					this.personalForm.authorizationChain4 = authorizationChain.split(
							"<:>"
					)[3]
							? authorizationChain.split("<:>")[3]
							: ""; //四级授权链
					this.personalForm.authorizationChain5 = authorizationChain.split(
							"<:>"
					)[4]
							? authorizationChain.split("<:>")[4]
							: ""; //五级授权链
					this.personalForm.authorizationChain6 = authorizationChain.split(
							"<:>"
					)[5]
							? authorizationChain.split("<:>")[5]
							: ""; //六级授权链
					this.personalForm.authorizationChain7 = authorizationChain.split(
							"<:>"
					)[6]
							? authorizationChain.split("<:>")[6]
							: ""; //七级授权链
					this.personalForm.authorizationChain8 = authorizationChain.split(
							"<:>"
					)[7]
							? authorizationChain.split("<:>")[7]
							: ""; //八级授权链
				});
			}
			this._getSupplieraudit();
		},
		computed: {},
		filters:{
			timer(val){
				return val
			}
		},
		methods: {
			tabIndex(index) {
				this.currentIndex = index;
				if (index == 0) {
					this.auditDetail = this.auditDetails;
				} else {
					this.auditDetail = this.auditDetails.filter(
							item => item.sortOrder == index
					);
				}
			},
			torecord(id) {
				this.currentIndex = 3;
				this.storeManagerId = id;
			},
			toLog(id) {
				this.currentIndex = 2;
				this.storeManagerId = id;
			},
			toRole() {
				this.currentIndex = 1;
			},
			//获取公司性质
			_getNature() {
				getNature().then(res => {
					this.company_options = res.data;
				});
			},
			//结算方式选择
			settleType(val) {
				this.personalForm.settleType = val;
			},
			category(val) {
				this.categoryArr.push(val);
				this.personalForm.supplier_name = this.categoryArr.join(",");
			},
			Theradio(val) {
				if (val != 1) {
					this.personalForm.ious_readolay = true;
					this.personalForm.ious_input = "";
				} else {
					this.personalForm.ious_readolay = false;
				}
			},
			//品牌授权书：：
			handleAvatarSuccess3(res, file) {
				this.personalForm.brandAuthUrl = res.data.domain + res.data.filePath;
			},
			//商标注册证：
			handleAvatarSuccess4(res, file) {
				this.personalForm.trademarkUrl = res.data.domain + res.data.filePath;
			},
			//一级授权链
			handleauthorSuccess1(res, file) {
				this.personalForm.authorizationChain1 =
						res.data.domain + res.data.filePath;
			},
			//二级授权链
			handleauthorSuccess2(res, file) {
				this.personalForm.authorizationChain2 =
						res.data.domain + res.data.filePath;
			},
			//三级授权链
			handleauthorSuccess3(res, file) {
				this.personalForm.authorizationChain3 =
						res.data.domain + res.data.filePath;
			},
			//四级授权链
			handleauthorSuccess4(res, file) {
				this.personalForm.authorizationChain4 =
						res.data.domain + res.data.filePath;
			},
			//五级授权链
			handleauthorSuccess5(res, file) {
				this.personalForm.authorizationChain5 =
						res.data.domain + res.data.filePath;
			},
			//六级授权链
			handleauthorSuccess6(res, file) {
				this.personalForm.authorizationChain6 =
						res.data.domain + res.data.filePath;
			},
			//七级授权链
			handleauthorSuccess7(res, file) {
				this.personalForm.authorizationChain7 =
						res.data.domain + res.data.filePath;
			},
			//八级授权链
			handleauthorSuccess8(res, file) {
				this.personalForm.authorizationChain8 =
						res.data.domain + res.data.filePath;
			},
			//确认
			confirm() {
				this.$refs.personalForm.validate(valid => {
					if (valid) {
						this._supplierApplyPost();
					} else {
						this.$notify({
							type: "warning",
							message: "请填写完整信息"
						});
						return false;
					}
				});
			},
			//审核详细数据请求
			_getSupplieraudit() {
				let obj = {};
				obj.auditId = this.auditId;
				obj.auditStatus = this.auditStatus;
				getSupplieraudit1(obj).then(res => {
					this.auditDetail = res.data.list[0].auditDetails;
					this.auditDetails = res.data.list[0].auditDetails;
					console.log(res.data.list[0].auditDetails);
				});
			},

			_supplierApplyPost() {
				let arr = [];
				arr.push(this.personalForm.authorizationChain1);
				arr.push(this.personalForm.authorizationChain2);
				arr.push(this.personalForm.authorizationChain3);
				arr.push(this.personalForm.authorizationChain4);
				arr.push(this.personalForm.authorizationChain5);
				arr.push(this.personalForm.authorizationChain6);
				arr.push(this.personalForm.authorizationChain7);
				arr.push(this.personalForm.authorizationChain8);
				let data = {};
				data.personalForm = this.personalForm;
				console.log("===========================");
				console.log(this.supplierId);
				console.log(arr);
				if (this.supplierId) {
					data.personalForm.pass = "";
					data.personalForm.checkPass = "";
					console.log(arr);
					supplierApplyEdior(data, arr, this.supplierId).then(res => {
						if (res.code == 200) {
							this.$message({
								message: res.message,
								type: "success"
							});
							this.$router.push({ name: "SupplierVerify" });
						} else {
							this.$message.error(res.message);
						}
					});
				} else {
					supplierApplyPost(data, arr).then(res => {
						if (res.code == 200) {
							this.$message({
								message: res.message,
								type: "success"
							});
							this.$router.push({ name: "SupplierFiles" });
						} else {
							this.$message.error(res.message);
						}
					});
				}
			},
			back() {
				this.$router.go(-1);
			},
			// handleAvatarSuccess(res, file) {
			//   this.imageUrl = URL.createObjectURL(file.raw);
			// },
			beforeAvatarUpload(file) {
				// const isJPG = file.type === 'image/jpeg';
				// const isLt2M = file.size / 1024 / 1024 < 2;
				// if (!isJPG) {
				//   this.$message.error('上传头像图片只能是 JPG 格式!');
				// }
				// if (!isLt2M) {
				//   this.$message.error('上传头像图片大小不能超过 2MB!');
				// }
				// return isJPG && isLt2M;
			}
		},
		components: {
			AccountNow,
			AccountFirst,
			AccountSecond,
			AccountThird
		},
		mounted(){
		}
	};
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

    .i-div {
        cursor: pointer;
        width: 32px;
        height: 32px;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .line-div {
        display: flex;
        justify-content: space-around;
        margin-left: 11px;
    }
    .yonghu {
        background: rgba(229, 162, 75, 1);
    }
    .gongneng {
        background: rgba(103, 194, 49, 1);
    }
    .iconfont {
        color: white;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 280px;
        height: 180px;
        line-height: 180px;
        text-align: center;
    }
    .avatar-uploader-icon1 {
        font-size: 28px;
        color: #8c939d;
        width: 150px;
        height: 180px;
        line-height: 180px;
        text-align: center;
    }
    .el-upload--picture-card {
        font-size: 28px;
        color: #8c939d;
        width: 280px;
        height: 180px;
        line-height: 180px;
        text-align: center;
    }
    .row_top {
        margin-top: 30px;
    }
    .line_div {
        width: 95%;
        margin-left: 2.5%;
        height: 1px;
        border: 1px dashed rgba(178, 214, 253, 1);
        margin: 20px 0;
    }
    .settleType_span {
        color: red;
        font-size: 14px;
        line-height: 32px;
    }
    .way {
        display: flex;
        line-height: 28px;
    }
    .loan {
        display: flex;
        align-items: center;
        font-size: 14px;
        line-height: 38px;
    }
    .avatar1 {
        width: 150px;
        height: 180px;
    }
    .avatar {
        width: 280px;
        height: 180px;
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
    ul {
        list-style: none;
    }
    .wrapper {
        margin-left: 30px;
        margin-top: 30px;
    }
    .noDetails {
        text-align: center;
    }
    .list {
        display: flex;
        flex-wrap: wrap;
        position: relative;
        .word {
            .el-icon-circle-check {
                color: #fff;
                position: absolute;
                left: 16px;
                bottom: 16px;
            }
            .el-icon-circle-close {
                color: #fff;
                position: absolute;
                left: 16px;
                bottom: 16px;
            }
        }
    }
    .item {
        position: relative;
        width: 440px;
        height: 300px;
        padding: 50px 33px 0;
        background: rgba(247, 250, 255, 1);
        border: 1px solid rgba(234, 237, 244, 1);
        border-radius: 6px;
        box-sizing: border-box;
        margin-bottom: 50px;
        margin-right: 45px;
    }
    .label {
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 0;
        border-top: 40px solid #669eff;
        border-right: 40px solid #669eff;
        border-left: 40px solid transparent;
        border-bottom: 40px solid transparent;
        border-radius: 0 6px 0 0;
    }
    .label_1 {
        border-top: 40px solid #669eff;
        border-right: 40px solid #669eff;
    }
    .label_2 {
        border-top: 40px solid #ff6671;
        border-right: 40px solid #ff6671;
    }
    .label_3 {
        border-top: 40px solid #f1ad49;
        border-right: 40px solid #f1ad49;
    }
    .word_line {
        display: flex;
        align-items: baseline;
        margin-bottom: 20px;
        .el-icon-circle-check {
            color: #669eff;
        }
        .el-icon-circle-close {
            color: #ff6671;
        }
    }
    .tt {
        flex-shrink: 0;
        text-align: right;
        width: 72px;
        margin-right: 6px;
    }
    .t1 {
        display: inline-block;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(96, 98, 102, 1);
        line-height: 2;
    }
    .t2 {
        position: absolute;
        top: -13px;
        right: -45px;
        display: inline-block;
        width: 70px;
        transform: rotate(45deg);
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
    }
    .label_icon_wrap {
        position: absolute;
        top: -30px;
        right: -30px;
    }
    .avantar {
        display: inline-block;
        width: 16px;
        height: 18px;
        position: relative;
        top: 2px;
    }
    .avantar_pass {
        background: url("../../common/images/examine/avatar_pass.png");
    }
    .avantar_alert {
        background: url("../../common/images/examine/avatar_alert.png");
    }
    .avantar_failed {
        background: url("../../common/images/examine/avatar_fail.png");
    }
    .label_icon_wrap {
        display: inline-block;
        width: 14px;
        height: 14px;
    }
    .label_icon_wrap_pass {
        background: url("../../common/images/examine/icon_pass.png");
    }
    .label_icon_wrap_alert {
        background: url("../../common/images/examine/icon_alert.png");
    }
    .label_icon_wrap_failed {
        background: url("../../common/images/examine/icon_fail.png");
    }
</style>
