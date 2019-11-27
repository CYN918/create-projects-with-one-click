<template>
  <div id="mail">
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">邮件管理</h4>
            <div class="search-base">
             
              
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mcard">
      <el-form label-width="100px" size="small">
        <el-row class="operate mbottom">
          <el-col :span="15">
              <!-- <el-button type="primary">仅挑选</el-button> -->
              <el-button type="primary" size="small" @click="addData" v-permit="'add:mail'">新增</el-button>
              <el-button type="primary" size="small" @click="editData" v-permit="'edit:mail'">编辑</el-button>
              <el-button type="primary" size="small" @click="dataDetail" v-permit="'view:mail'">详情</el-button>
              <el-button type="primary" size="small" v-permit="'send:mail'">发送</el-button>
              <el-button type="primary" size="small" @click="deleteData" v-permit="'remove:mail'">删除</el-button>
          </el-col>
          <el-col :span="5">
                      <el-col>
                          <el-form-item>
                              <el-col :span="23">
                                  <el-input v-model="input" placeholder="请输入行业名称"></el-input>
                              </el-col>
                          </el-form-item>
                      </el-col>
                  </el-col>
          <el-col :span="1" class="btn_right">
                      <el-button type="primary" size="small" @click='serch(true)' >查询</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table   :data="dataArr"  border style="width: 100%" stripe
      @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column    label="状态" align="center">
              <template slot-scope="scope">
                    <div class="txt_red" v-if="scope.row.sendStatus==0">
                        {{scope.row.sendStatus | send}}
                    </div>
                    <div class="txt_black" v-if="scope.row.sendStatus!==0">
                        {{scope.row.sendStatus | send}}
                    </div>
                 
                  </template>
        </el-table-column>
        <el-table-column label="收件人邮箱" align="center">
              <template slot-scope="scope">

                    <div class="txt_black" v-for="(item,index) in scope.row.to"
                    :key="index">
                        {{item}}
                    </div>
                 
                  </template>
        </el-table-column>
        <el-table-column  label="主题" align="center">
              <template slot-scope="scope">
                    <div class="txt_black">
                        {{scope.row.subject}}
                    </div>
                 
            </template>
        </el-table-column>
        <el-table-column   label="添加时间  " align="center">
              <template slot-scope="scope">
                    <div class="txt_black">
                        {{scope.row.createTime}}
                    </div>
                 
            </template>    
        </el-table-column>
        <el-table-column   label="添加成员" align="center" >
               <template slot-scope="scope">
                    <div class="txt_black">
                        {{scope.row.senderName}}
                    </div>
                 
            </template>
        </el-table-column>
       
    </el-table>
      <div class="pagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="tableData.currentPage"
            :page-sizes="tableData.sizes"
            :page-size="tableData.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.total">
            </el-pagination>
      </div>
      
    </div>
    <div class="margin">
    <div class="msetting-account-wrapper" style="margin-left: -40px;">
    
    </div>
  </div>
 <!--  //新增邮箱  -->
  <el-dialog
      title="新增邮件"
      :visible.sync="addVisible"
      width="70%"
      >
      <div class="mail-fitter">
     <el-form label-width="100px" size="small">
          <div class="mail-wrapper">
            <h4 class="title1">邮件信息</h4>
            <div class="search-base">
                    <el-row class="warp">
      
