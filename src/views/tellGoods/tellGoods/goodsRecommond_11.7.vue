<template>
		<div class="margin">
				<div class="mbottom">
						<div class="goods-fitter">
								<div class="search-wrapper1">
										<el-page-header @back="back" :content="text"></el-page-header>
								</div>
						</div>
				</div>
				<!--1. 提报商品申请清单-->
				<div class="mbottom">
						<div class="goods-fitter">
								<el-form ref="form" :model="form" label-width="120px" size="small">
										<div class="search-wrapper">
												<h4 class="title">提报商品申请清单</h4>
												<br/>
												<el-row :gutter="10">
														<el-col :span="6">
																<el-form-item label="提报单号:" style="width:70%">
																		{{form.reportSn}}
																</el-form-item>
														</el-col>
														<el-col :span="6">
																<el-form-item label="联系电话:" style="width:70%">
																		{{form.contactPhone}}
																</el-form-item>
														</el-col>
														<el-col :span="6">
																<el-form-item label="申请人员:" style="width:70%">
																		{{form.userName}}
																</el-form-item>
														</el-col>
														<el-col :span="6">
																<el-form-item label="联系人员:" style="width:70%">
																		{{form.contactUser}}
																</el-form-item>
														</el-col>
												</el-row>
												<el-row :gutter="10">
														<el-col :span="6">
																<el-form-item label="公司名称:" style="width:70%">
																		{{form.companyName}}
																</el-form-item>
														</el-col>
														<el-col :span="18">
																<el-form-item label="申请说明:" style="width:90%">
																		{{form.applyDescription}}
																</el-form-item>
														</el-col>
												</el-row>
												<!--表格-->
												<el-table
														ref="tableList"
														:data="multipleTableData"
														:max-height="maxHeight"
														border
														:cell-class-name="tableCellClassName"
														@select.once="handleSelect"
														@select-all.once="handleSelect"
														:row-style="{ height: '72px' }"
														@cell-click="tableMove"
														@selection-change="handleSelectionChange"
														:header-cell-style="getRowClass"
														style="width: 100%">
														<!--														<el-table-column align="center" type="selection" width="55" fixed="left"></el-table-column>-->
														<el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
														<el-table-column style="color:red;" align="center" prop="goodsName" label="商品名称"
																						 width="213">
																<template slot-scope="scope">
																		{{scope.row.goodsName}}
																</template>
														</el-table-column>
														<el-table-column style="color:red;" align="center" prop="goodsNumber" label="商品数量"
																						 width="110px">
																<template slot-scope="scope">
																		{{scope.row.goodsNumber}}
																</template>
														</el-table-column>
														<el-table-column align="center" prop="brand" label="期望品牌">
																<template slot-scope="scope">
																		{{scope.row.brand}}
																</template>
														</el-table-column>
														<el-table-column align="center" label="预算单价">
																<template slot-scope="scope">
																		{{scope.row.lowestPrice+'-'+scope.row.highestPrice}}
																</template>
														</el-table-column>
														<el-table-column align="center" prop="referenceLink" label="参考链接" width="150">
																<template slot-scope="scope">
																		{{scope.row.referenceLink}}
																</template>
														</el-table-column>
														<el-table-column align="center" prop="detailDescription" label=详细描述>
																<template slot-scope="scope">
																		{{scope.row.detailDescription}}
																</template>
														</el-table-column>
												</el-table>
												<div class="pagination" style="text-align: right;padding: 20px 0;">
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
										</div>
								</el-form>
						</div>
				</div>
				<!--2. 添加提报商品清单-->
				<div class="mbottom">
						<div class="goods-fitter">
								<el-form ref="form" :model="form" label-width="120px" size="small">
										<div class="search-wrapper">
												<h4 class="title">供货商商品清单</h4>
												<br/>
												<el-row :gutter="10" style="margin-left: -5px;margin-top: -14px;margin-bottom: 14px;">
														<el-col :span="24">
																<el-button type="primary" size="mini" @click="addGoods()">添加商品</el-button>
														</el-col>
												</el-row>
												<!--表格-->
												<el-table
														ref="tableList"
														:data="multipleTableData2"
														:max-height="maxHeight"
														border
														:cell-class-name="tableCellClassName2"
														@select.once="handleSelect2"
														@select-all.once="handleSelect2"
														:row-style="{ height: '72px' }"
														@cell-click="tableMove2"
														@selection-change="handleSelectionChange2"
														:header-cell-style="getRowClass2"
														style="width: 100%">
														<el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
														<el-table-column style="color:red;" align="center" prop="goodsNumber" label="商品名称"
																						 width="110px">
																<template slot-scope="scope">
																		{{scope.row.goodsNumber}}
																</template>
														</el-table-column>
														<el-table-column align="center" prop="brand" label="品牌">
																<template slot-scope="scope">
																		{{scope.row.brand}}
																</template>
														</el-table-column>
														<el-table-column align="center" label="商城价">
																<template slot-scope="scope">
																		{{scope.row.lowestPrice+'-'+scope.row.highestPrice}}
																</template>
														</el-table-column>
														<el-table-column align="center" label="集采价">
																<template slot-scope="scope">
																		{{scope.row.lowestPrice+'-'+scope.row.highestPrice}}
																</template>
														</el-table-column>
														<el-table-column align="center" prop="brand" label="一件代发价">
																<template slot-scope="scope">
																		{{scope.row.brand}}
																</template>
														</el-table-column>
														<el-table-column align="center" prop="brand" label="运费">
																<template slot-scope="scope">
																		{{scope.row.brand}}
																</template>
														</el-table-column>
														<el-table-column align="center" prop="brand" label="规格">
																<template slot-scope="scope">
																		{{scope.row.brand}}
																</template>
														</el-table-column>
														<el-table-column align="center" prop="brand" label="型号">
																<template slot-scope="scope">
																		{{scope.row.brand}}
																</template>
														</el-table-column>
														<el-table-column align="center" prop="brand" label="SKU">
																<template slot-scope="scope">
																		{{scope.row.brand}}
																</template>
														</el-table-column>
														<el-table-column align="center" label="操作" width="180px">
																<template slot-scope="scope">
																		<div class="small-Idiv" @click="checkDetail(scope.row.id)">
																				<div class="i-div">
																						<img src="@/common/images/icon/icon_detail.png" alt=""
																								 class="operation_img">
																				</div>
																				<span style="word-break: keep-all;">详情</span>
																		</div>
																		<div class="small-Idiv"
																				 @click="deleteRow(scope.$index, multipleTableData2)">
																				<div class="i-div huishouzhan">
																						<img src="@/common/images/icon/icon_delete.png" alt=""
																								 class="operation_img">
																				</div>
																				<span style="word-break: keep-all;">删除</span>
																		</div>
																</template>
														</el-table-column>
												</el-table>
												<div class="pagination" style="text-align: right;padding: 20px 0;">
														<el-pagination
																@size-change="handleSizeChange2"
																@current-change="handleCurrentChange2"
																:current-page="listQuery2.pageIndex"
																:page-sizes="[10, 30, 50, 100]"
																:page-size="listQuery2.pageSize"
																layout="total, sizes, prev, pager, next, jumper"
																:total="total2">
														</el-pagination>
												</div>
										</div>
								</el-form>
						</div>
				</div>
				<!-- 删除 -->
				<el-dialog
						title="删除"
						:visible.sync="deleteDialog"
						width="30%"
				>
						<el-form :model="form2" label-width="100px">
								<el-form-item label="删除原因:">
										<el-input v-model="form2.deleteRemark" type="textarea"></el-input>
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
    import {get_show_goods, get_show_goods2, getDetailGoods} from '@/api/tellGoods/index'

    export default {
        name: 'indexAddEdit',
        data() {
            return {
                text: " 商品提报 > 商品推荐",
                form: {
                    companyName: '',//公司名称
                    applyDescription: '',//提报要求
                    reportSn: '',//提报单号
                    userId: '',
                    contactPhone: '',//联系电话
                    userName: '',//申请人员
                    contactUser: '',//联系人员
                    department: '',//部门
                    expirationTime: '',//提报截止时间
                    reportNum: '',
                    goodsList: []
                },
                multipleTableData: [],//表格数据源
                multipleTableData2: [],//表格数据源
                maxHeight: 500,
                userId: '',
                reportId: '',
                listQuery: {
                    reportId: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                pageSizes: [10, 20, 50, 100],//页容量选择
                total: 10,//总条数

                listQuery2: {
                    reportId: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                total2: 10,//总条数
                deleteDialog: false,
                form2: {
                    deleteRemark: ''
                },
            }
        },
        created() {
            // this.userId = JSON.parse(getCookie('userData')).userId;
            // this.type = this.$route.query.type
            if (this.$route.query.reportId) {
                this.reportId = this.$route.query.reportId
                this.listQuery.reportId = this.$route.query.reportId
                this.listQuery2.reportId = this.$route.query.reportId
            }
            this.addEdit()
        },
        methods: {
            //获取详情
            addEdit() {
                let obj = {}
                obj.reportId = this.reportId
                getDetailGoods(obj)
                    .then(res => {
                        console.log(333, res.data)
                        this.form = res.data
                        // this.form.goodsList = res.data.needGoodsList
                        // delete this.form.goodList

                        // this.multipleTableData = [...this.form.goodsList]
                        // console.log(111, this.multipleTableData)

                        this.getDownData()
                        this.getDownData2()
                    })
            },
            getDownData() {
                //2.获取下部提报单商品详情
                get_show_goods(this.listQuery)
                    .then(res => {
                        this.listQuery.pageIndex = res.data.page.pageIndex
                        this.listQuery.pageSize = res.data.page.pageSize
                        this.total = res.data.page.total
                        this.form.goodsList = res.data.pageList
                        this.form.goodsList = this.form.goodsList.map(v => {
                            this.$set(v, 'oldNumber', v.goodsNumber)
                            return v
                        })
                        this.multipleTableData = [...this.form.goodsList]

                        console.log(111, this.multipleTableData)
                    })
            },
            //--------------上面---------------------
            //页容量改变
            handleSizeChange(val) {
                this.listQuery.pageSize = val
                this.getDownData()
            },
            // 当前页改变
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.listQuery.pageIndex = val
                this.getDownData()
            },

            //------------------下面-------------------
            //下面表格数据
            getDownData2() {
                get_show_goods2(this.listQuery2)
                    .then(res => {
                        this.listQuery2.pageIndex = res.data.page.pageIndex
                        this.listQuery2.pageSize = res.data.page.pageSize
                        this.total2 = res.data.page.total
                        // this.form.goodsList = res.data.pageList
                        // this.form.goodsList = this.form.goodsList.map(v => {
                        //     this.$set(v, 'oldNumber', v.goodsNumber)
                        //     return v
                        // })
                        // this.multipleTableData2 = [...this.form.goodsList]
                        this.multipleTableData2 = [...res.data.pageList]

                        console.log(111, this.multipleTableData2)
                    })
            },
            //展开添加商品对话框
						addGoods(){

						},
            //查看详情??
            checkDetail() {

            },
            //删除
            deleteRow(index, rows) {
                this.$confirm('是否确定移除此行', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                    .then(async () => {
                        //删除请求

                        rows.splice(index, 1);
                        this.$message({type: 'success', message: '删除成功'})
                    })
            },

            //展开删除对话框

            //确认删除
            confirmDelete(){

            },
            //页容量改变
            handleSizeChange2(val) {
                this.listQuery2.pageSize = val
                this.getDownData2()
            },
            // 当前页改变
            handleCurrentChange2(val) {
                console.log(`当前页: ${val}`);
                this.listQuery2.pageIndex = val
                this.getDownData2()
            },

            tableCellClassName({row, column, rowIndex, columnIndex}) { // 注意这里是解构
                // 利用单元格的 className 的回调方法，给行列索引赋值
                row.index = rowIndex;
                column.index = columnIndex;
            },
            tableMove(row, column, cell, event) {
                const i = column.index // 9 13 17 21
                if (i >= 9 && (i - 9) % 4 === 0) {
                    this.$refs.tableList.bodyWrapper.scrollLeft = cell.offsetLeft
                }
            },
            // 获取选中的所有行 array
            handleSelectionChange(val) {
                if (val.length > 0) { // 表示有被选中的列
                    this.$store.commit('handleShippingAddressParams', val)
                } else {
                    this.$store.commit('handleShippingAddressParams', [])
                }
            },
            // 选中提示
            handleSelect() {
                if (this.isPopup) {
                    return
                }
                this.isPopup = true
                this.$alert('批量操作', '温馨提示', {
                    confirmButtonText: '确定',
                })
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'color:#939399;font-family:MicrosoftYaHei;font-weight:400;background:#f7faff;';
                }
                return '';
            },
						tableCellClassName2({row, column, rowIndex, columnIndex}) { // 注意这里是解构
                // 利用单元格的 className 的回调方法，给行列索引赋值
                row.index = rowIndex;
                column.index = columnIndex;
            },
            tableMove2(row, column, cell, event) {
                const i = column.index // 9 13 17 21
                if (i >= 9 && (i - 9) % 4 === 0) {
                    this.$refs.tableList.bodyWrapper.scrollLeft = cell.offsetLeft
                }
            },
            // 获取选中的所有行 array
            handleSelectionChange2(val) {
                if (val.length > 0) { // 表示有被选中的列
                    this.$store.commit('handleShippingAddressParams', val)
                } else {
                    this.$store.commit('handleShippingAddressParams', [])
                }
            },
            // 选中提示
            handleSelect2() {
                if (this.isPopup) {
                    return
                }
                this.isPopup = true
                this.$alert('批量操作', '温馨提示', {
                    confirmButtonText: '确定',
                })
            },
            getRowClass2({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'color:#939399;font-family:MicrosoftYaHei;font-weight:400;background:#f7faff;';
                }
                return '';
            },
            //返回上一步
            back() {
                this.$router.go(-1);
            },
        }
    }
</script>


<style lang="scss" scoped>
		@import "@/common/scss/variable.scss";

		.goods-fitter {
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
						max-width: 130px;
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

		.dialog-footer {
				margin-top: 20px;
				text-align: right;
		}

		.btn {
				margin-left: 20px;
		}

		.introduce {
				color: #97999f;
				font-size: 90%;
		}

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
				width: 80px;
				height: 80px;
				line-height: 178px;
				text-align: center;
		}

		.avatar {
				width: 80px;
				height: 80px;
				// display: block;
		}

		.upload {
				position: absolute;
				margin-left: 60px;
				margin-top: 45px;
		}

		.tip {
				color: #c5c6cb;
		}

		.btn {
				margin-left: 42%;
				margin-top: 10px;
		}

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
				width: 178px;
				height: 178px;
				line-height: 178px;
				text-align: center;
		}

		.avatar {
				width: 178px;
				height: 178px;
				display: block;
		}

		.small-Idiv {
				float: left;
				margin: 5px 4px;
				cursor: pointer;
				width: 71px;
		}
</style>
