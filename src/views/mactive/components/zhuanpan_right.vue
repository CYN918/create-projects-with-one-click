<!--转盘右边的编辑-->
<template>
<section>
<div class="sad_jh_sderr">

    <section class="sd_jj_d_dr">
        <section class="sd_jhj_sdf fz14 sz" @click="xz_sd=idx" :class="idx==xz_sd?'act':''" v-for="(sd,idx) in kh_sdf">{{sd}}</section>
        <p class="qc"></p>
    </section>
<!--    基础设置-->
    <section v-if="xz_sd==0" class="pt20 pr40 btm">
        
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"  class="demo-ruleForm sad_sd_derts">
            <el-form-item label="活动名称"  prop=""> 
                        <el-input  placeholder="请输入15个字以内的字符"></el-input>
             </el-form-item>  
             <el-form-item label="有效期"  prop="">
                           <el-date-picker
                                    class="w100"
                                   v-model="value6"
                                   type="datetimerange"
                                   range-separator="至"
                                   start-placeholder="开始日期"
                                   end-placeholder="结束日期">
                               </el-date-picker>
             </el-form-item>
            
            
               <el-form-item label="参与人数"  prop="">
                       <el-radio  label="1">隐藏</el-radio>
                   <el-radio  label="1">显示</el-radio>
                   
                   <section class="fz14">
    在实际参与人数基础上增加 
                       
                       <span class="f_b sd_jh_ddfg">
        <el-input  placeholder=""></el-input>
        </span>
                       
                       人 <span class="z9 fz12"> (只展示不计入统计)</span>
                </section>
                   
             </el-form-item> 
            
            
                   <el-form-item label="主办单位"  prop="">
                        <el-input  placeholder="请输入40个字以内的字符"></el-input>
             </el-form-item> 
            
            
                   <el-form-item label="活动奖品"  prop="">
                        <el-input type="textarea" rows="4" placeholder="请输入400个字以内的字符"></el-input>
             </el-form-item> 
            
            
             <el-form-item label="活动说明"  prop="">
                        <el-input type="textarea" rows="4" placeholder="请输入400个字以内的字符"></el-input>
             </el-form-item> 
            
            
            
       </el-form>
    
    </section>
<!--    抽奖条件-->
    <section v-if="xz_sd==1" class="pt20 pr40 btm">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"  class="demo-ruleForm sad_sd_derts">
            <el-form-item label="活动模式"  prop="">
                       <el-radio v-model="huo_sdf" label="1">积分商城活动</el-radio>
                   <el-radio v-model="huo_sdf" label="2">独立活动工具</el-radio>
             </el-form-item>  
                        
                        
                            <el-form-item label="消耗积分"  prop="">
                        <el-input  placeholder="请输入积分数"></el-input>
             </el-form-item>
                        
                        
                               <el-form-item label="限制次数"  prop="">
                       <el-row>
                       <el-col :span="20">
        <el-input  placeholder="不填默认为无限次"></el-input> 
    </el-col>
                           <el-col :span="4" class="tr">次/每天</el-col>
                       </el-row>
             </el-form-item>
                        
                        
                               <el-form-item label="免费次数"  prop="">
                       <el-row>
                       <el-col :span="20">
        <el-input  placeholder="请输入免费次数"></el-input> 
    </el-col>
                           <el-col :span="4" class="tr">次/每天</el-col>
                       </el-row>
             </el-form-item>
                        
                        
                        
                        
    </el-form>
            
    </section>
