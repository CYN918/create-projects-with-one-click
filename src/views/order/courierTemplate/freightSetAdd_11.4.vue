<template>
		<div class="margin">
				<div class="mbottom">
						<div class="goods-fitter">
								<el-form label-width="100px" size="small">
										<div class="search-wrapper">
												<h4 class="title">运费设置>新增</h4>
												<div class="search-base">
												</div>
										</div>
								</el-form>
						</div>
				</div>
				<div class="mbottom" style="height: 100%">
						<div class="goods-fitter" style="height: 100%">
								<el-form ref="list" :model="list" label-width="120px" size="small" style="height: 100%">
										<div class="search-wrapper" style="height: 100%">
												<el-form-item label="模板名称:">
														<el-input v-model="list.templateName" size="small" style="width: 480px"></el-input>
												</el-form-item>
												<el-form-item label="商品地址:">
														<div style="display: flex;">
																<el-form-item prop="provinceId">
																		<el-cascader
																				expand-trigger="hover"
																				:options="areaData"
																				v-model="goodsarr"
																				:props="{ value: 'addressId', label: 'addressName',children:'childAddress'}"
																				@change="handleChange">
																		</el-cascader>
																</el-form-item>
														</div>
												</el-form-item>
												<el-form-item label="是否包邮:">
														<el-radio-group v-model="list.freeShipping" @change="changefreeShippingRadio">
																<el-radio :label="0">自定义运费</el-radio>
																<el-radio :label="1">卖家承担运费</el-radio>
														</el-radio-group>
												</el-form-item>
												<el-form-item label="计件方式:">
														<el-radio-group v-model="list.valuationMode" @change="changeRadio">
																<el-radio :label="1">按件数</el-radio>
																<el-radio :label="2">按重量</el-radio>
																<el-radio :label="3">按体积</el-radio>
														</el-radio-group>
												</el-form-item>
												<el-form-item label="运送方式:">
														<div style="display: flex;flex-direction: column;margin-right: 128px">
																<span style="color: #e9ebf0">除指定地区外,其余地区的运费采用"默认运费"</span>
																<!-------------------------1.快递--------------------------------->
																<el-checkbox v-model="checked1" @change="changeTable1($event)">快递</el-checkbox>
																<div class="search-wrapper" style="margin-bottom: 40px;">
																		<div
																				style="display: flex;justify-content: flex-start;background-color: #f3f7fb;height: 62px;align-items: center;margin-bottom: 20px">
																				<el-form-item label="默认运费:" style="margin-bottom: 0">
																						<el-input v-model="defaultfreight1.firstUnit" size="small"
																											style="width: 120px"></el-input>
																						<span>{{newlabel1}}</span>
																				</el-form-item>
																				<el-form-item style="margin-bottom: 0">
																						<div style="display: flex">
																								<el-input v-model="defaultfreight1.firstCharge" size="small"
																													style="width: 80px"></el-input>
																								<span>元</span>
																						</div>
																				</el-form-item>
																				<el-form-item label="每增加:" style="margin-bottom: 0;">
																						<div style="display: flex">
																								<el-input v-model="defaultfreight1.continueUnit" size="small"
																													style="width: 120px"></el-input>
																								<span>{{newlabel2}}</span>
																						</div>
																				</el-form-item>
																				<el-form-item label="增加运费:" style="margin-bottom: 0;">
																						<div style="display: flex">
																								<el-input v-model="defaultfreight1.continuePrice" size="small"
																													style="width: 120px"></el-input>
																								<span>元</span>
																						</div>
																				</el-form-item>
																		</div>
																		<!--表格数据源1-->
																		<el-table :data="list.freightCalculate['1']" border
																							style="width: 100%;margin-bottom: 20px;" stripe>
																				<el-table-column prop="freightAddress" label="运送到" align="center">
																						<template slot-scope="scope">
																								<!--一级省份显示 :indeterminate="isIndeterminate"-->
																								<el-popover trigger="click" placement="bottom-start" width="900">
																										<el-checkbox v-for="(province,index) in scope.row.freightAddress"
																																 v-model="province.isCheck"
																																 @click.prevent.native="handleCheckProvince(province,scope.row)"
																																 style="margin-bottom: 25px;width: 88px;margin-right: 80px"
																																 :indeterminate="province.isIndeterminate">
																												<!--二级城市显示-->
																												<el-popover trigger="hover" placement="right" width="400">
																														<el-checkbox
																																v-for="(city,childIndex) in province.childAddress"
																																:key="childIndex" :value="city.isCheck"
																																@change.prevent.native="handleCheckCity(province,city,scope.row)"
																																style="margin-bottom: 25px;width: 88px;margin-right: 80px">
																																<!--二级城市按钮文字-->
																																{{city.addressName}}
																														</el-checkbox>
																														<div slot="reference" class="name-wrapper">
																																<!--一级城市按钮文字-->
																																<span>{{province.addressName}}</span>
																														</div>
																												</el-popover>
																										</el-checkbox>
																										<div slot="reference" class="name-wrapper">
																												<span>{{scope.row.showCityName}}</span>
																												<el-button type="text" size="small"
																																	 @click="showCheckedArea(scope.row,scope.$index)"
																																	 style="margin-left: 20px">编辑
																												</el-button>
																										</div>
																								</el-popover>
																						</template>
																				</el-table-column>
																				<el-table-column prop="firstUnit" :label="label1" align="center">
																						<template slot-scope="scope">
																								<el-input v-model="scope.row.firstUnit" size="small"></el-input>
																						</template>
																				</el-table-column>
																				<el-table-column prop="firstCharge" :label="label2" align="center">
																						<template slot-scope="scope">
																								<el-input v-model="scope.row.firstCharge" size="small"></el-input>
																						</template>
																				</el-table-column>
																				<el-table-column prop="continueUnit" :label="label3" align="center">
																						<template slot-scope="scope">
																								<el-input v-model="scope.row.continueUnit" size="small"></el-input>
																						</template>
																				</el-table-column>
																				<el-table-column prop="continuePrice" :label="label4" align="center">
																						<template slot-scope="scope">
																								<el-input v-model="scope.row.continuePrice" size="small"></el-input>
																						</template>
																				</el-table-column>
																				<el-table-column label="操作" align="center">
																						<template slot-scope="scope">
																								<el-button type="text" size="small"
																													 @click="deleteRow(scope.$index, list.freightCalculate['1'])">
																										删除
																								</el-button>
																						</template>
																				</el-table-column>
																		</el-table>
																		<div>
																				<el-button type="primary" size="small" @click="add">为指定地区城市设置运费</el-button>
																		</div>
																</div>
																<!--------------------------5.指定条件包邮--------------------------->
																<el-checkbox v-model="checked5" @change="changeTable5($event)">指定条件包邮 可选</el-checkbox>
																<!--表格数据源5-->
																<div class="search-wrapper" style="margin-bottom: 40px">
																		<el-table :data="list.freightFreeShipping" border
																							style="width: 100%;margin-bottom: 20px" stripe>
																				<el-table-column label="选择地区" align="center">
																						<template slot-scope="scope">
																								<!--一级省份显示 :indeterminate="isIndeterminate"-->
																								<el-popover trigger="click" placement="bottom" width="610">
																										<el-checkbox v-for="(province,index) in scope.row.freightAddress"
																																 v-model="province.isCheck"
																																 @click.prevent.native="handleCheckProvince5(province,scope.row,index)"
																																 style="margin-bottom: 20px"
																																 :indeterminate="province.isIndeterminate">
																												<!--二级城市显示-->
																												<el-popover trigger="hover" placement="bottom" width="400">
																														<el-checkbox
																																v-for="(city,childIndex) in province.childAddress"
																																:key="childIndex" :value="city.isCheck"
																																@change.prevent.native="handleCheckCity5(province,city,scope.row,childIndex)">
																																<!--二级城市按钮文字-->
																																{{city.addressName}}
																														</el-checkbox>
																														<div slot="reference" class="name-wrapper">
																																<!--一级城市按钮文字-->
																																<span>{{province.addressName}}</span>
																														</div>
																												</el-popover>
																										</el-checkbox>
																										<div slot="reference" class="name-wrapper">
																												<span>{{scope.row.showCityName}}</span>
																												<el-button type="text" size="small"
																																	 @click="showCheckedArea5(scope.row,scope.$index)"
																																	 style="margin-left: 20px">编辑
																												</el-button>
																										</div>
																								</el-popover>
																						</template>
																				</el-table-column>
																				<el-table-column label="选择包邮类型" align="center">
																						<template slot-scope="scope">
																								<el-select v-model="scope.row.freeShippingType" placeholder="请选择">
																										<el-option
																												v-for="item in optionsList"
																												:key="item.value"
																												:label="item.label"
																												:value="item.value">
																										</el-option>
																								</el-select>
																						</template>
																				</el-table-column>
																				<el-table-column prop="freeShippingPrice" label="设置包邮金额" align="center">
																						<template slot-scope="scope">
																								<el-input v-model="scope.row.freeShippingPrice" size="small"></el-input>
																						</template>
																				</el-table-column>
																				<el-table-column prop="freeShippingNum" label="设置包邮件数" align="center">
																						<template slot-scope="scope">
																								<el-input v-model="scope.row.freeShippingNum" size="small"></el-input>
																						</template>
																				</el-table-column>
																				<el-table-column prop="name" label="操作" align="center">
																						<template slot-scope="scope">
																								<el-button type="text" size="small"
																													 @click="deleteRow5(scope.$index, list.freightFreeShipping)">
																										删除
																								</el-button>
																						</template>
																				</el-table-column>
																		</el-table>
																		<el-button type="primary" size="small" @click="add5">为指定地区城市设置运费</el-button>
																</div>
														</div>
												</el-form-item>

												<div style="display: flex;justify-content: center">
														<el-button type="danger" size="small" @click="back">取消</el-button>
														<el-button type="primary" size="small" @click="submitData(list)">保存并返回</el-button>
												</div>
										</div>
								</el-form>
						</div>
				</div>
		</div>
