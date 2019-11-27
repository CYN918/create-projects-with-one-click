<template>
		<div class="margin">
				<div class="mbottom">
						<div class="goods-fitter">
								<div class="search-wrapper1">
										<el-page-header @back="back" :content="text"></el-page-header>
								</div>
						</div>
				</div>
				<div class="mbottom">
						<div class="goods-fitter">
								<el-form ref="form" :model="form" label-width="120px" size="small">
										<div class="search-wrapper">
												<h4 class="title">提报商品申请清单</h4>
												<br/>
												<el-row :gutter="10">
														<el-col :span="6">
																<el-form-item label="提报单号:">
																		<el-input v-model="form.reportSn" style="width:70%"
																							placeholder="请输入提报单号"></el-input>
																</el-form-item>
														</el-col>
														<el-col :span="6">
																<el-form-item label="联系电话:">
																		<el-input v-model="form.contactPhone" style="width:70%"
																							placeholder="请输入联系电话"></el-input>
																</el-form-item>
														</el-col>
														<el-col :span="6">
																<el-form-item label="申请人员:">
																		<el-input v-model="form.userName" placeholder="请输入申请人员"
																							style="width:70%"></el-input>
																</el-form-item>
														</el-col>
														<el-col :span="6">
																<el-form-item label="联系人员:">
																		<el-input :rows="4" v-model="form.contactUser" style="width:70%"
																							placeholder="请输入联系人员"></el-input>
																</el-form-item>
														</el-col>
												</el-row>
												<el-row :gutter="10">
														<el-col :span="6">
																<el-form-item label="公司名称:">
																		<el-input v-model="form.companyName" style="width:70%"
																							placeholder="请输入公司名称"></el-input>
																</el-form-item>
														</el-col>
														<el-col :span="6">
																<el-form-item label="申请说明:">
																		<el-input v-model="form.applyDescription" style="width:70%"
																							placeholder="请输入申请说明"></el-input>
																</el-form-item>
														</el-col>
														<el-col :span="6">
																<el-form-item label="部门:">
																		<el-input v-model="form.department" style="width:70%"
																							placeholder="请输入部门"></el-input>
																</el-form-item>
														</el-col>
														<el-col :span="6">
																<el-form-item label="提报截止时间:">
																		<el-date-picker
																				v-model="form.expirationTime"
																				type="datetime"
																				placeholder="选择日期时间"
																				value-format="yyyy-MM-dd HH:mm:ss"
																				style="width:70%">
																		</el-date-picker>
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
														<!--<el-table-column align="center" type="selection" width="55" fixed="left"></el-table-column>-->
														<el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
														<el-table-column style="color:red;" align="center" prop="goodsName" label="商品名称" width="213">
																<template slot-scope="scope">
																		<el-input v-model="scope.row.goodsName" size="small"></el-input>
																</template>
														</el-table-column>
														<el-table-column style="color:red;" align="center" prop="goodsNumber" label="商品数量"
																						 width="110px">
																<template slot-scope="scope">
																		<el-input v-model="scope.row.goodsNumber" size="small"></el-input>
																</template>
														</el-table-column>
														<el-table-column align="center" prop="brand" label="期望品牌">
																<template slot-scope="scope">
																		<el-input v-model="scope.row.brand" size="small"></el-input>
																</template>
														</el-table-column>
														<el-table-column align="center" label="预算单价">
																<template slot-scope="scope">
																		<el-input v-model="scope.row.lowestPrice" size="small"
																							style="width: 90px"></el-input>
																		-
																		<el-input v-model="scope.row.highestPrice" size="small"
																							style="width: 90px"></el-input>
																</template>
														</el-table-column>
														<el-table-column align="center" prop="referenceLink" label="参考链接" width="150">
																<template slot-scope="scope">
																		<el-input v-model.number="scope.row.referenceLink" size="small"></el-input>
																</template>
														</el-table-column>
														<el-table-column align="center" prop="detailDescription" label=详细描述>
																<template slot-scope="scope">
																		<el-input v-model="scope.row.detailDescription" size="small"></el-input>
																</template>
														</el-table-column>
														<el-table-column align="center" label="操作" width="120px">
																<template slot-scope="scope">
																		<div class="small-Idiv"
																				 @click="deleteRow(scope.$index, multipleTableData)">
																				<div class="i-div huishouzhan">
																						<img src="@/common/images/icon/icon_delete.png" alt=""
																								 class="operation_img">
																				</div>
																				<span style="word-break: keep-all;">删除</span>
																		</div>
																</template>
														</el-table-column>
												</el-table>
												<el-pagination
														@size-change="handleSizeChange"
														@current-change="handleCurrentChange"
														:current-page="listQuery.pageIndex"
														:page-sizes="pageSizes"
														:page-size="listQuery.pageSize"
														layout="total, sizes, prev, pager, next, jumper"
														:total="total"
														style="display: flex;justify-content: flex-end">
												</el-pagination>
												<div
														style="height: 50px;background-color: #f0f4fa;text-align: center;color: #6897f4;line-height: 50px">
														<div style="display: flex;justify-content: center" @click="add">
																<i class="el-icon-circle-plus-outline"
																	 style="font-size: 23px;margin-top: 12px;margin-right: 10px"></i>
																<span>新增提报商品</span>
														</div>

												</div>
										</div>
								</el-form>
						</div>
				</div>
				<!--提交-->
				<div class="mbottom">
						<div class="goods-fitter">
								<div class="btn">
										<el-button type="danger" @click="reset" size="small">重置</el-button>
										<el-button type="primary" @click="submit" size="small">确定</el-button>
								</div>
						</div>
				</div>
		</div>
