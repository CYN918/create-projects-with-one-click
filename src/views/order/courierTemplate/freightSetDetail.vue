<template>
		<div class="margin">
				<div class="mbottom">
						<div class="goods-fitter">
								<div class="search-wrapper">
										<el-page-header @back="back" :content="text"></el-page-header>
								</div>
						</div>
				</div>
				<div class="mbottom" style="height: 100%">
						<div class="goods-fitter" style="height: 100%">
								<el-form ref="list" :model="list" label-width="120px" size="small" style="height: 100%">
										<div class="search-wrapper" style="height: 100%">
												<el-form-item label="模板名称:">
														{{list.templateName}}
												</el-form-item>
												<el-form-item label="商品地址:">
														<span v-if="goodsarr&&goodsarr.length>0">{{goodsarr}}</span>
												</el-form-item>
												<el-form-item label="是否包邮:">
														<span v-if="list.freeShipping==0">自定义运费</span>
														<span v-if="list.freeShipping==1">卖家承担运费</span>
												</el-form-item>
												<el-form-item label="计件方式:">
														<span v-if="list.valuationMode==1">按件数</span>
														<span v-if="list.valuationMode==2">按重量</span>
														<span v-if="list.valuationMode==3">按体积</span>
												</el-form-item>
												<el-form-item label="运送方式:" v-if="showWayItem">
														<div style="display: flex;flex-direction: column;margin-right: 128px">
																<span style="color: #ced0d5">除指定地区外,其余地区的运费采用"默认运费"</span>
																<!-------------------------1.快递--------------------------------->
																<span v-if="checked1">快递</span>
																<div class="search-wrapper" v-show="showItem1" style="margin-bottom: 40px;">
																		<div style="display: flex;justify-content: flex-start;background-color: #f3f7fb;height: 62px;align-items: center;margin-bottom: 20px">
																				<el-form-item label="默认运费:" style="margin-bottom: 0">
																						{{defaultfreight1.firstUnit}}
																						<span>{{newlabel1}}</span>
																				</el-form-item>
																				<el-form-item style="margin-bottom: 0">
																						<div style="display: flex">
																								{{defaultfreight1.firstCharge}}
																								<span>元</span>
																						</div>
																				</el-form-item>
																				<el-form-item label="每增加:" style="margin-bottom: 0;">
																						<div style="display: flex">
																								{{defaultfreight1.continueUnit}}
																								<span>{{newlabel2}}</span>
																						</div>
																				</el-form-item>
																				<el-form-item label="增加运费:" style="margin-bottom: 0;">
																						<div style="display: flex">
																								{{defaultfreight1.continuePrice}}
																								<span>元</span>
																						</div>
																				</el-form-item>
																		</div>
																		<!--表格数据源1-->
																		<el-table :data="list.freightCalculate['1']" border
																							style="width: 100%;margin-bottom: 20px;" stripe>
																				<el-table-column prop="freightAddress" label="运送到" align="center" width="600">
																						<template slot-scope="scope">
																								<!--一级省份显示 :indeterminate="isIndeterminate"-->
																								<el-popover trigger="click" placement="bottom" width="840">
																										<el-checkbox v-for="(province,index) in scope.row.freightAddress"
																																 v-model="province.isCheck"
																																 @click.prevent.native="handleCheckProvince1(province,scope.row,index)"
																																 style="margin-bottom: 40px;margin-right: 60px;width: 52px"
																																 :indeterminate="province.isIndeterminate">
																												<!--二级城市显示-->
																												<el-popover trigger="hover" placement="right-start" width="308"
																																		:open-delay="50" :close-delay="50">
																														<el-checkbox
																																v-for="(city,childIndex) in province.childAddress"
																																:key="childIndex" :value="city.isCheck"
																																@change.prevent.native="handleCheckCity1(province,city,scope.row,childIndex)"
																																style="margin-bottom: 40px;margin-right: 50px;width: 90px">
																																<!--二级城市按钮文字-->
																																{{city.addressName}}
																														</el-checkbox>
																														<div slot="reference" class="name-wrapper">
																																<!--一级城市按钮文字-->
																																<span>{{province.addressName}}</span>
																														</div>
																												</el-popover>
																										</el-checkbox>
																										<div slot="reference" class="name-wrapper">
																												<span class="idNick_cs">{{scope.row.idNick}}</span>
																												<el-button type="text" size="small">详情</el-button>
																										</div>
																								</el-popover>
																						</template>
																				</el-table-column>
																				<el-table-column prop="firstUnit" :label="label1" align="center">
																						<template slot-scope="scope">
																								{{scope.row.firstUnit}}
																						</template>
																				</el-table-column>
																				<el-table-column prop="firstCharge" :label="label2" align="center">
																						<template slot-scope="scope">
																								{{scope.row.firstCharge}}
																						</template>
																				</el-table-column>
																				<el-table-column prop="continueUnit" :label="label3" align="center">
																						<template slot-scope="scope">
																								{{scope.row.continueUnit}}
																						</template>
																				</el-table-column>
																				<el-table-column prop="continuePrice" :label="label4" align="center">
																						<template slot-scope="scope">
																								{{scope.row.continuePrice}}
																						</template>
																				</el-table-column>
																		</el-table>
																</div>
																<!-------------------------2.EMS--------------------------------->
																<span v-if="checked2">EMS</span>
																<div class="search-wrapper" v-show="showItem2" style="margin-bottom: 40px;">
																		<div
																				style="display: flex;justify-content: flex-start;background-color: #f3f7fb;height: 62px;align-items: center;margin-bottom: 20px">
																				<el-form-item label="默认运费:" style="margin-bottom: 0">
																						{{defaultfreight2.firstUnit}}
																						<span>{{newlabel1}}</span>
																				</el-form-item>
																				<el-form-item style="margin-bottom: 0">
																						<div style="display: flex">
																								{{defaultfreight2.firstCharge}}
																								<span>元</span>
																						</div>
																				</el-form-item>
																				<el-form-item label="每增加:" style="margin-bottom: 0;">
																						<div style="display: flex">
																								{{defaultfreight2.continueUnit}}
																								<span>{{newlabel2}}</span>
																						</div>
																				</el-form-item>
																				<el-form-item label="增加运费:" style="margin-bottom: 0;">
																						<div style="display: flex">
																								{{defaultfreight2.continuePrice}}
																								<span>元</span>
																						</div>
																				</el-form-item>
																		</div>
																		<!--表格数据源1-->
																		<el-table :data="list.freightCalculate['2']" border
																							style="width: 100%;margin-bottom: 20px;" stripe>
																				<el-table-column prop="freightAddress" label="运送到" align="center" width="600">
																						<template slot-scope="scope">
																								<!--一级省份显示 :indeterminate="isIndeterminate"-->
																								<el-popover trigger="click" placement="bottom" width="840">
																										<el-checkbox v-for="(province,index) in scope.row.freightAddress"
																																 v-model="province.isCheck"
																																 @click.prevent.native="handleCheckProvince2(province,scope.row,index)"
																																 style="margin-bottom: 40px;margin-right: 60px;width: 52px"
																																 :indeterminate="province.isIndeterminate">
																												<!--二级城市显示-->
																												<el-popover trigger="hover" placement="right-start" width="308">
																														<el-checkbox
																																v-for="(city,childIndex) in province.childAddress"
																																:key="childIndex" :value="city.isCheck"
																																@change.prevent.native="handleCheckCity2(province,city,scope.row,childIndex)"
																																style="margin-bottom: 40px;margin-right: 50px;width: 90px">
																																<!--二级城市按钮文字-->
																																{{city.addressName}}
																														</el-checkbox>
																														<div slot="reference" class="name-wrapper">
																																<!--一级城市按钮文字-->
																																<span>{{province.addressName}}</span>
																														</div>
																												</el-popover>
																										</el-checkbox>
																										<div slot="reference" class="name-wrapper">
																												<span class="idNick_cs">{{scope.row.idNick}}</span>
																												<el-button type="text" size="small">详情</el-button>
																										</div>
																								</el-popover>
																						</template>
																				</el-table-column>
																				<el-table-column prop="firstUnit" :label="label1" align="center">
																						<template slot-scope="scope">
																								{{scope.row.firstUnit}}
																						</template>
																				</el-table-column>
																				<el-table-column prop="firstCharge" :label="label2" align="center">
																						<template slot-scope="scope">
																								{{scope.row.firstCharge}}
																						</template>
																				</el-table-column>
																				<el-table-column prop="continueUnit" :label="label3" align="center">
																						<template slot-scope="scope">
																								{{scope.row.continueUnit}}
																						</template>
																				</el-table-column>
																				<el-table-column prop="continuePrice" :label="label4" align="center">
																						<template slot-scope="scope">
																								{{scope.row.continuePrice}}
																						</template>
																				</el-table-column>
																		</el-table>
																</div>
																<!-------------------------3.平邮--------------------------------->
																<span v-if="checked3">平邮</span>
																<div class="search-wrapper" v-show="showItem3" style="margin-bottom: 40px;">
																		<div
																				style="display: flex;justify-content: flex-start;background-color: #f3f7fb;height: 62px;align-items: center;margin-bottom: 20px">
																				<el-form-item label="默认运费:" style="margin-bottom: 0">
																						{{defaultfreight3.firstUnit}}
																						<span>{{newlabel1}}</span>
																				</el-form-item>
																				<el-form-item style="margin-bottom: 0">
																						<div style="display: flex">
																								{{defaultfreight3.firstCharge}}
																								<span>元</span>
																						</div>
																				</el-form-item>
																				<el-form-item label="每增加:" style="margin-bottom: 0;">
																						<div style="display: flex">
																								{{defaultfreight3.continueUnit}}
																								<span>{{newlabel2}}</span>
																						</div>
																				</el-form-item>
																				<el-form-item label="增加运费:" style="margin-bottom: 0;">
																						<div style="display: flex">
																								{{defaultfreight3.continuePrice}}
																								<span>元</span>
																						</div>
																				</el-form-item>
																		</div>
																		<!--表格数据源1-->
																		<el-table :data="list.freightCalculate['3']" border
																							style="width: 100%;margin-bottom: 20px;" stripe>
																				<el-table-column prop="freightAddress" label="运送到" align="center" width="600">
																						<template slot-scope="scope">
																								<!--一级省份显示 :indeterminate="isIndeterminate"-->
																								<el-popover trigger="click" placement="bottom" width="840">
																										<el-checkbox v-for="(province,index) in scope.row.freightAddress"
																																 v-model="province.isCheck"
																																 style="margin-bottom: 40px;margin-right: 60px;width: 52px"
																																 @click.prevent.native="handleCheckProvince3(province,scope.row,index)"
																																 :indeterminate="province.isIndeterminate">
																												<!--二级城市显示-->
																												<el-popover trigger="hover" placement="right-start" width="308">
																														<el-checkbox
																																v-for="(city,childIndex) in province.childAddress"
																																:key="childIndex" :value="city.isCheck"
																																@change.prevent.native="handleCheckCity3(province,city,scope.row,childIndex)"
																																style="margin-bottom: 40px;margin-right: 50px;width: 90px">
																																<!--二级城市按钮文字-->
																																{{city.addressName}}
																														</el-checkbox>
																														<div slot="reference" class="name-wrapper">
																																<!--一级城市按钮文字-->
																																<span>{{province.addressName}}</span>
																														</div>
																												</el-popover>
																										</el-checkbox>
																										<div slot="reference" class="name-wrapper">
																												<span class="idNick_cs">{{scope.row.idNick}}</span>
																												<el-button type="text" size="small">详情</el-button>
																										</div>
																								</el-popover>
																						</template>
																				</el-table-column>
																				<el-table-column prop="firstUnit" :label="label1" align="center">
																						<template slot-scope="scope">
																								{{scope.row.firstUnit}}
																						</template>
																				</el-table-column>
																				<el-table-column prop="firstCharge" :label="label2" align="center">
																						<template slot-scope="scope">
																								{{scope.row.firstCharge}}
																						</template>
																				</el-table-column>
																				<el-table-column prop="continueUnit" :label="label3" align="center">
																						<template slot-scope="scope">
																								{{scope.row.continueUnit}}
																						</template>
																				</el-table-column>
																				<el-table-column prop="continuePrice" :label="label4" align="center">
																						<template slot-scope="scope">
																								{{scope.row.continuePrice}}
																						</template>
																				</el-table-column>
																		</el-table>
																</div>
																<!-------------------------4.顺丰--------------------------------->
																<span v-if="checked4">顺丰</span>
																<div class="search-wrapper" v-show="showItem4" style="margin-bottom: 40px;">
																		<div
																				style="display: flex;justify-content: flex-start;background-color: #f3f7fb;height: 62px;align-items: center;margin-bottom: 20px">
																				<el-form-item label="默认运费:" style="margin-bottom: 0">
																						{{defaultfreight4.firstUnit}}
																						<span>{{newlabel1}}</span>
																				</el-form-item>
																				<el-form-item style="margin-bottom: 0">
																						<div style="display: flex">
																								{{defaultfreight4.firstCharge}}
																								<span>元</span>
																						</div>
																				</el-form-item>
																				<el-form-item label="每增加:" style="margin-bottom: 0;">
																						<div style="display: flex">
																								{{defaultfreight4.continueUnit}}
																								<span>{{newlabel2}}</span>
																						</div>
																				</el-form-item>
																				<el-form-item label="增加运费:" style="margin-bottom: 0;">
																						<div style="display: flex">
																								{{defaultfreight4.continuePrice}}
																								<span>元</span>
																						</div>
																				</el-form-item>
																		</div>
																		<!--表格数据源1-->
																		<el-table :data="list.freightCalculate['4']" border
																							style="width: 100%;margin-bottom: 20px;" stripe>
																				<el-table-column prop="freightAddress" label="运送到" align="center" width="600">
																						<template slot-scope="scope">
																								<!--一级省份显示 :indeterminate="isIndeterminate"-->
																								<el-popover trigger="click" placement="bottom" width="840">
																										<el-checkbox v-for="(province,index) in scope.row.freightAddress"
																																 v-model="province.isCheck"
																																 @click.prevent.native="handleCheckProvince4(province,scope.row,index)"
																																 style="margin-bottom: 40px;margin-right: 60px;width: 52px"
																																 :indeterminate="province.isIndeterminate">
																												<!--二级城市显示-->
																												<el-popover trigger="hover" placement="right-start" width="308">
																														<el-checkbox
																																v-for="(city,childIndex) in province.childAddress"
																																:key="childIndex" :value="city.isCheck"
																																@change.prevent.native="handleCheckCity4(province,city,scope.row,childIndex)"
																																style="margin-bottom: 40px;margin-right: 50px;width: 90px">
																																<!--二级城市按钮文字-->
																																{{city.addressName}}
																														</el-checkbox>
																														<div slot="reference" class="name-wrapper">
																																<!--一级城市按钮文字-->
																																<span>{{province.addressName}}</span>
																														</div>
																												</el-popover>
																										</el-checkbox>
																										<div slot="reference" class="name-wrapper">
																												<span class="idNick_cs">{{scope.row.idNick}}</span>
																												<el-button type="text" size="small">详情</el-button>
																										</div>
																								</el-popover>
																						</template>
																				</el-table-column>
																				<el-table-column prop="firstUnit" :label="label1" align="center">
																						<template slot-scope="scope">
																								{{scope.row.firstUnit}}
																						</template>
																				</el-table-column>
																				<el-table-column prop="firstCharge" :label="label2" align="center">
																						<template slot-scope="scope">
																								{{scope.row.firstCharge}}
																						</template>
																				</el-table-column>
																				<el-table-column prop="continueUnit" :label="label3" align="center">
																						<template slot-scope="scope">
																								{{scope.row.continueUnit}}
																						</template>
																				</el-table-column>
																				<el-table-column prop="continuePrice" :label="label4" align="center">
																						<template slot-scope="scope">
																								{{scope.row.continuePrice}}
																						</template>
																				</el-table-column>
																		</el-table>
																</div>
																<!--------------------------5.指定条件包邮--------------------------->
																<span v-if="checked5">指定条件包邮</span>
																<!--表格数据源5-->
																<div class="search-wrapper" v-show="showItem5" style="margin-bottom: 40px">
																		<el-table :data="list.freightFreeShipping" border
																							style="width: 100%;margin-bottom: 20px" stripe>
																				<el-table-column label="地区" align="center" width="600">
																						<template slot-scope="scope">
																								<!--一级省份显示 :indeterminate="isIndeterminate"-->
																								<el-popover trigger="click" placement="bottom" width="800">
																										<el-checkbox v-for="(province,index) in scope.row.freightAddress"
																																 v-model="province.isCheck"
																																 @click.prevent.native="handleCheckProvince5(province,scope.row,index)"
																																 style="margin-bottom: 40px;margin-right: 60px;width: 52px"
																																 :indeterminate="province.isIndeterminate">
																												<!--二级城市显示-->
																												<el-popover trigger="hover" placement="right-start" width="308">
																														<el-checkbox
																																v-for="(city,childIndex) in province.childAddress"
																																:key="childIndex" :value="city.isCheck"
																																@change.prevent.native="handleCheckCity5(province,city,scope.row,childIndex)"
																																style="margin-bottom: 40px;margin-right: 50px;width: 90px">
																																<!--二级城市按钮文字-->
																																{{city.addressName}}
																														</el-checkbox>
																														<div slot="reference" class="name-wrapper">
																																<!--一级城市按钮文字-->
																																<span>{{province.addressName}}</span>
																														</div>
																												</el-popover>
																										</el-checkbox>
																										<div slot="reference" class="name-wrapper">
																												<span class="idNick_cs">{{scope.row.idNick}}</span>
																												<el-button type="text" size="small">详情</el-button>
																										</div>
																								</el-popover>
																						</template>
																				</el-table-column>
																				<el-table-column label="包邮类型" align="center">
																						<template slot-scope="scope">
																								<span v-if="scope.row.freeShippingType==1">按件数</span>
																								<span v-if="scope.row.freeShippingType==2">按金额</span>
																						</template>
																				</el-table-column>
																				<el-table-column prop="freeShippingNum" label="包邮件数" align="center">
																						<template slot-scope="scope">
																								<span v-if="scope.row.FeeType1">{{scope.row.freeShippingNum}}</span>
																						</template>
																				</el-table-column>
																				<el-table-column prop="freeShippingPrice" label="包邮金额" align="center">
																						<template slot-scope="scope">
																								<span v-if="scope.row.FeeType2">{{scope.row.freeShippingPrice}}</span>
																						</template>
																				</el-table-column>
																		</el-table>
																</div>
														</div>
												</el-form-item>
										</div>
								</el-form>
						</div>
				</div>
		</div>
