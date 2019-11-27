<template>
    <div class="margin">
        <div class="mbottom">
            <div class="goods-fitter">
                <el-form label-width="100px" size="small">
                    <div class="search-wrapper">
                        <el-page-header @back="back" :content="text"></el-page-header>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="mbottom" style="height: 100%">
            <div class="goods-fitter" style="height: 100%">
                <el-form ref="form" :model="form" label-width="120px" size="small" style="height: 100%">
                    <div class="search-wrapper" style="height: 100%">
                        <el-form-item label="模板名称:">
                            <el-input v-model="form.templateName" size="small" style="width: 480px"></el-input>
                        </el-form-item>
                        <el-form-item label="运送方式:">
                            <div style="display: flex;flex-direction: column;margin-right: 128px">
                                <span style="color: #e9ebf0">除指定地区外,其余地区的运费采用"默认运费"</span>
                                <!--快递-->
                                <div class="search-wrapper" style="margin-bottom: 40px;">
                                    <div class="conditions" style="background-color: #f3f7fb;height: 62px;align-items: center;margin-bottom: 20px;padding-top: 15px;">
                                        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                        <el-form-item label="默认运费:" style="margin-bottom: 0;float: left;" prop="firstWeight" :rules="{ required: true, message: '输入框不能为空', trigger: 'blur' }">
                                            <el-input v-model="ruleForm.firstWeight" size="small" style="width: 60px"></el-input>
                                            <span>{{newlabel1}}</span>
                                        </el-form-item>
                                        <el-form-item style="margin-bottom: 0;float: left;" prop="firstWeightPrice" :rules="{ required: true, message: '输入框不能为空', trigger: 'blur' }">
                                            <div style="display: flex">
                                                <el-input v-model="ruleForm.firstWeightPrice" size="small" style="width: 80px"></el-input>
                                                <span>元</span>
                                            </div>
                                        </el-form-item>
                                        <el-form-item label="每增加:" style="margin-bottom: 0;float: left;" prop="continueWeight" :rules="{ required: true, message: '输入框不能为空', trigger: 'blur' }">
                                            <div style="display: flex">
                                                <el-input v-model="ruleForm.continueWeight" size="small" style="width: 80px"></el-input>
                                                <span>{{newlabel2}}</span>
                                            </div>
                                        </el-form-item>
                                        <el-form-item label="增加运费:" style="margin-bottom: 0;float: left;" prop="continuePrice" :rules="{ required: true, message: '输入框不能为空', trigger: 'blur' }">
                                            <div style="display: flex">
                                                <el-input v-model="ruleForm.continuePrice" size="small" style="width: 80px"></el-input>
                                                <span>元</span>
                                            </div>
                                        </el-form-item>
                                        <el-form-item style="margin-bottom: 0;float: left;" prop="firstBulk" :rules="{ required: true, message: '输入框不能为空', trigger: 'blur' }">
                                            <el-input v-model="ruleForm.firstBulk" size="small" style="width: 80px"></el-input>
                                            <span>{{newlabel3}}</span>
                                        </el-form-item>
                                        <el-form-item style="margin-bottom: 0;float: left;" prop="firstBulkPrice" :rules="{ required: true, message: '输入框不能为空', trigger: 'blur' }">
                                            <div style="display: flex">
                                                <el-input v-model="ruleForm.firstBulkPrice" size="small" style="width: 80px"></el-input>
                                                <span>元</span>
                                            </div>
                                        </el-form-item>
                                        <el-form-item label="每增加:" style="margin-bottom: 0;float: left;" prop="continueBulk" :rules="{ required: true, message: '输入框不能为空', trigger: 'blur' }">
                                            <div style="display: flex">
                                                <el-input v-model="ruleForm.continueBulk" size="small" style="width: 80px"></el-input>
                                                <span>{{newlabel4}}</span>
                                            </div>
                                        </el-form-item>
                                        <el-form-item label="增加运费:" style="margin-bottom: 0;float: left;" prop="continueBulkPrice" >
                                            <div style="display: flex">
                                                <el-input v-model="ruleForm.continueBulkPrice" size="small" style="width: 80px"></el-input>
                                                <span>元</span>
                                            </div>
                                        </el-form-item>
                                        </el-form>
                                    </div>
                                    <!--表格数据源1-->
                                    <el-table :data="list" border style="width: 100%;margin-bottom: 20px;" stripe>
                                        <el-table-column prop="shipAddress" label="发货地址" align="center">
                                            <template slot-scope="scope">
                                                <!--一级省份显示 :indeterminate="isIndeterminate"-->
                                                <el-popover trigger="click" placement="bottom" width="610">
                                                    <el-checkbox v-for="(province,index) in provinceArr" v-model="province.isCheck" @click.prevent.native="handleCheckProvince(province,scope.row,index)" style="margin-bottom: 20px" :indeterminate="province.isIndeterminate">
                                                        <!--二级城市显示-->
                                                        <el-popover trigger="hover" placement="bottom" width="400">
                                                            <el-checkbox v-for="(city,childIndex) in province.childAddress" :key="childIndex" :value="city.isCheck" @change.prevent.native="handleCheckCity(province,city,scope.row,childIndex)">
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
                                                        <span v-if="scope.row.shipAddress">{{scope.row.shipAddress[0].childAddress[0].addressName}}</span>
                                                        <span v-else>{{scope.row.freightAddress2}}</span>
                                                        <el-button type="text" size="small" @click="showCheckedArea(scope.row,scope.$index,list)" style="margin-left: 20px">编辑
                                                        </el-button>
                                                    </div>
                                                </el-popover>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="transportArea" label="运送到" align="center">
                                            <template slot-scope="scope">
                                                <!--一级省份显示 :indeterminate="isIndeterminate"-->
                                                <el-popover trigger="click" placement="bottom" width="610">
                                                    <el-checkbox v-for="(province,index) in provinceArr" v-model="province.isCheck" @click.prevent.native="handleCheckProvince1(province,scope.row,index)" style="margin-bottom: 20px" :indeterminate="province.isIndeterminate">
                                                        <!--二级城市显示-->
                                                        <el-popover trigger="hover" placement="bottom" width="400">
                                                            <el-checkbox v-for="(city,childIndex) in province.childAddress" :key="childIndex" :value="city.isCheck" @change.prevent.native="handleCheckCity1(province,city,scope.row,childIndex)">
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
                                                        <span v-if="scope.row.transportArea">{{scope.row.transportArea[0].childAddress[0].addressName}}</span>
                                                        <span v-else>{{scope.row.addressId}}</span>
                                                        <el-button type="text" size="small" @click="showCheckedArea1(scope.row,scope.$index,list)" style="margin-left: 20px">编辑</el-button>
                                                    </div>
                                                </el-popover>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="firstWeight" :label="label1" align="center" :render-header="renderHeader">
                                            <template slot-scope="scope">
                                                <el-input v-model="scope.row.firstWeight" size="small"></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="firstWeightPrice" :label="label2" align="center" :render-header="renderHeader">
                                            <template slot-scope="scope">
                                                <el-input v-model="scope.row.firstWeightPrice" size="small"></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="continueWeight" :label="label3" align="center" :render-header="renderHeader">
                                            <template slot-scope="scope">
                                                <el-input v-model="scope.row.continueWeight" size="small"></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="continuePrice" :label="label4" align="center" :render-header="renderHeader">
                                            <template slot-scope="scope">
                                                <el-input v-model="scope.row.continuePrice" size="small"></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="firstBulk" :label="label5" align="center">
                                            <template slot-scope="scope">
                                                <el-input v-model="scope.row.firstBulk" size="small"></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="firstBulkPrice" :label="label6" align="center">
                                            <template slot-scope="scope">
                                                <el-input v-model="scope.row.firstBulkPrice" size="small"></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="continueBulk" :label="label7" align="center">
                                            <template slot-scope="scope">
                                                <el-input v-model="scope.row.continueBulk" size="small"></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="continueBulkPrice" :label="label8" align="center">
                                            <template slot-scope="scope">
                                                <el-input v-model="scope.row.continueBulkPrice" size="small"></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="lowestCharge" :label="label9" align="center">
                                            <template slot-scope="scope">
                                                <el-input v-model="scope.row.lowestCharge" size="small"></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="timeliness" :label="labell0" align="center">
                                            <template slot-scope="scope">
                                                <el-input v-model="scope.row.timeliness" size="small"></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="操作" align="center">
                                            <template slot-scope="scope">
                                                <div class="small-Idiv"
                                                    @click="deleteRow(scope.$index, list)">
                                                    <div class="i-div huishouzhan">
                                                            <img src="@/common/images/icon/icon_delete.png" alt=""
                                                                    class="operation_img">
                                                    </div>
                                                    <span style="word-break: keep-all;">删除</span>
                                                </div>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <div>
                                        <el-button type="primary" size="small" @click="add">为指定地区城市设置运费</el-button>
                                    </div>
                                </div>
                            </div>
                        </el-form-item>   
                        <div style="display: flex;justify-content: center">
                            <el-button type="danger" size="small">取消</el-button>
                            <el-button type="primary" size="small" @click="submitForm('ruleForm')">保存并返回</el-button>
                        </div>                                 
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import {queryTemplate, getAllArea, updateTemplate} from "@/api/order/index";

    export default {
        data() {
            return {
				text: '运费规则>查看运费模板',
                ruleForm: {
                    firstWeight: '',
                    firstWeightPrice: '',
                    continueWeight: '',
                    continuePrice: '',
                    firstBulk: '',
                    firstBulkPrice: '',
                    continueBulk: '',
                    continueBulkPrice: '',
                },
                addressArr: [], //省级下拉
                cityArr: [],
                districtArr: [],
                CommodityArr: [],
                townIdArr: [],
                selectedArr: [], // 所有选中的数据
                newlabel1: 'Kg内,',
                newlabel2: 'Kg',
                newlabel3: 'm3内,',
                newlabel4: 'm3,',
                label1: '首重(Kg)',
                label2: '首费(元)',
                label3: '续重(Kg)',
                label4: '续费(元)',
                label5: '首体积(m3)',
                label6: '体积价',
                label7: '续体积(m3)',
                label8: '续体积价',
                label9: '最低一票收费',
                labell0: '快递时效',
                isCheck: false,  
                form: {
                    templateName: '',
                    
                },  
                list: [], //表格数据1 
                isShowAreaModel: false,
                id: this.$route.query.id,
                provinceArr: [],
                newList: [],
                provinceData: '',
                goodsAddress: [],
                cityData: '',
                citysAddress: [],
                provinceArr: [],
            }
        },
        created() {
            this.getData();
            this.getCity();
        },
        methods: {
            // render 事件
            renderHeader (h,{column}) { // h即为cerateElement的简写，具体可看vue官方文档
                return h(
                'div',
                [ 
                    h('span', column.label),
                    h('i', {
                    class:'el-icon-star-on',
                    style:'color:#F56C6C;position: absolute;top: 13px;left: 10px;font-size: 1px;'
                    })
                ],
                );
            },
            //修改模板
            submitForm(formName){
                let freightCalculateDetail = [];
                // console.log(this.list.length)
                console.log(this.list)
                if(this.list.length != 0){
                    this.list.forEach((item) => {

                        
                        if(!item.firstWeight){
                            console.log(1)
                        }else{
                            if(!item.firstWeightPrice){
                                this.$message({
                                    message: '首费必填',
                                    type: 'warning'
                                });
                                return false
                            }
                            if(!item.continueWeight){
                                this.$message({
                                    message: '续重必填',
                                    type: 'warning'
                                });
                                return false
                            }
                            if(!item.continuePrice){
                                this.$message({
                                    message: '续费必填',
                                    type: 'warning'
                                });
                                return false
                            }
                        }
                        
                    this.$refs[formName].validate((valid) => {
                            if (valid) {
                                console.log('submit!');
                            } else {
                                console.log('error submit!!');
                                return false;
                            }
                        });
                        console.log(item)
                        console.log(item.addressId)
                        console.log(item.freightAddress2)
                        if(item.firstWeight != undefined){
                             if(item.addressId === undefined&&item.freightAddress2 != undefined){
                            let obj2 = {
                                continueBulk: item.continueBulk,
                                continueBulkPrice: item.continueBulkPrice,
                                continuePrice: item.continuePrice,
                                continueWeight: item.continueWeight,
                                firstBulk: item.firstBulk,
                                firstBulkPrice: item.firstBulkPrice,
                                firstWeight: item.firstWeight,
                                firstWeightPrice: item.firstWeightPrice,
                                def: 0,
                                lowestCharge: item.lowestCharge,
                                timeliness: item.timeliness, 
                                freightShipAddress: [{
                                    addressId: '',
                                    addressName: '',
                                    childAddress: [{
                                        addressId: '',
                                        addressName: item.freightAddress2,
                                        childAddress: []
                                    }]
                                }],
                                freightTransportAddress: [{
                                    addressId: '',
                                    addressName: '',
                                    childAddress: [{
                                        addressId: '',
                                        addressName: item.transportArea[0].childAddress[0].addressName,
                                        childAddress: []
                                    }]
                                }]
                            };
                            freightCalculateDetail.push(obj2)
                            return freightCalculateDetail
                        }
                        if(item.addressId === undefined&&item.freightAddress2 === undefined){
                            let obj2 = {
                                continueBulk: item.continueBulk,
                                continueBulkPrice: item.continueBulkPrice,
                                continuePrice: item.continuePrice,
                                continueWeight: item.continueWeight,
                                firstBulk: item.firstBulk,
                                firstBulkPrice: item.firstBulkPrice,
                                firstWeight: item.firstWeight,
                                firstWeightPrice: item.firstWeightPrice,
                                def: 0,
                                lowestCharge: item.lowestCharge,
                                timeliness: item.timeliness, 
                                freightShipAddress: [{
                                    addressId: '',
                                    addressName: '',
                                    childAddress: [{
                                        addressId: '',
                                        addressName: item.shipAddress[0].childAddress[0].addressName,
                                        childAddress: []
                                    }]
                                }],
                                freightTransportAddress: [{
                                    addressId: '',
                                    addressName: '',
                                    childAddress: [{
                                        addressId: '',
                                        addressName: item.transportArea[0].childAddress[0].addressName,
                                        childAddress: []
                                    }]
                                }]
                            };
                            freightCalculateDetail.push(obj2)
                            return freightCalculateDetail
                        }
                        if(item.addressId != undefined&&item.freightAddress2 != undefined){
                            let obj2 = {
                            continueBulk: item.continueBulk,
                            continueBulkPrice: item.continueBulkPrice,
                            continuePrice: item.continuePrice,
                            continueWeight: item.continueWeight,
                            firstBulk: item.firstBulk,
                            firstBulkPrice: item.firstBulkPrice,
                            firstWeight: item.firstWeight,
                            firstWeightPrice: item.firstWeightPrice,
                            def: 0,
                            lowestCharge: item.lowestCharge,
                            timeliness: item.timeliness, 
                            freightShipAddress: [{
                                addressId: '',
                                addressName: '',
                                childAddress: [{
                                    addressId: '',
                                    addressName: item.freightAddress2,
                                    childAddress: []
                                }]
                            }],
                            freightTransportAddress: [{
                                addressId: '',
                                addressName: '',
                                childAddress: [{
                                    addressId: '',
                                    addressName: item.addressId,
                                    childAddress: []
                                }]
                            }]
                        };
                        freightCalculateDetail.push(obj2)
                        return freightCalculateDetail
                        }
                        if(item.addressId != undefined&&item.freightAddress2 === undefined){
                            let obj2 = {
                            continueBulk: item.continueBulk,
                            continueBulkPrice: item.continueBulkPrice,
                            continuePrice: item.continuePrice,
                            continueWeight: item.continueWeight,
                            firstBulk: item.firstBulk,
                            firstBulkPrice: item.firstBulkPrice,
                            firstWeight: item.firstWeight,
                            firstWeightPrice: item.firstWeightPrice,
                            def: 0,
                            lowestCharge: item.lowestCharge,
                            timeliness: item.timeliness, 
                            freightShipAddress: [{
                                addressId: '',
                                addressName: '',
                                childAddress: [{
                                    addressId: '',
                                    addressName: item.shipAddress[0].childAddress[0].addressName,
                                    childAddress: []
                                }]
                            }],
                            freightTransportAddress: [{
                                addressId: '',
                                addressName: '',
                                childAddress: [{
                                    addressId: '',
                                    addressName: item.addressId,
                                    childAddress: []
                                }]
                            }]
                        };
                        freightCalculateDetail.push(obj2)
                        return freightCalculateDetail
                        }
                        }
                        
                        
                    })     
                }  
                let obj1 = {
                    continueBulk: this.ruleForm.continueBulk,
                    continueBulkPrice: this.ruleForm.continueBulkPrice,
                    continuePrice: this.ruleForm.continuePrice,
                    continueWeight: this.ruleForm.continueWeight,
                    firstBulk: this.ruleForm.firstBulk,
                    firstBulkPrice: this.ruleForm.firstBulkPrice,
                    firstWeight: this.ruleForm.firstWeight,
                    firstWeightPrice: this.ruleForm.firstWeightPrice,
                    def: 1
                }
                freightCalculateDetail.push(obj1);
                
                let obj = {
                    id: this.id,
                    templateName: this.form.templateName,
                    detailUpdateParams: freightCalculateDetail
                }
                console.log(obj)
                updateTemplate(obj).then(res => {
                    if (res.code == 200) {
                        this.$message.success('提交成功')
                        this.$router.push({name: 'freightRules'})
                    }
                })
            },
            //获取运费模板详情数据
            getData(){
                queryTemplate(this.id)
				.then(res => {
					if(res.code === 200){
                        this.form.templateName = res.data[0].templateName;
                        this.lists = res.data[0].freightCalculateDetail;
                        this.lists.forEach((item) => {
                            console.log(item.def)
                            if(item.def == 1){
                                console.log(item)
                                this.ruleForm = item;
                            }else if(item.def == 0){
                                console.log(item)
                                this.list.push(item)
                                console.log(this.list)
                            }                        
                        })
					}
				})
            },
            //获取全部省市
            getCity(){
                getAllArea()
				.then(res => {
					if(res.code === 200){
                        this.provinceArr = res.data;
                        this.provinceArr = JSON.parse(JSON.stringify(this.provinceArr).replace(/id/g, 'addressId')) 
                        this.provinceArr = JSON.parse(JSON.stringify(this.provinceArr).replace(/regionName/g, 'addressName'))
                        this.provinceArr = JSON.parse(JSON.stringify(this.provinceArr).replace(/childRegion/g, 'childAddress'))
                        this.provinceArr.map(v => {
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
			//返回上一步
            back() {
                this.$router.go(-1);
			},
           
            //省份改变
            handleCheckProvince(param, row, index) {
               
                // console.log(555, this.newList)
                //全选
                if (!param.isCheck) {
                    // console.log(param)
                    this.provinceData = param;
                    // console.log(param.childAddress)
                    for (let i in param.childAddress) {
                        param.childAddress[i].isCheck = true
                        if (row.freightAddress2) {
                            if (row.freightAddress2.indexOf(param.childAddress[i]) == -1) {
                                row.freightAddress2 = row.freightAddress2.replace(param.childAddress[i].addressName, ' ')
                            }
                            row.freightAddress2 = row.freightAddress2 + ' ' + param.childAddress[i].addressName
                        } else {
                            row.freightAddress2 = param.childAddress[i].addressName
                        }
                    }
                } else {
                    //全不选
                    for (let i in param.childAddress) {
                        param.childAddress[i].isCheck = false
                        if (row.freightAddress2.indexOf(param.childAddress[i].addressName) !== -1) {
                            row.freightAddress2 = row.freightAddress2.replace(param.childAddress[i].addressName, ' ')
                        }
                    }
                }
                //变成反选状态
                param.isCheck = !param.isCheck
                
            },
            handleCheckProvince1(param, row, index) {
               
                // console.log(555, this.newList)
                //全选
                if (!param.isCheck) {
                    // console.log(param)
                    this.cityData = param;
                    console.log(param.childAddress)
                    for (let i in param.childAddress) {
                        param.childAddress[i].isCheck = true
                        if (row.addressId) {
                            if (row.addressId.indexOf(param.childAddress[i]) == -1) {
                                row.addressId = row.addressId.replace(param.childAddress[i].addressName, ' ')
                            }
                            row.addressId = row.addressId + ' ' + param.childAddress[i].addressName
                        } else {
                            row.addressId = param.childAddress[i].addressName
                        }
                    }
                } else {
                    //全不选
                    for (let i in param.childAddress) {
                        param.childAddress[i].isCheck = false
                        if (row.addressId.indexOf(param.childAddress[i].addressName) !== -1) {
                            row.addressId = row.addressId.replace(param.childAddress[i].addressName, ' ')
                        }
                    }
                }
                //变成反选状态
                param.isCheck = !param.isCheck
               
            },
            //市改变
            handleCheckCity(parent, param, row, index) {
                console.log(parent)
               
                // console.log(222, parent, param, row, index)
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
                // console.log(1, this.newList)
                if (param.isCheck) {
                    row.shipAddress = '';
                    // console.log(1)
                    row.freightAddress2 = (row.freightAddress2 + '' + param.addressName).replace('undefined','');
                    let obj = {
                        addressId: param.addressId,
                        addressName: param.addressName,
                        childAddress: []
                    }
                    this.goodsAddress.push(obj)
                    // console.log(this.goodsAddress)
                    // console.log(11111, row.id)   
                } else {
                    // console.log(2)
                    // console.log(row.id)
                    // console.log(param.addressName)
                    if(row.freightAddress2 != undefined){
                       if (row.freightAddress2.indexOf(param.addressName) !== -1) {
                            row.freightAddress2 = row.freightAddress2.replace(param.addressName, ' ')
                        }
                    }
                } 
               
                // console.log(3344,this.selectedArr,row.rowSelectArr)
                /*-------------------------------------------------------------------*/
            },
            handleCheckCity1(parent, param, row, index) {
               
                // console.log(222, parent, param, row, index)
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
                // console.log(1, this.newList)
                if (param.isCheck) {
                    row.transportArea = '';
                    row.addressId = (row.addressId + ' ' + param.addressName).replace('undefined','');
                    let obj = {
                        addressId: param.addressId,
                        addressName: param.addressName,
                        childAddress: []
                    }
                    this.citysAddress.push(obj)
                    // console.log(this.citysAddress)
                    // console.log(11111, row.id)
                    // console.log(param)
                    // console.log(11111, row.addressId)
                } else {
                    if(row.addressId != undefined){
                        if (row.addressId.indexOf(param.addressName) !== -1) {
                            row.addressId = row.addressId.replace(param.addressName, ' ')
                        }
                    }
                }
               
                // console.log(3344,this.selectedArr,row.rowSelectArr)
                /*-------------------------------------------------------------------*/
            },
            //点击编辑按钮
            showCheckedArea(row, index, rows) {
                this.getCity();
            },
            showCheckedArea1(row, index, rows) {
                this.getCity();
            },
            //添加id相同的属性
            addelement(val, arr, newArr) {
                // console.log(222, newArr)
                for (let i in arr) {
                    if (arr[i].value == val) {
                        arr[i].isCheck = true
                        if (newArr) {
                            newArr.push(arr[i])
                        }
                    } else {
                        if (arr[i].children && arr[i].children.length) {
                            // console.log(444, arr[i].children)
                            this.addelement(val, arr[i].children, newArr[i].children)
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
            deleteelement(val, arr) {
                for (let i in arr) {
                    if (arr[i].value == val) {
                        arr.splice(i, 1)
                    } else {
                        if (arr[i].children && arr[i].children.length) {
                            this.deleteelement(val, arr[i].children)
                        }
                    }
                }
                return arr
            },
            //添加一行
            add() {
                // console.log(444, this.form)
                var newValue = {
                    firstWeight: this.list.firstWeight,
                    lowestCharge: this.list.lowestCharge,
                    timeliness: this.list.timeliness,
                    continueBulk: this.list.continueBulk,
                    continueBulkPrice: this.list.continueBulkPrice,
                    continuePrice: this.list.continuePrice,
                    continueWeight: this.list.continueWeight,
                    firstBulk: this.list.firstBulk,
                    firstBulkPrice: this.list.firstBulkPrice,
                    firstWeightPrice: this.list.firstWeightPrice
                }
                // this.$set(newValue, 'shipAddress', this.provinceArr)
                // this.$set(newValue, 'transportArea', this.provinceArr)
                // this.$set(newValue, 'firstWeight', '')
                // this.$set(newValue, 'lowestCharge', '')
                // this.$set(newValue, 'timeliness', '') //当前行选中数据id
                // this.$set(newValue, 'continueBulk', '')
                // this.$set(newValue, 'continueBulkPrice', '')
                // this.$set(newValue, 'continuePrice', '')
                // this.$set(newValue, 'continueWeight', '')
                // this.$set(newValue, 'firstBulk', '')
                // this.$set(newValue, 'firstBulkPrice', '')
                // this.$set(newValue, 'firstWeightPrice', '')
                // console.log(newValue)
                this.list.push(newValue);
                
                
                // console.log(666, this.form.list)
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
            //计件方式改变触发
            changeRadio(val) {
                // console.log(888, val, this.form.resource)
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
            //点击按条件按钮
            changeTable2(event) {
                // console.log(444, event)
                this.showItem2 = !!event;
            },
           
           
            //街道
            townfunc(val) {
                this.townIdArr.forEach(item => {
                    if (item.regionId == val) {
                        this.ruleForm.town = item.regionName;
                    }
                });
            },
        }
    }
</script>
<style scoped>
.conditions >>> .el-form-item__label{
    width: 90px !important;
}
.conditions >>> .el-form-item__content{
    margin-left: 0px !important;
    float: left;
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

</style>
