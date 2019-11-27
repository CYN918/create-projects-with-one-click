<template>
		<div class="margin" style="min-width: 1400px">
				<div class="mcard mbottom">
						<div class="title">搜索条件</div>
						<div>
								<el-form label-width="120px" size="small">
										<el-row>
												<el-col :span="6">
														<el-col>
																<el-form-item label="标题：">
																		<el-col :span="23">
																				<el-input v-model="listQuery.title" placeholder="请输入标题">
																				</el-input>
																		</el-col>
																</el-form-item>
														</el-col>
												</el-col>
												<el-col :span="6">
														<el-col>
																<el-form-item label="特权状态：">
																		<el-select v-model="listQuery.status" placeholder="请选择特权状态" clearable
																							 @change="changeStatus">
																				<el-option
																						v-for="item in statusList"
																						:key="item.value"
																						:label="item.label"
																						:value="item.value">
																				</el-option>
																				<!--																				<el-option label="启用" value="0"></el-option>-->
																				<!--																				<el-option label="禁用" value="1"></el-option>-->
																				<!--																				<el-option label="删除" value="2"></el-option>-->
																		</el-select>
																</el-form-item>
														</el-col>
												</el-col>
												<el-col :span="2" style='text-align: center;'>
														<el-button type="primary" size="small" @click="handelSearch">查询</el-button>
												</el-col>
										</el-row>
								</el-form>
						</div>
				</div>
				<div class="mcard">
						<div class="mbottom">
								<el-button type="primary" size="small" @click="newAdd" style="margin-left:10px" v-permit="'enterprise:add'">新增企业特权</el-button>
<!--								<el-button type="primary" size="small" @click="deleteShowDialog" style="margin-left:10px">删除</el-button>-->
						</div>
						<el-table :data="list" stripe style="width: 100%" border @selection-change="handlepushList">
