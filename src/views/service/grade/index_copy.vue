<template>
		<div class="margin">
				<div class="mbottom">
						<div class="goods-fitter">
								<el-form label-width="260px" size="small">
										<div class="search-wrapper">
												<h4 class="title">服务中心>等级管理</h4>
												<el-button
														type="primary"
														icon="el-icon-plus"
														class="newAdd"
														@click.native="addGrade()"
												>新建等级
												</el-button>
										</div>
								</el-form>
						</div>
				</div>
				<div class="card">
						<ul class="list">
								<li class="item" v-for="(item1, index1) in list" @mouseenter="enter(index1)" @mouseleave="leave()"
										:key="index1">
										<div class="item_one">
												<!-- 遮罩层盒子 -->
												<div v-show="seen1&&index1==current1" class="index-show">
														<!-- 编辑 -->
														<i class="iconfont icon-bianji iconfont_style_one"
															 @click="editMemberGrade(item1,index1)"></i>
														<!-- 删除 -->
														<i class="iconfont icon-shanchu iconfont_style_two"
															 @click.native="deleteMemberGrade(item1.id,4)"></i>
												</div>
												<!-- 顶部logo -->
												<div class="word_line">
														<i>
																<img :src="item1.gradeLogo" alt class="imagecss"/>
														</i>
												</div>
												<!-- 大标题 -->
												<div class="word_one" v-for="(item2, index2) in item1.servicePermissionList" :key="index2">
														<div class="title1" @mouseover="enter_two(index2,index1)" @mouseleave="leave_two()">
																<div style="display:block;">
																		<div
																				style="display: inline-block;width: 10px;margin-top: -10px;width: 16px;height: 42px"
																				v-if="!(seen2&&index2==current2&&seen1&&index1==current1)"></div>
																		<!--<div @mouseenter="enter_two(index2,index1)" @mouseleave="leave_two()">-->
																		<!--v-show="seen2&&index2==current2&&seen1&&index1==current1"-->
																		<div class="font_style" v-show="seen2&&index2==current2&&seen1&&index1==current1"
																				 @mouseenter="enter_two(index2,index1)" @mouseleave="leave_two()">
																				<!--加号-->
																				<i class="iconfont icon-jiahao upfont_style" @click="add1(index2,index1,item1)"></i>
																				<br/>
																				<!--减号-->
																				<i class="iconfont icon-jianhao-tianchong downfont_style" @click="reduce1(index2,index1,item1)"></i>
																		</div>
																		<!--																		</div>-->
																		<!-- 大标题图片 -->
																		<img :src="item2.permissionLogo" alt class="imagecss2"
																				 @mouseenter="enter_two(index2,index1)" @mouseleave="leave_two()"/>
																		<input
																				class="edit-input"
																				v-if="item1.seen"
																				v-model="item2.permissionTitle"
																				onclick="this.select()"
																				onkeydown="this.onkeyup();"
																				onkeyup="this.size=(this.value.length>1?(this.value.length+1):1);"
																				size="4"
																				@mouseenter="enter_two(index2,index1)"
																				@mouseleave="leave_two()"
																		/>
																		<div v-else class="title2">{{item2.permissionTitle}}</div>
																</div>
														</div>
														<ul>
																<!-- 小标题 -->
																<li class="itmm" v-for="(item3, index3) in item2.serviceTermsList" :key="index3">
																		<input
																				class="edit-input_one"
																				v-if="item1.seen"
																				v-model="item3.termsText"
																				onclick="this.select()"
																		/>
																		<div class="itmm_one" v-else>{{item3.termsText}}</div>
																		<input
																				class="edit-input_two"
																				v-if="item1.seen"
																				v-model="item3.termsCount=='-1'?item3.termsUnit:item3.termsCount"
																				onclick="this.select()"
																		/>
																		<div v-else>
																				<div class="itmm_two" v-if="item3.termsCount=='-1'">{{item3.termsUnit}}</div>
																				<div class="itmm_two" v-else>{{item3.termsCount+''+item3.termsUnit}}</div>
																		</div>
																</li>
														</ul>
												</div>
												<el-button class="word_two" @click="upGread(index3)">升级会员服务</el-button>
										</div>
										<div v-if="item1.seen">
												<el-button class="word_three" @click.native="cancel(item1)">还原</el-button>
												<el-button class="word_four" @click.native="submitData(item1)">保存</el-button>
										</div>
								</li>
						</ul>
				</div>
				<!-- 删除 -->
				<el-dialog title="删除" :visible.sync="dialogDelete" width="40%">
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogDelete = false" size="small">取 消</el-button>
        <el-button type="primary" @click="deleteService(false,5)" size="small">确 定</el-button>
      </span>
				</el-dialog>
		</div>
