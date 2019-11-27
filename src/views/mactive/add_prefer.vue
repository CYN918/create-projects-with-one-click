<!--创建活动-->
<template>
<div class="pd pt10">

    <section class="ibox-content ">
            <p class="my-top-title">基础信息</p>
            
        <section class="sd_df_dert">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px"  class="demo-ruleForm">
                    <el-form-item label="活动名称"  prop="">
                                <el-input  placeholder="填写活动名称，20字内（仅在后台可见）"></el-input>
                     </el-form-item>  
                     <el-form-item label="开始时间"  prop="">
                               <el-date-picker
                            class="w100"
      v-model="value1"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
                     </el-form-item> 
                    
                     <el-form-item label="结束时间"  prop="">
                               <el-date-picker
                            class="w100"
      v-model="value1"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
                     </el-form-item> 
                    
                    
                          <el-form-item label="每人限购"  prop="" class="pr">
                                <el-input  placeholder="用户在此活动中，单件商品每人限购数"></el-input>
                              <span class="jian_dert">件</span>
                     </el-form-item> 
                    
                    
                      <el-form-item label="总限购"  prop="" class="pr">
                                <el-input  placeholder="用户在此活动中，所有商品每人限购数"></el-input>
                              <span class="jian_dert">件</span>
                     </el-form-item>  
                    
                    
                     <el-form-item label="原价"  prop="">
                                <el-radio label="1">显示</el-radio>
                         
                           <el-radio label="1">不显示</el-radio>
                     </el-form-item>  
                    
                    <el-form-item label="显示倒计时"  prop="">
                                <el-radio label="1">显示</el-radio>
                         
                           <el-radio label="1">不显示</el-radio>
                     </el-form-item>  
                    
                    
                              
                     <el-form-item label="顶部图片"  prop="">
                              <section class="fl sd_khj_dsdf  br">
                                <img :src="imh_sd" v-if="imh_sd"> 
                                </section>
                         <section class="sd_jhsdf ov pl20">
                    <p class="ls fz12" >图片建议尺寸：750px*220px，大小不超过500kb</p>
                             
                             <section class="mt15">
                <el-button type="primary"  class="pl40 pr40" size="medium" @click="dialogVisible=true">选择</el-button>
                                  <el-button type="primary" size="medium" class="pl40 pr40 ml20" @click="imh_sd=''">删除</el-button>
                            </section>      
                             
                            </section>
                         
                         <p class="qc"></p>
                         
                     </el-form-item>  
                    
                    
                    
                    
                </el-form>
    
        </section>
        
    </section>

    
    <section class="ibox-content mt20">
              
    <el-row>
        <el-col :span="12">
                  <section class="my-top-title"> 活动商品   </section>
        </el-col>
        <el-col :span="12" class="tr">
    
                <el-button type="primary"  size="medium" @click="dialogVisible_b=true">+ 新增商品
        </el-button>
            </el-col>
    </el-row>
        
        <section class="ibox-content mt20">
    
        <el-table class="" :data="tableData" style="width: 100%" highlight-current-row>
            
        			
            	<el-table-column  label="商品名称" width="240">
                    	<template slot-scope="scope">
                            <img :src="scope.row.product_name.img_s" class="sd_jj_de fl">
                            <section class="ov pl10">{{scope.row.product_name.title}}</section>
                            
                            <p class="qc"></p>
                        </template>
    
                </el-table-column>
            		<el-table-column label="库存" width="140" >
                            <template slot-scope="scope">
                                <el-input  v-model="scope.row.repertory" ></el-input>
                             </template>

                        </el-table-column>
            	<el-table-column prop="member_price" label="会员价" ></el-table-column>
            	<el-table-column prop="distribution_price" label="分销价" ></el-table-column>
            	<el-table-column prop="sales_price" label="销售价" ></el-table-column>
            	<el-table-column width="310" label="活动价" >
                             <template slot-scope="scope">
                                ￥ 
                           <span class="f_b sd_deertx"> 
                                <el-input  v-model="scope.row.activity_price.sajh_a" ></el-input>
                            </span>  +
                            <span class="f_b sd_deertx"> 
                                <el-input  v-model="scope.row.activity_price.sajh_b" ></el-input>
                            </span>

1


                             </template>


                    </el-table-column>
            	<el-table-column  label="排序值" width="140">

                              <template slot-scope="scope">
                                <el-input  v-model="scope.row.order_value" ></el-input>
                             </template>
            </el-table-column>
                       
        					<el-table-column label="操作">
        						<template slot-scope="scope">
        							<el-button type="text" size="small">移除</el-button>
        						</template>
        </el-table-column>
        </el-table>
    </section>
             
      <section class="mt40">
            <el-button type="primary" class="pl40 pr40" >保存</el-button>
    </section>


    </section>
    
    
    <el-dialog class="sddf_drrt" title="提示" :visible.sync="dialogVisible" width="880px">
        <up_img @queding="queding" @close_s="dialogVisible=false"></up_img>
    </el-dialog>


    <el-dialog class="sddf_drrt sdf_d_SDeder" title="提示" :visible.sync="dialogVisible_b" width="1200px">
        <commodity @close="dialogVisible_b=false"></commodity>
    </el-dialog>
    
</div>
</template>
<script>
    import up_img from "../plugIn/components/up_img"
    import commodity from "./components/commodity"
    export default {
        data() {
            return {
                dialogVisible: false,
                dialogVisible_b:false,
                imh_sd: "",
                tableData:[
                    {
                        product_name:{ img_s:"http://img10.360buyimg.com/n1/jfs/t1/16036/40/2777/311384/5c20a78eE4d8775c0/750d02d18e6ed30e.jpg",
                            title:"韩国原装进口 ZEK 辣炒年糕条 85g"
                        },//商品名称
                        repertory:"",//库存
                        member_price:"￥5.84",//会员价
                        distribution_price:"￥7.20",//分销价
                        sales_price:"14 1",//销售价
                        activity_price:{
                            sajh_a:"",
                             sajh_b:""
                        },//活动价
                        order_value:""//排序值
                    }
                ]
            }
        },
        components: {
            up_img,
            commodity
        },
        methods: {
            queding(url) {
                if (!url) {
                    this.$message({
                        message: '请选择一张图片',
                        type: 'error'
                    });
                    return
                }
                this.dialogVisible = false
                this.imh_sd = url
            }
        },
        mounted() {

        },
    }

</script>
<style>
    .sdf_d_SDeder .el-dialog{
            margin-top: 5vh !important;
    }
</style>
<style scoped>
    .sd_df_dert {
        width: 800px;
        margin-top: 20px;
    }

    .jian_dert {
        position: absolute;
        right: 10px;
        top: 0px;
    }

    .sd_khj_dsdf {
        width: 198px;
        height: 98px;
        border-radius: 4px;
    }

    .sd_khj_dsdf img {
        width: 100%;
        height: 100%;
    }
    .sd_jj_de{
        width: 60px;
        height: 60px;
    }
    .sd_deertx{
        width: 100px;
    }

</style>
