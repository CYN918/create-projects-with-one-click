<!--商品弹出层-->

<template>
<div >

    <section class="box">

        <section class="box_a sz dsfg_Sd_sdf" :class="sd.cls" v-for="sd in sd_ddf">
            <img :src="sd.img" class="cz">
            <span class="ml10">{{sd.name}}</span>
        </section>
        
        
     

    
    </section>
    
    
       <el-row class="mt20 sdf_sddf_deret">
            <el-col :span="9">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px"  class="demo-ruleForm">
            <el-form-item label="利润率："  prop="">
                       <span class="f_b sd_hh_dert">
                            <el-input  size="medium" placeholder="利润率开始"></el-input>
                        </span>
                <span class="ml10">至</span>
                  <span class="f_b sd_hh_dert ml10">
                            <el-input  size="medium"  placeholder="利润率结束"></el-input>
                        </span>
                
                
             </el-form-item>    
             <el-form-item label="会员价："  prop="">
                       <span class="f_b sd_hh_dert">
                            <el-input  size="medium" placeholder="利润率开始"></el-input>
                        </span>
                <span class="ml10">至</span>
                  <span class="f_b sd_hh_dert ml10">
                            <el-input  size="medium" placeholder="利润率结束"></el-input>
                        </span>
                
                
             </el-form-item> 
            
             <el-form-item label="市场价："  prop="">
                       <span class="f_b sd_hh_dert">
                            <el-input  size="medium" placeholder="利润率开始"></el-input>
                        </span>
                <span class="ml10">至</span>
                  <span class="f_b sd_hh_dert ml10">
                            <el-input  size="medium"  placeholder="利润率结束"></el-input>
                        </span>
                
                
             </el-form-item> 
                         </el-form>
                
    
    </el-col>
            <el-col :span="12">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px"  class="demo-ruleForm">
                <el-form-item label="分类"  prop="">
        
                           <el-select v-model="user_type" class="sd_ddeert"  placeholder="一级分类">
                                    <el-option label="服饰鞋帽" value="1"></el-option>
                                    <el-option label="生鲜水果" value="2"></el-option>
                                    <el-option label="精品生活" value="3"></el-option>
                        </el-select> 
                    
                    
                            <el-select v-model="user_type" class="sd_ddeert ml10"  placeholder="二级分类">
                                    <el-option label="服饰鞋帽" value="1"></el-option>
                                    <el-option label="生鲜水果" value="2"></el-option>
                                    <el-option label="精品生活" value="3"></el-option>
                        </el-select> 
                    
                    <span class="ml20">排序</span>
                    
                         <el-select v-model="user_type" class="sd_ddeert ml10 ab"  placeholder="按时间倒序">
                                    <el-option label="按时间倒序" value="1"></el-option>
                                    <el-option label="按利润率从大到小" value="2"></el-option>
                                    <el-option label="按会员价从小到大" value="3"></el-option>
                                  <el-option label="按会员价从大到小" value="4"></el-option>
                        </el-select> 
                    
                    
                       
                    
                    
                 </el-form-item> 
                
                    <el-form-item label="会员价："  prop="">
                       
                            <el-select v-model="user_type"   class="sd_ddeert" placeholder="按商品名称">
                                        <el-option label="按商品名称" value="1"></el-option>
                                        <el-option label="按商品id" value="2"></el-option>
                                        <el-option label="按SKUID" value="3"></el-option>
                            </el-select> 
                        <span class="f_b sd_ddff ml10">
                                <el-input  placeholder="请输入关键字"></el-input>
                        </span>
                        
                        <el-checkbox label="1" class="ml20">仅看未挑选</el-checkbox>
                
                    </el-form-item> 
                
                
                   <el-form-item label="地区："  prop="">
                       
                            <el-select v-model="user_type"   class="sd_ddeert" placeholder="北京 ">
                                        <el-option label="北京 " value="1"></el-option>
                                        <el-option label="北京 " value="2"></el-option>
                                        <el-option label="北京 " value="3"></el-option>
                            </el-select> 
                          <el-checkbox label="1" class="ml20">只看有货</el-checkbox>
                       
                       <el-button type="primary"  class="pl40 pr40 ml40" size="medium">查询</el-button>
                
                    </el-form-item> 
                
                
            </el-form>
        
    
            </el-col>
        </el-row>
    
    
    <el-table class="mt20 sdf_sd_deer" :data="tableData" style="width: 100%" >
        
        
           <el-table-column
      type="selection"
      width="55"> 
    </el-table-column>
        
        
         <el-table-column label="商品名称" width="280" >
            	<template slot-scope="scope">
                            <img :src="scope.row.product_name.img_s" class="sd_jj_de fl">
                            <section class="ov pl20 dsf_dd_deer">
                                {{scope.row.product_name.title}}
                                
                                <p class="ye mt10">
            {{scope.row.product_name.laiyuan}}
            </p>
    
    </section>
                            
                            <p class="qc"></p>
                        </template>
        
            </el-table-column>
         <el-table-column prop="member_price" label="会员价" ></el-table-column>
         <el-table-column prop="distribution_price" label="分销价" ></el-table-column>
         <el-table-column prop="sales_price" label="销售价" ></el-table-column>
         <el-table-column prop="market_price" label="市场价" ></el-table-column>
         <el-table-column prop="profit_margin" label="利润率" ></el-table-column>
                   
    </el-table-column>
    </el-table>


<section class="mt20 tr">
    <span>已挑选 <span class="red">0</span> 件商品</span>
    <el-button type="primary" size="medium" class="ml20" @click="$emit('close')" >确定挑选</el-button>
    <el-button type="primary" size="medium"  plain class="pl30 pr30" @click="$emit('close')">取消</el-button>
