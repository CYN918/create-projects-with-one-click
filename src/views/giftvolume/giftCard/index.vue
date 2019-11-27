<template>
    <div class="giftSelection">
        <p class="btn">
            <span class="yulan" @click="dialogVisible=true">预览h5</span>
            <span class="shezhi">分享h5设置</span>
            <span class="shezhi" @click="$router.go(-1)">返回</span>
        </p>
        <div class="header">
            <img src="@/common/images/examine/lipince.jpg" alt="" class="imgUrl">
        </div>
        <div class="cardBook">
            <ul class="cardBookList">
                <li :class="num==index?'activ':''" v-for="(item,index) in dangList" :key="index"
                    @click="hanldeList(index)">
                    {{item}}
                </li>
                <li class="addCardBook">
                    添加礼册
                </li>
            </ul>
        </div>
        <div class="cardBookContainer">
            <p class="edit">
                <span class="bianji">编辑</span>
                <span class="addCommodity">添加商品</span>
            </p>

            <el-row :gutter="10" style="display: flex;justify-content: center">
                <div style="width: 1180px;border: 1px solid #eaeef7;padding: 20px 10px">
                    <el-col :span="6" v-for="(o, index) in 8" :key="o" style="width: 24%;margin-right: 10px">
                        <el-card shadow="never" :body-style="{ padding: '10px' }" style="margin-bottom: 20px">
                            <img
                                    :src="imgGoods"
                                    class="image">
                            <div style="padding: 14px;">
                                <span class="t1">德尔玛(Deerma)破壁机家用多功能榨汁机德尔玛(Deerma)破壁机家用多功能榨汁机</span>
                                <div class="bottom clearfix">
                                    <div style="display: flex;justify-content: space-around">
                                        <span style="color: #f95957;font-weight: bold">商城价:123</span>
                                        <span style="text-decoration: line-through">京东价:169</span>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </div>
            </el-row>
            <div class="confrimBottom">
				<span class="confrim">
					保存并预览模板
				</span>
            </div>
        </div>
        <!--h5弹窗-->
        <el-dialog
                title="兑换好礼"
                :visible.sync="dialogVisible"
                width="1000px"
                :before-close="handleClose">
            <div class="exchangeContainer">
                <div class="header">
                    <div class="duihuan">
                        <p>兑换好礼</p></div>
                    <img src="@/common/images/examine/lipince.jpg" alt="" width="750px" height="329px">
                </div>
                <div class="shouceList">
                    <ul class="shouce">
                        <li :class="num1==index?'active':''" v-for="(item,index) in dangList1" :key="index"
                            @click="handeleChange(index)">
                            {{item}}
                        </li>
                    </ul>
                </div>
                <div class="commodityList">
                    <ul class="commodityItem">
                        <li v-for="item in arrList">
                            <img src="@/common/images/examine/shouji.png" alt="" class="commodityLeft">
                            <div class="commodityRight">
                                <span class="textTop">春季时尚保暖舒适衬衣套装多色可选 春 季时尚保暖</span>
                                <div class="textBottom">
                                    <div class="priceContainer">
                                        <div class="jiageContainer">
                                            <span class="jiage">商城价:</span>
                                            <span class="rmb">￥</span>
                                            <span class="price">19</span>
                                        </div>
                                        <div class="jdPrice">
                                            京东价:198
                                        </div>
                                    </div>
                                    <div class="liji">
                                        立即兑换
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                imgGoods: require('@/common/images/goodAdd.png'),
                dangList: [
                    '300档', '600档', '800档', '1200档', '1500档', '1700档', '1800档', '黄金礼册', '钻石手册'
                ],
                num: 0,
                dangList1: [
                    '300档', '600档', '800档', '1200档', '1500档', '1700档', '1800档', '钻石手册'
                ],
                arrList: [1, 2, 3, 4],
                num1: 0,
                dialogVisible: false,  //H5弹窗
            }
        },
        methods: {
            hanldeList(index) {
                this.num = index
            },
            handeleChange(index) {
                this.num1 = index
            },
            handleClose() {

            }
        }
    }
