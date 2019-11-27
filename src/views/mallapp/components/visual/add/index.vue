<template>
   <div>
    <div class="contain margin"   >
        <div class="mbottom" style="position: relative;">
          <div class="goods-fitter">
                <h4 class="title">导航栏设置</h4>
          </div>
        </div>
      <!-- 第一个 -->
      <div class="loading_div"   v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading" style="min-height: 700px;">
        <div v-for="(item,index) in navigation" :key="item.barId" class="general" >
          <el-checkbox v-model="item.isShow" @change="handleCheckAllChange($event,item)">
            <div class="jiayong">{{item.barName}}</div>
          </el-checkbox>
          <i class="el-icon-menu" @click="ediot(item)"></i>
          <div class="topR">
            <span class="imgT" @click="newNavigation(item.barId)">
              <img src="@/common/images/icon/新增.png" alt />&nbsp;&nbsp;新增
            </span>
            <span class="imgT" @click="deleteNavigationbartree(item.barId)">
              <img src="@/common/images/icon/删除.png" alt />&nbsp;&nbsp;删除
            </span>
            <span class="imgT" @click="hideNavigation(item,index)" v-if="item.packUp">
              <img src="@/common/images/icon/收起.png" alt />&nbsp;&nbsp;收起
            </span>
            <span class="imgT" @click="hideNavigation(item,index)" v-else>
              <img src="@/common/images/icon/收起.png" alt />&nbsp;&nbsp;展开
            </span>
          </div>
          <div class="line" style=""></div>
          <div v-for="val in item.children" :key="val.barId" class="line_div" v-if="item.show">
            <el-checkbox v-model="val.isShow" @change="handleCheckedCitiesChange($event,item,val)">
              <span class="color_bg">{{val.barName}}</span>
            </el-checkbox>
            <i class="el-icon-menu" @click="ediot(val)"></i>
            <div class="name_div">
              <span v-for="data in val.children" :key="data.barId" class="name_span">
                <el-checkbox v-model="data.isShow" @change="threeLevelNavigationMenu($event,data)">{{data.barName}}</el-checkbox>
                <i class="el-icon-menu" @click="ediot(data)"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="bottom">
        <el-button type="danger" @click="reset">重置</el-button>
        <el-button type="primary" @click="determine">确定</el-button>
      </div> -->

      <!-- 新建导航栏 -->
      <el-dialog :title="title" :visible.sync="agentVisible" width="700px" :before-close="handleClose">
        <el-form :data="agentForm" label-width="120px" ref="agentForm">
          <div class="popup-window">
            <el-form-item label="导航栏名称：" prop="name">
              <el-input
                v-model="agentForm.barName"
                placeholder="请输入内容"
                size="medium"
                class="input-with-select"
              ></el-input>
            </el-form-item>
            <el-form-item label="上级导航：" prop="name" class="treeheight">
              <treeselect
                @input="topslect"
                v-model="agentForm.parentId"
                style="width:400px"
                :options="classification"
                placeholder="请选择商品分类"
                :clearable="false"
              />
            </el-form-item>
            <el-form-item label="关联分类：" prop="name" class="treeheight">
              <el-row>
                <el-col :span="6">
                  <el-select
                    v-model="agentForm.brand"
                    size="medium"
                    placeholder="请选择"
                    @change="associated"
                  >
                    <el-option
                      v-for="item in brands"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="13">
                  <treeselect
                    :multiple="true"
                    :flat="true"
                    :limit="3"
                    :default-expand-level="1"
                    v-model="agentForm.categoryIds"
                    style="width: 95%; margin-left: 20px;"
                    :options="multiselectArr"
                    placeholder="请选择商品分类"
                    :clearable="false"
                    @deselect="slectree"
                    @input="slectree"
                  />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="分类名称：" prop="name">
              <div v-for="item in categoryArr" :key="item.value" class="class_div">
                <el-checkbox v-model="item.isShow">
                  <span class="class_name">{{item.name}}</span>
                </el-checkbox>
                <div style="overflow:auto">
                  <span class="car_span" v-for="(val,index) in item.arr" :key="val.barId">
                    {{val.catName}}
                    <span class="delete-specif" @click="deleitem(item,index)">
                      <span class="error">×</span>
                    </span>
                  </span>
                </div>
              </div>
            </el-form-item>
            <!--编辑导航栏操作按钮-->
            <div class="edit-navigation-bar" v-if="this.title === '编辑导航栏'">
              <label>删除此导航栏：</label>
              <el-checkbox v-model="checked">勾选删除此导航栏</el-checkbox>
            </div>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click.native="agentVisible = false" size="small">取消</el-button>
          <el-button type="primary" @click.native="agentSubmit" :loading="addLoading" size="small">确定</el-button>
        </div>
      </el-dialog>


      <!--删除导航栏-->
      <el-dialog title="删除导航栏" :visible.sync="centerDialogVisible" width="30%">
        <span>是否确定删除导航栏</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="centerDialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteNavigationbartree('',true)" size="small">确 定</el-button>
        </span>
      </el-dialog>
      

      <!-- 回到顶部 -->
      <el-backtop target=".contain" :bottom="100">
      <div
        style="{
          height: 100%;
          width: 100%;
          background-color: #f2f5f6;
          box-shadow: 0 0 6px rgba(0,0,0, .12);
          text-align: center;
          line-height: 40px;
          color: #1989fa;
        }"
      >
        UP
      </div>
    </el-backtop>
    </div>
  </div>  
