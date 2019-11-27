<template>
		<div class="goods-fitter">
				<el-form label-width="120px" size="small">
						<div class="vender">
								<ul class="clearfix">
										<li
												v-for="(item,index) in venderList"
												@click="tabVender(item.value,index,item.name)"
												:class="num == index ? 'active' : ''"
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
											   <el-col :span="7">
											     <el-col>
														<el-form-item label="经销商名称" v-if="searchMain">
																<el-col :span="23" >
																	<el-select  v-model="form.agencyId" placeholder="请选择经销商" @change="hangdleProject">
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
												<el-col :span="7">
													<el-col>
														<el-form-item label="商品名称：">
															<el-col :span="23">
																<el-input  v-model="form.goodsName" placeholder="请输入商品名称">
																</el-input>
															</el-col>
														</el-form-item>
													</el-col>
												</el-col>
												 <el-col :span="7" v-if="false">
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
												<el-col :span="2" style='text-align: center;'>
														<el-button type="primary" size="small" @click="handelSearchGoods">搜索</el-button>
														<!--<el-button type="primary" size="small" @click="handelResetCondition">导出</el-button>
														<el-button type="primary" size="small" @click="handelResetCondition">切换模态试图</el-button>
														<span class="btn-toggle" @click="toggleSearch">{{toggleSearchText}}</span>-->
												</el-col>
											    <el-col :span="12">
												<el-form-item label="时间：">
													<el-col>
														<el-date-picker
															@change="handlecreateTime"
															type=daterange
															valueFormat='yyyy-MM-dd HH:mm:ss'
															v-model="create_time"
															range-separator="至"
															start-placeholder="开始日期"
															end-placeholder="结束日期">
														</el-date-picker>
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
		getProject, //获取项目
		getDealer  //获取经销商
    } from "@/api/product/index";

    export default {
        // props: ['dataObj'],
        data() {
            return {
            	num:0,
				create_time:[],
            	options:[],
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
					}],
                initForm: {},
                searchMain: '',
				form:{
					agencyId:'',
					goodsType: null, // 1，京东 2，网易 3，苏宁 4, 一件代发商品 5, 集采商品
					goodsName:'',
					operatorTimeEnd: null,
					operatorTimeStart: null,
					pageNum:1,
					pageSize:10,
					projectId:'',
					pushStatus:'',
					isSubstituteSales:true,
					isReal: null,   //1 是正常商品 0是虚拟商品
				},
				isSubstituteSales:"",
				sourceType:"",
				agencyId:'',
				val: 0,
            }
        },
        async created() {
			const pageSize = 0
			let res
			const routerInfo = this.$routerInfo.platformType
            console.log(this.$routerInfo)
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
			hangdleProject(val){
				this.agencyId = val
			},
			handlecreateTime(val){
				if (val && val.length > 0) {
					this.form.operatorTimeStart = val[0]
					this.form.operatorTimeEnd = val[1]
				} else {
					this.form.operatorTimeStart = ''
					this.form.operatorTimeEnd = ''
				}

			},
			tabVender(val, index, name) {
				this.val = val
				this.num = index
				this.common(val, index)
				this.$emit('tabVender', this.form, val, this.isSubstituteSales, this.sourceType, this.form.isReal, index, name)
            },
            // toggleSearch() {
            //     this.searchMain = !this.searchMain
            // },
            handelSearchGoods() {
				this.common()
                this.$emit('goodsFitter', this.form,this.val,this.isSubstituteSales,this.sourceType)
            },

			common() {
				const index = this.num;
				const val = this.val;
				if (index == 1) {
					this.form.isSubstituteSales = false
					this.isSubstituteSales = 0
				} else if (index == 0) {
					this.form.isSubstituteSales = true
					this.isSubstituteSales = 1
				} else {
					this.form.isSubstituteSales = null
					this.isSubstituteSales = ''
				}
				if (val == 0) {
					this.sourceType = null
					this.form.goodsType = null
				} else {
					this.sourceType = val
					this.form.goodsType = val
				}
				if (index == 5) {
					this.form.isReal = 0
				} else {
					this.form.isReal = null
				}
			},
            // handelResetCondition() {
            //     this.form = Object.assign({}, this.initForm)
            // }
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
