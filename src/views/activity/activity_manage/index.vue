<template>
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <div class="search-wrapper">
          <h4 class="title">类型管理</h4>
          <el-button v-if="haveAuthority === 1" v type="primary" size="small" @click="showPopup(0)" style="float: right;margin-top: -47px">
            <img src="@/common/images/activity/icon_create_new_type.png" alt="">
            <span style="margin-left: 6px;position: relative;top: -4px;">新建类型</span></el-button>
        </div>
      </div>
    </div>
    <div>
      <div class="goods-fitter">
        <div class="activity-wrapper">
          <ul class="clearfix list">
            <li class="item" v-for="item in activityList">
              <div class="content">
                <div class="img-wrap">
                  <img :src="item.activityTypeImgUrl" alt="">
                </div>
                <h5 class="title">{{item.activityTypeName}}</h5>
                <p class="introduction">活动介绍</p>
                <p class="brief_introduction" title="简介：">
                  简介：{{item.remark}}
                </p>
                <ul class="operate_list clearfix">
                  <li class="operate_item" @click="showPopup(1, item)">
                    <div class="icon"><img src="@/common/images/activity/manage_icon_edit.png" alt=""></div>
                    <p>编辑</p>
                  </li>
                  <li class="operate_item" @click="showPopup(2, item)">
                    <div class="icon"><img src="@/common/images/activity/manage_icon_detail.png" alt=""></div>
                    <p>详情</p>
                  </li>
                  <li v-if="item.activityTypeNum > 9" class="operate_item" @click="deleteAsk(item.activityTypeId)">
                    <div class="icon"><img src="@/common/images/activity/manage_icon_delete.png" alt=""></div>
                    <p>删除</p>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 新建类型弹窗 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <el-form :model="form" :rules="rules" ref="formName" label-width="100px" >
        <el-form-item label="活动海报：" prop="activityTypeImgUrl">
          <div class="uploadImgWrap">
            <div v-if="form.activityTypeImgUrl"
                 style="display: inline-block; width: 346px; height:172px; margin-right: 20px; border-radius:4px">
              <i class="img_wrap"><img style="width: 100%; height: 100%" :src="form.activityTypeImgUrl" alt=""></i>
            </div>
            <div style="display: inline-block;" v-if="!editable">
              <label for="uploadPic"
                     style="margin-bottom:30px;display: inline-block;cursor: pointer; height:32px;line-height: 32px;padding: 0 14px;background:rgba(76,134,244,1);color: #fff;border-radius:3px;">
                <input ref="file_input1" type="file" @change="uploadPic(1)" accept="image/jpeg, image/png"
                       id="uploadPic" style="position: absolute; top: -10000px">
                <span v-if="!form.activityTypeImgUrl">上传图片</span>
                <span v-else>重新上传</span>
              </label>
              <p style="color: #606266;font-size: 12px; line-height: 2">1、图片尺寸建议：710px*300px</p>
              <p style="color: #606266;font-size: 12px; line-height: 2">2、支持JPG、PNG格式的图片，图片不能大于2M。</p>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="活动图标：" prop="iconUrl">
          <div class="uploadImgWrap">
            <div v-if="form.iconUrl"
                 style="display: inline-block; width:42px;height:42px;background:rgba(255,255,255,1);border:1px solid rgba(220,223,230,1);border-radius:4px;margin-right:20px;">
              <i class="img_wrap"><img style="width: 100%; height: 100%" :src="form.iconUrl" alt=""></i>
            </div>
            <div style="display: inline-block;" v-if="!editable">
              <label for="uploadPic2"
                     style="margin-right:12px;display: inline-block;cursor: pointer; height:32px;line-height: 32px;padding: 0 14px;background:rgba(76,134,244,1);color: #fff;border-radius:3px;">
                <input ref="file_input2" type="file" @change="uploadPic(2)" accept="image/jpeg, image/png"
                       id="uploadPic2" style="position: absolute; top: -10000px">
                <span v-if="!form.iconUrl">上传图片</span>
                <span v-else>重新上传</span>
              </label>
              <span style="color: #606266;font-size: 12px; line-height: 2">建议尺寸为40*40像素</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="活动标题：" prop="activityTypeName">
          <el-input :readonly="editable" v-model="form.activityTypeName" clearable placeholder="请输入活动标题"></el-input>
        </el-form-item>
        <el-form-item label="活动介绍：" prop="remark">
          <el-input
            :readonly="editable"
            width="80%"
            type="textarea"
            :rows="8"
            placeholder="请输入活动介绍内容"
            v-model="form.remark">
          </el-input>
        </el-form-item>
        <el-form-item label="活动排序：" prop="sortOrder">
          <el-select :disabled="editable" v-model="form.sortOrder" placeholder="请选择">
            <el-option
              v-for="item in 100"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmCreateNewType" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新建类型弹窗 -->

    <!-- 删除 -->
    <el-dialog
      title="删除"
      :visible.sync="deleteAuditDialog"
      width="30%"
    >
      <span>是否确定删除此活动？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="deleteAuditDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmDelete" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除 -->
  </div>
