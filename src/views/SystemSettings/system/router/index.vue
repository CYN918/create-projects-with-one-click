<template>
  <div class="margin">
      <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="150px" size="small" :model="search">
          <div class="search-wrapper">
            <h4 class="title">搜索条件</h4>
            <div class="search-base">
              <el-row>
               <el-col :span="7">
                    <el-col>
                        <el-form-item label="商家名称：">
                            <el-col :span="23">
                                <el-input v-model="search.clientName" placeholder="请输入商家名称" clearable></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-col>
                 <el-col :span="7">
                    <el-col>
                        <el-form-item label="商家类型：">
                          <el-select v-model="search.relationType" placeholder="请选择商家类型" clearable>
                            <el-option label="项目" value="0"></el-option>
                            <el-option label="经销商" value="1"></el-option>
                          </el-select>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="7">
                    <el-col>
                        <el-form-item label="路由模式：">
                          <el-select v-model="search.domainMode" placeholder="请选择路由模式" clearable>
                            <el-option label="服务商域名" value="0"></el-option>
                            <el-option label="自定义域名" value="1"></el-option>
                          </el-select>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small" @click='searchSure'>查询</el-button>
                </el-col>
                <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small" @click='reset' >重置</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>

    <div class="mcard">
      <div class="title">路由配置</div>
      <el-table :data="tableData" border stripe style="width: 100%;margin-top:20px">
        <el-table-column align="center" width="150" prop="id" label="编号"></el-table-column>
        <el-table-column align="center" prop="domainName" label="域名">
            <template slot-scope="scope"><a class="link-a" :href="'http://'+scope.row.domainName+'/admin/'" target="_blank" >{{ scope.row.domainName }}</a></template>
        </el-table-column>
        <el-table-column align="center" width="150" prop="date" label="路由模式">
          <template slot-scope="scope">{{ ["服务商域名", "自定义域名"][scope.row.domainMode] }}</template>
        </el-table-column>
        <el-table-column align="center" width="150" prop="tableSuffix" label="数据库表后缀"></el-table-column>
        <el-table-column align="center" width="120" label="绑定对象">
          <template slot-scope="scope">{{ ["项目商城", "经销商后台"][scope.row.relationType] }}</template>
        </el-table-column>
        <el-table-column align="center" label="关联绑定信息">
          <template slot-scope="scope">
            <template v-if="scope.row.relationType == 0">
              <template v-if="scope.row.relationData">
                <p style="text-align: left;">项目名称：{{ scope.row.relationData.projectName }}</p>
                <p style="text-align: left;">项目类型: {{ getApply(scope.row.relationData)  }}</p><!--
                <p style="text-align: left;">客户名称：{{ scope.row.relationData.customer&&scope.row.relationData.customer.customerName }}</p>-->
                <p style="text-align: left;">所属经销商 <span v-if="scope.row.parent&&scope.row.parent.relationName">: {{scope.row.parent.relationName}}</span></p>
              </template>
              <template v-else>
                <p style="text-align: left;">第三方项目 <span v-if="scope.row.relationName">: {{scope.row.relationName}}</span></p>
                <p style="text-align: left;">所属经销商 <span v-if="scope.row.parent&&scope.row.parent.relationName">: {{scope.row.parent.relationName}}</span></p>
              </template>
            </template>
            <template v-else-if="scope.row.relationType == 1">
              <template v-if="scope.row.relationData">
                <p style="text-align: left;">经销商名称：{{ scope.row.relationName }}</p>
              </template>
              <template v-else>
                <p style="text-align: left;">未知经销商</p>
              </template>
            </template>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="操作">
          <template slot-scope="scope">
            <div class="line-div small_top" style>
              <div class="small-Idiv" @click="openEdiotMessage(scope.row)">
                <div class="i-div fuzhi">
                  <img src="../../../../common/images/icon/编辑.png" alt class="operation_img" />
                </div>
                <span style="word-break: keep-all;">编辑</span>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="编辑路由配置" :visible.sync="centerDialogVisible" width="680px">
      <div>
        <el-form ref="ruleForm" label-width="150px" class="demo-ruleForm">
          <el-form-item label="路由模式：" prop="domainMode">
            <el-select
              v-model="ruleForm.domainMode"
              placeholder="请选择"
              size="medium"
              style="width:80%"
            >
              <el-option :value="0" label="使用服务商域名" />
              <el-option :value="1" label="使用自定义域名" />
            </el-select>
          </el-form-item>
          <el-form-item label="域名：" prop="domainName">
            <el-input v-model="ruleForm.domainName" size="medium" style="width:80%"></el-input>
          </el-form-item>
          <el-form-item label="数据库表后缀：" prop="name">
            <el-input v-model="ruleForm.tableSuffix" size="medium" style="width:80%" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="centerDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="editRouteConfig" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  findRouteConfigPage,
  findRouteById,
  editRouteConfig
} from "@/api/systemsettings/index";
import { dealerDetailByid } from "@/api/apply/index";
import { getProjectInfoById } from "@/api/application/index";

