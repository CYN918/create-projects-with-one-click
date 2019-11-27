<!--礼品弹出层-->
<template>
<div >

      <el-tabs class="tihg_eret">
    <el-tab-pane label=" 虚拟商品 "> 
    
        <section class="ibox-content">
    
                  <el-row class="mt20 sdf_sddf_deret">
            <el-col :span="9">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px"  class="demo-ruleForm">
            <el-form-item label="会员价："  prop="">
                       <span class="f_b sd_hh_dert">
                            <el-input  size="medium" placeholder="最低价"></el-input>
                        </span>
                <span class="ml10">至</span>
                  <span class="f_b sd_hh_dert ml10">
                            <el-input  size="medium"  placeholder="最高价"></el-input>
                        </span>
                
                
             </el-form-item>    
             <el-form-item label="市场价："  prop="">
                       <span class="f_b sd_hh_dert">
                            <el-input  size="medium" placeholder="最低价"></el-input>
                        </span>
                <span class="ml10">至</span>
                  <span class="f_b sd_hh_dert ml10">
                            <el-input  size="medium" placeholder="最高价"></el-input>
                        </span>
                
                
             </el-form-item> 
            
             <el-form-item label="利润率："  prop="">
                       <span class="f_b sd_hh_dert">
                            <el-input  size="medium" placeholder="最低"></el-input>
                        </span>
                <span class="ml10">至</span>
                  <span class="f_b sd_hh_dert ml10">
                            <el-input  size="medium"  placeholder="最高"></el-input>
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
                
                    <el-form-item label="关键字："  prop="">
                       
                            <el-select v-model="user_type"   class="sd_ddeert" placeholder="按商品名称">
                                        <el-option label="按商品名称" value="1"></el-option>
                                        <el-option label="按商品id" value="2"></el-option>
                                        <el-option label="按SKUID" value="3"></el-option>
                            </el-select> 
                        <span class="f_b sd_ddff ml10">
                                <el-input  placeholder="请输入关键字"></el-input>
                        </span>
                        
                      <el-button type="primary"  class="pl40 pr40 ml40" size="medium">查询</el-button>
                    </el-form-item> 
                
                
                
                       <el-form-item label=""  prop="">
                       
                            <el-select v-model="user_type"   class="sd_ddeert" placeholder="选择排序">
                                 <el-option label="时间倒序" value="1"></el-option>
                                        <el-option label="利润率倒序" value="1"></el-option>
                                        <el-option label="会员价低到高" value="2"></el-option>
                                        <el-option label="会员价高到低" value="3"></el-option>
                            </el-select> 
                    </el-form-item> 
                
                
                
                
                
            </el-form>
        
    
            </el-col>
        </el-row>
    
            
            
                <el-table class="mt20 sdf_sd_deer" :data="tableData" style="width: 100%" >
        
        
        
        
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

<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button type="text" size="small">选择</el-button>
						</template>
</el-table-column>
    </el-table>



    
        </section>
        
    </el-tab-pane>
            
  </el-tabs>



<section class="mt20 tr">
    <el-button type="primary" size="medium"  plain class="pl30 pr30" @click="$emit('close')">取消</el-button>
</section>
    


</div>
</template>
<script>
    export default {
        data() {
            return {
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
        components: {

        },
        methods: {

        },
        mounted() {

        },
    }

</script>
<style scoped>
 .dsfg_Sd_sdf.act span {
        color: #4386F4
    }

    .sd_hh_dert {
        width: 150px;
    }

    .sd_ddeert {
        width: 130px
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