</template>

<script>
    import {
        addActivityType,
        deleteActivityType,
        reqActivityList,
        updateActivityType,
        uploadFile,
        checkAuthority
    } from '@/api/activity/index'
    import {throttleTipPop} from '@/utils/throttle'

    export default {
    name: "contact",
    data() {
      return {
        haveAuthority: 0,
        editable: true, // 是否可编辑
        flag: null, // 弹窗类型
        title: '', // 弹窗标题
        activityTypeId: '', // 要删除的活动类型Id
        deleteAuditDialog: false, // 删除弹窗
        activityList: [], // 活动列表
        dialogVisible: false, // 新建类型弹窗
        form: {
          activityTypeImgUrl: '',
          activityTypeName: '',
          iconUrl: '',
          remark: '',
          sortOrder: '',
          isCustomerCreate: 1,
          activityTypeId: null,
        },
        rules: {
          activityTypeName: [
            { required: true, message: '请输入活动标题', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
          ],
          sortOrder: [
            { required: true, message: '请选择活动排序', trigger: 'change' },
          ],
          remark: [
            { required: true, message: '请输入活动介绍', trigger: 'blur' },
            { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    mounted() {
      this.getActivityList()
      this.checkAuthority()
    },
    methods: {
      // 判断权限
      async checkAuthority() {
        const res = await checkAuthority({type: 1})
        if (res.code === 200) {
          this.haveAuthority = res.data
        }
      },
      // 显示弹窗
      showPopup(index, item) {
        switch (index) {
          case 0:
            this.title = '新建活动商品分类'
            this.editable = false
            break
          case 1:
            this.title = '编辑活动类型'
            this.editable = false
            break
          case 2:
            this.title = '活动类型详情'
            this.editable = true
            break
          default:
            break
        }
        if (item) { // 编辑或查看详情
          this.form.activityTypeImgUrl = item.activityTypeImgUrl
          this.form.activityTypeName = item.activityTypeName
          this.form.iconUrl = item.iconUrl
          this.form.remark = item.remark
          this.form.sortOrder = item.sortOrder
          this.form.activityTypeId = item.activityTypeId
        } else { // 新增
          this.form.activityTypeImgUrl = ''
          this.form.activityTypeName = ''
          this.form.iconUrl = ''
          this.form.remark = ''
          this.form.sortOrder = ''
          this.form.activityTypeId = null
        }
        this.flag = index
        this.dialogVisible = true
      },
      // 确定新建类型
      confirmCreateNewType() {
        if (this.flag === 0 || this.flag === 1) {
          this.$refs['formName'].validate((valid) => {
            if (valid) {
              if (this.flag === 0 ) {
                this.addActivityType()
              } else {
                this.updataActivityType()
              }
              this.dialogVisible = false
            } else {
              return false;
            }
          });
        } else {
          this.dialogVisible = false
        }

      },
      // 增加活动类型
      async addActivityType() {
        const res = await addActivityType(this.form)
        if (res.code === 200) {
          throttleTipPop(this, 'success', '新增成功')
          this.getActivityList()
        }
      },
      // 修改活动类型
      async updataActivityType() {
        const res = await updateActivityType(this.form)
        if (res.code === 200) {
          throttleTipPop(this, 'success', '修改成功')
          this.getActivityList()
        }
      },
      // 删除活动类型
      async confirmDelete() {
        const res = await deleteActivityType(this.activityTypeId)
        if (res.code === 200) {
          throttleTipPop(this, 'success', '删除成功')
          this.getActivityList()
        }
        this.deleteAuditDialog = false
      },
      deleteAsk(id) {
        this.deleteAuditDialog = true
        this.activityTypeId = id
      },
      // 获取活动类型列表
      async getActivityList() {
        const res = await reqActivityList()
        if(res.code === 200) {
          this.activityList = res.data.list
        }
      },
      // 上传文件
      async uploadFile(file) {
        const formData = new FormData()
        let path = ''
        formData.append('file', file)
        const res = await uploadFile(formData)
        if (res.code === 200) {
          path = res.data.domain + res.data.filePath
        }
        return path
      },
      // 上传图片
      async uploadPic(index) {
        const files = this.$refs[`file_input${index}`].files[0]
        const type = files.type
        const size = files.size
        const mazSize = 2 * 1024 * 1024
        if (type !== 'image/png' && type !== 'image/jpeg') {
          throttleTipPop(this, 'error', '文件格式不正确')
          return
        }
        if (size > mazSize) {
          throttleTipPop(this, 'error', '文件大小不得超过2M')
          return
        }
        const path = await this.uploadFile(files)
        if (index === 1) {
          this.form.activityTypeImgUrl = path
        } else if (index === 2) {
          this.form.iconUrl = path
        }
        this.$refs[`file_input${index}`].value = '' // 清空上传的文件
      },
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/common/scss/variable.scss";

  /deep/ .el-textarea, /deep/ .el-input {
    width: 80%;
  }

  .img_wrap {
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  div {
    vertical-align: middle;
  }

  .activity-wrapper {
    padding: 38px 0 54px 40px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(214, 222, 239, 1);

    .list {
      .item {
        float: left;
        margin: 0 36px 36px 0;
        width: 336px;
        height: 480px;
        background: rgba(235, 244, 254, 1);
        border-radius: 6px;
        padding: 10px;
        box-sizing: border-box;

        .content {
          width: 316px;
          height: 458px;
          background: rgba(255, 255, 255, 1);
          overflow: hidden;

          .img-wrap {
            width: 276px;
            height: 136px;
            margin: 24px auto 0;
            background: #ececec;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .title {
            width: 276px;
            line-height: 34px;
            font-size: 15px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: rgba(69, 69, 69, 1);
            border-bottom: 1px solid rgba(216, 235, 254, 1);
            margin: 0 auto 20px;
            text-align: center;
          }

          .introduction {
            line-height: 18px;
            font-size: 15px;
            font-family: Microsoft YaHei;
            color: rgba(102, 102, 102, 1);
            padding-left: 18px;
            border-left: 4px solid #4A99FA;
            margin-bottom: 16px;
          }

          .brief_introduction {
            width: 276px;
            height: 140px;
            padding-bottom: 18px;
            font-size: 12px;
            font-family: Microsoft YaHei;
            color: #999;
            line-height: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
            margin: 0 auto 18px;
            border-bottom: 1px solid #D8EBFE;
          }

          .operate_list {
            padding: 0 54px;
            text-align: center;
            .operate_item {
              display: inline-block;
              cursor: pointer;
              margin: 0 20px;

              .icon {
                margin: auto;
                width: 16px;
                height: 16px;
                margin-bottom: 10px;

                img {
                  width: 100%;
                  height: 100%;
                }
              }

              p {
                text-align: center;
                font-size: 12px;
                font-family: Microsoft YaHei;
                color: rgba(102, 102, 102, 1);
                line-height: 12px;
              }
            }
          }
        }
      }
    }
  }

  .clearfix {
    zoom: 1;
  }

  .clearfix:after {
    display: block;
    content: '';
    clear: both;
  }

  /* 合同列表 */
  .contract_list {
    .contract_item {
      float: left;
      width: 362px;
      height: 416px;
      background: rgba(247, 250, 255, 1);
      border: 1px solid rgba(234, 237, 244, 1);
      margin-right: 20px;
      margin-bottom: 24px;
      box-sizing: border-box;
      padding: 10px;

      .content {
        .top {
          overflow: hidden;
          position: relative;
          width: 342px;
          height: 160px;
          margin-bottom: 10px;

          .label {
            position: absolute;
            right: -22px;
            top: 8px;
            width: 88px;
            line-height: 28px;
            background: #4C86F4;
            text-align: center;
            font-size: 14px;
            color: #fff;
            z-index: 1;
            transform: rotate(45deg);
          }

          .contract_img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
          }

          .contract_sn {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 32px;
            line-height: 32px;
            background: #4C86F4;
            text-align: center;
            font-size: 14px;
            color: #fff;
          }

          .icon_contract_file {
            position: absolute;
            top: 50px;
            right: 0;
            left: 0;
            margin: auto;
            z-index: 1;
          }

          .mask {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .5);
            z-index: 2;
            text-align: center;

            .btn {
              vertical-align: middle;
            }
          }

          .mask:after {
            display: inline-block;
            height: 100%;
            content: '';
            vertical-align: middle;
          }
        }

        .top:hover > .mask {
          display: block !important;
        }

        .bottom {
          width: 342px;
          height: 226px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(216, 235, 254, 1);
          box-sizing: border-box;
          padding: 16px 0 0 16px;

          .partyA {
            border-bottom: 1px solid #D8EBFE;
            margin-bottom: 8px;
          }

          h5 {
            color: #4C86F4;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 8px;
          }

          p {
            color: #606266;
            font-size: 14px;
            margin-bottom: 8px;
            width: 324px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }

  /* 合同列表 */

  /* 搜索条件 */
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
      padding: 20px 65px 20px 20px;
      border: 1px solid rgb(215, 224, 241);
      background: #fff;
      height: 66px;

      .title {
        margin-left: -20px;
        font-size: 16px;
        font-weight: 400;
        color: #333;
        padding-left: 20px;
        line-height: 1.4;
        border-left: 4px solid $themeColor;
        margin-bottom: 16px;
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

    .el-date-picker {
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

  /* 搜索条件 */

</style>
