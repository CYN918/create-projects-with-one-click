<template>
  <div class="margin">
    <div class="mcard">
      <div class="title">数据同步配置</div>
      <el-table :data="tableData" border stripe style="width: 100%;margin-top:20px">
        <el-table-column align="center" type="index" width="80" prop="date" label="序号"></el-table-column>
        <el-table-column align="center" prop="agencyName" label="目标服务"></el-table-column>
        <el-table-column align="center" prop="address" label="目标类型">
          <template slot-scope="scope">
            {{scope.row.businessType===0?'总后台':scope.row.businessType===1?'经销商':"项目"}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="date" label="服务部署模式">
          <template slot-scope="scope">
            {{scope.row.deployPattern===0?'SaaS服务模式':'远程隔离部署模式'}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="remoteUrl" label="远程地址"></el-table-column>
        <el-table-column align="center" prop="address" label="同步状态">
          <template slot-scope="scope">
            {{scope.row.status===0?'有效':'无效'}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="date" label="应用状态">
          <template slot-scope="scope">
            {{scope.row.deploy  ===0?'正常开启使用中':"已删除，已终止合作"}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="操作">
          <template slot-scope="scope">
            <div class="line-div small_top" style>
              <div class="small-Idiv" @click="ediotMessage(scope.row)">
                <div class="i-div fuzhi">
                  <img src="../../../../common/images/icon/编辑.png" alt class="operation_img" />
                </div>
                <span style="word-break: keep-all;">编辑</span>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="form.pageNum"
            :page-sizes="[10, 30, 50, 100]"
            :page-size="form.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="form.total"
          ></el-pagination>
        </div>
    </div>

    <el-dialog title="编辑数据同步配置" :visible.sync="centerDialogVisible" width="680px">
      <div>
        <el-form ref="ruleForm" label-width="150px" class="demo-ruleForm" :model="ruleForm" :rules='rules'>
          <el-form-item label="服务部署模式：" prop="deployPattern">
            <el-radio-group v-model="ruleForm.deployPattern">
              <el-radio :label="0">SaaS服务模式</el-radio>
              <el-radio :label="1">独立部署模式</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="服务远程调用地址：" prop="remoteUrl">
            <el-input v-model="ruleForm.remoteUrl" size="small"></el-input>
          </el-form-item>
          <el-form-item label="目标服务：" prop="agencyName">
            <el-input v-model="ruleForm.agencyName" size="small" disabled></el-input>
          </el-form-item>
          <el-form-item label="目标类型：" prop="businessType">
            <el-select v-model="ruleForm.businessType" placeholder="请选择" size="small" style="width:100%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密匙：" prop="secretKey">
            <el-input v-model="ruleForm.secretKey" size="small"></el-input>
          </el-form-item>
          <el-form-item label="同步状态：" prop="status">
            <el-radio-group v-model="ruleForm.status">
              <el-radio :label="0">有效</el-radio>
              <el-radio :label="1">无效</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="应用状态：" prop="undeploy">
            <el-radio-group v-model="ruleForm.deploy">
              <el-radio :label="0">正常开启使用中</el-radio>
              <el-radio :label="1">已删除，已终止合作</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div class="tip">
          <i class="iconfont icon-tip"></i> 服务到期或终止和客户合作，关闭对应的已运行的网站
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="centerDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="ediotMessage(false)" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { imageUploadUrl } from "@/api/config";
import { editUserSelf, getUserSelf } from "@/api/setting/index";
import { systemfindByPage , settingfindByCode , settingupdateByCode } from '@/api/systemsettings'
import { dealerDetailByid } from "@/api/apply/index";
import { getProjectInfoById } from "@/api/application/index";


export default {
  name: "SelfSetting",
  data() {
    return {
      centerDialogVisible: false,
      options: [
        {label:'总后台',value:0},
        {label:'经销商',value:1},
        {label:'项目',value:2},
      ],
      ruleForm:{
        deployPattern:'',
        remoteUrl:'',
        agencyName:'',
        businessType:'',
        secretKey:'',
        status:'',
        deploy:'',
        id:''
      },
      form: {
        pageNum:1,
        pageSize:10,
        total:0,
      },
      rules: {
        deployPattern: [{ required: true, message: "请选择服务部署模式", trigger: "change" }],
        remoteUrl:[{ required: true, message: "请输入远程调用地址", trigger: "blur" }],
        agencyName:[{ required: true, message: "请输入目标服务", trigger: "blur" }],
        businessType:[{ required: true, message: "请输入目标类型", trigger: "change" }],
        secretKey:[{ required: true, message: "请输入密匙", trigger: "blur" }],
        status:[{ required: true, message: "请输入同步状态", trigger: "change" }],
        deploy:[{ required: true, message: "请选择应用状态", trigger: "change" }],
      },
      loading: false,
      tableData: []
    };
  },
  created() {
    this.systemfindByPage()
  },
  methods: {
    async ediotMessage(val) {
      if(val){
        val ? (this.centerDialogVisible = true) : "";
        const  msg  = await settingfindByCode(val.businessCode)
        this.ruleForm = msg.data
        this.ruleForm.agencyName = val.agencyName
        this.ruleForm.id = val.id
      }else{
        this.$refs.ruleForm.validate(async valid => {
          if (valid) {
            const  data  = await settingupdateByCode(this.ruleForm)
            if(data.code == 200){
              this.centerDialogVisible = false
              this.$message({
              message: data.message,
              type: 'success'
            });
              this.systemfindByPage()
            }
          } else {
            return false;
          }
        });

      }
    },
    async systemfindByPage(val) {
      if(val){
        this.form.pageNum  = 1
      }
      const obj = {
        pageNum:this.form.pageNum,
        pageSize:this.form.pageSize,
        businessType:2,
      }
      const { data } = await systemfindByPage(obj)
      this.tableData = data.list.map(item => {
        let itemData = {
          ...item,
          agencyName: ''
        };
        //异步加载关联数据
        if (item.businessType == 0) {
          (async function(businessCode) {
            const { data } = await getProjectInfoById(item.businessCode);
            item.agencyName = data.agencyName;
          })(item.relationId);
        } else if (item.businessType == 1) {
          (async function(businessCode) {
            const { data } = await dealerDetailByid(item.businessCode);
            item.agencyName = data.agencyName;
          })(item.relationId);
        }
      });
      const that = this
      setTimeout(item => {
        that.tableData = data.list
      },500)
      this.form.total = data.total
    },
    handleSizeChange(val){
      this.form.pageSize = val
      this.systemfindByPage()
    },
    handleCurrentChange(val){
      this.form.pageNum = val
      this.systemfindByPage()
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
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
.tip{
  text-align: center;
  .icon-tip{
    color: #F56C6C;
    margin: 0 20px;
  }
}
</style>
