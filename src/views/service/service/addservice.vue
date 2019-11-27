<template>
		<div class="margin">
				<div class="mbottom">
						<div class="goods-fitter">
								<div class="search-wrapper1">
										<el-page-header @back="back" :content="text"></el-page-header>
								</div>
						</div>
				</div>
				<div class="mbottom">
						<div class="goods-fitter">
								<el-form ref="form" :model="form" label-width="100px" size="small">
										<div class="search-wrapper">
												<h4 class="title">服务设置</h4>
												<br/>
												<el-form-item label="服务图标:">
														<el-upload
																class="avatar-uploader"
																:action="action"
																:show-file-list="false"
																:on-success="handleAvatarSuccess"
														>
																<img v-if="form.logo" :src="form.logo" class="avatar" alt=""/>
																<i v-else class="el-icon-plus avatar-uploader-icon"></i>
														</el-upload>
												</el-form-item>
												<el-form-item label="服务编码:">
														<el-input v-model="form.serviceCode" style="width:700px" placeholder="请输入服务编码（JF积分、JC集采、FL员工福利）"></el-input>
												</el-form-item>
												<el-form-item label="服务名称:">
														<el-input v-model="form.applyName" style="width:700px" placeholder="请输入服务名称"></el-input>
												</el-form-item>
												<el-form-item label="服务介绍:">
														<el-input
																type="textarea"
																:rows="4"
																v-model="form.introduction"
																style="width:700px"
																placeholder="请输入介绍内容"
														></el-input>
												</el-form-item>
												<el-form-item label="服务排序:">
														<el-input v-model="form.sortOrder" placeholder="请输入内容" style="width:700px"></el-input>
												</el-form-item>
										</div>
								</el-form>
						</div>
				</div>
				<div class="mbottom">
						<div class="goods-fitter">
								<el-form ref="form" :model="form" label-width="100px" size="small" class="formSty">
										<div class="search-wrapper">
												<h4 class="title">功能介绍</h4>
												<br/>
												<el-form-item label="介绍内容:">
														<el-input type="hidden" v-model="form.functionInt"></el-input>
														<quill-editor v-model="form.functionInt" ref="myQuillEditor"></quill-editor>
												</el-form-item>
										</div>
								</el-form>
						</div>
				</div>
				<div class="mbottom">
						<div class="goods-fitter">
								<el-form ref="form" :model="form" label-width="100px" size="small" class="formSty">
										<div class="search-wrapper">
												<h4 class="title">使用教程</h4>
												<br/>
												<el-form-item label="视频教程:">
														<el-upload
																class="avatar-uploader"
																:action="action"
																:show-file-list="false"
																:on-success="handleAvatarSuccess"
																style=";margin-top: 30px"
														>
																<video :src="form.courseVideo" controls="controls" style="width: 200px;height: 200px">
																</video>
														</el-upload>
												</el-form-item>
												<el-form-item label="教程内容:">
														<el-input type="hidden" v-model="form.courseInt"></el-input>
														<quill-editor v-model="form.courseInt" ref="myQuillEditor"></quill-editor>
												</el-form-item>
										</div>
										<div class="btn">
												<el-button type="primary" @click="back" size="small">取消</el-button>
												<el-button type="primary" @click="submitForm" size="small">确定</el-button>
										</div>
								</el-form>
						</div>
				</div>
		</div>
</template>

<script>
    import {quillEditor} from "vue-quill-editor";
    // import { imageUploadUrl } from "@/api/config";
    import {getServiceListByid, postServiceList, putServiceList} from "@/api/service";

    export default {
        data() {
            return {
                form: {
                    logo: "", //logo
                    applyName: "", //服务名称
                    introduction: "", //介绍
                    sortOrder: "", //排序
                    functionInt: "", //功能介绍(富文本)
                    courseInt: "", //教程内容(富文本)
                    courseVideo: '',
                    serviceCode:'', // 服务编码
                    applyId: ''
                },
                action: "", //图片上传地址
                text: "服务中心 > 服务管理 > 新建服务",
            };
        },
        created() {
            this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
            this.form.applyId = this.$route.query.applyId;
            this.isEdit();
        },
        computed: {},
        methods: {
            isEdit() {
                if (this.form.applyId) {
                    this.text = "服务管理 > 编辑";
                    // this.applyId = this.$route.query.applyId;
                    getServiceListByid(this.form.applyId).then(res => {
                        console.log(555, res);
                        this.form = Object.assign({}, res.data);
                    });
                }
            },
            //上传
            handleAvatarSuccess(res, file) {
                console.log(333, file);
                this.form.logo = res.data.domain + res.data.filePath;
            },
            //上传
            handleAvatarSuccess2(res, file) {
                console.log(333, file);
                this.form.courseVideo = res.data.domain + res.data.filePath;
            },
            //返回
            back() {
                this.$router.go(-1);
            },
            //提交
            submitForm() {
                //验证
                //数据处理
                console.log(2222);
                if (this.form.applyId) {
                    let data = Object.assign({}, this.form);
                    putServiceList(data).then(res => {
                        if (res.code == 200) {
                            this.$message({
                                message: res.message,
                                type: "success"
                            });
                            this.$router.push({name: "Service"});
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                } else {
                    let data = Object.assign({}, this.form);
                    postServiceList(data).then(res => {
                        console.log(3333);

                        if (res.code == 200) {
                            this.$message({
                                message: res.message,
                                type: "success"
                            });
                            this.$router.push({name: "Service"});
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                }
            }
        },
        components: {
            quillEditor
        }
    };
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

		/deep/ .formSty .el-form-item__label {
				margin-top: 23px;
		}

</style>
