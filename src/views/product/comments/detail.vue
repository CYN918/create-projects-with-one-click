<template>
  <div class="margin">
    <el-form ref="form" :model="form" label-width="260px" size="small">
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <el-page-header @back="back" content="用户评论>回复"></el-page-header>
          </div>
        </div>
      </div>
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper">
            <h4 class="title">查看详情</h4>
            <br />
            <el-form-item label="用户名:" prop="content">
              <span>{{form.name}}</span>
            </el-form-item>
            <el-form-item label="评论等级:" prop="content">
              <span>{{form.commentRank == 0 ?'好评':form.commentRank == 1 ?'中评':'差评'}}</span>
            </el-form-item>
            <el-form-item label="评论内容:" prop="content">
              <span>{{form.content}}</span>
            </el-form-item>
            <el-form-item label="Email:" prop="email">
              <span>{{form.email}}</span>
            </el-form-item>
            <el-form-item label="评论时间:" prop="date1">
              <span>{{form.time}}</span>
            </el-form-item>
            <el-form-item label="图片:" prop="date1">
              <div>
                <img :src="item.imgUrl" alt="" v-for="item in form.imgArr" :key="item.imgUrl" class="img_size">
              </div>
              <!-- <span>{{form.time}}</span> -->
            </el-form-item>
            <div class="line"></div>
            <el-form-item label="回复内容:" prop="content">
              <el-input
                type="textarea"
                style="width:400px"
                :rows="5"
                placeholder="请输入回复内容"
                v-model="form.sysComment"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮件通知:" prop="resource">
              <el-radio v-model="form.radio1" label="1">是</el-radio>
              <el-radio v-model="form.radio1" label="2">否</el-radio>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="resetForm" size="small">重置</el-button>
              <el-button type="primary" @click="submitForm('form')" size="small">确定</el-button>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import {
  checkComments,
  modifyComments,
  addComments,
  showComments
} from "@/api/product/index";

export default {
  data() {
    return {
      value1: "",
      show: false, //false 新增 true 编辑
      form: {
        name: "", //用户名称
        commentId: "", //评论ID
        goods: "", //商品详情
        time: "", //评论时间
        radio1: "2", // 是否邮件通知
        sysComment: "", //回复内容
        content: "", //评论内容
        commentRank: "", //评论等级
        commentType: "", //评论类型
        ipAddress: "", //评论ip
        email: "", //email
        showstate: "1", //是否允许显示
        imgArr:[]
      }
    };
  },
  created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      checkComments(this.id).then(res => {
        res.data.sysComment.length ? (this.show = true) : (this.show = false);
        this.form.name = res.data.userName;
        this.form.commentId = res.data.commentId;
        this.form.time = res.data.creatTime;
        this.form.goods = res.data.goodsId;
        this.form.content = res.data.content;
        res.data.sysComment.length?this.form.sysComment = res.data.sysComment[0].content:''
        this.form.commentRank = res.data.commentRank;
        this.form.commentType = res.data.commentType;
        this.form.ipAddress = res.data.ipAddress;
        this.form.userName = res.data.commentRank;
        this.form.email = res.data.email;
        this.form.status = res.data.status;
        this.form.imgArr = res.data.galleryList
      });
    }
  },
  computed: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //新增评论
          if (!this.show) {
            let obj = {};
            obj.commentRank = this.form.commentRank;
            obj.commentType = 1;
            obj.content = this.form.sysComment;
            obj.goodsId = this.form.goods;
            obj.ipAddress = this.form.ipAddress;
            obj.isEmail = this.form.radio1;
            obj.parentId = this.form.commentId;
            addComments(obj).then(res => {
              if(res.code == 200){
                this.$message({
                  message: res.message,
                  type: 'success'
                });
                this.$router.push({ name: "ProductComments" });
              }
            });
          } else {
            let obj = {};
            obj.commentId = this.form.commentId,
            obj.content = this.form.sysComment,
            obj.isEmail = this.form.radio1,
            modifyComments(obj).then(res => {
              if (res.code == 200) {
                this.$message({
                  message: res.message,
                  type: 'success'
                });
                this.$router.push({ name: "ProductComments" });
              }
            });
          }
        }
      });
    },
    resetForm() {
      this.form.sysComment = "";
    }
  },
  components: {}
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
    max-width: 130px;
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
    margin-left: 20%;
  }
}
.img_size{
  width: 60px;
  height: 60px;
}
.line{
  width: 60%;
  border: 1px dashed #cccccc;
  margin-bottom: 20px;
}
</style>