<!--   奖项设置-->
    <section v-if="xz_sd==2" class="pt20 pr40 btm pd"> 
        
    <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
  <el-tab-pane
    v-for="(item, index) in editableTabs"
    :label="item.title"
    :name="item.name" 
  >
    <section v-if="index==0">
    
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"  class="demo-ruleForm">
            <el-form-item label="奖品名字"  prop="">
                           <el-input  v-model="item.title"  readonly="readonly"></el-input>
             </el-form-item> 
            
            <el-form-item label="奖品图片"  prop="">
                          <section class="df_jh_Ddfx br yj4 fl">
    <img src="@/common/images/turnplat_winout.png">
                    </section>
                <section class="ov pl10 fz12 z6 sdf_jh_dex">
                       1.图片尺寸建议：250px250px；<br>
                        2.支持JPG、PNG、JPEG格式的图片，图片不能大于200KB。
                    <p>
                <el-button type="primary"  size="medium" class="mt10">上传图片</el-button>
                        
                </p>
                </section>
                
                <p class="qc"></p>
             </el-form-item>  
        </el-form>
        
    <p class="fz12 z6 pm20 pl20">
    此活动可设置1-8个奖品，且至少包含一个“谢谢参与"
        </p>
    </section>
      
    <section v-else>
            
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"  class="demo-ruleForm">
            <el-form-item label="奖品类型"  prop="">
                             <el-select v-model="item.jplx"   placeholder="实物礼品" class="w100">
                                         <el-option label="实物礼品" value="1"></el-option>
                                         <el-option label="再来一次" value="2"></el-option>
                                         <el-option label="积分奖励" value="3"></el-option>
                                 
                                  <el-option label="虚拟商品" value="4"></el-option>
                                  <el-option label="优惠券" value="5"></el-option>
                                  <el-option label="兑换码" value="6"></el-option>
                             </el-select> 
             </el-form-item>  
            
                  <el-form-item label="派送方式"  prop="">
                      <el-radio v-model="item.fangsi" label="1">快递派送</el-radio>
                       <el-radio v-model="item.fangsi" label="2">线下自提</el-radio>
                      <span class="ls fz14" v-if="item.fangsi==2" @click="xz_sd=4">去设置</span>
                      
    </el-form-item>
            
                   <el-form-item label="奖品名称"  prop="">
                           <el-input  placeholder="长度不超过15个汉字或字母" v-model="item.title" ></el-input>
                       
    </el-form-item>
            
            
            
             <el-form-item label="奖品图片"  prop="">
                          <section class="df_jh_Ddfx br yj4 fl">
                            <img src="@/common/images/turnplat_git.png" v-if="!item.jpimg">
                              <img :src="item.jpimg" v-else>
                    </section>
                <section class="ov pl10 fz12 z6 sdf_jh_dex">
                       1.图片尺寸建议：250px250px；<br>
                        2.支持JPG、PNG、JPEG格式的图片，图片不能大于200KB。
                    <p>
                <el-button type="primary"  size="medium" class="mt10">上传图片</el-button>
                        
                </p>
                </section>
                
                <p class="qc"></p>
             </el-form-item>
            
            
                   <el-form-item label="奖品数量"  prop="">
                           <el-input  placeholder="为0, 则中奖概率为0" v-model="item.jpsl" ></el-input>
                       
    </el-form-item>
            
            
            
             <el-form-item label="中奖概率"  prop="">
                    <span class="f_b gailv_der">
                    <el-input  placeholder="为0, 则中奖概率为0" v-model="item.jpsl" ></el-input>
                </span>
                 
                 % <span class="fz12 z9">所有奖项总中奖率不可超过100%</span>

                       
    </el-form-item>
            
            
            
        </el-form>
    
        <p class="z6 fz14 pl20 pm20">此活动可设置1-8个奖品，且至少包含一个“谢谢参与"</p>
    </section>
      
  
  </el-tab-pane>
</el-tabs>
    </section>
    