</template>

<script>
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
const cityOptions = ["上海", "北京", "广州", "深圳"];
import {
  navigationbartree,
  deleteNavigationbartree,
  navigationbarsave,
  categorycategory,
  findbyid,
  findcatbyid,
  navigationbarupdate,
  navigationAccording
} from "@/api/mallapp/visual";
export default {
  data() {
    return {
      loading: true,
      checkAll: false,
      barId: "",
      secondary: false,
      childrenCheckAll: false,
      centerDialogVisible: false,
      checkedCities: [],
      navigation: [],
      multiselectArr: [],
      title: "新增导航栏",
      categoryArr: [
        { name: "自营", value: 1, isShow: true, arr: [], type: "selfCat" },
        { name: "网易", value: 2, isShow: true, arr: [], type: "yxCat" },
        { name: "京东", value: 3, isShow: true, arr: [], type: "jdCat" },
        { name: "苏宁", value: 4, isShow: true, arr: [], type: "selfCat" }
      ],
      agentVisible: false,
      agentForm: {
        barName: "",
        parentId: 1,
        brand: "",
        categoryIds: [],
        barClass: 0
      },
      addLoading: false,
      input: "",
      options: [],
      value: "",
      goods: [],
      brands: [
        { value: 1, label: "自营" },
        { value: 2, label: "网易" },
        { value: 3, label: "京东" },
        { value: 4, label: "苏宁" }
      ],
      commodityCategories: "",
      classification: [],
      cities: cityOptions,
      checked: false,
    
    };
  },
  methods: {
    async ediot(val) {
      console.log(val)
      this.title = "编辑导航栏";
      this.classification = JSON.parse(JSON.stringify(this.navigation));
      this.deletechild(this.classification);
      this.transleteData(this.classification);
      const arr = [{ id: 1, value: 1, label: "所有分类", class: 1 }];
      arr[0].children = this.classification;
      this.classification = arr;
      this.agentVisible = true;
      const { data } = await findbyid(val.barId);
      console.log(data)
      this.agentForm = data;
      const msg = await findcatbyid(val.barId);
      console.log(msg.data.selfCat);
      this.categoryArr.forEach(item => {
        if (item.value == 1) {
          item.arr = msg.data.selfCat;
        }
        if (item.value == 2) {
          item.arr = msg.data.yxCat;
        }
        if (item.value == 3) {
          item.arr = msg.data.jdCat;
        }
        if (item.value == 4) {
          item.arr = msg.data.snCat;
        }
      });
    },
    handleClose(){
      this.agentForm.barName = ''
      this.categoryArr =  [
        { name: "自营", value: 1, isShow: true, arr: [], type: "selfCat" },
        { name: "网易", value: 2, isShow: true, arr: [], type: "yxCat" },
        { name: "京东", value: 3, isShow: true, arr: [], type: "jdCat" },
        { name: "苏宁", value: 4, isShow: true, arr: [], type: "selfCat" }
      ]
      this.agentForm.parentId = 1
      this.agentForm.barClass = 0
      this.multiselectArr = []
      this.classification = []
      this.agentForm.categoryIds = []
      this.agentVisible = false
      this.agentForm.brand = ''
    },
    topslect(val) {
      this.classification.forEach(item => {
        if (item.barId == val) {
          this.agentForm.barClass = item.barClass;
        }
        item.children.forEach(data => {
          if (data.barId == val) {
            this.agentForm.barClass = data.barClass;
          }
          data.children.forEach(msg => {
            if (msg.barId == val) {
              this.agentForm.barClass = msg.barClass;
            }
          });
        });
      });
    },
    slectree(val) {
      let arr = [];
      
      if (val.length) {
        val.forEach(item => {
          this.multiselectArr.forEach(data => {
            if (data.catId == item) {
              arr.push(data);
            }
                if (data.children != undefined) {
                  data.children.forEach(val => {
                    if (val.catId == item) {
                      arr.push(val);
                    }
                    if (val.children && val.children.length > 0) {
                      val.children.forEach(msg => {
                        if (msg.catId == item) {
                          arr.push(msg);
                        }
                      });
                    }
                  });
                }
            
            
          });
        });
      }
      if ((this.title === "编辑导航栏")) {
        this.categoryArr.forEach(item => {
          if (item.value == this.agentForm.brand) {
            arr.forEach(msg => {
              item.arr.push(msg);
              console.log(item.arr)
            });
            this.heavy(item.arr)
          }
        });
      } else {
        this.categoryArr.forEach(item => {
          if (item.value == this.agentForm.brand) {
            item.arr = arr;
            this.heavy(item.arr)
            console.log(item.arr)
          }
        });
      }
    },
    //数组去重
    heavy(data) {
      let arr = data;
      console.log(data)
      let result = [];
      for (var k = 0; k < arr.length; k++) {
        for (var j = k + 1; j < arr.length; j++)
          if (arr[k].catId === arr[j].catId) {
            //如果第一个等于第二个，splice方法删除第二个
            arr.splice(j, 1);
            j--;
          }
      }
    },
    //递归增加
    recursiveadd(data, arr, val) {
      console.log(data);
      data.forEach(item => {
        arr.forEach(msg => {
          if (msg.catId == item) {
            val.push(msg);
          }
          if (msg.children && msg.children.length > 0) {
            this.recursiveadd(data, msg.children, arr);
          }
        });
      });
      return val;
    },
    //监听一级菜单是否勾选
    async handleCheckAllChange(val, item) {  
      if(item.isShow === true){
         var  arr = item.children;
         var navigationBars = [];
         const obj2 = Object.assign({});
          obj2.barId = item.barId;
          obj2.isShow = 1;
          navigationBars.push(obj2)
         arr.forEach(item => {
            item.isShow = true;
            const obj = Object.assign({});
            obj.barId = item.barId;
            obj.isShow = 1;
            navigationBars.push(obj)
            var arr1 = item.children;
            arr1.forEach(item => {
              item.isShow = true;
              const obj1 = Object.assign({});
              obj1.barId = item.barId;
              obj1.isShow = 1;
              navigationBars.push(obj1)
            })           
          });
          // console.log(newArr)
          let data
          const obj3 = Object.assign({navigationBars});
          data = await navigationAccording(obj3);
          return arr; 
              
      }else{
         var  arr = item.children;
         var navigationBars = [];
         const obj2 = Object.assign({});
          obj2.barId = item.barId;
          obj2.isShow = 0;
          navigationBars.push(obj2)
         arr.forEach(item => {
            item.isShow = false;
            const obj = Object.assign({});
            obj.barId = item.barId;
            obj.isShow = 0;
            navigationBars.push(obj)
            var arr1 = item.children;
            arr1.forEach(item => {
              item.isShow = false;
              const obj1 = Object.assign({});
              obj1.barId = item.barId;
              obj1.isShow = 0;
              navigationBars.push(obj1)              
            })          
          });
          // console.log(newArr) 
          let data
          const obj3 = Object.assign({navigationBars});
          data = await navigationAccording(obj3);
          return arr;
          
      }
      if (val) {
        item.checkAll = true;
        item.secondary = item.children;
      } else {
        item.isIndeterminate = false;
        item.secondary = [];
      }
    },
    //监听二级菜单函数
    async handleCheckedCitiesChange(value, item, val) {
      // console.log(value);
      console.log(val.barId)
      if(val.isShow === true){
        var navigationBars = [];
        const obj2 = Object.assign({});
        obj2.barId = val.barId;
        obj2.isShow = 1;
        navigationBars.push(obj2)   
         var  arr = val.children;
         arr.forEach(val => {
            val.isShow = true;
            const obj = Object.assign({});
            obj.barId = val.barId;
            obj.isShow = 1;
            navigationBars.push(obj)
          });
          let data
          const obj3 = Object.assign({navigationBars});
          data = await navigationAccording(obj3);
          return arr;
      }else{
        var navigationBars = [];
        const obj2 = Object.assign({});
        obj2.barId = val.barId;
        obj2.isShow = 0;
        navigationBars.push(obj2) 
         var  arr = val.children;
         arr.forEach(val => {
            val.isShow = false;
            const obj = Object.assign({});
            obj.barId = val.barId;
            obj.isShow = 0;
            navigationBars.push(obj)
          });
          let data
          const obj3 = Object.assign({navigationBars});
          data = await navigationAccording(obj3);
          return arr;
      }
      // console.log(val);
      //编辑
      // this.agentVisible = true;
    },
    //监听三级菜单是否勾选
    async threeLevelNavigationMenu(value,data){
    // console.log(data.barId)
    // console.log(data.isShow)
    // console.log(data)
    // console.log(value)
        var msg = data
         if(msg.isShow === true){
          //  console.log(msg)
            var navigationBars = [];
            const obj2 = Object.assign({});
            obj2.barId = msg.barId;
            obj2.isShow = 1;
            navigationBars.push(obj2)
            let data
            const obj3 = Object.assign({navigationBars});
            data = await navigationAccording(obj3);
         }else{
          //  console.log(msg)
            var navigationBars = [];
            const obj2 = Object.assign({});
            obj2.barId = msg.barId;
            obj2.isShow = 0;
            navigationBars.push(obj2)
            let data
            const obj3 = Object.assign({navigationBars});
            data = await navigationAccording(obj3);
         }
         
          
      
       
    },
    treeclassification(value, item, val) {
      // item.isIndeterminate = true
      // val.isIndeterminate = true
      if (value.length === val.children.length) {
        item.secondary.push(val);
        // val.checkAll = true
      } else {
        val.checkAll = false;
      }
      console.log(value);
      console.log(item);
      console.log(val);
    },
    async navigationbartree() {
      const { data } = await navigationbartree(1);
      data.forEach(item => {
        item.show = true;
        item.packUp = true;
      });
      this.navigation = data;
      this.conversion(this.navigation);
    },
    async associated(val) {
      this.agentForm.categoryIds = [];
      const { data } = await categorycategory(val);
      this.multiselectArr = data;
      this.transleteData2(this.multiselectArr);
      this.IterationDelateMenuChildren(this.multiselectArr);
    },
    conversion(arr) {
      arr.forEach(item => {
        item.show = true;//菜单展开收起
        item.packUp = true;
        item.isShow === 1 ? (item.isShow = true) : (item.isShow = false);
        if (item.children && item.children.length > 0) {
          this.conversion(item.children);
        }
      });
      return arr;
    },
    //删除导航栏操作
    async deleteNavigationbartree(barId, type) {
      if (barId) {
        this.barId = barId;
        this.centerDialogVisible = true;
      }
      if (type) {
        const data = await deleteNavigationbartree(this.barId);
        if (data.code == 200) {
          this.centerDialogVisible = false;
          this.$message({
            message: data.message,
            type: "success"
          });
          this.navigationbartree();
          this.checked = false;
          this.agentForm.barName = '';
          this.agentForm.parentId = 1;
          this.agentForm.brand = '';
          this.agentForm.categoryIds = [];
          this.categoryArr =  [
          { name: "自营", value: 1, isShow: true, arr: [], type: "selfCat" },
          { name: "网易", value: 2, isShow: true, arr: [], type: "yxCat" },
          { name: "京东", value: 3, isShow: true, arr: [], type: "jdCat" },
          { name: "苏宁", value: 4, isShow: true, arr: [], type: "selfCat" }
        ];
        }
      }
    },
    //新增导航栏
    newNavigation(barId) {
      this.title = "新增导航栏";
      this.classification = JSON.parse(JSON.stringify(this.navigation));
      this.deletechild(this.classification);
      this.transleteData(this.classification);
      const arr = [{ id: 1, value: 1, label: "所有分类", class: 1 }];
      arr[0].children = this.classification;
      this.classification = arr;
      this.agentVisible = true;
    },
    transleteData(arr) {
      arr.forEach(item => {
        item.id = item.barId;
        item.label = item.barName;
        item.value = item.barId;
        if (item.children && item.children.length > 0) {
          this.transleteData(item.children);
        }
      });
      return arr;
    },
    transleteData2(arr) {
      arr.forEach(item => {
        item.id = item.catId;
        item.label = item.catName;
        item.value = item.catId;
        if (item.children && item.children.length > 0) {
          this.transleteData2(item.children);
        }
      });
      return arr;
    },
    //删除三级数组
    deletechild(arr) {
      arr.forEach(item => {
        item.children.forEach(data => {
          delete data.children;
        });
      });
      return arr;
    },
    //删除多余children数组
    IterationDelateMenuChildren(arr) {
      if (arr.length) {
        for (let i in arr) {
          if (arr[i].children.length) {
            this.IterationDelateMenuChildren(arr[i].children);
          } else {
            delete arr[i].children;
          }
        }
      }
      return arr;
    },
    //导航栏提交
    async agentSubmit() {
      if(!this.agentForm.barName){
        this.$message({
          message: '导航栏名称不能为空!',
          type: 'warning'
        });
        return false
      }
      const obj = Object.assign({}, this.agentForm);
      obj.barStatus = 0;
      obj.isShow = 1;
      obj.jdCat = {
        catIds: [],
        isSearch: 0
      };
      this.categoryArr.forEach(item => {
        if (item.value == 1) {
          const samllarr = [];
          item.arr.forEach(msg => {
            samllarr.push(msg.catId);
          });
          obj.selfCat = {
            catIds: samllarr,
            isSearch: item.isShow ? 0 : 1
          };
        }
        if (item.value == 2) {
          const samllarr = [];
          item.arr.forEach(msg => {
            samllarr.push(msg.catId);
          });
          obj.yxCat = {
            catIds: samllarr,
            isSearch: item.isShow ? 0 : 1
          };
        }
        if (item.value == 3) {
          const samllarr = [];
          item.arr.forEach(msg => {
            samllarr.push(msg.catId);
          });
          obj.jdCat = {
            catIds: samllarr,
            isSearch: item.isShow ? 0 : 1
          };
        }
        if (item.value == 4) {
          const samllarr = [];
          item.arr.forEach(msg => {
            samllarr.push(msg.catId);
          });
          obj.snCat = {
            catIds: samllarr,
            isSearch: item.isShow ? 0 : 1
          };
        }
      });
      let data
      if(this.title === "编辑导航栏"){
        //如果勾选删除按钮执行删除导航栏操作
        if(this.checked === true){
          console.log(obj)
          this.agentVisible = false;
          this.deleteNavigationbartree(obj.barId);  
        }else{
          console.log(obj)
          data = await navigationbarupdate(obj);
        }    
      }else{
        data = await navigationbarsave(obj);
      }
      if (data.code === 200) {
        this.$message({
          message: data.message,
          type: "success"
        });
        this.navigationbartree();
        this.agentVisible = false;
        this.agentForm.barName = '';
        this.agentForm.parentId = 1;
        this.agentForm.brand = '';
        this.agentForm.categoryIds = [];
        this.classification = [];
        this.multiselectArr = [];
        this.categoryArr =  [
        { name: "自营", value: 1, isShow: true, arr: [], type: "selfCat" },
        { name: "网易", value: 2, isShow: true, arr: [], type: "yxCat" },
        { name: "京东", value: 3, isShow: true, arr: [], type: "jdCat" },
        { name: "苏宁", value: 4, isShow: true, arr: [], type: "selfCat" }
      ];
      }
    },
    //删除导航栏
    // deleteNavigation(barId) {
    //   this.$confirm("此操作将永久删除该导航栏, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       this.deleteNavigationbartree(barId);
    //       this.$message({
    //         type: "success",
    //         message: "删除成功!"
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    // },
    //收起导航栏
    hideNavigation(item) {
      // console.log(item);
      item.show = !item.show;
      if(item.show === true){
        item.packUp = true;
      }else{
        item.packUp = false;
      }
      
    },
    //页面重置按钮
    reset() {
      alert('重置按钮操作')
    },
    //页面确定按钮
    determine() {
      alert('保存操作')
    },
    deleitem(data, index) {
      data.arr.splice(index, 1);
    }
  },
  async mounted() {
   await  this.navigationbartree();
   this.loading = false;
  },
  components: {
    Treeselect
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.popup-window > div {
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.popup-window > div > label {
  float: left;
  width: 80px;
}
/deep/ .el-input {
  float: left;
}
/deep/ .input-with-select {
  width: 400px;
}
.contain {
  margin: 30px;
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
  background: rgba(76, 134, 244, 1);
  border-radius: 3px;
  padding: 10px 20px;
}

.topR {
  float: right;
  margin-top: 35px;
}

.imgT {
  margin-right: 20px;
  padding: 8px 18px;
  border-radius: 4px;
  cursor: pointer;
  color: #e6a23c;
  background: #fdf6ec;
  border: 1px solid #f5dab1;
}
.imgT  img{
  padding: 0 5px 0 0;
  position: relative;
  top: 1px;
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
  color: #4c86f4;
}
.line_div {
  padding: 0 20px;
}
.name_div {
  padding-left: 20px;
}
/deep/ .el-checkbox {
  margin-top: 30px;
  margin-right: 10px;
}
/deep/ .popup-window .el-checkbox {
  margin-top: 0px;
}
.line {
  width: 100%;
  margin: 20px 0;
  height: 1px;
  border: 1px dashed rgba(177, 213, 252, 1);
  margin-bottom: 10px;
}
/deep/ .treeheight .el-form-item__content {
  line-height: 36px;
}
/deep/ .popup-window > div {
  width: 100%;
  line-height: 50px;
  height: auto;
}
.class_name {
  padding: 10px 17px;
  background: rgba(76, 134, 244, 1);
  color: white;
  border-radius: 3px;
}
.class_div {
  margin-top: 20px;
}
.class_div:first-child {
  margin-top: 0;
}
.car_span {
  padding: 0 20px;
  background: rgba(241, 248, 255, 1);
  border-radius: 4px;
  margin: 13px;
  margin-top: 10px;
  position: relative;
  float: left;
}
.delete-specif {
  width: 0;
  height: 0;
  display: inline-block;
  border: 11px solid;
  border-color: transparent #4a99fa #4a99fa transparent;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: default;
}
.error {
  width: 7px;
  height: 7px;
  position: absolute;
  right: -7px;
  bottom: 9px;
  color: white;
}
.name_span {
  position: relative;
  .el-icon-menu {
    margin-right: 10px;
  }
}
.edit-navigation-bar > label{
  width: 120px !important;
  text-align: right;
  vertical-align: middle;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.mbottom{
  margin-bottom: 20px;
}
.mbottom .goods-fitter .title{
  margin-left: -20px;
  font-size: 16px;
  font-weight: 400;
  color: 3333;
  padding-left: 10px;
  line-height: 1.4;
  border-left: 4px solid #4C86F4;
  margin-bottom: 10px;
}
.goods-fitter {
  padding: 20px;
  border: 1px solid #d7e0f1;
  background: #fff;
}
.general{
  border: 1px solid #d7e0f1;
  background: #fff;
  margin-bottom: 20px;
  padding: 0 20px 30px;
}

</style>

<style scoped>
.edit-navigation-bar >>> .el-checkbox__inner{
  border-radius: 50%;
}
.edit-navigation-bar >>> .el-checkbox__label{
  color: #f56c6c;
}
</style>