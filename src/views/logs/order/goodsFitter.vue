<template>
		<div class="goods-fitter">
				<el-form label-width="120px" size="small">
						<div class="search-wrapper">
								<h4 class="title">搜索条件</h4>
								<div class="search-main">
										<el-row>
												<el-col :span="6">
													<el-col>
														<el-form-item label="订单ID：">
														<!--
															<el-col :span="11">
																 <el-select v-model="form.searchKey" placeholder="请选择搜索条件">
																	<el-option label="用户ID" value="0"></el-option>
																	<el-option label="账号名称" value="1"></el-option>
																	<el-option label="用户名称" value="2"></el-option>
																	<el-option label="登录IP" value="3"></el-option>
																 </el-select>
															</el-col>
															<el-col :span="1" style='height: 20px;'>
																 
															</el-col>
															-->
															<el-col :span="23">
																  <el-input v-model="form.searchValue" autocomplete="off" placeholder="请输入订单ID"></el-input>
															</el-col>
														</el-form-item>
													</el-col>
												</el-col>
												<!--
												<el-col :span="10">
												<el-form-item label="登录时间：">
													<el-col>
														<el-date-picker
															type=daterange
															valueFormat='yyyy-MM-dd HH:mm:ss'
															v-model="form.createTime"
															range-separator="至"
															start-placeholder="开始日期"
															end-placeholder="结束日期">
														</el-date-picker>
													</el-col>
												</el-form-item>
											</el-col>
											-->
												<el-col :span="2" style='text-align: center;'>
														<el-button type="primary" size="small" @click="handelSearchGoods">搜索</el-button>
												</el-col>
										</el-row>
								</div>
						</div>
				</el-form>
		</div>
</template>

<script>
    import {  getBuyer  } from "@/api/product/index";

    export default {
        props: ['dataObj'],
        data() {
            return {
				form: {
					searchKey: '',
				    searchValue: '',
					current_page: 1,
					page_size: 10,
					total_count: 0,
		     	}
            }
        },
        created() {
            // this.initForm = Object.assign({}, this.form)
            // this._getBuyer()
        },
        updated() {
            this.form.current_page = this.dataObj.current_page
            this.form.page_size = this.dataObj.page_size
            this.form.total_count = this.dataObj.total_count
        },
        computed: {
          
        },
        methods: {
            handelSearchGoods() {
                // if ( ! this.form.searchKey ) {
				//   this.$message.error('请选择搜索条件')
				//   return
				// }
                // if ( ! this.form.searchValue ) {
				//   this.$message.error('请输入搜索内容')
				//   return
				// }
				this.form.current_page = 1
                this.$emit('goodsFitter', this.form)
            }
        }
    }
</script>

<style lang="scss" scoped>
		@import "@/common/scss/variable.scss";

		.goods-fitter {
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
