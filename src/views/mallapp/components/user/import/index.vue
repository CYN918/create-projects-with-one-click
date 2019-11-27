<template>
  <div class="muser-import-wrapper">
    <div class="mcard">
      <div class="title">用户导入信息</div>
      <div class="search">
        <p class="articleStatus">
          <span> 文章状态: </span>
          <el-select v-model="zhuangtai" placeholder="请选择文章分类状态" @change="handeleSelecet">
            <el-option label="全部" value=""></el-option>
            <el-option label="正常"   value="0"> </el-option>
            <el-option  label="禁用" value="1"> </el-option>
          </el-select>
        </p>
        <p class="mingchen inp">
          <span> 关键字 : </span>
          <input type="text" placeholder="请输入关键字"  v-model="classCategoryName">
        </p>
        <span class="searchConten" @click="searchUser">查询</span>
      </div>
      <div>
        <div class="btn-down">
          <el-button type="primary" size="small" @click="downloadExcel" v-permit="'import:down'">下载Excel模板</el-button>
          <el-button class="btn-import" type="success" @click="importDialog=true" v-permit="'import:load'">导入</el-button>
        </div>
        <el-table
                :header-cell-style="getRowClass"
                center
                :data="tableData.list"
                border
                style="width: 100%">
          <el-table-column
                  type="selection"
                  width="55">
          </el-table-column>
          <el-table-column
                  type="index"
                  align="center"
                  label="序号"
                  width="50">
          </el-table-column>
          <el-table-column
                  prop="date"
                  align="center"
                  label="批次号"
                  width="">
          </el-table-column>
          <el-table-column
                  prop="file"
                  align="center"
                  label="导入的文件"
                  width="">
          </el-table-column>
          <el-table-column
                  prop="operatorUserId"
                  align="center"
                  label="操作人">
          </el-table-column>
          <el-table-column
                  align="center"
                  prop="createTime"
                  label="导入时间">
          </el-table-column>
          <el-table-column
                  align="center"
                  prop="auditStatus"
                  label="审核状态">
          </el-table-column>
          <el-table-column
                  align="center"
                  prop="address"
                  label="审核人">
          </el-table-column>
          <el-table-column
                  align="center"
                  prop="address"
                  label="审核说明">
          </el-table-column>
          <el-table-column
                  align="center"
                  prop="formData.address"
                  label="地址">
          </el-table-column>
          <el-table-column
                  align="center"
                  prop="address"
                  label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="detailsUser(scope.row)" v-permit="'import:details'">详情</el-button>
              <el-button type="text" size="small" @click="handeleReview(scope.row)" v-permit="'import:check'">审核</el-button><!--
              <el-button type="text" size="small" @click="deleteReview(scope.row)" v-permit="'import:check'">审核</el-button>-->
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size=tableData.pageSize
                  layout="total, sizes, prev, pager, next, jumper"
                  :total=tableData.total>
          </el-pagination>
        </div>
      </div>
    </div>
    <!--审核弹框-->
    <el-dialog
            title="审核"
            :visible.sync="dialogVisible"
            width="600px"
            :before-close="handleClose">
      <div>
        <div style="text-align: left;padding-left: 8px;">
          <span style="padding-right: 18px;">审核结果: </span>
          <el-radio v-model="radio" label="1">通过</el-radio>
          <el-radio v-model="radio" label="2">不通过</el-radio>
        </div>
        <div id="textarea">
          <p>审核原因 :</p>
          <textarea v-model="reasonReview"  cols="30" rows="10" placeholder="请输入审核原因"  class="reasonReview"></textarea>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmationReview">确 定</el-button>
      </span>
    </el-dialog>
    <!--详情弹框-->
    <el-dialog
            title="详情"
            :visible.sync="details_enable"
            width="1000px"
            :before-close="detailsClose">
      <div>
        <el-table :data="user_import_detail"
                  border
                  :header-cell-style="getRowClass"
                  style="width: 100%">
          <!--<el-table-column
                  type="index"
                  align="center"
                  label="序号"
                  width="50">
          </el-table-column>-->
          <el-table-column
                  align="center"
                  prop="formData.userAccount"
                  label="员工工号/账号"
                  width="">
          </el-table-column>
          <el-table-column
                  align="center"
                  prop="formData.realName"
                  label="员工姓名"
                  width="">
          </el-table-column>
          <el-table-column
                  align="center"
                  prop="formData.password"
                  label="密码">
          </el-table-column>
          <el-table-column
                  align="center"
                  prop="formData.telephone"
                  label="手机号">
          </el-table-column>
          <el-table-column
                  align="center"
                  prop="formData.sex"
                  label="性别">
          </el-table-column>
          <el-table-column
                  align="center"
                  prop="formData.payPoints"
                  label="积分">
          </el-table-column>
          <el-table-column
                  align="center"
                  prop="createTime"
                  label="所属项目">
          </el-table-column>
          <el-table-column
                  align="center"
                  prop="createTime"
                  label="导入时间">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="details_enable = false">取 消</el-button>
        <el-button type="primary" @click="details_enable = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--审核导入弹框-->
    <el-dialog
            title="提示"
            :visible.sync="importDialog"
            width="40%"
    >
      <div class="mcart-content">
        <el-upload
                class="upload-wrapper"
                ref="upload"
                :limit="1"
                :action="uploadUrl"
                :before-upload="beforeFillUpload"
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
</template>

