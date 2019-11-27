<template>
  <div class="tabelConatiner" style="background: #f7faff">
    <div>
      <div class="search-wrapper">
        <h4 class="title">搜索条件</h4>
        <div class="search-base">
          <span style="margin-left: 20px;margin-right: 20px">请输入名称:</span>
          <el-input v-model="userName" placeholder="请输入名称" style="width: 255px;margin-right: 20px" size="small"></el-input>
          <el-button type="primary" size="small" @click="querySeller">查询</el-button>
        </div>
      </div>
    </div>
    <div class="tabelWrap" style="background: white">
      <div class="tabel">
        <div class="btn">
          <el-button type="primary" @click="addUser" size="small" v-permit="'salesman:new'">添加销售员</el-button>
        </div>
        <el-table :data="tableDataList.list" border :header-cell-style="getRowClass">
          <!--<el-table-column-->
          <!--align="center"-->
          <!--type="selection"-->
          <!--width="55"/>-->
          <el-table-column type="index" align="center" label="序号" width="100" />
          <el-table-column prop="sysuserAccount" align="center" label="登录账号" width></el-table-column>
          <el-table-column align="center" prop="sysuserName" label="销售员名称" width></el-table-column>
          <el-table-column align="center" label="操作" width="150">
            <template slot-scope="scope">
              <div class="dele" @click="deleteSalesperson(scope.row.manId)" v-permit="'salesman:remove'">
                <img src="@/common/images/icon/icon_delete.png" alt />
                <span>删除</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="tableDataList.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableDataList.total"
        ></el-pagination>
      </div>
    </div>

    <el-dialog title="添加销售员" :visible.sync="dialogVisible" width="500px">
      <div class="userInformation">
        <div class="tankuang">
          <span class="selecter">选择人物:</span>
          <el-select
            style="width: 68%;"
            size="medium"
            v-model="value"
            filterable 
            v-el-select-loadmore="loadmore"
            placeholder="请选择"
            @change="handeleChange"
          >
            <el-option
              v-for="item in userList"
              :key="item.sysuserId"
              :label="item.sysuserName"
              :value="item.sysuserId"
            ></el-option>
          </el-select>
        </div>
        <div>
          <span class="selecter">排序:</span>
          <el-input v-model="sort"  placeholder="排序" size="medium" style="width: 68%;"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" type="danger" size="small">取 消</el-button>
        <el-button type="primary" @click="addSalesperson" size="small">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="删除" :visible.sync="centerDialogVisible" width="30%">
      <span>是否确定删除</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="centerDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="deleteSalesperson(false)" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    import { salesmanManagement,addSalesperson,deleteSalesperson ,querySeller} from '@/api/contentManagement/index'
    import { getSalesman } from '@/api/permissions/index'
    import { throttleTipPop } from '@/utils/throttle'
export default {
    directives: {
        'el-select-loadmore': {
            bind(el, binding) {
                // 获取element-ui定义好的scroll盒子
                const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
                SELECTWRAP_DOM.addEventListener('scroll', function () {
                    const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
                    if (condition) {
                        binding.value();
                    }
                });
            }
        }
    },

    data(){
        return{
            sysuserSalesmanId:'',
            centerDialogVisible:false,//删除销售员
            value:'',
            options:'',
            data:{
                pageSize:10,
                current_page:1
            },
            userName:'',
            deleUserId:'',
            value:'',   //用户信息
            dialogVisible:false,
            userList:'',
            currentPage4:4,
            tableDataList: [],
            userId:'',  //用户id
            sort:'' , //排序
            count:0
        }
    },
    mounted(){
        this.getList(this.data);
    },
    methods: {
        // 添加销售员的时候 下拉加载
        loadmore() {
            this.data.pageSize+=20;
            this.getList(this.data);
        },
       async  getList(data){
            let res = await getSalesman(data)
            if(res.code === 200){
                this.userList = res.data.list
            }
        },
        //查询销售人员
         querySeller(){
                const obj={
                    sysuserName:this.userName
                }
                this.commonSearch(obj)
        },

        //获取表格信息
        handleSelectionChange(data){
            console.log(data)
            data.map((item)=>{
                this.deleUserId =item.manId
            })
        },
        //删除销售人员
        async deleteSalesperson(sysuserSalesmanId){
            if(sysuserSalesmanId){
                this.sysuserSalesmanId = sysuserSalesmanId
                this.centerDialogVisible = true
            }else{
                const res = await deleteSalesperson(this.sysuserSalesmanId)
                    if(res.code === 200 ){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.deleUserId=''
                        this.centerDialogVisible = false
                        const obj={
                            pageNum:1,
                            pageSize:10
                        }
                        this.commonSearch(obj)
                }
            }
        },

        //确定新增销售人员
        async addSalesperson(){
          if (!this.userId) return this.$message('请先选择人物')
            this.dialogVisible=false
            var reg = new RegExp("^[0-9]*$");
            if(!reg.test(this.sort)){
                return this.$message({
                    type: 'warning',
                    message: '请输入合法数字'
                })
            }
            const obj = {
                sortOrder:this.sort,
                sysuserId:this.userId
            }
            const res = await addSalesperson(obj)
            if(res.code === 200 ){
                this.commonSearch(obj)
              this.$message({
                  type: 'success',
                  message: '添加成功!'
              })
              //选择完刷新可选用户列表
              this.getList(this.data)
            }else{
                this.$message({
                    type: 'info',
                    message: '添加失败!'
                })
            }
        },
        handeleChange(val){
           this.userId = val
        },
        //获取用户 生成弹框
        async addUser(){
            this.dialogVisible=true
            let res = await getSalesman(this.data)
            if(res.code === 200){
                this.userList = res.data.list
            }
        },
        //給表頭添加樣式
        getRowClass ({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 0) {
                return 'color:#939399;font-family:MicrosoftYaHei;font-weight:400;background:#f7faff;text-align:center;height:50px;'
            } else {
                return ''
            }
            if (columnIndex === 0) {
                return 'display:none;'
            }
        },
        async commonSearch(obj){
            const res = await querySeller(obj)
            if(res.code === 200){
                this.tableDataList = res.data
            }
        },
        //分页查询
        handleSizeChange(val) {
            const obj={
                pageNum:1,
                pageSize:val,
            }
            this.commonSearch(obj)
        },
        handleCurrentChange(val) {
            const obj={
                pageNum:val,
                pageSize:10,
            }
            this.commonSearch(obj)
        },
    },
     async created() {
        const obj={
            pageNum:1,
            pageSize:10
        }
        this.commonSearch(obj)
    }
}
</script>
<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.tabelConatiner {
  width: 100%;
  background: #f7faff;
  .search-wrapper {
    width: 1579px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid rgb(215, 224, 241);
    background: #fff;
    .title {
      margin-left: -20px;
      font-size: 16px;
      font-weight: 400;
      padding-left: 10px;
      line-height: 1.4;
      border-left: 4px solid $themeColor;
      margin-bottom: 10px;
    }
  }
  .tabelWrap {
    width: 1579px;
    margin: 20px auto;
    background: white;
    padding: 20px;
    box-sizing: border-box;
    .tabel {
      .btn {
        width: 200px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
      }
    }
  }
  .block {
    text-align: center;
    padding: 35px 0;
  }
  .tankuang {
    margin-bottom: 20px;
  }
  .selecter {
    margin-right: 20px;
    width: 80px;
    display: inline-block;
    text-align: right;
  }
  .dele {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
