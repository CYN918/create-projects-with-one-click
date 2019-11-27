<template>
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">商机管理</h4>
            <div class="search-base">
              <el-row>
               <el-col :span="7">
                    <el-col>
                        <el-form-item label="关键词：">
                            <el-col :span="23">
                                <el-input v-model="tableData.keyword" placeholder="请输入关键词"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="新增时间：">
                    <el-col :span="22">
                        <el-date-picker
                            type=daterange
                            valueFormat='yyyy-MM-dd HH:mm:ss'
                            v-model="tableData.createTimeStart"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small" @click='serchBussiness(true)' >查询</el-button>
                </el-col>
              </el-row>
              
            </div>
          </div>
        </el-form>
      </div>
    </div>
        <div class="mcard">
      <el-form label-width="100px" size="small">
        <el-row class="operate mbottom">
          <el-col :span="7">
              <!-- <el-button type="primary">仅挑选</el-button> -->
              <el-button type="primary" size="small" @click="addData"  v-permit="'new:oppo'">新增</el-button>
              <el-button type="primary" size="small" @click="editData"  v-permit="'edit:oppo'">编辑</el-button>
              <el-button type="primary" size="small" @click="dataDetail"  v-permit="'view:oppo'">详情</el-button>
              <el-button type="primary" size="small" @click="deleteData"  v-permit="'remove:oppo'">删除</el-button>
              
          </el-col>
         <!--  <el-col :span="10">
                            <el-button type="primary" size="small" @click='allData()' >全部</el-button>
                            <el-button type="primary" size="small" @click='serch(true)' >今日联系</el-button>
                            <el-button type="primary" size="small" @click='serch(true)' >3天内联系</el-button>
                            <el-button type="primary" size="small" @click='serch(true)' >7天内联系</el-button>
          </el-col> -->
        </el-row>
      </el-form>
      <el-table   :data="dataArr"  border style="width: 100%" stripe 
      @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column  prop="boNo"  label="编号" align="center"></el-table-column>
        <el-table-column  prop="boTitle"  label="商机主题" align="center"></el-table-column>
        <el-table-column  prop="customerName"  label="客户信息" align="center"></el-table-column>
        <el-table-column  prop="boStage"  label="进行阶段" align="center"></el-table-column>
        <el-table-column  prop="nextTime"  label="下次联系时间" align="center" ></el-table-column>
        <el-table-column  prop="description"  label="客户需求描述" align="center" ></el-table-column>
        <el-table-column  prop="expectTotalAmount"  label="预算总额" align="center" ></el-table-column>
        <el-table-column  prop="competitor"  label="竞争对手" align="center" ></el-table-column>
        <el-table-column  prop="winningRate"  label="赢率" align="center" ></el-table-column>
        <el-table-column  prop="primaryFactor"  label="关键因素" align="center" ></el-table-column>
        <el-table-column  prop="remark"  label="备注" align="center" ></el-table-column>
        <el-table-column  prop="inputUserName"  label="销售员" align="center" ></el-table-column>
        <el-table-column  prop="createTime"  label="新增时间" align="center" ></el-table-column>
       
    </el-table>
      <div class="pagination">
        <el-pagination
            @size-change="addHandleSizeChange"
            @current-change="addHandleCurrentChange"
            :current-page="tableData.currentPage"
            :page-sizes="[10,20,30,50]"
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
 <!--  //新增商机  -->
  <el-dialog
      title="新增商机"
      :visible.sync="addVisible"
      width="70%"
      >
      <!-- 内部弹窗 -->
      <el-dialog
      width="60%"
      title="选择客户"
      :visible.sync="innerVisible"
      append-to-body>
          <div class="mail-fitter">
              <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px" size="small">
                    <div class="mail-wrapper">
                      <h4 class="title1">客户信息</h4>
                      <div class="search-base">
          <div class="mbottom">
              <div class="goods-fitter">  
                  <el-row>
                     <!--  <el-col :span="6">
                        <el-form-item label="客户区分：" prop="differentiate">
                            <el-select v-model="form.differentiate" placeholder="必填项">
                            <el-option label="了解商机" value="0"></el-option>
                            <el-option label="确认商机" value="1"></el-option>
                            <el-option label="谈判" value="2"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col> -->
                      <el-col :span="7">
                        <el-form-item label="关键词：" prop="businessKeywords">
                          <el-input v-model="addList.keywords" size="small" placeholder="请输入客户名称/联系人/手机号"></el-input>
                        </el-form-item>
                        
                      </el-col>
                      <el-col :span="2" :offset="1"> 
                        <el-button type="primary" size="small" @click="customerSearch()">查询</el-button>
                      </el-col>
                     <!--  <el-col :span="6" :offset="5">
                          <el-button type="primary" size="small">新增</el-button>
                          <el-button type="primary" size="small">客户管理</el-button>
                          <el-button type="primary" size="small">确定选择</el-button>
                          
                      </el-col> -->
                      
                  </el-row>
                  <div class="mcard" style="padding-bottom:0">
                      <el-table   :data="addCU"  border style="width: 100%" stripe @row-dblclick="addCustomer">
                              <el-table-column  prop="customerSn"  label="编号" align="center"></el-table-column>
                            <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
                          <el-table-column prop="commonContactName" label="联系人" align="center"></el-table-column>
                          <el-table-column prop="commonContactPhone" label="手机号码" align="center"></el-table-column>
                          <el-table-column prop="commonContactTel" label="电话号码" align="center"></el-table-column>
                          <el-table-column prop="commonContactEmail" label="邮箱" align="center"></el-table-column>
                          <el-table-column prop="leaderContactName" label="部门经理" align="center"></el-table-column>
                          <el-table-column prop="leaderContactPhone" label="手机号码" align="center"></el-table-column>
                          <el-table-column prop="companyAddress" label="地址" align="center"></el-table-column>
                    </el-table>
                    <div class="pagination">
                      <el-pagination
                          @size-change="addHandleSizeChange1"
                          @current-change="addHandleCurrentChange1"
                          :current-page="addList.pageNum"
                          :page-sizes="[10,20,30,50]"
                          :page-size="addList.pageSize"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="addList.count">
                          </el-pagination>
                    </div>
                  </div>
              </div>
          </div>
                      </div>
                </div>
           
          </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="innerVisible = false" size="small">关 闭</el-button>
            <el-button type="primary" @click="innerVisible =false" size="small">保存</el-button>
          </span>

      </el-dialog>
      <!-- 内部弹窗 -->
      <div class="mail-fitter">
          <el-form ref="infoForm" :model="form" :rules="rules" label-width="110px" size="small">
                <div class="mail-wrapper">
                  <h4 class="title1">商机信息</h4>
                  <div class="search-base">
          <el-row class="warp">
      <div class="mbottom">
        <div class="goods-fitter">
            <el-row>
              <el-col :span="6">
                        <el-form-item label="商机编号：" prop="businessNumber">
                        <el-input v-model="form.businessNumber" placeholder="保存后自动生成" :disabled="true"></el-input>
                        </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="商机主题：" prop="businessTitle">
                   <el-input v-model="form.businessTitle" placeholder="请填写商机主题"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="商机类型：" prop="businessType">
                   <el-select v-model="form.businessType" placeholder="必填项">
                    <el-option
                    v-for="(item,index) in businessType" 
                    :key="index"
                    :label="item"
                    :value="item">
                  </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="进行阶段：" prop="businessStage">
                    <el-select v-model="form.businessStage" placeholder="必填项">
                     <el-option
                      v-for="(item,index) in businessStage" 
                      :key="index"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="客户名称：" prop="customerName">
                   <el-input v-model="form.customerName" placeholder="请填写商机主题" >
                     <el-button slot="append"  @click="chooseCustomer()" size="mini">选择</el-button>
                   </el-input>  
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="联系人：" prop="contacts">
                   <el-input v-model="form.contact" placeholder="请填写联系人"></el-input>    
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="联系电话：" prop="contactNumber">
                   <el-input v-model="form.contactNumber" placeholder="请填写联系电话"></el-input>    
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="赢率:" prop="winningRate">
                   <el-select v-model="form.winningRate" placeholder="必填项">
                        <el-option
                          v-for="(item,index) in winningRate" 
                          :key="index"
                          :label="item"
                          :value="item">
                        </el-option>
                   </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="预计总额：" prop="projectedTotal">
                   <el-input v-model="form.projectedTotal" placeholder="1000000.0"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预计费用:" prop="expectedCosts">
                   <el-input v-model="form.expectedCosts"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="预计下单时间:" prop="estimatedTime" style="margin-left">              
                      <el-date-picker
                          v-model="form.estimatedTime"
                          type="date"
                          style="width:100%"
                          placeholder="选择日期"
                          valueFormat="yyyy-MM-dd HH:mm:ss"
                          >
                        </el-date-picker>
                   
                  </el-form-item>
                </el-col>
              <el-col :span="6">
                <el-form-item label="下次联系时间:" prop="nextTime">
                   <el-date-picker
                      v-model="form.nextTime"
                      type="date"
                      style="width:100%"
                      placeholder="选择日期"
                      valueFormat="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
               <el-form-item label="竞争对手:" prop="competitor">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                placeholder="请输入内容"
                v-model="form.competitor">
              </el-input>
               </el-form-item>
            </el-row>
            <el-row>
               <el-form-item label="需求描述：" prop="requirements">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                placeholder="请输入内容"
                v-model="form.requirements">
              </el-input>
               </el-form-item>
            </el-row>
            <el-row>
               <el-form-item label="关键因素：" prop="criticalFactor">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                placeholder="请输入内容"
                v-model="form.criticalFactor">
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
            <el-row>
               <el-form-item label="跟踪结果：" prop="trackingResults">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                placeholder="请输入内容"
                v-model="form.trackingResults">
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
        <el-button type="danger" @click="addCancel()" size="small">关 闭</el-button>
        <el-button type="primary" @click="addBusiness()" size="small">保存</el-button>
      </span>
    </el-dialog>
    <!--  编辑商机  -->
  <el-dialog
      title="编辑商机"
      :visible.sync="editVisible"
      width="70%"
      >
       <!-- 内部弹窗 -->
      <el-dialog
      width="60%"
      title="选择客户"
      :visible.sync="innerVisible1"
      append-to-body>
          <div class="mail-fitter">
              <el-form ref="infoForm" :model="form" :rules="rules" label-width="110px" size="small">
                    <div class="mail-wrapper">
                      <h4 class="title1">客户信息</h4>
                      <div class="search-base">
          <div class="mbottom">
              <div class="goods-fitter">  
                 <el-row>
                     <!--  <el-col :span="6">
                        <el-form-item label="客户区分：" prop="differentiate">
                            <el-select v-model="form.differentiate" placeholder="必填项">
                            <el-option label="了解商机" value="0"></el-option>
                            <el-option label="确认商机" value="1"></el-option>
                            <el-option label="谈判" value="2"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col> -->
                      <el-col :span="7">
                        <el-form-item label="关键词：" prop="businessKeywords">
                          <el-input v-model="editList.keywords" size="small" placeholder="请输入客户名称/联系人/手机号"></el-input>
                        </el-form-item>
                         
                      </el-col>
                      <el-col :span="2" :offset="1">
                        <el-button type="primary" size="small" @click="customerSearch1()">查询</el-button>
                      </el-col>
                      <!-- <el-col :span="6" :offset="5">
                          <el-button type="primary" size="small">新增</el-button>
                          <el-button type="primary" size="small">客户管理</el-button>
                          <el-button type="primary" size="small">确定选择</el-button>
                          
                      </el-col> -->
                      
                  </el-row>
                  <div class="mcard" style="padding-bottom:0" >
                      <el-table   :data="editCU"  border style="width: 100%" stripe @row-dblclick="editCustomer">
                            <el-table-column  prop="customerSn"  label="编号" align="center"></el-table-column>
                            <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
                          <el-table-column prop="commonContactName" label="联系人" align="center"></el-table-column>
                          <el-table-column prop="commonContactPhone" label="手机号码" align="center"></el-table-column>
                          <el-table-column prop="commonContactTel" label="电话号码" align="center"></el-table-column>
                          <el-table-column prop="commonContactEmail" label="邮箱" align="center"></el-table-column>
                          <el-table-column prop="leaderContactName" label="部门经理" align="center"></el-table-column>
                          <el-table-column prop="leaderContactPhone" label="手机号码" align="center"></el-table-column>
                          <el-table-column prop="companyAddress" label="地址" align="center"></el-table-column>

                      
                    </el-table>
                    <div class="pagination">
                      <el-pagination
                          @size-change="editHandleSizeChange"
                          @current-change="editHandleCurrentChange"
                          :current-page="editList.pageNum"
                          :page-sizes="[10,20,30,50]"
                          :page-size="editList.pageSize"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="editList.count">
                          </el-pagination>
                    </div>
                  </div>
              </div>
          </div>
                      </div>
                </div>
           
          </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="innerVisible1 = false" size="small">关 闭</el-button>
            <el-button type="primary" @click="innerVisible1 =false" size="small">保存</el-button>
          </span>

      </el-dialog>
      <!-- 内部弹窗 -->
      <div class="mail-fitter">
     <el-form ref="infoForm" :model="form" :rules="rules" label-width="110px" size="small">
          <div class="mail-wrapper">
            <h4 class="title1">商机信息</h4>
            <div class="search-base">
                    <el-row class="warp">
      <div class="mbottom">
         <div class="goods-fitter">
            <el-row>
              <el-col :span="6">
                        <el-form-item label="商机编号：" prop="businessNumber">
                        <el-input v-model="detailDatas.boId" placeholder="商机编号：" :disabled="true"></el-input>
                        </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="商机主题：" >
                   <el-input v-model="detailDatas.boTitle" placeholder="请填写商机主题"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="商机类型：" >
                   <el-select v-model="detailDatas.customerType" placeholder="必填项">
                     <el-option
                          v-for="(item,index) in businessType" 
                          :key="index"
                          :label="item"
                          :value="item">
                        </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="进行阶段：" >
                    <el-select v-model="detailDatas.boStage" placeholder="必填项">
                        <el-option
                              v-for="(item,index) in businessStage" 
                              :key="index"
                              :label="item"
                              :value="item">
                            </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="客户名称：" >
                   <el-input v-model="customerId0" placeholder="请填写客户名称" >
                     <el-button slot="append"  @click="innerVisible1 = true" size="mini">选择</el-button>
                   </el-input> 
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="联系人：" prop="contacts">
                   <el-input v-model="detailDatas.contact" ></el-input>    
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="联系电话：" prop="contactNumber">
                   <el-input v-model="detailDatas.tel" placeholder="请填写联系电话"></el-input>    
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="赢率:" >
                   <el-select v-model="detailDatas.winningRate" placeholder="必填项">
                         <el-option
                          v-for="(item,index) in winningRate" 
                          :key="index"
                          :label="item"
                          :value="item">
                        </el-option>
                   </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="预计总额：" prop="projectedTotal">
                   <el-input v-model="detailDatas.expectTotalAmount" placeholder="1000000.0"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预计费用:" prop="expectedCosts">
                   <el-input v-model="detailDatas.expectCost"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="预计下单时间:" style="margin-left">              
                      <el-date-picker
                          v-model="detailDatas.expectOrderTime"
                          type="date"
                          style="width:100%"
                          placeholder="选择日期"
                          valueFormat="yyyy-MM-dd HH:mm:ss"
                          >
                        </el-date-picker>
                   
                  </el-form-item>
                </el-col>
              <el-col :span="6">
                <el-form-item label="下次联系时间:">
                   <el-date-picker
                      v-model="detailDatas.nextTime"
                      type="date"
                      style="width:100%"
                      placeholder="选择日期"
                      valueFormat="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
               <el-form-item label="竞争对手:" prop="competitor">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                placeholder="请输入内容"
                v-model="detailDatas.competitor">
              </el-input>
               </el-form-item>
            </el-row>
            <el-row>
               <el-form-item label="需求描述：" prop="requirements">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                placeholder="请输入内容"
                v-model="detailDatas.description">
              </el-input>
               </el-form-item>
            </el-row>
            <el-row>
               <el-form-item label="关键因素：" prop="criticalFactor">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                placeholder="请输入内容"
                v-model="detailDatas.primaryFactor">
              </el-input>
               </el-form-item>
            </el-row>
            <el-row>
               <el-form-item label="备注：" prop="remarks">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                placeholder="请输入内容"
                v-model="detailDatas.remark">
              </el-input>
               </el-form-item>
            </el-row>
            <el-row>
               <el-form-item label="跟踪结果：" prop="trackingResults">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                placeholder="请输入内容"
                v-model="detailDatas.trackingResults">
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
        <el-button type="danger" @click="editCancel()" size="small">关 闭</el-button>
        <el-button type="primary" @click="editBusiness()" size="small">保存</el-button>
      </span>
    </el-dialog>
    <!-- 查看邮件详情 -->
    <el-dialog
      title="查看商机详情"
      :visible.sync="detailVisible"
      width="70%"
      >
    
      <!-- 内部弹窗 -->
       <div class="mail-fitter">
     <el-form ref="infoForm" :model="form" :rules="rules" label-width="110px" size="small">
          <div class="mail-wrapper">
            <h4 class="title1">商机信息</h4>
            <div class="search-base">
                    <el-row class="warp">
      <div class="mbottom">
        <div class="goods-fitter">
            <el-row>
              <el-col :span="6">
                        <el-form-item label="商机编号：" prop="businessNumber">
                        <el-input v-model="detailDatas.boId" placeholder="商机编号：" readonly></el-input>
                        </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="商机主题：" >
                   <el-input v-model="detailDatas.boTitle" placeholder="请填写商机主题" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="商机类型：" >
                   <el-select v-model="detailDatas.customerType" placeholder="必填项" readonly>
                    <el-option
                          v-for="(item,index) in businessType" 
                          :key="index"
                          :label="item"
                          :value="item">
                        </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="进行阶段：" >
                    <el-select v-model="detailDatas.boStage" placeholder="必填项" readonly>
                        <el-option
                          v-for="(item,index) in businessStage" 
                          :key="index"
                          :label="item"
                          :value="item">
                        </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="客户名称：" >
                   <el-input v-model="customerId0" placeholder="请填写名称"  readonly>
                     
                   </el-input>  
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="联系人：" prop="contacts">
                   <el-input v-model="detailDatas.contact" readonly></el-input>    
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="联系电话：" prop="contactNumber">
                   <el-input v-model="detailDatas.tel" placeholder="请填写联系电话" readonly></el-input>    
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="赢率:" >
                   <el-select v-model="detailDatas.winningRate" placeholder="必填项" readonly>
                        <el-option
                          v-for="(item,index) in winningRate" 
                          :key="index"
                          :label="item"
                          :value="item">
                        </el-option>
                   </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="预计总额：" prop="projectedTotal">
                   <el-input v-model="detailDatas.expectTotalAmount" placeholder="1000000.0" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预计费用:" prop="expectedCosts">
                   <el-input v-model="detailDatas.expectCost" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="预计下单时间:" style="margin-left">              
                      <el-date-picker
                          v-model="detailDatas.expectOrderTime"
                          type="date"
                          style="width:100%"
                          placeholder="选择日期"
                          >
                        </el-date-picker>
                   
                  </el-form-item>
                </el-col>
              <el-col :span="6">
                <el-form-item label="下次联系时间:">
                   <el-date-picker
                      v-model="detailDatas.nextTime"
                      type="date"
                      style="width:100%"
                      placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
               <el-form-item label="竞争对手:" prop="competitor">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                placeholder="请输入内容"
                v-model="detailDatas.competitor"
                readonly>
              </el-input>
               </el-form-item>
            </el-row>
            <el-row>
               <el-form-item label="需求描述：" prop="requirements">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                placeholder="请输入内容"
                v-model="detailDatas.description"
                readonly>
              </el-input>
               </el-form-item>
            </el-row>
            <el-row>
               <el-form-item label="关键因素：" prop="criticalFactor">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                placeholder="请输入内容"
                v-model="detailDatas.primaryFactor"
                readonly>
              </el-input>
               </el-form-item>
            </el-row>
            <el-row>
               <el-form-item label="备注：" prop="remarks">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                placeholder="请输入内容"
                v-model="detailDatas.remark"
                readonly>
              </el-input>
               </el-form-item>
            </el-row>
            <el-row>
               <el-form-item label="跟踪结果：" prop="trackingResults">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                placeholder="请输入内容"
                v-model="detailDatas.trackingResults">
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
        <el-button type="danger" @click="detailCancel()" size="small">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="20%"
      title="删除商机"
      :visible.sync="deleteVisible"
      append-to-body>
             <div class="goods-fitter"> 
          <span>您确定删除商机编号：{{this.deleteDatas[0]&&this.deleteDatas[0].boNo}}吗？</span>
              </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="deleteVisible=false" size="small">取 消</el-button>
        <el-button type="primary" @click="enterDelete()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllcustomer,deleteCustomer,addBusinessed,getBusiness,deleteBusiness,detailBusiness,customerDetailByid,updateBusinessed,getBusinessSeting } from '@/api/customer/index'
