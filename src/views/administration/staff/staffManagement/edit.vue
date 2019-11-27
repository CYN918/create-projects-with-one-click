<template>
  <div class="gathering">
    <el-dialog width="50%" :visible.sync="editVisible" :before-close="createClosing">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">员工管理-编辑</h4>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mcard0">
        <div class="mcard">
          <el-form ref="infoForm" :model="employeeList" :rules="rules" label-width="110px" size="small">
            <el-row>
              <el-form-item label="照片：">
                <el-upload
                  v-if="employeeList.headType===1"
                  accept="image/jpeg"
                  class="avatar-uploader"
                  :action="baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile'"
                  :file-list="img1"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="employeeList.pictureUrl" :src="employeeList.pictureUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-upload
                 v-if="employeeList.headType===2"
                  accept="image/jpeg"
                  class="avatar-uploader1"
                  :action="baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile'"
                  :file-list="img1"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess1"
                  :before-upload="beforeAvatarUpload1"
                >
                  <img v-if="employeeList.pictureUrl" :src="employeeList.pictureUrl" class="avatar1" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="员工姓名：" prop="employeeName">
                    <el-input v-model="employeeList.employeeName" placeholder="请输入员工姓名"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="员工编号：">
                    <el-input v-model="employeeList.employeeSn" placeholder="请输入员工编号"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="职       称：">
                    <el-input v-model="employeeList.position" placeholder="请输入职称"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="部       门：">
                    <el-input v-model="employeeList.payAmount" placeholder="请输入部门"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="公司手机号：">
                    <el-input v-model="employeeList.companyTel" placeholder="请输入公司手机号"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="个人手机号：">
                    <el-input v-model="employeeList.personalTel" placeholder="请输入办公电话"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="办公电话：">
                    <el-input v-model="employeeList.officePhone" placeholder="请输入办公电话"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="微 信 号：">
                    <el-input v-model="employeeList.wechat" placeholder="请输入微信号"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="Q Q 号：">
                    <el-input v-model="employeeList.qq" placeholder="请输入QQ号"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="电子邮箱：">
                    <el-input v-model="employeeList.email" placeholder="请输入电子邮箱"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="开 户 行：">
                    <el-input v-model="employeeList.bankOpeningName" placeholder="请输入开户行"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="银行账号：">
                    <el-input v-model="employeeList.bankAccount" placeholder="请输入银行账号"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="mcard0">
        <div class="mcard">
          <el-form ref="infoForm" :model="employeeList" :rules="rules" label-width="110px" size="small">
            <el-row>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="性 别：" prop="sex">
                    <el-select v-model="employeeList.sex" 
                    style="width:100%;"
                    placeholder="请选择性别">
                      <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="出生年月：" prop="birthday">
                    <el-date-picker
                      style="width:100%;"
                      v-model="employeeList.birthday"
                      valueFormat='yyyy-MM-dd HH:mm:ss'
                      type="date"
                      placeholder="选择出生年月"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="民 族：">
                    <el-input v-model="employeeList.nation" placeholder="请输入民族"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="籍 贯：">
                    <el-input v-model="employeeList.origin" placeholder="请输入籍贯"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="是否已婚：" prop="maritalStatus">
                    <el-select
                      v-model="employeeList.maritalStatus"
                      placeholder="请选择婚姻状态"
                      style="width:100%;"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-col>

              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="毕业院校：">
                    <el-input v-model="employeeList.graduatedFrom" placeholder="请输入毕业院校"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="身份证号码：">
                    <el-input v-model="employeeList.idCard" placeholder="请输入身份证号码"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="学       历：">
                    <el-input v-model="employeeList.educationalLevel" placeholder="请输入学历"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="23">
                <el-form-item label="身份证地址：">
                  <el-input v-model="employeeList.idAddress" placeholder="请输入身份证地址"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="23">
                <el-form-item label="现居住地址：">
                  <el-input v-model="employeeList.address" placeholder="请输入现居住地址"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="mcard0">
        <div class="mcard">
          <el-form ref="infoForm" :model="employeeList" :rules="rules" label-width="110px" size="small">
            <el-row>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="入职日期：" prop="hireTime">
                    <el-date-picker
                      style="width:100%;"
                      v-model="employeeList.hireTime"
                      valueFormat='yyyy-MM-dd HH:mm:ss'
                      type="date"
                      placeholder="选择入职日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="转正日期：">
                    <el-date-picker
                      style="width:100%;"
                      v-model="employeeList.turnPositiveTime"
                      valueFormat='yyyy-MM-dd HH:mm:ss'
                      type="date"
                      placeholder="选择转正日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="入职前工龄：">
                    <el-input v-model.number="employeeList.workingAge" placeholder="请输入入职前工龄"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="离职日期：">
                    <el-date-picker
                      style="width:100%;"
                      v-model="employeeList.leaveTime"
                      valueFormat='yyyy-MM-dd HH:mm:ss'
                      type="date"
                      placeholder="选择离职日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="合同开始日期：" prop="contractTimeStart">
                    <el-date-picker
                      style="width:100%;"
                      v-model="employeeList.contractTimeStart"
                      valueFormat='yyyy-MM-dd HH:mm:ss'
                      type="date"
                      placeholder="选择合同开始日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="合同结束日期：" prop="contractTimeEnd">
                    <el-date-picker
                      style="width:100%;"
                      v-model="employeeList.contractTimeEnd"
                      valueFormat='yyyy-MM-dd HH:mm:ss'
                      type="date"
                      placeholder="选择合同结束日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="公司名称：">
                    <el-input v-model="employeeList.companyName" placeholder="请输入公司名称"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="员工类型：" prop="employeeType">
                    <el-select v-model="employeeList.employeeType" placeholder="请选择员工类型"
                    style="width:100%;">
                      <el-option  
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row></el-row>
            <el-row>
              <el-col :span="23">
                <el-form-item label="工作经历：">
                  <el-input
                    v-model="employeeList.workExperience"
                    type="textarea"
                    :autosize="{ minRows: 3, maxRows: 3}"
                    resize="none"
                    placeholder="请输入工作经历"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="mcard0">
        <div class="mcard">
          <el-form ref="infoForm" :model="employeeList" :rules="rules" label-width="110px" size="small">
            <div class="familyMessage">
              <div class="message">
                <span>家庭成员</span>
              </div>
              <div class="messageContent" v-for="(item,index) in employeeList.familyInfos" :key="index">
                <div class="name">
                  <span>姓名</span>
                </div>
                <div class="nameMessage">
                  <el-input   v-model="item.name" size="mini"></el-input>
                </div>
                <div class="relationship">
                  <span>关系</span>
                </div>
                <div class="relationshipMessage">
                  <el-input v-model="item.relation" size="mini"></el-input>
                </div>
                <div class="tel">
                  <span>联系电话</span>
                </div>
                <div class="telMessage">
                  <el-input v-model="item.tel" size="mini"></el-input>
                </div>
              </div>
             
             
              <div class="message1">
                <span>紧急联系人</span>
              </div>
              <div class="messageContent" v-if="employeeList.urgentInfo">
                <div class="name">
                  <span>姓名</span>
                </div>
                <div class="nameMessage">
                  <el-input v-model="employeeList.urgentInfo.name" size="mini"></el-input>
                </div>
                <div class="relationship">
                  <span>关系</span>
                </div>
                <div class="relationshipMessage">
                  <el-input v-model="employeeList.urgentInfo.relation" size="mini"></el-input>
                </div>
                <div class="tel">
                  <span>联系电话</span>
                </div>
                <div class="telMessage">
                  <el-input v-model="employeeList.urgentInfo.tel" size="mini"></el-input>
                </div>
              </div>
            </div>

            <div class="uploadList">
              <div class="uploadMessage">
                <div class="uploadTitle">
                  <span>简历扫描件：</span>
                </div>
                <el-upload
                  accept="image/jpeg, image/png"
                  class="avatar-uploader"
                  list-type="picture-card"
                  :action="baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile'"
                  :file-list="img2"
                  :class="{hide:hideUpload}"
                  :on-success="handleAvatarSuccess2"
                  :before-upload="beforeAvatarUpload2"
                  :on-preview="handlePictureCardPreview2"
                  :on-remove="handleRemove2"
                  :on-change="uploadChange2"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible1" append-to-body>
                  <img width="100%" :src="dialogImageUrl1" alt />
                </el-dialog>
              </div>
              <div class="uploadMessage">
                <div class="uploadTitle">
                  <span>毕业证书：</span>
                </div>
                <el-upload
                  accept="image/jpeg, image/png"
                  class="avatar-uploader"
                  list-type="picture-card"
                  :action="baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile'"
                  :file-list="img3"
                  :class="{hide:hideUpload1}"
                  :on-success="handleAvatarSuccess3"
                  :before-upload="beforeAvatarUpload3"
                  :on-preview="handlePictureCardPreview3"
                  :on-remove="handleRemove3"
                  :on-change="uploadChange3"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible2" append-to-body>
                  <img width="100%" :src="dialogImageUrl2" alt />
                </el-dialog>
              </div>
              <div class="uploadMessage">
                <div class="uploadTitle">
                  <span>身份证复印件：</span>
                </div>
                <el-upload
                  accept="image/jpeg, image/png"
                  class="avatar-uploader"
                  list-type="picture-card"
                  :action="baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile'"
                  :file-list="img4"
                  :class="{hide:hideUpload2}"
                  :on-success="handleAvatarSuccess4"
                  :before-upload="beforeAvatarUpload4"
                  :on-preview="handlePictureCardPreview4"
                  :on-remove="handleRemove4"
                  :on-change="uploadChange4"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible3" append-to-body>
                  <img width="100%" :src="dialogImageUrl3" alt />
                </el-dialog>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="createClose()" size="small">关 闭</el-button>
        <el-button type="primary" @click="createSave()" size="small">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { savePayment } from "@/api/sale/index";
