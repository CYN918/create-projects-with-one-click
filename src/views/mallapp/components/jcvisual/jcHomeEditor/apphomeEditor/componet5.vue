<template>
    <div class="editDisplay">
        <div class="text">
            <span class="edit">编辑商品展示</span>
            <p>
                <el-switch v-model="value1"> </el-switch>
                <span>关闭后，功能区不可见</span>
            </p>
        </div>
        <div class="dragContainer">
            <p class="dragText">
                <img src="../../../../../../common/images/application/xiaoshou.png" alt="">
                <span>拖动进行排序</span>
            </p>
            <div class="biaoti">
                <span class="biao">标题</span>
                <input class="inp" v-model="text" type="text">
                <el-switch v-model="value2"></el-switch>
                <span class="yinchang">隐藏标题</span>
            </div>
            <div class="product">
                <p class="productLeft">已经选择 <span>2</span> 件商品</p>
                <ul class="productRight">
                    <li class="productList" v-for="item in arr">
                        <img src="../../../../../../common/images/application/shoutixiang.png" alt="">
                        <div class="productListR">
                            <p class="xiaomi">小米拉杆箱超级轻便拉杆箱</p>
                            <p class="price">
                                <span>销售价:128.00元</span>
                                <span>内购价:108.00元</span>
                            </p>
                        </div>
                        <span class="dele">x </span>
                    </li>
                </ul>
            </div>
            <div class="btn">
                <el-button type="primary" class="btnLeft">挑选展示商品</el-button>
                <div class="Right">
                    <el-button type="primary">确认</el-button>
                    <el-button plain>取消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            text:"hahha",
            arr:[1,2],
            value1: true, //第一个开关
            value2:false  //第二个开关
        }
    }
}
</script>
<style lang="scss">
    .editDisplay{
        margin-left: 43px;
        width: 620px;
        .text{
            display: flex;
            justify-content: space-between;
            p{
                span{
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(196,198,204,1);
                    margin-right: 20px;
                }
            }
            .edit {
                font-size: 16px;
                font-family: Microsoft Yaei;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                border-left: 4px solid rgba(74, 153, 250, 1);
                padding-left: 18px;
            }
        }
        .dragContainer{
            margin-top: 29px;
            width:620px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(214,222,239,1);
            box-shadow:0px 0px 12px 0px rgba(57,57,57,0.1);
            .dragText{
                display: flex;
                margin-top: 41px;
                margin-left: 41px;
                img{
                    vertical-align: middle;
                    width: 24px;
                    height: 24px;
                }
                span{
                    vertical-align: middle;
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(96,98,102,1);
                    margin-right: 20px;
                    margin-left: 20px;
                }
            }
            .biaoti{
                width: 380px;
                margin: 26px auto;
                display:flex;
                justify-content: space-around;
                .biao{
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(96,98,102,1);
                }
                .inp{
                    margin-top: -9px;
                    width: 200px;
                    height: 35px;
                    padding: 11px 24px 11px 24px;
                    box-sizing: border-box;
                    border:1px solid rgba(214,222,239,1);
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(96,98,102,1);
                }
                .yinchang{
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(196,198,204,1);
                }
            }
            .product{
                display: flex;
                .productLeft{
                    margin-left: 25px;
                    margin-right: 21px;
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(96,98,102,1);
                    span{
                        color: rgba(74, 153, 250, 1);
                        font-weight: 600;
                    }
                }
                .productRight{
                    .productList{
                        margin-top:21px;
                        align-items: center;
                        display: flex;
                        img{
                            width: 82px;
                            height: 82px;
                            border:1px solid rgba(214,222,239,1);
                            margin-right: 21px;
                        }
                        .productListR{
                            height: 82px;
                            font-size:14px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            .xiaomi{
                                color:rgba(96,98,102,1);
                            }
                            .price{
                                display: flex;
                                flex-direction: column;
                                color:rgba(153,153,153,1);
                            }
                        }
                        .dele{
                            width:20px;
                            height:20px;
                            background: RGBA(74, 153, 250, 1);
                            display: inline-block;
                            text-align: center;
                            line-height: 20px;
                            color:white;
                            border-radius: 50%;
                            margin-left: 115px;
                        }
                    }
                }
            }
            .btn{
                display: flex;
                justify-content: space-around;
                margin-top: 30px;
            }
        }
    }
</style>