<template>
  <div class>
    <div class="mcard">
      <div class="title">折扣率申请审核配置</div>
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="180px"
          class="demo-ruleForm"
        >
          <el-form-item label="企业创建或入驻时审核：" prop="name">
            <el-radio-group v-model="ruleForm.enable">
              <el-radio label="0">需要审核</el-radio>
              <el-radio label="1">不需要审核</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="审核对象类型：" prop="name">商品</el-form-item>
          <el-form-item label="审核模式：" prop="name">
            <el-radio-group v-model="ruleForm.auditMode">
              <el-radio label="1">顺序审核</el-radio>
              <el-radio label="2">全部审核</el-radio>
              <el-radio label="3">一票审核</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="line" style="margin-left: 3%;"></div>
          <div
            :class="index==0?'btm_divtop btm_div':'btm_div'"
            v-for="(item,index) in ruleForm.auditRoleList"
            :key="index"
          >
          <el-form-item
                style="width: 300px;"
                label="公司名称："
                :prop="'auditRoleList.'+ index +'.companyId'"
                :rules="{ required: true, message: '请选择公司名称', trigger: 'change' }"
              >
                <treeselect
                  style="width:218px"
                  :options="companyArr"
                  search-nested
                  :key="index"
                  placeholder="请选择"
                  v-model="item.companyId"
                />
              </el-form-item>
            <el-form-item style="width: 300px;" label="部门：" :prop="'auditRoleList.'+ index +'.organizeId'" :rules="{ required: true, message: '请选择部门', trigger: 'change' }">
              <treeselect
                      style="width:218px"
                      :options='options'
                      search-nested
                      :key="index"
                      placeholder="请选择"
                      v-model="item.organizeId"
                      @select="_handleSelect($event, index, true)"
              />
            </el-form-item>
            <el-form-item label="审核人：">
              <el-select v-model="item.userId" :prop="'auditRoleList.'+ index +'.userId'"  :rules="{ required: true, message: '请选择审核人', trigger: 'change' }">
                <el-option
                        v-for="(it,ind) in userSelect[index]"
                        :key="ind"
                        :label="it.sysuserName"
                        :value="it.sysuserId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="审核权限："
              :prop="'auditRoleList.'+ index +'.permission'"
              label-width="100px"
               :rules="{ required: true, message: '请选择审核权限', trigger: 'change' }"
            >
              <el-radio-group v-model="item.permission">
                <el-radio style="margin:0px 5px;" :disabled="disabled" label="1">提交审批</el-radio>
                <el-radio style="margin:0px 5px;" :disabled="disabled" label="2">初级审批</el-radio>
                <el-radio style="margin:0px 5px;" :disabled="disabled" label="3">继续审批</el-radio>
                <el-radio style="margin:0px 5px;" label="4">终极审批</el-radio>
              </el-radio-group>
            </el-form-item>
            <span class="add" v-if="index == ruleForm.auditRoleList.length-1" @click="addRole">
              <i class="iconfont icon-add"></i>
              <span class="role1">增加</span>
            </span>
            <span class="add" v-if="index >= 1" @click="deleteRole(index)">
              <i class="iconfont icon-del"></i>
              <span class="role1">删除</span>
            </span>
          </div>
        </el-form>
        <div class="btn_div">
          <el-button type="danger" size="small" @click="resert" v-permit="'discount:reset'">重 置</el-button>
          <el-button type="primary" size="small" @click="submit" v-permit="'system:setting'">确 定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getfindbytype , ediotfindbytype} from "@/api/systemsettings/index";
