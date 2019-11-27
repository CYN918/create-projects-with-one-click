<template>
  <div class="pic-select">
    <el-tabs v-model="activeName">
      <el-tab-pane label="我的图片" name="first">
        <div class="upload-wrapper">
          <ul class="upload-list">
            <li v-for="(item, index) in upPicList" :key="index" @click="selecet(item)">
              <img :src="item.url"/>
              <label class="success-icon" :class="item.response.data.file_id === image.file_id ? 'active' : ''"><i class="el-icon-upload-success el-icon-check"></i></label>
            </li>
          </ul>
        </div>
        <el-upload
          ref="upload"
          :action="action"
          :file-list="upPicList"
          list-type="picture-card"
          :on-success="handleSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="图片库" name="second">
        <div class="tabs-header">类型：
            <el-button class="tabs-item" :class="item.type_id === typeId ? 'active' : ''" type="text" v-for="item in tabsList" :key="item.type_id" @click="tabs(item.type_id)">{{item.name}}</el-button>
        </div>
        <ul class="upload-list ku-wrapper">
          <div class="item-wrapper" v-for="(item, index) in picList" :key="index" >
            <li @click="selecetPic(item)">
              <img :src="item.file_url"/>
              <label class="success-icon" :class="item.file_id === image.file_id ? 'active' : ''"><i class="el-icon-upload-success el-icon-check"></i></label>
            </li>
              <p class="item-size">{{item.file_size}}</p>
          </div>
        </ul>
      </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import { getPicTabs, getPicList } from '@/api/public.js'
import { imageUploadUrl } from '@/api/config'

export default {
  data () {
    return {
      action: imageUploadUrl,
      image: {},
      activeName: 'first',
      upPicList: [],
      typeId: 0,
      tabsList: [],
      picList: []
    }
  },
  created () {
    this._getPicTabs()
    this._getPicList()
  },
  methods: {
    tabs (id) {
      this.typeId = id
    },
    handleSuccess (response, file, fileList) {
      this.upPicList = fileList
    },
    selecet (item) {
      this.image = item.response.data
      this.image.url = item.url
      this.$emit('select', this.image)
    },
    selecetPic (item) {
      this.image = item
      this.image.url = item.url
      this.$emit('select', this.image)
    },
    _getPicTabs () {
      getPicTabs().then(res => {
        this.tabsList = res.data
      })
    },
    _getPicList () {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getPicList(this.typeId).then(res => {
        loading.close()
        this.picList = res.data.list
      })
    }
  },
  watch: {
    typeId () {
      this._getPicList()
    }
  }

}
</script>

<style lang='scss' scoped>
@import "@/common/scss/variable.scss";
.tabs-header {
  margin-bottom: 20px;
}
.tabs-item {
  color: #999;
  &.active {
    color: $themeColor;
  }
}
.upload-list {
  margin: 0;
  display: inline;
  vertical-align: top;
  li {
    position: relative;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    margin: 0 8px 8px 0;
    display: inline-block;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
    .success-icon {
      display: none;
      position: absolute;
      right: -15px;
      top: -6px;
      width: 40px;
      height: 24px;
      background: #13ce66;
      text-align: center;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      -webkit-box-shadow: 0 0 1pc 1px rgba(0, 0, 0, 0.2);
      box-shadow: 0 0 1pc 1px rgba(0, 0, 0, 0.2);
      &.active {
        display: block;
      }
      i {
        color: #fff;
        font-size: 12px;
        margin-top: 11px;
        transform: rotate(-45deg);
      }
    }
  }
}
.upload-wrapper {
  display: inline-block;
  vertical-align: top;
  & + div {
    display: inline-block;
    vertical-align: top;
  }
}
.ku-wrapper {
  .item-wrapper {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 148px;
    height: 188px;
    display: inline-block;
    margin: 0 8px 8px 0;
    .item-size {
      text-align: center;
      font-size: 16px;
    }
  }
}
</style>

<style>
.el-upload-list--picture-card .el-upload-list__item {
  .el-upload-list__item-status-label {
    display: none;
  }
}
.el-upload-list--picture-card .el-upload-list__item.is-success {
  display: none;
  .el-upload-list__item-status-label {
    display: none;
  }
}
</style>
