<template>
  <div class="margin interfacea">
    <div class="mcard" style="overflow: hidden;">
      <div class="title">商城界面配置</div>
        <div>
         <div>
              <el-button type="primary" size="small">商城设置</el-button>
              <span class="imgT" @click="mallSetting">
               <img src="../../../../../common/images/icon/收起.png" alt />&nbsp;&nbsp;<span>{{mallTit}}</span>
             </span>
         </div>
         <p class="border_b"></p>
          <el-collapse-transition>
            <div  v-show="mallSettingShow">
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="200px"
                class="demo-ruleForm"
              >
              <div v-for="(item,index) in dataArr" :key="index">
                <el-form-item  v-if="index>=4"  :label="item.settingName+'：'" prop="name">
                  <div v-if="item.settingInfoList[0].btnType==='radio'">
                    <el-radio-group v-model="item.radioValue">
                      <el-radio
                        :label="data.key"
                        v-for="(data,val) in item.settingInfoList"
                        :key="val"
                      >{{data.text}}</el-radio>
                    </el-radio-group>
                  </div>
                  <div v-if="item.settingInfoList[0].btnType==='checkBox'">
                    <el-checkbox-group v-model="item.radioArr">
                      <el-checkbox
                        v-for="data in item.settingInfoList"
                        :label="data.key"
                        :key="data.key"
                      >{{data.text}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                  <div v-if="item.settingInfoList[0].btnType==='input_number'">
                    <el-input
                      v-model="item.input"
                      placeholder="请输入内容"
                      size="medium"
                      type="number"
                      style="max-width:300px"
                    ></el-input>
                  </div>
                  <div v-if="item.settingInfoList[0].btnType=='input_text'">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="item.input"></el-input>
                  </div>
                  <div v-if="item.settingInfoList[0].btnType=='input_image'">
                      <div class="top_img">
                          <span class='deleimg' @click.stop='deleteimg(item)' v-if="item.input">
                          <span>x</span>
                         </span>
                          <img v-if="item.input" :src="item.input" class="avatar" />
                      </div>
                      <div class="bottom_img" v-if="!item.input">
                          <el-upload
                          accept=".jpg,.png,.gif,.JPG,.JPEG,.PBG,.GIF,"
                          class="avatar-uploader"
                          :action="action"
                          :show-file-list="false"
                          :on-success="(res, file)=>handleAvatarSuccess(res, file,item)"
                        >
                      
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                      </div>
                  
                  </div>
                </el-form-item>
              </div>
            </el-form>
         </div>
        </el-collapse-transition>
        <p class="bg_manger"  v-show="mallSettingShow"></p>
      </div>
      <div class="btn_par">
        <div class="btn_div">
          <el-button type="danger" size="small" @click="resert">重 置</el-button>
          <el-button type="primary" size="small" @click="submit">确 定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { findlistByparentcode, updateByCode } from "@/api/systemsettings/index";
import { throttleTipPop } from "@/utils/throttle";
import { async } from "q";

export default {
  name: "SelfSetting",
  data() {
    return {
      backstageShow:true,
      backstageTit:"收起",
      mallSettingShow:true,
      mallTit:'收起',
      backLinkShow:true,
      backTit:'收起',
      action:'', // 上传地址
      dataArr: [], //全部数据
      ruleForm: {},
      rules: {},
      form:{ 
        column:[
          {
            columnName:'',
            columnlink:''
         }
         ],
        copyRight:[
          {
            copyRightInfo:''
          }
        ]
      }
    }
  },
  created() {
    this.action =  this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
    this._findlistByparentcode();
  },
  methods: {
    async _findlistByparentcode() {
      const { data } = await findlistByparentcode("main");
      data.forEach(item => {
        item.radioValue = "";
        item.radioArr = [];
        item.input = "";
        item.settingInfoList.forEach(val => {
          if (val.checkValue == "true" && val.btnType == "radio") {
            item.radioValue = val.key;
          } else if (val.checkValue == "true" && val.btnType == "checkBox") {
            item.radioArr.push(val.key);
          } else if (val.btnType == "input_number") {
            item.input = val.checkValue;
          } else if (val.btnType == "input_text") {
            item.input = val.checkValue;
          }else {
            item.input = val.checkValue;
          }
          console.log(val)
        });
      });
      this.dataArr = data;
      console.log( this.dataArr )
    },
    backstage(){
      this.backstageShow = !this.backstageShow
      if(  this.backstageShow ){
        this.backstageTit = '收起'
      }else{
        this.backstageTit = '展开'
      }
    },
    mallSetting(){
      this.mallSettingShow = !this.mallSettingShow
      if(  this.mallSettingShow ){
        this.mallTit = '收起'
      }else{
        this.mallTit = '展开'
      }
    },
    backLink(){
      this.backLinkShow = !this.backLinkShow
      if(  this.backLinkShow ){
        this.backTit = '收起'
      }else{
        this.backTit = '展开'
      }
    },
    deleteimg(val){
      val.input = ''
    },
    addcolumn(){
       this.form.column.push({
        columnName:'',
        columnlink:''
       })
    },
    deletecolumn(val){
      this.form.column.splice(val, 1);
    },
    deleteInfo(val){
       this.form.copyRight.splice(val, 1);
    },
    resert() {
      this._findlistByparentcode();
    },
    handleAvatarSuccess(res, file,item) {
      item.input = res.data.domain + res.data.filePath;
    },
    //处理时间
    async submit() {
      let systemSettingEdit = [];
      let Arr = JSON.parse(JSON.stringify(this.dataArr));
      Arr.forEach(item => {
        console.log(item)
        item.radioValue != "" ? item.radioArr.push(item.radioValue) : "";
        //item.input != "" ? item.radioArr.push(item.input) : "";
        item.radioArr.push(item.input)
        item.keyValues = [];
        item.radioArr.forEach((val, index, array) => {
          let obj = {}
          obj.key = item.settingInfoList[index].key;
          obj.value = val;
          item.keyValues.push(obj)

          /*let obj = {};
          item.input != ""
            ? (obj[item.settingInfoList[0].key] = item.input)
            : (obj[val] = item.input ? item.input : "");
          item.keyValues.push(obj);*/
        });
        systemSettingEdit.push({
          code: item.settingCode,
          keyValues: item.keyValues
        });
      });
      try {
        let data = await updateByCode(systemSettingEdit);
        data.code == 200 ? throttleTipPop(this, "success", data.message) : "";
      } finally {
        systemSettingEdit = [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.btn_par{
  width: 100%;
  text-align: center;
}
.bg_manger{
    width: 100%;
    height: 10px;
    background: #f7f7f7;
    margin: 20px 0;
}
.border_b{
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #409EFF;
  margin: 20px 0;
}
.imgT{
  float: right;
  margin: 8px 50px 0 0;
  cursor: pointer;
}
.form-wrapper {
  margin-top: 30px;
  width: 600px;
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    max-width: 500px;
    min-height: 100px;
    line-height: 100px;
    text-align: center;
  }
}
.margin {
  margin-top: 0 !important;
  padding-left: 0 !important;
  border: 1px solid rgba(214, 222, 239, 1);
}
.select_div {
  .top_btn {
    padding-left: 100px;
    padding-top: 20px;
    position: relative;
    .iconfont {
      color: #66b1ff;
    }
    .icfont_span {
      position: absolute;
      right: 150px;
      cursor: pointer;
    }
  }
  .checkbox_div {
    padding-left: 150px;
  }
  .select_btn {
    margin-left: 25px;
    width: 88px;
    height: 32px;
    background: rgba(76, 134, 244, 1);
    border-radius: 3px;
    text-align: center;
    line-height: 32px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    position: relative;
    top: 7px;
  }
  .line {
    width: 94%;
    margin: 20px 0;
    height: 1px;
    border: 1px dashed rgba(177, 213, 252, 1);
    margin-bottom: 10px;
  }
  .line_div {
    width: 94%;
    height: 10px;
    margin-top: 30px;
    background: rgba(245, 248, 252, 1);
  }
}
.icon-biao {
  color: #5dc349;
}
.dilog .el-checkbox {
  width: 50%;
  margin-right: 0;
  padding-left: 30px;
}
.line {
  width: 94%;
  margin: 20px 0;
  margin-bottom: 10px;
  height: 1px;
  border: 1px dashed rgba(177, 213, 252, 1);
}
.btm_divtop {
  margin-top: 20px;
  display: flex;
}
.btm_div {
  display: flex;
}
.role {
  color: #606266;
  margin-left: 20px;
}
.role1 {
  color: #606266;
  margin-left: 10px;
}
.icon-add {
  color: #4c86f4;
}
.add {
  margin-left: 30px;
  cursor: pointer;
}
.icon-del {
  color: #4c86f4;
}
.btn_div {
  float: left;
  width: 100%;
}
.tip {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(245, 108, 108, 1);
  padding-left: 50px;
}
.lines_div {
  display: flex;
  align-items: center;
}
.ing_div {
  padding-left: 50px;
}
.dele_div {
  position: relative;
  .dete_icon {
    display: flex;
    flex-direction: column;
    width: 100px;
    text-align: center;
    position: absolute;
    right: 200px;
    span {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(144, 147, 153, 1);
      margin-top: 3px;
    }
  }

  .icon-shanchu {
    font-size: 24px;
    color: #f56c6c;
  }
}
.margin {
  margin-top: 0 !important;
  padding-left: 0 !important;
  border: 1px solid rgba(214, 222, 239, 1);
}
.avatar{
  width:500px;
}
/deep/ .el-form-item__content{
  line-height: 0 ;
}
/deep/ .el-upload{
  min-width:148px;
  min-height:148px;
  position:relative;
}
.deleimg{
  position:absolute;
  right:0;
  top:0;
  width:0;
  height:0;
  border:14px #4C86F4 solid;
  border-color:  #4C86F4 #4C86F4 transparent  transparent;
  color:white;
}
.deleimg span{
  position: absolute;
  top: -5px;
  right: -10px;
}
.top_img{
  display: inline-block;
  position: relative;
}
.top_img .deleimg{
  position: absolute;
  cursor: pointer;
}
.top_img  .avatar{
  width: 300px;
  padding: 10px;
  border: 1px solid #ececec;
}
.bottom_img{
  display: inline-block;
  vertical-align: top;
  margin-left: 10px;
}
/deep/ .el-icon-plus{
  position: relative;
  top: 67px;
}
</style>