import {editEmployeeInfo} from "@/api/administration/index"
import { throttleTipPop } from "@/utils/functions.js";
export default {
  data() {
    return {
      hideUpload: false,//隐藏上传按钮标识
      hideUpload1: false,//隐藏上传按钮标识
      hideUpload2: false,//隐藏上传按钮标识
      employeeList:{},
      limitCount:1, 
      imageUrl: "", //方的照片
      imageUrl1: "", //圆的照片
      imageUrl2:'',//简历图片
      imageUrl3:'',//毕业证图片
      imageUrl4:'',//身份证复印件
      img1:[],
      img2:[],
      img3:[],
      img4:[],
      showIndex: 1,
      showIndex1: 1,
      dialogVisible1: false,//简历预览
      dialogImageUrl1: "",
      dialogVisible2: false,//毕业证预览
      dialogImageUrl2: "",
      dialogVisible3: false,//身份证复印件预览
      dialogImageUrl3: "",
      imgArr: [],
      editVisible: false,
      form: {
        payAcountno: "", //资金账户\
        payAcountId: "", //资金账户ID
        payType: "", //收款类型
        payTime: "", //收款时间
        payAmount: "", //收款金额
        payAbstract: "", //摘要
        payVoucher: "",
        saleOrderNo: ""
      },
      radio: "", //互斥单选框
      radio2: "",
      value: "",
       options: [{ value: 1, label: "未婚" }, { value: 2, label: "已婚" }],
      options1: [
        { value: 0, label: "试用期员工" },
        { value: 1, label: "正式员工" },
        { value: 2, label: "离职员工" }
      ],
      options2: [{ value: 1, label: "男" }, { value: 2, label: "女" }],
      rules: {
        payAcountId: [
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ],
        payTime: [
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  props: ["editVisibles","employeeData"],
  watch: {
    editVisibles(val) {
      this.editVisible = val;
    },
    employeeData(val){
        this.employeeList = val;

      if(this.img1.length===0&&this.employeeList.pictureUrl){
              this.img1.push({url:this.employeeList.pictureUrl}); 
        }
      if(this.img2.length===0&&this.employeeList.resumeUrl){
              this.img2.push({url:this.employeeList.resumeUrl});
              this.hideUpload = 1; 
        }
      if(this.img3.length===0&&this.employeeList.diplomaUrl){
              this.img3.push({url:this.employeeList.diplomaUrl});
              this.hideUpload = 1; 
        }
      if(this.img4.length===0&&this.employeeList.idCardUrl){
              this.img4.push({url:this.employeeList.idCardUrl}); 
              this.hideUpload = 1;
        }
    }

  },
  methods: {
    createClose() {
      this.$confirm("您确认要关闭吗？")
        .then(_ => {
          this.editVisible = false;
          this.$emit("createCloseE", this.editVisible);
        })
        .catch(_ => {});
    },
    createClosing() {
      this.$confirm("您确认要关闭吗？")
        .then(_ => {
          this.editVisible = false;
          this.$emit("createClosingE", this.editVisible);
        })
        .catch(_ => {});
    },
    createSave() {},

    //修改员工信息
    createSave() {
      editEmployeeInfo(this.employeeList).then(res => {
        if (res.code === 200) {
          throttleTipPop(this, "success", "编辑员工信息成功！", 2000);
          this.editVisible = false;
          this.$emit("editStaffManageMent1", this.editVisible);
        }
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }
      return isJPG && isLt2M;
    },
    //上传方的照片
    handleAvatarSuccess(file) {
      this.imageUrl = file.data.domain + file.data.filePath;
      if (this.imageUrl) {
        this.$message.success("上传头像成功!");
      }
      
      this.employeeList.pictureUrl = this.imageUrl;
      this.showIndex1 = 0;
    },
    beforeAvatarUpload1(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }
      return isJPG && isLt2M;
    },
    //上传圆的照片
    handleAvatarSuccess1(file) {
      this.imageUrl1 = file.data.domain + file.data.filePath;
      if (this.imageUrl) {
        this.$message.success("上传头像成功!");
      }
      
      this.employeeList.pictureUrl = this.imageUrl;
      this.showIndex = 0;
    },
    beforeAvatarUpload2(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png"
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG&&!isPNG) {
        this.$message.error("上传图片只能是 JPG 或 PNG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
        return false;
      }
      return (isJPG || isPNG) && isLt2M;
    },
    //上传扫描件
    handleAvatarSuccess2(file) {
      if (this.imageUrl2) {
        this.$message.success("上传简历扫描件成功!");
      }
      this.imageUrl2 = file.data.domain + file.data.filePath;
      this.employeeList.resumeUrl = this.imageUrl2;
    },
    //判断是否隐藏上传按钮
    uploadChange2(file,fileList){
         this.hideUpload = fileList.length >= this.limitCount;
    },
    handleRemove2(file,fileList){
        this.hideUpload = fileList.length >= this.limitCount;
        this.imageUrl2 = '';
        this.employeeList.resumeUrl = '';
        
    },
    //预览扫描件
     handlePictureCardPreview2(file) {
        this.dialogImageUrl1 = file.url;
        this.dialogVisible1 = true;
      },
    //上传毕业证
    beforeAvatarUpload3(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG&&!isPNG) {
        this.$message.error("上传图片只能是 JPG 或 PNG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
        return false;
      }
      return (isJPG || isPNG) && isLt2M;
    },
    //上传毕业证
    handleAvatarSuccess3(file) {
      if (this.imageUrl3) {
        this.$message.success("上传毕业证成功!");
      }
      this.imageUrl3 = file.data.domain + file.data.filePath;
      this.employeeList.diplomaUrl = this.imageUrl3;
    },
    //判断是否隐藏上传按钮
    uploadChange3(file,fileList){
         this.hideUpload1 = fileList.length >= this.limitCount;
    },
    handleRemove3(file,fileList){
        this.hideUpload1 = fileList.length >= this.limitCount;
        this.imageUrl3 = '';
        this.employeeList.diplomaUrl = '';
    },
     handlePictureCardPreview3(file) {
        this.dialogImageUrl2 = file.url;
        this.dialogVisible2 = true;
      },
    //上传毕业证
    beforeAvatarUpload4(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG&&!isPNG) {
        this.$message.error("上传图片只能是 JPG 或 PNG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
        return false;
      }
      return (isJPG || isPNG) && isLt2M;
    },
    //上传身份证复印件
    handleAvatarSuccess4(file) {
      if (this.imageUrl4) {
        this.$message.success("上传身份证复印件成功!");
      }
      this.imageUrl4 = file.data.domain + file.data.filePath;
      this.employeeList.idCardUrl  = this.imageUrl4;
    },
    //判断是否隐藏上传按钮
    uploadChange4(file,fileList){
         this.hideUpload2 = fileList.length >= this.limitCount;
    },
    handleRemove4(file,fileList){
        this.hideUpload2 = fileList.length >= this.limitCount;
        this.imageUrl4 = '';
        this.employeeList.idCardUrl = '';
    },
     handlePictureCardPreview4(file) {
        this.dialogImageUrl3 = file.url;
        this.dialogVisible3 = true;
      },
    
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";

.hide .el-upload--picture-card {
    display: none !important;
}
/deep/ .el-upload-list--picture-card .el-upload-list__item{
    width:100% !important;
    height: 100% !important;
}

.search-wrapper {
  padding: 20px;
  padding-bottom: 10px;
  border: 1px solid rgb(215, 224, 241);
  background: #fff;
  .title {
    margin-left: -20px;
    font-size: 16px;
    color: 3333;
    padding-left: 10px;
    line-height: 1.4;
    border-left: 4px solid $themeColor;
    margin-bottom: 10px;
  }
  .title1 {
    margin-left: -20px;
    font-size: 14px;
    color: 3333;
    padding-left: 10px;
    line-height: 1.4;
    border-left: 4px solid $themeColor;
    margin-bottom: 10px;
  }
}
//上传央视
/deep/ .el-upload {
  border: 0 !important;
  width: 100px !important;
  height:100px !important;
  line-height: 100px;
  .el-upload--picture-card i {
    font-size: 40px !important;
    color: #8c939d !important;
    }
}
.avatar-uploader {
  display: inline-block;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100px;
  height: 100px;
  margin-right: 44px;
}
.avatar-uploader-icon {
  font-size: 40px;
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
//上传央视
.avatar-uploader1 {
  display: inline-block;
  border: 1px solid #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100px;
  height: 100px;
}
.familyMessage {
  width: 92%;
  margin: 0 auto;
  .message {
    width: 100%;
    background: rgba(245, 248, 252, 1);
    border: 1px solid rgba(214, 222, 239, 1);
    text-align: center;
    height: 30px;
    line-height: 30px;
  }
  .message1 {
    width: 100%;
    background: rgba(245, 248, 252, 1);
    border: 1px solid rgba(214, 222, 239, 1);
    text-align: center;
    height: 30px;
    line-height: 30px;
    border-top: 0;
  }
  .name {
    width: 15%;
    display: inline-block;
    background: rgba(245, 248, 252, 1);
    border: 1px solid rgba(214, 222, 239, 1);
    border-top: 0;
    height: 31px;
    line-height: 31px;
    text-align: center;
  }
  .nameMessage {
    width: 15%;
    display: inline-block;
    border: 1px solid rgba(214, 222, 239, 1);
    border-top: 0;
    border-left: 0;
    height: 31px;
    line-height: 31px;
    text-align: center;
  }
  .relationship {
    width: 15%;
    display: inline-block;
    background: rgba(245, 248, 252, 1);
    border: 1px solid rgba(214, 222, 239, 1);
    border-top: 0;
    border-left: 0;
    height: 31px;
    line-height: 31px;
    text-align: center;
  }
  .relationshipMessage {
    width: 15%;
    display: inline-block;
    border: 1px solid rgba(214, 222, 239, 1);
    border-top: 0;
    border-left: 0;
    height: 31px;
    line-height: 31px;
    text-align: center;
  }
  .tel {
    width: 18%;
    display: inline-block;
    background: rgba(245, 248, 252, 1);
    border: 1px solid rgba(214, 222, 239, 1);
    border-top: 0;
    border-left: 0;
    height: 31px;
    line-height: 31px;
    text-align: center;
  }
  .telMessage {
    width: 22%;
    display: inline-block;
    border: 1px solid rgba(214, 222, 239, 1);
    border-top: 0;
    border-left: 0;
    height: 31px;
    line-height: 31px;
    text-align: center;
  }
}
.uploadList {
  margin-top: 20px;
  overflow: hidden;
        .uploadMessage{
            float: left;
            margin-right: 40px;
            .uploadTitle {
                float: left;
                margin-left: 34px;
            }
        }
        .uploadMessage:nth-of-type(3){
            margin-right: 0;
        }
}
.avatar1 {
  width: 100px;
  height: 100px;
  display: block;
}
.mcard0 {
  border: 1px solid #d7e0f1;
  margin-top: 20px;
}
/deep/ .el-dialog__headerbtn {
  top: 10px !important;
}
/deep/ .el-input--mini .el-input__inner {
  font-size: 14px;
  border: 0 !important;
  
}
</style>