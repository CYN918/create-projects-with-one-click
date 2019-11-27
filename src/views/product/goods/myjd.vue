<template>
		<div class="margin" style="margin:20px;width:100%;min-width:1524px;max-width:100%;">
				<div class="mbottom">
						<div class="goods-fitter">
								<div class="search-wrapper1">
										<el-page-header @back="back" :content="text"></el-page-header>
								</div>
						</div>
				</div>
				<div class="mbottom">
						<div class="goods-fitter">
								<el-form label-width="180px" size="small">
										<div class="search-wrapper">
												<h4 class="title">搜索条件</h4>
												<div class="search-main">
														<el-row>
																<el-col :span="8">
																		<el-form-item label="税前毛利润率：">
																				<el-col :span="10">
																						<el-input v-model="form.lowGrossProfitBeforeTax" placeholder="利润率起始">
																								<span slot="suffix">%</span>
																						</el-input>
																				</el-col>
																				<el-col :span="1" class="text-space">至</el-col>
																				<el-col :span="10">
																						<el-input v-model="form.highGrossProfitBeforeTax" placeholder="利润率结束">
																								<span slot="suffix">%</span>
																						</el-input>
																				</el-col>
																		</el-form-item>
																</el-col>
																<el-col :span="8">
																		<el-col>
																				<el-form-item label="关键字：">
																						<!--<el-select class="el-select-width" v-model="form.queryType"-->
																						<!--					 placeholder="请选择">-->
																						<!--		<el-option label="按商品名称" value="1"></el-option>-->
																						<!--		<el-option label="型号" value="2"></el-option>-->
																						<!--		<el-option label="品牌" value="3"></el-option>-->
																						<!--</el-select>-->
																						<div class="el-input-width">
																								<el-input v-model="form.keyword" placeholder="请输入关键字"></el-input>
																						</div>
																				</el-form-item>
																		</el-col>
																</el-col>
																<el-col :span="8">
																		<el-button type="primary" size="small" @click="handelSearchGoods">搜索</el-button>
																		<el-button type="primary" size="small" @click="handelResetCondition">导出</el-button>
																		<el-button type="primary" size="small" @click="handelResetCondition">切换模态试图
																		</el-button>
																		<span class="btn-toggle" @click="toggleSearch">{{toggleSearchText}}</span>
																</el-col>
														</el-row>
												</div>
												<div class="search-main" v-show="searchMain">
														<el-row>
																<el-col :span="8">
																		<el-form-item label="税后毛利润率：">
																				<el-col :span="10">
																						<el-input v-model="form.lowGrossProfitAfterTax" placeholder="利润率起始">
																								<span slot="suffix">%</span>
																						</el-input>
																				</el-col>
																				<el-col :span="1" class="text-space">至</el-col>
																				<el-col :span="10">
																						<el-input v-model="form.highGrossProfitAfterTax" placeholder="利润率结束">
																								<span slot="suffix">%</span>
																						</el-input>
																				</el-col>
																		</el-form-item>
																</el-col>
																<el-col :span="8">
																		<el-form-item label="税后纯利润率：">
																				<el-col :span="10">
																						<el-input v-model="form.lowProfitMarginAfterTax" placeholder="利润率起始">
																								<span slot="suffix">%</span>
																						</el-input>
																				</el-col>
																				<el-col :span="1" class="text-space">至</el-col>
																				<el-col :span="10">
																						<el-input v-model="form.highProfitMarginAfterTax" placeholder="利润率结束">
																								<span slot="suffix">%</span>
																						</el-input>
																				</el-col>
																		</el-form-item>
																</el-col>
														</el-row>
														<el-row>
																<el-col :span="8">
																		<el-form-item label="成本价：">
																				<el-col :span="10">
																						<el-input v-model="form.lowPrice" placeholder="成本价起始">
																								<span slot="suffix">¥</span>
																						</el-input>
																				</el-col>
																				<el-col :span="1" class="text-space">至</el-col>
																				<el-col :span="10">
																						<el-input v-model="form.highPrice" placeholder="成本价结束">
																								<span slot="suffix">¥</span>
																						</el-input>
																				</el-col>
																		</el-form-item>
																</el-col>
																<el-col :span="8">
																		<el-form-item label="折扣率：">
																				<el-col :span="10">
																						<el-input v-model="form.lowCompareThirdDiscount" placeholder="折扣率起始">
																								<span slot="suffix">折</span>
																						</el-input>
																				</el-col>
																				<el-col :span="1" class="text-space">至</el-col>
																				<el-col :span="10">
																						<el-input v-model="form.highCompareThirdDiscount" placeholder="折扣率结束">
																								<span slot="suffix">折</span>
																						</el-input>
																				</el-col>
																		</el-form-item>
																</el-col>
														</el-row>
														<el-row>
																<el-col :span="8">
																		<el-form-item label="商场价：">
																				<el-col :span="10">
																						<el-input v-model="form.lowShopPrice" placeholder="商城价起始">
																								<span slot="suffix"></span>
																						</el-input>
																				</el-col>
																				<el-col :span="1" class="text-space">至</el-col>
																				<el-col :span="10">
																						<el-input v-model="form.highShopPrice" placeholder="商城价结束">
																								<span slot="suffix"></span>
																						</el-input>
																				</el-col>
																		</el-form-item>
																</el-col>
														</el-row>
												</div>
										</div>
								</el-form>
						</div>
				</div>
				<div class="mbottom">
						<div class="goods-fitter">
								<el-form ref="form" :model="form" label-width="100px" size="small">
										<div class="search-wrapper">
												<h4 class="title">商品列表</h4>
												<el-button type="primary" size="small" style="margin-left: 60px;margin-right: 10px"
																	 @click="cancel">取消分类
												</el-button>
												<el-button type="primary" size="small" @click="start">启用分类</el-button>
												<br/>
												<div style="width: 100%;display: inline-block;">
														<div class="row_css">
																<div class="left">
																		<div class="btn_css2">一级分类</div>
																</div>
																<!--一级分类-->
																<el-radio-group v-model="radio1" style="display: flex;flex-wrap: wrap">
																		<div v-for="(item, index) in proClassication1"
																				 style="margin-left: 10px;display: flex;align-items: center;width: 168px">
																				<el-checkbox v-model="item.multi_select1"
																										 style="margin-right: 7px;vertical-align: middle;"
																										 @change="changestate($event,item)"></el-checkbox>
																				<el-radio-button :label="item.categoryName"
																												 :key="index"
																												 @change.native="change_one(item, index)"
																												 style="margin-right: 26px;"
																												 :disabled="item.enable"></el-radio-button>
																		</div>
																</el-radio-group>
														</div>
														<div class="line_cat"></div>
														<div class="row_css">
																<div class="left">
																		<div class="btn_css2">二级分类</div>
																</div>
																<!--二级分类-->
																<el-radio-group v-model="radio2" style="display: flex;flex-wrap: wrap">
																		<div v-for="(item, index) in proClassication2"
																				 style="margin-left: 10px;display: flex;align-items: center;width: 168px">
																				<el-checkbox v-model="item.multi_select2"
																										 style="margin-right: 7px;vertical-align: middle;"
																										 @change="changestate($event,item)"></el-checkbox>
																				<el-radio-button :label="item.categoryName"
																												 :key="index"
																												 @change.native="change_two(item, index)"
																												 style="margin-right: 26px;"
																												 :disabled="item.enable"></el-radio-button>
																		</div>
																</el-radio-group>
														</div>
														<div class="line_cat"></div>
														<div class="row_css">
																<div class="left">
																		<div class="btn_css2">三级分类</div>
																</div>
																<!--三级分类-->
																<el-radio-group v-model="radio3" style="display: flex;flex-wrap: wrap">
																		<div v-for="(item, index) in proClassication3"
																				 style="margin-left: 10px;display: flex;align-items: center;width: 168px">
																				<el-checkbox v-model="item.multi_select3"
																										 style="margin-right: 7px;vertical-align: middle;"
																										 @change="changestate($event,item)"></el-checkbox>
																				<el-radio-button :label="item.categoryName"
																												 :key="index"
																												 @change.native="change_three(item, index)"
																												 style="margin-right: 26px;"
																												 :disabled="item.enable"
																				></el-radio-button>
																		</div>
																</el-radio-group>
														</div>
												</div>
												<!--全选-->
												<el-row :gutter="10" style="margin-top: 10px">
														<el-checkbox v-model="checkAll" @change="handleCheckAllChange"
																				 style="margin-left: 10px;margin-right: 10px"></el-checkbox>
														<span class="t2" style="color: #5681f0">全选</span>
														<span> ( 勾选你要选择的商品 )</span>
												</el-row>
												<div class="line_div"></div>
												<!--列表内容-->
												<el-row style="margin-left: 60px;">
														<!--:offset="index > 0 ? 1 : 0"-->
														<el-col :span="5" v-for="(item, index) in dataList" :key="index"
																		style="margin-right: 28px;margin-top: 16px;width: 17.66667%">
																<el-card :body-style="{ padding: '10px',position:'relative',height: '483px' }"
																				 style="width:260px">
																		<label :for="index" class="checkboxStyle">
																				<input type="checkbox" :id="index"
																							 v-model="dataList[index].checked"
																							 :checked="checked">
																				<div class="selectStyle" @click="handleSelect(item,index)">
																						<div class="rightLabel"></div>
																				</div>
																		</label>
																		<a :href="item.jumpUrl" target="_Blank">
																				<img :src="item.goodsImageUrl" class="image" alt="">
																		</a>
																		<div>
																				<el-tooltip class="item" effect="dark" :content="item.goodsName"
																										placement="top">
																						<span class="t1">{{item.goodsName}}</span>
																				</el-tooltip>
																				<div class="bottom clearfix">
																						<div
																								style="display: -webkit-box;overflow: hidden;display: flex;justify-content: space-between;">
																								<div style="display: flex;width: 134px">
																										<span class="price_css">商场价:</span>
																										<span class="price_css2"> ¥ {{item.shopPrice}}</span>
																								</div>
																								<div style="display: flex;width: 106px">
																										<span class="price_css">税率:</span>
																										<span class="price_css2"> {{item.taxRate}}% </span>
																								</div>
																						</div>
																						<div
																								style="display: -webkit-box;overflow: hidden;display: flex;justify-content: space-between;">
																								<div style="display: flex;width: 134px">
																										<span class="price_css">成本价:</span>
																										<span class="price_css2"> ¥ {{item.markPrice }}</span>
																								</div>
																								<div style="display: flex;width: 106px">
																										<span class="price_css">毛利率:</span>
																										<span class="price_css2"> {{item.grossProfit}}% </span>
																								</div>

																						</div>
																						<div
																								style="display: -webkit-box;overflow: hidden;display: flex;justify-content: space-between;">
																								<div style="display: flex;width: 134px">
																										<span class="price_css">税费:</span>
																										<span class="price_css2"> ¥ {{item.taxation}}</span>
																								</div>
																								<div style="display: flex;width: 106px">
																										<span class="price_css">毛利:</span>
																										<span class="price_css2"> ¥ {{item.gross}}</span>
																								</div>
																						</div>
																						<div
																								style="margin-bottom: 10px;display: -webkit-box;overflow: hidden;display: flex;justify-content: space-between;">
																								<div style="display: flex;width: 134px">
																										<span class="price_css">未税价:</span>
																										<span class="price_css2"> ¥ {{item.noTaxPrice}}</span>
																								</div>
																						</div>
																						<span style="display: flex;justify-content: space-between;">
																									<el-button type="text" class="button"
																														 style="float: left"
																														 @click="oepngoods(item)">查看</el-button>
																						<el-button type="text" class="button"
																											 style="float: right;margin-left: 60px;"
																											 @click="importOne(item,index)">导入单个商品</el-button>
																						</span>
																				</div>
																		</div>
																</el-card>
														</el-col>
												</el-row>
												<el-row :gutter="10">
														<el-col :span="24" style="text-align: center;margin-top: 20px;margin-bottom: 20px">
																<!--:loading="loading1" -->
																<el-button type="primary" @click="addSubmit"
																					 v-loading.fullscreen.lock="fullscreenLoading"
																					 element-loading-text="添加中,请稍后~">添加到我的京东
																</el-button>
														</el-col>
												</el-row>
												<!--分页-->
												<div class="pagination" style="display: flex;justify-content: flex-end;margin-right: 70px;">
														<el-pagination
																@size-change="handleSizeChange"
																@current-change="handleCurrentChange"
																:current-page="form.pageIndex"
																:page-sizes="[20, 40, 80, 160]"
																:page-size="form.pageSize"
																layout="total, sizes, prev, pager, next, jumper"
																:total="form.total_count"
														></el-pagination>
												</div>
										</div>
								</el-form>
						</div>
				</div>
		</div>