</section>
    

</div>
</template>
<script>
    export default {
        data() {
            return {
                sd_ddf: [{
                    img: "//store.fxqifu.com/statics/img/tab_icon/jd.png",
                    name: "京东商品",
                    cls: "act"
                }, {
                    img: "//store.fxqifu.com/statics/img/tab_icon/sn.png",
                    name: "苏宁商品",
                    cls: ""
                }, {
                    img: "//store.fxqifu.com/statics/img/tab_icon/global_purchase.png",
                    name: "全球购",
                    cls: ""
                }, {
                    img: "//store.fxqifu.com/statics/img/tab_icon/xn.png",
                    name: "虚拟商品",
                    cls: ""
                }, {
                    img: "//store.fxqifu.com/statics/img/tab_icon/jx.png",
                    name: "精选商品",
                    cls: ""
                }, {
                    img: "//store.fxqifu.com/statics/img/tab_icon/zy.png",
                    name: "自有商品",
                    cls: ""
                }, {
                    img: "//store.fxqifu.com/statics/img/tab_icon/self.png",
                    name: "自有供应商商品",
                    cls: ""
                }, {
                    img: "//store.fxqifu.com/statics/img/tab_icon/yx.png?v=1",
                    name: "网易严选商品",
                    cls: ""
                }],
                tableData: [{
                    product_name: {
                        img_s: "http://img10.360buyimg.com/n1/jfs/t1/16036/40/2777/311384/5c20a78eE4d8775c0/750d02d18e6ed30e.jpg",
                        title: "韩国原装进口 ZEK 辣炒年糕条 85g",
                        laiyuan:"京东"
                    }, //商品名称
                    member_price: "368.33", //会员价
                    distribution_price: "372.01", //分销价
                    sales_price: "745 1", //销售价
                    market_price: "659.00", //市场价
                    profit_margin: "44.11%", //利润率
                },{
                    product_name: {
                        img_s: "http://img10.360buyimg.com/n1/jfs/t1/16036/40/2777/311384/5c20a78eE4d8775c0/750d02d18e6ed30e.jpg",
                        title: "韩国原装进口 ZEK 辣炒年糕条 85g",
                        laiyuan:"京东"
                    }, //商品名称
                    member_price: "368.33", //会员价
                    distribution_price: "372.01", //分销价
                    sales_price: "745 1", //销售价
                    market_price: "659.00", //市场价
                    profit_margin: "44.11%", //利润率
                },{
                    product_name: {
                        img_s: "http://img10.360buyimg.com/n1/jfs/t1/16036/40/2777/311384/5c20a78eE4d8775c0/750d02d18e6ed30e.jpg",
                        title: "韩国原装进口 ZEK 辣炒年糕条 85g",
                        laiyuan:"京东"
                    }, //商品名称
                    member_price: "368.33", //会员价
                    distribution_price: "372.01", //分销价
                    sales_price: "745 1", //销售价
                    market_price: "659.00", //市场价
                    profit_margin: "44.11%", //利润率
                },{
                    product_name: {
                        img_s: "http://img10.360buyimg.com/n1/jfs/t1/16036/40/2777/311384/5c20a78eE4d8775c0/750d02d18e6ed30e.jpg",
                        title: "韩国原装进口 ZEK 辣炒年糕条 85g",
                        laiyuan:"京东"
                    }, //商品名称
                    member_price: "368.33", //会员价
                    distribution_price: "372.01", //分销价
                    sales_price: "745 1", //销售价
                    market_price: "659.00", //市场价
                    profit_margin: "44.11%", //利润率
                },{
                    product_name: {
                        img_s: "http://img10.360buyimg.com/n1/jfs/t1/16036/40/2777/311384/5c20a78eE4d8775c0/750d02d18e6ed30e.jpg",
                        title: "韩国原装进口 ZEK 辣炒年糕条 85g",
                        laiyuan:"京东"
                    }, //商品名称
                    member_price: "368.33", //会员价
                    distribution_price: "372.01", //分销价
                    sales_price: "745 1", //销售价
                    market_price: "659.00", //市场价
                    profit_margin: "44.11%", //利润率
                },{
                    product_name: {
                        img_s: "http://img10.360buyimg.com/n1/jfs/t1/16036/40/2777/311384/5c20a78eE4d8775c0/750d02d18e6ed30e.jpg",
                        title: "韩国原装进口 ZEK 辣炒年糕条 85g",
                        laiyuan:"京东"
                    }, //商品名称
                    member_price: "368.33", //会员价
                    distribution_price: "372.01", //分销价
                    sales_price: "745 1", //销售价
                    market_price: "659.00", //市场价
                    profit_margin: "44.11%", //利润率
                }]
            }
        },
        components: {},
        methods: {

        },
        mounted() {

        },
    }

</script>
<style>
    .sdf_sddf_deret .el-form-item {
        margin-bottom: 15px !important
    }

</style>
<style scoped>
    .dsfg_Sd_sdf.act span {
        color: #4386F4
    }

    .sd_hh_dert {
        width: 150px;
    }

    .sd_ddeert {
        width: 110px
    }

    .sd_ddeert.ab {
        width: 160px;
    }
    
       .sd_jj_de{
        width: 60px;
        height: 60px;
    }
    .sd_deertx{
        width: 100px;
    }
    .dsf_dd_deer{
        
        line-height: 1.2
    }
    .sdf_sd_deer{
        height: 500px;
        overflow: auto
    }

</style>
