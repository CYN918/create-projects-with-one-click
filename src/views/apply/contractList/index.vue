<template>
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">搜索条件</h4>
            <div class="search-base">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="经销商名称：">
                    <el-input v-model="form.secondParty" clearable placeholder="请输入甲方或乙方公司名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="合同时间：">
                    <el-date-picker
                        :editable="false"
                        style="display: inline-block"
                        v-model="form.signTimeStart"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                    <span style="font-size: 14px;color: #606266;margin: 0 6px">-</span>
                    <el-date-picker
                        :editable="false"
                        style="display: inline-block"
                        v-model="form.signTimeEnd"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6" >
                  <el-form-item label="合同状态：">
                    <el-select v-model="form.status" placeholder="请选择合同状态">
                      <el-option
                          v-for="item in contractStatus"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="1" class="btn_right">
                  <el-button type="primary" size="small"  @click="getContract">查询</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mbottom">
      <div class="goods-fitter">
        <div class="search-wrapper">
          <h4 class="title">经销商合同列表</h4>
          <div style="margin-bottom: 20px">
            <el-button type="primary" size="small" @click="addNewContract" v-permit="'new:contract'">
              <i style="margin-right:5px;position: relative;top: 2px;"><img src="@/common/images/apply/icon_contract.png" alt=""></i>
              <span style="position: relative;top: -1px;">新增合同</span>
            </el-button>
          </div>
          <el-table :data="tableData"  border style="width: 100%" stripe>
            <el-table-column  type="index"  label="序号" align="center" width="55"></el-table-column>
            <!--<el-table-column  prop="auditStatus"  label="状态" align="center" width="100">
              <template slot-scope="scope">
                {{scope.row.auditStatus == 0?'待审核':scope.row.auditStatus == 1?'审核通过':scope.row.auditStatus == 2?'审核未通过':''}}
              </template>
            </el-table-column>-->
            <el-table-column label="合同编号" align="center" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.contractSn}}</span>
              </template>
            </el-table-column>
            <el-table-column label="合同标题" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.contractName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="甲方公司信息" width="200" align="center">
              <template slot-scope="scope">
                <p style="text-align: left">甲方：{{scope.row.firstParty}}</p>
                <p style="text-align: left">联系人：{{scope.row.firstPartyContact}}</p>
                <p style="text-align: left">联系电话：{{scope.row.firstPartyTelephone}}</p>
                <p style="text-align: left">地址：{{scope.row.firstPartyAddress}}</p>
              </template>
            </el-table-column>
            <el-table-column label="乙方公司信息" width="200" align="center">
              <template slot-scope="scope">
                <p style="text-align: left">乙方：{{scope.row.secondParty}}</p>
                <p style="text-align: left">联系人：{{scope.row.secondPartyContact}}</p>
                <p style="text-align: left">联系电话：{{scope.row.secondPartyTelephone}}</p>
                <p style="text-align: left">地址：{{scope.row.secondPartyAddress}}</p>
              </template>
            </el-table-column>
            <el-table-column  prop="name"  label="合同状态" align="center" >
              <template slot-scope="scope">
                <span v-if="scope.row.status === 0">已创建</span>
                <span v-if="scope.row.status === 1">待审核</span>
                <span v-if="scope.row.status === 3">审核不通过</span>
                <span v-if="scope.row.status === 2">审核通过</span>
                <span style="color: #3ac691" v-if="scope.row.status === 4">已归档</span>
              </template>
            </el-table-column>
            <el-table-column prop="electronicContract" label="电子合同" align="center">
              <template slot-scope="scope">
                <div v-if=scope.row.electronicContract>
                  <img :src=scope.row.electronicContract alt="" width="100px" height="140px">
                  <div>
                    <el-button type="primary" size="small" @click="open(scope.row.electronicContract)">查看大图
                    </el-button>
                  </div>
                </div>
                <div v-else>
                  暂无
                </div>
              </template>
            </el-table-column>
            <el-table-column label="签订时间" align="center" width="140">
              <template slot-scope="scope">
                <span>{{scope.row.signTime}}</span>
              </template>
            </el-table-column>
            <el-table-column   label="销售管理员" align="center" width="140">
              <template slot-scope="scope">
                <span>{{scope.row.adminName}}</span>
              </template>
            </el-table-column>
            <el-table-column   label="创建时间" align="center" width="140">
              <template slot-scope="scope">
                <span>{{scope.row.createTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center"  fixed="right" width="180px">
              <template slot-scope="scope">
                <div class="line-div clearfix">
                  <!-- 详情 -->
                  <div class="small-Idiv" @click="checkDetail(scope.row.id)" v-permit="'view:contract'">
                    <div class="i-div">
                      <img src="../../../common/images/icon/icon_detail.png" alt="" class="operation_img">
                    </div>
                    <span style="word-break: keep-all;" >详情</span>
                  </div>
                  <!-- 编辑 -->
                  <div v-if="scope.row.status === 0" class="small-Idiv" @click="editContract(scope.row.id)" v-permit="'edit:contract'">
                    <div class="i-div">
                      <img src="../../../common/images/icon/icon_edit.png" alt="" class="operation_img">
                    </div>
                    <span style="word-break: keep-all;" >编辑</span>
                  </div>
                  <!-- 指派管理员 -->
                  <div v-if="scope.row.status === 0 && scope.row.adminId == null || scope.row.status === 1" class="small-Idiv" @click="dispatchAdmin(scope.row.id,'_admin')" v-permit="'assigned:contract'">
                    <div class="i-div">
                      <img src="../../../common/images/icon/指派采购员(1).png" alt="" class="operation_img">
                    </div>
                    <span style="word-break: keep-all;" >指派管理员</span>
                  </div>
                  <!-- 提交审核 -->
                  <!--<div v-if="scope.row.status === 0" class="small-Idiv" @click="getOperateContractId(scope.row.id, 3)">
                    <div class="i-div huishouzhan">
                      <img src="../../../common/images/icon/审核.png" alt="" class="operation_img">
                    </div>
                    <span style="word-break: keep-all;">提交审核</span>
                  </div>-->
                  <!-- 审核 --><!--v-if="scope.row.status === 1"-->
                  <!--<div  class="small-Idiv" @click="examineView(scope.row, 1)">
                    <div class="i-div huishouzhan">
                      <img src="../../../common/images/icon/icon_examine.png" alt="" class="operation_img">
                    </div>
                    <span style="word-break: keep-all;">审核</span>
                  </div>-->
                  <!-- 打印合同 -->
                  <div v-if="scope.row.status === 2" class="small-Idiv" @click="prinContract(scope.row.id)" v-permit="'print:contract'">
                    <div class="i-div huishouzhan">
                      <img src="../../../common/images/icon/icon_examine.png" alt="" class="operation_img">
                    </div>
                    <span style="word-break: keep-all;">打印合同</span>
                  </div>
                  <!-- 删除 -->
                  <div v-if="scope.row.status == 0 || scope.row.status == 3" class="small-Idiv"
                       @click="deleteAuditView(scope.row.id)" v-permit="'remove:contract'">
                    <div class="i-div huishouzhan">
                      <img src="../../../common/images/icon/icon_delete.png" alt="" class="operation_img">
                    </div>
                    <span style="word-break: keep-all;">删除合同</span>
                  </div>
                  <!-- 取消 -->
                  <div v-if="scope.row.status === 2||scope.row.status === 3" class="small-Idiv" @click="getOperateContractId(scope.row.id, '_cancel')" v-permit="'cancel:contract'">
                    <div class="i-div huishouzhan">
                      <img src="../../../common/images/icon/icon_delete.png" alt="" class="operation_img">
                    </div>
                    <span style="word-break: keep-all;">取消合同</span>
                  </div>
                  <!-- 上传 -->
                  <div v-if="scope.row.status === 2" class="small-Idiv" @click="uploadContract(scope.row.id)" v-permit="'upload:contract'">
                    <div class="i-div huishouzhan">
                      <img src="../../../common/images/icon/icon_contract.png" alt="" class="operation_img">
                    </div>
                    <span style="word-break: keep-all;">上传扫描件</span>
                  </div>
                  <!-- 归档 -->
                  <!--<div v-if="scope.row.status === 2"  class="small-Idiv" @click="toFileView">
                    <div class="i-div huishouzhan">
                      <img src="../../../common/images/icon/icon_contract.png" alt="" class="operation_img">
                    </div>
                    <span style="word-break: keep-all;">归档</span>
                  </div>-->
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination" style="text-align: right;padding: 20px 0;">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="form.pageNum"
                :page-sizes="[10, 30, 50, 100]"
                :page-size="form.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
          </div>

        </div>
      </div>
    </div>

    <!-- 审核弹窗 -->
    <el-dialog
        title="审核"
        :visible.sync="dialogVisible1"
        width="30%"
    >
      <el-form :model="form"  label-width="100px">
        <el-form-item label="审核状态:">
          <el-radio v-model="examine.status" label="1">通过</el-radio>
          <el-radio v-model="examine.status" label="2">不通过</el-radio>
        </el-form-item>
        <el-form-item label="审核原因:">
          <el-input type="textarea"
                    :rows="2"
                    :placeholder="placeholder"
                    v-model="examine.textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible1 = false" size="small">取 消</el-button>
        <el-button type="primary" @click="examineContract" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 审核弹窗 -->

    <!-- 删除 -->
<!--    <el-dialog
        title="删除"
        :visible.sync="dialogVisible2"
        width="30%"
    >
      <el-form :model="form"  label-width="100px">
        <el-form-item label="删除原因:">
          <el-input v-model="deleteRemark" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer.vue" class="dialog-footer.vue">
        <el-button type="danger" @click="dialogVisible2 = false" size="small">取 消</el-button>
        <el-button type="primary" @click="deleteContract" size="small">确 定</el-button>
      </span>
    </el-dialog>-->
    <!-- 删除 -->
    <el-dialog
            title="删除"
            :visible.sync="deleteAuditDialog"
            width="30%"
    >
      <el-form :model="form"  label-width="100px">
        <el-form-item label="删除原因:">
          <el-input v-model="deleteRemark" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="deleteAuditDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="deleteAudit()" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
            title="确认取消合同"
            :visible.sync="dialogVisible_cancel"
            width="30%"
    >
      <el-form :model="cancel"  label-width="100px">
        <el-form-item label="原因:">
          <el-input v-model="cancel.reason" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible_cancel = false" size="small">取 消</el-button>
        <el-button type="primary" @click="cancelContract()" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 提交审核 -->
 <!--   <el-dialog
        title="提交审核"
        :visible.sync="dialogVisible3"
        width="30%"
    >
      <span> 请您仔细核对合同内容，您确定要提交审核吗？</span>
      <span slot="footer.vue" class="dialog-footer.vue">
        <el-button type="danger" @click="dialogVisible3 = false" size="small">取 消</el-button>
        <el-button type="primary" @click="sumToExamine" size="small">确 定</el-button>
      </span>
    </el-dialog>-->
    <!-- 提交审核 -->
    <el-dialog
            title="审核"
            :visible.sync="dialogVisible3"
            width="30%"
    >
      <el-form :model="form"  label-width="100px">
        <el-form-item label="审核状态:">
          <el-radio v-model="audit.status" label="1">通过</el-radio>
          <el-radio v-model="audit.status" label="2">不通过</el-radio>
        </el-form-item>
        <el-form-item label="审核原因:">
          <el-input type="textarea"
                    :rows="2"
                    :placeholder="this.placeholder"
                    v-model="audit.textarea"
          ></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible3 = false" size="small">取 消</el-button>
        <el-button type="primary" @click="examineTo" size="small">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
            title="上传扫描件"
            :visible.sync="dialogVisible_upload"
            width="30%"
    >
      <el-form :model="file"  label-width="100px">
      <el-form-item prop="BL_image_id" label="扫描件:" class>
        <el-upload
                class="avatar-uploader"
                :action="action"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
        >
          <img v-if="file.url" :src="file.url" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible_upload = false" size="small">取 消</el-button>
        <el-button type="primary" @click="uploadScanFile" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配采购员 -->
    <el-dialog
            title="分配销售员"
            :visible.sync="dialogVisible_admin"
            width="30%">
      <span>
        <el-select v-model="admin.sysuserId" clearable placeholder="请选择" style="width:300px">
          <el-option
                  v-for="item in userOptions"
                  :key="item.sysuserId"
                  :label="item.sysuserName"
                  :value="item.sysuserId">
          </el-option>
        </el-select>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible_admin = false" size="small">取 消</el-button>
        <el-button type="primary" @click="distributionAdmin('',true)" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!--点击查看大图弹窗 &ndash;&gt;-->
    <el-dialog title :visible.sync="picture" width="34%" center>
      <span>
        <div style="width: 100%;height: 578px;overflow: auto;">
          <img :src=bigImg class="big_img"/>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="picture = false" size="small">取 消</el-button>
        <el-button type="primary" @click="picture = false" size="small">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { reqContractList,cancelContract, getAgencyContractAudit, distributionAdmin, deleteContract, submitToExamine, examineContract, upLoadScanFile,agencyContractAuditDelete,agencyContractToExamine } from '@/api/apply/index'
import { throttleTipPop } from '@/utils/throttle'
import {getAlluser, getSaleManList} from '@/api/supplier/index'
export default {
  name: "contactReview",
  data() {
    return {
      bigImg: '', //大图
      picture: false,
      action:'',
      id: null, // 操作的商品id
      deleteRemark: '', // 删除原因
      placeholder: '', // 审核结果缘由提示语
      examine: {
          status: '', // 审核状态
          textarea: '', // 审核结果理由
      },
      userOptions:[],
      dialogVisible1: false, // 审核弹窗
      dialogVisible2: false, // 删除弹窗
      dialogVisible3: false, // 提交审核弹窗
      dialogVisible_upload: false, // 上传文件弹窗
      dialogVisible_cancel: false, // 取消合同弹窗
      dialogVisible_admin: false, // 指派销售员弹窗
      total: 0, // 返回总条数
      tableData: [], // 合同审核列表
      contractStatus: [ //  合同状态
          { value: null, label: '全部' },
          { value: '0', label: '已创建' },
          { value: '1', label: '待审核' },
          { value: '2', label: '审核通过' },
          { value: '3', label: '审核不通过'},
          { value: '4', label: '已归档'}
      ],
      form: { // 搜索条件
          secondParty: '', // 经销商名称
          signTimeStart: null, // 合同签订开始时间
          signTimeEnd: null, // 合同签订结束时间
          status: '', // 合同状态
          pageNum: 1, // 当前页
          pageSize: 10, // 每页展示量
      },
      deleteAuditDialog:false,
      deleteId:'',
      audit:{
        status:'',
        textarea:'',
        auditId:'',
        contractId:'',
        taskId:'',
      },
      //上传附件
      file:{
        id: '',
        url: ''
      },
      //取消合同
      cancel:{
        id:'',
        reason:''
      },
      //分配
      admin:{
        sysuserId:'',
        id:''
      }
    };
  },
  mounted() {
    this._getAlluser()
    this.getContractList()
    this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
  },
  methods : {
    //查看大图
    open(url) {
      this.picture = true;
      this.bigImg = url
    },
    _getAlluser(){
      getSaleManList().then(res => {
        this.userOptions = res.data.list
        this.admin.sysuserId = res.data.list[0].sysuserId
      })
    },
    handleAvatarSuccess(res, file) {
      this.file.url = res.data.domain + res.data.filePath;
    },
    deleteAuditView(id){
      console.log(id)
      this.deleteId = id;
      console.log(this.deleteId)
      this.deleteRemark = '';

      this.deleteAuditDialog = true;
    },
    deleteAudit(){
      let params = {}
      //params.auditId = this.deleteId;
      //params.remark = this.deleteRemark;
      deleteContract(this.deleteId, this.deleteRemark).then(res=>{
        if(res.code == 200){
          this.$message({
            message: res.message,
            type: 'success'
          });
          this.deleteAuditDialog = false
          this.getContractList()
        }
      })

      this.deleteAuditDialog = false;
    },
    examineView(val){
      this.audit.auditId = ""
      this.audit.contractId =  ""
      this.audit.taskId =  ""
      this.audit.textarea =  ""
      this.audit.status =  "1"
      console.log(val);
      this.dialogVisible3 = true
      this.audit.auditId = val.auditId
      this.audit.contractId = val.id
      this.audit.taskId = val.currentAuditDetail && val.currentAuditDetail.taskId || ""
    },
    examineTo(){
      let obj ={}
      obj.auditId = this.audit.auditId
      //obj.auditStatus = this.form.auditStatus
      obj.contractId = this.audit.contractId
      obj.taskId = this.audit.taskId || ""
      obj.verifyRemark = this.audit.textarea
      obj.auditStatus = this.audit.status
      console.log(obj);
      agencyContractToExamine(obj).then(res =>{
        console.log(res);
        if(res.code == 200){
          this.$message({
            message: res.message,
            type: 'success'
          });
          this.dialogVisible3= false
          this.getContractList()
        }
        this.dialogVisible3= false

      })
    },
      // 上传扫描文件
      async uploadScanFile() {
        if (this.file.url == '') return this.$message("选择扫描件")
        this.$confirm('上传之后将无法修改, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await upLoadScanFile(this.file.id,this.file.url)
          this.dialogVisible_upload=false;
          if (res.code === 200) {
            throttleTipPop(this, 'success', '上传成功')
            this.getContractList()
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消上传'
          });
        });
      },
      // 审核合同
      async examineContract() {
          const res = await examineContract()
          if (res.code === 200) {
              throttleTipPop(this, 'success', '审核成功')
              this.getContractList()
          }
      },
      // 提交审核
      async sumToExamine() {
          const res = await submitToExamine(this.id)
          if(res.code === 200) {
              throttleTipPop(this, 'success', '提交审核成功')
              this.getContractList()
          }
          this.dialogVisible3 = false
      },
      // 获取被操作方案的id并显示弹窗
      getOperateContractId(id, popIndex) {
        this.cancel.id = id
        this[`dialogVisible${popIndex}`] = true
      },
      // 指派销售员
      dispatchAdmin(id, popIndex) {
        this.admin.id = id
        this[`dialogVisible${popIndex}`] = true
      },
      // 新增合同
      addNewContract() {
          this.$router.push({
              name: 'ContractListDetail',
              query: {
                  add_new_contract: true,
              },
          })
      },
      // 打印合同
      prinContract(id) {
          this.$router.push({
              name: 'ContractListDetail',
              query: {
                  id,
                  printable: true,
              },
          })
      },
      // 查看详情
      checkDetail(id) {
          this.$router.push({
              name: 'ContractListDetail',
              query: {
                  id,
                  checkDetail: true,
              },
          })
      },
      // 编辑
      editContract(id) {
          this.$router.push({
              name: 'ContractListDetail',
              query: {
                  id,
                  editable: true,
              },
          })
      },
      // 审核
      examineContract() {

      },
      //取消合同
      async cancelContract(){
        const res = await cancelContract(this.cancel.id, this.cancel.reason)
        if(res.code === 200) {
          throttleTipPop(this, 'success', '取消合同成功')
          this.getContractList()
        }
        this.cancel.id = ''
        this.cancel.reason = ''
        this.dialogVisible_cancel = false
      },
      // 删除
      async deleteContract() {
        if(this.deleteRemark.replace(/\s*/, '') === '') {
            throttleTipPop(this, 'warning', '请填写删除原因')
        }
        const res = await deleteContract(this.id, this.deleteRemark)
        if(res.code === 200) {
            throttleTipPop(this, 'success', '删除成功')
            this.getContractList()
        }
        this.deleteRemark = ''
        this.dialogVisible2 = false
      },
      async distributionAdmin(){
        const res = await distributionAdmin(this.admin.id, this.admin.sysuserId)
        if(res.code === 200) {
          throttleTipPop(this, 'success', '分配管理员成功')
          this.getContractList()
        }
        this.admin.id='';
        this.dialogVisible_admin = false
      },
      // 上传合同
      uploadContract(id) {
        this.file.id = '';
        this.file.id = id;
        this.dialogVisible_upload=true;
      },
      // 是否归档对话框
      toFileView() {

      },
      // 归档
      toFile() {

      },
      // 搜索查询
      getContract() {
          this.getContractList()
      },
      // 查询获取合同列表
      async getContractList() {
          const res = await reqContractList(this.form)
          console.log(res)
          if (res.code === 200) {
              this.total = res.data.total
              this.tableData = res.data.list
          }
      },
      // 每页查询数发生变化
      handleSizeChange(val) {
        this.form.pageSize = val
          this.form.pageNum = 1
        this.getContractList()
      },
      // 页码发生变化
      handleCurrentChange(val) {
        this.form.pageNum = val
        this.getContractList()
      },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/common/scss/variable.scss";
  .avatar{
    width: 100px;
    height: 140px;
  }
  .clearfix:after {
    display: block;
    content: '';
    clear: both;
  }
  .clearfix {
    zoom: 1;
  }
  .line-div {
    display: inline-block;
  }
  .small-Idiv {
    float: left;
    margin: 5px 4px;
    cursor: pointer;
    width: 71px;
  }
  /* 搜索条件 */
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
        color: #333;
        padding-left: 20px;
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
    .el-date-picker{
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
  /* 搜索条件 */
  /deep/ .el-upload {
    width: 100px;
    height: 140px;
    line-height: 140px;
  }

  .big_img {
    width: 100%;
    height: 546px;
  }

</style>