</template>

<script>
    import {addTellGoods, editTellGoods, get_show_goods, getDetailGoods} from '@/api/tellGoods/index'

    export default {
        name: 'indexAddEdit',
        data() {
            return {
                text: "提报列表 > 提报商品 > 新增",
                form: {
                    companyName: '',//公司名称
                    applyDescription: '',//提报要求
                    reportSn: '',//提报单号
                    contactPhone: '',//联系电话
                    userName: '',//申请人员
                    contactUser: '',//联系人员
                    department: '',//部门
                    expirationTime: '',//提报截止时间
                    goodsList: [],
                    deleteList: [],//删除列表
                    userId: '',
                    reportNum: '',//数量
                },
                multipleTableData: [],//表格数据源
                maxHeight: 500,
                userId: '',
                type: '',
                reportId: '',

                listQuery: {
                    reportId: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                pageSizes: [10, 20, 50, 100],//页容量选择
                total: 10,//总条数
                newDeleteList: [],
            }
        },
        created() {
            // this.userId = JSON.parse(getCookie('userData')).userId;
            this.type = this.$route.query.type
            if (this.$route.query.reportId) {
                this.reportId = this.$route.query.reportId
                this.listQuery.reportId = this.$route.query.reportId
                this.text = "提报列表 > 提报商品 > 编辑"
            }
            this.addEdit()
        },
        methods: {
            //判斷新增还是编辑
            addEdit() {
                console.log(8988, this.type)
                //编辑
                if (this.type == 2) {
                    let obj = {}
                    //传id值
                    obj.reportId = this.reportId
                    getDetailGoods(obj)
                        .then(res => {
                            console.log(333, res.data)
                            this.form = res.data
                            // this.form.goodsList = res.data.needGoodsList
                            // delete this.form.goodList
                            //
                            // this.multipleTableData = [...this.form.goodsList]
                            // console.log(111, this.multipleTableData)
                        })
                    this.getshow_goods()
                }
            },
            //编辑/详情获取申请商品信息
            getshow_goods() {
                get_show_goods(this.listQuery).then(res => {
                    if (res.code == 200) {
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
                    }
                })
            },
            //新增行
            add() {
                this.addLine()
            },
            //加行
            addLine() {
                console.log(444, this.form)
                const newValue = {}
                this.multipleTableData.push(newValue);
                console.log(666, this.multipleTableData)
            },
            //保存提交
            async submit() {
                const multipleAddArr = []
                let flag = 0
                console.log(777, this.multipleTableData)
                this.multipleTableData.forEach(async (item, index) => {
                    multipleAddArr.push({
                        brand: item.brand,
                        detailDescription: item.detailDescription,
                        goodsName: item.goodsName,
                        highestPrice: item.highestPrice,
                        lowestPrice: item.lowestPrice,
                        referenceLink: item.referenceLink,
                        goodsNumber: item.goodsNumber,
                        reportDetailId: item.reportDetailId,
                        reportId: this.reportId,
                        createTime: item.createTime,
                        serialNumber: index + 1,
                        oldNumber: item.oldNumber,//旧数量
                    })
                })
                if (flag !== 0) {
                    throttleTipPop(this, 'error', `第${flag}行有数据为空，请填写完整信息再保存`)
                    return false
                }
                console.log(888, multipleAddArr)
                this.form.goodsList = [...multipleAddArr]
                if (this.type == 1) {
                    delete this.form.userId
                    delete this.form.reportNum
                    delete this.form.deleteList
                    this.form.goodsList.forEach(item => {
                        delete item.oldNumber
                    })
                    const res = await addTellGoods(this.form)
                    if (res.code === 200) {
                        this.$router.push({path: '/tellGoods/index'})
                        this.$message.success('新增成功')
                    }
                } else {
                    this.form.deleteList = [...this.newDeleteList]
                    let obj = {}
                    obj.userId = this.userId
                    obj.reportId = this.reportId
                    obj.applyDescription = this.form.applyDescription
                    obj.contactPhone = this.form.contactPhone
                    obj.reportSn = this.form.reportSn
                    obj.userName = this.form.userName
                    obj.companyName = this.form.companyName
                    obj.contactUser = this.form.contactUser
                    obj.department = this.form.department
                    obj.expirationTime = this.form.expirationTime
                    obj.reportNum = this.form.reportNum
                    obj.goodsList = this.form.goodsList
                    obj.deleteList = this.form.deleteList

                    const res = await editTellGoods(obj)
                    if (res.code === 200) {
                        this.$router.push({path: '/tellGoods/index'})
                        this.$message.success('编辑成功')
                    }
                }
            },
            //重置
            reset() {
                this.form = {
                    companyName: '',//公司名称
                    applyDescription: '',//提报要求
                    reportSn: '',//提报单号
                    contactPhone: '',//联系电话
                    userName: '',//申请人员
                    contactUser: '',//联系人员
                    department: '',//部门
                    expirationTime: '',//提报截止时间
                }
                this.multipleTableData = []
            },
            // 删除行
            deleteRow(index, rows) {
                this.$confirm('是否确定移除此行', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                    .then(async () => {
                        this.newDeleteList.push({
                            reportDetailId: rows[index].reportDetailId,
                            goodsNumber: rows[index].goodsNumber
                        })

                        rows.splice(index, 1);
                        this.$message({type: 'success', message: '删除成功'})
                    })
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
            //返回上一步
            back() {
                this.$router.go(-1);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.listQuery.pageSize = val
                this.getshow_goods()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.listQuery.pageIndex = val
                this.getshow_goods()
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
</style>
