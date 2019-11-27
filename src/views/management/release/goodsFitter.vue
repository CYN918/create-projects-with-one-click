<template>
		<div class="goods-fitter">
				<el-form label-width="120px" size="small">
						<div class="vender">
								<ul class="clearfix">
										<li
												v-for="(item,index) in venderList"
												@click="tabVender(item.value,index,item.name)"
												:class="num === index ? 'active' : ''"
												:key="index"
										>
											<i class="image">
													<img :src="require(`@/common/images/${item.image}`)" alt="item.name"/>
											</i>
											<span>{{item.name}}</span>
										</li>
								</ul>
						</div>
						<div class="search-wrapper">
								<h4 class="title">搜索条件</h4>
								<div class="search-main">
										<el-row>
											  <el-col :span="5">
											     <el-col>
													 <el-form-item label="经销商名称" v-if="searchMain">
														 <el-col :span="23" >
															 <el-select  v-model="form.agencyId" placeholder="请选择经销商" @change="hangdleAgency">
																 <el-option
																		 v-for="(item,index) in options"
																		 :key="index"
																		 :label="item.agencyName"
																		 :value="item.agencyId">
																 </el-option>
															 </el-select>
														 </el-col>
													 </el-form-item>
													 <el-form-item label="项目名称" v-else>
														 <el-col :span="23">
															 <el-select  v-model="form.projectId" placeholder="请选择项目" @change="hangdleProject">
																 <el-option
																		 v-for="(item,index) in options"
																		 :key="index"
																		 :label="item.projectName"
																		 :value="item.projectId">
																 </el-option>
															 </el-select>
														 </el-col>
													 </el-form-item>
												   </el-col>
											</el-col>
											<el-col :span="5">
											     <el-col>
													 <el-form-item label="一级分类：">
														 <el-col>
															 <el-select
																	 v-model="carId1"
																	 placeholder="请选择一级分类"
																	 @change="carIdFunc($event,1)"
															 >
																 <el-option
																		 v-for="item in carArr1"
																		 :key="item.catId"
																		 :label="item.barName"
																		 :value="item.catId"
																 ></el-option>
															 </el-select>
														 </el-col>
													 </el-form-item>
												   </el-col>
											</el-col>
											<el-col :span="5">
											     <el-col>
													 <el-form-item label="二级分类：">
														 <el-col>
															 <el-select
																	 v-model="carId2"
																	 placeholder="请选择二级分类"
																	 @change="carIdFunc($event,2)"
															 >
																 <el-option
																		 v-for="item in carArr2"
																		 :key="item.catId"
																		 :label="item.barName"
																		 :value="item.catId"
																 ></el-option>
															 </el-select>
														 </el-col>
													 </el-form-item>
												   </el-col>
											</el-col>
											<el-col :span="5">
											     <el-col>
													 <el-form-item label="三级分类：">
														 <el-col>
															 <el-select
																	 v-model="carId3"
																	 placeholder="请选择二级分类"
																	 @change="carIdFunc($event,3)"
															 >
																 <el-option
																		 v-for="item in carArr3"
																		 :key="item.catId"
																		 :label="item.barName"
																		 :value="item.catId"
																 ></el-option>
															 </el-select>
														 </el-col>
													 </el-form-item>
												   </el-col>
											</el-col>
											<el-col :span="2" style='text-align: center;'>
												<el-button type="primary" size="small" @click="handelSearchGoods">搜索</el-button>
											</el-col>
											<el-col :span="5">
												<el-col>
													<el-form-item label="商品名称：">
														<el-col>
															<el-input v-model="form.goodsName" placeholder="请输入商品名称">
															</el-input>
														</el-col>
													</el-form-item>
												</el-col>
											</el-col>
											<el-col :span="8">
												<el-form-item label="时间：">
												<el-col>
													<el-date-picker
														type=daterange
														@change="handlecreateTime"
														valueFormat='yyyy-MM-dd HH:mm:ss'
														v-model="createTime"
														range-separator="至"
														start-placeholder="开始日期"
														end-placeholder="结束日期">
													</el-date-picker>
												</el-col>
												</el-form-item>
											</el-col>
											<el-col :span="7">
												<el-form-item label="推送状态">
													<el-col :span="23">
														<el-select  v-model="form.pushStatus" placeholder="请选择项目名称">
															<el-option
																	v-for="item in status"
																	:key="item.value"
																	:label="item.label"
																	:value="item.value">
															</el-option>
														</el-select>
													</el-col>
												</el-form-item>
											</el-col>
										</el-row>
								</div>
						</div>
				</el-form>
		</div>
