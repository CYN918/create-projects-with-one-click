<comment>
		#提报商品审核
</comment>
<template>
		<div class="margin">
				<div class="mbottom">
						<div class="goods-fitter">
								<el-form label-width="115px" size="small" :model="form">
										<div class="search-wrapper">
												<h4 class="title">运费查询</h4>
												<div class="search-base">
														<el-row :gutter="10">
																<el-col :span="6">
																		<el-form-item label="发货地址：">
																			<el-select v-model="form.originateProvince" placeholder="请选择省" @change="changeArea" style="width: 100px;float:left;">
																				<el-option
																				v-for="item in provinceOptions"
																				:key="item.value"
																				:label="item.label"
																				:value="item">
																				</el-option>
																			</el-select>

																			<el-select
																				v-model="form.originateCity"
																				collapse-tags
																				style="margin-left: 5px;width: 100px;float:left;"
																				placeholder="请选择市">
																				<el-option
																				v-for="item in cityOptions"
																				:key="item.value"
																				:label="item.label"
																				:value="item.label">
																				</el-option>
																			</el-select>
																		</el-form-item>
																</el-col>
																<el-col :span="6">
																		<el-form-item label="收货地址：">
																			<el-select v-model="form.purposeProvince" placeholder="请选择省" @change="changeArea" style="width: 100px;float:left;">
																				<el-option
																				v-for="item in provinceOptions"
																				:key="item.value"
																				:label="item.label"
																				:value="item">
																				</el-option>
																			</el-select>

																			<el-select
																				v-model="form.purposeCity"
																				collapse-tags
																				style="margin-left: 5px;width: 100px;float:left;"
																				placeholder="请选择市">
																				<el-option
																				v-for="item in cityOptions"
																				:key="item.value"
																				:label="item.label"
																				:value="item.label">
																				</el-option>
																			</el-select>
																		</el-form-item>
																</el-col>
																<el-col :span="6">
																		<el-form-item label="快件重量(KG)：">
																				<el-input v-model="form.weight" clearable placeholder="请选择快件重量"
																									size="mini"></el-input>
																		</el-form-item>
																</el-col>
																<el-col :span="6">
																		<el-form-item label="快件数量(个)：">
																				<el-input v-model="form.num" clearable size="mini"></el-input>
																		</el-form-item>
																</el-col>
																<el-col :span="1">
																		<el-form-item label="快件体积(m³)：">

																		</el-form-item>
																</el-col>
																<el-col :span="3">
																		<el-form-item label="长(cm)">
																				<el-input v-model="form.length" clearable size="mini"></el-input>
																		</el-form-item>
																</el-col>
																<el-col :span="3">
																		<el-form-item label="宽(cm)">
																				<el-input v-model="form.width" clearable size="mini"></el-input>
																		</el-form-item>
																</el-col>
																<el-col :span="3">
																		<el-form-item label="高(cm)">
																				<el-input v-model="form.height" clearable size="mini"></el-input>
																		</el-form-item>
																</el-col>
																<el-col :span="3" class="btn_right">
																		<el-button type="primary" size="mini" @click="getDataList()">查询</el-button>
																		<el-button type="primary" size="mini" @click="searchGoods">搜索商品</el-button>
																</el-col>
														</el-row>
												</div>
										</div>
								</el-form>
						</div>
				</div>
				<div class="mcard">
						<el-table :data="list" border style="width: 100%" stripe>
								<el-table-column prop="expressName" label="快递公司" align="center"></el-table-column>
								<el-table-column prop="weight" label="重量" align="center"></el-table-column>
								<el-table-column prop="totalWeight" label="总重量" align="center"></el-table-column>
								<el-table-column prop="price" label="单品预计运费" align="center" width="110"></el-table-column>
								<el-table-column prop="totalPrice" label="预计总运费" align="center"></el-table-column>
								<el-table-column prop="timeliness" label="快递时效性" align="center"></el-table-column>
								<el-table-column prop="lowestCharge" label="一件最低价" align="center"></el-table-column>
						</el-table>
						<div class="pagination">
								<el-pagination
										@size-change="handleSizeChange"
										@current-change="handleCurrentChange"
										:current-page="form.pageIndex"
										:page-sizes="[10, 30, 50, 100]"
										:page-size="form.pageSize"
										layout="total, sizes, prev, pager, next, jumper"
										:total="form.total">
								</el-pagination>
						</div>
						<!-- 搜索商品对话框 -->
						<el-dialog title="搜索商品" :visible.sync="searchDialog" width="57%">
								<div class="mbottom">
										<div class="goods-fitter">
												<el-form label-width="90px" size="small">
														<div class="search-wrapper">
																<h4 class="title">搜索条件</h4>
																<div class="search-base">
																		<el-row :gutter="10">
																				<el-col :span="12">
																						<el-form-item label="关键字:">
																								<el-input v-model="form.keyWord" clearable placeholder="请输入关键字"
																													size="mini"></el-input>
																						</el-form-item>
																				</el-col>
																				<el-col :span="4">
																						<el-button type="primary" size="mini" @click="searchData2">查询</el-button>
																				</el-col>
																		</el-row>
																</div>
														</div>
												</el-form>
										</div>
								</div>
								<div class="mbottom">
										<div class="goods-fitter">
												<el-form ref="form" :model="form" label-width="120px" size="small">
														<div class="search-wrapper">
																<h4 class="title">商品列表</h4>
																<br/>
																<!--表格-->
																<el-table
																		ref="tableList"
																		:data="tableData"
																		border
																		:row-style="{ height: '62px' }"
																		@selection-change="handleSelectionChange"
																		style="width: 100%">
																		<el-table-column align="center" type="selection" width="55" fixed="left"
																										 label="选择"></el-table-column>
																		<el-table-column type="index" align="center" width="55"
																										 label="编号"></el-table-column>
																		<el-table-column style="color:red;" align="center"
																										 label="商品图片"
																										 width="213">
																				<template slot-scope="scope">
																						<img :src="scope.row.goodsThumbnailImgUrl" alt=""
																								 style="width: 80px;height: 80px">
																				</template>
																		</el-table-column>
																		<el-table-column label="商品信息" align="center" width="150">
																				<template slot-scope="scope">
																						<div class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
																						<div class="txt_left">货号：{{scope.row.goodsSn}}</div>
																						<div class="txt_left">型号：{{scope.row.modelNumber}}</div>
																						<div class="txt_left">品牌：{{scope.row.brandName}}</div>
																						<div class="txt_left">来源：{{scope.row.sourceType}}</div>
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
																						>运费：{{scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice !=
																								0?scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice:scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice
																								== ''?'含运费':'含运费'}}
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
																		<el-table-column align="center" label="库存">
																				<template slot-scope="scope">
																					<span class="goods_num">{{scope.row.skuInfo[scope.row.index].goodsNumber}}</span>
																					<div
																							class="txt_left"
																							style="margin-top: 40px;"
																					>库存预警：{{scope.row.skuInfo[scope.row.index].warnNumber}}
																					</div>
																				</template>
																		</el-table-column>
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
																								@size-change="handleSizeChange2"
																								@current-change="handleCurrentChange2"
																								:current-page="listQuery2.pageIndex"
																								:page-sizes="[5, 10, 30, 50, 100]"
																								:page-size="listQuery2.pageSize"
																								layout="total, sizes, prev, pager, next, jumper"
																								:total="listQuery2.total">
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
				</div>
		</div>
