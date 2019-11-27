<template>
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="260px" size="small">
          <div class="search-wrapper">
            <h4 class="title">操作指引</h4>
            <div class="introduce">1、可输入多个商品ID号进行采集，以半角逗号或者回车分隔（如：18736939637,15646098607,24298040344）</div>
            <div class="introduce">2、可输入多个商品的链接，回车分隔或连续输入都可以</div>
            <div class="introduce">3、商品ID是淘宝商品链接里（如https://item.taobao.com/item.htm?id=19474502166）的id=19474502166一串数字</div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form ref="form" :model="form" :rules="rules" label-width="260px" size="small">
        <div class="search-wrapper">
            <h4 class="title">采集步骤</h4><br/>
            <el-form-item label="批量商品ID:">
                <el-input type="textarea" :rows="4" v-model="form.name" style='width:600px' placeholder="请输入ID"></el-input>
                <span class="gaunjianzi">（输入多个ID，用逗号或回车隔开，或多个商品链接）</span>
            </el-form-item>
            <el-form-item label="采集评论:">
                <el-checkbox v-model="checked">采集（评论为10~50的随机数）</el-checkbox>
            </el-form-item>
            <el-form-item label="产品分类:">
                <el-select v-model="form.region" placeholder="请选择数据排序">
                <el-option label="排序一" value="0"></el-option>
                <el-option label="排序二" value="1"></el-option>
                </el-select>
                <el-input v-model="form.name" style='width:400px' placeholder="请输入产品类别"></el-input>
                <el-button type="primary" size="small" class="btn">搜索</el-button>
            </el-form-item>
            <el-form-item label="属性类型:">
                <el-select v-model="form.region" placeholder="请选择属性类型">
                <el-option label="采集属性" value="0"></el-option>
                <el-option label="排序二" value="1"></el-option>
                </el-select>
                <el-input v-model="form.name" style='width:400px' placeholder="请输入属性类型"></el-input>
                <el-button type="primary" size="small" class="btn">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="" size="small">立刻采集</el-button>
            </el-form-item>
            </div>
            </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategory, getStoreList } from '@/api/public'

export default {
    data () {
    return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
    }
  },
  created () {
  },
  computed: {
  },
  methods: {
      
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
    max-width: 130px;
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
.btn{
  margin-left:20px
}
.caiji{
  color:red
}
.gaunjianzi{
  margin-left:20px;
  color:red
}
.danwei{
  margin-left:10px;  
}
.introduce{
  color:#97999F;
  font-size:90%
}
</style>
