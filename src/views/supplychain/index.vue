<template>
    <div style="overflow: hidden;">
        <el-row class="topdiv">
            <el-col :span="7" class="img"><img src="../../common/images/logo.png" alt=""></el-col>
            <el-col :span="9"  class="img"><span @click="main">首页</span></el-col>
            <el-col :span="3"  class="img"><span @click="registered">入驻申请</span></el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="inimages">
                    <div class="intop">福员爱商城诚邀您，携手共建企业集采、员工福利、积分兑换平台！</div>
                    <div class="intent">专为银行、保险、烟草、酒业、中国移动、中国电信、医药行业、金融业、
                    高新技术企业打造企业专属的电商平台、为企业提供免费平台技术开发支持及
                    全品类的商品，全国一件发货配送服务！
                    </div>
                    <div class="apply"  @click="registered">申请入驻 </div>
                </div>
            </el-col>
        </el-row>
        <div class="big_div">
            <el-row>
            <el-col :span="24">
                <div class="process">
                    <el-col :span="12">
                        <div class="conditions">
                            <span class="inconditions">入驻条件</span>
                            <div class="intent">
                                <div>供应商必须如实提供资料和信息：</div>
                                <div>1）请务必确保申请入驻及后续经营阶段提供的相关资质和信息的真实性、完整性、有效性（若供应商提供的相关资质为第三方提供，包括但不限于商标注册证、授权书等，请务必先行核实文件的真实有效完整性），一旦发现虚假资质或信息的，将不再与供应商进行合作；</div>
                                <div>2）供应商如实提供其运营的主体及相关信息，包括但不限于实际经营主体、代理运营公司等信息；</div>
                                <div>3）关于供应商信息和资料变更有相关规定的从其规定，但供应商如变更 2项所列信息，应提前 15 日书面告知；如未提前告知，将根据选规则进行处理。</div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="2" class="">
                        <span class="transparenT">1</span>
                    </el-col>
                    <el-col :span="9">
                        <div class="qrcode">
                            <img src="../../common/images/qrcode.png" alt="" class="imgcode">
                            <div class="code_text">随时随地了解商城运作
                            您的专属掌上商城应用</div>
                            <div class="down">下载供应商管理APP</div>
                        </div>
                    </el-col>
                </div>
            </el-col>
        </el-row>
            <div class="flowchart">入驻流程</div>
            <img src="../../common/images/flowchart.png" alt="" class="flowchartimg">
            <div class="flowchart category">招商类目</div>
            <div class="merchants">
                <ul>
                    <li  v-for="item in data" :key="item.name">
                        <div class="type"  :style="{'background':item.bgColor}" >
                            <img :src="item.image"  alt="">
                            <span class="line_span"></span>
                            <span>{{item.name}}</span>
                        </div>
                        <div class="messge">
                            <div class="mes_top"><i class="iconfont icon-dianhua iconright"></i> {{item.landline}}</div>
                            <div class="mes_top"><i class="iconfont icon-qq iconright"></i> {{item.QQ}}</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="flowchart businessman">入驻商家</div>
            <div class="cooperation">
                <img src="../../common/images/cooperation.png" alt="">
            </div>
        </div>
        <el-row class="btn_tip">
            <el-col :span="4" style="color:rgba(48,48,48,1)">1</el-col>
           <template   v-for="(item,index) in articleList" >
                <el-col :span="2" style="" v-if="item.children.length>=1">
                <div class="top_tip"> {{ item.categoryName }}</div>
                <div v-if="item.children.length>=1 ">
                    <div v-for="(item1,index1) in item.children " class="distance">
                        <div v-if="index1<=9">
                           {{ item1.categoryName }}
                        </div>
                      </div>
                </div>
                </el-col>
           </template>
          
            <el-col :span="3" class="txt_ten">
                <img src="../../common/images/supplychaincode1.jpg" alt=""  class="top_tip">
                <div class="distance scan">扫一扫关注我们</div>
            </el-col>
            <el-col :span="3" class="txt_ten">
                <img src="../../common/images/supplychaincode2.jpg" alt=""  class="top_tip">
                <div class="distance scan">扫一扫关注我们</div>
            </el-col>
            <div class="txt_ten bottom_navigation">首页丨隐私保护丨免责条款丨公司简介丨商家入驻丨意见反馈丨联系我们</div>
            <div class="txt_ten bottom_navigation bottm_msg">ICP备案证书号:DSC000001</div>
        </el-row>
    </div>
