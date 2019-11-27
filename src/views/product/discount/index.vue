<template>
	<div class="margin">
		<div class="mbottom">
			<div class="goods-fitter">
				<el-form label-width="100px" size="small">
					<div class="search-wrapper">
						<h4 class="title">折扣费率申请</h4>
					</div>
				</el-form>
			</div>
		</div>
		<div class="mbottom">
			<div class="goods-fitter">
				<el-form label-width="100px" size="small">
					<div class="search-wrapper">
						<h4 class="title">基本信息</h4>
						<div class="search-base">
							<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px">
								<el-form-item label="申请整体折扣率:" prop="discountRate">
									<el-input v-model="ruleForm.discountRate"></el-input>%
								</el-form-item>
								<el-form-item label="公司名称:" prop="companyName">
									<el-input v-model="ruleForm.companyName"></el-input>
								</el-form-item>
								<el-form-item label="部门:" prop="department">
									<el-input v-model="ruleForm.department"></el-input>
								</el-form-item>
								<el-form-item label="联系电话:" prop="contactPhone">
									<el-input v-model="ruleForm.contactPhone"></el-input>
								</el-form-item>
								<el-form-item label="联系人:" prop="contactUser">
									<el-input v-model="ruleForm.contactUser"></el-input>
								</el-form-item>
								<el-form-item label="折扣类型" prop="discountType">
									<el-select v-model="ruleForm.discountType" placeholder="折扣类型:" @change="changeType">
										<el-option label="单品折扣" value="1"></el-option>
										<el-option label="分类折扣" value="2"></el-option>
										<el-option label="全品折扣" value="3"></el-option>
									</el-select>
                                </el-form-item>
								<el-form-item label="选择折扣分类:">
									<el-button type="primary" size="medium" disabled v-if="ruleForm.discountType == 3">挑选</el-button>
									<el-button type="primary" size="medium" @click="choose" v-else>挑选</el-button>
                                </el-form-item>
								<el-form-item label="申请人姓名:" prop="userName">
									<el-input v-model="ruleForm.userName"></el-input>
                                </el-form-item>
								<el-form-item label="申请原因:" prop="remark">
									<el-input type="textarea" v-model="ruleForm.remark" :rows='4'></el-input>
								</el-form-item>
							</el-form>
						</div>
					</div>
				</el-form>
			</div>
		</div>
		<div class="mcard" >
			<el-row :gutter="10" style="margin-bottom: 30px">
				<el-col :span="8" style="display: flex;justify-content: flex-start">
					<el-button type="primary" size="mini" @click="addCouriercompany(pushIdList)">批量删除</el-button>
				</el-col>
			</el-row>
			<el-table :data="list" border style="width: 100%" stripe @selection-change="handlepushList" v-if="this.ruleForm.discountType == 1">
				<el-table-column type="selection" align="center"></el-table-column>
				<el-table-column type="index" label="编号" align="center" width="50"></el-table-column>
				<el-table-column label="商品图片" align="center">
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
				<el-table-column label="商品信息" align="center">
					<template slot-scope="scope">
						<div class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
						<div class="txt_left">货号：{{scope.row.goodsSn}}</div>
						<div class="txt_left">型号：{{scope.row.modelNumber}}</div>
						<div class="txt_left">品牌：{{scope.row.brandName}}</div>
						<div class="txt_left">上传方式：{{scope.row.sourceType}}</div>
					</template>
				</el-table-column>
				<el-table-column label="价格信息" align="center">
					<template slot-scope="scope">
						<div
							class="txt_left"
						>商城价：{{scope.row.skuInfo[scope.row.index].priceInfo.goodsPrice !=
							0?scope.row.skuInfo[scope.row.index].priceInfo.goodsPrice:'暂无'}}
						</div>
						<div
							class="txt_left"
						>市场价：{{scope.row.skuInfo[scope.row.index].priceInfo.marketPrice !=
							0?scope.row.skuInfo[scope.row.index].priceInfo.marketPrice:'暂无'}}
						</div>
						<div
							class="txt_left"
						>税率：{{scope.row.skuInfo[scope.row.index].priceInfo.taxRate !=
							0?scope.row.skuInfo[scope.row.index].priceInfo.taxRate+'%':'暂无'}}
						</div>
						<div class="txt_left">
							一件代发价：
							<span
								class="blue"
								v-if="scope.row.skuInfo[scope.row.index].priceInfo.costPrice != 0"
							>{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice}}</span>
							<span v-if="scope.row.skuInfo[scope.row.index].priceInfo.costPrice == 0">不支持一件代发</span>
						</div>
						<div
							class="txt_left"
						>运费：{{scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice !=0?scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice:scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice== ''?'含运费':'含运费'}}
						</div>
						<div
							class="txt_left"
						>京东价：{{scope.row.skuInfo[scope.row.index].priceInfo.jdPrice !=
							0?scope.row.skuInfo[scope.row.index].priceInfo.jdPrice:'暂无'}}
						</div>
						<div
							class="txt_left"
						>市场价对比京东折扣率：{{scope.row.skuInfo[scope.row.index].priceInfo.costJdRatio !=
							0?scope.row.skuInfo[scope.row.index].priceInfo.costJdRatio:'暂无'}}
						</div>
						<div
							class="txt_left"
						>商城价对比京东折扣率：{{scope.row.skuInfo[scope.row.index].priceInfo.shopJdRatio !=
							0?scope.row.skuInfo[scope.row.index].priceInfo.shopJdRatio:'暂无'}}
						</div>
					</template>
				</el-table-column>
				<el-table-column label="商品规格" align="center">
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
										<!-- <img src="../../../common/images/商品规格(1).png" alt="" v-if="index == scope.row.index">  -->
										<div class="more">{{item.goodsSpecValues}}</div>
									</div>
								</div>
							</div>
							<!-- <el-button @click="down(scope.row,scope.$index)">向下</el-button> -->
						</div>
					</template>
				</el-table-column>
				<el-table-column label="利润统计" align="center">
					<template slot-scope="scope">
						<div class="txt_left">毛利润：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfit}}</div>
						<div
							class="txt_left"
						>毛利润率：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitMargin*100}}%
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
						<div class="txt_left">企业所得税：{{scope.row.skuInfo[scope.row.index].financeInfo.incomeTax}}</div>
						<div class="txt_left">纯利润：{{scope.row.skuInfo[scope.row.index].financeInfo.netProfit}}</div>
						<div
							class="txt_left"
						>纯利率：{{scope.row.skuInfo[scope.row.index].financeInfo.netProfitMargin*100}}%
						</div>
					</template>
				</el-table-column>
				<el-table-column label="库存(PCS)" align="center">
					<template slot-scope="scope">
						<span class="goods_num">{{scope.row.skuInfo[scope.row.index].goodsNumber}}</span>
						<div
							class="txt_left"
							style="margin-top: 40px;"
						>库存预警：{{scope.row.skuInfo[scope.row.index].warnNumber}}
						</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" fixed="right">
					<template slot-scope="scope">
						<div style="display: flex;justify-content: space-around">
							<!-- 删除 -->
							<div class="small-Idiv" @click="deleteLine(scope.$index, list)">
								<div class="i-div huishouzhan">
									<img src="@/common/images/icon/icon_delete.png" alt="" class="operation_img">
								</div>
								<span style="word-break: keep-all;">删除</span>
							</div>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<el-table :data="dataArr" border style="width: 100%" stripe @selection-change="handlepushList" v-if="this.ruleForm.discountType == 2">
				<el-table-column type="selection" align="center"></el-table-column>
				<el-table-column type="index" label="编号" align="center" width="50"></el-table-column>
				<el-table-column label="一级分类" align="center">
					<template slot-scope="scope">
						<div>{{scope.row.catName}}</div>
					</template>
				</el-table-column>
				<el-table-column label="二级分类" align="center">
					<template slot-scope="scope">
						<div><li v-for="item in scope.row.children" style="margin: 0px 15px 0px 15px;float: left;">{{item.catName}}</li></div>
					</template>
				</el-table-column>
				<el-table-column label="三级分类" align="center">
					<template slot-scope="scope">
						<div><li v-for="item in scope.row.children" style="margin: 0px 15px 0px 15px;float: left;"><span v-for="val in item.children" style="display: inline-block;margin: 0px 15px 0px 15px;">{{val.catName}}</span></li></div>
					</template>
				</el-table-column>
				<el-table-column label="折扣率" align="center" prop="discountRate">

				</el-table-column>
				<el-table-column label="操作" align="center" fixed="right">
					<template slot-scope="scope">
						<div style="display: flex;justify-content: space-around">
							<!-- 删除 -->
							<div class="small-Idiv" @click="deleteLine(scope.$index, dataArr)">
								<div class="i-div huishouzhan">
									<img src="@/common/images/icon/icon_delete.png" alt="" class="operation_img">
								</div>
								<span style="word-break: keep-all;">删除</span>
							</div>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<div style="text-align: center;margin-top: 15px;">
				<el-button type="danger" size="medium" @click="resetForm('ruleForm')">重置</el-button>
				<el-button type="primary" size="medium" @click="saveDiscount('ruleForm')">确定</el-button>
			</div>


			<!-- 删除 -->
			<el-dialog title="删除" :visible.sync="deleteDialog" width="30%">
				<el-form label-width="100px">
					<el-form-item label="删除原因:">
						<el-input v-model="deleteRemark" type="textarea"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button type="danger" @click="deleteDialog = false" size="small">取 消</el-button>
					<el-button type="primary" @click="confirmDelete()" size="small">确 定</el-button>
				</span>
			</el-dialog>

			<!--分类折扣-->
			<el-dialog
			title="选择分类折扣"
			:visible.sync="classification"
			width="40%"
			:before-close="handleClose">
				<el-tree :data="data" :props="defaultProps" ref="tree" highlight-current node-key="catId" show-checkbox @check="handleNodeClick" ></el-tree>
				<div class="bottom" style="text-align: center;margin-top: 15px;">
					<!-- <el-button @click="getCheckedKeys">通过 key 获取</el-button> -->
					<el-button type="danger" @click="classification = false">重置</el-button>
					<el-button type="primary" @click="determine">确定</el-button>
				</div>
			</el-dialog>

			<!--部分商品选择弹窗-->
			<el-dialog
			title="提示"
			:visible.sync="dialogVisible"
			width="80%"
			:before-close="handleClose">
			<goods-fitter class="mbottom" @tabVender='handleGetGoodsList' :dataObj="form" @goodsFitter="handleGetGoodsList"></goods-fitter>
			<div class="mcard">
			<el-table
				:data="tableData"
				stripe
				style="width: 100%"
				border
				ref="elTable"
				class="goods_index"
				@selection-change="handleSelectionChange"
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
						<div class="txt_left">货号：{{scope.row.goodsSn}}</div>
						<div class="txt_left">型号：{{scope.row.modelNumber}}</div>
						<div class="txt_left">品牌：{{scope.row.brandName}}</div>
						<div class="txt_left">上传方式：{{scope.row.sourceType}}</div>
					</template>
				</el-table-column>
				<el-table-column label="价格信息" align="center" width="150">
					<template slot-scope="scope">
						<div
							class="txt_left"
						>商城价：{{scope.row.skuInfo[scope.row.index].priceInfo.goodsPrice !=
							0?scope.row.skuInfo[scope.row.index].priceInfo.goodsPrice:'暂无'}}
						</div>
						<div
							class="txt_left"
						>市场价：{{scope.row.skuInfo[scope.row.index].priceInfo.marketPrice !=
							0?scope.row.skuInfo[scope.row.index].priceInfo.marketPrice:'暂无'}}
						</div>
						<div
							class="txt_left"
						>税率：{{scope.row.skuInfo[scope.row.index].priceInfo.taxRate !=
							0?scope.row.skuInfo[scope.row.index].priceInfo.taxRate+'%':'暂无'}}
						</div>
						<div class="txt_left">
							一件代发价：
							<span
								class="blue"
								v-if="scope.row.skuInfo[scope.row.index].priceInfo.costPrice != 0"
							>{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice}}</span>
							<span v-if="scope.row.skuInfo[scope.row.index].priceInfo.costPrice == 0">不支持一件代发</span>
						</div>
						<div
							class="txt_left"
						>运费：{{scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice !=0?scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice:scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice== ''?'含运费':'含运费'}}
						</div>
						<div
							class="txt_left"
						>京东价：{{scope.row.skuInfo[scope.row.index].priceInfo.jdPrice !=
							0?scope.row.skuInfo[scope.row.index].priceInfo.jdPrice:'暂无'}}
						</div>
						<div
							class="txt_left"
						>市场价对比京东折扣率：{{scope.row.skuInfo[scope.row.index].priceInfo.costJdRatio !=
							0?scope.row.skuInfo[scope.row.index].priceInfo.costJdRatio:'暂无'}}
						</div>
						<div
							class="txt_left"
						>商城价对比京东折扣率：{{scope.row.skuInfo[scope.row.index].priceInfo.shopJdRatio !=
							0?scope.row.skuInfo[scope.row.index].priceInfo.shopJdRatio:'暂无'}}
						</div>
					</template>
				</el-table-column>
				<el-table-column label="集采/批发价" align="center" width="150">
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
										<!-- <img src="../../../common/images/商品规格(1).png" alt="" v-if="index == scope.row.index">  -->
										<div class="more">{{item.goodsSpecValues}}</div>
									</div>
								</div>
							</div>
							<!-- <el-button @click="down(scope.row,scope.$index)">向下</el-button> -->
						</div>
					</template>
				</el-table-column>
				<el-table-column label="利润统计" align="center" width="140">
					<template slot-scope="scope">
						<div class="txt_left">毛利润：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfit}}</div>
						<div
							class="txt_left"
						>毛利润率：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitMargin*100}}%
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
						<div class="txt_left">企业所得税：{{scope.row.skuInfo[scope.row.index].financeInfo.incomeTax}}</div>
						<div class="txt_left">纯利润：{{scope.row.skuInfo[scope.row.index].financeInfo.netProfit}}</div>
						<div
							class="txt_left"
						>纯利率：{{scope.row.skuInfo[scope.row.index].financeInfo.netProfitMargin*100}}%
						</div>
					</template>
				</el-table-column>
				<el-table-column label="库存(PCS)" align="center" width="120">
					<template slot-scope="scope">
						<span class="goods_num">{{scope.row.skuInfo[scope.row.index].goodsNumber}}</span>
						<div
							class="txt_left"
							style="margin-top: 40px;"
						>库存预警：{{scope.row.skuInfo[scope.row.index].warnNumber}}
						</div>
					</template>
				</el-table-column>
				<el-table-column label="供应商" align="center" width="150">
					<template slot-scope="scope">
						<div
							class="txt_left"
							style="font-size:15px"
						>{{scope.row.skuInfo[scope.row.index].suppliersName}}
						</div>
						<div class="txt_left">联系人：{{scope.row.skuInfo[scope.row.index].contactName}}</div>
						<div class="txt_left">联系人电话：{{scope.row.skuInfo[scope.row.index].contactTelephone}}</div>
						<div class="txt_left">QQ：{{scope.row.skuInfo[scope.row.index].contactQq}}</div>
						<div class="txt_left">管理员：{{scope.row.adminName}}</div>
						<div class="txt_left">管理员手机/邮箱：{{scope.row.adminPhone+'/'+scope.row.adminPhone}}</div>
					</template>
				</el-table-column>
				<el-table-column label="来源/状态" align="center" width="200">
					<template slot-scope="scope">
						<div class="txt_left">来源：{{scope.row.goodsType}}</div>
						<div class="txt_left">排序：{{scope.row.sortOrder}}</div>
						<div class="txt_left">更新：{{scope.row.updateTime}}</div>
						<div class="txt_left">状态：{{scope.row.reviewStatus == 0?'未审核':scope.row.reviewStatus ==
							1?'审核不通过':'审核通过'}}
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
			</div>
			<div>
			<span style="margin-right: 15px;">已选择<i style="font-style: normal;color: red;">{{number1}}</i>件商品</span>
			<el-button type="primary" @click="confirm">确定挑选</el-button>
			<el-button type="danger" @click="cancel">取消</el-button>
			</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import draggable from 'vuedraggable';
