<template>
		<div class="margin">
				<goods-fitter
						class="mbottom"
						@tabVender="handleGetGoodsList"
						:dataObj="form"
						@goodsFitter="handleGetGoodsList"
				></goods-fitter>
				<div class="mcard" style="border: 1px solid #d7e0f1;">
						<div class="mbottom">
								<!-- <el-checkbox v-model="checkedAll" @change='checkedAllfunc'>全选所有页</el-checkbox> -->
								<el-button
										type="primary"
										size="small"
										@click="dialogFormVisiblefunc(true)"
										style="margin-left:10px"
								>批量操作
								</el-button>
								<div v-if="this.form.third_party==1" class="btn_css">
										<el-button
												type="primary"
												size="small"
												@click="$router.push({  name: 'Myjd',query:{third_party:1}}) "
												v-permit="'goods:jd'"
										>京东商品
										</el-button>
										<el-button type="primary" size="small" @click="everyAdd" :loading="loading1"
															 v-permit="'goods:jdnew'">每日新增商品
										</el-button>
								</div>
								<div v-else-if="this.form.third_party==3" class="btn_css">
										<el-button
												type="primary"
												size="small"
												@click="$router.push({  name: 'Mysn',query:{third_party:2}}) "
												v-permit="'goods:suning'"
										>苏宁商品
										</el-button>
										<el-button type="primary" size="small" @click="everyAdd" :loading="loading2"
															 v-permit="'goods:suningnew'">每日新增商品
										</el-button>
								</div>
								<div v-else-if="this.form.third_party==2" class="btn_css">
										<el-button
												type="primary"
												size="small"
												@click="$router.push({  name: 'Myyx',query:{third_party:3}}) "
												v-permit="'goods:you'"
										>严选商品
										</el-button>
										<el-button type="primary" size="small" @click="everyAdd" :loading="loading3"
															 v-permit="'goods:you163new'">每日新增商品
										</el-button>
								</div>
								<el-button type="primary" size="small" v-else @click="addTo" v-permit="'Add:goods'">添加商品</el-button>
						</div>
						<el-table
								v-loading="loading"
								element-loading-text="拼命加载中"
								element-loading-spinner="el-icon-loading"
								element-loading-background="white"
								:data="tableData"
								stripe
								style="width: 100%"
								border
								ref="elTable"
								class="goods_index"
								@select="choose"
								@select-all="chooseAll"
						>
								<el-table-column type="selection" align="center"></el-table-column>
								<el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
								<el-table-column label="商品图片" align="center" width="120">
										<template slot-scope="scope">
												<div class="image" v-if="scope.row.skuInfo[scope.row.index].thumbnailImgUrl">
														<img
																@click="oepngoods(scope.row)"
																:src="scope.row.skuInfo[scope.row.index].thumbnailImgUrl"
																width="100"
																height="100"
																alt
														/>
												</div>
												<div v-if="!scope.row.skuInfo[scope.row.index].thumbnailImgUrl">暂无图片</div>
										</template>
								</el-table-column>
								<el-table-column label="商品信息" align="center" width="150">
										<template slot-scope="scope">
												<div class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
												<div class="txt_left" v-if="scope.row.showItem">货号：{{scope.row.goodsSn}}</div>
												<div class="txt_left">型号：{{scope.row.modelNumber}}</div>
												<div class="txt_left">品牌：{{scope.row.brandName}}</div>
												<div class="txt_left" v-if="scope.row.showItem">上传方式：{{scope.row.sourceType}}</div>
										</template>
								</el-table-column>
								<el-table-column label="价格信息" align="center" width="150">
										<template slot-scope="scope">
												<!--<div v-if="scope.row.showItem">-->
												<!-- 平台展示信息 -->
												<div v-if="scope.row.sourceTypeId == 2">
														<div class="txt_left">
																商城价：{{scope.row.skuInfo[scope.row.index].priceInfo.goodsPrice !=
																0?scope.row.skuInfo[scope.row.index].priceInfo.goodsPrice:'暂无'}}
														</div>
														<div class="txt_left">
																市场价：
																<span
																		class="blue"
																		v-if="scope.row.skuInfo[scope.row.index].priceInfo.costPrice != 0"
																>{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice}}</span>
																<span
																		v-if="scope.row.skuInfo[scope.row.index].priceInfo.costPrice == 0">不支持一件代发</span>
														</div>
														<div class="txt_left">
																税率：{{scope.row.skuInfo[scope.row.index].priceInfo.taxRate !=
																0?scope.row.skuInfo[scope.row.index].priceInfo.taxRate+'%':'暂无'}}
														</div>
												</div>
												<!-- 非平台商品信息 -->
												<div v-else>
														<div class="txt_left">
																商城价：{{scope.row.skuInfo[scope.row.index].priceInfo.goodsPrice !=
																0?scope.row.skuInfo[scope.row.index].priceInfo.goodsPrice:'暂无'}}
														</div>
														<div class="txt_left">
																市场价：{{scope.row.skuInfo[scope.row.index].priceInfo.marketPrice !=
																0?scope.row.skuInfo[scope.row.index].priceInfo.marketPrice:'暂无'}}
														</div>
														<div class="txt_left">
																税率：{{scope.row.skuInfo[scope.row.index].priceInfo.taxRate !=
																0?scope.row.skuInfo[scope.row.index].priceInfo.taxRate+'%':'暂无'}}
														</div>
														<div class="txt_left">
																一件代发价：
																<span
																		class="blue"
																		v-if="scope.row.skuInfo[scope.row.index].priceInfo.costPrice != 0"
																>{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice}}</span>
																<span
																		v-if="scope.row.skuInfo[scope.row.index].priceInfo.costPrice == 0">不支持一件代发</span>
														</div>
														<div class="txt_left">
																运费：{{scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice
																!=0?scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice:scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice==
																''?'含运费':'含运费'}}
														</div>
														<div class="txt_left" v-if="scope.row.showItem">
																{{scope.row.sourceTypeId |
																source}}：{{scope.row.skuInfo[scope.row.index].priceInfo.thirdPrice !=
																0?scope.row.skuInfo[scope.row.index].priceInfo.thirdPrice:'暂无'}}
														</div>
														<div class="txt_left" v-if="scope.row.showItem">
																市场价对比京东折扣率：{{scope.row.skuInfo[scope.row.index].priceInfo.costJdRatio !=
																0?scope.row.skuInfo[scope.row.index].priceInfo.costJdRatio:'暂无'}}
														</div>
														<div class="txt_left" v-if="scope.row.showItem">
																商城价对比京东折扣率：{{scope.row.skuInfo[scope.row.index].priceInfo.shopJdRatio !=
																0?scope.row.skuInfo[scope.row.index].priceInfo.shopJdRatio:'暂无'}}
														</div>
												</div>
												<!--</div>-->
												<!--<div v-else>
                          暂无
												</div>-->
										</template>
								</el-table-column>
								<el-table-column label="集采" align="center" width="150">
										<template slot-scope="scope">
												<div v-if="scope.row.showItem">
														<div
																class="txt_left"
																v-for="(item,index) in scope.row.skuInfo[scope.row.index].volumeInfo.volumePrices"
																:key="index"
														>
																<div class="txt_left">{{item.volumeNumber}}</div>
																<div class="txt_left">{{item.volumeCost}}</div>
																<div class="txt_left">{{item.volumeCarriage}}</div>
														</div>
														<div class="txt_left">
																对外PPT价格：
																<span class="blue">{{scope.row.skuInfo[scope.row.index].volumeInfo.pptPrice}}</span>
														</div>
														<div class="txt_left">
																对外最低报价：
																<span
																		class="blue"
																>{{scope.row.skuInfo[scope.row.index].volumeInfo.minimumPrice}}</span>
														</div>
														<div class="txt_left">
																给我司的特惠价：
																<span
																		class="blue"
																>{{scope.row.skuInfo[scope.row.index].volumeInfo.preferentialPrice}}</span>
														</div>
												</div>
										</template>
								</el-table-column>
								<el-table-column label="商品规格" align="center" width="200">
										<template slot-scope="scope">
												<div style="position:relative">
														<!-- <el-button @click="down">向上</el-button> -->
														<div style="height: 300px;overflow: auto;" :ref="'down'+scope.$index">
																<div class="txt_left martop" v-for="(item,index) in scope.row.skuInfo" :key="index">
																		<div
																				class="txt_left imgitem"
																				@click="Clicktent(index,scope.row)"
																				:class="[index == scope.row.index?'leftbottom':'']"
																		>
																				<!-- <img src="../../../common/images/商品规格(1)shouji.png" alt="" v-if="index == scope.row.index">  -->
																				<div class="more">{{item.goodsSpecValues}}</div>
																		</div>
																</div>
														</div>
														<!-- <el-button @click="down(scope.row,scope.$index)">向下</el-button> -->
												</div>
										</template>
								</el-table-column>
								<el-table-column label="一件代发利润统计" align="center" width="140">
										<template slot-scope="scope">
												<!-- 平台展示信息 -->
												<div v-if="scope.row.sourceTypeId == 2">
														<div
																class="txt_left"
														>
																分销价：{{scope.row.skuInfo[scope.row.index].financeInfo.distrPrice?scope.row.skuInfo[scope.row.index].financeInfo.distrPrice:'暂无'}}
														</div>
														<div
																class="txt_left"
														>
																分销利润：{{scope.row.skuInfo[scope.row.index].financeInfo.distrProfit?scope.row.skuInfo[scope.row.index].financeInfo.distrProfit:'暂无'}}
														</div>
														<div
																class="txt_left"
														>分销利润率：{{scope.row.skuInfo[scope.row.index].financeInfo.distrProfitMargin}}%
														</div>
												</div>
												<!-- 非平台展示信息 -->
												<div v-else>
														<div
																class="txt_left"
														>毛利润：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfit}}
														</div>
														<div
																class="txt_left"
														>毛利润率：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitMargin}}%
														</div>
														<div class="txt_left">税费：{{scope.row.skuInfo[scope.row.index].financeInfo.taxation}}</div>
														<div
																class="txt_left"
														>税后毛利：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitTax}}
														</div>
														<div
																class="txt_left"
														>税后毛利率：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitMarginTax*100}}%
														</div>
														<div
																class="txt_left"
														>企业所得税：{{scope.row.skuInfo[scope.row.index].financeInfo.incomeTax}}
														</div>
														<div class="txt_left">纯利润：{{scope.row.skuInfo[scope.row.index].financeInfo.netProfit}}</div>
														<div
																class="txt_left"
														>纯利率：{{scope.row.skuInfo[scope.row.index].financeInfo.netProfitMargin*100}}%
														</div>
												</div>
										</template>
								</el-table-column>
								<el-table-column label="集采利润统计" align="center" width="120">
										<template slot-scope="scope">
												<div v-if="scope.row.showItem">
														<div class="txt_left"
																 v-for="(item,index) in scope.row.skuInfo[scope.row.index].volumeInfo.volumePrices"
																 :key="index">
																<div class="txt_left">{{item.volumeGrossProfit}}</div>
																<div class="txt_left">{{item.volumeGrossProfitMargin}}</div>
														</div>
												</div>
										</template>
								</el-table-column>
								<el-table-column label="库存(PCS)" align="center" width="120">
										<template slot-scope="scope">
												<div v-if="scope.row.showItem">
														<span class="goods_num">{{scope.row.skuInfo[scope.row.index].goodsNumber}}</span>
														<div
																class="txt_left"
																style="margin-top: 40px;"
														>库存预警：{{scope.row.skuInfo[scope.row.index].warnNumber}}
														</div>
												</div>
										</template>
								</el-table-column>
								<el-table-column label="供应商" align="center" width="150">
										<template slot-scope="scope">
												<div v-if="scope.row.showItem">
														<!-- 平台展示信息 -->
														<div v-if="scope.row.sourceTypeId == 2">
																<div class="txt_left">深圳市迈戈实业有限公司</div>
														</div>
														<!-- 非平台展示信息 -->
														<div v-else>
																<div
																		class="txt_left"
																		style="font-size:15px"
																>{{scope.row.skuInfo[scope.row.index].suppliersName}}
																</div>
																<div class="txt_left">联系人：{{scope.row.skuInfo[scope.row.index].contactName}}</div>
																<div class="txt_left">联系人电话：{{scope.row.skuInfo[scope.row.index].contactTelephone}}
																</div>
																<div class="txt_left">QQ：{{scope.row.skuInfo[scope.row.index].contactQq}}</div>
																<div class="txt_left">管理员：{{scope.row.adminName}}</div>
																<div class="txt_left">管理员手机/邮箱：{{scope.row.adminPhone+'/'+scope.row.adminPhone}}</div>
														</div>
												</div>
										</template>
								</el-table-column>
								<el-table-column label="类型/状态" align="center" width="200">
										<template slot-scope="scope">
												<div v-if="scope.row.showItem">
														<div class="txt_left">类型：{{scope.row.goodsType}}</div>
														<div class="txt_left">排序：{{scope.row.sortOrder}}</div>
														<div class="txt_left">更新：{{scope.row.updateTime}}</div>
														<div class="txt_left">
																状态：{{scope.row.reviewStatus == 0?'未审核':scope.row.reviewStatus ==
																1?'审核不通过':'审核通过'}}
														</div>
												</div>
												<div v-else>
														暂无
												</div>
										</template>
								</el-table-column>
								<el-table-column label="操作" align="center" width="150" fixed="right">
										<template slot-scope="scope">
												<div v-if="scope.row.showItem">
														<div class="line-div small_top" @click="Stand(scope.row)">
																<div class="small-Idiv">
																		<div class="activity">
																				<img src="../../../common/images/goods/xiajiashangjia.png" alt class="div_img"/>
																		</div>
																		<span
																				style="word-break: keep-all;margin-left: 19px;left:10px"
																				class="spanclass"
																		>下架</span>
																</div>
																<el-switch
																		v-model="scope.row.isOnSale"
																		:active-value="1"
																		disabled
																		:inactive-value="0"
																		active-color="#8CC5FF"
																></el-switch>
														</div>
														<div class="line-div small_top">
																<div class="small-Idiv">
																		<div class="activity">
																				<img src="../../../common/images/goods/yijiandaifa.png" alt class="div_img"/>
																		</div>
																		<span
																				style="word-break: keep-all;margin-left: 5px;left:10px"
																				class="spanclass"
																		>一件代发</span>
																</div>
																<el-switch
																		v-model="scope.row.skuInfo[scope.row.index].priceInfo.isSubstituteSales"
																		disabled
																		:active-value="1"
																		:inactive-value="0"
																		active-color="#8CC5FF"
																></el-switch>
														</div>
														<!-- <div class="line-div small_top" style="padding-bottom: 0">
																						<div class="small-Idiv" @click="editor(scope.row)">
																							<div class="i-div">
																								<img src="../../../common/images/icon/编辑.png" alt class="operation_img" />
																							</div>
																							<span>编辑</span>
																						</div>
																						<div class="small-Idiv" @click="submitScenario(scope.row)">
																							<div class="i-div huishouzhan">
																								<img src="../../../common/images/icon/场景定制.png" alt class="operation_img" />
																							</div>
																							<span style="word-break: keep-all;margin-left: -6px;">场景定制</span>
																						</div>
														</div>-->
														<div class="line-div small_top" style>
																<div class="small-Idiv" @click="goodsDetail(scope.row)">
																		<div class="i-div fuzhi">
																				<img src="../../../common/images/icon/货物列表.png" alt class="operation_img"/>
																		</div>
																		<span style="word-break: keep-all;margin-left: -6px;">商品详情</span>
																</div>
																<!-- <div class="small-Idiv" @click="recycleBinfunc(scope.row)">
																									<div class="i-div huishouzhan">
																										<img src="../../../common/images/icon/回收站.png" alt class="operation_img" />
																									</div>
																									<span style="word-break: keep-all;margin-left: -2px;">回收站</span>
																</div>-->
														</div>
												</div>
												<div v-else>
														<el-button type="primary" @click="importData(scope.row,scope.$index)">导入</el-button>
												</div>
										</template>
								</el-table-column>
						</el-table>
						<div class="pagination">
								<el-pagination
										@size-change="handleSizeChange"
										@current-change="handleCurrentChange"
										:current-page="form.current_page"
										:page-sizes="[10, 30, 50, 100]"
										:page-size="form.page_size"
										layout="total, sizes, prev, pager, next, jumper"
										:total="form.total_count"
								></el-pagination>
						</div>
						<!-- 回收站 -->
						<el-dialog title="回收站" :visible.sync="recycleBin" width="30%">
								<el-form :model="form" label-width="100px">
										<el-form-item label="回收原因:">
												<el-input type="textarea" v-model="textareaValue"></el-input>
										</el-form-item>
								</el-form>
								<span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="recycleBin = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteRecycleBin" size="small">确 定</el-button>
        </span>
						</el-dialog>
						<!-- 回收站 -->
						<!-- 批量操作弹窗 -->
						<el-dialog title="批量操作" :visible.sync="dialogFormVisible" width="40%">
								<el-form :model="form" label-width="150px">
										<div class="batchoperation">
												<el-form-item label="下架操作：">
														<!-- <el-checkbox-group v-model="checkList1">
																						<el-checkbox label="上架"></el-checkbox>
																						<el-checkbox label="下架"></el-checkbox>
														</el-checkbox-group>-->
														<el-checkbox v-model="checkList1">下架</el-checkbox>
														<!-- <el-radio v-model="checkList1" label="1">下架</el-radio> -->
												</el-form-item>
										</div>
										<el-form-item label="商品操作：">
												<el-checkbox-group v-model="checkList2" @change="operating">
														<el-checkbox
																:label="item.value"
																v-for="item in goods"
																:key="item.name"
																:disabled="item.show"
														>{{item.name}}
														</el-checkbox>
												</el-checkbox-group>
										</el-form-item>
								</el-form>
								<div slot="footer" class="dialog-footer">
										<el-button type="danger" @click="dialogFormVisible = false" size="small">取 消</el-button>
										<el-button type="primary" @click="dialogFormVisiblefunc('',true)" size="small">确 定</el-button>
								</div>
						</el-dialog>
						<!-- 批量操作弹窗 -->

						<!-- 场景定制弹窗 -->
						<div class="spicallist">
								<el-dialog title="场景定制" :visible.sync="scenario" width="40%">
										<div class="scssfiter">
												<div class="mbottom" v-for="(item,index) in getSceneArr" :key="index">
														<div class="goods-fitter">
																<div class="search-wrapper">
																		<h4 class="title">
																				{{item.typeName}}
																				<span
																						style="font-size:14px"
																				>{{index == getSceneArr.length-1?'（请选择1个场景）':'（请选择2个场景）'}}</span>
																		</h4>
																		<br/>
																		<div class="scene_div">
																				<div
																						:span="6"
																						v-for="(data,index2) in item.children"
																						:key="index2"
																						class="sceneName"
																				>
																						<el-checkbox-group
																								v-model="item.Giftmodel"
																								:max="index == getSceneArr.length-1?1:2"
																						>
																								<el-checkbox :label="data.sceneId" :key="data.sceneId">
																										{{data.sceneName}}
																								</el-checkbox>
																						</el-checkbox-group>
																				</div>
																		</div>
																</div>
														</div>
												</div>
												<div slot="footer" class="dialog-footer scenario">
														<el-button type="danger" @click="scenario = false" size="small">取 消</el-button>
														<el-button type="primary" @click="submitScenario('',true)" size="small">确 定</el-button>
												</div>
										</div>
								</el-dialog>
						</div>
						<!-- 上架下架商品 -->
						<el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
        <span>
          <el-input type="textarea" :rows="3" placeholder="请输入理由" v-model="frametextarea"></el-input>
        </span>
								<span slot="footer" class="dialog-footer" style="margin-top:-5px">
          <el-button type="danger" @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="sure" size="small">确 定</el-button>
        </span>
						</el-dialog>
				</div>
		</div>