import { quillEditor } from 'vue-quill-editor' //调用编辑器
import returnedVue from '../../sale/salesOrders/components/returned.vue';
import { clearTimeout, setTimeout } from 'timers';
import {throttleTipPop} from '@/utils/functions.js'
export default {
  data () {
    return {
      dataArrs:[],
      dataArr:[],
      tip:false,//提示框
      deleteCustomer:false, //删除
      addVisible:false,//新增弹窗
      editVisible:false,//编辑弹窗
      deleteVisible:false,//删除弹窗
      detailVisible:false,//详情弹窗
      innerVisible:false,//新增二级弹窗
      innerVisible1:false,//新增二级弹窗
      innerVisible2:false,//新增二级弹窗
      listData:[],
      form: {
        customerStatus:'', //状态
        createTimeStart:'', 
        createTimeEnd:'',
        keywords:'',//关键词
        businessNumbe:'',//商机编码
        businessTitle:'',//商机主题
        businessType:'',//商机类型
        businessStage:'',//进行阶段
        customerName:'',//客户名称
        customerId:'',//客户ID
        contact:'',//联系人
        contactNumber:'',//联系电话
        winningRate:'',//赢率
        projectedTotal:'',//预计总额
        expectedCosts:'',//预计费用
        estimatedTime:'',//预计下单时间
        nextTime:'',//下次联系时间
        competitor:'',//竞争对手
        requirements:'',//需求描述
        criticalFactor:'',//关键因素
        remarks:'',//备注
        trackingResults:'',//跟踪结果
        differentiate:'',//客户区分
        businessKeywords:'',//客户查询关键词
      },
      addCU:[],
      editCU:[],
      addList:{
           pageNum: 1,
        pageSize: 10,
        count: 0,
        keywords: "" ,//关键词
      },
      editList:{
           pageNum: 1,
        pageSize: 10,
        count: 0,
        keywords: "" ,//关键词
      },
      businessType:[],//商机类型
      businessStage:[],//进行阶段
      winningRate:[],
      customerId0:'',
        searchpe:'',
        value: '',
        input:'',
        deleteDatas:[],
        detailDatas:[],//详情数据
        currentIndex: 0,
        storeManagerId: '0',
        roleList: [],
        tableData: {
                currentPage:1,
                sizes:[10, 20, 50, 100],
                size:10,
                total:0,
                keyword:'',
                createTimeStart:[],
                startTime:'',
                endtime:'',
            },
        tableDatas: {
                currentPage:1,
                sizes:[10, 20, 50, 100],
                size:10,
                total:0,
               
                
            },
         infoForm: {
          a_title1: '',
          a_source: '',
          a_content:'',
          editorOption: {}
        },
        list:[],//客户列表
      customerData:[],//客户数据
      
        //表单验证
        rules: {
          businessType: [
            {required: true, message: '此项为必选项', trigger: 'change'}
          ],
          businessStage:[
            {required: true, message:'此项为必选项', trigger: 'change'}  
          ],
          customerName:[
            {required: true, message:'此项为必选项', trigger: 'blur'}  
          ],
          winningRate:[
            {required: true, message:'此项为必选项', trigger: 'change'} 
          ]
        },
    }
  },
  mounted () {
    this.startLoading() //加载中loading
    this._getAllcustomer();   
    this._getBusiness();
    this._getBusinessSeting();
  },
  watch:{
    'tableData.createTimeStart':{
      handler(val, old) {
        if(val===null){
            this.tableData.startTime = '';
        this.tableData.endtime = '';
        }else{
            this.tableData.startTime = val[0];
        this.tableData.endtime = val[1];
        }  

      },
      deep: true
    }

  },
  methods: {
    _getBusinessSeting(){
      getBusinessSeting().then(res=>{
        var type = res.data.customer_type[0].split(',')
        var stage = res.data.bo_stage[0].split(',')
        var rate = res.data.winning_rate[0].split(',')
        
        
        this.businessType = type
        this.businessStage = stage
        this.winningRate = rate
      })
    },
    //查询条件返回商机列表
    serchBussiness(){
          getBusiness(this.tableData).then((res)=>{
          console.log(res);
          this.tableData.total = res.data.page.total;
          this.dataArr = res.data.pageList;

        })
    },
    tabIndex (index) {
      this.currentIndex = index
    },
    toRole () {
      this.currentIndex = 1
      this.storeManagerId = id
    },
    //新增商机
    addData(){
      this.addVisible= true
    },
    //新增商机关闭
    addCancel(){
      this.addVisible= false
      this.tip =''
      this.infoForm.a_title1 = ''
      this.infoForm.a_source = ''
      this.infoForm.a_content = ''
    },
    //新增商机保存
    addBusiness(){
      let obj={}
      obj.boId = this.form.businessNumber  //商机ID
      obj.boTitle = this.form.businessTitle //商机主题
      obj.customerId = parseInt(this.form.customerId) //客户ID
      obj.contact = this.form.contact //联系人
      obj.tel = this.form.contactNumber //联系电话
      obj.winningRate = this.form.winningRate //赢率
      obj.boStage = (this.form.businessStage) //商机进行阶段
      obj.customerType = (this.form.businessType) //商机类型
      obj.nextTime = this.form.nextTime//下次联系时间
      obj.expectTotalAmount = Number(this.form.projectedTotal) //预计总额 
      obj.expectCost = Number(this.form.expectedCosts) //预计费用
      obj.expectOrderTime = this.form.estimatedTime //预计下单时间
      obj.description = this.form.requirements //客户需求描述
      obj.competitor = this.form.competitor //竞争对手
      obj.primaryFactor = this.form.criticalFactor //关键因素
      obj.trackingResults = this.form.trackingResults //跟踪结果
      obj.remark = this.form.remarks
       
 
      if((!this.form.businessType)&&(!this.form.businessStage)&&(!this.form.customerName)&&(!this.form.contactNumber)&&(!this.form.winningRate)){
             
                throttleTipPop(this,'warning',"请填写带*号的选项",2000)
            
        
            return false
      }else{
          addBusinessed(obj).then((res)=>{
          console.log(res);
          if(res.code===200){
            throttleTipPop(this,"success",res.message,2000)
            
              this._getBusiness();
              this.addVisible =false
          }else{
            return false
          }
          
          
      })
      
      }
      
      
      
    },
    _getBusiness(){
        getBusiness(this.tableData).then((res)=>{
          console.log(res);
          this.tableData.total = res.data.page.total;
          this.dataArr = res.data.pageList;
          this.endLoading() //取消加载中loading
        })
    },
    //编辑商机
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
          detailBusiness(this.deleteDatas[0]&&this.deleteDatas[0].boId).then(res=>{
              if(res.code===200){
                console.log(res);              
                this.detailDatas = res.data
                customerDetailByid(res.data.customerId).then(data=>{
                  if(data.code===200){
                    console.log(data);
                    
                    this.customerId0 = data.data.customerName
                    
                  }
                  
                })
              }else{
                this.$message({message:res.code,
                                type:'error'})
              }
              
              
      })
           }
    },
    //编辑商机保存
    editBusiness(){
        let obj={}
      obj.boId = this.detailDatas.boId  //商机ID
      obj.boTitle = this.detailDatas.boTitle //商机主题
      obj.customerId = parseInt(this.detailDatas.customerId) //客户ID
      obj.contact = this.detailDatas.contact //联系人
      obj.tel = this.detailDatas.tel //联系电话
      obj.winningRate = this.detailDatas.winningRate //赢率
  
      obj.boStage = (this.detailDatas.boStage) //商机进行阶段
     
      obj.customerType = (this.detailDatas.customerType)//商机类型
      obj.nextTime = this.detailDatas.nextTime//下次联系时间
      obj.expectTotalAmount = Number(this.detailDatas.expectTotalAmount) //预计总额 
      obj.expectCost = Number(this.detailDatas.expectCost) //预计费用
      obj.expectOrderTime = this.detailDatas.expectOrderTime //预计下单时间
      obj.description = this.detailDatas.description //客户需求描述
      obj.competitor = this.detailDatas.competitor //竞争对手
      obj.primaryFactor = this.detailDatas.primaryFactor //关键因素
      obj.trackingResults = this.detailDatas.trackingResults //跟踪结果
      obj.remark = this.detailDatas.remark
      
      if((!this.detailDatas.customerType)&&(!this.detailDatas.boStage)&&(!this.detailDatas.customerName)&&(!this.detailDatas.tel)&&(!this.detailDatas.winningRate)){
         
            throttleTipPop(this,'warning',"请填写带*号的选项",2000)
            return false
      }else{
          updateBusinessed(obj).then((res)=>{
          console.log(res);
          if(res.code===200){
            throttleTipPop(this,"success",res.message,2000)
              this._getBusiness();
              this.editVisible =false
          }else{
            return false
          }
          
          
      })
      
      }
      
    },

    //编辑商机取消
    editCancel(){
      this.editVisible= false
      this.tip =''
      this.infoForm.a_title2 = ''
      this.infoForm.a_source2 = ''
      this.infoForm.a_content2 = ''
    },
    //商机详情
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
          detailBusiness(this.deleteDatas[0]&&this.deleteDatas[0].boId).then(res=>{
              if(res.code===200){             
                this.detailDatas = res.data
         
                customerDetailByid(res.data.customerId).then(data=>{
                  if(data.code===200){
  
                    
                    this.customerId0 = data.data.customerName
                    
                  }
                  
                })
              }else{
                this.$message({message:res.code,
                                type:'error'})
              }
              
              
      })
           }
      
     
    },
    //商机详情关闭
    detailCancel(){
      this.detailVisible= false
    },
    //删除数据
    deleteData(){
      if(this.deleteDatas.length===0){
          throttleTipPop(this,"warning","请选择删除选项",2000)
          return false
      }else{
          this.deleteVisible = true;
           }

      
    },
    //确定删除
    enterDelete(){
        deleteBusiness(this.deleteDatas[0].boId).then(res=>{
              if(res.code===200){
                this.$message({
                  message:"删除成功",
                  type:'success'
                })
                this._getBusiness()
                this.deleteVisible = false
              }
        })
    }, 
    chooseCustomer(){
        this._addAllcustomer();
        this.innerVisible = true;
    },
     chooseCustomer1(){
        this._getAllcustomer();
        this.innerVisible = true;
    },
    //新增客户搜索
    customerSearch(){
          this._addAllcustomer();
    } , 
    //编辑客户搜索
    customerSearch1(){
        this._getAllcustomer();
    },
    //新增页面添加客户
     _addAllcustomer(){
            getAllcustomer(this.addList).then((res) => {
                this.addList.count = res.data.total;
                this.addCU= res.data.list;
            })

        },
    //编辑页面添加客户
    _getAllcustomer(){
            getAllcustomer(this.editList).then((res) => {
                this.editList.count = res.data.total;
                this.editCU= res.data.list;
            })

        }, 
      handleSizeChange(val){
        this.tableData.size = val;
            this._getBusiness()
      },
      handleCurrentChange(val){
        this.tableData.currentPage = val;
           this._getBusiness()
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
      //新增邮件提交
      onSubmit() {
        if(!(this.infoForm.a_title1)){
            this.tip = true
            return false
        }else{
          this.tip = false
          this.addVisible = false
        }
      },
      //编辑邮件提交
      editSubmit() {
        if(!(this.infoForm.a_title2)){
            this.tip = true
            return false
        }else{
          this.tip = false
          this.eitVisible = false
        }
      },
       //双击添加客户
      addCustomer(row){
        var copy = JSON.parse(JSON.stringify(row))
        this.customerData.splice(0,1,copy)
        this.form.customerName = this.customerData[0]&&this.customerData[0].customerName
        this.form.contact = this.customerData[0]&&this.customerData[0].commonContactName
        this.form.contactNumber = this.customerData[0]&&this.customerData[0].commonContactPhone
        this.form.customerId = this.customerData[0]&&this.customerData[0].customerId
        this.innerVisible = false
    
      },
       editCustomer(row){
        var copy = JSON.parse(JSON.stringify(row))
        this.customerData.splice(0,1,copy)
        this.customerId0 = this.customerData[0]&&this.customerData[0].customerName
        this.detailDatas.contact = this.customerData[0]&&this.customerData[0].commonContactName
        this.detailDatas.tel = this.customerData[0]&&this.customerData[0].commonContactPhone
        this.detailDatas.customerId = this.customerData[0]&&this.customerData[0].customerId
        this.innerVisible1 = false
    
      },
      //选定栏获取数据
      handleSelectionChange(val){
          console.log(val);
          this.deleteDatas = val;
      },
      //新增页面客户换页
      addHandleSizeChange1(val){
          this.addList.pageSize =val;
          this._addAllcustomer();
      },
      addHandleCurrentChange1(val){
           this.addList.pageNum =val;
          this._addAllcustomer();
      },
       //新增页面客户换页
      editHandleSizeChange(val){
          this.editList.pageSize =val;
          this._getAllcustomer();
      },
      editHandleCurrentChange(val){
           this.editList.pageNum =val;
          this._getAllcustomer();
      },
       //商机分页
      addHandleSizeChange(val){
          this.tableData.size =val;
          this._getBusiness();
      },
      addHandleCurrentChange(val){
           this.tableData.currentPage =val;
          this._getBusiness();
      }

  },
  components:{
      //使用编辑器
      quillEditor
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
.el-input-group__append button.el-button {
  width:50px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
</style>

