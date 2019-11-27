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
                    <el-form-item label="一级分类：">
                        <el-col :span="22">
                            <el-select v-model="carId1" placeholder="请选择" @change="carIdFunc($event,1)">
                              <el-option
                                v-for="item in carArr1"
                                :key="item.catId"
                                :label="item.catName"
                                :value="item.catId">
                              </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="二级分类：">
                        <el-col :span="22">
                            <el-select v-model="carId2" placeholder="请先选择一级分类"  @change="carIdFunc($event,2)">
                              <el-option
                                v-for="item in carArr2"
                                :key="item.catId"
                                :label="item.catName"
                                :value="item.catId">
                              </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="三级分类：">
                        <el-col :span="22">
                            <el-select v-model="carId3" placeholder="请先选择二级分类"  @change="carIdFunc($event,3)">
                              <el-option
                                v-for="item in carArr3"
                                :key="item.catId"
                                :label="item.catName"
                                :value="item.catId">
                              </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="关键字：">
                        <el-col :span="22">
                            <el-input v-model="tableData.keyWord" placeholder="请输入关键字进行搜索"></el-input>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small"  @click='_getCatagory(true)'>搜索</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mbottom">
      <div class="mcard">
        <el-row class="operate mbottom">
            <el-col :span="21">
            <!-- <el-button type="primary">仅挑选</el-button> -->
              <el-button type="primary" size="small" @click="addCatagory"  v-permit="'category:add'">新增分类</el-button>
            </el-col>
          <el-col :span="3">
          </el-col>
        </el-row>
        <el-table  :data="data"
            style="width: 100%;margin-bottom: 20px;"
            row-key="catId"
            border
            :lazy='true'
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
              <el-table-column  prop="catNameOne" label="分类名称(一级分类)"  width="180" align="center"> </el-table-column>
              <el-table-column  prop="catNameTwo" label="分类名称(二级分类)"  width="180" align="center"> </el-table-column>
              <el-table-column  prop="catNameThree" label="分类名称(三级分类)"  width="180" align="center"> </el-table-column>
              <el-table-column  prop="goodsQuantity" label="商品数量" align="center"></el-table-column>
              <el-table-column  prop="measureUnit" label="单位" align="center"></el-table-column>
              <el-table-column  prop="showInNav" label="导航栏" align="center">
                <template slot-scope="scope">
                    <div>
                      {{scope.row.showInNav == '0'?'不显示':'显示'}}
                    </div>
                  </template>
              </el-table-column>
              <el-table-column  prop="isShow" label="是否显示" align="center">
                <template slot-scope="scope">
                    <div>
                      {{scope.row.showInNav == '0'?'不显示':'显示'}}
                    </div>
                  </template>
              </el-table-column>
              <el-table-column  prop="indexRecommend" label="首页推荐" align="center">
                <template slot-scope="scope">
                    <div>
                      {{scope.row.showInNav == '0'?'不推荐':'推荐'}}
                    </div>
                  </template>
              </el-table-column>
              <el-table-column  prop="floorIndex" label="首页楼层" align="center"></el-table-column>
              <el-table-column  prop="grade" label="价格分级" align="center"></el-table-column>
              <el-table-column  prop="sortOrder" label="排序" align="center"></el-table-column>
              <el-table-column  prop="name" label="编辑"  align="center" width="150">
                  <template slot-scope="scope">
                      <div class="line-div">
                        <div class="small-Idiv"   @click="handleClick(scope.row.catIdThree)"  v-permit="'category:edit'">
                          <div class="i-div">
                            <img src="../../../common/images/icon/编辑.png" alt="" class="operation_img">
                          </div>
                          <span>编辑</span>
                        </div>
                        <div class="small-Idiv"  @click="delate(scope.row.catIdThree)"  v-permit="'category:del'">
                          <div class="i-div huishouzhan">
                            <img src="../../../common/images/icon/回收站.png" alt="" class="operation_img">
                          </div>
                          <span>删除</span>
                        </div>
                      </div>
                      <div class="line-div" style="justify-content: end;margin-left: 17px;margin-top: 5px;">
                        <!-- @click="dialogVisiblefuc(scope.row.catIdThree)" -->
                        <div class="small-Idiv" @click="related(scope.row.catIdThree)"  v-permit="'category:spec'">
                          <div class="i-div">
                            <img src="../../../common/images/icon/绑定规格.png" alt="" class="operation_img">
                          </div>
                          <span  style="word-break: keep-all;position: relative;left: -7px;">相关规格</span>
                        </div>
                      </div>
                  </template>
              </el-table-column>
          </el-table>
      </div>
    </div>
    <div class="paginationyz">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="tableData.pageIndex"
            :page-sizes="tableData.sizes"
            :page-size="tableData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.total"
          ></el-pagination>
        </div>

    <!-- 绑定规格 -->
    <el-dialog
    title="绑定规格"
    :visible.sync="dialogVisible"
    width="30%">
    <span>
      <div class="interbank">
        <div v-for="(item,index) in form.value" :key='index'>
          <span class="model" >{{item.specName}}
            <span class="delete-specif"  @click="deleitem(index)">
              <span class="error">×</span>
            </span>
          </span>
        </div>
        <el-button  type="primary" @click="form.show = !form.show" size="small"  v-if="!form.show">添加</el-button>
        <el-select v-model="form.content" filterable placeholder="请选择" size="small" v-if="form.show">
          <el-option
            v-for="item in options"
            :key="item.specId"
            :label="item.specName"
            :value="item.specId">
          </el-option>
        </el-select>
        <el-button  type="primary" @click="sure" size="small"  v-if="form.show" style="margin-left: 10px;">确定</el-button>
        <el-button  type="primary" @click="cancel" size="small"  v-if="form.show">取消</el-button>
      </div>
    </span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" type="danger" size="small">取 消</el-button>
      <el-button type="primary" @click="submit" size="small">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