<!--
Form 组件提供了表单验证的功能，只需要通过 rule 属性传入约定的验证规则，并 Form-Item 的 prop 属性设置为需校验的字段名即可。具体可以参考官网：http://element.eleme.io/#/zh-CN/component/form
-->
      <el-col :span="24" class="warp-main">
        <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="120px" size="small">
          <el-row>
          <el-col :span='12'>
          <el-form-item label="选择发送邮箱：" prop="a_title1">
            <el-select placeholder="请选择" v-model="sendMail">
              <el-option
                v-for="item in formData"
                :key="item.id"
                :label="item.sendName"
                :value="item.id">
              </el-option>
            </el-select>
 
          </el-form-item>
          </el-col>
         </el-row>
         
         <el-row>
          <el-col>
          <el-form-item label="收件人:" prop="a_title1">
           <el-col :span='12'>
            <el-input v-model="infoForm.mail"
            placeholder="请输入邮件"></el-input>
      
           </el-col>
           <el-col :span="6" :offset="1">
              <el-button type="primary" size="small" @click="addCC">添加抄送</el-button>
              <el-button type="primary" size="small" @click="addBCC">添加密送</el-button>
           </el-col>
          </el-form-item>
          </el-col>
         </el-row>
         <el-row>
           <el-col>
             <el-form-item label="抄送:" prop="a_source" v-show="show1==true">
            <el-col :span="12">
              <el-input v-model="infoForm.cc"
              ></el-input>
            </el-col>
            <el-col :span="12">
            <i class="delete el-icon-delete" @click="deleteCC"></i>
            </el-col>
          </el-form-item>
           </el-col>
          </el-row>
          <el-row>
           <el-col>
             <el-form-item label="密送:" prop="a_source" v-show="show2==true">
           <el-col :span="12">
            <el-input v-model="infoForm.bcc"
            ></el-input>
           </el-col>
            <el-col :span="12">
            <i class="delete el-icon-delete" @click="deleteBCC"></i>
          </el-col>
          </el-form-item>
         
           </el-col>
          </el-row>
          <el-row>
           <el-col>
          <el-form-item label="主题" prop="a_source">
            <el-col :span="12" >
            <el-input v-model="infoForm.title"
            placeholder="请输入主题"></el-input>
            </el-col>
            <el-col :span="12">
            <el-upload
              class="upload-demo"
              :action='this.baseUrl1+"/api/open/b/b2b2c/fileservice/uploadFile"'
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSucces"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
              </el-col>
          </el-form-item>
          </el-col>
          </el-row>
<!--使用编辑器
-->       <el-row>
          <el-form-item label="邮件内容">
            <div class="edit_container">
              <quill-editor v-model="infoForm.content"
                            ref="myQuillEditor"
                            class="editer"
                            @ready ="addOnEditorReady($event)"
                             @focus="onEditorReady($event)">
              </quill-editor>
            </div>
          </el-form-item>
          </el-row>

         
        </el-form>
      </el-col>


    </el-row>
              
            </div>
          </div>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="addCancel()" size="small">取 消</el-button>
        <el-button type="primary" @click="onSubmit()" size="small">立刻发送</el-button>
        <el-button type="primary" @click="saveAdd()" size="small">保存</el-button>
      </span>
    </el-dialog>
    <!--  编辑邮箱  -->
  <el-dialog
      title="编辑邮件"
      :visible.sync="editVisible"
      width="70%"
      >
      <div class="mail-fitter">
     <el-form label-width="100px" size="small">
          <div class="mail-wrapper">
            <h4 class="title1">邮件信息</h4>
            <div class="search-base">
                    <el-row class="warp">
      
<!--
Form 组件提供了表单验证的功能，只需要通过 rule 属性传入约定的验证规则，并 Form-Item 的 prop 属性设置为需校验的字段名即可。具体可以参考官网：http://element.eleme.io/#/zh-CN/component/form
-->
      
   <el-col :span="24" class="warp-main">
        <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="120px">
          <el-row>
          <el-col :span='12'>
          <el-form-item label="选择发送邮箱：" prop="a_title1">
            <el-select placeholder="请选择" v-model="detailDatas.senderName">
              <el-option
                v-for="item in formData"
                :key="item.id"
                :label="item.sendName"
                :value="item.sendName">
              </el-option>
            </el-select>
 
          </el-form-item>
          </el-col>
         </el-row>
         
         <el-row>
          <el-col>
          <el-form-item label="收件人:" prop="a_title1">
           <el-col :span='12'>
            <el-input v-model="detailDatas.to"
            placeholder="请输入邮件"></el-input>
      
           </el-col>
           <el-col :span="6" :offset="1">
              <el-button type="primary" size="small" @click="addCC">添加抄送</el-button>
              <el-button type="primary" size="small" @click="addBCC">添加密送</el-button>
           </el-col>
          </el-form-item>
          </el-col>
         </el-row>
         <el-row>
           <el-col>
             <el-form-item label="抄送:" prop="a_source" v-show="show1==true">
            <el-col :span="12">
              <el-input v-model="detailDatas.cc"
              ></el-input>
            </el-col>
            <el-col :span="12">
            <i class="delete el-icon-delete" @click="deleteCC"></i>
            </el-col>
          </el-form-item>
           </el-col>
          </el-row>
          <el-row>
           <el-col>
             <el-form-item label="密送:" prop="a_source" v-show="show2==true">
           <el-col :span="12">
            <el-input v-model="detailDatas.bcc"
            ></el-input>
           </el-col>
            <el-col :span="12">
            <i class="delete el-icon-delete" @click="deleteBCC"></i>
          </el-col>
          </el-form-item>

           </el-col>
          </el-row>
          <el-row>
           <el-col>
          <el-form-item label="主题" prop="a_source">
            <el-col :span="12" >
            <el-input v-model="detailDatas.subject"
            placeholder="请输入主题"></el-input>
            </el-col>
            <el-col :span="12">
                       <el-col :span="12">
            <el-upload
              class="upload-demo"
              :action="action"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSucces"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
              </el-col>
              </el-col>
          </el-form-item>
          </el-col>
          </el-row>
