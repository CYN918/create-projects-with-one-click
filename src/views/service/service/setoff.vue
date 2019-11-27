<template>
		<div class="mbottom">
				<div class="goods-fitter">
						<el-form label-width="160px" size="small" prop="form">
								<div class="search-wrapper">
										<h4 class="title">服务设置</h4>
										<el-row>
												<el-form-item label="服务图标:">
														<img v-if="form.logo" :src="form.logo" class="avatar"/>
												</el-form-item>
												<el-form-item label="服务名称:">
														<span>{{form.applyName}}</span>
												</el-form-item>
												<el-col :span="10">
														<el-form-item label="服务介绍:">
																<span>{{form.introduction}}</span>
														</el-form-item>
												</el-col>
										</el-row>
										<el-row>
												<el-col :span="5">
														<el-form-item label="服务排序:">
																<span>{{form.sortOrder}}</span>
														</el-form-item>
												</el-col>
												<el-col :span="5">
														<el-form-item label="服务状态:">
																<span v-if="form.status=0">已发布</span>
																<span v-if="form.status=1">下线</span>
														</el-form-item>
												</el-col>
										</el-row>
										<el-row>
												<el-col :span="5">
														<el-form-item label="创建人:">
																<span>{{form.createUserName}}</span>
														</el-form-item>
												</el-col>
												<el-col :span="5">
														<el-form-item label="创建时间:" prop="commonContactPhone">
																<span style="display: block;width: 200px;">{{form.createTime}}</span>
														</el-form-item>
												</el-col>
										</el-row>
										<el-row>
												<el-col :span="5">
														<el-form-item label="最近修改时间:" prop="agencyName">
																<span style="display: block;width: 200px;">{{form.updateTime}}</span>
														</el-form-item>
												</el-col>
												<el-col :span="5">
														<el-form-item label="修改人:" prop="commonContactName">
																<span>{{form.updateUserName}}</span>
														</el-form-item>
												</el-col>
										</el-row>
								</div>
						</el-form>
				</div>
		</div>
</template>

<script>
    export default {
        name: "setoff",
        props: {
            form: {
                type: Object,
                default: function () {
                    return {};
                }
            }
        },
        data() {
            return {
                // form: {}
            };
        },
        created() {
        },
        computed: {},
        methods: {},
        components: {}
    };
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
				}
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
				line-height: 88px;
				text-align: center;
		}

		.avatar {
				width: 80px;
				height: 80px;
				display: block;
		}

		.upload {
				position: absolute;
				margin-left: 60px;
				margin-top: 45px;
		}

		.tip {
				color: #c5c6cb;
		}
</style>