<script>
  import {ImportUser ,searchInformation,PagingImport,reviewUser} from '@/api/mallapp/user/index'
  export default {
    name: 'MuserImport',
    data () {
      return {
        currentPage:4,
        status:'',   //查询的状态
        classCategoryName:'', //输入查询的关键字
        zhuangtai:'', //状态
        importDialog:false,
        dialogVisible:false,  //审核弹框
        dialog_delete:false,  //删除弹框
        details_enable:false,  // 详情弹框
        tableData:{},
        user_import_detail:[],
        uploadUrl: '',
        userList:'',    //用户列表
        radio: "1",//审核状态
        reasonReview:'',  //审核原因
        sex:'', //性别
        userInformation:''//审核人的信息
      }
    },
    methods: {
      //分頁查詢
      //根據pageNum
      handleSizeChange(val){
        const obj = {
          pageNum:1,
          pageSize:val,
        }
        this.commonSearchUser(obj)
      },
      //根據pageSize
      handleCurrentChange(val){
        const obj = {
          pageNum:val,
          pageSize:10,
        }
        this.commonSearchUser(obj)
      },
      //获取查询的状态
      handeleSelecet(val){
        this.status = val
      },
      //查询用户
      searchUser(){
        const obj={
          pageNum:1,
          pageSize:10,
          status:this.status,
          keywords:this.classCategoryName
        }
        this.commonSearchUser(obj)
      },
      //审核页面
      handleClose(done) {
        /*this.$confirm('确认关闭？')
                .then(_ => {
                  done();
                })
                .catch(_ => {});*/
        done();
      },
      //详情弹框
      detailsClose(done){
        /*this.$confirm('确认关闭？')
                .then(_ => {
                  done();
                })
                .catch(_ => {});*/
        done();
      },
      //设置表格表头样式
      getRowClass ({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'color:#939399;font-family:MicrosoftYaHei;font-weight:400;background:#f7faff;text-align:center;height:50px;'
        } else {
          return ''
        }
        if (columnIndex === 0) {
          return 'display:none;'
        }
      },

      //下載excel表格
      downloadExcel(){

        window.location.href=this.baseUrl1+'/api/open/b/b2b2c/userservice/user_import/download_template.json'
      },
      async  beforeFillUpload (file) {
        let  formData = new FormData();
        formData.append("file",file);
        await ImportUser(formData)

        this.$message({
          message: '导入成功',
          type: 'success'
        })
        const obj= {
          pageNum:1,
          pageSize:10
        }
        this.commonSearchUser(obj);
        const isXlsx = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        if (!isXlsx) {
          this.$message.error('上传文件类型错误！请选择xlsx类型文件')
        }
        return isXlsx
      },
      //提交表单
      submitUpload () {
        this.$refs.upload.submit();
        this.importDialog = false;
      },
      //详情
      detailsUser(detail){
        this.user_import_detail = [];
        this.user_import_detail.push(detail);

        this.details_enable = true
      },
      //审核弹框
      handeleReview(res){
        this.dialogVisible = true
        this.userInformation = res
      },
      //删除弹框
      deleteReview(res){
        this.dialog_delete = true
        this.userInformation = res
      },
      //确认审核  后台数据暂时没完成
      async confirmationReview(){
        this.dialogVisible = false
        const { radio ,reasonReview,userInformation} = this
        const obj={
          auditStatus:radio,
          remark:reasonReview,
          id:userInformation.id
        }
        const res = await  reviewUser(obj)
        if(res.code==200){
          if(res.message.indexOf("已经存在")!==-1){
            this.$message.error(res.message);
          }else {
            this.$message.success(res.message);
            const obj= {
              pageNum:1,
              pageSize:10
            }
            this.commonSearchUser(obj);
          }
        }else {
          this.$message.error(res.message);
        }

      },
      async commonSearchUser(obj){
        const res = await PagingImport(obj)
        if(res.code === 200){
          this.tableData = res.data
          this.tableData.list.map((item,index)=>{
            this.tableData.list[index].formData = JSON.parse(item.formData)
            this.tableData.list[index].formData.sex = item.formData.sex===1?'男':'女'
            if(item.auditStatus===0){
              this.tableData.list[index].auditStatus='待审核'
            }
            if(item.auditStatus===1){
              this.tableData.list[index].auditStatus='审核通过'
            }
            if(item.auditStatus===2){
              this.tableData.list[index].auditStatus='审核未通过'
            }
          })
        }
      }
    },
    async created() {
      const obj= {
        pageNum:1,
        pageSize:10
      }
     this.commonSearchUser(obj)
    }
  }
</script>

<style lang="scss" scoped>
  #textarea{
    justify-content: space-around;
    display: flex;
    margin-top: 21px;
    .reasonReview{
      resize: none;
      width: 419px;
      height: 100px;
      padding: 10px
    }
  }
  .mcart-content{
    margin-bottom: 50px;
  }
  .muser-import-wrapper {
    margin: 20px;
    .btn-down {
      margin-bottom: 10px;
      text-align: left;
    }
    .upload-wrapper {
      width: 80%;
      padding: 40px 20px;
      margin-bottom: 20px;
      background: #EDF0F5;
    }
    .btn-import {
      margin-left: 20px;
    }
    .search{
      margin-bottom: 30px;
      align-items: center;
      margin-left: 50px;
      margin-top: 25px;
      display: flex;
      font-size:14px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(96,98,102,1);
      .articleStatus{
        margin: 0 50px;
      }
      .inp{
        box-sizing: border-box;
        input[type='text']{
          padding: 9px 0 9px 15px;
          width: 198px;
          height: 40px;
          border:1px solid rgba(220,223,230,1);
          border-radius:4px;
          resize: none;
        }
      }
      .searchConten{
        cursor: pointer;
        margin-left: 21px;
        width:56px;
        height:32px;
        line-height: 32px;
        text-align: center;
        display: inline-block;
        background:rgba(76,134,244,1);
        border-radius:3px;
        font-size:12px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(255,255,255,1);
      }
    }
    .block{
      text-align: right;
      padding: 35px 0;
    }
  }
</style>