<!--    高级设置-->
    <section v-if="xz_sd==3" class="pt20 pr40 btm ">
            
        <el-form :model="gaojisz" :rules="rules" ref="gaojisz" label-width="100px"  class="demo-ruleForm">
            <el-form-item label="功能按键"  prop="">
                       <el-radio v-model="gaojisz.gnsz" label="1">隐藏</el-radio>
                 <el-radio v-model="gaojisz.gnsz" label="2">页面跳转</el-radio>
                 <el-radio v-model="gaojisz.gnsz" label="3">一键关注</el-radio>
             </el-form-item>  
              <section v-if="gaojisz.gnsz==2||gaojisz.gnsz==3">
                  <el-form-item label="按键名称"  prop=""> 
                      <el-input  placeholder="按键名称不超过6个字符" v-model="gaojisz.ajmc" ></el-input>
                 </el-form-item>
                   <el-form-item label="跳转链接"  prop="" v-if="gaojisz.gnsz==2">
                     <el-input  placeholder="如:https://member.fxqifu.com" v-model="gaojisz.tzlj" ></el-input>
                 </el-form-item>
                  
                    <el-form-item label="公众号"  prop="" prop="" v-if="gaojisz.gnsz==3">
                          <section class="df_jh_Ddfx br yj4 fl">
                              <img src="">
                    </section>
                <section class="ov pl10 fz12 z6 sdf_jh_dex">
                       1.图片尺寸建议：250px250px；<br>
                        2.支持JPG、PNG、JPEG格式的图片，图片不能大于200KB。
                    <p>
                <el-button type="primary"  size="medium" class="mt10">上传图片</el-button>
                        
                </p>
                </section>
                
                <p class="qc"></p>
             </el-form-item>
            
                  
                  
            </section>
            <el-form-item label="分享名称"  prop="">
                 <el-input  placeholder="标题不超过6个字符" v-model="gaojisz.fxmc" ></el-input>
          </el-form-item>
            
                  <el-form-item label="分享描述"  prop="">
                        <el-input  placeholder="不超过400个字符" rows="4" v-model="gaojisz.fxms" type="textarea"></el-input>
          </el-form-item>
            
            
                <el-form-item label="分享图片"  prop="">
                          <section class="df_jh_Ddfx br yj4 fl">
                              <img :src="gaojisz.fxtp">
                    </section>
                <section class="ov pl10 fz12 z6 sdf_jh_dex">
                       1.图片尺寸建议：250px250px；<br>
                        2.支持JPG、PNG、JPEG格式的图片，图片不能大于200KB。
                    <p>
                <el-button type="primary"  size="medium" class="mt10">上传图片</el-button>
                        
                </p>
                </section>
                
                <p class="qc"></p>
             </el-form-item>
            
            
            
            
        </el-form>
        
    </section>
    
<!--    自提地点-->
    <section v-if="xz_sd==4" class="pt20 pr20 btm ">
        
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"  class="demo-ruleForm">
            
            
                
            
            
            
            <el-form-item label="自提地点"  prop="">
                
                <el-row v-for="(sd,idx) in tianjia_list" class="fz12 z6">
                    <el-col :span="21">
                        <section class="pd pt10 pm5 sdf_jh_drer mt10 yj4">
                联系人：{{sd.linkman}}  <span class="ml20">联系方式 {{sd.contact}}</span><br>
                详细地址: {{sd.contact}}<br>
工作时间:  {{sd.working_hours}}
                
            </section>
    </el-col>
                    <el-col :span="3" class="tr ls sdf_jh_der">
                 <span @click="bianji_ziti(sd)">编辑</span>   <br>
                         <span @click="dele_de(idx)">删除</span>  
    
    </el-col>
                </el-row>
                
             <el-button class="mt10" type="primary" size="medium" @click="dialogVisible=true;is_b_t=true">添加地址</el-button>
                <span class="ml20">最多添加50个地址</span>
             </el-form-item>                                                                                                              
               </el-form>
        
    </section>
    
    
</div>
    
     <p class="mt40 sdf_kj_dert">
        <el-button type="primary"  >保存并预览</el-button>
    
    </p>
    
