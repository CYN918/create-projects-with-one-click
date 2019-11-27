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
														<el-input v-model="list.templateName" size="small" style="width: 480px"></el-input>
												</el-form-item>
												<el-form-item label="商品地址:">
														<div style="display: flex;">
																<el-form-item prop="provinceId">
																		<el-cascader
																				expand-trigger="hover"
																				:options="areaData"
																				v-model="goodsarr"
																				:props="{ value: 'addressId', label: 'addressName',children:'childAddress'}"
																				@change="handleChange">
																		</el-cascader>
																</el-form-item>
														</div>
												</el-form-item>
												<el-form-item label="是否包邮:">
														<el-radio-group v-model="list.freeShipping" @change="changefreeShippingRadio">
																<el-radio :label="0">自定义运费</el-radio>
																<el-radio :label="1">卖家承担运费</el-radio>
														</el-radio-group>
												</el-form-item>
												<el-form-item label="计件方式:">
														<el-radio-group v-model="list.valuationMode" @change="changeRadio">
																<el-radio :label="1">按件数</el-radio>
																<el-radio :label="2">按重量</el-radio>
																<el-radio :label="3">按体积</el-radio>
														</el-radio-group>
												</el-form-item>
												<el-form-item label="运送方式:" v-if="showWayItem">
														<div style="display: flex;flex-direction: column;margin-right: 128px">
																<span style="color: #e9ebf0">除指定地区外,其余地区的运费采用"默认运费"</span>
																<!-------------------------1.快递--------------------------------->
																<el-checkbox v-model="checked1" @change="changeTable1($event)">快递</el-checkbox>
																<div class="search-wrapper" v-show="showItem1" style="margin-bottom: 40px;">
																		<div
																				style="display: flex;justify-content: flex-start;background-color: #f3f7fb;height: 62px;align-items: center;margin-bottom: 20px">
																				<el-form-item label="默认运费:" style="margin-bottom: 0">
																						<el-input v-model="defaultfreight1.firstUnit" size="small"
																											style="width: 120px"></el-input>
																						<span>{{newlabel1}}</span>
																				</el-form-item>
																				<el-form-item style="margin-bottom: 0">
																						<div style="display: flex">
																								<el-input v-model="defaultfreight1.firstCharge" size="small"
																													style="width: 80px"></el-input>
																								<span>元</span>
																						</div>
																				</el-form-item>
																				<el-form-item label="每增加:" style="margin-bottom: 0;">
																						<div style="display: flex">
																								<el-input v-model="defaultfreight1.continueUnit" size="small"
																													style="width: 120px"></el-input>
																								<span>{{newlabel2}}</span>
																						</div>
																				</el-form-item>
																				<el-form-item label="增加运费:" style="margin-bottom: 0;">
																						<div style="display: flex">
																								<el-input v-model="defaultfreight1.continuePrice" size="small"
																													style="width: 120px"></el-input>
																								<span>元</span>
																						</div>
																				</el-form-item>
																		</div>
																		<!--表格数据源1-->
																		<el-table :data="list.freightCalculate['1']" border
																							style="width: 100%;margin-bottom: 20px;" stripe>
																				<el-table-column prop="freightAddress" label="运送到" align="center">
																						<template slot-scope="scope">
																								<!--一级省份显示 :indeterminate="isIndeterminate"-->
																								<el-popover trigger="click" placement="bottom" width="840">
																										<el-checkbox v-for="(province,index) in scope.row.freightAddress"
																																 v-model="province.isCheck"
																																 @click.prevent.native="handleCheckProvince(province,scope.row,index)"
																																 style="margin-bottom: 40px;margin-right: 60px;width: 52px"
																																 :indeterminate="province.isIndeterminate">
																												<!--二级城市显示-->
																												<el-popover trigger="click" placement="right-start" width="308">
																														<el-checkbox
																																v-for="(city,childIndex) in province.childAddress"
																																:key="childIndex" :value="city.isCheck"
																																@change.prevent.native="handleCheckCity(province,city,scope.row,childIndex)"
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
																												<span>{{scope.row.idNick}}</span>
																												<el-button type="text" size="small"
																																	 @click="showCheckedArea(scope.row,scope.$index)"
																																	 style="margin-left: 20px">编辑
																												</el-button>
																										</div>
																								</el-popover>
																						</template>
																				</el-table-column>
																				<el-table-column prop="firstUnit" :label="label1" align="center">
																						<template slot-scope="scope">
																								<el-input v-model="scope.row.firstUnit" size="small"></el-input>
																						</template>
																				</el-table-column>
																				<el-table-column prop="firstCharge" :label="label2" align="center">
																						<template slot-scope="scope">
																								<el-input v-model="scope.row.firstCharge" size="small"></el-input>
																						</template>
																				</el-table-column>
																				<el-table-column prop="continueUnit" :label="label3" align="center">
																						<template slot-scope="scope">
																								<el-input v-model="scope.row.continueUnit" size="small"></el-input>
																						</template>
																				</el-table-column>
																				<el-table-column prop="continuePrice" :label="label4" align="center">
																						<template slot-scope="scope">
																								<el-input v-model="scope.row.continuePrice" size="small"></el-input>
																						</template>
																				</el-table-column>
																				<el-table-column label="操作" align="center">
																						<template slot-scope="scope">
																								<el-button type="text" size="small"
																													 @click="deleteRow(scope.$index, list.freightCalculate['1'])">
																										删除
																								</el-button>
																						</template>
																				</el-table-column>
																		</el-table>
																		<div>
																				<el-button type="primary" size="small" @click="add">为指定地区城市设置运费</el-button>
																		</div>
																</div>
																<!-------------------------2.EMS--------------------------------->
																<el-checkbox v-model="checked2" @change="changeTable2($event)">EMS</el-checkbox>
																<div class="search-wrapper" v-show="showItem2" style="margin-bottom: 40px;">
																		<div
																				style="display: flex;justify-content: flex-start;background-color: #f3f7fb;height: 62px;align-items: center;margin-bottom: 20px">
																				<el-form-item label="默认运费:" style="margin-bottom: 0">
																						<el-input v-model="defaultfreight2.firstUnit" size="small"
																											style="width: 120px"></el-input>
																						<span>{{newlabel1}}</span>
																				</el-form-item>
																				<el-form-item style="margin-bottom: 0">
																						<div style="display: flex">
																								<el-input v-model="defaultfreight2.firstCharge" size="small"
																													style="width: 80px"></el-input>
																								<span>元</span>
																						</div>
																				</el-form-item>
																				<el-form-item label="每增加:" style="margin-bottom: 0;">
																						<div style="display: flex">
																								<el-input v-model="defaultfreight2.continueUnit" size="small"
																													style="width: 120px"></el-input>
																								<span>{{newlabel2}}</span>
																						</div>
																				</el-form-item>
																				<el-form-item label="增加运费:" style="margin-bottom: 0;">
																						<div style="display: flex">
																								<el-input v-model="defaultfreight2.continuePrice" size="small"
																													style="width: 120px"></el-input>
																								<span>元</span>
																						</div>
																				</el-form-item>
																		</div>
																		<!--表格数据源1-->
																		<el-table :data="list.freightCalculate['2']" border
																							style="width: 100%;margin-bottom: 20px;" stripe>
																				<el-table-column prop="freightAddress" label="运送到" align="center">
																						<template slot-scope="scope">
																								<!--一级省份显示 :indeterminate="isIndeterminate"-->
																								<el-popover trigger="click" placement="bottom" width="610">
																										<el-checkbox v-for="(province,index) in scope.row.freightAddress"
																																 v-model="province.isCheck"
																																 @click.prevent.native="handleCheckProvince2(province,scope.row,index)"
																																 style="margin-bottom: 20px"
																																 :indeterminate="province.isIndeterminate">
																												<!--二级城市显示-->
																												<el-popover trigger="hover" placement="bottom" width="400">
																														<el-checkbox
																																v-for="(city,childIndex) in province.childAddress"
																																:key="childIndex" :value="city.isCheck"
																																@change.prevent.native="handleCheckCity2(province,city,scope.row,childIndex)">
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
																												<span>{{scope.row.idNick}}</span>
																												<el-button type="text" size="small"
																																	 @click="showCheckedArea2(scope.row,scope.$index)"
																																	 style="margin-left: 20px">编辑
																												</el-button>
																										</div>
																								</el-popover>
																						</template>
																				</el-table-column>
																				<el-table-column prop="firstUnit" :label="label1" align="center">
																						<template slot-scope="scope">
																								<el-input v-model="scope.row.firstUnit" size="small"></el-input>
																						</template>
																				</el-table-column>
																				<el-table-column prop="firstCharge" :label="label2" align="center">
																						<template slot-scope="scope">
																								<el-input v-model="scope.row.firstCharge" size="small"></el-input>
																						</template>
																				</el-table-column>
																				<el-table-column prop="continueUnit" :label="label3" align="center">
																						<template slot-scope="scope">
																								<el-input v-model="scope.row.continueUnit" size="small"></el-input>
																						</template>
																				</el-table-column>
																				<el-table-column prop="continuePrice" :label="label4" align="center">
																						<template slot-scope="scope">
																								<el-input v-model="scope.row.continuePrice" size="small"></el-input>
																						</template>
																				</el-table-column>
																				<el-table-column label="操作" align="center">
																						<template slot-scope="scope">
																								<el-button type="text" size="small"
																													 @click="deleteRow2(scope.$index, list.freightCalculate['2'])">
																										删除
																								</el-button>
																						</template>
																				</el-table-column>
																		</el-table>
																		<div>
																				<el-button type="primary" size="small" @click="add2">为指定地区城市设置运费</el-button>
																		</div>
																</div>
																<!-------------------------3.平邮--------------------------------->
																<el-checkbox v-model="checked3" @change="changeTable3($event)">平邮</el-checkbox>
																<div class="search-wrapper" v-show="showItem3" style="margin-bottom: 40px;">
																		<div
																				style="display: flex;justify-content: flex-start;background-color: #f3f7fb;height: 62px;align-items: center;margin-bottom: 20px">
																				<el-form-item label="默认运费:" style="margin-bottom: 0">
																						<el-input v-model="defaultfreight3.firstUnit" size="small"
																											style="width: 120px"></el-input>
																						<span>{{newlabel1}}</span>
																				</el-form-item>
																				<el-form-item style="margin-bottom: 0">
																						<div style="display: flex">
																								<el-input v-model="defaultfreight3.firstCharge" size="small"
																													style="width: 80px"></el-input>
																								<span>元</span>
																						</div>
																				</el-form-item>
																				<el-form-item label="每增加:" style="margin-bottom: 0;">
																						<div style="display: flex">
																								<el-input v-model="defaultfreight3.continueUnit" size="small"
																													style="width: 120px"></el-input>
																								<span>{{newlabel2}}</span>
																						</div>
																				</el-form-item>
																				<el-form-item label="增加运费:" style="margin-bottom: 0;">
																						<div style="display: flex">
																								<el-input v-model="defaultfreight3.continuePrice" size="small"
																													style="width: 120px"></el-input>
																								<span>元</span>
																						</div>
																				</el-form-item>
																		</div>
																		<!--表格数据源1-->
																		<el-table :data="list.freightCalculate['3']" border
																							style="width: 100%;margin-bottom: 20px;" stripe>
																				<el-table-column prop="freightAddress" label="运送到" align="center">
																						<template slot-scope="scope">
																								<!--一级省份显示 :indeterminate="isIndeterminate"-->
																								<el-popover trigger="click" placement="bottom" width="610">
																										<el-checkbox v-for="(province,index) in scope.row.freightAddress"
																																 v-model="province.isCheck"
																																 @click.prevent.native="handleCheckProvince3(province,scope.row,index)"
																																 style="margin-bottom: 20px"
																																 :indeterminate="province.isIndeterminate">
																												<!--二级城市显示-->
																												<el-popover trigger="hover" placement="bottom" width="400">
																														<el-checkbox
																																v-for="(city,childIndex) in province.childAddress"
																																:key="childIndex" :value="city.isCheck"
																																@change.prevent.native="handleCheckCity3(province,city,scope.row,childIndex)">
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
																												<span>{{scope.row.idNick}}</span>
																												<el-button type="text" size="small"
																																	 @click="showCheckedArea3(scope.row,scope.$index)"
																																	 style="margin-left: 20px">编辑
																												</el-button>
																										</div>
																								</el-popover>
																						</template>
																				</el-table-column>
																				<el-table-column prop="firstUnit" :label="label1" align="center">
																						<template slot-scope="scope">
																								<el-input v-model="scope.row.firstUnit" size="small"></el-input>
																						</template>
																				</el-table-column>
																				<el-table-column prop="firstCharge" :label="label2" align="center">
																						<template slot-scope="scope">
																								<el-input v-model="scope.row.firstCharge" size="small"></el-input>
																						</template>
																				</el-table-column>
																				<el-table-column prop="continueUnit" :label="label3" align="center">
																						<template slot-scope="scope">
																								<el-input v-model="scope.row.continueUnit" size="small"></el-input>
																						</template>
																				</el-table-column>
																				<el-table-column prop="continuePrice" :label="label4" align="center">
																						<template slot-scope="scope">
																								<el-input v-model="scope.row.continuePrice" size="small"></el-input>
																						</template>
																				</el-table-column>
																				<el-table-column label="操作" align="center">
																						<template slot-scope="scope">
																								<el-button type="text" size="small"
																													 @click="deleteRow3(scope.$index, list.freightCalculate['3'])">
																										删除
																								</el-button>
																						</template>
																				</el-table-column>
																		</el-table>
																		<div>
																				<el-button type="primary" size="small" @click="add3">为指定地区城市设置运费</el-button>
																		</div>
																</div>
																<!-------------------------4.顺丰--------------------------------->
																<el-checkbox v-model="checked4" @change="changeTable4($event)">顺丰</el-checkbox>
																<div class="search-wrapper" v-show="showItem4" style="margin-bottom: 40px;">
																		<div
																				style="display: flex;justify-content: flex-start;background-color: #f3f7fb;height: 62px;align-items: center;margin-bottom: 20px">
																				<el-form-item label="默认运费:" style="margin-bottom: 0">
																						<el-input v-model="defaultfreight4.firstUnit" size="small"
																											style="width: 120px"></el-input>
																						<span>{{newlabel1}}</span>
																				</el-form-item>
																				<el-form-item style="margin-bottom: 0">
																						<div style="display: flex">
																								<el-input v-model="defaultfreight4.firstCharge" size="small"
																													style="width: 80px"></el-input>
																								<span>元</span>
																						</div>
																				</el-form-item>
																				<el-form-item label="每增加:" style="margin-bottom: 0;">
																						<div style="display: flex">
																								<el-input v-model="defaultfreight4.continueUnit" size="small"
																													style="width: 120px"></el-input>
																								<span>{{newlabel2}}</span>
																						</div>
																				</el-form-item>
																				<el-form-item label="增加运费:" style="margin-bottom: 0;">
																						<div style="display: flex">
																								<el-input v-model="defaultfreight4.continuePrice" size="small"
																													style="width: 120px"></el-input>
																								<span>元</span>
																						</div>
																				</el-form-item>
																		</div>
																		<!--表格数据源1-->
																		<el-table :data="list.freightCalculate['4']" border
																							style="width: 100%;margin-bottom: 20px;" stripe>
																				<el-table-column prop="freightAddress" label="运送到" align="center">
																						<template slot-scope="scope">
																								<!--一级省份显示 :indeterminate="isIndeterminate"-->
																								<el-popover trigger="click" placement="bottom" width="610">
																										<el-checkbox v-for="(province,index) in scope.row.freightAddress"
																																 v-model="province.isCheck"
																																 @click.prevent.native="handleCheckProvince4(province,scope.row,index)"
																																 style="margin-bottom: 20px"
																																 :indeterminate="province.isIndeterminate">
																												<!--二级城市显示-->
																												<el-popover trigger="hover" placement="bottom" width="400">
																														<el-checkbox
																																v-for="(city,childIndex) in province.childAddress"
																																:key="childIndex" :value="city.isCheck"
																																@change.prevent.native="handleCheckCity4(province,city,scope.row,childIndex)">
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
																												<span>{{scope.row.idNick}}</span>
																												<el-button type="text" size="small"
																																	 @click="showCheckedArea4(scope.row,scope.$index)"
																																	 style="margin-left: 20px">编辑
																												</el-button>
																										</div>
																								</el-popover>
																						</template>
																				</el-table-column>
																				<el-table-column prop="firstUnit" :label="label1" align="center">
																						<template slot-scope="scope">
																								<el-input v-model="scope.row.firstUnit" size="small"></el-input>
																						</template>
																				</el-table-column>
																				<el-table-column prop="firstCharge" :label="label2" align="center">
																						<template slot-scope="scope">
																								<el-input v-model="scope.row.firstCharge" size="small"></el-input>
																						</template>
																				</el-table-column>
																				<el-table-column prop="continueUnit" :label="label3" align="center">
																						<template slot-scope="scope">
																								<el-input v-model="scope.row.continueUnit" size="small"></el-input>
																						</template>
																				</el-table-column>
																				<el-table-column prop="continuePrice" :label="label4" align="center">
																						<template slot-scope="scope">
																								<el-input v-model="scope.row.continuePrice" size="small"></el-input>
																						</template>
																				</el-table-column>
																				<el-table-column label="操作" align="center">
																						<template slot-scope="scope">
																								<el-button type="text" size="small"
																													 @click="deleteRow4(scope.$index, list.freightCalculate['4'])">
																										删除
																								</el-button>
																						</template>
																				</el-table-column>
																		</el-table>
																		<div>
																				<el-button type="primary" size="small" @click="add4">为指定地区城市设置运费</el-button>
																		</div>
																</div>
																<!--------------------------5.指定条件包邮--------------------------->
																<el-checkbox v-model="checked5" @change="changeTable5($event)">指定条件包邮 可选</el-checkbox>
																<!--表格数据源5-->
																<div class="search-wrapper" v-show="showItem5" style="margin-bottom: 40px">
																		<el-table :data="list.freightFreeShipping" border
																							style="width: 100%;margin-bottom: 20px" stripe>
																				<el-table-column label="选择地区" align="center">
																						<template slot-scope="scope">
																								<!--一级省份显示 :indeterminate="isIndeterminate"-->
																								<el-popover trigger="click" placement="bottom" width="610">
																										<el-checkbox v-for="(province,index) in scope.row.freightAddress"
																																 v-model="province.isCheck"
																																 @click.prevent.native="handleCheckProvince5(province,scope.row,index)"
																																 style="margin-bottom: 20px"
																																 :indeterminate="province.isIndeterminate">
																												<!--二级城市显示-->
																												<el-popover trigger="hover" placement="bottom" width="400">
																														<el-checkbox
																																v-for="(city,childIndex) in province.childAddress"
																																:key="childIndex" :value="city.isCheck"
																																@change.prevent.native="handleCheckCity5(province,city,scope.row,childIndex)">
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
																												<span>{{scope.row.idNick}}</span>
																												<el-button type="text" size="small"
																																	 @click="showCheckedArea5(scope.row,scope.$index)"
																																	 style="margin-left: 20px">编辑
																												</el-button>
																										</div>
																								</el-popover>
																						</template>
																				</el-table-column>
																				<el-table-column label="选择包邮类型" align="center">
																						<template slot-scope="scope">
																								<el-select v-model="scope.row.freeShippingType" placeholder="请选择"
																													 @change="((val)=>{changeType(val, scope.row)})">
																										<el-option
																												v-for="item in optionsList"
																												:key="item.value"
																												:label="item.label"
																												:value="item.value">
																										</el-option>
																								</el-select>
																						</template>
																				</el-table-column>
																				<el-table-column prop="freeShippingNum" label="设置包邮件数" align="center">
																						<template slot-scope="scope">
																								<el-input v-model="scope.row.freeShippingNum" size="small"
																													v-if="scope.row.FeeType1"></el-input>
																						</template>
																				</el-table-column>
																				<el-table-column prop="freeShippingPrice" label="设置包邮金额" align="center">
																						<template slot-scope="scope">
																								<el-input v-model="scope.row.freeShippingPrice" size="small"
																													v-if="scope.row.FeeType2"></el-input>
																						</template>
																				</el-table-column>
																				<el-table-column prop="name" label="操作" align="center">
																						<template slot-scope="scope">
																								<el-button type="text" size="small"
																													 @click="deleteRow5(scope.$index, list.freightFreeShipping)">
																										删除
																								</el-button>
																						</template>
																				</el-table-column>
																		</el-table>
																		<el-button type="primary" size="small" @click="add5">为指定地区城市设置运费</el-button>
																</div>
														</div>
												</el-form-item>

												<div style="display: flex;justify-content: center">
														<el-button type="danger" size="small" @click="back">取消</el-button>
														<el-button type="primary" size="small" @click="submitData(list)">保存并返回</el-button>
												</div>
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
                text: '运费设置>编辑模板',
                type: '',//新增/编辑类型
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
            // this.getUser()
            // this._getprovince();
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
                        console.log(1, this.list)

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

                        //处理默认运费问题
                        for (var key in this.list.freightCalculate) {

                            console.log(2, this.list.freightCalculate[key])

                            this.list.freightCalculate[key] = this.list.freightCalculate[key].map(v => {
                                //默认运费
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
                                        // this.defaultfreight1 = JSON.parse(JSON.stringify(v))
                                    } else if (v.model == 2) {
                                        this.defaultfreight2 = {
                                            firstUnit: v.firstUnit,//首件
                                            firstCharge: v.firstCharge,//首费
                                            continueUnit: v.continueUnit,//续件
                                            continuePrice: v.continuePrice,//续费
                                            id: v.id,
                                            operating: 2
                                        }
                                        // this.defaultfreight2 = JSON.parse(JSON.stringify(v))
                                    } else if (v.model == 3) {
                                        this.defaultfreight3 = {
                                            firstUnit: v.firstUnit,//首件
                                            firstCharge: v.firstCharge,//首费
                                            continueUnit: v.continueUnit,//续件
                                            continuePrice: v.continuePrice,//续费
                                            id: v.id,
                                            operating: 2
                                        }
                                        // this.defaultfreight3 = JSON.parse(JSON.stringify(v))
                                    } else if (v.model == 4) {
                                        this.defaultfreight4 = {
                                            firstUnit: v.firstUnit,//首件
                                            firstCharge: v.firstCharge,//首费
                                            continueUnit: v.continueUnit,//续件
                                            continuePrice: v.continuePrice,//续费
                                            id: v.id,
                                            operating: 2
                                        }
                                        // this.defaultfreight4 = JSON.parse(JSON.stringify(v))
                                    }
                                } else {

                                    // console.log(33, v, v.freightAddress)
                                    if (v.freightAddress && v.freightAddress.length > 0) {
                                        v.freightAddress = this.areaData.map(u => {
                                            // v.freightAddress[0].forEach(t => {
                                            //     if (u.addressId == t) {
                                            //         console.log(u.addressId);
                                            //         this.$set(u, 'isCheck', true)
                                            //         // u.isCheck = true
                                            //     }
                                            //     u.childAddress.forEach(r => {
                                            //         if (r.addressId == t) {
                                            //             r.isCheck = true
                                            //         }
                                            //     })
                                            // })
                                            return u
                                        })
                                    }
                                    // console.log(44, v.freightAddress);

                                    //1.处理地区,-让默认显示选中
                                    // origin_list包含全部省份-带有check属性--比较v.freightAddress--最后赋值给dataList
                                    // v.freightAddress---返回要显示的
                                    //origin_list全部省份-包含check为false
                                    // if (v.freightAddress && v.freightAddress.length > 0) {
                                    //     v.freightAddress = v.freightAddress.map(o => {
                                    //         const arr1 = []
                                    //         arr1.push(o.addressId)
                                    //         if (o.childAddress) {
                                    //             o.childAddress.forEach(p => {
                                    //                 arr1.push(p.addressId)
                                    //             })
                                    //         }
                                    //         return arr1
                                    //     })
                                    // }
                                    // console.log(4455,v.freightAddress)
                                    // this.$set(v, 'origin_list', this.areaData)//----每行源数据

                                    // console.log(4, v.freightAddress[0])

                                }

                                // console.log(6, v.freightAddress)
                                this.$set(v, 'origin_list', this.areaData)//----每行源数据
                                this.$set(v, 'idNick', '')
                                this.$set(v, 'rowSelectArr', []) //当前行选中数据id
                                this.$set(v, 'operating', 2) //状态：0:删除，1:新增，2:更新
                                // v.dataList = JSON.parse(JSON.stringify(v.freightAddress))
                                // console.log(778899, v.freightAddress)
                                return v
                            })
                            // console.log(55, this.defaultfreight1)
                            this.list.freightCalculate[key] = this.list.freightCalculate[key].filter((v, index, array) => v.def == 0)
                        }

                        //处理第五个表格
                        if (this.list.freightFreeShipping && this.list.freightFreeShipping.length > 0) {
                            this.list.freightFreeShipping = this.list.freightFreeShipping.map(v => {
                                this.$set(v, 'origin_list', this.areaData)//----每行源数据
                                this.$set(v, 'idNick', '')
                                this.$set(v, 'rowSelectArr', []) //当前行选中数据id
                                this.$set(v, 'operating', 2) //状态：0:删除，1:新增，2:更新

                                return v
                            })
                        }

                        //处理表单地区显示问题
                        // console.log(this.list.goodsAddress)
                        this.goodsarr = []
                        this.goodsarr[0] = this.list.goodsAddress.addressId
                        this.goodsarr[1] = this.list.goodsAddress.childAddress[0].addressId
                        this.list.goodsAddress = [...this.goodsarr]
                        // console.log(222, this.goodsarr)
                    }
                })
            },
            //编辑提交
            submitData(data) {
                // console.log(1, data)

                let obj = JSON.parse(JSON.stringify(this.list))
                // console.log(2, obj)
                /*处理表格数据*/
                let table1 = []
                let table2 = []
                let table3 = []
                let table4 = []
                let table5 = []

                if (this.showItem1) {
                    //处理表格1
                    // console.log(3, obj.freightCalculate['1'])
                    table1 = obj.freightCalculate['1'].map((item) => {
                        const data1 = {
                            continuePrice: item.continuePrice,
                            continueUnit: item.continueUnit,
                            firstCharge: item.firstCharge,
                            firstUnit: item.firstUnit,
                            model: 1,
                            def: 0,
                            operating: item.operating,
                            id: item.id
                        }
                        data1.freightAddress = item.freightAddress.map((item2) => {
                            const data2 = {
                                addressId: item2.addressId,
                                addressName: item2.addressName,
                                isCheck: item2.isCheck,
                            }
                            data2.childAddress = item2.childAddress.map((item3) => {
                                return {
                                    addressId: item3.addressId,
                                    addressName: item3.addressName,
                                    isCheck: item3.isCheck
                                }
                            })
                            return data2
                        })
                        return data1
                    })
                    // console.log(222, this.defaultfreight1)
                    table1.push({
                        firstUnit: this.defaultfreight1.firstUnit,
                        firstCharge: this.defaultfreight1.firstCharge,
                        continueUnit: this.defaultfreight1.continueUnit,
                        continuePrice: this.defaultfreight1.continuePrice,
                        def: 1,
                        model: 1,
                        operating: this.defaultfreight1.operating,
                        id: this.defaultfreight1.id
                    });
                    //如果有删除的,把删除的添加进去
                    // console.log(666, this.deleteList1);
                    if (this.deleteList1 && this.deleteList1.length) {
                        this.deleteList1.forEach(b => {
                            table1.push({
                                continuePrice: b.continuePrice,
                                continueUnit: b.continueUnit,
                                firstCharge: b.firstCharge,
                                firstUnit: b.firstUnit,
                                model: 1,
                                def: 0,
                                operating: b.operating,
                                id: b.id,
                                freightAddress: b.freightAddress
                            })
                        })

                    }
                    // console.log(222, table1)
                    /*1.处理表格内地址问题*/
                    for (var key in table1) {
                        if (table1[key].freightAddress && table1[key].freightAddress.length > 0) {
                            // const newArr1 = table1[key].freightAddress.filter((item1, index1, array) => item1.isCheck == true)
                            // console.log(111, newArr1)
                            table1[key].freightAddress.forEach(item1 => {
                                if (!item1.isCheck) {
                                    item1.childAddress = item1.childAddress.filter((item2, index2, array) => item2.isCheck == true)
                                }
                            })
                            table1[key].freightAddress = table1[key].freightAddress.filter((item1, index1, array) => item1.childAddress.length != 0)

                            table1[key].freightAddress = table1[key].freightAddress.map(item1 => {
                                const data1 = {
                                    addressId: item1.addressId,
                                    addressName: item1.addressName,
                                }
                                data1.childAddress = item1.childAddress.map((item2) => {
                                    return {
                                        addressId: item2.addressId,
                                        addressName: item2.addressName,
                                    }
                                })
                                return data1
                            })
                            // console.log(12345, table1)
                        }
                    }
                }

                if (this.showItem2) {
                    //处理表格2
                    table2 = obj.freightCalculate['2'].map((item) => {
                        const data1 = {
                            continuePrice: item.continuePrice,
                            continueUnit: item.continueUnit,
                            firstCharge: item.firstCharge,
                            firstUnit: item.firstUnit,
                            model: 2,
                            def: 0,
                            operating: item.operating,
                            id: item.id
                        }
                        data1.freightAddress = item.freightAddress.map((item2) => {
                            const data2 = {
                                addressId: item2.addressId,
                                addressName: item2.addressName,
                                isCheck: item2.isCheck,
                            }
                            data2.childAddress = item2.childAddress.map((item3) => {
                                return {
                                    addressId: item3.addressId,
                                    addressName: item3.addressName,
                                    isCheck: item3.isCheck
                                }
                            })
                            return data2
                        })
                        return data1
                    })
                    table2.push({
                        firstUnit: this.defaultfreight2.firstUnit,
                        firstCharge: this.defaultfreight2.firstCharge,
                        continueUnit: this.defaultfreight2.continueUnit,
                        continuePrice: this.defaultfreight2.continuePrice,
                        def: 1,
                        model: 2,
                        operating: this.defaultfreight1.operating,
                        id: this.defaultfreight2.id
                    });
                    // console.log(222, table2)

                    //如果有删除的,把删除的添加进去
                    // console.log(666, this.deleteList2);
                    if (this.deleteList2 && this.deleteList2.length) {
                        this.deleteList2.forEach(b => {
                            table2.push({
                                continuePrice: b.continuePrice,
                                continueUnit: b.continueUnit,
                                firstCharge: b.firstCharge,
                                firstUnit: b.firstUnit,
                                model: 2,
                                def: 0,
                                operating: b.operating,
                                id: b.id,
                                freightAddress: b.freightAddress
                            })
                        })

                    }
                    /*2.处理表格内地址问题*/
                    for (var key in table2) {
                        // const newArr2 = table2[key].freightAddress.filter((item1, index1, array) => item1.isCheck == true)
                        // // console.log(111,newArr2)
                        if (table2[key].freightAddress && table2[key].freightAddress.length > 0) {
                            table2[key].freightAddress.forEach(item1 => {
                                if (!item1.isCheck) {
                                    item1.childAddress = item1.childAddress.filter((item2, index2, array) => item2.isCheck == true)
                                }
                            })
                            table2[key].freightAddress = table2[key].freightAddress.filter((item1, index1, array) => item1.childAddress.length != 0)

                            table2[key].freightAddress = table2[key].freightAddress.map(item1 => {
                                const data1 = {
                                    addressId: item1.addressId,
                                    addressName: item1.addressName,
                                }
                                data1.childAddress = item1.childAddress.map((item2) => {
                                    return {
                                        addressId: item2.addressId,
                                        addressName: item2.addressName,
                                    }
                                })
                                return data1
                            })
                        }
                    }
                    // console.log(table2[key].freightAddress)
                }

                if (this.showItem3) {
                    //处理表格3
                    table3 = obj.freightCalculate['3'].map((item) => {
                        const data1 = {
                            continuePrice: item.continuePrice,
                            continueUnit: item.continueUnit,
                            firstCharge: item.firstCharge,
                            firstUnit: item.firstUnit,
                            model: 3,
                            def: 0,
                            operating: item.operating,
                            id: item.id
                        }
                        data1.freightAddress = item.freightAddress.map((item2) => {
                            const data2 = {
                                addressId: item2.addressId,
                                addressName: item2.addressName,
                                isCheck: item2.isCheck,
                            }
                            data2.childAddress = item2.childAddress.map((item3) => {
                                const data3 = {
                                    addressId: item3.addressId,
                                    addressName: item3.addressName,
                                    isCheck: item3.isCheck,
                                }
                                return data3
                            })
                            return data2
                        })
                        return data1
                    })
                    table3.push({
                        firstUnit: this.defaultfreight3.firstUnit,
                        firstCharge: this.defaultfreight3.firstCharge,
                        continueUnit: this.defaultfreight3.continueUnit,
                        continuePrice: this.defaultfreight3.continuePrice,
                        def: 1,
                        model: 3,
                        operating: this.defaultfreight1.operating,
                        id: this.defaultfreight3.id
                    })
                    // console.log(4444, table3)
                    //如果有删除的,把删除的添加进去
                    // console.log(666, this.deleteList3);
                    if (this.deleteList3 && this.deleteList3.length) {
                        this.deleteList3.forEach(b => {
                            table3.push({
                                continuePrice: b.continuePrice,
                                continueUnit: b.continueUnit,
                                firstCharge: b.firstCharge,
                                firstUnit: b.firstUnit,
                                model: 3,
                                def: 0,
                                operating: b.operating,
                                id: b.id,
                                freightAddress: b.freightAddress
                            })
                        })

                    }
                    /*3.处理表格内地址问题*/
                    for (var key in table3) {
                        // const newArr3 = table3[key].freightAddress.filter((item1, index1, array) => item1.isCheck == true)
                        // console.log(newArr3)
                        if (table3[key].freightAddress && table3[key].freightAddress.length > 0) {
                            table3[key].freightAddress.forEach(item1 => {
                                if (!item1.isCheck) {
                                    item1.childAddress = item1.childAddress.filter((item2, index2, array) => item2.isCheck == true)
                                }
                            })
                            table3[key].freightAddress = table3[key].freightAddress.filter((item1, index1, array) => item1.childAddress.length != 0)
                            table3[key].freightAddress = table3[key].freightAddress.map(item1 => {
                                const data1 = {
                                    addressId: item1.addressId,
                                    addressName: item1.addressName,
                                }
                                data1.childAddress = item1.childAddress.map((item2) => {
                                    return {
                                        addressId: item2.addressId,
                                        addressName: item2.addressName,
                                    }
                                })
                                return data1
                            })
                        }
                    }
                }

                if (this.showItem4) {
                    //处理表格4
                    table4 = obj.freightCalculate['4'].map((item) => {
                        const data1 = {
                            continuePrice: item.continuePrice,
                            continueUnit: item.continueUnit,
                            firstCharge: item.firstCharge,
                            firstUnit: item.firstUnit,
                            model: 4,
                            def: 0,
                            operating: item.operating,
                            id: item.id
                        }
                        data1.freightAddress = item.freightAddress.map((item2) => {
                            const data2 = {
                                addressId: item2.addressId,
                                addressName: item2.addressName,
                                isCheck: item2.isCheck,

                            }
                            data2.childAddress = item2.childAddress.map((item3) => {
                                const data3 = {
                                    addressId: item3.addressId,
                                    addressName: item3.addressName,
                                    isCheck: item3.isCheck,
                                }
                                return data3
                            })
                            return data2
                        })
                        return data1
                    })
                    table4.push({
                        firstUnit: this.defaultfreight4.firstUnit,
                        firstCharge: this.defaultfreight4.firstCharge,
                        continueUnit: this.defaultfreight4.continueUnit,
                        continuePrice: this.defaultfreight4.continuePrice,
                        def: 1,
                        model: 4,
                        operating: this.defaultfreight1.operating,
                        id: this.defaultfreight4.id
                    })
                    // console.log(555, table4)
                    //如果有删除的,把删除的添加进去
                    // console.log(666, this.deleteList4);
                    if (this.deleteList4 && this.deleteList4.length) {
                        this.deleteList4.forEach(b => {
                            table4.push({
                                continuePrice: b.continuePrice,
                                continueUnit: b.continueUnit,
                                firstCharge: b.firstCharge,
                                firstUnit: b.firstUnit,
                                model: 4,
                                def: 0,
                                operating: b.operating,
                                id: b.id,
                                freightAddress: b.freightAddress
                            })
                        })

                    }
                    /*4.处理表格内地址问题*/
                    for (var key in table4) {
                        if (table4[key].freightAddress && table4[key].freightAddress.length > 0) {
                            // const newArr4 = table4[key].freightAddress.filter((item1, index1, array) => item1.isCheck == true)
                            // console.log(newArr4)
                            table4[key].freightAddress.forEach(item1 => {
                                if (!item1.isCheck) {
                                    item1.childAddress = item1.childAddress.filter((item2, index2, array) => item2.isCheck == true)
                                }
                            })
                            table4[key].freightAddress = table4[key].freightAddress.filter((item1, index1, array) => item1.childAddress.length != 0)
                            table4[key].freightAddress = table4[key].freightAddress.map(item1 => {
                                const data1 = {
                                    addressId: item1.addressId,
                                    addressName: item1.addressName,
                                }
                                data1.childAddress = item1.childAddress.map((item2) => {
                                    return {
                                        addressId: item2.addressId,
                                        addressName: item2.addressName,
                                    }
                                })
                                return data1
                            })
                        }
                    }
                }

                if (this.showItem5) {
                    // console.log(444, obj.freightFreeShipping)
                    // 处理表格5
                    table5 = obj.freightFreeShipping.map((item) => {

                        const data1 = {
                            freeShippingNum: item.freeShippingNum,
                            freeShippingPrice: item.freeShippingPrice,
                            freeShippingType: item.freeShippingType,
                            operating: item.operating,
                            id: item.id
                        }
                        data1.freightAddress = item.freightAddress.map((item2) => {
                            // console.log(444,item2)
                            const data2 = {
                                addressId: item2.addressId,
                                addressName: item2.addressName,
                                isCheck: item2.isCheck,
                            }
                            data2.childAddress = item2.childAddress.map((item3) => {
                                // console.log(555,item3)
                                return {
                                    addressId: item3.addressId,
                                    addressName: item3.addressName,
                                    isCheck: item3.isCheck,
                                }
                            })
                            return data2
                        })
                        return data1
                    })
                    // console.log(666, table5)
                    //如果有删除的,把删除的添加进去
                    // console.log(666, this.deleteList5);
                    if (this.deleteList5 && this.deleteList5.length) {
                        this.deleteList5.forEach(b => {
                            table5.push({
                                continuePrice: b.continuePrice,
                                continueUnit: b.continueUnit,
                                firstCharge: b.firstCharge,
                                firstUnit: b.firstUnit,
                                model: 5,
                                def: 0,
                                operating: b.operating,
                                id: b.id,
                                freightAddress: b.freightAddress
                            })
                        })

                    }
                    /*4.处理表格内地址问题*/
                    for (var key in table5) {
                        if (table5[key].freightAddress && table5[key].freightAddress.length > 0) {
                            // const newArr5 = table5[key].freightAddress.filter((item1, index1, array) => item1.isCheck == true)
                            // console.log(newArr5)
                            table5[key].freightAddress.forEach(item1 => {
                                if (!item1.isCheck) {
                                    item1.childAddress = item1.childAddress.filter((item2, index2, array) => item2.isCheck == true)
                                }
                            })
                            table5[key].freightAddress.forEach(item1 => {
                                if (!item1.isCheck) {
                                    item1.childAddress = item1.childAddress.filter((item2, index2, array) => item2.isCheck == true)
                                }
                            })
                            table5[key].freightAddress = table5[key].freightAddress.filter((item1, index1, array) => item1.childAddress.length != 0)
                            table5[key].freightAddress = table5[key].freightAddress.map(item1 => {
                                const data1 = {
                                    addressId: item1.addressId,
                                    addressName: item1.addressName,
                                }
                                data1.childAddress = item1.childAddress.map((item2) => {
                                    return {
                                        addressId: item2.addressId,
                                        addressName: item2.addressName,
                                    }
                                })
                                return data1
                            })
                        }
                    }
                    // console.log(888, table5)

                }


                obj.freightCalculate = []
                if (table1.length > 0) {
                    obj.freightCalculate = [...obj.freightCalculate, ...table1]
                }
                if (table2.length > 0) {
                    obj.freightCalculate = [...obj.freightCalculate, ...table2]
                }
                if (table3.length > 0) {
                    obj.freightCalculate = [...obj.freightCalculate, ...table3]
                }
                if (table4.length > 0) {
                    obj.freightCalculate = [...obj.freightCalculate, ...table4]
                }
                if (table5.length > 0) {
                    obj.freightFreeShipping = [...table5]
                } else {
                    obj.freightFreeShipping = []
                }
                // console.log(888, obj)

                /*处理表单的地区级联*/
                this.areaArr = JSON.parse(JSON.stringify(this.goodsarr))
                this.list.goodsAddress = {}
                this.list.goodsAddress.childAddress = []
                this.areaData.forEach(item => {
                    if (item.addressId == this.areaArr[0]) {
                        this.list.goodsAddress.addressId = item.addressId
                        this.list.goodsAddress.addressName = item.addressName
                    }
                    item.childAddress.forEach(item2 => {
                        if (item2.addressId == this.areaArr[1]) {
                            this.list.goodsAddress.childAddress.push({
                                addressId: item2.addressId,
                                addressName: item2.addressName
                            })
                        }
                    })
                })
                obj.goodsAddress = {}
                obj.goodsAddress.addressId = this.list.goodsAddress.addressId
                obj.goodsAddress.addressName = this.list.goodsAddress.addressName
                obj.goodsAddress.childAddress = this.list.goodsAddress.childAddress

                // console.log(111, obj)

                //编辑
                submitfreightSeteditData(obj).then(res => {
                    if (res.code == 200) {
                        this.$message.success('提交成功')
                        this.$router.push({name: 'freightSet'})
                    }
                })

            },
            //获取全部省市
            getArea() {
                getAllArea().then(res => {
                    if (res.code == 200) {
                        // console.log(res.data)
                        this.areaData = res.data
                        //处理value和label
                        this.areaData = JSON.parse(JSON.stringify(this.areaData).replace(/id/g, 'addressId'))    //data为数组，title为修改前，name为修
                        this.areaData = JSON.parse(JSON.stringify(this.areaData).replace(/regionName/g, 'addressName'))
                        this.areaData = JSON.parse(JSON.stringify(this.areaData).replace(/childRegion/g, 'childAddress'))
                        this.areaData.map(v => {
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
            /*----------------------------表格1:快递-------------------------------------*/
            //省份改变
            handleCheckProvince(param, row, index) {
                // console.log(param)
                //全选
                if (!param.isCheck) {
                    this.selectedArr.push(param.addressId)
                    //当前行选中的id
                    row.rowSelectArr.push(param.addressId)
                    if (param.childAddress.length) {
                        param.childAddress.forEach(item => {
                            this.selectedArr.push(item.addressId)
                            row.rowSelectArr.push(item.addressId)
                        })
                    }
                } else {
                    const index = this.selectedArr.indexOf(param.addressId) //删除全部选中的id
                    const num = row.rowSelectArr.indexOf(param.addressId) //删除当前行的id
                    this.selectedArr.splice(index, 1)
                    if (num != -1) {
                        row.rowSelectArr.splice(num, 1)
                    }
                    if (param.childAddress.length) {
                        param.childAddress.forEach(item => {
                            // 删除父级id
                            let index2 = this.selectedArr.indexOf(item.addressId)
                            this.selectedArr.splice(index2, 1)
                            let num2 = row.rowSelectArr.indexOf(item.addressId)
                            if (num2 != -1) {
                                row.rowSelectArr.splice(index2, 1) //删除子级id
                            }
                        })
                    }
                }
                // console.log(555, this.newList)
                //全选
                if (!param.isCheck) {
                    for (let i in param.childAddress) {
                        param.childAddress[i].isCheck = true
                        if (row.idNick) {
                            if (row.idNick.indexOf(param.childAddress[i]) == -1) {
                                row.idNick = row.idNick.replace(param.childAddress[i].addressName, ' ')
                            }
                            row.idNick = row.idNick + ' ' + param.childAddress[i].addressName
                        } else {
                            row.idNick = param.childAddress[i].addressName
                        }
                    }
                } else {
                    //全不选
                    for (let i in param.childAddress) {
                        param.childAddress[i].isCheck = false
                        if (row.idNick.indexOf(param.childAddress[i].addressName) !== -1) {
                            row.idNick = row.idNick.replace(param.childAddress[i].addressName, ' ')
                        }
                    }
                }
                //变成反选状态
                param.isCheck = !param.isCheck
                row.origin_list = row.freightAddress
            },
            //市改变
            handleCheckCity(parent, param, row, index) {
                // console.log(222, parent, param, row, index)
                param.isCheck = !param.isCheck
                let childrenLen = parent.childAddress.length
                let count = 0
                for (let i in parent.childAddress) {
                    if (parent.childAddress[i].isCheck === true) {
                        ++count
                    }
                }
                parent.isCheck = count === childrenLen;
                //如果选中--显示
                // console.log(1, this.newList)
                if (param.isCheck) {
                    row.idNick = row.idNick + ' ' + param.addressName
                    // console.log(11111, this.newList)
                } else {
                    if (row.idNick.indexOf(param.addressName) !== -1) {
                        row.idNick = row.idNick.replace(param.addressName, ' ')
                    }
                }
                /*--------------------------------------------------------------------*/
                if (param.isCheck) {
                    this.selectedArr.push(param.addressId)
                    //当前行选中的id
                    row.rowSelectArr.push(param.addressId)
                } else {
                    const index3 = this.selectedArr.indexOf(param.addressId) //删除选中的id
                    const num3 = row.rowSelectArr.indexOf(param.addressId) //删除当前行的id
                    this.selectedArr.splice(index3, 1)
                    if (num3 != -1) {
                        row.rowSelectArr.splice(num3, 1)
                    }
                }
                // console.log(3344,this.selectedArr,row.rowSelectArr)
                /*-------------------------------------------------------------------*/
                row.origin_list = row.freightAddress
            },
            //点击编辑按钮
            showCheckedArea(row, index) {
                const newArr = JSON.parse(JSON.stringify(this.areaData))

                if (this.selectedArr.length) {
                    this.selectedArr.forEach(item => {
                        this.deleteelement(item, newArr) //删除掉所有选中的数据
                    })
                }
                const secondArr = JSON.parse(JSON.stringify(this.areaData))
                if (row.rowSelectArr.length) {
                    row.rowSelectArr.forEach(val => {
                        this.addelement(val, secondArr, newArr) //添加当前行已经选中的数据
                    })
                }
                // console.log(777, newArr)
                row.freightAddress = newArr
            },
            //添加id相同的属性
            addelement(val, arr, newArr) {
                // console.log(222, newArr)
                for (let i in arr) {
                    if (arr[i].addressId == val) {
                        arr[i].isCheck = true
                        if (newArr) {
                            newArr.push(arr[i])
                        }
                    } else {
                        if (arr[i].childAddress && arr[i].childAddress.length) {
                            // console.log(444, arr[i].childAddress)
                            this.addelement(val, arr[i].childAddress, newArr[i].childAddress)
                            /*问题:市选能实现,全选实现不了!!*/
                        }
                    }
                    /*----------------------------------------------------------------*/

                    // for (let j in arr[i].children) {
                    //     if (arr[i].children[j].value == val) {
                    //         arr[i].children[j].isCheck = true
                    //         console.log(888, newArr[i].children);
                    //         if(newArr[i].children){
                    //             newArr[i].children.push(arr[i].children[j])
                    // 				}
                    //         // this.addelement(val, arr[i].children, newArr.children)
                    //     } else {
                    //         this.addelement(val, arr[i].children, newArr.children)
                    //     }
                    // }
                    /*------------------------------------------------------------------*/
                }
                return newArr
            },
            //删除id相等的属性
            deleteelement(val, arr) {
                for (let i in arr) {
                    if (arr[i].addressId == val) {
                        arr.splice(i, 1)
                    } else {
                        if (arr[i].childAddress && arr[i].childAddress.length) {
                            this.deleteelement(val, arr[i].childAddress)
                        }
                    }
                }
                return arr
            },
            //添加一行
            add() {
                // console.log(444, this.form)
                const newValue = {
                    "continuePrice": '',//续费
                    "continueUnit": '',//续件/续重/续体积
                    "def": 0,//是否默认：0-非默认；1-默认
                    "firstCharge": '',//首费
                    "firstUnit": '',//首件/首重/首体积
                    "freightAddress": [],//每行地区数据
                    "model": 1,//运送方式;1-快递；2-EMS；3-平邮；4-顺丰
                    "operating": 1
                }
                this.$set(newValue, 'origin_list', this.areaData)
                this.$set(newValue, 'idNick', '')
                this.$set(newValue, 'rowSelectArr', []) //当前行选中数据id
                // this.$set(newValue, 'operating', 1) //状态：0:删除，1:新增，2:更新
                this.list.freightCalculate['1'].push(newValue);
            },
            //点击删除按钮
            deleteRow(index, rows) {
                this.$confirm('是否确定移除此行', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                    .then(async () => {
                        if (rows[index].operating == 1) {
                            rows.splice(index, 1);
                            // console.log(12321,rows)
                        } else {
                            rows[index].operating = 0
                            //存储起来数据
                            this.deleteList1.push(rows[index])
                            rows.splice(index, 1);
                        }
                        // this.newDeleteList.push({
                        //     reportDetailId: rows[index].reportDetailId,
                        //     goodsNumber: rows[index].goodsNumber
                        // })
                        this.$message({type: 'success', message: '删除成功'})
                    })
            },
            /*----------------------------表格2:ems-------------------------------------*/
            //省份改变
            handleCheckProvince2(param, row, index) {
                // console.log(param)
                //全选
                if (!param.isCheck) {
                    this.selectedArr2.push(param.addressId)
                    //当前行选中的id
                    row.rowSelectArr.push(param.addressId)
                    if (param.childAddress.length) {
                        param.childAddress.forEach(item => {
                            this.selectedArr2.push(item.addressId)
                            row.rowSelectArr.push(item.addressId)
                        })
                    }
                } else {
                    const index = this.selectedArr2.indexOf(param.addressId) //删除全部选中的id
                    const num = row.rowSelectArr.indexOf(param.addressId) //删除当前行的id
                    this.selectedArr2.splice(index, 1)
                    if (num != -1) {
                        row.rowSelectArr.splice(num, 1)
                    }
                    if (param.childAddress.length) {
                        param.childAddress.forEach(item => {
                            // 删除父级id
                            let index2 = this.selectedArr2.indexOf(item.addressId)
                            this.selectedArr2.splice(index2, 1)
                            let num2 = row.rowSelectArr.indexOf(item.addressId)
                            if (num2 != -1) {
                                row.rowSelectArr.splice(index2, 1) //删除子级id
                            }
                        })
                    }
                }
                // console.log(555, this.newList)
                //全选
                if (!param.isCheck) {
                    for (let i in param.childAddress) {
                        param.childAddress[i].isCheck = true
                        if (row.idNick) {
                            if (row.idNick.indexOf(param.childAddress[i]) == -1) {
                                row.idNick = row.idNick.replace(param.childAddress[i].addressName, ' ')
                            }
                            row.idNick = row.idNick + ' ' + param.childAddress[i].addressName
                        } else {
                            row.idNick = param.childAddress[i].addressName
                        }
                    }
                } else {
                    //全不选
                    for (let i in param.childAddress) {
                        param.childAddress[i].isCheck = false
                        if (row.idNick.indexOf(param.childAddress[i].addressName) !== -1) {
                            row.idNick = row.idNick.replace(param.childAddress[i].addressName, ' ')
                        }
                    }
                }
                //变成反选状态
                param.isCheck = !param.isCheck
                row.origin_list = row.freightAddress
            },
            //市改变
            handleCheckCity2(parent, param, row, index) {
                // console.log(222, parent, param, row, index)
                param.isCheck = !param.isCheck
                let childrenLen = parent.childAddress.length
                let count = 0
                for (let i in parent.childAddress) {
                    if (parent.childAddress[i].isCheck === true) {
                        ++count
                    }
                }
                parent.isCheck = count === childrenLen;
                //如果选中--显示
                // console.log(1, this.newList)
                if (param.isCheck) {
                    row.idNick = row.idNick + ' ' + param.addressName
                    // console.log(11111, this.newList)
                } else {
                    if (row.idNick.indexOf(param.addressName) !== -1) {
                        row.idNick = row.idNick.replace(param.addressName, ' ')
                    }
                }
                /*--------------------------------------------------------------------*/
                if (param.isCheck) {
                    this.selectedArr2.push(param.addressId)
                    //当前行选中的id
                    row.rowSelectArr.push(param.addressId)
                } else {
                    const index3 = this.selectedArr2.indexOf(param.addressId) //删除选中的id
                    const num3 = row.rowSelectArr.indexOf(param.addressId) //删除当前行的id
                    this.selectedArr2.splice(index3, 1)
                    if (num3 != -1) {
                        row.rowSelectArr.splice(num3, 1)
                    }
                }
                // console.log(3344,this.selectedArr2,row.rowSelectArr)
                /*-------------------------------------------------------------------*/
                row.origin_list = row.freightAddress
            },
            //点击编辑按钮
            showCheckedArea2(row, index) {
                // console.log(234, row.freightAddress, row.origin_list)
                //处理每行的数据origin_list
                //将动态newList数据赋给origin_list
                const newArr = JSON.parse(JSON.stringify(this.areaData))

                if (this.selectedArr2.length) {
                    this.selectedArr2.forEach(item => {
                        this.deleteelement2(item, newArr) //删除掉所有选中的数据
                    })
                }
                const secondArr = JSON.parse(JSON.stringify(this.areaData))
                if (row.rowSelectArr.length) {
                    row.rowSelectArr.forEach(val => {
                        this.addelement2(val, secondArr, newArr) //添加当前行已经选中的数据
                    })
                }
                // console.log(777, newArr)
                row.freightAddress = newArr
            },
            //添加id相同的属性
            addelement2(val, arr, newArr) {
                // console.log(222, newArr)
                for (let i in arr) {
                    if (arr[i].addressId == val) {
                        arr[i].isCheck = true
                        if (newArr) {
                            newArr.push(arr[i])
                        }
                    } else {
                        if (arr[i].childAddress && arr[i].childAddress.length) {
                            // console.log(444, arr[i].childAddress)
                            this.addelement(val, arr[i].childAddress, newArr[i].childAddress)
                            /*问题:市选能实现,全选实现不了!!*/
                        }
                    }
                    /*----------------------------------------------------------------*/

                    // for (let j in arr[i].children) {
                    //     if (arr[i].children[j].value == val) {
                    //         arr[i].children[j].isCheck = true
                    //         console.log(888, newArr[i].children);
                    //         if(newArr[i].children){
                    //             newArr[i].children.push(arr[i].children[j])
                    // 				}
                    //         // this.addelement(val, arr[i].children, newArr.children)
                    //     } else {
                    //         this.addelement(val, arr[i].children, newArr.children)
                    //     }
                    // }
                    /*------------------------------------------------------------------*/
                }
                return newArr
            },
            //删除id相等的属性
            deleteelement2(val, arr) {
                for (let i in arr) {
                    if (arr[i].addressId == val) {
                        arr.splice(i, 1)
                    } else {
                        if (arr[i].childAddress && arr[i].childAddress.length) {
                            this.deleteelement(val, arr[i].childAddress)
                        }
                    }
                }
                return arr
            },
            //添加一行
            add2() {
                const newValue = {
                    "continuePrice": '',//续费
                    "continueUnit": '',//续件/续重/续体积
                    "def": 0,//是否默认：0-非默认；1-默认
                    "firstCharge": '',//首费
                    "firstUnit": '',//首件/首重/首体积
                    "freightAddress": [],//每行地区数据
                    "model": 2,//运送方式;1-快递；2-EMS；3-平邮；4-顺丰
                    "operating": 1
                }
                this.$set(newValue, 'origin_list', this.areaData)
                this.$set(newValue, 'idNick', '')
                this.$set(newValue, 'rowSelectArr', []) //当前行选中数据id
                // this.$set(newValue, 'operating', 1) //状态：0:删除，1:新增，2:更新
                // console.log(888, newValue)
                this.list.freightCalculate['2'].push(newValue);
            },
            //点击删除按钮
            deleteRow2(index, rows) {
                this.$confirm('是否确定移除此行', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                    .then(async () => {
                        if (rows[index].operating == 1) {
                            rows.splice(index, 1);
                            // console.log(12321,rows)
                        } else {
                            rows[index].operating = 0
                            //存储起来数据
                            this.deleteList2.push(rows[index])
                            rows.splice(index, 1);
                        }
                        // this.newDeleteList.push({
                        //     reportDetailId: rows[index].reportDetailId,
                        //     goodsNumber: rows[index].goodsNumber
                        // })
                        this.$message({type: 'success', message: '删除成功'})
                    })
            },
            /*----------------------------表格3:平邮-------------------------------------*/
            //省份改变
            handleCheckProvince3(param, row, index) {
                // console.log(param)
                //全选
                if (!param.isCheck) {
                    this.selectedArr3.push(param.addressId)
                    //当前行选中的id
                    row.rowSelectArr.push(param.addressId)
                    if (param.childAddress.length) {
                        param.childAddress.forEach(item => {
                            this.selectedArr3.push(item.addressId)
                            row.rowSelectArr.push(item.addressId)
                        })
                    }
                } else {
                    const index = this.selectedArr3.indexOf(param.addressId) //删除全部选中的id
                    const num = row.rowSelectArr.indexOf(param.addressId) //删除当前行的id
                    this.selectedArr3.splice(index, 1)
                    if (num != -1) {
                        row.rowSelectArr.splice(num, 1)
                    }
                    if (param.childAddress.length) {
                        param.childAddress.forEach(item => {
                            // 删除父级id
                            let index2 = this.selectedArr3.indexOf(item.addressId)
                            this.selectedArr3.splice(index2, 1)
                            let num2 = row.rowSelectArr.indexOf(item.addressId)
                            if (num2 != -1) {
                                row.rowSelectArr.splice(index2, 1) //删除子级id
                            }
                        })
                    }
                }
                // console.log(555, this.newList)
                //全选
                if (!param.isCheck) {
                    for (let i in param.childAddress) {
                        param.childAddress[i].isCheck = true
                        if (row.idNick) {
                            if (row.idNick.indexOf(param.childAddress[i]) == -1) {
                                row.idNick = row.idNick.replace(param.childAddress[i].addressName, ' ')
                            }
                            row.idNick = row.idNick + ' ' + param.childAddress[i].addressName
                        } else {
                            row.idNick = param.childAddress[i].addressName
                        }
                    }
                } else {
                    //全不选
                    for (let i in param.childAddress) {
                        param.childAddress[i].isCheck = false
                        if (row.idNick.indexOf(param.childAddress[i].addressName) !== -1) {
                            row.idNick = row.idNick.replace(param.childAddress[i].addressName, ' ')
                        }
                    }
                }
                //变成反选状态
                param.isCheck = !param.isCheck
                row.origin_list = row.freightAddress
            },
            //市改变
            handleCheckCity3(parent, param, row, index) {
                // console.log(222, parent, param, row, index)
                param.isCheck = !param.isCheck
                let childrenLen = parent.childAddress.length
                let count = 0
                for (let i in parent.childAddress) {
                    if (parent.childAddress[i].isCheck === true) {
                        ++count
                    }
                }
                parent.isCheck = count === childrenLen;
                //如果选中--显示
                // console.log(1, this.newList)
                if (param.isCheck) {
                    row.idNick = row.idNick + ' ' + param.addressName
                    // console.log(11111, this.newList)
                } else {
                    if (row.idNick.indexOf(param.addressName) !== -1) {
                        row.idNick = row.idNick.replace(param.addressName, ' ')
                    }
                }
                /*--------------------------------------------------------------------*/
                if (param.isCheck) {
                    this.selectedArr3.push(param.addressId)
                    //当前行选中的id
                    row.rowSelectArr.push(param.addressId)
                } else {
                    const index3 = this.selectedArr3.indexOf(param.addressId) //删除选中的id
                    const num3 = row.rowSelectArr.indexOf(param.addressId) //删除当前行的id
                    this.selectedArr3.splice(index3, 1)
                    if (num3 != -1) {
                        row.rowSelectArr.splice(num3, 1)
                    }
                }
                // console.log(3344,this.selectedArr3,row.rowSelectArr)
                /*-------------------------------------------------------------------*/
                // row.freightAddress = row.dataList
                row.origin_list = row.freightAddress
            },
            //点击编辑按钮
            showCheckedArea3(row, index) {
                // console.log(234, row.dataList, row.origin_list)
                //处理每行的数据origin_list
                //将动态newList数据赋给origin_list
                const newArr = JSON.parse(JSON.stringify(this.areaData))

                if (this.selectedArr3.length) {
                    this.selectedArr3.forEach(item => {
                        this.deleteelement3(item, newArr) //删除掉所有选中的数据
                    })
                }
                const secondArr = JSON.parse(JSON.stringify(this.areaData))
                if (row.rowSelectArr.length) {
                    row.rowSelectArr.forEach(val => {
                        this.addelement3(val, secondArr, newArr) //添加当前行已经选中的数据
                    })
                }
                // console.log(777, newArr)
                row.freightAddress = newArr
            },
            //添加id相同的属性
            addelement3(val, arr, newArr) {
                // console.log(222, newArr)
                for (let i in arr) {
                    if (arr[i].addressId == val) {
                        arr[i].isCheck = true
                        if (newArr) {
                            newArr.push(arr[i])
                        }
                    } else {
                        if (arr[i].childAddress && arr[i].childAddress.length) {
                            // console.log(444, arr[i].childAddress)
                            this.addelement(val, arr[i].childAddress, newArr[i].childAddress)
                            /*问题:市选能实现,全选实现不了!!*/
                        }
                    }
                    /*----------------------------------------------------------------*/

                    // for (let j in arr[i].children) {
                    //     if (arr[i].children[j].value == val) {
                    //         arr[i].children[j].isCheck = true
                    //         console.log(888, newArr[i].children);
                    //         if(newArr[i].children){
                    //             newArr[i].children.push(arr[i].children[j])
                    // 				}
                    //         // this.addelement(val, arr[i].children, newArr.children)
                    //     } else {
                    //         this.addelement(val, arr[i].children, newArr.children)
                    //     }
                    // }
                    /*------------------------------------------------------------------*/
                }
                return newArr
            },
            //删除id相等的属性
            deleteelement3(val, arr) {
                for (let i in arr) {
                    if (arr[i].addressId == val) {
                        arr.splice(i, 1)
                    } else {
                        if (arr[i].childAddress && arr[i].childAddress.length) {
                            this.deleteelement(val, arr[i].childAddress)
                        }
                    }
                }
                return arr
            },
            //添加一行
            add3() {
                const newValue = {
                    "continuePrice": '',//续费
                    "continueUnit": '',//续件/续重/续体积
                    "def": 0,//是否默认：0-非默认；1-默认
                    "firstCharge": '',//首费
                    "firstUnit": '',//首件/首重/首体积
                    "freightAddress": [],//每行地区数据
                    "model": 3,//运送方式;1-快递；2-EMS；3-平邮；4-顺丰
                    "operating": 1
                }
                this.$set(newValue, 'origin_list', this.areaData)
                this.$set(newValue, 'idNick', '')
                this.$set(newValue, 'rowSelectArr', []) //当前行选中数据id
                this.list.freightCalculate['3'].push(newValue);
            },
            //点击删除按钮
            deleteRow3(index, rows) {
                this.$confirm('是否确定移除此行', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                    .then(async () => {
                        if (rows[index].operating == 1) {
                            rows.splice(index, 1);
                            // console.log(12321,rows)
                        } else {
                            rows[index].operating = 0
                            //存储起来数据
                            this.deleteList3.push(rows[index])
                            rows.splice(index, 1);
                        }
                        // this.newDeleteList.push({
                        //     reportDetailId: rows[index].reportDetailId,
                        //     goodsNumber: rows[index].goodsNumber
                        // })
                        this.$message({type: 'success', message: '删除成功'})
                    })
            },
            /*----------------------------表格4:顺丰-------------------------------------*/
            //省份改变
            handleCheckProvince4(param, row, index) {
                // console.log(param)
                //全选
                if (!param.isCheck) {
                    this.selectedArr4.push(param.addressId)
                    //当前行选中的id
                    row.rowSelectArr.push(param.addressId)
                    if (param.childAddress.length) {
                        param.childAddress.forEach(item => {
                            this.selectedArr4.push(item.addressId)
                            row.rowSelectArr.push(item.addressId)
                        })
                    }
                } else {
                    const index = this.selectedArr4.indexOf(param.addressId) //删除全部选中的id
                    const num = row.rowSelectArr.indexOf(param.addressId) //删除当前行的id
                    this.selectedArr4.splice(index, 1)
                    if (num != -1) {
                        row.rowSelectArr.splice(num, 1)
                    }
                    if (param.childAddress.length) {
                        param.childAddress.forEach(item => {
                            // 删除父级id
                            let index2 = this.selectedArr4.indexOf(item.addressId)
                            this.selectedArr4.splice(index2, 1)
                            let num2 = row.rowSelectArr.indexOf(item.addressId)
                            if (num2 != -1) {
                                row.rowSelectArr.splice(index2, 1) //删除子级id
                            }
                        })
                    }
                }
                // console.log(555, this.newList)
                //全选
                if (!param.isCheck) {
                    for (let i in param.childAddress) {
                        param.childAddress[i].isCheck = true
                        if (row.idNick) {
                            if (row.idNick.indexOf(param.childAddress[i]) == -1) {
                                row.idNick = row.idNick.replace(param.childAddress[i].addressName, ' ')
                            }
                            row.idNick = row.idNick + ' ' + param.childAddress[i].addressName
                        } else {
                            row.idNick = param.childAddress[i].addressName
                        }
                    }
                } else {
                    //全不选
                    for (let i in param.childAddress) {
                        param.childAddress[i].isCheck = false
                        if (row.idNick.indexOf(param.childAddress[i].addressName) !== -1) {
                            row.idNick = row.idNick.replace(param.childAddress[i].addressName, ' ')
                        }
                    }
                }
                //变成反选状态
                param.isCheck = !param.isCheck
                row.origin_list = row.freightAddress
            },
            //市改变
            handleCheckCity4(parent, param, row, index) {
                // console.log(222, parent, param, row, index)
                param.isCheck = !param.isCheck
                let childrenLen = parent.childAddress.length
                let count = 0
                for (let i in parent.childAddress) {
                    if (parent.childAddress[i].isCheck === true) {
                        ++count
                    }
                }
                parent.isCheck = count === childrenLen;
                //如果选中--显示
                // console.log(1, this.newList)
                if (param.isCheck) {
                    row.idNick = row.idNick + ' ' + param.addressName
                    // console.log(11111, this.newList)
                } else {
                    if (row.idNick.indexOf(param.addressName) !== -1) {
                        row.idNick = row.idNick.replace(param.addressName, ' ')
                    }
                }
                /*--------------------------------------------------------------------*/
                if (param.isCheck) {
                    this.selectedArr4.push(param.addressId)
                    //当前行选中的id
                    row.rowSelectArr.push(param.addressId)
                } else {
                    const index3 = this.selectedArr4.indexOf(param.addressId) //删除选中的id
                    const num3 = row.rowSelectArr.indexOf(param.addressId) //删除当前行的id
                    this.selectedArr4.splice(index3, 1)
                    if (num3 != -1) {
                        row.rowSelectArr.splice(num3, 1)
                    }
                }
                // console.log(3344,this.selectedArr4,row.rowSelectArr)
                /*-------------------------------------------------------------------*/
                // row.freightAddress = row.dataList
                row.origin_list = row.freightAddress
            },
            //点击编辑按钮
            showCheckedArea4(row, index) {
                // console.log(234, row.dataList, row.origin_list)
                //处理每行的数据origin_list
                //将动态newList数据赋给origin_list
                const newArr = JSON.parse(JSON.stringify(this.areaData))

                if (this.selectedArr4.length) {
                    this.selectedArr4.forEach(item => {
                        this.deleteelement4(item, newArr) //删除掉所有选中的数据
                    })
                }
                const secondArr = JSON.parse(JSON.stringify(this.areaData))
                if (row.rowSelectArr.length) {
                    row.rowSelectArr.forEach(val => {
                        this.addelement4(val, secondArr, newArr) //添加当前行已经选中的数据
                    })
                }
                // console.log(777, newArr)
                row.freightAddress = newArr
            },
            //添加id相同的属性
            addelement4(val, arr, newArr) {
                // console.log(222, newArr)
                for (let i in arr) {
                    if (arr[i].addressId == val) {
                        arr[i].isCheck = true
                        if (newArr) {
                            newArr.push(arr[i])
                        }
                    } else {
                        if (arr[i].childAddress && arr[i].childAddress.length) {
                            // console.log(444, arr[i].childAddress)
                            this.addelement(val, arr[i].childAddress, newArr[i].childAddress)
                            /*问题:市选能实现,全选实现不了!!*/
                        }
                    }
                    /*----------------------------------------------------------------*/

                    // for (let j in arr[i].children) {
                    //     if (arr[i].children[j].value == val) {
                    //         arr[i].children[j].isCheck = true
                    //         console.log(888, newArr[i].children);
                    //         if(newArr[i].children){
                    //             newArr[i].children.push(arr[i].children[j])
                    // 				}
                    //         // this.addelement(val, arr[i].children, newArr.children)
                    //     } else {
                    //         this.addelement(val, arr[i].children, newArr.children)
                    //     }
                    // }
                    /*------------------------------------------------------------------*/
                }
                return newArr
            },
            //删除id相等的属性
            deleteelement4(val, arr) {
                for (let i in arr) {
                    if (arr[i].addressId == val) {
                        arr.splice(i, 1)
                    } else {
                        if (arr[i].childAddress && arr[i].childAddress.length) {
                            this.deleteelement(val, arr[i].childAddress)
                        }
                    }
                }
                return arr
            },
            //添加一行
            add4() {
                const newValue = {
                    "continuePrice": '',//续费
                    "continueUnit": '',//续件/续重/续体积
                    "def": 0,//是否默认：0-非默认；1-默认
                    "firstCharge": '',//首费
                    "firstUnit": '',//首件/首重/首体积
                    "freightAddress": [],//每行地区数据
                    "model": 4,//运送方式;1-快递；2-EMS；3-平邮；4-顺丰
                    "operating": 1
                }
                this.$set(newValue, 'origin_list', this.areaData)
                this.$set(newValue, 'idNick', '')
                this.$set(newValue, 'rowSelectArr', []) //当前行选中数据id
                this.list.freightCalculate['4'].push(newValue);
            },
            //点击删除按钮
            deleteRow4(index, rows) {
                this.$confirm('是否确定移除此行', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                    .then(async () => {
                        if (rows[index].operating == 1) {
                            rows.splice(index, 1);
                            // console.log(12321,rows)
                        } else {
                            rows[index].operating = 0
                            //存储起来数据
                            this.deleteList4.push(rows[index])
                            rows.splice(index, 1);
                        }
                        // this.newDeleteList.push({
                        //     reportDetailId: rows[index].reportDetailId,
                        //     goodsNumber: rows[index].goodsNumber
                        // })
                        this.$message({type: 'success', message: '删除成功'})
                    })
            },
            /*-------------------------------表格5:有条件包邮----------------------------------*/
            //省份改变
            handleCheckProvince5(param, row, index) {
                // console.log(param)
                // this.newList = JSON.parse(JSON.stringify(this.data))
                // this.newList.splice(index,1)

                //全选
                if (!param.isCheck) {
                    this.selectedArr2.push(param.addressId)
                    //当前行选中的id
                    row.rowSelectArr.push(param.addressId)
                    if (param.childAddress.length) {
                        param.childAddress.forEach(item => {
                            this.selectedArr2.push(item.addressId)
                            row.rowSelectArr.push(item.addressId)
                        })
                    }
                } else {
                    const index = this.selectedArr2.indexOf(param.addressId) //删除全部选中的id
                    const num = row.rowSelectArr.indexOf(param.addressId) //删除当前行的id
                    this.selectedArr2.splice(index, 1)
                    if (num != -1) {
                        row.rowSelectArr.splice(num, 1)
                    }
                    if (param.childAddress.length) {
                        param.childAddress.forEach(item => {
                            // 删除父级id
                            let index2 = this.selectedArr2.indexOf(item.addressId)
                            this.selectedArr2.splice(index2, 1)
                            let num2 = row.rowSelectArr.indexOf(item.addressId)
                            if (num2 != -1) {
                                row.rowSelectArr.splice(index2, 1) //删除子级id
                            }
                        })
                    }
                }
                // console.log(555, this.newList)
                //全选
                if (!param.isCheck) {
                    for (let i in param.childAddress) {
                        param.childAddress[i].isCheck = true
                        if (row.idNick) {
                            if (row.idNick.indexOf(param.childAddress[i]) == -1) {
                                row.idNick = row.idNick.replace(param.childAddress[i].addressName, ' ')
                            }
                            row.idNick = row.idNick + ' ' + param.childAddress[i].addressName
                        } else {
                            row.idNick = param.childAddress[i].addressName
                        }
                    }
                } else {
                    //全不选
                    for (let i in param.childAddress) {
                        param.childAddress[i].isCheck = false
                        if (row.idNick.indexOf(param.childAddress[i].addressName) !== -1) {
                            row.idNick = row.idNick.replace(param.childAddress[i].addressName, ' ')
                        }
                    }
                }
                //变成反选状态
                param.isCheck = !param.isCheck
                row.origin_list = row.freightAddress
            },
            //市改变
            handleCheckCity5(parent, param, row, index) {
                // console.log(222, parent, param, row, index)
                param.isCheck = !param.isCheck
                let childrenLen = parent.childAddress.length
                let count = 0
                for (let i in parent.childAddress) {
                    if (parent.childAddress[i].isCheck === true) {
                        ++count
                    }
                }
                parent.isCheck = count === childrenLen;
                //如果选中--显示
                // console.log(1, this.newList)
                if (param.isCheck) {
                    row.idNick = row.idNick + ' ' + param.addressName
                    // console.log(11111, this.newList)
                } else {
                    if (row.idNick.indexOf(param.addressName) !== -1) {
                        row.idNick = row.idNick.replace(param.addressName, ' ')
                    }
                }
                /*--------------------------------------------------------------------*/
                if (param.isCheck) {
                    this.selectedArr2.push(param.addressId)
                    //当前行选中的id
                    row.rowSelectArr.push(param.addressId)
                } else {
                    const index3 = this.selectedArr2.indexOf(param.addressId) //删除选中的id
                    const num3 = row.rowSelectArr.indexOf(param.addressId) //删除当前行的id
                    this.selectedArr2.splice(index3, 1)
                    if (num3 != -1) {
                        row.rowSelectArr.splice(num3, 1)
                    }
                }
                // console.log(3344,this.selectedArr2,row.rowSelectArr)
                /*-------------------------------------------------------------------*/
                row.origin_list = row.freightAddress
            },
            //点击编辑按钮
            showCheckedArea5(row, index) {
                // console.log(234, row.freightAddress, row.origin_list)
                const newArr = JSON.parse(JSON.stringify(this.areaData))

                if (this.selectedArr2.length) {
                    this.selectedArr2.forEach(item => {
                        this.deleteelement5(item, newArr) //删除掉所有选中的数据
                    })
                }
                const secondArr = JSON.parse(JSON.stringify(this.areaData))
                if (row.rowSelectArr.length) {
                    row.rowSelectArr.forEach(val => {
                        this.addelement5(val, secondArr, newArr) //添加当前行已经选中的数据
                    })
                }
                // console.log(777, newArr)
                row.freightAddress = newArr
            },
            //添加id相同的属性
            addelement5(val, arr, newArr) {
                // console.log(222, newArr)
                for (let i in arr) {
                    if (arr[i].addressId == val) {
                        arr[i].isCheck = true
                        if (newArr) {
                            newArr.push(arr[i])
                        }
                    } else {
                        if (arr[i].childAddress && arr[i].childAddress.length) {
                            // console.log(444, arr[i].childAddress)
                            this.addelement(val, arr[i].childAddress, newArr[i].childAddress)
                            /*问题:市选能实现,全选实现不了!!*/
                        }
                    }
                    /*----------------------------------------------------------------*/

                    // for (let j in arr[i].children) {
                    //     if (arr[i].children[j].value == val) {
                    //         arr[i].children[j].isCheck = true
                    //         console.log(888, newArr[i].children);
                    //         if(newArr[i].children){
                    //             newArr[i].children.push(arr[i].children[j])
                    // 				}
                    //         // this.addelement(val, arr[i].children, newArr.children)
                    //     } else {
                    //         this.addelement(val, arr[i].children, newArr.children)
                    //     }
                    // }
                    /*------------------------------------------------------------------*/
                }
                return newArr
            },
            //删除id相等的属性
            deleteelement5(val, arr) {
                for (let i in arr) {
                    if (arr[i].addressId == val) {
                        arr.splice(i, 1)
                    } else {
                        if (arr[i].childAddress && arr[i].childAddress.length) {
                            this.deleteelement(val, arr[i].childAddress)
                        }
                    }
                }
                return arr
            },
            //添加一行
            add5() {
                const newValue = {
                    freeShippingNum: '',//包邮件数
                    freeShippingPrice: '',//包邮金额
                    freeShippingType: '',//包邮类型：1-件数；2-金额
                    freightAddress: [],
                    operating: 1
                }
                this.$set(newValue, 'origin_list', this.areaData)
                this.$set(newValue, 'idNick', '')
                this.$set(newValue, 'rowSelectArr', []) //当前行选中数据id
                this.$set(newValue, 'FeeType1', false) //包邮条件1
                this.$set(newValue, 'FeeType2', false) //包邮条件2
                this.$set(newValue, 'operating', 1) //状态：0:删除，1:新增，2:更新
                this.list.freightFreeShipping.push(newValue);
            },
            //点击删除按钮
            deleteRow5(index, rows) {
                this.$confirm('是否确定移除此行', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                    .then(async () => {
                        if (rows[index].operating == 1) {
                            rows.splice(index, 1);
                            // console.log(12321,rows)
                        } else {
                            rows[index].operating = 0
                            //存储起来数据
                            this.deleteList5.push(rows[index])
                            rows.splice(index, 1);
                        }
                        // this.newDeleteList.push({
                        //     reportDetailId: rows[index].reportDetailId,
                        //     goodsNumber: rows[index].goodsNumber
                        // })
                        rows.splice(index, 1);
                        this.$message({type: 'success', message: '删除成功'})
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

</style>