</template>

<script>
    import GoodsFitter from "./goodsFitter1";
    import {throttleTipPop} from "@/utils/throttle";
    import {
        associatedValues,
        bulkChanges,
        changeState,
        deleteGoods,
        everyDayNewGoods,
        everyDayNewGoods2,
        everyDayNewGoods3,
        findSceneBygoods,
        getGoods,
        getScene,
        importEveryDayNew,
        importEveryDayNew2,
        importEveryDayNew3
    } from "@/api/product/index";
    // import axios from "axios";
    // import {throws} from "assert";
    // import {setTimeout} from 'timers';

    export default {
        data() {
            return {
                sysuserType: '',//系统类型
                loading: true,
                frametextarea: "", //上下架理由
                textareaValue: "", //回收站理由
                form: {
                    third_party: "4", // 1，京东 2，网易 3，苏宁 4, 一件代发商品 5, 集采商品 6虚拟-null
                    search_type: "1", // 关键字类型
                    keyword: "", // 关键字
                    isReal: 1, //是否是实物。1，是；0，否
                    grossProfitMarginStart: "", //税前毛利润率起始
                    grossProfitMarginEnd: "", // 税前毛利润率结束
                    grossProfitMarginTaxStart: "", //税后毛利润率起始
                    grossProfitMarginTaxEnd: "", //税后毛利润率结束
                    netProfitMarginStart: "", //税后纯利润率起始
                    netProfitMarginEnd: "", //税后纯利润率结束
                    distrProfitMarginStart: "", //分销利润率起始
                    distrProfitMarginEnd: "", //分销利润率结束
                    costPriceStart: "", //商品成本价起始
                    costPriceEnd: "", //商品成本价结束
                    costPriceJdRatioStart: "", //一件代发价对比京东/天猫折扣率开始
                    costPriceJdRatioEnd: "", //一件代发价对比京东/天猫折扣率结束
                    shopJdRatioStart: "", //商城价对比京东价折扣率开始
                    shopJdRatioEnd: "", //商城价对比京东价折扣率结束
                    volumeJdRatioStart: "", //批发价1对比京东/天猫折扣率开始
                    volumeJdRatioEnd: "", //批发价1对比京东/天猫折扣率结束
                    volumeShopRatioStart: "", //批发价1对比商城利润率开始
                    volumeShopRatioEnd: "", //批发价1对比商城利润率结束
                    sysUserId: "", //采购员id
                    current_page: 1,
                    page_size: 10,
                    total_count: 0,
                    switchitem: true //获取整个数据/每日新增数据
                },
                dialog: {
                    value1: "",
                    value2: ""
                },
                options: [],
                checkArr: [], // 选中的保存
                checkList1: "",
                checkList2: [],
                checkedAll: "",
                title: "", //上下架提示
                goodsData: "", // 选择商品的data
                getSceneArr: [], //场景定制数组
                goods: [
                    {name: "精品", value: 0, show: false},
                    {name: "新品", value: 1, show: false},
                    {name: "热销", value: 2, show: false},
                    {name: "取消精品", value: 3, show: false},
                    {name: "取消新品", value: 4, show: false},
                    {name: "取消热销", value: 5, show: false}
                ],
                checked: "",
                scenario: false, //场景定制弹框
                dialogFormVisible: false, //批量操作弹窗
                recycleBin: false, //回收站
                tableData: [],
                dialogVisible: false, // 上下架提示
                textarea: "", //回收站原因
                createUserId: "", // 使用人id
                third_party: "", //子组件返回传值
                // showItem: true//按钮展示-导入
                otherList: [], //新增数据源
                listObj: {
                    skuInfo: []
                },
                loading1: false, //京東每日新增
                loading2: false, //苏宁每日新增
                loading3: false //严选每日新增
            };
        },
        methods: {
            addTo() {
                this.$router.push({
                    name: "ProductAdd",
                    query: {isReal: this.form.isReal}
                });
            },
            //每日新增
            everyAdd() {
                this.form.switchitem = false;
                // console.log(111, this.tableData);
                //京东
                if (this.form.third_party == 1) {
                    this.loading1 = true;
                    everyDayNewGoods(this.form).then(res => {
                        if (res.code == 200) {
                            console.log(999, res.data.pageList);
                            res.data.pageList = res.data.pageList.map(v => {
                                this.$set(v, "showItem", false);
                                return v;
                            });
                            const newArr = [];
                            res.data.pageList.forEach(item => {
                                const obj = {
                                    goodsId: item.goodsId,
                                    skuInfo: [],
                                    // thumbnailImgUrl: item.goodsImageUrl,
                                    goodsName: item.goodsName,
                                    shopUrl: item.shopUrl,
                                    adminEmail: "", //管理员邮箱
                                    adminName: "", //管理员姓名
                                    adminPhone: "", //管理员手机
                                    brandName: item.brandName, //品牌名称
                                    gatherIn: item.gatherIn, //采集来源
                                    goodsScenes: [], //商品关联场景
                                    goodsSn: item.goodsSn, //商品货号
                                    goodsThumbnailImgUrl: item.goodsThumbnailImgUrl, //商品基本缩略图
                                    index: 0, //显示控制
                                    isOnSale: 1, //是否开放销售,上架
                                    modelNumber: '暂无', //型号
                                    reviewStatus: 0 //审核状态
                                };

                                item.skuInfo.forEach(item2 => {
                                    obj.skuInfo.push({
                                        skuId: item.skuId,
                                        // marketPrice: item.marketPrice,//市场价/商城价
                                        thumbnailImgUrl: item2.thumbnailImgUrl, //图片
                                        goodsSpecValues: item2.goodsSpecValues, //规格参数
                                        priceInfo: {
                                            marketPrice: item2.priceInfo.marketPrice, //市场价/商城价
                                            carriagePrice: item2.priceInfo.carriagePrice, //运费
                                            goodsPrice: item2.priceInfo.goodsPrice, //商城价
                                            taxRate: item2.priceInfo.taxRate, //商城价
                                            costPrice: item2.priceInfo.costPrice //一件代发价
                                        },
                                        financeInfo: {
                                            grossProfit: item2.financeInfo.grossProfit, //税前毛利
                                            grossProfitMargin: item2.financeInfo.grossProfitMargin, //税前毛利率
                                            grossProfitTax: item2.financeInfo.grossProfitTax, //税后毛利
                                            grossProfitMarginTax: item2.financeInfo.grossProfitMarginTax, //税后毛利润率
                                            incomeTax: item2.financeInfo.incomeTax, //企业所得税
                                            netProfit: item2.financeInfo.netProfit, //纯利润
                                            netProfitMargin: item2.financeInfo.netProfitMargin, //纯利率
                                            taxation: item2.financeInfo.taxation //税费
                                        },
                                        volumeInfo: {
                                            //集采价格列表
                                            minimumPrice: 0,
                                            pptPrice: 0,
                                            preferentialPrice: 0,
                                            volumePrices: []
                                        }
                                    });
                                })

                                newArr.push(obj);
                                console.log(789, newArr);
                            });
                            this.tableData = [...newArr];
                            // this._getGoods()
                            this.loading1 = false;
                        }
                    });
                } else if (this.form.third_party == 3) {
                    this.loading2 = true;
                    //苏宁
                    everyDayNewGoods2().then(res => {
                        if (res.code == 200) {
                            console.log(999, res.data.pageList);
                            res.data.pageList.map(v => {
                                this.$set(v, "showItem", false);
                                return v;
                            });
                            const newArr = [];
                            res.data.pageList.forEach(item => {
                                const obj = {
                                    goodsId: item.goodsId,
                                    skuInfo: [],
                                    // thumbnailImgUrl: item.goodsImageUrl,
                                    goodsName: item.goodsName,
                                    shopUrl: item.shopUrl,
                                    adminEmail: "", //管理员邮箱
                                    adminName: "", //管理员姓名
                                    adminPhone: "", //管理员手机
                                    brandName: item.brandName, //品牌名称
                                    gatherIn: item.gatherIn, //采集来源
                                    goodsScenes: [], //商品关联场景
                                    goodsSn: item.goodsSn, //商品货号
                                    goodsThumbnailImgUrl: item.goodsThumbnailImgUrl, //商品基本缩略图
                                    index: 0, //显示控制
                                    isOnSale: 1, //是否开放销售,上架
                                    modelNumber: item.modelNumber, //型号
                                    reviewStatus: 0 //审核状态
                                };
                                item.skuInfo.forEach(item2 => {
                                    obj.skuInfo.push({
                                        skuId: item.skuId,
                                        // marketPrice: item.marketPrice,//市场价/商城价
                                        thumbnailImgUrl: item2.thumbnailImgUrl, //图片
                                        goodsSpecValues: item2.goodsSpecValues, //规格参数
                                        priceInfo: {
                                            marketPrice: item2.priceInfo.marketPrice, //市场价/商城价
                                            carriagePrice: item2.priceInfo.carriagePrice, //运费
                                            goodsPrice: item2.priceInfo.goodsPrice, //商城价
                                            taxRate: item2.priceInfo.taxRate, //商城价
                                            costPrice: item2.priceInfo.costPrice //一件代发价
                                        },
                                        financeInfo: {
                                            grossProfit: item2.financeInfo.grossProfit, //税前毛利
                                            grossProfitMargin: item2.financeInfo.grossProfitMargin, //税前毛利率
                                            grossProfitTax: item2.financeInfo.grossProfitTax, //税后毛利
                                            grossProfitMarginTax: item2.financeInfo.grossProfitMarginTax, //税后毛利润率
                                            incomeTax: item2.financeInfo.incomeTax, //企业所得税
                                            netProfit: item2.financeInfo.netProfit, //纯利润
                                            netProfitMargin: item2.financeInfo.netProfitMargin, //纯利率
                                            taxation: item2.financeInfo.taxation //税费
                                        },
                                        volumeInfo: {
                                            //集采价格列表
                                            minimumPrice: 0,
                                            pptPrice: 0,
                                            preferentialPrice: 0,
                                            volumePrices: []
                                        }
                                    });
                                })

                                newArr.push(obj);
                                console.log(789, newArr);
                            });
                            this.tableData = [...newArr];
                            this.loading2 = false;
                        }
                    });
                } else {
                    this.loading3 = true;
                    //严选
                    everyDayNewGoods3().then(res => {
                        if (res.code == 200) {
                            console.log(999, res.data.pageList);
                            res.data.pageList.map(v => {
                                this.$set(v, "showItem", false);
                                return v;
                            });
                            const newArr = [];
                            res.data.pageList.forEach(item => {
                                const obj = {
                                    goodsId: item.goodsId,
                                    skuInfo: [],
                                    // thumbnailImgUrl: item.goodsImageUrl,
                                    goodsName: item.goodsName,
                                    shopUrl: item.shopUrl,
                                    adminEmail: "", //管理员邮箱
                                    adminName: "", //管理员姓名
                                    adminPhone: "", //管理员手机
                                    brandName: item.brandName, //品牌名称
                                    gatherIn: item.gatherIn, //采集来源
                                    goodsScenes: [], //商品关联场景
                                    goodsSn: item.goodsSn, //商品货号
                                    goodsThumbnailImgUrl: item.goodsThumbnailImgUrl, //商品基本缩略图
                                    index: 0, //显示控制
                                    isOnSale: 1, //是否开放销售,上架
                                    modelNumber: '暂无', //型号
                                    reviewStatus: 0 //审核状态
                                };
                                item.skuInfo.forEach(item2=>{
                                    obj.skuInfo.push({
                                        skuId: item.skuId,
                                        // marketPrice: item.marketPrice,//市场价/商城价
                                        thumbnailImgUrl: item2.thumbnailImgUrl, //图片
                                        goodsSpecValues: item2.goodsSpecValues, //规格参数
                                        priceInfo: {
                                            marketPrice: item2.priceInfo.marketPrice, //市场价/商城价
                                            carriagePrice: item2.priceInfo.carriagePrice, //运费
                                            goodsPrice: item2.priceInfo.goodsPrice, //商城价
                                            taxRate: item2.priceInfo.taxRate, //商城价
                                            costPrice: item2.priceInfo.costPrice //一件代发价
                                        },
                                        financeInfo: {
                                            grossProfit: item2.financeInfo.grossProfit, //税前毛利
                                            grossProfitMargin: item2.financeInfo.grossProfitMargin, //税前毛利率
                                            grossProfitTax: item2.financeInfo.grossProfitTax, //税后毛利
                                            grossProfitMarginTax: item2.financeInfo.grossProfitMarginTax, //税后毛利润率
                                            incomeTax: item2.financeInfo.incomeTax, //企业所得税
                                            netProfit: item2.financeInfo.netProfit, //纯利润
                                            netProfitMargin: item2.financeInfo.netProfitMargin, //纯利率
                                            taxation: item2.financeInfo.taxation //税费
                                        },
                                        volumeInfo: {
                                            //集采价格列表
                                            minimumPrice: 0,
                                            pptPrice: 0,
                                            preferentialPrice: 0,
                                            volumePrices: []
                                        }
                                    });
                                })

                                newArr.push(obj);
                                console.log(789, newArr);
                            });
                            this.tableData = [...newArr];
                            this.loading3 = false;
                        }
                    });
                }
            },
            //导入
            importData(row, index) {
                //京东
                if (this.form.third_party == 1) {
                    console.log(444, row, index);
                    console.log(555, this.tableData);
                    let obj = {};
                    obj.goodsId = row.goodsId;
                    obj.thirdSkuId = row.skuInfo[0].skuId;
                    const newArr2 = [];
                    newArr2.push(obj);
                    importEveryDayNew(newArr2).then(res => {
                        if (res.code == 200) {
                            // this.tableData.splice(index,1)
                            console.log(4444);
                            let arr2;
                            arr2 = JSON.parse(JSON.stringify(this.tableData));
                            arr2.splice(index, 1);
                            console.log(777, arr2);
                            this.tableData = arr2;

                            this.$message.success(res.message);
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                } else if (this.form.third_party == 3) {
                    //苏宁
                    let obj = {};
                    obj.goodsId = row.goodsId;
                    obj.thirdSkuId = row.skuInfo[0].skuId;
                    importEveryDayNew2(obj).then(res => {
                        if (res.code == 200) {
                            let arr2;
                            arr2 = JSON.parse(JSON.stringify(this.tableData));
                            arr2.splice(index, 1);
                            console.log(777, arr2);
                            this.tableData = arr2;
                            this.$message.success(res.message);
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                } else {
                    //严选
                    let obj = {};
                    obj.goodsId = row.goodsId;
                    obj.thirdSkuId = row.skuInfo[0].skuId;
                    importEveryDayNew3(obj).then(res => {
                        if (res.code == 200) {
                            let arr2;
                            arr2 = JSON.parse(JSON.stringify(this.tableData));
                            arr2.splice(index, 1);
                            this.tableData = arr2;
                            this.$message.success(res.message);
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                }
            },
            //跳转C端
            oepngoods(val) {
                let BASE_URL = "";
                if (this.$platformOpenInfo.platformType == 1) {
                    console.log('经销商后台')
                } else {
                    if (process.env.NODE_ENV === "development") {
                        BASE_URL = `http://www.maige.com/product_details.html?goodsId=${val.goodsId}`;
                    } else if (location.hostname == "bg.test.fyuanai.com") {
                        BASE_URL = `http://c.test.fyuanai.com/product_details.html?goodsId=${val.goodsId}`;
                    } else {
                        BASE_URL = `http://${location.hostname}/product_details.html?goodsId=${val.goodsId}`;
                    }
                    window.open(BASE_URL, "_blank");
                }
            },
            // 全选所有页
            checkedAllfunc(val) {
                this.tableData.forEach(item => {
                    this.$refs.elTable.toggleRowSelection(item, true);
                });
                if (!val) {
                    this.tableData.forEach(item => {
                        this.$refs.elTable.toggleRowSelection(item, false);
                    });
                    this.checkArr = [];
                } else {
                    this.tableData.forEach(item => {
                        this.checkArr.push(item.goodsId);
                    });
                }
            },
            //单选
            choose(selection, row) {
                this.deletechecked(row);
                this.checkedAll = false;
            },
            //多选
            chooseAll(selection) {
                this.checkedAll = false;
                if (selection.length) {
                    selection.forEach(data => {
                        this.checkArr.push(data.goodsId);
                    });
                } else {
                    this.tableData.forEach(item => {
                        this.deletechecked(item);
                    });
                }
            },
            // 删除记忆选择的数据
            deletechecked(data) {
                let index = this.checkArr.indexOf(data.goodsId);
                if (index != -1) {
                    this.checkArr.splice(index, 1);
                } else {
                    this.checkArr.push(data.goodsId);
                }
            },
            // 默认选中
            checkedfunc(arr) {
                let check = this.checkArr;
                let that = this;
                for (var i = 0; i < check.length; i++) {
                    for (var j = 0; j < arr.length; j++) {
                        if (check[i] == arr[j].goodsId) {
                            this.$refs.elTable.toggleRowSelection(this.tableData[j], true);
                        }
                    }
                }
            },
            // 批量操作
            dialogFormVisiblefunc(data, type) {
                if (data) {
                    this.dialogFormVisible = true;
                }
                if (type) {
                    if (this.checkArr.length) {
                        let str = "";
                        this.checkArr.forEach(item => {
                            str += item + ",";
                        });
                        let obj = this.form;
                        obj.goodsId = str.substring(0, str.length - 1);
                        obj.isOnSale = this.checkList1 ? 0 : "";
                        obj.applyReason = "批量操作引起的审核";

                        let isBest = "";
                        let isHot = "";
                        let isNew = "";
                        this.checkList2.forEach(item => {
                            if (item == 0) {
                                isBest = 1;
                            }
                            if (item == 1) {
                                isNew = 1;
                            }
                            if (item == 2) {
                                isHot = 1;
                            }
                            if (item == 3) {
                                isBest = 0;
                            }
                            if (item == 4) {
                                isNew = 0;
                            }
                            if (item == 5) {
                                isHot = 0;
                            }
                        });
                        obj.isBest = isBest;
                        obj.isNew = isNew;
                        obj.isHot = isHot;
                        obj.code = this.checkedAll ? 1 : "";
                        if (!this.checkList1) {
                            bulkChanges(obj).then(res => {
                                if (res.code == 200) {
                                    this.dialogFormVisible = false;
                                    this.$message({
                                        message: res.message,
                                        type: "success"
                                    });
                                }
                            });
                        } else {
                            changeState(obj).then(res => {
                                if (res.code == 200) {
                                    bulkChanges(obj).then(res => {
                                        if (res.code == 200) {
                                            this.dialogFormVisible = false;
                                            this.$message({
                                                message: res.message,
                                                type: "success"
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    } else {
                        this.$message.error("请先选择商品");
                    }
                }
                this.checkList1 = "";
            },
            // 提交绑定的场景
            submitScenario(data, type) {
                if (data) {
                    this.scenario = true;
                    this.goodsData = data.goodsId;
                    this.getSceneArr.forEach(item1 => {
                        item1.Giftmodel = [];
                    });
                    findSceneBygoods(data.goodsId).then(res => {
                        this.getSceneArr.forEach(data1 => {
                            data1.children.forEach(data2 => {
                                res.data.forEach(data3 => {
                                    if (data2.sceneId == data3.sceneId) {
                                        data1.Giftmodel.push(data3.sceneId);
                                    }
                                });
                            });
                        });
                    });
                }
                if (type) {
                    let arr = this.getSceneArr;
                    for (var i = 0; i < arr.length; i++) {
                        if (i == arr.length - 1) {
                            if (arr[i].Giftmodel.length < 1) {
                                this.$notify.error({
                                    title: "错误",
                                    message: "请选择一个" + arr[i].typeName
                                });
                                return;
                            }
                        } else {
                            if (arr[i].Giftmodel.length < 2) {
                                this.$notify.error({
                                    title: "错误",
                                    message: "请选择两个" + arr[i].typeName
                                });
                                return;
                            }
                        }
                    }
                    let obj = {};
                    let newArr = [];
                    obj.goodsId = this.goodsData;
                    arr.forEach(item => {
                        item.Giftmodel.forEach(data => {
                            newArr.push(data);
                        });
                    });
                    let str = "";
                    newArr.forEach(data => {
                        str += data + ",";
                    });
                    obj.sceneIds = str.slice(0, str.length - 1);
                    associatedValues(obj).then(res => {
                        if (res.code == 200) {
                            this.scenario = false;
                            this.$message({
                                message: res.message,
                                type: "success"
                            });
                        }
                    });
                }
            },
            down(data, index) {
                data.top -= 150;
                let a = "down" + index;
                this.$nextTick(() => {
                    this.$refs.a.style.top = data.top + "px";
                });
            },
            //商品详情
            goodsDetail(data) {
                this.$router.push({name: "GoodsDetail", query: {id: data.goodsId}});
            },
            //点击规格展示不同的内容
            Clicktent(val, data) {
                data.index = val;
                this.$set(this.$refs.elTable.data);
            },
            //上下架商品
            Stand(data) {
                this.goodsData = data;
                this.dialogVisible = true;
                data.isOnSale == 1
                    ? (this.title = "下架商品")
                    : (this.title = "上架商品");
            },
            operating(val) {
                this.goods.forEach(data => {
                    data.show = false;
                });
                val.forEach(item => {
                    if (item >= 3) {
                        this.goods[item - 3].show = true;
                    } else {
                        this.goods[item + 3].show = true;
                    }
                });
            },
            //确定上下架
            sure() {
                changeState(this.goodsData, this.frametextarea).then(res => {
                    if (res.code == 200) {
                        this.dialogVisible = false;
                        this.$message({
                            message: res.message,
                            type: "success"
                        });
                        this._getGoods();
                    }
                });
            },
            //商品添入回收站
            recycleBinfunc(data) {
                if (data.isOnSale == 1) {
                    this.$message.error("商品正在商场销售，先下架商品");
                } else {
                    this.goodsData = data.goodsId;
                    this.recycleBin = true;
                }
            },
            //确认加入回收站
            deleteRecycleBin() {
                deleteGoods(this.goodsData, this.textareaValue, 1).then(res => {
                    if (res.code == 200) {
                        this.recycleBin = false;
                        this.$message({
                            message: res.message,
                            type: "success"
                        });
                        this._getGoods();
                    }
                });
            },
            //编辑
            editor(data) {
                if (data.isOnSale == 1 || data.reviewStatus == 0) {
                    let txt = "";
                    data.isOnSale == 1 ? (txt = "商品正在商场销售，先下架商品") : "";
                    data.reviewStatus == 0 ? (txt = "商品正在审核中") : "";
                    throttleTipPop(this, "error", txt);
                } else {
                    this.$router.push({name: "ProductAdd", query: {id: data.goodsId}});
                }
            },
            //查询获取整个数据
            _getGoods() {
                if (this.form.third_party == 6) {
                    let obj = JSON.parse(JSON.stringify(this.form));
                    obj.third_party = null;
                    console.log(111, obj);
                    getGoods(obj).then(res => {
                        this.tableData = res.data.pageList;
                        this.loading = false;
                        this.tableData.map(v => {
                            this.$set(v, "showItem", true);
                            return v;
                        });
                        this.tableData.forEach(item => {
                            item.top = 0;
                        });
                        this.form.total_count = res.data.count;
                        if (this.checkedAll) {
                            this.$nextTick(() => {
                                this.checkedAllfunc(this.tableData);
                            });
                        } else {
                            this.$nextTick(() => {
                                this.checkedfunc(this.tableData);
                            });
                        }
                    });
                } else {
                    console.log(222);
                    getGoods(this.form).then(res => {
                        this.tableData = res.data.pageList;
                        this.loading = false;
                        this.tableData.map(v => {
                            this.$set(v, "showItem", true);
                            return v;
                        });
                        this.tableData.forEach(item => {
                            item.top = 0;
                        });
                        this.form.total_count = res.data.count;
                        if (this.checkedAll) {
                            this.$nextTick(() => {
                                this.checkedAllfunc(this.tableData);
                            });
                        } else {
                            this.$nextTick(() => {
                                this.checkedfunc(this.tableData);
                            });
                        }
                    });
                }
            },
            handleGetGoodsList(data) {
                console.log(555, data);
                //third_party  京东1 苏宁3 严选2
                //1 京东 2网易严选  3苏宁 6虚拟
                this.form = data;
                if (this.form.third_party == 6) {
                    this.form.isReal = 0;
                } else {
                    this.form.isReal = 1;
                }
                console.log(888, this.form);
                this._getGoods();
            },
            handleSizeChange(val) {
                this.form.page_size = val;
                if (this.form.switchitem) {
                    this._getGoods();
                } else {
                    this.everyAdd();
                }
            },
            handleCurrentChange(val) {
                this.form.current_page = val;
                if (this.form.switchitem) {
                    this._getGoods();
                } else {
                    this.everyAdd();
                }
            },
            //获取场景定制
            _getScene() {
                getScene().then(res => {
                    res.data.forEach(item => {
                        item.Giftmodel = [];
                        this.getSceneArr.push(item);
                    });
                });
            }
        },
        created() {
            if (this.$route.query.third_party) {
                this.form.third_party = this.$route.query.third_party;
            }
            this._getGoods();
            this.createUserId = JSON.parse(
                localStorage.getItem("user")
            ).correlativeUserId;
            this._getScene();
        },
        components: {
            GoodsFitter
        },
        filters: {
            source(val) {
                switch (val) {
                    case 0:
                        return "京东/天猫价";
                        break;
                    case 1:
                        return "京东价";
                        break;
                    case 2:
                        return "平台推送";
                        break;
                    case 3:
                        return "京东价";
                        break;
                    case 4:
                        return "天猫/阿里采集";
                        break;
                    case 5:
                        return "京东价";
                        break;
                    case 6:
                        return "天猫/阿里采集";
                        break;
                    case 7:
                        return "苏宁价";
                        break;
                    case 8:
                        return "网易价";
                        break;
                }
            }
        }
    };
</script>

<style lang='scss' scoped>
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

												a {
														img {
																width: 100%;
																vertical-align: middle;
														}
												}
										}
								}
						}
				}

				.search-wrapper {
						padding-left: 20px;
						padding-top: 5px;
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

		.image {
				width: 100px;
				height: 100px;
				font-size: 0;
		}

		.iconfont {
				font-size: 15px;
				color: white;
		}

		.gongneng {
				cursor: pointer;
				max-width: 96px;
				height: 32px;
				background: rgba(74, 153, 250, 1);
				border-radius: 16px;
				display: flex;
				justify-content: center;
				align-items: center;
				margin: 0 auto;
				font-size: 12px;
				font-family: MicrosoftYaHei;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);

				span {
						margin-left: 5px;
				}
		}

		.small-Idiv {
				width: 32px;
				cursor: pointer;

				span {
						font-size: 12px;
						font-family: MicrosoftYaHei;
						font-weight: 400;
						color: rgba(72, 73, 77, 1);
				}
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
				justify-content: space-between;
				align-items: center;
		}

		.fuzhi {
				background: rgba(229, 162, 75, 1);
		}

		.huishouzhan {
				background: rgba(247, 108, 110, 1);
		}

		.el-select-width {
				max-width: 300px;
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

		.el-select {
				width: 100% !important;
		}

		.spanclass {
				position: absolute;
		}

		.line-top {
				margin-top: 30px;
		}

		.div_img {
				width: 28px;
				height: 28px;
		}

		.activity {
				cursor: pointer;
				width: 32px;
				height: 32px;
		}

		.small_top {
				margin-top: 10px;
				margin-left: 15px;
				margin-right: 15px;
				padding-bottom: 18px;
		}

		.model {
				color: #f66c6c !important;
		}

		.goods_num {
				color: #f66c6c !important;
				font-size: 16px;
				margin-right: 5px;
		}

		.scenario_div {
				display: flex;
				width: 96px;
				height: 32px;
				background: rgba(74, 153, 250, 1);
				border-radius: 16px;
				justify-content: center;
				line-height: 25px;

				img {
						width: 12px;
						height: 12px;
						margin-top: 10px;
				}

				span {
						font-size: 12px;
						font-family: MicrosoftYaHei;
						font-weight: 400;
						color: rgba(255, 255, 255, 1);
				}
		}

		.leftbottom {
				color: #4a99fa;
				border-bottom: 1px dashed rgba(215, 220, 231, 1);
				padding-bottom: 8px;
		}

		.more {
				cursor: pointer;
		}

		.imgitem {
				display: flex;
				align-items: center;

				img {
						width: 24px;
						height: 24px;
						margin-right: 10px;
				}
		}

		.martop {
				margin-top: 10px;
		}

		.scssfiter {
				background: #ebf4fe;
		}

		.blue {
				color: #4a99fa;
				cursor: pointer;
		}

		.scenario {
				padding-bottom: 20px;
		}

		.sceneName {
				width: 100px;
		}

		.scene_div {
				display: flex;
				flex-wrap: wrap;
				position: relative;
				top: -21px;
		}

		.el-checkbox:last-of-type {
				margin-right: 0;
		}

		.btn_css {
				display: inline-block;
				margin-left: 10px;
		}
</style>
