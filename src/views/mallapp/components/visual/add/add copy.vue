<template>
  <div class="contain">
    <h4 class="h4">导航栏设置</h4>
    <!-- 第一个 -->
    <div class="padding">
      <div v-for="(item,index) in navigation" :key="item.barId">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange($event,item)"
        >
          <div class="jiayong">{{item.barName}}</div>
        </el-checkbox>
        <div class="topR">
          <span class="imgT" @click="newNavigation(item.barId)">
            <img src="../../../../../common/images/icon/新增.png" alt />&nbsp;&nbsp;新增
          </span>
          <span class="imgT" @click="deleteNavigation(item.barId)">
            <img src="../../../../../common/images/icon/删除.png" alt />&nbsp;&nbsp;删除
          </span>
          <span class="imgT" @click="hideNavigation(item,index)">
            <img src="../../../../../common/images/icon/收起.png" alt />&nbsp;&nbsp;收起
          </span>
        </div>
        <hr />
        <div style="margin: 15px 15px 15px 200px;"></div>
        <div v-for="val in item.children" :key="val.barId" class="line_div" v-show="isshow">
          <el-checkbox-group v-model="item.secondary" @change="handleCheckedCitiesChange($event,item)">
              <el-checkbox :label="val.barId">
                <span class="color_bg">{{val.barName}}</span>
              </el-checkbox>
        </el-checkbox-group>
          <div class="name_div">
             <el-checkbox v-model="item.childrenCheckAll" v-for="data in val.children" :key="data.barId">{{data.barName}}</el-checkbox>   
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <el-button type="danger" @click="reset">重置</el-button>
      <el-button type="primary" @click="determine">确定</el-button>
    </div>

    <!-- 新增导航栏 -->
    <el-dialog title="新增导航栏" :visible.sync="agentVisible" :close-on-click-modal="false">
			<el-form :data="agentForm" label-width="140px" ref="agentForm">
				<div class="popup-window">
          <div><label>导航栏名称:</label><el-input v-model="input" placeholder="请输入内容" class="input-with-select"></el-input></div>
          <div>
            <label>上级导航:</label>
            <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
          </div>
          <div>
            <label>关联分类:</label>
            <el-select v-model="brand" multiple placeholder="请选择">
              <el-option
                v-for="item in brands"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select
              v-model="commodityCategories"
              multiple
              collapse-tags
              style="margin-left: 20px;"
              placeholder="请选择">
              <el-option
                v-for="item in goods"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>   
          </div>
          <div>
            <label>分类名称:</label>
            <el-checkbox-group v-model="classification">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="agentVisible = false">取消</el-button>
				<el-button type="primary" @click.native="agentSubmit" :loading="addLoading">确定</el-button>
			</div>
		</el-dialog>

  </div>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
import { navigationbartree, deleteNavigationbartree } from "@/api/mallapp/visual";
export default {
  data() {
    return {
      checkAll: false,
      secondary: false,
      childrenCheckAll: false,
      checkedCities: [],
      navigation: [],
      isIndeterminate: true,
      agentVisible: false,
      agentForm: [],
      addLoading: false,
      input: '',
      options: [],
      value: '',
      goods: [],
      brand: '',
      brands: [{
          value: '1',
          label: '自营'
        }, {
          value: '2',
          label: '网易严选'
        }, {
          value: '3',
          label: '京东'
        }, {
          value: '4',
          label: '苏宁'
        }],
      commodityCategories: '',
      classification: [],
      cities: cityOptions,
      isshow: true,
    };
  },
  methods: {
    handleCheckAllChange(val,item) {
      // console.log(val)
      // console.log(item)
      const arr = []
      item.children.forEach(element => {
        arr.push(element.barId)
      });
      item.secondary = arr
      this.secondary = true
      item.childrenCheckAll = true
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      this.childrenCheckAll = true
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.navigation.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.navigation.length;
    },
    async navigationbartree() {
      const { data } = await navigationbartree(1);
      this.navigation = data;
      data.forEach(element => {
        element.isIndeterminate = false
        element.secondary = []
      });
      // console.log(data);
    },
    async deleteNavigationbartree(barId) {
      const {data} = await deleteNavigationbartree(barId);
    },
    //新增导航栏
    newNavigation(barId){
      this.agentVisible = true;
    },
    //新增导航栏提交
    agentSubmit(){

    },
    //删除导航栏
    deleteNavigation(barId){
      this.$confirm('此操作将永久删除该导航栏, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.deleteNavigationbartree(barId);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    //收起导航栏
    hideNavigation(item,index){
      console.log(item)
      console.log(index)
      this.isshow =! this.isshow;
    },
    //页面重置按钮
    reset(){

    },
    //页面确定按钮
    determine(){

    }
  },
  created() {
    this.navigationbartree();
  }
};
</script>

<style lang="scss" scoped>
.popup-window > div{
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.popup-window > div > label{
  float: left;
  width: 80px;
}
/deep/ .el-input{
  float: left;
}
/deep/ .input-with-select{
  width: 217px;
}
.contain {
  margin: 30px;
  background-color: #fff;
  border: 1px solid #ccc;
}
.h4 {
  margin: 30px 0 0 40px;
  padding-top: 35px;
}

.padding {
  padding: 50px 100px;
}

.jiayong {
  color: #fff;
  vertical-align: center;
  border-radius: 5px;
  background:rgba(76,134,244,1);
  border-radius:3px;
  padding: 10px 20px;
}

.topR {
  float: right;
  margin-top: 35px;
}

.imgT {
  margin-right: 20px;
}

.bottom {
  display: flex;
  justify-content: center;
  margin-bottom: -50px;
}

/* form表单 */
.form {
  position: absolute;
  width: 500px;
  height: 500px;
  background-color: #fff;
}
.color_bg {
  background: rgba(241, 248, 255, 1);
  border-radius: 3px;
  padding: 10px 20px;
  color:#4C86F4;
}
.line_div {
  padding: 0 20px;
  margin-top: 20px;
}
.name_div{
  padding-left: 20px;
}
/deep/ .el-checkbox{
  width: 150px;
  margin-top: 30px;
}
</style>