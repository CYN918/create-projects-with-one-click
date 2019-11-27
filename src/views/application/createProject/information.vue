<template>
  <div class="Fill_in">
    <div>
      <ul class="list">
        <li class="item">
          <div class="word_line">
            <img :src="val.coverImg" alt />
            <div class="tip_triangle">
              <i class="iconfont icon-pc" v-if="val.type == 1"></i>
              <i class="iconfont icon-shouji" v-if="val.type == 2"></i>
              <i class="iconfont icon-h" v-if="val.type == 3"></i>
            </div>
          </div>
          <div class="proName">{{val.templateName}}</div>
          <div class="line_div"></div>
          <div class="word_one">
            <!-- <h4 class="title1">项目介绍</h4> -->
            <span class="t1" :title="val.introduction">{{val.introduction}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="message" v-if="show">
      <span :class="type == 0 ?'select_span':''" @click="nextStep(0)">基础设置</span>
      <span :class="type == 1 ?'select_span':''" @click="nextStep(1)">封面图片</span>

      <div v-if="type == 0 ">
        <div class="search-wrapper">
          <h4 class="title">基础设置</h4>
          <el-form
            label-width="150px"
            class="demo-ruleForm"
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
          >
            <el-form-item label="项目标题：" prop="projectName">
              <el-input
                v-model="ruleForm.projectName"
                class="width-max"
                size="medium"
                placeholder="请输入标题"
              ></el-input>
            </el-form-item>
            <el-form-item label="起止时间：" required>
              <el-col :span="5">
                <el-form-item prop="startTime">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期："
                    v-model="ruleForm.startTime"
                    :picker-options="pickerOptionsStart"
                    valueFormat="yyyy-MM-dd HH:mm:ss"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="1">-</el-col>
              <el-col :span="5">
                <el-form-item prop="endTime">
                  <el-date-picker
                    type="date"
                    placeholder="选择时间"
                    :picker-options="pickerOptionsEnd"
                    v-model="ruleForm.endTime"
                    style="width: 100%;"
                    valueFormat="yyyy-MM-dd HH:mm:ss"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="选择客户：" prop="customerId">
              <el-select v-model="ruleForm.customerId" placeholder="请选择" size="medium">
                <el-option
                  v-for="item in options"
                  :key="item.customerId"
                  :label="item.customerName"
                  :value="item.customerId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="货币单位：" prop="currencyUnit">
              <el-select v-model="ruleForm.currencyUnit" placeholder="请选择" @change="handleSelect">
                <el-option
                  v-for="item in optionsArr"
                  :key="item.dictionaryId"
                  :label="item.dictionaryName"
                  :value="item.dictionaryId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="兑换比例：" prop="exchangeRate">
              <el-input
                :disabled="canIenter"
                style="width: 217px"
                v-model="ruleForm.exchangeRate"
                class="width-max"
                size="medium"
                placeholder="请输入内容"
              ></el-input>
              <span style="color:red;text-align: left;padding-left: 13px" v-if="typeGoods=='元'">元</span>
              <span style="color:red;text-align: left;padding-left: 13px" v-else>{{typeGoods}}/元</span>
              <p
                style="color: #606266; font-size: 13px"
              >(兑换比例：表示多少货币可以兑换一元人民币。如10积分/元，表示10积分可以兑换1元人民币)</p>
            </el-form-item>
            <el-form-item label="客服电话：" prop="telNumber">
              <el-input
                v-model="ruleForm.telNumber"
                class="width-max"
                size="medium"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item label="配送地址：" prop="address" class="address">
              <treeselect
                :multiple="true"
                :flat="true"
                :limit="3"
                :default-expand-level="1"
                v-model="ruleForm.address"
                style="width: 400px;"
                :options="addressArr"
                placeholder="请选择地址"
                :clearable="true"
              />
            </el-form-item>
            <el-form-item label="排序：" prop="sortOrder">
              <el-input
                type="number"
                v-model="ruleForm.sortOrder"
                class="width-max"
                size="medium"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <!--<el-form-item label="项目访问地址：" prop="projectHost">-->
            <!--<el-input-->
            <!--v-model="ruleForm.projectHost"-->
            <!--class="width-max"-->
            <!--size="medium"-->
            <!--placeholder="请输入内容"-->
            <!--&gt;</el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="介绍：" prop="introduction">
              <el-input
                type="textarea"
                v-model="ruleForm.introduction"
                class="width-max"
                size="medium"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="footer">
            <el-button type="primary" size="small" @click="nextStep(1)">下一步</el-button>
          </div>
        </div>
      </div>
      <div v-if="type == 1 " class="creatd">
        <div class="search-wrapper">
          <h4 class="title">基础设置</h4>
          <el-form label-width="150px" class="demo-ruleForm">
            <el-form-item label="编辑封面图标：" prop="name">
              <el-upload
                class="avatar-uploader"
                :action="action"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <img v-if="ruleForm.projectCoverImg" :src="ruleForm.projectCoverImg" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
          <div class="footer">
            <el-button type="danger" size="small" @click="type--">上一步</el-button>
            <el-button type="primary" size="small" @click="nextStep(2)">下一步</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="message finish_img" v-if="!show">
      <img src="@/common/images/application/finish.png" alt />
      <div>
        恭喜您！您的积分商城项目
        <span class="color_span">基础部分</span>
        已经搭建完成
      </div>
      <div>
        前往
        <span class="color_span">管理项目</span>完成更多个性化自定义设置
      </div>
      <el-button type="primary" @click="determine" size="small">完 成</el-button>
    </div>
  </div>
</template>

<script>
import {
  newProject,
  getfindByid,
  getNameData,
  getProjectById,
  projectupdate
} from "@/api/application/index";
import { getAllcustomer, getprovince, getcity } from "@/api/customer/index";
import { getTreecatagory } from "@/api/product/index";
import { findallcity } from "@/api/application/index";
import { getGoods } from "@/api/product/index";
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  props: ["id"],
  data() {
    return {
      pickerOptionsStart: {
        disabledDate: time => {
          return time.getTime() < new Date(new Date().toLocaleDateString()).getTime();
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          if (this.ruleForm.startTime) {
            return (
              time.getTime() < new Date(this.ruleForm.startTime).getTime()
            );
          }
        }
      },
      canIenter: true,
      typeGoods: "元", //货贝种类
      val: {}, // 详情对象
      show: true, //控制右边内容
      action: "",
      type: 0,
      optionsArr: [],
      addressArr: [], //地址
      ruleForm: {
        exchangeRate: 1,
        projectName: "", //项目标题
        startTime: "", // 开始时间
        endTime: "", // 结束时间
        customerId: "", //客户id
        projectCoverImg: "", // 封面图标
        catId: null, //商品分类id
        projectHost: "", //项目访问地址
        loginMode: "", //登录方式
        currencyUnit: "", //货币单位
        telNumber: "", //客服号码
        address: [], // 配送地址
        sortOrder: "", // 排序
        introduction: "", // 介绍
        currentPage: 1,
        size: 10,
        total: 0
      },
      rules: {
        projectName: [
          { required: true, message: "请输入项目标题", trigger: "blur" }
        ],
        customerId: [
          { required: true, message: "请选择客户", trigger: "change" }
        ],
        loginMode: [
          { required: true, message: "请选择登录方式", trigger: "change" }
        ],
        currencyUnit: [
          { required: true, message: "请选择货币单位", trigger: "change" }
        ],
        exchangeRate: [
          { required: true, message: "请输入兑换比例", trigger: "change" }
        ],
        startTime: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        endTime: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ]
      },
      checkedArr: [],
      options: [],
      tableData: [],
      categoryList: []
    };
  },
  methods: {
    //获取货贝种类
    handleSelect(val) {
      this.typeGoods = val;
      this.optionsArr.forEach(item => {
        if (item.dictionaryId === val) {
          this.typeGoods = item.dictionaryName;
        }
      });
      if (val == this.optionsArr[0].dictionaryId) {
        this.canIenter = true;
        this.ruleForm.exchangeRate = 1
      } else {
        this.canIenter = false;
        this.ruleForm.exchangeRate = "";
      }
    },

    // 复选框点击事件
    choose(selection, row) {
      this.checkedfunc(row);
    },
    //多选
    chooseAll(selection) {
      if (selection.length) {
        selection.forEach(data => {
          this.checkedArr.push(data);
        });
      } else {
        this.tableData.forEach(item => {
          this.checkedfunc(item);
        });
      }
    },
    // 记忆选择的数据
    checkedfunc(data) {
      let index = this.checkedArr.indexOf(data);
      if (index != -1) {
        this.checkedArr.splice(index, 1);
      } else {
        this.checkedArr.push(data);
      }
    },
    // 默认选中
    checkedDefault(arr) {
      let check = this.checkedArr;
      for (var i = 0; i < check.length; i++) {
        for (var j = 0; j < arr.length; j++) {
          if (check[i].goodsId == arr[j].goodsId) {
            this.$refs.table.toggleRowSelection(this.tableData[j], true);
          }
        }
      }
    },
    //查询商品列表
    _getGoods(val) {
      if (val) {
        this.ruleForm.currentPage = 1;
      }
      let obj = {
        current_page: this.ruleForm.currentPage,
        page_size: this.ruleForm.size,
        search_type: 4,
        keyword: this.ruleForm.keyword,
        catId: this.ruleForm.catId
      };
      getGoods(obj).then(res => {
        this.tableData = res.data.pageList ? res.data.pageList : [];
        this.ruleForm.total = res.data.count;
        this.$nextTick(() => {
          this.checkedDefault(this.tableData);
        });
      });
    },
    // 查询客户
    _getAllcustomer() {
      let obj = {};
      obj.pageNum = 1;
      obj.pageSize = 0;
      getAllcustomer(obj).then(res => {
        this.options = res.data.list;
      });
    },
    async nextStep(val) {
      if (val == 1) {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.type = val;
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else if (val == 2) {
        let objData = this.ruleForm;
        objData.goodsIds = [];
        objData.applyId = this.applyId;
        objData.sortOrder ? objData.sortOrder : (objData.sortOrder = 1);
        objData.templateId = this.$parent.templateId;
        let str = "";
        objData.address = objData.address.join(",");
        this.checkedArr.forEach(item => {
          objData.goodsIds.push(item.goodsId);
        });
        if (this.$route.query.projectId) {
          objData.templateId = this.$parent.templateId;
          try {
            const res = await projectupdate(objData);
            if (res.code == 200) {
              this.$message({
                message: "恭喜你，修改成功",
                type: "success"
              });
              this.$router.push({
                path: "/application/index"
              });
              this.show = false;
            }
          } catch (error) {
            objData.address = objData.address.split(",");
          }
        } else {
          try {
            const res = await newProject(objData);
            if (res.code == 200) {
              this.$message({
                message: "恭喜你，创建成功",
                type: "success"
              });
              this.show = false;
            }
          } catch (error) {
            objData.address = objData.address.split(",");
          }
        }
      } else {
        this.type = val;
      }
    },
    determine() {
      this.$router.go(-1);
    },
    handleAvatarSuccess(res, file) {
      this.ruleForm.projectCoverImg = res.data.domain + res.data.filePath;
    },
    handleSizeChange(val) {
      this.ruleForm.size = val;
      this._getGoods();
    },
    handleCurrentChange(val) {
      this.ruleForm.currentPage = val;
      this._getGoods();
    },
    //获取商品分类
    _getCatagory() {
      let obj = {};
      obj.type = "SELECT";
      obj.id = 0;
      getTreecatagory(obj).then(res => {
        this.transleteData(res.data, this.categoryList);
        this.IterationDelateMenuChildren(this.categoryList);
      });
    },
    transleteData(data, arr) {
      data.forEach(item => {
        // if(!item.parentId){
        //     item.parentId = 0
        //     item.parentName = '所有部门'
        // }
        const msg = {
          id: item.catId,
          label: item.catName,
          value: item.catId,
          children: item.children ? [] : null,
          isLeaf: item.children ? false : true
        };
        if (item.children && item.children.length > 0) {
          this.transleteData(item.children, msg.children);
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
    _getfindByid() {
      getfindByid(this.$parent.templateId).then(res => {
        this.val = res.data;
      });
    },
    _getNameData() {
      let obj = "货币单位";
      getNameData(obj).then(res => {
        this.optionsArr = res.data;
        this.ruleForm.currencyUnit = this.optionsArr[0].dictionaryName;
      });
    },
    //获取省市地址
    async findallcity() {
      const data = await findallcity();
      data.data.forEach(item => {
        item.label = item.regionName;
        item.value = item.id;
        item.children = item.childRegion;
        delete item.childRegion;
        item.children.forEach(val => {
          val.label = val.regionName;
          val.value = val.id;
        });
      });
      const obj = [
        {
          value: 1,
          id: 1,
          label: "全国",
          children: data.data
        }
      ];
      this.addressArr = obj;
    },
    async projectfindinfobyid() {
      const { data } = await getProjectById(this.$route.query.projectId);
      data.address = data.address.split(",");

      const arr = [];
      data.address.forEach(item => {
        arr.push(Number(item));
      });
      data.address = arr;
      this.ruleForm = data;
      console.log(this.ruleForm);
      this.getfindByid(data);
    },
    async getfindByid(val) {
      const data = await getfindByid(val.templateId);
      this.val = data.data;
    }
  },
  created() {
    if (this.$route.query.projectId) {
      this.projectfindinfobyid();
    } else {
      this._getfindByid();
    }
    this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
    this._getAllcustomer();
    // this._getCatagory();
    // this._getGoods();
    this._getNameData();
    this.findallcity();
    this.applyId = this.$route.query.applyId;
  },
  components: {
    Treeselect
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.Fill_in {
  display: flex;
  .message {
    margin-left: 2%;
    width: 70%;
    max-width: 1000px;
    span {
      display: inline-block;
      width: 135px;
      height: 48px;
      text-align: center;
      line-height: 48px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      cursor: pointer;
    }
    .select_span {
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(214, 222, 239, 1);
      position: relative;
      top: 2px;
      border-bottom: none;
      z-index: 10;
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
    border-left: 4px solid #4a99fa;
    margin-bottom: 10px;
  }
  .width-max {
    max-width: 400px;
  }
  .footer {
    text-align: center;
  }
  .avatar {
    width: 300px;
    height: 150px;
  }
}
.mar_top {
  margin-top: 30px;
}
.img_size {
  width: 60px;
  height: 60px;
}
.finish_img {
  text-align: center;
}
.color_span {
  color: #f66d70 !important;
  display: inline !important;
}
.list {
  display: flex;
  flex-wrap: wrap;
}
.item {
  position: relative;
  width: 330px;
  height: 578px;
  background: #ebf4fe;
  border: 1px solid rgba(234, 237, 244, 1);
  border-radius: 6px;
  box-sizing: border-box;
  margin-bottom: 50px;
  margin-right: 45px;
}
.word_line {
  display: flex;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  background: white;
  justify-content: center;
  padding-top: 10px;
  position: relative;
  img {
    width: 289px;
    // height: 137px;
    height: 460px;
  }
}
.word_one {
  background: white;
  margin-left: 10px;
  margin-right: 10px;
}
.word_two {
  display: flex;
  justify-content: space-around;
  background: white;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: -2px;
  padding-top: 2px;
}
.i-div {
  margin-top: 20px;
  .imagecs:hover {
    transform: scale(1.6);
  }
}
.div-i {
  font-size: 10px;
  margin-top: 5px;
  margin-left: -4px;
  margin-bottom: 13px;
}
.imagecss {
  margin-left: 23px;
}
.tt {
  display: flex;
  align-items: center;
  margin-left: 17px;
  margin-top: 10px;
}
.t1 {
  display: inline-block;
  font-size: 14px;
  height: 126px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(96, 98, 102, 1);
  line-height: 24px;
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  height: 46px;
}
.t2 {
  position: absolute;
  top: -13px;
  right: -45px;
  display: inline-block;
  width: 70px;
  transform: rotate(45deg);
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.switch {
  margin-top: 35px;
  margin-left: 41px;
}
.changes {
  margin-top: 58px;
  right: 48px;
  font-size: 13px;
  color: #409eff;
  position: absolute;
}
.changes11 {
  margin-top: 58px;
  right: 48px;
  font-size: 13px;
  position: absolute;
}
.title1 {
  font-size: 16px;
  font-weight: 400;
  padding-left: 16px;
  line-height: 1.4;
  border-left: 4px solid $themeColor;
}
.el-switch__core {
}
.el-switch__label * {
  line-height: 1;
  font-size: 12px;
  display: inline-block;
  margin-top: 36px;
  margin-left: 4px;
}
.line_div {
  margin-left: 26px;
  margin-right: 26px;
  height: 1px;
  border: 1px solid #ebf4fe;
  position: relative;
}
.proName {
  width: 307px;
  height: 31px;
  text-align: center;
  margin-left: 10px;
  margin-right: 10px;
  background: white;
  line-height: 29px;
  font-size: 15px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(69, 69, 69, 1);
  margin-bottom: -2px;
}
.tip_triangle {
  position: absolute;
  width: 0;
  height: 0;
  border-width: 16px;
  border-style: solid;
  border-color: #4c86f4 #4c86f4 transparent transparent;
  right: 10px;
  i {
    position: relative;
    top: -14px;
    font-size: 14px;
    color: white;
  }
}
.line {
  text-align: center;
}
/deep/ .address .el-form-item__content {
  line-height: 25px;
}
</style>
