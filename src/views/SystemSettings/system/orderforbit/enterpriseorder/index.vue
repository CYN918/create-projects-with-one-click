<template>
	<div class="margin">
		<div class="mbottom" style="margin-bottom: 0">
			<div class="goods-fitter">
				<div class="search-wrapper">
					<h4 class="title">订单拦截配置</h4>
					<div class="mcard">
						<el-row :gutter="10">
							<el-col :span="6" style="display: flex">
								<div style="margin-right: 20px">拦截是否生效:</div>
								<el-radio-group v-model="radio1" @change="changeList1($event)">
									<el-radio :label="1">关闭</el-radio>
									<el-radio :label="2">开启</el-radio>
								</el-radio-group>
							</el-col>
							<el-col :span="6" style="display: flex" v-if="isShow">
								<div style="margin-right: 20px">配置拦截类型:</div>
								<el-radio-group v-model="radio2" @change="changeList2($event)">
									<el-radio :label="1">多重配置</el-radio>
									<el-radio :label="2">单项配置</el-radio>
								</el-radio-group>
								<!--<el-radio v-model="radio2" label="1"></el-radio>
								<el-radio v-model="radio2" label="2"></el-radio>-->
							</el-col>
						</el-row>
					</div>
					<div class="mcard" style="height: 100%">
						<el-row :gutter="10" v-if="showItem&&isShow">
							<el-col :span="6">
								<el-button type="primary" size="small" @click="addData">新增</el-button>
							</el-col>
						</el-row>
						<ul class="ul_css" v-if="showItem&&isShow">
							<li v-for="(item,index) in dataList" class="li_css">
								<div style="display: flex;flex:1;align-items: center">
									<span style="margin-right: 5px">单品价格区间 :</span>
									<el-input v-model="item.lowestPrice" size="mini" style="width:78px"></el-input>
									至
									<el-input v-model="item.highestPrice" size="mini" style="width:78px"></el-input>
								</div>
								<div style="display: flex;flex:1;align-items: center;margin-left: -60px">
									<span style="margin-right: 5px">商品数量 :</span>
									<el-input v-model="item.quantity" size="mini" style="width:78px"></el-input>
								</div>
								<i class="el-icon-delete" style="cursor: pointer;" @click="deleteDiv(index,item,dataList)"></i>
							</li>
						</ul>
						<ul class="ul_css" v-if="!showItem&&isShow">
							<li class="li_css">
								<div style="display: flex;flex:1;align-items: center;margin-right: 39px">
									<span style="margin-right: 5px">单品价格区间 :</span>
									<el-input v-model="dataList2.lowestPrice" size="mini" style="width:78px"></el-input>
								</div>
								<div style="display: flex;flex:1;align-items: center">
									<span style="margin-right: 5px">商品数量 :</span>
									<el-input v-model="dataList2.quantity" size="mini" style="width:78px"></el-input>
								</div>
							</li>
						</ul>
						<el-row :gutter="10" style="margin-top: 30px">
							<el-col :span="24" style="display: flex;justify-content: center">
								<el-button type="danger" size="small" @click="cancel" v-permit="'orderintercept:reset'">取消</el-button>
								<el-button type="primary" size="small" @click="submitData" v-permit="'orderintercept:save'">确定</el-button>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
	shutDownSetting,
	savaSetting,
	findBySetting
	} from "@/api/systemsettings/index";
    export default {
        data() {
            return {
                radio1: 2,
                radio2: '',
                dataList: [
                    {
                        lowestPrice: '',
                        highestPrice: '',
                        quantity: '',
                    }
                ],//数据源
                showItem: true,
                dataList2:
                    {
                        lowestPrice: '',
                        quantity: '',
                    },//新增数据源
				origin_dataList:[],
				isShow: true
            }
        },
        created() {
            this.getDataList(this.radio2);
        },
        methods: {
			//删除
			deleteDiv(index,row,element){
				// console.log(index)
				// console.log(row)
				// console.log(element)
				element.splice(index,1);
			},
            changeList1(event) {
				if(event === 1){
                    this.isShow = false
				}else{
					this.isShow = true
				}
                // console.log(111, event)
            },
            changeList2(event) {
                // console.log(222, event)
                if (event === 1) {
					this.showItem = true
					this.getDataList(event);
                } else {
					this.showItem = false
					this.getDataList(event);
                }
            },
			//获取列表数据
            getDataList(event) {
				findBySetting(event).then(res => {
					if(res.code == 200){
						if(res.data != null){
							this.dataList = res.data.details;
							this.radio2 = res.data.startType;
							if(event === 1){
								this.showItem = true
							}else{
								this.showItem = false
							}
							if(res.data.single != null){
                                this.dataList2 = res.data.single;
							}
							console.log(res.data.single)
						}else{
							this.dataList = [
								{
									lowestPrice: '',
									highestPrice: '',
									quantity: '',
								}
							];

						}
					}
				})
            },
            //新增数据
            addData() {
                this.origin_dataList=Object.assign({},this.dataList)
                var newList={}
                this.dataList.push(newList)
            },
            cancel(){
            //  this.dataList=Object.assign({},this.origin_dataList)
                this.dataList=this.origin_dataList
			},
			//确认提交
            submitData(){
                //提交成功后
				if(this.radio1 == 1){
                    shutDownSetting().then(res => {
						if(res.code == 200){
							this.$message({
								message: res.message,
								type: 'success'
							});
							this.getDataList();
						}
					})
				}else{
					if(this.radio2 == 1){
                        let details = [];
						this.dataList.forEach((item) => {
							// let reg = /^\d+(\.\d+)?$/;
							// let reg1 = /^\+?[1-9][0-9]*$/;
							// var re = new RegExp(reg);
							// var re1 = new RegExp(reg1);
							// console.log(re.test(item.lowestPrice))
							// if(item.lowestPrice == ''){
							// 	this.$message({
							// 		message: '数据为空不能提交',
							// 		type: 'warning'
							// 	});
							// 	return false
							// }
							// if(re.test(item.lowestPrice) == false){
							// 	this.$message({
							// 		message: '只能输入数字和小数',
							// 		type: 'warning'
							// 	});
							// 	return false
							// }
							// if(re.test(item.highestPrice) == false){
							// 	this.$message({
							// 		message: '只能输入数字和小数',
							// 		type: 'warning'
							// 	});
							// 	return false
							// }
							// if(re1.test(item.quantity) == false){
							// 	this.$message({
							// 		message: '只能输入正整数',
							// 		type: 'warning'
							// 	});
							// 	return false
							// }
							// if(item.lowestPrice > item.highestPrice){
							// 	this.$message({
							// 		message: '第一个不能大于第二个',
							// 		type: 'warning'
							// 	});
							// 	return false
							// }
							const obj1 = {
								quantity: item.quantity,
								lowestPrice: item.lowestPrice,
								highestPrice: item.highestPrice,
								status: 1
							}
							details.push(obj1);
							return details
						})
						const obj = {
							startType: this.radio2,
							details: details,
							status: 1
						}
						savaSetting(obj).then(res => {
							if(res.code == 200){
								this.$message({
									message: res.message,
									type: 'success'
								});
								this.getDataList();
							}
						})
					}else{
						let reg = /^\d+(\.\d+)?$/;
						let reg1 = /^\+?[1-9][0-9]*$/;
						var re = new RegExp(reg);
						var re1 = new RegExp(reg1);
						if(re.test(this.dataList2.lowestPrice) == false){
							this.$message({
								message: '只能输入数字和小数',
								type: 'warning'
							});
							return false
						}
						if(re1.test(this.dataList2.quantity) == false){
							this.$message({
								message: '只能输入正整数',
								type: 'warning'
							});
							return false
						}
						const obj = {
							startType: this.radio2,
							single: {
								quantity: this.dataList2.quantity,
                                lowestPrice: this.dataList2.lowestPrice
							},
							status: 1
						}
						savaSetting(obj).then(res => {
							if(res.code == 200){
								this.$message({
									message: res.message,
									type: 'success'
								});
								this.getDataList();
							}
						})
					}

				}
			}
        }
    }
</script>

<style lang="scss" scoped>
	@import "@/common/scss/variable.scss";
	.margin {
		margin-top: 0 !important;
		padding-left: 0 !important;
		border: 1px solid rgba(214, 222, 239, 1);
	}
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
		width: 71px;
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
			/*border: 1px solid rgb(215, 224, 241);*/
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
	.ul_css {
		display: flex;
		flex-wrap: wrap;
		/*justify-content: space-between;*/
	}
	.li_css {
		margin-right: 20px;
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		width: 358px;
		height: 132px;
		background-color: #f7fbff;
		align-items: center;
		justify-content: center;
	}

</style>

