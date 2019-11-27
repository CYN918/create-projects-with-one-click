<template>
    <div class="editingErea">
        <div class="text">
            <span class="edit">编辑专区展示</span>
            <p>
                <el-switch v-model="value1"> </el-switch>
                <span>关闭后，功能区不可见</span>
            </p>
        </div>
        <div class="editingEreaContainer">
            <p class="dragText">
                <img src="../../../../../../common/images/application/xiaoshou.png" alt="">
                <span>拖动进行排序</span>
            </p>
            <!--编辑颜色-->
            <div class="edidColor">
                <div class="edidColorLeft">
                    <p class="modification">
                        <img src="../../../../../../common/images/application/left.png" alt="">
                        <img src="../../../../../../common/images/application/right.png" alt="">
                    </p>
                    <span class="unpdate">重新上传</span>
                    <span class="suggest">建议尺寸20*17像素</span>
                </div>
                <div class="edidColorRight">
                    <div class="edidColorRightL">
                        <input type="text" v-model="text" class="int">
                        <div style="display: flex; align-items: center">
                            <div class="selected">
                                <el-select  v-model="value" placeholder="商品专题" >
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>

                            </div>
                            <span class="replace">更换</span>
                        </div>
                    </div>
                    <span class="delete"></span>
                </div>
            </div>

            <!--编辑微页面-->
            <div class="editMicropage">
                <ul class="editMicropageList">
                    <li class="editMicropageAll" v-for="item in arr">
                        <img src="../../../../../../common/images/application/back.jpg" alt="">
                        <div class="editMicropageAllRight">
                            <div class="undateText">
                                <p class="undate">
                                    <span class="renew">重新上传</span>
                                    <span class="suggest">建议尺寸70*70像素</span>
                                </p>
                                <div style="display: flex; align-items: center">
                                    <div class="selected">
                                        <el-select  v-model="value" placeholder="商品专题" >
                                            <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>

                                    </div>
                                    <span class="replace">更换</span>
                                </div>
                            </div>
                            <span class="delete"></span>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="btn">
                <el-button type="primary" class="btnLeft">增加专区入口</el-button>
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
            text:'折扣折区',
            arr:[1,2,3,4,5,6]
        }
    }
}
</script>
<style lang="scss">
.editingErea{
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
    .editingEreaContainer{
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
      .edidColor {
          margin-top: 24px;
          display: flex;
          .edidColorLeft{
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .modification{
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  width: 70px;
              }
              .unpdate{
                  margin-top: 10px;
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
                  margin-top: 10px;
                  display: inline-block;
                  width:125px;
                  text-align: center;
                  height:13px;
                  font-size:12px;
                  font-family:Microsoft YaHei;
                  font-weight:400;
                  color:rgba(196,198,204,1);
              }
          }
          .edidColorRight{
              display: flex;
              margin-left: 56px;
              .edidColorRightL{
                  display: flex;
                  height: 79px;
                  flex-direction: column;
                  justify-content: space-between;
                  .int{
                      box-sizing: border-box;
                      padding: 11px 0 11px 21px;
                      width:200px;
                      height:35px;
                      border:1px solid rgba(214,222,239,1);
                      font-size:14px;
                      font-family:Microsoft YaHei;
                      font-weight:400;
                      color:rgba(96,98,102,1);
                  }
                  .replace{
                      font-size:14px;
                      font-family:Microsoft YaHei;
                      font-weight:400;
                      color:rgba(74, 153, 250, 1)
                  }
              }
              .delete{
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
      .editMicropage{
          .editMicropageList{
              .editMicropageAll{
                  margin-top: 21px;
                  display: flex;
                  align-items: center;
                 img{
                     width: 125px;
                     height: 75px;
                 }
                  .editMicropageAllRight{
                      margin-left: 54px;
                      display: flex;
                      .undateText{
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
                          .replace{
                              font-size: 14px;
                              font-family: Microsoft YaHei;
                              font-weight: 400;
                              color: #4a99fa;
                          }
                      }
                      .delete{
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
/deep/.selected{
    width: 200px;
    height: 35px;
}
}
</style>