</template>

<script>
    import {getAllArea, submitfreightSeteditData, geteditDetail} from "@/api/order/index";

    export default {
        data() {
            return {
                text: '运费设置>模板详情',
                type: '',//新增/编辑/详情类型
                templateId: '',//模板id
                defaultfreight1: {
                    firstUnit: '',//首件
                    firstCharge: '',//首费
                    continueUnit: '',//续件
                    continuePrice: '',//续费
                },//默认运费-必填
                defaultfreight2: {
                    firstUnit: '',//首件
                    firstCharge: '',//首费
                    continueUnit: '',//续件
                    continuePrice: '',//续费
                }, //默认运费-必填
                defaultfreight3: {
                    firstUnit: '',//首件
                    firstCharge: '',//首费
                    continueUnit: '',//续件
                    continuePrice: '',//续费
                },//默认运费-必填
                defaultfreight4: {
                    firstUnit: '',//首件
                    firstCharge: '',//首费
                    continueUnit: '',//续件
                    continuePrice: '',//续费
                },//默认运费-必填
                newlabel1: '件内',
                newlabel2: '件',
                label1: '首件(个)',
                label2: '首运费(元)',
                label3: '续件(个)',
                label4: '续费(元)',
                //表格数据源
                list: {
                    conditionFreeShipping: '',//是否指定条件字段包邮：0-不指定条件包邮;1-指定条件包邮
                    dealerId: 0,//经销商ID
                    freeShipping: '',//是否包邮： 0-不包邮;1-包邮
                    freightCalculate: {
                        "1": [],
                        "2": [],
                        "3": [],
                        "4": [],
                    },//运费计算
                    freightFreeShipping: [
                        {
                            freeShippingNum: '',//包邮件数
                            freeShippingPrice: '',//包邮金额
                            freeShippingType: '',//包邮类型：1-件数；2-金额
                            freightAddress: []//包邮地区
                        }
                    ],//包邮条件
                    goodsAddress: {
                        addressId: 0,//地址ID
                        addressName: "",//地址名称
                        childAddress: [
                            {
                                "addressId": 0,
                                "addressName": "",
                                "childAddress": [
                                    {}
                                ],
                                "level": 0
                            }
                        ],
                        "level": 0
                    },//商品地址
                    merchantId: 0,//商家ID
                    projectId: '0',//项目id
                    templateName: "",//模板名称
                    valuationMode: ''//计价方式;1-按件数;2-按重量;3-按体积
                },
                areaData: [],//地区数据源
                //运送方式数据
                optionsList: [
                    {
                        value: 1,
                        label: '件数'
                    },
                    {
                        value: 2,
                        label: '金额'
                    },
                ],
                isShowAreaModel: false,
                areaIndexArr: [],
                areaNameArr: [],

                newList: [],//地区动态变化数据源
                userId: '',
                checked1: '',//快递
                checked2: '',//ems
                checked3: '',//平邮
                checked4: '',//顺丰
                checked5: '',//指定条件包邮
                showItem1: false,//显示快递表格
                showItem2: false,//显示ems表格
                showItem3: false,//显示平邮表格
                showItem4: false,//显示顺丰表格
                showItem5: false,//显示指定条件表格
                showWayItem: false,//显示下方所有表格
                selectedArr: [], // 所有选中的数据1
                selectedArr2: [], //所有选中的数据2--有条件
                selectedArr3: [], //所有选中的数据3
                selectedArr4: [], //所有选中的数据4
                selectedArr5: [], //所有选中的数据5
                areaArr: [],
                goodsarr: [],//表单地区
                deleteList1: [],//删除的数据源
                deleteList2: [],//删除的数据源
                deleteList3: [],//删除的数据源
                deleteList4: [],//删除的数据源
                deleteList5: [],//删除的数据源
            }
        },
        created() {
            this.getArea()
            this.type = this.$route.query.type
            if (this.$route.query.id) {
                this.templateId = this.$route.query.id
                // this.getList()
            }
        },
        methods: {
            //获取编辑详情
            getEditDetail() {
                // console.log(33, this.areaData)
                let obj = {}
                obj.templateId = this.templateId
                geteditDetail(obj).then(res => {
                    if (res.code == 200) {
                        this.list = res.data
                        // console.log(1, this.list)

                        //上面四个表格值存在 则显示下面
                        this.showWayItem = !!this.list.freightCalculate;

                        //处理上面四个表格显示问题
                        for (var key in this.list.freightCalculate) {
                            // console.log(22,key)
                            if (key == 1) {
                                this.showItem1 = true
                                this.checked1 = true
                            }
                            if (key == 2) {
                                this.showItem2 = true
                                this.checked2 = true
                            }
                            if (key == 3) {
                                this.showItem3 = true
                                this.checked3 = true
                            }
                            if (key == 4) {
                                this.showItem4 = true
                                this.checked4 = true
                            }
                        }

                        //处理下面包邮条件表格显示问题-指定条件1&不指定条件0
                        if (this.list.conditionFreeShipping == 1) {
                            this.showWayItem = true

                            this.showItem5 = true
                            this.checked5 = true
                        }

                        //处理表格文字显示问题
                        this.changeRadio(this.list.valuationMode)

                        //处理运费问题
                        for (var key in this.list.freightCalculate) {

                            // console.log(2, this.list.freightCalculate[key])

                            this.list.freightCalculate[key] = this.list.freightCalculate[key].map(v => {

                                this.$set(v, 'origin_list', this.areaData)//----每行源数据
                                this.$set(v, 'rowSelectArr', []) //当前行选中数据id
                                this.$set(v, 'operating', 2) //状态：0:删除，1:新增，2:更新

                                //处理默认运费的显示
                                if (v.def == 1) {
                                    if (v.model == 1) {
                                        this.defaultfreight1 = {
                                            firstUnit: v.firstUnit,//首件
                                            firstCharge: v.firstCharge,//首费
                                            continueUnit: v.continueUnit,//续件
                                            continuePrice: v.continuePrice,//续费
                                            id: v.id,
                                            operating: 2
                                        }
                                    } else if (v.model == 2) {
                                        this.defaultfreight2 = {
                                            firstUnit: v.firstUnit,//首件
                                            firstCharge: v.firstCharge,//首费
                                            continueUnit: v.continueUnit,//续件
                                            continuePrice: v.continuePrice,//续费
                                            id: v.id,
                                            operating: 2
                                        }
                                    } else if (v.model == 3) {
                                        this.defaultfreight3 = {
                                            firstUnit: v.firstUnit,//首件
                                            firstCharge: v.firstCharge,//首费
                                            continueUnit: v.continueUnit,//续件
                                            continuePrice: v.continuePrice,//续费
                                            id: v.id,
                                            operating: 2
                                        }
                                    } else if (v.model == 4) {
                                        this.defaultfreight4 = {
                                            firstUnit: v.firstUnit,//首件
                                            firstCharge: v.firstCharge,//首费
                                            continueUnit: v.continueUnit,//续件
                                            continuePrice: v.continuePrice,//续费
                                            id: v.id,
                                            operating: 2
                                        }
                                    }
                                } else {
                                    //处理非默认地区的显示!!
                                    // console.log(3, v.freightAddress)

                                    v.freightAddress.forEach(p => {
                                        this.selectedArr.push(p.addressId)
                                        //当前行选中的id
                                        v.rowSelectArr.push(p.addressId)
                                        if (p.childAddress.length) {
                                            p.childAddress.forEach(q => {
                                                this.selectedArr.push(q.addressId)
                                                v.rowSelectArr.push(q.addressId)
                                            })
                                        }
                                    })

                                    //将返回的地区isCheck变成true
                                    if (v.freightAddress && v.freightAddress.length > 0) {
                                        //为了不改变地区数据源
                                        let newAreaList = JSON.parse(JSON.stringify(this.areaData))
                                        v.freightAddress = newAreaList.map(u => {
                                            v.freightAddress.forEach(t => {
                                                if (u.addressId == t.addressId) {
                                                    this.$set(u, 'isCheck', true)
                                                    // u.isCheck = true
                                                }
                                                u.childAddress.forEach(r => {
                                                    t.childAddress.forEach(b => {
                                                        if (r.addressId == b.addressId) {
                                                            r.isCheck = true
                                                            //设置显示省份到表格
                                                            if (v.idNick) {
                                                                v.idNick = v.idNick + ' ' + r.addressName
                                                            } else {
                                                                this.$set(v, 'idNick', r.addressName)
                                                            }
                                                        }
                                                    })
                                                })
                                            })
                                            return u
                                        })
                                    }
                                    // console.log(4, v.freightAddress);
                                }
                                return v
                            })
                            //过滤掉默认运费-默认1&非默认0
                            this.list.freightCalculate[key] = this.list.freightCalculate[key].filter((v, index, array) => v.def == 0)
                        }
                        // console.log(9, this.list.freightCalculate['1'][0])

                        //处理第五个表格
                        if (this.list.freightFreeShipping && this.list.freightFreeShipping.length > 0) {
                            this.list.freightFreeShipping = this.list.freightFreeShipping.map(v => {

                                this.$set(v, 'origin_list', this.areaData)//----每行源数据
                                this.$set(v, 'rowSelectArr', []) //当前行选中数据id
                                this.$set(v, 'operating', 2) //状态：0:删除，1:新增，2:更新
                                this.$set(v, 'FeeType1', false) //包邮条件1
                                this.$set(v, 'FeeType2', false) //包邮条件2

                                if (v.freeShippingType == 1) {
                                    this.$set(v, 'FeeType1', true)
                                    this.$set(v, 'FeeType2', false)
                                } else if (v.freeShippingType == 2) {
                                    this.$set(v, 'FeeType1', false)
                                    this.$set(v, 'FeeType2', true)
                                }

                                //处理地区
                                v.freightAddress.forEach(p => {
                                    this.selectedArr.push(p.addressId)
                                    //当前行选中的id
                                    v.rowSelectArr.push(p.addressId)
                                    if (p.childAddress.length) {
                                        p.childAddress.forEach(q => {
                                            this.selectedArr.push(q.addressId)
                                            v.rowSelectArr.push(q.addressId)
                                        })
                                    }
                                })

                                //处理表格地区文字显示
                                if (v.freightAddress && v.freightAddress.length > 0) {
                                    //为了不改变地区数据源
                                    let newAreaList = JSON.parse(JSON.stringify(this.areaData))
                                    v.freightAddress = newAreaList.map(u => {
                                        v.freightAddress.forEach(t => {
                                            if (u.addressId == t.addressId) {
                                                this.$set(u, 'isCheck', true)
                                                // u.isCheck = true
                                            }
                                            u.childAddress.forEach(r => {
                                                t.childAddress.forEach(b => {
                                                    if (r.addressId == b.addressId) {
                                                        r.isCheck = true
                                                        //设置显示省份到表格
                                                        if (v.idNick) {
                                                            v.idNick = v.idNick + ' ' + r.addressName
                                                        } else {
                                                            this.$set(v, 'idNick', r.addressName)
                                                        }
                                                    }
                                                })
                                            })
                                        })
                                        return u
                                    })
                                }
                                // console.log(4, v.freightAddress);


                                return v
                            })
                        }

                        //处理表单发货地区显示问题
                        this.goodsarr = []
                        this.goodsarr[0] = this.list.goodsAddress.addressName
                        this.goodsarr[1] = this.list.goodsAddress.childAddress[0].addressName
                        this.list.goodsAddress = [...this.goodsarr]
                        this.goodsarr = this.goodsarr.join(' ')
                    }
                })
            },
            //获取全部省市
            getArea() {
                getAllArea().then(res => {
                    if (res.code == 200) {
                        // console.log(55,res.data)
                        this.areaData = res.data
                        //处理value和label
                        this.areaData = JSON.parse(JSON.stringify(this.areaData).replace(/id/g, 'addressId'))//data为数组，title为修改前，name为修
                        this.areaData = JSON.parse(JSON.stringify(this.areaData).replace(/regionName/g, 'addressName'))
                        this.areaData = JSON.parse(JSON.stringify(this.areaData).replace(/childRegion/g, 'childAddress'))
                        this.areaData = this.areaData.map(v => {
                            this.$set(v, 'isCheck', false)
                            v.childAddress.map(u => {
                                this.$set(u, 'isCheck', false)
                                delete u.childAddress
                                return u
                            })
                            return v
                        })
                        //解决异步执行问题-获取详情
                        this.$nextTick(() => {
                            this.getEditDetail()
                        })
                        // console.log(1122, this.areaData)
                    }
                })
            },
            //获取当前用户id
            getUser() {
                var userData = JSON.parse(localStorage.getItem("user"));
                this.userId = userData.data.sysuserId
            },
            getList() {
                for (var i in this.list.freightCalculate) {
                    this.list.freightCalculate[i] = this.list.freightCalculate[i].map(v => {
                        this.$set(v, 'origin_list', this.areaData)//----每行源数据
                        this.$set(v, 'idNick', '')
                        this.$set(v, 'rowSelectArr', []) //当前行选中数据id
                        return v
                    })
                }
                this.list.freightFreeShipping = this.list.freightFreeShipping.map(v => {
                    this.$set(v, 'origin_list', this.areaData)//----每行源数据
                    this.$set(v, 'idNick', '')
                    this.$set(v, 'rowSelectArr', []) //当前行选中数据id
                    return v
                })
            },
            /*-----------------------------------表单其他内容-----------------------------------*/
            //是否包邮条件触发
            changefreeShippingRadio(val) {
                // console.log(111, val)
                this.showWayItem = val === 0;
            },
            //计件方式改变触发
            changeRadio(val) {
                if (val == 1) {
                    this.label1 = '首件(个)'
                    this.label3 = '续件(个)'
                    this.newlabel1 = '件内'
                    this.newlabel2 = '个'
                } else if (val == 2) {
                    this.label1 = '首体积(kg)'
                    this.label3 = '续体积(kg)'
                    this.newlabel1 = 'kg内'
                    this.newlabel2 = 'kg'
                } else if (val == 3) {
                    this.label1 = '首重(m³)'
                    this.label3 = '续重(m³)'
                    this.newlabel1 = 'm³内'
                    this.newlabel2 = 'm³'
                }
            },
            //点击快递显示表格1
            changeTable1(event) {
                // console.log(444, event)
                this.showItem1 = !!event;
            },
            //点击ems
            changeTable2(event) {
                // console.log(444, event)
                this.showItem2 = !!event;
            },
            //点击平邮
            changeTable3(event) {
                // console.log(444, event)
                this.showItem3 = !!event;
            },
            //点击顺丰
            changeTable4(event) {
                // console.log(444, event)
                this.showItem4 = !!event;
            },
            //点击按条件按钮
            changeTable5(event) {
                // console.log(444, event)
                this.showItem5 = !!event;
                if (event) {
                    this.list.conditionFreeShipping = 1
                } else {
                    this.list.conditionFreeShipping = 0
                }
            },
            //地区改变
            handleChange(value) {
                // console.log(value);
            },
            //包邮条件改变
            changeType(val, row) {
                // console.log(678, val, row)
                if (val == 1) {
                    row.FeeType1 = true
                    row.FeeType2 = false
                } else {
                    row.FeeType1 = false
                    row.FeeType2 = true
                }
            },
            //返回
            back() {
                this.$router.go(-1)
            }
        }
    }
</script>


<style lang="scss" scoped>
		@import "@/common/scss/variable.scss";

		.avatar {
				max-width: 300px;
				height: auto;
		}

		.clearfix:after {
				display: block;
				content: '';
				clear: both;
		}

		.clearfix {
				zoom: 1;
		}

		.line-div {
				display: inline-block;
		}

		.small-Idiv {
				float: left;
				margin: 5px 4px;
				cursor: pointer;
				width: 71px;
		}

		/* 搜索条件 */
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
								margin-left: -10px;
								font-size: 16px;
								font-weight: 400;
								color: #333;
								padding-left: 20px;
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

				/deep/ .el-popover .el-popper {
						max-width: 620px !important;
				}
		}

		.idNick_cs {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
		}

</style>
