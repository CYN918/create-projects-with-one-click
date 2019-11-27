<template>
    <div class="margin">
        <div class="mbottom">
            <div class="goods-fitter">
                <div class="logoHeader">
                    <img :src="headImgUrl" alt="">
                    <div class="logoRight">
                        <span class="company">{{userName}}</span>
                        <span class="verified">已认证</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="cardContainer">
            <p class="myServer">
                <span>我的服务</span>
            </p>
            <div class="serverList">
                <div class="serverItme" v-for="(item,index) in arrList">
                    <img :src=arrImg[index].src alt="">
                    <p class="shangcheng">{{item}}</p>
                    <div class="mallList">
                        <p>
                            <span>{{arrListAll[index].name}}</span>
                            <span>12个</span>
                        </p>
                        <p>
                            <span>{{arrListAll[index].name1}} </span>
                            <span>{{arr[index]}}</span>
                        </p>
                    </div>
                    <span :class="arr[index]==0?'activt btn':'btn'"  @click="projectList(index)">创建{{arrList[index]}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                arrList:['积分商城','员工福利','企业集采','平台对接','礼品卡册','ERP系统','分销商城'],
                arr:[2,2,0,6,0,3,6],
                arrListAll:[
                   {
                    name:'已搭建积分商城',
                    name1:"可搭建积分商城"
                   },
                    {
                        name:'已搭员工福利系统',
                        name1:"可搭员工福利系统"
                    },
                    {
                        name:'已搭建企业集采系统',
                        name1:"可搭建企业集采系统"
                    },
                    {
                        name:'已搭建积平台对接系统',
                        name1:"可搭建积分商城"
                    },{
                        name:'已搭建礼品卡册系统',
                        name1:"可搭建礼品卡册系统"
                    },
                    {
                        name:'已搭建ERP管理系统',
                        name1:"可搭建ERP管理系统"
                    },
                    {
                        name:'已搭建分销商城',
                        name1:"可搭建分销商城"
                    },

                ],
                arrImg:[
                    {src:require("@/common/images/service/serve1.png")},
                    {src:require("@/common/images/service/serve2.png")},
                    {src:require("@/common/images/service/serve3.png")},
                    {src:require("@/common/images/service/serve4.png")},
                    {src:require("@/common/images/service/serve5.png")},
                    {src:require("@/common/images/service/serve6.png")},
                    {src:require("@/common/images/service/serve7.png")},
                ],
                num:3,
                userName:'',
                userImg:''

                list:null
            }
        },
        created(){
            this.getmyserviceList()
            const res =JSON.parse(localStorage.getItem('user'))
            this.userName = res.data.sysuserName
            this.headImgUrl = res.data.headImgUrl
        },
        methods:{
            //获取我的服务数据
            getmyserviceList(){
                getMyServiceList().then(res=>{
                    if (res.code==200){
                        this.list=res.data
                    }
                })
            },
            //跳到项目列表
            projectList(index){
                this.$router.push({
                    path:'/application/index',
                    query:{num:index}
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@/common/scss/variable.scss";
    .goods-fitter {
        background: white;
        box-sizing: border-box;
        padding:37px 0 37px 57px ;
        .logoHeader{
            display: flex;
            img{
                width: 80px;
                height: 80px;
                margin-right: 27px;
            }
            .logoRight{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .company{
                    font-size:20px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    color:rgba(60,60,60,1);
                }
                .verified{
                    display:inline-block;
                    width:70px;
                    height:32px;
                    text-align: center;
                    line-height: 32px;
                    background:rgba(255,145,70,1);
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                }

            }
        }
    }
    .cardContainer{
        padding-top: 11px;
        background: white;
        .myServer{
            span{
                border-left: 4px solid rgba(74, 153, 250, 1);
                padding-left: 18px;
                font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(51,51,51,1);
            }
        }
        .serverList{
            overflow: hidden;
            margin-top: 30px;
            padding: 15px 49px;
            .serverItme{
                float: left;
                margin-right: 64px;
                margin-bottom: 39px;
                padding:19px 16px ;
                width: 307px;
                border-radius: 8px;
                border:1px solid rgba(76,134,244,1);
                img{
                    width:276px;
                    height:137px;
                }
                .shangcheng{
                    text-align: center;
                    font-size:15px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(69,69,69,1);
                    border-bottom:1px solid rgba(216,235,254,1);
                    padding-bottom: 10px;
                }
                .mallList{
                    padding:18px 0 ;
                    font-size:13px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                    line-height:26px;
                    p{
                        display: flex;
                        justify-content: space-between;
                    }
                }
                .btn{
                    cursor: pointer;
                    display: inline-block;
                    text-align: center;
                    line-height: 32px;
                    width:276px;
                    height:32px;
                    background:rgba(76, 134, 244, 1);
                    font-size:16px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    &.activt{
                       background:rgb(240,175,48)
                    }
                }

            }
        }
    }
</style>
