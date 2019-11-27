<template>
    <div class="top-nav">
        <a class="link-word" >首页</a>|
        <a class="link-word" ><i class="iconfont icon-jicai"></i> 企业集采</a>|
        <a class="link-word"><i class="iconfont icon-jifen"></i> 积分商城</a>|
        <a class="link-word" ><i class="iconfont icon-bangongyongpin"></i>办公用品</a>|
        <a class="link-word" >产品解决方案</a>|
        <a class="link-word">关于我们</a>|
        <div class="login-wrap" v-if="!isLogin">
            <a class="text-word" href="">您好，欢迎您来到福员爱！</a>
            <a class="link-word" href="login.html">
                <i class="iconfont icon-gerenzhongxin1"></i>
                请登录
            </a>|
            <a class="link-word" href="login.html#/register">
                免费注册
            </a>
        </div>
        <div class="login-wrap" v-else>
            <a class="text-word" href="">您好，欢迎您来到福员爱！</a>
            <a href="person_center.html" class="link-word" >

            </a>
            <a >
                退出
            </a>
        </div>
    </div>
</template>

<script>
</script>

<style lang="scss"  scoped>
    a{
        cursor: pointer;
    }
    .top-nav{
        min-width: 100%;
        height:  38px;
        background:  #edecec;
        display:  flex;
        justify-content : space-around;
        align-items:  center;
        color : #e4e3e3;
        font-size : 24px;
        padding : 0 calc((100% - 1200px)/2);
        .link-word{
            font-size :14px;
            line-height: 18px;
            color :#333;
            .iconfont{
                position: relative;
                top: 1px;
                display :inline-block;
                width :18px;
                height :18px;
                line-height: 18px;
                text-align: center;
                color :#fff;
                margin-right: 6px;
            }
            .icon-jicai{
                background: #6a82ff;
            }
            .icon-jifen{
                background: #ffc550
            }
            .icon-bangongyongpin{
                background :#42d4ff
            }

        }
        .login-wrap{
            font-size :14px;
            color: #333;
            .text-word{
                color :#999;
                font-size: 14px;
                margin-right: 20px;
            }
            .link-word{
                font-size :14px;
                line-height: 18px;
                color: #333;
                margin-right: 6px;
                cursor :pointer;
            }
        }
    }
</style>