export default {
  name: "SelfSetting",
  data() {
    return {
      search :{
        clientName:'',
        relationType:'',
        domainMode:'',
      },
      centerDialogVisible: false,
      ruleForm: {},
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      form: {
        image_url: "", // 图片
        nick: "", // 昵称
        sex: "", // 性别：1.男，2.女
        birthdy: "" // 生日
      },
      rules: {
        image_url: [{ required: true, message: "请选择分享图片" }],
        nick: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        birthdy: [{ required: true, message: "请选择生日", trigger: "change" }]
      },
      loading: false,
      tableData: []
    };
  },
  filter:{
    getMode(val){
      if(val){
        if(val.domainMode){
          if(val.domainMode==0){
            return "服务商域名";
          }else {
            return "自定义域名";
          }
        }
      }
      return "";
    },
  },
  methods: {
	  getApply(val){
		  if(val){
		  	  val = val.applyId;
			  if(val==1){
				  return "积分商城";
			  }else if(val==2){
				  return "员工福利";
			  }else if(val==3){
				  return "企业集采";
			  }else if(val==4){
				  return "平台对接";
			  }else if(val==5){
				  return "礼品卡册";
			  }else if(val==6){
				  return "ERP系统";
			  }else if(val==7){
				  return "分销商城";
			  }
		  }
			  return "其他";
	  },
    async findRouteConfig() {
      const userobj = localStorage.getItem('Admin-token')
      var form = this.search
      form.pageNum = 1
      form.pageSize = 100000
      const { data } = await findRouteConfigPage(form);
      this.tableData = data.content.map(item => {
        let itemData = {
          ...item
        };

        /*//异步加载关联数据
        if (item.relationType == 0) {
          (async function(agencyId) {
            const { data } = await getProjectInfoById(agencyId);
            itemData.relationData = data;
          })(item.relationId);
        } else if (item.relationType == 1) {
          (async function(agencyId) {
            const { data } = await dealerDetailByid(agencyId);
            itemData.relationData = data;
          })(item.relationId);
          // const request = require('axios');
          // request.defaults.headers.common['token'] = token;
          //   request({
          //     url:this.baseUrl1+'/api/open/b/b2b2c/projectservice/project/find_info_by_id.json',
          //     method:'get',

          //     params:{
          //       projectId:item.relationId
          //     }
          //   })
        }*/
        return itemData;
      });
    },

    searchSure() {
       this.findRouteConfig();
    },

      reset() {
          this.search.name = ''
          this.search.clientName = '',
          this.search.relationType = '',
          this.search.domainMode = '',
          this.searchSure();
      },
    async openEdiotMessage(params) {
      this.centerDialogVisible = true;
      const { data } = await findRouteById(params.id);
      this.ruleForm = data;
    },

    async editRouteConfig() {
      const res = await editRouteConfig(this.ruleForm.id, this.ruleForm);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "修改成功!"
        });
        this.ruleForm = {};
        this.centerDialogVisible = false;
        this.findRouteConfig();
      }
    }
  },
  mounted() {
    this.findRouteConfig();
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.link-a a:link{
    color: #4a99fa;
}
.link-a a:hover,.link-a a:focus, .link-a{
    color: #4a99fa !important;
}
.goods-fitter .search-wrapper {
    padding: 20px;
    border: 1px solid #d7e0f1;
    background: #fff;
    margin: 20px;
}
.goods-fitter .search-wrapper .title {
    margin-left: -20px;
    font-size: 16px;
    font-weight: 400;
    color: 3333;
    padding-left: 10px;
    line-height: 1.4;
    border-left: 4px solid #4C86F4;
    margin-bottom: 10px;
}
.form-wrapper {
  margin-top: 50px;
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
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .input {
    width: 217px;
  }
  .btn-submit {
    margin-top: 20px;
  }
}
.margin {
  margin-top: 0 !important;
  padding-left: 0 !important;
  border: 1px solid rgba(214, 222, 239, 1);
}
.fuzhi {
  margin-bottom: -6px;
}
.tip {
  text-align: center;
  .icon-tip {
    color: #f56c6c;
    margin: 0 20px;
  }
}
</style>