<!--使用编辑器
-->       <el-row>
          <el-form-item label="邮件内容">
            <div class="edit_container">
              <quill-editor v-model="detailDatas.content"
                            ref="myQuillEditor"
                            class="editer"
                            @ready ="addOnEditorReady($event)"
                             @focus="onEditorReady($event)">
              </quill-editor>
            </div>
          </el-form-item>
          </el-row>

         
        </el-form>
      </el-col>


    </el-row>
              
            </div>
          </div>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="editCancel()" size="small">取 消</el-button>
        <el-button type="primary" @click="editSubmit()" size="small">立刻发送</el-button>
        <el-button type="primary" @click="eidtVisible =false" size="small">保存</el-button>
      </span>
    </el-dialog>
    <!-- 查看邮件详情 -->
    <el-dialog
      title="查看邮件详情"
      :visible.sync="detailVisible"
      width="70%"
      >
      <div class="mail-fitter">
     <el-form label-width="100px" size="small">
          <div class="mail-wrapper">
            <h4 class="title1">邮件信息</h4>
            <div class="search-base">
                    <el-row class="warp">
      
<!--
Form 组件提供了表单验证的功能，只需要通过 rule 属性传入约定的验证规则，并 Form-Item 的 prop 属性设置为需校验的字段名即可。具体可以参考官网：http://element.eleme.io/#/zh-CN/component/form
-->
        
    <el-col :span="24" class="warp-main">
        <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="120px">
          <el-row>
          <el-col :span='12'>
          <el-form-item label="选择发送邮箱：" prop="a_title1">
            <el-select placeholder="请选择" v-model="detailDatas.senderName">
              <el-option
                v-for="item in formData"
                :key="item.id"
                :label="item.sendName"
                :value="item.sendName">
              </el-option>
            </el-select>
 
          </el-form-item>
          </el-col>
         </el-row>
         
         <el-row>
          <el-col>
          <el-form-item label="收件人:" prop="a_title1">
           <el-col :span='12'>
            <el-input v-model="detailDatas.to"
            placeholder="请输入邮件"></el-input>
      
           </el-col>
         
          </el-form-item>
          </el-col>
         </el-row>
         <el-row>
           <el-col>
             <el-form-item label="抄送:" prop="a_source" >
            <el-col :span="12">
              <el-input v-model="detailDatas.cc"
              ></el-input>
            </el-col>
            <el-col :span="12">
            <i class="delete el-icon-delete" @click="deleteCC"></i>
            </el-col>
          </el-form-item>
           </el-col>
          </el-row>
          <el-row>
           <el-col>
             <el-form-item label="密送:" prop="a_source" >
           <el-col :span="12">
            <el-input v-model="detailDatas.bcc"
            ></el-input>
           </el-col>
            <el-col :span="12">
            <i class="delete el-icon-delete" @click="deleteBCC"></i>
          </el-col>
          </el-form-item>
         
           </el-col>
          </el-row>
          <el-row>
           <el-col>
          <el-form-item label="主题" prop="a_source">
            <el-col :span="12" >
            <el-input v-model="detailDatas.subject"
            placeholder="请输入主题"></el-input>
            </el-col>
            <el-col :span="12">
            <el-upload
              class="upload-demo"
              :action="action"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSucces"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
              </el-col>
          </el-form-item>
          </el-col>
          </el-row>
<!--使用编辑器
-->       <el-row>
          <el-form-item label="邮件内容">
            <div class="edit_container">
              <quill-editor v-model="detailDatas.content"
                            ref="myQuillEditor"
                            class="editer"
                            @ready ="addOnEditorReady($event)"
                             @focus="onEditorReady($event)">
              </quill-editor>
            </div>
          </el-form-item>
          </el-row>

         
        </el-form>
      </el-col>


    </el-row>
              
            </div>
          </div>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="detailVisible=false" size="small">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="20%"
      title="删除邮件"
      :visible.sync="deleteVisible"
      append-to-body>
             <div class="goods-fitter"> 
          <span>您确定删除该选中的邮件吗？</span>
              </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="deleteVisible=false" size="small">取 消</el-button>
        <el-button type="primary" @click="enterDelete()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  </div>