</template>

<script>
    import {getGradeList, editGradeList} from "@/api/service";

    export default {
        data() {
            return {
                list: [], //数据源
                editable: false, // 是否为可编辑状态
                form: {
                    id: "",
                    gradeName: "", //等级名称
                    gradeLogo: "", //等级LOGO图片地址
                    gradePrice: "", //服务价格(单位：元)
                    gradeUnit: "", //服务时间单位：Y:年、M:月、D:日；
                    gradeSlogan: "", //等级标语：如：首年免费享受服务；销售额达到XXX万可免费享受服务；
                    agreementId: "", //服务协议的文章ID
                    servicePermissionList: [
                        {
                            permissionLogo: "", //权限的logo图标
                            permissionCode: "", //服务权限的编号
                            permissionTitle: "", //服务权限的名称
                            sortOrder: "", //排序
                            serviceTermsList: [
                                {
                                    termsText: "", //服务权限条款明细
                                    termsCode: "", //权限条款的编号
                                    termsCount: "", //权限条款的数量：XX（个/分）；null为不
                                    termsUnit: "", //权限条款的单位：个，元，分等
                                    sortOrder: "" //权限条款的排序
                                }
                            ]
                        }
                    ]
                },
                servicePermissionList: [
                    {
                        permissionLogo: "", //权限的logo图标
                        permissionCode: "", //服务权限的编号
                        permissionTitle: "请输入", //服务权限的名称
                        sortOrder: "", //排序
                        serviceTermsList: [
                            {
                                termsText: "请输入", //服务权限条款明细
                                termsCode: "", //权限条款的编号
                                termsCount: "请输入", //权限条款的数量：XX（个/分）；null为不
                                termsUnit: "", //权限条款的单位：个，元，分等
                                sortOrder: "" //权限条款的排序
                            },
                            {
                                termsText: "请输入", //服务权限条款明细
                                termsCode: "", //权限条款的编号
                                termsCount: "请输入", //权限条款的数量：XX（个/分）；null为不
                                termsUnit: "", //权限条款的单位：个，元，分等
                                sortOrder: "" //权限条款的排序
                            },
														{
                                termsText: "请输入", //服务权限条款明细
                                termsCode: "", //权限条款的编号
                                termsCount: "请输入", //权限条款的数量：XX（个/分）；null为不
                                termsUnit: "", //权限条款的单位：个，元，分等
                                sortOrder: "" //权限条款的排序
                            }
                        ]
                    }
                ],
                serviceTermsList: [
                    {
                        termsText: "请输入", //服务权限条款明细
                        termsCode: "", //权限条款的编号
                        termsCount: "请输入", //权限条款的数量：XX（个/分）；null为不
                        termsUnit: "", //权限条款的单位：个，元，分等
                        sortOrder: "" //权限条款的排序
                    }
                ],
                seen1: false,
                current1: 0,
                id: "",
                dialogDelete: false,
                // current_two: 0,

                seen2: false,
                current2: 0,

            };
        },
        created() {
            this.getList();
        },
        computed: {},
        methods: {
            //大标题增加
            add1(index,cindex,item){
                item.servicePermissionList.splice(index, 0, this.servicePermissionList[0]);
                // item.servicePermissionList[cindex].push(this.servicePermissionList)
						},
						//大标题减少
						reduce1(index,cindex,item){

						},
            //获取全部数据
            getList() {
                getGradeList().then(res => {
                    if (res.code == 200) {
                        this.list = res.data;
                        console.log(888, res.data);
                        // this.list.forEach(item => {
                        //   item.servicePermissionList.forEach(item2 => {
                        //     this.$set(item2, "seen", false);
                        //   });
                        // });
                        this.list = this.list.map(v => {
                            this.$set(v, "seen", false);
                            // v.original_single_amount_cut = v.single_amount_cut;
                            // v.original_section_id = v.section_id;
                            // v.original_goods_count = v.goods_count;
                            // v.original_real_count = v.real_count;
                            // v.original_remain_count = v.remain_count;
                            return v;
                        });
                    }
                });
            },
            //编辑
            editMemberGrade(row, index) {
                this.editable = true
                // let origin_data = JSON.parse(JSON.stringify(row));
                console.log(111, row);
                row.seen = true;
                this.seen1 = false;
                this.current1 = null;
            },
            //编辑提交
            submitData(item) {
                console.log(777, item);

                var obj = JSON.parse(JSON.stringify(item));
                console.log(666, obj);

                //数据处理
                editGradeList(obj).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            message: res.message,
                            type: "success"
                        });
                        item.seen = false;
                        this.editable = false
                        this.getList();
                    }
                });
            },
            //还原
            cancel(row) {
                row.seen_one = false;
                row.seen = false;
                this.editable = false
            },
            //移入事件
            enter(index) {
                this.seen1 = true;
                this.current1 = index;
            },
            //移出事件
            leave() {
                this.seen1 = false;
                this.current1 = null;
            },
            //二级加减号
            enter_two(index, cindex) {
                if (!this.editable) {
                    return
                }
                console.log(333, index, cindex);
                this.seen2 = true;
                this.current2 = index;

                this.seen1 = true;
                this.current1 = cindex;
            },
            leave_two() {
                this.seen2 = false;
                this.current2 = null;
            },
            //点击删除
            deleteMemberGrade(val, state) {
                if (state == "4") {
                    this.id = val;
                    console.log(777, this.id);

                    this.dialogDelete = true;
                }
                if (state == "5") {
                    let obj = {};
                    obj.id = this.id;
                    deleteGrade(obj).then(res => {
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
            detailService() {
                this.$router.push({name: "DetailService"});
            },
            //会员等级升级
            upGread(index) {
                console.log(999, index)
                this.$router.push({
                    name: "upgrade"
                });
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
				}
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
				margin-top: 30px;
		}

		.list {
				display: flex;
				flex-wrap: wrap;
				/*float: left;*/
		}

		.item {
				position: relative;
				width: 376px;
				// height: 800px;
				// background: #fff;
				// border-radius: 6px;
				box-sizing: border-box;
				/*margin-right: 10px;*/
				margin-left: 10px;
				margin-bottom: 20px;
		}

		.item_one {
				background: #fff;
				border-radius: 6px;
				width: 100%;
				/*height: 100%;*/
				// height: 760px;
		}

		.word_line {
				// display: flex;/
				width: 100%;
				// margin-top: 10px;
				// margin-left: 10px;
				// margin-right: 10px;
				// background: white;
				/*position: relative;*/
		}

		.word_one {
				background: white;
				padding: 4px 10px;
				// margin-left: 10px;
				// margin-right: 10px;
		}

		.word_two {
				// display: flex;
				// justify-content: space-around;
				background: #eac06f;
				height: 40px;
				width: 310px;
				// text-align: center;
				// line-height: 40px;
				// margin:0 auto;
				// position: absolute;
				// bottom: 55px;
				// left: 50%;
				margin-left: 35px;
				margin-top: 10px;
				margin-bottom: 10px;
				font-weight: bold;
				border-radius: 5px;
		}

		.word_three {
				background: #eac06f;
				height: 40px;
				width: 150px;
				border-radius: 5px;
				margin-top: 10px;
				margin-left: 20px;
		}

		.word_four {
				background: #eac06f;
				height: 40px;
				width: 150px;
				border-radius: 5px;
				margin-top: 10px;
				margin-left: 30px;
		}

		.imagecss1 {
				position: absolute;
				margin-left: 15px;
				margin-top: 4px;
				float: left;
		}

		.imagecss2 {
				// display: inline-block;
				// display: block;
				// margin-bottom: -4px;
				/*<!--margin-bottom: -4px;-->*/
				margin-bottom: 5px;
				margin-right: 4px;
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
				margin-left: 0px;
				// width: 357px;
				width: 100%;
				height: 210px;
		}

		.tt {
				display: flex;
				align-items: center;
				margin-left: 17px;
				margin-top: 10px;
		}

		.t1 {
				display: inline-block;
				font-size: 14px;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: rgba(96, 98, 102, 1);
				line-height: 2;
				margin-left: 10px;
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
				margin-top: 35px;
				margin-left: 41px;
		}

		.changes {
				margin-top: 58px;
				margin-left: -47px;
				font-size: 13px;
				color: #409eff;
				position: absolute;
		}

		.changes11 {
				margin-top: 58px;
				margin-left: -47px;
				font-size: 13px;
				position: absolute;
		}

		.title1 {
				font-size: 18px;
				font-weight: 600;
				/*color: 3333;*/
				// padding-left: 14px;
				line-height: 1.4;
				/*margin-bottom: 10px;*/
				margin-top: 10px;
				/*margin-left: 15px;*/
		}

		.title2 {
				font-size: 18px;
				font-weight: 600;
				/*color: 3333;*/
				// display: inline-block;
				line-height: 34px;
				// margin-top: 1px;
				display: block;
				margin-top: -34px;
				/*padding-left: 22px;*/
				padding-left: 36px;
		}

		.edit-input {
				font-size: 18px;
				font-weight: 600;
				color: #9c9c9c;

				outline: none !important;
				border-top: none !important;
				border-left: none !important;
				border-right: none !important;
				border-bottom: 1px solid #000;
				// width: 80px;
		}

		.edit-input_one {
				font-size: 14px;
				color: #9c9c9c;
				margin-left: 38px;

				outline: none !important;
				border-top: none !important;
				border-left: none !important;
				border-right: none !important;
				border-bottom: 1px solid #000;
				width: 180px;
				height: 20px;
		}

		.edit-input_two {
				font-size: 14px;
				color: #9c9c9c;
				position: absolute;
				right: 25px;

				outline: none !important;
				border-top: none !important;
				border-left: none !important;
				border-right: none !important;
				border-bottom: 1px solid #000;
				width: 20px;
				height: 20px;
		}

		.itmm {
				margin-bottom: 6px;
				position: relative;

				.itmm_one {
						font-size: 14px;
						margin-left: 38px;
						color: #9c9c9c;
						line-height: 20px;
				}

				.itmm_two {
						font-size: 14px;
						display: inline-block;
						position: absolute;
						right: 20px;
						top: 1px;
				}
		}

		//遮罩层样式
		.index-show {
				background: black;
				position: absolute;
				top: 0;
				width: 100%;
				height: 30px;
				overflow: hidden;
				opacity: 0.4;
		}

		.iconfont_style_one {
				font-size: 24px;
				color: #fff;
				position: absolute;
				top: 4px;
				right: 35px;
		}

		.iconfont_style_two {
				font-size: 24px;
				color: #fff;
				position: absolute;
				top: 4px;
				right: 5px;
		}

		.font_style {
				display: inline-block;
				/*padding-top: 6px;*/
				/*<!--position: absolute;-->*/
				/*<!--left: 5px;-->*/
				/*<!--margin-top: -10px;-->*/
		}

		.upfont_style {
		}

		.downfont_style {
		}
</style>
