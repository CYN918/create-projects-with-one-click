<template>
		<el-container class="dx_oiu_err">
		<el-aside>
			<navbar type="4"></navbar>
		</el-aside>
		<el-main class="make_ticket_steps">
            <section class="ibox-content ">
                <section>
                <el-button type="primary" class="pl40 pr40" @click="hf('/mactive/edit')">创建</el-button>
                </section> 
                
                <el-table class="mt20" :data="tableData" style="width: 100%" highlight-current-row>
                					
                					<el-table-column prop="activity_id" label="活动ID" ></el-table-column>
                    <el-table-column prop="name_gift" label="礼品名称" ></el-table-column>
                    <el-table-column prop="amount_receivable" label="可领取总数" ></el-table-column>
                    <el-table-column prop="have_several" label="已领取数" ></el-table-column>
                    <el-table-column prop="did_number" label="未领取数" ></el-table-column>
                    <el-table-column prop="starting_time" label="开始时间" ></el-table-column>
                    <el-table-column prop="end_time" label="结束时间" ></el-table-column>
                    <el-table-column prop="state" label="状态" ></el-table-column>
                    
                    <el-table-column label="操作">
                						<template slot-scope="scope">
                							<el-button type="text" size="small" >编辑</el-button> |
                                            
                                            
                                            <el-popover
                     trigger="hover"                                  
  placement="bottom"
         width="225">
                <section class=" cen   mt10">
                
               <img src="https://api.qrserver.com/v1/create-qr-code/?data=https://jifen.fxqifu.com/1001716/activitys/gift/api_gift/referer_url/23" class="w100">
            </section>
            <section class="fz12 cen mt5">微信扫一扫</section>
           <section class="sd_khj_ind mt10">    
               <el-input placeholder="" value="https://jifen.fxqifu.com/1001716/activitys/gift/api_gift/referer_url/23" disabled  ></el-input>
    </section>    
                                                
      <el-row  class="mt5">
          <el-col :span="10">    <el-button type="primary" size="small">复制</el-button> </el-col>
       <el-col :span="14" class="tr">
           <a class="el-button el-button--primary el-button--small" href="https://jifen.fxqifu.com/1001716/activitys/gift/api_gift/referer_url/23" target="_blank" download="w3logo">下载二维码</a>
    </el-col>
      </el-row>
                                                
 
    <el-button type="text"   slot="reference">链接</el-button>
</el-popover>
                                            
                                            
                                            
                                        |     <el-button type="text" size="small" >领取记录</el-button> 
                          
                						</template>
                                    </el-table-column>     
                    </el-table>
                
                    
                   </section>
            
            
    </el-main>
    </el-container>
</template>
<script>
       import navbar from "./components/navbar"
    export default {
        data() {
            return {
                tableData:[
                    {
                        activity_id:"23",//活动ID
                         name_gift:"活动标题",//礼品名称
                        amount_receivable :"2222",//可领取总数
                         have_several:"0",//已领取数
                         did_number:"2222",//未领取数
                         starting_time:"2019-03-08 20:06:34",//开始时间
                         end_time:"2019-03-15 20:06:33",//结束时间
                        state :"进行中"//状态
                        
                    }
                ]
            }
        },
        components: {
                navbar
        },
        methods: {
			
        },
        mounted() {
        },
    }

</script>
<style scoped>


</style>
