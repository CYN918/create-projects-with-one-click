<template>
    <div class="serviceEditorContainer">
        <!--服务编辑-->
        <div class="serviceEditor">
            <div class="text">
                <span class="edit">服务编辑</span>
                <p>
                    <el-switch v-model="value1"> </el-switch>
                    <span>关闭后，功能区不可见</span>
                </p>
            </div>
            <div class="serviceEditor">
                <p class="dragText">
                    <img src="../../../../../../common/images/application/xiaoshou.png" alt="">
                    <span>拖动进行排序</span>
                </p>
                <div class="replace">
                    <ul class="replaceList">
                        <li class="replaceContent" v-for="item in options">
                            <div class="replaceContentLeft">
                                <div class="replaceContentFlex">
                                    <div style="display: flex">
                                        <img src="../../../../../../common/images/application/shouji.png" alt="">
                                        <div class="selectedlist">
                                            <input type="text" v-model="telephone" class="inp">
                                            <div class="selectedWrap">
                                                <!--级联菜单-->
                                                <div class="selected">
                                                    <el-select v-model="value" placeholder="自定义网址" >
                                                        <el-option
                                                                v-for="item in options"
                                                                :key="item.value"
                                                                :label="item.label"
                                                                :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                </div>
                                                <span>更换</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span class="replaceContentRight"></span>
                                </div>
                                <p class="undate">
                                    <span class="renew">重新上传</span>
                                    <span class="suggest">建议尺寸70*70像素</span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="btn">
                    <el-button type="primary" class="btnLeft">增加服务入口</el-button>
                    <div class="Right">
                        <el-button type="primary">确认</el-button>
                        <el-button plain>取消</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!--功能编辑-->
        <div class="functionEditing">
            <div class="text">
                <span class="edit">功能区编辑</span>
                <p>
                    <el-switch v-model="value1"> </el-switch>
                    <span>关闭后，功能区不可见</span>
                </p>
            </div>
            <div class="serviceEditor">
                <p class="dragText">
                    <img src="../../../../../../common/images/application/xiaoshou.png" alt="">
                    <span>拖动进行排序</span>
                </p>
                <div class="replace">
                    <ul class="replaceList">
                        <li class="replaceContent" v-for="item in options">
                            <div class="replaceContentLeft">
                                <div class="replaceContentFlex">
                                    <div style="display: flex">
                                        <img src="../../../../../../common/images/application/shouji.png" alt="">
                                        <div class="selectedlist">
                                            <input type="text" v-model="telephone" class="inp">
                                            <div class="selectedWrap">
                                                <!--级联菜单-->
                                                <div class="selected">
                                                    <el-select v-model="value" placeholder="自定义网址" >
                                                        <el-option
                                                                v-for="item in options"
                                                                :key="item.value"
                                                                :label="item.label"
                                                                :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                </div>
                                                <span>更换</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span class="replaceContentRight"></span>
                                </div>
                                <p class="undate">
                                    <span class="renew">重新上传</span>
                                    <span class="suggest">建议尺寸70*70像素</span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="btn">
                    <el-button type="primary" class="btnLeft">增加服务入口</el-button>
                    <div class="Right">
                        <el-button type="primary">确认</el-button>
                        <el-button plain>取消</el-button>
                    </div>
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
            telephone:'花费充值',
            options:[{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }],
            value:''
        }
    }
}
</script>
<style lang="scss">
.serviceEditorContainer{
    margin-left:43px;
    .functionEditing,.serviceEditor{
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
        .serviceEditor{
            margin-top: 20px;
            width: 100%;
            border:1px solid rgba(214,222,239,1);
            box-shadow:0px 0px 12px 0px rgba(57,57,57,0.1);
            overflow: hidden;
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
        }
        .replace{
            width: 100%;
            margin-left: 63px;
            .replaceList{
                width: 100%;
                .replaceContent{
                    margin-top: 21px;
                    width: 500px;
                    .replaceContentLeft{
                        width: 100%;
                        .replaceContentFlex{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            img{
                                width: 70px;
                                height: 70px;
                                border:1px solid rgba(214,222,239,1)
                            }
                            .selectedlist{
                                margin-left: 26px;
                                .inp{
                                    width: 200px;
                                    height: 35px;
                                    box-sizing: border-box;
                                    padding-left: 21px;
                                    padding-top: 11px;
                                    padding-bottom: 11px;
                                    line-height: 35px;
                                    border:1px solid rgba(214,222,239,1);
                                    color: #606266;
                                    margin-bottom: 13px;
                                }
                                .selectedWrap{
                                    display: flex;
                                    align-items: center;
                                    span{
                                        font-size:14px;
                                        font-family:Microsoft YaHei;
                                        font-weight:400;
                                        color:rgba(74, 153, 250, 1)
                                    }
                                }
                            }
                        }
                        .undate{
                            margin-top: 10px;
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
                    }
                    .replaceContentRight{
                        display: flex;
                        width: 20px;
                        height: 20px;
                        display: inline-block;
                        background:url("../../../../../../common/images/application/delete.png");
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
    .functionEditing{
        margin-top: 41px;
    }
/deep/.selected{
    width: 200px;
}
}

</style>