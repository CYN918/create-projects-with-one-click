<template>
  <div class="margin dealerlist">
    <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper">
            <el-page-header @back="back" content="系统公告 > 新增公告"></el-page-header>
          </div>
        </div>
    </div>
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="150px" size="small">
          <div class="search-wrapper">
            <h4 class="title">新增公告</h4>
            <div class="search-base">
              <el-row>
                <el-col :span="10">
                  <el-col>
                    <el-form-item label="公告标题：">
                      <el-col :span="23">
                        <el-input  v-model="contentKeywords" placeholder="请输入公告标题">
                        </el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col> 
                <el-col :span="10">
                  <el-col>
                    <el-form-item label="公告链接：">
                      <el-col :span="23">
                        <el-input  v-model="contentLink" placeholder="请输入公告链接">
                        </el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col> 
                <el-col :span="10">
                  <el-col>
                    <el-form-item label="排序：">
                      <el-col :span="23">
                        <el-input  v-model="contentSort" placeholder="请输入排序">
                        </el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="10">
                  <el-col> 
                    <el-form-item label="公告内容：">
                      <div class="edit_container">
                          <quill-editor 
                              v-model="content" 
                              ref="myQuillEditor" 
                              :options="editorOption" 
                              @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                              @change="onEditorChange($event)">
                          </quill-editor>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
        <el-button type="danger" @click="reset">重 置</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </div>
    </div>
      
  </div>
</template>

<script>
import { 
  announcementSave
} from "@/api/mallapp/announcement/index";
export default {
  data() {
    return {
      contentKeywords: '',
      contentLink: '',
      contentSort: '',
      content: '',
      editorOption: {}
    };
  },
  created() {
    
  },
  computed: {
    editor() {
        return this.$refs.myQuillEditor.quill;
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    onEditorReady(editor) { // 准备编辑器
 
    },
    onEditorBlur(){}, // 失去焦点事件
    onEditorFocus(){}, // 获得焦点事件
    onEditorChange(){}, // 内容改变事件
    //重置
    reset(){
      this.contentKeywords = '';
      this.contentLink = '';
      this.contentSort = '';
      this.content = '';
    },
    //确定
    async determine(){
      const obj = {
        "content":this.content,
        "jumpUrl":this.contentLink,
        "sortOrder":this.contentSort,
        "status":"1",
        "title":this.contentKeywords,
        "type":"1"
      };
      announcementSave(obj)
      .then(res => {
        if(res.code === 200){
          this.$message({
            type: 'success',
            message: '新增成功!'
          });
          this.$router.push({ name: "announcement"});
        }else{
          this.$message({
            type: 'warning',
            message: '新增失敗!'
          });
        }   
      })   
    }
    
  },
  components: {
    
  }
};
</script>

<style scoped>
.search-base >>> .el-col-10{
  width: 60%;
}
.search-wrapper1 >>> .el-page-header{
    float: left;
}
.search-wrapper1 >>> .el-breadcrumb{
    padding-top: 4px;
}
.goods-fitter .search-wrapper{
    padding: 20px;
    border: 1px solid #d7e0f1;
    background: #fff;
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
.lines-details > ul > li{
    display: inline-block;
    margin-left: 15%;
    margin-top: 15px;
}
.lines-details > ul > li > label > i{
    font-style: normal;
    color: red;
    position: relative;
    top: 5px;
}
.edit_container >>> .ql-blank,.edit_container >>> .ql-editor{
  height: 400px;
}
.goods-fitter >>> .el-button--danger{
  margin-left: 320px;
  margin-top: 20px;
}
.goods-fitter >>> .el-button--primary{
  margin-left: 60px;
}
</style>