import { getChildNodes} from "@/api/systemsettings/index";
import { getRole,getAllOrganizational,getrootnode } from "@/api/permissions/index";
import { throttleTipPop } from "@/utils/throttle";
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: { Treeselect },
  name: "SelfSetting",
  data() {
    return {
      disabled:true,
      value:'',
      defaultProps:'',
      companyArr: [],
      users:[],  //用户
      ruleForm: {
        enable: "",                   //经销商创建或入驻时审核
        auditMode: "",                //审核模式
        auditRoleList: [{ roleId: "", permission: "" ,userId:'', organizeId: '', organizeName: ''}],
        id:'',
      },
      rules: {},


      //审核人列表
      userSelect:[],
      //所有部门
      options:[],
      //首个部门
      firstOrganize:'',
    };
  },
  created() {
    this.getrootnode();

  },
  methods: {
    //获取公司名称
    async getrootnode() {
      const { data } = await getrootnode();
      data.label = data.organizeName;
      data.id = data.organizeId;
      this.companyArr.push(data);



      this._getfindbytype();
      this._getAllOrganizational();
    },
    //获取部门id
    async _handleSelect(val, index, clear=false){
      let $this = this;
      if(typeof $this.userSelect[index] == 'undefined'){
        $this.userSelect[index] = [];
      }
      if(!this.userSelect[index]){
        $this.userSelect[index] = [];
      }

      if(true){
        const organizeId = val.id
        if(!organizeId)return ;
        const res = await getChildNodes(organizeId)
        if(res.code === 200){
          $this.userSelect[index] = res.data
          $this.userSelect = [...$this.userSelect];
        }
      }
      //再次选择得时候清空用户
      if(clear){
        $this.ruleForm.auditRoleList[index].userId=null;
        $this.ruleForm.auditRoleList = [...$this.ruleForm.auditRoleList];
      }
    },
    //增加审核
    addRole() {
      let def = this.firstOrganize||'1';
      this.ruleForm.auditRoleList.push({
        permission: "",
        roleId: "",
        userId:null,
        organizeId:def,
        organizeName:'',
        roleName: "",
        sortOrder: this.ruleForm.auditRoleList.length,
        remark:'',
        companyId: this.companyArr[0].id
      });
      this.showUserList({organizeId:def},this.ruleForm.auditRoleList.length-1);
    },
    _getfindbytype() {
      let $this = this;
      // 获取审核信息
      getfindbytype(301).then(res => {
        $this.ruleForm.enable = res.data.enable ? "0" : "1";
        $this.ruleForm.id = res.data.id
        $this.ruleForm.auditMode = JSON.stringify(res.data.auditMode);
         this.setting( $this.ruleForm.auditMode )
        res.data.auditRoleList.forEach(item => {
          item.permission = JSON.stringify(item.permission);
        });
        $this.ruleForm.auditRoleList = res.data.auditRoleList;

        $this.ruleForm.auditRoleList.forEach((value, index, array)=>{
          value.companyId = this.companyArr[0].id;
          $this.showUserList(value,index);
        })
      });
    },
    _getAllOrganizational() {
      getAllOrganizational().then(res => {
        let arr = [];
        arr.push(res.data);
        this.transleteData(arr, this.options);
        //构建树形菜单
        this.IterationDelateMenuChildren(this.options);
        if(this.options){
          this.firstOrganize = this.options[0].organizeId;
        }
      });
    },
    //根据部门，下标触发用户列表
    showUserList(organize, index){
      let obj={
        id:organize.organizeId,
        value:organize.organizeId,
        label:"label",
      }
      this._handleSelect(obj,index);
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


    //重置
    resert() {
      this._getfindbytype();
    },
    submit() {
      // 检测顺讯审核时，只能有终极审批
      if( this.ruleForm.auditMode ==1 ){
           var len = 0
           this.ruleForm.auditRoleList.forEach( data =>{
             if ( data.permission == '4' ){
                 len ++
             }
          })
          if( len >=2 ){
              this.$message({
                showClose: true,
                message: '审核模式为顺序审核时，审核权限有且只能有一个终极审批',
                type: 'warning'
              });
              return
            }
      }
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let obj = JSON.parse(JSON.stringify(this.ruleForm))
          obj.enable == '0'?obj.enable=true:obj.enable=false
          ediotfindbytype(obj).then(res => {
            if(res.code == 200){
              throttleTipPop(this,'success','操作成功')
            }
          })
        } else {
          return false;
        }
      });
    },

    //删除审核
    deleteRole(val) {
      this.ruleForm.auditRoleList.splice(val, 1);
    },
    // 设置
    setting(val){
         if( val == '3' ){
          this.ruleForm.auditRoleList.forEach( data =>{
            data.permission = '4'
            this.disabled = true
          })
        }else{
            this.disabled = false
        }
    },


    /*_getRole() {
      let obj = {};
      obj.currentPage = 1;
      obj.size = 0;
      getRole(obj).then(res => {
        this.options = res.data.list;
      });
    },*/
    //获取所有部门

  },
  watch: {
      'ruleForm.auditMode' (val){
         this.setting(val)
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
  position: relative;
  top: 12px;
}
.icon-del {
  color: #4c86f4;
}
.btn_div {
  text-align: center;
  width: 74%;
}
</style>
