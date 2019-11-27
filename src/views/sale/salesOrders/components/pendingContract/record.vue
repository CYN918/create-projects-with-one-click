<template>
  <div class="margin0">
    <div class="mcard"  style="border:1px solid #d7e0f1">
     
      <el-table :data="tableData" border @selection-change="handleSelectionChange" stripe>
        <el-table-column label="序号" type="index" align="center"></el-table-column>
        <el-table-column label="状态" prop="name" align="center"></el-table-column>
        <el-table-column label="出库单号" prop="name" align="center"></el-table-column>
        <el-table-column label="出库日期" prop="name" align="center"></el-table-column>
        <el-table-column label="客户" prop="name" align="center"></el-table-column>
        <el-table-column label="销售金额" prop="name" align="center"></el-table-column>
        <el-table-column label="提货人" prop="name" align="center"></el-table-column>
        <el-table-column label="运输方式" prop="name" align="center"></el-table-column>
        <el-table-column label="制单人" prop="name" align="center"></el-table-column>
        <el-table-column label="备注" prop="name" align="center"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="form.current_page"
            :page-sizes="[10, 30, 50, 100]"
            :page-size="form.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="form.total_count">
            </el-pagination>
      </div>
    </div>
    <!-- 新增记录弹窗 -->
    <el-dialog
      title="新增记录"
      :visible.sync="addVisible"
      width="70%"
      >
    <div class="mail-fitter">
          <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px">
                <div class="mail-wrapper">
                  <h4 class="title1">记录消息</h4>
                  <div class="search-base">
          <el-row class="warp">
      <div class="mbottom">
        <div class="goods-fitter">
            <el-row>
              <el-col :span="6">
                <el-form-item label="项目名称：" prop="projectName">
                   <el-input v-model="form.projectName" placeholder="必填项"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="业务员:" prop="salesman">
                   <el-input v-model="form.salesman"  placeholder="必填项"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="拜访时间:" prop="visitTime" >              
                      <el-date-picker
                          v-model="form.visitTime"
                          type="date"
                          style="width:100%"
                          placeholder="选择日期"
                          >
                        </el-date-picker>
                   
                  </el-form-item>
                </el-col>
              <el-col :span="6">
                <el-form-item label="下次拜访时间:" prop="nextVisitTime">
                   <el-date-picker
                      v-model="form.nextVisitTime"
                      type="date"
                      style="width:100%"
                      placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
               <el-form-item label="拜访内容：" prop="visitContents">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                placeholder="请输入内容"
                v-model="form.visitContents">
              </el-input>
               </el-form-item>
            </el-row>
            <el-row>
               <el-form-item label="客户需求：" prop="customerDemand">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                placeholder="请输入内容"
                v-model="form.customerDemand">
              </el-input>
               </el-form-item>
            </el-row>
            <el-row>
               <el-form-item label="备注：" prop="remarks">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                placeholder="请输入内容"
                v-model="form.remarks">
              </el-input>
               </el-form-item>
            </el-row>
        </div>
      </div>

    </el-row>
              
            </div>
          </div>
    </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="addVisible =false" size="small">关 闭</el-button>
        <el-button type="primary" @click="addVisible =false" size="small">保存</el-button>
      </span>
    </el-dialog>
    <!-- 编辑记录弹窗 -->
     <el-dialog
      title="新增记录"
      :visible.sync="editVisible"
      width="70%"
      >
    <div class="mail-fitter">
          <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px">
                <div class="mail-wrapper">
                  <h4 class="title1">记录消息</h4>
                  <div class="search-base">
          <el-row class="warp">
      <div class="mbottom">
        <div class="goods-fitter">
            <el-row>
              <el-col :span="6">
                <el-form-item label="项目名称：" prop="projectName">
                   <el-input v-model="form.projectName" placeholder="必填项"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="业务员:" prop="salesman">
                   <el-input v-model="form.salesman"  placeholder="必填项"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="拜访时间:" prop="visitTime" >              
                      <el-date-picker
                          v-model="form.visitTime"
                          type="date"
                          style="width:100%"
                          placeholder="选择日期"
                          >
                        </el-date-picker>
                   
                  </el-form-item>
                </el-col>
              <el-col :span="6">
                <el-form-item label="下次拜访时间:" prop="nextVisitTime">
                   <el-date-picker
                      v-model="form.nextVisitTime"
                      type="date"
                      style="width:100%"
                      placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
               <el-form-item label="拜访内容：" prop="visitContents">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                placeholder="请输入内容"
                v-model="form.visitContents">
              </el-input>
               </el-form-item>
            </el-row>
            <el-row>
               <el-form-item label="客户需求：" prop="customerDemand">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                placeholder="请输入内容"
                v-model="form.customerDemand">
              </el-input>
               </el-form-item>
            </el-row>
            <el-row>
               <el-form-item label="备注：" prop="remarks">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                placeholder="请输入内容"
                v-model="form.remarks">
              </el-input>
               </el-form-item>
            </el-row>
        </div>
      </div>

    </el-row>
              
            </div>
          </div>
    </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="editVisible =false" size="small">关 闭</el-button>
        <el-button type="primary" @click="editVisible =false" size="small">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCategory, getStoreList } from '@/api/public'

export default {
  data () {
    return {
      addVisible:false,//新增记录弹窗
      editVisible:false,//编辑记录弹窗
      form: {
        current_page:0,
        page_size:10,
        total_count:0,
        projectName:'',//项目名称
        salesman:'',//业务员
        visitTime:'',//拜访时间
        nextVisitTime:'',//下次拜访时间
        visitContents:'',//拜访内容
        customerDemand:'',//客户需求
        remarks:'',//备注
      },
      tableData:[
          {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      rules: {
          projectName: [
            {required: true, message: '此项为必选项', trigger: 'blur'}
          ],
          salesman:[
            {required: true, message: '此项为必选项', trigger: 'blur'}
          ],
          visitTime:[
             {required: true, message: '此项为必选项', trigger: 'blur'}
          ]

      }
    }
  },
  created () {
  },
  computed: {
  },
  methods: {
      handleSizeChange(){

      },
      handleCurrentChange(){

      },
      handleSelectionChange(){
        
      },
      doSomething(){

      },
      //新增跟踪记录
      addDiscipline(){
          this.addVisible = true
      },
      //编辑跟踪记录
      editDiscipline(){
          this.editVisible = true
      },
  },
  components: {
  }
}
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
.margin1{
  padding-left:40px;
  padding-top:20px;
  box-sizing: border-box;

}
</style>
