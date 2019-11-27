<template>
		<div class="margin">
				<div class="mbottom">
						<div class="goods-fitter">
								<el-form label-width="100px" size="small">
										<!--<div class="search-wrapper">
											<h4 class="title">搜索条件</h4>
											<div class="search-base">
												<el-row>
													<el-col :span="5">
														<el-col>
															<el-form-item label="入驻商品品类：" label-width="120px">
																<el-col :span="22">
																	<el-select
																					class="el-select-width"
																					v-model="search_type"
																					placeholder="请选择"
																	>
																		<el-option label="家居日用" value="家居日用"></el-option>
																		<el-option label="美妆个护" value="美妆个护"></el-option>
																		<el-option label="礼品箱包" value="礼品箱包"></el-option>
																		<el-option label="户外运动" value="户外运动"></el-option>
																		<el-option label="无" value="无"></el-option>
																	</el-select>
																</el-col>
															</el-form-item>
														</el-col>
													</el-col>
													<el-col :span="5">
														<el-col>
															<el-form-item label="关键词：">
																<el-col :span="23">
																	<el-input v-model="keyword" placeholder="请输入供应商名称/联系人等"></el-input>
																</el-col>
															</el-form-item>
														</el-col>
													</el-col>
													<el-col :span="5">
														<el-col>
															&lt;!&ndash; <el-form-item label="采购管理员：">
																<el-col :span="23">
																	<el-input v-model="people" placeholder="请输入采购管理员"></el-input>
																</el-col>
															</el-form-item> &ndash;&gt;
														</el-col>
													</el-col>
													<el-col :span="1" class="btn_right">
														<el-button type="primary" size="small" @click="_getSupplierarchives(true)">查询</el-button>
													</el-col>
												</el-row>
											</div>
										</div>-->
								</el-form>
						</div>
				</div>
				<div class="mcard">
						<!-- <el-row class="operate mbottom">
							 <el-col :span="21">
								 <el-button type="primary" size="small" @click="add">新增</el-button>
								 <el-button type="primary" size="small"  @click="blackList = true" >黑名单</el-button>
								 <el-button type="primary" size="small" >第三方供应商</el-button>
							 </el-col>
							 <el-col :span="3"></el-col>
						 </el-row>-->
						<el-table :data="tableData" border style="width: 100%" stripe>
								<el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
								<el-table-column  prop="auditStatus"  label="状态" align="center">
										<template slot-scope="scope">
												<div class="txt_left">{{scope.row.auditStatus == 0?'审核中':scope.row.auditStatus == 1?'通过':scope.row.auditStatus == 2?'未通过':''}}</div>
												<div class="txt_left"></div>
										</template>
								</el-table-column>
								<el-table-column prop="supplierName" label="供应商信息" align="center" width="200">
										<template slot-scope="scope">
												<div class="txt_left">供应商名称：{{scope.row.supplierName}}</div>
												<div class="txt_left">用户名：{{scope.row.sysuser.sysuserName}}</div>
												<div class="txt_left">账号：{{scope.row.sysuser.sysuserAccount}}</div>
												<div class="txt_left">性质：{{scope.row.supplierNature}}</div>
												<div class="txt_left">管理员：{{ scope.row.admin&&scope.row.admin.sysuserName||''}}</div>
												<!--<el-button type="primary" size="small" @click="checkgoods">查看商品</el-button>-->
										</template>
								</el-table-column>
								<el-table-column prop="oneCategory" label="一级品类" align="center"></el-table-column>
								<el-table-column prop="twoCategory" label="二级品类" align="center"></el-table-column>
								<el-table-column   label="联系人信息" align="center"  width="200">
										<template slot-scope="scope">
												<div class="txt_left">业务联系人：{{scope.row.contacts[0].name}}</div>
												<div class="txt_left">固定电话：{{scope.row.contacts[0].fixedPhone}}</div>
												<div class="txt_left">手机：{{scope.row.contacts[0].telephone}}</div>
												<div class="txt_left">QQ：{{scope.row.contacts[0].qq}}</div>
												<div class="txt_left">邮箱：{{scope.row.contacts[0].email}}</div>
												<div class="txt_left">微信：{{scope.row.contacts[1].wechat}}</div>
												<div class="txt_left">订单处理人手机：{{scope.row.contacts[1].telephone}}</div>
												<div class="txt_left">订单处理人邮箱：{{scope.row.contacts[1].email}}</div>
										</template>
								</el-table-column>
								<el-table-column  prop="name"  label="总经理信息" align="center"  width="200">
										<template slot-scope="scope">
												<div class="txt_left">总经理：{{scope.row.contacts[2].name}}</div>
												<div class="txt_left">手机：{{scope.row.contacts[2].telephone}}</div>
												<div class="txt_left">公司电话：{{scope.row.contacts[2].fixedPhone}}</div>
												<div class="txt_left">传真：{{scope.row.extend.fax}}</div>
												<div class="txt_left">地址：{{scope.row.supplierAddress}}</div>
												<div class="txt_left">网址：{{scope.row.supplierUrl}}</div>
										</template>
								</el-table-column>
								<el-table-column  prop="name"  label="主营商品" align="center"  width="150">
										<template slot-scope="scope">
												<div class="txt_left">自营品牌：{{scope.row.selfProduct}}</div>
												<div class="txt_left">代理品牌：{{scope.row.agentBrand}}</div>
												<div class="txt_left">主营产品：{{scope.row.mainProduct}}</div>
										</template>
								</el-table-column>
								<el-table-column  prop="name"  label="付款信息" align="center"  width="200">
										<template slot-scope="scope">
												<div class="txt_left">开户名称：{{scope.row.extend.bankCompany}}</div>
												<div class="txt_left">开户行：{{scope.row.extend.bankName}}</div>
												<div class="txt_left">开户账号：{{scope.row.extend.bankAccount}}</div>
												<div class="txt_left">税号：{{scope.row.extend.taxNumber}}</div>
										</template>
								</el-table-column>
								<el-table-column  prop="settleType"  label="结账方式" align="center">
										<template slot-scope="scope">
												<div v-if="scope.row.settleType ==0"> 月结 </div>
												<div v-if="scope.row.settleType ==1"> 季度结算 </div>
												<div v-if="scope.row.settleType ==2"> 年度结算 </div>
												<div v-if="scope.row.settleType ==3"> 集采/批发 </div>
												<div v-if="scope.row.settleType ==4"> 预付定金 </div>
										</template>
								</el-table-column>
								<el-table-column  prop="isWholesale"  label="一件代发" align="center" width="100">
										<template slot-scope="scope">
												{{scope.row.isWholesale == false?'不支持':'支持'}}
										</template>
								</el-table-column>
								<el-table-column   label="营业执照" align="center" width="140">
										<template slot-scope="scope">
												<img :src="scope.row.businessLicense" alt="" class="img_size">
												<div>
														<el-button type="primary" size="small"  @click="open(scope.row.businessLicense)">点击查看大图</el-button>
												</div>
										</template>
								</el-table-column>
								<el-table-column  label="一般纳税人资格证" align="center" width="140" >
										<template slot-scope="scope">
												<img :src="scope.row.taxpayerQualification" alt="" class="img_size">
												<div>
														<el-button type="primary" size="small"  @click="open(scope.row.taxpayerQualification)">点击查看大图</el-button>
												</div>
										</template>
								</el-table-column>
								<el-table-column  prop="name"  label="品牌授权书" align="center" width="140">
										<template slot-scope="scope">
												<img :src="scope.row.brandAuthUrl" alt="" class="img_size">
												<div>
														<el-button type="primary" size="small"  @click="open(scope.row.brandAuthUrl)">点击查看大图</el-button>
												</div>
										</template>
								</el-table-column>
								<el-table-column  prop="name"  label="授权链" align="center" width="140">
										<template slot-scope="scope">
												<img :src="scope.row.authorizationChain" alt="" class="img_size">
												<div>
														<el-button type="primary" size="small"  @click="open(scope.row.brandAuthUrl)">点击查看大图</el-button>
												</div>
										</template>
								</el-table-column>
								<el-table-column label="操作" align="center" fixed="right" width="170">
										<template slot-scope="scope">
												<!--<div class="line-div">
													<div class="small-Idiv" @click="assigned(scope.row.supplierId)">
														<div class="i-div yonghu">
															<img
																			src="../../common/images/icon/指派采购员.png"
																			alt
																			class="operation_img"
																			style="margin-left: 19px;"
															/>
														</div>
														<span style="word-break: keep-all;margin-left: -8px;">指派采购员</span>
													</div>
													<div class="small-Idiv" @click="dialogVisible11 = true">
														<div class="i-div gongneng" style="margin-left: 5px;">
															<img
																			src="../../common/images/icon/新增品类.png"
																			alt
																			class="operation_img"
																			style="margin-left: 9px;"
															/>
														</div>
														<span style="word-break: keep-all;">新增品类</span>
													</div>
												</div>-->
												<div class="line-div small_top">
														<div class="small-Idiv" style="margin-left: -3px;"  @click="detail(scope.row.auditId,scope.row.supplierId,scope.row.auditStatus,1)">
																<div class="i-div">
																		<img src="../../../common/images/icon/查看详情.png" alt class="operation_img" />
																</div>
																<span style="word-break: keep-all;">详情</span>
														</div>
														<div class="small-Idiv" @click="editor(scope.row.supplierId)">
																<div class="i-div" style="margin-left: 5px;">
																		<img src="../../../common/images/icon/编辑.png" alt class="operation_img" />
																</div>
																<span style="word-break: keep-all;margin-left: 7px;">编辑</span>
														</div>
												</div>
												<!--<div class="line-div small_top" style="justify-content: end;">
													<div class="small-Idiv" style="margin-left: 16px;"  @click="deleSupplierId(scope.row)">
														<div class="i-div">
															<img src="../../common/images/icon/回收站.png" alt class="operation_img" />
														</div>
														<span style="word-break: keep-all;">删除</span>
													</div>
												</div>-->
										</template>
								</el-table-column>
						</el-table>
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
				<!-- 点击查看大图弹窗 -->
				<el-dialog title :visible.sync="picture" width="34%" center>
      <span>
        <div style="width: 100%;height: 578px;overflow: auto;">
          <img :src="item" alt v-for="item in img" :key="item" class="big_img" />
        </div>
      </span>
						<span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="picture = false" size="small">取 消</el-button>
        <el-button type="primary" @click="picture = false" size="small">确 定</el-button>
      </span>
				</el-dialog>
				<!-- 关联用户 -->
				<!-- 删除 -->
				<el-dialog
						title="删除"
						:visible.sync="dialogDelete"
						width="40%"
				>
						<el-form label-width="100px" size="small">
								<el-form-item label="供应商名称：">
										<span>{{supplier_name}}</span>
								</el-form-item>
								<el-form-item label="处理原因：">
										<el-input
												type="textarea"
												:rows="4"
												placeholder="请输入删除原因"
												v-model="deletereason">
										</el-input>
								</el-form-item>
						</el-form>
						<span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogDelete = false" size="small">取 消</el-button>
        <el-button type="primary" @click="deleSupplierId('',true)" size="small">确 定</el-button>
      </span>
				</el-dialog>
				<!-- 加入黑名单 -->
				<el-dialog
						title="加入黑名单"
						:visible.sync="blackList"
						width="40%"
				>
						<el-form label-width="100px" size="small">
								<el-form-item label="供应商名称：">
										<span>杨小小</span>
								</el-form-item>
								<el-form-item label="处理状态：">
										<el-checkbox v-model="checked">加入黑名单</el-checkbox>
								</el-form-item>
								<el-form-item label="处理原因：">
										<el-input
												type="textarea"
												:rows="4"
												placeholder="请输入加入黑名单原因"
												v-model="reason">
										</el-input>
								</el-form-item>
								<el-form-item label="提交审核：">
										<el-select v-model="value" clearable placeholder="请选择" style="width:300px">
												<el-option
														v-for="item in options"
														:key="item.value"
														:label="item.label"
														:value="item.value">
												</el-option>
										</el-select>
										&nbsp;&nbsp;<el-checkbox v-model="checked">总经理审核</el-checkbox>
								</el-form-item>
						</el-form>
						<span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="blackList = false" size="small">取 消</el-button>
        <el-button type="primary" @click="blackList = false" size="small">确 定</el-button>
      </span>
				</el-dialog>
				<!-- 指派采购员 -->
				<el-dialog title="指定供应商给采购负责人" :visible.sync="dialogVisible" width="30%" >
      <span>
        <div class="user1">
          <el-select v-model="userId" placeholder="请选择采购员" style="display: flex;width:100%" >
            <el-option
								v-for="item in personnel"
								:key="item.sysuserId"
								:label="item.sysuserName"
								:value="item.sysuserId">
            </el-option>
          </el-select>
        </div>
      </span>
						<span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="sysuseridSure" size="small">确 定</el-button>
      </span>
				</el-dialog>
				<!-- 指派采购员 -->
				<!-- 删除 -->
				<!-- <el-dialog
					:title="title"
					:visible.sync="blacklistState"
					width="40%"
					>
					<el-form label-width="100px" size="small">
						<el-form-item label="供应商名称：">
							<span>{{supplierName}}</span>
						</el-form-item>
						<el-form-item label="处理原因：">
								<el-input
							type="textarea"
							:rows="4"
							:placeholder="placeholder"
							v-model="reason">
						</el-input>
						</el-form-item>
					</el-form>
					<span slot="footer.vue" class="dialog-footer.vue">
						<el-button type="danger" @click="blacklistState = false" size="small">取 消</el-button>
						<el-button type="primary" @click="deleSupplierId('',true)" size="small">确 定</el-button>
					</span>
				</el-dialog> -->
				<el-dialog
						title="新增品类"
						:visible.sync="dialogVisible11"
						width="40%"
				>
						<el-form ref="form" :model="form"  label-width="120px" size="small">
								<el-form-item label="选择一级品类:" >
										<el-select v-model="form.people" placeholder="请选择品类">
												<el-option label="刀具" value="0"></el-option>
												<el-option label="电器" value="1"></el-option>
										</el-select>
								</el-form-item>
								<el-form-item label="二级品类名称:" prop="content">
										<el-input v-model="form.people" ></el-input>
								</el-form-item>
						</el-form>
						<span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible11 = false" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogVisible11 = false" size="small">确 定</el-button>
      </span>
				</el-dialog>
		</div>