</template>

<script>
    import {getAllArea, submitfreightSeteditData, submitfreightSetAddData} from "@/api/order/index";

    export default {
        data() {
            return {
                type: '',//新增/编辑类型
                templateId: '',//模板id
                defaultfreight1: {
                    firstUnit: '',//首件
                    firstCharge: '',//首费
                    continueUnit: '',//续件
                    continuePrice: '',//续费
                },//默认运费-必填
                newlabel1: '件内',
                newlabel2: '件',
                label1: '首件(个)',
                label2: '首运费(元)',
                label3: '续件(个)',
                label4: '续费(元)',
                //表格数据源
                list: {
                    conditionFreeShipping: 0,//是否指定条件字段包邮：0-不指定条件包邮;1-指定条件包邮
                    dealerId: 0,//经销商ID
                    freeShipping: '',//是否包邮： 0-不包邮;1-包邮
                    freightCalculate: {
                        "1": [],
                        "2": [],
                        "3": [],
                        "4": [],
                    },//运费计算
                    freightFreeShipping: [],//包邮条件
                    goodsAddress: {
                        addressId: 0,//地址ID
                        addressName: "",//地址名称
                        childAddress: [],
                    },//商品地址
                    merchantId: 0,//商家ID
                    projectId: '0',//项目id
                    templateName: "",//模板名称
                    valuationMode: ''//计价方式;1-按件数;2-按重量;3-按体积
                },
                areaData: [],//地区数据源
                //运送方式数据
                optionsList: [
                    {
                        value: 1,
                        label: '件数'
                    },
                    {
                        value: 2,
                        label: '金额'
                    },
                ],
                isShowAreaModel: false,
                areaIndexArr: [],
                areaNameArr: [],

                userId: '',
                checked1: '',//快递
                checked5: '',//指定条件包邮
                showItem1: false,//显示快递表格
                showItem5: false,//显示指定条件表格
                showWayItem: false,//显示下方所有表格
                selectedArr: [], // 所有选中的数据1
                selectedArr5: [], //所有选中的数据5
                areaArr: [],
                goodsarr: []//表单地区
            }
        },
        created() {
            this.getArea()
            this.getList()
            // this.getUser()
            this.type = this.$route.query.type
        },
        methods: {
            //保存提交
            submitData(data) {
                console.log(1, data)
                //新增
                let obj = JSON.parse(JSON.stringify(this.list))
                console.log(111, obj)
                /*处理表格数据*/
                let table1 = []

                let table5 = []

                if (this.showItem1) {
                    //处理表格1
                    table1 = obj.freightCalculate['1'].map((item) => {
                        const data1 = {
                            continuePrice: item.continuePrice,
                            continueUnit: item.continueUnit,
                            firstCharge: item.firstCharge,
                            firstUnit: item.firstUnit,
                            model: 1,
                            def: 0,
                        }
                        data1.freightAddress = item.freightAddress.map((item2) => {
                            const data2 = {
                                addressId: item2.addressId,
                                addressName: item2.addressName,
                                isCheck: item2.isCheck,
                            }
                            data2.childAddress = item2.childAddress.map((item3) => {
                                return {
                                    addressId: item3.addressId,
                                    addressName: item3.addressName,
                                    isCheck: item3.isCheck
                                }
                            })
                            return data2
                        })
                        return data1
                    })
                    table1.push({
                        firstUnit: this.defaultfreight1.firstUnit,
                        firstCharge: this.defaultfreight1.firstCharge,
                        continueUnit: this.defaultfreight1.continueUnit,
                        continuePrice: this.defaultfreight1.continuePrice,
                        def: 1,
                        model: 1
                    });
                    console.log(222, table1)
                    /*1.处理表格内地址问题*/
                    for (var key in table1) {
                        console.log(12233, key)
                        if (table1[key].freightAddress && table1[key].freightAddress.length > 0) {
                            // const newArr1 = table1[key].freightAddress.filter((item1, index1, array) => item1.isCheck == true)
                            // console.log(111, newArr1)
                            table1[key].freightAddress.forEach(item1 => {
                                if (!item1.isCheck) {
                                    item1.childAddress = item1.childAddress.filter((item2, index2, array) => item2.isCheck == true)
                                }
                            })
                            table1[key].freightAddress = table1[key].freightAddress.filter((item1, index1, array) => item1.childAddress.length != 0)

                            table1[key].freightAddress = table1[key].freightAddress.map(item1 => {
                                const data1 = {
                                    addressId: item1.addressId,
                                    addressName: item1.addressName,
                                }
                                data1.childAddress = item1.childAddress.map((item2) => {
                                    return {
                                        addressId: item2.addressId,
                                        addressName: item2.addressName,
                                    }
                                })
                                return data1
                            })
                            // console.log(table1[0].freightAddress)


                        }
                    }
                    console.log(12345, table1)


                    // console.log(555, item)

                }

                if (this.showItem5) {
                    // 处理表格5
                    table5 = obj.freightFreeShipping.map((item) => {

                        const data1 = {
                            freeShippingNum: item.freeShippingNum,
                            freeShippingPrice: item.freeShippingPrice,
                            freeShippingType: item.freeShippingType,
                        }
                        data1.freightAddress = item.freightAddress.map((item2) => {
                            // console.log(444,item2)
                            const data2 = {
                                addressId: item2.addressId,
                                addressName: item2.addressName,
                                isCheck: item2.isCheck,
                            }
                            data2.childAddress = item2.childAddress.map((item3) => {
                                // console.log(555,item3)
                                return {
                                    addressId: item3.addressId,
                                    addressName: item3.addressName,
                                    isCheck: item3.isCheck,
                                }
                            })
                            return data2
                        })
                        return data1
                    })
                    // console.log(666, table5)
                    /*4.处理表格内地址问题*/
                    for (var key in table5) {
                        // const newArr5 = table5[key].freightAddress.filter((item1, index1, array) => item1.isCheck == true)
                        // console.log(newArr5)
                        if (table5[key].freightAddress && table5[key].freightAddress.length > 0) {
                            table5[key].freightAddress.forEach(item1 => {
                                if (!item1.isCheck) {
                                    item1.childAddress = item1.childAddress.filter((item2, index2, array) => item2.isCheck == true)
                                }
                            })
                            table5[key].freightAddress.forEach(item1 => {
                                if (!item1.isCheck) {
                                    item1.childAddress = item1.childAddress.filter((item2, index2, array) => item2.isCheck == true)
                                }
                            })
                            table5[key].freightAddress = table5[key].freightAddress.filter((item1, index1, array) => item1.childAddress.length != 0)
                            table5[key].freightAddress = table5[key].freightAddress.map(item1 => {
                                const data1 = {
                                    addressId: item1.addressId,
                                    addressName: item1.addressName,
                                }
                                data1.childAddress = item1.childAddress.map((item2) => {
                                    return {
                                        addressId: item2.addressId,
                                        addressName: item2.addressName,
                                    }
                                })
                                return data1
                            })
                        }
                        // console.log(888, table5)
                    }
                }

                obj.freightCalculate = []
                if (table1.length > 0) {
                    obj.freightCalculate = [...obj.freightCalculate, ...table1]
                }
                if (table5.length > 0) {
                    obj.freightFreeShipping = [...table5]
                } else {
                    obj.freightFreeShipping = []
                }
                // console.log(888, obj)

                /*处理表单的地区级联*/
                this.areaArr = JSON.parse(JSON.stringify(this.goodsarr))
                this.list.goodsAddress = {}
                this.list.goodsAddress.childAddress = []
                this.areaData.forEach(item => {
                    if (item.addressId == this.areaArr[0]) {
                        this.list.goodsAddress.addressId = item.addressId
                        this.list.goodsAddress.addressName = item.addressName
                    }
                    item.childAddress.forEach(item2 => {
                        if (item2.addressId == this.areaArr[1]) {
                            this.list.goodsAddress.childAddress.push({
                                addressId: item2.addressId,
                                addressName: item2.addressName
                            })
                        }
                    })
                })
                obj.goodsAddress = {}
                obj.goodsAddress.addressId = this.list.goodsAddress.addressId
                obj.goodsAddress.addressName = this.list.goodsAddress.addressName
                obj.goodsAddress.childAddress = this.list.goodsAddress.childAddress

                console.log(111, obj)
                //新增
                submitfreightSetAddData(obj).then(res => {
                    if (res.code == 200) {
                        this.$message.success('新增成功')
                        this.$router.push({name: 'freightSet'})
                    }
                })


            },
            //获取全部省市
            getArea() {
                getAllArea().then(res => {
                    if (res.code == 200) {
                        this.areaData = res.data
                        //处理value和label
                        this.areaData = JSON.parse(JSON.stringify(this.areaData).replace(/id/g, 'addressId'))
                        this.areaData = JSON.parse(JSON.stringify(this.areaData).replace(/regionName/g, 'addressName'))
                        this.areaData = JSON.parse(JSON.stringify(this.areaData).replace(/childRegion/g, 'childAddress'))
                        this.areaData.map(v => {
                            this.$set(v, 'isCheck', false)
                            v.childAddress.map(u => {
                                this.$set(u, 'isCheck', false)
                                delete u.childAddress
                                return u
                            })
                            return v
                        })
                    }
                })
            },
            //获取当前用户id
            getUser() {
                var userData = JSON.parse(localStorage.getItem("user"));
                this.userId = userData.data.sysuserId
            },
            getList() {
                for (var i in this.list.freightCalculate) {
                    this.list.freightCalculate[i] = this.list.freightCalculate[i].map(v => {
                        this.$set(v, 'showCityName', '')
                        this.$set(v, 'origin_list', this.areaData)
                        this.$set(v, 'rowSelectArr', []) //当前行选中数据id
                        return v
                    })
                }
                this.list.freightFreeShipping = this.list.freightFreeShipping.map(v => {
                    this.$set(v, 'showCityName', '')
                    this.$set(v, 'origin_list', this.areaData)//----每行源数据
                    this.$set(v, 'rowSelectArr', []) //当前行选中数据id
                    return v
                })
            },
            /*----------------------------表格1:快递-------------------------------------*/
            //省份改变
            handleCheckProvince(param, row) {
                console.log(param, row)
                //全选
                if (!param.isCheck) {
                    this.selectedArr.push(param.addressId)
                    //当前行选中的id
                    row.rowSelectArr.push(param.addressId)

                    if (param.childAddress&&param.childAddress.length>0) {
                        param.childAddress.forEach(item => {
                            this.selectedArr.push(item.addressId)
                            row.rowSelectArr.push(item.addressId)
                        })
                    }
                } else {
                    const index = this.selectedArr.indexOf(param.addressId) //删除全部选中的id
                    const num = row.rowSelectArr.indexOf(param.addressId) //删除当前行的id
                    this.selectedArr.splice(index, 1)
                    if (num != -1) {
                        row.rowSelectArr.splice(num, 1)
                    }
                    if (param.childAddress&&param.childAddress.length>0) {
                        param.childAddress.forEach(item => {
                            // 删除父级id
                            let index2 = this.selectedArr.indexOf(item.addressId)
                            this.selectedArr.splice(index2, 1)
                            let num2 = row.rowSelectArr.indexOf(item.addressId)
                            if (num2 != -1) {
                                row.rowSelectArr.splice(index2, 1) //删除子级id
                            }
                        })
                    }
                }
                //全选
                if (!param.isCheck) {
                    for (let i in param.childAddress) {
                        param.childAddress[i].isCheck = true
                        if (row.showCityName) {
                            if (row.showCityName.indexOf(param.childAddress[i]) == -1) {
                                row.showCityName = row.showCityName.replace(param.childAddress[i].addressName, ' ')
                            }
                            row.showCityName = row.showCityName + ' ' + param.childAddress[i].addressName
                        } else {
                            row.showCityName = param.childAddress[i].addressName
                        }
                    }
                } else {
                    //全不选
                    for (let i in param.childAddress) {
                        param.childAddress[i].isCheck = false
                        if (row.showCityName.indexOf(param.childAddress[i].addressName) !== -1) {
                            row.showCityName = row.showCityName.replace(param.childAddress[i].addressName, ' ')
                        }
                    }
                }
                //变成反选状态
                param.isCheck = !param.isCheck
                row.origin_list = row.freightAddress
            },
            //市改变
            handleCheckCity(parent, param, row) {
                console.log(1, parent, param, row)
                param.isCheck = !param.isCheck
                let childrenLen = parent.childAddress.length
                let count = 0
                for (let i in parent.childAddress) {
                    if (parent.childAddress[i].isCheck === true) {
                        ++count
                    }
                }
                parent.isCheck = count === childrenLen;
                //如果选中--显示
                if (param.isCheck) {
                    row.showCityName = row.showCityName + ' ' + param.addressName
                } else {
                    if (row.showCityName.indexOf(param.addressName) !== -1) {
                        row.showCityName = row.showCityName.replace(param.addressName, ' ')
                    }
                }
                /*--------------------------------------------------------------------*/
                if (param.isCheck) {
                    this.selectedArr.push(param.addressId)
                    //当前行选中的id
                    row.rowSelectArr.push(param.addressId)
                } else {
                    const index3 = this.selectedArr.indexOf(param.addressId) //删除选中的id
                    const num3 = row.rowSelectArr.indexOf(param.addressId) //删除当前行的id
                    this.selectedArr.splice(index3, 1)
                    if (num3 != -1) {
                        row.rowSelectArr.splice(num3, 1)
                    }
                }
                console.log(2,this.selectedArr,row.rowSelectArr,row.freightAddress)
                /*-------------------------------------------------------------------*/
                row.origin_list = row.freightAddress
            },
            //点击编辑按钮
            showCheckedArea(row, index) {
                const newArr = JSON.parse(JSON.stringify(this.areaData))

								console.log(1)

                if (this.selectedArr && this.selectedArr.length > 0) {
                    this.selectedArr.forEach(item => {
                        this.deleteelement(item, newArr) //删除掉所有选中的数据
                    })
                }

                console.log(3)

                const secondArr = JSON.parse(JSON.stringify(this.areaData))
                if (row.rowSelectArr&&row.rowSelectArr.length>0) {
                    row.rowSelectArr.forEach(val => {
                        this.addelement(val, secondArr, newArr) //添加当前行已经选中的数据
                    })
                }
                // console.log(777, newArr)
                row.freightAddress = newArr
            },
            //添加id相同的属性
            addelement(val, arr, newArr) {
                // console.log(222, newArr)
                for (let i in arr) {
                    if (arr[i].addressId == val) {
                        arr[i].isCheck = true
                        if (newArr) {
                            newArr.push(arr[i])
                        }
                    } else {

                        // console.log(4,newArr[i].childAddress)

                        if (arr[i].childAddress && arr[i].childAddress.length>0) {
                            // console.log(444, arr[i].childAddress)
                            this.addelement(val, arr[i].childAddress, newArr[i].childAddress)
                            /*问题:市选能实现,全选实现不了!!*/
                        }
                        // if (arr[i].childAddress && arr[i].childAddress.length > 0) {
                        //     for (var key in arr[i].childAddress) {
                        //         if (arr[i].childAddress[key].addressId == val) {
                        //             arr[i].childAddress[key].isCheck = true
                        //             if (newArr.childAddress&&newArr.childAddress.length > 0) {
                        //                 newArr.childAddress.push(arr[i].childAddress[key])
                        //             }
                        //         }
                        //     }
                        // }
                    }
                }
                return newArr
            },
            //删除id相等的属性
            deleteelement(val, arr) {
                for (let i in arr) {
                    if (arr[i].addressId == val) {
                        arr.splice(i, 1)
                    } else {

                        console.log(2)

                        if (arr[i].childAddress && arr[i].childAddress.length>0) {
                            this.deleteelement(val, arr[i].childAddress)
                        }
                    }
                }
                return arr
            },
            //添加一行
            add() {
                const newValue = {
                    "continuePrice": '',//续费
                    "continueUnit": '',//续件/续重/续体积
                    "def": 0,//是否默认：0-非默认；1-默认
                    "firstCharge": '',//首费
                    "firstUnit": '',//首件/首重/首体积
                    "freightAddress": [],//每行地区数据
                    "model": 1//运送方式;1-快递；2-EMS；3-平邮；4-顺丰
                }
                this.$set(newValue, 'origin_list', this.areaData)
                this.$set(newValue, 'showCityName', '')
                this.$set(newValue, 'rowSelectArr', []) //当前行选中数据id
                this.list.freightCalculate['1'].push(newValue);
            },
            //点击删除按钮
            deleteRow(index, rows) {
                this.$confirm('是否确定移除此行', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                    .then(async () => {
                        // this.newDeleteList.push({
                        //     reportDetailId: rows[index].reportDetailId,
                        //     goodsNumber: rows[index].goodsNumber
                        // })
                        rows.splice(index, 1);
                        this.$message({type: 'success', message: '删除成功'})
                    })
            },

            /*-------------------------------表格5:有条件包邮----------------------------------*/
            //省份改变
            handleCheckProvince5(param, row, index) {
                console.log(param)

                //全选
                if (!param.isCheck) {
                    this.selectedArr2.push(param.addressId)
                    //当前行选中的id
                    row.rowSelectArr.push(param.addressId)
                    if (param.childAddress.length) {
                        param.childAddress.forEach(item => {
                            this.selectedArr2.push(item.addressId)
                            row.rowSelectArr.push(item.addressId)
                        })
                    }
                } else {
                    const index = this.selectedArr2.indexOf(param.addressId) //删除全部选中的id
                    const num = row.rowSelectArr.indexOf(param.addressId) //删除当前行的id
                    this.selectedArr2.splice(index, 1)
                    if (num != -1) {
                        row.rowSelectArr.splice(num, 1)
                    }
                    if (param.childAddress.length) {
                        param.childAddress.forEach(item => {
                            // 删除父级id
                            let index2 = this.selectedArr2.indexOf(item.addressId)
                            this.selectedArr2.splice(index2, 1)
                            let num2 = row.rowSelectArr.indexOf(item.addressId)
                            if (num2 != -1) {
                                row.rowSelectArr.splice(index2, 1) //删除子级id
                            }
                        })
                    }
                }
                //全选
                if (!param.isCheck) {
                    for (let i in param.childAddress) {
                        param.childAddress[i].isCheck = true
                        if (row.showCityName) {
                            if (row.showCityName.indexOf(param.childAddress[i]) == -1) {
                                row.showCityName = row.showCityName.replace(param.childAddress[i].addressName, ' ')
                            }
                            row.showCityName = row.showCityName + ' ' + param.childAddress[i].addressName
                        } else {
                            row.showCityName = param.childAddress[i].addressName
                        }
                    }
                } else {
                    //全不选
                    for (let i in param.childAddress) {
                        param.childAddress[i].isCheck = false
                        if (row.showCityName.indexOf(param.childAddress[i].addressName) !== -1) {
                            row.showCityName = row.showCityName.replace(param.childAddress[i].addressName, ' ')
                        }
                    }
                }
                //变成反选状态
                param.isCheck = !param.isCheck
                row.origin_list = row.freightAddress
            },
            //市改变
            handleCheckCity5(parent, param, row, index) {
                console.log(222, parent, param, row, index)
                param.isCheck = !param.isCheck
                let childrenLen = parent.childAddress.length
                let count = 0
                for (let i in parent.childAddress) {
                    if (parent.childAddress[i].isCheck === true) {
                        ++count
                    }
                }
                parent.isCheck = count === childrenLen;
                //如果选中--显示
                if (param.isCheck) {
                    row.showCityName = row.showCityName + ' ' + param.addressName
                } else {
                    if (row.showCityName.indexOf(param.addressName) !== -1) {
                        row.showCityName = row.showCityName.replace(param.addressName, ' ')
                    }
                }
                /*--------------------------------------------------------------------*/
                if (param.isCheck) {
                    this.selectedArr2.push(param.addressId)
                    //当前行选中的id
                    row.rowSelectArr.push(param.addressId)
                } else {
                    const index3 = this.selectedArr2.indexOf(param.addressId) //删除选中的id
                    const num3 = row.rowSelectArr.indexOf(param.addressId) //删除当前行的id
                    this.selectedArr2.splice(index3, 1)
                    if (num3 != -1) {
                        row.rowSelectArr.splice(num3, 1)
                    }
                }
                // console.log(3344,this.selectedArr2,row.rowSelectArr)
                /*-------------------------------------------------------------------*/
                row.origin_list = row.freightAddress
            },
            //点击编辑按钮
            showCheckedArea5(row, index) {
                const newArr = JSON.parse(JSON.stringify(this.areaData))

                if (this.selectedArr2.length) {
                    this.selectedArr2.forEach(item => {
                        this.deleteelement5(item, newArr) //删除掉所有选中的数据
                    })
                }
                const secondArr = JSON.parse(JSON.stringify(this.areaData))
                if (row.rowSelectArr.length) {
                    row.rowSelectArr.forEach(val => {
                        this.addelement5(val, secondArr, newArr) //添加当前行已经选中的数据
                    })
                }
                // console.log(777, newArr)
                row.freightAddress = newArr
            },
            //添加id相同的属性
            addelement5(val, arr, newArr) {
                // console.log(222, newArr)
                for (let i in arr) {
                    if (arr[i].addressId == val) {
                        arr[i].isCheck = true
                        if (newArr) {
                            newArr.push(arr[i])
                        }
                    } else {
                        if (arr[i].childAddress && arr[i].childAddress.length) {
                            // console.log(444, arr[i].childAddress)
                            this.addelement(val, arr[i].childAddress, newArr[i].childAddress)
                            /*问题:市选能实现,全选实现不了!!*/
                        }
                    }
                    /*----------------------------------------------------------------*/

                    // for (let j in arr[i].children) {
                    //     if (arr[i].children[j].value == val) {
                    //         arr[i].children[j].isCheck = true
                    //         console.log(888, newArr[i].children);
                    //         if(newArr[i].children){
                    //             newArr[i].children.push(arr[i].children[j])
                    // 				}
                    //         // this.addelement(val, arr[i].children, newArr.children)
                    //     } else {
                    //         this.addelement(val, arr[i].children, newArr.children)
                    //     }
                    // }
                    /*------------------------------------------------------------------*/
                }
                return newArr
            },
            //删除id相等的属性
            deleteelement5(val, arr) {
                for (let i in arr) {
                    if (arr[i].addressId == val) {
                        arr.splice(i, 1)
                    } else {
                        if (arr[i].childAddress && arr[i].childAddress.length) {
                            this.deleteelement(val, arr[i].childAddress)
                        }
                    }
                }
                return arr
            },
            //添加一行
            add5() {
                const newValue = {
                    freeShippingNum: '',//包邮件数
                    freeShippingPrice: '',//包邮金额
                    freeShippingType: '',//包邮类型：1-件数；2-金额
                    freightAddress: []
                }
                this.$set(newValue, 'origin_list', this.areaData)
                this.$set(newValue, 'showCityName', '')
                this.$set(newValue, 'rowSelectArr', []) //当前行选中数据id
                this.list.freightFreeShipping.push(newValue);
            },
            //点击删除按钮
            deleteRow5(index, rows) {
                this.$confirm('是否确定移除此行', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                    .then(async () => {
                        // this.newDeleteList.push({
                        //     reportDetailId: rows[index].reportDetailId,
                        //     goodsNumber: rows[index].goodsNumber
                        // })
                        rows.splice(index, 1);
                        this.$message({type: 'success', message: '删除成功'})
                    })
            },
            /*-----------------------------------表单其他内容-----------------------------------*/
            //是否包邮条件触发
            changefreeShippingRadio(val) {
                console.log(111, val)
                this.showWayItem = val === 0;
            },
            //计件方式改变触发
            changeRadio(val) {
                if (val == 1) {
                    this.label1 = '首件(个)'
                    this.label3 = '续件(个)'
                    this.newlabel1 = '件内'
                    this.newlabel2 = '个'
                } else if (val == 2) {
                    this.label1 = '首体积(kg)'
                    this.label3 = '续体积(kg)'
                    this.newlabel1 = 'kg内'
                    this.newlabel2 = 'kg'
                } else if (val == 3) {
                    this.label1 = '首重(m³)'
                    this.label3 = '续重(m³)'
                    this.newlabel1 = 'm³内'
                    this.newlabel2 = 'm³'
                }
            },
            //点击快递显示表格1
            changeTable1(event) {
                // console.log(444, event)
                this.showItem1 = !!event;
            },
            //点击ems
            changeTable2(event) {
                // console.log(444, event)
                this.showItem2 = !!event;
            },
            //点击平邮
            changeTable3(event) {
                // console.log(444, event)
                this.showItem3 = !!event;
            },
            //点击顺丰
            changeTable4(event) {
                // console.log(444, event)
                this.showItem4 = !!event;
            },
            //点击按条件按钮
            changeTable5(event) {
                console.log(444, event)
                this.showItem5 = !!event;
                if (event) {
                    this.list.conditionFreeShipping = 1
                } else {
                    this.list.conditionFreeShipping = 0
                }
            },
            //地区改变
            handleChange(value) {
                console.log(value);
            },
            //返回
            back() {
                this.$router.go(-1)
            }
        }
    }
</script>


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
						padding: 10px;
						border: 1px solid rgb(215, 224, 241);
						background: #fff;

						.title {
								margin-left: -10px;
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

				/deep/ .el-popover .el-popper {
						max-width: 620px !important;
				}
		}

		/deep/ .el-checkbox {
				margin-right: 77px;
				width: 66px;
		}

</style>