<!--								<el-table-column type="selection" align="center"></el-table-column>-->
								<el-table-column type="index" label="显示序号" align="center" width="95"></el-table-column>
								<el-table-column label="标题" align="center" prop="title"></el-table-column>
								<el-table-column header-align="center" align="center" prop="logo" label="图片">
										<template slot-scope="scope">
												<div v-if="scope.row.logo">
														<img :src="scope.row.logo" alt="" style="width: 80px;height: 80px">
												</div>
										</template>
								</el-table-column>
								<el-table-column label="内容" align="center" width="295">
										<template slot-scope="scope">
												<div class="Img" v-html="scope.row.content"></div>
										</template>
								</el-table-column>
								<el-table-column label="添加人" align="center" prop="userId"></el-table-column>
								<el-table-column label="链接" align="center" prop="linkUrl"></el-table-column>
								<el-table-column label="添加时间" align="center" prop="createTime"></el-table-column>
								<el-table-column label="备注" align="center" prop="remark"></el-table-column>
								<el-table-column label="阅读量" align="center" prop="readCount"></el-table-column>
								<!--:formatter="formatState"-->
								<el-table-column label="状态" align="center" prop="status">
										<template slot-scope="{row}">
												<el-tag :type="row.status | statusFilter">
														{{ row.status }}
												</el-tag>
										</template>
								</el-table-column>
								<el-table-column label="操作" align="center" min-width="120">
										<template slot-scope="{row}">
												<div class="line-div clearfix">
														<div style="display: flex;justify-content: space-around;align-items: center">
																<!--编辑-->
																<div class="small-Idiv" @click="edit(row)" v-permit="'enterprise:edit'">
																		<div class="i-div">
																				<img src="@/common/images/icon/icon_edit.png" alt="" class="operation_img">
																		</div>
																		<span style="word-break: keep-all;">编辑</span>
																</div>
																<!--详情-->
																<div class="small-Idiv" @click="checkDetail(row.id)" v-permit="'enterprise:detail'">
																		<div class="i-div">
																				<img src="@/common/images/icon/icon_detail.png" alt=""
																						 class="operation_img">
																		</div>
																		<span style="word-break: keep-all;">详情</span>
																</div>
														</div>
														<div style="display: flex;justify-content: space-around;align-items: center">
																<!--启用-->
																<div v-if="row.status!='启用'"  v-cloak>
																		<div class="small-Idiv" @click="changebyStatus(row,'启用')" v-permit="'enterprise:edit'">
																				<div class="i-div huishouzhan">
																						<img src="@/common/images/icon/审核.png" alt="" class="operation_img">
																				</div>
																				<span style="word-break: keep-all;">启用</span>
																		</div>
																</div>
																<!--禁用-->
																<div v-if="row.status!='禁用'"  v-cloak>
																		<div class="small-Idiv" @click="changebyStatus(row,'禁用')" v-permit="'enterprise:edit'">
																				<div class="i-div huishouzhan">
																						<img src="@/common/images/icon/服务授权.png" alt="" class="operation_img">
																				</div>
																				<span style="word-break: keep-all;">禁用</span>
																		</div>
																</div>

																<!--删除-->
																<div v-if="row.status!='删除'"  v-cloak>
																		<div class="small-Idiv" @click="changebyStatus(row,'删除')" v-permit="'enterprise:delete'">
																				<div class="i-div huishouzhan">
																						<img src="@/common/images/icon/icon_delete.png" alt=""
																								 class="operation_img">
																				</div>
																				<span style="word-break: keep-all;">删除</span>
																		</div>
																</div>
														</div>
												</div>
										</template>
								</el-table-column>
						</el-table>
						<div class="pagination">
								<el-pagination
										@size-change="handleSizeChange"
										@current-change="handleCurrentChange"
										:current-page="listQuery.pageIndex"
										:page-sizes="[10, 30, 50, 100]"
										:page-size="listQuery.pageSize"
										layout="total, sizes, prev, pager, next, jumper"
										:total="total"
								></el-pagination>
						</div>


				</div>

				<!-- 删除 -->
				<el-dialog
						title="删除"
						:visible.sync="deleteDialog"
						width="30%"
				>
						<el-form label-width="100px">
								<el-form-item label="删除原因:">
										<el-input v-model="deleteRemark" type="textarea"></el-input>
								</el-form-item>
						</el-form>
						<span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="deleteDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmDelete()" size="small">确 定</el-button>
      </span>
				</el-dialog>
		</div>
