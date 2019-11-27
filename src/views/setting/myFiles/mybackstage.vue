<comment>
		#后台用户
</comment>
<template>
		<div class="margin">
				<div class="mcard">
						<el-table :data="tableData" border style="width: 100%">
								<el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
								<el-table-column prop="status" label="状态" align="center" width="70">
										<template slot-scope="scope">{{ { 0: "正常", 1: "冻结", 2: "删除" }[scope.row.status || 0] }}</template>
								</el-table-column>
								<el-table-column prop="sysuserAccount" label="用户账号" align="center"></el-table-column>
								<el-table-column prop="sysuserName" label="用户名" align="center"></el-table-column>
								<el-table-column label="用户类型" align="center" width="120">
										<template slot-scope="scope">{{ ["系统用户", "供应商", "客户", "经销商"][scope.row.sysuserType] }}</template>
								</el-table-column>
								<el-table-column prop="roleName" label="角色权限" align="center">
										<!--     <template slot-scope="scope">-->
										<!--      <p v-for="role in scope.row.roles.have_relation" :key="role.id">{{ role.roleName }}</p>-->
										<!--     </template>-->
								</el-table-column>
								<el-table-column prop="organizeName" label="部门" align="center">
										<template slot-scope="scope">{{ scope.row.organizeName || '暂无' }}</template>
								</el-table-column>
								<el-table-column prop="realName" label="真实姓名" align="center">
										<template slot-scope="scope">{{ scope.row.realName || '未填写' }}</template>
								</el-table-column>
								<el-table-column prop="position" label="职称" align="center">
										<template slot-scope="scope">{{ scope.row.position || '暂无' }}</template>
								</el-table-column>
								<el-table-column label="操作" align="center" fixed="right" width="150">
										<template slot-scope="scope">
												<div class="line-div">
														<div class="small-Idiv" @click="detail(scope.row.sysuserId,1)">
																<div class="i-div fuzhi">
																		<img src="../../../common/images/icon/查看详情.png" alt class="operation_img"/>
																</div>
																<span style="word-break: keep-all;">详情</span>
														</div>
														<div class="small-Idiv" @click="ediotUser(scope.row.sysuserId)">
																<div class="i-div">
																		<img src="../../../common/images/icon/编辑.png" alt class="operation_img"/>
																</div>
																<span style="word-break: keep-all;">编辑</span>
														</div>
												</div>
										</template>
								</el-table-column>
						</el-table>
				</div>
		</div>
</template>

<script>
    // import {
    //     getUserPage,
    //     getAllSysuer,
    // } from "@/api/permissions/index";

    import {getRoleByid} from '@/api/setting/index'

    export default {
        data() {
            return {
                data: [],
                value: [],
                sysuserId: "", // 后台用户id
                tableData: [],
            };
        },
        created() {
            // this._getUserPage();
            // this._getAllSysuer();
            this.getcookie()
        },
        methods: {
            getcookie() {
                console.log(666,JSON.parse(localStorage.getItem('user')))
                let {data} = JSON.parse(localStorage.getItem('user'))
                console.log(777, data)
                getRoleByid(data.sysuserId).then(res => {
                    if (res.code == 200) {
                        // this.form=Object.assign({},res.data)
                        let {data} = res
                        let arr = []
                        arr.push(data)
                        // this.tableData = [...data]
                        this.tableData = JSON.parse(JSON.stringify(arr))

                    }
                })
            },
            //编辑
            ediotUser(id) {
                this.$router.push({name: "mybackstageedit", query: {id: id}});
            },
            //详情
            detail(id, state) {
                this.$router.push({name: "mybackstagedetail", query: {id: id, state: state}});
            },
            // _getAllSysuer() {
            //  getAllSysuer().then(res => {
            //   res.data.forEach(item => {
            //    this.data.push({
            //     label: item.roleName,
            //     key: item.roleId
            //    });
            //   });
            //  });
            // },

            // // 获取所有用户
            // _getUserPage(data) {
            //  if (data) {
            //   this.form.current_page = 1;
            //  }
            //  getUserPage(this.form).then(res => {
            //   this.tableData = res.data.list;
            //   this.form.total_count = res.data.total;
            //  });
            // }
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
						max-width: 240px;
						margin-right: 5px;
				}

				.el-date-picker {
						max-width: 240px;
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
				text-align: center;
		}
		.line-div {
				display: flex;
				justify-content: space-evenly;
				margin-top: 5px;
				width: 100px;
				margin-left: 10px;
		}

		.small-Idiv {
				width: 32px;

				span {
						margin-top: 3px;
						font-size: 12px;
						font-family: MicrosoftYaHei;
						font-weight: 400;
						color: rgba(72, 73, 77, 1);
				}
		}

		.i-div {
				cursor: pointer;
				width: 32px;
				height: 32px;
				border-radius: 6px;
				display: flex;
				justify-content: center;
				align-items: center;
		}

		.line-div {
				display: flex;
				justify-content: space-between;
		}

		.el-select-width {
				max-width: 300px;
				margin-right: 5px;
		}

		.el-date-picker {
				max-width: 240px;
				margin-right: 5px;
		}

		.el-input-width {
				display: inline-block;
				max-width: 180px;
		}

		.el-select {
				width: 100% !important;
		}

		.img_size {
				width: 118px;
				height: 170px;
		}

		.small_top {
				margin-top: 10px;
				margin-left: 15px;
				margin-right: 15px;
		}

		.distribution {
				display: flex;
				align-items: center;
				position: relative;
				top: -12px;
		}

		.roleuser {
				position: relative;

				.pushmsg {
						position: absolute;
						top: 11px;
						left: 47%;
						font-size: 16px;
						color: #303133;
						font-weight: 400;
				}
		}
</style>
