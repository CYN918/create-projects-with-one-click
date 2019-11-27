<template>
    <div class="marginList">
        <div class="mbottom margin">
            <div class="goods-fitter">
                <div class="search-wrapper">
                    <el-page-header @back="back" content="设置商品折扣"></el-page-header>
                </div>
            </div>
        </div>
        <el-card shadow="never margin">
            <el-row class="menu-tree">
                <el-col :span="10">
                    <div class="menu">
                        <div class="menuItem"><div style="border-right: 1px solid #ddd;">一级分类</div><div style="border-bottom: 1px solid #ddd;background: #f7faff;">二级分类</div><div style="border-bottom: 1px solid #ddd;background: #f7faff;">三级分类</div></div>
                       <div style="display: flex">
                           <div style="width: 186px" class="menuContainer">
                               <ul class="menuWraps">
                                   <li v-for="(item,index) in treeData" :key="index"
                                       :class="num1==index?'menuLists activ':'menuLists'"
                                       @click="carIdFunc(item.catId,1,item.catName,index)"
                                   >
                                       <div class="liList">
                                            <span class="liListWid">
                                                {{item.catName}}
                                            </span>
                                             <span  class="liListborder">
                                                {{(item.avgRate)*100+100}}%
                                            </span>
                                       </div>
                                   </li>
                               </ul>
                           </div>
                           <div style="width: 186px" class="menuContainer">
                               <ul class="menuWraps">
                                   <li v-for="(item,index) in treeData1" :key="index"
                                       :class="num2==index?'menuLists activ':'menuLists'"
                                       @click="carIdFunc(item.catId,2,item.catName,index)"
                                   >
                                       <div class="liList">
                                            <span class="liListWid">
                                                {{item.catName}}
                                            </span>
                                           <span  class="liListborder">
                                                {{(item.avgRate)*100+100}}%
                                            </span>
                                       </div>
                                   </li>
                               </ul>
                           </div>
                           <div style="width: 186px" class="menuContainer">
                               <ul class="menuWraps">
                                   <li v-for="(item,index) in treeData2" :key="index"
                                       :class="num3==index?'menuLists activ':'menuLists'"
                                       @click="carIdFunc(item.catId,3,item.catName,index)"
                                   >
                                       <div class="liList">
                                            <span class="liListWid">
                                                {{item.catName}}
                                            </span>
                                           <span  class="liListborder">
                                                {{(item.avgRate)*100+100}}%
                                            </span>
                                       </div>
                                   </li>
                               </ul>
                           </div>
                       </div>
                    </div>
                </el-col>
                <!--<el-col class="form-divider" :span="2">-->
                <!--<el-divider direction="vertical" />-->
                <!--</el-col>-->
                <el-col :span="14">
                    <div class="goods-fitter">
                        <div class="menu">
                            <p>商城价调整</p>
                        </div>
                        <el-form ref="form" label-width="100px" size="small" :model="ruleForm" >
                            <div class="search-wrapper" style="border: unset" >
                                <el-row>
                                    <el-col :span="12">
                                        <el-col>
                                            <el-form-item label="分类层级：">
                                                {{num}}级分类
                                            </el-form-item>
                                        </el-col>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-col>
                                            <el-form-item label="分类名称：">
                            <span v-if="catName&&catName!==''">
                                {{catName}}
                            </span>
                                            </el-form-item>
                                        </el-col>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24">
                                        <el-col>
                                            <el-form-item label="调商城价：">
                                                <el-radio v-model="ruleForm.radio" label="0">上调</el-radio>
                                                <el-radio v-model="ruleForm.radio" label="1">下调</el-radio>
                                            </el-form-item>
                                        </el-col>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-col :span="23">
                                            <el-form-item label="比例调价：">
                                                <el-input type="number" :min="0" v-model="ruleForm.priceAdjustmen" placeholder="请输入内容"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="1" style="line-height: 32px;">
                                            %
                                        </el-col>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-col :span="12">
                                            <el-form-item label="增减调价：">
                                                <el-select v-model="ruleForm.IncreaseDecrease" placeholder="请选择">
                                                    <el-option label="+" value="0"></el-option>
                                                    <el-option label="-" value="1"></el-option>
                                                    <el-option label="*" value="2"></el-option>
                                                    <el-option label="/" value="3"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="6" class="el-input--small">
                                            <el-input type="number" style="margin: 0 5px;"  v-model="ruleForm.price" placeholder="请输入内容"></el-input>
                                        </el-col>
                                        <el-col :span="2" style="line-height: 32px;margin: 0 5px;">
                                            {{ruleForm.IncreaseDecrease==2||ruleForm.IncreaseDecrease==3?"倍":"元"}}
                                        </el-col>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-col :span="23">
                                            <el-form-item label="分配项目：">
                                                <el-select v-model="ruleForm.projectId" placeholder="请选择分配项目" @change="handleProduct">
                                                    <el-option
                                                            v-for="item in options"
                                                            :key="item.projectId"
                                                            :label="item.projectName"
                                                            :value="item.projectId"
                                                    >
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-col>
                                            <el-button type="primary" size="small" @click="confrim">确定</el-button>
                                        </el-col>
                                    </el-col>
                                </el-row>
                                <el-table  border  style="width: 100%" :data="cartList" @row-click="handleline">
                                    <el-table-column type="index"  align="center">
                                    </el-table-column>
                                    <el-table-column prop="catName" label="分类名称" align="center"></el-table-column>
                                    <el-table-column  label="分类比例" align="center">
                                        <template slot-scope="scope" style="">
                             <span style="color: darkgoldenrod;" v-if="scope.row.adjustPrice">{{scope.row.adjustPrice.ratioAdjustMethod==0?'上调':'下调'}}{{parseInt(scope.row.adjustPrice.ratioAdjustValue*100)}}%
                                 {{Symbol[scope.row.adjustPrice.fluctuateAdjustMethod]}}{{scope.row.adjustPrice.fluctuateAdjustValue}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="projectName" label="项目名称" align="center"></el-table-column>
                                    <el-table-column prop="operatorTime" label="设置时间" align="center"></el-table-column>
                                    <el-table-column prop="operatorName" label="设置人" align="center" ></el-table-column>
                                </el-table>

                            </div>
                        </el-form>
                    </div>
                    <div class="goods-fitter" style="margin-top:20px;">
                        <div class="menu">
                            <p>项目VIP价调整</p>
                        </div>
                        <el-form ref="form" label-width="100px" size="small" :model="ruleFormVip">
                            <div class="search-wrapper" style="border: unset" >
                                <el-row>
                                    <el-col :span="12">
                                        <el-col>
                                            <el-form-item label="分类层级：">
                                                {{num}}级分类
                                            </el-form-item>
                                        </el-col>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-col>
                                            <el-form-item label="分类名称：">
                              <span v-if="catName&&catName!==''">
                                  {{catName}}
                              </span>
                                            </el-form-item>
                                        </el-col>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24">
                                        <el-col>
                                            <el-form-item label="调商城价：">
                                                <el-radio v-model="ruleFormVip.radioVip" label="0">上调</el-radio>
                                                <el-radio v-model="ruleFormVip.radioVip" label="1">下调</el-radio>
                                            </el-form-item>
                                        </el-col>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-col :span="23">
                                            <el-form-item label="比例调价：">
                                                <el-input type="number" v-model="ruleFormVip.priceAdjustmenVip" placeholder="请输入内容"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="1" style="line-height: 32px;">
                                            %
                                        </el-col>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-col :span="12">
                                            <el-form-item label="增减调价：">
                                                <el-select v-model="ruleFormVip.IncreaseDecreaseVip" placeholder="请选择">
                                                    <el-option label="+" value="0"></el-option>
                                                    <el-option label="-" value="1"></el-option>
                                                    <el-option label="*" value="2"></el-option>
                                                    <el-option label="/" value="3"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="6" class="el-input--small">
                                            <el-input style="margin: 0 5px;" type="number"  v-model="ruleFormVip.priceVip" placeholder="请输入内容"></el-input>
                                        </el-col>

                                        <el-col :span="2" style="line-height: 32px;margin: 0 5px;">
                                            {{ruleFormVip.IncreaseDecreaseVip==2||ruleFormVip.IncreaseDecreaseVip==3?"倍":"元"}}
                                        </el-col>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-col :span="23">
                                            <el-form-item label="分配项目：">
                                                <el-select v-model="ruleFormVip.projectId" placeholder="请选择分配项目" @change="handeleChangeVip">
                                                    <el-option
                                                            v-for="item in options"
                                                            :key="item.projectId"
                                                            :label="item.projectName"
                                                            :value="item.projectId"
                                                    ></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-col>
                                            <el-button type="primary" size="small" @click="confrimVip">确定</el-button>
                                        </el-col>
                                    </el-col>
                                </el-row>
                                <el-table  border  style="width: 100%" :data="cartListVip" @row-click="handlelineVip">
                                    <el-table-column prop="catName" label="分类名称" align="center"></el-table-column>
                                    <el-table-column  label="分类比例" align="center">
                                        <template slot-scope="scope" style="">
                             <span style="color: darkgoldenrod;" v-if="scope.row.vipAdjustPrice">{{scope.row.vipAdjustPrice.ratioAdjustMethod==0?'上调':'下调'}}{{parseInt(scope.row.vipAdjustPrice.ratioAdjustValue*100)}}%
                                 {{Symbol[scope.row.vipAdjustPrice.fluctuateAdjustMethod]}}{{scope.row.vipAdjustPrice.fluctuateAdjustValue}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="projectName" label="项目名称" align="center"></el-table-column>
                                    <el-table-column prop="operatorTime" label="设置时间" align="center"></el-table-column>
                                    <el-table-column prop="operatorName" label="设置人" align="center" ></el-table-column>
                                </el-table>
                            </div>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script>
	import { discountClassification,getProject,updateData ,conditionalQuery} from "@/api/product/index";
	import Treeselect from "@riophae/vue-treeselect";
	// import the styles
	import "@riophae/vue-treeselect/dist/vue-treeselect.css";
	export default {
		components: {
			Treeselect,
		},
		data() {
			return {
				//符号
				Symbol:["＋","－","×","÷"],
				ruleForm:{
					priceAdjustmen: '0', //调价比例
					radio: '0', //调价方式
					IncreaseDecrease: '0',//增减调价,
					price: '0',    //调的价格
					selectedItem: '', //分配的项目
                    projectId:'',
				},
				catName:'',  //分类名称
				ruleFormVip:{
					priceAdjustmenVip: '0', //调价比例
					radioVip: '0', //调价方式
					IncreaseDecreaseVip: '0',//增减调价,
					priceVip: '0',    //调的价格
					selectedItemVip: '', //分配的项目
                    projectId:'',
				},
				num: '一',
				options: [], //项目
				carArr1: [], //一级分类
				carArr2: [], //二级分类
				carArr3: [], //三级分类
				carId1: "", //一级分类id
				carId2: "", //二级分类id
				carId3: "", //三级分类id
				tabPosition: 'left',
				treeData: [],
                treeData1:[],
                treeData2:[],
				payType: '',  //项目
				payTypeVip: '', //vip 项目
				informationTabel: '',
				cartList:[],   //查询的列表
				cartListVip:[],
                num1:null,
                num2:null,
                num3:null,
                selectedItem:'',
                selectedItemVip:"",
                catId:''
			};
		},

		async mounted() {
			//  获取一级分类
			//获取项目
			const pageSize = 0;
			const res = await getProject(pageSize);
			if (res.code === 200) {
				this.options = res.data.list;
			}
		},
        methods: {
		    //普通分类得当前行数据
        handleline(row){
            this.ruleForm.priceAdjustmen =parseInt(row.adjustPrice.ratioAdjustValue*100)
            this.ruleForm.price =row.adjustPrice.fluctuateAdjustValue
            this.ruleForm.projectId = row.projectId;
	        this.handleProduct(this.ruleForm.projectId)
          },
        //普通分类得当前行数据
        handlelineVip(row){
            this.ruleFormVip.priceAdjustmenVip =parseInt(row.vipAdjustPrice.ratioAdjustValue*100)
            this.ruleFormVip.priceVip =row.vipAdjustPrice.fluctuateAdjustValue
	        this.ruleFormVip.projectId = row.projectId;
	        this.handeleChangeVip(this.ruleFormVip.projectId)
        },
        //根据条件查询
        async conditionalQuery(catId) {
            const res = await conditionalQuery(catId)
            if (res.code === 200){
                this.cartList = res.data.filter(item=>{
                    if((item.adjustPrice!==null)) {
                        return item
                    }
                })
                this.cartListVip=  res.data.filter(item=>{
                    if((item.vipAdjustPrice!==null)){
                        return item
                    }
                })
            }
        },
			//新增
			async priceAdjustment(obj, num=1) {
				const res = await updateData(obj)
				if (res.code === 200) {
                    this.$message.success(res.message)
					this.conditionalQuery(this.catId);

                    /*if(num=1){
	                    this.ruleForm.priceAdjustmen='0'
	                    this.ruleForm.price='0'
                    }else {
	                    this.ruleFormVip.priceAdjustmenVip='0'
	                    this.ruleFormVip.priceVip='0'
                    }*/
                   this._getCatagory2();
				}
			},
			//确认
			confrim() {
				if (this.selectedItem =='') {
					return this.$message('请选择项目')
				} else if (this.catId == '') {
					return this.$message('请选择分类')
				}
				if(!this.ruleForm.projectId){
                    return this.$message('请选择项目')
                }
                this.handleProduct(this.ruleForm.projectId)
				const obj = {
					projectId: this.selectedItem.projectId,
					catId: this.catId,
					projectName:this.selectedItem.projectName,
					catName:this.catName,
					adjustPrice: {
						ratioAdjustMethod: this.ruleForm.radio,
						ratioAdjustValue: this.ruleForm.priceAdjustmen/100,
						fluctuateAdjustMethod: this.ruleForm.IncreaseDecrease,
						fluctuateAdjustValue: this.ruleForm.price,
					},
					vipAdjustPrice: null
				}
				this.priceAdjustment(obj,1)
			},

			confrimVip() {
                console.log()
				if (this.selectedItemVip =='') {
					return this.$message('请选择项目')
				} else if (this.catId == '') {
					return this.$message('请选择分类')
				}
                if(!this.ruleFormVip.projectId){
                    return this.$message('请选择项目')
                }
                this.handeleChangeVip(this.ruleFormVip.projectId)
				const obj = {
					projectId: this.selectedItemVip.projectId,
					catId: this.catId,
					catName:this.catName,
					projectName:this.selectedItemVip.projectName,
					adjustPrice: null,
					vipAdjustPrice: {
						ratioAdjustMethod:  this.ruleFormVip.radioVip,
						ratioAdjustValue:this.ruleFormVip.priceAdjustmenVip/100,
						fluctuateAdjustMethod: this.ruleFormVip.IncreaseDecreaseVip,
						fluctuateAdjustValue: this.ruleFormVip.priceVip,
					}
				}
				this.priceAdjustment(obj,2)
			},
			//vip项目
			handeleChangeVip(val) {
				this.selectedItemVip = this.options.find(item => {
					return item.projectId == val;
				});
			},
            handleProduct(val) {
        	    console.log(val);
				this.selectedItem = this.options.find(item => {
					return item.projectId == val;
				});
			},

			//获取分类
			// carIdFunc(val, index, catName,data) {
			// 	this.catId = val
			// 	this.conditionalQuery(val)
			// 	this.catName = catName
			// 	if (index == 1) {
			// 		this.num = '一'
            //         this.num1 = data
            //         this.carArr2 = [];
			// 		this.carArr3 = [];
			// 	}
			// 	if (index == 2) {
			// 		this.num = '二'
            //         this.num2= data
			// 		this.carArr3 = [];
			// 	}
			// 	if (index == 3) {
            //         this.num3= data
			// 		this.num = '三'
			// 	}
			// 	this._getCatagory2(val, index);
			// },
            async _getCatagory2(){
                const result = await  discountClassification()
                if(result.code === 200 ){
                    this.treeData = result.data;

                    //更新2 3
                    if(this.treeData1.length>1){
                    	let parentId = this.treeData1[0].parentId;
	                    this.treeData.forEach(item=>{
		                    if(item.catId==parentId){
			                    this.treeData1=item.children
		                    }
	                    })
                    }
                    if(this.treeData2.length>1){
                    	let parentId = this.treeData2[0].parentId;
	                    this.treeData1.forEach(item=>{
		                    if(item.catId==parentId){
			                    this.treeData2=item.children
		                    }
	                    })
                    }
                }
            },
            carIdFunc(val, index, catName,data){
                	this.catId = val
                    this.catName = catName
                	this.conditionalQuery(val)
                if(index==1){
                    this.num1= data
                    this.num2=null
                    this.num3=null
                    this.num = '一'
                    this.treeData2=[]
                    this.treeData.forEach(item=>{
                        if(item.catId==val){
                            this.treeData1=item.children
                        }
                    })
                }else if(index==2){
                    this.treeData2=[]
                    this.num2= data
                    this.num3= null
                    this.num = '二'
                    this.treeData1.forEach(item=>{
                        if(item.catId==val){
                            this.treeData2=item.children
                        }
                    })
                }else if(index==3){
                    this.num3= data
                    this.num = '三'
                }

                this.ruleForm={
	                priceAdjustmen: '0', //调价比例
	                radio: '0', //调价方式
	                IncreaseDecrease: '0',//增减调价,
	                price: '0',    //调的价格
	                selectedItem: '', //分配的项目
	                projectId:'',
                }
                this.ruleFormVip={
	                priceAdjustmenVip: '0', //调价比例
	                radioVip: '0', //调价方式
	                IncreaseDecreaseVip: '0',//增减调价,
	                priceVip: '0',    //调的价格
	                selectedItemVip: '', //分配的项目
	                projectId:'',
                }

            },
			back() {
				this.$router.go(-1);
			}
		},
        created(){
		    this._getCatagory2()
        }
	};
</script>
<style lang="scss" scoped>
    @import "@/common/scss/variable.scss";
    .el-card{
        margin: 20px;
    }
    .el-input__inner{
        height:32px;
        line-height:32px;
    }
    .marginList .el-card .el-card__body .menu-tree .el-col-8 {
        width: 33%;
    }
    .menu{
        background: #fff;
        overflow: hidden;
    }
    .menu p{
        text-align: center;
        line-height: 50px;
    }
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
        /deep/.el-form{
            margin-top: -10px;
            width: 100%;
            background:rgba(255,255,255,1);
            border:1px solid rgba(214,222,239,1);
        }
        .menu{
            p{
                position: relative;
                top: 1px;
                background: white;
                border:1px solid rgba(214, 222, 239, 1) ;
                text-align: center;
                line-height: 46px;
                border-bottom: none;
                border-top: none;
                font-weight: 400;
                margin-bottom: 10px;
                font-size:16px;
                font-family:Microsoft YaHei;
                color:rgba(51,51,51,1);
                width:170px;
                height:46px;
            }
        }
        .search-wrapper {
            padding: 20px;
            border: 1px solid rgb(215, 224, 241);
            background: #fff;
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

    .form-divider {
        .el-divider {
            height: 550px;
        }
    }
    .location {
        position: relative;
        top: 9px;
    }
    .menu .el-tabs {
        padding-top: 0 !important;
    }
    .el-tabs--left .el-tabs__header.is-left{
        width: 33.33333% !important;
    }
    .menu .el-tabs__nav-scroll {
        width: 100%;
    }
    .menu{
        width: 97%;
        .menuItem{
            font-size:16px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
            width:100%;
            height:46px;
            text-align: center;
            line-height: 46px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(215,225,241,1);
            border-bottom:none ;
            div{
                display: inline-block;
                width: 33.33333%;
            }
        }
        .menuList{
            background:rgba(255,255,255,1);
            border:1px solid rgba(214,222,239,1);
        }
        /deep/.el-tabs__header.is-left{
            width: 33.33333%;
            margin: 0;
        }
        /deep/.el-tabs__content .el-tabs__header.is-left {
            width: 50%;
            margin: 0;
        }
        /deep/.el-tabs__content .el-tabs__content .el-tabs__header.is-left {
            width: 100%;
            margin: 0;
        }
        /deep/.el-tabs__nav-scroll{
            width: 170px;
            text-align: center;
            width: 100%;
        }
        /deep/.el-tabs__item{
            text-align: center;
            padding: 0;
        }
        /deep/.el-tabs__item{
            font-size:14px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(60,60,60,1);
        }
        /deep/.is-active{
            background: rgba(76, 134, 244, 1);
            font-size:14px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(255,255,255,1);
        }
        /deep/.el-tabs{
            padding-top:20px ;
        }
        /deep/.menuItem{
            border-bottom: none;
            border-top:none;
            position: relative;
            top: 1px;
        }
        /deep/.menu-tree .el-col-10{
            overflow: auto;
        }
        /deep/.search-wrapper{
            padding: 0;
        }
        /deep/.el-col{
            width: 50%;
        }
        /deep/.el-col-8{
            width: 50%;
        }
        /deep/.el-card__body{

        }
    }
    .menuContainer{
        .menuWraps{
            margin-top: 20px;
            border-left: 1px solid #E4E7ED;
            border-right: 1px solid #E4E7ED;
            .menuLists{
                padding: 5px 0;
                margin: 5px 0;
                cursor: default;
                text-align: center;
                font-size: 14px;
                color: #333;
                &.activ{
                    background: #4386F4;
                    color:white;
                }
            }
        }
    }
.liList{
    width: 100%;
    padding: 0 10px;
    display: flex;
    .liListWid{
        display: inline-block;
        width: 50%;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .liListborder{
        padding: 0 10px;
        border: 1px solid #ccc;
    }
}
</style>