import { getCatagory , deleteCatagoryid , getSpecifications ,saveSpecs , getCatagory1} from '@/api/product/index'
export default {
    data(){
        return {
            data:[],
            value:'',
            options:[],
            carArr1:[], //一级分类
            carArr2:[], //二级分类
            carArr3:[], //三级分类
            catId:'', //分类id
            carId1:'', //一级分类id
            carId2:'', //二级分类id
            carId3:'', //三级分类id
            form: {
              value: [], // 规格值
              show:false,
              catName:''
            },
            tableData: {
                pageIndex:1,
                sizes:[10, 20, 50, 100],
                pageSize:10,
                total:0,
                keyWord:'',
                catId:''
            },
            input:'',
            dialogVisible:false, // 绑定规格值
        }
    },
    methods:{
      carIdFunc(val,index){
        this.tableData.catId = val
        if(index == 1){
          this.carArr2 = []
          this.carArr3 = []
          this.carId2 = ''
          this.carId3 = ''
        }
        if(index == 2){
          this.carArr3 = []
          this.carId3 = ''
        }
        this._getCatagory2(val,index)
        this._getCatagory(true)
      },
      dialogVisiblefuc(id){
        this.dialogVisible = true
        this.catId = id
      },
      //相关规格
      related(id){
        this.$router.push({name:"Reslated",query:{id:id}})
      },
      //规格删除
        deleitem(val){
          this.form.value.splice(val,1)
        },
        cancel(){
          this.form.show = false
          this.form.content = ''
          this.form.value = []
        },
        sure(){
          if(this.form.content){
            this.options.forEach(item => {
              if(item.specId == this.form.content){
                this.form.value.push(item)
                console.log(this.form.value)
                this.heavy(this.form.value)
                return item
              }
            })
          }
          this.form.show = false
          this.form.content = ''
        },
        submit(){
          let obj = {}
          let arr = []
          this.form.value.forEach(item => {
            arr.push(item.specId)
          })
          obj.catId = this.catId
          obj.specIds = arr
          saveSpecs(obj).then(res => {
            if(res.code == 200){
              this.form.show = false
              this.form.content = ''
              this.form.value = []
              this.dialogVisible = false
               this.$message({
                message:res.message,
                type: 'success'
              });
            }
            
          })
        },
        heavy(data){
          let arr = data
          let result = []
          for(var k=0;k<arr.length;k++){
            for(var j=k+1;j<arr.length;j++)
                if(arr[k].specId==arr[j].specId){ 
                //如果第一个等于第二个，splice方法删除第二个
                arr.splice(j,1);
                j--;
                }
            }
        },
        //删除
        delate(id){
        this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            deleteCatagoryid(id).then(res => {
              this._getCatagory()
            })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
          });
          
        },
        _getSpecifications(){
          getSpecifications(this.tableData).then(res => {
            this.options = res.data.pageList
          })
        },
        //编辑
        handleClick(catId){
          this.$router.push({name:'Addcatagory' , query:{id:catId}})
        },
        _getCatagory(data){
            if(data){
              this.tableData.pageIndex = 1
            }
            let obj = {};
            obj.type = 1;
            obj.pageIndex = this.tableData.pageIndex;
            obj.pageSize = this.tableData.pageSize;
            obj.catName = this.tableData.keyWord;
            obj.parentId = this.tableData.catId;
            getCatagory(obj).then((res) => {
                this.tableData.total = res.data.count;
                this.data = res.data.pageList
                this.endLoading() //取消加载中loading
            })
        },
        //一级下拉
        _getCatagory2(data,index){
            let obj = {};
            obj.parentId = data 
            obj.pageIndex = 1;
            obj.pageSize = 0;
            obj.catName = this.tableData.keyWord;
            getCatagory1(obj).then((res) => {
                if(index == 0){
                  this.carArr1 = res.data.pageList;
                }
                if(index == 1){
                  this.carArr2 = res.data.pageList;
                }
                if(index == 2){
                  this.carArr3 = res.data.pageList;
                }
            })
        },
        addCatagory(){
            this.$router.push({name:'Addcatagory'})
        },
        handleSizeChange(val) {
          this.tableData.pageSize = val
          this._getCatagory()
        },
        handleCurrentChange(val) {
          this.tableData.pageIndex = val
          this._getCatagory()
        },
    },
    mounted(){
        this.startLoading() //加载中loading
        this._getCatagory()
        this._getSpecifications()
        this._getCatagory2(1,0)
    }
}
</script>
<style lang='scss' scoped>
@import "@/common/scss/variable.scss";
.brand{
    position: relative;
    .add_brand{
        position: absolute;
        right: 20px;
    }
}
// .el-input__inner{
//   width:370px!important;
// }
// .el-input{
//   width:370px!important;
// }
.small-Idiv{
  width: 32px;
  span{
    margin-top: 3px;
    font-size:12px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(72,73,77,1);
  }
}
.i-div{
  cursor: pointer;
  width:32px;
  height:32px;
  border-radius:6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.line-div{
    display: flex;
    justify-content: space-around;

}
.interbank{
  display: flex;
  flex-wrap: wrap;
  .model{
    height: 32px;
    padding: 0 18px;
    background:rgba(241,248,255,1);
    border-radius:4px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
    font-size:14px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(107,108,112,1);
    border-radius:4px;
    position: relative;
    margin-top: 5px;
  }
}
.delete-specif{
    width: 0;
    height: 0;
    display: inline-block;
    border: 11px solid;
    border-color: transparent #4a99fa #4a99fa transparent;
    position: absolute;
    right: 0;
    bottom: 0;
    cursor: default;
    .error{
      width: 7px;
      height: 7px;
      position: absolute;
      right: -7px;
      bottom: -2px;
      color: white;
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
</style>