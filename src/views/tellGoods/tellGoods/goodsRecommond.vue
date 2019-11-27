<template>
		<div class="margin">
				<div class="mbottom">
						<div class="goods-fitter">
								<div class="search-wrapper1">
										<el-page-header @back="back" :content="text"></el-page-header>
								</div>
						</div>
				</div>
				<!--1. 提报商品申请清单-->
				<div class="mbottom">
						<div class="goods-fitter">
								<el-form ref="form" :model="form" label-width="120px" size="small">
										<div class="search-wrapper">
												<h4 class="title">提报商品申请清单</h4>
												<br/>
												<el-row :gutter="10">
														<el-col :span="6">
																<el-form-item label="提报单号:" style="width:70%">
																		{{form.reportSn}}
																</el-form-item>
														</el-col>
														<el-col :span="6">
																<el-form-item label="联系电话:" style="width:70%">
																		{{form.contactPhone}}
																</el-form-item>
														</el-col>
														<el-col :span="6">
																<el-form-item label="申请人员:" style="width:70%">
																		{{form.userName}}
																</el-form-item>
														</el-col>
														<el-col :span="6">
																<el-form-item label="联系人员:" style="width:70%">
																		{{form.contactUser}}
																</el-form-item>
														</el-col>
												</el-row>
												<el-row :gutter="10">
														<el-col :span="6">
																<el-form-item label="公司名称:" style="width:70%">
																		{{form.companyName}}
																</el-form-item>
														</el-col>
														<el-col :span="18">
																<el-form-item label="申请说明:" style="width:90%">
																		{{form.applyDescription}}
																</el-form-item>
														</el-col>
												</el-row>
												<!--表格-->
												<el-table
														ref="tableList"
														:data="multipleTableData"
														:max-height="maxHeight"
														border
														:cell-class-name="tableCellClassName"
														@select.once="handleSelect"
														@select-all.once="handleSelect"
														:row-style="{ height: '72px' }"
														@cell-click="tableMove"
														@selection-change="handleSelectionChange"
														:header-cell-style="getRowClass"
														style="width: 100%">
														<!--														<el-table-column align="center" type="selection" width="55" fixed="left"></el-table-column>-->
														<el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
														<el-table-column style="color:red;" align="center" prop="goodsName" label="商品名称"
																						 width="213">
																<template slot-scope="scope">
																		{{scope.row.goodsName}}
																</template>
														</el-table-column>
														<el-table-column style="color:red;" align="center" prop="goodsNumber" label="商品数量"
																						 width="110px">
																<template slot-scope="scope">
																		{{scope.row.goodsNumber}}
																</template>
														</el-table-column>
														<el-table-column align="center" prop="brand" label="期望品牌">
																<template slot-scope="scope">
																		{{scope.row.brand}}
																</template>
														</el-table-column>
														<el-table-column align="center" label="预算单价">
																<template slot-scope="scope">
																		{{scope.row.lowestPrice+'-'+scope.row.highestPrice}}
																</template>
														</el-table-column>
														<el-table-column align="center" prop="referenceLink" label="参考链接" width="150">
																<template slot-scope="scope">
																		{{scope.row.referenceLink}}
																</template>
														</el-table-column>
														<el-table-column align="center" prop="detailDescription" label=详细描述>
																<template slot-scope="scope">
																		{{scope.row.detailDescription}}
																</template>
														</el-table-column>
												</el-table>
												<div class="pagination" style="text-align: right;padding: 20px 0;">
														<el-pagination
																@size-change="handleSizeChange"
																@current-change="handleCurrentChange"
																:current-page="listQuery.pageIndex"
																:page-sizes="[10, 30, 50, 100]"
																:page-size="listQuery.pageSize"
																layout="total, sizes, prev, pager, next, jumper"
																:total="total">
														</el-pagination>
												</div>
										</div>
								</el-form>
						</div>
				</div>
				<!--2. 添加提报商品清单-->
				<div class="mbottom">
						<div class="goods-fitter">
								<el-form ref="form" :model="form" label-width="120px" size="small">
										<div class="search-wrapper">
												<h4 class="title">添加提报商品清单</h4>
												<br/>
												<el-row :gutter="10" style="margin-left: -5px;margin-top: -14px;margin-bottom: 14px;">
														<el-col :span="24">
																<el-button type="primary" size="mini" @click="showAddGoods()">添加商品</el-button>
														</el-col>
												</el-row>
												<!--表格-->
												<el-table
														ref="tableList"
														:data="multipleTableData2"
														:max-height="maxHeight"
														border
														:cell-class-name="tableCellClassName2"
														@select.once="handleSelect2"
														@select-all.once="handleSelect2"
														:row-style="{ height: '72px' }"
														@cell-click="tableMove2"
														@selection-change="handleSelectionChange2"
														:header-cell-style="getRowClass2"
														style="width: 100%">
														<el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
														<el-table-column style="color:red;" align="center" prop="goodsName" label="商品名称"
																						 width="110px">
																<template slot-scope="scope">
																		{{scope.row.goodsName}}
																</template>
														</el-table-column>
														<el-table-column align="center" prop="brandName" label="品牌">
																<template slot-scope="scope">
																		{{scope.row.brandName}}
																</template>
														</el-table-column>
														<el-table-column align="center" label="商城价">
																<template slot-scope="scope">
																		<!--{{scope.row.lowestPrice+'-'+scope.row.highestPrice}}-->
																		<div v-if="scope.row.skuInfo&&scope.row.skuInfo.length>0&&scope.row.skuInfo[0].priceInfo">
																				{{scope.row.skuInfo[0].priceInfo.goodsPrice?scope.row.skuInfo[0].priceInfo.goodsPrice:'暂无'}}
																		</div>
																		<div v-else>
																				暂无
																		</div>
																</template>
														</el-table-column>
														<el-table-column align="center" label="集采价">
																<template slot-scope="scope">
																		<div
																				class="txt_left"
																				v-for="(item,index) in scope.row.skuInfo[0].volumeInfo.volumePrices"
																				:key="index"
																		>
																				<div class="txt_left">{{item.volumeNumber}}</div>
																				<div class="txt_left">{{item.volumeCost}}</div>
																				<div class="txt_left">{{item.volumeCarriage}}</div>
																		</div>
																		<div class="txt_left">
																				对外PPT价格：
																				<span
																						class="blue">{{scope.row.skuInfo[0].volumeInfo.pptPrice}}</span>
																		</div>
																		<div class="txt_left">
																				对外最低报价：
																				<span class="blue">{{scope.row.skuInfo[0].volumeInfo.minimumPrice}}</span>
																		</div>
																		<div class="txt_left">
																				给我司的特惠价：
																				<span
																						class="blue">{{scope.row.skuInfo[0].volumeInfo.preferentialPrice}}</span>
																		</div>
																		<!--																		{{scope.row.lowestPrice+'-'+scope.row.highestPrice}}-->
																</template>
														</el-table-column>
														<el-table-column align="center" label="一件代发价">
																<template slot-scope="scope">
																		<span
																				class="blue"
																				v-if="scope.row.skuInfo[0].priceInfo.costPrice"
																		>{{scope.row.skuInfo[0].priceInfo.costPrice}}</span>
																		<span v-else>不支持一件代发</span>
																</template>
														</el-table-column>
														<el-table-column align="center" label="运费">
																<template slot-scope="scope">
																		{{scope.row.skuInfo[0].priceInfo.carriagePrice
																		!=0?scope.row.skuInfo[0].priceInfo.carriagePrice:scope.row.skuInfo[0].priceInfo.carriagePrice==
																		''?'含运费':'含运费'}}
																</template>
														</el-table-column>
														<el-table-column align="center" label="规格">
																<template slot-scope="scope">
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
																</template>
														</el-table-column>
														<el-table-column align="center" label="型号">
																<template slot-scope="scope">
																		{{scope.row.modelNumber}}
																</template>
														</el-table-column>
														<!--	<el-table-column align="center" prop="brand" label="SKU">
																	<template slot-scope="scope">
																			{{scope.row.brand}}
																	</template>
															</el-table-column>-->
														<el-table-column align="center" label="操作" width="180px">
																<template slot-scope="scope">
																		<div class="small-Idiv" @click="checkDetail(scope.row.id)">
																				<div class="i-div">
																						<img src="@/common/images/icon/icon_detail.png" alt=""
																								 class="operation_img">
																				</div>
																				<span style="word-break: keep-all;">详情</span>
																		</div>
																		<div class="small-Idiv"
																				 @click="deleteRow(scope.$index, multipleTableData2)">
																				<div class="i-div huishouzhan">
																						<img src="@/common/images/icon/icon_delete.png" alt=""
																								 class="operation_img">
																				</div>
																				<span style="word-break: keep-all;">删除</span>
																		</div>
																</template>
														</el-table-column>
												</el-table>
												<div class="pagination" style="text-align: right;padding: 20px 0;">
														<el-pagination
																@size-change="handleSizeChange2"
																@current-change="handleCurrentChange2"
																:current-page="listQuery2.pageIndex"
																:page-sizes="[10, 30, 50, 100]"
																:page-size="listQuery2.pageSize"
																layout="total, sizes, prev, pager, next, jumper"
																:total="total2">
														</el-pagination>
												</div>
										</div>
								</el-form>
						</div>
				</div>
				<!-- 删除 -->
				<el-dialog
						title="删除"
						:visible.sync="deleteDialog"
						width="30%"
				>
						<el-form :model="form2" label-width="100px">
								<el-form-item label="删除原因:">
										<el-input v-model="form2.deleteRemark" type="textarea"></el-input>
								</el-form-item>
						</el-form>
						<span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="deleteDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmDelete()" size="small">确 定</el-button>
      </span>
				</el-dialog>
				<!-- 添加商品对话框-->
				<el-dialog title="添加商品" :visible.sync="searchDialog" width="57%">
						<div class="mbottom">
								<div class="goods-fitter">
										<el-form label-width="90px" size="small">
												<div class="search-wrapper">
														<h4 class="title">搜索条件</h4>
														<div class="search-base">
																<el-row :gutter="10">
																		<el-col :span="12">
																				<el-col>
																						<el-form-item label="关键字：">
																								<el-select class="el-select-width" v-model="form3.search_type"
																													 placeholder="请选择">
																										<el-option label="按商品名称" value="1"></el-option>
																										<el-option label="按供应商名称" value="2"></el-option>
																										<el-option label="型号" value="3"></el-option>
																										<el-option label="品牌" value="4"></el-option>
																								</el-select>
																								<div class="el-input-width">
																										<el-input v-model="form3.keyword" placeholder="请输入关键字"></el-input>
																								</div>
																						</el-form-item>
																				</el-col>
																		</el-col>
																		<el-col :span="4">
																				<el-button type="primary" size="mini" @click="searchData3">查询</el-button>
																		</el-col>
																</el-row>
														</div>
												</div>
										</el-form>
								</div>
						</div>
						<div class="mbottom">
								<div class="goods-fitter">
										<el-form ref="form" :model="form3" label-width="120px" size="small">
												<div class="search-wrapper">
														<h4 class="title">商品列表</h4>
														<br/>
														<el-table
																v-loading="loading"
																element-loading-text="拼命加载中"
																element-loading-spinner="el-icon-loading"
																element-loading-background="white"
																:data="tableData3"
																stripe
																style="width: 100%"
																border
																ref="elTable"
																class="goods_index"
																@select='choose'
																@select-all='chooseAll'
																@selection-change="handleSelectionChange3"
														>
																<el-table-column type="selection" align="center"></el-table-column>
																<el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
																<el-table-column label="商品图片" align="center" width="120">
																		<template slot-scope="scope">
																				<div class="image" v-if="scope.row.skuInfo[scope.row.index].thumbnailImgUrl">
																						<img
																								:src="scope.row.skuInfo[scope.row.index].thumbnailImgUrl"
																								width="100"
																								height="100"
																								alt
																						/>
																				</div>
																				<div v-else>暂无图片</div>
																		</template>
																</el-table-column>
																<el-table-column label="商品信息" align="center" width="260">
																		<template slot-scope="scope">
																				<div class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
																				<div class="txt_left">货号：{{scope.row.goodsSn}}</div>
																				<div class="txt_left">型号：{{scope.row.modelNumber}}</div>
																				<div class="txt_left">品牌：{{scope.row.brandName}}</div>
																				<!--<div class="txt_left">上传方式：{{scope.row.sourceType}}</div>-->
																		</template>
																</el-table-column>
																<el-table-column label="价格信息" align="center" width="200">
																		<template slot-scope="scope">
																				<div class="txt_left">
																						商城价：{{scope.row.skuInfo[scope.row.index].priceInfo.goodsPrice !=
																						0?scope.row.skuInfo[scope.row.index].priceInfo.goodsPrice:'暂无'}}
																				</div>
																				<div class="txt_left">
																						市场价：{{scope.row.skuInfo[scope.row.index].priceInfo.marketPrice !=
																						0?scope.row.skuInfo[scope.row.index].priceInfo.marketPrice:'暂无'}}
																				</div>
																				<!--<div class="txt_left">税率：{{scope.row.skuInfo[scope.row.index].priceInfo.taxRate != 0?scope.row.skuInfo[scope.row.index].priceInfo.taxRate+'%':'暂无'}}</div>-->
																				<div class="txt_left">一件代发价：
																						<span class="blue"
																									v-if="scope.row.skuInfo[scope.row.index].priceInfo.costPrice != 0">{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice}}</span>
																						<span v-if="scope.row.skuInfo[scope.row.index].priceInfo.costPrice == 0">不支持一件代发</span>
																				</div>
																				<div class="txt_left">
																						运费：{{scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice
																						!=0?scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice:scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice==
																						''?'含运费':'含运费'}}
																				</div>
																				<div class="txt_left">京东价：{{scope.row.skuInfo[scope.row.index].priceInfo.jdPrice
																						!= 0?scope.row.skuInfo[scope.row.index].priceInfo.jdPrice:'暂无'}}
																				</div>
																		</template>
																</el-table-column>
																<!--<el-table-column label="集采/批发价" align="center" width="150">
																		<template slot-scope="scope">
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
																						<span class="blue">{{scope.row.skuInfo[scope.row.index].volumeInfo.minimumPrice}}</span>
																				</div>
																				<div class="txt_left">
																						给我司的特惠价：
																						<span
																								class="blue">{{scope.row.skuInfo[scope.row.index].volumeInfo.preferentialPrice}}</span>
																				</div>
																		</template>
																</el-table-column>-->
																<!--<el-table-column label="商品规格" align="center" width="200">
																		<template slot-scope="scope">
																				<div style="position:relative">
																						&lt;!&ndash; <el-button @click="down">向上</el-button> &ndash;&gt;
																						<div style="height: 300px;overflow: auto;" :ref="'down'+scope.$index">
																								<div class="txt_left martop" v-for="(item,index) in scope.row.skuInfo"
																										 :key="index">
																										<div
																												class="txt_left imgitem"
																												@click="Clicktent(index,scope.row)"
																												:class="[index == scope.row.index?'leftbottom':'']"
																										>
																												&lt;!&ndash; <img src="../../../common/images/商品规格(1)shouji.png" alt="" v-if="index == scope.row.index">  &ndash;&gt;
																												<div class="more">{{item.goodsSpecValues}}</div>
																										</div>
																								</div>
																						</div>
																						&lt;!&ndash; <el-button @click="down(scope.row,scope.$index)">向下</el-button> &ndash;&gt;
																				</div>
																		</template>
																</el-table-column>
																<el-table-column label="利润统计" align="center" width="140">
																		<template slot-scope="scope">
																				<div class="txt_left">
																						毛利润：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfit}}
																				</div>
																				<div
																						class="txt_left"
																				>毛利润率：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitMargin*100}}%
																				</div>
																				<div class="txt_left">
																						税费：{{scope.row.skuInfo[scope.row.index].financeInfo.taxation}}
																				</div>
																				<div
																						class="txt_left"
																				>税后毛利：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitTax}}
																				</div>
																				<div
																						class="txt_left"
																				>
																						税后毛利率：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitMarginTax*100}}%
																				</div>
																				<div class="txt_left">
																						企业所得税：{{scope.row.skuInfo[scope.row.index].financeInfo.incomeTax}}
																				</div>
																				<div class="txt_left">
																						纯利润：{{scope.row.skuInfo[scope.row.index].financeInfo.netProfit}}
																				</div>
																				<div
																						class="txt_left"
																				>纯利率：{{scope.row.skuInfo[scope.row.index].financeInfo.netProfitMargin*100}}%
																				</div>
																		</template>
																</el-table-column>-->
																<el-table-column label="库存(PCS)" align="center">
																		<template slot-scope="scope">
																				<div
																						style="display: flex;justify-content: center;align-items: center;flex-direction: column">
																						<span
																								style="color:red">{{scope.row.skuInfo[scope.row.index].goodsNumber}}</span>
																						<div>库存预警：{{scope.row.skuInfo[scope.row.index].warnNumber}}</div>
																				</div>
																		</template>
																</el-table-column>
																<!--<el-table-column label="供应商" align="center" width="150">
																		<template slot-scope="scope">
																				<div
																						class="txt_left"
																						style="font-size:15px"
																				>{{scope.row.skuInfo[scope.row.index].suppliersName}}
																				</div>
																				<div class="txt_left">联系人：{{scope.row.skuInfo[scope.row.index].contactName}}
																				</div>
																				<div class="txt_left">
																						联系人电话：{{scope.row.skuInfo[scope.row.index].contactTelephone}}
																				</div>
																				<div class="txt_left">QQ：{{scope.row.skuInfo[scope.row.index].contactQq}}</div>
																				<div class="txt_left">管理员：{{scope.row.adminName}}</div>
																				<div class="txt_left">
																						管理员手机/邮箱：{{scope.row.adminPhone+'/'+scope.row.adminPhone}}
																				</div>
																		</template>
																</el-table-column>
																<el-table-column label="来源/状态" align="center" width="200">
																		<template slot-scope="scope">
																				<div class="txt_left">来源：{{scope.row.goodsType}}</div>
																				<div class="txt_left">排序：{{scope.row.sortOrder}}</div>
																				<div class="txt_left">更新：{{scope.row.updateTime}}</div>
																				<div class="txt_left">状态：{{scope.row.reviewStatus ==
																						0?'未审核':scope.row.reviewStatus ==
																						1?'审核不通过':'审核通过'}}
																				</div>
																		</template>
																</el-table-column>-->
														</el-table>
														<el-row :gutter="10" style="display: flex;justify-content: center;align-items: center">
																<el-col style="width: 20%;">
																		<span style="margin-right: 3px;font-size: 16px">已选择</span>
																		<span style="color: blue;margin-right: 3px;font-size: 16px">{{tabCount}}</span>
																		<span style="font-size: 16px">件商品</span>
																</el-col>
																<el-col style="width: 80%;">
																		<div class="pagination" style="text-align: right;padding: 20px 0;">
																				<el-pagination
																						@size-change="handleSizeChange3"
																						@current-change="handleCurrentChange3"
																						:current-page="form3.current_page"
																						:page-sizes="[5, 10, 30, 50, 100]"
																						:page-size="form3.page_size"
																						layout="total, sizes, prev, pager, next, jumper"
																						:total="total3">
																				</el-pagination>
																		</div>
																</el-col>
														</el-row>
												</div>
										</el-form>
								</div>
						</div>
						<span slot="footer" class="dialog-footer">
												<el-button type="danger" @click="searchDialog = false" size="small">取 消</el-button>
												<el-button type="primary" @click="confirmSearch()" size="small">确 定</el-button>
									</span>
				</el-dialog>

				<el-row :gutter="10">
						<el-col :span="24" style="display: flex;justify-content: center;align-items: center">
								<el-button type="danger" size="small" @click="cancelTo">取消</el-button>
								<el-button type="primary" size="small" @click="submitData">提交</el-button>
						</el-col>
				</el-row>
		</div>
