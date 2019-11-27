<template>
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="260px" size="small">
          <div class="search-wrapper">
            <h4 class="title">操作指引</h4>
            <div class="introduce">1、选定某个父级分类，系统以所有 子分类名称 作为关键词来采集，自动采集指定数量的商品到相应的子分类里</div>
            <div class="introduce">2、如果选择的没有子分类，就采集到此分类里</div>
            <div class="introduce">3、如果分类已经设置有关键词，则按设置的关键词来采集</div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form ref="form" :model="form" :rules="rules" label-width="260px" size="small">
        <div class="search-wrapper">
            <h4 class="title">采集步骤</h4><br/>
            <el-form-item label="采集分类:">
                <el-select v-model="form.region" placeholder="产品分类">
                <el-option label="排序一" value="0"></el-option>
                <el-option label="排序二" value="1"></el-option>
                </el-select>
                <el-input v-model="form.name" style='width:400px' placeholder="请输入产品类别"></el-input>
                <el-button type="primary" size="small" class="btn">搜索</el-button>
            </el-form-item>
            <el-form-item label="价格调整:">
                <el-input v-model="form.name" style='width:600px' placeholder="请输入价格调整"></el-input>
                <span class="gaunjianzi">(在数字前面写[ + - * / ]表示算法，如原价调高1.2倍写成*1.2)</span>
            </el-form-item>
            <el-form-item label="数据排序:">
                <el-select v-model="form.region" placeholder="请选择数据排序">
                <el-option label="人气从高到低" value="0"></el-option>
                <el-option label="成交量从高到低" value="1"></el-option>
                <el-option label="价格从高到低" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="价格范围:">
                <el-input v-model="form.name" style='width:290px' placeholder="请输入最低价"></el-input> -
                <el-input v-model="form.name" style='width:290px' placeholder="请输入最高价"></el-input>
                <span class="danwei">（元）</span>
            </el-form-item>
            <el-form-item label="最小起批量:">
                <el-input v-model="form.name" style='width:600px' placeholder="示例：100~5000"></el-input>
            </el-form-item>
            <el-form-item label="最低销售额:">
                <el-input v-model="form.name" style='width:600px' placeholder="请输入最低销售额"></el-input>
            </el-form-item>
            <el-form-item label="供应产品星级：">
                <el-input v-model="form.name" style='width:600px' placeholder="示例：1~5"></el-input>
            </el-form-item>
            <el-form-item label="阿里类目编号：">
                <el-input v-model="form.name" style='width:600px' placeholder="请输入阿里类目编号"></el-input>
            </el-form-item>
            <el-form-item label="供货地址：">
                <el-input v-model="form.name" style='width:600px' placeholder="请输入供货地址"></el-input>
            </el-form-item>
            <el-form-item label="产品会员ID：">
                <el-input v-model="form.name" style='width:600px' placeholder="请输入产品会员ID"></el-input>
            </el-form-item>
            <el-form-item label="诚信通年限：">
                <el-input v-model="form.name" style='width:600px' placeholder="示例：1~5"></el-input>
            </el-form-item>
            <el-form-item label="诚信保障金额：">
                <el-input v-model="form.name" style='width:600px' placeholder="示例：1000~30000"></el-input>
            </el-form-item>
            <el-form-item label="省份：">
                <el-input v-model="form.name" style='width:600px' placeholder="示例：湖南"></el-input>
            </el-form-item>
            <el-form-item label="城市：">
                <el-input v-model="form.name" style='width:600px' placeholder="示例：长沙"></el-input>
            </el-form-item>
            <el-form-item label="采集数量:">
                <el-input v-model="form.name" style='width:600px' placeholder="请输入采集数量"></el-input>
            </el-form-item>
            <el-form-item label="采集评论:">
                <el-checkbox v-model="checked">采集（评论为10~50的随机数）</el-checkbox>
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
