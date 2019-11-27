<template>
    <div class="margin">
      <div class="mcard mbottom">
        <div class="title">搜索条件</div>
        <div>
        <el-form label-width="120px" size="small">
            <el-row>
                <el-col :span="6">
                  <el-col>
                    <el-form-item label="字段内容：">
                      <el-col :span="23">
                        <el-input  v-model="contentKeywords" placeholder="请输入字段内容">
                        </el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="6">
                  <el-col>

                        <el-form-item label="字段类型：">
                          <el-select v-model="fieldType" placeholder="请选择字段类型">
                            <el-option label="单行文本输入" value="0"></el-option>
                            <el-option label="单选" value="1"></el-option>
                            <el-option label="多选" value="2"></el-option>
                            <el-option label="多行文本输入" value="3"></el-option>
                          </el-select>
                        </el-form-item>

                  </el-col>
                </el-col>
                <el-col :span="6">
                  <el-col>
                   <el-form-item label="是否必填：">
                      <el-select v-model="announcementStatus" placeholder="请选择是否必填">
                        <el-option label="选填" value="0"></el-option>
                        <el-option label="必填" value="1"></el-option>
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
            <el-button type="primary" size="small" @click="chooseGoods" style="margin-left:10px" v-permit="'new:field'">新增字段</el-button>
            <el-button type="primary" size="small" @click="deleteGoods" style="margin-left:10px" v-permit="'field:delete'">批量删除</el-button>
          </div>
          <el-table :data="productPushList" stripe style="width: 100%" border @selection-change="handlepushList">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column type="index" label="序号" align="center" width="95"></el-table-column>
            <el-table-column label="编码" align="center" prop="fieldKey"></el-table-column>
            <el-table-column label="字段名" align="center" width="295" prop="fieldName"></el-table-column>
            <el-table-column label="字段描述" align="center" prop="fieldRemark"></el-table-column>
            <el-table-column label="类型" align="center" prop="fieldType" :formatter="formatState"></el-table-column>
            <el-table-column label="是否必填" align="center" prop="fieldIsNeed" :formatter="formatFieldIsNeed"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <div class="line-div clearfix">
                        <!-- 编辑 -->
                        <div class="small-Idiv"
                                    @click="edit(scope.row)" style="margin-left: 20px;" v-permit="'field:edit'">
                                <div class="i-div">
                                        <img src="@/common/images/icon/icon_edit.png" alt="" class="operation_img">
                                </div>
                                <span style="word-break: keep-all;">编辑</span>
                        </div>
                        <!-- 删除 -->
                        <div class="small-Idiv"
                                    @click="showDeleteDialog(scope.row)" style="margin-left: 40px;" v-permit="'field:delete'">
                                <div class="i-div huishouzhan">
                                        <img src="@/common/images/icon/icon_delete.png" alt=""
                                                    class="operation_img">
                                </div>
                                <span style="word-break: keep-all;">删除</span>
                        </div>
                    </div>
                    <div class="line-div clearfix">
                        <!-- 提交审核 -->
                        <div class="small-Idiv"
                                    @click="getOperateContractId(scope.row)" v-if="scope.row.fieldIsNeed != 1" style="margin-left: 20px;" v-permit="'field:edit'">
                                <div class="i-div huishouzhan">
                                        <img src="@/common/images/icon/审核.png" alt="" class="operation_img">
                                </div>
                                <span style="word-break: keep-all;">设为必填</span>
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

      <!--新增字段-->
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="字段名称">
            <el-input v-model="form.fieldName"></el-input>
          </el-form-item>
          <el-form-item label="字段标识">
            <el-input v-model="form.fieldKey"></el-input>
          </el-form-item>
          <el-form-item label="字段类型">
            <el-radio-group v-model="form.fieldIsNeed">
              <el-radio :label="1">必填</el-radio>
              <el-radio :label="0">选填</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="字段描述">
            <el-input type="textarea" v-model="form.fieldRemark"></el-input>
          </el-form-item>
          <el-form-item label="填空类型">
            <el-radio-group v-model="form.fieldType">
              <el-radio :label="0">单行文本输入</el-radio>
              <el-radio :label="1">单选</el-radio>
              <el-radio :label="2">多选</el-radio>
              <el-radio :label="3">多行文本输入</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="选项内容">
            <el-input type="textarea" v-model="form.fieldValue"></el-input>
          </el-form-item>
          <el-alert
            title="提示:输入选项,以逗号隔开."
            type="warning"
            :closable="false"
            show-icon>
          </el-alert>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="newSuer" v-if="this.title === '新增字段'">确 定</el-button>
          <el-button type="primary" @click="editorSure" v-if="this.title === '编辑字段'">保 存</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
