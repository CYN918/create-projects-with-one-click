<!--大转盘-->
<template>
		<el-container class="dx_oiu_err">
		<el-aside>
			<navbar type="1"></navbar>
		</el-aside>
		<el-main class="make_ticket_steps"> 
            <section class="ibox-content ">
                    <el-row :gutter="20">
                        <el-col :span="12">
                                <el-button type="primary" @click="hf('/mactive/create_turnplate')">创建</el-button>
                        </el-col>
                       <el-col :span="12" class="tr">
                    <el-button type="primary" @click="hf('/mactive/admin_code')">码池管理</el-button>
                    </el-col>
                    </el-row>
                
                <el-table class="mt20" :data="tableData" style="width: 100%" highlight-current-row>
                					<el-table-column prop="activity_name" label="活动名称" ></el-table-column>
                    		<el-table-column prop="activity_number" label="活动编号" ></el-table-column>
                    		<el-table-column prop="starting_time" label="起始时间" ></el-table-column>
                    		<el-table-column prop="end_time" label="结束时间" ></el-table-column>
                    		<el-table-column prop="active_orders" label="活动订单" ></el-table-column>
                    		<el-table-column prop="active_state" label="活动状态" ></el-table-column>
                    		<el-table-column prop="participants_number" label="参与人数" ></el-table-column>
              
                    <el-table-column label="操作" width="250">
                						<template slot-scope="scope">
                							<el-button type="text" size="small" >结束</el-button> | 
                                            <el-button type="text" size="small" >链接</el-button> | 
                                            <el-button type="text" size="small" >编辑</el-button> | 
                                            <el-button type="text" size="small" >获奖名单</el-button> 
                          
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
                        activity_name:"超级大转盘",//活动名称
                         activity_number:"676",//活动编号
                         starting_time:"2019-03-08 20:04:06",//起始时间
                         end_time:"2019-03-11 20:04:06",//结束时间
                         active_orders:"0",//活动订单
                         active_state:"进行中",//活动状态
                        participants_number :"0"//参与人数
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

        }
    }
</script>
<style scoped>

</style>
