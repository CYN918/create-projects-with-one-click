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
                    <el-form-item label="供应商状态：">
                        <el-col :span="23">
                            <el-select
                                class="el-select-width"
                                v-model="form.search_type"
                                @change="_getSupplier(true)"
                            >
                                <el-option label="全部" value=""></el-option>
                                <el-option label="正常" value="0"></el-option>
                                <el-option label="黑名单" value="1"></el-option>
                                <el-option label="删除" value="2"></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                 <el-col :span="5">
                  <el-col>
                    <el-form-item label="关键字：">
                        <el-col :span="22">
                            <el-input v-model="form.keywords" clearable placeholder="请输入关键字"></el-input>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="地址：">
                        <el-col :span="18">
                            <el-input v-model="form.price_min" placeholder="自营供应商输入地址"></el-input>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small" @click="_getSupplier(true)">搜索</el-button>
                </el-col>
                <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small">复制链接</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mcard">
      <el-row class="operate mbottom">
          <el-col :span="21">
          <el-button type="primary" size="small">黑名单</el-button>
        </el-col>
        <el-col :span="3">
        </el-col>
      </el-row>
      <el-table   :data="tableData"  border style="width: 100%" stripe>
        <el-table-column  type="index"  label="序号" align="center" width="55"></el-table-column>
        <el-table-column  prop="sysuserAccount"  label="供应商账号" align="center">
          <template slot-scope="scope">
            {{scope.row.sysuserAccount}}
          </template>
        </el-table-column>
        <el-table-column  prop="supplierName"  label="供应商名称" align="center"></el-table-column>
        <el-table-column  prop="name"  label="已发布商品数量" align="center">
          <template slot-scope="scope">
            {{scope.row.goodsCount.allnum}}
          </template>
        </el-table-column>
        <el-table-column  prop="name"  label="已上传商品数量" align="center" >
          <template slot-scope="scope">
            {{scope.row.goodsCount.salenum}}
          </template>
        </el-table-column>
        <el-table-column  prop="supplierStatus"  label="状态" align="center">
          <template slot-scope="scope">
            {{scope.row.supplierStatus == 0 ?'正常':scope.row.supplierStatus ==1 ? '黑名单':'删除'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center"  fixed="right" width="150">
                  <template slot-scope="scope">
                    <div class="line-div">
                    <div class="small-Idiv" @click="add">
                      <div class="i-div">
                        <img src="../../../common/images/icon/查看详情.png" alt="" class="operation_img">
                      </div>
                      <spann style="word-break: keep-all;">查看</spann>
                      </div>
                      <div class="small-Idiv" @click="add(scope.row.supplierId)">
                        <div class="i-div huishouzhan">
                          <img src="../../../common/images/icon/编辑.png" alt="" class="operation_img">
                        </div>
                        <span style="word-break: keep-all;">编辑</span>
                      </div>
                  </div>
                  <div class="line-div  small_top" >
                    <div class="small-Idiv" @click="deleteantar(scope.row.supplierId)">
                      <div class="i-div huishouzhan">
                        <img src="../../../common/images/icon/回收站.png" alt="" class="operation_img">
                      </div> 
                      <span style="word-break: keep-all;margin-left: 2px;">删除</span>
                    </div>
                    <div class="small-Idiv" @click="checkgoods">
                      <div class="i-div huishouzhan">
                        <img src="../../../common/images/icon/货物列表.png" alt="" class="operation_img">
                      </div>
                      <span style="word-break: keep-all;">列表</span>
                    </div>
                  </div>
                  </template>
                </el-table-column>
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
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        center>
        <span>
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入删除理由"
            v-model="form.reason">
          </el-input>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="sureDelete">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
      title="关联商品列表"
      center
      :visible.sync="Closegoods"
      width="70%"
      style="margin-top: -8vh;"
    >
      <span>
        <div style="height: 600px;overflow: auto;">
          <div>
            <el-form label-width="100px" size="small">
              <el-row class="operate mbottom">
                <!-- <el-col :span="21" class="detail">
                      关联商品列表
                </el-col>-->
              </el-row>
              <el-row class="operate mbottom">
                <el-col :span="14">
                  <el-button type="primary" size="small">新增</el-button>
                  <el-button type="primary" size="small">编辑</el-button>
                  <el-button type="primary" size="small">详情</el-button>
                  <el-button type="primary" size="small">删除</el-button>
                </el-col>
                <el-col :span="6">
                  <el-col>
                    <el-form-item label="关键词：">
                      <el-col :span="18">
                        <el-input v-model="form.price_min" placeholder="请输入商品名称/型号查询"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="1" class="btn_right">
                  <el-button type="primary" size="small">查询商品</el-button>
                </el-col>
              </el-row>
            </el-form>
            <el-table :data="tableData" border style="width: 100%" stripe>
              <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
              <el-table-column prop="name" label="图样" align="center"></el-table-column>
              <el-table-column prop="name" label="商品信息" align="center">
                <template slot-scope="scope">
                  <div class="txt_left">产品名称：</div>
                  <div class="txt_left">品牌：</div>
                  <div class="txt_left">型号：</div>
                  <div class="txt_left">货号：</div>
                  <div class="txt_left">税率：</div>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="产品说明" align="center"></el-table-column>
              <el-table-column prop="name" label="一件代发价" align="center"></el-table-column>
              <el-table-column prop="name" label="运费" align="center"></el-table-column>
              <el-table-column prop="name" label="京东/天猫价" align="center"></el-table-column>
              <el-table-column prop="name" label="集采/批发价" align="center"></el-table-column>
              <el-table-column prop="name" label="链接" align="center"></el-table-column>
              <el-table-column prop="name" label="库存" align="center"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="pagination" style="text-align: right;margin-right: 20px;margin-top: 10px;">
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
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Closegoods = false">取 消</el-button>
        <el-button type="primary" @click="Closegoods = false">确 定</el-button>
      </span>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import { getSupplier ,deleteantarky} from '@/api/supplier/index'

export default {
  data () {
    return {
      Closegoods: false, //查看商品
      form: {
        current_page:1,
        page_size:10,
        total_count:0,
        reason:'',
        supplierId:'',
        keywords:'',
        search_type:''
      },
      tableData:[],
      dialogVisible:false
    }
  },
  created () {
    this._getSupplier()
  },
  computed: {
  },
  methods: {
      checkgoods() {
      this.Closegoods = true;
    },
      add(id) {
      this.$router.push({ name: "SupplierAddfiles" , query: { id: id } });
    },
      deleteantar(id){
        this.dialogVisible = true
        this.form.supplierId = id
      },
      _getSupplier(slt){
        if(slt){
          this.form.current_page = 1
        }
        getSupplier(this.form).then(res => {
          this.tableData = res.data.list
          this.form.total_count = res.data.total
        })
      },
      //取消删除
      cancel(){
        this.form.supplierId = ''
        this.form.reason = ''
        this.dialogVisible = false
      },
      //确定删除
      sureDelete(){
        deleteantarky(this.form).then(res => {
          if(res.code ==200){
            this.dialogVisible = false
            this._getSupplier()
            this.form.supplierId = ''
            this.form.reason = ''
          }
          this.$message(res.message);
        })
      },
      handleSizeChange(val){
        this.form.page_size = val
        this._getSupplier()
      },
      handleCurrentChange(val){
        this.form.current_page = val
        this._getSupplier()
      }
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
    max-width: 240px;
    margin-right: 5px;
  }
  .el-date-picker{
    max-width: 240px;
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
.detail{
    font-size: 14px;
    color: #606266;
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
.fuzhi{
  background:rgba(229,162,75,1);
}
 .huishouzhan{
   background:rgba(247,108,110,1);
 }
   .small_top{
    margin-top: 10px;
  }
</style>
