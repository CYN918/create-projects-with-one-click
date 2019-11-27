<template>
		<div class="margin">
				<div class="mbottom">
						<div class="goods-fitter">
								<div class="search-wrapper1" style="line-height: -1">
										<el-page-header @back="back" content="服务中心>我的服务>等级管理" style="display: flex;align-items: center"></el-page-header>
										<!--<el-button
												type="primary"
												icon="el-icon-plus"
												class="newAdd"
												@click="addGrade()"
										>新建等级
										</el-button>-->
								</div>
						</div>
				</div>
				<div class="card">
						<ul class="list">
								<!-- @mouseenter="enter(index1)" @mouseleave="leave()"-->
								<li class="item" v-for="(item1, index1) in list" :key="index1">
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
																				<div class="itmm_two" v-if="item3.termsCount=='-1'">{{item3.termsUnit}}</div>
																				<div class="itmm_two" v-else-if="item3.termsCount==null">{{item3.termsCount}}</div>
																				<div class="itmm_two" v-else>{{item3.termsCount+''+item3.termsUnit}}</div>
																				<!--<div class="itmm_two" v-if="item3.termsCount==null"></div>-->
																				<!--<div class="itmm_two" v-else>-->
																				<!--{{(item3.termsCount!=-1?item3.termsCount:'')+item3.termsUnit}}-->
																				<!--</div>-->
																		</div>
																</li>
														</ul>
												</div>
												<el-button v-if="item1.have" class="word_two_css" type="info" @click="upGread(item1.gradeNo)" >续费会员服务</el-button>
												<el-button v-else class="word_two" @click="upGread(item1.gradeNo)">升级会员服务</el-button>
										</div>
										<div v-if="item1.seen">
												<el-button class="word_three" @click.native="cancel(item1,index1)">还原</el-button>
												<el-button class="word_four" @click.native="submitData(item1,4)">保存</el-button>
										</div>
										<!--编辑提交的弹窗-->
										<el-dialog title="编辑提交" :visible.sync="dialogEdit" width="40%">
												 <span style="font-size: 19px">确定编辑提交吗?</span>
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
    import {deleteGrade, editGradeList,  getGradeList2} from "@/api/service";

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
                    "gradeLogo": "data:image/png;base64,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",
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
                deleteRemark: '',//删除原因
                newobj:null

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
                    name: "myserviceaddgrade"
                })
            },
            //获取全部数据
            getList() {
                getGradeList2().then(res => {
                    if (res.code == 200) {
                        this.list = res.data;
                        console.log(888, res.data);
                        this.list = this.list.map(v => {
                            this.$set(v, "seen", false);
                            return v;
                        });
                        this.list.forEach(item => {
                            item.servicePermissionList.forEach(item2 => {
                                // console.log(111, item2)
                                item2.serviceTermsList.forEach(item3 => {
                                    // console.log(222, item3)
                                    if (item3.termsCount == -1) {
                                        if (item3.termsUnit == '') {
                                            item3.termsCount = ''
                                            item3.termsUnit = ''
                                        } else if (item3.termsCount == null) {
                                            item3.termsCount = ''
                                            item3.termsUnit = '';
                                        } else if (item3.termsUnit == '不限量') {
                                            item3.termsCount = '不限量'
                                            item3.termsUnit = ''
                                        }
                                    // item3.termsCount = item3.termsUnit
                                    }
                                })
                            })
                        })
                    }
                });
            },
            //编辑
            editMemberGrade(row, index) {
                this.origin_data = JSON.parse(JSON.stringify(row));
                // console.log(333, this.origin_data);
                this.addEdit = true
                // this.editable = true
                // console.log(111, row.servicePermissionList[0].serviceTermsList[0]);
                row.seen = true;
                this.seen1 = false;
                this.current1 = null;
            },
            //点击保存-弹窗-提交
            submitData(item, state) {
                if (state == "4") {
                    this.newobj=JSON.parse(JSON.stringify(item))
                    // console.log(777, this.id);
                    console.log(555, item.servicePermissionList[0].serviceTermsList[0]);
                    this.dialogEdit = true;
                }
                if (state == "5") {
                    // console.log(666, item.servicePermissionList[0].serviceTermsList[0]);
										console.log(777,this.newobj)
                    //数据处理
                    this.newobj.servicePermissionList.forEach(item2 => {
                        // console.log(111, item2)
                        item2.serviceTermsList.forEach(item3 => {
                            // console.log(222, item3)
                            if (item3.termsCount == '') {
                                item3.termsCount = '-1'
                                item3.termsUnit = ''
                            } else if (item3.termsCount == '不限量') {
                                item3.termsCount = '-1'
                                item3.termsUnit = '不限量'
                            }else{
                                item3.termsUnit = '个'
                            }
                        })
                    })

                    var obj = JSON.parse(JSON.stringify(this.newobj));
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
            upGread(gradeNo) {
                // console.log(999, row)
                this.$router.push({
                    name: "myserviceupgrade",
										query:{
                        gradeNo,
										}
                });
            },
            //返回
            back() {
                this.$router.go(-1);
            },
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
								/*color: 3333;*/
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
				top: 30px;
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
		.word_two_css {
				background: #eac06f;
				height: 40px;
				width: 310px;
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
				width: 45px;
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
		/deep/.el-page-header__left{
				display: flex;
				align-items: center;
		}
</style>
