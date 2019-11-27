<template>
		<div class="margin">
				<div class="mbottom">
						<div class="goods-fitter">
								<el-form label-width="260px" size="small">
										<div class="search-wrapper">
												<h4 class="title">服务中心>服务管理</h4>
												<el-button
														type="primary"
														icon="el-icon-plus"
														class="newAdd"
														@click.native="addService()"
														v-permit="'service:add'"
												>新建服务
												</el-button>
										</div>
								</el-form>
						</div>
				</div>
				<div class="card">
						<div class="mcard">
								<ul class="list">
										<li class="item" v-for="(item, index) in list">
												<div class="word_line">
														<i>
																<img :src="item.logo" alt class="imagecss"/>
														</i>
														<span class="tt">{{item.applyName}}</span>
														<el-switch
																v-if="item.status==false"
																v-model="item.status"
																class="switch"
																@change="changedata(item,0)"
																v-permit="'service:off'"
														></el-switch>
														<el-switch
																v-if="item.status==true"
																v-model="item.status"
																class="switch"
																@change="changedata(item,1)"
																v-permit="'service:on'"
														></el-switch>
														<template>
																<span v-if="item.status" class="changes">服务开启</span>
																<span v-else class="changes11">服务关闭</span>
														</template>
												</div>
												<div class="line_div"></div>
												<div class="word_one">
														<h4 class="title1">服务介绍</h4>
														<span class="t1">{{item.introduction}}</span>
												</div>
												<div class="line_div"></div>
												<div class="word_two">
														<div class="i-div" @click="detailService(item.applyId,1)" 	v-permit="'service:introduce'">
																<i>
																		<img src="../../../common/images/service/8.png" alt class="imagecs"/>
																</i>
																<div class="div-i">介绍</div>
														</div>
														<div class="i-div" @click="detailService(item.applyId,2)" v-permit="'service:tutorial'">
																<i>
																		<img src="../../../common/images/service/9.png" alt class="imagecs"/>
																</i>
																<div class="div-i">教程</div>
														</div>
														<div class="i-div" @click="detailService(item.applyId,3)" v-permit="'service:view'">
																<i>
																		<img src="../../../common/images/service/10.png" alt class="imagecs"/>
																</i>
																<div class="div-i">详情</div>
														</div>
														<div class="i-div" @click="addService(item.applyId)" v-if="item.seen" v-permit="'service:edit'">
																<i>
																		<img src="../../../common/images/service/11.png" alt class="imagecs"/>
																</i>
																<div class="div-i">编辑</div>
														</div>
														<div class="i-div" @click="deleteService(item.applyId,4)" v-if="!item.seen" v-permit="'service:remove'">
																<i>
																		<img src="../../../common/images/service/12.png" alt class="imagecs"/>
																</i>
																<div class="div-i">删除</div>
														</div>
												</div>
										</li>
								</ul>
								<div class="pagination">
										<el-pagination
												@size-change="handleSizeChange"
												@current-change="handleCurrentChange"
												:current-page="form.current_page"
												:page-sizes="[10, 30, 50, 100]"
												:page-size="form.page_size"
												layout="total, sizes, prev, pager, next, jumper"
												:total="form.total_count"
										></el-pagination>
								</div>
						</div>
				</div>
				<!-- 删除 -->
				<el-dialog title="删除" :visible.sync="dialogDelete" width="40%">
						<el-form :model="form" label-width="100px">
								<el-form-item label="删除原因:" prop="deleteRemark">
										<el-input v-model="deleteRemark" type="textarea"></el-input>
								</el-form-item>
						</el-form>
						<span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogDelete = false" size="small">取 消</el-button>
        <el-button type="primary" @click="deleteService(false,5)" size="small">确 定</el-button>
      </span>
				</el-dialog>
				<!-- 开关弹窗 -->
				<el-dialog title="开关" :visible.sync="dialogChange" width="400px">
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogChange = false" size="small">取 消</el-button>
        <el-button type="primary" @click="changedata(false,5)" size="small">确 定</el-button>
      </span>
				</el-dialog>
		</div>
</template>

