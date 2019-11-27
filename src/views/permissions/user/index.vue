<template>
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">搜索条件</h4>
            <div class="search-base">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="关键字：">
                    <el-col :span="24">
                      <el-input v-model="form.keywords" clearable placeholder="按账号/用户名/手机号进行搜索"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-col :span="24">
                    <el-col :span="24">
                      <el-form-item label="部门:">
                        <treeselect
                          :options="form.options1"
                          search-nested
                          placeholder="请选择部门"
                          v-model="form.organizeId"
                        />
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col :span="8">
                  <el-col :span="24">
                    <el-col :span="24">
                      <el-form-item label="角色:">
                        <el-select v-model="form.roleId" clearable filterable placeholder="请选择">
                          <el-option
                            v-for="item in form.options2"
                            :key="item.roleId"
                            :label="item.roleName"
                            :value="item.roleId"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-col>
              
              </el-row>
              <el-row>
                  <el-col :span="8">
                    <el-col :span="24">
                      <el-col :span="24">
                        <el-form-item label="用户类型:">
                          <el-select v-model="sysuserTypeVal" clearable filterable placeholder="请选择">
                            <el-option
                              v-for="item in sysuserTypeList"
                              :key="item.sysuserTypeId"
                              :label="item.label"
                              :value="item.sysuserTypeId"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-col>
                </el-col>
                <el-col :span="1" class="btn_right">
                  <el-button type="primary" size="small" @click="serchGetUserPage">查询</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mcard">
      <el-row class="operate mbottom">
        <el-col :span="3"></el-col>
        <el-button size="small" type="primary" v-permit="'sysuser:save'" @click="addUser">新增</el-button>
        <el-button
          size="small"
          type="primary"
          v-permit="'sysuser:save'"
          @click="downloadTemplate"
        >下载导入模版</el-button>
        <el-button
          size="small"
          type="primary"
          v-permit="'sysuser:save'"
          @click="importDialog = true"
        >导入</el-button>
      </el-row>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
        <el-table-column prop="status" label="状态" align="center" width="70">
          <template slot-scope="scope">
            {{
            { 0: "正常", 1: "冻结", 2: "删除" }[scope.row.status || 0]
            }}
          </template>
        </el-table-column>
        <el-table-column prop="sysuserAccount" label="用户账号" align="center"></el-table-column>
        <el-table-column prop="sysuserName" label="用户名" align="center"></el-table-column>
        <el-table-column label="用户类型" align="center" width="120">
          <template slot-scope="scope">
            {{
            ["系统用户", "供应商", "客户", "经销商"][scope.row.sysuserType]
            }}
          </template>
        </el-table-column>
        <el-table-column prop="roleName" label="角色权限" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.roles && scope.row.roles.length">
              <p v-for="role in scope.row.roles" :key="role.id">{{ role.roleName }}</p>
            </template>
            <template v-else>暂无</template>
          </template>
        </el-table-column>
        <el-table-column prop="organizeName" label="部门" align="center">
          <template slot-scope="scope">
            {{
            scope.row.organizeName || "暂无"
            }}
          </template>
        </el-table-column>
        <el-table-column prop="realName" label="真实姓名" align="center">
          <template slot-scope="scope">
            {{
            scope.row.realName || "未填写"
            }}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="职称" align="center">
          <template slot-scope="scope">
            {{
            scope.row.title || "暂无"
            }}
          </template>
        </el-table-column>
        <el-table-column prop="positionName" label="职位" align="center">
          <template slot-scope="scope">
            {{  scope.row.positionName || "暂无"  }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="150">
          <template slot-scope="scope">
            <div
              class="small-Idiv"
              v-permit="'authority:bind-user'"
              @click="authorization(scope.row.sysuserId, scope.row.sysuserName)"
            >
              <div class="i-div">
                <img src="../../../common/images/icon/服务授权.png" alt class="operation_img" />
              </div>
              <span>用户授权</span>
            </div>
            <div
              class="small-Idiv"
              @click="dialogVisibleFunc(scope.row.sysuserId)"
              v-permit="'Association:role'"
            >
              <div class="i-div">
                <img src="../../../common/images/icon/审核.png" alt class="operation_img" />
              </div>
              <span>关联角色</span>
            </div>
            <div
              class="small-Idiv"
              @click="ediotUser(scope.row.sysuserId)"
              v-permit="'sysuser:edit'"
            >
              <div class="i-div">
                <img src="../../../common/images/icon/编辑.png" alt class="operation_img" />
              </div>
              <span>编辑</span>
            </div>
            <div
              class="small-Idiv"
              v-permit="'sysuser:delete'"
              @click="deleteUser(scope.row.sysuserId)"
            >
              <div class="i-div">
                <img src="../../../common/images/icon/回收站.png" alt class="operation_img" />
              </div>
              <span>删除</span>
            </div>
             <div
              class="small-Idiv"
              v-if="scope.row.status == 0"
              v-permit="'user:lock'"
              @click="lockUser(scope.row.sysuserId)"
            >
              <div class="i-div huishouzhan">
                <img src="../../../common/images/icon/锁定.png" alt class="operation_img" />
              </div>
              <span>锁定</span>
            </div>
             <div
              class="small-Idiv"
              v-if="scope.row.status == 1"
              v-permit="'user:unlock'"
              @click="unlockUser(scope.row.sysuserId)"
            >
              <div class="i-div huishouzhan">
                <img src="../../../common/images/icon/解锁.png" alt class="operation_img" />
              </div>
              <span>解锁</span>
            </div>
            <div
              class="small-Idiv"
              v-if="!scope.row.systemRole"
              v-permit="'user:particulars'"
              @click="details(scope.row.sysuserId)"
            >
              <div class="i-div huishouzhan">
                <img src="../../../common/images/icon/查看详情.png" alt class="operation_img" />
              </div>
              <span>详情</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.current_page"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="form.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="form.total_count"
        ></el-pagination>
      </div>

      <!-- 删除 -->
      <el-dialog title="删除用户" :visible.sync="deleteBtn" width="30%">
        <span>此操作将永久删除该用户，是否继续？</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="deleteBtn = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteUser('', true)" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :title="sysuserName"
        :visible.sync="centerDialogVisible"
        :width="clikeWidh"
        :fullscreen="conten"
        :close-on-click-modal="false"
      >
        <div
          style="cursor: pointer;position: absolute;right: 62px;top: 21px;"
          :title="fillTit"
          @click="fullScreen"
        >
          <img :src="fullImg" alt style="height: 12px;width: 12px;" />
        </div>
        <div :style="{ height: clikeHeight, overflow: 'auto' }">
          <table id="table1" class="authority-table">
            <thead>
              <tr class="table__tr-wrapper">
                <th width="180">一级菜单</th>
                <th width="180">二级菜单</th>
                <th>功能权限及隐私字段</th>
              </tr>
            </thead>
            <tr v-for="item1 in treeData" :key="item1.id">
              <td class="solid-td">
                <el-checkbox
                  v-model="item1.checked"
                  @change="onChangeAuthorityCheckbox($event, item1)"
                >{{ item1.menuName }}</el-checkbox>
              </td>
              <td class="solid-td" colspan="2" width="180">
                <table class="table2">
                  <template v-if="item1.children && item1.children.length">
                    <tr v-for="item2 in item1.children" :key="item2.id">
                      <td width="179" class="solid-td">
                        <el-checkbox
                          v-model="item2.checked"
                          @change="
                            onChangeAuthorityCheckbox($event, item2);
                            item1.checked = true;
                          "
                        >{{ item2.menuName }}</el-checkbox>
                      </td>
                      <td>
                        <table class="table3">
                          <tr v-for="item3 in item2.children" :key="item3.id">
                            <td>
                              <el-checkbox
                                v-model="item3.checked"
                                @change="
                                  onChangeAuthorityCheckbox($event, item3);
                                  item2.checked = true;
                                  item1.checked = true;
                                "
                              >{{ item3.menuName }}</el-checkbox>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr>
                      <td class="solid-td" width="179"></td>
                      <td></td>
                    </tr>
                  </template>
                </table>
              </td>
            </tr>
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="centerDialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" size="small" @click="onSaveRoleAuthority">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 关联角色 -->
      <el-dialog
        title="关联角色"
        :visible.sync="dialogVisible"
        width="800px"
        :before-close="
          () => {
            value = [];
            dialogVisible = false;
          }
        "
      >
        <div class="roleuser">
          <el-transfer v-model="value" :data="data" :titles="['未关联角色', '已关联角色']"></el-transfer>
          <span class="pushmsg">推送</span>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger" @click="dialogVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="submitAssociated" size="small">确 定</el-button>
          </div>
        </div>
      </el-dialog>

      <!--导入弹框-->
      <el-dialog title="提示" :visible.sync="importDialog" width="40%">
        <div class="mcart-content">
          <el-upload
            class="upload-wrapper"
            ref="upload"
            :limit="1"
            :action="uploadUrl"
            :on-success="handleAvatarSuccess"
            accept=".xls, .xlsx"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传xlsx文件</div>
          </el-upload>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="importDialog = false">取 消</el-button>
          <el-button type="primary" @click="submitUpload">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import { throttleTipPop } from "@/utils/throttle";
import request from "@/utils/request";
import {
  associatedSyser,
  deleterSysuserId,
  findSysuserAuthority,
  getAllMenu,
  getAllSysuer,
  getSysuerId,
  getUserPage,
  userAuthorization,
  ImportSysuser,
  getAllOrganizationalSearch,
  findSysuserRole,
  lockUser,
  unlockUser
} from "@/api/permissions/index";
import { setTimeout } from "timers";
import Treeselect from "@riophae/vue-treeselect";
// import {   getAllOrganizational } from '@/api/creditmanage/index'
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import fullImg from "../../../common/images/icon/fullscreen.png";
import fullImg1 from "../../../common/images/icon/fullscreen1.png";

export default {
  components: {
    Treeselect
  },
  data() {
    return {
      innerHeight:
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight,
      clikeWidh: "60%",
      clikeHeight: "600px",
      conten: false,
      fullImg: fullImg,
      fillTit: "全屏显示",
      dialogVisible: false, // 关联角色
      data: [],
      value: [],
      sysuserId: "", // 后台用户id
      form: {
        current_page: 1,
        pageSize: 10,
        total_count: 0,
        keywords: "",
        options1: [],
        organizeId: null,
        options2: [],
        roleId: null
      },
      initMenuData: false,
      treeData: null,
      userId: "", //用户id
      centerDialogVisible: false,
      importDialog: false,
      uploadUrl: "",

      deleteBtn: false, //删除
      tableData: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      positionName:"暂无",
      options:[],  // 职位
      sysuserName: "", // 用户授权名字
      sysuserTypeList:[
        {label:'普通用户',sysuserTypeId:0},
        {label:'供应商用户',sysuserTypeId:1},
        {label:'客户',sysuserTypeId:2},
        {label:'经销商',sysuserTypeId:3},
      ],
      sysuserTypeVal:''
    };
  },
  created() {
    if (this.$route.query.current_page) {
      console.log(this.$route.query.current_page);
      this.form.current_page = this.$route.query.current_page;
    }
    this._getUserPage();
    this._getAllSysuer();
    this.getAllOrganizational();

    let token = getToken();
    this.uploadUrl =
      this.baseUrl1 +
      "/api/open/b/b2b2c/userservice/sysuser/import_users.json?token=" +
      token;
  },
  computed: {},
  methods: {
    // 获取组织架构
    getAllOrganizational() {
      getAllOrganizationalSearch().then(res => {
        let arr1 = [];
        arr1.push(res.data);
        this.transleteData1(arr1, this.form.options1);
        this.IterationDelateMenuChildren1(this.form.options1);
      });
    },
    transleteData1(data, arr) {
      data.forEach(item => {
        if (!item.parentId) {
          item.parentId = 0;
          item.parentName = "所有部门";
        }
        const msg = {
          id: item.childIds.join(","),
          label: item.organizeName,
          value: item.childIds,
          children: item.childIds ? [] : null,
          isLeaf: item.childIds ? false : true
        };
        if (item.childNodes && item.childNodes.length > 0) {
          this.transleteData1(item.childNodes, msg.children);
        }
        arr.push(msg);
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
    //点击全屏
    fullScreen() {
      this.conten = !this.conten;
      if (this.conten) {
        this.clikeHeight = this.innerHeight + "px";
        this.fullImg = fullImg1;
        this.fillTit = "退出全屏";
      } else {
        (this.clikeWidh = "60%"), (this.clikeHeight = "600px");
        this.fullImg = fullImg;
        this.fillTit = "全屏显示";
      }
    },

    //查询
    serchGetUserPage() {
      this.form.current_page = 1;
      this._getUserPage();
    },

    clickTree(v, e, data) {},
    //编辑
    ediotUser(id) {
      this.$router.push({
        name: "AddUser",
        query: { id: id, current_page: this.form.current_page }
      });
    },
    //删除用户
    deleteUser(data, type) {
      if (data) {
        this.deleteBtn = true;
        this.userId = data;
      }
      if (type) {
        deleterSysuserId(this.userId).then(res => {
          if (res.code == 200) {
            this.deleteBtn = false;
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.form.current_page = 1;
            this._getUserPage();
          }
        });
      }
    },
    //提交关联角色sysuserId
    submitAssociated() {
      let obj = {};
      let str = "";
      obj.sysuserId = this.sysuserId;
      this.value.forEach(item => {
        str += item + ";";
      });

      obj.roleIds = str.substring(0, str.length - 1);
      associatedSyser(obj).then(res => {
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.dialogVisible = false;
        }
      });
    },
    _getAllSysuer() {
      getAllSysuer().then(res => {
        res.data.forEach(item => {
          this.data.push({
            label: item.roleName,
            key: `${item.roleId}`
          });
        });
        this.form.options2 = res.data;
      });
    },
    dialogVisibleFunc(id) {
      this.sysuserId = id;
      this.dialogVisible = true;
      this.value = [];
      let bigid = id;
      let that = this;
      setTimeout(function() {
        that._getSysuerId(bigid);
      }, 50);
    },
    // 获取用户已关联角色
    _getSysuerId(val) {
      getSysuerId(val).then(res => {
        if (res.message != "没有匹配的数据!") {
          res.data.forEach(item => {
            this.value.push(`${item.roleId}`);
          });
        }
      });
    },
    addUser() {
      this.$router.push({ name: "AddUser" });
    },

    downloadTemplate() {
      request({
        url: "/api/open/b/b2b2c/userservice/sysuser/download_template.json",
        method: "get",
        responseType: "blob"
      }).then(res => {
        var reader = new FileReader();
        reader.readAsDataURL(res); // 转换为base64，可以直接放入a标签href
        reader.onload = function(e) {
          var a = document.createElement("a");
          a.download = "后台用户导入模版.xlsx";
          a.href = e.target.result;
          document.body.appendChild(a); // 修复firefox中无法触发click
          a.click();
          a.remove();
        };
      });
    },

    async beforeFillUpload() {
      let formData = new FormData();
      formData.append("file", file);
      console.log(formData);
      await ImportSysuser(formData);

      this.$message({
        message: "导入成功",
        type: "success"
      });
      const isXlsx =
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      if (!isXlsx) {
        this.$message.error("上传文件类型错误！请选择xlsx类型文件");
      }
      return isXlsx;
    },
    //提交表单
    submitUpload() {
      this.$refs.upload.submit();
      this.importDialog = false;
      //this.$message.success("操作成功!");
    },
    handleAvatarSuccess(response, file, fileList) {
      if (response.code != 200) {
        throttleTipPop(this, "error", response.message);
      } else {
        this.$message.success("操作成功!");
        this._getUserPage();
      }
      this.importDialog = false;
    },

    /**
     * 权限选框改变事件
     */
    onChangeAuthorityCheckbox(e, item) {
      if (!this.initMenuData) return;
      const selectCheckbox = (children, checked) => {
        if (children && children.length) {
          children.forEach(item => {
            item.checked = checked;
            selectCheckbox(item.children, checked);
          });
        }
      };
      selectCheckbox(item.children, e);
    },

    //树形结构选中数据
    onSaveRoleAuthority() {
      const findAuthorities = menuTree =>
        menuTree.reduce((arr, item) => {
          if (
            item.checked &&
            item.permission != null &&
            item.permission != ""
          ) {
            arr.push(item.menuId);
          }
          if (item.children && item.children.length) {
            arr = arr.concat(findAuthorities(item.children));
          }
          return arr;
        }, []);
      const authorities = findAuthorities(this.treeData);

      //全选数据
      userAuthorization(this.sysuserId, authorities).then(res => {
        if (res.code == 200) {
          this.centerDialogVisible = false;
          this.$message({
            message: res.message,
            type: "success"
          });
        }
      });
    },
    async authorization(sysuserId, sysuserName) {
      this.sysuserName = "用户授权" + "(" + sysuserName + ")";
      this.treeData = [];
      this.initMenuData = false;
      await this.initTreeMenu();
      this.centerDialogVisible = true;
      this.sysuserId = sysuserId;

      //勾选授权菜单
      this.loadSysuserAuthority(sysuserId);
      this.initMenuData = true;
    },

    /**
     * 初始化树形菜单
     */
    async initTreeMenu() {
      const { data } = await getAllMenu();
      this.treeData = data[0].children;
    },

    /**
     * 加载用户菜单权限
     * 勾选授权菜单
     */
    async loadSysuserAuthority(sysuserId) {
      const treeData = this.treeData;
      let { data } = await findSysuserAuthority(sysuserId);
      var authorities = await findSysuserRole(sysuserId);

      authorities = authorities.data[0].authorities
      authorities = JSON.parse(authorities)
      data = data.concat( authorities || []);
      const treeMenuChecked = (menuTree, authorities) => {
        if (menuTree && menuTree.length) {
          for (let menu of menuTree) {
            //如果该菜单不需要权限或拥有权限则添加
            if (menu.permission == null || menu.permission == "") {
              menu.checked = true;
            } else {
              if (authorities.includes(menu.permission)) {
                menu.checked = true;
              } else {
                continue;
              }
            }

            //如果存在子节点则添加
            if (menu.children && menu.children.length) {
              treeMenuChecked(menu.children, authorities);
            }
          }
        }
      };

      if (treeData && treeData.length) treeMenuChecked(treeData, data);
    },
    //删除多余children
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
    handleSizeChange(val) {
      this.form.pageSize = val;
      this._getUserPage();
    },
    handleCurrentChange(val) {
      this.form.current_page = val;
      this._getUserPage();
    },
    // 获取所有用户
    _getUserPage() {
      // if (data) {
      //   this.form.current_page = 1;
      // }
      var form = {};
      form.pageNum = this.form.current_page;
      form.pageSize = this.form.pageSize;
      form.keywords = this.form.keywords;
      form.organizeIds = this.form.organizeId;
      form.roleId = this.form.roleId;
      form.sysuserType = this.sysuserTypeVal;
      getUserPage(form).then(res => {
        if (res.code == 200) {
          if (res.data === null) {
            this.tableData = [];
            this.form.total_count = 0;
          } else {
            this.tableData = res.data.list;
            this.form.total_count = res.data.total;
          }
        }
      });
    },
    // 解锁用户
    lockUser(id){
       var data = {
         sysUserId:id
       }
       lockUser(data).then( res =>{
          if( res.code == 200 ){
            this.$message({
                message: "解锁用户成功",
                type: "success"
              });
            this._getUserPage();
          }
       })
    },
    // 锁定用户
    unlockUser(id){
       var data = {
         sysUserId:id
       }
       unlockUser(data).then( res =>{
         if( res.code == 200 ){
            this.$message({
              message: "锁定用户成功",
              type: "success"
            });
             this._getUserPage();
         }
       })
    },
    details(id) {
      this.$router.push({
        name: "UserInfo",
        query: { id: id, current_page: this.form.current_page }
      });
    }
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
    max-width: 240px;
    margin-right: 5px;
  }
  .el-date-picker {
    max-width: 240px;
    margin-right: 5px;
  }
  .el-input-width {
    display: inline-block;
    max-width: 180px;
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
  text-align: center;
}
.small-Idiv {
  width: 32px;
  span {
    margin-top: 3px;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(72, 73, 77, 1);
  }
}
.i-div {
  cursor: pointer;
  height: 32px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.line-div {
  display: flex;
  justify-content: space-between;
}
.el-select-width {
  max-width: 300px;
  margin-right: 5px;
}
.el-date-picker {
  max-width: 240px;
  margin-right: 5px;
}
.el-input-width {
  display: inline-block;
  max-width: 180px;
}
.el-select {
  width: 100% !important;
}
.img_size {
  width: 118px;
  height: 170px;
}
.small_top {
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
}
.distribution {
  display: flex;
  align-items: center;
  position: relative;
  top: -12px;
}
.roleuser {
  position: relative;
  .pushmsg {
    position: absolute;
    top: 11px;
    left: 47%;
    font-size: 16px;
    color: #303133;
    font-weight: 400;
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}
.table__tr-wrapper {
  background: RGBA(247, 250, 255, 1);
  th {
    border: 1px solid #f0f0f0;
  }
}
.authority-table tr td:first-child {
  text-align: left;
  padding-left: 20px;
}
.authority-table .solid-td {
  border: 1px solid #f0f0f0;
}

table th,
td {
  height: 35px;
  line-height: 35px;
}
.table2 tr td:nth-child(1) {
  border-left: 0;
  border-bottom: 0;
  border-top: 0;
}
.table2 tr:nth-child(1) td {
  border-top: 0;
}
.table3 {
  display: flex;
  flex-wrap: wrap;
}
.small-Idiv {
  float: left;
  width: 45%;
  padding-top: 10px;
}
.small-Idiv:nth-of-type(odd) {
  margin-left: 4%;
}
</style>