</script>
<style lang="scss" scoped>
    .confrimBottom {
        text-align: center;
        margin-bottom: 30px;

        .confrim {
            cursor: pointer;
            display: inline-block;
            width: 150px;
            height: 36px;
            text-align: center;
            line-height: 36px;
            background: rgba(76, 134, 244, 1);
            border-radius: 4px;
            color: white;
        }
    }
    .giftSelection {
        width: 1200px;
        margin: 0 auto;
        background: #F7FAFF;

        .btn {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);

            .yulan {
                cursor: pointer;
                margin: 30px 20px 20px 14px;
                display: inline-block;
                width: 101px;
                height: 36px;
                background: rgba(76, 134, 244, 1);
                border-radius: 5px;
                text-align: center;
                line-height: 36px;
            }

            .shezhi {
                cursor: pointer;
                margin-left: 50px;
                display: inline-block;
                width: 115px;
                height: 36px;
                text-align: center;
                line-height: 36px;
                background: rgba(76, 134, 244, 1);
                border-radius: 5px;
            }

        }

        .header {
            .imgUrl {
                width: 1200px;
                height: 550px;
            }
        }

        .cardBook {
            margin: 20px 0;
            width: 100%;

            .cardBookList {
                box-sizing: border-box;
                padding: 20px;
                width: 100%;
                overflow: hidden;
                background: rgba(255, 255, 255, 1);
                border: 1px solid rgba(213, 222, 239, 1);

                li {
                    cursor: pointer;
                    width: 20%;
                    text-align: center;
                    height: 48px;
                    line-height: 48px;
                    font-size: 20px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: rgba(76, 134, 244, 1);
                    float: left;

                    &.activ {
                        background: rgba(255, 85, 85, 1);
                        border-radius: 6px;
                        color: white;
                    }
                }

                .addCardBook {
                    height: 36px;
                    background: rgba(76, 134, 244, 1);
                    border-radius: 5px;
                    text-align: center;
                    line-height: 36px;
                    color: white;
                }
            }
        }

        .cardBookContainer {
            width: 100%;

            .edit {
                background: white;
                width: 100%;

                .bianji {
                    display: inline-block;
                    width: 70px;
                    height: 36px;
                    background: rgba(76, 134, 244, 1);
                    border-radius: 5px;
                    color: white;
                    text-align: center;
                    line-height: 36px;
                    margin: 30px 20px 21px 19px;
                }

                .addCommodity {
                    display: inline-block;
                    width: 94px;
                    height: 36px;
                    color: white;
                    text-align: center;
                    line-height: 36px;
                    background: rgba(76, 134, 244, 1);
                    border-radius: 5px;
                }
            }
        }
    }

    .exchangeContainer {
        width: 750px;
        margin: 0 auto;

        .header {
            width: 100%;

            .duihuan {
                font-size: 30px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                margin-bottom: 28px;

                p {
                    text-align: center;
                    display: inline-block;
                    width: 96%;
                }

                .left {
                    cursor: pointer;
                }
            }
        }

        .shouceList {
            font-size: 28px;
            font-family: PingFang;
            font-weight: 500;
            color: rgba(102, 102, 102, 1);

            .shouce {
                margin-top: 18px;
                overflow: hidden;
                width: 100%;

                li {
                    cursor: pointer;
                    float: left;
                    width: 25%;
                    text-align: center;
                    margin-bottom: 10px;
                    height: 50px;
                    line-height: 50px;

                    &.active {
                        background: linear-gradient(-10deg, rgba(255, 94, 71, 1), rgba(248, 57, 57, 1));
                        border-radius: 28px;
                        color: white;
                    }
                }
            }
        }

        .commodityList {
            width: 100%;
            background: #F7FAFF;

            .commodityItem {
                width: 100%;
                padding-top: 1px;
                background: #F7FAFF;

                li {
                    padding: 21px 43px 31px 5px;
                    box-sizing: border-box;
                    background: white;
                    margin: 0 auto;
                    width: 710px;
                    display: flex;
                    margin-top: 20px;
                    justify-content: space-around;

                    .commodityLeft {
                        width: 166px;
                        height: 187px;
                        border-radius: 10px 10px 0px 0px;
                    }

                    .commodityRight {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;

                        .textTop {
                            font-size: 26px;
                            font-family: Microsoft YaHei;
                            font-weight: 400;
                            color: rgba(51, 51, 51, 1);
                        }

                        .textBottom {
                            display: flex;
                            justify-content: space-between;

                            .priceContainer {
                                .jiageContainer {
                                    .jiage {
                                        font-size: 24px;
                                        color: #333333;
                                    }

                                    .rmb {
                                        color: #FF3945;
                                        font-size: 24px;
                                    }

                                    .price {
                                        font-size: 30px;
                                        color: #FF3945
                                    }
                                }

                                .jdPrice {
                                    font-size: 24px;
                                    font-family: Microsoft YaHei;
                                    font-weight: 400;
                                    text-decoration: line-through;
                                    color: rgba(102, 102, 102, 1);
                                }
                            }

                            .liji {
                                font-size: 21px;
                                font-family: Microsoft YaHei;
                                font-weight: 400;
                                color: rgba(255, 255, 255, 1);
                                background: linear-gradient(90deg, rgba(255, 95, 71, 1) 0%, rgba(247, 57, 57, 1) 100%);
                                border-radius: 24px;
                                width: 142px;
                                height: 47px;
                                text-align: center;
                                line-height: 47px;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
        }
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .t1 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>
