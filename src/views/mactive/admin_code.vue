<!--码池管理-->
<template>
		<el-container class="dx_oiu_err">
		<el-aside>
			<navbar type="1"></navbar>
		</el-aside>
		<el-main class="make_ticket_steps"> 
            <section class="ibox-content ">
                    <el-row :gutter="20">
                        <el-col :span="12">
                                <el-button type="primary" @click="dialogVisible=true">创建新码池</el-button>
                            <el-button type="primary"  @click="useqrcode">手机端核销</el-button>
                        </el-col>
                    
                    </el-row>
                
              <el-table class="mt20" :data="tableData" style="width: 100%" highlight-current-row>
                  
                  
                  	<el-table-column  type="index" label="序号" ></el-table-column>
                  <el-table-column prop="code_name_pool" label="码池名称" ></el-table-column>
                  <el-table-column prop="exchange_code_total" label="兑换码总数" ></el-table-column>
                  <el-table-column prop="has_been_used" label="已使用数" ></el-table-column>
                  	<el-table-column prop="Don_number" label="未使用数" ></el-table-column>
                  <el-table-column prop="creation_time" label="创建时间" ></el-table-column>
                             
              					<el-table-column label="操作">
              						<template slot-scope="scope">
              							<el-button type="text" size="small">详情</el-button>
              						</template>
</el-table-column>
</el-table>

</section>

<!--    创建新码池-->
<el-dialog class="sddf_drrt" title="提示" :visible.sync="dialogVisible" width="600px">
    <p class="my-top-title">创建码池</p>

    <el-form :model="mc" :rules="rules_b" ref="ruleForm_mc" label-width="120px" class="demo-ruleForm mt40 pr40">
        <el-form-item label="码池名称" prop="name">
            <el-input placeholder="请输入20个以内字符" v-model="mc.name"></el-input>
        </el-form-item>
    </el-form>

    <section class="tr mt40">
        <el-button type="primary" plain class="pl40 pr40" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" class="pl40 pr40" @click="submitForm('ruleForm_mc',1)">确定</el-button>
    </section>
</el-dialog>

<!--手机核销-->
<el-dialog class="sddf_drrt" title="提示" :visible.sync="dialogVisible_b" width="600px">
    <p class="my-top-title">手机核销</p>
    <section class="mt40">
        <el-row>
            <el-col :span="3">功能说明:</el-col>
            <el-col :span="21">使用站点子账号登录核销手机端，即可将已使用的兑换码改为已核销状态</el-col>
        </el-row>
        <el-row class="mt10">
            <el-col :span="3">链接:</el-col>
            <el-col :span="21">
                <span id="sd_deert">http://jifen.fxqifu.com/1001716/Redeem_code/login</span>
                <span class="ml20 ls sd_jhj_Der" @click="copy" data-clipboard-target="#sd_deert">复制链接</span>
            </el-col>
        </el-row>

        <el-row class="mt10">
            <el-col :span="3">二维码:</el-col>
            <el-col :span="21">请使用微信端扫码查看
                <p class="mt10">
                    <canvas ref="canvas_et" class="as_deerrtt" id="canvas"></canvas>

                </p>

            </el-col>
        </el-row>


        <section class="tr mt40">
            <el-button type="primary" plain class="pl40 pr40" @click="dialogVisible_b=false">取消</el-button>
            <el-button type="primary" class="pl40 pr40" @click="dialogVisible_b=false">确定</el-button>
        </section>


    </section>

</el-dialog>

<!--码池创建成功-->
<el-dialog class="sddf_drrt" title="提示" :visible.sync="dialogVisible_c" width="600px">
    <p class="my-top-title">提示</p>
    <section class="cen mt40">
        <img src="@/common/images/checked_icon_score.png" class="checked_icon_score">
        <p class="cen mt20 sdf_k_dert">
            <span class="fz26">码池创建成功</span> <br> 您可立即导入兑换码
        </p>
    </section>


    <section class="tr mt40">
        <el-button type="primary" plain class="pl40 pr40" @click="dialogVisible_c=false">取消</el-button>
        <el-button type="primary" class="pl40 pr40" @click="dialogVisible_c=false;hf('/mactive/admin_code_detail')">导入</el-button>
    </section>



</el-dialog>


</el-main>
</el-container>

</template>
<script>
    import Clipboard from 'clipboard';
    import QRCode from 'qrcode'
    import navbar from "./components/navbar"
    export default {
        data() {
            return {
                mc: {
                    name: ""
                },
                dialogVisible: false,
                dialogVisible_b: false,
                dialogVisible_c: false,
                rules_b: {
                    name: [{
                        required: true,
                        message: '请输入码池名称',
                        trigger: 'blur'
                    }],
                },
                tableData: [{
                    code_name_pool: "码池名称", //码池名称
                    exchange_code_total: "10", //兑换码总数
                    has_been_used: "10", //已使用数
                    Don_number: "10", //   未使用数 
                    creation_time: "2019-03-08 20:05:51", //创建时间

                }]
            }
        },
        components: {
            navbar
        },
        methods: {

            copy() {
                var clipboard = new Clipboard('.sd_jhj_Der')
                let sd_d = 1
                console.log(333);
                clipboard.on('success', e => {
                    if (sd_d++ == 1) {
                        this.$notify({
                            title: '成功',
                            message: "链接复制成功！",
                            type: 'success'
                        });
                    }

                })
                clipboard.on('error', e => {

                })
            },
            useqrcode() { //生成二维码
                this.dialogVisible_b = true;
                setTimeout(a => {
                    var canvas = this.$refs.canvas_et
                    QRCode.toCanvas(canvas, 'http://jifen.fxqifu.com/1001716/Redeem_code/login', function(error) {

                    })
                }, 100);
            },
            submitForm(formName, ty) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (ty == 1) { //创建新码池
                            let sd_dsf = {
                                exchange_code_total: "10", //兑换码总数
                                has_been_used: "10", //已使用数
                                Don_number: "10", //   未使用数 
                            }
                            sd_dsf.code_name_pool = this.mc.name
                            sd_dsf.creation_time = this.time_d(new Date().getTime())

                            this.$refs[formName].resetFields();
                            this.dialogVisible = false
                            this.dialogVisible_c = true
                            this.tableData.push(sd_dsf)

                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },


        },
        mounted() {

        },
    }

</script>
<style scoped>
    .as_deerrtt {
        width: 164px;
        height: 164px;
    }

    .checked_icon_score {
        width: 72px;
        height: 72px;
    }

    .sdf_k_dert {
        line-height: 1.6
    }

</style>