<!--    添加自提地址-->
    <el-dialog class="sddf_drrt" title="提示" :visible.sync="dialogVisible" width="550px">
                <p class="my-top-title">添加自提地址</p>
        
            <el-form :model="tianjia" :rules="rules" ref="ziti_from"  label-width="100px"  class="demo-ruleForm mt20">
                <el-form-item label="联系人"  prop="linkman">
                               <el-input  placeholder="不超过20个字符" v-model="tianjia.linkman" ></el-input>
                 </el-form-item> 
                 <el-form-item label="联系方式"  prop="contact">
                               <el-input  placeholder="请输入手机号码" maxlength="11" v-model="tianjia.contact" ></el-input>
                 </el-form-item>
                 <el-form-item label="详细地址"  prop="detailed_address">
                               <el-input  type="textarea" rows="4" placeholder="不超过100个字符" maxlength="100" v-model="tianjia.detailed_address"></el-input>
                 </el-form-item>
                
                 <el-form-item label="工作时间"  prop="working_hours">
                               <el-input  placeholder="不超过20个字符" v-model="tianjia.working_hours"></el-input>
                 </el-form-item>
                </el-form>
        
        <section class="mt40 tr">
        <el-button type="primary"  class="pl40 pr40"  size="medium" @click="tianjia_s">确定</el-button>
             <el-button type="primary"  class="pl40 pr40 ml20" plain  size="medium" @click="dialogVisible=false">取消</el-button>
        </section>
        
    </el-dialog>
    
    </section>
</template>
<script>
    export default {
        data() {
            return {
                dialogVisible: false,
                kh_sdf: ["基础设置", "抽奖条件", "奖项设置", "高级设置", "自提地点"],
                xz_sd: 0,
                ruleForm: "",
                huo_sdf: '1',
                ruleForm: {

                },

                editableTabsValue: '2',
                editableTabs: [{ //奖项设置
                    title: '谢谢参与',
                    name: '1',
                    type_s: 1,
                    jpimg: 'http://dkd-oss-image.oss-cn-hangzhou.aliyuncs.com/turnplate/turnplat_winout.png'
                }, {
                    title: '奖项一',
                    name: '2',
                    type_s: 2,
                    jplx: '1', //奖品类型
                    fangsi: '1', //派送方式
                    jpimg: "http://dkd-oss-image.oss-cn-hangzhou.aliyuncs.com/turnplate/turnplat_git.png", //奖品图片
                    jpsl: "", //奖品数量
                }],
                gaojisz: {
                    ajmc: "", //按键名称
                    tzlj: "", //跳转链接
                    gnsz: "1", //功能设置
                    fxmc: "标题不超过6个字符", //分享名称
                    fxms: "欢乐大转盘，有你更欢乐", //分享描述
                    fxtp: "http://dkd-oss-image.oss-cn-hangzhou.aliyuncs.com/turnplate/sharealt.jpg", //分享图片
                },
                tabIndex: 2,
                tianjia: { //添加自提地址
                    linkman: "", //联系人
                    contact: "", //联系方式
                    detailed_address: "", //详细地址
                    working_hours: "", //工作时间
                },
                tianjia_list: [{
                    linkman: "独行", //联系人
                    contact: "13538190372", //联系方式
                    detailed_address: "广东省广州市萝岗区敏捷广场", //详细地址
                    working_hours: "周一至至周五", //工作时间
                }],
                is_b_t: true, //自提地点是否为添加状态
                rules: {
                    linkman: [{
                        required: true,
                        message: '请输入联系人',
                        trigger: 'blur'
                    }],
                    contact: [{
                        required: true,
                        message: '请输入联系方式',
                        trigger: 'blur'
                    }],
                    detailed_address: [{
                        required: true,
                        message: '请输入详细地址',
                        trigger: 'blur'
                    }],
                    working_hours: [{
                        required: true,
                        message: '请输入工作时间',
                        trigger: 'blur'
                    }],
                },
            }
        },
        components: {

        },
        methods: {
            gest_sf(idx){
                  this.xz_sd=idx
            },
            tianjia_s() { //添加自提确认按钮触发
                this.$refs.ziti_from.validate((valid) => {
                    if (valid) {
                        this.dialogVisible = false
                        if (this.is_b_t) { //添加状态
                            this.tianjia_list.push(this.tianjia)
                        } else { //编辑状态

                        }
                    }
                });

            },
            bianji_ziti(sd) { //编辑自提按钮触发
                this.is_b_t = false
                this.dialogVisible = true
                this.tianjia = sd

            },
            dele_de(idx) {
                this.tianjia_list.splice(idx, 1);
            },
            handleTabsEdit(targetName, action) {

                if (action === 'add' && this.editableTabs.length < 8) {
                    let newTabName = ++this.tabIndex + '';
                    this.editableTabs.push({
                        title: '新奖项',
                        name: newTabName,
                        type_s: 2,
                        jplx: '1', //奖品类型
                        fangsi: '1', //派送方式
                        jpimg: "http://dkd-oss-image.oss-cn-hangzhou.aliyuncs.com/turnplate/turnplat_git.png", //奖品图片
                        jpsl: "", //奖品数量
                    });
                    this.editableTabsValue = newTabName;
                }
                if (action === 'remove' && this.editableTabs.length > 2) {
                    let tabs = this.editableTabs;
                    let activeName = this.editableTabsValue;
                    if (activeName === targetName) {
                        tabs.forEach((tab, index) => {
                            if (tab.name === targetName) {
                                let nextTab = tabs[index + 1] || tabs[index - 1];
                                if (nextTab) {
                                    activeName = nextTab.name;
                                }
                            }
                        });
                    }

                    this.editableTabsValue = activeName;
                    this.editableTabs = tabs.filter(tab => tab.name !== targetName);
                }
            }

        },
        mounted() {

        },
        watch: {
            editableTabs: {
                handler: function() {
                    this.$store.state.is_dsr = this.editableTabs
                    if (this.editableTabs.length == 7) {
                        this.$store.state.is_dsr_lenth = 'acb'
                    } else if (this.editableTabs.length == 8) {
                        this.$store.state.is_dsr_lenth = 'acd'
                    } else if (this.editableTabs.length > 4) {
                        this.$store.state.is_dsr_lenth = 'act'
                    } else if (this.editableTabs.length < 5) {
                        this.$store.state.is_dsr_lenth = ''
                    }

                },
                deep: true
            }
        }
    }

