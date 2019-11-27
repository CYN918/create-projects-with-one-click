<template>
  <div class="gathering">
    <el-dialog width="50%" :visible.sync="detailVisible" :before-close="createClosing">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">员工管理-查看</h4>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mcard0">
        <div class="mcard">
          <el-form
            ref="infoForm"
            :model="detailList"
            :rules="rules"
            label-width="110px"
            size="small"
          >
            <el-row>
              <el-form-item label="照片：">
                <img class="picture1" v-if="detailList.headType===1" :src="detailList.pictureUrl" />
                <img class="picture2" v-if="detailList.headType===2" :src="detailList.pictureUrl" />
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="员工姓名：" prop="employeeName">
                    <el-input v-model="detailList.employeeName" placeholder="请输入员工姓名"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="员工编号：">
                    <el-input v-model="detailList.employeeSn" placeholder="请输入员工编号"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="职       称：">
                    <el-input v-model="detailList.position" placeholder="请输入职称"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="部       门：">
                    <el-input v-model="detailList.payAmount" placeholder="请输入部门"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="公司手机号：">
                    <el-input v-model="detailList.companyTel" placeholder="请输入公司手机号"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="个人手机号：">
                    <el-input v-model="detailList.personalTel" placeholder="请输入办公电话"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="办公电话：">
                    <el-input v-model="detailList.officePhone" placeholder="请输入办公电话"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="微 信 号：">
                    <el-input v-model="detailList.wechat" placeholder="请输入微信号"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="Q Q 号：">
                    <el-input v-model="detailList.qq" placeholder="请输入QQ号"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="电子邮箱：">
                    <el-input v-model="detailList.email" placeholder="请输入电子邮箱"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="开 户 行：">
                    <el-input v-model="detailList.bankOpeningName" placeholder="请输入开户行"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="银行账号：">
                    <el-input v-model="detailList.bankAccount" placeholder="请输入银行账号"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="mcard0">
        <div class="mcard">
          <el-form
            ref="infoForm"
            :model="detailList"
            :rules="rules"
            label-width="110px"
            size="small"
          >
            <el-row>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="性 别：" prop="sex">
                    <el-select v-model="detailList.sex" style="width:100%;" placeholder="请选择性别">
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
                      v-model="detailList.birthday"
                      valueFormat="yyyy-MM-dd HH:mm:ss"
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
                    <el-input v-model="detailList.nation" placeholder="请输入民族"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="籍 贯：">
                    <el-input v-model="detailList.origin" placeholder="请输入籍贯"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="是否已婚：" prop="maritalStatus">
                    <el-select
                      v-model="detailList.maritalStatus"
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
                    <el-input v-model="detailList.graduatedFrom" placeholder="请输入毕业院校"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="身份证号码：">
                    <el-input v-model="detailList.idCard" placeholder="请输入身份证号码"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="学       历：">
                    <el-input v-model="detailList.educationalLevel" placeholder="请输入学历"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="23">
                <el-form-item label="身份证地址：">
                  <el-input v-model="detailList.idAddress" placeholder="请输入身份证地址"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="23">
                <el-form-item label="现居住地址：">
                  <el-input v-model="detailList.address" placeholder="请输入现居住地址"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="mcard0">
        <div class="mcard">
          <el-form
            ref="infoForm"
            :model="detailList"
            :rules="rules"
            label-width="110px"
            size="small"
          >
            <el-row>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="入职日期：" prop="hireTime">
                    <el-date-picker
                      style="width:100%;"
                      v-model="detailList.hireTime"
                      valueFormat="yyyy-MM-dd HH:mm:ss"
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
                      v-model="detailList.turnPositiveTime"
                      valueFormat="yyyy-MM-dd HH:mm:ss"
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
                    <el-input v-model.number="detailList.workingAge" placeholder="请输入入职前工龄"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="离职日期：">
                    <el-date-picker
                      style="width:100%;"
                      v-model="detailList.leaveTime"
                      valueFormat="yyyy-MM-dd HH:mm:ss"
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
                      v-model="detailList.contractTimeStart"
                      valueFormat="yyyy-MM-dd HH:mm:ss"
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
                      v-model="detailList.contractTimeEnd"
                      valueFormat="yyyy-MM-dd HH:mm:ss"
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
                    <el-input v-model="detailList.companyName" placeholder="请输入公司名称"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="22">
                  <el-form-item label="员工类型：" prop="employeeType">
                    <el-select
                      v-model="detailList.employeeType"
                      placeholder="请选择员工类型"
                      style="width:100%;"
                    >
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
                    v-model="detailList.workExperience"
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
          <el-form
            ref="infoForm"
            :model="detailList"
            :rules="rules"
            label-width="110px"
            size="small"
          >
            <div class="familyMessage">
              <div class="message">
                <span>家庭成员</span>
              </div>
              <div class="messageContent" v-for="(item,index) in detailList.familyInfos" :key="index">
                <div class="name">
                  <span>姓名</span>
                </div>
                <div class="nameMessage">
                  <el-input v-model="item.name" size="mini"></el-input>
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
              <div class="messageContent" v-if="detailList.urgentInfo">
                <div class="name">
                  <span>姓名</span>
                </div>
                <div class="nameMessage">
                  <el-input v-model="detailList.urgentInfo.name" size="mini"></el-input>
                </div>
                <div class="relationship">
                  <span>关系</span>
                </div>
                <div class="relationshipMessage">
                  <el-input v-model="detailList.urgentInfo.relation" size="mini"></el-input>
                </div>
                <div class="tel">
                  <span>联系电话</span>
                </div>
                <div class="telMessage">
                  <el-input v-model="detailList.urgentInfo.tel" size="mini"></el-input>
                </div>
              </div>
            </div>

            <div class="uploadList">
              <div class="uploadMessage">
                <div class="uploadTitle">
                  <span>简历扫描件：</span>
                </div>
                <div
                  class="imgBox"
                  v-if="detailList.resumeUrl"
                  @mouseenter="enterIn1"
                  @mouseleave="mouseOut1"
                >
                  <img :src="detailList.resumeUrl" alt />
                  <div class="blackBox" :class="showIndex1===1?'show':''">
                    <i class="el-icon-zoom-in" @click="pictureCardPreview1"></i>
                  </div>
                </div>
                <span v-if="!detailList.resumeUrl">暂无简历扫描件</span>
                <el-dialog :visible.sync="dialogVisible1" append-to-body>
                  <img width="100%" :src="dialogImageUrl1" alt />
                </el-dialog>
              </div>
              <div class="uploadMessage">
                <div class="uploadTitle">
                  <span>毕业证书：</span>
                </div>
                <div
                  class="imgBox"
                  v-if="detailList.diplomaUrl"
                  @mouseenter="enterIn2"
                  @mouseleave="mouseOut2"
                >
                  <img :src="detailList.diplomaUrl" alt />
                  <div class="blackBox" :class="showIndex2===1?'show':''">
                    <i class="el-icon-zoom-in" @click="pictureCardPreview2"></i>
                  </div>
                </div>
                <span v-if="!detailList.diplomaUrl">暂无毕业证复印件</span>
                <el-dialog :visible.sync="dialogVisible2" append-to-body>
                  <img width="100%" :src="dialogImageUrl2" alt />
                </el-dialog>
              </div>
              <div class="uploadMessage">
                <div class="uploadTitle">
                  <span>身份证复印件：</span>
                </div>
                <div
                  class="imgBox"
                  v-if="detailList.idCardUrl"
                  @mouseenter="enterIn3"
                  @mouseleave="mouseOut3"
                >
                  <img :src="detailList.idCardUrl" alt />
                  <div class="blackBox" :class="showIndex3===1?'show':''">
                    <i class="el-icon-zoom-in" @click="pictureCardPreview3"></i>
                  </div>
                </div>
                <span v-if="!detailList.idCardUrl">暂无毕业证复印件</span>
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
import { throttleTipPop } from "@/utils/functions.js";
export default {
  data() {
    return {
      hideUpload: false, //隐藏上传按钮标识
      hideUpload1: false, //隐藏上传按钮标识
      hideUpload2: false, //隐藏上传按钮标识
      detailList: {},
      detailVisible:false,
      limitCount: 1,
      imageUrl: "", //方的照片
      imageUrl1: "", //圆的照片
      imageUrl2: "", //简历图片
      imageUrl3: "", //毕业证图片
      imageUrl4: "", //身份证复印件
      img1: [],
      img2: [],
      img3: [],
      img4: [],
      showIndex: 1,
      showIndex1: "",
      showIndex2: "",
      showIndex3: "",
      dialogVisible1: false, //简历预览
      dialogImageUrl1: "",
      dialogVisible2: false, //毕业证预览
      dialogImageUrl2: "",
      dialogVisible3: false, //身份证复印件预览
      dialogImageUrl3: "",
      imgArr: [],
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
  props: ["detailVisibles", "detailData"],
  watch: {
    detailVisibles(val) {
      this.detailVisible = val;
    },
    detailData(val) {
      this.detailList = val;
    }
  },
  methods: {
    createClose() {
      this.$confirm("您确认要关闭吗？")
        .then(_ => {
          this.detailVisible = false;
          this.$emit("createCloseD", this.detailVisible);
        })
        .catch(_ => {});
    },
    createClosing() {
      this.$confirm("您确认要关闭吗？")
        .then(_ => {
          this.detailVisible = false;
          this.$emit("createClosingD", this.detailVisible);
        })
        .catch(_ => {});
    },
    createSave() {},

    //新增收款
    createSave() {
      savePayment(this.form).then(res => {
        if (res.code === 200) {
          throttleTipPop(this, "success", "新增收款成功！", 2000);
          this.detailVisible = false;
          this.$emit("addStaffManageMent1", this.detailVisible);
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
      if (this.imageUrl) {
        this.$message.success("上传头像成功!");
      }
      this.imageUrl = file.data.domain + file.data.filePath;
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
      if (this.imageUrl) {
        this.$message.success("上传头像成功!");
      }
      this.imageUrl1 = file.data.domain + file.data.filePath;
      this.showIndex = 0;
    },
    beforeAvatarUpload2(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
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
    },
    //判断是否隐藏上传按钮
    uploadChange2(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
    },
    handleRemove2(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
      this.imageUrl2 = "";
      console.log(this.imageUrl2);
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

      if (!isJPG && !isPNG) {
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
    },
    //判断是否隐藏上传按钮
    uploadChange3(file, fileList) {
      this.hideUpload1 = fileList.length >= this.limitCount;
    },
    handleRemove3(file, fileList) {
      this.hideUpload1 = fileList.length >= this.limitCount;
      this.imageUrl3 = "";
      console.log(this.imageUrl3);
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

      if (!isJPG && !isPNG) {
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
    },
    //判断是否隐藏上传按钮
    uploadChange4(file, fileList) {
      this.hideUpload2 = fileList.length >= this.limitCount;
    },
    handleRemove4(file, fileList) {
      this.hideUpload2 = fileList.length >= this.limitCount;
      this.imageUrl4 = "";
      console.log(this.imageUrl4);
    },
    handlePictureCardPreview4(file) {
      this.dialogImageUrl3 = file.url;
      this.dialogVisible3 = true;
    },
    //鼠标划入
    enterIn1() {
      this.showIndex1 = 1;
    },
    //鼠标画出
    mouseOut1() {
      this.showIndex1 = 0;
    },
    pictureCardPreview1() {
      this.dialogImageUrl1 = this.detailList.resumeUrl;
      this.dialogVisible1 = true;
    },
    //鼠标划入
    enterIn2() {
      this.showIndex2 = 1;
    },
    //鼠标画出
    mouseOut2() {
      this.showIndex2 = 0;
    },
    pictureCardPreview2() {
      this.dialogImageUrl2 = this.detailList.diplomaUrl;
      this.dialogVisible2 = true;
    },
    //鼠标划入
    enterIn3() {
      this.showIndex3 = 1;
    },
    //鼠标画出
    mouseOut3() {
      this.showIndex3 = 0;
    },
    pictureCardPreview3() {
      this.dialogImageUrl3 = this.detailList.idCardUrl;
      this.dialogVisible3 = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";

.hide .el-upload--picture-card {
  display: none !important;
}
/deep/ .el-upload-list--picture-card .el-upload-list__item {
  width: 100% !important;
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
  height: 100px !important;
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
  .uploadMessage {
    float: left;
    margin-right: 40px;
    .uploadTitle {
      float: left;
      margin-left: 34px;
    }
  }
  .uploadMessage:nth-of-type(3) {
    margin-right: 0;
  }
}
.imgBox {
  width: 100px;
  height: 100px;
  border-radius: 6px;
  float: left;
  margin-right: 10px;
  position: relative;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }
  .blackBox {
    transition: all 0.6 0 ease-in !important;
    width: 100px;
    height: 100px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    text-align: center;
    position: absolute;
    top: 0;
    display: none;
    i {
      font-size: 20px;
      color: #fff;
      line-height: 100px;
      cursor: pointer;
    }
  }
  .show {
    animation: show 0.3s;
    display: block;
  }
}
 .picture1{
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
  .picture2{
    width: 100px;
    height: 100px;
    border-radius: 50%;
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