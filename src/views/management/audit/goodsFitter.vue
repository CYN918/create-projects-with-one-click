<template>
		<div class="goods-fitter">
				<el-form label-width="120px" size="small">
						<div class="vender" v-if="false">
							<ul class="clearfix">
								<li
									v-for="(item,index) in venderList"
									@click="tabVender(item.value,index)"
									:class="index ===num ? 'active' : ''"
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
												   <el-form-item label="经销商名称" v-if="searchMain">
													   <el-col :span="23" >
														   <el-select  v-model="form.agencyId" placeholder="请选择经销商" @change="hangdleaGenc">
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
												<el-col :span="7">
													<el-col>
														<el-form-item label="商品名称：">
															<el-col :span="23">
																<el-input v-model="form.goodsName" placeholder="请输入商品名称">
																</el-input>
															</el-col>
														</el-form-item>
													</el-col>
												</el-col>
												 <el-col :span="7">
														<el-form-item label="推送状态">
																<el-col :span="23">
																	<el-select v-model="form.pushStatus" placeholder="请选择项目名称">
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
														v-model="createTime"
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
		getProject,
		getDealer,
		contractInformation,
		projectfindinfobyid
    } from "@/api/product/index";

    export default {
        // props: ['dataObj'],
        data() {
            return {
				num:0,
				createTime:[],
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
                    }],
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
					}
					],
                   form: {
					projectId:'',
				    agencyId:'',
				    goodsName:'',
				    createTimeEnd:"",
				    createTimeStart:'',
				    pageNum: 1,
				    pageSize: 10,
					pushStatus:'',
                },
                initForm: {},
				searchMain:'',
				agencyProduct:'',  //经销商信息
				projectProduct:'' ,  //项目信息
				routerInfo: '',  // 总站0 进销商是1
				cooperationAgreement: '',
            }
        },
        async created() {
			const pageSize = 0
			let res
			const routerInfo = this.$routerInfo.platformType
			this.routerInfo = routerInfo
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
        	// 获取经销商
			async hangdleaGenc(val) {
				let agencyName
				this.form.agencyId = val
				this.options.find(item => {
					if (this.form.agencyId === item.agencyId) {
						agencyName = item.agencyName
					}
				})
				const res = await contractInformation(agencyName)
				if (res.code === 200) {
					this.cooperationAgreement = res.data
				}
			},
			async hangdleProject(val) {
				this.form.projectId = val
				const res = await projectfindinfobyid(val)
				if (res.code === 200) {
					this.cooperationAgreement = res.data
				}
			},
			handlecreateTime(val){
				if (val && val.length) {
					this.form.createTimeStart = val[0]
					this.form.createTimeEnd = val[1]
				} else {
					this.form.createTimeStart = ''
					this.form.createTimeEnd = ''
				}

			},
            // tabVender(val,index) {
			// 	this.num = index
            //     this.form.sourceType = val
            //     this.$emit('tabVender', this.form)
            // },
            handelSearchGoods() {

                // let agencyProduct
				// if(this.routerInfo==0){
				// 	this.options.find(item=>{
				// 		if(this.form.agencyId===item.agencyId){
				// 			agencyProduct = item
				// 		}
				// 	})
				// }else if(this.routerInfo==1){
				// 	this.options.find(item=>{
				// 		if(this.form.projectId = item.projectId){
				// 			agencyProduct = item
				// 		}
				// 	})
				// }
				this.$emit('goodsFitter', this.form, this.cooperationAgreement)
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