import { categorycategory} from "@/api/mallapp/visual";
import GoodsFitter from "../../product/goods/goodsFitter";
import {uploadFile } from '@/api/activity/index'
import {
  getGoods,
  changeState,
  deleteGoods,
  getScene,
  associatedValues,
  bulkChanges,
  addGoodsProject,
  newSpecialGoods,
  batchUpdateSpecialGoods,
  saveDiscount
} from "@/api/product/index";
import axios from "axios";
import { throws } from "assert";
import { setTimeout } from 'timers';
    import { getList } from "@/api/order/index";
    export default {
        data() {
            return {
				data: [],
				defaultProps: {
					children: 'children',
					label: 'catName'
				},
				isIndeterminate: true,
				checkAll: false,
				secondary: false,
				childrenCheckAll: false,
				list: [],//表格数据源
				navigation: [],
				importDialog: false,//导入对话框
				classification: false,
                importForm: {},
				couriercompanyValue: '',//快递公司绑定值
				couriercompany: [],//选择快递公司
				fileList: [],
				file: '',
				companyId: '',
				deleteDialog: false,
				deleteTemplateDialog: false,
				deleteRemark: '',
				deleteTemplateRemark: '',
				reportIds: '',
				templateIds: '',
				ruleForm: {
					department: '',
					discountType: '',
					companyName: '',
					contactPhone: '',
					contactUser: '',
					discountRate: '',
					remark: '',
					userName: '',
					department: '',
				},
				rules: {
                   discountRate:[
					   { required: true, message: '请输入申请折扣率', trigger: 'blur' },
				   ],
				   companyName: [
					   { required: true, message: '请输入公司名称', trigger: 'blur' },
				   ],
				   contactPhone: [
					   { required: true, message: '请输入联系电话', trigger: 'blur' },
				   ],
				   contactUser: [
					   { required: true, message: '请输入联系人', trigger: 'blur' },
				   ],
				   discountType: [
					   { required: true, message: '请选择折扣类型', trigger: 'change' }
				   ],
				   userName: [
					   { required: true, message: '请输入申请人姓名', trigger: 'blur' },
				   ],
				   remark: [
					   { required: true, message: '请输入申请说明', trigger: 'blur' },
				   ],
				   department: [
					   { required: true, message: '请输入部门', trigger: 'blur' },
				   ]
				},
				pushIdList:[],
				frametextarea: "", //上下架理由
				textareaValue: "", //回收站理由
				form: {
					third_party: '4', // 1，京东 2，网易 3，苏宁 4, 一件代发商品 5, 集采商品
					search_type: '1', // 关键字类型
					keyword: '', // 关键字
					isReal:'', //是否是实物。1，是；0，否
					grossProfitMarginStart:'',//税前毛利润率起始
					grossProfitMarginEnd:'', // 税前毛利润率结束
					grossProfitMarginTaxStart:'', //税后毛利润率起始
					grossProfitMarginTaxEnd:'', //税后毛利润率结束
					netProfitMarginStart:'', //税后纯利润率起始
					netProfitMarginEnd:'', //税后纯利润率结束
					distrProfitMarginStart:'', //分销利润率起始
					distrProfitMarginEnd:'', //分销利润率结束
					costPriceStart:'', //商品成本价起始
					costPriceEnd:'', //商品成本价结束
					costPriceJdRatioStart:'', //一件代发价对比京东/天猫折扣率开始
					costPriceJdRatioEnd:'', //一件代发价对比京东/天猫折扣率结束
					shopJdRatioStart:'', //商城价对比京东价折扣率开始
					shopJdRatioEnd:'', //商城价对比京东价折扣率结束
					volumeJdRatioStart:'', //批发价1对比京东/天猫折扣率开始
					volumeJdRatioEnd:'', //批发价1对比京东/天猫折扣率结束
					volumeShopRatioStart:'', //批发价1对比商城利润率开始
					volumeShopRatioEnd:'', //批发价1对比商城利润率结束
					sysUserId:'', //采购员id
					current_page: 1,
					page_size: 10,
					total_count: 0
				},
				dialog: {
					value1: "",
					value2: ""
				},
				options: [],
				checkArr:[], // 选中的保存
				checkList1: '',
				checkList2: [],
				checkedAll: "",
				title: "", //上下架提示
				goodsData: "", // 选择商品的data
				getSceneArr: [], //场景定制数组
				goods: [
					{ name: "精品",value:0,show:false},
					{ name: "新品",value:1,show:false},
					{ name: "热销",value:2,show:false},
					{ name: "取消精品",value:3,show:false},
					{ name: "取消新品",value:4,show:false},
					{ name: "取消热销",value:5,show:false}
				],
				checked: "",
				scenario: false, //场景定制弹框
				dialogFormVisible: false, //批量操作弹窗
				recycleBin: false, //回收站
				tableData: [],
				dialogVisible: false, // 上下架提示
				textarea: "", //回收站原因
				createUserId: "", // 使用人id
				dialogVisible: false,

				value: '',
				input: '',
				resource: 'false',
				myArray: [],
				bannerUrl: '',
				number: '0',
				number1: '0',

				sortOrder: '',
				specialDesc: '',
				id: '',
				arr: [],
				newArr: [],
				dataArr: [],
				oneArr: [],
				twoArr: [],
				threeArr: [],
				fourArr: [],
				fiveArr: [],
				businessIdList: [],
				goodsId: [],
            }
        },
        created() {
			this._getGoods();
			this.navigationbartree();
		},
		components: {
			GoodsFitter,
			draggable
		},
        methods: {
			handleSelectionChange(val) {
				// console.log(val)
				val.forEach((item) => {
				    this.goodsId.push(item.goodsId)
				})
				this.number1 = val.length;
				this.list = val;

			},
			determine(){
                this.classification = false;
			},
			getCheckedKeys() {
				console.log(this.$refs.tree.getCheckedKeys());
			},
			handleNodeClick(data, checked, indeterminate) {
				console.log(checked)
				console.log(data)
				if(data.lev == 1){
					this.businessIdList.push(data.catId)
					let obj = {
						catName: data.catName,
						catId: data.catId,
						children: data.children,
						discountRate: this.ruleForm.discountRate
					}
					this.dataArr.push(obj)
				}

				if(data.lev == 2){
					checked.halfCheckedNodes.forEach(item => {
						// console.log(item.catId)
						// console.log(data.parentId)
						if(item.catId == data.parentId){
							this.businessIdList.push(item.catId)
							let obj = {
								catName: item.catName,
								catId: item.catId,
								children: [{
									catName: data.catName,
									catId: data.catId,
									children: data.children
								}],
								discountRate: this.ruleForm.discountRate
							}
							this.dataArr.push(obj)
						}
					})
				}
				if(data.lev == 3){
					this.businessIdList.push(data.catId)

					// checked.halfCheckedNodes.forEach(item => {
					// 	if(item.lev == 1){
					// 		item.children.forEach(val => {
					// 			if(item.catId == val.parentId){
					// 				val.children.forEach(items => {
					// 					if(val.catId == items.parentId){
					// 						if(items.catId == data.catId){
					// 							if(val.catId == data.parentId){
					// 								let obj1 = {
					// 									catName: data.catName,
					// 									catId: data.catId,
					// 									children: data.children,
					// 									parentId: data.parentId
					// 								}
					// 								this.oneArr.push(obj1)
					// 								// console.log(this.oneArr)
					// 								var listArr = [];
					// 								this.oneArr.forEach(function(el,index){
					// 									for(var i=0;i<listArr.length;i++){
					// 										// 对比相同的字段key，相同放入对应的数组
					// 										if(listArr[i].parentId == el.parentId){
					// 											listArr[i].listInfo.push({
					// 												catName: el.catName,
					// 												catId: el.catId,
					// 												children: el.children
					// 											});
					// 											return;
					// 										}
					// 									}
					// 									// 第一次对比没有参照，放入参照
					// 									listArr.push({
					// 										parentId: el.parentId,
					// 										listInfo: [{
					// 											catName: el.catName,
					// 											catId: el.catId,
					// 											children: el.children,
					// 										}]
					// 									});	
					// 								});	
					// 							}	
					// 						}else{
					// 							return
					// 						}
											
					// 						listArr.forEach(list => {
					// 							list.listInfo.forEach(lists => {
					// 								let obj3 = {
					// 									catName: lists.catName,
					// 									catId: lists.catId,
					// 									children: lists.children,
					// 								}
					// 								this.threeArr.push(obj3)
					// 								//去重
					// 								var uniques = [];
					// 								var stringify = {};
					// 								for (var i = 0; i < this.threeArr.length; i++) {
					// 									var keys = Object.keys(this.threeArr[i]);
					// 									keys.sort(function(a, b) {
					// 										return (Number(a) - Number(b));
					// 									});
					// 									var str = '';
					// 									for (var j = 0; j < keys.length; j++) {
					// 										str += JSON.stringify(keys[j]);
					// 										str += JSON.stringify(this.threeArr[i][keys[j]]);
					// 									}
					// 									if (!stringify.hasOwnProperty(str)) {
					// 										uniques.push(this.threeArr[i]);
					// 										stringify[str] = true;
					// 									}
					// 								}
					// 								this.fourArr = uniques;
					// 							})
					// 						})
					// 						let obj = {
					// 							catName: item.catName,
					// 							catId: item.catId,
					// 							parentId: item.parentId,
					// 							discountRate: this.ruleForm.discountRate,
					// 							children: [{
					// 								catName: val.catName,
					// 								catId: val.catId,
					// 								parentId: val.parentId,
					// 								children: this.fourArr
					// 							}],
					// 						}
					// 						this.twoArr.push(obj)
											
					// 						//去重
					// 						var uniques = [];
					// 						var stringify = {};
					// 						for (var i = 0; i < this.twoArr.length; i++) {
					// 							var keys = Object.keys(this.twoArr[i]);
					// 							keys.sort(function(a, b) {
					// 								return (Number(a) - Number(b));
					// 							});
					// 							var str = '';
					// 							for (var j = 0; j < keys.length; j++) {
					// 								str += JSON.stringify(keys[j]);
					// 								str += JSON.stringify(this.twoArr[i][keys[j]]);
					// 							}
					// 							if (!stringify.hasOwnProperty(str)) {
					// 								uniques.push(this.twoArr[i]);
					// 								stringify[str] = true;
					// 							}
					// 						}
											
					// 						this.dataArr = uniques;
											
					// 					}
					// 				})
									
					// 			}
					// 		})
					// 	}	
					// })
				}
			},
			async navigationbartree() {
				const { data } = await categorycategory(1);
				this.data = data;
				data.forEach(element => {
					element.isIndeterminate = false
					element.secondary = []
				});
				// console.log(data);
			},
			//折扣类型选中值
			changeType(value){
				// console.log(value)
			},
			//保存商品折扣
			saveDiscount(formName){
                this.$refs[formName].validate((valid) => {
				if (valid) {
					var reg = /^[1-9]\d*$/;
					var result = reg.test(this.ruleForm.discountRate);
					if(!result){
						this.$message({
							message: '申请折扣率为正整数',
							type: 'warning'
						});
						return false
					}
					if(this.ruleForm.discountRate > 100){
						this.$message({
							message: '申请折扣率不能大于100',
							type: 'warning'
						});
						return false
					}
				} else {
					console.log('error submit!!');
					return false;
				}
				});

				let userData = JSON.parse(window.localStorage.getItem("user")).data;
				console.log(userData)
				console.log(this.ruleForm.discountType)
				if(this.ruleForm.discountType == 3){
                    let obj = {
						companyName: this.ruleForm.companyName,
						contactPhone: this.ruleForm.contactPhone,
						contactUser: this.ruleForm.contactUser,
						discountRate: this.ruleForm.discountRate,
						discountType: this.ruleForm.discountType,
						remark: this.ruleForm.remark,
						userName: this.ruleForm.userName,
						department: this.ruleForm.department,
						userId: userData.sysuserId
					}
					saveDiscount(obj).then(res => {
						if(res.code == 200){
							this.$message({
								message: res.message,
								type: 'success'
							});
							this.resetForm(formName)
						}
					})
				}else if(this.ruleForm.discountType == 2){
					let obj = {
						companyName: this.ruleForm.companyName,
						contactPhone: this.ruleForm.contactPhone,
						contactUser: this.ruleForm.contactUser,
						discountRate: this.ruleForm.discountRate,
						discountType: this.ruleForm.discountType,
						remark: this.ruleForm.remark,
						userName: this.ruleForm.userName,
						department: this.ruleForm.department,
						userId: userData.sysuserId,
						businessIdList: this.businessIdList
					}
					saveDiscount(obj).then(res => {
						if(res.code == 200){
							this.$message({
								message: res.message,
								type: 'success'
							});
							this.resetForm(formName)
						}
					})
				}else if(this.ruleForm.discountType == 1){
					let obj = {
						companyName: this.ruleForm.companyName,
						contactPhone: this.ruleForm.contactPhone,
						contactUser: this.ruleForm.contactUser,
						discountRate: this.ruleForm.discountRate,
						discountType: this.ruleForm.discountType,
						remark: this.ruleForm.remark,
						userName: this.ruleForm.userName,
						department: this.ruleForm.department,
						userId: userData.sysuserId,
						businessIdList: this.goodsId
					}
					saveDiscount(obj).then(res => {
						if(res.code == 200){
							this.$message({
								message: res.message,
								type: 'success'
							});
							this.resetForm(formName)
						}
					})
				}
			},
			//重置
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.tableData = [];
			},
			//弹窗是否关闭
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
					done();
				})
				.catch(_ => {

				});
			},
			handleGetGoodsList(data) {
			    this.form = data;
			},

			choose(){
				if(this.ruleForm.discountType == 1){
                    this.dialogVisible = true;
				    this.number1 = this.myArray.length;
				}else if(this.ruleForm.discountType == 2){
					this.classification = true;
				}
			},
			//批量删除
			handlepushList(val){
				this.pushIdList = val;

			},
			//确认按钮
			confirm(){
				if(this.goodsId.length == 0){
					this.$message({
						message: '请选择商品',
						type: 'warning'
					});
					return false
				}
				this.dialogVisible = false;
				// this.list = this.pushIdList;
			},
			//取消按钮
			cancel(){
				this.dialogVisible = false;
				this.pushIdList = [];
			},
            //批量删除
            addCouriercompany() {
				if(this.pushIdList.length<=0) return this.$message("请选择删除的类型")
				this.pushIdList.forEach((item,index) => {
					for (let i = 0; i < this.pushIdList.length; i++) {
						// console.log(this.pushIdList[i].goodsId)
						// console.log(item.goodsId)
						if(this.ruleForm.discountType == 1){
                            if (this.pushIdList[i].goodsId === item.goodsId) {
								console.log(this.pushIdList[i])
								let index = this.list.indexOf(this.pushIdList[i])
								console.log(index)
								this.list.splice(index, 1);


								break;
							}
						}else if(this.ruleForm.discountType == 2){
							if (this.pushIdList[i].catId === item.catId) {
								console.log(this.pushIdList[i])
								let index = this.dataArr.indexOf(this.pushIdList[i])
								console.log(index)
								this.dataArr.splice(index, 1);


								break;
							}
						}

					}
				});
				let pushIds=[]
				this.pushIdList.forEach(item=>{
					pushIds.push(item.id)
				})
				// this.$confirm('是否删除?', '提示', {
				// 	confirmButtonText: '确定',
				// 	cancelButtonText: '取消',
				// 	type: 'warning'
				// 	}).then(async() => {
					// const res = await  announcementDelete(pushIds)
					// if(res.code === 200 ){
					// 	this.productPush();
					// 	this.$message({
					// 	type: 'success',
					// 	message: '删除成功!'
					// 	});
					// }
					// this.productPush();
				// 	}).catch(() => {
				// 	this.$message({
				// 		type: 'info',
				// 		message: '已取消删除'
				// 	});
				// });
            },
            //删除按钮
            deleteLine(index, rows) {
				rows.splice(index, 1);
			},
			confirmDelete(){
                deleteCourier(this.reportIds)
				.then(res => {
					if(res.code === 200){
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.deleteDialog = false;
						this.getList();
					}
				})
			},
			//查询
			_getGoods() {
				getGoods(this.form).then(res => {
						this.tableData = res.data.pageList;
						this.tableData.forEach(item => {
						item.top = 0;
					});
					    this.form.total_count = res.data.count;
					if(this.checkedAll){
						this.$nextTick(()=>{
							this.checkedAllfunc(this.tableData)
						})
					}else{
						this.$nextTick(()=>{
							this.checkedfunc(this.tableData)
						})
					}
				});
			},
			handleGetGoodsList(data) {
				this.form = data;
				this._getGoods()
			},
			handleSizeChange(val) {
				this.form.page_size = val;
				this._getGoods();
			},
			handleCurrentChange(val) {
				this.form.current_page = val;
				this._getGoods();
			},
			//获取场景定制
			_getScene() {
				getScene().then(res => {
					res.data.forEach(item => {
					item.Giftmodel = [];
					this.getSceneArr.push(item);
					});
				});
			},
			// 默认选中
			checkedfunc(arr){
				let check  = this.checkArr
				let that = this
				for(var i=0;i<check.length;i++){
					for(var j=0;j<arr.length;j++){
					if(check[i] == arr[j].goodsId){
						this.$refs.elTable.toggleRowSelection(this.tableData[j],true);
					}
					}
				}
			},
			//去重
			heavy(data){
				let arr = data
				let result = []
				for(var k=0;k<arr.length;k++){
					for(var j=k+1;j<arr.length;j++)
						if(arr[k].goodsId==arr[j].goodsId){
						//如果第一个等于第二个，splice方法删除第二个
						arr.splice(j,1);
						j--;
					}
				}
			},
        }
    }
</script>

<style scoped>
.downLink{
	width: 104px;
	height: 34px;
	text-align: center;
	line-height: 34px;
	display: block;
	font-size: 12px;
    border-radius: 3px;
	background: #4C86F4;
	color: #FFF;
}
.mbottom >>> .el-form-item--small{
	width: 560px;
}
</style>
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
				width: 55px;
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
								margin-left: -20px;
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

				.el-input {
						display: inline-block;
						max-width: 215px;
				}
				.el-textarea{
					    display: inline-block;
						max-width: 515px;
				}

				.btn-toggle {
						margin-left: 10px;
						font-size: 14px;
						color: $themeColor;
						cursor: pointer;
				}
		}

</style>