</template>
<script>
import { getArticleCategory } from "@/api/supplychain/index";
export default {
    data(){
        return {
            data:[
                {name:'家用日常',bgColor:'#FF5C68',image: require('../../common/images/type1.jpg'),phone:'18682099836',landline:'0755-83669942-810',QQ:'3360026839'},
                {name:'数码3C',bgColor:'#4BA6EE',image:require('../../common/images/type2.jpg'),phone:'18948185149',landline:'0755-83669942-805',QQ:'1320733938'},
                {name:'食品酒水',bgColor:'#FE9650',image:require('../../common/images/type3.jpg'),phone:'18948185370',landline:'0755-83669942-814',QQ:'2677388864'},
                {name:'家用电器',bgColor:'#00DF86',image:require('../../common/images/type4.jpg'),phone:'18682217549',landline:'0755-83669942-808',QQ:'481777956'},
                {name:'礼品箱包',bgColor:'#F6B747',image:require('../../common/images/type5.jpg'),phone:'18566789723',landline:'0755-83669942-806',QQ:'3351606369'},
                {name:'美妆个户',bgColor:'#AA58E4',image:require('../../common/images/type6.jpg'),phone:'18948185167',landline:'0755-83669942-820',QQ:'2608592478'},
                {name:'电脑办公',bgColor:'#06CAB8',image:require('../../common/images/type7.jpg'),phone:'18948185129',landline:'0755-83669942-815',QQ:'1286246891'},
                {name:'钟表首饰',bgColor:'#FF5C68',image:require('../../common/images/type8.jpg'),phone:'18566780894',landline:'0755-83669942-818',QQ:'3420762308'},
            ],
            articleList:[]
        }
    },
    created(){
       this.getArticleCategory()
    },
    methods:{
        // 动态获取底部的文章列表
        getArticleCategory(){
            getArticleCategory({showInNav:1}).then( res =>{
               this.articleList = res.data
            })
        },
        apply(){
            this.$router.push({ name: "registered" });
        },
        main(){
            this.$router.push({ name: "login" });
        },
        registered(){
            this.$router.push({ name: "registered" });
        }
    }
}
</script>
<style lang='scss' scoped>
.topdiv{
    height: 92px;
    display: flex;
    align-items: center;
    .img{
        text-align: right;
        font-size:18px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
        cursor: pointer;
    }
}
.inimages{
    height: 990px;
    background: url('../../common/images/inimage.png');
    background-size: 100% 100%;
    position: relative;
    display: flex;
    justify-content: center;
    .intop{
        font-size:42px;
        font-family:SourceHanSansCN-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        position: absolute;
        top: 111px;
    }
    .intent{
        width:1260px;
        height:130px;
        font-size:36px;
        font-family:SourceHanSansCN-Light;
        font-weight:300;
        color:rgba(255,255,255,1);
        line-height:48px;
        position: absolute;
        top: 210px;
        text-align: center;
        text-indent:72px;
    }
    .apply{
        width:205px;
        height:58px;
        background:rgba(229,48,109,1);
        border-radius:4px;
        font-size:32px;
        font-family:SourceHanSansCN-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 385px;
        letter-spacing:5px;
        cursor: pointer;
    }
}
.big_div{
    width: 100%;
    background:url('../../common/images/process.png');
    background-size: 100% 100%;
    height: 3400px;
    .process{
    height: 100%;
    background-size: 100% 100%;
    position: relative;
    padding: 100px 19.7% 0 19.7%;
    .conditions{
        .inconditions{
            font-size:36px;
            font-family:SourceHanSansCN-Bold;
            font-weight:bold;
            color:rgba(38,50,56,1);
        }
        .intent{
            font-size:20px;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(84,99,107,1);
            margin-top: 42px;
            line-height:36px;
        }
    }
    .qrcode{
        width:100%;
        height:577px;
        background:rgba(255,255,255,1);
        box-shadow:0px 41px 38px 0px rgba(44,40,197,0.05);
        border-radius:10px;
        text-align: center;
        .imgcode{
            width:58.9%;
            height:44.3%;
            border-radius:10px;
            margin-top: 59px;
        }
        .code_text{
            width:46.7%;
            height:55px;
            font-size:20px;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(84,99,107,1);
            margin: 29px  auto;
            margin-bottom: 0;

        }
        .down{
            width:66.6%;
            height:80px;
            background:rgba(255,255,255,1);
            border:2px solid rgba(182, 217, 252, 1);
            margin: 39px auto;
            display:flex;
            justify-content: center;
            align-items: center;
            font-size:24px;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(37,143,252,1);
        }
    }
}
    .flowchartimg{
        width: 100%;
    }
    .flowchart{
        margin: 220px auto;
        margin-bottom: 0;
        font-size:36px;
        font-family:SourceHanSansCN-Bold;
        font-weight:bold;
        color:rgba(38,50,56,1);
        text-align: center;
    }
    .category{
        margin: 174px auto;
        margin-bottom: 107px;
    }
    .merchants{
        width: 1158px;
        margin: 0 auto;
        ul{
            display: flex;
            flex-wrap: wrap;
            li{
                width: 277px;
                height: 342px;
                margin-right: 15px;
                background: white;
                .type{
                    width: 100%;
                    height: 174px;
                    display: flex;
                    align-items: center;
                    padding-left: 46px;
                    font-size:22px;
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    .line_span{
                        width:1px;
                        height:50px;
                        background:rgba(255,255,255,1);
                        margin-left: 28px;
                        margin-right: 29px;
                    }
                }
                .messge{
                    width: 100%;
                    height: 190px;
                    padding-left: 30px;
                    .mes_top{
                        margin-top: 20px;
                        font-size:20px;
                        font-family:SourceHanSansCN-Regular;
                        font-weight:400;
                        color:rgba(84,99,107,1);
                        .iconright{
                            margin-right: 10px;
                        }
                    }
                }
                &:nth-child(4) {
                   margin: 0;
                }
                &:nth-child(8) {
                   margin: 0;
                }
                &:nth-child(n+5){
                    margin-top: 71px;
                }
            }
        }
    }
    .businessman{
        margin: 178px auto;
        margin-bottom: 0;
    }
    .cooperation{
        text-align: center;
        margin-top: 100px;
    }
}
.btn_tip{
        height: 390px;
        background:rgba(48,48,48,1);
        font-size:12px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(220,220,220,1);
        position: relative;
        .top_tip{
            font-size:16px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(248,248,248,1);
            margin-top:35px;
            cursor: pointer;
        }
        .aftersales{
            margin-top:35px;
             cursor: pointer;
        }
        .distance{
            margin-top:13px;
             cursor: pointer;
        }
        .scan{
            font-size:12px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(101,169,220,1);
             cursor: pointer;
        }
        .bottom_navigation{
            position: absolute;
            bottom: 75px;
            margin: 0 auto;
            width: 100%;
             cursor: pointer;
        }
        .bottm_msg{
            bottom: 48px;
             cursor: pointer;
        }
    }
</style>