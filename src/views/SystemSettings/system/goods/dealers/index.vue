<template>
    <div class="mcard">
      <div class="title">商品价格浮动配置</div>
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="180px"
          class="demo-ruleForm"
        >
          <el-form-item label="" label-width="180px">
            <el-dropdown  @command="handleCommand">
              <el-button type="primary" class="btn_color">
                {{text}}<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="4">上调价格</el-dropdown-item>
                <el-dropdown-item command="5">下调价格</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
          <el-form-item label="商品价格浮动审核：" prop="name">
            <el-radio-group v-model="ruleForm.enable">
              <el-radio label="0">需要审核</el-radio>
              <el-radio label="1">不需要审核</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否支持开发票：" prop="name">
            <el-radio-group v-model="ruleForm.invoice">
              <el-radio label="true">支持</el-radio>
              <el-radio label="false">不支持</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="审核对象类型：" prop="name">商品价格浮动 - {{text}}</el-form-item>
          <el-form-item label="审核模式：" prop="name">
            <el-radio-group v-model="ruleForm.auditMode">
              <el-radio-group v-model="ruleForm.auditMode">
                <el-radio label="1">顺序审核</el-radio>
                <el-radio label="2">全部审核</el-radio>
                <el-radio label="3">一票审核</el-radio>
              </el-radio-group>
            </el-radio-group>
          </el-form-item>
          <div v-for="(item,index) in ruleForm.settingList" :key="index">
            <div class="line" style="margin-left: 3%;"></div>
            <div class="dele_div">
              <div class="dete_icon" @click="deterecord(index)">
                <i class="iconfont icon-shanchu"></i>
                <span>删除此记录</span>
              </div>
              <el-form-item label="额度：" prop="name">
                <div class="lines_div">
                  <el-radio-group v-model="item.amountType ">
                    <el-radio label="0">不限</el-radio>
                    <el-radio label="1">自定义</el-radio>
                  </el-radio-group>
                  <span class="tip" v-if="item.amountType  == '0'">
                    <i class="iconfont icon-tip"></i> 您未限定审核额度，请定期关注您商城额度的使用情况，避免造成额度使用过大给您带来不必要的压力。
                  </span>
                  <div v-if="item.amountType  == '1'" class="ing_div">
                    <el-input
                      v-model="item.amountStart"
                      style="max-width:80px"
                      size="medium"
                      placeholder="请输入"
                    ></el-input>
                    <span> - </span>
                    <el-input
                      style="max-width:80px"
                      v-model="item.amountEnd"
                      size="medium"
                      placeholder="请输入"
                    ></el-input>%
                  </div>
                </div>
              </el-form-item>
              <div
                :class="index==0?'btm_divtop btm_div':'btm_div'"
                v-for="(val,index2) in item.auditRoleList"
                :key="index2"
              >
                <el-form-item style="width: 300px;" v-show="index2>0" label="部门："  >
                  <treeselect
                          style="width:218px"
                          :options='options'
                          search-nested
                          placeholder="请选择"
                          v-model="val.organizeId"
                          @select="_handleSelect($event, index, index2, true)"
                  />
                  <span class="span_red" v-show="val.showOrgan">请选择部门</span>
                </el-form-item>
                <el-form-item  v-show="index2>0"  label="审核人：">
                  <el-select v-model="val.userId"
                             @change="select(val, 'user')" >
                    <el-option
                            v-for="(it,ind) in userSelect[index][index2]"
                            :key="ind"
                            :label="it.sysuserName"
                            :value="it.sysuserId">
                    </el-option>
                  </el-select>
                  <span class="span_red" v-if="val.show">请选择审核人</span>
                </el-form-item>
                <!--<el-form-item label="审核人：">
                  <el-select
                    v-model="val.roleId"
                    placeholder="请选择"
                    size="medium"
                    @change="select(val)"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.roleId"
                      :label="item.roleName"
                      :value="item.roleId"
                    ></el-option>
                  </el-select>
                  <span class="span_red" v-if="val.show">请选择审核人</span>
                </el-form-item>-->
                  <el-form-item v-if="index2==0" label="管理员审核权限：" label-width="248px">
                      <el-radio-group v-model="val.permission" @change="select(val, 'permission')">
                          <el-radio style="margin:0px 5px;" label="1">提交审批</el-radio>
                          <el-radio style="margin:0px 5px;" label="2">初级审批</el-radio>
                          <el-radio style="margin:0px 5px;" label="3">继续审批</el-radio>
                          <el-radio style="margin:0px 5px;" label="4">终极审批</el-radio>
                      </el-radio-group>
                      <span class="span_red" v-if="val.showradio">请选择审核权限</span>
                  </el-form-item>
                <el-form-item v-if="index2>0" label="审核权限：" label-width="100px">
                  <el-radio-group v-model="val.permission" @change="select(val, 'permission')">
                    <el-radio style="margin:0px 5px;" label="1">提交审批</el-radio>
                    <el-radio style="margin:0px 5px;" label="2">初级审批</el-radio>
                    <el-radio style="margin:0px 5px;" label="3">继续审批</el-radio>
                    <el-radio style="margin:0px 5px;" label="4">终极审批</el-radio>
                  </el-radio-group>
                  <span class="span_red" v-if="val.showradio">请选择审核权限</span>
                </el-form-item>
                <span
                  class="add"
                  v-if="index2 == item.auditRoleList.length-1"
                  @click="addRole(item.auditRoleList, index)"
                >
                  <i class="iconfont icon-add"></i>
                  <span class="role1">增加</span>
                </span>
                <span
                  class="add"
                  v-if="index2 >= 1"
                  @click="deleteRole(index2 , item.auditRoleList)"
                >
                  <i class="iconfont icon-del"></i>
                  <span class="role1">删除</span>
                </span>
              </div>
            </div>
          </div>
          <div class="line" style="margin-left: 3%;"></div>
          <div class="add_div">
            <el-button type="primary" size="small" @click="addsales">新增</el-button>
          </div>
        </el-form>
        <div class="btn_div">
          <el-button type="danger" size="small" @click="resert">重 置</el-button>
          <el-button type="primary" size="small" @click="submit">确 定</el-button>
        </div>
      </div>
  </div>