import { expandlList, expandlSave, expandlObtain, expandlUpdate, expandlDelete } from '@/api/mallapp/expand/index'
export default {
    data(){
        return {
            contentKeywords: '',
            fieldType: '',
            announcementStatus: '',
            productPushList: [],
            pagination: {
                number: 1,
                size: 10,
                totalElements: 0,
            },
            dialogVisible: false,
            form: {},
            title: '新增字段',
            pushIdList:[],
        }
    },
    mounted() {

        this.expandlList();
    },
    created () {

    },
    methods: {
        handlepushList(val){
          this.pushIdList = val
        },
        formatState(row, column, cellValue) {
          if(cellValue == "1"){
            return '单选';
          }else if (cellValue == "2"){
            return '多选';
          }else if (cellValue == "3"){
            return '多行文本输入';
          }else if (cellValue == "0"){
            return '单行文本输入';
          }
        },
        formatFieldIsNeed(row, column, cellValue) {
          if(cellValue == "0"){
            return '选填';
          }else if (cellValue == "1"){
            return '必填';
          }
        },

        handlecreateTime() {

        },
        //条件搜索
        handelSearchGoods() {
           this.expandlList();
        },
        //是否关闭弹窗
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        //删除多行公告
        deleteGoods() {
          if(this.pushIdList.length<=0) return this.$message("请选择删除的字段")
            let pushIds=[]
            this.pushIdList.forEach(item=>{
              // console.log(item)
              pushIds.push(item.fieldId)
            })
           this.$confirm('是否删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(async() => {
               const res = await expandlDelete(pushIds)
                if(res.code === 200 ){
                  this.productPush();
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
        },
        //获取数据
        async expandlList() {
            const obj = {
              fieldName: this.contentKeywords,
              fieldType:  this.fieldType,
              fieldIsNeed: this.announcementStatus,
              pageNum: 1,
              pageSize: 10
            };
            const res = await expandlList(obj);
            if (res.code === 200) {
                this.productPushList = res.data.list;
                // console.log(res.data.content)
                this.pagination.number = res.data.pageNum;
                this.pagination.size = res.data.pageSize;
                this.pagination.totalElements = res.data.total;
            }
        },
        async handleSizeChange1(val) {
            // console.log(val)
            const obj = {
                pageNum: 1,
                pageSize: val
            };
            const res = await expandlList(obj);
            if (res.code === 200) {
                this.productPushList = res.data.list;
                // console.log(res.data.content)
                this.pagination.number = res.data.pageNum;
                this.pagination.size = res.data.pageSize;
                this.pagination.totalElements = res.data.total;
            }
        },
        async handleCurrentChange1(val) {
            // console.log(val)
            const obj = {
                pageNum: val,
                pageSize: 10
            };
            const res = await expandlList(obj);
            if (res.code === 200) {
                this.productPushList = res.data.list;
                // console.log(res.data.content)
                this.pagination.number = res.data.pageNum;
                this.pagination.size = res.data.pageSize;
                this.pagination.totalElements = res.data.total;
            }
        },
        //新增字段
        chooseGoods(){
          this.title = "新增字段";
          this.dialogVisible = true;
          this.form = {};
        },
        //新增字段保存
        newSuer(){
           const obj = {
             customerId: this.form.customerId,
             fieldName: this.form.fieldName,
             fieldId: this.form.fieldId,
             fieldIsNeed: this.form.fieldIsNeed,
             fieldIsShow: this.form.fieldIsShow,
             fieldRemark: this.form.fieldRemark,
             fieldScene: this.form.fieldScene,
             fieldStatus: this.form.fieldStatus,
             fieldType: this.form.fieldType,
             fieldValue: this.form.fieldValue,
             projectId: this.form.projectId
           }
           expandlSave(obj)
          .then(res => {
            if(res.code === 200){
              this.$message({
                type: 'success',
                message: '新增成功!'
              });
              this.dialogVisible = false;
              this.expandlList();
            }else{
              this.$message({
                type: 'warning',
                message: '新增失敗!'
              });
              this.dialogVisible = false;
              this.expandlList();
            }
          })
        },
        // 编辑
        async edit(row) {
          //console.log(row)
          const res = await expandlObtain(row.fieldId);
          this.form = res.data;
          this.title = "编辑字段";
          this.dialogVisible = true;
        },
        //编辑保存
        async editorSure(){
           const obj = {
             customerId: this.form.customerId,
             fieldName: this.form.fieldName,
             fieldId: this.form.fieldId,
             fieldIsNeed: this.form.fieldIsNeed,
             fieldIsShow: this.form.fieldIsShow,
             fieldRemark: this.form.fieldRemark,
             fieldScene: this.form.fieldScene,
             fieldStatus: this.form.fieldStatus,
             fieldType: this.form.fieldType,
             fieldValue: this.form.fieldValue,
             projectId: this.form.projectId
           }
           const res = await expandlUpdate(obj);
           this.dialogVisible = false;
           this.expandlList();
        },
        //设为必填
        getOperateContractId(row) {
            this.$confirm('是否设为必填?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              const obj = {
                customerId: row.customerId,
                fieldName: row.fieldName,
                fieldId: row.fieldId,
                fieldIsNeed: 1,
                fieldIsShow: row.fieldIsShow,
                fieldRemark: row.fieldRemark,
                fieldScene: row.fieldScene,
                fieldStatus: row.fieldStatus,
                fieldType: row.fieldType,
                fieldValue: row.fieldValue,
                projectId: row.projectId
              }
              expandlUpdate(obj)
              .then(res => {
                if(res.code === 200){
                  this.$message({
                    type: 'success',
                    message: '设为必填成功!'
                  });
                  this.expandlList();
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });
            });
        },
        //删除单行公告
        showDeleteDialog(row) {
           this.$confirm('是否删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              expandlDelete(row.fieldId)
              .then(res => {
                if(res.code === 200){
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  this.expandlList();
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
        }
    },
}
</script>
<style scoped>
.small-Idiv{
    width: 25%;
    float: left;
}
</style>
