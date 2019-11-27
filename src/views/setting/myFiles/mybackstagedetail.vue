<template>
		<div class="margin adduser">
				<el-form ref="form" :model="form" label-width="140px" size="small">
						<div class="mbottom">
								<div class="goods-fitter">
										<div class="search-wrapper1">
												<el-button @click="back" type="primary" size="small" icon="el-icon-back">返回</el-button>
												<h4 class="title1">用户信息</h4>
										</div>
								</div>
						</div>
						<div class="mbottom">
								<div class="goods-fitter">
										<div class="search-wrapper">
												<h4 class="title">用户信息</h4>
												<br />
												<el-row>
														<el-col :span="7">
																<el-form-item label="登录账号:" prop="sysuserAccount">
																		{{form.sysuserAccount}}
																</el-form-item>
														</el-col>
														<el-col :span="8">
																<el-form-item label="密码:" prop="password">
																		{{form.password}}
																</el-form-item>
														</el-col>
												</el-row>
												<el-row>
														<el-col :span="7">
																<el-form-item label="用户名:" prop="sysuserName">
																		{{form.sysuserName}}
																</el-form-item>
														</el-col>
														<el-col :span="8">
																<el-form-item label="真实姓名:" prop="realName">
																		{{form.realName}}
																</el-form-item>
														</el-col>
												</el-row>
												<el-row>
														<el-col :span="7">
																<el-form-item label="角色权限:" prop="date1">
																		{{form.roleName}}
																</el-form-item>
														</el-col>
														<el-col :span="8">
																<el-form-item label="性别:" prop="date2">
																		<span v-if="form.sex==1">男</span>
																		<span v-if="form.sex==2">女</span>
																</el-form-item>
														</el-col>
												</el-row>
												<el-row>
														<el-col :span="7">
																<el-form-item label="所在公司:" prop="date1">
																		<span>{{form.company}}</span>
																</el-form-item>
														</el-col>
														<el-col :span="8">
																<el-form-item label="所在部门:" prop="date2">
																		<span>{{form.organizeId}}</span>
																</el-form-item>
														</el-col>
												</el-row>
												<el-row>
														<el-col :span="7">
																<el-form-item label="移动电话:" prop="name">
																		<span>{{form.telephone}}</span>
																</el-form-item>
														</el-col>
														<el-col :span="8">
																<el-form-item label="职称:" prop="region">
																		<span>{{form.position}}</span>
																</el-form-item>
														</el-col>
												</el-row>
												<el-row>
														<el-col :span="7">
																<el-form-item label="电子邮箱:" prop="date1">
																		<span>{{form.email}}</span>
																</el-form-item>
														</el-col>
														<el-col :span="8">
																<el-form-item label="QQ:" prop="date2">
																		<span>{{form.qq}}</span>
																</el-form-item>
														</el-col>
												</el-row>
												<el-row>
														<el-col :span="7">
																<el-form-item label="出生年月:" prop="date2">
																		<span>{{form.birthday}}</span>
																</el-form-item>
														</el-col>
														<el-col :span="8">
																<el-form-item label="身份证:" prop="date2">
																		<span>{{form.idCard}}</span>
																</el-form-item>
														</el-col>
												</el-row>
												<el-row>
														<el-col :span="7">
																<el-form-item label="入职时间:" prop="date1">
																		<span>{{form.hireTime}}</span>
																</el-form-item>
														</el-col>
														<el-col :span="8">
																<el-form-item label="学历:" prop="date2" style="width: 300px">
																		<span>{{form.educationalLevel}}</span>
																</el-form-item>
														</el-col>
												</el-row>
												<el-row>
														<el-col :span="7">
																<el-form-item label="是否已婚:" prop="resource">
																		<span>{{form.maritalStatus}}</span>
																</el-form-item>
														</el-col>
														<el-col :span="8">
																<el-form-item label="毕业院校:" prop="date2">
																		<span>{{form.graduatedFrom}}</span>
																</el-form-item>
														</el-col>
												</el-row>
												<el-row>
														<el-col :span="8">
																<el-form-item label="排序:" prop="date2">
																		<span>{{form.sortOrder}}</span>
																</el-form-item>
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
        getAllOrganizational,
        getRole,
    } from "@/api/permissions/index";
    import {getRoleByid} from '@/api/setting/index'


    export default {
        data() {
            return {
                show: false, //控制密码禁用
                radio: "1",
                sysuserId: "", //用户id
                form: {
                    sysuserAccount: "", //登录账户
                    password: "", //密码
                    sysuserName: "", //用户名
                    roles: "", //角色权限
                    sortOrder: "", //排序
                    realName: "", //真实姓名
                    sex: "", //性别
                    company: "", //所在公司
                    organizeId: null, //所在部门
                    telephone: "", //电话
                    position: "", //职称
                    email: "", //邮箱
                    qq: "", //qq
                    birthday: "", //出生年月
                    idCard: "", //身份证
                    hireTime: "", //入职时间
                    educationalLevel: "", //学历
                    maritalStatus: "", //婚姻状态
                    graduatedFrom: "", //毕业院校
                    status: "" //状态
                },
                options: [],
                userOptions: []
            };
        },
        created() {
            this.getcookie()
            getAllOrganizational().then(res => {
                let arr = [];
                arr.push(res.data);
                this.transleteData(arr, this.options);
                this.IterationDelateMenuChildren(this.options);
            });
            this._getRole();
        },
        computed: {},
        methods: {
            getcookie() {
                let {data} = JSON.parse(localStorage.getItem('user'))
                console.log(777, data)
                getRoleByid(data.sysuserId).then(res => {
                    if (res.code == 200) {
                        let {data} = res
                        this.form = JSON.parse(JSON.stringify(data))
												//数据处理
                        var start = this.form.birthday.indexOf(" ");
                        this.form.birthday=  this.form.birthday.substring(start,0);
                        if (this.form.maritalStatus==0){
                            this.form.maritalStatus='未婚'
												}else{
                            this.form.maritalStatus='已婚'
												}
                    }
                })
            },
            back() {
                this.$router.go(-1);
            },
            //用户权限
            _getRole() {
                let obj = {};
                obj.currentPage = "1";
                obj.size = "0";
                getRole(obj).then(res => {
                    this.userOptions = res.data.list;
                });
            },
            transleteData(data, arr) {
                data.forEach(item => {
                    if (!item.parentId) {
                        item.parentId = 0;
                        item.parentName = "所有部门";
                    }
                    const msg = {
                        id: item.organizeId,
                        label: item.organizeName,
                        value: item.organizeId,
                        children: item.childNodes ? [] : null,
                        isLeaf: item.childNodes ? false : true
                    };
                    if (item.childNodes && item.childNodes.length > 0) {
                        this.transleteData(item.childNodes, msg.children);
                    }
                    arr.push(msg);
                });
                return arr;
            },
            IterationDelateMenuChildren(arr) {
                if (arr.length) {
                    for (let i in arr) {
                        if (arr[i].children.length) {
                            this.IterationDelateMenuChildren(arr[i].children);
                        } else {
                            delete arr[i].children;
                        }
                    }
                }
                return arr;
            }
        },
        components: {
        }
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
						width: 300px;
						margin-right: 5px;
				}
				.el-input-width {
						display: inline-block;
						max-width: 300px;
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
						margin-left: 15%;
				}
		}
</style>