</template>

<script>
    import {get_show_goods, get_show_goods2, getDetailGoods, submitRecommondGood} from '@/api/tellGoods/index'
    import {getGoods} from "@/api/product/index";
    import {mapState} from 'vuex'
    import {submitAddress} from "../../../api/order";

    export default {
        name: 'indexAddEdit',
        computed: {
            ...mapState({
                searchRecommondData: state => state.tellGoodsList.searchRecommondData
            })
        },
        data() {
            return {
                text: " 商品提报 > 商品推荐",
                //整个推荐页面数据源
                form: {
                    companyName: '',//公司名称
                    applyDescription: '',//提报要求
                    reportSn: '',//提报单号
                    userId: '',
                    contactPhone: '',//联系电话
                    userName: '',//申请人员
                    contactUser: '',//联系人员
                    department: '',//部门
                    expirationTime: '',//提报截止时间
                    reportNum: '',
                    goodsList: []
                },
                multipleTableData: [],//表格数据源1
                multipleTableData2: [],//表格数据源2
                maxHeight: 500,
                userId: '',
                reportId: '',

                //表格1
                listQuery: {
                    reportId: '',
                    pageIndex: 1,
                    pageSize: 10,
                },
                pageSizes: [10, 20, 50, 100],//页容量选择
                total: 10,//总条数

                //表格2
                listQuery2: {
                    reportId: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                total2: 10,//总条数
                deleteDialog: false,
                form2: {
                    deleteRemark: ''//表格2删除原因
                },

                searchDialog: false,//搜索商品对话框
                form3: {
                    search_type: '',//搜索类型
                    keyWord: '',//关键字
                    current_page: 1,
                    page_size: 10
                },
                tableData3: [],
                total3: 10,
                tabCount: 0,
                checkedAll: "",
                checkArr: [], // 选中的保存
                loading: true,
                pushIdList: [],
            }
        },
        created() {
            // this.userId = JSON.parse(getCookie('userData')).userId;
            // this.type = this.$route.query.type
            if (this.$route.query.reportId) {
                this.reportId = this.$route.query.reportId
                this.listQuery.reportId = this.$route.query.reportId
                this.listQuery2.reportId = this.$route.query.reportId
            }
            this.addEdit()
        },
        methods: {
            /*--------------------添加弹窗---------------------------*/
            //展开搜索商品对话框
            showAddGoods() {
                this.searchDialog = true
                this._getGoods()
            },
            //获取表格数据
            _getGoods() {
                getGoods(this.form3).then(res => {
                    this.tableData3 = res.data.pageList;
                    this.total3 = res.data.page.total
                    this.loading = false
                    this.tableData3.forEach(item => {
                        item.top = 0;
                    });
                    // this.form3.total_count = res.data.count;
                    if (this.checkedAll) {
                        this.$nextTick(() => {
                            this.checkedAllfunc(this.tableData3)
                        })
                    } else {
                        this.$nextTick(() => {
                            this.checkedfunc(this.tableData3)
                        })
                    }
                });
            },
            //点击搜索按钮
            searchData3() {
                this._getGoods()
            },
            // 获取搜索商品栏的选中商品
            handleSelectionChange3(val) {
                console.log(22, val)
                this.pushIdList = val
                this.tabCount = val.length
                if (val.length > 0) {
                    this.$store.commit('tellGoodsList/SET_searchRecommondData', val)
                } else {
                    this.$store.commit('tellGoodsList/SET_searchRecommondData', [])
                }
            },
            //确认添加
            confirmSearch() {
                if (this.pushIdList.length == 0) return this.$message("请选择商品")
                /*let pushIds = []
                this.pushIdList.forEach(item => {
                    pushIds.push(item.goodsId)
                    this.goodsId = pushIds[0];
                })*/
                console.log(4, this.pushIdList)
                console.log(1, this.multipleTableData2, this.searchRecommondData);
                let newArr = []
                newArr = JSON.parse(JSON.stringify(this.searchRecommondData))
                console.log(55, newArr)
                newArr.forEach(item => {
                    this.multipleTableData2.push(item)
                })
                // if (this.multipleTableData2&&this.multipleTableData2.length>0){
                //     this.multipleTableData2=[...this.searchRecommondData]
                // }else{
                //     this.multipleTableData2=[...this.searchRecommondData]
                // }
                // console.log(2, this.multipleTableData2);
                this.searchDialog = false;
            },
            submitData() {
                let obj = {}
                obj.reportSn = this.form.reportSn
                obj.contactPhone = this.form.contactPhone
                obj.contactUser = this.form.contactUser
                obj.reportId = this.reportId//申请提报id
                // obj.supplierId = this.form.supplierId//供应商id
                // obj.supplierName = this.form.supplierName//供应商名称


                //处理商品id goodIds
                console.log(9, this.multipleTableData2)
                this.multipleTableData2.forEach(item => {
                    if (obj.goodIds) {
                        obj.goodIds = obj.goodIds + ',' + item.goodsId
                    } else {
                        obj.goodIds = item.goodsId
                    }
                })
                console.log(222, obj)

                submitRecommondGood(obj).then(res => {
                    if (res.code == 200) {
                        console.log(res.data)
                        this.$message.success('提交成功')
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            //取消按钮
            cancelTo() {
                this.$router.push(-1)
            },
            //页容量改变
            handleSizeChange3(val) {
                this.form3.page_size = val
                this._getGoods()
            },
            // 当前页改变
            handleCurrentChange3(val) {
                console.log(`当前页: ${val}`);
                this.form3.current_page = val
                this._getGoods()
            },

            // 默认选中
            checkedfunc(arr) {
                let check = this.checkArr
                let that = this
                for (var i = 0; i < check.length; i++) {
                    for (var j = 0; j < arr.length; j++) {
                        if (check[i] == arr[j].goodsId) {
                            this.$refs.elTable.toggleRowSelection(this.tableData3[j], true);
                        }
                    }
                }
            },
            // 全选所有页
            checkedAllfunc(val) {
                this.tableData3.forEach(item => {
                    this.$refs.elTable.toggleRowSelection(item, true);
                })
                if (!val) {
                    this.tableData3.forEach(item => {
                        this.$refs.elTable.toggleRowSelection(item, false);
                    })
                    this.checkArr = []
                } else {
                    this.tableData3.forEach(item => {
                        this.checkArr.push(item.goodsId)
                    })
                }
            },
            //单选
            choose(selection, row) {
                this.deletechecked(row)
                this.checkedAll = false
            },
            //多选
            chooseAll(selection) {
                this.checkedAll = false
                if (selection.length) {
                    selection.forEach(data => {
                        this.checkArr.push(data.goodsId)
                    })
                } else {
                    this.tableData3.forEach(item => {
                        this.deletechecked(item)
                    })
                }
            },
            // 删除记忆选择的数据
            deletechecked(data) {
                let index = this.checkArr.indexOf(data.goodsId)
                if (index != -1) {
                    this.checkArr.splice(index, 1)
                } else {
                    this.checkArr.push(data.goodsId)
                }
            },
            //----------------------------------------------------

            //获取详情
            addEdit() {
                let obj = {}
                obj.reportId = this.reportId
                getDetailGoods(obj)
                    .then(res => {
                        console.log(333, res.data)
                        this.form = res.data
                        // this.form.goodsList = res.data.needGoodsList
                        // delete this.form.goodList

                        // this.multipleTableData = [...this.form.goodsList]
                        // console.log(111, this.multipleTableData)

                        this.getDownData()
                        /*this.getDownData2()*/
                    })
            },
            getDownData() {
                //2.获取下部提报单商品详情
                get_show_goods(this.listQuery)
                    .then(res => {
                        this.listQuery.pageIndex = res.data.page.pageIndex
                        this.listQuery.pageSize = res.data.page.pageSize
                        this.total = res.data.page.total
                        this.form.goodsList = res.data.pageList
                        this.form.goodsList = this.form.goodsList.map(v => {
                            this.$set(v, 'oldNumber', v.goodsNumber)
                            return v
                        })
                        this.multipleTableData = [...this.form.goodsList]

                        console.log(111, this.multipleTableData)
                    })
            },
            //--------------上面-------------------------------
            //页容量改变
            handleSizeChange(val) {
                this.listQuery.pageSize = val
                this.getDownData()
            },
            // 当前页改变
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.listQuery.pageIndex = val
                this.getDownData()
            },

            //------------------下面----------------------------
            //下面表格数据
            getDownData2() {
                get_show_goods2(this.listQuery2)
                    .then(res => {
                        this.listQuery2.pageIndex = res.data.page.pageIndex
                        this.listQuery2.pageSize = res.data.page.pageSize
                        this.total2 = res.data.page.total
                        // this.form.goodsList = res.data.pageList
                        // this.form.goodsList = this.form.goodsList.map(v => {
                        //     this.$set(v, 'oldNumber', v.goodsNumber)
                        //     return v
                        // })
                        // this.multipleTableData2 = [...this.form.goodsList]
                        this.multipleTableData2 = [...res.data.pageList]

                        console.log(111, this.multipleTableData2)
                    })
            },

            //查看详情??
            checkDetail() {
            },
            //删除
            deleteRow(index, rows) {
                this.$confirm('是否确定移除此行', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                    .then(async () => {
                        //删除请求

                        rows.splice(index, 1);
                        this.$message({type: 'success', message: '删除成功'})
                    })
            },
            //展开删除对话框
            //确认删除
            confirmDelete() {

            },

            //页容量改变
            handleSizeChange2(val) {
                this.listQuery2.pageSize = val
                this.getDownData2()
            },
            // 当前页改变
            handleCurrentChange2(val) {
                console.log(`当前页: ${val}`);
                this.listQuery2.pageIndex = val
                this.getDownData2()
            },

            tableCellClassName({row, column, rowIndex, columnIndex}) { // 注意这里是解构
                // 利用单元格的 className 的回调方法，给行列索引赋值
                row.index = rowIndex;
                column.index = columnIndex;
            },
            tableMove(row, column, cell, event) {
                const i = column.index // 9 13 17 21
                if (i >= 9 && (i - 9) % 4 === 0) {
                    this.$refs.tableList.bodyWrapper.scrollLeft = cell.offsetLeft
                }
            },
            // 获取选中的所有行 array
            handleSelectionChange(val) {
                if (val.length > 0) { // 表示有被选中的列
                    this.$store.commit('handleShippingAddressParams', val)
                } else {
                    this.$store.commit('handleShippingAddressParams', [])
                }
            },
            // 选中提示
            handleSelect() {
                if (this.isPopup) {
                    return
                }
                this.isPopup = true
                this.$alert('批量操作', '温馨提示', {
                    confirmButtonText: '确定',
                })
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'color:#939399;font-family:MicrosoftYaHei;font-weight:400;background:#f7faff;';
                }
                return '';
            },
            tableCellClassName2({row, column, rowIndex, columnIndex}) { // 注意这里是解构
                // 利用单元格的 className 的回调方法，给行列索引赋值
                row.index = rowIndex;
                column.index = columnIndex;
            },
            tableMove2(row, column, cell, event) {
                const i = column.index // 9 13 17 21
                if (i >= 9 && (i - 9) % 4 === 0) {
                    this.$refs.tableList.bodyWrapper.scrollLeft = cell.offsetLeft
                }
            },
            // 获取选中的所有行 array
            handleSelectionChange2(val) {
                if (val.length > 0) { // 表示有被选中的列
                    this.$store.commit('handleShippingAddressParams', val)
                } else {
                    this.$store.commit('handleShippingAddressParams', [])
                }
            },
            // 选中提示
            handleSelect2() {
                if (this.isPopup) {
                    return
                }
                this.isPopup = true
                this.$alert('批量操作', '温馨提示', {
                    confirmButtonText: '确定',
                })
            },
            getRowClass2({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'color:#939399;font-family:MicrosoftYaHei;font-weight:400;background:#f7faff;';
                }
                return '';
            },

            /* /!*添加搜索商品*!/
						 tableCellClassName3({row, column, rowIndex, columnIndex}) { // 注意这里是解构
								 // 利用单元格的 className 的回调方法，给行列索引赋值
								 row.index = rowIndex;
								 column.index = columnIndex;
						 },*/
            /*tableMove3(row, column, cell, event) {
                const i = column.index // 9 13 17 21
                if (i >= 9 && (i - 9) % 4 === 0) {
                    this.$refs.tableList.bodyWrapper.scrollLeft = cell.offsetLeft
                }
            },*/
            /* // 获取选中的所有行 array
						 handleSelectionChange3(val) {
								 if (val.length > 0) { // 表示有被选中的列
										 this.$store.commit('handleShippingAddressParams', val)
								 } else {
										 this.$store.commit('handleShippingAddressParams', [])
								 }
						 },*/
            // 选中提示
            /*handleSelect3() {
                if (this.isPopup) {
                    return
                }
                this.isPopup = true
                this.$alert('批量操作', '温馨提示', {
                    confirmButtonText: '确定',
                })
            },*/
            /*getRowClass3({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'color:#939399;font-family:MicrosoftYaHei;font-weight:400;background:#f7faff;';
                }
                return '';
            },*/
            //返回上一步
            back() {
                this.$router.go(-1);
            },
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
</style>
