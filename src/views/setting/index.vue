<template>
		<div class="margin">
				<div class="mcard">
						<div class="title">个人设置</div>
						<el-form :model="form" ref="form" :rules="rules" label-width="100px" class="form-wrapper">
								<el-form-item label="图片：">
										<el-upload
												accept=".jpg,.png,.gif,.JPG,.JPEG,.PBG,.GIF,"
												class="avatar-uploader"
												:action="action"
												:show-file-list="false"
												:before-upload="beforeImageUpload"
												:on-success="handleAvatarSuccess"
										>
												<img v-if="form.headImgUrl" :src="form.headImgUrl" class="avatar" alt/>
												<i v-else class="el-icon-plus avatar-uploader-icon"></i>
										</el-upload>
								</el-form-item>

								<el-form-item label="昵称：" prop="sysuserName">
										<el-input v-model="form.sysuserName" placeholder="请输入昵称"></el-input>
								</el-form-item>
								<el-form-item label="公司名称：" prop="company">
										<el-input v-model="form.company" placeholder="请输入公司名称"></el-input>
								</el-form-item>
								<el-form-item label="工号：" prop="idCard">
										<el-input v-model="form.idCard" placeholder="请输入工号"></el-input>
								</el-form-item>
								<!--        <el-form-item label="部门：" prop="">-->
								<!--          <el-input v-model="form.sysuserName" placeholder="请输入部门"></el-input>-->
								<!--        </el-form-item>-->
								<el-form-item label="姓名：" prop="realName">
										<el-input v-model="form.realName" placeholder="请输入姓名"></el-input>
								</el-form-item>
								<el-form-item label="性别：" prop="sex">
										<el-select v-model="form.sex" placeholder="请选择性别">
												<el-option label="未选择" :value="0"></el-option>
												<el-option label="男" :value="1"></el-option>
												<el-option label="女" :value="2"></el-option>
										</el-select>
								</el-form-item>
								<el-form-item label="生日：" prop="birthday">
										<el-date-picker
												v-model="form.birthday"
												type="date"
												value-format="yyyy-MM-dd HH:mm:ss"
												format="yyyy-MM-dd"
												placeholder="请选择生日"
										></el-date-picker>
								</el-form-item>
								<el-form-item label="职位：" prop="position">
										<el-input v-model="form.position" placeholder="请输入职位"></el-input>
								</el-form-item>
								<el-form-item label="联系电话：" prop="telephone">
										<el-input v-model="form.telephone" placeholder="请输入联系电话"></el-input>
								</el-form-item>
								<el-form-item label="办公电话：" prop="telephone">
										<el-input v-model="form.telephone" placeholder="请输入办公电话"></el-input>
								</el-form-item>
								<el-form-item label="邮箱：" prop="telephone">
										<el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
								</el-form-item>
								<el-form-item label="地址：" prop="company">
										<el-input v-model="form.address" placeholder="请输入地址"></el-input>
								</el-form-item>
								<el-form-item>
										<el-button class="btn-submit" type="primary" @click="submitForm">保 存</el-button>
								</el-form-item>
						</el-form>
				</div>
		</div>
</template>

<script>
    import {getSysuserByid, submitData} from "@/api/setting/index";

    export default {
        name: "SelfSetting",
        data() {
            return {
                action: "",
                imageId: "",
                form: {
                    headImgUrl: '',
                    sysuserName: '',
                    company: '',
                    idCard: '',
                    realName: '',
                    sex: '',
                    birthday: '',
                    position: '',
                    telephone: '',
                    address:'',
										email:''
                },
                formData: new FormData(),
                rules: {
                    sysuserName: [
                        {required: true, message: "请输入昵称", trigger: "blur"}
                    ],
                    sex: [{required: true, message: "请选择性别", trigger: "change"}]
                },
                headImgUrl: "" //图片路径
            };
        },
        created() {
            this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
            this.loadUserInfo();

        },
        methods: {
            async loadUserInfo() {
                const user = JSON.parse(localStorage.getItem("user"));
                const {data} = await getSysuserByid(user.data.sysuserId);
                console.log(444, data)
                this.form = data;
                // this.form.headImgUrl = user.data.headImgUrl
            },
            beforeImageUpload(file) {
                const isJPG = file.type === "image/jpeg";
                const isPNG = file.type === "image/png";
                const isLt50KB = file.size / 1024 < 150;
                if (!(isJPG || isPNG)) {
                    this.$message.error("上传图片只能是JPG或者PNG格式!");
                }
                if (!isLt50KB) {
                    this.$message.error("上传图片大小不能超过 50kb!");
                }
                return isLt50KB && (isJPG || isPNG);
            },
            handleImageSuccess(res, file) {
                console.log(333, file);
                this.headImgUrl = URL.createObjectURL(file.raw);
                this.form.headImgUrl = this.headImgUrl;
            },
            //上传
            handleAvatarSuccess(res, file) {
                console.log(333, file);
                this.form.headImgUrl = res.data.domain + res.data.filePath;
            },
            //提交
            async submitForm() {
                // console.log(222, this.form)
                // this.formData.set('headImgUrl', this.form.headImgUrl)
                // this.formData.set('sysuserName', this.form.sysuserName)
                // this.formData.set('company', this.form.company)
                // this.formData.set('idCard', this.form.idCard)
                // this.formData.set('realName', this.form.realName)
                // this.formData.set('sex', this.form.sex)
                // this.formData.set('birthday', this.form.birthday)
                // this.formData.set('position', this.form.position)
                // this.formData.set('telephone', this.form.telephone)
                let data = Object.assign({}, this.form);

                const res = await submitData(data);
                if (res.code == 200) {
                    this.$message.success("修改成功");
                    this.getcookie();
                }
            }
        }
    };
</script>

<style lang="scss">
		@import "@/common/scss/variable.scss";

		.form-wrapper {
				margin-left: 100px;
				width: 600px;

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

				.input {
						width: 217px;
				}

				.btn-submit {
						margin-top: 20px;
				}
		}
</style>