</template>

<script>
    import {cascadeArea, queryFreight, searchShowGoods} from '@/api/order/index'
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                list: [],//表格数据源
                form: {
                    pageIndex: 1, // 当前页
					pageSize: 10,// 每页展示量
                    total: 0,
					height: '',
					length: '',
					num: '',
					originateCity: '',
					originateProvince: '',
					purposeCity: '',
					purposeProvince: '',
					weight: '',
					width: '',
					keyWord: ''
                },
                searchDialog: false,//删除对话框
                // state: '',//审核状态
                tableData: [],
                listQuery2: {
                    pageIndex: 0,
					pageSize: 5,
					total: 0
                },
				tabCount: 0,
				provinceOptions: [],
				cityOptions: [],
				pushIdList:[],
				goodsId: '',
			}
        },
        created() {
			this.cascadeArea();
        },
        computed: {
            ...mapState({
                searchDataList: state => state.tellGoodsList.searchDataList
            })
        },
        methods: {
            //获取表格数据

            /*-------------------------------------------------*/
            //展开搜索商品对话框
            searchGoods() {
                this.searchDialog = true
                //请求对话框表格数据

            },
			//获取级联区域
			cascadeArea() {
                const obj = {
					parentId: 1
				}
				cascadeArea(obj)
				.then(res => {
					if(res.code === 200){
						let arr = [];
						res.data.list.forEach(item => {
							const obj = {
								value: item.regionId,
								label: item.regionName,
							}
							arr.push(obj)
							this.provinceOptions = arr
						});
					}
				})
			},
			//二级联动
			changeArea(item){
				// console.log(item)
				const obj = {
					parentId: item.value
				}
				cascadeArea(obj)
				.then(res => {
					if(res.code === 200){
						let arr = [];
						res.data.list.forEach(item => {
							const obj = {
								value: item.regionId,
								label: item.regionName,
							}
							arr.push(obj)
							this.cityOptions = arr
						});
					}
				})
			},
            //确认搜索
            confirmSearch() {
				if(this.pushIdList.length<=0) return this.$message("请选择商品")
				if(this.pushIdList.length>1) return this.$message("只能选择一件商品")
				let pushIds=[]
				this.pushIdList.forEach(item=>{
					pushIds.push(item.goodsId)
					// console.log(pushIds)
					this.goodsId = pushIds[0];
				})
				this.searchDialog = false;
            },

            //搜索商品栏的查询按钮
            getDataList() {
				// console.log(this.form.originateProvince)
				const obj = {
					goodsId: this.goodsId,
					height: this.form.height,
					length: this.form.length,
					num: this.form.num,
					originateCity: this.form.originateCity,
					originateProvince: this.form.originateProvince.label,
					purposeCity: this.form.purposeCity,
					purposeProvince: this.form.purposeProvince.label,
					weight: this.form.weight,
					width: this.form.width
				}
				queryFreight(obj)
				.then(res => {
					if(res.code === 200){
						this.list = res.data;
					}
				})
			},
			searchData2(){
                const obj = {
					goodsName: this.form.keyWord,
					pageIndex: this.listQuery2.pageIndex,
					pageSize: this.listQuery2.pageSize
				}
				searchShowGoods(obj)
				.then(res => {
					if(res.code === 200){
						this.tableData = res.data.pageList;
						this.listQuery2.total = res.data.count;
					}
				})
			},
            // 获取搜索商品栏的选中商品
            handleSelectionChange(val) {
				this.pushIdList = val
                this.tabCount = val.length
                if (val.length > 0) {
                    this.$store.commit('tellGoodsList/SET_searchDataList', val)
                } else {
                    this.$store.commit('tellGoodsList/SET_searchDataList', [])
                }
            },
            /*------------------------------------------------*/
            //页容量改变
            handleSizeChange(val) {
                this.form.pageSize = val
                this.getDataList()
            },
            //当前页改变
            handleCurrentChange(val) {
                this.form.pageIndex = val
                this.getDataList()
            },
            //页容量改变
            handleSizeChange2(val) {
                this.listQuery2.pageSize = val
                this.searchData2()
            },
            //当前页改变
            handleCurrentChange2(val) {
                this.listQuery2.pageIndex = val
                this.searchData2()
            },
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

		/*/deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner {*/
		/*		width: 172px;*/
		/*}*/


</style>

