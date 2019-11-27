<template>
  <div class="margin margin1">
    <div class="mbottom">
          <div class="goods-fitter">
              <div class="search-wrapper">
              <el-page-header @back="back" content='额度发放管理>额度发放'></el-page-header>
            </div>
          </div>
      </div>
      <div class="mcard mbottom" style="margin-bottom: 40px;border:1px solid #d6deef;">
        <div class="title">基本信息</div>
           <div>
             <el-form ref="form" :modal="messageTitle" label-width="100px" size="small">
              <el-row>
                  <el-col :span="24">
                    <el-col :span="6">
                      <el-form-item label="额度管理人:" >
                         {{quotaManagerName}}
                      </el-form-item>
                    </el-col>
                     <el-col :span="6">
                      <el-form-item label="额度发放人:" >
                         {{quotaExecutorName}}
                      </el-form-item>
                    </el-col>
                  </el-col>
              </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-col :span="6">
                      <el-form-item label="账户选择:" >
                           <el-select v-model="dealersAccount" placeholder="请选择"  @change="GetAccount($event)">
                              <el-option
                                v-for="item in dealersAccountList"
                                :key="item.id"
                                :label="item.accountName"
                                :value="item.id"
                               >
                              </el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
                 <el-row>
                  <el-col :span="24">
                    <el-col :span="6">
                      <el-form-item label="发放额度:">
                        <el-input :span="6" v-model="agrant" type="number"></el-input>
                      </el-form-item>
                    </el-col>
                     <!-- <el-col :span="12" style="line-height: 40px;margin-left: 10px;">
                      <span>积分</span>     <span style='color:red;padding: 0 20px;'>剩余可发放额度：20000积分</span>      <span style="color:#4C86F4;">去充值</span> <span style="color:#4C86F4;">/</span><span style="color:#4C86F4;">去申请</span>
                    </el-col> -->
                  </el-col>
                 </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-col :span="24">
                      <el-form-item label="是否限购:" >
                           <el-radio v-model="radio" label="0">不限购商品</el-radio>
                           <el-radio v-model="radio" label="1">限购商品</el-radio>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
             </el-form>
           </div>

          </div>

       <div class="topbig_div">
          <div>
            <span class="app-head-title" @click="tabVender(0)" :class="currentTabIndex === 0 ?'app-head-title add_div':'app-head-title'">发放给个人</span>
          </div>
          <div>
            <span class="app-head-title" @click="tabVender(1)" :class="currentTabIndex === 1 ?'app-head-title add_div':'app-head-title'">发放给部门</span>
          </div>
       </div>

      <div class="contnt">
        <div class="mcard" v-show="currentTabIndex==0">
          <div class="title">选择用户</div>
           <div style="margin-bottom:20px;">
           <el-form label-width="120px" size="small">
              <el-row>
              <!-- <el-col :span="6">
                    <el-col>
                    <el-form-item label="公司名称：">
                        <el-select v-model="dealersAccount" placeholder="请选择">
                              <el-option
                                v-for="item in dealersAccountList"
                                :key="item.id"
                                :label="item.accountName"
                                :value="item.id">
                              </el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="6">
                    <el-col>
                    <el-form-item label="部门名称：">
                         <el-select v-model="departmentVal1" placeholder="请选择">
                              <el-option
                                v-for="item in departmentName1"
                                :key="item.organizeId"
                                :label="item.description"
                                :value="item.organizeId">
                              </el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                  </el-col> -->
                  <!-- <el-col :span="2" style='text-align: center;'>
                          <el-button type="primary" size="small" @click="">搜索</el-button>
                  </el-col> -->
                  <el-col :span="2" style='text-align: center;'>
                          <el-button type="primary" size="small" @click="addUser">添加用户</el-button>
                  </el-col>
                   <el-col :span="3" style='text-align: center;'>
                          <el-button type="primary" size="small" @click="removeUser">移除已选用户</el-button>
                  </el-col>
                </el-row>
            </el-form>
           </div>
          <el-row>
            <el-table border style="width: 100%"
                      stripe :data="tableData1"
                      ref="multipleTable"
                      @select="choose1"
                      @select-all="chooseAll1"
                >
              <el-table-column type="selection" label="选择" align="center" width="55"></el-table-column>
              <el-table-column prop="organizeId" label="部门编号" align="center"></el-table-column>
              <el-table-column prop="organizeName" label="部门" align="center"></el-table-column>
              <el-table-column prop="userId" label="工号" align="center"></el-table-column>
              <el-table-column prop="realName" label="姓名" align="center"></el-table-column>
              <el-table-column prop="position" label="职位" align="center"></el-table-column>
              <el-table-column label="电话" align="center" prop="telephone"></el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                @size-change="handleSizeChange1"
                @current-change="handleCurrentChange1"
                :current-page="pagination1.current_page"
                :page-sizes="[10, 30, 50,100]"
                :page-size="pagination1.page_size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagination1.total_count"
              ></el-pagination>
            </div>
          </el-row>
        </div>
         <div class="mcard" v-show="currentTabIndex==1">
          <div class="title">选择部门</div>
           <div>
           <el-form label-width="120px" size="small">
              <el-row style="margin-bottom: 20px;">
              <!-- <el-col :span="6">
                    <el-col>
                    <el-form-item label="公司名称：">
                        <el-select v-model="value" placeholder="请选择公司名称">
                          <el-option label="公司名称" value="wxpay_native"></el-option>
                          <el-option label="公司名称" value="alipay_qr"></el-option>
                          <el-option label="公司名称" value="e-bank"></el-option>
                          <el-option label="公司名称" value="bank_transfer"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="6">
                    <el-col>
                    <el-form-item label="部门名称：">
                        <el-select v-model="departmentVal1" placeholder="请选择">
                              <el-option
                                v-for="item in departmentName1"
                                :key="item.organizeId"
                                :label="item.description"
                                :value="item.organizeId">
                              </el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="2" style='text-align: center;'>
                          <el-button type="primary" size="small" @click="">搜索</el-button>
                  </el-col> -->
                  <el-col :span="2" style='text-align: center;'>
                          <el-button type="primary" size="small" @click="addBranch">添加部门</el-button>
                  </el-col>
                   <el-col :span="3" style='text-align: center;'>
                          <el-button type="primary" size="small" @click="removeBranch">移除已选部门</el-button>
                  </el-col>
                </el-row>
            </el-form>
           </div>
          <el-row>
              <el-table border style="width: 100%" stripe :data="tableData2"
                        ref="multipleTable"
                        @select="choose2"
                        @select-all="chooseAll2"
                  >
              <el-table-column  type="selection"  width="55"></el-table-column>
              <el-table-column prop="" label="公司名称" align="center">{{ companyName }}</el-table-column>
              <el-table-column prop="organizeName" label="部门" align="center"></el-table-column>
              <el-table-column prop="adminUserName" label="部门负责人" align="center"></el-table-column>
              <el-table-column prop="quotaAdminUserName" label="部门额度管理人" align="center"></el-table-column>
              <el-table-column prop="quotaGrantUserName" label="部门额度发放人" align="center"></el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                @size-change="handleSizeChange2"
                @current-change="handleCurrentChange2"
                :current-page="pagination2.current_page"
                :page-sizes="[10, 30, 50,100]"
                :page-size="pagination2.page_size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagination2.total_count"
              ></el-pagination>
            </div>
          </el-row>
        </div>
      </div>

      <div class="mcard mbottom" v-show="purchasing" style="margin-top: 20px;">
       	<div class="goods-fitter">
          <el-form label-width="120px" size="small">
              <div class="vender">
                  <ul class="clearfix">
                      <li
                        v-for="(item,index) in venderList"
                        @click="tabVender1(item.value,index)"
                        :class="num == index ? 'active' : ''"
                        :key="index"
                      >
                        <i class="image">
                            <img :src="require(`@/common/images/${item.image}`)" alt="item.name"/>
                        </i>
                        <span>{{item.name}}</span>
                      </li>
                  </ul>
              </div>
              <div class="search-wrapper">
                  <h4 class="title">限购商品</h4>
                  <div class="search-main">
                     <el-row>
                          <el-col :span="8">
                          <el-col>
                          <el-form-item label="商品分类：">
                                 <div class="addbcd">
                                    <treeselect
                                      :options="categoryList"
                                      placeholder="请选择商品分类"
                                      v-model="cat_id"
                                      :clearable="false"
                                    />
                                  </div>
                          </el-form-item>
                          </el-col>
                        </el-col>
                         <el-col :span="8">
                          <el-col>
                          <el-form-item label="商品品牌：">
                              <el-select
                                  v-model="goods_branch"
                                  filterable
                                  remote
                                  clearable
                                  :remote-method="remoteMethod"
                                  v-el-select-loadmore="loadmore"
                                  placeholder="请选择商品品牌"
                                >
                                  <el-option
                                    v-for="item in branchList"
                                    :key="item.brandId"
                                    :label="item.brandName"
                                    :value="item.brandId"
                                  ></el-option>
                                </el-select>
                            </el-form-item>
                          </el-col>
                        </el-col>
                    </el-row>
                    <el-row>
                         <el-col :span="14">
														<el-col>
																<el-form-item label="关键字：">
																		<el-select class="el-select-width" v-model="form33.search_type" placeholder="请选择">
																				<el-option label="按商品名称" value="1"></el-option>
																				<el-option label="按供应商名称" value="2"></el-option>
																				<el-option label="型号" value="3"></el-option>
																				<el-option label="品牌" value="4"></el-option>
																		</el-select>
																		<div class="el-input-width">
																				<el-input v-model="form33.keyword" placeholder="请输入关键字"></el-input>
																		</div>
																</el-form-item>
														</el-col>
												</el-col>

                        <el-col :span="2" style='text-align: center;'>
                                <el-button type="primary" size="small" @click="">搜索</el-button>
                        </el-col>
                        <el-col :span="2" style='text-align: center;'>
                                <el-button type="primary" size="small" @click="addGoods">添加商品</el-button>
                        </el-col>
                        <el-col :span="3" style='text-align: center;'>
                                <el-button type="primary" size="small" @click="removeGoods">移除已选商品</el-button>
                        </el-col>
                      </el-row>
                  </div>
                     <el-row>
                         <el-table border style="width: 100%" stripe :data="tableData3"
                                   ref="multipleTable"
                                   @select="choose3"
                                   @select-all="chooseAll3">
                        <el-table-column type="selection"  align="center" width="55"></el-table-column>
                        <el-table-column label="商品分类" align="center" prop="catName"></el-table-column>
                        <el-table-column label="商品品牌" align="center" prop="brandName"></el-table-column>
                        <el-table-column label="图片" align="center">
                          <template slot-scope="scope">
                                <div class="image" v-if="scope.row.skuInfo[scope.row.index].thumbnailImgUrl">
                                    <img
                                        :src="scope.row.skuInfo[scope.row.index].thumbnailImgUrl"
                                        width="100"
                                        height="100"
                                        alt
                                    />
                                </div>
                                <div v-if="!scope.row.skuInfo[scope.row.index].thumbnailImgUrl">暂无图片</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="商品详情" align="center">
                          <template slot-scope="scope">
                                <div class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
                                <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                                <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                                <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                                <div class="txt_left">上传方式：{{scope.row.sourceType}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="规格尺寸" align="center">
                          <template slot-scope="scope">
                                <div style="position:relative">
                                    <!-- <el-button @click="down">向上</el-button> -->
                                    <div style="height: 300px;overflow: auto;" :ref="'down'+scope.$index">
                                        <div class="txt_left martop" v-for="(item,index) in scope.row.skuInfo" :key="index">
                                            <div
                                                class="txt_left imgitem"
                                                :class="[index == scope.row.index?'leftbottom':'']"
                                            >
                                                <!-- <img src="../../../common/images/商品规格(1)shouji.png" alt="" v-if="index == scope.row.index">  -->
                                                <div class="more">{{item.goodsSpecValues}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <el-button @click="down(scope.row,scope.$index)">向下</el-button> -->
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="商品价格" align="center">
                          <template slot-scope="scope">
                                <div
                                    class="txt_left"
                                >商城价：{{scope.row.skuInfo[scope.row.index].priceInfo.goodsPrice !=
                                    0?scope.row.skuInfo[scope.row.index].priceInfo.goodsPrice:'暂无'}}
                                </div>
                                <div
                                    class="txt_left"
                                >市场价：{{scope.row.skuInfo[scope.row.index].priceInfo.marketPrice !=
                                    0?scope.row.skuInfo[scope.row.index].priceInfo.marketPrice:'暂无'}}
                                </div>
                                <div
                                    class="txt_left"
                                >税率：{{scope.row.skuInfo[scope.row.index].priceInfo.taxRate !=
                                    0?scope.row.skuInfo[scope.row.index].priceInfo.taxRate+'%':'暂无'}}
                                </div>
                                <!-- <div class="txt_left">
                                    一件代发价：
                                    <span
                                        class="blue"
                                        v-if="scope.row.skuInfo[scope.row.index].priceInfo.costPrice != 0"
                                    >{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice}}</span>
                                    <span v-if="scope.row.skuInfo[scope.row.index].priceInfo.costPrice == 0">不支持一件代发</span>
                                </div> -->
                                <div
                                    class="txt_left"
                                >运费：{{scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice !=0?scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice:scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice== ''?'含运费':'含运费'}}
                                </div>
                                <div
                                    class="txt_left"
                                >京东价：{{scope.row.skuInfo[scope.row.index].priceInfo.jdPrice !=
                                    0?scope.row.skuInfo[scope.row.index].priceInfo.jdPrice:'暂无'}}
                                </div>
                                <!-- <div
                                    class="txt_left"
                                >市场价对比京东折扣率：{{scope.row.skuInfo[scope.row.index].priceInfo.costJdRatio !=
                                    0?scope.row.skuInfo[scope.row.index].priceInfo.costJdRatio:'暂无'}}
                                </div>
                                <div
                                    class="txt_left"
                                >商城价对比京东折扣率：{{scope.row.skuInfo[scope.row.index].priceInfo.shopJdRatio !=
                                    0?scope.row.skuInfo[scope.row.index].priceInfo.shopJdRatio:'暂无'}}
                                </div> -->
                            </template>
                        </el-table-column>
                      </el-table>
                      <div class="pagination">
                        <el-pagination
                          @size-change="handleSizeChange3"
                          @current-change="handleCurrentChange3"
                          :current-page="pagination3.current_page"
                          :page-sizes="[10, 30, 50,100]"
                          :page-size="pagination3.page_size"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="pagination3.total_count"
                        ></el-pagination>
                      </div>
                     </el-row>

               </div>
          </el-form>
	    	</div>

      </div>

         <div class="mcard mbottom" style="margin: 20px 0 40px 0;border: 1px solid #d6deef;">
          <div class="title">审核流程信息</div>
           <div>
             <el-form ref="form" :modal="messageTitle" label-width="100px" size="small">
              <el-row>
                  <el-col :span="24">
                    <el-col :span="6">
                      <el-form-item label="额度管理人:" >
                         xxx
                      </el-form-item>
                    </el-col>
                     <el-col :span="6">
                      <el-form-item label="额度发放人:" >
                         xxx
                      </el-form-item>
                    </el-col>
                      <el-col :span="6">
                      <el-form-item label="提交审核:" >
                         xxx
                      </el-form-item>
                    </el-col>
                      <el-col :span="6">
                      <el-form-item label="初级审核:" >
                         xxx
                      </el-form-item>
                    </el-col>
                  </el-col>
              </el-row>
               <el-row>
                  <el-col :span="24">
                    <el-col :span="6">
                      <el-form-item label="继续审核:" >
                         xxx
                      </el-form-item>
                    </el-col>
                     <el-col :span="6">
                      <el-form-item label="继续审核:" >
                         xxx
                      </el-form-item>
                    </el-col>
                      <el-col :span="6">
                      <el-form-item label="继续审核:" >
                         xxx
                      </el-form-item>
                    </el-col>
                      <el-col :span="6">
                      <el-form-item label="终极审核:" >
                         xxx
                      </el-form-item>
                    </el-col>
                  </el-col>
               </el-row>
             </el-form>
           </div>

          </div>
          <el-row style="text-align:center;">
            <el-button type="danger" @click="reset">重置</el-button>
            <el-button type="primary" @click="quotaMemberSave">确定</el-button>
          </el-row>

    <!-- 添加用户 -->
    <el-dialog title="添加用户"  :visible.sync="dialogAddUserVisible" width="80%" :close-on-click-modal="false" :before-close="userCancel">
       <div class="mbottom">
          <div class="goods-fitter">
            <el-form label-width="100px" size="small" :model="form">
              <div class="search-wrapper">
                <h4 class="title">搜索条件</h4>
                <div class="search-base" style='position: relative;left: -20px;'>
                  <el-row>
                       <el-col :span="7">
                        <el-col :span="24">
                            <el-col :span="24">
                                  <el-form-item label="组织架构:">
                                  <treeselect
                                    :options="options1"
                                    search-nested
                                    placeholder="请选择组织架构"
                                    v-model="form.organizeId"
                                  />
                                </el-form-item>
                            </el-col>
                        </el-col>
                      </el-col>
                       <el-col :span="7">
                           <el-form-item label="姓名:">
                             <el-input  v-model="userNameAdd" placeholder="请输入姓名"></el-input>
                           </el-form-item>
                      </el-col>
                       <el-col :span="7">
                          <el-form-item label="电话:">
                           <el-input   v-model="telephoneAdd" type="number" placeholder="请输入电话"></el-input>
                        </el-form-item>
                      </el-col>
                      
                      <el-col :span="1" class="btn_right">
                        <el-button type="primary" size="small" @click="selectUser()" >搜索</el-button>
                      </el-col>
                  </el-row>
                </div>
         </div>
            </el-form>
       </div>
       </div>
      <div class="mbottom">
          <div class="goods-fitter">
            <el-form label-width="150px" size="small" :model="form">
              <div class="search-wrapper">
                <h4 class="title">用户列表</h4>
                <template>
                      <div style="margin: 0 20px 20px 0;">
               <el-table  :data="tableData"
                  stripe
                  style="width: 100%"
                  border
                  ref="multipleTable"
                  @select="choose"
                  @select-all="chooseAll"
                  @selection-change="handleSelectionChange"
                  >
                <el-table-column type="selection" label="选择" align="center" width="55"></el-table-column>
                <el-table-column label="部门编号" align="center" prop="organizeId"></el-table-column>
                <el-table-column label="部门" align="center" prop="organizeName">
                </el-table-column>
                <el-table-column label="工号" align="center" prop="userId">
                </el-table-column>
                <el-table-column label="姓名" align="center" prop="realName">
                </el-table-column>
                <el-table-column label="职位" align="center" prop="position">
                </el-table-column>
                <el-table-column label="电话" align="center" prop="telephone">
                </el-table-column>
              </el-table>
              <div class="pagination" style='text-align: right; margin-top: 20px;'>
                <el-pagination
                  @size-change="handleSizeChange11"
                  @current-change="handleCurrentChange11"
                  :current-page="pagination11.current_page"
                  :page-sizes="[10, 30, 50, 100]"
                  :page-size="pagination11.page_size"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="pagination11.total_count"
                ></el-pagination>
              </div>
          </div>
                </template>
              </div>
            </el-form>
          </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="userCancel" size="small">取 消</el-button>
        <el-button type="primary" @click="userSave" size="small" >确 定</el-button>
      </span>
    </el-dialog>
     <!-- 添加用户 -->

        <!-- 添加部门 -->
    <el-dialog title="添加部门"  :visible.sync="dialogAddBranchVisible" width="80%" :close-on-click-modal="false" :before-close="branchCancel">
       <div class="mbottom">
          <div class="goods-fitter">
            <el-form label-width="120px" size="small">
               <div class="search-wrapper">
                <h4 class="title">搜索条件</h4>
                <div class="search-base" style='position: relative;left: -20px;'>
                 <el-row>
                       <el-col :span="8">
                        <el-col :span="24">
                            <el-col :span="24">
                                  <el-form-item label="组织架构:">
                                  <treeselect
                                    :options="options1"
                                    search-nested
                                    placeholder="请选择组织架构"
                                    v-model="form2.organizeId"
                                  />
                                </el-form-item>
                            </el-col>
                        </el-col>
                      </el-col>
                      <el-col :span="1" class="btn_right">
                        <el-button type="primary" size="small" @click="selectBranch()" >搜索</el-button>
                      </el-col>
                </el-row>
               </div>
             </div>
            </el-form>
       </div>
       </div>
      <div class="mbottom">
          <div class="goods-fitter">
            <el-form label-width="150px" size="small" :model="form">
              <div class="search-wrapper">
                <h4 class="title">部门列表</h4>
                <template>
                      <div style="margin: 0 20px 20px 0;">
                          <el-table border style="width: 100%" stripe :data="tableData22"
                                    ref="multipleTable"
                                    @select="choose22"
                                    @select-all="chooseAll22"
                                    @selection-change="handleSelectionChange22"
                          >
                          <el-table-column  type="selection"  width="55"></el-table-column>
                          <el-table-column prop="" label="公司名称" align="center">{{ companyName }}</el-table-column>
                          <el-table-column prop="organizeName" label="部门" align="center"></el-table-column>
                          <el-table-column prop="adminUserName" label="部门负责人" align="center"></el-table-column>
                          <el-table-column prop="quotaAdminUserName" label="部门额度管理人" align="center"></el-table-column>
                          <el-table-column prop="quotaGrantUserName" label="部门额度发放人" align="center"></el-table-column>
                        </el-table>
                        <!-- <div class="pagination">
                          <el-pagination
                            @size-change="handleSizeChange2"
                            @current-change="handleCurrentChange2"
                            :current-page="pagination2.current_page"
                            :page-sizes="[10, 30, 50,100]"
                            :page-size="pagination2.page_size"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="pagination2.total_count"
                          ></el-pagination>
                        </div> -->
                      </div>
                </template>
              </div>
            </el-form>
          </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="branchCancel" size="small">取 消</el-button>
        <el-button type="primary" @click="branchSave" size="small" >确 定</el-button>
      </span>
    </el-dialog>
     <!-- 添加部门 -->


     <!-- 添加商品 -->
    <el-dialog   title="添加限购商品" :visible.sync="dialogAddGoodsVisible" width="80%" :close-on-click-modal="false" :before-close="goodsCancel">
       <div class="mbottom">
          <div class="goods-fitter">
            <el-form label-width="100px" size="small" :model="form">
              <div class="search-wrapper">
                <h4 class="title">搜索条件</h4>
                <div class="search-base" style='position: relative;left: -20px;'>
                  <el-row>
                     <el-col :span="8">
                        <el-col>
														<el-form-item label="商品分类：">
															  <div class="addbcd">
                                    <treeselect
                                      :options="categoryList1"
                                      placeholder="请选择商品分类"
                                      v-model="cat_id1"
                                      :clearable="true"
                                    />
                                  </div>
														</el-form-item>
												</el-col>
                    </el-col>
                     <el-col :span="8">
                        <el-col>
														<el-form-item label="商品品牌：">
																<el-select
                                  v-model="goods_branch1"
                                  filterable
                                  remote
                                  clearable
                                  :remote-method="remoteMethod1"
                                  placeholder="请选择商品品牌"
                                  v-el-select-loadmore="loadmore1"
                                >
                                  <el-option
                                    v-for="item in branchList1"
                                    :key="item.brandId"
                                    :label="item.brandName"
                                    :value="item.brandName"
                                  ></el-option>
                                </el-select>
														</el-form-item>
												</el-col>
                    </el-col>
              </el-row>
                    <el-row>
                     <el-col :span="10">
														<el-col>
																<el-form-item label="关键字：">
																		<el-select class="el-select-width" v-model="form33.search_type" placeholder="请选择">
																				<el-option label="按商品名称" value="1"></el-option>
																				<el-option label="按供应商名称" value="2"></el-option>
																				<el-option label="型号" value="3"></el-option>
																				<el-option label="品牌" value="4"></el-option>
																		</el-select>
																		<div class="el-input-width">
																				<el-input v-model="form33.keyword" placeholder="请输入关键字"></el-input>
																		</div>
																</el-form-item>
														</el-col>
												</el-col>
                    <el-col :span="6">
                      <el-col  class="btn_right" style="display: inline-block;width: auto !important;margin-bottom: 19px;">
                          <el-button type="primary" size="small" @click='serch()' >搜索</el-button>
                      </el-col>
                    </el-col>
                  </el-row>
                </div>
        </div>
            </el-form>
       </div>
       </div>
      <div class="mbottom">
          <div class="goods-fitter">
            <el-form label-width="150px" size="small" :model="form">
              <div class="search-wrapper">
                <h4 class="title">限购商品列表</h4>
                <template>
                      <div style="margin: 0 20px 20px 0;">
               <el-table :data="tableData33" stripe style="width: 100%" border
                 v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                @select="choose33"
                @select-all="chooseAll33"
                @selection-change="handleSelectionChange33">
                <el-table-column type="selection"  align="center" width="55"></el-table-column>
                <el-table-column label="商品分类" align="center" prop="catName"></el-table-column>
                <el-table-column label="商品品牌" align="center" prop="brandName"></el-table-column>
                <el-table-column label="图片" align="center">
                	<template slot-scope="scope">
												<div class="image" v-if="scope.row.skuInfo[scope.row.index].thumbnailImgUrl">
														<img
																:src="scope.row.skuInfo[scope.row.index].thumbnailImgUrl"
																width="100"
																height="100"
																alt
														/>
												</div>
												<div v-if="!scope.row.skuInfo[scope.row.index].thumbnailImgUrl">暂无图片</div>
										</template>
                </el-table-column>
                <el-table-column label="商品详情" align="center">
                 	<template slot-scope="scope">
												<div class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
												<div class="txt_left">货号：{{scope.row.goodsSn}}</div>
												<div class="txt_left">型号：{{scope.row.modelNumber}}</div>
												<div class="txt_left">品牌：{{scope.row.brandName}}</div>
												<div class="txt_left">上传方式：{{scope.row.sourceType}}</div>
										</template>
                </el-table-column>
                <el-table-column label="规格尺寸" align="center">
                 	<template slot-scope="scope">
												<div style="position:relative">
														<!-- <el-button @click="down">向上</el-button> -->
														<div style="height: 300px;overflow: auto;" :ref="'down'+scope.$index">
																<div class="txt_left martop" v-for="(item,index) in scope.row.skuInfo" :key="index">
																		<div
																				class="txt_left imgitem"
																				:class="[index == scope.row.index?'leftbottom':'']"
																		>
                                                                            <!-- <img src="../../../common/images/商品规格(1)shouji.png" alt="" v-if="index == scope.row.index">  -->
																				<div class="more">{{item.goodsSpecValues}}</div>
																		</div>
																</div>
														</div>
														<!-- <el-button @click="down(scope.row,scope.$index)">向下</el-button> -->
												</div>
										</template>
                </el-table-column>
                <el-table-column label="商品价格" align="center">
                  <template slot-scope="scope">
												<div
														class="txt_left"
												>商城价：{{scope.row.skuInfo[scope.row.index].priceInfo.goodsPrice !=
														0?scope.row.skuInfo[scope.row.index].priceInfo.goodsPrice:'暂无'}}
												</div>
												<div
														class="txt_left"
												>市场价：{{scope.row.skuInfo[scope.row.index].priceInfo.marketPrice !=
														0?scope.row.skuInfo[scope.row.index].priceInfo.marketPrice:'暂无'}}
												</div>
												<div
														class="txt_left"
												>税率：{{scope.row.skuInfo[scope.row.index].priceInfo.taxRate !=
														0?scope.row.skuInfo[scope.row.index].priceInfo.taxRate+'%':'暂无'}}
												</div>
												<!-- <div class="txt_left">
														一件代发价：
														<span
																class="blue"
																v-if="scope.row.skuInfo[scope.row.index].priceInfo.costPrice != 0"
														>{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice}}</span>
														<span v-if="scope.row.skuInfo[scope.row.index].priceInfo.costPrice == 0">不支持一件代发</span>
												</div> -->
												<div
														class="txt_left"
												>运费：{{scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice !=0?scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice:scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice== ''?'含运费':'含运费'}}
												</div>
												<div
														class="txt_left"
												>京东价：{{scope.row.skuInfo[scope.row.index].priceInfo.jdPrice !=
														0?scope.row.skuInfo[scope.row.index].priceInfo.jdPrice:'暂无'}}
												</div>
												<!-- <div
														class="txt_left"
												>市场价对比京东折扣率：{{scope.row.skuInfo[scope.row.index].priceInfo.costJdRatio !=
														0?scope.row.skuInfo[scope.row.index].priceInfo.costJdRatio:'暂无'}}
												</div>
												<div
														class="txt_left"
												>商城价对比京东折扣率：{{scope.row.skuInfo[scope.row.index].priceInfo.shopJdRatio !=
														0?scope.row.skuInfo[scope.row.index].priceInfo.shopJdRatio:'暂无'}}
												</div> -->
										</template>
                </el-table-column>
              </el-table>
              <div class="pagination" style='text-align: right; margin-top: 20px;'>
                <el-pagination
                  @size-change="handleSizeChangeGt"
                  @current-change="handleCurrentChangeGt"
                  :current-page="formGt.current_page"
                  :page-sizes="[10, 30, 50, 100]"
                  :page-size="formGt.page_size"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="formGt.total_count"
                ></el-pagination>
              </div>
          </div>
                </template>
              </div>
            </el-form>
          </div>
      </div>
      <span slot="footer" class="dialog-footer">
       <el-button type="danger" @click="goodsCancel" size="small">取 消</el-button>
        <el-button type="primary" @click="goodsSave" size="small" >确 定</el-button>
      </span>
    </el-dialog>
     <!-- 添加商品 -->
  </div>

