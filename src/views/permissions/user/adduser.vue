<template>
  <div class="margin adduser">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="small">
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <el-page-header @back="back" content="用户管理信息"></el-page-header>
          </div>
        </div>
      </div>
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper">
            <h4 class="title">用户管理信息</h4>
            <br />
            <el-row>
              <el-col :span="7">
                <el-form-item label="用户账号:" prop="sysuserAccount">
                  <el-input
                    :disabled="show"
                    v-model="form.sysuserAccount"
                    placeholder="请填写登录账号"
                    auto-complete="new-password"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="密码:" prop="password">
                  <el-input
                    :disabled="show"
                    v-model="form.password"
                    placeholder="请填写密码"
                    type="password"
                    auto-complete="new-password"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7">
                <el-form-item label="用户名:" prop="sysuserName">
                  <el-input v-model="form.sysuserName" placeholder="请输入用户名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="真实姓名:" prop="realName">
                  <el-input v-model="form.realName" placeholder="请填写真实姓名"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7">
                <el-form-item label="角色权限:" prop="roleIds">
                  <el-select
                    class="el-select-width"
                    placeholder="请选择"
                    multiple
                    v-model="form.roleIds"
                    style="width: 300px"
                  >
                    <el-option
                      v-for="(item,index) in userOptions"
                      :key="`${item.roleId}`"
                      :label="item.roleName"
                      :value="`${item.roleId}`"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="职称:" prop="position">
                  <el-input v-model="form.position" placeholder="请填写职称"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7">
                <el-form-item label="公司:" prop="company">
                  <el-input v-model="form.company" placeholder="请填写所在公司"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="部门:" prop="organizeId" ref="organizeId">
                  <treeselect
                    style="width:300px"
                    :options="options"
                    :value="form.organizeId"
                    search-nested
                    placeholder="请选择上级组织架构"
                    v-model="form.organizeId"
                    @input="changeId"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7">
                <el-form-item label="状态:" prop="status" v-if="false">
                   <el-select
                           class="el-select-width"
                           v-model="form.status"
                           placeholder="请选择"
                           style="width: 200px"
                   >
                     <el-option label="正常" value="0"></el-option>
                     <el-option label="冻结" value="1"></el-option>
                   </el-select>
                 </el-form-item>
                <el-form-item label="员工工号:">
                  <el-input v-model="form.employeeSn" placeholder="请输入员工工号"></el-input>
                </el-form-item>
               </el-col>
                <el-col :span="8">
                   <el-form-item label="职位管理:">
                    <treeselect
                     style="width:300px"
                      :options="options1"
                      search-nested
                      placeholder="请选择职位"
                      v-model="form.positionId"
                    />
                  </el-form-item>
               </el-col>

            </el-row>
            <el-row>
              <el-col :span="7">
                <el-form-item label="电子邮箱:" prop="date1">
                  <el-input v-model="form.email" placeholder="请填写电子邮箱"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="移动电话:" prop="name">
                  <el-input v-model="form.telephone" placeholder="请填写移动电话"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="7">
                <el-form-item label="出生年月:" prop="date2">
                  <el-date-picker
                    v-model="form.birthday"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="QQ:" prop="date2">
                  <el-input v-model="form.qq" placeholder="请输入QQ"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="7">
                <el-form-item label="入职时间:" prop="date1">
                  <el-date-picker
                    v-model="form.hireTime"
                    type="date"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="yyyy-MM-dd"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
                <el-col :span="8">
                <el-form-item label="身份证:" prop="date2">
                  <el-input v-model="form.idCard" placeholder="请输入身份证号码"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="7">
                <el-form-item label="是否已婚:" prop="resource">
                  <el-select
                    class="el-select-width"
                    v-model="form.maritalStatus"
                    placeholder="请选择"
                    style="width: 300px"
                  >
                    <el-option label="未婚" value="0"></el-option>
                    <el-option label="已婚" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
               <el-col :span="8">
                <el-form-item label="学历:" prop="date2" style="width: 300px">
                  <el-select
                    class="el-select-width"
                    v-model="form.educationalLevel"
                    placeholder="请选择"
                    style="width: 300px"
                  >
                    <el-option label="小学" value="小学"></el-option>
                    <el-option label="初中" value="初中"></el-option>
                    <el-option label="高中" value="高中"></el-option>
                    <el-option label="大专" value="大专"></el-option>
                    <el-option label="本科" value="本科"></el-option>
                    <el-option label="研究生" value="研究生"></el-option>
                    <el-option label="博士" value="博士"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <!-- <el-col :span="7">
                <el-form-item label="排序:" prop="resource">
                  <el-input v-model="form.sortOrder" placeholder="请输入排序号"></el-input>
                </el-form-item>
              </el-col> -->
              <el-col :span="7">
                <el-form-item label="毕业院校:" prop="date2">
                  <el-input v-model="form.graduatedFrom" placeholder="请输入毕业院校"></el-input>
                </el-form-item>
              </el-col>
             <div>
               <el-col :span="8">
                <el-form-item label="性别:" prop="date2">
                  <el-select
                    class="el-select-width"
                    v-model="form.sex"
                    placeholder="请选择"
                    style="width: 300px"
                  >
                    <el-option label="男" value="0"></el-option>
                    <el-option label="女" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
             </div>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item>
                  <el-button type="primary" size="small" @click="resert">取消</el-button>
                  <el-button size="small" type="primary" @click="sure">确定</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { getCategory, getStoreList } from "@/api/public";