</template>

<script>
    import {
		getProject,
		getCatagory1,
		getDealer,
		navigationbartree
    } from "@/api/product/index";
    export default {
        data() {
            return {
				num:0,
				createTime:"",
                value: '',
				carArr1: [], //一级分类
				carArr2: [], //二级分类
				carArr3: [], //三级分类
				carId1: "", //一级分类id
				carId2: "", //二级分类id
				carId3: "", //三级分类id
				status: [{
					value: '',
					label: '全部'
				}, {
					value: '0',
					label: '未推送'
				}, {
					value: '1',
					label: '已推送'
				}, {
					value: '2',
					label: '已删除'
				}, {
					value: '10',
					label: '推送中'
				}, {
					value: '11',
					label: '推送错误'
				}
				],
                venderList: [
                    {
                        name: '一件代发商品',
                        image: 'yjdf.png',
                        value: '0'
                    },
                    {
                        name: '集采商品',
                        image: 'jc.png',
                        value: '0'
                    },
                    {
                        name: '京东商品',
                        image: 'jd.png',
                        value: '1'
                    }, {
                        name: '苏宁商品',
                        image: 'sn.png',
                        value: '3'
                    }, {
                        name: '网易严选商品',
                        image: 'yx.png',
                        value: '2'
                    },
					{
						name: '虚拟商品',
						image: 'xngoods.png',
					}
                    ],
                   options: [],
					//采购员
                   form: {
					   agencyId:'',
					   goodsType: null,
					   auditStatus:1,
					   catId:'',
					   projectId:'',
					   goodsName:'',
					   operatorTimeEnd:"",
					   operatorTimeStart:'',
					   pageNum: 1,
					   pageSize: 10,
					   isSubstituteSales:true,
					   pushStatus:null
                },
                initForm: {},
				selectedItem:'',
				searchMain:"",
            }
        },
		//三级联动
		async created() {
			this._getCatagory2(1, 0);
			const pageSize = 0
			let res
			const routerInfo = this.$routerInfo.platformType
			if(routerInfo===0){
				this.searchMain = true
				res = await getDealer(pageSize)
			}else if(routerInfo===1){
				this.searchMain = false
				res = await getProject(pageSize)
			}
			if(res.code === 200 ){
				this.options = res.data.list
			}
		},
        methods: {
			//获取经销商Id
			hangdleAgency(val){
				this.form.agencyId = val
			},
			hangdleProject(val){
				this.form.projectId = val
			},
        	//获取时间
			handlecreateTime(val){
				if (val && val.length > 0) {
					this.form.operatorTimeEnd = val[0]
					this.form.operatorTimeStart = val[1]
				} else {
					this.form.operatorTimeEnd = ''
					this.form.operatorTimeStart = ''
				}

			},
			//获取分类
			//获取分类
			carIdFunc(val, index) {
				this.form.catId = val;
				if (index == 1) {
					this.carArr3 = [];
					this.carArr2 = [];
					this.carId2 = ''
					this.carId3 = ''
					this.carArr1.forEach(item => {
						if (item.catId == val) {
							this.carArr2 = item.children
						}
					})
				}
				if (index == 2) {
					this.carId3 = ''
					this.carArr3 = [];
					this.carArr2.forEach(item => {
						if (item.catId == val) {
							this.carArr3 = item.children
						}
					})
				}
			},
			async _getCatagory2() {
				const res = await navigationbartree(1)
				if (res.code === 200) {
					this.carArr1 = res.data
				}
			},

			tabVender(val, index, name) {
				if(index==1){
					this.form.isSubstituteSales = false
				}else if(index==0){
					this.form.isSubstituteSales = true
				}else{
					this.form.isSubstituteSales = null
				}
				if(val==0){
					this.form.goodsType= 0
				}else{
					this.form.goodsType = val
				}
				this.num = index
				if(index==5){
					this.form.isReal = 0
					this.sourceType=null
				}else{
					this.form.isReal = null
				}
				this.$emit('tabVender', this.form, val, index, name)
            },

            handelSearchGoods() {
				this.$emit('goodsFitter', this.form)
            },
        }
    }
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
						margin-right: 11px;
						margin-left: 11px;
				}
                .el-select{
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
