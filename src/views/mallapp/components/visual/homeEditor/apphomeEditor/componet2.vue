<template>
    <div class="editPicture">
        <div class="text">
            <span class="edit">编辑商品展示</span>
            <p>
                <el-switch v-model="value1"> </el-switch>
                <span>关闭后，功能区不可见</span>
            </p>
        </div>
        <div class="editPictureContainer">
            <p class="dragText">
                <img src="../../../../../../common/images/application/xiaoshou.png" alt="">
                <span>拖动进行排序</span>
            </p>
            <div class="product">
                <ul class="productList">
                    <li class="productItem" v-for="item in arr">
                        <img src="../../../../../../common/images/application/chazhiji.png" alt="">
                        <div class="productModify">
                            <div class="productModifyRight">
                                <p class="undate">
                                    <span class="renew">重新上传</span>
                                    <span class="suggest">建议尺寸70*70像素</span>
                                </p>
                                <div class="selected">
                                    <el-select v-model="value" placeholder="商品专题" >
                                        <el-option
                                                v-for="item in options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <span>更换</span>
                                </div>
                            </div>
                            <span class="dele"></span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="btn">
                <el-button type="primary" class="btnLeft">增加图片入口</el-button>
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
            value1:true,
            arr:[1,2,3,4,5,6]
        }
    }
}
</script>
<style lang="scss">
.editPicture{
    margin-left: 43px;
    width: 620px;
    .text {
        display: flex;
        justify-content: space-between;
        p {
            span {
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(196, 198, 204, 1);
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
    .editPictureContainer{
        margin-top: 29px;
        width:620px;
        padding-top: 41px;
        padding-left: 41px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(214,222,239,1);
        box-shadow:0px 0px 12px 0px rgba(57,57,57,0.1);
        .dragText{
            display: flex;
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
        .product{
            width: 100%;
            .productList{
                width: 100%;
                .productItem{
                    margin-top: 24px;
                    display: flex;
                    .productModify{
                        margin-left: 22px;
                        display: flex;
                        .productModifyRight{
                            .undate{
                                margin-bottom: 22px;
                                .renew{
                                    cursor: pointer;
                                    font-size: 13px;
                                    display: inline-block;
                                    width:70px;
                                    height:33px;
                                    border:1px solid rgba(74,153,250,1);
                                    border-radius:2px;
                                    color: rgba(74,153,250,1);
                                    line-height: 33px;
                                    text-align: center;
                                }
                                .suggest{
                                    display: inline-block;
                                    margin-left: 26px;
                                    width:106px;
                                    height:13px;
                                    font-size:12px;
                                    font-family:Microsoft YaHei;
                                    font-weight:400;
                                    color:rgba(196,198,204,1);
                                }
                            }
                            .selected{
                                display: flex;
                                span{
                                    display: flex;
                                    align-items: center;
                                    font-size:14px;
                                    font-family:Microsoft YaHei;
                                    font-weight:400;
                                    color:rgba(74, 153, 250, 1)
                                }
                            }
                        }
                        .dele{
                            cursor: pointer;
                            margin-left: 97px;
                            margin-top: 37px;
                            display: flex;
                            width: 20px;
                            height: 20px;
                            display: inline-block;
                            background:url("../../../../../../common/images/application/delete.png");
                        }
                    }
                }
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
</style>