</script>
<style lang="scss" scoped>
    .sad_jh_sderr {
        background: #fff;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, .2);
        display: inline-block;

    }

    .sd_jhj_sdf {
        padding-left: 20px;
        padding-right: 20px;
        line-height: 40px;
        text-align: center;
        float: left;
        border-left: 1px solid #fff;
        border-right: 1px solid #fff;
        background: #fff;
        position: relative;
    }

    .sd_jhj_sdf.act {
        border-color: #dcdfe6;
        color: #4386f4;
    }

    .sd_jhj_sdf.act:after {
        content: ' ';
        position: absolute;
        left: 0px;
        width: 100%;
        height: 2px;
        background: #fff;
        bottom: -1px;
    }

    .sad_sd_derts {
        width: 550px;
    }

    .sd_jh_ddfg {
        width: 100px;
    }

    .sdf_kj_dert {
        padding-left: 100px
    }

    .sdf_kj_dert button {
        width: 200px;
    }

    .df_jh_Ddfx {
        width: 100px;
        height: 100px;
        padding: 5px;

    }

    .df_jh_Ddfx img {
        width: 100%;
        height: 100%;
        background: #f6f6f6
    }

    .sdf_jh_dex {
        line-height: 2
    }

    .gailv_der {
        width: 130px;
    }

    .sdf_jh_drer {
        background: #F6F6F6;
        line-height: 1.6
    }

    .sdf_jh_der {
        line-height: 2;
        margin-top: 20px;
    }

</style>
