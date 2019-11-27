<template>
		<div class="margin"style="min-width:1524px;max-width:100%;">
				<el-form ref="form" :model="data" :rules="rules" label-width="260px" size="small">
						<div class="mbottom">
								<div class="goods-fitter">
										<div class="search-wrapper1">
												<el-page-header @back="back" :content="title_txt"></el-page-header>
										</div>
								</div>
						</div>
						<div class="mbottom">
								<div class="goods-fitter">
										<div class="search-wrapper">
												<el-button type="primary" size="small">添加商品</el-button>
												<br/>
												<el-row :gutter="10" style="display: flex;justify-content: center;margin-top: 20px;margin-left: 0px;margin-right: 0px;">
														<div style="width: 100%;border: 1px solid #eaeef7;padding: 20px 10px 20px 20px">
																<el-col :span="5" v-for="(o, index) in 15" :key="o" style="width: 19%;margin-right: 10px">
																		<el-card shadow="never" :body-style="{ padding: '10px' }" style="margin-bottom: 20px">
																				<img
																						:src="imgGoods"
																						class="image">
																				<div style="padding: 14px;">
																						<span class="t1">德尔玛(Deerma)破壁机家用多功能榨汁机德尔玛(Deerma)破壁机家用多功能榨汁机</span>
																						<div class="bottom clearfix">
																								<div style="display: flex;justify-content: space-around">
																										<span style="color: #f95957;font-weight: bold">商城价:123</span>
																										<span style="text-decoration: line-through">京东价:169</span>
																								</div>
																						</div>
																				</div>
																		</el-card>
																</el-col>
														</div>
												</el-row>
												<el-row :gutter="10">
														<el-col :span="24">
																<div style="display: flex;justify-content: center">
																		<el-button type="danger" @click="resetForm" size="small">取消</el-button>
																		<el-button type="primary" @click="submitForm('form')" size="small">确定</el-button>
																</div>
														</el-col>
												</el-row>
										</div>
								</div>
						</div>
				</el-form>
		</div>
</template>

<script>
    import {
        topicsave,
        topicfindbyid,
        topicupdate,
        typefindall,
        categoryfindall
    } from "@/api/giftvolume/index";

    export default {
        data() {
            return {
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                title_txt: "礼品册管理>商品",
                data: {
                    topicName: "",
                    description: "",
                    startTime: "",
                    endTime: "",
                    gradeType: 0,
                    topicType: 1,
                },
                options2: [],
                rules: {
                    topicName: [{required: true, message: "请输入名称", trigger: "blur"}],
                    description: [{required: true, message: "请输入描述", trigger: "blur"}],
                    startTime: [{required: true, message: "请选择开始时间", trigger: "change"}],
                    endTime: [{required: true, message: "请选择结束时间", trigger: "change"}],
                },
                input: '',
                imgGoods:require('@/common/images/goodAdd.png')
            };
        },
        created() {
            if (this.$route.query.id) {
                this.title_txt = "编辑主题";
                this.topicfindbyid(this.$route.query.id);
            }
        },
        mounted() {
        },
        methods: {
            back() {
                this.$router.go(-1);
            },
            async topicfindbyid(id) {
                const {data} = await topicfindbyid(id);
                this.data = data;
            },
            submitForm(formName) {
                this.$refs[formName].validate(async valid => {
                    if (valid) {
                        let data;
                        if (this.$route.query.id) {
                            let obj = this.data
                            obj.topicId = this.$route.query.id;
                            data = await topicupdate(obj);
                        } else {
                            data = await topicsave(this.data);
                        }
                        if (data.code == 200) {
                            this.$message({
                                message: data.message,
                                type: "success"
                            });
                            this.back();
                        }
                    } else {
                        return false;
                    }
                });
            },
            resetForm() {
                if (this.$route.query.id) {
                    this.topicfindbyid(this.$route.query.id);
                } else {
                    this.$refs.form.resetFields();
                }
            }
        },
        components: {}
    };
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

		.item {
				line-height: 1.5;
				padding: 8px 10px;
				cursor: pointer;

				&:hover {
						color: $themeColor;
				}

				&.active {
						background: #c6e2ff;
						color: #fff;
				}
		}

		.image {
				cursor: pointer;
		}

		.item-name {
				cursor: pointer;

				&:hover {
						color: $themeColor;
				}
		}

		.el-icon-arrow-right {
				margin: 0 20px;
		}

		.store {
				width: 310px;
		}

		.red {
				color: $themeSubColor;
		}

		.transfer-wrapper {
				text-align: center;
		}

		.panel-wrapper {
				text-align: left;
				margin: 0;
				padding: 6px 0;
				list-style: none;
				height: 246px;
				overflow: auto;
				box-sizing: border-box;
		}

		.dialog-footer {
				margin-top: 20px;
				text-align: right;
		}

		.btn {
				margin-left: 20px;
		}

		.caiji {
				color: red;
		}

		.gaunjianzi {
				margin-left: 20px;
				color: red;
		}

		.danwei {
				margin-left: 10px;
		}

		.introduce {
				color: #97999f;
				font-size: 90%;
		}

		.search-wrapper1 {
				padding: 20px;
				border: 1px solid rgb(215, 224, 241);
				background: #fff;
				display: flex;
				align-items: center;

				.title1 {
						display: flex;
						margin-left: 20%;
				}
		}

		.imgbig {
				width: 100px;
				height: 100px;
		}


		.bottom {
				margin-top: 13px;
				line-height: 12px;
		}

		.button {
				padding: 0;
				float: right;
		}

		.image {
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

		.t1 {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
		}
</style>
