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
														@click="addGrade()"
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
															 @click="deleteMemberGrade(item1.id,4)"></i>
												</div>
												<!-- 顶部logo -->
												<div class="word_line">
														<i><img :src="item1.gradeLogo" alt class="imagecss"/></i>
												</div>
												<!-- 大标题 -->
												<div class="word_one" v-for="(item2, index2) in item1.servicePermissionList" :key="index2">
														<div class="title1">
																<div style="display:block;margin-bottom: 6px">
																		<!-- 大标题图片 -->
																		<img :src="item2.permissionLogo" alt class="imagecss2"/>
																		<div v-if="item1.seen" class="edit-input_out">
																				<input
																						class="edit-input"
																						v-model="item2.permissionTitle"
																						onclick="this.select()"
																						onkeydown="this.onkeyup();"
																						onkeyup="this.size=(this.value.length>1?(this.value.length+1):1);"
																						size="4"
																				/>
																		</div>
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
																				v-model="item3.termsCount"
																				onclick="this.select()"
																		/>
																		<div v-else>
																				<!--<div class="itmm_two" v-if="item3.termsCount=='-1'">{{item3.termsUnit}}</div>-->
																				<!--<div class="itmm_two" v-if="item3.termsCount==null">{{item3.termsCount}}</div>-->
																				<!--<div class="itmm_two" v-else>{{item3.termsCount+''+item3.termsUnit}}</div>-->
																				<div class="itmm_two" v-if="item3.termsCount==null"></div>
																				<div class="itmm_two" v-else>
																						{{(item3.termsCount!=-1?item3.termsCount:'')+item3.termsUnit}}
																				</div>
																		</div>
																</li>
														</ul>
												</div>
												<el-button class="word_two" @click="upGread(index1)">升级会员服务</el-button>
										</div>
										<div v-if="item1.seen">
												<el-button class="word_three" @click.native="cancel(item1,index1)">还原</el-button>
												<el-button class="word_four" @click.native="submitData(item1,4)">保存</el-button>
										</div>
										<!--编辑提交的弹窗-->
										<el-dialog title="编辑提交" :visible.sync="dialogEdit" width="40%">
                         <span slot="footer" class="dialog-footer">
                             <el-button type="danger" @click="dialogEdit = false" size="small">取 消</el-button>
													 	 <el-button type="primary" @click="submitData(item1,5)" size="small">确 定</el-button>
												 </span>
										</el-dialog>
								</li>
						</ul>
				</div>
				<!-- 删除弹窗 -->
				<el-dialog title="删除" :visible.sync="dialogDelete" width="30%">
						<el-form :model="form" label-width="100px">
								<el-form-item label="删除原因:" prop="deleteRemark">
										<el-input v-model="deleteRemark" type="textarea"></el-input>
								</el-form-item>
						</el-form>
						<span slot="footer" class="dialog-footer">
                  <el-button type="danger" @click="dialogDelete = false" size="small">取 消</el-button>
									<el-button type="primary" @click="deleteMemberGrade(false,5)" size="small">确 定</el-button>
            </span>
				</el-dialog>

		</div>
</template>

