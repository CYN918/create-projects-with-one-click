<template>
    <div class="microPageContainer">
        <div class="imgShow">
            <img src="../../../../../common/images/application/huodong.png" alt="">
        </div>
        <div class="microPageContainerRight">
         <div class="modul1">
             <div class="biaoti">
                 <span class="edit">编辑轮播图</span>
                 <div class="flag">
                     <el-switch v-model="value2"></el-switch>
                     <span>关闭后，功能区不可见</span>
                 </div>
             </div>
             <div class="dragContainer">
                 <p class="dragText">
                     <img src="../../../../../common/images/application/xiaoshou.png" alt="">
                     <span>拖动进行排序</span>
                 </p>
                 <div class="update">
                     <img src="../../../../../common/images/application/smoll.png" alt="">
                     <div class="updateRight">
                         <p class="renew">
                             <span>重新上传</span>
                             <span>建议尺寸710*300像素</span>
                         </p>
                        <!--级联菜单-->
                         <el-select v-model="value" placeholder="商品专题" >
                             <el-option
                                 class="selected"
                                 v-for="item in options"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item.value">
                             </el-option>
                         </el-select>
                     </div>
                     <span class="dele">x</span>
                 </div>
                 <div class="btn">
                     <el-button type="primary" class="btnLeft">增加轮播图片</el-button>
                     <div class="Right">
                         <el-button type="primary">确认</el-button>
                         <el-button plain>取消</el-button>
                     </div>
                 </div>
             </div>
         </div>
        <div class="modul2">
            <div class="biaoti">
                <span class="edit">编辑轮播图</span>
                <div class="flag">
                    <el-switch v-model="value3"></el-switch>
                    <span>关闭后，功能区不可见</span>
                </div>
            </div>
            <div class="editShow">
                <p class="dragText">
                    <img src="../../../../../common/images/application/xiaoshou.png" alt="">
                    <span>拖动进行排序</span>
                </p>
                <div class="biaoti">
                    <span class="biao">标题</span>
                    <input class="inp" v-model="text" type="text">
                    <el-switch v-model="value2"></el-switch>
                    <span class="yinchang">隐藏标题</span>
                </div>
                <!--关联-->
                <div class="association">
                    <p class="inp">关联专区:</p>
                    <el-select v-model="value" placeholder="商品专题" >
                        <el-option
                            class="selected"
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <span class="dele">x</span>
                </div>
                <!--海报展示-->
                 <div class="poster">
                    <span class="posterLeft">海报展示:</span>
                    <div class="posterRight">
                       <div class="posterRightTop">
                           <img src="../../../../../common/images/application/banner.png" alt="">
                           <div class="undateText">
                               <span>重新上传</span>
                               <span>建议尺寸710*208像素</span>
                           </div>
                           <span class="dele">x</span>
                       </div>
                        <div class="posterRightBt">
                            <el-select v-model="value" placeholder="无跳转" >
                                <el-option
                                        class="selected"
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <span class="replace">更换</span>
                        </div>
                    </div>
                </div>
                <!--已选择的商品-->
               <div class="selectProduct">
                    <p class="text">已经选择 <span>4</span> 件商品</p>
                   <ul class="selectProductList">
                       <li v-for="item in arr">
                           <div class="selectProductItem">
                               <img src="../../../../../common/images/application/shoutixiang.png" alt="">
                               <div class="selectProductListRight">
                                   <div class="selectProductDescription">
                                       <p class="product">小米拉杆箱超级轻便拉杆箱</p>
                                       <p class="price">
                                           <span>销售价:128.00元</span>
                                           <span>内购价:108.00元</span>
                                       </p>
                                   </div>
                                   <span class="dele">x</span>
                               </div>
                           </div>
                           <div class="selectedTime">
                               <span>秒杀时间段:</span>
                               <div class="block">
                                   <el-date-picker
                                           v-model="starTime"
                                           type="daterange"
                                           range-separator="-"
                                           start-placeholder="时间开始"
                                           end-placeholder="时间结束">
                                   </el-date-picker>
                               </div>
                           </div>
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
        </div>
    </div>
