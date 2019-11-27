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
												<h4 class="title">特权信息</h4>
												<br/>
												<el-form-item label="图片:">
														<el-upload
																class="avatar-uploader"
																:action="action"
																:show-file-list="false"
																:on-success="handleAvatarSuccess"
														>
																<img v-if="form.logo" :src="form.logo" class="avatar" alt=""
																		 style="width: 100px;height: 100px"/>
																<i v-else class="el-icon-plus avatar-uploader-icon"></i>
														</el-upload>
												</el-form-item>
												<el-form-item label="特权标题:">
														<el-input v-model="form.title" style="width:700px" placeholder="请输入标题"></el-input>
												</el-form-item>
												<el-form-item label="特权链接:">
														<el-input v-model="form.linkUrl" style="width:700px" placeholder="请输入链接"></el-input>
												</el-form-item>
												<el-form-item label="备注:">
														<el-input v-model="form.remark" placeholder="请输入备注" style="width:700px"></el-input>
												</el-form-item>
										</div>
								</el-form>
						</div>
				</div>
				<div class="mbottom">
						<div class="goods-fitter">
								<el-form ref="form" :model="form" label-width="100px" size="small" class="formSty">
										<div class="search-wrapper">
												<h4 class="title">特权内容</h4>
												<br/>
												<el-form-item label="内容:">
														<el-input type="hidden" v-model="form.content"></el-input>
														<quill-editor v-model="form.content" ref="myQuillEditor"></quill-editor>
												</el-form-item>
										</div>
								</el-form>
						</div>
				</div>
				<div class="btn">
						<el-button type="danger" @click="back" size="small">取消</el-button>
						<el-button type="primary" @click="submitForm" size="small">确定</el-button>
				</div>
		</div>
</template>

<script>
    import {quillEditor} from "vue-quill-editor";
    import {getDetailbyId, update, newAdd} from "@/api/mallapp/article/index";

    export default {
        data() {
            return {
                form: {
                    logo: "", //logo
                    title: "", //标题
                    content: "", //内容
                    remark: "", //备注
                    linkUrl: "", //链接
                    id: ''
                },
                action: "", //图片上传地址
                text: "内容管理 > 企业特权 > 新建特权",
            };
        },
        created() {
            this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
            if (this.$route.query.id) {
                this.form.id = this.$route.query.id;
            }
            this.isEdit();
        },
        computed: {},
        methods: {
            isEdit() {
                if (this.$route.query.id) {
                    this.text = "内容管理 > 企业特权 > 编辑特权";
                    getDetailbyId(this.form.id).then(res => {
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
                if (this.form.id) {
                    let data = Object.assign({}, this.form);
                    update(data).then(res => {
                        if (res.code == 200) {
                            this.$message({
                                message: res.message,
                                type: "success"
                            });
                            this.$router.push({name: "enterprisePrivilege"});
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                } else {
                    let data = Object.assign({}, this.form);
                    delete data.id
                    newAdd(data).then(res => {
                        console.log(3333);

                        if (res.code == 200) {
                            this.$message({
                                message: res.message,
                                type: "success"
                            });
                            this.$router.push({name: "enterprisePrivilege"});
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
				width: 100px;
				height: 100px;
				line-height: 100px;
				text-align: center;
		}

		.avatar {
				width: 100px;
				height: 100px;
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
				width: 100px;
				height: 100px;
				line-height: 100px;
				text-align: center;
		}

		.avatar {
				width: 100px;
				height: 100px;
				display: block;
		}

		/deep/ .formSty .el-form-item__label {
				margin-top: 23px;
		}

		/deep/ .ql-container {
				min-height: 100px;
		}

</style>