</template>
<script>
    import {
        getList,
        deletbyId,
        update
    } from "@/api/mallapp/article/index";

    export default {
        name: 'enterprisePrivilege',
        filters: {
            statusFilter(status) {
                const statusMap = {
                    启用: 'success',
                    禁用: 'info',
                    删除: 'danger'
                }
                return statusMap[status]
            },
        },
        data() {
            return {
                list: null,
                total: 10,
                listQuery: {
                    direction: '',
                    fieldType: 0,
                    title: '',
                    status: '',
                    pageIndex: 1,
                    pageSize: 10,
                },
                statusList: [
                    {
                        value: 0,
                        label: '启用'
                    }, {
                        value: 1,
                        label: '禁用'
                    }, {
                        value: 2,
                        label: '删除'
                    },
                ],

                contentKeywords: '',//关键字
                createTime: '',
                announcementStatus: '',


                pushIdList: [],
                centerDialogVisible: false,
                row: {},
                editorOption: {},
                deleteDialog: false,
                deleteRemark: '',
                reportIds: '',
            }
        },
        created() {
            this.getDataList();
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill;
            },
        },
        methods: {
            //搜索状态
            changeStatus(val) {
                this.listQuery.status = val
                this.getDataList()
            },
            //改变状态
            changebyStatus(row, status) {
                console.log(1223, row, status)
                row.status = status

								/*这里可以直接传row,但会出现闪烁bug,不要转化status的值-异步问题*/
								let obj=JSON.parse(JSON.stringify(row))
								if(status == '启用'){
								    obj.status=0
								}else if (status == '禁用'){
                    obj.status=1
								}else if (status == '删除'){
                    obj.status=2
								}
                //提交
                update(obj).then(res => {
                    if (res.code == 200) {
                        if (status == '启用') {
                            this.$message.success('启用成功')
                        } else if (status == '禁用') {
                            this.$message.success('禁用成功')
                        } else if (status == '删除') {
                            this.$message.success('删除成功')
                        }
                        // this.getDataList()
                    }
                })
            },
            //获取数据
            getDataList() {
                getList(this.listQuery).then(res => {
                    if (res.code === 200) {
                        console.log(111, res.data)
                        this.list = res.data.content;
                        this.listQuery.pageIndex = res.data.pageable.pageNumber;
                        this.listQuery.pageSize = res.data.pageable.pageSize;
                        this.total = res.data.totalElements;
                        this.list.forEach(item => {
                            if (item.status == 0) {
                                item.status = '启用'
                            } else if (item.status == 1) {
                                item.status = '禁用'
                            } else if (item.status == 2) {
                                item.status = '删除'
                            }
                        })
                    }
                })
            },


            handlepushList(val) {
                this.pushIdList = val
            },
            /*formatState(row, column, cellValue) {
								if (cellValue == "0") {
										return '删除';
								} else if (cellValue == "1") {
										return '启动';
								} else if (cellValue == "2") {
										return '禁用';
								}
						},*/
            onEditorReady(editor) { // 准备编辑器

            },
            onEditorBlur() {
            },
            // 失去焦点事件
            onEditorFocus() {
            },
            // 获得焦点事件
            onEditorChange() {
            },
            // 内容改变事件
            handlecreateTime() {

            },
            //条件搜索
            async handelSearch() {
                this.getDataList();
            },
            //新增公告
            newAdd() {
                this.$router.push({name: "privilegeAddEdit"});
            },
            //删除公告
            deleteShowDialog() {
                if (this.pushIdList.length <= 0) return this.$message("请选择删除的公告")
                let pushIds = []
                this.pushIdList.forEach(item => {
                    pushIds.push(item.id)
                })
                this.$confirm('是否删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const res = await announcementDelete(pushIds)
                    if (res.code === 200) {
                        this.getDataList();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }
                    this.getDataList();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val
                this.getDataList();
            },
            handleCurrentChange(val) {
                // console.log(val)
                this.listQuery.pageIndex = val
                this.getDataList();
            },
            // 编辑
            edit(row) {
                this.$router.push({name: "privilegeAddEdit", query: {id: row.id}});
            },
            //详情
            checkDetail(id) {
                this.$router.push({name: "privilegeDetail", query: {id: id}});
            },

            //禁用
            async getOperateContractId(row) {
                this.$confirm('是否禁用?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const param = {
                        "content": row.content,
                        "id": row.id,
                        "jumpUrl": row.jumpUrl,
                        "sortOrder": row.sortOrder,
                        "status": 2,
                        "title": row.title,
                        "type": 1
                    };
                    announcementUpdate(param)
                        .then(res => {
                            if (res.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '禁用成功!'
                                });
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: '禁用失敗!'
                                });
                            }
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消禁用'
                    });
                });
            },
            //删除
            showDeleteDialog(id) {
                this.reportIds = id;
                this.deleteRemark = '';
                this.deleteDialog = true;
            },
            confirmDelete() {
                deletbyId(this.reportIds).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        });
                        this.deleteDialog = false
                        this.getDataList();
                    }
                })
                this.deleteDialog = false;
            }
        },
    }
</script>
<style scoped>
		.small-Idiv {
				width: 25%;
				float: left;
		}

		.margin >>> .ql-blank, .margin >>> .ql-editor {
				height: 400px;
		}

		.Img >>> img {
				width: 100px;
		}
		[v-cloak] {
				display: none;
		}
</style>
