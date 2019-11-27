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
                  <el-form-item label="审核状态：">
                    <el-select v-model="form.auditStatus" placeholder="请选择状态">
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
          <h4 class="title">经销商合同审核</h4>
          <div style="margin-bottom: 20px">
            <!--<el-button type="primary" size="small" @click="addNewContract">
              <i style="margin-right:5px;position: relative;top: 2px;"><img src="@/common/images/apply/icon_contract.png" alt=""></i>
              <span style="position: relative;top: -1px;">新增合同</span>
            </el-button>-->
          </div>
          <el-table :data="tableData"  border style="width: 100%" stripe>
            <el-table-column  type="index"  label="序号" align="center" width="55"></el-table-column>
            <el-table-column  prop="auditId"  label="审核编号" align="center" width="100"></el-table-column>
            <el-table-column  prop="auditStatus"  label="审核状态" align="center" width="100">
              <template slot-scope="scope">
                {{scope.row.auditStatus == 0?'待审核':scope.row.auditStatus == 1?'审核通过':scope.row.auditStatus == 2?'审核未通过':''}}
              </template>
            </el-table-column>
            <el-table-column   label="创建时间" align="center" width="160">
              <template slot-scope="scope">
                <span>{{scope.row.createTime}}</span>
              </template>
            </el-table-column>
            <el-table-column   label="进度表" align="center" width="140">
              <template slot-scope="scope">
                <div class="txt_left" v-for="item in scope.row.auditTasks" style="text-align: center">
                  {{item.userName}}:{{item.taskResult==0?'待审核':''||item.taskResult==1?'已通过':''||item.taskResult==2?'未通过':''}}
                </div>
                <div @click="schedule(scope.row)" class="schedule el-button el-button--primary el-button--small">
                  审核进度
                </div>
              </template>
            </el-table-column>
            <el-table-column   label="结束时间" align="center" width="160">
              <template slot-scope="scope">
                <span>{{scope.row.endTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="合同编号" align="center" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.formData.contractSn}}</span>
              </template>
            </el-table-column>
            <el-table-column label="合同标题" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.formData.contractName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="甲方公司信息" width="240px" align="center" >
              <template slot-scope="scope">
                <p style="text-align: left">甲方：{{scope.row.formData.firstParty}}</p>
                <p style="text-align: left">联系人：{{scope.row.formData.firstPartyContact}}</p>
                <p style="text-align: left">联系电话：{{scope.row.formData.firstPartyTelephone}}</p>
                <p style="text-align: left">地址：{{scope.row.formData.firstPartyAddress}}</p>
              </template>
            </el-table-column>
            <el-table-column label="乙方公司信息" width="240px" align="center" >
              <template slot-scope="scope">
                <p style="text-align: left">乙方：{{scope.row.formData.secondParty}}</p>
                <p style="text-align: left">联系人：{{scope.row.formData.secondPartyContact}}</p>
                <p style="text-align: left">联系电话：{{scope.row.formData.secondPartyTelephone}}</p>
                <p style="text-align: left">地址：{{scope.row.formData.secondPartyAddress}}</p>
              </template>
            </el-table-column>
            <!--<el-table-column  prop="name"  label="合同状态" align="center" >
              <template slot-scope="scope">
                <span v-if="scope.row.formData.status === 0">已创建</span>
                <span v-if="scope.row.formData.status === 1">待审核</span>
                <span v-if="scope.row.formData.status === 3">审核不通过</span>
                <span v-if="scope.row.formData.status === 2">审核通过</span>
                <span v-if="scope.row.formData.status === 4">已归档</span>
              </template>
            </el-table-column>-->
            <!--<el-table-column label="签订时间" align="center" width="140">
              <template slot-scope="scope">
                <span>{{scope.row.formData.signTime}}</span>
              </template>
            </el-table-column>-->
            <!--<el-table-column   label="销售管理员" align="center" width="140">
              <template slot-scope="scope">
                <span>{{scope.row.formData.adminName}}</span>
              </template>
            </el-table-column>-->
            <!--<el-table-column   label="创建时间" align="center" width="140">
              <template slot-scope="scope">
                <span>{{scope.row.formData.createTime}}</span>
              </template>
            </el-table-column>-->

            <el-table-column label="操作" align="center"  fixed="right" width="180px">
              <template slot-scope="scope">
                <div class="line-div clearfix">
                  <!-- 详情 -->
                  <div class="small-Idiv" @click="checkDetail(scope.row.formData.id)" v-permit="'review:details'">
                    <div class="i-div">
                      <img src="../../../common/images/icon/icon_detail.png" alt="" class="operation_img">
                    </div>
                    <span style="word-break: keep-all;" >合同详情</span>
                  </div>
                  <!-- 编辑 -->
                  <!--<div v-if="scope.row.formData.status === 0" class="small-Idiv" @click="editContract(scope.row.formData.id)">
                    <div class="i-div">
                      <img src="../../../common/images/icon/icon_edit.png" alt="" class="operation_img">
                    </div>
                    <span style="word-break: keep-all;" >编辑</span>
                  </div>-->
                  <!-- 指派管理员 -->
                  <!--<div v-if="scope.row.formData.status === 0" class="small-Idiv" @click="checkDetail(scope.row.formData.id)">
                    <div class="i-div">
                      <img src="../../../common/images/icon/指派采购员(1)shouji.png" alt="" class="operation_img">
                    </div>
                    <span style="word-break: keep-all;" >指派管理员</span>
                  </div>-->
                  <!-- 提交审核 -->
                  <!--<div v-if="scope.row.formData.status === 0" class="small-Idiv" @click="getOperateContractId(scope.row.formData.id, 3)">
                    <div class="i-div huishouzhan">
                      <img src="../../../common/images/icon/审核.png" alt="" class="operation_img">
                    </div>
                    <span style="word-break: keep-all;">提交审核</span>
                  </div>-->
                  <!-- 审核 --><!--v-if="scope.row.formData.status === 1"-->
                  <div v-if="scope.row.formData.status === 1"  class="small-Idiv" @click="examineView(scope.row, 1)" v-permit="'review:audit'">
                    <div class="i-div huishouzhan">
                      <img src="../../../common/images/icon/icon_examine.png" alt="" class="operation_img">
                    </div>
                    <span style="word-break: keep-all;">审核</span>
                  </div>
                  <!-- 打印合同 -->
                  <!--<div v-if="scope.row.formData.status === 2" class="small-Idiv" @click="prinContract(scope.row.formData.id)">
                    <div class="i-div huishouzhan">
                      <img src="../../../common/images/icon/icon_examine.png" alt="" class="operation_img">
                    </div>
                    <span style="word-break: keep-all;">打印合同</span>
                  </div>-->
                  <!-- 删除 -->
                  <div  class="small-Idiv"
                       @click="deleteAuditView(scope.row.auditId)" v-permit="'review:remove'">
                    <div class="i-div huishouzhan">
                      <img src="../../../common/images/icon/icon_delete.png" alt="" class="operation_img">
                    </div>
                    <span style="word-break: keep-all;">删除</span>
                  </div>
                  <!-- 取消 -->
                  <!--<div v-if="scope.row.formData.status === 2" class="small-Idiv" @click="getOperateContractId(scope.row.formData.id, 2)">
                    <div class="i-div huishouzhan">
                      <img src="../../../common/images/icon/icon_delete.png" alt="" class="operation_img">
                    </div>
                    <span style="word-break: keep-all;">取消合同</span>
                  </div>-->
                  <!-- 上传 -->
                  <!--<div v-if="scope.row.formData.status === 2" class="small-Idiv" @click="uploadContract">
                    <div class="i-div huishouzhan">
                      <img src="../../../common/images/icon/icon_contract.png" alt="" class="operation_img">
                    </div>
                    <span style="word-break: keep-all;">上传扫描件</span>
                  </div>-->
                  <!-- 归档 -->
                  <!--<div v-if="scope.row.formData.status === 2"  class="small-Idiv" @click="checkElectronicContract">
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

    <!--查看进度条-->
    <el-dialog
            title="进度表："
            :visible.sync="approvalsShow"
            width="40%"
    >
      <div class="div_big">
        <div class="big_div" v-for="(item,index) in auditTasks" :key="index">
          <div class="big_ball">
            <div class="ball">{{index+1}}</div>
          </div>
          <div class="bor_left">
            <div class="wihte_div"></div>
            <div :class="item.taskResult==0?'blur_div white_color':'blur_div'"></div>
            <div>
              <span>
              <span>{{index==0?'提交':'审核'}}</span><!--
                <span style="margin: 0 10px">部门：{{item.organizeName}}</span>
                <span style="margin: 0 10px">提交人：{{item.userName}}</span>
                <span style="margin: 0 10px">职位：{{item.roleName}} </span>-->
                <span style="margin: 0 10px">审核人：{{item.userName}} </span>
              </span>
              <span>
                <!--<el-button type="primary" size="mini" v-if="item.taskResult==0" style="position: absolute;margin-left: 15px;right: 0;margin-top: 10px">加急处理</el-button>-->
              </span>
            </div>
            <div class='div_time' v-if="item.createTime">{{item.createTime}}</div>
            <div style="margin-top: 10px">
              <span class="medium_span">审批结果:{{item.taskResult==0?'待审核':''||item.taskResult==1?'同意':''||item.taskResult==2?'不同意':''}}</span>
              <div style="margin-top:20px "  class="cai_span">
                原因:{{item.taskComment?item.taskComment:'暂无'}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="approvalsShow=false" size="small">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { reqContractList, getAgencyContractAudit, deleteContract, submitToExamine, examineContract, upLoadScanFile,agencyContractAuditDelete,agencyContractToExamine } from '@/api/apply/index'
import { throttleTipPop } from '@/utils/throttle'
export default {
  name: "contactReview",
  data() {
    return {
      auditTasks:'', //进度表数据
      approvalsShow:false,
      id: null, // 操作的商品id
      deleteRemark: '', // 删除原因
      placeholder: '', // 审核结果缘由提示语
      examine: {
          status: '', // 审核状态
          textarea: '', // 审核结果理由
      },
      dialogVisible1: false, // 审核弹窗
      dialogVisible2: false, // 删除弹窗
      dialogVisible3: false, // 提交审核弹窗
      total: 0, // 返回总条数
      tableData: [], // 合同审核列表
      contractStatus: [ //  合同状态
          { value: '0', label: '待审核' },
          { value: '1', label: '审核通过' },
          { value: '2', label: '审核未通过'},
      ],
      form: { // 搜索条件
          secondParty: '', // 经销商名称
          signTimeStart: null, // 合同签订开始时间
          signTimeEnd: null, // 合同签订结束时间
          status: '', // 合同状态
          auditStatus: '0', // 审核状态
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
      }
    };
  },
  mounted() {
    this.getContractList()
  },
  methods : {
    //查看进度表
    schedule(val){
      this.approvalsShow = true
      this.auditTasks = val.auditTasks
    },
    deleteAuditView(auditId){
      console.log(auditId)
      this.deleteId = auditId;
      console.log(this.deleteId)
      this.deleteRemark = '';

      this.deleteAuditDialog = true;
    },
    deleteAudit(){
      let params = {}
      params.auditId = this.deleteId;
      params.remark = this.deleteRemark;
      agencyContractAuditDelete(params).then(res=>{
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
      this.audit.auditId = val.auditId
      this.audit.contractId = val.formData.id
      this.audit.taskId = val.currentTaskId || ""
      if(this.audit.taskId==""){
        this.$message({
          message: "无权限审核",
          type: 'error'
        });
        return;
      }
      this.dialogVisible3 = true
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
          const res = await upLoadScanFile()
          if (res.code === 200) {
              throttleTipPop(this, 'success', '上传成功')
              this.getContractList()
          }
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
        this.id = id
        this[`dialogVisible${popIndex}`] = true
      },
      // 新增合同
      addNewContract() {
          this.$router.push({
              name: 'DealerContractReviewDetail',
              query: {
                  add_new_contract: true,
              },
          })
      },
      // 打印合同
      prinContract(id) {
          this.$router.push({
              name: 'DealerContractReviewDetail',
              query: {
                  id,
                  printable: true,
              },
          })
      },
      // 查看详情
      checkDetail(id) {
          this.$router.push({
              name: 'DealerContractReviewDetail',
              query: {
                  id,
                  checkDetail: true,
              },
          })
      },
      // 编辑
      editContract(id) {
          this.$router.push({
              name: 'DealerContractReviewDetail',
              query: {
                  id,
                  editable: true,
              },
          })
      },
      // 审核
      examineContract() {

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
      // 上传合同
      uploadContract() {

      },
      // 查看电子合同
      checkElectronicContract() {

      },
      // 搜索查询
      getContract() {
          this.getContractList()
      },
      // 查询获取合同列表
      async getContractList() {
          const res = await getAgencyContractAudit(this.form)
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


  /*进度条*/
  .schedule{
    margin-top: 20px;
    width: 80px;
  }
  .big_ball {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #f0f3fa;
    line-height: 32px;
    text-align: center;
    z-index: 10;
    .ball {
      width: 22px;
      height: 22px;
      background: rgba(64, 158, 255, 1);
      border-radius: 50%;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 22px;
      text-align: center;
      z-index: 10;
      margin: 0 auto;
      margin-top: 5px;
    }
  }

  .big_div {
    display: flex;
    position: relative;
  }
  .cai_span {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #3C3C3C;
  }
  .shen_state {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(64, 158, 255, 1);
    position: relative;
    top: 5px;
  }
  .div_time {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(201, 201, 201, 1);
    margin-top: 5px;
  }
  .bor_left {
    padding-left: 34px;
    min-height: 175px;
    border-radius: 2px;
    position: relative;
    left: -18px;
    top: 1px;
  }
  .div_big {
    padding-left: 59px;
  }
  .shenwei_state {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #fe1b1b;
    position: relative;
    top: 5px;
  }
  .medium_span{
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    position: relative;
    top: 5px;
  }
  // .div_big .big_div:last-of-type .bor_left {
  //   border: none;
  // }
  .red{
    color: red;
  }
  .wihte_div{
    position: absolute;
    width:14px;
    background:rgba(240,243,250,1);
    height: 100%;
    left: -5px;
  }
  .blur_div{
    position: absolute;
    left: -1px;
    height: 100%;
    width: 6px;
    background: #409eff;
  }
  .div_big .big_div:last-child .bor_left .wihte_div{
    display: none;
  }
  .div_big .big_div:last-child .bor_left .blur_div{
    display: none;
  }
  .div_big .big_div:last-child .bor_left{
    min-height: 80px;
  }
  .white_color{
    background: rgba(240,243,250,1);
  }
  .div_time {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(201, 201, 201, 1);
    margin-top: 5px;
  }
</style>