<script>
    import {getGradeList, editGradeList, deleteGrade} from "@/api/service";

    export default {
        data() {
            return {
                list: [], //数据源
                // editable: false, // 是否为可编辑状态
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
                addlist: [{
                    "id": "",
                    "gradeNo": 2,
                    "gradeName": "haha会员",
                    "gradeLogo": "http://dev.fuyuanai.com/img/yuanfu_pic.d64e7af2.png",
                    "gradePrice": 19800,
                    "gradeUnit": "Y",
                    "gradeSlogan": "销售额达200万可免费享受服务",
                    "agreementId": "2",
                    "createTime": "2019-09-04 14:40:28",
                    "createUserId": null,
                    "updateTime": "2019-09-04 14:40:28",
                    "updateUserId": null,
                    "servicePermissionList": [
                        {
                            "permissionLogo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAUCAYAAABvVQZ0AAADKElEQVQ4T41TXWgUVxg95866YxR/AqZKakXRGidrrZR9UosNRKuzJCCFYLKDEkQR+iTSB8U+FGmpbyKCDy0q7sTYPohWdxNUUPEnEBD/spNVqVX8QcVqqUbj/txPxrDJ7GjA+3YP554533fOEB8+zKUSTVpJOwWLBKgB+ALAVa3lj//HPt+7qKXndfgpw8Dtg81TX+tiJ8GGUT4EAv8ocnVd8nhvkFMhduNg05SS1hcBfD6aUAAfoCots9q6e8pYhVi/mzgqQPNHCL2jELjPN0b9vHV/+Svw70Onz125WEGdDwn1QmTbYEGumAamQ6nNJJIhzrZ6J/1zhZjn2nsAbgwQL1UVBpb8m4+YVePMpSpSuma1dt/xXHs3wO8Do+UsJ22FxBKXASwsk0qQpjcD+XPjxkevAJwJyKBofFMyeNPQ8pjkmDK3qjBQPav9zH/DY3pu4gGA2jLBiHK6FHRcC48E3O6sd9KbPDdxC8CcYZycW588fmtELJW4AWLusH0iTl16qZXRB0HkHS6yvs8cv29+/tVTAJPLXGXkP53XevJh0NlhAKsCu/jNctIbvI4VtohKGkRvXVtmV67DbhWwY8StPLOczBQCEkhzxVoFY39FUpQfrdpXv7LhTNHHs6lEsyJSAkws8wSyP+Zk2isCyOxaac6sVv0gZgUFCXmiwSwEn5GBPQ3NXRDIwpjT5VWI9bv2F1pLDZXqAhANdemDV4FsiSjj97q2Y/4Oh0p7/YAdV+RJKnQqjW5NuAAmjC4oQnB7SSSnyN0kllvJ9CV6qaavQH0KQPWQcxwSJTsg+IHC70CYgWULgHOi5ScqIw7ILwAMAE+1sJHZlO0X8JOQi8eE7FSiuvJAtVJSAy0vooZxr6h1HMAmAb4MvXnIrGtvAdiigAUCqBAhWyS+XpBMP//7z8ZJg3nzAoFYZUDQInIVlEPD1fADEPBaIHLP1MWGOWtOPClj2X32NEZ5FjJSboGOvZem/8BzE3cBzABxU8bI0lhL5lE4hFznslqto6d9QQK3LSc9O1D0Ebrn2jsgtFUk/63/e4yWZvZA4wzS7CbliOVktpZ5bwFlgzz5yuQOLwAAAABJRU5ErkJggg==",
                            "permissionCode": "service",
                            "permissionTitle": "服务权限",
                            "sortOrder": 1,
                            "serviceTermsList": [
                                {
                                    "termsText": "可搭建员工福利系统",
                                    "termsCode": "create_welfare_project",
                                    "termsCount": 1,
                                    "termsUnit": "个",
                                    "sortOrder": 1
                                },
                                {
                                    "termsText": "可搭建企业集采平台",
                                    "termsCode": "create_purchase_platform",
                                    "termsCount": 1,
                                    "termsUnit": "个",
                                    "sortOrder": 2
                                },
                                {
                                    "termsText": "可搭建积分兑换商城",
                                    "termsCode": "create_redeem_shop",
                                    "termsCount": 1,
                                    "termsUnit": "个",
                                    "sortOrder": 3
                                },
                                {
                                    "termsText": "可搭建分销商城",
                                    "termsCode": "create_distribution_shop",
                                    "termsCount": 1,
                                    "termsUnit": "个",
                                    "sortOrder": 4
                                },
                                {
                                    "termsText": "可制作礼品卡册平台",
                                    "termsCode": "make_gift_platform",
                                    "termsCount": 1,
                                    "termsUnit": "个",
                                    "sortOrder": 5
                                },
                                {
                                    "termsText": "可使用礼品方案制作系统",
                                    "termsCode": "use_gift_plan_project",
                                    "termsCount": 1,
                                    "termsUnit": "个",
                                    "sortOrder": 6
                                },
                                {
                                    "termsText": "可对接API接口及供应链输出",
                                    "termsCode": "can_api_supply_chain",
                                    "termsCount": 1,
                                    "termsUnit": "个",
                                    "sortOrder": 6
                                }
                            ]
                        },
                        {
                            "permissionLogo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAYAAADdRIy+AAACXklEQVQ4T6WUTWgTURDH//M2pk2sFC96KNiCgjUx9lIFm4hY68VLURD1YLKloFCx0m714MmDXmoSq6LgB26s1IN4EKEoioKISMQqmo8qFJR6KB56MKnGmOyObMzHps2CwXd6O2/mN/Nm/m8JppW8obSyjaMArTbbLfeMb5JEW9v9wc8lHyptEqf32dG25gWALf8EKzoRMPUl9du7e/BS1jCVgXFVGSPC8XpgJV9mXNnYFzpaBsZUZa8g3DMnqB9M+91y8C7FIsfWCrZPgdBcP6QSQUAKLDopriqvibD5f2DlWOa3lIgoCQAuM5CJuwWLLgafqZ2IHukiPyx08QCgdaYJxyg5obRyDi8BtFSCuccth5/GVWWUCCeqoIxoXqKdWj7rbBD2d6a4r3ab1FWY8gd1yCOReA5gZSGY8d1m4+3rD4XfJ1UlwoTAXzM+SvTLpy9wFssdz4Byq+Z1oW3z+MemKzocV3zQ8RiAo1jRnKbrvvnZ5tlVben7DHSQyHszmcycw940CaJdhSTMP3UhejYFgq+qdGh8JG4O9UIIQz62InQmL8iby6QWnPbGlg3yxZnpW8oEAweL5zkd2h6PPDa55KWUDMnISD9Dvw5QoXrjJQhN2tHeP5quFj8zAbJLDo+be1y+stmYUJVTIJytyAFRJv5EIH+5EtZPuvrOn1usgprAwvUjwxcAGrTQZ8gth0ZqnVkCmWFo9A4RDiySzW2XHAoQGUNfuiyBhuubq4eXORpWGA0vTBTAw0w23dt55FrOovLK38bKIXF5oAnOxidMEJoQ3R3+4A8rX8P+BxquzaBbGLMwAAAAAElFTkSuQmCC",
                            "permissionCode": "goods",
                            "permissionTitle": "商品权限",
                            "sortOrder": 2,
                            "serviceTermsList": [
                                {
                                    "termsText": "可上传自有商品",
                                    "termsCode": "upload_private_goods",
                                    "termsCount": 1,
                                    "termsUnit": "个",
                                    "sortOrder": 1
                                },
                                {
                                    "termsText": "可自定义短信签名",
                                    "termsCode": "custom_sms_signature",
                                    "termsCount": 1,
                                    "termsUnit": "个",
                                    "sortOrder": 2
                                },
                                {
                                    "termsText": "可添加员工账号数量",
                                    "termsCode": "add_employee_account_number",
                                    "termsCount": 1,
                                    "termsUnit": "个",
                                    "sortOrder": 3
                                },
                                {
                                    "termsText": "可搭建福原爱分期商城",
                                    "termsCode": "create_staging_shop",
                                    "termsCount": 1,
                                    "termsUnit": "个",
                                    "sortOrder": 4
                                }
                            ]
                        },
                        {
                            "permissionLogo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAB6klEQVQ4T6WUvU8UQRjGn2dm+Ug0llTGSlQO0UINXGtBcwZj50fi4ccfoLf4VxiU+AcsqwnQkZAYC0JCB7lcB3dnSEjUxJJGofB2d+Y1w+0dmyVR4KaZvDPz/OZ5Z+YdItdEwPp8pUTFxwSKAlx0Swj5CcGGpV28Pj33hYBkpcwGW/OvxzwyEPB2foNcXEuS+PnNlx/qnfEuaDt8M6lglwGc+w+kPU0cEPZBofx+rR0CcE401eaJIUc2DpI4LjpndGfS/OjXANw6kZPji2qF8uw4G2FlCuDKGSGHMgtzj83QXxLgYS8gAZacox8AL2VAfwBoAH3pWCvtB9q9xAANgMGM5jubYSUR0Andy/jVkmhYKW+oD8pdbTRg5XLLMxSjd0l6VpnRwcTsRap/F8CFtgyJc5SgA4L8trG54nlqyFJtOVAk5qpKPGrP7jgQE94QzT3Q7uRB+dQiQPQRHHGaQpqqmDS1/sxj/MZ66C8SeNTLYQNYYDOcKQnkcy8gipQoABuhXyVw50wwQXX02WzxsEQagV+AkirA86eE7Vtlxseezn3tFm0jmLkLZVdOAdvXlPvXyu/Wu0XbcbH96dWIsjoAMPEvZwQ2jTIvnJPMzR2TsB74kySegCgi/djEfWzAhoZeGJl+u5pX/QV92LXdEg4fQQAAAABJRU5ErkJggg==",
                            "permissionCode": "other",
                            "permissionTitle": "其他权限",
                            "sortOrder": 3,
                            "serviceTermsList": [
                                {
                                    "termsText": "ERP管理系统（采购、销售、仓储物流、财务）",
                                    "termsCode": "erp_manage",
                                    "termsCount": 1,
                                    "termsUnit": "个",
                                    "sortOrder": 1
                                },
                                {
                                    "termsText": "可使用卡券商城",
                                    "termsCode": "use_card_voucher_shop",
                                    "termsCount": 1,
                                    "termsUnit": "个",
                                    "sortOrder": 2
                                },
                                {
                                    "termsText": "付费定制开发享受6折优惠",
                                    "termsCode": "custom_development",
                                    "termsCount": 1,
                                    "termsUnit": "个",
                                    "sortOrder": 3
                                }
                            ]
                        }
                    ]
                }],
                seen1: false,
                current1: 0,
                id: "",
                dialogDelete: false,//删除弹窗
                dialogEdit: false,//编辑提交弹窗
                seen2: false,
                current2: 0,
                addEdit: true,//编辑提交还是添加提交
                origin_data: null,
                deleteRemark: ''//删除原因

            };
        },
        created() {
            this.getList();
        },
        computed: {},
        methods: {
            //新增
            addGrade() {
                this.$router.push({
                    name: "addgrade"
                })
            },
            //获取全部数据
            getList() {
                getGradeList().then(res => {
                    if (res.code == 200) {
                        this.list = res.data;
                        console.log(888, res.data);
                        this.list = this.list.map(v => {
                            this.$set(v, "seen", false);
                            return v;
                        });
                        this.list.forEach(item => {
                            item.servicePermissionList.forEach(item2 => {
                                console.log(111, item2)
                                item2.serviceTermsList.forEach(item3 => {
                                    // console.log(222, item3)
                                    // if (item3.termsCount == -1) {
                                    //     if (item3.termsUnit == '') {
                                    //         item3.termsCount = ''
                                    //         item3.termsUnit = ''
                                    //     } else if (item3.termsCount == null) {
                                    //         item3.termsCount = ''
                                    //         item3.termsUnit = '';
                                    //     } else if (item3.termsUnit == '无限量') {
                                    //         item3.termsCount = '无限量'
                                    //         item3.termsUnit = ''
                                    //     }
                                    // item3.termsCount = item3.termsUnit
                                    // }
                                })
                            })
                        })
                    }
                });
            },
            //编辑
            editMemberGrade(row, index) {
                this.origin_data = JSON.parse(JSON.stringify(row));
                console.log(333, this.origin_data);
                this.addEdit = true
                // this.editable = true
                console.log(111, row);
                row.seen = true;
                this.seen1 = false;
                this.current1 = null;
            },
            //点击保存-弹窗-提交
            submitData(item, state) {
                if (state == "4") {
                    console.log(777, this.id);

                    this.dialogEdit = true;
                }
                if (state == "5") {
                    console.log(666, item);
                    //数据处理
                    item.servicePermissionList.forEach(item2 => {
                        console.log(111, item2)
                        item2.serviceTermsList.forEach(item3 => {
                            console.log(222, item3)
                            if (item3.termsCount === null && item3.termsCount == '') {
                                item3.termsCount = '-1'
                                item3.termsUnit = ''
                            } else if (item3.termsCount == '无限量') {
                                item3.termsCount = '-1'
                                item3.termsUnit = '无限量'
                            }
                        })
                    })

                    var obj = JSON.parse(JSON.stringify(item));
                    console.log(777, obj);
                    editGradeList(obj).then(res => {
                        if (res.code == 200) {
                            this.$message({
                                message: res.message,
                                type: "success"
                            });
                            item.seen = false;
                            this.dialogEdit = false
                            this.getList();
                        }
                    });
                }
            },
            //还原
            cancel(row, index) {
                if (this.addEdit) {
                    console.log(444, row);
                    row.seen_one = false;
                    row.seen = false;
                    this.$set(this.list, index, this.origin_data)
                    console.log(555, this.origin_data);
                    console.log(666, row);
                } else {
                    // row.seen_one = false;
                    // row.seen = false;
                    this.list.splice(this.list.length - 1, 1)
                    // this.$set(this.list, this.list.length - 1,'')
                }

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
            //详情
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
				margin-bottom: -3px;
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
				margin-left: 15px;
		}

		.title2 {
				font-size: 18px;
				font-weight: 600;
				/*color: 3333;*/
				// display: inline-block;
				line-height: 34px;
				// margin-top: 1px;
				display: block;
				margin-top: -27px;
				padding-left: 22px;
				/*padding-left: 36px;*/
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

		.edit-input_out {
				display: inline-block;
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