</template>
<script>

import { findAmountAuditByType, updateAmountAudit } from "@/api/systemsettings/index";
import { throttleTipPop } from "@/utils/throttle";
import { getChildNodes, AmountAuditType} from "@/api/systemsettings/index";
import { getRole,getAllOrganizational } from "@/api/permissions/index";
import Treeselect from '@riophae/vue-treeselect'

export default {
  name: "SelfSetting",
  components: { Treeselect },
  data() {
    return {
      state: true, //通过验证
      small_rmb: "",
      big_rmb: "",
      ruleForm: {
        settingList: [],
        enable: "",
        invoice: "false",
        auditMode: "",
        amountType: "",
        id: "",
        lines: "1"
      },
      rules: {},
      //options: [],

      num:'',
      //审核人列表
      userSelect:[],
      //所有部门
      options:[],
      //首个部门
      firstOrganize:'',
      text:'下调价格',
      type:5,//
      map:{}
    };
  },
  created() {
    //this._getRole();
    this._getAllOrganizational();
    //this._findAmountAuditByType();
    //this.verifyRequire();
    this.handleCommand(4);
  },
  methods: {
    //下拉点击
    handleCommand(val){
      if (val==4){
        this.text="上调价格";
      }else if(val==5){
        this.text="下调价格";
      }
      this.type = val;
      this._findAmountAuditByType()
    },
    //获取部门id
    async _handleSelect(val, index, index2, clear=false){
      let $this = this;
      if(typeof $this.userSelect[index] == 'undefined'){
        $this.userSelect[index] = [];
      }
      if(!this.userSelect[index]){
        $this.userSelect[index] = [];
      }
      if(!this.userSelect[index][index2]){
        $this.userSelect[index][index2] = [];
      }
      console.log(index+":"+index2+" :"+val.label);
      console.log($this.userSelect[index][index2] );
      if(clear){
        $this.ruleForm.settingList[index].auditRoleList[index2].userId=null;
        this.verifyRequire();
      }
      if(true){
        const organizeId = val.id
        if(!organizeId)return ;
        if(!this.map[organizeId])this.map[organizeId] = [];
        if(this.map[organizeId].length==0){
          const res = await getChildNodes(organizeId)
          if(res.code === 200){
            $this.userSelect[index][index2] = res.data;
            this.map[organizeId]=res.data;
            let userList = $this.userSelect[index];
            $this.userSelect[index] = [...userList];
            $this.userSelect = [...$this.userSelect];
          }
        }else {
          $this.userSelect[index][index2] = this.map[organizeId];
          let userList = $this.userSelect[index];
          $this.userSelect[index] = [...userList];
          $this.userSelect = [...$this.userSelect];
        }
      }else {

      }
    },
    _getAllOrganizational() {
      getAllOrganizational().then(res => {
        let arr = [];
        arr.push(res.data);
        this.transleteData(arr, this.options);
        //构建树形菜单
        console.log(this.options)
        this.IterationDelateMenuChildren(this.options);
        if(this.options){
          this.firstOrganize = this.options[0].value;
        }
      });
    },
    //根据部门，下标触发用户列表
    showUserList(organize, index, index2){
      let obj={
        id:organize.organizeId,
        value:organize.organizeId,
        label:"label",
      }
      this._handleSelect(obj,index, index2);
    },
    transleteData(data, arr) {
      data.forEach(item => {
        if (!item.parentId) {
          item.parentId = 0;
          item.parentName = "所有部门";
        }
        const msg = {
          id: item.organizeId,
          label: item.organizeName,
          value: item.organizeId,
          children: item.childNodes ? [] : null,
          isLeaf: item.childNodes ? false : true
        };
        if (item.childNodes && item.childNodes.length > 0) {
          this.transleteData(item.childNodes, msg.children);
        }
        arr.push(msg);
      });
      return arr;
    },
    IterationDelateMenuChildren(arr) {
      if (arr.length) {
        for (let i in arr) {
          if (arr[i].children.length) {
            this.IterationDelateMenuChildren(arr[i].children);
          } else {
            delete arr[i].children;
          }
        }
      }
      return arr;
    },



    //删除此记录
    deterecord(index){
      console.log('触发啦')
      console.log(index)
      this.ruleForm.settingList.splice(index,1)
    },
    //新增
    addsales(){
      let def = this.firstOrganize||'1';
      this.ruleForm.settingList.push({
        amountType:'0',
        amountStart:'',
        amountEnd:'',
        auditRoleList:[
          {
            roleId:'',
            userIds:[],
            permission:'',
            show:false,
            showradio:false,
            showOrgan:false,
            organizeId:def,
            organizeName:'',
          },
        ],
        sortOrder: this.ruleForm.settingList.length
      });
      this.userSelect.push([]);
      this.showUserList({organizeId:def}, this.ruleForm.settingList.length-1, 0);
    },
    select(val, type='') {
      console.log(val, type)
      if(type=='permission'){
        val ? (val.showradio = false) : "";
      }else if (type=='user') {
        val ? (val.show = false) : "";
      }else if (type=='organize') {
        val ? (val.showOrgan = false) : "";
      }
    },
    //查询数据
    async _findAmountAuditByType() {
      let $this = this;
      let { data } = await findAmountAuditByType(this.type);
      this.ruleForm.enable = data.enable ? "0" : "1";
      this.ruleForm.id = data.id;
      this.ruleForm.auditMode = JSON.stringify(data.auditMode);
      let userSelect = [];
      data.settingList.forEach((val, index1) => {
        userSelect.push([]);

        val.amountType = JSON.stringify(val.amountType);
        val.auditRoleList.forEach(item => {
          if(!userSelect[index1]){
            userSelect[index1] = [];
          }else {
            userSelect[index1].push([]);
          }

          val.show = false; //控制审核人判断
          val.showradio = false; // 控制审核权限判断
          val.showOrgan = false; // 控制审核权限判断
          item.permission = JSON.stringify(item.permission);

        });
      });
      this.userSelect = [...userSelect];
      this.ruleForm.settingList = data.settingList;

      $this.ruleForm.settingList.forEach((val, index1, array1)=>{
            val.auditRoleList.forEach((value, index2, array2) => {
               $this.showUserList(value,index1,index2);
            });
      })
    },
    //重置
    resert() {
      this._findAmountAuditByType();
    },
    verifyRequire(){
      this.ruleForm.settingList.forEach(item => {
        item.auditRoleList.forEach((val,index) => {
          val.organizeId ? (val.showOrgan = false) : (val.showOrgan = true);
          //val.userId ? (val.show = false) : (val.show = true);
          val.show=false;
          val.permission ? (val.showradio = false) : (val.showradio = true);
          val.sortOrder = index;
        });
      });
      this.ruleForm.settingList = [...this.ruleForm.settingList]
      let arr = this.ruleForm.settingList;
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].auditRoleList.length; j++) {
          if (
                  arr[i].auditRoleList[j].show ||
                  arr[i].auditRoleList[j].showradio||arr[i].auditRoleList[j].showOrgan
          ) {
            return true;
          }
        }
      }
      return false;
    },
    async submit() {
      let obj = JSON.parse(JSON.stringify(this.ruleForm));
      obj.enable == "0" ? (obj.enable = true) : (obj.enable = false);
      if(this.verifyRequire())return true;
      let data = await updateAmountAudit(obj);
      if (data.code == 200) {
        throttleTipPop(this, "success", "操作成功");
      }
    },
    //增加审核
    addRole(data, index) {
      let def = this.firstOrganize||'1';
      data.push({
        permission: "",
        roleId: "",
        roleName: "",
        sortOrder: 0,
        remark: "",
        show: false,
        showradio: false,
        showOrgan: false,
        organizeId:def,
        organizeName:'',
      });
      this.showUserList({organizeId:def},index,data.length-1);
    },
    //删除审核
    deleteRole(val, data) {
      data.splice(val, 1);
    },
    _getRole() {
      let obj = {};
      obj.currentPage = 1;
      obj.size = 0;
      getRole(obj).then(res => {
        this.options = res.data.list;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
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
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
}
.margin {
  margin-top: 0 !important;
  padding-left: 0 !important;
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
.el-checkbox {
  margin-top: 20px;
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
  position: relative;
  top: 12px;
}
.icon-del {
  color: #4c86f4;
}
.btn_div {
  text-align: center;
  margin-top: 5px;
  width: 74%;
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
    z-index:100;
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
.span_red {
  color: #f56c6c;
  position: absolute;
  left: 0;
  top: 31px;
}
.add_div{
  padding-left: 10px;
}
</style>