import {
  getAllOrganizational,
  getRole,
  addUser,
  getSysuserById,
  getSysuserByIdList,
  ediotSysuserById
} from "@/api/permissions/index";
import { getParent } from "@/api/permissions/index";
export default {
  data() {
    return {
      options1:[],  // 职位
      show: false, //控制密码禁用
      radio: "1",
      sysuserId: "", //用户id
      form: {
        status:'0',//状态 0 正常  1 禁用
        employeeSn: '', // 员工工号
        positionId:null, // 职位
        sysuserAccount: "", //登录账户
        roleIds: [],
        password: "", //密码
        sysuserName: "", //用户名
        roles: "", //角色权限
        sortOrder: "", //排序
        realName: "", //真实姓名
        sex: "", //性别
        company: "", //所在公司
        organizeId: null, //所在部门
        telephone: "", //电话
        position: "", //职称
        email: "", //邮箱
        qq: "", //qq
        birthday: "", //出生年月
        idCard: "", //身份证
        hireTime: "", //入职时间
        educationalLevel: "", //学历
        maritalStatus: "", //婚姻状态
        graduatedFrom: "", //毕业院校
      },
      rules: {
        position:[
          { required: true, message: "请输入职称", trigger: "blur" }
        ],
        company:[
          { required: true, message: "请输入公司名称", trigger: "blur" }
        ],
        status:[
          { required: true, message: "请选择状态", trigger: "change" }
        ],
        organizeId:[
          { required: true, message: "请输入部门", trigger: "blur" }
        ],
        sysuserAccount: [
          { required: true, message: "请输入登录账号", trigger: "blur" }
        ],
        roleIds:[
          { type: 'array', required: true, message: '请至少选择一个角色权限', trigger: 'change' }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        sysuserName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        realName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ]
      },
      options: [],
      userOptions: []
    };
  },
  created() {
    this.getParent()  // 获取职位
    if (this.$route.query.id) {
      this.show = true;
      this.sysuserId = this.$route.query.id;
      getSysuserByIdList(this.$route.query.id).then(res => {
        this.form.status= res.data.status
        this.form.employeeSn = res.data.employeeSn || ''
        this.form.sysuserAccount = res.data.sysuserAccount; //登录账户
        this.form.password = "我真的是一个密码"; // 密码
        this.form.sysuserName = res.data.sysuserName; //用户名
        this.form.roles = res.data.roles; //角色权限
        this.form.roleIds = (res.data.roles || []).map(item => `${item.roleId}`);
     //   this.form.sortOrder = res.data.sortOrder; //排序
        this.form.realName = res.data.realName; //真实姓名
        this.form.sex = JSON.stringify(res.data.sex); //性别
        this.form.company = res.data.company; //所在公司
        this.form.organizeId = res.data.organize.organizeId; //所在部门
        this.form.telephone = res.data.telephone; //电话
        this.form.position = res.data.title; //职称
        this.form.positionId = res.data.positionId; //职称
        this.form.email = res.data.email; //邮箱
        this.form.qq = res.data.qq; //qq
        (this.form.birthday = res.data.birthday), //出生年月
          (this.form.idCard = res.data.idCard); //身份证
        this.form.hireTime = res.data.hireTime; //入职时间
        this.form.educationalLevel = res.data.educationalLevel; //学历
        this.form.maritalStatus = JSON.stringify(res.data.maritalStatus); //婚姻状态
        this.form.graduatedFrom = res.data.graduatedFrom; //毕业院校
        this.form.status = JSON.stringify(res.data.status); //状态
      });

    }
    getAllOrganizational().then(res => {
      let arr = [];
      arr.push(res.data);
      this.transleteData(arr, this.options);
      this.IterationDelateMenuChildren(this.options);
    });
    this._getRole();
  },
  computed: {},
  methods: {
     getParent(){
        getParent().then(res => {
          var  arr1 = [];
          arr1 = res.data ;
          console.log(arr1)
          this.transleteData1(arr1, this.options1);
          this.IterationDelateMenuChildren1(this.options1);
        });
    },
     transleteData1(data, arr) {
       data.forEach(item => {
      //  for( var i =0; i< item.length;i++ ){
        const msg = {
          id: item.positionId,
          label: item.positionName,
          value: item.positionId,
          children: item.childNodes ? [] : null,

          isLeaf: item.childNodes ? false : true
        };

         if (item.childNodes && item.childNodes.length > 0) {
          this.transleteData1(item.childNodes, msg.children);
        }
        arr.push(msg);
       //   }
        // if (!item.parentId) {
        //   item.parentId = -1;
        //   this.companyName = item.organizeName
        //   item.parentName = "所有部门";
        // }


       });

       return arr;
    },
     IterationDelateMenuChildren1(arr) {
      if (arr.length) {
        for (let i in arr) {
          if (arr[i].children.length) {
            this.IterationDelateMenuChildren1(arr[i].children);
          } else {
            delete arr[i].children;
          }
        }
      }
      return arr;
    },
    changeId(){
      this.$refs.organizeId.clearValidate()
    },
    //取消
    resert(formName) {
      if(this.$route.query.current_page){
        this.$router.push({
        path:'/permissions/user',
        query:{
          current_page:this.$route.query.current_page
        }
      })
      }else{
        this.$router.go(-1)
      }
    },
    sure() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.sysuserId) {
            delete this.form.password;
            this.form.roles = this.form.roleIds;
            console.log(this.form)
            ediotSysuserById(this.form,this.sysuserId).then(res => {
              if (res.code == 200) {
                this.$message({
                  message: res.message,
                  type: "success"
                });
                this.$router.push({ name: "User" ,query:{current_page:this.$route.query.current_page}});
              }
            });
          } else {
            this.form.roles = this.form.roleIds;
            addUser(this.form).then(res => {
              if (res.code == 200) {
                this.$message({
                  message: res.message,
                  type: "success"
                });
                this.$router.push({ name: "User" });
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    back() {
      if(this.$route.query.current_page){
        this.$router.push({
        path:'/permissions/user',
        query:{
          current_page:this.$route.query.current_page
        }
      })
      }else{
        this.$router.go(-1)
      }
    },
    //用户权限
    _getRole() {
      let obj = {};
      obj.currentPage = "1";
      obj.size = "0";
      getRole(obj).then(res => {
        this.userOptions = res.data.list;
      });
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
    }
  },
  components: {
    Treeselect
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.goods-fitter {
  .vender {
    ul {
      li {
        float: left;
        height: 41px;
        padding: 0 10px;
        line-height: 41px;
        text-align: center;
        border: 1px solid transparent;
        font-size: 16px;
        color: #333;
        cursor: pointer;
        &.active {
          border: 1px solid #d7e0f1;
          border-bottom: 0;
          background-color: #fff;
          position: relative;
          position: relative;
          &:after {
            position: absolute;
            content: "";
            left: 0;
            bottom: -1px;
            height: 1px;
            width: 100%;
            background: #fff;
          }
        }
        .image {
          display: inline-block;
          width: 30px;
          margin-right: 10px;
          font-size: 0;
          line-height: 40px;
          vertical-align: top;
          img {
            width: 100%;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .search-wrapper {
    padding: 20px;
    border: 1px solid rgb(215, 224, 241);
    background: #fff;
    .title {
      margin-left: -20px;
      font-size: 16px;
      font-weight: 400;
      color: 3333;
      padding-left: 10px;
      line-height: 1.4;
      border-left: 4px solid $themeColor;
      margin-bottom: 10px;
    }
    .search-main {
    }
    .search-base {
    }
  }
  .text-space {
    text-align: center;
    color: #606266;
    font-size: 12px;
  }
  .el-select-width {
    width: 300px;
    margin-right: 5px;
  }
  .el-input-width {
    display: inline-block;
    max-width: 300px;
  }
  .btn-toggle {
    margin-left: 10px;
    font-size: 14px;
    color: $themeColor;
    cursor: pointer;
  }
}
.goods-list-wrapper {
  margin-top: 20px;
}
.el-transfer-panel__header {
  background: $themeColor;
  color: #fff;
}
.item {
  line-height: 1.5;
  padding: 8px 10px;
  cursor: pointer;
  &:hover {
    color: $themeColor;
  }
  &.active {
    background: #c6e2ff;
    color: #fff;
  }
}
.image {
  cursor: pointer;
}
.item-name {
  cursor: pointer;
  &:hover {
    color: $themeColor;
  }
}
.el-icon-arrow-right {
  margin: 0 20px;
}
.store {
  width: 310px;
}
.red {
  color: $themeSubColor;
}
.transfer-wrapper {
  text-align: center;
}
.panel-wrapper {
  text-align: left;
  margin: 0;
  padding: 6px 0;
  list-style: none;
  height: 246px;
  overflow: auto;
  box-sizing: border-box;
}
.dialog-footer {
  margin-top: 20px;
  text-align: right;
}
.btn {
  margin-left: 20px;
}
.caiji {
  color: red;
}
.gaunjianzi {
  margin-left: 20px;
  color: red;
}
.danwei {
  margin-left: 10px;
}
.introduce {
  color: #97999f;
  font-size: 90%;
}
.search-wrapper1 {
  padding: 20px;
  border: 1px solid rgb(215, 224, 241);
  background: #fff;
  display: flex;
  align-items: center;
  .title1 {
    display: flex;
    margin-left: 15%;
  }
}
</style>