</template>

<script>
import {   dealerAccount  , findByPageUser ,getAllOrganizational , quotaMemberSave , getBrand , getIdgoodspec ,  getcategory2 , quotaPaymentList , findByPageBranch , goodsserviceList} from '@/api/creditmanage/index'
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: 'Notice',
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
  components: {
    Treeselect
  },
  data () {
    return {
         dialogAddUserVisible:false,    // 添加用户
         dialogAddBranchVisible:false,  // 添加部门
         dialogAddGoodsVisible:false,   // 添加商品
         quotaManagerName: '',          // 额度管理人
        quotaExecutorName: '',         // 额度发放人
         dealersAccount : '',           // 账户id
         agencyName : '',               // 账户名
         dealersAccountList : [] ,     // 账户下拉
        agrant: '',                   // 发放额度
         radio: '0',                   // 是否限购

         num:0,                        // 限购商品分类（自营，京东，苏宁，网易）

         form:{
           organizeId : '',  //弹框根据组织id查询（个人）
           telephone:'',
           userName:''
         },
         userNameAdd:'',
         telephoneAdd:'',
         options1:[],         // 弹框组织构架
        checkedAll: "",
         checkArr: [],        // 弹框选中的保存
         select:[],

         form2:{
           organizeId : null,  //弹框根据组织id查询(部门)
         },
         checkedAll1: "",
         checkArr1: [], // 选中的删除

         tableData:[],  // 用户弹框
         tableData1:[], // 已选中的用户列表
         tableDataU:[],
         tableData22:[], // 部门列表弹框
         tableData2:[], // 已选中的部门列表
         tableDataB:[],
         checkArr22: [],        // 弹框选中的保存
         select22:[],
         checkArr2: [],        // 选中删除删除
         checkedAll22: "",
         checkedAll2: "",

         loading:true,     // 商品列表加载图
         tableData33:[],  // 商品列表弹框
         tableData3:[],   // 已选中的商品列表
         checkArr33: [],        // 弹框选中的保存
         checkArr3: [],        // 选中删除删除
         checkedAll33: "",
         checkedAll3: "",
         select33:[],

         beneficiaryType: 0,

         form33:{
           keyword :'',
           search_type :''
         },

         constType : "自营",
         constTable:[],
         tableData3:[], // 已选中的限购商品列表
         form3:{
           keyword :'',
           search_type :''
         },
         options:[],
         venderList: [
            // {
            //     name: '全类品',
            //     image: 'yjdf.png',
            //     value: '4'
            // },
            {
                name: '自营',
                image: 'jc.png',
                value: '5'
            },
            {
                name: '京东',
                image: 'jd.png',
                value: '1'
            }, {
                name: '苏宁',
                image: 'sn.png',
                value: '3'
            }, {
                name: '网易',
                image: 'yx.png',
                value: '2'
        }],
        form:{
					// third_party: '4', // 1，京东 2，网易 3，苏宁 4, 一件代发商品 5, 集采商品
					// goodsName:'',
					// operatorTimeEnd:'',
					// operatorTimeStart:'',
					// pageNum:'',
					// pageSize:'',
					// projectId:'',
					// pushStatus:'',
					sourceType:''
        },

        companyName:'',

        purchasing : false,      // 限购商品显与不显
        currentTabIndex:0,       // 切换个人与部门
        value:'',
        messageTitle:'',

        branchList: [],     // 商品品牌列表
        goods_branch: '',   // 商品品牌id
        objvalue: {
          brandId: "",
          brandName: ""
        },
         objBranch:{
           keyWord :"",
           pageIndex :1,
           pageSize : 10,
        },
        branchList1: [],     // 商品品牌列表
        goods_branch1: '',   // 弹框商品品牌id
        objvalue1: {
          brandId: "",
          brandName: ""
        },
        objBranch1:{
           keyWord :"",
           pageIndex :1,
           pageSize : 10,
        },

        categoryList: [], // 商品分类
        cat_id: null, // 商品分类

        categoryList1: [], // 弹框商品分类
        cat_id1: null, // 弹框商品分类

        pagination1: {                    // 个人分页
          current_page: 1,
          page_size: 10,
          total_count: 0
       },
        pagination11: {                    // 个人分页弹框
          current_page: 1,
          page_size: 10,
          total_count: 0
       },
       pagination2: {                     // 部门分页
          current_page: 1,
          page_size: 10,
          total_count: 0
      },
      pagination3: {                   // 商品分页
          current_page: 1,
          page_size: 10,
          total_count: 0
      },
      formGt: {                       // 商品弹框分页
          current_page: 1,
          page_size: 10,
          total_count: 0
      },

      pagination: {
        current_page: 1,
        page_size: 10,
        total_count: 0
      },

    }
  },
  created () {
     this.dealerAccount()    // 经销商账户
      this._getBrand()        // 商品品牌下拉
      this._getCatagory();    // 获取商品分类

    //  this.quotaPaymentList1(0);  //获取发放给个人列表
  },
    methods: {
    // 弹框的组织结构
     getAllOrganizational(){
        getAllOrganizational().then(res => {
          let arr1 = [];
          arr1.push(res.data);
          this.transleteData1(arr1, this.options1);
          this.IterationDelateMenuChildren1(this.options1);
        });
     },
     transleteData1(data, arr) {
      data.forEach(item => {
        if (!item.parentId) {
          item.parentId = 0;
          this.companyName = item.organizeName
          item.parentName = "所有部门";
        }
        const msg = {
          id: item.organizeId,
          label: item.organizeName,
          value: item.organizeId,
          children: item.childNodes ? [] : null,

          isLeaf: item.childNodes ? false : true
        };
        if (item.childNodes && item.childNodes.length > 0) {
          this.transleteData1(item.childNodes, msg.children);
        }
        arr.push(msg);
      });
      return arr;
    },
     IterationDelateMenuChildren1(arr) {
      if (arr.length) {
        for (let i in arr) {
          if (arr[i].children.length) {
            this.IterationDelateMenuChildren1(arr[i].children);
          } else {
            delete arr[i].children;
          }
        }
      }
      return arr;
    },
    // 经销商账户下拉框
     dealerAccount() {
        let data = {}
        data.pageNum = 1
        data.pageSize = 10000
        dealerAccount(data).then( res =>{
          this.dealersAccountList = res.data.list
        });
    },
    GetAccount(e){
       let obj = {};
       obj = this.dealersAccountList.find((item)=>{//这里的userList就是上面遍历的数据源
          return item.id === e;//筛选出匹配数据
      });
       this.agencyName = obj.accountName
    },
    // 返回
    back() {
      this.$router.go(-1);
    },
    // 用户列表
    // quotaPaymentList1(index) {
    //   if ( index == 0 ) {
    //       var data = {}
    //       quotaPaymentList(data).then( res =>{
    //         this.tableData1 = res.data.list.quotaBeneficiaryUserList
    //         this.pagination1.total_count = res.data.total
    //       });
    //   }else if( index == 1 ){
    //      var data = {}
    //       quotaPaymentList(data).then( res =>{
    //         this.tableData2 = res.data.list.quotaBeneficiaryUserList
    //         this.pagination2.total_count = res.data.total
    //       });
    //   }else if( index == 2 ){
    //      var data = {}
    //       quotaPaymentList(data).then( res =>{
    //         this.tableData3 = res.data.list.quotaGrantGoodsList
    //         this.pagination3.total_count = res.data.total
    //       });
    //   }

    // },
    // 添加用户列表取消
    userCancel() {
       if( this.select.length>=1 ){
         this.$confirm('确定放弃已选择的用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.dialogAddUserVisible = false
            this.checkArr = []
            this.form.organizeId = null
            this.telephoneAdd = ''
            this.userNameAdd = ''
            this.tableData = []
        }).catch(() => {

        });
      }else{
      this.dialogAddUserVisible = false
      this.checkArr = []
      this.form.organizeId = null
      this.telephoneAdd = ''
      this.userNameAdd = ''
      this.tableData = []
      }
    },
    // 添加用户列表确定
    userSave() {
      if( this.select.length<1 ){
          this.$message({
          message: '请选择需要保存的用户',
          type: 'warning'
        })
        return
      }
      if ( this.tableDataU.length >=1 ){
        this.tableDataU.forEach(data => {
          this.checkArr.forEach(item => {
              if( data.userId == item.userId  ){
                  this.tableDataU = this.tableDataU.filter(t => t.userId != item.userId)
              }
          });
        });
      }
      this.checkArr.forEach(data => {
          this.tableDataU.push(data)
      });

      this.dialogAddUserVisible = false
      this.pagination1.total_count = this.tableDataU.length
      this.pagination1.current_page = 1
      this.tableData1 = this.tableDataU.slice((this.pagination1.current_page-1)*10,this.pagination1.page_size*this.pagination1.current_page)
      this.form.organizeId = null
      this.tableData = []
      this.checkArr = []
    },
    // 添加用户
     addUser() {
      this.dialogAddUserVisible = true
      this.form.organizeId = null
      this.options1 = []
      this.telephoneAdd = ''
      this.userNameAdd = ''
      // 弹框里面搜索的树形结构
      this.getAllOrganizational()
      this.checkArr = []
      this.tableData = []
    },
    // 移除已选择用户
    removeUser(){
        if(  !this.checkArr1.length ){
          this.$message({
            type: 'warning',
            message: '请选择想要移除的用户'
          })
          return
       }
       this.tableData1.forEach(data => {
           this.checkArr1.forEach(item => {
               if( data.sysuserId == item.sysuserId  ){
                  this.tableData1 = this.tableData1.filter(t => t.sysuserId != item.sysuserId)
               }
          });
       });
        this.checkArr1 = []
        if( this.tableData1.length == 0 ){
             this.tableDataU = []
        }
    },
     //单选(删除)
    choose1(selection, row) {
      this.deletechecked1(row);
      this.checkedAll1 = false;
    },
    //多选(删除)
    chooseAll1(selection) {
      this.checkedAll1 = false;
      if (selection.length) {
        selection.forEach(data => {
          this.checkArr1.push(data);
        });
      } else {
        this.tableData1.forEach(item => {
          this.deletechecked1(item);
        });
      }
    },
      // 删除记忆选择的数据(删除)
    deletechecked1(data) {
      let index = this.checkArr1.indexOf(data);
      if (index != -1) {
        this.checkArr1.splice(index, 1);
      } else {
        this.checkArr1.push(data);
      }
    },
    handleSelectionChange1(val){

    },
    // 弹框搜索用户
    selectUser(){
       let data = {}
       this.checkArr = []
     
      data.organizeId = this.form.organizeId
      data.telephone =  this.telephoneAdd
      data.userName =   this.userNameAdd
      data.pageNum = this.pagination11.current_page
      data.pageSize = this.pagination11.page_size
      findByPageUser(data).then(res => {
        //  this.formTable.total_count = res.data.total
          this.tableData = res.data.list
          this.pagination11.total_count = res.data.total
      });
       
    },
    // 添加商品
    addGoods() {
      this.dialogAddGoodsVisible = true
      this.formGt.current_page = 1

        this.checkArr33 = []
      this.tableData33 = []
      this.categoryList1 = []  // 弹框商品分类
      this.cat_id1 = null     // 弹框商品分类
      this.branchList1 =  []   // 商品品牌列表
      this.goods_branch1 = ''  // 弹框商品品牌id
      this.objvalue1.brandId =''
      this.objvalue1.brandName =''

        this._getBrand1()       // 弹框商品下拉
        this._getCatagory1();   // 弹框获取商品分类
      this.serch()
    },
    removeGoods() {
       if(  !this.checkArr3.length ){
          this.$message({
            type: 'warning',
            message: '请选择想要移除的商品'
          })
          return
       }
       this.tableData3.forEach(data => {
           this.checkArr3.forEach(item => {
               if( data.goodsId == item.goodsId  ){
                  this.tableData3 = this.tableData3.filter(t => t.goodsId != item.goodsId)
               }
          });
       });
        this.checkArr3 = []
        if( this.tableData3.length == 0 ){
             this.constTable = []
        }
    },
    // 搜索商品
    serch() {
       this.loading = true
       let data = {}
       data.pageIndex =  this.formGt.current_page
       data.pageSize =  this.formGt.page_size
       data.catId =  this.cat_id1
       data.brandName =  this.goods_branch1

       if( this.form33.search_type == '1' ){
            data.goodsName =  this.form33.keyword
       }else   if( this.form33.search_type == '2' ){
            data.suppliersName =  this.form33.keyword
       }else   if( this.form33.search_type == '3' ){
            data.modelNumber =  this.form33.keyword
       }else   if( this.form33.search_type == '4' ){
            data.brandName =  this.form33.keyword
       }

        this.checkArr33 = []
        goodsserviceList(data).then(res => {
          //  this.formTable.total_count = res.data.total
            this.tableData33 = res.data.pageList
            this.formGt.total_count =  res.data.count
            this.loading = false
        });

    },
    // 取消商品
    goodsCancel(){
         if( this.select33.length>=1 ){
         this.$confirm('确定放弃已选择的商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.dialogAddGoodsVisible = false
            this.checkArr33 = []
            this.tableData33 = []
        }).catch(() => {

        });
      }else{
        this.dialogAddGoodsVisible = false
        this.checkArr33 = []
        this.tableData33 = []
      }

    },
      //单选(商品)
    choose33(selection, row) {
      this.deletechecked33(row);
      this.checkedAll33 = false;
    },
    //多选(删除)
    chooseAll33(selection) {
      this.checkedAll33 = false;
      if (selection.length) {
        selection.forEach(data => {
          this.checkArr33.push(data);
        });
      } else {
        this.tableData33.forEach(item => {
          this.deletechecked33(item);
        });
      }
    },
      // 删除记忆选择的数据(删除)
    deletechecked33(data) {
      let index = this.checkArr33.indexOf(data);
      if (index != -1) {
        this.checkArr33.splice(index, 1);
      } else {
        this.checkArr33.push(data);
      }
    },
    handleSelectionChange33(data){
       this.select33 = data
    },
      //单选(删除)
    choose3(selection, row) {
      this.deletechecked3(row);
      this.checkedAll3 = false;
    },
    //多选(删除)
    chooseAll3(selection) {
      this.checkedAll3 = false;
      if (selection.length) {
        selection.forEach(data => {
          this.checkArr3.push(data);
        });
      } else {
        this.tableData3.forEach(item => {
          this.deletechecked3(item);
        });
      }
    },
      // 删除记忆选择的数据(删除)
    deletechecked3(data) {
      let index = this.checkArr3.indexOf(data);
      if (index != -1) {
        this.checkArr3.splice(index, 1);
      } else {
        this.checkArr3.push(data);
      }
    },
    // 保存商品
    goodsSave(){
      if( this.select33.length<1 ){
          this.$message({
          message: '请选择需要保存的商品',
          type: 'warning'
        })
        return
      }
      if ( this.constTable.length >=1 ){
            this.constTable.forEach(data => {
              this.checkArr33.forEach(item => {
                  if( data.goodsId == item.goodsId  ){
                      this.constTable = this.constTable.filter(t => t.goodsId != item.goodsId)
                  }
              });
            });
          }
       this.checkArr33.forEach(data => {
           this.constTable.push(data)
      });


        this.dialogAddGoodsVisible = false
      this.tableData33 = []
      this.checkArr33 = []

        // this.constTable =  this.tableData3
      this.pagination3.current_page = 1
      this.switchGoodsType(this.constType)
    },
    // 切换个人或部门
    tabVender(index){

        if( index == 1 && this.tableDataU.length ){
          this.tableDataB = []
           this.$message({
            message: '发放给个人列表不为空的时候，不能选择发放给部门，若想发放给部门，请先清空发放给个人的列表！',
            type: 'warning'
          })
          return
        }

         if( index == 0 && this.tableDataB.length ){
           this.tableDataU = []
           this.$message({
            message: '发放给部门列表不为空的时候，不能选择发放给个人，若想发放给个人，请先清空发放给部门的列表！',
            type: 'warning'
          })
          return
        }
         this.currentTabIndex = index
         this.beneficiaryType = index
        // this.quotaPaymentList1(index)
    },
   switchGoodsType(index){
        console.log(index)
        var goodsTable = []
        this.constTable.forEach(data => {
            if( data.goodsType == index  ){
               goodsTable.push( data )
            }
        })
        this.tableData3 = []
        this.tableData3 = goodsTable
        this.pagination3.total_count =  this.tableData3.length
       // this.tableData3 = goodsTable.slice(0,10)
        this.tableData3 = goodsTable.slice((this.pagination3.current_page-1)*10,this.pagination3.page_size*this.pagination3.current_page)
   },
    // 切换商品
    tabVender1 (val,index){
        let type = ''
        if( val == 5 ){
          type = "自营"
          this.constType = "自营"
        }else if( val == 1 ){
          type = "京东"
          this.constType = "京东"
        }else if( val == 3 ){
          type = "苏宁易购"
            this.constType = "苏宁易购"
        }else if( val == 2 ){
          type = "网易"
            this.constType = "网易"
        }
        this.pagination3.current_page = 1
        this.switchGoodsType(type)

        if(index==1){
					this.form.isSubstituteSales = false
				}else if(index==0){
					this.form.isSubstituteSales = true
				}else{
				this.form.isSubstituteSales = null
				}
				if(val==0){
					this.sourceType= null
				}
				this.num = index
        this.form.sourceType = val
        this.$emit('tabVender', this.form,val)
    },
      //单选
    choose(selection, row) {
      this.deletechecked(row);
      this.checkedAll = false;
    },
    //多选
    chooseAll(selection) {
      this.checkedAll = false;
      if (selection.length) {
        selection.forEach(data => {
          this.checkArr.push(data);
        });
      } else {
        this.tableData.forEach(item => {
          this.deletechecked(item);
        });
      }
    },
      // 删除记忆选择的数据
    deletechecked(data) {
      let index = this.checkArr.indexOf(data);
      if (index != -1) {
        this.checkArr.splice(index, 1);
      } else {
        this.checkArr.push(data);
      }
    },
     handleSelectionChange(data){
       this.select = data
    },
    addBranch(){
       this.dialogAddBranchVisible = true
        this.options1 = []
       this.tableData22 = []
       this.getAllOrganizational()
       this.form2.organizeId = null
       this.checkArr22 = []
    },
    //查询部门
    selectBranch(){
       let data = {}
       this.checkArr22 = []
       if( this.form2.organizeId ) {
           data.organizeId = Number(this.form2.organizeId)
          findByPageBranch(data).then(res => {
            //  this.formTable.total_count = res.data.total
              var data = []
              data[0] = res.data
              this.tableData22 = data
          });
       }
    },
      //单选(删除)
    choose22(selection, row) {
      this.deletechecked22(row);
      this.checkedAll22 = false;
    },
    //多选(删除)
    chooseAll22(selection) {
      this.checkedAll22 = false;
      if (selection.length) {
        selection.forEach(data => {
          this.checkArr22.push(data);
        });
      } else {
        this.tableData22.forEach(item => {
          this.deletechecked22(item);
        });
      }
    },
      // 删除记忆选择的数据(删除)
    deletechecked22(data) {
      let index = this.checkArr22.indexOf(data);
      if (index != -1) {
        this.checkArr22.splice(index, 1);
      } else {
        this.checkArr22.push(data);
      }
    },
    handleSelectionChange22(data){
       this.select22 = data
    },
      //单选(删除)
    choose2(selection, row) {
      this.deletechecked2(row);
      this.checkedAll2 = false;
    },
    //多选(删除)
    chooseAll2(selection) {
      this.checkedAll2 = false;
      if (selection.length) {
        selection.forEach(data => {
          this.checkArr2.push(data);
        });
      } else {
        this.tableData2.forEach(item => {
          this.deletechecked2(item);
        });
      }
    },
      // 删除记忆选择的数据(删除)
    deletechecked2(data) {
      let index = this.checkArr2.indexOf(data);
      if (index != -1) {
        this.checkArr2.splice(index, 1);
      } else {
        this.checkArr2.push(data);
      }
    },
    removeBranch(){
       if(  !this.checkArr2.length ){
          this.$message({
            type: 'warning',
            message: '请选择想要移除的部门'
          })
          return
       }
       this.tableData2.forEach(data => {
           this.checkArr2.forEach(item => {
               if( data.id == item.id  ){
                  this.tableData2 = this.tableData2.filter(t => t.id != item.id)
               }
          });
       });
        this.checkArr2 = []
        if( this.tableData2.length == 0 ){
             this.tableDataB = []
        }
    },
    branchCancel(){
       if( this.select22.length>=1 ){
         this.$confirm('确定放弃已选择的部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.dialogAddBranchVisible = false
            this.checkArr22 = []
            this.form.organizeId = null
            this.tableData22 = []
        }).catch(() => {

         });
      }else{
       this.dialogAddBranchVisible = false
       this.checkArr22 = []
       this.form.organizeId = null
       this.tableData22 = []
      }

    },
    branchSave(){
       if( this.select22.length<1 ){
          this.$message({
          message: '请选择需要保存的部门',
          type: 'warning'
        })
        return
      }
       this.dialogAddBranchVisible = false
       if ( this.tableDataB.length >=1 ){
          this.tableDataB.forEach(data => {
            this.checkArr22.forEach(item => {
                if( data.id == item.id  ){
                    this.tableDataB = this.tableDataB.filter(t => t.id != item.id)
                }
            });
          });
        }
       this.checkArr22.forEach(data => {
           this.tableDataB.push(data)
       });

      this.pagination2.total_count = this.tableDataB.length
      this.pagination2.current_page = 1
      this.tableData2 = this.tableDataB.slice((this.pagination2.current_page-1)*10,this.pagination2.page_size*this.pagination2.current_page)

        this.form.organizeId = null
      this.tableData22 = []
      this.checkArr22 = []
    },
    // 重置
    reset(){
       this.dealersAccount = ''
       this.agrant = ''
       this.radio = '0'
       this.tableDataU = []
       this.tableDataB = []
       this.constTable = []
       this.tableData1 = []
       this.tableData2 = []
       this.tableData3 = []
       this.beneficiaryType = 0

    },
     //获取商品品牌
    _getBrand() {
      getBrand(this.objBranch).then(res => {
        this.branchList = res.data.pageList;
        this.$nextTick(() => {
          if (
            this.objvalue.brandId != "" &&
            this.objvalue.brandId != undefined
          ) {
            let showAdd = false;
            res.data.pageList.forEach(item => {
              console.log(this.objvalue.brandId);
              if (item.brandId == this.objvalue.brandId) {
                showAdd = true;
              }
            });
            if (!showAdd) {
              this.branchList.unshift(this.objvalue);
            }
          }
        });
      });
    },
    loadmore(){
        this.objBranch.keyWord = ''
        this.objBranch.pageSize+=20
        this._getBrand()
    },
     //搜索获取商品品牌
    remoteMethod(val) {
      this.objBranch.keyWord = val
      this._getBrand()
    },
     //获取商品品牌
    _getBrand1() {
      getBrand(this.objBranch1).then(res => {
        this.branchList1 = res.data.pageList;
        this.$nextTick(() => {
          if (
            this.objvalue1.brandId != "" &&
            this.objvalue1.brandId != undefined
          ) {
            let showAdd = false;
            res.data.pageList.forEach(item => {
              if (item.brandId == this.objvalue1.brandId) {
                showAdd = true;
              }
            });
            if (!showAdd) {
              this.branchList1.unshift(this.objvalue1);
            }
          }
        });
      });
    },
    loadmore1(){
        this.objBranch1.pageSize+=20;
        this._getBrand1(); 
    },
    //搜索获取商品品牌
    remoteMethod1(val) {
     this.objBranch1.keyWord = val
     this._getBrand1()
    },
     //获取商品分类
    _getCatagory() {
      let obj = {};
      obj.type = "SELECT";
      obj.id = 0;
      getcategory2(obj).then(res => {
        this.transleteData(res.data, this.categoryList);
        this.IterationDelateMenuChildren(this.categoryList);
      });
    },
     //获取商品分类
    _getCatagory1() {
      let obj = {};
      obj.type = "SELECT";
      obj.id = 0;
      getcategory2(obj).then(res => {
        this.transleteData(res.data, this.categoryList1);
        this.IterationDelateMenuChildren(this.categoryList1);
      });
    },
     transleteData(data, arr) {
      data.forEach(item => {
        // if(!item.parentId){
        //     item.parentId = 0
        //     item.parentName = '所有部门'
        // }
        const msg = {
          id: item.catId,
          label: item.catName,
          value: item.catId,
          children: item.children ? [] : null,
          isLeaf: item.children ? false : true
        };
        if (item.children && item.children.length > 0) {
          this.transleteData(item.children, msg.children);
        }
        arr.push(msg);
      });
      return arr;
    },
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
    // 保存确定
    quotaMemberSave(){
       const user = JSON.parse(localStorage.getItem("user"))
       var data = {}
      //  data.userId = Number(user.data.sysuserId)
      //  data.userName = user.data.sysuserName
      //  data.userType = Number(user.data.sysuserType)
       data.quotaManagerName = this.quotaManagerName      // 额度管理人
       data.quotaExecutorName = this.quotaExecutorName    // 额度发放人
       data.payAmount = Number(this.agrant)                       // 发放额度
      //  data.agencyId  =  this.dealersAccount              // 账户选择id
      //  data.agencyName  =  this.agencyName                // 账户选择名
       data.purchaseGoods = Number(this.radio)                    // 是否限购
        data.beneficiaryType = this.beneficiaryType          // 用户或是部门
       data.quotaBeneficiaryUserList = []
       var  quotaBeneficiaryUserList = []

       if( this.beneficiaryType == 0 ){
          console.log( this.tableDataU )
         this.tableDataU.forEach(data => {
          quotaBeneficiaryUserList.push({
             organizeId : Number(data.organizeId),
             organizeName :  data.organizeName,
             userId: Number(data.userId),
             userName :  data.realName,
            // table.userSn :  data.sysuserId,
             position : data.position,
             telephone :  data.telephone,
             email : data.email,
             accountId : Number(this.dealersAccount) ,
              accountName: this.agencyName
          })
        });
       }

        if( this.beneficiaryType == 1 ){
           console.log( this.tableDataB )
       this.tableDataB.forEach(data => {
        
          quotaBeneficiaryUserList.push({
             organizeId : Number(data.organizeId),
             organizeName : data.organizeName,
             adminUserName: data.adminUserName,
             quotaAdminUserName : data.quotaAdminUserName,
             quotaGrantUserName : data.quotaGrantUserName,
              id: data.id,
             accountId : Number(this.dealersAccount) ,
              accountName: this.agencyName
          })
       });
      }

        data.quotaBeneficiaryUserList = quotaBeneficiaryUserList

       data.quotaGrantGoodsList = []
       var quotaGrantGoodsList  = []

        console.log(data.quotaBeneficiaryUserList)
       this.constTable.forEach(data => {
          quotaGrantGoodsList.push({
              goodsType: Number(data.goodsType),
             catId : Number(data.catId),
             catName:  data.catName,
             brandName :  data.brandName,
             goodsId : Number(data.goodsId),
             goodsSn:  data.goodsSn,
             goodsName : data.goodsName,
          })
      });
      data.quotaGrantGoodsList = quotaGrantGoodsList

       quotaMemberSave(data).then(res =>{
         if( res.code == 200 ){
           this.$router.push({name:'quotaManagement'})
         }
       })
    },
    handleSelectionChange1 (data) {
      let ret = []
      data.map(item => {
        ret.push(item.id)
      })
      this.selectNotice = ret
    },
    handleSizeChange1 (val) {
      this.pagination1.page_size = val
      this.tableData1 = this.tableDataU.slice((this.pagination1.current_page-1)*10,this.pagination1.page_size*this.pagination1.current_page)
    },
    handleCurrentChange1 (val) {
      this.pagination1.current_page = val
      this.tableData1 = this.tableDataU.slice((this.pagination1.current_page-1)*10,this.pagination1.page_size*this.pagination1.current_page)
    },
      handleSizeChange11 (val) {
      this.pagination11.page_size = val
      selectUser()
    },
    handleCurrentChange11 (val) {
      this.pagination11.current_page = val
      selectUser()
    },
    handleSizeChange2 (val) {
      this.pagination2.page_size = val
      this.tableData2 = this.tableDataB.slice((this.pagination2.current_page-1)*10,this.pagination2.page_size*this.pagination2.current_page)
    },
    handleCurrentChange2 (val) {
      this.pagination2.current_page = val
      this.tableData2 = this.tableDataB.slice((this.pagination2.current_page-1)*10,this.pagination2.page_size*this.pagination2.current_page)
    },
     handleSizeChange3 (val) {
      this.pagination3.page_size = val       // 单页显示多少条
      this.switchGoodsType(this.constType)
    },
    handleCurrentChange3 (val) {
      this.pagination3.current_page = val
      this.switchGoodsType(this.constType)
    },
    handleSizeChangeGt (val) {
      this.formGt.page_size = val
      this.serch()
    },
    handleCurrentChangeGt (val) {
      this.formGt.current_page = val
        this.serch()
    },
   handleSizeChange (val) {
      this.pagination.page_size = val

   },
    handleCurrentChange (val) {
      this.pagination.current_page = val

    },
    handleReaded () {
      if (this.selectNotice.length === 0) {
        this.$message({
          message: '至少选择一条消息',
          type: 'warning'
        })
        return
      }
      this._editNotice()
    },
    handleDelete () {
      if (this.selectNotice.length === 0) {
        this.$message({
          message: '至少选择一条消息',
          type: 'warning'
        })
        return
      }
      this._deleteNotice()
    },
    _getNoticeNumber () {
      getNoticeNumber().then(res => {
        this.noticeNumberList = res.data
      })
    },


    },
  watch: {
    radio (val) {
        if( val == '0' ) {
           this.purchasing = false
           this.constTable = []
        }else if( val == '1' ) {
          this.purchasing = true
          // this.quotaPaymentList1(2);  //获取发放给个人列表
        }
    },
    // tableData1 (val){
    //    console.log(val)
    //    if( val.length ){
    //       this.flag1 = false
    //    }else{
    //       this.flag1 = true
    //    }
    // },
    // tableData2 (val){
    //   console.log(val)
    //    if( val.length ){
    //       this.flag0 = false
    //    }else{
    //       this.flag0 = true
    //    }
    // }
  }
}
</script>