</template>

<script>
    // import the component
    import Treeselect from "@riophae/vue-treeselect";
    // import the styles
    import "@riophae/vue-treeselect/dist/vue-treeselect.css";
    import {
        getSupplierarchives,
        getCurrentSupplierInfo,
        getStoreList,
        getSupplierbindadmin,
        supplierApplyPostState,
        getSupplierbinduser,
        bindSupplieruser,
        getAlluser,
        deleteantarky
    } from "@/api/supplier/index";
    import { getAllOrganizational,} from "@/api/permissions/index";
    export default {
        data() {
            return {
                supplier_name:'', //供应商名称
                deletereason:'', // 删除原因
                value:'',
                supplierName:'',
                search_type:'',
                // state:'',
                people:'',
                keyword:'',
                dialogDelete:false, //删除
                blackList: false, //黑名单
                checked: true,
                dialogVisible11: false,
                checkList: [],
                form: {

                    current_page: 1,
                    page_size: 10,
                    total_count: 0,
                    keywords: "",
                    people: "",
                    adminId:'',
                    adminName:'',//采购员姓名
                    supplierStatus:0,//供应商状态
                    supplierCategory:"",//品类名字
                },
                radio: '1',
                dialogVisible: false, //指派采购员
                picture: false,
                blacklistState:false, //黑名单
                tableData: [],
                options: [], //采购员数据
                img: [],
                adminId: null, //组织id
                supplierId: "", //供应商id
                userId:'', //采购员ID
                reason:'',//加入黑名单理由
                title:'', //黑名单，删除头部
                placeholder:'',//理由
                state:'', //删除还是黑名单
                personnel:[], //采购员下拉框
            };
        },
        created() {
            this._getSupplierarchives();
            this._getAlluser()
        },
        computed: {},
        components: {
            Treeselect
        },

        methods: {
            deleSupplierId(val,state){
                if(val){
                    this.supplierId = val.supplierId
                    this.dialogDelete = true
                    this.supplier_name = val.supplierName
                }
                if(state){
                    let obj = {}
                    obj.reason = this.deletereason
                    obj.supplierId = this.supplierId
                    deleteantarky(obj).then(res => {
                        if(res.code == 200){
                            this.dialogDelete = false
                            this.$message({
                                message: res.message,
                                type: 'success'
                            });
                            this.deletereason = ''
                            this._getSupplierarchives()
                        }
                    })
                }
            },
            _getAlluser(){
                getAlluser().then(res => {
                    this.personnel = res.data.list
                })
            },
            //指派采购员
            assigned(id){
                this.dialogVisible = true
                this.supplierId = id
            },
            sysuseridSure(){
                if(this.userId ==''){
                    this.$message('请选择采购员');
                }else{
                    bindSupplieruser(this.userId,this.supplierId).then(res => {
                        if(res.code == 200){
                            this.dialogVisible = false
                            this.$message({
                                message: res.message,
                                type: 'success'
                            });
                            this.userId = ''
                        }
                    })
                }
            },
            blacklistSure(){
                supplierApplyPostState(this.supplierId,this.reason,this.state).then(res => {
                    if(res.code == 200){
                        this._getSupplierarchives();
                        this.$message({
                            message: res.message,
                            type: 'success'
                        });
                        this.blacklistState = false
                    }
                })

            },
            transleteData(data, arr, ab) {
                data.forEach(item => {
                    const msg = {
                        id: item.organizeId,
                        label: item.organizeName ? item.organizeName : item.sysuserName,
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
            },
            open(url) {
                this.img = [];
                this.picture = true;
                this.img.push(url);
                console.log(this.img);
            },
            detail(auditId,supplierId,auditStatus,state){
                this.$router.push({ name: "MyFilesDetail", query: { supplierId} });
            },
            editor(id) {
                this.$router.push({ name: "MyFilesEdit", query: { id: id } });
            },
            add() {
                this.$router.push({ name: "SupplierAddfiles" });
            },
            handleSizeChange(val) {
                this.form.page_size = val;
                this._getSupplierarchives();
            },
            handleCurrentChange(val) {
                this.form.current_page = val;
                this._getSupplierarchives();
            },
            _getSupplierarchives(show) {
                getCurrentSupplierInfo().then(res=>{
                    if(res.data&&res.data.length!=0){
                        console.log(res.data)
                        this.tableData.push(res.data);
                    }

                });

                /*if(show){
									this.form.current_page = 1
								}
								getSupplierarchives(this.form).then(res => {
									this.tableData = res.data.list;
									this.form.total_count = res.data.total;
								});*/

            },
            //查看商品
            checkgoods() {
                this.$router.push({name:'SupplierProductList'})
            }
        },
        watch:{
            keyword(newVal){

                if(newVal){
                    this.form.keywords = newVal
                    console.log(this.form.keywords);
                }else{
                    this.form.keywords = ''
                }
            },
            state(newVal){
                if(newVal){
                    this.form.supplierStatus = newVal
                    console.log(this.form.supplierStatus);
                }
            },
            search_type(newVal){
                if(newVal){
                    console.log(newVal);
                    this.form.supplierCategory = newVal
                }
            },
            /* //采购管理员输入框取值
						people(newVal){
							if(newVal){
								this.form.adminName = newVal
								console.log(this.form.adminName);
							}
						}, */
        },
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
				text-align: right;
		}
		.detail {
				font-size: 14px;
				color: #606266;
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
				cursor: pointer;
				display: flex;
				justify-content: space-around;
				margin-left: 11px;
		}
		.small_top {
				margin-top: 10px;
		}
		.big_img {
				width: 100%;
				height: 546px;
		}
		.img_size {
				width: 118px;
				height: 170px;
		}
		.distribution{
				display: flex;
				align-items: center;
				position: relative;
				top: -12px;
		}
		.user1{
				display:flex;
				align-items:center;
		}
</style>