</template>

<script>
import { getAllcustomer,addMail,getMail,listMail,deleteMail,detailMail,editMail } from '@/api/customer/index'
import { quillEditor } from 'vue-quill-editor' //调用编辑器
import { setTimeout, clearTimeout } from 'timers';
import {throttleTipPop} from '@/utils/functions.js'
import returnedVue from '../../sale/salesOrders/components/returned.vue';
export default {
  filters: {
    send(value) {
       switch (value) {
      case 0:
        return '草稿(未发送)'
        break
       case 1:
        return '等待发送'
        break
      case 2:
        return '发送成功'
        break
      case 3:
        return '发送失败'
        break
      default :
        return 
        break
    }
    }
},
  data () {
    return {
      action:'',
      deleteVisible:false,
      sendMail:'',
      value:'',
      show1:false,
      show2:false,
      dataArr:[],
      tip:false,//提示框
      deleteCustomer:false, //删除
      addVisible:false,//新增弹窗
      editVisible:false,//编辑弹窗
      deleteVisible:false,//删除弹窗
      detailVisible:false,//详情弹窗
      form: {
        customerStatus:'', //状态
        createTimeStart:'', 
        createTimeEnd:'',
      },
      deleteDatas:[],
      detailDatas:[],
      fileList:[],
        searchpe:'',
        value: '',
        input:'',
        currentIndex: 0,
        storeManagerId: '0',
        roleList: [],
        tableData: {
                currentPage:1,
                sizes:[10, 20, 50, 100],
                size:10,
                total:0,
            },
         infoForm: {
          title: '',
          content:'',
          mail: '',
          cc:'',
          bcc:'',
          myMail:'',
          CC:'',
          BCC:'',
          to:'',
        },
        formData:{},
        //表单验证
        rules: {
          a_title: [
            {required: true, message: '请输入标题', trigger: 'blur'}
          ],
          a_content: [
            {required: true, message: '请输入详细内容', trigger: 'blur'}
          ]
        },
    }
  },
  created () {
    this._getMail();   
    this._listMail();
    this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
  },
  
    
    watch:{
      //监听新增邮件邮件输入框的值得变化
      'infoForm.mail':{
        handler(newName, oldName) {
            if(newName){
                if((newName.indexOf(';'))!==-1){
                 var q =  newName.split(';')
                 this.infoForm.to = q     
                  }else{
                    var arr =[];
                    arr.push(newName)
                    this.infoForm.to = arr
                  } 
         }      
              },
            deep: true,

    }, 
    //监听编辑邮件输入框的值得变化
    'infoForm.cc':{
        handler(newName, oldName) {
            if(newName){
                if((newName.indexOf(';'))!==-1){
                 var q =  newName.split(';')
                 this.infoForm.CC = q
        
                  }else{
                    var arr =[];
                    arr.push(newName)
                    this.infoForm.CC = arr     
                  } 
         }      
              },
            deep: true,
    },
    'infoForm.bcc':{
        handler(newName, oldName) {
               if(newName){
                if((newName.indexOf(';'))!==-1){
                 var q =  newName.split(';')
                 this.infoForm.BCC = q                    
                  }else{
                    var arr =[];
                    arr.push(newName)
                    this.infoForm.BCC = arr 
                  } 
         }      
              },
            deep: true,
    },
    'detailDatas.to':{
        handler(newName, oldName) {
            if(newName){
                if((newName.indexOf(';'))!==-1){
                 var q =  newName.split(';')
                 this.infoForm.to = q     
                  }else{
                    var arr =[];
                    arr.push(newName)
                    this.infoForm.to = arr
                  } 
         }      
              },
            deep: true,

    }, 
    'detailDatas.cc':{
        handler(newName, oldName) {
            if(newName){
                if((newName.indexOf(';'))!==-1){
                 var q =  newName.split(';')
                 this.infoForm.CC = q     
                  }else{
                    var arr =[];
                    arr.push(newName)
                    this.infoForm.CC = arr
                  } 
         }      
              },
            deep: true,

    },
    'detailDatas.bcc':{
        handler(newName, oldName) {
            if(newName){
                if((newName.indexOf(';'))!==-1){
                 var q =  newName.split(';')
                 this.infoForm.BCC = q     
                  }else{
                    var arr =[];
                    arr.push(newName)
                    this.infoForm.BCC = arr
                  } 
         }      
              },
            deep: true,

    },  
    },
  methods: {
    uploadConfig(){

    },
    _listMail(){
      listMail().then(res=>{
        console.log(res);
        
            this.formData = res.data;
      })
    },
    addCC(){
      this.show1 = true;
    },
    addBCC(){
      this.show2 = true;
    },
    deleteCC(){
      this.show1 = false;
    },
    deleteBCC(){
      this.show2 = false;
    },
    tabIndex (index) {
      this.currentIndex = index
    },
    toRole () {
      this.currentIndex = 1
      this.storeManagerId = id
    },
    //新增邮件
    addData(){
      this.addVisible= true
    },
    //新增邮件取消
    addCancel(){
      this.addVisible= false
      this.tip =''
      this.infoForm.a_title1 = ''
      this.infoForm.a_source = ''
      this.infoForm.a_content = ''
    },
    
    //编辑邮件
     editData(){
      if(this.deleteDatas.length===0){
          throttleTipPop(this,'warning',"请选择想要编辑的选项",2000)
          return false
      }else if(this.deleteDatas.length>1){
          throttleTipPop(this,'warning',"请选择想要编辑的那一项",2000)
          return false
      }
       else{
          this.editVisible = true
          detailMail(this.deleteDatas[0]&&this.deleteDatas[0].id).then(res=>{
              if(res.code===200){ 
                res.data.bcc  = res.data.bcc.join(';') 
                res.data.cc = res.data.cc.join(';')
                res.data.to = res.data.to.join(';')            
                this.detailDatas = res.data
                    console.log(res);
                    
               
              }else{
                this.$message({message:res.code,
                                type:'error'})
              }     
      })
           }
    },
    //编辑邮件取消
    editCancel(){
      this.editVisible= false
      this.tip =''
      this.infoForm.a_title2 = ''
      this.infoForm.a_source2 = ''
      this.infoForm.a_content2 = ''
    },
    //邮件详情
     dataDetail(){
      if(this.deleteDatas.length===0){
          throttleTipPop(this,'warning',"请选择想要查看的选项",2000)
          return false
      }else if(this.deleteDatas.length>1){
          throttleTipPop(this,'warning',"请选择想要查看的那一项",2000)
          return false
      }
      else{
          this.detailVisible = true
          detailMail(this.deleteDatas[0]&&this.deleteDatas[0].id).then(res=>{
              if(res.code===200){ 
                res.data.bcc  = res.data.bcc.join(';') 
                res.data.cc = res.data.cc.join(';')
                res.data.to = res.data.to.join(';')            
                this.detailDatas = res.data
                    console.log(res);
                    
               
              }else{
                this.$message({message:res.code,
                                type:'error'})
              }     
      })
           }
    },
    //邮件详情关闭
    //删除行业
    deleteData(){
      this.deleteVisible= true
    },
    editor(id,state) {
      this.$router.push({ name: "AddCustomer", query: { id: id ,state:state } });
    },

    detail(id,state) {
      this.$router.push({ name: "DetailCustomer", query: { id: id ,state:state} });
    },
    serch(slt){
          if(slt){
            this.tableData.currentPage = 1;
          }
            this._getAllcustomer()
        },
    
      _getMail(){
          let obj = {};
            obj.pageNum = this.tableData.currentPage;
            obj.pageSize = this.tableData.size;
            obj.keywords = this.input;
            getMail(obj).then((res) => {
                console.log(res)
                this.tableData.total = res.data.total;
                this.dataArr= res.data.list;
            })
      } ,
    
      handleSizeChange(val){
        this.tableData.size = val;
            this._getMail()
      },
      handleCurrentChange(val){
        this.tableData.currentPage = val;
            this._getMail()
      },
      addOnEditorReady(event){

      },
      editOnEditorReady(event){

      },
      ////新增邮件聚焦详情检测邮件是否为空
       onEditorReady(editor) {
         if(!(this.infoForm.a_title1)){
            this.tip = true
            
        }else{
          this.tip = false
        }
       },
       //编辑邮件聚焦详情检测邮件是否为空
        onEditorReady2(editor) {
         if(!(this.infoForm.a_title2)){
            this.tip = true
            
        }else{
          this.tip = false
        }
      },
      //新增邮件保存
      saveAdd(){
          let obj = {}
        obj.subject = this.infoForm.title,
        obj.cc =this.infoForm.CC
        obj.bcc =this.infoForm.BCC
        obj.to = this.infoForm.to
        obj.content = this.infoForm.content
        obj.mailSenderConfigId = this.sendMail
        obj.nowSend= false
        addMail(obj).then(res=>{
          if(res.code===200){
               this.$message({message:"保存为草稿成功",type:'success'})
               this._getMail()
               this.addVisible = false;
          }
         
          console.log(res);
          
        })
      },
      //新增邮件提交
      onSubmit() {      
               let obj = {}
              obj.subject = this.infoForm.title,
              obj.cc =this.infoForm.CC
              obj.bcc =this.infoForm.BCC
              obj.to = this.infoForm.to
              obj.content = this.infoForm.content
              obj.mailSenderConfigId = this.sendMail
              obj.nowSend= true
              addMail(obj).then(res=>{
                if(res.code===200){
                    this.$message({message:res.message,type:'success'})
                    this._getMail()
                    this.addVisible = false;
                }
                
             console.log(res);
          
        })
        
        
       
      },
      //编辑邮件提交
      editSubmit() {
         if(this.deleteDatas[0].sendStatus==2){
            throttleTipPop(this,"success","已经发送的邮件不能再发送",2000)
            return false
        }else if(this.deleteDatas[0].sendStatus==0){
        let obj={}
         obj.subject = this.detailDatas.subject,
        obj.cc =this.infoForm.CC
        obj.bcc =this.infoForm.BCC
        obj.to = this.infoForm.to
        obj.content = this.detailDatas.content
        obj.mailSenderConfigId = this.detailDatas.mailSenderConfigId
        obj.id = this.detailDatas.id
        obj.nowSend= true
         editMail(obj).then((res)=>{
          console.log(res);
          if(res.code===200){
            throttleTipPop(this,"success",res.message,2000)
              this._getMail();
              this.editVisible =false
          }else{
            return false
          }
         })
        }
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleSucces(...rest){
        console.log(rest);
      },
      //选定栏获取数据
      handleSelectionChange(val){
          
          this.deleteDatas = val;
          console.log(this.deleteDatas);
      },
      deleteData(){
      if(this.deleteDatas.length===0){
          throttleTipPop(this,"warning","请选择删除选项",2000)
          return false
      }else{
          this.deleteVisible = true;
           }
    },
    enterDelete(){
      var a = this.deleteDatas[0].id
      console.log(a);
      
        deleteMail(a).then(res=>{
              if(res.code===200){
                this.$message({
                  message:"删除成功",
                  type:'success'
                })
                this._getMail()
                this.deleteVisible = false
              }
        })
    },    
    
  },
  components:{
      //使用编辑器
      quillEditor
  }
  
}
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
#mail{
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
    padding-bottom: 40px;
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
        .btn_right{
            margin-left: 10px
        }
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
.mail-fitter{
    .mail-wrapper{
    padding: 20px;
    border: 1px solid rgb(215, 224, 241);
    background: #fff;
    .title1 {
      margin-left: -20px;
      font-size: 16px;
      font-weight: 400;
      color: 3333;
      padding-left: 10px;
      line-height: 1.4;
      border-left: 4px solid $themeColor;
      margin-bottom: 23px;
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
  width: 155px;
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
.line-div {
  display: flex;
  justify-content: space-between;
}
.small_top {
  margin-top: 10px;
  margin-left: 19px;
  margin-right: 15px;
}
.warp-main{

  .tip{
    position: absolute;
    top:30px;
    left:10px;
    color: red;
  }
}
.delete{
  font-size: 18px;
  margin-left:10px;
  color: #66b1ff;
  cursor: pointer;
}
.upload-demo{
    .el-upload-list{
      position: relative;;
      left:-100%;
      
    }
    
    }
  .el-upload {
        display: inline-block;
        text-align: center;
        cursor: pointer;
        outline: none;
        border: 0 !important;
        margin-left:35px;
      }  
  .txt_red{
    text-align: center;
    color: #FF4040;
  }
  .txt_black{
    text-align: center;
  }
  .ql-editor {
    min-height: 300px;
  }
}

</style>

