<template>
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">搜索条件</h4>
            <div class="search-base">
              <el-row>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="应用服务：">
                      <el-col :span="23">
                        <el-select
                          class="el-select-width"
                          v-model="form.auditStatus"
                          placeholder="请选择"
                          @change="_getAgencyexamine(true)"
                        >
                          <el-option label="App" value="0"></el-option>
                          <el-option label="H5" value="1"></el-option>
                          <el-option label="PC" value="2"></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="模板类型：">
                      <el-col :span="23">
                        <el-select
                          class="el-select-width"
                          v-model="form.auditStatus"
                          placeholder="请选择"
                          @change="_getAgencyexamine(true)"
                        >
                          <el-option label="App" value="0"></el-option>
                          <el-option label="H5" value="1"></el-option>
                          <el-option label="PC" value="2"></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="模板名称：">
                      <el-col :span="23">
                        <el-input v-model="form.keywords" clearable placeholder="请输入模板名称"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5" class="btn_right">
                  <el-button type="primary" size="small" @click="search(true)">查询</el-button>
                </el-col>
                <el-col :span="2">
                  <el-button type="primary" icon="el-icon-plus" @click.native="addBoard()">创建模板</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="card">
        <ul class="list">
          <li class="item" v-for="(item, index) in list">
            <div class="word_line_out">
              <div class="word_line">
                <img :src="item.coverImg" alt class="imagecss" />
                <!-- 三角形 -->
                <div class="triangle"></div>
                <i class="iconfont icon-shouji iconfont_style" v-if="item.type=='1'"></i>
                <i class="iconfont icon-pc iconfont_style" v-if="item.type=='2'"></i>
                <i class="iconfont icon-h iconfont_style" v-if="item.type=='3'"></i>
              </div>
            </div>
            <!-- <div class="line_div"></div> -->
            <div class="word_one">
              <div class="fontss">{{item.templateName}}</div>
              <span class="t1">简介 : {{item.introduction}}</span>
            </div>
            <div class="line_div"></div>
            <div class="word_two">
              <div class="i-div" @click="detailService(item.templateId,3)">
                <i>
                  <img src="../../../common/images/service/8.png" alt class="imagecs" />
                </i>
                <div class="div-i">预览</div>
              </div>
              <div class="i-div" @click="addBoard(item.templateId)">
                <i>
                  <img src="../../../common/images/service/11.png" alt class="imagecs" />
                </i>
                <div class="div-i">编辑</div>
              </div>
              <div class="i-div" @click="detailService(item.templateId,2)">
                <i>
                  <img src="../../../common/images/service/9.png" alt class="imagecs" />
                </i>
                <div class="div-i">服务</div>
              </div>
              <div class="i-div" @click="deleteService(item.templateId)">
                <i>
                  <img src="../../../common/images/service/12.png" alt class="imagecs" />
                </i>
                <div class="div-i">删除</div>
              </div>
            </div>
          </li>
        </ul>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="form.current_page"
            :page-sizes="[10, 30, 50, 100]"
            :page-size="form.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="form.total_count"
          ></el-pagination>
        </div>
        <!-- 删除 -->
        <el-dialog title="删除" :visible.sync="dialogDelete" width="40%">
          <el-form :model="form" label-width="100px">
            <el-form-item label="删除原因:" prop="deleteRemark">
              <el-input v-model="deleteRemark" type="textarea"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogDelete = false" size="small">取 消</el-button>
        <el-button type="primary" @click="deleteService(false,5)" size="small">确 定</el-button>
      </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
  import {getBoardList} from "@/api/service";

  export default {
  data() {
    return {
      list: [], //数据源
      form: {
        current_page: 1, //当前页
        page_size: 0, //页容量
        total_count: 0, //总条数
      },
      dialogDelete:false,//删除对话框
      deleteRemark:''//删除原因
    };
  },
  created() {
    this.getList();
  },
  computed: {},
  methods: {
    getList() {
      getBoardList(this.form).then(res => {
        if (res.code == 200) {
          this.list = res.data.list;
          this.form.total_count = res.data.total;
        }
      });
    },
    //点击添加和编辑
    addBoard(data) {
      console.log(data, 777);

      if (data) {
        console.log(data, 666);

        this.$router.push({ name: "AddBoard", query: { templateId: data } });
      } else {
        this.$router.push({ name: "AddBoard" });
      }
    },
    //删除
    deleteService(){

    },
     //页容量改变
    handleSizeChange(val) {
      this.form.page_size = val;
      this.getList();
    },
    //当前页改变
    handleCurrentChange(val) {
      this.form.current_page = val;
      this.getList();
    },
  },
  components: {}
};
</script>
<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.goods-fitter {
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
}
.goods-list-wrapper {
  margin-top: 20px;
}
.el-transfer-panel__header {
  background: $themeColor;
  color: #fff;
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
.newAdd {
  position: absolute;
  right: 50px;
  top: 38px;
}
span,
label,
i,
div {
  line-height: 1;
}
ul {
  list-style: none;
}
.card {
  margin-left: 30px;
  margin-top: 30px;
}
.list {
  display: flex;
  flex-wrap: wrap;
}
.item {
  position: relative;
  width: 310px;
  height: 700px;
  background: #ebf4fe;
  border: 1px solid rgba(234, 237, 244, 1);
  border-radius: 6px;
  box-sizing: border-box;
  margin-bottom: 50px;
  margin-right: 30px;
}
.word_line_out {
  background: #fff;
  margin: 10px 10px 0 10px;
}
.word_line {
  display: flex;
  height: 510px;
  padding: 12px;
  background: white;
  position: relative;
}
.word_one {
  background: white;
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
  padding-bottom: 15px
}
.word_two {
  display: flex;
  justify-content: space-around;
  background: white;
  margin-left: 10px;
  margin-right: 10px;
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
  width: 100%;
}
.triangle {
  //右上角三角形
  width: 0;
  height: 0;
  border-top: 40px solid #109cfa;
  border-left: 40px solid transparent;
  position: absolute;
  top: 12px;
  right: 12px;
}
.iconfont_style {
  color: #ffffff;
  position: absolute;
  top: 17px;
  right: 15px;
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
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(96, 98, 102, 1);
  line-height: 2;

  //   width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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
  padding-top: 5px;
  font-size: 16px;
  font-weight: 400;
  color: 3333;
  padding-left: 10px;
  line-height: 1.4;
  border-left: 4px solid $themeColor;
  margin-bottom: 10px;
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
  margin-left: 30px;
  margin-right: 30px;
  height: 1px;
  border: 1px solid #ebf4fe;
}
.fontss {
  font-weight: bold;
  padding-top: 10px;
  padding-bottom: 10px;
}
.content-wrapper {
  border: 1px solid rgb(215, 224, 241);
  background: #fff;
}
</style>
