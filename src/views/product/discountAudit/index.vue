<template>
	<div class="margin">
		<div class="mbottom">
			<div class="goods-fitter">
				<el-form label-width="100px" size="small">
					<div class="search-wrapper">
						<h4 class="title">搜索条件</h4>
						<div class="search-base">
                            <el-row>
								<el-col :span="5">
								<el-col>
									<el-form-item label="审核状态：">
										<el-col :span="22">
											<el-select v-model="carId1" placeholder="请选择" @change="carIdFunc($event,1)">
											<el-option
												v-for="item in options"
												:key="item.value"
												:label="item.label"
												:value="item.value">
											</el-option>
											</el-select>
										</el-col>
									</el-form-item>
								</el-col>
								</el-col>
								<el-col :span="5">
								<el-col>
									<el-form-item label="关键字：">
										<el-col :span="10">
											<el-input v-model="companyName" placeholder="请输入关键字"></el-input>
										</el-col>
									</el-form-item>
								</el-col>
								</el-col>
								<!-- <el-col :span="5">
								<el-col>
									<el-form-item label="部门：">
										<el-col :span="10">
											<el-input v-model="department" placeholder="请输入内容"></el-input>
										</el-col>
									</el-form-item>
								</el-col>
								</el-col> -->
								<el-col :span="1" class="btn_right">
									<el-button type="primary" size="small"  @click='_getCatagory(true)'>搜索</el-button>
								</el-col>
							</el-row>
						</div>
					</div>
				</el-form>
			</div>
		</div>
		<div class="mcard">		
			<el-table :data="list" border style="width: 100%" stripe>
				<el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
				<el-table-column prop="formData.companyName" label="公司名称" align="center"></el-table-column>
				<el-table-column prop="formData.department" label="部门" align="center"></el-table-column>
				<el-table-column prop="formData.userName" label="申请用户" align="center"></el-table-column>
				<el-table-column prop="formData.contactPhone" label="手机号码" align="center"></el-table-column>
				<el-table-column prop="formData.discountType" label="申请类型" align="center" :formatter="formatState"></el-table-column>
				<el-table-column prop="formData.remark" label="申请原因" align="center"></el-table-column>
				<el-table-column prop="formData.discountRate" label="申请折扣率" align="center"></el-table-column>
				<el-table-column prop="createTime" label="申请时间" align="center"></el-table-column>
				<el-table-column prop="formData.auditPlan" label="审核状态" align="center" :formatter="formatReportPlan"></el-table-column>
				<el-table-column label="审核理由" align="center">
					<template slot-scope="scope">
						<div class="txt_left" v-for="item in scope.row.auditTasks" style="text-align: center">
						{{item.taskComment}}
						</div>
					</template>
				</el-table-column>
				<el-table-column label="进度表" align="center">
					<template slot-scope="scope">
						<div class="txt_left" v-for="item in scope.row.auditTasks" style="text-align: center">
						{{item.userName}}:{{item.taskResult==0?'待审核':''||item.taskResult==1?'已通过':''||item.taskResult==2?'未通过':''}}
						</div>
						<div @click="schedule(scope.row)" class="schedule el-button el-button--primary el-button--small">
						进度表
						</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" fixed="right" width="190px">
					<template slot-scope="scope">
						<div style="display: flex;justify-content: space-around">
							<!-- 查看 -->
							<div class="small-Idiv" @click="detail(scope.row.formData.parentId)">
								<div class="i-div">
									<img src="@/common/images/icon/icon_detail.png" alt="" class="operation_img">
								</div>
								<span style="word-break: keep-all;">详情</span>
							</div>
							<!-- 编辑 -->
							<div class="small-Idiv" @click="edit(scope.row)" v-if="scope.row.formData.auditPlan == 1">
								<div class="i-div">
									<img src="@/common/images/icon/icon_edit.png" alt="" class="operation_img">
								</div>
								<span style="word-break: keep-all;">审核</span>
							</div>		
						</div>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination" style="text-align: right;margin-top: 15px;">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="listQuery.pageIndex"
					:page-sizes="[10, 30, 50, 100]"
					:page-size="listQuery.pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total">
				</el-pagination>
			</div>
				

			<!-- 删除 -->
			<el-dialog title="审核" :visible.sync="deleteDialog" width="30%" :before-close="handleClose">
				<el-form label-width="100px">
					<el-form-item label="审核状态:">
						<el-radio v-model="resource" label="1">通过</el-radio>
						<el-radio v-model="resource" label="2">不通过</el-radio>	
					</el-form-item>
					<el-form-item label="理由:">
						<el-input v-model="deleteRemark" type="textarea"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button type="danger" @click="deleteDialog = false" size="small">取 消</el-button>
					<el-button type="primary" @click="confirmDelete()" size="small">确 定</el-button>
				</span>
			</el-dialog>

			<!--查看进度条-->
    <el-dialog
            title="进度表："
            :visible.sync="approvalsShow"
            width="40%"
    >
      <div class="div_big">
        <div class="big_div" v-for="(item,index) in auditTasks" :key="index">
          <div class="big_ball">
            <div class="ball">{{index+1}}</div>
          </div>
          <div class="bor_left">
            <div class="wihte_div"></div>
            <div :class="item.taskResult==0?'blur_div white_color':'blur_div'"></div>
            <div>
              <span>
              <span>{{index==0?'提交':'审核'}}</span>
                <span style="margin: 0 10px">部门：{{item.organizeName}}</span>
                <span style="margin: 0 10px">提交人：{{item.userName}}</span>
                <span style="margin: 0 10px">职位：{{item.roleName}} </span>
              </span>
              <span>
                <!--<el-button type="primary" size="mini" v-if="item.taskResult==0" style="position: absolute;margin-left: 15px;right: 0;margin-top: 10px">加急处理</el-button>-->
              </span>
            </div>
            <div class='div_time' v-if="item.createTime">{{item.createTime}}</div>
            <div style="margin-top: 10px">
              <span class="medium_span">审批结果:{{item.taskResult==0?'待审核':''||item.taskResult==1?'同意':''||item.taskResult==2?'不同意':''}}</span>
              <div style="margin-top:20px "  class="cai_span">
                原因:{{item.taskComment?item.taskComment:'暂无'}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="approvalsShow=false" size="small">关 闭</el-button>
      </span>
    </el-dialog>
				
		</div>
	</div>
</template>

<script>
    import { findDiscountAudit, editDiscountAudit } from "@/api/product/index";
    export default {
        data() {
            return {
				auditTasks:'', //进度表数据
                list: [],//表格数据源
                total: 10,
                listQuery: {
                    pageIndex: 1, // 当前页
                    pageSize: 10, // 每页展示量
                },
				deleteDialog: false,
				deleteRemark: '',
				carId1: '',
				options: [{
					value: '0',
					label: '待审核'
					}, {
					value: '1',
					label: '已通过'
					}, {
					value: '2',
					label: '未通过'
				}],
				companyName: '',
				department: '',
				resource: '1',
				taskId: '',
				approvalsShow: false,
            }
        },
        created() {
			this.getList();
        },
        methods: {
			//查看进度表
			schedule(val){
				this.approvalsShow = true
				this.auditTasks = val.auditTasks
			},
			formatState(row, column, cellValue) {
                if(cellValue == "1"){
	                return '单品折扣';
	            }else if (cellValue == "2"){
	                return '分类折扣';
	            }else if (cellValue == "3"){
					return '全品折扣';
				}
			},
			formatReportPlan(row, column, cellValue){
                if(cellValue == "0"){
	                return '未申请';
	            }else if (cellValue == "1"){
	                return '待审核';
	            }else if (cellValue == "2"){
					return '通过';
				}else if (cellValue == "3"){
					return '未通过';
				}else if (cellValue == "4"){
					return '审核中';
				}
			},
			//弹窗关闭
			handleClose(done) {
				this.$confirm('确认关闭？')
				.then(_ => {
					done();
				})
				.catch(_ => {});
			},
			//搜索按钮
            _getCatagory(){
                this.getList();
			},
            //详情按钮
            detail(id) {
                this.$router.push({name: "discountAuditDetail", query:{id:id}})
            },
            //审核按钮
            edit(row) {
			   let userData = JSON.parse(window.localStorage.getItem("user")).data;
			   row.auditTasks.forEach(element => {
				   if(userData.sysuserId == element.userId){
					   this.taskId = element.taskId;
				   }
			   });
               this.deleteDialog = true; 
			},
			//审核
			confirmDelete(){
				let obj = {
					auditStatus: this.resource,
					taskId: this.taskId,
					verifyRemark: this.deleteRemark
				}
				editDiscountAudit(obj).then(res => {
					if(res.code == 200){
						this.$message({
							message: res.message,
							type: 'success'
						});
						this.getList();
						this.deleteDialog = false; 
					}
				})
			},
           
			//获取数据
			getList() {
                const obj = {
					pageIndex: this.listQuery.pageIndex,
					pageSize: this.listQuery.pageSize,
					auditStatus: this.carId1,
					keyword: this.companyName
				};
				findDiscountAudit(obj)
				.then(res => {
					if(res.code === 200){
						if(res.data.list != null){
                            this.list = res.data.list;
						}	
					}
				})
			},
            //页容量改变
            handleSizeChange(val) {
                this.listQuery.pageSize = val
                this.getList()
            },
            //当前页改变
            handleCurrentChange(val) {
                this.listQuery.pageIndex = val
                this.getList()
            },
        }
    }
</script>

<style scoped>
.downLink{
	width: 104px; 
	height: 34px;
	text-align: center;
	line-height: 34px;
	display: block;
	font-size: 12px;
    border-radius: 3px;
	background: #4C86F4;
	color: #FFF;
}
.mbottom >>> .el-form-item--small{
	width: 560px;
}
</style>
<style lang="scss" scoped>
		@import "@/common/scss/variable.scss";

		.avatar {
				max-width: 300px;
				height: auto;
		}

		.clearfix:after {
				display: block;
				content: '';
				clear: both;
		}

		.clearfix {
				zoom: 1;
		}

		.line-div {
				display: inline-block;
		}

		.small-Idiv {
				float: left;
				margin: 5px 4px;
				cursor: pointer;
				width: 55px;
		}

		/* 搜索条件 */
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
								color: #333;
								padding-left: 20px;
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

</style>
