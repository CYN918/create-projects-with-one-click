<template>


    	<el-container class="dx_oiu_err">
		<el-aside>
			<navbar type="1"></navbar>
		</el-aside>
		<el-main class="make_ticket_steps"> 
            <section class="ibox-content ">
                <el-button type="primary"  >导入兑换码</el-button>
                
                <section class="mt20 fz14">
                    <span>领奖时间：</span>
                    <el-date-picker
                            v-model="value6"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    <span class="ml20">状态：</span>
                        <el-select v-model="user_static"   placeholder="全部" class="dsf_kjj_der">
                                    <el-option label="全部" value="1"></el-option>
                                    <el-option label="未使用" value="2"></el-option>
                                    <el-option label="已使用" value="3"></el-option>
                               <el-option label="已核销" value="4"></el-option>
                        </el-select> 
                    
                     <span class="ml20">关键字：</span>
                    
                  <section class="f_b sdf_deer">
        <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
    <el-select v-model="select_er" slot="prepend" placeholder="请选择" class="Sd_deert">
      <el-option label="餐厅名" value="1"></el-option>
      <el-option label="订单号" value="2"></el-option>
      <el-option label="用户电话" value="3"></el-option>
    </el-select>
  </el-input>
    </section>
                    
                    <el-button type="primary" class="ml40 pl40 pr40" >查询</el-button>
                    <span class="ml20 ls">
              导出当前数据
            </span>
                    
                    
                </section>
                
                <el-table class="mt20" :data="tableData" style="width: 100%" highlight-current-row>
                    
                    
                    	<el-table-column  type="index" label="序号" ></el-table-column>
                       <el-table-column prop="redeem_code" label="兑换码" ></el-table-column>
                    	<el-table-column prop="bind_user_ID" label="绑定用户ID" ></el-table-column>
                    	<el-table-column prop="phone" label="手机号" ></el-table-column>
                    	<el-table-column prop="source_activity" label="来源活动" ></el-table-column>
                    	<el-table-column prop="hours_use" label="使用时间" ></el-table-column>
                    	<el-table-column prop="cancel_time" label="核销时间" ></el-table-column>
                    	<el-table-column prop="import_time" label="导入时间" ></el-table-column>
                    	<el-table-column prop="verification_people" label="核销人" ></el-table-column>
                    	<el-table-column prop="state" label="状态" ></el-table-column>
                               
                				
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
                value6: "",
                user_static:"1",
                input5:"",
                select_er:"1",
                tableData:[
                    {
                        redeem_code:"兑换码",//兑换码
                         bind_user_ID:"1236544",//绑定用户ID
                         phone:"13538183072",//手机号
                        source_activity :"来源活动",//来源活动
                         hours_use:"2019-12-12 12:12:12",//使用时间
                        cancel_time :"2019-12-12 12:12:12",//核销时间
                        import_time :"2019-12-12 12:12:12",//导入时间
                         verification_people:"独行",//核销人
                        state :"状态",//状态
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
    .dsf_kjj_der{
        width: 150px !important;
    }
    .sdf_deer{
        width: 310px;
}
    .Sd_deert{
width: 100px;
    }

</style>
