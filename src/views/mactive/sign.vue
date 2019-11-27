<template>
			<el-container class="dx_oiu_err">
		<el-aside>
			<navbar type="3"></navbar>
		</el-aside>
		<el-main class="make_ticket_steps">
            <section class="guide">
    <el-row :gutter="20">
        <el-col :span="20">
    <img src="@/common/images/libao.svg" class="ssd_hjh_der fl">
            <section class="ov pl20">
                <p class="cf fz26 mt20">签到有礼功能</p>
                <p class="mt20 cf fz15 dsf_drt">
            1.设计奖励规则提高用户活跃度 <br>
                    2.刺激用户的签到习惯，间接带动商城营收
                </p>
        
            </section>
            
            <p class="qc"></p>
    
    </el-col>
     <el-col :span="4">
    
        <el-button class="sd_j_dert mt50">创建签到有礼</el-button>
    </el-col>
    </el-row>
            </section>
            
            
    </el-main>
    </el-container>

</template>
<script>
         import navbar from "./components/navbar"
    export default {
        data() {
            return {

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
    .guide{
    height: 240px;
    margin: 0 auto;
    background-color: #4386f4;
    -ms-flex-pack: justify;
    justify-content: space-between;
        padding-top: 50px
    }
    .ssd_hjh_der{
            margin-left: 76px;
    width: 246px;
    height: 160px;
    }
    .dsf_drt{
        line-height: 1.5
    }
    .sd_j_dert{
            font-size: 20px;
    color: #4386f4;
    }
</style>
