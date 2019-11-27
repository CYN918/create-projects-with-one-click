<template>
    <div class="mallWrap">
        <div class="headerWrap">
            <div class="header">
                <img src="@/common/images/application/jianotu.png" alt="" class="left">
                <div class="search">
                    <img src="@/common/images/application/search.png" alt="" class="ser">
                    <input type="text" placeholder="搜索您想查询的商品" class="int">
                </div>
                <p class="shoopingcart">
                    <img src="@/common/images/application/cart.png" alt="">
                    <span >购物车</span>
                </p>
            </div>
            <div class="merchantNav">
                <ul class="merchantList">
                    <li v-for="item in imgArr" class="merchantItem">
                        <img :src=item.img alt="">
                        <span class="text">{{item.text}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="Welfare ">
            <ul class="merchantList">
                <li v-for="item in Welfare" class="merchantItem">
                    <img :src=item.img alt="">
                    <span class="text">{{item.text}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export  default {
    data(){
        return{
            imgArr:[
                {
                    img:require("@/common/images/application/shouji.png"),
                    text:'话费充值'
                },
                {
                    img:require("@/common/images/application/jd.png"),
                    text:'京东E卡'
                },
                {
                    img:require("@/common/images/application/shihua.png"),
                    text:'中石化'
                },
                {
                    img:require("@/common/images/application/shiyong.png"),
                    text:'中石油'
                },
                {
                    img:require("@/common/images/application/yuan.png"),
                    text:'更多服务'
                }
            ],
            Welfare:[
                {
                    img:require("@/common/images/application/jd1.png"),
                    text:'京东商城'
                },
                {
                    img:require("@/common/images/application/tuteng2.png"),
                    text:'节日专区'
                },
                {
                    img:require("@/common/images/application/tuteng3.png"),
                    text:'折扣专区'
                },
                {
                    img:require("@/common/images/application/tuteng4.png"),
                    text:'虚拟专区'
                },
                {
                    img:require("@/common/images/application/tuteng5.png"),
                    text:'福利专区'
                },

            ]
        }
    }
}
</script>
<style lang="scss">
.mallWrap{
    width: 100%;
    .headerWrap{
        padding-top: 54px;
        background:rgba(255,107,22,1);
        .header{
            justify-content: space-around;
            height: 60px;
            display: flex;
            width:750px;
            align-items: center;
            .left{
                width:23px;
                height:40px;
            }
            .search{
                position: relative;
                .int{
                    padding: 11px 0 11px 76px;
                    width:517px;
                    height:60px;
                    background:rgba(255,255,255,1);
                    border-radius:30px;
                    outline: none;
                }
                .ser{
                    position: absolute;
                    left: 25px;
                    top: 12px;
                    width:37px;
                    height:37px;
                }
            }
            .shoopingcart{
                display: flex;
                flex-direction: column;
                color: white;
                font-size:20px;
                font-family:SourceHanSansCN;
                font-weight:400;
                color:rgba(255,255,255,1);
                img{
                    width: 37px;
                    height: 35px;
                }
            }
        }
        .merchantNav{
            margin-top: 84px;
            padding-bottom: 42px;
            width: 100%;
            .merchantList{
                width: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
                .merchantItem{
                    height: 110px;
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    justify-content: space-between;
                    img{
                        width: 70px;
                        height: 70px;
                        &:last-child{
                            width:51px;
                            height: 15px;
                        }
                    }

                    .text{
                        font-size:20px;
                        font-family:SourceHanSansCN;
                        font-weight:400;
                        color:rgba(255,255,255,1);
                    }
                }
            }
        }

    }
    .Welfare{
        margin-top: 43px;
        width: 100%;
        .merchantList{
            display: flex;
            justify-content: space-around;
            .merchantItem{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                text-align: center;
                height: 120px;
                img{
                    width: 82px;
                    height: 82px;
                }
            }
        }
    }
}
</style>