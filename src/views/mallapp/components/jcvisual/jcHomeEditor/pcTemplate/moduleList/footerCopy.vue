<template>
    <div v-if="newArr[0].componentStatus==0">
        <div class="indexFoot" v-if="isshow" @mouseenter="isShowBtn=true"  @mouseleave="isShowBtn=false">
            <div class="container">
                <div class="title clearfix">
                    <ul class="clearfix list2">
                        <li>
                            <dl>
                                <dt>新手上路</dt>
                                <dd><a >售后流程</a></dd>
                                <dd><a >购物流程</a></dd>
                                <dd><a >订购方式</a></dd>
                                <dd><a >隐私声明</a></dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dt>配送与支付</dt>
                                <dd><a >货到付款区域</a></dd>
                                <dd><a >配送支付智能查询</a></dd>
                                <dd><a >支付方式说明</a></dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dt>会员中心</dt>
                                <dd><a >资金管理</a></dd>
                                <dd><a >我的收藏</a></dd>
                                <dd><a >我的订单</a></dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dt>服务保证</dt>
                                <dd><a >退换货原则</a></dd>
                                <dd><a >售后服务保证</a></dd>
                                <dd><a >产品质量保证</a></dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dt>商业合作</dt>
                                <dd><a >购买电子商城</a></dd>
                                <dd><a >购买积分商城</a></dd>
                                <dd><a >购买企业内购系统</a></dd>
                                <dd><a >购买ERP</a></dd>
                                <dd><a >寻求供应商</a></dd>
                                <dd><a >成为供应商</a></dd>
                            </dl>
                        </li>
                    </ul>
                </div>
                <div class="last-link">
                    <a >首页</a>丨
                    <a >隐私保护</a>丨
                    <a >负责条款</a>丨
                    <a >公司简介</a>丨
                    <a >商家入驻</a>丨
                    <a >意见反馈</a>丨
                    <a >联系我们</a>
                </div>
                <div class="last-text">
                    ICP备案证书号:DSC000001
                </div>
            </div>
            <p class="setting" v-show="isShowBtn">
                <span class="edit">编辑</span>
                <span class="delete"  @click="delehandele">删除</span>
            </p>
        </div>
    </div>
</template>

<script>

    export default {
       props:['newArr'],
        data(){
            return{
                isShowBtn:false,
                isshow:true
            }
        },
        methods:{
            //删除
            delehandele(){
                const componentId = this.newArr[0].componentId
                this.$confirm('此结构被删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.isshow = false
                    this.$emit('delete',componentId)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
        }
    }
</script>

<style lang="scss" scoped>

    .indexFoot {
        position: relative;
        background: RGBA(48, 48, 48, 1);
        height: 390px;
        color: white;
    }
    .indexFoot .container {
        position: relative;
        height: 390px;
        width: 1200px;
        margin: 0 auto;
    }

    .indexFoot .title {
        padding: 34px 106px 20px;
        border-bottom: 1px solid #EAEBED;
        margin-bottom :20px
    }

    .indexFoot .title li {
        float: left;
        margin-right: 45px;
    }

    .indexFoot .title li dt {
        color :white;
        font-size: 12px;
        line-height: 20px;
        padding-bottom: 16px;
        font-weight: bold
    }

    .indexFoot .title li dd {
        font-size: 12px;
        line-height: 16px;
        padding-bottom: 10px;
    }

    .indexFoot .title li dd a {
        color: white;
    }

    .indexFoot .last-link {
        font-size: 12px;
        text-align: center;
        margin-bottom :12px
    }
    .indexFoot .last-link a {
        color: white;
    }
    .indexFoot .last-text {
        color: white;
        font-size: 12px;
        text-align: center;
    }
    .setting{
        position: absolute;
        left: 0;
        top: 0;
    span{
        cursor: pointer;
        display: inline-block;
        width:56px;
        height:32px;
        line-height: 32px;
        text-align: center;
        background:rgba(76,134,244,1);
        border-radius:3px;
        font-size:12px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(255,255,255,1);
    }
    .edit{
        margin-right: 14px;
    }
    }
</style>