</template>

<script>
    import {findCategoryList, getBuyer, getDatalist, importChooseGoods, startcancel} from "@/api/product/index";

    export default {
        data() {
            return {
                text: '商品列表>京东商品>添加商品',
                searchMain: false,
                form: {
                    third_party: '4', // 1，京东 2，网易 3，苏宁 4, 一件代发商品 5, 集采商品
                    // queryType: '1', // 关键字类型
                    keyword: '', // 关键字
                    sysUserId: '', //采购员id

                    // current_page: 1,
                    // pageSize: 10,
                    // total_count: 0,

                    catIdOne: "",//一级目录
                    catIdThree: "",//二级目录
                    catIdTwo: "",//三级目录
                    lowGrossProfitBeforeTax: "",//税前毛利润起始
                    highGrossProfitBeforeTax: "",//税前毛利率结束
                    lowGrossProfitAfterTax: "",//税后毛利率起始
                    highGrossProfitAfterTax: "",//税后毛利率起始结束
                    lowProfitMarginAfterTax: "",//税后纯利润起始
                    highProfitMarginAfterTax: "",//税后纯利润结束
                    lowPrice: "",//成本价起始
                    highPrice: "",//成本价结束
                    lowProfitRate: "",//低利润率起始
                    highProfitRate: "",//高利润结束
                    lowCompareThirdDiscount: "",//折扣率起始
                    highCompareThirdDiscount: "",//折扣率结束
                    lowShopPrice: '',//商城价开始
                    highShopPrice: '',//商城价结束

                    pageIndex: 1,//当前页
                    pageSize: 20//页容量
                },
                options: [], //采购员
                third_party: '',
                proClassication1: [],//一级分类数据源
                proClassication2: [],//二级分类数据源
                proClassication3: [],//三级分类数据源
                checked: false, // 是否选择当前页所有商品
                // isSelected: false,
                dataList: [],//表格数据源
                radio1: '',
                radio2: '',
                radio3: '',
                arr: [],//勾选商品数据源
                checkAll: false,
                checkList: [],
                loading1: false,//添加
                fullscreenLoading: false,
                newList: []
            }
        },
        created() {
            this.third_party = this.$route.query.third_party
            this.getDataList()
            this.getList()

            // this._getBuyer()
        },
        methods: {
            //取消分类
            cancel() {
                this.newList.forEach(item => {
                    item.enable = 0
                })
                console.log(555, this.newList)
                startcancel(this.newList).then(res => {
                    if (res.code == 200) {
                        this.newList = []
                        this.getList()

                        if (this.form.catIdOne) {
                            let obj = {}
                            obj.catClass = 2
                            obj.source = 1
                            obj.parentId = this.form.catIdOne
                            findCategoryList(obj).then(res => {
                                if (res.code == 200) {
                                    this.proClassication2 = res.data
                                    this.proClassication2 = this.proClassication2.map(v => {
                                        this.$set(v, 'multi_select2', false)
                                        this.$set(v, 'select2', false)
                                        return v
                                    })
                                    this.proClassication2.forEach(item => {
                                        if (item.enable == 0) {
                                            item.enable = true
                                        } else {
                                            item.enable = false
                                        }
                                    })
                                }
                            })
                        }
                        if (this.form.catIdTwo) {
                            let obj2 = {}
                            obj2.catClass = 3
                            obj2.source = 1
                            obj2.parentId = this.form.catIdTwo
                            findCategoryList(obj2).then(res => {
                                if (res.code == 200) {
                                    this.proClassication3 = res.data
                                    this.proClassication3 = this.proClassication3.map(v => {
                                        this.$set(v, 'multi_select3', false)
                                        this.$set(v, 'select3', false)
                                        return v
                                    })
                                    this.proClassication3.forEach(item => {
                                        if (item.enable == 0) {
                                            item.enable = true
                                        } else {
                                            item.enable = false
                                        }
                                    })
                                }
                            })
                        }
                        this.getDataList(this.form)
                    }
                })
            },
            //启用分类
            start() {
                this.newList.forEach(item => {
                    item.enable = 1
                })
                console.log(555, this.newList)
                startcancel(this.newList).then(res => {
                    if (res.code == 200) {
                        this.newList = []
                        this.getList()

                        if (this.form.catIdOne) {
                            let obj = {}
                            obj.catClass = 2
                            obj.source = 1
                            obj.parentId = this.form.catIdOne
                            findCategoryList(obj).then(res => {
                                if (res.code == 200) {
                                    this.proClassication2 = res.data
                                    this.proClassication2 = this.proClassication2.map(v => {
                                        this.$set(v, 'multi_select2', false)
                                        this.$set(v, 'select2', false)
                                        return v
                                    })
                                    this.proClassication2.forEach(item => {
                                        if (item.enable == 0) {
                                            item.enable = true
                                        } else {
                                            item.enable = false
                                        }
                                    })
                                }
                            })
                        }
                        if (this.form.catIdTwo) {
                            let obj2 = {}
                            obj2.catClass = 3
                            obj2.source = 1
                            obj2.parentId = this.form.catIdTwo
                            findCategoryList(obj2).then(res => {
                                if (res.code == 200) {
                                    this.proClassication3 = res.data
                                    this.proClassication3 = this.proClassication3.map(v => {
                                        this.$set(v, 'multi_select3', false)
                                        this.$set(v, 'select3', false)
                                        return v
                                    })
                                    this.proClassication3.forEach(item => {
                                        if (item.enable == 0) {
                                            item.enable = true
                                        } else {
                                            item.enable = false
                                        }
                                    })
                                }
                            })
                        }
                        this.getDataList(this.form)
                    }

                })
            },
            //选中状态
            changestate(event, item) {
                console.log(2222, event, item)
                if (event) {
                    this.newList.push({catId: item.catId, catClass: item.catClass, source: 1, enable: item.enable})
                } else {
                    this.newList.forEach((item2, index) => {
                        if (item2.catId = item.catId) {
                            this.newList.splice(index, 1)
                        }
                    })
                }
                console.log(3333, this.newList)
            },
            //跳转C端
            oepngoods(item) {
                window.open(item.jumpUrl, '_blank')
            },
            //一级分类触发
            change_one(item, index) {
                console.log(222, item, index)
                this.form.catIdOne = item.catId

                //一开始就获取一级
                this.radio2 = ''
                this.radio3 = ''
                this.proClassication3 = []
                //获取二级分类
                let obj = {}
                // obj.pageNo = this.form.pageIndex
                // obj.pageSize = 5000
                // obj.catClass = 1
                obj.catClass = 2
                obj.source = 1
                obj.parentId = item.catId
                findCategoryList(obj).then(res => {
                    if (res.code == 200) {
                        this.proClassication2 = res.data
                        this.proClassication2 = this.proClassication2.map(v => {
                            this.$set(v, 'multi_select2', false)
                            this.$set(v, 'select2', false)
                            return v
                        })
                        this.proClassication2.forEach(item => {
                            if (item.enable == 0) {
                                item.enable = true
                            } else {
                                item.enable = false
                            }
                        })
                    }
                })
                // 获取列表数据
                this.getDataList(this.form)
            },
						//二级分类触发
            change_two(item, index) {
                console.log(333, item, index)
                this.form.catIdTwo = item.catId
                this.radio3 = ''
                let obj = {}
                // obj.pageNo = this.form.pageIndex
                // obj.pageSize = 5000
                // obj.catClass = 2
                obj.catClass = 3
                obj.source = 1
                obj.parentId = item.catId
                findCategoryList(obj).then(res => {
                    if (res.code == 200) {
                        this.proClassication3 = res.data
                        this.proClassication3 = this.proClassication3.map(v => {
                            this.$set(v, 'multi_select3', false)
                            this.$set(v, 'select3', false)
                            return v
                        })
                        this.proClassication3.forEach(item => {
                            if (item.enable == 0) {
                                item.enable = true
                            } else {
                                item.enable = false
                            }
                        })
                    }
                })
                // 获取列表数据
                this.getDataList(this.form)
            },
						//三级分类触发
            change_three(item, index) {
                console.log(555, item)
                this.form.catIdThree = item.catId
                console.log(444, item, index)
                console.log(this.form)
                this.getDataList(this.form)
            },
            //获取分类数据
            getList() {
                let obj = {}
                obj.catClass = 1
                obj.source = 1
                // obj.parentId= ''
                obj.parentId = 0
                findCategoryList(obj).then(res => {
                    if (res.code == 200) {
                        this.proClassication1 = res.data
                        this.proClassication1 = this.proClassication1.map(v => {
                            this.$set(v, 'multi_select1', false)
                            return v
                        })
                        this.proClassication1.forEach(item => {
                            if (item.enable == 0) {
                                item.enable = true
                            } else {
                                item.enable = false
                            }
                        })
                    }
                })
                // let obj2 = {}
                // obj2.pageNo = this.form.pageIndex
                // obj2.pageSize = this.form.pageSize
                // obj2.catClass = 1
                // findCategoryList(obj2).then(res => {
                //     if (res.code == 200) {
                //         this.proClassication2 = res.data.categorys
                //     }
                // })
                // let obj3 = {}
                // obj3.pageNo = this.form.pageIndex
                // obj3.pageSize = this.form.pageSize
                // obj3.catClass = 2
                // findCategoryList(obj3).then(res => {
                //     if (res.code == 200) {
                //         this.proClassication3 = res.data.categorys
                //     }
                // })
            },
            //获取列表数据
            getDataList(val) {
                console.log(999, val)
                // console.log(888, this.radio1, this.radio2, this.radio3)
                if (val) {
                    //点击一级
                    if (val) {
                        //点击三级
                        let obj = {}
                        obj = JSON.parse(JSON.stringify(this.form))
                        getDatalist(obj).then(res => {
                            if (res.code == 200) {
                                let {data} = res
                                this.form.total_count = data.total
                                this.form.pageSize = data.pageSize
                                this.form.pageIndex = data.pageIndex
                                this.dataList = this.dataList.map(v => {
                                    this.$set(v, 'checked', false)
                                    return v
                                })
                                this.dataList = data.pageList
                            } else if (res.code == 404) {
                                this.dataList = []
                                this.$message.error('未找到匹配的数据')
                            }
                        })
                    }
                } else {
                    let obj = {}
                    obj.pageIndex = this.form.pageIndex
                    obj.pageSize = this.form.pageSize
                    getDatalist(obj).then(res => {
                        let {data, code} = res
                        if (code == 200) {
                            this.form.total_count = data.total
                            this.form.pageSize = data.pageSize
                            this.form.pageIndex = data.pageIndex
                            this.dataList.map(v => {
                                this.$set(v, 'checked', false)
                                return v
                            })
                        }
                        this.dataList = data.pageList
                    })
                }


            },
            // 全选
            handleCheckAllChange(val) {
                console.log(999, val)
                if (val) {
                    this.dataList.forEach(item2 => {
                        console.log(item2)
                        item2.checked = true
                        //将选中的存到数组中
                        this.checkList.push({"goodsId": item2.goodsId, "thirdSkuId": item2.thirdSkuId});
                    })
                } else {
                    this.dataList.forEach(item2 => {
                        console.log(item2)
                        item2.checked = false
                        // 将选中的从数组中去掉
                        this.checkList = []
                        this.arr = []

                    })
                }
                console.log(999, val)
                // 点击全选是每一项的checked都变为true/false
                console.log(666, this.dataList);

            },
            //单选
            handleSelect(val, index) {
                if (val.checked) {
                    val.checked = 'false'
                    // this.arr.shift(val)
                    // this.$set(this.arr,index,null);
                    this.arr.splice(index, 1);//删除第2个元素
                } else {
                    val.checked = 'true'
                    // this.arr.push(val)
                    this.$set(this.arr, index, val);
                }
                console.log(222, val)
                console.log(777, this.arr)

            },
            importOne(item, index) {
                let obj = {}
                obj.goodsId = item.goodsId
                obj.thirdSkuId = item.thirdSkuId
                // this.$set(this.arr2, index, obj);
                let newArr = []
                newArr.push(obj)
                importChooseGoods(newArr).then(res => {
                    let {code, message} = res
                    console.log(message)
                    if (code == 200) {
                        this.$message.success(message)
                        this.getDataList(item)
                    }
                })

            },
            //添加按钮
            addSubmit() {
                this.fullscreenLoading = true;
                // this.loading1=true
                console.log(456456, this.arr)
                if (this.checkList.length > 0) {
                    importChooseGoods(this.checkList).then(res => {
                        let {code} = res
                        if (code == 200) {
                            this.$message.success("添加成功")
                            this.dataList.forEach(item2 => {
                                console.log(item2)
                                item2.checked = false
                            })
                            this.arr = []
                            // this.getList()
                            this.getDataList(this.form)
                            this.fullscreenLoading = false;
                        } else {
                            this.fullscreenLoading = false;
                        }
                    }).catch(error => {
                        this.fullscreenLoading = false;
                    })
                } else {
                    var checkList2 = []
                    this.arr.forEach(item => {
                        checkList2.push({"goodsId": item.goodsId, "thirdSkuId": item.thirdSkuId});
                        // obj.goodsId = item.goodsId
                        // obj.thirdSkuId = item.thirdSkuId
                    })
                    importChooseGoods(checkList2).then(res => {
                        let {code} = res
                        if (code == 200) {
                            this.$message.success("添加成功")
                            this.arr = []
                            this.getList()
                            this.getDataList()
                            this.fullscreenLoading = false;
                        } else {
                            this.fullscreenLoading = false;
                        }
                    }).catch(error => {
                        this.fullscreenLoading = false;
                    })
                }
            },
            //查询采购人员
            _getBuyer() {
                let obj = {}
                obj.name = ''
                obj.currentPage = 1,
                    obj.size = 0
                getBuyer(obj).then(res => {
                    this.options = res.data.list
                })
            },
            //返回
            back() {
                this.$router.go(-1)
                // this.$router.push({name:'ProductList',query:{third_party:1}});
            },
            //搜索
            handelSearchGoods() {
                this.radio1 = ''
                this.radio2 = ''
                this.radio3 = ''
                this.form.catIdOne = ''
                this.form.catIdTwo = ''
                this.form.catIdThree = ''
                this.getDataList(this.form)
                // this.form = {
                //     third_party: '4', // 1，京东 2，网易 3，苏宁 4, 一件代发商品 5, 集采商品
                //     queryType: '1', // 关键字类型
                //     keyword: '', // 关键字
                //     sysUserId: '', //采购员id
                //
                //     // current_page: 1,
                //     // pageSize: 10,
                //     // total_count: 0,
                //
                //     catIdOne: "",//一级目录
                //     catIdThree: "",//二级目录
                //     catIdTwo: "",//三级目录
                //     lowGrossProfitBeforeTax: "",//税前毛利润起始
                //     highGrossProfitBeforeTax: "",//税前毛利率结束
                //     lowGrossProfitAfterTax: "",//税后毛利率起始
                //     highGrossProfitAfterTax: "",//税后毛利率起始结束
                //     lowProfitMarginAfterTax: "",//税后纯利润起始
                //     highProfitMarginAfterTax: "",//税后纯利润结束
                //     lowPrice: "",//成本价起始
                //     highPrice: "",//成本价结束
                //     lowProfitRate: "",//低利润率起始
                //     highProfitRate: "",//高利润结束
                //     lowCompareThirdDiscount: "",//折扣率起始
                //     highCompareThirdDiscount: "",//折扣率结束
                //
                //     pageIndex: 1,//当前页
                //     pageSize: 10//页容量
                // }
            },
            //导出或者切换视图
            handelResetCondition() {
            },
            toggleSearch() {
                this.searchMain = !this.searchMain
            },
            //页容量改变
            handleSizeChange(val) {
                this.form.pageSize = val;
                this.getDataList(this.form);
            },
            //当前页改变
            handleCurrentChange(val) {
                console.log(555, val)
                this.form.pageIndex = val;
                this.getDataList(this.form);
            },
        },
        computed: {
            active() {
                return this.form.third_party === 0 ? 'active' : ''
            },
            toggleSearchText() {
                return this.searchMain ? '基础搜索' : '高级搜索'
            }
        }
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
								display: inline-block;
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
						max-width: 156px;
				}

				.btn-toggle {
						margin-left: 10px;
						font-size: 14px;
						color: $themeColor;
						cursor: pointer;
				}
		}

		.search-wrapper {
				padding: 20px;
				border: 1px solid rgb(215, 224, 241);
				background: #fff;

				.title {
						margin-left: -20px;
						font-size: 14px;
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

		.row_css {
				/*height: 83px;*/
				margin-left: 23px;
				/*background-color: #3dffda;*/
				display: flex;
				margin-top: 15px;

				.left {
						height: 100%;
						width: 100px;
						float: left;

						.btn_css2 {
								width: 90px;
								height: 34px;
								background-color: #f4f4f4;
								text-align: center;
								line-height: 34px;
						}
				}
		}

		.line_div {
				margin-left: 5px;
				margin-right: 5px;
				margin-top: 16px;
				margin-bottom: 16px;
				height: 1px;
				border: 1px dashed #5681f0;
		}

		.time {
				font-size: 13px;
				color: #999;
		}

		.bottom {
				margin-top: 13px;
				line-height: 33px;
		}

		.button {
				padding: 0;
				float: right;
		}

		.image {
				height: 238px;
				width: 100%;
				display: block;
		}

		.clearfix:before,
		.clearfix:after {
				display: table;
				content: "";
		}

		.clearfix:after {
				clear: both
		}

		.price_css {
				display: inline;
				font-size: 15px;
		}

		.price_css2 {
				display: block;
				color: #ff511f;
				font-size: 15px;
		}

		.checkboxStyle {
				position: absolute;
				right: 10px;
				top: 10px;
		}

		.t1 {
				display: inline-block;
				font-size: 15px;
				font-family: Microsoft YaHei;
				font-weight: 400;
				/*color: rgba(96, 98, 102, 1);*/
				/*line-height: 1.5;*/
				/*margin-left: 10px;*/
				margin-top: 10px;
				height: 34px;

				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;

				/*white-space:nowrap;*/
				/*text-overflow:ellipsis;*/
				/*&:hover { width:auto; }*/
		}

		.selectStyle {
				display: inline-block;
				right: 0;
				top: 0;
				position: absolute;
				width: 0;
				height: 0;
				border-top: 11px solid #DFE7F2;
				border-right: 11px solid #DFE7F2;
				border-bottom: 11px solid transparent;
				border-left: 11px solid transparent;
				cursor: pointer;

				.rightLabel {
						position: absolute;
						/*<!--right: -18px;-->*/
						/*<!--top: -14px;-->*/
						/*<!--display: inline-block;-->*/
						/*<!--width: 16px;-->*/
						/*<!--height: 6px;-->*/
						right: -9px;
						top: -9px;
						display: inline-block;
						width: 9px;
						height: 6px;
						border-left: 2px solid #fff;
						border-bottom: 2px solid #fff;
						transform: rotate(-45deg)
				}

		}

		input[type=checkbox] {
				position: absolute;
				top: 0;
				right: 0;
		}

		input[type=checkbox]:checked + .selectStyle {
				border-top-color: #4A99FA;
				border-right-color: #4A99FA
		}

		/deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
				border-radius: 23px !important;
				border: 0;
				height: 30px;
				line-height: 6px
		}

		/deep/ .el-radio-button:first-child .el-radio-button__inner {
				/*border-radius: 23px !important;*/
				border: 0
		}

		/deep/ .el-radio-button__inner {
				border-radius: 23px !important;
				border: 0;
				box-shadow: none;
		}

		/deep/ .el-radio-button {
				border-radius: 23px;
				border: 0;
		}

		/deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
				background-color: #5682ef;
				border-color: #5682ef;
				-webkit-box-shadow: -1px 0 0 0 #409EFF;
		}

		/deep/ .el-loading-mask.is-fullscreen {
				left: 281px;
				top: 47px;
		}

		.line_cat {
				width: 1521px;
				margin-left: 23px;
				display: inline-block;
				height: 4px;
				background-color: #f7faff;
		}

</style>
