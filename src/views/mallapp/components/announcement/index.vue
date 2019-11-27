<template>
    <div class="margin">
      <div class="mcard mbottom">
        <div class="title">搜索条件</div>
        <div>
        <el-form label-width="120px" size="small">
            <el-row>
                <el-col :span="6">
                  <el-col>
                    <el-form-item label="公告内容：">
                      <el-col :span="23">
                        <el-input  v-model="contentKeywords" placeholder="请输入内容关键字">
                        </el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="10" style="width: auto !important;">
                      <el-form-item label="公告时间：">
                        <el-col>
                          <el-date-picker
                            @change="handlecreateTime"
                            type=daterange
                            valueFormat='yyyy-MM-dd HH:mm:ss'
                            v-model="createTime"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                          </el-date-picker>
                        </el-col>
                      </el-form-item>
                  </el-col>
                <el-col :span="6">
                  <el-col>
                   <el-form-item label="公告状态：">
                      <el-select v-model="announcementStatus" placeholder="请选择公告状态">
                        <el-option label="删除" value="0"></el-option>
                        <el-option label="启动" value="1"></el-option>
                        <el-option label="禁用" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-col>

                <el-col :span="2" style='text-align: center;'>
                    <el-button type="primary" size="small" @click="handelSearchGoods">查询</el-button>
                </el-col>
              </el-row>
           </el-form>
        </div>
      </div>

      <div class="mcard">
          <div class="mbottom">
            <el-button type="primary" size="small" @click="chooseGoods" style="margin-left:10px" v-permit="'add:affiche'">新增公告</el-button>
            <el-button type="primary" size="small" @click="deleteGoods" style="margin-left:10px" v-permit="'single:delete'">批量删除</el-button>
          </div>
          <el-table :data="productPushList" stripe style="width: 100%" border @selection-change="handlepushList">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column type="index" label="显示序号" align="center" width="95"></el-table-column>
            <el-table-column label="标题" align="center" prop="title"></el-table-column>
            <el-table-column label="内容" align="center" width="295">
              <template slot-scope="scope">
                <div class="Img" v-html="scope.row.content"></div>
              </template>
            </el-table-column>
            <el-table-column label="添加人" align="center" prop="userId"></el-table-column>
            <el-table-column label="链接" align="center" prop="jumpUrl"></el-table-column>
            <el-table-column label="状态" align="center" prop="status" :formatter="formatState"></el-table-column>
            <el-table-column label="添加时间" align="center" prop="createTime"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope" v-if="scope.row.status != 0&&scope.row.status != 2">
                    <div class="line-div clearfix">
                        <!-- 编辑 -->
                        <div class="small-Idiv"
                                    @click="edit(scope.row)" style="margin-left: 20px;" v-permit="'affiche:edit'">
                                <div class="i-div">
                                        <img src="@/common/images/icon/icon_edit.png" alt="" class="operation_img">
                                </div>
                                <span style="word-break: keep-all;">编辑</span>
                        </div>
                        <!-- 详情 -->
                        <div class="small-Idiv" @click="checkDetail(scope.row.id)" style="margin-left: 40px;" v-permit="'affiche:details'">
                                <div class="i-div">
                                        <img src="@/common/images/icon/icon_detail.png" alt=""
                                                    class="operation_img">
                                </div>
                                <span style="word-break: keep-all;">详情</span>
                        </div>
                    </div>
                    <div class="line-div clearfix">
                        <!-- 提交审核 -->
                        <div class="small-Idiv"
                                    @click="getOperateContractId(scope.row)" style="margin-left: 20px;" v-permit="'affiche:edit'">
                                <div class="i-div huishouzhan">
                                        <img src="@/common/images/icon/审核.png" alt="" class="operation_img">
                                </div>
                                <span style="word-break: keep-all;">禁用</span>
                        </div>
                        <!-- 删除 -->
                        <div class="small-Idiv"
                                    @click="showDeleteDialog(scope.row.id)" style="margin-left: 40px;" v-permit="'single:delete'">
                                <div class="i-div huishouzhan">
                                        <img src="@/common/images/icon/icon_delete.png" alt=""
                                                    class="operation_img">
                                </div>
                                <span style="word-break: keep-all;">删除</span>
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
            :current-page="pagination.number"
            :page-sizes="[10, 30, 50, 100]"
            :page-size="pagination.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.totalElements"
            ></el-pagination>
        </div>



      </div>

      <!-- 删除 -->
				<el-dialog
						title="删除"
						:visible.sync="deleteDialog"
						width="30%"
				>
						<el-form label-width="100px">
								<el-form-item label="删除原因:">
										<el-input v-model="deleteRemark" type="textarea"></el-input>
								</el-form-item>
						</el-form>
						<span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="deleteDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmDelete()" size="small">确 定</el-button>
      </span>
				</el-dialog>

      <!--編輯公告-->
      <el-dialog
        title="编辑公告"
        :visible.sync="centerDialogVisible"
        width="60%"
        center>
        <el-form label-width="150px" size="small" ref="row" :model="row">
          <div class="search-wrapper">
            <h4 class="title">编辑公告</h4>
            <div class="search-base">
              <el-row>
                <el-col :span="20">
                  <el-col>
                    <el-form-item label="公告标题：">
                      <el-col :span="23">
                        <el-input  v-model="row.title" placeholder="请输入公告标题">
                        </el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="20">
                  <el-col>
                    <el-form-item label="公告链接：">
                      <el-col :span="23">
                        <el-input  v-model="row.jumpUrl" placeholder="请输入公告链接">
                        </el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="20">
                  <el-col>
                    <el-form-item label="排序：">
                      <el-col :span="23">
                        <el-input  v-model="row.sortOrder" placeholder="请输入排序">
                        </el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="20">
                  <el-col>
                    <el-form-item label="公告内容：">
                      <div class="edit_container">
                          <quill-editor
                              v-model="row.content"
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
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editorAnnouncement">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
import {
  productPush,
  announcementDelete,
  announcementUpdate
} from "@/api/mallapp/announcement/index";
export default {
    data(){
        return {
            contentKeywords: '',
            createTime: '',
            announcementStatus: '',
            productPushList: [],
            pagination: {
                number: 1,
                size: 10,
                totalElements: 0,
            },
            pushIdList:[],
            centerDialogVisible: false,
            row: {},
            editorOption: {},
            deleteDialog: false,
            deleteRemark: '',
            reportIds: ''
        }
    },
    mounted() {
        this.productPush();
    },
    computed: {
      editor() {
          return this.$refs.myQuillEditor.quill;
      },
    },
    created () {

    },
    methods: {
        handlepushList(val){
          this.pushIdList = val
        },
        formatState(row, column, cellValue) {
          if(cellValue == "0"){
            return '删除';
          }else if (cellValue == "1"){
            return '启动';
          }else if (cellValue == "2"){
            return '禁用';
          }
		    },
        onEditorReady(editor) { // 准备编辑器

        },
        onEditorBlur(){}, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件
        onEditorChange(){}, // 内容改变事件
        handlecreateTime() {

        },
        //条件搜索
        async handelSearchGoods() {
          this.productPush();
        },
        //新增公告
        chooseGoods() {
            this.$router.push({ name: "newAnnouncement" });
        },
        //删除公告
        deleteGoods() {
          if(this.pushIdList.length<=0) return this.$message("请选择删除的公告")
          let pushIds=[]
          this.pushIdList.forEach(item=>{
            pushIds.push(item.id)
          })
           this.$confirm('是否删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(async() => {
              let obj = {
                id: pushIds
              }
              const res = await  announcementDelete(obj)
              if(res.code === 200 ){
                this.productPush();
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
              this.productPush();
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
        },
        //获取数据
        async productPush() {
          const obj = {
            page: this.pagination.number,
            size: this.pagination.size,
            // direction: 'ASC',
            fieldType: 2,
            status: this.announcementStatus,
            type: 1,
          };
          const res = await productPush(obj);
          if (res.code === 200) {
              this.productPushList = res.data.content;
              // console.log(res.data.content)
              this.pagination.number = res.data.number;
              this.pagination.size = res.data.size;
              this.pagination.totalElements = res.data.totalElements;
          }
        },
        async handleSizeChange1(val) {
            // console.log(val)
            const obj = {
                page: 1,
                size: val
            };
            const res = await productPush(obj);
            if (res.code === 200) {
                this.productPushList = res.data.content;
                // console.log(res.data.content)
                this.pagination.number = res.data.number;
                this.pagination.size = res.data.size;
                this.pagination.totalElements = res.data.totalElements;
            }
        },
        async handleCurrentChange1(val) {
            // console.log(val)
            const obj = {
                page: val,
                size: 10
            };
            const res = await productPush(obj);
            if (res.code === 200) {
                this.productPushList = res.data.content;
                // console.log(res.data.content)
                this.pagination.number = res.data.number;
                this.pagination.size = res.data.size;
                this.pagination.totalElements = res.data.totalElements;
            }
        },
        // 编辑
        edit(row) {
          // console.log(row)
          this.centerDialogVisible = true;
          this.row = row;
        },
        //编辑公告提交
        editorAnnouncement(){
          const obj = {
            "content":this.row.content,
            "id":this.row.id,
            "jumpUrl":this.row.jumpUrl,
            "sortOrder":this.row.sortOrder,
            "status":"1",
            "title":this.row.title,
            "type":"1"
          };
          announcementUpdate(obj)
          .then(res => {
            if(res.code === 200){
              this.$message({
                type: 'success',
                message: '编辑成功!'
              });
              this.centerDialogVisible = false;
              this.productPush();
            }
          })
        },
        //详情
        checkDetail(reportId) {
            // console.log(reportId)
            this.$router.push({ name: "detailAnnouncement", query:{id:reportId} });
        },

        //禁用
        async getOperateContractId(row) {
            this.$confirm('是否禁用?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              const param = {
                "content":row.content,
                "id":row.id,
                "jumpUrl":row.jumpUrl,
                "sortOrder":row.sortOrder,
                "status":2,
                "title":row.title,
                "type":1
              };
              announcementUpdate(param)
                .then(res => {
                  if(res.code === 200){
                    this.$message({
                      type: 'success',
                      message: '禁用成功!'
                    });
                  }else{
                    this.$message({
                      type: 'warning',
                      message: '禁用失敗!'
                    });
                  }
                })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消禁用'
              });
            });
        },
        //删除
        showDeleteDialog(id) {
          console.log(222,id)
          this.reportIds = id;
          console.log(333,this.reportIds)
          this.deleteRemark = '';
          this.deleteDialog = true;
        },
        confirmDelete(){
          let obj = {
            id: this.reportIds
          }
          announcementDelete(obj).then(res => {
              if (res.code == 200) {
                  this.$message({
                      message: res.message,
                      type: 'success'
                  });
                  this.deleteDialog = false
                  this.productPush();
              }
          })
          this.deleteDialog = false;
        }
    },
}
</script>
<style scoped>
.small-Idiv{
    width: 25%;
    float: left;
}
.margin >>> .ql-blank,.margin >>> .ql-editor{
  height: 400px;
}
.Img >>> img{
  width: 100px;
}
</style>