<style scoped>
  .margin1 >>> .el-dialog__body {
    padding: 0 !important;
    background: none !important;
  }
</style>
<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
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

img{
  vertical-align: middle;
}
.topbig_div {
  display: flex;
  padding: 15px 0;
  .top_div {
    cursor: pointer;
    margin-top: 30px;
    width: 18%;
    height: 80px;
    background: rgba(255, 255, 255, 1);
    border-radius: 3px 5px 5px 5px;
    margin-right: 20px;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-evenly;
    span {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
}
.app-head-title{
  padding:15px;
}
.add_div {
  width: 19% !important;
  height: 120px !important;
  position: relative;
  top: 2px;
  border: 1px solid #d6deef;
  border-bottom: none;
  z-index: 10;
  border-bottom-right-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
  background: #fff;
  span {
    font-size: 20px !important;
    font-family: Microsoft YaHei;
    font-weight: bold !important;
    color: rgba(51, 51, 51, 1) !important;
  }
}
.contnt{
  border: 1px solid #d6deef;
}
.search-wrapper{
  padding: 20px;
  border: 1px solid #d7e0f1;
  background: #fff;
}
.content{
  padding: 10px;
  min-height: 100px;
  border: 1px solid #ddd;
  margin: 20px 0;
}
.content_c{
  font-size:20px;
  font-weight: 600;
  min-height: 200px;
}
.content_b{
  text-align: center;
  color: #4a99fa;
  line-height: 28px;
  font-size: 14px;
}

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
						margin-right: 11px;
						margin-left: 11px;
				}
                .el-select{
					display: inline-block;
                     width: 100%;
				}
				.el-select-width {
					 max-width: 150px;
           margin-right: 5px;
				}

				.el-input-width {
						display: inline-block;
						max-width: 140px;
				}

				.btn-toggle {
						margin-left: 10px;
						font-size: 14px;
						color: $themeColor;
						cursor: pointer;
				}
		}
</style>
