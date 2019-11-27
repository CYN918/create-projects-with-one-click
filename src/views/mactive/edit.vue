<template>
		<el-container class="dx_oiu_err">
		<el-aside>
			<navbar type="4"></navbar>
		</el-aside>
		<el-main class="make_ticket_steps">
            
            <section class="ibox-content ">
            <section class="pr dsf_jh_dert fl">
                <img src="@/common/images/dispatch_gift.ab16984.png" class="fm">
                <section class="sd_kjjh_dert">
                        <p class="cen cf  mt30 dian sdf_deerx">
                                {{ruleForm.activity_title}}
                        </p>
                    <section class="sp_sd_dfg cen">
                        <img src="http://img.packeding.cn/8bc36f6a205aeafe2a2fe6b11164fef9?x-oss-process=image/quality,q_80" class="ssd_ddf_DSert">
                        <p class="dian mt10 fz15">
            搜狐视频 黄金会员季卡
                        </p>
                    </section>
                    <section class="cen mt50 z9">
    
                {{ruleForm.validity[0]|time_er}}  至 <br> {{ruleForm.validity[1]|time_er}}
                </section>
                   <section class="sd_drfrxdxr">
{{ruleForm.activity_description}}
                </section>
                    
                    
                </section>
            </section>
                <section class="ov pl20 pt10 pm10 pd">
                    <section class="sd_jh_dertert">
    
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"  class="demo-ruleForm sdf_deert">
                            <el-form-item label="活动标题"  prop="activity_title">
                                           <el-input  v-model="ruleForm.activity_title"  placeholder="请输入30个以内的字符"></el-input>
                             </el-form-item>  
                            
                             <el-form-item label="有效期"  prop="">
                                          <el-date-picker
                                                 class="w100"
                                                  v-model="ruleForm.validity"
                                                  type="datetimerange"
                                                  range-separator="至"
                                                  start-placeholder="开始日期"
                                                  end-placeholder="结束日期">
                                              </el-date-picker>
                             </el-form-item> 
                            
                                 <el-form-item label="活动说明"  prop="activity_description">
                                           <el-input type="textarea" v-model="ruleForm.activity_description" rows="4"  placeholder="请输入200个以内的字符"></el-input>
                             </el-form-item>  
                            
                            
                                  <el-form-item label="礼品选择"  prop="">
                                          <span class="f_b lib_dsder">
                                         <el-input disabled   placeholder="未选择"></el-input>
                                        </span>
                                      <el-button type="primary" class="ml20" @click="dialogVisible=true">选择礼品</el-button>
                                    <p class="z9 fz14">说明：您可从站点已选商品中选择礼品进行派发</p>
                                    </el-form-item>  
                            
                            
                                    <el-form-item label="领取总数"  prop="get_total_number">
                                           <el-input v-model="ruleForm.get_total_number" placeholder="请输入0-999999之间整数"></el-input>
         <p class="z9 fz14">说明：每位用户只可领取1次</p>                      
    </el-form-item>  
                            
                            
                            
                            
                            
                         </el-form>
    
                    </section>
                    
                    <p class="sd_jh_ddert">
            <el-button type="primary" @click="submitForm('ruleForm')" >保存</el-button>
                    </p>
    
                </section>
                
                
                <p class="qc"></p>
    
            </section>
            
            
        </el-main>
            
            <el-dialog class="sddf_drrt sdf_d_SDeder" title="提示" :visible.sync="dialogVisible" width="1300px">
                <liping @close="dialogVisible=false"></liping>
            </el-dialog>
            
    </el-container>

</template>
<script>
    import navbar from "./components/navbar"
        import liping from "./components/liping"
    export default {
        data() {
            return {
                dialogVisible:false,
                ruleForm: {
                    activity_title: "", //活动标题
                    validity: [], //有效期
                    activity_description: "", //活动说明
                    gift_choice: "", //礼品选择
                    get_total_number: "", //领取总数
                },
                rules: {
                    activity_title: [{
                        required: true,
                        message: '请输入30个以内的字符',
                        trigger: 'blur'
                    }],
                    activity_description: [{
                        required: true,
                        message: '请输入200个以内的字符',
                        trigger: 'blur'
                    }],
                    get_total_number: [{
                        required: true,
                        message: '请输入0-999999之间整数',
                        trigger: 'blur'
                    }],
                }
            }
        },
        components: {
            navbar,
            liping
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        mounted() {
            let ssd_df = new Date()
            this.ruleForm.validity.push(ssd_df.getTime())
            this.ruleForm.validity.push(ssd_df.getTime())
        },
        filters: { //过滤器   页面上调用{{dt.state|lei}}
            time_er(t) { 
                let time = new Date()
            time.setTime(t )
            let Year = time.getFullYear(),
                Month = time.getMonth() + 1,
                Data = time.getDate() < 10 ? 0 + '' + time.getDate() : time.getDate(),
                hour = time.getHours() < 10 ? 0 + '' + time.getHours() : time.getHours(),
                Minutes = time.getMinutes() < 10 ? 0 + '' + time.getMinutes() : time.getMinutes(),
                Seconds = time.getSeconds() < 10 ? 0 + '' + time.getSeconds() : time.getSeconds()
            Month < 10 ? Month = 0 + '' + Month : Month = Month
            return Year + "-" + Month + "-" + Data + " " + hour + ":" + Minutes + ":" + Seconds
            }
        }
    }

</script>
<style>
    .sdf_d_SDeder .el-dialog{
            margin-top: 5vh !important;
    }
</style>
<style scoped>
    .dsf_jh_dert {
        width: 365px;
        height: 650px;
    }

    .dsf_jh_dert .fm {
        width: 100%;
        height: 100%
    }

    .sd_jh_dertert {
        width: 100%;
        background: #fff;
        box-shadow: 0 0 4px 0 rgba(22, 66, 137, .5);
        padding: 20px;
    }

    .sdf_deert {
        width: 520px
    }

    .lib_dsder {
        width: 200px;
    }

    .sd_jh_ddert {
        padding-left: 125px;
        margin-top: 40px;
    }

    .sd_jh_ddert button {
        width: 200px;
    }
    .sd_kjjh_dert{
        position: absolute;
        left: 0;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 1000
    }
    .sp_sd_dfg{
        width: 200px;
        height: 174px;
        margin: auto;
        margin-top: 40px;
        
    }
    .ssd_ddf_DSert{
        width: 120px;
        height: 120px;
        margin-top: 18px;
    }
    .sd_drfrxdxr{
        width: 274px;
        margin: auto;
        height: 130px;
        overflow: auto;
        padding: 10px;
        margin-top: 140px;
        color: #999;
        font-size: 14px;
    }
    .sdf_deerx{
        height: 18px;
    }
</style>