<script>
    import {
        getServiceList,
        putServiceList,
        changeServiceList,
        deleteServiceList
    } from "@/api/service";
    import {log} from "util";

    export default {
        data() {
            return {
                list: [], //数据源
                form: {
                    current_page: 1, //当前页
                    page_size: 0, //页容量
                    total_count: 0 //总条数
                },
                dialogDelete: false, //删除
                id: "",
                status: "",
                dialogChange: false,
                deleteRemark: ''//删除原因
            };
        },
        created() {
            this.getList(); //获取列表数据
        },
        computed: {},
        methods: {
            //获取列表
            getList() {
                getServiceList(this.form).then(res => {
                    this.list = res.data.list;
                    this.form.total_count = res.data.total;
                    this.list = this.list.map(v => {
                        this.$set(v, "seen", false);
                        return v;
                    });
                    this.list.forEach(item => {
                        if (item.status == 1) {
                            item.status = false;
                            item.seen = false;
                        } else {
                            item.status = true;
                            item.seen = true;
                        }
                    });
                });
            },
            //点击添加和编辑
            addService(data) {
                console.log(data, 777);

                if (data) {
                    console.log(data, 666);

                    this.$router.push({name: "AddService", query: {applyId: data}});
                } else {
                    this.$router.push({name: "AddService"});
                }
            },
            deleteService(val, state) {
                console.log(666, val);

                if (state == "4") {
                    this.id = val;
                    console.log(777, this.id);

                    this.dialogDelete = true;
                }
                if (state == "5") {
                    let obj = {};
                    obj.applyId = this.id;
                    deleteServiceList(obj).then(res => {
                        if (res.code == 200) {
                            this.dialogDelete = false;
                            this.$message({
                                message: res.message,
                                type: "success"
                            });
                            this.getList();
                        }
                    });
                }
            },

            //点击详情
            detailService(data, str) {
                if (str == "3") {
                    this.$router.push({
                        name: "DetailService",
                        query: {applyId: data, currentIndex: 0}
                    });
                } else if (str == "2") {
                    this.$router.push({
                        name: "DetailService",
                        query: {applyId: data, currentIndex: 2}
                    });
                } else {
                    this.$router.push({
                        name: "DetailService",
                        query: {applyId: data, currentIndex: 1}
                    });
                }
            },
            //页容量改变
            handleSizeChange(val) {
                this.form.page_size = val;
                this.getList();
            },
            //当前页改变
            handleCurrentChange(val) {
                this.form.current_page = val;
                this.getList();
            },
            // 01   5确认
            changedata(val, str) {
                let status = 0
                let state = false
								let statusStr='开启'
                if (!val.status) {
                    status = 1
                    state = true
                    statusStr='关闭'
                }
                console.log(99,status)
                this.$confirm(`你确认要${statusStr+val.applyName}服务吗?`, `${statusStr+val.applyName}服务`, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    changeServiceList({applyId: val.applyId, status: status}).then(
                        res => {
                            if (res.code == 200) {
                                this.dialogChange = false;
                                // this.changeValue1 = !this.changeValue1;
                                this.$message({
                                    message: res.message,
                                    type: "success"
                                });
                                this.getList();
                            }
                        }
                    );
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                    val.status = state
                });


                //展开弹窗
                // if (str == "0" || str == "1") {
                //   this.id = val;
                //   this.status = str;
                //   console.log(777, this.id);
                //
                //   this.dialogChange = true;
                // }
                // //点击确认提交
                // if (str == "5") {
                //   //发送请求
                //   changeServiceList({ applyId: this.id, status: this.status }).then(
                //     res => {
                //       if (res.code == 200) {
                //         this.dialogChange = false;
                //         // this.changeValue1 = !this.changeValue1;
                //         this.$message({
                //           message: res.message,
                //           type: "success"
                //         });
                //         this.getList();
                //       }
                //     }
                //   );
                // }
            }
        },
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

						.search-main {
						}

						.search-base {
						}
				}
		}

		.goods-list-wrapper {
				margin-top: 20px;
		}

		.el-transfer-panel__header {
				background: $themeColor;
				color: #fff;
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

		.newAdd {
				position: absolute;
				right: 50px;
				top: 38px;
		}

		span,
		label,
		i,
		div {
				line-height: 1;
		}

		ul {
				list-style: none;
		}

		.card {
				/*margin-left: 30px;*/
				margin-top: 30px;
		}

		.list {
				display: flex;
				flex-wrap: wrap;
		}

		.item {
				position: relative;
				width: 330px;
				// height: 467px;
				height: 428px;
				background: #ebf4fe;
				border: 1px solid rgba(234, 237, 244, 1);
				border-radius: 6px;
				box-sizing: border-box;
				margin-bottom: 50px;
				margin-right: 45px;
		}

		.word_line {
				display: flex;
				margin-top: 10px;
				margin-left: 10px;
				margin-right: 10px;
				background: white;
		}

		.word_one {
				background: white;
				margin-left: 10px;
				margin-right: 10px;
				height: 231px;
		}

		.word_two {
				display: flex;
				justify-content: space-around;
				background: white;
				margin-left: 10px;
				margin-right: 10px;
		}

		.i-div {
				margin-top: 20px;

				.imagecs:hover {
						transform: scale(1.6);
				}
		}

		.div-i {
				font-size: 10px;
				margin-top: 5px;
				margin-left: -4px;
				margin-bottom: 13px;
		}

		.imagecss {
				/*margin-left: 23px;*/
      margin: 5px;
				width: 90px;
				height: 90px;
		}

		.tt {
				display: flex;
				align-items: center;
				margin-left: 17px;
				margin-top: 10px;
      width: 100px;
		}

		.t1 {
				display: inline-block;
				font-size: 14px;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: rgba(96, 98, 102, 1);
				line-height: 2;
				margin-left: 10px;

				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 7;
				-webkit-box-orient: vertical;
		}

		.t2 {
				position: absolute;
				top: -13px;
				right: -45px;
				display: inline-block;
				width: 70px;
				transform: rotate(45deg);
				font-size: 14px;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
		}

		.switch {
				/*margin-top: 35px;*/
				/*margin-left: 41px;*/
				position: absolute;
				right: 45px;
				top: 44px;
		}

		.changes {
				margin-top: 58px;
				right: 40px;
				font-size: 13px;
				color: #409eff;
				position: absolute;
		}

		.changes11 {
				margin-top: 58px;
				right: 40px;
				font-size: 13px;
				position: absolute;
		}

		.title1 {
				padding-top: 5px;
				font-size: 16px;
				font-weight: 400;
				/*color: #3333;*/
				padding-left: 10px;
				line-height: 1.4;
				border-left: 4px solid $themeColor;
				margin-bottom: 10px;
		}

		.el-switch__core {
		}

		.el-switch__label * {
				line-height: 1;
				font-size: 12px;
				display: inline-block;
				margin-top: 36px;
				margin-left: 4px;
		}

		.line_div {
				margin-left: 30px;
				margin-right: 30px;
				height: 1px;
				border: 1px solid #ebf4fe;
		}
</style>