</template>
<script>
    export  default {
        data(){
            return{
                arr:[1,2,3,4],
                starTime:'',
                text:'热销产品',
                value2:true,
                value3:true,
                value4:true,
             options: [{
                 value: '选项1',
                 label: '黄金糕'
             }, {
                 value: '选项2',
                 label: '双皮奶'
             }, {
                 value: '选项3',
                 label: '蚵仔煎'
             }],
                 value: ''
            }
        }
    }
</script>
<style lang="scss">
.microPageContainer{
    display: flex;
    .microPageContainerRight{
        margin-left: 44px;
        .modul2,.modul1{
            .biaoti{
                display: flex;
                justify-content: space-between;
                .edit{
                    padding-left: 18px;
                    font-size:16px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    border-left: 4px solid rgba(74, 153, 250, 1);
                }
                .flag{
                    span{
                        margin-left: 20px;
                        font-size:14px;
                        font-family:Microsoft YaHei;
                        font-weight:400;
                        color:rgba(196,198,204,1)
                    }
                }
            }
            .dragContainer{
                box-sizing: border-box;
                padding-top: 41px;
                padding-left: 41px;
                margin-top: 29px;
                width:620px;
                background:rgba(255,255,255,1);
                border:1px solid rgba(214,222,239,1);
                box-shadow:0px 0px 12px 0px rgba(57,57,57,0.1);
                .dragText{
                    display: flex;
                    line-height: 26px;
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
                .update{
                    margin-top: 25px;
                    display: flex;
                    align-items: center;
                    img{
                        width: 195px;
                        height: 83px;
                    }
                    .updateRight{
                        height: 83px;
                        margin-right: 20px;
                        margin-left: 21px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        .renew{
                            span{
                                &:nth-child(1){
                                    cursor: pointer;
                                    display: inline-block;
                                    border: 1px solid rgba(74, 153, 250, 1);
                                    width: 70px;
                                    height: 33px;
                                    text-align: center;
                                    line-height: 33px;
                                    font-size:13px;
                                    font-family:Microsoft YaHei;
                                    font-weight:400;
                                    color:rgba(74,153,250,1)
                                }
                                &:nth-child(2){
                                    margin-left: 20px;
                                    font-size:12px;
                                    font-family:Microsoft YaHei;
                                    font-weight:400;
                                    color:rgba(196,198,204,1);
                                }
                            }
                        }
                        .selected{
                            width: 200px;
                            height: 35px;
                        }
                    }
                    .dele{
                        cursor: pointer;
                        width: 20px;
                        height: 20px;
                        text-align: center;
                        line-height: 20px;
                        color: white;
                        background: RGBA(74, 153, 250, 1);
                        border-radius: 50%;
                        margin-left: 83px;
                    }
                }
                .btn{
                    margin-bottom: 38px;
                    cursor: pointer;
                    margin-top: 32px;
                    display: flex;
                    justify-content: space-around;
                }
            }
        }
        .modul2{
            margin-top: 37px;
            .editShow{
                padding-bottom: 40px;
                box-sizing: border-box;
                padding-top: 41px;
                padding-left: 41px;
                margin-top: 29px;
                width:620px;
                background:rgba(255,255,255,1);
                border:1px solid rgba(214,222,239,1);
                box-shadow:0px 0px 12px 0px rgba(57,57,57,0.1);
                .dragText{
                    display: flex;
                    line-height: 26px;
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
                    width: 409px;
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
                        margin-left: 21px;
                        margin-right: 15px;
                        margin-top: -9px;
                        width: 217px;
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
                        margin-left: 20px;
                    }
                }
                .association{
                    margin-left: 62px;
                    display: flex;
                    align-items: center;
                    .inp{
                        margin-right:20px ;
                        font-size:14px;
                        font-family:Microsoft YaHei;
                        font-weight:400;
                        color:rgba(96,98,102,1);
                    }
                    .dele{
                        margin-left: 178px;
                        cursor: pointer;
                        width: 20px;
                        height: 20px;
                        line-height: 20px;
                        text-align: center;
                        color: white;
                        background:RGBA(74, 153, 250, 1);
                        border-radius:50%
                    }
                }
                .poster{
                    margin-top: 20px;
                    margin-left: 62px;
                    display: flex;
                    .posterLeft{
                        margin-right: 15px;
                        font-size:14px;
                        font-family:Microsoft YaHei;
                        font-weight:400;
                        color:rgba(96,98,102,1);
                    }
                    .posterRight{
                        .posterRightTop{
                            align-items: center;
                            display: flex;
                          img{
                              width: 194px;
                              height: 58px;
                          }
                           .undateText{
                               margin-left: 20px;
                               height: 58px;
                               justify-content: space-between;
                               display: flex;
                               flex-direction: column;
                               span{
                                   font-family:Microsoft YaHei;
                                   font-weight:400;
                                   &:nth-child(1){
                                       cursor: pointer;
                                       display: inline-block;
                                       width: 70px;
                                       height: 33px;
                                       text-align: center;
                                       line-height: 33px;
                                       border: 1px solid rgba(74, 153, 250, 1);
                                       color: rgba(74, 153, 250, 1);
                                       font-size:13px;
                                   }
                                   &:nth-child(2){
                                       font-size:12px;
                                       color:rgba(196,198,204,1);
                                   }
                               }
                           }
                            .dele{
                                cursor: pointer;
                                margin-left: 68px;
                                width: 20px;
                                height: 20px;
                                text-align: center;
                                line-height: 20px;
                                border-radius: 50%;
                                color: white;
                                background:RGBA(74, 153, 250, 1) ;
                            }
                        }
                        .posterRightBt{
                            margin-top: 20px;
                            .replace{
                                font-size:14px;
                                font-family:Microsoft YaHei;
                                font-weight:400;
                                color:rgba(74, 153, 250, 1);
                            }
                        }
                    }
                }
                .selectProduct{
                    margin-top: 20px;
                    .text{
                        font-size:14px;
                        font-family:Microsoft YaHei;
                        font-weight:400;
                        color:rgba(96,98,102,1);
                        span{
                            color: rgba(74, 153, 250, 1);
                            font-weight: 600;
                        }
                    }
                    .selectProductList{
                        li{
                            margin-top: 21px;
                            .selectProductItem{
                                display: flex;
                                justify-content: flex-end;
                                img{
                                    width: 82px;
                                    height: 82px;
                                    border:1px solid rgba(214,222,239,1)
                                }
                                .selectProductListRight{
                                    align-items: center;
                                    display: flex;
                                    margin-left: 21px;
                                    font-family:Microsoft YaHei;
                                    font-size:14px;
                                    font-weight:400;
                                    .selectProductDescription{
                                        display: flex;
                                        height: 82px;
                                        flex-direction: column;
                                        justify-content: space-between;
                                        .product{
                                            color:rgba(96,98,102,1);
                                        }
                                        .price{
                                            display: flex;
                                            flex-direction: column;
                                            color:rgba(153,153,153,1);
                                        }
                                    }
                                    .dele{
                                        cursor: pointer;
                                        margin-left: 115px;
                                        margin-right: 17px;
                                        width: 20px;
                                        height: 20px;
                                        border-radius: 50%;
                                        color: white;
                                        line-height: 20px;
                                        text-align: center;
                                        background: RGBA(74, 153, 250, 1);
                                    }
                                }
                            }
                            .selectedTime{
                                display: flex;
                                margin-top: 20px;
                                align-items: center;
                                font-size:14px;
                                font-family:Microsoft YaHei;
                                font-weight:400;
                                color:rgba(96,98,102,1);
                                span{
                                    margin-right: 12px;
                                }
                            }
                        }
                    }
                }
                .btn{
                    margin-top: 30px;
                    display: flex;
                    justify-content: space-around;
                }
            }
        }
    }
/deep/ .el-input__inner{
    height: 35px;
}
/deep/.selected{
    width: 200px;
}
}
</style>